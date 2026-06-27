'use client'

import { useState } from 'react'
import { BASE_URL } from '@/lib/config'

type Game = 'sunhaven' | 'coral' | 'mistria' | 'sandrock'

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
  options: Array<{ en: string; zh: string; type: Game }>
}> = [
  {
    q_en: "You loved Stardew Valley. What made you want something new?",
    q_zh: '你喜欢星露谷物语。是什么让你想要寻找新游戏？',
    options: [
      { en: 'I want more magic — spells, different races, a bigger fantasy world', zh: '我想要更多魔法——咒语、不同种族、更大的奇幻世界', type: 'sunhaven' },
      { en: 'I want a more beautiful world — tropical, vibrant, and environmentally themed', zh: '我想要更美丽的世界——热带、生机勃勃、有环保主题', type: 'coral' },
      { en: 'I just want more of the same cozy charm — same feel, fresh experience', zh: '我只是想要更多同款治愈魅力——同样的感觉，全新的体验', type: 'mistria' },
      { en: 'I want to build and craft more — less crop focus, more construction and community', zh: '我想要更多建造和制作——减少种植，更多建设和社区', type: 'sandrock' },
    ],
  },
  {
    q_en: 'How important is combat and adventure to you in a farming game?',
    q_zh: '在农场游戏里，战斗和冒险对你有多重要？',
    options: [
      { en: 'Very — I want real combat skills, a skill tree, and challenging dungeons', zh: '非常重要——我想要真实的战斗技能、技能树和有挑战性的地下城', type: 'sunhaven' },
      { en: 'Light — diving for resources in the ocean sounds fun, but nothing intense', zh: '轻度——在海洋里潜水采集资源听起来很有趣，但不要太激烈', type: 'coral' },
      { en: 'Minimal — I mainly farm and befriend villagers, mines are secondary', zh: '最少化——我主要种地和交朋友，矿洞是次要的', type: 'mistria' },
      { en: 'Moderate — I want to explore ruins and fight, but farming is still the core', zh: '适中——我想探索废墟和战斗，但农业仍然是核心', type: 'sandrock' },
    ],
  },
  {
    q_en: 'What setting appeals to you most?',
    q_zh: '哪种游戏背景最吸引你？',
    options: [
      { en: 'A magical fantasy world with multiple fantasy races and towns to explore', zh: '一个有多个奇幻种族和城镇可以探索的魔法奇幻世界', type: 'sunhaven' },
      { en: 'A tropical island paradise with ocean, coral reefs, and a sustainability mission', zh: '一个有海洋、珊瑚礁和可持续发展使命的热带岛屿天堂', type: 'coral' },
      { en: 'A charming medieval European village with festivals and cozy pixel art', zh: '一个有节日和治愈像素画风的迷人中世纪欧式村庄', type: 'mistria' },
      { en: 'A desert frontier town that needs rebuilding after a catastrophe', zh: '一座灾难后需要重建的沙漠边境小镇', type: 'sandrock' },
    ],
  },
  {
    q_en: 'Romance and relationships in your next game should be:',
    q_zh: '在你的下一款游戏里，恋爱和人际关系应该是：',
    options: [
      { en: 'Deep and varied — lots of characters from different races with unique storylines', zh: '深入而多样——来自不同种族的大量角色，各有独特故事线', type: 'sunhaven' },
      { en: 'Wholesome and community-focused — I want to care about the whole island', zh: '温馨而以社区为中心——我想关心整个岛屿', type: 'coral' },
      { en: 'Classic cozy — a small cast of memorable characters I can fall in love with slowly', zh: '经典治愈风——一小群令人难忘的角色，让我慢慢爱上', type: 'mistria' },
      { en: 'Story-driven — I want characters with complex backstories and real growth arcs', zh: '故事驱动——我想要有复杂背景故事和真实成长弧的角色', type: 'sandrock' },
    ],
  },
  {
    q_en: 'Which of these describes your preferred game length?',
    q_zh: '哪个描述符合你偏好的游戏时长？',
    options: [
      { en: '80–120+ hours — I want a huge world with lots of content and secrets to find', zh: '80-120 小时以上——我想要一个有大量内容和秘密的庞大世界', type: 'sunhaven' },
      { en: '40–60 hours for the main arc, open-ended after for continued farming', zh: '主线 40-60 小时，之后可以继续开放式农业', type: 'coral' },
      { en: '30–50 hours — cozy and focused, without overwhelming content', zh: '30-50 小时——治愈而专注，内容不会让人应接不暇', type: 'mistria' },
      { en: '60–100 hours — there should be a town to rebuild and a story to finish', zh: '60-100 小时——应该有一座城镇可以重建和一个故事可以完成', type: 'sandrock' },
    ],
  },
  {
    q_en: 'What matters most to you in a Stardew Valley alternative?',
    q_zh: '在星露谷替代品里，什么对你最重要？',
    options: [
      { en: 'More content and variety — multiple towns, races, and skill paths', zh: '更多内容和多样性——多个城镇、种族和技能路线', type: 'sunhaven' },
      { en: 'A unique premise — I want it to feel fresh and have its own identity', zh: '独特的前提——我希望它感觉清新、有自己的身份', type: 'coral' },
      { en: 'Faithful cozy charm — I want it to feel like Stardew but lovingly made by someone else', zh: '忠实的治愈魅力——我希望它感觉像星露谷，但由别人充满爱意地制作', type: 'mistria' },
      { en: 'Crafting depth — I want more complex building systems than Stardew offers', zh: '制作深度——我想要比星露谷更复杂的建造系统', type: 'sandrock' },
    ],
  },
]

const RESULTS: Record<
  Game,
  {
    title_en: string
    title_zh: string
    emoji: string
    tag_en: string
    tag_zh: string
    platform_en: string
    platform_zh: string
    desc_en: string
    desc_zh: string
    why_en: string[]
    why_zh: string[]
    watch_en: string
    watch_zh: string
  }
> = {
  sunhaven: {
    title_en: 'Sun Haven',
    title_zh: 'Sun Haven（太阳港）',
    emoji: '☀️',
    tag_en: 'Fantasy RPG · Multiple Towns · Deep Combat',
    tag_zh: '奇幻 RPG · 多个城镇 · 深度战斗',
    platform_en: 'PC (Steam) · Nintendo Switch',
    platform_zh: 'PC（Steam）· Nintendo Switch',
    desc_en:
      "Sun Haven is what Stardew Valley would look like if it were reimagined as a full fantasy RPG. You can play as multiple races — human, elf, demon, neko, and more — each with unique perks. There are three separate towns to develop relationships in, a deep skill tree with combat specializations, and an overarching narrative with a main quest. If you wanted more of everything Stardew offered — more characters, more magic, more world — Sun Haven is built for you.",
    desc_zh:
      'Sun Haven 是如果星露谷被重新构想为完整奇幻 RPG 会是什么样子。你可以扮演多种族角色——人类、精灵、恶魔、猫耳人等——每种都有独特的特权。有三个独立的城镇可以发展关系，有深度的技能树和战斗专精，以及有主线任务的总体叙事。如果你想要星露谷所提供的一切的加强版——更多角色、更多魔法、更大世界——Sun Haven 就是为你而生的。',
    why_en: [
      'Most content-rich Stardew alternative — three towns, 50+ romance candidates, real combat',
      'Playable as multiple fantasy races with distinct starting bonuses',
      'Active development with regular content updates since 2023 full release',
    ],
    why_zh: [
      '内容最丰富的星露谷替代品——三个城镇、50 多位恋爱候选人、真实战斗',
      '可扮演多种奇幻种族，各有独特起始加成',
      '自 2023 年正式发布以来持续积极开发，定期内容更新',
    ],
    watch_en: "The sheer scope can feel overwhelming early. Pick one town and one skill path first, then expand — trying to do everything at once leads to burnout.",
    watch_zh: '庞大的规模在早期可能感觉不知所措。先专注一个城镇和一条技能路线，然后再扩展——同时尝试做所有事情会导致倦怠。',
  },
  coral: {
    title_en: 'Coral Island',
    title_zh: '珊瑚岛',
    emoji: '🪸',
    tag_en: 'Tropical · Ocean Diving · Sustainability Theme',
    tag_zh: '热带 · 海底潜水 · 可持续发展主题',
    platform_en: 'PC (Steam) · PlayStation · Xbox · Nintendo Switch',
    platform_zh: 'PC（Steam）· PlayStation · Xbox · Nintendo Switch',
    desc_en:
      "Coral Island is the most visually distinct Stardew alternative — a gorgeous tropical island farming game developed by an Indonesian team (Stairway Games) that centers environmental restoration. You farm, befriend 70+ villagers, and dive into the ocean to clean coral reefs as part of your mission. The art is vibrant and colorful in a way that feels fresh next to Stardew's more muted palette. It supports 50+ romance candidates and has a strong representation of diverse characters.",
    desc_zh:
      '珊瑚岛是视觉上最与众不同的星露谷替代品——一款由印度尼西亚团队（Stairway Games）开发的华美热带岛屿农场游戏，以环境修复为核心。你耕种、与 70 多位村民建立友谊，并潜入海洋清理珊瑚礁作为你使命的一部分。美术风格生机勃勃、色彩丰富，与星露谷更为柔和的色调相比别具一格。它支持 50 多位恋爱候选人，并有大量多元化角色。',
    why_en: [
      'Unique ocean-diving mechanic for resource gathering — nothing else in the genre offers this',
      'Most vibrant and colorful art style of any major Stardew alternative',
      'Environmental restoration storyline gives the farm work meaningful narrative purpose',
    ],
    why_zh: [
      '独特的海底潜水资源采集机制——该类型中没有其他游戏提供这种体验',
      '所有主要星露谷替代品中最生机勃勃、色彩最丰富的美术风格',
      '环境修复故事线为农场工作赋予了有意义的叙事目的',
    ],
    watch_en: "Performance on Switch can be inconsistent — PC or PlayStation/Xbox is recommended for the smoothest experience.",
    watch_zh: 'Switch 上的性能可能不稳定——推荐 PC 或 PlayStation/Xbox 以获得最流畅的体验。',
  },
  mistria: {
    title_en: 'Fields of Mistria',
    title_zh: 'Fields of Mistria（米斯特里亚农场）',
    emoji: '🌸',
    tag_en: 'Cozy · Classic Feel · Charming Pixel Art',
    tag_zh: '治愈 · 经典感 · 迷人像素画风',
    platform_en: 'PC (Steam) · Early Access 2024',
    platform_zh: 'PC（Steam）· 2024 年抢先体验',
    desc_en:
      "Fields of Mistria is the most 'Stardew-like' Stardew alternative — deliberately made to recreate that cozy charm while adding its own personality. Developed solo by NPC Studio, it features beautiful pixel art, a lovely medieval European town called Mistria, a small but well-written cast of romance candidates, and a focus on warmth over complexity. If you finished Stardew Valley and simply want more of that feeling without wanting a massively different experience, Fields of Mistria is the closest match.",
    desc_zh:
      'Fields of Mistria 是最"像星露谷"的星露谷替代品——有意重现那种治愈魅力，同时加入自己的个性。由 NPC Studio 独立开发，拥有精美的像素艺术、一个迷人的中世纪欧式小镇（米斯特里亚）、一小批但写得很好的恋爱候选人，以及注重温情而非复杂度的设计。如果你完成了星露谷物语，只是想要更多那种感觉而不想要截然不同的体验，Fields of Mistria 是最接近的选择。',
    why_en: [
      'Closest spiritual successor to Stardew Valley in tone, pacing, and cozy atmosphere',
      'Beautiful pixel art that feels both nostalgic and fresh at the same time',
      'Solo developer with a passionate community — rapid updates during early access',
    ],
    why_zh: [
      '在基调、节奏和治愈氛围上最接近星露谷物语的精神续作',
      '精美的像素艺术，同时给人以怀旧感和清新感',
      '独立开发者，拥有热情的社区——抢先体验期间快速更新',
    ],
    watch_en: "Still in early access (as of 2024/2025) — some content is not yet complete. The experience is already polished but the full game is not finished.",
    watch_zh: '仍处于抢先体验阶段（截至 2024/2025 年）——部分内容尚未完成。体验已经相当精良，但完整游戏尚未完成。',
  },
  sandrock: {
    title_en: 'My Time at Sandrock',
    title_zh: '沙石镇时光',
    emoji: '🏜️',
    tag_en: 'Crafting · Town Rebuilding · Story-Driven',
    tag_zh: '制作 · 城镇重建 · 故事驱动',
    platform_en: 'PC (Steam) · PlayStation · Xbox · Nintendo Switch',
    platform_zh: 'PC（Steam）· PlayStation · Xbox · Nintendo Switch',
    desc_en:
      "My Time at Sandrock is a crafting and town-rebuilding RPG set in a post-apocalyptic desert frontier. You play as a Builder whose job is to restore the town of Sandrock using materials you gather and workshops you upgrade. The crafting system is significantly deeper than Stardew Valley's — there are complex production chains and commission orders. The story and characters are a major focus, with fully voiced cutscenes and detailed relationship storylines. If you want farming elements alongside crafting depth and narrative weight, Sandrock delivers.",
    desc_zh:
      '沙石镇时光是一款发生在后末日沙漠边境的制作和城镇重建 RPG。你扮演一位建造师，工作是使用你收集的材料和升级的工坊来修复沙石镇。制作系统比星露谷深得多——有复杂的生产链和委托订单。故事和角色是主要关注点，有完全配音的过场动画和详细的关系故事线。如果你想要农场元素同时兼具制作深度和叙事分量，沙石镇时光能满足你。',
    why_en: [
      'Deepest crafting system of any Stardew alternative — complex workshop chains and upgrades',
      'Fully voiced story with strong main narrative and detailed character arcs',
      'Sequel to My Time at Portia — an expanded, polished experience with an established fanbase',
    ],
    why_zh: [
      '所有星露谷替代品中最深度的制作系统——复杂的工坊链和升级',
      '完全配音的故事，有强大的主线叙事和详细的角色弧',
      '波托镇时光的续作——扩展、精良的体验，拥有成熟的粉丝群',
    ],
    watch_en: "The focus is more on crafting commissions than passive farming — if you want crops and seasons to be central, Sandrock might feel slightly different from what you expect.",
    watch_zh: '游戏更注重制作委托而非被动农业——如果你想要作物和季节成为核心，沙石镇时光可能感觉与你期望的略有不同。',
  },
}

function calcResult(answers: Game[]): Game {
  const counts: Record<Game, number> = { sunhaven: 0, coral: 0, mistria: 0, sandrock: 0 }
  for (const a of answers) counts[a]++
  return Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0] as Game
}

export function StardewAltsQuiz({ locale }: { locale: string }) {
  const isZh = locale === 'zh'
  const [answers, setAnswers] = useState<(Game | null)[]>(Array(QUESTIONS.length).fill(null))
  const [submitted, setSubmitted] = useState(false)

  const allAnswered = answers.every((a) => a !== null)

  if (submitted) {
    const result = RESULTS[calcResult(answers as Game[])]
    const url = `${BASE_URL}/${locale}/quizzes/stardew-alternatives`
    const shareText = isZh
      ? `星露谷之后最适合我的游戏是「${result.title_zh}」！找到你的下一款农场游戏：${url}`
      : `My next farming game after Stardew is ${result.title_en}! Find yours: ${url}`

    return (
      <div>
        <div className="mb-6 text-center">
          <div className="mb-3 text-6xl">{result.emoji}</div>
          <p className="mb-1 text-xs text-[#4a5a4a]">{isZh ? result.tag_zh : result.tag_en}</p>
          <h2 className="mb-2 text-xl font-bold text-[#f0a832]">
            {isZh ? result.title_zh : result.title_en}
          </h2>
          <p className="text-xs text-[#4a5a4a]">
            {isZh ? result.platform_zh : result.platform_en}
          </p>
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
              {isZh ? '需要注意' : 'Worth knowing'}
            </p>
            <p className="text-sm text-[#8a9a7a]">{isZh ? result.watch_zh : result.watch_en}</p>
          </div>
        </div>

        <div className="mb-4 rounded-xl border border-[#2d3d2d] bg-[#0f1a0f] p-4">
          <p className="text-center text-sm text-[#8a9a7a]">
            {isZh
              ? 'TendFarm 正在研发农场节律追踪功能——把你在各类农场游戏里积累的慢生活哲学带入真实日常。'
              : 'TendFarm is building a farm rhythm tracker — bringing the slow-living philosophy from farming games into real daily life.'}
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
          {isZh ? '星露谷之后，你该玩哪款游戏？' : 'What to Play After Stardew Valley?'}
        </h1>
        <p className="text-sm text-[#8a9a7a]">
          {isZh
            ? '6 个问题，从 Sun Haven、珊瑚岛、Fields of Mistria、沙石镇时光中找到最适合你的下一款农场游戏'
            : '6 questions to find your perfect Stardew Valley alternative — Sun Haven, Coral Island, Fields of Mistria, or My Time at Sandrock'}
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
        {isZh ? '找到我的下一款游戏' : 'Find My Next Game'}
      </button>
    </div>
  )
}
