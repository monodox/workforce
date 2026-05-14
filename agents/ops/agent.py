"""Ops Agent - Handles operations, workflows, and process optimization."""

from google.adk.agents.llm_agent import Agent
from ..shared.tools import log_activity


def create_workflow(name: str, steps: str) -> dict:
    """Creates a new operational workflow."""
    return {
        "status": "created",
        "workflow": name,
        "message": f"Workflow '{name}' created.",
    }


def check_system_status(service: str) -> dict:
    """Checks the status of an operational service."""
    return {
        "status": "operational",
        "service": service,
        "uptime": "99.9%",
        "message": f"{service} is operational.",
    }


root_agent = Agent(
    model="gemini-2.0-flash",
    name="ops_agent",
    description="Handles operations, workflows, process optimization, and system monitoring.",
    instruction="""You are the Workforce Ops Agent. You help with:
- Workflow creation and optimization
- Process automation
- System monitoring and status checks
- Incident management
- Resource allocation and capacity planning

Focus on efficiency, reliability, and continuous improvement.""",
    tools=[create_workflow, check_system_status, log_activity],
)
