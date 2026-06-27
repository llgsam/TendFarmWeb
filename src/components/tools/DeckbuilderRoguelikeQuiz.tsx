'use client'

import { useState } from 'react'
import { BASE_URL } from '@/lib/config'

type Pick = 'cobalt' | 'monster' | 'dd2' | 'obelisk'

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
    q_en: 'What draws you to deckbuilder games in the first place?',
    q_zh: '什么最让你被卡牌/构筑类游戏吸引？',
    options: [
      { en: 'The cozy joy of finding a synergy that clicks in a charming, low-pressure setting', zh: '在轻松可爱的环境里找到一组完美配合的卡牌，那种突然"啊哈"的喜悦', type: 'cobalt' },
      { en: 'The high-ceiling puzzle of building the most efficient, unstoppable engine possible', zh: '搭建一套极致高效、势不可挡的引擎机制，把优化本身当作终极乐趣', type: 'monster' },
      { en: 'The desperate, white-knuckle struggle to survive against punishing odds', zh: '在绝望中死撑的紧绷感，每一次险胜都如同从鬼门关夺回来的', type: 'dd2' },
      { en: 'The shared adventure of playing through a card RPG campaign with friends', zh: '和朋友一起闯关的共同冒险感，边讨论策略边推进剧情', type: 'obelisk' },
    ],
  },
  {
    q_en: 'How do you feel about difficulty and punishment in games?',
    q_zh: '你对游戏难度和惩罚机制的态度是？',
    options: [
      { en: 'Challenge is welcome, but I want the overall atmosphere to stay welcoming and low-stress', zh: '欢迎挑战，但整体氛围要保持友好，失败了不该让人感到沮丧', type: 'cobalt' },
      { en: 'High difficulty is part of the appeal — I want to be punished for bad decisions and rewarded for mastery', zh: '高难度正是吸引力所在，坏决策就该付出代价，掌握精髓才能获得回报', type: 'monster' },
      { en: 'I want genuinely brutal punishment — loss should hurt, making eventual victory feel truly earned', zh: '我要的就是残酷惩罚——失败要真的痛，这样最终的胜利才值得', type: 'dd2' },
      { en: 'Flexible — I want adjustable difficulty so everyone at the table can enjoy the co-op experience', zh: '灵活即可，难度可调整，让每个共同游玩的朋友都能享受过程', type: 'obelisk' },
    ],
  },
  {
    q_en: "What's your ideal visual aesthetic for a card game?",
    q_zh: '你理想中的卡牌游戏视觉风格是？',
    options: [
      { en: 'Cute pixel sci-fi: mech animals, warm pastel colors, charming character portraits', zh: '可爱像素科幻：机甲动物、温暖的马卡龙色调、讨人喜欢的角色立绘', type: 'cobalt' },
      { en: 'Bold, stylized fantasy: striking creature designs, dramatic lighting, strong visual identity', zh: '粗犷有力的奇幻风：冲击力十足的怪物设计、戏剧性光影、鲜明的视觉个性', type: 'monster' },
      { en: 'Dark gothic horror: grotesque enemies, oppressive shadow, art that makes you feel the dread', zh: '暗黑哥特恐怖：形态扭曲的敌人、压迫性的阴影、让你感受到绝望的美术风格', type: 'dd2' },
      { en: 'Classic fantasy RPG: colorful character classes, traditional card art, inviting and familiar', zh: '经典奇幻RPG：丰富多彩的职业设计、传统风格卡牌美术、熟悉亲切的整体感', type: 'obelisk' },
    ],
  },
  {
    q_en: 'How do you prefer to play this kind of game?',
    q_zh: '你更喜欢如何游玩这类游戏？',
    options: [
      { en: 'Solo, in relaxed sessions I can start and stop freely without losing momentum', zh: '单人游玩，随时可以暂停继续的轻松节奏，不需要长时间连续投入', type: 'cobalt' },
      { en: 'Solo, in focused deep-dive sessions where I can fully concentrate on optimization', zh: '单人游玩，沉浸式的专注局，全身心投入推演最优策略', type: 'monster' },
      { en: 'Solo, in long, invested runs where every decision carries real weight', zh: '单人游玩，投入度极高的长局，每个决策都感觉沉甸甸的有分量', type: 'dd2' },
      { en: 'With friends — the best part is discussing strategy and sharing the wins and losses together', zh: '和朋友一起，最精彩的是共同讨论策略，一起承担胜负的时刻', type: 'obelisk' },
    ],
  },
  {
    q_en: "What kind of run structure speaks to you?",
    q_zh: '你偏好哪种循环结构？',
    options: [
      { en: 'Short, satisfying loops with clear progression and plenty of between-run upgrades to unlock', zh: '短而满足的循环，有清晰的进度感和丰富的局间解锁内容', type: 'cobalt' },
      { en: 'Tight, mechanically dense runs with massive variety — no two runs ever feel the same', zh: '紧凑而机制丰富的局，变化极大，每把都感觉完全不同', type: 'monster' },
      { en: 'A long, grueling journey where every step forward feels like a hard-won inch of ground', zh: '漫长而艰苦的旅程，每一步前进都像是在硬打出来的', type: 'dd2' },
      { en: 'A branching RPG adventure with multiple paths, unique encounters, and narrative choices', zh: '分支丰富的RPG冒险，多条路线、独特遭遇和叙事选择让每次体验不同', type: 'obelisk' },
    ],
  },
  {
    q_en: 'What do you want from the story and world of a deckbuilder?',
    q_zh: '你对卡牌构筑游戏的世界观和叙事有什么期望？',
    options: [
      { en: 'A heartfelt, charming narrative with characters I genuinely care about and root for', zh: '温馨动人的故事，有我真心喜欢、会为之担心的角色', type: 'cobalt' },
      { en: 'Minimal story — I am here for the mechanics; lore is a bonus, not a priority', zh: '故事越少越好，我来这里是为了机制本身，背景设定是附赠品而非重点', type: 'monster' },
      { en: 'A bleak, literary narrative where even losing tells a story worth experiencing', zh: '沉郁而有文学质感的叙事，连失败本身都是值得体验的一部分', type: 'dd2' },
      { en: 'A rich fantasy world I can explore across many sessions with different character combinations', zh: '丰富的奇幻世界，可以通过不同职业组合在多次游玩中慢慢探索', type: 'obelisk' },
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
  cobalt: {
    title_en: 'Cobalt Core',
    title_zh: 'Cobalt Core',
    emoji: '🤖',
    tag_en: 'The Cozy Deckbuilder',
    tag_zh: 'Cozy 卡牌构筑者',
    platform_en: 'PC · Nintendo Switch',
    platform_zh: 'PC · Nintendo Switch',
    why_en: `Cobalt Core is the rare deckbuilder that manages to be genuinely cozy without sacrificing depth. Set aboard a time-looping space station populated by adorable anthropomorphic animal crew members, you play as Miri, a young mech pilot navigating temporal anomalies through turn-based card combat. The aesthetic is immediately distinctive: chunky pixel art in warm, desaturated pastels, character portraits full of personality, and a color palette that feels more like a Studio Ghibli film than a typical roguelike. The mechanics are elegant rather than overwhelming: you build a mech loadout using a deck of cards representing different systems — weapons, shields, engines, and specials — and the core loop rewards you for finding synergies between them. Unlike many deckbuilders, Cobalt Core keeps its run length manageable (2-3 hours for a full run) and its between-run progression satisfying, unlocking new characters, starting decks, and modifiers at a pace that never feels grindy. The story — involving a temporal mystery aboard the station and Miri's relationships with her crewmates — is genuinely charming and provides enough emotional investment to make you care about reaching the ending. For players who loved Slay the Spire but wanted something with more warmth, or for cozy gamers curious about deckbuilders, Cobalt Core is the perfect entry point.`,
    why_zh: `《Cobalt Core》是极少数能在不牺牲深度的前提下做到真正"cozy"的卡牌构筑游戏。游戏设定在一座时间循环的太空站上，满是可爱拟人动物船员，你扮演年轻机甲飞行员Miri，用卡牌战斗穿越时间异常。温暖的去饱和像素美术、充满个性的角色立绘，整体气质更像宫崎骏动画而非典型roguelike。机制优雅而不令人窒息：用代表机甲各系统（武器/护盾/引擎/特殊）的卡牌组建战术，核心乐趣在于找到协同效应。单局2-3小时，局间解锁节奏舒适，故事温馨有情感投入。对于喜欢《杀戮尖塔》但想要更多温度的玩家，或是对卡牌游戏好奇的cozy玩家，这是完美的起点。`,
    tip_en: `Start with Miri's default deck and focus on understanding the shield-and-overdrive synergy before adding many cards — Cobalt Core rewards players who know when NOT to add a card to their deck. The station layout changes every run, but pay attention to the merchant and rest site positions: arriving at a rest site with full HP is wasted; plan your route to rest when damaged. For boss encounters, the key is almost always identifying what the boss is building toward on their action bar and disrupting it — read the enemy intent carefully every turn rather than focusing purely on offense.`,
    tip_zh: `先用Miri的默认牌组，在加入大量卡牌前先理解护盾与超载的协同机制——《Cobalt Core》奖励懂得何时"不加牌"的玩家。太空站布局每局不同，但要留意商人和休息站的位置：满血到达休息站是浪费，受伤时才是休息的时机。打Boss时，关键几乎总是识别Boss正在积累什么动作并加以打断——每回合认真阅读敌方意图，而不只是专注于进攻。`,
  },
  monster: {
    title_en: 'Monster Train',
    title_zh: '怪物列车',
    emoji: '🚂',
    tag_en: 'The Engine Optimizer',
    tag_zh: '机制优化狂',
    platform_en: 'PC · Xbox · Switch',
    platform_zh: 'PC · Xbox · Switch',
    why_en: `Monster Train is what happens when experienced deckbuilder designers set out to create the most mechanically dense, replay-rich roguelike possible — and succeed. You are a demon protecting the last pyre of Hell as it travels back to rekindle the Covenant, fighting angelic forces on a three-floor train car. The setup sounds simple, but the depth is staggering: you choose two of five clans to combine (each with radically different mechanics and card pools), place units strategically on each floor, and build a deck that interacts with your units' placement in ways that Slay the Spire never imagined. The clan combination system alone generates hundreds of meaningfully different starting identities, and the pact striker system (a modifier that scales the difficulty and reward of each run) keeps veteran players pushing toward new challenges for hundreds of hours. Monster Train also has one of the best-designed roguelike communities: the Covenant 25 ranking system creates a prestige ladder that skilled players have been climbing for years. The game runs in tight 45-90 minute sessions, is constantly surprising even on your hundredth run, and remains one of the highest-rated deckbuilders ever released. For players who want the deepest possible engagement from the genre, Monster Train is the answer.`,
    why_zh: `《怪物列车》是deckbuilder设计师全力打造"机制最密集、重玩价值最高"的roguelike后交出的成绩单。你是地狱最后一块火焰的守护恶魔，在三层列车车厢上抵御天使军团。选择两个氏族组合（各有截然不同的机制与卡池）、在各楼层策略性放置单位、建立与单位位置深度交互的牌组——单是氏族组合系统就能生成数百种有实质差异的开局身份。契约等级系统（Covenant）为老玩家持续提供挑战阶梯，已有玩家刷了数百小时。单局45-90分钟，百局后仍能给你惊喜，是史上评分最高的deckbuilder之一。想要在这个类型里得到最深度体验，《怪物列车》就是答案。`,
    tip_en: `The single most important skill in Monster Train is unit placement — understanding which floor your big unit should be on, and why, will win more runs than having a perfect deck. Always read every card in your current clan pools before the run begins; many synergies are non-obvious until you see the full picture. The Seraph boss is the final test: she reduces your maximum capacity each wave, so your deck needs to be able to function at reduced unit limits. Finally, do not neglect spells that buff your units — in Monster Train, unit power often scales higher than direct damage, and a well-buffed champion can solo entire floors.`,
    tip_zh: `《怪物列车》最重要的技能是单位放置——理解你的强力单位应该在哪一层、为什么，比拥有一套完美牌组更能赢得胜利。开局前务必阅读当前氏族的所有卡牌；很多协同效应直到你看到全貌才会显现。最终Boss天使长每波会减少你的最大容量，所以你的牌组需要在单位数量受限时仍能运转。不要忽视强化单位的法术——在《怪物列车》中，单位强化的上限往往高于直接伤害，一个被精心强化的冠军可以独自清除整层。`,
  },
  dd2: {
    title_en: 'Darkest Dungeon II',
    title_zh: '暗黑地牢 2',
    emoji: '🕯️',
    tag_en: 'The Grim Storyteller',
    tag_zh: '悲剧故事追求者',
    platform_en: 'PC · PS4/5 · Xbox · Switch',
    platform_zh: 'PC · PS4/5 · Xbox · Switch',
    why_en: `Darkest Dungeon II is not interested in making you feel powerful. It is interested in making you feel like you are barely holding things together while a carriage full of traumatized heroes careens toward a mountain that will probably kill them all — and making that feel meaningful. The sequel expands dramatically on the original's formula: instead of managing a dungeon-crawling guild, you lead a four-hero road journey across a ravaged world, managing not only the heroes' health and stress but their relationships with each other. Positive relationships between heroes grant powerful bonuses; hatred between them triggers disastrous sabotage at the worst possible moments. The card-based combat adds another layer of complexity: each hero has a growing hand of skill cards drawn each turn, and positioning along the four-slot party line affects which skills can be used at all. Darkest Dungeon II is explicit about its themes: it is a game about trauma, perseverance, and the thin line between heroism and madness. The writing by Chris Bourassa and Tyler Sigman is among the best in the genre — darkly literary, occasionally even beautiful. It is a genuinely difficult game, but it is also one of the most cohesive artistic visions in modern roguelikes. For players who want their games to have something to say, Darkest Dungeon II says it with unmatched weight.`,
    why_zh: `《暗黑地牢2》毫无意图让你感到强大。它想让你感受到用尽全力勉强维持一辆载着创伤英雄们的马车——向着大概率杀死所有人的山头冲去——而这一切都充满意义。续作大幅扩展：从地牢管理转变为四英雄公路旅行，你不仅管理生命值和压力，还要管理英雄之间的关系。正向关系带来强力加成，相互憎恶则在最糟糕的时刻引发灾难性的破坏行为。卡牌制战斗增添了新的复杂度，四格队伍站位影响哪些技能可以使用。游戏的主题毫不掩饰：创伤、坚持，以及英雄主义与疯狂之间那条纤细的界线。文案是roguelike类型中最具文学价值的之一——黑暗、偶尔甚至带有一丝美感。这是一款真正艰难、也拥有最完整艺术愿景的游戏。`,
    tip_en: `Relationship management is the hidden heart of Darkest Dungeon II — prioritize getting positive relationships as early as possible, because the bonuses compound dramatically over a long run. At the inn, always spend time on relationship-building activities rather than treating only physical ailments: a hero with full HP but shattered relationships will destroy your run in a crisis. For combat, learn which heroes anchor your formation and protect them at all costs — losing your tank-equivalent on floor 3 is usually a run-ender. The Confession system (boss encounters) rewards having specific tokens going into the fight: read the boss preview carefully and build toward the recommended token types in the preceding encounters.`,
    tip_zh: `关系管理是《暗黑地牢2》隐藏的核心——尽早建立正向关系，因为奖励随时间复利增长。在旅馆休息时，优先花时间做建立关系的活动而不只是治疗身体伤害：满血但关系破裂的英雄会在危机时刻毁掉你的整局。战斗中，识别哪些英雄是队形的支柱并不惜一切保护他们——在第3层失去坦克位基本等于宣告一局结束。告解系统（Boss战）奖励带着特定标记进场：仔细阅读Boss预览，在前置遭遇中有意积累推荐的标记类型。`,
  },
  obelisk: {
    title_en: 'Across the Obelisk',
    title_zh: 'Across the Obelisk',
    emoji: '🔮',
    tag_en: 'The Co-op Card Adventurer',
    tag_zh: '合作卡牌冒险家',
    platform_en: 'PC · Xbox · Switch',
    platform_zh: 'PC · Xbox · Switch',
    why_en: `Across the Obelisk fills a gap that most deckbuilders leave open: it is genuinely great in co-op, where up to four players each control their own hero, manage their own deck, and coordinate strategy in real time. The game is a card RPG in the truest sense — you choose a character class, customize their deck across dozens of unique cards, and then journey through a branching world map full of story events, shops, and encounters that react to your party's choices. The multiplayer works because each player has a distinct role: one might be playing an aggressive damage-dealer, another a healer managing sustain, another a debuffer coordinating crowd control. Every decision in a run is shared — where to go on the map, which events to engage with, how to spend gold — so the game rewards communication and genuine teamwork rather than parallel solo play. There are now twelve characters across the base game and DLC, with radically different mechanics ranging from a necromancer who builds an army of skeletons to a rogue who manipulates card draw and cycle. The branching narrative also gives Across the Obelisk unusual replay depth: story events change based on previous runs, party composition, and choices made in earlier chapters, so experienced groups find new content even after dozens of hours together.`,
    why_zh: `《Across the Obelisk》填补了大多数卡牌构筑游戏留下的空白：它在合作模式下真正出彩，最多四名玩家各自控制一位英雄、管理自己的牌组，并实时协调策略。这是最接近卡牌RPG本质的游戏——选择职业、在数十张独特卡牌中定制牌组，然后穿越充满故事事件、商店和遭遇的分支世界地图。每位玩家扮演不同角色：输出手、治疗者、控制位——每个局内决策都是共同的，奖励真实的沟通与团队协作。十二个角色、多个DLC，机制跨度极大（从召唤骷髅军团的死灵法师到操控抽牌循环的盗贼）。分支叙事还基于历史局、队伍组成和过去的选择而变化，经验丰富的团队在数十小时后仍能遇到新内容。`,
    tip_en: `Across the Obelisk's biggest mistake for new players is picking four damage-dealers and having no sustain — always make sure your party has at least one dedicated healer (Wilbur the Druid is the easiest to learn) before adding your fourth damage character. During story events, read every option before choosing: many events have synergies with specific character choices or items you might already have, and the best outcomes are often hidden behind options that seem risky. For veterans looking to push difficulty, the game has a curse system and difficulty modifiers that dramatically change the routing strategy — start adding curses one at a time to understand their individual impact before combining them.`,
    tip_zh: `新手最常见的错误是选四个输出职业、没有任何治疗——组队时务必确保至少有一个专职治疗（德鲁伊Wilbur是最易上手的）再加入第四个输出角色。遭遇故事事件时，在做选择前读完所有选项：很多事件与特定角色或已持有道具存在协同，最佳结果往往藏在看似风险高的选项后面。对于寻求高难度挑战的老手，诅咒系统和难度修改器会显著改变路线策略——逐个添加诅咒理解其单独影响，再尝试叠加组合。`,
  },
}

function calcResult(answers: Pick[]): Pick {
  const counts: Record<Pick, number> = { cobalt: 0, monster: 0, dd2: 0, obelisk: 0 }
  for (const a of answers) counts[a]++
  return Object.entries(counts).sort((x, y) => y[1] - x[1])[0][0] as Pick
}

export function DeckbuilderRoguelikeQuiz({ locale }: { locale: string }) {
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
      ? `我的卡牌构筑游戏推荐是《${r.title_zh}》！${r.emoji} 来测测你适合哪款？${BASE_URL}/zh/quizzes/deckbuilder-roguelike-quiz`
      : `My deckbuilder roguelike match is ${r.title_en}! ${r.emoji} Which one are you? ${BASE_URL}/en/quizzes/deckbuilder-roguelike-quiz`

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
            {isZh ? '想找更多适合你的农场与休闲游戏？' : 'Want more game recommendations tailored to you?'}
          </p>
          <p className="text-sm text-[#e8dcc8]">
            {isZh
              ? '试试 TendFarm App — 根据你的心情和时间，每天推荐最适合的游戏'
              : 'Try TendFarm App — daily game picks matched to your mood and schedule'}
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
