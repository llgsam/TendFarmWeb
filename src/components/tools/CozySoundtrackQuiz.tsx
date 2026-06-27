'use client'

import { useState } from 'react'
import { BASE_URL } from '@/lib/config'

type Pick = 'celeste' | 'gris' | 'chicory' | 'night-in-the-woods'

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
    q_en: 'What does music in a game need to do for you?',
    q_zh: '游戏里的音乐需要为你做什么？',
    options: [
      { en: 'Push me forward — match the urgency of what I am doing and make every moment feel earned', zh: '推动我前进——与我正在做的事情的紧迫感匹配，让每一刻都感觉值得', type: 'celeste' },
      { en: 'Carry me somewhere I cannot name — wordless, without landmarks, pure emotional transport', zh: '把我带到一个我说不清名字的地方——无言的、没有标志、纯粹的情感运输', type: 'gris' },
      { en: 'Be cheerful and warm in the background — something I barely notice until I realize it has lifted my mood entirely', zh: '在背景中欢快而温暖——几乎不注意，直到意识到它完全提升了我的心情', type: 'chicory' },
      { en: 'Sound like a real place — local, specific, a little scrappy and imperfect like the town it is scoring', zh: '听起来像一个真实的地方——本土的、具体的、有点粗糙和不完美，就像它描绘的小镇', type: 'night-in-the-woods' },
    ],
  },
  {
    q_en: 'Which of these sounds most appeals to you?',
    q_zh: '以下哪种声音最吸引你？',
    options: [
      { en: 'Electronic synth that builds and releases tension — like the sound of trying and trying again, and finally succeeding', zh: '构建和释放张力的电子合成器——就像一遍又一遍尝试、终于成功的声音', type: 'celeste' },
      { en: 'Orchestral with vocal layers — the feeling of grief transforming slowly into something beautiful and larger than you', zh: '带有声乐层次的管弦乐——悲伤缓慢转变为美丽而宏大的东西的感觉', type: 'gris' },
      { en: 'Light, curious, playful — like opening a door and finding the world brighter than you expected', zh: '轻盈、好奇、俏皮——就像打开一扇门，发现世界比你预期的更明亮', type: 'chicory' },
      { en: 'Guitar-driven indie with emotional weight — lo-fi enough to feel authentic, melodic enough to stay with you', zh: '有情感分量的吉他驱动独立音乐——足够 lo-fi 以感觉真实，足够旋律性以留在你心里', type: 'night-in-the-woods' },
    ],
  },
  {
    q_en: 'When a piece of music hits you in a game, what does it feel like?',
    q_zh: '当游戏里的一段音乐触动你时，是什么感觉？',
    options: [
      { en: 'I feel the exact emotion the character is feeling — like the music is playing me, not the other way around', zh: '我感受到角色正在感受的确切情感——就像音乐在演奏我，而不是反过来', type: 'celeste' },
      { en: 'I stop moving and just stay still for a moment — the music feels bigger than the screen and I need to let it in', zh: '我停止移动，静静待了一会儿——音乐感觉比屏幕更大，我需要让它进来', type: 'gris' },
      { en: 'I notice I am smiling without realizing when I started — the music crept in without asking', zh: '我注意到自己在笑，却不知道是什么时候开始的——音乐不知不觉地进入了', type: 'chicory' },
      { en: 'A specific lyric or melody repeats in my head for days — it has lodged itself and I do not want to remove it', zh: '一个特定的歌词或旋律在我脑海中重复了好几天——它扎根了，我不想移除它', type: 'night-in-the-woods' },
    ],
  },
  {
    q_en: 'What kind of emotional experience do you want a game to give you?',
    q_zh: '你希望一款游戏给你带来什么样的情感体验？',
    options: [
      { en: 'The specific feeling of getting better at something hard — of trying with patience and having that patience quietly rewarded', zh: '在困难的事情上变得更好的特定感觉——耐心尝试，并且那份耐心被悄悄奖励', type: 'celeste' },
      { en: 'Catharsis without words — processing something wordless and large through an experience that does not explain itself', zh: '无言的宣泄——通过一个不解释自己的体验，处理某种无法言说却巨大的东西', type: 'gris' },
      { en: 'Pure gentle delight — the kind of happy that does not need anything to be wrong first in order to feel good', zh: '纯粹温和的愉悦——不需要先有什么不对劲才能感觉良好的那种快乐', type: 'chicory' },
      { en: 'Recognition — feeling seen in the particular way a game understands something about being alive that most games miss', zh: '被认可——以游戏理解生命某些方面的特殊方式感到被看见，这是大多数游戏错过的', type: 'night-in-the-woods' },
    ],
  },
  {
    q_en: 'How long do you want this game to be?',
    q_zh: '你希望这款游戏有多长？',
    options: [
      { en: '10-25 hours — long enough for real depth, short enough to finish', zh: '10-25 小时——足够长以产生真正的深度，又足够短可以完成', type: 'celeste' },
      { en: 'Short — under 3 hours is fine, I want an experience not a game', zh: '短——3 小时以内就行，我想要一个体验而不是一款游戏', type: 'gris' },
      { en: '10-15 hours — I want a full story arc and characters I meet and remember', zh: '10-15 小时——我想要完整的故事弧和我会遇见并记住的角色', type: 'chicory' },
      { en: '6-10 hours — tight and focused, every moment earned, nothing padded', zh: '6-10 小时——紧凑专注，每一刻都值得，没有填充', type: 'night-in-the-woods' },
    ],
  },
  {
    q_en: 'Which sentence could have been written about you?',
    q_zh: '以下哪句话可能是在描述你？',
    options: [
      { en: '"Struggled with anxiety but found that working through it slowly — failing and trying again — was its own kind of medicine."', zh: '"曾与焦虑抗争，但发现慢慢处理它——失败再尝试——本身就是一种药。"', type: 'celeste' },
      { en: '"Needed to sit with sadness for a while before it became something I could understand and then, eventually, carry."', zh: '"需要和悲伤坐在一起一段时间，然后它才变成我能理解的东西，最终，能够承载的东西。"', type: 'gris' },
      { en: '"Found that creativity — coloring outside the lines, literally — taught me more about who I am than most things."', zh: '"发现创造力——字面意义上的在线条外涂色——比大多数事情都更多地教会了我自己是谁。"', type: 'chicory' },
      { en: '"Came back to a small town I thought I had outgrown and discovered it was more complicated than I had given it credit for."', zh: '"回到了一个我以为已经长大离开的小镇，发现它比我给予的评价更复杂。"', type: 'night-in-the-woods' },
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
  celeste: {
    title_en: 'Celeste',
    title_zh: 'Celeste',
    emoji: '🏔️',
    tag_en: 'A precise platformer about climbing a mountain and anxiety — with a Grammy-nominated electronic soundtrack by Lena Raine',
    tag_zh: '一款关于攀登山峰与焦虑的精准平台游戏——附带 Lena Raine 获格莱美提名的电子配乐',
    platform_en: 'Available on: PC (Steam, Epic), Nintendo Switch, PlayStation 4, Xbox — about $20',
    platform_zh: '可在以下平台获取：PC（Steam、Epic）、Nintendo Switch、PlayStation 4、Xbox——约 20 美元',
    why_en:
      "Celeste (2018) is one of the most acclaimed indie games ever made — and its soundtrack, composed by Lena Raine, is inseparable from that acclaim. Raine scored every chapter with a distinct musical identity that evolves as the protagonist Madeline climbs: the opening chapters feel tentative and exploratory, the middle chapters build tension and fragmentation, and the final ascent resolves into something euphoric and earned. The game's central theme — Madeline is climbing Celeste Mountain partly as a way of confronting her anxiety — is communicated almost entirely through the music and the game feel rather than through heavy-handed dialogue. It is a hard game (you will die many times) but it is designed around the specific pleasure of getting better slowly, and the music celebrates each small victory. The game won multiple awards including the DICE Award for Outstanding Achievement in Game Direction. Soundtrack won a Grammy nomination in 2021 — the first electronic video game score to be nominated. At $20 on all major platforms including Xbox Game Pass, it is essential.",
    why_zh:
      'Celeste（2018 年）是有史以来最受好评的独立游戏之一——它的配乐由 Lena Raine 创作，与这种好评密不可分。Raine 为每个章节配上了独特的音乐身份，随着主角 Madeline 攀登而演变：开场章节感觉犹豫而探索性，中间章节构建张力和碎片化，最后的攀登解析成某种令人欣喜且值得的东西。游戏的核心主题——Madeline 部分是为了面对她的焦虑而攀登 Celeste 山——几乎完全通过音乐和游戏感觉而非说教性对话来传达。这是一款难游戏（你会死很多次），但它围绕慢慢变好的特定乐趣设计，音乐庆祝每一个小小的胜利。游戏赢得了包括 DICE 游戏方向杰出成就奖在内的多个奖项。原声带在 2021 年获得格莱美提名——第一个获提名的电子视频游戏配乐。20 美元，在包括 Xbox Game Pass 在内的所有主要平台上，这是必玩之作。',
    tip_en: "If a section is giving you trouble, turn on Assist Mode (available from the pause menu at any time). It does not disable achievements or endings — the game explicitly wants you to use it. Celestial helpers in later chapters are optional collectibles; skip them on a first run if they frustrate you.",
    tip_zh: '如果某个部分让你遇到困难，打开辅助模式（随时可从暂停菜单获取）。它不会禁用成就或结局——游戏明确希望你使用它。后续章节中的天体助手是可选收集品；如果它们让你沮丧，第一次通关时跳过它们。',
  },
  gris: {
    title_en: 'Gris',
    title_zh: 'Gris',
    emoji: '🎨',
    tag_en: 'A wordless watercolor journey through grief — no text, no dialogue, no fail states, only Berlinist\'s orchestral score and painted light',
    tag_zh: '一段无言的水彩悲伤之旅——没有文字、没有对话、没有失败状态，只有 Berlinist 的管弦乐配乐和水彩光影',
    platform_en: 'Available on: PC (Steam, GOG), Nintendo Switch, iOS, Android — about $17 (often on sale for ~$5-8)',
    platform_zh: '可在以下平台获取：PC（Steam、GOG）、Nintendo Switch、iOS、Android——约 17 美元（常特价约 5-8 美元）',
    why_en:
      "Gris (2018) is one of the most visually and aurally beautiful games ever made. It tells no story through words — no dialogue, no text, no UI — but communicates grief, loss, and recovery through watercolor animation by artist Conrad Roset, platformer movement, and the orchestral score by Spanish band Berlinist. The music begins sparse and broken and gradually expands as Gris recovers her ability to exist in the world: each chapter adds new layers of instrumentation. Several specific musical moments in Gris are cited by players as among the most emotionally powerful experiences they have had in a game — particularly the choral sections and the final ascending sequence. At 2-4 hours, it is short, but it is dense with beauty. There are no enemies, no ways to die, no fail states — you can only move through it. On Nintendo Switch and mobile, it is one of the best games available at any price. Multiple award nominations for art direction and music. Developed by Nomada Studio.",
    why_zh:
      'Gris（2018 年）是有史以来视觉和听觉上最美丽的游戏之一。它不通过文字讲述故事——没有对话、没有文字、没有 UI——而是通过艺术家 Conrad Roset 的水彩动画、平台游戏移动和西班牙乐队 Berlinist 的管弦乐配乐来传达悲伤、失去和恢复。音乐从稀疏和破碎开始，随着 Gris 恢复在世界中存在的能力而逐渐扩展：每个章节都添加了新的乐器层次。Gris 中几个特定的音乐时刻被玩家引用为他们在游戏中拥有的最具情感冲击力的体验之一——尤其是合唱部分和最后的上升序列。2-4 小时，虽短，但充满了美丽。没有敌人，没有死亡方式，没有失败状态——你只能穿越它。在 Nintendo Switch 和手机上，它是任何价格下最好的游戏之一。多次获得艺术指导和音乐提名奖项。由 Nomada Studio 开发。',
    tip_en: "Play with headphones and the volume turned up — Gris is one of the few games where audio quality hardware makes a measurable difference to the experience. The spatial positioning of sound is integral to the emotional design.",
    tip_zh: '戴着耳机、调高音量玩——Gris 是为数不多的几款音频质量硬件对体验产生可衡量差异的游戏之一。声音的空间定位对情感设计至关重要。',
  },
  chicory: {
    title_en: 'Chicory: A Colorful Tale',
    title_zh: 'Chicory: A Colorful Tale',
    emoji: '🖌️',
    tag_en: 'A cozy adventure where you use a magical paintbrush to color the whole world — with a Lena Raine score full of warmth and discovery',
    tag_zh: '一款用魔法画笔为整个世界涂色的 cozy 冒险游戏——附带 Lena Raine 充满温暖和发现感的配乐',
    platform_en: 'Available on: PC (Steam, Epic), Nintendo Switch, PlayStation 4/5 — about $20',
    platform_zh: '可在以下平台获取：PC（Steam、Epic）、Nintendo Switch、PlayStation 4/5——约 20 美元',
    why_en:
      "Chicory: A Colorful Tale (2021) is one of the most delightfully original cozy games made in recent years. You play as a dog named after your favorite food (the protagonist is canonically just called 'Pizza' in most runs) who picks up a legendary magic paintbrush when the previous wielder goes missing. The entire world has turned black and white — your job is to restore color, which you do literally by painting everything: trees, walls, floors, sky, characters. The core mechanic is an invitation to be creative without pressure: you can paint however you want and nothing about your coloring choices affects gameplay. Lena Raine's soundtrack is lighter in tone than Celeste but equally inventive, with different themes for different biomes that evolve as the world regains color. The game also has a genuinely warm story about imposter syndrome, creativity anxiety, and the relationship between an artist and their successor. Co-op available. Multiple awards in 2021.",
    why_zh:
      'Chicory: A Colorful Tale（2021 年）是近年来最令人愉快的原创 cozy 游戏之一。你扮演一只以你最喜欢的食物命名的狗（主角在大多数游戏中被官方称为"Pizza"），当上任持有者失踪时拿起了传奇的魔法画笔。整个世界变成了黑白——你的工作是恢复颜色，你通过字面意义上为所有东西涂色来实现：树木、墙壁、地板、天空、角色。核心机制是无压力创意的邀请：你可以随心所欲地绘画，你的涂色选择不影响游戏玩法。Lena Raine 的配乐在基调上比 Celeste 更轻盈，但同样富有创意，不同生物群落有不同的主题，随着世界重新获得颜色而演变。游戏还有一个关于冒名顶替综合症、创意焦虑以及艺术家与其继承者之间关系的真正温暖的故事。可合作游玩。2021 年多个奖项。',
    tip_en: "Do not agonize over your coloring choices — the game is designed for you to paint freely and impulsively. The most beautiful results usually come from players who stop thinking about color theory and just express their mood directly onto the world.",
    tip_zh: '不要为你的涂色选择纠结——游戏是为你自由和冲动地绘画而设计的。最美丽的结果通常来自那些停止思考色彩理论、直接将心情表达到世界上的玩家。',
  },
  'night-in-the-woods': {
    title_en: 'Night in the Woods',
    title_zh: '林中夜晚',
    emoji: '🦝',
    tag_en: 'A character-driven story about coming home to a small town after college — with Alec Holowka\'s indie guitar soundtrack that sounds like the town itself',
    tag_zh: '一个关于大学后回家小镇的人物驱动故事——附带 Alec Holowka 听起来像小镇本身的独立吉他配乐',
    platform_en: 'Available on: PC (Steam, GOG), Nintendo Switch, PlayStation 4, Xbox, iOS, Android — about $20',
    platform_zh: '可在以下平台获取：PC（Steam、GOG）、Nintendo Switch、PlayStation 4、Xbox、iOS、Android——约 20 美元',
    why_en:
      "Night in the Woods (2017) is one of the most beloved narrative indie games of its era — a coming-of-age story about Mae Borowski, a 20-year-old cat who drops out of college and returns to her small rust-belt town of Possum Springs. The game's core loop is simple: walk around town every day, talk to friends and family, and discover that everything has changed while somehow also still being the same. There is an overarching mystery that builds over the second half, but the real substance is in the small conversations. The music by composer Alec Holowka gives the game a specific sonic personality: guitar-forward, indie-tinged, melodic but imperfect — it sounds like the band at the local bar, recorded in someone's basement, and it is perfect for that reason. Night in the Woods was widely acclaimed for its honest and specific depiction of working-class small-town life, millennial anxiety, depression, and religious doubt. Very long critically for its $20 price point — 6-10 hours for a first playthrough with high replayability. One of the most emotionally specific cozy games ever made.",
    why_zh:
      '林中夜晚（2017 年）是其时代最受喜爱的叙事独立游戏之一——一个关于 Mae Borowski 的成长故事，这只 20 岁的猫从大学退学后回到她的小锈带城镇 Possum Springs。游戏的核心循环很简单：每天在镇上散步，与朋友和家人交谈，发现一切都变了，同时不知何故还是一样。后半部分有一个总体谜题在发展，但真正的实质在于小对话。作曲家 Alec Holowka 的音乐给游戏一个特定的声音个性：吉他主导、独立音乐调调、旋律性但不完美——听起来像本地酒吧的乐队，在某人的地下室录制，正因为如此而完美。林中夜晚因其对工人阶级小镇生活、千禧一代焦虑、抑郁和宗教怀疑的诚实而具体的描绘而广受好评。在 20 美元的价位下篇幅很长——第一次通关 6-10 小时，可重玩性高。有史以来情感上最具体的 cozy 游戏之一。',
    tip_en: "Talk to every character every day — their dialogue changes almost every morning, and some of the best writing in the game is in conversations that repeat on day 3 or 4 after you have gotten to know the character better.",
    tip_zh: '每天与每个角色交谈——他们的对话几乎每天早晨都会改变，游戏中一些最好的写作在你更了解角色后的第 3 或 4 天重复的对话中。',
  },
}

function calcResult(answers: Pick[]): Pick {
  const counts: Record<Pick, number> = {
    celeste: 0,
    gris: 0,
    chicory: 0,
    'night-in-the-woods': 0,
  }
  for (const a of answers) counts[a]++
  return Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0] as Pick
}

export function CozySoundtrackQuiz({ locale }: { locale: string }) {
  const isZh = locale === 'zh'
  const [answers, setAnswers] = useState<(Pick | null)[]>(Array(QUESTIONS.length).fill(null))
  const [submitted, setSubmitted] = useState(false)

  const allAnswered = answers.every((a) => a !== null)

  if (submitted) {
    const result = RESULTS[calcResult(answers as Pick[])]
    const url = `${BASE_URL}/${locale}/quizzes/cozy-soundtrack-quiz`
    const shareText = isZh
      ? `根据我的音乐品味，最适合我的 Cozy 游戏是「${result.title_zh}」！${result.tag_zh}。找到你的：${url}`
      : `Based on my music taste, my cozy game match is ${result.title_en} — ${result.tag_en}. Find yours: ${url}`

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
              ? 'TendFarm 正在研发农场节律追踪功能——把游戏里的那种沉浸与专注，带入真实生活的日常节奏。'
              : 'TendFarm is building a farm rhythm tracker — bringing game-level immersion and focus into real daily life.'}
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
            ? '你的音乐品味对应哪款 Cozy 游戏原声？'
            : 'Which Cozy Game Soundtrack Matches Your Music Taste?'}
        </h1>
        <p className="text-sm text-[#8a9a7a]">
          {isZh
            ? '6 个关于音乐感受的问题——在 Celeste、Gris、Chicory 和林中夜晚中找到拥有你最爱原声带的 Cozy 游戏'
            : '6 questions about how music moves you — find which game has the soundtrack you\'ll put on repeat: Celeste, Gris, Chicory, or Night in the Woods.'}
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
        {isZh ? '找到我的游戏原声' : 'Find My Soundtrack'}
      </button>
    </div>
  )
}
