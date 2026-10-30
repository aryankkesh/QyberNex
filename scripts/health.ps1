# QYBERNEX Health Check Script
# Powershell script to verify API health and readiness endpoints

[CmdletBinding()]
param(
    [string]$Url = "http://localhost:8000"
)

$ErrorActionPreference = "Continue"

Write-Host "==========================================================" -ForegroundColor Cyan
Write-Host "               Checking QYBERNEX Health                   " -ForegroundColor Cyan
Write-Host "==========================================================" -ForegroundColor Cyan

$healthUrl = "$Url/api/v1/health"
$readyUrl = "$Url/api/v1/ready"

Write-Host "`nChecking Health Endpoint: $healthUrl" -ForegroundColor Yellow
try {
    $healthRes = Invoke-RestMethod -Uri $healthUrl -Method Get -TimeoutSec 5
    Write-Host "  Status: OK" -ForegroundColor Green
    Write-Host "  Platform: $($healthRes.platform)" -ForegroundColor White
    Write-Host "  Version:  $($healthRes.version)" -ForegroundColor White
} catch {
    Write-Host "  [FAIL] Failed to reach health endpoint: $_" -ForegroundColor Red
}

Write-Host "`nChecking Readiness Endpoint: $readyUrl" -ForegroundColor Yellow
try {
    $readyRes = Invoke-RestMethod -Uri $readyUrl -Method Get -TimeoutSec 5
    Write-Host "  Readiness Status: $($readyRes.status)" -ForegroundColor Green
    Write-Host "  Database: $($readyRes.components.database.status)" -ForegroundColor White
    Write-Host "  Registry: $($readyRes.components.service_registry.status)" -ForegroundColor White
} catch {
    Write-Host "  [FAIL] Failed to reach readiness endpoint: $_" -ForegroundColor Red
}

Write-Host "`n==========================================================" -ForegroundColor Cyan
