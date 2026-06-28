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

const QUIZ_SHARE: Record<string, QuizShare> = {
  'farm-personality': FARM_PERSONALITY,
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
