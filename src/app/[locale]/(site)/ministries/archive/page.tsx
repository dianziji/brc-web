import Image from "next/image";
import ArchiveGrid from "@/components/ArchiveGrid";
import { getSortedArchiveItems } from "@/content/ministries/archive";
import { getMessages, normalizeLocale } from "@/lib/i18n";

export default async function MinistriesArchivePage({
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
    <main className="bg-zinc-50 text-zinc-900">
      <section className="relative w-full overflow-hidden bg-zinc-900 text-white">
        <div className="relative h-[320px] w-full md:h-[480px]">
          <Image
            src="/images/AdobeStock_462139672.jpeg"
            alt="Archive Ministries"
            fill
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/40 to-black/60" />
        </div>
        <div className="absolute inset-0 flex items-center justify-center text-center px-6 pt-24 md:pt-32">
          <div className="max-w-3xl space-y-4">
            <h1 className="text-3xl font-semibold md:text-5xl">{messages.ministries.archiveTitle}</h1>
            <p className="text-base text-zinc-200 md:text-lg">{messages.ministries.archiveBody}</p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pt-10 pb-16">
        <ArchiveGrid items={archive} detailsLabel={detailsLabel} locale={normalizedLocale} />
      </section>
    </main>
  );
}
