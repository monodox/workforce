"""Finance Agent - Handles budgets, invoices, payroll, and financial reports."""

from google.adk.agents.llm_agent import Agent
from ..shared.tools import log_activity


def generate_report(report_type: str, period: str) -> dict:
    """Generates a financial report."""
    return {
        "status": "generated",
        "type": report_type,
        "period": period,
        "message": f"{report_type} report generated for {period}.",
    }


def create_invoice(client: str, amount: float, description: str) -> dict:
    """Creates a new invoice."""
    return {
        "status": "created",
        "client": client,
        "amount": amount,
        "message": f"Invoice for ${amount} created for {client}.",
    }


root_agent = Agent(
    model="gemini-2.0-flash",
    name="finance_agent",
    description="Handles budgets, invoices, payroll, and financial reporting.",
    instruction="""You are the Workforce Finance Agent. You help with:
- Budget planning and tracking
- Invoice creation and management
- Payroll queries and processing
- Financial report generation
- Expense approvals and auditing

Be accurate, detail-oriented, and ensure financial compliance.""",
    tools=[generate_report, create_invoice, log_activity],
)
