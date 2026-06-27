'use client'

import { useState } from 'react'
import { BASE_URL } from '@/lib/config'

type Pick = 'neko-atsume' | 'webfishing' | 'goose-game' | 'little-kitty'

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
    q_en: 'What kind of relationship with the animal do you want in this game?',
    q_zh: '你想要在这款游戏中和动物建立什么样的关系？',
    options: [
      { en: 'Passive — leave out snacks, check the camera, see who visited while I was away', zh: '被动——放出零食、查看相机、看看我不在时谁来过', type: 'neko-atsume' },
      { en: 'Social — fish with other people online, talk to fish, be surrounded by gentle chaos', zh: '社交——和其他人在线钓鱼、和鱼交谈、被温和的混乱包围', type: 'webfishing' },
      { en: 'Mischievous — I want to BE the animal causing harmless trouble for unsuspecting humans', zh: '淘气——我想成为那只给毫无防备的人类制造无害麻烦的动物', type: 'goose-game' },
      { en: 'Exploratory — wander a city as a cat, discover secret rooftops, befriend strangers', zh: '探索——作为猫漫游城市、发现秘密屋顶、结交陌生人', type: 'little-kitty' },
    ],
  },
  {
    q_en: 'How active do you want to be during a gaming session?',
    q_zh: '你在游戏过程中想有多活跃？',
    options: [
      { en: 'Barely — I want to open the app for 2 minutes, feel happy about cats, and close it', zh: '几乎不——我想打开应用 2 分钟，为猫感到快乐，然后关掉它', type: 'neko-atsume' },
      { en: 'Gently — cast a line, wait, chat with friends, reel something in eventually', zh: '轻柔地——抛线、等待、和朋友聊天、最终收回什么东西', type: 'webfishing' },
      { en: 'Actively — I want to execute plans and watch them produce comedic results', zh: '积极地——我想执行计划并观察它们产生喜剧效果', type: 'goose-game' },
      { en: 'Freely — wander wherever I want with no objective pressure, find things organically', zh: '自由地——没有目标压力地随意游荡，有机地发现事物', type: 'little-kitty' },
    ],
  },
  {
    q_en: 'Do you want to play with other people or alone?',
    q_zh: '你想和其他人一起玩还是独自玩？',
    options: [
      { en: 'Alone — this is a solo ritual, like tending a garden only I know about', zh: '独自——这是一个独自的仪式，就像照料一个只有我知道的花园', type: 'neko-atsume' },
      { en: 'With others — the whole appeal is fishing alongside strangers who become friends', zh: '和他人——整个吸引力在于和陌生人一起钓鱼，他们成为朋友', type: 'webfishing' },
      { en: 'Alone but best watched by others laughing at what I am doing', zh: '独自——但最好让其他人旁观，笑看我在做什么', type: 'goose-game' },
      { en: 'Solo, but the city feels alive — NPCs react to what the cat does', zh: '独自——但城市感觉很有活力，NPC 会对猫的行为作出反应', type: 'little-kitty' },
    ],
  },
  {
    q_en: 'Which of these sounds most like your ideal gaming moment?',
    q_zh: '以下哪个听起来最像你理想的游戏时刻？',
    options: [
      { en: 'Opening the app after a long day to find a rare cat visiting for the first time', zh: '漫长的一天后打开应用，发现一只稀有猫咪首次到访', type: 'neko-atsume' },
      { en: 'Accidentally catching something extraordinary and everyone in the lobby reacts', zh: '意外钓到非凡的东西，大厅里的每个人都作出反应', type: 'webfishing' },
      { en: 'Perfectly executing a plan to steal a specific item while a human stares in disbelief', zh: '在一个人类不敢置信地盯着我的情况下，完美执行偷取特定物品的计划', type: 'goose-game' },
      { en: 'Discovering an unexpected rooftop garden that no one told me existed', zh: '发现一个没人告诉我存在的意外屋顶花园', type: 'little-kitty' },
    ],
  },
  {
    q_en: 'What platform do you mainly play on?',
    q_zh: '你主要在什么平台上玩游戏？',
    options: [
      { en: 'Mobile (iPhone or Android) — I want something for the phone, no console needed', zh: '手机（iPhone 或 Android）——我想要手机上的东西，不需要主机', type: 'neko-atsume' },
      { en: 'PC — Steam is where I play, I want a game for my computer', zh: 'PC——Steam 是我玩游戏的地方，我想要一款电脑游戏', type: 'webfishing' },
      { en: 'Nintendo Switch or PC — I want it on whatever is most convenient', zh: 'Nintendo Switch 或 PC——我想要在最方便的平台上玩', type: 'goose-game' },
      { en: 'Any platform — I play on PC, Switch, or Xbox, any of them works', zh: '任何平台——我在 PC、Switch 或 Xbox 上玩，任何一个都行', type: 'little-kitty' },
    ],
  },
  {
    q_en: 'Which best describes how animals make you feel?',
    q_zh: '以下哪个最能描述动物让你感受到的？',
    options: [
      { en: 'Peaceful — animals existing and living their lives makes me deeply content', zh: '平静——动物存在并过着自己的生活让我深感满足', type: 'neko-atsume' },
      { en: 'Joyful — being around animals (even fish) makes me feel light and connected', zh: '快乐——和动物（甚至是鱼）在一起让我感到轻盈和连接', type: 'webfishing' },
      { en: 'Entertained — animals being chaotic and unpredictable is endlessly funny', zh: '有趣——动物混乱且不可预测是无尽的笑点', type: 'goose-game' },
      { en: 'Curious — animals notice the world differently than humans and I find that fascinating', zh: '好奇——动物以不同于人类的方式注意世界，我觉得这很迷人', type: 'little-kitty' },
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
  'neko-atsume': {
    title_en: 'Neko Atsume: Kitty Collector',
    title_zh: 'Neko Atsume（猫咪后院）',
    emoji: '🐱',
    tag_en: 'The original idle cat game — leave food, come back to happiness',
    tag_zh: '原版放置猫猫游戏——放出食物，回来收获幸福',
    platform_en: 'Available on: iOS, Android — free (plus optional paid expansion)',
    platform_zh: '可在以下平台获取：iOS、Android——免费（另有可选付费扩展）',
    why_en:
      "Neko Atsume is the purest idle game ever made — and it is entirely about cats. The premise is beautifully simple: you have a small yard. You leave out food and toys. Cats come to visit while you are not playing. You check in periodically to photograph the visitors, collect fish currency they leave behind as thanks, and use that currency to buy more items to attract more cats and unlock rare visitors. There are no quests, no time pressure, no fail states. Some cats are common and arrive quickly; others are rare and finicky and take weeks of specific setups to attract. The entire game runs in the background of your actual life. Opening it feels like checking on a garden that tends itself. Updated in 2023 with a full Reroll remake that adds a 3D town mode with even more content. Free on iOS and Android.",
    why_zh:
      '猫咪后院是有史以来最纯粹的放置游戏——它完全关于猫。前提简单得令人惊叹：你有一个小院子。你放出食物和玩具。当你不在玩的时候猫咪来拜访。你定期查看以拍摄访客、收集它们留下作为感谢的金鱼货币，并用那些货币购买更多物品来吸引更多猫咪并解锁稀有访客。没有任务、没有时间压力、没有失败状态。有些猫很常见，很快就来；其他的很稀有且挑剔，需要数周的特定设置才能吸引。整个游戏在你实际生活的背景下运行。打开它感觉就像查看一个自我照料的花园。2023 年更新了一个完整的 Reroll 重制版，增加了有更多内容的 3D 城镇模式。iOS 和 Android 上免费。',
    tip_en: "Put out Thunfishy tuna (the premium food) when you want to attract rare cats faster — save up enough fish to keep a steady supply.",
    tip_zh: '当你想更快吸引稀有猫咪时放出金枪鱼（高级食物）——存够金鱼来保持稳定供应。',
  },
  webfishing: {
    title_en: 'WEBFISHING',
    title_zh: 'WEBFISHING',
    emoji: '🎣',
    tag_en: 'Viral lo-fi multiplayer fishing — strangers who become friends over a fishing hole',
    tag_zh: '病毒式低保真多人钓鱼——在钓鱼洞边成为朋友的陌生人',
    platform_en: 'Available on: PC (Steam) — about $5 USD',
    platform_zh: '可在以下平台获取：PC（Steam）——约 5 美元',
    why_en:
      "WEBFISHING became a viral hit in late 2024 for one reason: it is an incredibly cozy multiplayer experience that feels like nothing else. You create a small animal character (raccoon, cat, frog, any creature), load into a shared fishing lobby of up to 12 players, and fish together in a lo-fi pixelated world with a gorgeous chilled soundtrack. The fishing itself is simple — cast, wait, reel in at the right moment — but the real game is the community. Strangers chat about their day. People share what they caught. Someone's playing an in-game guitar. You can decorate a shared space. It has been described as 'a fishing game that is secretly a social space.' For $5, it has one of the highest happiness-per-dollar ratios of any game released in 2024. PC only on Steam.",
    why_zh:
      'WEBFISHING 在 2024 年底成为病毒式热门游戏，原因只有一个：它是一种令人难以置信的温馨多人体验，感觉与其他任何东西都不一样。你创建一个小动物角色（浣熊、猫、青蛙、任何生物），加入最多 12 名玩家的共享钓鱼大厅，在一个有着精彩轻松原声的低保真像素世界中一起钓鱼。钓鱼本身很简单——抛线、等待、在正确时机收线——但真正的游戏是社区。陌生人谈论他们的一天。人们分享他们钓到的东西。有人在玩游戏内吉他。你可以装饰共享空间。它被描述为"一款暗地里是社交空间的钓鱼游戏"。以 5 美元的价格，它拥有 2024 年发布的任何游戏中最高的每美元幸福感比率之一。仅在 Steam 上的 PC 版本。',
    tip_en: "Join a public lobby during peak hours (evenings on your timezone) — a full 12-player lobby with an active chat is the game at its best.",
    tip_zh: '在高峰时段（你时区的傍晚）加入公共大厅——有活跃聊天的满员 12 人大厅是游戏最佳状态。',
  },
  'goose-game': {
    title_en: 'Untitled Goose Game',
    title_zh: '无标题鹅作游戏',
    emoji: '🪿',
    tag_en: 'You are a horrible goose — the most joyful mischief ever put in a game',
    tag_zh: '你是一只可怕的鹅——游戏史上最令人愉悦的恶作剧',
    platform_en: 'Available on: PC (Steam/Epic), Nintendo Switch, PlayStation 4, Xbox',
    platform_zh: '可在以下平台获取：PC（Steam/Epic）、Nintendo Switch、PlayStation 4、Xbox',
    why_en:
      "Untitled Goose Game is about being a goose. A horrible goose. You wander a charming English village and complete to-do list items like 'steal the groundskeeper's keys,' 'make the boy in the yard fall in a puddle,' and 'get into the pub and cause a scene.' The humans react to you with increasingly panicked helplessness. You honk. You steal. You create chaos. The entire thing is funny every single moment — not because the game tells you it is, but because the physical comedy of a determined goose disrupting human life is genuinely, endlessly entertaining. It is short (about 2-3 hours to finish, more to find all optional tasks) but perfectly paced. One of the most original games of the past decade, available on every platform. Also has a two-player cooperative mode.",
    why_zh:
      '无标题鹅作游戏是关于成为一只鹅。一只可怕的鹅。你在迷人的英国村庄漫游，完成待办事项，如"偷走园丁的钥匙"、"让院子里的男孩摔进水坑"和"进入酒吧并制造一场混乱"。人类以越来越恐慌的无助来回应你。你嘎嘎叫。你偷窃。你制造混乱。整件事每时每刻都很有趣——不是因为游戏告诉你它是，而是因为一只坚定的鹅打乱人类生活的肢体喜剧是真正、无尽地令人娱乐的。它很短（完成大约 2-3 小时，找到所有可选任务需要更多时间），但节奏完美。过去十年中最具原创性的游戏之一，可在所有平台上获取。还有双人合作模式。',
    tip_en: "Pick up items and carry them somewhere absurd before triggering your target's reaction — the best moments come from setting up the scene.",
    tip_zh: '在触发目标反应之前，拾起物品并将它们带到荒诞的地方——最好的时刻来自设置场景。',
  },
  'little-kitty': {
    title_en: 'Little Kitty, Big City',
    title_zh: '小猫咪，大城市',
    emoji: '🏙️',
    tag_en: 'Explore a Japanese city as a lost cat — knock things over, befriend everyone',
    tag_zh: '作为一只迷路的猫探索日本城市——推倒东西、结交所有人',
    platform_en: 'Available on: PC (Steam), Nintendo Switch, Xbox (Game Pass) — around $20 USD',
    platform_zh: '可在以下平台获取：PC（Steam）、Nintendo Switch、Xbox（Game Pass）——约 20 美元',
    why_en:
      "Little Kitty, Big City is exactly what the title says: you are a small cat who fell from a high apartment window and needs to find your way home. You explore a detailed, lovingly crafted Japanese city neighborhood from ground level — which looks completely different from cat height. You can knock things off shelves (obviously), collect hats to wear, befriend animals who give you tasks and information, talk to humans who react to you with charmed bewilderment, and slowly piece together where home is. The game captures something true about how cats interact with the world: curious, unhurried, easily distracted by interesting things. It is short (4-6 hours to complete) but rich in small details and NPC charm. Available on Xbox Game Pass, making it free for subscribers. One of the most warmly reviewed indie games of 2024.",
    why_zh:
      '小猫咪，大城市正如标题所说：你是一只从高层公寓窗户掉落的小猫，需要找到回家的路。你从地面高度探索一个精致的、充满爱心打造的日本城市街区——从猫咪高度看起来完全不同。你可以把东西从架子上推下来（当然），收集帽子来戴，结交给你任务和信息的动物，和以迷人困惑回应你的人类交谈，慢慢拼凑出家在哪里。游戏捕捉到了一些关于猫如何与世界互动的真实之处：好奇、从容、容易被有趣的事物分散注意力。它很短（完成大约 4-6 小时），但在小细节和 NPC 魅力方面很丰富。可在 Xbox Game Pass 上获取，对订阅者免费。2024 年评价最温馨的独立游戏之一。',
    tip_en: "Try wearing every hat you find — each hat changes how NPCs react to and greet you, which leads to some of the best moments in the game.",
    tip_zh: '尝试戴上你找到的每一顶帽子——每顶帽子都会改变 NPC 对你的反应和问候方式，这会带来游戏中一些最好的时刻。',
  },
}

function calcResult(answers: Pick[]): Pick {
  const counts: Record<Pick, number> = {
    'neko-atsume': 0,
    webfishing: 0,
    'goose-game': 0,
    'little-kitty': 0,
  }
  for (const a of answers) counts[a]++
  return Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0] as Pick
}

export function CozyAnimalQuiz({ locale }: { locale: string }) {
  const isZh = locale === 'zh'
  const [answers, setAnswers] = useState<(Pick | null)[]>(Array(QUESTIONS.length).fill(null))
  const [submitted, setSubmitted] = useState(false)

  const allAnswered = answers.every((a) => a !== null)

  if (submitted) {
    const result = RESULTS[calcResult(answers as Pick[])]
    const url = `${BASE_URL}/${locale}/quizzes/cozy-animal-games`
    const shareText = isZh
      ? `我的动物主题 cozy 游戏推荐是「${result.title_zh}」！${result.tag_zh}。找到你的：${url}`
      : `My animal cozy game match is ${result.title_en} — ${result.tag_en}. Find yours: ${url}`

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
              {isZh ? '开始小贴士：' : 'Getting started: '}
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
            ? '你应该玩哪款动物主题 Cozy 游戏？'
            : 'Which Animal Cozy Game Should You Play?'}
        </h1>
        <p className="text-sm text-[#8a9a7a]">
          {isZh
            ? '6 个问题，在猫咪后院、WEBFISHING、无标题鹅作游戏和小猫咪大城市中找到最适合你的'
            : '6 questions to find your match across Neko Atsume, WEBFISHING, Untitled Goose Game, and Little Kitty Big City'}
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
        {isZh ? '找到我的动物游戏' : 'Find My Animal Game'}
      </button>
    </div>
  )
}
