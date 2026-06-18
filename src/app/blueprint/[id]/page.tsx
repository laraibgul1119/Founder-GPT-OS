'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Navigation from '@/components/Navigation';
import { 
  Briefcase,
  TrendingUp, 
  Target, 
  Users, 
  Map, 
  DollarSign, 
  Sliders, 
  Layers, 
  FileText,
  Share2,
  Trash2,
  Calendar,
  Download,
  CheckCircle2,
  Info,
  ChevronRight,
  ArrowLeft,
  Sparkles,
  Loader2
} from 'lucide-react';

export default function BlueprintDetail({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { id } = params;

  const [blueprint, setBlueprint] = useState<any>(null);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('market');
  const [copiedLink, setCopiedLink] = useState(false);
  const [exporting, setExporting] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const [bpRes, userRes] = await Promise.all([
          fetch(`/api/blueprints/${id}`),
          fetch('/api/auth/user')
        ]);

        if (bpRes.ok) {
          const bpData = await bpRes.json();
          setBlueprint(bpData);
        } else {
          // Redirect to dashboard if blueprint not found/unauthorized
          router.push('/dashboard');
        }

        if (userRes.ok) {
          const userData = await userRes.json();
          setUser(userData);
        }
      } catch (err) {
        console.error('Failed to load blueprint details:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [id, router]);

  const handleShare = () => {
    const url = `${window.location.origin}/blueprint/${id}`;
    navigator.clipboard.writeText(url);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleExportPDF = () => {
    if (user && user.tier === 'free') {
      alert('PDF exporting is a premium feature. Please upgrade your subscription tier on the Pricing page to export files.');
      router.push('/pricing');
      return;
    }

    setExporting(true);
    setTimeout(() => {
      // Simulate file download by creating a fake text file containing blueprint information
      const textPlan = `FOUNDERGPT OS - BUSINESS PLAN BLUEPRINT\n\nStartup Idea: ${blueprint.startupIdea}\nIndustry: ${blueprint.industry}\nTAM Sizing: $${blueprint.tam?.toLocaleString()}\n\nFull output:\n${JSON.stringify(blueprint.output, null, 2)}`;
      const element = document.createElement("a");
      const file = new Blob([textPlan], {type: 'text/plain'});
      element.href = URL.createObjectURL(file);
      element.download = `${blueprint.startupIdea.replace(/[^a-z0-9]/gi, '_').toLowerCase()}_business_plan.txt`;
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
      setExporting(false);
    }, 1500);
  };

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this business blueprint?')) return;
    try {
      const res = await fetch(`/api/blueprints/${id}`, { method: 'DELETE' });
      if (res.ok) {
        router.push('/dashboard');
      }
    } catch (err) {
      console.error('Failed to delete:', err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
        <Navigation />
        <div className="flex-1 flex flex-col items-center justify-center gap-3">
          <Loader2 className="h-8 w-8 text-cyan-500 animate-spin" />
          <p className="text-sm text-slate-400">Consulting Llama database models...</p>
        </div>
      </div>
    );
  }

  if (!blueprint) return null;

  const data = blueprint.output;

  const tabs = [
    { id: 'market', name: 'Market Analysis', icon: TrendingUp },
    { id: 'competitors', name: 'Competitive Landscape', icon: Target },
    { id: 'personas', name: 'Customer Personas', icon: Users },
    { id: 'gtm', name: 'GTM Strategy', icon: Map },
    { id: 'revenue', name: 'Revenue Modeling', icon: DollarSign },
    { id: 'mvp', name: 'MVP Feature Roadmap', icon: Sliders },
    { id: 'pitch', name: 'Pitch Outline', icon: Layers },
    { id: 'copy', name: 'Landing Copy', icon: FileText }
  ];

  const formatMarketSize = (value: number | null) => {
    if (!value) return 'N/A';
    if (value >= 1e9) return `$${(value / 1e9).toFixed(1)}B`;
    if (value >= 1e6) return `$${(value / 1e6).toFixed(0)}M`;
    return `$${value.toLocaleString()}`;
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      <Navigation />

      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col gap-6">
        
        {/* Header Back & Action Buttons */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-slate-900 pb-5">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => router.push('/dashboard')}
              className="flex items-center justify-center p-2 rounded-lg text-slate-400 hover:bg-slate-900 hover:text-white transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
            </button>
            <div>
              <span className="text-[10px] uppercase font-bold tracking-wider text-cyan-400 bg-cyan-950/20 px-2 py-0.5 rounded border border-cyan-500/10">
                {blueprint.industry || 'General SaaS'}
              </span>
              <h2 className="text-lg font-bold text-white sm:text-xl line-clamp-1 mt-1">
                {blueprint.startupIdea}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className={`flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-semibold border transition-all ${
                copiedLink 
                  ? 'border-emerald-500 bg-emerald-500/10 text-emerald-400' 
                  : 'border-slate-800 bg-slate-900/40 text-slate-300 hover:bg-slate-800'
              }`}
            >
              <Share2 className="h-3.5 w-3.5" />
              {copiedLink ? 'Copied URL!' : 'Share'}
            </button>

            <button
              onClick={handleExportPDF}
              disabled={exporting}
              className="flex items-center gap-1.5 rounded-lg border border-slate-800 bg-slate-900/40 px-3 py-2 text-xs font-semibold text-slate-300 hover:bg-slate-800 transition-colors"
            >
              {exporting ? (
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
              ) : (
                <Download className="h-3.5 w-3.5" />
              )}
              {exporting ? 'Exporting...' : 'Export'}
            </button>

            <button
              onClick={handleDelete}
              className="flex items-center justify-center rounded-lg p-2 text-slate-400 hover:bg-slate-900 hover:text-red-400 border border-slate-900/40 transition-colors"
              title="Delete Blueprint"
            >
              <Trash2 className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        {/* Tab Navigation Menu */}
        <div className="flex overflow-x-auto gap-1 border-b border-slate-900 pb-px scrollbar-none">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-1.5 rounded-t-xl px-4 py-3 text-xs font-semibold transition-all whitespace-nowrap border-b-2 ${
                  isActive 
                    ? 'border-cyan-400 text-cyan-400 bg-cyan-950/10' 
                    : 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-900/50'
                }`}
              >
                <Icon className="h-3.5 w-3.5" />
                {tab.name}
              </button>
            );
          })}
        </div>

        {/* Tab Contents panel */}
        <div className="rounded-2xl border border-slate-900 bg-slate-900/20 p-6 glass min-h-[350px]">
          
          {/* TAB 1: Market Analysis */}
          {activeTab === 'market' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="rounded-xl border border-slate-800 bg-slate-950/40 p-4">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">Total Addressable Market</span>
                  <div className="text-xl font-extrabold text-white mt-1">
                    {formatMarketSize(data.market_analysis?.tam)}
                  </div>
                  <p className="text-[9px] text-slate-500 mt-1">Total revenue potential worldwide</p>
                </div>
                <div className="rounded-xl border border-slate-800 bg-slate-950/40 p-4">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">Serviceable Addressable Market</span>
                  <div className="text-xl font-extrabold text-slate-200 mt-1">
                    {formatMarketSize(data.market_analysis?.sam)}
                  </div>
                  <p className="text-[9px] text-slate-500 mt-1">Market size we can actually reach</p>
                </div>
                <div className="rounded-xl border border-slate-800 bg-slate-950/40 p-4">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">Serviceable Obtainable Market</span>
                  <div className="text-xl font-extrabold text-cyan-400 mt-1">
                    {formatMarketSize(data.market_analysis?.som)}
                  </div>
                  <p className="text-[9px] text-slate-500 mt-1">Our target market share in 3 years</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-900/60">
                <div className="space-y-4">
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider">Market Dynamics</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center bg-slate-950/20 border border-slate-900 p-3 rounded-lg text-xs">
                      <span className="text-slate-400">Annual Growth Rate Projections</span>
                      <span className="font-bold text-emerald-400">+{data.market_analysis?.growth_rate || 'N/A'}% YoY</span>
                    </div>
                    <div className="flex justify-between items-center bg-slate-950/20 border border-slate-900 p-3 rounded-lg text-xs">
                      <span className="text-slate-400">Competition Intensity Sizing</span>
                      <span className="font-bold text-amber-400 capitalize">{data.market_analysis?.competitive_intensity || 'medium'}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider">Executive Overview Summary</h3>
                  <p className="text-xs text-slate-400 leading-relaxed bg-slate-950/20 p-4 rounded-xl border border-slate-900">
                    {data.market_analysis?.summary}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: Competitive Landscape */}
          {activeTab === 'competitors' && (
            <div className="space-y-6">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">Top 5 Competitors & Positioning Map</h3>
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                {data.competitors?.map((comp: any, index: number) => (
                  <div key={index} className="rounded-xl border border-slate-850 bg-slate-950/30 p-4 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="text-xs font-bold text-white truncate">{comp.name}</h4>
                        <span className="text-[9px] font-semibold text-cyan-400">{comp.market_share_pct || 0}% share</span>
                      </div>
                      <p className="text-[10px] text-slate-400 leading-tight border-b border-slate-900 pb-2 mb-3">
                        {comp.positioning}
                      </p>

                      <div className="space-y-3 text-[9px]">
                        <div>
                          <div className="font-bold text-emerald-400 uppercase tracking-wider text-[8px] mb-1">Strengths</div>
                          <ul className="space-y-0.5 text-slate-300 pl-2 list-disc">
                            {comp.strengths?.slice(0, 3).map((str: string) => (
                              <li key={str}>{str}</li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <div className="font-bold text-red-400 uppercase tracking-wider text-[8px] mb-1">Weaknesses</div>
                          <ul className="space-y-0.5 text-slate-300 pl-2 list-disc">
                            {comp.weaknesses?.slice(0, 3).map((wk: string) => (
                              <li key={wk}>{wk}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: Customer Personas */}
          {activeTab === 'personas' && (
            <div className="space-y-6">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">Target Buyer Personas</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {data.customer_personas?.map((p: any, index: number) => (
                  <div key={index} className="rounded-xl border border-slate-800 bg-slate-950/30 p-5 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start border-b border-slate-900 pb-3 mb-4">
                        <div>
                          <h4 className="text-sm font-bold text-white">{p.name}</h4>
                          <span className="text-[10px] text-slate-400">{p.role}</span>
                        </div>
                        <span className="text-[9px] font-semibold text-cyan-400 bg-cyan-950/20 px-2 py-0.5 rounded border border-cyan-500/10">
                          {p.willingness_to_pay} WTP
                        </span>
                      </div>

                      <p className="text-[10px] text-slate-400 leading-normal mb-4 font-mono italic">
                        {p.demographics}
                      </p>

                      <div>
                        <span className="text-[8px] uppercase tracking-wider font-bold text-slate-500 block mb-2">Pain Points</span>
                        <ul className="space-y-2 text-xs text-slate-300">
                          {p.pain_points?.map((pt: string) => (
                            <li key={pt} className="flex gap-1.5 items-start text-[10px] leading-relaxed">
                              <CheckCircle2 className="h-3.5 w-3.5 text-cyan-500 shrink-0 mt-0.5" />
                              <span>{pt}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="mt-6 pt-3 border-t border-slate-900 flex justify-between items-center text-[9px] text-slate-400">
                      <span>Estimated CAC:</span>
                      <span className="font-bold text-white">{p.cac_estimate}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: Go-to-Market Strategy */}
          {activeTab === 'gtm' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">Acquisition Channels</h3>
                <div className="space-y-3">
                  {data.go_to_market?.channels?.map((chan: any, index: number) => (
                    <div key={index} className="rounded-xl border border-slate-900 bg-slate-950/20 p-4 flex justify-between items-start gap-4">
                      <div>
                        <h4 className="text-xs font-bold text-white">{chan.name}</h4>
                        <p className="text-[10px] text-slate-400 mt-1 leading-normal">{chan.description}</p>
                      </div>
                      <span className="text-[9px] font-semibold text-cyan-400 bg-slate-950 border border-slate-800 px-2 py-0.5 rounded whitespace-nowrap">
                        CAC: {chan.cac}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">12-Month Launch Roadmap</h3>
                <div className="relative border-l border-slate-800 pl-4 space-y-6 ml-2 py-2">
                  {data.go_to_market?.roadmap_12m?.map((road: any, index: number) => (
                    <div key={index} className="relative">
                      {/* Timeline dot */}
                      <div className="absolute -left-[21px] top-1.5 h-2.5 w-2.5 rounded-full gradient-bg border border-slate-950" />
                      
                      <h4 className="text-xs font-bold text-cyan-400 uppercase tracking-wider">{road.month}</h4>
                      <ul className="mt-1.5 space-y-1 pl-4 list-disc text-[10px] text-slate-300 leading-normal">
                        {road.milestones?.map((mil: string) => (
                          <li key={mil}>{mil}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: Revenue Modeling */}
          {activeTab === 'revenue' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {data.revenue_model?.tiers?.map((tier: any, index: number) => (
                  <div key={index} className="rounded-xl border border-slate-800 bg-slate-950/20 p-4">
                    <h4 className="text-xs font-bold text-white">{tier.name}</h4>
                    <span className="text-lg font-bold text-cyan-400 block mt-1">{tier.price}</span>
                    <ul className="mt-3.5 space-y-1.5 pl-2 border-t border-slate-900 pt-3 text-[10px] text-slate-400 list-disc leading-normal">
                      {tier.features?.map((ft: string) => (
                        <li key={ft}>{ft}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-900/60">
                <div className="space-y-3">
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider">3-Year Projections</h3>
                  <table className="w-full text-left text-xs border border-slate-900 rounded-lg overflow-hidden">
                    <thead className="bg-slate-950 text-slate-400 text-[10px] uppercase font-bold tracking-wider">
                      <tr>
                        <th className="p-3">Year</th>
                        <th className="p-3">Revenue Projection</th>
                        <th className="p-3">Gross Margin</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-900 text-slate-300">
                      {data.revenue_model?.annual_projections?.map((proj: any, index: number) => (
                        <tr key={index} className="hover:bg-slate-900/20">
                          <td className="p-3 font-semibold">{proj.year}</td>
                          <td className="p-3 text-cyan-400 font-bold">{proj.revenue}</td>
                          <td className="p-3 text-emerald-400">{proj.margins}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="space-y-2">
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider">Break-Even Analysis</h3>
                  <div className="rounded-xl border border-slate-900 bg-slate-950/20 p-4 text-xs text-slate-400 leading-relaxed flex items-start gap-2.5">
                    <Info className="h-4 w-4 text-cyan-400 shrink-0 mt-0.5" />
                    <span>{data.revenue_model?.break_even}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 6: MVP Feature Roadmap */}
          {activeTab === 'mvp' && (
            <div className="space-y-6">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">MVP Target Feature Roadmap</h3>
              <div className="grid grid-cols-1 gap-3">
                {data.mvp_features?.map((feat: any, index: number) => (
                  <div key={index} className="rounded-xl border border-slate-900 bg-slate-950/20 p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                      <h4 className="text-xs font-bold text-white">{feat.name}</h4>
                      <p className="text-[10px] text-slate-500 mt-0.5">Recommended rollout timeline: {feat.timeline}</p>
                    </div>

                    <div className="flex items-center gap-3 text-[10px] font-semibold shrink-0">
                      <span className={`px-2.5 py-1 rounded-full ${
                        feat.priority === 'Must-Have' 
                          ? 'bg-red-500/10 text-red-400 border border-red-500/20'
                          : feat.priority === 'Nice-to-Have'
                          ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                          : 'bg-slate-500/10 text-slate-400 border border-slate-500/20'
                      }`}>
                        {feat.priority}
                      </span>
                      <span className="bg-slate-950 border border-slate-850 px-2.5 py-1 rounded-full text-slate-300">
                        {feat.effort}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 7: Pitch Deck Outline */}
          {activeTab === 'pitch' && (
            <div className="space-y-6">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">10-Slide Outline Structure</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {data.pitch_deck_outline?.map((slide: any, index: number) => (
                  <div key={index} className="rounded-xl border border-slate-900 bg-slate-950/20 p-4 flex gap-4">
                    <div className="h-8 w-8 rounded-lg gradient-bg flex items-center justify-center font-bold text-xs text-white shrink-0 shadow-md">
                      {slide.slide_no}
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-white">{slide.title}</h4>
                      <p className="text-[9px] text-slate-500 mt-0.5 leading-snug">Visual recommendation: {slide.visual_recommendation}</p>
                      <ul className="mt-2.5 pl-4 list-disc space-y-1 text-[10px] text-slate-400 leading-relaxed">
                        {slide.talking_points?.map((pt: string) => (
                          <li key={pt}>{pt}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 8: Landing Page Copy */}
          {activeTab === 'copy' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider">Headline Variations</h3>
                  <div className="space-y-2">
                    {data.landing_page_copy?.headlines?.map((h: string, index: number) => (
                      <div key={index} className="rounded-lg border border-slate-900 bg-slate-950/20 p-3 text-xs text-white leading-normal font-semibold">
                        {h}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider">Core Copy Outline</h3>
                  <div className="rounded-xl border border-slate-900 bg-slate-950/20 p-4 space-y-4">
                    <div>
                      <span className="text-[8px] uppercase tracking-wider font-bold text-slate-500 block mb-1">Hero Subcopy</span>
                      <p className="text-[10px] text-slate-300 leading-relaxed">{data.landing_page_copy?.hero_subcopy}</p>
                    </div>
                    <div>
                      <span className="text-[8px] uppercase tracking-wider font-bold text-slate-500 block mb-1">Call to Action (CTA) Copy</span>
                      <p className="text-[10px] text-cyan-400 font-bold">{data.landing_page_copy?.cta}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-900/60">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-3">Product Benefit Statements</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {data.landing_page_copy?.benefits?.map((b: string, index: number) => (
                    <div key={index} className="rounded-xl border border-slate-900 bg-slate-950/15 p-4 text-[10px] text-slate-400 leading-relaxed">
                      {b}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

        </div>
      </main>
    </div>
  );
}
