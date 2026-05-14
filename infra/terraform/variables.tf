variable "project_id" {
  description = "Google Cloud project ID"
  type        = string
}

variable "region" {
  description = "Google Cloud region"
  type        = string
  default     = "us-central1"
}

variable "zone" {
  description = "Google Cloud zone"
  type        = string
  default     = "us-central1-a"
}

variable "domain" {
  description = "Domain name for the application"
  type        = string
  default     = "workforce.app"
}

variable "db_password" {
  description = "Cloud SQL database password"
  type        = string
  sensitive   = true
}
