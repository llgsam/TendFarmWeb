# 工具页服务端可爬内容 — stardew-bundles（复用 ToolReference + locale 骨架）设计文档

日期：2026-07-11
状态：已通过设计评审，待写实现计划

## 背景与动机

延续 fish / gifts / cooking 已落地的模式（`ToolReference` 骨架 + 共享 `pickLoc`），把服务端可爬内容复制到 **stardew-bundles** 工具页。当前社区中心收集包数据全锁在客户端 `StardewBundleFinder` 里，爬虫和 LLM 看不见——违背项目铁律「每件事都要同时满足用户需求和 SEO/GEO 适配」（见记忆 feedback_user_needs_and_geo_mandate）。本设计补上可爬实体：扁平的收集包参考表 + 数据驱动摘要 + FAQ + FAQPage schema。交互工具本体不动。

## 目标（本轮范围）

- 服务端渲染 `<BundleReferenceTable>`：**扁平、一行一收集包**的表，4 列（房间 / 收集包 / 所需物品 / 奖励），跨房间展开，随页面语言本地化。
- 服务端摘要：可摘录结论句，6 语言（模板 + 从数据计算的事实：房间数、收集包数）。
- FAQ：EN + ZH 手写 4 条，注入 FAQPage JSON-LD。
- 复用现有骨架 `<ToolReference>` 与共享 `pickLoc`（`src/lib/tools/seo/locale.ts`），均不改动。

## 非目标（明确排除）

- 修改交互组件 `StardewBundleFinder`、骨架 `ToolReference` 或 `locale.ts`。
- 按房间分组的小标题式表（用户已选扁平表）。
- ja/ko/de/zh-TW 的 FAQ 文案（本轮 FAQ 仅 en + zh；其余 locale 摘要+表仍 6 语言全覆盖，FAQ 区块不渲染）。
- Remixed/随机化收集包（数据是标准默认收集包）。
- 其他工具（museum/villagers）——后续各自复制。

## 关键事实（来自代码勘查）

- 页面路由 `src/app/[locale]/tools/stardew-bundles/page.tsx`（async server component），含本地化 helper `getLoc(locale, zh, en, zhTW?, ja?, ko?, de?)`（zh 先、en 后）；`<StardewBundleFinder locale={locale} />` 后紧接相关工具 `<div className="mt-12 border-t border-[#2d3d2d] pt-8">`（无 `{/* Related links */}` 注释）。
- 数据模块 `src/components/tools/stardewBundleData.ts`（服务端可 import）——**两层嵌套**：
  - `BundleLoc = { en; zh; zhTW; ja; ko; de }`（与共享 `LocLabel` 结构相同 → 可直接传 `pickLoc`）
  - `BundleQuality = 'gold' | 'silver' | 'iridium' | null`
  - `interface BundleItem { key; icon; name: BundleLoc; qty: number; quality: BundleQuality }`
  - `interface Bundle { key; name: BundleLoc; color; required: number; items: BundleItem[]; reward: { name: BundleLoc; qty: number } | null; gold?: number }`
  - `interface BundleRoom { key; name: BundleLoc; reward: BundleLoc; bundles: Bundle[] }`
  - `export const BUNDLE_ROOMS: BundleRoom[]`（**7 个房间**：Crafts Room / Pantry / Fish Tank / Boiler Room / Bulletin Board / Vault / Abandoned JojaMart；**共 31 个收集包**；4 个包给金币奖励）
- `required` < `items.length` 时表示「从列表中选 N 个」；`reward` 为物品奖励或 `null`；`gold` 为金币奖励（二者其一或都无）。
- 共享 helper `src/lib/tools/seo/locale.ts`：`pickLoc(loc, locale)`（6 语言 + en 回退）、`type LocLabel`。bundles 只用 `pickLoc`。
- 骨架 `ToolReference`（sync server）：props `{ locale, tableTitle, summary, faqs, children }`；`faqs` 非空才渲染 FAQ + FAQPage schema。
- 深绿配色：`#0f1a0f` / `#1a2e1a` / `#2d3d2d` / `#f0a832` / `#e8dcc8` / `#8a9a7a`。

## 架构

沿用「可复用骨架 + 每工具内容模块」：`ToolReference`（不改）+ `pickLoc`（复用）+ 本轮新增 `BundleReferenceTable`（表 + 品质/「选N」标签）+ `bundleSeoContent`（摘要 + FAQ）。全部 sync server 组件/纯函数。

### ① 内容数据 `src/lib/tools/seo/bundleSeoContent.ts`（纯函数 + 数据）

```ts
interface Faq { q: string; a: string }
function bundleSummary(locale: string): string
  // 6 语言模板，注入从数据计算的事实：
  //   roomCount = BUNDLE_ROOMS.length
  //   bundleCount = BUNDLE_ROOMS.reduce((n,r)=>n+r.bundles.length,0)
  // 未知 locale 回退 en。
function getBundleFaqs(locale: string): Faq[]
  // 'en' / 'zh' → 4 条手写；其余 → []
```

FAQ 问题（EN，ZH 对应；答案手写、偏机制、drift-safe——不硬编码收集包数量/具体物品清单）：
1. What is the Community Center in Stardew Valley?（修复社区中心；捐物给 Junimo；对比 JojaMart 路线）
2. How do bundles work?（每包要成套物品，有的从多样里「选 N」；有的要求最低品质；集齐一房间给奖励）
3. What do you get for completing the Community Center?（各房间奖励如温室/矿车/巴士；全完成永久修复；免费路线长期更优）
4. Should I complete the Community Center or join JojaMart?（CC 免费经典、奖励更好；Joja 付费换时间；同存档只能选一条）

### ② 表格 `src/components/tools/seo/BundleReferenceTable.tsx`（sync server component）

- props `{ locale }`；`import { pickLoc } from '@/lib/tools/seo/locale'`。
- 语义化 `<table>` + `<caption>` + `<thead>` 4 列头：房间 / 收集包 / 所需物品 / 奖励。
- **扁平展开**：遍历 `BUNDLE_ROOMS` → 每个 `room.bundles` → 每个 bundle 一行（房间名重复）。行数 = 全部收集包数（31）。
  - 房间 = `pickLoc(room.name)`
  - 收集包 = `pickLoc(bundle.name)`（`<th scope="row">`）
  - 所需物品 = 前缀「（选 N）」当 `bundle.required < bundle.items.length` + `bundle.items.map(it => `${pickLoc(it.name)} ×${it.qty}${it.quality ? `（${qualityLabel(it.quality)}）` : ''}`)` join 分隔符
  - 奖励 = `bundle.reward` → `${pickLoc(reward.name)} ×${reward.qty}`；否则 `bundle.gold` → `${gold}g`；否则「—」
- **新增 bundles 专属映射**（本文件内）：品质标签 `Record<'gold'|'silver'|'iridium', LocLabel>`（3 × 6 语言）；「选 N」前缀 6 语言函数。
- 列头 6 语言、CJK/拉丁分隔符本文件内。
- 移动端由骨架 `overflow-x-auto` 包裹 + 表设 `min-w-[820px]`（物品列文字多）。

### ③ 页面接入 `src/app/[locale]/tools/stardew-bundles/page.tsx`

在 `<StardewBundleFinder locale={locale} />` 之后、其后相关工具 `<div className="mt-12 border-t border-[#2d3d2d] pt-8">` 之前插入：
```tsx
<ToolReference
  locale={locale}
  tableTitle={getLoc(locale, '完整收集包清单', 'Complete Bundle List', …6语言)}
  summary={bundleSummary(locale)}
  faqs={getBundleFaqs(locale)}
>
  <BundleReferenceTable locale={locale} />
</ToolReference>
```
一个 H1（已有）+ 多个 H2（收集包表、FAQ）。

## 数据流

```
stardewBundleData.ts (BUNDLE_ROOMS → bundles → items)
  ├─ BundleReferenceTable(locale) → 扁平收集包表（房间重复；物品/品质/奖励本地化）
  └─ bundleSummary(locale)        → 可摘录摘要（数据计算 + 模板）
bundleSeoContent.getBundleFaqs(locale) → EN/ZH FAQ（其余 []）
   → <ToolReference locale tableTitle summary faqs>{<BundleReferenceTable/>}</ToolReference>
      ├─ H2 + 摘要 + 表
      └─ faqs 非空 → H2 + FAQ + FAQPage JSON-LD
```

## 错误处理与边界

- 未知/缺失 locale：摘要、列头、品质标签、「选 N」前缀回退 `en`；`getBundleFaqs` 返回 `[]`。
- `quality` 为 `null` → 物品不附品质标注。`required >= items.length` → 不加「选 N」前缀。
- 奖励三态：物品 / 金币 / 无（「—」）。
- 摘要事实从数据计算（房间数、收集包数），不硬编码。
- 全部服务端渲染；表移动端横向滚动，body 不横向滚动。

## 测试（Vitest，置于 `src/__tests__/`）

`src/__tests__/lib/bundleSeoContent.test.ts`：
- `bundleSummary('en')` 含正确收集包数（= 全部 bundles 计数）与房间数（= BUNDLE_ROOMS.length）；`bundleSummary('zh')` 用中文模板；未知 locale 回退 en。
- `getBundleFaqs('en')`/`('zh')` 返回 4 条；`getBundleFaqs('ja')` → `[]`。

`src/__tests__/tools/BundleReferenceTable.test.tsx`：
- 渲染 `<table>`，数据行数 = 全部收集包数（BUNDLE_ROOMS 各 room.bundles 之和）；含 4 列头。
- 某收集包（如 Spring Foraging Bundle）行显示本地化名；其所需物品含「×qty」；奖励列显示物品或金币（`{gold}g`）。
- 「选 N」前缀在 `required < items.length` 的包上出现（用数据里存在的此类包断言）。

## 未来（超出本轮）

- 复制到 museum / villagers。
- 补 zh-TW/ja/ko/de 的 FAQ 文案。
- 跨工具清理：summary/faq locale-gating 样板、主题色 token、双分隔线（见既有 follow-up）。
