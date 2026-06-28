'use client'

import { useState } from 'react'
import { BASE_URL } from '@/lib/config'

type Pick = 'pokesnap' | 'alba' | 'toem' | 'umurangi'

function ShareButton({ text, locale }: { text: string; locale: string }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`

  const copyLabel = (() => {
    if (copied) {
      if (locale === 'zh') return '已复制！'
      if (locale === 'zh-TW') return '已複製！'
      if (locale === 'ja') return 'コピーしました！'
      if (locale === 'ko') return '복사됨!'
      if (locale === 'de') return 'Kopiert!'
      return 'Copied!'
    } else {
      if (locale === 'zh') return '复制结果'
      if (locale === 'zh-TW') return '複製結果'
      if (locale === 'ja') return '結果をコピー'
      if (locale === 'ko') return '결과 복사'
      if (locale === 'de') return 'Ergebnis kopieren'
      return 'Copy Result'
    }
  })()

  const shareLabel = (() => {
    if (locale === 'zh') return '分享到 X'
    if (locale === 'zh-TW') return '分享到 X'
    if (locale === 'ja') return 'X でシェア'
    if (locale === 'ko') return 'X에 공유'
    if (locale === 'de') return 'Auf X teilen'
    return 'Share on X'
  })()

  return (
    <div className="flex gap-3 justify-center flex-wrap">
      <button
        onClick={handleCopy}
        className="rounded-lg bg-[#2d3d2d] px-4 py-2 text-sm text-[#e8dcc8] transition-colors hover:bg-[#3d4d3d]"
      >
        {copyLabel}
      </button>
      <a
        href={tweetUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="rounded-lg bg-[#1a8cd8] px-4 py-2 text-sm text-white transition-colors hover:bg-[#1a7bc0]"
      >
        {shareLabel}
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
  options: Array<{ en: string; zh: string; zhTW: string; ja: string; ko: string; de: string; type: Pick }>
}> = [
  {
    q_en: 'What draws you most to cozy photography and nature observation games?',
    q_zh: '你最被治愈摄影和自然观察游戏的哪个方面吸引？',
    q_zhTW: '你最被療癒攝影和自然觀察遊戲的哪個方面吸引？',
    q_ja: '癒し系の自然写真・観察ゲームで一番惹かれるのはどんな部分？',
    q_ko: '힐링 자연 사진 및 관찰 게임에서 가장 끌리는 부분은 무엇인가요?',
    q_de: 'Was zieht dich am meisten an entspannenden Fotografie- und Naturbeobachtungsspielen an?',
    options: [
      {
        en: 'Discovering hidden moments in a beloved universe — finding the perfect Pokémon pose or secret behavior that no one else noticed',
        zh: '在心爱的宇宙中发现隐藏瞬间——找到那个完美的宝可梦姿势或从未有人注意到的秘密行为',
        zhTW: '在心愛的宇宙中發現隱藏瞬間——找到那個完美的寶可夢姿勢或從未有人注意到的秘密行為',
        ja: '大好きな世界で隠れた瞬間を発見すること——誰も気づかなかった完璧なポケモンのポーズや秘密の行動を見つける',
        ko: '좋아하는 세계에서 숨겨진 순간 발견하기——아무도 눈치채지 못한 완벽한 포켓몬 포즈나 비밀 행동 찾기',
        de: 'Versteckte Momente in einem geliebten Universum entdecken — die perfekte Pokémon-Pose oder ein geheimes Verhalten finden, das noch niemand bemerkt hat',
        type: 'pokesnap',
      },
      {
        en: 'Making a real difference — using photography as activism, documenting wildlife, and protecting what matters before it disappears',
        zh: '真正产生影响——用摄影作为行动，记录野生动物，在它们消失前保护值得保护的东西',
        zhTW: '真正產生影響——用攝影作為行動，記錄野生動物，在它們消失前保護值得保護的東西',
        ja: '本当に変化をもたらすこと——写真で社会に訴えかけ、野生動物を記録し、消える前に守る',
        ko: '실제로 변화 만들기——사진으로 행동하고, 야생동물을 기록하고, 사라지기 전에 보호하기',
        de: 'Wirklich etwas bewegen — Fotografie als Aktivismus nutzen, Wildtiere dokumentieren und schützen, bevor sie verschwinden',
        type: 'alba',
      },
      {
        en: 'The journey itself — photography is how I connect with quirky strangers and help them, one snapshot at a time',
        zh: '旅程本身——摄影是我与奇特陌生人建立联系并帮助他们的方式，一张张照片慢慢来',
        zhTW: '旅程本身——攝影是我與奇特陌生人建立聯繫並幫助他們的方式，一張張照片慢慢來',
        ja: '旅そのもの——写真を通して個性的な出会いをつなぎ、一枚ずつ丁寧に助けていく',
        ko: '여행 자체——사진으로 독특한 사람들과 연결되고 한 장 한 장 도움을 주는 방식',
        de: 'Die Reise selbst — Fotografie ist meine Art, mit skurrilen Fremden in Kontakt zu treten und ihnen zu helfen, ein Bild nach dem anderen',
        type: 'toem',
      },
      {
        en: 'Bearing witness — the world has gone wrong and I want to document it honestly, not look away',
        zh: '见证——这个世界已经偏轨，我想诚实地记录它，而不是转移视线',
        zhTW: '見證——這個世界已經偏軌，我想誠實地記錄它，而不是轉移視線',
        ja: '証言すること——世界は狂ってしまった。目を背けず、正直に記録したい',
        ko: '증언——세상이 잘못되어가고 있고, 외면하지 않고 솔직하게 기록하고 싶다',
        de: 'Bezeugen — die Welt ist aus den Fugen geraten, und ich möchte das ehrlich dokumentieren, ohne wegzuschauen',
        type: 'umurangi',
      },
    ],
  },
  {
    q_en: 'Which visual aesthetic speaks most powerfully to you?',
    q_zh: '哪种视觉美学最能打动你的内心？',
    q_zhTW: '哪種視覺美學最能打動你的內心？',
    q_ja: 'どのビジュアルスタイルが一番心に響く？',
    q_ko: '어떤 시각적 미학이 가장 마음에 와닿나요?',
    q_de: 'Welche visuelle Ästhetik spricht dich am stärksten an?',
    options: [
      {
        en: 'Vivid 3D nature environments with bold, saturated colors — lush jungles, glittering caves, crashing waterfalls, and creatures that pop with personality',
        zh: '色彩饱满的3D自然环境——茂密丛林、闪烁洞穴、飞溅瀑布，以及个性鲜明、生气勃勃的生物',
        zhTW: '色彩飽滿的3D自然環境——茂密叢林、閃爍洞穴、飛濺瀑布，以及個性鮮明、生氣勃勃的生物',
        ja: '鮮やかな3D自然環境——生い茂るジャングル、輝く洞窟、躍動する滝、個性あふれるポケモンたち',
        ko: '생생한 3D 자연 환경——울창한 정글, 반짝이는 동굴, 쏟아지는 폭포, 개성 넘치는 생물들',
        de: 'Lebendige 3D-Naturumgebungen mit satten Farben — üppige Dschungel, glitzernde Höhlen, rauschende Wasserfälle und Pokémon voller Persönlichkeit',
        type: 'pokesnap',
      },
      {
        en: 'Soft 3D warmth bathed in Mediterranean light — white-walled villages, sun-drenched hillsides, and real bird species rendered with quiet love',
        zh: '沐浴在地中海光线中的柔和3D温暖——白墙小村、阳光照耀的山坡，以及用安静的爱渲染的真实鸟类',
        zhTW: '沐浴在地中海光線中的柔和3D溫暖——白牆小村、陽光照耀的山坡，以及用安靜的愛渲染的真實鳥類',
        ja: '地中海の光に包まれた柔らかな3D温かみ——白壁の村、陽光降り注ぐ丘、丁寧に描かれた実在の鳥たち',
        ko: '지중해 빛에 감싸인 부드러운 3D 따뜻함——하얀 벽 마을, 햇살 가득한 언덕, 조용한 사랑으로 표현된 실제 조류',
        de: 'Sanfte 3D-Wärme im Mittelmeer-Licht — weiße Dörfer, sonnenbeschienene Hänge und echte Vogelarten mit liebevoller Sorgfalt gerendert',
        type: 'alba',
      },
      {
        en: 'Black-and-white hand-drawn charm with gentle Nordic folk-art vibes — a world that looks like a children\'s book made with real care and wit',
        zh: '黑白手绘的温馨风格，带有北欧民间艺术气息——一个看起来像是用真心和智慧制作的儿童读物的世界',
        zhTW: '黑白手繪的溫馨風格，帶有北歐民間藝術氣息——一個看起來像是用真心和智慧製作的兒童讀物的世界',
        ja: '黒白の手描きイラスト風、北欧フォークアートの雰囲気——愛情と遊び心で作られた絵本みたいな世界',
        ko: '흑백 손그림 감성, 북유럽 민속 예술 분위기——진심과 위트로 만든 그림책 같은 세계',
        de: 'Schwarz-weißer Handzeichnungs-Charme mit nordischem Folk-Art-Flair — eine Welt, die wie ein liebevoll gestaltetes Kinderbuch aussieht',
        type: 'toem',
      },
      {
        en: 'Gritty, saturated near-future dystopia — orange skies, military checkpoints, crumbling infrastructure, and beauty hiding inside the ruin',
        zh: '粗粝而色彩浓烈的近未来反乌托邦——橙色天空、军事检查站、崩塌的基础设施，以及藏在废墟里的美',
        zhTW: '粗礪而色彩濃烈的近未來反烏托邦——橙色天空、軍事檢查站、崩塌的基礎設施，以及藏在廢墟裡的美',
        ja: 'ざらついた質感の近未来ディストピア——オレンジの空、検問所、崩れゆくインフラ、廃墟の中に潜む美しさ',
        ko: '거친 질감의 근미래 디스토피아——주황빛 하늘, 군사 검문소, 무너지는 인프라, 폐허 속에 숨은 아름다움',
        de: 'Düstere, gesättigte Nah-Zukunfts-Dystopie — orangene Himmel, Militär-Checkpoints, zerfallende Infrastruktur und Schönheit inmitten der Ruinen',
        type: 'umurangi',
      },
    ],
  },
  {
    q_en: 'How do you feel about challenge and mastery in photography games?',
    q_zh: '在摄影游戏中，你怎么看待挑战和精通？',
    q_zhTW: '在攝影遊戲中，你怎麼看待挑戰和精通？',
    q_ja: '写真ゲームでの難しさや上達についてどう思う？',
    q_ko: '사진 게임에서 도전과 숙련에 대해 어떻게 생각하나요?',
    q_de: 'Wie stehst du zu Herausforderung und Können in Fotografiespielen?',
    options: [
      {
        en: 'I love it — finding the four-star shot requires real skill, patience, and knowledge of each creature\'s behavior, and that expertise feels earned',
        zh: '非常享受——找到四星照片需要真正的技巧、耐心和对每种生物行为的了解，这种专业感来之不易',
        zhTW: '非常享受——找到四星照片需要真正的技巧、耐心和對每種生物行為的了解，這種專業感來之不易',
        ja: '大好き——四つ星写真を撮るには各ポケモンの行動を理解する本物のスキルと忍耐が必要で、その達成感がたまらない',
        ko: '정말 좋아요——별 4개 사진을 찍으려면 각 생물의 행동을 이해하는 진짜 실력과 인내가 필요하고, 그 성취감이 진짜예요',
        de: 'Ich liebe es — den Viersternen-Shot zu finden erfordert echtes Können, Geduld und Wissen über das Verhalten jedes Pokémon, und das fühlt sich verdient an',
        type: 'pokesnap',
      },
      {
        en: 'Very low pressure — I want to document things and feel good about it, without any rating system second-guessing my eye',
        zh: '几乎没有压力——我想记录事物并为此感到满足，不需要任何评分系统质疑我的眼光',
        zhTW: '幾乎沒有壓力——我想記錄事物並為此感到滿足，不需要任何評分系統質疑我的眼光',
        ja: 'プレッシャーほぼゼロ——評価システムなしで、ただ記録して満足感を得たい',
        ko: '거의 압박 없음——평가 시스템 없이 그냥 기록하고 만족감을 느끼고 싶어요',
        de: 'Kaum Druck — ich möchte Dinge dokumentieren und mich dabei gut fühlen, ohne ein Bewertungssystem, das meinen Blick in Frage stellt',
        type: 'alba',
      },
      {
        en: 'Puzzle-solving — figuring out which photo will help which character is a gentle challenge that keeps the photography purposeful',
        zh: '解谜感——弄清楚哪张照片能帮助哪位角色，这种温和的挑战让摄影保持目的性',
        zhTW: '解謎感——弄清楚哪張照片能幫助哪位角色，這種溫和的挑戰讓攝影保持目的性',
        ja: 'パズル感覚——どの写真がどのキャラクターを助けるか考える穏やかな謎解きが、撮影に意味を持たせてくれる',
        ko: '퍼즐 느낌——어떤 사진이 어떤 캐릭터에게 도움이 될지 알아내는 부드러운 도전이 사진 찍기에 목적의식을 줘요',
        de: 'Rätsel lösen — herausfinden, welches Foto welchem Charakter hilft, ist eine sanfte Herausforderung, die dem Fotografieren einen Sinn gibt',
        type: 'toem',
      },
      {
        en: 'Technical and compositional — I want to think about framing, light, and subject within an environment that rewards artistic attention',
        zh: '技术感和构图感——我想在奖励艺术关注的环境中思考构图、光线和主题',
        zhTW: '技術感和構圖感——我想在獎勵藝術關注的環境中思考構圖、光線和主題',
        ja: '技術的・構図的——光や構図、被写体を意識しながら、芸術的センスが報われる環境で撮りたい',
        ko: '기술적이고 구도적——예술적 감각을 보상받는 환경에서 구도, 빛, 피사체를 생각하며 찍고 싶어요',
        de: 'Technisch und kompositorisch — ich möchte über Bildausschnitt, Licht und Motiv nachdenken in einer Umgebung, die künstlerische Aufmerksamkeit belohnt',
        type: 'umurangi',
      },
    ],
  },
  {
    q_en: 'How important is narrative and emotional depth to you?',
    q_zh: '叙事和情感深度对你有多重要？',
    q_zhTW: '敘事和情感深度對你有多重要？',
    q_ja: 'ストーリーや感情の深さはどのくらい大事？',
    q_ko: '서사와 감정적 깊이가 얼마나 중요한가요?',
    q_de: 'Wie wichtig sind Erzählung und emotionale Tiefe für dich?',
    options: [
      {
        en: 'Light touch — I care about the Pokémon lore and Professor Oak\'s encouragement, but story is secondary to the photography experience',
        zh: '轻描淡写即可——我在乎宝可梦的背景故事和大木博士的鼓励，但故事对摄影体验来说是次要的',
        zhTW: '輕描淡寫即可——我在乎寶可夢的背景故事和大木博士的鼓勵，但故事對攝影體驗來說是次要的',
        ja: '軽めでOK——ポケモンの設定やオーキド博士の励ましは好きだけど、ストーリーは写真体験より優先度低め',
        ko: '가볍게——포켓몬 설정과 오박사의 격려는 좋지만 스토리는 사진 체험보다 부차적이에요',
        de: 'Leichte Note — ich mag das Pokémon-Lore und Professor Eichs Ermutigung, aber die Geschichte ist zweitrangig gegenüber dem Fotografiererlebnis',
        type: 'pokesnap',
      },
      {
        en: 'Emotionally central — Alba\'s relationship with her grandparents, her growing activism, and the community\'s transformation give the photography real meaning',
        zh: '情感核心——阿尔芭与祖父母的关系、她日益增长的行动主义和社区的转变，赋予摄影真实的意义',
        zhTW: '情感核心——阿爾芭與祖父母的關係、她日益增長的行動主義和社區的轉變，賦予攝影真實的意義',
        ja: '感情が中心——アルバと祖父母の絆、彼女の行動、そして町の変化が撮影に本当の意味をもたらす',
        ko: '감정이 핵심——알바와 조부모의 관계, 그녀의 행동주의, 마을의 변화가 사진에 진짜 의미를 부여해요',
        de: 'Emotional zentral — Albas Beziehung zu ihren Großeltern, ihr wachsender Aktivismus und die Transformation der Gemeinschaft geben dem Fotografieren echte Bedeutung',
        type: 'alba',
      },
      {
        en: 'Character-driven — I want quirky encounters and warm mini-stories with every person I photograph for, not just beautiful images',
        zh: '角色驱动——我想要为每位拍摄对象经历奇特的邂逅和温馨的小故事，而不只是美丽的图像',
        zhTW: '角色驅動——我想要為每位拍攝對象經歷奇特的邂逅和溫馨的小故事，而不只是美麗的圖像',
        ja: 'キャラクター重視——撮影相手ごとに個性的な出会いと温かいミニストーリーを楽しみたい、綺麗な写真だけじゃなく',
        ko: '캐릭터 중심——사진 찍는 모든 사람과 독특한 만남과 따뜻한 미니 이야기를 경험하고 싶어요',
        de: 'Charaktergetrieben — ich möchte bei jeder Person, für die ich fotografiere, skurrile Begegnungen und warmherzige Mini-Geschichten erleben, nicht nur schöne Bilder',
        type: 'toem',
      },
      {
        en: 'Environmental storytelling — the narrative is told through what I see, not what characters say, and I prefer it that way',
        zh: '环境叙事——故事通过我所见之物讲述，而非角色所言，我更喜欢这种方式',
        zhTW: '環境敘事——故事通過我所見之物講述，而非角色所言，我更喜歡這種方式',
        ja: '環境で語るストーリー——キャラクターの台詞じゃなく、目に映るものが物語を紡ぐ。そのやり方が好き',
        ko: '환경 스토리텔링——캐릭터의 말이 아닌 보이는 것으로 이야기가 전달되는 방식을 선호해요',
        de: 'Umgebungs-Storytelling — die Geschichte wird durch das erzählt, was ich sehe, nicht durch das, was Charaktere sagen, und ich bevorzuge das so',
        type: 'umurangi',
      },
    ],
  },
  {
    q_en: 'What is your relationship with the natural and nonhuman world?',
    q_zh: '你与自然世界和非人类生命的关系是什么？',
    q_zhTW: '你與自然世界和非人類生命的關係是什麼？',
    q_ja: '自然や動物との関わり方について、どんなスタンス？',
    q_ko: '자연 세계와 비인간 생명과의 관계는 어떤가요?',
    q_de: 'Was ist deine Beziehung zur Natur und zur nichtmenschlichen Welt?',
    options: [
      {
        en: 'Joyful collector — I want to see incredible creatures doing incredible things, and I want to catalogue them with skill and affection',
        zh: '快乐的收藏者——我想看到不可思议的生物做出不可思议的事，并且用技巧和喜爱将它们编目',
        zhTW: '快樂的收藏者——我想看到不可思議的生物做出不可思議的事，並且用技巧和喜愛將它們編目',
        ja: '楽しいコレクター——すごい生き物がすごいことをするのを見て、愛情と技術で記録していきたい',
        ko: '즐거운 수집가——놀라운 생물들이 놀라운 일을 하는 걸 보고 실력과 애정으로 기록하고 싶어요',
        de: 'Freudiger Sammler — ich möchte unglaubliche Wesen in unglaublichen Momenten erleben und sie mit Können und Zuneigung katalogisieren',
        type: 'pokesnap',
      },
      {
        en: 'Conservation advocate — wildlife matters and human activity is destroying it, and games that make this feel urgent are doing important work',
        zh: '保育倡导者——野生动物很重要，人类活动正在摧毁它，让这种紧迫感真实呈现的游戏在做重要的工作',
        zhTW: '保育倡導者——野生動物很重要，人類活動正在摧毀它，讓這種緊迫感真實呈現的遊戲在做重要的工作',
        ja: '保護活動家——野生動物は大切だ。人間の活動が壊している現実を伝えるゲームには大きな意味がある',
        ko: '보전 활동가——야생동물은 소중하고 인간 활동이 파괴하고 있어요. 이 긴박함을 전하는 게임은 중요한 일을 해요',
        de: 'Naturschutz-Aktivist — Wildtiere sind wichtig und menschliche Aktivität zerstört sie, und Spiele, die das dringlich zeigen, leisten wichtige Arbeit',
        type: 'alba',
      },
      {
        en: 'Gentle observer — nature is one part of a bigger human world, and I love games where nature and community coexist peacefully',
        zh: '温柔的观察者——自然是更大人类世界的一部分，我喜欢自然与社区和平共存的游戏',
        zhTW: '溫柔的觀察者——自然是更大人類世界的一部分，我喜歡自然與社區和平共存的遊戲',
        ja: '優しい観察者——自然は人間社会の一部で、自然とコミュニティが穏やかに共存するゲームが好き',
        ko: '온화한 관찰자——자연은 더 큰 인간 세계의 일부이고, 자연과 공동체가 평화롭게 공존하는 게임을 좋아해요',
        de: 'Sanfter Beobachter — die Natur ist Teil einer größeren menschlichen Welt, und ich liebe Spiele, wo Natur und Gemeinschaft friedlich koexistieren',
        type: 'toem',
      },
      {
        en: 'Witness — the natural world is something to document and grieve and remember, especially when human systems are failing it',
        zh: '见证者——自然世界是值得记录、哀悼和铭记的东西，尤其是当人类系统正在失败于它的时候',
        zhTW: '見證者——自然世界是值得記錄、哀悼和銘記的東西，尤其是當人類系統正在辜負它的時候',
        ja: '証人——自然は記録し、悼み、記憶すべき存在。特に人間のシステムが自然を裏切っているとき',
        ko: '목격자——자연 세계는 기록하고, 애도하고, 기억해야 할 것이에요. 특히 인간 시스템이 그것을 저버리고 있을 때',
        de: 'Zeuge — die Natur ist etwas, das man dokumentieren, betrauern und erinnern sollte, besonders wenn menschliche Systeme sie im Stich lassen',
        type: 'umurangi',
      },
    ],
  },
  {
    q_en: 'Which of these sounds most like your ideal photography game session?',
    q_zh: '哪种最像你理想中的摄影游戏时光？',
    q_zhTW: '哪種最像你理想中的攝影遊戲時光？',
    q_ja: 'あなたの理想の写真ゲームセッションに一番近いのは？',
    q_ko: '당신의 이상적인 사진 게임 세션과 가장 비슷한 것은?',
    q_de: 'Welches klingt am ehesten nach deiner idealen Fotografiespiel-Sitzung?',
    options: [
      {
        en: 'Playing a level three times to finally capture the Scorbunny kicking an apple in mid-air for the four-star shot — pure elation when it lands',
        zh: '把一个关卡打了三遍，终于拍到火兔踢起空中苹果的四星瞬间——成功时那种纯粹的喜悦',
        zhTW: '把一個關卡打了三遍，終於拍到火兔踢起空中蘋果的四星瞬間——成功時那種純粹的喜悅',
        ja: 'レベルを三回やり直してついにヒバニーが空中でリンゴを蹴る四つ星シーンを撮れた——あの純粋な達成感',
        ko: '레벨을 세 번 다시 해서 드디어 히드야가 공중에서 사과를 차는 별 4개 순간을 찍은 것——성공했을 때의 순수한 기쁨',
        de: 'Ein Level dreimal spielen, um endlich Hopplo beim Tritt gegen einen fliegenden Apfel im Viersternen-Moment zu erwischen — pure Begeisterung, wenn es klappt',
        type: 'pokesnap',
      },
      {
        en: 'A peaceful afternoon documenting every bird in the reserve, signing the petition, watching the townsfolk gradually come around',
        zh: '一个宁静的午后，记录保护区里的每一种鸟，签署请愿书，看着镇民们逐渐转变立场',
        zhTW: '一個寧靜的午後，記錄保護區裡的每一種鳥，簽署請願書，看著鎮民們逐漸轉變立場',
        ja: '穏やかな午後に保護区の鳥を全部記録して、署名して、町の人たちが少しずつ変わっていくのを見届ける',
        ko: '평화로운 오후에 보호구역의 모든 새를 기록하고, 청원서에 서명하고, 마을 사람들이 서서히 바뀌는 걸 지켜보기',
        de: 'Ein ruhiger Nachmittag, jeden Vogel im Schutzgebiet dokumentieren, die Petition unterschreiben, den Bewohnern beim Umdenken zuzuschauen',
        type: 'alba',
      },
      {
        en: 'Meeting an eccentric lighthouse keeper who needs a photograph of something they have never seen before — then finding it and watching their face change',
        zh: '遇见一位古怪的灯塔管理员，他需要一张他从未见过的东西的照片——然后找到它，看着他的表情变化',
        zhTW: '遇見一位古怪的燈塔管理員，他需要一張他從未見過的東西的照片——然後找到它，看著他的表情變化',
        ja: '変わり者の灯台守に出会い、見たことのないものの写真が欲しいと頼まれる——それを見つけて、顔が変わる瞬間を見る',
        ko: '별난 등대지기를 만나 그가 한 번도 본 적 없는 것의 사진이 필요하다고——그것을 찾아서 그의 표정이 변하는 걸 보는 것',
        de: 'Einem exzentrischen Leuchtturmwärter begegnen, der ein Foto von etwas braucht, das er noch nie gesehen hat — es finden und sein Gesicht sich verändern sehen',
        type: 'toem',
      },
      {
        en: 'Standing on a rooftop at sunset in a crumbling city, composing the perfect shot of something beautiful the world is about to lose',
        zh: '在日落时分站在破败城市的屋顶，构图出一张即将消逝的美丽事物的完美照片',
        zhTW: '在日落時分站在破敗城市的屋頂，構圖出一張即將消逝的美麗事物的完美照片',
        ja: '夕暮れ時、崩れゆく都市の屋上に立って、世界が失おうとしている美しいものを完璧な一枚に収める',
        ko: '노을 지는 시간에 무너져가는 도시 옥상에 서서, 세상이 곧 잃어버릴 아름다운 것의 완벽한 사진을 찍는 것',
        de: 'Auf einem Dach einer zerfallenden Stadt bei Sonnenuntergang stehen und die perfekte Aufnahme von etwas Schönem komponieren, das die Welt bald verlieren wird',
        type: 'umurangi',
      },
    ],
  },
]

const RESULTS: Record<
  Pick,
  {
    title_en: string
    title_zh: string
    title_zhTW: string
    title_ja: string
    title_ko: string
    title_de: string
    emoji: string
    tag_en: string
    tag_zh: string
    tag_zhTW: string
    tag_ja: string
    tag_ko: string
    tag_de: string
    platform_en: string
    platform_zh: string
    platform_zhTW: string
    platform_ja: string
    platform_ko: string
    platform_de: string
    why_en: string
    why_zh: string
    why_zhTW: string
    why_ja: string
    why_ko: string
    why_de: string
    tip_en: string
    tip_zh: string
    tip_zhTW: string
    tip_ja: string
    tip_ko: string
    tip_de: string
  }
> = {
  pokesnap: {
    title_en: 'New Pokémon Snap',
    title_zh: '新宝可梦随乐拍',
    title_zhTW: '新寶可夢隨樂拍',
    title_ja: '新・みんなのポケモンスナップ',
    title_ko: '새로운 포켓몬 스냅',
    title_de: 'New Pokémon Snap',
    emoji: '📸',
    tag_en: 'The Expert Wildlife Photographer',
    tag_zh: '专业野生宝可梦摄影师',
    tag_zhTW: '專業野生寶可夢攝影師',
    tag_ja: '野生ポケモン専門フォトグラファー',
    tag_ko: '야생 포켓몬 전문 포토그래퍼',
    tag_de: 'Der Experten-Wildtier-Fotograf',
    platform_en: 'Nintendo Switch',
    platform_zh: 'Nintendo Switch',
    platform_zhTW: 'Nintendo Switch',
    platform_ja: 'Nintendo Switch',
    platform_ko: 'Nintendo Switch',
    platform_de: 'Nintendo Switch',
    why_en: `New Pokémon Snap (2021) is the rare Nintendo sequel that fully justifies a 21-year wait. The original Pokémon Snap (1999) was a rail-shooting photography game in which you rode through habitats photographing Pokémon for Professor Oak's research — a concept so genuinely delightful that players had wanted a sequel for over two decades. The 2021 version delivers that sequel with an expanded roster of over 200 Pokémon across multiple biomes (jungle, desert, night jungle, snowfields, ocean), a research rating system that rewards mastery and patience, and a progressive unlock structure that opens new paths and Pokémon behaviors as your relationship with each area deepens. The photography is not casual — finding the four-star shots requires real knowledge of each species' behavior: which Pokémon appears only at night, which emerges only if you play the flute at a specific location, which rare pose triggers only when a specific other Pokémon is in frame. This depth of engagement is what separates New Pokémon Snap from simpler photography games; the satisfaction of finally capturing a Meganium releasing its pollen in perfect light, after six failed attempts, is genuinely felt. The game is also visually spectacular — each biome is designed to show Pokémon doing things you always imagined they did but never saw in the main games, and the ecological attention to how different species interact creates an almost documentary quality. For players who grew up with Pokémon and want to experience the franchise through a lens of wonder and patience rather than battle, New Pokémon Snap is one of the most joyful games Nintendo has ever published.`,
    why_zh: `《新宝可梦随乐拍》（2021）是那种罕见的、足以证明等待21年值得的任天堂续作。2021年的续作提供了200多种宝可梦、多个生物群落（丛林、沙漠、夜间丛林、雪原、海洋）、奖励精通和耐心的研究评分系统，以及随着你与每个区域关系加深而开放新路径和宝可梦行为的渐进解锁结构。摄影并不随意——找到四星照片需要真正了解每个物种的行为：哪种宝可梦只在夜间出现，哪种只有在特定位置演奏笛子时才会出现，哪种稀有姿势只有当特定的另一只宝可梦在画面中时才会触发。游戏的生态关注度接近纪录片品质。对于那些带着好奇心和耐心而非对战心理体验这个系列的玩家来说，《新宝可梦随乐拍》是任天堂出版的最令人愉悦的游戏之一。`,
    why_zhTW: `《新寶可夢隨樂拍》（2021）是等待21年後終於到來的完美續作。遊戲包含200多種寶可夢、多個生態區（叢林、沙漠、夜間叢林、雪原、海洋），以及獎勵耐心和技巧的研究評分系統。隨著你與每個區域的關係加深，隱藏路徑和新的寶可夢行為會逐一解鎖。四星照片需要深入了解每種寶可夢的習性——哪種只在夜晚現身，哪種需要在特定地點吹笛才出現，哪種稀有姿勢需要特定的另一隻寶可夢同框才觸發。幻彩寶可夢是最高難度的攝影挑戰。對帶著好奇心和耐心探索寶可夢世界的玩家而言，這是任天堂出版過最令人愉悅的遊戲之一。`,
    why_ja: `「新・みんなのポケモンスナップ」（2021年）は21年の待望に応えた完璧な続編だ。200種以上のポケモン、複数のバイオーム（ジャングル、砂漠、夜のジャングル、雪原、海底）、そして忍耐と熟練を報いるリサーチ評価システムが揃っている。四つ星写真を撮るには各ポケモンの行動パターンの深い理解が必要——夜しか現れない種、特定の場所でふえふきをしないと出てこない種、特定の組み合わせでしか見せないポーズ。ポケモンが大好きで、対戦ではなく発見と観察の目線でシリーズを楽しみたいプレイヤーに最高の体験を与えてくれる。`,
    why_ko: `《새로운 포켓몬 스냅》(2021)은 21년의 기다림에 보답하는 완벽한 속편이다. 200종 이상의 포켓몬, 다양한 바이옴(정글, 사막, 야간 정글, 설원, 해저), 그리고 인내와 숙련을 보상하는 연구 평가 시스템을 갖추고 있다. 별 4개 사진을 찍으려면 각 포켓몬의 행동을 깊이 이해해야 한다——밤에만 나타나는 종, 특정 위치에서 피리를 불어야 등장하는 종, 특정 포켓몬이 함께 있어야 보이는 희귀 포즈. 전투가 아닌 관찰과 발견의 시선으로 포켓몬 세계를 경험하고 싶은 플레이어에게 최고의 게임이다.`,
    why_de: `New Pokémon Snap (2021) ist die seltene Nintendo-Fortsetzung, die eine 21-jährige Wartezeit wirklich rechtfertigt. Das Spiel bietet über 200 Pokémon in mehreren Biomen (Dschungel, Wüste, Nacht-Dschungel, Schneefelder, Ozean) und ein Forschungsbewertungssystem, das Geduld und Meisterschaft belohnt. Viersternen-Shots zu finden erfordert echtes Wissen über jede Spezies' Verhalten — welche Pokémon nur nachts erscheinen, welche nur beim Flötespielen, welche seltenen Posen nur mit bestimmten anderen Pokémon im Bild auftreten. Das Spiel ist visuell spektakulär und hat fast Dokumentar-Qualität in seiner ökologischen Aufmerksamkeit. Für Fans, die das Franchise aus einer Perspektive des Staunens statt des Kämpfens erleben möchten, ist es eines der schönsten Nintendo-Spiele.`,
    tip_en: `The key to mastering New Pokémon Snap is understanding that each course has multiple hidden paths and encounter triggers that only unlock as you increase your Research Level (RL) in that area. Never treat a course as "finished" just because you reached RL 3 — replay it at higher levels and you will discover entirely new Pokémon behaviors, secret locations, and four-star opportunities you could not have accessed earlier. The Professor Oak score is your primary progression metric: prioritize new and unseen shots over repeatedly photographing the same subject at higher quality. The Illumina mechanic (glowing Pokémon subspecies) is the game's deepest photography challenge — these legendary encounters have very specific trigger conditions in each area and yield the highest-scoring photographs in the game. The online sharing feature lets you compare your shots with the community's best, which is one of the most effective ways to learn which photographs you have been missing.`,
    tip_zh: `掌握《新宝可梦随乐拍》的关键在于理解每条路线都有多条隐藏路径和相遇触发器，只有当你提高该区域的研究等级（RL）时才能解锁。永远不要因为到达了RL3就认为一条路线"完成了"——在更高等级重玩它，你会发现全新的宝可梦行为、秘密地点和之前无法进入的四星机会。大木博士的分数是你的主要进度指标：优先拍摄新的和未见过的镜头，而不是重复以更高质量拍摄同一主体。幻彩机制（发光宝可梦亚种）是游戏中最深层的摄影挑战——这些传奇相遇在每个区域都有非常具体的触发条件，并能产出游戏中得分最高的照片。线上分享功能让你与社区最佳作品进行比较，这是发现自己遗漏了哪些照片的最有效方法之一。`,
    tip_zhTW: `提升研究等級（RL）是解鎖隱藏路徑和新行為的關鍵——即使到達RL3，每條路線都還有未探索的內容。優先拍攝全新種類而非重複拍攝同一寶可夢的更高品質照片，才能快速累積大木博士的分數。幻彩機制需要特定的觸發條件，值得反覆嘗試。每個區域的幻彩寶可夢相遇都是遊戲中得分最高的照片來源。線上分享功能讓你對照社群最高分作品，找出自己遺漏的精彩鏡頭。`,
    tip_ja: `リサーチレベル（RL）を上げるほど隠しルートや新たなポケモンの行動が解放されるので、RL3に到達しても「クリア」と思わないこと。新しい種の写真を優先的に撮ることがオーキド博士のスコアを伸ばす近道。イルミナ現象（光るポケモン）は各エリア独自のトリガー条件があり、ゲーム最高スコアの写真に繋がる。オンライン共有機能でコミュニティのベストショットと比較すると、見逃していた構図のヒントが得られる。`,
    tip_ko: `리서치 레벨(RL)을 높일수록 숨겨진 경로와 새로운 행동이 해금되므로 RL3에 도달했다고 끝났다고 생각하지 말 것. 같은 포켓몬을 더 높은 품질로 반복 촬영하기보다 새로운 종을 우선 찍는 것이 오박사 점수를 빠르게 올리는 방법이다. 이루미나 현상(빛나는 포켓몬)은 각 지역마다 고유한 트리거 조건이 있으며 게임 최고 점수 사진으로 이어진다. 온라인 공유 기능으로 커뮤니티 최고 작품과 비교하면 놓친 장면을 발견할 수 있다.`,
    tip_de: `Der Schlüssel liegt im Erhöhen des Forschungslevels (RL) — jeder Kurs hat versteckte Pfade, die sich erst bei höheren RLs öffnen. Behandle keinen Kurs als „fertig", sobald du RL3 erreicht hast. Priorisiere neue, noch nicht gesehene Aufnahmen gegenüber wiederholtem Fotografieren bekannter Subjekte, um Professor Eichs Score zu steigern. Die Illumina-Mechanik (leuchtende Pokémon) hat spezifische Trigger-Bedingungen in jedem Gebiet und liefert die höchsten Punktzahlen im Spiel. Die Online-Sharing-Funktion ermöglicht Vergleiche mit den besten Community-Shots — ein effektiver Weg, um herauszufinden, welche Fotos du noch nicht hast.`,
  },
  alba: {
    title_en: 'Alba: A Wildlife Adventure',
    title_zh: 'Alba: 野生动物大冒险',
    title_zhTW: 'Alba：野生動物大冒險',
    title_ja: 'Alba: ある野生動物の物語',
    title_ko: 'Alba: 야생동물 대모험',
    title_de: 'Alba: A Wildlife Adventure',
    emoji: '🐦',
    tag_en: 'The Young Conservation Activist',
    tag_zh: '年轻的自然保育行动者',
    tag_zhTW: '年輕的自然保育行動者',
    tag_ja: '若き自然保護活動家',
    tag_ko: '젊은 자연보호 활동가',
    tag_de: 'Die junge Naturschutz-Aktivistin',
    platform_en: 'PC · Switch · PS4/5 · Xbox · iOS · Android',
    platform_zh: 'PC · Switch · PS4/5 · Xbox · iOS · Android',
    platform_zhTW: 'PC · Switch · PS4/5 · Xbox · iOS · Android',
    platform_ja: 'PC · Switch · PS4/5 · Xbox · iOS · Android',
    platform_ko: 'PC · Switch · PS4/5 · Xbox · iOS · Android',
    platform_de: 'PC · Switch · PS4/5 · Xbox · iOS · Android',
    why_en: `Alba: A Wildlife Adventure (2020) is a game about a ten-year-old girl who spends a summer in her grandparents' Mediterranean coastal town and decides, against considerable local inertia, to save the nature reserve from being demolished for a hotel. Developed by Ustwo Games (the Monument Valley studio), Alba is both the most explicitly political cozy game on this list and the gentlest — it trusts its young players to care about real environmental issues without preaching and gives them the experience of making a meaningful difference through documentation, community organizing, and persistence. The photography in Alba is real-world bird and wildlife photography: you use your phone to photograph actual species (over 60 are in the game, with birdcall audio and field guide entries), and the act of documentation has functional consequences — photographs submitted to the wildlife app contribute to your campaign to protect the reserve. The game runs three to four hours and has a real ending, which gives it a storybook completeness that open-ended games cannot match. Alba has been praised particularly for how it handles environmentalism for young players — it shows that individuals can make a difference without lying to them that it is easy, and the town's gradual transformation from apathy to engagement is genuinely satisfying. For farming game fans who love nature and want a game that says something real about caring for it, Alba is one of the most honest and warm games in the genre.`,
    why_zh: `《Alba: 野生动物大冒险》（2020）讲述一个十岁女孩在祖父母的地中海海滨小镇度过暑假，并决定对抗相当大的地方惰性，拯救自然保护区免遭拆除改建成酒店的故事。由Ustwo Games（纪念碑谷的工作室）开发，Alba既是这份名单上最明确带有政治色彩的治愈游戏，也是最温柔的——它信任年轻玩家对真实环境问题的关怀，不说教地给予他们通过记录、社区组织和坚持产生实质影响的体验。游戏中的摄影是真实的野生动物摄影：你用手机拍摄真实物种（游戏中有60多种，包含鸟鸣音频和野外图鉴条目），记录行为产生功能性后果。游戏运行3至4小时并有真实结局，给予它开放式游戏无法匹配的童话完整感。`,
    why_zhTW: `《Alba：野生動物大冒險》（2020）講述十歲女孩阿爾芭在地中海海濱小鎮度過暑假，決心阻止自然保護區被改建成酒店的故事。由《紀念碑谷》工作室Ustwo Games開發，遊戲以真實的鳥類和野生動物攝影為核心——超過60種物種配有鳥鳴音效和野外圖鑑。拍下的照片對保護區行動有實際影響。遊戲約3至4小時並有完整結局，誠實地展示個人行動的力量，不誇大也不美化，鎮民從冷漠到參與的轉變令人感動。`,
    why_ja: `「Alba: ある野生動物の物語」（2020年）は、地中海の祖父母の町でひと夏を過ごす10歳の少女アルバが、自然保護区をホテル建設から守ろうと立ち上がる物語。Monument Valleyのチームが開発したこの作品は、60種以上の実在する生き物を撮影する本格的な自然写真ゲームで、記録した写真が保護区救済キャンペーンに直接影響する。3〜4時間のプレイで完結し、個人の行動が変化を生む可能性を正直に、そして温かく描いている。自然が好きなファームゲームファンに特におすすめ。`,
    why_ko: `《Alba: 야생동물 대모험》(2020)은 지중해 해안 마을에서 여름을 보내는 열 살 소녀 알바가 호텔 건설로부터 자연보호구역을 지키려 나서는 이야기다. 《모뉴먼트 밸리》 팀이 개발한 이 작품은 60종 이상의 실제 생물을 촬영하는 정통 자연 사진 게임으로, 촬영한 사진이 보호구역 캠페인에 실질적인 영향을 미친다. 3~4시간의 플레이에 완결된 결말이 있어 동화 같은 완성도를 자랑한다. 마을 사람들이 무관심에서 참여로 바뀌어가는 과정이 감동적이며, 자연을 사랑하는 플레이어에게 따뜻하고 솔직한 작품이다.`,
    why_de: `Alba: A Wildlife Adventure (2020) handelt von einem zehnjährigen Mädchen, das einen Sommer in der Mittelmeer-Küstenstadt seiner Großeltern verbringt und beschließt, das Naturschutzgebiet vor dem Abriss für ein Hotel zu retten. Entwickelt von Ustwo Games (dem Monument Valley-Studio) ist Alba sowohl das explizit politischste als auch das sanfteste Cozy-Spiel dieser Liste. Die Fotografie ist echte Naturfotografie: über 60 Tierarten mit Vogelruf-Audio, deren Aufnahmen funktional zur Schutzgebiets-Kampagne beitragen. Das Spiel dauert drei bis vier Stunden und hat ein echtes Ende — seine ehrliche, unpredigende Darstellung individuellen Umweltschutzes macht es besonders wertvoll.`,
    tip_en: `Alba's 60+ wildlife species are spread across the town and reserve in specific locations and time-of-day windows — some birds only appear near water, others only in the morning, and several only appear after you have reached specific points in the story. The in-game wildlife guide shows which species you are missing and gives habitat clues, but the game does not waypoint every location, so genuine exploration is rewarded. The petition signatures are essential to the story's progression — do not ignore injured animals or the characters who need help, as these often unlock new supporters. Alba: A Wildlife Adventure is one of the few games where playing on mobile (iOS/Android) is a genuinely excellent choice, since using a phone to take photos of wildlife has an immediacy that feels more real than a controller. The game was also made free on Apple Arcade, so if you have a subscription, it is the most accessible way to play.`,
    tip_zh: `Alba的60多种野生动物物种分布在小镇和保护区的特定地点和时间段——一些鸟类只在水边出现，其他只在早晨，还有几种只在你达到故事特定节点后才会出现。游戏内野生动物指南显示你遗漏了哪些物种并给出栖息地线索，但游戏不会为每个地点设置路标，所以真实的探索会得到奖励。请愿签名对故事进展至关重要——不要忽视受伤的动物或需要帮助的角色，因为这些往往会解锁新的支持者。阿尔芭是少数在移动端（iOS/Android）游玩体验极佳的游戏之一，因为用手机拍摄野生动物的即时感比控制器更真实。该游戏也在Apple Arcade上免费提供，如果你有订阅，这是最便捷的游玩方式。`,
    tip_zhTW: `60多種野生動物分布在特定地點和時段——部分鳥類只在水邊、早晨，或完成特定故事節點後才會出現。遊戲內野外圖鑑提供棲息地線索，但不會顯示路標，真正的探索才有獎勵。請願簽名對故事推進至關重要——受傷動物和求助角色往往能解鎖新支持者。在iOS/Android上遊玩有種用手機拍鳥的真實感，體驗特別好。Apple Arcade訂閱用戶可免費暢玩。`,
    tip_ja: `60種以上の生き物は特定の場所と時間帯に出現する——水辺にしかいない鳥、朝だけ現れる種、特定のストーリー進行後にしか登場しない生き物も。ゲーム内図鑑が棲息地のヒントを教えてくれるが、ウェイポイントはないので自分で探索することが大切。署名集めはストーリー進行に重要——困っている動物やキャラクターを見逃すと支持者が増えない。iOS/Androidでのプレイは実際にスマホで野鳥を撮る感覚があってとても良い。Apple Arcadeで無料で遊べる。`,
    tip_ko: `60종 이상의 야생동물은 특정 장소와 시간대에 분산되어 있다——물가에서만 나타나는 새, 아침에만 등장하는 종, 특정 스토리 지점 이후에만 나오는 생물도 있다. 게임 내 도감이 서식지 힌트를 제공하지만 웨이포인트는 없어 탐험이 중요하다. 청원 서명은 스토리 진행에 필수——부상당한 동물과 도움이 필요한 캐릭터를 무시하면 새 지지자를 잠금 해제하지 못한다. iOS/Android에서 스마트폰으로 새를 찍는 느낌이 실제 같아 특히 좋다. Apple Arcade 구독자라면 무료로 즐길 수 있다.`,
    tip_de: `Albas über 60 Tierarten sind an spezifischen Orten zu bestimmten Tageszeiten zu finden — manche Vögel nur an Gewässern, andere nur morgens, einige erst nach Story-Fortschritt. Der In-Game-Naturführer zeigt fehlende Arten und gibt Habitat-Hinweise, setzt aber keine Wegpunkte, sodass echte Erkundung belohnt wird. Petition-Unterschriften sind für den Story-Verlauf entscheidend — verletzte Tiere und hilfsbedürftige Charaktere nicht ignorieren, da sie Unterstützer freischalten. Alba auf Mobilgeräten (iOS/Android) zu spielen ist empfehlenswert, da das Fotografieren per Smartphone besonders authentisch wirkt. Das Spiel ist auch kostenlos auf Apple Arcade verfügbar.`,
  },
  toem: {
    title_en: 'Toem',
    title_zh: 'Toem',
    title_zhTW: 'Toem',
    title_ja: 'Toem トエム',
    title_ko: 'Toem',
    title_de: 'Toem',
    emoji: '🗺️',
    tag_en: 'The Curious Wandering Photographer',
    tag_zh: '充满好奇心的漫游摄影师',
    tag_zhTW: '充滿好奇心的漫遊攝影師',
    tag_ja: '好奇心旺盛な旅するフォトグラファー',
    tag_ko: '호기심 넘치는 방랑 사진사',
    tag_de: 'Der neugierige Wanderfotograf',
    platform_en: 'PC · Switch · PS4/5',
    platform_zh: 'PC · Switch · PS4/5',
    platform_zhTW: 'PC · Switch · PS4/5',
    platform_ja: 'PC · Switch · PS4/5',
    platform_ko: 'PC · Switch · PS4/5',
    platform_de: 'PC · Switch · PS4/5',
    why_en: `Toem (2021) was developed by Something We Made, a Swedish studio, and it is one of those games that is genuinely difficult to describe without underselling it. On paper it is a black-and-white photography adventure game about a young person traveling to see the Toem (a natural phenomenon) with only their grandmother's vintage camera. In practice it is a gentle, witty, and occasionally profound game about the act of paying attention. Every character you meet has something they need, and most of what they need involves a photograph — of a specific bird, a cloud formation, a friend's face, a distant mountain. Finding these photographs requires you to look carefully at the world Toem has constructed, which is itself an act the game is quietly arguing for. The black-and-white aesthetic is intentional and striking: it makes the game's world feel timeless and handmade, removes the distraction of color so you focus on shape and composition, and gives even mundane subjects a photographic dignity that supports the game's theme. Toem runs four to five hours and has a specific ending, but the journey through its four distinct regions (a beach town, a forest, a snowy mountain, a city) feels unhurried and complete. The humor is gentle and Scandinavian — dry, warm, and occasionally surreal without ever becoming threatening. Toem has been called one of the most relaxing games ever made, and if you are a farming game player who loves patient, careful engagement with a small world that rewards close attention, Toem is quietly extraordinary.`,
    why_zh: `《Toem》（2021）由瑞典工作室Something We Made开发，是那种不拿"难以形容"作借口就很难描述的游戏。表面上，它是一款黑白摄影冒险游戏，讲述一个年轻人带着祖母的老式相机旅行去目睹Toem（一种自然现象）的故事。实际上，它是一款温柔、机智，偶尔深刻的关于"注意力"行为的游戏。你遇到的每个角色都有所需求，大多数需求都涉及一张照片——特定的鸟、一朵云的形状、朋友的脸、远山。找到这些照片需要你仔细观察Toem构建的世界，这本身就是游戏静静倡导的行为。黑白美学是刻意而引人注目的：它让游戏世界感觉永恒且手工制作，消除颜色的干扰让你专注于形状和构图，并赋予即使是平凡主题一种支持游戏主题的摄影尊严。游戏大约需要4到5小时完成，被称为有史以来最放松的游戏之一。`,
    why_zhTW: `《Toem》（2021）由瑞典工作室Something We Made開發，是一款以黑白手繪風格呈現的攝影冒險遊戲。你帶著祖母的老式相機旅行，為遇到的每個角色解決難題——大多數都需要一張特定的照片。遊戲的真正核心是「注意力」：仔細觀察這個精心建構的世界，用鏡頭捕捉被遺忘的細節。黑白美學消除了色彩干擾，讓你專注於形狀和構圖。約4至5小時完結，無評分壓力，被稱為史上最放鬆的遊戲之一。喜歡溫柔、細緻世界的玩家絕對不能錯過。`,
    why_ja: `「Toem」（2021年）はスウェーデンのSomething We Madeが開発した、白黒手描きの写真アドベンチャーゲーム。おばあちゃんのカメラを持って旅に出て、出会う人々の悩みを写真で解決していく。ゲームが本当に伝えたいのは「ていねいに見ること」の大切さ。評価システムなし、プレッシャーなし、ただ世界をよく見て、シャッターを切るだけ。黒白の美学は色の雑念をなくし、形と構図に集中させてくれる。4〜5時間で完結し、史上最もリラックスできるゲームと呼ばれ、のんびり丁寧に遊びたい人にぴったり。`,
    why_ko: `《Toem》(2021)은 스웨덴 스튜디오 Something We Made가 개발한 흑백 손그림 스타일의 사진 어드벤처 게임이다. 할머니의 카메라를 들고 여행하며 만나는 모든 사람의 고민을 사진으로 해결한다. 게임이 진짜 말하고 싶은 것은 「주의 깊게 바라보는 것」의 가치다. 평가 시스템도, 압박도 없이 그냥 세상을 잘 보고 셔터를 누르면 된다. 흑백 미학은 색의 방해 없이 형태와 구도에 집중하게 해준다. 4~5시간 완결로 역대 가장 힐링되는 게임 중 하나로 불린다.`,
    why_de: `Toem (2021) wurde von Something We Made, einem schwedischen Studio, entwickelt und ist schwer in Worte zu fassen. Auf dem Papier ist es ein schwarz-weißes Fotografie-Abenteuer über einen jungen Menschen, der mit der Vintage-Kamera seiner Großmutter reist, um das „Toem" zu erleben. In der Praxis ist es ein sanftes, witziges und gelegentlich tiefgründiges Spiel über die Kunst des genauen Hinschauens. Jeder Charakter braucht ein Foto von etwas Bestimmtem — und dieses zu finden erfordert echte Aufmerksamkeit für die Welt, die das Spiel still propagiert. Toem dauert vier bis fünf Stunden, hat kein Bewertungssystem und wurde als eines der entspannendsten Spiele aller Zeiten bezeichnet.`,
    tip_en: `Toem's photograph challenges are not rated or scored — there is no "best" shot, only "taken" or "not taken." This means you can complete every challenge without mastering photography technique, which keeps the game accessible and stress-free. The real skill in Toem is exploration: every region has hidden characters and challenges that do not appear on the map, accessible only by talking to everyone and exploring every corner of the environment. The bus schedule is important — you can only travel between regions at specific times, and rushing through a region to catch a bus means missing encounters. Let yourself miss the bus and stay longer in each area, especially the forest region, which has the most hidden content. The photograph album fills as a record of your journey, and reviewing it at the end of the game is one of its most quietly satisfying moments.`,
    tip_zh: `Toem的照片挑战没有评分——没有"最佳"镜头，只有"已拍"或"未拍"。这意味着你可以在不掌握摄影技巧的情况下完成所有挑战，保持游戏的可接触性和无压力感。Toem的真正技巧在于探索：每个地区都有不出现在地图上的隐藏角色和挑战，只能通过与每个人交谈和探索环境的每个角落来发现。公车时刻表很重要——你只能在特定时间在地区之间旅行，匆忙穿越一个地区赶公车意味着错过邂逅。让自己错过公车，在每个地区停留更长时间，尤其是森林地区，那里有最多的隐藏内容。照片集作为你旅程的记录慢慢填满，在游戏结束时回顾它是最安静但令人满足的时刻之一。`,
    tip_zhTW: `Toem的照片挑戰沒有評分，只有「拍了」或「沒拍」——這讓遊戲完全無壓力。真正的技巧在於探索：每個地區都有地圖上看不到的隱藏角色和挑戰，必須和每個人交談才能發現。公車時刻表很重要，但錯過公車不是壞事——在每個地區多停留，尤其是森林地區，那裡有最多的隱藏內容。最後回顧相冊是遊戲中最安靜卻最令人滿足的時刻之一。`,
    tip_ja: `写真チャレンジには点数評価がなく、「撮った」か「撮っていない」かだけ——完全にストレスフリー。真のコツは探索にある：各地域にはマップに表示されない隠しキャラやチャレンジがあり、全員と話さないと見つからない。バスの時刻表は重要だが、乗り遅れても問題なし——各地域にたっぷり時間を使って。特に森の地区は隠しコンテンツが豊富。ゲーム終盤にアルバムを見返す瞬間が、静かで心温まるこのゲームの醍醐味のひとつ。`,
    tip_ko: `Toem의 사진 챌린지에는 점수가 없고 「찍었다」와 「안 찍었다」뿐——완전히 스트레스 없는 구조다. 진짜 핵심은 탐험: 각 지역에는 지도에 표시되지 않는 숨겨진 캐릭터와 챌린지가 있어 모든 사람과 이야기해야 발견할 수 있다. 버스 시간표가 있지만 버스를 놓쳐도 괜찮다——각 지역에 여유 있게 머물자. 특히 숲 지역은 숨겨진 콘텐츠가 가장 많다. 마지막에 사진 앨범을 돌아보는 순간이 조용하지만 가장 만족스러운 장면 중 하나다.`,
    tip_de: `Toems Foto-Challenges werden nicht bewertet — es gibt kein „bestes" Bild, nur „gemacht" oder „nicht gemacht." Die eigentliche Herausforderung liegt in der Erkundung: Jede Region hat versteckte Charaktere und Aufgaben, die nicht auf der Karte erscheinen und nur durch Gespräche mit allen entdeckt werden. Den Bus zu verpassen ist kein Problem — nimm dir Zeit in jeder Region, besonders in der Waldregion mit den meisten versteckten Inhalten. Das Fotoalbum am Ende durchzublättern gehört zu den stillsten und befriedigendsten Momenten des Spiels.`,
  },
  umurangi: {
    title_en: 'Umurangi Generation',
    title_zh: 'Umurangi Generation',
    title_zhTW: 'Umurangi Generation',
    title_ja: 'Umurangi Generation',
    title_ko: 'Umurangi Generation',
    title_de: 'Umurangi Generation',
    emoji: '🌅',
    tag_en: 'The Dystopia Documentary Photographer',
    tag_zh: '反乌托邦纪录摄影师',
    tag_zhTW: '反烏托邦紀錄攝影師',
    tag_ja: 'ディストピア記録フォトグラファー',
    tag_ko: '디스토피아 기록 사진사',
    tag_de: 'Der Dystopie-Dokumentarfotograf',
    platform_en: 'PC · Nintendo Switch',
    platform_zh: 'PC · Nintendo Switch',
    platform_zhTW: 'PC · Nintendo Switch',
    platform_ja: 'PC · Nintendo Switch',
    platform_ko: 'PC · Nintendo Switch',
    platform_de: 'PC · Nintendo Switch',
    why_en: `Umurangi Generation (2020) is the most artistically ambitious photography game ever made and one of the most important games about climate and political crisis to emerge this decade. Developed by Naphtali Faulkner (Origame Digital), a Māori artist based in Aotearoa New Zealand, Umurangi Generation is set in Tauranga in a near-future where a kaijū attack and an authoritarian government response have created a fractured society. You play as a courier who also photographs — not for heroism or documentation in any official sense, but because you are there and the world is beautiful and terrible and someone should witness it. The photography is technically demanding: you have a selection of cameras and lenses to unlock, lighting conditions that vary dramatically between levels, and a brief list of objectives per area that push you to photograph specific things — neon signs, specific equipment, graffiti, creatures — in a way that requires compositional thought rather than spray-and-pray. What distinguishes Umurangi from other photography games is its political honesty: the setting depicts indigenous communities under military occupation, climate refugees, the aesthetics of state violence, and the quiet ways that marginalized communities build culture and beauty despite systemic pressure. This is not metaphorical — the game is named after the Māori word for the red sky at sunset, a color that appears throughout the game as both beauty and warning. Umurangi Generation has a dedicated and passionate fanbase who consider it one of the most important games of the 2020s, and if you want a photography game that challenges you artistically and does not look away from what the world is becoming, this is the one.`,
    why_zh: `《Umurangi Generation》（2020）是有史以来艺术上最有野心的摄影游戏，也是这十年来关于气候和政治危机最重要的游戏之一。由毛利艺术家Naphtali Faulkner（Origame Digital）开发，游戏设定在新西兰陶朗加的近未来，巨兽袭击和威权政府回应造就了一个碎裂的社会。你扮演一个同时进行摄影的快递员——不是为了英雄主义或任何官方意义上的记录，而是因为你就在那里，世界既美丽又可怕，应该有人来见证它。摄影在技术上很有挑战性：你有一系列相机和镜头可以解锁，每个关卡的光线条件变化显著。游戏以毛利语中日落红天的词命名，这种颜色贯穿整个游戏，既是美丽也是警示。它拥有一批热情的粉丝，他们认为这是2020年代最重要的游戏之一。`,
    why_zhTW: `《Umurangi Generation》（2020）是有史以來藝術野心最強的攝影遊戲，也是本十年最重要的氣候與政治危機遊戲之一。由毛利藝術家Naphtali Faulkner開發，設定在被巨獸攻擊和威權回應撕裂的近未來陶朗加。你扮演一位快遞員兼攝影師——不是為了英雄主義，而是因為世界既美麗又可怕，應該有人見證。攝影技術要求高，有多種相機和鏡頭可解鎖，光線條件因關卡而大幅變化。遊戲以毛利語「日落紅天」命名，紅色貫穿全局，既是美麗也是警示。`,
    why_ja: `「Umurangi Generation」（2020年）は、ゲーム史上最も芸術的に野心的な写真ゲームで、この10年の気候・政治危機を描いた最重要作の一つ。マオリ系アーティストNaphtali Faulknerによる作品で、怪獣の襲撃と権威主義的な政府対応に引き裂かれた近未来のタウランガを舞台にする。プレイヤーは配達員兼写真家——英雄的行為ではなく、世界が美しくも恐ろしく、誰かが見届けるべきだから撮る。ゲーム名はマオリ語で夕焼けの赤い空を意味し、その色がゲーム全体に美と警告として流れる。技術的に要求の高い写真体験を求める人に。`,
    why_ko: `《Umurangi Generation》(2020)은 역대 가장 예술적으로 야심찬 사진 게임이자 이 10년간 기후와 정치 위기를 다룬 가장 중요한 게임 중 하나다. 마오리 아티스트 Naphtali Faulkner가 개발했으며, 거대 괴물 공격과 권위주의적 정부 대응으로 분열된 근미래 타우랑가를 배경으로 한다. 플레이어는 택배부이자 사진사——영웅주의가 아니라 세상이 아름답고도 끔찍해서 누군가 목격해야 하기 때문에 찍는다. 게임 이름은 마오리어로 노을의 붉은 하늘을 뜻하며, 그 색이 아름다움과 경고로 게임 전체를 관통한다.`,
    why_de: `Umurangi Generation (2020) ist das künstlerisch ambitionierteste Fotografiespiel aller Zeiten und eines der wichtigsten Spiele über Klima- und politische Krise dieses Jahrzehnts. Entwickelt vom Māori-Künstler Naphtali Faulkner, spielt es in einem Nah-Zukunfts-Tauranga, zerrissen durch Kaijū-Angriff und autoritäre Regierungsreaktion. Du spielst einen Kurier, der auch fotografiert — nicht aus Heroismus, sondern weil du da bist und die Welt schön und schrecklich ist. Die Fotografie ist technisch anspruchsvoll, mit verschiedenen Kameras und Linsen. Das Spiel ist nach dem Māori-Wort für den roten Abendhimmel benannt — eine Farbe, die als Schönheit und Warnung durch das Spiel fließt.`,
    tip_en: `Umurangi Generation rewards time and attention more than any other photography game — the brief level objectives are there to get you moving, but the real game is in everything else the environment contains. Every level has far more to see than the objectives require: graffiti in indigenous languages, background scenes that tell stories about characters who have no speaking role, environmental details that build the lore of the near-future world. Take every photograph opportunity, not just the ones that complete objectives. The Macro DLC adds microscopic photography to the game, which is a genuinely different experience from the main game and introduces a whole new compositional vocabulary. The game's soundtrack (by Origame Digital and contributors) is an essential part of the experience — play with headphones for the full effect of how the music's genre shifts between levels reflect the tonal shifts between environments.`,
    tip_zh: `《Umurangi Generation》比任何其他摄影游戏都更奖励时间和注意力——简短的关卡目标是让你行动起来的，但真正的游戏在于环境包含的其他一切。每个关卡都有比目标要求多得多的内容：土著语言涂鸦、讲述没有台词角色故事的背景场景、构建近未来世界背景知识的环境细节。拍摄每一个摄影机会，而不只是完成目标的那些。Macro DLC为游戏添加了微观摄影，这与主游戏是完全不同的体验，引入了全新的构图词汇。游戏的原声音乐（由Origame Digital及贡献者制作）是体验的重要组成部分——戴耳机感受音乐在关卡间的风格转变如何反映环境间的基调转换。`,
    tip_zhTW: `關卡目標只是讓你開始行動——真正的遊戲在環境裡的一切其他細節中。土著語言塗鴉、沒有台詞的背景角色故事、構建近未來世界觀的環境線索，都等著你去發現。拍下所有機會，不只是完成目標的那些。Macro DLC加入微觀攝影，帶來全新的構圖詞彙。戴上耳機感受原聲音樂在關卡間的風格轉換，那是理解遊戲情感層次的重要部分。`,
    tip_ja: `ステージ目標はきっかけに過ぎない——本当のゲームは環境の中の他のすべてにある。先住民族言語のグラフィティ、台詞のない登場人物の背景ストーリー、近未来世界のロアを積み上げる環境の細部。目標だけでなく、すべての撮影機会を逃さないように。Macro DLCはミクロ写真を追加し、まったく異なる構図体験を与えてくれる。ヘッドフォンでプレイすることを強くすすめる——ステージごとに変わる音楽ジャンルが環境の色調転換を完璧に支える。`,
    tip_ko: `스테이지 목표는 시작점일 뿐——진짜 게임은 환경 속 모든 나머지에 있다. 원주민 언어 그라피티, 대사 없는 배경 캐릭터들의 이야기, 근미래 세계관을 쌓아가는 환경 세부 묘사를 놓치지 말 것. 목표만이 아니라 모든 촬영 기회를 담자. Macro DLC는 미세 사진 촬영을 추가해 완전히 다른 구도 체험을 선사한다. 이어폰을 착용하고 플레이하기를 강력 추천——스테이지마다 바뀌는 음악 장르가 환경의 감정 변화를 완벽하게 지지한다.`,
    tip_de: `Umurangi Generation belohnt Zeit und Aufmerksamkeit mehr als jedes andere Fotografiespiel — die kurzen Level-Ziele sind ein Anfang, aber das eigentliche Spiel liegt in allem anderen. Graffiti in indigenen Sprachen, Hintergrundszenen sprachloser Charaktere, Umgebungsdetails, die die Lore der Nah-Zukunft aufbauen. Fotografiere alles, nicht nur was Ziele erfordern. Das Macro DLC fügt Mikrofotografie hinzu — eine völlig andere kompositorische Erfahrung. Spiele unbedingt mit Kopfhörern: Der Soundtrack wechselt das Genre zwischen Leveln und spiegelt die tonalen Verschiebungen der Umgebungen perfekt wider.`,
  },
}

function calcResult(answers: Pick[]): Pick {
  const counts: Record<Pick, number> = { pokesnap: 0, alba: 0, toem: 0, umurangi: 0 }
  for (const a of answers) counts[a]++
  return Object.entries(counts).sort((x, y) => y[1] - x[1])[0][0] as Pick
}

export function NaturePhotographyQuiz({ locale }: { locale: string }) {
  const [current, setCurrent] = useState(0)
  const [answers, setAnswers] = useState<Pick[]>([])
  const [result, setResult] = useState<Pick | null>(null)

  const getLoc = (zh: string, en: string, zhTW?: string, ja?: string, ko?: string, de?: string): string => {
    if (locale === 'zh') return zh
    if (locale === 'zh-TW') return zhTW ?? zh
    if (locale === 'ja') return ja ?? en
    if (locale === 'ko') return ko ?? en
    if (locale === 'de') return de ?? en
    return en
  }

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
    const shareText = (() => {
      if (locale === 'zh') return `我的自然摄影游戏推荐是《${r.title_zh}》！${r.emoji} 来测测你的结果？${BASE_URL}/zh/quizzes/nature-photography-quiz`
      if (locale === 'zh-TW') return `我的自然攝影遊戲推薦是《${r.title_zhTW}》！${r.emoji} 來測測你的結果？${BASE_URL}/zh-TW/quizzes/nature-photography-quiz`
      if (locale === 'ja') return `私の自然写真ゲームのおすすめは「${r.title_ja}」！${r.emoji} あなたの結果は？${BASE_URL}/ja/quizzes/nature-photography-quiz`
      if (locale === 'ko') return `내 자연 사진 게임 추천은 《${r.title_ko}》！${r.emoji} 당신의 결과는？${BASE_URL}/ko/quizzes/nature-photography-quiz`
      if (locale === 'de') return `Mein Natur-Fotografie-Spieltipp ist ${r.title_de}! ${r.emoji} Was ist deins? ${BASE_URL}/de/quizzes/nature-photography-quiz`
      return `My cozy nature photography game match is ${r.title_en}! ${r.emoji} Which one are you? ${BASE_URL}/en/quizzes/nature-photography-quiz`
    })()

    return (
      <div className="mx-auto max-w-2xl rounded-2xl border border-[#2d3d2d] bg-[#0f1a0f] p-6 md:p-8">
        <div className="mb-6 text-center">
          <div className="mb-3 text-6xl">{r.emoji}</div>
          <p className="mb-1 text-sm text-[#8a9a7a]">
            {getLoc(r.tag_zh, r.tag_en, r.tag_zhTW, r.tag_ja, r.tag_ko, r.tag_de)}
          </p>
          <h2 className="mb-2 text-2xl font-bold text-[#f0a832]">
            {getLoc(r.title_zh, r.title_en, r.title_zhTW, r.title_ja, r.title_ko, r.title_de)}
          </h2>
          <p className="text-sm text-[#8a9a7a]">
            {getLoc(r.platform_zh, r.platform_en, r.platform_zhTW, r.platform_ja, r.platform_ko, r.platform_de)}
          </p>
        </div>

        <div className="mb-6 rounded-xl bg-[#1a2e1a]/60 p-5 text-[#e8dcc8]">
          <p className="mb-4 leading-relaxed">
            {getLoc(r.why_zh, r.why_en, r.why_zhTW, r.why_ja, r.why_ko, r.why_de)}
          </p>
          <div className="border-t border-[#2d3d2d] pt-4">
            <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-[#f0a832]">
              {getLoc('游玩建议', 'Pro Tip', '遊玩建議', 'プロのコツ', '플레이 팁', 'Profi-Tipp')}
            </p>
            <p className="text-sm leading-relaxed text-[#c8bca8]">
              {getLoc(r.tip_zh, r.tip_en, r.tip_zhTW, r.tip_ja, r.tip_ko, r.tip_de)}
            </p>
          </div>
        </div>

        <div className="mb-6">
          <ShareButton text={shareText} locale={locale} />
        </div>

        <div className="mb-6 rounded-xl border border-[#f0a832]/20 bg-[#1a2e1a]/40 p-4 text-center">
          <p className="mb-1 text-xs text-[#8a9a7a]">
            {getLoc(
              '想每天发现最适合你的游戏？',
              'Want daily game picks matched to your mood?',
              '想每天發現最適合你的遊戲？',
              '毎日あなたに合ったゲームを見つけたい？',
              '매일 나에게 맞는 게임을 발견하고 싶다면?',
              'Täglich Spieletipps passend zu deiner Stimmung?',
            )}
          </p>
          <p className="text-sm text-[#e8dcc8]">
            {getLoc(
              '试试 TendFarm App — 每天根据你的状态，推荐一款最适合你的农场与自然游戏',
              'Try TendFarm App — personalized farming and nature game picks every day based on how you feel',
              '試試 TendFarm App — 每天根據你的狀態，推薦一款最適合你的農場與自然遊戲',
              'TendFarm App を試してみて——毎日あなたの気分に合わせた農場・自然ゲームをおすすめ',
              'TendFarm App을 써보세요 — 매일 당신의 기분에 맞는 농장·자연 게임을 추천해드려요',
              'Probiere die TendFarm App — täglich personalisierte Farming- und Naturspieltipps passend zu deiner Stimmung',
            )}
          </p>
        </div>

        <button
          onClick={reset}
          className="w-full rounded-xl border border-[#2d3d2d] py-2.5 text-sm text-[#8a9a7a] transition-colors hover:border-[#4d5d4d] hover:text-[#e8dcc8]"
        >
          {getLoc('重新测试', 'Retake Quiz', '重新測驗', 'もう一度テスト', '다시 테스트', 'Quiz wiederholen')}
        </button>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-2xl rounded-2xl border border-[#2d3d2d] bg-[#0f1a0f] p-6 md:p-8">
      <div className="mb-6">
        <div className="mb-3 flex items-center justify-between text-xs text-[#8a9a7a]">
          <span>
            {getLoc(
              `第 ${current + 1} / ${QUESTIONS.length} 题`,
              `Question ${current + 1} of ${QUESTIONS.length}`,
              `第 ${current + 1} / ${QUESTIONS.length} 題`,
              `第 ${current + 1} 問 / ${QUESTIONS.length} 問`,
              `${current + 1} / ${QUESTIONS.length} 번 문제`,
              `Frage ${current + 1} von ${QUESTIONS.length}`,
            )}
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
          {getLoc(q.q_zh, q.q_en, q.q_zhTW, q.q_ja, q.q_ko, q.q_de)}
        </h3>
      </div>

      <div className="flex flex-col gap-3">
        {q.options.map((opt, i) => (
          <button
            key={i}
            onClick={() => handleAnswer(opt.type)}
            className="rounded-xl border border-[#2d3d2d] bg-[#1a2e1a]/40 px-4 py-3 text-left text-sm text-[#e8dcc8] transition-all hover:border-[#f0a832]/40 hover:bg-[#1a2e1a] hover:text-[#f0a832]"
          >
            {getLoc(opt.zh, opt.en, opt.zhTW, opt.ja, opt.ko, opt.de)}
          </button>
        ))}
      </div>
    </div>
  )
}
