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
  const prayerCardMediaKeys: MediaKey[] = ["prayerCardAltar", "prayerCardPlatform", "prayerCardSending"];
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
    <main className="bg-surface-a pb-16">
      <section className="relative w-full overflow-hidden bg-stats-token text-white">
        <div className="relative h-[320px] w-full md:h-[480px]">
          <AppImage mediaKey="prayerHero" locale={normalizedLocale} fill className="object-cover object-center" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/40 to-black/60" />
        </div>
        <div className="absolute inset-0 flex items-center justify-center text-center px-6 pt-24 md:pt-32">
          <div className="max-w-3xl space-y-4">
            <h1 className="text-3xl font-semibold md:text-5xl">{messages.prayer.heroTitle}</h1>
            <p className="text-base text-dk-title-token md:text-lg">{messages.prayer.heroBody}</p>
          </div>
        </div>
      </section>

      <section className="bg-rhythm-b section-rhythm-divider">
        <div className="mx-auto w-full max-w-[100rem] px-4 md:px-5 xl:px-6 section-block-tight space-y-8">
          <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {cards.map((card, index) => {
            const links = cardLinks[index];
            const secondaryLinks = links.secondary.filter((link) => Boolean(link.label && link.href));

            return (
              <article key={`${card.title}-${index}`} className="card-base card-base-hover flex h-full flex-col p-6">
                <div
                  className={`relative w-full overflow-hidden rounded-xl bg-surface-b ${
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

                <div className="mt-4 flex flex-1 flex-col">
                  <h3 className="text-h3-token text-heading-token font-semibold">{card.title}</h3>
                  <p className="text-body-token text-body-color-token mt-4">{card.body}</p>
                  <div className="text-caption-token text-muted-token mt-4 space-y-1">
                    <div className="whitespace-pre-line">{card.detail1}</div>
                    <div className="whitespace-pre-line">{card.detail2}</div>
                  </div>

                  <div className="mt-auto space-y-3 pt-5">
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
                          className="link-primary focus-ring-token block text-sm"
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
                            className="link-primary focus-ring-token block text-sm"
                            href={link.href}
                            target="_blank"
                            rel="noreferrer"
                          >
                            {link.label}
                          </a>
                        ))}
                      </div>
                    ) : null}

                    {card.note ? (
                      <p className="text-caption-token border-token border-t pt-3 whitespace-pre-line text-muted-token">
                        {card.note}
                      </p>
                    ) : null}

                    {card.cta1 && links.primaryHref ? (
                      <a
                        className="btn-base btn-primary focus-ring-token mt-auto w-full"
                        href={links.primaryHref}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {card.cta1}
                      </a>
                    ) : null}
                  </div>
                </div>
              </article>
            );
          })}
          </section>
        </div>
      </section>
    </main>
  );
}
