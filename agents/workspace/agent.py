"""Workspace Agent - Handles office management, resources, and scheduling."""

from google.adk.agents.llm_agent import Agent
from ..shared.tools import log_activity, send_notification


def book_room(room: str, date: str, time: str, duration: str) -> dict:
    """Books a meeting room."""
    return {
        "status": "booked",
        "room": room,
        "date": date,
        "time": time,
        "duration": duration,
        "message": f"Room '{room}' booked on {date} at {time} for {duration}.",
    }


def manage_resource(resource: str, action: str) -> dict:
    """Manages workspace resources (equipment, supplies, etc.)."""
    return {
        "status": "success",
        "resource": resource,
        "action": action,
        "message": f"Resource '{resource}' - {action} completed.",
    }


root_agent = Agent(
    model="gemini-2.0-flash",
    name="workspace_agent",
    description="Handles office management, resource booking, and workspace scheduling.",
    instruction="""You are the Workforce Workspace Agent. You help with:
- Meeting room booking and management
- Office resource allocation
- Workspace scheduling and coordination
- Facility requests and maintenance
- Event planning and logistics

Be organized, proactive, and ensure smooth workspace operations.""",
    tools=[book_room, manage_resource, log_activity, send_notification],
)
