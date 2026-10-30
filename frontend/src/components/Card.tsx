import React from 'react';

interface CardProps {
  title?: string;
  subtitle?: string;
  action?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export const Card: React.FC<CardProps> = ({
  title,
  subtitle,
  action,
  children,
  className = ''
}) => {
  return (
    <div className={`bg-qyber-card border border-qyber-border rounded-xl p-5 shadow-lg backdrop-blur-sm transition-all hover:border-slate-700 ${className}`}>
      {(title || action) && (
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-qyber-border/60">
          <div>
            {title && <h3 className="font-semibold text-slate-100 text-lg tracking-wide">{title}</h3>}
            {subtitle && <p className="text-xs text-qyber-textMuted mt-0.5">{subtitle}</p>}
          </div>
          {action && <div>{action}</div>}
        </div>
      )}
      {children}
    </div>
  );
};
