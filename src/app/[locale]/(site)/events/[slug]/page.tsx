import Link from "next/link";
import { formatEventDateTimeRange } from "@/lib/event-schedule";
import { getMinistryDetailSafe } from "@/lib/ministries";
import { getEventBySlugSafeResult, isArchivedEvent } from "@/lib/events";
import { getMessages, normalizeLocale, withLocale } from "@/lib/i18n";
import { sanitizeRichHtml } from "@/lib/sanitize-html";

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
  },
  source: string
): string {
  const fallback = withQueryParams(withLocale(locale, "/donation"), {
    eventSlug: event.id,
    purposeCode: event.donationPurposeCode,
    source,
  });
  const raw = event.donationLink?.trim();
  if (!raw) return fallback;
  if (/^https?:\/\//i.test(raw)) return raw;
  if (raw.startsWith("/zh/") || raw.startsWith("/en/")) {
    return withQueryParams(raw, {
      eventSlug: event.id,
      purposeCode: event.donationPurposeCode,
      source,
    });
  }
  if (raw.startsWith("/")) {
    return withQueryParams(withLocale(locale, raw), {
      eventSlug: event.id,
      purposeCode: event.donationPurposeCode,
      source,
    });
  }
  return raw;
}

export default async function EventDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const normalizedLocale = normalizeLocale(locale);
  const messages = getMessages(normalizedLocale);
  const result = await getEventBySlugSafeResult(slug);
  const event = result.data;
  const backHref = withLocale(normalizedLocale, "/calendar");
  const isArchived = event ? isArchivedEvent(event) : false;
  const degradedNotice =
    normalizedLocale === "en"
      ? "Event data is temporarily unavailable. Please check back shortly."
      : "目前無法取得活動資料，請稍後再試。";

  if (!event) {
    return (
      <main className="mx-auto max-w-4xl space-y-6 px-6 pb-10 pt-32">
        <Link className="inline-flex text-sm font-medium underline" href={backHref}>
          {messages.eventModule.backToCalendar}
        </Link>
        <div className="rounded-lg border border-token bg-accent-weak p-4 text-sm text-[var(--accent-strong)]">
          {messages.common.notFound}
        </div>
      </main>
    );
  }

  const title = normalizedLocale === "en" ? event.titleEn : event.titleZh;
  const subtitle = normalizedLocale === "en" ? event.titleZh : event.titleEn;
  const summary =
    normalizedLocale === "en" ? event.summaryEn || event.summaryZh : event.summaryZh || event.summaryEn;
  const safeSummaryHtml = sanitizeRichHtml(summary || "");
  const schedule = formatEventDateTimeRange(event);
  const donationHref = resolveDonationHref(normalizedLocale, event, isArchived ? "archive_detail" : "event_detail");

  let ministryHref: string | null = null;
  if (event.primaryMinistrySlug) {
    const ministry = await getMinistryDetailSafe(event.primaryMinistrySlug);
    if (ministry?.section.top) {
      ministryHref = withLocale(normalizedLocale, `/ministries/${ministry.section.top}/${ministry.slug}`);
    }
  }

  return (
    <main className="mx-auto max-w-5xl space-y-8 px-6 pb-12 pt-32">
      <div className="space-y-3">
        <Link className="inline-flex text-sm font-medium underline" href={backHref}>
          {messages.eventModule.backToCalendar}
        </Link>
        {isArchived ? (
          <div className="inline-flex rounded-full border border-token px-3 py-1 text-xs font-semibold text-body-color-token">
            {messages.eventModule.archivedLabel}
          </div>
        ) : null}
      </div>

      <section className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="overflow-hidden rounded-2xl border border-token bg-surface-b">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={event.image} alt={title} className="h-full w-full object-cover object-center" />
        </div>

        <div className="space-y-5">
          <h1 className="text-3xl font-semibold">{title}</h1>
          <div className="text-sm text-muted-token">{subtitle}</div>
          {safeSummaryHtml ? (
            <div
              className="text-sm text-body-color-token"
              dangerouslySetInnerHTML={{ __html: safeSummaryHtml }}
            />
          ) : (
            <div className="text-sm text-body-color-token">{messages.eventModule.summaryFallback}</div>
          )}
          <div className="rounded-lg border border-token bg-surface-b p-4 text-sm text-body-color-token">
            <div>{schedule}</div>
            {event.location ? <div className="mt-1">{event.location}</div> : null}
          </div>
          {ministryHref ? (
            <div className="text-sm text-body-color-token">
              {messages.eventModule.relatedMinistry}:
              <Link className="ml-2 font-medium text-heading-token underline" href={ministryHref}>
                {event.primaryMinistrySlug}
              </Link>
            </div>
          ) : null}
          <div className="flex flex-wrap gap-2 pt-2">
            {event.registrationUrl ? (
              <a
                href={event.registrationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex rounded-full bg-stats-token px-4 py-2 text-sm font-semibold text-white"
              >
                {messages.eventModule.registerCta}
              </a>
            ) : (
              <span className="inline-flex rounded-full border border-token px-4 py-2 text-sm text-muted-token">
                {messages.eventModule.registerUnavailable}
              </span>
            )}
            <a
              href={donationHref}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-donation-pill inline-flex rounded-full border px-4 py-2 text-sm font-semibold"
            >
              {messages.eventModule.donateCta}
            </a>
          </div>
        </div>
      </section>

      {result.degraded ? (
        <section className="rounded-lg border border-token bg-accent-weak p-4 text-sm text-[var(--accent-strong)]">
          {degradedNotice}
        </section>
      ) : null}
    </main>
  );
}
