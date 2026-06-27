'use client'

import { useState } from 'react'
import { BASE_URL } from '@/lib/config'

type Pick = 'pure-vanilla' | 'stardew-expanded' | 'visual-mods' | 'full-modded'

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
    q_en: 'Where are you in your Stardew Valley journey right now?',
    q_zh: '你目前在星露谷物语旅程的哪个阶段？',
    options: [
      { en: "I haven't finished year 2 or the Community Center yet", zh: '我还没完成第二年或社区中心', type: 'pure-vanilla' },
      { en: 'I finished the main game and want more of the same feeling', zh: '我完成了主游戏，想要更多相同的感觉', type: 'stardew-expanded' },
      { en: "I've played many hours but the graphics feel dated to me now", zh: '我玩了很多小时，但现在图形感觉过时了', type: 'visual-mods' },
      { en: 'I have 200+ hours and have done everything multiple times', zh: '我有 200+ 小时并多次完成了所有内容', type: 'full-modded' },
    ],
  },
  {
    q_en: "What's your main reason for thinking about Stardew Valley mods?",
    q_zh: '你考虑星露谷物语模组的主要原因是什么？',
    options: [
      { en: "I'm curious but not sure I actually need them yet", zh: '我很好奇，但不确定我是否真的还需要它们', type: 'pure-vanilla' },
      { en: 'I want more content — new maps, characters, events, story', zh: '我想要更多内容——新地图、角色、事件、故事', type: 'stardew-expanded' },
      { en: "I want the game to look better without changing how it plays", zh: '我想让游戏看起来更好，但不改变玩法', type: 'visual-mods' },
      { en: 'I want to completely transform the game into something new', zh: '我想把游戏完全改造成全新的东西', type: 'full-modded' },
    ],
  },
  {
    q_en: 'How do you feel about installing mods that require extra tools (like SMAPI)?',
    q_zh: '你如何看待安装需要额外工具（如 SMAPI）的模组？',
    options: [
      { en: "I'd rather not deal with that complexity — just the game please", zh: '我宁愿不处理那种复杂性——只要游戏本身就好', type: 'pure-vanilla' },
      { en: "I can follow a guide — I'll do it for content I really want", zh: '我可以跟着教程来——为了我真正想要的内容值得', type: 'stardew-expanded' },
      { en: "I'd prefer mods that don't require much technical setup", zh: '我更喜欢不需要太多技术设置的模组', type: 'visual-mods' },
      { en: "I enjoy the mod installation process — I find it satisfying to customize", zh: '我喜欢模组安装过程——我觉得自定义本身很令人满足', type: 'full-modded' },
    ],
  },
  {
    q_en: 'Which of these would bother you most about a heavily modded game?',
    q_zh: '关于重度模组化游戏，以下哪点最让你烦恼？',
    options: [
      { en: 'The original experience being altered — I love vanilla Stardew', zh: '原版体验被改变——我热爱原版星露谷', type: 'pure-vanilla' },
      { en: 'Game crashes or incompatibility between mods', zh: '游戏崩溃或模组之间的不兼容', type: 'stardew-expanded' },
      { en: 'Gameplay being changed when I only wanted visual improvements', zh: '当我只想要视觉改进时游戏玩法被改变', type: 'visual-mods' },
      { en: 'Nothing really — mod instability is a reasonable tradeoff for me', zh: '没什么——对我来说模组不稳定性是合理的权衡', type: 'full-modded' },
    ],
  },
  {
    q_en: "What would your ideal next Stardew Valley playthrough feel like?",
    q_zh: '你理想中的下一次星露谷物语游玩体验是什么感觉？',
    options: [
      { en: 'The same wonderful game I already love — just on a new farm', zh: '我已经喜爱的同样精彩的游戏——只是在一个新农场', type: 'pure-vanilla' },
      { en: 'A substantially larger world — more to explore, more characters, more events', zh: '一个更大得多的世界——更多探索、更多角色、更多事件', type: 'stardew-expanded' },
      { en: "The same gameplay but everything looks crisper and more beautiful", zh: '相同的玩法，但一切看起来更清晰、更美丽', type: 'visual-mods' },
      { en: 'Completely different — new mechanics, new content, new challenge', zh: '完全不同——新机制、新内容、新挑战', type: 'full-modded' },
    ],
  },
  {
    q_en: 'How do you feel about playing a version of Stardew Valley that other players might not recognize?',
    q_zh: '你对玩一个其他玩家可能不认识的星露谷物语版本有什么感觉？',
    options: [
      { en: 'I prefer we all play the same version — shared experience matters', zh: '我更喜欢我们都玩同一个版本——共同体验很重要', type: 'pure-vanilla' },
      { en: "Fine if it's a popular mod — most Stardew veterans know Expanded", zh: '如果是热门模组就没问题——大多数星露谷老手都知道 Expanded', type: 'stardew-expanded' },
      { en: "My visual mods won't change the gameplay so it still feels like Stardew", zh: '我的视觉模组不会改变游戏玩法，所以感觉仍然像星露谷', type: 'visual-mods' },
      { en: "Doesn't matter to me — my experience is my own", zh: '对我来说无所谓——我的体验是我自己的', type: 'full-modded' },
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
    body_en: string
    body_zh: string
    mods_en: string[]
    mods_zh: string[]
  }
> = {
  'pure-vanilla': {
    title_en: 'Stay in Pure Vanilla — You Are Not Done Yet',
    title_zh: '留在原版——你还没玩完',
    emoji: '🌱',
    tag_en: "The original Stardew Valley is still a complete, perfect game",
    tag_zh: '原版星露谷物语仍然是一款完整、完美的游戏',
    body_en:
      "Your result is clear: you do not need mods yet. Stardew Valley vanilla is one of the most complete gaming experiences ever made — over 400 hours of content before most players feel they have truly done everything. The Community Center, every villager's heart events, the Junimo Kart achievement, the perfection 100% score, grandpa's re-evaluation, and all the secret notes are genuinely enormous amounts of content. If you have not done all of that, mods will actually dilute the experience. ConcernedApe (the single developer) designed every element of the vanilla game as an intentional whole — play it through once, completely, before adding anything else. You can always add mods later.",
    body_zh:
      '你的结果很清楚：你还不需要模组。星露谷物语原版是有史以来最完整的游戏体验之一——超过 400 小时的内容，大多数玩家才感觉真正完成了一切。社区中心、每位村民的心事件、Junimo 推车成就、100% 完美评分、祖父重新评估，以及所有秘密便条都是真正庞大的内容量。如果你还没做完这些，模组实际上会稀释体验。ConcernedApe（单独的开发者）将原版游戏的每个元素设计成一个有意识的整体——在添加任何东西之前，先完整地玩一遍。你以后总可以添加模组。',
    mods_en: [
      'When you are ready: start with CJB Cheats Menu (quality of life, not content-changing)',
      'Seasonal decorations via Seasonal Immersion mod for subtle visual variety',
      "Hold off on Stardew Valley Expanded until you've truly finished vanilla — it's better as a second playthrough",
    ],
    mods_zh: [
      '当你准备好时：从 CJB Cheats Menu 开始（生活质量，不改变内容）',
      '通过 Seasonal Immersion 模组进行季节装饰，带来微妙的视觉变化',
      '在你真正完成原版之前先不要用星露谷物语 Expanded——作为第二次游玩更好',
    ],
  },
  'stardew-expanded': {
    title_en: 'Stardew Valley Expanded — The Definitive Second Playthrough',
    title_zh: '星露谷物语 Expanded——终极第二轮游玩',
    emoji: '🗺️',
    tag_en: 'The most downloaded Stardew mod ever — adds 40+ hours of official-feeling content',
    tag_zh: '有史以来下载量最多的星露谷模组——增加 40+ 小时原版感觉的内容',
    body_en:
      "Stardew Valley Expanded (SVE) is exactly right for you — it is the most downloaded Stardew Valley mod ever made and the gold standard for post-vanilla content. SVE adds two new maps (Grandpa's Farm and the Forest Farm renovation), 27 new characters with full dialogue and heart events, a new town with shops, entirely new areas to explore, new fish, crops, artisan goods, seasonal events, and a substantial story. The content is so well-integrated that many players describe it as 'the version ConcernedApe would have made if the team was larger.' You need SMAPI (the Stardew modding API) to install it — installation takes about 20-30 minutes following the Nexus Mods guide, and it runs stably on all platforms. Start a fresh save when installing SVE for the best experience.",
    body_zh:
      '星露谷物语 Expanded（SVE）对你来说正好——它是有史以来下载量最多的星露谷物语模组，也是原版后内容的黄金标准。SVE 增加了两个新地图（祖父的农场和森林农场翻新）、27 个有完整对话和心事件的新角色、一个有商店的新小镇、全新的探索区域、新鱼、新作物、手工艺品、季节性活动，以及大量故事内容。内容整合得如此完善，以至于许多玩家将其描述为"如果 ConcernedApe 团队更大会制作的版本"。你需要 SMAPI（星露谷物语模组 API）来安装它——按照 Nexus Mods 指南安装大约需要 20-30 分钟，在所有平台上都能稳定运行。安装 SVE 时从新存档开始以获得最佳体验。',
    mods_en: [
      'Required: SMAPI from smapi.io — the mod loader that makes everything work',
      'Get SVE from NexusMods.com — read the compatibility notes for the current version',
      'Pair with: Ridgeside Village (adds another new area), East Scarp (another new map) — all three together are the most popular SVE-adjacent mods',
    ],
    mods_zh: [
      '必需：来自 smapi.io 的 SMAPI——让一切正常运行的模组加载器',
      '从 NexusMods.com 获取 SVE——阅读当前版本的兼容性说明',
      '搭配：Ridgeside Village（增加另一个新区域）、East Scarp（另一个新地图）——三者合用是最流行的 SVE 相关模组组合',
    ],
  },
  'visual-mods': {
    title_en: 'Visual / Cosmetic Mods — Fresh Look, Same Soul',
    title_zh: '视觉 / 外观模组——焕然一新，原味不变',
    emoji: '🎨',
    tag_en: 'Upgrade the aesthetics without touching the gameplay',
    tag_zh: '升级美观度，不碰游戏玩法',
    body_en:
      "Visual and cosmetic mods are the perfect fit for you — they transform how Stardew Valley looks without touching the systems you already love. The most popular visual mods include: Vintage Interface 2 (replaces the UI with a more polished, vintage-inspired look), Elle's New Chickens/Cows (higher-resolution farm animals), Lumisteria's Tilesheets (much higher quality terrain textures), DaisyNiko's Earthy Recolour (a soft, natural color palette that makes the whole world feel more grounded), and Seasonal Immersion (adds seasonal variation to the world tiles so each season has more visual variety). Most visual mods do NOT require SMAPI — they are simple texture replacements you drop into the game's content folder. Installation is as simple as unzipping a file.",
    body_zh:
      '视觉和外观模组对你来说非常合适——它们改变了星露谷物语的外观，而不影响你已经喜爱的系统。最受欢迎的视觉模组包括：Vintage Interface 2（用更精致、受复古风格启发的外观替换 UI）、Elle 的新鸡/牛（更高分辨率的农场动物）、Lumisteria 的瓷砖（质量更高的地形纹理）、DaisyNiko 的大地色系重绘（柔和的自然色调，让整个世界感觉更踏实），以及 Seasonal Immersion（为世界瓷砖增加季节变化，使每个季节有更多视觉变化）。大多数视觉模组不需要 SMAPI——它们是简单的纹理替换，你只需放入游戏的内容文件夹。安装就像解压文件一样简单。',
    mods_en: [
      "Start with DaisyNiko's Earthy Recolour — it's the most universally loved visual overhaul and needs no SMAPI",
      "Add Elle's New Animals for higher-res farm animals — also no SMAPI required",
      'Search NexusMods for "Stardew Valley" + "no SMAPI" to find all texture mods that work without extra tools',
    ],
    mods_zh: [
      "从 DaisyNiko 的大地色系重绘开始——它是最被广泛喜爱的视觉改造，不需要 SMAPI",
      "添加 Elle 的新动物以获得更高分辨率的农场动物——也不需要 SMAPI",
      '在 NexusMods 上搜索"Stardew Valley" + "no SMAPI"，找到所有无需额外工具的纹理模组',
    ],
  },
  'full-modded': {
    title_en: 'Full Mod Stack — Build Your Custom Stardew',
    title_zh: '完整模组栈——打造你的定制版星露谷',
    emoji: '🔧',
    tag_en: 'You are ready for SVE + Ridgeside + East Scarp + content mods — the full experience',
    tag_zh: '你已准备好迎接 SVE + Ridgeside + East Scarp + 内容模组——完整体验',
    body_en:
      "You are ready for the full modded Stardew Valley experience — the so-called 'expanded universe' that veteran players build over multiple playthroughs. The core stack most players recommend: Stardew Valley Expanded (the essential base), Ridgeside Village (adds the Ridgeside area and 12+ new characters), East Scarp (adds another area with lore connection to SVE), More New Fish (adds 100+ new fish species), Stardew Aquarium (upgrades the Fish Tank bundle), and a Content Patcher pack of your choice for visual updates. For challenge, add Challenging Community Center Bundles or SVE's harder mine floors. Install everything through the SMAPI framework using Nexus Mods, and use the Mod Manager for compatibility checking. Budget 1-2 hours for initial setup; the payoff is a game that can absorb another 200+ hours.",
    body_zh:
      '你已准备好完整的模组化星露谷物语体验——老玩家在多次游玩中建立的所谓"扩展宇宙"。大多数玩家推荐的核心组合：星露谷物语 Expanded（必备基础）、Ridgeside Village（增加 Ridgeside 区域和 12+ 新角色）、East Scarp（增加另一个与 SVE 有剧情联系的区域）、More New Fish（增加 100+ 新鱼种）、Stardew Aquarium（升级水族箱捆绑包），以及你选择的 Content Patcher 视觉更新包。如需增加挑战，添加 Challenging Community Center Bundles 或 SVE 的更难矿洞层。通过 Nexus Mods 使用 SMAPI 框架安装所有内容，并使用模组管理器检查兼容性。初始设置预计需要 1-2 小时；回报是一款可以再吸收 200+ 小时的游戏。',
    mods_en: [
      "Start with smapi.io — install SMAPI first, then add mods one by one, testing after each",
      "Use Nexus Mods with the 'Vortex' mod manager to handle compatibility and load order automatically",
      'Keep a backup of your save files before major mod installations — the mod community is excellent but saves can occasionally corrupt',
    ],
    mods_zh: [
      '从 smapi.io 开始——先安装 SMAPI，然后逐一添加模组，每次添加后进行测试',
      '使用带 Vortex 模组管理器的 Nexus Mods 自动处理兼容性和加载顺序',
      '在主要模组安装前备份你的存档文件——模组社区非常出色，但存档偶尔可能损坏',
    ],
  },
}

function calcResult(answers: Pick[]): Pick {
  const counts: Record<Pick, number> = {
    'pure-vanilla': 0,
    'stardew-expanded': 0,
    'visual-mods': 0,
    'full-modded': 0,
  }
  for (const a of answers) counts[a]++
  return Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0] as Pick
}

export function StardewModsQuiz({ locale }: { locale: string }) {
  const isZh = locale === 'zh'
  const [answers, setAnswers] = useState<(Pick | null)[]>(Array(QUESTIONS.length).fill(null))
  const [submitted, setSubmitted] = useState(false)

  const allAnswered = answers.every((a) => a !== null)

  if (submitted) {
    const result = RESULTS[calcResult(answers as Pick[])]
    const url = `${BASE_URL}/${locale}/quizzes/stardew-mods-quiz`
    const shareText = isZh
      ? `对于星露谷物语模组，我的建议是「${result.title_zh}」！找到你的：${url}`
      : `My Stardew Valley mod recommendation: ${result.title_en}! Find yours: ${url}`

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
          {isZh ? result.body_zh : result.body_en}
        </p>

        <div className="mb-5 rounded-xl border border-[#2d3d2d] bg-[#0f1a0f] p-4">
          <h3 className="mb-3 text-sm font-semibold text-[#e8dcc8]">
            {isZh ? '具体建议' : 'Your action items'}
          </h3>
          <ul className="space-y-2">
            {(isZh ? result.mods_zh : result.mods_en).map((tip, i) => (
              <li key={i} className="flex gap-2 text-sm text-[#8a9a7a]">
                <span className="shrink-0 text-[#f0a832]">{i + 1}.</span>
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mb-4 rounded-xl border border-[#2d3d2d] bg-[#0f1a0f] p-4">
          <p className="text-center text-sm text-[#8a9a7a]">
            {isZh
              ? 'TendFarm 正在研发农场节律追踪功能——把游戏里对土地的专注带入真实日常。'
              : 'TendFarm is building a farm rhythm tracker that brings the intentional pacing of farming games into real life.'}
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
            ? '你应该给星露谷物语装模组吗？装哪些？'
            : 'Should You Play Stardew Valley with Mods? Which Ones?'}
        </h1>
        <p className="text-sm text-[#8a9a7a]">
          {isZh
            ? '6 个问题，根据你的游玩进度和需求，找到正确的模组策略——从原版到完整模组栈'
            : '6 questions to find the right mod approach for where you are — from pure vanilla to full mod stack'}
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
        {isZh ? '找到我的模组策略' : 'Find My Mod Strategy'}
      </button>
    </div>
  )
}
