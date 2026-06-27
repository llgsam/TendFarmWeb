'use client'

import { useState } from 'react'
import { BASE_URL } from '@/lib/config'

type Pick = 'stardew' | 'acnh' | 'spiritfarer' | 'dreamlight'

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
        {copied ? (isZh ? '✓ 已复制！' : '✓ Copied!') : isZh ? '📋 复制结果' : '📋 Copy result'}
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
    q_en: 'How do you most often play your Nintendo Switch?',
    q_zh: '你通常怎么玩 Nintendo Switch？',
    options: [
      { en: 'Docked on the TV, fully settled in for a proper session', zh: '连接电视，好好坐下来认真玩', type: 'stardew' },
      { en: 'Handheld in bed or on the couch, relaxed and comfortable', zh: '握着机器躺在床上或沙发上放松地玩', type: 'acnh' },
      { en: 'Handheld anywhere — I bring it with me and play whenever I feel like it', zh: '随身携带，随时随地想玩就玩', type: 'spiritfarer' },
      { en: 'Any mode — I like switching between TV and handheld during one session', zh: '任何模式——我喜欢在同一游戏时间里在电视和掌机之间切换', type: 'dreamlight' },
    ],
  },
  {
    q_en: 'What makes a cozy game feel truly satisfying to you?',
    q_zh: '什么让你觉得一款 cozy 游戏真正令人满足？',
    options: [
      { en: 'Deep progression — watching numbers go up, unlocking new content, working toward goals', zh: '深度进度——看着数字增长、解锁新内容、向目标努力', type: 'stardew' },
      { en: 'Creative expression — decorating, personalizing, making something uniquely yours', zh: '创意表达——装饰、个性化定制、打造独属于你的东西', type: 'acnh' },
      { en: 'Emotional resonance — characters you care about, stories that move you', zh: '情感共鸣——你真心在乎的角色、打动你的故事', type: 'spiritfarer' },
      { en: 'Social richness — lots of characters to meet, events, community feeling', zh: '丰富的社交——很多可以认识的角色、活动、社区感', type: 'dreamlight' },
    ],
  },
  {
    q_en: 'On a day off, how much time do you ideally want to spend gaming?',
    q_zh: '在休息日，你理想中想花多少时间在游戏上？',
    options: [
      { en: '3–5 hours — I want to really sink into a world and feel progress by the end', zh: '3-5 小时——我想真正沉浸在一个世界里，结束时感受到进度', type: 'stardew' },
      { en: '1–2 hours — light and refreshing, not too demanding', zh: '1-2 小时——轻松清爽，不要太有压力', type: 'acnh' },
      { en: '2–3 hours — enough to feel the story move but not overwhelming', zh: '2-3 小时——足以感受故事推进，但不会太沉重', type: 'spiritfarer' },
      { en: 'Flexible — sometimes 30 minutes, sometimes 4 hours, depending on mood', zh: '弹性时间——有时 30 分钟，有时 4 小时，取决于心情', type: 'dreamlight' },
    ],
  },
  {
    q_en: 'What kind of in-game characters do you want to spend time with?',
    q_zh: '你想在游戏里和什么样的角色相处？',
    options: [
      { en: 'A small, memorable cast with deep backstories I can really get to know', zh: '一小群有深厚背景故事的令人难忘的角色，我可以真正了解他们', type: 'stardew' },
      { en: "Adorable animal villagers with distinct personalities — hundreds to collect", zh: '可爱的动物村民，各有独特个性——数百个可以收集', type: 'acnh' },
      { en: 'Spirits with rich personal histories that I help navigate and ultimately release', zh: '有丰富个人历史的灵魂，我帮助他们度过并最终放手', type: 'spiritfarer' },
      { en: 'Beloved Disney characters I already know and love — Mickey, Moana, Elsa, and more', zh: '我已经认识和喜爱的经典 Disney 角色——米奇、莫阿娜、艾莎等', type: 'dreamlight' },
    ],
  },
  {
    q_en: 'How do you feel about structure and goals in cozy games?',
    q_zh: '你对 cozy 游戏中的结构和目标有什么感觉？',
    options: [
      { en: 'I like clear goals and seasons — something to work toward each in-game day', zh: '我喜欢明确的目标和季节——每个游戏内的一天都有值得努力的事', type: 'stardew' },
      { en: 'I like gentle objectives — optional, flexible, never stressful', zh: '我喜欢温和的目标——可选、灵活、永远不会有压力', type: 'acnh' },
      { en: 'I want story progression — I need to feel like the narrative is moving forward', zh: '我想要故事进展——我需要感觉叙事在向前推进', type: 'spiritfarer' },
      { en: 'I like both — daily tasks to keep me busy plus a bigger story to follow', zh: '我两者都喜欢——让我忙碌的日常任务加上一个更大的故事可以追随', type: 'dreamlight' },
    ],
  },
  {
    q_en: 'When you think of your perfect cozy game evening, what does it look like?',
    q_zh: '想象你完美的 cozy 游戏夜晚，它是什么样子的？',
    options: [
      { en: 'Working my farm, mining for gems, completing bundles — productive and satisfying', zh: '经营农场、挖矿、完成社区中心任务——有效率且令人满足', type: 'stardew' },
      { en: 'Decorating my island, visiting a friend or checking turnip prices, totally stress-free', zh: '装饰我的岛屿、拜访朋友或查看大头菜价格，完全没有压力', type: 'acnh' },
      { en: 'Sailing my boat, cooking meals for spirits, feeling every moment of the journey', zh: '驾着我的船、为灵魂们烹饪食物、感受旅程的每一个时刻', type: 'spiritfarer' },
      { en: "Completing character quests, catching new critters, expanding my valley — Disney magic everywhere", zh: '完成角色任务、捕捉新生物、扩展我的山谷——到处都是 Disney 魔法', type: 'dreamlight' },
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
    price_en: string
    price_zh: string
    desc_en: string
    desc_zh: string
    why_en: string[]
    why_zh: string[]
    tip_en: string
    tip_zh: string
  }
> = {
  stardew: {
    title_en: 'Stardew Valley',
    title_zh: '星露谷物语',
    emoji: '🌾',
    tag_en: 'Deep RPG · Seasons · Farming & Mining',
    tag_zh: '深度 RPG · 季节 · 农业与挖矿',
    price_en: '~$15 | One-time purchase',
    price_zh: '约 100 元人民币 | 买断制',
    desc_en:
      "Stardew Valley is the best fit for you — you want meaningful goals, satisfying progression, and a world that rewards dedication. On Switch, it's perfect for TV sessions where you can really sink into the game. You manage your farm across four seasons, mine for resources, build relationships with 12 marriage candidates, restore the community center, and uncover the valley's secrets. It's one of the best games ever made at any price, and the Switch version is a complete port with all content including the 1.6 update's new features.",
    desc_zh:
      '星露谷物语最适合你——你想要有意义的目标、令人满足的进度和一个奖励付出的世界。在 Switch 上，它非常适合连接电视的游戏时间，让你真正沉浸其中。你在四个季节里经营农场、挖矿采集资源、与 12 位婚姻候选人建立关系、修复社区中心、揭开山谷的秘密。这是任何价位都堪称有史以来最好的游戏之一，Switch 版本是完整移植，包含 1.6 更新的所有新内容。',
    why_en: [
      '300+ hours of content — one of the highest value games on Switch',
      'Satisfying seasonal loop gives every day clear purpose and reward',
      'Perfect for focused TV-mode sessions where you lose track of time',
    ],
    why_zh: [
      '300 小时以上内容——Switch 上性价比最高的游戏之一',
      '令人满足的季节循环让每一天都有明确的目的和回报',
      '非常适合连接电视的专注游戏时段，让你忘记时间',
    ],
    tip_en: "Start with the Forest farm if you like foraging, or Standard farm if you want maximum crop space. Don't try to do everything at once — pick one skill to level each season.",
    tip_zh: '如果你喜欢采集就选森林农场，如果你想要最大的种植空间就选标准农场。不要试图同时做所有事情——每个季节专注提升一项技能。',
  },
  acnh: {
    title_en: 'Animal Crossing: New Horizons',
    title_zh: '动物之森：新视野',
    emoji: '🍃',
    tag_en: 'Creative · Decoration · Relaxed Social',
    tag_zh: '创意 · 装饰 · 轻松社交',
    price_en: '~$60 | One-time purchase (check for sales)',
    price_zh: '约 300 元人民币 | 买断制（注意促销）',
    desc_en:
      "Animal Crossing: New Horizons is the perfect fit — you want creative freedom, a pressure-free pace, and adorable characters without deep narrative demands. You develop a deserted island into a dream community, decorate your home and outdoors, collect and trade items, and build friendships with up to 10 animal villagers. It uses real-world time, so your island always feels alive. The game rewards regulars who check in daily but never punishes players who take breaks — it's the most genuinely relaxing major game on Switch.",
    desc_zh:
      '动物之森：新视野最适合你——你想要创意自由、没有压力的节奏和可爱的角色，不需要深度叙事。你将一座荒岛发展成梦想社区，装饰你的房屋和户外空间，收集和交换物品，与最多 10 位动物村民建立友谊。游戏使用现实时间，所以你的岛屿总是充满生机。游戏奖励每天登录的玩家，但从不惩罚休息一段时间后回来的玩家——这是 Switch 上真正最令人放松的主要游戏。',
    why_en: [
      'No fail states, no death, no timers — the most genuinely stress-free game on Switch',
      'Creative decoration system is unmatched — thousands of item combinations',
      'Best when played daily for short sessions — perfect for any schedule',
    ],
    why_zh: [
      '没有失败机制、没有死亡、没有计时器——Switch 上真正最没有压力的游戏',
      '创意装饰系统无可匹敌——数千种物品组合',
      '每天短时间游玩时效果最佳——适合任何日程安排',
    ],
    tip_en: 'Play at least a little every day in the first month to keep your island progressing — the game gives you daily tasks and events that reward consistency without demanding large blocks of time.',
    tip_zh: '在前一个月每天至少玩一点来保持你的岛屿进展——游戏每天给你任务和活动，奖励持续游玩但不需要大块时间。',
  },
  spiritfarer: {
    title_en: 'Spiritfarer',
    title_zh: 'Spiritfarer',
    emoji: '⛵',
    tag_en: 'Emotional · Storytelling · Management',
    tag_zh: '情感 · 叙事 · 经营管理',
    price_en: '~$30 | One-time (often on sale for ~$10)',
    price_zh: '约 60 元人民币 | 买断制（促销时约 20 元）',
    desc_en:
      "Spiritfarer is your Switch game — you want emotional depth, characters that stay with you, and a journey that means something. You play as Stella, a ferrymaster transporting spirits to the afterlife. You manage a boat that expands and transforms, grow food, cook meals, craft materials, and most importantly, build deep relationships with each spirit aboard. Each spirit has a complete life story to uncover and a moment of letting go that you will feel. Many players describe it as making them cry in the best possible way.",
    desc_zh:
      'Spiritfarer 就是你的 Switch 游戏——你想要情感深度、留在你心里的角色和有意义的旅程。你扮演 Stella，一位引导灵魂前往来世的摆渡人。你管理一艘不断扩展和变形的船、种植食物、烹饪餐食、制作材料，最重要的是，与船上的每位灵魂建立深厚的关系。每位灵魂都有完整的生命故事等待揭开，以及一个你将真实感受到的放手时刻。许多玩家描述这款游戏让他们以最美好的方式流泪。',
    why_en: [
      'The most emotionally resonant cozy game on Switch — nothing quite compares',
      'Rich management systems (cooking, crafting, building) that never feel like chores',
      'Perfect 20–40 hour length — complete story with satisfying ending',
    ],
    why_zh: [
      'Switch 上情感最共鸣的 cozy 游戏——没有其他游戏能与之相比',
      '丰富的经营系统（烹饪、制作、建造）从不感觉像苦差事',
      '完美的 20-40 小时时长——有令人满意结局的完整故事',
    ],
    tip_en: "Take your time with each spirit's storyline — don't rush to complete their quests. The conversations and hugs are where the real game is.",
    tip_zh: '花时间了解每位灵魂的故事线——不要急着完成他们的任务。对话和拥抱才是这款游戏真正的核心。',
  },
  dreamlight: {
    title_en: 'Disney Dreamlight Valley',
    title_zh: 'Disney Dreamlight Valley',
    emoji: '✨',
    tag_en: 'Disney · Life Sim · Flexible Sessions',
    tag_zh: 'Disney · 生活模拟 · 弹性时间',
    price_en: 'Free to play (cosmetics/passes optional)',
    price_zh: '免费游玩（外观/通行证可选购）',
    desc_en:
      "Disney Dreamlight Valley fits you perfectly — you want a rich cast of familiar faces, a flexible play style, and the magic of Disney woven into everything. You restore a magical valley that was taken over by a curse called the Forgetting, rebuild relationships with Disney characters (Mickey, Elsa, WALL-E, Moana, Simba, and many more), farm, cook, fish, and decorate. As a free-to-play game, it's immediately accessible. Quests unlock new characters and biomes. The social richness and Disney IP make it unlike anything else on Switch.",
    desc_zh:
      'Disney Dreamlight Valley 非常适合你——你想要一大群熟悉的面孔、弹性的游戏风格，以及渗透在一切事物中的 Disney 魔法。你修复一个被"遗忘"诅咒占领的魔法山谷，重建与 Disney 角色的关系（米奇、艾莎、WALL-E、莫阿娜、辛巴等等），耕种、烹饪、钓鱼和装饰。作为免费游玩游戏，立即就可以体验。任务解锁新角色和生物群落。丰富的社交性和 Disney IP 让它在 Switch 上独一无二。',
    why_en: [
      'Free to play — no upfront cost to try it on Switch',
      'Most recognizable characters of any cozy game — if you love Disney, this is made for you',
      'Regular updates with new characters and seasonal content keep it fresh',
    ],
    why_zh: [
      '免费游玩——在 Switch 上尝试无需前期费用',
      '所有 cozy 游戏中最容易辨认的角色——如果你热爱 Disney，这款游戏就是为你而生',
      '定期更新新角色和季节性内容保持新鲜感',
    ],
    tip_en: 'Focus on character friendship levels early — higher friendship unlocks their full questlines. And yes, the Star Path seasonal passes are optional; the base game has plenty of content.',
    tip_zh: '早期专注于提高角色友情等级——更高的友情解锁他们完整的任务线。是的，星途季节性通行证是可选的；基础游戏有足够多的内容。',
  },
}

function calcResult(answers: Pick[]): Pick {
  const counts: Record<Pick, number> = { stardew: 0, acnh: 0, spiritfarer: 0, dreamlight: 0 }
  for (const a of answers) counts[a]++
  return Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0] as Pick
}

export function CozySwitchQuiz({ locale }: { locale: string }) {
  const isZh = locale === 'zh'
  const [answers, setAnswers] = useState<(Pick | null)[]>(Array(QUESTIONS.length).fill(null))
  const [submitted, setSubmitted] = useState(false)

  const allAnswered = answers.every((a) => a !== null)

  if (submitted) {
    const result = RESULTS[calcResult(answers as Pick[])]
    const url = `${BASE_URL}/${locale}/quizzes/cozy-switch-games`
    const shareText = isZh
      ? `我在 Switch 上最该玩的 Cozy 游戏是「${result.title_zh}」！找到你的推荐：${url}`
      : `My recommended cozy Switch game is ${result.title_en}! Find yours: ${url}`

    return (
      <div>
        <div className="mb-6 text-center">
          <div className="mb-3 text-6xl">{result.emoji}</div>
          <p className="mb-1 text-xs text-[#4a5a4a]">{isZh ? result.tag_zh : result.tag_en}</p>
          <h2 className="mb-2 text-xl font-bold text-[#f0a832]">
            {isZh ? result.title_zh : result.title_en}
          </h2>
          <p className="text-xs text-[#4a5a4a]">{isZh ? result.price_zh : result.price_en}</p>
        </div>

        <p className="mb-5 text-sm leading-relaxed text-[#8a9a7a]">
          {isZh ? result.desc_zh : result.desc_en}
        </p>

        <div className="mb-5 rounded-xl border border-[#2d3d2d] bg-[#0f1a0f] p-4">
          <h3 className="mb-3 text-sm font-semibold text-[#e8dcc8]">
            {isZh ? '为什么适合你' : 'Why it fits you'}
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
              {isZh ? '入门建议' : 'Getting started tip'}
            </p>
            <p className="text-sm text-[#8a9a7a]">{isZh ? result.tip_zh : result.tip_en}</p>
          </div>
        </div>

        <div className="mb-4 rounded-xl border border-[#2d3d2d] bg-[#0f1a0f] p-4">
          <p className="text-center text-sm text-[#8a9a7a]">
            {isZh
              ? 'TendFarm 正在研发农场节律追踪功能——把农场游戏的慢生活哲学带入真实日常。'
              : 'TendFarm is building a farm rhythm tracker — bringing the slow-living philosophy from cozy games into real daily life.'}
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
            ? '你该在 Nintendo Switch 上玩哪款 Cozy 游戏？'
            : 'Which Cozy Game Should You Play on Nintendo Switch?'}
        </h1>
        <p className="text-sm text-[#8a9a7a]">
          {isZh
            ? '6 个问题，从星露谷物语、动物之森、Spiritfarer、Disney Dreamlight Valley 中找到最适合你的那款'
            : '6 questions to find your perfect cozy Switch game — Stardew Valley, Animal Crossing: New Horizons, Spiritfarer, or Disney Dreamlight Valley'}
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
        {isZh ? '找到我的 Switch Cozy 游戏' : 'Find My Switch Cozy Game'}
      </button>
    </div>
  )
}
