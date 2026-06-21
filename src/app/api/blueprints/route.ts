import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getOrCreateUser } from '@/lib/auth';
import { generateMockBlueprint } from '@/lib/mockGenerator';

const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';

export async function GET() {
  try {
    const user = await getOrCreateUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const blueprints = await db.blueprint.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: 'desc' },
    });

    // Parse output strings back to objects for API response
    const parsedBlueprints = blueprints.map(bp => ({
      ...bp,
      output: (() => { try { return JSON.parse(bp.output); } catch { return bp.output; } })(),
    }));

    return NextResponse.json({
      blueprints: parsedBlueprints,
      total: blueprints.length,
    });
  } catch (error: any) {
    console.error('Error in GET /api/blueprints:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const user = await getOrCreateUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Check monthly limit
    const isUnderLimit = 
      user.tier === 'pro' || 
      user.blueprintsUsedThisMonth < user.blueprintLimit;

    if (!isUnderLimit) {
      return NextResponse.json(
        {
          error: 'Monthly blueprint limit reached',
          limit: user.blueprintLimit,
          used: user.blueprintsUsedThisMonth,
          resetDate: user.monthlyResetDate.toISOString().split('T')[0],
        },
        { status: 403 }
      );
    }

    const body = await req.json();
    const { startupIdea, industry, targetGeography, estimatedMarketSize } = body;

    if (!startupIdea || startupIdea.trim().length === 0) {
      return NextResponse.json({ error: 'Startup idea is required' }, { status: 400 });
    }

    const startTime = Date.now();
    let generatedOutput: any = null;
    let tokensUsed = 0;
    const apiKey = process.env.GROQ_API_KEY;

    if (apiKey) {
      try {
        const systemPrompt = `You are an expert business consultant with 20+ years of experience in startups, venture capital, and market analysis. Your task is to analyze a founder's startup idea and generate a complete, investor-ready business plan.

You must respond ONLY with valid JSON. Do not include markdown code blocks, do not include any preamble, introduction, or explanations outside the JSON structure.
The JSON must be strictly parseable by JSON.parse().`;

        const userPrompt = `STARTUP IDEA ANALYSIS REQUEST

Startup Idea: ${startupIdea}
Industry: ${industry || 'Not specified'}
Target Geography: ${targetGeography || 'Global'}
Estimated Market Size: ${estimatedMarketSize ? `$${estimatedMarketSize}M` : 'Not specified'}

Generate a complete business plan in the following JSON structure:
{
  "market_analysis": {
    "tam": number,
    "sam": number,
    "som": number,
    "growth_rate": number,
    "summary": "string",
    "competitive_intensity": "low" | "medium" | "high"
  },
  "competitors": [
    {
      "name": "string",
      "strengths": ["string"],
      "weaknesses": ["string"],
      "market_share_pct": number,
      "positioning": "string"
    }
  ],
  "customer_personas": [
    {
      "name": "string",
      "role": "string",
      "demographics": "string",
      "pain_points": ["string"],
      "willingness_to_pay": "string",
      "cac_estimate": "string",
      "contact_info": {
        "email": "string - likely professional email of this persona type",
        "linkedin": "string - LinkedIn profile URL pattern for this persona",
        "twitter": "string - Twitter/X handle for this persona type",
        "company_website": "string - company or personal website URL"
      }
    }
  ],
  "go_to_market": {
    "channels": [
      { "name": "string", "description": "string", "cac": "string" }
    ],
    "roadmap_12m": [
      { "month": "string", "milestones": ["string"] }
    ]
  },
  "revenue_model": {
    "tiers": [
      { "name": "string", "price": "string", "features": ["string"] }
    ],
    "annual_projections": [
      { "year": "string", "revenue": "string", "margins": "string" }
    ],
    "break_even": "string"
  },
  "mvp_features": [
    { "name": "string", "priority": "Must-Have" | "Nice-to-Have" | "Future", "effort": "string", "timeline": "string" }
  ],
  "pitch_deck_outline": [
    { "slide_no": number, "title": "string", "talking_points": ["string"], "visual_recommendation": "string" }
  ],
  "landing_page_copy": {
    "headlines": ["string"],
    "hero_subcopy": "string",
    "benefits": ["string"],
    "cta": "string"
  }
}

Ensure the output contains exactly 5 competitors and exactly 3 customer personas. Ensure all fields are populated with realistic data based on the business idea.`;

        const groqResponse = await fetch(GROQ_API_URL, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            model: 'llama-3.3-70b-versatile',
            messages: [
              { role: 'system', content: systemPrompt },
              { role: 'user', content: userPrompt }
            ],
            temperature: 0.7,
            max_tokens: 4000,
            response_format: { type: 'json_object' }
          })
        });

        if (groqResponse.ok) {
          const result = await groqResponse.json();
          const content = result.choices[0]?.message?.content;
          tokensUsed = result.usage?.total_tokens || 0;
          
          if (content) {
            generatedOutput = JSON.parse(content.trim());
          }
        } else {
          console.error('Groq API error status:', groqResponse.status, await groqResponse.text());
        }
      } catch (e) {
        console.error('Failed to generate plan with Groq API, using mock generator:', e);
      }
    }

    // Fallback if API key is missing or failed
    if (!generatedOutput) {
      console.log('Generating blueprint using local Mock generator');
      // Simulate network latency (2 seconds) for a realistic user experience
      await new Promise(resolve => setTimeout(resolve, 2000));
      generatedOutput = generateMockBlueprint(startupIdea, industry, targetGeography);
    }

    const generationTimeMs = Date.now() - startTime;

    // Extract some key metrics for indexing
    const tam = generatedOutput.market_analysis?.tam || null;
    const growthRate = generatedOutput.market_analysis?.growth_rate || null;
    const competitiveIntensity = generatedOutput.market_analysis?.competitive_intensity || null;

    // Save to DB
    const blueprint = await db.blueprint.create({
      data: {
        userId: user.id,
        startupIdea,
        industry: industry || null,
        targetGeography: targetGeography || null,
        estimatedMarketSize: estimatedMarketSize ? parseInt(estimatedMarketSize) : null,
        output: JSON.stringify(generatedOutput),
        tam: tam ? parseFloat(tam) : null,
        growthRate: growthRate ? parseFloat(growthRate) : null,
        competitiveIntensity,
        generationTimeMs,
        groqTokensUsed: tokensUsed || null,
      }
    });

    // Update user usage count
    await db.user.update({
      where: { id: user.id },
      data: {
        blueprintsUsedThisMonth: {
          increment: 1
        }
      }
    });

    // Log activity
    await db.activityLog.create({
      data: {
        userId: user.id,
        blueprintId: blueprint.id,
        action: 'generated',
        metadata: JSON.stringify({ idea: startupIdea, generationTimeMs }),
      }
    });

    return NextResponse.json({
      ...blueprint,
      output: generatedOutput,
    });

  } catch (error: any) {
    console.error('Error in POST /api/blueprints:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
