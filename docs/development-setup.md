# QYBERNEX Development Setup Guide

This guide describes how to set up, run, and test QYBERNEX locally on Windows (via PowerShell / Docker Desktop) or Linux/macOS environments.

---

## Prerequisites

Ensure the following tools are installed on your workstation:
- **Docker Desktop** (with Compose support enabled)
- **Python 3.12+**
- **Node.js 20+** and **npm 10+**
- **PowerShell 7+** (recommended on Windows) or standard Bash

---

## Quickstart via Automated PowerShell Scripts

QYBERNEX includes Windows-compatible PowerShell scripts in the `scripts/` directory to automate common operations.

### 1. Environment Setup
Validates prerequisites and creates a local `.env` file from `.env.example`:
```powershell
.\scripts\setup.ps1
```

### 2. Start QYBERNEX Stack
Launches PostgreSQL, Redis, Backend, and Frontend containers in background mode:
```powershell
.\scripts\start.ps1 -Build
```

### 3. Verify Health & Readiness
Queries platform health and readiness endpoints:
```powershell
.\scripts\health.ps1
```

### 4. Run Test Suites
Executes backend Pytest suite and verifies frontend TypeScript production build:
```powershell
.\scripts\test.ps1
```

### 5. Stop Stack
Gracefully stops QYBERNEX containers:
```powershell
.\scripts\stop.ps1
```

---

## Manual Development Setup

If running outside Docker during active development:

### Backend (FastAPI + PostgreSQL)
1. Navigate to backend folder:
   ```bash
   cd backend
   ```
2. Create and activate a Python virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: .\venv\Scripts\Activate.ps1
   ```
3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. Run Alembic migrations (with local PostgreSQL running):
   ```bash
   alembic upgrade head
   ```
5. Start development server:
   ```bash
   PYTHONPATH=. uvicorn app.main:app --reload --port 8000
   ```

### Frontend (React + TypeScript + Vite)
1. Navigate to frontend folder:
   ```bash
   cd frontend
   ```
2. Install npm dependencies:
   ```bash
   npm install
   ```
3. Start Vite dev server:
   ```bash
   npm run dev
   ```

---

## Local Access Endpoints

- **Frontend Application**: `http://localhost:3000`
- **Backend API OpenAPI Docs**: `http://localhost:8000/api/v1/docs`
- **Health Endpoint**: `http://localhost:8000/api/v1/health`
- **Readiness Endpoint**: `http://localhost:8000/api/v1/ready`
- **Service Registry Catalog**: `http://localhost:8000/api/v1/services`
