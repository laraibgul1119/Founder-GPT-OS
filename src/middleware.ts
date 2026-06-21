import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const rateLimitStore = new Map<string, { count: number; resetTime: number }>();
let lastCleanup = Date.now();
const CLEANUP_INTERVAL = 60_000;

function cleanupRateLimitStore() {
  const now = Date.now();
  if (now - lastCleanup < CLEANUP_INTERVAL) return;
  lastCleanup = now;
  rateLimitStore.forEach((entry, key) => {
    if (now > entry.resetTime) {
      rateLimitStore.delete(key);
    }
  });
}

function getRateLimitKey(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for');
  const ip = forwarded?.split(',')[0]?.trim() || '127.0.0.1';
  const pathname = new URL(request.url).pathname;
  return `${ip}:${pathname}`;
}

function checkRateLimit(key: string, windowMs: number, maxRequests: number): boolean {
  cleanupRateLimitStore();
  const now = Date.now();
  const entry = rateLimitStore.get(key);

  if (!entry || now > entry.resetTime) {
    rateLimitStore.set(key, { count: 1, resetTime: now + windowMs });
    return true;
  }

  entry.count++;
  return entry.count <= maxRequests;
}

function addSecurityHeaders(response: NextResponse, request: NextRequest): NextResponse {
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-XSS-Protection', '1; mode=block');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=(), interest-cohort=()');

  if (process.env.NODE_ENV === 'production') {
    response.headers.set('Strict-Transport-Security', 'max-age=63072000; includeSubDomains; preload');
  }

  const pathname = new URL(request.url).pathname;

  if (pathname.startsWith('/api/')) {
    response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate');
    response.headers.set('Pragma', 'no-cache');
  } else {
    response.headers.set(
      'Cache-Control',
      'public, max-age=0, must-revalidate'
    );
  }

  return response;
}

export default function middleware(request: NextRequest) {
  const { pathname } = new URL(request.url);

  if (pathname.startsWith('/api/webhooks/')) {
    const webhookKey = `webhook:${pathname}`;
    if (!checkRateLimit(webhookKey, 60_000, 100)) {
      return NextResponse.json(
        { error: 'Too many webhook requests' },
        { status: 429 }
      );
    }
    const response = NextResponse.next();
    return addSecurityHeaders(response, request);
  }

  if (pathname.startsWith('/api/')) {
    const apiKey = `api:${getRateLimitKey(request)}`;
    if (!checkRateLimit(apiKey, 60_000, 60)) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      );
    }
  }

  const response = NextResponse.next();
  return addSecurityHeaders(response, request);
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)', '/', '/(api|trpc)(.*)'],
};
