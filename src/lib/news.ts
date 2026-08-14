import type { CalendarEventItem } from "@/content/calendar/events";

/**
 * Status a visitor actually cares about, derived from dates + lifecycleStatus.
 *
 * The homepage used to filter on `date >= today` alone, which hid everything
 * that had already started (a 3-month course), everything recurring, and every
 * past event worth linking a recap to. These buckets replace that filter.
 */
export type NewsStatus = "registering" | "ongoing" | "upcoming" | "ended";

export type ClassifiedEvent = {
  item: CalendarEventItem;
  status: NewsStatus;
};

function dateKey(input?: string | null): string | null {
  if (!input) return null;
  const matched = input.trim().match(/^(\d{4})-(\d{2})-(\d{2})/);
  return matched ? `${matched[1]}-${matched[2]}-${matched[3]}` : null;
}

export function todayKey(now: Date = new Date()): string {
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, "0");
  const d = String(now.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

export function classifyEvent(item: CalendarEventItem, today: string): NewsStatus {
  const start = dateKey(item.startAt) ?? item.date;
  const end = dateKey(item.endAt) ?? start;

  if (item.lifecycleStatus === "REG_OPEN") return "registering";
  if (start <= today && end >= today) return "ongoing";
  if (start > today) return "upcoming";
  return "ended";
}

/**
 * Deliberate retirement only. `isArchivedEvent` also treats "endAt has passed"
 * as archived, which would hide every recap — but recaps are exactly what the
 * 回顧 filter is for. A past date makes an event ended, not retired.
 */
function isRetired(item: CalendarEventItem, now = Date.now()): boolean {
  if (item.lifecycleStatus === "ARCHIVED") return true;
  const archiveAt = item.archiveAt ? Date.parse(item.archiveAt) : NaN;
  return Number.isFinite(archiveAt) && archiveAt <= now;
}

const STATUS_RANK: Record<NewsStatus, number> = {
  registering: 0,
  ongoing: 1,
  upcoming: 2,
  ended: 3,
};

/**
 * Order for both the carousel and the grid: what a visitor can still act on
 * first, then what is happening, then what is coming, then recaps (newest first).
 */
export function classifyEvents(items: CalendarEventItem[], today = todayKey()): ClassifiedEvent[] {
  return items
    .filter((item) => !isRetired(item))
    .map((item) => ({ item, status: classifyEvent(item, today) }))
    .sort((a, b) => {
      const rank = STATUS_RANK[a.status] - STATUS_RANK[b.status];
      if (rank !== 0) return rank;
      // Upcoming: soonest first. Everything else: most recent first.
      const soonestFirst = a.status === "upcoming" && b.status === "upcoming";
      return soonestFirst ? a.item.date.localeCompare(b.item.date) : b.item.date.localeCompare(a.item.date);
    });
}

/**
 * Slides for the hero carousel. The hero is promotion, so only things a
 * visitor can still act on qualify — an ended event on the front banner
 * advertises something nobody can join. Recaps live in the grid instead.
 * Capped, because a carousel past ~4 slides is unread. When this leaves a
 * single slide, the carousel renders it as a static featured banner (no
 * autoplay, no arrows). Once the CMS gains `featured`/`audience` fields,
 * eligibility becomes an editorial flag instead of this heuristic.
 */
export function pickFeatured(classified: ClassifiedEvent[], limit = 4): ClassifiedEvent[] {
  return classified
    .filter((entry) => entry.status !== "ended" && Boolean(entry.item.image))
    .slice(0, limit);
}

export type EventFilterId = "all" | "registering" | "ended";

export function matchesFilter(status: NewsStatus, filter: EventFilterId): boolean {
  if (filter === "all") return true;
  if (filter === "registering") return status === "registering" || status === "ongoing";
  return status === "ended";
}
