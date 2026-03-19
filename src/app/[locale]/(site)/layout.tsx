import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getMessages, normalizeLocale } from "@/lib/i18n";

export default async function SiteLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const normalizedLocale = normalizeLocale(locale);
  const messages = getMessages(normalizedLocale);

  return (
    <>
      <Header locale={normalizedLocale} messages={messages} />

      {children}

      <Footer locale={normalizedLocale} messages={messages} />
    </>
  );
}
