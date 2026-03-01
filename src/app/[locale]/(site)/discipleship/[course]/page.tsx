import Link from "next/link";
import { notFound } from "next/navigation";
import { discipleshipDetailPageCopy } from "@/content/discipleship/copy";
import { findDetailById, findProgramById } from "@/lib/discipleship";
import { normalizeLocale, pickLocalized, pickLocalizedValue, withLocale } from "@/lib/i18n";

export default async function DiscipleshipDetailPage({
  params,
}: {
  params: Promise<{ locale: string; course: string }>;
}) {
  const { locale, course } = await params;
  const normalizedLocale = normalizeLocale(locale);

  const detail = findDetailById(course);
  if (!detail) {
    notFound();
  }

  const program = findProgramById(course);
  const title = pickLocalized(normalizedLocale, {
    zh: detail.titleZh,
    en: detail.titleEn,
    fallback: course,
  });
  const subtitle = pickLocalized(normalizedLocale, {
    zh: detail.subtitleZh,
    en: detail.subtitleEn,
  });
  const programSummary = program
    ? pickLocalized(normalizedLocale, {
        zh: program.summaryZh,
        en: program.summaryEn,
      })
    : null;
  const purpose = pickLocalized(normalizedLocale, { zh: detail.purposeZh, en: detail.purposeEn });
  const target = pickLocalized(normalizedLocale, { zh: detail.targetZh, en: detail.targetEn });
  const points = pickLocalizedValue(normalizedLocale, {
    zh: detail.pointsZh,
    en: detail.pointsEn,
  });
  const schedule = pickLocalizedValue(normalizedLocale, {
    zh: detail.scheduleZh,
    en: detail.scheduleEn,
  });

  return (
    <main className="mx-auto max-w-5xl px-6 pt-28 pb-16 md:pt-32">
      <Link href={withLocale(normalizedLocale, "/discipleship")} className="text-sm underline text-body-color-token">
        {pickLocalizedValue(normalizedLocale, discipleshipDetailPageCopy.backToDiscipleship)}
      </Link>

      <section className="mt-6 rounded-2xl border border-token bg-surface-a p-6 md:p-8">
        <h1 className="text-3xl font-semibold">{title}</h1>
        <p className="mt-2 text-sm text-body-color-token">{subtitle}</p>

        {programSummary ? <p className="mt-3 text-sm text-body-color-token">{programSummary}</p> : null}

        <div className="mt-8 grid gap-8 md:grid-cols-2">
          <div className="space-y-4">
            <div>
              <h2 className="text-base font-semibold">
                {pickLocalizedValue(normalizedLocale, discipleshipDetailPageCopy.purposeTitle)}
              </h2>
              <p className="mt-2 text-sm text-body-color-token">{purpose}</p>
            </div>
            <div>
              <h2 className="text-base font-semibold">
                {pickLocalizedValue(normalizedLocale, discipleshipDetailPageCopy.goalTitle)}
              </h2>
              <p className="mt-2 text-sm text-body-color-token">{target}</p>
            </div>
          </div>

          <div>
            <h2 className="text-base font-semibold">
              {pickLocalizedValue(normalizedLocale, discipleshipDetailPageCopy.learningContentTitle)}
            </h2>
            <ul className="mt-3 space-y-2 text-sm text-body-color-token">
              {points.map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-8 rounded-xl border border-token bg-surface-b p-5">
          <h2 className="text-base font-semibold">
            {pickLocalizedValue(normalizedLocale, discipleshipDetailPageCopy.scheduleTitle)}
          </h2>
          <ul className="mt-3 space-y-2 text-sm text-body-color-token">
            {schedule.map((item) => (
              <li key={item}>• {item}</li>
            ))}
          </ul>

          <div className="mt-5 flex flex-wrap gap-3">
            {program?.applyUrl ? (
              <a
                href={program.applyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex rounded-full bg-[var(--accent)] px-4 py-2 text-sm font-semibold text-black"
              >
                {pickLocalizedValue(normalizedLocale, discipleshipDetailPageCopy.applyCta)}
              </a>
            ) : null}
            {detail.referenceUrl ? (
              <a
                href={detail.referenceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex rounded-full border border-token px-4 py-2 text-sm font-medium text-body-color-token"
              >
                {pickLocalizedValue(normalizedLocale, discipleshipDetailPageCopy.externalReferenceCta)}
              </a>
            ) : null}
          </div>
        </div>
      </section>
    </main>
  );
}
