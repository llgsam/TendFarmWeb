'use client'

import { useState } from 'react'
import { BASE_URL } from '@/lib/config'

type Pick = 'botany-manor' | 'rustys-retirement' | 'fields-of-mistria' | 'dungeons-of-hinterberg'

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
    q_en: 'How long do you want your cozy game to be?',
    q_zh: '你希望你的 Cozy 游戏持续多久？',
    q_zhTW: '你希望你的 Cozy 遊戲持續多久？',
    q_ja: 'コージーゲームはどのくらいの長さを楽しみたいですか？',
    q_ko: '코지 게임을 얼마나 오래 즐기고 싶으신가요？',
    q_de: 'Wie lange soll dein Cozy Game sein?',
    options: [
      {
        en: 'A complete, satisfying experience in 3-5 hours — I want a beginning and an ending',
        zh: '3-5 小时内完整、令人满足的体验——我想要有开始和结局',
        zhTW: '3-5 小時內完整、令人滿足的體驗——我想要有開始和結局',
        ja: '3〜5時間で完結する体験——ちゃんとした始まりと終わりが欲しい',
        ko: '3~5시간 안에 완결되는 만족스러운 경험 — 시작과 끝이 있는 게임이 좋아요',
        de: 'Ein vollständiges, befriedigendes Erlebnis in 3-5 Stunden — ich will einen Anfang und ein Ende',
        type: 'botany-manor',
      },
      {
        en: 'Endless and ambient — I want something I can run in the background forever',
        zh: '无止境且环境感强——我想要可以永远在后台运行的东西',
        zhTW: '無止境且環境感強——我想要可以永遠在後台運行的東西',
        ja: 'エンドレスで環境音楽的な感じ——バックグラウンドでずっと動かしておけるものがいい',
        ko: '끝없이 배경처럼 흘러가는 게임 — 계속 백그라운드에서 실행할 수 있으면 좋겠어요',
        de: 'Endlos und ambient — ich will etwas, das im Hintergrund einfach weiterläuft',
        type: 'rustys-retirement',
      },
      {
        en: 'Hundreds of hours — I want a deep world to live in across weeks and seasons',
        zh: '数百小时——我想要一个可以跨越数周和季节生活其中的深度世界',
        zhTW: '數百小時——我想要一個可以跨越數週和季節生活其中的深度世界',
        ja: '何百時間も——何週間も、季節をまたいで生きられる深いワールドが欲しい',
        ko: '수백 시간 — 몇 주, 몇 계절에 걸쳐 살아갈 수 있는 깊은 세계가 좋아요',
        de: 'Hunderte von Stunden — ich will eine tiefe Welt, in der ich über Wochen und Jahreszeiten leben kann',
        type: 'fields-of-mistria',
      },
      {
        en: '30-50 hours — a complete story arc with meaningful progression and an actual ending',
        zh: '30-50 小时——有意义进度和真正结局的完整故事弧线',
        zhTW: '30-50 小時——有意義進度和真正結局的完整故事弧線',
        ja: '30〜50時間——意味のある進行と本物のエンディングがある完結したストーリー',
        ko: '30~50시간 — 의미 있는 진행과 진짜 엔딩이 있는 완성된 스토리',
        de: '30-50 Stunden — ein vollständiger Storybogen mit bedeutungsvollem Fortschritt und einem echten Ende',
        type: 'dungeons-of-hinterberg',
      },
    ],
  },
  {
    q_en: 'How do you feel about combat in a cozy game?',
    q_zh: '你对 Cozy 游戏中的战斗有何看法？',
    q_zhTW: '你對 Cozy 遊戲中的戰鬥有何看法？',
    q_ja: 'コージーゲームの戦闘について、どう思いますか？',
    q_ko: '코지 게임에서 전투에 대해 어떻게 생각하세요？',
    q_de: 'Wie stehst du zu Kämpfen in einem Cozy Game?',
    options: [
      {
        en: 'I want zero combat — the challenge should be entirely puzzle and observation',
        zh: '我想要零战斗——挑战应该完全是谜题和观察',
        zhTW: '我想要零戰鬥——挑戰應該完全是謎題和觀察',
        ja: '戦闘はゼロがいい——謎解きと観察だけで充分',
        ko: '전투는 전혀 없으면 좋겠어요 — 도전은 퍼즐과 관찰로만 이루어져야 해요',
        de: 'Ich will null Kampf — die Herausforderung soll komplett aus Rätseln und Beobachten bestehen',
        type: 'botany-manor',
      },
      {
        en: 'No combat at all — I want the game to run by itself while I do other things',
        zh: '完全没有战斗——我想要游戏在我做其他事情时自行运行',
        zhTW: '完全沒有戰鬥——我想要遊戲在我做其他事情時自行運行',
        ja: '戦闘なし——他のことをしている間、ゲームが勝手に進んでほしい',
        ko: '전투는 전혀 없었으면 해요 — 내가 다른 일을 하는 동안 게임이 알아서 돌아갔으면 좋겠어요',
        de: 'Überhaupt kein Kampf — ich will, dass das Spiel von selbst läuft, während ich andere Dinge tue',
        type: 'rustys-retirement',
      },
      {
        en: 'Light optional combat is fine but the core should be farming and social life',
        zh: '轻度可选战斗可以接受，但核心应该是农耕和社交生活',
        zhTW: '輕度可選戰鬥可以接受，但核心應該是農耕和社交生活',
        ja: '軽めの任意戦闘はOK——でも中心は農業と交流であってほしい',
        ko: '가벼운 선택적 전투는 괜찮아요 — 하지만 핵심은 농사와 사교 생활이어야 해요',
        de: 'Leichter optionaler Kampf ist okay — aber das Herzstück soll Farming und soziales Leben sein',
        type: 'fields-of-mistria',
      },
      {
        en: 'I actually enjoy cozy + action together — Zelda-like combat as part of a relaxing world',
        zh: '我实际上喜欢 cozy + 动作的结合——塞尔达式战斗作为放松世界的一部分',
        zhTW: '我實際上喜歡 cozy + 動作的結合——塞爾達式戰鬥作為放鬆世界的一部分',
        ja: 'コージー＋アクションの組み合わせが好き——リラックスした世界の中でゼルダ風の戦闘',
        ko: '코지 + 액션의 조합을 좋아해요 — 편안한 세계 속의 젤다 스타일 전투',
        de: 'Ich mag tatsächlich Cozy + Action zusammen — Zelda-ähnliche Kämpfe als Teil einer entspannten Welt',
        type: 'dungeons-of-hinterberg',
      },
    ],
  },
  {
    q_en: 'What does your ideal in-game session look like?',
    q_zh: '你理想的游戏内时段是什么样的？',
    q_zhTW: '你理想的遊戲內時段是什麼樣的？',
    q_ja: '理想のゲームセッションってどんな感じですか？',
    q_ko: '이상적인 게임 세션은 어떤 모습인가요？',
    q_de: 'Wie sieht deine ideale Spielsitzung aus?',
    options: [
      {
        en: 'Quiet experimentation: trying different conditions to make a flower bloom the way it wants',
        zh: '安静的实验：尝试不同的条件让花朵以它想要的方式绽放',
        zhTW: '安靜的實驗：嘗試不同的條件讓花朵以它想要的方式綻放',
        ja: '静かな実験——花が咲くための条件をあれこれ試す',
        ko: '조용한 실험: 꽃이 원하는 방식으로 피어나도록 다양한 조건을 시도해보기',
        de: 'Stille Experimente: verschiedene Bedingungen ausprobieren, damit eine Blume so blüht, wie sie es will',
        type: 'botany-manor',
      },
      {
        en: 'Glancing at the game every 5-10 minutes between tasks while something else is open on my screen',
        zh: '在做其他事情时，每 5-10 分钟瞄一眼游戏，同时屏幕上还开着其他东西',
        zhTW: '在做其他事情時，每 5-10 分鐘瞄一眼遊戲，同時螢幕上還開著其他東西',
        ja: '他の作業をしながら5〜10分おきにちらっと確認——画面には別のウィンドウも開いてる',
        ko: '다른 일을 하다가 5~10분마다 게임을 흘끗 보기 — 화면에 다른 것도 열려 있어요',
        de: 'Gelegentlich alle 5-10 Minuten schauen, während auf dem Bildschirm noch andere Fenster offen sind',
        type: 'rustys-retirement',
      },
      {
        en: 'A full farm day: planting, talking to NPCs, exploring a dungeon, decorating, sleeping',
        zh: '完整的农场一天：种植、与 NPC 交谈、探索地下城、装饰、入睡',
        zhTW: '完整的農場一天：種植、與 NPC 交談、探索地下城、裝飾、入睡',
        ja: '農場の1日をフルで——植えて、NPCと話して、ダンジョン探索して、デコして、寝る',
        ko: '농장의 하루 전체: 심기, NPC와 대화, 던전 탐험, 꾸미기, 잠들기',
        de: 'Ein ganzer Farmtag: Pflanzen, mit NPCs reden, einen Dungeon erkunden, dekorieren, schlafen gehen',
        type: 'fields-of-mistria',
      },
      {
        en: 'Exploring a new puzzle dungeon in the Alps, solving its gimmick, then chatting with townspeople',
        zh: '在阿尔卑斯山探索一个新的谜题地下城，解决它的关键机制，然后与镇民交谈',
        zhTW: '在阿爾卑斯山探索一個新的謎題地下城，解決它的關鍵機制，然後與鎮民交談',
        ja: 'アルプスで新しいパズルダンジョンを探索して、その仕掛けを解いて、町の人と話す',
        ko: '알프스에서 새 퍼즐 던전을 탐험하고, 그 메커니즘을 해결한 다음 마을 사람들과 대화하기',
        de: 'Einen neuen Rätsel-Dungeon in den Alpen erkunden, sein Gimmick lösen, dann mit den Dorfbewohnern quatschen',
        type: 'dungeons-of-hinterberg',
      },
    ],
  },
  {
    q_en: 'How novel do you want the game concept to be?',
    q_zh: '你希望游戏概念有多新颖？',
    q_zhTW: '你希望遊戲概念有多新穎？',
    q_ja: 'ゲームのコンセプトはどのくらい斬新であってほしいですか？',
    q_ko: '게임 컨셉이 얼마나 참신했으면 하나요？',
    q_de: 'Wie originell soll das Spielkonzept sein?',
    options: [
      {
        en: 'Entirely original premise — I want something I have never seen before in any genre',
        zh: '完全原创的前提——我想要一个我从未在任何类型中见过的东西',
        zhTW: '完全原創的前提——我想要一個我從未在任何類型中見過的東西',
        ja: '完全に独創的な設定——どのジャンルでも見たことないものがいい',
        ko: '완전히 독창적인 설정 — 어떤 장르에서도 본 적 없는 것을 원해요',
        de: 'Völlig originelle Prämisse — ich will etwas, das ich in keinem Genre je gesehen habe',
        type: 'botany-manor',
      },
      {
        en: 'Wildly novel format — the idea itself should be clever and surprising',
        zh: '极为新颖的格式——概念本身应该聪明且出人意料',
        zhTW: '極為新穎的格式——概念本身應該聰明且出人意料',
        ja: '超斬新なフォーマット——アイデア自体が賢くて驚きがあってほしい',
        ko: '매우 참신한 형식 — 아이디어 자체가 영리하고 놀라워야 해요',
        de: 'Völlig neuartiges Format — die Idee selbst soll clever und überraschend sein',
        type: 'rustys-retirement',
      },
      {
        en: 'Familiar with polish — I love the Stardew formula and want more of it, done beautifully',
        zh: '熟悉但精致——我喜欢星露谷公式，想要更多同类，但做得更精美',
        zhTW: '熟悉但精緻——我喜歡星露谷公式，想要更多同類，但做得更精美',
        ja: 'おなじみの公式をより洗練させたもの——スターデューバレーの公式が好きで、より美しいものが欲しい',
        ko: '익숙하지만 세련된 — 스타듀 밸리 공식을 좋아하는데 더 아름답게 만든 버전을 원해요',
        de: 'Vertraut aber poliert — ich liebe die Stardew-Formel und will mehr davon, aber wunderschön umgesetzt',
        type: 'fields-of-mistria',
      },
      {
        en: 'Genre-blend I have not tried — cozy world + action RPG is a combination I am curious about',
        zh: '我未尝试过的类型混合——cozy 世界 + 动作 RPG 是我好奇的组合',
        zhTW: '我未嘗試過的類型混合——cozy 世界 + 動作 RPG 是我好奇的組合',
        ja: 'まだ試したことのないジャンルミックス——コージーな世界＋アクションRPGの組み合わせが気になる',
        ko: '아직 시도해보지 않은 장르 혼합 — 코지 세계 + 액션 RPG 조합이 궁금해요',
        de: 'Genre-Mix, den ich noch nicht ausprobiert habe — Cozy-Welt + Action-RPG ist eine Kombination, die mich reizt',
        type: 'dungeons-of-hinterberg',
      },
    ],
  },
  {
    q_en: 'Where and when do you most often play games?',
    q_zh: '你最常在哪里以及什么时候玩游戏？',
    q_zhTW: '你最常在哪裡以及什麼時候玩遊戲？',
    q_ja: 'ゲームを一番よくするのはどこで、いつですか？',
    q_ko: '게임을 가장 자주 하는 장소와 시간은 언제인가요？',
    q_de: 'Wo und wann spielst du am häufigsten?',
    options: [
      {
        en: 'Focused dedicated sessions on PC or console — I sit down to play intentionally',
        zh: '在 PC 或主机上专注的专属时段——我会专心坐下来玩',
        zhTW: '在 PC 或主機上專注的專屬時段——我會專心坐下來玩',
        ja: 'PCかコンソールで集中したセッション——腰を落ち着けてちゃんとプレイする',
        ko: 'PC나 콘솔에서 집중된 전용 세션 — 의도적으로 앉아서 플레이해요',
        de: 'Fokussierte Sitzungen am PC oder auf der Konsole — ich setze mich gezielt hin zum Spielen',
        type: 'botany-manor',
      },
      {
        en: 'Casually throughout the day — a window on my second monitor, glanced at between meetings',
        zh: '一天中随意地玩——第二台显示器上的一个窗口，在会议间隙瞥一眼',
        zhTW: '一天中隨意地玩——第二台顯示器上的一個視窗，在會議間隙瞥一眼',
        ja: '一日中カジュアルに——サブモニターのウィンドウを、会議の合間にちらっと見る感じ',
        ko: '하루 중 가볍게 — 두 번째 모니터 창에 띄워두고 회의 사이사이에 흘끗 보기',
        de: 'Lässig über den ganzen Tag — ein Fenster auf dem zweiten Monitor, zwischen Meetings reingeschaut',
        type: 'rustys-retirement',
      },
      {
        en: 'Long evening sessions on PC or handheld — I want to sink into a world for 2-3 hours at a time',
        zh: '在 PC 或掌机上的长时间夜间游戏——我想一次沉浸在一个世界中 2-3 小时',
        zhTW: '在 PC 或掌機上的長時間夜間遊戲——我想一次沉浸在一個世界中 2-3 小時',
        ja: 'PCか携帯機でがっつり夜間セッション——1回2〜3時間世界に没入したい',
        ko: 'PC나 핸드헬드로 긴 저녁 세션 — 한 번에 2~3시간씩 세계에 빠져들고 싶어요',
        de: 'Lange Abendsitzungen am PC oder auf der Handheld — ich will 2-3 Stunden am Stück in eine Welt eintauchen',
        type: 'fields-of-mistria',
      },
      {
        en: 'Dedicated sessions where I want to feel like I went somewhere — a real adventure',
        zh: '专注的时段，我想感觉像是去了某个地方——一次真正的冒险',
        zhTW: '專注的時段，我想感覺像是去了某個地方——一次真正的冒險',
        ja: '集中したセッションで、どこかに行ったような感覚を味わいたい——本物の冒険',
        ko: '어딘가에 다녀온 느낌이 드는 집중 세션 — 진짜 모험 같은 느낌',
        de: 'Fokussierte Sitzungen, bei denen ich das Gefühl haben will, irgendwo hingegangen zu sein — ein echtes Abenteuer',
        type: 'dungeons-of-hinterberg',
      },
    ],
  },
  {
    q_en: 'Which of these sounds most appealing to you?',
    q_zh: '以下哪个对你最有吸引力？',
    q_zhTW: '以下哪個對你最有吸引力？',
    q_ja: 'どれが一番魅力的に聞こえますか？',
    q_ko: '다음 중 어떤 것이 가장 매력적으로 들리나요？',
    q_de: 'Was klingt am verlockendsten für dich?',
    options: [
      {
        en: '"I figured out why the Moonbloom was not flowering — it needed colder nights after exactly four days of rain"',
        zh: '"我搞清楚了为什么月光花没有开放——它需要在正好四天的雨后有更冷的夜晚"',
        zhTW: '"我搞清楚了為什麼月光花沒有開放——它需要在正好四天的雨後有更冷的夜晚"',
        ja: '"ムーンブルームが咲かない理由がわかった——ちょうど4日間雨が続いた後の、もっと寒い夜が必要だったんだ"',
        ko: '"문블룸이 왜 피지 않는지 알아냈어요 — 정확히 4일 비가 내린 후 더 추운 밤이 필요했던 거예요"',
        de: '"Ich hab herausgefunden, warum der Mondbloom nicht blühte — er brauchte kältere Nächte nach genau vier Regentagen"',
        type: 'botany-manor',
      },
      {
        en: '"I checked my farm after a work call and my crops had grown, my animals were fed, and I had 10,000 coins waiting"',
        zh: '"一个工作电话后我查看了我的农场，我的作物已经生长，我的动物已被喂饱，还有 10,000 金币等着我"',
        zhTW: '"一個工作電話後我查看了我的農場，我的作物已經生長，我的動物已被喂飽，還有 10,000 金幣等著我"',
        ja: '"仕事の電話を終えてファームを確認したら、作物が育って、動物が餌をもらって、コインが10,000枚貯まってた"',
        ko: '"업무 통화 후 농장을 확인했더니 작물이 자라 있고, 동물은 먹이를 먹었고, 10,000 코인이 기다리고 있었어요"',
        de: '"Nach einem Arbeitsgespräch hab ich meine Farm gecheckt und meine Ernte war gewachsen, meine Tiere waren gefüttert und 10.000 Münzen warteten auf mich"',
        type: 'rustys-retirement',
      },
      {
        en: '"I am on Year 3 and my Mistrian farm has a greenhouse, a purple heart with Caldarus, and a fully upgraded forge"',
        zh: '"我在第 3 年，我的 Mistria 农场有一个温室，与 Caldarus 的紫心，以及一个完全升级的熔炉"',
        zhTW: '"我在第 3 年，我的 Mistria 農場有一個溫室，與 Caldarus 的紫心，以及一個完全升級的熔爐"',
        ja: '"3年目に突入して、Mistriaの農場には温室ができて、Caldarusと紫ハートになって、鍛冶場も完全アップグレード済み"',
        ko: '"3년차인데 Mistria 농장에 온실도 생겼고, Caldarus랑 보라색 하트고, 대장간도 완전히 업그레이드됐어요"',
        de: '"Ich bin in Jahr 3, meine Mistria-Farm hat ein Gewächshaus, ein lila Herz mit Caldarus und eine vollständig aufgerüstete Schmiede"',
        type: 'fields-of-mistria',
      },
      {
        en: '"I just solved the ice cave dungeon and found out the tourist guide has a secret — the Hinterberg mystery is getting good"',
        zh: '"我刚解决了冰洞地下城，发现导游有一个秘密——Hinterberg 的谜题越来越精彩了"',
        zhTW: '"我剛解決了冰洞地下城，發現導遊有一個秘密——Hinterberg 的謎題越來越精彩了"',
        ja: '"氷の洞窟ダンジョンをクリアしたら、観光ガイドに秘密があることが判明——Hinterbergのミステリーがどんどん面白くなってきた"',
        ko: '"얼음 동굴 던전을 해결했더니 관광 가이드에게 비밀이 있다는 걸 알게 됐어요 — Hinterberg의 미스터리가 점점 재미있어지고 있어요"',
        de: '"Ich hab gerade den Eishöhlen-Dungeon gelöst und rausgefunden, dass der Reiseführer ein Geheimnis hat — das Hinterberg-Mysterium wird richtig spannend"',
        type: 'dungeons-of-hinterberg',
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
  'botany-manor': {
    title_en: 'Botany Manor',
    title_zh: '植物庄园',
    title_zhTW: '植物莊園',
    title_ja: 'ボタニー・マナー',
    title_ko: '보타니 매너',
    title_de: 'Botany Manor',
    emoji: '🌺',
    tag_en: 'A 3-hour puzzle masterpiece about learning exactly how to make each rare plant bloom',
    tag_zh: '3 小时的谜题杰作，关于精确学习如何让每株稀有植物绽放',
    tag_zhTW: '3 小時的謎題傑作，關於精確學習如何讓每株稀有植物綻放',
    tag_ja: '稀少な植物を咲かせる条件を学ぶ、3時間のパズル傑作',
    tag_ko: '희귀한 식물이 피어나는 정확한 조건을 배우는 3시간짜리 퍼즐 걸작',
    tag_de: 'Ein 3-stündiges Rätsel-Meisterwerk darüber, wie man jede seltene Pflanze zum Blühen bringt',
    platform_en: 'Available on: PC (Steam, GOG), Xbox, Xbox Game Pass — about $20',
    platform_zh: '可在以下平台获取：PC（Steam、GOG）、Xbox、Xbox Game Pass——约 20 美元',
    platform_zhTW: '可在以下平台獲取：PC（Steam、GOG）、Xbox、Xbox Game Pass——約 20 美元',
    platform_ja: 'PC（Steam、GOG）、Xbox、Xbox Game Pass で遊べます——約2,400円',
    platform_ko: '출시 플랫폼: PC(Steam, GOG), Xbox, Xbox Game Pass — 약 20달러',
    platform_de: 'Verfügbar auf: PC (Steam, GOG), Xbox, Xbox Game Pass — etwa 20 €',
    why_en:
      "Botany Manor was released in April 2024 and received widespread acclaim — BAFTA nominated and a strong Game of the Year contender for short games. You play as Arabella Greene, an elderly botanist in a Victorian country manor, trying to grow rare and forgotten plants. Each plant is a puzzle: you learn from scattered documents, letters, and field notes what conditions each species needs — specific altitude, temperature range, rainfall frequency, soil acidity, moonlight. You adjust conditions, plant the seed, and watch whether it blooms. When it does, it is one of the most satisfying moments in puzzle game design. The game is about 3 hours for a careful playthrough, which makes it rare in the cozy space: a game with a proper ending that does not overstay its welcome. Available on Xbox Game Pass. One of the best short cozy puzzle games ever made.",
    why_zh:
      '植物庄园于 2024 年 4 月发布并获得广泛好评——BAFTA 提名，是短游戏年度最佳的有力竞争者。你扮演艾拉贝拉·格林，一位维多利亚乡间庄园的老年植物学家，试图种植稀有和被遗忘的植物。每株植物都是一个谜题：你从散落的文件、信件和田野笔记中学习每个物种需要什么条件——特定高度、温度范围、降雨频率、土壤酸度、月光。你调整条件，种下种子，看它是否绽放。当它绽放时，是谜题游戏设计中最令人满足的时刻之一。这款游戏仔细通关大约 3 小时，这在 cozy 游戏领域很罕见：一款有适当结局且不过度延续的游戏。可在 Xbox Game Pass 上获取。有史以来最好的短篇 cozy 谜题游戏之一。',
    why_zhTW:
      '植物莊園於 2024 年 4 月發布並獲得廣泛好評——BAFTA 提名，是短遊戲年度最佳的有力競爭者。你扮演艾拉貝拉·格林，一位維多利亞鄉間莊園的老年植物學家，試圖種植稀有和被遺忘的植物。每株植物都是一個謎題：你從散落的文件、信件和田野筆記中學習每個物種需要什麼條件——特定高度、溫度範圍、降雨頻率、土壤酸度、月光。你調整條件，種下種子，看它是否綻放。當它綻放時，是謎題遊戲設計中最令人滿足的時刻之一。這款遊戲仔細通關大約 3 小時，這在 cozy 遊戲領域很罕見：一款有適當結局且不過度延續的遊戲。可在 Xbox Game Pass 上獲取。有史以來最好的短篇 cozy 謎題遊戲之一。',
    why_ja:
      'ボタニー・マナーは2024年4月にリリースされ、大きな注目を集めました。BAFTA賞にもノミネートされた、短編ゲーム部門の年間最優秀候補作品です。プレイヤーはビクトリア朝の田舎の邸宅に住む高齢の植物学者、アラベラ・グリーンとして、希少で忘れられた植物を育てようとします。各植物はひとつの謎——邸宅に散らばる書類、手紙、フィールドノートから、その植物が必要とする条件（特定の高度、温度帯、降雨の頻度、土壌の酸性度、月明かりなど）を読み解きます。条件を整えて種を蒔き、花が咲くかどうかを見守る——咲いた瞬間は、パズルゲームの中でも特に満足感の高い体験です。丁寧にプレイしても約3時間でクリアでき、cozyゲームの中では珍しい「ちゃんとした終わりがある」作品。Xbox Game Passでも遊べます。短編cozyパズルゲームの歴史に残る傑作です。',
    why_ko:
      '보타니 매너는 2024년 4월에 출시되어 큰 호평을 받았습니다. BAFTA 후보에도 오른 단편 게임 부문 올해의 게임 유력 후보작이에요. 플레이어는 빅토리아 시대 시골 저택에 사는 노년의 식물학자 아라벨라 그린이 되어, 희귀하고 잊혀진 식물들을 키우려 합니다. 각 식물은 하나의 퍼즐이에요. 저택 곳곳에 흩어진 문서, 편지, 현장 노트에서 각 식물에 필요한 조건(고도, 온도 범위, 강수 빈도, 토양 산성도, 달빛)을 찾아냅니다. 조건을 맞추고 씨앗을 심은 뒤 꽃이 피는지 지켜보는 그 순간은, 퍼즐 게임 역사상 가장 만족스러운 경험 중 하나예요. 꼼꼼히 플레이해도 약 3시간이면 클리어할 수 있어서, 코지 게임 장르에서는 드물게 제대로 된 엔딩이 있는 작품입니다. Xbox Game Pass에서도 즐길 수 있어요. 역대 최고의 단편 코지 퍼즐 게임 중 하나로 평가받고 있습니다.',
    why_de:
      'Botany Manor erschien im April 2024 und erhielt breite Anerkennung — BAFTA-nominiert und ein starker Anwärter auf Game of the Year für kurze Spiele. Du spielst Arabella Greene, eine ältere Botanikerin in einem viktorianischen Landhaus, die versucht, seltene und vergessene Pflanzen zu züchten. Jede Pflanze ist ein Rätsel: Aus verstreuten Dokumenten, Briefen und Feldnotizen lernst du, was jede Art braucht — Höhenlage, Temperaturbereich, Regenfrequenz, Bodenacidität, Mondlicht. Du passt die Bedingungen an, pflanzt den Samen und beobachtest, ob er blüht. Wenn er blüht, ist das einer der befriedigendsten Momente im Rätselspieldesign. Das Spiel dauert etwa 3 Stunden für einen bedachtsamen Durchgang — selten im Cozy-Bereich: ein Spiel mit einem richtigen Ende, das nicht zu lang ist. Auf Xbox Game Pass verfügbar. Eines der besten kurzen Cozy-Rätselspiele, die je gemacht wurden.',
    tip_en: "Read every document you find before giving up on a plant — the conditions you need are always in the estate somewhere. The trick is often in the last note you check.",
    tip_zh: '在放弃一株植物之前阅读你找到的每一份文件——你需要的条件总是在庄园的某个地方。诀窍通常在你检查的最后一个笔记中。',
    tip_zhTW: '在放棄一株植物之前閱讀你找到的每一份文件——你需要的條件總是在莊園的某個地方。訣竅通常在你檢查的最後一個筆記中。',
    tip_ja: '植物をあきらめる前に、見つけた書類をすべて読もう——必要な条件は必ず邸宅のどこかにある。カギとなるヒントは、たいてい最後に確認したメモの中に隠れているよ。',
    tip_ko: '식물을 포기하기 전에 찾은 모든 문서를 읽어보세요 — 필요한 조건은 항상 저택 어딘가에 있어요. 핵심 힌트는 보통 마지막으로 확인한 메모 안에 있답니다.',
    tip_de: 'Lies jedes Dokument, das du findest, bevor du eine Pflanze aufgibst — die nötigen Bedingungen sind immer irgendwo im Landhaus. Der entscheidende Tipp steckt oft in der letzten Notiz, die du dir anschaust.',
  },
  'rustys-retirement': {
    title_en: "Rusty's Retirement",
    title_zh: 'Rusty 的退休生活',
    title_zhTW: 'Rusty 的退休生活',
    title_ja: 'ラスティーのリタイア生活',
    title_ko: '러스티의 은퇴 생활',
    title_de: "Rusty's Retirement",
    emoji: '🤖',
    tag_en: 'The idle farm game designed to run in a strip at the bottom of your screen while you work',
    tag_zh: '专为在你工作时在屏幕底部条形区域运行而设计的放置农场游戏',
    tag_zhTW: '專為在你工作時在螢幕底部條形區域運行而設計的放置農場遊戲',
    tag_ja: '作業中に画面下のストリップで動かし続けるために作られた、放置系農場ゲーム',
    tag_ko: '일하는 동안 화면 하단 띠에서 실행되도록 설계된 방치형 농장 게임',
    tag_de: 'Das Idle-Farmspiel, das als Streifen am unteren Bildschirmrand läuft, während du arbeitest',
    platform_en: 'Available on: PC (Steam) — about $7',
    platform_zh: '可在以下平台获取：PC（Steam）——约 7 美元',
    platform_zhTW: '可在以下平台獲取：PC（Steam）——約 7 美元',
    platform_ja: 'PC（Steam）で遊べます——約850円',
    platform_ko: '출시 플랫폼: PC(Steam) — 약 7달러',
    platform_de: 'Verfügbar auf: PC (Steam) — etwa 7 €',
    why_en:
      "Rusty's Retirement is one of the most creative cozy game concepts released in 2024. The game runs in a narrow horizontal strip at the very bottom of your screen — designed to sit below your browser windows, documents, or work applications while you do other things. You manage a small robot farm: your Rustys automatically harvest crops, chop wood, mine resources, and process materials with occasional minimal input from you. Over time you unlock new Rusty types, discover automation upgrades, and expand your farm strip. The game has no sound (by design — it respects your work focus) and is explicitly positioned as a 'productivity companion.' At $7 on Steam it is a wildly original concept and has attracted enormous attention for how respectful it is of your real time. If you have ever wished a cozy game could run alongside your actual work life without demanding your full attention, this is built for exactly that.",
    why_zh:
      "Rusty's Retirement 是 2024 年发布的最具创意的 cozy 游戏概念之一。这款游戏在你屏幕最底部的狭窄水平条中运行——专为在你使用浏览器窗口、文档或工作应用程序做其他事情时坐落在其下方而设计。你管理一个小型机器人农场：你的 Rusty 们自动收获作物、砍伐木材、开采资源，并在偶尔需要你极少输入时处理材料。随着时间推移，你解锁新的 Rusty 类型，发现自动化升级，并扩展你的农场条。这款游戏没有声音（出于设计考虑——它尊重你的工作专注度），明确定位为'生产力伴侣'。Steam 上 7 美元，它是一个非常原创的概念，因为对你真实时间的极度尊重而吸引了大量关注。如果你曾经希望一款 cozy 游戏能在你的实际工作生活旁运行而不需要你全神贯注，这款游戏正是为此而生。",
    why_zhTW:
      "Rusty's Retirement 是 2024 年發布的最具創意的 cozy 遊戲概念之一。這款遊戲在你螢幕最底部的狹窄水平條中運行——專為在你使用瀏覽器視窗、文件或工作應用程式做其他事情時坐落在其下方而設計。你管理一個小型機器人農場：你的 Rusty 們自動收穫作物、砍伐木材、開採資源，並在偶爾需要你極少輸入時處理材料。隨著時間推移，你解鎖新的 Rusty 類型，發現自動化升級，並擴展你的農場條。這款遊戲沒有聲音（出於設計考慮——它尊重你的工作專注度），明確定位為「生產力夥伴」。Steam 上 7 美元，它是一個非常原創的概念，因為對你真實時間的極度尊重而吸引了大量關注。如果你曾經希望一款 cozy 遊戲能在你的實際工作生活旁運行而不需要你全神貫注，這款遊戲正是為此而生。",
    why_ja:
      'ラスティーのリタイア生活は、2024年に登場した最もユニークなcozyゲームのコンセプトです。このゲームは画面の一番下に細い横長のストリップとして起動し、ブラウザや書類、仕事アプリの下に敷いて使うことを想定して作られています。小さなロボット農場を管理するゲームで、ラスティーたちが自動で作物を収穫し、木を切り、資源を採掘し、素材を加工してくれます。たまに少しだけ操作するだけでOK。時間が経つと新しい種類のラスティーを解放し、自動化のアップグレードを発見し、農場ストリップを拡張できます。ゲームに音はありません（意図的な設計——作業への集中を妨げないため）。Steamで約850円という安さで、「生産性コンパニオン」として明確に位置づけられています。cozyゲームを仕事の隣に置いておけたら、と思ったことがある人には、まさにそのために作られた一本です。',
    why_ko:
      '러스티의 은퇴 생활은 2024년에 등장한 가장 창의적인 코지 게임 개념 중 하나입니다. 이 게임은 화면 맨 아래의 가느다란 가로 띠에서 실행되어요. 브라우저 창, 문서, 업무 앱 아래에 깔아두고 다른 일을 하면서 쓰도록 설계됐습니다. 작은 로봇 농장을 관리하는 게임으로, 러스티들이 자동으로 작물을 수확하고, 나무를 베고, 자원을 채굴하고 재료를 가공해줍니다. 가끔 최소한의 조작만 하면 돼요. 시간이 지나면 새로운 러스티 유형을 해금하고, 자동화 업그레이드를 발견하며, 농장 띠를 확장할 수 있습니다. 게임에는 사운드가 없어요(의도적인 설계 — 업무 집중을 방해하지 않기 위해서요). Steam에서 약 7달러로, \'생산성 동반자\'로 명확하게 포지셔닝돼 있습니다. 코지 게임을 실제 업무 생활 옆에서 돌릴 수 있다면 하는 바람이 있었다면, 이 게임이 바로 그것을 위해 만들어졌습니다.',
    why_de:
      "Rusty's Retirement ist eines der kreativsten Cozy-Game-Konzepte des Jahres 2024. Das Spiel läuft in einem schmalen horizontalen Streifen am untersten Rand deines Bildschirms — designed, um unter deinen Browser-Fenstern, Dokumenten oder Arbeitsanwendungen zu sitzen, während du anderen Dingen nachgehst. Du managst eine kleine Roboter-Farm: deine Rustys ernten automatisch Ernte, fällen Bäume, bauen Ressourcen ab und verarbeiten Materialien mit gelegentlichem, minimalem Input von dir. Mit der Zeit schaltest du neue Rusty-Typen frei, entdeckst Automatisierungs-Upgrades und erweiterst deinen Farm-Streifen. Das Spiel hat keinen Sound (by Design — es respektiert deine Arbeitskonzentration) und ist explizit als 'Produktivitäts-Begleiter' positioniert. Für 7 € auf Steam ist es ein wildly originelles Konzept und hat enorme Aufmerksamkeit dafür bekommen, wie respektvoll es mit deiner echten Zeit umgeht. Wenn du dir jemals gewünscht hast, ein Cozy Game könnte neben deinem eigentlichen Arbeitsleben laufen ohne volle Aufmerksamkeit zu fordern — das hier ist genau dafür gemacht.",
    tip_en: "Prioritize unlocking automation upgrades over expanding your crop variety — the more self-sufficient each Rusty becomes, the less you need to check on them.",
    tip_zh: '优先解锁自动化升级而不是扩展你的作物种类——每个 Rusty 越自给自足，你就越不需要查看它们。',
    tip_zhTW: '優先解鎖自動化升級而不是擴展你的作物種類——每個 Rusty 越自給自足，你就越不需要查看它們。',
    tip_ja: '作物の種類を増やすより、自動化のアップグレードを優先して解放しよう——ラスティーが自立するほど、確認する手間が減るよ。',
    tip_ko: '작물 종류를 늘리는 것보다 자동화 업그레이드 해금을 먼저 하세요 — 러스티들이 자립적일수록 확인할 필요가 줄어들어요.',
    tip_de: 'Priorisiere das Freischalten von Automatisierungs-Upgrades, bevor du deine Ernte-Vielfalt erweiterst — je selbstständiger jeder Rusty wird, desto seltener musst du nach ihnen sehen.',
  },
  'fields-of-mistria': {
    title_en: 'Fields of Mistria',
    title_zh: 'Mistria 的田野',
    title_zhTW: 'Mistria 的田野',
    title_ja: 'フィールズ・オブ・ミストリア',
    title_ko: '필즈 오브 미스트리아',
    title_de: 'Fields of Mistria',
    emoji: '🌾',
    tag_en: 'The 2024 farming sim that is quietly becoming the closest spiritual successor to Stardew Valley',
    tag_zh: '2024 年农场模拟游戏，正悄悄成为最接近星露谷精神续作的游戏',
    tag_zhTW: '2024 年農場模擬遊戲，正悄悄成為最接近星露谷精神續作的遊戲',
    tag_ja: 'スターデューバレーの精神的後継として静かに話題を集める、2024年のファーミングシム',
    tag_ko: '2024년 농장 시뮬레이션 게임, 스타듀 밸리의 정신적 후계자로 조용히 자리 잡고 있는 작품',
    tag_de: 'Die Farming-Sim 2024, die still und leise zum spirituellen Nachfolger von Stardew Valley wird',
    platform_en: 'Available on: PC (Steam, Early Access since July 2024) — about $18',
    platform_zh: '可在以下平台获取：PC（Steam，2024 年 7 月起抢先体验）——约 18 美元',
    platform_zhTW: '可在以下平台獲取：PC（Steam，2024 年 7 月起搶先體驗）——約 18 美元',
    platform_ja: 'PC（Steam、2024年7月よりアーリーアクセス）で遊べます——約2,200円',
    platform_ko: '출시 플랫폼: PC(Steam, 2024년 7월부터 얼리 액세스) — 약 18달러',
    platform_de: 'Verfügbar auf: PC (Steam, Early Access seit Juli 2024) — etwa 18 €',
    why_en:
      "Fields of Mistria entered Steam Early Access in July 2024 and immediately attracted a devoted following among Stardew Valley fans, building a passionate community within weeks. You move to the town of Mistria — a small medieval fantasy village recovering from an ancient calamity — and rebuild the community while farming, crafting, mining, fishing, and befriending a full cast of NPCs with voiced dialogue and deep backstories. The art style is warm fantasy anime-adjacent with beautiful seasonal changes. The combat is action-RPG with genuinely satisfying dungeon exploration. Developer NPC Studio updates the game regularly with significant content patches. Players who love Stardew Valley's formula but have completed it and want something fresh with the same soul consistently point to Fields of Mistria as the most natural next step. It is in Early Access, which means it is unfinished — but the current content is substantial enough that most players report 60-100+ hours already.",
    why_zh:
      'Mistria 的田野于 2024 年 7 月进入 Steam 抢先体验，立即吸引了星露谷物语粉丝的忠实追随，在几周内建立了热情的社区。你搬到 Mistria 镇——一个从远古灾难中恢复的小型中世纪奇幻村庄——并通过农耕、制作、开矿、钓鱼和结交拥有配音对话和深度背景故事的完整 NPC 阵容来重建社区。美术风格是温暖的奇幻动漫风格，有美丽的季节变化。战斗是动作 RPG，有真正令人满足的地下城探索。开发商 NPC Studio 定期更新游戏，推出重大内容补丁。喜欢星露谷物语公式但已经完成并想要拥有相同灵魂的新鲜事物的玩家，一致将 Mistria 的田野指向为最自然的下一步。它处于抢先体验阶段，这意味着它尚未完成——但当前内容已经足够丰富，大多数玩家报告已经有 60-100 多小时了。',
    why_zhTW:
      'Mistria 的田野於 2024 年 7 月進入 Steam 搶先體驗，立即吸引了星露谷物語粉絲的忠實追隨，在幾週內建立了熱情的社群。你搬到 Mistria 鎮——一個從遠古災難中恢復的小型中世紀奇幻村莊——並通過農耕、製作、開礦、釣魚和結交擁有配音對話和深度背景故事的完整 NPC 陣容來重建社群。美術風格是溫暖的奇幻動漫風格，有美麗的季節變化。戰鬥是動作 RPG，有真正令人滿足的地下城探索。開發商 NPC Studio 定期更新遊戲，推出重大內容補丁。喜歡星露谷物語公式但已經完成並想要擁有相同靈魂的新鮮事物的玩家，一致將 Mistria 的田野指向為最自然的下一步。它處於搶先體驗階段，這意味著它尚未完成——但當前內容已經足夠豐富，大多數玩家報告已經有 60-100 多小時了。',
    why_ja:
      'フィールズ・オブ・ミストリアは2024年7月にSteamでアーリーアクセスを開始し、スターデューバレーファンから即座に熱狂的な支持を集め、数週間のうちに情熱的なコミュニティが生まれました。古代の災厄から立ち直ろうとする小さな中世ファンタジーの村、ミストリアへと引っ越したプレイヤーは、農業、クラフト、採掘、釣り、そしてボイス付きの台詞と深い背景を持つNPCとの交流を通じてコミュニティを再建していきます。アートスタイルは温かみのあるファンタジーアニメ風で、美しい季節の移ろいが楽しめます。戦闘はアクションRPGで、ダンジョン探索もしっかり満足感があります。開発元のNPC Studioは定期的に大型アップデートを配信中。スターデューバレーをやり込んだけど、同じ魂を持つ新鮮な体験が欲しいというプレイヤーから、「次にやるなら絶対これ」と強く推されています。アーリーアクセスなので未完成ではありますが、現時点のコンテンツだけでも多くのプレイヤーが60〜100時間以上プレイしています。',
    why_ko:
      '필즈 오브 미스트리아는 2024년 7월 Steam 얼리 액세스를 시작하자마자 스타듀 밸리 팬들의 열렬한 지지를 받으며 몇 주 만에 열정적인 커뮤니티를 형성했습니다. 고대 재앙에서 회복 중인 작은 중세 판타지 마을 미스트리아로 이사한 플레이어는 농사, 제작, 채굴, 낚시, 그리고 풍부한 배경 스토리와 보이스가 있는 NPC들과의 교류를 통해 마을 공동체를 재건합니다. 아트 스타일은 따뜻한 판타지 애니메이션 풍으로 아름다운 계절 변화가 특징이에요. 전투는 액션 RPG 방식으로 던전 탐험도 꽤 만족스럽습니다. 개발사 NPC Studio는 정기적으로 대형 업데이트를 제공 중입니다. 스타듀 밸리 공식을 좋아하지만 이미 완주했고 같은 감성의 새로운 작품을 원하는 플레이어들이 한결같이 다음 선택지로 꼽는 게임이에요. 얼리 액세스 단계라 아직 완성은 아니지만, 현재 콘텐츠만으로도 대부분의 플레이어들이 이미 60~100시간 이상 플레이했다고 합니다.',
    why_de:
      "Fields of Mistria kam im Juli 2024 in den Steam Early Access und zog sofort eine treue Anhängerschaft unter Stardew Valley-Fans an, die innerhalb von Wochen eine leidenschaftliche Community aufbaute. Du ziehst in die Stadt Mistria — ein kleines mittelalterliches Fantasiedorf, das sich von einer alten Katastrophe erholt — und baust die Gemeinschaft wieder auf durch Farming, Crafting, Bergbau, Angeln und das Anfreunden mit einem vollständigen NPC-Ensemble mit Sprachausgabe und tiefen Hintergrundgeschichten. Der Kunststil ist warm, Fantasy-Anime-ähnlich, mit wunderschönen Jahreszeit-Wechseln. Der Kampf ist Action-RPG mit genuiner Dungeon-Erkundung. Entwickler NPC Studio aktualisiert das Spiel regelmäßig mit bedeutenden Content-Patches. Spieler, die die Stardew Valley-Formel lieben, sie aber abgeschlossen haben und etwas Frisches mit derselben Seele wollen, zeigen konsistent auf Fields of Mistria als den natürlichsten nächsten Schritt. Es ist im Early Access, was bedeutet, es ist noch nicht fertig — aber der aktuelle Content ist schon so umfangreich, dass die meisten Spieler bereits 60-100+ Stunden berichten.",
    tip_en: "Talk to every NPC every day even before you have gifts for them — friendship points from conversation accumulate faster than most players realize, and several NPCs have branching dialogue that only appears at certain friendship levels.",
    tip_zh: '即使在没有礼物之前，也要每天和每个 NPC 交谈——对话的友谊点数积累比大多数玩家意识到的要快，几个 NPC 有只在特定友谊等级出现的分支对话。',
    tip_zhTW: '即使在沒有禮物之前，也要每天和每個 NPC 交談——對話的友誼點數積累比大多數玩家意識到的要快，幾個 NPC 有只在特定友誼等級出現的分支對話。',
    tip_ja: '贈り物がなくても、毎日全員のNPCに話しかけよう——会話での友好度上昇は、多くのプレイヤーが思うよりずっと早い。特定の友好度にならないと出てこない分岐台詞を持つNPCも何人かいるよ。',
    tip_ko: '선물이 없어도 매일 모든 NPC에게 말을 걸어보세요 — 대화로 쌓이는 우정 포인트가 대부분의 플레이어가 생각하는 것보다 빠르게 쌓입니다. 특정 우정 단계에서만 나오는 분기 대화를 가진 NPC도 몇 명 있어요.',
    tip_de: 'Sprich täglich mit jedem NPC, auch bevor du Geschenke für sie hast — Freundschaftspunkte durch Gespräche sammeln sich schneller an, als die meisten Spieler merken, und mehrere NPCs haben verzweigte Dialoge, die nur bei bestimmten Freundschaftsstufen erscheinen.',
  },
  'dungeons-of-hinterberg': {
    title_en: 'Dungeons of Hinterberg',
    title_zh: 'Hinterberg 的地下城',
    title_zhTW: 'Hinterberg 的地下城',
    title_ja: 'ダンジョンズ・オブ・ヒンターベルク',
    title_ko: '던전즈 오브 힌터베르크',
    title_de: 'Dungeons of Hinterberg',
    emoji: '⛰️',
    tag_en: 'A cozy action RPG set in an Austrian Alps tourist town where dungeons have become a leisure activity',
    tag_zh: '设定在奥地利阿尔卑斯山旅游小镇的 cozy 动作 RPG，地下城已成为休闲活动',
    tag_zhTW: '設定在奧地利阿爾卑斯山旅遊小鎮的 cozy 動作 RPG，地下城已成為休閒活動',
    tag_ja: 'オーストリア・アルプスの観光地が舞台のコージーアクションRPG——ダンジョン攻略がレジャーになった世界',
    tag_ko: '던전이 레저 활동이 된 오스트리아 알프스 관광 마을을 배경으로 한 코지 액션 RPG',
    tag_de: 'Ein cozy Action-RPG in einem österreichischen Alpen-Touristenort, wo Dungeons zur Freizeitbeschäftigung geworden sind',
    platform_en: 'Available on: PC (Steam, GOG), Xbox, Xbox Game Pass — about $25',
    platform_zh: '可在以下平台获取：PC（Steam、GOG）、Xbox、Xbox Game Pass——约 25 美元',
    platform_zhTW: '可在以下平台獲取：PC（Steam、GOG）、Xbox、Xbox Game Pass——約 25 美元',
    platform_ja: 'PC（Steam、GOG）、Xbox、Xbox Game Pass で遊べます——約3,000円',
    platform_ko: '출시 플랫폼: PC(Steam, GOG), Xbox, Xbox Game Pass — 약 25달러',
    platform_de: 'Verfügbar auf: PC (Steam, GOG), Xbox, Xbox Game Pass — etwa 25 €',
    why_en:
      "Dungeons of Hinterberg is one of the most original concepts of 2024: a cozy action RPG set in Hinterberg, a fictional Austrian mountain town where magical dungeons have recently appeared across the Alps. The dungeons are now a tourist attraction — people come from around the world to challenge them as a leisure activity, staying at inns, eating at local restaurants, and socializing in the evenings. You play as Luisa, a burned-out young lawyer taking a vacation in Hinterberg to clear her head by dungeon-exploring. Each dungeon has a unique puzzle-solving mechanic built around magic (fire, ice, wind, etc.) and you unlock new abilities as you progress. During the day you explore dungeons; in the evenings you socialize with townspeople and fellow adventurers, building relationships that affect the story. The game has a complete narrative arc of about 25-40 hours and makes the unusual choice of making cozy social simulation and action combat feel genuinely complementary rather than awkward. Available on Xbox Game Pass.",
    why_zh:
      'Hinterberg 的地下城是 2024 年最具原创性的概念之一：一款设定在 Hinterberg 的 cozy 动作 RPG，这是一个虚构的奥地利山区小镇，阿尔卑斯山各地最近出现了魔法地下城。这些地下城现在成了旅游景点——人们从世界各地来挑战它们作为休闲活动，住在旅馆里，在当地餐馆吃饭，晚上社交。你扮演路易莎，一位精疲力竭的年轻律师，在 Hinterberg 度假，通过探索地下城来清醒头脑。每个地下城都有一个围绕魔法（火、冰、风等）构建的独特解谜机制，随着你的进展你解锁新能力。白天你探索地下城；晚上你与镇民和其他冒险者交往，建立影响故事的关系。这款游戏有一个大约 25-40 小时的完整叙事弧线，做出了不寻常的选择，使 cozy 社交模拟和动作战斗感觉真正互补而不是别扭。可在 Xbox Game Pass 上获取。',
    why_zhTW:
      'Hinterberg 的地下城是 2024 年最具原創性的概念之一：一款設定在 Hinterberg 的 cozy 動作 RPG，這是一個虛構的奧地利山區小鎮，阿爾卑斯山各地最近出現了魔法地下城。這些地下城現在成了旅遊景點——人們從世界各地來挑戰它們作為休閒活動，住在旅館裡，在當地餐廳吃飯，晚上社交。你扮演路易莎，一位精疲力竭的年輕律師，在 Hinterberg 度假，通過探索地下城來清醒頭腦。每個地下城都有一個圍繞魔法（火、冰、風等）構建的獨特解謎機制，隨著你的進展你解鎖新能力。白天你探索地下城；晚上你與鎮民和其他冒險者交往，建立影響故事的關係。這款遊戲有一個大約 25-40 小時的完整敘事弧線，做出了不尋常的選擇，使 cozy 社交模擬和動作戰鬥感覺真正互補而不是別扭。可在 Xbox Game Pass 上獲取。',
    why_ja:
      'ダンジョンズ・オブ・ヒンターベルクは2024年で最も独創的なコンセプトの一つです。架空のオーストリア山岳観光地・ヒンターベルクが舞台のcozyアクションRPGで、アルプス各地に魔法のダンジョンが出現したという世界観。今やそのダンジョンが観光スポットになっていて、世界中から人々がレジャーとして挑戦しに来て、宿に泊まり、地元のレストランで食事をして、夜は社交を楽しんでいます。プレイヤーは燃え尽き気味の若い弁護士・ルイーザとなり、頭を冷やすためにヒンターベルクへバカンスに来てダンジョン探索に挑みます。各ダンジョンは魔法（火・氷・風など）を軸にした独自のパズル機構を持っており、進めるにつれて新能力が解放されます。昼はダンジョン探索、夜は町の人々や仲間の冒険者と交流して、物語に影響する関係を育てます。約25〜40時間の完結したナラティブを持ち、cozyな社交シミュレーションとアクション戦闘が違和感なく共存している稀な一作。Xbox Game Passでも遊べます。',
    why_ko:
      '던전즈 오브 힌터베르크는 2024년 가장 독창적인 게임 중 하나입니다. 알프스 곳곳에 마법 던전이 나타난 가상의 오스트리아 산악 관광지 힌터베르크를 배경으로 한 코지 액션 RPG예요. 이 던전들은 이제 관광 명소가 됐고, 전 세계에서 사람들이 레저로 도전하기 위해 여관에 묵고, 현지 레스토랑에서 식사하고, 저녁에는 교류를 즐깁니다. 플레이어는 지쳐버린 젊은 변호사 루이자가 되어 머리를 식히기 위해 힌터베르크로 휴가를 와서 던전 탐험에 나섭니다. 각 던전은 마법(불, 얼음, 바람 등)을 중심으로 한 독특한 퍼즐 메커니즘이 있고, 진행할수록 새로운 능력을 해금합니다. 낮에는 던전을 탐험하고, 저녁에는 마을 사람들과 다른 모험가들과 교류하며 스토리에 영향을 미치는 관계를 쌓아갑니다. 약 25~40시간의 완성된 내러티브를 갖추고 있으며, 코지한 사교 시뮬레이션과 액션 전투가 어색하지 않게 조화를 이루는 독특한 작품이에요. Xbox Game Pass에서도 즐길 수 있습니다.',
    why_de:
      "Dungeons of Hinterberg ist eines der originellsten Konzepte von 2024: Ein cozy Action-RPG in Hinterberg, einem fiktiven österreichischen Bergort, wo magische Dungeons in den Alpen aufgetaucht sind. Die Dungeons sind jetzt eine Touristenattraktion — Menschen kommen aus aller Welt, um sie als Freizeitbeschäftigung zu meistern, bleiben in Gasthöfen, essen in lokalen Restaurants und haben abends gesellige Runden. Du spielst Luisa, eine ausgebrannte junge Anwältin, die Urlaub in Hinterberg macht, um beim Dungeon-Erkunden den Kopf freizubekommen. Jeder Dungeon hat eine einzigartige Rätselmechanik rund um Magie (Feuer, Eis, Wind usw.) und du schaltest mit dem Fortschritt neue Fähigkeiten frei. Tagsüber erkundest du Dungeons; abends socializierst du mit Dorfbewohnern und Mitabenteurern und baust Beziehungen auf, die die Geschichte beeinflussen. Das Spiel hat einen vollständigen Handlungsbogen von etwa 25-40 Stunden und trifft die ungewöhnliche Entscheidung, cozy Sozialsimulation und Action-Kampf wie natürliche Ergänzungen wirken zu lassen. Auf Xbox Game Pass verfügbar.",
    tip_en: "Invest in relationship-building during every evening phase — several story revelations and quality-of-life unlocks are locked behind friendship levels with specific townspeople.",
    tip_zh: '在每个夜晚阶段投入关系建立——几个故事揭示和生活质量解锁依赖于与特定镇民的友谊等级。',
    tip_zhTW: '在每個夜晚階段投入關係建立——幾個故事揭示和生活品質解鎖依賴於與特定鎮民的友誼等級。',
    tip_ja: '夜のフェーズでは必ず人間関係構築に時間を使おう——特定の町の人との友好度によって、ストーリーの重要な開示や便利な解放要素が手に入るよ。',
    tip_ko: '매 저녁 단계에서 관계 구축에 투자하세요 — 특정 마을 사람들과의 우정 단계에 따라 스토리 핵심 요소와 편의 기능이 해금됩니다.',
    tip_de: 'Investiere in jeder Abendphase in Beziehungsaufbau — mehrere Story-Enthüllungen und Lebensqualitäts-Freischaltungen sind hinter Freundschaftsstufen mit bestimmten Dorfbewohnern gesperrt.',
  },
}

function calcResult(answers: Pick[]): Pick {
  const counts: Record<Pick, number> = {
    'botany-manor': 0,
    'rustys-retirement': 0,
    'fields-of-mistria': 0,
    'dungeons-of-hinterberg': 0,
  }
  for (const a of answers) counts[a]++
  return Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0] as Pick
}

export function CozyNew2024Quiz({ locale }: { locale: string }) {
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
    const url = `${BASE_URL}/${locale}/quizzes/cozy-new-2024`
    const shareText = getLoc(
      `我的 2024 新 Cozy 游戏推荐是「${result.title_zh}」！${result.tag_zh}。找到你的：${url}`,
      `My 2024 cozy game match is ${result.title_en} — ${result.tag_en}. Find yours: ${url}`,
      `我的 2024 新 Cozy 遊戲推薦是「${result.title_zhTW}」！${result.tag_zhTW}。找到你的：${url}`,
      `私の2024コージーゲームは「${result.title_ja}」です！${result.tag_ja}。あなたも試して：${url}`,
      `제 2024 코지 게임 추천은 「${result.title_ko}」입니다！${result.tag_ko}。당신도 찾아보세요：${url}`,
      `Mein 2024-Cozy-Game-Match ist ${result.title_de} — ${result.tag_de}. Find deins: ${url}`
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
            {getLoc(result.platform_zh, result.platform_en, result.platform_zhTW, result.platform_ja, result.platform_ko, result.platform_de)}
          </p>
        </div>

        <p className="mb-5 text-sm leading-relaxed text-[#8a9a7a]">
          {getLoc(result.why_zh, result.why_en, result.why_zhTW, result.why_ja, result.why_ko, result.why_de)}
        </p>

        <div className="mb-5 rounded-xl border border-[#f0a832]/30 bg-[#0f1a0f] p-4">
          <p className="text-sm text-[#e8dcc8]">
            <span className="font-semibold text-[#f0a832]">
              {getLoc('上手小贴士：', 'Getting started: ', '上手小貼士：', 'はじめのヒント：', '시작 팁：', 'Erste Schritte: ')}
            </span>
            {getLoc(result.tip_zh, result.tip_en, result.tip_zhTW, result.tip_ja, result.tip_ko, result.tip_de)}
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
            '2024 年哪款新 Cozy 游戏最适合你？',
            'Which New 2024 Cozy Game Is Right for You?',
            '2024 年哪款新 Cozy 遊戲最適合你？',
            '2024年の新作コージーゲーム、あなたに合うのはどれ？',
            '2024년 새 코지 게임 중 당신에게 맞는 건？',
            'Welches neue Cozy Game aus 2024 passt zu dir?'
          )}
        </h1>
        <p className="text-sm text-[#8a9a7a]">
          {getLoc(
            '6 个问题，在植物庄园、Rusty 的退休生活、Mistria 的田野和 Hinterberg 的地下城中找到你的 2024 年度 Cozy 游戏',
            "6 questions to match you with your 2024 cozy pick — Botany Manor, Rusty's Retirement, Fields of Mistria, or Dungeons of Hinterberg",
            '6 個問題，在植物莊園、Rusty 的退休生活、Mistria 的田野和 Hinterberg 的地下城中找到你的 2024 年度 Cozy 遊戲',
            '6つの質問で、ボタニー・マナー、ラスティーのリタイア生活、フィールズ・オブ・ミストリア、ダンジョンズ・オブ・ヒンターベルクの中からあなたに合う2024年のコージーゲームを見つけよう',
            '6가지 질문으로 보타니 매너, 러스티의 은퇴 생활, 필즈 오브 미스트리아, 던전즈 오브 힌터베르크 중 당신의 2024년 코지 게임을 찾아보세요',
            "6 Fragen, um dein 2024er Cozy Game zu finden — Botany Manor, Rusty's Retirement, Fields of Mistria oder Dungeons of Hinterberg"
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
        {getLoc('找到我的 2024 Cozy 游戏', 'Find My 2024 Cozy Game', '找到我的 2024 Cozy 遊戲', '私の2024コージーゲームを見つける', '내 2024 코지 게임 찾기', 'Mein 2024-Cozy-Game finden')}
      </button>
    </div>
  )
}
