# BRC 首页 UI 设计指南
**版本** v1.0 · **主色调** Warm Espresso 暖咖啡棕 · **平台定位** 教会资源平台（非单一教会）

---

## 目录

1. [设计原则](#1-设计原则)
2. [色彩系统](#2-色彩系统)
3. [字体系统](#3-字体系统)
4. [Header 导航栏](#4-header-导航栏)
5. [Hero 视频区](#5-hero-视频区)
6. [Section 节奏与布局](#6-section-节奏与布局)
7. [数据展示区（Stats）](#7-数据展示区stats)
8. [与神对齐（AlignWithGod）](#8-与神对齐alignwithgod)
9. [50/50 分栏 Section](#9-5050-分栏-section)
10. [Ministry 轮播](#10-ministry-轮播)
11. [Events & Trainings 卡片](#11-events--trainings-卡片)
12. [Donation · Contact · Footer](#12-donation--contact--footer)
13. [文字排版细节](#13-文字排版细节)
14. [已移除的设计元素](#14-已移除的设计元素)
15. [待完成 / 延伸优化](#15-待完成--延伸优化)

---

## 1. 设计原则

| 原则 | 说明 |
|------|------|
| **温暖 · 有温度** | 拒绝冷灰、夜间模式感，整体偏暖奶油调 |
| **节奏感** | 浅色 → 中间过渡色 → 深色 → 浅色，形成视觉呼吸 |
| **统一的设计语言** | 卡片圆角、字体、间距保持全站一致 |
| **平台感** | BRC 是跨文化跨世代的教会资源平台，设计应体现包容与宏观视野，非单一教会品牌 |
| **品牌辨识度** | Lora 衬线字体 + 暖金 accent 色是核心品牌视觉锚点 |

---

## 2. 色彩系统

### 2.1 主配色方案：Warm Espresso 暖咖啡棕

> 🎯 **目标效果**：整页呈现温暖、有深度的咖啡棕调性，既有专业感又有温馨的教会氛围。

#### 背景色层级

```
浅层（主背景）  #fdf8f2   奶油白——大多数 section 背景
中浅层         #faf6f0   略暖——交替 section 形成微差
过渡层（Stats）#7a4825   中棕——在深色区前做视觉过渡
深色层（主题）  #3b2212   深咖啡棕——与神对齐，页面核心视觉锚点
```

#### Accent 色

```
主 accent     #b45309   琥珀棕——链接、CTA 按钮、强调元素
辅助 accent   #c4956a   中琥珀——装饰线、副标签
亮金          #f4c87a   深色区数字/标题高亮
暖奶白        #f0e0c8   深色区正文标题
```

#### 文字色

```
主标题        #1c1a17
正文          #57534e
辅助文字      #9a7a5a
深色区正文    #c4956a（经文、副标签）
深色区标题    #f0e0c8
深色区数字    #f4c87a
```

#### 功能色（浅色区分割线/边框）

```
边框          #e8d8c4
深色区边框    rgba(196,149,106,.3)
深色区分隔   rgba(255,220,160,.2)
```

---

### 2.2 备选配色方案

可通过顶部工具栏一键切换，供设计评审对比：

#### 方案 B：Deep Navy 深海蓝

| 用途 | 色值 |
|------|------|
| 列背景 | `#f5f8ff` |
| Stats 过渡 | `#1e3a6b` |
| AlignWithGod 深色 | `#0d1f40` |
| Accent | `#2563eb` |
| 深色区高亮 | `#bfdbfe` |

#### 方案 C：Forest Green 深林绿

| 用途 | 色值 |
|------|------|
| 列背景 | `#f4f8f5` |
| Stats 过渡 | `#2d5a3d` |
| AlignWithGod 深色 | `#162e1e` |
| Accent | `#16a34a` |
| 深色区高亮 | `#bbf7d0` |

---

## 3. 字体系统

> 🎯 **目标效果**：中英文混排时有庄重的质感；衬线字体赋予宗教内容仪式感，无衬线保持 UI 清晰可读。

### 字体分工

| 用途 | 字体 | 说明 |
|------|------|------|
| 大标题 / 数字 | `Lora` (serif) | 衬线体，品牌辨识度高 |
| 繁体中文正文 | `Noto Serif TC` | 有温度的中文衬线 |
| UI / 导航 / 标签 | `Inter` | 无衬线，清晰紧凑 |
| Fallback | `Georgia`, `serif` | 广泛兼容 |

### 字重规范

```
标题大字      font-weight: 700  (Bold)
副标题        font-weight: 600  (SemiBold)
正文          font-weight: 400  (Regular)
小标签        font-weight: 500  (Medium)
```

### 行距规范

```
标题          line-height: 1.2–1.3
正文段落      line-height: 1.7–1.8
经文引用      line-height: 1.6–1.75（italic）
```

---

## 4. Header 导航栏

> 🎯 **目标效果**：Header 透明覆盖在 Hero 视频上，随页面滚动渐变为实底；品牌感强且不遮挡内容。

### 行为规范

| 状态 | 效果 |
|------|------|
| 初始（Hero 区域）| `background: transparent`，logo 文字白色 |
| 滚动超过 460px | 平滑过渡为实底，加边框阴影 |
| 动画 | `transition: background .35s ease, border-color .35s ease` |

### Warm Espresso 方案 Header 色值

```css
/* 滚动后 */
background: rgba(253,248,242,.97)   /* 97% 不透明暖白 */
border-bottom: 1px solid #e0d0bc
logo 文字: #2c1a0e
```

### 实现要点

- Header `position: sticky; top: 88px`（在 shell-nav + col-header 下方）
- Hero section 用 `margin-top: -52px` 上移，使视频滑入 Header 下方
- JS scroll listener 在 `scrollY > 460` 时加 `.scrolled` class

---

## 5. Hero 视频区

> 🎯 **目标效果**：全屏视频背景，内容居中叠加，有渐变遮罩层次感；桌面端饱满大气。

### 结构层级（z-index）

```
z-index: 0  <video>        视频层，object-fit: cover
z-index: 1  .overlay       渐变遮罩（to bottom right，半透明深色）
z-index: 2  .content       标题 + CTA 内容层
```

### 关键参数

```css
height: 540px
video: object-position: center 35%   /* 垂直偏上取景 */
overlay: linear-gradient(to bottom, rgba(0,0,0,.55), rgba(0,0,0,.35))
poster: 视频封面图（避免加载空白）
```

### After 版本改进点

- 渐变方向统一为 `to bottom`（原版 `to-br` 斜角不一致）
- 添加品牌副标题（平台定位语）
- 加入 CTA 按钮（了解更多 / 联系我们）
- 字体从 Arial 升级为 Lora

---

## 6. Section 节奏与布局

> 🎯 **目标效果**：页面有清晰的深浅节奏，让用户感受到内容层次，不会视觉疲劳。

### 色彩节奏（从上到下）

```
Hero           深色视频背景
──────────────────────────
使命 Mission   浅色 #fdf8f2（图文 50/50）
异象 Vision    浅色 #faf6f0（微差，图片反向）
──────────────────────────
数据 Stats     中棕 #7a4825 ← 过渡层，铺垫深色
与神对齐        深棕 #3b2212 ← 页面视觉锚点
──────────────────────────
禱告室          浅色（深→浅 节奏断点）
事工轮播        微深 #faf6f0
活动/培训       浅色
──────────────────────────
奉献 Donation  暖浅 #fef3e2
联系/Footer    暖浅 #f5ede0 / #ede5d8
```

### Section 间距

- Section 间**无分隔线**（移除了 `sec-sep`），靠背景色差形成自然分隔
- 各 section 自带 `padding`，保证内容呼吸感

---

## 7. 数据展示区（Stats）

> 🎯 **目标效果**：数字有力量感、仪式感；作为深色大区块前的「过渡层」，避免从浅色直接跳深色的突兀感。

### 设计规范

```css
background: #7a4825    /* 中棕过渡色 */
layout: 4列等宽 grid
```

| 元素 | 字体 | 大小 | 颜色 |
|------|------|------|------|
| 数字（val）| Lora serif | 30px Bold | `#fde9b8` 暖金 |
| 标签（lbl）| Inter | 10px Medium | `#e0b990` 琥珀 |
| 分隔线 | — | 1px | `rgba(255,220,160,.2)` |

### Before 版本问题

- 桌面 `bg-zinc-900`，移动 `bg-[#171321]`——两套不一致的深色
- Arial 数字缺乏仪式感

---

## 8. 与神对齐（AlignWithGod）

> 🎯 **目标效果**：页面视觉焦点；深色背景强调神圣感，金色数字 + 经文引用传递敬虔氛围；7个目标完整呈现，布局整齐有序。

### 背景

```css
background: #3b2212   /* 深咖啡棕 */
padding: 26px 24px
```

### 4列网格布局（2行）

```
第1行：[ 标题格：與神對齊 ] [ 目標 01 ] [ 目標 02 ] [ 目標 03 ]
第2行：[ 目標 04 ]          [ 目標 05 ] [ 目標 06 ] [ 目標 07 ]
```

> ⚠️ 必须展示全部 **7个目标**，不可截断。

### 目标卡片规范

```css
background: rgba(255,255,255,.07)   /* 透明玻璃感 */
border: 1px solid rgba(196,149,106,.3)
border-radius: 8px
padding: 14px 12px
```

| 元素 | 字体 | 大小 | 颜色 |
|------|------|------|------|
| 编号（01–07）| Lora | 20px Bold | `#f4c87a` 暖金 |
| 目标标题 | Noto Serif TC | 13px SemiBold | `#f0e0c8` 奶白 |
| 经文引用 | Noto Serif TC | 11px Italic | `#c4956a` 琥珀 |
| 圣经出处 | Inter | 10px | `#a07850` 暗琥珀 |
| 经文竖线 | — | 2px | `#c4956a` |

### 2026 年 7 个目标

| 编号 | 标题 | 圣经出处 |
|------|------|---------|
| 01 | 先對齊神的國與義 | 馬太福音 6:33 |
| 02 | 將道路交託給主 | 箴言 3:5–6 |
| 03 | 心意更新而變化 | 羅馬書 12:2 |
| 04 | 神親自引導前路 | 詩篇 37:23 |
| 05 | 順服帶來祝福 | 申命記 28:1–2 |
| 06 | 不是照自己意思 | 路加福音 22:42 |
| 07 | 主是我們人生的準繩 | 詩篇 127:1 |

---

## 9. 50/50 分栏 Section

> 🎯 **目标效果**：图文各半，交替图片左右方向，增加节奏感；文字区有温度，避免冷灰感。

### 应用 Section：使命 / 异象 / 禱告室

### 规范

| 项目 | 规范 |
|------|------|
| 比例 | 图片 50% / 文字 50% |
| 图片位置 | 使命：左；异象：右；禱告室：左（交替） |
| 文字区背景 | `var(--sec-a)` 随配色方案变化 |
| 图片过渡 | 文字侧加微渐变遮罩，避免硬切 |
| 标题字体 | Lora 22–26px Bold |
| 正文字体 | Noto Serif TC / Inter 12px，line-height 1.7–1.8 |
| CTA 链接 | `color: var(--accent)`，带下划线，`font-weight: 600` |

### Before 版本问题

- 背景 zinc-50 / white 颜色相近但不一致，视觉模糊
- 字体 Arial，无品牌感
- 无 CTA 引导

---

## 10. Ministry 轮播

> 🎯 **目标效果**：全出血大图，有品牌感的左侧金色竖线，进度条式导航替代圆点导航。

### 规范

```css
height: 260px
overflow: hidden
border-radius: 0   /* 全出血，无圆角 */
```

| 元素 | 规范 |
|------|------|
| 标题 | Lora 22px Bold，`var(--heading)` |
| 遮罩 | `linear-gradient(to top, rgba(0,0,0,.78) 0%, transparent 100%)` |
| 左侧品牌线 | 3px 渐变竖线，`var(--accent-line)` |
| 轮播导航 | 进度条式（非圆点），与品牌色一致 |
| 卡片标题 | Lora 白色，阴影增强可读性 |

---

## 11. Events & Trainings 卡片

> 🎯 **目标效果**：两个 section 视觉语言统一——同款 rounded-2xl 卡片，避免前版本图片形式不一致的问题。

### 核心修复

**Before 版本核心问题**：Events 用 `rounded-2xl` 卡片，Trainings 用裸露方形图——同页面两种完全不同的处理方式。

**After 版本**：统一使用 `rounded-2xl` 卡片容器。

### 卡片规范

```css
border-radius: 16px   /* rounded-2xl */
overflow: hidden       /* 自动裁切图片顶部，无需单独处理 */
```

| 元素 | 规范 |
|------|------|
| 图片区 | 上方，`object-fit: cover` |
| 内容区背景 | `var(--sec-a)` |
| Category eyebrow | Inter 9px uppercase，`var(--accent)` |
| 卡片标题 | Lora，`var(--heading)` |
| CTA | `var(--accent)` 色，下划线或箭头 |
| Events 背景 | `var(--sec-a)` 白色调 |
| Trainings 背景 | `var(--sec-b)` 微暖灰，与 Events 形成微差 |

---

## 12. Donation · Contact · Footer

> 🎯 **目标效果**：页面末段统一暖色调收尾，有仪式感；奉献区庄重但不沉重。

### 色彩

| Section | 背景（Espresso） | 备注 |
|---------|----------------|------|
| Donation | `#fef3e2` | 温暖浅琥珀 |
| Contact | `#f5ede0` | 略深一阶 |
| Footer | `#ede5d8` | 最深一阶，自然收尾 |

### Donation 规范

- 桌面/移动统一背景（Before 版本桌面 zinc-900 / 移动紫色渐变——完全不一致）
- 加入经文引用，增加温度感
- 居中排版，Lora 大标题
- 主 CTA 按钮用 `var(--accent)`

### Footer 规范

- 品牌名 `color: var(--footer-text)`，随配色方案变化
- 字体 Lora / Inter 组合
- 无深色底（与 Before 版本对比鲜明）

---

## 13. 文字排版细节

> 🎯 **目标效果**：段落换行自然优雅，不出现孤字（最后一行只有一两个字）的情况。

### CSS text-wrap 规范

```css
/* 所有标题 */
h1, h2, h3, h4, h5, h6 {
  text-wrap: balance;   /* 平衡各行字数，适合短标题 */
}

/* 正文段落 */
p, li, blockquote {
  text-wrap: pretty;    /* 防止最后一行孤字换行 */
}
```

> 浏览器支持：`balance` Chrome 114+、Firefox 121+；`pretty` Chrome 117+

### 字号规范（After 版本）

| 层级 | 字号 | 用途 |
|------|------|------|
| Display | 30–36px | Hero 主标题 |
| H2 | 22–26px | Section 主标题 |
| H3 | 16–18px | 卡片标题 |
| Body | 12–14px | 正文 |
| Caption | 9–11px | 标签、注释 |

---

## 14. 已移除的设计元素

以下元素在 After 版本中已移除：

| 元素 | 原因 |
|------|------|
| **Eyebrow 副标签**（如「Mission · 使命」） | 与 Section 标题重复，视觉冗余 |
| **Section 分隔线**（`.sec-sep`） | 靠背景色差已能自然区分，分隔线显得多余且在深浅色交接处变成突兀白线 |
| **Section 调试标签**（`.sec-tag`） | 仅为开发调试用，正式设计不展示 |
| **Section 内嵌导航**（Hero 内 nav） | 已由顶部 sticky header 替代 |
| **所有深色/黑色背景**（除 Stats + AlignWithGod 以外） | 放弃全站深色避免夜间模式感 |

---

## 15. 待完成 / 延伸优化

> 以下为本次评审后识别的后续优化方向：

### 高优先级

- [ ] **移动端适配**：所有 section 在 375px 宽度下的布局适配（特别是 AlignWithGod 4列网格）
- [ ] **Header 移动端**：hamburger 菜单样式统一
- [ ] **配色方案确认**：从 Espresso / Navy / Forest 三套中选定最终方案
- [ ] **Donation CTA 按钮样式**：确认圆角值和 hover 状态

### 中优先级

- [ ] **事工页轮播**：真实轮播交互（左右滑动 / 自动播放）
- [ ] **卡片 hover 状态**：Events / Trainings 卡片悬停效果
- [ ] **Hero CTA 按钮**：样式确认（填充式 vs 描边式）
- [ ] **载入动画**：Section 出现时的 fade-in / slide-up 效果

### 低优先级（锦上添花）

- [ ] **Dark mode**：如未来需要支持，基于现有 CSS 变量系统可较快实现
- [ ] **语言切换**（繁/简/英）样式影响评估
- [ ] **Prayer Room 预约流程**：弹窗 vs 跳转页面

---

## 附：设计决策记录

| 决策 | 选择 | 原因 |
|------|------|------|
| 深色 section 颜色 | 深咖啡棕 `#3b2212`（非黑色） | 有深度同时保持温暖感 |
| Stats 背景 | 中棕 `#7a4825` | 作为浅色→深色的过渡层，避免突兀跳跃 |
| 分隔线 | 移除 | 深浅色交界处线条显白，影响观感 |
| AlignWithGod 布局 | 4列 × 2行（标题格+7目标）| 完整展示所有内容，网格整齐对称 |
| 字体组合 | Lora + Noto Serif TC + Inter | 衬线体增仪式感，无衬线保 UI 清晰 |
| 配色系统 | CSS 变量 + data-scheme 切换 | 方便多方案对比评审，后期易于维护 |

---

*由 Claude Cowork 协助生成 · BRC 设计评审用*
