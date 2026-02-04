import { getMessages, normalizeLocale, pickLocalized, withLocale } from "@/lib/i18n";

type Detail = {
  slug: string;
  fields: {
    titleEn?: string;
    titleZh?: string;
    summaryEn?: string;
    summaryZh?: string;
    heroImage?: { node?: { sourceUrl?: string; altText?: string } };
  };
  section: { top: string | null; leaf: { slug: string } | null; parent?: any };
};

export const revalidate = 60;

async function getDetail(slug: string): Promise<Detail | null> {
  const configuredBaseUrl = process.env.SITE_URL?.replace(/\/$/, "");
  if (!configuredBaseUrl) {
    throw new Error("Missing SITE_URL for internal API request");
  }

  const url = `${configuredBaseUrl}/api/ministries/${encodeURIComponent(slug)}`;
  const res = await fetch(url, { next: { revalidate: 60 } });

  if (!res.ok) {
    if (res.status === 404) return null;
    const body = await res.text().catch(() => "");
    throw new Error(`Ministry API failed: ${res.status} ${res.statusText}. ${body}`);
  }

  return res.json();
}

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string; top: string; slug: string }>;
}) {
  const { locale, top, slug } = await params;
  const normalizedLocale = normalizeLocale(locale);
  const messages = getMessages(normalizedLocale);
  const data = await getDetail(slug);
  const backLink = withLocale(normalizedLocale, `/ministries/${top}`);

  if (!data) {
    return (
      <main className="mx-auto max-w-4xl px-6 pt-28 pb-6 md:pt-32 space-y-6">
        <a className="underline" href={backLink}>
          {messages.common.back}
        </a>
        <div className="rounded-lg border border-amber-200 bg-amber-50 p-3 text-sm text-amber-900">
          {messages.common.notFound}
        </div>
      </main>
    );
  }

  const title = pickLocalized(normalizedLocale, {
    en: data.fields.titleEn,
    zh: data.fields.titleZh,
    fallback: data.slug,
  });
  const summary = pickLocalized(normalizedLocale, {
    en: data.fields.summaryEn,
    zh: data.fields.summaryZh,
  });

  return (
    <main className="mx-auto max-w-4xl px-6 pt-28 pb-6 md:pt-32 space-y-6">
      <a className="underline" href={backLink}>
        {messages.common.back}
      </a>

      <h1 className="text-3xl font-semibold">{title}</h1>

      {data.fields.heroImage?.node?.sourceUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={data.fields.heroImage.node.sourceUrl}
          alt={data.fields.heroImage.node.altText || ""}
          className="w-full rounded-xl border"
        />
      ) : null}

      <section className="prose max-w-none">
        <div dangerouslySetInnerHTML={{ __html: summary }} />
      </section>
    </main>
  );
}
