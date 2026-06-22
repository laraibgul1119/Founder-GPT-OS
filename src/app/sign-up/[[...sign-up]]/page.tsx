'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Briefcase, ArrowLeft, Mail, Lock, User, Loader2 } from 'lucide-react';

export default function SignUpPage() {
  const router = useRouter();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, firstName, lastName }),
      });

      if (res.ok) {
        router.push('/dashboard');
        router.refresh();
      } else {
        const data = await res.json();
        setError(data.error || 'Failed to create account');
      }
    } catch {
      setError('A network error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      <header className="w-full glass-nav">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-2 min-w-0">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl gradient-bg shadow-md">
              <Briefcase className="h-5 w-5 text-white animate-pulse" />
            </div>
            <span className="text-lg sm:text-xl font-bold tracking-tight text-white">
              Founder<span className="gradient-text font-extrabold">GPT OS</span>
            </span>
          </Link>
          <Link
            href="/"
            className="flex items-center gap-1.5 text-xs sm:text-sm text-slate-400 hover:text-white transition-colors min-h-[44px] px-2"
          >
            <ArrowLeft className="h-4 w-4 shrink-0" />
            <span className="hidden sm:inline">Back to Home</span>
          </Link>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center px-4 py-8 sm:py-10 lg:py-12">
        <div className="w-full max-w-md">
          <div className="text-center mb-6 sm:mb-8">
            <h1 className="text-xl sm:text-2xl font-bold text-white">Create Your Account</h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-2 leading-relaxed">
              Start generating investor-ready business plans in minutes.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-5 sm:p-6 glass">
            {error && (
              <div className="mb-4 rounded-xl border border-red-500/20 bg-red-500/5 p-3 text-red-400 text-xs">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-300 flex items-center gap-1">
                    <User className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                    First Name
                  </label>
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="John"
                    className="w-full rounded-xl border border-slate-800 bg-slate-950 p-3 text-sm text-slate-200 placeholder-slate-600 focus:border-cyan-500 focus:outline-none transition-colors min-h-[48px]"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-300">Last Name</label>
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Doe"
                    className="w-full rounded-xl border border-slate-800 bg-slate-950 p-3 text-sm text-slate-200 placeholder-slate-600 focus:border-cyan-500 focus:outline-none transition-colors min-h-[48px]"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-300 flex items-center gap-1">
                  <Mail className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                  className="w-full rounded-xl border border-slate-800 bg-slate-950 p-3 text-sm text-slate-200 placeholder-slate-600 focus:border-cyan-500 focus:outline-none transition-colors min-h-[48px]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-300 flex items-center gap-1">
                  <Lock className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Min. 6 characters"
                  required
                  minLength={6}
                  className="w-full rounded-xl border border-slate-800 bg-slate-950 p-3 text-sm text-slate-200 placeholder-slate-600 focus:border-cyan-500 focus:outline-none transition-colors min-h-[48px]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-300 flex items-center gap-1">
                  <Lock className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                  Confirm Password
                </label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Repeat your password"
                  required
                  minLength={6}
                  className="w-full rounded-xl border border-slate-800 bg-slate-950 p-3 text-sm text-slate-200 placeholder-slate-600 focus:border-cyan-500 focus:outline-none transition-colors min-h-[48px]"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 rounded-xl gradient-bg py-3.5 text-sm font-bold text-white shadow-lg hover:brightness-110 active:scale-[0.98] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed min-h-[48px]"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Creating Account...
                  </>
                ) : (
                  'Create Account'
                )}
              </button>
            </form>

            <p className="text-center text-xs sm:text-sm text-slate-400 mt-5 sm:mt-6">
              Already have an account?{' '}
              <Link href="/sign-in" className="text-cyan-400 hover:text-cyan-300 font-medium min-h-[44px] inline-flex items-center">
                Sign In
              </Link>
            </p>
          </div>

          <p className="text-center text-[10px] sm:text-xs text-slate-500 mt-5 sm:mt-6 leading-relaxed">
            By creating an account, you agree to our Terms of Service and Privacy Policy.
          </p>
        </div>
      </main>
    </div>
  );
}
