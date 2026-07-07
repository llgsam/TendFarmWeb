# Stardew Cooking + Villagers Tools Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship two new Stardew Valley data tools under `/tools` — `stardew-villagers` (a **marriage-candidate comparator**) and `stardew-cooking` (recipe finder with **ingredient reverse-lookup + buff filter**) — each solving a real UX gap the official wiki can't.

**Architecture:** Each tool follows the established 4-part pattern: a data module (`stardew<X>Data.ts`, 6-language, generated from the official wiki), pure filter/lookup functions exported from that module (unit-tested with Vitest), a `'use client'` Finder component, and a route page with 6-language SEO metadata. Then wire into `DATA_TOOLS`, `sitemap.ts`, and `tools-roadmap.json`.

**Tech Stack:** Next.js App Router (localized `[locale]` routes), TypeScript, Tailwind (inline dark-green theme tokens), Vitest (jsdom), `browser-harness` + Python for wiki scraping.

## Global Constraints

- **Locales (exactly 6):** `en`, `zh`, `zh-TW`, `ja`, `ko`, `de`. Every user-facing string and every data record carries all 6. Loc object shape: `{ en, zh, zhTW, ja, ko, de }`.
- **`pick(loc, locale)` mapping:** `zh`→`.zh`, `zh-TW`→`.zhTW`, `ja`→`.ja`, `ko`→`.ko`, `de`→`.de`, else `.en`.
- **Data accuracy is non-negotiable — never hand-transcribe.** Scrape the official per-language wiki via `browser-harness` (real tab; wiki blocks WebFetch/curl), align cross-language records by the English **icon filename** (`<img src>`), get zh-TW via `?variant=zh-hant`, dump JSON to scratchpad, and generate the `.ts` via a committed-to-scratchpad Python script (re-runnable). Data files start with a `// AUTO-GENERATED …` header and must not be hand-edited.
- **Theme tokens (copy from existing tools):** text `#e8dcc8`, muted `#8a9a7a`, border `#2d3d2d`, panel bg `#1a2e1a`/`#0f1a0f`, accent `#f0a832`, pink accent `#c97b9a`.
- **Path conventions:** route `src/app/[locale]/tools/<slug>/page.tsx`; component `src/components/tools/Stardew<X>Finder.tsx`; data `src/components/tools/stardew<X>Data.ts`; tests `src/__tests__/tools/…`.
- **Code style:** immutable updates only (no mutation); no `console.log`; small focused files.
- **Verification command for every "build passes" step:** `npm run build` (must exit 0). Unit tests: `npm test`.
- **Scratchpad dir** (for JSON dumps + gen scripts): `/private/tmp/claude-501/-Users-samlai2-work-afit-afit-tender-world-TendFarmWeb/3ebc2da7-b8fd-4b79-a8c2-bede33c13041/scratchpad`

---

# Part A — stardew-villagers (marriage comparator) — do this tool first

## Task A1: Villager data module + scrape + integrity test

**Files:**
- Create: `src/components/tools/stardewVillagerData.ts`
- Create: `src/__tests__/tools/stardewVillagerData.test.ts`
- Scratch: `<scratchpad>/villagers_raw.json`, `<scratchpad>/gen_villagers.py`

**Interfaces:**
- Produces (consumed by A2, A3):
  ```ts
  export type VilLoc = { en: string; zh: string; zhTW: string; ja: string; ko: string; de: string }
  export type Season = 'spring' | 'summer' | 'fall' | 'winter'
  export interface Villager {
    key: string           // kebab-case stable id, e.g. "abigail"
    icon: string          // English icon filename, e.g. "Abigail.png"
    name: VilLoc
    marriageable: boolean
    gender: 'male' | 'female'
    birthday: { season: Season; day: number }   // day 1..28
    region: VilLoc                               // where they live, localized
    lovedGifts: VilLoc[]                         // 4–6 loved-gift names, localized
    personality: VilLoc | null                   // one-line persona; null if not marriageable
    spousePerk: VilLoc | null                    // post-marriage behavior; null if not marriageable
    heartEventHint: VilLoc | null                // one-line heart-event highlight; null if not marriageable
  }
  export const VILLAGERS: Villager[]
  ```

- [ ] **Step 1: Write the failing data-integrity test**

Create `src/__tests__/tools/stardewVillagerData.test.ts`:
```ts
import { describe, it, expect } from 'vitest'
import { VILLAGERS, type Villager } from '@/components/tools/stardewVillagerData'

const LOCS = ['en', 'zh', 'zhTW', 'ja', 'ko', 'de'] as const
const nonEmptyLoc = (l: Record<string, string>) => LOCS.every((k) => typeof l[k] === 'string' && l[k].length > 0)

describe('villager data integrity', () => {
  it('has the full cast with unique keys', () => {
    expect(VILLAGERS.length).toBeGreaterThanOrEqual(30)
    const keys = VILLAGERS.map((v) => v.key)
    expect(new Set(keys).size).toBe(keys.length)
  })

  it('has exactly 12 marriage candidates', () => {
    expect(VILLAGERS.filter((v) => v.marriageable).length).toBe(12)
  })

  it('every villager name + region are fully localized', () => {
    for (const v of VILLAGERS) {
      expect(nonEmptyLoc(v.name), `name ${v.key}`).toBe(true)
      expect(nonEmptyLoc(v.region), `region ${v.key}`).toBe(true)
    }
  })

  it('valid birthdays', () => {
    for (const v of VILLAGERS) {
      expect(['spring', 'summer', 'fall', 'winter']).toContain(v.birthday.season)
      expect(v.birthday.day).toBeGreaterThanOrEqual(1)
      expect(v.birthday.day).toBeLessThanOrEqual(28)
    }
  })

  it('marriage candidates carry decision fields + loved gifts; icons unique', () => {
    const icons = VILLAGERS.map((v) => v.icon)
    expect(new Set(icons).size).toBe(icons.length)
    for (const v of VILLAGERS.filter((x) => x.marriageable)) {
      expect(v.lovedGifts.length).toBeGreaterThanOrEqual(3)
      expect(v.personality && nonEmptyLoc(v.personality), `personality ${v.key}`).toBe(true)
      expect(v.spousePerk && nonEmptyLoc(v.spousePerk), `spousePerk ${v.key}`).toBe(true)
      expect(v.heartEventHint && nonEmptyLoc(v.heartEventHint), `heartEventHint ${v.key}`).toBe(true)
    }
  })

  it('known facts: Abigail is a Fall 13 marriage candidate', () => {
    const abby = VILLAGERS.find((v) => v.key === 'abigail')
    expect(abby?.marriageable).toBe(true)
    expect(abby?.birthday).toEqual({ season: 'fall', day: 13 })
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- stardewVillagerData`
Expected: FAIL — cannot resolve `@/components/tools/stardewVillagerData` (module not created yet).

- [ ] **Step 3: Scrape the 6-language data**

Use `browser-harness` (heredoc form). Scrape from the official wiki, one language at a time. For `en`, `ja`, `ko`, `de` use the language subdomain/param the wiki uses; for `zh` use the zh wiki; for `zh-TW` fetch the zh page with `?variant=zh-hant`.

Pages to scrape:
- `Villagers` list page → the cast, marriageable flag, birthdays, region.
- Each marriage candidate's page (12) → region, a one-line persona, post-marriage behavior, one notable heart event.

Alignment: capture each villager's **portrait icon filename** (`<img src>` basename, e.g. `Abigail.png`) on every language page and align records by it. Dump the merged raw structure to `<scratchpad>/villagers_raw.json` keyed by icon filename:
```json
{ "Abigail.png": { "key": "abigail", "marriageable": true, "gender": "female",
  "birthday": {"season":"fall","day":13},
  "name": {"en":"Abigail","zh":"阿比盖尔","zhTW":"阿比蓋爾","ja":"アビゲイル","ko":"애비게일","de":"Abigail"},
  "region": {"en":"Town (Pierre's shop)", "zh":"…", "...": "…"},
  "lovedGifts": [ {"en":"Amethyst","zh":"…","...":"…"}, … ],
  "personality": {"en":"Adventurous, rebellious gamer…", "...": "…"},
  "spousePerk": {"en":"May feed pets / repair fences; occasional gifts", "...": "…"},
  "heartEventHint": {"en":"8-heart: playing in the mines at night", "...": "…"} } , … }
```
For `lovedGifts`, prefer reusing the `loves` arrays already in `src/components/tools/stardewGiftData.ts` (`GIFT_VILLAGERS[].loves` + `GIFT_ITEMS` for localized names) to avoid re-scraping — take the first 4–6.

- [ ] **Step 4: Generate the data file**

Write `<scratchpad>/gen_villagers.py` that reads `villagers_raw.json` and emits `src/components/tools/stardewVillagerData.ts`: the `// AUTO-GENERATED …` header, the type block above verbatim, and `export const VILLAGERS: Villager[] = [ … ]` (one object per line, non-marriageable villagers get `personality/spousePerk/heartEventHint: null`). Run it:
```bash
python3 <scratchpad>/gen_villagers.py
```

- [ ] **Step 5: Run test to verify it passes**

Run: `npm test -- stardewVillagerData`
Expected: PASS (all 6 assertions).

- [ ] **Step 6: Commit**

```bash
git add src/components/tools/stardewVillagerData.ts src/__tests__/tools/stardewVillagerData.test.ts
git commit -m "feat(tools): add stardew villager data (marriage comparator dataset)"
```

## Task A2: Pure filter/lookup functions + unit tests

**Files:**
- Modify: `src/components/tools/stardewVillagerData.ts` (append functions)
- Create: `src/__tests__/tools/villagerFilters.test.ts`

**Interfaces:**
- Consumes: `VILLAGERS`, `Villager`, `Season`, `VilLoc` from A1.
- Produces (consumed by A3):
  ```ts
  export function pickVil(l: VilLoc, locale: string): string
  export interface VillagerFilter { marriageableOnly: boolean; season: Season | 'all'; query: string; locale: string }
  export function filterVillagers(f: VillagerFilter): Villager[]
  ```

- [ ] **Step 1: Write the failing test**

Create `src/__tests__/tools/villagerFilters.test.ts`:
```ts
import { describe, it, expect } from 'vitest'
import { filterVillagers, pickVil } from '@/components/tools/stardewVillagerData'

describe('villager filters', () => {
  const base = { marriageableOnly: false, season: 'all' as const, query: '', locale: 'en' }

  it('marriageableOnly returns exactly the 12 candidates', () => {
    const r = filterVillagers({ ...base, marriageableOnly: true })
    expect(r.length).toBe(12)
    expect(r.every((v) => v.marriageable)).toBe(true)
  })

  it('season filter narrows to that season', () => {
    const r = filterVillagers({ ...base, season: 'fall' })
    expect(r.length).toBeGreaterThan(0)
    expect(r.every((v) => v.birthday.season === 'fall')).toBe(true)
  })

  it('query matches localized name (en)', () => {
    const r = filterVillagers({ ...base, query: 'abig' })
    expect(r.map((v) => v.key)).toContain('abigail')
  })

  it('query matches localized name (zh)', () => {
    const r = filterVillagers({ ...base, query: '阿比', locale: 'zh' })
    expect(r.map((v) => v.key)).toContain('abigail')
  })

  it('empty filter returns full cast', () => {
    expect(filterVillagers(base).length).toBe(VILCOUNT())
  })

  it('pickVil falls back to en for unknown locale', () => {
    expect(pickVil({ en: 'X', zh: 'x', zhTW: 'x', ja: 'x', ko: 'x', de: 'x' }, 'fr')).toBe('X')
  })
})
function VILCOUNT() { return require('@/components/tools/stardewVillagerData').VILLAGERS.length }
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- villagerFilters`
Expected: FAIL — `filterVillagers`/`pickVil` are not exported.

- [ ] **Step 3: Append the implementation**

Append to `src/components/tools/stardewVillagerData.ts`:
```ts
export function pickVil(l: VilLoc, locale: string): string {
  if (locale === 'zh') return l.zh
  if (locale === 'zh-TW') return l.zhTW
  if (locale === 'ja') return l.ja
  if (locale === 'ko') return l.ko
  if (locale === 'de') return l.de
  return l.en
}

export interface VillagerFilter { marriageableOnly: boolean; season: Season | 'all'; query: string; locale: string }

export function filterVillagers(f: VillagerFilter): Villager[] {
  const q = f.query.trim().toLowerCase()
  return VILLAGERS.filter((v) => {
    if (f.marriageableOnly && !v.marriageable) return false
    if (f.season !== 'all' && v.birthday.season !== f.season) return false
    if (q && !pickVil(v.name, f.locale).toLowerCase().includes(q)) return false
    return true
  })
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- villagerFilters`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/components/tools/stardewVillagerData.ts src/__tests__/tools/villagerFilters.test.ts
git commit -m "feat(tools): villager filter/lookup helpers with tests"
```

## Task A3: Finder component + route page + registration

**Files:**
- Create: `src/components/tools/StardewVillagerFinder.tsx`
- Create: `src/app/[locale]/tools/stardew-villagers/page.tsx`
- Modify: `src/app/[locale]/tools/page.tsx` (append to `DATA_TOOLS`)
- Modify: `src/app/sitemap.ts` (add path)
- Modify: `docs/seo/tools-roadmap.json` (villagers queue→shipped)

**Interfaces:**
- Consumes: `VILLAGERS`, `filterVillagers`, `pickVil`, `Villager`, `Season` from A1/A2.
- Produces: `export function StardewVillagerFinder({ locale }: { locale: string })`.

- [ ] **Step 1: Write the Finder component**

Create `src/components/tools/StardewVillagerFinder.tsx`. Default view = marriage comparator (`marriageableOnly` on); a toggle reveals the full cast. Filters: marriageable toggle, season, name search. Each card links to `stardew-gifts` and `stardew-calendar`. Follow the theme + `L()` helper pattern from `StardewGiftFinder.tsx`.
```tsx
'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { VILLAGERS, filterVillagers, pickVil, type Villager, type Season, type VilLoc } from './stardewVillagerData'

const SEASONS: { key: Season; label: VilLoc }[] = [
  { key: 'spring', label: { en: 'Spring', zh: '春季', zhTW: '春季', ja: '春', ko: '봄', de: 'Frühling' } },
  { key: 'summer', label: { en: 'Summer', zh: '夏季', zhTW: '夏季', ja: '夏', ko: '여름', de: 'Sommer' } },
  { key: 'fall', label: { en: 'Fall', zh: '秋季', zhTW: '秋季', ja: '秋', ko: '가을', de: 'Herbst' } },
  { key: 'winter', label: { en: 'Winter', zh: '冬季', zhTW: '冬季', ja: '冬', ko: '겨울', de: 'Winter' } },
]

export function StardewVillagerFinder({ locale }: { locale: string }) {
  const [marriageableOnly, setMarriageableOnly] = useState(true)
  const [season, setSeason] = useState<Season | 'all'>('all')
  const [query, setQuery] = useState('')

  const t = (l: VilLoc) => pickVil(l, locale)
  const L = (en: string, zh: string, zhTW: string, ja: string, ko: string, de: string) =>
    t({ en, zh, zhTW, ja, ko, de })

  const results = useMemo(
    () => filterVillagers({ marriageableOnly, season, query, locale }),
    [marriageableOnly, season, query, locale],
  )

  const inputCls = 'rounded-lg border border-[#2d3d2d] bg-[#0f1a0f] px-3 py-2 text-sm text-[#e8dcc8] focus:border-[#f0a832] focus:outline-none'

  return (
    <div>
      {/* generic marriage rules note */}
      <p className="mb-6 rounded-xl border border-[#c97b9a]/30 bg-[#c97b9a]/5 p-4 text-sm text-[#8a9a7a]">
        {L(
          'Reach 8 hearts then give a Bouquet to start dating; at 10 hearts give a Mermaid’s Pendant to propose. Give loved gifts (birthday ×8) to raise hearts fast.',
          '好感度达到 8 心后赠送「花束」开始交往；10 心时赠送「美人鱼吊坠」求婚。多送最爱礼物（生日当天 ×8）快速升心。',
          '好感度達到 8 心後贈送「花束」開始交往；10 心時贈送「美人魚吊墜」求婚。多送最愛禮物（生日當天 ×8）快速升心。',
          '好感度8ハートで「花束」を渡すと交際開始、10ハートで「マーメイドペンダント」を渡すとプロポーズ。大好きな贈り物（誕生日は×8）で効率よく上昇。',
          '호감도 8하트에서 「꽃다발」을 주면 연애 시작, 10하트에서 「인어의 펜던트」로 청혼. 좋아하는 선물(생일 ×8)로 빠르게 상승.',
          'Bei 8 Herzen einen Blumenstrauß schenken, um zu daten; bei 10 Herzen mit einem Meerjungfrauen-Anhänger einen Antrag machen. Lieblingsgeschenke (Geburtstag ×8) heben Herzen schnell.',
        )}
      </p>

      {/* filter bar */}
      <div className="mb-6 flex flex-wrap items-center gap-3 rounded-xl border border-[#2d3d2d] bg-[#1a2e1a]/50 p-4">
        <label className="flex items-center gap-2 text-sm text-[#e8dcc8]">
          <input type="checkbox" checked={marriageableOnly} onChange={(e) => setMarriageableOnly(e.target.checked)} />
          {L('Marriage candidates only', '仅可结婚对象', '僅可結婚對象', '結婚候補のみ', '결혼 후보만', 'Nur Heiratskandidaten')}
        </label>
        <select value={season} onChange={(e) => setSeason(e.target.value as Season | 'all')} className={inputCls}>
          <option value="all">{L('All seasons', '全部季节', '全部季節', '全ての季節', '모든 계절', 'Alle Jahreszeiten')}</option>
          {SEASONS.map((s) => (<option key={s.key} value={s.key}>{t(s.label)}</option>))}
        </select>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={L('Search name…', '搜索姓名…', '搜尋姓名…', '名前で検索…', '이름 검색…', 'Name suchen…')}
          className={`${inputCls} flex-1 min-w-[10rem]`}
        />
      </div>

      <p className="mb-4 text-sm text-[#8a9a7a]">
        {results.length} {L('villagers', '位村民', '位村民', '人', '명', 'Bewohner')}
      </p>

      <div className="grid gap-4 sm:grid-cols-2">
        {results.map((v) => (<VillagerCard key={v.key} v={v} locale={locale} t={t} L={L} />))}
      </div>
    </div>
  )
}

function VillagerCard({
  v, locale, t, L,
}: {
  v: Villager; locale: string
  t: (l: VilLoc) => string
  L: (en: string, zh: string, zhTW: string, ja: string, ko: string, de: string) => string
}) {
  const seasonLabel = SEASONS.find((s) => s.key === v.birthday.season)!.label
  return (
    <div className="rounded-xl border border-[#2d3d2d] bg-[#1a2e1a]/50 p-5">
      <div className="mb-2 flex items-baseline justify-between gap-2">
        <h3 className="text-lg font-semibold text-[#e8dcc8]">
          {v.marriageable ? '💍 ' : ''}{t(v.name)}
        </h3>
        <span className="text-sm text-[#8a9a7a]">🎂 {t(seasonLabel)} {v.birthday.day}</span>
      </div>
      <p className="mb-2 text-sm text-[#8a9a7a]">📍 {t(v.region)}</p>
      {v.personality && <p className="mb-2 text-sm text-[#e8dcc8]">{t(v.personality)}</p>}
      <div className="mb-2">
        <span className="text-xs font-semibold text-[#c97b9a]">
          {L('Loved gifts', '最爱礼物', '最愛禮物', '大好きな贈り物', '좋아하는 선물', 'Lieblingsgeschenke')}:
        </span>
        <span className="ml-1 text-sm text-[#e8dcc8]">{v.lovedGifts.map(t).join(', ')}</span>
      </div>
      {v.spousePerk && (
        <p className="mb-1 text-sm text-[#8a9a7a]">
          🏡 {L('Married', '婚后', '婚後', '結婚後', '결혼 후', 'Verheiratet')}: {t(v.spousePerk)}
        </p>
      )}
      {v.heartEventHint && (
        <p className="mb-3 text-sm text-[#8a9a7a]">💬 {t(v.heartEventHint)}</p>
      )}
      <div className="flex flex-wrap gap-2 border-t border-[#2d3d2d] pt-3">
        <Link href={`/${locale}/tools/stardew-gifts`} className="text-xs text-[#8a9a7a] hover:text-[#e8dcc8]">
          {L('All gifts →', '完整送礼喜好 →', '完整送禮喜好 →', '全ての贈り物 →', '전체 선물 →', 'Alle Geschenke →')}
        </Link>
        <Link href={`/${locale}/tools/stardew-calendar`} className="text-xs text-[#8a9a7a] hover:text-[#e8dcc8]">
          {L('Birthday on calendar →', '日历中查看生日 →', '日曆中查看生日 →', 'カレンダーで誕生日 →', '달력에서 생일 →', 'Geburtstag im Kalender →')}
        </Link>
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Write the route page**

Create `src/app/[locale]/tools/stardew-villagers/page.tsx` (copy the structure of `stardew-museum/page.tsx`, swapping strings):
```tsx
import { StardewVillagerFinder } from '@/components/tools/StardewVillagerFinder'
import type { Metadata } from 'next'
import { BASE_URL, buildLanguageAlternates } from '@/lib/config'
import Link from 'next/link'

function getLoc(locale: string, zh: string, en: string, zhTW?: string, ja?: string, ko?: string, de?: string): string {
  if (locale === 'zh') return zh
  if (locale === 'zh-TW') return zhTW ?? zh
  if (locale === 'ja') return ja ?? en
  if (locale === 'ko') return ko ?? en
  if (locale === 'de') return de ?? en
  return en
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  return {
    title: getLoc(locale,
      '星露谷物语结婚对象对比 — 12 位可攻略对象一览',
      'Stardew Valley Marriage Candidates — Compare All 12 Bachelors & Bachelorettes',
      '星露谷物語結婚對象對比 — 12 位可攻略對象一覽',
      'スターデューバレー 結婚候補比較 — 独身男女12人',
      '스타듀밸리 결혼 후보 비교 — 미혼 남녀 12명',
      'Stardew Valley Heiratskandidaten — Alle 12 im Vergleich',
    ),
    description: getLoc(locale,
      '免费星露谷物语结婚对象对比：12 位可结婚村民并排对比生日、最爱礼物、性格、婚后表现与爱心事件，一屏帮你决定娶谁/嫁谁。附全部村民档案与求婚攻略。',
      'Free Stardew Valley marriage guide. Compare all 12 marriage candidates side by side — birthdays, loved gifts, personality, post-marriage perks, and heart events — to decide who to marry. Plus every villager profile and how to propose.',
      '免費星露谷物語結婚對象對比：12 位可結婚村民並排對比生日、最愛禮物、性格、婚後表現與愛心事件，一屏幫你決定娶誰/嫁誰。附全部村民檔案與求婚攻略。',
      '無料のスターデューバレー結婚ガイド。結婚候補12人を誕生日・大好きな贈り物・性格・結婚後・ハートイベントで並べて比較し、誰と結婚するか決められます。全村人プロフィール付き。',
      '무료 스타듀밸리 결혼 가이드. 결혼 후보 12명을 생일·좋아하는 선물·성격·결혼 후·하트 이벤트로 나란히 비교해 누구와 결혼할지 결정하세요. 전체 주민 프로필 포함.',
      'Kostenloser Stardew-Valley-Heiratsguide. Vergleiche alle 12 Heiratskandidaten nebeneinander — Geburtstage, Lieblingsgeschenke, Charakter, Ehe-Vorteile und Herz-Events — und entscheide, wen du heiratest.',
    ),
    alternates: {
      canonical: `${BASE_URL}/${locale}/tools/stardew-villagers`,
      languages: buildLanguageAlternates('/tools/stardew-villagers'),
    },
  }
}

export default async function StardewVillagersPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <nav className="mb-6 text-sm text-[#8a9a7a]">
        <Link href={`/${locale}/tools`} className="hover:text-[#e8dcc8]">
          {getLoc(locale, '工具集', 'Tools', '工具集', 'ツール', '도구', 'Tools')}
        </Link>
        <span className="mx-2">›</span>
        <span className="text-[#e8dcc8]">
          {getLoc(locale, '结婚对象对比', 'Marriage Candidates', '結婚對象對比', '結婚候補', '결혼 후보', 'Heiratskandidaten')}
        </span>
      </nav>
      <h1 className="mb-2 text-3xl font-bold text-[#e8dcc8]">
        {getLoc(locale, '星露谷物语结婚对象对比', 'Stardew Valley Marriage Candidates', '星露谷物語結婚對象對比', 'スターデューバレー 結婚候補比較', '스타듀밸리 결혼 후보 비교', 'Stardew Valley Heiratskandidaten')}
      </h1>
      <p className="mb-8 text-[#8a9a7a]">
        {getLoc(locale,
          '12 位可结婚村民并排对比：生日、最爱礼物、性格、婚后表现与爱心事件亮点，帮你决定娶谁/嫁谁。关掉筛选可查看全部村民档案。',
          'Compare all 12 marriage candidates side by side — birthdays, loved gifts, personality, post-marriage perks, and heart-event highlights — to decide who to marry. Turn off the filter to browse every villager.',
          '12 位可結婚村民並排對比：生日、最愛禮物、性格、婚後表現與愛心事件亮點，幫你決定娶誰/嫁誰。關掉篩選可查看全部村民檔案。',
          '結婚候補12人を誕生日・大好きな贈り物・性格・結婚後・ハートイベントで並べて比較。フィルターを外すと全村人を閲覧できます。',
          '결혼 후보 12명을 생일·좋아하는 선물·성격·결혼 후·하트 이벤트로 나란히 비교하세요. 필터를 끄면 전체 주민을 볼 수 있습니다.',
          'Vergleiche alle 12 Heiratskandidaten nebeneinander. Schalte den Filter aus, um alle Bewohner zu durchsuchen.',
        )}
      </p>
      <StardewVillagerFinder locale={locale} />
      <div className="mt-12 border-t border-[#2d3d2d] pt-8">
        <h2 className="mb-4 text-lg font-semibold text-[#e8dcc8]">
          {getLoc(locale, '相关工具', 'Related Tools', '相關工具', '関連ツール', '관련 도구', 'Verwandte Tools')}
        </h2>
        <div className="flex flex-wrap gap-3">
          <Link href={`/${locale}/tools/stardew-gifts`} className="rounded-lg border border-[#2d3d2d] px-4 py-2 text-sm text-[#8a9a7a] hover:text-[#e8dcc8] transition-colors">
            {getLoc(locale, '送礼喜好查询 →', 'Gift Guide →', '送禮喜好查詢 →', '贈り物ガイド →', '선물 가이드 →', 'Geschenk-Guide →')}
          </Link>
          <Link href={`/${locale}/tools/stardew-calendar`} className="rounded-lg border border-[#2d3d2d] px-4 py-2 text-sm text-[#8a9a7a] hover:text-[#e8dcc8] transition-colors">
            {getLoc(locale, '生日日历 →', 'Calendar →', '生日日曆 →', 'カレンダー →', '달력 →', 'Kalender →')}
          </Link>
        </div>
      </div>
    </div>
  )
}
```

- [ ] **Step 3: Register in DATA_TOOLS**

In `src/app/[locale]/tools/page.tsx`, append this object to the `DATA_TOOLS` array (before its closing `]` at line ~155):
```ts
  {
    key: 'stardew-villagers',
    href: 'tools/stardew-villagers',
    titles: {
      zh: '星露谷物语结婚对象对比', 'zh-TW': '星露谷物語結婚對象對比',
      ja: 'スターデューバレー 結婚候補比較', ko: '스타듀밸리 결혼 후보 비교',
      de: 'Stardew Valley Heiratskandidaten', en: 'Stardew Valley Marriage Candidates',
    },
    descs: {
      zh: '12 位可结婚村民并排对比：生日、最爱礼物、性格、婚后与爱心事件，帮你决定娶谁/嫁谁。',
      'zh-TW': '12 位可結婚村民並排對比：生日、最愛禮物、性格、婚後與愛心事件，幫你決定娶誰/嫁誰。',
      ja: '結婚候補12人を誕生日・贈り物・性格・結婚後で並べて比較。',
      ko: '결혼 후보 12명을 생일·선물·성격·결혼 후로 나란히 비교.',
      de: 'Vergleiche alle 12 Heiratskandidaten: Geburtstage, Geschenke, Charakter, Ehe.',
      en: 'Compare all 12 marriage candidates — birthdays, gifts, personality, marriage perks.',
    },
    tags: { zh: 'Stardew Valley', 'zh-TW': 'Stardew Valley', ja: 'Stardew Valley', ko: 'Stardew Valley', de: 'Stardew Valley', en: 'Stardew Valley' },
  },
```

- [ ] **Step 4: Add to sitemap**

In `src/app/sitemap.ts` line 61, add `'/tools/stardew-villagers'` to the path array (after `'/tools/stardew-museum'`).

- [ ] **Step 5: Update roadmap**

In `docs/seo/tools-roadmap.json`: move the `stardew-villagers` object from `queue[]` into `shipped[]`, set `"status": "done"`, set `"covers": ["stardew valley marriage", "stardew valley villagers", "stardew valley marriage candidates"]`, and bump top-level `"updated": "2026-07-08"`.

- [ ] **Step 6: Build + verify**

Run: `npm run build`
Expected: exit 0, no type errors, route `/[locale]/tools/stardew-villagers` listed in output.

Then dev-drive to confirm behavior (not just compile): `npm run dev`, open `http://localhost:3000/en/tools/stardew-villagers` and verify: default shows 12 `💍` cards; unchecking "Marriage candidates only" shows the full cast; season filter + name search work; the `/en/tools` grid shows the new card; each card's two links resolve.

- [ ] **Step 7: Commit**

```bash
git add src/components/tools/StardewVillagerFinder.tsx "src/app/[locale]/tools/stardew-villagers/page.tsx" "src/app/[locale]/tools/page.tsx" src/app/sitemap.ts docs/seo/tools-roadmap.json
git commit -m "feat(tools): add Stardew Valley marriage-candidate comparator"
```

---

# Part B — stardew-cooking (recipe finder)

## Task B1: Cooking data module + scrape + integrity test

**Files:**
- Create: `src/components/tools/stardewCookingData.ts`
- Create: `src/__tests__/tools/stardewCookingData.test.ts`
- Scratch: `<scratchpad>/cooking_raw.json`, `<scratchpad>/gen_cooking.py`

**Interfaces:**
- Produces (consumed by B2, B3):
  ```ts
  export type CookLoc = { en: string; zh: string; zhTW: string; ja: string; ko: string; de: string }
  export type BuffType =
    | 'farming' | 'fishing' | 'foraging' | 'mining' | 'combat' | 'luck'
    | 'attack' | 'defense' | 'speed' | 'maxEnergy' | 'magnetism'
  export type SourceCat = 'skill' | 'friendship' | 'shop' | 'tv' | 'other'
  export interface CookIngredient { key: string; name: CookLoc; qty: number }
  export interface CookBuff { type: BuffType; amount: number }
  export interface CookRecipe {
    key: string
    icon: string
    name: CookLoc
    ingredients: CookIngredient[]
    source: CookLoc            // full localized unlock text
    sourceCat: SourceCat       // bucket for filtering
    energy: number
    health: number
    buffs: CookBuff[]          // [] when none
    buffDuration: string | null
    sellPrice: number
  }
  export const COOK_RECIPES: CookRecipe[]
  ```

- [ ] **Step 1: Write the failing integrity test**

Create `src/__tests__/tools/stardewCookingData.test.ts`:
```ts
import { describe, it, expect } from 'vitest'
import { COOK_RECIPES } from '@/components/tools/stardewCookingData'

const LOCS = ['en', 'zh', 'zhTW', 'ja', 'ko', 'de'] as const
const nonEmptyLoc = (l: Record<string, string>) => LOCS.every((k) => typeof l[k] === 'string' && l[k].length > 0)
const SOURCE_CATS = ['skill', 'friendship', 'shop', 'tv', 'other']

describe('cooking data integrity', () => {
  it('has the full recipe set with unique keys + icons', () => {
    expect(COOK_RECIPES.length).toBeGreaterThanOrEqual(70)
    const keys = COOK_RECIPES.map((r) => r.key)
    expect(new Set(keys).size).toBe(keys.length)
  })

  it('every recipe fully localized with ≥1 ingredient and valid sourceCat', () => {
    for (const r of COOK_RECIPES) {
      expect(nonEmptyLoc(r.name), `name ${r.key}`).toBe(true)
      expect(nonEmptyLoc(r.source), `source ${r.key}`).toBe(true)
      expect(SOURCE_CATS).toContain(r.sourceCat)
      expect(r.ingredients.length, `ingredients ${r.key}`).toBeGreaterThanOrEqual(1)
      for (const ing of r.ingredients) {
        expect(nonEmptyLoc(ing.name), `ingredient of ${r.key}`).toBe(true)
        expect(ing.qty).toBeGreaterThanOrEqual(1)
      }
      expect(typeof r.sellPrice).toBe('number')
    }
  })

  it('buffs are well-formed; buffDuration present iff buffs non-empty', () => {
    for (const r of COOK_RECIPES) {
      if (r.buffs.length > 0) expect(r.buffDuration, `duration ${r.key}`).toBeTruthy()
      else expect(r.buffDuration).toBeNull()
    }
  })

  it('known fact: Salad restores energy and is a shop recipe', () => {
    const salad = COOK_RECIPES.find((r) => r.key === 'salad')
    expect(salad).toBeTruthy()
    expect(salad!.energy).toBeGreaterThan(0)
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- stardewCookingData`
Expected: FAIL — module not found.

- [ ] **Step 3: Scrape the 6-language data**

Use `browser-harness`. Scrape the wiki `Cooking` page in each language — it lists every recipe with ingredients (with quantities), recipe source, energy/health restored, buffs (+duration), and sell price. Capture the dish **icon filename** for alignment; capture each ingredient's icon filename too so `CookIngredient.key` is stable across languages. Map the source text to `sourceCat`: skill-level unlocks→`skill`, friendship/mail→`friendship`, shop/Saloon/Stardrop Saloon→`shop`, "The Queen of Sauce" TV→`tv`, everything else→`other`. zh-TW via `?variant=zh-hant`. Dump to `<scratchpad>/cooking_raw.json` keyed by dish icon filename.

- [ ] **Step 4: Generate the data file**

Write `<scratchpad>/gen_cooking.py` reading `cooking_raw.json` → emit `src/components/tools/stardewCookingData.ts` (AUTO-GENERATED header, the type block above verbatim, `export const COOK_RECIPES: CookRecipe[] = [ … ]`). Run:
```bash
python3 <scratchpad>/gen_cooking.py
```

- [ ] **Step 5: Run test to verify it passes**

Run: `npm test -- stardewCookingData`
Expected: PASS.

- [ ] **Step 6: Commit**

```bash
git add src/components/tools/stardewCookingData.ts src/__tests__/tools/stardewCookingData.test.ts
git commit -m "feat(tools): add stardew cooking recipe dataset"
```

## Task B2: Cooking filter/lookup functions + unit tests

**Files:**
- Modify: `src/components/tools/stardewCookingData.ts` (append functions)
- Create: `src/__tests__/tools/cookingFilters.test.ts`

**Interfaces:**
- Consumes: `COOK_RECIPES`, `CookRecipe`, `CookLoc`, `BuffType`, `SourceCat` from B1.
- Produces (consumed by B3):
  ```ts
  export function pickCook(l: CookLoc, locale: string): string
  export function allIngredients(locale: string): { key: string; name: string }[]  // unique, sorted by localized name
  export interface RecipeFilter { ingredientKey: string; buff: BuffType | 'all'; sourceCat: SourceCat | 'all'; query: string; locale: string }
  export function filterRecipes(f: RecipeFilter): CookRecipe[]
  ```

- [ ] **Step 1: Write the failing test**

Create `src/__tests__/tools/cookingFilters.test.ts`:
```ts
import { describe, it, expect } from 'vitest'
import { filterRecipes, allIngredients, pickCook } from '@/components/tools/stardewCookingData'
import { COOK_RECIPES } from '@/components/tools/stardewCookingData'

const base = { ingredientKey: '', buff: 'all' as const, sourceCat: 'all' as const, query: '', locale: 'en' }

describe('cooking filters', () => {
  it('empty filter returns all recipes', () => {
    expect(filterRecipes(base).length).toBe(COOK_RECIPES.length)
  })

  it('ingredient reverse-lookup returns only recipes using that ingredient', () => {
    const ingKey = COOK_RECIPES[0].ingredients[0].key
    const r = filterRecipes({ ...base, ingredientKey: ingKey })
    expect(r.length).toBeGreaterThan(0)
    expect(r.every((x) => x.ingredients.some((i) => i.key === ingKey))).toBe(true)
  })

  it('buff filter returns only recipes granting that buff', () => {
    const withBuff = COOK_RECIPES.find((r) => r.buffs.length > 0)
    if (withBuff) {
      const type = withBuff.buffs[0].type
      const r = filterRecipes({ ...base, buff: type })
      expect(r.every((x) => x.buffs.some((b) => b.type === type))).toBe(true)
      expect(r.map((x) => x.key)).toContain(withBuff.key)
    }
  })

  it('sourceCat filter narrows to that bucket', () => {
    const r = filterRecipes({ ...base, sourceCat: 'skill' })
    expect(r.every((x) => x.sourceCat === 'skill')).toBe(true)
  })

  it('query matches localized recipe name', () => {
    const first = COOK_RECIPES[0]
    const r = filterRecipes({ ...base, query: first.name.en.slice(0, 4).toLowerCase() })
    expect(r.map((x) => x.key)).toContain(first.key)
  })

  it('allIngredients is unique and sorted', () => {
    const ings = allIngredients('en')
    expect(new Set(ings.map((i) => i.key)).size).toBe(ings.length)
    const names = ings.map((i) => i.name)
    expect([...names].sort((a, b) => a.localeCompare(b))).toEqual(names)
  })

  it('pickCook falls back to en', () => {
    expect(pickCook({ en: 'X', zh: 'x', zhTW: 'x', ja: 'x', ko: 'x', de: 'x' }, 'fr')).toBe('X')
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- cookingFilters`
Expected: FAIL — helpers not exported.

- [ ] **Step 3: Append the implementation**

Append to `src/components/tools/stardewCookingData.ts`:
```ts
export function pickCook(l: CookLoc, locale: string): string {
  if (locale === 'zh') return l.zh
  if (locale === 'zh-TW') return l.zhTW
  if (locale === 'ja') return l.ja
  if (locale === 'ko') return l.ko
  if (locale === 'de') return l.de
  return l.en
}

export function allIngredients(locale: string): { key: string; name: string }[] {
  const map = new Map<string, string>()
  for (const r of COOK_RECIPES) {
    for (const ing of r.ingredients) {
      if (!map.has(ing.key)) map.set(ing.key, pickCook(ing.name, locale))
    }
  }
  return [...map.entries()]
    .map(([key, name]) => ({ key, name }))
    .sort((a, b) => a.name.localeCompare(b.name))
}

export interface RecipeFilter { ingredientKey: string; buff: BuffType | 'all'; sourceCat: SourceCat | 'all'; query: string; locale: string }

export function filterRecipes(f: RecipeFilter): CookRecipe[] {
  const q = f.query.trim().toLowerCase()
  return COOK_RECIPES.filter((r) => {
    if (f.ingredientKey && !r.ingredients.some((i) => i.key === f.ingredientKey)) return false
    if (f.buff !== 'all' && !r.buffs.some((b) => b.type === f.buff)) return false
    if (f.sourceCat !== 'all' && r.sourceCat !== f.sourceCat) return false
    if (q && !pickCook(r.name, f.locale).toLowerCase().includes(q)) return false
    return true
  })
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- cookingFilters`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/components/tools/stardewCookingData.ts src/__tests__/tools/cookingFilters.test.ts
git commit -m "feat(tools): cooking filter/reverse-lookup helpers with tests"
```

## Task B3: Cooking Finder component + route page + registration

**Files:**
- Create: `src/components/tools/StardewCookingFinder.tsx`
- Create: `src/app/[locale]/tools/stardew-cooking/page.tsx`
- Modify: `src/app/[locale]/tools/page.tsx` (append to `DATA_TOOLS`)
- Modify: `src/app/sitemap.ts`
- Modify: `docs/seo/tools-roadmap.json`

**Interfaces:**
- Consumes: `COOK_RECIPES`, `filterRecipes`, `allIngredients`, `pickCook`, `CookRecipe`, `BuffType`, `SourceCat`, `CookLoc` from B1/B2.
- Produces: `export function StardewCookingFinder({ locale }: { locale: string })`.

- [ ] **Step 1: Write the Finder component**

Create `src/components/tools/StardewCookingFinder.tsx`. Filter bar: ingredient reverse-lookup `<select>` (from `allIngredients`), buff `<select>`, source `<select>`, name search. Result cards list name, ingredients (`name ×qty`), source, energy/health, buffs (+duration), sell price.
```tsx
'use client'

import { useMemo, useState } from 'react'
import { COOK_RECIPES, filterRecipes, allIngredients, pickCook, type CookRecipe, type BuffType, type SourceCat, type CookLoc } from './stardewCookingData'

const BUFFS: { key: BuffType; label: CookLoc }[] = [
  { key: 'farming', label: { en: 'Farming', zh: '耕种', zhTW: '耕種', ja: '農業', ko: '농사', de: 'Landbau' } },
  { key: 'fishing', label: { en: 'Fishing', zh: '钓鱼', zhTW: '釣魚', ja: '釣り', ko: '낚시', de: 'Angeln' } },
  { key: 'foraging', label: { en: 'Foraging', zh: '采集', zhTW: '採集', ja: '採集', ko: '채집', de: 'Sammeln' } },
  { key: 'mining', label: { en: 'Mining', zh: '采矿', zhTW: '採礦', ja: '採掘', ko: '채광', de: 'Bergbau' } },
  { key: 'combat', label: { en: 'Combat', zh: '战斗', zhTW: '戰鬥', ja: '戦闘', ko: '전투', de: 'Kampf' } },
  { key: 'luck', label: { en: 'Luck', zh: '幸运', zhTW: '幸運', ja: '運', ko: '운', de: 'Glück' } },
  { key: 'attack', label: { en: 'Attack', zh: '攻击', zhTW: '攻擊', ja: '攻撃', ko: '공격', de: 'Angriff' } },
  { key: 'defense', label: { en: 'Defense', zh: '防御', zhTW: '防禦', ja: '防御', ko: '방어', de: 'Verteidigung' } },
  { key: 'speed', label: { en: 'Speed', zh: '速度', zhTW: '速度', ja: '移動速度', ko: '이동 속도', de: 'Tempo' } },
  { key: 'maxEnergy', label: { en: 'Max Energy', zh: '最大体力', zhTW: '最大體力', ja: '最大スタミナ', ko: '최대 기력', de: 'Max. Energie' } },
  { key: 'magnetism', label: { en: 'Magnetism', zh: '磁力', zhTW: '磁力', ja: '磁力', ko: '자력', de: 'Magnetismus' } },
]

const SOURCES: { key: SourceCat; label: CookLoc }[] = [
  { key: 'skill', label: { en: 'Skill level', zh: '技能等级', zhTW: '技能等級', ja: 'スキルレベル', ko: '스킬 레벨', de: 'Fähigkeitsstufe' } },
  { key: 'friendship', label: { en: 'Friendship', zh: '好感度', zhTW: '好感度', ja: '友好度', ko: '호감도', de: 'Freundschaft' } },
  { key: 'shop', label: { en: 'Shop', zh: '商店', zhTW: '商店', ja: 'ショップ', ko: '상점', de: 'Laden' } },
  { key: 'tv', label: { en: 'Queen of Sauce (TV)', zh: '烹饪女王（电视）', zhTW: '烹飪女王（電視）', ja: '料理の女王（TV）', ko: '요리의 여왕 (TV)', de: 'Queen of Sauce (TV)' } },
  { key: 'other', label: { en: 'Other', zh: '其他', zhTW: '其他', ja: 'その他', ko: '기타', de: 'Andere' } },
]

export function StardewCookingFinder({ locale }: { locale: string }) {
  const [ingredientKey, setIngredientKey] = useState('')
  const [buff, setBuff] = useState<BuffType | 'all'>('all')
  const [sourceCat, setSourceCat] = useState<SourceCat | 'all'>('all')
  const [query, setQuery] = useState('')

  const t = (l: CookLoc) => pickCook(l, locale)
  const L = (en: string, zh: string, zhTW: string, ja: string, ko: string, de: string) =>
    t({ en, zh, zhTW, ja, ko, de })

  const ingredients = useMemo(() => allIngredients(locale), [locale])
  const results = useMemo(
    () => filterRecipes({ ingredientKey, buff, sourceCat, query, locale }),
    [ingredientKey, buff, sourceCat, query, locale],
  )

  const cls = 'rounded-lg border border-[#2d3d2d] bg-[#0f1a0f] px-3 py-2 text-sm text-[#e8dcc8] focus:border-[#f0a832] focus:outline-none'

  return (
    <div>
      <div className="mb-6 grid gap-3 rounded-xl border border-[#2d3d2d] bg-[#1a2e1a]/50 p-4 sm:grid-cols-2">
        <select value={ingredientKey} onChange={(e) => setIngredientKey(e.target.value)} className={cls}>
          <option value="">{L('Any ingredient (reverse-lookup)', '任意食材（反查）', '任意食材（反查）', '食材で逆引き', '재료로 역검색', 'Beliebige Zutat (Rückwärtssuche)')}</option>
          {ingredients.map((i) => (<option key={i.key} value={i.key}>{i.name}</option>))}
        </select>
        <select value={buff} onChange={(e) => setBuff(e.target.value as BuffType | 'all')} className={cls}>
          <option value="all">{L('Any buff', '任意增益', '任意增益', '任意のバフ', '모든 버프', 'Beliebiger Buff')}</option>
          {BUFFS.map((b) => (<option key={b.key} value={b.key}>{t(b.label)}</option>))}
        </select>
        <select value={sourceCat} onChange={(e) => setSourceCat(e.target.value as SourceCat | 'all')} className={cls}>
          <option value="all">{L('Any source', '任意来源', '任意來源', '任意の入手', '모든 출처', 'Beliebige Quelle')}</option>
          {SOURCES.map((s) => (<option key={s.key} value={s.key}>{t(s.label)}</option>))}
        </select>
        <input value={query} onChange={(e) => setQuery(e.target.value)}
          placeholder={L('Search recipe…', '搜索菜名…', '搜尋菜名…', '料理名で検索…', '요리 검색…', 'Rezept suchen…')}
          className={cls} />
      </div>

      <p className="mb-4 text-sm text-[#8a9a7a]">
        {results.length} {L('recipes', '道菜', '道菜', '品', '개', 'Rezepte')}
      </p>

      <div className="grid gap-4 sm:grid-cols-2">
        {results.map((r) => (<RecipeCard key={r.key} r={r} t={t} L={L} />))}
      </div>
    </div>
  )
}

function RecipeCard({
  r, t, L,
}: {
  r: CookRecipe
  t: (l: CookLoc) => string
  L: (en: string, zh: string, zhTW: string, ja: string, ko: string, de: string) => string
}) {
  return (
    <div className="rounded-xl border border-[#2d3d2d] bg-[#1a2e1a]/50 p-5">
      <h3 className="mb-2 text-lg font-semibold text-[#e8dcc8]">🍳 {t(r.name)}</h3>
      <p className="mb-2 text-sm text-[#e8dcc8]">
        <span className="text-[#c97b9a]">{L('Ingredients', '食材', '食材', '材料', '재료', 'Zutaten')}:</span>{' '}
        {r.ingredients.map((i) => `${t(i.name)}${i.qty > 1 ? ` ×${i.qty}` : ''}`).join(', ')}
      </p>
      <p className="mb-1 text-sm text-[#8a9a7a]">🔓 {t(r.source)}</p>
      <p className="mb-1 text-sm text-[#8a9a7a]">⚡ {r.energy} · ❤️ {r.health} · 💰 {r.sellPrice}g</p>
      {r.buffs.length > 0 && (
        <p className="text-sm text-[#f0a832]">
          ✨ {r.buffs.map((b) => `${b.type} +${b.amount}`).join(', ')}{r.buffDuration ? ` (${r.buffDuration})` : ''}
        </p>
      )}
    </div>
  )
}
```

- [ ] **Step 2: Write the route page**

Create `src/app/[locale]/tools/stardew-cooking/page.tsx` (same shape as the villagers page; strings below). Related tools: `stardew-gifts`, `stardew-fish`.
```tsx
import { StardewCookingFinder } from '@/components/tools/StardewCookingFinder'
import type { Metadata } from 'next'
import { BASE_URL, buildLanguageAlternates } from '@/lib/config'
import Link from 'next/link'

function getLoc(locale: string, zh: string, en: string, zhTW?: string, ja?: string, ko?: string, de?: string): string {
  if (locale === 'zh') return zh
  if (locale === 'zh-TW') return zhTW ?? zh
  if (locale === 'ja') return ja ?? en
  if (locale === 'ko') return ko ?? en
  if (locale === 'de') return de ?? en
  return en
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  return {
    title: getLoc(locale,
      '星露谷物语料理食谱查询 — 按食材反查 + 增益筛选',
      'Stardew Valley Recipes — Cooking Finder by Ingredient & Buff',
      '星露谷物語料理食譜查詢 — 按食材反查 + 增益篩選',
      'スターデューバレー 料理レシピ検索 — 食材・バフで絞り込み',
      '스타듀밸리 요리 레시피 검색 — 재료·버프 필터',
      'Stardew Valley Rezepte — Koch-Finder nach Zutat & Buff',
    ),
    description: getLoc(locale,
      '免费星露谷物语料理食谱查询：全部料理按食材反查（"我有这个食材能做什么"）、按增益（钓鱼/采矿/战斗…）和来源筛选，每道菜列食材数量、解锁方式、回血回体力、buff 时长和售价。',
      'Free Stardew Valley recipe finder. Reverse-lookup every dish by ingredient ("what can I cook with this?"), filter by buff (fishing/mining/combat…) and source. Each recipe shows ingredient quantities, how to unlock, energy/health, buff duration, and sell price.',
      '免費星露谷物語料理食譜查詢：全部料理按食材反查（「我有這個食材能做什麼」）、按增益（釣魚/採礦/戰鬥…）和來源篩選，每道菜列食材數量、解鎖方式、回血回體力、buff 時長和售價。',
      '無料のスターデューバレー料理レシピ検索。食材から逆引き（「この食材で何が作れる？」）、バフ（釣り/採掘/戦闘…）や入手方法で絞り込み。各料理の材料数・解放条件・回復量・バフ時間・売値を表示。',
      '무료 스타듀밸리 요리 레시피 검색. 재료로 역검색("이 재료로 뭘 만들지?"), 버프(낚시/채광/전투…)와 출처로 필터. 각 요리의 재료 수량·해금 방법·회복량·버프 시간·판매가 표시.',
      'Kostenloser Stardew-Valley-Rezeptfinder. Rückwärtssuche nach Zutat, Filter nach Buff (Angeln/Bergbau/Kampf…) und Quelle. Jedes Rezept zeigt Zutatenmengen, Freischaltung, Energie/Gesundheit, Buff-Dauer und Verkaufspreis.',
    ),
    alternates: {
      canonical: `${BASE_URL}/${locale}/tools/stardew-cooking`,
      languages: buildLanguageAlternates('/tools/stardew-cooking'),
    },
  }
}

export default async function StardewCookingPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <nav className="mb-6 text-sm text-[#8a9a7a]">
        <Link href={`/${locale}/tools`} className="hover:text-[#e8dcc8]">
          {getLoc(locale, '工具集', 'Tools', '工具集', 'ツール', '도구', 'Tools')}
        </Link>
        <span className="mx-2">›</span>
        <span className="text-[#e8dcc8]">
          {getLoc(locale, '料理食谱', 'Recipes', '料理食譜', '料理レシピ', '요리 레시피', 'Rezepte')}
        </span>
      </nav>
      <h1 className="mb-2 text-3xl font-bold text-[#e8dcc8]">
        {getLoc(locale, '星露谷物语料理食谱查询', 'Stardew Valley Cooking Recipes', '星露谷物語料理食譜查詢', 'スターデューバレー 料理レシピ検索', '스타듀밸리 요리 레시피', 'Stardew Valley Kochrezepte')}
      </h1>
      <p className="mb-8 text-[#8a9a7a]">
        {getLoc(locale,
          '按食材反查（"我有这个食材能做什么"）、按增益和来源筛选。每道菜列食材数量、解锁方式、回血回体力、buff 时长和售价。',
          'Reverse-lookup by ingredient, filter by buff and source. Each recipe shows ingredient quantities, how to unlock, energy/health restored, buff duration, and sell price.',
          '按食材反查（「我有這個食材能做什麼」）、按增益和來源篩選。每道菜列食材數量、解鎖方式、回血回體力、buff 時長和售價。',
          '食材から逆引き、バフや入手方法で絞り込み。各料理の材料数・解放条件・回復量・バフ時間・売値を表示。',
          '재료로 역검색, 버프와 출처로 필터. 각 요리의 재료 수량·해금 방법·회복량·버프 시간·판매가 표시.',
          'Rückwärtssuche nach Zutat, Filter nach Buff und Quelle. Jedes Rezept zeigt Mengen, Freischaltung, Energie/Gesundheit, Buff-Dauer und Verkaufspreis.',
        )}
      </p>
      <StardewCookingFinder locale={locale} />
      <div className="mt-12 border-t border-[#2d3d2d] pt-8">
        <h2 className="mb-4 text-lg font-semibold text-[#e8dcc8]">
          {getLoc(locale, '相关工具', 'Related Tools', '相關工具', '関連ツール', '관련 도구', 'Verwandte Tools')}
        </h2>
        <div className="flex flex-wrap gap-3">
          <Link href={`/${locale}/tools/stardew-gifts`} className="rounded-lg border border-[#2d3d2d] px-4 py-2 text-sm text-[#8a9a7a] hover:text-[#e8dcc8] transition-colors">
            {getLoc(locale, '送礼喜好查询 →', 'Gift Guide →', '送禮喜好查詢 →', '贈り物ガイド →', '선물 가이드 →', 'Geschenk-Guide →')}
          </Link>
          <Link href={`/${locale}/tools/stardew-fish`} className="rounded-lg border border-[#2d3d2d] px-4 py-2 text-sm text-[#8a9a7a] hover:text-[#e8dcc8] transition-colors">
            {getLoc(locale, '鱼类查询 →', 'Fish Finder →', '魚類查詢 →', '魚検索 →', '물고기 찾기 →', 'Fisch-Finder →')}
          </Link>
        </div>
      </div>
    </div>
  )
}
```

- [ ] **Step 3: Register in DATA_TOOLS**

Append to `DATA_TOOLS` in `src/app/[locale]/tools/page.tsx`:
```ts
  {
    key: 'stardew-cooking',
    href: 'tools/stardew-cooking',
    titles: {
      zh: '星露谷物语料理食谱查询', 'zh-TW': '星露谷物語料理食譜查詢',
      ja: 'スターデューバレー 料理レシピ検索', ko: '스타듀밸리 요리 레시피',
      de: 'Stardew Valley Kochrezepte', en: 'Stardew Valley Cooking Recipes',
    },
    descs: {
      zh: '按食材反查、按增益和来源筛选料理，含食材数量、解锁方式、回复量、buff 时长和售价。',
      'zh-TW': '按食材反查、按增益和來源篩選料理，含食材數量、解鎖方式、回復量、buff 時長和售價。',
      ja: '食材で逆引き、バフ・入手方法で料理を絞り込み。材料数・回復量・売値付き。',
      ko: '재료로 역검색, 버프·출처로 요리 필터. 재료 수량·회복량·판매가 포함.',
      de: 'Rezepte per Rückwärtssuche nach Zutat, Buff und Quelle — mit Mengen, Erholung und Preis.',
      en: 'Reverse-lookup recipes by ingredient, filter by buff and source — with quantities, restore, buffs, and price.',
    },
    tags: { zh: 'Stardew Valley', 'zh-TW': 'Stardew Valley', ja: 'Stardew Valley', ko: 'Stardew Valley', de: 'Stardew Valley', en: 'Stardew Valley' },
  },
```

- [ ] **Step 4: Add to sitemap**

In `src/app/sitemap.ts` line 61, add `'/tools/stardew-cooking'` to the path array.

- [ ] **Step 5: Update roadmap**

In `docs/seo/tools-roadmap.json`: move `stardew-cooking` from `queue[]` to `shipped[]`, `"status": "done"`, `"covers": ["stardew valley recipes", "stardew valley cooking", "stardew recipes", "stardew cooking"]`, bump `"updated": "2026-07-08"`.

- [ ] **Step 6: Build + verify**

Run: `npm run build` → exit 0.
Then `npm run dev`, open `http://localhost:3000/en/tools/stardew-cooking` and verify: ingredient reverse-lookup narrows results; buff filter narrows; source filter narrows; name search works; each card shows ingredients×qty, source, energy/health/price, buffs+duration; the `/en/tools` grid shows the new card.

- [ ] **Step 7: Commit**

```bash
git add src/components/tools/StardewCookingFinder.tsx "src/app/[locale]/tools/stardew-cooking/page.tsx" "src/app/[locale]/tools/page.tsx" src/app/sitemap.ts docs/seo/tools-roadmap.json
git commit -m "feat(tools): add Stardew Valley cooking recipe finder"
```

---

## Final verification

- [ ] `npm test` — all suites green (4 new: villager data/filters, cooking data/filters).
- [ ] `npm run build` — exit 0.
- [ ] Both routes render in all 6 locales (spot-check `en`, `zh`, `ja`).
- [ ] `/tools` grid shows both new cards under Game Database.
- [ ] `tools-roadmap.json`: `queue[]` no longer contains cooking or villagers; both in `shipped[]`; `updated` = 2026-07-08.
- [ ] Update memory `project_game_database_tools.md` shipped list + next-in-queue pointer (next = stardew-mines).

## Self-review notes (addressed)

- **Spec coverage:** cooking reverse-lookup+buff+source+search (B2/B3), villagers marriage-comparator default + full-cast toggle + interlinks (A3), 6-lang SEO (A3/B3), registration+sitemap+roadmap (A3/B3), gen-script re-runnable data (A1/B1). All covered.
- **Spec refinement:** added `sourceCat` to `CookRecipe` (spec's `source` was localized text only — a filterable bucket is needed for the "by source" filter). Marriage-item thresholds live in the page copy (per spec's "轻量约定"), not per-villager fields.
- **Type consistency:** `pickVil`/`pickCook`, `filterVillagers`/`filterRecipes`, `VilLoc`/`CookLoc` used consistently across each tool's tasks.
