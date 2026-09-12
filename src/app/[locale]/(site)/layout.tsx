import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { campaignBannerBootScript } from "@/components/campaign/campaign-dismissal";
import { getFeaturedCampaignBanner } from "@/lib/featured-campaign";
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
  const campaignBanner = await getFeaturedCampaignBanner(normalizedLocale, messages.campaign);

  return (
    <>
      {campaignBanner ? (
        // Runs before first paint: decides whether the banner (and the body
        // padding that makes room for it) is shown, based on localStorage.
        <script
          dangerouslySetInnerHTML={{
            __html: campaignBannerBootScript(campaignBanner.id, campaignBanner.snoozeHours),
          }}
        />
      ) : null}

      <Header locale={normalizedLocale} messages={messages} banner={campaignBanner} />

      {children}

      <Footer locale={normalizedLocale} messages={messages} />
    </>
  );
}
