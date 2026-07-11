// Shared 6-locale label helpers for tool-page SEO content (reference tables + summaries).
// The data files' FishLoc / GiftLoc are structurally identical to LocLabel, so consumers
// can pass their own label objects directly without changing those types.

export type LocLabel = { en: string; zh: string; zhTW: string; ja: string; ko: string; de: string }
export type Season = 'spring' | 'summer' | 'fall' | 'winter'

export function pickLoc(loc: LocLabel, locale: string): string {
  if (locale === 'zh') return loc.zh
  if (locale === 'zh-TW') return loc.zhTW
  if (locale === 'ja') return loc.ja
  if (locale === 'ko') return loc.ko
  if (locale === 'de') return loc.de
  return loc.en
}

export const SEASONS: Record<Season, LocLabel> = {
  spring: { en: 'Spring', zh: '春', zhTW: '春', ja: '春', ko: '봄', de: 'Frühling' },
  summer: { en: 'Summer', zh: '夏', zhTW: '夏', ja: '夏', ko: '여름', de: 'Sommer' },
  fall: { en: 'Fall', zh: '秋', zhTW: '秋', ja: '秋', ko: '가을', de: 'Herbst' },
  winter: { en: 'Winter', zh: '冬', zhTW: '冬', ja: '冬', ko: '겨울', de: 'Winter' },
}
