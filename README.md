# QYBERNEX

> **An AI-Driven Adaptive Cyber Deception and Quantum-Safe Threat Intelligence Platform.**
> *Anticipate the Unknown. Outsmart the Threat.*

---

## 1. Executive Overview

**QYBERNEX** is an automation-first cybersecurity operations platform designed to unite threat intelligence, adaptive cyber deception, intrusion detection, and quantum-safe evidence custody into a cohesive Security Operations Center (SOC).

Phase 1 provides a clean, secure, testable, and production-conscious software foundation upon which future security engines will be integrated.

---

## 2. Platform Architecture & Modules

QYBERNEX is designed around an **Autopilot-Ready Architecture**, featuring a Central Service Registry where security engines register their capabilities and operational state.

### Phase 1 Operational Engines
- **CyberDesk Unified SOC**: Centralized operations console and platform health orchestrator.
- **Central Service Registry**: Dynamic module registration and readiness tracking.

### Planned Roadmap Engines (Phase 2+)
- **IDS/IPS**: Network intrusion detection and controlled prevention.
- **SIEM**: Centralized security event collection and correlation.
- **AI Threat Intelligence**: Anomaly detection and automated risk scoring.
- **Cyber Deception**: Isolated honeypots and decoy services.
- **Endpoint Security**: Host telemetry and security event monitoring.
- **Network Telemetry**: Flow analysis and suspicious connection detection.
- **Vulnerability Management**: Authorized asset risk assessments.
- **Incident Response**: Investigation cases and response automation.
- **Quantum Evidence Vault**: Digital signatures (ML-DSA / ML-KEM) for evidence custody.
- **QYBERNEX Autopilot**: Automated security operations coordination.

---

## 3. Technology Stack

- **Backend**: Python 3.12, FastAPI, Pydantic v2, SQLAlchemy 2, Alembic Migrations
- **Frontend**: React 18, TypeScript 5, Vite, Tailwind CSS, Lucide React
- **Database & Queue**: PostgreSQL 16, Redis 7
- **Containerization**: Docker, Docker Compose
- **Automation**: PowerShell 7+ scripts (`scripts/*.ps1`)
- **Testing**: Pytest, Frontend TypeScript verification, GitHub Actions CI

---

## 4. Quickstart Guide (Windows / PowerShell)

### Prerequisites
- [Docker Desktop](https://www.docker.com/products/docker-desktop/) installed and running
- [Python 3.12+](https://www.python.org/) installed
- [Node.js 20+](https://nodejs.org/) installed

### Setup & Launch

1. **Initialize Setup & Environment**:
   ```powershell
   .\scripts\setup.ps1
   ```

2. **Start QYBERNEX Platform Stack**:
   ```powershell
   .\scripts\start.ps1 -Build
   ```

3. **Verify Health & Readiness**:
   ```powershell
   .\scripts\health.ps1
   ```

4. **Run Automated Test Suites**:
   ```powershell
   .\scripts\test.ps1
   ```

5. **Stop Platform Services**:
   ```powershell
   .\scripts\stop.ps1
   ```

---

## 5. Local Access URLs

- **CyberDesk Frontend**: `http://localhost:3000`
- **Backend API OpenAPI Docs**: `http://localhost:8000/api/v1/docs`
- **Health Endpoint**: `http://localhost:8000/api/v1/health`
- **Readiness Endpoint**: `http://localhost:8000/api/v1/ready`
- **Services Catalog**: `http://localhost:8000/api/v1/services`

---

## 6. Project Documentation

Comprehensive documentation is available in the `docs/` folder:
- [`docs/architecture.md`](docs/architecture.md): High-level system architecture and module catalog.
- [`docs/development-setup.md`](docs/development-setup.md): Complete setup and manual execution guide.
- [`docs/phase-roadmap.md`](docs/phase-roadmap.md): Multi-phase development roadmap.
- [`docs/security-principles.md`](docs/security-principles.md): Core security standards and principles.

---

## 7. Current Status & Verification

- **Backend Tests**: Passed (4/4 Pytest cases)
- **Frontend Build**: Verified (`npm run build` succeeds cleanly)
- **Database Migrations**: Initial schema created via Alembic (`0001_initial`)
- **CI Workflow**: Configured in `.github/workflows/ci.yml`
