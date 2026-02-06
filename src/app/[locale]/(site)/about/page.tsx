import Image from "next/image";
import { getMessages, normalizeLocale, withLocale } from "@/lib/i18n";

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const normalizedLocale = normalizeLocale(locale);
  const messages = getMessages(normalizedLocale);
  const isEnglish = normalizedLocale === "en";
  const goalsTitle = isEnglish ? "2026 BRC Goals" : "2026 BRC 目标";
  const goalsHeadline = isEnglish ? ["ALIGN", "WITH", "GOD"] : ["與神", "對齊"];
  const goals = isEnglish
    ? [
        {
          title: "Seek First God's Kingdom and Righteousness",
          ref: "Matthew 6:33",
          verse:
            '"But seek first his kingdom and his righteousness, and all these things will be given to you as well."',
          note:
            "We do not plan our lives first and then ask God to bless them; we align with His kingdom and His will first.",
        },
        {
          title: "Commit Your Way to the Lord",
          ref: "Proverbs 3:5–6",
          verse:
            '"Trust in the LORD with all your heart and lean not on your own understanding; in all your ways submit to him, and he will make your paths straight."',
          note: "Alignment means surrendering our own control and letting God lead.",
        },
        {
          title: "Be Transformed by the Renewing of Your Mind",
          titleLines: ["Be Transformed by the", "Renewing of Your Mind"],
          ref: "Romans 12:2",
          verse:
            '"Do not conform to the pattern of this world, but be transformed by the renewing of your mind. Then you will be able to test and approve what God’s will is—his good, pleasing and perfect will."',
          note: "True alignment starts with renewing our way of thinking.",
        },
        {
          title: "The Lord Directs Our Steps",
          ref: "Psalm 37:23",
          verse:
            '"The LORD makes firm the steps of the one who delights in him; he may stumble, but he will not fall, for the LORD upholds him with his hand."',
          note: "When we align with God, our steps are calibrated by Him.",
        },
        {
          title: "Obedience Brings Blessing",
          ref: "Deuteronomy 28:1–2 (selected)",
          verse:
            '"If you fully obey the LORD your God and carefully follow all his commands... all these blessings will come on you and accompany you."',
          note: "Alignment is not a slogan; it is a life of obedience.",
        },
        {
          title: "Not My Will, but Yours",
          ref: "Luke 22:42",
          verse: '"Yet not my will, but yours be done."',
          note: "This is the deepest example of alignment with God.",
        },
        {
          title: "The Lord Is Our Foundation",
          ref: "Psalm 127:1",
          verse:
            '"Unless the LORD builds the house, the builders labor in vain."',
          note: "Without aligning with God, even great effort can fall short.",
        },
      ]
    : [
        {
          title: "先對齊神的國與義",
          ref: "馬太福音 6:33",
          verse: "「你們要先求他的國和他的義，這些東西都要加給你們了。」",
          note: "不是先安排自己的人生，再請神祝福；而是先對齊神的國度與心意。",
        },
        {
          title: "將道路交託給主",
          ref: "箴言 3:5–6",
          verse:
            "「你要專心仰賴耶和華，不可倚靠自己的聰明；在你一切所行的事上都要認定他，他必指引你的路。」",
          note: "與神對齊＝放下自我主權，讓神來導航。",
        },
        {
          title: "心意更新而變化",
          ref: "羅馬書 12:2",
          verse:
            "「不要效法這個世界，只要心意更新而變化，叫你們察驗何為神的善良、純全、可喜悅的旨意。」",
          note: "真正的對齊從「思想系統」開始更新。",
        },
        {
          title: "神親自引導前路",
          ref: "詩篇 37:23",
          verse: "「義人的腳步被耶和華立定；他的道路，耶和華也喜愛。」",
          note: "當我們對齊神，腳步自然被祂校準。",
        },
        {
          title: "順服帶來祝福",
          ref: "申命記 28:1–2（節選）",
          verse: "「你若留意聽從耶和華你神的話……這以下的福必追隨你，臨到你身上。」",
          note: "對齊不是口號，而是活在順服裡。",
        },
        {
          title: "不是照自己意思",
          ref: "路加福音 22:42",
          verse: "「然而，不要成就我的意思，只要成就你的意思。」",
          note: "這是「與神對齊」最深的榜樣。",
        },
        {
          title: "主是我們人生的準繩",
          ref: "詩篇 127:1",
          verse: "「若不是耶和華建造房屋，建造的人就枉然勞力。」",
          note: "若沒有對齊神，再多努力也容易落空。",
        },
      ];

  const formatGoalTitle = (
    title: string,
    titleLines?: string[]
  ) => {
    if (!isEnglish) return title;
    if (titleLines && titleLines.length === 2) {
      return (
        <>
          <span className="block whitespace-nowrap">{titleLines[0]}</span>
          <span className="block whitespace-nowrap">{titleLines[1]}</span>
        </>
      );
    }
    const words = title.split(" ");
    if (words.length <= 2) {
      return (
        <>
          <span className="block whitespace-nowrap">{title}</span>
          <span className="block">&nbsp;</span>
        </>
      );
    }
    const midpoint = Math.ceil(words.length / 2);
    const line1 = words.slice(0, midpoint).join(" ");
    const line2 = words.slice(midpoint).join(" ");
    return (
      <>
        <span className="block whitespace-nowrap">{line1}</span>
        <span className="block whitespace-nowrap">{line2}</span>
      </>
    );
  };

  return (
    <main className="pb-16">
      <section className="relative w-full overflow-hidden bg-zinc-900 text-white">
        <div className="relative h-[480px] w-full">
          <Image
            src="/images/hand_b&w.jpeg"
            alt="About BRC"
            fill
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/40 to-black/60" />
        </div>
        <div className="absolute inset-0 flex items-center justify-center text-center px-6 pt-28 md:pt-32">
          <div className="max-w-3xl space-y-4">
            <h1 className="text-4xl font-semibold md:text-5xl">
              {messages.about.heroTitle}
        
            </h1>
            <p className="text-base text-zinc-200 md:text-lg">{messages.about.heroBody}</p>
          </div>
        </div>
      </section>

      <section className="bg-zinc-50">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 py-16 md:grid-cols-2 md:items-center">
          <div className="space-y-4">
            <h2 className="text-3xl font-semibold">{messages.about.storyTitle}</h2>
            <p className="text-sm text-zinc-600">{messages.about.storyBody}</p>
          </div>
          <div className="h-72 w-full bg-white/70" />
        </div>
      </section>

      <section className="grid lg:grid-cols-2">
        <div className="relative min-h-[520px] w-full">
          <Image
            src="/images/mission&vision.jpeg"
            alt="Mission and Vision"
            fill
            className="object-cover object-center"
            priority
          />
        </div>
        <div className="bg-white px-6 py-14 lg:px-12">
          <div className="mx-auto max-w-xl space-y-8">
            <div className="space-y-4">
              <h2 className="text-3xl font-semibold">{messages.about.missionTitle}</h2>
              <p className="text-sm text-zinc-600">{messages.about.missionBody}</p>
            </div>
            <div className="space-y-4">
              <h2 className="text-3xl font-semibold">{messages.about.visionTitle}</h2>
              <p className="text-sm text-zinc-600">{messages.about.visionBody}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-amber-50 text-zinc-900">
        <div className="mx-auto max-w-6xl px-6 py-14">
          <div className="space-y-8">
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              <div className="space-y-4 border-t border-zinc-200 pt-6">
                <div className="text-xs uppercase tracking-widest text-zinc-500">{goalsTitle}</div>
                <div className="text-5xl font-semibold tracking-wide leading-none text-red-700">
                  {goalsHeadline.map((item) => (
                    <div key={item}>{item}</div>
                  ))}
                </div>
              </div>

              {goals.map((item, index) => (
                <div
                  key={item.title}
                  className="space-y-3 border-t border-zinc-200 pt-4 text-left"
                >
                  <div className="flex items-baseline justify-between gap-4">
                    <div className="text-xs uppercase tracking-widest text-zinc-500">
                      ({String(index + 1).padStart(2, "0")})
                    </div>
                    <div
                      className={`font-semibold text-right w-full max-w-[320px] leading-snug ${
                        isEnglish ? "text-base" : "text-xl"
                      }`}
                    >
                      {formatGoalTitle(item.title, item.titleLines)}
                    </div>
                  </div>
                  <div className="text-sm font-semibold text-zinc-900">{item.note}</div>
                  <div className="pt-3 text-sm text-zinc-700">{item.verse}</div>
                  <div className="text-sm text-zinc-500 text-right">{item.ref}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-zinc-50">
        <div className="mx-auto max-w-6xl px-6 py-14">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-4">
              <h2 className="text-3xl font-semibold">{messages.about.directionTitle}</h2>
              <p className="text-sm text-zinc-600">{messages.about.directionBody}</p>
            </div>
            <div className="space-y-4">
              <h2 className="text-3xl font-semibold">{messages.about.valuesTitle}</h2>
              <div className="text-sm text-zinc-600 space-y-1">
                {messages.about.values.map((item) => (
                  <div key={item}>{item}</div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-12">
        <div className="flex items-end justify-between">
          <h2 className="text-3xl font-semibold">{messages.about.teamTitle}</h2>
          <a
            className="text-sm text-zinc-700 underline"
            href={withLocale(normalizedLocale, "/ministries/youth")}
          >
            {messages.about.teamCta}
          </a>
        </div>
        <div className="mt-6 grid gap-8 md:grid-cols-3">
          {messages.about.team.map((item) => (
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
              <h2 className="text-2xl font-semibold">{messages.about.joinTitle}</h2>
              <p className="mt-2 text-sm text-zinc-300">{messages.about.joinBody}</p>
            </div>
            <a
              className="inline-flex items-center justify-center rounded-full bg-amber-500 px-6 py-3 text-sm font-semibold text-black"
              href={withLocale(normalizedLocale, "/donation")}
            >
              {messages.about.joinCta}
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
