"""Engineer Agent - Handles technical tasks, code, and infrastructure."""

from google.adk.agents.llm_agent import Agent
from ..shared.tools import log_activity, search_knowledge_base


def review_code(code: str, language: str = "python") -> dict:
    """Reviews code and provides suggestions."""
    return {
        "status": "success",
        "language": language,
        "suggestions": [],
        "message": "Code review placeholder",
    }


def create_task(title: str, description: str, priority: str = "medium") -> dict:
    """Creates a technical task/ticket."""
    return {
        "status": "created",
        "title": title,
        "priority": priority,
        "message": f"Task '{title}' created with {priority} priority.",
    }


root_agent = Agent(
    model="gemini-2.0-flash",
    name="engineer_agent",
    description="Handles technical tasks, code reviews, infrastructure, and engineering workflows.",
    instruction="""You are the Workforce Engineer Agent. You help with:
- Code reviews and technical guidance
- Infrastructure planning and management
- Technical task creation and tracking
- Architecture decisions and documentation
- Debugging and troubleshooting

Be precise, technical, and provide actionable recommendations.""",
    tools=[review_code, create_task, log_activity, search_knowledge_base],
)
