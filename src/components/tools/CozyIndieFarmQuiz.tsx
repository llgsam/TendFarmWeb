'use client'

import { useState } from 'react'
import { BASE_URL } from '@/lib/config'

type Pick = 'dinkum' | 'kynseed' | 'littlewood' | 'tavern'

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
    q_en: 'Which world setting sounds most appealing for your farming life?',
    q_zh: '哪种世界背景最让你心动？',
    q_zhTW: '哪種世界背景最讓你心動？',
    q_ja: 'どんな世界設定の農場ライフに惹かれますか？',
    q_ko: '어떤 세계 배경의 농장 생활이 가장 마음에 드세요?',
    q_de: 'Welche Welteinstellung klingt am verlockendsten für dein Farmleben?',
    options: [
      {
        en: 'A sun-drenched Australian outback — kangaroos, cassowaries, and wild frontier vibes',
        zh: '阳光灿烂的澳大利亚内陆——袋鼠、鸸鹋和荒野开拓的生命力',
        zhTW: '陽光燦爛的澳大利亞內陸——袋鼠、鴯鶓和荒野開拓的生命力',
        ja: '太陽燦々のオーストラリアのアウトバック──カンガルー、ヒクイドリ、荒野を切り拓く開拓者の魂',
        ko: '햇살 가득한 호주 아웃백 — 캥거루, 화식조, 황야를 개척하는 생명력',
        de: 'Das sonnendurchflutete australische Outback — Kängurus, Kasuare und Pionierstimmung in der Wildnis',
        type: 'dinkum',
      },
      {
        en: 'A magical English countryside where your character ages, raises children, and passes down a legacy',
        zh: '充满魔法的英式乡村，你的角色会变老、生儿育女，把事业代代相传',
        zhTW: '充滿魔法的英式鄉村，你的角色會變老、生兒育女，把事業代代相傳',
        ja: '魔法あふれるイギリスの田舎──キャラクターが年を重ね、子どもを育て、家業を代々受け継いでいく',
        ko: '마법 같은 영국 시골 — 캐릭터가 나이 들고 아이를 낳아 대를 이어가는 삶',
        de: 'Ein magisches englisches Landleben — dein Charakter altert, gründet eine Familie und hinterlässt ein Erbe',
        type: 'kynseed',
      },
      {
        en: 'A peaceful post-adventure town where a retired hero rebuilds a community from scratch',
        zh: '打倒黑暗魔王后的和平世界，退休英雄帮助幸存者重建美好小镇',
        zhTW: '打倒黑暗魔王後的和平世界，退休英雄幫助倖存者重建美好小鎮',
        ja: '魔王を倒した後の平和な世界──引退した勇者がゼロからコミュニティを再建していく',
        ko: '마왕을 물리친 후의 평화로운 세계 — 은퇴한 영웅이 마을을 처음부터 다시 세워가는 이야기',
        de: 'Eine friedliche Welt nach dem Abenteuer — ein pensionierter Held baut von Grund auf eine Gemeinschaft auf',
        type: 'littlewood',
      },
      {
        en: 'A cozy medieval crossroads where you run a tavern and host weary travelers every night',
        zh: '古老奇幻王国的十字路口，你经营一家小酒馆，每晚招待四方旅客',
        zhTW: '古老奇幻王國的十字路口，你經營一家小酒館，每晚招待四方旅客',
        ja: '中世ファンタジーの交差点にある温かな宿屋──旅人を毎晩もてなす宿屋主人の物語',
        ko: '판타지 왕국의 교차로에 있는 아늑한 여관 — 매밤 여행자들을 맞이하는 여관 주인',
        de: 'Eine gemütliche mittelalterliche Kreuzung — du führst eine Taverne und begrüßt jede Nacht müde Reisende',
        type: 'tavern',
      },
    ],
  },
  {
    q_en: 'Which core gameplay loop sounds most satisfying to you?',
    q_zh: '哪种核心玩法循环最让你满足？',
    q_zhTW: '哪種核心玩法循環最讓你滿足？',
    q_ja: 'どんなゲームサイクルが一番楽しそうですか？',
    q_ko: '어떤 핵심 게임 루프가 가장 재미있을 것 같으세요?',
    q_de: 'Welcher Gameplay-Loop klingt am befriedigendsten?',
    options: [
      {
        en: 'Explore, mine, farm, build — a full pioneer sandbox where everything feeds everything else',
        zh: '探索荒野、挖矿采集、耕种农作、建设小镇——四线并进的开拓者沙盒',
        zhTW: '探索荒野、挖礦採集、耕種農作、建設小鎮——四線並進的開拓者沙盒',
        ja: '探索・採掘・農業・建設──すべてがつながる開拓者サンドボックス',
        ko: '탐험, 채굴, 농사, 건설 — 모든 것이 연결되는 개척자 샌드박스',
        de: 'Erkunden, schürfen, farmen, bauen — eine Pioniersandkiste, in der alles miteinander verbunden ist',
        type: 'dinkum',
      },
      {
        en: 'Run multiple small businesses across generations — bakery, farm, apothecary — each child inheriting a different path',
        zh: '经营药铺、面包坊、农场等多种小生意，每一代孩子继承不同的道路',
        zhTW: '經營藥鋪、麵包坊、農場等多種小生意，每一代孩子繼承不同的道路',
        ja: 'パン屋、農場、薬屋など複数のお店を世代をまたいで経営──子どもたちがそれぞれの道を歩む',
        ko: '빵집, 농장, 약국 등 다양한 가게를 세대를 넘나들며 운영 — 각 자녀가 다른 길을 걷는다',
        de: 'Verschiedene Kleinbetriebe über Generationen führen — Bäckerei, Farm, Apotheke — jedes Kind erbt einen anderen Weg',
        type: 'kynseed',
      },
      {
        en: 'Design and decorate your dream town at your own pace, inviting new residents and unlocking content freely',
        zh: '随心所欲地设计装饰理想小镇，邀请居民入住，自由解锁各种内容',
        zhTW: '隨心所欲地設計裝飾理想小鎮，邀請居民入住，自由解鎖各種內容',
        ja: '自分のペースで理想の街をデザイン＆デコレート──住民を招いてコンテンツを自由に解放',
        ko: '내 페이스대로 이상적인 마을을 디자인하고 꾸미기 — 주민을 초대하고 콘텐츠를 자유롭게 해금',
        de: 'In eigenem Tempo die Traumstadt gestalten und dekorieren — neue Bewohner einladen und Inhalte frei freischalten',
        type: 'littlewood',
      },
      {
        en: 'Grow ingredients, brew drinks, cook meals, then serve them to guests with distinct preferences',
        zh: '种菜、酿酒、下厨，再把佳肴端给有各自口味的旅客——经营即乐趣',
        zhTW: '種菜、釀酒、下廚，再把佳餚端給有各自口味的旅客——經營即樂趣',
        ja: '食材を育てて料理・醸造し、好みの異なるお客さんに提供する経営の楽しさ',
        ko: '식재료를 키워 요리하고 양조해서 취향이 다른 손님들에게 제공 — 경영 자체가 즐거움',
        de: 'Zutaten anbauen, Getränke brauen, Gerichte kochen — und sie Gästen mit eigenen Vorlieben servieren',
        type: 'tavern',
      },
    ],
  },
  {
    q_en: 'How do you feel about your character aging and the passage of time?',
    q_zh: '你对角色变老、时光流逝这类设计有何感受？',
    q_zhTW: '你對角色變老、時光流逝這類設計有何感受？',
    q_ja: 'キャラクターが老いていく・時間が流れるという設計についてどう思いますか？',
    q_ko: '캐릭터가 늙어가고 시간이 흘러가는 시스템에 대해 어떻게 생각하세요?',
    q_de: 'Wie stehst du zum Altern deines Charakters und zum Verstreichen der Zeit?',
    options: [
      {
        en: 'Seasonal rhythms are fine, but I prefer my character to stay the same person throughout the game',
        zh: '季节轮换挺好，但我希望全程操控同一个角色，不喜欢代际切换',
        zhTW: '季節輪換挺好，但我希望全程操控同一個角色，不喜歡代際切換',
        ja: '季節の巡りはいいけど、ゲームを通じて同じキャラクターを操作し続けたい',
        ko: '계절이 바뀌는 건 좋은데, 한 캐릭터로 끝까지 플레이하고 싶어요',
        de: 'Jahreszeitenwechsel sind prima, aber ich möchte denselben Charakter das ganze Spiel lang spielen',
        type: 'dinkum',
      },
      {
        en: 'Deeply into it — watching my character age, marry, and have children who carry on the story is the whole point',
        zh: '非常着迷——看角色慢慢变老、结婚生子，让孩子延续故事，这才是重点',
        zhTW: '非常著迷——看角色慢慢變老、結婚生子，讓孩子延續故事，這才是重點',
        ja: '大歓迎！キャラクターが歳を重ね、結婚し、子どもが物語を引き継ぐ──それこそがメインコンテンツ',
        ko: '완전 좋아요! 캐릭터가 나이 들고, 결혼하고, 아이가 이야기를 이어가는 것이 핵심이죠',
        de: 'Total mein Ding — meinen Charakter altern, heiraten und Kinder bekommen zu sehen, die die Geschichte fortführen, ist der ganze Sinn',
        type: 'kynseed',
      },
      {
        en: 'Prefer timeless and pressure-free — no aging, no deadlines, just endless cozy building whenever I want',
        zh: '越轻松越好，不需要变老机制，没有截止日期，想建设就建设',
        zhTW: '越輕鬆越好，不需要變老機制，沒有截止日期，想建設就建設',
        ja: 'プレッシャーフリーがいい──老化なし、締め切りなし、好きなときに気ままにまったり建設',
        ko: '최대한 느긋하게 — 노화 없고 마감 없이 하고 싶을 때 마음껏 건설',
        de: 'Lieber zeitlos und ohne Druck — kein Altern, keine Deadlines, einfach gemütlich bauen, wann immer ich will',
        type: 'littlewood',
      },
      {
        en: 'I want to see my tavern grow in reputation season by season — character aging does not matter to me',
        zh: '我想看酒馆的声誉随时间慢慢壮大，角色变不变老对我不重要',
        zhTW: '我想看酒館的聲譽隨時間慢慢壯大，角色變不變老對我不重要',
        ja: '宿屋の評判が季節ごとに積み上がるのが見たい──キャラクターの老化は気にしない',
        ko: '여관의 명성이 계절마다 쌓여가는 걸 보고 싶어요 — 캐릭터 노화는 크게 신경 안 써요',
        de: 'Ich will sehen, wie der Ruf meiner Taverne Saison für Saison wächst — Charakteraltern ist mir egal',
        type: 'tavern',
      },
    ],
  },
  {
    q_en: 'What is your preferred relationship with wildlife and combat in a cozy game?',
    q_zh: '在治愈系游戏里，你对野生动物和战斗要素的态度是？',
    q_zhTW: '在治愈系遊戲裡，你對野生動物和戰鬥要素的態度是？',
    q_ja: 'コージーゲームにおける野生動物や戦闘要素について、あなたのスタンスは？',
    q_ko: '코지 게임에서 야생동물과 전투 요소에 대한 당신의 생각은?',
    q_de: 'Wie stehst du zu Wildtieren und Kampf in einem gemütlichen Spiel?',
    options: [
      {
        en: 'I enjoy hunting and fishing alongside farming — some danger from wild animals adds excitement',
        zh: '喜欢狩猎和钓鱼，偶尔遭遇野生动物的危险感让游戏更有张力',
        zhTW: '喜歡狩獵和釣魚，偶爾遭遇野生動物的危險感讓遊戲更有張力',
        ja: '農業と並行して狩りや釣りも楽しみたい──野生動物の危険感が程よいスパイスになる',
        ko: '농사와 함께 사냥과 낚시도 즐기고 싶어요 — 야생동물의 위험감이 게임에 긴장감을 줘서 좋아요',
        de: 'Ich mag Jagen und Angeln neben dem Farmen — etwas Gefahr durch wilde Tiere macht das Spiel spannender',
        type: 'dinkum',
      },
      {
        en: 'Light combat against monsters and quirky enemies is fun, as long as it stays low-stakes and charming',
        zh: '打打轻度的小怪和奇葩敌人挺有趣，只要节奏轻松、风格可爱就好',
        zhTW: '打打輕度的小怪和奇葩敵人挺有趣，只要節奏輕鬆、風格可愛就好',
        ja: 'ゆるい敵キャラとのちょっとした戦闘は楽しい──のんびりしたペースとかわいいテイストが大事',
        ko: '가벼운 몬스터 전투는 재미있어요 — 느긋한 페이스와 귀여운 스타일만 유지되면 OK',
        de: 'Leichte Kämpfe gegen Monster und witzige Gegner machen Spaß, solange der Ton locker und charmant bleibt',
        type: 'kynseed',
      },
      {
        en: 'Zero combat please — I want a completely peaceful building and social game with no threats whatsoever',
        zh: '完全不需要战斗，纯和平建设和社交，没有任何威胁才是我的理想状态',
        zhTW: '完全不需要戰鬥，純和平建設和社交，沒有任何威脅才是我的理想狀態',
        ja: '戦闘ゼロ希望──脅威なしで平和に建設＆交流するゲームが理想',
        ko: '전투는 완전 사절 — 아무런 위협 없이 평화롭게 건설하고 교류하는 게 이상적',
        de: 'Null Kampf bitte — ich will ein komplett friedliches Aufbau- und Sozialspiel ohne jegliche Bedrohungen',
        type: 'littlewood',
      },
      {
        en: 'Combat is irrelevant to me — I am here for the economics of running a successful inn',
        zh: '战斗对我完全不重要，我来这里是为了经营好一家生意兴隆的酒馆',
        zhTW: '戰鬥對我完全不重要，我來這裡是為了經營好一家生意興隆的酒館',
        ja: '戦闘は関係ない──私の目標は繁盛する宿屋の経営だけ',
        ko: '전투는 관심 없어요 — 번창하는 여관 경영만이 제 목표',
        de: 'Kampf ist mir egal — ich bin hier wegen der Wirtschaft eines erfolgreichen Gasthauses',
        type: 'tavern',
      },
    ],
  },
  {
    q_en: 'Multiplayer or solo — what is your preference?',
    q_zh: '多人联机还是单人独享——你更倾向哪种？',
    q_zhTW: '多人聯機還是單人獨享——你更傾向哪種？',
    q_ja: 'マルチプレイとソロ、どっちが好みですか？',
    q_ko: '멀티플레이와 솔로, 어느 쪽을 선호하세요?',
    q_de: 'Multiplayer oder Solo — was bevorzugst du?',
    options: [
      {
        en: 'Multiplayer is a big draw — I want to build a settlement alongside a friend online or on the same couch',
        zh: '联机是重要加分项，希望能和朋友一起开荒建镇，线上或本地合作都行',
        zhTW: '聯機是重要加分項，希望能和朋友一起開荒建鎮，線上或本地合作都行',
        ja: 'マルチが大きな魅力──友達と一緒にオンラインや画面分割で開拓地を作り上げたい',
        ko: '멀티는 큰 매력 — 친구와 함께 온라인이나 로컬 협동으로 정착지를 만들고 싶어요',
        de: 'Multiplayer ist ein großes Plus — ich will gemeinsam mit Freunden online oder auf der Couch eine Siedlung aufbauen',
        type: 'dinkum',
      },
      {
        en: 'Solo is fine — the NPC relationships and generational story are rich enough to keep me engaged for hundreds of hours',
        zh: '单人完全够了，NPC关系和代际故事足够吸引我玩几百小时',
        zhTW: '單人完全夠了，NPC關係和代際故事足夠吸引我玩幾百小時',
        ja: 'ソロで十分──NPCとの人間関係や世代をまたいだストーリーで何百時間でも楽しめる',
        ko: '솔로로 충분 — NPC와의 관계와 세대를 잇는 이야기로 수백 시간도 즐길 수 있어요',
        de: 'Solo reicht — die NPC-Beziehungen und die Generationengeschichte halten mich hunderte von Stunden gefesselt',
        type: 'kynseed',
      },
      {
        en: 'Solo but social within the game — building a town with unique NPC personalities to meet is exactly right',
        zh: '单人但有社交感——建设小镇、邂逅各种个性NPC居民，这种感觉刚好',
        zhTW: '單人但有社交感——建設小鎮、邂逅各種個性NPC居民，這種感覺剛好',
        ja: 'ソロだけど社交感あり──個性豊かなNPCが住む街を作るのがちょうどいい',
        ko: '솔로지만 사회적인 느낌 — 개성 넘치는 NPC 주민들과 함께하는 마을 건설이 딱 맞아요',
        de: 'Solo, aber sozial im Spiel — eine Stadt mit einzigartigen NPC-Persönlichkeiten aufzubauen ist genau richtig',
        type: 'littlewood',
      },
      {
        en: 'Solo — the quiet rhythm of managing my tavern alone is exactly the relaxation I am looking for',
        zh: '单人——独自经营酒馆的安静节奏，正是我寻找的那种放松感',
        zhTW: '單人——獨自經營酒館的安靜節奏，正是我尋找的那種放鬆感',
        ja: 'ソロ──一人でのんびり宿屋を経営する静かなリズムが求めていた癒し',
        ko: '솔로 — 혼자서 조용히 여관을 운영하는 리듬이 제가 찾던 힐링',
        de: 'Solo — der ruhige Rhythmus meiner Taverne allein zu führen ist genau die Entspannung, die ich suche',
        type: 'tavern',
      },
    ],
  },
  {
    q_en: 'Which mood or atmosphere best describes what you want from your next game?',
    q_zh: '哪种氛围和调性最符合你对下一款游戏的期待？',
    q_zhTW: '哪種氛圍和調性最符合你對下一款遊戲的期待？',
    q_ja: '次のゲームに求める雰囲気は？',
    q_ko: '다음 게임에서 원하는 분위기는 무엇인가요?',
    q_de: 'Welche Stimmung oder Atmosphäre beschreibt am besten, was du vom nächsten Spiel erwartest?',
    options: [
      {
        en: 'Cheerful, sun-warmed, and full of life — the joy of taming a wild new land',
        zh: '开朗阳光、充满生命力——驯服一片荒野、开创新天地的喜悦感',
        zhTW: '開朗陽光、充滿生命力——馴服一片荒野、開創新天地的喜悅感',
        ja: '明るくて太陽いっぱい──荒野を開拓していく達成感と生命力あふれる世界',
        ko: '명랑하고 햇살 가득 — 황야를 개척하며 새 세계를 만들어가는 기쁨과 생명력',
        de: 'Fröhlich, sonnenwarm und voller Leben — die Freude, ein wildes neues Land zu zähmen',
        type: 'dinkum',
      },
      {
        en: 'Bittersweet and warm — watching a family legacy unfold across generations, funny and poignant at once',
        zh: '温柔而略带苦涩——看一个家族跨越世代展开，幽默与感伤并存',
        zhTW: '溫柔而略帶苦澀——看一個家族跨越世代展開，幽默與感傷並存',
        ja: '温かくてほろ苦い──家族の物語が世代をまたいで展開していく、笑いあり感動ありの体験',
        ko: '따뜻하고 씁쓸달달 — 한 가족의 이야기가 세대를 넘어 펼쳐지는 웃음과 감동',
        de: 'Bittersüß und warm — ein Familienerbe, das sich über Generationen entfaltet, komisch und berührend zugleich',
        type: 'kynseed',
      },
      {
        en: 'Pure cozy comfort — no stress, no stakes, just the pleasure of arranging a perfect little world',
        zh: '纯粹的治愈舒适——零压力、零风险，只有打造完美小世界的纯粹乐趣',
        zhTW: '純粹的治愈舒適——零壓力、零風險，只有打造完美小世界的純粹樂趣',
        ja: '純粋なまったり感──ストレスなし、プレッシャーなし、理想の小さな世界を作る純粋な喜び',
        ko: '순수한 코지함 — 스트레스 제로, 위험 제로, 완벽한 작은 세계를 만드는 순수한 즐거움',
        de: 'Pures gemütliches Wohlbefinden — kein Stress, keine Einsätze, nur das Vergnügen, eine perfekte kleine Welt zu gestalten',
        type: 'littlewood',
      },
      {
        en: 'Warm candlelight and the sounds of a busy inn — hospitality, commerce, and quiet satisfaction',
        zh: '温暖烛光和热闹人声——好客、经营和内心那份安静的满足感',
        zhTW: '溫暖燭光和熱鬧人聲——好客、經營和內心那份安靜的滿足感',
        ja: 'ろうそくの灯りと宿屋のにぎわい──おもてなし、商売、そしてしみじみとした満足感',
        ko: '촛불의 온기와 분주한 여관 소리 — 환대, 경영, 그리고 마음속 조용한 만족감',
        de: 'Warmes Kerzenlicht und das Geräusch eines belebten Gasthofs — Gastfreundschaft, Handel und stille Zufriedenheit',
        type: 'tavern',
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
  dinkum: {
    title_en: 'Dinkum',
    title_zh: 'Dinkum',
    title_zhTW: 'Dinkum',
    title_ja: 'Dinkum',
    title_ko: 'Dinkum',
    title_de: 'Dinkum',
    emoji: '🦘',
    tag_en: 'The Outback Pioneer',
    tag_zh: '内陆开拓者',
    tag_zhTW: '內陸開拓者',
    tag_ja: 'アウトバックの開拓者',
    tag_ko: '아웃백 개척자',
    tag_de: 'Pionier des Outbacks',
    platform_en: 'PC (Early Access) · Nintendo Switch',
    platform_zh: 'PC（抢先体验）· Nintendo Switch',
    platform_zhTW: 'PC（搶先體驗）· Nintendo Switch',
    platform_ja: 'PC（アーリーアクセス）· Nintendo Switch',
    platform_ko: 'PC(얼리 액세스) · Nintendo Switch',
    platform_de: 'PC (Early Access) · Nintendo Switch',
    why_en: `Dinkum is an Australian-themed farming and settlement game that stands out from the Stardew crowd through sheer originality of setting and tone. Instead of European countryside or generic fantasy, you arrive at a plot of wild Australian bushland — complete with kangaroos, cassowaries, wombats, emus, crocodiles, and sharks — and your job is to transform it into a thriving outback town. The game was developed by a solo Australian developer, James Bendon, and the love for the source material shows in every detail: the wildlife behaviors, the slang ("dinkum" meaning genuine or real in Australian English), the eucalyptus forests, and the red-dirt landscapes. The gameplay combines farming, mining, fishing, hunting, crafting, and town-building in a satisfying open sandbox where you advance by purchasing licenses from the government for each new activity. Want to start farming? Buy a farming license. Want to mine deeper? Buy the mining license. This licensing system gives structure without rigidity and keeps progression feeling earned. Dinkum supports online multiplayer, which makes it one of the few farming games in this genre where building a settlement with friends is a fully supported primary mode. The Early Access version already has dozens of hours of content, with the developers actively adding seasonal events, new biomes, and expanded story content. For Stardew Valley fans who have already played the obvious alternatives and crave something that feels genuinely different — not just a reskin — Dinkum delivers that rare feeling of discovering a cozy world you have never seen before.`,
    why_zh: `《Dinkum》是一款澳大利亚主题的农场与聚居地游戏，凭借原创独特的世界背景在一众类星露谷游戏中脱颖而出。你来到一片澳洲荒野，袋鼠、鸸鹋、袋熊、鳄鱼在旁，目标是把这片荒地变成欣欣向荣的内陆小镇。游戏由澳大利亚独立开发者独立完成，对澳洲自然生态的热爱体现在每一个细节中。独特的"许可证"推进系统让每种玩法（农业、挖矿、渔猎）都需要向政府购买执照才能解锁，结构清晰而不失自由。游戏支持在线多人合作，是少数真正把多人建设作为核心玩法的农场类游戏之一。`,
    why_zhTW: `《Dinkum》是一款澳大利亞主題的農場與聚居地遊戲，憑藉原創獨特的世界背景在一眾類星露谷遊戲中脫穎而出。你來到一片澳洲荒野，袋鼠、鴯鶓、袋熊、鱷魚在旁，目標是把這片荒地變成欣欣向榮的內陸小鎮。遊戲由澳大利亞獨立開發者獨立完成，對澳洲自然生態的熱愛體現在每一個細節中。獨特的「許可證」推進系統讓每種玩法（農業、挖礦、漁獵）都需要向政府購買執照才能解鎖，結構清晰而不失自由。遊戲支援線上多人合作，是少數真正把多人建設作為核心玩法的農場類遊戲之一。`,
    why_ja: `『Dinkum』はオーストラリアをテーマにした農場と集落づくりのゲームで、独創的な世界設定によってスターデューバレー系の作品の中で異彩を放っています。カンガルーやエミュー、ウォンバット、ワニが生息するオーストラリアのブッシュランドに降り立ち、この荒野を活気あるアウトバックの町へと変えていくのがあなたの使命。オーストラリア人ソロ開発者・James Bendonが作り上げたこの作品には、動物たちの行動パターン、現地スラング（"dinkum"は「本物」「本当の」を意味するオーストラリア英語）、ユーカリの森や赤土の風景など、故郷への愛情が随所ににじんでいます。農業・採掘・釣り・狩り・クラフト・街づくりを組み合わせたオープンサンドボックスで、各アクティビティは政府からライセンスを購入することで解放されます。オンラインマルチプレイにも対応しており、友達と一緒に集落を作れる数少ない農場ゲームのひとつです。これまでの定番作を遊び尽くして、真に新鮮な体験を求めている方に強くおすすめします。`,
    why_ko: `《Dinkum》은 호주를 테마로 한 농장 및 정착지 건설 게임으로, 독창적인 세계 배경 덕분에 스타듀 밸리 계열 게임들 사이에서 단연 눈에 띕니다. 캥거루, 에뮤, 웜뱃, 악어가 서식하는 호주 부시랜드에 도착해, 이 황야를 활기찬 아웃백 타운으로 변모시키는 것이 목표입니다. 호주 출신 1인 개발자 James Bendon이 만든 이 게임에는 야생동물의 행동 패턴, 현지 속어("dinkum"은 호주 영어로 "진짜의", "진심의"라는 뜻), 유칼립투스 숲과 붉은 흙 풍경 등 고향에 대한 애정이 곳곳에 배어 있습니다. 농업, 채굴, 낚시, 사냥, 제작, 마을 건설을 결합한 오픈 샌드박스로, 각 활동을 정부에서 라이선스를 구매해 해금하는 방식이 특징입니다. 온라인 멀티플레이를 지원해 친구와 함께 정착지를 건설할 수 있는 몇 안 되는 농장 게임 중 하나입니다.`,
    why_de: `Dinkum ist ein australisch thematisiertes Farm- und Siedlungsspiel, das sich durch seine originelle Umgebung und Atmosphäre von der Stardew-Valley-Flut abhebt. Statt europäischer Idylle oder generischem Fantasy-Setting landest du auf einem Stück australischem Buschland — bevölkert von Kängurus, Kasuaren, Wombats, Emus, Krokodilen und Haien — und deine Aufgabe ist es, aus der Wildnis eine florierende Outback-Siedlung zu machen. Das Spiel wurde von einem australischen Solo-Entwickler, James Bendon, erschaffen, und die Liebe zum Heimatland zeigt sich in jedem Detail: das Tierverhalten, der Slang ("dinkum" bedeutet im australischen Englisch "echt" oder "ehrlich"), die Eukalyptuswälder und die rotbraunen Landschaften. Gameplay-technisch kombiniert Dinkum Farming, Bergbau, Angeln, Jagen, Crafting und Stadtaufbau in einem offenen Sandkasten, in dem du neue Aktivitäten durch den Kauf von Lizenzen bei der Regierung freischaltest. Dinkum unterstützt Online-Multiplayer und ist damit eines der wenigen Farming-Spiele, in denen das gemeinsame Aufbauen einer Siedlung mit Freunden vollwertig möglich ist.`,
    tip_en: `Prioritize buying the Farming License from Fletch early — it is cheap and unlocks the most immediately rewarding progression loop. Before your first wet season, make sure your farm is elevated or covered, because flooding can damage your crops. The animal trapping mechanic is more efficient than hunting for food in the early game; set traps overnight and collect in the morning. Join the official Discord to check the development roadmap — the game updates frequently and new seasonal content often changes the optimal early-game strategy. If you play multiplayer, split the license purchases between players on day one to cover more ground faster.`,
    tip_zh: `优先向Fletch购买农业执照——它便宜且能解锁最直接的进展循环。雨季来临前，确保农场有足够高度或遮蔽，洪水会损坏作物。早期食物供应方面，动物陷阱比主动狩猎效率更高，傍晚设置、早晨收取。加入官方Discord跟踪更新路线图——游戏更新频繁，季节性内容常常改变最优早期策略。多人游玩时，第一天就分工购买不同执照，覆盖更广的能力范围。`,
    tip_zhTW: `優先向Fletch購買農業執照——它便宜且能解鎖最直接的進展循環。雨季來臨前，確保農場有足夠高度或遮蔽，洪水會損壞作物。早期食物供應方面，動物陷阱比主動狩獵效率更高，傍晚設置、早晨收取。加入官方Discord追蹤更新路線圖——遊戲更新頻繁，季節性內容常常改變最優早期策略。多人遊玩時，第一天就分工購買不同執照，覆蓋更廣的能力範圍。`,
    tip_ja: `早めにFletchから農業ライセンスを購入しましょう——安価で、最もすぐに実感できる進行ループを解放できます。最初の雨季の前に、農場が十分な高さにあるか屋根がついているか確認を。洪水で作物がダメになることがあります。序盤の食料調達は、動物トラップが狩りより効率的です——夕方に仕掛けて朝に回収するだけ。公式Discordで開発ロードマップを確認することをおすすめします——アップデートが頻繁で、季節イベントが序盤の最適戦略を変えることもあります。マルチプレイ時は、初日から各プレイヤーが別々のライセンスを購入して、カバーできる範囲を広げるのが効果的です。`,
    tip_ko: `초반에 Fletch에게서 농업 라이선스를 우선 구매하세요——저렴하고 즉각적인 성장 루프를 열어줍니다. 첫 번째 우기 전에 농장이 충분히 높은 곳에 있거나 지붕이 있는지 확인하세요. 홍수로 작물이 손상될 수 있습니다. 초반 식량 공급은 적극적인 사냥보다 동물 덫이 더 효율적입니다——저녁에 설치하고 아침에 수거하세요. 공식 Discord에서 개발 로드맵을 확인하는 것을 추천합니다——업데이트가 잦고 시즌 콘텐츠가 초반 최적 전략을 바꾸기도 합니다. 멀티플레이 시 첫날부터 플레이어별로 다른 라이선스를 구매해 커버 범위를 넓히세요.`,
    tip_de: `Kaufe so früh wie möglich bei Fletch eine Farming-Lizenz — sie ist günstig und schaltet den direktesten Fortschrittskreislauf frei. Stelle vor der ersten Regenzeit sicher, dass deine Farm erhöht liegt oder überdacht ist, da Überschwemmungen die Ernte schädigen können. Für die Nahrungsversorgung in der Frühphase sind Tierfallen effizienter als aktive Jagd — abends aufstellen und morgens einsammeln. Tritt dem offiziellen Discord bei, um die Entwicklungs-Roadmap zu verfolgen — das Spiel wird häufig aktualisiert, und saisonale Events verändern oft die optimale Frühphasenstrategie. Beim Multiplayer empfiehlt es sich, am ersten Tag verschiedene Lizenzen unter den Spielern aufzuteilen, um mehr Aktivitäten gleichzeitig abdecken zu können.`,
  },
  kynseed: {
    title_en: 'Kynseed',
    title_zh: 'Kynseed',
    title_zhTW: 'Kynseed',
    title_ja: 'Kynseed',
    title_ko: 'Kynseed',
    title_de: 'Kynseed',
    emoji: '🌳',
    tag_en: 'The Legacy Farmer',
    tag_zh: '传承农耕者',
    tag_zhTW: '傳承農耕者',
    tag_ja: '世代を超えた農家',
    tag_ko: '대를 잇는 농부',
    tag_de: 'Generationenbauer',
    platform_en: 'PC · Nintendo Switch',
    platform_zh: 'PC · Nintendo Switch',
    platform_zhTW: 'PC · Nintendo Switch',
    platform_ja: 'PC · Nintendo Switch',
    platform_ko: 'PC · Nintendo Switch',
    platform_de: 'PC · Nintendo Switch',
    why_en: `Kynseed is the farming life sim with the most ambitious concept in its genre: a multi-generational family saga disguised as a cozy game. Developed by ex-Fable devs at PixelCount Studios, Kynseed takes everything familiar about farming simulations — growing crops, raising animals, managing shops, building relationships — and wraps it inside a system where your character actually ages, falls in love, has children, and eventually passes the torch to the next generation. The world of Quill is rich with British folklore, whimsical humor, and the specific bittersweet charm that Fable fans will immediately recognize. You can choose to focus on farming, running a bakery, operating an apothecary, or a combination of all three — and each path produces different story outcomes depending on how you trained your children's skills before retirement. The game has no traditional combat system per se, but quirky "battle" sequences against magical creatures use a completely different mechanic (think arm-wrestling a goblin rather than swordfighting). The passage of time is the emotional core of Kynseed: watching a tree you planted as a child grow into a landmark your grandchildren play under carries a genuinely poetic weight. If you are the kind of player who found Stardew Valley's generational aging in the Grandpa system touching, Kynseed takes that feeling and turns it into the entire game.`,
    why_zh: `《Kynseed》是农场生活模拟中概念最大胆的作品：一个披着治愈游戏外衣的多代家族传奇。由前Fable开发者打造，游戏把熟悉的农场元素——种植、养殖、经营店铺、社交——嵌套进一个真实老去的角色系统：你会恋爱、生孩子，最终把事业交给下一代。游戏世界充满英式民间传说和略带苦涩的幽默感，与Fable的气质高度相似。你可以专注农耕、开面包坊、经营药铺或三者兼顾，每条路径根据你培养孩子技能的方式产生不同的故事结局。时光流逝是《Kynseed》的情感核心——看着儿时亲手种下的树长成孙辈玩耍的地标，有种真实的诗意重量。`,
    why_zhTW: `《Kynseed》是農場生活模擬中概念最大膽的作品：一個披著治愈遊戲外衣的多代家族傳奇。由前Fable開發者打造，遊戲把熟悉的農場元素——種植、養殖、經營店鋪、社交——嵌套進一個真實老去的角色系統：你會戀愛、生孩子，最終把事業交給下一代。遊戲世界充滿英式民間傳說和略帶苦澀的幽默感，與Fable的氣質高度相似。你可以專注農耕、開麵包坊、經營藥鋪或三者兼顧，每條路徑根據你培養孩子技能的方式產生不同的故事結局。時光流逝是《Kynseed》的情感核心——看著兒時親手種下的樹長成孫輩玩耍的地標，有種真實的詩意重量。`,
    why_ja: `『Kynseed』は農場ライフシムの中で最も野心的なコンセプトを持つ作品です——コージーゲームを装った、複数世代にまたがる家族サーガ。『Fable』の元開発者たちが手掛けたこの作品は、おなじみの農場要素（作物の栽培、家畜の飼育、店舗経営、人間関係の構築）を、キャラクターが実際に年を重ね、恋をして、子どもを産み、次世代にバトンを渡すシステムに落とし込んでいます。イギリスの民間伝承にあふれたQuillの世界、ユーモアとほろ苦さが混じり合う独特の雰囲気は、Fableファンなら一瞬で懐かしさを感じるはず。農場経営、パン屋、薬屋、あるいはその組み合わせを選び、引退前に子どもたちにどのスキルを教えたかによって物語の結末が変わります。時間の流れが『Kynseed』の情感的な核心——子どものころに植えた木が、孫が遊ぶ場所になっていく光景には、本物の詩的な重みがあります。`,
    why_ko: `《Kynseed》는 농장 생활 시뮬레이션 장르에서 가장 대담한 콘셉트를 가진 작품입니다——코지 게임으로 포장된 다세대 가족 사가. 《페이블》 전 개발진이 만든 이 게임은 농사, 가축 관리, 가게 운영, 인간관계 등 익숙한 농장 요소를 캐릭터가 실제로 나이 들고, 사랑하고, 아이를 낳아 다음 세대에 바통을 넘기는 시스템 안에 녹여냈습니다. 영국 민간 전승으로 가득한 Quill의 세계, 유머와 씁쓸함이 공존하는 독특한 분위기는 페이블 팬이라면 즉시 알아볼 수 있을 것입니다. 농사, 빵집, 약국 중 원하는 것을 선택해 운영하고, 은퇴 전에 자녀에게 어떤 기술을 가르쳤느냐에 따라 이야기의 결말이 달라집니다. 시간의 흐름이 《Kynseed》의 감동적인 핵심——어릴 때 심은 나무가 손자들이 그 아래서 노는 명소가 되어가는 모습에는 진정한 시적 무게감이 있습니다.`,
    why_de: `Kynseed hat das ambitionierteste Konzept in seinem Genre: eine Mehrgenerationen-Familiensaga im Gewand eines gemütlichen Spiels. Entwickelt von Ex-Fable-Entwicklern bei PixelCount Studios, nimmt Kynseed alles Vertraute aus Farmsimulatoren — Anbau, Tierzucht, Ladenführung, Beziehungspflege — und bettet es in ein System ein, in dem dein Charakter tatsächlich altert, sich verliebt, Kinder bekommt und die Fackel weitergibt. Die Welt von Quill strotzt vor britischer Folklore, skurrilem Humor und dem bittersüßen Charme, den Fable-Fans sofort wiedererkennen werden. Du kannst dich auf Farming, Bäckerei, Apotheke oder eine Kombination konzentrieren — und jede Wahl erzeugt verschiedene Geschichtsverläufe, abhängig davon, welche Fähigkeiten du deinen Kindern vor dem Ruhestand beibringst. Der Lauf der Zeit ist der emotionale Kern von Kynseed: Der Baum, den du als Kind gepflanzt hast, wächst zu einer Landmarke heran, unter der deine Enkel spielen — das hat eine echte poetische Schwere.`,
    tip_en: `Time management is the key skill in Kynseed — unlike most farming games, your character ages in real game-time, so you cannot afford to spend ten in-game years optimizing crops before starting a family. Prioritize relationship-building early: your future spouse's personality affects which skills transfer well to your children. The Fabled World events (magical disturbances in the world) offer the best rewards but have time-limited windows — check the world map daily. For shop runs, the apothecary tends to be the most profitable early business because wild herb gathering has no license requirement. Plant your Kynseed as soon as you receive it — the tree takes real in-game seasons to mature, and its growth is tied to your life choices.`,
    tip_zh: `时间管理是《Kynseed》的核心技能——角色在真实游戏时间中变老，所以你不能花十年优化农作物才开始组建家庭。优先早期建立伴侣关系：未来配偶的性格影响哪些技能更好地传承给孩子。世界地图上的"寓言世界事件"（魔法干扰）奖励最丰厚，但有时间限制——每天查看。药铺往往是早期最盈利的店铺，因为采集野生草药不需要执照。一拿到Kynseed（奇异种子）就立刻种下——这棵树需要真实的游戏季节才能成熟，且生长与你的人生选择密切相关。`,
    tip_zhTW: `時間管理是《Kynseed》的核心技能——角色在真實遊戲時間中變老，所以你不能花十年優化農作物才開始組建家庭。優先早期建立伴侶關係：未來配偶的性格影響哪些技能更好地傳承給孩子。世界地圖上的「寓言世界事件」（魔法干擾）獎勵最豐厚，但有時間限制——每天查看。藥鋪往往是早期最盈利的店鋪，因為採集野生草藥不需要執照。一拿到Kynseed（奇異種子）就立刻種下——這棵樹需要真實的遊戲季節才能成熟，且生長與你的人生選擇密切相關。`,
    tip_ja: `時間管理が『Kynseed』の核心スキルです——キャラクターは実際のゲーム時間とともに歳を重ねるため、10年かけて農業を最適化してから家族を作ろうとすると間に合わなくなります。早めに関係構築を優先しましょう——将来の配偶者の性格が、子どもへのスキル継承に影響します。世界地図の「寓話世界イベント」（魔法の乱れ）は最高の報酬を提供しますが、時間制限あり——毎日地図を確認して。店舗経営は薬屋が序盤最も利益率が高い傾向があります——野草の採取にライセンスが不要なため。Kynseed（不思議な種）を入手したらすぐに植えましょう——木が成熟するには実際のゲーム内の季節が必要で、その成長はあなたの人生の選択に連動しています。`,
    tip_ko: `시간 관리가 《Kynseed》의 핵심 스킬입니다——캐릭터는 실제 게임 시간과 함께 나이를 먹기 때문에, 10년을 농사 최적화에 쏟고 나서야 가족을 꾸리려 하면 늦을 수 있습니다. 초반에 관계 형성을 우선시하세요——미래 배우자의 성격이 자녀에게 이어지는 기술에 영향을 줍니다. 세계 지도의 "寓話 세계 이벤트"(마법 교란)는 최고의 보상을 제공하지만 시간 제한이 있으니 매일 확인하세요. 약국이 초반에 가장 수익성이 높은 편——야생 약초 채집에는 라이선스가 필요 없기 때문입니다. Kynseed(신비한 씨앗)를 받는 즉시 심으세요——나무가 성숙하려면 실제 게임 내 계절이 필요하며, 그 성장은 당신의 인생 선택과 연동됩니다.`,
    tip_de: `Zeitmanagement ist die Schlüsselkompetenz in Kynseed — anders als in den meisten Farmspielen altert dein Charakter in Spielzeit, also kannst du es dir nicht leisten, zehn Spieljahre mit Cropoptimierung zu verbringen, bevor du eine Familie gründest. Priorisiere früh den Beziehungsaufbau: die Persönlichkeit deines zukünftigen Partners beeinflusst, welche Fähigkeiten gut auf deine Kinder übertragen werden. Die Fabled World Events (magische Störungen) bieten die besten Belohnungen, aber mit zeitlichem Limit — check die Weltkarte täglich. Für Ladengeschäfte ist die Apotheke tendenziell das profitabelste frühe Geschäft, da das Sammeln wilder Kräuter keine Lizenz erfordert. Pflanze deinen Kynseed sofort nach dem Erhalt — der Baum braucht reale Spielzeit-Jahreszeiten zum Wachsen, und sein Gedeihen ist mit deinen Lebensentscheidungen verknüpft.`,
  },
  littlewood: {
    title_en: 'Littlewood',
    title_zh: 'Littlewood',
    title_zhTW: 'Littlewood',
    title_ja: 'Littlewood',
    title_ko: 'Littlewood',
    title_de: 'Littlewood',
    emoji: '🏡',
    tag_en: 'The Cozy Town Builder',
    tag_zh: '治愈小镇建造师',
    tag_zhTW: '治愈小鎮建造師',
    tag_ja: 'のんびり街づくりの達人',
    tag_ko: '힐링 마을 건설가',
    tag_de: 'Gemütlicher Stadtbauer',
    platform_en: 'PC · Nintendo Switch',
    platform_zh: 'PC · Nintendo Switch',
    platform_zhTW: 'PC · Nintendo Switch',
    platform_ja: 'PC · Nintendo Switch',
    platform_ko: 'PC · Nintendo Switch',
    platform_de: 'PC · Nintendo Switch',
    why_en: `Littlewood answers a question that many farming game fans quietly ask: what if the combat was already done and I could skip straight to the peaceful part? You play as Horace, a hero who defeated the Dark Wizard and saved the world but cannot remember any of it. With the adventure over, you return to a small village and begin the slow, joyful work of rebuilding it — attracting new residents, constructing buildings, decorating every corner, and pursuing crafting and farming at a pace that is entirely your own. There are no seasons, no crop failures, no energy bars that run out mid-afternoon, and no villager schedules to chase. Littlewood is designed from the ground up as a low-pressure creative sandbox, and it delivers that promise consistently. The farming in Littlewood is supplementary rather than central: you grow ingredients for crafting recipes, which unlock new building types, which attract new resident types. The real draw is the town design system — you have enormous freedom over where every building, path, tree, and flower goes, and the game rewards that creativity with expanded content as your town flourishes. For players who bounced off Stardew Valley's early energy constraints or Animal Crossing's one-thing-per-day pacing, Littlewood is the purest expression of "do whatever you want, whenever you want" cozy game design.`,
    why_zh: `《Littlewood》回答了许多农场游戏玩家心中一个不敢说出口的问题：如果战斗已经结束、可以直接跳到平静的部分该多好？你扮演打败黑暗魔王的英雄，但完全记不得这段历史。冒险结束后，你回到一个小村庄，开始慢慢重建：吸引新居民、建造建筑、装饰每一个角落，按自己的节奏耕种和制作。没有季节更替、没有作物失败、没有耗尽的体力槽，也没有需要追着打招呼的村民时间表。Littlewood从设计之初就是一款低压力创意沙盒，游戏的农业系统是辅助性的——种植食材用于制作配方、解锁新建筑类型、吸引新居民。真正的乐趣在于自由度极高的小镇设计系统。`,
    why_zhTW: `《Littlewood》回答了許多農場遊戲玩家心中一個不敢說出口的問題：如果戰鬥已經結束、可以直接跳到平靜的部分該多好？你扮演打敗黑暗魔王的英雄，但完全記不得這段歷史。冒險結束後，你回到一個小村莊，開始慢慢重建：吸引新居民、建造建築、裝飾每一個角落，按自己的節奏耕種和製作。沒有季節更替、沒有作物失敗、沒有耗盡的體力槽，也沒有需要追著打招呼的村民時間表。Littlewood從設計之初就是一款低壓力創意沙盒，遊戲的農業系統是輔助性的——種植食材用於製作配方、解鎖新建築類型、吸引新居民。真正的樂趣在於自由度極高的小鎮設計系統。`,
    why_ja: `『Littlewood』は、多くの農場ゲームファンが心のどこかで抱えている疑問に答えてくれます——「もう戦闘は終わって、最初からのんびりパートだけやれたらいいのに」。あなたが演じるのは魔王を倒した英雄・Horaceですが、なぜか記憶が一切ありません。冒険を終えた後、小さな村に戻り、ゆっくりと再建を始めていきます——新しい住民を呼び込み、建物を建て、街のあちこちを飾り付けて、自分だけのペースで農業やクラフトを楽しむ。季節の変化もなく、作物の枯れもなく、午後に尽きるスタミナゲージもなく、住民のスケジュールを追いかける必要もありません。農業は街づくりの補助的な要素として機能しており、食材を育てるとクラフトレシピを解放でき、新しい建物タイプが開放され、新しい住民が来てくれます。真の魅力はカスタマイズ自由度の高い街デザインシステムです。`,
    why_ko: `《Littlewood》는 많은 농장 게임 팬들이 마음속으로 품어왔던 질문에 답해줍니다——"전투는 이미 끝났고 바로 평화로운 부분으로 넘어갈 수 있다면 얼마나 좋을까?" 당신은 마왕을 물리친 영웅 Horace를 연기하지만 그 기억이 전혀 없습니다. 모험이 끝난 후 작은 마을로 돌아와 천천히 재건을 시작합니다——새 주민을 유치하고, 건물을 짓고, 구석구석 꾸미며, 자신만의 페이스로 농사와 제작을 즐깁니다. 계절 변화도, 작물 실패도, 오후에 바닥나는 체력 게이지도, 마을 주민 일정을 쫓아다닐 필요도 없습니다. Littlewood는 처음부터 저압력 창의 샌드박스로 설계되었으며, 농업 시스템은 보조적인 역할로——식재료를 키우면 제작 레시피가 해금되고, 새 건물 유형이 열리며, 새 주민이 찾아옵니다. 진정한 매력은 자유도 높은 마을 디자인 시스템에 있습니다.`,
    why_de: `Littlewood beantwortet eine Frage, die viele Farming-Spieler im Stillen stellen: Was wäre, wenn der Kampf schon vorbei wäre und ich direkt zum friedlichen Teil springen könnte? Du spielst Horace, einen Helden, der den Dunklen Zauberer besiegt und die Welt gerettet hat — aber an nichts davon erinnert. Mit dem Abenteuer hinter sich kehrst du in ein kleines Dorf zurück und beginnst die langsame, freudvolle Arbeit des Wiederaufbaus: neue Bewohner anziehen, Gebäude errichten, jede Ecke dekorieren, Handwerk und Ackerbau in deinem eigenen Tempo betreiben. Keine Jahreszeiten, kein Ernteausfall, kein Energiebalken, der am Nachmittag leer ist, keine Dorfbewohnerpläne, denen man hinterherlaufen muss. Littlewood ist von Grund auf als druckfreie kreative Sandbox konzipiert. Das Farming ist ergänzend: du baust Zutaten für Handwerksrezepte an, die neue Gebäudetypen freischalten, die neue Bewohnertypen anziehen. Der echte Sog ist das Stadtdesignsystem mit enormer Freiheit über die Platzierung jedes Elements.`,
    tip_en: `Unlike most farming games, Littlewood has no time pressure whatsoever, so resist the urge to rush toward any particular goal. The best strategy is to build what you find visually satisfying first — the content unlock system is generous enough that doing what you enjoy naturally progresses you toward new content. Prioritize building a Mine early since it produces the hardest-to-find crafting materials (ore and gems) that gate many mid-game buildings. The Museum donation system works similarly to Animal Crossing — the more you donate, the more residents and shops unlock. Talk to every resident daily until you unlock their unique quest lines, which often reward rare building materials or decoration items not obtainable elsewhere.`,
    tip_zh: `与大多数农场游戏不同，《Littlewood》完全没有时间压力，所以抵制急于完成某个目标的冲动。最好的策略是先建造你视觉上最满意的内容——解锁系统足够宽松，做你喜欢的事情自然会推进到新内容。优先建造矿山，因为它产出最难获取的合成材料（矿石和宝石），这些材料制约许多中期建筑的解锁。博物馆捐赠系统类似《动物森友会》——捐赠越多，解锁的居民和商店越多。每天和每位居民对话，直到解锁他们独特的任务线，这些任务往往奖励在其他地方无法获得的稀有建材或装饰品。`,
    tip_zhTW: `與大多數農場遊戲不同，《Littlewood》完全沒有時間壓力，所以抵制急於完成某個目標的衝動。最好的策略是先建造你視覺上最滿意的內容——解鎖系統足夠寬鬆，做你喜歡的事情自然會推進到新內容。優先建造礦山，因為它產出最難獲取的合成材料（礦石和寶石），這些材料制約許多中期建築的解鎖。博物館捐贈系統類似《動物森友會》——捐贈越多，解鎖的居民和商店越多。每天和每位居民對話，直到解鎖他們獨特的任務線，這些任務往往獎勵在其他地方無法獲得的稀有建材或裝飾品。`,
    tip_ja: `ほとんどの農場ゲームと異なり、『Littlewood』には時間的なプレッシャーがまったくないので、特定の目標に向かって急ごうとする衝動に負けないで。自分が見た目的に気に入るものから作っていくのが最善の戦略です——コンテンツ解放システムは寛大なので、楽しいと思うことをやっているだけで自然と進みます。鉱山を早めに建てることを優先しましょう——中盤以降の建物に必要な鉱石や宝石など、入手しにくい素材を産出するためです。博物館への寄贈システムはどうぶつの森に似ており、寄贈すればするほど新しい住民や店が解放されます。毎日全住民に話しかけて、独自のクエストラインを解放しましょう——他では手に入らない希少な建材や装飾品を報酬としてもらえることが多いです。`,
    tip_ko: `대부분의 농장 게임과 달리 《Littlewood》에는 시간적 압박이 전혀 없으니, 특정 목표를 향해 서두르려는 충동을 참으세요. 시각적으로 가장 마음에 드는 것부터 만드는 게 최선의 전략입니다——해금 시스템이 너그러워서 즐거운 것을 하다 보면 자연스럽게 새 콘텐츠로 이어집니다. 광산을 일찍 건설하는 것을 우선시하세요——중반 건물 해금에 필요한 광석과 보석 같은 구하기 어려운 제작 재료를 생산합니다. 박물관 기증 시스템은 동물의 숲과 비슷해서——기증할수록 새 주민과 상점이 해금됩니다. 매일 모든 주민에게 말을 걸어 고유 퀘스트 라인을 해금하세요——다른 곳에서는 얻을 수 없는 희귀 건축 재료나 장식 아이템을 보상으로 받을 수 있습니다.`,
    tip_de: `Anders als bei den meisten Farmspielen gibt es in Littlewood keinerlei Zeitdruck, also widerstehe dem Drang, auf ein bestimmtes Ziel hinzusteuern. Bau einfach das, was dir optisch am besten gefällt — das Content-Unlock-System ist so großzügig, dass du durch natürliches Spielen automatisch weiterkommst. Priorisiere früh den Bau einer Mine, da sie die schwer erhältlichen Handwerksmaterialien (Erz und Edelsteine) produziert, die viele Mittelspiel-Gebäude erfordern. Das Museum-Spendensystem funktioniert ähnlich wie bei Animal Crossing — je mehr du spendest, desto mehr Bewohner und Läden schaltest du frei. Sprich täglich mit jedem Bewohner, bis du ihre einzigartigen Questlinien freischaltest — die Belohnungen umfassen oft seltene Baumaterialien oder Dekorationsgegenstände, die sonst nirgends erhältlich sind.`,
  },
  tavern: {
    title_en: "Travellers Rest",
    title_zh: "旅者驿站（Travellers Rest）",
    title_zhTW: "旅者驛站（Travellers Rest）",
    title_ja: "Travellers Rest",
    title_ko: "Travellers Rest",
    title_de: "Travellers Rest",
    emoji: '🍺',
    tag_en: 'The Innkeeper Farmer',
    tag_zh: '耕作酒馆主人',
    tag_zhTW: '耕作酒館主人',
    tag_ja: '農場も経営も楽しむ宿屋主人',
    tag_ko: '농사짓는 여관 주인',
    tag_de: 'Der Gastwirt-Bauer',
    platform_en: 'PC (Early Access)',
    platform_zh: 'PC（抢先体验）',
    platform_zhTW: 'PC（搶先體驗）',
    platform_ja: 'PC（アーリーアクセス）',
    platform_ko: 'PC(얼리 액세스)',
    platform_de: 'PC (Early Access)',
    why_en: `Travellers Rest is the game for players who want the wholesome loop of growing ingredients and cooking meals, but whose real fantasy is watching satisfied customers enjoy the fruits of that labor in a warm, candlelit inn. You inherit a run-down medieval tavern in a fantasy world, and your job is to restore it to glory: grow crops and herbs in the garden behind the tavern, brew ales and wines in your cellar, cook dishes in your kitchen, hire staff, upgrade your facilities, decorate your inn, and serve a parade of travelers who each have specific preferences, dietary needs, and budgets. The farming component in Travellers Rest is meaningfully integrated — the herbs you grow directly affect the quality of your potions and food, which determines customer satisfaction scores and tips — but it is always in service of the tavern experience rather than the end goal itself. The game has a charming pixel art style with a warm color palette that makes the inn feel genuinely inviting. Character visitors have distinct visual designs and reaction systems, so you learn to recognize regular customers and adapt your menu to their preferences over time. Travellers Rest is still in Early Access and lacks the content depth of a fully released game, but its core loop — plant, brew, cook, serve, upgrade — is already polished and satisfying. For players who love both the farming loop and the customer-service satisfaction of games like PlateUp!, this is the closest thing to having both in one package.`,
    why_zh: `《旅者驿站》（Travellers Rest）适合那些喜欢种植食材、烹饪佳肴，但真正的幻想是看着客人在温暖烛光下享用这些劳动成果的玩家。你继承了一家破旧的中世纪奇幻小酒馆，任务是让它重现辉煌：在后院种植作物和草药、在地窖酿造啤酒和葡萄酒、在厨房烹饪菜肴、雇用员工、升级设施、装饰酒馆，并接待各有偏好的旅客。游戏的农业部分真正融入了整体体验——你种的草药直接影响药水和食物质量，进而决定顾客满意度和小费收入。游戏目前仍在抢先体验阶段，但核心循环（种植、酿造、烹饪、服务、升级）已经打磨得相当流畅。`,
    why_zhTW: `《旅者驛站》（Travellers Rest）適合那些喜歡種植食材、烹飪佳餚，但真正的幻想是看著客人在溫暖燭光下享用這些勞動成果的玩家。你繼承了一家破舊的中世紀奇幻小酒館，任務是讓它重現輝煌：在後院種植作物和草藥、在地窖釀造啤酒和葡萄酒、在廚房烹飪菜餚、雇用員工、升級設施、裝飾酒館，並接待各有偏好的旅客。遊戲的農業部分真正融入了整體體驗——你種的草藥直接影響藥水和食物質量，進而決定顧客滿意度和小費收入。遊戲目前仍在搶先體驗階段，但核心循環（種植、釀造、烹飪、服務、升級）已經打磨得相當流暢。`,
    why_ja: `『Travellers Rest』は、食材を育てて料理を作るほっこりループが好きだけど、本当の夢は温かなろうそくの灯りの中で満足したお客さんがその成果を楽しむ姿を眺めることだ——そんなプレイヤーのための作品です。ファンタジー世界で荒廃した中世の宿屋を受け継ぎ、その栄光を取り戻すのがあなたの仕事。裏庭で作物や薬草を育て、地下室でエールやワインを醸造し、厨房で料理を作り、スタッフを雇い、設備をアップグレードし、宿屋を飾り付け、それぞれ好みも予算も異なる旅人たちをもてなしていきます。農業コンポーネントは体験に有機的に統合されており——育てた薬草がポーションや料理のクオリティに直接影響し、顧客満足度とチップ収入が変わる仕組み。まだアーリーアクセス段階ですが、「育てる・醸造する・料理する・接客する・アップグレードする」というコアループはすでに洗練されて満足感があります。`,
    why_ko: `《Travellers Rest》는 식재료를 키우고 요리를 만드는 따뜻한 루프를 좋아하지만, 진짜 꿈은 따뜻한 촛불 아래에서 손님들이 그 결실을 즐기는 모습을 바라보는 것인 플레이어를 위한 게임입니다. 판타지 세계의 낡은 중세 여관을 물려받아 영광을 되찾는 것이 목표입니다. 뒷마당에서 작물과 약초를 키우고, 지하실에서 에일과 와인을 양조하고, 부엌에서 요리하고, 직원을 고용하고, 시설을 업그레이드하고, 여관을 꾸미고, 각자 다른 취향을 가진 여행자들을 접대합니다. 농업 요소는 전체 경험에 유기적으로 통합되어 있어——키운 약초가 포션과 음식의 품질에 직접 영향을 미치고, 이것이 고객 만족도와 팁 수익을 결정합니다. 아직 얼리 액세스 단계이지만 핵심 루프(재배→양조→요리→서비스→업그레이드)는 이미 잘 다듬어져 있어 만족스럽습니다.`,
    why_de: `Travellers Rest ist das Spiel für Spieler, die den befriedigenden Kreislauf des Anbaus und Kochens lieben, deren eigentliche Traumvorstellung aber ist, zufriedene Gäste in einem warmen, kerzenbeschienenen Gasthaus die Früchte dieser Arbeit genießen zu sehen. Du erbst eine heruntergekommene mittelalterliche Taverne in einer Fantasywelt und deine Aufgabe ist es, ihren Ruhm wiederherzustellen: Anbauen von Kräutern und Gemüse im Garten, Brauen von Ales und Weinen im Keller, Kochen von Gerichten in der Küche, Einstellen von Personal, Upgraden der Einrichtungen, Dekorieren des Gasthauses und Bedienen einer Parade von Reisenden mit jeweils eigenen Vorlieben. Das Farming-Element ist organisch eingebunden — die Kräuter, die du anbaust, beeinflussen direkt die Qualität deiner Tränke und Speisen. Travellers Rest ist noch im Early Access, aber der Kernkreislauf — anpflanzen, brauen, kochen, servieren, upgraden — ist bereits poliert und befriedigend.`,
    tip_en: `Travellers Rest rewards patience and planning more than most farming games. Before upgrading your tavern's capacity (adding more tables), first upgrade the quality of what you serve — a smaller, well-run tavern with high-quality food and drink earns more per customer than a large one serving mediocre dishes. Plant a herb garden as early as possible: medicinal herbs have high margins and are needed for potions, which sell faster than most food items early on. Study each customer type's preferences before they leave — their reaction icons tell you what they wanted more of, and adapting your menu to repeat visitors builds loyalty that unlocks special orders. For brewing, start with ale before wine because the fermentation time is shorter and cash flow is critical in the first few in-game seasons.`,
    tip_zh: `《旅者驿站》比大多数农场游戏更考验耐心和规划能力。在扩大酒馆容量（加桌子）之前，先提升出品质量——一家精而优的小酒馆比一家出品平庸的大酒馆每位顾客收益更高。尽早建立草药园：药草利润高且用于酿造药水，药水在早期比大多数食物卖得更快。在顾客离开前研究他们的偏好——反应图标告诉你他们想要更多什么，根据回头客调整菜单能建立忠诚度并解锁特殊订单。酿造方面，先做啤酒再做葡萄酒，因为啤酒发酵时间更短，早期游戏阶段现金流至关重要。`,
    tip_zhTW: `《旅者驛站》比大多數農場遊戲更考驗耐心和規劃能力。在擴大酒館容量（加桌子）之前，先提升出品質量——一家精而優的小酒館比一家出品平庸的大酒館每位顧客收益更高。盡早建立草藥園：藥草利潤高且用於釀造藥水，藥水在早期比大多數食物賣得更快。在顧客離開前研究他們的偏好——反應圖標告訴你他們想要更多什麼，根據回頭客調整菜單能建立忠誠度並解鎖特殊訂單。釀造方面，先做啤酒再做葡萄酒，因為啤酒發酵時間更短，早期遊戲階段現金流至關重要。`,
    tip_ja: `『Travellers Rest』は多くの農場ゲームより忍耐と計画力が試されます。宿屋のキャパシティ拡張（テーブルを増やす）の前に、まず提供する物のクオリティを上げましょう——高品質な料理と飲み物を出す小さな宿屋のほうが、平凡なものを出す大きな宿屋より1人あたりの収益が高いです。薬草園はできるだけ早く作りましょう——薬草は利益率が高く、ポーションに必要で、序盤は食べ物よりポーションのほうが売れやすいです。お客さんが帰る前に好みを研究しましょう——リアクションアイコンで何をもっと望んでいたかがわかります。リピーターの傾向に合わせてメニューを調整すると忠誠度が上がり、特別注文が解放されます。醸造はワインよりエールから始めましょう——発酵時間が短く、序盤のゲームではキャッシュフローが重要です。`,
    tip_ko: `《Travellers Rest》는 대부분의 농장 게임보다 인내심과 계획이 더 중요합니다. 여관 수용 인원을 늘리기(테이블 추가) 전에 먼저 제공하는 것의 품질을 높이세요——고품질 음식과 음료를 내는 작은 여관이 평범한 것을 내는 큰 여관보다 손님 1인당 수익이 높습니다. 약초 정원은 최대한 일찍 만드세요——약초는 마진이 높고 포션에 필요하며, 초반에는 음식보다 포션이 더 잘 팔립니다. 손님이 떠나기 전에 그들의 취향을 파악하세요——리액션 아이콘이 무엇을 더 원했는지 알려줍니다. 단골 취향에 맞게 메뉴를 조정하면 충성도가 쌓여 특별 주문이 해금됩니다. 양조는 와인보다 에일부터 시작하세요——발효 시간이 짧고 초반 게임에서 현금 흐름이 중요하기 때문입니다.`,
    tip_de: `Travellers Rest belohnt Geduld und Planung mehr als die meisten Farmspiele. Bevor du die Kapazität deiner Taverne erweiterst (mehr Tische hinzufügst), verbessere zuerst die Qualität deines Angebots — eine kleinere, gut geführte Taverne mit hochwertigem Essen und Trinken verdient mehr pro Gast als eine große mit mittelmäßigen Gerichten. Lege so früh wie möglich einen Kräutergarten an: Heilkräuter haben hohe Margen und werden für Tränke benötigt, die in der Frühphase besser verkaufen als die meisten Speisen. Studiere die Vorlieben jedes Gasttyps, bevor er geht — die Reaktions-Icons zeigen dir, was er sich mehr gewünscht hätte. Das Anpassen der Speisekarte an Stammgäste baut Loyalität auf und schaltet Sonderbestellungen frei. Beim Brauen: fang mit Ale statt Wein an, da die Gärzeit kürzer ist und der Cashflow in den ersten Spielsaisonen entscheidend ist.`,
  },
}

function calcResult(answers: Pick[]): Pick {
  const counts: Record<Pick, number> = { dinkum: 0, kynseed: 0, littlewood: 0, tavern: 0 }
  for (const a of answers) counts[a]++
  return Object.entries(counts).sort((x, y) => y[1] - x[1])[0][0] as Pick
}

export function CozyIndieFarmQuiz({ locale }: { locale: string }) {
  const getLoc = (zh: string, en: string, zhTW?: string, ja?: string, ko?: string, de?: string): string => {
    if (locale === 'zh') return zh
    if (locale === 'zh-TW') return zhTW ?? zh
    if (locale === 'ja') return ja ?? en
    if (locale === 'ko') return ko ?? en
    if (locale === 'de') return de ?? en
    return en
  }

  const isZh = locale === 'zh' || locale === 'zh-TW'

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
      `我的治愈独立农场推荐是《${r.title_zh}》！${r.emoji} 来测测你的结果？${BASE_URL}/zh/quizzes/cozy-indie-farm-quiz`,
      `My cozy indie farm match is ${r.title_en}! ${r.emoji} Which one are you? ${BASE_URL}/en/quizzes/cozy-indie-farm-quiz`,
      `我的治愈獨立農場推薦是《${r.title_zhTW}》！${r.emoji} 來測測你的結果？${BASE_URL}/zh-TW/quizzes/cozy-indie-farm-quiz`,
      `私のコージーファームゲームは『${r.title_ja}』でした！${r.emoji} あなたは？ ${BASE_URL}/ja/quizzes/cozy-indie-farm-quiz`,
      `내 코지 농장 게임 추천은 ${r.title_ko}입니다！${r.emoji} 당신의 결과는？ ${BASE_URL}/ko/quizzes/cozy-indie-farm-quiz`,
      `Mein Cozy-Farm-Match ist ${r.title_de}! ${r.emoji} Was ist deins? ${BASE_URL}/de/quizzes/cozy-indie-farm-quiz`,
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
              {getLoc('游玩建议', 'Pro Tip', '遊玩建議', 'プロのヒント', '플레이 팁', 'Profi-Tipp')}
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
              '想发现更多隐藏的好农场游戏？',
              'Want to discover more hidden farming gems?',
              '想發現更多隱藏的好農場遊戲？',
              '隠れた名作ファームゲームをもっと発見したいですか？',
              '숨겨진 농장 게임 명작을 더 발견하고 싶으신가요?',
              'Willst du noch mehr versteckte Farming-Perlen entdecken?',
            )}
          </p>
          <p className="text-sm text-[#e8dcc8]">
            {getLoc(
              'TendFarm 正在研发农场节律追踪功能——把 Cozy 游戏的季节感带入你的真实生活节奏。',
              'TendFarm is building a farm rhythm tracker — bringing the seasonal feeling of cozy games into real life.',
              'TendFarm 正在研發農場節律追蹤功能——把 Cozy 遊戲的季節感帶入你的真實生活節奏。',
              'TendFarm はファームリズムトラッカーを開発中です——コージーゲームの季節感をリアルな生活リズムに。',
              'TendFarm은 농장 리듬 트래커를 개발 중입니다 — 코지 게임의 계절감을 실제 생활 리듬으로.',
              'TendFarm entwickelt einen Farm-Rhythmus-Tracker — das saisonale Gefühl von Cozy Games ins echte Leben bringen.',
            )}
          </p>
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

  return (
    <div className="mx-auto max-w-2xl rounded-2xl border border-[#2d3d2d] bg-[#0f1a0f] p-6 md:p-8">
      <div className="mb-6">
        <div className="mb-3 flex items-center justify-between text-xs text-[#8a9a7a]">
          <span>
            {getLoc(
              `第 ${current + 1} / ${QUESTIONS.length} 题`,
              `Question ${current + 1} of ${QUESTIONS.length}`,
              `第 ${current + 1} / ${QUESTIONS.length} 題`,
              `質問 ${current + 1} / ${QUESTIONS.length}`,
              `질문 ${current + 1} / ${QUESTIONS.length}`,
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
