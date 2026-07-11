# 工具页服务端可爬内容 — stardew-cooking（复用 ToolReference + locale 骨架）设计文档

日期：2026-07-11
状态：已通过设计评审，待写实现计划

## 背景与动机

延续 fish、gifts 已落地的模式（`ToolReference` 骨架 + 共享 `src/lib/tools/seo/locale.ts`），把服务端可爬内容复制到 **stardew-cooking** 工具页。当前料理工具页的 80 个配方数据全锁在客户端 `StardewCookingFinder` 里，爬虫和 LLM 看不见——违背项目铁律「每件事都要同时满足用户需求和 SEO/GEO 适配」（见记忆 feedback_user_needs_and_geo_mandate）。本设计补上可爬实体：配方视角完整参考表 + 数据驱动摘要 + FAQ + FAQPage schema。交互工具本体不动。

## 目标（本轮范围）

- 服务端渲染 `<CookReferenceTable>`：**配方视角**表，6 列（配方 / 食材 / Buff / 能量 / 售价 / 如何解锁），随页面语言本地化。
- 服务端摘要：可摘录结论句，6 语言（模板 + 从数据计算的事实：配方总数、带 buff 配方数）。
- FAQ：EN + ZH 手写 4 条，注入 FAQPage JSON-LD。
- 复用现有骨架 `<ToolReference>` 与共享 `pickLoc`（`src/lib/tools/seo/locale.ts`），均不改动。

## 非目标（明确排除）

- 修改交互组件 `StardewCookingFinder`、骨架 `ToolReference` 或 `locale.ts`。
- ja/ko/de/zh-TW 的 FAQ 文案（本轮 FAQ 仅 en + zh；其余 locale 摘要+表仍 6 语言全覆盖，FAQ 区块不渲染）。
- 其他工具（bundles/museum/villagers）——后续各自复制。

## 关键事实（来自代码勘查）

- 页面路由 `src/app/[locale]/tools/stardew-cooking/page.tsx`（async server component），含本地化 helper `getLoc(locale, zh, en, zhTW?, ja?, ko?, de?)`（zh 先、en 后），`<StardewCookingFinder locale={locale} />` 在正文中，`{/* Related links */}` 页脚随后。
- 数据模块 `src/components/tools/stardewCookingData.ts`（服务端可 import）：
  - `CookLoc = { en; zh; zhTW; ja; ko; de }`（与共享 `LocLabel` 结构相同 → 可直接传 `pickLoc`）
  - `BuffType = 'farming'|'fishing'|'foraging'|'mining'|'combat'|'luck'|'attack'|'defense'|'speed'|'maxEnergy'|'magnetism'`（11 种）
  - `interface CookIngredient { key; name: CookLoc; qty: number }`
  - `interface CookBuff { type: BuffType; amount: number }`
  - `interface CookRecipe { key; icon; name: CookLoc; ingredients: CookIngredient[]; source: CookLoc; sourceCat; energy; health; buffs: CookBuff[]; buffDuration: string|null; sellPrice }`
  - `export const COOK_RECIPES: CookRecipe[]`（80 个；39 个带 buff）
- 共享 helper `src/lib/tools/seo/locale.ts`：`pickLoc(loc, locale)`（6 语言 + en 回退）、`SEASONS`、`type LocLabel`。cooking 用不到 `SEASONS`，只用 `pickLoc`。
- 骨架 `ToolReference`（sync server component）：props `{ locale, tableTitle, summary, faqs, children }`；`faqs` 非空才渲染 FAQ + 注入 FAQPage `<script>`。复用现有 `faqSchema`。
- 深绿配色：`#0f1a0f` / `#1a2e1a` / `#2d3d2d` / `#f0a832` / `#e8dcc8` / `#8a9a7a`。

## 架构

沿用「可复用骨架 + 每工具内容模块」：`ToolReference`（不改）+ `pickLoc`（复用）+ 本轮新增 `CookReferenceTable`（表 + cooking 专属 buff 标签映射）+ `cookingSeoContent`（摘要 + FAQ）。全部 sync server 组件/纯函数。

### ① 内容数据 `src/lib/tools/seo/cookingSeoContent.ts`（纯函数 + 数据）

```ts
interface Faq { q: string; a: string }
function cookingSummary(locale: string): string
  // 6 语言模板，注入从数据计算的事实：
  //   recipeCount = COOK_RECIPES.length
  //   buffCount = COOK_RECIPES.filter(r => r.buffs.length > 0).length
  // 未知 locale 回退 en。
function getCookingFaqs(locale: string): Faq[]
  // 'en' / 'zh' → 4 条手写；其余 → []
```

FAQ 问题（EN，ZH 对应；答案手写、偏机制、避免硬编码具体菜名/数值以防漂移）：
1. How do you cook in Stardew Valley?（需要厨房——升级到 House Upgrade 一级获得，或野外用 Cookout Kit）
2. How do you unlock cooking recipes in Stardew Valley?（酱料女皇 The Queen of Sauce 电视节目、技能升级、村民好感邮件、商店购买）
3. How do cooking buffs work in Stardew Valley?（吃下即生效、有持续时间、同一属性只保留最强的一个、吃新 buff 食物会覆盖）
4. What is the best food to cook for profit in Stardew Valley?（指向表中「售价」列比较；一般用高价食材做的菜卖价最高——不点名具体菜/数字，让读者用表格判断）

### ② 表格 `src/components/tools/seo/CookReferenceTable.tsx`（sync server component）

- props `{ locale }`；`import { pickLoc } from '@/lib/tools/seo/locale'`。
- 语义化 `<table>` + `<caption>` + `<thead>` 6 列头：配方 / 食材 / Buff / 能量 / 售价(g) / 如何解锁。
- 每行一个配方（顺序按 `COOK_RECIPES`）：
  - 配方名（`<th scope="row">`，`pickLoc(r.name)`）
  - 食材 = `r.ingredients.map(i => `${pickLoc(i.name)} ×${i.qty}`)` join 分隔符
  - Buff = `r.buffs` 非空时 `r.buffs.map(b => `+${b.amount} ${buffLabel(b.type)}`)` join，末尾附 `buffDuration`（如有）；为空显示「—」
  - 能量 = `r.energy`
  - 售价 = `r.sellPrice`
  - 如何解锁 = `pickLoc(r.source)`
- **新增 cooking 专属 buff 标签映射**（`Record<BuffType, LocLabel>`，11 种 × 6 语言）置于本文件。
- 列头 6 语言标签、CJK/拉丁分隔符（`、` / `, `）本文件内。
- 移动端由骨架 `overflow-x-auto` 包裹 + 表设 `min-w`（cooking 单元格文字多，设较大 min-w，如 `min-w-[860px]`）。

### ③ 页面接入 `src/app/[locale]/tools/stardew-cooking/page.tsx`

在 `<StardewCookingFinder locale={locale} />` 之后、`{/* Related links */}` 之前插入：
```tsx
<ToolReference
  locale={locale}
  tableTitle={getLoc(locale, '完整料理配方表', 'Complete Cooking Recipe List', …6语言)}
  summary={cookingSummary(locale)}
  faqs={getCookingFaqs(locale)}
>
  <CookReferenceTable locale={locale} />
</ToolReference>
```
一个 H1（已有）+ 多个 H2（配方表、FAQ）。

## 数据流

```
stardewCookingData.ts (COOK_RECIPES)
  ├─ CookReferenceTable(locale) → 配方表（本地化；buff 标签本地化）
  └─ cookingSummary(locale)     → 可摘录摘要（数据计算 + 模板）
cookingSeoContent.getCookingFaqs(locale) → EN/ZH FAQ（其余 []）
   → <ToolReference locale tableTitle summary faqs>{<CookReferenceTable/>}</ToolReference>
      ├─ H2 + 摘要 + 表
      └─ faqs 非空 → H2 + FAQ + FAQPage JSON-LD
```

## 错误处理与边界

- 未知/缺失 locale：摘要、列头、buff 标签回退 `en`；`getCookingFaqs` 返回 `[]`。
- `buffs` 为空 → Buff 列显示「—」。`buffDuration` 为 `null` → 不附时长。
- 摘要事实从数据计算（配方数、带 buff 数），不硬编码。
- 全部服务端渲染；表移动端横向滚动，body 不横向滚动。

## 测试（Vitest，置于 `src/__tests__/`）

`src/__tests__/lib/cookingSeoContent.test.ts`：
- `cookingSummary('en')` 含正确配方数（= COOK_RECIPES.length）与带 buff 数（= filter 结果）；`cookingSummary('zh')` 用中文模板；未知 locale 回退 en。
- `getCookingFaqs('en')`/`('zh')` 返回 4 条；`getCookingFaqs('ja')` → `[]`。

`src/__tests__/tools/CookReferenceTable.test.tsx`：
- 渲染 `<table>`，数据行数 = COOK_RECIPES.length；含 6 列头。
- 某配方（如 Autumn's Bounty）行显示本地化名；其食材含「×qty」；带 buff 的配方 Buff 列含本地化 buff 标签；无 buff 配方显示「—」。
- source（如何解锁）列显示本地化文本。

## 未来（超出本轮）

- 复制到 bundles / museum / villagers。
- 补 zh-TW/ja/ko/de 的 FAQ 文案。
- buff 标签映射若被其他工具复用，再考虑提取到共享处（当前仅 cooking 用，留本地）。
