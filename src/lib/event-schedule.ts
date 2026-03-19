import type { CalendarEventItem } from "@/content/calendar/events";

type EventScheduleSource = Pick<CalendarEventItem, "date" | "time" | "endAt">;

function toDateKey(input?: string | null): string | null {
  if (!input) return null;
  const trimmed = input.trim();
  if (!trimmed) return null;
  const matched = trimmed.match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (!matched) return null;
  return `${matched[1]}-${matched[2]}-${matched[3]}`;
}

export function formatEventDateTimeRange(event: EventScheduleSource): string {
  const date = event.date?.trim() || "";
  const time = event.time?.trim() || "";
  if (!date) return time;
  if (!time) return date;

  const endDate = toDateKey(event.endAt);
  if (!endDate || endDate === date) {
    return `${date} ${time}`;
  }

  const [startTime, endTime, ...rest] = time.split(" - ").map((part) => part.trim()).filter((part) => part.length > 0);
  if (startTime && endTime && rest.length === 0) {
    return `${date} ${startTime} - ${endDate} ${endTime}`;
  }

  return `${date} ${time} - ${endDate}`;
}
