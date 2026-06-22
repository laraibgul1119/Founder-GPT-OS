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
  CheckCircle2,
  ArrowRight,
  ShieldCheck
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
      price: '$99',
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
      price: '$299',
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
    <div className="relative min-h-screen bg-slate-950 text-slate-100 selection:bg-cyan-500 selection:text-slate-900 overflow-x-hidden">

      {/* Dot pattern background */}
      <div className="absolute inset-0 z-0 pointer-events-none [background-size:20px_20px] [background-image:radial-gradient(#06b6d4_1px,transparent_1px)] opacity-40" />

      {/* Radial gradient mask for faded look */}
      <div className="pointer-events-none absolute inset-0 z-[1] bg-black [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />

      {/* Decorative background glows */}
      <div className="absolute top-0 left-1/4 h-[400px] w-[400px] sm:h-[500px] sm:w-[500px] rounded-full bg-cyan-500/10 blur-[120px] pointer-events-none z-[2]" />
      <div className="absolute top-1/3 right-1/4 h-[400px] w-[400px] sm:h-[600px] sm:w-[600px] rounded-full bg-blue-500/5 blur-[150px] pointer-events-none z-[2]" />
      <div className="absolute bottom-10 left-1/3 h-[400px] w-[400px] sm:h-[500px] sm:w-[500px] rounded-full bg-purple-500/5 blur-[120px] pointer-events-none z-[2]" />

      {/* Content wrapper - sits above all backgrounds */}
      <div className="relative z-10">

      {/* Header */}
      <header className="sticky top-0 z-40 w-full glass-nav">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl gradient-bg shadow-md">
              <Briefcase className="h-5 w-5 text-white animate-pulse" />
            </div>
            <span className="text-lg sm:text-xl font-bold tracking-tight text-white">
              Founder<span className="gradient-text font-extrabold">GPT OS</span>
            </span>
          </div>

          <div className="flex items-center gap-3 sm:gap-4">
            <Link
              href="/sign-in"
              className="flex items-center gap-2 rounded-xl gradient-bg px-5 py-2.5 text-sm font-bold text-white shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 min-h-[44px]"
            >
              Sign In
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="mx-auto max-w-7xl px-4 pt-12 sm:pt-16 lg:pt-20 pb-10 sm:pb-12 lg:pb-16 text-center">
        <div className="inline-flex items-center gap-1.5 rounded-full border border-cyan-500/20 bg-cyan-500/5 px-3 py-1.5 text-xs font-semibold text-cyan-400 shadow-inner mb-5 sm:mb-6">
          <Sparkles className="h-3.5 w-3.5 shrink-0" />
          <span>Llama 3.3 70B AI Business Consultant Live</span>
        </div>

        <h1 className="text-[clamp(1.75rem,5vw+0.5rem,4.5rem)] font-extrabold tracking-tight text-white max-w-4xl mx-auto leading-[1.05]">
          Your AI Co-Founder Awaits. Build a{' '}
          <span className="gradient-text">Business Plan in 2 Minutes.</span>
        </h1>

        <p className="mt-5 sm:mt-6 text-sm sm:text-base md:text-lg text-slate-400 max-w-2xl mx-auto px-2 leading-relaxed">
          Transform a single startup idea sentence into an investor-ready, 8-section business blueprint. Skip weeks of manual competitor and financial research.
        </p>

        <div className="mt-7 sm:mt-8 lg:mt-10 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full max-w-lg mx-auto">
          <Link
            href="/sign-up"
            className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-xl gradient-bg px-6 sm:px-8 py-4 text-sm sm:text-base font-bold text-white shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 min-h-[48px]"
          >
            Create Your Plan Now
            <ArrowRight className="h-5 w-5 shrink-0" />
          </Link>
          <a
            href="#features"
            className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-xl glass px-6 sm:px-8 py-4 text-sm sm:text-base font-bold text-slate-200 hover:bg-slate-800/80 hover:text-white transition-all duration-200 min-h-[48px]"
          >
            Explore Features
          </a>
        </div>

        {/* Dashboard Preview Graphic */}
        <div className="mt-10 sm:mt-12 lg:mt-16 rounded-2xl border border-slate-800/80 bg-slate-900/60 p-1.5 sm:p-2 shadow-2xl glass max-w-5xl mx-auto overflow-hidden">
          <div className="rounded-xl border border-slate-800 bg-slate-950 p-3 sm:p-4 md:p-6 text-left">
            <div className="flex items-center justify-between border-b border-slate-900 pb-3 sm:pb-4 mb-4 sm:mb-6 gap-2">
              <div className="flex items-center gap-2 min-w-0">
                <div className="h-3 w-3 rounded-full bg-red-500/80 shrink-0" />
                <div className="h-3 w-3 rounded-full bg-yellow-500/80 shrink-0" />
                <div className="h-3 w-3 rounded-full bg-green-500/80 shrink-0" />
                <span className="ml-2 text-[10px] sm:text-xs font-mono text-slate-500 truncate">foundergpt-os.vercel.app/blueprint/example-id</span>
              </div>
              <div className="hidden sm:flex items-center gap-2 text-xs text-slate-400 bg-slate-900/60 rounded px-2 py-1 font-mono shrink-0">
                Model: llama-3.3-70b-versatile
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5 sm:gap-3 md:gap-4">
              <div className="rounded-lg border border-slate-800/50 bg-slate-900/40 p-3 sm:p-4">
                <div className="text-[10px] uppercase font-bold tracking-wider text-cyan-400 mb-1">Total Addressable Market</div>
                <div className="text-lg sm:text-xl md:text-2xl font-extrabold text-white">$15.2 Billion</div>
                <div className="text-[10px] sm:text-xs text-slate-400 mt-1">SAM: $1.2B | SOM: $60M</div>
              </div>
              <div className="rounded-lg border border-slate-800/50 bg-slate-900/40 p-3 sm:p-4">
                <div className="text-[10px] uppercase font-bold tracking-wider text-emerald-400 mb-1">Annual Revenue Growth</div>
                <div className="text-lg sm:text-xl md:text-2xl font-extrabold text-white">18.5% YoY</div>
                <div className="text-[10px] sm:text-xs text-slate-400 mt-1">HealthTech Sector projections</div>
              </div>
              <div className="rounded-lg border border-slate-800/50 bg-slate-900/40 p-3 sm:p-4 sm:col-span-2 md:col-span-1">
                <div className="text-[10px] uppercase font-bold tracking-wider text-amber-400 mb-1">Competition Intensity</div>
                <div className="text-lg sm:text-xl md:text-2xl font-extrabold text-white">Medium-High</div>
                <div className="text-[10px] sm:text-xs text-slate-400 mt-1">5 direct competitors mapped</div>
              </div>
            </div>

            <div className="mt-3 sm:mt-4 border border-dashed border-slate-800 rounded-lg p-3 sm:p-4 bg-slate-900/20 text-[10px] sm:text-xs text-slate-400 leading-relaxed overflow-wrap-anywhere">
              <strong className="text-slate-300">Executive Summary:</strong> The platform helps modern busy professionals organize their meal preparation and grocery selections automatically. Driven by cost-of-living adjustments and health awareness trends, this product provides customized recipes in under 5 seconds, capturing a significant SOM in the US market...
            </div>
          </div>
        </div>
      </section>

      {/* Value Proposition Grid */}
      <section id="features" className="py-12 sm:py-16 lg:py-24 border-t border-slate-900 bg-slate-900/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12 lg:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white">
              Complete Business Planning, Done Instantly
            </h2>
            <p className="mt-3 sm:mt-4 text-sm sm:text-base text-slate-400 leading-relaxed">
              FounderGPT OS generates data-backed structures for every aspect of your new startup idea.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
            {features.map((feat) => {
              const Icon = feat.icon;
              return (
                <div
                  key={feat.title}
                  className="rounded-2xl border border-slate-800 bg-slate-900/20 p-5 sm:p-6 glow-card glass"
                >
                  <div className={`flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-xl border ${feat.color.split(' ')[1]} ${feat.color.split(' ')[2]}`}>
                    <Icon className={`h-5 w-5 sm:h-6 sm:w-6 ${feat.color.split(' ')[0]}`} />
                  </div>
                  <h3 className="mt-3 sm:mt-4 text-base sm:text-lg font-bold text-white leading-snug">{feat.title}</h3>
                  <p className="mt-1.5 sm:mt-2 text-xs sm:text-sm text-slate-400 leading-relaxed">{feat.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* User Personas Target Testimonials */}
      <section className="py-12 sm:py-16 lg:py-24 border-t border-slate-900 relative">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12 lg:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white">
              Loved by Thousands of Entrepreneurs
            </h2>
            <p className="mt-3 sm:mt-4 text-sm sm:text-base text-slate-400 leading-relaxed">
              See how modern founders leverage FounderGPT OS to quickly validate, research, and launch.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6 lg:gap-8">
            <div className="rounded-2xl border border-slate-800/80 bg-slate-900/30 p-5 sm:p-6 glass flex flex-col justify-between">
              <p className="text-xs sm:text-sm text-slate-300 italic leading-relaxed">
                &ldquo;As a software engineer, I had a dozen ideas but zero business background. FounderGPT OS gave me a complete, detailed roadmap, persona profiles, and pricing ideas in 2 minutes. We just raised our pre-seed!&rdquo;
              </p>
              <div className="mt-4 sm:mt-6 flex items-center gap-3 border-t border-slate-800/60 pt-3 sm:pt-4">
                <div className="h-9 w-9 sm:h-10 sm:w-10 rounded-full gradient-bg flex items-center justify-center font-bold text-white shrink-0">A</div>
                <div className="min-w-0">
                  <h4 className="text-xs sm:text-sm font-bold text-white">Alex Mercer</h4>
                  <p className="text-[10px] sm:text-xs text-slate-400 truncate">Software Engineer & Founder</p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-800/80 bg-slate-900/30 p-5 sm:p-6 glass flex flex-col justify-between">
              <p className="text-xs sm:text-sm text-slate-300 italic leading-relaxed">
                &ldquo;I consult early stage ventures daily. Instead of building customer templates and market sizing figures manually, I run them through FounderGPT. It reduces my research time by 90% and keeps clients thrilled.&rdquo;
              </p>
              <div className="mt-4 sm:mt-6 flex items-center gap-3 border-t border-slate-800/60 pt-3 sm:pt-4">
                <div className="h-9 w-9 sm:h-10 sm:w-10 rounded-full gradient-bg flex items-center justify-center font-bold text-white shrink-0">S</div>
                <div className="min-w-0">
                  <h4 className="text-xs sm:text-sm font-bold text-white">Sarah Jenkins</h4>
                  <p className="text-[10px] sm:text-xs text-slate-400 truncate">MBA Consultant & Serial Entrepreneur</p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-800/80 bg-slate-900/30 p-5 sm:p-6 glass flex flex-col justify-between">
              <p className="text-xs sm:text-sm text-slate-300 italic leading-relaxed">
                &ldquo;We screen over 100 pitch submissions a month. FounderGPT OS has standardized our evaluation metrics, letting us estimate actual market parameters and identify feature requirements in a standardized layout.&rdquo;
              </p>
              <div className="mt-4 sm:mt-6 flex items-center gap-3 border-t border-slate-800/60 pt-3 sm:pt-4">
                <div className="h-9 w-9 sm:h-10 sm:w-10 rounded-full gradient-bg flex items-center justify-center font-bold text-white shrink-0">C</div>
                <div className="min-w-0">
                  <h4 className="text-xs sm:text-sm font-bold text-white">Carl Davidson</h4>
                  <p className="text-[10px] sm:text-xs text-slate-400 truncate">Accelerator Director & VC Investor</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-12 sm:py-16 lg:py-24 border-t border-slate-900 bg-slate-900/5">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12 lg:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white">
              Simple, Transparent Pricing
            </h2>
            <p className="mt-3 sm:mt-4 text-sm sm:text-base text-slate-400 leading-relaxed">
              Choose the tier that matches your validation frequency. Upgrade or downgrade anytime.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-3 lg:gap-6 max-w-5xl mx-auto overflow-hidden">
            {pricingTiers.map((tier) => (
              <div
                key={tier.name}
                className={`rounded-2xl p-4 sm:p-5 lg:p-6 glass relative flex flex-col justify-between ${
                  tier.highlighted
                    ? 'border-cyan-500 bg-cyan-950/10 shadow-cyan-950/10 shadow-lg md:scale-105 z-10'
                    : 'border-slate-800 bg-slate-900/30'
                }`}
              >
                {tier.highlighted && (
                  <span className="absolute top-0 right-6 -translate-y-1/2 rounded-full gradient-bg px-3 py-0.5 text-[10px] sm:text-xs font-semibold text-white uppercase tracking-wider">
                    Most Popular
                  </span>
                )}

                <div>
                  <h3 className="text-base sm:text-lg font-bold text-white">{tier.name}</h3>
                  <div className="mt-3 sm:mt-4 flex items-baseline text-white">
                    <span className="text-3xl sm:text-4xl font-extrabold tracking-tight">{tier.price}</span>
                    <span className="ml-1 text-xs sm:text-sm text-slate-400">/{tier.period}</span>
                  </div>
                  <p className="mt-1.5 sm:mt-2 text-[10px] sm:text-xs text-slate-400 leading-relaxed">{tier.desc}</p>

                  <ul className="mt-4 sm:mt-6 space-y-2.5">
                    {tier.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2 text-[10px] sm:text-xs text-slate-300">
                        <CheckCircle2 className="h-3.5 w-3.5 text-cyan-400 shrink-0 mt-0.5" />
                        <span className="leading-relaxed">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-6 sm:mt-8">
                  <Link
                    href={tier.href}
                    className={`w-full flex items-center justify-center rounded-xl px-4 py-3 sm:py-3.5 text-xs font-bold transition-all min-h-[44px] ${
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
      <footer className="border-t border-slate-900 py-8 sm:py-10 lg:py-12 bg-slate-950/80 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center text-[10px] sm:text-xs text-slate-500">
          <div className="flex justify-center gap-2 items-center mb-3 sm:mb-4 text-slate-400">
            <ShieldCheck className="h-4 w-4 text-cyan-500 shrink-0" />
            <span>Secure Authentication & Data Protection. GDPR Compliant.</span>
          </div>
          <p>&copy; {new Date().getFullYear()} FounderGPT OS. All rights reserved. Built for modern entrepreneurs globally.</p>
        </div>
      </footer>

      </div>{/* End content wrapper */}
    </div>
  );
}
