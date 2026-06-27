'use client'

import { useState } from 'react'
import { BASE_URL } from '@/lib/config'

type Pick = 'slime' | 'sanctuary' | 'dqm' | 'temtem'

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
    q_en: 'How do you most want to interact with your creatures?',
    q_zh: '你最想以哪种方式与你的生物互动？',
    options: [
      { en: 'Ranching and caretaking — collect different types, build habitats that suit their needs, watch them multiply, and manage a thriving ecosystem', zh: '牧场管理和照料——收集不同类型、建造适合它们需求的栖息地、看着它们繁殖，管理一个蓬勃发展的生态系统', type: 'slime' },
      { en: 'Strategic allying — form a team of three monsters whose abilities chain together and complement each other in intelligent, tactical battles', zh: '战略同盟——组建三只怪物的队伍，它们的能力在智能、战术战斗中相互配合和补充', type: 'sanctuary' },
      { en: 'Collecting and synthesizing — catch hundreds of species, then fuse monsters across generations to create hybrid creatures with inherited abilities', zh: '收集和合成——捕获数百种物种，然后跨代合成怪物，创造拥有遗传能力的混合生物', type: 'dqm' },
      { en: 'Training and competing — raise a team to challenge other players online, mastering type matchups and move synergies through real competition', zh: '训练和竞争——培养一个队伍在线挑战其他玩家，通过真实竞争掌握属性克制和技能协同', type: 'temtem' },
    ],
  },
  {
    q_en: 'How important is combat to your ideal experience?',
    q_zh: '战斗对你理想体验有多重要？',
    options: [
      { en: 'Not important at all — I want to manage my creatures and explore without any combat pressure', zh: '完全不重要——我想管理我的生物并探索，没有任何战斗压力', type: 'slime' },
      { en: 'Central and satisfying — team-based tactical battles where positioning and ability synergy decide the outcome', zh: '核心且令人满足——队伍战术战斗，阵型和能力协同决定结果', type: 'sanctuary' },
      { en: 'Important but strategic — I want to build a lineage of monsters specifically designed to overcome tough boss encounters', zh: '重要但战略性——我想建立一个专门设计来克服艰难 Boss 遭遇的怪物血脉', type: 'dqm' },
      { en: 'The main event — I want to become skilled enough to compete online and measure myself against other dedicated players', zh: '主要内容——我想变得足够熟练以在线竞争，并与其他专注玩家比较', type: 'temtem' },
    ],
  },
  {
    q_en: 'What kind of world do you want to explore with your creatures?',
    q_zh: '你想带着你的生物探索哪种类型的世界？',
    options: [
      { en: 'A vibrant alien island with distinct biomes — each zone has its own slime types, hazards, and resources to discover', zh: '一个充满活力的外星岛屿，有不同的生态区域——每个地带都有自己的史莱姆类型、危险和资源可供发现', type: 'slime' },
      { en: 'A hand-crafted metroidvania world where acquiring certain monster types unlocks new traversal abilities and areas', zh: '一个精心制作的银河城世界，获得某些怪物类型可以解锁新的移动能力和区域', type: 'sanctuary' },
      { en: 'A classic JRPG world with deep lore about the history of monster creation and synthesis across multiple kingdoms', zh: '一个有关于跨多个王国怪物创造和合成历史的深厚传说的经典 JRPG 世界', type: 'dqm' },
      { en: 'A shared online world where other tamers are also raising and battling, making every encounter feel meaningful', zh: '一个其他驯养者也在培育和战斗的共享在线世界，让每次遭遇都感觉有意义', type: 'temtem' },
    ],
  },
  {
    q_en: 'How much depth do you want in creature systems?',
    q_zh: '你希望生物系统有多大的深度？',
    options: [
      { en: 'Intuitive and accessible — slime types have clear needs and produce resources in ways I can understand at a glance', zh: '直觉且易懂——史莱姆类型有明确的需求，并以我一眼就能理解的方式产出资源', type: 'slime' },
      { en: 'Moderate but rich — each monster has a unique passive and active ability set that creates interesting combinations in a team of three', zh: '中等但丰富——每只怪物都有独特的被动和主动能力组，在三只的队伍中创造有趣的组合', type: 'sanctuary' },
      { en: 'Very deep — cross-generation synthesis, inherited moves, trait stacking, and monster-specific skill trees that take dozens of hours to master', zh: '非常深入——跨代合成、遗传技能、特性叠加和怪物专属技能树，需要数十小时来掌握', type: 'dqm' },
      { en: 'Competitively deep — type charts with dual-type interactions, stamina-based turns, and a metagame that evolves alongside the community', zh: '竞争性深度——双属性互动的属性克制表、基于耐力的回合，以及随社区共同演化的元游戏', type: 'temtem' },
    ],
  },
  {
    q_en: 'How long would you like to play before feeling satisfied?',
    q_zh: '你想玩多久才感到满足？',
    options: [
      { en: '20-40 hours — enough to see all the biomes, unlock the full ranch, and experience the complete exploration arc', zh: '20-40 小时——足以看到所有生态区域、解锁完整的牧场，并体验完整的探索弧线', type: 'slime' },
      { en: '40-60 hours — complete the metroidvania world map, fill my monster roster, and defeat the final boss with a team I designed myself', zh: '40-60 小时——完成银河城世界地图、填满我的怪物名册，并用我自己设计的队伍击败最终 Boss', type: 'sanctuary' },
      { en: '80-100+ hours — the synthesis system alone can absorb that much time, and the main story adds a full classic JRPG arc on top', zh: '80-100+ 小时——仅合成系统就能吸收那么多时间，而主线故事还添加了一个完整的经典 JRPG 弧线', type: 'dqm' },
      { en: 'Ongoing — a live-service game where I can sink hundreds of hours into ranked matches, seasonal events, and improving my team', zh: '持续——一款实时服务游戏，我可以投入数百小时于排名比赛、季节性活动和改进我的队伍', type: 'temtem' },
    ],
  },
  {
    q_en: 'Which end-of-session feeling sounds most appealing?',
    q_zh: '哪种游戏结束时的感觉听起来最有吸引力？',
    options: [
      { en: 'I expanded my ranch into a new biome, discovered two new slime variants I had never seen, and my Plort market is now fully automated', zh: '我把牧场扩展到了一个新的生态区域，发现了两种我从未见过的史莱姆变种，我的晶体市场现在已经完全自动化了', type: 'slime' },
      { en: 'I finally figured out the perfect three-monster combo to clear the dungeon I was stuck on — and it opened a new area of the world I had been unable to reach', zh: '我终于找到了完美的三怪物组合来清除我一直卡住的地下城——它打开了一个我无法到达的世界新区域', type: 'sanctuary' },
      { en: 'I synthesized a rare monster with three inherited skills from its parent lineage — a creature no one else will have built exactly the same way', zh: '我合成了一只拥有三个来自父母血脉遗传技能的稀有怪物——一个没有其他人会以完全相同方式培育的生物', type: 'dqm' },
      { en: 'I won three ranked matches in a row using a team composition I developed from scratch — my reading of the metagame is finally paying off', zh: '我用从零开始开发的队伍组合连赢了三场排名比赛——我对元游戏的理解终于得到了回报', type: 'temtem' },
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
  slime: {
    title_en: 'Slime Rancher 2',
    title_zh: 'Slime Rancher 2',
    emoji: '🫧',
    tag_en: 'Ranch colorful alien slimes on a magical glass desert island — a pure cozy exploration and management game with no combat and an always-satisfying resource loop',
    tag_zh: '在一个神奇的玻璃沙漠岛上牧养多彩的外星史莱姆——一款没有战斗、有着始终令人满足资源循环的纯 Cozy 探索和管理游戏',
    platform_en: 'Available on: PC (Steam), Xbox Series X/S, Game Pass — about $30. Early Access since 2022, full release ongoing.',
    platform_zh: '可在以下平台获取：PC（Steam）、Xbox Series X/S、Game Pass——约 30 美元。自 2022 年起进入抢先体验，完整发行持续进行。',
    why_en:
      "Slime Rancher 2 (2022, full release in progress) is the sequel to the beloved original and one of the most charming creature management games ever made. You play as Beatrix LeBeau, returning to a new island called Rainbow Island, where you discover new slime species, build and expand a ranch, and harvest the \"Plorts\" (droppings) that each slime type produces to sell. The game is played in first person with a vacuum gun — you suck up resources, food, and slimes, then deposit them where they belong. Each slime type has different needs (diet, environment) and different Plort values; Largo Slimes (fusions of two types) produce two Plort types but are more demanding. The exploration loop is deeply satisfying: new areas contain new slimes, and finding a biome you have never been to before always delivers a moment of delight. There is no combat; the only danger is letting slimes escape or over-mixing incompatible species. For Stardew Valley players: the Plort market, resource management, and ranch automation feel immediately familiar — this is a farming sim in creature form. Available on Game Pass.",
    why_zh:
      'Slime Rancher 2（2022 年，完整版发行中）是备受喜爱的原版续作，也是有史以来最迷人的生物管理游戏之一。你扮演 Beatrix LeBeau，回到一个新岛屿"彩虹岛"，在那里你发现新的史莱姆物种、建造和扩展牧场，并收获每种史莱姆类型产生的"晶体"（排泄物）出售。游戏以第一人称和真空枪进行——你吸起资源、食物和史莱姆，然后将它们存放在适当的地方。每种史莱姆类型都有不同的需求（饮食、环境）和不同的晶体价值；大型史莱姆（两种类型的融合）产生两种晶体类型但要求更高。探索循环非常令人满足：新区域包含新史莱姆，找到一个你从未去过的生态区域总是带来一个愉快的时刻。没有战斗；唯一的危险是让史莱姆逃跑或过度混合不相容的物种。对于星露谷玩家：晶体市场、资源管理和牧场自动化感觉立即熟悉——这是生物形式的农场模拟。Game Pass 上可用。',
    tip_en: "Build a Plort Market early and start selling your most valuable Plort types each morning — prices reset daily and fluctuate. Prioritize the Conservatory expansion to gain more ranch plots. The Gordo Slimes (giant immovable slimes in the world) are worth feeding to pop — they always reveal a new area or resource when burst.",
    tip_zh: '早期建立晶体市场，每天早上开始出售你最有价值的晶体类型——价格每天重置并波动。优先扩展温室以获得更多牧场地块。世界中的 Gordo 史莱姆（巨大的不可移动史莱姆）值得喂食来爆破——爆破时总会揭示新区域或资源。',
  },
  sanctuary: {
    title_en: 'Monster Sanctuary',
    title_zh: '怪物避难所',
    emoji: '🐉',
    tag_en: 'A metroidvania where your team of three monsters is your toolkit — unlock new traversal abilities, discover every corner of a connected world, and master strategic 3v3 monster battles',
    tag_zh: '一款你的三只怪物队伍是你工具包的银河城——解锁新的移动能力、发现互连世界的每个角落，并掌握战略性 3v3 怪物战斗',
    platform_en: 'Available on: PC (Steam, GOG), Nintendo Switch, PS4, PS5, Xbox — about $17',
    platform_zh: '可在以下平台获取：PC（Steam、GOG）、Nintendo Switch、PS4、PS5、Xbox——约 17 美元',
    why_en:
      "Monster Sanctuary (2020) is a brilliantly designed fusion of metroidvania exploration and monster-collecting RPG — a game that uses monster abilities directly as traversal tools. Your team of three monsters accompanies you everywhere, and different monster types unlock different world areas: a flying monster lets you cross gaps, an aquatic monster lets you swim, and so on. The turn-based battle system is built around \"Shielding\" — your monsters build up Shield (damage reduction) through ability synergies, and breaking an enemy's Shield does massive damage. Building a team where each monster's passive and active abilities enhance the others is the core creative puzzle. The metroidvania world is hand-crafted and dense, with secrets in every area. The monster roster spans 100+ species, each with a fully unique skill tree. For players who want Pokémon's creature collection married to Hollow Knight's exploration philosophy: Monster Sanctuary does exactly that. At about $17 with regular deep sales, it is one of the best value games in the genre.",
    why_zh:
      '怪物避难所（2020 年）是银河城探索和怪物收集 RPG 的精彩融合——一款直接使用怪物能力作为移动工具的游戏。你的三只怪物队伍无处不在地陪伴着你，不同的怪物类型解锁不同的世界区域：飞行怪物让你越过裂缝，水生怪物让你游泳，等等。回合制战斗系统建立在"护盾"基础上——你的怪物通过能力协同积累护盾（伤害减免），打破敌人的护盾造成巨大伤害。建立一个每只怪物的被动和主动能力相互增强的队伍是核心创意谜题。银河城世界是手工制作且密集的，每个区域都有秘密。怪物名册涵盖 100+ 种物种，每种都有完全独特的技能树。约 17 美元，经常深度促销，是该类型中最高性价比的游戏之一。',
    tip_en: "Focus on Shielding synergy early — monsters that apply Shields when buffing allies make your team much more durable. Breed monsters as soon as breeding unlocks; offspring inherit abilities and often have better stat spread than the wild-caught parent. Check monster ability tooltips carefully: some passives trigger multiple times per round and are far more powerful than they look.",
    tip_zh: '早期专注于护盾协同——在增益盟友时施加护盾的怪物让你的队伍更加耐久。繁殖解锁后立即繁殖怪物；后代继承能力，通常比野外捕获的亲本有更好的属性分配。仔细检查怪物能力提示：一些被动每回合触发多次，比看起来强大得多。',
  },
  dqm: {
    title_en: 'Dragon Quest Monsters: The Dark Prince',
    title_zh: '勇者斗恶龙：怪兽仙境 The Dark Prince',
    emoji: '👑',
    tag_en: 'The deepest monster synthesis system in gaming — catch hundreds of species and fuse them across generations to create custom monsters with inherited skills from both parents',
    tag_zh: '游戏中最深度的怪物合成系统——捕获数百种物种并跨代合成，创造从双亲继承技能的定制怪物',
    platform_en: 'Available on: Nintendo Switch only — about $60 new. PC version not yet available.',
    platform_zh: '可在以下平台获取：仅 Nintendo Switch——新品约 60 美元。PC 版尚未发售。',
    why_en:
      "Dragon Quest Monsters: The Dark Prince (2023) is the latest entry in Square Enix's beloved monster-collecting sub-franchise — a game with one of the deepest synthesis (fusion) systems in the genre. You play as Psaro, a character from Dragon Quest IV who is cursed to be unable to harm monsters, and so learns to synthesize them instead. The world is layered across five seasons, with different monsters available depending on the current season in each area. But the synthesis system is the real draw: any two monsters can be fused to create a new higher-rank species, and critically, the offspring inherits up to eight skills from both parents. Breeding a monster specifically to inherit the perfect combination of skills from multiple generations is the depth that monster enthusiasts spend hundreds of hours on. The roster spans 500+ monsters drawn from the entire Dragon Quest franchise history. For fans of Dragon Quest or anyone who wants the deepest monster-collection system available on Nintendo Switch: this is the definitive entry in the genre.",
    why_zh:
      '勇者斗恶龙：怪兽仙境 The Dark Prince（2023 年）是史克威尔艾尼克斯备受喜爱的怪物收集子系列的最新作品——一款拥有该类型中最深度合成（融合）系统之一的游戏。你扮演 Psaro，勇者斗恶龙 IV 中的角色，他被诅咒无法伤害怪物，因此转而学习合成它们。世界分层于五个季节，不同区域有不同的怪物可根据当前季节获得。但合成系统才是真正的核心：任何两只怪物都可以合成，创造一个新的更高级别物种，关键是后代从双亲继承多达八个技能。专门培育一只怪物以从多代继承完美技能组合的深度是怪物爱好者花费数百小时的原因。名册涵盖了整个勇者斗恶龙系列历史中的 500+ 只怪物。',
    tip_en: "Scout monsters (the game's catch mechanic involves weakening them until they want to join) in every new area immediately — some rare monsters only appear in specific seasons, and missing a season means waiting for the cycle to come back. When synthesizing, always plan your skill inheritance two generations ahead: the meta-goal is building a Rank 10 monster with skills from three or four prior generations.",
    tip_zh: '在每个新区域立即侦察怪物（游戏的捕获机制涉及削弱它们直到它们想加入）——一些稀有怪物只在特定季节出现，错过一个季节意味着等待循环回来。合成时，始终提前两代计划你的技能继承：元目标是建立一个拥有来自三到四个先前世代技能的 10 级怪物。',
  },
  temtem: {
    title_en: 'Temtem',
    title_zh: 'Temtem',
    emoji: '⚡',
    tag_en: 'An online creature-taming MMO with a stamina-based competitive battle system — raise a team, challenge the story, and compete against other tamers from around the world',
    tag_zh: '一款拥有基于耐力竞技战斗系统的在线生物驯养 MMO——培养队伍、挑战故事，并与来自世界各地的其他驯养者竞争',
    platform_en: 'Available on: PC (Steam), Nintendo Switch, PS5, Xbox Series X/S — about $45',
    platform_zh: '可在以下平台获取：PC（Steam）、Nintendo Switch、PS5、Xbox Series X/S——约 45 美元',
    why_en:
      "Temtem (2022) is the most ambitious online monster-taming game ever made — an MMO designed from the ground up to fix the things competitive Pokémon players have wanted for decades. The game takes place in the Airborne Archipelago, a world of floating islands, and features 164 Temtem species with a dual-typing system, a unique stamina mechanic (moves cost stamina, overexerting damages your own Temtem), and a synchronize system where certain moves are twice as powerful if used by both partners in the same turn. The world is shared with other players — you will see real tamers in towns, can challenge them to battles, and can form squads for endgame content. The campaign is a full 30-40 hour story; post-campaign is competitive ranked play. For Pokémon fans who want online multiplayer integrated into the core game, a fair competitive system without random chance, and a persistent shared world: Temtem delivers that experience. Cross-play between all platforms means the player pool is combined across PC, Switch, PS5, and Xbox.",
    why_zh:
      'Temtem（2022 年）是有史以来最雄心勃勃的在线怪物驯养游戏——一款从头开始设计来修复竞争性宝可梦玩家数十年来想要的东西的 MMO。游戏发生在空中群岛，一个漂浮岛屿的世界，拥有 164 种 Temtem，具有双属性系统、独特的耐力机制（技能消耗耐力，过度消耗会伤害你自己的 Temtem）和同步系统（如果双方伙伴在同一回合使用某些技能，效果翻倍）。世界与其他玩家共享——你将在城镇看到真实的驯养者，可以向他们发起挑战，并可以组队进行终局内容。主线是一个完整的 30-40 小时故事；主线后是竞争性排名游戏。所有平台间的跨平台游戏意味着玩家池在 PC、Switch、PS5 和 Xbox 间合并。',
    tip_en: "Learn the stamina system before your first trainer battle — overexerting (using a move when you don't have enough stamina) causes recoil damage. The Synchronize mechanic is the key to competitive play: two Temtem using perfectly synced moves in the same turn. Build your team around one or two strong sync pairs and learn their best combinations before entering ranked.",
    tip_zh: '在第一场驯养者战斗之前学习耐力系统——过度消耗（在耐力不足时使用技能）会造成反弹伤害。同步机制是竞争游戏的关键：两只 Temtem 在同一回合使用完美同步的技能。围绕一到两个强力同步对建立你的队伍，并在进入排名前学习他们最好的组合。',
  },
}

function calcResult(answers: Pick[]): Pick {
  const counts: Record<Pick, number> = { slime: 0, sanctuary: 0, dqm: 0, temtem: 0 }
  for (const a of answers) counts[a]++
  return Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0] as Pick
}

export function CreatureRaisingQuiz({ locale }: { locale: string }) {
  const isZh = locale === 'zh'
  const [answers, setAnswers] = useState<(Pick | null)[]>(Array(QUESTIONS.length).fill(null))
  const [submitted, setSubmitted] = useState(false)

  const allAnswered = answers.every((a) => a !== null)

  if (submitted) {
    const result = RESULTS[calcResult(answers as Pick[])]
    const url = `${BASE_URL}/${locale}/quizzes/creature-raising-quiz`
    const shareText = isZh
      ? `生物养成游戏推荐测验结果：「${result.title_zh}」！${result.tag_zh}。找到你的：${url}`
      : `My creature-raising game recommendation: ${result.title_en} — ${result.tag_en}. Find yours: ${url}`

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
          {isZh ? '哪款生物养成游戏最适合你？' : 'Which Creature-Raising Game Is Right for You?'}
        </h1>
        <p className="text-sm text-[#8a9a7a]">
          {isZh
            ? '6 个问题，从 Slime Rancher 2、怪物避难所、DQ 怪兽仙境、Temtem 中找到你的养成游戏'
            : '6 questions to match you with Slime Rancher 2, Monster Sanctuary, DQ Monsters: The Dark Prince, or Temtem'}
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
        {isZh ? '找到我的生物养成游戏' : 'Find My Creature Game'}
      </button>
    </div>
  )
}
