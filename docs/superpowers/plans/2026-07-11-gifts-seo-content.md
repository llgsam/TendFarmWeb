# stardew-gifts 服务端可爬内容 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 给 stardew-gifts 工具页补上服务端渲染的可爬内容——村民视角送礼参考表（H2）+ 数据驱动摘要（6 语言）+ FAQ（EN/ZH）+ FAQPage schema，复用已存在的 `ToolReference` 骨架，交互工具本体不动。

**Architecture:** 复用 `src/components/tools/seo/ToolReference.tsx`（不改）；新增 `GiftReferenceTable`（村民表 + 通用最爱 callout）与 `giftSeoContent`（摘要 + FAQ）。全部 sync server 组件/纯函数。

**Tech Stack:** Next.js App Router（server components）、TypeScript、Vitest + @testing-library/react（jsdom）、Tailwind（深绿农场主题）。

## Global Constraints

- 6 语言 locale：`zh`、`zh-TW`、`ja`、`ko`、`de`、`en`；未知/缺失一律回退 `en`。
- FAQ 仅 `en` + `zh` 手写；其余 locale `getGiftFaqs` 返回 `[]`（FAQ 区块 + schema 不渲染）。摘要 + 表对全部 6 语言渲染。
- 摘要事实从数据运行时计算（村民数、通用最爱数），**不硬编码数字**。
- 不修改交互组件 `StardewGiftFinder`，不修改骨架 `ToolReference`。
- `loves` 中不在 `GIFT_ITEMS` 的 key 降级为 `key.replace(/_/g, ' ')`（与现有 `StardewGiftFinder` 一致）。
- 内容区块放在 `<StardewGiftFinder locale={locale} />` 之后、`{/* Related links */}` 之前。一个 H1（已有）+ 多个 H2。
- 复用 `faqSchema`（由 `ToolReference` 内部完成注入）。
- 配色沿用：`#0f1a0f` / `#1a2e1a` / `#2d3d2d` 边框 / `#f0a832` 强调 / `#e8dcc8` 文字 / `#8a9a7a` 弱化。
- 移动端表格由骨架 `overflow-x-auto` 包裹 + 表设 `min-w`，页面 body 不横向滚动。
- 测试置于 `src/__tests__/`。无 `console.log`；不可变写法。
- 数据事实（供 FAQ 文案核对，勿写死进逻辑）：34 位可送礼村民；6 样通用最爱（Golden Pumpkin / Magic Rock Candy / Pearl / Prismatic Shard / Rabbit's Foot / Stardrop Tea）；爱的礼物 +80 好感度、生日 ×8。Abigail 生日秋 13。
- 每个任务结束提交一次。

---

### Task 1: `giftSeoContent`（摘要 + FAQ 数据）

**Files:**
- Create: `src/lib/tools/seo/giftSeoContent.ts`
- Test: `src/__tests__/lib/giftSeoContent.test.ts`

**Interfaces:**
- Consumes: `GIFT_VILLAGERS`、`GIFT_ITEMS`、`UNIVERSAL_LOVES`、`GiftLoc` from `@/components/tools/stardewGiftData`.
- Produces:
  - `export interface Faq { q: string; a: string }`
  - `export function giftSummary(locale: string): string`
  - `export function getGiftFaqs(locale: string): Faq[]`

- [ ] **Step 1: Write the failing test**

`src/__tests__/lib/giftSeoContent.test.ts`:

```ts
import { describe, it, expect } from 'vitest'
import { giftSummary, getGiftFaqs } from '@/lib/tools/seo/giftSeoContent'
import { GIFT_VILLAGERS, UNIVERSAL_LOVES } from '@/components/tools/stardewGiftData'

describe('giftSummary', () => {
  it('states the real villager count for en', () => {
    expect(giftSummary('en')).toContain(String(GIFT_VILLAGERS.length))
  })
  it('states the universal-loves count', () => {
    expect(giftSummary('en')).toContain(String(UNIVERSAL_LOVES.length))
  })
  it('names Prismatic Shard as a highlighted universal gift (en)', () => {
    expect(giftSummary('en')).toContain('Prismatic Shard')
  })
  it('uses the zh template', () => {
    const s = giftSummary('zh')
    expect(s).toContain('星露谷')
    expect(s).toContain('五彩碎片')
  })
  it('falls back to en for unknown locale', () => {
    expect(giftSummary('xx')).toContain(String(GIFT_VILLAGERS.length))
  })
})

describe('getGiftFaqs', () => {
  it('returns 4 authored FAQs for en and zh', () => {
    expect(getGiftFaqs('en')).toHaveLength(4)
    expect(getGiftFaqs('zh')).toHaveLength(4)
    for (const f of [...getGiftFaqs('en'), ...getGiftFaqs('zh')]) {
      expect(f.q.length).toBeGreaterThan(0)
      expect(f.a.length).toBeGreaterThan(0)
    }
  })
  it('returns [] for locales without authored FAQs', () => {
    for (const loc of ['zh-TW', 'ja', 'ko', 'de', 'xx']) {
      expect(getGiftFaqs(loc)).toEqual([])
    }
  })
  it('en FAQ mentions the +80 friendship mechanic', () => {
    expect(getGiftFaqs('en').some((f) => f.a.includes('+80'))).toBe(true)
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/__tests__/lib/giftSeoContent.test.ts`
Expected: FAIL —「Cannot find module '@/lib/tools/seo/giftSeoContent'」。

- [ ] **Step 3: Write minimal implementation**

`src/lib/tools/seo/giftSeoContent.ts`:

```ts
import { GIFT_VILLAGERS, GIFT_ITEMS, UNIVERSAL_LOVES, type GiftLoc } from '@/components/tools/stardewGiftData'

export interface Faq {
  q: string
  a: string
}

function pickGiftLoc(loc: GiftLoc, locale: string): string {
  if (locale === 'zh') return loc.zh
  if (locale === 'zh-TW') return loc.zhTW
  if (locale === 'ja') return loc.ja
  if (locale === 'ko') return loc.ko
  if (locale === 'de') return loc.de
  return loc.en
}

function itemName(key: string, locale: string): string {
  const loc = GIFT_ITEMS[key]
  return loc ? pickGiftLoc(loc, locale) : key.replace(/_/g, ' ')
}

function joinTwo(names: string[], locale: string): string {
  if (locale === 'zh' || locale === 'zh-TW' || locale === 'ja' || locale === 'ko') return names.join('、')
  if (locale === 'de') return names.join(' und ')
  return names.join(' and ')
}

// Highlight the two most iconic universal loves when present, else fall back to
// the first two in the list. Kept data-verified (filtered against UNIVERSAL_LOVES).
function facts(locale: string) {
  const villagerCount = GIFT_VILLAGERS.length
  const universalCount = UNIVERSAL_LOVES.length
  const preferred = ['Prismatic_Shard', 'Pearl'].filter((k) => UNIVERSAL_LOVES.includes(k))
  const keys = preferred.length ? preferred : UNIVERSAL_LOVES.slice(0, 2)
  const highlight = joinTwo(keys.map((k) => itemName(k, locale)), locale)
  return { villagerCount, universalCount, highlight }
}

type SummaryFn = (f: ReturnType<typeof facts>) => string

const SUMMARIES: Record<string, SummaryFn> = {
  en: (f) =>
    `Stardew Valley has ${f.villagerCount} villagers you can give gifts to. Every one of them loves ${f.universalCount} universal gifts, including the ${f.highlight}. A loved gift grants +80 friendship — and 8× that on the villager's birthday. Use the finder above to look up any villager, or browse the full gift guide below.`,
  zh: (f) =>
    `星露谷物语有 ${f.villagerCount} 位可以送礼的村民。人人都爱的通用礼物有 ${f.universalCount} 种，包括${f.highlight}。送出爱的礼物 +80 好感度，生日当天更是 ×8。用上面的查询器查任意村民，或查看下方的完整送礼表。`,
  'zh-TW': (f) =>
    `星露谷物語有 ${f.villagerCount} 位可以送禮的村民。人人都愛的通用禮物有 ${f.universalCount} 種，包括${f.highlight}。送出愛的禮物 +80 好感度，生日當天更是 ×8。用上面的查詢器查任意村民，或查看下方的完整送禮表。`,
  ja: (f) =>
    `スターデューバレーには贈り物ができる村人が ${f.villagerCount} 人います。全員が大好きな万能ギフトが ${f.universalCount} 種類あり、${f.highlight}などが含まれます。大好きな贈り物は友好度 +80、誕生日にはその 8 倍。上の検索で村人を調べるか、下の贈り物一覧をご覧ください。`,
  ko: (f) =>
    `스타듀 밸리에는 선물을 줄 수 있는 주민이 ${f.villagerCount}명 있습니다. 모두가 좋아하는 만능 선물이 ${f.universalCount}종 있으며 ${f.highlight} 등이 포함됩니다. 좋아하는 선물은 우호도 +80, 생일에는 그 8배입니다. 위의 검색기로 주민을 찾거나 아래 전체 선물 목록을 확인하세요.`,
  de: (f) =>
    `Stardew Valley hat ${f.villagerCount} Bewohner, denen du Geschenke machen kannst. Alle lieben ${f.universalCount} universelle Geschenke, darunter ${f.highlight}. Ein Lieblingsgeschenk gibt +80 Freundschaft — und das 8-Fache am Geburtstag des Bewohners. Nutze den Finder oben oder sieh dir den vollständigen Geschenk-Guide unten an.`,
}

export function giftSummary(locale: string): string {
  const fn = SUMMARIES[locale] ?? SUMMARIES.en
  return fn(facts(locale))
}

const GIFT_FAQS: Record<'en' | 'zh', Faq[]> = {
  en: [
    {
      q: 'What gifts does everyone love in Stardew Valley?',
      a: "Six gifts are loved by every villager: the Prismatic Shard, Pearl, Rabbit's Foot, Magic Rock Candy, Golden Pumpkin, and Stardrop Tea. These universal loves grant +80 friendship with anyone, making them the safest premium gifts to hand out.",
    },
    {
      q: 'What is the best gift to give any villager?',
      a: 'The Prismatic Shard is the best universal gift — every villager loves it. Any of the six universal loves works, but the Prismatic Shard is the most iconic. Give a loved gift on a villager’s birthday for 8× the friendship (+640).',
    },
    {
      q: 'How much friendship does a loved gift give in Stardew Valley?',
      a: 'A loved gift grants +80 friendship points. On the villager’s birthday it counts 8×, so a single loved gift gives +640 — which is why birthdays are the fastest way to build a relationship. Liked gifts give +45 and neutral gifts +20.',
    },
    {
      q: 'How often can I give gifts in Stardew Valley?',
      a: 'You can give each villager up to 2 gifts per week, plus 1 more on their birthday (so 3 during a birthday week). The weekly limit resets every Monday. Spend both weekly gifts on loved items for the fastest friendship gains.',
    },
  ],
  zh: [
    {
      q: '星露谷物语里人人都爱的礼物有哪些？',
      a: '有六样礼物是每位村民都喜爱的：五彩碎片、珍珠、兔子的脚、魔法糖冰棍、黄金南瓜和星之果茶。这些「通用最爱」对任何人都 +80 好感度，是最稳妥的高级礼物。',
    },
    {
      q: '送任何村民最好的礼物是什么？',
      a: '五彩碎片是最好的通用礼物——人人都爱。六样通用最爱任选其一都行，但五彩碎片最经典。在村民生日当天送出爱的礼物，好感度 ×8（+640）。',
    },
    {
      q: '星露谷送出爱的礼物加多少好感度？',
      a: '送出爱的礼物 +80 好感度。生日当天按 ×8 计算，一份就是 +640——所以生日是拉好感最快的时机。喜欢的礼物 +45，普通礼物 +20。',
    },
    {
      q: '星露谷每周能送几次礼物？',
      a: '每位村民每周最多送 2 次，外加生日当天 1 次（生日那周可送 3 次）。每周一重置。把两次机会都用在爱的礼物上，拉好感最快。',
    },
  ],
}

export function getGiftFaqs(locale: string): Faq[] {
  if (locale === 'en') return GIFT_FAQS.en
  if (locale === 'zh') return GIFT_FAQS.zh
  return []
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run src/__tests__/lib/giftSeoContent.test.ts`
Expected: PASS。

- [ ] **Step 5: Commit**

```bash
git add src/lib/tools/seo/giftSeoContent.ts src/__tests__/lib/giftSeoContent.test.ts
git commit -m "feat(tools-seo): gift summary + EN/ZH FAQ content"
```

---

### Task 2: `GiftReferenceTable` 服务端村民表

**Files:**
- Create: `src/components/tools/seo/GiftReferenceTable.tsx`
- Test: `src/__tests__/tools/GiftReferenceTable.test.tsx`

**Interfaces:**
- Consumes: `GIFT_VILLAGERS`、`GIFT_ITEMS`、`UNIVERSAL_LOVES`、`GiftLoc`、`Season` from `@/components/tools/stardewGiftData`.
- Produces:
  - `export interface GiftReferenceTableProps { locale: string }`
  - `export function GiftReferenceTable(props: GiftReferenceTableProps): JSX.Element`
  - 渲染「人人都爱」callout + 语义化 `<table>`（一行一村民：村民 / 生日 / 最爱礼物），行数 = `GIFT_VILLAGERS.length`，按 locale 本地化。

- [ ] **Step 1: Write the failing test**

`src/__tests__/tools/GiftReferenceTable.test.tsx`:

```tsx
import { describe, it, expect } from 'vitest'
import { render, screen, within } from '@testing-library/react'
import { GiftReferenceTable } from '@/components/tools/seo/GiftReferenceTable'
import { GIFT_VILLAGERS } from '@/components/tools/stardewGiftData'

describe('GiftReferenceTable', () => {
  it('renders one row per villager plus a header row', () => {
    render(<GiftReferenceTable locale="en" />)
    const table = screen.getByRole('table')
    expect(within(table).getAllByRole('row')).toHaveLength(GIFT_VILLAGERS.length + 1)
  })

  it('renders the three column headers (en)', () => {
    render(<GiftReferenceTable locale="en" />)
    for (const h of ['Villager', 'Birthday', 'Loved Gifts']) {
      expect(screen.getByRole('columnheader', { name: h })).toBeInTheDocument()
    }
  })

  it('localizes a villager name (zh Abigail)', () => {
    render(<GiftReferenceTable locale="zh" />)
    expect(screen.getByText('阿比盖尔')).toBeInTheDocument()
  })

  it('lists universal loves in the callout', () => {
    render(<GiftReferenceTable locale="en" />)
    expect(screen.getAllByText(/Prismatic Shard/).length).toBeGreaterThan(0)
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/__tests__/tools/GiftReferenceTable.test.tsx`
Expected: FAIL —「Cannot find module '@/components/tools/seo/GiftReferenceTable'」。

- [ ] **Step 3: Write minimal implementation**

`src/components/tools/seo/GiftReferenceTable.tsx`:

```tsx
import { GIFT_VILLAGERS, GIFT_ITEMS, UNIVERSAL_LOVES, type GiftLoc, type Season } from '@/components/tools/stardewGiftData'

export interface GiftReferenceTableProps {
  locale: string
}

function pick(loc: GiftLoc, locale: string): string {
  if (locale === 'zh') return loc.zh
  if (locale === 'zh-TW') return loc.zhTW
  if (locale === 'ja') return loc.ja
  if (locale === 'ko') return loc.ko
  if (locale === 'de') return loc.de
  return loc.en
}

function itemName(key: string, locale: string): string {
  const loc = GIFT_ITEMS[key]
  return loc ? pick(loc, locale) : key.replace(/_/g, ' ')
}

function sep(locale: string): string {
  return locale === 'zh' || locale === 'zh-TW' || locale === 'ja' || locale === 'ko' ? '、' : ', '
}

const HEADERS: Record<string, [string, string, string]> = {
  en: ['Villager', 'Birthday', 'Loved Gifts'],
  zh: ['村民', '生日', '最爱礼物'],
  'zh-TW': ['村民', '生日', '最愛禮物'],
  ja: ['村人', '誕生日', '大好きな贈り物'],
  ko: ['주민', '생일', '좋아하는 선물'],
  de: ['Bewohner', 'Geburtstag', 'Lieblingsgeschenke'],
}

const SEASONS: Record<Season, GiftLoc> = {
  spring: { en: 'Spring', zh: '春', zhTW: '春', ja: '春', ko: '봄', de: 'Frühling' },
  summer: { en: 'Summer', zh: '夏', zhTW: '夏', ja: '夏', ko: '여름', de: 'Sommer' },
  fall: { en: 'Fall', zh: '秋', zhTW: '秋', ja: '秋', ko: '가을', de: 'Herbst' },
  winter: { en: 'Winter', zh: '冬', zhTW: '冬', ja: '冬', ko: '겨울', de: 'Winter' },
}

const CALLOUT: Record<string, string> = {
  en: 'Loved by every villager (universal gifts):',
  zh: '人人都爱（通用礼物）：',
  'zh-TW': '人人都愛（通用禮物）：',
  ja: '全員が大好き（万能ギフト）：',
  ko: '모두가 좋아함(만능 선물):',
  de: 'Von allen geliebt (universelle Geschenke):',
}

const CAPTION: Record<string, string> = {
  en: 'Complete Stardew Valley villager gift guide — birthday and loved gifts for every villager',
  zh: '星露谷物语完整村民送礼表——每位村民的生日与最爱礼物',
  'zh-TW': '星露谷物語完整村民送禮表——每位村民的生日與最愛禮物',
  ja: 'スターデューバレー全村人 贈り物ガイド——各村人の誕生日と大好きな贈り物',
  ko: '스타듀 밸리 전체 주민 선물 가이드 — 각 주민의 생일과 좋아하는 선물',
  de: 'Vollständiger Stardew-Valley-Geschenk-Guide — Geburtstag und Lieblingsgeschenke jedes Bewohners',
}

export function GiftReferenceTable({ locale }: GiftReferenceTableProps) {
  const headers = HEADERS[locale] ?? HEADERS.en
  const s = sep(locale)
  const universal = UNIVERSAL_LOVES.map((k) => itemName(k, locale)).join(s)

  return (
    <>
      <div className="mb-4 rounded-lg border border-[#f0a832]/20 bg-[#1a2e1a] px-4 py-3 text-sm">
        <span className="font-semibold text-[#e8dcc8]">{CALLOUT[locale] ?? CALLOUT.en}</span>{' '}
        <span className="text-[#8a9a7a]">{universal}</span>
      </div>

      <table className="w-full min-w-[560px] border-collapse text-sm">
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
          {GIFT_VILLAGERS.map((v) => (
            <tr key={v.en} className="border-b border-[#2d3d2d]/50 align-top text-[#c8bca8]">
              <th scope="row" className="px-3 py-2 text-left font-medium text-[#e8dcc8]">
                {pick(v.name, locale)}
              </th>
              <td className="whitespace-nowrap px-3 py-2">
                {pick(SEASONS[v.season], locale)} {v.day}
              </td>
              <td className="px-3 py-2">{v.loves.map((k) => itemName(k, locale)).join(s)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run src/__tests__/tools/GiftReferenceTable.test.tsx`
Expected: PASS。若 `getByText('阿比盖尔')` 失败，核对 `stardewGiftData.ts` 中 Abigail 的 `zh` 名并对齐断言。

- [ ] **Step 5: Commit**

```bash
git add src/components/tools/seo/GiftReferenceTable.tsx src/__tests__/tools/GiftReferenceTable.test.tsx
git commit -m "feat(tools-seo): server-rendered villager gift reference table"
```

---

### Task 3: 接入 stardew-gifts 页面

**Files:**
- Modify: `src/app/[locale]/tools/stardew-gifts/page.tsx`

**Interfaces:**
- Consumes: Task 1 `giftSummary`/`getGiftFaqs`；Task 2 `GiftReferenceTable`；已存在的 `ToolReference`.
- Produces: 无对外接口——在交互 finder 后、相关工具页脚前渲染 `<ToolReference>{<GiftReferenceTable/>}</ToolReference>`。

- [ ] **Step 1: 加 import**

在 `src/app/[locale]/tools/stardew-gifts/page.tsx` 顶部 import 区加入：

```tsx
import { ToolReference } from '@/components/tools/seo/ToolReference'
import { GiftReferenceTable } from '@/components/tools/seo/GiftReferenceTable'
import { giftSummary, getGiftFaqs } from '@/lib/tools/seo/giftSeoContent'
```

- [ ] **Step 2: 插入内容区块**

在 `<StardewGiftFinder locale={locale} />` 之后、`{/* Related links */}` 之前插入：

```tsx
<ToolReference
  locale={locale}
  tableTitle={getLoc(locale, '完整村民送礼表', 'Complete Villager Gift Guide', '完整村民送禮表', '全村人 贈り物ガイド', '전체 주민 선물 가이드', 'Vollständiger Geschenk-Guide')}
  summary={giftSummary(locale)}
  faqs={getGiftFaqs(locale)}
>
  <GiftReferenceTable locale={locale} />
</ToolReference>
```

（`getLoc` 是该文件已有的本地化 helper：`getLoc(locale, zh, en, zhTW?, ja?, ko?, de?)`，参数顺序 zh 先、en 后。）

- [ ] **Step 3: 类型检查 + 全量测试**

Run: `npx tsc --noEmit && npx vitest run`
Expected: tsc 无错误；全部测试 PASS。

- [ ] **Step 4: 构建冒烟**

Run: `npm run build`
Expected: 构建成功，无与本次改动相关的报错。

- [ ] **Step 5: Commit**

```bash
git add "src/app/[locale]/tools/stardew-gifts/page.tsx"
git commit -m "feat(tools): add crawlable gift guide + FAQ to gifts tool page"
```

---

## Self-Review

**Spec coverage：**
- 村民视角表 + 通用最爱 callout（6 语言、语义化 table、caption）→ Task 2。✓
- 数据驱动摘要（6 语言）+ FAQ（EN/ZH，其余 []）→ Task 1。✓
- 复用 `ToolReference`（不改）、FAQPage schema 由骨架注入 → Task 3 + Task 1 提供 faqs。✓
- 缺失物品 key 降级 `key.replace(/_/g,' ')` → Task 1（itemName）+ Task 2（itemName）。✓
- 页面接入、finder 后/页脚前、H1+多 H2、工具本体不动 → Task 3 + Global Constraints。✓
- 摘要事实运行时计算、未知 locale 回退、移动端横向滚动（表 min-w + 骨架 overflow）→ 各任务。✓
- 测试置于 `src/__tests__/`、Vitest → 各任务测试路径。✓

**Placeholder scan：** 无 TBD/TODO；每步含完整代码，含 FAQ 实际文案（EN+ZH）。✓

**Type consistency：** `Faq`/`{q,a}` 与骨架 `ToolReference` 的 `faqs` prop 结构一致；`GiftReferenceTableProps`、`giftSummary`、`getGiftFaqs`、`itemName`、`pick` 命名前后一致；`GiftLoc`/`Season` 来自 `stardewGiftData`。✓
