const navItems = [
  { label: "主頁", href: "/" },
  { label: "關於我們", href: "/about" },
  { label: "禱告室", href: "/prayer" },
  { label: "宣教事工", href: "/ministries/youth" },
  { label: "門徒訓練", href: "/trainings" },
  { label: "音訊庫", href: "/audio" },
  { label: "奉獻支持", href: "/donation" },
];

export default function Footer() {
  return (
    <footer className="border-t bg-zinc-50">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="grid gap-8 md:grid-cols-4">
          <div>
            <div className="text-sm font-semibold">Bethel Renewal Center</div>
            <div className="text-xs text-zinc-500">伯特利更新中心</div>
            <p className="mt-3 text-sm text-zinc-600">
              我们是一间以基督为中心、以祷告为根、以宣教为使命的教会。
            </p>
            <div className="mt-4 text-sm text-zinc-600">
              <div>Lake Hiawatha, NJ</div>
              <div>info@brc.org</div>
              <div>(973) 000-0000</div>
            </div>
          </div>
          <div className="text-sm text-zinc-700">
            <div className="font-medium text-zinc-900">聚会信息</div>
            <div className="mt-2">主日聚会：周日 10:30 AM</div>
            <div className="mt-1">地点：Lake Hiawatha, NJ</div>
            <a className="mt-3 inline-flex underline" href="/contact">
              联系我们
            </a>
          </div>
          <div className="text-sm text-zinc-700">
            <div className="font-medium text-zinc-900">快速链接</div>
            <div className="mt-2 flex flex-col gap-2">
              {navItems.map((item) => (
                <a key={item.href} href={item.href} className="hover:text-zinc-900">
                  {item.label}
                </a>
              ))}
            </div>
          </div>
          <div className="text-sm text-zinc-700">
            <div className="font-medium text-zinc-900">订阅更新</div>
            <p className="mt-2 text-zinc-600">获取最新活动与讲道资讯。</p>
            <div className="mt-3 flex gap-2">
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

