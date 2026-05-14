# GKE Cluster for ADK Agents
resource "google_container_cluster" "agents" {
  name     = "workforce-cluster"
  location = var.zone

  initial_node_count       = 1
  remove_default_node_pool = true

  workload_identity_config {
    workload_pool = "${var.project_id}.svc.id.goog"
  }

  depends_on = [google_project_service.apis]
}

resource "google_container_node_pool" "agents_pool" {
  name       = "agents-pool"
  location   = var.zone
  cluster    = google_container_cluster.agents.name
  node_count = 2

  node_config {
    machine_type = "e2-medium"
    disk_size_gb = 50

    oauth_scopes = [
      "https://www.googleapis.com/auth/cloud-platform",
    ]

    labels = {
      app = "workforce-agents"
    }
  }

  autoscaling {
    min_node_count = 1
    max_node_count = 5
  }
}
