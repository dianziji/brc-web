import en from "@/lib/i18n/messages/en.json";
import zh from "@/lib/i18n/messages/zh.json";

export const locales = ["zh", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "zh";

export type Messages = typeof zh;

export function normalizeLocale(input?: string): Locale {
  return input === "en" ? "en" : "zh";
}

export function getMessages(locale: Locale): Messages {
  return locale === "en" ? (en as Messages) : (zh as Messages);
}

export function withLocale(locale: Locale, path: string): string {
  if (!path.startsWith("/")) return `/${locale}/${path}`;
  if (path === "/") return `/${locale}`;
  return `/${locale}${path}`;
}

export function stripLocale(pathname: string): string {
  const parts = pathname.split("/").filter(Boolean);
  if (parts.length === 0) return "/";
  if (locales.includes(parts[0] as Locale)) {
    const rest = parts.slice(1).join("/");
    return rest ? `/${rest}` : "/";
  }
  return pathname;
}

export function pickLocalized(
  locale: Locale,
  options: { zh?: string | null; en?: string | null; fallback?: string }
): string {
  const zhValue = options.zh ?? undefined;
  const enValue = options.en ?? undefined;
  if (locale === "en") return enValue || zhValue || options.fallback || "";
  return zhValue || enValue || options.fallback || "";
}
