import Image from "next/image";
import AlignWithGodSection from "@/components/AlignWithGodSection";
import AppImage from "@/components/AppImage";
import HomeContactForm from "@/components/HomeContactForm";
import MinistryCarousel from "@/components/MinistryCarousel";
import { getMediaSrc } from "@/content/media";
import { resolveCmsImageUrl } from "@/lib/cms-media";
import { getFeaturedDiscipleshipPrograms, hasLocalDetail } from "@/lib/discipleship";
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

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const normalizedLocale = normalizeLocale(locale);
  const messages = getMessages(normalizedLocale);
  const ministryItems = await getMinistriesListSafe();
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
      imageSrc: item.homeImage ?? "/images/discipleship.png",
    };
  });

  return (
    <main className="min-h-screen bg-white text-zinc-900">
      <section className="relative min-h-[70vh] md:min-h-[100vh] overflow-hidden bg-zinc-1000 text-white">
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
            <source src="/videos/brc-hero.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-br from-zinc-900/80 via-zinc-800/70 to-zinc-700/60" />
        </div>
        <div className="relative mx-auto max-w-6xl px-6 py-24 md:px-12 md:py-40 min-h-[70vh] md:min-h-[100vh] flex items-center justify-center">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="mt-4 text-3xl font-semibold leading-tight md:text-5xl">
              {messages.home.hero.title}
              <span className="block text-xl text-zinc-200 md:text-3xl">
                {messages.home.hero.subtitle}
              </span>
            </h1>
          </div>
        </div>
      </section>

      <section className="bg-zinc-50 min-h-[35vh]">
        <div className="grid md:grid-cols-2 md:min-h-[35vh]">
          <div className="relative min-h-[240px] md:min-h-[35vh]">
            <AppImage mediaKey="homeMission" locale={normalizedLocale} fill className="object-cover object-center" />
          </div>
          
          <div className="flex items-center">
            <div className="mx-auto max-w-2xl space-y-4 px-6 py-10 md:py-14">
              <h2 className="text-3xl font-semibold">{messages.home.mission.title}</h2>
              <div className="space-y-1 text-sm leading-relaxed text-zinc-600">
                {splitFixedLines(messages.home.mission.body).map((line) => (
                  <p key={line} className="lg:whitespace-nowrap">
                    {line}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white min-h-[35vh]">
        <div className="grid md:grid-cols-2 md:min-h-[35vh]">
          <div className="flex items-center">
            <div className="mx-auto max-w-2xl space-y-4 px-6 py-10 md:py-14">
              <h2 className="text-3xl font-semibold">{messages.home.vision.title}</h2>
              <div className="space-y-1 text-sm leading-relaxed text-zinc-600">
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
      </section>

      <section className="relative bg-zinc-900 text-white min-h-[20vh]">
        <div className="absolute inset-0 bg-gradient-to-r from-zinc-900 via-zinc-800 to-zinc-900" />
        <div className="relative grid w-full grid-cols-1 text-center md:grid-cols-4 md:min-h-[20vh]">
          {messages.home.stats.map((item) => (
            <div
              key={item.label}
              className="flex min-h-[110px] flex-col items-center justify-center border-t border-white/10 px-6 text-center md:min-h-[20vh] md:border-l md:border-t-0"
            >
              <div className="text-3xl font-semibold">{item.value}</div>
              <div className="mt-1 text-sm text-zinc-300">{item.label}</div>
            </div>
          ))}
        </div>
      </section>

      <AlignWithGodSection locale={normalizedLocale} />

      <section className="bg-white min-h-[35vh]">
        <div className="grid md:grid-cols-2 md:items-center">
          <div className="relative min-h-[480px] w-full md:min-h-[35vh]">
            <AppImage mediaKey="homePrayerRoom" locale={normalizedLocale} fill className="object-cover object-center" />
          </div>
          <div className="flex items-center">
            <div className="mx-auto max-w-xl space-y-4 px-6 py-10 md:py-14">
              <h2 className="text-3xl font-semibold">{messages.home.prayer.title}</h2>
              <p className="text-sm text-zinc-600">{messages.home.prayer.body}</p>
              <a
                className="inline-flex text-sm font-medium text-zinc-900 underline"
                href={withLocale(normalizedLocale, "/prayer")}
              >
                {messages.home.prayer.cta}
              </a>
            </div>
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-6xl px-6 py-12">
        <div className="flex items-end justify-between">
          <h2 className="text-3xl font-semibold">{messages.home.ministries.title}</h2>
          <a className="text-sm text-zinc-700 underline" href={withLocale(normalizedLocale, "/ministries")}>
            {messages.home.ministries.cta}
          </a>
        </div>
        <div className="mt-6">
          <MinistryCarousel slides={slides} detailsLabel={messages.ministries.detailsCta} />
        </div>
      </section>


      <section className="bg-zinc-50">
        <div className="mx-auto max-w-6xl px-6 py-12">
          <div className="flex items-end justify-between">
            <h2 className="text-3xl font-semibold">{messages.home.trainings.title}</h2>
            <a
              className="text-sm text-zinc-700 underline"
              href={withLocale(normalizedLocale, "/discipleship")}
            >
              {messages.home.trainings.cta}
            </a>
          </div>
          <div className="mt-6 grid gap-8 md:grid-cols-3">
            {featuredTrainings.map((item) => (
              <div key={item.id} className="group">
                <div className="relative h-40 w-full overflow-hidden bg-white">
                  <Image src={item.imageSrc} alt={item.title} fill className="object-cover object-center" />
                </div>
                <div className="mt-4 text-lg font-medium">{item.title}</div>
                <p className="mt-1 text-sm text-zinc-600">{item.desc}</p>
                <a
                  className="mt-3 inline-flex text-sm text-zinc-900 underline"
                  href={item.href}
                >
                  {messages.home.trainings.detailsCta}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-zinc-900">
        <div className="mx-auto max-w-6xl px-6 py-14 text-white">
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
            <div>
              <h2 className="text-2xl font-semibold">{messages.home.donation.title}</h2>
              <p className="mt-2 text-sm text-zinc-300">{messages.home.donation.body}</p>
            </div>
            <a
              className="inline-flex items-center justify-center rounded-full bg-amber-500 px-6 py-3 text-sm font-semibold text-black"
              href={withLocale(normalizedLocale, "/donation")}
            >
              {messages.home.donation.cta}
            </a>
          </div>
        </div>
      </section>

      <section className="bg-zinc-50">
        <div className="mx-auto max-w-6xl px-6 py-14">
          <div className="grid gap-8 md:grid-cols-[1fr_1.2fr]">
            <div className="space-y-4">
              <h2 className="text-3xl font-semibold">{messages.home.contact.title}</h2>
              <div className="text-sm text-zinc-600">
                <div>{messages.home.contact.address}</div>
                <div>{messages.home.contact.email}</div>
                <div>{messages.home.contact.phone}</div>
              </div>
            </div>
            <HomeContactForm
              locale={normalizedLocale}
              namePlaceholder={messages.home.contact.namePlaceholder}
              emailPlaceholder={messages.home.contact.emailPlaceholder}
              messagePlaceholder={messages.home.contact.messagePlaceholder}
              submitLabel={messages.home.contact.submit}
            />
          </div>
        </div>
      </section>
    </main>
  );
}
