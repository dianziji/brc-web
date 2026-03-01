export default function MinistriesLoading() {
  return (
    <main className="pb-10">
      <section className="relative w-full overflow-hidden bg-align-token text-white">
        <div className="relative h-[320px] w-full animate-pulse bg-stats-token md:h-[480px]" />
      </section>

      <section className="w-full">
        <div className="grid grid-cols-1 gap-0 md:grid-cols-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <div
              key={`top-skeleton-${index}`}
              className="min-h-[300px] animate-pulse border-t border-dk-token bg-stats-token opacity-80 md:min-h-[420px] md:border-l"
            />
          ))}
        </div>
      </section>

      <div className="mx-auto max-w-6xl space-y-14 px-6 pt-10 md:pt-16">
        <section className="space-y-4">
          <div className="h-7 w-48 animate-pulse rounded bg-surface-b" />
          <div className="grid gap-4 md:grid-cols-3">
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={`slide-skeleton-${index}`} className="space-y-3">
                <div className="h-44 animate-pulse rounded-xl bg-surface-b" />
                <div className="h-4 w-3/4 animate-pulse rounded bg-surface-b" />
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-2xl border border-dashed border-token bg-surface-b p-8">
          <div className="h-7 w-56 animate-pulse rounded bg-surface-b" />
          <div className="mt-3 h-4 w-3/4 animate-pulse rounded bg-surface-b" />
          <div className="mt-2 h-4 w-2/3 animate-pulse rounded bg-surface-b" />
        </section>
      </div>
    </main>
  );
}
