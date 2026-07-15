'use client'

import { useState, useMemo } from 'react'
import { CROPS, type Crop } from '@/lib/tools/stardewCropData'

type Season = 'spring' | 'summer' | 'fall'

const SEASON_LABELS: Record<Season, { zh: string; zhTW: string; en: string; ja: string; ko: string; de: string }> = {
  spring: { zh: '春季', zhTW: '春季', en: 'Spring', ja: '春', ko: '봄', de: 'Frühling' },
  summer: { zh: '夏季', zhTW: '夏季', en: 'Summer', ja: '夏', ko: '여름', de: 'Sommer' },
  fall: { zh: '秋季', zhTW: '秋季', en: 'Fall', ja: '秋', ko: '가을', de: 'Herbst' },
}

const ARTISAN_MULT = 1.4
const KEG_MULT_FRUIT = 3
const KEG_MULT_VEG = 2.25

const FRUIT_CROPS = new Set(['Strawberry', 'Blueberry', 'Cranberry', 'Grape'])

function calcGoldPerDay(crop: Crop, daysLeft: number, artisan: boolean): number {
  if (daysLeft < crop.days) return 0

  let totalGold = 0
  let remainingDays = daysLeft

  const effectiveSell = artisan
    ? FRUIT_CROPS.has(crop.nameEn)
      ? Math.round(crop.sellPrice * KEG_MULT_FRUIT * ARTISAN_MULT)
      : Math.round(crop.sellPrice * KEG_MULT_VEG * ARTISAN_MULT)
    : crop.sellPrice * crop.perPick

  remainingDays -= crop.days
  totalGold += effectiveSell - crop.seedCost

  if (crop.regrowDays > 0) {
    const extraHarvests = Math.floor(remainingDays / crop.regrowDays)
    totalGold += extraHarvests * effectiveSell
  } else {
    while (remainingDays >= crop.days) {
      remainingDays -= crop.days
      totalGold += effectiveSell - crop.seedCost
    }
  }

  return totalGold / daysLeft
}

interface Props {
  locale: string
}

export function StardewCalculator({ locale }: Props) {
  const [season, setSeason] = useState<Season>('spring')
  const [daysLeft, setDaysLeft] = useState(28)
  const [artisan, setArtisan] = useState(false)
  const isZh = locale === 'zh' || locale === 'zh-TW'
  const getLoc = (zh: string, en: string, zhTW?: string, ja?: string, ko?: string, de?: string): string => {
    if (locale === 'zh') return zh
    if (locale === 'zh-TW') return zhTW ?? zh
    if (locale === 'ja') return ja ?? en
    if (locale === 'ko') return ko ?? en
    if (locale === 'de') return de ?? en
    return en
  }
  const getCropName = (crop: Crop) => getLoc(crop.nameZh, crop.nameEn, crop.nameZhTW, crop.nameJa, crop.nameKo, crop.nameDe)

  const results = useMemo(() => {
    const seasonCrops = CROPS.filter((c) => c.season === season || c.season === 'any')
    return seasonCrops
      .map((c) => ({
        ...c,
        goldPerDay: calcGoldPerDay(c, daysLeft, artisan),
      }))
      .sort((a, b) => b.goldPerDay - a.goldPerDay)
  }, [season, daysLeft, artisan])

  const headers = {
    crop: getLoc('作物', 'Crop', '作物', '作物', '작물', 'Pflanze'),
    days: getLoc('生长天数', 'Days', '生長天數', '成長日数', '성장 일수', 'Tage'),
    sell: getLoc('售价', 'Sell Price', '售價', '売値', '판매가', 'Preis'),
    regen: getLoc('再生', 'Regrow', '再生', '再成長', '재성장', 'Nachwachs'),
    goldDay: getLoc('金/天 ★', 'Gold/Day ★', '金/天 ★', 'G/日 ★', '금/일 ★', 'Gold/Tag ★'),
  }

  return (
    <div>
      {/* Controls */}
      <div className="mb-6 flex flex-wrap gap-6">
        {/* Season */}
        <div>
          <label className="mb-1 block text-xs text-[#8a9a7a]">
            {getLoc('季节', 'Season', '季節', 'シーズン', '계절', 'Jahreszeit')}
          </label>
          <div className="flex gap-2">
            {(Object.keys(SEASON_LABELS) as Season[]).map((s) => (
              <button
                key={s}
                onClick={() => setSeason(s)}
                className={`rounded-full px-4 py-1 text-sm transition-colors ${
                  season === s
                    ? 'bg-[#f0a832] text-[#0f1a0f] font-semibold'
                    : 'border border-[#2d3d2d] text-[#8a9a7a] hover:text-[#e8dcc8]'
                }`}
              >
                {getLoc(SEASON_LABELS[s].zh, SEASON_LABELS[s].en, SEASON_LABELS[s].zhTW, SEASON_LABELS[s].ja, SEASON_LABELS[s].ko, SEASON_LABELS[s].de)}
              </button>
            ))}
          </div>
        </div>

        {/* Days Left */}
        <div className="flex-1 min-w-[200px]">
          <label className="mb-1 block text-xs text-[#8a9a7a]">
            {getLoc(`季节剩余天数：${daysLeft} 天`, `Days left in season: ${daysLeft}`, `季節剩餘天數：${daysLeft} 天`, `残り日数：${daysLeft}日`, `남은 일수: ${daysLeft}일`, `Verbleibende Tage: ${daysLeft}`)}
          </label>
          <input
            type="range"
            min={1}
            max={28}
            value={daysLeft}
            onChange={(e) => setDaysLeft(Number(e.target.value))}
            className="w-full accent-[#f0a832]"
          />
          <div className="flex justify-between text-xs text-[#8a9a7a]">
            <span>{getLoc('1天（季末）', '1 day left', '1天（季末）', '残り1日', '마지막 날', 'Letzter Tag')}</span>
            <span>{getLoc('28天（季初）', '28 days (full)', '28天（季初）', '28日（初日）', '28일 (시작)', '28 Tage (voll)')}</span>
          </div>
        </div>

        {/* Artisan Toggle */}
        <div>
          <label className="mb-1 block text-xs text-[#8a9a7a]">
            {getLoc('工匠技能（酒桶/坛子加工）', 'Artisan Skill (keg/jar)', '工匠技能（酒桶/罐子加工）', 'アーティザンスキル（樽/瓶）', '장인 기술 (통/항아리)', 'Handwerker-Skill (Fass/Glas)')}
          </label>
          <button
            onClick={() => setArtisan(!artisan)}
            className={`rounded-lg px-4 py-1.5 text-sm font-medium transition-colors ${
              artisan
                ? 'bg-[#2d5a27] text-[#e8dcc8]'
                : 'border border-[#2d3d2d] text-[#8a9a7a]'
            }`}
          >
            {artisan
              ? getLoc('✓ 已启用', '✓ Enabled', '✓ 已啟用', '✓ 有効', '✓ 활성화', '✓ Aktiv')
              : getLoc('关闭', 'Off', '關閉', 'OFF', '꺼짐', 'Aus')}
          </button>
          {artisan && (
            <p className="mt-1 text-xs text-[#8a9a7a]">
              {getLoc('水果 ×3 酒桶 ×1.4 工匠，蔬菜 ×2.25 ×1.4', 'Fruits ×3 keg ×1.4 artisan; Veg ×2.25 ×1.4', '水果 ×3 酒桶 ×1.4 工匠，蔬菜 ×2.25 ×1.4', '果物 ×3 樽 ×1.4 職人；野菜 ×2.25 ×1.4', '과일 ×3 통 ×1.4 장인; 채소 ×2.25 ×1.4', 'Früchte ×3 Fass ×1.4 Handwerker; Gemüse ×2.25 ×1.4')}
            </p>
          )}
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-xl border border-[#2d3d2d]">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[#2d3d2d] bg-[#1a2e1a]">
              {[headers.crop, headers.days, headers.sell, headers.regen, headers.goldDay].map((h) => (
                <th key={h} className="px-4 py-3 text-left text-xs font-medium text-[#8a9a7a]">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {results.map((crop, i) => (
              <tr
                key={crop.nameEn}
                className={`border-b border-[#2d3d2d]/50 transition-colors hover:bg-[#1a2e1a]/50 ${
                  i === 0 ? 'bg-[#f0a832]/5' : ''
                }`}
              >
                <td className="px-4 py-3 font-medium text-[#e8dcc8]">
                  {getCropName(crop)}
                  {i === 0 && (
                    <span className="ml-2 rounded-full bg-[#f0a832] px-1.5 py-0.5 text-xs text-[#0f1a0f] font-semibold">
                      {getLoc('最优', 'Best', '最優', 'ベスト', '최고', 'Bestes')}
                    </span>
                  )}
                  {crop.perPick > 1 && (
                    <span className="ml-1 text-xs text-[#8a9a7a]">×{crop.perPick}</span>
                  )}
                </td>
                <td className="px-4 py-3 text-[#8a9a7a]">{crop.days}d</td>
                <td className="px-4 py-3 text-[#8a9a7a]">{crop.sellPrice}g</td>
                <td className="px-4 py-3 text-[#8a9a7a]">
                  {crop.regrowDays > 0 ? `+${crop.regrowDays}d` : '—'}
                </td>
                <td className="px-4 py-3">
                  {crop.goldPerDay > 0 ? (
                    <span className="font-semibold text-[#f0a832]">
                      {crop.goldPerDay.toFixed(1)}g
                    </span>
                  ) : (
                    <span className="text-[#8a9a7a]">
                      {getLoc('无法种植', "Can't plant", '無法種植', '植えられない', '심을 수 없음', 'Nicht pflanzbar')}
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Notes */}
      <div className="mt-3 space-y-1">
        <p className="text-xs text-[#8a9a7a]">
          {getLoc(
            '★ 金/天 = 整个可用天数内的平均日利润（含种子成本）。',
            '★ Gold/Day = average daily profit over available days (seed costs included).',
            '★ 金/天 = 整個可用天數內的平均日利潤（含種子成本）。',
            '★ G/日 = 利用可能日数全体の平均日利益（種コスト含む）。',
            '★ 금/일 = 가능한 일수 전체의 평균 일일 수익 (씨앗 비용 포함).',
            '★ Gold/Tag = durchschnittlicher Tagesgewinn über verfügbare Tage (inkl. Samenkosten).'
          )}
        </p>
        <p className="text-xs text-[#8a9a7a]">
          {getLoc(
            '* 草莓种子仅在蛋节获得（春季第 13 天）。工匠技能可将处理后产品价值再提升 40%。',
            '* Strawberry seeds only from Egg Festival (Spring Day 13). Artisan skill boosts processed goods by +40%.',
            '* 草莓種子僅在蛋節獲得（春季第 13 天）。工匠技能可將加工後產品價值再提升 40%。',
            '* イチゴの種はエッグフェスティバル（春13日目）のみ。職人スキルで加工品を+40%アップ。',
            '* 딸기 씨앗은 에그 페스티벌(봄 13일)에서만 구매 가능. 장인 기술은 가공품 가치 +40% 상승.',
            '* Erdbeer-Samen nur beim Egg Festival (Frühling Tag 13). Handwerker-Skill: +40% für Verarbeitetes.'
          )}
        </p>
      </div>
    </div>
  )
}
