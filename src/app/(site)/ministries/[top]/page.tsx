// src/app/ministries/[top]/page.tsx
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
  
  import { headers } from "next/headers";

  async function getList(top: string): Promise<ListResponse> {
    const h = await headers();
    const host = h.get("x-forwarded-host") ?? h.get("host");
    const proto = h.get("x-forwarded-proto") ?? "http";
    if (!host) throw new Error("Unable to determine host for internal API request");

    const url = `${proto}://${host}/api/ministries?top=${encodeURIComponent(top)}`;
    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) {
      const body = await res.text().catch(() => "");
      throw new Error(`Ministries API failed: ${res.status} ${res.statusText}. ${body}`);
    }

    const json = (await res.json()) as ListResponse;
    return json;
  }
  
  export default async function Page({ params }: { params: Promise<{ top: string }> }) {
    const { top } = await params;
    const { items, error } = await getList(top);
  
    return (
      <main className="mx-auto max-w-4xl p-6 space-y-6">
        <h1 className="text-2xl font-semibold">Ministries: {top}</h1>
  
        {error ? (
          <div className="rounded-lg border border-amber-200 bg-amber-50 p-3 text-sm text-amber-900">
            Ministries API error: {error}
          </div>
        ) : null}

        <ul className="space-y-4">
          {items.map((it) => (
            <li key={it.slug} className="rounded-xl border p-4">
              <a className="text-xl font-medium underline" href={`/ministries/${top}/${it.slug}`}>
                {it.fields.titleEn || it.fields.titleZh || it.slug}
              </a>
              <div className="text-sm opacity-70 mt-1">section leaf: {it.section.leaf?.slug ?? "—"}</div>
            </li>
          ))}
        </ul>
      </main>
    );
  }