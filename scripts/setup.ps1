# QYBERNEX Setup Script
# Powershell script for environment prerequisite validation and initial setup

[CmdletBinding()]
param()

$ErrorActionPreference = "Stop"

Write-Host "==========================================================" -ForegroundColor Cyan
Write-Host "         QYBERNEX Environment Setup & Validation          " -ForegroundColor Cyan
Write-Host "==========================================================" -ForegroundColor Cyan

# 1. Check Docker Desktop
Write-Host "`n[1/4] Checking Docker installation..." -ForegroundColor Yellow
if (Get-Command "docker" -ErrorAction SilentlyContinue) {
    $dockerVer = docker --version
    Write-Host "  [OK] $dockerVer" -ForegroundColor Green
} else {
    Write-Host "  [WARNING] Docker CLI not found. Docker Desktop is recommended for full container stack execution." -ForegroundColor Yellow
}

# 2. Check Python
Write-Host "`n[2/4] Checking Python installation..." -ForegroundColor Yellow
if (Get-Command "python" -ErrorAction SilentlyContinue) {
    $pyVer = python --version
    Write-Host "  [OK] Python installed: $pyVer" -ForegroundColor Green
} elseif (Get-Command "python3" -ErrorAction SilentlyContinue) {
    $pyVer = python3 --version
    Write-Host "  [OK] Python3 installed: $pyVer" -ForegroundColor Green
} else {
    Write-Host "  [WARNING] Python not found in PATH." -ForegroundColor Yellow
}

# 3. Check Node.js
Write-Host "`n[3/4] Checking Node.js installation..." -ForegroundColor Yellow
if (Get-Command "node" -ErrorAction SilentlyContinue) {
    $nodeVer = node -v
    Write-Host "  [OK] Node.js installed: $nodeVer" -ForegroundColor Green
} else {
    Write-Host "  [WARNING] Node.js not found in PATH." -ForegroundColor Yellow
}

# 4. Check Environment File
Write-Host "`n[4/4] Checking environment configuration..." -ForegroundColor Yellow
$envPath = Join-Path $PSScriptRoot "..\.env"
$envExamplePath = Join-Path $PSScriptRoot "..\.env.example"

if (-not (Test-Path $envPath)) {
    if (Test-Path $envExamplePath) {
        Copy-Item $envExamplePath $envPath
        Write-Host "  [OK] Created .env file from .env.example" -ForegroundColor Green
    } else {
        Write-Host "  [ERROR] .env.example missing!" -ForegroundColor Red
    }
} else {
    Write-Host "  [OK] .env configuration file already exists." -ForegroundColor Green
}

Write-Host "`n==========================================================" -ForegroundColor Cyan
Write-Host "  QYBERNEX Setup Complete! Run .\scripts\start.ps1 to start." -ForegroundColor Cyan
Write-Host "==========================================================" -ForegroundColor Cyan
