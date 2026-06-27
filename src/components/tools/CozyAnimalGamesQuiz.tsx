'use client'

import { useState } from 'react'
import { BASE_URL } from '@/lib/config'

type Pick = 'stray' | 'cattails' | 'snufkin' | 'pupperazzi'

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
    q_en: 'What sounds most appealing about playing as an animal in a game?',
    q_zh: '扮演游戏中的动物，哪个方面对你最有吸引力？',
    options: [
      { en: 'Navigating a world that was not built for you — solving its puzzles from a completely different perspective and eventually connecting with its strange residents', zh: '在一个不为你而建的世界中穿行——从完全不同的视角解决谜题，最终与其奇异居民建立联系', type: 'stray' },
      { en: 'Building something that is yours — your own territory, your own colony, your own status in a natural world with real stakes', zh: '建立属于自己的东西——你自己的领地、你自己的族群、在一个有真实风险的自然世界中的地位', type: 'cattails' },
      { en: 'Walking slowly through a beautiful world with no pressure — just listening, noticing, and being present in the atmosphere', zh: '在没有压力的美丽世界中缓步行走——只是倾听、观察、沉浸在氛围中', type: 'snufkin' },
      { en: 'Bringing pure joy to every creature you meet — running, playing, making them laugh, and capturing their best moments', zh: '给你遇到的每一个生物带来纯粹的快乐——奔跑、嬉戏、让他们开怀大笑、捕捉他们最美的瞬间', type: 'pupperazzi' },
    ],
  },
  {
    q_en: 'How important is narrative to your experience?',
    q_zh: '叙事对你的游戏体验有多重要？',
    options: [
      { en: 'Essential — I want a story with stakes, mystery, and an emotional ending that I will remember', zh: '非常重要——我想要一个有风险、有谜题、有令人难忘的情感结局的故事', type: 'stray' },
      { en: 'Light narrative is fine — I want systems, progression, and the satisfaction of building something more than I want plot', zh: '轻度叙事就够了——比起情节，我更想要系统、进展和建造某物的满足感', type: 'cattails' },
      { en: 'Atmosphere IS the narrative — I want mood and poetry and a sense of place, not plot beats or dramatic moments', zh: '氛围就是叙事——我想要情绪、诗意和场所感，而不是情节节拍或戏剧性时刻', type: 'snufkin' },
      { en: 'No narrative needed at all — I want pure vibes, pure interaction, zero story pressure, just me and the dogs', zh: '完全不需要叙事——我只想要纯粹的氛围、纯粹的互动、零故事压力，只有我和狗狗们', type: 'pupperazzi' },
    ],
  },
  {
    q_en: 'What is your preferred play session length and shape?',
    q_zh: '你喜欢的游戏时长和节奏是什么？',
    options: [
      { en: 'A focused 4-6 hour experience I can complete in a weekend — I want a beginning, middle, and end', zh: '一个我可以在周末完成的 4-6 小时专注体验——我想要开始、中间和结局', type: 'stray' },
      { en: 'Long-term ongoing sessions — a game I will return to over weeks and months as my colony grows', zh: '长期持续的游戏——一个我会在数周乃至数月内不断回来的游戏，看着我的族群成长', type: 'cattails' },
      { en: 'Gentle 20-30 minute sessions whenever the mood strikes — no obligation, no progress gates, just a meditative walk', zh: '当心情来了就玩 20-30 分钟的温柔游戏——没有义务、没有进度门槛，只是一次冥想式散步', type: 'snufkin' },
      { en: 'A short joyful burst — 15 minutes of absolute chaos and delight and then I am completely satisfied', zh: '短暂欢乐的爆发——15 分钟的绝对混乱和喜悦，然后我就完全满足了', type: 'pupperazzi' },
    ],
  },
  {
    q_en: 'How much challenge do you want in your animal game?',
    q_zh: '你希望动物游戏中有多少挑战？',
    options: [
      { en: 'Some tension is good — stealth sections, environmental puzzles, moments where I need to think carefully to proceed', zh: '有些紧张感很好——潜行段落、环境谜题、需要仔细思考才能继续的时刻', type: 'stray' },
      { en: 'Strategy over tension — I want resource management and territorial decisions that require planning, but not twitch reflexes', zh: '策略胜于紧张——我想要需要规划的资源管理和领地决策，但不需要快速反应', type: 'cattails' },
      { en: 'Very light — a puzzle here and there that is solvable without stress, mostly just wandering and discovering', zh: '非常轻度——偶尔有可以无压力解决的谜题，大部分时间只是漫游和发现', type: 'snufkin' },
      { en: 'Zero challenge — I want this to be effortless, the most relaxing thing I have ever played, pure sandbox joy', zh: '零挑战——我希望这完全轻松，是我玩过的最放松的东西，纯粹的沙盒乐趣', type: 'pupperazzi' },
    ],
  },
  {
    q_en: 'Which visual world sounds most appealing to you?',
    q_zh: '哪个视觉世界对你最有吸引力？',
    options: [
      { en: 'A neon cyberpunk city seen through cat-height eyes — dark and beautiful, with decaying beauty and hidden warmth', zh: '从猫咪视角看到的霓虹赛博朋克城市——黑暗而美丽，有着衰落的美和隐藏的温暖', type: 'stray' },
      { en: 'Seasonal woodland landscapes with changing weather, a natural cat-scale world full of prey, rivals, and territory to claim', zh: '随季节变换的林地风景，有着变化的天气，一个充满猎物、竞争者和待征服领地的自然猫咪世界', type: 'cattails' },
      { en: 'Tove Jansson\'s hand-drawn Moominvalley — Scandinavian folk nature illustration, nostalgic and soft, every scene a painting', zh: '托芙·扬松手绘的姆明谷——斯堪的纳维亚民俗自然插画，怀旧而柔和，每一幕都是一幅画', type: 'snufkin' },
      { en: 'A cheerful stylized world full of dogs in every breed, color, and size — exuberant pop-art energy, endlessly photogenic', zh: '一个充满各种品种、颜色和体型的狗狗的欢快程式化世界——充满活力的波普艺术能量，每只狗都上镜', type: 'pupperazzi' },
    ],
  },
  {
    q_en: 'What do you most want to take away from the experience?',
    q_zh: '你最希望从这段游戏体验中带走什么？',
    options: [
      { en: 'A complete emotional journey — I want to finish it feeling genuinely moved by what happened', zh: '一段完整的情感旅程——我希望完成后因所发生的一切而真正感动', type: 'stray' },
      { en: 'Accomplishment — my colony is thriving, my territory is secure, I built something real over weeks of play', zh: '成就感——我的族群兴旺，我的领地稳固，我在数周的游戏中建立了真实的东西', type: 'cattails' },
      { en: 'Calm — a genuine sense that slow wandering has meaning, and that noticing small things is its own reward', zh: '平静——真正感受到缓慢漫游有其意义，注意小事本身就是奖励', type: 'snufkin' },
      { en: 'Pure delight — a folder full of ridiculous dog photos and the memory of absolute joy with zero effort', zh: '纯粹的喜悦——一个装满荒唐狗狗照片的文件夹，以及毫不费力的绝对快乐的回忆', type: 'pupperazzi' },
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
  stray: {
    title_en: 'Stray',
    title_zh: 'Stray',
    emoji: '🐱',
    tag_en: 'Navigate a neon cyberpunk city as a stray cat — explore from cat height, solve puzzles, and form unexpected bonds with the robot citizens',
    tag_zh: '以流浪猫的身份穿越霓虹赛博朋克城市——以猫的视角探索、解谜，与机器人居民建立意想不到的情感联系',
    platform_en: 'Available on: PC (Steam), PS4, PS5 — about $30. Also on Xbox/Game Pass via cloud.',
    platform_zh: '可在以下平台获取：PC（Steam）、PS4、PS5——约 30 美元。也可通过云端在 Xbox/Game Pass 上体验。',
    why_en:
      "Stray (2022) is one of the most acclaimed games of its year — and one of the most immediately understandable pitches in gaming history: you play as a cat in a cyberpunk underground city where only robots live, and the humans are long gone. You meow, scratch walls, knock things off shelves, sleep on keyboards, and generally do cat things in a world that was never designed for you. What makes Stray extraordinary beyond its concept is how it builds genuine emotional stakes through the relationship between the cat and B-12, a small drone companion who translates the robot language and slowly reveals the history of what happened to humanity. The game is short (4-6 hours) but complete: it has a beginning, a middle, and an ending that lands emotionally without padding it out. It is beautifully rendered on PS5 — the neon-lit alleys, the robot communities going about their lives, the moments of quiet warmth among the decay. Absolutely worth playing even at full price; frequently on sale for $15-20.",
    why_zh:
      'Stray（2022 年）是当年最受好评的游戏之一——也是游戏史上最直观的概念之一：你扮演一只流浪猫，在一个只有机器人居住的赛博朋克地下城市中穿行，人类早已消失。你喵喵叫、抓墙、把东西从架子上推下去、睡在键盘上，总体上在一个从未为你设计的世界里做猫的事情。让 Stray 在概念之外卓越出众的，是它通过猫和 B-12（一个翻译机器人语言并逐渐揭示人类命运的小型无人机伙伴）之间的关系建立起真实的情感赌注。游戏很短（4-6 小时），但完整：它有开始、中间和结局，情感落点到位而不拖沓。在 PS5 上渲染精美——霓虹照耀的小巷、机器人社区在衰败中各自生活、平静温暖的瞬间。即使以全价购买也绝对值得；经常打折到 15-20 美元。',
    tip_en: "Explore every side path before proceeding through story gates — the game rewards cat curiosity with hidden memories, collectible badges, and small moments of beauty that are easy to miss if you rush. B-12's memories are some of the most affecting content in the game.",
    tip_zh: '在通过故事节点之前，探索每一条支路——游戏以隐藏记忆、可收集徽章和小小的美丽瞬间奖励猫咪的好奇心，如果你赶时间很容易错过。B-12 的记忆是游戏中最感人的内容之一。',
  },
  cattails: {
    title_en: 'Cattails: Wildwood Story',
    title_zh: 'Cattails：野木故事',
    emoji: '🐾',
    tag_en: 'Be a cat in a natural world — claim territory, build a colony, hunt prey, and navigate seasonal cat society in a cozy wilderness',
    tag_zh: '成为自然世界中的一只猫——占领领地、建立族群、捕猎猎物、在舒适的野外环境中驾驭季节性的猫族社会',
    platform_en: 'Available on: PC (Steam, Itch.io) — about $12',
    platform_zh: '可在以下平台获取：PC（Steam、Itch.io）——约 12 美元',
    why_en:
      "Cattails: Wildwood Story (2023) is the cat life sim that actually lets you live as a cat with cat priorities. You choose your starting colony, patrol and claim territory in a seasonal forest, hunt mice and birds to sustain your character, form relationships with other cats (including romance and kittens), and build your colony's strength and reputation over time. The game has real stakes in a cozy package: other colonies will encroach on your territory, hunting grounds have limited prey that needs time to repopulate, and the seasons meaningfully change what prey is available and where. The sequel to the original Cattails (2017), it refined the systems and expanded the colony-building depth significantly. At $12, it is one of the best-value games for anyone who has ever wanted a cat life sim that goes beyond cosmetics and actually models a cat's world. The pixel art style is charming and the day/night cycle is satisfying to settle into.",
    why_zh:
      'Cattails：野木故事（2023 年）是真正让你以猫的优先级生活的猫咪生活模拟游戏。你选择起始族群，在季节性森林中巡逻并占领领地，猎取老鼠和鸟类来维持角色状态，与其他猫咪建立关系（包括恋爱和幼崽），随时间建立你族群的实力和声誉。游戏在舒适的包装下有真实的风险：其他族群会侵占你的领地，狩猎场的猎物有限，需要时间补充，季节性变化真实地影响猎物的可获取性和位置。这是原版 Cattails（2017 年）的续作，系统经过改进，族群建设深度显著扩展。12 美元，对于任何曾经想要一款超越外观、真正模拟猫咪世界的猫咪生活模拟游戏的人来说，是性价比最高的游戏之一。像素艺术风格迷人，昼夜循环令人愉快地沉浸其中。',
    tip_en: "Prioritize expanding your colony's territory early — more territory means more hunting grounds and more resources to attract other cats to join. Don't neglect the reputation system with the colony leader; high reputation unlocks the best perks for your kittens.",
    tip_zh: '优先早期扩展你族群的领地——更多领地意味着更多狩猎场和更多资源来吸引其他猫咪加入。不要忽视与族群领袖的声誉系统；高声誉可以为你的幼崽解锁最好的天赋。',
  },
  snufkin: {
    title_en: 'Snufkin: Melody of Moominvalley',
    title_zh: 'Snufkin：姆明谷的旋律',
    emoji: '🎶',
    tag_en: 'Wander through Tove Jansson\'s hand-drawn Moominvalley as Snufkin — compose melodies, free caged animals, and remind a world under control that it belongs to everyone',
    tag_zh: '以 Snufkin 的身份漫步于托芙·扬松手绘的姆明谷——谱写旋律、解放被关押的动物，提醒一个被管控的世界它属于所有人',
    platform_en: 'Available on: PC (Steam, GOG), Nintendo Switch — about $25',
    platform_zh: '可在以下平台获取：PC（Steam、GOG）、Nintendo Switch——约 25 美元',
    why_en:
      "Snufkin: Melody of Moominvalley (2024) is the most visually faithful Moomin game ever made — Snufkin's world looks exactly like Tove Jansson's original illustrations come to life in gentle watercolor animation. You play as Snufkin, the philosophical wandering traveler of Moominvalley, returning from his winter journey to find that an officious Park Keeper has taken over the valley, planted signs everywhere, and caged the local wildlife. Your gentle adventure involves composing new melodies that charm the animals and help them escape, restoring the valley's freedom one caged creature at a time. The game is deliberately slow and contemplative — Snufkin walks at a leisurely pace, his flute melodies drift through the environment, and the Moomin characters he visits each have their own anxieties about the changed valley. It is a game for people who loved the Moomin books or shows, or who simply want a deeply gentle experience that values slowness and natural freedom over goals and metrics.",
    why_zh:
      'Snufkin：姆明谷的旋律（2024 年）是有史以来视觉上最忠实于姆明的游戏——Snufkin 的世界看起来正是托芙·扬松原版插图以温柔水彩动画呈现的样子。你扮演 Snufkin，姆明谷哲学流浪旅人，从冬季旅程归来，发现一个官僚式的公园管理员已经接管了山谷，到处竖起标牌，关押了当地野生动物。你的温柔冒险包括谱写新旋律来迷住动物们帮助它们逃脱，一次解放一只被关押的生物，恢复山谷的自由。游戏刻意缓慢而沉思——Snufkin 以悠闲的步伐行走，他的长笛旋律飘荡在环境中，他拜访的姆明角色们各自对改变的山谷有着自己的忧虑。这是一款为喜爱姆明书籍或电视剧的人，或者只是想要一段深度温柔体验的人设计的游戏，它重视慢节奏和自然自由，而不是目标和指标。',
    tip_en: "Let the music guide you — when Snufkin hums or the environment music shifts, it usually signals something nearby worth investigating. The game rewards wandering off the obvious path; some of the most charming moments are found by simply exploring.",
    tip_zh: '让音乐引导你——当 Snufkin 哼唱或环境音乐改变时，通常意味着附近有值得探索的东西。游戏奖励偏离明显路径的漫游；一些最迷人的时刻只需探索就能找到。',
  },
  pupperazzi: {
    title_en: 'Pupperazzi',
    title_zh: 'Pupperazzi',
    emoji: '📸',
    tag_en: 'Photograph dogs in a dog-centric world — every breed, every expression, zero pressure, infinite delight',
    tag_zh: '在一个以狗为中心的世界里为狗狗拍照——每一个品种、每一个表情、零压力、无限喜悦',
    platform_en: 'Available on: PC (Steam), Xbox, Game Pass — about $15',
    platform_zh: '可在以下平台获取：PC（Steam）、Xbox、Game Pass——约 15 美元',
    why_en:
      "Pupperazzi (2022) is the purest possible expression of a simple idea: a world full of dogs who want you to photograph them, and a camera that makes it easy. There is no danger, no fail state, no time pressure, no resource management. You are a sentient camera at ground level in an exuberant stylized world where dogs have human occupations, dog parks are the cultural centers, and dog celebrities exist. Your only job is to wander, notice, react, and take photos. The more photos you take of certain dogs, the more their social media following grows; you unlock new areas as your photography reputation builds. The game has a specific sense of humor — all the signs, social media posts, and dog celebrity names are gently absurdist in the tradition of Untitled Goose Game. It is available on Game Pass, which makes it essentially free to try. At 3-4 hours for the main content, it is a perfect palate cleanser after something emotionally heavy. Not a deep game, and not trying to be — it is exactly what it says on the box.",
    why_zh:
      'Pupperazzi（2022 年）是对一个简单想法最纯粹的表达：一个充满想让你拍照的狗狗的世界，还有一台让一切变得容易的相机。没有危险、没有失败状态、没有时间压力、没有资源管理。你是一台有感知的相机，在一个欢快程式化的世界中贴地行走，在那里狗狗们有人类的职业，狗狗公园是文化中心，狗狗名人也存在。你唯一的工作是漫游、注意、反应和拍照。你拍摄某些狗狗的照片越多，它们的社交媒体粉丝就越多；随着你的摄影声誉建立，你解锁新区域。游戏有一种特定的幽默感——所有的标牌、社交媒体帖子和狗狗名人名字都是温和荒诞主义的，类似于 Untitled Goose Game 的风格。它在 Game Pass 上可用，这使得试玩基本上是免费的。主要内容约 3-4 小时，是某些情感沉重内容后完美的口味调节剂。不是一款深度游戏，也没有尝试成为——它完全是标题所表达的。',
    tip_en: "Fill your camera roll with variety — the game rewards photographing many different dogs in many different situations (mid-action, sleeping, with props, in groups). Specializing in one dog's fame too early slows your area unlocks. Be a generalist paparazzi first.",
    tip_zh: '用多样性填满你的相机胶卷——游戏奖励在许多不同情况下（动作中、睡觉时、带道具、成群结队）拍摄许多不同的狗狗。过早专注于一只狗的名气会减慢你的区域解锁速度。首先成为一个通才狗仔队。',
  },
}

function calcResult(answers: Pick[]): Pick {
  const counts: Record<Pick, number> = { stray: 0, cattails: 0, snufkin: 0, pupperazzi: 0 }
  for (const a of answers) counts[a]++
  return Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0] as Pick
}

export function CozyAnimalGamesQuiz({ locale }: { locale: string }) {
  const isZh = locale === 'zh'
  const [answers, setAnswers] = useState<(Pick | null)[]>(Array(QUESTIONS.length).fill(null))
  const [submitted, setSubmitted] = useState(false)

  const allAnswered = answers.every((a) => a !== null)

  if (submitted) {
    const result = RESULTS[calcResult(answers as Pick[])]
    const url = `${BASE_URL}/${locale}/quizzes/cozy-play-as-animal`
    const shareText = isZh
      ? `Cozy 动物游戏测验结果：「${result.title_zh}」！${result.tag_zh}。找到你的：${url}`
      : `My cozy animal game is ${result.title_en} — ${result.tag_en}. Find yours: ${url}`

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
              ? 'TendFarm 正在研发农场节律追踪功能——把游戏里的生活节奏带入真实日常。'
              : 'TendFarm is building a farm rhythm tracker — bringing the rhythm of game life into real daily life.'}
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
            ? '哪款 Cozy 动物游戏最适合你？'
            : 'Which Cozy Animal Game Is Right for You?'}
        </h1>
        <p className="text-sm text-[#8a9a7a]">
          {isZh
            ? '6 个问题，从 Stray、Cattails、Snufkin 和 Pupperazzi 中找到你的动物游戏伴侣'
            : '6 questions to match you with Stray, Cattails: Wildwood Story, Snufkin: Melody of Moominvalley, or Pupperazzi'}
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
