# QYBERNEX Test Script
# Powershell script to execute automated tests for backend and frontend

[CmdletBinding()]
param()

$ErrorActionPreference = "Continue"

Write-Host "==========================================================" -ForegroundColor Cyan
Write-Host "               Running QYBERNEX Test Suite                " -ForegroundColor Cyan
Write-Host "==========================================================" -ForegroundColor Cyan

$backendDir = Join-Path $PSScriptRoot "..\backend"
$frontendDir = Join-Path $PSScriptRoot "..\frontend"

Write-Host "`n[1/2] Running Backend Tests (Pytest)..." -ForegroundColor Yellow
Push-Location $backendDir
$env:PYTHONPATH = "."
$env:TESTING = "True"
python -m pytest tests/
$backendExit = $LASTEXITCODE
Pop-Location

if ($backendExit -eq 0) {
    Write-Host "  [PASS] Backend test suite passed successfully!" -ForegroundColor Green
} else {
    Write-Host "  [FAIL] Backend tests encountered failures." -ForegroundColor Red
}

Write-Host "`n[2/2] Running Frontend Build Test..." -ForegroundColor Yellow
Push-Location $frontendDir
npm run build
$frontendExit = $LASTEXITCODE
Pop-Location

if ($frontendExit -eq 0) {
    Write-Host "  [PASS] Frontend TypeScript build verified successfully!" -ForegroundColor Green
} else {
    Write-Host "  [FAIL] Frontend build failed." -ForegroundColor Red
}

Write-Host "`n==========================================================" -ForegroundColor Cyan
if ($backendExit -eq 0 -and $frontendExit -eq 0) {
    Write-Host " ALL TEST SUITES PASSED!" -ForegroundColor Green
} else {
    Write-Host " TEST SUITE COMPLETED WITH ERRORS" -ForegroundColor Red
}
Write-Host "==========================================================" -ForegroundColor Cyan
