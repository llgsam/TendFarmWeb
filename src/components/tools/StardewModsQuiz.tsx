'use client'

import { useState } from 'react'
import { BASE_URL } from '@/lib/config'

type Pick = 'pure-vanilla' | 'stardew-expanded' | 'visual-mods' | 'full-modded'

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
  options: Array<{ en: string; zh: string; zhTW: string; ja: string; ko: string; de: string; type: Pick }>
}> = [
  {
    q_en: 'Where are you in your Stardew Valley journey right now?',
    q_zh: '你目前在星露谷物语旅程的哪个阶段？',
    q_zhTW: '你目前在星露谷物語旅程的哪個階段？',
    q_ja: '今、スターデューバレーのどのくらいまで進んでいますか？',
    q_ko: '지금 스타듀 밸리를 어느 정도까지 플레이했나요?',
    q_de: 'Wo stehst du gerade auf deiner Stardew Valley-Reise?',
    options: [
      {
        en: "I haven't finished year 2 or the Community Center yet",
        zh: '我还没完成第二年或社区中心',
        zhTW: '我還沒完成第二年或社區中心',
        ja: 'まだ2年目やコミュニティセンターを終わらせていない',
        ko: '아직 2년 차나 커뮤니티 센터를 완료하지 못했어요',
        de: 'Ich habe Jahr 2 oder das Gemeinschaftszentrum noch nicht abgeschlossen',
        type: 'pure-vanilla',
      },
      {
        en: 'I finished the main game and want more of the same feeling',
        zh: '我完成了主游戏，想要更多相同的感觉',
        zhTW: '我完成了主遊戲，想要更多相同的感覺',
        ja: 'メインゲームをクリアして、同じ感覚でもっと遊びたい',
        ko: '메인 게임을 클리어하고 같은 느낌으로 더 즐기고 싶어요',
        de: 'Ich habe das Hauptspiel beendet und möchte mehr vom gleichen Gefühl',
        type: 'stardew-expanded',
      },
      {
        en: "I've played many hours but the graphics feel dated to me now",
        zh: '我玩了很多小时，但现在图形感觉过时了',
        zhTW: '我玩了很多小時，但現在畫面感覺有點舊了',
        ja: 'かなり長時間プレイしたけど、グラフィックが古く感じるようになった',
        ko: '오래 플레이했는데 이제 그래픽이 좀 오래된 것 같아요',
        de: 'Ich habe viele Stunden gespielt, aber die Grafik wirkt inzwischen veraltet',
        type: 'visual-mods',
      },
      {
        en: 'I have 200+ hours and have done everything multiple times',
        zh: '我有 200+ 小时并多次完成了所有内容',
        zhTW: '我有 200+ 小時並多次完成了所有內容',
        ja: '200時間以上プレイして、すべてを何度もクリアした',
        ko: '200시간 이상 플레이하고 모든 것을 여러 번 완료했어요',
        de: 'Ich habe 200+ Stunden und alles mehrfach durchgespielt',
        type: 'full-modded',
      },
    ],
  },
  {
    q_en: "What's your main reason for thinking about Stardew Valley mods?",
    q_zh: '你考虑星露谷物语模组的主要原因是什么？',
    q_zhTW: '你考慮星露谷物語模組的主要原因是什麼？',
    q_ja: 'スターデューバレーのMODを考えている一番の理由は何ですか？',
    q_ko: '스타듀 밸리 모드를 고려하는 가장 큰 이유는 무엇인가요?',
    q_de: 'Was ist dein Hauptgrund, über Stardew Valley Mods nachzudenken?',
    options: [
      {
        en: "I'm curious but not sure I actually need them yet",
        zh: '我很好奇，但不确定我是否真的还需要它们',
        zhTW: '我很好奇，但不確定我是否真的還需要它們',
        ja: '気になってはいるけど、本当に必要かどうかまだわからない',
        ko: '궁금하긴 한데 아직 정말로 필요한지 모르겠어요',
        de: 'Ich bin neugierig, aber nicht sicher, ob ich sie wirklich brauche',
        type: 'pure-vanilla',
      },
      {
        en: 'I want more content — new maps, characters, events, story',
        zh: '我想要更多内容——新地图、角色、事件、故事',
        zhTW: '我想要更多內容——新地圖、角色、事件、故事',
        ja: 'もっとコンテンツが欲しい——新マップ、キャラ、イベント、ストーリー',
        ko: '더 많은 콘텐츠가 필요해요 — 새 맵, 캐릭터, 이벤트, 스토리',
        de: 'Ich will mehr Inhalt — neue Karten, Charaktere, Events, Story',
        type: 'stardew-expanded',
      },
      {
        en: "I want the game to look better without changing how it plays",
        zh: '我想让游戏看起来更好，但不改变玩法',
        zhTW: '我想讓遊戲看起來更好，但不改變玩法',
        ja: 'ゲームプレイを変えずに見た目をきれいにしたい',
        ko: '게임플레이는 바꾸지 않고 외형만 더 예쁘게 만들고 싶어요',
        de: 'Ich möchte, dass das Spiel besser aussieht, ohne das Gameplay zu ändern',
        type: 'visual-mods',
      },
      {
        en: 'I want to completely transform the game into something new',
        zh: '我想把游戏完全改造成全新的东西',
        zhTW: '我想把遊戲完全改造成全新的東西',
        ja: 'ゲームをまったく別物に作り変えたい',
        ko: '게임을 완전히 새로운 것으로 탈바꿈시키고 싶어요',
        de: 'Ich möchte das Spiel komplett in etwas Neues verwandeln',
        type: 'full-modded',
      },
    ],
  },
  {
    q_en: 'How do you feel about installing mods that require extra tools (like SMAPI)?',
    q_zh: '你如何看待安装需要额外工具（如 SMAPI）的模组？',
    q_zhTW: '你如何看待安裝需要額外工具（如 SMAPI）的模組？',
    q_ja: 'SMAPIのような追加ツールが必要なMODを導入することについてどう思いますか？',
    q_ko: 'SMAPI 같은 추가 도구가 필요한 모드를 설치하는 것에 대해 어떻게 생각하나요?',
    q_de: 'Wie stehst du dazu, Mods zu installieren, die extra Tools (wie SMAPI) erfordern?',
    options: [
      {
        en: "I'd rather not deal with that complexity — just the game please",
        zh: '我宁愿不处理那种复杂性——只要游戏本身就好',
        zhTW: '我寧願不處理那種複雜性——只要遊戲本身就好',
        ja: 'そういう面倒は避けたい——ゲームだけで十分',
        ko: '그런 복잡한 건 피하고 싶어요 — 그냥 게임만 하고 싶어요',
        de: 'Ich möchte diese Komplexität lieber vermeiden — nur das Spiel bitte',
        type: 'pure-vanilla',
      },
      {
        en: "I can follow a guide — I'll do it for content I really want",
        zh: '我可以跟着教程来——为了我真正想要的内容值得',
        zhTW: '我可以跟著教學來——為了我真正想要的內容值得',
        ja: 'ガイドに従えばできる——本当に欲しいコンテンツのためなら頑張る',
        ko: '가이드 보면서 할 수 있어요 — 정말 원하는 콘텐츠라면 해볼게요',
        de: 'Ich kann einer Anleitung folgen — für Inhalte, die ich wirklich will',
        type: 'stardew-expanded',
      },
      {
        en: "I'd prefer mods that don't require much technical setup",
        zh: '我更喜欢不需要太多技术设置的模组',
        zhTW: '我更喜歡不需要太多技術設定的模組',
        ja: 'あまり技術的な設定が不要なMODが好ましい',
        ko: '기술적인 설정이 많이 필요 없는 모드가 좋아요',
        de: 'Ich bevorzuge Mods, die nicht viel technisches Setup erfordern',
        type: 'visual-mods',
      },
      {
        en: "I enjoy the mod installation process — I find it satisfying to customize",
        zh: '我喜欢模组安装过程——我觉得自定义本身很令人满足',
        zhTW: '我喜歡模組安裝過程——我覺得自訂本身很令人滿足',
        ja: 'MODの導入作業自体が好き——カスタマイズすること自体が楽しい',
        ko: '모드 설치 과정 자체가 즐거워요 — 커스터마이징하는 게 뿌듯해요',
        de: 'Ich genieße den Mod-Installationsprozess — das Anpassen macht mir Spaß',
        type: 'full-modded',
      },
    ],
  },
  {
    q_en: 'Which of these would bother you most about a heavily modded game?',
    q_zh: '关于重度模组化游戏，以下哪点最让你烦恼？',
    q_zhTW: '關於重度模組化遊戲，以下哪點最讓你困擾？',
    q_ja: '大量のMODを入れたゲームで一番気になるのはどれですか？',
    q_ko: '모드를 많이 넣은 게임에서 가장 신경 쓰이는 것은 무엇인가요?',
    q_de: 'Was würde dich an einem stark modifizierten Spiel am meisten stören?',
    options: [
      {
        en: 'The original experience being altered — I love vanilla Stardew',
        zh: '原版体验被改变——我热爱原版星露谷',
        zhTW: '原版體驗被改變——我熱愛原版星露谷',
        ja: 'オリジナルの体験が変わること——バニラのスターデューが好きだから',
        ko: '원래 경험이 바뀌는 것 — 바닐라 스타듀를 좋아하거든요',
        de: 'Die ursprüngliche Erfahrung wird verändert — ich liebe Vanilla Stardew',
        type: 'pure-vanilla',
      },
      {
        en: 'Game crashes or incompatibility between mods',
        zh: '游戏崩溃或模组之间的不兼容',
        zhTW: '遊戲當機或模組之間的不相容',
        ja: 'ゲームのクラッシュやMOD同士の非互換性',
        ko: '게임 크래시나 모드 간 호환성 문제',
        de: 'Spielabstürze oder Inkompatibilität zwischen Mods',
        type: 'stardew-expanded',
      },
      {
        en: 'Gameplay being changed when I only wanted visual improvements',
        zh: '当我只想要视觉改进时游戏玩法被改变',
        zhTW: '當我只想要視覺改進時遊戲玩法被改變',
        ja: 'ビジュアルだけ変えたいのにゲームプレイまで変わってしまうこと',
        ko: '외형만 바꾸고 싶었는데 게임플레이까지 바뀌는 것',
        de: 'Das Gameplay wird geändert, obwohl ich nur visuelle Verbesserungen wollte',
        type: 'visual-mods',
      },
      {
        en: 'Nothing really — mod instability is a reasonable tradeoff for me',
        zh: '没什么——对我来说模组不稳定性是合理的权衡',
        zhTW: '沒什麼——對我來說模組不穩定性是合理的取捨',
        ja: '特になし——MODの不安定さは許容できるトレードオフ',
        ko: '별로 없어요 — 모드 불안정성은 감수할 만한 트레이드오프예요',
        de: 'Eigentlich nichts — Mod-Instabilität ist für mich ein akzeptabler Kompromiss',
        type: 'full-modded',
      },
    ],
  },
  {
    q_en: "What would your ideal next Stardew Valley playthrough feel like?",
    q_zh: '你理想中的下一次星露谷物语游玩体验是什么感觉？',
    q_zhTW: '你理想中的下一次星露谷物語遊玩體驗是什麼感覺？',
    q_ja: '理想の次のスターデューバレープレイはどんな感じですか？',
    q_ko: '이상적인 다음 스타듀 밸리 플레이는 어떤 느낌이었으면 하나요?',
    q_de: 'Wie soll sich dein idealer nächster Stardew Valley-Durchgang anfühlen?',
    options: [
      {
        en: 'The same wonderful game I already love — just on a new farm',
        zh: '我已经喜爱的同样精彩的游戏——只是在一个新农场',
        zhTW: '我已經喜愛的同樣精彩的遊戲——只是在一個新農場',
        ja: '大好きなあのゲームをそのままに——新しい農場で',
        ko: '이미 사랑하는 그 게임 그대로 — 그냥 새 농장에서',
        de: 'Das gleiche wunderbare Spiel, das ich bereits liebe — nur auf einer neuen Farm',
        type: 'pure-vanilla',
      },
      {
        en: 'A substantially larger world — more to explore, more characters, more events',
        zh: '一个更大得多的世界——更多探索、更多角色、更多事件',
        zhTW: '一個更大得多的世界——更多探索、更多角色、更多事件',
        ja: 'もっと広い世界——探索場所もキャラも、イベントもたくさん',
        ko: '훨씬 더 넓은 세계 — 더 많은 탐험, 캐릭터, 이벤트',
        de: 'Eine deutlich größere Welt — mehr zu erkunden, mehr Charaktere, mehr Events',
        type: 'stardew-expanded',
      },
      {
        en: "The same gameplay but everything looks crisper and more beautiful",
        zh: '相同的玩法，但一切看起来更清晰、更美丽',
        zhTW: '相同的玩法，但一切看起來更清晰、更美麗',
        ja: '同じゲームプレイで、見た目だけもっとくっきり美しく',
        ko: '같은 게임플레이인데 그래픽이 더 선명하고 아름다웠으면 해요',
        de: 'Das gleiche Gameplay, aber alles sieht knackiger und schöner aus',
        type: 'visual-mods',
      },
      {
        en: 'Completely different — new mechanics, new content, new challenge',
        zh: '完全不同——新机制、新内容、新挑战',
        zhTW: '完全不同——新機制、新內容、新挑戰',
        ja: 'まったく違う体験——新しいシステム、コンテンツ、チャレンジ',
        ko: '완전히 다른 것 — 새로운 메커닉, 콘텐츠, 도전',
        de: 'Komplett anders — neue Mechaniken, neue Inhalte, neue Herausforderungen',
        type: 'full-modded',
      },
    ],
  },
  {
    q_en: 'How do you feel about playing a version of Stardew Valley that other players might not recognize?',
    q_zh: '你对玩一个其他玩家可能不认识的星露谷物语版本有什么感觉？',
    q_zhTW: '你對玩一個其他玩家可能不認識的星露谷物語版本有什麼感覺？',
    q_ja: '他のプレイヤーが見たら別ゲームだと思うかもしれないスターデューバレーをプレイすることについてどう感じますか？',
    q_ko: '다른 플레이어들이 알아보지 못할 수도 있는 버전의 스타듀 밸리를 플레이하는 것에 대해 어떻게 생각하나요?',
    q_de: 'Wie fühlst du dich dabei, eine Version von Stardew Valley zu spielen, die andere Spieler vielleicht nicht wiedererkennen?',
    options: [
      {
        en: 'I prefer we all play the same version — shared experience matters',
        zh: '我更喜欢我们都玩同一个版本——共同体验很重要',
        zhTW: '我更喜歡我們都玩同一個版本——共同體驗很重要',
        ja: 'みんなが同じバージョンをプレイする方がいい——共有体験が大事',
        ko: '다 같이 같은 버전을 하는 게 좋아요 — 공통 경험이 중요하니까요',
        de: 'Ich bevorzuge, dass wir alle dieselbe Version spielen — gemeinsame Erfahrung ist wichtig',
        type: 'pure-vanilla',
      },
      {
        en: "Fine if it's a popular mod — most Stardew veterans know Expanded",
        zh: '如果是热门模组就没问题——大多数星露谷老手都知道 Expanded',
        zhTW: '如果是熱門模組就沒問題——大多數星露谷老手都知道 Expanded',
        ja: '人気MODならOK——スターデュー上級者はExpandedを知っているから',
        ko: '인기 모드라면 괜찮아요 — 스타듀 베테랑 대부분이 Expanded를 알거든요',
        de: 'In Ordnung, wenn es ein beliebter Mod ist — die meisten Stardew-Veteranen kennen Expanded',
        type: 'stardew-expanded',
      },
      {
        en: "My visual mods won't change the gameplay so it still feels like Stardew",
        zh: '我的视觉模组不会改变游戏玩法，所以感觉仍然像星露谷',
        zhTW: '我的視覺模組不會改變遊戲玩法，所以感覺仍然像星露谷',
        ja: 'ビジュアルMODはゲームプレイを変えないから、スターデューらしさは残る',
        ko: '비주얼 모드는 게임플레이를 바꾸지 않으니까 여전히 스타듀 같아요',
        de: 'Meine visuellen Mods ändern das Gameplay nicht, also fühlt es sich noch wie Stardew an',
        type: 'visual-mods',
      },
      {
        en: "Doesn't matter to me — my experience is my own",
        zh: '对我来说无所谓——我的体验是我自己的',
        zhTW: '對我來說無所謂——我的體驗是我自己的',
        ja: '気にしない——自分の体験は自分のもの',
        ko: '상관없어요 — 내 경험은 내 것이니까요',
        de: 'Ist mir egal — meine Erfahrung gehört mir',
        type: 'full-modded',
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
    body_en: string
    body_zh: string
    body_zhTW: string
    body_ja: string
    body_ko: string
    body_de: string
    mods_en: string[]
    mods_zh: string[]
    mods_zhTW: string[]
    mods_ja: string[]
    mods_ko: string[]
    mods_de: string[]
  }
> = {
  'pure-vanilla': {
    title_en: 'Stay in Pure Vanilla — You Are Not Done Yet',
    title_zh: '留在原版——你还没玩完',
    title_zhTW: '留在原版——你還沒玩完',
    title_ja: 'バニラのままで——まだやり残しがあります',
    title_ko: '순수 바닐라로 — 아직 끝내지 못했어요',
    title_de: 'Bleib bei Vanilla — du bist noch nicht fertig',
    emoji: '🌱',
    tag_en: "The original Stardew Valley is still a complete, perfect game",
    tag_zh: '原版星露谷物语仍然是一款完整、完美的游戏',
    tag_zhTW: '原版星露谷物語仍然是一款完整、完美的遊戲',
    tag_ja: 'オリジナルのスターデューバレーは今も完璧なゲームです',
    tag_ko: '오리지널 스타듀 밸리는 여전히 완전하고 완벽한 게임입니다',
    tag_de: 'Das originale Stardew Valley ist immer noch ein vollständiges, perfektes Spiel',
    body_en:
      "Your result is clear: you do not need mods yet. Stardew Valley vanilla is one of the most complete gaming experiences ever made — over 400 hours of content before most players feel they have truly done everything. The Community Center, every villager's heart events, the Junimo Kart achievement, the perfection 100% score, grandpa's re-evaluation, and all the secret notes are genuinely enormous amounts of content. If you have not done all of that, mods will actually dilute the experience. ConcernedApe (the single developer) designed every element of the vanilla game as an intentional whole — play it through once, completely, before adding anything else. You can always add mods later.",
    body_zh:
      '你的结果很清楚：你还不需要模组。星露谷物语原版是有史以来最完整的游戏体验之一——超过 400 小时的内容，大多数玩家才感觉真正完成了一切。社区中心、每位村民的心事件、Junimo 推车成就、100% 完美评分、祖父重新评估，以及所有秘密便条都是真正庞大的内容量。如果你还没做完这些，模组实际上会稀释体验。ConcernedApe（单独的开发者）将原版游戏的每个元素设计成一个有意识的整体——在添加任何东西之前，先完整地玩一遍。你以后总可以添加模组。',
    body_zhTW:
      '你的結果很清楚：你還不需要模組。星露谷物語原版是有史以來最完整的遊戲體驗之一——超過 400 小時的內容，大多數玩家才感覺真正完成了一切。社區中心、每位村民的心事件、Junimo 推車成就、100% 完美評分、祖父重新評估，以及所有秘密便條都是真正龐大的內容量。如果你還沒做完這些，模組實際上會稀釋體驗。ConcernedApe（獨立開發者）將原版遊戲的每個元素設計成一個有意識的整體——在新增任何東西之前，先完整地玩一遍。你之後隨時都可以加模組。',
    body_ja:
      '結果は明確です：まだMODは必要ありません。スターデューバレーのバニラは、これまで作られた中で最も完成度の高いゲーム体験の一つです——ほとんどのプレイヤーが「やり切った」と感じるまでに400時間以上のコンテンツがあります。コミュニティセンター、全村人のハートイベント、ジュニモカートの実績、完璧スコア100%、おじいさんの再評価、そしてすべての秘密のメモ……これだけで十分すぎるほどのボリュームです。これらを全部終えていない段階でMODを入れると、むしろ体験が薄まります。ConcernedApe（たった一人の開発者）は、バニラゲームのすべての要素を意図的なひとつの作品として設計しました——何も追加せず、まず一度完全にクリアしてみてください。MODはいつでも後から追加できます。',
    body_ko:
      '결과는 명확합니다: 아직 모드가 필요하지 않습니다. 스타듀 밸리 바닐라는 역대 가장 완성도 높은 게임 경험 중 하나입니다 — 대부분의 플레이어가 "다 했다"고 느끼기까지 400시간 이상의 콘텐츠가 있습니다. 커뮤니티 센터, 모든 마을 주민의 하트 이벤트, 주니모 카트 업적, 완벽한 100% 점수, 할아버지 재평가, 그리고 모든 비밀 메모들은 정말 방대한 양의 콘텐츠입니다. 이것들을 다 끝내지 않은 상태에서 모드를 추가하면 오히려 경험이 희석됩니다. ConcernedApe(단독 개발자)는 바닐라 게임의 모든 요소를 의도적인 하나의 전체로 설계했습니다 — 다른 것을 추가하기 전에 완전히 한 번 플레이해보세요. 모드는 언제든지 나중에 추가할 수 있습니다.',
    body_de:
      'Dein Ergebnis ist eindeutig: Du brauchst noch keine Mods. Stardew Valley Vanilla ist eine der vollständigsten Gaming-Erfahrungen aller Zeiten — über 400 Stunden Inhalt, bevor die meisten Spieler das Gefühl haben, wirklich alles gemacht zu haben. Das Gemeinschaftszentrum, die Herzereignisse jedes Dorfbewohners, die Junimo-Kart-Leistung, der perfekte 100%-Score, Opas Neubewertung und alle Geheimnisnotizen sind wirklich enorme Inhaltsmengen. Wenn du das alles noch nicht gemacht hast, werden Mods die Erfahrung tatsächlich verwässern. ConcernedApe (der einzelne Entwickler) hat jedes Element des Vanilla-Spiels als bewusstes Ganzes gestaltet — spiel es einmal vollständig durch, bevor du etwas hinzufügst. Du kannst Mods immer später hinzufügen.',
    mods_en: [
      'When you are ready: start with CJB Cheats Menu (quality of life, not content-changing)',
      'Seasonal decorations via Seasonal Immersion mod for subtle visual variety',
      "Hold off on Stardew Valley Expanded until you've truly finished vanilla — it's better as a second playthrough",
    ],
    mods_zh: [
      '当你准备好时：从 CJB Cheats Menu 开始（生活质量，不改变内容）',
      '通过 Seasonal Immersion 模组进行季节装饰，带来微妙的视觉变化',
      '在你真正完成原版之前先不要用星露谷物语 Expanded——作为第二次游玩更好',
    ],
    mods_zhTW: [
      '當你準備好時：從 CJB Cheats Menu 開始（生活品質改善，不改變內容）',
      '透過 Seasonal Immersion 模組進行季節裝飾，帶來細微的視覺變化',
      '在你真正完成原版之前先別碰星露谷物語 Expanded——作為第二輪遊玩更棒',
    ],
    mods_ja: [
      '準備ができたら：まずCJB Cheats Menuから（快適化系、コンテンツは変更しない）',
      'Seasonal ImmersionでMODで季節ごとの装飾変化を楽しむ',
      'バニラを本当に完全クリアするまでStardew Valley Expandedは待って——2周目に入れる方が断然いい',
    ],
    mods_ko: [
      '준비가 됐을 때: CJB Cheats Menu부터 시작하세요 (편의성 개선, 콘텐츠 변경 없음)',
      'Seasonal Immersion 모드로 계절 장식을 추가해 미묘한 시각적 변화를 즐기세요',
      '바닐라를 진짜 다 끝내기 전까지 Stardew Valley Expanded는 참으세요 — 2회차에 하는 게 훨씬 좋아요',
    ],
    mods_de: [
      'Wenn du bereit bist: Fang mit dem CJB Cheats Menu an (Lebensqualität, keine Inhaltsänderungen)',
      'Saisonale Dekorationen via Seasonal Immersion Mod für subtile visuelle Abwechslung',
      'Halte Stardew Valley Expanded zurück, bis du Vanilla wirklich beendet hast — es ist besser als zweiter Durchgang',
    ],
  },
  'stardew-expanded': {
    title_en: 'Stardew Valley Expanded — The Definitive Second Playthrough',
    title_zh: '星露谷物语 Expanded——终极第二轮游玩',
    title_zhTW: '星露谷物語 Expanded——終極第二輪遊玩',
    title_ja: 'スターデューバレー Expanded——最高の2周目体験',
    title_ko: 'Stardew Valley Expanded — 결정판 두 번째 플레이',
    title_de: 'Stardew Valley Expanded — Der definitive zweite Durchgang',
    emoji: '🗺️',
    tag_en: 'The most downloaded Stardew mod ever — adds 40+ hours of official-feeling content',
    tag_zh: '有史以来下载量最多的星露谷模组——增加 40+ 小时原版感觉的内容',
    tag_zhTW: '有史以來下載量最多的星露谷模組——增加 40+ 小時原版感覺的內容',
    tag_ja: '史上最多ダウンロードのスターデューMOD——公式らしい40時間以上のコンテンツを追加',
    tag_ko: '역대 가장 많이 다운로드된 스타듀 모드 — 공식 같은 40시간 이상의 콘텐츠 추가',
    tag_de: 'Der meistgeladene Stardew-Mod aller Zeiten — fügt 40+ Stunden offiziell wirkenden Inhalt hinzu',
    body_en:
      "Stardew Valley Expanded (SVE) is exactly right for you — it is the most downloaded Stardew Valley mod ever made and the gold standard for post-vanilla content. SVE adds two new maps (Grandpa's Farm and the Forest Farm renovation), 27 new characters with full dialogue and heart events, a new town with shops, entirely new areas to explore, new fish, crops, artisan goods, seasonal events, and a substantial story. The content is so well-integrated that many players describe it as 'the version ConcernedApe would have made if the team was larger.' You need SMAPI (the Stardew modding API) to install it — installation takes about 20-30 minutes following the Nexus Mods guide, and it runs stably on all platforms. Start a fresh save when installing SVE for the best experience.",
    body_zh:
      '星露谷物语 Expanded（SVE）对你来说正好——它是有史以来下载量最多的星露谷物语模组，也是原版后内容的黄金标准。SVE 增加了两个新地图（祖父的农场和森林农场翻新）、27 个有完整对话和心事件的新角色、一个有商店的新小镇、全新的探索区域、新鱼、新作物、手工艺品、季节性活动，以及大量故事内容。内容整合得如此完善，以至于许多玩家将其描述为"如果 ConcernedApe 团队更大会制作的版本"。你需要 SMAPI（星露谷物语模组 API）来安装它——按照 Nexus Mods 指南安装大约需要 20-30 分钟，在所有平台上都能稳定运行。安装 SVE 时从新存档开始以获得最佳体验。',
    body_zhTW:
      '星露谷物語 Expanded（SVE）對你來說正好——它是有史以來下載量最多的星露谷物語模組，也是原版後內容的黃金標準。SVE 新增了兩張新地圖（祖父的農場和森林農場翻新）、27 個有完整對話和心事件的新角色、一個有商店的新小鎮、全新的探索區域、新魚、新作物、手工藝品、季節性活動，以及大量故事內容。內容整合得如此完善，以至於許多玩家將其描述為「如果 ConcernedApe 團隊更大會製作的版本」。你需要 SMAPI（星露谷物語模組 API）來安裝它——按照 Nexus Mods 指南安裝大約需要 20-30 分鐘，在所有平台上都能穩定運行。安裝 SVE 時從新存檔開始以獲得最佳體驗。',
    body_ja:
      'スターデューバレー Expanded（SVE）はあなたにぴったりです——史上最多ダウンロードのスターデューMODで、バニラクリア後のコンテンツの最高峰です。SVEは新マップ2つ（おじいさんの農場とフォレスト農場のリノベーション）、完全な会話とハートイベントを持つ新キャラクター27人、新しいショップのある町、まったく新しい探索エリア、新しい魚・作物・職人品・季節イベント、そして読み応えのあるストーリーを追加します。コンテンツの完成度が高すぎて「ConcernedApeにもっと大きなチームがいたら作っていたバージョン」と表現するプレイヤーも多いほど。インストールにはSMAPI（スターデューMODのAPI）が必要で、Nexus Modsのガイドに従えば20〜30分で完了します。SVEを入れる時は新しいセーブデータから始めるのがベストです。',
    body_ko:
      'Stardew Valley Expanded(SVE)가 딱 맞는 선택입니다 — 역대 가장 많이 다운로드된 스타듀 밸리 모드이자 바닐라 이후 콘텐츠의 황금 표준입니다. SVE는 새로운 지도 2개(할아버지 농장과 숲 농장 리노베이션), 완전한 대화와 하트 이벤트를 가진 새 캐릭터 27명, 상점이 있는 새 마을, 탐험할 완전히 새로운 지역, 새로운 물고기, 작물, 장인 상품, 계절 이벤트, 그리고 풍부한 스토리를 추가합니다. 콘텐츠 완성도가 너무 높아서 많은 플레이어들이 "ConcernedApe 팀이 더 컸다면 만들었을 버전"이라고 표현합니다. 설치하려면 SMAPI(스타듀 모딩 API)가 필요한데, Nexus Mods 가이드를 따르면 20-30분 정도 걸리고 모든 플랫폼에서 안정적으로 실행됩니다. SVE 설치 시 새 저장 파일로 시작하는 게 최고의 경험을 줍니다.',
    body_de:
      'Stardew Valley Expanded (SVE) ist genau das Richtige für dich — es ist der meistgeladene Stardew Valley Mod aller Zeiten und der Goldstandard für Post-Vanilla-Inhalte. SVE fügt zwei neue Karten hinzu (Opas Farm und die Waldfarmen-Renovierung), 27 neue Charaktere mit vollständigen Dialogen und Herzereignissen, eine neue Stadt mit Läden, völlig neue Gebiete zum Erkunden, neue Fische, Pflanzen, handwerkliche Waren, Saisonevents und eine umfangreiche Geschichte. Der Inhalt ist so gut integriert, dass viele Spieler ihn als "die Version beschreiben, die ConcernedApe gemacht hätte, wenn das Team größer gewesen wäre." Du brauchst SMAPI (die Stardew-Modding-API) zur Installation — die Installation dauert etwa 20-30 Minuten und läuft auf allen Plattformen stabil. Starte einen neuen Speicherstand, wenn du SVE installierst.',
    mods_en: [
      'Required: SMAPI from smapi.io — the mod loader that makes everything work',
      'Get SVE from NexusMods.com — read the compatibility notes for the current version',
      'Pair with: Ridgeside Village (adds another new area), East Scarp (another new map) — all three together are the most popular SVE-adjacent mods',
    ],
    mods_zh: [
      '必需：来自 smapi.io 的 SMAPI——让一切正常运行的模组加载器',
      '从 NexusMods.com 获取 SVE——阅读当前版本的兼容性说明',
      '搭配：Ridgeside Village（增加另一个新区域）、East Scarp（另一个新地图）——三者合用是最流行的 SVE 相关模组组合',
    ],
    mods_zhTW: [
      '必需：來自 smapi.io 的 SMAPI——讓一切正常運行的模組載入器',
      '從 NexusMods.com 取得 SVE——閱讀當前版本的相容性說明',
      '搭配：Ridgeside Village（新增另一個新區域）、East Scarp（另一張新地圖）——三者合用是最受歡迎的 SVE 相關模組組合',
    ],
    mods_ja: [
      '必須：smapi.ioからSMAPIを導入——すべての基盤となるMODローダー',
      'NexusMods.comからSVEを入手——現在のバージョンの互換性メモを必ず読む',
      'セットで入れるなら：Ridgeside Village（新エリア追加）、East Scarp（新マップ追加）——この3つが最も人気のSVE関連MOD構成',
    ],
    mods_ko: [
      '필수: smapi.io에서 SMAPI 설치 — 모든 것을 작동시키는 모드 로더',
      'NexusMods.com에서 SVE 다운로드 — 현재 버전의 호환성 노트 꼭 읽기',
      '함께 쓰면 좋은 것: Ridgeside Village(새 지역 추가), East Scarp(새 지도 추가) — 이 세 가지를 같이 쓰는 게 가장 인기 있는 SVE 조합',
    ],
    mods_de: [
      'Erforderlich: SMAPI von smapi.io — der Mod-Loader, der alles zum Laufen bringt',
      'SVE von NexusMods.com herunterladen — Kompatibilitätshinweise für die aktuelle Version lesen',
      'Kombiniere mit: Ridgeside Village (fügt ein weiteres neues Gebiet hinzu), East Scarp (eine weitere neue Karte) — alle drei zusammen sind die beliebtesten SVE-Mods',
    ],
  },
  'visual-mods': {
    title_en: 'Visual / Cosmetic Mods — Fresh Look, Same Soul',
    title_zh: '视觉 / 外观模组——焕然一新，原味不变',
    title_zhTW: '視覺 / 外觀模組——煥然一新，原味不變',
    title_ja: 'ビジュアル／見た目MOD——新しい見た目、変わらない魂',
    title_ko: '비주얼 / 외형 모드 — 새로운 모습, 같은 영혼',
    title_de: 'Visuelle / Kosmetische Mods — Frischer Look, gleiche Seele',
    emoji: '🎨',
    tag_en: 'Upgrade the aesthetics without touching the gameplay',
    tag_zh: '升级美观度，不碰游戏玩法',
    tag_zhTW: '升級美觀度，不碰遊戲玩法',
    tag_ja: 'ゲームプレイに触れずにビジュアルをアップグレード',
    tag_ko: '게임플레이는 건드리지 않고 미적 요소만 업그레이드',
    tag_de: 'Ästhetik aufwerten ohne das Gameplay anzufassen',
    body_en:
      "Visual and cosmetic mods are the perfect fit for you — they transform how Stardew Valley looks without touching the systems you already love. The most popular visual mods include: Vintage Interface 2 (replaces the UI with a more polished, vintage-inspired look), Elle's New Chickens/Cows (higher-resolution farm animals), Lumisteria's Tilesheets (much higher quality terrain textures), DaisyNiko's Earthy Recolour (a soft, natural color palette that makes the whole world feel more grounded), and Seasonal Immersion (adds seasonal variation to the world tiles so each season has more visual variety). Most visual mods do NOT require SMAPI — they are simple texture replacements you drop into the game's content folder. Installation is as simple as unzipping a file.",
    body_zh:
      '视觉和外观模组对你来说非常合适——它们改变了星露谷物语的外观，而不影响你已经喜爱的系统。最受欢迎的视觉模组包括：Vintage Interface 2（用更精致、受复古风格启发的外观替换 UI）、Elle 的新鸡/牛（更高分辨率的农场动物）、Lumisteria 的瓷砖（质量更高的地形纹理）、DaisyNiko 的大地色系重绘（柔和的自然色调，让整个世界感觉更踏实），以及 Seasonal Immersion（为世界瓷砖增加季节变化，使每个季节有更多视觉变化）。大多数视觉模组不需要 SMAPI——它们是简单的纹理替换，你只需放入游戏的内容文件夹。安装就像解压文件一样简单。',
    body_zhTW:
      '視覺和外觀模組對你來說非常合適——它們改變了星露谷物語的外觀，而不影響你已經喜愛的系統。最受歡迎的視覺模組包括：Vintage Interface 2（用更精緻、受復古風格啟發的外觀替換 UI）、Elle 的新雞/牛（更高解析度的農場動物）、Lumisteria 的磚塊材質包（質量更高的地形紋理）、DaisyNiko 的大地色系重繪（柔和的自然色調，讓整個世界感覺更踏實），以及 Seasonal Immersion（為世界磚塊增加季節變化，使每個季節有更多視覺變化）。大多數視覺模組不需要 SMAPI——它們是簡單的材質替換，只需放入遊戲的內容資料夾即可。安裝就像解壓縮檔案一樣簡單。',
    body_ja:
      'ビジュアル・見た目系MODはあなたにぴったりです——スターデューバレーの外見を変えながら、大好きなゲームシステムはそのままにしてくれます。人気のビジュアルMODには：Vintage Interface 2（UIをよりセンスのあるヴィンテージ風に刷新）、Elleの新しいニワトリ/ウシ（高解像度の農場動物）、LumisteriaのTilesheets（格段にクオリティの高い地形テクスチャ）、DaisyNikoのEarthy Recolour（柔らかく自然な色調で世界全体をより落ち着いた雰囲気に）、Seasonal Immersion（季節ごとにワールドのタイルが変化し、視覚的バリエーションが増える）などがあります。ほとんどのビジュアルMODはSMAPIが不要——ゲームのコンテンツフォルダに放り込むだけのテクスチャ差し替えです。インストールはファイルを解凍するだけの簡単さです。',
    body_ko:
      '비주얼 및 외형 모드가 당신에게 딱 맞습니다 — 이미 좋아하는 시스템은 건드리지 않으면서 스타듀 밸리의 외형을 바꿔줍니다. 가장 인기 있는 비주얼 모드로는: Vintage Interface 2(UI를 더 세련된 빈티지 스타일로 교체), Elle의 새로운 닭/소(고해상도 농장 동물), Lumisteria의 Tilesheets(훨씬 높은 품질의 지형 텍스처), DaisyNiko의 Earthy Recolour(부드럽고 자연스러운 색상 팔레트로 세계 전체를 더 차분하게), Seasonal Immersion(계절마다 세계 타일이 변해 각 계절이 더 다양한 시각적 변화를 가짐) 등이 있습니다. 대부분의 비주얼 모드는 SMAPI가 필요 없습니다 — 게임의 콘텐츠 폴더에 넣기만 하면 되는 간단한 텍스처 교체입니다. 설치는 파일을 압축 해제하는 것만큼 간단합니다.',
    body_de:
      'Visuelle und kosmetische Mods passen perfekt zu dir — sie verändern das Aussehen von Stardew Valley, ohne die Systeme zu berühren, die du bereits liebst. Die beliebtesten visuellen Mods sind: Vintage Interface 2 (ersetzt die Benutzeroberfläche durch einen polierten, vintage-inspirierten Look), Elles neue Hühner/Kühe (Farmtiere in höherer Auflösung), Lusteria\'s Tilesheets (deutlich hochwertigere Geländetexturen), DaisyNikos Earthy Recolour (eine sanfte, natürliche Farbpalette, die die Welt geerdet wirken lässt) und Seasonal Immersion (fügt saisonale Variation zu den Weltkacheln hinzu). Die meisten visuellen Mods benötigen KEIN SMAPI — sie sind einfache Texturersetzungen, die du in den Inhaltsordner des Spiels legst. Die Installation ist so einfach wie das Entpacken einer Datei.',
    mods_en: [
      "Start with DaisyNiko's Earthy Recolour — it's the most universally loved visual overhaul and needs no SMAPI",
      "Add Elle's New Animals for higher-res farm animals — also no SMAPI required",
      'Search NexusMods for "Stardew Valley" + "no SMAPI" to find all texture mods that work without extra tools',
    ],
    mods_zh: [
      "从 DaisyNiko 的大地色系重绘开始——它是最被广泛喜爱的视觉改造，不需要 SMAPI",
      "添加 Elle 的新动物以获得更高分辨率的农场动物——也不需要 SMAPI",
      '在 NexusMods 上搜索"Stardew Valley" + "no SMAPI"，找到所有无需额外工具的纹理模组',
    ],
    mods_zhTW: [
      "從 DaisyNiko 的大地色系重繪開始——它是最廣受喜愛的視覺改造，不需要 SMAPI",
      "新增 Elle 的新動物以獲得更高解析度的農場動物——也不需要 SMAPI",
      '在 NexusMods 上搜尋「Stardew Valley」+「no SMAPI」，找到所有不需要額外工具的材質模組',
    ],
    mods_ja: [
      "まずDaisyNikoのEarthy Recolourから——最も支持されているビジュアル改造でSMAPI不要",
      "ElleのNew Animalsで高解像度の農場動物に——こちらもSMAPI不要",
      'NexusModsで「Stardew Valley」+「no SMAPI」と検索して、追加ツール不要のテクスチャMODを探してみよう',
    ],
    mods_ko: [
      "DaisyNiko의 Earthy Recolour부터 시작하세요 — 가장 널리 사랑받는 비주얼 오버홀이고 SMAPI 불필요",
      "Elle의 New Animals로 고해상도 농장 동물 추가 — 역시 SMAPI 불필요",
      'NexusMods에서 "Stardew Valley" + "no SMAPI"로 검색해서 추가 도구 없이 작동하는 텍스처 모드를 찾아보세요',
    ],
    mods_de: [
      "Fang mit DaisyNikos Earthy Recolour an — der am universellsten geliebte visuelle Umbau, kein SMAPI nötig",
      "Füge Elles New Animals für Farmtiere in höherer Auflösung hinzu — ebenfalls kein SMAPI erforderlich",
      'Suche auf NexusMods nach „Stardew Valley" + „no SMAPI", um alle Textur-Mods zu finden, die ohne Extra-Tools funktionieren',
    ],
  },
  'full-modded': {
    title_en: 'Full Mod Stack — Build Your Custom Stardew',
    title_zh: '完整模组栈——打造你的定制版星露谷',
    title_zhTW: '完整模組組合——打造你的客製版星露谷',
    title_ja: 'フルMOD構成——自分だけのスターデューを作ろう',
    title_ko: '풀 모드 스택 — 나만의 커스텀 스타듀 만들기',
    title_de: 'Voller Mod-Stack — Baue dein eigenes Stardew',
    emoji: '🔧',
    tag_en: 'You are ready for SVE + Ridgeside + East Scarp + content mods — the full experience',
    tag_zh: '你已准备好迎接 SVE + Ridgeside + East Scarp + 内容模组——完整体验',
    tag_zhTW: '你已準備好迎接 SVE + Ridgeside + East Scarp + 內容模組——完整體驗',
    tag_ja: 'SVE + Ridgeside + East Scarp + コンテンツMODを全部入れる準備ができています',
    tag_ko: 'SVE + Ridgeside + East Scarp + 콘텐츠 모드 — 완전한 경험을 즐길 준비가 됐어요',
    tag_de: 'Du bist bereit für SVE + Ridgeside + East Scarp + Content-Mods — die volle Erfahrung',
    body_en:
      "You are ready for the full modded Stardew Valley experience — the so-called 'expanded universe' that veteran players build over multiple playthroughs. The core stack most players recommend: Stardew Valley Expanded (the essential base), Ridgeside Village (adds the Ridgeside area and 12+ new characters), East Scarp (adds another area with lore connection to SVE), More New Fish (adds 100+ new fish species), Stardew Aquarium (upgrades the Fish Tank bundle), and a Content Patcher pack of your choice for visual updates. For challenge, add Challenging Community Center Bundles or SVE's harder mine floors. Install everything through the SMAPI framework using Nexus Mods, and use the Mod Manager for compatibility checking. Budget 1-2 hours for initial setup; the payoff is a game that can absorb another 200+ hours.",
    body_zh:
      '你已准备好完整的模组化星露谷物语体验——老玩家在多次游玩中建立的所谓"扩展宇宙"。大多数玩家推荐的核心组合：星露谷物语 Expanded（必备基础）、Ridgeside Village（增加 Ridgeside 区域和 12+ 新角色）、East Scarp（增加另一个与 SVE 有剧情联系的区域）、More New Fish（增加 100+ 新鱼种）、Stardew Aquarium（升级水族箱捆绑包），以及你选择的 Content Patcher 视觉更新包。如需增加挑战，添加 Challenging Community Center Bundles 或 SVE 的更难矿洞层。通过 Nexus Mods 使用 SMAPI 框架安装所有内容，并使用模组管理器检查兼容性。初始设置预计需要 1-2 小时；回报是一款可以再吸收 200+ 小时的游戏。',
    body_zhTW:
      '你已準備好完整的模組化星露谷物語體驗——老玩家在多次遊玩中建立的所謂「擴展宇宙」。大多數玩家推薦的核心組合：星露谷物語 Expanded（必備基礎）、Ridgeside Village（增加 Ridgeside 區域和 12+ 新角色）、East Scarp（增加另一個與 SVE 有劇情聯繫的區域）、More New Fish（增加 100+ 新魚種）、Stardew Aquarium（升級水族箱捆綁包），以及你選擇的 Content Patcher 視覺更新包。如需增加挑戰，添加 Challenging Community Center Bundles 或 SVE 的更難礦洞層。透過 Nexus Mods 使用 SMAPI 框架安裝所有內容，並使用模組管理器檢查相容性。初始設定預計需要 1-2 小時；回報是一款可以再沉浸 200+ 小時的遊戲。',
    body_ja:
      'あなたはフルMOD構成のスターデューバレーを楽しむ準備ができています——ベテランプレイヤーが何周もかけて構築してきた、いわば「拡張宇宙」です。多くのプレイヤーが推薦するコアMOD構成：Stardew Valley Expanded（必須の土台）、Ridgeside Village（Ridgeside地区と12人以上の新キャラ追加）、East Scarp（SVEと世界観でつながる別エリア追加）、More New Fish（100種以上の新しい魚を追加）、Stardew Aquarium（水族館バンドルをアップグレード）、そしてお好みのContent Patcherパックでビジュアルも刷新。難易度を上げたいなら、Challenging Community Center BundlesやSVEの難しい鉱山フロアを追加。すべてNexus ModsのSMAPIフレームワーク経由でインストールし、Mod Managerで互換性を確認。初期セットアップに1〜2時間かかりますが、見返りはさらに200時間以上楽しめるゲームです。',
    body_ko:
      '완전한 모드화 스타듀 밸리 경험을 즐길 준비가 됐습니다 — 베테랑 플레이어들이 여러 회차에 걸쳐 구축해온 이른바 "확장 우주"입니다. 대부분의 플레이어들이 추천하는 핵심 구성: Stardew Valley Expanded(필수 기반), Ridgeside Village(Ridgeside 지역과 12명 이상의 새 캐릭터 추가), East Scarp(SVE와 스토리 연결이 있는 또 다른 지역 추가), More New Fish(100종 이상의 새로운 물고기 추가), Stardew Aquarium(어항 번들 업그레이드), 그리고 원하는 Content Patcher 팩으로 비주얼 업데이트. 도전을 원한다면 Challenging Community Center Bundles나 SVE의 더 어려운 광산 층을 추가하세요. Nexus Mods를 통해 SMAPI 프레임워크로 모두 설치하고, Mod Manager로 호환성을 확인하세요. 초기 설정에 1-2시간이 필요하지만, 보상은 200시간 이상 더 즐길 수 있는 게임입니다.',
    body_de:
      'Du bist bereit für das vollständig modifizierte Stardew Valley-Erlebnis — das sogenannte "erweiterte Universum", das erfahrene Spieler über mehrere Durchgänge aufbauen. Der Kern-Stack, den die meisten Spieler empfehlen: Stardew Valley Expanded (die unverzichtbare Basis), Ridgeside Village (fügt das Ridgeside-Gebiet und 12+ neue Charaktere hinzu), East Scarp (fügt ein weiteres Gebiet mit Lore-Verbindung zu SVE hinzu), More New Fish (fügt 100+ neue Fischarten hinzu), Stardew Aquarium (wertet das Fischbecken-Bündel auf) und ein Content Patcher-Paket deiner Wahl für visuelle Updates. Für mehr Herausforderung: Challenging Community Center Bundles oder SVEs schwierigere Mienenetagen. Installiere alles über das SMAPI-Framework mit Nexus Mods und nutze den Mod Manager zur Kompatibilitätsprüfung. Plane 1-2 Stunden für die Ersteinrichtung; der Lohn ist ein Spiel, das weitere 200+ Stunden aufnehmen kann.',
    mods_en: [
      "Start with smapi.io — install SMAPI first, then add mods one by one, testing after each",
      "Use Nexus Mods with the 'Vortex' mod manager to handle compatibility and load order automatically",
      'Keep a backup of your save files before major mod installations — the mod community is excellent but saves can occasionally corrupt',
    ],
    mods_zh: [
      '从 smapi.io 开始——先安装 SMAPI，然后逐一添加模组，每次添加后进行测试',
      '使用带 Vortex 模组管理器的 Nexus Mods 自动处理兼容性和加载顺序',
      '在主要模组安装前备份你的存档文件——模组社区非常出色，但存档偶尔可能损坏',
    ],
    mods_zhTW: [
      '從 smapi.io 開始——先安裝 SMAPI，然後逐一新增模組，每次新增後進行測試',
      '使用帶 Vortex 模組管理器的 Nexus Mods 自動處理相容性和載入順序',
      '在主要模組安裝前備份你的存檔文件——模組社群非常出色，但存檔偶爾可能損壞',
    ],
    mods_ja: [
      'まずsmapi.ioから——SMAPIを先にインストールし、その後MODを一つずつ追加してその都度テスト',
      'Nexus ModsをVortexモードマネージャーと組み合わせて、互換性とロード順を自動管理',
      '大規模なMOD追加前にはセーブデータのバックアップを——MODコミュニティは素晴らしいが、稀にセーブが壊れることがある',
    ],
    mods_ko: [
      'smapi.io에서 시작 — SMAPI를 먼저 설치하고, 그 다음 모드를 하나씩 추가하면서 매번 테스트',
      'Nexus Mods에서 Vortex 모드 매니저를 사용해 호환성과 로드 순서를 자동으로 관리',
      '주요 모드 설치 전에 저장 파일 백업 — 모드 커뮤니티는 훌륭하지만 저장 파일이 가끔 손상될 수 있어요',
    ],
    mods_de: [
      'Fang mit smapi.io an — installiere zuerst SMAPI, dann füge Mods einzeln hinzu und teste nach jedem',
      "Nutze Nexus Mods mit dem 'Vortex' Mod Manager, um Kompatibilität und Ladereihenfolge automatisch zu verwalten",
      'Sichere deine Speicherdateien vor größeren Mod-Installationen — die Mod-Community ist hervorragend, aber Speicherstände können gelegentlich beschädigt werden',
    ],
  },
}

function calcResult(answers: Pick[]): Pick {
  const counts: Record<Pick, number> = {
    'pure-vanilla': 0,
    'stardew-expanded': 0,
    'visual-mods': 0,
    'full-modded': 0,
  }
  for (const a of answers) counts[a]++
  return Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0] as Pick
}

export function StardewModsQuiz({ locale }: { locale: string }) {
  const getLoc = (zh: string, en: string, zhTW?: string, ja?: string, ko?: string, de?: string): string => {
    if (locale === 'zh') return zh
    if (locale === 'zh-TW') return zhTW ?? zh
    if (locale === 'ja') return ja ?? en
    if (locale === 'ko') return ko ?? en
    if (locale === 'de') return de ?? en
    return en
  }
  const isZh = locale === 'zh' || locale === 'zh-TW'
  const [answers, setAnswers] = useState<(Pick | null)[]>(Array(QUESTIONS.length).fill(null))
  const [submitted, setSubmitted] = useState(false)

  const allAnswered = answers.every((a) => a !== null)

  if (submitted) {
    const result = RESULTS[calcResult(answers as Pick[])]
    const url = `${BASE_URL}/${locale}/quizzes/stardew-mods-quiz`
    const shareText = getLoc(
      `对于星露谷物语模组，我的建议是「${result.title_zh}」！找到你的：${url}`,
      `My Stardew Valley mod recommendation: ${result.title_en}! Find yours: ${url}`,
      `對於星露谷物語模組，我的建議是「${result.title_zhTW}」！找到你的：${url}`,
      `スターデューバレーMODのおすすめ結果：「${result.title_ja}」！あなたも試してみて：${url}`,
      `나의 스타듀 밸리 모드 추천 결과: 「${result.title_ko}」! 당신도 확인해보세요: ${url}`,
      `Meine Stardew Valley Mod-Empfehlung: ${result.title_de}! Finde deine: ${url}`,
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
        </div>

        <p className="mb-5 text-sm leading-relaxed text-[#8a9a7a]">
          {getLoc(result.body_zh, result.body_en, result.body_zhTW, result.body_ja, result.body_ko, result.body_de)}
        </p>

        <div className="mb-5 rounded-xl border border-[#2d3d2d] bg-[#0f1a0f] p-4">
          <h3 className="mb-3 text-sm font-semibold text-[#e8dcc8]">
            {getLoc('具体建议', 'Your action items', '具體建議', '具体的なアドバイス', '구체적인 추천', 'Deine Schritte')}
          </h3>
          <ul className="space-y-2">
            {getLoc(
              result.mods_zh.join('|||'),
              result.mods_en.join('|||'),
              result.mods_zhTW.join('|||'),
              result.mods_ja.join('|||'),
              result.mods_ko.join('|||'),
              result.mods_de.join('|||'),
            ).split('|||').map((tip, i) => (
              <li key={i} className="flex gap-2 text-sm text-[#8a9a7a]">
                <span className="shrink-0 text-[#f0a832]">{i + 1}.</span>
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mb-4 rounded-xl border border-[#2d3d2d] bg-[#0f1a0f] p-4">
          <p className="text-center text-sm text-[#8a9a7a]">
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

        <div className="flex flex-col gap-3 sm:flex-row">
          <ShareButton text={shareText} locale={locale} />
          <button
            onClick={() => { setAnswers(Array(QUESTIONS.length).fill(null)); setSubmitted(false) }}
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
            '你应该给星露谷物语装模组吗？装哪些？',
            'Should You Play Stardew Valley with Mods? Which Ones?',
            '你應該給星露谷物語裝模組嗎？裝哪些？',
            'スターデューバレーにMODを入れるべき？入れるなら何を？',
            '스타듀 밸리에 모드를 넣어야 할까요? 어떤 걸로?',
            'Solltest du Stardew Valley mit Mods spielen? Welche?',
          )}
        </h1>
        <p className="text-sm text-[#8a9a7a]">
          {getLoc(
            '6 个问题，根据你的游玩进度和需求，找到正确的模组策略——从原版到完整模组栈',
            '6 questions to find the right mod approach for where you are — from pure vanilla to full mod stack',
            '6 個問題，根據你的遊玩進度和需求，找到正確的模組策略——從原版到完整模組組合',
            '6つの質問で、あなたの状況に合ったMOD戦略を見つけよう——バニラから完全MOD構成まで',
            '6가지 질문으로 지금 상황에 맞는 모드 전략 찾기 — 순수 바닐라부터 풀 모드 스택까지',
            '6 Fragen, um den richtigen Mod-Ansatz für dich zu finden — von reinem Vanilla bis zum vollen Mod-Stack',
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
        {getLoc(
          '找到我的模组策略',
          'Find My Mod Strategy',
          '找到我的模組策略',
          '自分のMOD戦略を見つける',
          '나의 모드 전략 찾기',
          'Meine Mod-Strategie finden',
        )}
      </button>
    </div>
  )
}
