import NewsSection from "@/components/news/NewsSection";
import { getAllEventsSafeResult } from "@/lib/events";
import { getMessages, normalizeLocale, withLocale } from "@/lib/i18n";

export const revalidate = 60;

export default async function CalendarPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const normalizedLocale = normalizeLocale(locale);
  const messages = getMessages(normalizedLocale);
  // All events, not just calendar ones: recaps belong on this page under the
  // 回顧 filter, and getCalendarEvents drops anything whose endAt has passed.
  const result = await getAllEventsSafeResult();

  const degradedTitle = normalizedLocale === "en" ? "Events coming soon." : "活動即將上線。";
  const degradedBody =
    normalizedLocale === "en"
      ? "Event data is temporarily unavailable. Please check back shortly."
      : "目前無法取得活動資料，請稍後再試。";
  const retryLabel = normalizedLocale === "en" ? "Retry now" : "立即重試";

  return (
    <main className="pb-12">
      {/* Kept for document structure and screen readers only — the visible
          title/description read as clutter above a hero that already says it. */}
      <h1 className="sr-only">{messages.calendar.title}</h1>

      {result.degraded ? (
        <div className="section-container-medium pb-6 pt-24">
          <section className="border-token bg-accent-weak rounded-xl border p-4 text-[var(--accent-strong)]">
            <h2 className="text-base font-semibold">{degradedTitle}</h2>
            <p className="mt-1 text-sm">{degradedBody}</p>
            <a className="mt-3 inline-flex text-sm font-medium underline" href={withLocale(normalizedLocale, "/calendar")}>
              {retryLabel}
            </a>
          </section>
        </div>
      ) : null}

      {/* No top padding: the hero runs to the top edge and the header, which is
          transparent on this route, sits over it. */}
      <NewsSection
        locale={normalizedLocale}
        events={result.items}
        showHeader={false}
        archiveLink={{
          label: messages.calendar.viewArchive,
          href: withLocale(normalizedLocale, "/events/archive"),
        }}
      />
    </main>
  );
}
