'use client'

import { useState } from 'react'
import { BASE_URL } from '@/lib/config'

type Style = 'farmer' | 'angler' | 'explorer' | 'artisan'

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
    ? locale === 'zh'
      ? '✓ 已复制！'
      : locale === 'zh-TW'
        ? '✓ 已複製！'
        : locale === 'ja'
          ? '✓ コピーしました！'
          : locale === 'ko'
            ? '✓ 복사되었습니다!'
            : locale === 'de'
              ? '✓ Kopiert!'
              : '✓ Copied!'
    : locale === 'zh'
      ? '📋 复制结果'
      : locale === 'zh-TW'
        ? '📋 複製結果'
        : locale === 'ja'
          ? '📋 結果をコピー'
          : locale === 'ko'
            ? '📋 결과 복사'
            : locale === 'de'
              ? '📋 Ergebnis kopieren'
              : '📋 Copy result'

  const shareLabel =
    locale === 'zh' || locale === 'zh-TW'
      ? '分享'
      : locale === 'ja'
        ? 'シェア'
        : locale === 'ko'
          ? '공유'
          : locale === 'de'
            ? 'Teilen'
            : 'Share'

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
  options: Array<{ en: string; zh: string; zhTW: string; ja: string; ko: string; de: string; type: Style }>
}> = [
  {
    q_en: 'You log into Palia and your first instinct is to:',
    q_zh: '登录 Palia 之后，你的第一反应是？',
    q_zhTW: '登入 Palia 之後，你的第一反應是？',
    q_ja: 'パリアにログインしたとき、最初にしたいことは？',
    q_ko: '팔리아에 로그인하면 제일 먼저 하고 싶은 게 뭐예요?',
    q_de: 'Du loggst dich in Palia ein — was tust du als Erstes?',
    options: [
      {
        en: "Water your crops and check what's ready to harvest",
        zh: '给作物浇水，看看有哪些可以收割了',
        zhTW: '給作物澆水，看看有哪些可以收割了',
        ja: '作物に水をやって、収穫できるものをチェックする',
        ko: '작물에 물을 주고 수확할 것들을 확인하기',
        de: 'Deine Pflanzen gießen und schauen, was geerntet werden kann',
        type: 'farmer',
      },
      {
        en: 'Head to your favorite fishing spot before it gets crowded',
        zh: '赶在其他人来之前去你最喜欢的钓鱼点',
        zhTW: '趕在其他人來之前去你最喜歡的釣魚點',
        ja: '誰も来ないうちにお気に入りの釣り場へ向かう',
        ko: '다른 사람들이 오기 전에 좋아하는 낚시터로 달려가기',
        de: 'Schnell zur Lieblingsangelstelle, bevor es zu voll wird',
        type: 'angler',
      },
      {
        en: "Explore a part of Bahari Bay you haven't fully mapped yet",
        zh: '去 Bahari 湾还没完全探索过的地方看看',
        zhTW: '去 Bahari 灣還沒完全探索過的地方看看',
        ja: 'まだ全部探索していないバハリ湾のエリアを調べる',
        ko: '바하리 만에서 아직 다 탐험하지 못한 곳 살펴보기',
        de: 'Einen Teil von Bahari Bay erkunden, den du noch nicht kartiert hast',
        type: 'explorer',
      },
      {
        en: 'Check your crafting queue and plan what to cook or build today',
        zh: '检查制作队列，规划今天要做什么料理或家具',
        zhTW: '檢查製作佇列，規劃今天要做什麼料理或家具',
        ja: 'クラフトキューを確認して、今日作る料理や家具を計画する',
        ko: '제작 큐를 확인하고 오늘 만들 요리나 가구 계획하기',
        de: 'Die Crafting-Warteschlange checken und planen, was du heute kochen oder bauen willst',
        type: 'artisan',
      },
    ],
  },
  {
    q_en: 'Your ideal Palia session lasts about 2 hours. You spent most of it:',
    q_zh: '你理想的 Palia 游戏是大约 2 小时。你大部分时间在做什么？',
    q_zhTW: '你理想的 Palia 遊戲是大約 2 小時。你大部分時間在做什麼？',
    q_ja: '理想のパリアセッションは約2時間。ほとんどの時間を何に使っていますか？',
    q_ko: '이상적인 팔리아 플레이 시간은 약 2시간. 대부분의 시간을 어떻게 보내요?',
    q_de: 'Deine ideale Palia-Session dauert etwa 2 Stunden. Die meiste Zeit verbringst du damit:',
    options: [
      {
        en: 'Perfecting your garden layout and trying new seed varieties',
        zh: '完善花园布局，尝试新的种子品种',
        zhTW: '完善花園佈局，嘗試新的種子品種',
        ja: '畑のレイアウトを整えたり、新しい種の品種を試したり',
        ko: '정원 배치를 다듬거나 새로운 씨앗 품종 시도하기',
        de: 'Deinen Garten zu optimieren und neue Sorten auszuprobieren',
        type: 'farmer',
      },
      {
        en: 'At the water — fishing, catching bugs, watching the day pass',
        zh: '在水边——钓鱼、捕虫、看着时光流逝',
        zhTW: '在水邊——釣魚、捕蟲、看著時光流逝',
        ja: '水辺で釣りや虫捕り、のんびりと時間が流れるのを楽しむ',
        ko: '물가에서 낚시, 곤충 채집, 시간이 흘러가는 걸 즐기기',
        de: 'Am Wasser zu sein — angeln, Käfer fangen, den Tag vorüberziehen lassen',
        type: 'angler',
      },
      {
        en: 'Mining ore in the caves or tracking animals across the map',
        zh: '在洞穴里挖矿或在地图上追踪动物',
        zhTW: '在洞穴裡挖礦或在地圖上追蹤動物',
        ja: '洞窟で採掘したり、マップ中で動物を追いかけたり',
        ko: '동굴에서 채광하거나 맵을 가로질러 동물 추적하기',
        de: 'Im Bergwerk Erze abzubauen oder Tiere durch die Karte zu verfolgen',
        type: 'explorer',
      },
      {
        en: 'Decorating your plot with furniture you crafted yourself',
        zh: '用自己制作的家具装饰你的地块',
        zhTW: '用自己製作的家具裝飾你的地塊',
        ja: '自分で作った家具でプロットをデコレーションする',
        ko: '직접 만든 가구로 내 플롯 꾸미기',
        de: 'Dein Grundstück mit selbst gefertigten Möbeln zu dekorieren',
        type: 'artisan',
      },
    ],
  },
  {
    q_en: "When you meet a new Palian NPC, you're most interested in:",
    q_zh: '遇到新的 Palian NPC 时，你最关心的是？',
    q_zhTW: '遇到新的 Palian NPC 時，你最在意的是？',
    q_ja: '新しいパリアンNPCに会ったとき、一番気になるのは？',
    q_ko: '새로운 팔리안 NPC를 만나면 제일 관심 가는 건?',
    q_de: 'Wenn du einem neuen Palian-NPC begegnest, interessiert dich am meisten:',
    options: [
      {
        en: "Whether they sell seeds or farming supplies you don't have yet",
        zh: '他们是否卖你还没有的种子或农业物资',
        zhTW: '他們是否賣你還沒有的種子或農業物資',
        ja: 'まだ持っていない種や農業アイテムを売っているかどうか',
        ko: '아직 갖지 못한 씨앗이나 농업 아이템을 파는지 여부',
        de: 'Ob er Samen oder Farmzubehör verkauft, das du noch nicht hast',
        type: 'farmer',
      },
      {
        en: 'What hints they drop about good fishing or bug-catching spots',
        zh: '他们提到的好钓鱼点或捕虫地点',
        zhTW: '他們提到的好釣魚點或捕蟲地點',
        ja: 'おすすめの釣り場や虫捕りスポットについてのヒント',
        ko: '좋은 낚시터나 곤충 채집 포인트에 대한 힌트',
        de: 'Hinweise auf gute Angel- oder Käferfangplätze',
        type: 'angler',
      },
      {
        en: 'The lore they share about the world and where to find rare resources',
        zh: '他们分享的世界观知识以及稀有资源的位置',
        zhTW: '他們分享的世界觀知識以及稀有資源的位置',
        ja: '世界の設定や、レアな素材の場所についての情報',
        ko: '세계관 정보나 희귀 재료 위치에 대한 이야기',
        de: 'Die Hintergrundgeschichte der Welt und wo man seltene Ressourcen findet',
        type: 'explorer',
      },
      {
        en: 'Their questline — it usually unlocks a new recipe or furniture set',
        zh: '他们的任务线——通常能解锁新食谱或家具系列',
        zhTW: '他們的任務線——通常能解鎖新食譜或家具系列',
        ja: 'クエストライン――だいたい新しいレシピや家具セットが解放される',
        ko: '퀘스트 라인 — 대부분 새 레시피나 가구 세트가 해금되니까',
        de: 'Die Questlinie — die schaltet meistens ein neues Rezept oder Möbelset frei',
        type: 'artisan',
      },
    ],
  },
  {
    q_en: 'Which resource discovery makes you most excited?',
    q_zh: '发现哪种资源会让你最兴奋？',
    q_zhTW: '發現哪種資源會讓你最興奮？',
    q_ja: 'どのリソースを発見したときが一番テンション上がる？',
    q_ko: '어떤 자원을 발견했을 때 가장 신나요?',
    q_de: 'Über welchen Fund freust du dich am meisten?',
    options: [
      {
        en: "A seed packet you've never planted before",
        zh: '一包从没种过的新种子',
        zhTW: '一包從沒種過的新種子',
        ja: 'まだ一度も植えたことのない種のパケット',
        ko: '한 번도 심어본 적 없는 씨앗 패킷',
        de: 'Ein Saatgutpaket, das du noch nie gepflanzt hast',
        type: 'farmer',
      },
      {
        en: 'A fishing spot glowing with rare catches',
        zh: '一处闪着稀有鱼光的钓鱼点',
        zhTW: '一處閃著稀有魚光的釣魚點',
        ja: 'レアな魚が光っている釣りスポット',
        ko: '희귀한 물고기가 빛나는 낚시 포인트',
        de: 'Eine Angelstelle, die mit seltenen Fängen leuchtet',
        type: 'angler',
      },
      {
        en: "A cave entrance you somehow missed for 20 hours",
        zh: '一个不知怎么遗漏了 20 小时的洞穴入口',
        zhTW: '一個不知怎麼遺漏了 20 小時的洞穴入口',
        ja: '20時間プレイして気づかなかった洞窟の入口',
        ko: '20시간 동안 어떻게 그냥 지나쳤는지 모를 동굴 입구',
        de: 'Ein Höhleneingang, den du 20 Spielstunden lang irgendwie übersehen hast',
        type: 'explorer',
      },
      {
        en: "Enough materials to finally build that furniture set you've been planning",
        zh: '终于够做那套规划已久的家具系列的材料',
        zhTW: '終於夠做那套規劃已久的家具系列的材料',
        ja: 'ずっと計画していた家具セットをやっと作れるだけの素材',
        ko: '오랫동안 계획하던 가구 세트를 드디어 만들 수 있는 재료',
        de: 'Genug Materialien, um das Möbelset zu bauen, das du schon lang geplant hast',
        type: 'artisan',
      },
    ],
  },
  {
    q_en: 'Your Palia plot (home base) looks like:',
    q_zh: '你的 Palia 地块（家园基地）看起来是什么样？',
    q_zhTW: '你的 Palia 地塊（家園基地）看起來是什麼樣？',
    q_ja: 'あなたのパリアのプロット（ホームベース）はどんな感じ？',
    q_ko: '내 팔리아 플롯(홈 베이스)은 어떻게 생겼어요?',
    q_de: 'Wie sieht dein Palia-Grundstück aus?',
    options: [
      {
        en: 'Rows of crops with efficient irrigation — maybe a decorative flower border',
        zh: '整齐的作物行和高效灌溉——也许有一圈装饰性的花卉边界',
        zhTW: '整齊的作物行和高效灌溉——也許有一圈裝飾性的花卉邊界',
        ja: '整然とした作物の列に効率的な灌漑——装飾用の花のボーダーもあるかも',
        ko: '정돈된 작물 줄과 효율적인 관개 시스템 — 장식용 꽃 테두리도 있을 수도',
        de: 'Ordentliche Pflanzenreihen mit effizienter Bewässerung — vielleicht mit einer dekorativen Blumenrabatte',
        type: 'farmer',
      },
      {
        en: 'A dock or water feature because you needed it near the aesthetic',
        zh: '有码头或水景，因为那是你觉得最有美感的地方',
        zhTW: '有碼頭或水景，因為那是你覺得最有美感的地方',
        ja: 'ドックや水場があって、景観にこだわった雰囲気',
        ko: '부두나 수변 공간이 있는, 분위기 있는 레이아웃',
        de: 'Ein Steg oder Wasserfeature, weil das Ambiente einfach stimmt',
        type: 'angler',
      },
      {
        en: 'Honest chaos — resources everywhere, half-built projects, map pins',
        zh: '真实的混乱——到处是资源、一半完工的项目和地图标记',
        zhTW: '真實的混亂——到處是資源、一半完工的項目和地圖標記',
        ja: '正直なカオス――素材が散らばって、建設途中のものだらけ、マップピンだらけ',
        ko: '솔직히 카오스 — 재료가 여기저기, 반쯤 완성된 프로젝트, 맵 핀 잔뜩',
        de: 'Ehrliches Chaos — Ressourcen überall, halbfertige Projekte, Karten-Pins ohne Ende',
        type: 'explorer',
      },
      {
        en: 'A meticulously designed living space — every piece intentional',
        zh: '精心设计的生活空间——每件物品都有其位置',
        zhTW: '精心設計的生活空間——每件物品都有其位置',
        ja: '細部まで計算されたリビングスペース——置くものすべてに意図がある',
        ko: '모든 가구 배치가 의도적인, 꼼꼼하게 설계된 생활 공간',
        de: 'Ein akribisch gestalteter Wohnraum — jedes Teil bewusst platziert',
        type: 'artisan',
      },
    ],
  },
  {
    q_en: 'What keeps you coming back to Palia day after day?',
    q_zh: '是什么让你每天都想回来玩 Palia？',
    q_zhTW: '是什麼讓你每天都想回來玩 Palia？',
    q_ja: '毎日パリアに戻ってきたくなる理由は？',
    q_ko: '매일 팔리아로 돌아오게 만드는 건 뭐예요?',
    q_de: 'Was bringt dich Tag für Tag zu Palia zurück?',
    options: [
      {
        en: "Watching your crops grow — there's something deeply satisfying about the cycle",
        zh: '看着作物成长——这种循环有一种很深层的满足感',
        zhTW: '看著作物成長——這種循環有一種很深層的滿足感',
        ja: '作物が成長するのを見守ること――このサイクルには深い充実感がある',
        ko: '작물이 자라는 걸 지켜보는 것 — 이 사이클에는 깊은 만족감이 있어요',
        de: 'Zusehen, wie die Pflanzen wachsen — dieser Kreislauf hat eine tiefe Erfüllung',
        type: 'farmer',
      },
      {
        en: 'The zen of a good fishing session — quiet, patient, rewarding',
        zh: '好好钓一场鱼的禅意——安静、耐心、有回报',
        zhTW: '好好釣一場魚的禪意——安靜、耐心、有回報',
        ja: '釣りの禅的なひととき――静かで、忍耐が試されて、ちゃんと報われる',
        ko: '낚시의 선(禪)적인 시간 — 조용하고, 기다림이 있고, 보람이 있는',
        de: 'Die Zen-Momente beim Angeln — ruhig, geduldig, belohnend',
        type: 'angler',
      },
      {
        en: "There's always another area you haven't fully discovered yet",
        zh: '总是有还没完全探索过的新区域在等着你',
        zhTW: '總是有還沒完全探索過的新區域在等著你',
        ja: 'まだ完全には探索していないエリアが常に存在している',
        ko: '아직 완전히 탐험하지 못한 새 지역이 항상 기다리고 있다는 것',
        de: 'Es gibt immer noch ein Gebiet, das du noch nicht vollständig erkundet hast',
        type: 'explorer',
      },
      {
        en: 'The satisfaction of crafting something beautiful from raw materials',
        zh: '把原材料变成美丽物品的那种成就感',
        zhTW: '把原材料變成美麗物品的那種成就感',
        ja: '素材から美しいものを作り上げたときの達成感',
        ko: '원재료로 아름다운 걸 만들어냈을 때의 성취감',
        de: 'Die Befriedigung, aus Rohstoffen etwas Schönes zu erschaffen',
        type: 'artisan',
      },
    ],
  },
]

const RESULTS: Record<
  Style,
  {
    name_en: string
    name_zh: string
    name_zhTW: string
    name_ja: string
    name_ko: string
    name_de: string
    emoji: string
    label_en: string
    label_zh: string
    label_zhTW: string
    label_ja: string
    label_ko: string
    label_de: string
    desc_en: string
    desc_zh: string
    desc_zhTW: string
    desc_ja: string
    desc_ko: string
    desc_de: string
    skills_en: string[]
    skills_zh: string[]
    skills_zhTW: string[]
    skills_ja: string[]
    skills_ko: string[]
    skills_de: string[]
    tip_en: string
    tip_zh: string
    tip_zhTW: string
    tip_ja: string
    tip_ko: string
    tip_de: string
  }
> = {
  farmer: {
    name_en: 'The Cultivator',
    name_zh: '培育者',
    name_zhTW: '培育者',
    name_ja: '農場の守り人',
    name_ko: '경작자',
    name_de: 'Der Anbauer',
    emoji: '🌻',
    label_en: 'Farming · Gardening',
    label_zh: '耕种 · 园艺',
    label_zhTW: '耕種 · 園藝',
    label_ja: '農業 · ガーデニング',
    label_ko: '농업 · 정원 가꾸기',
    label_de: 'Landwirtschaft · Gartenbau',
    desc_en:
      "You find Palia's rhythm in the earth. Watching seeds turn into crops, experimenting with rare seed varieties, and tending a beautiful garden are your core satisfactions. You're likely the player who has the most organized plot on the server — and your harvest parties are legendary.",
    desc_zh:
      '你在 Palia 的节奏中找到了土地的力量。看着种子变成作物、尝试稀有种子品种、打理美丽的花园是你最核心的满足感来源。你很可能是服务器上地块最整洁的玩家——你的丰收派对也是传奇级别的。',
    desc_zhTW:
      '你在 Palia 的節奏中找到了土地的力量。看著種子變成作物、嘗試稀有種子品種、打理美麗的花園是你最核心的滿足感來源。你很可能是伺服器上地塊最整潔的玩家——你的豐收派對也是傳奇級別的。',
    desc_ja:
      'パリアの大地のリズムに、あなたは本当の充実感を見つけています。種が作物に育つ過程を見守り、レアな種を試して、美しい庭を手入れする——それがあなたの核心的な楽しみです。きっとサーバーで一番整然としたプロットを持つプレイヤーで、あなたの収穫パーティは伝説になっているはず。',
    desc_ko:
      '당신은 팔리아의 대지 리듬 속에서 진짜 만족을 찾았어요. 씨앗이 작물로 자라는 걸 지켜보고, 희귀한 씨앗 품종을 실험하고, 아름다운 정원을 가꾸는 것이 핵심 즐거움이죠. 서버에서 가장 정돈된 플롯을 가진 플레이어일 가능성이 높고, 수확 파티는 이미 전설이 되었을 거예요.',
    desc_de:
      "Du findest Palias Rhythmus in der Erde. Samen in Pflanzen verwandeln, seltene Sorten ausprobieren, einen schönen Garten pflegen — das ist deine Kernzufriedenheit. Du bist wahrscheinlich der Spieler mit dem ordentlichsten Grundstück auf dem Server, und deine Erntefeste sind legendär.",
    skills_en: ['Farming', 'Gardening'],
    skills_zh: ['耕种技能', '园艺技能'],
    skills_zhTW: ['耕種技能', '園藝技能'],
    skills_ja: ['農業スキル', 'ガーデニングスキル'],
    skills_ko: ['농업 스킬', '정원 가꾸기 스킬'],
    skills_de: ['Landwirtschafts-Skill', 'Gartenbau-Skill'],
    tip_en:
      "Focus Farming skill early — higher levels unlock fertilizer and improved seed quality that multiply income. Badruu's Farm has weekly rare seeds worth saving gold for.",
    tip_zh:
      '优先提升耕种技能——更高等级能解锁化肥和改良种子品质，大幅提升收入。Badruu 农场每周有值得存钱购买的稀有种子。',
    tip_zhTW:
      '優先提升耕種技能——更高等級能解鎖化肥和改良種子品質，大幅提升收入。Badruu 農場每週有值得存錢購買的稀有種子。',
    tip_ja:
      '農業スキルは早めに上げましょう——高レベルになると肥料や改良種が解放され、収入が大きく伸びます。バドルーの農場では毎週レアな種を販売しているので、ゴールドを貯めておく価値があります。',
    tip_ko:
      '농업 스킬을 일찍 올리세요 — 높은 레벨에서 비료와 개량 씨앗이 해금되어 수입이 크게 늘어납니다. 바드루 농장에서는 매주 희귀한 씨앗을 판매하니 골드를 모아두세요.',
    tip_de:
      "Steigere den Landwirtschafts-Skill früh — höhere Level schalten Dünger und verbesserte Saatgutqualität frei, die dein Einkommen vervielfachen. Badruus Farm hat jede Woche seltene Samen, für die es sich lohnt, Gold zu sparen.",
  },
  angler: {
    name_en: 'The Patient Watcher',
    name_zh: '静待者',
    name_zhTW: '靜待者',
    name_ja: '静かな観察者',
    name_ko: '기다림의 달인',
    name_de: 'Der Geduldige',
    emoji: '🎣',
    label_en: 'Fishing · Bug Catching',
    label_zh: '钓鱼 · 捕虫',
    label_zhTW: '釣魚 · 捕蟲',
    label_ja: '釣り · 虫捕り',
    label_ko: '낚시 · 곤충 채집',
    label_de: 'Angeln · Käfer fangen',
    desc_en:
      "You understand that the best moments in Palia happen when you slow down. Fishing at dawn, spotting a rare butterfly, waiting for the perfect catch — these aren't just activities, they're meditations. You probably know every fishing spot's peak hours and which bugs only appear at specific times.",
    desc_zh:
      '你明白 Palia 中最美好的时刻是在你慢下来的时候发生的。黎明时钓鱼、发现稀有蝴蝶、等待完美的渔获——这些不只是活动，而是冥想。你可能已经知道每个钓鱼点的黄金时段，以及哪些昆虫只在特定时间出现。',
    desc_zhTW:
      '你明白 Palia 中最美好的時刻是在你慢下來的時候發生的。黎明時釣魚、發現稀有蝴蝶、等待完美的漁獲——這些不只是活動，而是冥想。你可能已經知道每個釣魚點的黃金時段，以及哪些昆蟲只在特定時間出現。',
    desc_ja:
      'パリアで最高の瞬間は、ゆっくりしているときに訪れる——あなたはそれをよく知っています。夜明けの釣り、珍しい蝶を見つけた瞬間、完璧な一匹を待つ静寂……これらは単なる活動ではなく、一種の瞑想です。各釣りスポットのゴールデンタイムと、特定の時間帯にしか出ない虫の情報を、あなたはたぶん全部把握しています。',
    desc_ko:
      '팔리아에서 가장 아름다운 순간은 느리게 살아갈 때 찾아온다는 걸 당신은 알고 있어요. 새벽 낚시, 희귀한 나비 발견, 완벽한 한 마리를 기다리는 시간 — 이건 단순한 게임 활동이 아니라 일종의 명상이에요. 각 낚시터의 황금 시간대와 특정 시간에만 나타나는 곤충 정보를 아마 다 파악하고 있을 거예요.',
    desc_de:
      "Du weißt, dass die besten Momente in Palia entstehen, wenn du entschleunigst. Beim Morgengrauen angeln, einen seltenen Schmetterling entdecken, auf den perfekten Fang warten — das sind keine bloßen Aktivitäten, das ist Meditation. Du kennst wahrscheinlich die Stoßzeiten jedes Angelplatzes und welche Käfer nur zu bestimmten Zeiten auftauchen.",
    skills_en: ['Fishing', 'Bug Catching'],
    skills_zh: ['钓鱼技能', '捕虫技能'],
    skills_zhTW: ['釣魚技能', '捕蟲技能'],
    skills_ja: ['釣りスキル', '虫捕りスキル'],
    skills_ko: ['낚시 스킬', '곤충 채집 스킬'],
    skills_de: ['Angel-Skill', 'Käferfang-Skill'],
    tip_en:
      "Upgrade your fishing rod as soon as possible — each tier unlocks new fish and significantly improves rare catch rates. Check the Weekly Wants board for fishing items that sell for bonus Renown.",
    tip_zh:
      '尽快升级钓鱼竿——每个等级都能解锁新鱼类并显著提升稀有渔获率。查看每周心愿板，钓鱼类物品往往能换取高额荣誉点。',
    tip_zhTW:
      '盡快升級釣魚竿——每個等級都能解鎖新魚類並顯著提升稀有漁獲率。查看每週心願板，釣魚類物品往往能換取高額榮譽點。',
    tip_ja:
      '釣り竿はできるだけ早くアップグレードを——ランクが上がるごとに新しい魚が解放され、レアな釣果率も大幅アップします。毎週のウィークリーウォンツボードをチェックすると、釣り関連アイテムが高Renownで売れることがあります。',
    tip_ko:
      '낚싯대를 최대한 빨리 업그레이드하세요 — 등급이 오를 때마다 새로운 물고기가 해금되고 희귀 어획률도 크게 높아집니다. 위클리 원츠 보드에서 낚시 관련 아이템은 보너스 Renown으로 팔 수 있어요.',
    tip_de:
      "Upgrade deine Angel so früh wie möglich — jede Stufe schaltet neue Fische frei und verbessert die Seltenheitschancen deutlich. Schau auf das Wochenwünsche-Brett: Angelgegenstände bringen oft Bonus-Renown.",
  },
  explorer: {
    name_en: 'The Adventurer',
    name_zh: '探险家',
    name_zhTW: '探險家',
    name_ja: '冒険者',
    name_ko: '모험가',
    name_de: 'Der Abenteurer',
    emoji: '⛏️',
    label_en: 'Mining · Foraging · Hunting',
    label_zh: '挖矿 · 采集 · 狩猎',
    label_zhTW: '挖礦 · 採集 · 狩獵',
    label_ja: '採掘 · 採取 · 狩猟',
    label_ko: '채광 · 채집 · 사냥',
    label_de: 'Bergbau · Sammeln · Jagen',
    desc_en:
      "Palia's world is your playground — literally. You've probably fallen off cliffs trying to reach ore deposits, spent an hour tracking a rare animal across the map, and stumbled onto areas that most players miss for their first 30 hours. You are the one who quietly shares the discovery in community chat.",
    desc_zh:
      'Palia 的世界就是你的游乐场——字面意义上的。你可能为了够到矿石而从悬崖上摔下来，花了一个小时在地图上追踪稀有动物，并且误打误撞进入了大多数玩家前 30 小时都不会发现的区域。你是那个在社群聊天里悄悄分享发现的人。',
    desc_zhTW:
      'Palia 的世界就是你的遊樂場——字面意義上的。你可能為了夠到礦石而從懸崖上摔下來，花了一個小時在地圖上追蹤稀有動物，並且誤打誤撞進入了大多數玩家前 30 小時都不會發現的區域。你是那個在社群聊天裡悄悄分享發現的人。',
    desc_ja:
      'パリアの世界はあなたの遊び場です——文字通りに。鉱石に手が届かなくて崖から落ちたこともあるでしょうし、1時間かけてマップ中でレアな動物を追いかけたこともあるはず。そして、ほとんどのプレイヤーが最初の30時間では気づかないエリアに偶然たどり着いたのもあなたです。コミュニティチャットで静かに発見を共有するのも、あなたのスタイル。',
    desc_ko:
      '팔리아의 세계는 당신에게 그야말로 놀이터예요. 광석에 닿으려다 절벽에서 떨어진 적도 있고, 한 시간 동안 맵을 가로질러 희귀한 동물을 추적한 적도 있겠죠. 그리고 대부분의 플레이어가 처음 30시간 동안은 발견하지 못하는 구역에 우연히 들어간 것도 바로 당신이에요. 커뮤니티 채팅에 조용히 발견을 공유하는 것도 당신의 스타일.',
    desc_de:
      "Palias Welt ist dein Spielplatz — im wahrsten Sinne des Wortes. Du bist schon Klippen heruntergefallen beim Versuch, Erzvorkommen zu erreichen, hast eine Stunde damit verbracht, ein seltenes Tier über die Karte zu verfolgen, und bist auf Gebiete gestoßen, die die meisten Spieler in den ersten 30 Stunden nicht finden. Du bist derjenige, der die Entdeckung ruhig im Community-Chat teilt.",
    skills_en: ['Mining', 'Foraging', 'Hunting'],
    skills_zh: ['挖矿技能', '采集技能', '狩猎技能'],
    skills_zhTW: ['挖礦技能', '採集技能', '狩獵技能'],
    skills_ja: ['採掘スキル', '採取スキル', '狩猟スキル'],
    skills_ko: ['채광 스킬', '채집 스킬', '사냥 스킬'],
    skills_de: ['Bergbau-Skill', 'Sammel-Skill', 'Jagd-Skill'],
    tip_en:
      "Bahari Bay's caves reset daily — learn the ore node spawn locations to maximize your mining efficiency. The hunting skill unlocks Flow of the Forest bonuses that make foraging much more rewarding at higher levels.",
    tip_zh:
      'Bahari 湾的洞穴每天刷新——了解矿石节点的刷新位置能大幅提升挖矿效率。狩猎技能在高等级会解锁「森林之流」加成，让采集变得更有回报。',
    tip_zhTW:
      'Bahari 灣的洞穴每天刷新——了解礦石節點的刷新位置能大幅提升挖礦效率。狩獵技能在高等級會解鎖「森林之流」加成，讓採集變得更有回報。',
    tip_ja:
      'バハリ湾の洞窟は毎日リセットされます——鉱石ノードのスポーン位置を覚えると採掘効率が格段に上がります。狩猟スキルは高レベルで「森の流れ」ボーナスが解放され、採取もぐっと充実してきます。',
    tip_ko:
      '바하리 만의 동굴은 매일 초기화됩니다 — 광석 노드 스폰 위치를 파악하면 채광 효율이 훨씬 높아져요. 사냥 스킬은 높은 레벨에서 「숲의 흐름」 보너스를 해금해 채집도 훨씬 풍성해집니다.',
    tip_de:
      'Die Höhlen in Bahari Bay werden täglich zurückgesetzt — lern die Spawn-Positionen der Erzknoten, um deine Bergbau-Effizienz zu maximieren. Der Jagd-Skill schaltet auf höheren Stufen „Fluss des Waldes“-Boni frei, die das Sammeln viel lohnender machen.',
  },
  artisan: {
    name_en: 'The Maker',
    name_zh: '工匠',
    name_zhTW: '工匠',
    name_ja: '職人',
    name_ko: '장인',
    name_de: 'Der Handwerker',
    emoji: '🏠',
    label_en: 'Cooking · Furniture Making',
    label_zh: '烹饪 · 家具制作',
    label_zhTW: '烹飪 · 家具製作',
    label_ja: '料理 · 家具製作',
    label_ko: '요리 · 가구 제작',
    label_de: 'Kochen · Möbelherstellung',
    desc_en:
      "In Palia, you are the one who makes things beautiful — and delicious. Your plot is the one people screenshot when they visit. You know which recipes sell for the most Renown, which furniture sets pair together, and you have very strong opinions about floor tiles. Your crafting queue is never empty.",
    desc_zh:
      '在 Palia，你是让一切变得美丽和美味的人。当别人来访时，你的地块是被截图次数最多的。你知道哪些食谱能卖最高荣誉点，哪些家具系列搭配最好看，对地板材质有非常强烈的意见。你的制作队列从来都是满的。',
    desc_zhTW:
      '在 Palia，你是讓一切變得美麗和美味的人。當別人來訪時，你的地塊是被截圖次數最多的。你知道哪些食譜能賣最高榮譽點，哪些家具系列搭配最好看，對地板材質有非常強烈的意見。你的製作佇列從來都是滿的。',
    desc_ja:
      'パリアで美しいもの、美味しいものを作るのはあなたです。他のプレイヤーが訪れると、あなたのプロットは必ずスクリーンショットされます。どのレシピが最も高いRenownで売れるか、どの家具セットが相性抜群か、床材へのこだわりも人一倍。クラフトキューが空になることはまずありません。',
    desc_ko:
      '팔리아에서 아름답고 맛있는 것들을 만드는 건 바로 당신이에요. 다른 플레이어들이 방문하면 당신의 플롯은 꼭 스크린샷을 찍게 되죠. 어떤 레시피가 가장 높은 Renown을 주는지, 어떤 가구 세트가 가장 잘 어울리는지 알고 있고, 바닥재에 대한 강한 취향도 있어요. 제작 큐가 비어 있는 날이 없죠.',
    desc_de:
      "In Palia bist du derjenige, der Dinge schön — und lecker — macht. Dein Grundstück ist das, das alle abfotografieren, wenn sie vorbeikommen. Du weißt, welche Rezepte am meisten Renown bringen, welche Möbelsets gut zusammenpassen, und du hast sehr starke Meinungen zu Bodenbelägen. Deine Crafting-Warteschlange ist nie leer.",
    skills_en: ['Cooking', 'Furniture Making'],
    skills_zh: ['烹饪技能', '家具制作技能'],
    skills_zhTW: ['烹飪技能', '家具製作技能'],
    skills_ja: ['料理スキル', '家具製作スキル'],
    skills_ko: ['요리 스킬', '가구 제작 스킬'],
    skills_de: ['Koch-Skill', 'Möbelherstellungs-Skill'],
    tip_en:
      "Cooking skill unlocks Weekly Wants buffs — some dishes provide group bonuses that make your entire party more efficient. Prioritize leveling Furniture Making to unlock rare cosmetic recipes from Hodari and Tish.",
    tip_zh:
      '烹饪技能解锁每周心愿的增益效果——某些食物提供的团体加成能让整个队伍效率更高。优先提升家具制作技能，解锁来自 Hodari 和 Tish 的稀有装饰性图纸。',
    tip_zhTW:
      '烹飪技能解鎖每週心願的增益效果——某些食物提供的團體加成能讓整個隊伍效率更高。優先提升家具製作技能，解鎖來自 Hodari 和 Tish 的稀有裝飾性圖紙。',
    tip_ja:
      '料理スキルはウィークリーウォンツのバフを解放します——一部の料理はパーティ全体の効率を上げるボーナスを提供します。家具製作スキルも早めにレベルを上げて、ホダリやティッシュからレアな装飾レシピを解放しましょう。',
    tip_ko:
      '요리 스킬은 위클리 원츠 버프를 해금합니다 — 일부 요리는 파티 전체의 효율을 높이는 보너스를 제공해요. 호다리와 티시의 희귀 장식 레시피를 해금하기 위해 가구 제작 스킬도 먼저 올려두세요.',
    tip_de:
      "Der Koch-Skill schaltet Wochenwünsche-Buffs frei — einige Gerichte geben Gruppen-Boni, die deine ganze Party effizienter machen. Steigere den Möbelherstellungs-Skill früh, um seltene Deko-Rezepte von Hodari und Tish freizuschalten.",
  },
}

function calcResult(answers: Style[]): Style {
  const counts: Record<Style, number> = { farmer: 0, angler: 0, explorer: 0, artisan: 0 }
  for (const a of answers) counts[a]++
  return Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0] as Style
}

export function PaliaPlaystyleQuiz({ locale }: { locale: string }) {
  const getLoc = (zh: string, en: string, zhTW?: string, ja?: string, ko?: string, de?: string): string => {
    if (locale === 'zh') return zh
    if (locale === 'zh-TW') return zhTW ?? zh
    if (locale === 'ja') return ja ?? en
    if (locale === 'ko') return ko ?? en
    if (locale === 'de') return de ?? en
    return en
  }

  const getLocArr = (
    zh: string[],
    en: string[],
    zhTW?: string[],
    ja?: string[],
    ko?: string[],
    de?: string[],
  ): string[] => {
    if (locale === 'zh') return zh
    if (locale === 'zh-TW') return zhTW ?? zh
    if (locale === 'ja') return ja ?? en
    if (locale === 'ko') return ko ?? en
    if (locale === 'de') return de ?? en
    return en
  }

  const isZh = locale === 'zh' || locale === 'zh-TW'
  const [answers, setAnswers] = useState<(Style | null)[]>(Array(QUESTIONS.length).fill(null))
  const [submitted, setSubmitted] = useState(false)

  const allAnswered = answers.every((a) => a !== null)

  if (submitted) {
    const result = RESULTS[calcResult(answers as Style[])]
    const url = `${BASE_URL}/${locale}/quizzes/palia-playstyle`
    const resultName = getLoc(result.name_zh, result.name_en, result.name_zhTW, result.name_ja, result.name_ko, result.name_de)
    const shareText = getLoc(
      `我在 Palia 的游戏风格是「${result.name_zh}」！快来测测你是哪种 Palia 玩家：${url}`,
      `My Palia playstyle is "${result.name_en}"! Find yours: ${url}`,
      `我在 Palia 的遊戲風格是「${result.name_zhTW}」！快來測測你是哪種 Palia 玩家：${url}`,
      `私のパリアスタイルは「${result.name_ja}」でした！あなたも試してみて：${url}`,
      `내 팔리아 플레이스타일은 「${result.name_ko}」！당신도 테스트해보세요：${url}`,
      `Mein Palia-Spielstil ist „${result.name_de}"! Finde deinen: ${url}`,
    )

    return (
      <div>
        <div className="mb-6 text-center">
          <div className="mb-3 text-6xl">{result.emoji}</div>
          <p className="mb-1 text-xs text-[#4a5a4a]">
            {getLoc(result.label_zh, result.label_en, result.label_zhTW, result.label_ja, result.label_ko, result.label_de)}
          </p>
          <h2 className="mb-3 text-2xl font-bold text-[#f0a832]">
            {resultName}
          </h2>
          <p className="text-sm leading-relaxed text-[#8a9a7a]">
            {getLoc(result.desc_zh, result.desc_en, result.desc_zhTW, result.desc_ja, result.desc_ko, result.desc_de)}
          </p>
        </div>

        <div className="mb-6 rounded-xl border border-[#2d3d2d] bg-[#0f1a0f] p-4">
          <h3 className="mb-3 text-sm font-semibold text-[#e8dcc8]">
            {getLoc('优先提升的技能', 'Skills to prioritize', '優先提升的技能', '優先すべきスキル', '우선 올려야 할 스킬', 'Empfohlene Skills')}
          </h3>
          <div className="mb-3 flex flex-wrap gap-2">
            {getLocArr(result.skills_zh, result.skills_en, result.skills_zhTW, result.skills_ja, result.skills_ko, result.skills_de).map((s) => (
              <span
                key={s}
                className="rounded-full border border-[#2d5a27] bg-[#2d5a27]/30 px-3 py-1 text-xs text-[#8a9a7a]"
              >
                {s}
              </span>
            ))}
          </div>
          <p className="text-sm leading-relaxed text-[#8a9a7a]">
            {getLoc(result.tip_zh, result.tip_en, result.tip_zhTW, result.tip_ja, result.tip_ko, result.tip_de)}
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
          {getLoc(
            '你在 Palia 的游戏风格是什么？',
            "What's Your Palia Playstyle?",
            '你在 Palia 的遊戲風格是什麼？',
            'あなたのパリアプレイスタイルは？',
            '내 팔리아 플레이스타일은?',
            'Was ist dein Palia-Spielstil?',
          )}
        </h1>
        <p className="text-sm text-[#8a9a7a]">
          {getLoc(
            '6 个问题，找到你最自然的 Palia 玩法',
            '6 questions to find your natural Palia playstyle',
            '6 個問題，找到你最自然的 Palia 玩法',
            '6つの質問で、あなたのパリアスタイルを見つけよう',
            '6가지 질문으로 나만의 팔리아 스타일 찾기',
            '6 Fragen, um deinen natürlichen Palia-Spielstil zu finden',
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
        {getLoc(
          '查看结果',
          'See My Playstyle',
          '查看結果',
          'スタイルを見る',
          '내 스타일 보기',
          'Spielstil ansehen',
        )}
      </button>
    </div>
  )
}
