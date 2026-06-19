# Skyderby frontend

A React + TypeScript frontend for Skyderby, built on the recommended stack from
issue #10. It runs against the existing Rails JSON API (`/api/v1`) — the backend
stays authoritative for data, scoring, payments, auth and realtime.

## Stack

| Concern | Choice |
| --- | --- |
| Framework | Next.js (App Router) + TypeScript |
| Data fetching | Server Components + TanStack Query |
| Tables | TanStack Table |
| Charts | Highcharts (`highcharts-react-official`) |
| Maps | Leaflet + OpenStreetMap (`react-leaflet`, keyless) |
| Forms | React Hook Form + Zod |
| Styling | Tailwind CSS + shadcn-style components |
| i18n | next-intl (en, ru, de, it, es, fr) |
| Realtime | `@rails/actioncable` client |
| Testing | Vitest + Testing Library, Playwright |

## Getting started

```bash
cp .env.example .env.local   # point at your Rails API
npm install
npm run dev                  # http://localhost:3000
```

Run the Rails API separately (default `http://localhost:3000`). If you run both
locally, start Next on another port: `npm run dev -- -p 3100`.

### Environment

| Variable | Purpose |
| --- | --- |
| `API_BASE_URL` | Rails API base for server-side fetches |
| `NEXT_PUBLIC_API_BASE_URL` | Rails API base for the browser + ActionCable |
| `OAUTH_CLIENT_ID` | Doorkeeper public client id (enables the login flow) |
| `OAUTH_REDIRECT_URI` | OAuth callback (defaults to `/api/auth/callback`) |

## Scripts

```bash
npm run dev          # dev server
npm run build        # production build
npm run start        # serve production build
npm run lint         # eslint
npm run typecheck    # tsc --noEmit
npm run test         # vitest (unit + component)
npm run e2e          # playwright (builds + serves first)
npm run format       # prettier --write
```

## What's implemented

- **Foundation**: Next.js + TS, Tailwind, ESLint/Prettier, locale routing, a typed
  API client (`src/lib/api`), TanStack Query provider, and an ActionCable consumer.
- **Suit catalog** (`/[locale]/suits`): SSR list from `/api/v1/suits`, with a
  TanStack Table, sortable columns, and a React Hook Form + Zod filter.
- **Online competitions** (`/[locale]/online-competitions`): SSR list from
  `/api/v1/virtual_competitions` with an empty state.
- **Track viewer** (`/[locale]/tracks/demo`): Highcharts speed/glide/altitude chart
  and a Leaflet/OpenStreetMap trajectory panel, driven by a representative sample jump.

See issue #10 for the full migration plan and the remaining phases.

## Structure

```
src/
  app/[locale]/          # locale-routed pages
  components/            # UI primitives + feature components
  i18n/                  # next-intl routing, navigation, request config
  lib/api/               # typed API client + per-resource fetchers
  lib/                   # utils, sample data, pure helpers
messages/                # translation catalogs (6 locales)
e2e/                     # Playwright specs
```
