import { getMessages, Locale } from "@/lib/i18n";

function formatGoalTitle(title: string, isEnglish: boolean, titleLines: string[] = []) {
  if (!isEnglish) return title;
  if (titleLines.length === 2) {
    return (
      <>
        <span className="block">{titleLines[0]}</span>
        <span className="block">{titleLines[1]}</span>
      </>
    );
  }
  const words = title.split(" ");
  if (words.length <= 2) {
    return (
      <>
        <span className="block whitespace-nowrap">{title}</span>
        <span className="block">&nbsp;</span>
      </>
    );
  }
  const midpoint = Math.ceil(words.length / 2);
  const line1 = words.slice(0, midpoint).join(" ");
  const line2 = words.slice(midpoint).join(" ");
  return (
    <>
      <span className="block">{line1}</span>
      <span className="block">{line2}</span>
    </>
  );
}

export default function AlignWithGodSection({ locale }: { locale: Locale }) {
  const isEnglish = locale === "en";
  const messages = getMessages(locale);
  const section = messages.alignWithGod;

  return (
    <section className="bg-amber-50 text-zinc-900">
      <div className="mx-auto max-w-6xl px-6 py-8 md:py-14">
        <div className="space-y-5 md:space-y-8">
          <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
            <div className="space-y-3 border-t border-zinc-200 pt-4 md:space-y-4 md:pt-6">
              <div className="text-[10px] uppercase tracking-widest text-zinc-500 md:text-xs">{section.title}</div>
              <div className="text-3xl font-semibold leading-none tracking-wide text-red-700 sm:text-4xl md:text-5xl">
                {section.headline.map((item) => (
                  <div key={item}>{item}</div>
                ))}
              </div>
            </div>

            {section.goals.map((item, index) => (
              <div key={item.title} className="space-y-2 border-t border-zinc-200 pt-3 text-left md:space-y-3 md:pt-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="text-[10px] uppercase tracking-widest text-zinc-500 md:text-xs">
                    ({String(index + 1).padStart(2, "0")})
                  </div>
                  <div
                    className={`min-w-0 w-full max-w-[320px] text-right font-semibold leading-snug ${
                      isEnglish ? "text-sm sm:text-base md:text-lg" : "text-sm sm:text-base md:text-xl"
                    }`}
                    style={{ textWrap: "pretty" }}
                  >
                    {formatGoalTitle(item.title, isEnglish, item.titleLines)}
                  </div>
                </div>
                <div className="text-[10px] font-semibold leading-relaxed text-zinc-900 md:text-sm">{item.note}</div>
                <div className="pt-1 text-[10px] leading-relaxed text-zinc-700 md:pt-3 md:text-sm">{item.verse}</div>
                <div className="text-right text-[10px] text-zinc-500 md:text-sm">{item.ref}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
