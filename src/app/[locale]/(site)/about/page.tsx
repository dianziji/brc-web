import AppImage from "@/components/AppImage";
import AlignWithGodSection from "@/components/AlignWithGodSection";
import { getMessages, normalizeLocale, withLocale } from "@/lib/i18n";
import { FINANCIAL_REPORTS } from "@/content/about/financial-reports";
import Image from "next/image";

function splitFixedLines(text: string): string[] {
  return text
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.length > 0);
}

function splitValueLabel(value: string) {
  const firstCjkIndex = value.search(/[\u3400-\u9fff]/);
  if (firstCjkIndex === -1) {
    return { primary: value.trim(), secondary: "" };
  }
  return {
    primary: value.slice(0, firstCjkIndex).trim(),
    secondary: value.slice(firstCjkIndex).trim(),
  };
}

function getLeadLetter(primary: string) {
  const matched = primary.match(/[A-Za-z]/);
  if (matched) return matched[0].toUpperCase();
  return primary.trim().charAt(0).toUpperCase();
}

function getBoardImageForMember(memberName: string): string | null {
  const normalized = memberName.toLowerCase();
  if (normalized.includes("paul huang") || normalized.includes("黃明發")) return "/assets/images/board/Paul Huang.png";
  if (normalized.includes("john yu") || normalized.includes("郁維強")) return "/assets/images/board/John Yu.png";
  if (normalized.includes("peter chou") || normalized.includes("周彼得")) return "/assets/images/board/Peter Chou.png";
  if (normalized.includes("weyl wang") || normalized.includes("王惠國")) return "/assets/images/board/Weyl Wang.png";
  if (normalized.includes("olive chiu") || normalized.includes("邱燕惠")) return "/assets/images/board/Olive Chiu.png";
  if (normalized.includes("shaow lin") || normalized.includes("林孝本")) return "/assets/images/board/Shaow Lin.png";
  if (normalized.includes("john chang") || normalized.includes("張沅")) {
    return "/assets/images/board/John Chang.png";
  }
  return null;
}

function getBoardImageClassForMember(memberName: string): string {
  const normalized = memberName.toLowerCase();
  if (normalized.includes("weyl wang") || normalized.includes("王惠國")) {
    return "object-cover object-top scale-[1.08]";
  }
  return "object-cover object-top";
}

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const normalizedLocale = normalizeLocale(locale);
  const messages = getMessages(normalizedLocale);
  const boardSlotCount = 5;
  const valuesLead =
    normalizedLocale === "en"
      ? "Eight commitments that shape how we build people, teams, and mission."
      : "八個核心價值，定義我們如何建造生命、團隊與事工。";
  const boardPlaceholderName = normalizedLocale === "en" ? "Board Member" : "董事成員";
  const boardPlaceholderRole = normalizedLocale === "en" ? "Profile pending" : "資料待更新";
  const boardPhotoPlaceholder = normalizedLocale === "en" ? "Photo" : "頭像";
  const boardMembers = Array.from({ length: boardSlotCount }, (_, index) => {
    const member = messages.about.team[index];
    if (member) return member;
    return {
      name: `${boardPlaceholderName} ${index + 1}`,
      role: boardPlaceholderRole,
    };
  });
  const founders = messages.about.founders;

  const renderMemberCard = (item: { name: string; role: string }, index: number, className = "") => (
    <div key={`${item.name}-${index}`} className={`group ${className}`.trim()}>
      <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl border border-dashed border-token bg-surface-b">
        {(() => {
          const imageSrc = getBoardImageForMember(item.name);
          if (!imageSrc) {
            return (
              <div className="absolute inset-0 flex items-center justify-center text-sm font-medium tracking-wide text-muted-token">
                {boardPhotoPlaceholder}
              </div>
            );
          }
          return (
            <Image
              src={imageSrc}
              alt={item.name}
              fill
              sizes="(max-width: 640px) 68vw, (max-width: 1024px) 44vw, 24vw"
              className={getBoardImageClassForMember(item.name)}
            />
          );
        })()}
      </div>
      <div className="mt-4 text-center text-lg font-medium">{item.name}</div>
      <div className="mt-1 text-center text-sm text-body-color-token">{item.role}</div>
    </div>
  );

  const acrosticLetters = messages.about.values.map((item) => {
    const { primary } = splitValueLabel(item);
    return getLeadLetter(primary);
  });

  return (
    <main className="pb-0">
      <section className="relative w-full overflow-hidden bg-stats-token text-white">
        <div className="relative h-[380px] w-full md:h-[480px]">
          <AppImage mediaKey="aboutHero" locale={normalizedLocale} fill className="object-cover object-center" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/40 to-black/60" />
        </div>
        <div className="absolute inset-0 flex items-start justify-center px-6 pb-6 pt-32 text-center md:items-center md:pb-0 md:pt-32">
          <div className="max-w-3xl space-y-4">
            <h1 className="text-3xl font-semibold md:text-5xl">
              {messages.about.heroTitle}
        
            </h1>
            <p className="text-sm text-dk-title-token md:text-lg">{messages.about.heroBody}</p>
            <p className="text-[10px] leading-relaxed text-dk-meta-token md:text-xs">{messages.about.heroOrgNote}</p>
          </div>
        </div>
      </section>

      <section className="bg-surface-a">
        <div className="section-container-medium py-10 md:py-14">
          <div className="grid lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div className="relative min-h-[240px] w-full overflow-hidden rounded-2xl md:min-h-[520px]">
              <AppImage mediaKey="aboutStory" locale={normalizedLocale} fill className="object-cover object-center" />
            </div>
            <div className="relative z-10 mx-4 -mt-12 rounded-2xl border border-token bg-surface-a px-6 py-8 shadow-card lg:mx-0 lg:mt-0 lg:-ml-20 lg:max-w-xl lg:px-10 lg:py-12">
              <div className="space-y-4">
                <h2 className="text-3xl font-semibold">{messages.about.storyTitle}</h2>
                <p className="text-sm text-body-color-token">{messages.about.storyBody}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-surface-b">
        <div className="section-container-medium pb-12 pt-4 md:pb-16 md:pt-8">
          <div className="grid lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
            <div className="relative min-h-[240px] w-full overflow-hidden rounded-2xl md:min-h-[520px] lg:order-2">
              <AppImage
                mediaKey="aboutMissionVision"
                locale={normalizedLocale}
                fill
                className="object-cover object-center"
              />
            </div>
            <div className="relative z-10 mx-4 -mt-12 rounded-2xl border border-token bg-surface-a px-6 py-8 shadow-card lg:order-1 lg:mx-0 lg:mt-0 lg:-mr-20 lg:max-w-2xl lg:px-10 lg:py-12">
              <div className="space-y-8">
                <div className="space-y-4">
                  <h2 className="text-3xl font-semibold">{messages.about.missionTitle}</h2>
                  <div className="space-y-1 text-sm leading-relaxed text-body-color-token">
                    {splitFixedLines(messages.about.missionBody).map((line) => (
                      <p key={line}>{line}</p>
                    ))}
                  </div>
                </div>
                <div className="space-y-4">
                  <h2 className="text-3xl font-semibold">{messages.about.visionTitle}</h2>
                  <div className="space-y-1 text-sm leading-relaxed text-body-color-token">
                    {splitFixedLines(messages.about.visionBody).map((line) => (
                      <p key={line}>{line}</p>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <AlignWithGodSection locale={normalizedLocale} />

      <section className="bg-rhythm-b section-rhythm-divider">
        <div className="section-container-medium section-block-tight">
          <div className="max-w-3xl space-y-3">
            <h2 className="font-display text-h2-token text-heading-token font-semibold">{messages.about.valuesTitle}</h2>
         
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <span className="rounded-full bg-[var(--accent)]/12 px-3 py-1 text-caption-token font-semibold tracking-[0.18em] text-[var(--accent-strong)]">
                {acrosticLetters.join(" · ")}
              </span>
           
            </div>
            <p className="text-body-token text-body-color-token">{valuesLead}</p>
          </div>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {messages.about.values.map((item, index) => {
              const { primary, secondary } = splitValueLabel(item);
              const leadLetter = getLeadLetter(primary);
              const leadIndex = primary.toUpperCase().indexOf(leadLetter);
              const beforeLead = leadIndex >= 0 ? primary.slice(0, leadIndex) : "";
              const afterLead = leadIndex >= 0 ? primary.slice(leadIndex + 1) : primary.slice(1);
              return (
                <article key={item} className="card-base card-base-hover relative overflow-hidden p-4">
                  <div className="absolute inset-x-0 top-0 h-[2px] bg-[var(--accent-line)]" aria-hidden="true" />
                  <div className="text-caption-token text-muted-token">({String(index + 1).padStart(2, "0")})</div>
                  <h3 className="text-h3-token mt-2 font-semibold leading-tight text-[var(--accent)]">
                    {beforeLead}
                    <span className="text-[var(--align-bg)]">{leadLetter}</span>
                    {afterLead}
                  </h3>
                  {secondary ? <p className="text-caption-token text-body-color-token mt-2 leading-relaxed">{secondary}</p> : null}
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Founders + board share one visual block: normal top padding, no bottom
          padding, so both rows of people fit in a single viewport. */}
      <section className="section-container-medium pb-0 pt-7 md:pt-13">
        <h2 className="text-center text-3xl font-semibold">{messages.about.foundersTitle}</h2>
        {/* Same 5-column track as the board grid below, so founder cards match
            the board cards in size; starting at column 2 centers the three of
            them within the track. */}
        <div className="mx-auto mt-5 grid w-full grid-cols-2 gap-3 sm:grid-cols-3 md:gap-4 lg:max-w-5xl lg:grid-cols-5">
          {founders.map((item, index) =>
            renderMemberCard(item, index, index === 0 ? "lg:col-start-2" : ""),
          )}
        </div>
      </section>

      <section className="section-container-medium pb-7 pt-6 md:pb-13 md:pt-6">
        <h2 className="text-center text-3xl font-semibold">{messages.about.teamTitle}</h2>
        <div className="mx-auto mt-5 grid w-full grid-cols-2 gap-3 sm:grid-cols-3 md:gap-4 lg:max-w-5xl lg:grid-cols-5">
          {boardMembers.map((item, index) => renderMemberCard(item, index))}
        </div>
      </section>

      {FINANCIAL_REPORTS.length > 0 && (
        <section className="bg-surface-b section-rhythm-divider">
          <div className="section-container-medium section-block-tight">
            <h2 className="text-3xl font-semibold">{messages.about.financialsTitle}</h2>
            <p className="mt-2 max-w-2xl text-sm text-body-color-token">{messages.about.financialsBody}</p>
            <ul className="mt-6 space-y-3">
              {[...FINANCIAL_REPORTS]
                .sort((a, b) => b.year - a.year)
                .map((report) => {
                  const label =
                    (normalizedLocale === "en" ? report.titleEn : report.titleZh) ||
                    (normalizedLocale === "en"
                      ? `${report.year} Financial Statement (PDF)`
                      : `${report.year} 年度財務報表（PDF）`);
                  return (
                    <li key={report.year}>
                      <a
                        className="text-body-color-token underline underline-offset-4 hover:text-heading-token"
                        href={report.pdfUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {label}
                      </a>
                    </li>
                  );
                })}
            </ul>
          </div>
        </section>
      )}

      <section className="bg-stats-token">
        <div className="section-container-medium section-block-tight text-white">
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
            <div>
              <h2 className="text-2xl font-semibold">{messages.about.joinTitle}</h2>
              <p className="mt-2 text-sm text-dk-title-token">{messages.about.joinBody}</p>
            </div>
            <a
              className="btn-base btn-donation-cta focus-ring-token"
              href={withLocale(normalizedLocale, "/donation")}
            >
              {messages.about.joinCta}
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
