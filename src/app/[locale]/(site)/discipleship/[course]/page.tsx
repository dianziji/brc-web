import Link from "next/link";
import { notFound } from "next/navigation";
import { findDetailById, findProgramById } from "@/lib/discipleship";
import { normalizeLocale, withLocale } from "@/lib/i18n";

export default async function DiscipleshipDetailPage({
  params,
}: {
  params: Promise<{ locale: string; course: string }>;
}) {
  const { locale, course } = await params;
  const normalizedLocale = normalizeLocale(locale);
  const isEn = normalizedLocale === "en";
  const t = (zh: string, en: string) => (isEn ? en : zh);

  const detail = findDetailById(course);
  if (!detail) {
    notFound();
  }

  const program = findProgramById(course);

  return (
    <main className="mx-auto max-w-5xl px-6 pt-28 pb-16 md:pt-32">
      <Link href={withLocale(normalizedLocale, "/discipleship")} className="text-sm underline text-zinc-700">
        {t("← 返回门徒训练", "← Back to Discipleship")}
      </Link>

      <section className="mt-6 rounded-2xl border border-zinc-200 bg-white p-6 md:p-8">
        <h1 className="text-3xl font-semibold">{t(detail.titleZh, detail.titleEn)}</h1>
        <p className="mt-2 text-sm text-zinc-600">{t(detail.subtitleZh, detail.subtitleEn)}</p>

        {program ? (
          <p className="mt-3 text-sm text-zinc-600">{t(program.summaryZh, program.summaryEn)}</p>
        ) : null}

        <div className="mt-8 grid gap-8 md:grid-cols-2">
          <div className="space-y-4">
            <div>
              <h2 className="text-base font-semibold">{t("课程宗旨", "Purpose")}</h2>
              <p className="mt-2 text-sm text-zinc-600">{t(detail.purposeZh, detail.purposeEn)}</p>
            </div>
            <div>
              <h2 className="text-base font-semibold">{t("培养目标", "Goal")}</h2>
              <p className="mt-2 text-sm text-zinc-600">{t(detail.targetZh, detail.targetEn)}</p>
            </div>
          </div>

          <div>
            <h2 className="text-base font-semibold">{t("学习内容", "Learning Content")}</h2>
            <ul className="mt-3 space-y-2 text-sm text-zinc-600">
              {(isEn ? detail.pointsEn : detail.pointsZh).map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-8 rounded-xl border border-zinc-200 bg-zinc-50 p-5">
          <h2 className="text-base font-semibold">{t("课程安排", "Schedule & Format")}</h2>
          <ul className="mt-3 space-y-2 text-sm text-zinc-600">
            {(isEn ? detail.scheduleEn : detail.scheduleZh).map((item) => (
              <li key={item}>• {item}</li>
            ))}
          </ul>

          <div className="mt-5 flex flex-wrap gap-3">
            {program?.applyUrl ? (
              <a
                href={program.applyUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex rounded-full bg-amber-500 px-4 py-2 text-sm font-semibold text-black"
              >
                {t("填写修课意向表（共用）", "Apply (shared form)")}
              </a>
            ) : null}
            {detail.referenceUrl ? (
              <a
                href={detail.referenceUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex rounded-full border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-700"
              >
                {t("外部参考资料", "External reference")}
              </a>
            ) : null}
          </div>
        </div>
      </section>
    </main>
  );
}
