# Architecture

Technical architecture documentation for the Workforce platform.

---

## System Overview

```
┌─────────────────────────────────────────────────────────────────────┐
│                         Google Cloud Platform                        │
│                                                                     │
│  ┌─────────────────┐         ┌────────────────────────────────────┐│
│  │   Cloud Run     │         │         GKE Cluster                ││
│  │                 │         │                                    ││
│  │  ┌───────────┐  │         │  ┌──────────────────────────────┐  ││
│  │  │ Next.js   │  │  HTTP   │  │     A2A Protocol Server      │  ││
│  │  │ Console   │◄─┼─────────┼─►│     (Port 8080)              │  ││
│  │  │ (Web UI)  │  │         │  └──────────────┬───────────────┘  ││
│  │  └───────────┘  │         │                 │                  ││
│  └─────────────────┘         │  ┌──────────────▼───────────────┐  ││
│                              │  │      Agent Engine (ADK)       │  ││
│  ┌─────────────────┐         │  │                              │  ││
│  │  Secret Manager │         │  │  ┌────┐ ┌────┐ ┌────┐       │  ││
│  │  (API Keys)     │         │  │  │ HR │ │Ops │ │Fin │ ...   │  ││
│  └─────────────────┘         │  │  └────┘ └────┘ └────┘       │  ││
│                              │  │         ▲                    │  ││
│  ┌─────────────────┐         │  │         │ Orchestrator       │  ││
│  │  Cloud SQL      │         │  │  ┌──────┴──────┐            │  ││
│  │  (PostgreSQL)   │         │  │  │  Workforce  │            │  ││
│  └─────────────────┘         │  │  │  Agent      │            │  ││
│                              │  │  └─────────────┘            │  ││
│  ┌─────────────────┐         │  └──────────────────────────────┘  ││
│  │  Vertex AI      │         │                                    ││
│  │  Search (RAG)   │         └────────────────────────────────────┘│
│  └─────────────────┘                                               │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
         ▲                              ▲
         │ HTTPS                        │ A2A Protocol
         ▼                              ▼
    ┌──────────┐                 ┌──────────────────┐
    │  Users   │                 │ External Agents  │
    │(Browser) │                 │ (Enterprise)     │
    └──────────┘                 └──────────────────┘
```

---

## Component Architecture

### 1. Web Console (Next.js)

```
src/
├── app/                    # Next.js App Router
│   ├── api/ai/chat/        # Gemini API route (server-side)
│   ├── console/            # Dashboard (ConsoleLayout)
│   ├── site/               # Public pages (AppLayout)
│   ├── auth/               # Auth pages (AppLayout)
│   └── legal/              # Legal pages (AppLayout)
├── components/
│   ├── ui/                 # Primitives (shadcn/ui pattern)
│   ├── console/            # Console components
│   │   ├── chat/           # Chat system
│   │   └── settings/       # Settings sidebar
│   ├── shared/             # Cross-layout (theme, cookies)
│   └── app/                # Public site components
└── lib/
    └── ai/                 # Gemini client
```

**Key decisions:**
- App Router for file-based routing and server components
- Separate layouts: `AppLayout` (public) vs `ConsoleLayout` (dashboard)
- Server-side API routes for AI calls (keys never exposed to client)
- `"use client"` only where interactivity is needed

### 2. Agent System (Python ADK)

```
agents/
├── workforce/              # Orchestrator (routes to sub-agents)
├── engineer/               # Technical tasks
├── hr/                     # People operations
├── ops/                    # Workflows & monitoring
├── finance/                # Budgets & invoices
├── support/                # Customer tickets
├── sales/                  # CRM & pipeline
├── growth/                 # Marketing & analytics
├── workspace/              # Office management
├── security/               # Access & compliance
├── insights/               # Data & dashboards
├── knowledge/              # Documentation & KB
├── shared/                 # Common tools & utilities
└── a2a/                    # A2A protocol layer
```

**Key decisions:**
- Each agent is self-contained (`__init__.py` + `agent.py`)
- Shared tools prevent duplication across agents
- Orchestrator pattern: `workforce` agent routes to specialists
- All agents use `gemini-2.0-flash` for consistency

### 3. Infrastructure (Terraform + K8s)

```
infra/
├── terraform/              # IaC for Google Cloud
│   ├── main.tf             # Provider, APIs
│   ├── gke.tf             # Kubernetes cluster
│   ├── cloud-run.tf       # Web console
│   ├── cloud-sql.tf       # Database
│   └── networking.tf      # VPC, subnets
├── k8s/                    # Kubernetes manifests
│   ├── deployment.yaml    # Agent pods
│   ├── service.yaml       # Internal service
│   └── ingress.yaml       # External access + SSL
├── docker/                 # Container images
└── cloudbuild.yaml         # CI/CD pipeline
```

---

## Data Flow

### Chat Request Flow

```
User (Browser)
    │
    ▼
Next.js Console (Cloud Run)
    │
    │ POST /api/ai/chat
    ▼
Gemini API (gemini-2.0-flash)
    │
    │ Response
    ▼
Next.js Console
    │
    │ JSON response
    ▼
User (Browser)
```

### A2A Task Flow

```
External Agent
    │
    │ 1. GET /.well-known/agent.json (Discovery)
    ▼
A2A Server (GKE)
    │
    │ 2. POST /a2a/tasks (Create Task)
    ▼
Task Manager
    │
    │ 3. Route to appropriate agent
    ▼
Specialized Agent (e.g., HR)
    │
    │ 4. Process with Gemini + Tools
    ▼
Task Manager
    │
    │ 5. Return completed task
    ▼
External Agent
```

### Agent Orchestration Flow

```
User Request: "Create a job posting for senior engineer"
    │
    ▼
Workforce Orchestrator
    │
    │ Analyzes intent → routes to HR
    ▼
HR Agent
    │
    │ Uses create_job_posting tool
    ▼
Tool Execution
    │
    │ Returns result
    ▼
HR Agent
    │
    │ Formats response
    ▼
User Response: "Job posting created for Senior Engineer in Engineering dept."
```

---

## Security Architecture

### Layers

| Layer | Mechanism |
|-------|-----------|
| Transport | TLS 1.3 (managed SSL certificates) |
| Authentication | Bearer tokens, Agent Identity (HMAC-SHA256) |
| Authorization | Role-based access (future) |
| Secrets | Google Secret Manager |
| Network | Private VPC, no public DB access |
| Identity | Cryptographic agent signing |

### Agent Identity

Each agent has a unique cryptographic identity:

```
Agent A                              Agent B
   │                                    │
   │ 1. Sign message with private key   │
   │────────────────────────────────────►│
   │    {payload, signature, publicKey}  │
   │                                    │
   │                    2. Verify signature
   │                    3. Process if valid
   │◄────────────────────────────────────│
   │         Signed response             │
```

---

## Deployment Architecture

### Environments

| Environment | Web | Agents | Database |
|-------------|-----|--------|----------|
| Development | `localhost:3000` | `adk run` (local) | Local PostgreSQL |
| Staging | Cloud Run (staging) | GKE (staging ns) | Cloud SQL (staging) |
| Production | Cloud Run (prod) | GKE (prod ns) | Cloud SQL (prod) |

### Scaling

| Component | Strategy |
|-----------|----------|
| Web Console | Cloud Run auto-scale (0 → 10 instances) |
| Agent Pods | GKE HPA (1 → 5 nodes) |
| Database | Cloud SQL (vertical scaling) |
| A2A Server | Replicated (2+ pods) |

### CI/CD Pipeline

```
Push to main
    │
    ▼
Cloud Build Trigger
    │
    ├── Build workforce-web image
    ├── Build workforce-agents image
    │
    ├── Push to Artifact Registry
    │
    ├── Deploy web → Cloud Run
    └── Deploy agents → GKE (rolling update)
```

---

## Technology Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Frontend framework | Next.js 14 | App Router, RSC, API routes, Vercel ecosystem |
| Styling | Tailwind CSS | Utility-first, fast iteration, consistent design |
| UI components | shadcn/ui pattern | Composable, accessible, no vendor lock-in |
| AI model | Gemini 2.0 Flash | Fast, capable, Google Cloud native |
| Agent framework | Google ADK | Official, A2A support, Vertex AI integration |
| Container orchestration | GKE | Production-grade K8s, auto-scaling |
| Web hosting | Cloud Run | Serverless, scale-to-zero, cost-effective |
| Database | Cloud SQL (PostgreSQL) | Managed, reliable, private networking |
| IaC | Terraform | Multi-cloud capable, declarative, state management |
| Search/RAG | Vertex AI Search | Managed, integrates with Gemini grounding |

---

## Network Topology

```
Internet
    │
    ├── console.workforce.app → Cloud Run (Next.js)
    │
    └── api.workforce.app → GKE Ingress → A2A Server
                                │
                                ├── /health
                                ├── /.well-known/agent.json
                                ├── /a2a/tasks
                                └── /agents/{name}/agent.json

Internal (VPC)
    │
    ├── Cloud SQL (private IP only)
    ├── Vertex AI Search (service networking)
    └── Secret Manager (IAM-based access)
```

---

## Future Architecture Considerations

- **Event-driven**: Pub/Sub for async agent communication
- **Streaming**: Server-Sent Events for real-time chat
- **Multi-tenancy**: Workspace isolation per organization
- **Plugin system**: Third-party agent registration
- **Observability**: Cloud Trace + Cloud Logging for agent debugging
- **Edge caching**: Cloud CDN for static assets
