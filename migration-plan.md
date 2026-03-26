# BRC 域名迁移计划：bethelrc.org 整合方案

## 当前架构

```
bethelrc.org (Bluehost DNS + Hosting)
├── Document Root: ~/public_html
├── CMS: Joomla（旧站）
├── 邮件: Bluehost Email (info@bethelrc.org 等)
└── 子目录: ~/public_html/home3/bethelrc/NewBRC/
    └── WordPress (headless CMS，WPGraphQL, GiveWP, ACF, CPT)

newbethelrc.org (GoDaddy 域名 → 外部托管到 Bluehost)
├── 指向: ~/public_html/home3/bethelrc/NewBRC
└── 被 Next.js 前端通过 WPGraphQL 调用

Next.js 前端（本地开发中）
├── 调用: https://newbethelrc.org/graphql
└── 计划部署到: Vercel
```

## 目标架构

```
bethelrc.org → Vercel（Next.js 前端，主站）
archive.bethelrc.org → Bluehost ~/public_html（Joomla 旧站归档）
cms.bethelrc.org → Bluehost ~/public_html/home3/bethelrc/NewBRC（WordPress 后端）
邮件: MX 记录继续指向 Bluehost（不受影响）
```

---

## 方案分析与潜在问题

### ✅ 你的方案基本可行，但有以下关键问题需要注意：

### 1. 邮件服务 — 最高优先级风险

你的 bethelrc.org 使用 Bluehost 邮件。当 bethelrc.org 的 A 记录从 Bluehost 改指向 Vercel 时，**MX 记录必须保持指向 Bluehost 邮件服务器**，否则所有邮件会中断。

操作要点：在 DNS 修改时，只改 A 记录和相关 CNAME，**绝对不要动 MX 记录**。

### 2. WordPress 站点 URL 需要做数据库级别的修改

WordPress 把自己的站点 URL 存在数据库 `wp_options` 表里。当域名从 `newbethelrc.org` 改为 `cms.bethelrc.org` 时，仅改 DNS 指向是不够的——WordPress 内部所有绝对 URL（文章内容、媒体文件路径、菜单链接等）都需要替换。

### 3. CORS 配置

当 Next.js 前端（在 Vercel 上的 `bethelrc.org`）请求 WordPress 后端（`cms.bethelrc.org`）时，这是跨域请求。WordPress 端必须配置 CORS headers 来允许 `bethelrc.org` 的请求。

### 4. Next.js 代码中硬编码的旧域名 URL

你的代码中有大量硬编码的旧域名引用，不仅仅是 `.env.local` 里的 GraphQL 端点。这些都需要更新。

### 5. SSL 证书

`archive.bethelrc.org` 和 `cms.bethelrc.org` 都需要独立的 SSL 证书。Bluehost 通常可以通过 cPanel 的 AutoSSL 或 Let's Encrypt 自动生成。

### 6. Bluehost 共享主机限制

需要确认你的 Bluehost 套餐是否支持**多个子域名分别指向不同的 Document Root**。大多数共享主机套餐支持，但需要在 cPanel 中配置。

---

## 详细迁移步骤

### 阶段一：准备工作（迁移前）

#### Step 1: 完整备份

> ⚠️ 在做任何修改之前完成

1. 登录 Bluehost cPanel
2. **备份文件系统**：
   - 下载 `~/public_html` 完整目录（包含 Joomla 和 WordPress）
   - 可以用 cPanel → File Manager → Compress → Download
   - 或使用 SSH：`tar -czf ~/backup-$(date +%Y%m%d).tar.gz ~/public_html`
3. **备份 WordPress 数据库**：
   - cPanel → phpMyAdmin → 选择 WordPress 使用的数据库
   - Export → Quick → Go → 下载 `.sql` 文件
4. **备份 Joomla 数据库**（如果和 WordPress 不是同一个数据库）
5. **记录当前 DNS 设置**：
   - 进入 Bluehost DNS Zone Editor
   - 截图或导出 bethelrc.org 的所有 DNS 记录（A, CNAME, MX, TXT 等）
6. **记录当前 WordPress 设置**：
   - 登录 `newbethelrc.org/wp-admin`
   - Settings → General：记录 WordPress Address 和 Site Address
   - 记录已安装的插件列表和它们的设置

#### Step 2: 在 Bluehost cPanel 创建子域名

1. 登录 Bluehost cPanel
2. 创建子域名 `archive.bethelrc.org`：
   - cPanel → Domains（或 Subdomains）
   - Subdomain: `archive`
   - Domain: `bethelrc.org`
   - Document Root: `public_html`（指向和主站相同的目录）
3. 创建子域名 `cms.bethelrc.org`：
   - Subdomain: `cms`
   - Domain: `bethelrc.org`
   - Document Root: `public_html/home3/bethelrc/NewBRC`
4. 等待子域名生效（通常几分钟到几小时）
5. **验证**：在浏览器中访问 `http://archive.bethelrc.org` 和 `http://cms.bethelrc.org`，确认能访问到正确的站点内容

#### Step 3: 为子域名配置 SSL

1. cPanel → SSL/TLS 或 AutoSSL
2. 为 `archive.bethelrc.org` 生成/安装 SSL 证书
3. 为 `cms.bethelrc.org` 生成/安装 SSL 证书
4. **验证**：用 `https://` 访问两个子域名，确认证书正常
5. 如果 Bluehost AutoSSL 不支持，可以用 cPanel 的 Let's Encrypt 插件，或联系 Bluehost 客服协助

---

### 阶段二：WordPress 迁移到 cms.bethelrc.org

#### Step 4: 修改 WordPress 配置文件

SSH 登录 Bluehost 或通过 cPanel File Manager 编辑：

**文件：`~/public_html/home3/bethelrc/NewBRC/wp-config.php`**

在 `/* That's all, stop editing! */` 之前添加：

```php
define('WP_HOME', 'https://cms.bethelrc.org');
define('WP_SITEURL', 'https://cms.bethelrc.org');
```

#### Step 5: WordPress 数据库 URL 全局替换

> ⚠️ 这一步非常关键。WordPress 数据库中有大量序列化数据，普通的 SQL REPLACE 会破坏序列化格式。必须使用专用工具。

**推荐方案 A：使用 WP-CLI（如果 Bluehost 支持 SSH）**

```bash
cd ~/public_html/home3/bethelrc/NewBRC
wp search-replace 'https://newbethelrc.org' 'https://cms.bethelrc.org' --all-tables
wp search-replace 'http://newbethelrc.org' 'https://cms.bethelrc.org' --all-tables
wp search-replace '//newbethelrc.org' '//cms.bethelrc.org' --all-tables
```

**推荐方案 B：使用 Better Search Replace 插件**

1. 登录 `newbethelrc.org/wp-admin`（在 DNS 修改前做这一步！）
2. Plugins → Add New → 搜索 "Better Search Replace" → 安装并激活
3. Tools → Better Search Replace：
   - Search for: `https://newbethelrc.org`
   - Replace with: `https://cms.bethelrc.org`
   - 选择所有数据库表
   - ❗ 先勾选 "Run as dry run" 测试一次，确认替换数量合理
   - 然后取消勾选执行真正的替换
4. 重复以上步骤处理 `http://newbethelrc.org` 的情况

#### Step 6: 刷新 WordPress 缓存和固定链接

1. 通过 `cms.bethelrc.org/wp-admin` 登录 WordPress 后台
2. Settings → Permalinks → 不做任何修改，直接点 "Save Changes"（这会刷新 `.htaccess` 重写规则）
3. 如果安装了缓存插件，清除所有缓存
4. **验证**：
   - 访问 `https://cms.bethelrc.org/wp-admin` 能正常登录
   - 访问 `https://cms.bethelrc.org/graphql` 能看到 GraphQL 响应
   - 检查媒体库中的图片 URL 是否已更新为 `cms.bethelrc.org`

#### Step 7: 配置 WordPress CORS

在 WordPress 的 `functions.php` 或创建一个自定义插件，添加 CORS headers：

**文件：`~/public_html/home3/bethelrc/NewBRC/wp-content/themes/你的主题/functions.php`**

或者更好的方式是创建一个 mu-plugin：

**文件：`~/public_html/home3/bethelrc/NewBRC/wp-content/mu-plugins/cors-headers.php`**

```php
<?php
/**
 * Plugin Name: CORS Headers for Headless WordPress
 * Description: Allow cross-origin requests from the Next.js frontend
 */

add_action('init', function() {
    $allowed_origins = [
        'https://bethelrc.org',
        'https://www.bethelrc.org',
        'http://localhost:3000',  // 本地开发用
    ];

    $origin = isset($_SERVER['HTTP_ORIGIN']) ? $_SERVER['HTTP_ORIGIN'] : '';

    if (in_array($origin, $allowed_origins)) {
        header("Access-Control-Allow-Origin: $origin");
        header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
        header("Access-Control-Allow-Headers: Content-Type, Authorization");
        header("Access-Control-Allow-Credentials: true");
    }

    if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
        http_response_code(204);
        exit;
    }
});
```

#### Step 8: 更新 WordPress .htaccess（如需要）

检查 `~/public_html/home3/bethelrc/NewBRC/.htaccess`，确保它的重写规则没有硬编码旧域名。如果有，手动替换。

---

### 阶段三：更新 Next.js 前端代码

#### Step 9: 更新环境变量

**文件：`.env.local`**

```
WP_GRAPHQL_URL=https://cms.bethelrc.org/graphql
WP_GRAPHQL_TIMEOUT_MS=8000
WP_GRAPHQL_RETRY_COUNT=1
WP_GRAPHQL_RETRY_BACKOFF_MS=300
SITE_URL=https://bethelrc.org
```

#### Step 10: 更新 next.config.ts

将 `images.remotePatterns` 更新为包含 `cms.bethelrc.org`：

```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cms.bethelrc.org",
      },
      {
        protocol: "https",
        hostname: "bethelrc.org",
      },
      {
        protocol: "https",
        hostname: "www.bethelrc.org",
      },
      {
        protocol: "https",
        hostname: "archive.bethelrc.org",
      },
      {
        protocol: "https",
        hostname: "**.wp.com",
      },
    ],
  },
};

export default nextConfig;
```

#### Step 11: 更新代码中所有硬编码的旧域名

以下是需要修改的完整文件列表：

| 文件 | 修改内容 |
|------|---------|
| `src/lib/donation/links.ts` | `newbethelrc.org/donation-*` → `cms.bethelrc.org/donation-*` |
| `src/lib/discipleship.ts` | 所有 `newbethelrc.org/...` → `cms.bethelrc.org/...` |
| `src/content/calendar/events.ts` | `registrationUrl: "https://newbethelrc.org"` → 适当的新 URL |
| `src/content/prayer/links.ts` | `www.bethelrc.org/images/...` → `archive.bethelrc.org/images/...` |
| `src/content/prayer/links.ts` | `bethelrc.org/index.php/...` → `archive.bethelrc.org/index.php/...` |
| `src/data/ministryArchive.json` | 所有 `www.bethelrc.org/...` → `archive.bethelrc.org/...` |
| `src/components/HomeContactForm.tsx` | `info@bethelrc.org` — 邮件地址不变，无需修改 |
| `tests/refactor-guardrails.test.ts` | 更新测试中的断言 URL |

**关于 `ministryArchive.json` 和 prayer links 的特别说明：**
这些链接指向旧的 Joomla 站点内容（图片和页面）。因为旧站会移到 `archive.bethelrc.org`，所以这些 URL 的域名部分应该改为 `archive.bethelrc.org`。

**关于 donation links 和 discipleship links 的说明：**
这些指向 WordPress 上的页面。如果这些是 WordPress 渲染的前端页面（非 API），你需要决定：
- 方案 A：让这些页面通过 `cms.bethelrc.org` 访问（简单，但用户会看到 "cms" 子域名）
- 方案 B：在 Next.js 前端重新实现这些页面（更好的用户体验，但需要开发时间）
- 方案 C：在 Vercel 上设置 URL rewrite，把 `bethelrc.org/donation-*` 代理到 `cms.bethelrc.org/donation-*`（用户看不到 cms 子域名）

**推荐方案 C**，在 `next.config.ts` 中添加 rewrites：

```typescript
const nextConfig: NextConfig = {
  // ... images config ...
  async rewrites() {
    return [
      {
        source: '/donation-zh',
        destination: 'https://cms.bethelrc.org/donation-zh/',
      },
      {
        source: '/donation-en',
        destination: 'https://cms.bethelrc.org/donation-en/',
      },
      // 根据需要添加更多...
    ];
  },
};
```

#### Step 12: 在 Vercel 上配置项目

1. 登录 [vercel.com](https://vercel.com)
2. Import 你的 Git 仓库（GitHub/GitLab/Bitbucket）
3. 配置环境变量：
   - `WP_GRAPHQL_URL` = `https://cms.bethelrc.org/graphql`
   - `WP_GRAPHQL_TIMEOUT_MS` = `8000`
   - `WP_GRAPHQL_RETRY_COUNT` = `1`
   - `WP_GRAPHQL_RETRY_BACKOFF_MS` = `300`
   - `SITE_URL` = `https://bethelrc.org`
   - 以及其他你需要的环境变量
4. 部署一次确认构建成功
5. Vercel 会给你一个临时域名（如 `brc-web-xxx.vercel.app`），先用这个测试

---

### 阶段四：DNS 切换

> ⚠️ 这是最关键的一步，建议在低流量时段操作（比如深夜），并提前通知团队成员

#### Step 13: 在 Vercel 添加自定义域名

1. Vercel Dashboard → 你的项目 → Settings → Domains
2. 添加 `bethelrc.org`
3. 添加 `www.bethelrc.org`
4. Vercel 会告诉你需要设置的 DNS 记录（通常是一个 A 记录 `76.76.21.21` 和一个 CNAME）

#### Step 14: 修改 Bluehost DNS 记录

登录 Bluehost → Domains → DNS Zone Editor → bethelrc.org：

1. **先记录/截图所有当前 DNS 记录**

2. **修改 A 记录**：
   - 找到 `bethelrc.org` 的 A 记录
   - 改为 Vercel 提供的 IP（通常是 `76.76.21.21`）

3. **修改/添加 www CNAME**：
   - `www.bethelrc.org` → CNAME → `cname.vercel-dns.com`

4. **确认子域名 DNS（应该在 Step 2 已自动创建）**：
   - `archive.bethelrc.org` → A 记录 → Bluehost 服务器 IP
   - `cms.bethelrc.org` → A 记录 → Bluehost 服务器 IP

5. **⚠️ 确认 MX 记录没有被修改！**
   - MX 记录应该仍然指向 Bluehost 邮件服务器
   - 通常是类似 `mail.bethelrc.org` 或 Bluehost 的邮件服务器地址
   - 绝对不要删除或修改 MX 记录

6. **保留 SPF、DKIM、DMARC 等邮件相关 TXT 记录**

#### Step 15: 等待 DNS 传播并验证

DNS 传播通常需要几分钟到 48 小时。

验证清单：
- [ ] `bethelrc.org` 能访问到 Vercel 上的 Next.js 站点
- [ ] `www.bethelrc.org` 能访问并正确重定向
- [ ] `archive.bethelrc.org` 能访问到旧的 Joomla 站点
- [ ] `cms.bethelrc.org` 能访问到 WordPress
- [ ] `cms.bethelrc.org/wp-admin` 能正常登录
- [ ] `cms.bethelrc.org/graphql` 返回正确的 GraphQL 响应
- [ ] 发送测试邮件到 `info@bethelrc.org`，确认能正常收到
- [ ] 从 `info@bethelrc.org` 发送测试邮件，确认能正常发出
- [ ] Next.js 站点的 GraphQL 数据正常加载
- [ ] Next.js 站点的图片正常显示
- [ ] GiveWP 捐款功能正常工作

可以使用以下工具检查 DNS 传播状态：
- https://dnschecker.org
- https://www.whatsmydns.net
- 命令行：`dig bethelrc.org`、`dig archive.bethelrc.org`、`dig cms.bethelrc.org`、`dig bethelrc.org MX`

---

### 阶段五：清理和善后

#### Step 16: 处理 newbethelrc.org 域名

你说可以直接关掉，但建议：

1. 在 GoDaddy 上，让 `newbethelrc.org` 到期时不续费即可
2. 如果想立即停用，在 GoDaddy 的 DNS 设置中把 A 记录移除
3. 如果域名还没到期，可以设置一个简单的 301 重定向作为保险（以防有外部链接引用了旧域名）

#### Step 17: 更新外部服务

检查并更新所有引用旧域名的外部服务：

- [ ] Google Search Console：添加 `bethelrc.org`，提交新站点地图
- [ ] Google Analytics / Google Tag Manager：更新站点 URL
- [ ] 社交媒体账号上的网站链接
- [ ] Google My Business（如果有）
- [ ] 任何第三方集成（邮件营销、表单服务等）
- [ ] GiveWP 的支付网关设置（PayPal、Stripe 等回调 URL）
- [ ] 任何引用 newbethelrc.org 的印刷材料或外部文档

#### Step 18: 配置 Joomla 归档站点安全措施

旧 Joomla 站点作为归档只需要只读访问：

1. 考虑禁用 Joomla 管理后台登录（或设置非常强的密码）
2. 在 `archive.bethelrc.org` 的 `.htaccess` 中禁止访问 `/administrator`：
   ```apache
   <Directory "administrator">
       Order Deny,Allow
       Deny from all
   </Directory>
   ```
   或在 `.htaccess` 中：
   ```apache
   RewriteRule ^administrator/ - [F,L]
   ```
3. 确保 Joomla 及其插件更新到最新版本以防安全漏洞

---

## 操作顺序总结

```
1. 备份一切 ──────────────────────────────────── [阶段一]
2. 在 cPanel 创建子域名 archive + cms
3. 为子域名配置 SSL
4. ─── 修改 wp-config.php ─────────────────────── [阶段二]
5. ─── WordPress 数据库搜索替换
6. ─── 刷新 WordPress 缓存/固定链接
7. ─── 配置 WordPress CORS
8. ─── 检查 .htaccess
9. ─── 更新 Next.js 环境变量 ──────────────────── [阶段三]
10. ── 更新 next.config.ts
11. ── 更新所有硬编码 URL
12. ── Vercel 项目配置 + 部署测试
13. ── Vercel 添加自定义域名 ──────────────────── [阶段四]
14. ── 修改 Bluehost DNS（⚠️ 保留 MX 记录）
15. ── 等待 DNS 传播 + 全面验证
16. ── 处理 newbethelrc.org ───────────────────── [阶段五]
17. ── 更新外部服务
18. ── Joomla 归档安全加固
```

## 预计时间

- 阶段一（准备）：1-2 小时
- 阶段二（WordPress 迁移）：2-3 小时
- 阶段三（Next.js 更新）：1-2 小时
- 阶段四（DNS 切换）：30 分钟操作 + 最多 48 小时传播
- 阶段五（清理）：1-2 小时

**总计：约 1 个工作日（不含 DNS 传播等待时间）**

## 回滚方案

如果迁移出现严重问题：

1. **DNS 回滚**：将 bethelrc.org 的 A 记录改回 Bluehost 原始 IP
2. **WordPress 回滚**：恢复备份的数据库和 wp-config.php
3. **Next.js 回滚**：将环境变量改回 `newbethelrc.org`
4. 等待 DNS 传播回来

确保在整个迁移过程中保留所有备份文件直到新架构稳定运行至少 2 周。
