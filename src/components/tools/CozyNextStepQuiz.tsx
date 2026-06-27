'use client'

import { useState } from 'react'
import { BASE_URL } from '@/lib/config'

type Pick = 'ooblets' | 'fae-farm' | 'roots-of-pacha' | 'potion-permit'

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
    q_en: 'What did you love most about Stardew Valley or Animal Crossing?',
    q_zh: '你最喜欢星露谷物语或动物之森的哪个方面？',
    options: [
      { en: 'The creature-collecting and the way NPCs had their own distinct personalities and quirks', zh: '生物收集，以及 NPC 拥有各自独特个性和怪癖的方式', type: 'ooblets' },
      { en: 'The crafting loop and the way a new area slowly became a home I could decorate', zh: '制作循环，以及一个新区域慢慢变成我可以装饰的家的过程', type: 'fae-farm' },
      { en: 'The community building — growing relationships with villagers and watching the town come alive', zh: '社区建设——与村民发展关系，看着小镇焕发生机', type: 'roots-of-pacha' },
      { en: 'The daily routine — checking in with everyone, doing small helpful tasks, feeling known and needed', zh: '日常惯例——与大家签到，做些小小的帮助性任务，感觉被了解和被需要', type: 'potion-permit' },
    ],
  },
  {
    q_en: 'What element do you most want to try that Stardew and Animal Crossing did not have?',
    q_zh: '你最想尝试星露谷和动物之森没有的哪个元素？',
    options: [
      { en: 'Creature-collecting and battling with a completely unique twist — like Pokémon but cozy and weird', zh: '生物收集和对战，有完全独特的转折——像宝可梦但是 cozy 又奇异', type: 'ooblets' },
      { en: 'More magic — spells, enchanted tools, actual fantasy elements in the farming world', zh: '更多魔法——咒语、魔法工具、农耕世界中的真正奇幻元素', type: 'fae-farm' },
      { en: 'A completely different historical setting — not modern or contemporary, but something ancient', zh: '完全不同的历史设定——不是现代或当代，而是某种古老的东西', type: 'roots-of-pacha' },
      { en: 'A different role — not a farmer but still part of a small community, with a different daily purpose', zh: '不同的角色——不是农夫，但仍然是小社区的一部分，有着不同的日常目的', type: 'potion-permit' },
    ],
  },
  {
    q_en: 'How important is multiplayer or co-op to your next game?',
    q_zh: '多人游戏或合作对你的下一款游戏有多重要？',
    options: [
      { en: 'Not very — I love single-player cozy experiences and want to explore a weird world solo', zh: '不太重要——我喜欢单人 cozy 体验，想独自探索一个奇异的世界', type: 'ooblets' },
      { en: 'Very important — I want co-op that works smoothly for playing with a partner or friend', zh: '非常重要——我想要能顺畅地与伴侣或朋友一起玩的合作模式', type: 'fae-farm' },
      { en: 'Somewhat — multiplayer is a nice bonus but not required; the community feel within the game is enough', zh: '有些重要——多人游戏是个不错的加分项，但不是必须的；游戏内的社区感已经足够', type: 'roots-of-pacha' },
      { en: 'Not at all — I want a slow, solo, story-rich experience where I am the center of the town', zh: '完全不重要——我想要一个缓慢的、单人的、故事丰富的体验，我是小镇的中心', type: 'potion-permit' },
    ],
  },
  {
    q_en: 'Which of these sounds most fun to you?',
    q_zh: '以下哪个对你来说最有趣？',
    options: [
      { en: 'Dancing off against a neighbor to win a crop dispute — losing is fine, it\'s still adorable', zh: '与邻居跳舞对决来赢得一场作物纠纷——输了也没关系，这仍然很可爱', type: 'ooblets' },
      { en: 'Learning new magic spells to water crops instantly, fight cave monsters, and enchant furniture', zh: '学习新魔法咒语来立即浇水、对抗洞穴怪物和附魔家具', type: 'fae-farm' },
      { en: 'Painting my discoveries on the community cave wall using Stone Age pigments and symbols', zh: '用石器时代的颜料和符号把我的发现画在社区洞穴壁上', type: 'roots-of-pacha' },
      { en: 'Diagnosing a villager\'s illness, gathering herbs from the forest, and brewing a remedy at night', zh: '诊断村民的疾病，从森林中采集草药，在夜晚酿制药方', type: 'potion-permit' },
    ],
  },
  {
    q_en: 'What kind of aesthetic do you want your next cozy game to have?',
    q_zh: '你希望你的下一款 cozy 游戏有什么样的美学风格？',
    options: [
      { en: 'Bright and deliberately weird — pastel colors, dancing vegetables, a world that does not take itself seriously', zh: '明亮且刻意奇异——粉彩色调、跳舞的蔬菜、一个不把自己当回事的世界', type: 'ooblets' },
      { en: 'Fantasy-soft — glowing mushrooms, fairy lights, magical forest paths, warm purple and teal', zh: '柔和奇幻——发光的蘑菇、仙女灯、魔法森林小径、温暖的紫色和青色', type: 'fae-farm' },
      { en: 'Earthy and ancient — cave paintings, bone tools, natural dyes, the warmth of a fire in a primitive setting', zh: '质朴而古老——洞穴壁画、骨制工具、天然染料、原始环境中篝火的温暖', type: 'roots-of-pacha' },
      { en: 'Pixel-art small-town — a charming coastal village with a lighthouse, warm color palette, every resident memorable', zh: '像素艺术小镇——有灯塔的迷人沿海村庄，温暖色调，每个居民都令人难忘', type: 'potion-permit' },
    ],
  },
  {
    q_en: 'What would make you excited to log back in the next day?',
    q_zh: '什么会让你兴奋地第二天再次登录？',
    options: [
      { en: 'My Ooblets evolved overnight — I want to see their new forms and plan which to use in the next dance-off', zh: '我的 Ooblets 一夜之间进化了——我想看到它们的新形态，并计划下次舞蹈对决用哪个', type: 'ooblets' },
      { en: 'My friend and I left a chest half-organized — I want to finish decorating our farmhouse together', zh: '我和朋友把宝箱整理到一半——我想和他们一起完成农舍的装饰', type: 'fae-farm' },
      { en: 'There was a festival announced yesterday — I want to see how the whole village comes together for it', zh: '昨天有个节日宣布了——我想看看整个村庄怎么为此聚在一起', type: 'roots-of-pacha' },
      { en: 'A new patient was mentioned at the clinic door — I want to discover what is wrong and how to help', zh: '诊所门口提到了一位新病人——我想弄清楚出了什么问题，以及如何提供帮助', type: 'potion-permit' },
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
  ooblets: {
    title_en: 'Ooblets',
    title_zh: 'Ooblets',
    emoji: '🌻',
    tag_en: 'A farming + creature-collecting game where battles are settled by increasingly chaotic dance-offs',
    tag_zh: '农耕 + 生物收集游戏，用越来越混乱的舞蹈对决来解决争端',
    platform_en: 'Available on: PC (Steam), Nintendo Switch, Xbox (Game Pass) — about $25',
    platform_zh: '可在以下平台获取：PC（Steam）、Nintendo Switch、Xbox（Game Pass）——约 25 美元',
    why_en:
      "Ooblets (released in full in 2022 after Epic Early Access) is one of the most unique cozy games ever made — and also one of the most deliberately strange. You move to a small town called Badgetown, grow crops and cook food, and collect small creatures called Ooblets by challenging them to dance battles. The Ooblets you win follow you around, help on your farm, and can be entered into dance competitions. The humor is dry and self-aware — NPCs make meta jokes, quests have absurdist logic, and the game never plays it straight. The visual style is bright pastel-colored and deliberately toy-like. If you loved Animal Crossing's creature-collecting aspect and want something that extends that into farming and competition, Ooblets is the most inventive answer. Available on Xbox Game Pass. The developers are the same duo who create the Griftlands card game, and the wit carries over.",
    why_zh:
      'Ooblets（2022 年完整发布，此前在 Epic 抢先体验）是有史以来最独特的 cozy 游戏之一——也是最刻意奇异的之一。你搬到一个叫做 Badgetown 的小镇，种植作物和烹饪食物，通过挑战小生物（Ooblets）进行舞蹈对决来收集它们。你赢得的 Ooblets 会跟着你四处走，帮助农场工作，并可以参加舞蹈比赛。幽默是干燥且自我意识的——NPC 发表元笑话，任务有荒诞逻辑，游戏从不正经对待自己。视觉风格是明亮的粉彩色调，刻意像玩具一样。如果你喜欢动物之森的生物收集方面，并想要将其延伸到农耕和竞争中的东西，Ooblets 是最具创意的答案。可在 Xbox Game Pass 上获取。开发者是创作 Griftlands 卡牌游戏的同一个二人组，机智感贯穿其中。',
    tip_en: "Prioritize collecting Ooblets with farming-related abilities early — some can water crops, harvest automatically, or discover seeds, which dramatically speeds up the early game.",
    tip_zh: '优先早期收集具有农耕相关能力的 Ooblets——一些能浇水、自动收割或发现种子，这会大幅加速早期游戏进程。',
  },
  'fae-farm': {
    title_en: 'Fae Farm',
    title_zh: '精灵农场',
    emoji: '🧚',
    tag_en: 'A magical co-op farming sim with spells, fairies, and the smoothest multiplayer in the genre',
    tag_zh: '拥有魔法、精灵和该类型最流畅多人游戏的魔法合作农场模拟',
    platform_en: 'Available on: Nintendo Switch, PC (Steam, Epic) — about $40 (often on sale for ~$20-25)',
    platform_zh: '可在以下平台获取：Nintendo Switch、PC（Steam、Epic）——约 40 美元（常特价约 20-25 美元）',
    why_en:
      "Fae Farm (2023) positions itself directly as a co-op Stardew alternative and succeeds on that front: up to 4 players can farm, mine, fish, and explore together in shared progress, which is notably rare in the genre. The twist over Stardew is the magic system — you unlock spells that allow you to instantly water large areas, create floating platforms for puzzle-solving, and enchant your equipment. The world is divided into several distinct biomes with different magical creatures and design styles. The visual aesthetic is soft fantasy with glowing elements and warm lighting. Reviewers consistently note that the co-op implementation is seamless in a way that many other games in the genre fail to deliver. For couples or friends who played Stardew together but wanted more magic and smoother multiplayer, Fae Farm is the best recommendation. Check for sales — it frequently drops to $20-25.",
    why_zh:
      '精灵农场（2023 年）将自己定位为合作版星露谷替代品，并在这方面取得了成功：最多 4 名玩家可以在共享进度中一起农耕、挖矿、钓鱼和探索，这在该类型中尤为罕见。相比星露谷的创新点是魔法系统——你解锁咒语，让你可以立即浇灌大片区域、为解谜创建漂浮平台，以及附魔你的装备。世界分为几个不同的生物群落，有不同的魔法生物和设计风格。视觉美学是柔和奇幻风格，有发光元素和温暖照明。评论者一致指出，合作实现的无缝程度是许多该类型其他游戏未能做到的。对于想要更多魔法和更流畅多人游戏的情侣或朋友，精灵农场是最好的推荐。留意特卖——它经常降至 20-25 美元。',
    tip_en: "Invest your early Florins in upgrading your watering can and unlocking the area-effect water spell as soon as possible — it transforms the farming loop from time-consuming to effortless.",
    tip_zh: '尽早将你早期的 Florin 投入升级你的浇水壶并解锁范围效果浇水咒语——它将农耕循环从耗时变为轻松。',
  },
  'roots-of-pacha': {
    title_en: 'Roots of Pacha',
    title_zh: '帕恰之根',
    emoji: '🦴',
    tag_en: 'A Stone Age cozy farming sim — the only one of its kind, and surprisingly heartwarming',
    tag_zh: '石器时代 cozy 农场模拟——同类中唯一一款，出人意料地温馨感人',
    platform_en: 'Available on: PC (Steam, GOG, Epic), Nintendo Switch, PlayStation 4/5, Xbox — about $30',
    platform_zh: '可在以下平台获取：PC（Steam、GOG、Epic）、Nintendo Switch、PlayStation 4/5、Xbox——约 30 美元',
    why_en:
      "Roots of Pacha (2023) is the most original setting in the cozy farming genre: you are a member of a prehistoric clan learning to farm, fish, and forge relationships at the dawn of civilization. The core mechanics are familiar (farm plots, relationship hearts, seasonal crops, a shared community center equivalent), but everything is filtered through a Stone Age lens: tools are made of bone and stone, crops are being domesticated for the first time, discoveries feel genuinely significant, and the visual style uses cave-painting aesthetics for maps and records. The community-building aspect is exceptionally strong — as you befriend clanmates, they teach new skills or unlock new abilities in a way that feels like collective discovery rather than individual progression. Multiplayer is available. One of the most distinctive takes on the farming sim genre in recent years, often overlooked in favor of more obviously marketed games.",
    why_zh:
      '帕恰之根（2023 年）是 cozy 农场类型中最具原创性的设定：你是一个史前部落的成员，在文明曙光时学习农耕、钓鱼和建立关系。核心机制很熟悉（农场地块、关系之心、季节性作物、共享社区中心等价物），但一切都通过石器时代的视角过滤：工具由骨头和石头制成，作物第一次被驯化，发现感觉真正重要，视觉风格使用洞穴画美学作为地图和记录。社区建设方面异常强大——当你与部落成员交朋友时，他们会以集体发现而非个人进步的感觉教授新技能或解锁新能力。多人游戏可用。近年来农场模拟类型中最具特色的演绎之一，经常被更明显营销的游戏所掩盖。',
    tip_en: "Talk to every clanmate every day even if their dialogue seems repetitive — the discovery triggers that unlock new technologies are tied to friendship levels, not story events.",
    tip_zh: '即使他们的对话似乎重复，也要每天与每个部落成员交谈——解锁新技术的发现触发器与友谊等级相关，而不是故事事件。',
  },
  'potion-permit': {
    title_en: 'Potion Permit',
    title_zh: '药水许可证',
    emoji: '⚗️',
    tag_en: 'A cozy life sim where you play as a doctor in a small coastal town — healing villagers, earning trust',
    tag_zh: '一款 cozy 生活模拟游戏，你扮演小沿海小镇的医生——治愈村民，赢得信任',
    platform_en: 'Available on: PC (Steam), Nintendo Switch, PlayStation 4/5, Xbox — about $20',
    platform_zh: '可在以下平台获取：PC（Steam）、Nintendo Switch、PlayStation 4/5、Xbox——约 20 美元',
    why_en:
      "Potion Permit (2022) occupies a unique niche in the cozy genre: you are a chemist-doctor sent from the capital city to a conservative small coastal town called Moonbury that distrusts outsiders. Your job is to earn the town's trust by treating their illnesses — gathering ingredients from the surrounding wilderness, diagnosing patients through a simple symptom-matching minigame, and brewing the right potions. As you gain trust, the town opens up: new areas unlock, NPCs share their backstories, and the community gradually warms to you. The relationship-building has real depth, and the plot has more drama than most cozy games (there is an actual mystery about why Moonbury rejected modern medicine). At about 15-25 hours, it is one of the most content-rich cozy games in its price range. The pixel art is charming, the coastal setting is beautiful, and the daily loop is satisfying without being demanding.",
    why_zh:
      '药水许可证（2022 年）在 cozy 类型中占据独特的细分市场：你是一位从首都城市被派往一个不信任外来者的保守小沿海小镇 Moonbury 的化学家-医生。你的工作是通过治疗他们的疾病来赢得小镇的信任——从周围的荒野采集食材，通过简单的症状匹配小游戏诊断患者，并调制正确的药水。随着你获得信任，小镇逐渐开放：新区域解锁，NPC 分享他们的背景故事，社区逐渐对你热情起来。关系建设有真正的深度，情节比大多数 cozy 游戏有更多戏剧性（有一个关于为什么 Moonbury 拒绝现代医学的真实谜题）。大约 15-25 小时，是其价位中内容最丰富的 cozy 游戏之一。像素艺术迷人，海岸设定美丽，日常循环令人满足而不要求苛刻。',
    tip_en: "Upgrade your gathering tools as soon as materials allow — the movement speed and tool efficiency upgrades have a bigger quality-of-life impact here than in most farming games because you gather from the wilderness, not a static farm plot.",
    tip_zh: '一旦材料允许就升级你的采集工具——移动速度和工具效率升级对生活质量的影响比大多数农场游戏更大，因为你从荒野而不是静态农场地块采集。',
  },
}

function calcResult(answers: Pick[]): Pick {
  const counts: Record<Pick, number> = {
    ooblets: 0,
    'fae-farm': 0,
    'roots-of-pacha': 0,
    'potion-permit': 0,
  }
  for (const a of answers) counts[a]++
  return Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0] as Pick
}

export function CozyNextStepQuiz({ locale }: { locale: string }) {
  const isZh = locale === 'zh'
  const [answers, setAnswers] = useState<(Pick | null)[]>(Array(QUESTIONS.length).fill(null))
  const [submitted, setSubmitted] = useState(false)

  const allAnswered = answers.every((a) => a !== null)

  if (submitted) {
    const result = RESULTS[calcResult(answers as Pick[])]
    const url = `${BASE_URL}/${locale}/quizzes/cozy-next-step`
    const shareText = isZh
      ? `玩完星露谷，我的下一步是「${result.title_zh}」！${result.tag_zh}。找到你的：${url}`
      : `After Stardew Valley, my next cozy game is ${result.title_en} — ${result.tag_en}. Find yours: ${url}`

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
            ? '玩完星露谷和动物之森，你该玩什么？'
            : 'What to Play After Stardew Valley and Animal Crossing?'}
        </h1>
        <p className="text-sm text-[#8a9a7a]">
          {isZh
            ? '6 个问题，在 Ooblets、精灵农场、帕恰之根和药水许可证中找到你的下一款 Cozy 游戏——每款都有星露谷没有的独特特色'
            : '6 questions to find your next cozy game — Ooblets, Fae Farm, Roots of Pacha, or Potion Permit. Each brings something Stardew and ACNH never had.'}
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
        {isZh ? '找到我的下一步' : 'Find My Next Game'}
      </button>
    </div>
  )
}
