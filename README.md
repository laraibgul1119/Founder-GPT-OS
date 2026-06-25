# FounderGPT OS

AI-powered business plan generator that transforms a single startup idea into an investor-ready, 8-section business blueprint in under 2 minutes.

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Database:** PostgreSQL (AWS Aurora) + Prisma ORM
- **AI:** Groq API (Llama 3.3 70B Versatile)
- **Auth:** JWT (jose) + bcryptjs
- **Icons:** Lucide React
- **Deployment:** Vercel

## Features

- AI-generated business blueprints (market analysis, competitors, personas, GTM, revenue model, MVP roadmap, pitch deck outline, landing page copy)
- Interactive multi-tab blueprint dashboard
- Tiered subscription plans (Free / Starter / Pro)
- Monthly usage tracking and credit limits
- Mock generator fallback when Groq API key is absent
- Rate limiting and security headers via middleware
- Shareable public blueprint links

## Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL database (local or AWS Aurora)

### Setup

1. Clone the repo and install dependencies:

```bash
git clone <repo-url>
cd founder
npm install
```

2. Copy `.env.example` to `.env.local` and fill in your values:

```bash
cp .env.example .env.local
```

Required environment variables:

| Variable | Description |
|---|---|
| `GROQ_API_KEY` | Get a free key at [console.groq.com](https://console.groq.com/keys) |
| `JWT_SECRET` | Generate with `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"` |
| `NEXT_PUBLIC_APP_URL` | Your app URL (e.g. `http://localhost:3000`) |
| `DATABASE_URL` | PostgreSQL connection string |

3. Run the database migrations:

```bash
npx prisma db push
```

4. Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Production Build

```bash
npm run build
npm start
```

## Project Structure

```
src/
├── app/
│   ├── api/
│   │   ├── auth/          # Sign-in, sign-up, sign-out, user endpoints
│   │   └── blueprints/    # Blueprint CRUD and generation
│   ├── blueprint/[id]/    # Blueprint viewer
│   ├── dashboard/         # User dashboard
│   ├── generate/          # Blueprint generation form
│   ├── pricing/           # Pricing page
│   ├── settings/          # User settings
│   ├── sign-in/           # Auth pages
│   └── sign-up/
├── components/
│   └── ui/                # Reusable UI components
├── lib/
│   ├── auth.ts            # JWT session management
│   ├── auth-client.ts     # Client-side auth helpers
│   ├── db.ts              # Prisma client instance
│   ├── mockGenerator.ts   # Fallback blueprint generator
│   ├── rate-limit.ts      # Rate limiting utility
│   └── cn.ts              # className merge utility
└── middleware.ts          # Security headers + API rate limiting
```

## Database Schema

- **User** - accounts with tier, blueprint limits, and monthly usage tracking
- **Blueprint** - generated business plans with parsed output, TAM metrics, and share tokens
- **ActivityLog** - audit trail of user actions

## Why AWS Aurora PostgreSQL

- **Serverless scaling** - Aurora Serverless v2 auto-scales capacity based on demand, so you pay only for what you use during traffic spikes (e.g. Product Hunt launches) without managing instance sizes.
- **PostgreSQL compatibility** - Full PostgreSQL wire-protocol compatibility means Prisma, local dev with `pg`, and all standard Postgres tooling work without modification.
- **High availability** - Built-in multi-AZ replication with automatic failover keeps the database online during infrastructure issues, critical for a SaaS serving paying customers.
- **Performance at scale** - Up to 5x throughput compared to standard PostgreSQL on similar hardware, handling concurrent blueprint generation requests efficiently.
- **Operational simplicity** - No patching, backups, or recovery automation to manage; Aurora handles snapshots, point-in-time recovery, and software updates.
- **Vercel + AWS synergy** - Deploying the Next.js frontend on Vercel (US regions) with Aurora in the same AWS network keeps latency low for API routes hitting the database.

## License

MIT license.
