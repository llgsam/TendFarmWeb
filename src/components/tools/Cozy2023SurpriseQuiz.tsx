'use client'

import { useState } from 'react'
import { BASE_URL } from '@/lib/config'

type Pick = 'seasofstars' | 'hifirush' | 'chants' | 'jusant'

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
    q_en: 'What makes a game truly memorable for you beyond its genre?',
    q_zh: '超越类型标签，什么让一款游戏真正令你难忘？',
    options: [
      { en: 'An epic journey where the battles feel fair and the world feels alive — I want the JRPG experience done right', zh: '一段史诗旅程，战斗感觉公平而世界充满活力——我想要真正做好的 JRPG 体验', type: 'seasofstars' },
      { en: 'Pure creative genius — a concept so original I keep thinking about it days after finishing', zh: '纯粹的创意天才——一个如此原创的概念，让我在完成后几天还在思考', type: 'hifirush' },
      { en: 'The quiet satisfaction of understanding something I could not before — a slow-building intellectual reward', zh: '理解了之前无法理解的事物时的静谧满足感——一种缓慢积累的智识奖励', type: 'chants' },
      { en: 'A world that asks nothing but my presence — where just existing inside it is enough', zh: '一个只需要我存在的世界——单纯地活在其中就已足够', type: 'jusant' },
    ],
  },
  {
    q_en: 'How do you prefer your challenge?',
    q_zh: '你喜欢哪种类型的挑战？',
    options: [
      { en: 'Turn-based tactical — I want to think through each battle at my own pace with no time pressure', zh: '回合制战术——我想按自己的节奏思考每场战斗，没有时间压力', type: 'seasofstars' },
      { en: 'Rhythmic and reactive — I want to feel cool and musical as I fight, with a game that rewards timing over memorization', zh: '节奏感和反应性——我想在战斗中感到帅气和音乐性，奖励时机感而非记忆力', type: 'hifirush' },
      { en: 'Intellectual deduction — working through a language or puzzle system by observation and testing over many hours', zh: '智识推理——通过长时间的观察和测试来理解一套语言或谜题系统', type: 'chants' },
      { en: 'Physical navigation — choosing the best route up a sheer cliff, managing rope and stamina to find the path forward', zh: '物理导航——选择攀登陡峭崖壁的最佳路线，管理绳索和体力找到前进之路', type: 'jusant' },
    ],
  },
  {
    q_en: 'Which game world description draws you in most?',
    q_zh: '哪个游戏世界的描述最吸引你？',
    options: [
      { en: 'A hand-crafted pixel-art JRPG world lit by two suns and a moon, with ancient eclipse magic, diverse landscapes, and a cast of characters you will remember for years', zh: '一个由两个太阳和一个月亮照亮的手工制作像素艺术 JRPG 世界，有古老的日食魔法、多样的地形，以及你会记住多年的角色阵容', type: 'seasofstars' },
      { en: 'A corporate robotics campus where every machine, enemy, and sound effect pulses in sync with a punk-rock soundtrack — a world where music is physics', zh: '一个企业机器人园区，每台机器、每个敌人和每个音效都与朋克摇滚原声带同步脉动——一个音乐即物理的世界', type: 'hifirush' },
      { en: 'An ancient, multi-level tower inspired by the Tower of Babel, each floor inhabited by a civilization speaking a unique language you must decode from context clues and gestures', zh: '一座受巴别塔启发的古老多层塔，每层楼都有一个使用独特语言的文明，你必须从上下文线索和姿态中解码', type: 'chants' },
      { en: 'A post-flood vertical world where humanity has migrated upward to survive — a world of rope bridges, cliff faces, gusting wind, and absolute silence broken only by the sound of your own hands finding holds', zh: '一个洪水后的垂直世界，人类向上迁移以生存——一个有绳桥、悬崖面、阵阵风声的世界，只有你双手寻找抓点的声音打破沉默', type: 'jusant' },
    ],
  },
  {
    q_en: 'What role should story play in your ideal game?',
    q_zh: '故事在你理想的游戏中应该扮演什么角色？',
    options: [
      { en: 'Central and emotional — I want a full narrative with memorable characters, genuine emotional beats, and a satisfying conclusion', zh: '核心且有情感——我想要一个有令人难忘角色、真实情感节拍和令人满意结局的完整叙事', type: 'seasofstars' },
      { en: 'Present and comedic — I want personality, genuine humor, and heart in the writing without taking itself too seriously', zh: '存在且有喜剧性——我希望文字有个性、真正的幽默和温情，而不是过于严肃', type: 'hifirush' },
      { en: 'Environmental and archaeological — I want to piece together history from what I observe, with the revelation arriving slowly through my own deductions', zh: '环境的和考古式的——我想通过观察拼凑历史，启示通过我自己的推理缓缓到来', type: 'chants' },
      { en: 'Wordless and ambient — I want the world itself to be the story, told through atmosphere and architecture without dialogue or cutscenes', zh: '无言且氛围性的——我希望世界本身就是故事，通过氛围和建筑而非对话或过场动画来讲述', type: 'jusant' },
    ],
  },
  {
    q_en: 'What length of game feels most satisfying to you?',
    q_zh: '多长的游戏对你来说最令人满足？',
    options: [
      { en: '30-40 hours — a complete JRPG adventure that earns its length without padding, with enough content to feel epic', zh: '30-40 小时——一个完整的 JRPG 冒险，充分利用时长而不填充内容，有足够的内容让人感到史诗', type: 'seasofstars' },
      { en: '12-15 hours — a perfectly paced, complete experience I can finish comfortably in a week or two of evenings', zh: '12-15 小时——节奏完美、内容完整的体验，我可以在一到两周的晚上舒适地完成', type: 'hifirush' },
      { en: '10-15 hours — a focused experience that respects my time and delivers its best ideas without repetition', zh: '10-15 小时——一段专注的体验，尊重我的时间，不重复地呈现最好的创意', type: 'chants' },
      { en: '5-8 hours — a short, beautiful, complete meditation that leaves a lasting impression precisely because it knows when to end', zh: '5-8 小时——一段短暂、美丽、完整的冥想，恰恰因为知道何时结束而留下持久的印象', type: 'jusant' },
    ],
  },
  {
    q_en: 'Which feeling sounds like a perfect end-of-session moment?',
    q_zh: '哪种感觉听起来像是完美的游戏结束时刻？',
    options: [
      { en: 'I just cleared a boss I had struggled with by finally using the right combo of abilities — the strategy clicked and the victory felt earned', zh: '我刚刚用正确的技能组合通关了一个一直在挣扎的 Boss——策略豁然开朗，胜利来之不易', type: 'seasofstars' },
      { en: 'I just cleared a stage while perfectly parrying every beat — the whole fight felt like a music video I was part of', zh: '我刚刚在完美格挡每个节拍的同时通关了一个关卡——整场战斗感觉像是我参与其中的音乐录影带', type: 'hifirush' },
      { en: 'I just deciphered three lines of an ancient inscription and understood something the designers put there specifically for me to discover at this moment', zh: '我刚刚解读了三行古代铭文，理解了设计师特意放在那里等我在这一刻发现的东西', type: 'chants' },
      { en: 'I reached a summit I could not see from the valley floor — and the view at the top made me stop playing and just look for a full minute', zh: '我到达了从谷底看不到的山顶——山顶的景色让我停止游戏，静静地看了整整一分钟', type: 'jusant' },
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
  seasofstars: {
    title_en: 'Sea of Stars',
    title_zh: '星之海',
    emoji: '⭐',
    tag_en: 'A love letter to classic JRPGs — stunning pixel-art world lit by two suns and a moon, accessible turn-based combat, and a story that earns its emotional beats',
    tag_zh: '致经典 JRPG 的情书——由两个太阳和一个月亮照亮的惊艳像素艺术世界、平易近人的回合制战斗，以及一个真正触动情感的故事',
    platform_en: 'Available on: PC (Steam, GOG), Nintendo Switch, PS4, PS5, Xbox, Game Pass — about $35. Available day one on Game Pass.',
    platform_zh: '可在以下平台获取：PC（Steam、GOG）、Nintendo Switch、PS4、PS5、Xbox、Game Pass——约 35 美元。Game Pass 首日可玩。',
    why_en:
      "Sea of Stars (2023) is the best classic-style JRPG in over a decade — a game that grew from a Kickstarter project into one of the highest-rated indie games of 2023 (91 Metacritic). Set in the world of The Messenger (though completely standalone), you play as Solstice Warriors who use the power of the sun and moon to combat the alchemist Fleshmancer and his creations. The combat system is turn-based but alive: you can time your button presses to deal extra damage or reduce incoming hits, your characters each have distinct abilities that chain together, and the game never becomes a grind thanks to smartly designed encounters. The world is handcrafted with stunning pixel art — beaches, ruins, forests, mountaintops, and underwater cities each have their own visual identity. The music by Rainbowdragoneyes features a guest track by Yasunori Mitsuda (Chrono Trigger composer). Cozy gamers will appreciate: no random encounters (enemies visible on screen), frequent save points, adjustable difficulty, and a story with genuine warmth alongside its epic moments. The game pays tribute to SNES-era JRPGs while delivering modern accessibility. Available on Game Pass, making it easy to try risk-free.",
    why_zh:
      '星之海（2023 年）是十多年来最好的经典风格 JRPG——一款从 Kickstarter 项目成长为 2023 年评分最高的独立游戏之一（Metacritic 91 分）的作品。设定在 The Messenger 的世界中（但完全独立），你扮演使用太阳和月亮力量与炼金术师 Fleshmancer 及其创造物战斗的至日战士。战斗系统是回合制但富有活力：你可以掌握按键时机来造成额外伤害或减少受到的打击，每个角色都有独特的技能可以连锁，游戏因精心设计的遭遇战而从不变成磨练。世界用惊艳的像素艺术精心制作——海滩、遗迹、森林、山顶和水下城市各有独特的视觉特征。音乐由 Rainbowdragoneyes 创作，包含 Yasunori Mitsuda（《超时空触媒》作曲家）的客串曲目。Cozy 玩家会欣赏：没有随机遭遇战（敌人在屏幕上可见）、频繁的存档点、可调节的难度，以及在史诗时刻中充满真实温情的故事。Game Pass 上可用，让试玩变得风险极低。',
    tip_en: "Always time your Timed Hits (a ring appears — press the button when it shrinks to the inner circle) — they deal significantly more damage than untimed hits. Similarly, blocking works the same way. The timing window is generous early game; getting in the habit from the start makes the later game much more enjoyable.",
    tip_zh: '始终掌握计时攻击的时机（出现一个圆环——当它收缩到内圆时按下按键）——它们造成的伤害明显高于非计时攻击。同样，格挡也以相同方式工作。游戏早期的时机窗口很宽裕；从一开始就养成习惯会让后期游戏更加愉快。',
  },
  hifirush: {
    title_en: 'Hi-Fi Rush',
    title_zh: 'Hi-Fi Rush',
    emoji: '🎸',
    tag_en: 'A rhythm-action game where EVERYTHING pulses to the beat — combat, environment, enemies, dialogue — with a Jet Set Radio visual style and genuinely funny writing',
    tag_zh: '一款一切都随节拍脉动的节奏动作游戏——战斗、环境、敌人、对话——拥有 Jet Set Radio 视觉风格和真正幽默的文字',
    platform_en: 'Available on: PC (Steam, Xbox Game Pass), Xbox Series X/S — about $30. Day-one on Game Pass. Mac via Steam.',
    platform_zh: '可在以下平台获取：PC（Steam、Xbox Game Pass）、Xbox Series X/S——约 30 美元。Game Pass 首日可玩。Mac 版通过 Steam 获取。',
    why_en:
      "Hi-Fi Rush (2023) is one of the biggest surprise hits in recent gaming history — a game that was secretly developed and dropped with zero warning in January 2023, instantly becoming one of the most celebrated games of the year (87 Metacritic, 95% Steam positive). You play as Chai, an aspiring rock star who accidentally gets a music player fused into his chest during a cybernetic enhancement procedure, causing the entire world to pulse in sync with the beat. Combat involves slashing and dodging in rhythm, with every attack, environmental element, and enemy attack pattern synced to the soundtrack. The visual style is cel-shaded with a Jet Set Radio aesthetic; the writing is genuinely and consistently funny (not trying-to-be-funny, actually funny). Cozy gamers will appreciate: colorful art style, generous accessibility options, no required precision (you can play completely off-beat and still win — rhythm rewards you with extra damage but doesn't punish you for missing), and an energetic cast of characters you will become genuinely fond of. Available on Game Pass and on Mac via Steam. 12-15 hours perfectly paced. One of the most joyful gaming experiences in years.",
    why_zh:
      'Hi-Fi Rush（2023 年）是近年来游戏界最大的意外惊喜之一——一款秘密开发并在 2023 年 1 月毫无预警地发布的游戏，立即成为当年最受赞誉的游戏之一（Metacritic 87 分，Steam 好评率 95%）。你扮演 Chai，一个在赛博增强手术中意外将音乐播放器融入胸口的摇滚明星志望者，导致整个世界与节拍同步脉动。战斗涉及随节奏进行斩击和闪避，每次攻击、每个环境元素和每个敌人的攻击模式都与原声带同步。视觉风格是单色调着色的 Jet Set Radio 美学；文字是真正且一贯幽默的（不是试图幽默，而是真的幽默）。Cozy 玩家会欣赏：多彩的艺术风格、慷慨的无障碍选项、不需要精准（你可以完全不随节拍游戏仍然获胜——节奏给你额外伤害奖励但不惩罚你的失误），以及你会真正喜欢上的充满活力的角色阵容。Game Pass 上可用，Mac 版通过 Steam 获取。12-15 小时节奏完美。近年来最令人愉悦的游戏体验之一。',
    tip_en: "Don't worry about keeping perfect rhythm — accessibility options mean missing beats never stops your run. Focus on learning the core combo (three swings into a finisher) early, then gradually start trying to time your attacks to the music. The game rewards rhythm with bonus damage, and when it clicks you feel like a music video protagonist.",
    tip_zh: '不要担心保持完美的节奏——无障碍选项意味着错过节拍永远不会停止你的战斗。专注于早期学习核心连击（三次挥砍接终结技），然后逐渐开始尝试将你的攻击与音乐同步。游戏用额外伤害奖励节奏感，当你掌握它时，你会感觉像是音乐录影带的主角。',
  },
  chants: {
    title_en: 'Chants of Sennaar',
    title_zh: '塞纳尔圣歌',
    emoji: '📜',
    tag_en: 'Decipher the languages of several ancient civilizations in a Babel-inspired tower — a puzzle game about understanding, not combat, where every solved glyph unlocks a deeper mystery',
    tag_zh: '在一座受巴别塔启发的塔中解密几个古代文明的语言——一款关于理解而非战斗的谜题游戏，每解开一个象形文字都会揭示更深的谜题',
    platform_en: 'Available on: PC (Steam, GOG), Nintendo Switch, PS4, PS5, Xbox, Game Pass — about $20',
    platform_zh: '可在以下平台获取：PC（Steam、GOG）、Nintendo Switch、PS4、PS5、Xbox、Game Pass——约 20 美元',
    why_en:
      "Chants of Sennaar (2023) is the most original puzzle game in years — a game where the core mechanic is deciphering languages from scratch, and the reward is understanding. Inspired by the Tower of Babel myth, you ascend through a multi-level tower where each floor is inhabited by a civilization that cannot communicate with the others. You have no guidebook: you observe context (a figure points at a door and says something, you infer the glyph means 'door'), draw your own glossary, and gradually unlock deeper meaning. The game never tells you if your interpretation is right — it just becomes useful or fails to be useful. When you make a breakthrough and a formerly incomprehensible sentence suddenly becomes clear, the satisfaction is unlike almost any other game experience. Visually it uses a striking Art Deco illustration style; aurally the ambient music is deeply atmospheric. Stealth sections (avoiding guards) can be skipped entirely on lower difficulty. Total playtime is 10-15 hours without feeling padded. A 2024 BAFTA nominee for Best Game. Perfect for puzzle game lovers who want something completely original.",
    why_zh:
      '塞纳尔圣歌（2023 年）是近年来最具原创性的谜题游戏——一款核心机制是从零开始破译语言，奖励是理解的游戏。受巴别塔神话启发，你攀登一座多层塔，每层楼都住着一个无法与其他文明交流的文明。你没有指南：你观察上下文（一个人物指着门说了些什么，你推断那个象形文字意味着"门"），绘制你自己的词汇表，并逐渐解锁更深的含义。游戏从不告诉你你的解释是否正确——它只是变得有用或无法使用。当你取得突破，一个以前无法理解的句子突然变得清晰时，那种满足感与几乎任何其他游戏体验都不同。视觉上使用引人注目的装饰艺术插画风格；听觉上氛围音乐极具感染力。潜行部分（避开守卫）可以在较低难度完全跳过。总游戏时间为 10-15 小时，不感到填充。2024 年 BAFTA 最佳游戏提名。适合想要完全原创内容的谜题游戏爱好者。',
    tip_en: "Keep your symbol notebook actively updated — the game gives you a Rosetta Stone-style interface to record what you think each glyph means. Guess freely and revise as you learn more. Some symbols have meanings you will interpret incorrectly at first; updating your mental model is part of the process, not a failure.",
    tip_zh: '积极更新你的符号笔记本——游戏给你一个罗塞塔石碑式的界面来记录你认为每个象形文字的含义。大胆猜测并随着学习更多而修正。有些符号的含义你一开始会解读错误；更新你的思维模型是过程的一部分，而不是失败。',
  },
  jusant: {
    title_en: 'Jusant',
    title_zh: 'Jusant',
    emoji: '🧗',
    tag_en: 'A meditative rock-climbing adventure in a post-flood vertical world — no combat, no dialogue, no objectives other than upward — just rope, wind, and the sound of your hands finding holds',
    tag_zh: '一场在洪水后垂直世界中的冥想式攀岩冒险——没有战斗、没有对话、没有目标，只有向上——只有绳索、风声和你双手寻找抓点的声音',
    platform_en: 'Available on: PC (Steam), Xbox Series X/S, Xbox Game Pass — about $25. Game Pass day one.',
    platform_zh: '可在以下平台获取：PC（Steam）、Xbox Series X/S、Xbox Game Pass——约 25 美元。Game Pass 首日可玩。',
    why_en:
      "Jusant (2023) is the most meditative game of recent years — a climbing adventure developed by Don't Nod (Life is Strange) where the entire goal is ascending a massive tower that was once coastal but now sits stranded after a vast flood has receded, leaving behind evidence of civilizations that once lived there. You play as a nameless climber with a small companion, using your two triggers to grip left and right handholds as you ascend cliffs, swing on rope anchors, manage your stamina bar, and find paths through the vertical world. There is no combat, no death from falling (you snap back to your last anchor), no timer, no score. The pleasure is entirely in the physicality of movement — planning your route, finding the rhythm of climbing, and pausing at ledges to take in views that reveal more of the world's lost history. Notes and items left by previous inhabitants let you piece together what the world was before the water came. At 5-8 hours it is a perfectly sized experience. Available day one on Game Pass. An ideal game for players who want something beautiful, unhurried, and unlike anything else.",
    why_zh:
      'Jusant（2023 年）是近年来最具冥想性的游戏——由 Don\'t Nod（《奇异人生》）开发的攀岩冒险，整个目标是攀登一座曾经临海但在大洪水退去后遗留下来的巨塔，保留着曾经居住在那里的文明的痕迹。你扮演一个无名攀登者和一个小伙伴，使用两个扳机键抓住左右把手，攀登悬崖、在绳锚上摆荡、管理耐力条，并在垂直世界中找到路径。没有战斗、没有因坠落死亡（你会被弹回到最后一个锚点）、没有计时器、没有分数。乐趣完全在于移动的身体感——规划你的路线、找到攀登的节奏，以及在岩架上暂停欣赏展示更多世界失落历史的景色。前任居民留下的笔记和物品让你拼凑出水来之前世界的样子。5-8 小时的体验大小恰到好处。Game Pass 首日可用。对于想要美丽、从容、与众不同体验的玩家来说是理想游戏。',
    tip_en: "Use your rope anchors liberally — they are your safety net and cost nothing. When you see an anchor point, clip in before attempting a difficult traverse. The climbing controls take 10-15 minutes to become intuitive; if the first cliff feels awkward, persist through the first area and the physicality will click.",
    tip_zh: '大量使用你的绳索锚点——它们是你的安全网，不花费任何东西。当你看到锚点时，在尝试困难横移之前先挂上。攀登控制需要 10-15 分钟才能变得直觉化；如果第一个悬崖感觉别扭，坚持通过第一个区域，身体感会豁然开朗。',
  },
}

function calcResult(answers: Pick[]): Pick {
  const counts: Record<Pick, number> = { seasofstars: 0, hifirush: 0, chants: 0, jusant: 0 }
  for (const a of answers) counts[a]++
  return Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0] as Pick
}

export function Cozy2023SurpriseQuiz({ locale }: { locale: string }) {
  const isZh = locale === 'zh'
  const [answers, setAnswers] = useState<(Pick | null)[]>(Array(QUESTIONS.length).fill(null))
  const [submitted, setSubmitted] = useState(false)

  const allAnswered = answers.every((a) => a !== null)

  if (submitted) {
    const result = RESULTS[calcResult(answers as Pick[])]
    const url = `${BASE_URL}/${locale}/quizzes/cozy-2023-surprise-hits`
    const shareText = isZh
      ? `2023 年 Cozy 玩家意外爱上的游戏测验结果：「${result.title_zh}」！${result.tag_zh}。找到你的：${url}`
      : `My 2023 surprise hit for cozy gamers: ${result.title_en} — ${result.tag_en}. Find yours: ${url}`

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
              {isZh ? '入门建议：' : 'Getting started: '}
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
            ? '哪款 2023 精品会让 Cozy 玩家意外爱上？'
            : 'Which 2023 Game Would a Cozy Gamer Unexpectedly Love?'}
        </h1>
        <p className="text-sm text-[#8a9a7a]">
          {isZh
            ? '6 个问题，从星之海、Hi-Fi Rush、塞纳尔圣歌、Jusant 中找到你的年度惊喜之作'
            : '6 questions to match you with Sea of Stars, Hi-Fi Rush, Chants of Sennaar, or Jusant — four acclaimed 2023 games with strong cozy appeal'}
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
        {isZh ? '找到我的 2023 年度惊喜游戏' : 'Find My 2023 Surprise Hit'}
      </button>
    </div>
  )
}
