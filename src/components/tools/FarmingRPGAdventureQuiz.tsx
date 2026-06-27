'use client'

import { useState } from 'react'
import { BASE_URL } from '@/lib/config'

type Pick = 'harvestella' | 'rf5' | 'paleo' | 'pot'

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
    q_en: 'How much combat and adventure do you want alongside your farming?',
    q_zh: '你希望农场游戏里有多少战斗与冒险元素？',
    options: [
      { en: 'Full turn-based RPG combat — adventure and farming should feel equally important', zh: '完整的回合制RPG战斗，冒险感和农场感同等重要，缺一不可', type: 'harvestella' },
      { en: 'Action dungeon-crawling — I want to swing a sword as often as I swing a hoe', zh: '动作地牢探索，挥剑和锄地一样频繁，剑与农耕兼修才过瘾', type: 'rf5' },
      { en: 'Light exploration — finding and befriending creatures, not fighting them', zh: '轻度探索就好，重点是发现和驯服生物，而不是和它们战斗', type: 'paleo' },
      { en: 'Minimal — I am here to farm, build, and enjoy the peaceful daily rhythm', zh: '越少越好，我来这里是为了种地、建设和享受平静的日常节奏', type: 'pot' },
    ],
  },
  {
    q_en: 'Which game world calls to you?',
    q_zh: '哪个游戏世界最让你心动？',
    options: [
      { en: 'A dying world of science fantasy — dramatic seasons, ancient mysteries, and urgent stakes', zh: '垂死的科幻奇幻融合世界——戏剧性的季节更替、远古谜题和紧迫的世界危机', type: 'harvestella' },
      { en: 'A lively fantasy village full of colorful townsfolk you can befriend and romance', zh: '充满活力的奇幻小镇，遍布可以交友和谈恋爱的可爱居民', type: 'rf5' },
      { en: 'A lush prehistoric island where dinosaurs roam freely and you earn their trust', zh: '郁郁葱葱的史前岛屿，恐龙自由奔跑，你用耐心慢慢赢得它们的信任', type: 'paleo' },
      { en: 'A sun-drenched Mediterranean-style town you restore to life through hard work and farming', zh: '阳光明媚的地中海风格小镇，你用辛勤耕耘一点点恢复它昔日的活力', type: 'pot' },
    ],
  },
  {
    q_en: 'How important is romance and social life to you in a farming game?',
    q_zh: '恋爱和社交系统对你有多重要？',
    options: [
      { en: 'Nice to have, but the main story and world-saving mission matter more to me', zh: '有就好，但主线剧情和拯救世界的使命对我更重要', type: 'harvestella' },
      { en: 'It is a core reason I play — I want to fall in love with a character and build a life together', zh: '这是我玩农场游戏的核心动力之一，想和喜欢的角色谈恋爱、共建生活', type: 'rf5' },
      { en: 'I want emotional bonds with animals and creatures, not a human romance system', zh: '想和动物、生物建立情感纽带，对人类角色的恋爱系统兴趣不大', type: 'paleo' },
      { en: 'I enjoy socializing with townsfolk, but building and farming are the real draw', zh: '喜欢和镇民互动，但建设和种地才是真正吸引我的部分', type: 'pot' },
    ],
  },
  {
    q_en: 'What kind of story experience are you hoping for?',
    q_zh: '你期望什么样的叙事体验？',
    options: [
      { en: 'A rich, cinematic main plot with character growth, plot twists, and genuine emotional payoff', zh: '丰富的电影级主线剧情，有角色成长、情节转折和真实的情感回报', type: 'harvestella' },
      { en: 'Lighthearted character stories and fun NPC interactions rather than a heavy main plot', zh: '轻松愉快的角色故事和有趣的NPC互动，不需要沉重的主线压力', type: 'rf5' },
      { en: 'Gentle, heartwarming moments — the story should feel like a warm hug, not an epic', zh: '温馨治愈的点滴时刻，故事感觉像一个温暖拥抱，而不是史诗冒险', type: 'paleo' },
      { en: 'An open story I write myself through my choices — the lighter the scripted plot, the better', zh: '我自己书写的开放式故事，预设剧本越淡越好，自由度越高越喜欢', type: 'pot' },
    ],
  },
  {
    q_en: 'How do you feel about challenge and difficulty?',
    q_zh: '你对挑战和难度的接受程度如何？',
    options: [
      { en: 'Bring on the boss fights — I want meaningful stakes and satisfying victories', zh: '欢迎Boss战，我想要有分量的挑战和让人满足的胜利时刻', type: 'harvestella' },
      { en: 'Some dungeon challenge is fun, but I should not lose everything if I faint', zh: '地牢有挑战很好，但晕倒后不该失去一切，惩罚要合理', type: 'rf5' },
      { en: 'Zero pressure please — I want to play at my own pace with no failure states', zh: '零压力，按自己的节奏游玩，不存在失败或游戏结束的概念', type: 'paleo' },
      { en: 'Gentle seasonal deadlines are fine, but nothing that creates real stress or anxiety', zh: '季节性截止日期这种轻度节奏可以接受，但不想有真正的压力或焦虑', type: 'pot' },
    ],
  },
  {
    q_en: 'Which core loop excites you most?',
    q_zh: '哪种核心游戏循环最让你期待？',
    options: [
      { en: 'Farm by day to gather resources, fight by night to advance the story — both loops feed each other', zh: '白天耕作积累资源，推进剧情时挑战战斗，两条线紧密联动互相促进', type: 'harvestella' },
      { en: 'Freely switch between farming, dungeon-diving, and socializing depending on my mood each day', zh: '农场、地牢、社交三线自由切换，今天想做什么就做什么', type: 'rf5' },
      { en: 'Explore the island, discover a new dinosaur species, earn its trust, then expand my ranch', zh: '探索岛屿、发现新恐龙品种、慢慢赢得信任，再扩展我的恐龙农场', type: 'paleo' },
      { en: 'Clear land, plant crops, restore the town, and feel the satisfaction of watching it all bloom', zh: '开荒种地、恢复小镇、装饰农场，看着一切从荒芜变得生机勃勃', type: 'pot' },
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
  harvestella: {
    title_en: 'Harvestella',
    title_zh: 'Harvestella',
    emoji: '⚔️',
    tag_en: 'The Epic Farmer',
    tag_zh: '史诗级农耕者',
    platform_en: 'PC · Nintendo Switch',
    platform_zh: 'PC · Nintendo Switch',
    why_en: `Harvestella is what happens when Square Enix — the studio behind Final Fantasy and Dragon Quest — decides to make a farming game. The result is unlike anything else in the genre: a story-driven action RPG where farming is not a backdrop but a central mechanical pillar, directly tied to a world where the seasons themselves are dying. You play as a traveler who wakes with no memory near a small village called Lethe, and quickly discovers that the world is being consumed by Quietus — a deadly particle storm that arrives at each seasonal change and kills anyone caught outside. The farming loop gives you money, crafting materials, and food buffs that directly empower your dungeon performance. In return, dungeon progress unlocks new regions, new crops, and new story revelations. The two loops are genuinely inseparable in a way that most farming-RPG hybrids fail to achieve. The combat is real-time action with four-character parties, each character belonging to a distinct job class — Mage, Fighter, Minstrel, Assault Savant, and more — and you can freely switch between them mid-battle. The story is ambitious by farming game standards: it involves time travel, parallel worlds, and a central mystery about the nature of Quietus that unfolds over a 40-50 hour main campaign. Harvestella is not a perfect game — the farming mechanics are simpler than Stardew Valley, and the pacing in the first few hours is slow — but as a cinematic experience that treats farming as part of a genuine epic, it is in a class of its own.`,
    why_zh: `《Harvestella》是Square Enix（最终幻想、勇者斗恶龙的母公司）决定做农场游戏时的产物，结果和这个类型里的任何作品都截然不同。这是一款剧情驱动的动作RPG，农场不是背景装饰，而是直接与世界观捆绑的核心机制——游戏世界里，季节本身正在消亡。你扮演一名失忆旅者，在一个叫Lethe的小村庄醒来，随即发现世界正被"Quietus"侵蚀——一种在季节交替时降临、令户外的一切归于死寂的致命粒子风暴。农场给你金钱、材料和强化战斗的食物增益；地牢推进则解锁新区域、新作物和新的剧情揭示。两条线深度联动，是大多数农场RPG混合作品难以企及的。战斗是实时动作制，四人小队各属不同职业，可以在战斗中自由切换。主线剧情约40-50小时，涉及时间旅行和平行世界的宏大命题。`,
    tip_en: `Do not neglect your farm in the early game — the food buffs you get from cooking with home-grown ingredients directly affect how much damage you deal and how many resources you recover after combat. Prioritize planting crops that produce materials needed for the combat recipes you use most. The Quietus days (between seasons) are forced rest periods — use them to reorganize your storage and plan your next week's crops rather than feeling like lost time. For job classes, unlock Mage and Assault Savant as early as possible; they cover the most ground in the mixed combat scenarios you will face in the mid-game dungeons.`,
    tip_zh: `早期不要忽视农场——用自种食材烹饪的料理直接影响战斗中的伤害输出和资源恢复。优先种植能产出常用战斗料理食材的作物。Quietus日（季节交替的强制休息日）用来整理仓库和规划下周作物，不要把它当作"损失的时间"。职业解锁方面，尽早解锁法师和突击精通者，它们覆盖中期地牢混战中最广泛的战斗场景。`,
  },
  rf5: {
    title_en: 'Rune Factory 5',
    title_zh: '符文工房5',
    emoji: '🗡️',
    tag_en: 'The Action Farmer',
    tag_zh: '动作农耕探险家',
    platform_en: 'PC · Nintendo Switch',
    platform_zh: 'PC · Nintendo Switch',
    why_en: `Rune Factory 5 is the fullest realization of the franchise's core promise: a farming life simulation where you can also be an adventurer, a dungeon-crawler, and a romantic lead, all at the same time — and where none of these roles feels tacked on. You play as a SEED ranger who washes up on the island town of Rigbarth with amnesia, and gradually rebuilds your life through farming, monster taming, town quests, and dungeon exploration. The farming in RF5 is satisfying and deep: you grow crops using runes (magic energy), which means the act of farming is also a form of magical cultivation. Monsters you befriend can be brought home as farm helpers, adding a creature-raising dimension that cozy game fans love. But the dungeon content is substantial — multi-floor dungeons with real boss encounters, crafted weapons and armor, and a meaningful progression loop that keeps the action side of the game engaging across the entire campaign. The romance system is among the best in the genre: 12 romanceable characters, each with fully voiced story arcs, and same-sex marriage options that the series introduced in RF4. The game runs 60-80 hours for a thorough playthrough and has the series' characteristic problem of being almost too generous with content — there is always something to do, someone to talk to, or something new to plant. For players who bounced off Stardew Valley's combat but love the farming-social loop, Rune Factory 5 finds the balance that was always missing.`,
    why_zh: `《符文工房5》是这个系列核心承诺的最完整实现：一款你可以同时扮演农夫、冒险者、地牢探索者和恋爱主角的农场生活模拟游戏，而且每个角色都不显得多余。你扮演失忆的SEED骑士，来到小镇Rigbarth重建生活，通过农耕、驯服怪物、镇子委托和地牢探索逐步成长。RF5的农耕使用符文能量（魔法力），农作本身就是一种魔法培育，独具特色。驯服的怪物可以带回家当农场助手，满足养成爱好者的需求。地牢内容丰富扎实，有真实的Boss战和完整的装备锻造循环。恋爱系统是类型中的佼佼者：12位可恋爱角色，全部有完整配音故事线，支持同性婚姻。通关约60-80小时，内容几乎过于丰富——永远有事可做、有人可聊、有东西可种。`,
    tip_en: `The most important early decision is which crops to prioritize — flowers sell for high prices and are needed for medicine crafting, while vegetables are better for leveling up your farming skill quickly. Always talk to every villager every day in the first month: friendship points accumulate, and many villagers give you seeds, recipes, or materials as gifts once you reach certain friendship milestones. For dungeon efficiency, focus on crafting one strong weapon before entering each new dungeon floor set rather than scattering your resources — a well-crafted mid-tier weapon beats poorly upgraded higher-tier gear. Finally, do not sleep past 6am: the morning hours are when monster friends do their best farm work.`,
    tip_zh: `早期最重要的决策是优先种哪类作物——花卉售价高且用于制药，蔬菜则更有助于快速提升农耕技能等级。第一个月每天和每位村民说话：友好度在积累，很多村民到达特定友好度后会赠送种子、食谱或材料。地牢效率方面，与其把资源分散到多件装备，不如专注打造一件强力武器进入每个新地牢区域——精心制作的中级武器胜过草草升级的高级装备。最后：不要睡过早上6点，早晨时段是怪物朋友在农场工作效率最高的时间。`,
  },
  paleo: {
    title_en: 'Paleo Pines',
    title_zh: 'Paleo Pines',
    emoji: '🦕',
    tag_en: 'The Dino Rancher',
    tag_zh: '恐龙牧场主',
    platform_en: 'PC · PS4/5 · Xbox · Switch',
    platform_zh: 'PC · PS4/5 · Xbox · Switch',
    why_en: `Paleo Pines is the farming game for players who grew up wanting a dinosaur ranch instead of a sheep farm. Set on a colorful island where dinosaurs roam freely alongside humans in peaceful coexistence, you play as Lucky — a young rancher who arrives with her companion dino Era to restore her family's legendary ranch. The core loop is distinctly different from most farming sims: instead of tending soil, your primary goal is finding wild dinosaurs, earning their trust through a musical flute-based friendship mechanic, and building enclosures that match each species' specific habitat needs. Once befriended, dinosaurs become ranch workers who help you farm, gather resources, and eventually breed. The farming side of Paleo Pines is gentler than Stardew or Story of Seasons — the emphasis is clearly on the dinosaur relationships rather than crop optimization — but it provides a satisfying daily structure of planting, harvesting, and caring for your growing herd. The game has no combat whatsoever: no weapons, no fighting, no fail states beyond running low on energy. The town of Pebble Plaza serves as a social hub with a small cast of friendly characters, though the relationship system is lighter than Rune Factory. Paleo Pines is at its best for players who want a supremely low-pressure creative sandbox: designing dinosaur enclosures, choosing which species to specialize in, and watching your prehistoric ranch come to life. If you have ever wanted to be a dinosaur caretaker in a world where that is a completely normal career, this is your game.`,
    why_zh: `《Paleo Pines》是为那些从小就想要一个恐龙农场而不是羊圈的玩家而生的农场游戏。游戏设定在一座恐龙与人类和平共处的彩色岛屿上，你扮演年轻牧场主Lucky，带着伙伴恐龙Era回到家族传奇牧场，让它重焕生机。核心循环与大多数农场模拟器截然不同：你的主要目标不是耕种土地，而是寻找野生恐龙、通过长笛音乐驯服机制赢得它们的信任、建造符合各物种特定栖息需求的围栏。一旦驯服，恐龙就成为农场助手，帮助耕种、采集资源，最终实现繁殖。游戏完全没有战斗——没有武器、没有战斗、没有失败状态。如果你曾想在一个把"恐龙饲养员"视为正常职业的世界里大展身手，这就是你要找的游戏。`,
    tip_en: `The flute mechanic is the heart of Paleo Pines — practice matching the melody each dinosaur plays back to you before attempting to befriend it, because a failed friendship attempt resets the dinosaur's comfort level. Pay close attention to the habitat requirements for each dinosaur before building its enclosure: a rainforest species placed in a desert biome will be unhappy and work less effectively. In the early game, prioritize befriending the Pack species (carnivores that move in groups) last — they have stricter requirements. Instead, start with the gentler Grazer types, which are more forgiving and help with farming tasks most directly. Keep at least one plot of each crop type growing at all times to fulfill the town residents' requests efficiently.`,
    tip_zh: `长笛驯服机制是游戏的核心——在尝试驯服之前，先练习复现每只恐龙奏给你听的旋律，因为失败一次会重置恐龙的舒适度。建造围栏前仔细查看每种恐龙的栖息地需求：把雨林物种放在沙漠生态里会让它不开心、工作效率大降。早期优先驯服Grazer类型（食草恐龙），它们要求最宽松且对农场帮助最直接；有严格群体要求的Pack类（肉食恐龙）留到后期。同时保持每种作物都有在种植，方便高效完成镇民委托。`,
  },
  pot: {
    title_en: 'Story of Seasons: Pioneers of Olive Town',
    title_zh: '牧场物语：橄榄镇与希望的大地',
    emoji: '🫒',
    tag_en: 'The Town Restorer',
    tag_zh: '小镇复兴者',
    platform_en: 'PC · Nintendo Switch',
    platform_zh: 'Nintendo Switch（PC 版通过 Steam）',
    why_en: `Story of Seasons: Pioneers of Olive Town delivers the clearest, most focused version of the classic Harvest Moon fantasy: you inherit a piece of overgrown wilderness and transform it, season by season, into a thriving farm that breathes life into a quiet coastal town. Where other entries in the series add combat, romance depth, or dramatic storylines, Pioneers of Olive Town keeps its attention squarely on the core loop — clearing land, planting crops, raising animals, building relationships, and watching the town of Olive Town gradually flourish as a direct result of your farming. The land transformation system is the game's signature feature: your starting area is wild forest and marshland, and you must physically clear every tree, rock, and log to expand your farm footprint. This creates a deeply satisfying sense of ownership and progress that farming games with pre-cleared land simply cannot replicate. The Museum system rewards exploration and diversity — donating discovered items unlocks permanent bonuses and brings new facilities to Olive Town. The townspeople are charming without being complex; the romance system covers six male and six female candidates with enough depth to feel meaningful but without the investment Rune Factory demands. For players who love Stardew Valley primarily for its farming and town-building rather than its combat or mystery, Pioneers of Olive Town is the purest expression of that same feeling with a cheerful, sun-warmed Mediterranean aesthetic.`,
    why_zh: `《牧场物语：橄榄镇与希望的大地》呈现了经典牧场物语幻想最清晰、最专注的版本：你继承一片荒芜土地，季复一季地将它变成让安静海滨小镇焕发生机的繁茂农场。游戏的标志性功能是土地开垦系统——起点是一片野生森林和沼泽地，你需要亲手清除每一棵树、每一块石头来扩展农场版图，这种所有权感和进步感是那些已预先清空土地的农场游戏难以复制的。博物馆系统奖励探索多样性，捐献发现的物品可解锁永久奖励并为橄榄镇带来新设施。恋爱系统涵盖六男六女，深度适中——比符文工房轻松，但比普通友好系统有层次。对于主要为农场和建设而非战斗玩星露谷的玩家，这款游戏是同一种满足感的最纯粹表达。`,
    tip_en: `The most common mistake in Pioneers of Olive Town is expanding your farm area too quickly before you have the tools and energy to maintain it. Clear land in deliberate, manageable chunks: open a new section once the previous one is fully planted and organized. Prioritize upgrading your watering can as early as possible — the default can wastes enormous energy on a field of any size. The Sprite Shop (accessible after you befriend enough sprites through exploration) offers the most cost-effective crop and animal shortcuts in the game; unlocking it early dramatically reduces early-game grinding. Finally, the Museum is worth completing: the bonuses from full set donations compound significantly by mid-game.`,
    tip_zh: `最常见的新手错误是在没有足够工具和体力维护的情况下过快扩张农场面积——等上一块土地全部种满、整理妥当后再开垦新区域。尽早升级洒水壶是首要任务，默认洒水壶在任何稍大的农场上都会消耗巨量体力。精灵商店（探索中发现足够多精灵后解锁）提供游戏中性价比最高的作物和动物捷径，早期解锁能大幅减少前期的重复劳动。博物馆值得完成：全套捐赠的奖励加成到中期会产生显著的复利效果。`,
  },
}

function calcResult(answers: Pick[]): Pick {
  const counts: Record<Pick, number> = { harvestella: 0, rf5: 0, paleo: 0, pot: 0 }
  for (const a of answers) counts[a]++
  return Object.entries(counts).sort((x, y) => y[1] - x[1])[0][0] as Pick
}

export function FarmingRPGAdventureQuiz({ locale }: { locale: string }) {
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
      ? `我的农场RPG推荐是《${r.title_zh}》！${r.emoji} 来测测你适合哪款？${BASE_URL}/zh/quizzes/farming-rpg-adventure-quiz`
      : `My farming RPG match is ${r.title_en}! ${r.emoji} Which one are you? ${BASE_URL}/en/quizzes/farming-rpg-adventure-quiz`

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
            {isZh ? '想找更多农场游戏推荐？' : 'Want more farming game recommendations?'}
          </p>
          <p className="text-sm text-[#e8dcc8]">
            {isZh
              ? '试试 TendFarm App — 根据你的心情和时间，每天推荐最适合的农场游戏'
              : 'Try TendFarm App — daily farming game picks matched to your mood and schedule'}
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
