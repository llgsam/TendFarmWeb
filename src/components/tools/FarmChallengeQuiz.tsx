'use client'

import { useState } from 'react'
import { BASE_URL } from '@/lib/config'

type Pick = 'rune-factory' | 'portia' | 'yonder' | 'farming-sim'

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
    q_en: 'When you think of a perfect gaming session, which feeling matters most to you?',
    q_zh: '想到完美的一次游戏体验，哪种感受对你最重要？',
    options: [
      { en: 'Triumph — defeating a boss I struggled with and earning it', zh: '胜利感——击败我挣扎过的Boss，凭实力赢得的那种', type: 'rune-factory' },
      { en: 'Progress — watching my town or workshop grow through my specific choices', zh: '进展感——看着我的小镇或工作室因我的具体选择而成长', type: 'portia' },
      { en: 'Freedom — exploring without any pressure, deadline, or threat', zh: '自由感——没有任何压力、期限或威胁地探索', type: 'yonder' },
      { en: 'Mastery — understanding real systems deeply and running them efficiently', zh: '掌握感——深入理解真实系统并高效运转它们', type: 'farming-sim' },
    ],
  },
  {
    q_en: 'How do you feel about combat or conflict in farming games?',
    q_zh: '你对农场游戏中的战斗或冲突感觉如何？',
    options: [
      { en: "I love it — combat adds real stakes and makes the cozy parts feel earned", zh: '我喜欢——战斗增加了真实的风险，让温馨部分更有成就感', type: 'rune-factory' },
      { en: "Some is fine — light conflict or competition adds drive without stress", zh: '一点点可以——轻微的冲突或竞争增加动力但不带来压力', type: 'portia' },
      { en: "Hard pass — I want zero enemies and zero threat in my farming game", zh: '完全不要——我想要农场游戏里零敌人、零威胁', type: 'yonder' },
      { en: "Not interested — I want technical complexity over narrative conflict", zh: '不感兴趣——我想要技术复杂性，而不是叙事冲突', type: 'farming-sim' },
    ],
  },
  {
    q_en: 'Which of these sounds most appealing to you as a core game activity?',
    q_zh: '以下哪个作为核心游戏活动最吸引你？',
    options: [
      { en: 'Exploring dungeons, leveling skills, and romancing characters with rich backstories', zh: '探索地下城、提升技能，以及与有丰富背景故事的角色恋爱', type: 'rune-factory' },
      { en: 'Building machines and workshops, filling commissions, restoring a ruined city', zh: '建造机器和工坊、接完成委托、修复废墟城市', type: 'portia' },
      { en: 'Walking through gorgeous nature, crafting, and solving gentle environmental puzzles', zh: '漫步在绝美的自然中、制作手工品、解决温和的环境谜题', type: 'yonder' },
      { en: 'Operating authentic agricultural machinery, managing crop cycles and logistics', zh: '操作真实的农业机械、管理作物周期和物流', type: 'farming-sim' },
    ],
  },
  {
    q_en: "How much time pressure do you want in your game?",
    q_zh: '你想要游戏中有多少时间压力？',
    options: [
      { en: 'Moderate — seasonal deadlines and event timers add excitement', zh: '适中——季节性期限和活动计时器增加了兴奋感', type: 'rune-factory' },
      { en: 'Some — loose timed commissions give me direction without stress', zh: '一点点——宽松的限时委托给了我方向但没有压力', type: 'portia' },
      { en: 'None at all — I want to move at exactly my own pace, always', zh: '完全没有——我想始终按照自己的节奏移动', type: 'yonder' },
      { en: 'None for story, high for self-imposed efficiency goals', zh: '故事上没有，但有自我设定的效率目标时很高', type: 'farming-sim' },
    ],
  },
  {
    q_en: 'What is your relationship with learning complex game systems?',
    q_zh: '你与学习复杂游戏系统的关系如何？',
    options: [
      { en: "I enjoy it as long as the systems serve the fantasy — crafting weapons for battles I care about", zh: '我享受它，只要系统服务于幻想——为我在乎的战斗制造武器', type: 'rune-factory' },
      { en: "I like moderate complexity — enough to feel smart, not so much I need a spreadsheet", zh: '我喜欢适度的复杂性——足以让我感到聪明，但不需要电子表格', type: 'portia' },
      { en: "I actively dislike complexity — I want discovery, not systems management", zh: '我积极地不喜欢复杂性——我想要探索，而不是系统管理', type: 'yonder' },
      { en: "The more realistic and complex the better — I read the full manual before playing", zh: '越逼真越复杂越好——我在玩之前会阅读完整的手册', type: 'farming-sim' },
    ],
  },
  {
    q_en: 'Pick the gaming experience that sounds most like you.',
    q_zh: '选出听起来最像你的游戏体验。',
    options: [
      { en: "After 100 hours I'm still finding new mechanics and relationships — I love depth", zh: '玩了100小时我仍在发现新机制和关系——我热爱深度', type: 'rune-factory' },
      { en: "I want to see a town transform from ruins to thriving because of my work", zh: '我想看到一座小镇因我的工作从废墟变成繁荣', type: 'portia' },
      { en: "I want the game world to feel like a place I genuinely want to live in", zh: '我想让游戏世界感觉像我真正想居住的地方', type: 'yonder' },
      { en: "I watch real farming content on YouTube and want that authenticity in a game", zh: '我在 YouTube 上观看真实农业内容，想要游戏中的那种真实感', type: 'farming-sim' },
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
    platform_en: string
    platform_zh: string
    why_en: string
    why_zh: string
    start_en: string
    start_zh: string
  }
> = {
  'rune-factory': {
    title_en: 'Rune Factory 4 Archival Edition / Rune Factory 5',
    title_zh: '牧场物语 4 典藏版 / 牧场物语 5',
    emoji: '⚔️',
    tag_en: 'Action RPG farming — combat, dungeons, romance, and deep character systems',
    tag_zh: '动作 RPG 农场——战斗、地下城、恋爱，以及深度角色系统',
    platform_en: 'Rune Factory 4: Nintendo Switch, PC (Steam). Rune Factory 5: Nintendo Switch, PC',
    platform_zh: 'RF4：Nintendo Switch、PC（Steam）。RF5：Nintendo Switch、PC',
    why_en:
      "Rune Factory is the farming game series for you — it combines real action RPG combat with full farming, cooking, crafting, and romance systems. In Rune Factory 4 (the better-reviewed of the two), you battle monsters in multi-floor dungeons to earn materials, then bring those materials back to your farm and town. The romance options are numerous and each has a genuinely interesting arc. Boss fights require real strategy and gear preparation — farming better equipment matters. Rune Factory is often described as 'what Stardew Valley would be if it had Dark Souls lite dungeons'; it rewards players who want the cozy farming experience alongside real challenge and deep RPG progression.",
    why_zh:
      '牧场物语是最适合你的农场游戏系列——它将真实的动作 RPG 战斗与完整的农业、烹饪、制作和恋爱系统相结合。在牧场物语 4（两款中评价更高的一款）中，你在多层地下城与怪物战斗获得材料，然后将这些材料带回你的农场和小镇。恋爱选项众多，每位角色都有真正有趣的弧线。Boss 战需要真正的策略和装备准备——耕种更好的装备很重要。牧场物语经常被描述为"如果星露谷物语有黑暗之魂轻量版地下城会怎样"；它奖励那些想要温馨农场体验同时有真实挑战和深度 RPG 进度的玩家。',
    start_en: 'Start with Rune Factory 4 — it has tighter pacing, better dungeons, and a more charming cast than RF5.',
    start_zh: '从牧场物语 4 开始——它比 RF5 有更紧凑的节奏、更好的地下城和更迷人的角色阵容。',
  },
  portia: {
    title_en: 'My Time at Portia',
    title_zh: '波西亚时光',
    emoji: '🔨',
    tag_en: 'City rebuilding + crafting + community — watch a ruin become a town',
    tag_zh: '城市重建 + 制作 + 社区——看废墟变成小镇',
    platform_en: 'Available on: Nintendo Switch, PC (Steam), PlayStation 4/5, Xbox',
    platform_zh: '可在以下平台获取：Nintendo Switch、PC（Steam）、PlayStation 4/5、Xbox',
    why_en:
      "My Time at Portia is the farming-adjacent game for you — you inherit a workshop in a small post-apocalyptic town and rebuild it by fulfilling commissions from citizens. The focus is less on crops and more on crafting machines, smelting ores, and building increasingly complex structures for the community. You also farm, raise animals, and develop relationships with over 20 fully developed characters. Timed commissions give you soft deadlines that create drive without feeling punishing. The game is set in a post-civilization world where technology is rediscovered, which gives the crafting a genuine sense of wonder and discovery. Its sequel, My Time at Sandrock, has a similar feel in a desert setting.",
    why_zh:
      '波西亚时光是最适合你的类农场游戏——你继承了一个小后世界末日小镇的工坊，通过完成市民的委托来重建它。重点不在作物上，而在于制作机器、冶炼矿石和为社区建造日益复杂的结构。你也种地、养动物，并与 20 多位完整开发的角色建立关系。限时委托给你带来了软性截止日期，创造了驱动力而不感到惩罚。游戏设定在一个重新发现技术的后文明世界，这让制作有了真正的惊奇和发现感。它的续作《沙石镇时光》在沙漠环境中有类似的感觉。',
    start_en: "Accept the main commissions first — they teach you the crafting tree and unlock the materials you need for everything else.",
    start_zh: '先接受主要委托——它们教你制作树并解锁其他所有东西所需的材料。',
  },
  yonder: {
    title_en: 'Yonder: The Cloud Catcher Chronicles',
    title_zh: 'Yonder：云彩捕捉者传说',
    emoji: '🌤️',
    tag_en: 'The most peaceful farming game ever made — zero combat, infinite exploration',
    tag_zh: '有史以来最平静的农场游戏——零战斗，无限探索',
    platform_en: 'Available on: Nintendo Switch, PC (Steam), PlayStation 4/5',
    platform_zh: '可在以下平台获取：Nintendo Switch、PC（Steam）、PlayStation 4/5',
    why_en:
      "Yonder: The Cloud Catcher Chronicles is the farming game for you if you want zero threat, zero combat, and pure exploration. There are literally no enemies in this game — none. You explore a gorgeous open world island, collect materials, farm, craft, build farms across different biomes, and help the residents of each village with their needs. The game features some of the most beautiful environmental design in the cozy genre, with different biomes ranging from snow-capped mountains to tropical beaches. The main quest involves clearing a corrupting miasma from the land using friendly spirits called Sprites. Yonder never rushes you, never punishes you, and never creates threat. It is the definitive answer to 'I want a Zelda-sized world to explore but without any of the combat.'",
    why_zh:
      'Yonder：云彩捕捉者传说是如果你想要零威胁、零战斗和纯探索的最适合你的农场游戏。这款游戏中字面意义上没有敌人——一个都没有。你探索一个美丽的开放世界岛屿、收集材料、农业、制作、在不同生物群落建造农场，并帮助每个村庄的居民满足他们的需求。该游戏拥有 cozy 类型中最美丽的环境设计之一，生物群落从白雪皑皑的山脉到热带海滩各不相同。主线任务涉及使用被称为精灵的友善生物清除土地上的腐败瘴气。Yonder 从不催促你、从不惩罚你、从不制造威胁。它是"我想要一个塞尔达大小的世界来探索，但没有任何战斗"的终极答案。',
    start_en: 'Unlock the farming plots in each biome early — having crops growing in multiple areas gives you the materials for most main quests.',
    start_zh: '尽早解锁每个生物群落的农业地块——在多个区域种植作物能给你提供大多数主线任务所需的材料。',
  },
  'farming-sim': {
    title_en: 'Farming Simulator 25',
    title_zh: '模拟农场 25',
    emoji: '🚜',
    tag_en: 'The most realistic farm simulation — authentic machinery, real crop cycles, zero story pressure',
    tag_zh: '最真实的农场模拟——真实机械、真实作物周期、零故事压力',
    platform_en: 'Available on: PC (Steam/Epic), PlayStation 5, Xbox Series X|S, with console mods support',
    platform_zh: '可在以下平台获取：PC（Steam/Epic）、PlayStation 5、Xbox Series X|S，支持主机 Mod',
    why_en:
      "Farming Simulator 25 is the game for you — authentic, deeply technical, and completely free of narrative pressure. You operate real licensed agricultural machinery from brands like John Deere, CLAAS, and Fendt, manage seasonal crop cycles, build animal husbandry operations, and expand your land empire. There are no characters to befriend, no story, no enemies, and no time pressure from external quests. The complexity comes entirely from the real agricultural systems: soil fertility management, proper crop rotation, equipment maintenance, and logistics of moving produce to market. The modding community is enormous, adding thousands of maps and vehicles. For players who watch farming content on YouTube or who have agricultural backgrounds, it is deeply satisfying in a way no other farming game can match.",
    why_zh:
      '模拟农场 25 是最适合你的游戏——真实、技术深度高，完全没有叙事压力。你操作约翰迪尔、科乐收、芬特等品牌的真实授权农业机械，管理季节性作物周期，建立畜牧业运营，扩大你的土地版图。没有要交朋友的角色、没有故事、没有敌人、没有外部任务的时间压力。复杂性完全来自真实的农业系统：土壤肥力管理、适当的轮作、设备维护和将农产品运往市场的物流。模组社区规模庞大，增加了数千个地图和车辆。对于在 YouTube 上观看农业内容的玩家或有农业背景的玩家，它提供了其他任何农场游戏都无法匹敌的深度满足感。',
    start_en: "Start on the Elm Creek map — it has the flattest terrain, best for learning machinery controls before tackling complex terrain.",
    start_zh: '从 Elm Creek 地图开始——它地形最平坦，非常适合在挑战复杂地形之前学习机械控制。',
  },
}

function calcResult(answers: Pick[]): Pick {
  const counts: Record<Pick, number> = {
    'rune-factory': 0,
    portia: 0,
    yonder: 0,
    'farming-sim': 0,
  }
  for (const a of answers) counts[a]++
  return Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0] as Pick
}

export function FarmChallengeQuiz({ locale }: { locale: string }) {
  const isZh = locale === 'zh'
  const [answers, setAnswers] = useState<(Pick | null)[]>(Array(QUESTIONS.length).fill(null))
  const [submitted, setSubmitted] = useState(false)

  const allAnswered = answers.every((a) => a !== null)

  if (submitted) {
    const result = RESULTS[calcResult(answers as Pick[])]
    const url = `${BASE_URL}/${locale}/quizzes/farming-game-challenge`
    const shareText = isZh
      ? `根据挑战偏好，最适合我的农场游戏是「${result.title_zh}」！找到你的：${url}`
      : `Based on my challenge preference, my farming game match is ${result.title_en}! Find yours: ${url}`

    return (
      <div>
        <div className="mb-6 text-center">
          <div className="mb-3 text-6xl">{result.emoji}</div>
          <p className="mb-1 text-xs text-[#4a5a4a]">{isZh ? result.tag_zh : result.tag_en}</p>
          <h2 className="mb-2 text-xl font-bold text-[#f0a832]">
            {isZh ? result.title_zh : result.title_en}
          </h2>
          <p className="text-xs text-[#4a5a4a]">{isZh ? result.platform_zh : result.platform_en}</p>
        </div>

        <p className="mb-5 text-sm leading-relaxed text-[#8a9a7a]">
          {isZh ? result.why_zh : result.why_en}
        </p>

        <div className="mb-5 rounded-xl border border-[#f0a832]/30 bg-[#0f1a0f] p-4">
          <p className="text-sm text-[#e8dcc8]">
            <span className="font-semibold text-[#f0a832]">
              {isZh ? '开始建议：' : 'Where to start: '}
            </span>
            {isZh ? result.start_zh : result.start_en}
          </p>
        </div>

        <div className="mb-4 rounded-xl border border-[#2d3d2d] bg-[#0f1a0f] p-4">
          <p className="text-center text-sm text-[#8a9a7a]">
            {isZh
              ? 'TendFarm 正在研发农场节律追踪功能，帮你把任何农场游戏里的节律带入真实日常。'
              : 'TendFarm is building a farm rhythm tracker — bringing the intentional rhythms of farming games into real daily life.'}
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
            ? '你想要多少挑战感？农场游戏推荐测验'
            : 'How Much Challenge Do You Want in Your Farming Game?'}
        </h1>
        <p className="text-sm text-[#8a9a7a]">
          {isZh
            ? '6 个问题，根据你对挑战和复杂性的偏好，找到最适合你的农场游戏——从零战斗到动作 RPG'
            : '6 questions to match your challenge preference with the right farming game — from zero combat to full action RPG dungeons'}
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
        {isZh ? '找到我的农场游戏' : 'Find My Farming Game'}
      </button>
    </div>
  )
}
