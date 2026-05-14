# AGENTS.md

Instructions for AI coding agents working on the Workforce repository.

## Project Overview

Workforce is an open-source, AI-powered workforce management platform. It consists of:

- **Next.js Console** (`src/`) — Web UI for managing agents, built with Next.js 14, TypeScript, Tailwind CSS
- **ADK Agents** (`agents/`) — Python-based AI agents built with Google Agent Development Kit (ADK), powered by Gemini
- **Infrastructure** (`infra/`) — Google Cloud deployment (Cloud Run, GKE, Terraform)

## Build & Test Commands

### Web (Next.js)

```bash
npm install          # Install dependencies
npm run dev          # Start dev server (localhost:3000)
npm run build        # Production build
npm run lint         # Run ESLint
```

### Agents (Python)

```bash
cd agents
python -m venv .venv
.venv\Scripts\activate       # Windows
source .venv/bin/activate    # macOS/Linux
pip install -r requirements.txt
adk run workforce            # Run orchestrator agent
adk web --port 8000          # Run web UI for testing
```

## Code Style Guidelines

### TypeScript / React

- Use TypeScript for all files (no `.js` in `src/`)
- Use functional components with `React.forwardRef` for UI primitives
- Use `cn()` utility from `@/lib/utils` for conditional classNames
- Follow shadcn/ui patterns for UI components (CVA variants, forwardRef)
- Use path aliases: `@/components`, `@/lib`, etc.
- Tailwind CSS for all styling — no CSS modules or styled-components
- Use `"use client"` directive only when hooks or interactivity are needed

### Python (Agents)

- Python 3.10+ with type hints
- Each agent lives in its own folder with `__init__.py` and `agent.py`
- Shared utilities go in `agents/shared/`
- All agents must export `root_agent` from `__init__.py`
- Use docstrings for all tool functions (ADK uses them for tool descriptions)

## Project Structure Rules

- `/src/app/console/` — Console pages (use `ConsoleLayout`, no AppLayout)
- `/src/app/site/`, `/src/app/auth/`, `/src/app/legal/` — Public pages (use `AppLayout`)
- `/src/components/ui/` — Reusable UI primitives (shadcn/ui style)
- `/src/components/console/` — Console-specific components
- `/src/components/shared/` — Shared across site and console (theme, cookies)
- `/src/components/app/` — Public site components (header, footer, home sections)

## Security Considerations

- Never commit API keys or secrets — use `.env` files (gitignored)
- `GEMINI_API_KEY` is used server-side only (in API routes and agents)
- All AI API calls go through `/src/app/api/ai/` routes — never expose keys to the client
- Agent identity uses cryptographic signing for A2A communication
- Validate all user input in API routes before passing to Gemini

## Commit Messages

Use conventional commits:

```
feat: add new feature
fix: resolve bug
docs: update documentation
refactor: restructure code
chore: maintenance task
```

## Pull Request Guidelines

- One feature/fix per PR
- Ensure `npm run build` and `npm run lint` pass
- Update relevant documentation if adding new features
- Add the agent name prefix for agent changes: `feat(hr-agent): add leave management tool`

## Important Notes

- The root `page.tsx` redirects to `/site/home` — don't put content there
- Console layout is independent from site layout (no shared header/footer)
- Agents use `gemini-2.0-flash` model — don't change without discussion
- A2A server runs on port 8080 in production
- Terraform state is stored in GCS bucket `workforce-terraform-state`
