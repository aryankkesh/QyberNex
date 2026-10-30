# QYBERNEX Stop Script
# Powershell script to gracefully stop QYBERNEX containers

[CmdletBinding()]
param(
    [switch]$Volumes
)

$ErrorActionPreference = "Stop"

Write-Host "==========================================================" -ForegroundColor Cyan
Write-Host "                Stopping QYBERNEX Services                " -ForegroundColor Cyan
Write-Host "==========================================================" -ForegroundColor Cyan

$composeCmd = "docker-compose"
if (Get-Command "docker" -ErrorAction SilentlyContinue) {
    $dockerComposeCheck = docker compose version 2>$null
    if ($LASTEXITCODE -eq 0) {
        $composeCmd = "docker compose"
    }
}

$cmdArgs = "down"
if ($Volumes) {
    Write-Host "[WARNING] Stopping containers and clearing persistent volumes..." -ForegroundColor Yellow
    $cmdArgs = "down -v"
}

Invoke-Expression "$composeCmd $cmdArgs"

Write-Host "`n[OK] QYBERNEX containers stopped." -ForegroundColor Green
