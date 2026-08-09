import Link from "next/link";
import AppImage from "@/components/AppImage";
import { bookstoreName, bookstoreUrl, booksIntro, crownBooks } from "@/content/crown/books";
import { crownPageCopy } from "@/content/crown/copy";
import { normalizeLocale, pickLocalizedValue, withLocale } from "@/lib/i18n";

export default async function CrownBooksPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const normalizedLocale = normalizeLocale(locale);

  return (
    <main className="mx-auto max-w-4xl px-6 pt-28 pb-16 md:pt-32">
      <Link href={withLocale(normalizedLocale, "/crown")} className="text-sm underline text-body-color-token">
        {pickLocalizedValue(normalizedLocale, crownPageCopy.backToCrown)}
      </Link>

      <div className="relative mt-6 aspect-[21/9] w-full overflow-hidden rounded-2xl bg-surface-b">
        <AppImage mediaKey="crownBooksBanner" locale={normalizedLocale} fill sizes="(max-width: 896px) 100vw, 896px" className="object-cover object-center" />
      </div>

      <h1 className="mt-6 text-3xl font-semibold text-heading-token md:text-4xl">
        {pickLocalizedValue(normalizedLocale, crownPageCopy.booksTitle)}
      </h1>
      <p className="mt-4 text-body-token leading-relaxed text-body-color-token">
        {pickLocalizedValue(normalizedLocale, booksIntro)}
      </p>

      <section className="mt-8 space-y-4">
        {crownBooks.map((book) => (
          <div key={book.title.en} className="card-base bg-surface-b flex flex-col gap-5 p-6 sm:flex-row">
            <div className="relative mx-auto flex aspect-[3/4] w-32 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-surface-a shadow-sm sm:mx-0">
              {book.image ? (
                <AppImage
                  mediaKey={book.image}
                  locale={normalizedLocale}
                  fill
                  sizes="128px"
                  className="object-contain"
                />
              ) : (
                <svg viewBox="0 0 24 24" className="h-10 w-10 text-[var(--accent)]" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 5.5A1.5 1.5 0 0 1 5.5 4H18a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1H5.5A1.5 1.5 0 0 0 4 20.5zM19 16H5.5A1.5 1.5 0 0 0 4 17.5" />
                </svg>
              )}
            </div>
            <div>
              <h2 className="text-lg font-semibold text-heading-token">
                {pickLocalizedValue(normalizedLocale, book.title)}
              </h2>
              <p className="text-body-token mt-2 text-body-color-token">
                {pickLocalizedValue(normalizedLocale, book.description)}
              </p>
            </div>
          </div>
        ))}
      </section>

      <div className="mt-8 flex flex-wrap items-center gap-3">
        <span className="text-body-token text-body-color-token">
          {normalizedLocale === "en" ? "To purchase, please contact " : "購書者請洽 "}
          {pickLocalizedValue(normalizedLocale, bookstoreName)}
        </span>
        <a
          href={bookstoreUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-base btn-secondary focus-ring-token"
        >
          {pickLocalizedValue(normalizedLocale, crownPageCopy.visitBookstore)}
        </a>
      </div>
    </main>
  );
}
