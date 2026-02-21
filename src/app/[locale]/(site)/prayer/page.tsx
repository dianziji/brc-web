import type { MediaKey } from "@/content/media";
import AppImage from "@/components/AppImage";
import { getMessages, normalizeLocale } from "@/lib/i18n";
import MorningPrayerGuideModal from "@/components/MorningPrayerGuideModal";

export default async function PrayerPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const normalizedLocale = normalizeLocale(locale);
  const messages = getMessages(normalizedLocale);
  const cards = messages.prayer.cards;
  const morningPrayerPdfHref =
    "https://www.bethelrc.org/images/stories/feature/MP/%E5%A6%82%E4%BD%95%E5%8A%A0%E5%85%A5BRC%E6%99%A8%E7%A6%B1ZoomMeeting.pdf";
  const weeklySharingDocHref =
    "https://docs.google.com/document/d/10o7j7-wkujRHFk2_nz_W8V8aVXOnRbagzTUDS_oEDSc/edit?usp=sharing";
  const prayerCardMediaKeys: MediaKey[] = ["prayerCardAltar", "prayerCardPlatform", "prayerCardRpg"];
  const prayerCardImageWrapClassNames = ["h-48 md:h-52", "h-48 md:h-52", "h-48 md:h-52"];
  const prayerCardImageClassNames = [
    "object-cover object-[center_30%]",
    "object-cover object-[center_28%]",
    "object-cover object-center",
  ];
  const cardLinks = [
    {
      primaryHref: "https://us06web.zoom.us/j/88081177356?pwd=txHMfslJe9WPc4laR8eAm7NnGOnk5V.1",
      secondary: [
        { href: "https://bethelrc.org/index.php/9-feature/312-24x7-prayer", label: cards[0].cta2 },
        {
          href: "https://docs.google.com/spreadsheets/d/1bHV9o1poaXOmpEF5rai40jMv30KphtcB/edit?gid=1236658947#gid=1236658947",
          label: cards[0].cta3,
        },
      ],
    },
    {
      primaryHref: "https://zoom.us/j/561386692?pwd=T0dWYi9HMFZMSUZ0SzJ6bld6cFJIUT09",
      secondary: [],
    },
    {
      primaryHref: "https://us02web.zoom.us/j/86451938132?pwd=bXhXeG4wSXd-HV0dwRWNMd-m5PY1p5Zz09",
      secondary: [
        {
          href: "https://i0.wp.com/bethelrc.org/home3/bethelrc/NewBRC/home3/bethelrc/NewBRC/wp-content/uploads/2025/07/RPG-IMAGE1.jpg?ssl=1",
          label: cards[2].cta2,
        },
      ],
    },
  ];

  return (
    <main className="pb-16">
      <section className="relative w-full overflow-hidden bg-zinc-900 text-white">
        <div className="relative h-[320px] w-full md:h-[480px]">
          <AppImage mediaKey="prayerHero" locale={normalizedLocale} fill className="object-cover object-center" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/40 to-black/60" />
        </div>
        <div className="absolute inset-0 flex items-center justify-center text-center px-6 pt-24 md:pt-32">
          <div className="max-w-3xl space-y-4">
            <h1 className="text-3xl font-semibold md:text-5xl">{messages.prayer.heroTitle}</h1>
            <p className="text-base text-zinc-200 md:text-lg">{messages.prayer.heroBody}</p>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-6 pt-10 md:pt-16 space-y-10 md:space-y-12">
        <section className="grid gap-6 md:grid-cols-3">
          {cards.map((card, index) => {
            const links = cardLinks[index];
            const secondaryLinks = links.secondary.filter((link) => Boolean(link.label));

            return (
              <div key={`${card.title}-${index}`} className="rounded-2xl border border-zinc-200 bg-white p-6 space-y-4">
                <div
                  className={`relative w-full overflow-hidden rounded-xl bg-zinc-100 ${
                    prayerCardImageWrapClassNames[index] || "h-40"
                  }`}
                >
                  <AppImage
                    mediaKey={prayerCardMediaKeys[index] || "heroFallback"}
                    locale={normalizedLocale}
                    alt={card.title}
                    fill
                    className={prayerCardImageClassNames[index] || "object-cover object-center"}
                  />
                </div>
                <h2 className="text-xl font-semibold">{card.title}</h2>
                <p className="text-sm text-zinc-600">{card.body}</p>
                <div className="text-sm text-zinc-500 space-y-1">
                  <div>{card.detail1}</div>
                  <div>{card.detail2}</div>
                </div>

                <a
                  className="inline-flex w-full items-center justify-center rounded-lg bg-zinc-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-zinc-700"
                  href={links.primaryHref}
                  target="_blank"
                  rel="noreferrer"
                >
                  {card.cta1}
                </a>

                {index === 1 ? (
                  <MorningPrayerGuideModal
                    guide={messages.prayer.morningGuide}
                    triggerLabel={card.cta2}
                    zoomHref={links.primaryHref}
                    shareHref={morningPrayerPdfHref}
                  />
                ) : null}

                {index === 1 ? (
                  <div className="space-y-1">
                    <a
                      className="block text-sm font-medium text-zinc-900 underline underline-offset-2"
                      href={weeklySharingDocHref}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {card.cta4}
                    </a>
                  </div>
                ) : null}

                {secondaryLinks.length > 0 ? (
                  <div className="space-y-1">
                    {secondaryLinks.map((link) => (
                      <a
                        key={link.href}
                        className="block text-sm font-medium text-zinc-900 underline underline-offset-2"
                        href={link.href}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {link.label}
                      </a>
                    ))}
                  </div>
                ) : null}

                {card.note ? <p className="text-sm text-zinc-500">{card.note}</p> : null}
              </div>
            );
          })}
        </section>


      </div>
    </main>
  );
}
