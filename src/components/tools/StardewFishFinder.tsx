'use client'

import { useMemo, useState } from 'react'
import { FISH, FISH_LOCATIONS, type FishLoc, type Season, type Weather } from './stardewFishData'

function pick(l: FishLoc, locale: string): string {
  if (locale === 'zh') return l.zh
  if (locale === 'zh-TW') return l.zhTW
  if (locale === 'ja') return l.ja
  if (locale === 'ko') return l.ko
  if (locale === 'de') return l.de
  return l.en
}

const SEASONS: { key: Season; emoji: string; label: FishLoc }[] = [
  { key: 'spring', emoji: '🌱', label: { zh: '春季', zhTW: '春季', en: 'Spring', ja: '春', ko: '봄', de: 'Frühling' } },
  { key: 'summer', emoji: '☀️', label: { zh: '夏季', zhTW: '夏季', en: 'Summer', ja: '夏', ko: '여름', de: 'Sommer' } },
  { key: 'fall', emoji: '🍂', label: { zh: '秋季', zhTW: '秋季', en: 'Fall', ja: '秋', ko: '가을', de: 'Herbst' } },
  { key: 'winter', emoji: '❄️', label: { zh: '冬季', zhTW: '冬季', en: 'Winter', ja: '冬', ko: '겨울', de: 'Winter' } },
]

const WEATHER_EMOJI: Record<Weather, string> = { any: '🌤️', sun: '☀️', rain: '🌧️' }

export function StardewFishFinder({ locale }: { locale: string }) {
  const [season, setSeason] = useState<Season | 'all'>('all')
  const [loc, setLoc] = useState<string>('all')
  const [weather, setWeather] = useState<'all' | 'sun' | 'rain'>('all')

  const t = (l: FishLoc) => pick(l, locale)
  const L = (zh: string, en: string, zhTW: string, ja: string, ko: string, de: string) =>
    t({ zh, zhTW, en, ja, ko, de })

  const locLabel = useMemo(() => {
    const m: Record<string, string> = {}
    FISH_LOCATIONS.forEach((c) => (m[c.key] = t(c.label)))
    return m
  }, [locale]) // eslint-disable-line react-hooks/exhaustive-deps

  const results = useMemo(() => {
    return FISH.filter((f) => {
      if (season !== 'all' && !f.seasons.includes(season)) return false
      if (loc !== 'all' && !f.locations.includes(loc)) return false
      if (weather !== 'all' && f.weather !== 'any' && f.weather !== weather) return false
      return true
    }).sort((a, b) => b.price - a.price)
  }, [season, loc, weather])

  const timeLabel = (f: (typeof FISH)[number]) =>
    f.anytime ? L('全天', 'Anytime', '全天', '終日', '언제나', 'Jederzeit') : f.time

  const btn = (active: boolean) =>
    `rounded-lg border px-3.5 py-2 text-sm font-medium transition-colors ${
      active ? 'border-[#f0a832] bg-[#f0a832]/10 text-[#f0a832]' : 'border-[#2d3d2d] text-[#8a9a7a] hover:text-[#e8dcc8]'
    }`

  return (
    <div>
      {/* Filters */}
      <div className="mb-6 space-y-4 rounded-xl border border-[#2d3d2d] bg-[#1a2e1a]/50 p-5">
        {/* Season */}
        <div>
          <span className="mb-2 block text-xs font-semibold uppercase tracking-wide text-[#8a9a7a]">
            {L('季节', 'Season', '季節', '季節', '계절', 'Jahreszeit')}
          </span>
          <div className="flex flex-wrap gap-2">
            <button onClick={() => setSeason('all')} className={btn(season === 'all')}>
              {L('全部', 'All', '全部', 'すべて', '전체', 'Alle')}
            </button>
            {SEASONS.map((s) => (
              <button key={s.key} onClick={() => setSeason(s.key)} className={btn(season === s.key)}>
                {s.emoji} {t(s.label)}
              </button>
            ))}
          </div>
        </div>
        {/* Location + Weather */}
        <div className="flex flex-wrap gap-6">
          <div>
            <span className="mb-2 block text-xs font-semibold uppercase tracking-wide text-[#8a9a7a]">
              {L('地点', 'Location', '地點', '場所', '장소', 'Ort')}
            </span>
            <select
              value={loc}
              onChange={(e) => setLoc(e.target.value)}
              className="rounded-lg border border-[#2d3d2d] bg-[#0f1a0f] px-3 py-2 text-sm text-[#e8dcc8] focus:border-[#f0a832] focus:outline-none"
            >
              <option value="all">{L('全部地点', 'All locations', '全部地點', 'すべての場所', '모든 장소', 'Alle Orte')}</option>
              {FISH_LOCATIONS.map((c) => (
                <option key={c.key} value={c.key}>
                  {t(c.label)}
                </option>
              ))}
            </select>
          </div>
          <div>
            <span className="mb-2 block text-xs font-semibold uppercase tracking-wide text-[#8a9a7a]">
              {L('天气', 'Weather', '天氣', '天気', '날씨', 'Wetter')}
            </span>
            <div className="flex gap-2">
              <button onClick={() => setWeather('all')} className={btn(weather === 'all')}>
                {L('全部', 'All', '全部', 'すべて', '전체', 'Alle')}
              </button>
              <button onClick={() => setWeather('sun')} className={btn(weather === 'sun')}>
                ☀️ {L('晴天', 'Sun', '晴天', '晴れ', '맑음', 'Sonne')}
              </button>
              <button onClick={() => setWeather('rain')} className={btn(weather === 'rain')}>
                🌧️ {L('雨天', 'Rain', '雨天', '雨', '비', 'Regen')}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Result count */}
      <p className="mb-3 text-sm text-[#8a9a7a]">
        {L('找到 ', 'Found ', '找到 ', '', '', '')}
        <span className="font-semibold text-[#f0a832]">{results.length}</span>
        {L(' 种鱼', ` fish`, ' 種魚', ` 匹`, ` 마리`, ` Fische`)}
      </p>

      {/* Results */}
      {results.length === 0 ? (
        <p className="rounded-xl border border-dashed border-[#2d3d2d] bg-[#1a2e1a]/30 p-8 text-center text-sm text-[#8a9a7a]">
          {L('该条件下没有可钓的鱼，试试放宽筛选。', 'No fish match these filters — try loosening them.', '該條件下沒有可釣的魚，試試放寬篩選。', '条件に合う魚がいません。絞り込みを緩めてみてください。', '조건에 맞는 물고기가 없습니다. 필터를 완화해 보세요.', 'Keine Fische passen — lockere die Filter.')}
        </p>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2">
          {results.map((f) => (
            <div key={f.key} className="rounded-xl border border-[#2d3d2d] bg-[#1a2e1a]/50 p-4">
              <div className="mb-2 flex items-baseline justify-between gap-2">
                <h3 className="font-semibold text-[#e8dcc8]">🐟 {t(f.name)}</h3>
                <span className="shrink-0 text-sm font-semibold text-[#f0a832]">{f.price}g</span>
              </div>
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-[#8a9a7a]">
                <span>{WEATHER_EMOJI[f.weather]} {f.weather === 'any' ? L('任意天气', 'Any weather', '任意天氣', '天気不問', '날씨 무관', 'Jedes Wetter') : f.weather === 'sun' ? L('晴天', 'Sun', '晴天', '晴れ', '맑음', 'Sonne') : L('雨天', 'Rain', '雨天', '雨', '비', 'Regen')}</span>
                <span>🕐 {timeLabel(f)}</span>
              </div>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {f.locations.map((lk) => (
                  <span key={lk} className="rounded bg-[#2d5a27]/60 px-2 py-0.5 text-xs text-[#a8c89a]">
                    {locLabel[lk] ?? lk}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
