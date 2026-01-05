# Environment Setup Guide

This guide explains how to set up and manage different environments (development, preview, production) for the Helix application.

## Overview

The application supports three environments:

- **Development**: Local development environment
- **Preview**: Staging/testing environment (deployed from `release/preview` branch)
- **Production**: Live production environment (deployed from `release/prod` branch)

## Environment Variables

### Required Variables

All environments require the following variables:

```bash
# Environment identifier
NEXT_PUBLIC_APP_ENV="development|preview|production"

# Better Auth
BETTER_AUTH_SECRET=""  # Generate with: openssl rand -base64 32

# OAuth Providers
BETTER_AUTH_GITHUB_CLIENT_ID=""
BETTER_AUTH_GITHUB_CLIENT_SECRET=""
BETTER_AUTH_GOOGLE_CLIENT_ID=""
BETTER_AUTH_GOOGLE_CLIENT_SECRET=""
BETTER_AUTH_MICROSOFT_CLIENT_ID=""
BETTER_AUTH_MICROSOFT_CLIENT_SECRET=""

# Email (Resend)
RESEND_API_KEY=""
EMAIL_FROM=""

# Database
DATABASE_URL=""
```

## Local Development Setup

1. **Copy the example environment file**:

   ```bash
   cp .env.example .env
   ```

2. **Fill in your local values** in `.env`

3. **Start the development server**:

   ```bash
   pnpm dev
   ```

## Preview Environment Setup

### 1. Create Preview Environment File

```bash
cp .env.preview.example .env.preview
```

Fill in preview-specific values:

- Use a separate database (e.g., `helix_preview`)
- Optionally use separate OAuth apps
- Set `NEXT_PUBLIC_APP_ENV="preview"`

### 2. Local Preview Testing

Build and run locally with preview environment:

```bash
# Build with preview environment
pnpm build:preview

# Start with preview environment
pnpm start:preview
```

### 3. Database Setup

Run migrations on preview database:

```bash
# Push schema to preview database
pnpm db:push:preview

# Or run migrations
pnpm db:migrate:preview
```

### 4. Vercel Deployment

1. **Set environment variables in Vercel**:
   - Go to your project settings → Environment Variables
   - Add all required variables for the **Preview** environment
   - Set `NEXT_PUBLIC_APP_ENV=preview`

2. **Deploy from `release/preview` branch**:

   ```bash
   git checkout release/preview
   git push origin release/preview
   ```

Vercel will automatically deploy preview builds from this branch.

## Production Environment Setup

### 1. Create Production Environment File

```bash
cp .env.production.example .env.production
```

Fill in production values:

- Use production database
- Use production OAuth apps
- Set `NEXT_PUBLIC_APP_ENV="production"`

### 2. Local Production Testing

Build and run locally with production environment:

```bash
# Build with production environment
pnpm build:production

# Start with production environment
pnpm start:production
```

### 3. Database Setup

Run migrations on production database:

```bash
# Push schema to production database (use with caution!)
pnpm db:push:production

# Or run migrations
pnpm db:migrate:production
```

### 4. Vercel Deployment

1. **Set environment variables in Vercel**:
   - Go to your project settings → Environment Variables
   - Add all required variables for the **Production** environment
   - Set `NEXT_PUBLIC_APP_ENV=production`

2. **Deploy from `release/prod` branch**:

   ```bash
   git checkout release/prod
   git push origin release/prod
   ```

Vercel will automatically deploy production builds from this branch.

## Branch Strategy

```
main (development)
├── release/preview (preview deployments)
└── release/prod (production deployments)
```

### Workflow

1. **Development**: Work on `main` branch
2. **Preview**: Merge `main` → `release/preview` for staging
3. **Production**: Merge `release/preview` → `release/prod` for production

### Merging to Preview

```bash
git checkout release/preview
git merge main
git push origin release/preview
```

### Merging to Production

```bash
git checkout release/prod
git merge release/preview
git push origin release/prod
```

## Available Scripts

### Build Scripts

- `pnpm build` - Build with default environment
- `pnpm build:preview` - Build with preview environment
- `pnpm build:production` - Build with production environment

### Start Scripts

- `pnpm start` - Start with default environment
- `pnpm start:preview` - Start with preview environment
- `pnpm start:production` - Start with production environment

### Database Scripts

- `pnpm db:push:preview` - Push schema to preview database
- `pnpm db:push:production` - Push schema to production database
- `pnpm db:migrate:preview` - Run migrations on preview database
- `pnpm db:migrate:production` - Run migrations on production database

## Environment Detection

The application automatically detects the environment using `NEXT_PUBLIC_APP_ENV`:

```typescript
import { env } from "@/env";

// Server-side
const isProduction = env.NEXT_PUBLIC_APP_ENV === "production";

// Client-side (available in browser)
const isPreview = process.env.NEXT_PUBLIC_APP_ENV === "preview";
```

## Database Recommendations

### Preview Database

- Use a managed database service (Vercel Postgres, Neon, Supabase, Railway)
- Separate from production
- Can use smaller instance size
- Regular backups recommended

### Production Database

- Use a managed database service with high availability
- Enable automatic backups
- Use connection pooling
- Monitor performance
- Set up alerts

## Security Best Practices

1. **Never commit `.env` files** to version control
2. **Use different OAuth apps** for preview and production
3. **Rotate secrets regularly**, especially `BETTER_AUTH_SECRET`
4. **Use strong database passwords**
5. **Enable SSL/TLS** for database connections
6. **Set up proper database access controls**

## Troubleshooting

### Environment variables not loading

Check that:

- The correct `.env` file exists
- Variables are properly formatted (no spaces around `=`)
- You're using the correct script (e.g., `build:preview` for preview)

### Database connection errors

Verify:

- `DATABASE_URL` is correct
- Database is accessible from your network
- Credentials are valid
- SSL settings are correct

### OAuth errors

Ensure:

- OAuth app redirect URLs are configured correctly
- Client ID and secret match the environment
- OAuth apps are enabled

## Support

For issues or questions:

1. Check this documentation
2. Review `.env.example` files
3. Check Vercel deployment logs
4. Verify environment variables in Vercel dashboard
