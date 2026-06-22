'use client';

import React, { useEffect } from 'react';
import { X } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export function Modal({ isOpen, onClose, title, description, children, footer, size = 'md' }: ModalProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const sizes = {
    sm: 'max-w-sm sm:max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />
      <div className={`relative w-full ${sizes[size]} max-w-[calc(100vw-1.5rem)] bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden`}>
        <div className="flex items-center justify-between border-b border-slate-800 p-4 sm:p-5 md:p-6">
          <div className="min-w-0 flex-1">
            <h2 className="text-base sm:text-lg md:text-xl font-bold text-white">{title}</h2>
            {description && <p className="mt-1 text-xs sm:text-sm text-slate-400 leading-relaxed">{description}</p>}
          </div>
          <button
            onClick={onClose}
            className="flex items-center justify-center p-2.5 rounded-lg text-slate-400 hover:bg-slate-800 hover:text-white transition-colors min-h-[44px] min-w-[44px] shrink-0 ml-2"
            aria-label="Close modal"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="p-4 sm:p-5 md:p-6 max-h-[70vh] overflow-y-auto">
          {children}
        </div>
        {footer && (
          <div className="flex items-center justify-end gap-2 sm:gap-3 border-t border-slate-800 p-4 sm:p-5 md:p-6">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}
