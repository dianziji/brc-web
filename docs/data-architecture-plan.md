# Data Architecture Plan (WP + New DB Split)

## Goal
Move off local JSON for archive data, keep content governance in WordPress, and enable a future learning platform with robust RBAC and scalable data.

## Decision Summary
- **WordPress (WP)** remains the single source of truth for content-heavy areas (ministries, archive, events, news).
- **New database** is introduced for product-like features (trainings/learning platform) that require RBAC, progress tracking, and transactions.

## Why This Split
### Keep in WP (content + editorial workflow)
- Ministries and archive content
- Event highlights / testimonials
- Public-facing static content

Benefits:
- Existing editorial workflow and approvals remain intact
- Low operational overhead
- Fast iteration on content

### Move to New DB (product + RBAC)
- Trainings / courses / lessons
- Enrollment, progress, quizzes, certificates
- User roles, permissions, access control

Benefits:
- RBAC is easier and safer to implement
- Better performance for product features
- Easier to build Coursera-like flows

## Data Model (WP)
Create a custom post type (CPT) for archive items, e.g. `archive_ministry`, using ACF fields:
- `titleZh`, `titleEn`
- `summaryZh`, `summaryEn`
- `categoryZh`, `categoryEn`
- `subcategoryZh`, `subcategoryEn`
- `country` (array)
- `region` (optional)
- `dateStart`, `dateEnd`
- `status` (`ongoing` | `ended` | `archived`)
- `image`, `gallery`, `link`
- `featured` (bool), `priority` (int)

### Auto-Archive Rule (WP)
Rule: if `dateEnd < today`, set `status = archived`.
Implementation options:
- WP cron job (daily)
- `save_post` hook (on edit)

## Data Model (New DB)
Recommended tables for training platform:
- `users` (auth identity)
- `roles` (admin, editor, student)
- `user_roles` (many-to-many)
- `courses`, `lessons`, `modules`
- `enrollments`, `progress`, `certificates`
- `payments` (if needed)

## API Contract
### Archive (WPGraphQL)
Query archive items by `status = archived` and sort by `dateEnd desc`.
Return:
- bilingual fields (zh/en)
- country list for map

### Trainings (New DB API)
Expose:
- course list (public)
- lesson detail (auth)
- enrollment and progress (auth + RBAC)

## Sync Strategy
- No sync needed for ministries/archives (WP is source of truth).
- No sync needed for trainings (DB is source of truth).
Only shared data is branding/UI, which stays in the Next.js frontend.

## Migration Plan
Phase 1 (Now):
- Move archive data into WP CPT + ACF
- Update archive page to query WPGraphQL
- Set up auto-archive rule

Phase 2 (Training Platform):
- Add new DB (Supabase/Neon/PlanetScale)
- Implement RBAC + course data
- Build training UI and APIs

Phase 3 (Enhancements):
- Map highlights driven by `country` field
- Admin dashboard for analytics

## Performance
WP:
- ISR with `revalidate` (already in place)
- Cache WPGraphQL responses

New DB:
- Use read replicas or edge caching if needed
- Role-based data fetch with per-user caching

## Cost Considerations
- WP hosting unchanged
- New DB: start on free tier, scale if usage grows

## Risks / Mitigations
- Two systems increase maintenance; keep responsibilities clearly split.
- Avoid data mismatch by enforcing ownership (WP for content, DB for product).
- Keep RBAC only in training platform.

## Next Implementation Steps
1. Define CPT + ACF fields in WP
2. Build WPGraphQL query for archive page
3. Implement auto-archive cron/hook
4. Replace `ministryArchive.json` with WP data fetch
5. Plan training DB schema and auth strategy
