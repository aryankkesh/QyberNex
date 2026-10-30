# QYBERNEX Start Script
# Powershell script to start QYBERNEX services using Docker Compose

[CmdletBinding()]
param(
    [switch]$Build
)

$ErrorActionPreference = "Stop"

Write-Host "==========================================================" -ForegroundColor Cyan
Write-Host "                Starting QYBERNEX Platform                " -ForegroundColor Cyan
Write-Host "==========================================================" -ForegroundColor Cyan

$envPath = Join-Path $PSScriptRoot "..\.env"
if (-not (Test-Path $envPath)) {
    Write-Host "Local .env file missing. Invoking setup.ps1..." -ForegroundColor Yellow
    & "$PSScriptRoot\setup.ps1"
}

if (-not (Get-Command "docker" -ErrorAction SilentlyContinue)) {
    Write-Host "[ERROR] Docker command not found. Please install and start Docker Desktop." -ForegroundColor Red
    exit 1
}

$composeCmd = "docker-compose"
if (Get-Command "docker" -ErrorAction SilentlyContinue) {
    $dockerComposeCheck = docker compose version 2>$null
    if ($LASTEXITCODE -eq 0) {
        $composeCmd = "docker compose"
    }
}

$cmdArgs = "up -d"
if ($Build) {
    $cmdArgs = "up -d --build"
}

Write-Host "`nLaunching containers ($composeCmd $cmdArgs)..." -ForegroundColor Yellow
Invoke-Expression "$composeCmd $cmdArgs"

Write-Host "`n==========================================================" -ForegroundColor Cyan
Write-Host " QYBERNEX Stack Started!" -ForegroundColor Green
Write-Host " Frontend: http://localhost:3000" -ForegroundColor White
Write-Host " Backend API Docs: http://localhost:8000/api/v1/docs" -ForegroundColor White
Write-Host " Health Check: http://localhost:8000/api/v1/health" -ForegroundColor White
Write-Host "==========================================================" -ForegroundColor Cyan
