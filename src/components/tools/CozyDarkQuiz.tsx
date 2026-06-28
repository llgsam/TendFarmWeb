'use client'

import { useState } from 'react'
import { BASE_URL } from '@/lib/config'

type Pick = 'dave-diver' | 'cult-lamb' | 'dredge' | 'potion-craft'

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
  const copyLabel = locale === 'zh' ? '📋 复制结果' : locale === 'zh-TW' ? '📋 複製結果' : locale === 'ja' ? '📋 コピー' : locale === 'ko' ? '📋 복사' : locale === 'de' ? '📋 Kopieren' : '📋 Copy result'
  const copiedLabel = locale === 'zh' ? '✓ 已复制！' : locale === 'zh-TW' ? '✓ 已複製！' : locale === 'ja' ? '✓ コピーしました！' : locale === 'ko' ? '✓ 복사되었습니다!' : locale === 'de' ? '✓ Kopiert!' : '✓ Copied!'
  const shareLabel = locale === 'zh' ? '分享' : locale === 'zh-TW' ? '分享' : locale === 'ja' ? 'シェア' : locale === 'ko' ? '공유' : locale === 'de' ? 'Teilen' : 'Share'
  return (
    <div className="flex flex-1 gap-3">
      <button
        onClick={handleCopy}
        className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-[#2d3d2d] bg-[#1a2e1a]/50 px-4 py-3 text-sm text-[#e8dcc8] transition-colors hover:border-[#f0a832]/40 hover:text-[#f0a832]"
      >
        {copied ? copiedLabel : copyLabel}
      </button>
      <a
        href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`}
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
    q_en: "You want a cozy game that isn't fully cozy. Which edge sounds most appealing?",
    q_zh: '你想要一款不完全温馨的 cozy 游戏。哪种边缘感最吸引你？',
    q_zhTW: '你想要一款不完全溫馨的 cozy 遊戲。哪種邊緣感最吸引你？',
    q_ja: 'ちょっとダークなコージーゲームをお探しですね。どんな「刺激」が一番魅力的ですか？',
    q_ko: '완전히 아늑하지는 않은 코지 게임을 원하시나요. 어떤 긴장감이 가장 매력적인가요?',
    q_de: 'Du willst ein Cozy-Game, das nicht ganz so cozy ist. Welche Art von Schärfe klingt am reizvollsten?',
    options: [
      { en: 'High stakes — a satisfying management loop with real pressure and a gripping story', zh: '高风险——有真实压力和引人入胜故事的令人满足的管理循环', zhTW: '高風險——有真實壓力和引人入勝故事的令人滿足的管理循環', ja: 'ハイリスク——本物のプレッシャーと引き込まれるストーリーを持つ満足感のある経営ループ', ko: '높은 위험 — 실제 압박감과 흥미진진한 스토리가 있는 만족스러운 경영 루프', de: 'Hoher Einsatz — eine befriedigende Managementschleife mit echtem Druck und einer fesselnden Geschichte', type: 'dave-diver' },
      { en: 'Dark whimsy — adorable aesthetic over genuinely dark themes and real combat challenge', zh: '暗黑异想——在真正黑暗主题和真实战斗挑战上覆盖可爱美学', zhTW: '暗黑奇想——在真正黑暗主題和真實戰鬥挑戰上覆蓋可愛美學', ja: 'ダークな奇想——本当に暗いテーマとリアルな戦闘の上にかわいいビジュアルを重ねる', ko: '어두운 기발함 — 진정으로 어두운 테마와 실제 전투 도전 위에 귀여운 미학', de: 'Düstere Verspieltheit — ein niedliches Aussehen über wirklich finstere Themen und echte Kampfherausforderungen', type: 'cult-lamb' },
      { en: 'Creeping dread — peaceful surface activity with something deeply wrong underneath', zh: '渐进的恐惧——平和的表面活动，但下面有些东西深度不对劲', zhTW: '漸進的恐懼——平和的表面活動，但下面有些東西深度不對勁', ja: '忍び寄る恐怖——穏やかな表面の下に何か根本的におかしいものが潜んでいる', ko: '스며드는 두려움 — 평화로운 표면 활동이지만 그 아래에 무언가 깊이 잘못된 것이 있는', de: 'Schleichendes Grauen — friedliche Oberfläche, aber darunter stimmt etwas ganz und gar nicht', type: 'dredge' },
      { en: 'Moral weight — a craft I choose to use for good or ill, with consequences', zh: '道德重量——我选择用于善恶的工艺，有相应后果', zhTW: '道德重量——我選擇用於善惡的工藝，有相應後果', ja: '道徳的な重み——善にも悪にも使える技術を選択し、その結果と向き合う', ko: '도덕적 무게 — 선이나 악을 위해 선택하는 기술, 그에 따른 결과가 있는', de: 'Moralisches Gewicht — ein Handwerk, das ich für Gutes oder Böses einsetze, mit entsprechenden Konsequenzen', type: 'potion-craft' },
    ],
  },
  {
    q_en: 'Which setting immediately draws you in?',
    q_zh: '哪个设定立刻吸引了你？',
    q_zhTW: '哪個設定立刻吸引了你？',
    q_ja: 'どの舞台設定が一番ひかれますか？',
    q_ko: '어떤 배경이 즉시 당신을 끌어당기나요?',
    q_de: 'Welches Setting zieht dich sofort in seinen Bann?',
    options: [
      { en: 'A vibrant tropical ocean and a sushi restaurant that becomes an empire', zh: '充满活力的热带海洋，以及一家成为帝国的寿司餐厅', zhTW: '充滿活力的熱帶海洋，以及一家成為帝國的壽司餐廳', ja: '活気ある南国の海と、やがて帝国となる寿司レストラン', ko: '활기찬 열대 바다와 제국이 되는 초밥 레스토랑', de: 'Ein lebendiger tropischer Ozean und ein Sushi-Restaurant, das zu einem Imperium wird', type: 'dave-diver' },
      { en: 'A haunted forest full of heretics, and you are building a cult to challenge a death god', zh: '充满异教徒的幽灵森林，而你正在建立一个挑战死神的邪教', zhTW: '充滿異教徒的幽靈森林，而你正在建立一個挑戰死神的邪教', ja: '異端者だらけの呪われた森——そこで死の神に挑む邪教を建設していく', ko: '이단자로 가득한 유령 숲, 그리고 죽음의 신에게 도전하는 교단을 세우는 당신', de: 'Ein verwunschener Wald voller Ketzer, und du baust einen Kult auf, um einen Todesgott herauszufordern', type: 'cult-lamb' },
      { en: 'Fog-shrouded archipelago waters where the fish are wrong and the sea has a memory', zh: '被雾气笼罩的群岛水域，那里的鱼不对劲，海洋有记忆', zhTW: '被霧氣籠罩的群島水域，那裡的魚不對勁，海洋有記憶', ja: '霧に包まれた群島の海——魚がおかしく、海が記憶を持つ場所', ko: '안개에 싸인 군도의 바다, 물고기가 이상하고 바다가 기억을 가진 곳', de: 'Nebelumhüllte Archipelgewässer, in denen die Fische falsch sind und das Meer eine Erinnerung hat', type: 'dredge' },
      { en: 'A medieval town where you brew potions in a cluttered alchemist shop', zh: '一个中世纪小镇，你在凌乱的炼金师商店里调制药水', zhTW: '一個中世紀小鎮，你在凌亂的煉金師商店裡調製藥水', ja: '中世の町の雑然とした錬金術師の店でポーションを調合する', ko: '중세 마을의 어지러운 연금술사 가게에서 물약을 만드는', de: 'Eine mittelalterliche Stadt, in der du in einem vollgestopften Alchemistenladen Tränke braust', type: 'potion-craft' },
    ],
  },
  {
    q_en: 'How do you feel about roguelike mechanics (die, lose progress, restart runs)?',
    q_zh: '你对 roguelike 机制（死亡、失去进度、重新开始轮次）感觉如何？',
    q_zhTW: '你對 roguelike 機制（死亡、失去進度、重新開始輪次）感覺如何？',
    q_ja: 'ローグライクの仕組み（死亡、進行状況のリセット、再スタート）についてどう思いますか？',
    q_ko: '로그라이크 메커니즘(죽음, 진행 손실, 런 재시작)에 대해 어떻게 생각하나요?',
    q_de: 'Wie stehst du zu Roguelike-Mechaniken (sterben, Fortschritt verlieren, Runs neu starten)?',
    options: [
      { en: "No roguelike at all — I want persistent progress with no run resets", zh: '完全不要 roguelike——我想要持续进度，不需要重置轮次', zhTW: '完全不要 roguelike——我想要持續進度，不需要重置輪次', ja: 'ローグライクなし——リセットなしで積み重なる進行が欲しい', ko: '로그라이크 전혀 없음 — 런 리셋 없이 지속적인 진행을 원해요', de: 'Kein Roguelike — ich will dauerhaften Fortschritt ohne Run-Resets', type: 'dave-diver' },
      { en: "I enjoy them — dying in a dungeon and coming back stronger is satisfying", zh: '我喜欢——在地下城死亡然后变得更强回来是令人满足的', zhTW: '我喜歡——在地下城死亡然後變得更強回來是令人滿足的', ja: '好き——ダンジョンで死んでより強くなって戻ってくるのが楽しい', ko: '좋아요 — 던전에서 죽고 더 강해져서 돌아오는 게 만족스러워요', de: 'Ich mag sie — im Dungeon zu sterben und stärker zurückzukommen ist befriedigend', type: 'cult-lamb' },
      { en: "No roguelike — I want a slow, atmospheric game with no run resets", zh: '不要 roguelike——我想要缓慢的、有氛围的游戏，没有轮次重置', zhTW: '不要 roguelike——我想要緩慢的、有氛圍的遊戲，沒有輪次重置', ja: 'ローグライクなし——リセットのないゆっくりした雰囲気のゲームがいい', ko: '로그라이크 없음 — 런 리셋 없이 느리고 분위기 있는 게임을 원해요', de: 'Kein Roguelike — ich will ein langsames, atmosphärisches Spiel ohne Run-Resets', type: 'dredge' },
      { en: "No roguelike — the satisfaction is in the crafting puzzle, not survival runs", zh: '不要 roguelike——满足感在于制作谜题，而不是生存轮次', zhTW: '不要 roguelike——滿足感在於製作謎題，而不是生存輪次', ja: 'ローグライクなし——満足感はクラフトパズルにあって、サバイバルランではない', ko: '로그라이크 없음 — 만족감은 제작 퍼즐에 있지 생존 런에 있지 않아요', de: 'Kein Roguelike — die Befriedigung liegt im Crafting-Rätsel, nicht in Survival-Runs', type: 'potion-craft' },
    ],
  },
  {
    q_en: 'Which of these core loops sounds most satisfying to you?',
    q_zh: '以下哪个核心循环听起来对你最令人满足？',
    q_zhTW: '以下哪個核心循環聽起來對你最令人滿足？',
    q_ja: 'どのコアループが一番楽しそうですか？',
    q_ko: '다음 핵심 루프 중 어느 것이 가장 만족스럽게 들리나요?',
    q_de: 'Welche dieser Kernschleifen klingt für dich am befriedigendsten?',
    options: [
      { en: 'Dive deep, catch fish, cook them into dishes, serve customers, use profits to dive deeper', zh: '深潜、抓鱼、烹饪成菜肴、服务顾客、用利润潜得更深', zhTW: '深潛、抓魚、烹飪成菜餚、服務顧客、用利潤潛得更深', ja: '深く潜る、魚を捕る、料理を作る、お客さんに出す、その利益でさらに深く潜る', ko: '깊이 잠수하고, 물고기를 잡고, 요리로 만들고, 고객에게 서빙하고, 수익으로 더 깊이 잠수하기', de: 'Tief tauchen, Fische fangen, daraus Gerichte kochen, Kunden bedienen, Gewinne nutzen um noch tiefer zu tauchen', type: 'dave-diver' },
      { en: 'Build a cult village during the day, raid enemy dungeons at night, grow your followers', zh: '白天建造邪教村庄，夜晚突袭敌人地下城，发展追随者', zhTW: '白天建造邪教村莊，夜晚突襲敵人地下城，發展追隨者', ja: '昼は邪教の村を建設し、夜は敵のダンジョンを攻略して信者を増やす', ko: '낮에는 교단 마을을 짓고, 밤에는 적의 던전을 습격하고, 추종자를 늘리기', de: 'Tagsüber ein Kultdorf aufbauen, nachts feindliche Dungeons überfallen, Anhänger gewinnen', type: 'cult-lamb' },
      { en: 'Sail carefully at night, fish strange waters, try not to think too hard about what you catch', zh: '夜晚小心航行、在奇异水域钓鱼、尽量不要太认真想你钓到了什么', zhTW: '夜晚小心航行、在奇異水域釣魚、盡量不要太認真想你釣到了什麼', ja: '夜は慎重に航海し、奇妙な海で釣りをして、何を釣ったか深く考えないようにする', ko: '밤에 조심스럽게 항해하고, 이상한 바다에서 낚시하고, 잡은 것에 대해 너무 깊이 생각하지 않으려 하기', de: 'Nachts vorsichtig segeln, in seltsamen Gewässern fischen, und nicht zu genau darüber nachdenken, was man fängt', type: 'dredge' },
      { en: 'Draw ingredient paths on a map, discover recipes through experimentation, fill customer orders', zh: '在地图上画出材料路径、通过实验发现配方、完成客户订单', zhTW: '在地圖上畫出材料路徑、通過實驗發現配方、完成客戶訂單', ja: 'マップ上で材料の経路を描き、実験でレシピを発見し、お客の注文をこなす', ko: '지도에 재료 경로를 그리고, 실험으로 레시피를 발견하고, 고객 주문을 채우기', de: 'Zutaten-Pfade auf einer Karte zeichnen, Rezepte durch Experimentieren entdecken, Kundenbestellungen erfüllen', type: 'potion-craft' },
    ],
  },
  {
    q_en: 'How much story depth do you need in a game to stay engaged?',
    q_zh: '你需要多少故事深度才能保持对游戏的投入？',
    q_zhTW: '你需要多少故事深度才能保持對遊戲的投入？',
    q_ja: 'ゲームに没頭し続けるためにどれくらいのストーリーの深さが必要ですか？',
    q_ko: '게임에 계속 몰입하기 위해 얼마나 깊은 스토리가 필요한가요?',
    q_de: 'Wie viel Storytiefe brauchst du in einem Spiel, um dranbleiben zu können?',
    options: [
      { en: "A lot — I want a game with a real narrative arc that surprises me", zh: '很多——我想要一款有真实叙事弧线、能让我惊讶的游戏', zhTW: '很多——我想要一款有真實敘事弧線、能讓我驚訝的遊戲', ja: 'たくさん——本当の物語の弧があって驚かせてくれるゲームがいい', ko: '많이 — 나를 놀라게 하는 진짜 서사 호를 가진 게임을 원해요', de: 'Viel — ich will ein Spiel mit einem echten Erzählbogen, der mich überrascht', type: 'dave-diver' },
      { en: "Moderate — I want lore and bosses with personality, but gameplay is the main draw", zh: '适中——我想要有个性的传说和 Boss，但游戏玩法是主要吸引力', zhTW: '適中——我想要有個性的傳說和 Boss，但遊戲玩法是主要吸引力', ja: '程々——世界観と個性的なボスは欲しいけど、ゲームプレイがメインの魅力', ko: '적당히 — 개성 있는 세계관과 보스를 원하지만 게임플레이가 주된 매력이에요', de: 'Moderat — ich will Lore und Bosse mit Persönlichkeit, aber das Gameplay ist der Hauptreiz', type: 'cult-lamb' },
      { en: "Atmospheric and implied — I want story told through environment and suggestion, not cutscenes", zh: '有氛围且暗示性——我想通过环境和暗示讲述故事，而不是过场动画', zhTW: '有氛圍且暗示性——我想通過環境和暗示講述故事，而不是過場動畫', ja: '雰囲気と示唆——カットシーンではなく、環境と示唆でストーリーを語ってほしい', ko: '분위기 있고 암시적인 — 컷신이 아닌 환경과 암시로 이야기를 전달받고 싶어요', de: 'Atmosphärisch und angedeutet — ich will Geschichte durch Umgebung und Andeutungen, nicht durch Cutscenes', type: 'dredge' },
      { en: "Minimal narrative — the crafting puzzle itself is the experience I am here for", zh: '最少叙事——制作谜题本身就是我来的体验', zhTW: '最少敘事——製作謎題本身就是我來的體驗', ja: '最小限のストーリー——クラフトパズルそのものが私が求める体験', ko: '최소한의 서사 — 제작 퍼즐 자체가 내가 원하는 경험이에요', de: 'Minimale Handlung — das Crafting-Rätsel selbst ist das Erlebnis, für das ich hier bin', type: 'potion-craft' },
    ],
  },
  {
    q_en: 'What would you most want to tell a friend about this game after your first session?',
    q_zh: '第一次游戏后，你最想告诉朋友关于这款游戏的什么？',
    q_zhTW: '第一次遊戲後，你最想告訴朋友關於這款遊戲的什麼？',
    q_ja: '最初のプレイ後に、このゲームについて友達に一番伝えたいことは何ですか？',
    q_ko: '첫 번째 세션 후 이 게임에 대해 친구에게 가장 말하고 싶은 것은 무엇인가요?',
    q_de: 'Was würdest du einem Freund nach deiner ersten Spielsession am liebsten über dieses Spiel erzählen?',
    options: [
      { en: '"This game has no right being this good — I stayed up until 3am and I don\'t regret it"', zh: '"这款游戏没有理由这么好——我熬到凌晨 3 点，但我不后悔"', zhTW: '"這款遊戲沒有理由這麼好——我熬到凌晨 3 點，但我不後悔"', ja: '「このゲームがこんなに面白いのはおかしい——朝3時まで起きてたけど後悔ゼロ」', ko: '"이 게임이 이렇게 좋을 권리가 없는데 — 새벽 3시까지 깨어 있었고 후회하지 않아"', de: '„Dieses Spiel hat kein Recht, so gut zu sein — ich war bis 3 Uhr morgens wach und bereue es nicht"', type: 'dave-diver' },
      { en: '"It looks adorable but the game has me doing things I cannot believe I am doing"', zh: '"它看起来很可爱，但游戏让我做了一些我无法相信我在做的事情"', zhTW: '"它看起來很可愛，但遊戲讓我做了一些我無法相信我在做的事情"', ja: '「見た目はかわいいのに、自分がやっていることが信じられない……」', ko: '"귀엽게 생겼는데 내가 하고 있는 일들이 믿기지 않아"', de: '„Es sieht niedlich aus, aber das Spiel lässt mich Dinge tun, die ich kaum glauben kann"', type: 'cult-lamb' },
      { en: '"Something about it is deeply unsettling and I cannot stop thinking about it"', zh: '"它有些深度令人不安的东西，我无法停止思考"', zhTW: '"它有些深度令人不安的東西，我無法停止思考"', ja: '「なんか深く不気味なものがあって、考えるのが止まらない」', ko: '"뭔가 깊이 불안하게 만드는 게 있어서 생각을 멈출 수가 없어"', de: '„Da ist etwas zutiefst Beunruhigendes daran, und ich kann nicht aufhören, daran zu denken"', type: 'dredge' },
      { en: '"It is the most satisfying crafting loop I have ever played — deceptively simple"', zh: '"这是我玩过的最令人满足的制作循环——看似简单实则不然"', zhTW: '"這是我玩過的最令人滿足的製作循環——看似簡單實則不然"', ja: '「今まで遊んだ中で一番満足度の高いクラフトループ——シンプルに見えて奥が深い」', ko: '"지금까지 플레이한 것 중 가장 만족스러운 제작 루프야 — 단순해 보이지만 깊어"', de: '„Es ist die befriedigendste Crafting-Schleife, die ich je gespielt habe — täuschend einfach"', type: 'potion-craft' },
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
  'dave-diver': {
    title_en: 'Dave the Diver',
    title_zh: 'Dave the Diver',
    title_zhTW: 'Dave the Diver',
    title_ja: 'Dave the Diver',
    title_ko: '데이브 더 다이버',
    title_de: 'Dave the Diver',
    emoji: '🤿',
    tag_en: 'Ocean diving + sushi restaurant empire — the most surprising game of the decade',
    tag_zh: '海洋潜水 + 寿司餐厅帝国——十年来最令人惊喜的游戏',
    tag_zhTW: '海洋潛水 + 壽司餐廳帝國——十年來最令人驚喜的遊戲',
    tag_ja: '海洋ダイビング＋寿司レストラン帝国——この10年で最も驚かされたゲーム',
    tag_ko: '바다 잠수 + 초밥 레스토랑 제국 — 이 10년간 가장 놀라운 게임',
    tag_de: 'Ozean-Tauchen + Sushi-Restaurant-Imperium — das überraschendste Spiel des Jahrzehnts',
    platform_en: 'Available on: PC (Steam, rated Overwhelmingly Positive), Nintendo Switch, PlayStation 4/5',
    platform_zh: '可在以下平台获取：PC（Steam，评价极度好评）、Nintendo Switch、PlayStation 4/5',
    platform_zhTW: '可在以下平台取得：PC（Steam，評價極度好評）、Nintendo Switch、PlayStation 4/5',
    platform_ja: 'プレイ可能：PC（Steam、圧倒的に好評）、Nintendo Switch、PlayStation 4/5',
    platform_ko: '플랫폼: PC(Steam, 압도적으로 긍정적 평가), Nintendo Switch, PlayStation 4/5',
    platform_de: 'Verfügbar auf: PC (Steam, Bewertung: Äußerst positiv), Nintendo Switch, PlayStation 4/5',
    why_en:
      "Dave the Diver has an overwhelmingly positive rating on Steam for a reason: it is one of the most unexpectedly excellent games ever made. On the surface it sounds simple — you dive in the ocean during the day to collect fish and ingredients, then run a sushi restaurant at night with those ingredients. But the game has a full action-adventure story that escalates far beyond its premise, a cast of deeply memorable characters, multiple gameplay modes that keep introducing new mechanics, and a production quality (music, art, optional mini-games) that no game of its budget should have. The 'dark' element is not horror but stakes: the restaurant has real pressure, the diving gets genuinely dangerous, and the story goes places you will not expect. One of the most-recommended games of 2023.",
    why_zh:
      'Dave the Diver 在 Steam 上获得极度好评是有原因的：它是有史以来最出乎意料的优秀游戏之一。表面上听起来很简单——白天在海洋中潜水收集鱼和食材，然后用这些食材在晚上经营寿司餐厅。但游戏有一个完整的动作冒险故事，远超其前提，有一批令人难忘的角色、不断引入新机制的多种游戏模式，以及任何同等预算游戏都不应有的制作质量（音乐、美术、可选小游戏）。"暗黑"元素不是恐怖而是风险：餐厅有真实压力，潜水变得真的危险，故事走向你意想不到的地方。2023 年最受推荐的游戏之一。',
    why_zhTW:
      'Dave the Diver 在 Steam 上獲得極度好評是有原因的：它是有史以來最出乎意料的優秀遊戲之一。表面上聽起來很簡單——白天在海洋中潛水收集魚和食材，然後用這些食材在晚上經營壽司餐廳。但遊戲有一個完整的動作冒險故事，遠超其前提，有一批令人難忘的角色、不斷引入新機制的多種遊戲模式，以及任何同等預算遊戲都不應有的製作質量（音樂、美術、可選小遊戲）。「暗黑」元素不是恐怖而是風險：餐廳有真實壓力，潛水變得真的危險，故事走向你意想不到的地方。2023 年最受推薦的遊戲之一。',
    why_ja:
      'Dave the DiverがSteamで圧倒的好評を得ているのには理由があります——これまで作られた中で最も予想外に素晴らしいゲームの一つです。表面上はシンプルに聞こえます。昼は海で潜って魚や食材を集め、夜はその食材で寿司レストランを経営する。しかしゲームには、前提をはるかに超えて展開するフルのアクションアドベンチャーストーリー、印象深いキャラクターたち、新しいメカニクスを次々と導入する複数のゲームモード、そしてこの予算のゲームとは思えないほどの制作クオリティ（音楽、アート、オプションのミニゲーム）があります。「ダーク」な要素はホラーではなくリスク。レストランには本物のプレッシャーがあり、ダイビングは本当に危険になり、ストーリーは予想外の場所へ向かいます。2023年で最も勧められたゲームの一つ。',
    why_ko:
      'Dave the Diver가 Steam에서 압도적으로 긍정적인 평가를 받는 데는 이유가 있습니다. 지금까지 만들어진 게임 중 가장 예상치 못하게 훌륭한 게임 중 하나입니다. 표면적으로는 단순하게 들립니다. 낮에는 바다에서 잠수해 물고기와 재료를 수집하고, 밤에는 그 재료로 초밥 레스토랑을 운영합니다. 하지만 게임에는 전제를 훨씬 뛰어넘어 발전하는 완전한 액션 어드벤처 스토리, 깊이 기억에 남는 캐릭터들, 새로운 메커닉을 계속 소개하는 여러 게임 모드, 그리고 이 예산의 게임에는 없어야 할 제작 품질(음악, 아트, 선택적 미니게임)이 있습니다. \'어두운\' 요소는 공포가 아니라 위험입니다. 레스토랑에는 진짜 압박감이 있고, 잠수는 진짜 위험해지며, 스토리는 예상치 못한 방향으로 흘러갑니다. 2023년 가장 많이 추천된 게임 중 하나입니다.',
    why_de:
      'Dave the Diver hat eine überwältigend positive Bewertung auf Steam, und das aus gutem Grund: Es ist eines der unerwartet besten Spiele, die je gemacht wurden. Auf den ersten Blick klingt es einfach — tagsüber im Ozean tauchen, um Fische und Zutaten zu sammeln, nachts ein Sushi-Restaurant mit diesen Zutaten betreiben. Aber das Spiel hat eine vollständige Action-Adventure-Geschichte, die weit über seine Prämisse hinausgeht, eine Reihe unvergesslicher Charaktere, mehrere Spielmodi, die ständig neue Mechaniken einführen, und eine Produktionsqualität (Musik, Art, optionale Mini-Spiele), die kein Spiel dieses Budgets haben sollte. Das „dunkle" Element ist kein Horror, sondern Einsatz: Das Restaurant hat echten Druck, das Tauchen wird wirklich gefährlich, und die Geschichte geht dorthin, wo man es nicht erwartet. Eines der am meisten empfohlenen Spiele von 2023.',
    tip_en: 'Do not skip the story cutscenes — what looks like a simple fishing game becomes something else entirely by chapter 3.',
    tip_zh: '不要跳过故事过场动画——看起来像简单钓鱼游戏的东西在第三章时会变成完全不同的东西。',
    tip_zhTW: '不要跳過故事過場動畫——看起來像簡單釣魚遊戲的東西在第三章時會變成完全不同的東西。',
    tip_ja: 'ストーリーのカットシーンはスキップしないで——シンプルな釣りゲームに見えたものが、第3章では全く別のものになります。',
    tip_ko: '스토리 컷신을 건너뛰지 마세요 — 단순한 낚시 게임처럼 보이는 것이 3장에서는 완전히 다른 것이 됩니다.',
    tip_de: 'Überspringe die Story-Cutscenes nicht — was wie ein einfaches Angelspiel aussieht, wird in Kapitel 3 zu etwas ganz anderem.',
  },
  'cult-lamb': {
    title_en: 'Cult of the Lamb',
    title_zh: '羔羊邪教',
    title_zhTW: '羔羊邪教',
    title_ja: 'カルト・オブ・ザ・ラム',
    title_ko: '컬트 오브 더 램',
    title_de: 'Cult of the Lamb',
    emoji: '🐑',
    tag_en: 'Adorable cult management + roguelike combat + surprisingly dark heart',
    tag_zh: '可爱邪教管理 + roguelike 战斗 + 出人意料的黑暗内核',
    tag_zhTW: '可愛邪教管理 + roguelike 戰鬥 + 出人意料的黑暗內核',
    tag_ja: 'かわいい邪教マネジメント＋ローグライク戦闘＋驚くほど暗い核心',
    tag_ko: '귀여운 교단 경영 + 로그라이크 전투 + 놀랍도록 어두운 심장',
    tag_de: 'Niedliches Kult-Management + Roguelike-Kampf + überraschend dunkles Herz',
    platform_en: 'Available on: PC (Steam), Nintendo Switch, PlayStation 4/5, Xbox',
    platform_zh: '可在以下平台获取：PC（Steam）、Nintendo Switch、PlayStation 4/5、Xbox',
    platform_zhTW: '可在以下平台取得：PC（Steam）、Nintendo Switch、PlayStation 4/5、Xbox',
    platform_ja: 'プレイ可能：PC（Steam）、Nintendo Switch、PlayStation 4/5、Xbox',
    platform_ko: '플랫폼: PC(Steam), Nintendo Switch, PlayStation 4/5, Xbox',
    platform_de: 'Verfügbar auf: PC (Steam), Nintendo Switch, PlayStation 4/5, Xbox',
    why_en:
      "Cult of the Lamb is for you — it is one of the most distinctive games made in the past five years. You play as a lamb saved from death by a strange dark god who asks you to build a cult in his name. During the day, you manage your cult's village: build facilities, feed followers, give sermons, and handle the very dark consequences of having people who depend entirely on you. At night, you go into procedurally generated roguelike dungeons with real combat, collect resources, and fight increasingly difficult bosses to expand your cult's reach. The art is genuinely adorable — bright colors, round characters, cute sheep. The content is genuinely dark — you will make difficult choices about your followers that no truly cozy game would ask. It is one of the most aesthetically coherent games ever made: the sweetness and the darkness reinforce each other perfectly.",
    why_zh:
      '羔羊邪教正适合你——它是过去五年中最与众不同的游戏之一。你扮演一只被一位奇怪的黑暗神明从死亡中救出的羔羊，神明要求你以他的名义建立一个邪教。白天，你管理邪教的村庄：建造设施、喂养追随者、布道，以及处理完全依赖你的人所带来的非常黑暗的后果。晚上，你进入有真实战斗的程序生成 roguelike 地下城，收集资源，战斗越来越难的 Boss 以扩大邪教的影响力。美术真的很可爱——明亮的颜色、圆润的角色、可爱的羊。内容真的很黑暗——你将为追随者做出没有任何真正温馨游戏会要求的艰难选择。这是有史以来美学最一致的游戏之一：甜蜜和黑暗完美地相互强化。',
    why_zhTW:
      '羔羊邪教正適合你——它是過去五年中最與眾不同的遊戲之一。你扮演一隻被一位奇怪的黑暗神明從死亡中救出的羔羊，神明要求你以他的名義建立一個邪教。白天，你管理邪教的村莊：建造設施、餵養追隨者、佈道，以及處理完全依賴你的人所帶來的非常黑暗的後果。晚上，你進入有真實戰鬥的程序生成 roguelike 地下城，收集資源，戰鬥越來越難的 Boss 以擴大邪教的影響力。美術真的很可愛——明亮的顏色、圓潤的角色、可愛的羊。內容真的很黑暗——你將為追隨者做出沒有任何真正溫馨遊戲會要求的艱難選擇。這是有史以來美學最一致的遊戲之一：甜蜜和黑暗完美地相互強化。',
    why_ja:
      'カルト・オブ・ザ・ラムはあなたにぴったりです——過去5年で最も個性的なゲームの一つです。奇妙な暗い神によって死から救われた子羊を操り、その名のもとに邪教を作るよう求められます。昼間は邪教の村を管理します。施設を建て、信者に食事を与え、説教を行い、あなたに完全に依存する人々を持つことの非常に暗い結果に対処します。夜は本物の戦闘があるプロシージャル生成のローグライクダンジョンに入り、リソースを集め、ますます難しいボスと戦って邪教の勢力を拡大します。アートは本当にかわいい——明るい色、丸いキャラクター、かわいい羊。内容は本当に暗い——本当にコージーなゲームなら求めない、信者についての難しい選択をすることになります。これまで作られた中で最も美的に一貫したゲームの一つ：甘さと暗さが完璧に強化し合っています。',
    why_ko:
      '컬트 오브 더 램은 당신에게 딱 맞는 게임입니다 — 지난 5년간 만들어진 가장 독특한 게임 중 하나입니다. 이상한 어두운 신에 의해 죽음에서 구원된 어린 양을 조종하며, 그의 이름으로 교단을 세우도록 요청받습니다. 낮에는 교단 마을을 관리합니다. 시설을 짓고, 추종자를 먹이고, 설교를 하며, 당신에게 완전히 의존하는 사람들을 갖는 것의 매우 어두운 결과에 대처합니다. 밤에는 진짜 전투가 있는 절차적으로 생성된 로그라이크 던전에 들어가 자원을 수집하고 점점 어려워지는 보스와 싸워 교단의 영향력을 확대합니다. 아트는 진정으로 귀엽습니다 — 밝은 색상, 둥근 캐릭터, 귀여운 양. 내용은 진정으로 어둡습니다 — 진정으로 아늑한 게임에서는 요구하지 않을 추종자에 대한 어려운 선택을 하게 됩니다. 지금까지 만들어진 가장 미적으로 일관된 게임 중 하나: 달콤함과 어두움이 완벽하게 서로를 강화합니다.',
    why_de:
      'Cult of the Lamb ist genau das Richtige für dich — es ist eines der unverwechselbarsten Spiele der letzten fünf Jahre. Du spielst als Lamm, das von einem seltsamen dunklen Gott vor dem Tod gerettet wird, der dich bittet, in seinem Namen einen Kult aufzubauen. Tagsüber verwaltest du das Dorf deines Kults: Bau Einrichtungen, füttere Anhänger, halte Predigten und handle mit den sehr dunklen Konsequenzen, Menschen zu haben, die vollständig von dir abhängen. Nachts gehst du in prozedural generierte Roguelike-Dungeons mit echtem Kampf, sammelst Ressourcen und kämpfst gegen immer schwierigere Bosse, um den Einfluss deines Kults zu erweitern. Das Art-Design ist wirklich niedlich — helle Farben, runde Charaktere, süße Schafe. Der Inhalt ist wirklich dunkel — du wirst schwierige Entscheidungen über deine Anhänger treffen, die kein wirklich gemütliches Spiel verlangen würde. Es ist eines der ästhetisch kohärentesten Spiele, die je gemacht wurden: Süße und Dunkelheit verstärken sich gegenseitig perfekt.',
    tip_en: 'Prioritize the kitchen and sleeping quarter buildings first — fed and rested followers generate faith faster and cause fewer crises.',
    tip_zh: '优先建造厨房和睡眠区建筑——得到喂养和休息的追随者更快产生信仰，且引发更少危机。',
    tip_zhTW: '優先建造廚房和睡眠區建築——得到餵養和休息的追隨者更快產生信仰，且引發更少危機。',
    tip_ja: '最初にキッチンと寝室の建物を優先しましょう——食事と休息を与えられた信者は信仰をより早く生み出し、危機を引き起こしにくくなります。',
    tip_ko: '주방과 침실 건물을 먼저 우선시하세요 — 먹이고 쉬게 한 추종자는 믿음을 더 빨리 생성하고 위기를 덜 일으킵니다.',
    tip_de: 'Priorisiere zuerst die Küche und die Schlafquartiere — gut genährte und ausgeruhte Anhänger erzeugen schneller Glauben und verursachen weniger Krisen.',
  },
  dredge: {
    title_en: 'Dredge',
    title_zh: 'Dredge',
    title_zhTW: 'Dredge',
    title_ja: 'Dredge',
    title_ko: '드레지',
    title_de: 'Dredge',
    emoji: '🎣',
    tag_en: 'A fishing game about things that should not exist in the sea',
    tag_zh: '一款关于海洋中不应存在的东西的钓鱼游戏',
    tag_zhTW: '一款關於海洋中不應存在的東西的釣魚遊戲',
    tag_ja: '海に存在すべきでないものについての釣りゲーム',
    tag_ko: '바다에 존재해서는 안 되는 것들에 관한 낚시 게임',
    tag_de: 'Ein Angelspiel über Dinge, die nicht im Meer existieren sollten',
    platform_en: 'Available on: PC (Steam), Nintendo Switch, PlayStation 4/5, Xbox',
    platform_zh: '可在以下平台获取：PC（Steam）、Nintendo Switch、PlayStation 4/5、Xbox',
    platform_zhTW: '可在以下平台取得：PC（Steam）、Nintendo Switch、PlayStation 4/5、Xbox',
    platform_ja: 'プレイ可能：PC（Steam）、Nintendo Switch、PlayStation 4/5、Xbox',
    platform_ko: '플랫폼: PC(Steam), Nintendo Switch, PlayStation 4/5, Xbox',
    platform_de: 'Verfügbar auf: PC (Steam), Nintendo Switch, PlayStation 4/5, Xbox',
    why_en:
      "Dredge is one of the most atmospheric games made in recent years — and it is for you. You play as a fisherman who arrives in a new town and buys a boat to earn his living. The fishing mechanics are genuinely satisfying: you manage an inventory grid, sell fish at the docks, upgrade your boat, and unlock new fishing techniques. But the game has a second layer that slowly reveals itself. The fish are wrong. Some of what you reel up should not exist. The waters around certain islands have memories. Sailing at night raises your 'panic' level, which causes hallucinations. The game never becomes a horror game — it stays calm and atmospheric throughout — but it leaves you with a persistent, beautiful unease. Inspired by Lovecraftian cosmic horror but never gory or jump-scary. One of the best games of 2023.",
    why_zh:
      'Dredge 是近年来氛围最浓郁的游戏之一——它正适合你。你扮演一位到达新小镇并购买渔船谋生的渔夫。钓鱼机制真的令人满足：你管理库存格子、在码头卖鱼、升级你的船，以及解锁新的钓鱼技术。但游戏有第二层，随着时间缓缓揭示。鱼不对劲。你钓上来的一些东西不应该存在。某些岛屿周围的海水有记忆。夜晚航行会提高你的"恐慌"值，导致幻觉。游戏永远不会成为一款恐怖游戏——它始终保持平静和有氛围——但它给你留下了持续的、美丽的不安感。受洛夫克拉夫特式宇宙恐怖启发，但从不血腥或突然惊吓。2023 年最佳游戏之一。',
    why_zhTW:
      'Dredge 是近年來氛圍最濃郁的遊戲之一——它正適合你。你扮演一位到達新小鎮並購買漁船謀生的漁夫。釣魚機制真的令人滿足：你管理庫存格子、在碼頭賣魚、升級你的船，以及解鎖新的釣魚技術。但遊戲有第二層，隨著時間緩緩揭示。魚不對勁。你釣上來的一些東西不應該存在。某些島嶼周圍的海水有記憶。夜晚航行會提高你的「恐慌」值，導致幻覺。遊戲永遠不會成為一款恐怖遊戲——它始終保持平靜和有氛圍——但它給你留下了持續的、美麗的不安感。受洛夫克拉夫特式宇宙恐怖啟發，但從不血腥或突然驚嚇。2023 年最佳遊戲之一。',
    why_ja:
      'Dredgeは近年作られた最も雰囲気のあるゲームの一つです——そしてあなたにぴったりです。新しい町に到着し、生計を立てるために船を買う漁師を操ります。釣りのメカニクスは本当に満足感があります。インベントリグリッドを管理し、港で魚を売り、船をアップグレードし、新しい釣り技術をアンロックします。しかしゲームには、ゆっくりと姿を現す第二の層があります。魚がおかしい。引き上げるものの一部は存在すべきでない。特定の島の周りの海域には記憶があります。夜間の航海は「パニック」レベルを上げ、幻覚を引き起こします。ゲームは決してホラーゲームにはなりません——終始穏やかで雰囲気があります——しかし持続的な、美しい不安感を残します。ラヴクラフト的な宇宙的恐怖にインスパイアされていますが、決して残酷だったり急に驚かせたりしません。2023年最高のゲームの一つ。',
    why_ko:
      'Dredge는 최근 몇 년간 만들어진 가장 분위기 있는 게임 중 하나입니다 — 그리고 당신에게 딱 맞습니다. 새 마을에 도착해 생계를 위해 배를 사는 어부를 조종합니다. 낚시 메커닉은 진정으로 만족스럽습니다. 인벤토리 그리드를 관리하고, 부두에서 물고기를 팔고, 배를 업그레이드하고, 새로운 낚시 기술을 잠금 해제합니다. 하지만 게임에는 천천히 드러나는 두 번째 층이 있습니다. 물고기가 이상합니다. 낚아 올리는 것 중 일부는 존재해서는 안 됩니다. 특정 섬 주변의 바다에는 기억이 있습니다. 밤에 항해하면 \'공황\' 수준이 올라가 환각을 일으킵니다. 게임은 절대 공포 게임이 되지 않습니다 — 내내 차분하고 분위기 있게 유지됩니다 — 하지만 지속적인, 아름다운 불안감을 남깁니다. 러브크래프트식 우주적 공포에서 영감을 받았지만 결코 잔인하거나 깜짝 놀래키지 않습니다. 2023년 최고의 게임 중 하나.',
    why_de:
      'Dredge ist eines der atmosphärischsten Spiele der letzten Jahre — und es ist genau das Richtige für dich. Du spielst als Fischer, der in einer neuen Stadt ankommt und sich ein Boot kauft, um seinen Lebensunterhalt zu verdienen. Die Angel-Mechaniken sind wirklich befriedigend: Du verwaltest ein Inventar-Raster, verkaufst Fische am Dock, rüstest dein Boot auf und schaltest neue Angeltechniken frei. Aber das Spiel hat eine zweite Ebene, die sich langsam enthüllt. Die Fische stimmen nicht. Manche von dem, was du heraufholst, sollte nicht existieren. Die Gewässer rund um bestimmte Inseln haben Erinnerungen. Nächtliches Segeln erhöht deinen „Panik"-Level, was Halluzinationen verursacht. Das Spiel wird nie zu einem Horrorspiel — es bleibt durchgehend ruhig und atmosphärisch — aber es hinterlässt eine anhaltende, schöne Unruhe. Von Lovecraftschem kosmischen Horror inspiriert, aber nie blutrünstig oder mit Jump-Scares. Eines der besten Spiele von 2023.',
    tip_en: "Fish during the day when you start — save night sailing until you have lantern upgrades and a higher panic threshold.",
    tip_zh: '开始时白天钓鱼——等你有了灯笼升级和更高的恐慌阈值后再夜间航行。',
    tip_zhTW: '開始時白天釣魚——等你有了燈籠升級和更高的恐慌閾值後再夜間航行。',
    tip_ja: '最初は昼間に釣りをしましょう——ランタンのアップグレードとより高いパニック閾値が手に入るまで、夜間の航海は控えて。',
    tip_ko: '시작할 때는 낮에 낚시하세요 — 랜턴 업그레이드와 더 높은 공황 임계값을 갖출 때까지 야간 항해는 아껴두세요.',
    tip_de: 'Fische zu Beginn tagsüber — spar dir das nächtliche Segeln, bis du Laternen-Upgrades und einen höheren Panik-Schwellenwert hast.',
  },
  'potion-craft': {
    title_en: 'Potion Craft: Alchemist Simulator',
    title_zh: 'Potion Craft: 炼金师模拟器',
    title_zhTW: 'Potion Craft: 煉金師模擬器',
    title_ja: 'Potion Craft: 錬金術師シミュレーター',
    title_ko: '포션 크래프트: 연금술사 시뮬레이터',
    title_de: 'Potion Craft: Alchemist Simulator',
    emoji: '⚗️',
    tag_en: 'Medieval alchemy puzzle — brew potions, choose who deserves them',
    tag_zh: '中世纪炼金谜题——调制药水，选择谁值得得到它们',
    tag_zhTW: '中世紀煉金謎題——調製藥水，選擇誰值得得到它們',
    tag_ja: '中世の錬金術パズル——ポーションを調合し、誰に渡すかを選ぶ',
    tag_ko: '중세 연금술 퍼즐 — 물약을 만들고, 누가 그것을 받을 자격이 있는지 선택하기',
    tag_de: 'Mittelalterliches Alchemie-Rätsel — Tränke brauen, entscheiden wer sie verdient',
    platform_en: 'Available on: PC (Steam), Nintendo Switch, PlayStation 4/5, Xbox',
    platform_zh: '可在以下平台获取：PC（Steam）、Nintendo Switch、PlayStation 4/5、Xbox',
    platform_zhTW: '可在以下平台取得：PC（Steam）、Nintendo Switch、PlayStation 4/5、Xbox',
    platform_ja: 'プレイ可能：PC（Steam）、Nintendo Switch、PlayStation 4/5、Xbox',
    platform_ko: '플랫폼: PC(Steam), Nintendo Switch, PlayStation 4/5, Xbox',
    platform_de: 'Verfügbar auf: PC (Steam), Nintendo Switch, PlayStation 4/5, Xbox',
    why_en:
      "Potion Craft is a uniquely satisfying alchemy puzzle game set in a hand-drawn medieval shop. The core mechanic is brewing: you place ingredients on a potion map and physically navigate through it using the properties of each ingredient to reach the target effect. It is part puzzle, part discovery — new ingredient combinations unlock new map routes you would not have predicted. Where the moral complexity comes in: customers arrive with requests, and you choose how to fulfill them. Someone asks for a healing potion; you can sell them a weak one, a strong one, overcharge them, or discover that their reasons for wanting it are not what they claimed. The game rewards experimentation and has a deeply relaxing rhythm, but you are always aware that your choices matter. Available on PC, Switch, and PlayStation.",
    why_zh:
      'Potion Craft 是一款在手绘中世纪商店中设置的独特令人满足的炼金谜题游戏。核心机制是酿造：你将材料放置在药水地图上，利用每种材料的特性在地图中物理导航以达到目标效果。它既是谜题又是探索——新的材料组合解锁你无法预测的新地图路线。道德复杂性来自：顾客带着请求到来，你选择如何满足他们。有人要求治疗药水；你可以卖给他们一个弱的、一个强的、对他们收取过高费用，或者发现他们想要它的原因并非他们所声称的。游戏奖励实验，有一种深度放松的节奏，但你始终意识到你的选择很重要。可在 PC、Switch 和 PlayStation 上获取。',
    why_zhTW:
      'Potion Craft 是一款在手繪中世紀商店中設置的獨特令人滿足的煉金謎題遊戲。核心機制是釀造：你將材料放置在藥水地圖上，利用每種材料的特性在地圖中物理導航以達到目標效果。它既是謎題又是探索——新的材料組合解鎖你無法預測的新地圖路線。道德複雜性來自：顧客帶著請求到來，你選擇如何滿足他們。有人要求治療藥水；你可以賣給他們一個弱的、一個強的、對他們收取過高費用，或者發現他們想要它的原因並非他們所聲稱的。遊戲獎勵實驗，有一種深度放鬆的節奏，但你始終意識到你的選擇很重要。可在 PC、Switch 和 PlayStation 上取得。',
    why_ja:
      'Potion Craftは手描きの中世の店を舞台にした、ユニークで満足感のある錬金術パズルゲームです。コアメカニクスは醸造：ポーションマップに材料を配置し、各材料の特性を使って目的の効果に向かって物理的にナビゲートします。パズルでもあり発見でもあります——新しい材料の組み合わせが予測できなかった新しいマップルートをアンロックします。道徳的な複雑さが生まれる部分：顧客が要求を持ってやってきて、どう叶えるかを選択します。ある人が回復ポーションを求めます。弱いものを売ることも、強いものを売ることも、法外な値段をつけることも、求めている理由が言っていたことと違うと発見することもできます。ゲームは実験を報いてくれて、深くリラックスできるリズムを持っていますが、自分の選択が重要であることを常に意識しています。PC、Switch、PlayStation でプレイ可能。',
    why_ko:
      'Potion Craft는 손으로 그린 중세 상점을 배경으로 한 독특하게 만족스러운 연금술 퍼즐 게임입니다. 핵심 메커닉은 양조입니다. 물약 지도에 재료를 놓고 각 재료의 특성을 사용해 목표 효과에 도달하도록 물리적으로 탐색합니다. 퍼즐이자 발견입니다 — 새로운 재료 조합이 예측하지 못했던 새로운 지도 경로를 잠금 해제합니다. 도덕적 복잡성이 등장하는 부분: 고객들이 요청을 가지고 도착하고, 당신은 어떻게 이행할지 선택합니다. 누군가 치유 물약을 요청합니다. 약한 것을 팔거나, 강한 것을 팔거나, 과도하게 청구하거나, 원하는 이유가 그들이 주장한 것이 아님을 발견할 수 있습니다. 게임은 실험을 보상하고 깊이 편안한 리듬을 가지고 있지만, 당신의 선택이 중요하다는 것을 항상 인식합니다. PC, Switch, PlayStation에서 이용 가능.',
    why_de:
      'Potion Craft ist ein einzigartig befriedigendes Alchemie-Puzzle-Spiel, das in einem handgezeichneten mittelalterlichen Laden spielt. Die Kernmechanik ist das Brauen: Du platzierst Zutaten auf einer Trankskarte und navigierst durch sie hindurch, indem du die Eigenschaften jeder Zutat nutzt, um den Zieleffekt zu erreichen. Es ist teils Puzzle, teils Entdeckung — neue Zutatenkombinationen schalten neue Kartenrouten frei, die du nicht vorhergesagt hättest. Die moralische Komplexität kommt ins Spiel: Kunden kommen mit Anfragen, und du entscheidest, wie du sie erfüllst. Jemand bittet um einen Heiltrank; du kannst ihnen einen schwachen, einen starken verkaufen, zu viel verlangen, oder entdecken, dass ihre Gründe, ihn zu wollen, nicht das sind, was sie behauptet haben. Das Spiel belohnt Experimentieren und hat einen tief entspannenden Rhythmus, aber du bist dir immer bewusst, dass deine Entscheidungen wichtig sind. Verfügbar auf PC, Switch und PlayStation.',
    tip_en: "Experiment freely with ingredient combinations early — the map has dozens of paths and discovering them is the main joy of the game.",
    tip_zh: '早期自由地实验材料组合——地图有数十条路径，发现它们是游戏的主要乐趣。',
    tip_zhTW: '早期自由地實驗材料組合——地圖有數十條路徑，發現它們是遊戲的主要樂趣。',
    tip_ja: '序盤は材料の組み合わせを自由に実験しましょう——マップには数十ものルートがあり、それらを発見することがゲームの主な喜びです。',
    tip_ko: '초반에 재료 조합을 자유롭게 실험하세요 — 지도에는 수십 개의 경로가 있고 그것들을 발견하는 것이 게임의 주된 즐거움입니다.',
    tip_de: 'Experimentiere früh frei mit Zutatenkombinationen — die Karte hat Dutzende von Pfaden, und sie zu entdecken ist die Hauptfreude des Spiels.',
  },
}

function calcResult(answers: Pick[]): Pick {
  const counts: Record<Pick, number> = {
    'dave-diver': 0,
    'cult-lamb': 0,
    dredge: 0,
    'potion-craft': 0,
  }
  for (const a of answers) counts[a]++
  return Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0] as Pick
}

export function CozyDarkQuiz({ locale }: { locale: string }) {
  const isZh = locale === 'zh' || locale === 'zh-TW'
  const getLoc = (zh: string, en: string, zhTW?: string, ja?: string, ko?: string, de?: string): string => {
    if (locale === 'zh') return zh
    if (locale === 'zh-TW') return zhTW ?? zh
    if (locale === 'ja') return ja ?? en
    if (locale === 'ko') return ko ?? en
    if (locale === 'de') return de ?? en
    return en
  }
  const [answers, setAnswers] = useState<(Pick | null)[]>(Array(QUESTIONS.length).fill(null))
  const [submitted, setSubmitted] = useState(false)

  const allAnswered = answers.every((a) => a !== null)

  if (submitted) {
    const result = RESULTS[calcResult(answers as Pick[])]
    const url = `${BASE_URL}/${locale}/quizzes/cozy-dark-games`
    const shareText = locale === 'zh'
      ? `我的暗色系 cozy 游戏推荐是「${result.title_zh}」！${result.tag_zh}。找到你的：${url}`
      : locale === 'zh-TW'
      ? `我的暗色系 cozy 遊戲推薦是「${result.title_zhTW}」！${result.tag_zhTW}。找到你的：${url}`
      : locale === 'ja'
      ? `私のダークコージーゲームは「${result.title_ja}」！${result.tag_ja}。あなたも試して：${url}`
      : locale === 'ko'
      ? `나의 다크 코지 게임 추천은 「${result.title_ko}」! ${result.tag_ko}. 당신도 찾아보세요: ${url}`
      : locale === 'de'
      ? `Mein Dark-Cozy-Spiel ist ${result.title_de} — ${result.tag_de}. Finde deins: ${url}`
      : `My dark cozy game match is ${result.title_en} — ${result.tag_en}. Find yours: ${url}`

    return (
      <div>
        <div className="mb-6 text-center">
          <div className="mb-3 text-6xl">{result.emoji}</div>
          <p className="mb-1 text-xs text-[#4a5a4a]">{getLoc(result.tag_zh, result.tag_en, result.tag_zhTW, result.tag_ja, result.tag_ko, result.tag_de)}</p>
          <h2 className="mb-2 text-xl font-bold text-[#f0a832]">
            {getLoc(result.title_zh, result.title_en, result.title_zhTW, result.title_ja, result.title_ko, result.title_de)}
          </h2>
          <p className="text-xs text-[#4a5a4a]">{getLoc(result.platform_zh, result.platform_en, result.platform_zhTW, result.platform_ja, result.platform_ko, result.platform_de)}</p>
        </div>

        <p className="mb-5 text-sm leading-relaxed text-[#8a9a7a]">
          {getLoc(result.why_zh, result.why_en, result.why_zhTW, result.why_ja, result.why_ko, result.why_de)}
        </p>

        <div className="mb-5 rounded-xl border border-[#f0a832]/30 bg-[#0f1a0f] p-4">
          <p className="text-sm text-[#e8dcc8]">
            <span className="font-semibold text-[#f0a832]">
              {getLoc('开始小贴士：', 'Getting started: ', '開始小貼士：', 'はじめる前に：', '시작 팁: ', 'Tipp zum Einstieg: ')}
            </span>
            {getLoc(result.tip_zh, result.tip_en, result.tip_zhTW, result.tip_ja, result.tip_ko, result.tip_de)}
          </p>
        </div>

        <div className="mb-4 rounded-xl border border-[#2d3d2d] bg-[#0f1a0f] p-4">
          <p className="text-center text-sm text-[#8a9a7a]">
            {getLoc(
              'TendFarm 正在研发农场节律追踪功能——把各种游戏里的专注节奏带入真实日常。',
              'TendFarm is building a farm rhythm tracker — bringing the focused rhythms of games into real daily life.',
              'TendFarm 正在研發農場節律追蹤功能——把各種遊戲裡的專注節奏帶入真實日常。',
              'TendFarmはファームリズムトラッカーを開発中——ゲームの集中リズムをリアルな日常へ。',
              'TendFarm은 농장 리듬 트래커를 개발 중입니다 — 게임의 집중 리듬을 실제 일상으로 가져옵니다.',
              'TendFarm entwickelt einen Farm-Rhythmus-Tracker — die fokussierten Spielrhythmen in den echten Alltag bringen.'
            )}
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <ShareButton text={shareText} locale={locale} />
          <button
            onClick={() => { setAnswers(Array(QUESTIONS.length).fill(null)); setSubmitted(false) }}
            className="flex-1 rounded-xl border border-[#2d3d2d] py-3 text-sm text-[#8a9a7a] hover:border-[#4a5a4a] hover:text-[#e8dcc8]"
          >
            {getLoc('重新测试', 'Retake Quiz', '重新測試', 'もう一度テスト', '다시 테스트', 'Quiz wiederholen')}
          </button>
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className="mb-8 text-center">
        <h1 className="mb-2 text-xl font-bold text-[#e8dcc8]">
          {getLoc(
            '你应该玩哪款暗色系 Cozy 游戏？',
            "Which 'Dark Cozy' Game Should You Play?",
            '你應該玩哪款暗色系 Cozy 遊戲？',
            'あなたに合う「ダークコージー」ゲームは？',
            '당신이 해야 할 \'다크 코지\' 게임은?',
            'Welches „Dark Cozy"-Spiel solltest du spielen?'
          )}
        </h1>
        <p className="text-sm text-[#8a9a7a]">
          {getLoc(
            '不是所有 cozy 游戏都真的温馨——6 个问题，在 Dave the Diver、羔羊邪教、Dredge 和 Potion Craft 中找到最适合你的',
            "Not every cozy game is truly cozy — 6 questions to find your match across Dave the Diver, Cult of the Lamb, Dredge, and Potion Craft",
            '不是所有 cozy 遊戲都真的溫馨——6 個問題，在 Dave the Diver、羔羊邪教、Dredge 和 Potion Craft 中找到最適合你的',
            'すべてのコージーゲームが本当にコージーなわけじゃない——6つの質問で Dave the Diver、Cult of the Lamb、Dredge、Potion Craft から最適な1本を見つけよう',
            '모든 코지 게임이 진정으로 아늑한 건 아닙니다 — 6가지 질문으로 Dave the Diver, 컬트 오브 더 램, Dredge, 포션 크래프트 중 당신에게 맞는 게임 찾기',
            'Nicht jedes Cozy-Game ist wirklich gemütlich — 6 Fragen, um dein Match zwischen Dave the Diver, Cult of the Lamb, Dredge und Potion Craft zu finden'
          )}
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
                  onClick={() => { const next = [...answers]; next[qi] = opt.type; setAnswers(next) }}
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
          allAnswered ? 'bg-[#f0a832] text-[#0f1a0f] hover:bg-[#e09822]' : 'cursor-not-allowed bg-[#2d3d2d] text-[#4a5a4a]'
        }`}
      >
        {getLoc('找到我的暗色系游戏', 'Find My Dark Cozy Game', '找到我的暗色系遊戲', '私のダークコージーゲームを見つける', '내 다크 코지 게임 찾기', 'Mein Dark-Cozy-Game finden')}
      </button>
    </div>
  )
}
