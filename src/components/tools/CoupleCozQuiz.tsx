'use client'

import { useState } from 'react'
import { BASE_URL } from '@/lib/config'

type Pick = 'stardew-co-op' | 'acnh-visit' | 'palia' | 'overcooked'

function ShareButton({ text, isZh }: { text: string; isZh: boolean }) {
  const [copied, setCopied] = useState(false)
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`, '_blank')
    }
  }
  return (
    <div className="flex flex-1 gap-3">
      <button
        onClick={handleCopy}
        className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-[#2d3d2d] bg-[#1a2e1a]/50 px-4 py-3 text-sm text-[#e8dcc8] transition-colors hover:border-[#f0a832]/40 hover:text-[#f0a832]"
      >
        {copied ? (isZh ? '✓ 已复制！' : '✓ Copied!') : isZh ? '📋 分享给 TA' : '📋 Share with partner'}
      </button>
      <a
        href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 rounded-xl border border-[#2d3d2d] bg-[#1a2e1a]/50 px-4 py-3 text-sm text-[#e8dcc8] transition-colors hover:border-[#1d9bf0]/40 hover:text-[#1d9bf0]"
      >
        𝕏 {isZh ? '分享' : 'Share'}
      </a>
    </div>
  )
}

const QUESTIONS: Array<{
  q_en: string
  q_zh: string
  options: Array<{ en: string; zh: string; type: Pick }>
}> = [
  {
    q_en: 'When you and your partner game together, what usually works best?',
    q_zh: '你和伴侣一起玩游戏时，什么方式最顺畅？',
    options: [
      { en: 'We work toward the same goal on the same screen or same world', zh: '我们在同一个屏幕或同一个世界里为同一个目标努力', type: 'stardew-co-op' },
      { en: 'We each have our own world but visit each other and share what we made', zh: '我们各有自己的世界，但互相拜访、分享各自的成果', type: 'acnh-visit' },
      { en: 'We play together in the same online world alongside other people too', zh: '我们在同一个在线世界里一起玩，周围还有其他玩家', type: 'palia' },
      { en: 'We love a bit of friendly pressure — the fun is in the chaos we create together', zh: '我们喜欢一点点友好的压力——乐趣就在于我们共同制造的混乱', type: 'overcooked' },
    ],
  },
  {
    q_en: 'Describe your couple gaming dynamic honestly:',
    q_zh: '诚实描述你们的情侣游戏动态：',
    options: [
      { en: 'One of us focuses, one of us explores — we naturally divide tasks', zh: '一个人专注，一个人探索——我们自然地分工', type: 'stardew-co-op' },
      { en: "We're independent but love sharing — 'come look at what I built!'", zh: '我们独立但喜欢分享——"快来看我建的东西！"', type: 'acnh-visit' },
      { en: "We're social butterflies — gaming is more fun when there's a whole community around us", zh: '我们是社交达人——周围有整个社区的时候游戏才更有趣', type: 'palia' },
      { en: "We get competitive but laugh it off — our best memories are our biggest disasters", zh: '我们会竞争，但一笑而过——我们最美好的记忆往往是最大的灾难时刻', type: 'overcooked' },
    ],
  },
  {
    q_en: 'How much gaming overlap do you and your partner actually have?',
    q_zh: '你和伴侣实际上有多少共同游戏时间？',
    options: [
      { en: "We have dedicated 'us' gaming nights a few times a week", zh: '我们每周有几次专属的情侣游戏夜', type: 'stardew-co-op' },
      { en: "We play at different times but share the same game universe", zh: '我们在不同时间玩，但共享同一个游戏宇宙', type: 'acnh-visit' },
      { en: 'We log in whenever we feel like it and find each other there', zh: '我们随时都可以登录，然后在游戏里找到对方', type: 'palia' },
      { en: 'We need something we can just pick up for 30–60 minutes and have a good time', zh: '我们需要一款可以直接拿起来玩 30-60 分钟就能玩得开心的游戏', type: 'overcooked' },
    ],
  },
  {
    q_en: 'Which couple activity does this most remind you of?',
    q_zh: '这最让你想起哪种情侣活动？',
    options: [
      { en: 'Cooking a meal together from scratch — divide tasks, check in, make something real', zh: '一起从头开始做一顿饭——分工、协作、做出真实的东西', type: 'stardew-co-op' },
      { en: 'Decorating your shared apartment — each has a zone, then you admire the whole', zh: '装饰你们共同的公寓——各有各的区域，然后一起欣赏整体', type: 'acnh-visit' },
      { en: 'Going to a social event together — you enjoy the space as a couple but engage with others', zh: '一起参加社交活动——你们作为一对享受空间，但也与他人互动', type: 'palia' },
      { en: 'Playing a board game — there will be banter, strategy, and probably some mild arguing', zh: '玩桌游——一定会有斗嘴、策略，可能还有一点小争吵', type: 'overcooked' },
    ],
  },
  {
    q_en: 'What do you want a couple game to leave you feeling?',
    q_zh: '你想要情侣游戏结束后有什么感觉？',
    options: [
      { en: 'Accomplished — we built something together and it shows', zh: '有成就感——我们一起建造了一些东西，它看得见', type: 'stardew-co-op' },
      { en: 'Connected — we shared our creative worlds and felt seen', zh: '有连接感——我们分享了各自的创意世界，感受到了被理解', type: 'acnh-visit' },
      { en: 'Refreshed — we had a gentle adventure without stress or competition', zh: '焕然一新——我们有了一段温和的冒险，没有压力或竞争', type: 'palia' },
      { en: 'Laughing — whatever happened, it was chaotic and we loved every minute', zh: '笑声不断——不管发生什么，都是一片混乱，我们爱极了每一分钟', type: 'overcooked' },
    ],
  },
  {
    q_en: 'One partner is less experienced with video games. How do you handle that?',
    q_zh: '一方对电子游戏经验较少。你们怎么处理这个问题？',
    options: [
      { en: 'We want a game that gives each person a meaningful role — experience level matters less', zh: '我们想要一款给每个人有意义角色的游戏——经验水平关系不大', type: 'stardew-co-op' },
      { en: 'We want something where you can play at your own comfort level without holding each other back', zh: '我们想要一款可以按照自己的舒适度游玩而不会拖后腿的游戏', type: 'acnh-visit' },
      { en: "We want a gentle learning curve — the less experienced partner can find their pace naturally", zh: '我们想要平缓的学习曲线——经验较少的一方可以自然地找到自己的节奏', type: 'palia' },
      { en: "We embrace the gap — the chaos of skill differences is half the fun", zh: '我们接受差距——技能差异带来的混乱就是一半的乐趣', type: 'overcooked' },
    ],
  },
]

const RESULTS: Record<
  Pick,
  {
    title_en: string
    title_zh: string
    emoji: string
    tag_en: string
    tag_zh: string
    desc_en: string
    desc_zh: string
    why_en: string[]
    why_zh: string[]
    warning_en: string
    warning_zh: string
  }
> = {
  'stardew-co-op': {
    title_en: 'Stardew Valley Co-op',
    title_zh: '星露谷物语联机模式',
    emoji: '🌾',
    tag_en: 'Co-op Farming · Shared Goals · Team Building',
    tag_zh: '合作农业 · 共同目标 · 团队建设',
    desc_en:
      "Stardew Valley co-op is the most rewarding couple cozy game you can play. You share a farm, divide roles naturally (one person might fish while the other mines, or one cooks while the other grows crops), and over the in-game seasons build something that genuinely belongs to both of you. The community center restoration gives you shared goals that feel meaningful when completed together. Two to four players are supported — but two is the sweet spot for couples who want deep engagement without the chaos.",
    desc_zh:
      '星露谷物语联机是你们能玩的最有回报的情侣 cozy 游戏。你们共享一个农场，自然地分工（一个人钓鱼，另一个挖矿，或者一个烹饪，另一个种地），在游戏内的季节里建造真正属于你们两个人的东西。社区中心修复给你们共同完成时感觉有意义的目标。支持 2-4 名玩家——但对于想要深度参与而不混乱的情侣来说，两人是最佳状态。',
    why_en: [
      'Most "we built this together" feeling of any cozy co-op game',
      'Natural role division — you collaborate without stepping on each other',
      'Scales from 30-minute sessions to 3-hour deep dives depending on your mood',
    ],
    why_zh: [
      '所有 cozy 合作游戏中"我们一起建造了这个"的感觉最强烈',
      '自然的角色分工——你们合作而不会互相干扰',
      '根据心情可以从 30 分钟游戏到 3 小时深度体验',
    ],
    warning_en: "Decide early who manages the community center checklist — conflicting approaches can be a surprising source of friction.",
    warning_zh: '尽早决定谁来管理社区中心的清单——不同的方法可能出乎意料地产生摩擦。',
  },
  'acnh-visit': {
    title_en: 'Animal Crossing: New Horizons (Island Visits)',
    title_zh: '动物之森：新视野（岛屿拜访模式）',
    emoji: '🍃',
    tag_en: 'Independent · Sharing · Creative Exchange',
    tag_zh: '独立 · 分享 · 创意交流',
    desc_en:
      "Animal Crossing: New Horizons is perfect for couples who each want their own creative space but love sharing what they make. Each of you builds your island independently — your design choices, your villagers, your pace. Then you visit each other's islands: you might find different rare items, trade resources, leave gifts, or just walk around admiring what your partner created. It's less about playing together and more about sharing parallel creative lives — which many couples find even more intimate.",
    desc_zh:
      '动物之森：新视野非常适合想要各自拥有创意空间但喜欢分享成果的情侣。你们各自独立地建造自己的岛屿——你的设计选择、你的村民、你的节奏。然后互相拜访对方的岛屿：你可能会发现不同的稀有物品、交换资源、留下礼物，或者只是散步欣赏你的伴侣创造的东西。这与其说是一起玩，不如说是分享平行的创意生活——许多情侣发现这甚至更加亲密。',
    why_en: [
      'No skill difference problem — each plays at their own comfort level on their own island',
      'Visiting each other\'s islands becomes a genuine "come see what I made" sharing ritual',
      'Real-world time means you\'re always in the same seasonal world even when apart',
    ],
    why_zh: [
      '没有技能差异问题——每个人在自己的岛屿上按照自己的舒适度游玩',
      '拜访对方的岛屿成为真实的"来看我做的东西"分享仪式',
      '实时时钟意味着即使分开，你们也总是在同一个季节性世界里',
    ],
    warning_en: "You each need your own Nintendo Switch and copy of the game — sharing one console means sharing one island, which changes the dynamic significantly.",
    warning_zh: '你们各自需要自己的 Nintendo Switch 和游戏——共用一台主机意味着共用一个岛屿，这会显著改变游戏动态。',
  },
  palia: {
    title_en: 'Palia (Free Online Co-op)',
    title_zh: 'Palia（免费在线合作）',
    emoji: '🌻',
    tag_en: 'Free · Online MMO · Gentle Together',
    tag_zh: '免费 · 在线 MMO · 一起治愈',
    desc_en:
      "Palia is the best free couple cozy game in 2025 — and it runs on both PC and Switch, so different hardware combinations work. You and your partner exist in the same shared world alongside other friendly players, can farm plots near each other, cook meals together, go hunting as a pair, and join community events. Palia has one of the friendliest gaming communities online. The free-to-play model means you can both download it today without spending anything, which makes it a perfect gateway cozy game for a couple where one partner is newer to gaming.",
    desc_zh:
      'Palia 是 2025 年最好的免费情侣 cozy 游戏——它在 PC 和 Switch 上都可以运行，所以不同的硬件组合也能配对。你和伴侣存在于同一个共享世界中，周围还有其他友好的玩家，可以在彼此旁边种植农场、一起烹饪食物、结伴去狩猎、参加社区活动。Palia 拥有网络上最友好的游戏社区之一。免费游玩模式意味着你们今天就可以下载而无需花任何钱，这使它成为情侣中经验较少的一方的完美入门 cozy 游戏。',
    why_en: [
      'Completely free — both players can download and start today with zero cost',
      'Flexible availability — no need to schedule, just log in and find each other in-world',
      'Gentle enough for gaming newcomers but rich enough for experienced players',
    ],
    why_zh: [
      '完全免费——两名玩家今天就可以下载并开始，零成本',
      '弹性可用性——无需安排时间，随时登录就能在游戏世界里找到对方',
      '对游戏新手足够温和，但对有经验的玩家也足够丰富',
    ],
    warning_en: "PC and Switch players cannot currently play together cross-platform — make sure you're both on the same platform.",
    warning_zh: 'PC 和 Switch 玩家目前不能跨平台一起玩——确保你们都在同一个平台上。',
  },
  overcooked: {
    title_en: 'Overcooked! 2 (Or Overcooked! All You Can Eat)',
    title_zh: '煮过头！2（或煮过头！管够版）',
    emoji: '👨‍🍳',
    tag_en: 'Chaotic Co-op · Laughter · Friendly Competition',
    tag_zh: '混乱合作 · 欢笑 · 友好竞争',
    desc_en:
      "Your couple energy calls for Overcooked — the chaotic co-op cooking game that has launched more laughing arguments than any other co-op game. You run a kitchen together, divide tasks under increasing time pressure, and inevitably end up shouting instructions at each other in the most affectionate way possible. It's not a cozy farming game in the traditional sense, but it is deeply cozy in the couple sense: high-energy moments that create shared memories, a game short enough for a 30-minute session, and a difficulty that scales so both partners stay engaged. Overcooked! All You Can Eat bundles the full series.",
    desc_zh:
      '你们的情侣能量需要《煮过头》——这款混乱的合作烹饪游戏制造的欢笑争论比任何其他合作游戏都多。你们一起经营厨房，在不断增加的时间压力下分工，不可避免地用最温情的方式向对方大声发出指令。它在传统意义上不是一款治愈的农场游戏，但在情侣意义上却非常治愈：创造共同记忆的高能量时刻、短到 30 分钟就能玩一局、难度会升级让两名玩家都保持投入。《煮过头！管够版》包含完整系列合集。',
    why_en: [
      'Creates more shared laughter and stories than any other co-op game in this genre',
      'Short sessions (30–60 min) — perfect for evenings when you want fun without a big time commitment',
      'Available on every major platform including Switch local co-op on one screen',
    ],
    why_zh: [
      '比同类任何其他合作游戏创造更多共同的笑声和故事',
      '短时间游戏（30-60 分钟）——非常适合不想占用太多时间但想要乐趣的夜晚',
      '在所有主要平台上都有，包括 Switch 一屏本地合作',
    ],
    warning_en: "It will test your communication under pressure. This is a feature, not a bug — but set the expectation that chaos is the point.",
    warning_zh: '它会考验你们在压力下的沟通。这是特性，不是缺陷——但要设定好混乱是游戏核心的期望。',
  },
}

function calcResult(answers: Pick[]): Pick {
  const counts: Record<Pick, number> = {
    'stardew-co-op': 0,
    'acnh-visit': 0,
    palia: 0,
    overcooked: 0,
  }
  for (const a of answers) counts[a]++
  return Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0] as Pick
}

export function CoupleCozQuiz({ locale }: { locale: string }) {
  const isZh = locale === 'zh'
  const [answers, setAnswers] = useState<(Pick | null)[]>(Array(QUESTIONS.length).fill(null))
  const [submitted, setSubmitted] = useState(false)

  const allAnswered = answers.every((a) => a !== null)

  if (submitted) {
    const result = RESULTS[calcResult(answers as Pick[])]
    const url = `${BASE_URL}/${locale}/quizzes/cozy-games-for-couples`
    const shareText = isZh
      ? `我们情侣最适合玩的 Cozy 游戏是「${result.title_zh}」！快来找到你们的答案：${url}`
      : `Our couple cozy game match is ${result.title_en}! Find yours: ${url}`

    return (
      <div>
        <div className="mb-6 text-center">
          <div className="mb-3 text-6xl">{result.emoji}</div>
          <p className="mb-1 text-xs text-[#4a5a4a]">{isZh ? result.tag_zh : result.tag_en}</p>
          <h2 className="mb-2 text-xl font-bold text-[#f0a832]">
            {isZh ? result.title_zh : result.title_en}
          </h2>
        </div>

        <p className="mb-5 text-sm leading-relaxed text-[#8a9a7a]">
          {isZh ? result.desc_zh : result.desc_en}
        </p>

        <div className="mb-5 rounded-xl border border-[#2d3d2d] bg-[#0f1a0f] p-4">
          <h3 className="mb-3 text-sm font-semibold text-[#e8dcc8]">
            {isZh ? '为什么适合你们' : 'Why it fits your couple'}
          </h3>
          <ul className="mb-3 space-y-2">
            {(isZh ? result.why_zh : result.why_en).map((w, i) => (
              <li key={i} className="flex gap-2 text-sm text-[#8a9a7a]">
                <span className="shrink-0 text-[#f0a832]">✓</span>
                <span>{w}</span>
              </li>
            ))}
          </ul>
          <div className="border-t border-[#2d3d2d] pt-3">
            <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-[#f0a832]">
              {isZh ? '开始前要知道' : 'Know before you start'}
            </p>
            <p className="text-sm text-[#8a9a7a]">{isZh ? result.warning_zh : result.warning_en}</p>
          </div>
        </div>

        <div className="mb-4 rounded-xl border border-[#2d3d2d] bg-[#0f1a0f] p-4">
          <p className="text-center text-sm text-[#8a9a7a]">
            {isZh
              ? 'TendFarm 正在研发农场节律追踪功能——把游戏里共同创造的慢生活带入真实日常。'
              : 'TendFarm is building a farm rhythm tracker — bringing the shared slow-living you create in cozy games into real daily life.'}
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <ShareButton text={shareText} isZh={isZh} />
          <button
            onClick={() => { setAnswers(Array(QUESTIONS.length).fill(null)); setSubmitted(false) }}
            className="flex-1 rounded-xl border border-[#2d3d2d] py-3 text-sm text-[#8a9a7a] hover:border-[#4a5a4a] hover:text-[#e8dcc8]"
          >
            {isZh ? '重新测试' : 'Retake Quiz'}
          </button>
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className="mb-8 text-center">
        <h1 className="mb-2 text-xl font-bold text-[#e8dcc8]">
          {isZh
            ? '适合情侣的 Cozy 游戏测验'
            : 'Best Cozy Game for Couples Quiz'}
        </h1>
        <p className="text-sm text-[#8a9a7a]">
          {isZh
            ? '6 个问题，为你们找到最适合一起玩的 cozy 游戏——星露谷联机、动物之森、Palia 还是煮过头'
            : '6 questions to find the best cozy game for your couple — Stardew Valley co-op, Animal Crossing visits, Palia, or Overcooked'}
        </p>
      </div>

      <div className="space-y-6">
        {QUESTIONS.map((q, qi) => (
          <div key={qi}>
            <p className="mb-3 font-medium text-[#e8dcc8]">
              {qi + 1}. {isZh ? q.q_zh : q.q_en}
            </p>
            <div className="space-y-2">
              {q.options.map((opt, oi) => (
                <button
                  key={oi}
                  onClick={() => { const next = [...answers]; next[qi] = opt.type; setAnswers(next) }}
                  className={`w-full rounded-xl border px-4 py-3 text-left text-sm transition-colors ${
                    answers[qi] === opt.type
                      ? 'border-[#f0a832] bg-[#f0a832]/10 text-[#e8dcc8]'
                      : 'border-[#2d3d2d] text-[#8a9a7a] hover:border-[#4a5a4a] hover:text-[#e8dcc8]'
                  }`}
                >
                  {isZh ? opt.zh : opt.en}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      <button
        disabled={!allAnswered}
        onClick={() => setSubmitted(true)}
        className={`mt-8 w-full rounded-xl py-3 font-semibold transition-colors ${
          allAnswered ? 'bg-[#f0a832] text-[#0f1a0f] hover:bg-[#e09822]' : 'cursor-not-allowed bg-[#2d3d2d] text-[#4a5a4a]'
        }`}
      >
        {isZh ? '找到我们的情侣游戏' : 'Find Our Couple Game'}
      </button>
    </div>
  )
}
