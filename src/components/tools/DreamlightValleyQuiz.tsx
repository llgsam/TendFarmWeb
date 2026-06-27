'use client'

import { useState } from 'react'
import { BASE_URL } from '@/lib/config'

type Character = 'moana' | 'wall-e' | 'elsa' | 'goofy'

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
  options: Array<{ en: string; zh: string; type: Character }>
}> = [
  {
    q_en: 'How do you usually spend your time in a cozy life sim?',
    q_zh: '在 Cozy 生活游戏里，你通常怎么打发时间？',
    options: [
      { en: "Exploring every corner — I need to see what's beyond the next area", zh: '探索每一个角落——我需要看看下一个区域有什么', type: 'moana' },
      { en: "Collecting and organizing — my storage chest is perfectly sorted", zh: '收集和整理——我的收纳箱整理得井井有条', type: 'wall-e' },
      { en: "Working on one beautiful long-term project at my own pace", zh: '按自己的节奏做一个漂亮的长期项目', type: 'elsa' },
      { en: "Chatting with every character and helping with their quests", zh: '和每个角色聊天、帮他们完成任务', type: 'goofy' },
    ],
  },
  {
    q_en: 'Your friends would most likely describe you as:',
    q_zh: '你的朋友最可能用哪个词描述你？',
    options: [
      { en: 'Determined — once you set a goal, nothing stops you', zh: '坚定——一旦设定目标，没有什么能阻止你', type: 'moana' },
      { en: 'Observant — you notice details that everyone else misses', zh: '细心——你能注意到其他人都忽略的细节', type: 'wall-e' },
      { en: 'Independent — you recharge alone and work best with space', zh: '独立——你独处时恢复精力，有空间时状态最好', type: 'elsa' },
      { en: 'Warm — you make everyone around you feel welcome instantly', zh: '温暖——你能让身边的每个人立刻感到受欢迎', type: 'goofy' },
    ],
  },
  {
    q_en: "What do you find most satisfying in a game?",
    q_zh: '游戏里什么样的体验最让你满足？',
    options: [
      { en: 'Unlocking a new area or reaching a place I have never been', zh: '解锁新区域或到达一个从未去过的地方', type: 'moana' },
      { en: 'Completing a collection or finishing a set of items', zh: '完成一个收藏或补齐一套道具', type: 'wall-e' },
      { en: 'Creating something visually stunning — a build or design I am proud of', zh: '创造出让我自豪的视觉作品——建筑或设计', type: 'elsa' },
      { en: 'Reaching max friendship with a character and reading their final story', zh: '和角色达到最高好感度，读完他们的最终故事', type: 'goofy' },
    ],
  },
  {
    q_en: 'When you face a challenge or obstacle, your instinct is to:',
    q_zh: '面对挑战或障碍时，你的第一反应是？',
    options: [
      { en: 'Push through — obstacles are just part of the journey', zh: '迎头而上——障碍只是旅途的一部分', type: 'moana' },
      { en: 'Patiently gather everything you need before moving forward', zh: '耐心收集所有需要的东西，再继续前进', type: 'wall-e' },
      { en: 'Step back, think it through alone, then solve it your own way', zh: '退一步，独自思考，然后用自己的方式解决', type: 'elsa' },
      { en: 'Ask for help or team up — two heads are better than one', zh: '寻求帮助或合作——三个臭皮匠胜过诸葛亮', type: 'goofy' },
    ],
  },
  {
    q_en: 'Your ideal morning in Dreamlight Valley starts with:',
    q_zh: '你在 Dreamlight Valley 里理想的早晨从什么开始？',
    options: [
      { en: 'Immediately heading out to explore — there is always somewhere new to discover', zh: '马上出门探索——总有新地方可以发现', type: 'moana' },
      { en: 'Checking what resources have respawned overnight and gathering them methodically', zh: '查看昨晚刷新的资源，有条不紊地收集它们', type: 'wall-e' },
      { en: 'Tending your garden and working on your ongoing passion project', zh: '照料花园，继续我正在进行的长期项目', type: 'elsa' },
      { en: 'Visiting every character to wish them good morning and see what they need', zh: '拜访每位角色，向他们道声早安，看看他们需要什么', type: 'goofy' },
    ],
  },
  {
    q_en: 'Which quality matters most to you in the people around you?',
    q_zh: '你最看重身边人的哪种品质？',
    options: [
      { en: 'Courage — people who face hard things without backing down', zh: '勇气——面对困难时不退缩的人', type: 'moana' },
      { en: 'Loyalty — people who quietly show up for you, every time', zh: '忠诚——每次都默默守护你的人', type: 'wall-e' },
      { en: 'Depth — people who have their own rich inner world', zh: '深度——有自己丰富内心世界的人', type: 'elsa' },
      { en: 'Kindness — people who treat everyone with genuine warmth', zh: '善良——真心对待每个人的人', type: 'goofy' },
    ],
  },
]

const RESULTS: Record<
  Character,
  {
    name_en: string
    name_zh: string
    emoji: string
    origin_en: string
    origin_zh: string
    trait_en: string
    trait_zh: string
    desc_en: string
    desc_zh: string
    tip_en: string
    tip_zh: string
  }
> = {
  moana: {
    name_en: 'Moana',
    name_zh: '莫阿娜',
    emoji: '🌊',
    origin_en: 'Moana (2016)',
    origin_zh: '《海洋奇缘》（2016）',
    trait_en: 'The Fearless Wayfinder',
    trait_zh: '无畏的航海者',
    desc_en:
      "You are Moana — the one who hears the call of the horizon and answers it without hesitation. In Dreamlight Valley and in life, you are driven by a need to discover, to go further, to understand what lies beyond the edge of what you already know. You are not reckless — you are brave with purpose. When things get hard, you keep moving. When others doubt, you stay the course. Your greatest strength is that you know who you are, even when the world tries to convince you otherwise.",
    desc_zh:
      '你是莫阿娜——那个听到地平线的召唤就毫不犹豫回应的人。在 Dreamlight Valley 和现实生活中，你都被一种探索的渴望驱动——去更远的地方，去理解已知边界之外的东西。你不是莽撞，而是有目的的勇敢。当事情变难，你继续前行；当他人质疑，你坚守初心。你最大的力量是：即使世界试图说服你，你也清楚自己是谁。',
    tip_en: "In Dreamlight Valley, prioritize unlocking the Forgotten Lands and Sunlit Plateau early — Moana's questline opens up some of the game's most visually stunning content.",
    tip_zh: '在 Dreamlight Valley 里，优先解锁「遗忘之地」和「晴光高原」——莫阿娜的故事线会开启游戏中视觉上最震撼的内容。',
  },
  'wall-e': {
    name_en: 'WALL-E',
    name_zh: 'WALL-E',
    emoji: '🤖',
    origin_en: 'WALL-E (2008)',
    origin_zh: '《机器人总动员》（2008）',
    trait_en: 'The Patient Collector',
    trait_zh: '耐心的收藏者',
    desc_en:
      "You are WALL-E — patient, observant, and deeply appreciative of small things others overlook. You find meaning in the act of collecting, sorting, and preserving. In Dreamlight Valley, you probably have organized storage rooms, complete collections, and a farm that is perfectly planted in neat rows. You are not flashy about it — you just quietly do the work, find the joy in the process, and notice the beauty in things that other people walk right past.",
    desc_zh:
      '你是 WALL-E——耐心、细心，深深欣赏那些被别人忽视的小事。你在收集、整理和保存的过程中找到意义。在 Dreamlight Valley 里，你可能有整洁的仓库、完整的收藏，以及一片整整齐齐种植的农场。你不炫耀——你只是默默做着工作，在过程中找到乐趣，注意到别人径直走过的美好。',
    tip_en: "WALL-E's questline in Dreamlight Valley involves collecting and sorting — right in your wheelhouse. Max his friendship early to unlock his story and the unique items he shares.",
    tip_zh: 'WALL-E 在 Dreamlight Valley 里的故事线涉及收集和整理——正是你的强项。尽早提升与他的好感度，解锁他的故事和他会分享的独特道具。',
  },
  elsa: {
    name_en: 'Elsa',
    name_zh: '艾莎',
    emoji: '❄️',
    origin_en: 'Frozen (2013)',
    origin_zh: '《冰雪奇缘》（2013）',
    trait_en: 'The Creative Loner',
    trait_zh: '创造型独行者',
    desc_en:
      "You are Elsa — powerful, creative, and most fully yourself when you have the space to work without interruption. You have a vision for how things should look or feel, and you pursue it with quiet intensity. Social energy drains you; solitude restores you. This does not make you cold — it means you bring your full self to the people and projects that matter to you. In Dreamlight Valley, your home plot is probably a work of art that reflects a very specific, deeply personal aesthetic.",
    desc_zh:
      '你是艾莎——强大、富有创造力，当有空间不受打扰地工作时你最充分地展现自我。你对事物应该呈现的样子有自己的愿景，并以安静的专注追求它。社交活动消耗你的精力，独处让你恢复。这不代表你冷漠——它意味着你把完整的自我带给对你重要的人和项目。在 Dreamlight Valley 里，你的家园地块可能是一件艺术品，反映着非常具体、深刻个人化的美学。',
    tip_en: "Elsa's questline involves building and creative expression. Invest in your Valley's aesthetics — furniture and biome decoration give you Dreamlight that accelerates the whole game.",
    tip_zh: '艾莎的故事线涉及建造和创意表达。投入精力美化你的 Valley——家具和生态区装饰会给你 Dreamlight，加速整个游戏进程。',
  },
  goofy: {
    name_en: 'Goofy',
    name_zh: '高飞',
    emoji: '⭐',
    origin_en: 'Disney Classic',
    origin_zh: '迪士尼经典角色',
    trait_en: 'The Community Heart',
    trait_zh: '社区的心脏',
    desc_en:
      "You are Goofy — warm, genuine, endlessly enthusiastic, and the kind of person who makes everyone feel like they belong. You show up for the people around you without being asked. You find delight in simple things. You laugh at yourself. You make mistakes with good humor and keep going. In Dreamlight Valley, you have probably maxed out friendships with every character because you talked to them every single day without fail — not for the rewards, but because you actually like them.",
    desc_zh:
      '你是高飞——温暖、真诚、热情无限，让每个人都感到自己属于这里。你不需要被要求就会为身边的人出现。你在简单的事情中找到喜悦。你能对自己的错误一笑而过，继续前行。在 Dreamlight Valley 里，你可能已经和每一个角色都建立了最高好感度——因为你每天都不间断地和他们交谈，不是为了奖励，而是因为你真心喜欢他们。',
    tip_en: "Goofy runs the in-game store in Dreamlight Valley — befriend him quickly. His stall sells key crafting materials and upgrades over time, making early friendship one of the best economic investments in the game.",
    tip_zh: '高飞在 Dreamlight Valley 里经营游戏内商店——尽快和他建立好感。他的摊位出售关键制作材料，并会随时间升级，让早期与他建立友谊成为游戏里最佳的经济投资之一。',
  },
}

function calcResult(answers: Character[]): Character {
  const counts: Record<Character, number> = { moana: 0, 'wall-e': 0, elsa: 0, goofy: 0 }
  for (const a of answers) counts[a]++
  return Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0] as Character
}

export function DreamlightValleyQuiz({ locale }: { locale: string }) {
  const isZh = locale === 'zh'
  const [answers, setAnswers] = useState<(Character | null)[]>(Array(QUESTIONS.length).fill(null))
  const [submitted, setSubmitted] = useState(false)

  const allAnswered = answers.every((a) => a !== null)

  if (submitted) {
    const result = RESULTS[calcResult(answers as Character[])]
    const url = `${BASE_URL}/${locale}/quizzes/dreamlight-valley-quiz`
    const shareText = isZh
      ? `我在 Disney Dreamlight Valley 里最像「${result.name_zh}」！来测测你是哪位 Disney 角色：${url}`
      : `I got ${result.name_en} in the Disney Dreamlight Valley Character Quiz! Find out which character you are: ${url}`

    return (
      <div>
        <div className="mb-6 text-center">
          <div className="mb-3 text-6xl">{result.emoji}</div>
          <p className="mb-1 text-xs text-[#4a5a4a]">
            {isZh ? result.origin_zh : result.origin_en}
          </p>
          <h2 className="mb-1 text-2xl font-bold text-[#f0a832]">
            {isZh ? result.name_zh : result.name_en}
          </h2>
          <p className="text-sm font-medium text-[#8a9a7a]">
            {isZh ? result.trait_zh : result.trait_en}
          </p>
        </div>

        <p className="mb-6 text-sm leading-relaxed text-[#8a9a7a]">
          {isZh ? result.desc_zh : result.desc_en}
        </p>

        <div className="mb-6 rounded-xl border border-[#2d3d2d] bg-[#0f1a0f] p-4">
          <h3 className="mb-2 text-sm font-semibold text-[#e8dcc8]">
            {isZh ? `游戏提示：关于 ${result.name_zh}` : `In-game tip: About ${result.name_en}`}
          </h3>
          <p className="text-sm leading-relaxed text-[#8a9a7a]">
            {isZh ? result.tip_zh : result.tip_en}
          </p>
        </div>

        <div className="mb-4 rounded-xl border border-[#2d3d2d] bg-[#0f1a0f] p-4">
          <p className="text-center text-sm text-[#8a9a7a]">
            {isZh
              ? 'TendFarm 正在研发农场节律追踪功能——帮你把游戏里的慢生活节奏带入现实。'
              : 'TendFarm is building a farm rhythm tracker — bringing the slow-living pace from games into real life.'}
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
            ? '你是哪位 Disney Dreamlight Valley 角色？'
            : 'Which Disney Dreamlight Valley Character Are You?'}
        </h1>
        <p className="text-sm text-[#8a9a7a]">
          {isZh
            ? '6 个问题，测出你最像莫阿娜、WALL-E、艾莎还是高飞'
            : '6 questions to find your Disney Dreamlight Valley character match'}
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
        {isZh ? '查看我的角色' : 'Find My Character'}
      </button>
    </div>
  )
}
