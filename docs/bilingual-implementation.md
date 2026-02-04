# Bilingual Implementation Summary (ZH/EN)

This document summarizes how bilingual support is implemented in this app.

## 1) Locale Routing
- Locale-based routes are implemented with `/[locale]` (e.g. `/zh`, `/en`).
- All site pages live under `src/app/[locale]/(site)/...`.
- `generateStaticParams()` prebuilds both `zh` and `en`.

## 2) Automatic Locale Redirect
- `src/middleware.ts` checks if a locale prefix exists.
- Missing locale prefixes redirect to `/zh` (default).
- The middleware stores `NEXT_LOCALE` in cookies for consistent language state.

## 3) i18n for Fixed Content
- Dictionaries live in:
  - `src/lib/i18n/messages/zh.json`
  - `src/lib/i18n/messages/en.json`
- Fixed UI text (Header/Footer/Home/About/etc.) reads from these dictionaries.

## 4) Language Switch in Header
- Header uses current pathname to preserve the route.
- Switching toggles between `/zh/...` and `/en/...`.
- All internal links include the locale prefix to stay in the chosen language.

## 5) ACF Dual-Language Fields
- Dynamic content (ministries) pulls from ACF fields:
  - `titleZh` / `titleEn`
  - `summaryZh` / `summaryEn`
- `pickLocalized()` selects the correct value based on locale with fallback.

## 6) Performance Strategy
- No runtime translation or external translation API.
- ISR caching still used (`revalidate: 60`) for stable response time.

## 7) HTML Lang Attribute
- Root layout sets `<html lang>` based on `NEXT_LOCALE` cookie.

---
If you expand bilingual coverage later, continue adding strings to the JSON
messages and use `pickLocalized()` for any CMS fields that have ZH/EN values.
