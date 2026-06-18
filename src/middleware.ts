import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const publicRoutes = [
  '/',
  '/sign-in(.*)',
  '/sign-up(.*)',
  '/blueprint/(.*)',
];

function isPublicRoute(pathname: string): boolean {
  return publicRoutes.some((route) => {
    const regex = new RegExp(`^${route}$`);
    return regex.test(pathname);
  });
}

const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

function getRateLimitKey(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for');
  const ip = forwarded?.split(',')[0]?.trim() || '127.0.0.1';
  const pathname = new URL(request.url).pathname;
  return `${ip}:${pathname}`;
}

function checkRateLimit(key: string, windowMs: number, maxRequests: number): boolean {
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
