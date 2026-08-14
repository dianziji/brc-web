"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import type { EventFilterId, NewsStatus } from "@/lib/news";

export type PanelEvent = {
  id: string;
  title: string;
  href: string;
  image: string;
  status: NewsStatus;
  badgeLabel: string;
  /** "07/01 – 09/30 · 線上 + 實體" — the flat card folds date into this line. */
  meta: string;
  /** YYYY-MM-DD, used to place the event on the month grid. */
  date: string;
  endDate?: string;
};

export type PanelWeekly = {
  id: string;
  cadence: string;
  weekday?: number;
  time: string;
  title: string;
  location: string;
};

export type EventsPanelLabels = {
  filters: { id: EventFilterId; label: string }[];
  gridView: string;
  calendarView: string;
  weeklyHeading: string;
  weekdayNames: string[];
  monthLabel: string;
  legendEvent: string;
  legendWeekly: string;
  legendCourse: string;
  emptyLabel: string;
  selectedDateLabel: string;
  dayEmptyLabel: string;
};

type EventsPanelProps = {
  events: PanelEvent[];
  weekly: PanelWeekly[];
  labels: EventsPanelLabels;
  /** Injected so the server and client agree on "today" across the hydration boundary. */
  today: string;
  /** Rendered beside the view toggle, e.g. the event-archive link. */
  trailingLink?: { label: string; href: string };
  /** The weekly strip's single CTA — points at the prayer page, which owns
   *  the full gathering details (times, Zoom links, contacts). */
  weeklyLink: { label: string; href: string };
};

/** Runs longer than this are marked at their edges only, not filled in. */
const RUN_EXPAND_MAX_DAYS = 7;

function parseKey(key: string): { year: number; month: number; day: number } | null {
  const matched = key.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (!matched) return null;
  return { year: Number(matched[1]), month: Number(matched[2]), day: Number(matched[3]) };
}

export default function EventsPanel({ events, weekly, labels, today, trailingLink, weeklyLink }: EventsPanelProps) {
  const [filter, setFilter] = useState<EventFilterId>("all");
  const [view, setView] = useState<"grid" | "calendar">("grid");
  const [selectedDay, setSelectedDay] = useState<number | null>(null);

  const visibleEvents = useMemo(() => {
    if (filter === "all") return events;
    if (filter === "registering") {
      return events.filter((item) => item.status === "registering" || item.status === "ongoing");
    }
    return events.filter((item) => item.status === "ended");
  }, [events, filter]);

  const showWeekly = filter === "all";

  const month = useMemo(() => {
    const parsed = parseKey(today);
    if (!parsed) return null;
    const { year, month: monthNumber } = parsed;
    const first = new Date(year, monthNumber - 1, 1);
    const daysInMonth = new Date(year, monthNumber, 0).getDate();
    // Sunday-first grid, matching calendar.weekDays and the existing calendar page.
    const leading = first.getDay();

    type DayEntry = { kinds: Set<string>; items: { title: string; meta: string; href?: string }[] };
    const marks = new Map<number, DayEntry>();
    const addMark = (day: number, kind: string, item?: DayEntry["items"][number]) => {
      const entry = marks.get(day) ?? { kinds: new Set<string>(), items: [] };
      entry.kinds.add(kind);
      if (item && !entry.items.some((existing) => existing.title === item.title)) entry.items.push(item);
      marks.set(day, entry);
    };

    for (const event of events) {
      const start = parseKey(event.date);
      const end = event.endDate ? parseKey(event.endDate) : null;
      if (start && start.year === year && start.month === monthNumber) {
        addMark(start.day, "event", { title: event.title, meta: event.meta, href: event.href });
      }
      if (start && end) {
        const from = new Date(start.year, start.month - 1, start.day);
        const to = new Date(end.year, end.month - 1, end.day);
        const spanDays = Math.round((to.getTime() - from.getTime()) / 86_400_000) + 1;
        const inThisMonth = (date: Date) => date.getFullYear() === year && date.getMonth() + 1 === monthNumber;

        if (spanDays <= RUN_EXPAND_MAX_DAYS) {
          // A retreat or camp: every day it covers really is an event day.
          for (let cursor = new Date(from); cursor <= to; cursor.setDate(cursor.getDate() + 1)) {
            if (inThisMonth(cursor)) {
              addMark(cursor.getDate(), "course", { title: event.title, meta: event.meta, href: event.href });
            }
          }
        } else {
          // A months-long course has no single "on" day — filling every cell
          // would mark the whole month and tell the visitor nothing. Its start
          // and end are the dates that actually matter.
          for (const edge of [from, to]) {
            if (inThisMonth(edge)) {
              addMark(edge.getDate(), "course", { title: event.title, meta: event.meta, href: event.href });
            }
          }
        }
      }
    }

    for (const meeting of weekly) {
      if (meeting.weekday === undefined) continue;
      for (let day = 1; day <= daysInMonth; day += 1) {
        if (new Date(year, monthNumber - 1, day).getDay() === meeting.weekday) {
          addMark(day, "weekly", {
            title: meeting.title,
            meta: [meeting.cadence, meeting.time, meeting.location].filter(Boolean).join(" · "),
          });
        }
      }
    }

    return { year, monthNumber, daysInMonth, leading, marks, todayDay: parsed.day };
  }, [events, weekly, today]);

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center gap-3">
        {/* Hidden in calendar view, where they would render but do nothing —
            the month grid does its own sorting via the category dots. */}
        {view === "grid" ? (
          <div className="flex flex-wrap gap-1.5">
            {labels.filters.map((entry) => (
              <button
                key={entry.id}
                type="button"
                className="news-filter focus-ring-token"
                aria-pressed={filter === entry.id}
                onClick={() => setFilter(entry.id)}
              >
                {entry.label}
              </button>
            ))}
          </div>
        ) : null}
        {trailingLink ? (
          <a
            className="text-body-color-token focus-ring-token ml-auto text-sm font-medium underline"
            href={trailingLink.href}
          >
            {trailingLink.label}
          </a>
        ) : null}
        <div className={`news-viewtoggle${trailingLink ? "" : " ml-auto"}`}>
          <button type="button" className="focus-ring-token" aria-pressed={view === "grid"} onClick={() => setView("grid")}>
            {labels.gridView}
          </button>
          <button
            type="button"
            className="focus-ring-token"
            aria-pressed={view === "calendar"}
            onClick={() => setView("calendar")}
          >
            {labels.calendarView}
          </button>
        </div>
      </div>

      {view === "grid" ? (
        <div className="space-y-4">
          {visibleEvents.length > 0 ? (
            <div className="grid gap-3.5 sm:grid-cols-2 lg:grid-cols-3">
              {visibleEvents.map((item) => (
                <a key={item.id} href={item.href} className="card-base card-base-hover flex flex-col overflow-hidden p-0">
                  <div className="news-card-media">
                    <Image src={item.image} alt={item.title} fill sizes="(max-width: 640px) 100vw, 33vw" className="object-cover object-center" />
                    <span className={`news-card-badge news-badge-${item.status}`}>{item.badgeLabel}</span>
                  </div>
                  {/* Deliberately minimal: title + when/where. The summary and
                      everything else live on the event page behind the click. */}
                  <div className="flex flex-1 flex-col gap-1 px-3.5 pb-3.5 pt-3">
                    <h3 className="text-h3-token text-heading-token font-semibold">{item.title}</h3>
                    <p className="text-caption-token text-muted-token">{item.meta}</p>
                  </div>
                </a>
              ))}
            </div>
          ) : null}

          {showWeekly ? (
            /* A signpost, not a listing: names and cadence only. Zoom links,
               passwords, and contacts live on the prayer page — keeping them
               in one place means one edit updates the whole site. */
            <div className="news-weekly">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h3 className="font-display text-h3-token font-semibold">{labels.weeklyHeading}</h3>
                <a className="link-inverse focus-ring-token text-sm" href={weeklyLink.href}>
                  {weeklyLink.label} →
                </a>
              </div>
              <ul className="mt-3 grid list-none gap-1.5 p-0 sm:grid-cols-3">
                {weekly.map((meeting) => (
                  <li key={meeting.id} className="news-weekly-item">
                    <span className="news-weekly-cadence">
                      {meeting.cadence}
                      {meeting.time ? ` ${meeting.time}` : ""}
                    </span>
                    <span className="text-dk-title-token text-sm font-semibold">{meeting.title}</span>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          {visibleEvents.length === 0 && !showWeekly ? (
            <p className="text-body-token text-muted-token py-6 text-center">{labels.emptyLabel}</p>
          ) : null}
        </div>
      ) : null}

      {view === "calendar" && month ? (
        /* Side-by-side on desktop so picking a day never requires scrolling:
           month grid left, that day's events right. Stacks on mobile. */
        <div className="grid items-start gap-3.5 lg:grid-cols-[minmax(0,400px)_minmax(0,1fr)]">
          <div className="card-base p-4">
            <div className="text-h3-token text-heading-token mb-3 font-semibold">{labels.monthLabel}</div>
          <div className="grid grid-cols-7 gap-1.5 text-center">
            {labels.weekdayNames.map((name) => (
              <div key={name} className="text-muted-token py-1 text-[11px]">
                {name}
              </div>
            ))}
            {Array.from({ length: month.leading }).map((_, offset) => (
              <div key={`lead-${offset}`} aria-hidden="true" />
            ))}
            {Array.from({ length: month.daysInMonth }).map((_, offset) => {
              const day = offset + 1;
              const entry = month.marks.get(day);
              const kinds = entry?.kinds;
              return (
                <button
                  key={day}
                  type="button"
                  className="news-cal-day focus-ring-token"
                  data-has={kinds ? "true" : "false"}
                  data-today={day === month.todayDay ? "true" : "false"}
                  data-selected={day === (selectedDay ?? month.todayDay) ? "true" : "false"}
                  aria-pressed={day === (selectedDay ?? month.todayDay)}
                  onClick={() => setSelectedDay(day)}
                >
                  {day}
                  {kinds ? (
                    <span className="news-cal-dots">
                      {[...kinds].map((kind) => (
                        <i key={kind} className={`news-dot-${kind}`} />
                      ))}
                    </span>
                  ) : null}
                </button>
              );
            })}
          </div>
            <div className="text-caption-token text-muted-token mt-3 flex flex-wrap gap-3 border-t border-[color:var(--border)] pt-3">
              <span className="flex items-center gap-1.5">
                <i className="news-dot-event block h-[7px] w-[7px] rounded-full" />
                {labels.legendEvent}
              </span>
              <span className="flex items-center gap-1.5">
                <i className="news-dot-weekly block h-[7px] w-[7px] rounded-full" />
                {labels.legendWeekly}
              </span>
              <span className="flex items-center gap-1.5">
                <i className="news-dot-course block h-[7px] w-[7px] rounded-full" />
                {labels.legendCourse}
              </span>
            </div>
          </div>

          <div className="card-base p-4">
            <div className="text-caption-token text-muted-token mb-2.5">
              {labels.selectedDateLabel} · {labels.monthLabel} {selectedDay ?? month.todayDay}
            </div>
            {month.marks.get(selectedDay ?? month.todayDay)?.items.length ? (
              <ul className="grid gap-2">
                {month.marks.get(selectedDay ?? month.todayDay)?.items.map((item) => (
                  <li key={item.title}>
                    {item.href ? (
                      <a href={item.href} className="news-day-item focus-ring-token">
                        <span className="text-heading-token text-sm font-semibold">{item.title}</span>
                        <span className="text-caption-token text-muted-token">{item.meta}</span>
                      </a>
                    ) : (
                      <div className="news-day-item">
                        <span className="text-heading-token text-sm font-semibold">{item.title}</span>
                        <span className="text-caption-token text-muted-token">{item.meta}</span>
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-body-token text-muted-token">{labels.dayEmptyLabel}</p>
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
}
