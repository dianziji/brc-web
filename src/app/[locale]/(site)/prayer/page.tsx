import type { MediaKey } from "@/content/media";
import {
  PRAYER_CARD_LINK_CONFIG,
  PRAYER_MORNING_PDF_URL,
  PRAYER_WEEKLY_SHARING_DOC_URL,
} from "@/content/prayer/links";
import AppImage from "@/components/AppImage";
import { getMessages, normalizeLocale } from "@/lib/i18n";
import MorningPrayerGuideModal from "@/components/MorningPrayerGuideModal";

export default async function PrayerPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const normalizedLocale = normalizeLocale(locale);
  const messages = getMessages(normalizedLocale);
  const cards = messages.prayer.cards;
  const prayerCardMediaKeys: MediaKey[] = ["prayerCardAltar", "prayerCardPlatform", "prayerCardRpg"];
  const prayerCardImageWrapClassNames = ["h-48 md:h-52", "h-48 md:h-52", "h-48 md:h-52"];
  const prayerCardImageClassNames = [
    "object-cover object-[center_30%]",
    "object-cover object-[center_28%]",
    "object-cover object-center",
  ];
  const cardLinks = PRAYER_CARD_LINK_CONFIG.map((config, index) => {
    const card = cards[index] as Record<string, string> | undefined;
    return {
      primaryHref: config.primaryHref,
      secondary: config.secondary.map((item) => ({
        href: item.href,
        label: card?.[item.labelField] ?? "",
      })),
    };
  });

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
            const secondaryLinks = links.secondary.filter((link) => Boolean(link.label && link.href));

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
                  <div className="whitespace-pre-line">{card.detail2}</div>
                </div>

                {card.cta1 && links.primaryHref ? (
                  <a
                    className="inline-flex w-full items-center justify-center rounded-lg bg-zinc-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-zinc-700"
                    href={links.primaryHref}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {card.cta1}
                  </a>
                ) : null}

                {index === 1 ? (
                  <MorningPrayerGuideModal
                    guide={messages.prayer.morningGuide}
                    triggerLabel={card.cta2}
                    zoomHref={links.primaryHref}
                    shareHref={PRAYER_MORNING_PDF_URL}
                  />
                ) : null}

                {index === 1 ? (
                  <div className="space-y-1">
                    <a
                      className="block text-sm font-medium text-zinc-900 underline underline-offset-2"
                      href={PRAYER_WEEKLY_SHARING_DOC_URL}
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

                {card.note ? <p className="whitespace-pre-line text-sm text-zinc-500">{card.note}</p> : null}
              </div>
            );
          })}
        </section>


      </div>
    </main>
  );
}
