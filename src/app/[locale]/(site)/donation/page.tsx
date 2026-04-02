import AppImage from "@/components/AppImage";
import { getDonationPortalConfig } from "@/lib/donation";
import { getMessages, normalizeLocale } from "@/lib/i18n";

function withForwardedQueryParams(
  donationUrl: string,
  searchParams: Record<string, string | string[] | undefined>
): string {
  const url = new URL(donationUrl);
  for (const [key, rawValue] of Object.entries(searchParams)) {
    if (!rawValue) continue;
    const value = Array.isArray(rawValue) ? rawValue[0] : rawValue;
    if (!value) continue;
    url.searchParams.set(key, value);
  }
  return url.toString();
}

export default async function DonationPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const { locale } = await params;
  const resolvedSearchParams = await searchParams;
  const normalizedLocale = normalizeLocale(locale);
  const messages = getMessages(normalizedLocale);
  const donationConfig = getDonationPortalConfig(normalizedLocale);
  const donationButtonHref = withForwardedQueryParams(donationConfig.donateUrl, resolvedSearchParams);
  const mailingAddressLines = messages.donation.mailValue.split(",").map((line) => line.trim()).filter(Boolean);

  return (
    <main className="bg-surface-a pb-0">
      <section className="relative w-full overflow-hidden bg-stats-token text-white">
        <div className="relative h-[280px] w-full md:h-[480px]">
          <AppImage mediaKey="donationHero" locale={normalizedLocale} fill className="object-cover object-center" priority />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/45 to-black/70" />
        </div>
        <div className="absolute inset-0 flex items-center justify-center text-center px-6 pt-20 md:pt-32">
          <div className="max-w-3xl space-y-4">
            <h1 className="text-3xl font-semibold md:text-5xl">{messages.donation.title}</h1>
            <p className="text-sm text-dk-title-token md:text-base whitespace-pre-line">
              {messages.donation.subtitle}
            </p>
          </div>
        </div>
      </section>

      <section className="w-full">
        <div className="grid lg:grid-cols-[0.62fr_1.38fr]">
          <aside className="bg-accent-weak px-6 py-10 md:px-10 md:py-16">
            <div className="mx-auto max-w-xl space-y-6">
              <div className="text-body-token uppercase tracking-widest text-muted-token">{messages.donation.verseTitle}</div>
              <p className="text-h3-token text-heading-token font-semibold leading-snug">{messages.donation.verseText}</p>
              <p className="text-body-token text-muted-token">{messages.donation.verseRef}</p>
              <div className="border-t border-token pt-5">
                <p className="text-body-token text-body-color-token">{messages.donation.orgNote}</p>
              </div>
              <div className="border-t border-token pt-5">
                <p className="text-body-token text-body-color-token">{messages.donation.disclaimer}</p>
              </div>
            </div>
          </aside>

          <section className="bg-accent-weak px-6 py-10 md:px-10 md:py-16">
            <div className="mx-auto max-w-3xl">
              <article className="card-base p-5 md:p-7">
                <div className="space-y-5">
                  <div className="space-y-2">
                    <div className="text-body-token uppercase tracking-widest text-muted-token">
                      {messages.donation.payableTitle}
                    </div>
                    <p className="text-h3-token text-heading-token font-semibold">{messages.donation.payableValue}</p>
                    <div className="text-body-token space-y-1 text-body-color-token">
                      <div>{messages.donation.mailTitle}:</div>
                      {mailingAddressLines.map((line) => (
                        <div key={line}>{line}</div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2 border-t border-token pt-5">
                    <div className="text-body-token uppercase tracking-widest text-muted-token">
                      {messages.donation.digitalTitle}
                    </div>
                    <div className="text-body-token space-y-2 text-body-color-token">
                      <div>{messages.donation.paypal}</div>
                      <div>{messages.donation.zelle}</div>
                      <div>{messages.donation.wire}</div>
                    </div>
                  </div>

                  <div className="space-y-3 border-t border-token pt-5">
                    <div className="text-body-token uppercase tracking-widest text-muted-token">
                      {messages.donation.notesTitle}
                    </div>
                    <ul className="text-body-token space-y-2 text-body-color-token">
                      {messages.donation.notes.map((item) => (
                        <li key={item}>• {item}</li>
                      ))}
                    </ul>
                    <a
                      href={donationButtonHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-base btn-donation-cta focus-ring-token mt-2"
                    >
                      {messages.donation.buttonLabel}
                    </a>
                  </div>
                </div>
              </article>
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}
