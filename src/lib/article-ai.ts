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

export const MAX_PROMPT_LEN = 1000
export const MAX_GAMES_NAMED = 3

export interface Handoff {
  prompt: string
  tools: { label: string; href: string }[]
}

export function pickLoc(map: LocMap, locale: string): string {
  return (map as Record<string, string>)[locale] ?? map.en
}

// Localized templates. `{title}` / `{desc}` / `{games}` are filled in.
// `{games}` is a full sentence (with leading space) or '' when no game detected.
const TEMPLATES: Record<string, (title: string, desc: string, games: string) => string> = {
  en: (title, desc, games) =>
    `I just read '${title}' on Farm Game Hub — ${desc}${games} Help me decide which one fits me: ask me a few quick questions about how I play (solo vs co-op, platform, session length, what I enjoy most), then give a personalized pick with your reasoning.`,
  zh: (title, desc, games) =>
    `我刚在 Farm Game Hub 读了《${title}》——${desc}${games}帮我决定哪款最适合我：先问我几个游戏习惯的问题（单机/联机、平台、时长、最看重什么），再给一份带理由的个性化推荐。`,
  'zh-TW': (title, desc, games) =>
    `我剛在 Farm Game Hub 讀了《${title}》——${desc}${games}幫我決定哪款最適合我：先問我幾個遊戲習慣的問題（單機/連線、平台、時長、最看重什麼），再給一份帶理由的個人化推薦。`,
  ja: (title, desc, games) =>
    `Farm Game Hub で「${title}」を読みました——${desc}${games}私に合うのはどれか決めるのを手伝ってください：まず私の遊び方（ソロ/協力、機種、1回のプレイ時間、重視する点）について簡単に質問し、その上で理由つきのおすすめを教えてください。`,
  ko: (title, desc, games) =>
    `Farm Game Hub에서 '${title}'을(를) 읽었어요——${desc}${games}저에게 맞는 게임을 고르도록 도와주세요: 먼저 제 플레이 방식(솔로/협동, 플랫폼, 플레이 시간, 가장 중시하는 것)을 몇 가지 물어본 뒤 이유와 함께 개인 맞춤 추천을 해주세요.`,
  de: (title, desc, games) =>
    `Ich habe gerade '${title}' auf Farm Game Hub gelesen — ${desc}${games} Hilf mir zu entscheiden, welches zu mir passt: Stell mir ein paar kurze Fragen zu meinem Spielstil (allein vs. Koop, Plattform, Sitzungsdauer, was mir am wichtigsten ist) und gib mir dann eine persönliche Empfehlung mit Begründung.`,
}

const GAMES_CLAUSE: Record<string, (names: string) => string> = {
  en: (n) => ` It compares ${n}.`,
  zh: (n) => `它对比了${n}。`,
  'zh-TW': (n) => `它對比了${n}。`,
  ja: (n) => `${n}を比較しています。`,
  ko: (n) => `${n}을(를) 비교합니다.`,
  de: (n) => ` Es vergleicht ${n}.`,
}

function joinNames(names: string[], locale: string): string {
  if (locale === 'zh' || locale === 'zh-TW' || locale === 'ja' || locale === 'ko') return names.join('、')
  if (names.length <= 1) return names.join('')
  return `${names.slice(0, -1).join(', ')} and ${names[names.length - 1]}`
}

export function buildArticleHandoff(
  post: Pick<GuidePost, 'title' | 'description' | 'tags' | 'contentHtml'>,
  locale: string,
): Handoff {
  const key = TEMPLATES[locale] ? locale : 'en'
  const ids = detectGames(post)
  const entries = ids.map((id) => GAMES.find((g) => g.id === id)!).filter(Boolean)

  const named = entries.slice(0, MAX_GAMES_NAMED).map((g) => pickLoc(g.display, key))
  const clause = named.length ? (GAMES_CLAUSE[key] ?? GAMES_CLAUSE.en)(joinNames(named, key)) : ''

  // Truncate description so the whole prompt stays under the cap.
  const buildWith = (desc: string) => TEMPLATES[key](post.title, desc, clause)
  let desc = post.description ?? ''
  let prompt = buildWith(desc)
  if (prompt.length > MAX_PROMPT_LEN) {
    const overflow = prompt.length - MAX_PROMPT_LEN
    desc = desc.slice(0, Math.max(0, desc.length - overflow - 1)).trimEnd() + '…'
    prompt = buildWith(desc)
    if (prompt.length > MAX_PROMPT_LEN) prompt = prompt.slice(0, MAX_PROMPT_LEN)
  }

  const seen = new Set<string>()
  const tools: { label: string; href: string }[] = []
  for (const g of entries) {
    for (const tool of g.tools) {
      if (seen.has(tool.href)) continue
      seen.add(tool.href)
      tools.push({ label: pickLoc(tool.label, key), href: tool.href })
    }
  }

  return { prompt, tools }
}
