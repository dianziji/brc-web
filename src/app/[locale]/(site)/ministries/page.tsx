import MinistriesHeroMap from "@/components/MinistriesHeroMap";
import MinistryCarousel from "@/components/MinistryCarousel";
import { fixedTopSections, getFixedTopTitle } from "@/lib/ministries-top-sections";
import { getMinistriesList } from "@/lib/ministries";
import { getMessages, normalizeLocale, pickLocalized, withLocale } from "@/lib/i18n";

export const revalidate = 60;

export default async function MinistriesIndex({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const normalizedLocale = normalizeLocale(locale);
  const messages = getMessages(normalizedLocale);
  const archiveDetailsLabel = normalizedLocale === "en" ? "View details" : "查看详情";
  const items = await getMinistriesList();

  const slides = items
    .filter((item) => item.fields.heroImage?.node?.sourceUrl && item.section.top)
    .slice(0, 8)
    .map((item) => {
      const title = pickLocalized(normalizedLocale, {
        en: item.fields.titleEn,
        zh: item.fields.titleZh,
        fallback: item.slug,
      });
      const subtitle = item.section.top ? getFixedTopTitle(item.section.top, normalizedLocale) : item.section.topName || "";
      return {
        title,
        subtitle,
        src: item.fields.heroImage?.node?.sourceUrl as string,
        href: withLocale(normalizedLocale, `/ministries/${item.section.top}/${item.slug}`),
      };
    });

  return (
    <main className="pb-10">
      <section className="relative w-full overflow-hidden bg-zinc-950 text-white">
        <div className="relative h-[320px] w-full md:h-[480px]">
          <MinistriesHeroMap className="absolute inset-0 h-full w-full" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/40 to-black/70" />
        </div>
        <div className="absolute inset-0 flex items-center justify-center px-6 pt-24 text-center md:pt-32">
          <div className="max-w-3xl space-y-4">
            <h1 className="text-3xl font-semibold md:text-5xl">{messages.ministries.indexTitle}</h1>
            <p className="text-base text-zinc-200 md:text-lg">{messages.ministries.indexBody}</p>
          </div>
        </div>
      </section>

      <section className="w-full">
        <div className="grid grid-cols-1 gap-0 md:grid-cols-3">
          {fixedTopSections.map((item) => (
            <a
              key={item.slug}
              href={withLocale(normalizedLocale, `/ministries/${item.slug}`)}
              className="group relative block min-h-[300px] overflow-hidden md:min-h-[420px]"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={item.imageSrc}
                alt={normalizedLocale === "en" ? item.titleEn : item.titleZh}
                className="h-full w-full object-cover object-center transition duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-transparent" />
              <div className="absolute bottom-0 left-0 z-10 max-w-[90%] space-y-2 p-6 text-white md:p-8">
                <h2 className="text-2xl font-semibold md:text-3xl">
                  {normalizedLocale === "en" ? item.titleEn : item.titleZh}
                </h2>
                <p className="text-sm text-zinc-100 md:text-base">
                  {normalizedLocale === "en" ? item.descEn : item.descZh}
                </p>
                <span className="inline-flex text-sm font-medium underline underline-offset-2">
                  {messages.ministries.detailsCta}
                </span>
              </div>
            </a>
          ))}
        </div>
      </section>

      <div className="mx-auto max-w-6xl space-y-14 px-6 pt-10 md:pt-16">
        {slides.length > 0 ? (
          <section className="w-full">
            <MinistryCarousel slides={slides} detailsLabel={messages.ministries.detailsCta} />
          </section>
        ) : null}

        <section className="rounded-2xl border border-dashed border-zinc-300 bg-zinc-50 p-8">
          <h2 className="mt-2 text-2xl font-semibold">{messages.ministries.archiveTitle}</h2>
          <p className="mt-2 text-sm text-zinc-600">{messages.ministries.archiveBody}</p>
          <a
            className="mt-4 inline-flex text-sm font-medium text-zinc-900 underline"
            href={withLocale(normalizedLocale, "/ministries/archive")}
          >
            {archiveDetailsLabel}
          </a>
        </section>
      </div>
    </main>
  );
}
