export default function MinistriesTopLoading() {
  return (
    <main className="pb-10">
      <section className="relative w-full overflow-hidden bg-zinc-950 text-white">
        <div className="relative h-[280px] w-full animate-pulse bg-zinc-800 md:h-[360px]" />
      </section>

      <section className="mx-auto max-w-6xl space-y-8 px-6 pt-10 md:pt-12">
        <div className="h-10 w-36 animate-pulse rounded-full bg-zinc-200" />

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={`ministry-card-skeleton-${index}`} className="overflow-hidden rounded-xl border border-zinc-200 bg-white">
              <div className="h-44 animate-pulse bg-zinc-200" />
              <div className="space-y-3 p-4">
                <div className="h-6 w-2/3 animate-pulse rounded bg-zinc-200" />
                <div className="h-4 w-full animate-pulse rounded bg-zinc-200" />
                <div className="h-4 w-5/6 animate-pulse rounded bg-zinc-200" />
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
