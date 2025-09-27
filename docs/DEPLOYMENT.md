# Deployment Guide

## Overview

This guide covers deploying Feed-Wall to various platforms. The application is designed to be platform-agnostic but works best with Vercel.

## Prerequisites

- Node.js 18+ installed locally
- PostgreSQL database (managed or self-hosted)
- Domain name (optional but recommended)
- Environment variables configured

## Environment Variables

Create a `.env.local` file with the following variables:

```env
# Database
DATABASE_URL="postgresql://username:password@host:port/database"

# NextAuth
NEXTAUTH_SECRET="your-secret-key-here"
NEXTAUTH_URL="https://your-domain.com"

# Google OAuth (optional)
GOOGLE_ID="your-google-client-id"
GOOGLE_SECRET="your-google-client-secret"

# Google AI
GOOGLE_API_KEY="your-google-ai-api-key"
```

### Generating NEXTAUTH_SECRET

```bash
# Using OpenSSL
openssl rand -base64 32

# Using Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

## Vercel Deployment (Recommended)

### 1. Prepare Repository

Ensure your code is pushed to a Git repository (GitHub, GitLab, or Bitbucket).

### 2. Connect to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Sign in with your Git provider
3. Click "New Project"
4. Import your repository

### 3. Configure Environment Variables

In the Vercel dashboard:

1. Go to your project settings
2. Navigate to "Environment Variables"
3. Add all required environment variables
4. Set the environment (Production, Preview, Development)

### 4. Database Setup

#### Option A: Vercel Postgres (Recommended)

1. In Vercel dashboard, go to "Storage"
2. Create a new Postgres database
3. Copy the connection string to `DATABASE_URL`

#### Option B: External Database

Use any PostgreSQL provider:

- [Supabase](https://supabase.com)
- [PlanetScale](https://planetscale.com)
- [Railway](https://railway.app)
- [Neon](https://neon.tech)

### 5. Deploy

1. Click "Deploy" in Vercel
2. Wait for the build to complete
3. Your app will be available at `https://your-project.vercel.app`

### 6. Run Database Migrations

After deployment, run the database migrations:

```bash
# Install Vercel CLI
npm i -g vercel

# Run migrations
vercel env pull .env.local
npx prisma migrate deploy
```

## Railway Deployment

### 1. Connect Repository

1. Go to [railway.app](https://railway.app)
2. Sign in with GitHub
3. Click "New Project"
4. Select "Deploy from GitHub repo"
5. Choose your repository

### 2. Add Database

1. In your project dashboard, click "New"
2. Select "Database" → "PostgreSQL"
3. Railway will automatically set the `DATABASE_URL` environment variable

### 3. Configure Environment Variables

1. Go to your service settings
2. Navigate to "Variables"
3. Add all required environment variables

### 4. Deploy

Railway will automatically build and deploy your application.

## Docker Deployment

### 1. Create Dockerfile

```dockerfile
FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm ci --only=production

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Generate Prisma client
RUN npx prisma generate

# Build the application
RUN npm run build

# Production image
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000

CMD ["node", "server.js"]
```

### 2. Build and Run

```bash
# Build the image
docker build -t feedwall .

# Run the container
docker run -p 3000:3000 \
  -e DATABASE_URL="your-database-url" \
  -e NEXTAUTH_SECRET="your-secret" \
  -e NEXTAUTH_URL="http://localhost:3000" \
  -e GOOGLE_API_KEY="your-api-key" \
  feedwall
```

## Manual Server Deployment

### 1. Server Requirements

- Ubuntu 20.04+ or similar Linux distribution
- Node.js 18+
- PostgreSQL 12+
- Nginx (for reverse proxy)
- PM2 (for process management)

### 2. Install Dependencies

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install PostgreSQL
sudo apt install postgresql postgresql-contrib

# Install PM2
sudo npm install -g pm2

# Install Nginx
sudo apt install nginx
```

### 3. Set Up Database

```bash
# Switch to postgres user
sudo -u postgres psql

# Create database and user
CREATE DATABASE feedwall;
CREATE USER feedwall_user WITH PASSWORD 'your_password';
GRANT ALL PRIVILEGES ON DATABASE feedwall TO feedwall_user;
\q
```

### 4. Deploy Application

```bash
# Clone repository
git clone <your-repo-url> /var/www/feedwall
cd /var/www/feedwall

# Install dependencies
npm install

# Build application
npm run build

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your values

# Run database migrations
npx prisma migrate deploy

# Start with PM2
pm2 start npm --name "feedwall" -- start
pm2 save
pm2 startup
```

### 5. Configure Nginx

```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

## Post-Deployment Checklist

- [ ] Environment variables are set correctly
- [ ] Database migrations have been run
- [ ] Application is accessible via browser
- [ ] Authentication is working
- [ ] Feedback submission is working
- [ ] Rate limiting is functioning
- [ ] SSL certificate is installed (if using custom domain)
- [ ] Monitoring is set up (optional)

## Monitoring and Maintenance

### Health Checks

The application includes basic health monitoring. You can add more sophisticated monitoring with:

- [Vercel Analytics](https://vercel.com/analytics)
- [Sentry](https://sentry.io) for error tracking
- [Uptime Robot](https://uptimerobot.com) for uptime monitoring

### Database Maintenance

```bash
# Backup database
pg_dump $DATABASE_URL > backup.sql

# Restore database
psql $DATABASE_URL < backup.sql

# Run migrations
npx prisma migrate deploy
```

### Updates

```bash
# Pull latest changes
git pull origin main

# Install new dependencies
npm install

# Run migrations
npx prisma migrate deploy

# Restart application
pm2 restart feedwall
```

## Troubleshooting

### Common Issues

1. **Database Connection Error**

   - Check `DATABASE_URL` format
   - Ensure database is accessible
   - Verify credentials

2. **Authentication Not Working**

   - Check `NEXTAUTH_SECRET` is set
   - Verify `NEXTAUTH_URL` matches your domain
   - Check OAuth credentials if using Google

3. **Rate Limiting Too Strict**

   - Adjust limits in `lib/rate-limit.ts`
   - Consider using Redis for production

4. **Build Failures**
   - Check Node.js version (18+)
   - Clear `.next` folder and rebuild
   - Check for TypeScript errors

### Logs

```bash
# PM2 logs
pm2 logs feedwall

# Nginx logs
sudo tail -f /var/log/nginx/error.log
sudo tail -f /var/log/nginx/access.log

# Application logs
# Check your deployment platform's logging system
```

## Security Considerations

- Use strong, unique passwords
- Enable SSL/TLS certificates
- Keep dependencies updated
- Monitor for security vulnerabilities
- Use environment variables for secrets
- Implement proper backup strategies
- Consider using a WAF (Web Application Firewall)

## Scaling

For high-traffic deployments:

1. **Database**: Use connection pooling (PgBouncer)
2. **Caching**: Implement Redis for rate limiting
3. **CDN**: Use CloudFlare or similar for static assets
4. **Load Balancing**: Multiple application instances
5. **Monitoring**: Comprehensive logging and alerting

## Support

For deployment issues:

- Check the [troubleshooting section](#troubleshooting)
- Create an issue in the repository
- Email: support@feedwall.com
