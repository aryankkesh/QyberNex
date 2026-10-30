import React from 'react';

interface StatusIndicatorProps {
  status: 'healthy' | 'ready' | 'degraded' | 'unavailable' | 'planned' | 'offline';
  label?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const StatusIndicator: React.FC<StatusIndicatorProps> = ({
  status,
  label,
  size = 'md'
}) => {
  const sizeClasses = {
    sm: 'w-2 h-2',
    md: 'w-2.5 h-2.5',
    lg: 'w-3.5 h-3.5'
  };

  const statusColors = {
    healthy: 'bg-emerald-400 shadow-[0_0_8px_rgba(16,185,129,0.8)]',
    ready: 'bg-emerald-400 shadow-[0_0_8px_rgba(16,185,129,0.8)]',
    degraded: 'bg-amber-400 shadow-[0_0_8px_rgba(245,158,11,0.8)]',
    unavailable: 'bg-rose-500 shadow-[0_0_8px_rgba(239,68,68,0.8)]',
    offline: 'bg-slate-500',
    planned: 'bg-qyber-blue shadow-[0_0_8px_rgba(0,240,255,0.8)]'
  };

  return (
    <div className="inline-flex items-center gap-2">
      <span className="relative flex items-center justify-center">
        {(status === 'healthy' || status === 'ready') && (
          <span className={`animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75`} />
        )}
        <span className={`relative rounded-full ${sizeClasses[size]} ${statusColors[status] || 'bg-slate-500'}`} />
      </span>
      {label && <span className="text-xs font-medium text-slate-300 capitalize">{label}</span>}
    </div>
  );
};
