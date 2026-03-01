import Link from "next/link";
import { getArchivedEventsSafeResult } from "@/lib/events";
import { getMessages, normalizeLocale, withLocale } from "@/lib/i18n";

export const revalidate = 60;

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

function resolveDonationHref(
  locale: "zh" | "en",
  event: {
    id: string;
    donationLink?: string;
    donationPurposeCode?: string;
  }
): string {
  const fallback = withQueryParams(withLocale(locale, "/donation"), {
    eventSlug: event.id,
    purposeCode: event.donationPurposeCode,
    source: "archive",
  });
  const raw = event.donationLink?.trim();
  if (!raw) return fallback;
  if (/^https?:\/\//i.test(raw)) return raw;
  if (raw.startsWith("/zh/") || raw.startsWith("/en/")) {
    return withQueryParams(raw, {
      eventSlug: event.id,
      purposeCode: event.donationPurposeCode,
      source: "archive",
    });
  }
  if (raw.startsWith("/")) {
    return withQueryParams(withLocale(locale, raw), {
      eventSlug: event.id,
      purposeCode: event.donationPurposeCode,
      source: "archive",
    });
  }
  return raw;
}

export default async function EventArchivePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const normalizedLocale = normalizeLocale(locale);
  const messages = getMessages(normalizedLocale);
  const result = await getArchivedEventsSafeResult();
  const backHref = withLocale(normalizedLocale, "/calendar");
  const degradedNotice =
    normalizedLocale === "en"
      ? "WordPress event service is temporarily degraded. Fallback archive data is displayed."
      : "WordPress 活動服務暫時降級，當前顯示備援歸檔資料。";

  return (
    <main className="mx-auto max-w-6xl space-y-8 px-6 pb-12 pt-32">
      <section className="space-y-3">
        <Link className="inline-flex text-sm font-medium underline" href={backHref}>
          {messages.eventModule.backToCalendar}
        </Link>
        <h1 className="text-3xl font-semibold">{messages.eventModule.archiveTitle}</h1>
        <p className="text-sm text-body-color-token">{messages.eventModule.archiveDesc}</p>
      </section>

      {result.degraded ? (
        <section className="rounded-lg border border-token bg-accent-weak p-4 text-sm text-[var(--accent-strong)]">
          {degradedNotice}
        </section>
      ) : null}

      {result.items.length === 0 ? (
        <section className="rounded-xl border border-dashed border-token bg-surface-b p-8 text-sm text-body-color-token">
          {messages.eventModule.archiveEmpty}
        </section>
      ) : (
        <section className="grid gap-6 md:grid-cols-2">
          {result.items.map((event) => {
            const title = normalizedLocale === "en" ? event.titleEn : event.titleZh;
            const subtitle = normalizedLocale === "en" ? event.titleZh : event.titleEn;
            const summary =
              normalizedLocale === "en" ? event.summaryEn || event.summaryZh : event.summaryZh || event.summaryEn;
            const donationHref = resolveDonationHref(normalizedLocale, event);

            return (
              <article key={event.id} className="overflow-hidden rounded-2xl border border-token bg-surface-a">
                <div className="relative h-44 w-full bg-surface-b">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={event.image} alt={title} className="h-full w-full object-cover object-center" />
                </div>
                <div className="space-y-3 p-5">
                  <div className="text-lg font-semibold">{title}</div>
                  <div className="text-sm text-muted-token">{subtitle}</div>
                  <div className="text-sm text-body-color-token">{summary || messages.eventModule.summaryFallback}</div>
                  <div className="text-sm text-body-color-token">
                    {[event.date, event.time, event.location].filter((item) => item && item.length > 0).join(" · ")}
                  </div>
                  <div className="flex flex-wrap gap-2 pt-1">
                    <Link
                      href={withLocale(normalizedLocale, `/events/${event.id}`)}
                      className="inline-flex rounded-full border border-token px-3 py-1.5 text-xs font-semibold text-heading-token"
                    >
                      {messages.eventModule.detailsCta}
                    </Link>
                    <a
                      href={donationHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex rounded-full border border-token px-3 py-1.5 text-xs font-semibold text-heading-token"
                    >
                      {messages.eventModule.donateCta}
                    </a>
                  </div>
                </div>
              </article>
            );
          })}
        </section>
      )}
    </main>
  );
}
