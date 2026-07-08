'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { filterVillagers, pickVil, type Villager, type Season, type VilLoc } from './stardewVillagerData'

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
