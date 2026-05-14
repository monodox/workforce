"""A2A Protocol HTTP server for Workforce agents."""

import json
import os
import sys
from http.server import HTTPServer, BaseHTTPRequestHandler
from urllib.parse import urlparse, parse_qs

# Add parent directory to path
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from a2a.task_manager import TaskManager
from a2a.discovery import AGENT_CARDS, get_agent_card
from shared.identity import AgentIdentity


task_manager = TaskManager()
identity = AgentIdentity("workforce-orchestrator")


class A2AHandler(BaseHTTPRequestHandler):
    """HTTP handler for A2A protocol endpoints."""

    def _send_json(self, status: int, data: dict):
        self.send_response(status)
        self.send_header("Content-Type", "application/json")
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type, Authorization")
        self.end_headers()
        self.wfile.write(json.dumps(data).encode())

    def _read_body(self) -> dict:
        content_length = int(self.headers.get("Content-Length", 0))
        body = self.rfile.read(content_length)
        return json.loads(body.decode()) if body else {}

    def do_OPTIONS(self):
        self._send_json(200, {})

    def do_GET(self):
        parsed = urlparse(self.path)
        path = parsed.path.rstrip("/")

        # Health check
        if path == "/health":
            self._send_json(200, {"status": "healthy", "agent": "workforce"})
            return

        # Agent card discovery
        if path == "/.well-known/agent.json":
            card = get_agent_card("workforce")
            if card:
                self._send_json(200, card.to_dict())
            else:
                self._send_json(404, {"error": "Agent card not found"})
            return

        # Specific agent card
        if path.startswith("/agents/") and path.endswith("/agent.json"):
            agent_name = path.split("/")[2]
            card = get_agent_card(agent_name)
            if card:
                self._send_json(200, card.to_dict())
            else:
                self._send_json(404, {"error": f"Agent '{agent_name}' not found"})
            return

        # List all agents
        if path == "/a2a/agents":
            agents = [card.to_dict() for card in AGENT_CARDS.values()]
            self._send_json(200, {"agents": agents})
            return

        # Get task by ID
        if path.startswith("/a2a/tasks/"):
            task_id = path.split("/")[-1]
            task = task_manager.get_task(task_id)
            if task:
                self._send_json(200, task.to_dict())
            else:
                self._send_json(404, {"error": "Task not found"})
            return

        # List tasks
        if path == "/a2a/tasks":
            tasks = [t.to_dict() for t in task_manager.list_tasks()]
            self._send_json(200, {"tasks": tasks})
            return

        self._send_json(404, {"error": "Not found"})

    def do_POST(self):
        parsed = urlparse(self.path)
        path = parsed.path.rstrip("/")

        # Create a new task
        if path == "/a2a/tasks":
            body = self._read_body()
            message = body.get("message", "")
            metadata = body.get("metadata", {})

            if not message:
                self._send_json(400, {"error": "Message is required"})
                return

            task = task_manager.create_task(message, metadata)

            # Process the task asynchronously (simplified: synchronous for now)
            self._process_task(task.id, message, metadata)

            self._send_json(201, task.to_dict())
            return

        # Cancel a task
        if path.endswith("/cancel"):
            task_id = path.split("/")[-2]
            task = task_manager.update_state(task_id, "canceled")
            if task:
                self._send_json(200, task.to_dict())
            else:
                self._send_json(404, {"error": "Task not found"})
            return

        # Verify agent identity
        if path == "/a2a/verify":
            body = self._read_body()
            message = body.get("message", "")
            signature = body.get("signature", "")
            public_key = body.get("publicKey", "")

            is_valid = identity.verify(message, signature, public_key)
            self._send_json(200, {"valid": is_valid})
            return

        self._send_json(404, {"error": "Not found"})

    def _process_task(self, task_id: str, message: str, metadata: dict):
        """Process a task by routing to the appropriate agent."""
        from a2a.models import TaskState

        task_manager.update_state(task_id, TaskState.WORKING)

        try:
            # Determine which agent should handle this
            target_agent = metadata.get("target_agent", "workforce")

            # For now, return a placeholder response
            response = f"Task received by {target_agent} agent. Processing: {message}"
            task_manager.complete_task(task_id, response)

        except Exception as e:
            task_manager.fail_task(task_id, str(e))

    def log_message(self, format, *args):
        """Suppress default logging for cleaner output."""
        print(f"[A2A] {args[0]}" if args else "")


def run_server(host: str = "0.0.0.0", port: int = 8080):
    """Start the A2A protocol server."""
    server = HTTPServer((host, port), A2AHandler)
    print(f"[A2A] Workforce Agent Server running on {host}:{port}")
    print(f"[A2A] Discovery: http://{host}:{port}/.well-known/agent.json")
    print(f"[A2A] Health: http://{host}:{port}/health")
    print(f"[A2A] Agent ID: {identity.agent_id}")

    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print("\n[A2A] Server stopped.")
        server.server_close()


if __name__ == "__main__":
    port = int(os.environ.get("PORT", 8080))
    run_server(port=port)
