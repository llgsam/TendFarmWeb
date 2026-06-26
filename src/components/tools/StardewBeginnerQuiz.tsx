'use client'

import { useState } from 'react'
import { BASE_URL } from '@/lib/config'

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

type Tier = 'seedling' | 'sprout' | 'harvest' | 'veteran'

const QUESTIONS = [
  {
    q_en: "It's Day 1 of your Stardew Valley farm. What's your first move?",
    q_zh: '星露谷第一天，你的第一步是什么？',
    options: [
      { en: 'Chat with everyone in Pelican Town to make friends', zh: '去和鹈鹕镇每个人打招呼交朋友', score: 0 },
      { en: 'Plant the starting seeds and explore the farm a little', zh: '种下初始种子，在农场随便逛逛', score: 1 },
      { en: "Rush to Pierre's before 5pm to buy more parsnip seeds", zh: '赶在下午 5 点前冲到皮埃尔商店买更多防风草种子', score: 2 },
      { en: 'Clear the entire farm, watch the TV for tips, and maximize planting area', zh: '清空整片农场，看电视获取提示，最大化种植面积', score: 3 },
    ],
  },
  {
    q_en: 'A rainy day arrives. What do you do?',
    q_zh: '下雨天来了，你怎么安排？',
    options: [
      { en: 'Sleep in — a day off from watering!', zh: '睡觉——终于不用浇水的假期！', score: 0 },
      { en: 'Fish or explore the town since crops water themselves', zh: '钓钓鱼或逛逛镇子，反正作物自己会喝水', score: 1 },
      { en: 'Head straight to the mines with a full backpack', zh: '背包装满补给，直冲矿洞', score: 2 },
      { en: 'Upgrade my watering can — this is the perfect no-miss window', zh: '升级水壶——不耽误浇水的最佳时机就是雨天', score: 3 },
    ],
  },
  {
    q_en: 'What do you know about the Egg Festival?',
    q_zh: '关于鸡蛋节你了解多少？',
    options: [
      { en: "It's a fun spring event — I enjoy the egg hunt", zh: '春天的节日，捡蛋游戏挺好玩的', score: 0 },
      { en: "I buy a few strawberry seeds if I have spare cash", zh: '如果有多余钱会顺手买几颗草莓种子', score: 1 },
      { en: "I save gold all of spring specifically to buy maximum strawberry seeds", zh: '整个春天专门存金币，就为了节日当天买最多草莓种子', score: 2 },
      { en: "I know the exact time to enter Pelican Town to guarantee a full buy before the festival starts", zh: '我知道进鹈鹕镇的精确时间点，确保在节日开始前完成最优购买', score: 3 },
    ],
  },
  {
    q_en: "What does 'Iridium' mean to you in Stardew Valley?",
    q_zh: '星露谷里的「铱矿」对你来说意味着什么？',
    options: [
      { en: "I've heard the word but haven't found any yet", zh: '听说过但还没找到', score: 0 },
      { en: "It's a valuable ore from deep in the mines", zh: '矿洞深处才能找到的珍贵矿石', score: 1 },
      { en: "The best tool upgrade material — worth farming Skull Cavern for", zh: '最佳工具升级材料——值得专门在骷髅洞刷矿', score: 2 },
      { en: "My entire farm layout is designed around iridium sprinkler coverage patterns", zh: '我的农场布局完全围绕铱矿洒水机的最优覆盖范围来设计', score: 3 },
    ],
  },
  {
    q_en: 'How do you approach the Community Center bundles?',
    q_zh: '你怎么处理社区中心的捆包任务？',
    options: [
      { en: "I usually forget about them until year 3 or later", zh: '经常到第三年才想起来还有这个', score: 0 },
      { en: "I complete them gradually with no specific plan", zh: '慢慢来，没有特定计划，完成了就完成了', score: 1 },
      { en: "I plan my crops and activities around completing them by year 2", zh: '我把作物和活动计划围绕第二年内完成来安排', score: 2 },
      { en: "I aim to finish the Community Center by fall of year 1", zh: '目标是在第一年秋天之前完成社区中心', score: 3 },
    ],
  },
  {
    q_en: 'Which statement best describes you in the mines?',
    q_zh: '下面哪句话最能描述你在矿洞里的状态？',
    options: [
      { en: "I avoid the mines — they feel scary and confusing", zh: '能不去就不去——感觉危险又容易迷路', score: 0 },
      { en: "I go when I need specific resources like copper or iron", zh: '需要铜矿或铁矿的时候才去', score: 1 },
      { en: "I push as deep as possible and use staircases when stuck", zh: '尽量往深处冲，卡关了就用楼梯跳层', score: 2 },
      { en: "I know floor patterns and prepare optimized kits for each mine zone", zh: '我了解楼层规律，针对每个区域准备最优化的装备包', score: 3 },
    ],
  },
]

const RESULTS: Record<
  Tier,
  {
    name_en: string
    name_zh: string
    emoji: string
    desc_en: string
    desc_zh: string
    tips_en: string[]
    tips_zh: string[]
  }
> = {
  seedling: {
    name_en: 'Seedling',
    name_zh: '嫩苗新手',
    emoji: '🌱',
    desc_en:
      "You're at the very beginning of your Stardew Valley journey — and that's honestly the best place to be. Every discovery feels like pure magic right now. The mines are full of mysteries, every villager has a secret, and the first strawberry you grow yourself will feel like a genuine achievement.",
    desc_zh:
      '你刚刚踏上星露谷之旅——这其实是最美好的起点。每一个发现都是纯粹的惊喜。矿洞里充满谜题，每位村民都藏着秘密，当你亲手种出第一颗草莓时，那种成就感是真实而珍贵的。',
    tips_en: [
      "Watch the TV every morning — Lucky Day and the Queen of Sauce cooking show are both genuinely useful",
      "Reach floor 40 in the mines before summer — you'll need copper tools",
      "At the Egg Festival on Spring 13, buy strawberry seeds — they're the best spring crop by far",
    ],
    tips_zh: [
      '每天早上看电视——幸运播报和料理节目都真的很有用',
      '在夏天之前挖到矿洞第 40 层——你需要铜质工具升级',
      '春天第 13 天鸡蛋节，一定要买草莓种子——它是春天性价比最高的作物',
    ],
  },
  sprout: {
    name_en: 'Sprout',
    name_zh: '成长萌芽',
    emoji: '🌿',
    desc_en:
      "You know the basics and you're building real momentum. You probably have a favorite villager you're working on, crops growing in decent rows, and a mine run or two under your belt. The deeper layers of Stardew Valley — the lore, the artisan economy, the mine depth — are starting to open up for you.",
    desc_zh:
      '你已经掌握了基础，正在积累真正的游戏节奏。你可能已经有了想攻略的目标村民，作物种得井井有条，矿洞也下过几次了。星露谷更深的层次——世界观、手工艺品经济、矿洞深度——正准备向你敞开。',
    tips_en: [
      "Unlock the greenhouse by completing the pantry bundles — it's a game-changer for late income",
      "Buy a Crystalarium and fill it with diamonds for passive daily gold",
      "Save iridium ore for sprinklers — they'll free up your entire morning routine",
    ],
    tips_zh: [
      '完成储藏室捆包来解锁温室——这会彻底改变后期收入节奏',
      '买培育机放进钻石，实现每天被动收入',
      '铱矿优先用来做洒水机——每天早上你会感谢自己',
    ],
  },
  harvest: {
    name_en: 'Harvest Ready',
    name_zh: '丰收达人',
    emoji: '🌾',
    desc_en:
      "You're past the learning curve and running an efficient, intentional farm. You think in seasons, plan your crops strategically, and know which villagers to gift and when. New players watching you would genuinely learn something useful — you have the instincts down.",
    desc_zh:
      '你已经过了学习曲线，正在运营一个高效且有规划的农场。你用季节思考问题，战略性地安排作物，清楚在什么时机给哪位村民送礼。新玩家看你游戏真的能学到东西——你已经建立起了农场直觉。',
    tips_en: [
      "Ancient Fruit in greenhouse + wine kegs = the best gold-per-day strategy in the game",
      "Skull Cavern on lucky days with lots of staircases = fastest iridium route",
      "Try completing the Community Center in year 1 fall — it's a satisfying milestone to chase",
    ],
    tips_zh: [
      '温室里种古代水果 + 酒桶酿酒 = 游戏中单日最高金币策略',
      '幸运日在骷髅洞配合大量楼梯 = 最快的铱矿获取路线',
      '尝试在第一年秋天内完成社区中心——这是一个非常有成就感的里程碑目标',
    ],
  },
  veteran: {
    name_en: 'Master Farmer',
    name_zh: '农场大师',
    emoji: '🏆',
    desc_en:
      "You've seen it all. You've optimized the sprinkler grid, finished all bundles before fall year 1, and have strong opinions about every farm type. You've probably explained the quarry tile spawn mechanic to at least two confused friends. You are Stardew Valley.",
    desc_zh:
      '你什么都见过了。你优化过洒水机格局，在第一年秋天前完成了所有捆包，对每种农场类型都有自己的坚定看法。你可能已经至少给两位困惑的朋友解释过采石场格子的刷新机制了。你就是星露谷本体。',
    tips_en: [
      "Try a Beach Farm challenge run — no fertilizer makes the ancient fruit wine build a real puzzle",
      "Chase Perfection (100% completion) on a new save — it's the true endgame",
      "Try Stardew Valley Expanded mod — dozens of new characters, events, and a huge new map area",
    ],
    tips_zh: [
      '尝试海滩农场挑战档——无化肥限制让古代水果酒路线变成真正的谜题',
      '在新存档挑战「完美度」（100% 完成度）——这才是真正的终局内容',
      '试试星露谷扩展 Mod——数十个新角色、新事件和巨大的新地图区域',
    ],
  },
}

function calcTier(answers: (number | null)[]): Tier {
  const total = answers.reduce<number>((sum, oi, qi) => {
    if (oi === null) return sum
    return sum + QUESTIONS[qi].options[oi].score
  }, 0)
  if (total <= 5) return 'seedling'
  if (total <= 10) return 'sprout'
  if (total <= 14) return 'harvest'
  return 'veteran'
}

export function StardewBeginnerQuiz({ locale }: { locale: string }) {
  const isZh = locale === 'zh'
  const [answers, setAnswers] = useState<(number | null)[]>(Array(QUESTIONS.length).fill(null))
  const [submitted, setSubmitted] = useState(false)

  const allAnswered = answers.every((a) => a !== null)

  if (submitted) {
    const tier = calcTier(answers)
    const result = RESULTS[tier]
    const url = `${BASE_URL}/${locale}/quizzes/stardew-beginner`
    const shareText = isZh
      ? `我的星露谷段位是「${result.name_zh}」！快来测测你是哪个等级的农夫：${url}`
      : `I'm a Stardew Valley "${result.name_en}"! Find your farmer level: ${url}`

    return (
      <div>
        <div className="mb-6 text-center">
          <div className="mb-3 text-6xl">{result.emoji}</div>
          <h2 className="mb-2 text-2xl font-bold text-[#f0a832]">
            {isZh ? result.name_zh : result.name_en}
          </h2>
          <p className="text-sm leading-relaxed text-[#8a9a7a]">
            {isZh ? result.desc_zh : result.desc_en}
          </p>
        </div>

        <div className="mb-6 rounded-xl border border-[#2d3d2d] bg-[#0f1a0f] p-4">
          <h3 className="mb-3 text-sm font-semibold text-[#e8dcc8]">
            {isZh ? '适合你段位的建议' : 'Tips for your level'}
          </h3>
          <ul className="space-y-2">
            {(isZh ? result.tips_zh : result.tips_en).map((tip, i) => (
              <li key={i} className="flex gap-2 text-sm text-[#8a9a7a]">
                <span className="shrink-0 text-[#f0a832]">→</span>
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mb-4 rounded-xl border border-[#2d3d2d] bg-[#0f1a0f] p-4">
          <p className="text-center text-sm text-[#8a9a7a]">
            {isZh
              ? 'TendFarm 正在研发农场节律追踪功能——帮你把星露谷的节奏感带入真实生活。'
              : 'TendFarm is building a farm rhythm tracker — bringing Stardew-style seasonal thinking into real life.'}
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
          {isZh ? '你是星露谷新手还是老鸟？' : 'Stardew Valley: Beginner or Pro?'}
        </h1>
        <p className="text-sm text-[#8a9a7a]">
          {isZh ? '6 个问题，测出你的农夫段位' : '6 questions to find your farmer level'}
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
                    next[qi] = oi
                    setAnswers(next)
                  }}
                  className={`w-full rounded-xl border px-4 py-3 text-left text-sm transition-colors ${
                    answers[qi] === oi
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
        {isZh ? '查看结果' : 'See My Result'}
      </button>
    </div>
  )
}
