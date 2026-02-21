import AppImage from "@/components/AppImage";
import AlignWithGodSection from "@/components/AlignWithGodSection";
import { getMessages, normalizeLocale, withLocale } from "@/lib/i18n";

function splitFixedLines(text: string): string[] {
  return text
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.length > 0);
}

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const normalizedLocale = normalizeLocale(locale);
  const messages = getMessages(normalizedLocale);

  return (
    <main className="pb-16">
      <section className="relative w-full overflow-hidden bg-zinc-900 text-white">
        <div className="relative h-[320px] w-full md:h-[480px]">
          <AppImage mediaKey="aboutHero" locale={normalizedLocale} fill className="object-cover object-center" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/40 to-black/60" />
        </div>
        <div className="absolute inset-0 flex items-center justify-center text-center px-6 pt-24 md:pt-32">
          <div className="max-w-3xl space-y-4">
            <h1 className="text-3xl font-semibold md:text-5xl">
              {messages.about.heroTitle}
        
            </h1>
            <p className="text-base text-zinc-200 md:text-lg">{messages.about.heroBody}</p>
          </div>
        </div>
      </section>



      <section className="grid lg:grid-cols-2">
      <div className="bg-white px-6 py-24 lg:px-12">
          <div className="mx-auto max-w-xl space-y-8">
            <div className="space-y-4">
           
            <h2 className="text-3xl font-semibold">{messages.about.storyTitle}</h2>
            <p className="text-sm text-zinc-600">{messages.about.storyBody}</p>
      
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
        <div className="bg-white px-6 py-24 lg:px-12">
          <div className="mx-auto max-w-2xl space-y-8">
            <div className="space-y-4">
              <h2 className="text-3xl font-semibold">{messages.about.missionTitle}</h2>
              <div className="space-y-1 text-sm leading-relaxed text-zinc-600">
                {splitFixedLines(messages.about.missionBody).map((line) => (
                  <p key={line} className="lg:whitespace-nowrap">
                    {line}
                  </p>
                ))}
              </div>
            </div>
            <div className="space-y-4">
              <h2 className="text-3xl font-semibold">{messages.about.visionTitle}</h2>
              <div className="space-y-1 text-sm leading-relaxed text-zinc-600">
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

      <section className="bg-zinc-50">
        <div className="mx-auto max-w-6xl px-6 py-14">
          <div className="grid gap-6 md:grid-cols-2">

            <div className="space-y-4">
              <h2 className="text-3xl font-semibold">{messages.about.valuesTitle}</h2>
              <div className="text-sm text-zinc-600 space-y-1">
                {messages.about.values.map((item) => (
                  <div key={item}>{item}</div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-12">
        <div className="flex items-end justify-between">
          <h2 className="text-3xl font-semibold">{messages.about.teamTitle}</h2>
          <a
            className="text-sm text-zinc-700 underline"
            href={withLocale(normalizedLocale, "/ministries")}
          >
            {messages.about.teamCta}
          </a>
        </div>
        <div className="mt-6 grid gap-8 md:grid-cols-3">
          {messages.about.team.map((item) => (
            <div key={item.name} className="group">
              <div className="h-52 w-full bg-zinc-100" />
              <div className="mt-4 text-lg font-medium">{item.name}</div>
              <div className="mt-1 text-sm text-zinc-600">{item.role}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-zinc-900">
        <div className="mx-auto max-w-6xl px-6 py-14 text-white">
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
            <div>
              <h2 className="text-2xl font-semibold">{messages.about.joinTitle}</h2>
              <p className="mt-2 text-sm text-zinc-300">{messages.about.joinBody}</p>
            </div>
            <a
              className="inline-flex items-center justify-center rounded-full bg-amber-500 px-6 py-3 text-sm font-semibold text-black"
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
