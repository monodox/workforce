"""Vertex AI client initialization for Workforce agents."""

import os


def get_project_id() -> str:
    """Get the Google Cloud project ID."""
    return os.environ.get("GOOGLE_CLOUD_PROJECT", "")


def get_location() -> str:
    """Get the Google Cloud location/region."""
    return os.environ.get("GOOGLE_CLOUD_LOCATION", "us-central1")


def init_vertex_ai():
    """Initialize Vertex AI SDK.

    Call this at startup when running on Google Cloud.
    """
    try:
        import vertexai
        project_id = get_project_id()
        location = get_location()

        if project_id:
            vertexai.init(project=project_id, location=location)
            print(f"[Vertex AI] Initialized: project={project_id}, location={location}")
        else:
            print("[Vertex AI] GOOGLE_CLOUD_PROJECT not set, skipping initialization")
    except ImportError:
        print("[Vertex AI] vertexai package not installed, skipping initialization")


def get_gemini_model(model_name: str = "gemini-2.0-flash"):
    """Get a Gemini model via Vertex AI.

    Use this when deploying on Google Cloud instead of the Gemini API directly.
    """
    try:
        from vertexai.generative_models import GenerativeModel
        return GenerativeModel(model_name)
    except ImportError:
        raise RuntimeError("vertexai package required. Install with: pip install google-cloud-aiplatform")
