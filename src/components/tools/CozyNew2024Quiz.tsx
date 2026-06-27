'use client'

import { useState } from 'react'
import { BASE_URL } from '@/lib/config'

type Pick = 'botany-manor' | 'rustys-retirement' | 'fields-of-mistria' | 'dungeons-of-hinterberg'

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
    q_en: 'How long do you want your cozy game to be?',
    q_zh: '你希望你的 Cozy 游戏持续多久？',
    options: [
      { en: 'A complete, satisfying experience in 3-5 hours — I want a beginning and an ending', zh: '3-5 小时内完整、令人满足的体验——我想要有开始和结局', type: 'botany-manor' },
      { en: 'Endless and ambient — I want something I can run in the background forever', zh: '无止境且环境感强——我想要可以永远在后台运行的东西', type: 'rustys-retirement' },
      { en: 'Hundreds of hours — I want a deep world to live in across weeks and seasons', zh: '数百小时——我想要一个可以跨越数周和季节生活其中的深度世界', type: 'fields-of-mistria' },
      { en: '30-50 hours — a complete story arc with meaningful progression and an actual ending', zh: '30-50 小时——有意义进度和真正结局的完整故事弧线', type: 'dungeons-of-hinterberg' },
    ],
  },
  {
    q_en: 'How do you feel about combat in a cozy game?',
    q_zh: '你对 Cozy 游戏中的战斗有何看法？',
    options: [
      { en: 'I want zero combat — the challenge should be entirely puzzle and observation', zh: '我想要零战斗——挑战应该完全是谜题和观察', type: 'botany-manor' },
      { en: 'No combat at all — I want the game to run by itself while I do other things', zh: '完全没有战斗——我想要游戏在我做其他事情时自行运行', type: 'rustys-retirement' },
      { en: 'Light optional combat is fine but the core should be farming and social life', zh: '轻度可选战斗可以接受，但核心应该是农耕和社交生活', type: 'fields-of-mistria' },
      { en: 'I actually enjoy cozy + action together — Zelda-like combat as part of a relaxing world', zh: '我实际上喜欢 cozy + 动作的结合——塞尔达式战斗作为放松世界的一部分', type: 'dungeons-of-hinterberg' },
    ],
  },
  {
    q_en: 'What does your ideal in-game session look like?',
    q_zh: '你理想的游戏内时段是什么样的？',
    options: [
      { en: 'Quiet experimentation: trying different conditions to make a flower bloom the way it wants', zh: '安静的实验：尝试不同的条件让花朵以它想要的方式绽放', type: 'botany-manor' },
      { en: 'Glancing at the game every 5-10 minutes between tasks while something else is open on my screen', zh: '在做其他事情时，每 5-10 分钟瞄一眼游戏，同时屏幕上还开着其他东西', type: 'rustys-retirement' },
      { en: 'A full farm day: planting, talking to NPCs, exploring a dungeon, decorating, sleeping', zh: '完整的农场一天：种植、与 NPC 交谈、探索地下城、装饰、入睡', type: 'fields-of-mistria' },
      { en: 'Exploring a new puzzle dungeon in the Alps, solving its gimmick, then chatting with townspeople', zh: '在阿尔卑斯山探索一个新的谜题地下城，解决它的关键机制，然后与镇民交谈', type: 'dungeons-of-hinterberg' },
    ],
  },
  {
    q_en: 'How novel do you want the game concept to be?',
    q_zh: '你希望游戏概念有多新颖？',
    options: [
      { en: 'Entirely original premise — I want something I have never seen before in any genre', zh: '完全原创的前提——我想要一个我从未在任何类型中见过的东西', type: 'botany-manor' },
      { en: 'Wildly novel format — the idea itself should be clever and surprising', zh: '极为新颖的格式——概念本身应该聪明且出人意料', type: 'rustys-retirement' },
      { en: 'Familiar with polish — I love the Stardew formula and want more of it, done beautifully', zh: '熟悉但精致——我喜欢星露谷公式，想要更多同类，但做得更精美', type: 'fields-of-mistria' },
      { en: 'Genre-blend I have not tried — cozy world + action RPG is a combination I am curious about', zh: '我未尝试过的类型混合——cozy 世界 + 动作 RPG 是我好奇的组合', type: 'dungeons-of-hinterberg' },
    ],
  },
  {
    q_en: 'Where and when do you most often play games?',
    q_zh: '你最常在哪里以及什么时候玩游戏？',
    options: [
      { en: 'Focused dedicated sessions on PC or console — I sit down to play intentionally', zh: '在 PC 或主机上专注的专属时段——我会专心坐下来玩', type: 'botany-manor' },
      { en: 'Casually throughout the day — a window on my second monitor, glanced at between meetings', zh: '一天中随意地玩——第二台显示器上的一个窗口，在会议间隙瞥一眼', type: 'rustys-retirement' },
      { en: 'Long evening sessions on PC or handheld — I want to sink into a world for 2-3 hours at a time', zh: '在 PC 或掌机上的长时间夜间游戏——我想一次沉浸在一个世界中 2-3 小时', type: 'fields-of-mistria' },
      { en: 'Dedicated sessions where I want to feel like I went somewhere — a real adventure', zh: '专注的时段，我想感觉像是去了某个地方——一次真正的冒险', type: 'dungeons-of-hinterberg' },
    ],
  },
  {
    q_en: 'Which of these sounds most appealing to you?',
    q_zh: '以下哪个对你最有吸引力？',
    options: [
      { en: '"I figured out why the Moonbloom was not flowering — it needed colder nights after exactly four days of rain"', zh: '"我搞清楚了为什么月光花没有开放——它需要在正好四天的雨后有更冷的夜晚"', type: 'botany-manor' },
      { en: '"I checked my farm after a work call and my crops had grown, my animals were fed, and I had 10,000 coins waiting"', zh: '"一个工作电话后我查看了我的农场，我的作物已经生长，我的动物已被喂饱，还有 10,000 金币等着我"', type: 'rustys-retirement' },
      { en: '"I am on Year 3 and my Mistrian farm has a greenhouse, a purple heart with Caldarus, and a fully upgraded forge"', zh: '"我在第 3 年，我的 Mistria 农场有一个温室，与 Caldarus 的紫心，以及一个完全升级的熔炉"', type: 'fields-of-mistria' },
      { en: '"I just solved the ice cave dungeon and found out the tourist guide has a secret — the Hinterberg mystery is getting good"', zh: '"我刚解决了冰洞地下城，发现导游有一个秘密——Hinterberg 的谜题越来越精彩了"', type: 'dungeons-of-hinterberg' },
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
    tip_en: string
    tip_zh: string
  }
> = {
  'botany-manor': {
    title_en: 'Botany Manor',
    title_zh: '植物庄园',
    emoji: '🌺',
    tag_en: 'A 3-hour puzzle masterpiece about learning exactly how to make each rare plant bloom',
    tag_zh: '3 小时的谜题杰作，关于精确学习如何让每株稀有植物绽放',
    platform_en: 'Available on: PC (Steam, GOG), Xbox, Xbox Game Pass — about $20',
    platform_zh: '可在以下平台获取：PC（Steam、GOG）、Xbox、Xbox Game Pass——约 20 美元',
    why_en:
      "Botany Manor was released in April 2024 and received widespread acclaim — BAFTA nominated and a strong Game of the Year contender for short games. You play as Arabella Greene, an elderly botanist in a Victorian country manor, trying to grow rare and forgotten plants. Each plant is a puzzle: you learn from scattered documents, letters, and field notes what conditions each species needs — specific altitude, temperature range, rainfall frequency, soil acidity, moonlight. You adjust conditions, plant the seed, and watch whether it blooms. When it does, it is one of the most satisfying moments in puzzle game design. The game is about 3 hours for a careful playthrough, which makes it rare in the cozy space: a game with a proper ending that does not overstay its welcome. Available on Xbox Game Pass. One of the best short cozy puzzle games ever made.",
    why_zh:
      '植物庄园于 2024 年 4 月发布并获得广泛好评——BAFTA 提名，是短游戏年度最佳的有力竞争者。你扮演艾拉贝拉·格林，一位维多利亚乡间庄园的老年植物学家，试图种植稀有和被遗忘的植物。每株植物都是一个谜题：你从散落的文件、信件和田野笔记中学习每个物种需要什么条件——特定高度、温度范围、降雨频率、土壤酸度、月光。你调整条件，种下种子，看它是否绽放。当它绽放时，是谜题游戏设计中最令人满足的时刻之一。这款游戏仔细通关大约 3 小时，这在 cozy 游戏领域很罕见：一款有适当结局且不过度延续的游戏。可在 Xbox Game Pass 上获取。有史以来最好的短篇 cozy 谜题游戏之一。',
    tip_en: "Read every document you find before giving up on a plant — the conditions you need are always in the estate somewhere. The trick is often in the last note you check.",
    tip_zh: '在放弃一株植物之前阅读你找到的每一份文件——你需要的条件总是在庄园的某个地方。诀窍通常在你检查的最后一个笔记中。',
  },
  'rustys-retirement': {
    title_en: "Rusty's Retirement",
    title_zh: 'Rusty 的退休生活',
    emoji: '🤖',
    tag_en: 'The idle farm game designed to run in a strip at the bottom of your screen while you work',
    tag_zh: '专为在你工作时在屏幕底部条形区域运行而设计的放置农场游戏',
    platform_en: 'Available on: PC (Steam) — about $7',
    platform_zh: '可在以下平台获取：PC（Steam）——约 7 美元',
    why_en:
      "Rusty's Retirement is one of the most creative cozy game concepts released in 2024. The game runs in a narrow horizontal strip at the very bottom of your screen — designed to sit below your browser windows, documents, or work applications while you do other things. You manage a small robot farm: your Rustys automatically harvest crops, chop wood, mine resources, and process materials with occasional minimal input from you. Over time you unlock new Rusty types, discover automation upgrades, and expand your farm strip. The game has no sound (by design — it respects your work focus) and is explicitly positioned as a 'productivity companion.' At $7 on Steam it is a wildly original concept and has attracted enormous attention for how respectful it is of your real time. If you have ever wished a cozy game could run alongside your actual work life without demanding your full attention, this is built for exactly that.",
    why_zh:
      "Rusty's Retirement 是 2024 年发布的最具创意的 cozy 游戏概念之一。这款游戏在你屏幕最底部的狭窄水平条中运行——专为在你使用浏览器窗口、文档或工作应用程序做其他事情时坐落在其下方而设计。你管理一个小型机器人农场：你的 Rusty 们自动收获作物、砍伐木材、开采资源，并在偶尔需要你极少输入时处理材料。随着时间推移，你解锁新的 Rusty 类型，发现自动化升级，并扩展你的农场条。这款游戏没有声音（出于设计考虑——它尊重你的工作专注度），明确定位为'生产力伴侣'。Steam 上 7 美元，它是一个非常原创的概念，因为对你真实时间的极度尊重而吸引了大量关注。如果你曾经希望一款 cozy 游戏能在你的实际工作生活旁运行而不需要你全神贯注，这款游戏正是为此而生。",
    tip_en: "Prioritize unlocking automation upgrades over expanding your crop variety — the more self-sufficient each Rusty becomes, the less you need to check on them.",
    tip_zh: '优先解锁自动化升级而不是扩展你的作物种类——每个 Rusty 越自给自足，你就越不需要查看它们。',
  },
  'fields-of-mistria': {
    title_en: 'Fields of Mistria',
    title_zh: 'Mistria 的田野',
    emoji: '🌾',
    tag_en: 'The 2024 farming sim that is quietly becoming the closest spiritual successor to Stardew Valley',
    tag_zh: '2024 年农场模拟游戏，正悄悄成为最接近星露谷精神续作的游戏',
    platform_en: 'Available on: PC (Steam, Early Access since July 2024) — about $18',
    platform_zh: '可在以下平台获取：PC（Steam，2024 年 7 月起抢先体验）——约 18 美元',
    why_en:
      "Fields of Mistria entered Steam Early Access in July 2024 and immediately attracted a devoted following among Stardew Valley fans, building a passionate community within weeks. You move to the town of Mistria — a small medieval fantasy village recovering from an ancient calamity — and rebuild the community while farming, crafting, mining, fishing, and befriending a full cast of NPCs with voiced dialogue and deep backstories. The art style is warm fantasy anime-adjacent with beautiful seasonal changes. The combat is action-RPG with genuinely satisfying dungeon exploration. Developer NPC Studio updates the game regularly with significant content patches. Players who love Stardew Valley's formula but have completed it and want something fresh with the same soul consistently point to Fields of Mistria as the most natural next step. It is in Early Access, which means it is unfinished — but the current content is substantial enough that most players report 60-100+ hours already.",
    why_zh:
      'Mistria 的田野于 2024 年 7 月进入 Steam 抢先体验，立即吸引了星露谷物语粉丝的忠实追随，在几周内建立了热情的社区。你搬到 Mistria 镇——一个从远古灾难中恢复的小型中世纪奇幻村庄——并通过农耕、制作、开矿、钓鱼和结交拥有配音对话和深度背景故事的完整 NPC 阵容来重建社区。美术风格是温暖的奇幻动漫风格，有美丽的季节变化。战斗是动作 RPG，有真正令人满足的地下城探索。开发商 NPC Studio 定期更新游戏，推出重大内容补丁。喜欢星露谷物语公式但已经完成并想要拥有相同灵魂的新鲜事物的玩家，一致将 Mistria 的田野指向为最自然的下一步。它处于抢先体验阶段，这意味着它尚未完成——但当前内容已经足够丰富，大多数玩家报告已经有 60-100 多小时了。',
    tip_en: "Talk to every NPC every day even before you have gifts for them — friendship points from conversation accumulate faster than most players realize, and several NPCs have branching dialogue that only appears at certain friendship levels.",
    tip_zh: '即使在没有礼物之前，也要每天和每个 NPC 交谈——对话的友谊点数积累比大多数玩家意识到的要快，几个 NPC 有只在特定友谊等级出现的分支对话。',
  },
  'dungeons-of-hinterberg': {
    title_en: 'Dungeons of Hinterberg',
    title_zh: 'Hinterberg 的地下城',
    emoji: '⛰️',
    tag_en: 'A cozy action RPG set in an Austrian Alps tourist town where dungeons have become a leisure activity',
    tag_zh: '设定在奥地利阿尔卑斯山旅游小镇的 cozy 动作 RPG，地下城已成为休闲活动',
    platform_en: 'Available on: PC (Steam, GOG), Xbox, Xbox Game Pass — about $25',
    platform_zh: '可在以下平台获取：PC（Steam、GOG）、Xbox、Xbox Game Pass——约 25 美元',
    why_en:
      "Dungeons of Hinterberg is one of the most original concepts of 2024: a cozy action RPG set in Hinterberg, a fictional Austrian mountain town where magical dungeons have recently appeared across the Alps. The dungeons are now a tourist attraction — people come from around the world to challenge them as a leisure activity, staying at inns, eating at local restaurants, and socializing in the evenings. You play as Luisa, a burned-out young lawyer taking a vacation in Hinterberg to clear her head by dungeon-exploring. Each dungeon has a unique puzzle-solving mechanic built around magic (fire, ice, wind, etc.) and you unlock new abilities as you progress. During the day you explore dungeons; in the evenings you socialize with townspeople and fellow adventurers, building relationships that affect the story. The game has a complete narrative arc of about 25-40 hours and makes the unusual choice of making cozy social simulation and action combat feel genuinely complementary rather than awkward. Available on Xbox Game Pass.",
    why_zh:
      'Hinterberg 的地下城是 2024 年最具原创性的概念之一：一款设定在 Hinterberg 的 cozy 动作 RPG，这是一个虚构的奥地利山区小镇，阿尔卑斯山各地最近出现了魔法地下城。这些地下城现在成了旅游景点——人们从世界各地来挑战它们作为休闲活动，住在旅馆里，在当地餐馆吃饭，晚上社交。你扮演路易莎，一位精疲力竭的年轻律师，在 Hinterberg 度假，通过探索地下城来清醒头脑。每个地下城都有一个围绕魔法（火、冰、风等）构建的独特解谜机制，随着你的进展你解锁新能力。白天你探索地下城；晚上你与镇民和其他冒险者交往，建立影响故事的关系。这款游戏有一个大约 25-40 小时的完整叙事弧线，做出了不寻常的选择，使 cozy 社交模拟和动作战斗感觉真正互补而不是别扭。可在 Xbox Game Pass 上获取。',
    tip_en: "Invest in relationship-building during every evening phase — several story revelations and quality-of-life unlocks are locked behind friendship levels with specific townspeople.",
    tip_zh: '在每个夜晚阶段投入关系建立——几个故事揭示和生活质量解锁依赖于与特定镇民的友谊等级。',
  },
}

function calcResult(answers: Pick[]): Pick {
  const counts: Record<Pick, number> = {
    'botany-manor': 0,
    'rustys-retirement': 0,
    'fields-of-mistria': 0,
    'dungeons-of-hinterberg': 0,
  }
  for (const a of answers) counts[a]++
  return Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0] as Pick
}

export function CozyNew2024Quiz({ locale }: { locale: string }) {
  const isZh = locale === 'zh'
  const [answers, setAnswers] = useState<(Pick | null)[]>(Array(QUESTIONS.length).fill(null))
  const [submitted, setSubmitted] = useState(false)

  const allAnswered = answers.every((a) => a !== null)

  if (submitted) {
    const result = RESULTS[calcResult(answers as Pick[])]
    const url = `${BASE_URL}/${locale}/quizzes/cozy-new-2024`
    const shareText = isZh
      ? `我的 2024 新 Cozy 游戏推荐是「${result.title_zh}」！${result.tag_zh}。找到你的：${url}`
      : `My 2024 cozy game match is ${result.title_en} — ${result.tag_en}. Find yours: ${url}`

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
              {isZh ? '上手小贴士：' : 'Getting started: '}
            </span>
            {isZh ? result.tip_zh : result.tip_en}
          </p>
        </div>

        <div className="mb-4 rounded-xl border border-[#2d3d2d] bg-[#0f1a0f] p-4">
          <p className="text-center text-sm text-[#8a9a7a]">
            {isZh
              ? 'TendFarm 正在研发农场节律追踪功能——把各种游戏里的专注节奏带入真实日常。'
              : 'TendFarm is building a farm rhythm tracker — bringing the focused rhythms of games into real daily life.'}
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
            ? '2024 年哪款新 Cozy 游戏最适合你？'
            : 'Which New 2024 Cozy Game Is Right for You?'}
        </h1>
        <p className="text-sm text-[#8a9a7a]">
          {isZh
            ? '6 个问题，在植物庄园、Rusty 的退休生活、Mistria 的田野和 Hinterberg 的地下城中找到你的 2024 年度 Cozy 游戏'
            : '6 questions to match you with your 2024 cozy pick — Botany Manor, Rusty\'s Retirement, Fields of Mistria, or Dungeons of Hinterberg'}
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
        {isZh ? '找到我的 2024 Cozy 游戏' : 'Find My 2024 Cozy Game'}
      </button>
    </div>
  )
}
