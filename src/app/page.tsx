import React from 'react';
import Link from 'next/link';
import { 
  Briefcase, 
  Sparkles, 
  TrendingUp, 
  Users, 
  Target, 
  DollarSign, 
  Map, 
  Sliders, 
  Layers, 
  CheckCircle2, 
  ArrowRight,
  ShieldCheck,
  Star
} from 'lucide-react';

export default function LandingPage() {
  const features = [
    {
      title: 'Market Analysis & TAM',
      desc: 'Automatic estimation of Total Addressable Market (TAM), SAM, and SOM using realistic industry projections.',
      icon: TrendingUp,
      color: 'text-blue-400 border-blue-500/10 bg-blue-500/5',
    },
    {
      title: 'Competitor Landscapes',
      desc: 'Identify top 5 direct competitors with an in-depth breakdown of their strengths, weaknesses, and market share.',
      icon: Target,
      color: 'text-cyan-400 border-cyan-500/10 bg-cyan-500/5',
    },
    {
      title: 'Customer Personas',
      desc: 'Define 3 rich, detailed buyer personas complete with demographics, distinct pain points, and willingness to pay.',
      icon: Users,
      color: 'text-indigo-400 border-indigo-500/10 bg-indigo-500/5',
    },
    {
      title: 'Go-To-Market Roadmap',
      desc: 'Receive a structured 12-month launcher timeline with tailored marketing acquisition channels and CAC projections.',
      icon: Map,
      color: 'text-purple-400 border-purple-500/10 bg-purple-500/5',
    },
    {
      title: 'Revenue Modeling',
      desc: 'Establish 3 subscription pricing tiers, project annual margins for 3 years, and calculate break-even targets.',
      icon: DollarSign,
      color: 'text-emerald-400 border-emerald-500/10 bg-emerald-500/5',
    },
    {
      title: 'MVP Roadmap List',
      desc: 'Generate 5-7 core priority features categorized by difficulty effort and timeline milestones to speed up development.',
      icon: Sliders,
      color: 'text-amber-400 border-amber-500/10 bg-amber-500/5',
    },
  ];

  const pricingTiers = [
    {
      name: 'Free Trial',
      price: '$0',
      period: 'forever',
      desc: 'Validate your first idea instantly.',
      features: [
        '1 complete business plan credit',
        'Interactive 8-tab dashboard',
        'Shareable public blueprint links',
        'Standard generation speed (15s)',
      ],
      cta: 'Start Free - No Card Needed',
      highlighted: false,
      href: '/sign-up',
    },
    {
      name: 'Starter Plan',
      price: '$29',
      period: 'per month',
      desc: 'Perfect for serial builders validating multiple projects.',
      features: [
        '5 business plan credits per month',
        'Interactive 8-tab dashboard',
        'PDF exports of blueprints',
        'TAM/SAM/SOM deep analytics',
        'Priority customer support',
      ],
      cta: 'Get Started with Starter',
      highlighted: true,
      href: '/sign-up',
    },
    {
      name: 'Pro Unlimited',
      price: '$99',
      period: 'per month',
      desc: 'For power entrepreneurs, incubators, and consultants.',
      features: [
        'Unlimited business plan generations',
        'Priority high-speed generation (2s)',
        'Full PDF and Excel sheet exports',
        'Custom template generation inputs',
        'Advanced custom GTM models',
        'API Access for integrations',
      ],
      cta: 'Upgrade to Pro Unlimited',
      highlighted: false,
      href: '/sign-up',
    },
  ];

  return (
    <div className="relative min-h-screen bg-slate-950 text-slate-100 selection:bg-cyan-500 selection:text-slate-900">
      
      {/* Decorative background glows */}
      <div className="absolute top-0 left-1/4 h-[500px] w-[500px] rounded-full bg-cyan-500/10 blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 h-[600px] w-[600px] rounded-full bg-blue-500/5 blur-[150px] pointer-events-none" />
      <div className="absolute bottom-10 left-1/3 h-[500px] w-[500px] rounded-full bg-purple-500/5 blur-[120px] pointer-events-none" />

      {/* Header */}
      <header className="sticky top-0 z-40 w-full glass-nav">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl gradient-bg shadow-md">
              <Briefcase className="h-5 w-5 text-white animate-pulse" />
            </div>
            <span className="text-xl font-bold tracking-tight text-white">
              Founder<span className="gradient-text font-extrabold">GPT OS</span>
            </span>
          </div>

          <div className="flex items-center gap-4">
            <Link 
              href="/sign-in" 
              className="text-sm font-medium text-slate-300 hover:text-white transition-colors"
            >
              Sign In
            </Link>
            <Link
              href="/sign-up"
              className="flex items-center gap-1.5 rounded-lg gradient-bg px-4 py-2 text-sm font-semibold text-white shadow-lg hover:brightness-110 transition-all duration-200"
            >
              Start Free
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="mx-auto max-w-7xl px-4 pt-20 pb-16 text-center sm:px-6 lg:px-8">
        <div className="inline-flex items-center gap-1.5 rounded-full border border-cyan-500/20 bg-cyan-500/5 px-3 py-1 text-xs font-semibold text-cyan-400 shadow-inner mb-6">
          <Sparkles className="h-3.5 w-3.5" />
          <span>Llama 3.3 70B AI Business Consultant Live</span>
        </div>

        <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-6xl max-w-4xl mx-auto leading-none">
          Your AI Co-Founder Awaits. Build a{' '}
          <span className="gradient-text">Business Plan in 2 Minutes.</span>
        </h1>

        <p className="mt-6 text-lg text-slate-400 max-w-2xl mx-auto">
          Transform a single startup idea sentence into an investor-ready, 8-section business blueprint. Skip weeks of manual competitor and financial research.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/sign-up"
            className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-xl gradient-bg px-8 py-4 text-base font-bold text-white shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
          >
            Create Your Plan Now
            <ArrowRight className="h-5 w-5" />
          </Link>
          <a
            href="#features"
            className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-xl glass px-8 py-4 text-base font-bold text-slate-200 hover:bg-slate-800/80 hover:text-white transition-all duration-200"
          >
            Explore Features
          </a>
        </div>

        {/* Dashboard Preview Graphic */}
        <div className="mt-16 rounded-2xl border border-slate-800/80 bg-slate-900/60 p-2 shadow-2xl glass max-w-5xl mx-auto">
          <div className="rounded-xl border border-slate-800 bg-slate-950 p-6 text-left">
            <div className="flex items-center justify-between border-b border-slate-900 pb-4 mb-6">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-red-500/80" />
                <div className="h-3 w-3 rounded-full bg-yellow-500/80" />
                <div className="h-3 w-3 rounded-full bg-green-500/80" />
                <span className="ml-2 text-xs font-mono text-slate-500">foundergpt-os.vercel.app/blueprint/example-id</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-400 bg-slate-900/60 rounded px-2 py-1 font-mono">
                Model: llama-3.3-70b-versatile
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="rounded-lg border border-slate-800/50 bg-slate-900/40 p-4">
                <div className="text-[10px] uppercase font-bold tracking-wider text-cyan-400 mb-1">Total Addressable Market</div>
                <div className="text-2xl font-extrabold text-white">$15.2 Billion</div>
                <div className="text-xs text-slate-400 mt-1">SAM: $1.2B | SOM: $60M</div>
              </div>
              <div className="rounded-lg border border-slate-800/50 bg-slate-900/40 p-4">
                <div className="text-[10px] uppercase font-bold tracking-wider text-emerald-400 mb-1">Annual Revenue Growth</div>
                <div className="text-2xl font-extrabold text-white">18.5% YoY</div>
                <div className="text-xs text-slate-400 mt-1">HealthTech Sector projections</div>
              </div>
              <div className="rounded-lg border border-slate-800/50 bg-slate-900/40 p-4">
                <div className="text-[10px] uppercase font-bold tracking-wider text-amber-400 mb-1">Competition Intensity</div>
                <div className="text-2xl font-extrabold text-white">Medium-High</div>
                <div className="text-xs text-slate-400 mt-1">5 direct competitors mapped</div>
              </div>
            </div>
            
            <div className="mt-4 border border-dashed border-slate-800 rounded-lg p-4 bg-slate-900/20 text-xs text-slate-400 leading-relaxed">
              <strong>Executive Summary:</strong> The platform helps modern busy professionals organize their meal preparation and grocery selections automatically. Driven by cost-of-living adjustments and health awareness trends, this product provides customized recipes in under 5 seconds, capturing a significant SOM in the US market...
            </div>
          </div>
        </div>
      </section>

      {/* Value Proposition Grid */}
      <section id="features" className="py-24 border-t border-slate-900 bg-slate-900/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Complete Business Planning, Done Instantly
            </h2>
            <p className="mt-4 text-base text-slate-400">
              FounderGPT OS generates data-backed structures for every aspect of your new startup idea.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feat) => {
              const Icon = feat.icon;
              return (
                <div 
                  key={feat.title} 
                  className="rounded-2xl border border-slate-800 bg-slate-900/20 p-6 glow-card glass"
                >
                  <div className={`flex h-12 w-12 items-center justify-center rounded-xl border ${feat.color.split(' ')[1]} ${feat.color.split(' ')[2]}`}>
                    <Icon className={`h-6 w-6 ${feat.color.split(' ')[0]}`} />
                  </div>
                  <h3 className="mt-4 text-lg font-bold text-white">{feat.title}</h3>
                  <p className="mt-2 text-sm text-slate-400 leading-relaxed">{feat.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* User Personas Target Testimonials */}
      <section className="py-24 border-t border-slate-900 relative">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Loved by Thousands of Entrepreneurs
            </h2>
            <p className="mt-4 text-base text-slate-400">
              See how modern founders leverage FounderGPT OS to quickly validate, research, and launch.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="rounded-2xl border border-slate-800/80 bg-slate-900/30 p-6 glass flex flex-col justify-between">
              <p className="text-sm text-slate-300 italic leading-relaxed">
                "As a software engineer, I had a dozen ideas but zero business background. FounderGPT OS gave me a complete, detailed roadmap, persona profiles, and pricing ideas in 2 minutes. We just raised our pre-seed!"
              </p>
              <div className="mt-6 flex items-center gap-3 border-t border-slate-800/60 pt-4">
                <div className="h-10 w-10 rounded-full gradient-bg flex items-center justify-center font-bold text-white">A</div>
                <div>
                  <h4 className="text-sm font-bold text-white">Alex Mercer</h4>
                  <p className="text-xs text-slate-400">Software Engineer & Founder</p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-800/80 bg-slate-900/30 p-6 glass flex flex-col justify-between">
              <p className="text-sm text-slate-300 italic leading-relaxed">
                "I consult early stage ventures daily. Instead of building customer templates and market sizing figures manually, I run them through FounderGPT. It reduces my research time by 90% and keeps clients thrilled."
              </p>
              <div className="mt-6 flex items-center gap-3 border-t border-slate-800/60 pt-4">
                <div className="h-10 w-10 rounded-full gradient-bg flex items-center justify-center font-bold text-white">S</div>
                <div>
                  <h4 className="text-sm font-bold text-white">Sarah Jenkins</h4>
                  <p className="text-xs text-slate-400">MBA Consultant & Serial Entrepreneur</p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-800/80 bg-slate-900/30 p-6 glass flex flex-col justify-between">
              <p className="text-sm text-slate-300 italic leading-relaxed">
                "We screen over 100 pitch submissions a month. FounderGPT OS has standardized our evaluation metrics, letting us estimate actual market parameters and identify feature requirements in a standardized layout."
              </p>
              <div className="mt-6 flex items-center gap-3 border-t border-slate-800/60 pt-4">
                <div className="h-10 w-10 rounded-full gradient-bg flex items-center justify-center font-bold text-white">C</div>
                <div>
                  <h4 className="text-sm font-bold text-white">Carl Davidson</h4>
                  <p className="text-xs text-slate-400">Accelerator Director & VC Investor</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-24 border-t border-slate-900 bg-slate-900/5">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Simple, Transparent Pricing
            </h2>
            <p className="mt-4 text-base text-slate-400">
              Choose the tier that matches your validation frequency. Upgrade or downgrade anytime.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {pricingTiers.map((tier) => (
              <div 
                key={tier.name}
                className={`rounded-2xl p-6 glass relative flex flex-col justify-between ${
                  tier.highlighted 
                    ? 'border-cyan-500 bg-cyan-950/10 shadow-cyan-950/10 shadow-lg scale-105 z-10' 
                    : 'border-slate-800 bg-slate-900/30'
                }`}
              >
                {tier.highlighted && (
                  <span className="absolute top-0 right-6 -translate-y-1/2 rounded-full gradient-bg px-3 py-0.5 text-xs font-semibold text-white uppercase tracking-wider">
                    Most Popular
                  </span>
                )}

                <div>
                  <h3 className="text-lg font-bold text-white">{tier.name}</h3>
                  <div className="mt-4 flex items-baseline text-white">
                    <span className="text-4xl font-extrabold tracking-tight">{tier.price}</span>
                    <span className="ml-1 text-sm text-slate-400">/{tier.period}</span>
                  </div>
                  <p className="mt-2 text-xs text-slate-400">{tier.desc}</p>
                  
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
                  <Link
                    href={tier.href}
                    className={`w-full flex items-center justify-center rounded-xl px-4 py-3 text-xs font-bold transition-all ${
                      tier.highlighted 
                        ? 'gradient-bg text-white hover:brightness-110 shadow-md hover:scale-[1.01]' 
                        : 'bg-slate-800 text-slate-200 hover:bg-slate-700'
                    }`}
                  >
                    {tier.cta}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-900 py-12 bg-slate-950">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center text-xs text-slate-500">
          <div className="flex justify-center gap-2 items-center mb-4 text-slate-400">
            <ShieldCheck className="h-4 w-4 text-cyan-500" />
            <span>Secure Authentication & Data Protection. GDPR Compliant.</span>
          </div>
          <p>© {new Date().getFullYear()} FounderGPT OS. All rights reserved. Built for modern entrepreneurs globally.</p>
        </div>
      </footer>

    </div>
  );
}
