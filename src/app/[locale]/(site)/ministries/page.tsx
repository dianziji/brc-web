import MinistryCarousel from "@/components/MinistryCarousel";
import { getMessages, normalizeLocale, withLocale } from "@/lib/i18n";

const sections = [
  {
    slug: "mission",
    titleEn: "Mission",
    titleZh: "宣教事工",
    descEn: "Cross-cultural and community outreach ministries.",
    descZh: "跨文化与社区关怀的宣教与服务。",
  },
  {
    slug: "youth",
    titleEn: "Youth",
    titleZh: "青年事工",
    descEn: "Equip youth and build the next generation of disciples.",
    descZh: "装备青年、建造下一代门徒。",
  },
  {
    slug: "family",
    titleEn: "Family",
    titleZh: "家庭事工",
    descEn: "Support families and marriages for growth and renewal.",
    descZh: "支持家庭与婚姻的成长与更新。",
  },
];

export default async function MinistriesIndex({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const normalizedLocale = normalizeLocale(locale);
  const messages = getMessages(normalizedLocale);
  const slides = messages.home.carousel.map((item) => ({
    ...item,
    src: "/images/hero.jpeg",
  }));

  return (
    <main className="mx-auto max-w-6xl px-6 pt-28 pb-10 md:pt-32 space-y-14">
      <section className="space-y-6">
        <div>
          <h1 className="text-3xl font-semibold">{messages.ministries.indexTitle}</h1>
          <p className="mt-2 text-sm text-zinc-600">{messages.ministries.indexBody}</p>
        </div>
        <MinistryCarousel slides={slides} />
      </section>

      <section className="space-y-6">
        <div className="flex items-end justify-between">
          <h2 className="text-2xl font-semibold">{messages.ministries.sectionTitle}</h2>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {sections.map((item) => {
            const title = normalizedLocale === "en" ? item.titleEn : item.titleZh;
            const desc = normalizedLocale === "en" ? item.descEn : item.descZh;
            return (
              <a
                key={item.slug}
                href={withLocale(normalizedLocale, `/ministries/${item.slug}`)}
                className="group rounded-xl border border-zinc-200 bg-white p-6 transition hover:border-zinc-300 hover:shadow-sm"
              >
                <div className="text-lg font-semibold">{title}</div>
                <div className="text-sm text-zinc-500">{normalizedLocale === "en" ? item.titleZh : item.titleEn}</div>
                <p className="mt-3 text-sm text-zinc-600">{desc}</p>
                <span className="mt-4 inline-flex text-sm font-medium text-zinc-900 underline">
                  {messages.ministries.detailsCta}
                </span>
              </a>
            );
          })}
        </div>
      </section>

      <section className="rounded-2xl border border-dashed border-zinc-300 bg-zinc-50 p-8">
        <div className="text-xs uppercase tracking-wide text-zinc-500">Archive</div>
        <h2 className="mt-2 text-2xl font-semibold">{messages.ministries.archiveTitle}</h2>
        <p className="mt-2 text-sm text-zinc-600">{messages.ministries.archiveBody}</p>
      </section>
    </main>
  );
}
