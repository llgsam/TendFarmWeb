'use client'

import { useState } from 'react'
import { BASE_URL } from '@/lib/config'

type Pick = 'sayonara' | 'trombone' | 'necrodancer' | 'melatonin'

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

  const copyLabel = copied
    ? locale === 'zh' ? '✓ 已复制！'
    : locale === 'zh-TW' ? '✓ 已複製！'
    : locale === 'ja' ? '✓ コピーしました！'
    : locale === 'ko' ? '✓ 복사됨！'
    : locale === 'de' ? '✓ Kopiert!'
    : '✓ Copied!'
    : locale === 'zh' ? '📋 复制结果'
    : locale === 'zh-TW' ? '📋 複製結果'
    : locale === 'ja' ? '📋 結果をコピー'
    : locale === 'ko' ? '📋 결과 복사'
    : locale === 'de' ? '📋 Ergebnis kopieren'
    : '📋 Copy result'

  const shareLabel =
    locale === 'zh' || locale === 'zh-TW' ? '分享'
    : locale === 'ja' ? 'シェア'
    : locale === 'ko' ? '공유'
    : locale === 'de' ? 'Teilen'
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
    q_en: 'What role does music play in how you want to experience a game?',
    q_zh: '音乐在你想要的游戏体验中扮演什么角色？',
    q_zhTW: '音樂在你想要的遊戲體驗中扮演什麼角色？',
    q_ja: 'ゲームを楽しむうえで、音楽にはどんな役割を求めますか？',
    q_ko: '게임 경험에서 음악이 어떤 역할을 하길 원하시나요?',
    q_de: 'Welche Rolle soll Musik in deinem Spielerlebnis spielen?',
    options: [
      {
        en: 'Music IS the game — I want a cinematic music video I play through, where every visual and movement is synchronized to an original synth-pop soundtrack that tells a wordless love story',
        zh: '音乐就是游戏本身——我想要一个我能玩过去的电影式音乐视频，每一个视觉和动作都与讲述无字爱情故事的原创合成流行音乐同步',
        zhTW: '音樂就是遊戲本身——我想要一個能玩過去的電影式音樂影片，每個視覺和動作都與述說無字愛情故事的原創合成流行樂同步',
        ja: '音楽こそがゲーム——シンセポップのサウンドトラックに全ての映像と動きがシンクロした、映画的なミュージックビデオを体験したい',
        ko: '음악이 곧 게임——모든 비주얼과 움직임이 신스팝 사운드트랙에 동기화된 시네마틱 뮤직비디오를 플레이하고 싶다',
        de: 'Musik IST das Spiel — ich will ein filmisches Musikvideo spielen, bei dem jede Bewegung mit einem originellen Synthpop-Soundtrack synchronisiert ist, der eine wortlose Liebesgeschichte erzählt',
        type: 'sayonara',
      },
      {
        en: 'Music is the joke — I want to use it as a comedic instrument (specifically a trombone I can play badly and hilariously), where hitting every note is less important than the absurdist spectacle of a terrible trombone performance',
        zh: '音乐是玩笑——我想把它用作喜剧乐器（特别是我可以弹得很糟糕且非常搞笑的长号），击中每个音符不如一场糟糕长号表演的荒诞奇景重要',
        zhTW: '音樂是笑料——我想把它當作喜劇樂器（特別是可以彈得糟透的長號），錯音比完美表演更搞笑，觀眾的痛苦反應本身就是獎勵',
        ja: '音楽はギャグ——わざと下手に吹けるトロンボーンで笑いを取るゲームがしたい。音を外すほど面白く、観客の苦悶こそがご褒美',
        ko: '음악이 개그——트롬본을 형편없이 불며 웃음을 만드는 게임을 원한다. 음을 놓칠수록 더 재미있고, 관중의 고통스러운 반응이 보상이다',
        de: 'Musik ist der Witz — ich will ein Instrument (Posaune) absurd schlecht spielen; ein misslungener Ton ist lustiger als ein richtiger, und das Leiden des Publikums ist die eigentliche Belohnung',
        type: 'trombone',
      },
      {
        en: 'Music is the challenge — I want the beat to dictate every action (movement, attacks, item use), and the satisfaction comes from staying in rhythm through increasingly complex procedurally generated environments',
        zh: '音乐是挑战——我想要节拍支配每一个动作（移动、攻击、物品使用），满足感来自在越来越复杂的程序生成环境中保持节奏',
        zhTW: '音樂是挑戰——我想要節拍支配每個動作（移動、攻擊、道具使用），在越來越複雜的程序生成環境中保持節奏才有成就感',
        ja: '音楽は挑戦——ビートに合わせて全ての行動（移動・攻撃・アイテム使用）を決め、複雑なダンジョンでリズムを刻み続ける達成感がほしい',
        ko: '음악이 도전——비트에 맞춰 모든 행동(이동·공격·아이템)을 결정하고, 점점 복잡해지는 던전에서 리듬을 유지하는 성취감을 원한다',
        de: 'Musik ist die Herausforderung — der Beat soll jede Aktion (Bewegung, Angriff, Items) bestimmen; die Erfüllung liegt im Rhythmushalten durch immer komplexere prozedural generierte Umgebungen',
        type: 'necrodancer',
      },
      {
        en: 'Music is the atmosphere — I want a gentle rhythm game set inside dream sequences, where the music is so soft and the visuals so dreamy that success feels like drifting rather than performing',
        zh: '音乐是氛围——我想要一款设定在梦境序列中的温和节奏游戏，音乐如此柔和、视觉如此梦幻，成功感觉像是漂浮而非表演',
        zhTW: '音樂是氛圍——我想要一款設定在夢境中的溫和節奏遊戲，音樂輕柔、畫面夢幻，成功感覺像漂浮而非表演',
        ja: '音楽は雰囲気——夢の中を舞台にした穏やかなリズムゲームで、音楽が柔らかく、成功が演技でなく漂うような感覚を楽しみたい',
        ko: '음악이 분위기——꿈속을 배경으로 한 부드러운 리듬 게임에서, 음악이 너무 잔잔해 성공이 연주가 아닌 떠다니는 느낌인 것을 원한다',
        de: 'Musik ist die Atmosphäre — ein sanftes Rhythmusspiel in Traumsequenzen, wo die Musik so weich und die Optik so verträumt ist, dass sich Erfolg eher wie Treiben als wie Performen anfühlt',
        type: 'melatonin',
      },
    ],
  },
  {
    q_en: 'How long do you want to spend on your first playthrough?',
    q_zh: '你希望第一次游玩花多少时间？',
    q_zhTW: '你希望第一次遊玩花多少時間？',
    q_ja: '最初のプレイでどれくらいの時間をかけたいですか？',
    q_ko: '첫 번째 플레이에 얼마나 시간을 쓰고 싶으신가요?',
    q_de: 'Wie lange möchtest du für deinen ersten Durchlauf brauchen?',
    options: [
      {
        en: 'About 1-2 hours — a short, complete, cinematic experience I can finish in one sitting and immediately want to replay for the S-rank scores and alternate routes I missed',
        zh: '约 1-2 小时——一个我可以一口气完成的短暂、完整、电影式体验，然后立刻想要重玩以获取我错过的 S 级评分和不同路线',
        zhTW: '約 1-2 小時——短暫、完整的電影式體驗，一口氣完成後立刻想重玩追 S 評分和不同路線',
        ja: '約1〜2時間——一気にクリアできる映画的な体験で、すぐにSランクや別ルートを狙って再プレイしたい',
        ko: '약 1~2시간——한 번에 끝낼 수 있는 짧고 완전한 시네마틱 경험, 이후 S랭크와 다른 루트를 노리고 바로 다시 플레이하고 싶다',
        de: 'Etwa 1-2 Stunden — ein kurzes, rundes Erlebnis in einer Sitzung, danach sofort Replay für S-Ranks und alternative Routen',
        type: 'sayonara',
      },
      {
        en: 'A few hours of pure absurdism — I want to play enough songs that I feel the full range of the joke, from "this is funny" to "this is transcendent" to "why am I this invested in hitting a trombone note"',
        zh: '几小时的纯荒诞主义——我想玩足够多的歌曲以感受笑话的全部范围，从"这很有趣"到"这已超然"再到"我为什么对击中一个长号音符如此投入"',
        zhTW: '幾小時的純荒誕主義——玩夠多歌曲以感受笑話的全部範圍，從「有趣」到「超然」再到「我為什麼這麼認真對待長號」',
        ja: '数時間の純粋なナンセンス——「面白い」→「悟り」→「なぜこんなにトロンボーンに本気なの」までジョークの全域を体験したい',
        ko: '몇 시간의 순수한 불조리——「재밌네」에서 「이건 예술이다」, 「왜 나는 트롬본에 이렇게 진심인가」까지 개그의 전 범위를 경험하고 싶다',
        de: 'Einige Stunden purer Absurdismus — genug Songs, um den Witz von „das ist lustig" bis „warum bin ich so investiert" voll auszukosten',
        type: 'trombone',
      },
      {
        en: 'Open-ended — I want a roguelike rhythm game that I can play indefinitely, where each run is a unique procedurally generated dungeon and mastery comes from hundreds of hours of learning the rhythms',
        zh: '开放式——我想要一款我可以无限游玩的 Roguelike 节奏游戏，每次游玩都是独特的程序生成地牢，精通来自数百小时的节奏学习',
        zhTW: '開放式——可以無限遊玩的 Roguelike 節奏遊戲，每次都是獨特的程序生成地牢，精通需要數百小時',
        ja: 'エンドレス——プレイするたびに異なるランダムダンジョンで、何百時間もかけてリズムを体で覚えるローグライクが好み',
        ko: '무한——플레이할 때마다 다른 랜덤 던전으로, 수백 시간에 걸쳐 리듬을 몸으로 익히는 로그라이크를 원한다',
        de: 'Unbegrenzt — ein Roguelike-Rhythmusspiel, das man endlos spielen kann; jeder Run ist ein einzigartiger Dungeon und Meisterschaft kommt durch Hunderte von Stunden',
        type: 'necrodancer',
      },
      {
        en: '3-4 hours for a relaxed first run — the game is divided into short dream chapters I can play in 15-20 minute bursts, and I can replay any dream I liked as many times as I want',
        zh: '轻松的第一次游玩约 3-4 小时——游戏分为我可以用 15-20 分钟爆发游玩的短暂梦境章节，我可以随时重玩任何我喜欢的梦境',
        zhTW: '輕鬆的第一次遊玩約 3-4 小時——分成可用 15-20 分鐘爆發遊玩的短暫夢境章節，隨時可重玩喜歡的夢境',
        ja: '3〜4時間でゆったりと——15〜20分単位で遊べる夢のチャプターに分かれていて、気に入った夢は何度でも再プレイ可能',
        ko: '3~4시간의 여유로운 첫 플레이——15~20분씩 플레이할 수 있는 짧은 꿈 챕터로 나뉘며, 마음에 드는 꿈은 언제든 다시 플레이 가능',
        de: '3-4 Stunden entspannt — das Spiel ist in 15-20-minütige Traumkapitel aufgeteilt, die ich beliebig oft wiederholen kann',
        type: 'melatonin',
      },
    ],
  },
  {
    q_en: 'What kind of challenge do you want from a rhythm game?',
    q_zh: '你想从节奏游戏中获得什么样的挑战？',
    q_zhTW: '你想從節奏遊戲中獲得什麼樣的挑戰？',
    q_ja: 'リズムゲームにどんな難しさを求めますか？',
    q_ko: '리듬 게임에서 어떤 도전을 원하시나요?',
    q_de: 'Welche Art von Herausforderung möchtest du von einem Rhythmusspiel?',
    options: [
      {
        en: 'Light skill expression with replay value — the auto-runner format is forgiving enough to enjoy on a first run, but chasing S-ranks on every level requires memorization and precise timing worth returning for',
        zh: '轻度技巧表达和重玩价值——自动跑酷格式足够宽容以在第一次游玩时享受，但在每个关卡追求 S 级需要值得回归的记忆和精确时机',
        zhTW: '輕度技巧表達和重玩價值——自動跑酷格式足夠寬容，但在每個關卡追求 S 評分需要記憶和精確時機',
        ja: '軽めのスキル表現とリプレイ価値——オートランナー形式で気軽に楽しめるが、Sランク狙いには記憶と精確なタイミングが必要',
        ko: '가벼운 스킬 표현과 리플레이 가치——오토러너 형식으로 편하게 즐기면서도, S랭크를 위해서는 기억력과 정확한 타이밍이 필요',
        de: 'Leichte Skill-Expression mit Wiederspielwert — das Auto-Runner-Format ist einsteigerfreundlich, S-Ranks erfordern aber Memorisierung und präzises Timing',
        type: 'sayonara',
      },
      {
        en: 'Comedic failure is part of the fun — I am actively fine with being bad at this game; the wiggling trombone animation when I miss a note is funnier than getting it right, and the audience\'s groaning reaction is a reward in itself',
        zh: '喜剧性失败是乐趣的一部分——我完全接受玩不好这款游戏；当我错过音符时摇摆的长号动画比击中音符更有趣，观众的呻吟反应本身就是一种奖励',
        zhTW: '喜劇性失敗是樂趣的一部分——我完全接受玩不好這款遊戲；錯音時搖擺的長號動畫比擊中音符更有趣，觀眾的呻吟反應本身就是獎勵',
        ja: 'コミカルな失敗こそが楽しさ——下手でOK。音を外したときのトロンボーンのアニメーションの方が上手く吹くより面白く、観客の苦悶こそが報酬',
        ko: '코믹한 실패가 재미의 일부——못해도 괜찮다. 음을 놓쳤을 때 트롬본이 흔들리는 애니메이션이 성공보다 더 웃기고, 관중의 신음 반응이 그 자체로 보상이다',
        de: 'Komisches Scheitern ist Teil des Spaßes — es ist völlig okay, schlecht zu sein; die wackelnde Posaune beim Misston ist lustiger als ein Treffer, und die Schmerzreaktionen des Publikums sind Belohnung genug',
        type: 'trombone',
      },
      {
        en: 'Very high — I want a rhythm game that will genuinely punish bad timing and teach me to feel the beat in my movement decisions, not just button presses',
        zh: '非常高——我想要一款真正惩罚坏时机并教我在移动决策中感受节拍的节奏游戏，而不仅仅是按钮按压',
        zhTW: '非常高——我想要一款真正懲罰壞時機的節奏遊戲，教我在移動決策中感受節拍，而非只是按鍵',
        ja: 'とても高い——悪いタイミングをしっかり罰し、ボタン押しだけでなく移動判断でもリズムを感じさせるゲームがしたい',
        ko: '매우 높음——나쁜 타이밍을 확실히 벌하고, 버튼 입력뿐 아니라 이동 판단에서도 비트를 느끼게 해주는 게임을 원한다',
        de: 'Sehr hoch — ich will ein Rhythmusspiel, das schlechtes Timing wirklich bestraft und mich lehrt, den Beat in Bewegungsentscheidungen zu fühlen, nicht nur in Tastendruck',
        type: 'necrodancer',
      },
      {
        en: 'Gentle — I want to succeed most of the time on my first attempt, feel the rhythm without fear of failure, and treat the game more as a meditative experience than a performance test',
        zh: '温和——我想在第一次尝试时大多数时候都能成功，在没有失败恐惧的情况下感受节奏，并将游戏更多地视为冥想体验而非表演测试',
        zhTW: '溫和——我想大多時候第一次就能成功，在沒有失敗恐懼的情況下感受節奏，將遊戲視為冥想體驗而非表演測試',
        ja: '優しめ——最初の試みで大抵成功し、失敗を恐れずリズムを感じ、ゲームを瞑想的な体験として楽しみたい',
        ko: '부드럽게——대부분 첫 시도에 성공하고, 실패 두려움 없이 리듬을 느끼며, 게임을 명상적 경험으로 즐기고 싶다',
        de: 'Sanft — ich möchte beim ersten Versuch meistens Erfolg haben, den Rhythmus ohne Versagensangst erleben und das Spiel eher meditativ genießen als testen',
        type: 'melatonin',
      },
    ],
  },
  {
    q_en: 'Which visual and emotional tone sounds most appealing?',
    q_zh: '哪种视觉和情感基调最吸引你？',
    q_zhTW: '哪種視覺和情感基調最吸引你？',
    q_ja: 'どんなビジュアルと感情的なトーンが一番魅力的ですか？',
    q_ko: '어떤 시각적·감성적 분위기가 가장 매력적으로 느껴지시나요?',
    q_de: 'Welcher visuelle und emotionale Ton klingt am ansprechendsten?',
    options: [
      {
        en: 'Neon-saturated synth-pop dreamscape — a motorcycle chase through a tarot card world, a figure jumping between geometric shapes in a city of light, and an ending that lands as an emotional gut punch despite having no dialogue',
        zh: '霓虹饱和的合成流行梦境——穿越塔罗牌世界的摩托车追逐、在光之城几何形状间跳跃的身影，以及一个尽管没有对话却如情感重击的结局',
        zhTW: '霓虹飽和的合成流行夢境——塔羅牌世界的機車追逐、光之城幾何形狀間跳躍的身影，以及一個沒有對話卻如情感重擊的結局',
        ja: 'ネオンに彩られたシンセポップの夢——タロットカードの世界をバイクで疾走し、光の都市を幾何学的に跳び、台詞なしで感情を直撃するエンディング',
        ko: '네온 가득한 신스팝 꿈속——타로 카드 세계를 오토바이로 달리고, 빛의 도시를 기하학적으로 점프하며, 대사 없이 감정을 강타하는 결말',
        de: 'Neon-gesättigte Synthpop-Traumlandschaft — Motorradjagd durch eine Tarotkartenwelt, Sprünge zwischen geometrischen Formen und ein Ende, das emotional trifft, obwohl es keine Dialoge hat',
        type: 'sayonara',
      },
      {
        en: 'Gloriously absurd — the game\'s entire aesthetic is built around the dignity and tragedy of trombone performance, with a crowd of audience members who react in real-time to your playing quality and an achievement system full of impossible jokes',
        zh: '光荣的荒诞——游戏的整体美学建立在长号表演的尊严和悲剧之上，拥有实时对你的演奏质量做出反应的观众，以及充满不可能笑话的成就系统',
        zhTW: '光榮的荒誕——整體美學建立在長號表演的尊嚴與悲劇之上，觀眾實時對演奏品質做出反應，成就系統充滿不可能的笑話',
        ja: '栄光なる不条理——トロンボーン演奏の威厳と悲劇を軸にした美学、リアルタイムで反応する観客、そして不可能なジョークだらけの実績システム',
        ko: '영광스러운 불조리——트롬본 연주의 품위와 비극 위에 구축된 미학, 실시간으로 반응하는 관중, 불가능한 개그로 가득 찬 도전과제 시스템',
        de: 'Glorreich absurd — die gesamte Ästhetik dreht sich um die Würde und Tragik der Posaunenperformance, mit einem Publikum, das in Echtzeit reagiert, und einem Achievement-System voller unmöglicher Witze',
        type: 'trombone',
      },
      {
        en: 'Gothic pixel dungeon with a thumping bass — a neon-lit underground dungeon where monsters dance to the beat and the visual rhythm of the world is synchronized to the music, creating a hypnotic effect during good runs',
        zh: '拥有砰砰低音的哥特像素地牢——一个霓虹灯照亮的地下地牢，怪物随节拍起舞，世界的视觉节奏与音乐同步，在顺利的游玩中创造催眠效果',
        zhTW: '擁有砰砰低音的哥特像素地牢——霓虹燈照亮的地下地牢，怪物隨節拍起舞，世界的視覺節奏與音樂同步，創造催眠效果',
        ja: 'ズンドコ鳴り響くゴシックピクセルダンジョン——ネオンで照らされた地下に、ビートに合わせて踊るモンスター、音楽と同期した視覚リズムが生む催眠感',
        ko: '쿵쾅대는 고딕 픽셀 던전——네온 조명의 지하에서 비트에 맞춰 춤추는 몬스터들, 음악과 동기화된 시각적 리듬이 최면 효과를 만들어낸다',
        de: 'Gothischer Pixel-Dungeon mit wummerndem Bass — ein Neon-beleuchteter Untergrund, wo Monster zum Beat tanzen und alles zur Musik synchronisiert ist, was bei guten Runs hypnotisiert',
        type: 'necrodancer',
      },
      {
        en: 'Pastel dream sequences — each level is inside a different dream (a garden, a bakery, a party, a starry night), rendered in soft watercolor pastels, and the music matches the warmth and safety of a good dream',
        zh: '粉彩梦境序列——每个关卡都在不同的梦境中（花园、面包店、派对、星夜），以柔和的水彩粉彩渲染，音乐与美梦的温暖和安全感相匹配',
        zhTW: '粉彩夢境序列——每個關卡都在不同夢境中（花園、麵包店、派對、星夜），以柔和水彩粉彩渲染，音樂與美夢的溫暖和安全感相匹配',
        ja: 'パステルの夢シーケンス——庭、パン屋、パーティ、星空など異なる夢ごとに柔らかい水彩パステルで描かれ、音楽が良い夢の温もりと安心感を体現',
        ko: '파스텔 꿈 시퀀스——정원, 빵집, 파티, 별밤 등 각기 다른 꿈에서 부드러운 수채화 파스텔로 표현되고, 음악이 좋은 꿈의 따뜻함과 안심감을 담는다',
        de: 'Pastell-Traumsequenzen — jedes Level spielt in einem anderen Traum (Garten, Bäckerei, Party, Sternennacht), in weichen Aquarellfarben gemalt, und die Musik passt zur Wärme und Geborgenheit eines guten Traums',
        type: 'melatonin',
      },
    ],
  },
  {
    q_en: 'Which platform and price fits you best?',
    q_zh: '哪种平台和价格最适合你？',
    q_zhTW: '哪種平台和價格最適合你？',
    q_ja: 'どのプラットフォームと価格帯が一番合っていますか？',
    q_ko: '어떤 플랫폼과 가격이 가장 적합하신가요?',
    q_de: 'Welche Plattform und welcher Preis passen am besten zu dir?',
    options: [
      {
        en: 'Nintendo Switch or Apple Arcade — I want to play this on my Switch in handheld mode or on my iPhone/iPad with the Apple Arcade subscription I already have; the short runtime makes it perfect for portable play',
        zh: 'Nintendo Switch 或 Apple Arcade——我想在便携模式的 Switch 上或用我已有的 Apple Arcade 订阅在 iPhone/iPad 上玩；短暂的游玩时间使其非常适合便携游玩',
        zhTW: 'Nintendo Switch 或 Apple Arcade——我想在便攜模式的 Switch 上或用已有的 Apple Arcade 訂閱在 iPhone/iPad 上玩；短暫的遊玩時間非常適合便攜遊玩',
        ja: 'Nintendo SwitchかApple Arcade——携帯モードのSwitchや手持ちのApple Arcadeサブスクでプレイしたい。短いプレイ時間が携帯プレイに最適',
        ko: 'Nintendo Switch 또는 Apple Arcade——포터블 모드 스위치나 이미 구독 중인 Apple Arcade로 플레이하고 싶다. 짧은 플레이타임이 휴대용 플레이에 딱 맞다',
        de: 'Nintendo Switch oder Apple Arcade — ich will es im Handheld-Modus oder mit meinem Apple Arcade Abo spielen; die kurze Spielzeit passt perfekt zum portablen Spielen',
        type: 'sayonara',
      },
      {
        en: 'PC (Steam) — this is a PC-first game and the experience of using a mouse or keyboard to control a trombone is part of the charm; I want the full PC version with all DLC and the card-collecting metagame',
        zh: 'PC（Steam）——这是一款 PC 优先的游戏，使用鼠标或键盘控制长号的体验是其魅力的一部分；我想要包含所有 DLC 和集卡元游戏的完整 PC 版本',
        zhTW: 'PC（Steam）——這是 PC 優先的遊戲，使用滑鼠或鍵盤控制長號是其魅力的一部分；我想要含所有 DLC 和集卡元遊戲的完整 PC 版本',
        ja: 'PC（Steam）——マウスやキーボードでトロンボーンを操作する感覚がチャームの一部。全DLCとカード収集メタゲームを含む完全版で遊びたい',
        ko: 'PC(Steam)——마우스나 키보드로 트롬본을 조작하는 것이 매력의 일부. 모든 DLC와 카드 수집 메타게임이 포함된 완전판으로 즐기고 싶다',
        de: 'PC (Steam) — die Steuerung mit Maus oder Tastatur ist Teil des Charmes; ich will die volle PC-Version mit allen DLCs und dem Kartensammelmeta',
        type: 'trombone',
      },
      {
        en: 'PC or Switch at a modest price — I want the best price-to-content ratio here; the game has extensive DLC and is frequently on sale, and I plan to spend hundreds of hours so even full price represents excellent value',
        zh: 'PC 或 Switch 适中价格——我想要最佳的性价比；游戏有大量 DLC 且经常打折，我计划花数百小时所以即使是原价也代表出色的价值',
        zhTW: 'PC 或 Switch 適中價格——我想要最佳的性價比；遊戲有大量 DLC 且經常打折，計畫花數百小時所以即使原價也是出色的價值',
        ja: 'PCかSwitchで手頃な価格——コスパ重視。DLCも豊富でセール頻度も高く、数百時間遊ぶ予定なので定価でも十分お得',
        ko: 'PC 또는 스위치에서 합리적인 가격——가성비 중시. DLC가 풍부하고 세일도 자주 하며, 수백 시간 플레이할 예정이라 정가도 충분히 가치 있다',
        de: 'PC oder Switch zu einem günstigen Preis — bestes Preis-Leistungs-Verhältnis; das Spiel hat viel DLC und ist oft im Sale, und ich plane Hunderte Stunden, also ist sogar Vollpreis exzellent',
        type: 'necrodancer',
      },
      {
        en: 'PC or Switch at a gentle entry price — I want something that does not feel like a financial commitment before I know I will love it; this game costs about $15 and the demo is available to try before buying',
        zh: 'PC 或 Switch 温和入门价格——我想要在知道自己会喜欢之前不感觉是财务承诺的东西；这款游戏约 15 美元，购买前可以试玩演示',
        zhTW: 'PC 或 Switch 溫和入門價格——不想在確定喜歡之前有財務壓力；這款遊戲約 15 美元，購買前可試玩演示',
        ja: 'PCかSwitchで低価格スタート——好きかどうか分からない段階で財政的なプレッシャーを感じたくない。約15ドルで体験版もあり',
        ko: 'PC 또는 스위치에서 부담 없는 입문 가격——좋아할지 모르는 상태에서 재정적 부담을 원치 않는다. 약 15달러에 데모도 있다',
        de: 'PC oder Switch zu einem günstigen Einstiegspreis — kein finanzieller Druck, bevor ich weiß ob ich es mag; etwa 15$ und eine Demo vorhanden',
        type: 'melatonin',
      },
    ],
  },
  {
    q_en: 'Which post-session feeling sounds most satisfying?',
    q_zh: '哪种游玩后的感觉最令你满足？',
    q_zhTW: '哪種遊玩後的感覺最令你滿足？',
    q_ja: 'プレイ後にどんな感覚を得たいですか？',
    q_ko: '플레이 후 어떤 느낌이 가장 만족스러울 것 같나요?',
    q_de: 'Welches Gefühl nach einer Spielsession klingt am befriedigendsten?',
    options: [
      {
        en: 'I just watched the credits roll on one of the most beautiful 90-minute experiences I have ever had in gaming — I felt something real, the music is still in my head, and I am immediately going back to replay my favorite level for the S-rank',
        zh: '我刚看完了我在游戏中经历过的最美丽的 90 分钟体验之一的片尾字幕——我感受到了真实的东西，音乐还萦绕在脑海中，我立刻回去重玩我最喜欢的关卡争取 S 级',
        zhTW: '我剛看完了遊戲史上最美麗 90 分鐘體驗之一的片尾字幕——感受到了真實的情感，音樂還縈繞腦海，立刻回去重玩最喜歡的關卡追 S 評分',
        ja: 'ゲーム人生で最も美しい90分の体験のエンドクレジットを観終わった——本物の感情を感じ、音楽がまだ頭に残り、すぐに好きなレベルをSランク狙いで再プレイしたい',
        ko: '게임 역사상 가장 아름다운 90분 경험의 엔딩 크레딧을 방금 봤다——진짜 감정을 느꼈고, 음악이 아직도 머릿속에 울리며, 바로 최애 레벨을 S랭크 노리고 다시 플레이하고 싶다',
        de: 'Ich habe gerade den Abspann einer der schönsten 90-Minuten-Erfahrungen der Spielgeschichte gesehen — ich habe etwas gespürt, die Musik klingt noch nach, und ich will sofort meinen Lieblingslevel für den S-Rank wiederholen',
        type: 'sayonara',
      },
      {
        en: 'I just sent a video of my terrible trombone performance to three friends who are now also playing — the shared absurdity of this game is its highest value, and watching someone else fail at the trombone is funnier than succeeding yourself',
        zh: '我刚把我糟糕的长号表演视频发给了三个现在也在玩的朋友——这款游戏的共同荒诞性是其最高价值，看别人在长号上失败比自己成功更有趣',
        zhTW: '我剛把糟糕的長號表演影片發給三個朋友——這款遊戲的共同荒誕性是其最高價值，看別人在長號上失敗比自己成功更有趣',
        ja: 'さっき友達3人に自分のひどいトロンボーン演奏の動画を送った——このゲームの共有される不条理さこそ最大の価値で、他人の失敗を見る方が自分が上手く吹くより笑える',
        ko: '방금 형편없는 트롬본 연주 영상을 친구 세 명에게 보냈다——이 게임의 공유되는 불조리가 최고의 가치이며, 남의 실패를 보는 것이 내가 성공하는 것보다 더 웃기다',
        de: 'Ich habe gerade ein Video meiner schrecklichen Posaunenperformance an drei Freunde geschickt, die jetzt auch spielen — die geteilte Absurdität dieses Spiels ist sein größter Wert, und zuzuschauen wie andere scheitern ist lustiger als selbst zu gewinnen',
        type: 'trombone',
      },
      {
        en: 'I just completed a run where I kept the beat through the entire Crypt without dying — the flow state of being perfectly synchronized to the music while making split-second tactical decisions felt genuinely transcendent',
        zh: '我刚完成了一次在整个地窟中保持节拍而没有死亡的游玩——在做出瞬间战术决策的同时与音乐完美同步的心流状态感觉真正超然',
        zhTW: '我剛完成了在整個地窟中保持節拍而沒有死亡的一局——在做出瞬間戰術決策的同時與音樂完美同步的心流狀態感覺真正超然',
        ja: 'たった今、地下墓地全体でリズムをキープしてノーミスのランを完走した——瞬時の戦術判断を下しながら音楽と完全同期したフロー状態は本当に超越的だった',
        ko: '방금 지하 묘지 전체에서 박자를 놓치지 않고 노미스 런을 완주했다——순간적인 전술 판단을 내리면서 음악과 완벽히 동기화된 플로우 상태는 진정으로 초월적이었다',
        de: 'Ich habe gerade einen Run durch die gesamte Krypta ohne Tod durchgezogen — der Flow-Zustand, perfekt mit der Musik synchronisiert während ich blitzschnelle taktische Entscheidungen traf, war wirklich transzendent',
        type: 'necrodancer',
      },
      {
        en: 'I just played through the Garden dream three times because the music made me feel a specific kind of safe that I wanted to stay in — this game is less about completion and more about the feeling of being gently present in a dream',
        zh: '我刚把花园梦境玩了三遍，因为音乐让我感受到一种特定的安全感，我想留在其中——这款游戏与其说是关于完成，不如说是关于在梦中温和地活在当下的感觉',
        zhTW: '我剛把花園夢境玩了三遍，因為音樂讓我感受到一種特定的安全感——這款遊戲與其說是關於完成，不如說是在夢中溫和地活在當下',
        ja: '音楽が特定の安心感をくれるので庭の夢を3回繰り返してしまった——このゲームはクリアより、夢の中で穏やかに存在する感覚の方が大切',
        ko: '음악이 특정한 안도감을 주기 때문에 정원 꿈을 세 번 반복해서 플레이했다——이 게임은 완료보다 꿈속에서 부드럽게 존재하는 느낌이 더 중요하다',
        de: 'Ich habe den Gartentraum dreimal gespielt, weil die Musik mir ein spezifisches Sicherheitsgefühl gab, in dem ich bleiben wollte — dieses Spiel geht weniger ums Abschließen als ums sanfte Verweilen in einem Traum',
        type: 'melatonin',
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
  sayonara: {
    title_en: 'Sayonara Wild Hearts',
    title_zh: '再见狂心',
    title_zhTW: '再見狂心',
    title_ja: 'セイヨナラ・ワイルドハーツ',
    title_ko: '사요나라 와일드 하츠',
    title_de: 'Sayonara Wild Hearts',
    emoji: '🎴',
    tag_en: 'A 90-minute synth-pop music video you play through — neon motorcycles, tarot cards, heartbreak, and one of the most emotionally resonant short games ever made',
    tag_zh: '一个你能玩过去的 90 分钟合成流行音乐视频——霓虹摩托车、塔罗牌、心碎，以及有史以来情感共鸣最强的短篇游戏之一',
    tag_zhTW: '你能玩過去的 90 分鐘合成流行音樂影片——霓虹機車、塔羅牌、心碎，以及有史以來情感共鳴最深的短篇遊戲之一',
    tag_ja: '90分間プレイできるシンセポップMV——ネオンのバイク、タロットカード、失恋、そして最も感情を揺さぶる短編ゲームのひとつ',
    tag_ko: '플레이하는 90분짜리 신스팝 뮤직비디오——네온 오토바이, 타로 카드, 상처, 그리고 역대 가장 감동적인 단편 게임 중 하나',
    tag_de: 'Ein 90-minütiges Synthpop-Musikvideo, das du spielst — Neonmotorräder, Tarotkarten, Herzschmerz und eines der emotional resonantesten Kurzspiele überhaupt',
    platform_en: 'Available on: Nintendo Switch, Apple Arcade (free with subscription), PC (Steam ~$13), PlayStation. Apple Arcade is the best value.',
    platform_zh: '可在以下平台获取：Nintendo Switch、Apple Arcade（订阅免费）、PC（Steam 约 13 美元）、PlayStation。Apple Arcade 是最佳价值。',
    platform_zhTW: '可在以下平台取得：Nintendo Switch、Apple Arcade（訂閱免費）、PC（Steam 約 13 美元）、PlayStation。Apple Arcade 是最佳選擇。',
    platform_ja: 'Nintendo Switch、Apple Arcade（サブスク無料）、PC（Steam 約13ドル）、PlayStation で遊べます。Apple Arcadeが最もコスパ◎。',
    platform_ko: 'Nintendo Switch, Apple Arcade(구독 무료), PC(Steam 약 13달러), PlayStation에서 이용 가능. Apple Arcade가 최고의 가치.',
    platform_de: 'Verfügbar auf: Nintendo Switch, Apple Arcade (kostenlos mit Abo), PC (Steam ~13$), PlayStation. Apple Arcade bietet das beste Preis-Leistungs-Verhältnis.',
    why_en:
      "Sayonara Wild Hearts (2019, Simogo) is one of the most singular gaming experiences of the past decade — a 90-minute interactive music video where you guide a heartbroken woman through a neon dreamscape of motorcycle chases, geometric puzzle sequences, and boss fights against tarot card archetypes, all synchronized to an original synth-pop and dream pop soundtrack. The album — composed by Daniel Olsén and Jonathan Eng — is genuinely exceptional music that works completely outside the game. The gameplay is an auto-runner with light directional input, making it accessible to non-gamers while offering S-rank replay value for players who want mastery. The narrative is told entirely without dialogue: a breakup, a dissolution of self, and a gradual reconstruction of identity communicated purely through visual metaphor and music. It runs about 90 minutes on a first playthrough and costs about $13 on Steam (or free with Apple Arcade). Many players consider it the most moving short game they have ever played. Metacritic 84 on Switch.",
    why_zh:
      '再见狂心（2019 年，Simogo）是过去十年中最独特的游戏体验之一——一个 90 分钟的互动音乐视频，你引导一个心碎的女人穿越霓虹梦境，经历摩托车追逐、几何谜题序列和与塔罗牌原型的 Boss 战，全部与原创合成流行和梦境流行音乐配乐同步。游戏总时长约 90 分钟，Steam 售价约 13 美元，Apple Arcade 订阅免费。许多玩家认为这是他们玩过的情感上最动人的短篇游戏。Switch 版 Metacritic 84 分。',
    why_zhTW:
      '再見狂心（2019，Simogo）是過去十年最獨特的遊戲體驗之一——90 分鐘互動音樂影片，引導一位心碎女子穿越霓虹夢境，歷經機車追逐、幾何謎題與塔羅牌 Boss 戰，全部與原創合成流行音樂同步。遊戲約 90 分鐘，Steam 售價約 13 美元，Apple Arcade 訂閱免費。許多玩家認為這是他們玩過情感上最動人的短篇遊戲。Switch 版 Metacritic 84 分。',
    why_ja:
      '「Sayonara Wild Hearts」（2019年、Simogo）は過去10年で最もユニークなゲーム体験のひとつ。失恋した女性をネオンの夢世界へ導く90分のインタラクティブMVで、バイクチェイス、幾何学パズル、タロットカードボス戦がすべてオリジナルのシンセポップサウンドトラックに同期。プレイ時間は約90分、Steam価格は約13ドル、Apple Arcadeなら追加料金なし。多くのプレイヤーが「最も感動した短編ゲーム」と評価。SwitchのMetacritic84点。',
    why_ko:
      '「사요나라 와일드 하츠」(2019, Simogo)는 지난 10년간 가장 독특한 게임 경험 중 하나——실연한 여성을 네온 꿈속으로 이끄는 90분짜리 인터랙티브 뮤직비디오로, 오토바이 추격·기하학 퍼즐·타로 카드 보스전이 모두 오리지널 신스팝 사운드트랙에 동기화되어 있다. 플레이타임 약 90분, Steam 약 13달러, Apple Arcade 구독자는 무료. 많은 플레이어가 역대 가장 감동적인 단편 게임으로 꼽는다. 스위치판 Metacritic 84점.',
    why_de:
      'Sayonara Wild Hearts (2019, Simogo) ist eines der einzigartigsten Spielerlebnisse des letzten Jahrzehnts — ein 90-minütiges interaktives Musikvideo, in dem du eine herzgebrochene Frau durch eine Neon-Traumwelt führst: Motorradjagden, geometrische Rätsel und Bosskämpfe gegen Tarotkarten-Archetypen, alles synchronisiert zu einem originellen Synthpop-Soundtrack. Erstdurchlauf dauert etwa 90 Minuten, kostet ca. 13$ auf Steam oder ist kostenlos mit Apple Arcade. Viele Spieler bezeichnen es als das emotional bewegendste Kurzspiel, das sie je gespielt haben. Metacritic 84 auf Switch.',
    tip_en: "Play with headphones — the spatial audio in Sayonara Wild Hearts is a significant part of the experience, and speakers flatten it considerably. The game difficulty is very forgiving (you respawn automatically), so do not worry about failing; treat the first playthrough as watching a film and only chase S-ranks on a second run. The album is available on all streaming platforms — listening to it after finishing the game is a beautiful way to revisit the experience. The final level is the hardest in the game and requires full attention to the beat.",
    tip_zh: '用耳机游玩——再见狂心的空间音频是体验的重要组成部分，音箱会大幅削减这种效果。游戏难度非常宽容（你会自动复活），所以不要担心失败；将第一次游玩视为看电影，只在第二次游玩时追求 S 级。该专辑在所有流媒体平台上都有——游戏结束后收听它是重温体验的美好方式。最后一关是游戏中最难的，需要全神贯注地跟随节拍。',
    tip_zhTW: '用耳機遊玩——再見狂心的空間音效是體驗的核心，音響會大幅削弱效果。遊戲難度非常寬容（自動復活），第一次遊玩就當看電影，第二次再追 S 評分。原聲帶在所有串流平台都有——遊戲結束後聆聽是絕佳的回味方式。最後一關最難，需要全神貫注跟上節拍。',
    tip_ja: 'イヤホン推奨——空間オーディオが体験の核心で、スピーカーでは大幅に損なわれる。難易度はとても優しく（自動復活）、初回はまるで映画を観るように楽しんでOK。Sランク狙いは2周目から。アルバムは全ストリーミングサービスにあるので、クリア後に聴くと余韻を楽しめる。最終レベルが最難関なのでビートに集中を。',
    tip_ko: '이어폰으로 플레이하길——공간 오디오가 경험의 핵심이며, 스피커로는 크게 희석된다. 난이도는 매우 관대하니(자동 부활) 첫 플레이는 영화 감상처럼, S랭크 도전은 2회차부터. 앨범은 모든 스트리밍 플랫폼에 있어 클리어 후 감상하면 여운을 즐길 수 있다. 마지막 레벨이 가장 어려우니 비트에 집중을.',
    tip_de: 'Spiele mit Kopfhörern — der Raumklang ist ein wesentlicher Teil der Erfahrung und über Lautsprecher deutlich flacher. Der Schwierigkeitsgrad ist sehr nachsichtig (automatische Wiedergeburt), also behandle den ersten Durchlauf wie einen Film und jage S-Ranks erst beim zweiten Mal. Das Album ist auf allen Streaming-Plattformen verfügbar. Das letzte Level ist das schwerste und erfordert volle Konzentration auf den Beat.',
  },
  trombone: {
    title_en: 'Trombone Champ',
    title_zh: '长号冠军',
    title_zhTW: '長號冠軍',
    title_ja: 'トロンボーン・チャンプ',
    title_ko: '트롬본 챔프',
    title_de: 'Trombone Champ',
    emoji: '🎺',
    tag_en: 'The funniest music game ever made — you play a real trombone (very badly) through classical music and meme songs, and the audience\'s pained reactions are as much the game as the rhythm',
    tag_zh: '有史以来最有趣的音乐游戏——你（非常糟糕地）演奏真实的长号穿越古典音乐和梗曲，观众的痛苦反应与节奏本身一样是游戏的一部分',
    tag_zhTW: '有史以來最有趣的音樂遊戲——你（非常糟糕地）用長號演奏古典音樂和梗曲，觀眾的痛苦反應和節奏本身一樣是遊戲的核心',
    tag_ja: '史上最笑えるリズムゲーム——クラシックやミーム曲をトロンボーンで（ひどく）演奏し、観客のリアクションがリズム以上にゲームの本質',
    tag_ko: '역대 가장 웃긴 리듬 게임——클래식과 밈 곡을 트롬본으로 (아주 형편없이) 연주하고, 관중의 고통스러운 반응이 리듬만큼이나 게임의 핵심',
    tag_de: 'Das lustigste Musikspiel aller Zeiten — du spielst eine echte Posaune (sehr schlecht) durch klassische Musik und Meme-Songs, und die Schmerzreaktionen des Publikums sind genauso Spiel wie der Rhythmus',
    platform_en: 'Available on: PC (Steam) ~$15, Nintendo Switch ~$15. PC is the recommended platform for the original experience.',
    platform_zh: '可在以下平台获取：PC（Steam）约 15 美元、Nintendo Switch 约 15 美元。PC 是体验原版的推荐平台。',
    platform_zhTW: '可在以下平台取得：PC（Steam）約 15 美元、Nintendo Switch 約 15 美元。PC 是體驗原版的推薦平台。',
    platform_ja: 'PC（Steam）約15ドル、Nintendo Switch 約15ドルで遊べます。PCが最もオリジナルな体験ができる推奨プラットフォーム。',
    platform_ko: 'PC(Steam) 약 15달러, Nintendo Switch 약 15달러에서 이용 가능. PC가 원본 경험에 추천.',
    platform_de: 'Verfügbar auf: PC (Steam) ~15$, Nintendo Switch ~15$. PC ist die empfohlene Plattform für das Originalerlebnis.',
    why_en:
      "Trombone Champ (2022, Holy Wow) is a rhythm game that went genuinely viral on TikTok and Twitch because of a core joke so good it sustains an entire game: you play a real trombone with a mouse or analog stick, dragging it up and down to hit pitched notes, and the trombone's physics mean that even 'correct' notes sound slightly wrong and every wrong note sounds gloriously awful. The game features classical music, meme songs, and original compositions, and every song has an audience whose visible suffering or joy reacts in real-time to your performance quality. It has a card-collecting metagame (Tromboner Cards, parody baseball cards of fictional trombone champions) and a campaign where you earn cards to unlock new songs and cosmetics. Beyond the joke, the game has genuine depth: the timing system has actual precision requirements on harder difficulties, and the community-created song charts (thousands of custom songs are available) extend its lifetime indefinitely. The shared experience of watching friends fail at the trombone is the game's highest value. Metacritic 82 on PC.",
    why_zh:
      '长号冠军（2022 年，Holy Wow）是一款在 TikTok 和 Twitch 上真正走红的节奏游戏，因为一个笑话好到足以支撑整款游戏：你用鼠标或模拟摇杆演奏真实的长号，上下拖动以击中音高音符，而长号的物理特性意味着即使"正确"的音符听起来也略微错误，每个错误音符听起来都光荣地糟糕。游戏有集卡元游戏和数千首社区创建的自定义歌曲谱面，无限延伸其寿命。PC 版 Metacritic 82 分。',
    why_zhTW:
      '長號冠軍（2022，Holy Wow）是一款真正在 TikTok 和 Twitch 走紅的節奏遊戲，核心笑話好到足以支撐整款遊戲：你用滑鼠或類比搖桿演奏真實長號，上下拖動擊中音高，而長號的物理特性讓即使「正確」的音符也略微走調，每個錯誤音符都光榮地難聽。遊戲有集卡元遊戲和數千首社群自製譜面，無限延伸壽命。PC 版 Metacritic 82 分。',
    why_ja:
      '「トロンボーン・チャンプ」（2022年、Holy Wow）はTikTokとTwitchで爆発的にバズったリズムゲーム。コアジョーク——マウスや左スティックでトロンボーンを上下に動かして音程を合わせるが、物理演算のせいで「正解」の音さえ少しズレ、外した音は最高に最悪——が一本のゲームを支えるほど強力。カード収集メタゲームや数千の自作チャートで遊び応え無限大。PCのMetacritic82点。',
    why_ko:
      '「트롬본 챔프」(2022, Holy Wow)는 TikTok과 Twitch에서 진짜 바이럴된 리듬 게임으로, 핵심 개그 하나가 게임 전체를 지탱한다——마우스나 아날로그 스틱으로 트롬본을 위아래로 움직여 음정을 맞추지만, 물리 엔진 탓에 정확한 음도 약간 어긋나 들리고 틀린 음은 장엄하게 끔찍하다. 카드 수집 메타게임과 수천 개의 커스텀 채보로 수명 무한 연장. PC판 Metacritic 82점.',
    why_de:
      'Trombone Champ (2022, Holy Wow) ist ein Rhythmusspiel, das auf TikTok und Twitch viral ging, weil der zentrale Witz so gut ist, dass er ein ganzes Spiel trägt: Mit Maus oder Stick bewegst du eine Posaune auf und ab, um Töne zu treffen — aber die Physik lässt selbst „richtige" Noten leicht falsch klingen, und jede falsche Note klingt herrlich schrecklich. Mit Kartensammelmeta und Tausenden von Community-Charts ist der Wiederspielwert endlos. Metacritic 82 auf PC.',
    tip_en: "Start with the default songs before downloading custom charts — the base game has enough variety to understand the core joke fully. Use a mouse rather than keyboard for the best control feel. The 'Baboon Song' is the best introduction to how funny the game is at its worst; play it first. The Tromboner Cards unlock new songs but are randomized — farm them by replaying easy songs quickly rather than playing hard songs slowly. The custom song community (TromboneDB) has thousands of charts including every imaginable song; install the mod loader after you finish the base game.",
    tip_zh: '在下载自定义谱面之前先从默认歌曲开始——基础游戏有足够的多样性来完全理解核心笑话。使用鼠标而非键盘以获得最佳控制手感。"狒狒歌"是了解游戏在最糟糕时有多有趣的最佳介绍；先玩它。长号手卡片解锁新歌曲但是随机的——通过快速重玩简单歌曲来积累它们，而不是慢慢玩困难歌曲。自定义歌曲社区（TromboneDB）有数千首谱面，包括所有可以想象的歌曲；完成基础游戏后安装模组加载器。',
    tip_zhTW: '先從預設歌曲開始，下載自定義譜面之前——基礎遊戲已足夠了解核心笑話。使用滑鼠比鍵盤手感更佳。「狒狒歌」是了解遊戲最糟糕狀態有多有趣的最佳入門；先玩它。長號手卡片隨機解鎖新歌曲——快速重玩簡單歌曲比慢慢玩困難歌曲更有效率。社群歌曲資料庫（TromboneDB）有數千首譜面；完成基礎遊戲後安裝模組載入器。',
    tip_ja: 'カスタムチャートをダウンロードする前にデフォルト曲から始めよう——本編だけでコアジョークは十分伝わる。コントロールはキーボードよりマウスが快適。「Baboon Song」が最初に遊ぶべき曲——このゲームの最悪の瞬間がいかに面白いかを一発で教えてくれる。トロンボーナーカードはランダム解放なので、難しい曲をゆっくりより、簡単な曲を素早く繰り返す方が効率的。カスタム曲コミュニティ（TromboneDB）には数千のチャートがある。',
    tip_ko: '커스텀 채보를 다운로드하기 전에 기본 곡부터 시작하자——기본 게임만으로도 핵심 개그를 충분히 이해할 수 있다. 조작은 키보드보다 마우스가 훨씬 쾌적하다. 「Baboon Song」이 첫 플레이 추천——이 게임이 최악일 때 얼마나 웃긴지 단번에 보여준다. 트롬보너 카드는 랜덤 해금이므로 어려운 곡 느리게보다 쉬운 곡 빠르게 반복이 효율적. 커뮤니티 채보 DB(TromboneDB)에 수천 개의 채보가 있다.',
    tip_de: 'Beginne mit den Standardsongs, bevor du Custom Charts herunterlädst — das Basisspiel hat genug Abwechslung, um den zentralen Witz zu verstehen. Nutze eine Maus statt Tastatur für das beste Spielgefühl. „Baboon Song" ist die beste Einführung in die tiefste Komik des Spiels; spiel es zuerst. Die Tromboner-Karten sind zufällig — wiederhole einfache Songs schnell, statt schwere langsam zu spielen. Die Custom-Song-Community (TromboneDB) hat Tausende Charts; installiere den Mod-Loader nach dem Basisspiel.',
  },
  necrodancer: {
    title_en: 'Crypt of the NecroDancer',
    title_zh: '地下墓穴：亡灵舞者',
    title_zhTW: '地下墓穴：亡靈舞者',
    title_ja: 'クリプト・オブ・ザ・ネクロダンサー',
    title_ko: '크립트 오브 더 네크로댄서',
    title_de: 'Crypt of the NecroDancer',
    emoji: '💀',
    tag_en: 'A rhythm roguelike where every action (move, attack, dodge) must happen on the beat — the most musically demanding game on this list, with one of the best soundtracks in indie gaming',
    tag_zh: '一款每个动作（移动、攻击、躲避）都必须在节拍上发生的节奏 Roguelike——这个列表中音乐要求最高的游戏，拥有独立游戏中最好的配乐之一',
    tag_zhTW: '每個動作（移動、攻擊、躲避）都必須在節拍上的節奏 Roguelike——這份清單中音樂要求最高的遊戲，配樂是獨立遊戲中最優秀的之一',
    tag_ja: '全ての行動（移動・攻撃・回避）をビートに合わせなければならないリズムローグライク——このリストで最も音楽的要求が高く、インディー界屈指のサウンドトラック',
    tag_ko: '모든 행동(이동·공격·회피)을 비트에 맞춰야 하는 리듬 로그라이크——이 목록에서 가장 음악적 요구가 높으며, 인디 게임 최고 사운드트랙 중 하나',
    tag_de: 'Ein Rhythmus-Roguelike, bei dem jede Aktion (Bewegen, Angriff, Ausweichen) zum Beat geschehen muss — das musikalisch anspruchsvollste Spiel auf dieser Liste, mit einem der besten Soundtracks im Indie-Gaming',
    platform_en: 'Available on: PC (Steam), Nintendo Switch, PlayStation, iOS/Android — about $15. Frequently on sale for $3-5. AMPLIFIED DLC adds significant content.',
    platform_zh: '可在以下平台获取：PC（Steam）、Nintendo Switch、PlayStation、iOS/Android——约 15 美元。经常打折至 3-5 美元。AMPLIFIED DLC 添加大量内容。',
    platform_zhTW: '可在以下平台取得：PC（Steam）、Nintendo Switch、PlayStation、iOS/Android——約 15 美元。經常打折至 3-5 美元。AMPLIFIED DLC 增加大量內容。',
    platform_ja: 'PC（Steam）、Nintendo Switch、PlayStation、iOS/Android で約15ドル。頻繁に3〜5ドルのセールあり。AMPLIFIED DLCでコンテンツ大幅追加。',
    platform_ko: 'PC(Steam), Nintendo Switch, PlayStation, iOS/Android에서 약 15달러. 자주 3~5달러 세일. AMPLIFIED DLC로 콘텐츠 대폭 추가.',
    platform_de: 'Verfügbar auf: PC (Steam), Nintendo Switch, PlayStation, iOS/Android — etwa 15$. Häufig im Sale für 3-5$. AMPLIFIED DLC fügt erhebliche Inhalte hinzu.',
    why_en:
      "Crypt of the NecroDancer (2015, Brace Yourself Games) is the progenitor of the rhythm roguelike genre — a top-down dungeon crawler where you must move, attack, and use items strictly on the beat of the music or lose your score multiplier. Every step you take is a beat; every attack is timed to the pulse; every monster has a movement pattern synchronized to the rhythm. The result is a game that creates genuine flow states: when a run is going well, you feel like you are dancing through the dungeon rather than playing it. The soundtrack by Danny Baranowsky is widely considered one of the best in indie gaming — a genre-blending mix of metal, electronic, bluegrass, and jazz that adapts to the dungeon's depth. The roguelike structure means every run is a procedurally generated dungeon with randomized items; death means starting over but keeping permanent upgrades. Extremely high replay value — some players have 500+ hours. Also available cheaply on iOS/Android. The Aria character (must hit every beat or die instantly) is one of the hardest challenges in any game. Metacritic 87 on PC.",
    why_zh:
      '地下墓穴：亡灵舞者（2015 年，Brace Yourself Games）是节奏 Roguelike 类型的鼻祖——一款俯视角地牢爬行游戏，你必须严格按照音乐的节拍移动、攻击和使用物品，否则会失去得分倍增器。由 Danny Baranowsky 创作的配乐被广泛认为是独立游戏中最好的配乐之一。PC 版 Metacritic 87 分，iOS/Android 也可玩。极高的重玩价值——一些玩家拥有 500 多小时。',
    why_zhTW:
      '地下墓穴：亡靈舞者（2015，Brace Yourself Games）是節奏 Roguelike 類型的鼻祖——俯視角地牢爬行遊戲，你必須嚴格按照音樂節拍移動、攻擊、使用道具，否則失去得分倍增器。由 Danny Baranowsky 創作的配樂被廣泛認為是獨立遊戲最佳之一。PC 版 Metacritic 87 分，iOS/Android 也可玩。部分玩家擁有超過 500 小時遊戲時間，重玩價值極高。',
    why_ja:
      '「クリプト・オブ・ザ・ネクロダンサー」（2015年、Brace Yourself Games）はリズムローグライクジャンルの祖——音楽のビートに厳密に合わせて移動・攻撃・アイテム使用をしなければならない見下ろし型ダンジョン探索。Danny Baranowskyによるサウンドトラックはインディーゲーム屈指の名盤。PCのMetacritic87点、iOS/Androidでも遊べる。500時間以上プレイするファンも多い。',
    why_ko:
      '「크립트 오브 더 네크로댄서」(2015, Brace Yourself Games)는 리듬 로그라이크 장르의 시조——음악의 비트에 맞춰 이동·공격·아이템 사용을 해야 하는 탑뷰 던전 크롤러. Danny Baranowsky의 사운드트랙은 인디 게임 최고 명반 중 하나로 꼽힌다. PC판 Metacritic 87점, iOS/Android도 가능. 일부 플레이어는 500시간 이상을 쏟아붓는 높은 재플레이성.',
    why_de:
      'Crypt of the NecroDancer (2015, Brace Yourself Games) ist der Urvater des Rhythmus-Roguelike-Genres — ein Top-Down-Dungeon-Crawler, bei dem du jede Bewegung, jeden Angriff und jede Item-Nutzung strikt zum Beat der Musik ausführen musst, sonst verlierst du deinen Scoremultiplikator. Der Soundtrack von Danny Baranowsky gilt als einer der besten im Indie-Gaming. Metacritic 87 auf PC, auch auf iOS/Android verfügbar. Einige Spieler haben 500+ Stunden investiert.',
    tip_en: "Start with Cadence (the default character) and the standard dungeon — do not attempt Aria (must beat every step) until you have 20+ hours of experience. The most important early lesson: when in doubt, wait for the beat rather than moving off-rhythm. Shop items reset each floor — always check the shop before descending. Danny B's original soundtrack is better than the community remixes for learning the rhythms; switch to remixes later. Play with headphones and turn off any other audio — hearing the beat clearly is the entire game. The game has a free DLC update (AMPLIFIED) that adds a significant new zone; download it after completing the base game.",
    tip_zh: '从卡丹斯（默认角色）和标准地牢开始——在有 20 多小时经验之前不要尝试阿里亚（必须每步都踩到节拍）。最重要的早期课程：有疑问时，等待节拍而不是偏离节奏移动。商店物品每层重置——在下降之前始终检查商店。Danny B 的原版配乐比社区混音更适合学习节奏；之后再切换到混音。用耳机游玩并关掉其他任何音频——清晰地听到节拍就是整个游戏。游戏有一个免费 DLC 更新（AMPLIFIED），添加了重要的新区域；完成基础游戏后下载它。',
    tip_zhTW: '從卡丹斯（預設角色）和標準地牢開始——在有 20 小時以上經驗之前不要嘗試阿里亞（每步都必須踩到節拍）。最重要的早期課程：有疑問時，等待節拍而不是偏離節奏移動。商店道具每層重置——下降之前始終檢查商店。Danny B 的原版配樂比社群混音更適合學習節奏；之後再切換。用耳機遊玩並關閉其他音頻——清晰聽到節拍就是整個遊戲。',
    tip_ja: 'カデンス（デフォルトキャラ）と通常ダンジョンからスタート——プレイ時間20時間未満でアリア（全ステップでビートを踏まないと即死）は挑まないこと。迷ったらビートを待つ、リズムを外して動かない。ショップアイテムはフロアごとにリセット——降りる前に必ずチェック。Danny Bのオリジナルサウンドトラックでリズムを習得してから、後でリミックスに切り替えよう。必ずイヤホンで、他の音声は切って。',
    tip_ko: '카덴스(기본 캐릭터)와 일반 던전에서 시작——20시간 미만에서는 아리아(모든 스텝에서 비트를 밟지 않으면 즉사) 시도 금지. 망설이면 비트를 기다리고, 리듬 어긋나게 움직이지 마라. 상점 아이템은 층마다 초기화——내려가기 전에 반드시 확인. Danny B 오리지널 사운드트랙으로 리듬을 익힌 후 나중에 리믹스로 전환하자. 반드시 이어폰으로, 다른 오디오는 끄고.',
    tip_de: 'Beginne mit Cadence (dem Standardcharakter) und dem normalen Dungeon — versuche Aria (jeden Schritt auf den Beat, sonst Tod) erst nach 20+ Stunden. Im Zweifel auf den Beat warten, nicht aus dem Rhythmus bewegen. Shop-Items werden pro Etage zurückgesetzt — immer vor dem Abstieg prüfen. Danny Bs Original-Soundtrack eignet sich besser zum Lernen als Community-Remixe; wechsle später. Spiele mit Kopfhörern bei ausgeschaltetem anderen Audio — den Beat klar zu hören ist das gesamte Spiel.',
  },
  melatonin: {
    title_en: 'Melatonin',
    title_zh: '褪黑素',
    title_zhTW: '褪黑素',
    title_ja: 'メラトニン',
    title_ko: '멜라토닌',
    title_de: 'Melatonin',
    emoji: '🌙',
    tag_en: 'The most cozy rhythm game ever made — you play through dream sequences set in a bakery, a garden, a party, and a starry night, tapping to music so gentle it feels like the game is giving you a hug',
    tag_zh: '有史以来最 Cozy 的节奏游戏——你玩过设定在面包店、花园、派对和星夜中的梦境序列，轻拍如此温和的音乐，感觉游戏在给你一个拥抱',
    tag_zhTW: '有史以來最 Cozy 的節奏遊戲——在麵包店、花園、派對和星夜中的夢境輕拍音樂，柔和到感覺遊戲在給你一個擁抱',
    tag_ja: '史上最もコージーなリズムゲーム——パン屋・庭・パーティ・星空の夢をタップするだけで、音楽が優しくてゲームに抱きしめられているみたい',
    tag_ko: '역대 가장 코지한 리듬 게임——빵집·정원·파티·별밤 꿈속을 탭하는데, 음악이 너무 부드러워 게임이 안아주는 것 같다',
    tag_de: 'Das gemütlichste Rhythmusspiel aller Zeiten — du tippst in Traumsequenzen in einer Bäckerei, einem Garten, einer Party und unter Sternen zu so sanfter Musik, dass sich das Spiel wie eine Umarmung anfühlt',
    platform_en: 'Available on: PC (Steam), Nintendo Switch, iOS/Android — about $15. A demo is available to try before buying.',
    platform_zh: '可在以下平台获取：PC（Steam）、Nintendo Switch、iOS/Android——约 15 美元。购买前可试玩演示。',
    platform_zhTW: '可在以下平台取得：PC（Steam）、Nintendo Switch、iOS/Android——約 15 美元。購買前可試玩演示。',
    platform_ja: 'PC（Steam）、Nintendo Switch、iOS/Android で約15ドル。購入前に体験版あり。',
    platform_ko: 'PC(Steam), Nintendo Switch, iOS/Android에서 약 15달러. 구매 전 데모 체험 가능.',
    platform_de: 'Verfügbar auf: PC (Steam), Nintendo Switch, iOS/Android — etwa 15$. Eine Demo zum Ausprobieren vor dem Kauf ist verfügbar.',
    why_en:
      "Melatonin (2022, Half Asleep) is a rhythm game about the relationship between daily life and dreams — you tap to the beat of music during dream sequences that visualize the dreamer's waking life. The Bakery dream shows a baker at work, the Social Media dream shows scrolling through a phone, the Party dream shows a social gathering rendered as warm blobs of pastel color. Every level has a unique musical theme, a unique visual metaphor, and a difficulty curve that eases players in before revealing more complex rhythmic patterns. The game's design philosophy is distinctly cozy: even on the hardest difficulty, the punishment for missing a beat is minor, and the visual feedback for every hit is soft and rewarding rather than punishing. The art direction — pastel watercolors, rounded shapes, warm palettes — makes it one of the most visually beautiful rhythm games ever made. At about $15 with a free demo available, it is the lowest-commitment entry on this list. Very popular on Switch for portable play. Metacritic 77 on PC.",
    why_zh:
      '褪黑素（2022 年，Half Asleep）是一款关于日常生活与梦境关系的节奏游戏——你在将做梦者的清醒生活可视化的梦境序列中轻拍音乐的节拍。每个关卡都有独特的音乐主题和独特的视觉隐喻。游戏的设计理念明显温馨：即使在最高难度，错过节拍的惩罚也很轻微，每次击中的视觉反馈柔和且令人愉悦而非惩罚性。约 15 美元，有免费演示可用。PC 版 Metacritic 77 分。',
    why_zhTW:
      '褪黑素（2022，Half Asleep）是一款關於日常生活與夢境關係的節奏遊戲——你在將做夢者清醒生活可視化的夢境序列中輕拍音樂節拍。每個關卡都有獨特的音樂主題和視覺隱喻。遊戲設計理念明顯溫馨：即使在最高難度，錯過節拍的懲罰也很輕微，視覺反饋柔和而非懲罰性。約 15 美元，有免費演示可試玩。PC 版 Metacritic 77 分。',
    why_ja:
      '「メラトニン」（2022年、Half Asleep）は日常生活と夢の関係を描くリズムゲーム。夢想者の覚醒生活を可視化した夢のシーケンスで音楽のビートをタップする。レベルごとに独自の音楽テーマとビジュアルメタファーがある。デザイン哲学は徹底してコージー：最高難度でもビートを外した時のペナルティは軽く、ヒット時のフィードバックは優しくて気持ちいい。約15ドルで無料デモあり。PCのMetacritic77点。',
    why_ko:
      '「멜라토닌」(2022, Half Asleep)은 일상과 꿈의 관계를 그린 리듬 게임——꿈꾸는 이의 현실 생활을 시각화한 꿈 시퀀스에서 음악의 비트를 탭한다. 레벨마다 독특한 음악 테마와 시각적 은유가 있다. 디자인 철학이 명확히 코지함: 최고 난이도에서도 비트를 놓쳐도 페널티가 가볍고, 히트 시 피드백은 부드럽고 보람 있다. 약 15달러에 무료 데모 있음. PC판 Metacritic 77점.',
    why_de:
      'Melatonin (2022, Half Asleep) ist ein Rhythmusspiel über das Verhältnis von Alltag und Träumen — du tippst zum Beat der Musik in Traumsequenzen, die das Wachleben des Träumers visualisieren. Jedes Level hat ein einzigartiges Musikthema und eine visuelle Metapher. Die Design-Philosophie ist klar cozy: Selbst auf dem schwersten Schwierigkeitsgrad ist die Strafe für verpasste Beats minimal, und das visuelle Feedback ist sanft und belohnend. Etwa 15$ mit verfügbarer Demo. Metacritic 77 auf PC.',
    tip_en: "Try the demo first — it is a complete free preview of the first three dream levels and will tell you immediately if this game's rhythm style clicks with you. The game's visual cues are as important as the audio cues — each dream has subtle animations that preview the next beat before it arrives. Normal difficulty is the best starting point; Hard difficulty has additional rhythmic complexity that rewards multiple replays. The final chapter (the waking world levels) has the most complex patterns in the game. If you enjoy Melatonin, the developer's next game and the broader rhythm game adjacent to it is Sayonara Wild Hearts — very different in tone but similarly artistic.",
    tip_zh: '先试玩演示——它是前三个梦境关卡的完整免费预览，会立即告诉你这款游戏的节奏风格是否适合你。游戏的视觉提示与音频提示同样重要——每个梦境都有微妙的动画，在下一个节拍到来之前预告它。普通难度是最佳起点；困难难度有额外的节奏复杂性，奖励多次重玩。最后章节（清醒世界关卡）有游戏中最复杂的模式。如果你喜欢褪黑素，在节奏游戏方向上与其相邻的是再见狂心——基调截然不同但同样具有艺术性。',
    tip_zhTW: '先試玩演示——它是前三個夢境關卡的完整免費預覽，會立即告訴你這款遊戲的節奏風格是否適合你。視覺提示與音頻提示同樣重要——每個夢境都有微妙的動畫預告下一個節拍。普通難度是最佳起點；困難難度有額外的節奏複雜性。最後章節（清醒世界關卡）有遊戲中最複雜的模式。如果你喜歡褪黑素，在節奏遊戲方向上與其相鄰的是再見狂心——基調截然不同但同樣具有藝術性。',
    tip_ja: 'まずデモを試そう——最初の3つの夢レベルの完全無料プレビューで、このゲームのリズムスタイルが合うかすぐわかる。視覚的な合図が音声と同じくらい重要——各夢には次のビートを予告する繊細なアニメーションがある。ノーマル難度から始めるのがベスト。最終チャプター（目覚めの世界）が最も複雑。メラトニンが気に入ったら、雰囲気は全く違うがSayonara Wild Heartsも試してみて。',
    tip_ko: '먼저 데모를 해보자——처음 세 개의 꿈 레벨 전체를 무료로 체험할 수 있어, 이 게임의 리듬 스타일이 맞는지 바로 알 수 있다. 시각 단서가 음성만큼 중요——각 꿈에는 다음 비트를 미리 알려주는 미묘한 애니메이션이 있다. 노멀 난이도부터 시작하는 것이 최선. 마지막 챕터(현실 세계 레벨)가 가장 복잡하다. 멜라토닌이 마음에 든다면, 분위기는 전혀 다르지만 Sayonara Wild Hearts도 추천.',
    tip_de: 'Probiere zuerst die Demo — sie ist eine vollständige kostenlose Vorschau auf die ersten drei Traumlevel und sagt dir sofort, ob dieser Rhythmusstil zu dir passt. Visuelle Hinweise sind genauso wichtig wie Audio-Hinweise — jeder Traum hat subtile Animationen, die den nächsten Beat ankündigen. Normal ist der beste Einstieg; Schwer hat zusätzliche rhythmische Komplexität für mehrere Replays. Das letzte Kapitel (die Wach-Welt-Level) hat die komplexesten Muster. Wenn dir Melatonin gefällt, ist Sayonara Wild Hearts als Nächstes empfehlenswert — ganz anderer Ton, aber ähnlich künstlerisch.',
  },
}

function calcResult(answers: Pick[]): Pick {
  const counts: Record<Pick, number> = { sayonara: 0, trombone: 0, necrodancer: 0, melatonin: 0 }
  for (const a of answers) counts[a]++
  return Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0] as Pick
}

export function RhythmGamesQuiz({ locale }: { locale: string }) {
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
    const url = `${BASE_URL}/${locale}/quizzes/rhythm-games-quiz`
    const shareText = getLoc(
      `节奏游戏推荐结果：「${result.title_zh}」！${result.tag_zh}。找到你的：${url}`,
      `My rhythm game recommendation: ${result.title_en} — ${result.tag_en}. Find yours: ${url}`,
      `節奏遊戲推薦結果：「${result.title_zhTW}」！${result.tag_zhTW}。找到你的：${url}`,
      `リズムゲームのおすすめ結果：${result.title_ja} — ${result.tag_ja}。あなたも試してみて：${url}`,
      `리듬 게임 추천 결과: ${result.title_ko} — ${result.tag_ko}. 당신도 찾아보세요: ${url}`,
      `Mein Rhythmusspiel-Ergebnis: ${result.title_de} — ${result.tag_de}. Finde deins: ${url}`,
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
              {getLoc('入门建议：', 'Getting started: ', '入門建議：', 'はじめ方のヒント：', '시작 팁：', 'Einstiegstipp: ')}
            </span>
            {getLoc(result.tip_zh, result.tip_en, result.tip_zhTW, result.tip_ja, result.tip_ko, result.tip_de)}
          </p>
        </div>

        <div className="mb-4 rounded-xl border border-[#2d3d2d] bg-[#0f1a0f] p-4">
          <p className="text-center text-sm text-[#8a9a7a]">
            {getLoc(
              'TendFarm 正在研发农场节律追踪功能——把游戏里的生活节奏带入真实日常。',
              'TendFarm is building a farm rhythm tracker — bringing the rhythm of game life into real daily life.',
              'TendFarm 正在研發農場節律追蹤功能——把遊戲裡的生活節奏帶入真實日常。',
              'TendFarmは農場リズムトラッカーを開発中——ゲームの生活リズムをリアルな日常へ。',
              'TendFarm은 농장 리듬 트래커를 개발 중——게임 속 생활 리듬을 현실 일상으로.',
              'TendFarm baut einen Farm-Rhythmus-Tracker — der Lebensrhythmus aus dem Spiel ins echte Leben bringen.',
            )}
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <ShareButton text={shareText} locale={locale} />
          <button
            onClick={() => { setAnswers(Array(QUESTIONS.length).fill(null)); setSubmitted(false) }}
            className="flex-1 rounded-xl border border-[#2d3d2d] py-3 text-sm text-[#8a9a7a] hover:border-[#4a5a4a] hover:text-[#e8dcc8]"
          >
            {getLoc('重新测试', 'Retake Quiz', '重新測試', 'もう一度やり直す', '다시 테스트', 'Quiz wiederholen')}
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
            '哪款节奏音乐游戏最适合你？',
            'Which Rhythm Game Is Right for You?',
            '哪款節奏音樂遊戲最適合你？',
            'あなたに合うリズムゲームはどれ？',
            '나에게 맞는 리듬 게임은?',
            'Welches Rhythmusspiel passt zu dir?',
          )}
        </h1>
        <p className="text-sm text-[#8a9a7a]">
          {getLoc(
            '6 个问题，从再见狂心、长号冠军、地下墓穴：亡灵舞者、褪黑素中找到你的完美节奏游戏',
            '6 questions to match you with Sayonara Wild Hearts, Trombone Champ, Crypt of the NecroDancer, or Melatonin',
            '6 個問題，從再見狂心、長號冠軍、地下墓穴：亡靈舞者、褪黑素中找到你的完美節奏遊戲',
            '6問で、Sayonara Wild Hearts・Trombone Champ・Crypt of the NecroDancer・Melatonin からあなたにぴったりのゲームを見つけよう',
            '6개의 질문으로 Sayonara Wild Hearts, Trombone Champ, Crypt of the NecroDancer, Melatonin 중 나에게 맞는 게임을 찾아보자',
            '6 Fragen, um dein perfektes Rhythmusspiel aus Sayonara Wild Hearts, Trombone Champ, Crypt of the NecroDancer und Melatonin zu finden',
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
        {getLoc('找到我的节奏游戏', 'Find My Rhythm Game', '找到我的節奏遊戲', '自分のリズムゲームを見つける', '내 리듬 게임 찾기', 'Mein Rhythmusspiel finden')}
      </button>
    </div>
  )
}
