import type { Metadata } from "next";
import { cookies } from "next/headers";
import { Inter, Noto_Sans_TC } from "next/font/google";
import "./globals.css";
import { defaultLocale, normalizeLocale } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "BRC",
  description: "BRC website",
};

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-inter",
});

const notoSansTc = Noto_Sans_TC({
  weight: ["400", "500", "600", "700"],
  display: "swap",
  preload: false,
  variable: "--font-noto-sans-tc",
});

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  const cookieLocale = cookieStore.get("NEXT_LOCALE")?.value;
  const locale = cookieLocale ? normalizeLocale(cookieLocale) : defaultLocale;

  return (
    <html lang={locale} data-scheme="espresso">
      <body className={`${inter.variable} ${notoSansTc.variable} antialiased`}>{children}</body>
    </html>
  );
}
