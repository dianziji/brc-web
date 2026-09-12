import type { Metadata, Viewport } from "next";
import { cookies } from "next/headers";
import { Inter, Noto_Sans_TC } from "next/font/google";
import "./globals.css";
import { defaultLocale, normalizeLocale } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "BRC",
  description: "BRC website",
  icons: {
    icon: [
      { url: "/icons/favicon.ico", sizes: "any" },
      { url: "/icons/favicon-16x16.png", type: "image/png", sizes: "16x16" },
      { url: "/icons/favicon-32x32.png", type: "image/png", sizes: "32x32" },
      { url: "/icons/favicon-48x48.png", type: "image/png", sizes: "48x48" },
    ],
    shortcut: ["/icons/favicon.ico"],
    apple: [{ url: "/icons/apple-touch-icon.png", type: "image/png", sizes: "180x180" }],
  },
  manifest: "/manifest.webmanifest",
};

export const viewport: Viewport = {
  themeColor: "#234a37",
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
    // suppressHydrationWarning: the featured-campaign boot script adds a data
    // attribute to <html> before React hydrates.
    <html lang={locale} data-scheme="olive" suppressHydrationWarning>
      <body className={`${inter.variable} ${notoSansTc.variable} antialiased`}>{children}</body>
    </html>
  );
}
