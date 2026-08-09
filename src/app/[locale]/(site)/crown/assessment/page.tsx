import Link from "next/link";
import AssessmentTool from "@/components/crown/AssessmentTool";
import { crownPageCopy } from "@/content/crown/copy";
import { normalizeLocale, pickLocalizedValue, withLocale } from "@/lib/i18n";

export default async function CrownAssessmentPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const normalizedLocale = normalizeLocale(locale);

  return (
    <main className="mx-auto max-w-3xl px-6 pt-28 pb-16 md:pt-32">
      <Link href={withLocale(normalizedLocale, "/crown")} className="text-sm underline text-body-color-token">
        {pickLocalizedValue(normalizedLocale, crownPageCopy.backToCrown)}
      </Link>

      <h1 className="mt-6 mb-6 text-3xl font-semibold text-heading-token md:text-4xl">
        {pickLocalizedValue(normalizedLocale, crownPageCopy.assessmentTitle)}
      </h1>

      <AssessmentTool locale={normalizedLocale} />
    </main>
  );
}
