# Changelog

All notable changes to this project will be documented in this file.

## [1.1.0] - 2024-01-XX

### Added

- **Rate Limiting**: Comprehensive rate limiting system to prevent abuse
  - Feedback submission: 20 requests per minute per IP
  - Authentication: 30 requests per minute per IP
  - AI summaries: 10 requests per hour per user
  - Project creation: 15 requests per hour per user
- **Middleware**: Next.js middleware for API route protection
- **Configuration**: Centralized configuration system (`lib/config.ts`)
- **Documentation**: Comprehensive documentation including:
  - API documentation (`docs/API.md`)
  - Deployment guide (`docs/DEPLOYMENT.md`)
  - Updated README with full setup instructions

### Improved

- **Rate Limits**: Increased rate limits for better user experience
  - Feedback submission: 5 → 20 requests per minute
  - Authentication: 10 → 30 requests per minute
  - AI summaries: 3 → 10 requests per hour
  - Project creation: 5 → 15 requests per hour
- **Error Handling**: Better error handling across all API routes and server actions
- **Code Quality**: Cleaned up code and removed unnecessary complexity
- **Authentication**: Improved error handling in auth configuration
- **Type Safety**: Better TypeScript usage throughout the codebase

### Security

- Rate limiting protection against abuse
- Improved input validation
- Better error messages without exposing sensitive information
- CORS headers properly configured

### Technical Details

- In-memory rate limiting (suitable for single-instance deployments)
- Configurable rate limits via centralized config
- Proper HTTP status codes and headers
- Clean separation of concerns

## [1.0.0] - 2024-01-XX

### Initial Release

- Basic feedback collection system
- User authentication (email/password + Google OAuth)
- Project management
- Embeddable feedback widget
- AI-powered feedback summaries
- Modern UI with dark mode support
