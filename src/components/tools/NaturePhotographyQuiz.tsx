'use client'

import { useState } from 'react'
import { BASE_URL } from '@/lib/config'

type Pick = 'pokesnap' | 'alba' | 'toem' | 'umurangi'

function ShareButton({ text, isZh }: { text: string; isZh: boolean }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`

  return (
    <div className="flex gap-3 justify-center flex-wrap">
      <button
        onClick={handleCopy}
        className="rounded-lg bg-[#2d3d2d] px-4 py-2 text-sm text-[#e8dcc8] transition-colors hover:bg-[#3d4d3d]"
      >
        {copied ? (isZh ? '已复制！' : 'Copied!') : (isZh ? '复制结果' : 'Copy Result')}
      </button>
      <a
        href={tweetUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="rounded-lg bg-[#1a8cd8] px-4 py-2 text-sm text-white transition-colors hover:bg-[#1a7bc0]"
      >
        {isZh ? '分享到 X' : 'Share on X'}
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
    q_en: 'What draws you most to cozy photography and nature observation games?',
    q_zh: '你最被治愈摄影和自然观察游戏的哪个方面吸引？',
    options: [
      { en: 'Discovering hidden moments in a beloved universe — finding the perfect Pokémon pose or secret behavior that no one else noticed', zh: '在心爱的宇宙中发现隐藏瞬间——找到那个完美的宝可梦姿势或从未有人注意到的秘密行为', type: 'pokesnap' },
      { en: 'Making a real difference — using photography as activism, documenting wildlife, and protecting what matters before it disappears', zh: '真正产生影响——用摄影作为行动，记录野生动物，在它们消失前保护值得保护的东西', type: 'alba' },
      { en: 'The journey itself — photography is how I connect with quirky strangers and help them, one snapshot at a time', zh: '旅程本身——摄影是我与奇特陌生人建立联系并帮助他们的方式，一张张照片慢慢来', type: 'toem' },
      { en: 'Bearing witness — the world has gone wrong and I want to document it honestly, not look away', zh: '见证——这个世界已经偏轨，我想诚实地记录它，而不是转移视线', type: 'umurangi' },
    ],
  },
  {
    q_en: 'Which visual aesthetic speaks most powerfully to you?',
    q_zh: '哪种视觉美学最能打动你的内心？',
    options: [
      { en: 'Vivid 3D nature environments with bold, saturated colors — lush jungles, glittering caves, crashing waterfalls, and creatures that pop with personality', zh: '色彩饱满的3D自然环境——茂密丛林、闪烁洞穴、飞溅瀑布，以及个性鲜明、生气勃勃的生物', type: 'pokesnap' },
      { en: 'Soft 3D warmth bathed in Mediterranean light — white-walled villages, sun-drenched hillsides, and real bird species rendered with quiet love', zh: '沐浴在地中海光线中的柔和3D温暖——白墙小村、阳光照耀的山坡，以及用安静的爱渲染的真实鸟类', type: 'alba' },
      { en: 'Black-and-white hand-drawn charm with gentle Nordic folk-art vibes — a world that looks like a children\'s book made with real care and wit', zh: '黑白手绘的温馨风格，带有北欧民间艺术气息——一个看起来像是用真心和智慧制作的儿童读物的世界', type: 'toem' },
      { en: 'Gritty, saturated near-future dystopia — orange skies, military checkpoints, crumbling infrastructure, and beauty hiding inside the ruin', zh: '粗粝而色彩浓烈的近未来反乌托邦——橙色天空、军事检查站、崩塌的基础设施，以及藏在废墟里的美', type: 'umurangi' },
    ],
  },
  {
    q_en: 'How do you feel about challenge and mastery in photography games?',
    q_zh: '在摄影游戏中，你怎么看待挑战和精通？',
    options: [
      { en: 'I love it — finding the four-star shot requires real skill, patience, and knowledge of each creature\'s behavior, and that expertise feels earned', zh: '非常享受——找到四星照片需要真正的技巧、耐心和对每种生物行为的了解，这种专业感来之不易', type: 'pokesnap' },
      { en: 'Very low pressure — I want to document things and feel good about it, without any rating system second-guessing my eye', zh: '几乎没有压力——我想记录事物并为此感到满足，不需要任何评分系统质疑我的眼光', type: 'alba' },
      { en: 'Puzzle-solving — figuring out which photo will help which character is a gentle challenge that keeps the photography purposeful', zh: '解谜感——弄清楚哪张照片能帮助哪位角色，这种温和的挑战让摄影保持目的性', type: 'toem' },
      { en: 'Technical and compositional — I want to think about framing, light, and subject within an environment that rewards artistic attention', zh: '技术感和构图感——我想在奖励艺术关注的环境中思考构图、光线和主题', type: 'umurangi' },
    ],
  },
  {
    q_en: 'How important is narrative and emotional depth to you?',
    q_zh: '叙事和情感深度对你有多重要？',
    options: [
      { en: 'Light touch — I care about the Pokémon lore and Professor Oak\'s encouragement, but story is secondary to the photography experience', zh: '轻描淡写即可——我在乎宝可梦的背景故事和大木博士的鼓励，但故事对摄影体验来说是次要的', type: 'pokesnap' },
      { en: 'Emotionally central — Alba\'s relationship with her grandparents, her growing activism, and the community\'s transformation give the photography real meaning', zh: '情感核心——阿尔芭与祖父母的关系、她日益增长的行动主义和社区的转变，赋予摄影真实的意义', type: 'alba' },
      { en: 'Character-driven — I want quirky encounters and warm mini-stories with every person I photograph for, not just beautiful images', zh: '角色驱动——我想要为每位拍摄对象经历奇特的邂逅和温馨的小故事，而不只是美丽的图像', type: 'toem' },
      { en: 'Environmental storytelling — the narrative is told through what I see, not what characters say, and I prefer it that way', zh: '环境叙事——故事通过我所见之物讲述，而非角色所言，我更喜欢这种方式', type: 'umurangi' },
    ],
  },
  {
    q_en: 'What is your relationship with the natural and nonhuman world?',
    q_zh: '你与自然世界和非人类生命的关系是什么？',
    options: [
      { en: 'Joyful collector — I want to see incredible creatures doing incredible things, and I want to catalogue them with skill and affection', zh: '快乐的收藏者——我想看到不可思议的生物做出不可思议的事，并且用技巧和喜爱将它们编目', type: 'pokesnap' },
      { en: 'Conservation advocate — wildlife matters and human activity is destroying it, and games that make this feel urgent are doing important work', zh: '保育倡导者——野生动物很重要，人类活动正在摧毁它，让这种紧迫感真实呈现的游戏在做重要的工作', type: 'alba' },
      { en: 'Gentle observer — nature is one part of a bigger human world, and I love games where nature and community coexist peacefully', zh: '温柔的观察者——自然是更大人类世界的一部分，我喜欢自然与社区和平共存的游戏', type: 'toem' },
      { en: 'Witness — the natural world is something to document and grieve and remember, especially when human systems are failing it', zh: '见证者——自然世界是值得记录、哀悼和铭记的东西，尤其是当人类系统正在失败于它的时候', type: 'umurangi' },
    ],
  },
  {
    q_en: 'Which of these sounds most like your ideal photography game session?',
    q_zh: '哪种最像你理想中的摄影游戏时光？',
    options: [
      { en: 'Playing a level three times to finally capture the Scorbunny kicking an apple in mid-air for the four-star shot — pure elation when it lands', zh: '把一个关卡打了三遍，终于拍到火兔踢起空中苹果的四星瞬间——成功时那种纯粹的喜悦', type: 'pokesnap' },
      { en: 'A peaceful afternoon documenting every bird in the reserve, signing the petition, watching the townsfolk gradually come around', zh: '一个宁静的午后，记录保护区里的每一种鸟，签署请愿书，看着镇民们逐渐转变立场', type: 'alba' },
      { en: 'Meeting an eccentric lighthouse keeper who needs a photograph of something they have never seen before — then finding it and watching their face change', zh: '遇见一位古怪的灯塔管理员，他需要一张他从未见过的东西的照片——然后找到它，看着他的表情变化', type: 'toem' },
      { en: 'Standing on a rooftop at sunset in a crumbling city, composing the perfect shot of something beautiful the world is about to lose', zh: '在日落时分站在破败城市的屋顶，构图出一张即将消逝的美丽事物的完美照片', type: 'umurangi' },
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
  pokesnap: {
    title_en: 'New Pokémon Snap',
    title_zh: '新宝可梦随乐拍',
    emoji: '📸',
    tag_en: 'The Expert Wildlife Photographer',
    tag_zh: '专业野生宝可梦摄影师',
    platform_en: 'Nintendo Switch',
    platform_zh: 'Nintendo Switch',
    why_en: `New Pokémon Snap (2021) is the rare Nintendo sequel that fully justifies a 21-year wait. The original Pokémon Snap (1999) was a rail-shooting photography game in which you rode through habitats photographing Pokémon for Professor Oak's research — a concept so genuinely delightful that players had wanted a sequel for over two decades. The 2021 version delivers that sequel with an expanded roster of over 200 Pokémon across multiple biomes (jungle, desert, night jungle, snowfields, ocean), a research rating system that rewards mastery and patience, and a progressive unlock structure that opens new paths and Pokémon behaviors as your relationship with each area deepens. The photography is not casual — finding the four-star shots requires real knowledge of each species' behavior: which Pokémon appears only at night, which emerges only if you play the flute at a specific location, which rare pose triggers only when a specific other Pokémon is in frame. This depth of engagement is what separates New Pokémon Snap from simpler photography games; the satisfaction of finally capturing a Meganium releasing its pollen in perfect light, after six failed attempts, is genuinely felt. The game is also visually spectacular — each biome is designed to show Pokémon doing things you always imagined they did but never saw in the main games, and the ecological attention to how different species interact creates an almost documentary quality. For players who grew up with Pokémon and want to experience the franchise through a lens of wonder and patience rather than battle, New Pokémon Snap is one of the most joyful games Nintendo has ever published.`,
    why_zh: `《新宝可梦随乐拍》（2021）是那种罕见的、足以证明等待21年值得的任天堂续作。2021年的续作提供了200多种宝可梦、多个生物群落（丛林、沙漠、夜间丛林、雪原、海洋）、奖励精通和耐心的研究评分系统，以及随着你与每个区域关系加深而开放新路径和宝可梦行为的渐进解锁结构。摄影并不随意——找到四星照片需要真正了解每个物种的行为：哪种宝可梦只在夜间出现，哪种只有在特定位置演奏笛子时才会出现，哪种稀有姿势只有当特定的另一只宝可梦在画面中时才会触发。游戏的生态关注度接近纪录片品质。对于那些带着好奇心和耐心而非对战心理体验这个系列的玩家来说，《新宝可梦随乐拍》是任天堂出版的最令人愉悦的游戏之一。`,
    tip_en: `The key to mastering New Pokémon Snap is understanding that each course has multiple hidden paths and encounter triggers that only unlock as you increase your Research Level (RL) in that area. Never treat a course as "finished" just because you reached RL 3 — replay it at higher levels and you will discover entirely new Pokémon behaviors, secret locations, and four-star opportunities you could not have accessed earlier. The Professor Oak score is your primary progression metric: prioritize new and unseen shots over repeatedly photographing the same subject at higher quality. The Illumina mechanic (glowing Pokémon subspecies) is the game's deepest photography challenge — these legendary encounters have very specific trigger conditions in each area and yield the highest-scoring photographs in the game. The online sharing feature lets you compare your shots with the community's best, which is one of the most effective ways to learn which photographs you have been missing.`,
    tip_zh: `掌握《新宝可梦随乐拍》的关键在于理解每条路线都有多条隐藏路径和相遇触发器，只有当你提高该区域的研究等级（RL）时才能解锁。永远不要因为到达了RL3就认为一条路线"完成了"——在更高等级重玩它，你会发现全新的宝可梦行为、秘密地点和之前无法进入的四星机会。大木博士的分数是你的主要进度指标：优先拍摄新的和未见过的镜头，而不是重复以更高质量拍摄同一主体。幻彩机制（发光宝可梦亚种）是游戏中最深层的摄影挑战——这些传奇相遇在每个区域都有非常具体的触发条件，并能产出游戏中得分最高的照片。线上分享功能让你与社区最佳作品进行比较，这是发现自己遗漏了哪些照片的最有效方法之一。`,
  },
  alba: {
    title_en: 'Alba: A Wildlife Adventure',
    title_zh: 'Alba: 野生动物大冒险',
    emoji: '🐦',
    tag_en: 'The Young Conservation Activist',
    tag_zh: '年轻的自然保育行动者',
    platform_en: 'PC · Switch · PS4/5 · Xbox · iOS · Android',
    platform_zh: 'PC · Switch · PS4/5 · Xbox · iOS · Android',
    why_en: `Alba: A Wildlife Adventure (2020) is a game about a ten-year-old girl who spends a summer in her grandparents' Mediterranean coastal town and decides, against considerable local inertia, to save the nature reserve from being demolished for a hotel. Developed by Ustwo Games (the Monument Valley studio), Alba is both the most explicitly political cozy game on this list and the gentlest — it trusts its young players to care about real environmental issues without preaching and gives them the experience of making a meaningful difference through documentation, community organizing, and persistence. The photography in Alba is real-world bird and wildlife photography: you use your phone to photograph actual species (over 60 are in the game, with birdcall audio and field guide entries), and the act of documentation has functional consequences — photographs submitted to the wildlife app contribute to your campaign to protect the reserve. The game runs three to four hours and has a real ending, which gives it a storybook completeness that open-ended games cannot match. Alba has been praised particularly for how it handles environmentalism for young players — it shows that individuals can make a difference without lying to them that it is easy, and the town's gradual transformation from apathy to engagement is genuinely satisfying. For farming game fans who love nature and want a game that says something real about caring for it, Alba is one of the most honest and warm games in the genre.`,
    why_zh: `《Alba: 野生动物大冒险》（2020）讲述一个十岁女孩在祖父母的地中海海滨小镇度过暑假，并决定对抗相当大的地方惰性，拯救自然保护区免遭拆除改建成酒店的故事。由Ustwo Games（纪念碑谷的工作室）开发，Alba既是这份名单上最明确带有政治色彩的治愈游戏，也是最温柔的——它信任年轻玩家对真实环境问题的关怀，不说教地给予他们通过记录、社区组织和坚持产生实质影响的体验。游戏中的摄影是真实的野生动物摄影：你用手机拍摄真实物种（游戏中有60多种，包含鸟鸣音频和野外图鉴条目），记录行为产生功能性后果。游戏运行3至4小时并有真实结局，给予它开放式游戏无法匹配的童话完整感。`,
    tip_en: `Alba's 60+ wildlife species are spread across the town and reserve in specific locations and time-of-day windows — some birds only appear near water, others only in the morning, and several only appear after you have reached specific points in the story. The in-game wildlife guide shows which species you are missing and gives habitat clues, but the game does not waypoint every location, so genuine exploration is rewarded. The petition signatures are essential to the story's progression — do not ignore injured animals or the characters who need help, as these often unlock new supporters. Alba: A Wildlife Adventure is one of the few games where playing on mobile (iOS/Android) is a genuinely excellent choice, since using a phone to take photos of wildlife has an immediacy that feels more real than a controller. The game was also made free on Apple Arcade, so if you have a subscription, it is the most accessible way to play.`,
    tip_zh: `Alba的60多种野生动物物种分布在小镇和保护区的特定地点和时间段——一些鸟类只在水边出现，其他只在早晨，还有几种只在你达到故事特定节点后才会出现。游戏内野生动物指南显示你遗漏了哪些物种并给出栖息地线索，但游戏不会为每个地点设置路标，所以真实的探索会得到奖励。请愿签名对故事进展至关重要——不要忽视受伤的动物或需要帮助的角色，因为这些往往会解锁新的支持者。阿尔芭是少数在移动端（iOS/Android）游玩体验极佳的游戏之一，因为用手机拍摄野生动物的即时感比控制器更真实。该游戏也在Apple Arcade上免费提供，如果你有订阅，这是最便捷的游玩方式。`,
  },
  toem: {
    title_en: 'Toem',
    title_zh: 'Toem',
    emoji: '🗺️',
    tag_en: 'The Curious Wandering Photographer',
    tag_zh: '充满好奇心的漫游摄影师',
    platform_en: 'PC · Switch · PS4/5',
    platform_zh: 'PC · Switch · PS4/5',
    why_en: `Toem (2021) was developed by Something We Made, a Swedish studio, and it is one of those games that is genuinely difficult to describe without underselling it. On paper it is a black-and-white photography adventure game about a young person traveling to see the Toem (a natural phenomenon) with only their grandmother's vintage camera. In practice it is a gentle, witty, and occasionally profound game about the act of paying attention. Every character you meet has something they need, and most of what they need involves a photograph — of a specific bird, a cloud formation, a friend's face, a distant mountain. Finding these photographs requires you to look carefully at the world Toem has constructed, which is itself an act the game is quietly arguing for. The black-and-white aesthetic is intentional and striking: it makes the game's world feel timeless and handmade, removes the distraction of color so you focus on shape and composition, and gives even mundane subjects a photographic dignity that supports the game's theme. Toem runs four to five hours and has a specific ending, but the journey through its four distinct regions (a beach town, a forest, a snowy mountain, a city) feels unhurried and complete. The humor is gentle and Scandinavian — dry, warm, and occasionally surreal without ever becoming threatening. Toem has been called one of the most relaxing games ever made, and if you are a farming game player who loves patient, careful engagement with a small world that rewards close attention, Toem is quietly extraordinary.`,
    why_zh: `《Toem》（2021）由瑞典工作室Something We Made开发，是那种不拿"难以形容"作借口就很难描述的游戏。表面上，它是一款黑白摄影冒险游戏，讲述一个年轻人带着祖母的老式相机旅行去目睹Toem（一种自然现象）的故事。实际上，它是一款温柔、机智，偶尔深刻的关于"注意力"行为的游戏。你遇到的每个角色都有所需求，大多数需求都涉及一张照片——特定的鸟、一朵云的形状、朋友的脸、远山。找到这些照片需要你仔细观察Toem构建的世界，这本身就是游戏静静倡导的行为。黑白美学是刻意而引人注目的：它让游戏世界感觉永恒且手工制作，消除颜色的干扰让你专注于形状和构图，并赋予即使是平凡主题一种支持游戏主题的摄影尊严。游戏大约需要4到5小时完成，被称为有史以来最放松的游戏之一。`,
    tip_en: `Toem's photograph challenges are not rated or scored — there is no "best" shot, only "taken" or "not taken." This means you can complete every challenge without mastering photography technique, which keeps the game accessible and stress-free. The real skill in Toem is exploration: every region has hidden characters and challenges that do not appear on the map, accessible only by talking to everyone and exploring every corner of the environment. The bus schedule is important — you can only travel between regions at specific times, and rushing through a region to catch a bus means missing encounters. Let yourself miss the bus and stay longer in each area, especially the forest region, which has the most hidden content. The photograph album fills as a record of your journey, and reviewing it at the end of the game is one of its most quietly satisfying moments.`,
    tip_zh: `Toem的照片挑战没有评分——没有"最佳"镜头，只有"已拍"或"未拍"。这意味着你可以在不掌握摄影技巧的情况下完成所有挑战，保持游戏的可接触性和无压力感。Toem的真正技巧在于探索：每个地区都有不出现在地图上的隐藏角色和挑战，只能通过与每个人交谈和探索环境的每个角落来发现。公车时刻表很重要——你只能在特定时间在地区之间旅行，匆忙穿越一个地区赶公车意味着错过邂逅。让自己错过公车，在每个地区停留更长时间，尤其是森林地区，那里有最多的隐藏内容。照片集作为你旅程的记录慢慢填满，在游戏结束时回顾它是最安静但令人满足的时刻之一。`,
  },
  umurangi: {
    title_en: 'Umurangi Generation',
    title_zh: 'Umurangi Generation',
    emoji: '🌅',
    tag_en: 'The Dystopia Documentary Photographer',
    tag_zh: '反乌托邦纪录摄影师',
    platform_en: 'PC · Nintendo Switch',
    platform_zh: 'PC · Nintendo Switch',
    why_en: `Umurangi Generation (2020) is the most artistically ambitious photography game ever made and one of the most important games about climate and political crisis to emerge this decade. Developed by Naphtali Faulkner (Origame Digital), a Māori artist based in Aotearoa New Zealand, Umurangi Generation is set in Tauranga in a near-future where a kaijū attack and an authoritarian government response have created a fractured society. You play as a courier who also photographs — not for heroism or documentation in any official sense, but because you are there and the world is beautiful and terrible and someone should witness it. The photography is technically demanding: you have a selection of cameras and lenses to unlock, lighting conditions that vary dramatically between levels, and a brief list of objectives per area that push you to photograph specific things — neon signs, specific equipment, graffiti, creatures — in a way that requires compositional thought rather than spray-and-pray. What distinguishes Umurangi from other photography games is its political honesty: the setting depicts indigenous communities under military occupation, climate refugees, the aesthetics of state violence, and the quiet ways that marginalized communities build culture and beauty despite systemic pressure. This is not metaphorical — the game is named after the Māori word for the red sky at sunset, a color that appears throughout the game as both beauty and warning. Umurangi Generation has a dedicated and passionate fanbase who consider it one of the most important games of the 2020s, and if you want a photography game that challenges you artistically and does not look away from what the world is becoming, this is the one.`,
    why_zh: `《Umurangi Generation》（2020）是有史以来艺术上最有野心的摄影游戏，也是这十年来关于气候和政治危机最重要的游戏之一。由毛利艺术家Naphtali Faulkner（Origame Digital）开发，游戏设定在新西兰陶朗加的近未来，巨兽袭击和威权政府回应造就了一个碎裂的社会。你扮演一个同时进行摄影的快递员——不是为了英雄主义或任何官方意义上的记录，而是因为你就在那里，世界既美丽又可怕，应该有人来见证它。摄影在技术上很有挑战性：你有一系列相机和镜头可以解锁，每个关卡的光线条件变化显著。游戏以毛利语中日落红天的词命名，这种颜色贯穿整个游戏，既是美丽也是警示。它拥有一批热情的粉丝，他们认为这是2020年代最重要的游戏之一。`,
    tip_en: `Umurangi Generation rewards time and attention more than any other photography game — the brief level objectives are there to get you moving, but the real game is in everything else the environment contains. Every level has far more to see than the objectives require: graffiti in indigenous languages, background scenes that tell stories about characters who have no speaking role, environmental details that build the lore of the near-future world. Take every photograph opportunity, not just the ones that complete objectives. The Macro DLC adds microscopic photography to the game, which is a genuinely different experience from the main game and introduces a whole new compositional vocabulary. The game's soundtrack (by Origame Digital and contributors) is an essential part of the experience — play with headphones for the full effect of how the music's genre shifts between levels reflect the tonal shifts between environments.`,
    tip_zh: `《Umurangi Generation》比任何其他摄影游戏都更奖励时间和注意力——简短的关卡目标是让你行动起来的，但真正的游戏在于环境包含的其他一切。每个关卡都有比目标要求多得多的内容：土著语言涂鸦、讲述没有台词角色故事的背景场景、构建近未来世界背景知识的环境细节。拍摄每一个摄影机会，而不只是完成目标的那些。Macro DLC为游戏添加了微观摄影，这与主游戏是完全不同的体验，引入了全新的构图词汇。游戏的原声音乐（由Origame Digital及贡献者制作）是体验的重要组成部分——戴耳机感受音乐在关卡间的风格转变如何反映环境间的基调转换。`,
  },
}

function calcResult(answers: Pick[]): Pick {
  const counts: Record<Pick, number> = { pokesnap: 0, alba: 0, toem: 0, umurangi: 0 }
  for (const a of answers) counts[a]++
  return Object.entries(counts).sort((x, y) => y[1] - x[1])[0][0] as Pick
}

export function NaturePhotographyQuiz({ locale }: { locale: string }) {
  const isZh = locale === 'zh'
  const [current, setCurrent] = useState(0)
  const [answers, setAnswers] = useState<Pick[]>([])
  const [result, setResult] = useState<Pick | null>(null)

  const handleAnswer = (type: Pick) => {
    const next = [...answers, type]
    if (current + 1 < QUESTIONS.length) {
      setAnswers(next)
      setCurrent(current + 1)
    } else {
      setResult(calcResult(next))
    }
  }

  const reset = () => {
    setCurrent(0)
    setAnswers([])
    setResult(null)
  }

  const q = QUESTIONS[current]

  if (result) {
    const r = RESULTS[result]
    const shareText = isZh
      ? `我的自然摄影游戏推荐是《${r.title_zh}》！${r.emoji} 来测测你的结果？${BASE_URL}/zh/quizzes/nature-photography-quiz`
      : `My cozy nature photography game match is ${r.title_en}! ${r.emoji} Which one are you? ${BASE_URL}/en/quizzes/nature-photography-quiz`

    return (
      <div className="mx-auto max-w-2xl rounded-2xl border border-[#2d3d2d] bg-[#0f1a0f] p-6 md:p-8">
        <div className="mb-6 text-center">
          <div className="mb-3 text-6xl">{r.emoji}</div>
          <p className="mb-1 text-sm text-[#8a9a7a]">{isZh ? r.tag_zh : r.tag_en}</p>
          <h2 className="mb-2 text-2xl font-bold text-[#f0a832]">
            {isZh ? r.title_zh : r.title_en}
          </h2>
          <p className="text-sm text-[#8a9a7a]">{isZh ? r.platform_zh : r.platform_en}</p>
        </div>

        <div className="mb-6 rounded-xl bg-[#1a2e1a]/60 p-5 text-[#e8dcc8]">
          <p className="mb-4 leading-relaxed">{isZh ? r.why_zh : r.why_en}</p>
          <div className="border-t border-[#2d3d2d] pt-4">
            <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-[#f0a832]">
              {isZh ? '游玩建议' : 'Pro Tip'}
            </p>
            <p className="text-sm leading-relaxed text-[#c8bca8]">{isZh ? r.tip_zh : r.tip_en}</p>
          </div>
        </div>

        <div className="mb-6">
          <ShareButton text={shareText} isZh={isZh} />
        </div>

        <div className="mb-6 rounded-xl border border-[#f0a832]/20 bg-[#1a2e1a]/40 p-4 text-center">
          <p className="mb-1 text-xs text-[#8a9a7a]">
            {isZh ? '想每天发现最适合你的游戏？' : 'Want daily game picks matched to your mood?'}
          </p>
          <p className="text-sm text-[#e8dcc8]">
            {isZh
              ? '试试 TendFarm App — 每天根据你的状态，推荐一款最适合你的农场与自然游戏'
              : 'Try TendFarm App — personalized farming and nature game picks every day based on how you feel'}
          </p>
        </div>

        <button
          onClick={reset}
          className="w-full rounded-xl border border-[#2d3d2d] py-2.5 text-sm text-[#8a9a7a] transition-colors hover:border-[#4d5d4d] hover:text-[#e8dcc8]"
        >
          {isZh ? '重新测试' : 'Retake Quiz'}
        </button>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-2xl rounded-2xl border border-[#2d3d2d] bg-[#0f1a0f] p-6 md:p-8">
      <div className="mb-6">
        <div className="mb-3 flex items-center justify-between text-xs text-[#8a9a7a]">
          <span>
            {isZh
              ? `第 ${current + 1} / ${QUESTIONS.length} 题`
              : `Question ${current + 1} of ${QUESTIONS.length}`}
          </span>
          <div className="flex gap-1">
            {QUESTIONS.map((_, i) => (
              <div
                key={i}
                className={`h-1.5 w-6 rounded-full transition-colors ${
                  i < current ? 'bg-[#f0a832]' : i === current ? 'bg-[#f0a832]/60' : 'bg-[#2d3d2d]'
                }`}
              />
            ))}
          </div>
        </div>
        <h3 className="text-lg font-semibold leading-snug text-[#e8dcc8]">
          {isZh ? q.q_zh : q.q_en}
        </h3>
      </div>

      <div className="flex flex-col gap-3">
        {q.options.map((opt, i) => (
          <button
            key={i}
            onClick={() => handleAnswer(opt.type)}
            className="rounded-xl border border-[#2d3d2d] bg-[#1a2e1a]/40 px-4 py-3 text-left text-sm text-[#e8dcc8] transition-all hover:border-[#f0a832]/40 hover:bg-[#1a2e1a] hover:text-[#f0a832]"
          >
            {isZh ? opt.zh : opt.en}
          </button>
        ))}
      </div>
    </div>
  )
}
