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
