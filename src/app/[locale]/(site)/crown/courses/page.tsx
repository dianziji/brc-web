import Link from "next/link";
import AppImage from "@/components/AppImage";
import { crownPageCopy } from "@/content/crown/copy";
import {
  courseRegistrationUrl,
  courseResources,
  coursesIntro,
  smallGroupGoals,
  smallGroupGoalsTitle,
} from "@/content/crown/courses";
import { normalizeLocale, pickLocalizedValue, withLocale } from "@/lib/i18n";

export default async function CrownCoursesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const normalizedLocale = normalizeLocale(locale);

  return (
    <main className="mx-auto max-w-4xl px-6 pt-28 pb-16 md:pt-32">
      <Link href={withLocale(normalizedLocale, "/crown")} className="text-sm underline text-body-color-token">
        {pickLocalizedValue(normalizedLocale, crownPageCopy.backToCrown)}
      </Link>

      <h1 className="mt-6 text-3xl font-semibold text-heading-token md:text-4xl">
        {pickLocalizedValue(normalizedLocale, crownPageCopy.coursesTitle)}
      </h1>
      <p className="mt-4 text-body-token leading-relaxed text-body-color-token">
        {pickLocalizedValue(normalizedLocale, coursesIntro)}
      </p>

      <section className="mt-8 grid gap-4 md:grid-cols-2">
        {courseResources.map((resource) => (
          <div key={resource.title.en} className="card-base bg-surface-b p-5">
            <h2 className="text-lg font-semibold text-heading-token">
              {pickLocalizedValue(normalizedLocale, resource.title)}
            </h2>
            <p className="text-body-token mt-2 text-body-color-token">
              {pickLocalizedValue(normalizedLocale, resource.description)}
            </p>
            <div className="mt-4 flex flex-wrap gap-4">
              {resource.images.map((img) => (
                <figure key={img.key} className="w-28">
                  <div className="relative aspect-[3/4] w-full overflow-hidden rounded-lg bg-surface-a shadow-sm">
                    <AppImage
                      mediaKey={img.key}
                      locale={normalizedLocale}
                      fill
                      sizes="112px"
                      className="object-contain"
                    />
                  </div>
                  <figcaption className="mt-1 text-center text-xs text-muted-token">
                    {pickLocalizedValue(normalizedLocale, img.label)}
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        ))}
      </section>

      <section className="mt-10 card-base bg-accent-weak p-6 md:p-8">
        <h2 className="text-h3-token font-semibold text-heading-token">
          {pickLocalizedValue(normalizedLocale, smallGroupGoalsTitle)}
        </h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          {smallGroupGoals.map((goal) => (
            <div key={goal.keyword.en} className="flex gap-3">
              <span className="text-xl font-semibold text-[var(--accent-strong)]">
                {pickLocalizedValue(normalizedLocale, goal.keyword)}
              </span>
              <span className="text-body-token pt-1 text-body-color-token">
                {pickLocalizedValue(normalizedLocale, goal.description)}
              </span>
            </div>
          ))}
        </div>
      </section>

      <div className="mt-8">
        <a
          href={courseRegistrationUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-base btn-primary focus-ring-token"
        >
          {pickLocalizedValue(normalizedLocale, crownPageCopy.registerCta)}
        </a>
      </div>
    </main>
  );
}
