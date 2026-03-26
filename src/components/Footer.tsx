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
    { label: messages.footer.archiveSite, href: "https://archive.bethelrc.org", external: true },
  ];

  const copyright = messages.footer.copyright.replace(
    "{year}",
    String(new Date().getFullYear())
  );

  return (
    <footer className="border-t border-white/20 bg-footer-token text-dk-title-token">
      <div className="section-container-medium py-10 md:py-12">
        <div className="grid items-start gap-6 md:gap-8 md:grid-cols-[1.15fr_.85fr]">
          <div className="space-y-2">
            <div className="font-display text-h3-token text-dk-title-token font-semibold">{messages.footer.title}</div>
            <div className="text-caption-token text-dk-meta-token">{messages.footer.subtitle}</div>
            <div className="text-body-token text-dk-title-token space-y-1 pt-1">
              <div>{messages.footer.location}</div>
              <div>{messages.footer.email}</div>
              <Link className="focus-ring-token link-inverse mt-2 inline-flex" href={withLocale(locale, "/contact")}>
                {messages.footer.contactCta}
              </Link>
            </div>
          </div>

          <div className="text-body-token text-dk-title-token">
            <div className="text-dk-hi-token font-semibold">{messages.footer.quickLinks}</div>
            <div className="mt-1.5 grid grid-cols-2 gap-x-5 gap-y-1.5">
              {navItems.map((item) => (
                item.external ? (
                  <a
                    key={item.href}
                    href={item.href}
                    target="_blank"
                    rel="noreferrer"
                    className="focus-ring-token transition-colors hover:text-dk-hi-token"
                  >
                    {item.label}
                  </a>
                ) : (
                  <Link key={item.href} href={item.href} className="focus-ring-token transition-colors hover:text-dk-hi-token">
                    {item.label}
                  </Link>
                )
              ))}
            </div>
          </div>
        </div>
        <div className="text-caption-token text-dk-meta-token mt-6">{copyright}</div>
      </div>
    </footer>
  );
}
