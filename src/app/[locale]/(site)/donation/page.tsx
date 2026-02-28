import AppImage from "@/components/AppImage";
import { getDonationPortalConfig } from "@/lib/donation";
import { getMessages, normalizeLocale } from "@/lib/i18n";

export default async function DonationPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const normalizedLocale = normalizeLocale(locale);
  const messages = getMessages(normalizedLocale);
  const donationConfig = getDonationPortalConfig();

  return (
    <main className="pb-0">
      <section className="relative w-full overflow-hidden bg-zinc-900 text-white">
        <div className="relative h-[260px] w-full sm:h-[360px] md:h-[450px]">
          <AppImage mediaKey="donationHero" locale={normalizedLocale} fill className="object-cover object-center" priority />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/40 to-black/60" />
        </div>
        <div className="absolute inset-0 flex items-center justify-center text-center px-6 pt-24 md:pt-32">
          <div className="max-w-3xl space-y-3">
            <h1 className="text-2xl font-semibold md:text-4xl">{messages.donation.title}</h1>
            <p className="text-sm text-zinc-200 md:text-base">{messages.donation.subtitle}</p>
          </div>
        </div>
      </section>

      <section>
        <div className="grid lg:grid-cols-[0.6fr_1.4fr]">
          <div className="bg-amber-100 px-6 py-12 md:py-16 lg:px-10">
            <div className="mx-auto max-w-xl space-y-6">
              <div className="text-sm uppercase tracking-widest text-zinc-500">
                {messages.donation.verseTitle}
              </div>
              <div className="text-xl font-semibold text-zinc-900">{messages.donation.verseText}</div>
              <div className="text-sm text-zinc-500">{messages.donation.verseRef}</div>
              <div className="pt-6 text-xs text-zinc-500 space-y-1">
               
                <div>{messages.donation.disclaimer}</div>
              </div>
            </div>
          </div>

          <div className="bg-amber-50 px-6 py-12 md:py-16 lg:px-10">
            <div className="mx-auto max-w-2xl space-y-5 rounded-2xl border border-zinc-200 p-4 sm:p-5">
              <div className="space-y-2">
                <div className="text-sm uppercase tracking-widest text-zinc-500">
                  {messages.donation.payableTitle}
                </div>
                <div className="text-lg font-semibold">{messages.donation.payableValue}</div>
                <div className="text-sm text-zinc-700">
                  <div>{messages.donation.mailTitle}:</div>
                  <div>Bethel Renewal Center</div>
                  <div>P.O.Box 186</div>
                  <div>Lake Hiawatha</div>
                  <div>NJ 07034</div>
                </div>
              </div>

              <div className="border-t border-zinc-200 pt-4 space-y-2">
                <div className="text-sm uppercase tracking-widest text-zinc-500">
                  {messages.donation.digitalTitle}
                </div>
                <div className="text-sm text-zinc-700 space-y-2">
                  <div>{messages.donation.paypal}</div>
                  <div>{messages.donation.zelle}</div>
                  <div>{messages.donation.wire}</div>
                </div>
              </div>

              <div className="border-t border-zinc-200 pt-4 space-y-2">
                <div className="text-sm uppercase tracking-widest text-zinc-500">
                  {messages.donation.buttonLabel}
                </div>
                <a
                  href={donationConfig.donateUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-full bg-amber-500 px-6 py-3 text-sm font-semibold text-black"
                >
                  {messages.donation.buttonLabel}
                </a>
                <div className="pt-2 text-sm text-zinc-600">{messages.donation.notesTitle}</div>
                <ul className="text-sm text-zinc-600 space-y-2">
                  {messages.donation.notes.map((item) => (
                    <li key={item}>• {item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
