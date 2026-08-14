import SectionHeader from "@/components/home/SectionHeader";
import EventsPanel, { type EventsPanelLabels, type PanelEvent, type PanelWeekly } from "@/components/news/EventsPanel";
import NewsHeroCarousel, { type NewsHeroSlide } from "@/components/news/NewsHeroCarousel";
import type { CalendarEventItem } from "@/content/calendar/events";
import { weeklyMeetings } from "@/content/news/weekly";
import { htmlToPlainText } from "@/lib/html-text";
import { getMessages, withLocale, type Locale } from "@/lib/i18n";
import { classifyEvents, pickFeatured, todayKey, type EventFilterId, type NewsStatus } from "@/lib/news";

type NewsSectionProps = {
  locale: Locale;
  events: CalendarEventItem[];
  className?: string;
  /** false on the /calendar page, whose heading is visually hidden. */
  showHeader?: boolean;
  /** Rendered beside the view toggle inside the panel. */
  archiveLink?: { label: string; href: string };
};

function dateKey(input?: string | null): string | null {
  const matched = input?.trim().match(/^(\d{4})-(\d{2})-(\d{2})/);
  return matched ? `${matched[1]}-${matched[2]}-${matched[3]}` : null;
}

/** "07/01 – 09/30" for a run, "07/01" for a single day. */
function formatRange(item: CalendarEventItem): string {
  const start = dateKey(item.startAt) ?? item.date;
  const end = dateKey(item.endAt);
  const short = (key: string) => key.slice(5).replace("-", "/");
  if (end && end !== start) return `${short(start)} – ${short(end)}`;
  return short(start);
}

function joinMeta(parts: (string | undefined | null)[]): string {
  return parts.map((part) => part?.trim()).filter((part): part is string => Boolean(part)).join(" · ");
}

/**
 * CMS entries with no time still carry midnight `startAt`/`endAt`, which the
 * normalizer renders as "12:00 AM - 12:00 AM". That is noise, not a time.
 */
function displayTime(time?: string | null): string | null {
  const value = time?.trim();
  if (!value) return null;
  const midnight = /^12:00\s*AM(\s*-\s*12:00\s*AM)?$/i;
  return midnight.test(value) ? null : value;
}

export default function NewsSection({ locale, events, className = "", showHeader = true, archiveLink }: NewsSectionProps) {
  const messages = getMessages(locale);
  const news = messages.home.news;
  const today = todayKey();
  // Recurring gatherings exist in the CMS as dated events, so they otherwise
  // show up twice — once as "ended" (off their publish date) and once in the
  // weekly block. The weekly block is the correct home for them.
  const weeklyIds = new Set(weeklyMeetings.map((meeting) => meeting.id));
  const classified = classifyEvents(events, today).filter(({ item }) => !weeklyIds.has(item.id));

  const pickTitle = (item: CalendarEventItem) => (locale === "en" ? item.titleEn : item.titleZh);
  const pickSummary = (item: CalendarEventItem) =>
    htmlToPlainText((locale === "en" ? item.summaryEn : item.summaryZh) ?? "").trim();

  const slides: NewsHeroSlide[] = pickFeatured(classified).map(({ item, status }) => ({
    id: item.id,
    title: pickTitle(item),
    tag: news.status[status],
    meta: joinMeta([formatRange(item), displayTime(item.time), item.location]),
    summary: pickSummary(item) || undefined,
    ctaLabel: news.statusCta[status],
    href: withLocale(locale, `/events/${item.id}`),
    image: item.image,
  }));

  const panelEvents: PanelEvent[] = classified.map(({ item, status }) => ({
    id: item.id,
    title: pickTitle(item),
    href: withLocale(locale, `/events/${item.id}`),
    image: item.image,
    status,
    badgeLabel: news.status[status],
    meta: joinMeta([formatRange(item), displayTime(item.time), item.location]),
    date: dateKey(item.startAt) ?? item.date,
    endDate: dateKey(item.endAt) ?? undefined,
  }));

  const weekly: PanelWeekly[] = weeklyMeetings.map((meeting) => ({
    id: meeting.id,
    cadence: locale === "en" ? meeting.cadenceEn : meeting.cadenceZh,
    weekday: meeting.weekday,
    time: meeting.time,
    title: locale === "en" ? meeting.titleEn : meeting.titleZh,
    location: locale === "en" ? meeting.locationEn : meeting.locationZh,
  }));

  const filterIds: EventFilterId[] = ["all", "registering", "ended"];
  const monthDate = new Date(`${today}T00:00:00`);
  const monthLabel = news.monthFormat
    .replace("{year}", String(monthDate.getFullYear()))
    .replace(
      "{month}",
      locale === "en"
        ? monthDate.toLocaleDateString("en-US", { month: "long" })
        : String(monthDate.getMonth() + 1),
    );

  const labels: EventsPanelLabels = {
    filters: filterIds.map((id) => ({ id, label: news.filters[id] })),
    gridView: news.gridView,
    calendarView: news.calendarView,
    weeklyHeading: news.weeklyTitle,
    weekdayNames: messages.calendar.weekDays,
    monthLabel,
    legendEvent: news.legend.event,
    legendWeekly: news.legend.weekly,
    legendCourse: news.legend.course,
    emptyLabel: news.empty,
    selectedDateLabel: messages.calendar.selectedDate,
    dayEmptyLabel: messages.calendar.empty,
  };

  const hasContent = slides.length > 0 || panelEvents.length > 0 || weekly.length > 0;
  if (!hasContent) return null;

  return (
    <section className={className} aria-label={news.title}>
      {slides.length > 0 ? (
        <NewsHeroCarousel
          slides={slides}
          previousLabel={news.carousel.previous}
          nextLabel={news.carousel.next}
          slideLabelTemplate={news.carousel.slide}
        />
      ) : null}

      <div className="section-container-medium section-block-tight">
        {showHeader ? (
          <SectionHeader
            title={news.eventsTitle}
            cta={{ label: news.cta, href: withLocale(locale, "/calendar") }}
          />
        ) : null}
        <div className={showHeader ? "mt-5" : ""}>
          <EventsPanel
            events={panelEvents}
            weekly={weekly}
            labels={labels}
            today={today}
            trailingLink={archiveLink}
            weeklyLink={{ label: news.weeklyCta, href: withLocale(locale, "/prayer") }}
          />
        </div>
      </div>
    </section>
  );
}

export type { NewsStatus };
