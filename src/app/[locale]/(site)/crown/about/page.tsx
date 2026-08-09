import Link from "next/link";
import AppImage from "@/components/AppImage";
import CrownCoreValues from "@/components/crown/CrownCoreValues";
import {
  crownIntro,
  missionStatement,
  northAmericaHistory,
  northAmericaVision,
  visionStatement,
} from "@/content/crown/about";
import { crownPageCopy } from "@/content/crown/copy";
import { normalizeLocale, pickLocalizedValue, withLocale } from "@/lib/i18n";

export default async function CrownAboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const normalizedLocale = normalizeLocale(locale);

  const intro = pickLocalizedValue(normalizedLocale, crownIntro);
  const history = pickLocalizedValue(normalizedLocale, northAmericaHistory);
  const naVision = pickLocalizedValue(normalizedLocale, northAmericaVision);

  return (
    <main className="mx-auto max-w-4xl px-6 pt-28 pb-16 md:pt-32">
      <Link href={withLocale(normalizedLocale, "/crown")} className="text-sm underline text-body-color-token">
        {pickLocalizedValue(normalizedLocale, crownPageCopy.backToCrown)}
      </Link>

      <div className="relative mx-auto mt-6 h-24 w-56">
        <AppImage
          mediaKey="crownLogo"
          locale={normalizedLocale}
          fill
          sizes="224px"
          className="object-contain mix-blend-multiply"
        />
      </div>

      <h1 className="mt-4 text-3xl font-semibold text-heading-token md:text-4xl">
        {pickLocalizedValue(normalizedLocale, crownPageCopy.aboutTitle)}
      </h1>

      <section className="mt-6 space-y-4">
        {intro.map((paragraph) => (
          <p key={paragraph} className="text-body-token leading-relaxed text-body-color-token">
            {paragraph}
          </p>
        ))}
      </section>

      <div className="mt-8">
        <CrownCoreValues locale={normalizedLocale} />
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-2">
        <div className="card-base bg-surface-b p-6">
          <h2 className="text-h3-token font-semibold text-heading-token">
            {pickLocalizedValue(normalizedLocale, visionStatement.title)}
          </h2>
          <p className="mt-3 text-body-token leading-relaxed text-body-color-token">
            {pickLocalizedValue(normalizedLocale, visionStatement.body)}
          </p>
        </div>
        <div className="card-base bg-surface-b p-6">
          <h2 className="text-h3-token font-semibold text-heading-token">
            {pickLocalizedValue(normalizedLocale, missionStatement.title)}
          </h2>
          <p className="mt-3 text-body-token leading-relaxed text-body-color-token">
            {pickLocalizedValue(normalizedLocale, missionStatement.body)}
          </p>
        </div>
      </div>

      <section className="mt-10">
        <h2 className="text-h3-token font-semibold text-heading-token">
          {normalizedLocale === "en" ? "North American Chinese Outreach Ministry" : "北美華文外展事工"}
        </h2>
        <div className="mt-4 space-y-4">
          {history.map((paragraph) => (
            <p key={paragraph} className="text-body-token leading-relaxed text-body-color-token">
              {paragraph}
            </p>
          ))}
        </div>
        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          {naVision.map((item) => (
            <div key={item} className="card-base bg-accent-weak p-4">
              <p className="text-body-token font-medium text-heading-token">{item}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
