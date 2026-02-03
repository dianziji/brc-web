import Image from "next/image";

export default function PrayerPage() {
  return (
    <main className="pb-16">
      <section className="relative w-full overflow-hidden bg-zinc-900 text-white">
        <div className="relative h-[480px] w-full">
          <Image src="/images/jonathan-j-castellon-EzH88o2GxJ4-unsplash.jpg" alt="Prayer Room" fill className="object-cover object-center" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/40 to-black/60" />
        </div>
        <div className="absolute inset-0 flex items-center justify-center text-center px-6 pt-28 md:pt-32">
          <div className="max-w-3xl space-y-4">
            <h1 className="text-4xl font-semibold md:text-5xl">祷告室</h1>
            <p className="text-base text-zinc-200 md:text-lg">
              伯特利中心邀请全球守望祷告，与不同城市、不同国家的团队一起，建立持续不断的敬拜与祷告祭坛。
            </p>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-6 pt-12 md:pt-16 space-y-12">
        <section className="grid gap-6 md:grid-cols-3">
        <div className="rounded-2xl border border-zinc-200 bg-white p-6 space-y-4">
          <div className="relative h-40 w-full overflow-hidden rounded-xl bg-zinc-100">
            <Image src="/images/hero.jpeg" alt="24/7 Prayer Altar" fill className="object-cover object-center" />
          </div>
          <h2 className="text-xl font-semibold">24 小时祷告祭坛</h2>
          <p className="text-sm text-zinc-600">
            24/7 全球敬拜赞美祷告宣教祭坛，全年无休，按纽约美东时间（EST）轮流守望。
          </p>
          <div className="text-sm text-zinc-500 space-y-1">
            <div>形式：Zoom 线上 24 小时不间断祷告会</div>
            <div>基准时间：纽约美东时间（EST）</div>
          </div>
          <a className="inline-flex text-sm font-medium text-zinc-900 underline" href="https://us06web.zoom.us/j/88081177356?pwd=txHMfslJe9WPc4laR8eAm7NnGOnk5V.1">
            加入祷告会
          </a>
          <br />
          <a className="inline-flex text-sm font-medium text-zinc-900 underline" href="https://docs.google.com/spreadsheets/d/1bHV9o1poaXOmpEF5rai40jMv30KphtcB/edit?gid=1236658947#gid=1236658947">
            目前已经认领时段列表
          </a>
          <p className="text-sm text-zinc-500 space-y-1">*為避免產生雜音干擾聚會，上線後請關閉麥克風(或按mute)保持靜音,要說話的時候再打開即可.</p>
        </div>

        <div className="rounded-2xl border border-zinc-200 bg-white p-6 space-y-4">
          <div className="relative h-40 w-full overflow-hidden rounded-xl bg-zinc-100">
            <Image src="/images/hero.jpeg" alt="Prayer Platform" fill className="object-cover object-center" />
          </div>
          <h2 className="text-xl font-semibold">伯特利中心祷告平台</h2>
          <p className="text-sm text-zinc-600">
            周间美东时间早上 7:00 专题分享，周二晚祷美东时间 8:00 开始。
          </p>
          <div className="text-sm text-zinc-500 space-y-1">
            <div>内容：本周专题分享及祷告焦点</div>
            <div>入口：可在音讯库查询过往分享</div>
          </div>
          <div className="flex gap-3">
            <a className="inline-flex text-sm font-medium text-zinc-900 underline" href="#">
              本周专题分享
            </a>
        
          </div>
        </div>

        <div className="rounded-2xl border border-zinc-200 bg-white p-6 space-y-4">
          <div className="relative h-40 w-full overflow-hidden rounded-xl bg-zinc-100">
            <Image src="/images/hero.jpeg" alt="RPG Revival Prayer" fill className="object-cover object-center" />
          </div>
          <h2 className="text-xl font-semibold">RPG 复兴祷告特会</h2>
          <p className="text-sm text-zinc-600">
            复兴祷告特会每日美东时间早上 8:30 开始，邀请你一同参与。
          </p>
          <div className="text-sm text-zinc-500 space-y-1">
            <div>时间：周一至周日 8:30 AM（EST）</div>
            <div>形式：线上聚集与祷告</div>
          </div>
          <a className="inline-flex text-sm font-medium text-zinc-900 underline" href="#">
            加入复兴祷告特会
          </a>
        </div>
      </section>

        <section className="rounded-2xl border border-dashed border-zinc-200 bg-zinc-50 p-6 text-sm text-zinc-600">
          <div className="mt-2 space-y-1">
            <div>Bethel Renewal Center, Lake Hiawatha, NJ 07034</div>
            <div>info@brc.org</div>
            <div>(973) 000-0000</div>
          </div>
        </section>
      </div>
    </main>
  );
}
