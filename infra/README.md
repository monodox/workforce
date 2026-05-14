# Infrastructure

Google Cloud deployment infrastructure for Workforce.

## Architecture

| Component | Platform | Purpose |
|-----------|----------|---------|
| Console (Next.js) | Cloud Run | Web UI for managing agents |
| ADK Agents | GKE | Agent runtime with A2A server |
| Database | Cloud SQL (PostgreSQL) | Persistent storage |
| AI | Vertex AI / Gemini | Agent intelligence |
| Search | Vertex AI Search | RAG & grounding |
| Secrets | Secret Manager | API keys & credentials |

## Prerequisites

- Google Cloud SDK (`gcloud`)
- Terraform >= 1.5
- Docker
- kubectl

## Deployment

### 1. Set up Terraform

```bash
cd infra/terraform

# Initialize
terraform init

# Plan
terraform plan -var="project_id=YOUR_PROJECT" -var="db_password=YOUR_PASSWORD"

# Apply
terraform apply -var="project_id=YOUR_PROJECT" -var="db_password=YOUR_PASSWORD"
```

### 2. Build & Push Images

```bash
# Authenticate Docker with GCR
gcloud auth configure-docker

# Build web
docker build -t gcr.io/PROJECT_ID/workforce-web -f infra/docker/Dockerfile.web .

# Build agents
docker build -t gcr.io/PROJECT_ID/workforce-agents -f infra/docker/Dockerfile.agents .

# Push
docker push gcr.io/PROJECT_ID/workforce-web
docker push gcr.io/PROJECT_ID/workforce-agents
```

### 3. Deploy

```bash
# Deploy web to Cloud Run
gcloud run deploy workforce-web \
  --image gcr.io/PROJECT_ID/workforce-web \
  --region us-central1 \
  --allow-unauthenticated

# Deploy agents to GKE
gcloud container clusters get-credentials workforce-cluster --zone us-central1-a
kubectl apply -f infra/k8s/
```

### 4. CI/CD (Cloud Build)

Push to main triggers automatic deployment:

```bash
gcloud builds submit --config infra/cloudbuild.yaml
```

## A2A Server

The agents container runs an A2A protocol server on port 8080:

- `GET /health` — Health check
- `GET /.well-known/agent.json` — Agent discovery
- `GET /a2a/agents` — List all agents
- `POST /a2a/tasks` — Create a task
- `GET /a2a/tasks/{id}` — Get task status
