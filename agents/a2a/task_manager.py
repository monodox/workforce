"""Task lifecycle management for A2A protocol."""

from datetime import datetime
from .models import Task, TaskState, Message, Artifact


class TaskManager:
    """Manages A2A task lifecycle."""

    def __init__(self):
        self._tasks: dict[str, Task] = {}

    def create_task(self, message: str, metadata: dict | None = None) -> Task:
        """Create a new task from an incoming message."""
        task = Task(metadata=metadata or {})
        task.messages.append(Message(role="user", content=message))
        self._tasks[task.id] = task
        return task

    def get_task(self, task_id: str) -> Task | None:
        """Retrieve a task by ID."""
        return self._tasks.get(task_id)

    def update_state(self, task_id: str, state: TaskState) -> Task | None:
        """Update the state of a task."""
        task = self._tasks.get(task_id)
        if task:
            task.state = state
            task.updated_at = datetime.utcnow().isoformat()
        return task

    def add_message(self, task_id: str, role: str, content: str) -> Task | None:
        """Add a message to a task."""
        task = self._tasks.get(task_id)
        if task:
            task.messages.append(Message(role=role, content=content))
            task.updated_at = datetime.utcnow().isoformat()
        return task

    def add_artifact(self, task_id: str, name: str, content_type: str, data) -> Task | None:
        """Add an artifact to a task."""
        task = self._tasks.get(task_id)
        if task:
            task.artifacts.append(Artifact(name=name, content_type=content_type, data=data))
            task.updated_at = datetime.utcnow().isoformat()
        return task

    def complete_task(self, task_id: str, response: str) -> Task | None:
        """Mark a task as completed with a response."""
        task = self.add_message(task_id, "agent", response)
        if task:
            task.state = TaskState.COMPLETED
            task.updated_at = datetime.utcnow().isoformat()
        return task

    def fail_task(self, task_id: str, error: str) -> Task | None:
        """Mark a task as failed."""
        task = self.add_message(task_id, "agent", f"Error: {error}")
        if task:
            task.state = TaskState.FAILED
            task.updated_at = datetime.utcnow().isoformat()
        return task

    def list_tasks(self) -> list[Task]:
        """List all tasks."""
        return list(self._tasks.values())
