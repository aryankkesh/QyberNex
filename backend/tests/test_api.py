import os
import pytest
from fastapi.testclient import TestClient

# Force sqlite in-memory / file db for testing
os.environ["TESTING"] = "True"

from app.main import app
from app.config import settings
from app.database import engine, Base

@pytest.fixture(autouse=True)
def setup_db():
    Base.metadata.create_all(bind=engine)
    yield

client = TestClient(app)

def test_health_endpoint():
    response = client.get("/api/v1/health")
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "healthy"
    assert data["platform"] == settings.PROJECT_NAME
    assert data["version"] == settings.PROJECT_VERSION

def test_readiness_endpoint():
    response = client.get("/api/v1/ready")
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "ready"
    assert "components" in data
    assert "database" in data["components"]
    assert data["components"]["database"]["status"] == "ready"
    assert "service_registry" in data["components"]
    assert data["components"]["service_registry"]["status"] == "ready"

def test_service_registry_endpoint():
    response = client.get("/api/v1/services")
    assert response.status_code == 200
    data = response.json()
    assert "total" in data
    assert data["total"] >= 10
    assert "services" in data

    # Check that CyberDesk is operational in registry
    services = {s["service_id"]: s for s in data["services"]}
    assert "cyberdesk" in services
    assert services["cyberdesk"]["status"] == "operational"
    assert "ids_ips" in services
    assert services["ids_ips"]["status"] == "planned"

def test_config_settings():
    assert settings.PROJECT_NAME == "QYBERNEX"
    assert settings.API_V1_STR == "/api/v1"
