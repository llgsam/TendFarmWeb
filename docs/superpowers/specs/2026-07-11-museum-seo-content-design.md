# 工具页服务端可爬内容 — stardew-museum 设计文档

日期：2026-07-11
状态：已通过设计评审，待写实现计划

## 背景与动机

延续 fish/gifts/cooking/bundles 已落地的模式（`ToolReference` 骨架 + 共享 `pickLoc` + `content.ts` 的 `byLocale`/`faqsByLocale`），把服务端可爬内容复制到 **stardew-museum**。当前博物馆捐赠数据锁在客户端 `StardewMuseumFinder` 里，爬虫/LLM 看不见——违背铁律（见记忆 feedback_user_needs_and_geo_mandate）。补上可爬实体：捐赠里程碑 + 完整捐赠物品表 + 数据驱动摘要 + FAQ + FAQPage schema。交互工具本体不动。

## 目标（本轮范围）

- 服务端渲染 `<MuseumReferenceTable>`：捐赠里程碑列表（`MUSEUM_MILESTONES`）+ 扁平物品表（3 列：物品 / 分类 / 在哪获得），随 locale 本地化。
- 服务端摘要：6 语言，数据驱动事实（可捐总数、古物数、矿物数）。
- FAQ：EN + ZH 手写 4 条，注入 FAQPage JSON-LD。
- 复用 `ToolReference`、`pickLoc`、`content.ts`，均不改动。

## 非目标

- 修改 `StardewMuseumFinder`、`ToolReference`、`locale.ts`、`content.ts`。
- ja/ko/de/zh-TW 的 FAQ 文案（仅 en + zh；其余 locale 摘要+表全覆盖）。
- villagers 工具（单独 spec）。

## 关键事实（代码勘查）

- 页面 `src/app/[locale]/tools/stardew-museum/page.tsx`（async server），`getLoc(locale, zh, en, ...)`；`<StardewMuseumFinder locale={locale} />` 在 line 81，其后 `<div className="mt-12 border-t border-[#2d3d2d] pt-8">`（line 83）。
- 数据 `src/components/tools/stardewMuseumData.ts`：
  - `MuseumLoc = { en; zh; zhTW; ja; ko; de }`（结构同 `LocLabel`）
  - `MuseumCat = 'artifact' | 'foraged' | 'gem' | 'geode-mineral'`
  - `interface MuseumItem { key; icon; category: MuseumCat; name: MuseumLoc; source: MuseumLoc }`
  - `interface MuseumMilestone { threshold: number; reward: MuseumLoc }`
  - `export const MUSEUM_CATEGORIES: { key: MuseumCat; name: MuseumLoc }[]`（4 个：artifact/foraged/gem/geode-mineral 的本地化名）
  - `export const MUSEUM_MILESTONES: MuseumMilestone[]`（多档：5/10/15/20/25/30/35/40/50/60/70/…→ 本地化奖励）
  - `export const MUSEUM_ITEMS: MuseumItem[]`（**95 件**：42 古物 + 53 矿物〔4 foraged + 8 gem + 41 geode-mineral〕）
- 共享 `locale.ts`（`pickLoc`）、`content.ts`（`byLocale`/`faqsByLocale`/`Faq`）、骨架 `ToolReference`。
- 深绿配色。

## 架构

`ToolReference`（不改）+ `pickLoc`/`byLocale`/`faqsByLocale`（复用）+ 新增 `MuseumReferenceTable`（里程碑 + 物品表）+ `museumSeoContent`（摘要 + FAQ）。全部 sync server / 纯函数。

### ① 内容数据 `src/lib/tools/seo/museumSeoContent.ts`

```ts
import { byLocale, faqsByLocale, type Faq } from '@/lib/tools/seo/content'
function museumSummary(locale): string
  // facts: total = MUSEUM_ITEMS.length; artifacts = filter category==='artifact'; minerals = total - artifacts
  // SUMMARIES: Record<string, SummaryFn>; return byLocale(SUMMARIES, locale)(facts())
function getMuseumFaqs(locale): Faq[]
  // MUSEUM_FAQS: Record<'en'|'zh', Faq[]>; return faqsByLocale(MUSEUM_FAQS, locale)
```

FAQ 问题（EN，ZH 对应；drift-safe——不硬编码具体物品清单/精确件数）：
1. How do you donate to the Museum in Stardew Valley?（把古物和矿物带给博物馆兼图书馆的 Gunther，他会展示）
2. How do you find artifacts and minerals in Stardew Valley?（古物：挖掘点/锄地/淘洗/部分怪物掉落；矿物：矿石与宝石矿脉、在 Clint 处敲开晶球、采集。上表「在哪获得」列有每件的确切来源）
3. What rewards do you get for donating to the Museum?（达到捐赠里程碑给奖励〔见上方列表〕，60 件给通往下水道的生锈钥匙，全捐完有特别奖励——不逐一列）
4. Where do you take items to donate?（博物馆位于鹈鹕镇，由 Gunther 管理；把可捐物品交给他即可，已捐的会陈列出来）

### ② 表格 `src/components/tools/seo/MuseumReferenceTable.tsx`（sync server）

- props `{ locale }`；`import { pickLoc } from '@/lib/tools/seo/locale'`。
- **里程碑区**（表上方）：小标题（本地化）+ `<ul>`，每项 `${m.threshold} → ${pickLoc(m.reward, locale)}`（遍历 `MUSEUM_MILESTONES`）。
- **物品表**：语义化 `<table>` + `<caption>` + 3 列头（物品 / 分类 / 在哪获得）。每行一件（遍历 `MUSEUM_ITEMS`）：物品名 `<th scope="row">`；分类 = 由 `MUSEUM_CATEGORIES` 建 `key→name` 映射后 `pickLoc`；在哪获得 = `pickLoc(item.source)`。
- 列头 6 语言、里程碑小标题 6 语言本文件内。
- 移动端骨架 `overflow-x-auto` + 表 `min-w-[720px]`。

### ③ 页面接入 `stardew-museum/page.tsx`

`<StardewMuseumFinder locale={locale} />` 之后、其后 `<div className="mt-12 border-t ...">` 之前插入 `<ToolReference tableTitle=完整捐赠物品表 summary faqs>{<MuseumReferenceTable/>}</ToolReference>`。

## 数据流

```
stardewMuseumData (MUSEUM_ITEMS, MUSEUM_MILESTONES, MUSEUM_CATEGORIES)
  ├─ MuseumReferenceTable(locale) → 里程碑<ul> + 物品<table>（本地化）
  └─ museumSummary(locale)        → 可摘录摘要（数据计算）
museumSeoContent.getMuseumFaqs → EN/ZH FAQ（其余 []）
   → <ToolReference>{<MuseumReferenceTable/>}</ToolReference>（FAQ + FAQPage schema）
```

## 错误处理与边界

- 未知/缺失 locale：`pickLoc`/`byLocale` 回退 en；`getMuseumFaqs` 返回 []。
- 分类 key 不在 `MUSEUM_CATEGORIES`（不应发生）：降级显示原 key。
- 摘要事实从数据计算，不硬编码。
- 服务端渲染；表移动端横向滚动。

## 测试（Vitest，`src/__tests__/`）

`src/__tests__/lib/museumSeoContent.test.ts`：
- `museumSummary('en')` 含总数（= MUSEUM_ITEMS.length）与古物数（= filter artifact）；`('zh')` 中文模板；未知 locale 回退 en。
- `getMuseumFaqs('en')`/`('zh')` 各 4 条；`('ja')` → []。

`src/__tests__/tools/MuseumReferenceTable.test.tsx`：
- 物品表数据行数 = MUSEUM_ITEMS.length；含 3 列头。
- 某物品（如 Dwarf Scroll I）本地化名显示；其「在哪获得」列非空。
- 里程碑区含至少一个 `→` 与某里程碑奖励文本。

## 未来（超出本轮）

- villagers（单独 spec）。
- 补 zh-TW/ja/ko/de FAQ。
