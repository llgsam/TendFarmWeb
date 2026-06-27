'use client'

import { useState } from 'react'
import { BASE_URL } from '@/lib/config'

type Pick = 'venba' | 'strange-horticulture' | 'lil-gator' | 'tinykin'

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
    q_en: 'How long do you want this game to be?',
    q_zh: '你希望这款游戏持续多久？',
    options: [
      { en: '90 minutes to 2 hours — a complete, deeply moving experience in a single evening', zh: '90 分钟到 2 小时——在单个夜晚内完整且深刻动人的体验', type: 'venba' },
      { en: '4-8 hours — slow, atmospheric, something I return to over several evenings', zh: '4-8 小时——缓慢、有氛围感，我会在几个夜晚里分次游玩', type: 'strange-horticulture' },
      { en: '3-5 hours — joyful and breezy, the kind that makes me smile and then it is done', zh: '3-5 小时——愉快轻松，那种让我微笑然后就结束了的体验', type: 'lil-gator' },
      { en: '8-12 hours — exploring every corner, discovering secrets, collecting with purpose', zh: '8-12 小时——探索每个角落，发现秘密，带着目标收集', type: 'tinykin' },
    ],
  },
  {
    q_en: 'What kind of emotional experience are you looking for?',
    q_zh: '你在寻找什么样的情感体验？',
    options: [
      { en: 'Something that makes me cry in the best way — deep, familial, human', zh: '能让我以最好的方式哭出来的东西——深刻的、家庭的、人性的', type: 'venba' },
      { en: 'Quiet immersion — a sense of uncovering something hidden in a world with history', zh: '安静的沉浸感——在一个有历史的世界中揭露隐藏事物的感觉', type: 'strange-horticulture' },
      { en: 'Pure joy and lightness — I want to feel like a kid playing outside with no worries', zh: '纯粹的快乐和轻盈感——我想感觉像个在外面玩耍、无忧无虑的孩子', type: 'lil-gator' },
      { en: 'Wonder and discovery — the satisfaction of exploring a miniature world from a tiny perspective', zh: '惊奇与发现——从微小视角探索一个缩微世界的满足感', type: 'tinykin' },
    ],
  },
  {
    q_en: 'What is the core activity you most want to do?',
    q_zh: '你最想做的核心活动是什么？',
    options: [
      { en: 'Reconstruct and cook my mother\'s lost recipes — piece together family memory through food', zh: '重建和烹饪我母亲失传的食谱——通过食物拼凑家庭记忆', type: 'venba' },
      { en: 'Identify mysterious plants from botanical books and sell remedies to villagers with problems', zh: '从植物学书籍中识别神秘植物，并向有问题的村民出售药方', type: 'strange-horticulture' },
      { en: 'Run around a lake pretending to be on an adventure, making new friends and completing their quests', zh: '围着湖边奔跑，假装在冒险，结交新朋友并完成他们的任务', type: 'lil-gator' },
      { en: 'Recruit an army of tiny creatures and use them to solve environmental puzzles as a tiny person', zh: '招募一支微型生物军队，作为一个小人用它们解决环境谜题', type: 'tinykin' },
    ],
  },
  {
    q_en: 'What setting sounds most appealing right now?',
    q_zh: '什么样的设定现在对你最有吸引力？',
    options: [
      { en: 'A 1980s immigrant family kitchen in Canada — handwritten recipes, Carnatic music, the smell of spices', zh: '80 年代加拿大移民家庭的厨房——手写食谱、卡纳塔克音乐、香料的气味', type: 'venba' },
      { en: 'A Victorian herbalist shop in a fog-shrouded village full of strange and unexplained occurrences', zh: '雾气弥漫的村庄里一家维多利亚时代的草药师店铺，充满奇异和无法解释的事件', type: 'strange-horticulture' },
      { en: 'A sunny lakeside where children play pretend — every quest is imagination dressed up as adventure', zh: '阳光明媚的湖边，孩子们在玩假装游戏——每个任务都是想象力装扮成冒险', type: 'lil-gator' },
      { en: 'The inside of a house — but you are the size of a thumb, and every room is a continent to cross', zh: '一栋房子的内部——但你只有拇指大小，每个房间都是要穿越的大陆', type: 'tinykin' },
    ],
  },
  {
    q_en: 'How puzzle-focused do you want the gameplay to be?',
    q_zh: '你希望游戏的谜题比重有多高？',
    options: [
      { en: 'Gently puzzle-like — the "puzzle" is emotional and narrative, not mechanical', zh: '轻微谜题感——"谜题"是情感和叙事性的，而非机制性的', type: 'venba' },
      { en: 'Moderately puzzling — cross-referencing clues and books to identify hidden things', zh: '中度谜题感——交叉参考线索和书籍来识别隐藏的事物', type: 'strange-horticulture' },
      { en: 'Not very puzzle-focused — exploration and meeting characters is the main draw', zh: '不太注重谜题——探索和遇见角色是主要吸引力', type: 'lil-gator' },
      { en: 'Physics-based puzzles — using your tiny creatures cleverly to navigate and interact', zh: '基于物理的谜题——聪明地使用你的微型生物来导航和互动', type: 'tinykin' },
    ],
  },
  {
    q_en: 'What do you want to feel when the game is over?',
    q_zh: '游戏结束时你想有什么感受？',
    options: [
      { en: 'Like I understood something important about my family, my culture, and the things that get lost', zh: '好像我理解了关于我的家庭、我的文化，以及那些被遗忘的事物的某些重要东西', type: 'venba' },
      { en: 'Like I uncovered the truth behind something mysterious that was never fully explained', zh: '好像我揭开了某个从未完全解释过的神秘事物背后的真相', type: 'strange-horticulture' },
      { en: 'Like I just had the best Saturday of childhood — warm, light, completely satisfied', zh: '好像我刚刚度过了童年最美好的一个周六——温暖、轻盈、完全满足', type: 'lil-gator' },
      { en: 'Like I explored every inch of a miniature world and understood it completely', zh: '好像我探索了一个微型世界的每一寸，并完全理解了它', type: 'tinykin' },
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
  venba: {
    title_en: 'Venba',
    title_zh: 'Venba',
    emoji: '🍲',
    tag_en: 'A 90-minute cooking narrative game about an Indian immigrant family and the recipes that hold memory',
    tag_zh: '90 分钟烹饪叙事游戏，关于一个印度移民家庭和承载记忆的食谱',
    platform_en: 'Available on: PC (Steam), Nintendo Switch, PlayStation 4/5, Xbox, iOS — about $15',
    platform_zh: '可在以下平台获取：PC（Steam）、Nintendo Switch、PlayStation 4/5、Xbox、iOS——约 15 美元',
    why_en:
      "Venba (2023) is one of the most emotionally resonant games made in recent years — a 90-minute cooking narrative about Venba, an Indian woman who immigrates to Canada in the 1980s with her husband Paavalan, and their son Kavin who grows up between two cultures. The core gameplay is reconstructing Venba's mother's lost cookbook: pages are damaged or missing, and you figure out the right ingredients and steps by reading context clues. Each dish unlocks a vignette of family life. The game spans decades, following the family through joy, distance, and the quiet grief of cultural disconnection. The Tamil music, the specific food (sambar, kozhukattai, adai), the handwritten notes in the cookbook — every detail is specific and earned. It costs about $15 and takes 90 minutes to 2 hours. One of the most talked-about indie games of 2023. Has been described as 'a meal that fills you with warmth and then breaks your heart, in the best way.' Strongly recommended if you have ever felt the gap between the world you came from and the world you live in.",
    why_zh:
      'Venba（2023 年）是近年来情感共鸣最强的游戏之一——一款 90 分钟的烹饪叙事游戏，讲述 Venba，一位 80 年代移民到加拿大的印度女性，与她的丈夫 Paavalan 和在两种文化之间成长的儿子 Kavin 的故事。核心游戏玩法是重建 Venba 母亲失传的食谱本：页面受损或缺失，你通过阅读上下文线索来弄清楚正确的食材和步骤。每道菜都解锁一段家庭生活小品。游戏跨越几十年，追随这家人经历欢乐、距离和文化断裂的安静悲伤。泰米尔音乐、特定的食物（桑巴尔、科祖卡泰、阿代）、食谱本中的手写笔记——每个细节都是具体的、经过打磨的。它售价约 15 美元，需要 90 分钟到 2 小时。2023 年最受讨论的独立游戏之一。被描述为"一顿用温暖填满你然后以最好的方式让你心碎的饭"。如果你曾经感受过你来自的世界和你生活的世界之间的隔阂，强烈推荐。',
    tip_en: "Pay close attention to the text around the damaged recipe pages — the clues for missing ingredients are always embedded in the surrounding family notes and letters.",
    tip_zh: '密切关注受损食谱页面周围的文字——缺失食材的线索总是嵌入在周围的家庭笔记和信件中。',
  },
  'strange-horticulture': {
    title_en: 'Strange Horticulture',
    title_zh: '奇异园艺',
    emoji: '🌿',
    tag_en: 'A Victorian herbalist mystery where you identify plants from botanical books and serve a fog-shrouded village',
    tag_zh: '维多利亚时代草药师谜题，你从植物学书籍识别草药，为薄雾中的村庄提供服务',
    platform_en: 'Available on: PC (Steam, GOG), Nintendo Switch — about $13',
    platform_zh: '可在以下平台获取：PC（Steam、GOG）、Nintendo Switch——约 13 美元',
    why_en:
      "Strange Horticulture (2022) is one of the most atmospheric puzzle games made in recent years. You inherit a herbalist shop in a fog-shrouded Victorian village called Undermere. Customers come in with problems — an illness, a strange request, a mystery — and you must identify the correct plant from your collection by cross-referencing botanical books, field journals, and maps. The identification mechanic is satisfying and tactile: you look at the plant's properties, consult your reference books, and make a judgment. The village has an unfolding mystery around a local cult, and your choices about who receives which plant can affect the story's outcome. The visual aesthetic is beautiful — warm candlelight, hand-drawn maps, aged paper textures. At 4-8 hours it takes longer than most short cozy games but rewards careful, unhurried play. One of the best discovery-type cozy games that rarely appears in 'best cozy games' lists despite being genuinely excellent.",
    why_zh:
      '奇异园艺（2022 年）是近年来氛围感最强的谜题游戏之一。你在一个叫做 Undermere 的薄雾维多利亚村庄里继承了一家草药师店铺。顾客带着问题前来——一种疾病、一个奇怪的请求、一个谜题——你必须通过交叉参考植物学书籍、田野日志和地图来从你的收藏中识别正确的植物。识别机制令人满足且触感真实：你查看植物的属性，查阅参考书籍，做出判断。这个村庄围绕着一个当地邪教展开了一个未解谜题，你关于谁获得哪种植物的选择会影响故事的结局。视觉美学很美——温暖的烛光、手绘地图、陈旧的纸张质感。4-8 小时的时长比大多数短篇 cozy 游戏更长，但能够奖励仔细、从容的游玩方式。尽管真正出色，却很少出现在"最佳 cozy 游戏"列表中的最佳发现型 cozy 游戏之一。',
    tip_en: "Use the map to track where your customers say they found plants or where events occurred — the geographic clues are as important as the botanical ones for solving the larger mystery.",
    tip_zh: '使用地图追踪你的顾客说他们在哪里发现植物或事件发生在哪里——地理线索与植物学线索对解决更大谜题同样重要。',
  },
  'lil-gator': {
    title_en: 'Lil Gator Game',
    title_zh: '小鳄鱼游戏',
    emoji: '🐊',
    tag_en: 'A 3-hour cozy adventure about being a small child playing pretend at a lake — pure warmth',
    tag_zh: '3 小时 cozy 冒险游戏，关于一个小孩在湖边玩假装游戏——纯粹的温暖',
    platform_en: 'Available on: PC (Steam), Nintendo Switch — about $15',
    platform_zh: '可在以下平台获取：PC（Steam）、Nintendo Switch——约 15 美元',
    why_en:
      "Lil Gator Game (2022) is one of the most consistently cheerful games ever made. You play as a small alligator who wants to go on an adventure with their big sister, but she is busy studying. So you gather the neighborhood kids and play pretend — every quest is a childhood imagination game, every 'enemy' is a cardboard box, every 'dungeon' is a playground structure. The movement feels wonderful: you can run, glide with your arms, slide down hills, and swing. The characters you meet all have charming personality and the game never lets you be sad for more than a moment. At 3-4 hours, it is a complete experience that begins and ends with warmth. The art style is lo-fi and colorful. One of the best games for adults who want to remember what pure play felt like, or for playing with a child. The game handles the theme of a sibling being too busy to play with great subtlety and care.",
    why_zh:
      '小鳄鱼游戏（2022 年）是有史以来最始终如一地充满欢乐的游戏之一。你扮演一只想要和姐姐一起冒险的小鳄鱼，但她正忙于学习。所以你聚集了邻居的孩子们一起玩假装游戏——每个任务都是儿时的想象力游戏，每个"敌人"都是纸板箱，每个"地下城"都是游乐场设施。移动感觉很棒：你可以跑步、张开手臂滑翔、滑下山坡和荡秋千。你遇到的角色都有迷人的个性，游戏从不让你难过超过一刻钟。3-4 小时，这是一个以温暖开始和结束的完整体验。美术风格低保真而多彩。对于想要记得纯粹游戏感觉的成年人，或者与孩子一起玩，这是最好的游戏之一。这款游戏以极大的微妙和关怀处理了哥哥姐姐太忙没时间陪玩的主题。',
    tip_en: "Try every movement ability on every terrain type — the glide, slide, and swing all have secret shortcuts through each area that make replaying feel completely different.",
    tip_zh: '在每种地形类型上尝试每种移动能力——滑翔、滑行和荡秋千都有穿越每个区域的秘密捷径，使重玩感觉完全不同。',
  },
  tinykin: {
    title_en: 'Tinykin',
    title_zh: 'Tinykin',
    emoji: '🔬',
    tag_en: 'A Pikmin-style adventure where you are thumb-sized and explore a single house as a vast alien world',
    tag_zh: '皮克敏风格冒险，你只有拇指大小，将一栋普通房屋作为广阔的异星世界探索',
    platform_en: 'Available on: PC (Steam, GOG, Epic), Nintendo Switch, PlayStation 4/5, Xbox — about $20',
    platform_zh: '可在以下平台获取：PC（Steam、GOG、Epic）、Nintendo Switch、PlayStation 4/5、Xbox——约 20 美元',
    why_en:
      "Tinykin (2022) is one of the most overlooked cozy games of recent years. You play as Milo, a space explorer who lands on Earth but is shrunk to thumbnail size. The game takes place entirely inside one suburban house — but at Milo's scale, the kitchen is a continent, the bathroom is an ocean, and the living room is a kingdom. You recruit an army of tiny creatures called Tinykin, each with different abilities: some can form bridges, some can carry heavy objects, some can explode walls. The core loop is using Tinykin creatively to solve puzzles and explore each room. The level design is exceptional — each room has intricate hidden paths, collectibles in unexpected places, and communities of insect-sized people with their own culture. At 8-12 hours it is a complete exploration experience. Often described as 'Pikmin meets Honey I Shrunk the Kids,' but Tinykin is warmer, more cozy, and less stressful than Pikmin's time-pressure mechanics. Available on most platforms.",
    why_zh:
      'Tinykin（2022 年）是近年来最被低估的 cozy 游戏之一。你扮演宇宙探索者米洛，他降落在地球后被缩小到拇指大小。游戏完全发生在一栋郊区房屋内部——但以米洛的体型，厨房是一片大陆，浴室是一片海洋，客厅是一个王国。你招募一支叫做 Tinykin 的微型生物军队，每种都有不同能力：一些可以形成桥梁，一些可以搬运重物，一些可以炸开墙壁。核心循环是创造性地使用 Tinykin 解决谜题和探索每个房间。关卡设计非常出色——每个房间都有错综复杂的隐藏路径、意想不到的收藏品，以及拥有自己文化的昆虫大小的人类社区。8-12 小时，这是一个完整的探索体验。常被描述为"皮克敏遇见缩小奇兵"，但 Tinykin 比皮克敏的时间压力机制更温暖、更 cozy、压力更小。可在大多数平台上获取。',
    tip_en: "Use soap bubbles as a movement tool throughout the whole game — they are not just for the bathroom level and will let you reach places that seem impossible from the ground.",
    tip_zh: '在整个游戏中将肥皂泡作为移动工具使用——它们不仅仅用于浴室关卡，还会让你到达从地面上看似不可能到达的地方。',
  },
}

function calcResult(answers: Pick[]): Pick {
  const counts: Record<Pick, number> = {
    venba: 0,
    'strange-horticulture': 0,
    'lil-gator': 0,
    tinykin: 0,
  }
  for (const a of answers) counts[a]++
  return Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0] as Pick
}

export function CozyShortAdventureQuiz({ locale }: { locale: string }) {
  const isZh = locale === 'zh'
  const [answers, setAnswers] = useState<(Pick | null)[]>(Array(QUESTIONS.length).fill(null))
  const [submitted, setSubmitted] = useState(false)

  const allAnswered = answers.every((a) => a !== null)

  if (submitted) {
    const result = RESULTS[calcResult(answers as Pick[])]
    const url = `${BASE_URL}/${locale}/quizzes/cozy-short-adventure`
    const shareText = isZh
      ? `我的短篇 Cozy 冒险推荐是「${result.title_zh}」！${result.tag_zh}。找到你的：${url}`
      : `My short cozy adventure match is ${result.title_en} — ${result.tag_en}. Find yours: ${url}`

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
            ? '你应该玩哪款短篇 Cozy 冒险游戏？'
            : 'Which Short Cozy Adventure Game Should You Play?'}
        </h1>
        <p className="text-sm text-[#8a9a7a]">
          {isZh
            ? '6 个问题，在 Venba、奇异园艺、小鳄鱼游戏和 Tinykin 中找到你的完美短篇 Cozy 体验'
            : '6 questions to find your match — Venba, Strange Horticulture, Lil Gator Game, or Tinykin. All under 12 hours, all distinctly cozy.'}
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
        {isZh ? '找到我的短篇 Cozy 冒险' : 'Find My Short Cozy Adventure'}
      </button>
    </div>
  )
}
