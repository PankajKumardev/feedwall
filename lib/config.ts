/**
 * Application configuration
 * Centralized configuration for easy customization
 */

export const config = {
  // Application settings
  app: {
    name: 'Feed-Wall',
    description: 'A modern feedback collection tool',
    url: process.env.NEXTAUTH_URL || 'http://localhost:3000',
  },

  // Rate limiting configuration
  rateLimits: {
    feedback: {
      limit: 20,
      windowMs: 60 * 1000, // 1 minute
    },
    auth: {
      limit: 30,
      windowMs: 60 * 1000, // 1 minute
    },
    aiSummary: {
      limit: 10,
      windowMs: 60 * 60 * 1000, // 1 hour
    },
    projectCreation: {
      limit: 15,
      windowMs: 60 * 60 * 1000, // 1 hour
    },
  },

  // Database settings
  database: {
    maxConnections: 10,
    connectionTimeout: 30000,
  },

  // AI settings
  ai: {
    model: 'gemini-2.5-flash',
    maxTokens: 1000,
  },

  // Widget settings
  widget: {
    maxFeedbackLength: 250,
    defaultRating: 4,
  },

  // Security settings
  security: {
    passwordMinLength: 8,
    sessionMaxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
  },
} as const;

export type Config = typeof config;
