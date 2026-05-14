# AGENTS.md — Infrastructure

Instructions for AI coding agents working on the `infra/` subproject.

## Overview

This directory contains Google Cloud infrastructure configuration for deploying the Workforce platform. It uses Terraform for provisioning and Kubernetes manifests for agent deployment.

## Architecture

| Component | Platform | Config |
|-----------|----------|--------|
| Next.js Console | Cloud Run | `terraform/cloud-run.tf` |
| ADK Agents + A2A Server | GKE | `k8s/deployment.yaml` |
| Database | Cloud SQL (PostgreSQL 15) | `terraform/cloud-sql.tf` |
| Networking | VPC + Private Service | `terraform/networking.tf` |
| CI/CD | Cloud Build | `cloudbuild.yaml` |
| Secrets | Secret Manager | `terraform/cloud-run.tf` |

## Prerequisites

- Google Cloud SDK (`gcloud`) authenticated
- Terraform >= 1.5
- Docker
- kubectl configured for the GKE cluster

## Commands

### Terraform

```bash
cd infra/terraform
terraform init
terraform plan -var="project_id=PROJECT" -var="db_password=PASS"
terraform apply -var="project_id=PROJECT" -var="db_password=PASS"
terraform destroy  # DESTRUCTIVE - requires confirmation
```

### Docker

```bash
# Build from repo root
docker build -t workforce-web -f infra/docker/Dockerfile.web .
docker build -t workforce-agents -f infra/docker/Dockerfile.agents .
```

### Kubernetes

```bash
gcloud container clusters get-credentials workforce-cluster --zone us-central1-a
kubectl apply -f infra/k8s/
kubectl get pods -n workforce
kubectl logs -f deployment/workforce-agents -n workforce
```

### Cloud Build (CI/CD)

```bash
gcloud builds submit --config infra/cloudbuild.yaml
```

## Code Style

- Terraform: use `snake_case` for resource names, prefix with `workforce-`
- Kubernetes: use `workforce` namespace for all resources
- Docker: multi-stage builds, minimal final images
- Always pin versions (Terraform providers, base images)

## Security Considerations

- Never commit secrets to `k8s/secrets.yaml` — use `kubectl create secret` or Secret Manager
- Cloud SQL uses private networking only (no public IP)
- Cloud Run services use Secret Manager for API keys
- GKE uses Workload Identity for service account binding
- All ingress uses managed SSL certificates

## Important Notes

- Terraform state is stored in GCS bucket `workforce-terraform-state`
- The GKE cluster auto-scales from 1 to 5 nodes
- Cloud Run scales to zero when idle (cost optimization)
- The A2A server health check is at `/health` on port 8080
- `Dockerfile.web` requires `output: "standalone"` in `next.config.js`
- Always run `terraform plan` before `terraform apply`
- The `deletion_protection = true` on Cloud SQL prevents accidental deletion

## Deployment Flow

```
Push to main
    → Cloud Build triggers
    → Builds Docker images
    → Pushes to Artifact Registry
    → Deploys web to Cloud Run
    → Updates GKE deployment image
```

## Troubleshooting

- **Cloud Run 503**: Check if `GEMINI_API_KEY` secret exists in Secret Manager
- **GKE pods CrashLoopBackOff**: Check `kubectl logs` — likely missing env vars
- **Terraform state lock**: Run `terraform force-unlock LOCK_ID`
- **Ingress not working**: Verify static IP and managed certificate status
