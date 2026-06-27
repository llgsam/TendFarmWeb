'use client'

import { useState } from 'react'
import { BASE_URL } from '@/lib/config'

type Pick = 'echoes' | 'sugardew' | 'grow' | 'farmtogether'

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
    q_en: 'Which emotional tone are you looking for in your next farming game?',
    q_zh: '你希望下一款农场游戏给你什么样的情感调性？',
    options: [
      { en: 'Bittersweet depth — I want a game that does not shy away from loss, aging, and the weight of time', zh: '有苦有甜的厚重感——我希望游戏不回避失去、衰老和时光的重量', type: 'echoes' },
      { en: 'Pure warmth and comfort — gentle, cheerful, and free of any stress or darkness', zh: '纯粹的温暖和舒适——温柔愉快，完全没有压力或沉重感', type: 'sugardew' },
      { en: 'Wonder and creativity — the joy of imagining and building something that has never existed before', zh: '惊奇与创造力——想象并建造前所未有的东西所带来的那种喜悦', type: 'grow' },
      { en: 'Relaxed and social — the shared pleasure of tending a farm together with no pressure to perform', zh: '轻松而有社交感——和人一起耕作的共同乐趣，没有任何表现压力', type: 'farmtogether' },
    ],
  },
  {
    q_en: 'When you sit down to play a farming game, what motivates you most?',
    q_zh: '当你坐下来玩农场游戏时，最驱动你的是什么？',
    options: [
      { en: 'Watching a family and community evolve across generations, shaped by choices I made years ago', zh: '看着一个家族和社区在世代中演变，被我多年前做出的选择所塑造', type: 'echoes' },
      { en: 'The simple daily loop of caring for plants, animals, and villagers in a world that never asks too much', zh: '照料植物、动物和村民的简单日常循环，在一个从不要求太多的世界里', type: 'sugardew' },
      { en: 'The creative challenge of growing unique biomes, restoring a legendary world, and unlocking its secrets', zh: '培育独特生态、修复传奇世界、解锁其中奥秘的创造性挑战', type: 'grow' },
      { en: 'Building something alongside another person — the farm is the background for connection, not the point itself', zh: '和另一个人共同建造什么——农场是联结的背景，而不是目的本身', type: 'farmtogether' },
    ],
  },
  {
    q_en: 'How important is multiplayer to you?',
    q_zh: '多人联机对你有多重要？',
    options: [
      { en: 'Not important at all — this is my solo story and I do not want shared narrative intruding on it', zh: '完全不重要——这是我个人的故事，我不希望共享叙事打扰它', type: 'echoes' },
      { en: 'I enjoy solo but would not say no to a relaxed co-op session with a friend', zh: '享受单人，但不排斥偶尔和朋友轻松联机的体验', type: 'sugardew' },
      { en: 'I prefer solo so I can build my world exactly the way I envision without compromising', zh: '偏好单人，这样我才能完全按照自己的构想建造世界，不需要妥协', type: 'grow' },
      { en: 'Multiplayer is the whole point — farming alongside someone else is why I play this kind of game', zh: '联机才是重点——和别人一起耕作正是我玩这类游戏的原因', type: 'farmtogether' },
    ],
  },
  {
    q_en: 'How do you feel about generational mechanics — characters aging, dying, and leaving legacies?',
    q_zh: '你对代际机制有什么感受——角色变老、死去、留下遗产？',
    options: [
      { en: 'I find it deeply meaningful — the passage of time gives everything in the game more weight and beauty', zh: '我觉得它意义深远——时光流逝让游戏中的一切都有了更多分量和美感', type: 'echoes' },
      { en: 'I prefer to stay with one character in a world that stays consistently warm and familiar', zh: '我更喜欢始终和同一个角色在一起，在一个持续温暖熟悉的世界里', type: 'sugardew' },
      { en: 'Not relevant to me — my interest is in building and exploring, not in story continuity across time', zh: '对我来说不相关——我的兴趣是建造和探索，不是跨越时间的故事连续性', type: 'grow' },
      { en: 'Not a priority — I want a timeless farm that my friends and I can return to whenever we like', zh: '不是优先考虑的——我想要一个永恒的农场，和朋友随时都能回来', type: 'farmtogether' },
    ],
  },
  {
    q_en: 'Which visual style appeals to you most?',
    q_zh: '哪种视觉风格最吸引你？',
    options: [
      { en: 'Detailed pixel art with muted, earthy tones that feel like a hand-illustrated storybook', zh: '细腻的像素画风，柔和的大地色调，像手绘故事书一样温润', type: 'echoes' },
      { en: 'Soft, pastel-colored fairy-tale illustration with rounded shapes and gentle animations', zh: '柔和的粉彩色调童话插画风，圆润的形状和温柔的动画', type: 'sugardew' },
      { en: 'Vibrant, painterly 3D art that makes every biome feel like a living watercolor landscape', zh: '鲜艳的绘画感3D风格，让每个生态区域都像一幅活着的水彩画', type: 'grow' },
      { en: 'Clean, colorful, and approachable — style that feels welcoming at any experience level', zh: '干净、色彩丰富、易于亲近——风格在任何经验水平都感觉友好', type: 'farmtogether' },
    ],
  },
  {
    q_en: 'What does your ideal farming game endgame look like?',
    q_zh: '你理想中的农场游戏"游戏后期"是什么样的？',
    options: [
      { en: 'A multi-generational legacy that I shaped — looking back at what my choices created across decades', zh: '由我塑造的跨代遗产——回望我的选择在数十年间创造了什么', type: 'echoes' },
      { en: 'A fully flourishing island community where every villager is happy and every corner is beautiful', zh: '一个完全繁荣的岛屿社区，每个村民都幸福，每个角落都美丽', type: 'sugardew' },
      { en: 'A fully restored legendary world filled with diverse biomes and a thriving town I built from nothing', zh: '完全修复的传奇世界，充满多样生态，以及我从零建起的繁荣小镇', type: 'grow' },
      { en: 'A shared farm that keeps growing every time my friends and I log back in together', zh: '一个每次和朋友一起登录都在继续成长的共享农场', type: 'farmtogether' },
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
  echoes: {
    title_en: 'Echoes of the Plum Grove',
    title_zh: '梅林回响（Echoes of the Plum Grove）',
    emoji: '🌸',
    tag_en: 'The Generational Storyteller',
    tag_zh: '跨代叙事农耕者',
    platform_en: 'PC',
    platform_zh: 'PC',
    why_en: `Echoes of the Plum Grove is the farming life sim for players who found the Grandpa evaluation in Stardew Valley moving — and wondered what a whole game built around that generational pathos would feel like. Released in 2024, it is a multi-generational life simulation where you play through an entire family's history on a small farm: your first character will age, marry, have children, and eventually die, leaving the farm to the next generation. Each new character inherits the crops you planted, the relationships you built, and the structural decisions you made — but brings their own personality, strengths, and story. The game does not shy away from the full weight of a human life: illness, the death of spouses, the difficulty of family relationships, and the quiet satisfaction of watching something you built outlast you. The farming mechanics are traditional and meaningful: seasonal crops, animal husbandry, foraging, and market economics all interact in ways that require strategic thinking across multiple in-game generations rather than just a single playthrough. The art style uses detailed, muted pixel art that evokes a hand-illustrated journal, reinforcing the game's melancholic warmth. Echoes of the Plum Grove is not for players looking for escapism or stress relief — it is for players who want a farming game that makes them feel something real about time, love, and what we leave behind. It is one of the most emotionally ambitious farming games ever made.`,
    why_zh: `《梅林回响》是2024年最有情感野心的农场生活模拟游戏之一。这是一款多代传承的生命模拟：你扮演一个家族跨越世代的农耕历史，第一代角色会变老、结婚、生孩子，最终离世，把农场传给下一代。每个新角色继承你种下的作物、建立的人际关系和做出的土地决策，但带来各自的性格和故事。游戏不回避人生的全部重量：疾病、配偶离世、家庭关系的艰难，以及看着自己建造的东西在身后延续的安静满足感。农耕机制传统而有深度，需要跨越多代人的战略思考。像素画风细腻而色调柔和，像一本手绘日记，强化了游戏忧郁而温暖的基调。`,
    tip_en: `The most important early decision in Echoes of the Plum Grove is your first character's marriage partner — their traits directly influence which skills and personality tendencies your children inherit, compounding across generations. Prioritize building relationships with all villagers before your first character ages out, because second-generation characters start with fewer inherited relationship points than you might expect. Plant perennial crops (those that regrow each season without replanting) as early as possible — these are the investments that pay off most dramatically across generational timescales. Keep a written record of your farming decisions between generations; the game does not summarize your legacy for you, and understanding what you built helps you plan what to leave.`,
    tip_zh: `《梅林回响》最重要的早期决策是第一代角色的婚配选择——配偶的性格特质直接影响孩子继承哪些技能和性格倾向，并在世代间复利叠加。在第一代角色老去之前，尽量和所有村民建立关系，因为第二代角色继承的关系起点比你预期的少。尽早种植多年生作物（每季自动再生，无需重新播种）——这类投资在跨代时间尺度上回报最为显著。在代际之间保留你农业决策的手写记录；游戏不会为你总结遗产，了解你建造了什么有助于规划留下什么。`,
  },
  sugardew: {
    title_en: 'Sugardew Island',
    title_zh: 'Sugardew Island',
    emoji: '🌺',
    tag_en: 'The Cozy Island Farmer',
    tag_zh: '治愈岛屿农耕者',
    platform_en: 'PC · Nintendo Switch',
    platform_zh: 'PC · Nintendo Switch',
    why_en: `Sugardew Island is the farming game that commits fully and without apology to a single vision: be as cozy as humanly possible. Developed by a small independent team, it takes place on a fairy-tale island filled with sweet magic, charming creature-folk villagers, and an art style that looks like a professional illustrator's personal passion project. You are a young farmer who arrives on the island and begins rebuilding its community by farming, crafting, fishing, and befriending the island's inhabitants. Unlike farming games that use darkness or complexity to add depth, Sugardew Island finds depth in warmth — in the richness of its villager personalities, the variety of its magical crops and crafting recipes, and the visual joy of watching your farm and the surrounding island transform into something genuinely beautiful. The game has no combat, no crop failures from weather, no energy bar that forces you to stop, and no time-limited events that punish absence. Every single mechanic is designed to ensure the player never feels stressed. For players who play farming games primarily as a restorative experience — not a puzzle to solve or a system to optimize, but a place to go when the world feels too heavy — Sugardew Island may be the most effective farming game ever made at being exactly what it promises.`,
    why_zh: `《Sugardew Island》是一款毫无保留地全力追求单一愿景的农场游戏：尽可能地治愈。游戏发生在一座充满甜蜜魔法、可爱生物村民的童话岛屿上，美术风格像一位专业插画师的私人热情项目。你是一个抵达岛屿的年轻农夫，通过农耕、制作、钓鱼和结交岛屿居民来重建社区。游戏没有战斗、没有因天气导致的作物失败、没有强迫你停手的体力槽，也没有会惩罚缺席的限时活动。每一个机制都经过设计，确保玩家永远不会感到压力。对于把农场游戏主要当作恢复性体验的玩家——不是要解决的谜题或优化的系统，而是当世界太沉重时可以去的地方——《Sugardew Island》可能是迄今为止最忠实于自身承诺的农场游戏。`,
    tip_en: `Sugardew Island is designed to be played without a guide, and part of its joy is organic discovery — so resist the temptation to look everything up. The crafting recipe system reveals new options as you gather ingredients you have never combined before, and some of the most satisfying unlocks come from accidentally combining two things that turned out to create something wonderful. For villager relationships, gift items that match their visual aesthetic (flower lovers respond to floral crafts, earthy types prefer farm produce) rather than giving the same universal gift to everyone. The island's magical crop varieties have seasonal quirks that are not immediately obvious — experiment with planting the same seed in different weather conditions to discover variation.`,
    tip_zh: `《Sugardew Island》被设计成无需攻略的游玩体验，有机的探索发现是乐趣的一部分——抵制查阅所有内容的诱惑。制作配方系统在你收集从未组合过的材料时会自动揭示新选项，有些最让人满足的解锁来自意外将两样东西组合在一起，发现它们创造出了美妙的东西。在村民关系方面，赠送符合他们视觉审美的物品（喜欢花的村民对花卉工艺品有反应，朴实类型更喜欢农场产品），而不是给每个人同样的万能礼物。岛屿的魔法作物品种有不立即明显的季节特性——尝试在不同天气条件下种植同一种子以发现变化。`,
  },
  grow: {
    title_en: 'Grow: Song of the Evertree',
    title_zh: '生长：常树之歌',
    emoji: '🌳',
    tag_en: 'The World Restorer',
    tag_zh: '世界修复者',
    platform_en: 'PC · Switch · PS4/5 · Xbox',
    platform_zh: 'PC · Switch · PS4/5 · Xbox',
    why_en: `Grow: Song of the Evertree is the farming game for players whose favorite part of Stardew Valley was watching the town improve and the world open up — amplified into a full creative world-building experience. Developed by Prideful Sloth (the studio behind Yonder: The Cloud Catcher Chronicles), Grow tasks you as the last World Alchemist to restore the legendary Evertree — an enormous mythical tree that once generated entire living worlds from its branches. By cultivating "Alwaysworld" seeds using alchemy and farming, you grow miniature biomes: forests, deserts, wetlands, tundra — each a unique ecosystem with its own flora, fauna, and atmosphere. These biomes can be explored, and discovering each world's secrets is as rewarding as growing it. Alongside the Evertree, you build and restore a town called Sheth, attracting settlers and developing infrastructure through the resources your biomes generate. The farming in Grow is alchemical and creative: rather than planting vegetables for profit, you grow worlds for beauty and discovery, and the ingredients you harvest are catalysts for the next creation. The game has a lush, painterly 3D visual style that makes every new biome feel like a living painting you designed. It supports both solo and co-op play, and is one of the few farming-adjacent games available on every major platform. For players who want a farming game where the harvest is a new world, Grow is entirely unlike anything else in the genre.`,
    why_zh: `《生长：常树之歌》（Grow: Song of the Evertree）是为那些最喜欢《星露谷》中看着小镇改善、世界逐渐开放的玩家而生的游戏——被放大成一个完整的创意世界建构体验。你是最后一位世界炼金师，任务是修复传奇常树——一棵曾经从枝桠上生成整个活生生世界的巨大神话之树。通过炼金和农耕培育"常世"种子，你生长出微型生态系统：森林、沙漠、湿地、冻土带——每一个都有独特的植物群、动物群和氛围。同时，你建设和修复名为Sheth的小镇。游戏的农耕是炼金式的、创造性的：与其为利润种植蔬菜，你为美丽和发现而培育世界。视觉风格丰富而富有绘画感，让每个新生态区域感觉像一幅你设计的活画。`,
    tip_en: `The key to efficient world progression in Grow is understanding that each Alwaysworld biome has a "completion threshold" — a minimum biodiversity requirement before it yields its rarest resources. Rushing to grow more biomes before completing the ones you have will leave you short on the catalysts needed for later alchemy recipes. Explore each biome thoroughly before moving to the next, because hidden items within them often unlock unique Sheth building types that would otherwise take much longer to discover. For town building, prioritize structures that expand your Alwaysworld seed capacity before decorative structures — more cultivation slots is always the bottleneck in the mid-game. The game's co-op mode lets a second player tend existing biomes while you grow new ones, which dramatically accelerates progression.`,
    tip_zh: `《生长》中高效推进世界的关键是理解每个常世生态系统都有一个"完成阈值"——在产出最稀有资源之前的最低生物多样性要求。在完成已有生态之前急于培育更多会让你缺少后期炼金配方所需的催化剂。在转向下一个之前彻底探索每个生态，因为其中隐藏的物品经常解锁独特的Sheth建筑类型，否则需要更长时间才能发现。建镇方面，在装饰性建筑之前优先建造扩大常世种子容量的建筑——更多培育槽位始终是中期游戏的瓶颈。游戏的合作模式让第二个玩家照料现有生态，同时你培育新的，大幅加快推进速度。`,
  },
  farmtogether: {
    title_en: 'Farm Together 2',
    title_zh: 'Farm Together 2',
    emoji: '🌻',
    tag_en: 'The Co-op Farmer',
    tag_zh: '合作农耕搭档',
    platform_en: 'PC · Nintendo Switch',
    platform_zh: 'PC · Nintendo Switch',
    why_en: `Farm Together 2 is the farming game that answers a surprisingly underserved question: what if the entire game — every mechanic, every design decision, every system — was built specifically around the experience of farming with someone else? The original Farm Together was beloved for exactly this reason, and Farm Together 2 refines and expands the formula significantly. The core loop is pure farming management: plant crops, water them, harvest at maturity, sell for gold, reinvest in expansions and decorations. But the key differentiators are in how the multiplayer is structured: your farm exists and produces even when you are offline, friends can visit and help tend your farm without needing an invitation at the moment you want to play, and there is no conflict-driven mechanics to make co-op stressful. You can have multiple farms on different servers, each with a different group of friends. There is no combat whatsoever, no crop failure, no seasonal pressure, and no leaderboard. Farm Together 2 is designed as an enduring social experience rather than a game with a defined endpoint — the farm grows as long as you and your friends enjoy tending it. For players who play games primarily to maintain a shared space with someone they care about — a long-distance friend, a partner, a sibling — Farm Together 2 is one of the most thoughtfully designed social farming experiences available.`,
    why_zh: `《Farm Together 2》回答了一个出乎意料地服务不足的问题：如果整款游戏——每一个机制、每一个设计决策、每一个系统——都专门围绕与他人一起农耕的体验而建造，会是什么感觉？核心循环是纯粹的农场管理：种植作物、浇水、成熟时收割、出售黄金、再投资于扩张和装饰。关键区别在于多人游戏的结构方式：即使你离线，你的农场也在生产；朋友可以在任何时候来帮你照料农场，不需要即时邀请；没有让合作变得紧张的冲突驱动机制。没有战斗、没有作物失败、没有季节压力、没有排行榜。《Farm Together 2》被设计为持久的社交体验，而不是有明确终点的游戏——只要你和朋友享受照料它，农场就一直成长。`,
    tip_en: `Farm Together 2 rewards consistent casual sessions over occasional long marathons. Ten minutes of watering and harvesting every day keeps your farm productive and maintains the social rhythm with friends who tend it alongside you. Set up an offline production line before you log out: place crops with staggered harvest times so that something is always ready to collect when you return, even after a long absence. The decoration system has more depth than it first appears — unlocking aesthetic themes through progression opens up dramatically different visual styles for your farm layout. If you play with friends across time zones, designate different farm sections for different players so each person has a space that reflects their own style within the shared world.`,
    tip_zh: `《Farm Together 2》奖励持续的轻度游戏时段，而不是偶尔的长时间游玩。每天十分钟的浇水和收割能保持农场高效运转，并与一起照料它的朋友维持社交节奏。登出前建立离线生产线：种植收割时间错开的作物，这样当你回来时——即使是长时间离开后——总有东西等着收割。装饰系统比初看起来更有深度——通过进度解锁的美学主题为你的农场布局打开截然不同的视觉风格。如果和跨时区的朋友一起玩，为不同玩家划定不同的农场区域，这样每个人在共享世界中都有一个反映自己风格的空间。`,
  },
}

function calcResult(answers: Pick[]): Pick {
  const counts: Record<Pick, number> = { echoes: 0, sugardew: 0, grow: 0, farmtogether: 0 }
  for (const a of answers) counts[a]++
  return Object.entries(counts).sort((x, y) => y[1] - x[1])[0][0] as Pick
}

export function NewWaveFarmQuiz({ locale }: { locale: string }) {
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
      ? `我的新浪潮农场游戏推荐是《${r.title_zh}》！${r.emoji} 来测测你的结果？${BASE_URL}/zh/quizzes/new-wave-farm-quiz`
      : `My new-wave farming match is ${r.title_en}! ${r.emoji} Which one are you? ${BASE_URL}/en/quizzes/new-wave-farm-quiz`

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
            {isZh ? '每天想知道今天适合玩哪款农场游戏？' : 'Want a daily farming game pick for your mood?'}
          </p>
          <p className="text-sm text-[#e8dcc8]">
            {isZh
              ? '试试 TendFarm App — 根据你的心情和时间，每天精选一款农场游戏'
              : 'Try TendFarm App — daily farming picks tailored to your mood and available time'}
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
