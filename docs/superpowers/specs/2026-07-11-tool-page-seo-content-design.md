# 工具页服务端可爬内容（试点：stardew-fish）— 设计文档

日期：2026-07-11
状态：已通过设计评审，待写实现计划

## 背景与动机

工具页现在服务端只渲染 H1 + 一段介绍 + 交互组件 + 页脚链接；**所有真实数据（鱼名/季节/地点/时间/天气/价格）都锁在客户端组件的 JS 里，爬虫和 LLM 一条都看不到。** 这违背项目铁律「每件事都要同时满足用户需求和 SEO/GEO 适配」（见记忆 feedback_user_needs_and_geo_mandate）：工具本身满足用户需求，但数据不可爬 = SEO/GEO 侧缺失，等于流量入口不存在。

本设计给工具页补上 H1 之下缺失的**可爬实体**：把结构化数据渲染成语义化 HTML 表 + 可摘录摘要 + FAQ + FAQPage schema。交互工具本体不动——可爬内容是**补充**工具、并让页面可被发现/被引用，不是替代工具。

## 目标（本轮范围）

以 **stardew-fish** 为试点，搭出可复用骨架并落地：

- 服务端渲染 `<FishReferenceTable>`：全部 rod-caught 鱼的语义化 `<table>`，随页面语言本地化（数据已含 6 语言名）。
- 服务端渲染摘要：一段带具体事实、可被 LLM 直接摘录的结论句，**6 语言全覆盖**（模板 + 从数据计算的事实）。
- FAQ 区块：**EN + ZH 手写** 4 条命中真实搜索/问答意图的问答；注入 FAQPage JSON-LD（复用现有 `faqSchema`）。
- 可复用骨架 `<ToolReference>`：统一「区块外壳（H2 标题 + 摘要）+ FAQ + schema 注入」，表格作为 children 传入，供后续工具复制。

页面标题层级：一个 H1（工具名，已有）+ 多个 H2（数据表、FAQ），标准 SEO 结构。

## 非目标（明确排除）

- 修改交互组件 `StardewFishFinder` 或工具计算逻辑。
- 其他工具（gifts/cooking/bundles/museum/villagers）——本轮只做 fish 试点跑通骨架，后续按同一骨架逐个复制（各是「填数据映射 + 写 FAQ」的复制活）。
- ja/ko/de/zh-TW 的 FAQ 文案（本轮 FAQ 只做 en + zh；这些 locale 的**摘要+表仍 6 语言全覆盖**，仅 FAQ 区块暂不渲染）。zh-TW 的 Traditional FAQ 作为紧跟的 fast-follow。
- ItemList/Dataset schema（语义 HTML 表已足够被 LLM 读取；避免 schema 冗余，留作后续可选）。
- 计算器（hay-day/stardew）与洒水器等非「静态数据表」类工具。

## 关键事实（来自代码勘查）

- 页面路由 `src/app/[locale]/tools/stardew-fish/page.tsx` 是 **async server component**；内含 `getLoc(locale, zh, en, zhTW?, ja?, ko?, de?)` 内联本地化 helper 与 6 语言 metadata。
- 数据模块 `src/components/tools/stardewFishData.ts`（服务端可 import）：
  - `export const FISH: Fish[]`，`Fish = { key; name: FishLoc; price; seasons: Season[]; locations: string[]; weather: 'any'|'sun'|'rain'; time: string; anytime: boolean }`
  - `export const FISH_LOCATIONS: { key; label: FishLoc }[]`（location key → 6 语言标签）
  - `FishLoc = { en; zh; zhTW; ja; ko; de }`；`Season = 'spring'|'summer'|'fall'|'winter'`
- 现有 `faqSchema(faqs: { question: string; answer: string }[])` 在 `src/lib/structured-data.ts:147`，文章页已用它注入 `<script type="application/ld+json">`。
- 配色深绿农场主题：`#0f1a0f` / `#1a2e1a` / `#2d3d2d` 边框 / `#f0a832` 强调 / `#e8dcc8` 文字 / `#8a9a7a` 弱化。

## 架构

采用「可复用服务端骨架 + 每工具内容模块」。骨架处理各工具**统一**的部分（区块外壳 + FAQ + schema）；表格与内容数据是**每工具特定**的。全部服务端渲染（无 `'use client'`），确保静态生成时输出到 HTML。

### ① 骨架 `src/components/tools/seo/ToolReference.tsx`（server component）

```tsx
interface Faq { q: string; a: string }
interface ToolReferenceProps {
  locale: string
  tableTitle: string      // H2 标题，如「完整鱼类列表」
  summary: string         // 已本地化的摘要段
  faqs: Faq[]             // 已按 locale 选好；空数组 = 不渲染 FAQ 区块与 schema
  children: React.ReactNode // 表格
}
```
渲染：
- `<section>` + `<h2>{tableTitle}</h2>` + `<p>{summary}</p>` + `{children}`（表格）。
- `faqs.length > 0` 时：`<h2>FAQ 本地化标题</h2>` + FAQ 列表，并注入 `faqSchema(faqs.map(f => ({ question: f.q, answer: f.a })))` 的 `<script type="application/ld+json">`。
- FAQ 标题沿用文章页的 6 语言写法（常见问题 / FAQ …）。

### ② 表格 `src/components/tools/seo/FishReferenceTable.tsx`（server component）

- 从 `FISH` 渲染语义化 `<table>`，含 `<caption>`（如「Stardew Valley 全部可钓鱼」）、`<thead>` 列头：鱼名 / 季节 / 地点 / 时间 / 天气 / 售价(g)。
- 每行按 `locale` 取 `fish.name`、季节标签、`FISH_LOCATIONS` 地点标签、天气标签（sun/rain/any → 本地化）；`time`/`price` 直出。
- 列头与季节/天气/地点标签用一份 6 语言标签映射（本文件内）。
- 移动端：`<div className="overflow-x-auto">` 包裹，表格横向滚动，不撑破页面。

### ③ 内容数据 `src/lib/tools/seo/fishSeoContent.ts`（纯函数 + 数据）

```ts
function fishSummary(locale: string): string
  // 6 语言模板，注入从 FISH 计算的事实：
  //   总数 = FISH.length
  //   最高价鱼 = FISH 里 price 最大者的本地化名 + 价格
  //   春季可钓数 = seasons 含 'spring' 的数量
  // 未知 locale 回退 en。

const FISH_FAQS: { en: Faq[]; zh: Faq[] }   // 各 4 条，手写
function getFishFaqs(locale: string): Faq[]
  // locale === 'en' → FISH_FAQS.en；locale === 'zh' → FISH_FAQS.zh；其余 → []
```

FAQ 问题（EN，ZH 对应翻译；答案手写、可引用数据但为散文）：
1. What is the most valuable fish in Stardew Valley?（最值钱的鱼）
2. What fish can I catch in spring in Stardew Valley?（春季能钓什么）
3. Which fish can only be caught when it's raining?（下雨限定：Catfish/Walleye/Eel/Red Snapper/Shad 等，weather==='rain'）
4. What are the best early-game fish for profit?（新手性价比）

FAQ 只回答表格不直接呈现的**判断类**问题（最值钱/最适合新手/下雨限定），不复述表格数据，避免重复。

### ④ 页面接入 `src/app/[locale]/tools/stardew-fish/page.tsx`

在 `<StardewFishFinder locale={locale} />` 之后、相关工具页脚之前插入：
```tsx
<ToolReference
  locale={locale}
  tableTitle={getLoc(locale, '完整鱼类列表', 'Complete Fish List', …6语言)}
  summary={fishSummary(locale)}
  faqs={getFishFaqs(locale)}
>
  <FishReferenceTable locale={locale} />
</ToolReference>
```

## 数据流

```
stardewFishData.ts (FISH, FISH_LOCATIONS)  [服务端模块]
  ├─ FishReferenceTable(locale)  → 语义化 <table>（全部鱼，本地化）
  └─ fishSummary(locale)         → 可摘录摘要段（数据计算 + 模板）
fishSeoContent.getFishFaqs(locale) → EN/ZH FAQ（其余 []）
   → <ToolReference locale tableTitle summary faqs>{<FishReferenceTable/>}</ToolReference>
      ├─ H2 + 摘要 + 表格
      └─ faqs 非空 → H2 + FAQ 列表 + FAQPage JSON-LD (faqSchema)
   → 由 stardew-fish/page.tsx（server）静态渲染进 HTML
```

## 错误处理与边界

- 未知/缺失 locale：`fishSummary` 与表格标签回退 `en`；`getFishFaqs` 返回 `[]`。
- `getFishFaqs` 返回 `[]` 时：`ToolReference` 不渲染 FAQ 区块，也不注入 FAQPage schema（避免空 schema）。
- 表格移动端横向滚动（`overflow-x-auto`），页面 body 不横向滚动。
- 摘要事实全部从 `FISH` 计算（总数、最高价鱼、春季数），不硬编码——数据变更自动跟随。
- 全部服务端渲染，无客户端 API；静态生成安全。

## 测试（Vitest，置于 `src/__tests__/`）

`src/__tests__/lib/fishSeoContent.test.ts`：
- `fishSummary('en')` 含正确总数（= FISH.length）与最高价鱼名/价格；`fishSummary('zh')` 用中文模板；未知 locale 回退 en。
- `getFishFaqs('en')`/`('zh')` 返回 4 条；`getFishFaqs('ja')` 返回 `[]`。

`src/__tests__/tools/FishReferenceTable.test.tsx`：
- 渲染 `<table>`，行数 = FISH.length；含列头；某条鱼（如 Lava Eel）按 locale 显示正确本地化名与价格。

`src/__tests__/tools/ToolReference.test.tsx`：
- 传入 faqs → 渲染 FAQ 区块 + 注入 FAQPage JSON-LD script（含各问题文本）。
- faqs 为空 → 不渲染 FAQ 区块、不注入 schema；children（表格占位）仍渲染。

## 未来（超出本轮）

- 按同一骨架复制到 gifts / cooking / bundles / museum / villagers（各加 `XReferenceTable` + `xSeoContent`）。
- 补 zh-TW（Traditional）/ ja / ko / de 的 FAQ 文案。
- 可选 ItemList/Dataset schema。
- 计算器类工具的可爬内容形态另议（数据是算出来的，非静态表）。
