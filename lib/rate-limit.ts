/**
 * Simple in-memory rate limiting utility
 * For production, consider using Redis or a database-backed solution
 */

import { config } from './config';

interface RateLimitEntry {
  count: number;
  resetTime: number;
}

class RateLimiter {
  private store = new Map<string, RateLimitEntry>();
  private cleanupInterval: NodeJS.Timeout;

  constructor() {
    // Clean up expired entries every 5 minutes
    this.cleanupInterval = setInterval(() => {
      const now = Date.now();
      for (const [key, entry] of this.store.entries()) {
        if (now > entry.resetTime) {
          this.store.delete(key);
        }
      }
    }, 5 * 60 * 1000);
  }

  /**
   * Check if request is within rate limit
   * @param key - Unique identifier for the rate limit (IP, user ID, etc.)
   * @param limit - Maximum number of requests allowed
   * @param windowMs - Time window in milliseconds
   * @returns Object with isAllowed boolean and remaining requests
   */
  checkLimit(key: string, limit: number, windowMs: number) {
    const now = Date.now();
    const entry = this.store.get(key);

    if (!entry || now > entry.resetTime) {
      // First request or window expired
      this.store.set(key, {
        count: 1,
        resetTime: now + windowMs,
      });
      return {
        isAllowed: true,
        remaining: limit - 1,
        resetTime: now + windowMs,
      };
    }

    if (entry.count >= limit) {
      return {
        isAllowed: false,
        remaining: 0,
        resetTime: entry.resetTime,
      };
    }

    // Increment count
    entry.count++;
    this.store.set(key, entry);

    return {
      isAllowed: true,
      remaining: limit - entry.count,
      resetTime: entry.resetTime,
    };
  }

  /**
   * Clean up resources
   */
  destroy() {
    clearInterval(this.cleanupInterval);
    this.store.clear();
  }
}

// Create singleton instance
const rateLimiter = new RateLimiter();

export default rateLimiter;

// Predefined rate limit configurations
export const RATE_LIMITS = {
  FEEDBACK: config.rateLimits.feedback,
  AUTH: config.rateLimits.auth,
  AI_SUMMARY: config.rateLimits.aiSummary,
  PROJECT_CREATION: config.rateLimits.projectCreation,
} as const;
