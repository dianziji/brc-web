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
  const normalizePath = (path: string) => {
    const stripped = stripLocale(path);
    if (stripped === "/") return "/";
    return stripped.replace(/\/+$/, "");
  };
  const basePath = normalizePath(pathname);
  const transparentHeaderPaths = new Set(["/", "/prayer", "/about", "/donation", "/ministries", "/ministries/archive"]);
  const ministryHeroPaths = new Set([
    "/ministries/missions",
    "/ministries/mission",
    "/ministries/youth",
    "/ministries/family",
  ]);
  const transparentHeaderWithDarkTextPaths = new Set([
    "/ministries/missions",
    "/ministries/mission",
    "/ministries/family",
  ]);
  const isTransparentHeader = (transparentHeaderPaths.has(basePath) || ministryHeroPaths.has(basePath)) && !scrolled;
  const transparentHeaderUsesDarkText = transparentHeaderWithDarkTextPaths.has(basePath);
  const useLightText = isTransparentHeader && !transparentHeaderUsesDarkText;
  const navItems = useMemo(
    () => [
      {
        label: messages.nav.home,
        mobileLabel: messages.navMobile.home,
        href: withLocale(locale, "/"),
        activePatterns: ["/"],
      },
      {
        label: messages.nav.about,
        mobileLabel: messages.navMobile.about,
        href: withLocale(locale, "/about"),
        activePatterns: ["/about"],
      },
      {
        label: messages.nav.calendar,
        mobileLabel: messages.navMobile.calendar,
        href: withLocale(locale, "/calendar"),
        activePatterns: ["/calendar", "/events"],
      },
      {
        label: messages.nav.prayer,
        mobileLabel: messages.navMobile.prayer,
        href: withLocale(locale, "/prayer"),
        activePatterns: ["/prayer"],
      },
      {
        label: messages.nav.ministries,
        mobileLabel: messages.navMobile.ministries,
        href: withLocale(locale, "/ministries"),
        activePatterns: ["/ministries"],
      },
      {
        label: messages.nav.trainings,
        mobileLabel: messages.navMobile.trainings,
        href: withLocale(locale, "/discipleship"),
        activePatterns: ["/discipleship", "/trainings"],
      },
    ],
    [locale, messages.nav, messages.navMobile]
  );

  const switchLocale = locale === "en" ? "zh" : "en";
  const switchLabel = locale === "en" ? messages.header.switchToZh : messages.header.switchToEn;
  const switchHref = withLocale(switchLocale, basePath);
  const donationHref = withLocale(locale, "/donation");

  const isActiveRoute = (targets: string[]) => {
    return targets.some((target) => {
      const normalizedTarget = normalizePath(target);
      if (normalizedTarget === "/") return basePath === "/";
      return basePath === normalizedTarget || basePath.startsWith(`${normalizedTarget}/`);
    });
  };
  const isDonationPage = isActiveRoute(["/donation"]);

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
        isTransparentHeader ? "bg-transparent border-transparent" : "bg-surface-a/90 backdrop-blur border-token"
      }`}
    >

      <div className="section-container-medium flex items-center justify-between gap-3 py-4 md:py-5">
        <Link href={withLocale(locale, "/")} className="flex items-center gap-3">
          <div className="relative h-8 w-20 md:h-10 md:w-24">
            <Image src="/images/logo.png" alt="BRC logo" fill className="object-contain" />
          </div>
          <div className="leading-tight">
            <div className={`text-xs font-semibold md:text-sm ${useLightText ? "text-white" : "text-heading-token"}`}>
              {messages.header.title}
            </div>
            <div className={`text-[10px] md:text-xs ${useLightText ? "text-dk-title-token" : "text-muted-token"}`}>
              {messages.header.subtitle}
            </div>
          </div>
        </Link>
        <nav className={`hidden items-center gap-6 text-sm md:flex ${useLightText ? "text-dk-title-token" : "text-body-color-token"}`}>
          {navItems.map((item) => {
            const active = isActiveRoute(item.activePatterns);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`header-nav-link ${
                  useLightText
                    ? active
                      ? "header-nav-link-light header-nav-link-active"
                      : "header-nav-link-light header-nav-link-inactive"
                    : active
                      ? "header-nav-link-default header-nav-link-active"
                      : "header-nav-link-default header-nav-link-inactive"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="flex items-center gap-1 md:gap-[6px]">
          <Link
            href={switchHref}
            className={`focus-ring-token header-btn ${useLightText ? "header-btn-secondary-light" : "header-btn-secondary"}`}
          >
            {switchLabel}
          </Link>
          <Link
            href={donationHref}
            aria-current={isDonationPage ? "page" : undefined}
            className={`focus-ring-token header-btn header-btn-primary ${isDonationPage ? "header-btn-active" : ""}`}
          >
            {messages.header.donate}
          </Link>
        </div>
      </div>

      <div className={`border-t md:hidden ${useLightText ? "border-white/20" : "border-token"}`}>
        <div className={`section-container-medium py-1.5 ${useLightText ? "text-dk-title-token" : "text-body-color-token"}`}>
          <nav className="grid grid-cols-6 gap-1 text-[10px] leading-tight">
            {navItems.map((item) => {
              const active = isActiveRoute(item.activePatterns);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={`header-nav-mobile-link inline-flex min-h-11 min-w-0 items-center justify-center rounded-lg px-1 text-center break-words ${
                    useLightText
                      ? active
                        ? "bg-[var(--accent-weak)] text-[var(--accent-strong)] font-semibold"
                        : "hover:bg-surface-a/10 hover:text-white"
                      : active
                        ? "bg-[var(--accent-weak)] text-[var(--accent-strong)] font-semibold"
                        : "hover:bg-surface-b hover:text-heading-token"
                  }`}
                >
                  {item.mobileLabel}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </header>
  );
}
