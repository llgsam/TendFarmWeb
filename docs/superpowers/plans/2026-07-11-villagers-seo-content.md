# stardew-villagers 服务端可爬内容 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 给 stardew-villagers 工具页补上服务端渲染的可爬内容——扁平村民名录表（5 列：村民/生日/居住地/可结婚/最爱礼物）+ 数据驱动摘要（6 语言）+ FAQ（EN/ZH）+ FAQPage schema，复用 `ToolReference` 骨架、共享 `pickLoc`/`SEASONS` 与 `content.ts` helpers，交互工具本体不动。

**Architecture:** 复用 `ToolReference`（不改）、`pickLoc`/`SEASONS`（`@/lib/tools/seo/locale`）、`byLocale`/`faqsByLocale`/`Faq`（`@/lib/tools/seo/content`）；新增 `VillagerReferenceTable`（村民表）与 `villagerSeoContent`（摘要 + FAQ）。全部 sync server 组件/纯函数。

**Tech Stack:** Next.js App Router（server components）、TypeScript、Vitest + @testing-library/react（jsdom）、Tailwind（深绿农场主题）。

## Global Constraints

- 6 语言 locale：`zh`、`zh-TW`、`ja`、`ko`、`de`、`en`；未知/缺失回退 `en`（`pickLoc`/`byLocale` 保证；标签映射用 `?? .en`）。
- FAQ 仅 `en` + `zh`（用 `faqsByLocale`）。摘要 + 表全 6 语言。
- 摘要事实从数据运行时计算（村民数、可结婚数），**不硬编码数字**。
- 不修改 `StardewVillagerFinder`、`ToolReference`、`locale.ts`、`content.ts`。
- 复用共享 `pickLoc`/`SEASONS`/`byLocale`/`faqsByLocale`（不重定义本地版本；生日季节标签用共享 `SEASONS`）。
- 内容区块放在 `<StardewVillagerFinder locale={locale} />` 之后、其后 `<div className="mt-12 border-t border-[#2d3d2d] pt-8">` 之前。一个 H1 + 多 H2。
- 复用 `faqSchema`（骨架内部注入）。深绿配色。移动端表 `overflow-x-auto`（骨架）+ `min-w-[760px]`。
- 测试置于 `src/__tests__/`。无 `console.log`；不可变写法。FAQ drift-safe（不硬编码具体村民名/数量）。
- 数据事实（供核对，勿写死进逻辑）：34 位村民；12 位 marriageable；首位 Alex（summer 13, marriageable, region "1 River Road (Pelican Town)"）。
- 每个任务结束提交一次。

---

### Task 1: `villagerSeoContent`（摘要 + FAQ）

**Files:**
- Create: `src/lib/tools/seo/villagerSeoContent.ts`
- Test: `src/__tests__/lib/villagerSeoContent.test.ts`

**Interfaces:**
- Consumes: `VILLAGERS` from `@/components/tools/stardewVillagerData`; `byLocale`/`faqsByLocale`/`Faq` from `@/lib/tools/seo/content`.
- Produces: `export function villagerSummary(locale: string): string`；`export function getVillagerFaqs(locale: string): Faq[]`。

- [ ] **Step 1: Write the failing test**

`src/__tests__/lib/villagerSeoContent.test.ts`:

```ts
import { describe, it, expect } from 'vitest'
import { villagerSummary, getVillagerFaqs } from '@/lib/tools/seo/villagerSeoContent'
import { VILLAGERS } from '@/components/tools/stardewVillagerData'

const marriageable = VILLAGERS.filter((v) => v.marriageable).length

describe('villagerSummary', () => {
  it('states the real villager count for en', () => {
    expect(villagerSummary('en')).toContain(String(VILLAGERS.length))
  })
  it('states the marriageable count', () => {
    expect(villagerSummary('en')).toContain(String(marriageable))
  })
  it('uses the zh template', () => {
    expect(villagerSummary('zh')).toContain('村民')
  })
  it('falls back to en for unknown locale', () => {
    expect(villagerSummary('xx')).toContain(String(VILLAGERS.length))
  })
})

describe('getVillagerFaqs', () => {
  it('returns 4 authored FAQs for en and zh', () => {
    expect(getVillagerFaqs('en')).toHaveLength(4)
    expect(getVillagerFaqs('zh')).toHaveLength(4)
    for (const f of [...getVillagerFaqs('en'), ...getVillagerFaqs('zh')]) {
      expect(f.q.length).toBeGreaterThan(0)
      expect(f.a.length).toBeGreaterThan(0)
    }
  })
  it('returns [] for locales without authored FAQs', () => {
    for (const loc of ['zh-TW', 'ja', 'ko', 'de', 'xx']) {
      expect(getVillagerFaqs(loc)).toEqual([])
    }
  })
  it('en FAQ mentions the Mermaid’s Pendant marriage item', () => {
    expect(getVillagerFaqs('en').some((f) => f.a.includes("Mermaid's Pendant"))).toBe(true)
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/__tests__/lib/villagerSeoContent.test.ts`
Expected: FAIL —「Cannot find module '@/lib/tools/seo/villagerSeoContent'」。

- [ ] **Step 3: Write minimal implementation**

`src/lib/tools/seo/villagerSeoContent.ts`:

```ts
import { VILLAGERS } from '@/components/tools/stardewVillagerData'
import { byLocale, faqsByLocale, type Faq } from '@/lib/tools/seo/content'

function facts() {
  const total = VILLAGERS.length
  const marriageable = VILLAGERS.filter((v) => v.marriageable).length
  return { total, marriageable }
}

type SummaryFn = (f: ReturnType<typeof facts>) => string

const SUMMARIES: Record<string, SummaryFn> = {
  en: (f) =>
    `Stardew Valley has ${f.total} villagers you can befriend, ${f.marriageable} of them marriageable. Each has a birthday, a home region, and a set of loved gifts. The table below lists every villager with those details. Use the finder above to search, or browse the full directory.`,
  zh: (f) =>
    `星露谷物语有 ${f.total} 位可以交好感的村民，其中 ${f.marriageable} 位可以结婚。每位都有生日、居住地和一组最爱的礼物。下方表格列出了每位村民的这些信息。用上面的查询器搜索，或查看完整名录。`,
  'zh-TW': (f) =>
    `星露谷物語有 ${f.total} 位可以交好感的村民，其中 ${f.marriageable} 位可以結婚。每位都有生日、居住地和一組最愛的禮物。下方表格列出了每位村民的這些資訊。用上面的查詢器搜尋，或查看完整名錄。`,
  ja: (f) =>
    `スターデューバレーには友好度を上げられる村人が ${f.total} 人おり、うち ${f.marriageable} 人と結婚できます。それぞれ誕生日・居住地・大好きな贈り物があります。下の表に各村人のこれらの情報を掲載。上の検索もどうぞ。`,
  ko: (f) =>
    `스타듀 밸리에는 친해질 수 있는 주민이 ${f.total}명 있으며 그중 ${f.marriageable}명과 결혼할 수 있습니다. 각자 생일, 거주지, 좋아하는 선물이 있습니다. 아래 표에 각 주민의 정보를 정리했습니다.`,
  de: (f) =>
    `Stardew Valley hat ${f.total} Bewohner, mit denen du dich anfreunden kannst, ${f.marriageable} davon heiratbar. Jeder hat einen Geburtstag, einen Wohnort und Lieblingsgeschenke. Die Tabelle unten listet jeden Bewohner mit diesen Angaben auf.`,
}

export function villagerSummary(locale: string): string {
  return byLocale(SUMMARIES, locale)(facts())
}

const VILLAGER_FAQS: Record<'en' | 'zh', Faq[]> = {
  en: [
    {
      q: 'Who can you marry in Stardew Valley?',
      a: "The marriage candidates are the villagers marked 'Yes' in the Marriageable column above. Raise one to 8 hearts, give them a Bouquet to start dating, then propose with a Mermaid's Pendant (bought from the Old Mariner at the beach on rainy days).",
    },
    {
      q: 'How do you increase friendship with villagers in Stardew Valley?',
      a: 'Talk to villagers every day and give them gifts they like — a loved gift is best. You can give each villager up to 2 gifts per week, plus one on their birthday, which counts eight times as much. See our gift guide for exactly what each villager loves.',
    },
    {
      q: 'When are villagers’ birthdays in Stardew Valley?',
      a: 'Every villager’s birthday is listed in the Birthday column above as a season and day. Giving a loved gift on a villager’s birthday grants eight times the usual friendship, so birthdays are the fastest way to build a relationship.',
    },
    {
      q: 'Where do villagers live in Stardew Valley?',
      a: 'Each villager’s home is shown in the Region column above. Most live in and around Pelican Town, while others live in the mountains to the north, out by the beach, or in Cindersap Forest to the south.',
    },
  ],
  zh: [
    {
      q: '星露谷物语里可以和谁结婚？',
      a: '可结婚的对象就是上表「可结婚」列标「是」的村民。把好感度提到 8 颗心，送花束（Bouquet）开始约会，再送美人鱼吊坠（雨天在海滩的老水手处购买）求婚即可。',
    },
    {
      q: '星露谷怎么提升和村民的好感度？',
      a: '每天和村民交谈，并送他们喜欢的礼物——爱的礼物效果最好。每位村民每周最多送 2 次，外加生日当天 1 次（生日好感度 ×8）。每位村民具体爱什么，见我们的送礼查询。',
    },
    {
      q: '星露谷村民的生日都是什么时候？',
      a: '每位村民的生日都在上表「生日」列，按季节和日期标注。在村民生日当天送出爱的礼物，好感度是平时的 8 倍，所以生日是拉好感最快的时机。',
    },
    {
      q: '星露谷的村民都住在哪里？',
      a: '每位村民的住处见上表「居住地」列。多数住在鹈鹕镇及周边，也有人住在北边的山区、海滩，或南边的仙尘森林。',
    },
  ],
}

export function getVillagerFaqs(locale: string): Faq[] {
  return faqsByLocale(VILLAGER_FAQS, locale)
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run src/__tests__/lib/villagerSeoContent.test.ts`
Expected: PASS。

- [ ] **Step 5: Commit**

```bash
git add src/lib/tools/seo/villagerSeoContent.ts src/__tests__/lib/villagerSeoContent.test.ts
git commit -m "feat(tools-seo): villager summary + EN/ZH FAQ content"
```

---

### Task 2: `VillagerReferenceTable`（村民名录表）

**Files:**
- Create: `src/components/tools/seo/VillagerReferenceTable.tsx`
- Test: `src/__tests__/tools/VillagerReferenceTable.test.tsx`

**Interfaces:**
- Consumes: `VILLAGERS` from `@/components/tools/stardewVillagerData`; `pickLoc`、`SEASONS` from `@/lib/tools/seo/locale`.
- Produces: `export interface VillagerReferenceTableProps { locale: string }`；`export function VillagerReferenceTable(props): JSX.Element`（村民表，行数 = `VILLAGERS.length`）。

- [ ] **Step 1: Write the failing test**

`src/__tests__/tools/VillagerReferenceTable.test.tsx`:

```tsx
import { describe, it, expect } from 'vitest'
import { render, screen, within } from '@testing-library/react'
import { VillagerReferenceTable } from '@/components/tools/seo/VillagerReferenceTable'
import { VILLAGERS } from '@/components/tools/stardewVillagerData'

describe('VillagerReferenceTable', () => {
  it('renders one row per villager plus a header row', () => {
    render(<VillagerReferenceTable locale="en" />)
    const table = screen.getByRole('table')
    expect(within(table).getAllByRole('row')).toHaveLength(VILLAGERS.length + 1)
  })

  it('renders the five column headers (en)', () => {
    render(<VillagerReferenceTable locale="en" />)
    for (const h of ['Villager', 'Birthday', 'Region', 'Marriageable', 'Loved Gifts']) {
      expect(screen.getByRole('columnheader', { name: h })).toBeInTheDocument()
    }
  })

  it('localizes a villager name (en + zh)', () => {
    const { rerender } = render(<VillagerReferenceTable locale="en" />)
    expect(screen.getByText('Alex')).toBeInTheDocument()
    rerender(<VillagerReferenceTable locale="zh" />)
    expect(screen.getByText('亚历克斯')).toBeInTheDocument()
  })

  it('marks marriageable villagers with a localized Yes', () => {
    render(<VillagerReferenceTable locale="en" />)
    const yesCount = VILLAGERS.filter((v) => v.marriageable).length
    expect(screen.getAllByText('Yes')).toHaveLength(yesCount)
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/__tests__/tools/VillagerReferenceTable.test.tsx`
Expected: FAIL —「Cannot find module '@/components/tools/seo/VillagerReferenceTable'」。

- [ ] **Step 3: Write minimal implementation**

`src/components/tools/seo/VillagerReferenceTable.tsx`:

```tsx
import { VILLAGERS } from '@/components/tools/stardewVillagerData'
import { pickLoc, SEASONS } from '@/lib/tools/seo/locale'

export interface VillagerReferenceTableProps {
  locale: string
}

function sep(locale: string): string {
  return locale === 'zh' || locale === 'zh-TW' || locale === 'ja' || locale === 'ko' ? '、' : ', '
}

const HEADERS: Record<string, [string, string, string, string, string]> = {
  en: ['Villager', 'Birthday', 'Region', 'Marriageable', 'Loved Gifts'],
  zh: ['村民', '生日', '居住地', '可结婚', '最爱礼物'],
  'zh-TW': ['村民', '生日', '居住地', '可結婚', '最愛禮物'],
  ja: ['村人', '誕生日', '居住地', '結婚可能', '大好きな贈り物'],
  ko: ['주민', '생일', '거주지', '결혼 가능', '좋아하는 선물'],
  de: ['Bewohner', 'Geburtstag', 'Wohnort', 'Heiratbar', 'Lieblingsgeschenke'],
}

const YES: Record<string, string> = {
  en: 'Yes',
  zh: '是',
  'zh-TW': '是',
  ja: 'はい',
  ko: '예',
  de: 'Ja',
}

const CAPTION: Record<string, string> = {
  en: 'Complete Stardew Valley villager directory — birthday, home region, marriageability, and loved gifts',
  zh: '星露谷物语完整村民名录——生日、居住地、可否结婚与最爱礼物',
  'zh-TW': '星露谷物語完整村民名錄——生日、居住地、可否結婚與最愛禮物',
  ja: 'スターデューバレー全村人名鑑——誕生日・居住地・結婚可否・大好きな贈り物',
  ko: '스타듀 밸리 전체 주민 명단 — 생일·거주지·결혼 가능 여부·좋아하는 선물',
  de: 'Vollständiges Bewohnerverzeichnis — Geburtstag, Wohnort, Heiratbarkeit und Lieblingsgeschenke',
}

export function VillagerReferenceTable({ locale }: VillagerReferenceTableProps) {
  const headers = HEADERS[locale] ?? HEADERS.en
  const yes = YES[locale] ?? YES.en
  const s = sep(locale)

  return (
    <table className="w-full min-w-[760px] border-collapse text-sm">
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
        {VILLAGERS.map((v) => (
          <tr key={v.key} className="border-b border-[#2d3d2d]/50 align-top text-[#c8bca8]">
            <th scope="row" className="px-3 py-2 text-left font-medium text-[#e8dcc8]">
              {pickLoc(v.name, locale)}
            </th>
            <td className="whitespace-nowrap px-3 py-2">
              {pickLoc(SEASONS[v.birthday.season], locale)} {v.birthday.day}
            </td>
            <td className="px-3 py-2">{pickLoc(v.region, locale)}</td>
            <td className="whitespace-nowrap px-3 py-2">{v.marriageable ? yes : '—'}</td>
            <td className="px-3 py-2">{v.lovedGifts.map((g) => pickLoc(g, locale)).join(s)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run src/__tests__/tools/VillagerReferenceTable.test.tsx`
Expected: PASS。若 `getByText('亚历克斯')` 失败，核对 `stardewVillagerData.ts` 中 Alex 的 zh 名并对齐断言。

- [ ] **Step 5: Commit**

```bash
git add src/components/tools/seo/VillagerReferenceTable.tsx src/__tests__/tools/VillagerReferenceTable.test.tsx
git commit -m "feat(tools-seo): server-rendered villager directory reference table"
```

---

### Task 3: 接入 stardew-villagers 页面

**Files:**
- Modify: `src/app/[locale]/tools/stardew-villagers/page.tsx`

**Interfaces:**
- Consumes: Task 1 `villagerSummary`/`getVillagerFaqs`；Task 2 `VillagerReferenceTable`；已存在的 `ToolReference`.

- [ ] **Step 1: 加 import**

```tsx
import { ToolReference } from '@/components/tools/seo/ToolReference'
import { VillagerReferenceTable } from '@/components/tools/seo/VillagerReferenceTable'
import { villagerSummary, getVillagerFaqs } from '@/lib/tools/seo/villagerSeoContent'
```

- [ ] **Step 2: 插入内容区块**

在 `<StardewVillagerFinder locale={locale} />` 之后、其后 `<div className="mt-12 border-t border-[#2d3d2d] pt-8">` 之前插入：

```tsx
<ToolReference
  locale={locale}
  tableTitle={getLoc(locale, '完整村民名录', 'Complete Villager Directory', '完整村民名錄', '全村人名鑑', '전체 주민 명단', 'Vollständiges Bewohnerverzeichnis')}
  summary={villagerSummary(locale)}
  faqs={getVillagerFaqs(locale)}
>
  <VillagerReferenceTable locale={locale} />
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
git add "src/app/[locale]/tools/stardew-villagers/page.tsx"
git commit -m "feat(tools): add crawlable villager directory + FAQ to villagers tool page"
```

---

## Self-Review

**Spec coverage：** 5 列村民表（6 语言、caption、生日用共享 SEASONS、可结婚 Yes/—、居住地/礼物本地化）→ Task 2；数据驱动摘要 + EN/ZH FAQ（用 content.ts helpers）→ Task 1；复用 ToolReference/pickLoc/SEASONS/byLocale/faqsByLocale → Task 1/2/3；页面接入、finder 后/页脚前 → Task 3。✓
**Placeholder scan：** 无 TBD；每步含完整代码 + FAQ 文案（EN+ZH），drift-safe。✓
**Type consistency：** `Faq` 来自 content.ts；`villagerSummary`/`getVillagerFaqs`/`VillagerReferenceTableProps` 一致；`pickLoc`/`SEASONS` 来自 locale.ts；生日 `SEASONS[v.birthday.season]`。✓
