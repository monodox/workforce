# Cloud SQL PostgreSQL for persistent storage
resource "google_sql_database_instance" "main" {
  name             = "workforce-db"
  database_version = "POSTGRES_15"
  region           = var.region

  settings {
    tier      = "db-f1-micro"
    disk_size = 10

    ip_configuration {
      ipv4_enabled    = false
      private_network = google_compute_network.vpc.id
    }

    backup_configuration {
      enabled = true
    }
  }

  deletion_protection = true
  depends_on          = [google_project_service.apis]
}

resource "google_sql_database" "workforce" {
  name     = "workforce"
  instance = google_sql_database_instance.main.name
}

resource "google_sql_user" "workforce" {
  name     = "workforce"
  instance = google_sql_database_instance.main.name
  password = var.db_password
}
