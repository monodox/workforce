"""A2A client for outbound agent-to-agent communication."""

import json
import urllib.request
import urllib.error
from .models import AgentCard, Task


class A2AClient:
    """Client for communicating with external A2A-compatible agents."""

    def __init__(self, agent_url: str, auth_token: str | None = None):
        self.agent_url = agent_url.rstrip("/")
        self.auth_token = auth_token

    def _headers(self) -> dict:
        headers = {"Content-Type": "application/json"}
        if self.auth_token:
            headers["Authorization"] = f"Bearer {self.auth_token}"
        return headers

    def discover(self) -> AgentCard | None:
        """Discover an agent by fetching its agent card."""
        try:
            url = f"{self.agent_url}/.well-known/agent.json"
            req = urllib.request.Request(url, headers=self._headers())
            with urllib.request.urlopen(req) as response:
                data = json.loads(response.read().decode())
                return AgentCard(
                    name=data["name"],
                    description=data["description"],
                    url=data["url"],
                    version=data.get("version", "1.0.0"),
                )
        except (urllib.error.URLError, json.JSONDecodeError, KeyError):
            return None

    def send_task(self, message: str, metadata: dict | None = None) -> dict | None:
        """Send a task to the remote agent."""
        try:
            url = f"{self.agent_url}/a2a/tasks"
            payload = json.dumps({
                "message": message,
                "metadata": metadata or {},
            }).encode()
            req = urllib.request.Request(url, data=payload, headers=self._headers(), method="POST")
            with urllib.request.urlopen(req) as response:
                return json.loads(response.read().decode())
        except (urllib.error.URLError, json.JSONDecodeError):
            return None

    def get_task(self, task_id: str) -> dict | None:
        """Get the status of a task."""
        try:
            url = f"{self.agent_url}/a2a/tasks/{task_id}"
            req = urllib.request.Request(url, headers=self._headers())
            with urllib.request.urlopen(req) as response:
                return json.loads(response.read().decode())
        except (urllib.error.URLError, json.JSONDecodeError):
            return None

    def cancel_task(self, task_id: str) -> dict | None:
        """Cancel a running task."""
        try:
            url = f"{self.agent_url}/a2a/tasks/{task_id}/cancel"
            req = urllib.request.Request(url, headers=self._headers(), method="POST")
            with urllib.request.urlopen(req) as response:
                return json.loads(response.read().decode())
        except (urllib.error.URLError, json.JSONDecodeError):
            return None
