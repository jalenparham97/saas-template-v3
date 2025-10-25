# SaaS Template

A production-ready SaaS template built with Next.js 15, tRPC, Prisma, and Better Auth.

## Features

- Authentication with Better Auth (email/password, passkeys, social login)
- Stripe integration with subscription management
- PostgreSQL with Prisma ORM
- Type-safe APIs with tRPC
- UI components with shadcn/ui and Tailwind CSS
- Email templates with Resend
- S3-compatible file storage
- Turborepo monorepo setup

## Prerequisites

- Node.js v20+
- Bun v1.2.23+
- PostgreSQL v14+

## Getting Started

1. Install dependencies:

```bash
bun install
```

2. Set up environment variables:

```bash
cp .env.example .env
```

Edit `.env` with your configuration. See `.env.example` for all required variables.

3. Set up database:

```bash
cd packages/database
bun run db:migrate
bun run db:generate
cd ../..
```

4. Start development server:

```bash
bun run dev
```

Visit `http://localhost:3000`

## Project Structure

```
apps/web/          # Next.js application
packages/
  ├── database/    # Prisma schema and client
  ├── email/       # Email templates
  ├── ui/          # Shared UI components
  └── react-form/  # Form utilities
```

## Adding Components

```bash
bunx shadcn@latest add <component-name> -c apps/web
```

Import components:

```tsx
import { Button } from '@workspace/ui/components/button';
```

## Scripts

- `bun run dev` - Start development server
- `bun run build` - Build for production
- `bun run lint` - Run ESLint

## License

MIT
