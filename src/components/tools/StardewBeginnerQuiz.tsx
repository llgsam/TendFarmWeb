'use client'

import { useState } from 'react'
import { BASE_URL } from '@/lib/config'

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

type Tier = 'seedling' | 'sprout' | 'harvest' | 'veteran'

const QUESTIONS: Array<{
  q_en: string
  q_zh: string
  q_zhTW: string
  q_ja: string
  q_ko: string
  q_de: string
  options: Array<{
    en: string
    zh: string
    zhTW: string
    ja: string
    ko: string
    de: string
    score: number
  }>
}> = [
  {
    q_en: "It's Day 1 of your Stardew Valley farm. What's your first move?",
    q_zh: '星露谷第一天，你的第一步是什么？',
    q_zhTW: '星露谷第一天，你的第一步是什麼？',
    q_ja: 'スターデューバレーの初日、最初にすることは？',
    q_ko: '스타듀 밸리 첫날, 가장 먼저 뭘 하나요?',
    q_de: 'Stardew Valley, Tag 1. Was machst du als Erstes?',
    options: [
      {
        en: 'Chat with everyone in Pelican Town to make friends',
        zh: '去和鹈鹕镇每个人打招呼交朋友',
        zhTW: '去和鵜鶘鎮每個人打招呼交朋友',
        ja: 'ペリカンタウンの住人みんなに話しかけて仲良くなる',
        ko: '펠리컨 타운 주민들에게 모두 인사하러 다닌다',
        de: 'Mit allen Bewohnern in Pelican Town reden, um Freundschaften zu knüpfen',
        score: 0,
      },
      {
        en: 'Plant the starting seeds and explore the farm a little',
        zh: '种下初始种子，在农场随便逛逛',
        zhTW: '種下初始種子，在農場隨便逛逛',
        ja: 'とりあえず最初の種を植えて、農場をぶらぶら探索する',
        ko: '초기 씨앗을 심고 농장을 가볍게 둘러본다',
        de: 'Die Startpflanzen einpflanzen und ein bisschen auf der Farm herumschlendern',
        score: 1,
      },
      {
        en: "Rush to Pierre's before 5pm to buy more parsnip seeds",
        zh: '赶在下午 5 点前冲到皮埃尔商店买更多防风草种子',
        zhTW: '趕在下午 5 點前衝到皮耶商店買更多防風草種子',
        ja: '17時前にピエールの店に急いで、パースニップの種をもっと買う',
        ko: '오후 5시 전에 피에르 상점으로 달려가 파스닙 씨앗을 더 산다',
        de: 'Vor 17 Uhr zu Pierres Laden rennen, um mehr Pastinakensamen zu kaufen',
        score: 2,
      },
      {
        en: 'Clear the entire farm, watch the TV for tips, and maximize planting area',
        zh: '清空整片农场，看电视获取提示，最大化种植面积',
        zhTW: '清空整片農場，看電視獲取提示，最大化種植面積',
        ja: '農場を全部整地して、テレビのコツを見て、植え付け面積を最大化する',
        ko: '농장 전체를 정리하고, TV 팁을 보고, 심을 공간을 최대화한다',
        de: 'Die gesamte Farm räumen, TV-Tipps schauen und die Anbaufläche maximieren',
        score: 3,
      },
    ],
  },
  {
    q_en: 'A rainy day arrives. What do you do?',
    q_zh: '下雨天来了，你怎么安排？',
    q_zhTW: '下雨天來了，你怎麼安排？',
    q_ja: '雨の日になったら何をする？',
    q_ko: '비 오는 날이 왔어요. 어떻게 시간을 보내나요?',
    q_de: 'Ein Regentag. Was machst du?',
    options: [
      {
        en: 'Sleep in — a day off from watering!',
        zh: '睡觉——终于不用浇水的假期！',
        zhTW: '睡覺——終於不用澆水的假期！',
        ja: '寝る！水やりしなくていいお休みの日だ',
        ko: '그냥 잔다 — 물 안 줘도 되는 휴가다!',
        de: 'Ausschlafen — endlich kein Gießen nötig!',
        score: 0,
      },
      {
        en: 'Fish or explore the town since crops water themselves',
        zh: '钓钓鱼或逛逛镇子，反正作物自己会喝水',
        zhTW: '釣釣魚或逛逛鎮子，反正作物自己會喝水',
        ja: '釣りに行くか町をうろうろする。作物は雨が水をやってくれるから',
        ko: '작물은 비가 알아서 적셔주니까 낚시하거나 마을 구경',
        de: 'Angeln gehen oder die Stadt erkunden, die Felder werden ja automatisch bewässert',
        score: 1,
      },
      {
        en: 'Head straight to the mines with a full backpack',
        zh: '背包装满补给，直冲矿洞',
        zhTW: '背包裝滿補給，直衝礦洞',
        ja: '荷物をフルに詰めてそのまま鉱山へ直行',
        ko: '가방 가득 채우고 바로 광산으로 돌진',
        de: 'Rucksack vollladen und direkt in die Minen',
        score: 2,
      },
      {
        en: 'Upgrade my watering can — this is the perfect no-miss window',
        zh: '升级水壶——不耽误浇水的最佳时机就是雨天',
        zhTW: '升級水壺——不耽誤澆水的最佳時機就是雨天',
        ja: 'じょうろをアップグレードする——水やりを逃さないためのベストタイミングが雨の日',
        ko: '물뿌리개 업그레이드 — 물 주기를 빠뜨리지 않는 최적의 타이밍이 바로 비 오는 날',
        de: 'Gießkanne upgraden — Regentag ist die perfekte Gelegenheit',
        score: 3,
      },
    ],
  },
  {
    q_en: 'What do you know about the Egg Festival?',
    q_zh: '关于鸡蛋节你了解多少？',
    q_zhTW: '關於雞蛋節你了解多少？',
    q_ja: 'エッグフェスティバルについてどのくらい知ってる？',
    q_ko: '달걀 축제에 대해 얼마나 알고 있나요?',
    q_de: 'Wie viel weißt du über das Egg Festival?',
    options: [
      {
        en: "It's a fun spring event — I enjoy the egg hunt",
        zh: '春天的节日，捡蛋游戏挺好玩的',
        zhTW: '春天的節日，撿蛋遊戲挺好玩的',
        ja: '春のお祭りで、卵集めゲームが楽しいやつ',
        ko: '봄 축제인데 달걀 모으기 게임이 재밌는 것',
        de: 'Ein Frühlingsfest — die Eierjagd macht Spaß',
        score: 0,
      },
      {
        en: 'I buy a few strawberry seeds if I have spare cash',
        zh: '如果有多余钱会顺手买几颗草莓种子',
        zhTW: '如果有多餘錢會順手買幾顆草莓種子',
        ja: '余裕があればイチゴの種を何個か買う',
        ko: '돈이 남으면 딸기 씨앗을 몇 개 산다',
        de: 'Ich kaufe ein paar Erdbeersamen, wenn ich genug Gold habe',
        score: 1,
      },
      {
        en: 'I save gold all of spring specifically to buy maximum strawberry seeds',
        zh: '整个春天专门存金币，就为了节日当天买最多草莓种子',
        zhTW: '整個春天專門存金幣，就為了節日當天買最多草莓種子',
        ja: '春の間ずっとゴールドを貯めて、当日に最大量のイチゴの種を買う',
        ko: '봄 내내 골드를 모아서 당일에 딸기 씨앗을 최대한 많이 산다',
        de: 'Den ganzen Frühling spare ich Gold extra für die maximale Menge Erdbeersamen am Festtag',
        score: 2,
      },
      {
        en: 'I know the exact time to enter Pelican Town to guarantee a full buy before the festival starts',
        zh: '我知道进鹈鹕镇的精确时间点，确保在节日开始前完成最优购买',
        zhTW: '我知道進鵜鶘鎮的精確時間點，確保在節日開始前完成最優購買',
        ja: 'フェスが始まる前に確実に最適な買い物ができるよう、ペリカンタウンに入る正確な時間を知っている',
        ko: '축제 시작 전에 완벽한 구매를 하기 위해 펠리컨 타운에 들어가는 정확한 타이밍을 알고 있다',
        de: 'Ich kenne den exakten Zeitpunkt, wann ich Pelican Town betreten muss, um vor Festivalbeginn optimal einzukaufen',
        score: 3,
      },
    ],
  },
  {
    q_en: "What does 'Iridium' mean to you in Stardew Valley?",
    q_zh: '星露谷里的「铱矿」对你来说意味着什么？',
    q_zhTW: '星露谷裡的「銥礦」對你來說意味著什麼？',
    q_ja: 'スターデューバレーの「イリジウム」といえば？',
    q_ko: '스타듀 밸리에서 "이리디움"이란?',
    q_de: 'Was bedeutet "Iridium" für dich in Stardew Valley?',
    options: [
      {
        en: "I've heard the word but haven't found any yet",
        zh: '听说过但还没找到',
        zhTW: '聽說過但還沒找到',
        ja: '聞いたことはあるけどまだ見つけてない',
        ko: '들어본 적 있는데 아직 못 찾았다',
        de: 'Hab davon gehört, aber noch keins gefunden',
        score: 0,
      },
      {
        en: "It's a valuable ore from deep in the mines",
        zh: '矿洞深处才能找到的珍贵矿石',
        zhTW: '礦洞深處才能找到的珍貴礦石',
        ja: '鉱山の深いところにある貴重な鉱石',
        ko: '광산 깊은 곳에서 나오는 귀한 광석',
        de: 'Ein wertvolles Erz aus den tiefen Ebenen der Mine',
        score: 1,
      },
      {
        en: "The best tool upgrade material — worth farming Skull Cavern for",
        zh: '最佳工具升级材料——值得专门在骷髅洞刷矿',
        zhTW: '最佳工具升級材料——值得專門在骷髏洞刷礦',
        ja: '最強の道具アップグレード素材——スカルキャバーンで掘る価値アリ',
        ko: '최고의 도구 업그레이드 재료 — 해골 동굴에서 파밍할 가치가 있다',
        de: 'Das beste Upgrade-Material für Werkzeuge — Skull Cavern lohnt sich dafür',
        score: 2,
      },
      {
        en: "My entire farm layout is designed around iridium sprinkler coverage patterns",
        zh: '我的农场布局完全围绕铱矿洒水机的最优覆盖范围来设计',
        zhTW: '我的農場佈局完全圍繞銥礦灑水機的最優覆蓋範圍來設計',
        ja: '農場のレイアウト全体がイリジウムスプリンクラーの最適な配置パターンで設計されている',
        ko: '내 농장 레이아웃 전체가 이리디움 스프링클러의 최적 배치 패턴으로 설계되어 있다',
        de: 'Mein gesamtes Farm-Layout ist um das optimale Abdeckungsmuster von Iridium-Sprinklern herum designed',
        score: 3,
      },
    ],
  },
  {
    q_en: 'How do you approach the Community Center bundles?',
    q_zh: '你怎么处理社区中心的捆包任务？',
    q_zhTW: '你怎麼處理社區中心的捆包任務？',
    q_ja: 'コミュニティセンターのバンドルはどう進める？',
    q_ko: '커뮤니티 센터 묶음 과제는 어떻게 처리하나요?',
    q_de: 'Wie gehst du die Community-Center-Pakete an?',
    options: [
      {
        en: "I usually forget about them until year 3 or later",
        zh: '经常到第三年才想起来还有这个',
        zhTW: '經常到第三年才想起來還有這個',
        ja: 'だいたい3年目になってから「あ、そういえば」ってなる',
        ko: '보통 3년차가 되어서야 "아, 이게 있었지" 한다',
        de: 'Ich vergesse sie meistens, bis Jahr 3 oder später',
        score: 0,
      },
      {
        en: "I complete them gradually with no specific plan",
        zh: '慢慢来，没有特定计划，完成了就完成了',
        zhTW: '慢慢來，沒有特定計劃，完成了就完成了',
        ja: 'のんびりと、特に計画もなくできたらやる',
        ko: '특별한 계획 없이 천천히, 되면 되는 거',
        de: 'Ich erledige sie nach und nach, ohne bestimmten Plan',
        score: 1,
      },
      {
        en: "I plan my crops and activities around completing them by year 2",
        zh: '我把作物和活动计划围绕第二年内完成来安排',
        zhTW: '我把作物和活動計劃圍繞第二年內完成來安排',
        ja: '2年目中に完成できるよう、作物や活動の計画を立てている',
        ko: '2년 차 안에 완성하도록 작물과 활동 계획을 세운다',
        de: 'Ich plane meine Ernte und Aktivitäten so, dass ich sie bis Jahr 2 abschließe',
        score: 2,
      },
      {
        en: "I aim to finish the Community Center by fall of year 1",
        zh: '目标是在第一年秋天之前完成社区中心',
        zhTW: '目標是在第一年秋天之前完成社區中心',
        ja: '1年目の秋までにコミュニティセンターを完成させることを目標にしている',
        ko: '1년차 가을 전에 커뮤니티 센터를 완성하는 걸 목표로 한다',
        de: 'Ich will das Community Center bis Herbst in Jahr 1 abschließen',
        score: 3,
      },
    ],
  },
  {
    q_en: 'Which statement best describes you in the mines?',
    q_zh: '下面哪句话最能描述你在矿洞里的状态？',
    q_zhTW: '下面哪句話最能描述你在礦洞裡的狀態？',
    q_ja: '鉱山での自分に一番近いのは？',
    q_ko: '광산에서 내 모습을 가장 잘 설명하는 건?',
    q_de: 'Welcher Satz beschreibt dich in der Mine am besten?',
    options: [
      {
        en: "I avoid the mines — they feel scary and confusing",
        zh: '能不去就不去——感觉危险又容易迷路',
        zhTW: '能不去就不去——感覺危險又容易迷路',
        ja: 'できるだけ行きたくない——怖くて迷子になりそう',
        ko: '가능하면 안 간다 — 위험하고 길 잃기 쉽다',
        de: 'Ich meide die Mine — sie ist verwirrend und beängstigend',
        score: 0,
      },
      {
        en: "I go when I need specific resources like copper or iron",
        zh: '需要铜矿或铁矿的时候才去',
        zhTW: '需要銅礦或鐵礦的時候才去',
        ja: '銅や鉄が必要なときだけ行く',
        ko: '구리나 철광석이 필요할 때만 간다',
        de: 'Ich gehe nur, wenn ich bestimmte Ressourcen wie Kupfer oder Eisen brauche',
        score: 1,
      },
      {
        en: "I push as deep as possible and use staircases when stuck",
        zh: '尽量往深处冲，卡关了就用楼梯跳层',
        zhTW: '盡量往深處衝，卡關了就用樓梯跳層',
        ja: 'できる限り深くもぐって、詰まったら階段を使う',
        ko: '최대한 깊이 내려가고, 막히면 계단을 써서 층을 건너뛴다',
        de: 'Ich gehe so tief wie möglich und nutze Treppen, wenn ich nicht weiterkomme',
        score: 2,
      },
      {
        en: "I know floor patterns and prepare optimized kits for each mine zone",
        zh: '我了解楼层规律，针对每个区域准备最优化的装备包',
        zhTW: '我了解樓層規律，針對每個區域準備最優化的裝備包',
        ja: 'フロアのパターンを把握していて、各エリアに最適なアイテムセットを用意している',
        ko: '층 패턴을 파악하고, 각 구역에 맞는 최적화된 장비 세트를 준비해둔다',
        de: 'Ich kenne die Stockwerksmuster und bereite optimierte Ausrüstungs-Sets für jede Minenzone vor',
        score: 3,
      },
    ],
  },
]

const RESULTS: Record<
  Tier,
  {
    name_en: string
    name_zh: string
    name_zhTW: string
    name_ja: string
    name_ko: string
    name_de: string
    emoji: string
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
  seedling: {
    name_en: 'Seedling',
    name_zh: '嫩苗新手',
    name_zhTW: '嫩苗新手',
    name_ja: '新米ファーマー',
    name_ko: '새싹 초보자',
    name_de: 'Keimling',
    emoji: '🌱',
    desc_en:
      "You're at the very beginning of your Stardew Valley journey — and that's honestly the best place to be. Every discovery feels like pure magic right now. The mines are full of mysteries, every villager has a secret, and the first strawberry you grow yourself will feel like a genuine achievement.",
    desc_zh:
      '你刚刚踏上星露谷之旅——这其实是最美好的起点。每一个发现都是纯粹的惊喜。矿洞里充满谜题，每位村民都藏着秘密，当你亲手种出第一颗草莓时，那种成就感是真实而珍贵的。',
    desc_zhTW:
      '你剛剛踏上星露谷之旅——這其實是最美好的起點。每一個發現都是純粹的驚喜。礦洞裡充滿謎題，每位村民都藏著秘密，當你親手種出第一顆草莓時，那種成就感是真實而珍貴的。',
    desc_ja:
      'スターデューバレーの旅を始めたばかり——それって、実は一番いい場所にいるってことだよ。まだ全部が新鮮で、鉱山は謎だらけで、村人たちはそれぞれ秘密を持ってる。自分で育てた最初のイチゴを収穫したとき、あの感動はきっと忘れられないはず。',
    desc_ko:
      '스타듀 밸리 여정의 시작점에 있어요 — 사실 이게 가장 좋은 위치예요. 아직 모든 게 신선하고, 광산은 미스터리로 가득하고, 마을 주민들은 저마다 비밀을 품고 있죠. 직접 키운 첫 딸기를 수확했을 때의 그 성취감은 진짜예요.',
    desc_de:
      'Du stehst ganz am Anfang deiner Stardew Valley-Reise — und das ist ehrlich gesagt der beste Platz. Jede Entdeckung fühlt sich noch magisch an. Die Minen sind voller Geheimnisse, jeder Dorfbewohner hat eine Geschichte, und wenn du deine erste selbst gezüchtete Erdbeere erntest, ist das ein echtes Erfolgserlebnis.',
    tips_en: [
      "Watch the TV every morning — Lucky Day and the Queen of Sauce cooking show are both genuinely useful",
      "Reach floor 40 in the mines before summer — you'll need copper tools",
      "At the Egg Festival on Spring 13, buy strawberry seeds — they're the best spring crop by far",
    ],
    tips_zh: [
      '每天早上看电视——幸运播报和料理节目都真的很有用',
      '在夏天之前挖到矿洞第 40 层——你需要铜质工具升级',
      '春天第 13 天鸡蛋节，一定要买草莓种子——它是春天性价比最高的作物',
    ],
    tips_zhTW: [
      '每天早上看電視——幸運播報和料理節目都真的很有用',
      '在夏天之前挖到礦洞第 40 層——你需要銅質工具升級',
      '春天第 13 天雞蛋節，一定要買草莓種子——它是春天性價比最高的作物',
    ],
    tips_ja: [
      '毎朝テレビをチェックしよう——ラッキーデーとクイーンオブソースの料理番組は本当に役立つ',
      '夏になる前に鉱山40階まで到達しよう——銅の道具へのアップグレードが必要になる',
      '春13日のエッグフェスティバルでは絶対にイチゴの種を買おう——春で一番コスパがいい作物だよ',
    ],
    tips_ko: [
      '매일 아침 TV를 확인하세요 — 행운 예보와 요리 프로그램 둘 다 진짜 유용해요',
      '여름 전에 광산 40층까지 내려가세요 — 구리 도구 업그레이드가 필요해요',
      '봄 13일 달걀 축제에서는 꼭 딸기 씨앗을 사세요 — 봄 작물 중 단연 가성비 최고예요',
    ],
    tips_de: [
      'Schau jeden Morgen fern — der Glückstag und die Queen of Sauce-Kochshow sind beide nützlich',
      'Erreiche vor dem Sommer Minenebene 40 — du brauchst Kupfer-Upgrades für deine Werkzeuge',
      'Kauf beim Egg Festival am Frühling 13 unbedingt Erdbeersamen — die beste Frühlingspflanze bei weitem',
    ],
  },
  sprout: {
    name_en: 'Sprout',
    name_zh: '成长萌芽',
    name_zhTW: '成長萌芽',
    name_ja: '成長中のファーマー',
    name_ko: '성장하는 새싹',
    name_de: 'Sprössling',
    emoji: '🌿',
    desc_en:
      "You know the basics and you're building real momentum. You probably have a favorite villager you're working on, crops growing in decent rows, and a mine run or two under your belt. The deeper layers of Stardew Valley — the lore, the artisan economy, the mine depth — are starting to open up for you.",
    desc_zh:
      '你已经掌握了基础，正在积累真正的游戏节奏。你可能已经有了想攻略的目标村民，作物种得井井有条，矿洞也下过几次了。星露谷更深的层次——世界观、手工艺品经济、矿洞深度——正准备向你敞开。',
    desc_zhTW:
      '你已經掌握了基礎，正在積累真正的遊戲節奏。你可能已經有了想攻略的目標村民，作物種得井井有條，礦洞也下過幾次了。星露谷更深的層次——世界觀、手工藝品經濟、礦洞深度——正準備向你敞開。',
    desc_ja:
      '基本はしっかり押さえて、ゲームのリズムもつかんできた。きっと好きな村人もできて、作物もそこそこ育てて、鉱山にも何度か潜ったと思う。スターデューバレーのより深い部分——世界の裏側の話、職人品の経済、鉱山の深い階層——がいよいよ見えてきたところだよ。',
    desc_ko:
      '기본기를 익혀서 이제 게임 리듬이 잡히기 시작했어요. 좋아하는 주민도 생기고, 작물도 제법 잘 키우고, 광산도 몇 번 내려가봤을 거예요. 스타듀 밸리의 더 깊은 부분들 — 세계관 비밀, 장인 경제, 광산 깊은 곳 — 이 이제 열리려 하고 있어요.',
    desc_de:
      'Du kennst die Grundlagen und kommst richtig in Fahrt. Wahrscheinlich hast du schon einen Lieblings-Dorfbewohner, ein paar ordentliche Felder und ein bis zwei Bergwerk-Ausflüge hinter dir. Die tieferen Schichten von Stardew Valley — Lore, die Handwerker-Ökonomie, die Minentiefen — fangen jetzt an, sich zu öffnen.',
    tips_en: [
      "Unlock the greenhouse by completing the pantry bundles — it's a game-changer for late income",
      "Buy a Crystalarium and fill it with diamonds for passive daily gold",
      "Save iridium ore for sprinklers — they'll free up your entire morning routine",
    ],
    tips_zh: [
      '完成储藏室捆包来解锁温室——这会彻底改变后期收入节奏',
      '买培育机放进钻石，实现每天被动收入',
      '铱矿优先用来做洒水机——每天早上你会感谢自己',
    ],
    tips_zhTW: [
      '完成儲藏室捆包來解鎖溫室——這會徹底改變後期收入節奏',
      '買培育機放進鑽石，實現每天被動收入',
      '銥礦優先用來做灑水機——每天早上你會感謝自己',
    ],
    tips_ja: [
      '食料庫バンドルを完成させて温室を解放しよう——後半の収入が激変するよ',
      'クリスタラリウムを買ってダイヤモンドを入れると毎日ゴールドが入ってくる',
      'イリジウムはスプリンクラー優先で使おう——毎朝それに感謝することになるから',
    ],
    tips_ko: [
      '식료품 창고 묶음을 완성해 온실을 해금하세요 — 후반 수입이 완전히 달라져요',
      '크리스탈라리움을 사서 다이아몬드를 넣으면 매일 수동 소득이 생겨요',
      '이리디움은 스프링클러 제작에 우선 사용하세요 — 매일 아침 감사하게 될 거예요',
    ],
    tips_de: [
      'Schließe die Speisekammer-Pakete ab, um das Gewächshaus freizuschalten — das verändert die Spätstadium-Einnahmen komplett',
      'Kauf einen Kristallarium und füll ihn mit Diamanten für passives tägliches Gold',
      'Nutze Iridium-Erz zuerst für Sprinkler — du wirst dir jedes Morgen dafür danken',
    ],
  },
  harvest: {
    name_en: 'Harvest Ready',
    name_zh: '丰收达人',
    name_zhTW: '豐收達人',
    name_ja: '収穫名人',
    name_ko: '수확의 달인',
    name_de: 'Erntereifer Bauer',
    emoji: '🌾',
    desc_en:
      "You're past the learning curve and running an efficient, intentional farm. You think in seasons, plan your crops strategically, and know which villagers to gift and when. New players watching you would genuinely learn something useful — you have the instincts down.",
    desc_zh:
      '你已经过了学习曲线，正在运营一个高效且有规划的农场。你用季节思考问题，战略性地安排作物，清楚在什么时机给哪位村民送礼。新玩家看你游戏真的能学到东西——你已经建立起了农场直觉。',
    desc_zhTW:
      '你已經過了學習曲線，正在運營一個高效且有規劃的農場。你用季節思考問題，戰略性地安排作物，清楚在什麼時機給哪位村民送禮。新玩家看你遊戲真的能學到東西——你已經建立起了農場直覺。',
    desc_ja:
      'もう学習曲線は超えた。効率的で計画的な農場を運営している。季節で物事を考えて、作物を戦略的に配置して、どの村人にいつプレゼントすればいいかも把握してる。新しいプレイヤーが見たら本当に勉強になるくらい、農場センスが身についてるよ。',
    desc_ko:
      '이제 학습 곡선을 넘어 효율적이고 계획적인 농장을 운영 중이에요. 계절 단위로 생각하고, 작물을 전략적으로 배치하고, 어떤 주민에게 언제 선물해야 하는지도 알죠. 신규 플레이어가 보면 진짜 배울 게 있을 정도로 농장 감각이 생겼어요.',
    desc_de:
      'Du bist über die Lernkurve hinaus und betreibst eine effiziente, durchdachte Farm. Du denkst in Jahreszeiten, planst deine Ernte strategisch und weißt, welchen Dorfbewohnern du wann ein Geschenk machst. Neue Spieler würden von dir wirklich etwas lernen — du hast echten Farm-Instinkt entwickelt.',
    tips_en: [
      "Ancient Fruit in greenhouse + wine kegs = the best gold-per-day strategy in the game",
      "Skull Cavern on lucky days with lots of staircases = fastest iridium route",
      "Try completing the Community Center in year 1 fall — it's a satisfying milestone to chase",
    ],
    tips_zh: [
      '温室里种古代水果 + 酒桶酿酒 = 游戏中单日最高金币策略',
      '幸运日在骷髅洞配合大量楼梯 = 最快的铱矿获取路线',
      '尝试在第一年秋天内完成社区中心——这是一个非常有成就感的里程碑目标',
    ],
    tips_zhTW: [
      '溫室裡種古代水果 + 酒桶釀酒 = 遊戲中單日最高金幣策略',
      '幸運日在骷髏洞配合大量樓梯 = 最快的銥礦獲取路線',
      '嘗試在第一年秋天內完成社區中心——這是一個非常有成就感的里程碑目標',
    ],
    tips_ja: [
      '温室の古代の果実＋ワイン樽で醸造 = ゲーム最強の1日あたり金貨戦略',
      'ラッキーデーにスカルキャバーンで大量の階段を使う = 最速のイリジウム収集ルート',
      '1年目の秋にコミュニティセンターを完成させてみよう——達成感がすごいマイルストーンだよ',
    ],
    tips_ko: [
      '온실에서 고대 과일 재배 + 와인 통 발효 = 게임 내 하루 최고 금화 전략',
      '행운의 날에 해골 동굴에서 계단을 대량으로 사용 = 가장 빠른 이리디움 획득 루트',
      '1년차 가을 안에 커뮤니티 센터 완성에 도전해보세요 — 정말 뿌듯한 마일스톤이에요',
    ],
    tips_de: [
      'Antike Frucht im Gewächshaus + Weinfässer = die beste Gold-pro-Tag-Strategie im Spiel',
      'Skull Cavern an Glückstagen mit vielen Treppen = schnellste Iridium-Farmroute',
      'Versuche, das Community Center bis Herbst in Jahr 1 abzuschließen — ein sehr lohnendes Ziel',
    ],
  },
  veteran: {
    name_en: 'Master Farmer',
    name_zh: '农场大师',
    name_zhTW: '農場大師',
    name_ja: '農場マスター',
    name_ko: '농장 마스터',
    name_de: 'Meister-Farmer',
    emoji: '🏆',
    desc_en:
      "You've seen it all. You've optimized the sprinkler grid, finished all bundles before fall year 1, and have strong opinions about every farm type. You've probably explained the quarry tile spawn mechanic to at least two confused friends. You are Stardew Valley.",
    desc_zh:
      '你什么都见过了。你优化过洒水机格局，在第一年秋天前完成了所有捆包，对每种农场类型都有自己的坚定看法。你可能已经至少给两位困惑的朋友解释过采石场格子的刷新机制了。你就是星露谷本体。',
    desc_zhTW:
      '你什麼都見過了。你優化過灑水機格局，在第一年秋天前完成了所有捆包，對每種農場類型都有自己的堅定看法。你可能已經至少給兩位困惑的朋友解釋過採石場格子的刷新機制了。你就是星露谷本體。',
    desc_ja:
      'なんでも経験済み。スプリンクラーの最適配置も、1年目秋のコミュニティセンター全完成も、各農場タイプへの強いこだわりも全部持ってる。採石場のタイル出現パターンを少なくとも2人の友達に説明したことがあるはず。あなたはもうスターデューバレーそのもの。',
    desc_ko:
      '다 해봤죠. 스프링클러 최적 배치도, 1년차 가을 커뮤니티 센터 완성도, 각 농장 유형에 대한 확고한 의견도 다 있어요. 채석장 타일 스폰 메커니즘을 최소 두 명의 혼란스러운 친구에게 설명해준 적도 있을 거예요. 당신이 바로 스타듀 밸리 그 자체예요.',
    desc_de:
      'Du hast alles gesehen. Du hast das Sprinkler-Raster optimiert, alle Pakete vor Herbst in Jahr 1 abgeschlossen und hast zu jedem Farmtyp eine klare Meinung. Du hast wahrscheinlich schon mindestens zwei verwirrten Freunden erklärt, wie die Steinbruch-Kacheln spawnen. Du bist Stardew Valley.',
    tips_en: [
      "Try a Beach Farm challenge run — no fertilizer makes the ancient fruit wine build a real puzzle",
      "Chase Perfection (100% completion) on a new save — it's the true endgame",
      "Try Stardew Valley Expanded mod — dozens of new characters, events, and a huge new map area",
    ],
    tips_zh: [
      '尝试海滩农场挑战档——无化肥限制让古代水果酒路线变成真正的谜题',
      '在新存档挑战「完美度」（100% 完成度）——这才是真正的终局内容',
      '试试星露谷扩展 Mod——数十个新角色、新事件和巨大的新地图区域',
    ],
    tips_zhTW: [
      '嘗試海灘農場挑戰檔——無化肥限制讓古代水果酒路線變成真正的謎題',
      '在新存檔挑戰「完美度」（100% 完成度）——這才是真正的終局內容',
      '試試星露谷擴展 Mod——數十個新角色、新事件和巨大的新地圖區域',
    ],
    tips_ja: [
      'ビーチファームで縛りプレイに挑戦——肥料なしで古代の果実ワイン戦略をやるのは本当のパズルになる',
      '新しいセーブデータで「パーフェクション」（完成度100%）に挑戦しよう——これが本当のエンドゲーム',
      'Stardew Valley Expandedモッドを試してみて——新キャラ、新イベント、巨大な新マップエリアが大量追加',
    ],
    tips_ko: [
      '해변 농장 도전 파일을 시도해보세요 — 비료 없이 고대 과일 와인 전략을 쓰면 진짜 퍼즐이 됩니다',
      '새 저장 파일에서 "완벽도" (100% 달성)에 도전하세요 — 이게 진짜 엔드게임이에요',
      'Stardew Valley Expanded 모드를 사용해보세요 — 수십 개의 새 캐릭터, 이벤트, 거대한 새 지역 추가',
    ],
    tips_de: [
      'Versuche einen Beach-Farm-Run — ohne Dünger wird die Antike Frucht-Wein-Strategie zum echten Rätsel',
      'Jage der Perfektion (100% Abschluss) auf einem neuen Spielstand nach — das ist das wahre Endgame',
      'Probiere den Stardew Valley Expanded Mod — dutzende neue Charaktere, Events und ein riesiges neues Kartengebiet',
    ],
  },
}

function calcTier(answers: (number | null)[]): Tier {
  const total = answers.reduce<number>((sum, oi, qi) => {
    if (oi === null) return sum
    return sum + QUESTIONS[qi].options[oi].score
  }, 0)
  if (total <= 5) return 'seedling'
  if (total <= 10) return 'sprout'
  if (total <= 14) return 'harvest'
  return 'veteran'
}

export function StardewBeginnerQuiz({ locale }: { locale: string }) {
  const getLoc = (
    zh: string,
    en: string,
    zhTW?: string,
    ja?: string,
    ko?: string,
    de?: string,
  ): string => {
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
  const [answers, setAnswers] = useState<(number | null)[]>(Array(QUESTIONS.length).fill(null))
  const [submitted, setSubmitted] = useState(false)

  const allAnswered = answers.every((a) => a !== null)

  if (submitted) {
    const tier = calcTier(answers)
    const result = RESULTS[tier]
    const url = `${BASE_URL}/${locale}/quizzes/stardew-beginner`
    const shareText = getLoc(
      `我的星露谷段位是「${result.name_zh}」！快来测测你是哪个等级的农夫：${url}`,
      `I'm a Stardew Valley "${result.name_en}"! Find your farmer level: ${url}`,
      `我的星露谷段位是「${result.name_zhTW}」！快來測測你是哪個等級的農夫：${url}`,
      `スターデューバレーでの私のランクは「${result.name_ja}」！あなたも農夫レベルをチェック：${url}`,
      `스타듀 밸리에서 내 등급은 「${result.name_ko}」！당신의 농부 레벨은 뭔지 확인해보세요：${url}`,
      `Mein Stardew Valley Level ist "${result.name_de}"! Finde dein Farmer-Level: ${url}`,
    )

    return (
      <div>
        <div className="mb-6 text-center">
          <div className="mb-3 text-6xl">{result.emoji}</div>
          <h2 className="mb-2 text-2xl font-bold text-[#f0a832]">
            {getLoc(result.name_zh, result.name_en, result.name_zhTW, result.name_ja, result.name_ko, result.name_de)}
          </h2>
          <p className="text-sm leading-relaxed text-[#8a9a7a]">
            {getLoc(result.desc_zh, result.desc_en, result.desc_zhTW, result.desc_ja, result.desc_ko, result.desc_de)}
          </p>
        </div>

        <div className="mb-6 rounded-xl border border-[#2d3d2d] bg-[#0f1a0f] p-4">
          <h3 className="mb-3 text-sm font-semibold text-[#e8dcc8]">
            {getLoc(
              '适合你段位的建议',
              'Tips for your level',
              '適合你段位的建議',
              'あなたのレベルに合ったアドバイス',
              '당신의 레벨에 맞는 팁',
              'Tipps für dein Level',
            )}
          </h3>
          <ul className="space-y-2">
            {getLocArr(
              result.tips_zh,
              result.tips_en,
              result.tips_zhTW,
              result.tips_ja,
              result.tips_ko,
              result.tips_de,
            ).map((tip, i) => (
              <li key={i} className="flex gap-2 text-sm text-[#8a9a7a]">
                <span className="shrink-0 text-[#f0a832]">→</span>
                <span>{tip}</span>
              </li>
            ))}
          </ul>
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
            '你是星露谷新手还是老鸟？',
            'Stardew Valley: Beginner or Pro?',
            '你是星露谷新手還是老鳥？',
            'スターデューバレー：初心者それとも上級者？',
            '스타듀 밸리: 초보자 vs 고수?',
            'Stardew Valley: Anfänger oder Profi?',
          )}
        </h1>
        <p className="text-sm text-[#8a9a7a]">
          {getLoc(
            '6 个问题，测出你的农夫段位',
            '6 questions to find your farmer level',
            '6 個問題，測出你的農夫段位',
            '6つの質問で農夫レベルがわかる',
            '6가지 질문으로 당신의 농부 레벨을 알아보세요',
            '6 Fragen, um dein Farmer-Level herauszufinden',
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
                    next[qi] = oi
                    setAnswers(next)
                  }}
                  className={`w-full rounded-xl border px-4 py-3 text-left text-sm transition-colors ${
                    answers[qi] === oi
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
