"use client";

import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { calendarEvents } from "@/content/calendar/events";
import { getMessages, normalizeLocale, type Locale } from "@/lib/i18n";

function formatDateLabel(date: Date, locale: Locale) {
  return date.toLocaleDateString(locale === "en" ? "en-US" : "zh-TW", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function toDateKey(date: Date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

export default function CalendarPage() {
  const params = useParams<{ locale?: string | string[] }>();
  const rawLocale = Array.isArray(params?.locale) ? params?.locale[0] : params?.locale;
  const locale = normalizeLocale(rawLocale);
  const messages = getMessages(locale);
  const [currentMonth, setCurrentMonth] = useState(() => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), 1);
  });
  const [selectedDate, setSelectedDate] = useState(() => toDateKey(new Date()));
  const [slideIndex, setSlideIndex] = useState(0);
  const todayKey = useMemo(() => toDateKey(new Date()), []);

  const upcoming = useMemo(() => {
    return calendarEvents.filter((event) => event.date >= todayKey).sort((a, b) => a.date.localeCompare(b.date));
  }, [todayKey]);

  useEffect(() => {
    if (upcoming.length <= 1) return;
    const id = window.setInterval(() => {
      setSlideIndex((prev) => (prev + 1) % upcoming.length);
    }, 5000);
    return () => window.clearInterval(id);
  }, [upcoming.length]);

  const activeSlide = upcoming[slideIndex] ?? calendarEvents[0];
  const activeTitle = locale === "en" ? activeSlide.titleEn : activeSlide.titleZh;
  const activeSubtitle = locale === "en" ? activeSlide.titleZh : activeSlide.titleEn;

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

  const selectedEvents = calendarEvents.filter((event) => event.date === selectedDate);
  const selectedDateLabel = formatDateLabel(new Date(selectedDate), locale);

  return (
    <main className="mx-auto max-w-6xl px-6 pt-36 pb-12 md:pt-32 space-y-12">
      <section className="space-y-6">
        <div>
          <h1 className="text-3xl font-semibold">{messages.calendar.title}</h1>
          <p className="mt-2 text-sm text-zinc-600">{messages.calendar.desc}</p>
        </div>

        <div className="relative overflow-hidden rounded-2xl border bg-zinc-900 text-white">
          <div className="relative h-[260px] w-full sm:h-[320px] md:h-[360px]">
            <Image src={activeSlide.image} alt={activeTitle} fill className="object-cover object-center" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          </div>
          <div className="absolute inset-x-4 bottom-4 space-y-1.5 sm:inset-x-6 sm:bottom-6 sm:space-y-2">
            <div className="text-lg font-semibold sm:text-2xl">{activeTitle}</div>
            <div className="text-sm text-zinc-200">{activeSubtitle}</div>
            <div className="text-sm text-zinc-300">
              {activeSlide.date} · {activeSlide.time} · {activeSlide.location}
            </div>
          </div>
          <div className="absolute right-3 top-3 flex items-center gap-1.5 sm:right-6 sm:top-6 sm:gap-2">
            {upcoming.map((event, index) => (
              <button
                key={event.id}
                aria-label={`Go to slide ${index + 1}`}
                onClick={() => setSlideIndex(index)}
                className="inline-flex h-8 w-8 items-center justify-center sm:h-6 sm:w-6"
              >
                <span
                  className={`h-2 w-2 rounded-full transition ${
                    index === slideIndex ? "bg-white" : "bg-white/40"
                  }`}
                />
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-2xl border border-zinc-200 bg-white p-6">
          <div className="flex items-center justify-between">
            <button
              className="inline-flex min-h-11 items-center text-sm text-zinc-600 hover:text-zinc-900"
              onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1))}
            >
              {messages.calendar.prev}
            </button>
            <div className="text-lg font-semibold">
              {currentMonth.toLocaleDateString(locale === "en" ? "en-US" : "zh-TW", { month: "long", year: "numeric" })}
            </div>
            <button
              className="inline-flex min-h-11 items-center text-sm text-zinc-600 hover:text-zinc-900"
              onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1))}
            >
              {messages.calendar.next}
            </button>
          </div>

          <div className="mt-6 grid grid-cols-7 gap-1.5 text-[11px] text-zinc-500 sm:gap-2 sm:text-xs">
            {messages.calendar.weekDays.map((day) => (
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
              const hasEvent = calendarEvents.some((event) => event.date === dateKey);
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
          <div className="text-sm uppercase tracking-wide text-zinc-500">{messages.calendar.selectedDate}</div>
          <div className="mt-2 text-xl font-semibold">{selectedDateLabel}</div>
          <div className="mt-6 space-y-4">
            {selectedEvents.length === 0 ? (
              <div className="rounded-lg border border-dashed border-zinc-200 bg-zinc-50 p-4 text-sm text-zinc-600">
                {messages.calendar.empty}
              </div>
            ) : (
              selectedEvents.map((event) => (
                <div key={event.id} className="rounded-lg border border-zinc-200 p-4">
                  <div className="text-lg font-semibold">{locale === "en" ? event.titleEn : event.titleZh}</div>
                  <div className="text-sm text-zinc-500">{locale === "en" ? event.titleZh : event.titleEn}</div>
                  <div className="mt-2 text-sm text-zinc-600">
                    {event.date} · {event.time}
                  </div>
                  <div className="text-sm text-zinc-600">{event.location}</div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
