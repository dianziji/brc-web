"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const navItems = [
  { label: "主頁", href: "/" },
  { label: "關於我們", href: "/about" },
  { label: "活动日历", href: "/calendar" },
  { label: "禱告室", href: "/prayer" },
  { label: "宣教事工", href: "/ministries" },
  { label: "門徒訓練", href: "/trainings" },
  { label: "音訊庫", href: "/audio" },
  { label: "奉獻支持", href: "/donation" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const lightHeaderPaths = new Set(["/", "/prayer"]);
  const isLightHeader = lightHeaderPaths.has(pathname);
  const lightMode = isLightHeader && !scrolled;

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
        <Link href="/" className="flex items-center gap-3">
          <div className="relative h-10 w-24">
            <Image src="/images/logo.png" alt="BRC logo" fill className="object-contain" />
          </div>
          <div className="leading-tight">
            <div className={`text-sm font-semibold ${lightMode ? "text-white" : "text-zinc-900"}`}>
              Bethel Renewal Center
            </div>
            <div className={`text-xs ${lightMode ? "text-zinc-200" : "text-zinc-500"}`}>
              伯特利中心
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
        <Link
          href="/donation"
          className={`rounded-full px-4 py-2 text-xs font-semibold ${
            lightMode ? "bg-white/90 text-zinc-900" : "bg-amber-500 text-black"
          }`}
        >
          奉獻支持
        </Link>
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

