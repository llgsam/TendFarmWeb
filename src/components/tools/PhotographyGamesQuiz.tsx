'use client'

import { useState } from 'react'
import { BASE_URL } from '@/lib/config'

type Pick = 'snap' | 'toem' | 'alba' | 'umurangi'

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
    q_en: 'What part of a photography game excites you most?',
    q_zh: '你最享受摄影游戏中的哪个部分？',
    options: [
      { en: 'Capturing rare creatures in unexpected poses and natural moments', zh: '在意外时机捕捉珍稀生物的自然瞬间', type: 'snap' },
      { en: 'Photographing quirky locals to solve heartfelt community puzzles', zh: '拍下各路奇人异事，用照片解开温馨谜题', type: 'toem' },
      { en: 'Documenting wildlife and plants to protect an endangered ecosystem', zh: '记录野生动植物，用镜头守护濒危生态系统', type: 'alba' },
      { en: 'Roaming a neon-lit city and composing bold, personal street shots', zh: '穿梭霓虹都市，用构图表达鲜明的个人风格', type: 'umurangi' },
    ],
  },
  {
    q_en: 'Which atmosphere fits you best?',
    q_zh: '你更偏爱哪种游戏氛围？',
    options: [
      { en: 'Vivid, tropical, and overflowing with colorful Pokémon energy', zh: '色彩浓烈的热带环境，处处充满宝可梦的生命力', type: 'snap' },
      { en: 'Soft black-and-white, cozy, with a gentle storybook vibe', zh: '柔和的黑白画面，温馨惬意，如翻阅童话绘本', type: 'toem' },
      { en: 'Warm Mediterranean sunlight, birdsong, and sea breezes', zh: '地中海暖阳、鸟语与海风，清新自然的度假感', type: 'alba' },
      { en: 'Dark, rainy streets with neon reflections and lofi city sounds', zh: '暗雨迷濛的街道、霓虹倒影与低保真城市声景', type: 'umurangi' },
    ],
  },
  {
    q_en: 'What would you most want to photograph in real life?',
    q_zh: '你在现实中最想用镜头捕捉什么？',
    options: [
      { en: 'Animals in the wild — especially rare or elusive species in action', zh: '野外动物，尤其是难得一见的稀有物种在动的瞬间', type: 'snap' },
      { en: 'Quirky strangers, odd storefronts, and everyday human comedy', zh: '奇特路人、老旧店铺招牌和日常生活的荒诞喜剧', type: 'toem' },
      { en: 'Birds, wildflowers, and unspoiled natural landscapes at golden hour', zh: '鸟类、野花，以及黄金时刻尚未受污染的自然风光', type: 'alba' },
      { en: 'Urban textures — graffiti, crumbling walls, overpass shadows at night', zh: '城市质感——涂鸦、斑驳墙面、夜间高架桥的阴影', type: 'umurangi' },
    ],
  },
  {
    q_en: 'What keeps you hooked in a game?',
    q_zh: '哪种驱动力最让你沉迷于游戏？',
    options: [
      { en: 'Clear progression — unlocking new routes, poses, and Pokémon secrets', zh: '清晰的进度感——解锁新路线、动作和宝可梦隐藏秘密', type: 'snap' },
      { en: 'Meeting charming characters and ticking off a satisfying quest list', zh: '遇见有趣的角色，一条条完成令人满足的任务清单', type: 'toem' },
      { en: 'Knowing my in-game actions genuinely help save a real place', zh: '知道我的每个游戏动作都真实地影响着一个地方的命运', type: 'alba' },
      { en: 'Creative freedom — no hand-holding, just me and my camera rules', zh: '创作自由——没有手把手教学，完全凭自己探索拍摄法则', type: 'umurangi' },
    ],
  },
  {
    q_en: 'How do you typically approach a new game?',
    q_zh: '你通常怎么开始一款新游戏？',
    options: [
      { en: 'Follow the main story first, then explore side content methodically', zh: '先跟着主线走，然后系统地去探索支线内容', type: 'snap' },
      { en: 'Wander freely, chat with everyone, and let the adventure find me', zh: '漫无目的地闲逛、和所有人聊天，让冒险自己找上门', type: 'toem' },
      { en: 'Set a goal — usually to 100% the collectibles — and chase it warmly', zh: '设定目标——通常是把收集要素做到100%——然后带劲去完成', type: 'alba' },
      { en: 'Ignore tutorials, experiment wildly, and find my own voice in the mechanics', zh: '跳过教学，大胆试错，在机制里摸索出属于自己的玩法', type: 'umurangi' },
    ],
  },
  {
    q_en: 'What feeling do you want to carry after finishing a game?',
    q_zh: '游戏结束后，你希望自己带走什么感受？',
    options: [
      { en: 'Warm nostalgia and a refreshed love for the Pokémon universe', zh: '温暖的怀旧感，以及对宝可梦世界重新燃起的热爱', type: 'snap' },
      { en: 'Quiet contentment — the world is full of small, lovely stories', zh: '安静的满足感——世界上到处都是细小而美好的故事', type: 'toem' },
      { en: 'Genuine hope and the urge to do something for the natural world', zh: '真实的希望感，以及想为自然世界做些什么的冲动', type: 'alba' },
      { en: 'A charged, bittersweet ache about cities, memory, and the end of things', zh: '一种带着甜意的刺痛——关于城市、记忆与逝去', type: 'umurangi' },
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
  snap: {
    title_en: 'New Pokémon Snap',
    title_zh: '新宝可梦随手拍',
    emoji: '📷',
    tag_en: 'The Creature Photographer',
    tag_zh: '生物摄影师',
    platform_en: 'Nintendo Switch',
    platform_zh: 'Nintendo Switch',
    why_en: `You are drawn to the thrill of patience — waiting for the perfect moment when a Pikachu turns toward the camera or a Gyarados erupts from the waterfall. New Pokémon Snap taps directly into that hunter-naturalist instinct, rewarding players who are observant, methodical, and deeply curious about creature behavior. The game sends you through lush biomes by on-rails routes, which might sound limiting at first, but the depth comes from what you trigger along the way: tossing Fluffruit to lure Pokémon, playing the Melody to coax new reactions, and discovering multi-step chains that unlock poses never seen in the original 2000 N64 game. The scoring system is surprisingly demanding — a star rating from 1 to 4 rewards composition, subject size, pose rarity, and multiple Pokémon in frame — so even casual photographers find themselves replaying courses obsessively to crack a 4-star shot. With over 200 Pokémon, 24 courses, and hundreds of discovery requests from Professor Mirror's research team, New Pokémon Snap is one of the most content-rich Nintendo Switch exclusives for fans who love completion and wonder in equal measure. Whether you grew up with the original or are brand new to the snap loop, the joy of catching a Torterra mid-shake or a Florges dancing in moonlight never gets old.`,
    why_zh: `你对生物世界充满好奇，享受守候最佳时机的那种耐心与专注。《新宝可梦随手拍》为你量身打造：游戏以轨道式路线带你穿越多样生态，你要做的就是观察、诱导、按下快门。丢出 Fluffruit、播放旋律、触发连锁反应——每条路线都藏有层层深挖的秘密，重复游玩不会枯燥，只会越来越着迷。评分系统从构图、主体大小到姿势稀有度综合判断，逼出摄影师本能。超过 200 只宝可梦与 24 条路线，让你获得无尽满足。`,
    tip_en: `Start every route by tossing Fluffruit early and often — you'll discover that the same spot behaves completely differently depending on what you throw. Once you unlock the Melody app, replay every single course from the beginning; hidden Pokémon behaviors are gated behind the Melody, and many fan-favorite photos (like the Vaporeon moonlight shot) are completely inaccessible without it. For top scores, practice keeping the subject centered and large in frame — the game specifically penalizes small or off-center subjects even if the pose is rare.`,
    tip_zh: `每条路线一开始就多丢 Fluffruit，你会发现同一个地点因投掷时机不同而触发完全不同的行为。解锁旋律后，从头重玩所有路线——许多宝可梦的稀有动作只在旋律播放时触发，错过等于白玩。刷高分时记住：主体要居中且够大，偏角或过小都会扣分。`,
  },
  toem: {
    title_en: 'Toem',
    title_zh: 'Toem：一场摄影冒险',
    emoji: '🌿',
    tag_en: 'The Wandering Storyteller',
    tag_zh: '游荡的故事收集者',
    platform_en: 'PC · Nintendo Switch · PS5',
    platform_zh: 'PC · Nintendo Switch · PS5',
    why_en: `You play games for the small human moments — a grandfather's story, a bus driver's worry, a lonely bird singing at the wrong season. Toem is built entirely from these moments. This black-and-white hand-drawn adventure game sends you on a journey to witness the phenomenon called "Toem" using only your camera. Every location is a pocket-sized world filled with quirky characters who need photographic proof of things: a musician who wants a picture of someone clapping, a shy creature who runs away unless you approach from exactly the right angle, a curious researcher documenting local flora. Completing their requests fills a stamp book that unlocks bus tickets forward. There's no combat, no death, no punishment — just gentle curiosity and the quiet satisfaction of helping. The visual style is breathtaking: soft pencil-sketch shading, whimsical character designs, and a world that feels handmade and genuinely unique. Running roughly 4-5 hours, Toem is the kind of game that makes you put your phone down, slow your breathing, and appreciate the idea that every stranger you pass has a whole world inside them. It won multiple "feel-good game" awards and remains a cult favorite among players who want beauty without stress.`,
    why_zh: `你玩游戏是为了那些细小的人情味——爷爷的故事、公交司机的烦恼、一只在错误季节啼鸣的鸟。《Toem》正是由这些时刻编织而成。手绘黑白世界里，你用相机帮助每位遇见的角色完成心愿：有人想看鼓掌的照片，有人需要你记录羞怯生物，有人请你寻找特定植物。集满印章解锁下一段旅程，没有战斗、没有惩罚，只有温柔好奇心和帮助他人的满足感。约4-5小时可通关，小而精，治愈力极强。`,
    tip_en: `Don't rush to stamp completion — explore every edge of each map first, because optional photo subjects are often hiding behind a tree or just off the path. Many requests have multiple valid solutions, so if one approach isn't working, try photographing something adjacent. The game has secret collectibles called "hats" — keep an eye on anything interactive in the environment, because some hats are hidden in the most unexpected places. After finishing your first run, try replaying for the "completionist" badge; it adds maybe 2 hours and reveals encounters you probably missed.`,
    tip_zh: `别急着集章——先把每张地图的边角都走遍，很多隐藏角色藏在树后或小路尽头。许多任务有多种解法，卡住时换个思路拍周边事物试试。游戏里藏有秘密帽子收集，留意所有可以互动的环境物件。通关后再来一次完美攻略，大约额外2小时，能发现第一遍错过的温馨相遇。`,
  },
  alba: {
    title_en: 'Alba: A Wildlife Adventure',
    title_zh: 'Alba: 野生动物历险记',
    emoji: '🦅',
    tag_en: 'The Nature Guardian',
    tag_zh: '自然守护者',
    platform_en: 'PC · Switch · iOS · Android',
    platform_zh: 'PC · Switch · iOS · Android',
    why_en: `You believe that caring about something — really caring — means doing something about it. Alba: A Wildlife Adventure puts that belief at the center of its gentle but purposeful design. Playing as a young girl visiting her grandparents in a small Spanish coastal town, you discover that a corrupt mayor plans to build a luxury hotel on the last nature reserve. Armed with a smartphone and boundless determination, you photograph wildlife to create a species database, rally local volunteers, clean up litter, fix broken signs, and build a petition to stop the development. The photography here is approachable and low-pressure — you don't need perfect timing or rare poses, just find animals in their habitats and log them. But the accumulation of those photos builds something meaningful: a record of a living world worth saving. Developed by Ustwo Games (Monument Valley), Alba has a warm, painterly visual style and a genuinely optimistic worldview that never feels naive. It is one of the best games ever made for adults who miss the wide-eyed environmentalism of their childhood — and one of the best games to play with a child beside you. Available on mobile as well as Switch and PC, Alba is also Ustwo's gift to the planet: for every copy sold, they plant a real tree.`,
    why_zh: `你相信真正的关心需要付诸行动。《Alba: 野生动物历险记》把这份信念放在设计核心。你扮演一位少女，来到祖父母所在的西班牙小镇，发现腐败市长计划在最后一片自然保护区建造豪华酒店。带着手机和无限热情，你拍摄野生动物建立物种数据库、组织志愿者清理垃圾、修复损坏标牌、征集请愿书阻止开发。摄影门槛低、压力小，重要的是积累——每张照片都为一个值得守护的世界留下记录。手绘风格温暖，主题乐观，还是第一个每卖出一份就真实种树的游戏。`,
    tip_en: `To 100% the animal database, use the indicator dots on your map — they show which areas still have unlogged species. Birds are the trickiest: many only appear at specific times of day in the game's light cycle, so if a bird marker is on your map but you can't find it, wait for the lighting to change. The game auto-saves constantly, so don't worry about losing progress. If you want the full emotional impact, save the beach cleanup for last — it's the most visually satisfying transformation in the game and works as a perfect emotional climax.`,
    tip_zh: `想100%完成动物数据库，用地图上的指示点追踪未记录的物种。鸟类最难找：许多只在特定光线时段出现，如果地图显示标记但找不到，等天色变化后再试。游戏自动存档，不用担心进度丢失。如果想获得最完整的情感体验，把海滩清理任务留到最后——那是游戏中视觉最震撼的变化，也是完美的情感高潮。`,
  },
  umurangi: {
    title_en: 'Umurangi Generation',
    title_zh: 'Umurangi Generation',
    emoji: '🌆',
    tag_en: 'The Urban Visionary',
    tag_zh: '城市视觉诗人',
    platform_en: 'PC · Nintendo Switch',
    platform_zh: 'PC · Nintendo Switch',
    why_en: `You want more from photography games than cute animals and sunny skies. You want grit, atmosphere, and the feeling that art can say something important about the world falling apart around us. Umurangi Generation delivers exactly that. Set in a near-future Tauranga, Aotearoa (New Zealand) in the shadow of a Kaiju invasion, you play as a courier navigating urban zones filled with spray-painted walls, military checkpoints, rooftop parties, and the quiet despair of people who know something terrible is coming. The photography is freeform and expressive: you choose your lens, film, and settings, and then compose whatever shots move you — whether that's a wide-angle cityscape bathed in toxic orange light or a macro shot of a dying plant on an abandoned balcony. The game has optional photo missions (capture X objects to earn credits for new gear), but the real purpose is artistic self-expression. The lo-fi drum-and-bass soundtrack is one of the most acclaimed game OSTs of the 2020s. Umurangi Generation is not a comfortable game — it is a political, emotional, and aesthetic statement about climate grief, indigenous futurism, and what it means to document a world at the edge. It is essential for players who want their games to mean something beyond entertainment.`,
    why_zh: `你对摄影游戏有更高的要求：不满足于可爱动物和晴天风景，你要质感、氛围，以及艺术对崩裂世界的真实表达。《Umurangi Generation》正是这样一款作品。在怪兽入侵阴影下的近未来新西兰，你是一名快递员，穿梭于充满涂鸦、军事检查站、楼顶派对与末日预感的城区。摄影完全自由：选镜头、调胶片、随心构图——可以是毒橙色天空下的广角城市轮廓，也可以是废弃阳台上枯萎植物的微距特写。低保真鼓打贝斯配乐是近年最受赞誉的游戏原声之一。这是一款关于气候悲痛与末日记录的艺术声明。`,
    tip_en: `Don't treat the photo missions as mandatory constraints — use them as a starting point and then let your instincts take over. The most rewarding sessions happen when you finish the objectives quickly and then spend the remaining time purely composing. The Macro DLC is worth purchasing even before finishing the base game: it adds a lens that reveals textures and details invisible in normal play, completely changing how you see each level. When in doubt, shoot from low angles upward — the game's architecture is designed to look dramatic from ground level, and almost every zone has a stunning vertical composition waiting to be found.`,
    tip_zh: `不要把摄影任务当作硬性约束——把它们当作起点，完成后就放开手跟着直觉走。最有成就感的游玩往往发生在任务完成之后，纯粹为构图而构图的那段时间。Macro DLC 值得在通关前购入：新增的微距镜头能揭示正常视角下不可见的纹理与细节，彻底改变你看待每个关卡的方式。不知道拍什么时，试着从低角度仰拍——游戏建筑专为地面视角设计，几乎每个区域都藏有震撼的垂直构图。`,
  },
}

function calcResult(answers: Pick[]): Pick {
  const counts: Record<Pick, number> = { snap: 0, toem: 0, alba: 0, umurangi: 0 }
  for (const a of answers) counts[a]++
  return Object.entries(counts).sort((x, y) => y[1] - x[1])[0][0] as Pick
}

export function PhotographyGamesQuiz({ locale }: { locale: string }) {
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
      ? `我的摄影游戏推荐是《${r.title_zh}》！${r.emoji} 快来测测你适合哪款？${BASE_URL}/zh/quizzes/photography-games-quiz`
      : `My photography game match is ${r.title_en}! ${r.emoji} Which one are you? ${BASE_URL}/en/quizzes/photography-games-quiz`

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
            {isZh ? `第 ${current + 1} / ${QUESTIONS.length} 题` : `Question ${current + 1} of ${QUESTIONS.length}`}
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
