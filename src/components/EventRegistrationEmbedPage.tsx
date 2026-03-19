import Link from "next/link";
import CognitoSeamlessForm from "@/components/CognitoSeamlessForm";
import { type Locale, withLocale } from "@/lib/i18n";

type EventRegistrationEmbedPageProps = {
  locale: Locale;
  copy: {
    eyebrow: string;
    title: string;
    description: string;
    backLabel: string;
  };
  dataKey: string;
  form: string;
};

export default function EventRegistrationEmbedPage({
  locale,
  copy,
  dataKey,
  form,
}: EventRegistrationEmbedPageProps) {
  return (
    <main className="bg-rhythm-b min-h-screen pb-16 pt-28 md:pt-32">
      <section className="section-container-medium">
        <div className="event-registration-page-shell rounded-[var(--radius-card)] border border-token/70 px-5 py-6 shadow-[0_24px_80px_rgba(35,74,55,.08)] backdrop-blur-[10px] md:px-8 md:py-8">
          <div className="mb-5 flex justify-start">
            <Link className="focus-ring-token link-primary inline-flex" href={withLocale(locale, "/")}>
              {copy.backLabel}
            </Link>
          </div>

          <div className="mx-auto max-w-3xl text-center">
            <div className="text-caption-token text-dk-meta-token font-semibold uppercase tracking-[0.18em]">
              {copy.eyebrow}
            </div>
            <h1 className="font-display text-display-token mt-3 text-heading-token font-semibold">
              {copy.title}
            </h1>
            <p className="text-body-token text-body-color-token mt-3">{copy.description}</p>
          </div>

          <div className="event-registration-form-shell mt-8 rounded-[calc(var(--radius-card)-8px)] border border-token/60 px-2 py-3 md:px-4 md:py-4">
            <CognitoSeamlessForm dataKey={dataKey} form={form} />
          </div>
        </div>
      </section>
    </main>
  );
}
