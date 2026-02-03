import Link from "next/link";

const navItems = [
  { label: "主頁", href: "/" },
  { label: "關於我們", href: "/about" },
  { label: "活动日历", href: "/calendar" },
  { label: "禱告室", href: "/prayer" },
  { label: "宣教事工", href: "/ministries" },
  { label: "門徒訓練", href: "/trainings" },
  { label: "音訊庫", href: "/audio" },
  { label: "奉獻支持", href: "/donation" },
];

export default function Footer() {
  return (
    <footer className="border-t bg-zinc-50">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-10 md:grid-cols-[1.2fr_1fr_1fr]">
          <div className="space-y-3">
            <div className="text-sm font-semibold">Bethel Renewal Center</div>
            <div className="text-xs text-zinc-500">伯特利中心</div>
            <div className="pt-2 text-sm text-zinc-600 space-y-1">
              <div>Lake Hiawatha, NJ placeholder</div>
              <div>info@brc.org placeholder</div>
              <div>(973) 000-0000 placeholder</div>
              <Link className="mt-3 inline-flex underline" href="/contact">
                联系我们
              </Link>
            </div>
          </div>

          <div className="text-sm text-zinc-700">
            <div className="font-medium text-zinc-900">快速链接</div>
            <div className="mt-2 flex flex-col gap-2">
              {navItems.map((item) => (
                <Link key={item.href} href={item.href} className="hover:text-zinc-900">
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
          <div className="text-sm text-zinc-700">
            <div className="font-medium text-zinc-900">订阅更新</div>
            <p className="mt-2 text-zinc-600">获取最新活动与讲道资讯。</p>
            <div className="mt-4 flex gap-2">
              <input
                type="email"
                placeholder="your@email.com"
                className="w-full rounded-md border bg-white px-3 py-2 text-sm"
              />
              <button className="rounded-md bg-amber-500 px-3 py-2 text-sm font-semibold text-black">
                订阅
              </button>
            </div>
          </div>
        </div>
        <div className="mt-8 text-xs text-zinc-500">
          © {new Date().getFullYear()} Bethel Renewal Center. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

