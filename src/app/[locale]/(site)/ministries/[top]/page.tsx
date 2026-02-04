import { getMessages, normalizeLocale, pickLocalized, withLocale } from "@/lib/i18n";

type Item = {
  slug: string;
  fields: {
    titleEn?: string;
    titleZh?: string;
    summaryEn?: string;
    summaryZh?: string;
    heroImage?: { node?: { sourceUrl?: string; altText?: string } };
  };
  section: { top: string | null; leaf: { slug: string } | null };
};

type ListResponse = {
  items: Item[];
  error?: string;
};

export const revalidate = 60;

async function getList(top: string): Promise<ListResponse> {
  const configuredBaseUrl = process.env.SITE_URL?.replace(/\/$/, "");
  if (!configuredBaseUrl) {
    throw new Error("Missing SITE_URL for internal API request");
  }

  const url = `${configuredBaseUrl}/api/ministries?top=${encodeURIComponent(top)}`;
  const res = await fetch(url, { next: { revalidate: 60 } });
  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`Ministries API failed: ${res.status} ${res.statusText}. ${body}`);
  }

  const json = (await res.json()) as ListResponse;
  return json;
}

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string; top: string }>;
}) {
  const { locale, top } = await params;
  const normalizedLocale = normalizeLocale(locale);
  const messages = getMessages(normalizedLocale);
  const { items, error } = await getList(top);

  return (
    <main className="mx-auto max-w-4xl px-6 pt-28 pb-6 md:pt-32 space-y-6">
      <h1 className="text-2xl font-semibold">
        {messages.ministries.listTitle}: {top}
      </h1>

      {error ? (
        <div className="rounded-lg border border-amber-200 bg-amber-50 p-3 text-sm text-amber-900">
          {messages.common.errorPrefix} {error}
        </div>
      ) : null}

      <ul className="space-y-4">
        {items.map((it) => {
          const title = pickLocalized(normalizedLocale, {
            en: it.fields.titleEn,
            zh: it.fields.titleZh,
            fallback: it.slug,
          });
          const link = withLocale(normalizedLocale, `/ministries/${top}/${it.slug}`);
          return (
            <li key={it.slug} className="rounded-xl border p-4">
              <a className="text-xl font-medium underline" href={link}>
                {title}
              </a>
              <div className="text-sm opacity-70 mt-1">
                section leaf: {it.section.leaf?.slug ?? "—"}
              </div>
            </li>
          );
        })}
      </ul>
    </main>
  );
}
