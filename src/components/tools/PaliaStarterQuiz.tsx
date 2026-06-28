'use client'

import { useState } from 'react'
import { BASE_URL } from '@/lib/config'

type Focus = 'farming' | 'hunting' | 'social' | 'crafting'

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
      <button onClick={handleCopy} className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-[#2d3d2d] bg-[#1a2e1a]/50 px-4 py-3 text-sm text-[#e8dcc8] transition-colors hover:border-[#f0a832]/40 hover:text-[#f0a832]">
        {copyLabel}
      </button>
      <a href={'https://twitter.com/intent/tweet?text=' + encodeURIComponent(text)} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 rounded-xl border border-[#2d3d2d] bg-[#1a2e1a]/50 px-4 py-3 text-sm text-[#e8dcc8] transition-colors hover:border-[#1d9bf0]/40 hover:text-[#1d9bf0]">
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
  options: Array<{ en: string; zh: string; zhTW: string; ja: string; ko: string; de: string; type: Focus }>
}> = [
  {
    q_en: 'You log into Palia for the first time. What calls to you most?',
    q_zh: '你第一次登入 Palia。什么最吸引你？',
    q_zhTW: '你第一次登入 Palia。什麼最吸引你？',
    q_ja: '初めて Palia にログインしました。最初に気になるのは？',
    q_ko: 'Palia에 처음 로그인했습니다. 가장 먼저 끌리는 것은?',
    q_de: 'Du loggst dich zum ersten Mal in Palia ein. Was zieht dich am meisten an?',
    options: [
      {
        en: 'The gorgeous land around my plot — I want to start growing crops immediately',
        zh: '我地块周围的美丽土地——我想立刻开始种植作物',
        zhTW: '我地塊周圍的美麗土地——我想立刻開始種植作物',
        ja: '区画周りの美しい大地——すぐに農作物を育てたい',
        ko: '내 농지 주변의 아름다운 땅 — 지금 당장 작물을 심고 싶어',
        de: 'Das wunderschöne Land um mein Grundstück — ich will sofort anfangen, Pflanzen anzubauen',
        type: 'farming',
      },
      {
        en: 'The wildlife I can see in the distance — what can I hunt and track out there?',
        zh: '远处我能看到的野生动物——那里有什么可以追踪和狩猎的？',
        zhTW: '遠處我能看到的野生動物——那裡有什麼可以追蹤和狩獵的？',
        ja: '遠くに見える野生動物——どんな獲物を追えるだろう？',
        ko: '멀리 보이는 야생동물들 — 저기서 무엇을 사냥하고 추적할 수 있을까?',
        de: 'Die Wildtiere in der Ferne — was kann ich dort jagen und verfolgen?',
        type: 'hunting',
      },
      {
        en: 'The other players around me — I want to meet people and build relationships first',
        zh: '我周围的其他玩家——我想先认识人、建立关系',
        zhTW: '我周圍的其他玩家——我想先認識人、建立關係',
        ja: '周りの他のプレイヤーたち——まずは人と出会って関係を築きたい',
        ko: '주변의 다른 플레이어들 — 먼저 사람들을 만나고 관계를 쌓고 싶어',
        de: 'Die anderen Spieler um mich herum — ich will zuerst Leute kennenlernen und Beziehungen aufbauen',
        type: 'social',
      },
      {
        en: 'My inventory — I want to understand what materials I have and what I can make',
        zh: '我的背包——我想了解我有什么材料、能制作什么',
        zhTW: '我的背包——我想了解我有什麼材料、能製作什麼',
        ja: 'インベントリ——素材を確認して、何が作れるか考えたい',
        ko: '내 인벤토리 — 어떤 재료가 있고 무엇을 만들 수 있는지 파악하고 싶어',
        de: 'Mein Inventar — ich will verstehen, welche Materialien ich habe und was ich herstellen kann',
        type: 'crafting',
      },
    ],
  },
  {
    q_en: 'In a cozy game, your most satisfying moment is usually:',
    q_zh: '在 cozy 游戏里，你最满足的时刻通常是：',
    q_zhTW: '在 cozy 遊戲裡，你最滿足的時刻通常是：',
    q_ja: 'コージーゲームで一番満足する瞬間といえば？',
    q_ko: '코지 게임에서 가장 만족스러운 순간은 보통?',
    q_de: 'Dein befriedigendstes Erlebnis in einem Cozy Game ist meistens:',
    options: [
      {
        en: 'Harvesting a fully grown field and seeing my crops fill the storage',
        zh: '收获一整块地，看着农作物填满仓库',
        zhTW: '收穫一整塊地，看著農作物填滿倉庫',
        ja: '畑を全部収穫して、作物が倉庫いっぱいになる瞬間',
        ko: '밭 전체를 수확하고 창고가 작물로 가득 차는 걸 볼 때',
        de: 'Eine vollständig bewachsene Ernte einzuholen und den Speicher füllen zu sehen',
        type: 'farming',
      },
      {
        en: 'Successfully tracking and catching a rare creature I have been chasing',
        zh: '成功追踪并捕获我一直在寻找的稀有生物',
        zhTW: '成功追蹤並捕獲我一直在尋找的稀有生物',
        ja: 'ずっと追いかけていた希少な生き物をついに捕まえた瞬間',
        ko: '계속 쫓아다니던 희귀 생물을 드디어 잡았을 때',
        de: 'Endlich eine seltene Kreatur zu fangen, die ich schon lange gejagt habe',
        type: 'hunting',
      },
      {
        en: 'Finally reaching max friendship with a character I really care about',
        zh: '终于和一个我真心在乎的角色达到最高友谊等级',
        zhTW: '終於和一個我真心在乎的角色達到最高友誼等級',
        ja: 'お気に入りのキャラクターとついに最大友好度に達した瞬間',
        ko: '마음에 드는 캐릭터와 드디어 최고 우정 레벨에 도달했을 때',
        de: 'Endlich die maximale Freundschaft mit einem Charakter zu erreichen, den ich wirklich mag',
        type: 'social',
      },
      {
        en: 'Unlocking a new crafting recipe and building something complex for the first time',
        zh: '解锁新的制作配方，第一次建造出复杂的东西',
        zhTW: '解鎖新的製作配方，第一次建造出複雜的東西',
        ja: '新しいクラフトレシピを解除して、初めて複雑なものを作り上げた瞬間',
        ko: '새로운 제작 레시피를 해금하고 복잡한 것을 처음 만들어냈을 때',
        de: 'Ein neues Handwerksrezept freizuschalten und zum ersten Mal etwas Komplexes zu bauen',
        type: 'crafting',
      },
    ],
  },
  {
    q_en: 'How do you feel about playing with strangers online?',
    q_zh: '你对和陌生人一起在线游戏感觉如何？',
    q_zhTW: '你對和陌生人一起在線遊戲感覺如何？',
    q_ja: 'オンラインで知らない人と一緒にプレイするのは？',
    q_ko: '온라인에서 모르는 사람들과 게임하는 것에 대해 어떻게 생각하나요?',
    q_de: 'Wie stehst du dazu, online mit Fremden zu spielen?',
    options: [
      {
        en: "I'm mostly there for my own farm — other players are background noise I barely notice",
        zh: '我主要是为了自己的农场——其他玩家是我几乎注意不到的背景',
        zhTW: '我主要是為了自己的農場——其他玩家是我幾乎注意不到的背景',
        ja: '自分の農場が目的——他のプレイヤーはほぼ気にならない存在',
        ko: '나는 내 농장 때문에 온 거야 — 다른 플레이어는 거의 신경 쓰지 않아',
        de: 'Ich bin hauptsächlich wegen meiner Farm da — andere Spieler sind Hintergrundgeräusche',
        type: 'farming',
      },
      {
        en: "I like grouping up when there's something to track or hunt together",
        zh: '我喜欢在有共同追踪或狩猎目标时组队',
        zhTW: '我喜歡在有共同追蹤或狩獵目標時組隊',
        ja: '追跡や狩りで一緒に動けるときはグループが楽しい',
        ko: '같이 추적하거나 사냥할 목표가 있을 때는 팀 플레이를 좋아해',
        de: 'Ich mag es, mich zu gruppieren, wenn es etwas gemeinsam zu jagen gibt',
        type: 'hunting',
      },
      {
        en: "I love it — meeting people and chatting is half the reason I play MMOs",
        zh: '我喜欢——认识人和聊天是我玩 MMO 的一半原因',
        zhTW: '我喜歡——認識人和聊天是我玩 MMO 的一半原因',
        ja: '大好き——知らない人と仲良くなることがMMOをやる理由の半分',
        ko: '좋아해 — 사람 만나고 대화하는 게 MMO 하는 이유의 절반이야',
        de: 'Ich liebe es — neue Leute kennenlernen und chatten ist die Hälfte des Spaßes am MMO',
        type: 'social',
      },
      {
        en: "I'm fine with others as long as I can trade resources and get crafting help",
        zh: '我可以接受，只要能和别人交换资源或获得制作帮助',
        zhTW: '我可以接受，只要能和別人交換資源或獲得製作幫助',
        ja: '素材交換やクラフトの助けを得られるならOK',
        ko: '자원 교환이나 제작 도움을 받을 수 있다면 괜찮아',
        de: 'Ich bin okay damit, solange ich Ressourcen tauschen und Hilfe beim Handwerk bekommen kann',
        type: 'crafting',
      },
    ],
  },
  {
    q_en: 'Which resource would you most want to gather in Palia?',
    q_zh: '在 Palia 里你最想采集哪种资源？',
    q_zhTW: '在 Palia 裡你最想採集哪種資源？',
    q_ja: 'Palia で一番集めたいリソースは？',
    q_ko: 'Palia에서 가장 모으고 싶은 자원은?',
    q_de: 'Welche Ressource möchtest du in Palia am liebsten sammeln?',
    options: [
      {
        en: 'Seeds, soil, fertilizer — anything that makes my garden grow better',
        zh: '种子、土壤、肥料——任何能让我的花园长得更好的东西',
        zhTW: '種子、土壤、肥料——任何能讓我的花園長得更好的東西',
        ja: '種、土、肥料——庭園をより育てるものなら何でも',
        ko: '씨앗, 흙, 비료 — 내 정원을 더 잘 키울 수 있는 것이라면 뭐든지',
        de: 'Samen, Erde, Dünger — alles, was meinen Garten zum Wachsen bringt',
        type: 'farming',
      },
      {
        en: 'Animal parts, rare drops, and trophies from difficult hunts',
        zh: '动物部位、稀有掉落物和艰难狩猎获得的战利品',
        zhTW: '動物部位、稀有掉落物和艱難狩獵獲得的戰利品',
        ja: '獣の素材、レアドロップ、難しい狩りで手に入るトロフィー',
        ko: '동물 부위, 희귀 드롭, 힘든 사냥에서 얻는 전리품',
        de: 'Tierteile, seltene Drops und Trophäen aus schwierigen Jagden',
        type: 'hunting',
      },
      {
        en: "Gifts for characters — I always want to know what each person likes best",
        zh: '给角色的礼物——我总是想知道每个人最喜欢什么',
        zhTW: '給角色的禮物——我總是想知道每個人最喜歡什麼',
        ja: 'キャラクターへのプレゼント——みんなの好みをいつも気にしてしまう',
        ko: '캐릭터들에게 줄 선물 — 각자 뭘 좋아하는지 항상 알고 싶어',
        de: 'Geschenke für Charaktere — ich will immer wissen, was jeder am liebsten mag',
        type: 'social',
      },
      {
        en: 'Wood, stone, metal — the building blocks for crafting and construction',
        zh: '木材、石头、金属——制作和建造的基础材料',
        zhTW: '木材、石頭、金屬——製作和建造的基礎材料',
        ja: '木材、石材、金属——クラフトや建築に必要な基礎素材',
        ko: '나무, 돌, 금속 — 제작과 건축의 기본 재료',
        de: 'Holz, Stein, Metall — die Grundbausteine für Handwerk und Bau',
        type: 'crafting',
      },
    ],
  },
  {
    q_en: 'When you imagine your ideal Palia session, it looks like:',
    q_zh: '想象你理想的 Palia 游戏时光，它看起来像：',
    q_zhTW: '想像你理想的 Palia 遊戲時光，它看起來像：',
    q_ja: '理想の Palia セッションを想像すると、こんな感じ？',
    q_ko: '이상적인 Palia 게임 세션을 상상한다면?',
    q_de: 'Wenn du deine ideale Palia-Session vor Augen hast, sieht sie so aus:',
    options: [
      {
        en: 'Tending my garden, experimenting with crop combinations, watching my plot grow',
        zh: '打理花园、实验作物组合、看着我的地块生长',
        zhTW: '打理花園、實驗作物組合、看著我的地塊生長',
        ja: '庭の手入れをして、作物の組み合わせを試して、区画の成長を眺める',
        ko: '정원 가꾸기, 작물 조합 실험, 내 농지가 자라는 걸 지켜보기',
        de: 'Den Garten pflegen, Pflanzkombinationen ausprobieren, meinen Garten wachsen sehen',
        type: 'farming',
      },
      {
        en: 'Exploring the map, tracking rare animals, and mastering the bow',
        zh: '探索地图、追踪稀有动物、精通弓箭技术',
        zhTW: '探索地圖、追蹤稀有動物、精通弓箭技術',
        ja: 'マップを探索して、レアな動物を追跡して、弓の腕を磨く',
        ko: '지도 탐험, 희귀 동물 추적, 활 솜씨 마스터하기',
        de: 'Die Karte erkunden, seltene Tiere verfolgen und den Bogen meistern',
        type: 'hunting',
      },
      {
        en: 'Talking with friends, joining community activities, and decorating together',
        zh: '和朋友聊天、参加社区活动、一起装饰',
        zhTW: '和朋友聊天、參加社區活動、一起裝飾',
        ja: '友達とおしゃべりして、コミュニティイベントに参加して、一緒に飾り付けする',
        ko: '친구들과 수다 떨고, 커뮤니티 활동에 참여하고, 함께 꾸미기',
        de: 'Mit Freunden chatten, Community-Events mitmachen und gemeinsam dekorieren',
        type: 'social',
      },
      {
        en: 'Min-maxing my workshop, figuring out efficient production chains, building the perfect home',
        zh: '优化我的工坊、研究高效的生产链、建造完美的家',
        zhTW: '優化我的工坊、研究高效的生產鏈、建造完美的家',
        ja: 'ワークショップを最適化して、効率的な生産ラインを考えて、理想の家を建てる',
        ko: '작업장 최적화, 효율적인 생산 체인 연구, 완벽한 집 짓기',
        de: 'Meine Werkstatt optimieren, effiziente Produktionsketten ausknobeln, das perfekte Zuhause bauen',
        type: 'crafting',
      },
    ],
  },
  {
    q_en: 'What would make you feel like you are succeeding in Palia?',
    q_zh: '什么会让你感觉自己在 Palia 里取得了进步？',
    q_zhTW: '什麼會讓你感覺自己在 Palia 裡取得了進步？',
    q_ja: 'Palia で「うまくやれてるな」と感じるのはどんな時？',
    q_ko: 'Palia에서 성공했다는 느낌을 받는 건 어떤 순간일까요?',
    q_de: 'Was würde dich in Palia das Gefühl haben lassen, erfolgreich zu sein?',
    options: [
      {
        en: 'Having the most productive and beautiful garden on my server',
        zh: '拥有我服务器上最高产且最美丽的花园',
        zhTW: '擁有我伺服器上最高產且最美麗的花園',
        ja: 'サーバーで一番生産的で美しい庭園を持つこと',
        ko: '내 서버에서 가장 생산적이고 아름다운 정원 갖기',
        de: 'Den produktivsten und schönsten Garten auf meinem Server zu haben',
        type: 'farming',
      },
      {
        en: 'Completing the full hunting journal and finding every rare creature',
        zh: '完成完整的狩猎日志并找到每种稀有生物',
        zhTW: '完成完整的狩獵日誌並找到每種稀有生物',
        ja: '狩猟日誌を完成させて、すべてのレア生物を見つけること',
        ko: '사냥 일지를 완성하고 모든 희귀 생물 찾기',
        de: 'Das vollständige Jagdtagebuch abzuschließen und jede seltene Kreatur zu finden',
        type: 'hunting',
      },
      {
        en: 'Max friendship with every NPC and being known as the social heart of my community',
        zh: '与所有 NPC 达到最高友谊，被认为是社区的社交核心',
        zhTW: '與所有 NPC 達到最高友誼，被認為是社群的社交核心',
        ja: 'すべてのNPCと最大友好度を達成し、コミュニティの中心人物と呼ばれること',
        ko: '모든 NPC와 최고 우정 레벨 달성, 커뮤니티의 중심 인물로 알려지기',
        de: 'Mit allen NPCs maximale Freundschaft erreichen und als soziales Herz der Community bekannt sein',
        type: 'social',
      },
      {
        en: 'Having every crafting station unlocked and being able to build anything in the game',
        zh: '解锁所有制作站，能够建造游戏中的任何东西',
        zhTW: '解鎖所有製作站，能夠建造遊戲中的任何東西',
        ja: 'すべてのクラフトステーションを解除して、ゲーム内のあらゆるものが作れるようになること',
        ko: '모든 제작 스테이션 해금, 게임 내 어떤 것이든 만들 수 있게 되기',
        de: 'Alle Handwerksstationen freizuschalten und alles im Spiel bauen zu können',
        type: 'crafting',
      },
    ],
  },
]

const RESULTS: Record<
  Focus,
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
    skill_en: string
    skill_zh: string
    skill_zhTW: string
    skill_ja: string
    skill_ko: string
    skill_de: string
    desc_en: string
    desc_zh: string
    desc_zhTW: string
    desc_ja: string
    desc_ko: string
    desc_de: string
    tips_en: string[]
    tips_zh: string[]
    tips_zhTW: string[]
    tips_ja: string[]
    tips_ko: string[]
    tips_de: string[]
  }
> = {
  farming: {
    title_en: 'The Garden Keeper',
    title_zh: '花园守护者',
    title_zhTW: '花園守護者',
    title_ja: '庭師',
    title_ko: '정원 지킴이',
    title_de: 'Der Gartenhüter',
    emoji: '🌱',
    tag_en: 'Farming · Garden Mastery · Crop Experiments',
    tag_zh: '农业 · 花园精通 · 作物实验',
    tag_zhTW: '農業 · 花園精通 · 作物實驗',
    tag_ja: '農業 · 庭園マスタリー · 作物実験',
    tag_ko: '농업 · 정원 마스터리 · 작물 실험',
    tag_de: 'Landwirtschaft · Gartenmeisterschaft · Pflanzenexperimente',
    skill_en: 'Gardening',
    skill_zh: '园艺',
    skill_zhTW: '園藝',
    skill_ja: 'ガーデニング',
    skill_ko: '원예',
    skill_de: 'Gärtnern',
    desc_en:
      "Your Palia path starts in the garden. Gardening in Palia is deep — crops grow with different watering frequencies, fertilizers boost yields, and certain crops planted together produce bonus harvests. You will find yourself experimenting with star-quality seeds, filling your plot with the most efficient combinations, and watching your harvest numbers climb week by week. The Garden is also one of the best gold-earning activities in Palia, which means your gardening focus will fund everything else you want to do in the game.",
    desc_zh:
      '你的 Palia 之路从花园开始。Palia 中的园艺非常有深度——作物以不同的浇水频率生长，肥料可以提高产量，相邻种植的特定作物会产生额外收获。你会发现自己在实验星级种子、用最有效的组合填满你的地块，并看着你的收获数字一周周攀升。花园也是 Palia 中最佳的赚钱活动之一，这意味着你的园艺专注将为你在游戏中想做的一切提供资金。',
    desc_zhTW:
      '你的 Palia 之路從花園開始。Palia 中的園藝非常有深度——作物以不同的澆水頻率生長，肥料可以提高產量，相鄰種植的特定作物會產生額外收穫。你會發現自己在實驗星級種子、用最有效的組合填滿你的地塊，並看著你的收穫數字一週週攀升。花園也是 Palia 中最佳的賺金活動之一，這意味著你的園藝專注將為你在遊戲中想做的一切提供資金。',
    desc_ja:
      'あなたの Palia の道は庭から始まります。Palia のガーデニングはかなり奥が深く——作物によって水やりの頻度が違い、肥料で収穫量が上がり、隣に植えた作物からボーナス収穫が出ることも。星品質の種でいろいろ試したり、最も効率的な組み合わせで区画を埋めたり、毎週収穫数が増えるのを眺めたりする時間が楽しくなるはずです。庭は Palia で最もゴールドを稼げる活動のひとつでもあるため、園芸に集中することがゲーム内でやりたいことすべての資金源になります。',
    desc_ko:
      '당신의 Palia 여정은 정원에서 시작됩니다. Palia의 원예는 꽤 깊이가 있어요——작물마다 물 주는 빈도가 다르고, 비료로 수확량을 높일 수 있으며, 특정 작물을 나란히 심으면 보너스 수확이 생기기도 합니다. 별 등급 씨앗으로 이것저것 실험하고, 가장 효율적인 조합으로 농지를 채우고, 매주 수확 숫자가 올라가는 걸 지켜보게 될 거예요. 정원은 Palia에서 골드를 벌기 가장 좋은 활동 중 하나이기도 해서, 원예에 집중하면 게임에서 하고 싶은 모든 것을 위한 자금이 생깁니다.',
    desc_de:
      'Dein Palia-Weg beginnt im Garten. Das Gärtnern in Palia ist erstaunlich tiefgründig — Pflanzen brauchen unterschiedlich häufiges Gießen, Dünger steigert die Ernte, und bestimmte Pflanzen nebeneinander bringen Bonusernten. Du wirst dich dabei ertappen, wie du mit Sternenqualitäts-Samen experimentierst, dein Grundstück mit den effizientesten Kombinationen befüllst und zusieht, wie deine Erntezahlen Woche für Woche steigen. Der Garten ist auch eine der besten Goldverdienstmöglichkeiten in Palia, was bedeutet, dass dein Gärtnerfokus alles andere, was du im Spiel tun möchtest, finanzieren wird.',
    tips_en: [
      'Water your crops every day — star-quality crops require consistent watering for the best yields',
      'Tomatoes and blueberries are beginner-friendly high-value crops — start with these',
      'Use fertilizer on crops you want to sell: gold fertilizer boosts the chance of star-quality harvest',
    ],
    tips_zh: [
      '每天给作物浇水——星级作物需要持续浇水才能获得最佳产量',
      '西红柿和蓝莓是对新手友好的高价值作物——从这些开始',
      '在你想出售的作物上使用肥料：黄金肥料提高星级收获的几率',
    ],
    tips_zhTW: [
      '每天給作物澆水——星級作物需要持續澆水才能獲得最佳產量',
      '番茄和藍莓是對新手友好的高價值作物——從這些開始',
      '在你想出售的作物上使用肥料：黃金肥料提高星級收穫的機率',
    ],
    tips_ja: [
      '毎日水やりをしよう——星品質作物は安定した水やりが最高の収穫につながる',
      'トマトとブルーベリーは初心者向けの高価値作物——まずはここから始めよう',
      '売りたい作物には肥料を使おう：ゴールド肥料は星品質収穫の確率を上げる',
    ],
    tips_ko: [
      '매일 작물에 물을 주세요 — 별 등급 작물은 꾸준한 물 주기가 최고의 수확으로 이어집니다',
      '토마토와 블루베리는 초보자 친화적인 고가치 작물 — 이것부터 시작하세요',
      '팔고 싶은 작물에는 비료를 사용하세요: 황금 비료는 별 등급 수확 확률을 높입니다',
    ],
    tips_de: [
      'Gieße deine Pflanzen jeden Tag — Sternenqualitäts-Pflanzen brauchen regelmäßiges Gießen für die besten Erträge',
      'Tomaten und Heidelbeeren sind anfängerfreundliche, wertvolle Pflanzen — fang mit diesen an',
      'Verwende Dünger auf Pflanzen, die du verkaufen willst: Golddünger erhöht die Chance auf Sternenqualitäts-Ernte',
    ],
  },
  hunting: {
    title_en: 'The Hunter',
    title_zh: '猎人',
    title_zhTW: '獵人',
    title_ja: 'ハンター',
    title_ko: '사냥꾼',
    title_de: 'Der Jäger',
    emoji: '🏹',
    tag_en: 'Hunting · Wildlife · Tracking',
    tag_zh: '狩猎 · 野生动物 · 追踪',
    tag_zhTW: '狩獵 · 野生動物 · 追蹤',
    tag_ja: 'ハンティング · 野生動物 · 追跡',
    tag_ko: '사냥 · 야생동물 · 추적',
    tag_de: 'Jagd · Tierwelt · Spurensuche',
    skill_en: 'Hunting',
    skill_zh: '狩猎',
    skill_zhTW: '狩獵',
    skill_ja: 'ハンティング',
    skill_ko: '사냥',
    skill_de: 'Jagen',
    desc_en:
      "Your Palia adventure belongs in the wild. Hunting in Palia is a patient, skill-based activity — you track animals by finding signs (footprints, feeding areas), approach carefully without startling them, and use your bow to bring them down cleanly. Different animals require different approaches, and rarer creatures demand mastery. Hunting provides rare materials used in high-level crafting and cooking, and hunting journal entries give ongoing goals to pursue across Palia's beautiful open world. Some of the rarest creatures only appear at specific times or locations.",
    desc_zh:
      '你的 Palia 冒险属于野外。Palia 中的狩猎是一项需要耐心和技巧的活动——你通过寻找痕迹（脚印、觅食区域）追踪动物，小心接近而不惊动它们，然后用弓箭将其干净地击倒。不同的动物需要不同的方法，更稀有的生物需要精通才能捕获。狩猎提供用于高级制作和烹饪的稀有材料，狩猎日志条目在 Palia 美丽的开放世界中为你提供持续追求的目标。一些最稀有的生物只在特定时间或地点出现。',
    desc_zhTW:
      '你的 Palia 冒險屬於野外。Palia 中的狩獵是一項需要耐心和技巧的活動——你通過尋找痕跡（腳印、覓食區域）追蹤動物，小心接近而不驚動它們，然後用弓箭將其乾淨地擊倒。不同的動物需要不同的方法，更稀有的生物需要精通才能捕獲。狩獵提供用於高級製作和烹飪的稀有材料，狩獵日誌條目在 Palia 美麗的開放世界中為你提供持續追求的目標。一些最稀有的生物只在特定時間或地點出現。',
    desc_ja:
      'あなたの Palia の冒険は野外にあります。Palia のハンティングは忍耐とスキルが必要な活動です——痕跡（足跡、餌場）を探して動物を追跡し、驚かせないよう慎重に近づき、弓でしっかりと仕留めます。動物ごとにアプローチが異なり、レアな生き物には熟練が必要。ハンティングは上位のクラフトや料理に使うレア素材を提供し、狩猟日誌のエントリーが Palia の美しいオープンワールドで次の目標を与え続けてくれます。最もレアな生き物は特定の時間や場所にしか現れません。',
    desc_ko:
      '당신의 Palia 모험은 야생에 있습니다. Palia의 사냥은 인내와 기술이 필요한 활동입니다——발자국이나 먹이터 같은 흔적을 찾아 동물을 추적하고, 놀라지 않도록 조심스럽게 접근한 뒤 활로 깔끔하게 쓰러뜨립니다. 동물마다 접근법이 다르고, 희귀한 생물일수록 숙련도가 필요합니다. 사냥은 고급 제작과 요리에 쓰이는 희귀 재료를 제공하고, 사냥 일지 항목이 Palia의 아름다운 오픈 월드에서 지속적인 목표를 줍니다. 가장 희귀한 생물은 특정 시간이나 장소에서만 나타납니다.',
    desc_de:
      'Dein Palia-Abenteuer gehört ins Freie. Jagen in Palia ist eine geduldige, fertigkeitsbasierte Aktivität — du verfolgst Tiere anhand von Spuren (Fußabdrücke, Futterstellen), näherst dich vorsichtig ohne sie aufzuscheuchen, und legst sie sauber mit deinem Bogen. Verschiedene Tiere erfordern unterschiedliche Ansätze, und seltenere Kreaturen verlangen Meisterschaft. Jagen liefert seltene Materialien für hochrangiges Handwerk und Kochen, und Jagdtagebuch-Einträge geben dir laufende Ziele in Palias wunderschöner offener Welt. Einige der seltensten Kreaturen erscheinen nur zu bestimmten Zeiten oder an bestimmten Orten.',
    tips_en: [
      'Move slowly and crouch when approaching animals — sudden movement triggers fleeing',
      'Aim for headshots to get the highest quality materials from each hunt',
      'Check the hunting board in Kilima Village for daily target requests that pay extra gold',
    ],
    tips_zh: [
      '接近动物时缓慢移动并蹲下——突然的动作会触发逃跑',
      '瞄准头部射击，从每次狩猎中获得最高质量的材料',
      '查看 Kilima 村的狩猎委托板，获取支付额外金币的每日目标请求',
    ],
    tips_zhTW: [
      '接近動物時緩慢移動並蹲下——突然的動作會觸發逃跑',
      '瞄準頭部射擊，從每次狩獵中獲得最高品質的材料',
      '查看 Kilima 村的狩獵委託板，獲取支付額外金幣的每日目標請求',
    ],
    tips_ja: [
      '動物に近づくときはゆっくり移動してしゃがもう——急な動きは逃げるトリガーになる',
      'ヘッドショットを狙うと最高品質の素材が手に入る',
      'Kilima 村の狩猟依頼板を確認しよう——追加ゴールドが稼げるデイリーターゲットがある',
    ],
    tips_ko: [
      '동물에게 접근할 때는 천천히 움직이며 쪼그리기 — 갑자기 움직이면 도망갑니다',
      '헤드샷을 노려 각 사냥에서 최고 품질의 재료를 얻으세요',
      'Kilima 마을 사냥 의뢰판을 확인하세요 — 추가 골드를 주는 일일 목표 요청이 있습니다',
    ],
    tips_de: [
      'Bewege dich langsam und duck dich beim Annähern — plötzliche Bewegungen lösen Flucht aus',
      'Ziele auf Kopfschüsse, um die hochwertigsten Materialien aus jeder Jagd zu bekommen',
      'Schau am Jagdbrett in Kilima Village nach täglichen Auftragszielen, die extra Gold einbringen',
    ],
  },
  social: {
    title_en: 'The Community Heart',
    title_zh: '社区灵魂',
    title_zhTW: '社群靈魂',
    title_ja: 'コミュニティの心',
    title_ko: '커뮤니티의 중심',
    title_de: 'Das Herz der Community',
    emoji: '💬',
    tag_en: 'Friendships · Gifts · NPC Stories',
    tag_zh: '友谊 · 礼物 · NPC 故事',
    tag_zhTW: '友誼 · 禮物 · NPC 故事',
    tag_ja: '友情 · ギフト · NPCストーリー',
    tag_ko: '우정 · 선물 · NPC 이야기',
    tag_de: 'Freundschaften · Geschenke · NPC-Geschichten',
    skill_en: 'Friendship',
    skill_zh: '友谊',
    skill_zhTW: '友誼',
    skill_ja: '友情',
    skill_ko: '우정',
    skill_de: 'Freundschaft',
    desc_en:
      "You will find your home in Palia's community. The NPC cast in Palia is one of the most well-written in the cozy genre — each character has a personal story that unfolds across multiple friendship levels, and reaching max friendship unlocks full backstories, gift preferences, and relationship-specific quests. Unlike many MMOs, you can also build genuine friendships with other real players in your server — Palia's community is known for being one of the most welcoming in online gaming. Many players decorate together, share resources, and organize in-game events.",
    desc_zh:
      '你将在 Palia 的社区中找到归属。Palia 的 NPC 阵容是 cozy 游戏类型中写得最好的之一——每个角色都有一个跨多个友谊等级展开的个人故事，达到最高友谊解锁完整的背景故事、礼物偏好和关系专属任务。与许多 MMO 不同，你也可以在你的服务器上与其他真实玩家建立真诚的友谊——Palia 的社区以在线游戏中最受欢迎而闻名。许多玩家一起装饰、分享资源、组织游戏内活动。',
    desc_zhTW:
      '你將在 Palia 的社群中找到歸屬。Palia 的 NPC 陣容是 cozy 遊戲類型中寫得最好的之一——每個角色都有一個跨多個友誼等級展開的個人故事，達到最高友誼解鎖完整的背景故事、禮物偏好和關係專屬任務。與許多 MMO 不同，你也可以在你的伺服器上與其他真實玩家建立真誠的友誼——Palia 的社群以在線遊戲中最受歡迎而聞名。許多玩家一起裝飾、分享資源、組織遊戲內活動。',
    desc_ja:
      'あなたは Palia のコミュニティに居場所を見つけるでしょう。Palia の NPC 陣は cozy ジャンルの中でも特に丁寧に書かれたキャラクターたちです——それぞれが複数の友好レベルにまたがる個人的なストーリーを持ち、最大友好度を達成すると完全な背景、贈り物の好み、関係専用クエストが解放されます。多くの MMO と違い、サーバー内の実際のプレイヤーとも本当の友情を育てることができます——Palia のコミュニティはオンラインゲームの中で最も温かいと評判です。一緒に家を飾ったり、素材を分け合ったり、ゲーム内イベントを企画したりするプレイヤーが多くいます。',
    desc_ko:
      '당신은 Palia의 커뮤니티에서 자신의 자리를 찾을 거예요. Palia의 NPC 진영은 코지 장르에서 가장 잘 쓰인 캐릭터들 중 하나입니다——각 캐릭터는 여러 우정 레벨에 걸쳐 펼쳐지는 개인 이야기를 갖고 있으며, 최고 우정에 도달하면 완전한 배경 이야기, 선물 취향, 관계 전용 퀘스트가 열립니다. 많은 MMO와 달리 서버의 다른 실제 플레이어들과도 진정한 우정을 쌓을 수 있습니다——Palia 커뮤니티는 온라인 게임 중 가장 따뜻하기로 유명합니다. 함께 꾸미고, 자원을 나누고, 게임 내 이벤트를 주최하는 플레이어가 많습니다.',
    desc_de:
      'Du wirst dein Zuhause in Palias Community finden. Die NPC-Besetzung in Palia ist eine der am besten geschriebenen im Cozy-Genre — jeder Charakter hat eine persönliche Geschichte, die sich über mehrere Freundschaftsstufen entfaltet, und das Erreichen der maximalen Freundschaft schaltet vollständige Hintergrundgeschichten, Geschenkpräferenzen und beziehungsspezifische Quests frei. Anders als bei vielen MMOs kannst du auch echte Freundschaften mit anderen Spielern auf deinem Server aufbauen — Palias Community gilt als eine der herzlichsten im Online-Gaming. Viele Spieler dekorieren gemeinsam, teilen Ressourcen und organisieren In-Game-Events.',
    tips_en: [
      'Give each NPC a weekly gift — weekly gifts give double friendship points vs. daily gifts',
      'Talk to every NPC every day even if you cannot give a gift — daily chat gives friendship points',
      'Join community housing projects — other players often share rare seeds, cooking ingredients, and building materials',
    ],
    tips_zh: [
      '每周给每个 NPC 送一份礼物——每周礼物给予双倍友谊点数，比每日礼物更划算',
      '每天和每个 NPC 交谈，即使你没有礼物——每日聊天也给予友谊点数',
      '加入社区住宅项目——其他玩家经常分享稀有种子、烹饪食材和建筑材料',
    ],
    tips_zhTW: [
      '每週給每個 NPC 送一份禮物——每週禮物給予雙倍友誼點數，比每日禮物更划算',
      '每天和每個 NPC 交談，即使你沒有禮物——每日聊天也給予友誼點數',
      '加入社群住宅項目——其他玩家經常分享稀有種子、烹飪食材和建築材料',
    ],
    tips_ja: [
      '週に1回NPCにプレゼントしよう——毎週プレゼントは毎日プレゼントの2倍の友好ポイントが入る',
      'プレゼントがなくても毎日全NPCに話しかけよう——日常会話でも友好ポイントが入る',
      'コミュニティの住宅プロジェクトに参加しよう——他のプレイヤーがレア種や料理食材、建材を分けてくれることが多い',
    ],
    tips_ko: [
      '매주 모든 NPC에게 선물을 주세요 — 주간 선물은 일일 선물보다 우정 포인트를 2배 줍니다',
      '선물이 없어도 매일 모든 NPC와 대화하세요 — 일상 대화도 우정 포인트를 줍니다',
      '커뮤니티 주택 프로젝트에 참여하세요 — 다른 플레이어들이 희귀 씨앗, 요리 재료, 건축 자재를 자주 나눠줍니다',
    ],
    tips_de: [
      'Gib jedem NPC wöchentlich ein Geschenk — wöchentliche Geschenke geben doppelte Freundschaftspunkte gegenüber täglichen',
      'Rede jeden Tag mit jedem NPC, auch wenn du kein Geschenk hast — tägliches Gespräch gibt Freundschaftspunkte',
      'Nimm an Community-Wohnprojekten teil — andere Spieler teilen oft seltene Samen, Kochzutaten und Baumaterialien',
    ],
  },
  crafting: {
    title_en: 'The Maker',
    title_zh: '制造者',
    title_zhTW: '製造者',
    title_ja: 'クリエイター',
    title_ko: '제작자',
    title_de: 'Der Erschaffer',
    emoji: '🔨',
    tag_en: 'Crafting · Building · Workshop',
    tag_zh: '制作 · 建造 · 工坊',
    tag_zhTW: '製作 · 建造 · 工坊',
    tag_ja: 'クラフト · 建築 · ワークショップ',
    tag_ko: '제작 · 건축 · 작업장',
    tag_de: 'Handwerk · Bauen · Werkstatt',
    skill_en: 'Crafting & Furniture Making',
    skill_zh: '制作与家具制造',
    skill_zhTW: '製作與家具製造',
    skill_ja: 'クラフトと家具制作',
    skill_ko: '제작과 가구 만들기',
    skill_de: 'Handwerk & Möbelbau',
    desc_en:
      "Palia's crafting and housing systems are where you belong. Furniture making in Palia is one of the deepest housing systems in the cozy genre — you gather materials, craft furniture pieces from scratch, and place them to customize your home plot in near-unlimited ways. The crafting system connects to every other skill: you need farming materials for cooking recipes, hunting drops for furniture, and mining ore for tools. As a crafter, you become the player others come to for specialized items — and high-quality handmade furniture is some of the most valuable content in the game.",
    desc_zh:
      'Palia 的制作和住宅系统是你的归属地。Palia 中的家具制作是 cozy 游戏类型中最深度的住宅系统之一——你采集材料、从头制作家具，并以近乎无限的方式放置它们来定制你的家园地块。制作系统与所有其他技能相连：你需要农业材料来制作烹饪配方、狩猎掉落物来制作家具、挖矿矿石来制作工具。作为制作者，你成为其他玩家来寻求特殊物品的人——高质量的手工家具是游戏中最有价值的内容之一。',
    desc_zhTW:
      'Palia 的製作和住宅系統是你的歸屬地。Palia 中的家具製作是 cozy 遊戲類型中最深度的住宅系統之一——你採集材料、從頭製作家具，並以近乎無限的方式放置它們來定制你的家園地塊。製作系統與所有其他技能相連：你需要農業材料來製作烹飪配方、狩獵掉落物來製作家具、挖礦礦石來製作工具。作為製造者，你成為其他玩家來尋求特殊物品的人——高品質的手工家具是遊戲中最有價值的內容之一。',
    desc_ja:
      'Palia のクラフトと住宅システムがあなたの居場所です。Palia の家具制作は cozy ジャンルの中でも特に奥が深い住宅システムで——素材を集めて家具をゼロから作り、ほぼ無限の方法でホームプロットをカスタマイズできます。クラフトシステムはすべてのスキルと繋がっています：料理レシピには農業素材が、家具には狩猟ドロップが、道具には採掘鉱石が必要。クラフターとして、あなたは他のプレイヤーが特殊アイテムを求めて頼ってくる存在になります——高品質の手作り家具はゲーム内でも特に価値のあるコンテンツです。',
    desc_ko:
      'Palia의 제작과 주택 시스템이 당신이 있어야 할 곳입니다. Palia의 가구 제작은 코지 장르에서 가장 깊이 있는 주택 시스템 중 하나입니다——재료를 모아 가구를 처음부터 만들고, 거의 무한한 방식으로 집 부지를 꾸밀 수 있습니다. 제작 시스템은 다른 모든 스킬과 연결되어 있습니다: 요리 레시피에는 농업 재료가, 가구에는 사냥 드롭이, 도구에는 채광 광석이 필요합니다. 제작자로서, 당신은 다른 플레이어들이 특별한 아이템을 구하러 찾아오는 존재가 됩니다——고품질 수제 가구는 게임에서 가장 가치 있는 콘텐츠 중 하나입니다.',
    desc_de:
      'Palias Handwerks- und Wohnsystem ist deine Heimat. Die Möbelherstellung in Palia ist eines der tiefgründigsten Wohnsysteme im Cozy-Genre — du sammelst Materialien, stellst Möbel von Grund auf her und platzierst sie auf nahezu unbegrenzte Arten, um dein Grundstück anzupassen. Das Handwerkssystem ist mit allen anderen Fähigkeiten verbunden: du brauchst Farmingmaterialien für Kochrezepte, Jagddrops für Möbel und Bergbauerze für Werkzeuge. Als Handwerker wirst du zur Person, die andere Spieler für spezielle Gegenstände aufsuchen — hochwertige handgemachte Möbel sind einige der wertvollsten Inhalte im Spiel.',
    tips_en: [
      'Build a Worktable and Sewing Table early — they unlock the widest range of furniture recipes',
      'Mining and chopping trees gives you the raw materials you need most — upgrade your tools first',
      'Check the in-game Wishing Well requests from NPCs — handmade items often fulfill high-value wishes',
    ],
    tips_zh: [
      '尽早建造工作台和缝纫台——它们解锁最广泛的家具配方范围',
      '挖矿和砍树为你提供最需要的原材料——先升级你的工具',
      '查看游戏内 NPC 的许愿井请求——手工物品经常满足高价值的愿望',
    ],
    tips_zhTW: [
      '儘早建造工作台和縫紉台——它們解鎖最廣泛的家具配方範圍',
      '挖礦和砍樹為你提供最需要的原材料——先升級你的工具',
      '查看遊戲內 NPC 的許願井請求——手工物品經常滿足高價值的願望',
    ],
    tips_ja: [
      'WorktableとSewing Tableを早めに作ろう——最も幅広い家具レシピが解放される',
      '採掘と木こりで最も必要な原材料が集まる——まずツールをアップグレードしよう',
      'NPCのウィッシングウェルリクエストをチェックしよう——手作りアイテムは高価値の願いを叶えることが多い',
    ],
    tips_ko: [
      'Worktable과 Sewing Table을 일찍 만드세요 — 가장 다양한 가구 레시피를 해금합니다',
      '채광과 나무 베기로 가장 필요한 원자재를 얻을 수 있습니다 — 먼저 도구를 업그레이드하세요',
      '게임 내 NPC의 소원 우물 요청을 확인하세요 — 수제 아이템이 고가치 소원을 자주 들어줍니다',
    ],
    tips_de: [
      'Baue früh einen Arbeitstisch und Nähttisch — sie schalten die größte Auswahl an Möbelrezepten frei',
      'Bergbau und Holzfällen geben dir die Rohstoffe, die du am meisten brauchst — upgrade zuerst deine Werkzeuge',
      'Prüfe die Wunschbrunnen-Anfragen der NPCs im Spiel — handgemachte Gegenstände erfüllen oft hochwertige Wünsche',
    ],
  },
}

function calcResult(answers: Focus[]): Focus {
  const counts: Record<Focus, number> = { farming: 0, hunting: 0, social: 0, crafting: 0 }
  for (const a of answers) counts[a]++
  return Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0] as Focus
}

export function PaliaStarterQuiz({ locale }: { locale: string }) {
  const getLoc = (zh: string, en: string, zhTW?: string, ja?: string, ko?: string, de?: string): string => {
    if (locale === 'zh') return zh
    if (locale === 'zh-TW') return zhTW ?? zh
    if (locale === 'ja') return ja ?? en
    if (locale === 'ko') return ko ?? en
    if (locale === 'de') return de ?? en
    return en
  }
  const getLocArr = (zh: string[], en: string[], zhTW?: string[], ja?: string[], ko?: string[], de?: string[]): string[] => {
    if (locale === 'zh') return zh
    if (locale === 'zh-TW') return zhTW ?? zh
    if (locale === 'ja') return ja ?? en
    if (locale === 'ko') return ko ?? en
    if (locale === 'de') return de ?? en
    return en
  }

  const [answers, setAnswers] = useState<(Focus | null)[]>(Array(QUESTIONS.length).fill(null))
  const [submitted, setSubmitted] = useState(false)

  const allAnswered = answers.every((a) => a !== null)

  if (submitted) {
    const result = RESULTS[calcResult(answers as Focus[])]
    const url = `${BASE_URL}/${locale}/quizzes/palia-beginner-guide`
    const shareText = getLoc(
      `我在 Palia 里最适合的路线是「${result.title_zh}」！找到你的 Palia 起点：${url}`,
      `My Palia starter path is ${result.title_en}! Find yours: ${url}`,
      `我在 Palia 裡最適合的路線是「${result.title_zhTW}」！找到你的 Palia 起點：${url}`,
      `私の Palia スタートは「${result.title_ja}」でした！あなたも試してみて：${url}`,
      `내 Palia 시작 유형은 「${result.title_ko}」입니다! 당신도 찾아보세요: ${url}`,
      `Mein Palia-Starterweg ist ${result.title_de}! Find deinen hier: ${url}`,
    )

    const skillLabel = getLoc('核心技能：', 'Core skill: ', '核心技能：', 'メインスキル：', '핵심 스킬: ', 'Hauptfähigkeit: ')
    const tipsLabel = getLoc('新手建议', 'Beginner tips for your path', '新手建議', 'スターターヒント', '입문자 팁', 'Einsteigertipps für deinen Weg')
    const retakeLabel = getLoc('重新测试', 'Retake Quiz', '重新測試', 'もう一度やる', '다시 테스트하기', 'Nochmal machen')
    const promoText = getLoc(
      'TendFarm 正在研发农场节律追踪功能——把 Cozy 游戏的季节感带入你的真实生活节奏。',
      'TendFarm is building a farm rhythm tracker — bringing the seasonal feeling of cozy games into real life.',
      'TendFarm 正在研發農場節律追蹤功能——把 Cozy 遊戲的季節感帶入你的真實生活節奏。',
      'TendFarm はファームリズムトラッカーを開発中です——コージーゲームの季節感をリアルな生活リズムに。',
      'TendFarm은 농장 리듬 트래커를 개발 중입니다 — 코지 게임의 계절감을 실제 생활 리듬으로.',
      'TendFarm entwickelt einen Farm-Rhythmus-Tracker — das saisonale Gefühl von Cozy Games ins echte Leben bringen.',
    )

    return (
      <div>
        <div className="mb-6 text-center">
          <div className="mb-3 text-6xl">{result.emoji}</div>
          <p className="mb-1 text-xs text-[#4a5a4a]">
            {getLoc(result.tag_zh, result.tag_en, result.tag_zhTW, result.tag_ja, result.tag_ko, result.tag_de)}
          </p>
          <h2 className="mb-2 text-xl font-bold text-[#f0a832]">
            {getLoc(result.title_zh, result.title_en, result.title_zhTW, result.title_ja, result.title_ko, result.title_de)}
          </h2>
          <p className="text-xs text-[#4a5a4a]">
            {skillLabel}{getLoc(result.skill_zh, result.skill_en, result.skill_zhTW, result.skill_ja, result.skill_ko, result.skill_de)}
          </p>
        </div>

        <p className="mb-5 text-sm leading-relaxed text-[#8a9a7a]">
          {getLoc(result.desc_zh, result.desc_en, result.desc_zhTW, result.desc_ja, result.desc_ko, result.desc_de)}
        </p>

        <div className="mb-5 rounded-xl border border-[#2d3d2d] bg-[#0f1a0f] p-4">
          <h3 className="mb-3 text-sm font-semibold text-[#e8dcc8]">{tipsLabel}</h3>
          <ul className="space-y-2">
            {getLocArr(result.tips_zh, result.tips_en, result.tips_zhTW, result.tips_ja, result.tips_ko, result.tips_de).map((tip: string, i: number) => (
              <li key={i} className="flex gap-2 text-sm text-[#8a9a7a]">
                <span className="shrink-0 text-[#f0a832]">{i + 1}.</span>
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mb-4 rounded-xl border border-[#2d3d2d] bg-[#0f1a0f] p-4">
          <p className="text-center text-sm text-[#8a9a7a]">{promoText}</p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <ShareButton text={shareText} locale={locale} />
          <button
            onClick={() => { setAnswers(Array(QUESTIONS.length).fill(null)); setSubmitted(false) }}
            className="flex-1 rounded-xl border border-[#2d3d2d] py-3 text-sm text-[#8a9a7a] hover:border-[#4a5a4a] hover:text-[#e8dcc8]"
          >
            {retakeLabel}
          </button>
        </div>
      </div>
    )
  }

  const quizTitle = getLoc(
    'Palia 新手测验：你该从哪里开始？',
    'Palia Beginner Quiz: Where Should You Start?',
    'Palia 新手測驗：你該從哪裡開始？',
    'Palia 初心者クイズ：どこから始める？',
    'Palia 입문 퀴즈: 어디서부터 시작할까요?',
    'Palia Einsteiger-Quiz: Wo solltest du anfangen?',
  )
  const quizDesc = getLoc(
    '6 个问题，找出最适合你的 Palia 起点——园艺、狩猎、社交还是制作？含专属新手攻略',
    '6 questions to find your Palia starter focus — Gardening, Hunting, Friendships, or Crafting. Includes beginner tips for your path.',
    '6 個問題，找出最適合你的 Palia 起點——園藝、狩獵、社交還是製作？含專屬新手攻略',
    '6問に答えて、あなたの Palia スタートを見つけよう——ガーデニング・ハンティング・友情・クラフト。新手ヒント付き。',
    '6가지 질문으로 나만의 Palia 시작 방향을 찾아보세요 — 원예, 사냥, 우정, 제작 중 어느 것이 나한테 맞을까요? 입문자 팁 포함.',
    '6 Fragen, um deinen Palia-Einstiegsschwerpunkt zu finden — Gärtnern, Jagen, Freundschaften oder Handwerk. Mit Einsteigertipps.',
  )
  const submitLabel = getLoc(
    '找到我的 Palia 起点',
    'Find My Palia Starting Path',
    '找到我的 Palia 起點',
    '私の Palia スタートを見つける',
    '내 Palia 시작 방향 찾기',
    'Meinen Palia-Startweg finden',
  )

  return (
    <div>
      <div className="mb-8 text-center">
        <h1 className="mb-2 text-xl font-bold text-[#e8dcc8]">{quizTitle}</h1>
        <p className="text-sm text-[#8a9a7a]">{quizDesc}</p>
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
        {submitLabel}
      </button>
    </div>
  )
}
