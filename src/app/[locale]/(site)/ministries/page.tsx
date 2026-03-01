import MinistriesHeroMap from "@/components/MinistriesHeroMap";
import MinistryCarousel from "@/components/MinistryCarousel";
import AppImage from "@/components/AppImage";
import SectionHeader from "@/components/home/SectionHeader";
import { fixedTopSections, getFixedTopTitle } from "@/content/ministries/top-sections";
import { resolveCmsImageUrl } from "@/lib/cms-media";
import { getMinistriesListSafeResult } from "@/lib/ministries";
import { getMessages, normalizeLocale, pickLocalized, withLocale } from "@/lib/i18n";

export const revalidate = 60;

export default async function MinistriesIndex({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const normalizedLocale = normalizeLocale(locale);
  const messages = getMessages(normalizedLocale);
  const archiveDetailsLabel = normalizedLocale === "en" ? "View details" : "查看詳情";
  const { items, degraded } = await getMinistriesListSafeResult();
  const retryLink = withLocale(normalizedLocale, "/ministries");
  const degradedTitle =
    normalizedLocale === "en" ? "Some ministry content is temporarily unavailable." : "部分事工內容暫時不可用。";
  const degradedBody =
    normalizedLocale === "en"
      ? "We are retrying in the background. You can refresh to try again."
      : "我們正在背景重試，你可以重新整理再試一次。";
  const retryLabel = normalizedLocale === "en" ? "Retry now" : "立即重試";

  const slides = items
    .map((item) => {
      const heroSrc = resolveCmsImageUrl(item.fields.heroImage?.node?.sourceUrl);
      if (!heroSrc || !item.section.top) return null;
      const title = pickLocalized(normalizedLocale, {
        en: item.fields.titleEn,
        zh: item.fields.titleZh,
        fallback: item.slug,
      });
      const subtitle = item.section.top ? getFixedTopTitle(item.section.top, normalizedLocale) : item.section.topName || "";
      return {
        title,
        subtitle,
        src: heroSrc,
        href: withLocale(normalizedLocale, `/ministries/${item.section.top}/${item.slug}`),
      };
    })
    .filter((item): item is NonNullable<typeof item> => Boolean(item))
    .slice(0, 8);

  return (
    <main className="bg-surface-a pb-16">
      <section className="relative w-full overflow-hidden bg-align-token text-white">
        <div className="relative h-[320px] w-full md:h-[480px]">
          <MinistriesHeroMap className="absolute inset-0 h-full w-full" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/40 to-black/70" />
        </div>
        <div className="absolute inset-0 flex items-center justify-center px-6 pt-24 text-center md:pt-32">
          <div className="max-w-3xl space-y-4">
            <h1 className="text-3xl font-semibold md:text-5xl">{messages.ministries.indexTitle}</h1>
            <p className="text-base text-dk-title-token md:text-lg">{messages.ministries.indexBody}</p>
          </div>
        </div>
      </section>

      <section className="w-full bg-rhythm-b section-rhythm-divider">
        <div className="grid grid-cols-1 gap-0 md:grid-cols-3">
          {fixedTopSections.map((item) => (
            <a
              key={item.slug}
              href={withLocale(normalizedLocale, `/ministries/${item.slug}`)}
              className="group relative block min-h-[300px] overflow-hidden md:min-h-[420px]"
            >
              <AppImage
                mediaKey={item.imageKey}
                locale={normalizedLocale}
                alt={normalizedLocale === "en" ? item.titleEn : item.titleZh}
                fill
                className="object-cover object-center transition duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />
              <div className="absolute bottom-0 left-0 z-10 max-w-[90%] space-y-2 p-6 text-white md:p-8">
                <h2 className="text-2xl font-semibold md:text-3xl">
                  {normalizedLocale === "en" ? item.titleEn : item.titleZh}
                </h2>
                <p className="text-sm text-dk-title-token md:text-base">
                  {normalizedLocale === "en" ? item.descEn : item.descZh}
                </p>
                <span className="link-inverse inline-flex text-sm">{messages.ministries.detailsCta}</span>
              </div>
            </a>
          ))}
        </div>
      </section>

      <section className="bg-rhythm-a section-rhythm-divider">
        <div className="section-container-medium section-block-tight space-y-12">
        {degraded ? (
          <section className="card-base border-token bg-accent-weak p-4 text-[var(--accent-strong)]">
            <h2 className="text-base font-semibold">{degradedTitle}</h2>
            <p className="mt-1 text-sm">{degradedBody}</p>
            <a className="link-primary mt-3 inline-flex text-sm" href={retryLink}>
              {retryLabel}
            </a>
          </section>
        ) : null}

        {slides.length > 0 ? (
          <section className="w-full space-y-4">
            <SectionHeader
              title={messages.ministries.highlightTitle}
              cta={{
                label: messages.ministries.detailsCta,
                href: withLocale(normalizedLocale, "/ministries/archive"),
              }}
              titleClassName="text-h3-token md:text-h2-token"
            />
            <MinistryCarousel slides={slides} detailsLabel={messages.ministries.detailsCta} />
          </section>
        ) : null}

        <section className="card-base border-dashed border-token bg-surface-b p-6 md:p-8">
          <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
            <div>
              <h2 className="text-h3-token text-heading-token font-semibold">{messages.ministries.archiveTitle}</h2>
              <p className="text-body-token text-body-color-token mt-2">{messages.ministries.archiveBody}</p>
            </div>
            <a className="btn-base btn-secondary focus-ring-token" href={withLocale(normalizedLocale, "/ministries/archive")}>
              {archiveDetailsLabel}
            </a>
          </div>
        </section>
        </div>
      </section>
    </main>
  );
}
