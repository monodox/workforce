"""HR Agent - Handles hiring, onboarding, and employee relations."""

from google.adk.agents.llm_agent import Agent
from ..shared.tools import log_activity, send_notification


def create_job_posting(title: str, department: str, description: str) -> dict:
    """Creates a new job posting."""
    return {
        "status": "created",
        "title": title,
        "department": department,
        "message": f"Job posting '{title}' created for {department}.",
    }


def onboard_employee(name: str, role: str, start_date: str) -> dict:
    """Initiates the onboarding process for a new employee."""
    return {
        "status": "initiated",
        "employee": name,
        "role": role,
        "start_date": start_date,
        "message": f"Onboarding initiated for {name} ({role}).",
    }


root_agent = Agent(
    model="gemini-2.0-flash",
    name="hr_agent",
    description="Handles hiring, onboarding, employee relations, and HR policies.",
    instruction="""You are the Workforce HR Agent. You help with:
- Job postings and recruitment
- Employee onboarding and offboarding
- HR policy questions and guidance
- Performance reviews and feedback
- Leave management and benefits

Be empathetic, professional, and ensure compliance with policies.""",
    tools=[create_job_posting, onboard_employee, log_activity, send_notification],
)
