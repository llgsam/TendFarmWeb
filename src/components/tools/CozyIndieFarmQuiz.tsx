'use client'

import { useState } from 'react'
import { BASE_URL } from '@/lib/config'

type Pick = 'dinkum' | 'kynseed' | 'littlewood' | 'tavern'

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
    q_en: 'Which world setting sounds most appealing for your farming life?',
    q_zh: '哪种世界背景最让你心动？',
    options: [
      { en: 'A sun-drenched Australian outback — kangaroos, cassowaries, and wild frontier vibes', zh: '阳光灿烂的澳大利亚内陆——袋鼠、鸸鹋和荒野开拓的生命力', type: 'dinkum' },
      { en: 'A magical English countryside where your character ages, raises children, and passes down a legacy', zh: '充满魔法的英式乡村，你的角色会变老、生儿育女，把事业代代相传', type: 'kynseed' },
      { en: 'A peaceful post-adventure town where a retired hero rebuilds a community from scratch', zh: '打倒黑暗魔王后的和平世界，退休英雄帮助幸存者重建美好小镇', type: 'littlewood' },
      { en: 'A cozy medieval crossroads where you run a tavern and host weary travelers every night', zh: '古老奇幻王国的十字路口，你经营一家小酒馆，每晚招待四方旅客', type: 'tavern' },
    ],
  },
  {
    q_en: 'Which core gameplay loop sounds most satisfying to you?',
    q_zh: '哪种核心玩法循环最让你满足？',
    options: [
      { en: 'Explore, mine, farm, build — a full pioneer sandbox where everything feeds everything else', zh: '探索荒野、挖矿采集、耕种农作、建设小镇——四线并进的开拓者沙盒', type: 'dinkum' },
      { en: 'Run multiple small businesses across generations — bakery, farm, apothecary — each child inheriting a different path', zh: '经营药铺、面包坊、农场等多种小生意，每一代孩子继承不同的道路', type: 'kynseed' },
      { en: 'Design and decorate your dream town at your own pace, inviting new residents and unlocking content freely', zh: '随心所欲地设计装饰理想小镇，邀请居民入住，自由解锁各种内容', type: 'littlewood' },
      { en: 'Grow ingredients, brew drinks, cook meals, then serve them to guests with distinct preferences', zh: '种菜、酿酒、下厨，再把佳肴端给有各自口味的旅客——经营即乐趣', type: 'tavern' },
    ],
  },
  {
    q_en: 'How do you feel about your character aging and the passage of time?',
    q_zh: '你对角色变老、时光流逝这类设计有何感受？',
    options: [
      { en: 'Seasonal rhythms are fine, but I prefer my character to stay the same person throughout the game', zh: '季节轮换挺好，但我希望全程操控同一个角色，不喜欢代际切换', type: 'dinkum' },
      { en: 'Deeply into it — watching my character age, marry, and have children who carry on the story is the whole point', zh: '非常着迷——看角色慢慢变老、结婚生子，让孩子延续故事，这才是重点', type: 'kynseed' },
      { en: 'Prefer timeless and pressure-free — no aging, no deadlines, just endless cozy building whenever I want', zh: '越轻松越好，不需要变老机制，没有截止日期，想建设就建设', type: 'littlewood' },
      { en: 'I want to see my tavern grow in reputation season by season — character aging does not matter to me', zh: '我想看酒馆的声誉随时间慢慢壮大，角色变不变老对我不重要', type: 'tavern' },
    ],
  },
  {
    q_en: 'What is your preferred relationship with wildlife and combat in a cozy game?',
    q_zh: '在治愈系游戏里，你对野生动物和战斗要素的态度是？',
    options: [
      { en: 'I enjoy hunting and fishing alongside farming — some danger from wild animals adds excitement', zh: '喜欢狩猎和钓鱼，偶尔遭遇野生动物的危险感让游戏更有张力', type: 'dinkum' },
      { en: 'Light combat against monsters and quirky enemies is fun, as long as it stays low-stakes and charming', zh: '打打轻度的小怪和奇葩敌人挺有趣，只要节奏轻松、风格可爱就好', type: 'kynseed' },
      { en: 'Zero combat please — I want a completely peaceful building and social game with no threats whatsoever', zh: '完全不需要战斗，纯和平建设和社交，没有任何威胁才是我的理想状态', type: 'littlewood' },
      { en: 'Combat is irrelevant to me — I am here for the economics of running a successful inn', zh: '战斗对我完全不重要，我来这里是为了经营好一家生意兴隆的酒馆', type: 'tavern' },
    ],
  },
  {
    q_en: 'Multiplayer or solo — what is your preference?',
    q_zh: '多人联机还是单人独享——你更倾向哪种？',
    options: [
      { en: 'Multiplayer is a big draw — I want to build a settlement alongside a friend online or on the same couch', zh: '联机是重要加分项，希望能和朋友一起开荒建镇，线上或本地合作都行', type: 'dinkum' },
      { en: 'Solo is fine — the NPC relationships and generational story are rich enough to keep me engaged for hundreds of hours', zh: '单人完全够了，NPC关系和代际故事足够吸引我玩几百小时', type: 'kynseed' },
      { en: 'Solo but social within the game — building a town with unique NPC personalities to meet is exactly right', zh: '单人但有社交感——建设小镇、邂逅各种个性NPC居民，这种感觉刚好', type: 'littlewood' },
      { en: 'Solo — the quiet rhythm of managing my tavern alone is exactly the relaxation I am looking for', zh: '单人——独自经营酒馆的安静节奏，正是我寻找的那种放松感', type: 'tavern' },
    ],
  },
  {
    q_en: 'Which mood or atmosphere best describes what you want from your next game?',
    q_zh: '哪种氛围和调性最符合你对下一款游戏的期待？',
    options: [
      { en: 'Cheerful, sun-warmed, and full of life — the joy of taming a wild new land', zh: '开朗阳光、充满生命力——驯服一片荒野、开创新天地的喜悦感', type: 'dinkum' },
      { en: 'Bittersweet and warm — watching a family legacy unfold across generations, funny and poignant at once', zh: '温柔而略带苦涩——看一个家族跨越世代展开，幽默与感伤并存', type: 'kynseed' },
      { en: 'Pure cozy comfort — no stress, no stakes, just the pleasure of arranging a perfect little world', zh: '纯粹的治愈舒适——零压力、零风险，只有打造完美小世界的纯粹乐趣', type: 'littlewood' },
      { en: 'Warm candlelight and the sounds of a busy inn — hospitality, commerce, and quiet satisfaction', zh: '温暖烛光和热闹人声——好客、经营和内心那份安静的满足感', type: 'tavern' },
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
  dinkum: {
    title_en: 'Dinkum',
    title_zh: 'Dinkum',
    emoji: '🦘',
    tag_en: 'The Outback Pioneer',
    tag_zh: '内陆开拓者',
    platform_en: 'PC (Early Access) · Nintendo Switch',
    platform_zh: 'PC（抢先体验）· Nintendo Switch',
    why_en: `Dinkum is an Australian-themed farming and settlement game that stands out from the Stardew crowd through sheer originality of setting and tone. Instead of European countryside or generic fantasy, you arrive at a plot of wild Australian bushland — complete with kangaroos, cassowaries, wombats, emus, crocodiles, and sharks — and your job is to transform it into a thriving outback town. The game was developed by a solo Australian developer, James Bendon, and the love for the source material shows in every detail: the wildlife behaviors, the slang ("dinkum" meaning genuine or real in Australian English), the eucalyptus forests, and the red-dirt landscapes. The gameplay combines farming, mining, fishing, hunting, crafting, and town-building in a satisfying open sandbox where you advance by purchasing licenses from the government for each new activity. Want to start farming? Buy a farming license. Want to mine deeper? Buy the mining license. This licensing system gives structure without rigidity and keeps progression feeling earned. Dinkum supports online multiplayer, which makes it one of the few farming games in this genre where building a settlement with friends is a fully supported primary mode. The Early Access version already has dozens of hours of content, with the developers actively adding seasonal events, new biomes, and expanded story content. For Stardew Valley fans who have already played the obvious alternatives and crave something that feels genuinely different — not just a reskin — Dinkum delivers that rare feeling of discovering a cozy world you have never seen before.`,
    why_zh: `《Dinkum》是一款澳大利亚主题的农场与聚居地游戏，凭借原创独特的世界背景在一众类星露谷游戏中脱颖而出。你来到一片澳洲荒野，袋鼠、鸸鹋、袋熊、鳄鱼在旁，目标是把这片荒地变成欣欣向荣的内陆小镇。游戏由澳大利亚独立开发者独立完成，对澳洲自然生态的热爱体现在每一个细节中。独特的"许可证"推进系统让每种玩法（农业、挖矿、渔猎）都需要向政府购买执照才能解锁，结构清晰而不失自由。游戏支持在线多人合作，是少数真正把多人建设作为核心玩法的农场类游戏之一。`,
    tip_en: `Prioritize buying the Farming License from Fletch early — it is cheap and unlocks the most immediately rewarding progression loop. Before your first wet season, make sure your farm is elevated or covered, because flooding can damage your crops. The animal trapping mechanic is more efficient than hunting for food in the early game; set traps overnight and collect in the morning. Join the official Discord to check the development roadmap — the game updates frequently and new seasonal content often changes the optimal early-game strategy. If you play multiplayer, split the license purchases between players on day one to cover more ground faster.`,
    tip_zh: `优先向Fletch购买农业执照——它便宜且能解锁最直接的进展循环。雨季来临前，确保农场有足够高度或遮蔽，洪水会损坏作物。早期食物供应方面，动物陷阱比主动狩猎效率更高，傍晚设置、早晨收取。加入官方Discord跟踪更新路线图——游戏更新频繁，季节性内容常常改变最优早期策略。多人游玩时，第一天就分工购买不同执照，覆盖更广的能力范围。`,
  },
  kynseed: {
    title_en: 'Kynseed',
    title_zh: 'Kynseed',
    emoji: '🌳',
    tag_en: 'The Legacy Farmer',
    tag_zh: '传承农耕者',
    platform_en: 'PC · Nintendo Switch',
    platform_zh: 'PC · Nintendo Switch',
    why_en: `Kynseed is the farming life sim with the most ambitious concept in its genre: a multi-generational family saga disguised as a cozy game. Developed by ex-Fable devs at PixelCount Studios, Kynseed takes everything familiar about farming simulations — growing crops, raising animals, managing shops, building relationships — and wraps it inside a system where your character actually ages, falls in love, has children, and eventually passes the torch to the next generation. The world of Quill is rich with British folklore, whimsical humor, and the specific bittersweet charm that Fable fans will immediately recognize. You can choose to focus on farming, running a bakery, operating an apothecary, or a combination of all three — and each path produces different story outcomes depending on how you trained your children's skills before retirement. The game has no traditional combat system per se, but quirky "battle" sequences against magical creatures use a completely different mechanic (think arm-wrestling a goblin rather than swordfighting). The passage of time is the emotional core of Kynseed: watching a tree you planted as a child grow into a landmark your grandchildren play under carries a genuinely poetic weight. If you are the kind of player who found Stardew Valley's generational aging in the Grandpa system touching, Kynseed takes that feeling and turns it into the entire game.`,
    why_zh: `《Kynseed》是农场生活模拟中概念最大胆的作品：一个披着治愈游戏外衣的多代家族传奇。由前Fable开发者打造，游戏把熟悉的农场元素——种植、养殖、经营店铺、社交——嵌套进一个真实老去的角色系统：你会恋爱、生孩子，最终把事业交给下一代。游戏世界充满英式民间传说和略带苦涩的幽默感，与Fable的气质高度相似。你可以专注农耕、开面包坊、经营药铺或三者兼顾，每条路径根据你培养孩子技能的方式产生不同的故事结局。时光流逝是《Kynseed》的情感核心——看着儿时亲手种下的树长成孙辈玩耍的地标，有种真实的诗意重量。`,
    tip_en: `Time management is the key skill in Kynseed — unlike most farming games, your character ages in real game-time, so you cannot afford to spend ten in-game years optimizing crops before starting a family. Prioritize relationship-building early: your future spouse's personality affects which skills transfer well to your children. The Fabled World events (magical disturbances in the world) offer the best rewards but have time-limited windows — check the world map daily. For shop runs, the apothecary tends to be the most profitable early business because wild herb gathering has no license requirement. Plant your Kynseed as soon as you receive it — the tree takes real in-game seasons to mature, and its growth is tied to your life choices.`,
    tip_zh: `时间管理是《Kynseed》的核心技能——角色在真实游戏时间中变老，所以你不能花十年优化农作物才开始组建家庭。优先早期建立伴侣关系：未来配偶的性格影响哪些技能更好地传承给孩子。世界地图上的"寓言世界事件"（魔法干扰）奖励最丰厚，但有时间限制——每天查看。药铺往往是早期最盈利的店铺，因为采集野生草药不需要执照。一拿到Kynseed（奇异种子）就立刻种下——这棵树需要真实的游戏季节才能成熟，且生长与你的人生选择密切相关。`,
  },
  littlewood: {
    title_en: 'Littlewood',
    title_zh: 'Littlewood',
    emoji: '🏡',
    tag_en: 'The Cozy Town Builder',
    tag_zh: '治愈小镇建造师',
    platform_en: 'PC · Nintendo Switch',
    platform_zh: 'PC · Nintendo Switch',
    why_en: `Littlewood answers a question that many farming game fans quietly ask: what if the combat was already done and I could skip straight to the peaceful part? You play as Horace, a hero who defeated the Dark Wizard and saved the world but cannot remember any of it. With the adventure over, you return to a small village and begin the slow, joyful work of rebuilding it — attracting new residents, constructing buildings, decorating every corner, and pursuing crafting and farming at a pace that is entirely your own. There are no seasons, no crop failures, no energy bars that run out mid-afternoon, and no villager schedules to chase. Littlewood is designed from the ground up as a low-pressure creative sandbox, and it delivers that promise consistently. The farming in Littlewood is supplementary rather than central: you grow ingredients for crafting recipes, which unlock new building types, which attract new resident types. The real draw is the town design system — you have enormous freedom over where every building, path, tree, and flower goes, and the game rewards that creativity with expanded content as your town flourishes. For players who bounced off Stardew Valley's early energy constraints or Animal Crossing's one-thing-per-day pacing, Littlewood is the purest expression of "do whatever you want, whenever you want" cozy game design.`,
    why_zh: `《Littlewood》回答了许多农场游戏玩家心中一个不敢说出口的问题：如果战斗已经结束、可以直接跳到平静的部分该多好？你扮演打败黑暗魔王的英雄，但完全记不得这段历史。冒险结束后，你回到一个小村庄，开始慢慢重建：吸引新居民、建造建筑、装饰每一个角落，按自己的节奏耕种和制作。没有季节更替、没有作物失败、没有耗尽的体力槽，也没有需要追着打招呼的村民时间表。Littlewood从设计之初就是一款低压力创意沙盒，游戏的农业系统是辅助性的——种植食材用于制作配方、解锁新建筑类型、吸引新居民。真正的乐趣在于自由度极高的小镇设计系统。`,
    tip_en: `Unlike most farming games, Littlewood has no time pressure whatsoever, so resist the urge to rush toward any particular goal. The best strategy is to build what you find visually satisfying first — the content unlock system is generous enough that doing what you enjoy naturally progresses you toward new content. Prioritize building a Mine early since it produces the hardest-to-find crafting materials (ore and gems) that gate many mid-game buildings. The Museum donation system works similarly to Animal Crossing — the more you donate, the more residents and shops unlock. Talk to every resident daily until you unlock their unique quest lines, which often reward rare building materials or decoration items not obtainable elsewhere.`,
    tip_zh: `与大多数农场游戏不同，《Littlewood》完全没有时间压力，所以抵制急于完成某个目标的冲动。最好的策略是先建造你视觉上最满意的内容——解锁系统足够宽松，做你喜欢的事情自然会推进到新内容。优先建造矿山，因为它产出最难获取的合成材料（矿石和宝石），这些材料制约许多中期建筑的解锁。博物馆捐赠系统类似《动物森友会》——捐赠越多，解锁的居民和商店越多。每天和每位居民对话，直到解锁他们独特的任务线，这些任务往往奖励在其他地方无法获得的稀有建材或装饰品。`,
  },
  tavern: {
    title_en: "Travellers Rest",
    title_zh: "旅者驿站（Travellers Rest）",
    emoji: '🍺',
    tag_en: 'The Innkeeper Farmer',
    tag_zh: '耕作酒馆主人',
    platform_en: 'PC (Early Access)',
    platform_zh: 'PC（抢先体验）',
    why_en: `Travellers Rest is the game for players who want the wholesome loop of growing ingredients and cooking meals, but whose real fantasy is watching satisfied customers enjoy the fruits of that labor in a warm, candlelit inn. You inherit a run-down medieval tavern in a fantasy world, and your job is to restore it to glory: grow crops and herbs in the garden behind the tavern, brew ales and wines in your cellar, cook dishes in your kitchen, hire staff, upgrade your facilities, decorate your inn, and serve a parade of travelers who each have specific preferences, dietary needs, and budgets. The farming component in Travellers Rest is meaningfully integrated — the herbs you grow directly affect the quality of your potions and food, which determines customer satisfaction scores and tips — but it is always in service of the tavern experience rather than the end goal itself. The game has a charming pixel art style with a warm color palette that makes the inn feel genuinely inviting. Character visitors have distinct visual designs and reaction systems, so you learn to recognize regular customers and adapt your menu to their preferences over time. Travellers Rest is still in Early Access and lacks the content depth of a fully released game, but its core loop — plant, brew, cook, serve, upgrade — is already polished and satisfying. For players who love both the farming loop and the customer-service satisfaction of games like PlateUp!, this is the closest thing to having both in one package.`,
    why_zh: `《旅者驿站》（Travellers Rest）适合那些喜欢种植食材、烹饪佳肴，但真正的幻想是看着客人在温暖烛光下享用这些劳动成果的玩家。你继承了一家破旧的中世纪奇幻小酒馆，任务是让它重现辉煌：在后院种植作物和草药、在地窖酿造啤酒和葡萄酒、在厨房烹饪菜肴、雇用员工、升级设施、装饰酒馆，并接待各有偏好的旅客。游戏的农业部分真正融入了整体体验——你种的草药直接影响药水和食物质量，进而决定顾客满意度和小费收入。游戏目前仍在抢先体验阶段，但核心循环（种植、酿造、烹饪、服务、升级）已经打磨得相当流畅。`,
    tip_en: `Travellers Rest rewards patience and planning more than most farming games. Before upgrading your tavern's capacity (adding more tables), first upgrade the quality of what you serve — a smaller, well-run tavern with high-quality food and drink earns more per customer than a large one serving mediocre dishes. Plant a herb garden as early as possible: medicinal herbs have high margins and are needed for potions, which sell faster than most food items early on. Study each customer type's preferences before they leave — their reaction icons tell you what they wanted more of, and adapting your menu to repeat visitors builds loyalty that unlocks special orders. For brewing, start with ale before wine because the fermentation time is shorter and cash flow is critical in the first few in-game seasons.`,
    tip_zh: `《旅者驿站》比大多数农场游戏更考验耐心和规划能力。在扩大酒馆容量（加桌子）之前，先提升出品质量——一家精而优的小酒馆比一家出品平庸的大酒馆每位顾客收益更高。尽早建立草药园：药草利润高且用于酿造药水，药水在早期比大多数食物卖得更快。在顾客离开前研究他们的偏好——反应图标告诉你他们想要更多什么，根据回头客调整菜单能建立忠诚度并解锁特殊订单。酿造方面，先做啤酒再做葡萄酒，因为啤酒发酵时间更短，早期游戏阶段现金流至关重要。`,
  },
}

function calcResult(answers: Pick[]): Pick {
  const counts: Record<Pick, number> = { dinkum: 0, kynseed: 0, littlewood: 0, tavern: 0 }
  for (const a of answers) counts[a]++
  return Object.entries(counts).sort((x, y) => y[1] - x[1])[0][0] as Pick
}

export function CozyIndieFarmQuiz({ locale }: { locale: string }) {
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
      ? `我的治愈独立农场推荐是《${r.title_zh}》！${r.emoji} 来测测你的结果？${BASE_URL}/zh/quizzes/cozy-indie-farm-quiz`
      : `My cozy indie farm match is ${r.title_en}! ${r.emoji} Which one are you? ${BASE_URL}/en/quizzes/cozy-indie-farm-quiz`

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
            {isZh ? '想发现更多隐藏的好农场游戏？' : 'Want to discover more hidden farming gems?'}
          </p>
          <p className="text-sm text-[#e8dcc8]">
            {isZh
              ? '试试 TendFarm App — 根据你今天的心情，每天推荐最适合你的农场游戏'
              : 'Try TendFarm App — personalized farming game picks matched to your mood every day'}
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
