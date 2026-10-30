import logging
from typing import List, Dict, Any, Optional
from datetime import datetime, timezone

logger = logging.getLogger("qybernex.service_registry")

class ServiceRegistryManager:
    """
    Central Service Registry for tracking and orchestrating QYBERNEX security modules.
    Enables Autopilot-ready architecture for Phase 2+ security engines.
    """

    # Static catalog of QYBERNEX platform engines & modules
    PLANNED_MODULES = [
        {"service_id": "cyberdesk", "name": "CyberDesk Unified SOC", "module_type": "SOC_CORE", "status": "operational", "phase": "Phase 1"},
        {"service_id": "ids_ips", "name": "Intrusion Detection & Prevention (IDS/IPS)", "module_type": "NETWORK_SEC", "status": "planned", "phase": "Phase 2"},
        {"service_id": "siem", "name": "Centralized SIEM & Event Correlation", "module_type": "SIEM", "status": "planned", "phase": "Phase 2"},
        {"service_id": "ai_threat_intel", "name": "AI Threat Intelligence & Anomaly Engine", "module_type": "AI_ENGINE", "status": "planned", "phase": "Phase 3"},
        {"service_id": "cyber_deception", "name": "Cyber Deception & Honeypot Array", "module_type": "DECEPTION", "status": "planned", "phase": "Phase 3"},
        {"service_id": "endpoint_security", "name": "Endpoint Security & Host Telemetry", "module_type": "ENDPOINT", "status": "planned", "phase": "Phase 4"},
        {"service_id": "network_monitoring", "name": "Network Telemetry & Flow Analysis", "module_type": "NETWORK_SEC", "status": "planned", "phase": "Phase 4"},
        {"service_id": "vulnerability_mgmt", "name": "Vulnerability Management & Asset Audit", "module_type": "VULN_MGMT", "status": "planned", "phase": "Phase 4"},
        {"service_id": "incident_response", "name": "Incident Response & Case Management", "module_type": "IR_CASE", "status": "planned", "phase": "Phase 5"},
        {"service_id": "quantum_vault", "name": "Quantum-Safe Evidence Vault (ML-DSA / ML-KEM)", "module_type": "CRYPTO_VAULT", "status": "planned", "phase": "Phase 5"},
        {"service_id": "qybernex_autopilot", "name": "QYBERNEX Security Operations Autopilot", "module_type": "AUTOPILOT", "status": "planned", "phase": "Phase 6"},
    ]

    def __init__(self):
        self._services: Dict[str, Dict[str, Any]] = {}
        self._initialize_catalog()

    def _initialize_catalog(self):
        for mod in self.PLANNED_MODULES:
            self._services[mod["service_id"]] = {
                "service_id": mod["service_id"],
                "name": mod["name"],
                "module_type": mod["module_type"],
                "status": mod["status"],
                "version": "0.1.0",
                "is_active": mod["status"] == "operational",
                "details": {
                    "phase": mod["phase"],
                    "registered_at": datetime.now(timezone.utc).isoformat()
                }
            }

    def get_registered_services(self) -> List[Dict[str, Any]]:
        return list(self._services.values())

    def register_service(self, service_id: str, name: str, module_type: str, status: str = "operational", details: Optional[Dict[str, Any]] = None) -> Dict[str, Any]:
        svc = {
            "service_id": service_id,
            "name": name,
            "module_type": module_type,
            "status": status,
            "version": "0.1.0",
            "is_active": status == "operational",
            "details": details or {}
        }
        self._services[service_id] = svc
        logger.info(f"Registered service engine: {service_id} [{status}]")
        return svc

    def get_service(self, service_id: str) -> Optional[Dict[str, Any]]:
        return self._services.get(service_id)

service_registry = ServiceRegistryManager()
