'use client';

import React, { Suspense, useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import Navigation from '@/components/Navigation';
import { 
  Plus, 
  Briefcase, 
  Trash2, 
  Eye, 
  Calendar, 
  TrendingUp, 
  ShieldAlert,
  Sparkles,
  ArrowRight,
  TrendingDown,
  Loader2
} from 'lucide-react';

export default function DashboardPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center">
        <Loader2 className="h-8 w-8 text-cyan-500 animate-spin" />
      </div>
    }>
      <Dashboard />
    </Suspense>
  );
}

function Dashboard() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [user, setUser] = useState<any>(null);
  const [blueprints, setBlueprints] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  
  // Show upgrade notification
  const [showUpgradeAlert, setShowUpgradeAlert] = useState(false);
  const [upgradedPlan, setUpgradedPlan] = useState('');

  useEffect(() => {
    const upgradeFlag = searchParams.get('upgrade');
    const planFlag = searchParams.get('plan');
    if (upgradeFlag === 'success' && planFlag) {
      setUpgradedPlan(planFlag);
      setShowUpgradeAlert(true);
      // Clean url parameters
      router.replace('/dashboard');
    }
  }, [searchParams, router]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [userRes, blueprintsRes] = await Promise.all([
        fetch('/api/auth/user'),
        fetch('/api/blueprints')
      ]);

      if (userRes.ok) {
        const userData = await userRes.json();
        setUser(userData);
      }
      if (blueprintsRes.ok) {
        const blueprintsData = await blueprintsRes.json();
        setBlueprints(blueprintsData.blueprints || []);
      }
    } catch (error) {
      console.error('Failed to load dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    if (!confirm('Are you sure you want to delete this business blueprint?')) return;
    
    try {
      setDeletingId(id);
      const res = await fetch(`/api/blueprints/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setBlueprints(prev => prev.filter(bp => bp.id !== id));
        // Refresh user details to update blueprints count
        const userRes = await fetch('/api/auth/user');
        if (userRes.ok) {
          const userData = await userRes.json();
          setUser(userData);
        }
      }
    } catch (err) {
      console.error('Delete failed:', err);
    } finally {
      setDeletingId(null);
    }
  };

  const formatMarketSize = (value: number | null) => {
    if (!value) return 'Not Specified';
    if (value >= 1e9) return `$${(value / 1e9).toFixed(1)} Billion`;
    if (value >= 1e6) return `$${(value / 1e6).toFixed(0)} Million`;
    return `$${value.toLocaleString()}`;
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      <Navigation />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Upgrade alert modal banner */}
        {showUpgradeAlert && (
          <div className="mb-6 rounded-xl border border-cyan-500/30 bg-cyan-950/20 p-4 pulse-glow text-cyan-400 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <Sparkles className="h-5 w-5 text-cyan-400" />
              <div>
                <h4 className="font-bold text-white uppercase tracking-wider text-sm">Subscription Upgraded Successfully!</h4>
                <p className="text-xs text-slate-300 mt-0.5">Your account has been upgraded to the <strong className="text-cyan-400 capitalize">{upgradedPlan}</strong> plan. Enjoy your elevated generation quota.</p>
              </div>
            </div>
            <button 
              onClick={() => setShowUpgradeAlert(false)}
              className="text-slate-400 hover:text-white text-xs font-semibold px-3 py-1.5 rounded-lg hover:bg-slate-800 transition-colors"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* Welcome Banner */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-slate-900 pb-6 mb-8">
          <div>
            <h2 className="text-2xl font-bold text-white sm:text-3xl">
              Welcome back, {user ? (user.firstName || user.email.split('@')[0]) : 'Founder'}
            </h2>
            <p className="text-sm text-slate-400 mt-1">
              Select or generate a business plan using advanced AI models.
            </p>
          </div>
          <div>
            <Link
              href="/generate"
              className="inline-flex items-center gap-2 rounded-xl gradient-bg px-5 py-3 text-sm font-semibold text-white shadow-lg hover:brightness-110 active:scale-[0.98] transition-all duration-200"
            >
              <Plus className="h-4 w-4" />
              Generate New Blueprint
            </Link>
          </div>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-3">
            <Loader2 className="h-8 w-8 text-cyan-500 animate-spin" />
            <p className="text-sm text-slate-400">Loading dashboard resources...</p>
          </div>
        ) : (
          <div className="space-y-8">
            {/* Quick Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="rounded-xl border border-slate-900 bg-slate-900/40 p-5 glass">
                <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">Monthly Usage limit</span>
                <div className="flex items-baseline gap-1.5 mt-2">
                  <span className="text-3xl font-extrabold text-white">
                    {user?.blueprintsUsedThisMonth || 0}
                  </span>
                  <span className="text-sm text-slate-500">
                    / {user?.blueprintLimit === 99999 ? 'Unlimited' : user?.blueprintLimit} plans
                  </span>
                </div>
                {/* Visual meter */}
                <div className="mt-3 w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                  <div 
                    className="gradient-bg h-1.5 rounded-full transition-all duration-500" 
                    style={{ 
                      width: `${user?.blueprintLimit === 99999 
                        ? 10 
                        : Math.min(((user?.blueprintsUsedThisMonth || 0) / (user?.blueprintLimit || 1)) * 100, 100)}%` 
                    }}
                  />
                </div>
              </div>

              <div className="rounded-xl border border-slate-900 bg-slate-900/40 p-5 glass">
                <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">Subscription Tier</span>
                <div className="flex items-baseline gap-1.5 mt-2">
                  <span className="text-3xl font-extrabold text-cyan-400 capitalize">
                    {user?.tier || 'free'}
                  </span>
                </div>
                <div className="mt-2 text-xs text-slate-400">
                  {user?.tier === 'free' ? (
                    <Link href="/pricing" className="text-cyan-400 font-semibold hover:underline flex items-center gap-0.5">
                      Upgrade to unlock templates & PDF exports <ArrowRight className="h-3 w-3" />
                    </Link>
                  ) : 'Priority queue generation enabled'}
                </div>
              </div>

              <div className="rounded-xl border border-slate-900 bg-slate-900/40 p-5 glass">
                <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">Total Blueprints Created</span>
                <div className="flex items-baseline gap-1.5 mt-2">
                  <span className="text-3xl font-extrabold text-white">
                    {blueprints.length}
                  </span>
                  <span className="text-xs text-slate-500">plans generated</span>
                </div>
                <div className="mt-2 text-xs text-slate-400 flex items-center gap-1">
                  <Calendar className="h-3.5 w-3.5 text-slate-500" />
                  <span>Reset date: {user ? new Date(user.monthlyResetDate).toLocaleDateString() : 'N/A'}</span>
                </div>
              </div>
            </div>

            {/* Blueprints Display */}
            <div>
              <h3 className="text-lg font-bold text-white mb-4">Your Generated Blueprints</h3>
              
              {blueprints.length === 0 ? (
                <div className="rounded-2xl border border-slate-900 bg-slate-900/10 p-12 text-center max-w-xl mx-auto glass">
                  <div className="h-12 w-12 rounded-xl gradient-bg flex items-center justify-center text-white mx-auto mb-4 shadow-md">
                    <Briefcase className="h-6 w-6" />
                  </div>
                  <h4 className="text-base font-bold text-white">No plans generated yet</h4>
                  <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
                    You haven't generated any startup blueprints. Let's create one by filling in your startup idea sentence!
                  </p>
                  <Link
                    href="/generate"
                    className="mt-6 inline-flex items-center gap-2 rounded-lg gradient-bg px-4 py-2 text-xs font-semibold text-white shadow hover:brightness-110 transition-colors"
                  >
                    Generate Your First Blueprint
                  </Link>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {blueprints.map((bp) => {
                    const marketSize = bp.tam;
                    return (
                      <Link 
                        key={bp.id} 
                        href={`/blueprint/${bp.id}`}
                        className="rounded-xl border border-slate-900 bg-slate-900/30 p-5 glass glow-card flex flex-col justify-between group"
                      >
                        <div>
                          <div className="flex justify-between items-start mb-3">
                            <span className="text-[10px] uppercase font-bold tracking-wider text-slate-500 bg-slate-900 px-2 py-0.5 rounded">
                              {bp.industry || 'General SaaS'}
                            </span>
                            <div className="opacity-0 group-hover:opacity-100 flex gap-1 transition-opacity">
                              <button
                                onClick={(e) => handleDelete(bp.id, e)}
                                disabled={deletingId === bp.id}
                                className="p-1.5 text-slate-400 hover:text-red-400 hover:bg-slate-800 rounded transition-colors"
                                title="Delete Blueprint"
                              >
                                {deletingId === bp.id ? (
                                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                                ) : (
                                  <Trash2 className="h-3.5 w-3.5" />
                                )}
                              </button>
                            </div>
                          </div>

                          <h4 className="text-sm font-bold text-white line-clamp-2 leading-snug group-hover:text-cyan-400 transition-colors">
                            {bp.startupIdea}
                          </h4>

                          <div className="mt-4 grid grid-cols-2 gap-2 text-left bg-slate-900/40 p-2.5 rounded-lg border border-slate-850/50">
                            <div>
                              <div className="text-[8px] uppercase tracking-wider font-bold text-slate-400">TAM sizing</div>
                              <div className="text-xs font-bold text-slate-200 mt-0.5">
                                {formatMarketSize(marketSize)}
                              </div>
                            </div>
                            <div>
                              <div className="text-[8px] uppercase tracking-wider font-bold text-slate-400">Intensity</div>
                              <div className="text-xs font-bold text-slate-200 mt-0.5 capitalize">
                                {bp.competitiveIntensity || 'Medium'}
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="mt-5 pt-3 border-t border-slate-900 flex items-center justify-between text-[10px] text-slate-500">
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {new Date(bp.createdAt).toLocaleDateString()}
                          </span>
                          <span className="text-cyan-400 group-hover:translate-x-1 transition-transform flex items-center gap-0.5 font-semibold">
                            View Blueprint <ArrowRight className="h-3 w-3" />
                          </span>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
