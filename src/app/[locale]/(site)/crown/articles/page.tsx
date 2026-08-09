import Link from "next/link";
import AppImage from "@/components/AppImage";
import { crownArticles, externalBlogs } from "@/content/crown/articles";
import { crownPageCopy } from "@/content/crown/copy";
import { normalizeLocale, pickLocalizedValue, withLocale } from "@/lib/i18n";

export default async function CrownArticlesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const normalizedLocale = normalizeLocale(locale);

  return (
    <main className="mx-auto max-w-4xl px-6 pt-28 pb-16 md:pt-32">
      <Link href={withLocale(normalizedLocale, "/crown")} className="text-sm underline text-body-color-token">
        {pickLocalizedValue(normalizedLocale, crownPageCopy.backToCrown)}
      </Link>

      <h1 className="mt-6 text-3xl font-semibold text-heading-token md:text-4xl">
        {pickLocalizedValue(normalizedLocale, crownPageCopy.articlesTitle)}
      </h1>

      <section className="mt-8 space-y-4">
        {crownArticles.map((article) => (
          <Link
            key={article.slug}
            href={withLocale(normalizedLocale, `/crown/articles/${article.slug}`)}
            className="card-base card-base-hover flex flex-col gap-5 bg-surface-b p-6 sm:flex-row"
          >
            {article.image ? (
              <div className="relative aspect-[4/3] w-full shrink-0 overflow-hidden rounded-lg bg-surface-a sm:w-40">
                <AppImage
                  mediaKey={article.image}
                  locale={normalizedLocale}
                  fill
                  sizes="(max-width: 640px) 100vw, 160px"
                  className="object-cover"
                />
              </div>
            ) : null}
            <div>
              <h2 className="text-lg font-semibold text-heading-token">
                {pickLocalizedValue(normalizedLocale, article.title)}
              </h2>
              <div className="mt-1 flex flex-wrap gap-x-3 text-xs text-muted-token">
                <span>{pickLocalizedValue(normalizedLocale, article.author)}</span>
                <span>{pickLocalizedValue(normalizedLocale, article.displayDate)}</span>
                <span>{pickLocalizedValue(normalizedLocale, article.readingTime)}</span>
              </div>
              <p className="text-body-token mt-3 text-body-color-token">
                {pickLocalizedValue(normalizedLocale, article.excerpt)}
              </p>
              <span className="link-primary mt-3 inline-block text-sm font-semibold">
                {pickLocalizedValue(normalizedLocale, crownPageCopy.readArticle)} →
              </span>
            </div>
          </Link>
        ))}
      </section>

      {externalBlogs.length > 0 ? (
        <section className="mt-8 border-t border-token pt-6">
          <div className="flex flex-wrap gap-3">
            {externalBlogs.map((blog) => (
              <a
                key={blog.url}
                href={blog.url}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-base btn-secondary focus-ring-token"
              >
                {pickLocalizedValue(normalizedLocale, blog.title)} ↗
              </a>
            ))}
          </div>
        </section>
      ) : null}
    </main>
  );
}
