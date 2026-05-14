"""A2A Protocol data models based on the Agent-to-Agent specification."""

from dataclasses import dataclass, field
from enum import Enum
from typing import Any
import uuid
from datetime import datetime


class TaskState(str, Enum):
    SUBMITTED = "submitted"
    WORKING = "working"
    INPUT_REQUIRED = "input-required"
    COMPLETED = "completed"
    CANCELED = "canceled"
    FAILED = "failed"


@dataclass
class Skill:
    """A capability that an agent can perform."""
    id: str
    name: str
    description: str
    input_schema: dict | None = None
    output_schema: dict | None = None


@dataclass
class AgentCard:
    """Discovery document for an A2A-compatible agent."""
    name: str
    description: str
    url: str
    version: str = "1.0.0"
    skills: list[Skill] = field(default_factory=list)
    capabilities: dict = field(default_factory=lambda: {
        "streaming": False,
        "pushNotifications": False,
    })
    authentication: dict = field(default_factory=lambda: {
        "schemes": ["bearer"]
    })

    def to_dict(self) -> dict:
        return {
            "name": self.name,
            "description": self.description,
            "url": self.url,
            "version": self.version,
            "capabilities": self.capabilities,
            "authentication": self.authentication,
            "skills": [
                {
                    "id": s.id,
                    "name": s.name,
                    "description": s.description,
                    "inputSchema": s.input_schema,
                    "outputSchema": s.output_schema,
                }
                for s in self.skills
            ],
        }


@dataclass
class Message:
    """A message within a task conversation."""
    role: str  # "user" or "agent"
    content: str
    timestamp: str = field(default_factory=lambda: datetime.utcnow().isoformat())


@dataclass
class Artifact:
    """An output artifact produced by an agent."""
    name: str
    content_type: str
    data: Any


@dataclass
class Task:
    """An A2A task representing a unit of work."""
    id: str = field(default_factory=lambda: str(uuid.uuid4()))
    state: TaskState = TaskState.SUBMITTED
    messages: list[Message] = field(default_factory=list)
    artifacts: list[Artifact] = field(default_factory=list)
    metadata: dict = field(default_factory=dict)
    created_at: str = field(default_factory=lambda: datetime.utcnow().isoformat())
    updated_at: str = field(default_factory=lambda: datetime.utcnow().isoformat())

    def to_dict(self) -> dict:
        return {
            "id": self.id,
            "state": self.state.value,
            "messages": [
                {"role": m.role, "content": m.content, "timestamp": m.timestamp}
                for m in self.messages
            ],
            "artifacts": [
                {"name": a.name, "contentType": a.content_type, "data": a.data}
                for a in self.artifacts
            ],
            "metadata": self.metadata,
            "createdAt": self.created_at,
            "updatedAt": self.updated_at,
        }
