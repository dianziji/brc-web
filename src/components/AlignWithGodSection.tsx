import { getMessages, Locale } from "@/lib/i18n";
import RevealSection from "@/components/home/RevealSection";

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
    <RevealSection className="bg-align-token text-dk-title-token">
      <div className="section-container-medium section-block">
        <div className="grid gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-x-8 lg:gap-y-10">
          <div className="border-dk-token border-t pt-4">
            <div className="text-caption-token text-dk-meta-token uppercase tracking-[0.16em]">{section.title}</div>
            {isEnglish ? (
              <div className="font-display text-donation-cta-token mt-4 text-4xl font-bold leading-[0.92] sm:text-5xl">
                {section.headline.map((item) => (
                  <div key={item}>{item}</div>
                ))}
              </div>
            ) : (
              <div className="font-display text-donation-cta-token mt-4 inline-grid grid-flow-col gap-2 text-[3.25rem] font-bold leading-none sm:text-[4rem]">
                {section.headline.map((item) => (
                  <span
                    key={item}
                    className="block"
                    style={{ writingMode: "vertical-rl", textOrientation: "upright", letterSpacing: "0.03em" }}
                  >
                    {item}
                  </span>
                ))}
              </div>
            )}
          </div>

          {section.goals.map((item, index) => (
            <article key={item.title} className="border-dk-token min-h-[13.5rem] border-t pt-4 text-left sm:min-h-[14.25rem]">
              <div className="grid grid-cols-[2.5rem_1fr] items-start gap-2.5">
                <div className="text-caption-token text-dk-meta-token whitespace-nowrap">({String(index + 1).padStart(2, "0")})</div>
                <div
                  className={`min-w-0 w-full text-right font-semibold ${
                    isEnglish
                      ? "text-body-token leading-tight min-h-[2.9rem] sm:min-h-[3.2rem]"
                      : "text-base leading-[1.3] sm:text-[1.3rem] min-h-[2.7rem] sm:min-h-[3rem]"
                  }`}
                  style={{ textWrap: "pretty" }}
                >
                  {formatGoalTitle(item.title, isEnglish, item.titleLines)}
                </div>
              </div>
              <div className="content-card-stack mt-1.5 gap-1.5">
                <p className={`${isEnglish ? "text-caption-token" : "font-zh-serif text-[0.94rem]"} font-semibold leading-[1.6] text-dk-title-token`}>
                  {item.note}
                </p>
                <div className="border-dk-token mt-1 border-l pl-3 text-right">
                  <p className={`${isEnglish ? "text-caption-token" : "font-zh-serif text-[0.94rem]"} leading-[1.62] text-donation-cta-token`}>
                    {item.verse}
                  </p>
                  <p className="text-caption-token text-donation-cta-token mt-1">{item.ref}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </RevealSection>
  );
}
