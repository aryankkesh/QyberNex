import datetime
from sqlalchemy import Column, String, DateTime, Boolean, Text, JSON
from app.database import Base

class SystemConfig(Base):
    """
    Stores core application metadata, system status, and environment configurations.
    """
    __tablename__ = "system_configs"

    key = Column(String(100), primary_key=True, index=True)
    value = Column(Text, nullable=False)
    description = Column(String(255), nullable=True)
    updated_at = Column(DateTime, default=datetime.datetime.now(datetime.timezone.utc), onupdate=datetime.datetime.now(datetime.timezone.utc))

class ServiceRegistry(Base):
    """
    Autopilot-ready Central Service Registry table for tracking status and capability of security modules.
    """
    __tablename__ = "service_registry"

    service_id = Column(String(100), primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    module_type = Column(String(50), nullable=False) # e.g. 'SIEM', 'IDS', 'AI_DECEPTION', 'VAULT'
    status = Column(String(50), nullable=False, default="configured") # operational, degraded, planned, offline
    version = Column(String(50), nullable=False, default="1.0.0")
    details = Column(JSON, nullable=True)
    last_heartbeat = Column(DateTime, default=datetime.datetime.now(datetime.timezone.utc))
    is_active = Column(Boolean, default=True)
