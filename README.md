# Service Management

A service management application for managing hospital equipment maintenance, work orders, spare parts, and engineering tasks.

## Tech Stack

- **Framework:** Next.js 16
- **Database:** PostgreSQL (Neon)
- **ORM:** Drizzle ORM
- **Styling:** Tailwind CSS

## Project Structure

```
.
├── app/                    # Next.js App Router pages
│   ├── cargo/             # Cargo management
│   ├── components/        # Reusable UI components
│   │   └── icons/         # Icon renderer
│   ├── config/db/         # Database configuration
│   │   └── schema.ts      # Drizzle schema definitions
│   ├── pmstatus/          # PM (Preventive Maintenance) status
│   ├── reports/           # Reports module
│   ├── service/           # Service management
│   ├── settings/          # Settings page
│   ├── setup/             # Setup/configuration
│   ├── spareparts/        # Spare parts management
│   ├── tools/             # Tools management
│   ├── workdone/          # Completed work orders
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── drizzle/               # Drizzle ORM files
│   ├── schema.ts          # Database schema
│   ├── relations.ts      # Table relations
│   └── 0000_*.sql        # Migration files
├── drizzle.config.ts      # Drizzle configuration
└── package.json
```

## Getting Started

### Prerequisites

- Node.js 20+
- PostgreSQL database (Neon or local)

### Installation

```bash
# Install dependencies
npm install

# or using bun
bun install
```

### Environment Setup

Copy the example environment file and add your database URL:

```bash
cp .env.example .env
```

Update `.env` with your Neon database connection string:

```
DATABASE_URL=postgresql://user:password@host/database?sslmode=require
```

### Database Commands

```bash
# Pull schema from database
npx drizzle-kit pull

# Check schema consistency
npx drizzle-kit check

# Generate migrations
npx drizzle-kit generate

# Push migrations to database
npx drizzle-kit push
```

### Running the App

```bash
# Development mode
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view the app.
