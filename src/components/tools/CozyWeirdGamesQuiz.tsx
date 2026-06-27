'use client'

import { useState } from 'react'
import { BASE_URL } from '@/lib/config'

type Pick = 'duck' | 'donut' | 'mailtime' | 'loddlenaut'

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
    q_en: 'What is your ideal way to do absolutely nothing?',
    q_zh: '你理想中"什么都不做"的方式是什么？',
    options: [
      { en: 'Watching water — a river, a lake, rain on a window. Moving water calms my mind completely', zh: '看水——河流、湖泊、窗上的雨。流动的水能完全让我平静', type: 'duck' },
      { en: 'Doing something mildly silly that amuses only me — low stakes, high absurdity', zh: '做一些轻微荒唐只有我自己觉得好笑的事情——低风险、高荒诞', type: 'donut' },
      { en: 'A gentle walk through somewhere I have never been, noticing small things', zh: '在一个我从未去过的地方轻柔漫步，留意细节', type: 'mailtime' },
      { en: 'Tending something — a plant, a pet, anything that needs quiet regular care', zh: '照料某样东西——植物、宠物、任何需要安静定期照顾的东西', type: 'loddlenaut' },
    ],
  },
  {
    q_en: 'How do you feel about game objectives?',
    q_zh: '你如何看待游戏中的目标？',
    options: [
      { en: 'I prefer zero objectives — existing inside a calm space is the entire point', zh: '我更喜欢零目标——在平静空间中存在就是全部意义', type: 'duck' },
      { en: 'Light, funny objectives that let me cause chaos in the most satisfying way possible', zh: '轻松有趣的目标，让我以最令人满足的方式制造混乱', type: 'donut' },
      { en: 'Gentle direction — deliver this, explore there, meet this person — no time pressure', zh: '温和的方向指引——送达这个、探索那里、见见这个人——没有时间压力', type: 'mailtime' },
      { en: 'Meaningful environmental goals — clean this up, raise this creature, restore what was harmed', zh: '有意义的环境目标——清理这里、养育这个生物、修复被破坏的东西', type: 'loddlenaut' },
    ],
  },
  {
    q_en: 'What feeling do you most want a game to create?',
    q_zh: '你最希望游戏带给你什么感受？',
    options: [
      { en: 'Thoughtless peace — the specific calm of watching something float, with no demands on my attention', zh: '无思之宁——看着某样东西漂浮的那种特定平静，对我的注意力没有任何要求', type: 'duck' },
      { en: 'Lightly giddy — the satisfaction of silliness done well, without any real consequences', zh: '轻微的晕眩感——出色完成荒唐事的满足感，没有任何真实后果', type: 'donut' },
      { en: 'Warm curiosity — wondering what is around the next corner and always finding something worth noticing', zh: '温暖的好奇心——想知道下一个转角是什么，总能发现值得注意的东西', type: 'mailtime' },
      { en: 'Quiet purpose — the feeling of being needed by something small that depends on you', zh: '平静的使命感——被依赖着的感觉，某样小东西需要你', type: 'loddlenaut' },
    ],
  },
  {
    q_en: 'How long is your ideal play session?',
    q_zh: '你理想的游戏时长是多少？',
    options: [
      { en: 'Five to fifteen minutes — I want to open it, feel immediately calm, and close it satisfied', zh: '五到十五分钟——我想打开它，立刻感到平静，然后满足地关闭它', type: 'duck' },
      { en: 'Two or three hours start-to-finish — a complete funny little story with a beginning and end', zh: '从头到尾两三个小时——一个有开头和结尾的完整有趣小故事', type: 'donut' },
      { en: 'A few cozy hours of exploration — finding the whole world and meeting everyone in it', zh: '几个舒适的探索时光——发现整个世界并见到其中的每个人', type: 'mailtime' },
      { en: 'Regular check-in sessions over several days — coming back to see how my creatures are doing', zh: '几天内定期的回访——回来看看我的生物们状况如何', type: 'loddlenaut' },
    ],
  },
  {
    q_en: 'What is your relationship with humor in games?',
    q_zh: '你与游戏幽默感的关系是什么？',
    options: [
      { en: 'I prefer aesthetic and calm over humor — I want to feel peaceful, not amused', zh: '我更喜欢美感和平静而不是幽默——我想感到平静，而不是被逗乐', type: 'duck' },
      { en: 'Humor is the point — I want to genuinely laugh at the situations I create', zh: '幽默才是重点——我想真正为自己创造的情境而大笑', type: 'donut' },
      { en: 'Gentle warmth through the characters — humor that comes from personality, not jokes', zh: '通过角色传递的温暖——来自个性而非笑话的幽默', type: 'mailtime' },
      { en: 'Light charm through strange creature behavior — I find the bizarre biology quietly funny', zh: '通过奇怪的生物行为带来的轻微魅力——我觉得奇异的生物学有一种安静的趣味', type: 'loddlenaut' },
    ],
  },
  {
    q_en: 'How would you describe this game to someone who has never heard of it?',
    q_zh: '你会怎么向从未听说过它的人描述这款游戏？',
    options: [
      { en: '"Just turn it on, watch rubber ducks float around, and feel weirdly calm. I cannot explain why it works but it does."', zh: '「打开它，看着橡皮鸭漂浮，然后奇怪地感到平静。我无法解释为什么有效，但就是有效。」', type: 'duck' },
      { en: '"You are a hole in the ground. You eat an entire town. It is completely perfect."', zh: '「你是地上的一个洞。你吃掉了整个小镇。这完全是完美的。」', type: 'donut' },
      { en: '"I am a tiny little creature delivering mail through a cozy mushroom forest and I love every resident I have met."', zh: '「我是一只在舒适蘑菇森林中送信的小小生物，我爱我遇到的每一位居民。」', type: 'mailtime' },
      { en: '"I am cleaning up alien ocean pollution and raising alien sea creatures and somehow it is the most calming thing I have played."', zh: '「我在清理外星海洋污染，养育外星海洋生物，不知为何这是我玩过的最令人平静的东西。」', type: 'loddlenaut' },
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
  duck: {
    title_en: 'Placid Plastic Duck Simulator',
    title_zh: '安静橡皮鸭模拟器',
    emoji: '🦆',
    tag_en: 'Watch rubber ducks float in peaceful real-world-inspired scenes with ambient sound — no objectives, no interaction required, pure ambient calm',
    tag_zh: '观看橡皮鸭在和平的现实世界灵感场景中漂浮，伴随环境音效——没有目标、不需要互动、纯粹的环境平静',
    platform_en: 'Available on: PC (Steam), Nintendo Switch, iOS, Android — about $5-8',
    platform_zh: '可在以下平台获取：PC（Steam）、Nintendo Switch、iOS、Android——约 5-8 美元',
    why_en:
      "Placid Plastic Duck Simulator (2023) is one of the most unusual games on Steam — and also one of the most purely relaxing. The entire game is watching rubber ducks float across beautifully rendered environments: a mountain hot spring, a swimming pool, a jungle waterfall, a Japanese bathhouse, a rooftop pool at golden hour. There is no minigame. There is no failure state. There are no NPCs to manage. You can interact lightly by clicking to add more ducks, but the game functions just as well as a screen saver you occasionally glance at. The sound design is the real craft here: each scene has layered ambient audio — water movement, birds, distant wind, occasional rubber duck squeaks — that makes it a genuinely effective relaxation tool. It went viral after being discovered by streamers, has over 90% positive reviews on Steam, and costs about $5. Available on mobile for free with limited scenes. One of the very few games that can be genuinely recommended to people who say they do not like games.",
    why_zh:
      'Placid Plastic Duck Simulator（2023 年）是 Steam 上最不寻常的游戏之一——也是最纯粹放松的游戏之一。整个游戏就是观看橡皮鸭漂浮在精美渲染的环境中：山地温泉、游泳池、丛林瀑布、日式澡堂、黄金时刻的屋顶泳池。没有小游戏，没有失败状态，没有需要管理的 NPC。你可以通过点击轻松互动来添加更多鸭子，但游戏作为屏保偶尔瞥一眼也同样有效。音效设计是真正的工艺所在：每个场景都有分层的环境音频——水声运动、鸟鸣、远处的风、偶尔的橡皮鸭吱吱声——使其成为真正有效的放松工具。在被主播发现后成为病毒式传播，Steam 上超过 90% 的好评，售价约 5 美元。移动端有限场景免费提供。是极少数可以真正推荐给说自己不喜欢游戏的人的游戏之一。',
    tip_en: "Try playing it as a second monitor presence during work or reading — the ambient sound of ducks floating and gentle water is better than most dedicated white noise apps. The Steam version has significantly more scenes and better audio than the mobile version.",
    tip_zh: '尝试在工作或阅读时将其作为第二屏幕背景使用——鸭子漂浮和温和水声的环境音比大多数专用白噪音应用都要好。Steam 版本比手机版本有更多场景和更好的音频。',
  },
  donut: {
    title_en: 'Donut County',
    title_zh: '甜甜圈县城',
    emoji: '🍩',
    tag_en: 'You are a hole in the ground — swallow an entire town object by object, growing larger with each thing you consume, until everything is gone',
    tag_zh: '你是地上的一个洞——一件一件地吞噬整个小镇，随着你吞噬的每样东西不断变大，直到一切都消失',
    platform_en: 'Available on: PC (Steam, GOG), Nintendo Switch, PS4, iOS, Android — about $8',
    platform_zh: '可在以下平台获取：PC（Steam、GOG）、Nintendo Switch、PS4、iOS、Android——约 8 美元',
    why_en:
      "Donut County (2018) has one of the most perfectly simple concepts in indie gaming: you control a hole in the ground that gets bigger every time it swallows something. You start by swallowing small objects — rocks, cacti, garden gnomes — and gradually grow until you can swallow entire buildings, vehicles, and eventually landmarks. The game follows BK, a raccoon who controls the hole via an app, and his friend Mira who is trying to stop him from destroying the entire county. The writing is funny in a dry, specific way — texts between BK and Mira, raccoon logic applied to real situations, absurdist environmental storytelling. At 2-3 hours, it is a perfect complete short game: funny from beginning to end, mechanically satisfying in a primal way (everything gets eaten eventually), and with a story that lands better than you expect. One of the finest examples of a game where the core mechanic is the entire joke and the joke never gets old.",
    why_zh:
      '甜甜圈县城（2018 年）在独立游戏中拥有最完美简单的概念之一：你控制地上一个每次吞噬东西就变大的洞。你从吞噬小物体开始——岩石、仙人掌、花园地精——然后逐渐长大，直到你能吞噬整栋建筑、车辆，最终是地标。游戏讲述 BK，一只通过应用程序控制洞的浣熊，以及他试图阻止他破坏整个县城的朋友 Mira 的故事。文字以一种干燥、具体的方式幽默——BK 和 Mira 之间的短信、浣熊逻辑应用于现实情况、荒诞主义的环境叙事。2-3 小时，这是一款完美的完整短游戏：从头到尾都有趣，以一种原始的方式机制令人满足（最终一切都被吃掉），故事的落点比你预期的要好。这是最好的例子之一，证明核心机制就是整个笑话，而这个笑话永远不会过时。',
    tip_en: "Swallow things in the most satisfying order — resist the urge to swallow everything immediately. There is a specific joy in letting objects interact with each other before they go in: knock a beehive into the hole and watch what happens, or let a fireworks stand go in whole.",
    tip_zh: '以最令人满足的顺序吞噬东西——抵制立刻吞噬一切的冲动。在物体进入之前让它们相互作用有一种特殊的乐趣：把蜂箱推进洞里看看会发生什么，或者让烟花摊整个进去。',
  },
  mailtime: {
    title_en: 'Mail Time',
    title_zh: 'Mail Time',
    emoji: '✉️',
    tag_en: 'Play as a tiny mail carrier exploring a cozy forest village — glide through mushroom trees, deliver letters to charming residents, discover every secret corner',
    tag_zh: '扮演一个探索舒适森林村庄的小小邮差——在蘑菇树间滑翔、向迷人的居民送信、发现每一个秘密角落',
    platform_en: 'Available on: PC (Steam, Itch.io) — about $15',
    platform_zh: '可在以下平台获取：PC（Steam、Itch.io）——约 15 美元',
    why_en:
      "Mail Time (2023) is a cozy 3D exploration platformer where you play as a tiny mail carrier living in a world-within-a-world nestled in a forest. You glide with your oversized mail bag, explore mushroom-topped trees that are entire neighborhoods, and deliver letters to a cast of charming small-creature residents who each have their own personalities, homes, and ongoing stories revealed through the mail they receive. The game has a specific dreamlike scale — you are tiny, the forest is vast, and every area contains more detail than it initially suggests. There is no combat, no fail state, and no time pressure; the challenge is exploration and finding where each piece of mail needs to go. The visual design is richly tactile — wood grain on the mailboxes, oversized flower petals as rooftops, dewdrops on spider web bridges — and the soundtrack is appropriately gentle and cozy. At $15 for 4-6 hours, it is the best game for players who want to inhabit a small and detailed world at their own pace.",
    why_zh:
      'Mail Time（2023 年）是一款舒适的 3D 探索平台游戏，你扮演一个生活在森林中世界之中的小小邮差。你用你的超大邮件袋滑翔，探索整个是邻里的蘑菇顶树木，并向一群迷人的小生物居民送信，每个人都有自己的个性、家园和通过他们收到的邮件揭示的持续故事。游戏有一种特定的梦幻般的尺度——你很小，森林很大，每个区域都包含比最初建议的更多细节。没有战斗、没有失败状态、没有时间压力；挑战是探索并找到每封信需要去的地方。视觉设计触感丰富——邮箱上的木纹、超大花瓣作为屋顶、蜘蛛网桥上的露珠——配乐适度温柔舒适。15 美元 4-6 小时，是想要按自己节奏居住在小而详细世界中的玩家的最佳游戏。',
    tip_en: "Fly everywhere before walking — the glide mechanic is the central joy of the game. Look for elevated launch points on mushroom caps and tree branches; the whole map is accessible by air if you find the right updrafts and landing spots.",
    tip_zh: '在步行之前先飞行——滑翔机制是游戏的核心乐趣。寻找蘑菇帽和树枝上的高处起飞点；如果你找到了正确的上升气流和着陆点，整张地图都可以从空中到达。',
  },
  loddlenaut: {
    title_en: 'Loddlenaut',
    title_zh: 'Loddlenaut',
    emoji: '🌊',
    tag_en: 'Clean up alien ocean pollution as a solo diver and raise the alien sea creatures that return as the ecosystem recovers — gentle environmental care with biological charm',
    tag_zh: '作为独自潜水员清理外星海洋污染，并养育随着生态系统恢复而归来的外星海洋生物——温和的环境照料与生物魅力',
    platform_en: 'Available on: PC (Steam, Itch.io) — about $15',
    platform_zh: '可在以下平台获取：PC（Steam、Itch.io）——约 15 美元',
    why_en:
      "Loddlenaut (2023) is one of the most original cozy games of recent years: a solo alien ocean cleanup and creature care game. You play as a lone diver on an alien ocean planet, cleaning goop and pollution from the seafloor using a pressure washer-like tool, and as the environment recovers, Loddles — small round alien sea creatures with customizable biology — begin appearing and can be raised as companions. Each Loddle can be fed specific foods to customize their body shape, color, and features over time; the biological customization is gentle and endlessly surprising. The cleaning loop is deeply satisfying (similar to PowerWash Simulator's before-and-after clarity), the underwater alien environment is beautifully rendered with bioluminescent coral and strange flora, and the Loddles are genuinely charming in their rounded alien way. At $15, it is a complete experience that rewards patient players who appreciate environmental care and creature nurturing in a package unlike anything else in the cozy genre.",
    why_zh:
      'Loddlenaut（2023 年）是近年来最具原创性的 cozy 游戏之一：一款独自的外星海洋清洁和生物养育游戏。你扮演一位在外星海洋星球上的孤独潜水员，用类似压力清洗机的工具清理海底的污泥和污染，随着环境恢复，Loddles——拥有可定制生物学的小圆形外星海洋生物——开始出现，可以作为伴侣养育。每只 Loddle 都可以通过特定食物来定制它们随时间变化的体型、颜色和特征；生物定制温和而令人愉快地不断带来惊喜。清洁循环深度令人满足（类似于电力清洗模拟器的前后对比清晰感），水下外星环境以生物发光珊瑚和奇异植物精美渲染，Loddles 以其圆润的外星方式真正迷人。15 美元，对于欣赏环境照料和生物养育的耐心玩家来说，这是一次与 cozy 类型中其他任何游戏都不同的完整体验。',
    tip_en: "Focus on cleaning complete sections before moving on — the visual payoff of a fully cleaned area is significant, and it also concentrates the food drops that attract more Loddles to the recovered zone. Feed your Loddles the same food type repeatedly to push a single trait further.",
    tip_zh: '在继续之前专注于清洁完整的区域——完全清洁区域的视觉回报是显著的，它也会集中食物掉落，吸引更多 Loddles 到恢复区域。反复给你的 Loddles 喂食同一种类型的食物，以进一步推动单一特征。',
  },
}

function calcResult(answers: Pick[]): Pick {
  const counts: Record<Pick, number> = { duck: 0, donut: 0, mailtime: 0, loddlenaut: 0 }
  for (const a of answers) counts[a]++
  return Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0] as Pick
}

export function CozyWeirdGamesQuiz({ locale }: { locale: string }) {
  const isZh = locale === 'zh'
  const [answers, setAnswers] = useState<(Pick | null)[]>(Array(QUESTIONS.length).fill(null))
  const [submitted, setSubmitted] = useState(false)

  const allAnswered = answers.every((a) => a !== null)

  if (submitted) {
    const result = RESULTS[calcResult(answers as Pick[])]
    const url = `${BASE_URL}/${locale}/quizzes/cozy-weird-games`
    const shareText = isZh
      ? `Cozy 难解释游戏测验：「${result.title_zh}」！${result.tag_zh}。找到你的：${url}`
      : `My impossible-to-explain cozy game: ${result.title_en} — ${result.tag_en}. Find yours: ${url}`

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
              {isZh ? '上手小贴士：' : 'Getting started: '}
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
            ? '哪款最难向朋友解释的 Cozy 游戏最适合你？'
            : 'Which Impossible-to-Explain Cozy Game Is Perfect for You?'}
        </h1>
        <p className="text-sm text-[#8a9a7a]">
          {isZh
            ? '6 个问题，从橡皮鸭模拟器、甜甜圈县城、Mail Time、Loddlenaut 中找到你的奇异 Cozy 游戏'
            : '6 questions to match you with Placid Plastic Duck Simulator, Donut County, Mail Time, or Loddlenaut'}
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
        {isZh ? '找到我的奇异 Cozy 游戏' : 'Find My Unexplainable Cozy Game'}
      </button>
    </div>
  )
}
