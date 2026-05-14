"""Support Agent - Handles customer support, tickets, and issue resolution."""

from google.adk.agents.llm_agent import Agent
from ..shared.tools import log_activity, send_notification, search_knowledge_base


def create_ticket(subject: str, description: str, priority: str = "medium") -> dict:
    """Creates a support ticket."""
    return {
        "status": "created",
        "subject": subject,
        "priority": priority,
        "message": f"Ticket '{subject}' created with {priority} priority.",
    }


def resolve_ticket(ticket_id: str, resolution: str) -> dict:
    """Resolves a support ticket."""
    return {
        "status": "resolved",
        "ticket_id": ticket_id,
        "message": f"Ticket {ticket_id} resolved.",
    }


root_agent = Agent(
    model="gemini-2.0-flash",
    name="support_agent",
    description="Handles customer support, ticket management, and issue resolution.",
    instruction="""You are the Workforce Support Agent. You help with:
- Customer issue resolution
- Ticket creation and management
- FAQ and knowledge base lookups
- Escalation handling
- Customer satisfaction follow-ups

Be patient, empathetic, and solution-oriented. Always aim for first-contact resolution.""",
    tools=[create_ticket, resolve_ticket, log_activity, send_notification, search_knowledge_base],
)
