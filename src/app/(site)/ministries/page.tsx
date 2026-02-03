import MinistryCarousel from "@/components/MinistryCarousel";

const sections = [
  {
    slug: "mission",
    titleEn: "Mission",
    titleZh: "宣教事工",
    desc: "跨文化与社区关怀的宣教与服务。",
  },
  {
    slug: "youth",
    titleEn: "Youth",
    titleZh: "青年事工",
    desc: "装备青年、建造下一代门徒。",
  },
  {
    slug: "family",
    titleEn: "Family",
    titleZh: "家庭事工",
    desc: "支持家庭与婚姻的成长与更新。",
  },
];

export default function MinistriesIndex() {
  return (
    <main className="mx-auto max-w-6xl px-6 pt-28 pb-10 md:pt-32 space-y-14">
      <section className="space-y-6">
        <div>
          <h1 className="text-3xl font-semibold">宣教事工</h1>
          <p className="mt-2 text-sm text-zinc-600">
            重要事工与核心异象的聚焦展示。
          </p>
        </div>
        <MinistryCarousel />
      </section>

      <section className="space-y-6">
        <div className="flex items-end justify-between">
          <h2 className="text-2xl font-semibold">事工板块</h2>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {sections.map((item) => (
            <a
              key={item.slug}
              href={`/ministries/${item.slug}`}
              className="group rounded-xl border border-zinc-200 bg-white p-6 transition hover:border-zinc-300 hover:shadow-sm"
            >
              <div className="text-lg font-semibold">{item.titleEn}</div>
              <div className="text-sm text-zinc-500">{item.titleZh}</div>
              <p className="mt-3 text-sm text-zinc-600">{item.desc}</p>
              <span className="mt-4 inline-flex text-sm font-medium text-zinc-900 underline">
                查看详情
              </span>
            </a>
          ))}
        </div>
      </section>

      <section className="rounded-2xl border border-dashed border-zinc-300 bg-zinc-50 p-8">
        <div className="text-xs uppercase tracking-wide text-zinc-500">Archive</div>
        <h2 className="mt-2 text-2xl font-semibold">过往事工</h2>
        <p className="mt-2 text-sm text-zinc-600">
          这里将展示已归档的过往事工与见证，稍后可继续补充内容。
        </p>
      </section>
    </main>
  );
}

