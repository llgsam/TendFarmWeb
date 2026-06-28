import Link from 'next/link'
import { useLocale } from 'next-intl'

function getLoc(locale: string, zh: string, en: string, zhTW: string, ja: string, ko: string, de: string): string {
  if (locale === 'zh') return zh
  if (locale === 'zh-TW') return zhTW
  if (locale === 'ja') return ja
  if (locale === 'ko') return ko
  if (locale === 'de') return de
  return en
}

type LocaleText = { zh: string; en: string; 'zh-TW': string; ja: string; ko: string; de: string }

const PICKS: { slug: string; emoji: string; title: LocaleText }[] = [
  {
    slug: 'farm-personality',
    emoji: '🌾',
    title: {
      zh: '你是哪种农场玩家？', en: 'What Kind of Farmer Are You?', 'zh-TW': '你是哪種農場玩家？',
      ja: 'あなたはどんな農場プレイヤー？', ko: '당신은 어떤 농장 플레이어인가요?', de: 'Was für ein Bauer bist du?',
    },
  },
  {
    slug: 'which-farming-game',
    emoji: '🎮',
    title: {
      zh: '哪款农场游戏最适合你？', en: 'Which Farming Game Should You Play?', 'zh-TW': '哪款農場遊戲最適合你？',
      ja: 'あなたに合う農場ゲームは？', ko: '당신에게 맞는 농장 게임은?', de: 'Welches Farmspiel solltest du spielen?',
    },
  },
  {
    slug: 'stardew-character',
    emoji: '🌱',
    title: {
      zh: '你是哪位星露谷村民？', en: 'Which Stardew Valley Character Are You?', 'zh-TW': '你是哪位星露谷村民？',
      ja: 'あなたはどのスターデューの村人？', ko: '당신은 어떤 스타듀밸리 주민인가요?', de: 'Welcher Stardew-Valley-Charakter bist du?',
    },
  },
]

function pick(text: LocaleText, locale: string): string {
  return text[locale as keyof LocaleText] ?? text.en
}

export function QuizzesTeaser() {
  const locale = useLocale()
  const base = `/${locale}`

  return (
    <section className="px-4 py-16 bg-[#0f1a0f]/50">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-[#e8dcc8]">
              {getLoc(locale, '农场游戏测验', 'Farming Game Quizzes', '農場遊戲測驗', '農場ゲーム診断', '농장 게임 퀴즈', 'Farmspiel-Quizze')}
            </h2>
            <p className="mt-1 text-sm text-[#8a9a7a]">
              {getLoc(locale, '60+ 个互动测验，找到你的农场玩家类型', '60+ interactive quizzes — find your farming type', '60+ 個互動測驗，找到你的農場玩家類型', '60以上の診断で、あなたの農場タイプを発見', '60개 이상의 퀴즈로 당신의 농장 유형 찾기', 'Über 60 Quizze — finde deinen Farmer-Typ')}
            </p>
          </div>
          <Link
            href={`${base}/quizzes`}
            className="text-sm text-[#f0a832] hover:underline whitespace-nowrap"
          >
            {getLoc(locale, '查看全部 →', 'View all →', '查看全部 →', 'すべて見る →', '전체 보기 →', 'Alle ansehen →')}
          </Link>
        </div>

        <div className="grid gap-3 sm:grid-cols-3">
          {PICKS.map((q) => (
            <Link
              key={q.slug}
              href={`${base}/quizzes/${q.slug}`}
              className="group rounded-xl border border-[#2d3d2d] bg-[#1a2e1a]/50 p-5 transition-all hover:border-[#f0a832]/30 hover:bg-[#1a2e1a]"
            >
              <div className="mb-3 text-3xl">{q.emoji}</div>
              <h3 className="font-semibold text-[#e8dcc8] group-hover:text-[#f0a832] transition-colors text-sm">
                {pick(q.title, locale)}
              </h3>
              <p className="mt-2 text-xs text-[#f0a832]/70 group-hover:text-[#f0a832] transition-colors">
                {getLoc(locale, '开始测验 →', 'Take quiz →', '開始測驗 →', '診断する →', '퀴즈 시작 →', 'Quiz starten →')}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
