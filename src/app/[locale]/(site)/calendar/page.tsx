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
    normalizedLocale === "en" ? "Calendar content is temporarily unavailable." : "日曆內容暫時不可用。";
  const degradedBody =
    normalizedLocale === "en"
      ? "We loaded fallback events while WordPress is recovering. Please retry shortly."
      : "WordPress 服務暫時異常，已載入備用活動資料，請稍後重試。";
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
