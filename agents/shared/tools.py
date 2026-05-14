"""Shared tools available to all Workforce agents."""


def get_current_time(city: str) -> dict:
    """Returns the current time in a specified city."""
    from datetime import datetime, timezone
    return {
        "status": "success",
        "city": city,
        "time": datetime.now(timezone.utc).strftime("%I:%M %p UTC"),
    }


def search_knowledge_base(query: str) -> dict:
    """Searches the shared knowledge base for relevant information."""
    return {
        "status": "success",
        "query": query,
        "results": [],
        "message": "Knowledge base search placeholder",
    }


def send_notification(recipient: str, message: str, channel: str = "email") -> dict:
    """Sends a notification to a user via the specified channel."""
    return {
        "status": "success",
        "recipient": recipient,
        "channel": channel,
        "message": "Notification sent (placeholder)",
    }


def log_activity(agent_name: str, action: str, details: str = "") -> dict:
    """Logs an agent activity for audit purposes."""
    return {
        "status": "success",
        "agent": agent_name,
        "action": action,
        "details": details,
    }
