export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white text-zinc-900 pt-28 md:pt-32">
      <section className="relative overflow-hidden bg-zinc-900 text-white">
        <div className="absolute inset-0 bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-700" />
        <div className="relative mx-auto max-w-6xl px-6 py-20 md:py-28">
          <h1 className="text-4xl font-semibold leading-tight md:text-5xl">
            關於伯特利更新中心
            <span className="block text-2xl text-zinc-200 md:text-3xl">Bethel Renewal Center</span>
          </h1>
          <p className="mt-6 max-w-3xl text-lg text-zinc-200">
            BRC 是位於北美紐澤西的資源型機構，專注推動敬拜、祷告與跨文化連結，
            透過活動、訓練與合作，服事城市與列國。
          </p>
        </div>
      </section>

      <section className="bg-zinc-50">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 py-16 md:grid-cols-2 md:items-center">
          <div className="space-y-4">
            <h2 className="text-3xl font-semibold">我们的故事</h2>
            <p className="text-sm text-zinc-600">
              我们致力于推动敬拜与祷告相关的活动，连结各地教会与机构，
              在不同世代与文化之间建立共同使命的伙伴关系。
            </p>
          </div>
          <div className="h-72 w-full bg-white/70" />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-12">
        <div className="grid gap-8 md:grid-cols-2">
          <div className="space-y-4">
            <h2 className="text-3xl font-semibold">使命</h2>
            <p className="text-sm text-zinc-600">
              以推動敬拜讚美與禱告為核心，以連結各教會為使命，舉辦各樣活動推動
              敬拜讚美運動，恢復神在美東的榮耀同在。到各處宣傳建立美東眾教會聯結，
              幫助有需要的個人、家庭、群體及教會。提供教導、訓練、資源，鼓勵常常
              一同禱告敬拜、舉辦特會、佈道會，直至興旺教會。
            </p>
          </div>
          <div className="space-y-4">
            <h2 className="text-3xl font-semibold">异象</h2>
            <p className="text-sm text-zinc-600">
              成为一个跨文化、跨世代的合一网络，培育敬拜与祷告的生活方式，
              并协同众教会同心建立属灵家园。
            </p>
          </div>
        </div>
      </section>

      <section className="bg-zinc-50">
        <div className="mx-auto max-w-6xl px-6 py-14">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-4">
              <h2 className="text-3xl font-semibold">我们的方向</h2>
              <p className="text-sm text-zinc-600">
              在美國東岸及世界各地要與弟兄姐妹連結，藉著敬拜讚美及禱告來尋求神的旨意，
              進入神的命定，更新這個世代。
              </p>
            </div>
            <div className="space-y-4">
              <h2 className="text-3xl font-semibold">核心价值</h2>
              <div className="text-sm text-zinc-600">
                <div>Bridal Minded 新婦的思维</div>
                <div>Equipping Saints 裝備聖徒</div>
                <div>Truth Abiding 持守真理</div>
                <div>Holiness Unto the Lord 歸耶和華為聖</div>
                <div>Eternity Focused 注目於永恆</div>
                <div>Love God and Love People 愛神與愛人</div>
                <div>Renewed Heart and Mind 心意更新而變化</div>
                <div>Christ Centered Lifestyle 以基督為中心的生活方式</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-12">
        <div className="flex items-end justify-between">
          <h2 className="text-3xl font-semibold">事工与领导团队</h2>
          <a className="text-sm text-zinc-700 underline" href="/ministries/youth">
            查看事工详情
          </a>
        </div>
        <div className="mt-6 grid gap-8 md:grid-cols-3">
          {[
            { name: "林雄堅 牧师", role: "事工领袖" },
            { name: "彭榮仁 牧师", role: "事工领袖" },
            { name: "鄭隆保 牧师", role: "事工领袖" },
          ].map((item) => (
            <div key={item.name} className="group">
              <div className="h-52 w-full bg-zinc-100" />
              <div className="mt-4 text-lg font-medium">{item.name}</div>
              <div className="mt-1 text-sm text-zinc-600">{item.role}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-zinc-900">
        <div className="mx-auto max-w-6xl px-6 py-14 text-white">
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
            <div>
              <h2 className="text-2xl font-semibold">与我们同行</h2>
              <p className="mt-2 text-sm text-zinc-300">
                透过合作、代祷与奉献，一起参与城市与列国的更新。
              </p>
            </div>
            <a
              className="inline-flex items-center justify-center rounded-full bg-amber-500 px-6 py-3 text-sm font-semibold text-black"
              href="/donation"
            >
              奉献支持
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}

