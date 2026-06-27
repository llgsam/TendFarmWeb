'use client'

import { useState } from 'react'
import { BASE_URL } from '@/lib/config'

type Pick = 'disco' | 'golden' | 'immortality' | 'vault'

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
    q_en: 'What draws you most to a detective or mystery game?',
    q_zh: '在侦探或悬疑游戏中，最吸引你的是什么？',
    options: [
      { en: 'The internal monologue — I want a detective whose fractured psychology, competing inner voices, and moral contradictions are the investigation itself, where every skill check reveals something about who he is', zh: '内心独白——我想要一个破碎的心理、相互竞争的内在声音和道德矛盾本身就是调查的侦探，每次技能检定都揭示他是谁', type: 'disco' },
      { en: 'The visual deduction — I want to freeze a moment in time, zoom into every corner of the scene, piece together witness names and causes of death from visual clues alone, with no handholding from dialogue or tutorials', zh: '视觉推理——我想要冻结时间中的一个瞬间，放大场景的每个角落，仅从视觉线索拼凑出证人姓名和死亡原因，没有对话或教程的引导', type: 'golden' },
      { en: 'The archival mystery — I want to sift through a database of film footage, identify the same actors across different scenes, assemble a timeline of a story told entirely in nonlinear clips, with no explicit instruction on what I am looking for', zh: '档案谜题——我想要筛选电影片段数据库，识别不同场景中的同一演员，拼凑完全以非线性片段讲述的故事时间线，没有关于我在寻找什么的明确指示', type: 'immortality' },
      { en: 'The linguistic puzzle — I want to decipher an unknown ancient script through context, cognates, and repeated exposure, using language itself as the investigative tool to unlock the history of a civilisation', zh: '语言谜题——我想通过语境、同源词和反复接触来破译一种未知的古代文字，用语言本身作为调查工具来解开一个文明的历史', type: 'vault' },
    ],
  },
  {
    q_en: 'What kind of protagonist suits you best?',
    q_zh: '哪种主角最适合你？',
    options: [
      { en: 'A disgraced detective with amnesia who is rebuilding his identity through your choices — charismatic, self-destructive, hilarious, and genuinely tragic, with 24 skills that each function as a different internal narrator with distinct personalities and opinions', zh: '一个失忆的失意侦探，通过你的选择重建自我身份——魅力十足、自我毁灭、令人捧腹且真正悲剧，拥有 24 项技能，每项都作为具有独特性格和观点的不同内在叙述者', type: 'disco' },
      { en: 'You are the detective — the camera is your only tool and the scene is your only witness; there is no protagonist to identify with, only evidence to assemble, and the satisfaction comes entirely from the logical click of correct deductions', zh: '你就是侦探——镜头是你唯一的工具，场景是你唯一的证人；没有需要认同的主角，只有需要组装的证据，满足感完全来自正确推论的逻辑契合感', type: 'golden' },
      { en: 'You play as Marissa Marcel, an actress across three decades of films, but also as yourself investigating her disappearance — the protagonist question is itself the mystery, and discovering who is who is the game\'s central revelation', zh: '你扮演跨越三十年电影的女演员玛丽莎·马塞尔，同时也是调查她失踪的自己——主角问题本身就是谜题，发现谁是谁是游戏的核心揭示', type: 'immortality' },
      { en: 'Nina, an archaeologist-journalist who can read ancient glyphs and make branching dialogue choices — a sympathetic, curious protagonist whose growing understanding of the language mirrors your own as a player', zh: '尼娜，一位能读取古代象形文字并做出分支对话选择的考古记者——一个令人同情、充满好奇心的主角，她对语言日益增长的理解反映了你作为玩家的理解', type: 'vault' },
    ],
  },
  {
    q_en: 'How much do you want the game to be driven by skill checks, failure states, and consequence?',
    q_zh: '你希望游戏在多大程度上由技能检定、失败状态和后果驱动？',
    options: [
      { en: 'High stakes with real consequence — dice rolls decide whether my detective successfully intimidates a suspect, reads the room accurately, or delivers a devastating speech; failed checks lock out content permanently, and the story branches meaningfully around my character\'s specific combination of skills', zh: '高风险真实后果——骰子决定我的侦探是否成功恐吓嫌疑人、准确读懂房间或发表毁灭性演讲；失败的检定永久锁定内容，故事围绕我角色的特定技能组合进行有意义的分支', type: 'disco' },
      { en: 'No failure states — I click at my own pace, review every label and figure, test hypotheses against the solution screen, and only advance when I am confident; the puzzle has a single correct solution and the satisfaction is entirely in arriving at it through observation', zh: '无失败状态——我按自己的节奏点击，审查每个标签和图形，针对解答画面测试假设，只有当我有把握时才前进；谜题有唯一正确答案，满足感完全在于通过观察得出它', type: 'golden' },
      { en: 'No skill checks, no failure states, no wrong searches — any sequence of clips can lead to the truth; the system rewards curiosity and cross-referencing over grinding, and there is no single correct order to discover things', zh: '无技能检定、无失败状态、无错误搜索——任何片段序列都可以通向真相；系统奖励好奇心和交叉参照而非研磨，没有发现事物的唯一正确顺序', type: 'immortality' },
      { en: 'Branching dialogue with light consequence — choices matter for tone and relationship quality but the main story threads stay accessible; the real challenge is correctly deciphering enough of the language to understand what NPCs are actually saying', zh: '有轻度后果的分支对话——选择对语气和关系质量很重要，但主要故事线索保持可访问；真正的挑战是正确破译足够多的语言来理解 NPC 实际说的话', type: 'vault' },
    ],
  },
  {
    q_en: 'What kind of world do you most want to spend time in?',
    q_zh: '你最想置身于哪种世界中？',
    options: [
      { en: 'A dying harbour city steeped in ideological exhaustion — a world where political movements have lost their energy, the economy has collapsed, and the people have developed elaborate personal philosophies to survive the collapse of every grand narrative', zh: '一座沉浸在意识形态疲惫中的垂死港口城市——政治运动已失去活力、经济已崩溃、人们发展出精心设计的个人哲学来在每个宏大叙事的崩溃中生存的世界', type: 'disco' },
      { en: 'A series of beautifully illustrated crime scenes — English countryside estates, Victorian parlours, island villages, baroque mansions — each fully frozen in a single dramatic moment that contains everything needed to reconstruct what happened', zh: '一系列精美插图的犯罪现场——英格兰乡村庄园、维多利亚式客厅、岛屿村庄、巴洛克式豪宅——每一个都完全冻结在单一戏剧性时刻中，包含重建所发生事情所需的一切', type: 'golden' },
      { en: 'The intersection of film history and the uncanny — old films with the texture of 70s grain and 90s video, a series of movies that seem normal at first and gradually reveal a hidden continuity across decades; a world that feels like stumbling through someone\'s private archive', zh: '电影历史与怪异感的交汇——带有 70 年代颗粒感和 90 年代录像质感的老电影，一系列起初看似正常但逐渐揭示跨越数十年隐藏连续性的电影；感觉像是在某人私人档案室中迷路的世界', type: 'immortality' },
      { en: 'The ruins of an ancient river civilisation — stone temples, flooded catacombs, merchants on river boats, and the gradually emerging grammar of a language no living person has spoken in a thousand years; exploration and translation are equally the medium', zh: '一个古老河流文明的废墟——石庙、淹没的地下墓穴、河船上的商人，以及一种千年来没有活人说过的语言逐渐浮现的语法；探索和翻译同样是媒介', type: 'vault' },
    ],
  },
  {
    q_en: 'What is your tolerance for ambiguity — endings that leave things unresolved?',
    q_zh: '你对模糊性的接受程度——留有未解之谜的结局？',
    options: [
      { en: 'High — I want an ending that feels earned but doesn\'t resolve the world\'s larger problems; a personal triumph or defeat within a larger tragedy is more truthful than a world that gets fixed', zh: '高——我想要一个感觉值得但不能解决世界更大问题的结局；在更大悲剧中的个人胜利或失败比一个被修复的世界更真实', type: 'disco' },
      { en: 'Low — I want a definitive solution; once I have correctly identified all suspects, causes, and motives, the game confirms I am right and I can move on to the next case satisfied; each case is fully resolved', zh: '低——我想要一个确定的解答；一旦我正确识别了所有嫌疑人、原因和动机，游戏会确认我是对的，我可以满足地继续下一个案件；每个案件都完全解决', type: 'golden' },
      { en: 'Very high — I want an ending that asks me to reassemble everything I thought I understood and consider a completely different interpretation; the game\'s final revelation invites multiple readings and I find that more compelling than a clear answer', zh: '非常高——我想要一个让我重新组装所有我以为理解的东西并考虑完全不同解释的结局；游戏的最终揭示邀请多种解读，我发现这比明确答案更引人入胜', type: 'immortality' },
      { en: 'Medium — the main storyline resolves, the civilisation\'s history becomes clear, and the protagonist\'s journey concludes with an emotional payoff; but some mysteries of the deeper history remain intentionally unanswered as a reflection of real archaeology', zh: '中等——主线故事解决，文明历史变得清晰，主角的旅程以情感回报收尾；但更深层历史的一些谜题作为对真实考古学的反映，故意留而未答', type: 'vault' },
    ],
  },
  {
    q_en: 'Which post-session feeling sounds most like what you are looking for?',
    q_zh: '哪种游玩后的感觉最符合你的期待？',
    options: [
      { en: 'I just spent three hours talking to a pawnshop owner who turned out to have the most intricate personal philosophy I have ever encountered in fiction — and I failed a skill check that would have unlocked a different conversation entirely, so I am reloading to try again', zh: '我刚花了三个小时和一个典当行老板交谈，他结果拥有我在小说中遇到过的最复杂的个人哲学——而我失败了一个技能检定，那本可以解锁完全不同的对话，所以我要重新加载再试一次', type: 'disco' },
      { en: 'I just correctly identified the killer using only the placement of a dropped glove and the expression on a bystander\'s face — no hints, no confirmation until I input the full solution — and the click of rightness when the case resolved was exactly the satisfaction I came for', zh: '我刚仅凭一只掉落手套的位置和旁观者脸上的表情正确识别了凶手——没有提示，直到我输入完整解答才得到确认——案件解决时那种正确感的契合感恰好是我来这里寻找的满足感', type: 'golden' },
      { en: 'I just noticed a reflection in a mirror in a 1968 film clip that contradicts something a character said in a 1999 film clip — and now I understand something about this actress that changes the meaning of every scene I watched before it — I need to go back and rewatch everything', zh: '我刚注意到一个 1968 年电影片段中镜子里的倒影，它与一个角色在 1999 年电影片段中说的话相矛盾——现在我理解了关于这位女演员的某些东西，它改变了我之前看过的每个场景的含义——我需要回去重看一切', type: 'immortality' },
      { en: 'I just correctly translated a three-word inscription on a temple wall that I could not understand at all two hours ago — the same script that looked like meaningless symbols now resolves into a complete grammatical sentence — the language learning is the game and it is deeply satisfying', zh: '我刚正确翻译了两个小时前完全看不懂的神庙墙上的一段三词铭文——同样看起来像无意义符号的文字现在解析成一个完整的语法句子——语言学习就是游戏本身，它深刻地令人满足', type: 'vault' },
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
  disco: {
    title_en: 'Disco Elysium',
    title_zh: '极乐迪斯科',
    emoji: '🕵️',
    tag_en: 'The most ambitious narrative RPG ever made — you play a disgraced detective rebuilding his identity through a city-wide investigation where your skills argue with each other in your head',
    tag_zh: '有史以来最雄心勃勃的叙事 RPG——你扮演一个失意侦探，在一场全城调查中通过在你脑海中相互争论的技能重建自我身份',
    platform_en: 'Available on: PC (Steam, GOG, Epic — ~$40), PlayStation 4/5, Xbox One/Series. The Final Cut edition includes full voice acting for all text. Frequently on sale for ~$10.',
    platform_zh: '可在以下平台获取：PC（Steam、GOG、Epic——约 40 美元）、PlayStation 4/5、Xbox One/Series。最终剪辑版包含所有文字的完整配音。经常打折至约 10 美元。',
    why_en:
      "Disco Elysium (2019/2021, ZA/UM) is unlike any other game ever made — a party-of-one narrative RPG where your detective's 24 skills each function as a distinct internal narrator who comments on, argues with, and complicates everything you observe or attempt. Your Conceptualization skill might find profound meaning in a graffiti tag; your Physical Instrument skill wants to punch the man you are interviewing; your Empathy skill reads the sadness behind a barmaid's professional smile. The game is set in Revachol, a dying harbour city that failed a communist revolution decades ago and is now occupied by corporate peacekeepers, littered with the ideological wreckage of every political movement that has ever tried to change the world and failed. Your detective is investigating a murder, but the real investigation is into his own identity: he has amnesia, no memory of who he was before the bender that destroyed him, and you rebuild him through choices that range from magnificent to catastrophic. The writing is among the best in any medium — funny, devastating, philosophically serious, and full of characters whose inner lives feel more real than most protagonists in literary fiction. The Final Cut edition adds full voice acting (around 1 million words voiced). Metacritic 91 on PC.",
    why_zh:
      '极乐迪斯科（2019/2021 年，ZA/UM）是有史以来与其他任何游戏都不同的作品——一款单人叙事 RPG，你的侦探的 24 项技能各自作为一个独特的内在叙述者，对你观察或尝试的一切进行评论、争论和复杂化。游戏设定在莱瓦肖尔，一座数十年前失败了共产主义革命、现在被企业维和人员占领的垂死港口城市。你的侦探在调查一起谋杀案，但真正的调查是关于他自己的身份。写作是任何媒介中最好的之一。最终剪辑版添加了完整配音（约 100 万字）。PC 版 Metacritic 91 分。',
    tip_en: "Choose your skill loadout carefully at the start — the four archetypes (Thinker, Sensitive, Physical, Motorics) dramatically change which conversations open up. Try the Sensitive build for the most emotionally resonant first playthrough — it opens Empathy, Inland Empire, and Esprit de Corps, which give you access to the game's warmest and most surreal inner dialogues. Save frequently in multiple slots: some skill checks fail permanently and lock out content, and some of the best content in the game is only accessible on a failed check. The 'white check' vs 'red check' distinction matters: white checks can be retried with stat boosts; red checks are one-shot. Do not skip reading the skill descriptions — they are some of the best writing in the game, and understanding each skill's personality makes every check result richer.",
    tip_zh: '在开始时仔细选择技能配置——四个原型（思考者、感性者、体能者、运动者）戏剧性地改变哪些对话可以开启。尝试感性者构建进行最具情感共鸣的第一次游玩——它开启了共情、内陆帝国和团队精神，让你访问游戏最温暖和最超现实的内心对话。在多个存档槽中频繁保存：一些技能检定永久失败并锁定内容，游戏中一些最好的内容只能通过失败的检定访问。白色检定与红色检定的区别很重要：白色检定可以通过属性提升重试；红色检定是一次性的。不要跳过阅读技能描述——它们是游戏中最好的写作之一，理解每项技能的性格会让每次检定结果更丰富。',
  },
  golden: {
    title_en: 'The Case of the Golden Idol',
    title_zh: '黄金神像案',
    emoji: '🔍',
    tag_en: 'A series of perfectly self-contained murder scenes frozen in time — no dialogue, no tutorial, just a beautifully illustrated moment and every clue you need to reconstruct exactly what happened',
    tag_zh: '一系列完美自成一体的谋杀现场在时间中冻结——没有对话，没有教程，只有精美插图的瞬间和重建究竟发生了什么所需的每条线索',
    platform_en: 'Available on: PC (Steam ~$18), Nintendo Switch (~$18), iOS/Android (mobile edition). The DLC "The Spider of Lanka" adds additional cases. Frequently on sale for ~$9.',
    platform_zh: '可在以下平台获取：PC（Steam 约 18 美元）、Nintendo Switch（约 18 美元）、iOS/Android（手机版）。DLC "兰卡蜘蛛"添加了更多案件。经常打折至约 9 美元。',
    why_en:
      "The Case of the Golden Idol (2022, Color Gray Games) is a deduction puzzle game that presents you with a series of fully illustrated murder scenes across 18th-century England, and asks you to fill in a set of blanks: the victim's name, the cause of death, the killer, the motive, the means. There is no dialogue, no tutorial, no inventory, and no narrator — only the scene itself, full of books, letters, paintings, body positions, facial expressions, and objects that fit together into a complete and coherent explanation of what happened. The game never tells you if you are warm or cold; you only find out when you submit your final solution. The experience of correctly assembling a solution from nothing but visual evidence — and the almost physical satisfaction of the case-closed confirmation — is unlike anything else in games. The art style is deliberately grotesque and distinctive: slightly wrong proportions, vivid colour, expressive faces that communicate information clearly without being photorealistic. The game spans 12 main cases (plus DLC) following the Golden Idol itself as it passes through generations of English society, each case more complex than the last. BAFTA winner for Game Design. Metacritic 88 on PC.",
    why_zh:
      '黄金神像案（2022 年，Color Gray Games）是一款推理谜题游戏，向你展示 18 世纪英格兰的一系列完整插图谋杀现场，并要求你填写一组空白：受害者姓名、死因、凶手、动机、手段。没有对话，没有教程，没有库存，没有叙述者——只有场景本身，充满了书籍、信件、绘画、身体姿态、面部表情和拼凑成完整连贯解释的物品。仅凭视觉证据正确组装解答的体验——以及案件结案确认时几乎物理性的满足感——是游戏中其他任何东西都无法比拟的。BAFTA 游戏设计奖得主。PC 版 Metacritic 88 分。',
    tip_en: "Read every single word visible in the scene — letters, book titles, labels on bottles, inscriptions on paintings, names on gravestones. The solution always uses information that is visible if you look carefully enough. When stuck, try naming every figure in the scene before worrying about the solution — sometimes correctly establishing identities unlocks the logic of the rest. The game has no partial credit: you either submit a fully correct solution or you do not; do not guess the last few blanks before you are confident, as a wrong solution does not tell you which specific answer was incorrect. The 'Spider of Lanka' DLC is considered excellent and worth playing after the main game.",
    tip_zh: '阅读场景中可见的每一个单词——信件、书名、瓶子上的标签、画作上的铭文、墓碑上的名字。如果足够仔细地观察，解答总是使用可见的信息。卡住时，在担心解答之前先尝试命名场景中的每个人物——有时正确建立身份会解锁其余部分的逻辑。游戏没有部分分数：你要么提交完全正确的解答，要么不提交；在有把握之前不要猜测最后几个空白，因为错误的解答不会告诉你哪个具体答案是错误的。"兰卡蜘蛛" DLC 被认为非常出色，值得在主游戏之后游玩。',
  },
  immortality: {
    title_en: 'Immortality',
    title_zh: '永生',
    emoji: '🎬',
    tag_en: 'An archival mystery about a missing actress across three films across three decades — you search a database of clips, discover connections between scenes and performers, and gradually assemble a story that defies easy description',
    tag_zh: '关于一位女演员在三个十年跨越三部电影中失踪的档案谜题——你搜索片段数据库，发现场景和表演者之间的联系，逐渐组装一个难以简单描述的故事',
    platform_en: 'Available on: PC (Steam, Xbox Game Pass ~$20), iOS/Android (Apple Arcade, Netflix), Xbox. Available on Game Pass and Apple Arcade at no extra cost. Winner of 11 Game Awards including SAG Award.',
    platform_zh: '可在以下平台获取：PC（Steam、Xbox Game Pass 约 20 美元）、iOS/Android（Apple Arcade、Netflix）、Xbox。Game Pass 和 Apple Arcade 无额外费用。赢得包括 SAG 奖在内的 11 个游戏奖项。',
    why_en:
      "Immortality (2022, Half Mermaid / Sam Barlow) is the third and most ambitious game in Sam Barlow's FMV mystery trilogy — a game where you navigate a database of footage from three fictional films made in 1968, 1970, and 1999 starring the same actress, Marissa Marcel, who disappeared after each one and was never seen again. You discover clips by matching actors across scenes: click on a face, a prop, a gesture in one clip, and the system jumps you to another clip containing that same element. As you watch more footage — rehearsal takes, deleted scenes, behind-the-scenes footage, the films themselves — you begin to notice things that cannot be explained by accident: things in the background of 1968 that should not exist until 1999; a reflection that contradicts what a character says; an edit that reveals something about what the camera is avoiding. The game operates on two levels simultaneously: a surface-level missing-persons mystery and a deeper metaphysical story that requires you to completely reassemble your understanding of what you are watching. Winner of 11 Game Awards including the Screen Actors Guild Award for Outstanding Performance by a Cast (the first video game to win this award). Metacritic 87 on PC.",
    why_zh:
      '永生（2022 年，Half Mermaid/Sam Barlow）是 Sam Barlow FMV 神秘三部曲中的第三部也是最雄心勃勃的作品——你导航由同一女演员玛丽莎·马塞尔主演的 1968 年、1970 年和 1999 年三部虚构电影片段数据库，她在每部电影后失踪并再未出现。随着你观看更多镜头，你开始注意到无法被偶然解释的事情。游戏同时在两个层面运作：表面层面的失踪人员谜题和更深层的形而上学故事。赢得包括屏幕演员协会奖在内的 11 个游戏奖项（第一款赢得此奖的电子游戏）。PC 版 Metacritic 87 分。',
    tip_en: "The game rewards systematic searching: when you unlock a new clip, immediately click on every face, prop, and distinctive object in it to jump to related footage. The database has a hidden organisational logic — understanding how the matching system works reveals connections that feel like genuine discoveries rather than lucky guesses. Do not try to assemble a complete theory too early: the game wants you to hold contradictions in mind simultaneously and let understanding arrive gradually. The game's deeper layer is intentionally difficult to perceive at first — if you finish the surface mystery and something still feels unresolved, you have not found the real game yet. Playing with headphones substantially improves the experience.",
    tip_zh: '游戏奖励系统性搜索：当你解锁新片段时，立即点击其中每张脸、道具和独特物品以跳转到相关片段。数据库有一个隐藏的组织逻辑——理解匹配系统的工作方式揭示了感觉像是真正发现而非幸运猜测的联系。不要太早尝试组装完整理论：游戏希望你同时在脑中保持矛盾，让理解逐渐到来。游戏的更深层最初故意难以察觉——如果你完成了表面谜题但仍然感觉有什么未解决，你还没找到真正的游戏。用耳机游玩显著改善了体验。',
  },
  vault: {
    title_en: "Heaven's Vault",
    title_zh: '天堂穹顶',
    emoji: '⚗️',
    tag_en: 'An archaeology adventure where you decipher an actual constructed ancient language — the more you explore ruins and inscriptions, the more the grammar clicks into place and a lost civilisation becomes readable',
    tag_zh: '一场考古冒险，你在其中破译一种真实构建的古代语言——你探索的废墟和铭文越多，语法就越清晰，失落的文明变得可读',
    platform_en: 'Available on: PC (Steam ~$25), PlayStation 4, Nintendo Switch (~$25). Developed by Inkle (80 Days, Sorcery!). Frequently on sale for ~$10.',
    platform_zh: '可在以下平台获取：PC（Steam 约 25 美元）、PlayStation 4、Nintendo Switch（约 25 美元）。由 Inkle 开发（80 天、魔法！）。经常打折至约 10 美元。',
    why_en:
      "Heaven's Vault (2019, Inkle) is an archaeological adventure game set in the Nebula, a cluster of moons connected by ancient rivers of space, where civilisations have risen and fallen in cycles. You play as Nina, a historian-archaeologist who can interact with ancient inscriptions, propose translations based on visual context and previously decoded words, and gradually assemble a working understanding of an entirely invented ancient language. The language was designed by linguistic consultant Martin Edwardes to be internally consistent and decodable through gameplay — not just an aesthetic dressing but an actual constructed language with grammar, compound words, and systematic relationships between signs. As you translate more inscriptions, your understanding compounds: a word you decoded on a merchant's crate becomes essential for understanding a temple's foundation myth. The game's branching dialogue system means that what you say, who you trust, and what you bring back from expeditions shape Nina's relationships and the ending you receive. The narrative spans multiple expeditions to different ruins and builds towards a reveal about the Nebula's cyclical history that is more emotionally resonant if you have engaged with the translation system seriously. Metacritic 80 on PC.",
    why_zh:
      '天堂穹顶（2019 年，Inkle）是一款设定在星云的考古冒险游戏，星云是由古老空间河流连接的卫星群，文明已在周期中兴衰。你扮演尼娜，一位可以与古代铭文互动、根据视觉语境和之前解码的词语提出翻译、并逐渐组装一种完全发明的古代语言的历史学家兼考古学家。该语言由语言学顾问 Martin Edwardes 设计，具有内部一致性并可通过游戏破译——不只是美学装饰，而是有语法、复合词和符号之间系统关系的真实构建语言。PC 版 Metacritic 80 分。',
    tip_en: "Do not skip translating inscriptions even when you are confident about the plot — each new translation compounds your understanding of the language in ways that make later inscriptions significantly easier to parse. When you are uncertain about a word, make your best guess rather than skipping: wrong translations are recorded but the game never punishes you for trying, and seeing what does not fit is part of the learning process. The robot companion Oroi provides key context about the Nebula's history that is easy to miss if you rush past dialogue options. Multiple playthroughs reveal significantly different interpretations of the ending — the second playthrough after understanding the full story hits very differently from the first.",
    tip_zh: '即使你对情节有把握，也不要跳过翻译铭文——每次新翻译都以让后续铭文显著更容易解析的方式增加你对语言的理解。当你对一个词不确定时，做出你最好的猜测而不是跳过：错误翻译会被记录，但游戏从不惩罚你尝试，看什么不合适是学习过程的一部分。机器人同伴 Oroi 提供了关于星云历史的关键背景，如果你仓促跳过对话选项很容易错过。多次游玩揭示了结局的显著不同解释——在理解完整故事后的第二次游玩与第一次的感受截然不同。',
  },
}

function calcResult(answers: Pick[]): Pick {
  const counts: Record<Pick, number> = { disco: 0, golden: 0, immortality: 0, vault: 0 }
  for (const a of answers) counts[a]++
  return Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0] as Pick
}

export function DetectiveNarrativeQuiz({ locale }: { locale: string }) {
  const isZh = locale === 'zh'
  const [answers, setAnswers] = useState<(Pick | null)[]>(Array(QUESTIONS.length).fill(null))
  const [submitted, setSubmitted] = useState(false)

  const allAnswered = answers.every((a) => a !== null)

  if (submitted) {
    const result = RESULTS[calcResult(answers as Pick[])]
    const url = `${BASE_URL}/${locale}/quizzes/detective-narrative-games-quiz`
    const shareText = isZh
      ? `侦探叙事游戏推荐结果：「${result.title_zh}」！${result.tag_zh}。找到你的：${url}`
      : `My detective game recommendation: ${result.title_en} — ${result.tag_en}. Find yours: ${url}`

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
              ? 'TendFarm 正在研发农场节律追踪功能——把游戏里的专注感带入真实日常。'
              : 'TendFarm is building a farm rhythm tracker — bringing the focused presence of game-world investigation into real daily life.'}
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
          {isZh ? '哪款侦探叙事游戏最适合你？' : 'Which Detective Narrative Game Is Right for You?'}
        </h1>
        <p className="text-sm text-[#8a9a7a]">
          {isZh
            ? '6 个问题，从极乐迪斯科、黄金神像案、永生、天堂穹顶中找到你的完美悬疑体验'
            : '6 questions to match you with Disco Elysium, The Case of the Golden Idol, Immortality, or Heaven\'s Vault'}
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
        {isZh ? '找到我的侦探游戏' : 'Find My Detective Game'}
      </button>
    </div>
  )
}
