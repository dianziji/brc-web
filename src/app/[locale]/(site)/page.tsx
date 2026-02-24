import Image from "next/image";
import AlignWithGodSection from "@/components/AlignWithGodSection";
import AppImage from "@/components/AppImage";
import HomeContactForm from "@/components/HomeContactForm";
import MobileMinistryScroller from "@/components/MobileMinistryScroller";
import MinistryCarousel from "@/components/MinistryCarousel";
import { getMediaSrc } from "@/content/media";
import { resolveCmsImageUrl } from "@/lib/cms-media";
import { getFeaturedDiscipleshipPrograms, hasLocalDetail } from "@/lib/discipleship";
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

function parseDateKey(dateKey: string): Date | null {
  const matched = dateKey.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (!matched) return null;
  const y = Number(matched[1]);
  const m = Number(matched[2]);
  const d = Number(matched[3]);
  if (!Number.isInteger(y) || !Number.isInteger(m) || !Number.isInteger(d)) return null;
  if (m < 1 || m > 12 || d < 1 || d > 31) return null;
  return new Date(y, m - 1, d);
}

function formatDateLabel(dateKey: string, locale: "zh" | "en"): string {
  const date = parseDateKey(dateKey);
  if (!date) return dateKey;
  return date.toLocaleDateString(locale === "en" ? "en-US" : "zh-TW", {
    year: "numeric",
    month: "short",
    day: "numeric",
    weekday: "short",
  });
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
      imageSrc: item.homeImage ?? "/images/discipleship.png",
    };
  });
  const todayKey = toTodayKey();
  const upcomingEvents = eventResult.items.filter((item) => item.date >= todayKey).slice(0, 3);

  return (
    <main className="min-h-screen bg-white text-zinc-900">
      <section className="relative min-h-[72vh] overflow-hidden bg-zinc-950 text-white md:hidden">
        <div className="absolute inset-0">
          <video className="h-full w-full object-cover object-center" autoPlay loop muted playsInline preload="auto" suppressHydrationWarning>
            <source src="/videos/brc-hero.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-br from-zinc-900/80 via-zinc-800/70 to-zinc-700/60" />
        </div>
        <div className="relative mx-auto flex min-h-[72vh] max-w-md items-center justify-center px-6 pt-20 text-center">
          <h1 className="text-3xl font-semibold leading-tight">
            {messages.home.hero.title}
            <span className="mt-2 block text-xl text-zinc-200">{messages.home.hero.subtitle}</span>
          </h1>
        </div>
      </section>

      <section className="relative hidden min-h-[70vh] overflow-hidden bg-zinc-1000 text-white md:block md:min-h-[100vh]">
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

      <div className="md:hidden">
        <AlignWithGodSection locale={normalizedLocale} />
      </div>

      <div className="md:hidden bg-gradient-to-b from-[#fff7ee] via-white to-[#eef8ff] pb-10 pt-5">
        <section className="space-y-1">
          <div className="relative min-h-[220px] overflow-hidden">
            <AppImage mediaKey="homeMission" locale={normalizedLocale} fill className="object-cover object-center" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/30 to-black/65" />
            <div className="relative z-10 space-y-2 px-5 py-5 text-center text-white">
              <h2 className="text-xl font-semibold">{messages.home.mission.title}</h2>
              <div className="space-y-1 text-xs leading-relaxed text-white/90">
                {splitFixedLines(messages.home.mission.body).slice(0, 3).map((line) => (
                  <p key={line}>{line}</p>
                ))}
              </div>
            </div>
          </div>

          <div className="relative min-h-[220px] overflow-hidden">
            <AppImage mediaKey="homeVision" locale={normalizedLocale} fill className="object-cover object-center" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-black/35 to-black/65" />
            <div className="relative z-10 space-y-2 px-5 py-5 text-center text-white">
              <h2 className="text-xl font-semibold">{messages.home.vision.title}</h2>
              <div className="space-y-1 text-xs leading-relaxed text-white/90">
                {splitFixedLines(messages.home.vision.body).slice(0, 3).map((line) => (
                  <p key={line}>{line}</p>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="mt-1 bg-[#171321] text-white">
          <div className="grid grid-cols-2 divide-x divide-y divide-white/10">
            {messages.home.stats.map((item) => (
              <div key={item.label} className="flex min-h-[86px] flex-col items-center justify-center px-3 py-3 text-center">
                <div className="text-base font-semibold">{item.value}</div>
                <div className="mt-1 text-[10px] text-zinc-300">{item.label}</div>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-1">
          <div className="relative min-h-[220px] overflow-hidden">
            <AppImage mediaKey="homePrayerRoom" locale={normalizedLocale} fill className="object-cover object-center" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-black/35 to-black/70" />
            <div className="relative z-10 space-y-2 px-5 py-5 text-center text-white">
              <h2 className="text-xl font-semibold">{messages.home.prayer.title}</h2>
              <p className="text-xs leading-relaxed text-white/90">{messages.home.prayer.body}</p>
              <a className="inline-flex justify-center text-xs font-medium underline" href={withLocale(normalizedLocale, "/prayer")}>
                {messages.home.prayer.cta}
              </a>
            </div>
          </div>
        </section>

        <section className="mt-6">
          <div className="px-4">
            <div className="flex items-end justify-between">
              <h2 className="text-base font-semibold text-zinc-900">{messages.home.ministries.title}</h2>
              <a className="text-[10px] font-medium text-zinc-700 underline" href={withLocale(normalizedLocale, "/ministries")}>
                {messages.home.ministries.cta}
              </a>
            </div>
          </div>
          <MobileMinistryScroller slides={slides.slice(0, 5)} />
        </section>

        {upcomingEvents.length > 0 ? (
          <section className="mt-6">
            <div className="px-4">
              <div className="flex items-end justify-between">
                <h2 className="text-base font-semibold text-zinc-900">{messages.home.events.title}</h2>
                <a className="text-[10px] font-medium text-zinc-700 underline" href={withLocale(normalizedLocale, "/calendar")}>
                  {messages.home.events.cta}
                </a>
              </div>
            </div>
            <div className="mt-3 space-y-1">
              {upcomingEvents.map((item) => {
                const title = normalizedLocale === "en" ? item.titleEn : item.titleZh;
                const meta = [formatDateLabel(item.date, normalizedLocale), item.time, item.location]
                  .filter((value) => value && value.length > 0)
                  .join(" · ");
                return (
                  <article key={item.id} className="relative min-h-[170px] overflow-hidden">
                    <Image src={item.image} alt={title} fill className="object-cover object-center" />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/35 to-black/80" />
                    <div className="absolute inset-x-0 bottom-0 space-y-1.5 px-4 pb-4 text-center text-white">
                      <div className="text-sm font-semibold">{title}</div>
                      <div className="text-xs leading-relaxed text-white/85">{meta}</div>
                      <a className="inline-flex justify-center text-xs font-medium underline" href={withLocale(normalizedLocale, `/events/${item.id}`)}>
                        {messages.home.events.detailsCta}
                      </a>
                    </div>
                  </article>
                );
              })}
            </div>
          </section>
        ) : null}

        <section className="mt-6">
          <div className="px-4">
            <div className="flex items-end justify-between">
              <h2 className="text-base font-semibold text-zinc-900">{messages.home.trainings.title}</h2>
              <a className="text-[10px] font-medium text-zinc-700 underline" href={withLocale(normalizedLocale, "/discipleship")}>
                {messages.home.trainings.cta}
              </a>
            </div>
          </div>
          <div className="mt-3 space-y-1">
            {featuredTrainings.map((item) => (
              <a key={item.id} href={item.href} className="relative block min-h-[150px] overflow-hidden">
                <Image src={item.imageSrc} alt={item.title} fill className="object-cover object-center" />
                <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/40 to-black/80" />
                <div className="absolute inset-x-0 bottom-0 space-y-1 px-4 pb-4 text-center text-white">
                  <div className="text-sm font-semibold">{item.title}</div>
                  <p className="text-xs leading-relaxed text-white/85">{item.desc}</p>
                  <span className="inline-flex justify-center text-xs font-medium underline">{messages.home.trainings.detailsCta}</span>
                </div>
              </a>
            ))}
          </div>
        </section>

        <section className="mt-6 overflow-hidden bg-gradient-to-br from-[#1c1135] via-[#2b1655] to-[#3f1a70] px-5 py-5 text-center text-white">
          <h2 className="text-base font-semibold">{messages.home.donation.title}</h2>
          <p className="mt-2 text-[10px] leading-relaxed text-white/85">{messages.home.donation.body}</p>
          <a
            className="mt-4 inline-flex justify-center rounded-full bg-[#ffb84d] px-4 py-2 text-xs font-semibold text-black"
            href={withLocale(normalizedLocale, "/donation")}
          >
            {messages.home.donation.cta}
          </a>
        </section>

        <section className="mt-6 bg-white px-4 py-4 text-center">
          <h2 className="text-base font-semibold text-zinc-900">{messages.home.contact.title}</h2>
          <div className="mt-3 space-y-1 text-[10px] leading-relaxed text-zinc-600">
            <div>{messages.home.contact.address}</div>
            <div>{messages.home.contact.email}</div>
            <div>{messages.home.contact.phone}</div>
          </div>
          <a className="mt-3 inline-flex justify-center text-[10px] font-medium text-zinc-900 underline" href={withLocale(normalizedLocale, "/contact")}>
            {messages.nav.contact}
          </a>
        </section>
      </div>

      <section className="hidden md:block bg-zinc-50 min-h-[35vh]">
        <div className="md:hidden px-4 py-5">
          <div className="relative overflow-hidden rounded-2xl">
            <div className="relative min-h-[260px]">
              <AppImage mediaKey="homeMission" locale={normalizedLocale} fill className="object-cover object-center" />
              <div className="absolute inset-0 bg-zinc-900/55" />
              <div className="relative z-10 space-y-3 px-5 py-6 text-white">
                <h2 className="text-2xl font-semibold">{messages.home.mission.title}</h2>
                <div className="space-y-1.5 text-sm leading-relaxed text-zinc-100">
                  {splitFixedLines(messages.home.mission.body).map((line) => (
                    <p key={line}>{line}</p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="hidden md:grid md:min-h-[35vh] md:grid-cols-2">
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

      <section className="hidden md:block bg-white min-h-[35vh]">
        <div className="md:hidden px-4 py-5">
          <div className="relative overflow-hidden rounded-2xl">
            <div className="relative min-h-[260px]">
              <AppImage mediaKey="homeVision" locale={normalizedLocale} fill className="object-cover object-center" />
              <div className="absolute inset-0 bg-zinc-900/55" />
              <div className="relative z-10 space-y-3 px-5 py-6 text-white">
                <h2 className="text-2xl font-semibold">{messages.home.vision.title}</h2>
                <div className="space-y-1.5 text-sm leading-relaxed text-zinc-100">
                  {splitFixedLines(messages.home.vision.body).map((line) => (
                    <p key={line}>{line}</p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="hidden md:grid md:min-h-[35vh] md:grid-cols-2">
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

      <section className="hidden md:block relative bg-zinc-900 text-white min-h-[20vh]">
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

      <div className="hidden md:block">
        <AlignWithGodSection locale={normalizedLocale} />
      </div>

      <section className="hidden md:block bg-white min-h-[35vh]">
        <div className="md:hidden px-4 py-5">
          <div className="relative overflow-hidden rounded-2xl">
            <div className="relative min-h-[260px]">
              <AppImage mediaKey="homePrayerRoom" locale={normalizedLocale} fill className="object-cover object-center" />
              <div className="absolute inset-0 bg-zinc-900/55" />
              <div className="relative z-10 space-y-3 px-5 py-6 text-white">
                <h2 className="text-2xl font-semibold">{messages.home.prayer.title}</h2>
                <p className="text-sm leading-relaxed text-zinc-100">{messages.home.prayer.body}</p>
                <a
                  className="inline-flex text-sm font-medium underline"
                  href={withLocale(normalizedLocale, "/prayer")}
                >
                  {messages.home.prayer.cta}
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="hidden md:grid md:grid-cols-2 md:items-center">
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
      <section className="hidden md:block mx-auto max-w-6xl px-6 py-12">
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

      {upcomingEvents.length > 0 ? (
        <section className="hidden md:block bg-white">
          <div className="mx-auto max-w-6xl px-6 py-12">
            <div className="flex items-end justify-between">
              <h2 className="text-3xl font-semibold">{messages.home.events.title}</h2>
              <a className="text-sm text-zinc-700 underline" href={withLocale(normalizedLocale, "/calendar")}>
                {messages.home.events.cta}
              </a>
            </div>
            <div className="mt-6 grid gap-6 md:grid-cols-3">
              {upcomingEvents.map((item) => {
                const title = normalizedLocale === "en" ? item.titleEn : item.titleZh;
                const subtitle = normalizedLocale === "en" ? item.titleZh : item.titleEn;
                const dateLabel = formatDateLabel(item.date, normalizedLocale);
                const meta = [dateLabel, item.time, item.location].filter((value) => value && value.length > 0).join(" · ");
                return (
                  <article key={item.id} className="overflow-hidden rounded-2xl border border-zinc-200 bg-white">
                    <div className="relative h-44 w-full bg-zinc-100">
                      <Image src={item.image} alt={title} fill className="object-cover object-center" />
                    </div>
                    <div className="space-y-2 p-5">
                      <div className="text-lg font-semibold text-zinc-900">{title}</div>
                      <div className="text-sm text-zinc-500">{subtitle}</div>
                      <div className="text-sm text-zinc-600">{meta}</div>
                      <a
                        className="inline-flex pt-1 text-sm font-medium text-zinc-900 underline"
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
        </section>
      ) : null}

      <section className="hidden md:block bg-zinc-50">
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

      <section className="hidden md:block bg-zinc-900">
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

      <section className="hidden md:block bg-zinc-50">
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
