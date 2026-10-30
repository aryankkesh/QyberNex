from datetime import datetime, timezone
from typing import Optional, Dict, Any, List
from pydantic import BaseModel, Field

class HealthResponse(BaseModel):
    status: str = Field(..., json_schema_extra={"example": "healthy"})
    platform: str = Field(..., json_schema_extra={"example": "QYBERNEX"})
    version: str = Field(..., json_schema_extra={"example": "0.1.0"})
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class ReadinessComponent(BaseModel):
    status: str = Field(..., json_schema_extra={"example": "ready"}) # ready, unavailable, degraded
    message: Optional[str] = None

class ReadinessResponse(BaseModel):
    status: str = Field(..., json_schema_extra={"example": "ready"}) # ready, not_ready
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    components: Dict[str, ReadinessComponent]

class ServiceModuleStatus(BaseModel):
    service_id: str
    name: str
    module_type: str
    status: str
    version: str
    is_active: bool
    details: Optional[Dict[str, Any]] = None

class ServiceRegistryListResponse(BaseModel):
    total: int
    services: List[ServiceModuleStatus]
