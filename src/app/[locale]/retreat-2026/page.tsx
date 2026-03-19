import { redirect } from "next/navigation";
import { normalizeLocale } from "@/lib/i18n";

export default async function LegacyRetreat2026Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const normalizedLocale = normalizeLocale(locale);

  redirect(`/${normalizedLocale}/events/retreat-2026`);
}
