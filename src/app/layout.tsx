import type { Metadata } from "next";
import { cookies } from "next/headers";
import "./globals.css";
import { defaultLocale, normalizeLocale } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "BRC",
  description: "BRC website",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  const cookieLocale = cookieStore.get("NEXT_LOCALE")?.value;
  const locale = cookieLocale ? normalizeLocale(cookieLocale) : defaultLocale;

  return (
    <html lang={locale}>
      <body className="antialiased">{children}</body>
    </html>
  );
}

