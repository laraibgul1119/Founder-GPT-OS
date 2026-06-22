'use client';

import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

interface TabItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
}

interface TabsProps {
  tabs: TabItem[];
  activeTab: string;
  onChange: (tabId: string) => void;
  className?: string;
}

export function Tabs({ tabs, activeTab, onChange, className = '' }: TabsProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const activeTabData = tabs.find((t) => t.id === activeTab);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMobileMenuOpen(false);
      }
    }
    if (mobileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [mobileMenuOpen]);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [activeTab]);

  return (
    <div className={className}>
      {/* Mobile: Dropdown selector (< 768px) */}
      <div className="md:hidden" ref={menuRef}>
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="flex items-center justify-between w-full gap-2 rounded-xl border border-slate-800 bg-slate-900/60 px-4 py-3.5 text-sm font-semibold text-white transition-colors hover:border-slate-700 min-h-[48px]"
          aria-expanded={mobileMenuOpen}
          aria-haspopup="listbox"
        >
          <span className="flex items-center gap-2.5 min-w-0">
            {activeTabData?.icon}
            <span className="truncate">{activeTabData?.label}</span>
          </span>
          <ChevronDown
            className={`h-4 w-4 shrink-0 text-slate-400 transition-transform duration-200 ${
              mobileMenuOpen ? 'rotate-180' : ''
            }`}
          />
        </button>

        {mobileMenuOpen && (
          <div
            className="mt-1.5 rounded-xl border border-slate-800 bg-slate-900/95 backdrop-blur-xl shadow-xl overflow-hidden"
            role="listbox"
          >
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  onChange(tab.id);
                  setMobileMenuOpen(false);
                }}
                role="option"
                aria-selected={activeTab === tab.id}
                className={`flex items-center gap-3 w-full px-4 py-3.5 text-sm font-medium transition-colors min-h-[48px] ${
                  activeTab === tab.id
                    ? 'bg-cyan-950/20 text-cyan-400 border-l-2 border-cyan-400'
                    : 'text-slate-300 hover:bg-slate-800/60 hover:text-white border-l-2 border-transparent'
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Desktop: Horizontal tabs (>= 768px) */}
      <div className="hidden md:flex overflow-x-auto gap-1 border-b border-slate-900 pb-px scrollbar-none scroll-fade-right">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={`flex items-center gap-2 rounded-t-xl px-4 lg:px-5 py-3 text-sm font-semibold transition-all whitespace-nowrap border-b-2 min-h-[44px] ${
              activeTab === tab.id
                ? 'border-cyan-400 text-cyan-400 bg-cyan-950/10'
                : 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-900/50'
            }`}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
}
