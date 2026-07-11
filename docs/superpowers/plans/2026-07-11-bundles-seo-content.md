# stardew-bundles 服务端可爬内容 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 给 stardew-bundles 工具页补上服务端渲染的可爬内容——扁平的收集包参考表（4 列：房间/收集包/所需物品/奖励）+ 数据驱动摘要（6 语言）+ FAQ（EN/ZH）+ FAQPage schema，复用已存在的 `ToolReference` 骨架和共享 `pickLoc`，交互工具本体不动。

**Architecture:** 复用 `src/components/tools/seo/ToolReference.tsx`（不改）与 `src/lib/tools/seo/locale.ts` 的 `pickLoc`（不改）；新增 `BundleReferenceTable`（扁平表 + 品质/「选N」标签）与 `bundleSeoContent`（摘要 + FAQ）。全部 sync server 组件/纯函数。

**Tech Stack:** Next.js App Router（server components）、TypeScript、Vitest + @testing-library/react（jsdom）、Tailwind（深绿农场主题）。

## Global Constraints

- 6 语言 locale：`zh`、`zh-TW`、`ja`、`ko`、`de`、`en`；未知/缺失一律回退 `en`（`pickLoc` 已保证；模板与标签映射用 `?? .en`）。
- FAQ 仅 `en` + `zh` 手写；其余 locale `getBundleFaqs` 返回 `[]`。摘要 + 表对全部 6 语言渲染。
- 摘要事实从数据运行时计算（房间数、收集包数），**不硬编码数字**。
- 不修改 `StardewBundleFinder`、`ToolReference`、`locale.ts`。
- 复用共享 `pickLoc`（`@/lib/tools/seo/locale`）——`BundleLoc` 与 `LocLabel` 结构相同，直接传入；不定义本地 pick 函数。
- 内容区块放在 `<StardewBundleFinder locale={locale} />` 之后、其后相关工具 `<div className="mt-12 border-t border-[#2d3d2d] pt-8">` 之前。一个 H1（已有）+ 多个 H2。
- 复用 `faqSchema`（由 `ToolReference` 内部注入）。
- 配色沿用：`#0f1a0f` / `#1a2e1a` / `#2d3d2d` 边框 / `#f0a832` 强调 / `#e8dcc8` 文字 / `#8a9a7a` 弱化。
- 移动端表格由骨架 `overflow-x-auto` 包裹 + 表设 `min-w-[820px]`。
- 测试置于 `src/__tests__/`。无 `console.log`；不可变写法。
- 数据事实（供核对，勿写死进逻辑）：7 个房间；31 个收集包；7 个包 `required < items.length`（「选 N」）；4 个包给金币奖励。示例：Spring Foraging Bundle（Crafts Room，4 物品各 ×1，required 4，奖励 Spring Seeds ×30）。
- 每个任务结束提交一次。

---

### Task 1: `bundleSeoContent`（摘要 + FAQ 数据）

**Files:**
- Create: `src/lib/tools/seo/bundleSeoContent.ts`
- Test: `src/__tests__/lib/bundleSeoContent.test.ts`

**Interfaces:**
- Consumes: `BUNDLE_ROOMS` from `@/components/tools/stardewBundleData`.
- Produces:
  - `export interface Faq { q: string; a: string }`
  - `export function bundleSummary(locale: string): string`
  - `export function getBundleFaqs(locale: string): Faq[]`

- [ ] **Step 1: Write the failing test**

`src/__tests__/lib/bundleSeoContent.test.ts`:

```ts
import { describe, it, expect } from 'vitest'
import { bundleSummary, getBundleFaqs } from '@/lib/tools/seo/bundleSeoContent'
import { BUNDLE_ROOMS } from '@/components/tools/stardewBundleData'

const bundleCount = BUNDLE_ROOMS.reduce((n, r) => n + r.bundles.length, 0)

describe('bundleSummary', () => {
  it('states the real bundle count for en', () => {
    expect(bundleSummary('en')).toContain(String(bundleCount))
  })
  it('states the room count', () => {
    expect(bundleSummary('en')).toContain(String(BUNDLE_ROOMS.length))
  })
  it('uses the zh template', () => {
    expect(bundleSummary('zh')).toContain('社区中心')
  })
  it('falls back to en for unknown locale', () => {
    expect(bundleSummary('xx')).toContain(String(bundleCount))
  })
})

describe('getBundleFaqs', () => {
  it('returns 4 authored FAQs for en and zh', () => {
    expect(getBundleFaqs('en')).toHaveLength(4)
    expect(getBundleFaqs('zh')).toHaveLength(4)
    for (const f of [...getBundleFaqs('en'), ...getBundleFaqs('zh')]) {
      expect(f.q.length).toBeGreaterThan(0)
      expect(f.a.length).toBeGreaterThan(0)
    }
  })
  it('returns [] for locales without authored FAQs', () => {
    for (const loc of ['zh-TW', 'ja', 'ko', 'de', 'xx']) {
      expect(getBundleFaqs(loc)).toEqual([])
    }
  })
  it('en FAQ mentions the JojaMart alternative', () => {
    expect(getBundleFaqs('en').some((f) => f.a.includes('JojaMart'))).toBe(true)
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/__tests__/lib/bundleSeoContent.test.ts`
Expected: FAIL —「Cannot find module '@/lib/tools/seo/bundleSeoContent'」。

- [ ] **Step 3: Write minimal implementation**

`src/lib/tools/seo/bundleSeoContent.ts`:

```ts
import { BUNDLE_ROOMS } from '@/components/tools/stardewBundleData'

export interface Faq {
  q: string
  a: string
}

function facts() {
  const roomCount = BUNDLE_ROOMS.length
  const bundleCount = BUNDLE_ROOMS.reduce((n, r) => n + r.bundles.length, 0)
  return { roomCount, bundleCount }
}

type SummaryFn = (f: ReturnType<typeof facts>) => string

const SUMMARIES: Record<string, SummaryFn> = {
  en: (f) =>
    `Stardew Valley's Community Center has ${f.roomCount} rooms and ${f.bundleCount} bundles to complete. Each bundle asks for a set of items and gives a reward; finishing every bundle restores the Community Center. The table below lists every bundle with its required items and reward. Use the finder above to search, or browse the full list.`,
  zh: (f) =>
    `星露谷物语的社区中心共有 ${f.roomCount} 个房间、${f.bundleCount} 个收集包。每个收集包需要一组物品并给予奖励，全部完成即可修复社区中心。下方的表格列出了每个收集包的所需物品和奖励。用上面的查询器搜索，或查看完整清单。`,
  'zh-TW': (f) =>
    `星露谷物語的社區中心共有 ${f.roomCount} 個房間、${f.bundleCount} 個收集包。每個收集包需要一組物品並給予獎勵，全部完成即可修復社區中心。下方的表格列出了每個收集包的所需物品和獎勵。用上面的查詢器搜尋，或查看完整清單。`,
  ja: (f) =>
    `スターデューバレーのコミュニティセンターには ${f.roomCount} 部屋、${f.bundleCount} 個のバンドルがあります。各バンドルは決まったアイテムを要求し報酬をくれます。すべて達成するとコミュニティセンターが修復されます。下の表に各バンドルの必要アイテムと報酬を掲載。上の検索もどうぞ。`,
  ko: (f) =>
    `스타듀 밸리의 마을 회관에는 ${f.roomCount}개의 방과 ${f.bundleCount}개의 꾸러미가 있습니다. 각 꾸러미는 정해진 아이템을 요구하고 보상을 줍니다. 모든 꾸러미를 완성하면 마을 회관이 복구됩니다. 아래 표에 각 꾸러미의 필요 아이템과 보상을 정리했습니다.`,
  de: (f) =>
    `Das Gemeinschaftszentrum in Stardew Valley hat ${f.roomCount} Räume und ${f.bundleCount} Bündel. Jedes Bündel verlangt bestimmte Gegenstände und gibt eine Belohnung; alle abzuschließen stellt das Zentrum wieder her. Die Tabelle unten listet jedes Bündel mit benötigten Gegenständen und Belohnung auf.`,
}

export function bundleSummary(locale: string): string {
  const fn = SUMMARIES[locale] ?? SUMMARIES.en
  return fn(facts())
}

const BUNDLE_FAQS: Record<'en' | 'zh', Faq[]> = {
  en: [
    {
      q: 'What is the Community Center in Stardew Valley?',
      a: 'The Community Center is a run-down building in Pelican Town that you restore by completing bundles — sets of items you donate to the Junimos. Finishing a room’s bundles unlocks a reward (such as the Greenhouse or a Minecart), and completing every bundle fully restores the Center. The alternative is the JojaMart membership route, which replaces bundles with paid upgrades.',
    },
    {
      q: 'How do bundles work in Stardew Valley?',
      a: "Each bundle asks for a specific set of items — sometimes all of them, sometimes a choice of a few from a longer list (shown as 'pick N' in the table above). Some items must meet a minimum quality (Gold, Silver, or Iridium). Donate the required items to complete the bundle; finishing all bundles in a room grants that room's reward. The Items Needed column lists exactly what each bundle wants.",
    },
    {
      q: 'What do you get for completing the Community Center in Stardew Valley?',
      a: 'Each room grants a reward as you complete it — examples include the Greenhouse, the Minecart network, and repairing the bus to open the Desert. Completing every bundle triggers a town celebration and permanently restores the Community Center. It is the classic, free path, and its rewards are generally better long-term than the paid Joja route.',
    },
    {
      q: 'Should I complete the Community Center or join JojaMart?',
      a: 'For most players the Community Center is the better choice: it is free (bundles cost only items you gather) and its rewards, like the Greenhouse, are iconic. The JojaMart route replaces bundles with purchases costing hundreds of thousands of gold — trading time for money, worth it only if you have gold to spare and dislike collecting. You cannot do both on the same save.',
    },
  ],
  zh: [
    {
      q: '星露谷物语的社区中心是什么？',
      a: '社区中心是鹈鹕镇一座破败的建筑，你通过完成「收集包」来修复它——把成套物品捐给森林精灵 Junimo。集齐一个房间的收集包会解锁奖励（如温室、矿车），全部完成即可彻底修复社区中心。另一条路线是加入 JojaMart 会员，用付费升级取代收集包。',
    },
    {
      q: '星露谷的收集包（bundle）怎么运作？',
      a: '每个收集包要求一组特定物品——有时是全部，有时是从较长列表里选几样（上表标注「选 N」）。有些物品还要求最低品质（金、银或铱）。捐入所需物品即完成收集包；集齐一个房间的所有收集包即可获得该房间的奖励。上表的「所需物品」列列出了每个收集包的确切需求。',
    },
    {
      q: '完成星露谷社区中心能得到什么？',
      a: '每完成一个房间都会给一个奖励——例如温室、矿车网络，以及修好巴士以开放沙漠。集齐所有收集包会触发全镇庆典并永久修复社区中心。这是经典的免费路线，长期奖励通常比付费的 Joja 路线更好。',
    },
    {
      q: '该做社区中心还是加入 JojaMart？',
      a: '对多数玩家来说社区中心是更好的选择：它免费（收集包只花你采集来的物品），奖励如温室也很经典。JojaMart 路线用花费数十万金币的付费购买取代收集包，是拿钱换时间——只有当你金币充裕又不喜欢收集时才划算。同一存档两条路线只能选一条。',
    },
  ],
}

export function getBundleFaqs(locale: string): Faq[] {
  if (locale === 'en') return BUNDLE_FAQS.en
  if (locale === 'zh') return BUNDLE_FAQS.zh
  return []
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run src/__tests__/lib/bundleSeoContent.test.ts`
Expected: PASS。

- [ ] **Step 5: Commit**

```bash
git add src/lib/tools/seo/bundleSeoContent.ts src/__tests__/lib/bundleSeoContent.test.ts
git commit -m "feat(tools-seo): bundle summary + EN/ZH FAQ content"
```

---

### Task 2: `BundleReferenceTable` 服务端收集包表

**Files:**
- Create: `src/components/tools/seo/BundleReferenceTable.tsx`
- Test: `src/__tests__/tools/BundleReferenceTable.test.tsx`

**Interfaces:**
- Consumes: `BUNDLE_ROOMS`、`type BundleQuality` from `@/components/tools/stardewBundleData`; `pickLoc`、`type LocLabel` from `@/lib/tools/seo/locale`.
- Produces:
  - `export interface BundleReferenceTableProps { locale: string }`
  - `export function BundleReferenceTable(props: BundleReferenceTableProps): JSX.Element`
  - 扁平渲染语义化 `<table>`（一行一收集包，4 列：房间/收集包/所需物品/奖励），行数 = 全部收集包数，按 locale 本地化；品质与「选N」本地化；奖励三态（物品/金币/—）。

- [ ] **Step 1: Write the failing test**

`src/__tests__/tools/BundleReferenceTable.test.tsx`:

```tsx
import { describe, it, expect } from 'vitest'
import { render, screen, within } from '@testing-library/react'
import { BundleReferenceTable } from '@/components/tools/seo/BundleReferenceTable'
import { BUNDLE_ROOMS } from '@/components/tools/stardewBundleData'

const bundleCount = BUNDLE_ROOMS.reduce((n, r) => n + r.bundles.length, 0)

describe('BundleReferenceTable', () => {
  it('renders one row per bundle plus a header row', () => {
    render(<BundleReferenceTable locale="en" />)
    const table = screen.getByRole('table')
    expect(within(table).getAllByRole('row')).toHaveLength(bundleCount + 1)
  })

  it('renders the four column headers (en)', () => {
    render(<BundleReferenceTable locale="en" />)
    for (const h of ['Room', 'Bundle', 'Items Needed', 'Reward']) {
      expect(screen.getByRole('columnheader', { name: h })).toBeInTheDocument()
    }
  })

  it('localizes a bundle name (en + zh)', () => {
    const { rerender } = render(<BundleReferenceTable locale="en" />)
    expect(screen.getByText('Spring Foraging Bundle')).toBeInTheDocument()
    rerender(<BundleReferenceTable locale="zh" />)
    expect(screen.getByText('春季采集收集包')).toBeInTheDocument()
  })

  it('shows an item reward with ×qty and a gold reward with g', () => {
    render(<BundleReferenceTable locale="en" />)
    expect(screen.getByText(/Spring Seeds ×30/)).toBeInTheDocument()
    expect(screen.getAllByText(/\d+g/).length).toBeGreaterThan(0)
  })

  it("shows a 'pick N' prefix on bundles that need a subset", () => {
    render(<BundleReferenceTable locale="en" />)
    expect(screen.getAllByText(/pick \d/i).length).toBeGreaterThan(0)
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/__tests__/tools/BundleReferenceTable.test.tsx`
Expected: FAIL —「Cannot find module '@/components/tools/seo/BundleReferenceTable'」。

- [ ] **Step 3: Write minimal implementation**

`src/components/tools/seo/BundleReferenceTable.tsx`:

```tsx
import { BUNDLE_ROOMS, type BundleQuality } from '@/components/tools/stardewBundleData'
import { pickLoc, type LocLabel } from '@/lib/tools/seo/locale'

export interface BundleReferenceTableProps {
  locale: string
}

function sep(locale: string): string {
  return locale === 'zh' || locale === 'zh-TW' || locale === 'ja' || locale === 'ko' ? '、' : ', '
}

const HEADERS: Record<string, [string, string, string, string]> = {
  en: ['Room', 'Bundle', 'Items Needed', 'Reward'],
  zh: ['房间', '收集包', '所需物品', '奖励'],
  'zh-TW': ['房間', '收集包', '所需物品', '獎勵'],
  ja: ['部屋', 'バンドル', '必要なアイテム', '報酬'],
  ko: ['방', '꾸러미', '필요 아이템', '보상'],
  de: ['Raum', 'Bündel', 'Benötigte Gegenstände', 'Belohnung'],
}

const QUALITY: Record<Exclude<BundleQuality, null>, LocLabel> = {
  gold: { en: 'Gold', zh: '金', zhTW: '金', ja: '金', ko: '금', de: 'Gold' },
  silver: { en: 'Silver', zh: '银', zhTW: '銀', ja: '銀', ko: '은', de: 'Silber' },
  iridium: { en: 'Iridium', zh: '铱', zhTW: '銥', ja: 'イリジウム', ko: '이리듐', de: 'Iridium' },
}

const PICK: Record<string, (n: number) => string> = {
  en: (n) => `(pick ${n}) `,
  zh: (n) => `（选${n}）`,
  'zh-TW': (n) => `（選${n}）`,
  ja: (n) => `（${n}個選択）`,
  ko: (n) => `(${n}개 선택) `,
  de: (n) => `(${n} auswählen) `,
}

const CAPTION: Record<string, string> = {
  en: 'Complete Stardew Valley Community Center bundle list — required items and rewards for every bundle',
  zh: '星露谷物语社区中心完整收集包清单——每个收集包的所需物品与奖励',
  'zh-TW': '星露谷物語社區中心完整收集包清單——每個收集包的所需物品與獎勵',
  ja: 'スターデューバレー コミュニティセンター全バンドル——各バンドルの必要アイテムと報酬',
  ko: '스타듀 밸리 마을 회관 전체 꾸러미 목록 — 각 꾸러미의 필요 아이템과 보상',
  de: 'Vollständige Bündelliste des Gemeinschaftszentrums — benötigte Gegenstände und Belohnungen',
}

export function BundleReferenceTable({ locale }: BundleReferenceTableProps) {
  const headers = HEADERS[locale] ?? HEADERS.en
  const s = sep(locale)
  const pick = PICK[locale] ?? PICK.en
  const rows = BUNDLE_ROOMS.flatMap((room) => room.bundles.map((b) => ({ room, b })))

  return (
    <table className="w-full min-w-[820px] border-collapse text-sm">
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
        {rows.map(({ room, b }) => {
          const prefix = b.required < b.items.length ? pick(b.required) : ''
          const items =
            prefix +
            b.items
              .map((it) => `${pickLoc(it.name, locale)} ×${it.qty}${it.quality ? ` (${pickLoc(QUALITY[it.quality], locale)})` : ''}`)
              .join(s)
          const reward = b.reward
            ? `${pickLoc(b.reward.name, locale)} ×${b.reward.qty}`
            : b.gold
              ? `${b.gold}g`
              : '—'
          return (
            <tr key={b.key} className="border-b border-[#2d3d2d]/50 align-top text-[#c8bca8]">
              <td className="whitespace-nowrap px-3 py-2">{pickLoc(room.name, locale)}</td>
              <th scope="row" className="px-3 py-2 text-left font-medium text-[#e8dcc8]">
                {pickLoc(b.name, locale)}
              </th>
              <td className="px-3 py-2">{items}</td>
              <td className="px-3 py-2">{reward}</td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run src/__tests__/tools/BundleReferenceTable.test.tsx`
Expected: PASS。若 `getByText('Spring Foraging Bundle')`/`'春季采集收集包'` 失败，核对 `stardewBundleData.ts` 中该收集包名并对齐断言。

- [ ] **Step 5: Commit**

```bash
git add src/components/tools/seo/BundleReferenceTable.tsx src/__tests__/tools/BundleReferenceTable.test.tsx
git commit -m "feat(tools-seo): server-rendered community center bundle reference table"
```

---

### Task 3: 接入 stardew-bundles 页面

**Files:**
- Modify: `src/app/[locale]/tools/stardew-bundles/page.tsx`

**Interfaces:**
- Consumes: Task 1 `bundleSummary`/`getBundleFaqs`；Task 2 `BundleReferenceTable`；已存在的 `ToolReference`.
- Produces: 无对外接口——在交互 finder 后、相关工具页脚前渲染 `<ToolReference>{<BundleReferenceTable/>}</ToolReference>`。

- [ ] **Step 1: 加 import**

在 `src/app/[locale]/tools/stardew-bundles/page.tsx` 顶部 import 区加入：

```tsx
import { ToolReference } from '@/components/tools/seo/ToolReference'
import { BundleReferenceTable } from '@/components/tools/seo/BundleReferenceTable'
import { bundleSummary, getBundleFaqs } from '@/lib/tools/seo/bundleSeoContent'
```

- [ ] **Step 2: 插入内容区块**

在 `<StardewBundleFinder locale={locale} />` 之后、其后相关工具 `<div className="mt-12 border-t border-[#2d3d2d] pt-8">` 之前插入：

```tsx
<ToolReference
  locale={locale}
  tableTitle={getLoc(locale, '完整收集包清单', 'Complete Bundle List', '完整收集包清單', '全バンドル一覧', '전체 꾸러미 목록', 'Vollständige Bündelliste')}
  summary={bundleSummary(locale)}
  faqs={getBundleFaqs(locale)}
>
  <BundleReferenceTable locale={locale} />
</ToolReference>
```

（`getLoc` 是该文件已有的本地化 helper：`getLoc(locale, zh, en, zhTW?, ja?, ko?, de?)`，参数顺序 zh 先、en 后。该页无 `{/* Related links */}` 注释——用 `<StardewBundleFinder locale={locale} />` 和其后的 `<div className="mt-12 border-t border-[#2d3d2d] pt-8">` 作为插入锚点。）

- [ ] **Step 3: 类型检查 + 全量测试**

Run: `npx tsc --noEmit && npx vitest run`
Expected: tsc 无错误；全部测试 PASS。

- [ ] **Step 4: 构建冒烟**

Run: `npm run build`
Expected: 构建成功，无与本次改动相关的报错。

- [ ] **Step 5: Commit**

```bash
git add "src/app/[locale]/tools/stardew-bundles/page.tsx"
git commit -m "feat(tools): add crawlable bundle list + FAQ to bundles tool page"
```

---

## Self-Review

**Spec coverage：**
- 扁平收集包 4 列表（6 语言、语义化 table、caption、品质本地化、「选N」前缀、奖励三态）→ Task 2。✓
- 数据驱动摘要（6 语言）+ FAQ（EN/ZH，其余 []）→ Task 1。✓
- 复用 `ToolReference`（不改）+ 复用 `pickLoc`（不改、无本地 pick 函数）→ Task 2/3。✓
- FAQPage schema 由骨架注入、空 FAQ 不注入 → Task 3 + Task 1 提供 faqs。✓
- 页面接入、finder 后/页脚前、H1+多 H2、工具本体不动 → Task 3 + Global Constraints。✓
- 摘要事实运行时计算、未知 locale 回退、移动端横向滚动（min-w-[820px] + 骨架 overflow）→ 各任务。✓
- 测试置于 `src/__tests__/`、Vitest → 各任务测试路径。✓

**Placeholder scan：** 无 TBD/TODO；每步含完整代码，含 FAQ 实际文案（EN+ZH）与品质/「选N」标签。✓

**Type consistency：** `Faq`/`{q,a}` 与骨架 `ToolReference` 的 `faqs` prop 结构一致；`BundleReferenceTableProps`、`bundleSummary`、`getBundleFaqs` 命名前后一致；`BundleQuality` 来自 `stardewBundleData`、`pickLoc`/`LocLabel` 来自共享 `locale`；`QUALITY` 用 `Exclude<BundleQuality, null>` 排除 null 键。✓
