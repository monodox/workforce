"""Insights Agent - Handles data analysis, reporting, and dashboards."""

from google.adk.agents.llm_agent import Agent
from ..shared.tools import log_activity


def query_data(query: str, dataset: str = "default") -> dict:
    """Queries a dataset for insights."""
    return {
        "status": "success",
        "query": query,
        "dataset": dataset,
        "results": [],
        "message": "Data query placeholder.",
    }


def generate_dashboard(title: str, metrics: str) -> dict:
    """Generates a dashboard with specified metrics."""
    return {
        "status": "created",
        "title": title,
        "message": f"Dashboard '{title}' created.",
    }


root_agent = Agent(
    model="gemini-2.0-flash",
    name="insights_agent",
    description="Handles data analysis, reporting, dashboards, and business intelligence.",
    instruction="""You are the Workforce Insights Agent. You help with:
- Data analysis and visualization
- Report generation and scheduling
- Dashboard creation and management
- Trend identification and forecasting
- KPI tracking and alerting

Be analytical, precise, and present data in actionable formats.""",
    tools=[query_data, generate_dashboard, log_activity],
)
