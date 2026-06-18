'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { LayoutDashboard, PlusCircle, CreditCard, LogOut, Briefcase, Settings } from 'lucide-react';

export default function Navigation() {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await fetch('/api/auth/user');
        if (res.ok) {
          const data = await res.json();
          setUser(data);
        }
      } catch (err) {
        console.error('Failed to fetch user:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchUser();
  }, [pathname]);

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/signout', { method: 'POST' });
    } catch (err) {
      console.error('Logout failed:', err);
    }
    router.push('/');
    router.refresh();
  };

  const navItems = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Generate Plan', href: '/generate', icon: PlusCircle },
    { name: 'Pricing', href: '/pricing', icon: CreditCard },
    { name: 'Settings', href: '/settings', icon: Settings },
  ];

  return (
    <header className="sticky top-0 z-40 w-full glass-nav">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <Link href="/dashboard" className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl gradient-bg shadow-md">
              <Briefcase className="h-5 w-5 text-white animate-pulse" />
            </div>
            <span className="text-xl font-bold tracking-tight text-white sm:block">
              Founder<span className="gradient-text font-extrabold">GPT OS</span>
            </span>
          </Link>
          {user && (
            <span className={`ml-3 rounded-full px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wider ${
              user.tier === 'pro' 
                ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20' 
                : user.tier === 'starter'
                ? 'bg-sky-500/10 text-sky-400 border border-sky-500/20'
                : 'bg-slate-500/10 text-slate-400 border border-slate-500/20'
            }`}>
              {user.tier} Tier
            </span>
          )}
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-slate-800 text-cyan-400 border border-slate-700/50 shadow-inner'
                    : 'text-slate-300 hover:bg-slate-800/60 hover:text-white'
                }`}
              >
                <Icon className="h-4 w-4" />
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* User Info / Auth Buttons */}
        <div className="flex items-center gap-4">
          {!loading && !user && (
            <div className="flex items-center gap-2">
              <Link
                href="/sign-in"
                className="text-sm font-medium text-slate-300 hover:text-white transition-colors px-3 py-2"
              >
                Sign In
              </Link>
              <Link
                href="/sign-up"
                className="rounded-lg gradient-bg px-4 py-2 text-sm font-semibold text-white shadow hover:brightness-110 transition-all"
              >
                Sign Up
              </Link>
            </div>
          )}
          {!loading && user && (
            <div className="flex items-center gap-3">
              <div className="text-right hidden sm:block">
                <p className="text-xs font-medium text-slate-200">
                  {user.firstName ? `${user.firstName} ${user.lastName || ''}` : user.email.split('@')[0]}
                </p>
                <p className="text-[10px] text-slate-400">
                  {user.blueprintsUsedThisMonth} / {user.blueprintLimit === 99999 ? '∞' : user.blueprintLimit} plans
                </p>
              </div>

              {/* Dynamic Auth Profile UI */}
              <div className="flex items-center gap-2">
                <Link href="/settings" className="h-8 w-8 rounded-full gradient-bg flex items-center justify-center font-bold text-sm text-white shadow-inner hover:brightness-110 transition-all">
                  {user.firstName ? user.firstName[0] : user.email[0].toUpperCase()}
                </Link>
                
                {/* Mock Sign Out / Switch User Option */}
                <button
                  onClick={handleLogout}
                  title="Sign Out"
                  className="rounded-lg p-2 text-slate-400 hover:bg-slate-800 hover:text-red-400 transition-colors"
                >
                  <LogOut className="h-4 w-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Navigation Bar */}
      <div className="flex md:hidden border-t border-slate-800/40 bg-slate-900/90 py-2 justify-around">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex flex-col items-center gap-0.5 px-3 py-1 text-xs font-medium transition-colors ${
                isActive ? 'text-cyan-400 font-semibold' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Icon className="h-4 w-4" />
              <span>{item.name.split(' ')[0]}</span>
            </Link>
          );
        })}
      </div>
    </header>
  );
}
