# 工具页服务端可爬内容（fish 试点）Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 给 stardew-fish 工具页补上服务端渲染的可爬内容——完整鱼类数据表（H2）+ 数据驱动摘要（6 语言）+ FAQ（EN/ZH）+ FAQPage schema，用可复用骨架 `<ToolReference>`，交互工具本体不动。

**Architecture:** 服务端骨架 `ToolReference`（统一区块外壳 + FAQ + schema）+ 每工具内容模块（`FishReferenceTable` 表格、`fishSeoContent` 摘要与 FAQ）。全部为无 `'use client'` 的同步 React 组件/纯函数，静态生成时输出进 HTML。

**Tech Stack:** Next.js App Router（server components）、TypeScript、Vitest + @testing-library/react（jsdom）、Tailwind（深绿农场主题）。

## Global Constraints

- 站点 6 语言 locale：`zh`、`zh-TW`、`ja`、`ko`、`de`、`en`；未知/缺失 locale 一律回退 `en`。
- FAQ 本轮仅 `en` + `zh` 手写；其余 locale（`zh-TW`/`ja`/`ko`/`de`）`getFishFaqs` 返回 `[]`，FAQ 区块与 FAQPage schema 均不渲染。摘要 + 表格对全部 6 语言渲染。
- 摘要事实全部从 `FISH` 运行时计算（总数、最高价鱼、春季可钓数），**不硬编码数字**。
- 不修改交互组件 `StardewFishFinder` 或任何工具计算逻辑。
- 数据表放在 `<StardewFishFinder>` 之后、相关工具页脚之前。一个 H1（已有工具名）+ 多个 H2（数据表、FAQ）。
- 复用现有 `faqSchema(faqs: { question: string; answer: string }[])`（`src/lib/structured-data.ts`）注入 `<script type="application/ld+json">`；FAQ 为空时不注入。
- 配色沿用：`#0f1a0f` / `#1a2e1a` / `#2d3d2d` 边框 / `#f0a832` 强调 / `#e8dcc8` 文字 / `#8a9a7a` 弱化。
- 移动端表格 `overflow-x-auto` 包裹，页面 body 不横向滚动。
- 测试置于 `src/__tests__/`（禁止与源码同目录）。无 `console.log`；不可变写法。
- 数据事实（供 FAQ 文案核对，勿写死进逻辑）：共 48 条钓竿鱼；最高价 Lava Eel 700g；下雨限定 Walleye/Catfish/Eel/Red Snapper/Shad。
- 每个任务结束提交一次。

---

### Task 1: `fishSeoContent`（摘要 + FAQ 数据）

**Files:**
- Create: `src/lib/tools/seo/fishSeoContent.ts`
- Test: `src/__tests__/lib/fishSeoContent.test.ts`

**Interfaces:**
- Consumes: `FISH`（`Fish[]`）、`FishLoc` from `@/components/tools/stardewFishData`.
- Produces:
  - `export interface Faq { q: string; a: string }`
  - `export function fishSummary(locale: string): string`
  - `export function getFishFaqs(locale: string): Faq[]`

- [ ] **Step 1: Write the failing test**

`src/__tests__/lib/fishSeoContent.test.ts`:

```ts
import { describe, it, expect } from 'vitest'
import { fishSummary, getFishFaqs } from '@/lib/tools/seo/fishSeoContent'
import { FISH } from '@/components/tools/stardewFishData'

describe('fishSummary', () => {
  it('states the real total fish count for en', () => {
    expect(fishSummary('en')).toContain(String(FISH.length))
  })
  it('names the most valuable fish and its price', () => {
    const top = FISH.reduce((a, b) => (b.price > a.price ? b : a))
    const s = fishSummary('en')
    expect(s).toContain(top.name.en)
    expect(s).toContain(String(top.price))
  })
  it('uses the zh template with the zh fish name', () => {
    const top = FISH.reduce((a, b) => (b.price > a.price ? b : a))
    const s = fishSummary('zh')
    expect(s).toContain('星露谷')
    expect(s).toContain(top.name.zh)
  })
  it('falls back to en for unknown locale', () => {
    expect(fishSummary('xx')).toContain(String(FISH.length))
  })
})

describe('getFishFaqs', () => {
  it('returns 4 authored FAQs for en and zh', () => {
    expect(getFishFaqs('en')).toHaveLength(4)
    expect(getFishFaqs('zh')).toHaveLength(4)
    for (const f of [...getFishFaqs('en'), ...getFishFaqs('zh')]) {
      expect(f.q.length).toBeGreaterThan(0)
      expect(f.a.length).toBeGreaterThan(0)
    }
  })
  it('returns [] for locales without authored FAQs', () => {
    for (const loc of ['zh-TW', 'ja', 'ko', 'de', 'xx']) {
      expect(getFishFaqs(loc)).toEqual([])
    }
  })
  it('en FAQ names the top fish (Lava Eel) somewhere', () => {
    expect(getFishFaqs('en').some((f) => f.a.includes('Lava Eel'))).toBe(true)
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/__tests__/lib/fishSeoContent.test.ts`
Expected: FAIL —「Cannot find module '@/lib/tools/seo/fishSeoContent'」。

- [ ] **Step 3: Write minimal implementation**

`src/lib/tools/seo/fishSeoContent.ts`:

```ts
import { FISH, type FishLoc } from '@/components/tools/stardewFishData'

export interface Faq {
  q: string
  a: string
}

function pickFishLoc(loc: FishLoc, locale: string): string {
  if (locale === 'zh') return loc.zh
  if (locale === 'zh-TW') return loc.zhTW
  if (locale === 'ja') return loc.ja
  if (locale === 'ko') return loc.ko
  if (locale === 'de') return loc.de
  return loc.en
}

// Data-derived facts (computed at call time so they track the data).
function facts(locale: string) {
  const total = FISH.length
  const top = FISH.reduce((a, b) => (b.price > a.price ? b : a))
  const topName = pickFishLoc(top.name, locale)
  const springCount = FISH.filter((f) => f.seasons.includes('spring')).length
  return { total, topName, topPrice: top.price, springCount }
}

type SummaryFn = (f: ReturnType<typeof facts>) => string

const SUMMARIES: Record<string, SummaryFn> = {
  en: (f) =>
    `Stardew Valley has ${f.total} rod-caught fish across all four seasons. The most valuable is the ${f.topName}, selling for ${f.topPrice}g. ${f.springCount} of them can be caught in spring. Use the finder above to filter by season, location, and weather, or browse the full list below.`,
  zh: (f) =>
    `星露谷物语共有 ${f.total} 种钓竿鱼，横跨春夏秋冬四季。其中最值钱的是${f.topName}，售价 ${f.topPrice}g。有 ${f.springCount} 种可以在春季钓到。用上面的查询器按季节、地点和天气筛选，或查看下方的完整列表。`,
  'zh-TW': (f) =>
    `星露谷物語共有 ${f.total} 種釣竿魚，橫跨春夏秋冬四季。其中最值錢的是${f.topName}，售價 ${f.topPrice}g。有 ${f.springCount} 種可以在春季釣到。用上面的查詢器按季節、地點和天氣篩選，或查看下方的完整列表。`,
  ja: (f) =>
    `スターデューバレーには四季を通じて ${f.total} 種類の釣り竿で釣れる魚がいます。最も高価なのは${f.topName}で、売値は ${f.topPrice}g。うち ${f.springCount} 種類は春に釣れます。上の検索で季節・場所・天気で絞り込むか、下の全リストをご覧ください。`,
  ko: (f) =>
    `스타듀 밸리에는 사계절에 걸쳐 낚싯대로 잡을 수 있는 물고기가 ${f.total}종 있습니다. 가장 비싼 것은 ${f.topName}(으)로 ${f.topPrice}g에 팔립니다. 그중 ${f.springCount}종은 봄에 잡을 수 있습니다. 위의 검색기로 계절·장소·날씨로 필터링하거나 아래 전체 목록을 확인하세요.`,
  de: (f) =>
    `Stardew Valley hat ${f.total} mit der Angel fangbare Fische über alle vier Jahreszeiten. Der wertvollste ist der ${f.topName} mit ${f.topPrice}g. ${f.springCount} davon lassen sich im Frühling fangen. Nutze den Finder oben, um nach Jahreszeit, Ort und Wetter zu filtern, oder sieh dir die vollständige Liste unten an.`,
}

export function fishSummary(locale: string): string {
  const fn = SUMMARIES[locale] ?? SUMMARIES.en
  return fn(facts(locale))
}

const FISH_FAQS: Record<'en' | 'zh', Faq[]> = {
  en: [
    {
      q: 'What is the most valuable fish in Stardew Valley?',
      a: 'The Lava Eel is the most valuable rod-caught fish, selling for 700g at base quality. It lives in the lava pools on Mines level 100 and on Ginger Island, and bites at any time of day. Its high value also makes it a strong Fish Pond breeding target for steady profit.',
    },
    {
      q: 'What fish can I catch in spring in Stardew Valley?',
      a: 'Spring has one of the fullest rosters — ocean fish like Anchovy and Sardine, river fish like Catfish (rainy days only) and Shad, plus the mine fish that bite year-round. Set the finder above to Spring to see the full list with times, locations, and prices.',
    },
    {
      q: 'Which fish can only be caught when it is raining?',
      a: 'The rain-locked fish are the Walleye, Catfish, Eel, Red Snapper, and Shad — they only bite while it is raining, so save rainy days for them. The Catfish in particular is a valuable 200g catch and a common bundle and quest target.',
    },
    {
      q: 'What are the best early-game fish for profit?',
      a: 'Early on, the Catfish (200g, rivers on rainy days) is the standout, and the Mines’ Stonefish and Ice Pip become strong once you can fish the mine pools. Otherwise sell whatever you catch and prioritize rainy days — that is when the most valuable weather-locked fish appear.',
    },
  ],
  zh: [
    {
      q: '星露谷物语里最值钱的鱼是哪一条？',
      a: '熔岩鳗鱼（Lava Eel）是售价最高的钓竿鱼，基础品质售价 700g。它栖息在矿井 100 层的岩浆池以及姜岛，全天候都能上钩。高售价也让它成为鱼塘养殖持续赚钱的优选目标。',
    },
    {
      q: '星露谷春季能钓到哪些鱼？',
      a: '春季的可钓鱼种非常丰富——海里的鳀鱼、沙丁鱼，河里的鲶鱼（仅雨天）、西鲱，以及全年上钩的矿洞鱼。把上面的查询器切到「春季」，即可看到含时间、地点和售价的完整列表。',
    },
    {
      q: '哪些鱼只有下雨时才能钓到？',
      a: '雨天限定的鱼是大眼鱼、鲶鱼、鳗鱼、红鲷鱼和西鲱——它们只在下雨时上钩，所以要把雨天留给它们。其中鲶鱼售价 200g，还是社区中心 bundle 和任务的常见目标。',
    },
    {
      q: '新手前期钓什么鱼最划算？',
      a: '前期最突出的是鲶鱼（200g，雨天的河流），等能到矿洞钓鱼后，石鱼和冰柱鱼也很不错。其余时候钓到什么卖什么，并优先利用雨天——最值钱的天气限定鱼都在雨天出现。',
    },
  ],
}

export function getFishFaqs(locale: string): Faq[] {
  if (locale === 'en') return FISH_FAQS.en
  if (locale === 'zh') return FISH_FAQS.zh
  return []
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run src/__tests__/lib/fishSeoContent.test.ts`
Expected: PASS（全部用例通过）。

- [ ] **Step 5: Commit**

```bash
git add src/lib/tools/seo/fishSeoContent.ts src/__tests__/lib/fishSeoContent.test.ts
git commit -m "feat(tools-seo): fish summary + EN/ZH FAQ content"
```

---

### Task 2: `ToolReference` 可复用骨架

**Files:**
- Create: `src/components/tools/seo/ToolReference.tsx`
- Test: `src/__tests__/tools/ToolReference.test.tsx`

**Interfaces:**
- Consumes: `faqSchema` from `@/lib/structured-data`; `Faq` shape `{ q: string; a: string }`（结构同 Task 1，此处本地声明，避免耦合）。
- Produces:
  - `export interface ToolReferenceProps { locale: string; tableTitle: string; summary: string; faqs: { q: string; a: string }[]; children: React.ReactNode }`
  - `export function ToolReference(props: ToolReferenceProps): JSX.Element`
  - 行为：渲染 H2 标题 + 摘要 + children（表格）；`faqs` 非空时渲染 FAQ 区块并注入 FAQPage `<script type="application/ld+json">`；为空则两者都不渲染。

- [ ] **Step 1: Write the failing test**

`src/__tests__/tools/ToolReference.test.tsx`:

```tsx
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { ToolReference } from '@/components/tools/seo/ToolReference'

const faqs = [
  { q: 'Most valuable fish?', a: 'The Lava Eel at 700g.' },
  { q: 'Rainy fish?', a: 'Catfish and others.' },
]

describe('ToolReference', () => {
  it('renders the table title, summary, and children', () => {
    render(
      <ToolReference locale="en" tableTitle="Complete Fish List" summary="48 fish total." faqs={[]}>
        <table><tbody><tr><td>row</td></tr></tbody></table>
      </ToolReference>,
    )
    expect(screen.getByRole('heading', { name: 'Complete Fish List' })).toBeInTheDocument()
    expect(screen.getByText('48 fish total.')).toBeInTheDocument()
    expect(screen.getByText('row')).toBeInTheDocument()
  })

  it('renders FAQ questions/answers and injects FAQPage JSON-LD when faqs provided', () => {
    const { container } = render(
      <ToolReference locale="en" tableTitle="T" summary="S" faqs={faqs}>
        <div>child</div>
      </ToolReference>,
    )
    expect(screen.getByText('Most valuable fish?')).toBeInTheDocument()
    expect(screen.getByText('The Lava Eel at 700g.')).toBeInTheDocument()
    const script = container.querySelector('script[type="application/ld+json"]')
    expect(script).not.toBeNull()
    const json = JSON.parse(script!.textContent!)
    expect(json['@type']).toBe('FAQPage')
    expect(JSON.stringify(json)).toContain('Most valuable fish?')
  })

  it('renders no FAQ section and no JSON-LD when faqs is empty', () => {
    const { container } = render(
      <ToolReference locale="en" tableTitle="T" summary="S" faqs={[]}>
        <div>child</div>
      </ToolReference>,
    )
    expect(screen.queryByText(/frequently asked questions/i)).toBeNull()
    expect(container.querySelector('script[type="application/ld+json"]')).toBeNull()
    expect(screen.getByText('child')).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/__tests__/tools/ToolReference.test.tsx`
Expected: FAIL —「Cannot find module '@/components/tools/seo/ToolReference'」。

- [ ] **Step 3: Write minimal implementation**

`src/components/tools/seo/ToolReference.tsx`:

```tsx
import type { ReactNode } from 'react'
import { faqSchema } from '@/lib/structured-data'

export interface ToolReferenceProps {
  locale: string
  tableTitle: string
  summary: string
  faqs: { q: string; a: string }[]
  children: ReactNode
}

function faqHeading(locale: string): string {
  if (locale === 'zh') return '常见问题'
  if (locale === 'zh-TW') return '常見問題'
  if (locale === 'ja') return 'よくある質問'
  if (locale === 'ko') return '자주 묻는 질문'
  if (locale === 'de') return 'Häufig gestellte Fragen'
  return 'Frequently Asked Questions'
}

export function ToolReference({ locale, tableTitle, summary, faqs, children }: ToolReferenceProps) {
  const schema = faqs.length ? faqSchema(faqs.map((f) => ({ question: f.q, answer: f.a }))) : null

  return (
    <section className="mt-12 border-t border-[#2d3d2d] pt-8">
      <h2 className="mb-3 text-xl font-bold text-[#e8dcc8]">{tableTitle}</h2>
      <p className="mb-6 text-sm text-[#8a9a7a]">{summary}</p>
      <div className="overflow-x-auto">{children}</div>

      {faqs.length > 0 && (
        <div className="mt-12">
          <h2 className="mb-6 text-xl font-bold text-[#e8dcc8]">{faqHeading(locale)}</h2>
          <div className="space-y-4">
            {faqs.map((f, i) => (
              <div key={i} className="rounded-xl border border-[#2d3d2d] bg-[#1a2e1a] px-5 py-4">
                <p className="mb-2 font-semibold text-[#e8dcc8]">{f.q}</p>
                <p className="text-sm text-[#8a9a7a]">{f.a}</p>
              </div>
            ))}
          </div>
          {schema && (
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
            />
          )}
        </div>
      )}
    </section>
  )
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run src/__tests__/tools/ToolReference.test.tsx`
Expected: PASS（3 用例通过）。

注：`faqSchema` 返回对象须含 `'@type': 'FAQPage'`——已由现有实现保证（文章页 FAQ 同款）。

- [ ] **Step 5: Commit**

```bash
git add src/components/tools/seo/ToolReference.tsx src/__tests__/tools/ToolReference.test.tsx
git commit -m "feat(tools-seo): ToolReference skeleton with FAQ + FAQPage schema"
```

---

### Task 3: `FishReferenceTable` 服务端数据表

**Files:**
- Create: `src/components/tools/seo/FishReferenceTable.tsx`
- Test: `src/__tests__/tools/FishReferenceTable.test.tsx`

**Interfaces:**
- Consumes: `FISH`、`FISH_LOCATIONS`、`FishLoc`、`Season`、`Weather` from `@/components/tools/stardewFishData`.
- Produces:
  - `export interface FishReferenceTableProps { locale: string }`
  - `export function FishReferenceTable(props: FishReferenceTableProps): JSX.Element`
  - 渲染语义化 `<table>`，行数 = `FISH.length`，含列头与 `<caption>`，按 locale 本地化。

- [ ] **Step 1: Write the failing test**

`src/__tests__/tools/FishReferenceTable.test.tsx`:

```tsx
import { describe, it, expect } from 'vitest'
import { render, screen, within } from '@testing-library/react'
import { FishReferenceTable } from '@/components/tools/seo/FishReferenceTable'
import { FISH } from '@/components/tools/stardewFishData'

describe('FishReferenceTable', () => {
  it('renders one row per fish plus a header row', () => {
    render(<FishReferenceTable locale="en" />)
    const table = screen.getByRole('table')
    // header row + data rows
    expect(within(table).getAllByRole('row')).toHaveLength(FISH.length + 1)
  })

  it('shows the localized fish name and price (en)', () => {
    render(<FishReferenceTable locale="en" />)
    expect(screen.getByText('Lava Eel')).toBeInTheDocument()
    expect(screen.getAllByText('700').length).toBeGreaterThan(0)
  })

  it('localizes the fish name for zh', () => {
    render(<FishReferenceTable locale="zh" />)
    expect(screen.getByText('岩浆鳗鱼')).toBeInTheDocument()
  })

  it('renders column headers', () => {
    render(<FishReferenceTable locale="en" />)
    for (const h of ['Fish', 'Seasons', 'Location', 'Time', 'Weather', 'Price (g)']) {
      expect(screen.getByRole('columnheader', { name: h })).toBeInTheDocument()
    }
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/__tests__/tools/FishReferenceTable.test.tsx`
Expected: FAIL —「Cannot find module '@/components/tools/seo/FishReferenceTable'」。

- [ ] **Step 3: Write minimal implementation**

`src/components/tools/seo/FishReferenceTable.tsx`:

```tsx
import { FISH, FISH_LOCATIONS, type FishLoc, type Season, type Weather } from '@/components/tools/stardewFishData'

export interface FishReferenceTableProps {
  locale: string
}

function pick(loc: FishLoc, locale: string): string {
  if (locale === 'zh') return loc.zh
  if (locale === 'zh-TW') return loc.zhTW
  if (locale === 'ja') return loc.ja
  if (locale === 'ko') return loc.ko
  if (locale === 'de') return loc.de
  return loc.en
}

const HEADERS: Record<string, [string, string, string, string, string, string]> = {
  en: ['Fish', 'Seasons', 'Location', 'Time', 'Weather', 'Price (g)'],
  zh: ['鱼', '季节', '地点', '时间', '天气', '售价(g)'],
  'zh-TW': ['魚', '季節', '地點', '時間', '天氣', '售價(g)'],
  ja: ['魚', '季節', '場所', '時間', '天気', '売値(g)'],
  ko: ['물고기', '계절', '장소', '시간', '날씨', '판매가(g)'],
  de: ['Fisch', 'Jahreszeit', 'Ort', 'Zeit', 'Wetter', 'Preis (g)'],
}

const SEASONS: Record<Season, FishLoc> = {
  spring: { en: 'Spring', zh: '春', zhTW: '春', ja: '春', ko: '봄', de: 'Frühling' },
  summer: { en: 'Summer', zh: '夏', zhTW: '夏', ja: '夏', ko: '여름', de: 'Sommer' },
  fall: { en: 'Fall', zh: '秋', zhTW: '秋', ja: '秋', ko: '가을', de: 'Herbst' },
  winter: { en: 'Winter', zh: '冬', zhTW: '冬', ja: '冬', ko: '겨울', de: 'Winter' },
}

const WEATHER: Record<Weather, FishLoc> = {
  any: { en: 'Any', zh: '任意', zhTW: '任意', ja: '任意', ko: '아무때나', de: 'Alle' },
  sun: { en: 'Sunny', zh: '晴天', zhTW: '晴天', ja: '晴れ', ko: '맑음', de: 'Sonnig' },
  rain: { en: 'Rain', zh: '雨天', zhTW: '雨天', ja: '雨', ko: '비', de: 'Regen' },
}

const CAPTION: Record<string, string> = {
  en: 'Complete Stardew Valley fish list — season, location, time, weather, and sell price',
  zh: '星露谷物语完整鱼类列表——季节、地点、时间、天气与售价',
  'zh-TW': '星露谷物語完整魚類列表——季節、地點、時間、天氣與售價',
  ja: 'スターデューバレー全魚リスト——季節・場所・時間・天気・売値',
  ko: '스타듀 밸리 전체 물고기 목록 — 계절·장소·시간·날씨·판매가',
  de: 'Vollständige Stardew-Valley-Fischliste — Jahreszeit, Ort, Zeit, Wetter und Verkaufspreis',
}

export function FishReferenceTable({ locale }: FishReferenceTableProps) {
  const headers = HEADERS[locale] ?? HEADERS.en
  const locMap = new Map(FISH_LOCATIONS.map((l) => [l.key, l.label]))

  const locName = (key: string): string => {
    const label = locMap.get(key)
    return label ? pick(label, locale) : key
  }

  return (
    <table className="w-full min-w-[640px] border-collapse text-sm">
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
        {FISH.map((f) => (
          <tr key={f.key} className="border-b border-[#2d3d2d]/50 text-[#c8bca8]">
            <th scope="row" className="px-3 py-2 text-left font-medium text-[#e8dcc8]">
              {pick(f.name, locale)}
            </th>
            <td className="px-3 py-2">{f.seasons.map((s) => pick(SEASONS[s], locale)).join(', ')}</td>
            <td className="px-3 py-2">{f.locations.map(locName).join(', ')}</td>
            <td className="px-3 py-2">{f.time}</td>
            <td className="px-3 py-2">{pick(WEATHER[f.weather], locale)}</td>
            <td className="px-3 py-2">{f.price}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
```

注：鱼名单元格用 `<th scope="row">`（语义化行头），因此每行有一个 columnheader 之外的 rowheader；测试用 `getAllByRole('row')` 计数不受影响（行数 = FISH.length + 1 表头行）。

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run src/__tests__/tools/FishReferenceTable.test.tsx`
Expected: PASS。若 `getByText('岩浆鳗鱼')` 失败，核对 `stardewFishData.ts` 中 Lava Eel 的 `zh` 名（应为「岩浆鳗鱼」）并对齐断言。

- [ ] **Step 5: Commit**

```bash
git add src/components/tools/seo/FishReferenceTable.tsx src/__tests__/tools/FishReferenceTable.test.tsx
git commit -m "feat(tools-seo): server-rendered localized fish reference table"
```

---

### Task 4: 接入 stardew-fish 页面

**Files:**
- Modify: `src/app/[locale]/tools/stardew-fish/page.tsx`

**Interfaces:**
- Consumes: Task 1 `fishSummary`/`getFishFaqs`；Task 2 `ToolReference`；Task 3 `FishReferenceTable`.
- Produces: 无对外接口——在交互 finder 后、相关工具页脚前渲染 `<ToolReference>{<FishReferenceTable/>}</ToolReference>`。

- [ ] **Step 1: 加 import**

在 `src/app/[locale]/tools/stardew-fish/page.tsx` 顶部 import 区加入：

```tsx
import { ToolReference } from '@/components/tools/seo/ToolReference'
import { FishReferenceTable } from '@/components/tools/seo/FishReferenceTable'
import { fishSummary, getFishFaqs } from '@/lib/tools/seo/fishSeoContent'
```

- [ ] **Step 2: 插入内容区块**

在 `<StardewFishFinder locale={locale} />` 之后、`{/* Related links */}` 之前插入：

```tsx
<ToolReference
  locale={locale}
  tableTitle={getLoc(locale, '完整鱼类列表', 'Complete Fish List', '完整魚類列表', '全魚リスト', '전체 물고기 목록', 'Vollständige Fischliste')}
  summary={fishSummary(locale)}
  faqs={getFishFaqs(locale)}
>
  <FishReferenceTable locale={locale} />
</ToolReference>
```

（`getLoc` 是该文件已有的本地化 helper：`getLoc(locale, zh, en, zhTW?, ja?, ko?, de?)`。）

- [ ] **Step 3: 类型检查 + 全量测试**

Run: `npx tsc --noEmit && npx vitest run`
Expected: tsc 无错误；全部测试 PASS。

- [ ] **Step 4: 构建冒烟**

Run: `npm run build`
Expected: 构建成功（静态生成 stardew-fish 全部 locale 页），无与本次改动相关的报错。

- [ ] **Step 5: Commit**

```bash
git add "src/app/[locale]/tools/stardew-fish/page.tsx"
git commit -m "feat(tools): add crawlable reference table + FAQ to fish tool page"
```

---

## Self-Review

**Spec coverage：**
- 可复用骨架 `ToolReference`（外壳 + FAQ + schema）→ Task 2。✓
- 服务端数据表 `FishReferenceTable`（6 语言、语义化 table、caption）→ Task 3。✓
- 数据驱动摘要（6 语言）+ FAQ（EN/ZH，其余 []）→ Task 1。✓
- FAQPage schema 复用 `faqSchema`、空 FAQ 不注入 → Task 2。✓
- 页面接入、放 finder 后/页脚前、H1+多 H2、工具本体不动 → Task 4 + Global Constraints。✓
- 摘要事实运行时计算不硬编码、未知 locale 回退、移动端横向滚动 → Task 1 / Task 2 / Task 3。✓
- 测试置于 `src/__tests__/`、Vitest → 各任务测试路径。✓

**Placeholder scan：** 无 TBD/TODO；每个代码步骤含完整代码，含 FAQ 实际文案（EN+ZH）。✓

**Type consistency：** `Faq`/`{q,a}` 结构在 Task 1 与 Task 2 一致；`ToolReferenceProps`、`FishReferenceTableProps`、`fishSummary`、`getFishFaqs` 命名前后一致；`FishLoc`/`Season`/`Weather` 均来自 `stardewFishData`。✓
