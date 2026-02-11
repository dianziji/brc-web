import Link from "next/link";
import { getMinistryDetail } from "@/lib/ministries";
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
  const data = await getMinistryDetail(slug);
  const backLink = withLocale(normalizedLocale, `/ministries/${top}`);
  const backLabel = messages.common.back.replace(/^←\s*/, "");
  const websiteLabel = normalizedLocale === "en" ? "Visit ministry website" : "查看事工网站";

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
        <div className="rounded-lg border border-amber-200 bg-amber-50 p-3 text-sm text-amber-900">
          {messages.common.notFound}
        </div>
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

  return (
    <main className="bg-white pt-20 md:pt-24">
      <section className="grid min-h-[calc(100vh-5rem)] md:grid-cols-2">
        <div className="relative min-h-[300px] md:min-h-[calc(100vh-6rem)]">
          {data.fields.heroImage?.node?.sourceUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={data.fields.heroImage.node.sourceUrl}
              alt={data.fields.heroImage.node.altText || title}
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
                  rel="noreferrer noopener"
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
