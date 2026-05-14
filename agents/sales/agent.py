"""Sales Agent - Handles leads, deals, CRM, and pipeline management."""

from google.adk.agents.llm_agent import Agent
from ..shared.tools import log_activity, send_notification


def create_lead(name: str, company: str, source: str) -> dict:
    """Creates a new sales lead."""
    return {
        "status": "created",
        "lead": name,
        "company": company,
        "source": source,
        "message": f"Lead '{name}' from {company} created.",
    }


def update_deal_stage(deal_id: str, stage: str) -> dict:
    """Updates the stage of a sales deal."""
    return {
        "status": "updated",
        "deal_id": deal_id,
        "stage": stage,
        "message": f"Deal {deal_id} moved to {stage}.",
    }


root_agent = Agent(
    model="gemini-2.0-flash",
    name="sales_agent",
    description="Handles leads, deals, CRM, and sales pipeline management.",
    instruction="""You are the Workforce Sales Agent. You help with:
- Lead generation and qualification
- Deal tracking and pipeline management
- CRM updates and reporting
- Sales forecasting
- Client communication drafts

Be persuasive, data-driven, and focused on closing deals.""",
    tools=[create_lead, update_deal_stage, log_activity, send_notification],
)
