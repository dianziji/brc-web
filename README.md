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
- `src/middleware.ts` redirects missing locale paths to `/zh` and stores
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

## Environment

Create `.env.local`:

```
WP_GRAPHQL_URL=https://your-wordpress-site/graphql
SITE_URL=https://your-site-domain.com
```

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
- `src/lib/i18n` - locale utilities + dictionaries
- `src/lib/sections.ts` - section selection helpers

## Notes

- Default locale is `zh`.
- Fixed UI text comes from i18n dictionaries.
- Dynamic ACF content uses `titleZh/titleEn` and `summaryZh/summaryEn`.
