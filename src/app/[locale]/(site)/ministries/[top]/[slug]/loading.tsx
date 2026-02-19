export default function MinistryDetailLoading() {
  return (
    <main className="bg-white pt-20 md:pt-24">
      <section className="grid min-h-[calc(100vh-5rem)] md:grid-cols-2">
        <div className="relative min-h-[300px] animate-pulse bg-zinc-200 md:min-h-[calc(100vh-6rem)]" />

        <div className="flex items-start">
          <div className="mx-auto w-full max-w-xl space-y-6 px-6 py-8 md:px-10 md:py-10">
            <div className="h-10 w-3/4 animate-pulse rounded bg-zinc-200 md:h-12" />
            <div className="space-y-3">
              <div className="h-4 w-full animate-pulse rounded bg-zinc-200" />
              <div className="h-4 w-11/12 animate-pulse rounded bg-zinc-200" />
              <div className="h-4 w-10/12 animate-pulse rounded bg-zinc-200" />
              <div className="h-4 w-9/12 animate-pulse rounded bg-zinc-200" />
            </div>

            <div className="pt-4">
              <div className="h-10 w-52 animate-pulse rounded-full bg-zinc-200" />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
