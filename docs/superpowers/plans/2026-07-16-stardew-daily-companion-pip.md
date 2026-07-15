# Stardew Daily Companion (PiP) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship a `/tools/stardew-companion` "today panel" players pin as an always-on-top overlay (Document Picture-in-Picture) while playing Stardew Valley.

**Architecture:** Extract two inlined datasets into shared modules, add a pure `stardewDay.ts` intelligence module that turns (season, day) into today's birthdays+gifts / festival / tomorrow heads-up plus this-season fish and still-plantable crops, then a client component that renders the panel inline and can portal it into a Document PiP window (graceful fallback to a popup/inline when unsupported).

**Tech Stack:** Next.js App Router (RSC page + client component), TypeScript, Tailwind, Vitest. Reuses existing `stardewGiftData.ts` and `stardewFishData.ts`; no new data scraping.

## Global Constraints

- All user-facing strings in **6 languages**: en, zh, zh-TW, ja, ko, de. Use the existing inline `pick()`/`getLoc()` pattern (data modules return localized `…Loc` objects or flat `name<Lang>` fields; components pick the language).
- **Never display weather** — Stardew daily weather is per-save RNG and unverifiable. Out of scope, do not add.
- Client state restore/save uses `useEffect` reading `window`/`localStorage` — **never** `useSearchParams` (avoids Suspense boundary). Wrap `localStorage` in try/catch.
- Data-extraction refactors must be **behavior-preserving**: the full `vitest` suite stays green after each.
- Season order for "tomorrow" wrap: spring → summer → fall → winter → spring. Each season is 28 days.
- Crop "still plantable" rule: a crop planted on `day` matures on `day + days`; plantable iff `days <= 28 - day`. Include crops whose `season === chosenSeason || season === 'any'`.
- Follow the existing tool file layout: pure logic in `src/lib/tools/`, client components in `src/components/tools/`, route in `src/app/[locale]/tools/<slug>/page.tsx`, tests in `src/__tests__/tools/`.

---

### Task 1: Extract FESTIVALS into a shared data module

**Files:**
- Create: `src/lib/tools/stardewCalendarData.ts`
- Modify: `src/components/tools/StardewCalendar.tsx` (remove inline `Festival` interface + `FESTIVALS` const around lines 62–79; import them instead)
- Test: `src/__tests__/tools/stardewCalendarData.test.ts`

**Interfaces:**
- Produces: `export type Season = 'spring'|'summer'|'fall'|'winter'`, `export interface Festival { season: Season; days: number[]; name: { en:string; zh:string; zhTW:string; ja:string; ko:string; de:string } }`, `export const FESTIVALS: Festival[]`.

- [ ] **Step 1: Write the failing test**

```ts
// src/__tests__/tools/stardewCalendarData.test.ts
import { describe, it, expect } from 'vitest'
import { FESTIVALS } from '@/lib/tools/stardewCalendarData'

describe('stardewCalendarData', () => {
  it('includes the Egg Festival on spring 13', () => {
    const egg = FESTIVALS.find((f) => f.season === 'spring' && f.days.includes(13))
    expect(egg?.name.en).toBe('Egg Festival')
  })
  it('every festival has all 6 languages', () => {
    for (const f of FESTIVALS)
      for (const k of ['en', 'zh', 'zhTW', 'ja', 'ko', 'de'] as const)
        expect(f.name[k]).toBeTruthy()
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/__tests__/tools/stardewCalendarData.test.ts`
Expected: FAIL — cannot resolve `@/lib/tools/stardewCalendarData`.

- [ ] **Step 3: Create the data module**

Cut the `Festival` interface and `FESTIVALS` array verbatim from `StardewCalendar.tsx` into the new file, exporting both, plus the `Season` type:

```ts
// src/lib/tools/stardewCalendarData.ts
export type Season = 'spring' | 'summer' | 'fall' | 'winter'

export interface Festival {
  season: Season
  days: number[]
  name: { en: string; zh: string; zhTW: string; ja: string; ko: string; de: string }
}

// Festivals sourced from the official Stardew Valley wiki (per-language Calendar pages).
export const FESTIVALS: Festival[] = [
  // …paste the exact array currently in StardewCalendar.tsx (all seasons)…
]
```

- [ ] **Step 4: Update `StardewCalendar.tsx` to import**

Remove the inline `interface Festival` and `const FESTIVALS`; add at the top with the other imports:

```ts
import { FESTIVALS, type Festival } from '@/lib/tools/stardewCalendarData'
```

Keep the component's own `Season` type usage working (if the component declares its own `Season`, leave it; the module's `Season` is structurally identical).

- [ ] **Step 5: Run the new test + the full suite**

Run: `npx vitest run`
Expected: PASS — new test green, all existing tests still green.

- [ ] **Step 6: Commit**

```bash
git add src/lib/tools/stardewCalendarData.ts src/components/tools/StardewCalendar.tsx src/__tests__/tools/stardewCalendarData.test.ts
git commit -m "refactor(tools): extract FESTIVALS into shared stardewCalendarData"
```

---

### Task 2: Extract CROPS into a shared data module

**Files:**
- Create: `src/lib/tools/stardewCropData.ts`
- Modify: `src/components/tools/StardewCalculator.tsx` (remove inline `interface Crop` + `const CROPS` around lines 5–20+; import instead)
- Test: `src/__tests__/tools/stardewCropData.test.ts`

**Interfaces:**
- Produces: `export interface Crop { nameEn:string; nameZh:string; nameZhTW:string; nameJa:string; nameKo:string; nameDe:string; season:'spring'|'summer'|'fall'|'any'; seedCost:number; sellPrice:number; days:number; regrowDays:number; perPick:number }`, `export const CROPS: Crop[]`.

- [ ] **Step 1: Write the failing test**

```ts
// src/__tests__/tools/stardewCropData.test.ts
import { describe, it, expect } from 'vitest'
import { CROPS } from '@/lib/tools/stardewCropData'

describe('stardewCropData', () => {
  it('has Melon as a 12-day summer crop', () => {
    const melon = CROPS.find((c) => c.nameEn === 'Melon')
    expect(melon).toMatchObject({ season: 'summer', days: 12 })
  })
  it('every crop has all 6 name languages', () => {
    for (const c of CROPS)
      for (const k of ['nameEn', 'nameZh', 'nameZhTW', 'nameJa', 'nameKo', 'nameDe'] as const)
        expect(c[k]).toBeTruthy()
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/__tests__/tools/stardewCropData.test.ts`
Expected: FAIL — cannot resolve module.

- [ ] **Step 3: Create the data module**

Cut the `Crop` interface and `CROPS` array verbatim from `StardewCalculator.tsx` into the new file and export both.

```ts
// src/lib/tools/stardewCropData.ts
export interface Crop {
  nameEn: string; nameZh: string; nameZhTW: string; nameJa: string; nameKo: string; nameDe: string
  season: 'spring' | 'summer' | 'fall' | 'any'
  seedCost: number; sellPrice: number; days: number; regrowDays: number; perPick: number
}

export const CROPS: Crop[] = [
  // …paste the exact array currently in StardewCalculator.tsx…
]
```

- [ ] **Step 4: Update `StardewCalculator.tsx` to import**

Remove the inline `interface Crop` and `const CROPS`; add:

```ts
import { CROPS, type Crop } from '@/lib/tools/stardewCropData'
```

- [ ] **Step 5: Run the full suite**

Run: `npx vitest run`
Expected: PASS — all green (calculator behavior unchanged).

- [ ] **Step 6: Commit**

```bash
git add src/lib/tools/stardewCropData.ts src/components/tools/StardewCalculator.tsx src/__tests__/tools/stardewCropData.test.ts
git commit -m "refactor(tools): extract CROPS into shared stardewCropData"
```

---

### Task 3: `stardewDay.ts` — the pure day-intelligence module

**Files:**
- Create: `src/lib/tools/stardewDay.ts`
- Test: `src/__tests__/tools/stardewDay.test.ts`

**Interfaces:**
- Consumes: `GIFT_VILLAGERS`, `GIFT_ITEMS`, `GiftLoc` from `@/components/tools/stardewGiftData`; `FISH`, `type Fish` from `@/components/tools/stardewFishData`; `FESTIVALS`, `type Festival`, `type Season` from `@/lib/tools/stardewCalendarData`; `CROPS`, `type Crop` from `@/lib/tools/stardewCropData`.
- Produces:
  - `export interface BirthdayEntry { villager: GiftLoc; loves: GiftLoc[] }`
  - `export interface DaySummary { birthdays: BirthdayEntry[]; festivalToday: Festival | null; tomorrowBirthdays: BirthdayEntry[] }`
  - `export interface SeasonWindow { fish: Fish[]; plantableCrops: Crop[] }`
  - `export function daySummary(season: Season, day: number): DaySummary`
  - `export function seasonWindow(season: Season, day: number): SeasonWindow`
  - `export function nextDay(season: Season, day: number): { season: Season; day: number }`

- [ ] **Step 1: Write the failing tests**

```ts
// src/__tests__/tools/stardewDay.test.ts
import { describe, it, expect } from 'vitest'
import { daySummary, seasonWindow, nextDay } from '@/lib/tools/stardewDay'

describe('stardewDay.daySummary', () => {
  it("returns Abigail with her loved gifts on fall 13", () => {
    const s = daySummary('fall', 13)
    const abby = s.birthdays.find((b) => b.villager.en === 'Abigail')
    expect(abby).toBeTruthy()
    const loveNames = abby!.loves.map((l) => l.en)
    expect(loveNames).toContain('Amethyst')
    expect(loveNames).toContain('Pumpkin')
  })
  it('returns the Egg Festival on spring 13', () => {
    expect(daySummary('spring', 13).festivalToday?.name.en).toBe('Egg Festival')
  })
  it('has no festival on a plain day', () => {
    expect(daySummary('spring', 2).festivalToday).toBeNull()
  })
  it("tomorrow after spring 28 is summer day 1's birthdays", () => {
    const wrap = daySummary('spring', 28)
    const summer1 = daySummary('summer', 1)
    expect(wrap.tomorrowBirthdays.map((b) => b.villager.en).sort())
      .toEqual(summer1.birthdays.map((b) => b.villager.en).sort())
  })
})

describe('stardewDay.seasonWindow', () => {
  it('includes Melon early in summer but not late', () => {
    expect(seasonWindow('summer', 1).plantableCrops.some((c) => c.nameEn === 'Melon')).toBe(true)
    expect(seasonWindow('summer', 20).plantableCrops.some((c) => c.nameEn === 'Melon')).toBe(false) // 12 > 28-20=8
  })
  it('lists at least one fish for every season', () => {
    for (const s of ['spring', 'summer', 'fall', 'winter'] as const)
      expect(seasonWindow(s, 1).fish.length).toBeGreaterThan(0)
  })
})

describe('stardewDay.nextDay', () => {
  it('advances within a season', () => {
    expect(nextDay('spring', 5)).toEqual({ season: 'spring', day: 6 })
  })
  it('wraps 28 to the next season day 1', () => {
    expect(nextDay('winter', 28)).toEqual({ season: 'spring', day: 1 })
  })
})
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `npx vitest run src/__tests__/tools/stardewDay.test.ts`
Expected: FAIL — cannot resolve `@/lib/tools/stardewDay`.

- [ ] **Step 3: Implement the module**

```ts
// src/lib/tools/stardewDay.ts
import { GIFT_VILLAGERS, GIFT_ITEMS, type GiftLoc } from '@/components/tools/stardewGiftData'
import { FISH, type Fish } from '@/components/tools/stardewFishData'
import { FESTIVALS, type Festival, type Season } from '@/lib/tools/stardewCalendarData'
import { CROPS, type Crop } from '@/lib/tools/stardewCropData'

export interface BirthdayEntry { villager: GiftLoc; loves: GiftLoc[] }
export interface DaySummary { birthdays: BirthdayEntry[]; festivalToday: Festival | null; tomorrowBirthdays: BirthdayEntry[] }
export interface SeasonWindow { fish: Fish[]; plantableCrops: Crop[] }

const SEASON_ORDER: Season[] = ['spring', 'summer', 'fall', 'winter']

export function nextDay(season: Season, day: number): { season: Season; day: number } {
  if (day < 28) return { season, day: day + 1 }
  const i = SEASON_ORDER.indexOf(season)
  return { season: SEASON_ORDER[(i + 1) % 4], day: 1 }
}

function birthdaysOn(season: Season, day: number): BirthdayEntry[] {
  return GIFT_VILLAGERS
    .filter((v) => v.season === season && v.day === day)
    .map((v) => ({
      villager: v.name,
      // resolve loved-gift keys to localized item names; skip any unknown key
      loves: v.loves.map((k) => GIFT_ITEMS[k]).filter((x): x is GiftLoc => Boolean(x)),
    }))
}

export function daySummary(season: Season, day: number): DaySummary {
  const t = nextDay(season, day)
  return {
    birthdays: birthdaysOn(season, day),
    festivalToday: FESTIVALS.find((f) => f.season === season && f.days.includes(day)) ?? null,
    tomorrowBirthdays: birthdaysOn(t.season, t.day),
  }
}

export function seasonWindow(season: Season, day: number): SeasonWindow {
  const daysLeft = 28 - day
  return {
    fish: FISH.filter((f) => f.seasons.includes(season)),
    plantableCrops: CROPS.filter(
      (c) => (c.season === season || c.season === 'any') && c.days <= daysLeft,
    ),
  }
}
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `npx vitest run src/__tests__/tools/stardewDay.test.ts`
Expected: PASS (all cases).

- [ ] **Step 5: Commit**

```bash
git add src/lib/tools/stardewDay.ts src/__tests__/tools/stardewDay.test.ts
git commit -m "feat(tools): stardewDay pure module (birthdays/festival/tomorrow + season window)"
```

---

### Task 4: `pipOverlay.ts` — Document PiP helper with fallback

**Files:**
- Create: `src/lib/tools/pipOverlay.ts`
- Test: `src/__tests__/tools/pipOverlay.test.ts`

**Interfaces:**
- Produces:
  - `export function supportsDocumentPiP(): boolean`
  - `export async function openPiPWindow(opts?: { width?: number; height?: number }): Promise<Window | null>` — returns the PiP (or popup) window with the page's stylesheets copied in, or `null` if neither path is available (e.g., popup blocked).

- [ ] **Step 1: Write the failing test**

```ts
// src/__tests__/tools/pipOverlay.test.ts
import { describe, it, expect } from 'vitest'
import { supportsDocumentPiP } from '@/lib/tools/pipOverlay'

describe('pipOverlay', () => {
  it('reports no Document PiP support in jsdom', () => {
    expect(supportsDocumentPiP()).toBe(false)
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/__tests__/tools/pipOverlay.test.ts`
Expected: FAIL — cannot resolve module.

- [ ] **Step 3: Implement the helper**

```ts
// src/lib/tools/pipOverlay.ts
// Isolates the Document Picture-in-Picture API. When unsupported, falls back
// to a normal popup window; returns null if that is blocked too. The caller
// renders React into the returned window via createPortal.

export function supportsDocumentPiP(): boolean {
  return typeof window !== 'undefined' && 'documentPictureInPicture' in window
}

function copyStyles(target: Window) {
  for (const sheet of Array.from(document.styleSheets)) {
    try {
      const css = Array.from(sheet.cssRules).map((r) => r.cssText).join('')
      const style = target.document.createElement('style')
      style.textContent = css
      target.document.head.appendChild(style)
    } catch {
      // cross-origin sheet: re-link it instead
      const link = target.document.createElement('link')
      if (sheet.href) { link.rel = 'stylesheet'; link.href = sheet.href; target.document.head.appendChild(link) }
    }
  }
}

export async function openPiPWindow(opts?: { width?: number; height?: number }): Promise<Window | null> {
  const width = opts?.width ?? 360
  const height = opts?.height ?? 560
  if (supportsDocumentPiP()) {
    // @ts-expect-error documentPictureInPicture is not yet in TS lib DOM
    const win: Window = await window.documentPictureInPicture.requestWindow({ width, height })
    copyStyles(win)
    return win
  }
  const popup = window.open('', 'stardew-companion', `width=${width},height=${height}`)
  if (popup) copyStyles(popup)
  return popup
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run src/__tests__/tools/pipOverlay.test.ts`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/lib/tools/pipOverlay.ts src/__tests__/tools/pipOverlay.test.ts
git commit -m "feat(tools): pipOverlay helper (Document PiP with popup fallback)"
```

---

### Task 5: `StardewDailyCompanion.tsx` — the client component

**Files:**
- Create: `src/components/tools/StardewDailyCompanion.tsx`
- Test: (covered by Task 3's pure-module tests; the component is presentational + PiP glue, following the project's existing no-render-test convention for tools)

**Interfaces:**
- Consumes: `daySummary`, `seasonWindow`, `nextDay` from `@/lib/tools/stardewDay`; `type Season` from `@/lib/tools/stardewCalendarData`; `openPiPWindow`, `supportsDocumentPiP` from `@/lib/tools/pipOverlay`.
- Produces: `export function StardewDailyCompanion({ locale }: { locale: string })`.

- [ ] **Step 1: Implement the component**

Model styling/`pick()`/localStorage-restore on `StardewGreenhousePlanner.tsx`. Structure:

```tsx
'use client'
import { useEffect, useMemo, useState } from 'react'
import { createPortal } from 'react-dom'
import { daySummary, seasonWindow, nextDay } from '@/lib/tools/stardewDay'
import type { Season } from '@/lib/tools/stardewCalendarData'
import { openPiPWindow, supportsDocumentPiP } from '@/lib/tools/pipOverlay'

type Loc = { en: string; zh: string; zhTW: string; ja: string; ko: string; de: string }
function pick(l: Loc, locale: string): string {
  if (locale === 'zh') return l.zh
  if (locale === 'zh-TW') return l.zhTW
  if (locale === 'ja') return l.ja
  if (locale === 'ko') return l.ko
  if (locale === 'de') return l.de
  return l.en
}
const SEASONS: { key: Season; label: Loc }[] = [
  { key: 'spring', label: { en: 'Spring', zh: '春', zhTW: '春', ja: '春', ko: '봄', de: 'Frühling' } },
  { key: 'summer', label: { en: 'Summer', zh: '夏', zhTW: '夏', ja: '夏', ko: '여름', de: 'Sommer' } },
  { key: 'fall',   label: { en: 'Fall',   zh: '秋', zhTW: '秋', ja: '秋', ko: '가을', de: 'Herbst' } },
  { key: 'winter', label: { en: 'Winter', zh: '冬', zhTW: '冬', ja: '冬', ko: '겨울', de: 'Winter' } },
]
const STORAGE_KEY = 'stardew-companion-date-v1'

export function StardewDailyCompanion({ locale }: { locale: string }) {
  const [season, setSeason] = useState<Season>('spring')
  const [day, setDay] = useState(1)
  const [pipWin, setPipWin] = useState<Window | null>(null)
  const L = (en:string,zh:string,zhTW:string,ja:string,ko:string,de:string)=>pick({en,zh,zhTW,ja,ko,de},locale)

  // restore
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) { const s = JSON.parse(raw); if (s?.season && s?.day) { setSeason(s.season); setDay(s.day) } }
    } catch { /* ignore */ }
  }, [])
  // save
  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify({ season, day })) } catch { /* ignore */ }
  }, [season, day])
  // close PiP on unmount
  useEffect(() => () => { pipWin?.close?.() }, [pipWin])

  const summary = useMemo(() => daySummary(season, day), [season, day])
  const window_ = useMemo(() => seasonWindow(season, day), [season, day])

  const advance = () => { const t = nextDay(season, day); setSeason(t.season); setDay(t.day) }
  const pin = async () => {
    const w = await openPiPWindow({ width: 360, height: 560 })
    if (w) { setPipWin(w); w.addEventListener('pagehide', () => setPipWin(null)) }
  }

  // The panel body is a function so it can render both inline and (via portal) in the PiP window.
  const Panel = (
    <div className="space-y-4 bg-[#0f1a0f] p-4 text-[#e8dcc8]">
      {/* date controls: season <select>, day stepper 1..28, Next Day button */}
      {/* Today: birthdays (each villager + comma-joined loved gift names), festivalToday, tomorrow heads-up */}
      {/* Season window: fish list, plantable crops list; if plantableCrops empty show
          "nothing worth planting this late — try the greenhouse" linking /tools/stardew-greenhouse */}
    </div>
  )

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center gap-2">
        {/* season select + day input + Next Day */}
        <button type="button" onClick={pin} className="rounded-lg border border-[#f0a832] bg-[#f0a832]/15 px-3 py-1.5 text-sm text-[#e8dcc8]">
          📌 {L('Pin as overlay', '钉在游戏上', '釘在遊戲上', 'オーバーレイ固定', '게임 위에 고정', 'Als Overlay anheften')}
        </button>
        {!supportsDocumentPiP() && (
          <span className="text-xs text-[#8a9a7a]">
            {L('Opens a floating window. For a true always-on-top overlay, use Chrome and run Stardew in windowed mode.',
               '会打开一个浮窗。要真正置顶叠在游戏上，请用 Chrome 并让星露谷以窗口模式运行。',
               '會開啟一個浮窗。要真正置頂疊在遊戲上，請用 Chrome 並讓星露谷以視窗模式運行。',
               'フローティングウィンドウが開きます。常時最前面のオーバーレイには Chrome とウィンドウモードを使用してください。',
               '떠 있는 창이 열립니다. 항상 위 오버레이는 Chrome과 창 모드를 사용하세요.',
               'Öffnet ein schwebendes Fenster. Für ein echtes Overlay Chrome und den Fenstermodus verwenden.')}
          </span>
        )}
      </div>
      {pipWin ? createPortal(Panel, pipWin.document.body) : Panel}
    </div>
  )
}
```

Fill in the `Panel` JSX completely: season `<select>` (options from `SEASONS`), a day `<input type=number min=1 max=28>` clamped to [1,28], a "Next Day" button calling `advance()`; the Today block iterating `summary.birthdays` (show `pick(b.villager, locale)` and its loves as `b.loves.map(g => pick(g, locale)).join(', ')`), `summary.festivalToday` (show `pick(name, locale)` when present), and a tomorrow line from `summary.tomorrowBirthdays`; the Season block listing `window_.fish` names and `window_.plantableCrops` names, with the empty-crops greenhouse fallback link. Use the same color tokens as the greenhouse planner.

- [ ] **Step 2: Typecheck via build (component has no unit test)**

Run: `npm run build`
Expected: exit 0, no TypeScript errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/tools/StardewDailyCompanion.tsx
git commit -m "feat(tools): StardewDailyCompanion component with PiP pin + portal"
```

---

### Task 6: SEO page, hub registration, cross-links, roadmap

**Files:**
- Create: `src/app/[locale]/tools/stardew-companion/page.tsx`
- Modify: `src/app/[locale]/tools/page.tsx` (add `stardew-companion` to `DATA_TOOLS`)
- Modify: `src/app/[locale]/tools/stardew-calendar/page.tsx` and `src/app/[locale]/tools/stardew-gifts/page.tsx` (add a "→ Daily Companion (pin it while you play)" related link)
- Modify: `docs/seo/tools-roadmap.json` (record the tool as shipped)
- Test: live render verification in Task 7

**Interfaces:**
- Consumes: `StardewDailyCompanion` from `@/components/tools/StardewDailyCompanion`; `BASE_URL`, `buildLanguageAlternates` from `@/lib/config`.

- [ ] **Step 1: Create the page**

Copy the structure of `src/app/[locale]/tools/stardew-greenhouse/page.tsx`: `getLoc()` helper, `generateMetadata` with 6-language title/description targeting "what to check each Stardew day / daily companion", `canonical` + `buildLanguageAlternates('/tools/stardew-companion')`, nav breadcrumb, h1, one-paragraph intro, `<StardewDailyCompanion locale={locale} />`, a short crawlable explainer paragraph (what to check each in-game day — birthdays, festivals, seasonal fish/crops), and a Related Tools block linking `stardew-calendar`, `stardew-gifts`, `stardew-fish`, `stardew` (crop calculator), `stardew-greenhouse`.

Title (en): `Stardew Valley Daily Companion — Pin Today's Birthdays, Fish & Crops`. Provide zh/zh-TW/ja/ko/de equivalents in the same `getLoc` call.

- [ ] **Step 2: Register in the tools hub**

In `src/app/[locale]/tools/page.tsx`, append to `DATA_TOOLS` (after `stardew-greenhouse`), following the exact object shape (`key`, `href`, `titles{6}`, `descs{6}`, `tags{6}`):

```ts
{
  key: 'stardew-companion',
  href: 'tools/stardew-companion',
  titles: { en: 'Stardew Valley Daily Companion', zh: '星露谷物语每日助手', 'zh-TW': '星露谷物語每日助手', ja: 'スターデューバレー デイリーコンパニオン', ko: '스타듀밸리 데일리 도우미', de: 'Stardew Valley Tagesbegleiter' },
  descs: {
    en: "Pin a floating overlay while you play: today's birthdays + loved gifts, festivals, and this season's fish and still-plantable crops.",
    zh: '边玩边钉一个浮窗：今日生日+爱的礼物、节日，以及本季能钓的鱼和还来得及种的作物。',
    'zh-TW': '邊玩邊釘一個浮窗：今日生日+愛的禮物、節日，以及本季能釣的魚和還來得及種的作物。',
    ja: 'プレイ中に固定できるオーバーレイ：今日の誕生日＋好きな贈り物、フェス、今季の魚と間に合う作物。',
    ko: '플레이 중 고정하는 오버레이: 오늘의 생일+좋아하는 선물, 축제, 이번 계절 물고기와 아직 심을 수 있는 작물.',
    de: 'Schwebendes Overlay beim Spielen: heutige Geburtstage + Lieblingsgeschenke, Feste sowie Fische und noch pflanzbare Feldfrüchte der Saison.',
  },
  tags: { zh: 'Stardew Valley', 'zh-TW': 'Stardew Valley', ja: 'Stardew Valley', ko: 'Stardew Valley', de: 'Stardew Valley', en: 'Stardew Valley' },
},
```

- [ ] **Step 3: Add reciprocal links on calendar + gifts pages**

In each of `stardew-calendar/page.tsx` and `stardew-gifts/page.tsx`, add one `<Link href={`/${locale}/tools/stardew-companion`}>` in the related-tools row, label (en) "Daily Companion (pin while playing) →" with the 6-language `getLoc` variants.

- [ ] **Step 4: Record in the roadmap**

In `docs/seo/tools-roadmap.json`, add a shipped entry (or move from deferred) noting: `stardew-companion`, purpose = in-play PiP today-panel, reuses gifts/fish/calendar/crops, weather excluded (RNG), shipped 2026-07-16.

- [ ] **Step 5: Build**

Run: `npm run build`
Expected: exit 0; route `/[locale]/tools/stardew-companion` appears in the output.

- [ ] **Step 6: Commit**

```bash
git add "src/app/[locale]/tools/stardew-companion/page.tsx" "src/app/[locale]/tools/page.tsx" "src/app/[locale]/tools/stardew-calendar/page.tsx" "src/app/[locale]/tools/stardew-gifts/page.tsx" docs/seo/tools-roadmap.json
git commit -m "feat(tools): Stardew Daily Companion SEO page + hub registration + cross-links"
```

---

### Task 7: Full verification + ship

**Files:** none (verification only)

- [ ] **Step 1: Full test suite**

Run: `npx vitest run`
Expected: all tests pass (existing + `stardewCalendarData`, `stardewCropData`, `stardewDay`, `pipOverlay`).

- [ ] **Step 2: Production build**

Run: `npm run build`
Expected: exit 0; `/[locale]/tools/stardew-companion` listed.

- [ ] **Step 3: Push**

```bash
git push origin main
```

- [ ] **Step 4: Live render verification (SSR, all locales)**

After deploy, `curl` the page in en/zh/ko with a normal User-Agent; expect HTTP 200 and localized `<title>`. (Same method used for the greenhouse tool.)

- [ ] **Step 5: Interactive PiP verification**

Once Chrome remote-debugging is re-allowed (`chrome://inspect/#remote-debugging` → Allow), use browser-harness to open the page, click "📌 Pin as overlay", and confirm a PiP/popup window opens with the panel styled correctly. If Chrome is unavailable, note this as pending and rely on SSR + unit tests.

---

## Self-Review

**Spec coverage:**
- Today core (birthdays+gifts, festival, tomorrow) → Task 3 `daySummary` + Task 5 Panel. ✓
- Season window (fish, plantable crops) → Task 3 `seasonWindow` + Task 5 Panel. ✓
- Date state + localStorage → Task 5. ✓
- Pin as overlay + fallback → Task 4 + Task 5. ✓
- 6-language → enforced in every UI/data task + Global Constraints. ✓
- Shared data extraction (no duplication) → Tasks 1–2. ✓
- SEO page + registration + reciprocal links → Task 6. ✓
- Weather excluded → Global Constraints (no task adds it). ✓
- Testing (stardewDay facts, pip fallback) → Tasks 3, 4. ✓
- Empty-crops greenhouse fallback → Task 5 Panel. ✓

**Placeholder scan:** The only "…paste the exact array…" markers (Tasks 1–2) are deliberate verbatim moves of existing code, not new logic — the source arrays are named with exact file+line references. All new logic (Task 3–6) has complete code. No TBD/TODO in behavior.

**Type consistency:** `Season` is defined once in `stardewCalendarData.ts` and reused by `stardewDay.ts` and the component. `Crop`/`Fish`/`GiftLoc`/`Festival` names match across producer and consumer tasks. `nextDay`/`daySummary`/`seasonWindow` signatures are identical in the Interfaces block, the implementation (Task 3), and the consumer (Task 5).
