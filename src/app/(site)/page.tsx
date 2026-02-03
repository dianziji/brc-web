
import Image from "next/image";
import MinistryCarousel from "@/components/MinistryCarousel";

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-zinc-900">
      <section className="relative min-h-[100vh] overflow-hidden bg-zinc-1000 text-white">
        <div className="absolute inset-0">
          <Image
            src="/images/hero.jpeg"
            alt="[placeholder] Hero"
            fill
            priority
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-zinc-900/80 via-zinc-800/70 to-zinc-700/60" />
        </div>
        <div className="relative mx-auto max-w-6xl px-12 py-32 md:py-40 min-h-[100vh] flex items-center justify-center">
          <div className="mx-auto max-w-4xl text-center">

            <h1 className="mt-4 text-4xl font-semibold leading-tight md:text-5xl">
            Bethel Renewal Center
              <span className="block text-2xl text-zinc-200 md:text-3xl">
                [placeholder] 更新生命 · 服事列国
              </span>
            </h1>
          </div>
 
        </div>
      </section>

      <section className="bg-zinc-50 min-h-[35vh]">
        <div className="grid md:grid-cols-2 md:min-h-[35vh]">
          <div className="min-h-[240px] bg-zinc-200 md:min-h-[35vh]" />
          <div className="flex items-center">
            <div className="mx-auto max-w-xl space-y-4 px-6 py-10 md:py-14">
              <h2 className="text-3xl font-semibold">使命</h2>
              <p className="text-sm text-zinc-600">
                [placeholder] 以推動敬拜讚美與禱告為核心，以連結各教會為使命，舉辦各樣活動推動
                敬拜讚美運動，恢復神在美東的榮耀同在。到各處宣傳建立美東眾教會聯結，
                幫助有需要的個人、家庭、群體及教會。提供教導、訓練、資源，鼓勵常常
                一同禱告敬拜、舉辦特會、佈道會，直至興旺教會。
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white min-h-[35vh]">
        <div className="grid md:grid-cols-2 md:min-h-[35vh]">
          <div className="flex items-center">
            <div className="mx-auto max-w-xl space-y-4 px-6 py-10 md:py-14">
              <h2 className="text-3xl font-semibold">异象</h2>
              <p className="text-sm text-zinc-600">
                [placeholder] 成为一个跨文化、跨世代的合一网络，培育敬拜与祷告的生活方式，
                并协同众教会同心建立属灵家园。
              </p>
              <p className="text-sm text-zinc-600">
                [placeholder] 在美國東岸及世界各地要與弟兄姐妹連結，藉著敬拜讚美及禱告來尋求神的旨意，
                進入神的命定，更新這個世代。
              </p>
            </div>
          </div>
          <div className="min-h-[240px] bg-zinc-200 md:min-h-[35vh]" />
        </div>
      </section>

      <section className="relative bg-zinc-900 text-white min-h-[20vh]">
        <div className="absolute inset-0 bg-gradient-to-r from-zinc-900 via-zinc-800 to-zinc-900" />
        <div className="relative grid w-full grid-cols-1 text-center md:grid-cols-4 md:min-h-[20vh]">
          {[
            { value: "120+", label: "[placeholder] 合作机构" },
            { value: "200+", label: "[placeholder] 志愿者" },
            { value: "30+", label: "[placeholder] 年度项目" },
            { value: "5,000+", label: "[placeholder] 受益人群" },
          ].map((item) => (
            <div
              key={item.label}
              className="flex min-h-[110px] flex-col items-center justify-center border-t border-white/10 px-6 text-center md:min-h-[20vh] md:border-l md:border-t-0"
            >
              <div className="text-3xl font-semibold">{item.value}</div>
              <div className="mt-1 text-sm text-zinc-300">{item.label}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-zinc-50">
        <div className="mx-auto grid max-w-6xl gap-8 px-6 py-16 md:grid-cols-2 md:items-center">
          <div className="h-72 w-full bg-white/60" />
          <div className="space-y-4">
   
            <h2 className="text-3xl font-semibold">关于我们</h2>
            <p className="text-sm text-zinc-600">
              [placeholder] 我们是一个多文化、多语言的NGO组织，专注于社区关怀与跨文化服务，
              通过长期项目推动教育、关怀与生命更新。
            </p>
            <a className="inline-flex text-sm font-medium text-zinc-900 underline" href="/about">
              [placeholder] 关于我们
            </a>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-12">
        <div className="flex items-end justify-between">
          <h2 className="text-3xl font-semibold">重点事工</h2>
          <a className="text-sm text-zinc-700 underline" href="/ministries">
            查看全部
          </a>
        </div>
        <div className="mt-6">
          <MinistryCarousel />
        </div>
      </section>

      <section className="bg-zinc-50">
        <div className="mx-auto max-w-6xl px-6 py-12">
          <div className="flex items-end justify-between">
            <h2 className="text-3xl font-semibold">[placeholder] Upcoming Events</h2>
            <a className="text-sm text-zinc-700 underline" href="/events">
              [placeholder] 查看全部
            </a>
          </div>
          <div className="mt-6 grid gap-8 md:grid-cols-3">
            {[
              { title: "[placeholder] 社区关怀义诊", speaker: "[placeholder] 本周六 9:00 AM" },
              { title: "[placeholder] 青年成长营", speaker: "[placeholder] 本周日 2:00 PM" },
              { title: "[placeholder] 国际伙伴分享会", speaker: "[placeholder] 下周五 7:30 PM" },
            ].map((item) => (
              <div key={item.title} className="group">
                <div className="h-48 w-full bg-white" />
                <div className="mt-4 text-lg font-medium">{item.title}</div>
                <div className="mt-1 text-sm text-zinc-600">{item.speaker}</div>
                <a className="mt-3 inline-flex text-sm text-zinc-900 underline" href="/events">
                  [placeholder] 了解详情
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-12">
        <div className="grid gap-8 md:grid-cols-2 md:items-center">
          <div className="space-y-4">

            <h2 className="text-3xl font-semibold">祷告室</h2>
            <p className="text-sm text-zinc-600">
              [placeholder] 祷告室为有需要的人提供陪伴与代祷，欢迎预约或现场参与。
            </p>
            <a className="inline-flex text-sm font-medium text-zinc-900 underline" href="/prayer">
              [placeholder] 了解祷告室
            </a>
          </div>
          <div className="space-y-2 text-sm text-zinc-600">
            <div className="text-sm font-medium text-zinc-900">[placeholder] 开放时间</div>
            <div>[placeholder] 周二至周六 10:00 AM - 6:00 PM</div>
            <div>[placeholder] 预约电话：(973) 000-0000</div>
          </div>
        </div>
      </section>

      <section className="bg-zinc-50">
        <div className="mx-auto max-w-6xl px-6 py-12">
          <div className="flex items-end justify-between">
            <h2 className="text-3xl font-semibold">门徒训练</h2>
            <a className="text-sm text-zinc-700 underline" href="/trainings">
              [placeholder] 查看全部
            </a>
          </div>
          <div className="mt-6 grid gap-8 md:grid-cols-3">
            {[
              { title: "[placeholder] 基督生平", desc: "[placeholder] 扎根福音，建立属灵生命基础。" },
              { title: "[placeholder] 保罗生平与书信", desc: "[placeholder] 认识真理，建立门徒品格与使命。" },
              { title: "[placeholder] 领袖培训", desc: "[placeholder] 装备同工，建立健康团队与事奉。" },
            ].map((item) => (
              <div key={item.title} className="group">
                <div className="h-40 w-full bg-white" />
                <div className="mt-4 text-lg font-medium">{item.title}</div>
                <p className="mt-1 text-sm text-zinc-600">{item.desc}</p>
                <a className="mt-3 inline-flex text-sm text-zinc-900 underline" href="/trainings">
                  [placeholder] 门徒训练详情
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-12">
        <div className="flex items-end justify-between">
          <h2 className="text-3xl font-semibold">音讯库</h2>
          <a className="text-sm text-zinc-700 underline" href="/audio">
            [placeholder] 查看全部
          </a>
        </div>
        <div className="mt-6 grid gap-8 md:grid-cols-3">
          {[
            { title: "[placeholder] 信心的旅程", speaker: "[placeholder] 讲员：David" },
            { title: "[placeholder] 更新的生命", speaker: "[placeholder] 讲员：Grace" },
            { title: "[placeholder] 爱中彼此建造", speaker: "[placeholder] 讲员：John" },
          ].map((item) => (
            <div key={item.title} className="group">
              <div className="h-40 w-full bg-zinc-100" />
              <div className="mt-4 text-lg font-medium">{item.title}</div>
              <div className="mt-1 text-sm text-zinc-600">{item.speaker}</div>
              <a className="mt-3 inline-flex text-sm text-zinc-900 underline" href="/audio">
                [placeholder] 观看讲道
              </a>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-zinc-900">
        <div className="mx-auto max-w-6xl px-6 py-14 text-white">
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
            <div>
              <h2 className="text-2xl font-semibold">[placeholder] 支持我们的使命</h2>
              <p className="mt-2 text-sm text-zinc-300">
                [placeholder] 你的奉献支持帮助我们持续服事社区与列国。
              </p>
            </div>
            <a
              className="inline-flex items-center justify-center rounded-full bg-amber-500 px-6 py-3 text-sm font-semibold text-black"
              href="/donation"
            >
              [placeholder] 立即奉献
            </a>
          </div>
        </div>
      </section>

      <section className="bg-zinc-50">
        <div className="mx-auto max-w-6xl px-6 py-14">
          <div className="grid gap-8 md:grid-cols-[1fr_1.2fr]">
            <div className="space-y-4">
              <h2 className="text-3xl font-semibold">[placeholder] 联系我们</h2>
              <div className="text-sm text-zinc-600">
                <div>[placeholder] 地址：Bethel Renewal Center, Lake Hiawatha, NJ</div>
                <div>[placeholder] 邮箱：info@brc.org</div>
                <div>[placeholder] 电话：(973) 000-0000</div>
              </div>
            </div>
            <form className="bg-white/80 p-6">
              <div className="grid gap-4">
                <input
                  className="w-full border-b bg-transparent px-1 py-2 text-sm focus:outline-none"
                  placeholder="[placeholder] 姓名"
                  type="text"
                />
                <input
                  className="w-full border-b bg-transparent px-1 py-2 text-sm focus:outline-none"
                  placeholder="[placeholder] 邮箱"
                  type="email"
                />
                <textarea
                  className="min-h-[120px] w-full border-b bg-transparent px-1 py-2 text-sm focus:outline-none"
                  placeholder="[placeholder] 留言内容"
                />
                <button className="w-full bg-amber-500 px-4 py-2 text-sm font-semibold text-black">
                  [placeholder] 提交问题
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}
