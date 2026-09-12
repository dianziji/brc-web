/**
 * Client-side dismissal memory for the featured-campaign popup and banner.
 *
 * Both surfaces store a "dismissed at" timestamp in localStorage, keyed by
 * campaign id, and stay hidden for a configurable number of hours. Storage
 * access is wrapped because Safari private mode and some embedded browsers
 * throw on access.
 */

export type CampaignSurface = "popup" | "banner";

export const CAMPAIGN_HTML_ATTRIBUTE = "data-campaign-banner";

export function campaignStorageKey(surface: CampaignSurface, campaignId: string): string {
  return `brc.campaign.${surface}.${campaignId}`;
}

export function isCampaignDismissed(surface: CampaignSurface, campaignId: string, snoozeHours: number): boolean {
  try {
    const raw = window.localStorage.getItem(campaignStorageKey(surface, campaignId));
    if (!raw) return false;
    const dismissedAt = Number(raw);
    if (!Number.isFinite(dismissedAt)) return false;
    return Date.now() - dismissedAt < snoozeHours * 60 * 60 * 1000;
  } catch {
    return false;
  }
}

export function markCampaignDismissed(surface: CampaignSurface, campaignId: string): void {
  try {
    window.localStorage.setItem(campaignStorageKey(surface, campaignId), String(Date.now()));
  } catch {
    // Storage unavailable: the surface simply reappears on the next visit.
  }
}

/**
 * Inline script (runs before first paint) that flips the html attribute the
 * banner CSS keys off, so a dismissed banner never flashes and body padding is
 * correct from the first frame. Kept as a string so it can be injected via
 * dangerouslySetInnerHTML from a server component.
 */
export function campaignBannerBootScript(campaignId: string, snoozeHours: number): string {
  const key = campaignStorageKey("banner", campaignId);
  const snoozeMs = snoozeHours * 60 * 60 * 1000;
  return (
    `(function(){try{var v=localStorage.getItem(${JSON.stringify(key)});` +
    `var d=v&&Date.now()-Number(v)<${snoozeMs};` +
    `document.documentElement.setAttribute(${JSON.stringify(CAMPAIGN_HTML_ATTRIBUTE)},d?"dismissed":"active");}` +
    `catch(e){document.documentElement.setAttribute(${JSON.stringify(CAMPAIGN_HTML_ATTRIBUTE)},"active");}})();`
  );
}
