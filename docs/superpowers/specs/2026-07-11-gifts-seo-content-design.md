# 工具页服务端可爬内容 — stardew-gifts（复用 ToolReference 骨架）设计文档

日期：2026-07-11
状态：已通过设计评审，待写实现计划

## 背景与动机

延续 fish 试点已落地的模式（见 `2026-07-11-tool-page-seo-content-design.md` 与骨架 `ToolReference`），把「服务端可爬内容」复制到 **stardew-gifts** 工具页。当前送礼工具页的村民↔礼物数据全锁在客户端 `StardewGiftFinder` 里，爬虫和 LLM 看不见——违背项目铁律「每件事都要同时满足用户需求和 SEO/GEO 适配」。本设计补上可爬实体：村民视角的完整送礼参考表 + 数据驱动摘要 + FAQ + FAQPage schema。交互工具本体不动。

## 目标（本轮范围）

- 服务端渲染 `<GiftReferenceTable>`：**村民视角**表（一行一村民，列：村民 / 生日 / 最爱礼物），随页面语言本地化。
- 表上方「人人都爱」callout：`UNIVERSAL_LOVES` 的本地化物品名。
- 服务端摘要：可摘录结论句，6 语言（模板 + 从数据计算的事实：村民数、通用最爱数、+80 好感度机制）。
- FAQ：EN + ZH 手写 4 条，注入 FAQPage JSON-LD。
- 复用现有骨架 `<ToolReference>`，不改动它。

## 非目标（明确排除）

- 修改交互组件 `StardewGiftFinder` 或骨架 `ToolReference`。
- 「物品视角」表（谁爱某物品）——次要意图，现有工具已是村民优先。
- ja/ko/de/zh-TW 的 FAQ 文案（本轮 FAQ 仅 en + zh；其余 locale 的摘要+表仍 6 语言全覆盖，FAQ 区块不渲染）。
- 其他工具（cooking/bundles/museum/villagers）——后续各自复制。
- liked/hated 礼物：数据只含 `loves`（+80 挚爱），本轮只呈现挚爱，不臆造喜欢/讨厌。

## 关键事实（来自代码勘查）

- 页面路由 `src/app/[locale]/tools/stardew-gifts/page.tsx`（async server component），含本地化 helper（形如 fish 页的 `getLoc`）。
- 数据模块 `src/components/tools/stardewGiftData.ts`（服务端可 import）：
  - `GiftLoc = { en; zh; zhTW; ja; ko; de }`；`Season = 'spring'|'summer'|'fall'|'winter'`
  - `interface GiftVillager { en: string; name: GiftLoc; season: Season; day: number; loves: string[] }`
  - `export const GIFT_VILLAGERS: GiftVillager[]`（34 位）；`loves` 是物品 key 数组
  - `export const GIFT_ITEMS: Record<string, GiftLoc>`（物品 key → 6 语言名）
  - `export const UNIVERSAL_LOVES: string[]`（6 样：Golden_Pumpkin / Magic_Rock_Candy / Pearl / Prismatic_Shard / Rabbit's_Foot / Stardrop_Tea）
  - 物品 key 缺失于 `GIFT_ITEMS` 时，现有 `StardewGiftFinder` 的降级是 `key.replace(/_/g,' ')`——沿用。
- 骨架 `src/components/tools/seo/ToolReference.tsx`（sync server component）：props `{ locale, tableTitle, summary, faqs, children }`；`faqs` 非空才渲染 FAQ 区块 + 注入 FAQPage `<script>`。已就绪，本轮直接复用。
- 复用 `faqSchema`（`src/lib/structured-data.ts`）。
- 深绿配色：`#0f1a0f` / `#1a2e1a` / `#2d3d2d` / `#f0a832` / `#e8dcc8` / `#8a9a7a`。

## 架构

沿用 fish 试点确立的「可复用骨架 + 每工具内容模块」：`ToolReference`（不改）+ 本轮新增 `GiftReferenceTable`（表）+ `giftSeoContent`（摘要 + FAQ）。全部 sync server 组件/纯函数，静态/SSR 时输出 HTML。

### ① 内容数据 `src/lib/tools/seo/giftSeoContent.ts`（纯函数 + 数据）

```ts
interface Faq { q: string; a: string }
function giftSummary(locale: string): string
  // 6 语言模板，注入从数据计算的事实：
  //   villagerCount = GIFT_VILLAGERS.length
  //   universalCount = UNIVERSAL_LOVES.length
  //   通用最爱示例 = UNIVERSAL_LOVES 前两项的本地化名（Prismatic Shard、Pearl）
  // 未知 locale 回退 en。
function getGiftFaqs(locale: string): Faq[]
  // 'en' / 'zh' → 4 条手写；其余 → []
```

FAQ 问题（EN，ZH 对应；答案手写、准确机制）：
1. What gifts does everyone love in Stardew Valley?（通用最爱：Prismatic Shard / Pearl / Rabbit's Foot / Golden Pumpkin / Magic Rock Candy / Stardrop Tea）
2. What is the best gift to give any villager?（通用最爱，尤其 Prismatic Shard，任何非厌恶者 +80）
3. How much friendship does a loved gift give?（+80 好感度；生日当天 ×8 = +640）
4. How often can I give gifts?（每位村民每周 2 次 + 生日当天）

### ② 表格 `src/components/tools/seo/GiftReferenceTable.tsx`（sync server component）

- props `{ locale }`。
- 表上方渲染「人人都爱」callout：文案本地化 + `UNIVERSAL_LOVES.map(名)` 本地化列表。
- 语义化 `<table>` + `<caption>` + `<thead>` 列头（3 列）：村民 / 生日 / 最爱礼物。
- 每行一位村民（顺序按 `GIFT_VILLAGERS`）：
  - 村民名（`<th scope="row">`，本地化）
  - 生日 = 本地化季节标签 + `day`（如「秋 13」/「Fall 13」）
  - 最爱礼物 = `loves.map(k => GIFT_ITEMS[k] ? pick(GIFT_ITEMS[k]) : k.replace(/_/g,' '))` join「、」/「, 」
- 一份 6 语言标签映射（列头、季节、callout 文案）置于本文件。
- 移动端由骨架的 `overflow-x-auto` 包裹；表设 `min-w`。

### ③ 页面接入 `src/app/[locale]/tools/stardew-gifts/page.tsx`

在交互 `<StardewGiftFinder locale={locale} />` 之后、相关工具/页脚之前插入：
```tsx
<ToolReference
  locale={locale}
  tableTitle={getLoc(locale, '完整村民送礼表', 'Complete Villager Gift Guide', …6语言)}
  summary={giftSummary(locale)}
  faqs={getGiftFaqs(locale)}
>
  <GiftReferenceTable locale={locale} />
</ToolReference>
```
一个 H1（已有工具名）+ 多个 H2（送礼表、FAQ）。

## 数据流

```
stardewGiftData.ts (GIFT_VILLAGERS, GIFT_ITEMS, UNIVERSAL_LOVES)
  ├─ GiftReferenceTable(locale) → callout + 村民表（本地化）
  └─ giftSummary(locale)        → 可摘录摘要（数据计算 + 模板）
giftSeoContent.getGiftFaqs(locale) → EN/ZH FAQ（其余 []）
   → <ToolReference locale tableTitle summary faqs>{<GiftReferenceTable/>}</ToolReference>
      ├─ H2 + 摘要 + callout + 表
      └─ faqs 非空 → H2 + FAQ + FAQPage JSON-LD
```

## 错误处理与边界

- 未知/缺失 locale：摘要与标签回退 `en`；`getGiftFaqs` 返回 `[]`。
- `loves` 中的 key 不在 `GIFT_ITEMS`：降级为 `key.replace(/_/g,' ')`（与现有 GiftFinder 一致）。
- 摘要事实全部从数据计算（村民数、通用最爱数），不硬编码。
- 全部服务端渲染；表移动端横向滚动，body 不横向滚动。

## 测试（Vitest，置于 `src/__tests__/`）

`src/__tests__/lib/giftSeoContent.test.ts`：
- `giftSummary('en')` 含正确村民数（= GIFT_VILLAGERS.length）与通用最爱数；`giftSummary('zh')` 用中文模板；未知 locale 回退 en。
- `getGiftFaqs('en')`/`('zh')` 返回 4 条；`getGiftFaqs('ja')` → `[]`。

`src/__tests__/tools/GiftReferenceTable.test.tsx`：
- 渲染 `<table>`，数据行数 = GIFT_VILLAGERS.length；含 3 列头。
- 某村民（如 Abigail）行显示本地化名与生日（fall 13 → 本地化）；其最爱含某物品本地化名。
- callout 含通用最爱某物品的本地化名。

## 未来（超出本轮）

- 复制到 cooking / bundles / museum / villagers。
- 补 zh-TW/ja/ko/de 的 FAQ 文案（物品名从数据取，防漂移）。
- 提取共享 `pickLoc` 本地化 helper（多个工具重复 `pick`/`SEASONS` 时）。
