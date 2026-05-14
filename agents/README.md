# Workforce Agents

AI-powered agents built with [Google Agent Development Kit (ADK)](https://google.github.io/adk-docs/).

## Structure

```
agents/
├── shared/              # Shared tools, prompts, utilities
│   ├── tools.py
│   └── prompts.py
├── workforce/           # Orchestrator (routes to sub-agents)
├── engineer/            # Technical tasks, code, infrastructure
├── hr/                  # Hiring, onboarding, employee relations
├── ops/                 # Operations, workflows, process optimization
├── finance/             # Budgets, invoices, payroll, reports
├── support/             # Customer support, tickets, issue resolution
├── sales/               # Leads, deals, CRM, pipeline
├── growth/              # Marketing, analytics, user acquisition
├── workspace/           # Office management, resources, scheduling
├── security/            # Access control, compliance, threats
├── insights/            # Data analysis, reporting, dashboards
├── knowledge/           # Documentation, training, knowledge base
└── requirements.txt
```

## Setup

```bash
# Create virtual environment
python3 -m venv .venv

# Activate (Windows)
.venv\Scripts\activate

# Activate (macOS/Linux)
source .venv/bin/activate

# Install dependencies
pip install -r requirements.txt
```

## Configuration

Add your Gemini API key to each agent's `.env` file:

```
GOOGLE_API_KEY="your-api-key-here"
```

Or set it globally:

```bash
set GOOGLE_API_KEY=your-api-key-here
```

## Running Agents

### Run the orchestrator

```bash
adk run workforce
```

### Run a specific agent

```bash
adk run engineer
adk run hr
adk run support
```

### Web interface

```bash
adk web --port 8000
```

Run from the `agents/` directory. Select an agent from the dropdown in the web UI.

## Agent Overview

| Agent | Role |
|-------|------|
| **Workforce** | Orchestrator — routes tasks to specialized agents |
| **Engineer** | Technical tasks, code reviews, infrastructure |
| **HR** | Hiring, onboarding, policies, employee relations |
| **Ops** | Workflows, process optimization, monitoring |
| **Finance** | Budgets, invoices, payroll, financial reports |
| **Support** | Customer support, tickets, issue resolution |
| **Sales** | Leads, deals, CRM, pipeline management |
| **Growth** | Marketing, campaigns, analytics, acquisition |
| **Workspace** | Office management, room booking, resources |
| **Security** | Access control, compliance, threat monitoring |
| **Insights** | Data analysis, dashboards, reporting |
| **Knowledge** | Documentation, training, knowledge base |
