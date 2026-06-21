'use client';

import React from 'react';

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
  return (
    <div className={`flex overflow-x-auto gap-1 border-b border-slate-900 pb-px scrollbar-none scroll-fade-right ${className}`}>
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onChange(tab.id)}
          className={`flex items-center gap-1.5 rounded-t-xl px-3 sm:px-4 py-3 text-xs font-semibold transition-all whitespace-nowrap border-b-2 min-h-[44px] ${
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
  );
}