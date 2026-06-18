'use client';

import React from 'react';
import { cn } from '@/lib/cn';

interface AvatarProps {
  src?: string | null;
  alt?: string;
  fallback?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const sizeStyles = {
  sm: 'h-8 w-8 text-xs',
  md: 'h-10 w-10 text-sm',
  lg: 'h-12 w-12 text-base',
};

function getInitials(name?: string | null): string {
  if (!name) return '?';
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0][0]?.toUpperCase() || '?';
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

export function Avatar({ src, alt, fallback, size = 'md', className }: AvatarProps) {
  const [imgError, setImgError] = React.useState(false);

  const showImage = src && !imgError;

  return (
    <div
      className={cn(
        'relative inline-flex items-center justify-center rounded-full overflow-hidden flex-shrink-0',
        'bg-slate-800 border border-slate-700',
        sizeStyles[size],
        className
      )}
    >
      {showImage ? (
        <img
          src={src}
          alt={alt || fallback || 'Avatar'}
          className="h-full w-full object-cover"
          onError={() => setImgError(true)}
        />
      ) : (
        <span className="font-semibold text-slate-300 select-none">
          {getInitials(fallback)}
        </span>
      )}
    </div>
  );
}

interface AvatarGroupProps {
  children: React.ReactNode;
  max?: number;
  className?: string;
}

export function AvatarGroup({ children, max = 3, className }: AvatarGroupProps) {
  const avatars = React.Children.toArray(children).slice(0, max);
  const remaining = React.Children.count(children) - max;

  return (
    <div className={cn('flex -space-x-2', className)}>
      {avatars}
      {remaining > 0 && (
        <div className="relative inline-flex items-center justify-center h-10 w-10 rounded-full bg-slate-700 border-2 border-slate-900 text-xs font-medium text-slate-300">
          +{remaining}
        </div>
      )}
    </div>
  );
}
