'use client'

import { useState } from 'react'
import { BASE_URL } from '@/lib/config'

type Pick = 'hades' | 'vampire-survivors' | 'slay-the-spire' | 'balatro'

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
    q_en: 'You die and lose most of your progress. Which response sounds most like you?',
    q_zh: '你死了，失去了大部分进度。哪个反应最像你？',
    q_zhTW: '你死了，失去了大部分進度。哪個反應最像你？',
    q_ja: '死んで進行状況のほとんどを失った。どのリアクションが一番あなたらしい？',
    q_ko: '죽어서 대부분의 진행 상황을 잃었을 때, 어떤 반응이 가장 나답나요?',
    q_de: 'Du stirbst und verlierst den Großteil deines Fortschritts. Welche Reaktion klingt am meisten nach dir?',
    options: [
      {
        en: '"Okay but I got more story — and now I know what to do differently next time"',
        zh: '"好吧，但我获得了更多故事——现在我知道下次该怎么做不同的事了"',
        zhTW: '"好吧，但我獲得了更多故事——現在我知道下次該怎麼做不同的事了"',
        ja: '「まあいいか、ストーリーが進んだし——次はどう変えるか分かった」',
        ko: '"그래도 스토리를 더 봤고 — 이제 다음엔 뭘 다르게 할지 알겠어"',
        de: '"Okay, aber ich habe mehr Story bekommen — und jetzt weiß ich, was ich beim nächsten Mal anders mache"',
        type: 'hades',
      },
      {
        en: '"That run lasted 20 minutes and was completely satisfying — let me start the next one"',
        zh: '"那局持续了 20 分钟且非常令人满足——让我开始下一局"',
        zhTW: '"那局持續了 20 分鐘且非常令人滿足——讓我開始下一局"',
        ja: '「20分のプレイで十分楽しめた——次のランを始めよう」',
        ko: '"20분 플레이로 충분히 만족했어 — 다음 판 시작하자"',
        de: '"Dieser Run hat 20 Minuten gedauert und war super befriedigend — los geht\'s mit dem nächsten"',
        type: 'vampire-survivors',
      },
      {
        en: '"I saw exactly where my deck strategy failed — the next build I want to try is already forming"',
        zh: '"我清楚地看到我的卡组策略在哪里失败了——我想尝试的下一个构建已经在形成了"',
        zhTW: '"我清楚地看到我的牌組策略在哪裡失敗了——我想嘗試的下一個構建已經在形成了"',
        ja: '「デッキ戦略がどこで崩れたか完全に分かった——次に試したいビルドが頭の中でできてきた」',
        ko: '"덱 전략이 어디서 무너졌는지 정확히 봤어 — 다음에 시도할 빌드가 이미 머릿속에 있어"',
        de: '"Ich habe genau gesehen, wo meine Deck-Strategie gescheitert ist — das nächste Build forme ich schon im Kopf"',
        type: 'slay-the-spire',
      },
      {
        en: '"That hand was almost there. I want to try one more configuration before I stop"',
        zh: '"那手牌差一点就成了。在停下来之前我想再尝试一种配置"',
        zhTW: '"那手牌差一點就成了。在停下來之前我想再嘗試一種配置"',
        ja: '「あのハンドはあと少しだった。やめる前にもう一つの組み合わせを試したい」',
        ko: '"그 핸드는 거의 다 됐었는데. 그만하기 전에 한 가지 구성만 더 시도해볼게"',
        de: '"Das Blatt war fast perfekt. Ich will noch eine Konfiguration ausprobieren, bevor ich aufhöre"',
        type: 'balatro',
      },
    ],
  },
  {
    q_en: 'How important is story and characters to your enjoyment of a game?',
    q_zh: '故事和角色对你的游戏享受有多重要？',
    q_zhTW: '故事和角色對你的遊戲享受有多重要？',
    q_ja: 'ゲームを楽しむうえで、ストーリーとキャラクターはどのくらい重要？',
    q_ko: '스토리와 캐릭터가 게임 즐거움에 얼마나 중요한가요?',
    q_de: 'Wie wichtig sind Story und Charaktere für deinen Spielspaß?',
    options: [
      {
        en: 'Essential — I want characters I grow attached to and a narrative that unfolds over runs',
        zh: '至关重要——我想要让我产生依附感的角色和跨越多次运行展开的叙事',
        zhTW: '至關重要——我想要讓我產生依附感的角色和跨越多次遊玩展開的敘事',
        ja: '必須——愛着が湧くキャラクターと、周回を重ねて展開するストーリーが欲しい',
        ko: '필수 — 애착이 생기는 캐릭터와 플레이를 거듭할수록 펼쳐지는 스토리가 필요해',
        de: 'Unverzichtbar — ich will Charaktere, an die ich mich gewöhne, und eine Handlung, die sich über Runs entfaltet',
        type: 'hades',
      },
      {
        en: 'Unimportant — I want pure gameplay loop with no story overhead at all',
        zh: '不重要——我想要纯粹的游戏循环，完全没有故事负担',
        zhTW: '不重要——我想要純粹的遊戲循環，完全沒有故事負擔',
        ja: 'どうでもいい——純粋なゲームループだけでいい、ストーリーはいらない',
        ko: '중요하지 않아 — 스토리 부담 없이 순수한 게임 루프만 원해',
        de: 'Unwichtig — ich will einen reinen Gameplay-Loop ohne Story-Overhead',
        type: 'vampire-survivors',
      },
      {
        en: 'Light — some character flavor and lore is nice but gameplay is why I am here',
        zh: '轻度——一些角色风味和传说很好，但游戏玩法才是我来这里的原因',
        zhTW: '輕度——一些角色風味和傳說很好，但遊戲玩法才是我來這裡的原因',
        ja: 'ちょっとあればいい——キャラクターの個性や世界観は嬉しいけど、本命はゲームプレイ',
        ko: '가볍게 — 캐릭터 개성과 설정이 있으면 좋지만, 내가 여기 온 이유는 게임플레이야',
        de: 'Leicht — etwas Charakterflair und Lore ist nett, aber das Gameplay ist der Grund, warum ich hier bin',
        type: 'slay-the-spire',
      },
      {
        en: 'None needed — the cards and combinations are their own reward',
        zh: '不需要——牌和组合本身就是奖励',
        zhTW: '不需要——牌和組合本身就是獎勵',
        ja: '全くいらない——カードとコンボ自体が報酬になっている',
        ko: '필요 없어 — 카드와 조합 자체가 보상이야',
        de: 'Nicht nötig — die Karten und Kombinationen sind ihre eigene Belohnung',
        type: 'balatro',
      },
    ],
  },
  {
    q_en: 'What kind of strategy layer do you enjoy?',
    q_zh: '你喜欢什么样的策略层次？',
    q_zhTW: '你喜歡什麼樣的策略層次？',
    q_ja: 'どんな種類の戦略要素が好き？',
    q_ko: '어떤 종류의 전략 요소를 즐기나요?',
    q_de: 'Welche Art von Strategie-Ebene gefällt dir?',
    options: [
      {
        en: 'Action-based — fast combat decisions, dodging, reading enemy patterns in real time',
        zh: '基于行动——快速战斗决策、闪避、实时读取敌人模式',
        zhTW: '基於行動——快速戰鬥決策、閃避、即時讀取敵人模式',
        ja: 'アクション系——素早い戦闘判断、回避、リアルタイムで敵のパターンを読む',
        ko: '액션 기반 — 빠른 전투 판단, 회피, 실시간 적 패턴 파악',
        de: 'Aktionsbasiert — schnelle Kampfentscheidungen, Ausweichen, Feindmuster in Echtzeit lesen',
        type: 'hades',
      },
      {
        en: 'Minimal — the fun is watching the numbers go up, not making complex decisions',
        zh: '最少——乐趣在于看数字上涨，而不是做复杂决策',
        zhTW: '最少——樂趣在於看數字上漲，而不是做複雜決策',
        ja: '最小限——楽しさは数字が増えていくのを眺めること、複雑な判断はしたくない',
        ko: '최소한 — 숫자가 올라가는 걸 보는 게 재미지, 복잡한 결정을 하는 게 아니야',
        de: 'Minimal — der Spaß liegt darin, Zahlen ansteigen zu sehen, nicht komplexe Entscheidungen zu treffen',
        type: 'vampire-survivors',
      },
      {
        en: 'Deep deckbuilding — every card pick matters, synergies compound, runs diverge dramatically',
        zh: '深度卡组构建——每次选牌都很重要，协同效应叠加，每局截然不同',
        zhTW: '深度牌組構建——每次選牌都很重要，協同效應疊加，每局截然不同',
        ja: '深いデッキ構築——カードの選択一枚一枚が重要で、シナジーが積み重なり、毎回全く違う展開になる',
        ko: '깊은 덱빌딩 — 카드 선택 하나하나가 중요하고, 시너지가 쌓이며, 매번 판이 달라져',
        de: 'Tiefes Deckbuilding — jede Kartenauswahl zählt, Synergien multiplizieren sich, Runs verlaufen dramatisch unterschiedlich',
        type: 'slay-the-spire',
      },
      {
        en: 'Combinatorial puzzles — discovering how scoring multipliers stack is the entire game for me',
        zh: '组合谜题——发现计分乘数如何叠加对我来说就是整个游戏',
        zhTW: '組合謎題——發現計分乘數如何疊加對我來說就是整個遊戲',
        ja: '組み合わせパズル——得点乗数がどう重なるかを発見するのが、私にとってゲームそのもの',
        ko: '조합 퍼즐 — 점수 배율이 어떻게 쌓이는지 발견하는 것이 나에게는 게임 전부야',
        de: 'Kombinatorische Rätsel — herauszufinden, wie Punkte-Multiplikatoren sich stapeln, ist das ganze Spiel für mich',
        type: 'balatro',
      },
    ],
  },
  {
    q_en: 'How long do you want a typical single run to last?',
    q_zh: '你希望典型的单次运行持续多长时间？',
    q_zhTW: '你希望典型的單次遊玩持續多長時間？',
    q_ja: '典型的な1回のランはどのくらいの長さが理想？',
    q_ko: '한 번의 런이 얼마나 지속되면 좋겠나요?',
    q_de: 'Wie lange soll ein typischer einzelner Run deiner Meinung nach dauern?',
    options: [
      {
        en: '20-40 minutes — long enough to feel an arc, short enough to run it again tonight',
        zh: '20-40 分钟——足够长以感受到弧线，足够短以今晚再来一次',
        zhTW: '20-40 分鐘——足夠長以感受到弧線，足夠短以今晚再來一次',
        ja: '20〜40分——ひと山越えた感覚が得られる長さで、今夜また回せる短さ',
        ko: '20~40분 — 흐름을 느낄 만큼 길고, 오늘 밤 또 할 만큼 짧은',
        de: '20-40 Minuten — lang genug, um einen Bogen zu fühlen, kurz genug, um heute Abend nochmal zu spielen',
        type: 'hades',
      },
      {
        en: '15-30 minutes — I want a complete experience that I can chain multiple times in one sitting',
        zh: '15-30 分钟——我想要可以在一次游戏中多次连续进行的完整体验',
        zhTW: '15-30 分鐘——我想要可以在一次遊戲中多次連續進行的完整體驗',
        ja: '15〜30分——一回の完結した体験を、一度のプレイ時間に何連続でも楽しみたい',
        ko: '15~30분 — 한 번 앉아서 여러 번 연속으로 즐길 수 있는 완결된 경험을 원해',
        de: '15-30 Minuten — ich will ein vollständiges Erlebnis, das ich mehrfach hintereinander in einer Sitzung spielen kann',
        type: 'vampire-survivors',
      },
      {
        en: '45-90 minutes — enough time for a full dungeon run where strategy decisions compound',
        zh: '45-90 分钟——足以进行完整地下城运行，让策略决策积累的时间',
        zhTW: '45-90 分鐘——足以進行完整地牢遊玩，讓策略決策積累的時間',
        ja: '45〜90分——完全なダンジョン踏破ができる長さで、戦略的な判断が積み重なる',
        ko: '45~90분 — 전략적 판단이 누적되는 완전한 던전 탐험이 가능한 시간',
        de: '45-90 Minuten — genug Zeit für einen vollständigen Dungeon-Run, bei dem Strategieentscheidungen sich aufbauen',
        type: 'slay-the-spire',
      },
      {
        en: '20-60 minutes — depends on how deep the current run goes and how good the hand gets',
        zh: '20-60 分钟——取决于当前运行进行得多深以及手牌变得多好',
        zhTW: '20-60 分鐘——取決於當前遊玩進行得多深以及手牌變得多好',
        ja: '20〜60分——今のランがどこまで進むか、ハンドがどれだけ良くなるかによる',
        ko: '20~60분 — 현재 런이 얼마나 깊어지고 핸드가 얼마나 좋아지느냐에 따라',
        de: '20-60 Minuten — hängt davon ab, wie weit der aktuelle Run geht und wie gut das Blatt wird',
        type: 'balatro',
      },
    ],
  },
  {
    q_en: 'What makes you want to start one more run after the previous one ends?',
    q_zh: '什么让你在上一局结束后想再开一局？',
    q_zhTW: '什麼讓你在上一局結束後想再開一局？',
    q_ja: '前のランが終わったあと、もう一回やりたいと思わせるのは何？',
    q_ko: '이전 런이 끝난 후 한 판 더 하고 싶게 만드는 건 뭔가요?',
    q_de: 'Was bringt dich dazu, nach dem Ende des vorherigen Runs noch einen weiteren starten zu wollen?',
    options: [
      {
        en: 'I got new dialogue or story — and I want to see what Zagreus says next',
        zh: '我获得了新的对话或故事——我想看看 Zagreus 接下来说什么',
        zhTW: '我獲得了新的對話或故事——我想看看 Zagreus 接下來說什麼',
        ja: '新しい会話やストーリーが解放された——ザグレウスが次に何を言うか見たい',
        ko: '새로운 대화나 스토리가 나왔어 — 자그레우스가 다음에 뭘 말할지 보고 싶어',
        de: 'Ich habe neue Dialoge oder Story bekommen — und ich will sehen, was Zagreus als nächstes sagt',
        type: 'hades',
      },
      {
        en: 'The last run unlocked a new character or weapon and I want to try it immediately',
        zh: '上一局解锁了一个新角色或武器，我想立即尝试',
        zhTW: '上一局解鎖了一個新角色或武器，我想立即嘗試',
        ja: '前のランで新キャラや新武器がアンロックされた——すぐ試したい',
        ko: '지난 런에서 새 캐릭터나 무기가 언락됐어 — 당장 써보고 싶어',
        de: 'Der letzte Run hat einen neuen Charakter oder eine neue Waffe freigeschaltet, und ich will sie sofort ausprobieren',
        type: 'vampire-survivors',
      },
      {
        en: 'I saw a card synergy that almost worked and I want to build around it properly',
        zh: '我看到一个几乎奏效的卡牌协同效应，我想要围绕它正确构建',
        zhTW: '我看到一個幾乎奏效的卡牌協同效應，我想要圍繞它正確構建',
        ja: 'もう少しで機能するカードシナジーを見つけた——今度はちゃんとそれを軸にデッキを組みたい',
        ko: '거의 통할 뻔한 카드 시너지를 봤어 — 이번엔 제대로 그걸 중심으로 덱을 구성하고 싶어',
        de: 'Ich habe eine Karten-Synergie gesehen, die fast funktioniert hätte, und ich will ein Deck drumherum bauen',
        type: 'slay-the-spire',
      },
      {
        en: 'That joker combination was so close to breaking the game — I want to recreate it better',
        zh: '那个小丑组合离攻破游戏如此之近——我想要更好地重现它',
        zhTW: '那個小丑組合離攻破遊戲如此之近——我想要更好地重現它',
        ja: 'あのジョーカーの組み合わせ、ゲームを壊すすぐそこまで来てた——もっとうまく再現したい',
        ko: '그 조커 조합이 게임을 깨는 데 거의 다 왔었어 — 더 잘 재현하고 싶어',
        de: 'Diese Joker-Kombination war so nah daran, das Spiel zu brechen — ich will sie besser nachbauen',
        type: 'balatro',
      },
    ],
  },
  {
    q_en: 'Which of these describes your ideal gaming session best?',
    q_zh: '以下哪个最能描述你的理想游戏时段？',
    q_zhTW: '以下哪個最能描述你的理想遊戲時段？',
    q_ja: '次のうち、あなたの理想的なゲームセッションを一番よく表しているのはどれ？',
    q_ko: '다음 중 당신의 이상적인 게임 세션을 가장 잘 설명하는 것은?',
    q_de: 'Welches beschreibt deine ideale Gaming-Session am besten?',
    options: [
      {
        en: '"I escaped — it took 20 tries and I finally understand why this game is so acclaimed"',
        zh: '"我逃脱了——花了 20 次尝试，我终于明白为什么这款游戏如此受到好评"',
        zhTW: '"我逃脫了——花了 20 次嘗試，我終於明白為什麼這款遊戲如此受到好評"',
        ja: '「脱出できた——20回かかったけど、なぜこのゲームがこんなに高評価なのか、やっと分かった」',
        ko: '"탈출했어 — 20번 걸렸지만 왜 이 게임이 이렇게 극찬받는지 드디어 알겠어"',
        de: '"Ich bin entkommen — es hat 20 Versuche gebraucht, und jetzt verstehe ich endlich, warum dieses Spiel so gefeiert wird"',
        type: 'hades',
      },
      {
        en: '"I watched 500 enemies die in 25 minutes and my brain is pleasantly empty"',
        zh: '"我看着 500 个敌人在 25 分钟内死亡，我的大脑愉快地空了"',
        zhTW: '"我看著 500 個敵人在 25 分鐘內死亡，我的大腦愉快地空了"',
        ja: '「25分で敵が500体死ぬのを眺めて、頭の中が気持ちよく空っぽになった」',
        ko: '"25분 만에 적 500마리가 죽는 걸 봤고, 머리가 기분 좋게 비워졌어"',
        de: '"Ich habe 500 Feinde in 25 Minuten sterben sehen, und mein Gehirn ist angenehm leer"',
        type: 'vampire-survivors',
      },
      {
        en: '"I finally assembled the Catalyst + Corruption build and it was as broken as the internet said"',
        zh: '"我终于组建了催化剂 + 堕落构建，它和网上说的一样强大"',
        zhTW: '"我終於組建了催化劑 + 墮落構建，它和網上說的一樣強大"',
        ja: '「ついにカタリスト＋コラプションビルドを完成させた。ネットで言われてた通り、本当に壊れてた」',
        ko: '"드디어 촉매제 + 타락 빌드를 완성했어, 인터넷에서 말하던 대로 정말 사기였어"',
        de: '"Ich habe endlich das Catalyst + Corruption-Build zusammengestellt, und es war so overpowered wie das Internet es beschrieben hat"',
        type: 'slay-the-spire',
      },
      {
        en: '"I had a x800 multiplier hand and I have been thinking about it all day"',
        zh: '"我有一手 x800 乘数，我整天都在想着它"',
        zhTW: '"我有一手 x800 乘數，我整天都在想著它"',
        ja: '「x800倍率ハンドが出て、その後ずっと頭から離れない」',
        ko: '"x800 배율 핸드가 나왔는데 하루종일 그 생각만 해"',
        de: '"Ich hatte eine x800-Multiplikator-Hand, und ich denke den ganzen Tag daran"',
        type: 'balatro',
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
  hades: {
    title_en: 'Hades',
    title_zh: '黑帝斯',
    title_zhTW: '黑帝斯',
    title_ja: 'ハデス',
    title_ko: '하데스',
    title_de: 'Hades',
    emoji: '⚔️',
    tag_en: 'The story roguelike that fixed every complaint about roguelikes — perfect for cozy-game fans',
    tag_zh: '解决了所有 roguelike 投诉的故事 roguelike——完美适合 cozy 游戏粉丝',
    tag_zhTW: '解決了所有 roguelike 詬病的敘事 roguelike——完美適合 cozy 遊戲愛好者',
    tag_ja: 'ローグライクへのすべての不満を解消した物語系ローグライク——コージーゲームファンに最適',
    tag_ko: '로그라이크에 대한 모든 불만을 해결한 스토리 로그라이크 — 코지 게임 팬에게 완벽',
    tag_de: 'Das Story-Roguelike, das alle Roguelike-Beschwerden beseitigte — perfekt für Fans gemütlicher Spiele',
    platform_en: 'Available on: PC (Steam/Epic), Nintendo Switch, PlayStation 4/5, Xbox — about $25',
    platform_zh: '可在以下平台获取：PC（Steam/Epic）、Nintendo Switch、PlayStation 4/5、Xbox——约 25 美元',
    platform_zhTW: '可在以下平台取得：PC（Steam/Epic）、Nintendo Switch、PlayStation 4/5、Xbox——約 25 美元',
    platform_ja: '対応プラットフォーム：PC（Steam/Epic）、Nintendo Switch、PlayStation 4/5、Xbox——約2,500円〜',
    platform_ko: '플랫폼: PC(Steam/Epic), 닌텐도 스위치, PlayStation 4/5, Xbox — 약 25달러',
    platform_de: 'Erhältlich auf: PC (Steam/Epic), Nintendo Switch, PlayStation 4/5, Xbox — ca. 25 €',
    why_en:
      "Hades won Game of the Year at multiple award shows in 2020 and is widely credited with popularizing narrative roguelikes — games where dying is not just a mechanical reset but a story beat. You play as Zagreus, son of Hades, trying to escape the Underworld. Every time you die, you return to start and have new conversations with the gods, your father, and the permanent cast of characters. The story only advances when you die. The combat is fast and satisfying action, and you collect boons from the gods of Olympus each run. At around 50-100 hours to see all the story, it is one of the deepest experiences of the last decade. Supergiant Games' masterpiece. Hades II (sequel) is in early access as of 2024.",
    why_zh:
      '黑帝斯在 2020 年的多个颁奖典礼上赢得年度最佳游戏，并被广泛认为推广了叙事 roguelike——死亡不仅仅是机械重置而是故事节拍的游戏。你扮演冥王哈迪斯的儿子扎格列乌斯，试图逃出冥界。每次你死亡，你返回起点，与神明、你的父亲和固定角色有新的对话。故事只在你死亡时推进。战斗是快速且令人满足的动作，每次运行你从奥林匹斯神明那里收集祝福。大约需要 50-100 小时才能看完所有故事，这是过去十年最深度的体验之一。Supergiant Games 的杰作。黑帝斯 II（续集）截至 2024 年处于抢先体验阶段。',
    why_zhTW:
      '黑帝斯在 2020 年的多個頒獎典禮上贏得年度最佳遊戲，並被廣泛認為推廣了敘事 roguelike——死亡不僅僅是機械重置而是故事節拍的遊戲。你扮演冥王黑帝斯的兒子薩格雷烏斯，試圖逃出冥界。每次你死亡，你返回起點，與神明、你的父親和固定角色有新的對話。故事只在你死亡時推進。戰鬥是快速且令人滿足的動作，每次遊玩你從奧林匹斯神明那裡收集祝福。大約需要 50-100 小時才能看完所有故事，這是過去十年最深度的體驗之一。Supergiant Games 的傑作。黑帝斯 II（續集）截至 2024 年處於搶先體驗階段。',
    why_ja:
      'ハデスは2020年の複数の授賞式でGame of the Yearを受賞し、物語系ローグライク——死ぬことが単なるリセットではなくストーリーの一部となるゲーム——を広めたタイトルとして広く知られています。あなたはハデスの息子ザグレウスとなり、冥界からの脱出を目指します。死ぬたびに起点に戻り、神々や父親、固定キャラクターたちと新しい会話が生まれます。ストーリーは死ぬことで進展します。戦闘は爽快なアクションで、毎回オリンポスの神々から恩恵を選べます。全ストーリーを見るには50〜100時間ほどかかり、過去十年でも屈指の深みのある体験です。Supergiant Gamesの傑作。ハデスII（続編）は2024年時点でアーリーアクセス中です。',
    why_ko:
      '하데스는 2020년 여러 시상식에서 올해의 게임을 수상했으며, 죽음이 단순한 리셋이 아닌 스토리의 일부가 되는 내러티브 로그라이크를 대중화한 게임으로 널리 인정받고 있습니다. 하데스의 아들 자그레우스가 되어 저승에서 탈출을 시도합니다. 죽을 때마다 시작점으로 돌아가 신들, 아버지, 고정 캐릭터들과 새로운 대화를 나눕니다. 스토리는 죽음을 통해서만 진행됩니다. 전투는 빠르고 만족스러운 액션이며, 매 런마다 올림포스 신들로부터 혜택을 수집합니다. 모든 스토리를 보려면 약 50-100시간이 필요하며, 지난 10년간 가장 깊이 있는 경험 중 하나입니다. Supergiant Games의 걸작. 하데스 II(속편)는 2024년 기준 얼리 액세스 중입니다.',
    why_de:
      'Hades gewann 2020 bei mehreren Preisverleihungen den Game of the Year Award und gilt weithin als der Titel, der narrative Roguelikes populär machte — Spiele, bei denen der Tod nicht nur ein mechanischer Reset, sondern ein Erzählmoment ist. Du spielst Zagreus, den Sohn von Hades, der versucht, aus der Unterwelt zu entkommen. Jedes Mal, wenn du stirbst, kehrst du zum Start zurück und führst neue Gespräche mit Göttern, deinem Vater und dem festen Charaktercast. Die Story schreitet nur voran, wenn du stirbst. Der Kampf ist schnelles, befriedigendes Action-Gameplay, und du sammelst bei jedem Run Gunstbezeugungen der olympischen Götter. Mit etwa 50-100 Stunden, um alle Story zu sehen, ist es eines der tiefgründigsten Erlebnisse des letzten Jahrzehnts. Das Meisterwerk von Supergiant Games. Hades II (Nachfolger) befindet sich seit 2024 im Early Access.',
    tip_en: "Focus on one weapon and one or two consistent boon gods per run — deep synergy beats spread-out variety every time.",
    tip_zh: '每次运行专注于一种武器和一两个稳定的神明祝福——深度协同效应每次都胜过广撒网的多样性。',
    tip_zhTW: '每次遊玩專注於一種武器和一兩個穩定的神明祝福——深度協同效應每次都勝過廣撒網的多樣性。',
    tip_ja: '毎回、1つの武器と1〜2つの安定した神の恩恵に絞って集中しよう——広く浅くよりも、深いシナジーの方が常に強い。',
    tip_ko: '매 런마다 무기 하나와 안정적인 신 혜택 한두 가지에 집중해 — 넓게 펼치는 다양성보다 깊은 시너지가 항상 이겨.',
    tip_de: 'Konzentriere dich pro Run auf eine Waffe und ein oder zwei konsistente Götter-Boons — tiefe Synergie schlägt breit gestreute Vielfalt jedes Mal.',
  },
  'vampire-survivors': {
    title_en: 'Vampire Survivors',
    title_zh: '吸血鬼幸存者',
    title_zhTW: '吸血鬼倖存者',
    title_ja: 'ヴァンパイア・サバイバーズ',
    title_ko: '뱀파이어 서바이버즈',
    title_de: 'Vampire Survivors',
    emoji: '🧛',
    tag_en: 'The most addictive $3 game ever made — pure number-go-up bullet heaven',
    tag_zh: '有史以来最上瘾的 3 美元游戏——纯粹的数字上涨弹幕天堂',
    tag_zhTW: '史上最上癮的 3 美元遊戲——純粹的數字上漲彈幕天堂',
    tag_ja: '史上最も中毒性の高い3ドルゲーム——純粋な数字が増えていくバレットヘブン',
    tag_ko: '역대 가장 중독성 있는 3달러 게임 — 순수한 숫자 상승 불릿 헤븐',
    tag_de: 'Das süchtig machendste 3-Dollar-Spiel aller Zeiten — reines Bullet-Heaven mit steigenden Zahlen',
    platform_en: 'Available on: PC (Steam), iOS, Android, Nintendo Switch, Xbox (Game Pass) — about $3-5',
    platform_zh: '可在以下平台获取：PC（Steam）、iOS、Android、Nintendo Switch、Xbox（Game Pass）——约 3-5 美元',
    platform_zhTW: '可在以下平台取得：PC（Steam）、iOS、Android、Nintendo Switch、Xbox（Game Pass）——約 3-5 美元',
    platform_ja: '対応プラットフォーム：PC（Steam）、iOS、Android、Nintendo Switch、Xbox（Game Pass）——約300〜500円',
    platform_ko: '플랫폼: PC(Steam), iOS, Android, 닌텐도 스위치, Xbox(Game Pass) — 약 3-5달러',
    platform_de: 'Erhältlich auf: PC (Steam), iOS, Android, Nintendo Switch, Xbox (Game Pass) — ca. 3-5 €',
    why_en:
      "Vampire Survivors is one of the most remarkable success stories in gaming history. A solo developer released it for $3, it sold millions of copies, and it spawned an entire genre. You move a character around an arena; weapons fire automatically. Hundreds of enemies swarm you. You pick upgrades at level-up. The goal is to survive 30 minutes. The game requires almost no real-time decision-making — you choose upgrades, then watch your character become progressively more powerful until the screen is a sea of effects and explosions. It is deeply, irrationally satisfying in the way that watching numbers increase always is. New characters, stages, and unlocks keep the loop fresh. Available on Xbox Game Pass. The mobile version is free with ads or a one-time $3 purchase to remove them.",
    why_zh:
      '吸血鬼幸存者是游戏史上最非凡的成功案例之一。一个独立开发者以 3 美元发布了它，销售了数百万份，并催生了整个游戏类型。你在竞技场中移动角色；武器自动射击。数百个敌人向你涌来。你在升级时选择强化项。目标是存活 30 分钟。这款游戏几乎不需要实时决策——你选择升级，然后看着你的角色变得越来越强大，直到屏幕成为效果和爆炸的海洋。它以数字增加所特有的方式带来深度的、非理性的满足感。新角色、新关卡和新解锁项持续保持循环的新鲜感。可在 Xbox Game Pass 上获取。手机版本有广告免费，或一次性 3 美元购买去除广告。',
    why_zhTW:
      '吸血鬼倖存者是遊戲史上最非凡的成功案例之一。一位獨立開發者以 3 美元發布了它，銷售了數百萬份，並催生了整個遊戲類型。你在競技場中移動角色；武器自動射擊。數百個敵人向你湧來。你在升級時選擇強化項。目標是存活 30 分鐘。這款遊戲幾乎不需要即時決策——你選擇升級，然後看著你的角色變得越來越強大，直到螢幕成為效果和爆炸的海洋。它以數字增加所特有的方式帶來深度的、非理性的滿足感。新角色、新關卡和新解鎖項持續保持循環的新鮮感。可在 Xbox Game Pass 上取得。手機版本有廣告免費，或一次性 3 美元購買去除廣告。',
    why_ja:
      'ヴァンパイア・サバイバーズはゲーム史上最も驚くべき成功例の一つです。ひとりの開発者が3ドルでリリースし、数百万本を売り上げ、ひとつのジャンルを生み出しました。プレイヤーはアリーナでキャラクターを動かし、武器は自動で発射されます。数百の敵が押し寄せてくる中、レベルアップ時に強化アイテムを選びます。目標は30分生き残ること。このゲームはほとんどリアルタイムの判断を必要とせず、強化を選んでキャラクターがどんどん強くなるのを眺めるだけで、最終的に画面がエフェクトと爆発で埋め尽くされます。数字が増えていくことの、深く理不尽な満足感があります。新キャラ、新ステージ、新アンロックでループは常に新鮮。Xbox Game Passでもプレイ可能。スマホ版は広告ありで無料、3ドルで広告を削除できます。',
    why_ko:
      '뱀파이어 서바이버즈는 게임 역사상 가장 놀라운 성공 사례 중 하나입니다. 솔로 개발자가 3달러에 출시해 수백만 장을 판매하며 하나의 장르를 만들었습니다. 아레나에서 캐릭터를 움직이면 무기가 자동으로 발사됩니다. 수백 명의 적이 몰려오는 가운데 레벨업 시 강화 항목을 선택합니다. 목표는 30분 생존. 이 게임은 실시간 의사결정이 거의 필요 없으며, 업그레이드를 선택하고 캐릭터가 점점 강해져 화면이 이펙트와 폭발로 가득 찰 때까지 지켜보면 됩니다. 숫자가 올라가는 것이 주는 깊고 비이성적인 만족감이 있습니다. 새 캐릭터, 새 스테이지, 새 언락으로 루프의 신선함이 유지됩니다. Xbox Game Pass에서 이용 가능. 모바일 버전은 광고 포함 무료이거나 3달러로 광고 제거.',
    why_de:
      'Vampire Survivors ist eine der bemerkenswertesten Erfolgsgeschichten der Spielegeschichte. Ein Solo-Entwickler veröffentlichte es für 3 Dollar, verkaufte Millionen von Exemplaren und begründete damit ein ganzes Genre. Du bewegst einen Charakter durch eine Arena; Waffen schießen automatisch. Hunderte von Feinden stürmen auf dich ein. Du wählst beim Levelaufstieg Upgrades aus. Das Ziel ist es, 30 Minuten zu überleben. Das Spiel erfordert kaum Echtzeit-Entscheidungen — du wählst Upgrades und beobachtest, wie dein Charakter immer mächtiger wird, bis der Bildschirm ein Meer aus Effekten und Explosionen ist. Es ist tief, irrational befriedigend auf die Art, wie es das Ansteigen von Zahlen immer ist. Neue Charaktere, Stages und Freischaltungen halten den Loop frisch. Auf Xbox Game Pass verfügbar. Die Mobilversion ist kostenlos mit Werbung oder 3 Dollar für die werbefreie Version.',
    tip_en: "Aim for weapon evolutions by pairing each base weapon with its matching passive item at max level — the evolved weapons are dramatically more powerful.",
    tip_zh: '通过将每种基础武器与其匹配的满级被动物品配对来追求武器进化——进化后的武器强力得多。',
    tip_zhTW: '透過將每種基礎武器與其匹配的滿級被動道具配對來追求武器進化——進化後的武器強力得多。',
    tip_ja: '各基本武器を対応する最大レベルのパッシブアイテムと組み合わせて武器進化を目指そう——進化後の武器は段違いに強くなる。',
    tip_ko: '각 기본 무기를 대응하는 최고 레벨 패시브 아이템과 조합해 무기 진화를 노려 — 진화한 무기는 훨씬 강력해.',
    tip_de: 'Strebe nach Waffenentwicklungen, indem du jede Basiswaffe mit ihrem passenden passiven Item auf Maximallevel kombinierst — die entwickelten Waffen sind dramatisch stärker.',
  },
  'slay-the-spire': {
    title_en: 'Slay the Spire',
    title_zh: '杀戮尖塔',
    title_zhTW: '殺戮尖塔',
    title_ja: 'Slay the Spire',
    title_ko: '슬레이 더 스파이어',
    title_de: 'Slay the Spire',
    emoji: '🃏',
    tag_en: 'The deckbuilder that defined a genre — elegant, deep, infinitely replayable',
    tag_zh: '定义了一个类型的卡组构建游戏——优雅、深度、无限可重玩',
    tag_zhTW: '定義了一個類型的牌組構建遊戲——優雅、深度、無限可重玩',
    tag_ja: 'デッキ構築ローグライクを定義した一作——エレガントで深く、いつまでもプレイできる',
    tag_ko: '하나의 장르를 정의한 덱빌더 — 우아하고 깊으며 무한히 다시 플레이 가능',
    tag_de: 'Der Deckbuilder, der ein Genre definierte — elegant, tiefgründig, unendlich wiederholbar',
    platform_en: 'Available on: PC (Steam), iOS, Android, Nintendo Switch, PlayStation 4 — about $25',
    platform_zh: '可在以下平台获取：PC（Steam）、iOS、Android、Nintendo Switch、PlayStation 4——约 25 美元',
    platform_zhTW: '可在以下平台取得：PC（Steam）、iOS、Android、Nintendo Switch、PlayStation 4——約 25 美元',
    platform_ja: '対応プラットフォーム：PC（Steam）、iOS、Android、Nintendo Switch、PlayStation 4——約2,500円',
    platform_ko: '플랫폼: PC(Steam), iOS, Android, 닌텐도 스위치, PlayStation 4 — 약 25달러',
    platform_de: 'Erhältlich auf: PC (Steam), iOS, Android, Nintendo Switch, PlayStation 4 — ca. 25 €',
    why_en:
      "Slay the Spire is the game that established deckbuilding roguelikes as a genre, and it remains the standard by which all others are measured. You choose one of four characters, each with a unique card set, and climb a branching dungeon. At each node you fight enemies using cards, find relics, visit shops, and deal with events. The key is your deck: every card you add or remove shapes what future turns look like. Synergies compound in ways that feel like solving a puzzle — the Defect's orb-stacking strategies, the Silent's poison chains, the Ironclad's strength scaling. Each run takes 45-90 minutes. Four characters and an Ascension difficulty system give hundreds of hours of content. One of the most influential games made in the past decade.",
    why_zh:
      '杀戮尖塔是建立卡组构建 roguelike 作为一个类型的游戏，它仍然是所有其他游戏被衡量的标准。你选择四个角色之一，每个角色有独特的牌组，攀登一个分支地牢。在每个节点你使用卡牌战斗敌人、找到遗物、访问商店，以及处理事件。关键是你的牌组：你添加或移除的每张牌都塑造了未来回合的样貌。协同效应以感觉像解谜的方式叠加——电子人的球体叠加策略、沉默者的毒素链、铁甲的力量缩放。每局大约需要 45-90 分钟。四个角色和一个升天难度系统提供数百小时的内容。过去十年中最具影响力的游戏之一。',
    why_zhTW:
      '殺戮尖塔是建立牌組構建 roguelike 作為一個類型的遊戲，至今仍是所有同類遊戲被衡量的標準。你選擇四個角色之一，每個角色有獨特的牌組，攀登一個分支地牢。在每個節點你使用卡牌戰鬥敵人、找到遺物、訪問商店，以及處理事件。關鍵是你的牌組：你添加或移除的每張牌都塑造了未來回合的樣貌。協同效應以感覺像解謎的方式疊加——電子人的球體疊加策略、靜默者的毒素鏈、鐵甲的力量縮放。每局大約需要 45-90 分鐘。四個角色和一個昇天難度系統提供數百小時的內容。過去十年中最具影響力的遊戲之一。',
    why_ja:
      'Slay the Spireはデッキ構築ローグライクというジャンルを確立したゲームで、今もなおすべての後続作品の基準となっています。4人のキャラクターから1人を選び、それぞれ固有のカードセットを持って分岐するダンジョンを攻略します。各ノードではカードで戦い、レリックを拾い、ショップに寄り、イベントをこなします。核心はデッキ——追加・削除するカードがすべて、未来のターンの形を決定します。シナジーはまるでパズルを解くように積み重なります——ディフェクトのオーブスタック戦略、サイレントの毒チェーン、アイアンクラッドの筋力スケール。各ランは45〜90分。4キャラクターと昇天難度システムで数百時間のコンテンツが待っています。過去十年で最も影響力のあるゲームの一つです。',
    why_ko:
      '슬레이 더 스파이어는 덱빌딩 로그라이크라는 장르를 확립한 게임으로, 지금도 모든 후속 게임의 기준이 됩니다. 고유한 카드 세트를 가진 4명의 캐릭터 중 하나를 선택해 분기하는 던전을 오릅니다. 각 노드에서 카드로 적과 싸우고, 유물을 찾고, 상점을 방문하고, 이벤트를 처리합니다. 핵심은 덱입니다: 추가하거나 제거하는 카드 하나하나가 미래 턴의 모습을 결정합니다. 시너지는 퍼즐을 푸는 것처럼 쌓입니다 — 디펙트의 오브 스태킹 전략, 사일런트의 독 체인, 아이언클래드의 힘 스케일링. 각 런은 45-90분. 4개의 캐릭터와 승천 난이도 시스템으로 수백 시간의 콘텐츠가 있습니다. 지난 10년간 가장 영향력 있는 게임 중 하나.',
    why_de:
      'Slay the Spire ist das Spiel, das Deckbuilding-Roguelikes als Genre etablierte, und es bleibt der Maßstab, an dem alle anderen gemessen werden. Du wählst einen von vier Charakteren mit jeweils einzigartigen Karten und erklimmst einen verzweigten Dungeon. An jedem Knoten kämpfst du mit Karten, findest Relikte, besuchst Geschäfte und bewältigst Ereignisse. Der Schlüssel ist dein Deck: Jede Karte, die du hinzufügst oder entfernst, bestimmt, wie zukünftige Runden aussehen. Synergien häufen sich an auf eine Art, die sich wie Puzzlelösen anfühlt — die Orb-Stacking-Strategien des Defekts, die Giftketten der Stille, das Stärke-Scaling des Eisenherzogs. Jeder Run dauert 45-90 Minuten. Vier Charaktere und ein Aufstiegssystem bieten Hunderte von Stunden Inhalt. Eines der einflussreichsten Spiele des vergangenen Jahrzehnts.',
    tip_en: "Draft a consistent strategy around one or two synergies instead of picking the strongest individual card each time — the run that wins has focus.",
    tip_zh: '围绕一两个协同效应制定一致的策略，而不是每次都选最强的单张牌——获胜的那局是有焦点的。',
    tip_zhTW: '圍繞一兩個協同效應制定一致的策略，而不是每次都選最強的單張牌——獲勝的那局是有焦點的。',
    tip_ja: 'その都度最強のカード1枚を選ぶのではなく、1〜2つのシナジーを軸に一貫した戦略を組み立てよう——勝てるランには焦点がある。',
    tip_ko: '매번 가장 강한 카드 하나를 고르는 대신 한두 개의 시너지를 중심으로 일관된 전략을 세워 — 이기는 런은 집중력이 있어.',
    tip_de: 'Entwickle eine konsistente Strategie um ein oder zwei Synergien, anstatt jedes Mal die stärkste Einzelkarte zu wählen — der Run, der gewinnt, hat Fokus.',
  },
  balatro: {
    title_en: 'Balatro',
    title_zh: 'Balatro',
    title_zhTW: 'Balatro',
    title_ja: 'Balatro',
    title_ko: 'Balatro',
    title_de: 'Balatro',
    emoji: '🃏',
    tag_en: 'Poker deckbuilder — Game of the Year 2024, the most "one more run" game ever made',
    tag_zh: '扑克卡组构建——2024 年度最佳游戏，有史以来最让人"再来一局"的游戏',
    tag_zhTW: '撲克牌組構建——2024 年度最佳遊戲，史上最讓人「再來一局」的遊戲',
    tag_ja: 'ポーカーデッキビルダー——2024年Game of the Year、史上最も「もう一回」を誘うゲーム',
    tag_ko: '포커 덱빌더 — 2024 올해의 게임, 역대 가장 "한 판 더" 하게 만드는 게임',
    tag_de: 'Poker-Deckbuilder — Game of the Year 2024, das "noch eine Runde"-Spiel schlechthin',
    platform_en: 'Available on: PC (Steam), Nintendo Switch, PlayStation 4/5, Xbox, iOS, Android — about $15',
    platform_zh: '可在以下平台获取：PC（Steam）、Nintendo Switch、PlayStation 4/5、Xbox、iOS、Android——约 15 美元',
    platform_zhTW: '可在以下平台取得：PC（Steam）、Nintendo Switch、PlayStation 4/5、Xbox、iOS、Android——約 15 美元',
    platform_ja: '対応プラットフォーム：PC（Steam）、Nintendo Switch、PlayStation 4/5、Xbox、iOS、Android——約1,500円',
    platform_ko: '플랫폼: PC(Steam), 닌텐도 스위치, PlayStation 4/5, Xbox, iOS, Android — 약 15달러',
    platform_de: 'Erhältlich auf: PC (Steam), Nintendo Switch, PlayStation 4/5, Xbox, iOS, Android — ca. 15 €',
    why_en:
      "Balatro won Game of the Year at multiple major ceremonies in 2024 and became one of the most-discussed games of the year. The premise sounds simple: it is poker, but you can modify the rules. You buy Joker cards that add scoring multipliers to your hands. You can add or remove cards from the deck, change what hands exist, apply upgrades to specific cards. The goal is to score enough points across 8 rounds of poker hands to beat a boss. What makes Balatro special is the discovery: finding a combination of Jokers that turns a modest pair into a x800 multiplier is one of the most dopamine-delivering moments in gaming. It starts simple and becomes unfathomably deep. The runs are short enough (20-60 minutes) to make 'one more' always feel reasonable. A masterpiece of game design from solo developer LocalThunk.",
    why_zh:
      'Balatro 在 2024 年的多个主要颁奖典礼上赢得年度最佳游戏，成为年度最受讨论的游戏之一。前提听起来很简单：这是扑克，但你可以修改规则。你购买为你的手牌增加计分乘数的小丑牌。你可以添加或移除牌组中的牌，改变存在哪些牌型，为特定牌应用升级。目标是在 8 轮扑克手牌中积累足够的分数来击败一个 Boss。使 Balatro 特别的是发现：找到一组将普通的一对变成 x800 乘数的小丑牌组合是游戏中最令人多巴胺飙升的时刻之一。它从简单开始变得深不可测。每局足够短（20-60 分钟），使"再来一局"总是感觉合理。独立开发者 LocalThunk 的游戏设计杰作。',
    why_zhTW:
      'Balatro 在 2024 年的多個主要頒獎典禮上贏得年度最佳遊戲，成為年度最受討論的遊戲之一。前提聽起來很簡單：這是撲克，但你可以修改規則。你購買為你的手牌增加計分乘數的小丑牌。你可以添加或移除牌組中的牌，改變存在哪些牌型，為特定牌應用升級。目標是在 8 輪撲克手牌中積累足夠的分數來擊敗一個 Boss。使 Balatro 特別的是發現：找到一組將普通的一對變成 x800 乘數的小丑牌組合是遊戲中最令人多巴胺飆升的時刻之一。它從簡單開始變得深不可測。每局足夠短（20-60 分鐘），使「再來一局」總是感覺合理。獨立開發者 LocalThunk 的遊戲設計傑作。',
    why_ja:
      'Balatoは2024年の複数の主要授賞式でGame of the Yearを受賞し、その年最も話題になったゲームの一つとなりました。前提はシンプルに聞こえます：ポーカーですが、ルールを改変できます。ハンドにスコア乗数を加えるジョーカーカードを購入できます。デッキにカードを追加・削除したり、存在する役を変えたり、特定のカードにアップグレードを適用したりできます。目標は8ラウンドのポーカーハンドで十分なポイントを稼いでボスを倒すこと。Balatoが特別な理由は発見にあります：地味な一対のペアをx800乗数に変えるジョーカーの組み合わせを見つける瞬間は、ゲームの中でも最高に気持ちいい体験の一つです。シンプルに始まり、底知れない深さへと進化します。各ランは短め（20〜60分）なので、「もう一回」がいつも自然に感じられます。ソロ開発者LocalThunkによるゲームデザインの傑作。',
    why_ko:
      'Balatro는 2024년 여러 주요 시상식에서 올해의 게임을 수상하며 그해 가장 많이 화제가 된 게임 중 하나가 됐습니다. 전제는 간단하게 들립니다: 포커인데, 규칙을 바꿀 수 있습니다. 핸드에 점수 배율을 추가하는 조커 카드를 구매합니다. 덱에서 카드를 추가하거나 제거하고, 어떤 패가 존재하는지 바꾸고, 특정 카드에 업그레이드를 적용할 수 있습니다. 목표는 8라운드의 포커 핸드에서 충분한 점수를 쌓아 보스를 이기는 것입니다. Balatro가 특별한 이유는 발견에 있습니다: 평범한 원 페어를 x800 배율로 만드는 조커 조합을 찾는 순간은 게임에서 가장 도파민이 솟구치는 순간 중 하나입니다. 단순하게 시작해서 헤아릴 수 없을 만큼 깊어집니다. 각 런은 충분히 짧아서(20-60분) "한 판 더"가 항상 합리적으로 느껴집니다. 솔로 개발자 LocalThunk의 게임 디자인 걸작.',
    why_de:
      'Balatro gewann 2024 bei mehreren großen Preisverleihungen den Game of the Year Award und wurde zu einem der meistdiskutierten Spiele des Jahres. Die Prämisse klingt einfach: Es ist Poker, aber du kannst die Regeln ändern. Du kaufst Joker-Karten, die deinen Händen Punktemultiplikatoren hinzufügen. Du kannst Karten zum Deck hinzufügen oder entfernen, ändern, welche Hände existieren, und spezifische Karten aufwerten. Das Ziel ist es, über 8 Runden Pokerhände genug Punkte zu sammeln, um einen Boss zu besiegen. Was Balatro besonders macht, ist die Entdeckung: Eine Joker-Kombination zu finden, die ein bescheidenes Pärchen in einen x800-Multiplikator verwandelt, ist einer der dopaminreichsten Momente im Gaming. Es beginnt einfach und wird unergründlich tief. Die Runs sind kurz genug (20-60 Minuten), damit "noch eine Runde" sich immer vernünftig anfühlt. Ein Meisterwerk des Spieldesigns vom Solo-Entwickler LocalThunk.',
    tip_en: "Prioritize Jokers that apply to multiple hand types over Jokers that boost a single specific hand — flexibility compounds across the full 8-round run.",
    tip_zh: '优先选择适用于多种牌型的小丑牌，而不是强化单一特定牌型的小丑牌——灵活性在整个 8 轮运行中会积累。',
    tip_zhTW: '優先選擇適用於多種牌型的小丑牌，而不是強化單一特定牌型的小丑牌——靈活性在整個 8 輪遊玩中會積累。',
    tip_ja: '特定の手役だけを強化するジョーカーよりも、複数の手役に対応するジョーカーを優先しよう——汎用性は8ラウンド全体を通じて積み重なっていく。',
    tip_ko: '하나의 특정 패에 집중하는 조커보다 여러 패에 적용되는 조커를 우선시해 — 유연성이 8라운드 전체에 걸쳐 쌓여.',
    tip_de: 'Priorisiere Joker, die auf mehrere Handtypen zutreffen, über Joker, die eine einzige bestimmte Hand boosten — Flexibilität summiert sich über den gesamten 8-Runden-Run.',
  },
}

function calcResult(answers: Pick[]): Pick {
  const counts: Record<Pick, number> = {
    hades: 0,
    'vampire-survivors': 0,
    'slay-the-spire': 0,
    balatro: 0,
  }
  for (const a of answers) counts[a]++
  return Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0] as Pick
}

export function CozyRoguelikeQuiz({ locale }: { locale: string }) {
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
    const url = `${BASE_URL}/${locale}/quizzes/cozy-roguelike-quiz`
    const shareText = getLoc(
      `我的入门 Roguelike 推荐是「${result.title_zh}」！${result.tag_zh}。找到你的：${url}`,
      `My starter roguelike match is ${result.title_en} — ${result.tag_en}. Find yours: ${url}`,
      `我的入門 Roguelike 推薦是「${result.title_zhTW}」！${result.tag_zhTW}。找到你的：${url}`,
      `私のおすすめ入門ローグライクは「${result.title_ja}」！${result.tag_ja}。あなたも試して：${url}`,
      `내 입문 로그라이크 추천은 「${result.title_ko}」! ${result.tag_ko}. 나의 결과 찾기: ${url}`,
      `Mein Starter-Roguelike ist ${result.title_de} — ${result.tag_de}. Finde deins: ${url}`,
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
              {getLoc('上手小贴士：', 'Getting started: ', '上手小訣竅：', 'はじめるコツ：', '시작 팁: ', 'Erste Schritte: ')}
            </span>
            {getLoc(result.tip_zh, result.tip_en, result.tip_zhTW, result.tip_ja, result.tip_ko, result.tip_de)}
          </p>
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
            '你应该从哪款 Roguelike 游戏入门？',
            'Which Roguelike Should You Start With?',
            '你應該從哪款 Roguelike 遊戲入門？',
            'どのローグライクから始めるべき？',
            '어떤 로그라이크부터 시작해야 할까?',
            'Welches Roguelike solltest du zuerst spielen?',
          )}
        </h1>
        <p className="text-sm text-[#8a9a7a]">
          {getLoc(
            '6 个问题，在黑帝斯、吸血鬼幸存者、杀戮尖塔和 Balatro 中找到最适合你的轻量 Roguelike 体验',
            '6 questions to find your match across Hades, Vampire Survivors, Slay the Spire, and Balatro — all beginner-friendly, all endlessly replayable',
            '6 個問題，在黑帝斯、吸血鬼倖存者、殺戮尖塔和 Balatro 中找到最適合你的輕量 Roguelike 體驗',
            '6つの質問で、ハデス・ヴァンパイア・サバイバーズ・Slay the Spire・Balatoの中からあなたにぴったりの入門ローグライクを見つけよう',
            '6가지 질문으로 하데스, 뱀파이어 서바이버즈, 슬레이 더 스파이어, Balatro 중 나에게 맞는 입문 로그라이크를 찾아보세요',
            '6 Fragen, um dein perfektes Einstiegs-Roguelike aus Hades, Vampire Survivors, Slay the Spire und Balatro zu finden',
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
          '找到我的 Roguelike',
          'Find My Roguelike',
          '找到我的 Roguelike',
          '私のローグライクを見つける',
          '내 로그라이크 찾기',
          'Mein Roguelike finden',
        )}
      </button>
    </div>
  )
}
