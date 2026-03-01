import AppImage from "@/components/AppImage";
import AlignWithGodSection from "@/components/AlignWithGodSection";
import { getMessages, normalizeLocale, withLocale } from "@/lib/i18n";

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

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const normalizedLocale = normalizeLocale(locale);
  const messages = getMessages(normalizedLocale);
  const valuesLead =
    normalizedLocale === "en"
      ? "Eight commitments that shape how we build people, teams, and mission."
      : "八個核心價值，定義我們如何建造生命、團隊與事工。";

  const acrosticLetters = messages.about.values.map((item) => {
    const { primary } = splitValueLabel(item);
    return getLeadLetter(primary);
  });

  return (
    <main className="pb-16">
      <section className="relative w-full overflow-hidden bg-stats-token text-white">
        <div className="relative h-[320px] w-full md:h-[480px]">
          <AppImage mediaKey="aboutHero" locale={normalizedLocale} fill className="object-cover object-center" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/40 to-black/60" />
        </div>
        <div className="absolute inset-0 flex items-center justify-center text-center px-6 pt-24 md:pt-32">
          <div className="max-w-3xl space-y-4">
            <h1 className="text-3xl font-semibold md:text-5xl">
              {messages.about.heroTitle}
        
            </h1>
            <p className="text-base text-dk-title-token md:text-lg">{messages.about.heroBody}</p>
          </div>
        </div>
      </section>



      <section className="grid lg:grid-cols-2">
      <div className="bg-surface-a px-6 py-24 lg:px-12">
          <div className="mx-auto max-w-xl space-y-8">
            <div className="space-y-4">
           
            <h2 className="text-3xl font-semibold">{messages.about.storyTitle}</h2>
            <p className="text-sm text-body-color-token">{messages.about.storyBody}</p>
      
            </div>
 
          </div>
        </div>
        <div className="relative min-h-[320px] w-full md:min-h-[520px]">
          <AppImage mediaKey="aboutStory" locale={normalizedLocale} fill className="object-cover object-center"  />
        </div>

      </section>
      <section className="grid lg:grid-cols-2">
        <div className="relative min-h-[320px] w-full md:min-h-[520px]">
          <AppImage
            mediaKey="aboutMissionVision"
            locale={normalizedLocale}
            fill
            className="object-cover object-center"
      
          />
        </div>
        <div className="bg-surface-a px-6 py-24 lg:px-12">
          <div className="mx-auto max-w-2xl space-y-8">
            <div className="space-y-4">
              <h2 className="text-3xl font-semibold">{messages.about.missionTitle}</h2>
              <div className="space-y-1 text-sm leading-relaxed text-body-color-token">
                {splitFixedLines(messages.about.missionBody).map((line) => (
                  <p key={line} className="lg:whitespace-nowrap">
                    {line}
                  </p>
                ))}
              </div>
            </div>
            <div className="space-y-4">
              <h2 className="text-3xl font-semibold">{messages.about.visionTitle}</h2>
              <div className="space-y-1 text-sm leading-relaxed text-body-color-token">
                {splitFixedLines(messages.about.visionBody).map((line) => (
                  <p key={line} className="lg:whitespace-nowrap">
                    {line}
                  </p>
                ))}
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
                  <h3 className="text-h3-token text-heading-token mt-2 font-semibold leading-tight">
                    {beforeLead}
                    <span className="text-[var(--accent)]">{leadLetter}</span>
                    {afterLead}
                  </h3>
                  {secondary ? <p className="text-caption-token text-body-color-token mt-2 leading-relaxed">{secondary}</p> : null}
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section-container-medium section-block-tight">
        <div className="flex items-end justify-between">
          <h2 className="text-3xl font-semibold">{messages.about.teamTitle}</h2>
          <a
            className="text-sm text-body-color-token underline"
            href={withLocale(normalizedLocale, "/ministries")}
          >
            {messages.about.teamCta}
          </a>
        </div>
        <div className="mt-6 grid gap-8 md:grid-cols-3">
          {messages.about.team.map((item) => (
            <div key={item.name} className="group">
              <div className="h-52 w-full bg-surface-b" />
              <div className="mt-4 text-lg font-medium">{item.name}</div>
              <div className="mt-1 text-sm text-body-color-token">{item.role}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-stats-token">
        <div className="section-container-medium section-block-tight text-white">
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
            <div>
              <h2 className="text-2xl font-semibold">{messages.about.joinTitle}</h2>
              <p className="mt-2 text-sm text-dk-title-token">{messages.about.joinBody}</p>
            </div>
            <a
              className="btn-base btn-primary focus-ring-token"
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
