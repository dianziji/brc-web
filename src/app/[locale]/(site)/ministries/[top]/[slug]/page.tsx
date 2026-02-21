import Link from "next/link";
import { redirect } from "next/navigation";
import { resolveCmsImageUrl } from "@/lib/cms-media";
import { getMinistryDetailSafeResult } from "@/lib/ministries";
import { getMessages, normalizeLocale, pickLocalized, withLocale } from "@/lib/i18n";
import { sanitizeRichHtml } from "@/lib/sanitize-html";

export const revalidate = 60;

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string; top: string; slug: string }>;
}) {
  const { locale, top, slug } = await params;
  const normalizedLocale = normalizeLocale(locale);
  const messages = getMessages(normalizedLocale);
  const detailResult = await getMinistryDetailSafeResult(slug);
  const data = detailResult.data;
  const backLabel = messages.common.back.replace(/^←\s*/, "");
  const websiteLabel = normalizedLocale === "en" ? "Visit ministry website" : "查看事工網站";

  const canonicalTop = data?.section.top ?? top;
  if (data?.section.top && data.section.top !== top) {
    redirect(withLocale(normalizedLocale, `/ministries/${data.section.top}/${slug}`));
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

  if (!data) {
    return (
      <main className="mx-auto max-w-4xl space-y-6 px-6 pb-6 pt-28 md:pt-32">
        <Link
          href={backLink}
          className="group inline-flex items-center gap-2 rounded-full border border-zinc-300 bg-white px-4 py-2 text-sm font-medium text-zinc-800 shadow-sm transition hover:-translate-y-0.5 hover:border-zinc-400 hover:shadow"
        >
          <span
            aria-hidden="true"
            className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-zinc-100 text-xs text-zinc-700 transition group-hover:-translate-x-0.5"
          >
            ←
          </span>
          <span>{backLabel}</span>
        </Link>
        {detailResult.degraded ? (
          <div className="rounded-lg border border-amber-200 bg-amber-50 p-4 text-amber-900">
            <h2 className="text-sm font-semibold">{degradedTitle}</h2>
            <p className="mt-1 text-sm">{degradedBody}</p>
            <Link className="mt-3 inline-flex text-sm font-medium underline" href={retryLink}>
              {retryLabel}
            </Link>
          </div>
        ) : (
          <div className="rounded-lg border border-amber-200 bg-amber-50 p-3 text-sm text-amber-900">
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

  return (
    <main className="bg-white pt-20 md:pt-24">
      <section className="grid min-h-[calc(100vh-5rem)] md:grid-cols-2">
        <div className="relative min-h-[300px] md:min-h-[calc(100vh-6rem)]">
          {heroSrc ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={heroSrc}
              alt={heroAlt}
              className="h-full w-full object-cover object-center"
            />
          ) : (
            <div className="h-full w-full bg-zinc-200" />
          )}
        </div>

        <div className="flex items-start">
          <div className="mx-auto w-full max-w-xl space-y-6 px-6 py-8 md:px-10 md:py-10">
            <h1 className="text-3xl font-semibold text-zinc-900 md:text-4xl">{title}</h1>

            <section className="prose max-w-none">
              <div dangerouslySetInnerHTML={{ __html: safeSummaryHtml }} />
            </section>

            <div className="flex flex-col items-start gap-4 pt-4">
              {websiteUrl.length > 0 ? (
                <a
                  href={websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 rounded-full border border-zinc-300 bg-white px-4 py-2 text-sm font-medium text-zinc-800 shadow-sm transition hover:-translate-y-0.5 hover:border-zinc-400 hover:shadow"
                >
                  <span
                    aria-hidden="true"
                    className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-zinc-100 text-xs text-zinc-700 transition group-hover:translate-x-0.5"
                  >
                    ↗
                  </span>
                  <span>{websiteLabel}</span>
                </a>
              ) : null}

              <Link
                href={backLink}
                className="group inline-flex items-center gap-2 rounded-full border border-zinc-300 bg-white px-4 py-2 text-sm font-medium text-zinc-800 shadow-sm transition hover:-translate-y-0.5 hover:border-zinc-400 hover:shadow"
              >
                <span
                  aria-hidden="true"
                  className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-zinc-100 text-xs text-zinc-700 transition group-hover:-translate-x-0.5"
                >
                  ←
                </span>
                <span>{backLabel}</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
