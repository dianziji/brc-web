import Image from "next/image";
import Link from "next/link";
import {
  discipleshipLearningStepLabel,
  discipleshipPageCopy,
  discipleshipStatusLabels,
} from "@/content/discipleship/copy";
import {
  discipleshipImprovementItems,
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
      className: "border-amber-200 bg-amber-50 text-amber-800",
    };
  }
  return {
    label: pickLocalizedValue(locale, discipleshipStatusLabels.external),
    className: "border-zinc-300 bg-zinc-100 text-zinc-700",
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
    <main className="pb-16">
      <section className="relative w-full overflow-hidden bg-zinc-900 text-white">
        <div className="relative h-[320px] w-full md:h-[480px]">
          <Image src="/images/discipleship.png" alt="Discipleship" fill className="object-cover object-center" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/45 to-black/70" />
        </div>
        <div className="absolute inset-0 flex items-center justify-center text-center px-6 pt-24 md:pt-32">
          <div className="max-w-3xl space-y-4">
            <h1 className="text-3xl font-semibold leading-tight md:text-5xl">
              {pickLocalizedValue(normalizedLocale, discipleshipPageCopy.heroTitle)}
            </h1>
            <p className="text-sm text-zinc-200 md:text-base">
              {pickLocalizedValue(normalizedLocale, discipleshipPageCopy.heroBody)}
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pt-8 md:pt-12">
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-xl border border-zinc-200 bg-white p-4">
            <div className="text-2xl font-semibold text-zinc-900">{readyCount}</div>
            <div className="mt-1 text-sm text-zinc-600">
              {pickLocalizedValue(normalizedLocale, discipleshipPageCopy.openPrograms)}
            </div>
          </div>
          <div className="rounded-xl border border-zinc-200 bg-white p-4">
            <div className="text-2xl font-semibold text-zinc-900">{comingSoonCount}</div>
            <div className="mt-1 text-sm text-zinc-600">
              {pickLocalizedValue(normalizedLocale, discipleshipPageCopy.comingSoonPrograms)}
            </div>
          </div>
          <div className="rounded-xl border border-zinc-200 bg-white p-4">
            <div className="text-2xl font-semibold text-zinc-900">{externalCount}</div>
            <div className="mt-1 text-sm text-zinc-600">
              {pickLocalizedValue(normalizedLocale, discipleshipPageCopy.externalTracks)}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pt-10">
        <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5 text-sm text-amber-900">
          <div className="font-semibold">
            {pickLocalizedValue(normalizedLocale, discipleshipPageCopy.registrationFormTitle)}
          </div>
          <p className="mt-2">
            {pickLocalizedValue(normalizedLocale, discipleshipPageCopy.registrationFormBody)}
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pt-10">
        <h2 className="text-2xl font-semibold md:text-3xl">
          {pickLocalizedValue(normalizedLocale, discipleshipPageCopy.twoTrackTitle)}
        </h2>
        <p className="mt-2 text-sm text-zinc-600">
          {pickLocalizedValue(normalizedLocale, discipleshipPageCopy.twoTrackBody)}
        </p>
        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          {discipleshipTrackSections.map((lane) => (
            <div key={lane.key} className="rounded-2xl border border-zinc-200 bg-white p-5 md:p-6">
              <h3 className="text-xl font-semibold">{pickLocalizedValue(normalizedLocale, lane.title)}</h3>
              <p className="mt-2 text-sm text-zinc-600">
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
                    <article key={item.id} className="rounded-xl border border-zinc-200 bg-zinc-50 p-4">
                      <div className="flex items-center justify-between gap-3">
                        <div className="text-xs text-zinc-500">{displayType}</div>
                        <span
                          className={`rounded-full border px-3 py-1 text-[11px] font-semibold ${status.className}`}
                        >
                          {status.label}
                        </span>
                      </div>
                      <h4 className="mt-2 text-lg font-semibold">{displayName}</h4>
                      <p className="mt-2 text-sm text-zinc-600">{displaySummary}</p>
                      {prereq ? <div className="mt-2 text-xs text-zinc-500">{prereq}</div> : null}
                      <div className="mt-4 flex flex-wrap gap-2">
                        {showInternalDetail ? (
                          <Link
                            href={withLocale(normalizedLocale, `/discipleship/${item.id}`)}
                            className="inline-flex rounded-full border border-zinc-300 px-3 py-1.5 text-xs font-medium text-zinc-700 hover:border-zinc-400"
                          >
                            {pickLocalizedValue(normalizedLocale, discipleshipPageCopy.courseDetailsCta)}
                          </Link>
                        ) : null}
                        {showExternalDetail ? (
                          <a
                            href={item.detailUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex rounded-full border border-zinc-300 px-3 py-1.5 text-xs font-medium text-zinc-700 hover:border-zinc-400"
                          >
                            {pickLocalizedValue(normalizedLocale, discipleshipPageCopy.externalLinkCta)}
                          </a>
                        ) : null}
                        {showApply ? (
                          <a
                            href={item.applyUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex rounded-full bg-amber-500 px-3 py-1.5 text-xs font-semibold text-black"
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
      </section>

      <section className="mx-auto max-w-6xl px-6 pt-12">
        <h2 className="text-2xl font-semibold md:text-3xl">
          {pickLocalizedValue(normalizedLocale, discipleshipPageCopy.learningPathTitle)}
        </h2>
        <div className="mt-5 grid gap-4 md:grid-cols-4">
          {discipleshipLearningPathSteps.map((step, index) => (
            <div key={step.title.en} className="rounded-xl border border-zinc-200 bg-zinc-50 p-4">
              <div className="text-xs uppercase tracking-wide text-zinc-500">
                {pickLocalizedValue(normalizedLocale, discipleshipLearningStepLabel(index + 1))}
              </div>
              <div className="mt-2 text-lg font-semibold">{pickLocalizedValue(normalizedLocale, step.title)}</div>
              <div className="mt-1 text-sm text-zinc-600">
                {pickLocalizedValue(normalizedLocale, step.description)}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pt-12">
        <div className="rounded-2xl border border-dashed border-zinc-300 bg-zinc-50 p-6">
          <h2 className="text-xl font-semibold">
            {pickLocalizedValue(normalizedLocale, discipleshipPageCopy.improvementTitle)}
          </h2>
          <ul className="mt-3 space-y-2 text-sm text-zinc-600">
            {discipleshipImprovementItems.map((item) => (
              <li key={item.en}>• {pickLocalizedValue(normalizedLocale, item)}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pt-12">
        <div className="rounded-2xl bg-zinc-900 px-6 py-8 text-white md:px-8">
          <h2 className="text-2xl font-semibold">
            {pickLocalizedValue(normalizedLocale, discipleshipPageCopy.supportTitle)}
          </h2>
          <p className="mt-2 text-sm text-zinc-300">
            {pickLocalizedValue(normalizedLocale, discipleshipPageCopy.supportBody)}
          </p>
          <a
            href={withLocale(normalizedLocale, "/contact")}
            className="mt-4 inline-flex rounded-full bg-amber-500 px-5 py-2.5 text-sm font-semibold text-black"
          >
            {pickLocalizedValue(normalizedLocale, discipleshipPageCopy.contactCta)}
          </a>
        </div>
      </section>
    </main>
  );
}
