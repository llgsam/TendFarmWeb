'use client'

import { useState } from 'react'
import { BASE_URL } from '@/lib/config'

type Pick = 'fomtremake' | 'doraemon' | 'sunnyside' | 'littledragon'

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
    q_en: 'What draws you most to cozy Japanese farming sims?',
    q_zh: '你最被日式温馨农场游戏的哪个方面吸引？',
    options: [
      { en: 'Recapturing childhood nostalgia — I want a faithful return to the classic Harvest Moon formula that defined the genre', zh: '重拾童年回忆——我想要回到那个定义了整个类型的经典牧场物语公式，纯正而忠实', type: 'fomtremake' },
      { en: 'A beloved IP as a gentle entry — familiar characters make the farming sim mechanics feel instantly welcoming and safe', zh: '用喜爱的IP作为温柔入口——熟悉的角色让农场游戏机制瞬间变得亲切，零负担上手', type: 'doraemon' },
      { en: 'Fresh modern anime style — I want vivid art, new ideas, and a contemporary take on the genre, not a nostalgia trip', zh: '焕新的现代动漫风格——我想要色彩鲜艳的画风、全新创意和当代视角，而不是怀旧之旅', type: 'sunnyside' },
      { en: 'Cooking, community, and a dragon — I want to nurture something unique: a café, regulars, and a creature that grows alongside me', zh: '料理、社区和一条龙——我想要守护一些独特的东西：一间咖啡馆、常客们，还有一起成长的小龙', type: 'littledragon' },
    ],
  },
  {
    q_en: 'How do you feel about game length and overall scope?',
    q_zh: '你对游戏时长和整体规模有什么感受？',
    options: [
      { en: 'Long and patient — I am happy to spend 50+ hours building relationships across multiple in-game years and seeing all seasonal events', zh: '漫长而专注——我很乐意花50小时以上，跨越多个游戏内年份建立关系、体验所有季节活动', type: 'fomtremake' },
      { en: 'Comfortable and completable — I want a 25-35 hour experience that tells a full story and lets me see the ending credits', zh: '舒适而完整——我想要一个25-35小时的体验，讲完一个完整故事，让我看到结局字幕', type: 'doraemon' },
      { en: 'Expansive and layered — I want lots of systems, quests, and content to explore across many sessions over months', zh: '宏大而层次丰富——我想要大量系统、任务和内容，可以在数月内多次游玩慢慢探索', type: 'sunnyside' },
      { en: 'Focused and intimate — I prefer a shorter story (20-25 hours) that knows its scope and ends with its narrative resolved', zh: '精炼而亲密——我更喜欢知道自己边界的短篇故事（20-25小时），在叙事完结时画上句点', type: 'littledragon' },
    ],
  },
  {
    q_en: 'How important is romance and marriage to your farming sim experience?',
    q_zh: '恋爱和结婚对你的农场游戏体验有多重要？',
    options: [
      { en: 'Central — building a relationship over years, choosing a spouse carefully, and raising a family is part of the core fantasy', zh: '非常核心——花数年时间建立感情、慎重选择伴侣、养育家庭，是整个游戏幻想的重要组成', type: 'fomtremake' },
      { en: 'Present but light — I enjoy the friendship and relationship mechanics but do not need marriage to be the emotional centerpiece', zh: '有就好——我享受友谊和关系机制，但不需要婚姻成为情感核心', type: 'doraemon' },
      { en: 'Important and expanded — I want expressive modern romance with meaningful dialogue, distinct backstories, and emotional scenes', zh: '重要且更丰富——我想要有表现力的现代恋爱系统，包含有意义的对话、独特的角色背景和情感场景', type: 'sunnyside' },
      { en: 'Not the focus — my emotional investment goes to the dragon and the café regulars rather than a romantic relationship', zh: '不是重点——我的情感投入在于小龙和咖啡馆常客，而不是浪漫关系', type: 'littledragon' },
    ],
  },
  {
    q_en: 'Which art and music aesthetic appeals to you most?',
    q_zh: '哪种画风和音乐美学最能打动你？',
    options: [
      { en: 'Warm pixel-adjacent 3D with that classic Marvelous pastoral score — nostalgic, gentle, and exactly what you remember', zh: '温暖的类像素3D风格，搭配经典Marvelous田园配乐——怀旧、温柔，和你记忆中的一模一样', type: 'fomtremake' },
      { en: 'Cheerful and colorful 3D faithful to Doraemon\'s iconic visual language — reassuring, familiar, and full of that Fujiko F. Fujio warmth', zh: '活泼缤纷的3D风格，忠实还原哆啦A梦的标志性视觉语言——令人安心，充满藤子·F·不二雄的温情', type: 'doraemon' },
      { en: 'Gorgeous anime-influenced 3D — bright, expressive character designs and environments that feel adjacent to modern JRPG aesthetics', zh: '华丽的动漫影响3D风格——明亮而富有表现力的角色设计和场景，接近现代JRPG美学', type: 'sunnyside' },
      { en: 'Gentle storybook 3D with a watercolor-adjacent softness — cozy and understated, more like a fairy tale than an anime', zh: '温柔的绘本感3D风格，带有水彩画般的柔和感——温馨而内敛，更像童话而非动漫', type: 'littledragon' },
    ],
  },
  {
    q_en: 'How do you relate to the history of the Harvest Moon / Story of Seasons franchise?',
    q_zh: '你和牧场物语/Story of Seasons系列有什么渊源？',
    options: [
      { en: 'Deep fan — I played Friends of Mineral Town on GBA and the feeling of returning to Mineral Town in HD has real emotional weight for me', zh: '深度粉丝——我在GBA上玩过矿石镇的伙伴们，以高清画质回归矿石镇对我来说有真实的情感重量', type: 'fomtremake' },
      { en: 'Newcomer via crossover — Doraemon brought me into the genre and I now want to explore more, but started with this soft landing', zh: '通过联动入坑——哆啦A梦带我进入这个类型，我现在想探索更多，但从这个温柔的起点开始的', type: 'doraemon' },
      { en: 'Forward-looking player — I appreciate the history but I am more excited about where the genre is heading than where it has been', zh: '前瞻型玩家——我欣赏历史，但对类型的未来发展比对过去更感兴奋', type: 'sunnyside' },
      { en: 'Creator-follower — I am specifically interested in what Yasuhiro Wada (Harvest Moon creator) makes, regardless of which company holds the license', zh: '跟随创作者——我特别关注和田康弘（牧场物语创始人）的新作，无论版权归属哪家公司', type: 'littledragon' },
    ],
  },
  {
    q_en: 'What does your ideal cozy farming session look like?',
    q_zh: '你理想中的温馨农场游戏时光是什么样的？',
    options: [
      { en: 'Morning chores, then gifts for the villager I like, then a festival — and slowly, across many seasons, I see them open up to me', zh: '早晨干农活，然后给喜欢的村民送礼物，再参加节日——就这样，跨越许多季节，慢慢看着他们对我敞开心扉', type: 'fomtremake' },
      { en: 'A peaceful afternoon with Doraemon and friends, planting crops, seeing what gadgets help today, and enjoying the gentle humor', zh: '和哆啦A梦及伙伴们一起的宁静下午，种种植物，看看今天哪个道具能帮上忙，享受温柔的幽默感', type: 'doraemon' },
      { en: 'A session where I complete a quest, discover a new area, deepen a relationship, and upgrade my farm — busy in the best way', zh: '完成一个任务、发现新区域、深化一段关系、升级农场的游戏时光——以最好的方式充实', type: 'sunnyside' },
      { en: 'Cooking for the café, watching my dragon grow a little bigger, and seeing a lonely customer slowly become a regular — quiet but meaningful', zh: '为咖啡馆备菜，看着小龙又长大了一点点，看一位孤独的顾客慢慢成为常客——安静却有意义', type: 'littledragon' },
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
  fomtremake: {
    title_en: 'Story of Seasons: Friends of Mineral Town',
    title_zh: '牧场物语：矿石镇的伙伴们（重制版）',
    emoji: '🏔️',
    tag_en: 'The Nostalgic Homecoming Farmer',
    tag_zh: '怀旧归乡的农场人',
    platform_en: 'Nintendo Switch · PC (Steam)',
    platform_zh: 'Nintendo Switch · PC (Steam)',
    why_en: `Story of Seasons: Friends of Mineral Town (2020) is the definitive modern version of one of the most beloved farming sims ever made. The original Harvest Moon: Friends of Mineral Town launched on Game Boy Advance in 2003 and became a touchstone for an entire generation of players who grew up tending crops before school, in the car, and under the covers at night with the backlight dimmed so no one would know they were still awake. The 2020 remake by Marvelous preserves everything that made the original special — Mineral Town's iconic cast, the four-season cycle, the festivals, the mines, and the slow accumulation of relationship hearts — while upgrading the visuals to a warm, clean 3D style and adding modern quality-of-life improvements including same-sex marriage options that let players experience the story in ways the original never allowed. The remake is not trying to reinvent the genre or compete with Stardew Valley on scope — it is an honest, loving reconstruction of something that meant a lot to people and still means something today. The heart of the game is the relationships: learning that Cliff feels isolated because he never found his place, that Gray hides his passion for blacksmithing behind gruffness, that Ann just wants someone to take her seriously. These are small-town stories told in short daily conversations over multiple in-game years, and if you have the patience to let them develop, they land with unexpected emotional force. Friends of Mineral Town is the game that taught a generation what farming sims could be, and the remake makes that lesson available again without compromising it.`,
    why_zh: `《牧场物语：矿石镇的伙伴们》(2020)是史上最受喜爱的农场模拟游戏之一的权威现代版本。原版《牧场物语：矿石镇的伙伴们》2003年登陆GameBoy Advance，成为整整一代玩家的童年情结——他们在上学前、坐车时、被子里偷偷开着背光玩到深夜。2020年重制版由Marvelous制作，保留了让原版如此特别的一切：矿石镇标志性的角色群、四季轮回、节日、矿山，以及缓慢积累的好感度——同时升级了视觉效果，加入了同性婚姻选项，让原版从未允许的故事成为可能。游戏的核心是人际关系：发现克利夫因为始终找不到归属感而感到孤独，格雷把对铁匠手艺的热情隐藏在粗鲁外表之下，安只是希望有人认真对待她。这些是小镇故事，通过跨越多个游戏年份的每日短暂对话缓慢展开，如果你有耐心等待它们发展，会带来出人意料的情感冲击。`,
    tip_en: `The most important early investment in Friends of Mineral Town is not upgrading your tools or expanding your farm — it is entering the mines and descending as deep as possible to unlock the Lake Mine before winter. The Lake Mine contains ore for the Cursed/Blessed tool upgrades that eventually eliminate tool stamina costs entirely, dramatically changing late-game efficiency. Time your mine descent pushes: go in the morning with full stamina, bring a Teleport Stone if you have one (or a Bodigizer XL), and always carry enough fodder to return safely. For relationship building, give the bachelors and bachelorettes gifts every day rather than every week — the heart points accumulate much faster with daily contact, and seeing their unique dialogue that unlocks at each heart level is among the game's richest content.`,
    tip_zh: `在《矿石镇的伙伴们》中，最重要的早期投资不是升级工具或扩大农场——而是进入矿山尽可能深入，在冬季之前解锁湖面矿山。湖面矿山包含诅咒/祝福工具升级所需的矿石，最终完全消除工具耐力消耗，彻底改变后期游戏效率。把握好进矿时机：早晨满耐力入矿，如果有传送石（或特效药）就带上，始终携带足够物品安全返回。建立关系方面，每天而不是每周给追求对象送礼物——每日接触能大幅加快好感度积累，解锁每个心形等级的专属对话是游戏最丰富的内容之一。`,
  },
  doraemon: {
    title_en: 'Doraemon: Story of Seasons',
    title_zh: '哆啦A梦：牧场物语',
    emoji: '🔵',
    tag_en: 'The Welcoming Crossover Farmer',
    tag_zh: '温柔联动的农场新人',
    platform_en: 'Nintendo Switch · PC (Steam)',
    platform_zh: 'Nintendo Switch · PC (Steam)',
    why_en: `Doraemon: Story of Seasons occupies a genuinely clever position in the genre: it uses one of the most beloved anime/manga franchises in history as a comfort blanket to introduce players to the farming sim loop who might otherwise find Stardew Valley's depth overwhelming or Friends of Mineral Town's dated mechanics off-putting. The game drops Nobita, Doraemon, Shizuka, Gian, and Suneo into a rural farming village and tasks them with helping the community thrive while raising crops and forming friendships. Crucially, the Doraemon gadgets are incorporated directly into gameplay — the Anywhere Door, the Take-copter, the Small Light — and seeing these beloved objects woven into farming sim mechanics creates a particular kind of delight that fans of either the franchise or the genre will appreciate. The farming systems are full-featured without being overwhelming: seasons matter, crop quality varies, animal husbandry is present, and the social calendar includes festivals and character-specific events. Doraemon: Story of Seasons was developed by Brownies and published by Bandai Namco in partnership with Marvelous, and it manages the franchise crossover gracefully — this is not a shallow licensed cash-in but a sincere attempt to make a gentle, well-crafted farming sim using beloved characters. The sequel, Friends of the Great Kingdom (2022), expands the concept significantly. For players who love Doraemon and want to try the genre, or who want a stress-free introduction with lower difficulty and a known IP providing emotional scaffolding, this is precisely the right game.`,
    why_zh: `《哆啦A梦：牧场物语》在类型中占据了一个真正聪明的位置：它用史上最受喜爱的动漫/漫画IP之一作为舒适的引导，将可能觉得星露谷太深或矿石镇重制版机制过时的玩家引入农场游戏循环。游戏将大雄、哆啦A梦、静香、胖虎和小夫送到一个农村小镇，任务是在种植作物、建立友谊的同时帮助社区繁荣。最妙的是，哆啦A梦的道具直接融入了游戏玩法——任意门、竹蜻蜓、缩小灯——看到这些深爱的道具编织进农场游戏机制，会给系列粉丝或类型爱好者带来独特的惊喜感。农耕系统功能完整但不过分复杂，这是一款真诚的、精心制作的农场游戏，而不是肤浅的授权圈钱之作。`,
    tip_en: `Doraemon: Story of Seasons is more forgiving than classic Harvest Moon games, but you can still accelerate your progress significantly by engaging with Doraemon's gadget events early. The gadgets are not just cosmetic — several unlock farming shortcuts that dramatically reduce daily workload. Prioritize completing the early story events that introduce each gadget rather than ignoring them to focus on pure farming efficiency. For social progression, Doraemon characters have hidden event triggers based on season and weather — on rainy days when you cannot farm, visit the characters you have been neglecting rather than staying home. The sequel (Friends of the Great Kingdom) is a significantly more ambitious game if you finish this one and want more, featuring improved graphics, deeper systems, and new characters while maintaining the same gentle tone.`,
    tip_zh: `《哆啦A梦：牧场物语》比经典牧场物语游戏更宽容，但你仍然可以通过早期参与哆啦A梦的道具事件来显著加速进度。这些道具不只是装饰性的——好几个能解锁大幅减轻日常工作量的农耕捷径。优先完成介绍每个道具的早期剧情事件，而不是忽略它们只专注纯农耕效率。关于社交进度，哆啦A梦角色有基于季节和天气的隐藏触发事件——在无法耕种的雨天，去拜访你一直忽视的角色，而不是待在家里。如果你玩完了这款游戏还想要更多，续作《哆啦A梦：大王国的伙伴们》是一款更有野心的作品，拥有改进的图形、更深入的系统和新角色，同时保持了相同的温柔基调。`,
  },
  sunnyside: {
    title_en: 'SunnySide',
    title_zh: 'SunnySide（阳光小镇）',
    emoji: '☀️',
    tag_en: 'The Modern Anime Farm Adventurer',
    tag_zh: '现代动漫农场冒险家',
    platform_en: 'PC (Steam)',
    platform_zh: 'PC (Steam)',
    why_en: `SunnySide, released in June 2024, represents one of the most ambitious attempts to push the farming sim formula forward while staying true to its Japanese design DNA. Developed by Pixelrager, SunnySide wears its anime influences openly — the character art is rich, expressive, and clearly inspired by modern JRPG aesthetics rather than the simpler art of early Harvest Moon titles. The game's premise involves rebuilding Himawari, a countryside town in Japan, from a state of neglect and decline — you are not just farming but working to restore a community that has been slowly dying, which gives the agricultural work a moral and emotional weight that more traditional farming sims do not always have. The content is genuinely dense: many marriage candidates with full story arcs, a deep friendship network, seasonal content, Japanese cultural festivals, cooking, crafting, and a robust farming system with both traditional crops and more exotic options. SunnySide is notable for representing Japanese rural culture authentically — the festivals, the food, the architecture, and the community dynamics feel grounded in real Japanese countryside life rather than a generic pastoral fantasy. The game targets players who want the emotional depth of Stardew Valley, the anime aesthetic of modern JRPGs, and a setting that is specifically Japanese rather than the vague European pastoralism of most Western-developed entries in the genre. For players who have always wanted a farming sim set in Japan that felt authentic rather than imported, SunnySide is the answer they have been waiting for.`,
    why_zh: `《SunnySide》（2024年6月发售）是将农场游戏公式向前推进同时保持日式设计DNA的最雄心勃勃的尝试之一。游戏的前提是重建日本一个名为向阳的乡村小镇——你不只是在种地，而是努力复兴一个缓慢衰落的社区，这让农业劳作有了更多道德和情感重量。内容密度真实存在：众多婚姻候选人拥有完整故事弧线、深度的友谊网络、季节性内容、日本文化节庆、烹饪、制作，以及包含传统作物和更具异域风情选项的农耕系统。SunnySide对日本农村文化的呈现是真实的——节日、食物、建筑和社区动态都植根于真实的日本乡间生活，而非泛泛的田园幻想。对于一直渴望一款设定在日本、感觉真实而非移植的农场游戏的玩家来说，SunnySide是他们等待已久的答案。`,
    tip_en: `SunnySide's community restoration mechanic is the engine that unlocks most of the game's content — improving Himawari's community score opens new shops, events, and areas. Invest early in the social systems rather than pure farming efficiency: attending every festival, completing town requests, and leveling friendships quickly pays off in unlocked content that then accelerates your farming. The Japanese cultural festival calendar is dense and rewarding — missing a festival is a full year's wait, so check the in-game calendar daily and prepare for upcoming events in advance. SunnySide's cooking system is deeper than in most farming sims and feeds directly into the relationship system, so learning which characters like which dishes and mastering recipe unlocks is one of the most efficient paths to advancing the story arcs you care about.`,
    tip_zh: `SunnySide的社区复兴机制是解锁游戏大部分内容的引擎——提高向阳镇的社区分数会开放新商店、活动和区域。早期投入社交系统而非纯农耕效率：参加每个节日、完成镇民委托、快速提升友谊值，这些都会很快得到回报，解锁能加速农耕的新内容。日本文化节日日历密集而丰厚——错过一个节日就要等整整一年，所以每天查看游戏内日历并提前为即将到来的活动做准备。SunnySide的烹饪系统比大多数农场游戏更深入，并直接与关系系统挂钩——了解哪些角色喜欢哪些菜肴、掌握食谱解锁，是推进你关心的故事弧线最有效的途径之一。`,
  },
  littledragon: {
    title_en: 'Little Dragon Café',
    title_zh: '小龙咖啡馆',
    emoji: '🐉',
    tag_en: 'The Dragon-Nurturing Café Keeper',
    tag_zh: '守护小龙的咖啡馆主人',
    platform_en: 'Nintendo Switch · PS4 · PC (Steam)',
    platform_zh: 'Nintendo Switch · PS4 · PC (Steam)',
    why_en: `Little Dragon Café is a game with a fascinating origin: it was created by Yasuhiro Wada, the man who invented the Harvest Moon series and pioneered the farming sim genre, after the IP dispute that separated him from the franchise he created. Wada's new game is not a farming sim in the traditional sense — it is a café management and dragon-raising adventure — but it carries all the DNA of his Harvest Moon work: the focus on community relationships, the seasonal rhythm, the theme of nurturing something from helplessness to thriving, and the belief that care and patience are their own rewards. The premise is fairy-tale simple: you run a café in an idyllic village. A small dragon hatches under your care. You raise it while managing the café and discovering the personal stories of the lonely, struggling, or broken villagers who come in as customers. What makes Little Dragon Café moving is how precisely its gameplay mechanics serve its emotional themes — the dragon's growth is literal and metaphorical, the café provides the physical space where people allow themselves to be helped, and Wada understands from decades of experience that the most powerful thing a cozy game can do is make you feel responsible for something fragile. The dragon mechanics are genuinely innovative: you name it, teach it recipes, take it on adventure runs, and watch its personality develop based on how you raise it. It is a smaller, shorter game than Stardew Valley or Friends of Mineral Town, but its 20-25 hour runtime contains more emotional precision per hour than almost anything else in the genre.`,
    why_zh: `《小龙咖啡馆》有一个迷人的起源：它由牧场物语系列创始人、整个农场游戏类型的先驱和田康弘创作——在一场将他与自己创造的系列分离的版权纠纷之后。和田的新游戏在传统意义上不是农场游戏——它是一个咖啡馆经营和养龙冒险游戏——但携带了他所有牧场物语作品的DNA：对社区关系的关注、季节节奏、从脆弱到繁荣的培育主题，以及相信关怀与耐心本身就是回报的信念。前提童话般简单：你在一个美好村庄经营一家咖啡馆。一条小龙在你的照料下破壳而出。你一边经营咖啡馆一边养育它，同时发现作为顾客前来的孤独、挣扎或受伤的村民的个人故事。让《小龙咖啡馆》动人的地方在于，它的游戏机制如何精确地服务于情感主题——龙的成长既是字面的也是隐喻的，咖啡馆提供了人们允许自己被帮助的物理空间。`,
    tip_en: `Little Dragon Café's most important mechanic to understand early is the Recipe system, which drives both café progression and the social storylines. Every customer has a favorite dish type, and discovering these through conversation then cooking the right meals during their arc is how you unlock each villager's story chapter. Keep the dragon fed and take it on regular ingredient-gathering runs — the dragon grows faster and develops better stats when it accompanies you consistently, and certain areas only open when the dragon reaches specific growth stages. The game is shorter than most farming sims, so do not rush past the dialogue or skip the café customers' personal stories — these conversations, delivered in slow fairy-tale pacing, are where Little Dragon Café earns its emotional core and where Wada's decades of experience in the genre reveal themselves most clearly.`,
    tip_zh: `《小龙咖啡馆》早期最重要的机制是菜谱系统，它驱动着咖啡馆进度和社交故事线。每位顾客都有偏爱的菜肴类型，通过对话发现这些偏好，然后在他们的故事弧线中做出正确的菜肴，是解锁每位村民故事章节的方式。保持小龙喂食并定期带它去采集食材——当你持续带着小龙时，它成长更快、数值发展更好，而且某些区域只有当小龙达到特定成长阶段才会开放。这款游戏比大多数农场游戏更短，所以不要急着跳过对话或略过咖啡馆顾客的个人故事——这些以童话节奏缓缓讲述的对话，正是《小龙咖啡馆》赢得情感核心的地方，也是和田数十年类型经验最清晰呈现的地方。`,
  },
}

function calcResult(answers: Pick[]): Pick {
  const counts: Record<Pick, number> = { fomtremake: 0, doraemon: 0, sunnyside: 0, littledragon: 0 }
  for (const a of answers) counts[a]++
  return Object.entries(counts).sort((x, y) => y[1] - x[1])[0][0] as Pick
}

export function CozyJapanFarmQuiz({ locale }: { locale: string }) {
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
      ? `我的日式温馨农场游戏推荐是《${r.title_zh}》！${r.emoji} 来测测你的结果？${BASE_URL}/zh/quizzes/cozy-japan-farm-quiz`
      : `My Japanese cozy farm game match is ${r.title_en}! ${r.emoji} Which one are you? ${BASE_URL}/en/quizzes/cozy-japan-farm-quiz`

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
            {isZh ? '想每天发现最适合你的农场游戏？' : 'Want daily farming game picks matched to your mood?'}
          </p>
          <p className="text-sm text-[#e8dcc8]">
            {isZh
              ? '试试 TendFarm App — 每天根据你的状态，推荐一款最适合你的农场游戏'
              : 'Try TendFarm App — personalized farming game picks every day based on how you feel'}
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
