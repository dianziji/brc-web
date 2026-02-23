"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import type { CalendarEventItem } from "@/content/calendar/events";
import { withLocale, type Locale, type Messages } from "@/lib/i18n";

type CalendarPageClientProps = {
  locale: Locale;
  messages: Messages["calendar"];
  events: CalendarEventItem[];
  degraded: boolean;
  degradedTitle: string;
  degradedBody: string;
  retryLabel: string;
  retryHref: string;
};

function toDateKey(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function parseDateKey(dateKey: string): Date | null {
  const matched = dateKey.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (!matched) return null;
  const y = Number(matched[1]);
  const m = Number(matched[2]);
  const d = Number(matched[3]);
  if (!Number.isInteger(y) || !Number.isInteger(m) || !Number.isInteger(d)) return null;
  if (m < 1 || m > 12 || d < 1 || d > 31) return null;
  return new Date(y, m - 1, d);
}

function formatDateLabel(dateKey: string, locale: Locale): string {
  const date = parseDateKey(dateKey);
  if (!date) return dateKey;
  return date.toLocaleDateString(locale === "en" ? "en-US" : "zh-TW", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function withQueryParams(path: string, params: Record<string, string | undefined>): string {
  const [base, search] = path.split("?");
  const query = new URLSearchParams(search || "");

  for (const [key, value] of Object.entries(params)) {
    if (!value) continue;
    query.set(key, value);
  }

  const nextQuery = query.toString();
  return nextQuery ? `${base}?${nextQuery}` : base;
}

function resolveDonationHref(event: CalendarEventItem, locale: Locale): string {
  const fallback = withQueryParams(withLocale(locale, "/donation"), {
    eventSlug: event.id,
    purposeCode: event.donationPurposeCode,
    source: "calendar",
  });
  const raw = event.donationLink?.trim();
  if (!raw) return fallback;
  if (/^https?:\/\//i.test(raw)) return raw;
  if (raw.startsWith("/zh/") || raw.startsWith("/en/")) {
    return withQueryParams(raw, {
      eventSlug: event.id,
      purposeCode: event.donationPurposeCode,
      source: "calendar",
    });
  }
  if (raw.startsWith("/")) {
    return withQueryParams(withLocale(locale, raw), {
      eventSlug: event.id,
      purposeCode: event.donationPurposeCode,
      source: "calendar",
    });
  }
  return raw;
}

export default function CalendarPageClient({
  locale,
  messages,
  events,
  degraded,
  degradedTitle,
  degradedBody,
  retryLabel,
  retryHref,
}: CalendarPageClientProps) {
  const [currentMonth, setCurrentMonth] = useState(() => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), 1);
  });
  const [selectedDate, setSelectedDate] = useState(() => toDateKey(new Date()));
  const [slideIndex, setSlideIndex] = useState(0);
  const todayKey = useMemo(() => toDateKey(new Date()), []);

  const upcoming = useMemo(() => {
    return events.filter((event) => event.date >= todayKey).sort((a, b) => a.date.localeCompare(b.date));
  }, [events, todayKey]);

  const slidePool = useMemo(() => (upcoming.length > 0 ? upcoming : events), [events, upcoming]);
  const activeSlideIndex = slidePool.length > 0 ? slideIndex % slidePool.length : 0;

  useEffect(() => {
    if (slidePool.length <= 1) return;
    const id = window.setInterval(() => {
      setSlideIndex((prev) => (prev + 1) % slidePool.length);
    }, 5000);
    return () => window.clearInterval(id);
  }, [slidePool.length]);

  const activeSlide = slidePool[activeSlideIndex] ?? null;
  const activeTitle = activeSlide ? (locale === "en" ? activeSlide.titleEn : activeSlide.titleZh) : "";
  const activeSubtitle = activeSlide ? (locale === "en" ? activeSlide.titleZh : activeSlide.titleEn) : "";

  const calendarDays = useMemo(() => {
    const firstDayIndex = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1).getDay();
    const daysInMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate();
    const cells: Array<{ date: Date | null; key: string }> = [];

    for (let i = 0; i < firstDayIndex; i += 1) {
      cells.push({ date: null, key: `empty-${i}` });
    }
    for (let day = 1; day <= daysInMonth; day += 1) {
      const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
      cells.push({ date, key: toDateKey(date) });
    }
    return cells;
  }, [currentMonth]);

  const selectedEvents = events.filter((event) => event.date === selectedDate);
  const selectedDateLabel = formatDateLabel(selectedDate, locale);

  return (
    <main className="mx-auto max-w-6xl px-6 pb-12 pt-36 md:pt-32">
      <div className="space-y-12">
        {degraded ? (
          <section className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-amber-900">
            <h2 className="text-base font-semibold">{degradedTitle}</h2>
            <p className="mt-1 text-sm">{degradedBody}</p>
            <a className="mt-3 inline-flex text-sm font-medium underline" href={retryHref}>
              {retryLabel}
            </a>
          </section>
        ) : null}

        <section className="space-y-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h1 className="text-3xl font-semibold">{messages.title}</h1>
              <p className="mt-2 text-sm text-zinc-600">{messages.desc}</p>
            </div>
            <Link className="inline-flex text-sm font-medium text-zinc-700 underline" href={withLocale(locale, "/events/archive")}>
              {messages.viewArchive}
            </Link>
          </div>

          <div className="relative overflow-hidden rounded-2xl border bg-zinc-900 text-white">
            <div className="relative h-[260px] w-full sm:h-[320px] md:h-[360px]">
              {activeSlide ? (
                <>
                  <Image src={activeSlide.image} alt={activeTitle} fill className="object-cover object-center" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                </>
              ) : (
                <div className="absolute inset-0 bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-700" />
              )}
            </div>
            <div className="absolute inset-x-4 bottom-4 space-y-1.5 sm:inset-x-6 sm:bottom-6 sm:space-y-2">
              {activeSlide ? (
                <>
                  <div className="text-lg font-semibold sm:text-2xl">{activeTitle}</div>
                  <div className="text-sm text-zinc-200">{activeSubtitle}</div>
                  <div className="text-sm text-zinc-300">
                    {[activeSlide.date, activeSlide.time, activeSlide.location].filter((item) => item.length > 0).join(" · ")}
                  </div>
                  <div className="flex flex-wrap gap-2 pt-2">
                    <Link
                      href={withLocale(locale, `/events/${activeSlide.id}`)}
                      className="inline-flex rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-zinc-900"
                    >
                      {messages.detailsCta}
                    </Link>
                    {activeSlide.registrationUrl ? (
                      <a
                        href={activeSlide.registrationUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex rounded-full border border-white/60 px-3 py-1.5 text-xs font-semibold text-white"
                      >
                        {messages.registerCta}
                      </a>
                    ) : null}
                    <a
                      href={resolveDonationHref(activeSlide, locale)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex rounded-full border border-white/60 px-3 py-1.5 text-xs font-semibold text-white"
                    >
                      {messages.donateCta}
                    </a>
                  </div>
                </>
              ) : (
                <div className="text-sm text-zinc-200">{messages.empty}</div>
              )}
            </div>
            {slidePool.length > 1 ? (
              <div className="absolute right-3 top-3 flex items-center gap-1.5 sm:right-6 sm:top-6 sm:gap-2">
                {slidePool.map((event, index) => (
                  <button
                    key={event.id}
                    aria-label={`Go to slide ${index + 1}`}
                    onClick={() => setSlideIndex(index)}
                    className="inline-flex h-8 w-8 items-center justify-center sm:h-6 sm:w-6"
                  >
                    <span
                      className={`h-2 w-2 rounded-full transition ${
                        index === activeSlideIndex ? "bg-white" : "bg-white/40"
                      }`}
                    />
                  </button>
                ))}
              </div>
            ) : null}
          </div>
        </section>

        <section className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-2xl border border-zinc-200 bg-white p-6">
            <div className="flex items-center justify-between">
              <button
                className="inline-flex min-h-11 items-center text-sm text-zinc-600 hover:text-zinc-900"
                onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1))}
              >
                {messages.prev}
              </button>
              <div className="text-lg font-semibold">
                {currentMonth.toLocaleDateString(locale === "en" ? "en-US" : "zh-TW", { month: "long", year: "numeric" })}
              </div>
              <button
                className="inline-flex min-h-11 items-center text-sm text-zinc-600 hover:text-zinc-900"
                onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1))}
              >
                {messages.next}
              </button>
            </div>

            <div className="mt-6 grid grid-cols-7 gap-1.5 text-[11px] text-zinc-500 sm:gap-2 sm:text-xs">
              {messages.weekDays.map((day) => (
                <div key={day} className="text-center uppercase tracking-wide">
                  {day}
                </div>
              ))}
            </div>

            <div className="mt-3 grid grid-cols-7 gap-1.5 text-xs sm:gap-2 sm:text-sm">
              {calendarDays.map(({ date, key }) => {
                if (!date) {
                  return <div key={key} className="h-10 rounded-lg bg-transparent sm:h-12" />;
                }
                const dateKey = toDateKey(date);
                const hasEvent = events.some((event) => event.date === dateKey);
                const isSelected = dateKey === selectedDate;
                return (
                  <button
                    key={key}
                    onClick={() => setSelectedDate(dateKey)}
                    className={`flex h-10 items-center justify-center rounded-lg border text-xs transition sm:h-12 sm:text-sm ${
                      isSelected ? "border-amber-500 bg-amber-50 text-amber-800" : "border-transparent hover:border-zinc-200"
                    }`}
                  >
                    <span className="relative">
                      {date.getDate()}
                      {hasEvent ? (
                        <span className="absolute -right-2 -top-1 h-1.5 w-1.5 rounded-full bg-amber-500" />
                      ) : null}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="rounded-2xl border border-zinc-200 bg-white p-6">
            <div className="text-sm uppercase tracking-wide text-zinc-500">{messages.selectedDate}</div>
            <div className="mt-2 text-xl font-semibold">{selectedDateLabel}</div>
            <div className="mt-6 space-y-4">
              {selectedEvents.length === 0 ? (
                <div className="rounded-lg border border-dashed border-zinc-200 bg-zinc-50 p-4 text-sm text-zinc-600">
                  {messages.empty}
                </div>
              ) : (
                selectedEvents.map((event) => (
                  <div key={event.id} className="rounded-lg border border-zinc-200 p-4">
                    <div className="text-lg font-semibold">{locale === "en" ? event.titleEn : event.titleZh}</div>
                    <div className="text-sm text-zinc-500">{locale === "en" ? event.titleZh : event.titleEn}</div>
                    {(event.summaryEn || event.summaryZh) ? (
                      <div className="mt-2 text-sm text-zinc-600">
                        {locale === "en" ? event.summaryEn || event.summaryZh : event.summaryZh || event.summaryEn}
                      </div>
                    ) : null}
                    <div className="mt-2 text-sm text-zinc-600">
                      {[event.date, event.time].filter((item) => item.length > 0).join(" · ")}
                    </div>
                    {event.location ? <div className="text-sm text-zinc-600">{event.location}</div> : null}
                    <div className="mt-3 flex flex-wrap gap-2">
                      <Link
                        href={withLocale(locale, `/events/${event.id}`)}
                        className="inline-flex rounded-full border border-zinc-300 px-3 py-1.5 text-xs font-semibold text-zinc-800"
                      >
                        {messages.detailsCta}
                      </Link>
                      {event.registrationUrl ? (
                        <a
                          href={event.registrationUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex rounded-full border border-zinc-300 px-3 py-1.5 text-xs font-semibold text-zinc-800"
                        >
                          {messages.registerCta}
                        </a>
                      ) : null}
                      <a
                        href={resolveDonationHref(event, locale)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex rounded-full border border-zinc-300 px-3 py-1.5 text-xs font-semibold text-zinc-800"
                      >
                        {messages.donateCta}
                      </a>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
