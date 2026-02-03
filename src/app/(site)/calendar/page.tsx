"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";

type EventItem = {
  id: string;
  title: string;
  titleZh: string;
  date: string; // YYYY-MM-DD
  time: string;
  location: string;
  image: string;
};

const events: EventItem[] = [
  {
    id: "event-vision-night",
    title: "Vision Night",
    titleZh: "异象之夜",
    date: "2026-02-02",
    time: "7:30 PM",
    location: "Main Sanctuary",
    image: "/images/hero.jpeg",
  },
  {
    id: "event-youth-camp",
    title: "Youth Camp",
    titleZh: "青年成长营",
    date: "2026-02-09",
    time: "9:00 AM",
    location: "Camp Center",
    image: "/images/hero.jpeg",
  },
  {
    id: "event-family-night",
    title: "Family Night",
    titleZh: "家庭事工之夜",
    date: "2026-02-16",
    time: "6:30 PM",
    location: "Fellowship Hall",
    image: "/images/hero.jpeg",
  },
  {
    id: "event-mission-briefing",
    title: "Mission Briefing",
    titleZh: "宣教分享会",
    date: "2026-02-23",
    time: "1:00 PM",
    location: "Room 201",
    image: "/images/hero.jpeg",
  },
];

const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function formatDateLabel(date: Date) {
  return date.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

function toDateKey(date: Date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

export default function CalendarPage() {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(new Date(today.getFullYear(), today.getMonth(), 1));
  const [selectedDate, setSelectedDate] = useState(toDateKey(today));
  const [slideIndex, setSlideIndex] = useState(0);

  const upcoming = useMemo(() => {
    const nowKey = toDateKey(today);
    return events
      .filter((event) => event.date >= nowKey)
      .sort((a, b) => a.date.localeCompare(b.date));
  }, [today]);

  useEffect(() => {
    if (upcoming.length <= 1) return;
    const id = window.setInterval(() => {
      setSlideIndex((prev) => (prev + 1) % upcoming.length);
    }, 5000);
    return () => window.clearInterval(id);
  }, [upcoming.length]);

  const activeSlide = upcoming[slideIndex] ?? events[0];

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
  const selectedDateLabel = formatDateLabel(new Date(selectedDate));

  return (
    <main className="mx-auto max-w-6xl px-6 pt-28 pb-12 md:pt-32 space-y-12">
      <section className="space-y-6">
        <div>
      
          <h1 className="text-3xl font-semibold">事工活动日历</h1>
          <p className="mt-2 text-sm text-zinc-600">
            查看即将举行的活动，并根据日期查找详细安排。
          </p>
        </div>

        <div className="relative overflow-hidden rounded-2xl border bg-zinc-900 text-white">
          <div className="relative h-[360px] w-full">
            <Image src={activeSlide.image} alt={activeSlide.title} fill className="object-cover object-center" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          </div>
          <div className="absolute inset-x-6 bottom-6 space-y-2">
            <div className="text-2xl font-semibold">{activeSlide.title}</div>
            <div className="text-sm text-zinc-200">{activeSlide.titleZh}</div>
            <div className="text-sm text-zinc-300">
              {activeSlide.date} · {activeSlide.time} · {activeSlide.location}
            </div>
          </div>
          <div className="absolute right-6 top-6 flex items-center gap-2">
            {upcoming.map((event, index) => (
              <button
                key={event.id}
                aria-label={`Go to slide ${index + 1}`}
                onClick={() => setSlideIndex(index)}
                className={`h-2 w-2 rounded-full transition ${
                  index === slideIndex ? "bg-white" : "bg-white/40"
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-2xl border border-zinc-200 bg-white p-6">
          <div className="flex items-center justify-between">
            <button
              className="text-sm text-zinc-600 hover:text-zinc-900"
              onClick={() =>
                setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1))
              }
            >
              ← Prev
            </button>
            <div className="text-lg font-semibold">
              {currentMonth.toLocaleDateString("en-US", { month: "long", year: "numeric" })}
            </div>
            <button
              className="text-sm text-zinc-600 hover:text-zinc-900"
              onClick={() =>
                setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1))
              }
            >
              Next →
            </button>
          </div>

          <div className="mt-6 grid grid-cols-7 gap-2 text-xs text-zinc-500">
            {weekDays.map((day) => (
              <div key={day} className="text-center uppercase tracking-wide">
                {day}
              </div>
            ))}
          </div>

          <div className="mt-3 grid grid-cols-7 gap-2 text-sm">
            {calendarDays.map(({ date, key }) => {
              if (!date) {
                return <div key={key} className="h-12 rounded-lg bg-transparent" />;
              }
              const dateKey = toDateKey(date);
              const hasEvent = events.some((event) => event.date === dateKey);
              const isSelected = dateKey === selectedDate;
              return (
                <button
                  key={key}
                  onClick={() => setSelectedDate(dateKey)}
                  className={`flex h-12 items-center justify-center rounded-lg border text-sm transition ${
                    isSelected
                      ? "border-amber-500 bg-amber-50 text-amber-800"
                      : "border-transparent hover:border-zinc-200"
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
          <div className="text-sm uppercase tracking-wide text-zinc-500">Selected Date</div>
          <div className="mt-2 text-xl font-semibold">{selectedDateLabel}</div>
          <div className="mt-6 space-y-4">
            {selectedEvents.length === 0 ? (
              <div className="rounded-lg border border-dashed border-zinc-200 bg-zinc-50 p-4 text-sm text-zinc-600">
                今天没有安排的事工或活动。
              </div>
            ) : (
              selectedEvents.map((event) => (
                <div key={event.id} className="rounded-lg border border-zinc-200 p-4">
                  <div className="text-lg font-semibold">{event.title}</div>
                  <div className="text-sm text-zinc-500">{event.titleZh}</div>
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
