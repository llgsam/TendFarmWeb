'use client'

import { useState } from 'react'
import { BASE_URL } from '@/lib/config'

type Pick = 'sos' | 'sandrock' | 'persona4' | 'feth'

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
    q_en: 'How do you most enjoy building relationships with NPCs in a game?',
    q_zh: '在游戏中，你最喜欢以哪种方式与 NPC 建立关系？',
    options: [
      { en: 'Slowly through daily routines, seasonal gifts, and festivals — until I know this person well enough to spend a life with them', zh: '通过日常惯例、应季礼物和节日慢慢建立——直到我足够了解这个人，愿意与他们共度一生', type: 'sos' },
      { en: 'By helping people with their real problems — completing commissions, seeing how my work changes their daily life, watching the town grow around me', zh: '通过帮助人们解决真实问题——完成委托、看到我的工作如何改变他们的日常生活、看着小镇在我周围成长', type: 'sandrock' },
      { en: 'Through deliberate time investment — choosing each day whose story I want to deepen, earning their trust through shared activities until I see who they truly are', zh: '通过刻意的时间投入——每天选择我想深化谁的故事，通过共同活动赢得他们的信任，直到我看到他们的真实面目', type: 'persona4' },
      { en: 'By committing to a group — choosing my people, supporting them through training and hardship, and watching the bonds we build define the outcome of everything we face together', zh: '通过对一个群体的承诺——选择我的人，在训练和困难中支持他们，看着我们建立的纽带决定我们共同面对的一切结果', type: 'feth' },
    ],
  },
  {
    q_en: 'How much mechanical challenge do you want alongside the social simulation?',
    q_zh: '在社交模拟之外，你希望游戏提供多大程度的机制挑战？',
    options: [
      { en: 'Low — seasonal farming rhythms, some light exploration, and relationship events are all the challenge I need', zh: '低——季节性农业节奏、一些轻度探索和关系事件就是我需要的全部挑战', type: 'sos' },
      { en: 'Low to moderate — I want crafting commissions and some optional combat, but the town relationships are the real draw', zh: '低到中等——我想要制作委托和一些可选战斗，但小镇关系才是真正的吸引力', type: 'sandrock' },
      { en: 'Moderate — dungeon exploration with a real-time limit alongside a full school-life social calendar that I have to balance carefully', zh: '中等——在有真实时间限制的地下城探索和需要仔细平衡的完整校园社交日历之间取得平衡', type: 'persona4' },
      { en: 'High — I want tactical chess-like battles where positioning, unit classes, and the relationships I have built all determine whether my team survives', zh: '高——我想要战术性的国际象棋式战斗，阵型、单位职业和我建立的关系共同决定我的队伍是否能存活', type: 'feth' },
    ],
  },
  {
    q_en: 'How important is story — and what kind of story do you want?',
    q_zh: '故事对你有多重要——你想要哪种类型的故事？',
    options: [
      { en: 'Gentle and warm — I want character growth and seasonal milestones, not dramatic twists, with marriage as a meaningful emotional destination', zh: '温和而温暖——我想要角色成长和季节性里程碑，而不是戏剧性转折，婚姻作为有意义的情感目的地', type: 'sos' },
      { en: 'Gradually revealed — I want to uncover the town\'s history and each character\'s backstory through helping them, rather than through dramatic cutscenes', zh: '逐渐揭示——我想通过帮助他人来揭开小镇的历史和每个角色的背景故事，而不是通过戏剧性的过场动画', type: 'sandrock' },
      { en: 'Central and surprising — I want a year-long mystery with genuine emotional payoff, where understanding the characters\' true selves is as important as solving the case', zh: '核心且令人惊喜——我想要一个全年的悬案，有真实的情感回报，理解角色的真实自我与解案同样重要', type: 'persona4' },
      { en: 'Epic with major revelations — I want the story to recontextualize everything I thought I knew about the world and the people in it, with choices that carry permanent weight', zh: '史诗级且有重大启示——我希望故事重新诠释我以为了解的关于世界和其中人物的一切，选择具有永久性的分量', type: 'feth' },
    ],
  },
  {
    q_en: 'Which aesthetic world draws you in?',
    q_zh: '哪种美学世界最吸引你？',
    options: [
      { en: 'A cozy Japanese-inspired rural village with farmland, seasonal festivals, a beach, and a cast of charming marriage candidates', zh: '一个充满魅力的日式乡村，有农田、季节性节日、海滩，以及一群迷人的结婚候选人', type: 'sos' },
      { en: 'A warm desert town being rebuilt from ruins — a western-frontier community full of quirky crafters and a growing town I helped save', zh: '一个正在从废墟中重建的温暖沙漠小镇——一个充满古怪工匠的西部边疆社区，以及一个我帮助拯救的成长中的城镇', type: 'sandrock' },
      { en: 'A 2000s small-town Japanese high school with a supernatural fog, a mysterious TV world, and a murder mystery that only my group of friends can solve', zh: '一个有超自然迷雾、神秘电视世界和只有我的朋友圈才能解开的谋杀悬案的 2000 年代日本小镇高中', type: 'persona4' },
      { en: 'A medieval fantasy monastery-school divided into three rival noble houses, with a war on the horizon and complex politics defining every alliance', zh: '一所分为三个相互竞争的贵族学院的中世纪奇幻修道院学校，地平线上战争即将爆发，复杂的政治定义着每一个联盟', type: 'feth' },
    ],
  },
  {
    q_en: 'How long do you want the experience to last?',
    q_zh: '你希望这段体验持续多长时间？',
    options: [
      { en: '40-60 hours — a full in-game year with a second playthrough available if I want to try a different marriage path', zh: '40-60 小时——完整的游戏内一年，如果我想尝试不同的婚姻路线，还有第二周目可用', type: 'sos' },
      { en: '60-100 hours — rebuilding an entire town across multiple in-game years, with friendship arcs completing at different paces', zh: '60-100 小时——在多个游戏内年份中重建整个小镇，友情弧线以不同的节奏完成', type: 'sandrock' },
      { en: '80-120+ hours — one full calendar year with multiple dungeon runs, the ability to complete all Social Links, and New Game+ for everything I missed', zh: '80-120+ 小时——完整的一个日历年，有多次地下城探索、完成所有社交链接的能力，以及为了弥补遗漏的全部内容的新游戏+', type: 'persona4' },
      { en: '60-80 hours per route — with 3+ fully different story routes that each reveal different truths about the world and characters I thought I knew', zh: '每条路线 60-80 小时——3+ 条完全不同的故事路线，每条都揭示了关于我以为了解的世界和角色的不同真相', type: 'feth' },
    ],
  },
  {
    q_en: 'Which "perfect game day" scenario sounds best?',
    q_zh: '哪种"完美游戏日"场景听起来最棒？',
    options: [
      { en: 'Tend crops, drop off a gift for my favorite villager on their birthday, attend the summer festival with them, and watch the sun set over the farmland', zh: '打理农作物、在我最喜欢的村民生日那天送去礼物、与他们一起参加夏日节日，看着夕阳沉落在农田上', type: 'sos' },
      { en: 'Complete a craftsman commission that unlocks more of an NPC\'s backstory, upgrade my workshop with the rewards, and hear how my work changed someone\'s life', zh: '完成一个工匠委托，解锁更多 NPC 的背景故事，用奖励升级我的工坊，听说我的工作如何改变了某人的生活', type: 'sandrock' },
      { en: 'Spend the school day with a Social Link partner, study for exams in the evening, then enter the TV World for a dungeon run with the entire Investigation Team', zh: '在学校与一个社交链接伙伴共度时光，晚上为考试学习，然后带着整个调查队进入电视世界进行地下城探索', type: 'persona4' },
      { en: 'Teach class, spend Free Time unlocking a new support conversation with a student, then carefully position my units in a pivotal battle where one wrong move loses someone forever', zh: '上课、利用自由时间与一名学生解锁新的支援对话，然后在一场关键战役中仔细部署我的单位，一步错就会永远失去某人', type: 'feth' },
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
  sos: {
    title_en: 'Story of Seasons: A Wonderful Life',
    title_zh: '牧场物语：美好的生活',
    emoji: '🌸',
    tag_en: 'The classic farming and marriage sim — remastered with modern polish — where building a life in a cozy rural village across multiple in-game years is the entire point',
    tag_zh: '经典农场和婚姻模拟——以现代精致感重制——在一个舒适乡村建立生活，跨越多个游戏内年份就是全部的意义',
    platform_en: 'Available on: PC (Steam), Nintendo Switch, PS4, PS5, Xbox — about $40',
    platform_zh: '可在以下平台获取：PC（Steam）、Nintendo Switch、PS4、PS5、Xbox——约 40 美元',
    why_en:
      "Story of Seasons: A Wonderful Life (2023) is the high-quality remake of the beloved 2004 Harvest Moon: A Wonderful Life, bringing the classic with updated visuals, quality-of-life improvements, and additional marriage candidates including same-sex options. The game is set in Forget-Me-Not Valley, a small agricultural community with a rich cast of permanent villagers — each with their own personality, backstory, and routines. Unlike most farming games, A Wonderful Life spans multiple decades: your farm grows across Spring-Summer-Fall-Winter cycles over years, your child grows up, and the village itself changes over time. Relationships are developed through regular conversation, seasonal gift-giving, attending villager events, and, eventually, choosing a marriage partner. The depth comes from time: there is no rushing. Each villager changes over the years in response to your relationship; some leave if you ignore them, some grow in ways that are rewarding to watch. For Stardew Valley players who love the social simulation aspect more than the farming: this is the franchise that inspired it, with a distinctly different pace and emotional register.",
    why_zh:
      '牧场物语：美好的生活（2023 年）是备受喜爱的 2004 年《牧场物语：美好的生活》的高质量重制版，以更新的画面、生活质量改进和额外的结婚候选人（包括同性选项）带来了这部经典作品。游戏设定在勿忘谷，一个有着丰富常驻村民阵容的小农业社区——每个人都有自己的个性、背景故事和日常。与大多数农场游戏不同，美好的生活跨越多年：你的农场在多年的春夏秋冬循环中成长，你的孩子长大，村庄本身随着时间的推移而变化。关系通过定期对话、季节性赠礼、参加村民活动，以及最终选择结婚伴侣来发展。深度来自时间：没有捷径。每个村民随着年份的推移根据你们的关系而变化；一些人如果被忽视会离开，一些人的成长令人欣慰地看着。对于比农业更喜欢社交模拟方面的星露谷玩家：这是激发它的特许经营权，具有截然不同的节奏和情感基调。',
    tip_en: "Talk to every villager every day in the first in-game year — relationships decay if neglected, and the marriage window closes at the end of Chapter 2 (the second in-game year). Identify your preferred marriage candidate early and maintain their friendship score consistently. Your child's career in adulthood is influenced by how you raise them in Chapter 3.",
    tip_zh: '在游戏内第一年每天与每个村民交谈——如果被忽视，关系会衰退，婚姻窗口在第 2 章结束时关闭（游戏内第二年）。早点确认你偏好的结婚候选人，持续保持他们的友好度。你的孩子在成年后的职业受到你在第 3 章如何抚养他们的影响。',
  },
  sandrock: {
    title_en: 'My Time at Sandrock',
    title_zh: '沙石镇时光',
    emoji: '🏜️',
    tag_en: 'Build, craft, and befriend your way through a charming desert frontier town — a spiritual upgrade from My Time at Portia with more depth, more characters, and a more complete story',
    tag_zh: '在迷人的沙漠边疆小镇建造、制作和交友——一款精神上从帕鲁世界升级的游戏，有更多深度、更多角色和更完整的故事',
    platform_en: 'Available on: PC (Steam, Epic), Nintendo Switch, PS4, PS5, Xbox — about $35',
    platform_zh: '可在以下平台获取：PC（Steam、Epic）、Nintendo Switch、PS4、PS5、Xbox——约 35 美元',
    why_en:
      "My Time at Sandrock (2023) is the follow-up to My Time at Portia and represents a significant upgrade in every dimension: larger cast of characters, more developed relationship arcs, a complete and more emotionally satisfying story, and a desert frontier aesthetic that gives the world a distinct identity. You play as a builder who arrives in the struggling town of Sandrock and takes over an abandoned workshop, taking on commissions from townsfolk to craft everything from furniture to infrastructure. The relationship system is generous: befriending characters unlocks their backstory missions and eventually romance options. The town evolves as your commissions complete — you will visibly see Sandrock transform over time. Compared to Portia, Sandrock has notably better writing, more complex characters (each has real issues and arcs that resolve over time), and a main story that builds to a genuinely dramatic climax. For players who want the warmth of a farming sim but in a different setting: Sandrock delivers the cozy daily rhythm in a desert Western aesthetic that feels fresh and distinct from Japan-inspired farming games.",
    why_zh:
      '沙石镇时光（2023 年）是帕鲁世界的续作，在各个维度都有显著提升：更大的角色阵容、更发达的关系弧线、更完整且情感上更令人满足的故事，以及给世界带来独特身份的沙漠边疆美学。你扮演一个到达挣扎中的沙石镇并接管一个废弃工坊的建造者，接受村民的委托，制作从家具到基础设施的一切。关系系统很慷慨：与角色交朋友可以解锁他们的背景故事任务，最终还有浪漫选项。随着你完成委托，小镇会发展——你会随着时间的推移目睹沙石镇的转变。与帕鲁世界相比，沙石镇有明显更好的文字、更复杂的角色（每个人都有随时间解决的真实问题和弧线），以及一个真正达到戏剧性高潮的主线故事。',
    tip_en: "Prioritize upgrading your Workshop storage early — running out of material slots while mid-commission is the most common frustration. Check the commission board every morning before deciding your day's work. Romance options unlock after becoming friends first; don't skip the friendship gifts.",
    tip_zh: '优先早期升级你的工坊存储——在完成委托途中用完材料槽是最常见的挫折。每天早上在决定当天工作之前检查委托板。浪漫选项在先成为朋友后解锁；不要跳过友情礼物。',
  },
  persona4: {
    title_en: 'Persona 4 Golden',
    title_zh: '女神异闻录 4 黄金版',
    emoji: '🔶',
    tag_en: 'A year in a small Japanese town — balance high school social life, deep friendships (Social Links), and dungeon exploration in a time-management RPG built around who you choose to know',
    tag_zh: '在一个日本小镇度过的一年——在一款以你选择认识的人为核心的时间管理 RPG 中，平衡高中社交生活、深厚友谊（社交链接）和地下城探索',
    platform_en: 'Available on: PC (Steam), PS Vita (original), PlayStation 3 (base game) — about $20 on Steam. Also in the Persona 3 Reload + Golden bundle.',
    platform_zh: '可在以下平台获取：PC（Steam）、PS Vita（原版）、PlayStation 3（基础版）——Steam 上约 20 美元。也包含在女神异闻录 3 重制版 + 黄金版捆绑包中。',
    why_en:
      "Persona 4 Golden (2012, PC release 2020) is one of the most beloved JRPGs ever made — a game where the social simulation is as mechanically deep and emotionally rewarding as the dungeon exploration. You play as a city student who moves to the rural town of Inaba for a year, and shortly after arriving, a string of murders begins. The Investigation Team — your group of high school friends — discovers they can enter televisions and navigate a supernatural dungeon world. The Social Link system is the game's defining feature: each significant character represents an Arcana, and spending time with them unlocks story content that directly strengthens your Persona fusions. Time management is real — each day has limited slots, and choosing to study, work part-time, fish, deepen a friendship, or enter the dungeon has meaningful tradeoffs. The writing is excellent, the ensemble cast is beloved, and the murder mystery is genuinely compelling. At $20 on Steam for 80-100+ hours of content, it is one of the most exceptional value RPGs available. A perfect entry point to the Persona series.",
    why_zh:
      '女神异闻录 4 黄金版（2012 年，2020 年 PC 发行）是有史以来最受喜爱的 JRPG 之一——一款社交模拟在机制深度和情感回报上与地下城探索同样丰富的游戏。你扮演一名搬到农村稻叶镇度过一年的城市学生，抵达后不久，一系列谋杀案开始发生。调查队——你的高中朋友群——发现他们可以进入电视机并在超自然地下城世界中导航。社交链接系统是游戏的决定性特色：每个重要角色代表一种塔罗牌，与他们共度时光可以解锁故事内容，直接强化你的女神合成。时间管理是真实的——每天有有限的时间段，选择学习、兼职工作、钓鱼、深化友谊或进入地下城都有有意义的取舍。文字出色，角色阵容备受喜爱，谋杀悬案真正引人入胜。Steam 上 20 美元可获得 80-100+ 小时的内容，是最具价值的 RPG 之一。',
    tip_en: "Raise your Social Stats (Courage, Knowledge, etc.) first — many Social Links have a minimum stat requirement before you can start them. Do part-time jobs at the Beef Bowl to raise Knowledge, watch DVDs at home for other stats. Enter the dungeon as soon as a new victim appears, then clear the rest of the month doing Social Links.",
    tip_zh: '首先提升你的社交属性（勇气、知识等）——许多社交链接在你开始之前有最低属性要求。在牛肉盖饭餐厅打工以提升知识，在家观看 DVD 提升其他属性。一旦新的受害者出现就进入地下城，然后剩余月份都用来深化社交链接。',
  },
  feth: {
    title_en: 'Fire Emblem: Three Houses',
    title_zh: '火焰纹章：风花雪月',
    emoji: '⚔️',
    tag_en: 'Teach students, build bonds, then lead them into tactical battle — a game where relationships you forge at a monastery school determine who lives and dies in a war that will shake the world',
    tag_zh: '教导学生、建立纽带，然后带领他们进入战术战斗——一款你在修道院学校建立的关系决定谁在一场将震撼世界的战争中生存和死亡的游戏',
    platform_en: 'Available on: Nintendo Switch only — about $60 new, often $30-40 secondhand or on sale. Cindered Shadows DLC adds significant content.',
    platform_zh: '可在以下平台获取：仅 Nintendo Switch——新品约 60 美元，二手或促销时通常 30-40 美元。灰烬之影 DLC 增加了大量内容。',
    why_en:
      "Fire Emblem: Three Houses (2019) is one of the most acclaimed Nintendo Switch games and one of the finest tactical RPGs ever made — a game that pairs an expansive school-life social simulation with permanent-death tactical combat, and makes both feel equally important. You play as Byleth, a mercenary who becomes a professor at Garreg Mach Monastery, choosing one of three noble houses to teach: the Golden Deer (bright and idealistic), the Black Eagles (ambitious and complex), or the Blue Lions (disciplined and haunted by trauma). The school phase involves teaching classes, spending Free Time deepening Support conversations with students and faculty, recruiting students from other houses, and exploring the monastery. Then battles begin, and the bonds you built determine whether your students support each other effectively. The Support system creates hundreds of character-specific conversations between every pairing; watching relationships develop through battle and hardship is the emotional core. With three major story routes (and a fourth hidden route), each revealing different truths about the world's history, replay value is enormous. One of the best games of its generation.",
    why_zh:
      '火焰纹章：风花雪月（2019 年）是最受好评的 Nintendo Switch 游戏之一，也是有史以来最优秀的战术 RPG 之一——一款将广泛的学校生活社交模拟与永久死亡战术战斗配对，并让两者都感觉同样重要的游戏。你扮演贝雷斯，一名成为加纳克修道院教授的雇佣兵，选择三个贵族学院之一来执教：金鹿（明亮而理想主义）、黑鹰（雄心勃勃且复杂）或蓝狮（纪律严明且被创伤困扰）。学校阶段包括教导课程、利用自由时间深化与学生和教职员工的支援对话、从其他学院招募学生，以及探索修道院。然后战斗开始，你建立的纽带决定你的学生是否能有效地相互支持。支援系统在每对角色之间创造了数百个特定角色对话；通过战斗和困难看着关系发展是情感核心。有三条主要故事路线（以及第四条隐藏路线），每条都揭示了世界历史的不同真相，重玩价值巨大。',
    tip_en: "Eat meals with students to build Faculty Points (used for extra tutoring) and relationship points simultaneously. On the 'Explore' days, prioritize the greenhouse (harvest and replant every Sunday) and fishing (rare fish unlock key item rewards). Always save before a battle and accept that some characters may fall — this is part of the emotional weight the game is designed to carry.",
    tip_zh: '与学生一起用餐，同时建立教职积分（用于额外辅导）和关系积分。在"自由探索"日，优先考虑温室（每周日收割和重新种植）和钓鱼（稀有鱼类解锁关键物品奖励）。在战斗前始终存档，接受一些角色可能阵亡——这是游戏设计来承载的情感分量的一部分。',
  },
}

function calcResult(answers: Pick[]): Pick {
  const counts: Record<Pick, number> = { sos: 0, sandrock: 0, persona4: 0, feth: 0 }
  for (const a of answers) counts[a]++
  return Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0] as Pick
}

export function RelationshipSimQuiz({ locale }: { locale: string }) {
  const isZh = locale === 'zh'
  const [answers, setAnswers] = useState<(Pick | null)[]>(Array(QUESTIONS.length).fill(null))
  const [submitted, setSubmitted] = useState(false)

  const allAnswered = answers.every((a) => a !== null)

  if (submitted) {
    const result = RESULTS[calcResult(answers as Pick[])]
    const url = `${BASE_URL}/${locale}/quizzes/relationship-sim-quiz`
    const shareText = isZh
      ? `社交关系模拟游戏推荐测验结果：「${result.title_zh}」！${result.tag_zh}。找到你的：${url}`
      : `My relationship sim recommendation: ${result.title_en} — ${result.tag_en}. Find yours: ${url}`

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
            ? '哪款以「关系」为核心的游戏最适合你？'
            : 'Which Game Built Around Relationships Is Right for You?'}
        </h1>
        <p className="text-sm text-[#8a9a7a]">
          {isZh
            ? '6 个问题，从牧场物语：美好的生活、沙石镇时光、女神异闻录 4、火焰纹章：风花雪月中找到你的游戏'
            : '6 questions to match you with Story of Seasons: A Wonderful Life, My Time at Sandrock, Persona 4 Golden, or Fire Emblem: Three Houses'}
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
        {isZh ? '找到我的社交关系模拟游戏' : 'Find My Relationship Game'}
      </button>
    </div>
  )
}
