# stardew-museum 服务端可爬内容 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 给 stardew-museum 工具页补上服务端渲染的可爬内容——捐赠里程碑列表 + 扁平物品表（3 列：物品/分类/在哪获得）+ 数据驱动摘要（6 语言）+ FAQ（EN/ZH）+ FAQPage schema，复用 `ToolReference` 骨架、共享 `pickLoc` 与 `content.ts` helpers，交互工具本体不动。

**Architecture:** 复用 `ToolReference`（不改）、`pickLoc`（`@/lib/tools/seo/locale`）、`byLocale`/`faqsByLocale`/`Faq`（`@/lib/tools/seo/content`）；新增 `MuseumReferenceTable`（里程碑 + 物品表）与 `museumSeoContent`（摘要 + FAQ）。全部 sync server 组件/纯函数。

**Tech Stack:** Next.js App Router（server components）、TypeScript、Vitest + @testing-library/react（jsdom）、Tailwind（深绿农场主题）。

## Global Constraints

- 6 语言 locale：`zh`、`zh-TW`、`ja`、`ko`、`de`、`en`；未知/缺失回退 `en`（`pickLoc`/`byLocale` 保证；标签映射用 `?? .en`）。
- FAQ 仅 `en` + `zh`（用 `faqsByLocale`，其余 locale 返回 `[]`）。摘要 + 表全 6 语言。
- 摘要事实从数据运行时计算（总数、古物数、矿物数），**不硬编码数字**。
- 不修改 `StardewMuseumFinder`、`ToolReference`、`locale.ts`、`content.ts`。
- 复用共享 `pickLoc`/`byLocale`/`faqsByLocale`（不重定义本地版本）。
- 内容区块放在 `<StardewMuseumFinder locale={locale} />` 之后、其后 `<div className="mt-12 border-t border-[#2d3d2d] pt-8">` 之前。一个 H1 + 多 H2。
- 复用 `faqSchema`（骨架内部注入）。深绿配色。移动端表 `overflow-x-auto`（骨架）+ `min-w-[720px]`。
- 测试置于 `src/__tests__/`。无 `console.log`；不可变写法。
- 数据事实（供核对，勿写死进逻辑）：95 件（42 artifact + 53 mineral）；MUSEUM_MILESTONES 里 threshold 60 = Rusty Key（生锈钥匙，通下水道）；示例物品 Dwarf Scroll I（artifact）。
- 每个任务结束提交一次。

---

### Task 1: `museumSeoContent`（摘要 + FAQ）

**Files:**
- Create: `src/lib/tools/seo/museumSeoContent.ts`
- Test: `src/__tests__/lib/museumSeoContent.test.ts`

**Interfaces:**
- Consumes: `MUSEUM_ITEMS` from `@/components/tools/stardewMuseumData`; `byLocale`/`faqsByLocale`/`Faq` from `@/lib/tools/seo/content`.
- Produces: `export function museumSummary(locale: string): string`；`export function getMuseumFaqs(locale: string): Faq[]`。

- [ ] **Step 1: Write the failing test**

`src/__tests__/lib/museumSeoContent.test.ts`:

```ts
import { describe, it, expect } from 'vitest'
import { museumSummary, getMuseumFaqs } from '@/lib/tools/seo/museumSeoContent'
import { MUSEUM_ITEMS } from '@/components/tools/stardewMuseumData'

const artifacts = MUSEUM_ITEMS.filter((i) => i.category === 'artifact').length

describe('museumSummary', () => {
  it('states the real total item count for en', () => {
    expect(museumSummary('en')).toContain(String(MUSEUM_ITEMS.length))
  })
  it('states the artifact count', () => {
    expect(museumSummary('en')).toContain(String(artifacts))
  })
  it('uses the zh template', () => {
    expect(museumSummary('zh')).toContain('博物馆')
  })
  it('falls back to en for unknown locale', () => {
    expect(museumSummary('xx')).toContain(String(MUSEUM_ITEMS.length))
  })
})

describe('getMuseumFaqs', () => {
  it('returns 4 authored FAQs for en and zh', () => {
    expect(getMuseumFaqs('en')).toHaveLength(4)
    expect(getMuseumFaqs('zh')).toHaveLength(4)
    for (const f of [...getMuseumFaqs('en'), ...getMuseumFaqs('zh')]) {
      expect(f.q.length).toBeGreaterThan(0)
      expect(f.a.length).toBeGreaterThan(0)
    }
  })
  it('returns [] for locales without authored FAQs', () => {
    for (const loc of ['zh-TW', 'ja', 'ko', 'de', 'xx']) {
      expect(getMuseumFaqs(loc)).toEqual([])
    }
  })
  it('en FAQ mentions Gunther', () => {
    expect(getMuseumFaqs('en').some((f) => f.a.includes('Gunther'))).toBe(true)
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/__tests__/lib/museumSeoContent.test.ts`
Expected: FAIL —「Cannot find module '@/lib/tools/seo/museumSeoContent'」。

- [ ] **Step 3: Write minimal implementation**

`src/lib/tools/seo/museumSeoContent.ts`:

```ts
import { MUSEUM_ITEMS } from '@/components/tools/stardewMuseumData'
import { byLocale, faqsByLocale, type Faq } from '@/lib/tools/seo/content'

function facts() {
  const total = MUSEUM_ITEMS.length
  const artifacts = MUSEUM_ITEMS.filter((i) => i.category === 'artifact').length
  const minerals = total - artifacts
  return { total, artifacts, minerals }
}

type SummaryFn = (f: ReturnType<typeof facts>) => string

const SUMMARIES: Record<string, SummaryFn> = {
  en: (f) =>
    `Stardew Valley's Museum accepts ${f.total} donatable items — ${f.artifacts} artifacts and ${f.minerals} minerals. Donating reaches reward milestones and, once complete, restores the full collection. The table below lists every item with its category and where to find it. Use the finder above to search, or browse the full list.`,
  zh: (f) =>
    `星露谷物语的博物馆可捐赠 ${f.total} 件物品——${f.artifacts} 件古物和 ${f.minerals} 件矿物。捐赠会达到奖励里程碑，全部捐齐即可完成整个收藏。下方表格列出了每件物品的分类和获得方式。用上面的查询器搜索，或查看完整清单。`,
  'zh-TW': (f) =>
    `星露谷物語的博物館可捐贈 ${f.total} 件物品——${f.artifacts} 件古物和 ${f.minerals} 件礦物。捐贈會達到獎勵里程碑，全部捐齊即可完成整個收藏。下方表格列出了每件物品的分類和獲得方式。用上面的查詢器搜尋，或查看完整清單。`,
  ja: (f) =>
    `スターデューバレーの博物館には ${f.total} 個の寄贈できるアイテム（発掘品 ${f.artifacts} 個と鉱物 ${f.minerals} 個）があります。寄贈すると報酬のマイルストーンに到達し、すべて集めるとコレクションが完成します。下の表に各アイテムの分類と入手場所を掲載。上の検索もどうぞ。`,
  ko: (f) =>
    `스타듀 밸리의 박물관은 ${f.total}개의 기증 가능한 아이템(유물 ${f.artifacts}개와 광물 ${f.minerals}개)을 받습니다. 기증하면 보상 이정표에 도달하고, 모두 모으면 컬렉션이 완성됩니다. 아래 표에 각 아이템의 분류와 입수 장소를 정리했습니다.`,
  de: (f) =>
    `Das Museum in Stardew Valley nimmt ${f.total} spendbare Gegenstände an — ${f.artifacts} Artefakte und ${f.minerals} Mineralien. Spenden erreicht Belohnungs-Meilensteine und vervollständigt schließlich die Sammlung. Die Tabelle unten listet jeden Gegenstand mit Kategorie und Fundort.`,
}

export function museumSummary(locale: string): string {
  return byLocale(SUMMARIES, locale)(facts())
}

const MUSEUM_FAQS: Record<'en' | 'zh', Faq[]> = {
  en: [
    {
      q: 'How do you donate to the Museum in Stardew Valley?',
      a: 'You donate at the Museum & Library in Pelican Town, run by Gunther. Bring any artifact or mineral you have not donated yet and give it to him — he adds it to the display. Donations are permanent and count toward reward milestones.',
    },
    {
      q: 'How do you find artifacts and minerals in Stardew Valley?',
      a: "Artifacts come from digging artifact spots (the wiggling worm tiles), tilling dirt, panning, and some monster drops. Minerals come from mining ore and gem nodes, cracking open geodes at Clint's blacksmith, and foraging. The 'Where to Find' column above lists the exact source for every donatable item.",
    },
    {
      q: 'What rewards do you get for donating to the Museum?',
      a: 'Donating reaches reward milestones — the list above shows what you get at each donation count, from seeds and decorations to the Rusty Key (at 60 donations) that unlocks the Sewers. Donating the full collection earns a final reward, and rewards are given automatically as you cross each threshold.',
    },
    {
      q: 'Where is the Museum in Stardew Valley?',
      a: 'The Museum is in Pelican Town, just north of the town square, in the same building as the Library. Talk to Gunther at the counter and choose to donate; he will take any eligible artifact or mineral you are carrying.',
    },
  ],
  zh: [
    {
      q: '星露谷物语怎么向博物馆捐赠？',
      a: '在鹈鹕镇的「博物馆兼图书馆」捐赠，由 Gunther 管理。把任何还没捐过的古物或矿物交给他，他会加入展示。捐赠是永久的，并计入奖励里程碑。',
    },
    {
      q: '星露谷的古物和矿物在哪里找？',
      a: '古物来自挖掘「古物点」（地上蠕动的点）、锄地、淘洗，以及部分怪物掉落。矿物来自开采矿石和宝石矿脉、在 Clint 铁匠铺敲开晶球，以及采集。上表的「在哪获得」列列出了每件可捐物品的确切来源。',
    },
    {
      q: '向博物馆捐赠能得到什么奖励？',
      a: '捐赠达到里程碑会给奖励——上方列表显示每个捐赠数量对应的奖励，从种子、装饰到通往下水道的「生锈钥匙」（第 60 件）。捐齐全部收藏有最终奖励，每跨过一个门槛就自动发放。',
    },
    {
      q: '星露谷的博物馆在哪里？',
      a: '博物馆位于鹈鹕镇，就在镇广场北边，与图书馆同一栋建筑。在柜台找 Gunther 选择捐赠，他会收下你携带的任何符合条件的古物或矿物。',
    },
  ],
}

export function getMuseumFaqs(locale: string): Faq[] {
  return faqsByLocale(MUSEUM_FAQS, locale)
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run src/__tests__/lib/museumSeoContent.test.ts`
Expected: PASS。

- [ ] **Step 5: Commit**

```bash
git add src/lib/tools/seo/museumSeoContent.ts src/__tests__/lib/museumSeoContent.test.ts
git commit -m "feat(tools-seo): museum summary + EN/ZH FAQ content"
```

---

### Task 2: `MuseumReferenceTable`（里程碑 + 物品表）

**Files:**
- Create: `src/components/tools/seo/MuseumReferenceTable.tsx`
- Test: `src/__tests__/tools/MuseumReferenceTable.test.tsx`

**Interfaces:**
- Consumes: `MUSEUM_ITEMS`、`MUSEUM_MILESTONES`、`MUSEUM_CATEGORIES` from `@/components/tools/stardewMuseumData`; `pickLoc` from `@/lib/tools/seo/locale`.
- Produces: `export interface MuseumReferenceTableProps { locale: string }`；`export function MuseumReferenceTable(props): JSX.Element`（里程碑 `<ul>` + 物品 `<table>`，行数 = `MUSEUM_ITEMS.length`）。

- [ ] **Step 1: Write the failing test**

`src/__tests__/tools/MuseumReferenceTable.test.tsx`:

```tsx
import { describe, it, expect } from 'vitest'
import { render, screen, within } from '@testing-library/react'
import { MuseumReferenceTable } from '@/components/tools/seo/MuseumReferenceTable'
import { MUSEUM_ITEMS } from '@/components/tools/stardewMuseumData'

describe('MuseumReferenceTable', () => {
  it('renders one row per item plus a header row', () => {
    render(<MuseumReferenceTable locale="en" />)
    const table = screen.getByRole('table')
    expect(within(table).getAllByRole('row')).toHaveLength(MUSEUM_ITEMS.length + 1)
  })

  it('renders the three column headers (en)', () => {
    render(<MuseumReferenceTable locale="en" />)
    for (const h of ['Item', 'Category', 'Where to Find']) {
      expect(screen.getByRole('columnheader', { name: h })).toBeInTheDocument()
    }
  })

  it('localizes an item name (en + zh)', () => {
    const { rerender } = render(<MuseumReferenceTable locale="en" />)
    expect(screen.getByText('Dwarf Scroll I')).toBeInTheDocument()
    rerender(<MuseumReferenceTable locale="zh" />)
    expect(screen.getByText('矮人卷轴 I')).toBeInTheDocument()
  })

  it('renders the donation milestones with a reward', () => {
    render(<MuseumReferenceTable locale="en" />)
    expect(screen.getAllByText(/→/).length).toBeGreaterThan(0)
    expect(screen.getByText(/Rusty Key/)).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/__tests__/tools/MuseumReferenceTable.test.tsx`
Expected: FAIL —「Cannot find module '@/components/tools/seo/MuseumReferenceTable'」。

- [ ] **Step 3: Write minimal implementation**

`src/components/tools/seo/MuseumReferenceTable.tsx`:

```tsx
import { MUSEUM_ITEMS, MUSEUM_MILESTONES, MUSEUM_CATEGORIES, type MuseumLoc } from '@/components/tools/stardewMuseumData'
import { pickLoc } from '@/lib/tools/seo/locale'

export interface MuseumReferenceTableProps {
  locale: string
}

const HEADERS: Record<string, [string, string, string]> = {
  en: ['Item', 'Category', 'Where to Find'],
  zh: ['物品', '分类', '在哪获得'],
  'zh-TW': ['物品', '分類', '在哪獲得'],
  ja: ['アイテム', '分類', '入手場所'],
  ko: ['아이템', '분류', '입수 장소'],
  de: ['Gegenstand', 'Kategorie', 'Fundort'],
}

const MILESTONES_HEADING: Record<string, string> = {
  en: 'Donation reward milestones',
  zh: '捐赠奖励里程碑',
  'zh-TW': '捐贈獎勵里程碑',
  ja: '寄贈報酬のマイルストーン',
  ko: '기증 보상 이정표',
  de: 'Spenden-Belohnungs-Meilensteine',
}

const CAPTION: Record<string, string> = {
  en: 'Complete Stardew Valley Museum donation list — every artifact and mineral with its category and source',
  zh: '星露谷物语博物馆完整捐赠清单——每件古物和矿物的分类与获得方式',
  'zh-TW': '星露谷物語博物館完整捐贈清單——每件古物和礦物的分類與獲得方式',
  ja: 'スターデューバレー博物館 全寄贈品リスト——各発掘品・鉱物の分類と入手場所',
  ko: '스타듀 밸리 박물관 전체 기증 목록 — 각 유물·광물의 분류와 입수 장소',
  de: 'Vollständige Museums-Spendenliste — jedes Artefakt und Mineral mit Kategorie und Fundort',
}

export function MuseumReferenceTable({ locale }: MuseumReferenceTableProps) {
  const headers = HEADERS[locale] ?? HEADERS.en
  const catName = new Map<string, MuseumLoc>(MUSEUM_CATEGORIES.map((c) => [c.key, c.name]))
  const category = (key: string): string => {
    const loc = catName.get(key)
    return loc ? pickLoc(loc, locale) : key
  }

  return (
    <>
      <div className="mb-6">
        <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-[#8a9a7a]">
          {MILESTONES_HEADING[locale] ?? MILESTONES_HEADING.en}
        </p>
        <ul className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-[#c8bca8]">
          {MUSEUM_MILESTONES.map((m) => (
            <li key={m.threshold}>
              <span className="font-semibold text-[#e8dcc8]">{m.threshold}</span> → {pickLoc(m.reward, locale)}
            </li>
          ))}
        </ul>
      </div>

      <table className="w-full min-w-[720px] border-collapse text-sm">
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
          {MUSEUM_ITEMS.map((item) => (
            <tr key={item.key} className="border-b border-[#2d3d2d]/50 align-top text-[#c8bca8]">
              <th scope="row" className="px-3 py-2 text-left font-medium text-[#e8dcc8]">
                {pickLoc(item.name, locale)}
              </th>
              <td className="whitespace-nowrap px-3 py-2">{category(item.category)}</td>
              <td className="px-3 py-2">{pickLoc(item.source, locale)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run src/__tests__/tools/MuseumReferenceTable.test.tsx`
Expected: PASS。若 `getByText('矮人卷轴 I')` 失败，核对 `stardewMuseumData.ts` 中 Dwarf Scroll I 的 zh 名并对齐断言。

- [ ] **Step 5: Commit**

```bash
git add src/components/tools/seo/MuseumReferenceTable.tsx src/__tests__/tools/MuseumReferenceTable.test.tsx
git commit -m "feat(tools-seo): server-rendered museum donation reference table"
```

---

### Task 3: 接入 stardew-museum 页面

**Files:**
- Modify: `src/app/[locale]/tools/stardew-museum/page.tsx`

**Interfaces:**
- Consumes: Task 1 `museumSummary`/`getMuseumFaqs`；Task 2 `MuseumReferenceTable`；已存在的 `ToolReference`.

- [ ] **Step 1: 加 import**

```tsx
import { ToolReference } from '@/components/tools/seo/ToolReference'
import { MuseumReferenceTable } from '@/components/tools/seo/MuseumReferenceTable'
import { museumSummary, getMuseumFaqs } from '@/lib/tools/seo/museumSeoContent'
```

- [ ] **Step 2: 插入内容区块**

在 `<StardewMuseumFinder locale={locale} />` 之后、其后 `<div className="mt-12 border-t border-[#2d3d2d] pt-8">` 之前插入：

```tsx
<ToolReference
  locale={locale}
  tableTitle={getLoc(locale, '完整捐赠物品表', 'Complete Donation List', '完整捐贈物品表', '全寄贈品リスト', '전체 기증 목록', 'Vollständige Spendenliste')}
  summary={museumSummary(locale)}
  faqs={getMuseumFaqs(locale)}
>
  <MuseumReferenceTable locale={locale} />
</ToolReference>
```

（`getLoc(locale, zh, en, zhTW?, ja?, ko?, de?)`，zh 先、en 后。该页无 `{/* Related links */}` 注释——用 finder 和其后的 `<div className="mt-12 border-t border-[#2d3d2d] pt-8">` 作锚点。）

- [ ] **Step 3: 类型检查 + 全量测试**

Run: `npx tsc --noEmit && npx vitest run`
Expected: tsc 无错误；全部测试 PASS。

- [ ] **Step 4: 构建冒烟**

Run: `npm run build`
Expected: 构建成功，无与本次改动相关的报错。

- [ ] **Step 5: Commit**

```bash
git add "src/app/[locale]/tools/stardew-museum/page.tsx"
git commit -m "feat(tools): add crawlable donation list + FAQ to museum tool page"
```

---

## Self-Review

**Spec coverage：** 里程碑 `<ul>` + 3 列物品表（6 语言、caption、分类映射、source 本地化）→ Task 2；数据驱动摘要 + EN/ZH FAQ（用 content.ts helpers）→ Task 1；复用 ToolReference/pickLoc/byLocale/faqsByLocale → Task 1/2/3；页面接入、finder 后/页脚前 → Task 3。✓
**Placeholder scan：** 无 TBD；每步含完整代码 + FAQ 文案（EN+ZH）。✓
**Type consistency：** `Faq` 来自 content.ts；`museumSummary`/`getMuseumFaqs`/`MuseumReferenceTableProps` 一致；`pickLoc` 来自 locale.ts；分类映射用 `MUSEUM_CATEGORIES`。✓
