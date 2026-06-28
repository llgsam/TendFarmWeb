import { BASE_URL } from './config'

// Server-accessible share metadata for quiz results: drives the per-result
// page title/description and the dynamic OG card (/api/og). Kept separate from
// the client quiz component so generateMetadata can read it without 'use client'.

type Locale = 'zh' | 'en' | 'zh-TW' | 'ja' | 'ko' | 'de'

export interface ShareResult {
  key: string
  emoji: string
  title: Record<Locale, string>
  tag: Record<Locale, string>
}

export interface QuizShare {
  slug: string
  badge: Record<Locale, string>
  results: Record<string, ShareResult>
}

const FARM_PERSONALITY: QuizShare = {
  slug: 'farm-personality',
  badge: {
    zh: '农场人格测试', en: 'Farm Personality Quiz', 'zh-TW': '農場人格測試',
    ja: '農場パーソナリティ診断', ko: '농장 성향 테스트', de: 'Farm-Persönlichkeitsquiz',
  },
  results: {
    optimizer: {
      key: 'optimizer',
      emoji: '📊',
      title: { zh: '效率农夫', en: 'The Optimizer', 'zh-TW': '效率農夫', ja: '効率農夫', ko: '효율 농부', de: 'Der Optimierer' },
      tag: {
        zh: '数据与系统就是你的语言', en: 'Data and systems are your language', 'zh-TW': '資料與系統就是你的語言',
        ja: 'データとシステムがあなたの言語', ko: '데이터와 시스템이 당신의 언어', de: 'Daten und Systeme sind deine Sprache',
      },
    },
    aesthete: {
      key: 'aesthete',
      emoji: '🌸',
      title: { zh: '美学农夫', en: 'The Homesteader', 'zh-TW': '美學農夫', ja: '審美農夫', ko: '미학 농부', de: 'Der Ästhet' },
      tag: {
        zh: '把农场打造成最美的样子', en: 'You build the most beautiful farm', 'zh-TW': '把農場打造成最美的樣子',
        ja: '農場を一番美しく仕上げる', ko: '농장을 가장 아름답게 꾸미는 사람', de: 'Du baust die schönste Farm',
      },
    },
    explorer: {
      key: 'explorer',
      emoji: '🗺️',
      title: { zh: '探索农夫', en: 'The Explorer', 'zh-TW': '探索農夫', ja: '探索農夫', ko: '탐험 농부', de: 'Der Entdecker' },
      tag: {
        zh: '剧情、秘密、支线先探为敬', en: 'Lore, secrets, and side content first', 'zh-TW': '劇情、秘密、支線先探為敬',
        ja: '物語も秘密もサブも、まず探検', ko: '스토리·비밀·서브부터 탐험', de: 'Lore, Geheimnisse und Nebeninhalte zuerst',
      },
    },
    zen: {
      key: 'zen',
      emoji: '🌿',
      title: { zh: '禅意农夫', en: 'The Zen Farmer', 'zh-TW': '禪意農夫', ja: '禅農夫', ko: '선(禪) 농부', de: 'Der Zen-Bauer' },
      tag: {
        zh: '没有目标，享受农场节律', en: 'No goals, just the rhythm of the farm', 'zh-TW': '沒有目標，享受農場節律',
        ja: '目標なし、農場のリズムを楽しむ', ko: '목표 없이 농장의 리듬을 즐기기', de: 'Keine Ziele, nur der Rhythmus der Farm',
      },
    },
  },
}

const WHICH_FARMING_GAME: QuizShare = {
  slug: 'which-farming-game',
  badge: {
    zh: '农场游戏推荐测验', en: 'Which Farming Game Quiz', 'zh-TW': '農場遊戲推薦測驗',
    ja: '農場ゲーム診断', ko: '농장 게임 추천 테스트', de: 'Welches Farmspiel Quiz',
  },
  results: {
    stardew: {
      key: 'stardew', emoji: '⛏️',
      title: { zh: '星露谷物语', en: 'Stardew Valley', 'zh-TW': '星露谷物語', ja: 'スターデューバレー', ko: '스타듀 밸리', de: 'Stardew Valley' },
      tag: { zh: '农场游戏的标杆之作', en: 'The gold standard of farming games', 'zh-TW': '農場遊戲的標竿之作', ja: '農場ゲームの金字塔', ko: '농장 게임의 교과서', de: 'Der Goldstandard der Farming-Games' },
    },
    'animal-crossing': {
      key: 'animal-crossing', emoji: '🏝️',
      title: { zh: '动物森友会', en: 'Animal Crossing: New Horizons', 'zh-TW': '動物森友會', ja: 'あつまれ どうぶつの森', ko: '모여봐요 동물의 숲', de: 'Animal Crossing: New Horizons' },
      tag: { zh: '你的专属无压力小岛', en: 'Your pressure-free island paradise', 'zh-TW': '你的專屬無壓力小島', ja: 'プレッシャーのない、あなただけの島', ko: '스트레스 없는 나만의 섬', de: 'Deine stressfreie Insel-Oase' },
    },
    'hay-day': {
      key: 'hay-day', emoji: '📱',
      title: { zh: 'Hay Day', en: 'Hay Day', 'zh-TW': 'Hay Day', ja: 'Hay Day', ko: '헤이 데이', de: 'Hay Day' },
      tag: { zh: '最好玩的手机农场游戏', en: 'The best mobile farming game', 'zh-TW': '最好玩的手機農場遊戲', ja: 'スマホ農場ゲームの定番', ko: '최고의 모바일 농장 게임', de: 'Das beste Mobile-Farming-Game' },
    },
    palia: {
      key: 'palia', emoji: '🌍',
      title: { zh: 'Palia', en: 'Palia', 'zh-TW': 'Palia', ja: 'Palia', ko: '팔리아', de: 'Palia' },
      tag: { zh: '免费的社交农场 MMO', en: 'The free cozy social farming MMO', 'zh-TW': '免費的社交農場 MMO', ja: '無料でできるコージーMMO', ko: '무료 소셜 농장 MMO', de: 'Das kostenlose gemütliche Sozial-MMO' },
    },
    'farming-sim': {
      key: 'farming-sim', emoji: '🚜',
      title: { zh: '模拟农场 25', en: 'Farming Simulator 25', 'zh-TW': '模擬農場 25', ja: 'Farming Simulator 25', ko: '파밍 시뮬레이터 25', de: 'Farming Simulator 25' },
      tag: { zh: '最真实的农业模拟', en: 'The most realistic farming simulation', 'zh-TW': '最真實的農業模擬', ja: '最もリアルな農業シミュレーション', ko: '가장 사실적인 농업 시뮬레이션', de: 'Die realistischste Landwirtschaftssimulation' },
    },
  },
}

const QUIZ_SHARE: Record<string, QuizShare> = {
  'farm-personality': FARM_PERSONALITY,
  'which-farming-game': WHICH_FARMING_GAME,
}

// One-call result metadata for a quiz page's generateMetadata. Returns the
// localized result title, tag, and branded OG image URL — or null if r is
// missing/invalid (page falls back to its default metadata).
export function quizResultShare(
  slug: string,
  locale: string,
  r: string | undefined
): { title: string; tag: string; ogImage: string; resultKeys: string[] } | null {
  const share = getQuizShare(slug)
  if (!share) return null
  const resultKeys = Object.keys(share.results)
  const result = r ? share.results[r] : undefined
  if (!result) return null
  return {
    title: pick(result.title, locale),
    tag: pick(result.tag, locale),
    ogImage: resultOgImageUrl(share, result, locale),
    resultKeys,
  }
}

// Valid result keys for a quiz (for the page to validate ?r= before passing to the component).
export function quizResultKeys(slug: string): string[] {
  const share = getQuizShare(slug)
  return share ? Object.keys(share.results) : []
}

export function getQuizShare(slug: string): QuizShare | undefined {
  return QUIZ_SHARE[slug]
}

function pick(map: Record<Locale, string>, locale: string): string {
  return map[locale as Locale] ?? map.en
}

// Build the dynamic OG image URL for a given quiz result + locale.
export function resultOgImageUrl(quiz: QuizShare, result: ShareResult, locale: string): string {
  const params = new URLSearchParams({
    title: pick(result.title, locale),
    tag: pick(result.tag, locale),
    emoji: result.emoji,
    badge: pick(quiz.badge, locale),
    locale,
  })
  return `${BASE_URL}/api/og?${params.toString()}`
}

export function pickLocale(map: Record<Locale, string>, locale: string): string {
  return pick(map, locale)
}
