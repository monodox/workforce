# AGENTS.md — ADK Agents

Instructions for AI coding agents working on the `agents/` subproject.

## Overview

This directory contains Python-based AI agents built with Google Agent Development Kit (ADK). Each agent is a specialized worker in the Workforce platform, orchestrated by the `workforce` agent.

## Setup

```bash
cd agents
python -m venv .venv
.venv\Scripts\activate       # Windows
source .venv/bin/activate    # macOS/Linux
pip install -r requirements.txt
cp .env.example .env         # Add your GOOGLE_API_KEY
```

## Running

```bash
adk run workforce            # Run orchestrator
adk run hr                   # Run specific agent
adk web --port 8000          # Web UI (run from agents/ directory)
python -m a2a.server         # Start A2A protocol server
```

## Agent Structure

Every agent folder must contain:

```
agent_name/
├── __init__.py    # Must export: from .agent import root_agent
└── agent.py       # Must define: root_agent = Agent(...)
```

## Creating a New Agent

1. Create folder: `agents/new_agent/`
2. Create `__init__.py` with `from .agent import root_agent`
3. Create `agent.py` with the agent definition
4. Add agent card to `agent_cards/new_agent.json`
5. Register in `a2a/discovery.py`
6. Update sidebar in `src/components/console/console-sidebar.tsx` if needed

## Code Style

- Python 3.10+ with type hints on all functions
- Docstrings on all tool functions (ADK uses them as tool descriptions for the LLM)
- Import shared tools from `..shared.tools`
- Use `gemini-2.0-flash` as the model for all agents
- Keep tool functions pure — return dicts, no side effects in placeholders

## Tool Function Pattern

```python
def tool_name(param: str, optional_param: str = "default") -> dict:
    """One-line description of what this tool does.

    ADK sends this docstring to Gemini as the tool description.
    """
    return {
        "status": "success",
        "param": param,
        "message": "Human-readable result",
    }
```

## Shared Utilities

| File | Purpose |
|------|---------|
| `shared/tools.py` | Common tools (notifications, logging, search) |
| `shared/prompts.py` | Shared prompt templates |
| `shared/identity.py` | Cryptographic agent identity |
| `shared/grounding.py` | Vertex AI Search, Google Search, RAG |
| `shared/vertex_client.py` | Vertex AI SDK initialization |

## A2A Protocol

| File | Purpose |
|------|---------|
| `a2a/server.py` | HTTP server (port 8080) |
| `a2a/models.py` | Task, AgentCard, Message data models |
| `a2a/client.py` | Outbound client for calling external agents |
| `a2a/task_manager.py` | Task lifecycle management |
| `a2a/discovery.py` | Agent card registry |

## Security

- Never hardcode API keys — use environment variables via `.env`
- Agent identity signs all outbound A2A messages
- Verify signatures on inbound A2A messages
- All `.env` files are gitignored

## Testing

```bash
# Test a specific agent interactively
adk run hr

# Test A2A server
python -m a2a.server &
curl http://localhost:8080/health
curl http://localhost:8080/.well-known/agent.json
curl -X POST http://localhost:8080/a2a/tasks -H "Content-Type: application/json" -d '{"message": "Create a job posting for engineer"}'
```

## Dependencies

- `google-adk` — Agent Development Kit
- `google-cloud-aiplatform` — Vertex AI (production)
- `google-cloud-discoveryengine` — Vertex AI Search (RAG)
