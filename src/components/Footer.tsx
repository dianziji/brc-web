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
    { label: messages.nav.audio, href: withLocale(locale, "/audio") },
    { label: messages.nav.donation, href: withLocale(locale, "/donation") },
  ];

  const copyright = messages.footer.copyright.replace(
    "{year}",
    String(new Date().getFullYear())
  );

  return (
    <footer className="border-t bg-zinc-50">
      <div className="mx-auto max-w-6xl px-6 py-12 md:py-16">
        <div className="grid gap-8 md:gap-10 md:grid-cols-[1.2fr_1fr_1fr]">
          <div className="space-y-3">
            <div className="text-sm font-semibold">{messages.footer.title}</div>
            <div className="text-xs text-zinc-500">{messages.footer.subtitle}</div>
            <div className="pt-2 text-sm text-zinc-600 space-y-1">
              <div>{messages.footer.location}</div>
              <div>{messages.footer.email}</div>
              <div>{messages.footer.phone}</div>
              <Link className="mt-3 inline-flex underline" href={withLocale(locale, "/contact")}>
                {messages.footer.contactCta}
              </Link>
            </div>
          </div>

          <div className="text-sm text-zinc-700">
            <div className="font-medium text-zinc-900">{messages.footer.quickLinks}</div>
            <div className="mt-2 flex flex-col gap-2">
              {navItems.map((item) => (
                <Link key={item.href} href={item.href} className="hover:text-zinc-900">
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
          <div className="text-sm text-zinc-700">
            <div className="font-medium text-zinc-900">{messages.footer.subscribeTitle}</div>
            <p className="mt-2 text-zinc-600">{messages.footer.subscribeDesc}</p>
            <div className="mt-4 flex flex-col gap-2 sm:flex-row">
              <input
                type="email"
                placeholder={messages.footer.emailPlaceholder}
                className="w-full rounded-md border bg-white px-3 py-2 text-sm"
              />
              <button className="rounded-md bg-amber-500 px-3 py-2 text-sm font-semibold text-black">
                {messages.footer.subscribeButton}
              </button>
            </div>
          </div>
        </div>
        <div className="mt-8 text-xs text-zinc-500">{copyright}</div>
      </div>
    </footer>
  );
}
