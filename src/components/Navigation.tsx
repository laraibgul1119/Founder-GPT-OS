'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { LayoutDashboard, PlusCircle, CreditCard, LogOut, Briefcase, Settings, Menu, X } from 'lucide-react';

export default function Navigation() {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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

  useEffect(() => {
    setMobileMenuOpen(false);
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
        <div className="flex items-center gap-2 min-w-0">
          <Link href="/dashboard" className="flex items-center gap-2 min-w-0">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl gradient-bg shadow-md">
              <Briefcase className="h-5 w-5 text-white animate-pulse" />
            </div>
            <span className="text-lg sm:text-xl font-bold tracking-tight text-white hidden sm:block truncate">
              Founder<span className="gradient-text font-extrabold">GPT OS</span>
            </span>
          </Link>
          {user && (
            <span className={`ml-3 rounded-full px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wider hidden md:inline-block ${
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

        {/* Desktop Navigation - visible on lg+ */}
        <nav className="hidden lg:flex items-center space-x-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition-all duration-200 min-h-[44px] ${
                  isActive
                    ? 'bg-slate-800 text-cyan-400 border border-slate-700/50 shadow-inner'
                    : 'text-slate-300 hover:bg-slate-800/60 hover:text-white'
                }`}
              >
                <Icon className="h-4 w-4 shrink-0" />
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* User Info / Auth Buttons */}
        <div className="flex items-center gap-2 sm:gap-4">
          {!loading && !user && (
            <div className="flex items-center gap-2">
              <Link
                href="/sign-in"
                className="text-sm font-medium text-slate-300 hover:text-white transition-colors px-3 py-2.5 min-h-[44px] flex items-center"
              >
                Sign In
              </Link>
              <Link
                href="/sign-up"
                className="rounded-lg gradient-bg px-4 py-2.5 text-sm font-semibold text-white shadow hover:brightness-110 transition-all min-h-[44px] flex items-center"
              >
                Sign Up
              </Link>
            </div>
          )}
          {!loading && user && (
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="text-right hidden sm:block">
                <p className="text-xs font-medium text-slate-200">
                  {user.firstName ? `${user.firstName} ${user.lastName || ''}` : user.email.split('@')[0]}
                </p>
                <p className="text-[10px] text-slate-400">
                  {user.blueprintsUsedThisMonth} / {user.blueprintLimit === 99999 ? '∞' : user.blueprintLimit} plans
                </p>
              </div>

              <div className="flex items-center gap-1 sm:gap-2">
                <Link
                  href="/settings"
                  className="h-9 w-9 sm:h-8 sm:w-8 rounded-full gradient-bg flex items-center justify-center font-bold text-sm text-white shadow-inner hover:brightness-110 transition-all"
                >
                  {user.firstName ? user.firstName[0] : user.email[0].toUpperCase()}
                </Link>

                {/* Hamburger Menu Button - visible on md/lg breakpoint */}
                <button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="lg:hidden flex items-center justify-center rounded-lg p-2.5 text-slate-400 hover:bg-slate-800 hover:text-white transition-colors min-h-[44px] min-w-[44px]"
                  aria-label="Toggle navigation menu"
                >
                  {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                </button>

                {/* Sign Out - hidden on mobile */}
                <button
                  onClick={handleLogout}
                  title="Sign Out"
                  className="hidden lg:flex items-center justify-center rounded-lg p-2.5 text-slate-400 hover:bg-slate-800 hover:text-red-400 transition-colors min-h-[44px] min-w-[44px]"
                >
                  <LogOut className="h-4 w-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Hamburger Dropdown Menu - for tablets (md to lg) */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-800/40 bg-slate-900/95 backdrop-blur-xl">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 py-3 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center gap-3 rounded-lg px-4 py-3.5 text-sm font-medium transition-all min-h-[48px] ${
                    isActive
                      ? 'bg-slate-800 text-cyan-400 border border-slate-700/50'
                      : 'text-slate-300 hover:bg-slate-800/60 hover:text-white'
                  }`}
                >
                  <Icon className="h-4 w-4 shrink-0" />
                  {item.name}
                </Link>
              );
            })}
            <div className="border-t border-slate-800/40 pt-2 mt-2">
              <button
                onClick={handleLogout}
                className="flex items-center gap-3 w-full rounded-lg px-4 py-3.5 text-sm font-medium text-red-400 hover:bg-red-500/10 transition-colors min-h-[48px]"
              >
                <LogOut className="h-4 w-4 shrink-0" />
                Sign Out
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Bottom Navigation Bar - visible only on small screens */}
      <div className="flex md:hidden border-t border-slate-800/40 bg-slate-900/90 py-1.5 justify-around pb-safe safe-area-bottom">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex flex-col items-center gap-0.5 px-3 py-1.5 text-[10px] font-medium transition-colors min-w-[64px] min-h-[48px] justify-center ${
                isActive ? 'text-cyan-400 font-semibold' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Icon className="h-5 w-5 shrink-0" />
              <span className="truncate w-full text-center">{item.name.split(' ')[0]}</span>
            </Link>
          );
        })}
      </div>
    </header>
  );
}
