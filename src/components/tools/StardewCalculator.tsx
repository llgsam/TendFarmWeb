'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'

interface Crop {
  nameZh: string
  nameEn: string
  season: 'spring' | 'summer' | 'fall' | 'any'
  seedCost: number
  sellPrice: number
  days: number
  regrowDays: number
  perPick: number
}

const CROPS: Crop[] = [
  // Spring
  { nameZh: '防风草', nameEn: 'Parsnip', season: 'spring', seedCost: 20, sellPrice: 35, days: 4, regrowDays: 0, perPick: 1 },
  { nameZh: '大蒜', nameEn: 'Garlic', season: 'spring', seedCost: 40, sellPrice: 60, days: 4, regrowDays: 0, perPick: 1 },
  { nameZh: '土豆', nameEn: 'Potato', season: 'spring', seedCost: 50, sellPrice: 80, days: 6, regrowDays: 0, perPick: 1 },
  { nameZh: '郁金香', nameEn: 'Tulip', season: 'spring', seedCost: 20, sellPrice: 30, days: 6, regrowDays: 0, perPick: 1 },
  { nameZh: '花椰菜', nameEn: 'Cauliflower', season: 'spring', seedCost: 80, sellPrice: 175, days: 12, regrowDays: 0, perPick: 1 },
  { nameZh: '草莓', nameEn: 'Strawberry', season: 'spring', seedCost: 100, sellPrice: 120, days: 8, regrowDays: 4, perPick: 1 },
  // Summer
  { nameZh: '萝卜', nameEn: 'Radish', season: 'summer', seedCost: 40, sellPrice: 90, days: 6, regrowDays: 0, perPick: 1 },
  { nameZh: '甜瓜', nameEn: 'Melon', season: 'summer', seedCost: 80, sellPrice: 250, days: 12, regrowDays: 0, perPick: 1 },
  { nameZh: '红甘蓝', nameEn: 'Red Cabbage', season: 'summer', seedCost: 100, sellPrice: 260, days: 9, regrowDays: 0, perPick: 1 },
  { nameZh: '杨桃', nameEn: 'Starfruit', season: 'summer', seedCost: 400, sellPrice: 750, days: 13, regrowDays: 0, perPick: 1 },
  { nameZh: '蓝莓', nameEn: 'Blueberry', season: 'summer', seedCost: 80, sellPrice: 50, days: 13, regrowDays: 4, perPick: 3 },
  { nameZh: '辣椒', nameEn: 'Hot Pepper', season: 'summer', seedCost: 40, sellPrice: 40, days: 5, regrowDays: 3, perPick: 1 },
  // Fall
  { nameZh: '南瓜', nameEn: 'Pumpkin', season: 'fall', seedCost: 100, sellPrice: 320, days: 13, regrowDays: 0, perPick: 1 },
  { nameZh: '山药', nameEn: 'Yam', season: 'fall', seedCost: 60, sellPrice: 160, days: 10, regrowDays: 0, perPick: 1 },
  { nameZh: '苋菜', nameEn: 'Amaranth', season: 'fall', seedCost: 70, sellPrice: 150, days: 7, regrowDays: 0, perPick: 1 },
  { nameZh: '洋蓟', nameEn: 'Artichoke', season: 'fall', seedCost: 30, sellPrice: 160, days: 8, regrowDays: 0, perPick: 1 },
  { nameZh: '甜菜', nameEn: 'Beet', season: 'fall', seedCost: 20, sellPrice: 100, days: 6, regrowDays: 0, perPick: 1 },
  { nameZh: '蔓越莓', nameEn: 'Cranberry', season: 'fall', seedCost: 240, sellPrice: 75, days: 7, regrowDays: 5, perPick: 2 },
  { nameZh: '葡萄', nameEn: 'Grape', season: 'fall', seedCost: 60, sellPrice: 80, days: 10, regrowDays: 3, perPick: 1 },
  { nameZh: '茄子', nameEn: 'Eggplant', season: 'fall', seedCost: 20, sellPrice: 60, days: 5, regrowDays: 5, perPick: 1 },
]

type Season = 'spring' | 'summer' | 'fall'

const SEASON_LABELS: Record<Season, { zh: string; en: string }> = {
  spring: { zh: '春季', en: 'Spring' },
  summer: { zh: '夏季', en: 'Summer' },
  fall: { zh: '秋季', en: 'Fall' },
}

// Artisan multipliers for processed goods
const ARTISAN_MULT = 1.4 // Artisan skill on processed goods
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

  // First harvest
  remainingDays -= crop.days
  totalGold += effectiveSell - crop.seedCost

  // Regrow harvests
  if (crop.regrowDays > 0) {
    const extraHarvests = Math.floor(remainingDays / crop.regrowDays)
    totalGold += extraHarvests * effectiveSell
  } else {
    // Plant again
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
  const isZh = locale === 'zh'

  const results = useMemo(() => {
    const seasonCrops = CROPS.filter((c) => c.season === season || c.season === 'any')
    return seasonCrops
      .map((c) => ({
        ...c,
        goldPerDay: calcGoldPerDay(c, daysLeft, artisan),
      }))
      .sort((a, b) => b.goldPerDay - a.goldPerDay)
  }, [season, daysLeft, artisan])

  const headers = isZh
    ? { crop: '作物', days: '生长天数', sell: '售价', regen: '再生', goldDay: '金/天 ★' }
    : { crop: 'Crop', days: 'Days', sell: 'Sell Price', regen: 'Regrow', goldDay: 'Gold/Day ★' }

  return (
    <div>
      {/* Controls */}
      <div className="mb-6 flex flex-wrap gap-6">
        {/* Season */}
        <div>
          <label className="mb-1 block text-xs text-[#8a9a7a]">
            {isZh ? '季节' : 'Season'}
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
                {isZh ? SEASON_LABELS[s].zh : SEASON_LABELS[s].en}
              </button>
            ))}
          </div>
        </div>

        {/* Days Left */}
        <div className="flex-1 min-w-[200px]">
          <label className="mb-1 block text-xs text-[#8a9a7a]">
            {isZh ? `季节剩余天数：${daysLeft} 天` : `Days left in season: ${daysLeft}`}
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
            <span>{isZh ? '1天（季末）' : '1 day left'}</span>
            <span>{isZh ? '28天（季初）' : '28 days (full)'}</span>
          </div>
        </div>

        {/* Artisan Toggle */}
        <div>
          <label className="mb-1 block text-xs text-[#8a9a7a]">
            {isZh ? '工匠技能（酒桶/坛子加工）' : 'Artisan Skill (keg/jar)'}
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
              ? isZh ? '✓ 已启用' : '✓ Enabled'
              : isZh ? '关闭' : 'Off'}
          </button>
          {artisan && (
            <p className="mt-1 text-xs text-[#8a9a7a]">
              {isZh ? '水果 ×3 酒桶 ×1.4 工匠，蔬菜 ×2.25 ×1.4' : 'Fruits ×3 keg ×1.4 artisan; Veg ×2.25 ×1.4'}
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
                  {isZh ? crop.nameZh : crop.nameEn}
                  {i === 0 && (
                    <span className="ml-2 rounded-full bg-[#f0a832] px-1.5 py-0.5 text-xs text-[#0f1a0f] font-semibold">
                      {isZh ? '最优' : 'Best'}
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
                      {isZh ? '无法种植' : 'Can\'t plant'}
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
          {isZh
            ? '★ 金/天 = 整个可用天数内的平均日利润（含种子成本）。'
            : '★ Gold/Day = average daily profit over available days (seed costs included).'}
        </p>
        <p className="text-xs text-[#8a9a7a]">
          {isZh
            ? '* 草莓种子仅在蛋节获得（春季第 13 天）。工匠技能可将处理后产品价值再提升 40%。'
            : '* Strawberry seeds only from Egg Festival (Spring Day 13). Artisan skill boosts processed goods by +40%.'}
        </p>
      </div>

      {/* TendFarm Hook */}
      <div className="mt-10 rounded-xl border border-[#2d5a27] bg-[#1a2e1a] p-6">
        <p className="text-sm text-[#8a9a7a]">
          {isZh
            ? '星露谷里，你精心规划作物来最大化金币产出。有一款游戏让这个逻辑更进一步——它用你真实的睡眠和步数来驱动收成。睡得好，作物更充盈；动得多，提前成熟。'
            : "Stardew Valley rewards careful crop planning. One game takes this further — it uses your real sleep and steps to drive harvest yield. Sleep well, harvest more; move more, crops ripen early."}
        </p>
        <Link
          href={`/${locale}/gameplay`}
          className="mt-3 inline-block text-sm font-semibold text-[#f0a832] hover:underline"
        >
          {isZh ? '了解 TendFarm →' : 'Learn about TendFarm →'}
        </Link>
      </div>
    </div>
  )
}
