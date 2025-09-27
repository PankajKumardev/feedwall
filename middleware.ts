import { NextRequest, NextResponse } from 'next/server';
import rateLimiter, { RATE_LIMITS } from '@/lib/rate-limit';

/**
 * Middleware for rate limiting API routes
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Get client IP address
  const ip =
    request.headers.get('x-forwarded-for') ??
    request.headers.get('x-real-ip') ??
    'unknown';

  // Rate limit feedback API
  if (pathname.startsWith('/api/feedback')) {
    const result = rateLimiter.checkLimit(
      `feedback:${ip}`,
      RATE_LIMITS.FEEDBACK.limit,
      RATE_LIMITS.FEEDBACK.windowMs
    );

    if (!result.isAllowed) {
      return NextResponse.json(
        {
          error: 'Too many requests. Please try again later.',
          retryAfter: Math.ceil((result.resetTime - Date.now()) / 1000),
        },
        {
          status: 429,
          headers: {
            'Retry-After': Math.ceil(
              (result.resetTime - Date.now()) / 1000
            ).toString(),
            'X-RateLimit-Limit': RATE_LIMITS.FEEDBACK.limit.toString(),
            'X-RateLimit-Remaining': result.remaining.toString(),
            'X-RateLimit-Reset': new Date(result.resetTime).toISOString(),
          },
        }
      );
    }
  }

  // Rate limit auth API
  if (pathname.startsWith('/api/auth')) {
    const result = rateLimiter.checkLimit(
      `auth:${ip}`,
      RATE_LIMITS.AUTH.limit,
      RATE_LIMITS.AUTH.windowMs
    );

    if (!result.isAllowed) {
      return NextResponse.json(
        {
          error: 'Too many authentication attempts. Please try again later.',
          retryAfter: Math.ceil((result.resetTime - Date.now()) / 1000),
        },
        {
          status: 429,
          headers: {
            'Retry-After': Math.ceil(
              (result.resetTime - Date.now()) / 1000
            ).toString(),
            'X-RateLimit-Limit': RATE_LIMITS.AUTH.limit.toString(),
            'X-RateLimit-Remaining': result.remaining.toString(),
            'X-RateLimit-Reset': new Date(result.resetTime).toISOString(),
          },
        }
      );
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/api/feedback/:path*', '/api/auth/:path*'],
};
