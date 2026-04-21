import { locales } from "@/lib/i18n";
import { SpeedInsights } from "@vercel/speed-insights/next"

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default function LocaleLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <SpeedInsights />
    </>
  );
}
