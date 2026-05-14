"""Agent discovery via Agent Cards."""

from .models import AgentCard, Skill


# Registry of all Workforce agent cards
AGENT_CARDS: dict[str, AgentCard] = {
    "workforce": AgentCard(
        name="Workforce Orchestrator",
        description="Main orchestrator that routes tasks to specialized Workforce agents.",
        url="https://api.workforce.app",
        skills=[
            Skill(id="route-task", name="Route Task", description="Routes a task to the appropriate specialized agent"),
        ],
    ),
    "engineer": AgentCard(
        name="Workforce Engineer Agent",
        description="Handles technical tasks, code reviews, infrastructure, and engineering workflows.",
        url="https://api.workforce.app/agents/engineer",
        skills=[
            Skill(id="review-code", name="Review Code", description="Reviews code and provides suggestions"),
            Skill(id="create-task", name="Create Task", description="Creates a technical task/ticket"),
        ],
    ),
    "hr": AgentCard(
        name="Workforce HR Agent",
        description="Handles hiring, onboarding, employee relations, and HR policies.",
        url="https://api.workforce.app/agents/hr",
        skills=[
            Skill(id="create-job-posting", name="Create Job Posting", description="Creates a new job posting"),
            Skill(id="onboard-employee", name="Onboard Employee", description="Initiates onboarding for a new hire"),
        ],
    ),
    "ops": AgentCard(
        name="Workforce Ops Agent",
        description="Handles operations, workflows, process optimization, and system monitoring.",
        url="https://api.workforce.app/agents/ops",
        skills=[
            Skill(id="create-workflow", name="Create Workflow", description="Creates a new operational workflow"),
            Skill(id="check-status", name="Check System Status", description="Checks service status"),
        ],
    ),
    "finance": AgentCard(
        name="Workforce Finance Agent",
        description="Handles budgets, invoices, payroll, and financial reporting.",
        url="https://api.workforce.app/agents/finance",
        skills=[
            Skill(id="generate-report", name="Generate Report", description="Generates a financial report"),
            Skill(id="create-invoice", name="Create Invoice", description="Creates a new invoice"),
        ],
    ),
    "support": AgentCard(
        name="Workforce Support Agent",
        description="Handles customer support, ticket management, and issue resolution.",
        url="https://api.workforce.app/agents/support",
        skills=[
            Skill(id="create-ticket", name="Create Ticket", description="Creates a support ticket"),
            Skill(id="resolve-ticket", name="Resolve Ticket", description="Resolves a support ticket"),
        ],
    ),
    "sales": AgentCard(
        name="Workforce Sales Agent",
        description="Handles leads, deals, CRM, and sales pipeline management.",
        url="https://api.workforce.app/agents/sales",
        skills=[
            Skill(id="create-lead", name="Create Lead", description="Creates a new sales lead"),
            Skill(id="update-deal", name="Update Deal Stage", description="Updates a deal's pipeline stage"),
        ],
    ),
    "growth": AgentCard(
        name="Workforce Growth Agent",
        description="Handles marketing, analytics, user acquisition, and growth campaigns.",
        url="https://api.workforce.app/agents/growth",
        skills=[
            Skill(id="create-campaign", name="Create Campaign", description="Creates a marketing campaign"),
            Skill(id="get-metrics", name="Get Metrics", description="Retrieves growth metrics"),
        ],
    ),
    "workspace": AgentCard(
        name="Workforce Workspace Agent",
        description="Handles office management, resource booking, and workspace scheduling.",
        url="https://api.workforce.app/agents/workspace",
        skills=[
            Skill(id="book-room", name="Book Room", description="Books a meeting room"),
            Skill(id="manage-resource", name="Manage Resource", description="Manages workspace resources"),
        ],
    ),
    "security": AgentCard(
        name="Workforce Security Agent",
        description="Handles access control, compliance, threat monitoring, and security policies.",
        url="https://api.workforce.app/agents/security",
        skills=[
            Skill(id="check-access", name="Check Access", description="Checks user access to a resource"),
            Skill(id="report-incident", name="Report Incident", description="Reports a security incident"),
        ],
    ),
    "insights": AgentCard(
        name="Workforce Insights Agent",
        description="Handles data analysis, reporting, dashboards, and business intelligence.",
        url="https://api.workforce.app/agents/insights",
        skills=[
            Skill(id="query-data", name="Query Data", description="Queries a dataset for insights"),
            Skill(id="generate-dashboard", name="Generate Dashboard", description="Creates a dashboard"),
        ],
    ),
    "knowledge": AgentCard(
        name="Workforce Knowledge Agent",
        description="Handles documentation, training materials, and knowledge base management.",
        url="https://api.workforce.app/agents/knowledge",
        skills=[
            Skill(id="create-article", name="Create Article", description="Creates a knowledge base article"),
            Skill(id="update-article", name="Update Article", description="Updates an existing article"),
        ],
    ),
}


def get_agent_card(agent_name: str) -> AgentCard | None:
    """Get an agent card by name."""
    return AGENT_CARDS.get(agent_name)


def list_agent_cards() -> list[AgentCard]:
    """List all available agent cards."""
    return list(AGENT_CARDS.values())
