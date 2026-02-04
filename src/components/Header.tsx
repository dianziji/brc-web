"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { type Locale, type Messages, stripLocale, withLocale } from "@/lib/i18n";

type HeaderProps = {
  locale: Locale;
  messages: Messages;
};

export default function Header({ locale, messages }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const basePath = stripLocale(pathname);
  const lightHeaderPaths = new Set(["/", "/prayer", "/about"]);
  const isLightHeader = lightHeaderPaths.has(basePath);
  const lightMode = isLightHeader && !scrolled;
  const navItems = useMemo(
    () => [
      { label: messages.nav.home, href: withLocale(locale, "/") },
      { label: messages.nav.about, href: withLocale(locale, "/about") },
      { label: messages.nav.calendar, href: withLocale(locale, "/calendar") },
      { label: messages.nav.prayer, href: withLocale(locale, "/prayer") },
      { label: messages.nav.ministries, href: withLocale(locale, "/ministries") },
      { label: messages.nav.trainings, href: withLocale(locale, "/trainings") },
      { label: messages.nav.audio, href: withLocale(locale, "/audio") },
    ],
    [locale, messages.nav]
  );

  const switchLocale = locale === "en" ? "zh" : "en";
  const switchLabel = locale === "en" ? messages.header.switchToZh : messages.header.switchToEn;
  const switchHref = withLocale(switchLocale, basePath);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300 ${
        lightMode ? "bg-transparent border-transparent" : "bg-white/90 backdrop-blur border-zinc-200"
      }`}
    >

      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <Link href={withLocale(locale, "/")} className="flex items-center gap-3">
          <div className="relative h-10 w-24">
            <Image src="/images/logo.png" alt="BRC logo" fill className="object-contain" />
          </div>
          <div className="leading-tight">
            <div className={`text-sm font-semibold ${lightMode ? "text-white" : "text-zinc-900"}`}>
              {messages.header.title}
            </div>
            <div className={`text-xs ${lightMode ? "text-zinc-200" : "text-zinc-500"}`}>
              {messages.header.subtitle}
            </div>
          </div>
        </Link>
        <nav className={`hidden items-center gap-6 text-sm md:flex ${lightMode ? "text-zinc-200" : "text-zinc-700"}`}>
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={lightMode ? "hover:text-white" : "hover:text-zinc-900"}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <Link
            href={switchHref}
            className={`rounded-full border px-3 py-2 text-xs font-semibold ${
              lightMode ? "border-white/60 text-white" : "border-zinc-200 text-zinc-700"
            }`}
          >
            {switchLabel}
          </Link>
          <Link
            href={withLocale(locale, "/donation")}
            className={`rounded-full px-4 py-2 text-xs font-semibold ${
              lightMode ? "bg-white/90 text-zinc-900" : "bg-amber-500 text-black"
            }`}
          >
            {messages.header.donate}
          </Link>
        </div>
      </div>

      <div className={`border-t md:hidden ${lightMode ? "border-white/20" : "border-zinc-200"}`}>
        <div className={`mx-auto flex max-w-6xl flex-wrap gap-4 px-6 py-3 text-sm ${
          lightMode ? "text-zinc-200" : "text-zinc-700"
        }`}>
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={lightMode ? "hover:text-white" : "hover:text-zinc-900"}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}

