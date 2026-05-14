"""Security Agent - Handles access control, compliance, and threat monitoring."""

from google.adk.agents.llm_agent import Agent
from ..shared.tools import log_activity, send_notification


def check_access(user: str, resource: str) -> dict:
    """Checks if a user has access to a resource."""
    return {
        "status": "success",
        "user": user,
        "resource": resource,
        "has_access": True,
        "message": f"Access check for {user} on {resource} (placeholder).",
    }


def report_incident(severity: str, description: str) -> dict:
    """Reports a security incident."""
    return {
        "status": "reported",
        "severity": severity,
        "message": f"Security incident reported with {severity} severity.",
    }


root_agent = Agent(
    model="gemini-2.0-flash",
    name="security_agent",
    description="Handles access control, compliance, threat monitoring, and security policies.",
    instruction="""You are the Workforce Security Agent. You help with:
- Access control and permission management
- Security compliance checks
- Threat detection and incident reporting
- Security policy enforcement
- Audit log reviews and anomaly detection

Be vigilant, thorough, and prioritize security above convenience.""",
    tools=[check_access, report_incident, log_activity, send_notification],
)
