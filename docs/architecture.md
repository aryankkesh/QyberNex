# QYBERNEX Architecture Overview

## 1. System Philosophy & Objectives
QYBERNEX is designed as an automation-first, AI-driven cybersecurity operations platform combining threat intelligence, adaptive cyber deception, intrusion detection, and quantum-safe evidence archiving.

The platform strictly adheres to the principle of **Truthful Security Operations**: unintegrated or planned engines are distinctly registered as placeholders and never synthesize false security alerts or fabricated monitoring metrics.

---

## 2. High-Level Architecture Diagram

```
+-----------------------------------------------------------------------+
|                           QYBERNEX FRONTEND                           |
|       React + TypeScript + Tailwind CSS + Lucide Icons SPA          |
|  - CyberDesk SOC Interface    - Module Inspector                      |
|  - Real-time System Metrics   - Central Service Registry Matrix       |
+-----------------------------------+-----------------------------------+
                                    |
                            HTTP / REST API
                                    |
+-----------------------------------v-----------------------------------+
|                           QYBERNEX BACKEND                            |
|                       FastAPI / Python 3.12                           |
|                                                                       |
|  +------------------------+      +---------------------------------+  |
|  | System API Endpoints   |      | Autopilot Service Registry      |  |
|  | - GET /api/v1/health   |      | - Central Engine Catalog        |  |
|  | - GET /api/v1/ready    |      | - Extensible Plugin Registry    |  |
|  | - GET /api/v1/services |      | - Dynamic Heartbeat Track       |  |
|  +-----------+------------+      +----------------+----------------+  |
|              |                                    |                   |
|              +-----------------+------------------+                   |
|                                |                                      |
+--------------------------------v--------------------------------------+
                                 |
                          SQLAlchemy ORM
                                 |
+--------------------------------v--------------------------------------+
|                         PERSISTENCE LAYER                             |
|               PostgreSQL 16 (Relational Metadata & Logs)              |
|               Redis 7 (Background Task Queue & Caching)               |
+-----------------------------------------------------------------------+
```

---

## 3. Core Architectural Modules & Phase Mapping

| Module Name | Module Type | Implementation Status | Phase Target | Description |
| :--- | :--- | :--- | :--- | :--- |
| **CyberDesk Unified SOC** | `SOC_CORE` | **Operational** | Phase 1 | Central management console and system health orchestrator. |
| **IDS / IPS Engine** | `NETWORK_SEC` | Planned Placeholder | Phase 2 | Network intrusion detection and controlled prevention. |
| **SIEM Correlation Engine**| `SIEM` | Planned Placeholder | Phase 2 | Centralized security event collection and correlation. |
| **AI Threat Intelligence** | `AI_ENGINE` | Planned Placeholder | Phase 3 | Anomaly detection, classification, and risk scoring. |
| **Cyber Deception Array** | `DECEPTION` | Planned Placeholder | Phase 3 | Isolated honeypots and decoy services. |
| **Endpoint Security** | `ENDPOINT` | Planned Placeholder | Phase 4 | Host monitoring and endpoint telemetry. |
| **Network Telemetry** | `NETWORK_SEC` | Planned Placeholder | Phase 4 | Suspicious connection and flow analysis. |
| **Vulnerability Management**| `VULN_MGMT` | Planned Placeholder | Phase 4 | Authorized asset risk assessment. |
| **Incident Response** | `IR_CASE` | Planned Placeholder | Phase 5 | Investigation, case tracking, and response automation. |
| **Quantum Evidence Vault** | `CRYPTO_VAULT` | Planned Placeholder | Phase 5 | ML-DSA & ML-KEM post-quantum digital signature verification. |
| **QYBERNEX Autopilot** | `AUTOPILOT` | Planned Placeholder | Phase 6 | Orchestration and coordination of security workflows. |

---

## 4. Database & Persistence Design
The platform uses SQLAlchemy with Alembic migrations over PostgreSQL:
- **`system_configs`**: Core platform configuration metadata, key-value configurations, and global feature toggles.
- **`service_registry`**: Central catalog tracking engine identity, versioning, health heartbeats, and operational state for Autopilot coordination.
