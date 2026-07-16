// Unified in-play item lookup: "I have item X — what do I do with it?"
//
// The four source datasets key items differently (gifts use English_underscore
// keys, bundles/museum/cooking use kebab keys + icon filenames), but all of
// them carry an English name. So the join key is the normalized English name.
// This module owns that join and nothing else — it is pure and framework-free.
//
// Scope is honest: the searchable set is the UNION of items appearing in the
// gift / bundle / museum / cooking (and fish, for price) datasets. It is not
// every item in the game — weapons, furniture and building materials are not
// covered, and callers should say so rather than imply completeness.

import { GIFT_ITEMS, GIFT_VILLAGERS, UNIVERSAL_LOVES } from '@/components/tools/stardewGiftData'
import { BUNDLE_ROOMS } from '@/components/tools/stardewBundleData'
import { MUSEUM_ITEMS, type MuseumCat } from '@/components/tools/stardewMuseumData'
import { COOK_RECIPES } from '@/components/tools/stardewCookingData'
import { FISH } from '@/components/tools/stardewFishData'

export type ItemLoc = { en: string; zh: string; zhTW: string; ja: string; ko: string; de: string }

export interface ItemBundleRef { bundle: ItemLoc; room: ItemLoc; qty: number }

export interface ItemFacts {
  key: string
  name: ItemLoc
  lovedBy: ItemLoc[]
  universalLove: boolean
  bundles: ItemBundleRef[]
  museum: { category: MuseumCat } | null
  recipes: ItemLoc[]
  sellPrice: number | null
}

// Drop annotation parentheses — "Stardrop Tea (+250)" is the same item as
// "Stardrop Tea". Descriptive parentheses are KEPT, because "Strange Doll
// (green)" and "Strange Doll (yellow)" are two different items.
// Accents are folded (ñ -> n) so a player typing the plain-ASCII "Pina Colada"
// still finds "Piña Colada".
export function normalizeItemName(s: string): string {
  return s
    .replace(/\(\s*[+-][^)]*\)/g, '')
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '') // strip combining diacritical marks
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '')
}

function pickLoc(l: ItemLoc, locale: string): string {
  if (locale === 'zh') return l.zh
  if (locale === 'zh-TW') return l.zhTW
  if (locale === 'ja') return l.ja
  if (locale === 'ko') return l.ko
  if (locale === 'de') return l.de
  return l.en
}

function buildIndex(): Map<string, ItemFacts> {
  const map = new Map<string, ItemFacts>()

  const ensure = (name: ItemLoc): ItemFacts => {
    const key = normalizeItemName(name.en)
    let f = map.get(key)
    if (!f) {
      f = { key, name, lovedBy: [], universalLove: false, bundles: [], museum: null, recipes: [], sellPrice: null }
      map.set(key, f)
    }
    return f
  }

  // gifts: villager -> loved item keys (into GIFT_ITEMS)
  for (const v of GIFT_VILLAGERS) {
    for (const loveKey of v.loves) {
      const item = GIFT_ITEMS[loveKey]
      if (!item) continue // unknown key: skip rather than crash
      ensure(item).lovedBy.push(v.name)
    }
  }
  for (const uKey of UNIVERSAL_LOVES) {
    const item = GIFT_ITEMS[uKey]
    if (item) ensure(item).universalLove = true
  }

  // bundles: room -> bundle -> items.
  // One bundle can list the same display name twice — either two distinct
  // source items that share a name (Animal Bundle has both a brown and a white
  // "Large Egg"), or a genuine duplicate row in the source data (Construction
  // Bundle lists Wood x99 twice). Either way the player only needs to be told
  // the bundle once, so refs are deduped per (room, bundle).
  for (const room of BUNDLE_ROOMS)
    for (const bundle of room.bundles)
      for (const item of bundle.items) {
        const f = ensure(item.name)
        const seen = f.bundles.some((b) => b.bundle.en === bundle.name.en && b.room.en === room.name.en)
        if (!seen) f.bundles.push({ bundle: bundle.name, room: room.name, qty: item.qty })
      }

  // museum: donatable artifacts/minerals
  for (const m of MUSEUM_ITEMS) ensure(m.name).museum = { category: m.category }

  // cooking: the recipe itself is an item (with a sell price), and each
  // ingredient gets a back-reference to the recipes that use it
  for (const r of COOK_RECIPES) {
    const dish = ensure(r.name)
    if (dish.sellPrice === null) dish.sellPrice = r.sellPrice
    for (const ing of r.ingredients) ensure(ing.name).recipes.push(r.name)
  }

  // fish: price only (season/location live in the fish finder)
  for (const f of FISH) {
    const item = ensure(f.name)
    if (item.sellPrice === null) item.sellPrice = f.price
  }

  return map
}

const INDEX = buildIndex()

export function lookupItem(query: string): ItemFacts | null {
  return INDEX.get(normalizeItemName(query)) ?? null
}

// Ranked search over both the normalized English key and the localized name,
// so a zh player can type 紫水晶 and a de player Amethyst.
export function searchItems(query: string, locale: string, limit = 8): ItemFacts[] {
  const raw = query.trim().toLowerCase()
  if (!raw) return []
  const norm = normalizeItemName(query)
  const scored: { f: ItemFacts; score: number }[] = []

  for (const f of INDEX.values()) {
    const local = pickLoc(f.name, locale).toLowerCase()
    let score = -1
    if (norm && f.key === norm) score = 0
    else if (local === raw) score = 1
    else if (norm && f.key.startsWith(norm)) score = 2
    else if (local.startsWith(raw)) score = 3
    else if (norm && f.key.includes(norm)) score = 4
    else if (local.includes(raw)) score = 5
    if (score >= 0) scored.push({ f, score })
  }

  return scored
    .sort((a, b) => a.score - b.score || a.f.name.en.localeCompare(b.f.name.en))
    .slice(0, limit)
    .map((s) => s.f)
}
