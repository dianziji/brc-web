import "server-only";
import { unstable_cache } from "next/cache";
import type { CalendarEventItem } from "@/content/calendar/events";
import {
  featuredCampaignSettings,
  normalizeCampaignTone,
  type FeaturedCampaignTone,
} from "@/content/home/featured-campaign";
import { getAllEventsSafeResult, isArchivedEvent } from "@/lib/events";
import { htmlToPlainText } from "@/lib/html-text";
import type { Locale } from "@/lib/i18n";
import { wpgraphql } from "@/lib/wpgraphql";

/** Fixed UI strings from `messages.campaign` (kept as a parameter so this module stays free of JSON imports). */
export type CampaignLabels = {
  eyebrow: string;
  defaultTag: string;
};

/*
 * Data source: the "Event Featured Campaign" ACF field group on the Event post
 * type (GraphQL field `eventCampaign`). Only `featuredCampaign` is required in
 * the CMS; every other field has a fallback derived from the event itself.
 * Until that field group exists in WordPress the query fails, which is treated
 * as "no featured campaign" so the rest of the site is unaffected.
 */

const CAMPAIGN_REVALIDATE_SECONDS = 60;

const FEATURED_CAMPAIGN_QUERY = /* GraphQL */ `
query FeaturedCampaignEvents($first: Int!) {
  events(first: $first) {
    nodes {
      slug
      status
      date
      eventCampaign {
        featuredCampaign
        campaignTone
        campaignTagZh
        campaignTagEn
        campaignBannerZh
        campaignBannerEn
        campaignBlurbZh
        campaignBlurbEn
        campaignHighlightsZh
        campaignHighlightsEn
        campaignLearnMoreUrl
      }
    }
  }
}
`;

export type EventCampaignFields = {
  featuredCampaign?: boolean | null;
  campaignTone?: string | string[] | null;
  campaignTagZh?: string | null;
  campaignTagEn?: string | null;
  campaignBannerZh?: string | null;
  campaignBannerEn?: string | null;
  campaignBlurbZh?: string | null;
  campaignBlurbEn?: string | null;
  campaignHighlightsZh?: string | null;
  campaignHighlightsEn?: string | null;
  campaignLearnMoreUrl?: string | null;
};

export type FeaturedCampaignNode = {
  slug?: string | null;
  status?: string | null;
  /** WordPress publish date, e.g. "2026-08-31T19:00:44". */
  date?: string | null;
  eventCampaign?: EventCampaignFields | null;
};

type FeaturedCampaignGQL = { events: { nodes: FeaturedCampaignNode[] } };

/** Everything the client banner needs. Kept small because it ships on every page. */
export type CampaignBannerModel = {
  id: string;
  tone: FeaturedCampaignTone;
  tag: string;
  message: string;
  href: string;
  snoozeHours: number;
};

/** Everything the client popup needs. Only rendered on the home page. */
export type CampaignPopupModel = {
  id: string;
  tone: FeaturedCampaignTone;
  eyebrow: string;
  title: string;
  subtitle: string | null;
  summary: string;
  highlights: string[];
  posterSrc: string;
  posterFallbackSrc: string;
  posterAlt: string;
  learnMoreHref: string;
  donateHref: string;
  snoozeHours: number;
};

export type FeaturedCampaign = {
  event: CalendarEventItem;
  fields: EventCampaignFields;
  publishedAt: string;
};

function isTruthyFlag(value: unknown): boolean {
  if (value === true || value === 1) return true;
  if (typeof value === "string") return ["1", "true", "yes", "on"].includes(value.trim().toLowerCase());
  return false;
}

/**
 * Pure selection rule (unit-tested): among published, non-archived events with
 * the flag on, the most recently published wins. Returns null when none match.
 */
export function pickFeaturedCampaign(nodes: FeaturedCampaignNode[], events: CalendarEventItem[]): FeaturedCampaign | null {
  const eventsBySlug = new Map(events.map((event) => [event.id.toLowerCase(), event]));
  const candidates: FeaturedCampaign[] = [];

  for (const node of nodes) {
    if (!node.slug || !node.eventCampaign || !isTruthyFlag(node.eventCampaign.featuredCampaign)) continue;
    if (node.status && node.status.toLowerCase() !== "publish") continue;
    const event = eventsBySlug.get(node.slug.toLowerCase());
    if (!event) continue;
    if (isArchivedEvent(event)) continue;
    candidates.push({ event, fields: node.eventCampaign, publishedAt: node.date ?? "" });
  }

  if (candidates.length === 0) return null;
  candidates.sort((a, b) => {
    const byDate = b.publishedAt.localeCompare(a.publishedAt);
    if (byDate !== 0) return byDate;
    return a.event.id.localeCompare(b.event.id);
  });
  return candidates[0];
}

async function fetchFeaturedCampaignNodes(): Promise<FeaturedCampaignNode[] | null> {
  try {
    const data = await wpgraphql<FeaturedCampaignGQL>(
      FEATURED_CAMPAIGN_QUERY,
      { first: 100 },
      { revalidate: CAMPAIGN_REVALIDATE_SECONDS, label: "wpgraphql:featured-campaign" }
    );
    return data.events?.nodes ?? [];
  } catch (error) {
    // Most likely the ACF group is not (yet) exposed in GraphQL. Degrade to "no campaign".
    console.warn(`[featured-campaign] query failed; hiding popup/banner: ${(error as Error)?.message ?? error}`);
    return null;
  }
}

const getFeaturedCampaignNodesCached = unstable_cache(fetchFeaturedCampaignNodes, ["featured-campaign:nodes:v1"], {
  revalidate: CAMPAIGN_REVALIDATE_SECONDS,
  tags: ["events", "featured-campaign"],
});

export async function getFeaturedCampaign(): Promise<FeaturedCampaign | null> {
  const [nodes, eventsResult] = await Promise.all([getFeaturedCampaignNodesCached(), getAllEventsSafeResult()]);
  if (!nodes || nodes.length === 0) return null;
  return pickFeaturedCampaign(nodes, eventsResult.items);
}

/* ---------- view models ---------- */

function text(value: unknown): string | undefined {
  if (typeof value !== "string") return undefined;
  const trimmed = value.trim();
  return trimmed ? trimmed : undefined;
}

function localized(locale: Locale, zh: unknown, en: unknown): string | undefined {
  const zhText = text(zh);
  const enText = text(en);
  return locale === "en" ? enText || zhText : zhText || enText;
}

function resolveHref(locale: Locale, href: string): string {
  if (/^https?:\/\//i.test(href)) return href;
  const path = href.startsWith("/") ? href : `/${href}`;
  return path === "/" ? `/${locale}` : `/${locale}${path}`;
}

/** Lines of a textarea → list items (blank lines and leading bullets dropped). */
export function splitHighlights(value: unknown): string[] {
  const raw = text(value);
  if (!raw) return [];
  return raw
    .split(/\r?\n/)
    .map((line) => line.replace(/^\s*(?:[-*•·]|\d+[.)])\s*/, "").trim())
    .filter((line) => line.length > 0)
    .slice(0, 4);
}

/** First paragraph of an HTML summary, trimmed to a sentence boundary near `maxChars`. */
export function summaryToBlurb(html: string | undefined, maxChars: number): string {
  if (!html) return "";
  const firstParagraph = html.split(/<\/p>/i)[0] ?? html;
  const plain = htmlToPlainText(firstParagraph);
  if (plain.length <= maxChars) return plain;
  const cut = plain.slice(0, maxChars);
  const lastStop = Math.max(cut.lastIndexOf("。"), cut.lastIndexOf("."), cut.lastIndexOf("！"), cut.lastIndexOf("!"));
  if (lastStop >= maxChars * 0.4) return cut.slice(0, lastStop + 1);
  return `${cut.trimEnd()}…`;
}

export function toCampaignBannerModel(campaign: FeaturedCampaign, locale: Locale, labels: CampaignLabels): CampaignBannerModel {
  const { event, fields } = campaign;
  const title = locale === "en" ? event.titleEn : event.titleZh;
  const learnMore = text(fields.campaignLearnMoreUrl) ?? `/events/${event.id}`;
  return {
    id: `event:${event.id}`,
    tone: normalizeCampaignTone(fields.campaignTone),
    tag: localized(locale, fields.campaignTagZh, fields.campaignTagEn) ?? labels.defaultTag,
    message: localized(locale, fields.campaignBannerZh, fields.campaignBannerEn) ?? title,
    href: resolveHref(locale, learnMore),
    snoozeHours: featuredCampaignSettings.bannerSnoozeHours,
  };
}

export function toCampaignPopupModel(campaign: FeaturedCampaign, locale: Locale, labels: CampaignLabels): CampaignPopupModel {
  const { event, fields } = campaign;
  const title = locale === "en" ? event.titleEn : event.titleZh;
  const otherTitle = locale === "en" ? event.titleZh : event.titleEn;
  const summaryHtml = locale === "en" ? event.summaryEn : event.summaryZh;
  const donate = event.donationLink ?? "/donation";
  const eventDetail = `/events/${event.id}`;
  // Two buttons to the same page are pointless: if 了解更多 would duplicate the
  // donate link, send it to the event detail page instead.
  let learnMore = text(fields.campaignLearnMoreUrl) ?? eventDetail;
  if (resolveHref(locale, learnMore) === resolveHref(locale, donate)) learnMore = eventDetail;
  const posterSrc = event.image && event.image !== "/assets/images/hero.jpeg" ? event.image : featuredCampaignSettings.posterFallbackSrc;

  return {
    id: `event:${event.id}`,
    tone: normalizeCampaignTone(fields.campaignTone),
    eyebrow: labels.eyebrow,
    title,
    subtitle: otherTitle && otherTitle !== title ? otherTitle : null,
    summary:
      localized(locale, fields.campaignBlurbZh, fields.campaignBlurbEn) ??
      summaryToBlurb(summaryHtml, featuredCampaignSettings.blurbMaxChars[locale]),
    highlights: splitHighlights(locale === "en" ? fields.campaignHighlightsEn || fields.campaignHighlightsZh : fields.campaignHighlightsZh || fields.campaignHighlightsEn),
    posterSrc,
    posterFallbackSrc: featuredCampaignSettings.posterFallbackSrc,
    posterAlt: title,
    learnMoreHref: resolveHref(locale, learnMore),
    donateHref: resolveHref(locale, donate),
    snoozeHours: featuredCampaignSettings.popupSnoozeHours,
  };
}

export async function getFeaturedCampaignBanner(locale: Locale, labels: CampaignLabels): Promise<CampaignBannerModel | null> {
  const campaign = await getFeaturedCampaign();
  return campaign ? toCampaignBannerModel(campaign, locale, labels) : null;
}

export async function getFeaturedCampaignPopup(locale: Locale, labels: CampaignLabels): Promise<CampaignPopupModel | null> {
  const campaign = await getFeaturedCampaign();
  return campaign ? toCampaignPopupModel(campaign, locale, labels) : null;
}
