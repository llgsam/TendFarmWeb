'use client'

import { useState } from 'react'
import { BASE_URL } from '@/lib/config'

type Pick = 'spirittea' | 'immortal' | 'moonglow' | 'everdream'

function ShareButton({ text, locale }: { text: string; locale: string }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      window.open('https://twitter.com/intent/tweet?text=' + encodeURIComponent(text), '_blank')
    }
  }

  const copyLabel = copied
    ? (locale === 'zh' ? '✓ 已复制！' : locale === 'zh-TW' ? '✓ 已複製！' : locale === 'ja' ? '✓ コピーしました！' : locale === 'ko' ? '✓ 복사되었습니다!' : locale === 'de' ? '✓ Kopiert!' : '✓ Copied!')
    : (locale === 'zh' ? '📋 复制结果' : locale === 'zh-TW' ? '📋 複製結果' : locale === 'ja' ? '📋 結果をコピー' : locale === 'ko' ? '📋 결과 복사' : locale === 'de' ? '📋 Ergebnis kopieren' : '📋 Copy result')

  const shareLabel = locale === 'zh' || locale === 'zh-TW' ? '分享' : locale === 'ja' ? 'シェア' : locale === 'ko' ? '공유' : locale === 'de' ? 'Teilen' : 'Share'

  return (
    <div className="flex flex-1 gap-3">
      <button
        onClick={handleCopy}
        className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-[#2d3d2d] bg-[#1a2e1a]/50 px-4 py-3 text-sm text-[#e8dcc8] transition-colors hover:border-[#f0a832]/40 hover:text-[#f0a832]"
      >
        {copyLabel}
      </button>
      <a
        href={'https://twitter.com/intent/tweet?text=' + encodeURIComponent(text)}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 rounded-xl border border-[#2d3d2d] bg-[#1a2e1a]/50 px-4 py-3 text-sm text-[#e8dcc8] transition-colors hover:border-[#1d9bf0]/40 hover:text-[#1d9bf0]"
      >
        𝕏 {shareLabel}
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
    q_en: 'Which cultural aesthetic speaks to your soul?',
    q_zh: '哪种文化审美最让你心动？',
    q_zhTW: '哪種文化審美最讓你心動？',
    q_ja: 'あなたの心を揺さぶる文化的な雰囲気はどれ？',
    q_ko: '어떤 문화적 감성이 마음을 울리나요?',
    q_de: 'Welche kulturelle Ästhetik spricht deine Seele an?',
    options: [
      {
        en: 'Japanese Shinto folk culture — hot springs, forest spirits, and small-town warmth',
        zh: '日式神道民俗——温泉、山野妖怪和小镇的人情温度',
        zhTW: '日式神道民俗——溫泉、山野妖怪和小鎮的人情溫度',
        ja: '日本の神道と民俗文化——温泉、山の妖怪、小さな町の温かいつながり',
        ko: '일본 신토 민속 문화 — 온천, 산속 요괴, 작은 마을의 따뜻한 인정',
        de: 'Japanische Shinto-Volkskultur — Thermalbäder, Waldgeister und die Wärme kleiner Dörfer',
        type: 'spirittea',
      },
      {
        en: 'Chinese xianxia cultivation — sect life, spiritual energy, and ascending through realms',
        zh: '中国仙侠修炼——门派生活、灵气修炼和突破境界的升华感',
        zhTW: '中國仙俠修煉——門派生活、靈氣修煉和突破境界的升華感',
        ja: '中国の仙侠と修炼——门派の生活、霊気の修行、境地を超えていく解放感',
        ko: '중국 선협 수련 — 문파 생활, 영기 수행, 경지를 돌파할 때의 해방감',
        de: 'Chinesische Xianxia-Kultivierung — Sektenleben, spirituelle Energie und das Aufsteigen durch Reiche',
        type: 'immortal',
      },
      {
        en: 'Coastal North American fishing town — wooden docks, ocean mist, and quiet community life',
        zh: '北美海岸渔镇——木栈码头、海面薄雾和安静的小镇社区生活',
        zhTW: '北美海岸漁鎮——木棧碼頭、海面薄霧和安靜的小鎮社區生活',
        ja: '北米の沿岸漁師町——木製の桟橋、海の霧、静かなコミュニティの日々',
        ko: '북미 해안 어촌 — 나무 선착장, 바다 안개, 조용한 마을 공동체의 일상',
        de: 'Nordamerikanische Küstenfischergemeinde — Holzstege, Meeresnebel und das ruhige Gemeinschaftsleben',
        type: 'moonglow',
      },
      {
        en: 'European pastoral dreamscape — sun-warmed farmland, fairy-tale forests, and whimsical animals',
        zh: '欧式田园梦境——温暖农场、童话森林和古灵精怪的动物伙伴',
        zhTW: '歐式田園夢境——溫暖農場、童話森林和古靈精怪的動物夥伴',
        ja: 'ヨーロッパの牧歌的な夢景色——日差し暖かな農場、おとぎ話の森、個性豊かな動物たち',
        ko: '유럽 목가적 꿈의 풍경 — 햇살 가득한 농장, 동화 속 숲, 개성 넘치는 동물 친구들',
        de: 'Europäische Hirtenlandschaft — sonnenwarm bestrahltes Farmland, Märchenwälder und verspielte Tiere',
        type: 'everdream',
      },
    ],
  },
  {
    q_en: 'Which core fantasy sounds most appealing?',
    q_zh: '哪种核心幻想最吸引你？',
    q_zhTW: '哪種核心幻想最吸引你？',
    q_ja: '一番やってみたいゲームの体験はどれ？',
    q_ko: '가장 끌리는 게임 판타지는 뭔가요?',
    q_de: 'Welche Grundfantasie klingt am verlockendsten?',
    options: [
      {
        en: 'Running a hot spring bathhouse that serves invisible spirits, learning their unique stories one by one',
        zh: '经营一家专为妖怪精灵服务的温泉浴室，一个个了解它们藏在热气后的故事',
        zhTW: '經營一家專為妖怪精靈服務的溫泉浴室，一個個了解它們藏在熱氣後的故事',
        ja: '精霊たちのための温泉浴場を営み、湯気の向こうに隠された彼らの物語を一つひとつ知っていく',
        ko: '요정과 요괴만을 위한 온천탕을 운영하며 김 너머에 숨겨진 그들의 사연을 하나씩 알아가기',
        de: 'Ein Thermalbad für unsichtbare Geister betreiben und dabei ihre einzigartigen Geschichten kennenlernen',
        type: 'spirittea',
      },
      {
        en: 'Cultivating spiritual power and managing a sect farm that grows magical ingredients for your ascension',
        zh: '修炼灵力、管理门派农场，种出助你突破修炼瓶颈的灵材',
        zhTW: '修煉靈力、管理門派農場，種出助你突破修煉瓶頸的靈材',
        ja: '霊力を修行しながら門派の農場を経営し、突破のための霊材を育てる',
        ko: '영력을 수련하고 문파 농장을 경영하며 돌파를 위한 영초를 재배하기',
        de: 'Spirituelle Kraft kultivieren und eine Sektenfarm mit magischen Zutaten für den Aufstieg verwalten',
        type: 'immortal',
      },
      {
        en: 'Fishing in a quiet coastal town where every catch helps you heal from grief and reconnect with life',
        zh: '在宁静海湾垂钓，每一次收竿都帮你从失去中慢慢走出来，重新连结生活',
        zhTW: '在寧靜海灣垂釣，每一次收竿都幫你從失去中慢慢走出來，重新連結生活',
        ja: '静かな港町で釣りをしながら、一投ごとに悲しみを癒し、生きることへ繋がり直す',
        ko: '조용한 해안 마을에서 낚시를 하며 한 번씩 낚싯대를 거둘 때마다 슬픔에서 천천히 벗어나기',
        de: 'In einer ruhigen Küstenstadt angeln, wo jeder Fang dir hilft, Trauer zu verarbeiten und wieder mit dem Leben verbunden zu sein',
        type: 'moonglow',
      },
      {
        en: 'Befriending animals on a summer farm and entering their dream worlds to heal their hidden fears',
        zh: '在暑假农场结交各种动物，再潜入它们的梦境，帮它们疗愈深藏的恐惧',
        zhTW: '在暑假農場結交各種動物，再潛入它們的夢境，幫它們療癒深藏的恐懼',
        ja: '夏の農場で動物たちと友情を育て、彼らの夢の世界に入って隠れた恐怖を癒す',
        ko: '여름 농장에서 동물들과 친해진 뒤 꿈속으로 들어가 그들의 숨겨진 두려움을 치유하기',
        de: 'Tiere auf einer Sommerfarm anfreunden und in ihre Traumwelten eintreten, um verborgene Ängste zu heilen',
        type: 'everdream',
      },
    ],
  },
  {
    q_en: 'What kind of social bonds do you want to build in the game?',
    q_zh: '你希望在游戏里建立什么样的社交关系？',
    q_zhTW: '你希望在遊戲裡建立什麼樣的社交關係？',
    q_ja: 'ゲームの中でどんな人間関係を築きたい？',
    q_ko: '게임에서 어떤 관계를 맺고 싶나요?',
    q_de: 'Was für soziale Bindungen möchtest du im Spiel aufbauen?',
    options: [
      {
        en: 'Quirky supernatural beings with unique personalities and requests that reveal their hidden pain',
        zh: '千奇百怪的妖灵，每个都有独特个性和愿望，揭开它们背后令人心酸的故事',
        zhTW: '千奇百怪的妖靈，每個都有獨特個性和願望，揭開它們背後令人心酸的故事',
        ja: '個性豊かな妖怪や精霊たち——それぞれの願いと、その奥にある切ない物語',
        ko: '제각각 개성 있는 요령들 — 저마다의 소원과 그 뒤에 숨겨진 아프고 진심 어린 이야기들',
        de: 'Eigenwillige übernatürliche Wesen mit einzigartigen Persönlichkeiten, die ihren verborgenen Schmerz enthüllen',
        type: 'spirittea',
      },
      {
        en: 'Disciples and sect members whose growth you guide, building a legacy through training and care',
        zh: '招募弟子、培养门派成员，用指导和关怀建立传承',
        zhTW: '招募弟子、培養門派成員，用指導和關懷建立傳承',
        ja: '弟子や門派の仲間——育て、導き、世代をつなぐ絆',
        ko: '제자와 문파 동료들 — 키우고 이끌며 대를 잇는 유대',
        de: 'Schüler und Sektenmitglieder, die du anleitest, und dabei ein Erbe durch Fürsorge aufbaust',
        type: 'immortal',
      },
      {
        en: 'Townsfolk with real emotional weight — people dealing with loss, hope, and quiet daily struggles',
        zh: '有真实情感重量的镇民——和你一样在失去、希望和日常挣扎中前行的普通人',
        zhTW: '有真實情感重量的鎮民——和你一樣在失去、希望和日常掙扎中前行的普通人',
        ja: '本当の感情の重みを持つ町の人々——喪失や希望、日常の苦労と共に生きる人たち',
        ko: '진짜 감정의 무게를 지닌 마을 사람들 — 상실과 희망, 소소한 일상의 힘겨움 속에서 함께 살아가는 이들',
        de: 'Dorfbewohner mit echtem emotionalen Gewicht — Menschen, die mit Verlust, Hoffnung und stillen Alltäglichkeiten umgehen',
        type: 'moonglow',
      },
      {
        en: 'Animals whose trust you earn through patience — a silent emotional bond deeper than words',
        zh: '用耐心慢慢赢得信任的动物们——比语言更深的无声情感纽带',
        zhTW: '用耐心慢慢贏得信任的動物們——比語言更深的無聲情感紐帶',
        ja: '忍耐で少しずつ信頼を勝ち取る動物たち——言葉より深い、静かな絆',
        ko: '인내심으로 천천히 신뢰를 얻는 동물들 — 말보다 깊은 조용한 유대',
        de: 'Tiere, deren Vertrauen du durch Geduld verdienst — eine stille emotionale Bindung, tiefer als Worte',
        type: 'everdream',
      },
    ],
  },
  {
    q_en: 'How much progression and power growth do you want?',
    q_zh: '你希望游戏有多少进度感和力量成长？',
    q_zhTW: '你希望遊戲有多少進度感和力量成長？',
    q_ja: 'ゲームの成長や強さの要素はどのくらい欲しい？',
    q_ko: '게임에서 성장 요소가 얼마나 있으면 좋겠어요?',
    q_de: 'Wie viel Fortschritt und Stärkewachstum möchtest du?',
    options: [
      {
        en: 'Modest — unlocking new spirit-seeing abilities and bathhouse upgrades is satisfying enough',
        zh: '适中——解锁新的感灵能力和温泉升级就已经足够满足',
        zhTW: '適中——解鎖新的感靈能力和溫泉升級就已經足夠滿足',
        ja: '程よく——新しい霊感能力や温泉のアップグレードが解放されるくらいで十分',
        ko: '적당히 — 새로운 영감 능력과 온천 업그레이드가 해금되는 것만으로도 충분해요',
        de: 'Wenig — neue Geisterfähigkeiten und Thermalbad-Upgrades freizuschalten ist befriedigend genug',
        type: 'spirittea',
      },
      {
        en: 'Significant — watching my cultivation realm rise and my skills deepen is the whole point',
        zh: '这很重要——看着修炼境界一步步提升、功法越来越深厚才是游戏的核心乐趣',
        zhTW: '這很重要——看著修煉境界一步步提升、功法越來越深厚才是遊戲的核心樂趣',
        ja: 'しっかりと——修行の境地が上がり、技が深まっていく感覚こそがゲームの醍醐味',
        ko: '많이 — 수련 경지가 오르고 실력이 깊어지는 게 이 게임의 핵심이니까요',
        de: 'Viel — zuzusehen, wie mein Kultivierungsreich wächst und meine Fähigkeiten tiefer werden, ist der ganze Sinn',
        type: 'immortal',
      },
      {
        en: 'Minimal — I want slow days of fishing and cooking with no pressure to grow stronger',
        zh: '越少越好——我要的是悠闲垂钓和烹饪的慢日子，不需要任何变强的压力',
        zhTW: '越少越好——我要的是悠閒垂釣和烹飪的慢日子，不需要任何變強的壓力',
        ja: 'ほとんどいらない——のんびり釣りと料理の日々で、強くなる必要なんてない',
        ko: '거의 없어도 괜찮아요 — 여유롭게 낚시하고 요리하는 느린 하루가 전부예요',
        de: 'Kaum — ich will langsame Tage beim Angeln und Kochen ohne Druck, stärker zu werden',
        type: 'moonglow',
      },
      {
        en: 'Gentle — discovering new animals and unlocking their dream sequences is my version of progress',
        zh: '温和地推进——发现新动物、解锁新梦境就是我理解的进度感',
        zhTW: '溫和地推進——發現新動物、解鎖新夢境就是我理解的進度感',
        ja: 'そっと——新しい動物と出会い、夢のシーンが増えていくのが私なりの達成感',
        ko: '살짝만 — 새 동물을 만나고 꿈 시퀀스가 열리는 게 제 방식의 진행 감각이에요',
        de: 'Behutsam — neue Tiere entdecken und Traumsequenzen freischalten ist meine Version von Fortschritt',
        type: 'everdream',
      },
    ],
  },
  {
    q_en: 'Which art style and music would make you feel most at home?',
    q_zh: '哪种美术和音乐风格最让你有归属感？',
    q_zhTW: '哪種美術和音樂風格最讓你有歸屬感？',
    q_ja: 'どのアートスタイルと音楽に一番ホームを感じる？',
    q_ko: '어떤 아트 스타일과 음악에서 가장 편안함을 느끼나요?',
    q_de: 'Welcher Kunststil und welche Musik würden dich am meisten zu Hause fühlen lassen?',
    options: [
      {
        en: 'Pixel art sprites with warm lantern colors, and a lo-fi Japanese folk soundtrack',
        zh: '像素风格、温暖灯笼色调，配上低保真的日本民谣风配乐',
        zhTW: '像素風格、溫暖燈籠色調，配上低保真的日本民謠風配樂',
        ja: 'ドット絵と温かいランタンの色合い、ローファイな日本民謡風BGM',
        ko: '픽셀 아트와 따뜻한 등불 색감, 로파이 일본 민요풍 BGM',
        de: 'Pixel-Art-Sprites in warmen Laternenfarben und ein Lo-Fi-japanischer-Volksmusik-Soundtrack',
        type: 'spirittea',
      },
      {
        en: 'Ink-wash illustrations with a Chinese classical music undercurrent',
        zh: '带水墨质感的画风，中国古典音乐的底色悄悄流淌',
        zhTW: '帶水墨質感的畫風，中國古典音樂的底色悄悄流淌',
        ja: '水墨画の質感と、中国古典音楽がさらりと流れる世界',
        ko: '수묵화 같은 질감과 은은하게 흐르는 중국 고전 음악',
        de: 'Tuschmalerei-Illustrationen mit chinesischer klassischer Musik im Hintergrund',
        type: 'immortal',
      },
      {
        en: 'Voxel coastal scenery bathed in sea light, with a gentle acoustic soundtrack about longing',
        zh: '体素风格的海岸景色、浸在海光里，搭配关于思念的轻柔木吉他配乐',
        zhTW: '體素風格的海岸景色、浸在海光裡，搭配關於思念的輕柔木吉他配樂',
        ja: '海の光に包まれたボクセルの海岸景色と、切ない気持ちを奏でるアコースティックギター',
        ko: '바다 빛에 잠긴 복셀 해안 풍경과 그리움을 담은 어쿠스틱 기타 사운드트랙',
        de: 'Voxel-Küstenlandschaft im Meereslicht mit einem zarten akustischen Soundtrack über Sehnsucht',
        type: 'moonglow',
      },
      {
        en: 'Bright, saturated European farm art with a dreamy, playful music box score',
        zh: '明亮饱满的欧式农场画风，配上如梦如幻的音乐盒旋律',
        zhTW: '明亮飽滿的歐式農場畫風，配上如夢如幻的音樂盒旋律',
        ja: '明るく彩り豊かなヨーロッパ農場の絵と、夢見心地のオルゴールメロディ',
        ko: '밝고 채도 높은 유럽 농장 그림체와 꿈결 같은 오르골 멜로디',
        de: 'Helle, gesättigte europäische Farmkunst mit einer verspielten, traumhaften Spieluhrmelodie',
        type: 'everdream',
      },
    ],
  },
  {
    q_en: 'Which emotional tone are you most drawn to right now?',
    q_zh: '你现在最向往哪种情感调性？',
    q_zhTW: '你現在最嚮往哪種情感調性？',
    q_ja: '今、一番惹かれる感情のトーンは？',
    q_ko: '지금 가장 끌리는 감성은 뭔가요?',
    q_de: 'Welcher emotionale Ton zieht dich gerade am meisten an?',
    options: [
      {
        en: 'Warm and surprising — a world full of gentle weirdness, where every spirit has an unexpected heart',
        zh: '温暖而充满惊喜——一个温柔奇异的世界，每个妖灵都藏着出乎意料的赤诚之心',
        zhTW: '溫暖而充滿驚喜——一個溫柔奇異的世界，每個妖靈都藏著出乎意料的赤誠之心',
        ja: '温かくて驚きに満ちた——穏やかに不思議で、どの精霊も意外なほど真心を持っている世界',
        ko: '따뜻하고 놀라움 가득한 — 부드럽게 신비롭고, 모든 요령이 예상치 못한 진심을 품은 세계',
        de: 'Warm und überraschend — eine Welt voller sanfter Seltsamkeit, wo jeder Geist ein unerwartetes Herz trägt',
        type: 'spirittea',
      },
      {
        en: 'Satisfying and layered — the pleasure of strategic depth wrapped in a cozy cultivation fantasy',
        zh: '有满足感、有层次——策略深度包裹在治愈修仙幻想里的那种踏实快感',
        zhTW: '有滿足感、有層次——策略深度包裹在治癒修仙幻想裡的那種踏實快感',
        ja: '満足感と深み——コージーな仙侠ファンタジーに包まれた戦略の楽しさ',
        ko: '만족스럽고 층이 있는 — 아늑한 수련 판타지 안에 전략적 깊이가 녹아든 든든한 재미',
        de: 'Befriedigend und vielschichtig — das Vergnügen strategischer Tiefe verpackt in eine gemütliche Kultivierungsfantasie',
        type: 'immortal',
      },
      {
        en: 'Quietly melancholic but hopeful — a game that understands loss and still believes in moving forward',
        zh: '安静而忧郁，但充满希望——一款理解失去、依然相信向前走的游戏',
        zhTW: '安靜而憂鬱，但充滿希望——一款理解失去、依然相信向前走的遊戲',
        ja: '静かに哀愁を帯びているけど希望がある——喪失を理解しながらも前へ進むことを信じるゲーム',
        ko: '조용히 애수롭지만 희망이 있는 — 상실을 이해하면서도 앞으로 나아가는 것을 믿는 게임',
        de: 'Still melancholisch, aber hoffnungsvoll — ein Spiel, das Verlust versteht und trotzdem daran glaubt, vorwärts zu gehen',
        type: 'moonglow',
      },
      {
        en: 'Gentle and dreamlike — like a favorite picture book come to life that you never want to end',
        zh: '温柔而梦幻——像一本最爱的绘本活了过来，你舍不得翻到最后一页',
        zhTW: '溫柔而夢幻——像一本最愛的繪本活了過來，你捨不得翻到最後一頁',
        ja: '優しくて夢のよう——大好きな絵本が生きているみたいで、最後まで読み終わりたくない',
        ko: '부드럽고 꿈같은 — 가장 좋아하는 그림책이 살아 숨쉬는 것 같아서, 마지막 페이지로 넘기기 싫은',
        de: 'Sanft und traumhaft — wie ein Lieblingsbilgebuch, das zum Leben erwacht und das du nie beenden möchtest',
        type: 'everdream',
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
  spirittea: {
    title_en: 'Spirittea',
    title_zh: 'Spirittea',
    title_zhTW: 'Spirittea',
    title_ja: 'Spirittea',
    title_ko: 'Spirittea',
    title_de: 'Spirittea',
    emoji: '♨️',
    tag_en: 'The Spirit Innkeeper',
    tag_zh: '灵泉浴馆主人',
    tag_zhTW: '靈泉浴館主人',
    tag_ja: '精霊の湯屋の主人',
    tag_ko: '영천 온천탕 주인',
    tag_de: 'Der Geisterbad-Wirt',
    platform_en: 'PC · Nintendo Switch',
    platform_zh: 'PC · Nintendo Switch',
    platform_zhTW: 'PC · Nintendo Switch',
    platform_ja: 'PC · Nintendo Switch',
    platform_ko: 'PC · Nintendo Switch',
    platform_de: 'PC · Nintendo Switch',
    why_en: `Spirittea is a farming-adjacent life sim that draws directly from the same well as Spirited Away and Natsume's Book of Friends: a young person arrives in a small, fading hot spring town and discovers they can see the spirits that invisibly share the space with humans. The core premise — you must restore an old bathhouse and serve the local spirit community — is as cozy as it sounds, but the execution is richer than most players expect. Each spirit who visits your bathhouse has a distinct personality, a specific temperature preference, and an underlying problem in their relationship with the human world that you uncover through repeated interactions. The human side of the game is equally developed: the town has a cast of residents with their own schedules, problems, and secrets, and befriending them reveals why the town is declining and what the spirits need. The farming element in Spirittea is present but supplementary — you grow herbs and vegetables primarily to cook food that attracts specific spirit types and earns their trust. The real loop is bathhouse management: heating the water to the right temperature, keeping everything clean, choosing which spirits to accept each day, and gradually unlocking new areas of the spirit world. Spirittea is a remarkably original game that does not fit neatly into any existing category, which is precisely what makes it stand out. For players who have always wanted a Spirited Away game that takes the premise seriously and populates it with genuinely touching characters, this is as close as it gets.`,
    why_zh: `《Spirittea》是一款直接从《千与千寻》和《夏目友人帐》中汲取灵感的生活模拟游戏。你来到一个日渐衰落的温泉小镇，发现自己能看见与人类共享空间的妖灵。游戏的核心——修缮破旧浴馆、为妖灵社区提供服务——听起来简单，执行却远比想象的丰富。每个来访的妖灵都有独特性格、特定的水温偏好，以及你需要通过反复交流才能揭开的隐藏心结。人类居民同样有完整的日程和秘密，了解他们才能明白小镇衰落的真正原因。浴馆管理——调节水温、保持清洁、选择每天接待哪些妖灵——才是游戏的核心循环。农耕元素主要用于烹饪吸引特定妖灵的食物，是辅助性的但不可或缺。`,
    why_zhTW: `《Spirittea》是一款直接從《千與千尋》和《夏目友人帳》中汲取靈感的生活模擬遊戲。你來到一個日漸衰落的溫泉小鎮，發現自己能看見與人類共享空間的妖靈。遊戲的核心——修繕破舊浴館、為妖靈社區提供服務——聽起來簡單，執行卻遠比想像的豐富。每個來訪的妖靈都有獨特性格、特定的水溫偏好，以及你需要通過反覆交流才能揭開的隱藏心結。人類居民同樣有完整的日程和秘密，了解他們才能明白小鎮衰落的真正原因。浴館管理——調節水溫、保持清潔、選擇每天接待哪些妖靈——才是遊戲的核心循環。農耕元素主要用於烹飪吸引特定妖靈的食物，是輔助性的但不可或缺。`,
    why_ja: `『Spirittea』は、『千と千尋の神隠し』や『夏目友人帳』と同じ源泉から直接インスピレーションを受けたライフシムです。衰退しつつある小さな温泉町に来た主人公は、人間と空間を共有する精霊たちを見ることができると気づきます。古い浴場を修復し、地元の精霊コミュニティに奉仕するというコアコンセプトは聞こえほどコージーですが、実際はほとんどのプレイヤーが期待する以上に豊かな内容です。浴場を訪れる精霊にはそれぞれ独自の性格、特定の温度の好み、そして人間世界との関係における深層の問題があり、繰り返しの交流を通じて明かされます。町の住人たちも独自のスケジュール、悩み、秘密を持ち、彼らと親しくなることで、なぜ町が衰退しているのか、精霊たちが何を必要としているかが分かります。農耕要素は補助的なもので、特定の精霊を引き寄せる料理の材料を育てるために使います。Spirittea は既存のカテゴリに収まらない非常にオリジナルな作品で、それがまさに際立つ理由です。`,
    why_ko: `『Spirittea』는 『센과 치히로의 행방불명』과 『나쓰메 우인장』과 같은 원천에서 직접 영감을 받은 생활 시뮬레이션 게임입니다. 쇠락해 가는 작은 온천 마을에 온 주인공은 인간과 공간을 공유하는 정령들을 볼 수 있다는 걸 알게 됩니다. 낡은 목욕탕을 수리하고 지역 정령 공동체를 섬긴다는 핵심 전제는 들을수록 아늑하지만, 실제로는 대부분의 플레이어가 기대하는 것보다 훨씬 풍성합니다. 목욕탕을 찾는 각 정령에게는 독특한 개성, 선호하는 수온, 반복된 교류를 통해서만 드러나는 인간 세계와의 갈등이 있습니다. 마을 주민들도 완전한 일정과 비밀을 갖고 있어서, 그들을 이해해야 마을이 쇠락하는 진짜 이유와 정령들에게 필요한 것을 알 수 있습니다. 목욕탕 관리——수온 조절, 청결 유지, 매일 맞이할 정령 선택——이 게임의 핵심 루프입니다.`,
    why_de: `Spirittea ist eine Lebens-Simulation, die direkt aus der gleichen Quelle wie Chihiros Reise ins Zauberland und Natsumes Buch der Freunde schöpft: Eine junge Person kommt in eine kleine, schwindende Thermalstadt und entdeckt, dass sie die Geister sehen kann, die unsichtbar den Raum mit den Menschen teilen. Das Kernkonzept — ein altes Badehaus restaurieren und der lokalen Geistergemeinschaft dienen — ist so gemütlich wie es klingt, aber die Ausführung ist reicher als die meisten Spieler erwarten. Jeder Geist, der dein Badehaus besucht, hat eine eigene Persönlichkeit, eine spezifische Temperaturpräferenz und ein tiefliegendes Problem in seiner Beziehung zur menschlichen Welt, das du durch wiederholte Interaktionen enthüllst. Die menschliche Seite des Spiels ist genauso ausgearbeitet: Die Stadt hat Bewohner mit eigenen Zeitplänen, Problemen und Geheimnissen. Das Farmenelement in Spirittea ist vorhanden, aber ergänzend — du züchtest Kräuter und Gemüse hauptsächlich zum Kochen von Speisen, die bestimmte Geistertypen anziehen und ihr Vertrauen gewinnen.`,
    tip_en: `Pay close attention to each spirit's temperature preference from the very first visit — if you consistently get it wrong, they will stop coming back, and some are needed for story progression. The Tea mechanic (drinking the Spirittea itself) is how you switch between the spirit and human world view, so use it strategically when navigating town to spot spirits you might otherwise miss. Prioritize befriending the human townspeople early: their relationship levels gate story revelations about the spirits that dramatically change how you interact with certain characters. Finally, the farm plot behind the bathhouse is small — grow the herbs and vegetables that are hardest to buy from the market, not everything. You will always be able to buy basic produce.`,
    tip_zh: `从第一次来访开始就记住每个妖灵的水温偏好——长期调错温度会让它们不再光顾，而有些妖灵对剧情推进至关重要。Spirittea（灵茶）是切换妖灵视角和人类视角的机制，在镇上行走时策略性地使用，才能发现隐藏的妖灵。优先提升与人类镇民的好感度：他们的关系等级解锁关于妖灵的关键剧情，会彻底改变你与某些角色的互动方式。浴馆后面的农地很小——优先种市场上买不到或很贵的草药，普通蔬菜直接购买即可。`,
    tip_zhTW: `從第一次來訪開始就記住每個妖靈的水溫偏好——長期調錯溫度會讓它們不再光顧，而有些妖靈對劇情推進至關重要。Spirittea（靈茶）是切換妖靈視角和人類視角的機制，在鎮上行走時策略性地使用，才能發現隱藏的妖靈。優先提升與人類鎮民的好感度：他們的關係等級解鎖關於妖靈的關鍵劇情，會徹底改變你與某些角色的互動方式。浴館後面的農地很小——優先種市場上買不到或很貴的草藥，普通蔬菜直接購買即可。`,
    tip_ja: `最初の訪問から各精霊の温度の好みをしっかり覚えておきましょう——ずっと間違えると彼らは来なくなり、ストーリーの進行に必要な精霊もいます。Spirittea（霊茶）は精霊世界と人間世界の視点を切り替えるメカニズムです。町を歩くときに戦略的に使うと、見逃していた精霊に気づけます。人間の住人と早めに友好度を上げることを優先してください——関係レベルが特定の精霊に関する物語の真相を解き明かし、特定のキャラクターとの関わり方を根本から変えます。浴場裏の農地は小さいので、市場で買いにくいハーブや野菜を優先して育てましょう。基本的な農産物は購入で補えます。`,
    tip_ko: `첫 방문부터 각 정령의 수온 선호도를 잘 기억해두세요——계속 틀리면 그들이 다시 오지 않을 수 있는데, 스토리 진행에 필요한 정령도 있습니다. Spirittea(영차)는 정령 시점과 인간 시점을 전환하는 메커니즘입니다. 마을을 다닐 때 전략적으로 사용하면 놓쳤던 정령을 발견할 수 있습니다. 인간 마을 사람들과 일찍 친해지는 것을 우선시하세요——관계 레벨이 특정 정령에 관한 핵심 스토리를 열어주고, 일부 캐릭터와의 상호작용 방식을 완전히 바꿉니다. 목욕탕 뒤 농지는 작으니, 시장에서 사기 어렵거나 비싼 약초를 우선 심으세요. 기본 채소는 구매로 충당하면 됩니다.`,
    tip_de: `Achte von Anfang an auf die Temperaturpräferenz jedes Geistes — wenn du sie konsequent falsch einstellst, werden sie nicht mehr kommen, und manche werden für den Storyfortschritt benötigt. Der Spirittea-Mechanismus (das Trinken des Spiritteas selbst) ermöglicht dir den Wechsel zwischen Geister- und Menschenwelt-Perspektive, also setze ihn beim Durchqueren der Stadt strategisch ein, um Geister zu entdecken, die du sonst verpassen würdest. Priorisiere frühzeitig die Freundschaft mit den menschlichen Stadtbewohnern: Ihre Beziehungsebenen schalten wichtige Enthüllungen über die Geister frei, die die Interaktion mit bestimmten Charakteren grundlegend verändern. Die Ackerfläche hinter dem Badehaus ist klein — baue bevorzugt Kräuter an, die auf dem Markt schwer zu kaufen sind. Grundlegendes Gemüse kannst du immer kaufen.`,
  },
  immortal: {
    title_en: 'Immortal Life',
    title_zh: '仙武门',
    title_zhTW: '仙武門',
    title_ja: 'Immortal Life',
    title_ko: 'Immortal Life',
    title_de: 'Immortal Life',
    emoji: '🌸',
    tag_en: 'The Cultivation Farmer',
    tag_zh: '修仙农耕者',
    tag_zhTW: '修仙農耕者',
    tag_ja: '修行する農夫',
    tag_ko: '수련하는 농부',
    tag_de: 'Der Kultivierungs-Bauer',
    platform_en: 'PC',
    platform_zh: 'PC',
    platform_zhTW: 'PC',
    platform_ja: 'PC',
    platform_ko: 'PC',
    platform_de: 'PC',
    why_en: `Immortal Life (known in Chinese as Xian Wu Men, 仙武门) is the answer to a question that readers of xianxia cultivation novels have long asked of farming games: what if you were a martial cultivator who ran a spiritual farm? The game blends the well-loved mechanics of the farming sim genre — planting, harvesting, processing, selling — with the progression fantasy of Chinese cultivation fiction, where you advance through spiritual realms, unlock new powers, recruit disciples, and manage a sect. The farming is meaningfully tied to the cultivation: the spiritual herbs and crops you grow are ingredients for elixirs and tools that directly power your cultivation breakthrough attempts. This creates a more purposeful farming loop than most farming sims offer — every crop decision has a downstream effect on your martial progress. The game has a distinctly Chinese visual and musical identity that stands out sharply in a genre dominated by European pastoral or Japanese aesthetics. Sect management adds a light strategy layer as you recruit and assign disciples to tasks that would take too long to handle alone. Combat is present but intentionally light — the game is not an action RPG despite its cultivation setting, and most players will spend the majority of their time on the farm and in dialogue. Immortal Life is ideal for players who want a cozy farming sim with meaningful character progression, a non-Western cultural identity, and the specific satisfaction of the xianxia power-growth fantasy rendered in a peaceful, daily-rhythm format.`,
    why_zh: `《仙武门》（Immortal Life）是仙侠修炼小说读者长期以来对农场游戏的一个夙愿：如果你是一个同时经营灵田的武修者该多好？游戏将农场模拟类型的熟悉机制（种植、收获、加工、售卖）与仙侠小说的进阶幻想融合——突破修炼境界、解锁新功法、招募弟子、管理门派。农耕与修炼真正绑定：你种植的灵草和作物是炼制丹药、助力突破的关键原料，每一个种植决策都对修炼进程产生下游影响。游戏有鲜明的中国视觉和音乐风格，在以欧式田园或日式美学为主流的类型中格外突出。门派管理增加了轻度策略层：招募弟子并分配任务，独自处理太耗时的工作。`,
    why_zhTW: `《仙武門》（Immortal Life）是仙俠修煉小說讀者長期以來對農場遊戲的一個夙願：如果你是一個同時經營靈田的武修者該多好？遊戲將農場模擬類型的熟悉機制（種植、收穫、加工、售賣）與仙俠小說的進階幻想融合——突破修煉境界、解鎖新功法、招募弟子、管理門派。農耕與修煉真正綁定：你種植的靈草和作物是煉製丹藥、助力突破的關鍵原料，每一個種植決策都對修煉進程產生下游影響。遊戲有鮮明的中國視覺和音樂風格，在以歐式田園或日式美學為主流的類型中格外突出。門派管理增加了輕度策略層：招募弟子並分配任務，獨自處理太耗時的工作。`,
    why_ja: `『Immortal Life』（中国語タイトル：仙武門）は、仙侠修炼小説の読者が農場ゲームにずっと求めていた問いへの答えです——霊田を経営する武修者になれたら、という夢。農場シムの馴染みのメカニズム（植えること、収穫、加工、販売）と、中国修炼小説の成長ファンタジーを融合しています。修炼と農耕は意味深く連動しています——育てた霊草や作物は丹薬の材料となり、修炼の突破に直接つながります。これにより、ほとんどの農場シムより目的意識の高い農耕ループが生まれます。中国的な視覚・音楽的アイデンティティが、欧州的な牧歌的風景や日本的な美学が主流のジャンルの中で際立ちます。門派経営も入ってきて、弟子を採用し、一人ではこなしきれない作業を割り当てる軽いストラテジー要素があります。`,
    why_ko: `『Immortal Life』(仙武門)는 선협 수련 소설 독자들이 농장 게임에 오래 품어온 질문의 답입니다——영전을 경영하는 무수자가 될 수 있다면 얼마나 좋을까? 이 게임은 농장 시뮬레이션 장르의 익숙한 메커니즘(심기, 수확, 가공, 판매)과 중국 수련 소설의 성장 판타지를 융합합니다. 농경과 수련이 진정으로 연동됩니다——키운 영초와 작물이 단약 재료가 되어 수련 돌파에 직결됩니다. 대부분의 농장 시뮬에서보다 목적의식이 더 높은 농경 루프가 만들어집니다. 유럽 목가적 풍경이나 일본적 미학이 주류인 장르 안에서, 뚜렷한 중국적 시각·음악 정체성이 두드러집니다. 문파 경영도 있어서 제자를 모집하고 혼자선 다 하기 어려운 작업을 배치하는 가벼운 전략 요소가 있습니다.`,
    why_de: `Immortal Life (auf Chinesisch: 仙武門) ist die Antwort auf eine Frage, die Leser von Xianxia-Kultivierungsromanen schon lange an Farmspiele gestellt haben: Was wäre, wenn du ein Kampfkultivator wärst, der eine spirituelle Farm betreibt? Das Spiel verbindet die beliebten Mechaniken des Farming-Sim-Genres — Pflanzen, Ernten, Verarbeiten, Verkaufen — mit der Aufstiegsfantasie chinesischer Kultivierungsbelletristik, wo du durch spirituelle Reiche aufsteigst, neue Kräfte freischaltest, Schüler rekrutierst und eine Sekte verwaltest. Das Farming ist bedeutsam mit der Kultivierung verknüpft: die spirituellen Kräuter und Feldfrüchte, die du anbaust, sind Zutaten für Elixiere, die deine Kultivierungsdurchbrüche direkt antreiben. Dies schafft einen zielgerichteteren Farmzyklus — jede Anbauplanungsentscheidung hat nachgelagerte Auswirkungen auf deinen spirituellen Fortschritt. Das Spiel hat eine unverkennbar chinesische visuelle und musikalische Identität, die sich scharf von der europäisch-pastoralen oder japanischen Ästhetik abhebt, die das Genre dominiert.`,
    tip_en: `The most common mistake in Immortal Life is treating it like a pure farming sim and neglecting the cultivation progression. Your breakthrough attempts have a success rate influenced by how many spiritual elixirs you have stockpiled — run out before a major breakthrough and you will stall for many in-game seasons. Always plant at least one plot of your current highest-tier spirit herbs; they take longer to grow but have dramatically higher elixir value per tile. Recruit disciples as soon as the option becomes available — even low-ranked disciples significantly multiply your daily output by handling repetitive harvesting and processing tasks. The market prices fluctuate seasonally, so check which crops fetch premiums before planting each season.`,
    tip_zh: `《仙武门》最常见的错误是把它当纯农场模拟来玩，忽视修炼进度。突破尝试的成功率受你储备的灵丹数量影响——大突破前耗尽存粮，会在一个关卡停滞很多个游戏季节。始终保留至少一块种植当前最高级灵草的田地；虽然生长周期更长，但每格地的炼丹价值高出数倍。门派招募选项一开放就立刻招募弟子——即使低阶弟子也能通过处理重复收割和加工大幅提升每日产出。市场价格随季节波动，种植前查看哪种作物本季溢价最高。`,
    tip_zhTW: `《仙武門》最常見的錯誤是把它當純農場模擬來玩，忽視修煉進度。突破嘗試的成功率受你儲備的靈丹數量影響——大突破前耗盡存糧，會在一個關卡停滯很多個遊戲季節。始終保留至少一塊種植當前最高級靈草的田地；雖然生長週期更長，但每格地的煉丹價值高出數倍。門派招募選項一開放就立刻招募弟子——即使低階弟子也能通過處理重複收割和加工大幅提升每日產出。市場價格隨季節波動，種植前查看哪種作物本季溢價最高。`,
    tip_ja: `『Immortal Life』で一番多い失敗は、純粋な農場シムとして遊んで修炼の進度を疎かにすることです。突破試みの成功率は蓄えた霊丹の数に左右されます——重要な突破前に使い果たすと、何シーズンもそこで立ち往生することになります。常に最高ランクの霊草を少なくとも一区画育てましょう。生長期間は長めですが、一マス当たりの錬丹価値は格段に高いです。門派の招募オプションが解放されたらすぐに弟子を採りましょう——低ランクでも、繰り返しの収穫や加工をこなしてくれることで日々の産出量が大幅に増えます。市場価格は季節によって変動するので、各シーズンの植え付け前にどの作物が高値かチェックしましょう。`,
    tip_ko: `『仙武門』에서 가장 흔한 실수는 순수한 농장 시뮬처럼 플레이하며 수련 진도를 소홀히 하는 것입니다. 돌파 시도 성공률은 비축한 영단의 수에 영향을 받습니다——큰 돌파 전에 소진하면 여러 시즌 동안 한 고비에서 막힐 수 있습니다. 현재 최고 등급 영초를 심는 밭을 항상 최소 한 구획 유지하세요. 성장 기간은 길지만 칸당 단약 가치가 훨씬 높습니다. 문파 모집 옵션이 열리는 즉시 제자를 모집하세요——낮은 등급이라도 반복되는 수확과 가공을 처리해줌으로써 일일 산출량이 크게 늘어납니다. 시장 가격은 계절마다 변동하니 시즌마다 심기 전에 어떤 작물이 가장 높은 가격을 받는지 확인하세요.`,
    tip_de: `Der häufigste Fehler in Immortal Life ist, es wie ein reines Farming-Sim zu spielen und den Kultivierungsfortschritt zu vernachlässigen. Deine Durchbruchsversuche haben eine Erfolgsquote, die davon abhängt, wie viele spirituelle Elixiere du angehäuft hast — Vorräte vor einem wichtigen Durchbruch aufzubrauchen bedeutet, für viele Spielsaisons zu stagnieren. Baue immer mindestens ein Beet mit deinen aktuell hochrangigsten spirituellen Kräutern an; sie brauchen länger zum Wachsen, haben aber einen dramatisch höheren Elixierwert pro Feld. Rekrutiere Schüler, sobald die Option verfügbar wird — selbst niedrigrangige Schüler multiplizieren deinen täglichen Ertrag erheblich. Die Marktpreise schwanken saisonal, also prüfe vor dem Anbau jeder Saison, welche Feldfrüchte hohe Preise erzielen.`,
  },
  moonglow: {
    title_en: 'Moonglow Bay',
    title_zh: 'Moonglow Bay',
    title_zhTW: 'Moonglow Bay',
    title_ja: 'Moonglow Bay',
    title_ko: 'Moonglow Bay',
    title_de: 'Moonglow Bay',
    emoji: '🎣',
    tag_en: 'The Coastal Fisherman',
    tag_zh: '海湾渔者',
    tag_zhTW: '海灣漁者',
    tag_ja: '海辺の釣り人',
    tag_ko: '해안의 낚시꾼',
    tag_de: 'Der Küstenfischer',
    platform_en: 'PC · Xbox',
    platform_zh: 'PC · Xbox',
    platform_zhTW: 'PC · Xbox',
    platform_ja: 'PC · Xbox',
    platform_ko: 'PC · Xbox',
    platform_de: 'PC · Xbox',
    why_en: `Moonglow Bay is the fishing life sim that dares to take its emotional premise seriously. You and your partner had a dream of moving to a small coastal town and starting a fishing business together — but when tragedy strikes, you are left alone to honor that dream. The game begins in grief and unfolds as a story about how work, routine, community, and beauty can carry you through loss. The fishing mechanic is the deepest in its sub-genre: each species of fish requires different bait, rod types, timing, and ocean zones to catch, and learning the ocean's patterns is genuinely satisfying. Every fish you catch can be cooked into a range of dishes using a minigame cooking system, and these dishes are what you sell or gift to townsfolk. The town of Moonglow Bay has a small cast of residents who each carry their own quiet stories of what they lost and what keeps them going — the writing is warmer and more emotionally honest than most farming games manage. The game has a distinctive chunky voxel art style with coastal lighting that makes every sunrise on the water feel like a painting you want to live in. There is no combat, no crop stress, no energy that runs out — just the rhythm of waking up, heading to sea, catching something beautiful, cooking it, and sharing it with people who need it. Moonglow Bay is for players who want a farming-adjacent game with real emotional stakes, where the ocean is the farm and healing is the harvest.`,
    why_zh: `《Moonglow Bay》是一款敢于认真对待其情感前提的钓鱼生活模拟游戏。你和伴侣曾梦想搬到一个小渔镇共同开始钓鱼事业，但悲剧发生后，你只能独自承载这个梦想。游戏从悲伤开始，讲述工作、日常、社区和美好如何帮助一个人走过失去。钓鱼机制在同类游戏中最为深度：每种鱼类需要不同的鱼饵、鱼竿类型、时机和海域才能捕获。每条鱼都可以通过小游戏料理系统烹饪成一系列菜肴，再出售或赠予镇民。小镇居民各自背负着安静的失去与继续前行的故事，文字比大多数农场游戏更温暖也更情感诚实。没有战斗、没有作物压力、没有耗尽的体力——只有起床、出海、钓到美丽的东西、烹饪、分享的节奏。`,
    why_zhTW: `《Moonglow Bay》是一款敢於認真對待其情感前提的釣魚生活模擬遊戲。你和伴侶曾夢想搬到一個小漁鎮共同開始釣魚事業，但悲劇發生後，你只能獨自承載這個夢想。遊戲從悲傷開始，講述工作、日常、社區和美好如何幫助一個人走過失去。釣魚機制在同類遊戲中最為深度：每種魚類需要不同的魚餌、魚竿類型、時機和海域才能捕獲。每條魚都可以通過小遊戲料理系統烹飪成一系列菜餚，再出售或贈予鎮民。小鎮居民各自背負著安靜的失去與繼續前行的故事，文字比大多數農場遊戲更溫暖也更情感誠實。沒有戰鬥、沒有作物壓力、沒有耗盡的體力——只有起床、出海、釣到美麗的東西、烹飪、分享的節奏。`,
    why_ja: `『Moonglow Bay』は、その感情的な前提に真剣に向き合う釣りライフシムです。あなたとパートナーは小さな海辺の町に移り住み、一緒に釣り事業を始めるという夢を持っていました。しかし悲劇が起きた後、あなたは一人でその夢を引き継ぐことになります。ゲームは悲しみから始まり、仕事、日課、コミュニティ、そして美しいものが、どのように喪失を乗り越えさせてくれるかの物語として展開します。釣りのメカニックはこのサブジャンルで最も深く、魚種ごとに異なる餌、竿の種類、タイミング、海域が必要で、海のパターンを学ぶことが本当に楽しいです。釣った魚はミニゲームの料理システムで多様な料理に仕上げることができ、町の人々に売ったり贈ったりします。戦闘なし、農作物のプレッシャーなし、尽きるスタミナもなし——ただ起きて、海に出て、美しいものを釣り、料理し、必要な人と分かち合うリズムだけがあります。`,
    why_ko: `『Moonglow Bay』는 감정적 전제를 진지하게 다루는 낚시 생활 시뮬레이션 게임입니다. 당신과 파트너는 작은 해안 마을로 이사해 낚시 사업을 함께 시작하려는 꿈을 품고 있었지만, 비극이 찾아온 후 혼자 그 꿈을 이어가게 됩니다. 게임은 슬픔에서 시작해, 일과 일상, 공동체와 아름다움이 어떻게 상실을 헤쳐나갈 수 있게 해주는지에 대한 이야기로 펼쳐집니다. 낚시 메커닉은 이 서브장르에서 가장 깊이 있습니다——각 어종마다 다른 미끼, 낚싯대 종류, 타이밍, 바다 구역이 필요하고, 바다의 패턴을 익히는 것 자체가 진정한 만족감을 줍니다. 전투 없고, 작물 스트레스 없고, 소모되는 체력도 없습니다——그저 일어나 바다로 나가 아름다운 것을 낚고, 요리하고, 필요한 사람들과 나누는 리듬만이 있습니다.`,
    why_de: `Moonglow Bay ist die Angellebens-Sim, die es wagt, ihre emotionale Prämisse ernst zu nehmen. Du und dein Partner hatten den Traum, in eine kleine Küstenstadt zu ziehen und gemeinsam ein Angelgeschäft zu starten — aber als eine Tragödie eintrifft, wirst du allein gelassen, um diesen Traum zu ehren. Das Spiel beginnt in Trauer und entfaltet sich als Geschichte darüber, wie Arbeit, Routine, Gemeinschaft und Schönheit dich durch Verlust tragen können. Die Angelmechanik ist die tiefste in ihrem Subgenre: Jede Fischart erfordert verschiedene Köder, Rutentypen, Timing und Meereszonen. Jeder Fisch, den du fängst, kann mit einem Minispiel-Kochsystem zu verschiedenen Gerichten verarbeitet werden. Kein Kampf, kein Erntestress, keine erschöpfliche Energie — nur der Rhythmus des Aufwachens, Hinausfahrens aufs Meer, des Fischens, Kochens und Teilens mit Menschen, die es brauchen.`,
    tip_en: `Moonglow Bay's fishing depth rewards patience and observation. Before spending money on new gear, explore the ocean zones first — you will discover that different zones have dramatically different fish populations, and targeting a specific zone is more efficient than randomly fishing from the dock. The cooking minigame has a precision component that rewards practice: mastering it unlocks higher-quality dish variants that sell for significantly more. Gifting dishes to townsfolk is the primary relationship-building mechanic, so keep a small stockpile of each resident's favorite dish type rather than selling everything. The story chapters unlock at relationship milestones, not time-based triggers, so actively gifting and talking to residents is the key to pacing your emotional journey through the game.`,
    tip_zh: `《Moonglow Bay》的钓鱼深度奖励耐心和观察力。在花钱购买新装备之前，先探索各个海域——不同区域的鱼类种群差异巨大，定向前往特定海域比在码头随机垂钓效率高得多。烹饪小游戏有精准度组件，熟练后可解锁更高品质的菜肴变体，售价显著提高。赠送菜肴给镇民是主要的关系建立机制——为每位居民储备一小批他们最爱的菜肴类型，不要把所有东西都卖掉。故事章节在关系里程碑时解锁，不是时间触发，所以主动赠礼和对话是把控情感旅程节奏的关键。`,
    tip_zhTW: `《Moonglow Bay》的釣魚深度獎勵耐心和觀察力。在花錢購買新裝備之前，先探索各個海域——不同區域的魚類種群差異巨大，定向前往特定海域比在碼頭隨機垂釣效率高得多。烹飪小遊戲有精準度組件，熟練後可解鎖更高品質的菜餚變體，售價顯著提高。贈送菜餚給鎮民是主要的關係建立機制——為每位居民儲備一小批他們最愛的菜餚類型，不要把所有東西都賣掉。故事章節在關係里程碑時解鎖，不是時間觸發，所以主動贈禮和對話是把控情感旅程節奏的關鍵。`,
    tip_ja: `『Moonglow Bay』の釣りの深さは忍耐と観察力を評価します。新しい装備にお金を使う前に、まず海域を探索しましょう——ゾーンによって魚の種類が大きく異なり、特定の海域を目指す方が桟橋からランダムに釣るよりずっと効率的です。料理ミニゲームには精度の要素があり、マスターすると高品質の料理バリアントが解放され、大幅に高い価格で売れます。町の人への料理のプレゼントが主な関係構築の仕組みなので、全て売らずに各住民のお気に入りの料理タイプを少しストックしておきましょう。ストーリー章は時間ではなく関係のマイルストーンで解放されるので、積極的な贈り物と会話が、ゲームの感情的な旅のペースを左右します。`,
    tip_ko: `『Moonglow Bay』의 낚시 깊이는 인내와 관찰력에 보상을 줍니다. 새 장비에 돈을 쓰기 전에 먼저 바다 구역을 탐험하세요——구역마다 물고기 종류가 크게 달라서, 특정 구역을 목표로 하는 것이 선착장에서 무작위로 낚는 것보다 훨씬 효율적입니다. 요리 미니게임에는 정확도 요소가 있는데, 숙달하면 더 높은 품질의 요리 변형이 잠금 해제되어 훨씬 높은 가격에 팔립니다. 마을 사람들에게 요리를 선물하는 것이 주요 관계 구축 메커니즘이므로, 모든 것을 팔지 말고 각 주민이 좋아하는 요리 유형을 소량 비축해두세요. 스토리 챕터는 시간이 아닌 관계 마일스톤에서 잠금 해제되므로, 적극적으로 선물하고 대화하는 것이 게임의 감정적 여정 속도를 조절하는 열쇠입니다.`,
    tip_de: `Die Tiefe des Angelns in Moonglow Bay belohnt Geduld und Beobachtung. Bevor du Geld für neue Ausrüstung ausgibst, erkunde zuerst die Meereszonen — du wirst entdecken, dass verschiedene Zonen sehr unterschiedliche Fischpopulationen haben, und eine bestimmte Zone anzusteuern ist effizienter als wahllos vom Dock zu angeln. Das Koch-Minispiel hat eine Präzisionskomponente, die Übung belohnt: das Meistern schaltet hochwertigere Gerichtvarianten frei, die wesentlich mehr einbringen. Gerichte an Stadtbewohner zu verschenken ist der primäre Beziehungsaufbau-Mechanismus, also behalte einen kleinen Vorrat von jedem Lieblingsgerichttyp der Bewohner, statt alles zu verkaufen. Die Storykabinette werden durch Beziehungsmeilensteine freigeschaltet, nicht durch zeitbasierte Auslöser, also ist aktives Schenken und Reden der Schlüssel zur Gestaltung deiner emotionalen Reise durch das Spiel.`,
  },
  everdream: {
    title_en: 'Everdream Valley',
    title_zh: 'Everdream Valley',
    title_zhTW: 'Everdream Valley',
    title_ja: 'Everdream Valley',
    title_ko: 'Everdream Valley',
    title_de: 'Everdream Valley',
    emoji: '🦊',
    tag_en: 'The Dream Farmer',
    tag_zh: '梦境农场少年',
    tag_zhTW: '夢境農場少年',
    tag_ja: '夢見る農場の少年',
    tag_ko: '꿈꾸는 농장 소년',
    tag_de: 'Der Traum-Bauer',
    platform_en: 'PC · Nintendo Switch',
    platform_zh: 'PC · Nintendo Switch',
    platform_zhTW: 'PC · Nintendo Switch',
    platform_ja: 'PC · Nintendo Switch',
    platform_ko: 'PC · Nintendo Switch',
    platform_de: 'PC · Nintendo Switch',
    why_en: `Everdream Valley is one of the most imaginative cozy games of 2023, and also one of the most underrated. You spend your summer at your grandparents' farm, helping with daily chores while gradually befriending the wild animals that live around the property — foxes, deer, bears, rabbits, and many more. Befriending each animal species requires different approaches: some respond to patient observation, others to specific food offerings, and a few require completing small tasks to earn their trust. The game's unique mechanic is its dream system: once you have bonded with an animal, you can fall asleep next to them and enter their dream world. Inside these dreams, you play platformer-style minigames that represent the animal's deepest fears or memories, and completing them deepens your bond and unlocks new farm possibilities. This makes every animal relationship feel genuinely earned rather than transactional. The farming side of Everdream Valley is gentle and seasonal — plant, water, harvest, use crops to attract more animals or complete requests — and the progression is always in service of building a richer relationship with the natural world around the farm. The art style is warm and saturated, with a hand-painted quality that makes the European countryside setting feel like a living watercolor. Everdream Valley is most satisfying for players who want a farming game where the emotional center is the animal bonds rather than the crop optimization, and where imagination is the most valuable farm tool.`,
    why_zh: `《Everdream Valley》是2023年最富想象力也最被低估的治愈游戏之一。你在爷爷奶奶的农场度过暑假，帮忙做日常农活，同时慢慢结交农场周边的野生动物——狐狸、鹿、熊、兔子等。与每种动物建立关系需要不同的方式：有些需要耐心观察，有些需要特定的食物，少数几种需要完成小任务才能赢得信任。游戏的独特机制是梦境系统：和动物建立足够深的羁绊后，你可以在它身边入睡、进入它的梦境世界，在那里完成代表动物内心恐惧或记忆的平台小游戏。这让每段动物关系都真正感觉是赢得的，而不是用资源交换的。农耕部分温和而季节性——种植、浇水、收获，用作物吸引更多动物或完成任务。画风温暖饱满，手绘质感让欧式田园场景像一幅活着的水彩画。`,
    why_zhTW: `《Everdream Valley》是2023年最富想像力也最被低估的治癒遊戲之一。你在爺爺奶奶的農場度過暑假，幫忙做日常農活，同時慢慢結交農場周邊的野生動物——狐狸、鹿、熊、兔子等。與每種動物建立關係需要不同的方式：有些需要耐心觀察，有些需要特定的食物，少數幾種需要完成小任務才能贏得信任。遊戲的獨特機制是夢境系統：和動物建立足夠深的羈絆後，你可以在它身邊入睡、進入它的夢境世界，在那裡完成代表動物內心恐懼或記憶的平台小遊戲。這讓每段動物關係都真正感覺是贏得的，而不是用資源交換的。農耕部分溫和而季節性——種植、澆水、收穫，用作物吸引更多動物或完成任務。畫風溫暖飽滿，手繪質感讓歐式田園場景像一幅活著的水彩畫。`,
    why_ja: `『Everdream Valley』は2023年で最も想像力豊かなコージーゲームの一つであり、同時に最も過小評価されている作品でもあります。祖父母の農場で夏を過ごし、日々の農作業を手伝いながら、農場周辺に住む野生動物たち——キツネ、鹿、クマ、ウサギなど——と少しずつ友達になっていきます。各動物種との絆の築き方は異なります：根気強い観察が必要なもの、特定の食べ物を差し出すもの、信頼を得るために小さなタスクをこなすものと様々です。このゲームのユニークなメカニズムは夢システムです：動物との絆が深まると、彼らのそばで眠り込み、その夢の世界に入ることができます。夢の中では、動物の深層の恐怖や記憶を表したプラットフォーマー風ミニゲームをこなします。これにより、すべての動物との関係が、リソースで取引したものではなく、本当に勝ち取ったものとして感じられます。アートスタイルは温かく彩り豊かで、手書きの質感がヨーロッパの田園風景を生きた水彩画のように感じさせます。`,
    why_ko: `『Everdream Valley』는 2023년 가장 상상력이 풍부하고도 가장 저평가된 코지 게임 중 하나입니다. 조부모의 농장에서 여름을 보내며 일상적인 농사일을 도우면서, 농장 주변에 사는 야생 동물들——여우, 사슴, 곰, 토끼 등——과 천천히 친해집니다. 각 동물 종과 관계를 쌓는 방법은 다릅니다: 어떤 것은 인내심 있는 관찰이 필요하고, 어떤 것은 특정 음식 제공이 필요하며, 몇몇은 신뢰를 얻기 위해 작은 임무를 완수해야 합니다. 이 게임의 독특한 메커니즘은 꿈 시스템입니다: 동물과의 유대가 충분히 깊어지면 그 곁에서 잠들어 꿈의 세계로 들어갈 수 있으며, 그곳에서 동물의 깊은 두려움이나 기억을 표현한 플랫포머 스타일 미니게임을 완수합니다. 이를 통해 모든 동물 관계가 자원으로 거래한 것이 아니라 진정으로 얻어낸 것으로 느껴집니다. 아트 스타일은 따뜻하고 채도가 높으며, 손으로 그린 질감이 유럽 시골 배경을 살아 숨쉬는 수채화처럼 느끼게 합니다.`,
    why_de: `Everdream Valley ist eines der einfallsreichsten gemütlichen Spiele des Jahres 2023 und auch eines der unterschätztesten. Du verbringst deinen Sommer auf der Farm deiner Großeltern, hilfst bei den täglichen Aufgaben und freundest dich nach und nach mit den Wildtieren an, die auf dem Gelände leben — Füchse, Hirsche, Bären, Hasen und viele mehr. Das Anfreunden jeder Tierart erfordert unterschiedliche Ansätze: Einige reagieren auf geduldige Beobachtung, andere auf spezifische Futterangebote, und ein paar erfordern kleine Aufgaben, um ihr Vertrauen zu verdienen. Der einzigartige Mechanismus des Spiels ist das Traumsystem: Sobald du eine Bindung zu einem Tier aufgebaut hast, kannst du neben ihm einschlafen und seine Traumwelt betreten. In diesen Träumen spielst du Plattformer-Minispiele, die die tiefsten Ängste oder Erinnerungen des Tiers darstellen. Der Kunststil ist warm und gesättigt, mit einer handgemalten Qualität, die die europäische Landschaftskulisse wie ein lebendes Aquarell wirken lässt.`,
    tip_en: `The dream sequences are harder than the peaceful overworld suggests — bring enough items from your farm (specific fruits or vegetables that restore your in-dream stamina) before attempting the more difficult animal bond dreams in the late game. The animal bonding process is paced by how consistently you show up rather than how much you do in one session: visiting an animal's location daily builds familiarity faster than a single large gift-giving session. For the farm itself, prioritize crops that attract the animals you most want to befriend at that stage of the game — the relationship is more important than the yield. Unlock the farm cellar storage early; you will accumulate more dream-sequence items than you expect, and organization saves time.`,
    tip_zh: `梦境序列比和平的田园表层难得多——在挑战后期困难的动物梦境之前，准备足够从农场带来的物品（在梦中恢复体力的特定水果或蔬菜）。与动物建立羁绊靠的是持续的频率而非一次性的大量投入：每天造访动物所在地比一次性大量赠礼建立亲密感更快。农场方面，优先种植能吸引你当前阶段最想结交的动物的作物——关系比产量更重要。尽早解锁农场地窖储藏；你会积累比预期多得多的梦境序列物品，整理好仓库能节省大量时间。`,
    tip_zhTW: `夢境序列比和平的田園表層難得多——在挑戰後期困難的動物夢境之前，準備足夠從農場帶來的物品（在夢中恢復體力的特定水果或蔬菜）。與動物建立羈絆靠的是持續的頻率而非一次性的大量投入：每天造訪動物所在地比一次性大量贈禮建立親密感更快。農場方面，優先種植能吸引你當前階段最想結交的動物的作物——關係比產量更重要。儘早解鎖農場地窖儲藏；你會積累比預期多得多的夢境序列物品，整理好倉庫能節省大量時間。`,
    tip_ja: `夢のシーンは、平和な農場の表の顔が示唆するより難しいです——後期の難しい動物の夢に挑戦する前に、農場から持ち込めるアイテム（夢の中でスタミナを回復する特定の果物や野菜）を十分用意しましょう。動物との絆は、一度にたくさん投資するより、どれだけ継続して訪れるかにかかっています：動物のいる場所に毎日訪れる方が、一度に大量の贈り物をするより早く親密さが育ちます。農場では、そのゲームの段階で最も仲良くなりたい動物を引き付ける作物を優先して育てましょう——収穫量より関係の方が大切です。農場の地下貯蔵庫は早めに解放しましょう；夢のシーケンスのアイテムが予想以上に溜まります。`,
    tip_ko: `꿈 시퀀스는 평화로운 전원 분위기가 시사하는 것보다 훨씬 어렵습니다——후반의 어려운 동물 꿈에 도전하기 전에 농장에서 가져갈 수 있는 아이템(꿈속에서 체력을 회복하는 특정 과일이나 채소)을 충분히 준비하세요. 동물과의 유대는 한 번에 많이 투자하는 것보다 얼마나 꾸준히 찾아오는지에 달려 있습니다: 동물이 있는 곳을 매일 방문하는 것이 한 번에 많은 선물을 주는 것보다 친밀감을 더 빨리 쌓습니다. 농장에서는 현재 가장 친해지고 싶은 동물을 끌어들이는 작물을 우선 재배하세요——관계가 수확량보다 중요합니다. 농장 지하 저장소를 일찍 잠금 해제하세요; 예상보다 훨씬 많은 꿈 시퀀스 아이템이 쌓입니다.`,
    tip_de: `Die Traumsequenzen sind schwieriger als die friedliche Oberwelt vermuten lässt — bring genug Gegenstände von deiner Farm (spezifische Früchte oder Gemüse, die deine Ausdauer in Träumen wiederherstellen), bevor du die schwierigeren Tierbond-Träume im Endgame versuchst. Das Bindungsprozeß mit Tieren wird davon bestimmt, wie regelmäßig du auftauchst, nicht wie viel du in einer Sitzung gibst: Den Aufenthaltsort eines Tiers täglich zu besuchen baut schneller Vertrautheit auf als eine einmalige große Geschenksitzung. Für die Farm selbst solltest du Feldfrüchte priorisieren, die die Tiere anziehen, mit denen du dich in diesem Spielstadium am meisten anfreunden möchtest — die Beziehung ist wichtiger als der Ertrag. Schalte den Farmkeller-Lagerraum früh frei; du wirst mehr Traumsequenz-Gegenstände anhäufen als erwartet, und Organisation spart Zeit.`,
  },
}

function calcResult(answers: Pick[]): Pick {
  const counts: Record<Pick, number> = { spirittea: 0, immortal: 0, moonglow: 0, everdream: 0 }
  for (const a of answers) counts[a]++
  return Object.entries(counts).sort((x, y) => y[1] - x[1])[0][0] as Pick
}

export function SpiritFarmLifeQuiz({ locale }: { locale: string }) {
  const getLoc = (zh: string, en: string, zhTW?: string, ja?: string, ko?: string, de?: string): string => {
    if (locale === 'zh') return zh
    if (locale === 'zh-TW') return zhTW ?? zh
    if (locale === 'ja') return ja ?? en
    if (locale === 'ko') return ko ?? en
    if (locale === 'de') return de ?? en
    return en
  }

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
    const shareText = getLoc(
      `我的灵气农场生活推荐是《${r.title_zh}》！${r.emoji} 来测测你的结果？${BASE_URL}/zh/quizzes/spirit-farm-life-quiz`,
      `My spirit farm life match is ${r.title_en}! ${r.emoji} Which one are you? ${BASE_URL}/en/quizzes/spirit-farm-life-quiz`,
      `我的靈氣農場生活推薦是《${r.title_zhTW}》！${r.emoji} 來測測你的結果？${BASE_URL}/zh-TW/quizzes/spirit-farm-life-quiz`,
      `私の霊気農場ライフのおすすめは『${r.title_ja}』！${r.emoji} あなたの結果は？${BASE_URL}/ja/quizzes/spirit-farm-life-quiz`,
      `나의 영기 농장 생활 추천은 《${r.title_ko}》입니다! ${r.emoji} 당신의 결과는? ${BASE_URL}/ko/quizzes/spirit-farm-life-quiz`,
      `Mein Geisterfarm-Leben passt am besten zu ${r.title_de}! ${r.emoji} Was ist deins? ${BASE_URL}/de/quizzes/spirit-farm-life-quiz`,
    )

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
              {getLoc('游玩建议', 'Pro Tip', '遊玩建議', '攻略ヒント', '플레이 팁', 'Profi-Tipp')}
            </p>
            <p className="text-sm leading-relaxed text-[#c8bca8]">
              {getLoc(r.tip_zh, r.tip_en, r.tip_zhTW, r.tip_ja, r.tip_ko, r.tip_de)}
            </p>
          </div>
        </div>

        <div className="mb-6">
          <ShareButton text={shareText} locale={locale} />
        </div>

        <button
          onClick={reset}
          className="w-full rounded-xl border border-[#2d3d2d] py-2.5 text-sm text-[#8a9a7a] transition-colors hover:border-[#4d5d4d] hover:text-[#e8dcc8]"
        >
          {getLoc('重新测试', 'Retake Quiz', '重新測試', 'もう一度やる', '다시 테스트하기', 'Nochmal machen')}
        </button>
      </div>
    )
  }

  const progressText = locale === 'zh'
    ? `第 ${current + 1} / ${QUESTIONS.length} 题`
    : locale === 'zh-TW'
      ? `第 ${current + 1} / ${QUESTIONS.length} 題`
      : locale === 'ja'
        ? `${current + 1} / ${QUESTIONS.length} 問目`
        : locale === 'ko'
          ? `${current + 1} / ${QUESTIONS.length} 번째 질문`
          : locale === 'de'
            ? `Frage ${current + 1} von ${QUESTIONS.length}`
            : `Question ${current + 1} of ${QUESTIONS.length}`

  return (
    <div className="mx-auto max-w-2xl rounded-2xl border border-[#2d3d2d] bg-[#0f1a0f] p-6 md:p-8">
      <div className="mb-6">
        <div className="mb-3 flex items-center justify-between text-xs text-[#8a9a7a]">
          <span>{progressText}</span>
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
