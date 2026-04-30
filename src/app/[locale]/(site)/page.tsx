import Image from "next/image";
import AlignWithGodSection from "@/components/AlignWithGodSection";
import AppImage from "@/components/AppImage";
import MobileMinistryScroller from "@/components/MobileMinistryScroller";
import MinistryCarousel from "@/components/MinistryCarousel";
import ScrollToSectionButton from "@/components/ScrollToSectionButton";
import RevealSection from "@/components/home/RevealSection";
import SectionHeader from "@/components/home/SectionHeader";
import { getMediaSrc } from "@/content/media";
import { resolveCmsImageUrl } from "@/lib/cms-media";
import { getFeaturedDiscipleshipPrograms, hasLocalDetail } from "@/lib/discipleship";
import { formatEventDateTimeRange } from "@/lib/event-schedule";
import { getCalendarEventsSafeResult } from "@/lib/events";
import { getFixedTopTitle } from "@/content/ministries/top-sections";
import { getMinistriesListSafe } from "@/lib/ministries";
import { getMessages, normalizeLocale, pickLocalized, withLocale } from "@/lib/i18n";

function excerpt(text: string, maxLength: number) {
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength).trim()}...`;
}

function splitFixedLines(text: string): string[] {
  return text
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.length > 0);
}

function toTodayKey(): string {
  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, "0");
  const d = String(now.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const normalizedLocale = normalizeLocale(locale);
  const messages = getMessages(normalizedLocale);
  const [ministryItems, eventResult] = await Promise.all([getMinistriesListSafe(), getCalendarEventsSafeResult()]);
  const wpSlides = ministryItems
    .map((item) => {
      const heroSrc = resolveCmsImageUrl(item.fields.heroImage?.node?.sourceUrl);
      if (!heroSrc || !item.section.top) return null;
      const title = pickLocalized(normalizedLocale, {
        en: item.fields.titleEn,
        zh: item.fields.titleZh,
        fallback: item.slug,
      });
      const subtitle = item.section.top
        ? getFixedTopTitle(item.section.top, normalizedLocale)
        : item.section.topName || "";
      return {
        title,
        subtitle,
        src: heroSrc,
        href: withLocale(normalizedLocale, `/ministries/${item.section.top}/${item.slug}`),
      };
    })
    .filter((item): item is NonNullable<typeof item> => Boolean(item))
    .slice(0, 8);
  const slides =
    wpSlides.length > 0
      ? wpSlides
      : messages.home.carousel.map((item) => ({
          ...item,
          src: getMediaSrc("heroFallback"),
          href: withLocale(normalizedLocale, "/ministries"),
        }));
  const featuredTrainings = getFeaturedDiscipleshipPrograms(3).map((item) => {
    const title = normalizedLocale === "en" ? item.nameEn : item.nameZh;
    const summary = normalizedLocale === "en" ? item.summaryEn : item.summaryZh;
    const href = hasLocalDetail(item.id)
      ? withLocale(normalizedLocale, `/discipleship/${item.id}`)
      : withLocale(normalizedLocale, "/discipleship");

    return {
      id: item.id,
      title,
      desc: excerpt(summary, normalizedLocale === "en" ? 110 : 52),
      href,
      imageSrc: item.homeImage ?? "/assets/images/discipleship.png",
    };
  });
  const todayKey = toTodayKey();
  const upcomingEvents = eventResult.items.filter((item) => item.date >= todayKey).slice(0, 3);
  const donationCtaLabel = "Donate Now";

  return (
    <main className="min-h-screen bg-surface-a text-heading-token">
      <section className="relative min-h-screen min-h-[100svh] overflow-hidden text-white md:hidden">
        <div className="absolute inset-0">
          <video className="h-full w-full object-cover object-center" autoPlay loop muted playsInline preload="auto" suppressHydrationWarning>
            <source src="/videos/brc-hero2.mp4" type="video/mp4" />
          </video>
          <div className="media-overlay-hero-bright absolute inset-0" />
        </div>
        <div className="relative mx-auto flex min-h-screen min-h-[100svh] max-w-lg items-center justify-center px-6 pt-20 text-center">
          <div className="w-full max-w-md">
            <h1 className="font-display hero-title-xl text-display-token font-semibold">
              {messages.home.hero.title}
              <span
                className={`hero-subtitle-xl text-donation-cta-token mt-2 block ${
                  normalizedLocale === "en" ? "hero-subtitle-singleline" : ""
                }`}
              >
                {messages.home.hero.subtitle}
              </span>
            </h1>
            <div className="mt-8 flex flex-col gap-3.5">
              <a
                className="hero-cta hero-cta-secondary hero-cta-xl btn-base btn-inverse focus-ring-token w-full"
                href={withLocale(normalizedLocale, "/about")}
              >
                {messages.home.hero.ctaPrimary}
              </a>
              <a
                className="hero-cta hero-cta-primary hero-cta-xl btn-base btn-primary focus-ring-token w-full"
                href={withLocale(normalizedLocale, "/donation")}
              >
                {messages.home.hero.ctaSecondary}
              </a>
            </div>
          </div>
        </div>
        <ScrollToSectionButton
          className="icon-btn-inverse scroll-cue focus-ring-token absolute bottom-5 left-1/2 z-10 -translate-x-1/2"
          targetId="home-next-section"
          ariaLabel={messages.home.hero.scrollDownAria}
        >
          <span className="text-lg leading-none">↓</span>
        </ScrollToSectionButton>
      </section>

      <section className="relative hidden min-h-[70vh] overflow-hidden text-white md:block md:min-h-[100vh]">
        <div className="absolute inset-0">
          <video
            className="h-full w-full object-cover object-center"
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            suppressHydrationWarning
          >
            <source src="/videos/brc-hero2.mp4" type="video/mp4" />
          </video>
          <div className="media-overlay-hero-bright absolute inset-0" />
        </div>
        <div className="relative mx-auto max-w-7xl px-6 py-24 md:px-12 md:py-40 min-h-[70vh] md:min-h-[100vh] flex items-center justify-center">
          <div className="mx-auto max-w-5xl text-center">
            <h1 className="font-display hero-title-xl text-display-token text-dk-title-token mt-4 font-semibold leading-tight">
              {messages.home.hero.title}
              <span
                className={`hero-subtitle-xl text-donation-cta-token mt-2 block ${
                  normalizedLocale === "en" ? "hero-subtitle-singleline" : ""
                }`}
              >
                {messages.home.hero.subtitle}
              </span>
            </h1>
            <div className="mt-10 flex items-center justify-center gap-4">
              <a
                className="hero-cta hero-cta-secondary hero-cta-xl btn-base btn-inverse focus-ring-token"
                href={withLocale(normalizedLocale, "/about")}
              >
                {messages.home.hero.ctaPrimary}
              </a>
              <a
                className="hero-cta hero-cta-primary hero-cta-xl btn-base btn-primary focus-ring-token"
                href={withLocale(normalizedLocale, "/donation")}
              >
                {messages.home.hero.ctaSecondary}
              </a>
            </div>
          </div>
        </div>
        <ScrollToSectionButton
          className="icon-btn-inverse scroll-cue focus-ring-token absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
          targetId="home-next-section"
          ariaLabel={messages.home.hero.scrollDownAria}
        >
          <span className="text-lg leading-none">↓</span>
        </ScrollToSectionButton>
      </section>

      <div id="home-next-section" className="h-px scroll-mt-20 md:scroll-mt-24" aria-hidden="true" />

      <div className="md:hidden">
        <AlignWithGodSection locale={normalizedLocale} />
      </div>

      <div className="bg-rhythm-a md:hidden">
        <RevealSection className="space-y-0">
          <div className="relative min-h-[200px] overflow-hidden">
            <AppImage mediaKey="homeMission" locale={normalizedLocale} fill className="object-cover object-center" />
            <div className="media-overlay-medium absolute inset-0" />
            <div className="relative z-10 space-y-1.5 px-5 py-4 text-center text-white">
              <h2 className="font-display text-h3-token font-semibold">{messages.home.mission.title}</h2>
              <div className="text-caption-token space-y-1 leading-relaxed text-white/90">
                {splitFixedLines(messages.home.mission.body).map((line) => (
                  <p key={line}>{line}</p>
                ))}
              </div>
            </div>
          </div>

          <div className="relative min-h-[200px] overflow-hidden">
            <AppImage mediaKey="homeVision" locale={normalizedLocale} fill className="object-cover object-center" />
            <div className="media-overlay-medium absolute inset-0" />
            <div className="relative z-10 space-y-1.5 px-5 py-4 text-center text-white">
              <h2 className="font-display text-h3-token font-semibold">{messages.home.vision.title}</h2>
              <div className="text-caption-token space-y-1 leading-relaxed text-white/90">
                {splitFixedLines(messages.home.vision.body).slice(0, 3).map((line) => (
                  <p key={line}>{line}</p>
                ))}
              </div>
            </div>
          </div>
        </RevealSection>

        <RevealSection className="bg-stats-token text-white">
          <div className="grid grid-cols-2 divide-x divide-y divide-[rgba(255,220,160,.2)]">
            {messages.home.stats.map((item) => (
              <div key={item.label} className="flex min-h-[90px] flex-col items-center justify-center px-3 py-2.5 text-center">
                <div className="font-display text-dk-hi-token text-2xl font-bold">{item.value}</div>
                <div className="text-caption-token text-stats-label-token mt-1">{item.label}</div>
              </div>
            ))}
          </div>
        </RevealSection>

        <RevealSection className="section-container-medium py-3">
          <article className="card-overlay-card relative min-h-[190px] overflow-hidden">
            <AppImage mediaKey="homePrayerRoom" locale={normalizedLocale} fill className="object-cover object-center" />
            <div className="media-overlay-strong absolute inset-0" />
            <div className="relative z-10 flex min-h-[190px] flex-col items-center justify-center space-y-1.5 px-5 py-4 text-center text-white">
              <h2 className="font-display text-h3-token font-semibold">{messages.home.prayer.title}</h2>
              <p className="text-caption-token leading-relaxed text-white/90">{messages.home.prayer.body}</p>
              <a className="link-inverse inline-flex justify-center text-sm focus-ring-token" href={withLocale(normalizedLocale, "/prayer")}>
                {messages.home.prayer.cta}
              </a>
            </div>
          </article>
        </RevealSection>

        <RevealSection className="section-container-medium mt-3">
          <div>
            <SectionHeader
              title={messages.home.ministries.title}
              cta={{
                label: messages.home.ministries.cta,
                href: withLocale(normalizedLocale, "/ministries"),
                className: "text-caption-token",
              }}
              titleClassName="text-h3-token"
            />
          </div>
          <MobileMinistryScroller
            slides={slides.slice(0, 5)}
          />
        </RevealSection>

        {upcomingEvents.length > 0 ? (
          <RevealSection className="section-container-medium mt-3">
            <div>
              <SectionHeader
                title={messages.home.events.title}
                cta={{
                  label: messages.home.events.cta,
                  href: withLocale(normalizedLocale, "/calendar"),
                  className: "text-caption-token",
                }}
                titleClassName="text-h3-token"
              />
            </div>
            <div
              className="mt-2.5 flex snap-x gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
              aria-label={messages.home.events.title}
            >
              {upcomingEvents.map((item) => {
                const title = normalizedLocale === "en" ? item.titleEn : item.titleZh;
                const meta = [formatEventDateTimeRange(item), item.location].filter((value) => value && value.length > 0).join(" · ");
                return (
                  <article key={item.id} className="card-overlay-card relative min-h-[160px] min-w-[88%] snap-start overflow-hidden">
                    <Image src={item.image} alt={title} fill sizes="88vw" className="object-cover object-center" />
                    <div className="media-overlay-strong absolute inset-0" />
                    <div className="absolute inset-x-0 bottom-0 space-y-1.5 px-4 pb-4 text-center text-white">
                      <div className="text-sm font-semibold">{title}</div>
                      <div className="text-caption-token leading-relaxed text-white/90">{meta}</div>
                      <a className="inline-flex justify-center text-sm link-inverse focus-ring-token" href={withLocale(normalizedLocale, `/events/${item.id}`)}>
                        {messages.home.events.detailsCta}
                      </a>
                    </div>
                  </article>
                );
              })}
            </div>
          </RevealSection>
        ) : null}

        <RevealSection className="section-container-medium mt-3">
          <div>
            <SectionHeader
              title={messages.home.trainings.title}
              cta={{
                label: messages.home.trainings.cta,
                href: withLocale(normalizedLocale, "/discipleship"),
                className: "text-caption-token",
              }}
                titleClassName="text-h3-token"
              />
            </div>
          <div className="mt-2.5 grid grid-cols-3 gap-2" aria-label={messages.home.trainings.title}>
            {featuredTrainings.map((item) => (
              <a key={item.id} href={item.href} className="card-overlay-card relative block min-h-[118px] overflow-hidden">
                <Image src={item.imageSrc} alt={item.title} fill sizes="33vw" className="object-cover object-center" />
                <div className="media-overlay-strong absolute inset-0" />
                <div className="absolute inset-x-0 bottom-0 px-2 pb-2 text-center text-white">
                  <div className="text-xs font-semibold leading-tight">{item.title}</div>
                </div>
              </a>
            ))}
          </div>
        </RevealSection>

        <RevealSection className="bg-stats-token mt-3">
          <div className="section-container-medium pt-5 pb-0">
            <div className="px-1 pt-2 pb-4 text-center">
              <h2 className="font-display text-h3-token text-dk-title-token font-semibold">{messages.home.donation.title}</h2>
              <p className="text-body-token text-stats-label-token mt-2">{messages.home.donation.body}</p>
              <a className="btn-base btn-donation-cta focus-ring-token mt-4 w-full pb-3 pt-2.5 sm:w-auto" href={withLocale(normalizedLocale, "/donation")}>
                {donationCtaLabel}
              </a>
            </div>
          </div>
        </RevealSection>

      </div>

      <RevealSection className="bg-surface-a hidden min-h-[35vh] md:block">
        <div className="hidden md:grid md:min-h-[35vh] md:grid-cols-2">
          <div className="relative min-h-[240px] md:min-h-[35vh]">
            <AppImage mediaKey="homeMission" locale={normalizedLocale} fill className="object-cover object-center" />
          </div>

          <div className="flex items-center">
            <div className="mx-auto max-w-2xl space-y-4 px-6 py-10 md:py-14">
              <h2 className="font-display text-h2-token text-heading-token font-semibold">{messages.home.mission.title}</h2>
              <div className="text-body-token text-body-color-token space-y-1">
                {splitFixedLines(messages.home.mission.body).map((line) => (
                  <p key={line} className="lg:whitespace-nowrap">
                    {line}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </RevealSection>

      <RevealSection className="bg-surface-b hidden min-h-[35vh] md:block">
        <div className="hidden md:grid md:min-h-[35vh] md:grid-cols-2">
          <div className="flex items-center">
            <div className="mx-auto max-w-2xl space-y-4 px-6 py-10 md:py-14">
              <h2 className="font-display text-h2-token text-heading-token font-semibold">{messages.home.vision.title}</h2>
              <div className="text-body-token text-body-color-token space-y-1">
                {splitFixedLines(messages.home.vision.body).map((line) => (
                  <p key={line} className="lg:whitespace-nowrap">
                    {line}
                  </p>
                ))}
              </div>
            </div>
          </div>
          <div className="relative min-h-[240px] md:min-h-[35vh]">
            <AppImage mediaKey="homeVision" locale={normalizedLocale} fill className="object-cover object-center" />
          </div>
        </div>
      </RevealSection>

      <RevealSection className="bg-stats-token hidden min-h-[20vh] text-white md:block">
        <div className="relative grid w-full grid-cols-1 text-center md:grid-cols-4 md:min-h-[20vh]">
          {messages.home.stats.map((item) => (
            <div
              key={item.label}
              className="border-dk-token flex min-h-[110px] flex-col items-center justify-center border-t px-6 text-center md:min-h-[20vh] md:border-l md:border-t-0"
            >
              <div className="font-display text-dk-hi-token text-4xl font-bold">{item.value}</div>
              <div className="text-caption-token text-stats-label-token mt-1">{item.label}</div>
            </div>
          ))}
        </div>
      </RevealSection>

      <div className="hidden md:block">
        <AlignWithGodSection locale={normalizedLocale} />
      </div>

      <RevealSection className="bg-rhythm-b section-rhythm-divider hidden md:block">
        <div className="section-container-medium section-block-tight">
          <div className="card-base overflow-hidden md:grid md:grid-cols-[1.05fr_0.95fr]">
            <div className="relative min-h-[320px]">
              <AppImage mediaKey="homePrayerRoom" locale={normalizedLocale} fill className="object-cover object-center" />
              <div className="media-overlay-soft absolute inset-0" />
            </div>
            <div className="flex items-center">
              <div className="mx-auto max-w-xl space-y-4 px-8 py-8 lg:px-10">
                <h2 className="font-display text-h2-token text-heading-token font-semibold">{messages.home.prayer.title}</h2>
                <p className="text-body-token text-body-color-token">{messages.home.prayer.body}</p>
                <a className="link-primary focus-ring-token inline-flex text-sm" href={withLocale(normalizedLocale, "/prayer")}>
                  {messages.home.prayer.cta}
                </a>
              </div>
            </div>
          </div>
        </div>
      </RevealSection>
      <RevealSection className="bg-rhythm-a section-rhythm-divider hidden md:block">
        <div className="section-container-medium section-block-tight">
          <SectionHeader
            title={messages.home.ministries.title}
            cta={{
              label: messages.home.ministries.cta,
              href: withLocale(normalizedLocale, "/ministries"),
            }}
          />
          <div className="mt-6">
            <MinistryCarousel slides={slides} detailsLabel={messages.ministries.detailsCta} />
          </div>
        </div>
      </RevealSection>

      {upcomingEvents.length > 0 ? (
        <RevealSection className="bg-rhythm-b section-rhythm-divider hidden md:block">
          <div className="section-container-medium section-block-tight">
            <SectionHeader
              title={messages.home.events.title}
              cta={{
                label: messages.home.events.cta,
                href: withLocale(normalizedLocale, "/calendar"),
              }}
            />
            <div className="mt-6 grid gap-6 md:grid-cols-3">
              {upcomingEvents.map((item) => {
                const title = normalizedLocale === "en" ? item.titleEn : item.titleZh;
                const subtitle = normalizedLocale === "en" ? item.titleZh : item.titleEn;
                const meta = [formatEventDateTimeRange(item), item.location].filter((value) => value && value.length > 0).join(" · ");
                return (
                  <article key={item.id} className="card-base card-base-hover overflow-hidden">
                    <div className="card-media-top relative h-44 w-full">
                      <Image src={item.image} alt={title} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover object-center" />
                    </div>
                    <div className="space-y-2 p-5">
                      <div className="text-h3-token text-heading-token font-semibold">{title}</div>
                      <div className="text-caption-token text-muted-token">{subtitle}</div>
                      <div className="text-body-token text-body-color-token">{meta}</div>
                      <a
                        className="focus-ring-token link-primary inline-flex pt-1 text-sm"
                        href={withLocale(normalizedLocale, `/events/${item.id}`)}
                      >
                        {messages.home.events.detailsCta}
                      </a>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </RevealSection>
      ) : null}

      <RevealSection className="bg-rhythm-a section-rhythm-divider hidden md:block">
        <div className="section-container-medium section-block-tight">
          <SectionHeader
            title={messages.home.trainings.title}
            cta={{
              label: messages.home.trainings.cta,
              href: withLocale(normalizedLocale, "/discipleship"),
            }}
          />
          <div className="mt-6 grid gap-8 md:grid-cols-3">
            {featuredTrainings.map((item) => (
              <div key={item.id} className="card-base card-base-hover group p-0">
                <div className="card-media-top relative h-40 w-full overflow-hidden rounded-t-[var(--radius-card)]">
                  <Image src={item.imageSrc} alt={item.title} fill sizes="(max-width: 768px) 33vw, 33vw" className="object-cover object-center" />
                </div>
                <div className="px-4 pb-4 pt-4">
                <div className="text-h3-token text-heading-token font-semibold">{item.title}</div>
                <p className="text-body-token text-body-color-token mt-1">{item.desc}</p>
                <a
                  className="focus-ring-token link-primary mt-3 inline-flex text-sm"
                  href={item.href}
                >
                  {messages.home.trainings.detailsCta}
                </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </RevealSection>

      <RevealSection className="bg-stats-token section-rhythm-divider hidden md:block">
        <div className="section-container-medium section-block-tight text-heading-token">
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
            <div>
              <h2 className="font-display text-h2-token text-dk-title-token font-semibold">{messages.home.donation.title}</h2>
              <p className="text-body-token text-stats-label-token mt-2">{messages.home.donation.body}</p>
            </div>
            <a className="btn-base btn-donation-cta focus-ring-token pt-3 pt-2.5" href={withLocale(normalizedLocale, "/donation")}>
              {donationCtaLabel}
            </a>
          </div>
        </div>
      </RevealSection>

    </main>
  );
}
