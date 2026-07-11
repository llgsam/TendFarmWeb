import type { GuidePost } from './guides'

export type LocMap = { zh: string; 'zh-TW': string; ja: string; ko: string; de: string; en: string }

export interface ToolLink {
  label: LocMap
  href: string
}

export interface GameEntry {
  id: string
  display: LocMap
  names: string[] // detection aliases (any language / slug form), matched case-insensitively
  tools: ToolLink[]
}

const T = (zh: string, zhTW: string, ja: string, ko: string, de: string, en: string): LocMap => ({
  zh,
  'zh-TW': zhTW,
  ja,
  ko,
  de,
  en,
})

export const GAMES: GameEntry[] = [
  {
    id: 'stardew',
    display: T('星露谷物语', '星露谷物語', 'スターデューバレー', '스타듀 밸리', 'Stardew Valley', 'Stardew Valley'),
    names: ['stardew valley', 'stardew', '星露谷物语', '星露谷物語', 'スターデューバレー', '스타듀 밸리', 'stardew-valley'],
    tools: [
      { href: 'tools/stardew', label: T('作物利润计算器', '作物利潤計算器', '作物利益計算機', '작물 수익 계산기', 'Ernte-Gewinnrechner', 'Crop Profit Calculator') },
      { href: 'tools/stardew-gifts', label: T('送礼查询', '送禮查詢', '贈り物ガイド', '선물 가이드', 'Geschenke-Finder', 'Gift Finder') },
      { href: 'tools/stardew-fish', label: T('鱼类查询', '魚類查詢', '釣り図鑑', '물고기 도감', 'Fisch-Finder', 'Fish Finder') },
      { href: 'tools/stardew-calendar', label: T('日历', '日曆', 'カレンダー', '달력', 'Kalender', 'Calendar') },
    ],
  },
  {
    id: 'hay-day',
    display: T('Hay Day', 'Hay Day', 'Hay Day', 'Hay Day', 'Hay Day', 'Hay Day'),
    names: ['hay day', 'hay-day', 'hayday'],
    tools: [
      { href: 'tools/hay-day', label: T('作物利润计算器', '作物利潤計算器', '作物利益計算機', '작물 수익 계산기', 'Ernte-Gewinnrechner', 'Crop Profit Calculator') },
    ],
  },
  {
    id: 'palia',
    display: T('Palia', 'Palia', 'Palia', 'Palia', 'Palia', 'Palia'),
    names: ['palia'],
    tools: [],
  },
  {
    id: 'coral-island',
    display: T('珊瑚岛', '珊瑚島', 'コーラルアイランド', '코럴 아일랜드', 'Coral Island', 'Coral Island'),
    names: ['coral island', 'coral-island'],
    tools: [],
  },
  {
    id: 'animal-crossing',
    display: T('动物森友会', '動物森友會', 'あつまれ どうぶつの森', '모여봐요 동물의 숲', 'Animal Crossing', 'Animal Crossing'),
    names: ['animal crossing', 'animal-crossing', 'どうぶつの森', '动物森友会', '動物森友會', '동물의 숲', 'acnh'],
    tools: [],
  },
  {
    id: 'dreamlight-valley',
    display: T('梦幻星谷', '夢幻星谷', 'ドリームライトバレー', '드림라이트 밸리', 'Dreamlight Valley', 'Disney Dreamlight Valley'),
    names: ['dreamlight valley', 'dreamlight-valley', 'disney dreamlight'],
    tools: [],
  },
]

export type DetectInput = Pick<GuidePost, 'title' | 'description' | 'tags' | 'contentHtml'>

export function detectGames(post: DetectInput): string[] {
  const haystack = [post.title, post.description, ...(post.tags ?? []), post.contentHtml]
    .join(' \n ')
    .toLowerCase()
  return GAMES.filter((g) => g.names.some((n) => haystack.includes(n.toLowerCase()))).map((g) => g.id)
}
