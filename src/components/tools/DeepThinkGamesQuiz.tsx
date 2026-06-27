'use client'

import { useState } from 'react'
import { BASE_URL } from '@/lib/config'

type Pick = 'hollow' | 'inscryption' | 'forgotten' | 'pentiment'

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
    q_en: 'What pulls you into a game most powerfully?',
    q_zh: '什么最能把你吸引进一款游戏？',
    options: [
      { en: 'A world so dense with mystery that every room hints at a history I want to uncover — and the exploration loop keeps rewarding me with new areas for hours', zh: '一个充满谜题的世界，每个房间都暗示着我想要探索的历史——探索循环不断以新区域回报我，持续数小时', type: 'hollow' },
      { en: 'A premise so strange that I genuinely do not know where it is going — and then it pulls the rug out completely, and I sit back and say "what just happened"', zh: '一个奇特到我真的不知道走向的前提——然后它完全颠覆了一切，让我坐在那里说"刚才发生了什么"', type: 'inscryption' },
      { en: 'A tightly designed puzzle where I control one variable — time — and must figure out the rules of the world by replaying the same day with different knowledge', zh: '一个我控制单一变量——时间——的精密谜题，必须通过带着不同知识重玩同一天来弄清世界的规则', type: 'forgotten' },
      { en: 'A historical world so carefully researched that reading dialogue feels like archaeology — and my choices shape how an actual person\'s story ends across decades', zh: '一个经过精心研究的历史世界，阅读对话感觉就像考古——我的选择塑造了一个真实人物跨越数十年的故事结局', type: 'pentiment' },
    ],
  },
  {
    q_en: 'How do you feel about combat as a core mechanic?',
    q_zh: '你对战斗作为核心机制的态度是什么？',
    options: [
      { en: 'I want combat that is precise, fair, and deeply satisfying to master — difficult bosses that teach me their patterns until I beat them cleanly', zh: '我想要精准、公平、精通后极其令人满足的战斗——困难的 Boss 教我它们的模式，直到我流畅地击败它们', type: 'hollow' },
      { en: 'I want card game mechanics where every decision in a battle is a strategic puzzle — resource management, risk calculation, no reflex required', zh: '我想要卡牌游戏机制，每次战斗中的每个决策都是战略谜题——资源管理、风险计算，不需要反应速度', type: 'inscryption' },
      { en: 'I want no combat at all — pure dialogue, exploration, and deduction. If I make a mistake I want to rewind time rather than lose a fight', zh: '我完全不想要战斗——纯对话、探索和推理。如果我犯错，我想倒回时间而不是输掉战斗', type: 'forgotten' },
      { en: 'I want no combat — pure narrative choices where the weight of consequence comes from what I said to someone ten chapters ago, not from sword swings', zh: '我不想要战斗——纯叙事选择，后果的重量来自我十章前对某人说的话，而不是剑的挥舞', type: 'pentiment' },
    ],
  },
  {
    q_en: 'Which atmosphere sounds most appealing for a long play session?',
    q_zh: '哪种氛围最适合你长时间游玩？',
    options: [
      { en: 'A vast underground kingdom of ruined civilizations, ancient temples, and strange creatures — melancholy and beautiful, with a profound sense of history in every corner', zh: '一个废墟文明、古老神庙和奇异生物的广阔地下王国——忧郁而美丽，每个角落都有深刻的历史感', type: 'hollow' },
      { en: 'A dark cabin in the woods where you are playing a card game against something that is watching you — strange, unsettling, with layers of meta-horror that unfold slowly', zh: '森林中的黑暗小屋，你在和某个正在注视你的东西玩卡牌——奇怪、令人不安，缓慢展开的元恐怖层次', type: 'inscryption' },
      { en: 'The sunlit streets and forums of ancient Rome, frozen in a single day that repeats — classical architecture, toga-clad characters, and a mystery where everyone is both victim and suspect', zh: '古罗马阳光明媚的街道和广场，被冻结在重复的单日中——古典建筑、身着托加的人物，以及一个每个人既是受害者又是嫌疑人的谜题', type: 'forgotten' },
      { en: 'A hand-painted 16th-century Bavarian monastery town, illustrated in the style of a medieval manuscript — historically accurate characters living real lives in a real crisis', zh: '手绘的 16 世纪巴伐利亚修道院小镇，以中世纪手稿风格绘制——历史上真实的人物在真实的危机中生活', type: 'pentiment' },
    ],
  },
  {
    q_en: 'How much time are you willing to invest for the full experience?',
    q_zh: '你愿意投入多少时间获得完整体验？',
    options: [
      { en: '40-60+ hours — a vast world I can get deeply lost in, with optional areas, hidden lore, and multiple endings I might never see on a first playthrough', zh: '40-60+ 小时——一个我可以深深迷失其中的广阔世界，有可选区域、隐藏传说和我第一次游玩可能永远看不到的多个结局', type: 'hollow' },
      { en: '8-12 hours — a tightly designed experience where the revelation pays off specifically because it fits in one intense sitting, not because it is short', zh: '8-12 小时——一个精心设计的体验，揭示的价值在于它适合一次紧凑的游玩，而不仅仅是因为它短', type: 'inscryption' },
      { en: '6-10 hours — a complete, satisfying story where I will replay specific sections to test different dialogue choices and see how the mystery resolves differently', zh: '6-10 小时——一个完整、令人满足的故事，我会重玩特定章节来测试不同的对话选择，看看谜题如何以不同方式解决', type: 'forgotten' },
      { en: '8-12 hours — a slow, deliberate narrative that respects my time while rewarding every hour with new character development and historical depth', zh: '8-12 小时——一个缓慢、深思熟虑的叙事，尊重我的时间，同时用新的角色发展和历史深度回报每一小时', type: 'pentiment' },
    ],
  },
  {
    q_en: 'How do you want the game to challenge you?',
    q_zh: '你想让游戏如何挑战你？',
    options: [
      { en: 'Muscle memory and spatial reasoning — learning enemy patterns, navigating a complex interconnected map without a guide, mastering movement to access new areas', zh: '肌肉记忆和空间推理——学习敌人模式、不用攻略在复杂的互联地图中导航、掌握移动以进入新区域', type: 'hollow' },
      { en: 'Strategic thinking under pressure — managing a deck of cards with limited resources against opponents whose patterns I need to decode before I run out of options', zh: '在压力下进行战略思考——用有限资源管理一副牌对抗对手，需要在用尽选项之前解码他们的模式', type: 'inscryption' },
      { en: 'Deductive reasoning — remembering what I learned in a previous loop, identifying which characters know what, and crafting the perfect sequence of conversations to solve the central crime', zh: '演绎推理——记住我在上一轮循环中学到的内容，识别哪些角色知道什么，精心安排完美的对话顺序来解决核心案件', type: 'forgotten' },
      { en: 'Ethical reasoning — making decisions about historical figures in a real crisis where every choice has consequences I cannot fully predict, and where there is no clean right answer', zh: '道德推理——在真实危机中对历史人物做出决定，每个选择都有我无法完全预测的后果，且没有干净的正确答案', type: 'pentiment' },
    ],
  },
  {
    q_en: 'Which post-credits feeling appeals to you most?',
    q_zh: '哪种通关后的感觉最吸引你？',
    options: [
      { en: 'I sat with the ending for a while — the world\'s history unfolded in the final moments in a way that recontextualized everything I saw, and now I want to read every piece of lore I missed', zh: '我独坐了一会儿——世界的历史在最后时刻以重新诠释我所见一切的方式展开，现在我想阅读每一段我错过的传说', type: 'hollow' },
      { en: 'I immediately wanted to call someone and talk through what had just happened — a game that feels like a shared secret with everyone who has played it', zh: '我立刻想打电话给某人讨论刚才发生的事情——一款感觉像是与每位玩过它的人共享秘密的游戏', type: 'inscryption' },
      { en: 'A warm sense of resolution — I understood the crime, I saw the final golden rule play out, and the ancient Roman world felt genuinely real for the hours I spent in it', zh: '温暖的解决感——我理解了犯罪，看到最终的黄金法则展开，我在其中度过的数小时让古罗马世界感觉真实存在', type: 'forgotten' },
      { en: 'A quiet kind of sadness — I watched people live and die across thirty years and felt the weight of the choices I made for them, knowing some consequences were never undone', zh: '一种平静的悲伤——我看着人们跨越三十年的生死，感受到我为他们所做选择的分量，知道一些后果永远无法撤销', type: 'pentiment' },
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
  hollow: {
    title_en: 'Hollow Knight',
    title_zh: '空洞骑士',
    emoji: '🪲',
    tag_en: 'A vast underground kingdom of ruined insect civilizations — one of the deepest metroidvania games ever made, with 40+ hours of exploration, challenging combat, and melancholy lore',
    tag_zh: '昆虫废墟文明的广阔地下王国——有史以来最深度的银河城游戏之一，40+ 小时探索、充满挑战的战斗和忧郁的传说',
    platform_en: 'Available on: PC (Steam, GOG), Nintendo Switch, PS4, PS5, Xbox — about $15. An outstanding value.',
    platform_zh: '可在以下平台获取：PC（Steam、GOG）、Nintendo Switch、PS4、PS5、Xbox——约 15 美元。极高性价比。',
    why_en:
      "Hollow Knight (2017) is Team Cherry's handcrafted masterpiece — a metroidvania set in the vast underground kingdom of Hallownest, a once-great insect civilization now in ruin. You play as the Knight, a small silent warrior who descends into the depths to discover what happened to Hallownest and why it fell. The game is enormous: 40+ hours to complete the main story, with optional bosses and areas that can extend to 60+ hours for completionists. The combat is precise and demanding — every boss has attack patterns you must learn through deaths and attempts, and beating a difficult boss is one of the most satisfying feelings in gaming. The world is dense with environmental storytelling — you piece together Hallownest's history from fragments of NPC dialogue, item descriptions, and visual design rather than cutscenes. The art direction is hauntingly beautiful: all hand-drawn in a dark, melancholy watercolor style. At about $15, it is one of the best-value games ever made. For cozy gamers: the exploration loop (unlocking new traversal abilities that open new areas) is deeply familiar from games like Stardew Valley's skill progression — it just happens at a much higher difficulty.",
    why_zh:
      '空洞骑士（2017 年）是 Team Cherry 的手工艺品——一款银河城游戏，设定在曾经伟大的昆虫文明荒原王国的广阔地下世界。你扮演骑士，一个沉默的小战士，潜入深处探索荒原发生了什么以及为什么衰落。游戏规模巨大：完成主线故事需要 40+ 小时，可选 Boss 和区域可以让收集爱好者游玩 60+ 小时。战斗精准且要求高——每个 Boss 都有你必须通过死亡和尝试来学习的攻击模式，击败困难 Boss 是游戏中最令人满足的感受之一。世界充满环境叙事——你从 NPC 对话片段、物品描述和视觉设计中拼凑荒原的历史。约 15 美元，是有史以来性价比最高的游戏之一。',
    tip_en: "Do not look up maps or guides on your first playthrough — the joy of discovery is the whole point, and Hollow Knight is designed to be navigated by feel. Mark areas with the map pins when you find locked doors (the game tells you when you need a new ability). The Mothwing Cloak (first major movement upgrade) is the unlock that opens the game up. If a boss is too hard, explore other areas first — you almost always have somewhere else to go.",
    tip_zh: '第一次游玩不要查地图或攻略——发现的乐趣是核心，空洞骑士设计成靠感觉导航。当你发现锁住的门时用地图标记（游戏会告诉你何时需要新能力）。飞蛾翼斗篷（第一个主要移动升级）是打开游戏的关键解锁。如果 Boss 太难，先探索其他区域——几乎总有其他地方可以去。',
  },
  inscryption: {
    title_en: 'Inscryption',
    title_zh: 'Inscryption',
    emoji: '🃏',
    tag_en: 'A card game that is also a cabin escape puzzle that is also a meta-horror deconstruction of gaming itself — one of the most original games of the past decade',
    tag_zh: '一款卡牌游戏，也是小屋逃脱谜题，也是对游戏本身的元恐怖解构——过去十年最具原创性的游戏之一',
    platform_en: 'Available on: PC (Steam), PS4, PS5 — about $20. Won IGF Grand Prize 2022.',
    platform_zh: '可在以下平台获取：PC（Steam）、PS4、PS5——约 20 美元。获得 2022 年 IGF 大奖。',
    why_en:
      "Inscryption (2021) by Daniel Mullins is almost impossible to describe without spoiling, which is itself part of its appeal. It begins as a roguelike deckbuilding card game set in a dark cabin — you play against a mysterious figure, using cards of woodland creatures (squirrels, wolves, stoats) in strategic battles where blood sacrifice is the core resource mechanic. But the cabin is also a puzzle: you can get up from the table, explore the room, and discover objects that affect the card game in unexpected ways. And then the game does something extraordinary that I will not describe, except to say that every layer you think is the game turns out to be a wrapper for something stranger beneath it. Metacritic score 85 on PC. For cozy gamers who loved the meta-elements of games like Tunic (also used) or who want a game that makes them feel like the rules of the medium itself are bending: Inscryption is that experience at its most committed. It won the Grand Prize at the Independent Games Festival in 2022 — the highest honor in independent games.",
    why_zh:
      'Inscryption（2021 年）由 Daniel Mullins 开发，几乎无法在不剧透的情况下描述，这本身就是其吸引力的一部分。游戏以一个黑暗小屋中的 Roguelike 卡组构建卡牌游戏开始——你与一个神秘人物对战，使用林地生物卡（松鼠、狼、黄鼠狼）在以血液献祭为核心资源机制的战略战斗中。但小屋也是一个谜题：你可以起身离开桌子，探索房间，发现以意想不到方式影响卡牌游戏的物品。然后游戏做了一件非凡的事……PC 版 Metacritic 评分 85，2022 年 IGF 大奖得主。',
    tip_en: "Play your first run without any foreknowledge — every discovery is the experience. If you lose a run in the cabin phase (you will, several times), pay attention to what the Leshy says and what changes: losing is part of learning the systems. Some of the cabin puzzles require finding physical objects in the room; if you are stuck, stand up from the table and look around. The card game is deeper than it first appears — teeth as a currency and blood sacrifice chains are the advanced systems.",
    tip_zh: '第一次游玩不要提前了解任何信息——每个发现都是体验。如果你在小屋阶段输了一轮（你会的，会输好几次），注意 Leshy 说了什么以及什么发生了变化：失败是学习系统的一部分。一些小屋谜题需要在房间里找到实物对象；如果你卡住了，起身离开桌子四处看看。卡牌游戏比最初看起来更深——牙齿作为货币和血液献祭链是高级系统。',
  },
  forgotten: {
    title_en: 'The Forgotten City',
    title_zh: '被遗忘的城市',
    emoji: '🏛️',
    tag_en: 'A Skyrim mod turned standalone game — you are trapped in a time loop in an ancient Roman city where a single sin will kill everyone, and you must solve the mystery using only knowledge from previous loops',
    tag_zh: '一款 Skyrim 模组变成独立游戏——你被困在古罗马城市的时间循环中，单一的罪孽将杀死所有人，你必须仅凭前一次循环的知识解开谜题',
    platform_en: 'Available on: PC (Steam), Nintendo Switch, PS4, PS5, Xbox, Xbox Game Pass — about $25',
    platform_zh: '可在以下平台获取：PC（Steam）、Nintendo Switch、PS4、PS5、Xbox、Xbox Game Pass——约 25 美元',
    why_en:
      "The Forgotten City (2021) began as a Skyrim mod that won a Writer's Guild Award before being rebuilt as a standalone game — the only video game to win that award in competition with film and television. You are a time-traveler transported to a mysterious Roman city hidden underground, where 23 people are trapped by an ancient curse: if anyone commits a sin, golden statues awaken and kill everyone. Each time you solve part of the mystery, you reset the loop and use that knowledge — a golden item from this run, a key you know the location of, a conversation that changes an NPC's behavior — to go further in the next. The writing is exceptional: each NPC is a fully realized person with a backstory, and uncovering their secrets (some who are hiding sins, some innocent, some complex) is the game's heart. The mystery has four different endings, and the true ending requires synthesizing everything you learned across all loops. Available on Xbox Game Pass — about 8 hours for a first playthrough, more for completionists.",
    why_zh:
      '被遗忘的城市（2021 年）最初是一个赢得编剧协会奖的 Skyrim 模组，后被重建为独立游戏——唯一一款与电影和电视竞争并赢得该奖项的电子游戏。你是一个被传送到隐藏在地下的神秘罗马城市的时间旅行者，23 个人被古代诅咒困住：如果任何人犯罪，黄金雕像就会苏醒并杀死所有人。每次你解开谜题的一部分，你重置循环并使用知识——这次循环的黄金物品、你知道位置的钥匙、改变 NPC 行为的对话——在下一次循环中走得更远。写作出色：每个 NPC 都是有完整背景故事的人物。Xbox Game Pass 可玩，第一次游玩约 8 小时。',
    tip_en: "Keep a mental (or physical) note of every golden statue you see — their locations tell you who has been killed in previous loops and hint at which characters have sins to hide. The most powerful items from each loop carry forward when you reset; prioritize finding the golden items early. Talk to every NPC multiple times in your first loop even if the dialogue runs out — some conversations only trigger after specific story beats happen elsewhere in the city.",
    tip_zh: '记住（精神上或实物上）你看到的每个黄金雕像——它们的位置告诉你哪些人在之前的循环中被杀，并暗示哪些角色有罪要隐藏。每次循环中最强力的物品在你重置时会保留；优先早期找到黄金物品。第一次循环与每个 NPC 多次对话，即使对话用尽——一些对话只在城市其他地方发生特定剧情点后触发。',
  },
  pentiment: {
    title_en: 'Pentiment',
    title_zh: 'Pentiment',
    emoji: '📜',
    tag_en: 'A narrative mystery set in a 16th-century Bavarian monastery, illustrated as a living medieval manuscript — your choices determine who is accused of murder and how real lives unfold across three decades',
    tag_zh: '一款设定在 16 世纪巴伐利亚修道院的叙事谜题，以活历史手稿风格绘制——你的选择决定谁被指控谋杀，以及真实生命如何在三十年间展开',
    platform_en: 'Available on: PC (Steam, GOG), Xbox, Xbox Game Pass — about $20. Developed by Obsidian Entertainment.',
    platform_zh: '可在以下平台获取：PC（Steam、GOG）、Xbox、Xbox Game Pass——约 20 美元。由 Obsidian Entertainment 开发。',
    why_en:
      "Pentiment (2022) is Obsidian Entertainment's most personal and unusual game — a narrative mystery set in the Bavarian town of Tassing during the Protestant Reformation, illustrated in the style of an illuminated medieval manuscript. You play as Andreas Maler, an itinerant artist completing a Master Work commission at the local monastery, who becomes entangled in a murder investigation. The game spans three acts across 25 years, and your choices in Act One — who you accuse, who you befriend, what you study — cast long shadows into Acts Two and Three as you see the consequences ripple through the town's history. The writing is the game: every character speaks in a dialect appropriate to their education and station, the text itself changes font when different characters speak, and the historical detail (drawn from game director Josh Sawyer's years of research into medieval life) is extraordinary. No combat, no stat systems — pure dialogue, choices, and consequence. Available on Xbox Game Pass. Won multiple awards for narrative and writing in 2022. For players who want their games to feel like great historical fiction.",
    why_zh:
      'Pentiment（2022 年）是 Obsidian Entertainment 最个人化、最不寻常的游戏——一款设定在新教改革期间巴伐利亚小镇 Tassing 的叙事谜题，以彩绘中世纪手稿风格绘制。你扮演漫游艺术家 Andreas Maler，在当地修道院完成一项大师级委托，并卷入谋杀调查。游戏跨越三幕 25 年，你在第一幕的选择——你指控谁、你与谁交好、你研究什么——在第二幕和第三幕中投下长长的阴影，你看到后果在小镇历史中涟漪般扩散。写作就是游戏。Xbox Game Pass 可玩，2022 年获多项叙事和写作奖项。',
    tip_en: "Read every book and document Andreas can access in the scriptorium — they seem optional but they change how the murder investigation unfolds and unlock unique dialogue options that closed-off characters respond to. In Act One, who you spend time with matters: the characters you know well are those whose lives you will follow for the next 25 years, so invest in the relationships that interest you most. There is no correct accusation — every possible answer is supported by the evidence, and the game knows this. The point is the choice, not the solution.",
    tip_zh: '阅读 Andreas 在缮写室可以访问的每本书和文件——它们看起来是可选的，但它们改变谋杀调查的进展，并解锁封闭角色会响应的独特对话选项。在第一幕，你花时间与谁在一起很重要：你熟知的角色是你在未来 25 年将跟随其生活的人，所以投资于你最感兴趣的关系。没有正确的指控——每个可能的答案都有证据支持，游戏也知道这一点。重点是选择，而不是解决方案。',
  },
}

function calcResult(answers: Pick[]): Pick {
  const counts: Record<Pick, number> = { hollow: 0, inscryption: 0, forgotten: 0, pentiment: 0 }
  for (const a of answers) counts[a]++
  return Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0] as Pick
}

export function DeepThinkGamesQuiz({ locale }: { locale: string }) {
  const isZh = locale === 'zh'
  const [answers, setAnswers] = useState<(Pick | null)[]>(Array(QUESTIONS.length).fill(null))
  const [submitted, setSubmitted] = useState(false)

  const allAnswered = answers.every((a) => a !== null)

  if (submitted) {
    const result = RESULTS[calcResult(answers as Pick[])]
    const url = `${BASE_URL}/${locale}/quizzes/deep-think-games-quiz`
    const shareText = isZh
      ? `深度思考游戏推荐测验结果：「${result.title_zh}」！${result.tag_zh}。找到你的：${url}`
      : `My deep-think game recommendation: ${result.title_en} — ${result.tag_en}. Find yours: ${url}`

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
          {isZh ? '哪款「深度思考」游戏最适合你？' : 'Which Deep-Think Game Is Right for You?'}
        </h1>
        <p className="text-sm text-[#8a9a7a]">
          {isZh
            ? '6 个问题，从空洞骑士、Inscryption、被遗忘的城市、Pentiment 中找到你的进阶游戏'
            : '6 questions to match you with Hollow Knight, Inscryption, The Forgotten City, or Pentiment'}
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
        {isZh ? '找到我的深度游戏' : 'Find My Deep-Think Game'}
      </button>
    </div>
  )
}
