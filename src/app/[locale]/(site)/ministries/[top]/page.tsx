import Link from "next/link";
import AppImage from "@/components/AppImage";
import { getFixedTopSection, getFixedTopTitle } from "@/content/ministries/top-sections";
import { resolveCmsImageUrl } from "@/lib/cms-media";
import { getMinistriesListSafeResult } from "@/lib/ministries";
import { getMessages, normalizeLocale, pickLocalized, withLocale } from "@/lib/i18n";

export const revalidate = 60;

function stripHtml(value: string): string {
  return value.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
}

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string; top: string }>;
}) {
  const { locale, top } = await params;
  const normalizedLocale = normalizeLocale(locale);
  const messages = getMessages(normalizedLocale);
  const { items, degraded } = await getMinistriesListSafeResult(top);
  const topSection = getFixedTopSection(top);
  const topTitle = getFixedTopTitle(top, normalizedLocale);
  const topDesc = topSection
    ? normalizedLocale === "en"
      ? topSection.descEn
      : topSection.descZh
    : messages.ministries.highlightBody;
  const backLabel = messages.ministries.back.replace(/^←\s*/, "");
  const retryLink = withLocale(normalizedLocale, `/ministries/${top}`);
  const degradedTitle =
    normalizedLocale === "en" ? "This section is temporarily unavailable." : "此分類內容暫時不可用。";
  const degradedBody =
    normalizedLocale === "en"
      ? "The content service timed out. Please retry in a moment."
      : "內容服務請求超時，請稍後重試。";
  const retryLabel = normalizedLocale === "en" ? "Retry now" : "立即重試";
  const comingSoonLabel = normalizedLocale === "en" ? "Content is coming soon." : "內容準備中，敬請期待。";

  return (
    <main className="pb-10">
      <section className="relative w-full overflow-hidden bg-zinc-950 text-white">
        <div className="relative h-[280px] w-full md:h-[360px]">
          {topSection ? (
            <AppImage mediaKey={topSection.imageKey} locale={normalizedLocale} alt={topTitle} fill className="object-cover object-center" />
          ) : (
            <div className="h-full w-full bg-zinc-800" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/35 to-transparent" />
        </div>
        <div className="absolute inset-0 flex items-end">
          <div className="mx-auto w-full max-w-6xl space-y-2 px-6 pb-8 pt-24 md:pt-28">
            <h1 className="text-3xl font-semibold md:text-5xl">{topTitle}</h1>
            <p className="max-w-3xl text-sm text-zinc-200 md:text-base">{topDesc}</p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl space-y-8 px-6 pt-10 md:pt-12">
        <Link
          href={withLocale(normalizedLocale, "/ministries")}
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

        {items.length === 0 ? (
          degraded ? (
            <div className="rounded-lg border border-amber-200 bg-amber-50 p-4 text-amber-900">
              <h2 className="text-sm font-semibold">{degradedTitle}</h2>
              <p className="mt-1 text-sm">{degradedBody}</p>
              <a className="mt-3 inline-flex text-sm font-medium underline" href={retryLink}>
                {retryLabel}
              </a>
            </div>
          ) : (
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 text-sm text-zinc-700">
              {comingSoonLabel}
            </div>
          )
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {items.map((item) => {
              const title = pickLocalized(normalizedLocale, {
                en: item.fields.titleEn,
                zh: item.fields.titleZh,
                fallback: item.slug,
              });
              const summary = stripHtml(
                pickLocalized(normalizedLocale, {
                  en: item.fields.summaryEn,
                  zh: item.fields.summaryZh,
                })
              );
              const link = withLocale(normalizedLocale, `/ministries/${top}/${item.slug}`);
              const heroSrc = resolveCmsImageUrl(item.fields.heroImage?.node?.sourceUrl);
              const heroAlt = item.fields.heroImage?.node?.altText || title;

              return (
                <a
                  key={item.slug}
                  href={link}
                  className="group overflow-hidden rounded-xl border border-zinc-200 bg-white transition hover:shadow-sm"
                >
                  {heroSrc ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={heroSrc}
                      alt={heroAlt}
                      className="h-44 w-full object-cover object-center"
                    />
                  ) : (
                    <div className="h-44 w-full bg-zinc-100" />
                  )}
                  <div className="space-y-3 p-4">
                    <div className="text-lg font-semibold text-zinc-900">{title}</div>
                    <p className="line-clamp-3 text-sm text-zinc-600">{summary}</p>
                    <span className="inline-flex text-sm font-medium text-zinc-900 underline">
                      {messages.ministries.detailsCta}
                    </span>
                  </div>
                </a>
              );
            })}
          </div>
        )}
      </section>
    </main>
  );
}
