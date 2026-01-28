"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const navItems = [
  { label: "主頁", href: "/" },
  { label: "關於我們", href: "/about" },
  { label: "禱告室", href: "/prayer" },
  { label: "宣教事工", href: "/ministries/youth" },
  { label: "門徒訓練", href: "/trainings" },
  { label: "音訊庫", href: "/audio" },
  { label: "奉獻支持", href: "/donation" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

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
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled ? "bg-white/90 backdrop-blur border-b border-zinc-200" : "bg-transparent"
      }`}
    >
      {scrolled ? (
        <div className="hidden border-b border-zinc-200 bg-white/90 text-zinc-600 md:block">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-2 text-xs">
            <div className="flex items-center gap-4">
              <span>主日聚会：周日 10:30 AM</span>
              <span className="text-zinc-300">|</span>
              <span>Lake Hiawatha, NJ</span>
            </div>
            <div className="flex items-center gap-4">
              <span>info@brc.org</span>
              <span className="text-zinc-300">|</span>
              <span>(973) 000-0000</span>
            </div>
          </div>
        </div>
      ) : null}

      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <a href="/" className="flex items-center gap-3">
          <div className="relative h-10 w-24">
            <Image src="/images/logo.png" alt="BRC logo" fill className="object-contain" />
          </div>
          <div className="leading-tight">
            <div className={`text-sm font-semibold ${scrolled ? "text-zinc-900" : "text-white"}`}>
              Bethel Renewal Center
            </div>
            <div className={`text-xs ${scrolled ? "text-zinc-500" : "text-zinc-200"}`}>
              伯特利中心
            </div>
          </div>
        </a>
        <nav className={`hidden items-center gap-6 text-sm md:flex ${scrolled ? "text-zinc-700" : "text-zinc-200"}`}>
          {navItems.map((item) => (
            <a key={item.href} href={item.href} className={scrolled ? "hover:text-zinc-900" : "hover:text-white"}>
              {item.label}
            </a>
          ))}
        </nav>
        <a
          href="/donation"
          className={`rounded-full px-4 py-2 text-xs font-semibold ${
            scrolled ? "bg-amber-500 text-black" : "bg-white/90 text-zinc-900"
          }`}
        >
          奉獻支持
        </a>
      </div>

      <div className={`border-t md:hidden ${scrolled ? "border-zinc-200" : "border-white/20"}`}>
        <div className={`mx-auto flex max-w-6xl flex-wrap gap-4 px-6 py-3 text-sm ${
          scrolled ? "text-zinc-700" : "text-zinc-200"
        }`}>
          {navItems.map((item) => (
            <a key={item.href} href={item.href} className={scrolled ? "hover:text-zinc-900" : "hover:text-white"}>
              {item.label}
            </a>
          ))}
        </div>
      </div>
    </header>
  );
}

