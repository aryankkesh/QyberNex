import React from 'react';
import { Shield, RefreshCw, Cpu, Database, Activity } from 'lucide-react';
import { StatusIndicator } from './StatusIndicator';

interface HeaderProps {
  systemStatus: 'healthy' | 'degraded' | 'unavailable' | 'loading';
  lastUpdated?: string;
  onRefresh?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  systemStatus,
  lastUpdated,
  onRefresh
}) => {
  return (
    <header className="h-16 border-b border-qyber-border bg-[#0D1322]/80 backdrop-blur-md px-6 flex items-center justify-between sticky top-0 z-20">
      <div className="flex items-center gap-3">
        <div className="md:hidden flex items-center gap-2">
          <Shield className="w-6 h-6 text-qyber-blue" />
          <span className="font-bold text-lg text-white">QYBERNEX</span>
        </div>
        <div className="hidden md:flex items-center gap-2 text-xs font-mono text-qyber-textMuted bg-slate-900/80 px-3 py-1.5 rounded-md border border-qyber-border">
          <Cpu className="w-3.5 h-3.5 text-qyber-blue" />
          <span>ENGINE: v0.1.0-alpha</span>
          <span className="text-slate-600">|</span>
          <Database className="w-3.5 h-3.5 text-qyber-violet" />
          <span>VAULT: Quantum-Ready</span>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 text-xs bg-slate-900/60 px-3 py-1.5 rounded-lg border border-qyber-border">
          <Activity className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-qyber-textMuted hidden sm:inline">Platform Readiness:</span>
          {systemStatus === 'loading' ? (
            <span className="text-slate-400 animate-pulse">Checking...</span>
          ) : (
            <StatusIndicator
              status={systemStatus === 'healthy' ? 'ready' : systemStatus}
              label={systemStatus}
            />
          )}
        </div>

        {onRefresh && (
          <button
            onClick={onRefresh}
            className="p-2 text-slate-400 hover:text-qyber-blue hover:bg-slate-800/80 rounded-lg border border-transparent hover:border-qyber-border transition-all"
            title="Refresh System Metrics"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        )}

        {lastUpdated && (
          <span className="text-[11px] font-mono text-slate-500 hidden xl:inline">
            Updated: {lastUpdated}
          </span>
        )}
      </div>
    </header>
  );
};
