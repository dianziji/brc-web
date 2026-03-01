import AppImage from "@/components/AppImage";
import SectionHeader from "@/components/home/SectionHeader";
import Link from "next/link";
import {
  discipleshipLearningStepLabel,
  discipleshipPageCopy,
  discipleshipStatusLabels,
} from "@/content/discipleship/copy";
import {
  discipleshipLearningPathSteps,
  discipleshipTrackSections,
  type DiscipleshipTrackKey,
} from "@/content/discipleship/overview";
import { normalizeLocale, pickLocalized, pickLocalizedValue, type Locale, withLocale } from "@/lib/i18n";
import { hasLocalDetail, programs, type ProgramStatus } from "@/lib/discipleship";

function statusMeta(locale: Locale, status: ProgramStatus) {
  if (status === "ready") {
    return {
      label: pickLocalizedValue(locale, discipleshipStatusLabels.ready),
      className: "border-emerald-200 bg-emerald-50 text-emerald-700",
    };
  }
  if (status === "comingSoon") {
    return {
      label: pickLocalizedValue(locale, discipleshipStatusLabels.comingSoon),
      className: "border-token bg-accent-weak text-[var(--accent-strong)]",
    };
  }
  return {
    label: pickLocalizedValue(locale, discipleshipStatusLabels.external),
    className: "border-token bg-surface-b text-body-color-token",
  };
}

function isConstructionLink(url?: string) {
  return Boolean(url?.includes("underconstruction"));
}

export default async function DiscipleshipPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const normalizedLocale = normalizeLocale(locale);

  const readyCount = programs.filter((item) => item.status === "ready").length;
  const comingSoonCount = programs.filter((item) => item.status === "comingSoon").length;
  const externalCount = programs.filter((item) => item.status === "external").length;
  const discipleshipPrograms = programs.filter((item) => item.track === "discipleship");
  const equippingPrograms = programs.filter((item) => item.track === "equipping");
  const programsByTrack: Record<DiscipleshipTrackKey, typeof programs> = {
    discipleship: discipleshipPrograms,
    equipping: equippingPrograms,
  };

  return (
    <main className="bg-surface-a pb-0">
      <section className="relative w-full overflow-hidden bg-stats-token text-white">
        <div className="relative h-[320px] w-full md:h-[480px]">
          <AppImage mediaKey="discipleshipHero" locale={normalizedLocale} fill className="object-cover object-center" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/45 to-black/70" />
        </div>
        <div className="absolute inset-0 flex items-center justify-center text-center px-6 pt-24 md:pt-32">
          <div className="max-w-3xl space-y-4">
            <h1 className="text-3xl font-semibold leading-tight md:text-5xl">
              {pickLocalizedValue(normalizedLocale, discipleshipPageCopy.heroTitle)}
            </h1>
            <p className="text-sm text-dk-title-token md:text-base">
              {pickLocalizedValue(normalizedLocale, discipleshipPageCopy.heroBody)}
            </p>
          </div>
        </div>
      </section>

      <section className="bg-rhythm-a section-rhythm-divider">
        <div className="section-container-medium section-block-tight">
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="card-base p-4 md:p-5">
              <div className="text-h2-token text-heading-token font-semibold">{readyCount}</div>
              <div className="text-body-token mt-1 text-body-color-token">
                {pickLocalizedValue(normalizedLocale, discipleshipPageCopy.openPrograms)}
              </div>
            </div>
            <div className="card-base p-4 md:p-5">
              <div className="text-h2-token text-heading-token font-semibold">{comingSoonCount}</div>
              <div className="text-body-token mt-1 text-body-color-token">
                {pickLocalizedValue(normalizedLocale, discipleshipPageCopy.comingSoonPrograms)}
              </div>
            </div>
            <div className="card-base p-4 md:p-5">
              <div className="text-h2-token text-heading-token font-semibold">{externalCount}</div>
              <div className="text-body-token mt-1 text-body-color-token">
                {pickLocalizedValue(normalizedLocale, discipleshipPageCopy.externalTracks)}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-rhythm-b section-rhythm-divider">
        <div className="section-container-medium section-block-tight space-y-6">
          <SectionHeader
            title={pickLocalizedValue(normalizedLocale, discipleshipPageCopy.twoTrackTitle)}
            titleClassName="text-h3-token md:text-h2-token"
          />
          <p className="text-body-token text-body-color-token max-w-4xl">
            {pickLocalizedValue(normalizedLocale, discipleshipPageCopy.twoTrackBody)}
          </p>
          <div className="grid gap-6 lg:grid-cols-2">
            {discipleshipTrackSections.map((lane) => (
              <div key={lane.key} className="card-base p-5 md:p-6">
                <h3 className="text-h3-token text-heading-token font-semibold">
                  {pickLocalizedValue(normalizedLocale, lane.title)}
                </h3>
                <p className="text-body-token mt-2 text-body-color-token">
                  {pickLocalizedValue(normalizedLocale, lane.description)}
                </p>
                <div className="mt-5 space-y-4">
                  {programsByTrack[lane.key].map((item) => {
                    const status = statusMeta(normalizedLocale, item.status);
                    const displayName = pickLocalized(normalizedLocale, {
                      zh: item.nameZh,
                      en: item.nameEn,
                      fallback: item.id,
                    });
                    const displayType = pickLocalized(normalizedLocale, {
                      zh: item.typeZh,
                      en: item.typeEn,
                      fallback: item.track,
                    });
                    const displaySummary = pickLocalized(normalizedLocale, {
                      zh: item.summaryZh,
                      en: item.summaryEn,
                      fallback: "",
                    });
                    const prereq =
                      item.prereqZh || item.prereqEn
                        ? pickLocalized(normalizedLocale, { zh: item.prereqZh, en: item.prereqEn })
                        : null;

                    const showInternalDetail = hasLocalDetail(item.id);
                    const showExternalDetail = !showInternalDetail && item.detailUrl && !isConstructionLink(item.detailUrl);
                    const showApply = item.applyUrl && item.status === "ready";

                    return (
                      <article key={item.id} className="card-base card-base-hover bg-surface-b p-4">
                        <div className="flex items-center justify-between gap-3">
                          <div className="text-xs text-muted-token">{displayType}</div>
                          <span
                            className={`rounded-full border px-3 py-1 text-[11px] font-semibold ${status.className}`}
                          >
                            {status.label}
                          </span>
                        </div>
                        <h4 className="mt-2 text-lg font-semibold text-heading-token">{displayName}</h4>
                        <p className="text-body-token mt-2 text-body-color-token">{displaySummary}</p>
                        {prereq ? <div className="mt-2 text-xs text-muted-token">{prereq}</div> : null}
                        <div className="mt-4 flex flex-wrap gap-2">
                          {showInternalDetail ? (
                            <Link
                              href={withLocale(normalizedLocale, `/discipleship/${item.id}`)}
                              className="btn-base btn-secondary focus-ring-token min-h-[32px] px-3 py-1.5 text-xs"
                            >
                              {pickLocalizedValue(normalizedLocale, discipleshipPageCopy.courseDetailsCta)}
                            </Link>
                          ) : null}
                          {showExternalDetail ? (
                            <a
                              href={item.detailUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="btn-base btn-secondary focus-ring-token min-h-[32px] px-3 py-1.5 text-xs"
                            >
                              {pickLocalizedValue(normalizedLocale, discipleshipPageCopy.externalLinkCta)}
                            </a>
                          ) : null}
                          {showApply ? (
                            <a
                              href={item.applyUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="btn-base btn-primary focus-ring-token min-h-[32px] px-3 py-1.5 text-xs"
                            >
                              {pickLocalizedValue(normalizedLocale, discipleshipPageCopy.applyCta)}
                            </a>
                          ) : null}
                        </div>
                      </article>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-rhythm-a section-rhythm-divider">
        <div className="section-container-medium section-block-tight space-y-6">
          <SectionHeader
            title={pickLocalizedValue(normalizedLocale, discipleshipPageCopy.learningPathTitle)}
            titleClassName="text-h3-token md:text-h2-token"
          />
          <div className="grid gap-4 md:grid-cols-4">
            {discipleshipLearningPathSteps.map((step, index) => (
              <div key={step.title.en} className="card-base card-base-hover bg-surface-b p-4">
                <div className="text-xs uppercase tracking-wide text-muted-token">
                  {pickLocalizedValue(normalizedLocale, discipleshipLearningStepLabel(index + 1))}
                </div>
                <div className="mt-2 text-lg font-semibold text-heading-token">
                  {pickLocalizedValue(normalizedLocale, step.title)}
                </div>
                <div className="text-body-token mt-1 text-body-color-token">
                  {pickLocalizedValue(normalizedLocale, step.description)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-stats-token section-rhythm-divider">
        <div className="section-container-medium section-block-tight text-heading-token">
          <div className="space-y-3">
            <h2 className="text-h3-token font-semibold md:text-h2-token">
              {pickLocalizedValue(normalizedLocale, discipleshipPageCopy.supportTitle)}
            </h2>
            <p className="max-w-3xl text-sm text-dk-title-token md:text-base">
              {pickLocalizedValue(normalizedLocale, discipleshipPageCopy.supportBody)}
            </p>
            <a href={withLocale(normalizedLocale, "/contact")} className="btn-base btn-primary focus-ring-token mt-2">
              {pickLocalizedValue(normalizedLocale, discipleshipPageCopy.contactCta)}
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
