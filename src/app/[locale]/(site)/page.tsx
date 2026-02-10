import MinistryCarousel from "@/components/MinistryCarousel";
import { getMessages, normalizeLocale, withLocale } from "@/lib/i18n";

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const normalizedLocale = normalizeLocale(locale);
  const messages = getMessages(normalizedLocale);
  const slides = messages.home.carousel.map((item) => ({
    ...item,
    src: "/images/hero.jpeg",
  }));

  return (
    <main className="min-h-screen bg-white text-zinc-900">
      <section className="relative min-h-[70vh] md:min-h-[100vh] overflow-hidden bg-zinc-1000 text-white">
        <div className="absolute inset-0">
          <video
            className="h-full w-full object-cover object-center"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster="/images/hero.jpeg"
          >
            <source src="/videos/hero-test.mp4" type="video/mp4" />
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
          <div className="min-h-[240px] bg-zinc-200 md:min-h-[35vh]" />
          <div className="flex items-center">
            <div className="mx-auto max-w-xl space-y-4 px-6 py-10 md:py-14">
              <h2 className="text-3xl font-semibold">{messages.home.mission.title}</h2>
              <p className="text-sm text-zinc-600">{messages.home.mission.body}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white min-h-[35vh]">
        <div className="grid md:grid-cols-2 md:min-h-[35vh]">
          <div className="flex items-center">
            <div className="mx-auto max-w-xl space-y-4 px-6 py-10 md:py-14">
              <h2 className="text-3xl font-semibold">{messages.home.vision.title}</h2>
              <p className="text-sm text-zinc-600">{messages.home.vision.body1}</p>
              <p className="text-sm text-zinc-600">{messages.home.vision.body2}</p>
            </div>
          </div>
          <div className="min-h-[240px] bg-zinc-200 md:min-h-[35vh]" />
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

      <section className="bg-zinc-50">
        <div className="mx-auto grid max-w-6xl gap-8 px-6 py-16 md:grid-cols-2 md:items-center">
          <div className="h-72 w-full bg-white/60" />
          <div className="space-y-4">
            <h2 className="text-3xl font-semibold">{messages.home.about.title}</h2>
            <p className="text-sm text-zinc-600">{messages.home.about.body}</p>
            <a
              className="inline-flex text-sm font-medium text-zinc-900 underline"
              href={withLocale(normalizedLocale, "/about")}
            >
              {messages.home.about.cta}
            </a>
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
          <MinistryCarousel slides={slides} />
        </div>
      </section>

      <section className="bg-zinc-50">
        <div className="mx-auto max-w-6xl px-6 py-12">
          <div className="flex items-end justify-between">
            <h2 className="text-3xl font-semibold">{messages.home.events.title}</h2>
            <a className="text-sm text-zinc-700 underline" href={withLocale(normalizedLocale, "/calendar")}>
              {messages.home.events.cta}
            </a>
          </div>
          <div className="mt-6 grid gap-8 md:grid-cols-3">
            {messages.home.events.cards.map((item) => (
              <div key={item.title} className="group">
                <div className="h-48 w-full bg-white" />
                <div className="mt-4 text-lg font-medium">{item.title}</div>
                <div className="mt-1 text-sm text-zinc-600">{item.subtitle}</div>
                <a
                  className="mt-3 inline-flex text-sm text-zinc-900 underline"
                  href={withLocale(normalizedLocale, "/calendar")}
                >
                  {messages.home.events.detailsCta}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-12">
        <div className="grid gap-8 md:grid-cols-2 md:items-center">
          <div className="space-y-4">
            <h2 className="text-3xl font-semibold">{messages.home.prayer.title}</h2>
            <p className="text-sm text-zinc-600">{messages.home.prayer.body}</p>
            <a
              className="inline-flex text-sm font-medium text-zinc-900 underline"
              href={withLocale(normalizedLocale, "/prayer")}
            >
              {messages.home.prayer.cta}
            </a>
          </div>
          <div className="space-y-2 text-sm text-zinc-600">
            <div className="text-sm font-medium text-zinc-900">{messages.home.prayer.hoursTitle}</div>
            <div>{messages.home.prayer.hours1}</div>
            <div>{messages.home.prayer.hours2}</div>
          </div>
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
            {messages.home.trainings.cards.map((item) => (
              <div key={item.title} className="group">
                <div className="h-40 w-full bg-white" />
                <div className="mt-4 text-lg font-medium">{item.title}</div>
                <p className="mt-1 text-sm text-zinc-600">{item.desc}</p>
                <a
                  className="mt-3 inline-flex text-sm text-zinc-900 underline"
                  href={withLocale(normalizedLocale, "/discipleship")}
                >
                  {messages.home.trainings.detailsCta}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-12">
        <div className="flex items-end justify-between">
          <h2 className="text-3xl font-semibold">{messages.home.audio.title}</h2>
          <a className="text-sm text-zinc-700 underline" href={withLocale(normalizedLocale, "/audio")}>
            {messages.home.audio.cta}
          </a>
        </div>
        <div className="mt-6 grid gap-8 md:grid-cols-3">
          {messages.home.audio.cards.map((item) => (
            <div key={item.title} className="group">
              <div className="h-40 w-full bg-zinc-100" />
              <div className="mt-4 text-lg font-medium">{item.title}</div>
              <div className="mt-1 text-sm text-zinc-600">{item.subtitle}</div>
              <a
                className="mt-3 inline-flex text-sm text-zinc-900 underline"
                href={withLocale(normalizedLocale, "/audio")}
              >
                {messages.home.audio.detailsCta}
              </a>
            </div>
          ))}
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
            <form className="bg-white/80 p-6">
              <div className="grid gap-4">
                <input
                  className="w-full border-b bg-transparent px-1 py-2 text-sm focus:outline-none"
                  placeholder={messages.home.contact.namePlaceholder}
                  type="text"
                />
                <input
                  className="w-full border-b bg-transparent px-1 py-2 text-sm focus:outline-none"
                  placeholder={messages.home.contact.emailPlaceholder}
                  type="email"
                />
                <textarea
                  className="min-h-[120px] w-full border-b bg-transparent px-1 py-2 text-sm focus:outline-none"
                  placeholder={messages.home.contact.messagePlaceholder}
                />
                <button className="w-full bg-amber-500 px-4 py-2 text-sm font-semibold text-black">
                  {messages.home.contact.submit}
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}
