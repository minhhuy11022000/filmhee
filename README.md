# filmhee

A streaming films web app MVP — dark cinematic style built with Next.js, Hono, tRPC, and Prisma.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js 16, React 19, Tailwind CSS v4, ShadCN UI |
| Backend | Hono, tRPC v11, Bun runtime |
| Database | PostgreSQL via Supabase + Prisma ORM |
| Auth | JWT (jsonwebtoken) + bcryptjs |
| Monorepo | Turborepo + Bun workspaces |

## Project Structure

```
filmhee/
├── apps/
│   ├── web/          # Next.js frontend (port 3000)
│   └── api/          # Hono + tRPC backend (port 3001)
├── packages/
│   └── types/        # Shared TypeScript types
├── turbo.json
└── package.json
```

## Prerequisites

- [Bun](https://bun.sh) >= 1.1.0
- A [Supabase](https://supabase.com) account (free tier works)

Install Bun (if not already installed):
```bash
curl -fsSL https://bun.sh/install | bash
```

---

## 1. Supabase Setup

### Create a project

1. Go to [supabase.com](https://supabase.com) and sign in
2. Click **New Project**, fill in the name and database password, choose a region
3. Wait for the project to be ready (~1 minute)

### Get your connection strings

1. In your project dashboard, click the **Connect** button (top of page)
2. Select the **Transaction** tab (or look for port `6543`) → copy the URL — this is your `DATABASE_URL`
3. Select the **Session** tab (or look for port `5432`) → copy the URL — this is your `DIRECT_URL`

> **Why two URLs?** Supabase uses PgBouncer (connection pooler) on port 6543 for runtime queries, and a direct connection on port 5432 for schema migrations. Prisma needs both.

---

## 2. Backend Setup (`apps/api`)

### Configure environment variables

```bash
cd apps/api
cp .env.example .env
```

Edit `.env` and fill in your values:

```env
# Pooled connection — runtime queries (port 6543)
DATABASE_URL="postgresql://postgres.YOURREF:YOURPASSWORD@aws-0-YOURREGION.pooler.supabase.com:6543/postgres?sslmode=require"

# Direct connection — migrations only (port 5432)
DIRECT_URL="postgresql://postgres.YOURREF:YOURPASSWORD@aws-0-YOURREGION.pooler.supabase.com:5432/postgres?sslmode=require"

# A long random secret for signing JWTs
JWT_SECRET="change-me-in-production-use-a-long-random-string"

PORT=3001
FRONTEND_URL="http://localhost:3000"
```

### Install dependencies & run migrations

```bash
# From the repo root — installs all workspaces
bun install

# Apply the database schema to Supabase
cd apps/api
bun run db:migrate
```

> If asked for a migration name, type something like `init` and press Enter.

### Generate Prisma client

This is done automatically by `db:migrate`, but you can also run it manually:

```bash
bun run db:generate
```

### Start the API server

```bash
bun run dev
```

The API will be available at `http://localhost:3001`.

**Verify it's running:**
```
GET http://localhost:3001/health
→ { "status": "ok" }
```

---

## 3. Frontend Setup (`apps/web`)

### Configure environment variables

Create `apps/web/.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:3001
```

> If this file is omitted, the frontend defaults to `http://localhost:3001` automatically.

### Start the frontend

```bash
cd apps/web
bun run dev
```

The app will be available at `http://localhost:3000`.

---

## 4. Run Everything at Once

From the repo root, Turborepo starts both apps in parallel:

```bash
bun run dev
```

---

## 5. Pages

| Route | Description |
|-------|-------------|
| `/` | Home — hero banner, trending/new/top-rated rows, genre grid |
| `/film/[id]` | Film detail — backdrop, metadata, cast, related films |
| `/login` | Sign in with email + password |
| `/register` | Create a new account |
| `/profile` | Watchlist, watch history, account settings |

---

## 6. API Reference

The backend exposes a single tRPC endpoint at `POST /trpc`. All procedures are type-safe end-to-end.

### Auth procedures (public)
| Procedure | Type | Description |
|-----------|------|-------------|
| `auth.register` | mutation | Create account — returns `{ token, user }` |
| `auth.login` | mutation | Sign in — returns `{ token, user }` |
| `auth.me` | query | Get current user from JWT token |

### Films procedures (public)
| Procedure | Type | Description |
|-----------|------|-------------|
| `films.list` | query | List films with optional genre/search/page filters |
| `films.getById` | query | Get a single film by ID |
| `films.trending` | query | Get trending films |
| `films.topRated` | query | Get top-rated films |
| `films.featured` | query | Get the featured film |

### Users procedures (requires auth)
| Procedure | Type | Description |
|-----------|------|-------------|
| `users.profile` | query | Get current user profile |
| `users.watchlist` | query | Get user's watchlist |
| `users.addToWatchlist` | mutation | Add a film to watchlist |
| `users.removeFromWatchlist` | mutation | Remove a film from watchlist |
| `users.history` | query | Get watch history |
| `users.updateProgress` | mutation | Update watch progress (0–100%) |

**Authentication:** Pass the JWT token as a Bearer token in the `Authorization` header:
```
Authorization: Bearer <token>
```

---

## 7. Database

### View your data

```bash
cd apps/api
bun run db:studio
```

Opens Prisma Studio at `http://localhost:5555` — a visual database browser.

### Schema models

- **User** — id, name, email, password (hashed), avatarUrl, subscription
- **Film** — id, title, year, genres, rating, duration, posterUrl, backdropUrl, description, director
- **CastMember** — id, name, character, avatarUrl (linked to Film)
- **WatchlistItem** — links User ↔ Film (unique per user/film pair)
- **WatchHistory** — links User ↔ Film with progress % and watchedAt timestamp

### Run migrations

```bash
cd apps/api
bun run db:migrate        # create + apply new migration
bun run db:generate       # regenerate Prisma client after schema changes
```

> Always commit the `prisma/migrations/` folder to git. Never commit `.env`.

---

## 8. Common Scripts

| Command | Location | Description |
|---------|----------|-------------|
| `bun run dev` | root | Start all apps with Turborepo |
| `bun run build` | root | Build all apps |
| `bun run dev` | `apps/api` | Start API server (hot reload via `--watch`) |
| `bun run dev` | `apps/web` | Start Next.js dev server |
| `bun run db:migrate` | `apps/api` | Run Prisma migrations |
| `bun run db:generate` | `apps/api` | Regenerate Prisma client |
| `bun run db:studio` | `apps/api` | Open Prisma Studio |
