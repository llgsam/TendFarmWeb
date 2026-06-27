'use client'

import { useState } from 'react'
import { BASE_URL } from '@/lib/config'

type Pick = 'coffee-talk' | 'season-letter' | 'sakuna' | 'garden-story'

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
    q_en: 'What kind of setting do you want to be in right now?',
    q_zh: '你现在想置身于什么样的环境？',
    options: [
      { en: 'A warm café on a rainy night — strangers coming in, quiet jazz, the smell of coffee', zh: '雨夜里温暖的咖啡馆——陌生人进进出出，安静的爵士乐，咖啡的香气', type: 'coffee-talk' },
      { en: 'The open road in golden light — moving through a world that is slipping away, recording it', zh: '金光中的开阔道路——穿越一个正在逝去的世界，记录它', type: 'season-letter' },
      { en: 'A Japanese river valley with terraced rice paddies — the sound of water, seasonal mist', zh: '日本河谷与梯田——水流声，季节性的薄雾', type: 'sakuna' },
      { en: 'A small island community garden in bloom — caring for plants, knowing every neighbor', zh: '繁花盛开的小岛社区花园——照料植物，认识每一位邻居', type: 'garden-story' },
    ],
  },
  {
    q_en: 'Which of these sounds most soothing to you right now?',
    q_zh: '以下哪个声音现在对你最有抚慰效果？',
    options: [
      { en: 'Rain on a window, low murmur of voices, coffee being poured', zh: '雨水打在窗户上，低沉的人声，咖啡倒入杯中', type: 'coffee-talk' },
      { en: 'Wind through tall grass, the creak of a bicycle, distant bells', zh: '风穿过高草，自行车的吱呀声，远处的铃声', type: 'season-letter' },
      { en: 'The rhythm of harvesting — the swish of a scythe, water in a paddy, birds at dusk', zh: '收割的节奏——镰刀的挥动声，稻田中的水声，黄昏时的鸟鸣', type: 'sakuna' },
      { en: 'Soil being turned, leaves rustling, a community cooking something together outside', zh: '翻土声，树叶沙沙，社区里大家一起在外面烹饪的声音', type: 'garden-story' },
    ],
  },
  {
    q_en: 'What emotional tone do you want your game to carry?',
    q_zh: '你希望你的游戏带有什么情感基调？',
    options: [
      { en: 'Warmly melancholic — characters carrying real weight, finding small moments of connection at night', zh: '温暖的忧郁——角色承载着真实的重量，在夜晚找到小小的连接时刻', type: 'coffee-talk' },
      { en: 'Bittersweet and contemplative — the beauty of things precisely because they are ending', zh: '苦甜参半、沉思性的——事物正因为即将结束而显出美丽', type: 'season-letter' },
      { en: 'Earthy and grounded — the satisfaction of working in rhythm with the land and seasons', zh: '接地气、踏实——与土地和季节同频劳作的满足感', type: 'sakuna' },
      { en: 'Gentle and hopeful — small acts of care adding up to a community coming back to life', zh: '温和而充满希望——小小的关怀积累成社区重焕生机', type: 'garden-story' },
    ],
  },
  {
    q_en: 'What kind of weather is outside right now (or do you wish it was)?',
    q_zh: '你现在外面是什么天气（或者你希望是什么天气）？',
    options: [
      { en: 'Raining — steady, grey, the kind that makes inside feel extra safe', zh: '下雨——绵绵细雨，灰蒙蒙的，那种让室内格外安全的雨', type: 'coffee-talk' },
      { en: 'The last warm days of autumn — light is golden and thin, you know it will not last', zh: '秋天最后几个温暖的日子——光线金黄而稀薄，你知道这不会持续', type: 'season-letter' },
      { en: 'Misty and cool — early morning mountain air, dew on everything, a chill that feels right', zh: '薄雾弥漫、凉意十足——清晨的山间空气，万物都挂着露水，恰到好处的凉意', type: 'sakuna' },
      { en: 'Clear spring morning — everything is about to grow, the soil smells alive', zh: '晴朗的春日清晨——一切即将生长，泥土散发着生机的气息', type: 'garden-story' },
    ],
  },
  {
    q_en: 'How long do you want each game session to feel?',
    q_zh: '你希望每次游戏时段持续多久？',
    options: [
      { en: '60-90 minutes — I want to work a full shift at the café, see who comes in tonight', zh: '60-90 分钟——我想完整上一个班，看看今晚谁会来', type: 'coffee-talk' },
      { en: '20-40 minutes — a ride through one region, one day documented, a gentle arc', zh: '20-40 分钟——骑过一个地区，记录一天，一段温和的弧线', type: 'season-letter' },
      { en: 'A full in-game day — plant in the morning, tend at noon, harvest at dusk, process at night', zh: '完整的游戏内一天——早上种植、中午照料、黄昏收割、夜里加工', type: 'sakuna' },
      { en: 'As long as it takes — until the section of garden feels right and alive again', zh: '需要多久就多久——直到这片花园区域感觉正确并重新充满生机', type: 'garden-story' },
    ],
  },
  {
    q_en: 'What do you most need from a game right now?',
    q_zh: '你现在最需要从游戏中得到什么？',
    options: [
      { en: 'To be in a world that feels lived-in and human, even if the humans are elves and werewolves', zh: '置身于一个感觉真实、充满人情味的世界，即使那些"人"是精灵和狼人', type: 'coffee-talk' },
      { en: 'A reason to pay attention to beauty — a structured way of noticing what is worth remembering', zh: '一个关注美好的理由——一种有结构的方式来注意什么值得铭记', type: 'season-letter' },
      { en: 'The discipline of a seasonal rhythm — something that asks me to show up, day after day', zh: '季节节律的纪律感——一种每天都要求我出现的事物', type: 'sakuna' },
      { en: 'To feel useful in a gentle way — caring for something, seeing it respond', zh: '以一种温和的方式感到有用——照料某样东西，看着它回应', type: 'garden-story' },
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
  'coffee-talk': {
    title_en: 'Coffee Talk',
    title_zh: 'Coffee Talk',
    emoji: '☕',
    tag_en: 'A rainy-night café sim where you make drinks for lonely elves, werewolves, and aliens',
    tag_zh: '雨夜咖啡馆模拟——为孤独的精灵、狼人和外星人制作饮料',
    platform_en: 'Available on: PC (Steam), Nintendo Switch, PlayStation 4/5, Xbox, iOS, Android — about $13. Coffee Talk Episode 2 also available.',
    platform_zh: '可在以下平台获取：PC（Steam）、Nintendo Switch、PlayStation 4/5、Xbox、iOS、Android——约 13 美元。Coffee Talk 第 2 集也已发布。',
    why_en:
      "Coffee Talk is a visual novel barista simulator set in a rainy, modern-fantasy Seattle where humans live alongside elves, orcs, mermaids, and werewolves. You play as the owner of a late-night coffee shop — the only one still open after midnight. Customers come in one by one and you listen to their stories while making them drinks according to their requests. The drink-making is simple (select ingredients in order) but the stories are genuinely thoughtful: a succubus who works at a tech company, an elf dealing with her parents disapproving of her orc boyfriend, a writer with a deadline and a broken heart. The art is lo-fi pixel with a warm amber glow and it plays like reading a very good short story collection. Coffee Talk Episode 2 continues the world with new characters. A perfect game for a rainy evening when you want to be in a warm place and hear quiet, human (and non-human) stories.",
    why_zh:
      'Coffee Talk 是一款视觉小说咖啡馆模拟器，设定在一个雨夜的现代奇幻西雅图，人类与精灵、兽人、美人鱼和狼人共同生活。你扮演一家深夜咖啡馆的老板——午夜后唯一还开着的咖啡馆。顾客一个接一个进来，你在按照他们的要求制作饮料的同时聆听他们的故事。制作饮料很简单（按顺序选择食材），但故事却真实而有思想：一个在科技公司工作的魅魔，一个处理父母不赞同她和兽人男友的精灵，一个有截止日期和心碎的作家。美术风格是低保真像素画，有温暖的琥珀色调，玩起来像在阅读一部非常好的短篇故事集。Coffee Talk 第 2 集以新角色延续了这个世界。一款完美的雨夜游戏，当你想置身于一个温暖的地方，听一些安静的、人情味十足的（以及非人类的）故事时。',
    tip_en: "Experiment with unusual ingredient combinations — some customers hint at drinks beyond their stated order, and serving them the right undisclosed drink unlocks hidden story paths.",
    tip_zh: '尝试不寻常的食材组合——一些顾客暗示了超出他们所说订单的饮料，为他们提供正确的未透露饮料会解锁隐藏的故事路径。',
  },
  'season-letter': {
    title_en: 'Season: A Letter to the Future',
    title_zh: 'Season：致未来的信',
    emoji: '🚲',
    tag_en: 'A bicycle journey through a beautiful world on the eve of a great seasonal reset — document everything',
    tag_zh: '在一场伟大季节重置前夕骑自行车穿越美丽的世界——记录一切',
    platform_en: 'Available on: PC (Steam, GOG, Epic), PlayStation 4/5 — about $20',
    platform_zh: '可在以下平台获取：PC（Steam、GOG、Epic）、PlayStation 4/5——约 20 美元',
    why_en:
      "Season: A Letter to the Future (released February 2023) is one of the most unusual and beautiful cozy games ever made. You play as Estelle, a young woman leaving her isolated village for the first time on the eve of a 'season' — a recurring cataclysm that wipes the world's memory clean and resets everything. Before the season ends, you travel by bicycle through a lush, dreamlike landscape, documenting everything you find: photographing scenes, recording sounds with a microphone, pressing plants and objects into a journal. You are essentially making a time capsule for whoever comes after you. The game is about 6-8 hours, moves at a gentle bicycle pace, and is filled with found objects, letters from strangers, and small mysteries about the world's strange history. BAFTA nominated for narrative. A perfect game for autumnal evenings when you feel the particular melancholy of things ending — it transforms that feeling into something purposeful.",
    why_zh:
      'Season：致未来的信（2023 年 2 月发布）是有史以来最不寻常、最美丽的 cozy 游戏之一。你扮演艾斯特尔，一个在"季节"前夕第一次离开隔绝村庄的年轻女性——一场反复发生的灾变，它清除世界的记忆并重置一切。在季节结束之前，你骑自行车穿越郁郁葱葱、如梦似幻的风景，记录你发现的一切：拍摄场景、用麦克风录制声音、将植物和物品压入日记本。你本质上是在为你之后的人制作一个时间囊。这款游戏大约 6-8 小时，以温和的自行车速度移动，充满了拾得物、陌生人的信件，以及关于这个世界奇异历史的小谜题。BAFTA 叙事类提名。一款完美的秋日傍晚游戏，当你感受到事物结束时特有的忧郁——它将这种感觉转化为有目的的东西。',
    tip_en: "Take time to record sounds with your microphone — some of the most moving entries in your season album come from ambient sounds you can only capture in specific locations.",
    tip_zh: '花时间用你的麦克风录制声音——你的季节相册中一些最动人的条目来自只能在特定地点才能捕捉到的环境声音。',
  },
  sakuna: {
    title_en: 'Sakuna: Of Rice and Paddy',
    title_zh: '天穗之咲稻姬',
    emoji: '🌾',
    tag_en: 'A Japanese action RPG where the core loop is growing the perfect rice — deeply seasonal, deeply satisfying',
    tag_zh: '日本动作 RPG，核心循环是种植完美的稻米——深度季节感，深度满足感',
    platform_en: 'Available on: PC (Steam), Nintendo Switch, PlayStation 4 — about $40 (often on sale for ~$20)',
    platform_zh: '可在以下平台获取：PC（Steam）、Nintendo Switch、PlayStation 4——约 40 美元（常特价约 20 美元）',
    why_en:
      "Sakuna: Of Rice and Paddy (2020) is one of the most unexpectedly deep cozy games ever released. You play as Sakuna, a disgraced rice goddess banished to a dangerous island with a group of mortals. During the day you fight through dangerous terrain using action-RPG combat. In the evenings you return home to tend your rice paddies. The rice cultivation system is genuinely deep — managing water levels through each stage of growth, choosing fertilizer inputs carefully, watching temperature and sunlight, harvesting with precision, and threshing, polishing, and storing the harvest. The quality of your rice directly determines Sakuna's combat power. The seasonal rhythm is built deeply into the game: spring planting, summer tending, autumn harvest, winter planning. The Japanese mythology is beautiful and the domestic sequences — cooking meals for the household, everyone settling in for the evening — are some of the most cozy moments in games. One of the best surprises of the 2020s for farming game fans.",
    why_zh:
      '天穗之咲稻姬（2020 年）是有史以来发布的最出人意料的深度 cozy 游戏之一。你扮演被流放到危险岛屿的被贬黜稻米女神佐久奈，与一群凡人在一起。白天你用动作 RPG 战斗穿越危险的地形。傍晚你回家照料稻田。水稻种植系统确实很深入——管理每个生长阶段的水位、仔细选择肥料投入、观察温度和日照、精确收割、脱粒、抛光和储存收获物。你的稻米质量直接决定佐久奈的战斗力。季节节律深深融入游戏：春天播种、夏天照料、秋天收割、冬天规划。日本神话很美，家庭场景——为家人烹饪饭食、大家在傍晚安顿下来——是游戏中最 cozy 的时刻之一。对农场游戏粉丝来说是 2020 年代最好的惊喜之一。',
    tip_en: "Prioritize water management over every other rice cultivation variable — keeping water at precisely the right level for each growth stage has a bigger impact on rice quality than any other choice.",
    tip_zh: '将水管理置于所有其他水稻种植变量之上——在每个生长阶段将水保持在精确的正确水平对稻米质量的影响比其他任何选择都要大。',
  },
  'garden-story': {
    title_en: 'Garden Story',
    title_zh: '花园物语',
    emoji: '🍇',
    tag_en: 'A cozy RPG where you play as a small grape protecting a seasonal island garden community',
    tag_zh: '一款 cozy RPG，你扮演一颗保护季节性岛屿花园社区的小葡萄',
    platform_en: 'Available on: PC (Steam, GOG), Nintendo Switch — about $15',
    platform_zh: '可在以下平台获取：PC（Steam、GOG）、Nintendo Switch——约 15 美元',
    why_en:
      "Garden Story (2021) is one of the most charming small-scale cozy RPGs made in recent years. You play as Concord, a young grape who becomes the Grove's new 'Guardian' — responsible for caring for an island community of anthropomorphic plants and fruits while fighting off 'Rot' (corruption that spreads through the environment). The game is divided into four seasonal areas, each with its own aesthetic, community, and challenges. The core loop combines gentle combat, quest completion for community members, and physical restoration of damaged parts of the island. What makes Garden Story special is the warmth of its community — everyone knows everyone, the requests are genuinely mundane and sweet (a mushroom needs a specific item to make a recipe for a sick neighbor), and the visual style is soft and inviting. At about 8-12 hours, it is a complete experience without demanding excessive time. A perfect game for spring mornings when you want to tend something and feel genuinely useful.",
    why_zh:
      '花园物语（2021 年）是近年来制作的最迷人的小规模 cozy RPG 之一。你扮演康科德，一颗成为树林新"守护者"的年轻葡萄——负责照料一个拟人化植物和水果的岛屿社区，同时抵抗"腐败"（在环境中蔓延的污染）。游戏分为四个季节区域，每个区域都有自己的美学、社区和挑战。核心循环结合了温和的战斗、为社区成员完成任务，以及恢复岛屿受损部分的物理修复。使花园物语特别的是其社区的温暖——每个人都认识每个人，请求真实地平凡而可爱（一个蘑菇需要一个特定物品为生病的邻居做食谱），视觉风格柔和而温馨。大约 8-12 小时，这是一个不需要过多时间的完整体验。一款完美的春日清晨游戏，当你想照料某样东西并真正感到有用时。',
    tip_en: "Check in with every community member each time you enter a new area — many of the most satisfying quests are time-gated behind how often you talk to them, not behind story progress.",
    tip_zh: '每次进入新区域时与每个社区成员交流——许多最令人满足的任务是由你与他们交谈的频率决定的，而不是由故事进度决定的。',
  },
}

function calcResult(answers: Pick[]): Pick {
  const counts: Record<Pick, number> = {
    'coffee-talk': 0,
    'season-letter': 0,
    sakuna: 0,
    'garden-story': 0,
  }
  for (const a of answers) counts[a]++
  return Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0] as Pick
}

export function CozyAtmosphereQuiz({ locale }: { locale: string }) {
  const isZh = locale === 'zh'
  const [answers, setAnswers] = useState<(Pick | null)[]>(Array(QUESTIONS.length).fill(null))
  const [submitted, setSubmitted] = useState(false)

  const allAnswered = answers.every((a) => a !== null)

  if (submitted) {
    const result = RESULTS[calcResult(answers as Pick[])]
    const url = `${BASE_URL}/${locale}/quizzes/cozy-atmosphere-quiz`
    const shareText = isZh
      ? `我的氛围 Cozy 游戏推荐是「${result.title_zh}」！${result.tag_zh}。找到你的：${url}`
      : `My atmosphere cozy match is ${result.title_en} — ${result.tag_en}. Find yours: ${url}`

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
            ? '你现在的心情氛围适合哪款 Cozy 游戏？'
            : 'Which Cozy Game Matches Your Current Atmosphere?'}
        </h1>
        <p className="text-sm text-[#8a9a7a]">
          {isZh
            ? '6 个感官问题，在 Coffee Talk、Season: 致未来的信、天穗之咲稻姬和花园物语中找到你此刻的氛围匹配'
            : '6 sensory questions to match you with Coffee Talk, Season, Sakuna, or Garden Story — based on your exact mood and atmosphere right now'}
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
        {isZh ? '找到我的氛围游戏' : 'Find My Atmosphere Game'}
      </button>
    </div>
  )
}
