# BRC Official Website

This repository hosts the BRC official website built with Next.js App Router.
It includes a small BFF layer that reads ministry content from WPGraphQL and
exposes a clean JSON API for the frontend. The site is fully bilingual (ZH/EN)
with locale-based routing and a header language switch.

Design inspiration: https://newbethelrc.org/

## Highlights

- Next.js App Router with locale routing (`/zh`, `/en`)
- Bilingual UI via local JSON dictionaries (i18n)
- ACF dual-language fields (e.g. `titleZh/titleEn`, `summaryZh/summaryEn`)
- BFF API routes for ministry list and detail (WPGraphQL)
- ISR caching for stable response time (`revalidate: 60`)

## Routes

Frontend (localized):

- `/zh` or `/en` - home
- `/zh/about` or `/en/about`
- `/zh/ministries` or `/en/ministries`
- `/zh/ministries/[top]`
- `/zh/ministries/[top]/[slug]`
- `/zh/prayer`, `/zh/trainings`, `/zh/audio`, `/zh/calendar`, `/zh/contact`, `/zh/donation`

API (BFF):

- `/api/ministries` - list all ministries
- `/api/ministries?top=youth` - list ministries by top section
- `/api/ministries/[slug]` - single ministry detail
- `/api/nav` - placeholder navigation endpoint (returns empty array)

## Bilingual Implementation

- Locale routing is implemented under `src/app/[locale]`.
- `src/proxy.ts` redirects missing locale paths to `/zh` and stores
  `NEXT_LOCALE` in cookies.
- Dictionaries live in `src/lib/i18n/messages/zh.json` and `en.json`.
- Header language switch toggles the locale while preserving the path.
- `pickLocalized()` selects the correct ACF field based on locale.

For a detailed summary, see `docs/bilingual-implementation.md`.

## Data Model (BFF)

Each ministry item returned by the API has this shape:

- `slug` string
- `date` string or null
- `fields` (raw `ministryFields` from WPGraphQL)
- `section`:
  - `leaf` (most specific section)
  - `top` (parent section slug or leaf slug)
  - `parent` (optional, only on detail)

Section logic lives in `src/lib/sections.ts`:

- If multiple sections are assigned (e.g. Youth + CHISTA), the leaf is the one
  with a parent.
- `section.top` is the parent slug if present, otherwise the leaf slug.

## CMS Data Structure (WordPress + ACF)

Content is managed in WordPress with WPGraphQL enabled and ACF fields on
the `Ministry` content type.

Required ACF fields (bilingual):

- `titleZh` / `titleEn`
- `summaryZh` / `summaryEn`
- `displayOrder` (number, optional)
- `visibility` (string, optional)
- `heroImage` (image, optional)

Taxonomy:

- Each Ministry should be assigned to a `section` term.
- Nested terms are supported: top-level (e.g. `youth`) and leaf (e.g. `chista`).
- The app derives `section.top` from the parent term when present.

## Calendar Events (WordPress First, Local Fallback)

Calendar events are now expected to come from WordPress GraphQL first.
If WP is temporarily unavailable, the app falls back to local mock events in
`src/content/calendar/events.ts`.

Recommended WP setup:

- Create an `Event` custom post type exposed to WPGraphQL (query root: `events`).
- Add ACF group `eventFields` (also exposed to GraphQL) with:
  - `titleZh` / `titleEn`
  - `startAt` / `endAt` (datetime)
  - `time` (optional text override)
  - `location`
  - `coverImage` (optional)

Frontend read path:

- Server data adapter: `src/lib/events.ts`
- Calendar page: `src/app/[locale]/(site)/calendar/page.tsx`
- Calendar UI: `src/components/CalendarPageClient.tsx`

Operational guidance:

- Normal content updates should be done in WP (publish/unpublish/edit Event posts).
- Keep `src/content/calendar/events.ts` as emergency fallback data, not primary content.

## Environment

Create `.env.local`:

```
WP_GRAPHQL_URL=https://your-wordpress-site/graphql
WP_GRAPHQL_TIMEOUT_MS=8000
WP_GRAPHQL_RETRY_COUNT=1
WP_GRAPHQL_RETRY_BACKOFF_MS=300
DONATION_PROVIDER=legacy_wp
DONATION_LEGACY_FORM_URL=https://newbethelrc.org/donations/donation-form/
DONATION_SUPABASE_PORTAL_URL=
SITE_URL=https://your-site-domain.com
```

Notes:

- `WP_GRAPHQL_TIMEOUT_MS`: timeout per WP request in milliseconds.
- `WP_GRAPHQL_RETRY_COUNT`: retry attempts for timeout/network failures (recommended 0-1).
- `WP_GRAPHQL_RETRY_BACKOFF_MS`: linear backoff base milliseconds between retries.
- `DONATION_PROVIDER`: donation provider mode (`legacy_wp` or `supabase_portal`).
- `DONATION_LEGACY_FORM_URL`: fallback donation URL for legacy WP flow.
- `DONATION_SUPABASE_PORTAL_URL`: future Supabase portal URL used when `DONATION_PROVIDER=supabase_portal`.

## Development

```
npm install
npm run dev
```

Open http://localhost:3000 (will redirect to `/zh`).

## Code Layout

- `src/app/layout.tsx` - root layout
- `src/app/[locale]/layout.tsx` - locale layout + static params
- `src/app/[locale]/(site)/layout.tsx` - site layout wrapper
- `src/app/[locale]/(site)/page.tsx` - home page
- `src/app/[locale]/(site)/ministries/[top]/page.tsx` - list page
- `src/app/[locale]/(site)/ministries/[top]/[slug]/page.tsx` - detail page
- `src/app/api/ministries/route.ts` - list endpoint
- `src/app/api/ministries/[slug]/route.ts` - detail endpoint
- `src/lib/wpgraphql.ts` - WPGraphQL client
- `src/lib/donation` - donation provider adapter layer
- `src/lib/auth` - auth session foundation (Supabase-ready)
- `src/lib/rbac` - role/permission matrix foundation
- `src/lib/i18n` - locale utilities + dictionaries
- `src/lib/sections.ts` - section selection helpers
- `src/content/media.ts` - centralized static media registry (local assets)
- `src/lib/cms-media.ts` - CMS/remote image URL normalization helper
- `src/components/AppImage.tsx` - wrapper for rendering static media keys via `next/image`

## Notes

- Default locale is `zh`.
- Fixed UI text comes from i18n dictionaries.
- Dynamic ACF content uses `titleZh/titleEn` and `summaryZh/summaryEn`.
