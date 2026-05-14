"""Knowledge Agent - Handles documentation, training, and knowledge base management."""

from google.adk.agents.llm_agent import Agent
from ..shared.tools import log_activity, search_knowledge_base


def create_article(title: str, content: str, category: str) -> dict:
    """Creates a knowledge base article."""
    return {
        "status": "created",
        "title": title,
        "category": category,
        "message": f"Article '{title}' created in {category}.",
    }


def update_article(article_id: str, content: str) -> dict:
    """Updates an existing knowledge base article."""
    return {
        "status": "updated",
        "article_id": article_id,
        "message": f"Article {article_id} updated.",
    }


root_agent = Agent(
    model="gemini-2.0-flash",
    name="knowledge_agent",
    description="Handles documentation, training materials, and knowledge base management.",
    instruction="""You are the Workforce Knowledge Agent. You help with:
- Knowledge base article creation and updates
- Documentation management
- Training material development
- FAQ maintenance
- Information retrieval and summarization

Be clear, well-structured, and ensure information is accurate and accessible.""",
    tools=[create_article, update_article, log_activity, search_knowledge_base],
)
