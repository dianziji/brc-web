import Link from "next/link";
import { notFound } from "next/navigation";
import AppImage from "@/components/AppImage";
import { crownArticles, findArticleBySlug } from "@/content/crown/articles";
import { crownPageCopy } from "@/content/crown/copy";
import { locales, normalizeLocale, pickLocalizedValue, withLocale } from "@/lib/i18n";

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    crownArticles.map((article) => ({ locale, slug: article.slug }))
  );
}

export default async function CrownArticleDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const normalizedLocale = normalizeLocale(locale);

  const article = findArticleBySlug(slug);
  if (!article) {
    notFound();
  }

  return (
    <main className="mx-auto max-w-3xl px-6 pt-28 pb-16 md:pt-32">
      <Link
        href={withLocale(normalizedLocale, "/crown/articles")}
        className="text-sm underline text-body-color-token"
      >
        {pickLocalizedValue(normalizedLocale, crownPageCopy.backToArticles)}
      </Link>

      <article className="mt-6">
        <h1 className="text-3xl font-semibold leading-tight text-heading-token md:text-4xl">
          {pickLocalizedValue(normalizedLocale, article.title)}
        </h1>
        <div className="mt-2 flex flex-wrap gap-x-3 text-sm text-muted-token">
          <span>{pickLocalizedValue(normalizedLocale, article.author)}</span>
          <span>{pickLocalizedValue(normalizedLocale, article.displayDate)}</span>
          <span>{pickLocalizedValue(normalizedLocale, article.readingTime)}</span>
        </div>

        {article.image ? (
          <div className="relative mt-6 aspect-[16/9] w-full overflow-hidden rounded-2xl bg-surface-b">
            <AppImage
              mediaKey={article.image}
              locale={normalizedLocale}
              fill
              sizes="(max-width: 768px) 100vw, 768px"
              className="object-contain"
            />
          </div>
        ) : null}

        <div className="mt-8 space-y-8">
          {article.sections.map((section, sectionIndex) => (
            <section key={section.heading ? section.heading.en : `section-${sectionIndex}`}>
              {section.heading ? (
                <h2 className="text-h3-token font-semibold text-heading-token">
                  {pickLocalizedValue(normalizedLocale, section.heading)}
                </h2>
              ) : null}
              <div className={`space-y-4 ${section.heading ? "mt-3" : ""}`}>
                {section.paragraphs.map((paragraph, paragraphIndex) => (
                  <p
                    key={`${sectionIndex}-${paragraphIndex}`}
                    className="text-body-token leading-relaxed text-body-color-token"
                  >
                    {pickLocalizedValue(normalizedLocale, paragraph)}
                  </p>
                ))}
              </div>
            </section>
          ))}
        </div>
      </article>
    </main>
  );
}
