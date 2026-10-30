# QYBERNEX Development Roadmap

The development of QYBERNEX follows a modular 6-phase engineering roadmap to transform from foundational architecture into a production-grade cyber deception and quantum-safe operations platform.

---

## Phase 1 — Platform Foundation & Core SOC (Current Phase)
- **Status**: Completed
- **Deliverables**:
  - Modular repository layout (`backend/`, `frontend/`, `database/`, `scripts/`, `docs/`).
  - FastAPI application framework with Pydantic settings, CORS security, structured JSON logging, and global exception boundaries.
  - Health (`/api/v1/health`), Readiness (`/api/v1/ready`), and Service Registry (`/api/v1/services`) endpoints.
  - Autopilot-ready Central Service Registry architecture.
  - PostgreSQL & Alembic database migration support.
  - React + TypeScript frontend with dark futuristic cybersecurity UI and sidebar module navigation.
  - Windows-compatible PowerShell automation scripts (`setup.ps1`, `start.ps1`, `stop.ps1`, `test.ps1`, `health.ps1`).
  - Automated CI test workflows.

---

## Phase 2 — Intrusion Detection & SIEM Engine Integration
- **Target**: Next Phase
- **Focus**:
  - Suricata & Zeek network telemetry collection.
  - Centralized log ingestion pipeline with event correlation rules.
  - Real-time threat alert streaming via WebSockets.

---

## Phase 3 — AI Threat Intelligence & Cyber Deception Array
- **Target**: Phase 3
- **Focus**:
  - Scikit-learn anomaly detection & automated threat risk scoring.
  - Cowrie honeypot deployment in isolated container networks.
  - Interactive attack deception traps and telemetry collection.

---

## Phase 4 — Endpoint Security, Flow Monitoring & Vulnerability Audit
- **Target**: Phase 4
- **Focus**:
  - Host process and network connection monitoring agent.
  - Authorized vulnerability scanning engine for registered subnets.

---

## Phase 5 — Incident Case Management & Quantum-Safe Evidence Vault
- **Target**: Phase 5
- **Focus**:
  - Incident response lifecycle and forensic case management.
  - ML-DSA (FIPS 204) and ML-KEM (FIPS 203) compliant cryptographic evidence archiving for tamper-proof digital custody.

---

## Phase 6 — QYBERNEX Autopilot & Multi-Platform Clients
- **Target**: Phase 6
- **Focus**:
  - Controlled security operations automation agent with strict privilege boundaries.
  - PWA and Android client interfaces.
