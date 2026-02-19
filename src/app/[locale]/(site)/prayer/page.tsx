import Image from "next/image";
import { getMessages, normalizeLocale } from "@/lib/i18n";

export default async function PrayerPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const messages = getMessages(normalizeLocale(locale));
  const cards = messages.prayer.cards;

  return (
    <main className="pb-16">
      <section className="relative w-full overflow-hidden bg-zinc-900 text-white">
        <div className="relative h-[320px] w-full md:h-[480px]">
          <Image
            src="/images/prayerRoom.jpeg"
            alt="Prayer Room"
            fill
            className="object-cover object-center"
          />
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
          <div className="rounded-2xl border border-zinc-200 bg-white p-6 space-y-4">
            <div className="relative h-40 w-full overflow-hidden rounded-xl bg-zinc-100">
              <Image src="/images/hero.jpeg" alt={cards[0].title} fill className="object-cover object-center" />
            </div>
            <h2 className="text-xl font-semibold">{cards[0].title}</h2>
            <p className="text-sm text-zinc-600">{cards[0].body}</p>
            <div className="text-sm text-zinc-500 space-y-1">
              <div>{cards[0].detail1}</div>
              <div>{cards[0].detail2}</div>
            </div>
            <a
              className="inline-flex text-sm font-medium text-zinc-900 underline"
              href="https://us06web.zoom.us/j/88081177356?pwd=txHMfslJe9WPc4laR8eAm7NnGOnk5V.1"
            >
              {cards[0].cta1}
            </a>
            <br />
            <a
              className="inline-flex text-sm font-medium text-zinc-900 underline"
              href="https://docs.google.com/spreadsheets/d/1bHV9o1poaXOmpEF5rai40jMv30KphtcB/edit?gid=1236658947#gid=1236658947"
            >
              {cards[0].cta2}
            </a>
            <p className="text-sm text-zinc-500 space-y-1">{cards[0].note}</p>
          </div>

          <div className="rounded-2xl border border-zinc-200 bg-white p-6 space-y-4">
            <div className="relative h-40 w-full overflow-hidden rounded-xl bg-zinc-100">
              <Image src="/images/hero.jpeg" alt={cards[1].title} fill className="object-cover object-center" />
            </div>
            <h2 className="text-xl font-semibold">{cards[1].title}</h2>
            <p className="text-sm text-zinc-600">{cards[1].body}</p>
            <div className="text-sm text-zinc-500 space-y-1">
              <div>{cards[1].detail1}</div>
              <div>{cards[1].detail2}</div>
            </div>
            <div className="flex gap-3">
              <a className="inline-flex text-sm font-medium text-zinc-900 underline" href="#">
                {cards[1].cta1}
              </a>
            </div>
          </div>

          <div className="rounded-2xl border border-zinc-200 bg-white p-6 space-y-4">
            <div className="relative h-40 w-full overflow-hidden rounded-xl bg-zinc-100">
              <Image src="/images/hero.jpeg" alt={cards[2].title} fill className="object-cover object-center" />
            </div>
            <h2 className="text-xl font-semibold">{cards[2].title}</h2>
            <p className="text-sm text-zinc-600">{cards[2].body}</p>
            <div className="text-sm text-zinc-500 space-y-1">
              <div>{cards[2].detail1}</div>
              <div>{cards[2].detail2}</div>
            </div>
            <a className="inline-flex text-sm font-medium text-zinc-900 underline" href="#">
              {cards[2].cta1}
            </a>
          </div>
        </section>


      </div>
    </main>
  );
}
