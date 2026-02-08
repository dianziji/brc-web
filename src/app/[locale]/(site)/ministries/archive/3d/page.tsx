import archiveItems from "@/data/ministryArchive.json";
import ArchiveScene3D from "@/components/ArchiveScene3D";
import { getMessages, normalizeLocale, withLocale } from "@/lib/i18n";

type ArchiveItem = {
  category: string;
  subcategory: string;
  title: string;
  date: string;
  summary: string;
  summaryEn?: string;
  imageUrl: string;
  videoUrl: string;
  link: string;
};

function parseDateKey(value: string) {
  if (!value) return 0;
  const match = String(value).match(/(19|20)\d{2}/g);
  if (!match) return 0;
  const year = parseInt(match[0], 10);
  const monthMatch = String(value).match(/(0?[1-9]|1[0-2])/);
  const month = monthMatch ? parseInt(monthMatch[0], 10) : 1;
  return year * 100 + month;
}

export default async function MinistriesArchive3DPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const normalizedLocale = normalizeLocale(locale);
  const messages = getMessages(normalizedLocale);
  const archive = (archiveItems as ArchiveItem[]).slice().sort((a, b) => {
    return parseDateKey(b.date) - parseDateKey(a.date);
  });
  const detailsLabel = normalizedLocale === "en" ? "View details" : "查看详情";

  return (
    <main className="bg-zinc-950 text-white">
      <section className="mx-auto max-w-6xl px-6 pt-28 pb-12 md:pt-32 space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="text-xs uppercase tracking-wide text-zinc-400">Archive</div>
            <h1 className="mt-2 text-3xl font-semibold">{messages.ministries.archiveTitle}</h1>
            <p className="mt-2 text-sm text-zinc-300">{messages.ministries.archiveBody}</p>
          </div>
          <a
            className="rounded-full border border-zinc-700 px-4 py-2 text-xs font-medium text-zinc-100 transition hover:border-zinc-500"
            href={withLocale(normalizedLocale, "/ministries/archive")}
          >
            {normalizedLocale === "en" ? "View grid" : "查看平铺"}
          </a>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-16">
        <div className="min-h-[120vh]">
          <ArchiveScene3D items={archive} detailsLabel={detailsLabel} locale={normalizedLocale} />
        </div>
      </section>
    </main>
  );
}
