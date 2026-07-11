# 工具页服务端可爬内容 — stardew-villagers 设计文档

日期：2026-07-11
状态：已通过设计评审，待写实现计划

## 背景与动机

延续 fish/gifts/cooking/bundles/museum 已落地的模式（`ToolReference` 骨架 + 共享 `pickLoc`/`SEASONS` + `content.ts` 的 `byLocale`/`faqsByLocale`），把服务端可爬内容复制到 **stardew-villagers**（系列最后一个）。当前村民名录数据锁在客户端 `StardewVillagerFinder` 里，爬虫/LLM 看不见——违背铁律（记忆 feedback_user_needs_and_geo_mandate）。补上可爬实体：村民名录表 + 数据驱动摘要 + FAQ + FAQPage schema。交互工具本体不动。

## 目标（本轮范围）

- 服务端渲染 `<VillagerReferenceTable>`：扁平村民表（5 列：村民 / 生日 / 居住地 / 可结婚 / 最爱礼物），随 locale 本地化。生日 season 复用共享 `SEASONS`。
- 服务端摘要：6 语言，数据驱动（村民数、可结婚数）。
- FAQ：EN + ZH 手写 4 条，注入 FAQPage JSON-LD。
- 复用 `ToolReference`、`pickLoc`、`SEASONS`、`content.ts`，均不改动。

## 非目标

- 修改 `StardewVillagerFinder`、`ToolReference`、`locale.ts`、`content.ts`。
- 使用 `personality`/`spousePerk`/`heartEventHint` 字段（仅婚配者有，本轮表不含——保持 5 列整齐）。
- ja/ko/de/zh-TW 的 FAQ 文案。

## 关键事实（代码勘查）

- 页面 `src/app/[locale]/tools/stardew-villagers/page.tsx`（async server），`getLoc(locale, zh, en, ...)`；`<StardewVillagerFinder locale={locale} />` 在 line 67，其后 `<div className="mt-12 border-t border-[#2d3d2d] pt-8">`（line 68）。
- 数据 `src/components/tools/stardewVillagerData.ts`：
  - `VilLoc = { en; zh; zhTW; ja; ko; de }`（结构同 `LocLabel`）
  - `Season = 'spring'|'summer'|'fall'|'winter'`
  - `interface Villager { key; icon; name: VilLoc; marriageable: boolean; gender; birthday: { season: Season; day: number }; region: VilLoc; lovedGifts: VilLoc[]; personality; spousePerk; heartEventHint }`
  - `export const VILLAGERS: Villager[]`（**34 位**；**12 位 marriageable**）
  - 首位 Alex（summer 13）。
- 共享 `locale.ts`（`pickLoc` + `SEASONS: Record<Season, LocLabel>`）、`content.ts`（`byLocale`/`faqsByLocale`/`Faq`）、骨架 `ToolReference`。
- 深绿配色。

## 架构

`ToolReference`（不改）+ `pickLoc`/`SEASONS`/`byLocale`/`faqsByLocale`（复用）+ 新增 `VillagerReferenceTable`（村民表）+ `villagerSeoContent`（摘要 + FAQ）。全部 sync server / 纯函数。

### ① 内容数据 `src/lib/tools/seo/villagerSeoContent.ts`

```ts
import { byLocale, faqsByLocale, type Faq } from '@/lib/tools/seo/content'
function villagerSummary(locale): string
  // facts: total = VILLAGERS.length; marriageable = VILLAGERS.filter(v => v.marriageable).length
  // return byLocale(SUMMARIES, locale)(facts())
function getVillagerFaqs(locale): Faq[]  // faqsByLocale(VILLAGER_FAQS, locale)
```

FAQ 问题（EN，ZH 对应；drift-safe——不硬编码具体村民名/数量，指向表列）：
1. Who can you marry in Stardew Valley?（可结婚者在「可结婚」列标「是」；8 心送花束开始约会，10 心送美人鱼吊坠求婚——不列具体名单）
2. How do you increase friendship with villagers?（每日交谈 + 送爱的礼物；每人每周 2 次、生日 ×8；内链 gifts 工具）
3. When are villagers' birthdays in Stardew Valley?（每位生日见「生日」列；生日当天送爱的礼物 ×8 好感度）
4. Where do villagers live in Stardew Valley?（居住地见「居住地」列；多数在鹈鹕镇，部分在山区/海滩/森林）

### ② 表格 `src/components/tools/seo/VillagerReferenceTable.tsx`（sync server）

- props `{ locale }`；`import { pickLoc, SEASONS } from '@/lib/tools/seo/locale'`。
- 语义化 `<table>` + `<caption>` + 5 列头（村民 / 生日 / 居住地 / 可结婚 / 最爱礼物）。每行一位（遍历 `VILLAGERS`）：
  - 村民名 `<th scope="row">`（`pickLoc(v.name)`）
  - 生日 = `${pickLoc(SEASONS[v.birthday.season], locale)} ${v.birthday.day}`
  - 居住地 = `pickLoc(v.region)`
  - 可结婚 = `v.marriageable ? YES_LABEL[locale] : '—'`
  - 最爱礼物 = `v.lovedGifts.map(g => pickLoc(g, locale)).join(分隔符)`
- **新增本文件小映射**：列头 6 语言、`YES_LABEL` 6 语言（是/Yes/…）、caption 6 语言、CJK/拉丁分隔符。
- 移动端骨架 `overflow-x-auto` + 表 `min-w-[760px]`。

### ③ 页面接入 `stardew-villagers/page.tsx`

`<StardewVillagerFinder locale={locale} />` 之后、其后 `<div className="mt-12 border-t ...">` 之前插入 `<ToolReference tableTitle=完整村民名录 summary faqs>{<VillagerReferenceTable/>}</ToolReference>`。

## 数据流

```
stardewVillagerData (VILLAGERS)
  ├─ VillagerReferenceTable(locale) → 村民表（生日用共享 SEASONS；居住地/礼物本地化）
  └─ villagerSummary(locale)        → 可摘录摘要（数据计算：34 位、12 可结婚）
villagerSeoContent.getVillagerFaqs → EN/ZH FAQ（其余 []）
   → <ToolReference>{<VillagerReferenceTable/>}</ToolReference>（FAQ + FAQPage schema）
```

## 错误处理与边界

- 未知/缺失 locale：`pickLoc`/`byLocale` 回退 en；标签 `?? .en`；`getVillagerFaqs` 返回 []。
- 摘要事实从数据计算，不硬编码。
- 服务端渲染；表移动端横向滚动。

## 测试（Vitest，`src/__tests__/`）

`src/__tests__/lib/villagerSeoContent.test.ts`：
- `villagerSummary('en')` 含村民数（= VILLAGERS.length）与可结婚数（= filter marriageable）；`('zh')` 中文模板；未知 locale 回退 en。
- `getVillagerFaqs('en')`/`('zh')` 各 4 条；`('ja')` → []。

`src/__tests__/tools/VillagerReferenceTable.test.tsx`：
- 数据行数 = VILLAGERS.length；含 5 列头。
- 某村民（如 Alex）本地化名 + 生日（summer 13 → 本地化）显示。
- 可结婚列出现本地化「是/Yes」；某村民最爱礼物列非空。

## 未来（超出本轮）

- 补 zh-TW/ja/ko/de FAQ。
- 可考虑加婚配者的 personality/heart-event 细节（另设计）。
- 跨工具清理（theme-token 等既有 follow-up）。
