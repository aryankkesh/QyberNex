from fastapi import APIRouter, Depends, status, Response
from sqlalchemy.orm import Session
from app.config import settings
from app.database import get_db, check_db_connection
from app.schemas.system import HealthResponse, ReadinessResponse, ReadinessComponent, ServiceRegistryListResponse
from app.core.service_registry import service_registry

router = APIRouter()

@router.get(
    "/health",
    response_model=HealthResponse,
    status_code=status.HTTP_200_OK,
    summary="System Health Check",
    description="Returns high-level health status of the QYBERNEX platform."
)
def get_health():
    return HealthResponse(
        status="healthy",
        platform=settings.PROJECT_NAME,
        version=settings.PROJECT_VERSION
    )

@router.get(
    "/ready",
    response_model=ReadinessResponse,
    summary="System Readiness Check",
    description="Verifies operational readiness of critical infrastructure including database connectivity and service registry."
)
def get_readiness(response: Response, db: Session = Depends(get_db)):
    db_ok = check_db_connection()

    # Check core service registry availability
    registered_services = service_registry.get_registered_services()
    registry_ok = len(registered_services) > 0

    components = {
        "database": ReadinessComponent(
            status="ready" if db_ok else "unavailable",
            message="Database connectivity established" if db_ok else "Failed to connect to PostgreSQL database"
        ),
        "service_registry": ReadinessComponent(
            status="ready" if registry_ok else "unavailable",
            message=f"{len(registered_services)} module(s) initialized in registry"
        )
    }

    is_ready = db_ok and registry_ok
    if not is_ready:
        response.status_code = status.HTTP_503_SERVICE_UNAVAILABLE

    return ReadinessResponse(
        status="ready" if is_ready else "not_ready",
        components=components
    )

@router.get(
    "/services",
    response_model=ServiceRegistryListResponse,
    summary="List Registered Security Engines",
    description="Returns registry status of all platform security engines (operational and planned)."
)
def list_services():
    services = service_registry.get_registered_services()
    return ServiceRegistryListResponse(
        total=len(services),
        services=services
    )
