"""Workforce Orchestrator Agent - Routes tasks to specialized sub-agents."""

from google.adk.agents.llm_agent import Agent
from ..shared.tools import log_activity


def route_to_agent(agent_name: str, task: str) -> dict:
    """Routes a task to a specialized Workforce agent."""
    return {
        "status": "routed",
        "agent": agent_name,
        "task": task,
        "message": f"Task routed to {agent_name} agent.",
    }


root_agent = Agent(
    model="gemini-2.0-flash",
    name="workforce_orchestrator",
    description="Main orchestrator agent that routes tasks to specialized Workforce agents.",
    instruction="""You are the Workforce Orchestrator. Your role is to understand user requests
and route them to the appropriate specialized agent:

- Engineer: Technical tasks, code, infrastructure
- HR: Hiring, onboarding, employee relations, policies
- Ops: Operations, workflows, process optimization
- Finance: Budgets, invoices, payroll, financial reports
- Support: Customer support, ticket management, issue resolution
- Sales: Leads, deals, CRM, pipeline management
- Growth: Marketing, analytics, user acquisition, campaigns
- Workspace: Office management, resources, scheduling
- Security: Access control, compliance, threat monitoring
- Insights: Data analysis, reporting, dashboards
- Knowledge: Documentation, training, knowledge base management

Analyze the request, determine the best agent, and route accordingly.
If the request is general or unclear, ask for clarification.""",
    tools=[route_to_agent, log_activity],
)
