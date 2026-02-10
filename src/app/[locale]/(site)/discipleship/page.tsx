import Image from "next/image";
import Link from "next/link";
import { normalizeLocale, type Locale, withLocale } from "@/lib/i18n";
import { hasLocalDetail, programs, type ProgramStatus } from "@/lib/discipleship";

function pickByLocale(locale: Locale, zh: string, en: string) {
  return locale === "en" ? en : zh;
}

function statusMeta(locale: Locale, status: ProgramStatus) {
  if (status === "ready") {
    return {
      label: pickByLocale(locale, "开放中", "Open"),
      className: "border-emerald-200 bg-emerald-50 text-emerald-700",
    };
  }
  if (status === "comingSoon") {
    return {
      label: pickByLocale(locale, "筹备中", "Coming Soon"),
      className: "border-amber-200 bg-amber-50 text-amber-800",
    };
  }
  return {
    label: pickByLocale(locale, "外部资源", "External"),
    className: "border-zinc-300 bg-zinc-100 text-zinc-700",
  };
}

function isConstructionLink(url?: string) {
  return Boolean(url?.includes("underconstruction"));
}

export default async function DiscipleshipPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const normalizedLocale = normalizeLocale(locale);
  const isEn = normalizedLocale === "en";
  const t = (zh: string, en: string) => (isEn ? en : zh);

  const readyCount = programs.filter((item) => item.status === "ready").length;
  const comingSoonCount = programs.filter((item) => item.status === "comingSoon").length;
  const externalCount = programs.filter((item) => item.status === "external").length;
  const discipleshipPrograms = programs.filter((item) => item.track === "discipleship");
  const equippingPrograms = programs.filter((item) => item.track === "equipping");

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
              {t("门徒训练", "Discipleship & Training")}
            </h1>
            <p className="text-sm text-zinc-200 md:text-base">
              {t(
                "以系统圣经学习与门训实践为核心，装备信徒灵命成长、教导服事与宣教使命。",
                "Structured Bible and discipleship tracks for spiritual formation, teaching readiness, and mission practice."
              )}
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pt-8 md:pt-12">
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-xl border border-zinc-200 bg-white p-4">
            <div className="text-2xl font-semibold text-zinc-900">{readyCount}</div>
            <div className="mt-1 text-sm text-zinc-600">{t("开放课程", "Open Programs")}</div>
          </div>
          <div className="rounded-xl border border-zinc-200 bg-white p-4">
            <div className="text-2xl font-semibold text-zinc-900">{comingSoonCount}</div>
            <div className="mt-1 text-sm text-zinc-600">{t("筹备中课程", "Coming Soon")}</div>
          </div>
          <div className="rounded-xl border border-zinc-200 bg-white p-4">
            <div className="text-2xl font-semibold text-zinc-900">{externalCount}</div>
            <div className="mt-1 text-sm text-zinc-600">{t("外部资源课程", "External Tracks")}</div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pt-10">
        <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5 text-sm text-amber-900">
          <div className="font-semibold">{t("报名表状态说明", "Registration Form Status")}</div>
          <p className="mt-2">
            {t(
              "当前核心课程共用同一个 Microsoft Forms 链接，且链接形态为设计模式 URL。建议仅作过渡使用，并尽快替换为学员填写版表单。",
              "Current core tracks share one Microsoft Forms link and the URL appears to be in design mode. Keep using it only as a temporary placeholder before replacing with learner-facing forms."
            )}
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pt-10">
        <h2 className="text-2xl font-semibold md:text-3xl">{t("双轨道训练结构", "Two-Track Structure")}</h2>
        <p className="mt-2 text-sm text-zinc-600">
          {t(
            "保留旧站原有的两条逻辑并做清晰呈现：A 轨为课程型门训，B 轨为同工/领袖与外部装备。",
            "Retaining the original page logic with a clearer display: Track A is course-based discipleship, Track B is ministry equipping and leadership formation."
          )}
        </p>
        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          {[
            {
              key: "discipleship",
              titleZh: "A 轨：课程型门徒训练",
              titleEn: "Track A: Course-Based Discipleship",
              descZh: "以 TEE 与圣经课程为核心，强调圣经根基、神学整合与可复制门训。",
              descEn:
                "Centered on TEE and Bible curriculum, focused on biblical foundation, theology integration, and reproducible discipleship.",
              items: discipleshipPrograms,
            },
            {
              key: "equipping",
              titleZh: "B 轨：事奉装备与领袖发展",
              titleEn: "Track B: Ministry Equipping & Leadership",
              descZh: "聚焦同工生命、领袖能力与外部工具，支持教会团队持续成长。",
              descEn: "Focused on coworker formation, leadership growth, and external tools for sustainable ministry development.",
              items: equippingPrograms,
            },
          ].map((lane) => (
            <div key={lane.key} className="rounded-2xl border border-zinc-200 bg-white p-5 md:p-6">
              <h3 className="text-xl font-semibold">{t(lane.titleZh, lane.titleEn)}</h3>
              <p className="mt-2 text-sm text-zinc-600">{t(lane.descZh, lane.descEn)}</p>
              <div className="mt-5 space-y-4">
                {lane.items.map((item) => {
                  const status = statusMeta(normalizedLocale, item.status);
                  const displayName = t(item.nameZh, item.nameEn);
                  const displayType = t(item.typeZh, item.typeEn);
                  const displaySummary = t(item.summaryZh, item.summaryEn);
                  const prereq =
                    item.prereqZh || item.prereqEn ? t(item.prereqZh ?? "", item.prereqEn ?? "") : null;

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
                            {t("课程详情", "Course details")}
                          </Link>
                        ) : null}
                        {showExternalDetail ? (
                          <a
                            href={item.detailUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex rounded-full border border-zinc-300 px-3 py-1.5 text-xs font-medium text-zinc-700 hover:border-zinc-400"
                          >
                            {t("外部链接", "External link")}
                          </a>
                        ) : null}
                        {showApply ? (
                          <a
                            href={item.applyUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex rounded-full bg-amber-500 px-3 py-1.5 text-xs font-semibold text-black"
                          >
                            {t("填写修课意向表（共用）", "Apply (shared form)")}
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
        <h2 className="text-2xl font-semibold md:text-3xl">{t("学习路径", "Learning Path")}</h2>
        <div className="mt-5 grid gap-4 md:grid-cols-4">
          {[
            {
              zh: "核心基础",
              en: "Core Foundation",
              descZh: "基督生平",
              descEn: "Life of Christ",
            },
            {
              zh: "进阶深化",
              en: "Advanced Formation",
              descZh: "保罗生平与书信 / 摩西五经",
              descEn: "Paul's Life & Epistles / Pentateuch",
            },
            {
              zh: "圣经全景",
              en: "Panoramic Bible",
              descZh: "伯特利圣经系列（两年制）",
              descEn: "The Bethel Series (2-year track)",
            },
            {
              zh: "事奉扩展",
              en: "Ministry Multiplication",
              descZh: "同工训练 / 领袖培训 / Zume",
              descEn: "Coworker / Leadership / Zume",
            },
          ].map((step, index) => (
            <div key={step.en} className="rounded-xl border border-zinc-200 bg-zinc-50 p-4">
              <div className="text-xs uppercase tracking-wide text-zinc-500">
                {t(`阶段 ${index + 1}`, `Step ${index + 1}`)}
              </div>
              <div className="mt-2 text-lg font-semibold">{t(step.zh, step.en)}</div>
              <div className="mt-1 text-sm text-zinc-600">{t(step.descZh, step.descEn)}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pt-12">
        <div className="rounded-2xl border border-dashed border-zinc-300 bg-zinc-50 p-6">
          <h2 className="text-xl font-semibold">{t("当前可优化项", "Current Gaps to Improve")}</h2>
          <ul className="mt-3 space-y-2 text-sm text-zinc-600">
            {(isEn
              ? [
                  "Use independent registration forms per course instead of one shared link.",
                  "Replace any temporary under-construction links with complete BRC-owned course pages.",
                  "Continue building full English content for all upcoming tracks.",
                  "Clarify prerequisites and pathway transitions in future revisions.",
                ]
              : [
                  "为每个课程配置独立修课报名表，不再共用同一链接。",
                  "将 under construction 临时页面替换为完整课程内容页。",
                  "持续补齐筹备中课程的完整中英双语内容。",
                  "在后续版本中进一步强化先修要求与课程路径说明。",
                ]
            ).map((item) => (
              <li key={item}>• {item}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pt-12">
        <div className="rounded-2xl bg-zinc-900 px-6 py-8 text-white md:px-8">
          <h2 className="text-2xl font-semibold">{t("需要报名协助？", "Need Enrollment Support?")}</h2>
          <p className="mt-2 text-sm text-zinc-300">
            {t(
              "若你不确定从哪一门开始，欢迎联系训练团队进行课程建议与分流。",
              "If you are unsure which track to start with, contact the training team for placement guidance."
            )}
          </p>
          <a
            href={withLocale(normalizedLocale, "/contact")}
            className="mt-4 inline-flex rounded-full bg-amber-500 px-5 py-2.5 text-sm font-semibold text-black"
          >
            {t("联系我们", "Contact Us")}
          </a>
        </div>
      </section>
    </main>
  );
}
