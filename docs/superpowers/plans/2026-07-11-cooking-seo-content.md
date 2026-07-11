# stardew-cooking 服务端可爬内容 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 给 stardew-cooking 工具页补上服务端渲染的可爬内容——配方视角参考表（6 列：配方/食材/Buff/能量/售价/如何解锁）+ 数据驱动摘要（6 语言）+ FAQ（EN/ZH）+ FAQPage schema，复用已存在的 `ToolReference` 骨架和共享 `pickLoc`，交互工具本体不动。

**Architecture:** 复用 `src/components/tools/seo/ToolReference.tsx`（不改）与 `src/lib/tools/seo/locale.ts` 的 `pickLoc`（不改）；新增 `CookReferenceTable`（配方表 + cooking 专属 buff 标签映射）与 `cookingSeoContent`（摘要 + FAQ）。全部 sync server 组件/纯函数。

**Tech Stack:** Next.js App Router（server components）、TypeScript、Vitest + @testing-library/react（jsdom）、Tailwind（深绿农场主题）。

## Global Constraints

- 6 语言 locale：`zh`、`zh-TW`、`ja`、`ko`、`de`、`en`；未知/缺失一律回退 `en`（`pickLoc` 已保证；模板与标签映射用 `?? .en`）。
- FAQ 仅 `en` + `zh` 手写；其余 locale `getCookingFaqs` 返回 `[]`（FAQ 区块 + schema 不渲染）。摘要 + 表对全部 6 语言渲染。
- 摘要事实从数据运行时计算（配方总数、带 buff 配方数），**不硬编码数字**。
- 不修改 `StardewCookingFinder`、`ToolReference`、`locale.ts`。
- 复用共享 `pickLoc`（`@/lib/tools/seo/locale`）——`CookLoc` 与 `LocLabel` 结构相同，直接传入。
- 内容区块放在 `<StardewCookingFinder locale={locale} />` 之后、其后的相关工具 `<div className="mt-12 border-t border-[#2d3d2d] pt-8">` 之前。一个 H1（已有）+ 多个 H2。
- 复用 `faqSchema`（由 `ToolReference` 内部注入）。
- 配色沿用：`#0f1a0f` / `#1a2e1a` / `#2d3d2d` 边框 / `#f0a832` 强调 / `#e8dcc8` 文字 / `#8a9a7a` 弱化。
- 移动端表格由骨架 `overflow-x-auto` 包裹 + 表设 `min-w-[860px]`（cooking 单元格文字多）。
- 测试置于 `src/__tests__/`。无 `console.log`；不可变写法。
- 数据事实（供核对，勿写死进逻辑）：80 个配方；39 个带 buff；Autumn's Bounty 食材 Yam×1 + Pumpkin×1、buff foraging+2 & defense+2、时长 7m 41s、售价 350；无 buff 示例 Algae Soup。
- 每个任务结束提交一次。

---

### Task 1: `cookingSeoContent`（摘要 + FAQ 数据）

**Files:**
- Create: `src/lib/tools/seo/cookingSeoContent.ts`
- Test: `src/__tests__/lib/cookingSeoContent.test.ts`

**Interfaces:**
- Consumes: `COOK_RECIPES` from `@/components/tools/stardewCookingData`.
- Produces:
  - `export interface Faq { q: string; a: string }`
  - `export function cookingSummary(locale: string): string`
  - `export function getCookingFaqs(locale: string): Faq[]`

- [ ] **Step 1: Write the failing test**

`src/__tests__/lib/cookingSeoContent.test.ts`:

```ts
import { describe, it, expect } from 'vitest'
import { cookingSummary, getCookingFaqs } from '@/lib/tools/seo/cookingSeoContent'
import { COOK_RECIPES } from '@/components/tools/stardewCookingData'

describe('cookingSummary', () => {
  it('states the real recipe count for en', () => {
    expect(cookingSummary('en')).toContain(String(COOK_RECIPES.length))
  })
  it('states the count of recipes that grant a buff', () => {
    const buffCount = COOK_RECIPES.filter((r) => r.buffs.length > 0).length
    expect(cookingSummary('en')).toContain(String(buffCount))
  })
  it('uses the zh template', () => {
    expect(cookingSummary('zh')).toContain('星露谷')
  })
  it('falls back to en for unknown locale', () => {
    expect(cookingSummary('xx')).toContain(String(COOK_RECIPES.length))
  })
})

describe('getCookingFaqs', () => {
  it('returns 4 authored FAQs for en and zh', () => {
    expect(getCookingFaqs('en')).toHaveLength(4)
    expect(getCookingFaqs('zh')).toHaveLength(4)
    for (const f of [...getCookingFaqs('en'), ...getCookingFaqs('zh')]) {
      expect(f.q.length).toBeGreaterThan(0)
      expect(f.a.length).toBeGreaterThan(0)
    }
  })
  it('returns [] for locales without authored FAQs', () => {
    for (const loc of ['zh-TW', 'ja', 'ko', 'de', 'xx']) {
      expect(getCookingFaqs(loc)).toEqual([])
    }
  })
  it('en FAQ mentions the Queen of Sauce unlock source', () => {
    expect(getCookingFaqs('en').some((f) => f.a.includes('Queen of Sauce'))).toBe(true)
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/__tests__/lib/cookingSeoContent.test.ts`
Expected: FAIL —「Cannot find module '@/lib/tools/seo/cookingSeoContent'」。

- [ ] **Step 3: Write minimal implementation**

`src/lib/tools/seo/cookingSeoContent.ts`:

```ts
import { COOK_RECIPES } from '@/components/tools/stardewCookingData'

export interface Faq {
  q: string
  a: string
}

function facts() {
  const recipeCount = COOK_RECIPES.length
  const buffCount = COOK_RECIPES.filter((r) => r.buffs.length > 0).length
  return { recipeCount, buffCount }
}

type SummaryFn = (f: ReturnType<typeof facts>) => string

const SUMMARIES: Record<string, SummaryFn> = {
  en: (f) =>
    `Stardew Valley has ${f.recipeCount} cooking recipes, ${f.buffCount} of which grant a temporary stat buff. Each recipe below lists its ingredients, buff, energy, sell price, and how to unlock it. Use the finder above to reverse-look-up by ingredient or filter by buff and source, or browse the full list below.`,
  zh: (f) =>
    `星露谷物语共有 ${f.recipeCount} 道料理配方，其中 ${f.buffCount} 道会提供临时属性增益。下方每道菜都列出了食材、增益、能量、售价和解锁方式。用上面的查询器按食材反查或按增益、来源筛选，或查看下方的完整配方表。`,
  'zh-TW': (f) =>
    `星露谷物語共有 ${f.recipeCount} 道料理配方，其中 ${f.buffCount} 道會提供臨時屬性增益。下方每道菜都列出了食材、增益、能量、售價和解鎖方式。用上面的查詢器按食材反查或按增益、來源篩選，或查看下方的完整配方表。`,
  ja: (f) =>
    `スターデューバレーには ${f.recipeCount} 種類の料理レシピがあり、うち ${f.buffCount} 種類は一時的なステータスバフを付与します。下の表に各料理の材料・バフ・エネルギー・売値・入手方法を掲載。上の検索で材料から逆引き、またはバフや入手方法で絞り込めます。`,
  ko: (f) =>
    `스타듀 밸리에는 ${f.recipeCount}개의 요리 레시피가 있으며 그중 ${f.buffCount}개는 일시적인 능력치 버프를 줍니다. 아래 표에 각 요리의 재료·버프·에너지·판매가·해금 방법을 정리했습니다. 위의 검색기로 재료 역검색하거나 버프·출처로 필터링하세요.`,
  de: (f) =>
    `Stardew Valley hat ${f.recipeCount} Kochrezepte, von denen ${f.buffCount} einen temporären Statuswert-Buff geben. Jedes Rezept unten zeigt Zutaten, Buff, Energie, Verkaufspreis und Freischaltung. Nutze den Finder oben zur Rückwärtssuche nach Zutat oder sieh dir die vollständige Liste unten an.`,
}

export function cookingSummary(locale: string): string {
  const fn = SUMMARIES[locale] ?? SUMMARIES.en
  return fn(facts())
}

const COOKING_FAQS: Record<'en' | 'zh', Faq[]> = {
  en: [
    {
      q: 'How do you cook in Stardew Valley?',
      a: 'You cook using a kitchen, which you get by upgrading your farmhouse to the first House Upgrade (10,000g and 450 wood from Robin). Away from home you can craft a Cookout Kit to cook in the field. Pick a recipe you have unlocked plus the required ingredients from your inventory to make the dish.',
    },
    {
      q: 'How do you unlock cooking recipes in Stardew Valley?',
      a: "Recipes come from four main sources: the Queen of Sauce cooking show on TV (a new recipe most weeks, plus reruns), leveling up your skills, friendship mail from villagers at certain heart levels, and buying a few from shops like the Saloon. The 'How to Unlock' column in the table above lists the exact source for every recipe.",
    },
    {
      q: 'How do cooking buffs work in Stardew Valley?',
      a: 'Some dishes grant a temporary buff — a boost to a skill or stat such as +2 Fishing or +1 Speed — that starts when you eat the food and lasts for the listed duration. You can only have one buff per stat active at a time; eating another food with the same stat replaces it. The Buffs column above shows each dish’s effect and duration.',
    },
    {
      q: 'What is the best food to cook for profit in Stardew Valley?',
      a: 'The most profitable dishes are generally those made from high-value ingredients, since cooking adds value on top of the raw materials. Scan the Sell (g) column in the table above to compare every recipe’s sell price and find the best return for what you can currently make.',
    },
  ],
  zh: [
    {
      q: '星露谷物语怎么做菜？',
      a: '做菜需要厨房——把农舍升级到第一级（在罗宾处花 10,000g 和 450 木材）即可获得。在外面则可以制作「野炊工具包」（Cookout Kit）就地做菜。选一个已解锁的配方，加上背包里对应的食材即可烹饪。',
    },
    {
      q: '星露谷怎么解锁料理配方？',
      a: '配方主要有四个来源：电视上的「酱料女皇」（The Queen of Sauce）烹饪节目（几乎每周一个新配方，还有重播）、技能升级、村民在特定好感度寄来配方的邮件，以及在酒吧等商店购买。上表的「如何解锁」列标注了每个配方的确切来源。',
    },
    {
      q: '星露谷的料理增益（buff）怎么运作？',
      a: '有些菜会给一个临时增益——比如 +2 钓鱼或 +1 速度——吃下即生效，持续上表所列的时长。每种属性同时只能有一个增益生效，吃另一个同属性的食物会覆盖它。上表的「增益」列显示每道菜的效果和时长。',
    },
    {
      q: '星露谷做什么菜最赚钱？',
      a: '最赚钱的菜通常是用高价食材做的，因为烹饪会在原材料基础上增值。扫一眼上表的「售价(g)」列即可比较每个配方的卖价，找到你当前能做的菜里回报最高的。',
    },
  ],
}

export function getCookingFaqs(locale: string): Faq[] {
  if (locale === 'en') return COOKING_FAQS.en
  if (locale === 'zh') return COOKING_FAQS.zh
  return []
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run src/__tests__/lib/cookingSeoContent.test.ts`
Expected: PASS。

- [ ] **Step 5: Commit**

```bash
git add src/lib/tools/seo/cookingSeoContent.ts src/__tests__/lib/cookingSeoContent.test.ts
git commit -m "feat(tools-seo): cooking summary + EN/ZH FAQ content"
```

---

### Task 2: `CookReferenceTable` 服务端配方表

**Files:**
- Create: `src/components/tools/seo/CookReferenceTable.tsx`
- Test: `src/__tests__/tools/CookReferenceTable.test.tsx`

**Interfaces:**
- Consumes: `COOK_RECIPES`、`type BuffType` from `@/components/tools/stardewCookingData`; `pickLoc`、`type LocLabel` from `@/lib/tools/seo/locale`.
- Produces:
  - `export interface CookReferenceTableProps { locale: string }`
  - `export function CookReferenceTable(props: CookReferenceTableProps): JSX.Element`
  - 渲染语义化 `<table>`（一行一配方，6 列：配方/食材/Buff/能量/售价/如何解锁），行数 = `COOK_RECIPES.length`，按 locale 本地化；buff 类型本地化，无 buff 显示「—」。

- [ ] **Step 1: Write the failing test**

`src/__tests__/tools/CookReferenceTable.test.tsx`:

```tsx
import { describe, it, expect } from 'vitest'
import { render, screen, within } from '@testing-library/react'
import { CookReferenceTable } from '@/components/tools/seo/CookReferenceTable'
import { COOK_RECIPES } from '@/components/tools/stardewCookingData'

describe('CookReferenceTable', () => {
  it('renders one row per recipe plus a header row', () => {
    render(<CookReferenceTable locale="en" />)
    const table = screen.getByRole('table')
    expect(within(table).getAllByRole('row')).toHaveLength(COOK_RECIPES.length + 1)
  })

  it('renders the six column headers (en)', () => {
    render(<CookReferenceTable locale="en" />)
    for (const h of ['Recipe', 'Ingredients', 'Buffs', 'Energy', 'Sell (g)', 'How to Unlock']) {
      expect(screen.getByRole('columnheader', { name: h })).toBeInTheDocument()
    }
  })

  it('localizes a recipe name (en + zh)', () => {
    const { rerender } = render(<CookReferenceTable locale="en" />)
    expect(screen.getByText("Autumn's Bounty")).toBeInTheDocument()
    rerender(<CookReferenceTable locale="zh" />)
    expect(screen.getByText('秋日恩赐')).toBeInTheDocument()
  })

  it('formats ingredient quantities with × and shows localized buff labels', () => {
    render(<CookReferenceTable locale="en" />)
    expect(screen.getAllByText(/×/).length).toBeGreaterThan(0)
    expect(screen.getAllByText(/Foraging/).length).toBeGreaterThan(0)
  })

  it('shows an em dash for recipes with no buff', () => {
    render(<CookReferenceTable locale="en" />)
    expect(screen.getAllByText('—').length).toBeGreaterThan(0)
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/__tests__/tools/CookReferenceTable.test.tsx`
Expected: FAIL —「Cannot find module '@/components/tools/seo/CookReferenceTable'」。

- [ ] **Step 3: Write minimal implementation**

`src/components/tools/seo/CookReferenceTable.tsx`:

```tsx
import { COOK_RECIPES, type BuffType } from '@/components/tools/stardewCookingData'
import { pickLoc, type LocLabel } from '@/lib/tools/seo/locale'

export interface CookReferenceTableProps {
  locale: string
}

function sep(locale: string): string {
  return locale === 'zh' || locale === 'zh-TW' || locale === 'ja' || locale === 'ko' ? '、' : ', '
}

const HEADERS: Record<string, [string, string, string, string, string, string]> = {
  en: ['Recipe', 'Ingredients', 'Buffs', 'Energy', 'Sell (g)', 'How to Unlock'],
  zh: ['配方', '食材', '增益', '能量', '售价(g)', '如何解锁'],
  'zh-TW': ['配方', '食材', '增益', '能量', '售價(g)', '如何解鎖'],
  ja: ['料理', '材料', 'バフ', 'エネルギー', '売値(g)', '入手方法'],
  ko: ['요리', '재료', '버프', '에너지', '판매가(g)', '해금 방법'],
  de: ['Rezept', 'Zutaten', 'Buffs', 'Energie', 'Preis (g)', 'Freischaltung'],
}

const BUFF_LABELS: Record<BuffType, LocLabel> = {
  farming: { en: 'Farming', zh: '农业', zhTW: '農業', ja: '農業', ko: '농사', de: 'Landwirtschaft' },
  fishing: { en: 'Fishing', zh: '钓鱼', zhTW: '釣魚', ja: '釣り', ko: '낚시', de: 'Angeln' },
  foraging: { en: 'Foraging', zh: '觅食', zhTW: '覓食', ja: '採取', ko: '채집', de: 'Sammeln' },
  mining: { en: 'Mining', zh: '采矿', zhTW: '採礦', ja: '採掘', ko: '채굴', de: 'Bergbau' },
  combat: { en: 'Combat', zh: '战斗', zhTW: '戰鬥', ja: '戦闘', ko: '전투', de: 'Kampf' },
  luck: { en: 'Luck', zh: '幸运', zhTW: '幸運', ja: '運', ko: '행운', de: 'Glück' },
  attack: { en: 'Attack', zh: '攻击', zhTW: '攻擊', ja: '攻撃', ko: '공격', de: 'Angriff' },
  defense: { en: 'Defense', zh: '防御', zhTW: '防禦', ja: '防御', ko: '방어', de: 'Verteidigung' },
  speed: { en: 'Speed', zh: '速度', zhTW: '速度', ja: 'スピード', ko: '속도', de: 'Geschwindigkeit' },
  maxEnergy: { en: 'Max Energy', zh: '最大体力', zhTW: '最大體力', ja: '最大エネルギー', ko: '최대 에너지', de: 'Max. Energie' },
  magnetism: { en: 'Magnetism', zh: '磁力', zhTW: '磁力', ja: '磁力', ko: '자력', de: 'Magnetismus' },
}

const CAPTION: Record<string, string> = {
  en: 'Complete Stardew Valley cooking recipe list — ingredients, buffs, energy, sell price, and how to unlock',
  zh: '星露谷物语完整料理配方表——食材、增益、能量、售价与解锁方式',
  'zh-TW': '星露谷物語完整料理配方表——食材、增益、能量、售價與解鎖方式',
  ja: 'スターデューバレー全料理レシピ——材料・バフ・エネルギー・売値・入手方法',
  ko: '스타듀 밸리 전체 요리 레시피 — 재료·버프·에너지·판매가·해금 방법',
  de: 'Vollständige Stardew-Valley-Rezeptliste — Zutaten, Buffs, Energie, Verkaufspreis und Freischaltung',
}

export function CookReferenceTable({ locale }: CookReferenceTableProps) {
  const headers = HEADERS[locale] ?? HEADERS.en
  const s = sep(locale)

  return (
    <table className="w-full min-w-[860px] border-collapse text-sm">
      <caption className="mb-3 text-left text-xs text-[#8a9a7a]">{CAPTION[locale] ?? CAPTION.en}</caption>
      <thead>
        <tr className="border-b border-[#2d3d2d] text-left text-[#e8dcc8]">
          {headers.map((h) => (
            <th key={h} scope="col" className="px-3 py-2 font-semibold">
              {h}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {COOK_RECIPES.map((r) => {
          const ingredients = r.ingredients.map((i) => `${pickLoc(i.name, locale)} ×${i.qty}`).join(s)
          const buffText = r.buffs.length
            ? r.buffs.map((b) => `+${b.amount} ${pickLoc(BUFF_LABELS[b.type], locale)}`).join(s) +
              (r.buffDuration ? ` · ${r.buffDuration}` : '')
            : '—'
          return (
            <tr key={r.key} className="border-b border-[#2d3d2d]/50 align-top text-[#c8bca8]">
              <th scope="row" className="px-3 py-2 text-left font-medium text-[#e8dcc8]">
                {pickLoc(r.name, locale)}
              </th>
              <td className="px-3 py-2">{ingredients}</td>
              <td className="px-3 py-2">{buffText}</td>
              <td className="whitespace-nowrap px-3 py-2">{r.energy}</td>
              <td className="whitespace-nowrap px-3 py-2">{r.sellPrice}</td>
              <td className="px-3 py-2">{pickLoc(r.source, locale)}</td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run src/__tests__/tools/CookReferenceTable.test.tsx`
Expected: PASS。若 `getByText('秋日恩赐')` 或 `Autumn's Bounty` 失败，核对 `stardewCookingData.ts` 中该配方名并对齐断言。

- [ ] **Step 5: Commit**

```bash
git add src/components/tools/seo/CookReferenceTable.tsx src/__tests__/tools/CookReferenceTable.test.tsx
git commit -m "feat(tools-seo): server-rendered cooking recipe reference table"
```

---

### Task 3: 接入 stardew-cooking 页面

**Files:**
- Modify: `src/app/[locale]/tools/stardew-cooking/page.tsx`

**Interfaces:**
- Consumes: Task 1 `cookingSummary`/`getCookingFaqs`；Task 2 `CookReferenceTable`；已存在的 `ToolReference`.
- Produces: 无对外接口——在交互 finder 后、相关工具页脚前渲染 `<ToolReference>{<CookReferenceTable/>}</ToolReference>`。

- [ ] **Step 1: 加 import**

在 `src/app/[locale]/tools/stardew-cooking/page.tsx` 顶部 import 区加入：

```tsx
import { ToolReference } from '@/components/tools/seo/ToolReference'
import { CookReferenceTable } from '@/components/tools/seo/CookReferenceTable'
import { cookingSummary, getCookingFaqs } from '@/lib/tools/seo/cookingSeoContent'
```

- [ ] **Step 2: 插入内容区块**

在 `<StardewCookingFinder locale={locale} />` 之后、其后的相关工具 `<div className="mt-12 border-t border-[#2d3d2d] pt-8">` 之前插入：

```tsx
<ToolReference
  locale={locale}
  tableTitle={getLoc(locale, '完整料理配方表', 'Complete Cooking Recipe List', '完整料理配方表', '全料理レシピ', '전체 요리 레시피', 'Vollständige Rezeptliste')}
  summary={cookingSummary(locale)}
  faqs={getCookingFaqs(locale)}
>
  <CookReferenceTable locale={locale} />
</ToolReference>
```

（`getLoc` 是该文件已有的本地化 helper：`getLoc(locale, zh, en, zhTW?, ja?, ko?, de?)`，参数顺序 zh 先、en 后。注意该文件的相关工具区块没有 `{/* Related links */}` 注释——用 `<StardewCookingFinder locale={locale} />` 和其后的 `<div className="mt-12 border-t border-[#2d3d2d] pt-8">` 作为插入锚点。）

- [ ] **Step 3: 类型检查 + 全量测试**

Run: `npx tsc --noEmit && npx vitest run`
Expected: tsc 无错误；全部测试 PASS。

- [ ] **Step 4: 构建冒烟**

Run: `npm run build`
Expected: 构建成功，无与本次改动相关的报错。

- [ ] **Step 5: Commit**

```bash
git add "src/app/[locale]/tools/stardew-cooking/page.tsx"
git commit -m "feat(tools): add crawlable recipe list + FAQ to cooking tool page"
```

---

## Self-Review

**Spec coverage：**
- 配方视角 6 列表（6 语言、语义化 table、caption、buff 本地化、无 buff「—」、食材 ×qty、source 解锁列）→ Task 2。✓
- 数据驱动摘要（6 语言）+ FAQ（EN/ZH，其余 []）→ Task 1。✓
- 复用 `ToolReference`（不改）+ 复用 `pickLoc`（不改）→ Task 2/3。✓
- FAQPage schema 由骨架注入、空 FAQ 不注入 → Task 3 + Task 1 提供 faqs。✓
- 页面接入、finder 后/页脚前、H1+多 H2、工具本体不动 → Task 3 + Global Constraints。✓
- 摘要事实运行时计算、未知 locale 回退、移动端横向滚动（min-w-[860px] + 骨架 overflow）→ 各任务。✓
- 测试置于 `src/__tests__/`、Vitest → 各任务测试路径。✓

**Placeholder scan：** 无 TBD/TODO；每步含完整代码，含 FAQ 实际文案（EN+ZH）与 11 种 buff 的 6 语言标签。✓

**Type consistency：** `Faq`/`{q,a}` 与骨架 `ToolReference` 的 `faqs` prop 结构一致；`CookReferenceTableProps`、`cookingSummary`、`getCookingFaqs` 命名前后一致；`BuffType` 来自 `stardewCookingData`、`pickLoc`/`LocLabel` 来自共享 `locale`。✓
