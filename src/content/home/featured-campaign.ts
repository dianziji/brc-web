/**
 * Featured campaign = the single most important ministry we want every
 * visitor to notice right now. It drives two surfaces:
 *
 *   1. A dismissable popup shown once on the home page (poster + summary +
 *      "learn more" + "donate").
 *   2. A dismissable, high-contrast banner rendered above the site header.
 *
 * WHICH campaign shows is decided in the CMS, not here: any Event whose
 * "Featured Campaign" ACF group has `featuredCampaign` switched on is a
 * candidate; the most recently *published* one wins; none → nothing shows.
 * See `src/lib/featured-campaign.ts` and
 * `docs/featured-campaign-popup-banner-2026-09-11.md`.
 *
 * This file only holds site-wide presentation settings.
 */

export type FeaturedCampaignTone = "gold" | "crimson" | "forest";

export const FEATURED_CAMPAIGN_TONES: readonly FeaturedCampaignTone[] = ["gold", "crimson", "forest"];

export const featuredCampaignSettings = {
  /** How long the popup stays hidden after being closed. */
  popupSnoozeHours: 1,
  /** How long the banner stays hidden after being closed. */
  bannerSnoozeHours: 6,
  /** Used when the event has no cover image, or the CMS image fails to load. */
  posterFallbackSrc: "/assets/images/donate.jpeg",
  /** Banner/popup accent when the event does not set `campaignTone`. */
  defaultTone: "gold" as FeaturedCampaignTone,
  /** Max characters of the auto-generated popup blurb (from the event summary). */
  blurbMaxChars: { zh: 120, en: 220 },
} as const;

export function normalizeCampaignTone(value: unknown): FeaturedCampaignTone {
  // WPGraphQL for ACF returns select fields as a list even when single-valued.
  if (Array.isArray(value)) return normalizeCampaignTone(value[0]);
  if (typeof value === "string") {
    const normalized = value.trim().toLowerCase() as FeaturedCampaignTone;
    if (FEATURED_CAMPAIGN_TONES.includes(normalized)) return normalized;
  }
  return featuredCampaignSettings.defaultTone;
}
