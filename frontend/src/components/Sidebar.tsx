import React from 'react';
import {
  Shield,
  Activity,
  Eye,
  Radio,
  Lock,
  Search,
  AlertTriangle,
  Server,
  Zap,
  Terminal,
  Bot
} from 'lucide-react';

interface SidebarProps {
  activeModule: string;
  onSelectModule: (id: string) => void;
}

interface NavItem {
  id: string;
  label: string;
  icon: React.ElementType;
  phase: string;
  isOperational: boolean;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeModule,
  onSelectModule
}) => {
  const navItems: NavItem[] = [
    { id: 'cyberdesk', label: 'CyberDesk SOC', icon: Activity, phase: 'Phase 1', isOperational: true },
    { id: 'ids_ips', label: 'IDS / IPS Engine', icon: Radio, phase: 'Phase 2', isOperational: false },
    { id: 'siem', label: 'SIEM Correlation', icon: Eye, phase: 'Phase 2', isOperational: false },
    { id: 'ai_threat_intel', label: 'AI Threat Intel', icon: Search, phase: 'Phase 3', isOperational: false },
    { id: 'cyber_deception', label: 'Cyber Deception', icon: Zap, phase: 'Phase 3', isOperational: false },
    { id: 'endpoint_security', label: 'Endpoint Security', icon: Server, phase: 'Phase 4', isOperational: false },
    { id: 'network_monitoring', label: 'Network Telemetry', icon: Terminal, phase: 'Phase 4', isOperational: false },
    { id: 'vulnerability_mgmt', label: 'Vulnerability Mgmt', icon: AlertTriangle, phase: 'Phase 4', isOperational: false },
    { id: 'incident_response', label: 'Incident Response', icon: Shield, phase: 'Phase 5', isOperational: false },
    { id: 'quantum_vault', label: 'Quantum Evidence Vault', icon: Lock, phase: 'Phase 5', isOperational: false },
    { id: 'qybernex_autopilot', label: 'Autopilot Coordinator', icon: Bot, phase: 'Phase 6', isOperational: false },
  ];

  return (
    <aside className="w-64 border-r border-qyber-border bg-[#0D1322] flex flex-col justify-between h-screen sticky top-0">
      <div>
        {/* Brand Header */}
        <div className="p-5 border-b border-qyber-border/80 flex items-center gap-3">
          <div className="p-2 rounded-lg bg-gradient-to-br from-qyber-blue/20 to-qyber-violet/20 border border-qyber-blue/30 text-qyber-blue shadow-[0_0_15px_rgba(0,240,255,0.2)]">
            <Shield className="w-6 h-6" />
          </div>
          <div>
            <h1 className="font-extrabold text-lg text-white tracking-wider flex items-center gap-1.5">
              QYBER<span className="text-qyber-blue">NEX</span>
            </h1>
            <p className="text-[10px] font-mono text-qyber-textMuted uppercase tracking-wider">Cyber Deception OS</p>
          </div>
        </div>

        {/* Navigation List */}
        <div className="p-3 space-y-1 overflow-y-auto max-h-[calc(100vh-140px)]">
          <div className="px-3 py-2 text-[10px] font-semibold text-slate-500 uppercase tracking-wider">
            Security Modules
          </div>

          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeModule === item.id;

            return (
              <button
                key={item.id}
                onClick={() => onSelectModule(item.id)}
                className={`w-full text-left px-3 py-2.5 rounded-lg flex items-center justify-between text-xs font-medium transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-qyber-blue/15 to-qyber-violet/15 text-white border border-qyber-blue/40 shadow-[0_0_10px_rgba(0,240,255,0.1)]'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 border border-transparent'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-qyber-blue' : item.isOperational ? 'text-slate-300' : 'text-slate-500'}`} />
                  <span className="truncate">{item.label}</span>
                </div>

                {item.isOperational ? (
                  <span className="px-1.5 py-0.5 rounded text-[9px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    LIVE
                  </span>
                ) : (
                  <span className="px-1.5 py-0.5 rounded text-[9px] font-medium bg-slate-800/80 text-slate-500 border border-slate-700/50">
                    {item.phase}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Footer info */}
      <div className="p-4 border-t border-qyber-border text-center">
        <p className="text-[11px] font-mono text-qyber-textMuted">
          QYBERNEX Platform Core
        </p>
        <p className="text-[10px] text-slate-600 mt-0.5">
          Anticipate. Outsmart. Protect.
        </p>
      </div>
    </aside>
  );
};
