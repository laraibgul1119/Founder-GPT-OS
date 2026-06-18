'use client';

import React from 'react';
import { AlertCircle, CheckCircle2, Info, X } from 'lucide-react';

interface AlertProps {
  variant?: 'error' | 'success' | 'warning' | 'info';
  title?: string;
  children: React.ReactNode;
  onDismiss?: () => void;
  className?: string;
}

const icons = {
  error: AlertCircle,
  success: CheckCircle2,
  warning: AlertCircle,
  info: Info,
};

const styles = {
  error: 'border-red-500/20 bg-red-500/10 text-red-400',
  success: 'border-emerald-500/20 bg-emerald-500/10 text-emerald-400',
  warning: 'border-amber-500/20 bg-amber-500/10 text-amber-400',
  info: 'border-cyan-500/20 bg-cyan-500/10 text-cyan-400',
};

export function Alert({ variant = 'info', title, children, onDismiss, className = '' }: AlertProps) {
  const Icon = icons[variant];
  
  return (
    <div className={`rounded-xl border p-4 flex items-start gap-3 ${styles[variant]} ${className}`} role="alert">
      <Icon className="h-5 w-5 flex-shrink-0 mt-0.5" />
      <div className="flex-1 min-w-0">
        {title && <h4 className="font-bold text-sm">{title}</h4>}
        <div className="text-sm leading-relaxed">{children}</div>
      </div>
      {onDismiss && (
        <button onClick={onDismiss} className="p-1 hover:opacity-70 transition-opacity">
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}