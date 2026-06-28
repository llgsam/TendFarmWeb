'use client'

import { useState } from 'react'
import { BASE_URL } from '@/lib/config'

type Villager = 'isabelle' | 'raymond' | 'stitches' | 'marshal'

function ShareButton({ text, locale }: { text: string; locale: string }) {
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

  const getCopyLabel = (): string => {
    if (copied) {
      if (locale === 'zh') return '✓ 已复制！'
      if (locale === 'zh-TW') return '✓ 已複製！'
      if (locale === 'ja') return '✓ コピーしました！'
      if (locale === 'ko') return '✓ 복사되었습니다!'
      if (locale === 'de') return '✓ Kopiert!'
      return '✓ Copied!'
    }
    if (locale === 'zh') return '📋 复制结果'
    if (locale === 'zh-TW') return '📋 複製結果'
    if (locale === 'ja') return '📋 結果をコピー'
    if (locale === 'ko') return '📋 결과 복사'
    if (locale === 'de') return '📋 Ergebnis kopieren'
    return '📋 Copy result'
  }

  const getShareLabel = (): string => {
    if (locale === 'zh') return '分享'
    if (locale === 'zh-TW') return '分享'
    if (locale === 'ja') return 'シェア'
    if (locale === 'ko') return '공유'
    if (locale === 'de') return 'Teilen'
    return 'Share'
  }

  return (
    <div className="flex flex-1 gap-3">
      <button
        onClick={handleCopy}
        className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-[#2d3d2d] bg-[#1a2e1a]/50 px-4 py-3 text-sm text-[#e8dcc8] transition-colors hover:border-[#f0a832]/40 hover:text-[#f0a832]"
      >
        {getCopyLabel()}
      </button>
      <a
        href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 rounded-xl border border-[#2d3d2d] bg-[#1a2e1a]/50 px-4 py-3 text-sm text-[#e8dcc8] transition-colors hover:border-[#1d9bf0]/40 hover:text-[#1d9bf0]"
      >
        𝕏 {getShareLabel()}
      </a>
    </div>
  )
}

const QUESTIONS: Array<{
  q_en: string
  q_zh: string
  q_zhTW: string
  q_ja: string
  q_ko: string
  q_de: string
  options: Array<{ en: string; zh: string; zhTW: string; ja: string; ko: string; de: string; type: Villager }>
}> = [
  {
    q_en: 'Your ideal Saturday morning looks like:',
    q_zh: '你理想的周六早晨是什么样的？',
    q_zhTW: '你理想的週六早晨是什麼樣子？',
    q_ja: '理想の土曜日の朝はどんな感じですか？',
    q_ko: '당신의 이상적인 토요일 아침은 어떤 모습인가요?',
    q_de: 'Wie sieht dein perfekter Samstagmorgen aus?',
    options: [
      {
        en: "Helping someone with their errands — nothing beats feeling useful",
        zh: '帮朋友跑腿办事——没什么比帮到人更开心了',
        zhTW: '幫朋友跑腿辦事——沒什麼比幫到人更開心了',
        ja: '誰かの用事を手伝う――役に立てることに勝るものはない',
        ko: '누군가의 심부름을 도와주기 — 도움이 된다는 느낌만큼 좋은 건 없어요',
        de: 'Jemandem bei Erledigungen helfen — nichts schlägt das Gefühl, gebraucht zu werden',
        type: 'isabelle',
      },
      {
        en: "Curating the perfect outfit before anything else",
        zh: '精心搭配今天的穿搭，才能出门',
        zhTW: '精心搭配今天的穿搭，才能出門',
        ja: 'まずはパーフェクトなコーデを決める――それから何でもできる',
        ko: '완벽한 코디를 완성하고 나서야 하루를 시작해요',
        de: 'Erstmal das perfekte Outfit zusammenstellen — alles andere kann warten',
        type: 'raymond',
      },
      {
        en: "Staying in bed with snacks and a feel-good show",
        zh: '窝在被子里嗑零食看番剧',
        zhTW: '窩在被子裡吃零食看動漫',
        ja: 'ベッドでお菓子を食べながら好きなアニメをのんびり観る',
        ko: '이불 속에서 과자 먹으면서 좋아하는 드라마 보기',
        de: 'Im Bett bleiben, snacken und eine gemütliche Serie schauen',
        type: 'stitches',
      },
      {
        en: "Making something creative — a drawing, a playlist, anything",
        zh: '做点创意的事——画画、整理歌单，随便什么',
        zhTW: '做點有創意的事——畫畫、整理歌單，什麼都好',
        ja: 'クリエイティブなことをする――絵を描くでも、プレイリストを作るでも何でも',
        ko: '창의적인 뭔가를 만들기 — 그림 그리기, 플레이리스트 만들기, 아무거나',
        de: 'Etwas Kreatives machen — zeichnen, eine Playlist zusammenstellen, irgendwas',
        type: 'marshal',
      },
    ],
  },
  {
    q_en: 'A new neighbor moves in nearby. You:',
    q_zh: '邻居搬来了新住户，你会怎么做？',
    q_zhTW: '鄰居搬來了新住戶，你會怎麼做？',
    q_ja: '近所に新しい住人が引っ越してきた。あなたは？',
    q_ko: '새 이웃이 근처로 이사 왔어요. 당신은?',
    q_de: 'Ein neuer Nachbar zieht ein. Du:',
    options: [
      {
        en: "Plan a welcome gathering immediately",
        zh: '马上张罗个欢迎会',
        zhTW: '馬上張羅一個歡迎會',
        ja: 'すぐに歓迎パーティーを計画する',
        ko: '즉시 환영 파티를 계획해요',
        de: 'Sofort eine Willkommensfeier planen',
        type: 'isabelle',
      },
      {
        en: "Observe first — you'll introduce yourself when the timing feels right",
        zh: '先观察一下，时机成熟了再自我介绍',
        zhTW: '先觀察一下，時機成熟再自我介紹',
        ja: 'まず様子を見る――タイミングが合ったら自己紹介する',
        ko: '먼저 지켜보다가 타이밍이 맞을 때 자기소개를 해요',
        de: 'Erstmal beobachten — du stellst dich vor, wenn der Zeitpunkt stimmt',
        type: 'raymond',
      },
      {
        en: "Bake cookies and knock on their door that same day",
        zh: '当天就烤饼干去敲门送过去',
        zhTW: '當天就烤餅乾去敲門送過去',
        ja: 'その日のうちにクッキーを焼いてドアをノックする',
        ko: '그날 바로 쿠키를 구워서 문을 두드려요',
        de: 'Noch am selben Tag Kekse backen und an der Tür klingeln',
        type: 'stitches',
      },
      {
        en: "Leave a small note or plant at their door anonymously",
        zh: '匿名在门口放一盆小植物或一张便条',
        zhTW: '匿名在門口放一盆小植物或一張便條',
        ja: '匿名で小さなメモや植物をドアに置く',
        ko: '익명으로 작은 메모나 화분을 문 앞에 놓아둬요',
        de: 'Anonym einen kleinen Zettel oder eine Pflanze an die Tür legen',
        type: 'marshal',
      },
    ],
  },
  {
    q_en: 'Your living space is best described as:',
    q_zh: '你的生活空间最像哪种风格？',
    q_zhTW: '你的生活空間最像哪種風格？',
    q_ja: 'あなたの部屋を一番よく表しているのは？',
    q_ko: '당신의 생활 공간을 가장 잘 표현한다면?',
    q_de: 'Dein Wohnraum lässt sich am besten beschreiben als:',
    options: [
      {
        en: "Organized and warm — full of things tied to people you love",
        zh: '整洁温馨——很多东西都跟你在乎的人有关联',
        zhTW: '整潔溫馨——很多東西都跟你在乎的人有關聯',
        ja: '整理されていて温かい――大切な人との思い出の品で溢れている',
        ko: '정돈되고 따뜻한 공간 — 소중한 사람들과 연결된 물건들로 가득해요',
        de: 'Ordentlich und warm — voller Dinge, die mit Menschen verbunden sind, die dir wichtig sind',
        type: 'isabelle',
      },
      {
        en: "Impeccable — every piece is chosen with intention",
        zh: '无懈可击——每件东西都是精心挑选的',
        zhTW: '無懈可擊——每件東西都是精心挑選的',
        ja: '完璧――すべてのアイテムに意図がある',
        ko: '흠잡을 데 없이 완벽한 공간 — 모든 물건이 의도적으로 선택된 거예요',
        de: 'Makellos — jedes Stück ist mit Bedacht ausgewählt',
        type: 'raymond',
      },
      {
        en: "Cozy chaos — pillows, plushies, fairy lights everywhere",
        zh: '温馨混乱——到处是抱枕、公仔和小彩灯',
        zhTW: '溫馨混亂——到處是抱枕、公仔和小彩燈',
        ja: 'ほっこりカオス――クッション、ぬいぐるみ、イルミネーションだらけ',
        ko: '아늑한 카오스 — 쿠션, 인형, 무드등이 가득해요',
        de: 'Gemütliches Chaos — Kissen, Plüschtiere und Lichterketten überall',
        type: 'stitches',
      },
      {
        en: "A creative studio — art supplies, books, indie finds",
        zh: '创意工作室风格——艺术材料、书籍和独立感小物件',
        zhTW: '創意工作室風格——藝術材料、書籍和獨立感小物件',
        ja: 'クリエイティブなスタジオ――画材、本、インディーなこだわりアイテムがある',
        ko: '창작 스튜디오 느낌 — 미술 재료, 책, 인디 감성 소품들이 있어요',
        de: 'Ein kreatives Studio — Kunstbedarf, Bücher, ausgefallene Funde',
        type: 'marshal',
      },
    ],
  },
  {
    q_en: 'A friend is going through a hard time. You:',
    q_zh: '朋友遇到了困难，你会怎么做？',
    q_zhTW: '朋友遇到了困難，你會怎麼做？',
    q_ja: '友達がつらい時期を過ごしている。あなたは？',
    q_ko: '친구가 힘든 시간을 보내고 있어요. 당신은?',
    q_de: 'Ein Freund macht eine schwere Zeit durch. Du:',
    options: [
      {
        en: "Drop everything to be with them — logistics can wait",
        zh: '放下一切陪在他们身边——其他事都能等',
        zhTW: '放下一切陪在他們身邊——其他事都能等',
        ja: 'すべて放り出して側にいる――細かいことは後でいい',
        ko: '모든 걸 내려놓고 곁에 있어줘요 — 다른 일은 나중에 해도 돼요',
        de: 'Alles fallen lassen und bei ihnen sein — der Rest kann warten',
        type: 'isabelle',
      },
      {
        en: "Give clear, practical advice — you know what usually works",
        zh: '给出清晰实用的建议——你知道什么通常有效',
        zhTW: '給出清晰實用的建議——你知道什麼通常有效',
        ja: '明確で実用的なアドバイスをする――何が効果的かわかっている',
        ko: '명확하고 실용적인 조언을 해줘요 — 뭐가 효과적인지 알거든요',
        de: 'Klaren, praktischen Rat geben — du weißt, was meistens hilft',
        type: 'raymond',
      },
      {
        en: "Show up with their favorite snacks and zero agenda",
        zh: '拎着他们最爱的零食出现，什么都不问',
        zhTW: '拎著他們最愛的零食出現，什麼都不問',
        ja: '好きなお菓子を持って現れる――何も聞かずにただそこにいる',
        ko: '좋아하는 과자를 들고 찾아가요 — 아무것도 묻지 않고 그냥 있어줘요',
        de: 'Mit ihren Lieblingssnacks auftauchen — ohne Erwartungen, einfach da sein',
        type: 'stitches',
      },
      {
        en: "Send something meaningful — a song, an article, a sketch",
        zh: '发一首歌、一篇文章或一幅画给他们',
        zhTW: '傳一首歌、一篇文章或一幅畫給他們',
        ja: '意味のある何かを送る――曲、記事、スケッチ',
        ko: '의미 있는 걸 보내줘요 — 노래, 기사, 스케치 같은 거',
        de: 'Etwas Bedeutungsvolles schicken — einen Song, einen Artikel, eine Zeichnung',
        type: 'marshal',
      },
    ],
  },
  {
    q_en: 'Your biggest strength according to people who know you:',
    q_zh: '认识你的人觉得你最大的优点是？',
    q_zhTW: '認識你的人覺得你最大的優點是？',
    q_ja: 'あなたをよく知る人が言うあなたの最大の長所は？',
    q_ko: '당신을 잘 아는 사람들이 말하는 가장 큰 장점은?',
    q_de: 'Deine größte Stärke laut Leuten, die dich kennen:',
    options: [
      {
        en: "You make everyone feel seen and genuinely valued",
        zh: '你能让每个人都感觉自己被真正重视',
        zhTW: '你能讓每個人都感覺自己被真正重視',
        ja: '誰でも本当に大切にされていると感じさせられる',
        ko: '모든 사람이 진심으로 존중받는다고 느끼게 해줘요',
        de: 'Du gibst jedem das Gefühl, gesehen und wirklich wertgeschätzt zu werden',
        type: 'isabelle',
      },
      {
        en: "Your taste — you know what's cool before anyone else",
        zh: '你的品味——你总是比别人更早发现什么是好的',
        zhTW: '你的品味——你總是比別人更早發現什麼是好的',
        ja: 'センス――誰よりも早くいいものを見つける',
        ko: '당신의 안목 — 누구보다 먼저 좋은 걸 알아봐요',
        de: 'Dein Geschmack — du weißt, was cool ist, bevor es irgendjemand anderes merkt',
        type: 'raymond',
      },
      {
        en: "Your ability to find joy in absolutely anything",
        zh: '你能从任何事情中找到快乐的能力',
        zhTW: '你能從任何事情中找到快樂的能力',
        ja: 'どんなことにも喜びを見つける能力',
        ko: '무엇에서든 기쁨을 찾아내는 능력',
        de: 'Deine Fähigkeit, in absolut allem Freude zu finden',
        type: 'stitches',
      },
      {
        en: "You notice things others walk right past",
        zh: '你会注意到别人完全忽略的事物',
        zhTW: '你會注意到別人完全忽略的事物',
        ja: '他の人がすっかり見逃すものに気づける',
        ko: '다른 사람들이 그냥 지나치는 것들을 알아채요',
        de: 'Du bemerkst Dinge, an denen andere einfach vorbeigehen',
        type: 'marshal',
      },
    ],
  },
  {
    q_en: 'In Animal Crossing, your favorite activity is:',
    q_zh: '在动物森友会里，你最喜欢做的事是？',
    q_zhTW: '在動物森友會裡，你最喜歡做的事是？',
    q_ja: 'あつ森で一番好きな遊びは？',
    q_ko: '모여봐요 동물의 숲에서 가장 좋아하는 활동은?',
    q_de: 'In Animal Crossing machst du am liebsten:',
    options: [
      {
        en: "Organizing seasonal events and improving your island rating",
        zh: '操办季节活动，努力提升岛屿评级',
        zhTW: '籌辦季節活動，努力提升島嶼評級',
        ja: '季節イベントの運営と島の評価アップ',
        ko: '계절 이벤트를 기획하고 섬 평점 올리기',
        de: 'Saisonale Events organisieren und deine Inselbewertung verbessern',
        type: 'isabelle',
      },
      {
        en: "Designing the perfect island layout and custom outfits",
        zh: '设计完美的岛屿布局和自定义服装',
        zhTW: '設計完美的島嶼佈局和自訂服裝',
        ja: 'パーフェクトな島のレイアウトとカスタムコーデのデザイン',
        ko: '완벽한 섬 레이아웃 디자인과 마이디자인 의상 만들기',
        de: 'Das perfekte Insel-Layout und eigene Outfits designen',
        type: 'raymond',
      },
      {
        en: "Chatting with every villager and finding your favorites",
        zh: '和每个村民聊天，找到自己最喜欢的',
        zhTW: '和每個村民聊天，找到自己最喜歡的',
        ja: 'すべての住民と話して、お気に入りを見つける',
        ko: '모든 주민과 대화하고 최애 주민 찾기',
        de: 'Mit allen Dorfbewohnern quatschen und deine Lieblinge finden',
        type: 'stitches',
      },
      {
        en: "Hunting rare furniture pieces for your curated home",
        zh: '到处搜寻稀有家具，打造精心策划的房间',
        zhTW: '到處搜尋稀有家具，打造精心策劃的房間',
        ja: 'レアな家具を集めて、こだわりのマイホームを作る',
        ko: '희귀 가구를 수집해서 취향 가득한 집 꾸미기',
        de: 'Seltene Möbelstücke jagen und ein kuratiertes Zuhause gestalten',
        type: 'marshal',
      },
    ],
  },
]

const RESULTS: Record<
  Villager,
  {
    name_en: string
    name_zh: string
    name_zhTW: string
    name_ja: string
    name_ko: string
    name_de: string
    emoji: string
    species_en: string
    species_zh: string
    species_zhTW: string
    species_ja: string
    species_ko: string
    species_de: string
    desc_en: string
    desc_zh: string
    desc_zhTW: string
    desc_ja: string
    desc_ko: string
    desc_de: string
    gift_en: string
    gift_zh: string
    gift_zhTW: string
    gift_ja: string
    gift_ko: string
    gift_de: string
  }
> = {
  isabelle: {
    name_en: 'Isabelle',
    name_zh: '西施惠',
    name_zhTW: '西施惠',
    name_ja: 'しずえ',
    name_ko: '여울',
    name_de: 'Isabelle',
    emoji: '🌟',
    species_en: 'Shih Tzu · Town Secretary',
    species_zh: '西施犬 · 镇秘书',
    species_zhTW: '西施犬 · 鎮秘書',
    species_ja: 'シー・ズー・タウンの秘書',
    species_ko: '시추 · 마을 비서',
    species_de: 'Shih Tzu · Dorfsekretärin',
    desc_en:
      "You are Isabelle — the warm, endlessly dedicated heart of your community. You show up for people before they ask, remember the small details that matter, and have an uncanny ability to make everyone feel like the most important person in the room. Your enthusiasm is genuine and people feel it.",
    desc_zh:
      '你是西施惠——温暖、无限投入的社区灵魂。你在别人开口之前就已经出现，记住所有重要的小细节，有一种神奇的能力让每个人都感觉自己是最重要的存在。你的热情是真诚的，人们都能感受到。',
    desc_zhTW:
      '你是西施惠——溫暖、無限投入的社區靈魂。你在別人開口之前就已經出現，記住所有重要的小細節，有一種神奇的能力讓每個人都感覺自己是最重要的存在。你的熱情是真誠的，人們都能感受到。',
    desc_ja:
      'あなたはしずえ——コミュニティの温かく、尽きることなく献身的な心です。誰かが頼む前にすでに動き出し、大切な小さな詳細を覚えていて、誰もがその場で一番重要な人物だと感じさせる不思議な力を持っています。あなたの熱意は本物で、みんながそれを感じ取れます。',
    desc_ko:
      '당신은 여울입니다 — 마을의 따뜻하고 헌신적인 심장이에요. 누군가 부탁하기 전에 먼저 나타나고, 중요한 작은 디테일을 기억하며, 모든 사람이 가장 중요한 존재라고 느끼게 하는 신비한 능력이 있어요. 당신의 열정은 진심이고, 사람들은 그것을 느낄 수 있어요.',
    desc_de:
      'Du bist Isabelle — das warme, unermüdlich engagierte Herz deiner Gemeinschaft. Du bist da, bevor jemand fragt, erinnerst dich an die kleinen Details, die zählen, und hast eine unheimliche Fähigkeit, jeden das Gefühl zu geben, die wichtigste Person im Raum zu sein. Deine Begeisterung ist echt — und die Leute spüren das.',
    gift_en:
      "She would bring you a freshly baked treat with a handwritten note referencing something you mentioned weeks ago — proof she actually listens.",
    gift_zh:
      '她会带来一份新鲜烘焙的点心，附一张手写便条，提到你好几周前随口说过的某件事——证明她一直在认真听。',
    gift_zhTW:
      '她會帶來一份新鮮烘焙的點心，附一張手寫便條，提到你好幾週前隨口說過的某件事——證明她一直在認真聽。',
    gift_ja:
      '彼女は新鮮なお菓子と手書きのメモを持ってきてくれる。そのメモには数週間前にあなたがさらっと言ったことが書かれていて――ちゃんと聞いていた証拠だ。',
    gift_ko:
      '그녀는 갓 구운 간식과 손으로 쓴 메모를 가져올 거예요. 메모에는 몇 주 전에 당신이 무심코 한 말이 적혀 있어요 — 정말로 귀 기울여 듣고 있었다는 증거예요.',
    gift_de:
      'Sie würde dir selbst gebackenes Gebäck mitbringen — mit einer handgeschriebenen Notiz, die etwas erwähnt, das du vor Wochen beiläufig gesagt hast. Beweis dafür, dass sie wirklich zuhört.',
  },
  raymond: {
    name_en: 'Raymond',
    name_zh: '雷蒙德',
    name_zhTW: '雷蒙德',
    name_ja: 'レイモンド',
    name_ko: '레이먼드',
    name_de: 'Raymond',
    emoji: '👔',
    species_en: 'Cat · Smug Personality',
    species_zh: '猫 · 自信型',
    species_zhTW: '貓 · 自信型',
    species_ja: 'ネコ · キザな個性',
    species_ko: '고양이 · 쾌활한 성격',
    species_de: 'Katze · Arrogante Persönlichkeit',
    desc_en:
      "You are Raymond — effortlessly cool, style-forward, and quietly perceptive. You don't chase trends; you set them. You notice quality immediately, have impeccable taste in everything from music to furniture, and carry yourself with a calm confidence that others find magnetic. You're selective about who gets close — but those who do feel very lucky.",
    desc_zh:
      '你是雷蒙德——毫不费力地 cool、走在潮流前沿，又有着敏锐的洞察力。你不追逐潮流，你创造潮流。你能立刻感受到品质，对音乐到家居的一切都有无可挑剔的品味，带着一种让人着迷的冷静自信。你对亲近的人有所选择，但被你选中的人都会感到很幸运。',
    desc_zhTW:
      '你是雷蒙德——毫不費力地 cool、走在潮流前沿，又有著敏銳的洞察力。你不追逐潮流，你創造潮流。你能立刻感受到品質，對音樂到家居的一切都有無可挑剔的品味，帶著一種讓人著迷的冷靜自信。你對親近的人有所選擇，但被你選中的人都會感到很幸運。',
    desc_ja:
      'あなたはレイモンド——何もしなくてもクールで、トレンドの先を行き、静かに鋭い観察眼を持っています。トレンドを追うのではなく、作り出す側です。音楽からインテリアまですべてに卓越したセンスがあり、人を惹きつける冷静な自信を持って歩んでいます。親しくなる人は選んでいますが、選ばれた人たちはとても幸運だと感じます。',
    desc_ko:
      '당신은 레이먼드입니다 — 힘들이지 않아도 쿨하고, 트렌드보다 앞서 있으며, 조용히 날카로운 통찰력을 가지고 있어요. 트렌드를 쫓는 게 아니라 만들어 나가죠. 음악부터 가구까지 모든 것에 흠잡을 데 없는 취향이 있고, 사람들을 끌어당기는 차분한 자신감을 갖고 있어요. 가까워질 사람을 까다롭게 고르지만, 선택받은 사람들은 무척 운이 좋다고 느껴요.',
    desc_de:
      'Du bist Raymond — mühelos cool, immer dem Trend voraus und still beobachtend. Du jagst keine Trends, du setzt sie. Du erkennst Qualität sofort, hast unfehlbaren Geschmack in allem — von Musik bis Einrichtung — und trägst eine ruhige Selbstsicherheit, die andere anzieht. Du bist wählerisch, wen du an dich heranlässt — aber wer es schafft, fühlt sich sehr glücklich.',
    gift_en:
      "He would find some obscure, perfectly-curated item before anyone else knows it exists — and hand it to you with zero explanation, knowing you would understand.",
    gift_zh:
      '他会在任何人意识到它存在之前找到某件小众而完美的东西——毫无解释地送给你，因为他知道你会懂。',
    gift_zhTW:
      '他會在任何人意識到它存在之前找到某件小眾而完美的東西——毫無解釋地送給你，因為他知道你會懂。',
    gift_ja:
      '彼は誰もその存在を知る前に、完璧にキュレートされたレアなアイテムを見つけてくる——そして何の説明もなく手渡す。あなたならわかると知っているから。',
    gift_ko:
      '그는 누군가 그 존재를 알기도 전에 완벽하게 큐레이션된 희귀한 물건을 찾아낼 거예요 — 아무 설명 없이 당신에게 건네줄 거고, 당신이 이해할 거라는 걸 알거든요.',
    gift_de:
      'Er würde einen obskuren, perfekt kuratierten Gegenstand finden, bevor ihn jemand anderes überhaupt kennt — und ihn dir ohne jede Erklärung übergeben. Er weiß, dass du es verstehst.',
  },
  stitches: {
    name_en: 'Stitches',
    name_zh: '布丁',
    name_zhTW: '布丁',
    name_ja: 'ぬいぐるみ',
    name_ko: '바느질',
    name_de: 'Stitch',
    emoji: '🧸',
    species_en: 'Cub · Lazy Personality',
    species_zh: '熊宝宝 · 懒散型',
    species_zhTW: '熊寶寶 · 懶散型',
    species_ja: 'コグマ · のんびり屋な個性',
    species_ko: '아기곰 · 게으름뱅이 성격',
    species_de: 'Bärenjunges · Schläfriger Typ',
    desc_en:
      "You are Stitches — pure, cozy, and overflowing with genuine wonder. You find magic in ordinary moments: a good snack, a rainy afternoon, a new episode of something cozy. You are the kind of friend whose presence alone makes people feel safe. Your enthusiasm is never performative — it is simply how you actually are.",
    desc_zh:
      '你是布丁——纯真、舒适，充满真实的惊喜感。你能在普通的时刻发现魔法：一个好零食、一个雨天下午、一集新出的温馨番剧。你是那种光是在场就能让人感到安全的朋友。你的热情从来不是表演——那就是你真实的样子。',
    desc_zhTW:
      '你是布丁——純真、舒適，充滿真實的驚喜感。你能在普通的時刻發現魔法：一個好零食、一個雨天下午、一集新出的溫馨動漫。你是那種光是在場就能讓人感到安全的朋友。你的熱情從來不是表演——那就是你真實的樣子。',
    desc_ja:
      'あなたはぬいぐるみ——純粋で、居心地よく、本物の驚きにあふれています。普通の瞬間に魔法を見つけます：美味しいお菓子、雨の午後、好きなアニメの新しいエピソード。あなたはそこにいるだけで人々が安心できる友達です。あなたの熱意は決してパフォーマンスではない——それがあなたの本当の姿です。',
    desc_ko:
      '당신은 바느질입니다 — 순수하고, 아늑하며, 진짜 설렘으로 가득해요. 평범한 순간에서 마법을 발견해요: 맛있는 간식, 비 오는 오후, 따뜻한 애니메이션의 새 에피소드. 당신은 그저 곁에 있는 것만으로 사람들을 안심시키는 친구예요. 당신의 열정은 절대 연기가 아니에요 — 그냥 그게 당신이에요.',
    desc_de:
      'Du bist Stitch — pur, gemütlich und voller echter Begeisterung. Du findest Magie in gewöhnlichen Momenten: ein guter Snack, ein verregneter Nachmittag, eine neue Folge von etwas Gemütlichem. Du bist die Art von Freund, dessen bloße Anwesenheit Menschen ein sicheres Gefühl gibt. Deine Begeisterung ist nie gespielt — das bist einfach du.',
    gift_en:
      "He would show up with your favorite snack and a plushie he made himself — just because he thought you might need a cozy day.",
    gift_zh:
      '他会带着你最爱的零食和一个他自己做的小公仔出现，只是因为他觉得你今天可能需要一个窝在家里的日子。',
    gift_zhTW:
      '他會帶著你最愛的零食和一個他自己做的小公仔出現，只是因為他覺得你今天可能需要一個窩在家裡的日子。',
    gift_ja:
      '彼はあなたの好きなお菓子と自分で作ったぬいぐるみを持ってやってくる――ただ、あなたが今日はのんびり過ごしたいかもと思ったから。',
    gift_ko:
      '그는 당신이 좋아하는 간식과 직접 만든 작은 인형을 들고 나타날 거예요 — 오늘 집에서 쉬고 싶을 것 같다는 생각에요.',
    gift_de:
      'Er käme mit deinem Lieblingssnack und einem selbstgebastelten Plüschtier an — einfach weil er dachte, du könntest heute einen gemütlichen Tag gebrauchen.',
  },
  marshal: {
    name_en: 'Marshal',
    name_zh: '松风',
    name_zhTW: '松風',
    name_ja: 'マーシャル',
    name_ko: '마샬',
    name_de: 'Marschall',
    emoji: '🎵',
    species_en: 'Squirrel · Smug Personality',
    species_zh: '松鼠 · 自信型',
    species_zhTW: '松鼠 · 自信型',
    species_ja: 'リス · キザな個性',
    species_ko: '다람쥐 · 쾌활한 성격',
    species_de: 'Eichhörnchen · Arrogante Persönlichkeit',
    desc_en:
      "You are Marshal — artistic, introspective, and quietly extraordinary. You have a deep aesthetic sensibility that shows in everything you create and collect. The right people just get your taste without explanation. You are intensely loyal to the things and people you love, and your creative inner world is richer than most will ever know.",
    desc_zh:
      '你是松风——有艺术感、喜欢内省，安静地与众不同。你有深刻的美学感受力，体现在你创造和收藏的一切事物上。对的人不需要解释就能理解你的品味。你对你爱的人和事物忠诚到极致，你的创意内心世界比大多数人所知道的要丰富得多。',
    desc_zhTW:
      '你是松風——有藝術感、喜歡內省，安靜地與眾不同。你有深刻的美學感受力，體現在你創造和收藏的一切事物上。對的人不需要解釋就能理解你的品味。你對你愛的人和事物忠誠到極致，你的創意內心世界比大多數人所知道的要豐富得多。',
    desc_ja:
      'あなたはマーシャル——芸術的で、内省的で、静かに非凡です。あなたが作り、集めるものすべてに深い美的感覚が宿っています。わかる人は説明なしであなたのセンスを理解してくれます。愛する人やものに対して強い忠誠心を持ち、あなたの創造的な内面世界はほとんどの人が知るよりはるかに豊かです。',
    desc_ko:
      '당신은 마샬입니다 — 예술적이고, 내성적이며, 조용히 특별해요. 당신이 만들고 수집하는 모든 것에 깊은 미적 감각이 담겨 있어요. 맞는 사람은 설명 없이도 당신의 취향을 이해해요. 당신이 사랑하는 것과 사람에 대해 깊이 충실하고, 당신의 창의적인 내면 세계는 대부분의 사람들이 아는 것보다 훨씬 풍부해요.',
    desc_de:
      'Du bist Marschall — künstlerisch, introspektiv und still außergewöhnlich. Du hast ein tiefes ästhetisches Gespür, das sich in allem zeigt, was du erschaffst und sammelst. Die richtigen Leute verstehen deinen Geschmack ohne Erklärung. Du bist den Dingen und Menschen, die du liebst, tief ergeben — und deine kreative innere Welt ist reicher, als die meisten je wissen werden.',
    gift_en:
      "He would send you a playlist at 11pm with zero context — just tracks that perfectly described your current season of life.",
    gift_zh:
      '他会在晚上 11 点给你发一个毫无解释的歌单——只是他觉得这些歌完美地描述了你现在所处的人生阶段。',
    gift_zhTW:
      '他會在晚上 11 點給你發一個毫無解釋的歌單——只是他覺得這些歌完美地描述了你現在所處的人生階段。',
    gift_ja:
      '彼は夜11時に何の説明もなくプレイリストを送ってくる――ただ、あなたの今の人生の季節を完璧に表している曲たちを。',
    gift_ko:
      '그는 밤 11시에 아무 설명 없이 플레이리스트를 보낼 거예요 — 지금 당신이 지나고 있는 인생의 계절을 완벽하게 표현한 곡들이에요.',
    gift_de:
      'Er würde dir um 23 Uhr eine Playlist schicken — ohne jede Erklärung, nur Tracks, die genau deine aktuelle Lebensphase beschreiben.',
  },
}

function calcResult(answers: Villager[]): Villager {
  const counts: Record<Villager, number> = { isabelle: 0, raymond: 0, stitches: 0, marshal: 0 }
  for (const a of answers) counts[a]++
  return Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0] as Villager
}

export function AnimalCrossingVillagerQuiz({ locale }: { locale: string }) {
  const isZh = locale === 'zh' || locale === 'zh-TW'
  const getLoc = (zh: string, en: string, zhTW?: string, ja?: string, ko?: string, de?: string): string => {
    if (locale === 'zh') return zh
    if (locale === 'zh-TW') return zhTW ?? zh
    if (locale === 'ja') return ja ?? en
    if (locale === 'ko') return ko ?? en
    if (locale === 'de') return de ?? en
    return en
  }
  const [answers, setAnswers] = useState<(Villager | null)[]>(Array(QUESTIONS.length).fill(null))
  const [submitted, setSubmitted] = useState(false)

  const allAnswered = answers.every((a) => a !== null)

  if (submitted) {
    const result = RESULTS[calcResult(answers as Villager[])]
    const url = `${BASE_URL}/${locale}/quizzes/animal-crossing-villager`
    const villagerName = getLoc(result.name_zh, result.name_en, result.name_zhTW, result.name_ja, result.name_ko, result.name_de)
    const shareText = getLoc(
      `我的动物森友会村民人格是「${villagerName}」！快来测测你是谁：${url}`,
      `I got "${villagerName}" on the Animal Crossing Villager Quiz! Who are you? ${url}`,
      `我的動物森友會村民人格是「${villagerName}」！快來測測你是誰：${url}`,
      `あつ森の村人タイプは「${villagerName}」でした！あなたは誰？ ${url}`,
      `내 동물의 숲 주민 타입은 「${villagerName}」이에요! 당신은요? ${url}`,
      `Mein Animal Crossing Dorfbewohner ist "${villagerName}"! Wer bist du? ${url}`
    )

    return (
      <div>
        <div className="mb-6 text-center">
          <div className="mb-3 text-6xl">{result.emoji}</div>
          <p className="mb-1 text-xs text-[#4a5a4a]">{getLoc(result.species_zh, result.species_en, result.species_zhTW, result.species_ja, result.species_ko, result.species_de)}</p>
          <h2 className="mb-3 text-2xl font-bold text-[#f0a832]">
            {getLoc(result.name_zh, result.name_en, result.name_zhTW, result.name_ja, result.name_ko, result.name_de)}
          </h2>
          <p className="text-sm leading-relaxed text-[#8a9a7a]">
            {getLoc(result.desc_zh, result.desc_en, result.desc_zhTW, result.desc_ja, result.desc_ko, result.desc_de)}
          </p>
        </div>

        <div className="mb-6 rounded-xl border border-[#2d3d2d] bg-[#0f1a0f] p-4">
          <h3 className="mb-2 text-sm font-semibold text-[#e8dcc8]">
            {getLoc('如果他们是你的朋友...', 'If they were your friend...', '如果他們是你的朋友…', 'もし彼らがあなたの友達だったら…', '만약 그들이 당신의 친구라면…', 'Wenn sie dein Freund wären…')}
          </h3>
          <p className="text-sm leading-relaxed text-[#8a9a7a]">
            {getLoc(result.gift_zh, result.gift_en, result.gift_zhTW, result.gift_ja, result.gift_ko, result.gift_de)}
          </p>
        </div>

        <div className="mb-4 rounded-xl border border-[#2d3d2d] bg-[#0f1a0f] p-4">
          <p className="text-center text-sm text-[#8a9a7a]">
            {getLoc(
              'TendFarm 正在研发农场节律追踪功能——把 Cozy 游戏的季节感带入你的真实生活节奏。',
              'TendFarm is building a farm rhythm tracker — bringing the seasonal feeling of cozy games into real life.',
              'TendFarm 正在研發農場節律追蹤功能——把 Cozy 遊戲的季節感帶入你的真實生活節奏。',
              'TendFarm はファームリズムトラッカーを開発中です——コージーゲームの季節感をリアルな生活に。',
              'TendFarm은 농장 리듬 트래커를 개발 중입니다 — 코지 게임의 계절감을 실제 생활 리듬으로.',
              'TendFarm entwickelt einen Farm-Rhythmus-Tracker — das saisonale Gefühl von Cozy Games ins echte Leben bringen.'
            )}
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <ShareButton text={shareText} locale={locale} />
          <button
            onClick={() => {
              setAnswers(Array(QUESTIONS.length).fill(null))
              setSubmitted(false)
            }}
            className="flex-1 rounded-xl border border-[#2d3d2d] py-3 text-sm text-[#8a9a7a] hover:border-[#4a5a4a] hover:text-[#e8dcc8]"
          >
            {getLoc('重新测试', 'Retake Quiz', '重新測試', 'もう一度やる', '다시 테스트하기', 'Nochmal machen')}
          </button>
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className="mb-8 text-center">
        <h1 className="mb-2 text-xl font-bold text-[#e8dcc8]">
          {getLoc('你是哪位动物森友会村民？', 'Which Animal Crossing Villager Are You?', '你是哪位動物森友會村民？', 'あなたはどのあつ森の住民？', '당신은 어떤 동물의 숲 주민인가요?', 'Welcher Animal Crossing Dorfbewohner bist du?')}
        </h1>
        <p className="text-sm text-[#8a9a7a]">
          {getLoc('6 个问题，找到最像你的那位村民', '6 questions to find your ACNH villager match', '6 個問題，找到最像你的那位村民', '6問でわかる！あなたにぴったりのあつ森住民', '6가지 질문으로 찾아보세요, 당신과 닮은 동물의 숲 주민을', '6 Fragen, um deinen perfekten ACNH-Dorfbewohner zu finden')}
        </p>
      </div>

      <div className="space-y-6">
        {QUESTIONS.map((q, qi) => (
          <div key={qi}>
            <p className="mb-3 font-medium text-[#e8dcc8]">
              {qi + 1}. {getLoc(q.q_zh, q.q_en, q.q_zhTW, q.q_ja, q.q_ko, q.q_de)}
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
                  {getLoc(opt.zh, opt.en, opt.zhTW, opt.ja, opt.ko, opt.de)}
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
        {getLoc('查看结果', 'See My Result', '查看結果', '結果を見る', '결과 보기', 'Ergebnis anzeigen')}
      </button>
    </div>
  )
}
