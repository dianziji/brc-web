import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { defaultLocale, locales, normalizeLocale } from "@/lib/i18n";

const PUBLIC_FILE = /\.[^/]+$/;

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith("/api") ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/images") ||
    pathname.startsWith("/favicon") ||
    PUBLIC_FILE.test(pathname)
  ) {
    return NextResponse.next();
  }

  const segments = pathname.split("/").filter(Boolean);
  const maybeLocale = segments[0];

  if (!locales.includes(maybeLocale as (typeof locales)[number])) {
    const url = request.nextUrl.clone();
    url.pathname = `/${defaultLocale}${pathname === "/" ? "" : pathname}`;
    const res = NextResponse.redirect(url);
    res.cookies.set("NEXT_LOCALE", defaultLocale);
    return res;
  }

  const locale = normalizeLocale(maybeLocale);
  const res = NextResponse.next();
  res.cookies.set("NEXT_LOCALE", locale);
  return res;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
