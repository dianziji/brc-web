import CalendarPageClient from "@/components/CalendarPageClient";
import { getCalendarEventsSafeResult } from "@/lib/events";
import { getMessages, normalizeLocale, withLocale } from "@/lib/i18n";

export const revalidate = 60;

export default async function CalendarPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const normalizedLocale = normalizeLocale(locale);
  const messages = getMessages(normalizedLocale);
  const result = await getCalendarEventsSafeResult();

  const degradedTitle =
    normalizedLocale === "en" ? "Events coming soon." : "活動即將上線。";
  const degradedBody =
    normalizedLocale === "en"
      ? "Event data is temporarily unavailable. Please check back shortly."
      : "目前無法取得活動資料，請稍後再試。";
  const retryLabel = normalizedLocale === "en" ? "Retry now" : "立即重試";

  return (
    <CalendarPageClient
      locale={normalizedLocale}
      messages={messages.calendar}
      events={result.items}
      degraded={result.degraded}
      degradedTitle={degradedTitle}
      degradedBody={degradedBody}
      retryLabel={retryLabel}
      retryHref={withLocale(normalizedLocale, "/calendar")}
    />
  );
}
