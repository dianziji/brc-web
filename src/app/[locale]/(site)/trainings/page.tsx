import { getMessages, normalizeLocale } from "@/lib/i18n";

export default async function TrainingsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const messages = getMessages(normalizeLocale(locale));

  return (
    <main className="mx-auto max-w-4xl px-6 pt-28 pb-16 md:pt-32 text-center">
      <h1 className="text-3xl font-semibold">{messages.pages.trainings}</h1>
      <p className="mt-3 text-sm text-zinc-600">{messages.common.comingSoon}</p>
    </main>
  );
}
