'use client'

import { useState } from 'react'
import { BASE_URL } from '@/lib/config'

type Role = 'provider' | 'builder' | 'explorer' | 'planner'

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
        {copied ? (isZh ? '✓ 已复制！' : '✓ Copied!') : isZh ? '📋 复制给队友' : '📋 Copy & tag your co-op partner'}
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
  options: Array<{ en: string; zh: string; type: Role }>
}> = [
  {
    q_en: "It's the first day of a new Stardew Valley co-op farm. What do you do?",
    q_zh: '星露谷联机农场的第一天，你会做什么？',
    options: [
      { en: 'Plant every seed in the starter pack and start cooking something for everyone', zh: '把新手礼包里的种子全种下去，然后给大家做点东西吃', type: 'provider' },
      { en: "Start clearing land and mentally redesigning the whole farm's layout", zh: '开始清理土地，在脑海里重新规划整个农场的布局', type: 'builder' },
      { en: 'Head straight to the mines — ore is the real bottleneck and someone has to grind it', zh: '直接去矿洞——矿石才是真正的瓶颈，总得有人去挖', type: 'explorer' },
      { en: 'Open a spreadsheet and calculate the optimal crop rotation for the whole season', zh: '打开表格，计算整个季节的最优作物轮换方案', type: 'planner' },
    ],
  },
  {
    q_en: "Your co-op partner just spent all the shared gold on something unexpected. You:",
    q_zh: '你的联机伙伴刚把共享金币全花在了一件你没预料到的事上。你会：',
    options: [
      { en: "Sigh, then immediately go harvest and sell crops to refill the treasury", zh: '叹口气，然后立刻去收割出售作物，把金库补回来', type: 'provider' },
      { en: "Ask what they bought — if it was a building upgrade you are secretly thrilled", zh: '问他们买了什么——如果是建筑升级，你心里其实很高兴', type: 'builder' },
      { en: "You're still in the mine and haven't checked the balance in three days", zh: '你还在矿洞里，已经三天没看账户余额了', type: 'explorer' },
      { en: 'Pull up the budget sheet and call a meeting — this was not in the plan', zh: '打开预算表，召开紧急会议——这不在计划之内', type: 'planner' },
    ],
  },
  {
    q_en: 'Which part of co-op do you enjoy most?',
    q_zh: '联机模式里你最享受哪个部分？',
    options: [
      { en: "Leaving food in the shared chest so everyone's energy is topped up", zh: '把食物放进共享箱，让大家的体力都满格', type: 'provider' },
      { en: 'Finally getting the barn and coop built — seeing the farm come together', zh: '终于把谷仓和鸡舍建好——看着农场成形的那一刻', type: 'builder' },
      { en: 'Diving deep in the mines and surfacing with a bag full of rare ore and gems', zh: '深入矿洞，带着一包稀有矿石和宝石回来', type: 'explorer' },
      { en: "Knowing that everything is running according to the plan you laid out on day one", zh: '知道一切都在按照第一天制定的计划进行', type: 'planner' },
    ],
  },
  {
    q_en: 'Your team needs copper ore urgently. What happens?',
    q_zh: '队伍急需铜矿石。接下来发生了什么？',
    options: [
      { en: "You check if anyone has energy left and offer to run to the mine with food buffs", zh: '你检查大家还有没有体力，带着食物增益主动说去矿洞', type: 'provider' },
      { en: "You already bought a furnace but realize you were waiting for someone else to get ore", zh: '你已经买好了熔炉，但发现自己一直在等别人去挖矿', type: 'builder' },
      { en: 'You are already in the mine — you send "coming up soon" in chat', zh: '你已经在矿洞里了——你在聊天框发"马上上来"', type: 'explorer' },
      { en: "You consult the schedule: copper was supposed to arrive yesterday per the plan", zh: '你翻查时间表：按计划铜矿昨天就该到了', type: 'planner' },
    ],
  },
  {
    q_en: "A festival is coming up. How do you prepare?",
    q_zh: '节日快来了。你怎么准备？',
    options: [
      { en: 'Cook everyone their favorite dishes the night before so energy is maxed during the festival', zh: '前一天晚上给大家做最喜欢的菜，让节日当天体力满格', type: 'provider' },
      { en: 'Make sure the farm looks presentable — maybe add some seasonal decorations', zh: '确保农场看起来整洁——也许加一些应季装饰', type: 'builder' },
      { en: "Realize it is the night before and you forgot — quickly grab what prizes you want to win", zh: '发现前一天晚上才记起来——赶快确认自己想赢的奖品', type: 'explorer' },
      { en: 'Block out time in the shared calendar and brief everyone on their roles', zh: '在共享日历里标注时间，向大家说明各自的分工', type: 'planner' },
    ],
  },
  {
    q_en: 'At the end of a long play session, you feel most satisfied when:',
    q_zh: '一次长时间游戏结束后，你最有满足感的是：',
    options: [
      { en: 'The shared chest is full of food, everyone has money, and the crops are watered', zh: '共享箱里装满了食物，大家都有钱，作物都浇好水了', type: 'provider' },
      { en: 'A new building went up and the farm layout is noticeably better than before', zh: '又盖好了一栋建筑，农场布局明显比以前更好看了', type: 'builder' },
      { en: 'You hit a new mine floor record and have a pile of ore to process', zh: '你创下了新的矿洞层数纪录，有一堆矿石等着加工', type: 'explorer' },
      { en: 'You checked off everything on the list and are ahead of schedule for next season', zh: '你完成了清单上的所有任务，下个季节的进度提前了', type: 'planner' },
    ],
  },
]

const RESULTS: Record<
  Role,
  {
    title_en: string
    title_zh: string
    emoji: string
    tag_en: string
    tag_zh: string
    desc_en: string
    desc_zh: string
    strength_en: string
    strength_zh: string
    blind_spot_en: string
    blind_spot_zh: string
    tip_en: string
    tip_zh: string
  }
> = {
  provider: {
    title_en: 'The Provider',
    title_zh: '补给官',
    emoji: '🌾',
    tag_en: 'The heart of every co-op farm',
    tag_zh: '联机农场的心脏',
    desc_en:
      "You are The Provider — the person who makes sure the whole operation actually runs. You plant crops, cook meals, fill the shared chest, and quietly keep everyone's energy topped up. You might not be the one with the dramatic mine run or the grand building project, but without you the farm would collapse in a week. Your co-op partners do not always notice until the food chest runs dry — then they understand exactly what you were doing.",
    desc_zh:
      '你是补给官——那个让整个农场实际运转的人。你种植作物、烹饪食物、填满共享箱，默默让大家的体力保持满格。你可能不是那个创下矿洞记录或搞大型建筑项目的人，但没有你，农场一周之内就会崩溃。你的联机伙伴不一定总能注意到你在做什么——直到食物箱见底，他们才真正明白你一直在干什么。',
    strength_en: 'Passive income, team sustainability, and making sure no one runs out of energy mid-day',
    strength_zh: '被动收入、团队持续运转、确保没人在进行到一半时体力耗尽',
    blind_spot_en: 'You sometimes forget to advance your own friendship hearts or do things just for fun',
    blind_spot_zh: '你有时会忘记推进自己的好感度，或者只是为了玩而玩',
    tip_en: "Automate your watering with sprinklers as soon as possible — it frees you to do more without feeling like you're abandoning your duties.",
    tip_zh: '尽快用洒水器自动化浇水——这能解放你去做更多事，而不会有「抛下职责」的愧疚感。',
  },
  builder: {
    title_en: 'The Builder',
    title_zh: '建造师',
    emoji: '🏗️',
    tag_en: 'The one with the vision',
    tag_zh: '有愿景的那个人',
    desc_en:
      "You are The Builder — the one who sees the farm not as it is, but as it could be. You spend a lot of time in Robin's shop, have strong opinions about where the greenhouse should go, and once rearranged the entire farm at 2am because the layout was bothering you. Your co-op partners sometimes wonder where all the money went — but when the new barn goes up and you put down the pathway and the flowers, they admit it looks amazing.",
    desc_zh:
      '你是建造师——那个不按农场现有的样子，而是按它本来可以成为的样子来看待它的人。你花大量时间在罗宾的商店里，对温室应该放在哪里有强烈意见，也曾因为布局让你不舒服而在凌晨两点重新规划整个农场。你的联机伙伴有时会疑惑钱都去哪了——但当新谷仓建好、你铺上小路和鲜花时，他们会承认确实很美。',
    strength_en: 'Long-term farm vision, infrastructure investment, and making the farm something to be proud of',
    strength_zh: '农场长期愿景、基础设施投资、让农场成为值得自豪的作品',
    blind_spot_en: "Buildings are expensive early — coordinate with your team before spending shared gold",
    blind_spot_zh: '前期建筑很贵——花共享金币之前先和队伍沟通一下',
    tip_en: "Set aside a building fund in a separate chest labeled 'DO NOT TOUCH' — it keeps the peace and the dream alive at the same time.",
    tip_zh: "在一个单独的箱子里存建造基金，贴上「请勿动」的标签——这样既维护了和平，也让梦想得以延续。",
  },
  explorer: {
    title_en: 'The Explorer',
    title_zh: '探险家',
    emoji: '⚔️',
    tag_en: 'Always deeper in the mines',
    tag_zh: '永远在矿洞更深处',
    desc_en:
      "You are The Explorer — the one who disappears into the mines on day one and resurfaces three in-game days later with a bag full of copper, iron, and an inexplicable number of purple mushrooms. You do not always know what season it is or how many days until winter. But you consistently provide the ore pipeline that makes everything else possible — the furnaces, the sprinklers, the kegs. Without you, the farm stalls out. You are the engine room.",
    desc_zh:
      '你是探险家——那个第一天就消失在矿洞里，游戏内三天后才带着满满一包铜矿、铁矿和莫名其妙的大量紫蘑菇重新出现的人。你不一定知道现在是什么季节，或者距离冬天还有多少天。但你持续提供着让其他一切成为可能的矿石流水线——熔炉、洒水器、木桶。没有你，农场会停滞不前。你是引擎室。',
    strength_en: 'Ore supply, combat progression, and bringing back rare items that unlock late-game content',
    strength_zh: '矿石供应、战斗进度、带回解锁后期内容的稀有道具',
    blind_spot_en: "Remember to check the shared calendar occasionally — Winter is coming and you will need crops planted before then",
    blind_spot_zh: '记得偶尔看一眼共享日历——冬天要来了，你需要在那之前种好作物',
    tip_en: "Keep a stack of energy food in your personal inventory at all times. You will forget to check the shared chest and run out of energy in the mines — this has happened before.",
    tip_zh: '在个人背包里随时准备一叠回复体力的食物。你会忘记查共享箱然后在矿洞里体力耗尽——这种事以前发生过。',
  },
  planner: {
    title_en: 'The Planner',
    title_zh: '规划师',
    emoji: '📋',
    tag_en: 'The one with the spreadsheet',
    tag_zh: '那个有表格的人',
    desc_en:
      "You are The Planner — the one who has calculated the exact optimal crop rotation, knows what profit margin the artisan goods path yields versus the tiller profession, and has a shared document with everyone's assigned tasks for the week. You provide something irreplaceable: a coherent strategy. Without you, the farm sprawls in random directions. With you, the team knows exactly where they are going and why. Your co-op partners sometimes push back on the plans — but they follow them anyway, because the plans work.",
    desc_zh:
      '你是规划师——那个计算了精确最优作物轮换方案、知道工匠品路线比耕作者职业收益高多少、还有一份共享文档列出大家本周任务分工的人。你提供了不可替代的东西：一个连贯的策略。没有你，农场会向各种随机方向蔓延。有你，团队清楚地知道自己的目标和原因。你的联机伙伴有时会对计划提出异议——但他们还是会照做，因为计划确实有效。',
    strength_en: 'Optimal resource allocation, season planning, and unlocking late-game content faster than anyone expects',
    strength_zh: '最优资源分配、季节规划、以超出所有人预期的速度解锁后期内容',
    blind_spot_en: "Not everyone plays as efficiently as you — build in some flexibility and let people have fun their way too",
    blind_spot_zh: '不是每个人都像你一样追求效率——留一些弹性，让大家也能按自己的方式享乐',
    tip_en: "Share your plan doc at the start of the session, but make it a living document — the best Stardew runs adapt to what actually happens.",
    tip_zh: '每次游戏开始时分享你的计划文档，但把它当成可更新的活文件——最好的星露谷游戏体验都会根据实际发生的事情灵活调整。',
  },
}

function calcResult(answers: Role[]): Role {
  const counts: Record<Role, number> = { provider: 0, builder: 0, explorer: 0, planner: 0 }
  for (const a of answers) counts[a]++
  return Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0] as Role
}

export function StardewMultiplayerQuiz({ locale }: { locale: string }) {
  const isZh = locale === 'zh'
  const [answers, setAnswers] = useState<(Role | null)[]>(Array(QUESTIONS.length).fill(null))
  const [submitted, setSubmitted] = useState(false)

  const allAnswered = answers.every((a) => a !== null)

  if (submitted) {
    const result = RESULTS[calcResult(answers as Role[])]
    const url = `${BASE_URL}/${locale}/quizzes/stardew-multiplayer`
    const shareText = isZh
      ? `在星露谷联机里我是「${result.title_zh}」！你的队友是哪种类型？一起测测：${url}`
      : `I'm "${result.title_en}" in Stardew Valley co-op! What's your partner type? Find out: ${url}`

    return (
      <div>
        <div className="mb-6 text-center">
          <div className="mb-3 text-6xl">{result.emoji}</div>
          <p className="mb-1 text-xs text-[#4a5a4a]">{isZh ? result.tag_zh : result.tag_en}</p>
          <h2 className="mb-3 text-2xl font-bold text-[#f0a832]">
            {isZh ? result.title_zh : result.title_en}
          </h2>
        </div>

        <p className="mb-6 text-sm leading-relaxed text-[#8a9a7a]">
          {isZh ? result.desc_zh : result.desc_en}
        </p>

        <div className="mb-4 rounded-xl border border-[#2d3d2d] bg-[#0f1a0f] p-4">
          <div className="mb-3">
            <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-[#f0a832]">
              {isZh ? '你的优势' : 'Your strength'}
            </p>
            <p className="text-sm text-[#8a9a7a]">
              {isZh ? result.strength_zh : result.strength_en}
            </p>
          </div>
          <div className="mb-3 border-t border-[#2d3d2d] pt-3">
            <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-[#f0a832]">
              {isZh ? '盲点提醒' : 'Watch out for'}
            </p>
            <p className="text-sm text-[#8a9a7a]">
              {isZh ? result.blind_spot_zh : result.blind_spot_en}
            </p>
          </div>
          <div className="border-t border-[#2d3d2d] pt-3">
            <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-[#f0a832]">
              {isZh ? '给你的联机小贴士' : 'Co-op tip for your type'}
            </p>
            <p className="text-sm text-[#8a9a7a]">{isZh ? result.tip_zh : result.tip_en}</p>
          </div>
        </div>

        <div className="mb-4 rounded-xl border border-[#2d3d2d] bg-[#0f1a0f] p-4">
          <p className="text-center text-sm text-[#8a9a7a]">
            {isZh
              ? 'TendFarm 正在研发农场节律追踪功能——帮你把游戏里的团队协作带入现实。'
              : 'TendFarm is building a farm rhythm tracker — bringing co-op coordination from games into real life.'}
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <ShareButton text={shareText} isZh={isZh} />
          <button
            onClick={() => {
              setAnswers(Array(QUESTIONS.length).fill(null))
              setSubmitted(false)
            }}
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
            ? '在星露谷联机模式里，你是哪种队友？'
            : 'What Kind of Stardew Valley Co-op Partner Are You?'}
        </h1>
        <p className="text-sm text-[#8a9a7a]">
          {isZh
            ? '6 个场景题，测出你是补给官、建造师、探险家还是规划师——发给你的队友对号入座'
            : '6 scenario questions — find your co-op role and tag your partner to compare'}
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
                  onClick={() => {
                    const next = [...answers]
                    next[qi] = opt.type
                    setAnswers(next)
                  }}
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
          allAnswered
            ? 'bg-[#f0a832] text-[#0f1a0f] hover:bg-[#e09822]'
            : 'cursor-not-allowed bg-[#2d3d2d] text-[#4a5a4a]'
        }`}
      >
        {isZh ? '查看我的联机角色' : 'Find My Co-op Role'}
      </button>
    </div>
  )
}
