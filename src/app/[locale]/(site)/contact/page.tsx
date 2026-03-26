import HomeContactForm from "@/components/HomeContactForm";
import { getMessages, normalizeLocale } from "@/lib/i18n";

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const normalizedLocale = normalizeLocale(locale);
  const messages = getMessages(normalizedLocale);
  const contact = messages.home.contact;

  return (
    <main className="bg-rhythm-b min-h-screen pb-16 pt-28 md:pt-32">
      <section className="section-container-medium">
        <div className="rounded-[var(--radius-card)] border border-token bg-contact-token px-6 py-8 md:px-8 md:py-10">
          <h1 className="font-display text-display-token text-center text-heading-token font-semibold">
            {messages.pages.contact}
          </h1>
          <div className="mt-8 grid gap-8 md:grid-cols-[0.95fr_1.05fr]">
            <div className="space-y-4">
              <h2 className="font-display text-h2-token text-heading-token font-semibold">{contact.title}</h2>
              <div className="text-body-token text-body-color-token space-y-2">
                <div>{contact.address}</div>
                <a className="link-primary focus-ring-token inline-flex" href="mailto:brc@bethelrc.org">
                  {contact.email}
                </a>
              </div>
            </div>
            <HomeContactForm
              locale={normalizedLocale}
              namePlaceholder={contact.namePlaceholder}
              emailPlaceholder={contact.emailPlaceholder}
              messagePlaceholder={contact.messagePlaceholder}
              submitLabel={contact.submit}
            />
          </div>
        </div>
      </section>
    </main>
  );
}
