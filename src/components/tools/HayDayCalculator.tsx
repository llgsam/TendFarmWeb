'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'

interface Crop {
  nameZh: string
  nameEn: string
  level: number
  seedCost: number
  sellPrice: number
  growMin: number
}

const CROPS: Crop[] = [
  { nameZh: '小麦', nameEn: 'Wheat', level: 1, seedCost: 4, sellPrice: 8, growMin: 1 },
  { nameZh: '玉米', nameEn: 'Corn', level: 1, seedCost: 16, sellPrice: 36, growMin: 5 },
  { nameZh: '胡萝卜', nameEn: 'Carrot', level: 8, seedCost: 12, sellPrice: 23, growMin: 10 },
  { nameZh: '大豆', nameEn: 'Soybean', level: 17, seedCost: 28, sellPrice: 73, growMin: 45 },
  { nameZh: '南瓜', nameEn: 'Pumpkin', level: 25, seedCost: 84, sellPrice: 175, growMin: 90 },
  { nameZh: '靛蓝草', nameEn: 'Indigo', level: 43, seedCost: 60, sellPrice: 112, growMin: 60 },
  { nameZh: '番茄', nameEn: 'Tomato', level: 35, seedCost: 68, sellPrice: 159, growMin: 120 },
  { nameZh: '辣椒', nameEn: 'Chili Pepper', level: 45, seedCost: 96, sellPrice: 249, growMin: 180 },
  { nameZh: '草莓', nameEn: 'Strawberry', level: 55, seedCost: 84, sellPrice: 204, growMin: 120 },
  { nameZh: '树莓', nameEn: 'Raspberry', level: 58, seedCost: 96, sellPrice: 229, growMin: 150 },
  { nameZh: '向日葵', nameEn: 'Sunflower', level: 60, seedCost: 36, sellPrice: 95, growMin: 120 },
  { nameZh: '棉花', nameEn: 'Cotton', level: 51, seedCost: 112, sellPrice: 254, growMin: 300 },
  { nameZh: '黑莓', nameEn: 'Blackberry', level: 62, seedCost: 140, sellPrice: 380, growMin: 240 },
  { nameZh: '猴面包树果', nameEn: 'Baobab', level: 65, seedCost: 192, sellPrice: 528, growMin: 360 },
]

type SortKey = 'profitPerMin' | 'profitPerHour' | 'profitPerHarvest' | 'level'
type PlayStyle = 'all' | 'active' | 'casual' | 'afk'

const PLAY_STYLE_LABELS: Record<PlayStyle, { zh: string; en: string; maxMin: number }> = {
  all: { zh: '全部', en: 'All', maxMin: Infinity },
  active: { zh: '活跃（每 15 分钟登录）', en: 'Active (check every 15 min)', maxMin: 15 },
  casual: { zh: '休闲（每 1-2 小时登录）', en: 'Casual (check every 1-2 hrs)', maxMin: 120 },
  afk: { zh: 'AFK（挂机 4 小时以上）', en: 'AFK (away 4+ hours)', maxMin: Infinity },
}

interface Props {
  locale: string
}

export function HayDayCalculator({ locale }: Props) {
  const [sortBy, setSortBy] = useState<SortKey>('profitPerMin')
  const [playStyle, setPlayStyle] = useState<PlayStyle>('all')
  const isZh = locale === 'zh'

  const processedCrops = useMemo(() => {
    return CROPS.map((c) => ({
      ...c,
      profit: c.sellPrice - c.seedCost,
      profitPerMin: (c.sellPrice - c.seedCost) / c.growMin,
      profitPerHour: ((c.sellPrice - c.seedCost) / c.growMin) * 60,
    }))
  }, [])

  const filteredAndSorted = useMemo(() => {
    let crops = processedCrops

    if (playStyle === 'active') {
      crops = crops.filter((c) => c.growMin <= 15)
    } else if (playStyle === 'casual') {
      crops = crops.filter((c) => c.growMin > 15 && c.growMin <= 120)
    } else if (playStyle === 'afk') {
      crops = crops.filter((c) => c.growMin >= 120)
    }

    return [...crops].sort((a, b) => {
      if (sortBy === 'level') return a.level - b.level
      if (sortBy === 'profitPerHour') return b.profitPerHour - a.profitPerHour
      if (sortBy === 'profitPerHarvest') return b.profit - a.profit
      return b.profitPerMin - a.profitPerMin
    })
  }, [processedCrops, sortBy, playStyle])

  const fmtMin = (min: number) => {
    if (min < 60) return `${min}${isZh ? '分钟' : 'min'}`
    const h = Math.floor(min / 60)
    const m = min % 60
    return m > 0 ? `${h}h ${m}${isZh ? '分' : 'm'}` : `${h}h`
  }

  const headers = isZh
    ? { crop: '作物', level: '解锁等级', grow: '生长时间', profit: '单次利润', perMin: '利润/分钟', perHour: '利润/小时' }
    : { crop: 'Crop', level: 'Level', grow: 'Grow Time', profit: 'Profit/Harvest', perMin: 'Gold/Min', perHour: 'Gold/Hour' }

  return (
    <div>
      {/* Controls */}
      <div className="mb-6 flex flex-wrap gap-4">
        <div>
          <label className="mb-1 block text-xs text-[#8a9a7a]">
            {isZh ? '游戏风格' : 'Play Style'}
          </label>
          <div className="flex flex-wrap gap-2">
            {(Object.keys(PLAY_STYLE_LABELS) as PlayStyle[]).map((style) => (
              <button
                key={style}
                onClick={() => setPlayStyle(style)}
                className={`rounded-full px-3 py-1 text-xs transition-colors ${
                  playStyle === style
                    ? 'bg-[#f0a832] text-[#0f1a0f] font-semibold'
                    : 'border border-[#2d3d2d] text-[#8a9a7a] hover:text-[#e8dcc8]'
                }`}
              >
                {isZh ? PLAY_STYLE_LABELS[style].zh : PLAY_STYLE_LABELS[style].en}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="mb-1 block text-xs text-[#8a9a7a]">
            {isZh ? '排序方式' : 'Sort By'}
          </label>
          <div className="flex flex-wrap gap-2">
            {([
              ['profitPerMin', isZh ? '利润/分钟' : 'Gold/Min'],
              ['profitPerHour', isZh ? '利润/小时' : 'Gold/Hour'],
              ['profitPerHarvest', isZh ? '单次利润' : 'Per Harvest'],
              ['level', isZh ? '等级' : 'Level'],
            ] as [SortKey, string][]).map(([key, label]) => (
              <button
                key={key}
                onClick={() => setSortBy(key)}
                className={`rounded-full px-3 py-1 text-xs transition-colors ${
                  sortBy === key
                    ? 'bg-[#2d5a27] text-[#e8dcc8] font-semibold'
                    : 'border border-[#2d3d2d] text-[#8a9a7a] hover:text-[#e8dcc8]'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-xl border border-[#2d3d2d]">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[#2d3d2d] bg-[#1a2e1a]">
              {[
                headers.crop,
                headers.level,
                headers.grow,
                headers.profit,
                headers.perMin,
                headers.perHour,
              ].map((h) => (
                <th key={h} className="px-4 py-3 text-left text-xs font-medium text-[#8a9a7a]">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredAndSorted.map((crop, i) => (
              <tr
                key={crop.nameEn}
                className={`border-b border-[#2d3d2d]/50 transition-colors hover:bg-[#1a2e1a]/50 ${
                  i === 0 ? 'bg-[#f0a832]/5' : ''
                }`}
              >
                <td className="px-4 py-3 font-medium text-[#e8dcc8]">
                  {isZh ? `${crop.nameZh}` : crop.nameEn}
                  {i === 0 && (
                    <span className="ml-2 rounded-full bg-[#f0a832] px-1.5 py-0.5 text-xs text-[#0f1a0f] font-semibold">
                      {isZh ? '最优' : 'Best'}
                    </span>
                  )}
                </td>
                <td className="px-4 py-3 text-[#8a9a7a]">Lv.{crop.level}</td>
                <td className="px-4 py-3 text-[#8a9a7a]">{fmtMin(crop.growMin)}</td>
                <td className="px-4 py-3 text-[#e8dcc8]">{crop.profit}g</td>
                <td className="px-4 py-3 font-semibold text-[#f0a832]">
                  {crop.profitPerMin.toFixed(2)}g
                </td>
                <td className="px-4 py-3 text-[#e8dcc8]">{Math.round(crop.profitPerHour)}g</td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredAndSorted.length === 0 && (
          <div className="py-8 text-center text-[#8a9a7a]">
            {isZh ? '该玩法风格暂无匹配作物' : 'No crops match this play style'}
          </div>
        )}
      </div>

      {/* Note */}
      <p className="mt-3 text-xs text-[#8a9a7a]">
        {isZh
          ? '* 数据来源：Hay Day 社区 Fandom Wiki。价格可能因更新有所变化。'
          : '* Data from the Hay Day Fandom Wiki community. Prices may vary with game updates.'}
      </p>

      {/* TendFarm Hook */}
      <div className="mt-10 rounded-xl border border-[#2d5a27] bg-[#1a2e1a] p-6">
        <p className="text-sm text-[#8a9a7a]">
          {isZh
            ? 'Hay Day 讲究按时登录收获——但有一款游戏更进一步：它读取你真实的步数和睡眠，让你的现实生活节律直接驱动农场产出。'
            : 'Hay Day rewards consistent logins — but one game goes further: it reads your real steps and sleep so your actual daily rhythm drives your farm output.'}
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
