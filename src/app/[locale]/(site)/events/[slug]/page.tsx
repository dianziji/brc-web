import Link from "next/link";
import { getMinistryDetailSafe } from "@/lib/ministries";
import { getEventBySlugSafeResult, isArchivedEvent } from "@/lib/events";
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
      ? "WordPress event service is temporarily degraded. Fallback data is displayed."
      : "WordPress 活動服務暫時降級，當前顯示備援資料。";

  if (!event) {
    return (
      <main className="mx-auto max-w-4xl space-y-6 px-6 pb-10 pt-32">
        <Link className="inline-flex text-sm font-medium underline" href={backHref}>
          {messages.eventModule.backToCalendar}
        </Link>
        <div className="rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
          {messages.common.notFound}
        </div>
      </main>
    );
  }

  const title = normalizedLocale === "en" ? event.titleEn : event.titleZh;
  const subtitle = normalizedLocale === "en" ? event.titleZh : event.titleEn;
  const summary =
    normalizedLocale === "en" ? event.summaryEn || event.summaryZh : event.summaryZh || event.summaryEn;
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
          <div className="inline-flex rounded-full border border-zinc-300 px-3 py-1 text-xs font-semibold text-zinc-700">
            {messages.eventModule.archivedLabel}
          </div>
        ) : (
          <div className="inline-flex rounded-full border border-emerald-300 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
            {messages.eventModule.upcomingLabel}
          </div>
        )}
      </div>

      <section className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-100">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={event.image} alt={title} className="h-full w-full object-cover object-center" />
        </div>

        <div className="space-y-5">
          <h1 className="text-3xl font-semibold">{title}</h1>
          <div className="text-sm text-zinc-500">{subtitle}</div>
          <div className="text-sm text-zinc-700">{summary || messages.eventModule.summaryFallback}</div>
          <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 text-sm text-zinc-700">
            <div>{[event.date, event.time].filter((item) => item && item.length > 0).join(" · ")}</div>
            {event.location ? <div className="mt-1">{event.location}</div> : null}
          </div>
          {ministryHref ? (
            <div className="text-sm text-zinc-600">
              {messages.eventModule.relatedMinistry}:
              <Link className="ml-2 font-medium text-zinc-900 underline" href={ministryHref}>
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
                className="inline-flex rounded-full bg-zinc-900 px-4 py-2 text-sm font-semibold text-white"
              >
                {messages.eventModule.registerCta}
              </a>
            ) : (
              <span className="inline-flex rounded-full border border-zinc-300 px-4 py-2 text-sm text-zinc-500">
                {messages.eventModule.registerUnavailable}
              </span>
            )}
            <a
              href={donationHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex rounded-full border border-zinc-300 px-4 py-2 text-sm font-semibold text-zinc-800"
            >
              {messages.eventModule.donateCta}
            </a>
          </div>
        </div>
      </section>

      {result.degraded ? (
        <section className="rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
          {degradedNotice}
        </section>
      ) : null}
    </main>
  );
}
