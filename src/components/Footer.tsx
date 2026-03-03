import Link from "next/link";
import { type Locale, type Messages, withLocale } from "@/lib/i18n";

type FooterProps = {
  locale: Locale;
  messages: Messages;
};

export default function Footer({ locale, messages }: FooterProps) {
  const navItems = [
    { label: messages.nav.home, href: withLocale(locale, "/") },
    { label: messages.nav.about, href: withLocale(locale, "/about") },
    { label: messages.nav.calendar, href: withLocale(locale, "/calendar") },
    { label: messages.nav.prayer, href: withLocale(locale, "/prayer") },
    { label: messages.nav.ministries, href: withLocale(locale, "/ministries") },
    { label: messages.nav.trainings, href: withLocale(locale, "/discipleship") },
    { label: messages.nav.donation, href: withLocale(locale, "/donation") },
  ];

  const copyright = messages.footer.copyright.replace(
    "{year}",
    String(new Date().getFullYear())
  );

  return (
    <footer className="border-t border-white/20 bg-footer-token text-dk-title-token">
      <div className="section-container-medium py-12 md:py-16">
        <div className="grid gap-8 md:gap-10 md:grid-cols-[1.2fr_1fr_1fr]">
          <div className="space-y-3">
            <div className="font-display text-h3-token text-dk-title-token font-semibold">{messages.footer.title}</div>
            <div className="text-caption-token text-dk-meta-token">{messages.footer.subtitle}</div>
            <div className="text-body-token text-dk-title-token space-y-1 pt-2">
              <div>{messages.footer.location}</div>
              <div>{messages.footer.email}</div>
              <div>{messages.footer.phone}</div>
              <Link className="focus-ring-token link-inverse mt-3 inline-flex" href={withLocale(locale, "/contact")}>
                {messages.footer.contactCta}
              </Link>
            </div>
          </div>

          <div className="text-body-token text-dk-title-token">
            <div className="text-dk-hi-token font-semibold">{messages.footer.quickLinks}</div>
            <div className="mt-2 grid grid-cols-2 gap-x-6 gap-y-2">
              {navItems.map((item) => (
                <Link key={item.href} href={item.href} className="focus-ring-token transition-colors hover:text-dk-hi-token">
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
          <div className="text-body-token text-dk-title-token">
            <div className="text-dk-hi-token font-semibold">{messages.footer.subscribeTitle}</div>
            <p className="mt-2">{messages.footer.subscribeDesc}</p>
            <div className="mt-4 flex flex-col gap-2 sm:flex-row">
              <input
                type="email"
                placeholder={messages.footer.emailPlaceholder}
                className="form-field"
              />
              <button className="btn-base btn-primary focus-ring-token">
                {messages.footer.subscribeButton}
              </button>
            </div>
          </div>
        </div>
        <div className="text-caption-token text-dk-meta-token mt-8">{copyright}</div>
      </div>
    </footer>
  );
}
