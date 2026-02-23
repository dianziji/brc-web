import { redirect } from "next/navigation";
import { normalizeLocale, withLocale } from "@/lib/i18n";

export default async function EventArchiveDetailRedirect({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const normalizedLocale = normalizeLocale(locale);
  redirect(withLocale(normalizedLocale, `/events/${slug}`));
}
