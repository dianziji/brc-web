export default function MinistriesLoading() {
  return (
    <main className="pb-10">
      <section className="relative w-full overflow-hidden bg-zinc-950 text-white">
        <div className="relative h-[320px] w-full animate-pulse bg-zinc-800 md:h-[480px]" />
      </section>

      <section className="w-full">
        <div className="grid grid-cols-1 gap-0 md:grid-cols-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <div
              key={`top-skeleton-${index}`}
              className="min-h-[300px] animate-pulse border-t border-zinc-800/30 bg-zinc-800/60 md:min-h-[420px] md:border-l"
            />
          ))}
        </div>
      </section>

      <div className="mx-auto max-w-6xl space-y-14 px-6 pt-10 md:pt-16">
        <section className="space-y-4">
          <div className="h-7 w-48 animate-pulse rounded bg-zinc-200" />
          <div className="grid gap-4 md:grid-cols-3">
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={`slide-skeleton-${index}`} className="space-y-3">
                <div className="h-44 animate-pulse rounded-xl bg-zinc-200" />
                <div className="h-4 w-3/4 animate-pulse rounded bg-zinc-200" />
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-2xl border border-dashed border-zinc-300 bg-zinc-50 p-8">
          <div className="h-7 w-56 animate-pulse rounded bg-zinc-200" />
          <div className="mt-3 h-4 w-3/4 animate-pulse rounded bg-zinc-200" />
          <div className="mt-2 h-4 w-2/3 animate-pulse rounded bg-zinc-200" />
        </section>
      </div>
    </main>
  );
}
