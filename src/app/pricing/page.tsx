'use client';

import React, { useState } from 'react';
import Navigation from '@/components/Navigation';
import { CheckCircle2, ShieldCheck, Loader2 } from 'lucide-react';

export default function Pricing() {
  const [upgradingPlan, setUpgradingPlan] = useState<string | null>(null);

  const pricingTiers = [
    {
      id: 'free',
      name: 'Free Trial',
      price: '$0',
      period: 'forever',
      desc: 'Perfect for testing out the generation capabilities.',
      features: [
        '1 business plan credit',
        'Interactive 8-tab dashboard viewer',
        'Public shareable links',
        'Standard LLM speed'
      ],
      cta: 'Current Plan',
      active: true,
      highlighted: false,
    },
    {
      id: 'starter',
      name: 'Starter Plan',
      price: '$99',
      period: 'per month',
      desc: 'Best for founders validating 2-3 ideas/month.',
      features: [
        '5 business blueprints per month',
        'Interactive 8-tab dashboard',
        'PDF exports of blueprints',
        'TAM/SAM/SOM breakdown analytics',
        'Priority support response'
      ],
      cta: 'Upgrade to Starter',
      active: false,
      highlighted: true,
    },
    {
      id: 'pro',
      name: 'Pro Unlimited',
      price: '$299',
      period: 'per month',
      desc: 'Ideal for consultants, incubators, and builders.',
      features: [
        'Unlimited business blueprint generations',
        'Lightning priority generation queue (2s)',
        'Full PDF and Excel spreadsheet exports',
        'Custom template customization inputs',
        'Advanced competitor analysis templates',
        'API Access integrations'
      ],
      cta: 'Upgrade to Pro',
      active: false,
      highlighted: false,
    }
  ];

  const handleUpgrade = async (planId: string) => {
    if (planId === 'free') return;
    
    try {
      setUpgradingPlan(planId);
      const res = await fetch('/api/auth/user', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          tier: planId,
          blueprintLimit: planId === 'pro' ? 99999 : 5,
        }),
      });

      if (res.ok) {
        window.location.href = '/dashboard?upgrade=success&plan=' + planId;
      } else {
        alert('Failed to upgrade. Please try again.');
        setUpgradingPlan(null);
      }
    } catch (err) {
      console.error('Upgrade failed:', err);
      alert('A network error occurred. Please try again.');
      setUpgradingPlan(null);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      <Navigation />

      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-16 flex flex-col justify-center">
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <span className="text-[10px] uppercase font-bold tracking-wider text-cyan-400">Subscription Upgrades</span>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white sm:text-4xl mt-1">
            Choose Your Blueprint Quota
          </h2>
          <p className="mt-4 text-sm text-slate-400">
            Secure processing. You can upgrade, downgrade, or cancel your subscription plans at any time.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 items-stretch max-w-4xl mx-auto w-full overflow-hidden">
          {pricingTiers.map((tier) => (
            <div 
              key={tier.id}
              className={`rounded-2xl p-5 sm:p-6 glass flex flex-col justify-between relative transition-all duration-300 ${
                tier.highlighted 
                  ? 'border-cyan-500 bg-cyan-950/10 shadow-cyan-950/10 shadow-lg sm:scale-105 z-10' 
                  : 'border-slate-900 bg-slate-900/30'
              }`}
            >
              {tier.highlighted && (
                <span className="absolute top-0 right-6 -translate-y-1/2 rounded-full gradient-bg px-3 py-0.5 text-xs font-semibold text-white uppercase tracking-wider">
                  Recommended
                </span>
              )}

              <div>
                <h3 className="text-lg font-bold text-white">{tier.name}</h3>
                <div className="mt-4 flex items-baseline text-white">
                  <span className="text-4xl font-extrabold tracking-tight">{tier.price}</span>
                  <span className="ml-1 text-sm text-slate-400">/{tier.period}</span>
                </div>
                <p className="mt-2 text-xs text-slate-400 min-h-[32px]">{tier.desc}</p>
                
                <ul className="mt-6 space-y-3">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2.5 text-xs text-slate-300">
                      <CheckCircle2 className="h-4 w-4 text-cyan-400 shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8">
                <button
                  onClick={() => handleUpgrade(tier.id)}
                  disabled={tier.id === 'free' || upgradingPlan !== null}
                  className={`w-full flex items-center justify-center rounded-xl px-4 py-3.5 text-xs font-bold transition-all ${
                    tier.id === 'free'
                      ? 'bg-slate-900 text-slate-500 cursor-not-allowed border border-slate-800'
                      : upgradingPlan === tier.id
                      ? 'bg-slate-800 text-cyan-400 flex gap-2 cursor-wait'
                      : tier.highlighted 
                      ? 'gradient-bg text-white hover:brightness-110 shadow-md hover:scale-[1.01]' 
                      : 'bg-slate-800 text-slate-200 hover:bg-slate-700'
                  }`}
                >
                  {upgradingPlan === tier.id ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin text-cyan-400" />
                      Redirecting to Checkout...
                    </>
                  ) : (
                    tier.cta
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center text-xs text-slate-500 flex justify-center items-center gap-2">
          <ShieldCheck className="h-4 w-4 text-cyan-500" />
          <span>Secure payments. Your data is protected with industry-standard encryption.</span>
        </div>
      </main>
    </div>
  );
}
