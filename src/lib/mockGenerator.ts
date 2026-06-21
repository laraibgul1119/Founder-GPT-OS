export interface BlueprintOutput {
  market_analysis: {
    tam: number;
    sam: number;
    som: number;
    growth_rate: number;
    summary: string;
    competitive_intensity: 'low' | 'medium' | 'high';
  };
  competitors: Array<{
    name: string;
    strengths: string[];
    weaknesses: string[];
    market_share_pct: number;
    positioning: string;
  }>;
  customer_personas: Array<{
    name: string;
    role: string;
    demographics: string;
    pain_points: string[];
    willingness_to_pay: string;
    cac_estimate: string;
  }>;
  go_to_market: {
    channels: Array<{
      name: string;
      description: string;
      cac: string;
    }>;
    roadmap_12m: Array<{
      month: string;
      milestones: string[];
    }>;
  };
  revenue_model: {
    tiers: Array<{
      name: string;
      price: string;
      features: string[];
    }>;
    annual_projections: Array<{
      year: string;
      revenue: string;
      margins: string;
    }>;
    break_even: string;
  };
  mvp_features: Array<{
    name: string;
    priority: 'Must-Have' | 'Nice-to-Have' | 'Future';
    effort: string;
    timeline: string;
  }>;
  pitch_deck_outline: Array<{
    slide_no: number;
    title: string;
    talking_points: string[];
    visual_recommendation: string;
  }>;
  landing_page_copy: {
    headlines: string[];
    hero_subcopy: string;
    benefits: string[];
    cta: string;
  };
}

export function generateMockBlueprint(idea: string, industry?: string, geography?: string): BlueprintOutput {
  const normalizedIdea = idea.toLowerCase();
  const geo = geography || 'Global';
  const ind = industry || 'SaaS';

  // Base values depending on the idea keywords
  let category = 'SaaS';
  if (normalizedIdea.includes('food') || normalizedIdea.includes('meal') || normalizedIdea.includes('cook')) {
    category = 'FoodTech';
  } else if (normalizedIdea.includes('health') || normalizedIdea.includes('fit') || normalizedIdea.includes('doc') || normalizedIdea.includes('med')) {
    category = 'HealthTech';
  } else if (normalizedIdea.includes('learn') || normalizedIdea.includes('school') || normalizedIdea.includes('edu') || normalizedIdea.includes('course')) {
    category = 'EdTech';
  } else if (normalizedIdea.includes('shop') || normalizedIdea.includes('buy') || normalizedIdea.includes('sell') || normalizedIdea.includes('store') || normalizedIdea.includes('ecom')) {
    category = 'E-commerce';
  } else if (normalizedIdea.includes('finance') || normalizedIdea.includes('money') || normalizedIdea.includes('pay') || normalizedIdea.includes('wallet')) {
    category = 'FinTech';
  }

  // Generate realistic numbers
  const tam = category === 'FoodTech' ? 12000000000 : category === 'HealthTech' ? 18000000000 : category === 'EdTech' ? 6500000000 : category === 'FinTech' ? 22000000000 : 15000000000;
  const sam = Math.round(tam * 0.08);
  const som = Math.round(sam * 0.05);
  const growthRate = category === 'HealthTech' ? 18.5 : category === 'FinTech' ? 22.1 : 12.4;

  const summary = `The market for ${category} applications is experiencing rapid acceleration, driven by digital transformation and shift in consumer habits. Specifically for "${idea}" in ${geo}, there is a highly receptive segment of users searching for optimized workflows. High interest rates and cost optimization pressures make efficient, automated software platforms extremely competitive.`;

  const competitors = [
    {
      name: `${category}Giant Corp`,
      strengths: ['Massive capital reserves', 'Established brand presence', 'Wide product suite'],
      weaknesses: ['Slow feature development', 'High pricing tiers', 'Poor user experience on mobile'],
      market_share_pct: 35,
      positioning: 'Enterprise-grade comprehensive suite'
    },
    {
      name: 'Alpha Solutions',
      strengths: ['Strong developer community', 'Fast API integrations', 'Cheap entry-level tier'],
      weaknesses: ['Poor customer support', 'Unstable feature releases', 'Limited scalability'],
      market_share_pct: 12,
      positioning: 'Developer-first tool'
    },
    {
      name: 'Beta Flow',
      strengths: ['Highly custom UI templates', 'Interactive dashboards', 'Excellent onboarding tutorials'],
      weaknesses: ['No offline support', 'High custom setup fee', 'Niche focus'],
      market_share_pct: 8,
      positioning: 'Visual workflow manager'
    },
    {
      name: 'OmniSync',
      strengths: ['Cross-platform synchronization', 'Cheap self-serve onboarding', 'Strong referral program'],
      weaknesses: ['Lacks security compliance (SOC2)', 'High subscription churn', 'Complex settings'],
      market_share_pct: 5,
      positioning: 'Self-serve automation helper'
    },
    {
      name: 'NextGen Systems',
      strengths: ['AI analytics engine', 'Premium custom branding', 'High user retention rates'],
      weaknesses: ['Very expensive for startups', 'Requires expert installation', 'Slow web interface'],
      market_share_pct: 3,
      positioning: 'AI-first premium consultant portal'
    }
  ];

  const customer_personas = [
    {
      name: 'Busy Developer Dave',
      role: 'Senior Software Engineer',
      demographics: 'Male, Age 28-35, Urban Area, earning $140K/yr',
      pain_points: [
        'Overwhelmed with multiple development task deadlines',
        'Lacks standard tools to automate routine reporting',
        'Struggles with inefficient communication in hybrid teams'
      ],
      willingness_to_pay: '$19 - $39 / month',
      cac_estimate: '$85.00'
    },
    {
      name: 'Strategic Manager Sarah',
      role: 'Product Director',
      demographics: 'Female, Age 34-45, Suburbs, earning $180K/yr',
      pain_points: [
        'Hard to track project metrics across multiple remote teams',
        'High consulting bills for simple market validation data',
        'Frustrated with lack of automation in executive reports'
      ],
      willingness_to_pay: '$49 - $99 / month',
      cac_estimate: '$150.00'
    },
    {
      name: 'Founder Frank',
      role: 'Early-stage Startup Entrepreneur',
      demographics: 'Male, Age 22-30, Shared Co-working Spaces, pre-revenue',
      pain_points: [
        'Extremely limited budget for expensive consulting services',
        'Needs to create professional pitch deck materials quickly',
        'Struggles to validate market sizes and customer profiles with data'
      ],
      willingness_to_pay: '$29 - $49 / month',
      cac_estimate: '$45.00'
    }
  ];

  const go_to_market = {
    channels: [
      {
        name: 'Organic Content Marketing & SEO',
        description: 'Publish high-quality startup guides, competitor tables, and business planning blueprints that index on Google search.',
        cac: '$15 - $25'
      },
      {
        name: 'Influencer & Founder Partnerships',
        description: 'Sponsor newsletters and podcasts read by developers and founders (e.g. TLDR, Indie Hackers, Lenny\'s Podcast).',
        cac: '$60 - $80'
      },
      {
        name: 'Performance Search Ads (Google/LinkedIn)',
        description: 'Target high-intent search queries like "validate startup idea" or "create competitor analysis".',
        cac: '$120 - $180'
      },
      {
        name: 'Product Hunt Launch & Community Outreach',
        description: 'Run targeted product launches on Product Hunt, Hacker News, and startup directories.',
        cac: '$5 - $10'
      }
    ],
    roadmap_12m: [
      {
        month: 'Months 1-2',
        milestones: ['Launch MVP on Product Hunt', 'Onboard first 500 beta users', 'Finalize core generator functionality']
      },
      {
        month: 'Months 3-4',
        milestones: ['Introduce Starter & Pro plans', 'Integrate PDF exporting feature', 'Start basic search engine advertisements']
      },
      {
        month: 'Months 5-6',
        milestones: ['Add collaboration and team folders', 'Publish 15 high-quality SEO validation articles', 'Hit $10K MRR milestone']
      },
      {
        month: 'Months 7-9',
        milestones: ['Launch API access for enterprise clients', 'Release templates for specific industries', 'Partner with major accelerators']
      },
      {
        month: 'Months 10-12',
        milestones: ['Establish SOC-2 security compliance', 'Scale team-wide sharing tools', 'Aim for $50K MRR and full scale marketing campaigns']
      }
    ]
  };

  const revenue_model = {
    tiers: [
      {
        name: 'Free Trial',
        price: '$0 / month',
        features: ['1 business blueprint per month', 'Online tabbed viewer', 'Access to community templates']
      },
      {
        name: 'Starter Plan',
        price: '$99 / month',
        features: ['5 business blueprints per month', 'PDF export functionality', 'Detailed TAM/SAM/SOM breakdown', 'Priority customer support']
      },
      {
        name: 'Pro Unlimited',
        price: '$299 / month',
        features: ['Unlimited business blueprints', 'High-priority lightning generation queue', 'PDF/CSV spreadsheet exports', 'API Access (beta)', 'Premium analytics dashboard']
      }
    ],
    annual_projections: [
      { year: 'Year 1', revenue: '$180,000', margins: '82%' },
      { year: 'Year 2', revenue: '$650,000', margins: '88%' },
      { year: 'Year 3', revenue: '$2,100,000', margins: '91%' }
    ],
    break_even: 'Calculated at 180 active Starter subscriptions or 52 Pro subscriptions ($5,200 monthly operating cost, including database, hosting, and API quotas).'
  };

  const mvp_features = [
    {
      name: 'Instant Idea Generation Input Form',
      priority: 'Must-Have' as const,
      effort: 'Low (2-3 days)',
      timeline: 'Week 1'
    },
    {
      name: 'Interactive 8-Tab Blueprint Dashboard',
      priority: 'Must-Have' as const,
      effort: 'Medium (5 days)',
      timeline: 'Week 1'
    },
    {
      name: 'Dynamic Progress Indicator Loading Page',
      priority: 'Must-Have' as const,
      effort: 'Low (1 day)',
      timeline: 'Week 2'
    },
    {
      name: 'Flexible PDF Export Engine',
      priority: 'Nice-to-Have' as const,
      effort: 'Medium (4 days)',
      timeline: 'Week 3'
    },
    {
      name: 'Stripe Subscription Management Checkout Portal',
      priority: 'Must-Have' as const,
      effort: 'Medium (3-4 days)',
      timeline: 'Week 2'
    },
    {
      name: 'Clerk User Authentication & Profile Settings',
      priority: 'Must-Have' as const,
      effort: 'Low (2 days)',
      timeline: 'Week 1'
    },
    {
      name: 'Shareable Public Blueprint Links',
      priority: 'Nice-to-Have' as const,
      effort: 'Low (2 days)',
      timeline: 'Week 4'
    }
  ];

  const pitch_deck_outline = [
    {
      slide_no: 1,
      title: 'Title Slide',
      talking_points: ['Introduce FounderGPT OS', 'One sentence hook: "Investor-ready business plans in 2 minutes"', 'Presenter names & backgrounds'],
      visual_recommendation: 'Modern, minimalistic dark gradient screen with glowing app interface screenshot'
    },
    {
      slide_no: 2,
      title: 'The Problem',
      talking_points: ['Creating a business plan manually takes weeks of effort', 'Consulting firms charge $5,000 to $10,000', 'Founders build products without validating market size first'],
      visual_recommendation: 'Compare "Old Way" vs "New Way" side-by-side with timeline bars'
    },
    {
      slide_no: 3,
      title: 'The Solution',
      talking_points: ['AI-powered generator that validates startup ideas instantly', 'Output has 8 core business aspects ready for presentation', 'Low cost entry, accessible to anyone globally'],
      visual_recommendation: 'Screenshot of the 8-tab dashboard highlight callouts'
    },
    {
      slide_no: 4,
      title: 'Market Opportunity (TAM/SAM/SOM)',
      talking_points: [`TAM: $${(tam / 1e9).toFixed(1)} Billion globally`, `SAM: $${(sam / 1e6).toFixed(0)} Million accessible target`, `Our SOM target is $${(som / 1e6).toFixed(0)} Million in 3 years`],
      visual_recommendation: 'Three concentric gradient circles representing TAM, SAM, and SOM sizes'
    },
    {
      slide_no: 5,
      title: 'Product Demonstration',
      talking_points: ['Show prompt page input', 'Demonstrate 15-second generation animation', 'Highlight instant results generated with LLMs'],
      visual_recommendation: 'Embedded high-fidelity 90-second product demo video'
    },
    {
      slide_no: 6,
      title: 'Business & Pricing Model',
      talking_points: ['Freemium model: 1 free credit/month', 'Starter tier at $99/mo (5 credits)', 'Pro tier at $299/mo (unlimited generation, exports)'],
      visual_recommendation: 'Simple 3-column pricing card layout highlighting Pro features'
    },
    {
      slide_no: 7,
      title: 'Go-to-Market Strategy',
      talking_points: ['SEO & Organic Content marketing indexing', 'Product Hunt launches & active startup communities', 'Paid search keywords targeting pre-revenue founders'],
      visual_recommendation: 'Funnel diagram showing user conversion path from visitor to paid'
    },
    {
      slide_no: 8,
      title: 'Competitive Analysis',
      talking_points: ['Traditional software is slow and expensive', 'Basic AI generators lack depth and templates', 'FounderGPT OS is 10x faster with 8 comprehensive sections'],
      visual_recommendation: 'Competitor comparison matrix with green checkmarks'
    },
    {
      slide_no: 9,
      title: 'Financial Projections',
      talking_points: ['Year 1 MRR target of $15K', 'Year 3 target of $175K MRR', 'High margins of 85-90% due to efficient API usage'],
      visual_recommendation: 'Bar chart showing monthly recurring revenue growth projections'
    },
    {
      slide_no: 10,
      title: 'The Team & Ask',
      talking_points: ['Founders with engineering and design background', 'Seeking $500K pre-seed investment', 'Funds will scale marketing and expand enterprise features'],
      visual_recommendation: 'Photos of founders with logos of past projects and clear call-to-action details'
    }
  ];

  const landing_page_copy = {
    headlines: [
      'Validate Your Startup Idea in 2 Minutes, Not 2 Weeks',
      'Get Your Investor-Ready Business Plan Automatically',
      'The Ultimate AI Co-Founder for Modern Entrepreneurs'
    ],
    hero_subcopy: 'Transform a single startup idea sentence into a complete, structured business blueprint. Estimate TAM, analyze 5 competitors, map buyer personas, and draft revenue models instantly.',
    benefits: [
      'Save Weeks of Boring Research: Our AI runs the numbers, estimates market sizes, and maps out competitors instantly.',
      'VC-Ready Formats: Generate slides, financial outline structures, and person templates that investors look for.',
      'Save Thousands in Consultant Fees: Bypass expensive consulting agencies and make data-informed decisions immediately.'
    ],
    cta: 'Generate Your First Blueprint Free'
  };

  return {
    market_analysis: {
      tam,
      sam,
      som,
      growth_rate: growthRate,
      summary,
      competitive_intensity: category === 'HealthTech' || category === 'FinTech' ? 'high' : 'medium'
    },
    competitors,
    customer_personas,
    go_to_market,
    revenue_model,
    mvp_features,
    pitch_deck_outline,
    landing_page_copy
  };
}
