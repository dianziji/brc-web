import ArchiveScene3D from "@/components/ArchiveScene3D";
import { getSortedArchiveItems } from "@/content/ministries/archive";
import { getMessages, normalizeLocale, withLocale } from "@/lib/i18n";

export default async function MinistriesArchive3DPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const normalizedLocale = normalizeLocale(locale);
  const messages = getMessages(normalizedLocale);
  const archive = getSortedArchiveItems();
  const detailsLabel = normalizedLocale === "en" ? "View details" : "查看詳情";

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
            {normalizedLocale === "en" ? "View grid" : "查看平鋪"}
          </a>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-16">
        <p className="mb-4 text-xs text-zinc-400 md:hidden">
          {normalizedLocale === "en" ? "Swipe up/down to move in depth" : "上下滑動以切換景深"}
        </p>
        <div className="min-h-[70vh] md:min-h-[120vh]">
          <ArchiveScene3D items={archive} detailsLabel={detailsLabel} locale={normalizedLocale} />
        </div>
      </section>
    </main>
  );
}
