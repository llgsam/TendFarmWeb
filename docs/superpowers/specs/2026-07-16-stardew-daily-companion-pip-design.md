# Stardew Daily Companion (PiP) — Design Spec

**Date:** 2026-07-16
**Status:** Approved for implementation planning
**Route:** `/tools/stardew-companion`

## 1. Purpose

A compact "today panel" for Stardew Valley that a player keeps open **while playing** — pinned as an always-on-top floating window via the Document Picture-in-Picture API. It answers the high-frequency, time-sensitive questions a player faces at the start of each in-game day without alt-tabbing to a wiki.

This is primarily a **retention layer** on top of the site's existing high-traffic Stardew tools: players open it every play session and leave it running. It also gets its own indexable page targeting low-competition "what to do today / daily helper / companion" intent, but SEO is secondary — the tool's own page carries the keywords; the PiP carries the stickiness.

## 2. Target user

PC players who run Stardew in **windowed / borderless-window mode** (or on a second monitor) and already look things up while playing — the same audience as the existing calendar/gifts/fish tools. Fullscreen-exclusive players and handheld/controller players are out of scope for the pinned overlay (they can still use the inline page).

## 3. Scope

### In scope (v1)
- **Today core:** for a chosen in-game date (season + day 1–28):
  - Which villager(s) have a **birthday today**, each with their **loved gifts** listed.
  - **Today's festival**, if any.
  - A **"tomorrow: X's birthday"** heads-up line (gift prep needs a day's notice).
- **Season window** for the chosen season:
  - **Fish catchable this season.**
  - **Crops still worth planting** — those whose grow time fits the days left in the season (`days <= 28 - currentDay`).
- **Date state:** user selects season + day, steps with a "next day" button, persisted in `localStorage`. No game integration (the web cannot read save state).
- **Pin as overlay:** a button that opens the panel in a Document PiP window; graceful fallback when unsupported.
- Full 6-language support (en/zh/zh-TW/ja/ko/de), matching every other tool.

### Out of scope (v1) — YAGNI
- **Weather.** Daily weather in Stardew is per-save RNG (only festivals and a few scripted days are fixed). It is not statically knowable, so we do **not** display it — showing it would be guessing. (Hard rule: never assert unverifiable data.)
- Heart-event trigger conditions library.
- Account/cloud sync of the chosen date.
- Any browser-extension / true-fullscreen overlay (that was Approach C, deferred).

## 4. Architecture

### 4.1 Shared data layer (refactor + reuse — no data duplication)

Existing data currently lives inline inside components. Extract the two inlined datasets into shared modules so the calendar tool, the crop calculator, and the new companion all import one source:

- `src/lib/tools/stardewCalendarData.ts` — export `FESTIVALS` only. Move the `FESTIVALS` array out of `StardewCalendar.tsx`; the calendar component imports it. (The calendar's own inline villager-birthday list is left untouched — the companion does **not** use it; see the next point.)
- `src/lib/tools/stardewCropData.ts` — export the `CROPS` array (`{ names…, season, seedCost, sellPrice, days, regrowDays, perPick }`). Move it out of `StardewCalculator.tsx`; the calculator imports it.
- **Birthdays + loved gifts:** the companion uses **`src/components/tools/stardewGiftData.ts`** (`GiftVillager { name, season, day, loves[] }`) as the single source of truth for birthdays — it carries both the birthday date and the loved gifts, so one lookup yields both. Reuse as-is (no move needed). Do not read birthdays from the calendar component's separate villager list, to avoid two divergent sources.
- **Fish** already come from `src/components/tools/stardewFishData.ts` with a `season` field. Reuse as-is.

These moves are behavior-preserving; existing calendar/calculator tests must stay green.

### 4.2 Day-intelligence module (the core, pure & testable)

`src/lib/tools/stardewDay.ts` — pure functions, no React, no DOM:

```ts
type Season = 'spring' | 'summer' | 'fall' | 'winter'

interface BirthdayEntry { villager: GiftLoc; loves: string[] }   // loves resolved to localized item names
interface DaySummary {
  birthdays: BirthdayEntry[]        // villagers whose birthday is (season, day)
  festivalToday: Festival | null    // festival whose season===season and days.includes(day)
  tomorrowBirthdays: BirthdayEntry[] // birthdays for the next day (wraps 28 -> day 1 of next season)
}
interface SeasonWindow {
  fish: FishLoc[]                   // fish catchable in this season
  plantableCrops: CropEntry[]       // crops with days <= (28 - day); flag regrowable
}

export function daySummary(season: Season, day: number): DaySummary
export function seasonWindow(season: Season, day: number): SeasonWindow
```

- All name fields stay as the localized `…Loc` objects; the component picks the language with the existing `pick()` helper. The module returns data, not strings.
- Loved-gift names are resolved through `GIFT_ITEMS` so the panel shows real item names.
- "Tomorrow" wraps: day 28 → day 1 of the next season (spring→summer→fall→winter→spring).

### 4.3 UI component

`src/components/tools/StardewDailyCompanion.tsx` (client):
- Renders: date controls (season select, day 1–28 stepper, "next day"), the Today block, the Season Window block (two compact lists: fish / plantable crops), and the "📌 Pin as overlay" button.
- State: `{ season, day }` in React state, restored from / saved to `localStorage` key `stardew-companion-date-v1` (same restore-then-autosave pattern as the sprinkler/greenhouse planners; read `window`/`localStorage` in `useEffect`, not `useSearchParams`).
- Compact dark styling that also reads well at ~320–380px wide (the PiP window size).

### 4.4 Picture-in-Picture mechanics

`src/lib/tools/pipOverlay.ts` — a small helper that isolates the PiP API:

```ts
export function supportsDocumentPiP(): boolean
export async function openInPiP(render: (win: Window) => void, opts?: { width?: number; height?: number }): Promise<Window | null>
```

- If `documentPictureInPicture` exists: `requestWindow({ width, height })`, **copy the page's stylesheets into the PiP document** (adopt `<style>`/`<link rel=stylesheet>` so Tailwind classes render), then mount the panel there.
- Fallback when unsupported (Safari, Firefox): `window.open('', '_blank', 'width=…,height=…')` popup with the same content, or — if popups are blocked — leave the inline panel and show a one-line note. The inline panel is always usable regardless.
- React integration: render the panel into the PiP window via a portal (`createPortal`) so it stays reactive to date changes while pinned.

### 4.5 SEO page

`src/app/[locale]/tools/stardew-companion/page.tsx`: metadata (6-lang), h1, short intro, the `<StardewDailyCompanion>`, a crawlable one-paragraph explainer ("what to check each Stardew day"), and reciprocal contextual links. Registered in `DATA_TOOLS` in `tools/page.tsx`. Added to `sitemap.ts` if tool routes are listed there.

## 5. Data flow

```
localStorage ─┐
              ├─▶ {season, day} (component state)
URL/default ──┘        │
                       ├─▶ daySummary(season, day) ──▶ Today block (birthdays+gifts, festival, tomorrow)
                       └─▶ seasonWindow(season, day) ─▶ Season block (fish, plantable crops)
                       │
      "Pin" button ────┴─▶ pipOverlay.openInPiP() ──▶ portal renders same panel in PiP window
```

## 6. Retention & cross-linking

- Reciprocal contextual links: `stardew-calendar` and `stardew-gifts` pages each add a "→ Daily Companion (pin it while you play)" link; the companion links back to calendar/gifts/fish/crop-calculator.
- The companion is the strongest answer to "why do players come back?" — it's opened every play session. This complements (does not replace) the still-open retention lever of progress-tracking on bundles/museum.

## 7. Error handling & edge cases

- Day out of range (not 1–28): clamp to [1, 28].
- No birthday / no festival today: show a friendly "nothing today" state, still show the season window.
- Season with no plantable crops left (e.g., day 26, all crops need >2 days): show "nothing worth planting this late — consider greenhouse" with a link to the greenhouse planner.
- PiP unsupported or popup blocked: inline panel remains fully functional; show a single explanatory line.
- `localStorage` unavailable (private mode): fall back to in-memory state, no crash (try/catch, same as existing tools).

## 8. Testing

`src/__tests__/tools/stardewDay.test.ts` — unit tests locking known facts:
- `daySummary('fall', 13)` includes Abigail with loved gifts containing Amethyst/Chocolate Cake/Pufferfish/Pumpkin/Spicy Eel (verify against `stardewGiftData.ts`).
- `daySummary('spring', 13).festivalToday` is the Egg Festival.
- `daySummary('spring', 28).tomorrowBirthdays` equals summer day 1 birthdays (wrap correctness).
- `seasonWindow('summer', 26).plantableCrops` excludes Melon (`days:12 > 2`) and includes any crop with `days <= 2` if present; `seasonWindow('summer', 1)` includes Melon.
- Determinism: same inputs → same output.

`src/__tests__/tools/pipOverlay.test.ts` (light) — `supportsDocumentPiP()` returns false when the API is absent (jsdom); `openInPiP` falls back without throwing.

Refactor safety: existing `StardewCalendar` / `StardewCalculator` tests (if any) stay green after data extraction; run the full suite.

## 9. Files touched

**New:**
- `src/lib/tools/stardewDay.ts`
- `src/lib/tools/pipOverlay.ts`
- `src/lib/tools/stardewCalendarData.ts`
- `src/lib/tools/stardewCropData.ts`
- `src/components/tools/StardewDailyCompanion.tsx`
- `src/app/[locale]/tools/stardew-companion/page.tsx`
- `src/__tests__/tools/stardewDay.test.ts`
- `src/__tests__/tools/pipOverlay.test.ts`

**Modified:**
- `src/components/tools/StardewCalendar.tsx` (import extracted FESTIVALS)
- `src/components/tools/StardewCalculator.tsx` (import extracted CROPS)
- `src/app/[locale]/tools/page.tsx` (register in DATA_TOOLS)
- `src/app/[locale]/tools/stardew-calendar/page.tsx`, `stardew-gifts/page.tsx` (reciprocal links)
- `docs/seo/tools-roadmap.json` (record the tool)
- `sitemap.ts` if applicable

## 10. Verification

`npm run build` (exit 0) + full `vitest` green, then push and verify the live page renders across en/zh/ko and the Pin button opens a PiP window (browser-harness, once Chrome remote-debugging is re-allowed).
