import Link from "next/link";
import { redirect } from "next/navigation";
import { resolveCmsImageUrl } from "@/lib/cms-media";
import { getEventsByMinistrySafeResult, isArchivedEvent } from "@/lib/events";
import { getMinistryDetailSafeResult } from "@/lib/ministries";
import { getMessages, normalizeLocale, pickLocalized, withLocale } from "@/lib/i18n";
import { sanitizeRichHtml } from "@/lib/sanitize-html";

export const revalidate = 60;

function sortEventsByDateAndId<T extends { date: string; id: string }>(items: T[]): T[] {
  return [...items].sort((a, b) => {
    const dateCompare = a.date.localeCompare(b.date);
    if (dateCompare !== 0) return dateCompare;
    return a.id.localeCompare(b.id);
  });
}

function toTodayKey(): string {
  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, "0");
  const d = String(now.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
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
    source: "ministry_detail",
  });
  const raw = event.donationLink?.trim();
  if (!raw) return fallback;
  if (/^https?:\/\//i.test(raw)) return raw;
  if (raw.startsWith("/zh/") || raw.startsWith("/en/")) {
    return withQueryParams(raw, {
      eventSlug: event.id,
      purposeCode: event.donationPurposeCode,
      source: "ministry_detail",
    });
  }
  if (raw.startsWith("/")) {
    return withQueryParams(withLocale(locale, raw), {
      eventSlug: event.id,
      purposeCode: event.donationPurposeCode,
      source: "ministry_detail",
    });
  }
  return raw;
}

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string; top: string; slug: string }>;
}) {
  const { locale, top, slug } = await params;
  const normalizedLocale = normalizeLocale(locale);
  const messages = getMessages(normalizedLocale);
  const detailResult = await getMinistryDetailSafeResult(slug);
  let ministryEventsResult = await getEventsByMinistrySafeResult(slug, { includeArchived: true, limit: 10 });
  const data = detailResult.data;
  const backLabel = messages.common.back.replace(/^←\s*/, "");
  const websiteLabel = normalizedLocale === "en" ? "Visit ministry website" : "查看事工網站";

  const canonicalTop = data?.section.top ?? top;
  if (data?.section.top && data.section.top !== top) {
    redirect(withLocale(normalizedLocale, `/ministries/${data.section.top}/${slug}`));
  }

  if (data) {
    const aliasKeys = Array.from(
      new Set(
        [data.section.leaf?.slug]
          .filter((value): value is string => Boolean(value))
          .map((value) => value.trim().toLowerCase())
      )
    ).filter((value) => value !== slug.trim().toLowerCase());

    if (aliasKeys.length > 0) {
      const aliasResults = await Promise.all(
        aliasKeys.map((key) => getEventsByMinistrySafeResult(key, { includeArchived: true, limit: 10 }))
      );

      const deduped = new Map(ministryEventsResult.items.map((item) => [item.id, item]));
      for (const result of aliasResults) {
        for (const item of result.items) {
          deduped.set(item.id, item);
        }
      }

      ministryEventsResult = {
        items: sortEventsByDateAndId(Array.from(deduped.values())).slice(0, 10),
        degraded: ministryEventsResult.degraded || aliasResults.some((result) => result.degraded),
        errorType: ministryEventsResult.errorType || aliasResults.find((result) => result.errorType)?.errorType || null,
      };
    }
  }

  const backLink = withLocale(normalizedLocale, `/ministries/${canonicalTop}`);
  const retryLink = withLocale(normalizedLocale, `/ministries/${top}/${slug}`);
  const degradedTitle =
    normalizedLocale === "en" ? "This content is temporarily unavailable." : "此內容暫時不可用。";
  const degradedBody =
    normalizedLocale === "en"
      ? "The content service timed out. Please retry in a moment."
      : "內容服務請求超時，請稍後重試。";
  const retryLabel = normalizedLocale === "en" ? "Retry now" : "立即重試";
  const eventsDegradedNotice =
    normalizedLocale === "en"
      ? "WordPress event service is temporarily degraded. Fallback data is displayed."
      : "WordPress 活動服務暫時降級，當前顯示備援資料。";

  if (!data) {
    return (
      <main className="mx-auto max-w-4xl space-y-6 px-6 pb-6 pt-28 md:pt-32">
        <Link
          href={backLink}
          className="group inline-flex items-center gap-2 rounded-full border border-token bg-surface-a px-4 py-2 text-sm font-medium text-heading-token shadow-sm transition hover:-translate-y-0.5 hover:border-[var(--accent-sub)] hover:shadow"
        >
          <span
            aria-hidden="true"
            className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-surface-b text-xs text-body-color-token transition group-hover:-translate-x-0.5"
          >
            ←
          </span>
          <span>{backLabel}</span>
        </Link>
        {detailResult.degraded ? (
          <div className="rounded-lg border border-token bg-accent-weak p-4 text-[var(--accent-strong)]">
            <h2 className="text-sm font-semibold">{degradedTitle}</h2>
            <p className="mt-1 text-sm">{degradedBody}</p>
            <Link className="mt-3 inline-flex text-sm font-medium underline" href={retryLink}>
              {retryLabel}
            </Link>
          </div>
        ) : (
          <div className="rounded-lg border border-token bg-accent-weak p-3 text-sm text-[var(--accent-strong)]">
            {messages.common.notFound}
          </div>
        )}
      </main>
    );
  }

  const title = pickLocalized(normalizedLocale, {
    en: data.fields.titleEn,
    zh: data.fields.titleZh,
    fallback: data.slug,
  });
  const summary = pickLocalized(normalizedLocale, {
    en: data.fields.summaryEn,
    zh: data.fields.summaryZh,
  });
  const safeSummaryHtml = sanitizeRichHtml(summary);
  const websiteUrl = data.fields.externalUrl ?? "";
  const heroSrc = resolveCmsImageUrl(data.fields.heroImage?.node?.sourceUrl);
  const heroAlt = data.fields.heroImage?.node?.altText || title;
  const todayKey = toTodayKey();
  const upcomingEvents = ministryEventsResult.items
    .filter((event) => !isArchivedEvent(event) && event.date >= todayKey)
    .slice(0, 2);
  const archivedEvents = ministryEventsResult.items.filter((event) => isArchivedEvent(event)).slice(0, 2);
  const hasLinkedEvents = upcomingEvents.length > 0 || archivedEvents.length > 0;
  const openCalendarLabel = normalizedLocale === "en" ? "Open calendar" : "前往活動日曆";

  return (
    <main className="bg-surface-b pb-14 pt-20 md:pb-16 md:pt-24">
      <section className="mx-auto max-w-6xl px-6">
        <div className="overflow-hidden rounded-3xl border border-token bg-surface-a shadow-sm">
          <div className="grid lg:grid-cols-[1.05fr_0.95fr]">
            <div className="relative min-h-[280px] lg:min-h-[560px]">
              {heroSrc ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={heroSrc} alt={heroAlt} className="h-full w-full object-cover object-center" />
              ) : (
                <div className="h-full w-full bg-surface-b" />
              )}
            </div>

            <div className="flex items-start">
              <div className="mx-auto w-full max-w-xl space-y-6 px-6 py-8 md:px-10 md:py-10">
                <h1 className="text-3xl font-semibold text-heading-token md:text-4xl">{title}</h1>

                <section className="prose max-w-none text-body-color-token">
                  <div dangerouslySetInnerHTML={{ __html: safeSummaryHtml }} />
                </section>

                <div className="flex flex-wrap gap-3 pt-1">
                  {websiteUrl.length > 0 ? (
                    <a
                      href={websiteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-full border border-token bg-surface-a px-4 py-2 text-sm font-medium text-heading-token transition hover:border-[var(--accent-sub)] hover:bg-surface-b"
                    >
                      <span className="text-xs">↗</span>
                      <span>{websiteLabel}</span>
                    </a>
                  ) : null}

                  <Link
                    href={withLocale(normalizedLocale, "/calendar")}
                    className="inline-flex items-center gap-2 rounded-full border border-token bg-surface-a px-4 py-2 text-sm font-medium text-heading-token transition hover:border-[var(--accent-sub)] hover:bg-surface-b"
                  >
                    <span className="text-xs">→</span>
                    <span>{openCalendarLabel}</span>
                  </Link>

                  <Link
                    href={backLink}
                    className="inline-flex items-center gap-2 rounded-full border border-token bg-surface-a px-4 py-2 text-sm font-medium text-heading-token transition hover:border-[var(--accent-sub)] hover:bg-surface-b"
                  >
                    <span className="text-xs">←</span>
                    <span>{backLabel}</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {hasLinkedEvents || ministryEventsResult.degraded ? (
        <section className="mx-auto mt-10 max-w-6xl px-6">
          <div className="rounded-3xl border border-token bg-surface-a p-6 md:p-8">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h2 className="text-2xl font-semibold text-heading-token">{messages.eventModule.linkedEventsTitle}</h2>
                <p className="mt-2 text-sm text-body-color-token">{messages.eventModule.linkedEventsBody}</p>
              </div>
              <Link className="text-sm font-medium text-body-color-token underline" href={withLocale(normalizedLocale, "/calendar")}>
                {openCalendarLabel}
              </Link>
            </div>

            {ministryEventsResult.degraded ? (
              <div className="mt-5 rounded-lg border border-token bg-accent-weak p-3 text-sm text-[var(--accent-strong)]">
                {eventsDegradedNotice}
              </div>
            ) : null}

            {hasLinkedEvents ? (
              <div className="mt-7 space-y-8">
                <section className="space-y-4">
                  <div className="text-xs font-semibold uppercase tracking-wide text-muted-token">
                    {messages.eventModule.upcomingLabel}
                  </div>
                  {upcomingEvents.length === 0 ? (
                    <div className="rounded-lg border border-dashed border-token bg-surface-b p-4 text-sm text-body-color-token">
                      {messages.eventModule.linkedEventsEmpty}
                    </div>
                  ) : (
                    <div className="grid gap-4 md:grid-cols-2">
                      {upcomingEvents.map((event) => (
                        <article key={event.id} className="overflow-hidden rounded-2xl border border-token bg-surface-b">
                          <div className="space-y-3 p-4">
                            <div className="text-base font-semibold text-heading-token">
                              {normalizedLocale === "en" ? event.titleEn : event.titleZh}
                            </div>
                            <div className="text-sm text-body-color-token">
                              {[event.date, event.time, event.location].filter((item) => item && item.length > 0).join(" · ")}
                            </div>
                            <div className="flex flex-wrap gap-2 pt-1">
                              <Link
                                href={withLocale(normalizedLocale, `/events/${event.id}`)}
                                className="inline-flex rounded-full border border-token bg-surface-a px-3 py-1.5 text-xs font-semibold text-heading-token"
                              >
                                {messages.eventModule.detailsCta}
                              </Link>
                              {event.registrationUrl ? (
                                <a
                                  href={event.registrationUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex rounded-full border border-token bg-surface-a px-3 py-1.5 text-xs font-semibold text-heading-token"
                                >
                                  {messages.calendar.registerCta}
                                </a>
                              ) : null}
                              <a
                                href={resolveDonationHref(normalizedLocale, event)}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn-donation-pill inline-flex rounded-full border px-3 py-1.5 text-xs font-semibold"
                              >
                                {messages.eventModule.donateCta}
                              </a>
                            </div>
                          </div>
                        </article>
                      ))}
                    </div>
                  )}
                </section>

                <section className="space-y-4">
                  <div className="flex items-center justify-between gap-4">
                    <div className="text-xs font-semibold uppercase tracking-wide text-muted-token">
                      {messages.eventModule.archivedLabel}
                    </div>
                    <Link className="text-xs font-medium text-body-color-token underline" href={withLocale(normalizedLocale, "/events/archive")}>
                      {messages.calendar.viewArchive}
                    </Link>
                  </div>
                  {archivedEvents.length === 0 ? (
                    <div className="rounded-lg border border-dashed border-token bg-surface-b p-4 text-sm text-body-color-token">
                      {messages.eventModule.linkedEventsEmpty}
                    </div>
                  ) : (
                    <div className="grid gap-4 md:grid-cols-2">
                      {archivedEvents.map((event) => (
                        <article key={event.id} className="overflow-hidden rounded-2xl border border-token bg-surface-b">
                          <div className="space-y-3 p-4">
                            <div className="text-base font-semibold text-heading-token">
                              {normalizedLocale === "en" ? event.titleEn : event.titleZh}
                            </div>
                            <div className="text-sm text-body-color-token">
                              {[event.date, event.time, event.location].filter((item) => item && item.length > 0).join(" · ")}
                            </div>
                            <div className="flex flex-wrap gap-2 pt-1">
                              <Link
                                href={withLocale(normalizedLocale, `/events/archive/${event.id}`)}
                                className="inline-flex rounded-full border border-token bg-surface-a px-3 py-1.5 text-xs font-semibold text-heading-token"
                              >
                                {messages.eventModule.detailsCta}
                              </Link>
                              <a
                                href={resolveDonationHref(normalizedLocale, event)}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn-donation-pill inline-flex rounded-full border px-3 py-1.5 text-xs font-semibold"
                              >
                                {messages.eventModule.donateCta}
                              </a>
                            </div>
                          </div>
                        </article>
                      ))}
                    </div>
                  )}
                </section>
              </div>
            ) : (
              <div className="mt-6 rounded-lg border border-dashed border-token bg-surface-b p-4 text-sm text-body-color-token">
                {messages.eventModule.linkedEventsEmpty}
              </div>
            )}
          </div>
        </section>
      ) : null}
    </main>
  );
}
