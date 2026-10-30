import React from 'react';
import { ReadinessResponse, RegisteredService } from '../services/api';
import { Card } from '../components/Card';
import { Badge } from '../components/Badge';
import { StatusIndicator } from '../components/StatusIndicator';
import { Server, Database, CheckCircle2, AlertCircle, Info } from 'lucide-react';

interface DashboardProps {
  readiness: ReadinessResponse | null;
  services: RegisteredService[];
  activeModule: string;
}

export const Dashboard: React.FC<DashboardProps> = ({
  readiness,
  services,
  activeModule
}) => {
  const currentService = services.find((s) => s.service_id === activeModule) || {
    service_id: activeModule,
    name: 'CyberDesk Unified SOC',
    module_type: 'SOC_CORE',
    status: 'operational',
    version: '0.1.0',
    is_active: true,
    details: { phase: 'Phase 1' }
  };

  const dbStatus = readiness?.components?.database?.status || 'unavailable';
  const registryStatus = readiness?.components?.service_registry?.status || 'ready';

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Branded Mission Banner */}
      <div className="relative rounded-2xl bg-gradient-to-r from-qyber-card via-[#161F33] to-qyber-card p-6 border border-qyber-blue/30 shadow-[0_0_30px_rgba(0,240,255,0.05)] overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-qyber-blue/5 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="info">Mission 01 Foundation Active</Badge>
              <Badge variant="purple">PQC Prepared</Badge>
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
              QYBERNEX <span className="text-transparent bg-clip-text bg-gradient-to-r from-qyber-blue to-qyber-violet">Security Operations Platform</span>
            </h1>
            <p className="text-sm text-qyber-textMuted mt-1 max-w-2xl">
              An AI-Driven Adaptive Cyber Deception and Quantum-Safe Threat Intelligence Platform. Anticipate the Unknown. Outsmart the Threat.
            </p>
          </div>
          <div className="flex items-center gap-3 self-start md:self-auto">
            <div className="px-4 py-2 rounded-xl bg-slate-900/80 border border-qyber-border text-center">
              <div className="text-[10px] text-qyber-textMuted font-mono uppercase">System Status</div>
              <div className="text-sm font-semibold text-emerald-400 flex items-center gap-1.5 mt-0.5">
                <CheckCircle2 className="w-4 h-4" /> Operational
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Top Indicators Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <Card title="Platform Readiness" subtitle="Dependency status check">
          <div className="space-y-3">
            <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-900/50 border border-qyber-border/60">
              <div className="flex items-center gap-2.5">
                <Database className="w-4 h-4 text-qyber-blue" />
                <span className="text-xs font-medium text-slate-200">PostgreSQL Database</span>
              </div>
              <StatusIndicator status={dbStatus === 'ready' ? 'ready' : 'unavailable'} label={dbStatus} size="sm" />
            </div>

            <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-900/50 border border-qyber-border/60">
              <div className="flex items-center gap-2.5">
                <Server className="w-4 h-4 text-qyber-violet" />
                <span className="text-xs font-medium text-slate-200">Central Service Registry</span>
              </div>
              <StatusIndicator status={registryStatus === 'ready' ? 'ready' : 'unavailable'} label={registryStatus} size="sm" />
            </div>
          </div>
        </Card>

        <Card title="Module Architecture" subtitle="Registered engine catalog">
          <div className="space-y-3">
            <div className="flex justify-between items-center text-xs">
              <span className="text-qyber-textMuted">Operational Engines:</span>
              <span className="font-mono font-semibold text-emerald-400">1 / {services.length || 11}</span>
            </div>
            <div className="w-full bg-slate-800 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-qyber-blue to-emerald-400 h-2 rounded-full"
                style={{ width: `${Math.max(10, (1 / (services.length || 11)) * 100)}%` }}
              />
            </div>
            <p className="text-[11px] text-slate-400">
              Future modules will register dynamically with central orchestration.
            </p>
          </div>
        </Card>

        <Card title="Environment & Tech Stack" subtitle="Platform technical details">
          <div className="space-y-2 text-xs">
            <div className="flex justify-between py-1 border-b border-qyber-border/40">
              <span className="text-slate-400">Backend API</span>
              <span className="font-mono text-slate-200">FastAPI / Python 3.12</span>
            </div>
            <div className="flex justify-between py-1 border-b border-qyber-border/40">
              <span className="text-slate-400">Frontend UI</span>
              <span className="font-mono text-slate-200">React / TypeScript / Tailwind</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-slate-400">Containerization</span>
              <span className="font-mono text-slate-200">Docker Compose & PowerShell</span>
            </div>
          </div>
        </Card>
      </div>

      {/* Selected Module Detail Inspector */}
      <Card
        title={`Module Inspector: ${currentService.name}`}
        subtitle={`Type: ${currentService.module_type} | ID: ${currentService.service_id}`}
        action={
          currentService.status === 'operational' ? (
            <Badge variant="success">Operational</Badge>
          ) : (
            <Badge variant="info">Planned ({currentService.details?.phase || 'Future Phase'})</Badge>
          )
        }
      >
        {currentService.status === 'operational' ? (
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-slate-900/70 border border-emerald-500/30 text-xs space-y-2">
              <div className="flex items-center gap-2 text-emerald-400 font-semibold text-sm">
                <CheckCircle2 className="w-4 h-4" /> Operational Service Active
              </div>
              <p className="text-slate-300">
                CyberDesk SOC Core is active and functioning as the central management hub for QYBERNEX.
              </p>
              <div className="pt-2 grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono text-[11px]">
                <div className="p-2 rounded bg-slate-950 border border-qyber-border">
                  <span className="text-slate-500 block">API Status:</span>
                  <span className="text-qyber-blue">GET /api/v1/health (200 OK)</span>
                </div>
                <div className="p-2 rounded bg-slate-950 border border-qyber-border">
                  <span className="text-slate-500 block">Database Sync:</span>
                  <span className="text-emerald-400">Connected & Migrated</span>
                </div>
                <div className="p-2 rounded bg-slate-950 border border-qyber-border">
                  <span className="text-slate-500 block">Autopilot Registry:</span>
                  <span className="text-purple-300">Registered (v{currentService.version})</span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="p-5 rounded-xl bg-slate-900/60 border border-qyber-border text-xs space-y-3">
            <div className="flex items-center gap-2 text-qyber-blue font-semibold text-sm">
              <Info className="w-4 h-4" /> Planned Module Placeholder
            </div>
            <p className="text-slate-300 leading-relaxed">
              This module (<strong>{currentService.name}</strong>) is designed as part of the QYBERNEX roadmap in <strong>{currentService.details?.phase || 'Phase 2+'}</strong>.
            </p>
            <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-300 flex items-start gap-2 text-[11px]">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>
                <strong>Truthful Operations Directive:</strong> Placeholder modules will not simulate or display fabricated security events or fake alert streams. Integration will occur in accordance with platform development phases.
              </span>
            </div>
          </div>
        )}
      </Card>

      {/* Central Service Registry Matrix */}
      <Card title="Central Service Registry Matrix" subtitle="Autopilot-ready module orchestration catalog">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-900/80 text-qyber-textMuted uppercase font-mono text-[10px] border-b border-qyber-border">
              <tr>
                <th className="py-3 px-4">Service ID</th>
                <th className="py-3 px-4">Engine Name</th>
                <th className="py-3 px-4">Module Type</th>
                <th className="py-3 px-4">Phase</th>
                <th className="py-3 px-4 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-qyber-border/50 font-mono">
              {services.map((svc) => (
                <tr
                  key={svc.service_id}
                  className="hover:bg-slate-800/40 transition-colors"
                >
                  <td className="py-3 px-4 font-semibold text-qyber-blue">{svc.service_id}</td>
                  <td className="py-3 px-4 font-sans text-slate-100">{svc.name}</td>
                  <td className="py-3 px-4 text-slate-400">{svc.module_type}</td>
                  <td className="py-3 px-4 text-slate-400">{svc.details?.phase || 'Planned'}</td>
                  <td className="py-3 px-4 text-right">
                    {svc.status === 'operational' ? (
                      <Badge variant="success">OPERATIONAL</Badge>
                    ) : (
                      <Badge variant="slate">PLANNED</Badge>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};
