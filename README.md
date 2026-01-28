# BRC Official Website

This repository is the foundation for the BRC official website. It is a Next.js
App Router site with a small BFF layer that reads ministry content from
WPGraphQL and exposes a clean JSON API for the frontend. The structure is meant
to be expanded into a full site (Home, About, Ministries, Trainings, Audio,
Donation, etc.).

Design inspiration: [https://newbethelrc.org/](https://newbethelrc.org/)

## Current Features

- App Router site structure under `src/app`
- BFF API routes for ministry list and detail
- Section resolution logic (top vs leaf) for filtering
- Basic ministries list page and detail page
- Server-side fetching to internal API endpoints

## Routes

Frontend:

- `/ministries/[top]` - list page, filtered by section top
- `/ministries/[top]/[slug]` - detail page with hero image + summary

API (BFF):

- `/api/ministries` - list all ministries
- `/api/ministries?top=youth` - list ministries by top section
- `/api/ministries/[slug]` - single ministry detail
- `/api/nav` - placeholder navigation endpoint (returns empty array)

## Data Model (as used by the BFF)

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

## Environment

Create `.env.local`:

```
WP_GRAPHQL_URL=https://your-wordpress-site/graphql
```

## Development

```
npm install
npm run dev
```

Open http://localhost:3000

## Code Layout

- `src/app/layout.tsx` - root layout
- `src/app/(site)/layout.tsx` - site layout wrapper
- `src/app/(site)/page.tsx` - home placeholder
- `src/app/(site)/ministries/[top]/page.tsx` - list page
- `src/app/(site)/ministries/[top]/[slug]/page.tsx` - detail page
- `src/app/api/ministries/route.ts` - list endpoint
- `src/app/api/ministries/[slug]/route.ts` - detail endpoint
- `src/lib/wpgraphql.ts` - WPGraphQL client
- `src/lib/sections.ts` - section selection helpers

## Next Steps (Suggested)

- Build home page sections to mirror BRC content (hero, ministries, trainings)
- Add global navigation/footer (menu + contact + donation)
- Add content pages (About, Prayer Room, Trainings, Audio, Donation)
- Replace `/api/nav` with real WP menu or a site config
