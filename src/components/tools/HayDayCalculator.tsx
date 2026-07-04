'use client'

import { useState, useMemo } from 'react'

interface Crop {
  nameZh: string
  nameZhTW: string
  nameEn: string
  nameJa: string
  nameKo: string
  nameDe: string
  level: number
  seedCost: number
  sellPrice: number
  growMin: number
}

const CROPS: Crop[] = [
  { nameZh: '小麦', nameZhTW: '小麥', nameEn: 'Wheat', nameJa: '小麦', nameKo: '밀', nameDe: 'Weizen', level: 1, seedCost: 4, sellPrice: 8, growMin: 1 },
  { nameZh: '玉米', nameZhTW: '玉米', nameEn: 'Corn', nameJa: 'コーン', nameKo: '옥수수', nameDe: 'Mais', level: 1, seedCost: 16, sellPrice: 36, growMin: 5 },
  { nameZh: '胡萝卜', nameZhTW: '胡蘿蔔', nameEn: 'Carrot', nameJa: 'ニンジン', nameKo: '당근', nameDe: 'Karotte', level: 8, seedCost: 12, sellPrice: 23, growMin: 10 },
  { nameZh: '大豆', nameZhTW: '大豆', nameEn: 'Soybean', nameJa: '大豆', nameKo: '대두', nameDe: 'Sojabohne', level: 17, seedCost: 28, sellPrice: 73, growMin: 45 },
  { nameZh: '南瓜', nameZhTW: '南瓜', nameEn: 'Pumpkin', nameJa: 'カボチャ', nameKo: '호박', nameDe: 'Kürbis', level: 25, seedCost: 84, sellPrice: 175, growMin: 90 },
  { nameZh: '靛蓝草', nameZhTW: '靛藍草', nameEn: 'Indigo', nameJa: 'インディゴ', nameKo: '인디고', nameDe: 'Indigo', level: 43, seedCost: 60, sellPrice: 112, growMin: 60 },
  { nameZh: '番茄', nameZhTW: '番茄', nameEn: 'Tomato', nameJa: 'トマト', nameKo: '토마토', nameDe: 'Tomate', level: 35, seedCost: 68, sellPrice: 159, growMin: 120 },
  { nameZh: '辣椒', nameZhTW: '辣椒', nameEn: 'Chili Pepper', nameJa: 'チリペッパー', nameKo: '고추', nameDe: 'Chili', level: 45, seedCost: 96, sellPrice: 249, growMin: 180 },
  { nameZh: '草莓', nameZhTW: '草莓', nameEn: 'Strawberry', nameJa: 'イチゴ', nameKo: '딸기', nameDe: 'Erdbeere', level: 55, seedCost: 84, sellPrice: 204, growMin: 120 },
  { nameZh: '树莓', nameZhTW: '樹莓', nameEn: 'Raspberry', nameJa: 'ラズベリー', nameKo: '라즈베리', nameDe: 'Himbeere', level: 58, seedCost: 96, sellPrice: 229, growMin: 150 },
  { nameZh: '向日葵', nameZhTW: '向日葵', nameEn: 'Sunflower', nameJa: 'ヒマワリ', nameKo: '해바라기', nameDe: 'Sonnenblume', level: 60, seedCost: 36, sellPrice: 95, growMin: 120 },
  { nameZh: '棉花', nameZhTW: '棉花', nameEn: 'Cotton', nameJa: 'コットン', nameKo: '면화', nameDe: 'Baumwolle', level: 51, seedCost: 112, sellPrice: 254, growMin: 300 },
  { nameZh: '黑莓', nameZhTW: '黑莓', nameEn: 'Blackberry', nameJa: 'ブラックベリー', nameKo: '블랙베리', nameDe: 'Brombeere', level: 62, seedCost: 140, sellPrice: 380, growMin: 240 },
  { nameZh: '猴面包树果', nameZhTW: '猴麵包樹果', nameEn: 'Baobab', nameJa: 'バオバブ', nameKo: '바오밥', nameDe: 'Baobab', level: 65, seedCost: 192, sellPrice: 528, growMin: 360 },
]

type SortKey = 'profitPerMin' | 'profitPerHour' | 'profitPerHarvest' | 'level'
type PlayStyle = 'all' | 'active' | 'casual' | 'afk'

const PLAY_STYLE_LABELS: Record<PlayStyle, { zh: string; zhTW: string; en: string; ja: string; ko: string; de: string; maxMin: number }> = {
  all: { zh: '全部', zhTW: '全部', en: 'All', ja: 'すべて', ko: '전체', de: 'Alle', maxMin: Infinity },
  active: { zh: '活跃（每 15 分钟登录）', zhTW: '活躍（每 15 分鐘登入）', en: 'Active (check every 15 min)', ja: 'アクティブ（15分ごと）', ko: '적극적 (15분마다 접속)', de: 'Aktiv (alle 15 Min.)', maxMin: 15 },
  casual: { zh: '休闲（每 1-2 小时登录）', zhTW: '休閒（每 1-2 小時登入）', en: 'Casual (check every 1-2 hrs)', ja: 'カジュアル（1〜2時間ごと）', ko: '캐주얼 (1~2시간마다)', de: 'Gelegentlich (1-2 Std.)', maxMin: 120 },
  afk: { zh: 'AFK（挂机 4 小时以上）', zhTW: 'AFK（掛機 4 小時以上）', en: 'AFK (away 4+ hours)', ja: 'AFK（4時間以上放置）', ko: 'AFK (4시간 이상 자리비움)', de: 'AFK (4+ Std. weg)', maxMin: Infinity },
}

interface Props {
  locale: string
}

export function HayDayCalculator({ locale }: Props) {
  const [sortBy, setSortBy] = useState<SortKey>('profitPerMin')
  const [playStyle, setPlayStyle] = useState<PlayStyle>('all')
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
    const minUnit = getLoc('分钟', 'min', '分鐘', '分', '분', 'Min.')
    const minShort = getLoc('分', 'm', '分', '分', '분', 'M')
    if (min < 60) return `${min}${minUnit}`
    const h = Math.floor(min / 60)
    const m = min % 60
    return m > 0 ? `${h}h ${m}${minShort}` : `${h}h`
  }

  const headers = {
    crop: getLoc('作物', 'Crop', '作物', '作物', '작물', 'Pflanze'),
    level: getLoc('解锁等级', 'Level', '解鎖等級', 'レベル', '레벨', 'Level'),
    grow: getLoc('生长时间', 'Grow Time', '生長時間', '育成時間', '성장 시간', 'Wachstum'),
    profit: getLoc('单次利润', 'Profit/Harvest', '單次利潤', '収穫利益', '수확 수익', 'Gewinn/Ernte'),
    perMin: getLoc('利润/分钟', 'Gold/Min', '利潤/分鐘', '利益/分', '수익/분', 'Gold/Min'),
    perHour: getLoc('利润/小时', 'Gold/Hour', '利潤/小時', '利益/時間', '수익/시간', 'Gold/Std.'),
  }

  return (
    <div>
      {/* Controls */}
      <div className="mb-6 flex flex-wrap gap-4">
        <div>
          <label className="mb-1 block text-xs text-[#8a9a7a]">
            {getLoc('游戏风格', 'Play Style', '遊戲風格', 'プレイスタイル', '플레이 스타일', 'Spielstil')}
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
                {getLoc(PLAY_STYLE_LABELS[style].zh, PLAY_STYLE_LABELS[style].en, PLAY_STYLE_LABELS[style].zhTW, PLAY_STYLE_LABELS[style].ja, PLAY_STYLE_LABELS[style].ko, PLAY_STYLE_LABELS[style].de)}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="mb-1 block text-xs text-[#8a9a7a]">
            {getLoc('排序方式', 'Sort By', '排序方式', '並び替え', '정렬 기준', 'Sortieren nach')}
          </label>
          <div className="flex flex-wrap gap-2">
            {([
              ['profitPerMin', getLoc('利润/分钟', 'Gold/Min', '利潤/分鐘', '利益/分', '수익/분', 'Gold/Min')],
              ['profitPerHour', getLoc('利润/小时', 'Gold/Hour', '利潤/小時', '利益/時間', '수익/시간', 'Gold/Std.')],
              ['profitPerHarvest', getLoc('单次利润', 'Per Harvest', '單次利潤', '収穫利益', '수확 수익', 'Pro Ernte')],
              ['level', getLoc('等级', 'Level', '等級', 'レベル', '레벨', 'Level')],
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
                  {getCropName(crop)}
                  {i === 0 && (
                    <span className="ml-2 rounded-full bg-[#f0a832] px-1.5 py-0.5 text-xs text-[#0f1a0f] font-semibold">
                      {getLoc('最优', 'Best', '最優', 'ベスト', '최고', 'Bestes')}
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
            {getLoc('该玩法风格暂无匹配作物', 'No crops match this play style', '該玩法風格暫無匹配作物', 'このスタイルに合う作物はありません', '이 플레이 스타일에 맞는 작물이 없습니다', 'Keine Pflanzen für diesen Spielstil')}
          </div>
        )}
      </div>

      {/* Note */}
      <p className="mt-3 text-xs text-[#8a9a7a]">
        {getLoc(
          '* 数据来源：Hay Day 社区 Fandom Wiki。价格可能因更新有所变化。',
          '* Data from the Hay Day Fandom Wiki community. Prices may vary with game updates.',
          '* 數據來源：Hay Day 社群 Fandom Wiki。價格可能因更新有所變化。',
          '* データはHay Day Fandomコミュニティより。価格はアップデートで変わる場合があります。',
          '* 데이터 출처: Hay Day Fandom 커뮤니티 Wiki. 업데이트에 따라 가격이 변동될 수 있습니다.',
          '* Daten aus dem Hay Day Fandom Wiki. Preise können sich durch Updates ändern.'
        )}
      </p>
    </div>
  )
}
