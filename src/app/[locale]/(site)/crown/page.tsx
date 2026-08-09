import Link from "next/link";
import AppImage from "@/components/AppImage";
import SectionHeader from "@/components/home/SectionHeader";
import { crownPageCopy, crownScripture, crownScriptureRef } from "@/content/crown/copy";
import { normalizeLocale, pickLocalizedValue, withLocale } from "@/lib/i18n";

const sectionCards = [
  { key: "about", href: "/crown/about", copy: crownPageCopy.sections.about },
  { key: "courses", href: "/crown/courses", copy: crownPageCopy.sections.courses },
  { key: "assessment", href: "/crown/assessment", copy: crownPageCopy.sections.assessment },
  { key: "books", href: "/crown/books", copy: crownPageCopy.sections.books },
  { key: "articles", href: "/crown/articles", copy: crownPageCopy.sections.articles },
] as const;

export default async function CrownPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const normalizedLocale = normalizeLocale(locale);

  return (
    <main className="bg-surface-a pb-0">
      <section className="relative w-full overflow-hidden bg-stats-token text-white">
        <AppImage mediaKey="crownHero" locale={normalizedLocale} fill className="object-cover object-center" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/55 to-black/75" />
        <div className="relative flex min-h-[360px] flex-col items-center justify-center px-6 pb-12 pt-32 text-center md:min-h-[520px] md:pt-28">
          <div className="max-w-3xl space-y-5">
            <h1 className="text-xl font-semibold leading-tight md:text-4xl">
              {pickLocalizedValue(normalizedLocale, crownPageCopy.heroTitle)}
            </h1>
            <p className="text-sm leading-relaxed text-dk-title-token md:text-base">
              {pickLocalizedValue(normalizedLocale, crownScripture)}
            </p>
            <p className="text-xs font-semibold uppercase tracking-wide text-dk-title-token">
              {pickLocalizedValue(normalizedLocale, crownScriptureRef)}
            </p>
          </div>
        </div>
      </section>

      <section className="bg-rhythm-b section-rhythm-divider">
        <div className="section-container-medium section-block-tight space-y-4">
          <p className="mx-auto max-w-3xl text-center text-body-token text-body-color-token md:text-lg">
            {pickLocalizedValue(normalizedLocale, crownPageCopy.heroTagline)}
          </p>
        </div>
      </section>

      <section className="bg-rhythm-a section-rhythm-divider">
        <div className="section-container-medium section-block-tight space-y-6">
          <SectionHeader
            title={pickLocalizedValue(normalizedLocale, crownPageCopy.exploreTitle)}
            titleClassName="text-h3-token md:text-h2-token"
          />
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {sectionCards.map((card) => (
              <Link
                key={card.key}
                href={withLocale(normalizedLocale, card.href)}
                className="card-base card-base-hover bg-surface-b p-5 transition-colors"
              >
                <h3 className="text-lg font-semibold text-heading-token">
                  {pickLocalizedValue(normalizedLocale, card.copy.title)}
                </h3>
                <p className="text-body-token mt-2 text-body-color-token">
                  {pickLocalizedValue(normalizedLocale, card.copy.description)}
                </p>
                <span className="link-primary mt-3 inline-block text-sm font-semibold">
                  {pickLocalizedValue(normalizedLocale, crownPageCopy.learnMore)} →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-stats-token section-rhythm-divider">
        <div className="section-container-medium section-block-tight text-heading-token">
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
            <div>
              <h2 className="font-display text-h2-token text-dk-title-token font-semibold">
                {pickLocalizedValue(normalizedLocale, crownPageCopy.givingTitle)}
              </h2>
              <p className="text-body-token text-stats-label-token mt-2 max-w-3xl">
                {pickLocalizedValue(normalizedLocale, crownPageCopy.givingIntro)}
              </p>
            </div>
            <Link
              href={withLocale(normalizedLocale, "/donation")}
              className="btn-base btn-donation-cta focus-ring-token pt-3 pt-2.5"
            >
              {pickLocalizedValue(normalizedLocale, crownPageCopy.givingCta)}
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
