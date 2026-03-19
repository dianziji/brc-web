import EventRegistrationEmbedPage from "@/components/EventRegistrationEmbedPage";
import { normalizeLocale } from "@/lib/i18n";

export default async function Retreat2026Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const normalizedLocale = normalizeLocale(locale);

  const copy =
    normalizedLocale === "en"
      ? {
          eyebrow: "BRC 2026",
          title: "Retreat Registration",
          description: "Complete the form below to register for the 2026 BRC retreat.",
          backLabel: "Back to BRC",
        }
      : {
          eyebrow: "BRC 2026",
          title: "退修会报名",
          description: "请填写以下表单，完成 BRC 2026 退修会报名。",
          backLabel: "返回 BRC",
        };

  return <EventRegistrationEmbedPage locale={normalizedLocale} copy={copy} dataKey="GEE2KapWkke4PWZCfKVj7A" form="14" />;
}
