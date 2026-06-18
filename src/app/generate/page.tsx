'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Navigation from '@/components/Navigation';
import { 
  Sparkles, 
  ArrowLeft, 
  Globe, 
  Briefcase, 
  DollarSign, 
  Lightbulb,
  TrendingUp,
  Search,
  Users,
  Compass,
  AlertCircle,
  Loader2
} from 'lucide-react';

export default function GenerateBlueprint() {
  const router = useRouter();
  
  // Form values
  const [startupIdea, setStartupIdea] = useState('');
  const [industry, setIndustry] = useState('SaaS');
  const [targetGeography, setTargetGeography] = useState('Global');
  const [estimatedMarketSize, setEstimatedMarketSize] = useState('');

  // Generation status
  const [isGenerating, setIsGenerating] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [errorAlert, setErrorAlert] = useState<string | null>(null);
  
  // Check user limit first
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await fetch('/api/auth/user');
        if (res.ok) {
          const data = await res.json();
          setUser(data);
        }
      } catch (err) {
        console.error('Failed to fetch user limits:', err);
      }
    }
    fetchUser();
  }, []);

  // Cycle through loading steps to provide feedback on what the LLM is doing
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isGenerating) {
      interval = setInterval(() => {
        setLoadingStep((prev) => {
          if (prev < 3) return prev + 1;
          return prev;
        });
      }, 4500);
    }
    return () => clearInterval(interval);
  }, [isGenerating]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorAlert(null);

    if (!startupIdea.trim()) {
      setErrorAlert('Please provide a startup idea description.');
      return;
    }

    if (user && user.tier !== 'pro' && user.blueprintsUsedThisMonth >= user.blueprintLimit) {
      setErrorAlert(`You have hit your monthly blueprint limit (${user.blueprintsUsedThisMonth}/${user.blueprintLimit}). Please upgrade your plan to generate more blueprints.`);
      return;
    }

    try {
      setIsGenerating(true);
      setLoadingStep(0);

      const res = await fetch('/api/blueprints', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          startupIdea,
          industry,
          targetGeography,
          estimatedMarketSize: estimatedMarketSize ? parseInt(estimatedMarketSize) : undefined
        })
      });

      if (res.ok) {
        const data = await res.json();
        router.push(`/blueprint/${data.id}`);
      } else {
        const errData = await res.json();
        setErrorAlert(errData.error || 'Failed to generate blueprint. Please try again.');
        setIsGenerating(false);
      }
    } catch (err) {
      console.error('Generation failed:', err);
      setErrorAlert('A network error occurred. Please try again.');
      setIsGenerating(false);
    }
  };

  const loadingPhases = [
    { title: 'Analyzing Market Sizing & TAM', desc: 'Sourcing industry statistics and calculating TAM, SAM, and SOM projections...', icon: TrendingUp },
    { title: 'Mapping Competitive Landscape', desc: 'Identifying top 5 direct competitors and evaluating strengths, weaknesses, and market shares...', icon: Search },
    { title: 'Creating Customer Personas', desc: 'Developing 3 target buyer archetypes, complete with demographics, pain points, and willingness to pay...', icon: Users },
    { title: 'Formulating GTM & MVP Roadmap', desc: 'Compiling marketing channels, 12-month launcher milestones, pricing tiers, and priority features...', icon: Compass }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      <Navigation />

      <main className="flex-1 max-w-3xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col justify-center">
        
        {isGenerating ? (
          /* Animated loading page interface */
          <div className="rounded-2xl border border-slate-900 bg-slate-900/20 p-10 text-center glass pulse-glow max-w-xl mx-auto w-full my-8">
            <div className="relative h-16 w-16 mx-auto mb-6 flex items-center justify-center">
              <Loader2 className="h-12 w-12 text-cyan-500 animate-spin absolute" />
              <Sparkles className="h-5 w-5 text-cyan-400 animate-pulse" />
            </div>

            <h3 className="text-xl font-bold text-white mb-2">Generating Business Blueprint</h3>
            <p className="text-xs text-slate-400 max-w-md mx-auto mb-8">
              FounderGPT is processing your idea using advanced models. This usually takes 10-15 seconds.
            </p>

            {/* Current Loading Step */}
            <div className="bg-slate-950/80 rounded-xl border border-slate-900 p-5 text-left flex gap-4 items-center">
              <div className="h-10 w-10 rounded-lg gradient-bg flex items-center justify-center text-white shrink-0 shadow-md">
                {React.createElement(loadingPhases[loadingStep].icon, { className: 'h-5 w-5' })}
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">
                  {loadingPhases[loadingStep].title}
                </h4>
                <p className="text-[11px] text-slate-400 mt-0.5 leading-normal">
                  {loadingPhases[loadingStep].desc}
                </p>
              </div>
            </div>

            {/* Micro progress dots indicator */}
            <div className="mt-8 flex justify-center gap-2">
              {loadingPhases.map((_, index) => (
                <div 
                  key={index} 
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index === loadingStep ? 'w-6 gradient-bg' : index < loadingStep ? 'w-2 bg-cyan-600' : 'w-2 bg-slate-800'
                  }`}
                />
              ))}
            </div>
          </div>
        ) : (
          /* Form interface */
          <div className="space-y-6">
            
            <div className="flex items-center gap-2">
              <button 
                onClick={() => router.back()}
                className="flex items-center justify-center p-2 rounded-lg text-slate-400 hover:bg-slate-900 hover:text-white transition-colors"
              >
                <ArrowLeft className="h-4 w-4" />
              </button>
              <div>
                <span className="text-[10px] uppercase font-bold tracking-wider text-cyan-400">Step 1 of 2</span>
                <h2 className="text-xl font-bold text-white">Generate Startup Blueprint</h2>
              </div>
            </div>

            {errorAlert && (
              <div className="rounded-xl border border-red-500/20 bg-red-500/5 p-4 text-red-400 flex items-start gap-2.5 text-xs">
                <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold">Generation Blocked</h4>
                  <p className="mt-0.5 leading-relaxed">{errorAlert}</p>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5 rounded-2xl border border-slate-900 bg-slate-900/30 p-6 glass">
              
              {/* Idea Textarea */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-300 flex items-center gap-1">
                  <Lightbulb className="h-3.5 w-3.5 text-yellow-500" />
                  Describe Your Startup Idea
                </label>
                <textarea
                  value={startupIdea}
                  onChange={(e) => setStartupIdea(e.target.value)}
                  placeholder="e.g. A marketplace connecting freelance video editors with YouTubers, specializing in quick 24-hour turnaround edits."
                  rows={4}
                  required
                  className="w-full rounded-xl border border-slate-800 bg-slate-950 p-3 text-sm text-slate-200 placeholder-slate-600 focus:border-cyan-500 focus:outline-none transition-colors"
                />
                <p className="text-[10px] text-slate-500 leading-normal">
                  Describe what your startup does, who it is for, and your core value proposition in 1-2 sentences.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Industry Selection */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-300 flex items-center gap-1">
                    <Briefcase className="h-3.5 w-3.5 text-slate-400" />
                    Industry Category
                  </label>
                  <select
                    value={industry}
                    onChange={(e) => setIndustry(e.target.value)}
                    className="w-full rounded-xl border border-slate-800 bg-slate-950 p-3 text-sm text-slate-200 focus:border-cyan-500 focus:outline-none transition-colors"
                  >
                    <option value="SaaS">SaaS / Software</option>
                    <option value="FinTech">FinTech / Finance</option>
                    <option value="HealthTech">HealthTech / Healthcare</option>
                    <option value="FoodTech">FoodTech / Meal prep</option>
                    <option value="EdTech">EdTech / Education</option>
                    <option value="E-commerce">E-commerce / Retail</option>
                    <option value="AI / Agency">AI Services & Consulting</option>
                  </select>
                </div>

                {/* Target Geography */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-300 flex items-center gap-1">
                    <Globe className="h-3.5 w-3.5 text-slate-400" />
                    Target Geography
                  </label>
                  <select
                    value={targetGeography}
                    onChange={(e) => setTargetGeography(e.target.value)}
                    className="w-full rounded-xl border border-slate-800 bg-slate-950 p-3 text-sm text-slate-200 focus:border-cyan-500 focus:outline-none transition-colors"
                  >
                    <option value="US / Canada">North America (US & Canada)</option>
                    <option value="Europe">Europe / United Kingdom</option>
                    <option value="Asia Pacific">Asia Pacific</option>
                    <option value="Global">Global / Worldwide</option>
                  </select>
                </div>
              </div>

              {/* Estimated Market Size (Optional) */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-300 flex items-center gap-1">
                  <DollarSign className="h-3.5 w-3.5 text-slate-400" />
                  Estimated Market Size (Optional, in Millions $)
                </label>
                <input
                  type="number"
                  value={estimatedMarketSize}
                  onChange={(e) => setEstimatedMarketSize(e.target.value)}
                  placeholder="e.g. 5000 (for $5 Billion)"
                  className="w-full rounded-xl border border-slate-800 bg-slate-950 p-3 text-sm text-slate-200 placeholder-slate-700 focus:border-cyan-500 focus:outline-none transition-colors"
                />
                <p className="text-[10px] text-slate-500">
                  Optional. If left blank, the AI will research and supply realistic market sizing numbers based on your category.
                </p>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 rounded-xl gradient-bg py-4 text-sm font-bold text-white shadow-xl hover:brightness-115 active:scale-[0.99] transition-all duration-200"
              >
                <Sparkles className="h-4 w-4 text-white" />
                Generate AI Business Plan
              </button>

            </form>
          </div>
        )}
      </main>
    </div>
  );
}
