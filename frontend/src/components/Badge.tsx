import React from 'react';

type BadgeVariant = 'success' | 'warning' | 'danger' | 'info' | 'purple' | 'slate';

interface BadgeProps {
  variant?: BadgeVariant;
  children: React.ReactNode;
  className?: string;
}

const variantStyles: Record<BadgeVariant, string> = {
  success: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
  warning: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
  danger: 'bg-rose-500/10 text-rose-400 border-rose-500/30',
  info: 'bg-qyber-blue/10 text-qyber-blue border-qyber-blue/30',
  purple: 'bg-qyber-violet/20 text-purple-300 border-qyber-violet/40',
  slate: 'bg-slate-800 text-slate-400 border-slate-700'
};

export const Badge: React.FC<BadgeProps> = ({
  variant = 'slate',
  children,
  className = ''
}) => {
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${variantStyles[variant]} ${className}`}>
      {children}
    </span>
  );
};
