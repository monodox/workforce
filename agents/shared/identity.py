"""Agent Identity - Cryptographic identity for A2A authentication."""

import hashlib
import hmac
import secrets
import json
from dataclasses import dataclass


@dataclass
class AgentIdentity:
    """Cryptographic identity for an agent.

    In production, this would use asymmetric keys (RSA/ECDSA).
    This implementation uses HMAC-SHA256 for simplicity.
    """

    agent_id: str
    _secret_key: str | None = None

    def __post_init__(self):
        if self._secret_key is None:
            self._secret_key = secrets.token_hex(32)

    @property
    def public_key(self) -> str:
        """Return a public identifier derived from the secret key."""
        return hashlib.sha256(self._secret_key.encode()).hexdigest()

    def sign(self, message: str) -> str:
        """Sign a message with this agent's identity."""
        signature = hmac.new(
            self._secret_key.encode(),
            message.encode(),
            hashlib.sha256,
        ).hexdigest()
        return signature

    def verify(self, message: str, signature: str, public_key: str) -> bool:
        """Verify a message signature.

        In production, this would verify against the sender's public key.
        """
        expected_key = hashlib.sha256(self._secret_key.encode()).hexdigest()
        if public_key != expected_key:
            return False

        expected_sig = hmac.new(
            self._secret_key.encode(),
            message.encode(),
            hashlib.sha256,
        ).hexdigest()
        return hmac.compare_digest(signature, expected_sig)

    def create_signed_envelope(self, payload: dict) -> dict:
        """Create a signed message envelope for A2A communication."""
        message = json.dumps(payload, sort_keys=True)
        return {
            "agentId": self.agent_id,
            "publicKey": self.public_key,
            "payload": payload,
            "signature": self.sign(message),
        }

    def verify_envelope(self, envelope: dict) -> bool:
        """Verify a signed message envelope."""
        payload = envelope.get("payload", {})
        signature = envelope.get("signature", "")
        public_key = envelope.get("publicKey", "")
        message = json.dumps(payload, sort_keys=True)
        return self.verify(message, signature, public_key)
