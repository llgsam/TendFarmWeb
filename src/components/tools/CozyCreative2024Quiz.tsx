'use client'

import { useState } from 'react'
import { BASE_URL } from '@/lib/config'

type Pick = 'tiny-glade' | 'sticky-business' | 'cocoon' | 'viewfinder'

function ShareButton({ text, locale }: { text: string; locale: string }) {
  const [copied, setCopied] = useState(false)
  const getLoc = (zh: string, en: string, zhTW?: string, ja?: string, ko?: string, de?: string): string => {
    if (locale === 'zh') return zh
    if (locale === 'zh-TW') return zhTW ?? zh
    if (locale === 'ja') return ja ?? en
    if (locale === 'ko') return ko ?? en
    if (locale === 'de') return de ?? en
    return en
  }
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`, '_blank')
    }
  }
  return (
    <div className="flex flex-1 gap-3">
      <button
        onClick={handleCopy}
        className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-[#2d3d2d] bg-[#1a2e1a]/50 px-4 py-3 text-sm text-[#e8dcc8] transition-colors hover:border-[#f0a832]/40 hover:text-[#f0a832]"
      >
        {copied
          ? `✓ ${getLoc('已复制！', 'Copied!', '已複製！', 'コピーしました！', '복사되었습니다!', 'Kopiert!')}`
          : `📋 ${getLoc('复制结果', 'Copy result', '複製結果', 'コピー', '복사하기', 'Kopieren')}`}
      </button>
      <a
        href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 rounded-xl border border-[#2d3d2d] bg-[#1a2e1a]/50 px-4 py-3 text-sm text-[#e8dcc8] transition-colors hover:border-[#1d9bf0]/40 hover:text-[#1d9bf0]"
      >
        𝕏 {getLoc('分享', 'Share', '分享', 'シェア', '공유', 'Teilen')}
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
    q_en: 'What is the most satisfying creative feeling for you?',
    q_zh: '对你来说最令人满足的创意感觉是什么？',
    q_zhTW: '對你來說最令人滿足的創意感覺是什麼？',
    q_ja: 'あなたにとって最も満足のいく創作の感覚は何ですか？',
    q_ko: '당신에게 가장 만족스러운 창의적인 느낌은 무엇인가요?',
    q_de: 'Welches kreative Gefühl befriedigt dich am meisten?',
    options: [
      {
        en: 'Watching something beautiful emerge from nothing — no rules, no wrong answers, just form taking shape',
        zh: '看着美丽的东西从无到有地出现——没有规则、没有错误答案，只是形态逐渐成形',
        zhTW: '看著美麗的東西從無到有地出現——沒有規則、沒有錯誤答案，只是形態逐漸成形',
        ja: '何もないところから美しいものが生まれる瞬間——ルールもなく、間違いもなく、ただ形が生まれていく感覚',
        ko: '아무것도 없는 곳에서 아름다운 것이 나타나는 것을 보는 것——규칙도 없고, 틀린 답도 없고, 그저 형태가 잡혀가는 느낌',
        de: 'Wie aus dem Nichts etwas Schönes entsteht — keine Regeln, keine falschen Antworten, nur Formen, die sich entwickeln',
        type: 'tiny-glade',
      },
      {
        en: 'Making something small and personal that someone else will love — something that carries your aesthetic into the world',
        zh: '制作一些小而个人的东西，让别人会喜欢——将你的美学带入世界的东西',
        zhTW: '製作一些小而個人的東西，讓別人會喜歡——將你的美學帶入世界的東西',
        ja: '誰かが喜んでくれる小さくて個性的なものを作ること——自分の美意識を世界に届けるもの',
        ko: '다른 사람이 좋아할 작고 개인적인 것을 만드는 것——자신의 미학을 세상에 전달하는 무언가',
        de: 'Etwas Kleines und Persönliches schaffen, das jemand anderen glücklich macht — deine Ästhetik in die Welt tragen',
        type: 'sticky-business',
      },
      {
        en: 'The moment a complex system suddenly makes sense — when the pieces lock together and you see the whole structure',
        zh: '复杂系统突然变得清晰的那一刻——当各部分咬合在一起，你看到了整体结构',
        zhTW: '複雜系統突然變得清晰的那一刻——當各部分咬合在一起，你看到了整體結構',
        ja: '複雑なシステムが突然つながる瞬間——パーツがかみ合って、全体の構造が見えてくる感覚',
        ko: '복잡한 시스템이 갑자기 이해되는 순간——조각들이 맞물리고 전체 구조가 보이는 그때',
        de: 'Der Moment, wenn ein komplexes System plötzlich Sinn ergibt — wenn alles zusammenpasst und du die ganze Struktur siehst',
        type: 'cocoon',
      },
      {
        en: 'Finding a completely new angle on a familiar thing — a perspective shift that makes the obvious impossible and the impossible obvious',
        zh: '在熟悉的事物上找到全新角度——一种视角转换，让显而易见的东西变得不可能，让不可能的东西变得显而易见',
        zhTW: '在熟悉的事物上找到全新角度——一種視角轉換，讓顯而易見的東西變得不可能，讓不可能的東西變得顯而易見',
        ja: '見慣れたものにまったく新しい角度を見つけること——視点が変わることで、当たり前が不可能になり、不可能が当たり前になる',
        ko: '익숙한 것에서 완전히 새로운 각도를 찾는 것——시각이 전환되어 당연한 것이 불가능해지고 불가능한 것이 당연해지는 경험',
        de: 'Einen völlig neuen Blickwinkel auf etwas Vertrautes finden — eine Perspektivverschiebung, die das Offensichtliche unmöglich und das Unmögliche offensichtlich macht',
        type: 'viewfinder',
      },
    ],
  },
  {
    q_en: 'Which best describes how you like to spend creative time?',
    q_zh: '以下哪个最能描述你喜欢如何度过创意时间？',
    q_zhTW: '以下哪個最能描述你喜歡如何度過創意時間？',
    q_ja: '創作の時間をどう過ごしたいか、最もよく表しているのはどれですか？',
    q_ko: '창의적인 시간을 어떻게 보내고 싶은지 가장 잘 설명하는 것은 무엇인가요?',
    q_de: 'Was beschreibt am besten, wie du deine kreative Zeit verbringen möchtest?',
    options: [
      {
        en: 'Completely unstructured — I want to build whatever I want with no objectives, no timers, no right way to do it',
        zh: '完全无结构——我想在没有目标、没有计时器、没有正确方式的情况下构建任何我想要的东西',
        zhTW: '完全無結構——我想在沒有目標、沒有計時器、沒有正確方式的情況下構建任何我想要的東西',
        ja: '完全に自由——目標もタイマーも正しいやり方もなく、何でも好きなものを作りたい',
        ko: '완전히 자유롭게——목표도, 타이머도, 정해진 방법도 없이 원하는 것을 무엇이든 만들고 싶다',
        de: 'Völlig frei und unstrukturiert — ich will bauen was ich will, ohne Ziele, Timer oder richtige Vorgehensweise',
        type: 'tiny-glade',
      },
      {
        en: 'Light structure with creative freedom — a gentle goal gives me direction, but the choices about how to express it are fully mine',
        zh: '轻度结构加上创意自由——温和的目标给我方向，但如何表达的选择完全是我的',
        zhTW: '輕度結構加上創意自由——溫和的目標給我方向，但如何表達的選擇完全是我的',
        ja: '少しだけ方向性があって、あとは自由——ゆるい目標が道しるべになりつつ、表現の選択はすべて自分次第',
        ko: '가벼운 구조에 창의적 자유——부드러운 목표가 방향을 잡아주지만, 어떻게 표현할지는 완전히 내 선택',
        de: 'Leichte Struktur mit kreativer Freiheit — ein sanftes Ziel gibt mir Orientierung, aber wie ich es ausdrücke, entscheide ich selbst',
        type: 'sticky-business',
      },
      {
        en: 'A clear problem with a satisfying solution — I want the puzzle to be genuinely clever and the solution to feel like a discovery',
        zh: '有明确问题和令人满足解决方案——我希望谜题真正聪明，解决方案感觉像是一个发现',
        zhTW: '有明確問題和令人滿足解決方案——我希望謎題真正聰明，解決方案感覺像是一個發現',
        ja: 'はっきりした問題に、すっきりした解答——パズルは本当に巧妙で、解けた瞬間が発見のように感じられてほしい',
        ko: '명확한 문제와 만족스러운 해결책——퍼즐이 진정으로 영리하고, 해답이 발견처럼 느껴지기를 원한다',
        de: 'Ein klares Problem mit einer befriedigenden Lösung — das Rätsel soll wirklich clever sein und die Lösung sich wie eine Entdeckung anfühlen',
        type: 'cocoon',
      },
      {
        en: 'Something that genuinely surprises me about how it works — mechanics I have never seen that make me rethink what games can do',
        zh: '让我真正对其工作方式感到惊讶的东西——我从未见过的机制，让我重新思考游戏可以做什么',
        zhTW: '讓我真正對其工作方式感到驚訝的東西——我從未見過的機制，讓我重新思考遊戲可以做什麼',
        ja: '仕組みに本当に驚かされるもの——見たことのないメカニクスで、ゲームの可能性を再考させてくれるもの',
        ko: '작동 방식이 진정으로 놀라운 것——한 번도 본 적 없는 메카닉으로 게임이 무엇을 할 수 있는지 다시 생각하게 만드는 것',
        de: 'Etwas, das mich wirklich überrascht, wie es funktioniert — Mechaniken, die ich noch nie gesehen habe und mich überdenken lassen, was Spiele können',
        type: 'viewfinder',
      },
    ],
  },
  {
    q_en: 'What kind of visual aesthetic appeals most to you right now?',
    q_zh: '目前哪种视觉美学最吸引你？',
    q_zhTW: '目前哪種視覺美學最吸引你？',
    q_ja: '今、どんなビジュアルスタイルが一番惹かれますか？',
    q_ko: '지금 어떤 시각적 미학이 가장 마음에 드나요?',
    q_de: 'Welche visuelle Ästhetik spricht dich gerade am meisten an?',
    options: [
      {
        en: 'Warm, miniature, and architectural — the feeling of looking at a tiny perfect world from above',
        zh: '温暖、微型和建筑感——从上方俯瞰一个微小完美世界的感觉',
        zhTW: '溫暖、微型和建築感——從上方俯瞰一個微小完美世界的感覺',
        ja: '温かくてミニチュアでアーキテクチャ的——小さな完璧な世界を上から眺めるような感覚',
        ko: '따뜻하고 미니어처 같은 건축적 느낌——위에서 작고 완벽한 세계를 내려다보는 느낌',
        de: 'Warm, miniaturhaft und architektonisch — das Gefühl, von oben auf eine winzig-perfekte Welt zu blicken',
        type: 'tiny-glade',
      },
      {
        en: 'Soft and bright with crafted details — the visual language of handmade objects and small-batch goods',
        zh: '柔和明亮、有手工细节——手工物品和小批量商品的视觉语言',
        zhTW: '柔和明亮、有手工細節——手工物品和小批量商品的視覺語言',
        ja: 'やわらかく明るく、手作り感のある細部——ハンドメイドの小物や少量生産品のビジュアル言語',
        ko: '부드럽고 밝으며 수공예 디테일——손으로 만든 소품과 소량 생산 제품의 시각적 언어',
        de: 'Weich und hell mit handgemachten Details — die visuelle Sprache von Handarbeit und kleinen Auflagen',
        type: 'sticky-business',
      },
      {
        en: 'Alien and organic — a world that looks like nothing else, with bioluminescent curves and strange geometries',
        zh: '异域而有机——一个看起来与众不同的世界，有生物发光的曲线和奇异的几何形状',
        zhTW: '異域而有機——一個看起來與眾不同的世界，有生物發光的曲線和奇異的幾何形狀',
        ja: 'エイリアン的で有機的——生物発光のカーブと不思議な幾何学模様が広がる、他に類を見ない世界',
        ko: '이질적이고 유기적인——생물 발광 곡선과 기이한 기하학으로 가득한, 다른 어떤 것과도 다른 세계',
        de: 'Alien und organisch — eine Welt wie keine andere, mit biolumineszenten Kurven und seltsamen Geometrien',
        type: 'cocoon',
      },
      {
        en: 'Clean and surreal — retro-futurist test facility meets mind-bending spatial paradox',
        zh: '干净而超现实——复古未来主义测试设施遇上令人费解的空间悖论',
        zhTW: '乾淨而超現實——復古未來主義測試設施遇上令人費解的空間悖論',
        ja: 'クリーンでシュールな——レトロフューチャーなテスト施設と空間的パラドックスが交差する世界',
        ko: '깔끔하고 초현실적인——레트로 미래주의 실험 시설과 기이한 공간적 역설이 만나는 세계',
        de: 'Clean und surreal — retrofuturistische Testanlage trifft auf raumverzerrende Paradoxe',
        type: 'viewfinder',
      },
    ],
  },
  {
    q_en: 'How important is narrative or story to you?',
    q_zh: '叙事或故事对你有多重要？',
    q_zhTW: '敘事或故事對你有多重要？',
    q_ja: 'ナラティブやストーリーはあなたにとってどれほど重要ですか？',
    q_ko: '서사나 이야기가 당신에게 얼마나 중요한가요?',
    q_de: 'Wie wichtig sind dir Erzählung oder Story?',
    options: [
      {
        en: 'Not at all — I want pure experience, no story required, just the act of creating',
        zh: '完全不重要——我想要纯粹的体验，不需要故事，只是创造的行为',
        zhTW: '完全不重要——我想要純粹的體驗，不需要故事，只是創造的行為',
        ja: '全く気にしない——ストーリーなしの純粋な体験が欲しい、ただ作ること自体が目的',
        ko: '전혀——순수한 경험을 원한다, 이야기 없이, 그저 창조하는 행위 자체',
        de: 'Gar nicht — ich will pure Erfahrung, kein Story erforderlich, nur das reine Erschaffen',
        type: 'tiny-glade',
      },
      {
        en: 'A gentle backdrop — I want to feel like my shop is part of a world, but the main appeal is the creative work',
        zh: '一个温和的背景——我希望感觉我的小店是一个世界的一部分，但主要吸引力是创意工作',
        zhTW: '一個溫和的背景——我希望感覺我的小店是一個世界的一部分，但主要吸引力是創意工作',
        ja: 'やさしい背景として——自分のショップが世界の一部に感じられれば十分で、主な魅力はやはり創作作業',
        ko: '부드러운 배경으로——내 가게가 어떤 세계의 일부인 것처럼 느껴지면 충분하고, 주된 매력은 창의적인 작업',
        de: 'Als sanfte Kulisse — ich will das Gefühl, dass mein Laden Teil einer Welt ist, aber der eigentliche Reiz ist die kreative Arbeit',
        type: 'sticky-business',
      },
      {
        en: 'An implicit story told through world-building — I want the world to have history I discover through exploration, not cutscenes',
        zh: '通过世界构建讲述的隐性故事——我希望世界有通过探索而非过场动画发现的历史',
        zhTW: '通過世界構建講述的隱性故事——我希望世界有通過探索而非過場動畫發現的歷史',
        ja: 'ワールドビルディングで語られる暗黙のストーリー——カットシーンではなく探索で発見できる歴史が世界に欲しい',
        ko: '세계 구축을 통해 전달되는 암묵적 이야기——컷씬이 아닌 탐험을 통해 발견하는 역사가 세계에 담겨 있으면 좋겠다',
        de: 'Eine implizite Geschichte durch World-Building — ich will eine Welt mit Geschichte, die ich durch Erkundung entdecke, nicht durch Cutscenes',
        type: 'cocoon',
      },
      {
        en: 'A mystery to solve — I want the environment itself to be a puzzle that hints at what happened here',
        zh: '一个需要解决的谜——我希望环境本身就是一个谜题，暗示着这里曾经发生过什么',
        zhTW: '一個需要解決的謎——我希望環境本身就是一個謎題，暗示著這裡曾經發生過什麼',
        ja: '解くべきミステリー——環境そのものがパズルになっていて、ここで何が起きたのかを示唆してほしい',
        ko: '풀어야 할 미스터리——환경 자체가 수수께끼가 되어 여기서 무슨 일이 있었는지를 암시하는 것',
        de: 'Ein Rätsel, das ich lösen soll — ich will, dass die Umgebung selbst ein Puzzle ist, das andeutet, was hier passiert ist',
        type: 'viewfinder',
      },
    ],
  },
  {
    q_en: 'How do you feel about challenge and failure in games?',
    q_zh: '你如何看待游戏中的挑战和失败？',
    q_zhTW: '你如何看待遊戲中的挑戰和失敗？',
    q_ja: 'ゲームの難しさと失敗についてどう思いますか？',
    q_ko: '게임의 도전과 실패에 대해 어떻게 생각하나요?',
    q_de: 'Wie stehst du zu Herausforderungen und Misserfolgen in Spielen?',
    options: [
      {
        en: 'I actively avoid challenge — I want a game I cannot lose, where every action is just expression',
        zh: '我主动回避挑战——我想要一款我不会输的游戏，每个动作只是表达',
        zhTW: '我主動回避挑戰——我想要一款我不會輸的遊戲，每個動作只是表達',
        ja: '難しさは積極的に避けたい——負けることのないゲームが欲しい、すべての行動が表現であるような',
        ko: '도전을 적극적으로 피한다——질 수 없는 게임을 원하고, 모든 행동이 그저 표현이었으면 한다',
        de: 'Ich vermeide Herausforderungen aktiv — ich will ein Spiel, das ich nicht verlieren kann, wo jede Aktion einfach Ausdruck ist',
        type: 'tiny-glade',
      },
      {
        en: 'Light challenge is fine — mild resource management or timing keeps me engaged without frustrating me',
        zh: '轻度挑战没问题——轻微的资源管理或时机让我保持参与感，而不会让我沮丧',
        zhTW: '輕度挑戰沒問題——輕微的資源管理或時機讓我保持參與感，而不會讓我沮喪',
        ja: '軽いチャレンジなら大丈夫——ちょっとした資源管理やタイミングがあると飽きないし、ストレスにもならない',
        ko: '가벼운 도전은 괜찮다——약간의 자원 관리나 타이밍이 있으면 집중력이 유지되고 짜증나지 않는다',
        de: 'Leichte Herausforderungen sind okay — leichtes Ressourcenmanagement oder Timing hält mich bei der Stange, ohne mich zu frustrieren',
        type: 'sticky-business',
      },
      {
        en: 'I welcome challenge that is fair and elegant — if a puzzle stumps me, I want to feel I could have seen it',
        zh: '我欢迎公平而优雅的挑战——如果一个谜题难倒我，我希望感觉我本可以看出来',
        zhTW: '我歡迎公平而優雅的挑戰——如果一個謎題難倒我，我希望感覺我本可以看出來',
        ja: 'フェアでエレガントな難しさを歓迎する——パズルで詰まっても、「気づけたはずだ」と感じられる設計がいい',
        ko: '공정하고 우아한 도전을 환영한다——퍼즐에 막혀도 "내가 볼 수 있었을 텐데"라고 느낄 수 있는 설계',
        de: 'Ich mag Herausforderungen, die fair und elegant sind — wenn mich ein Rätsel aufhält, will ich das Gefühl haben, ich hätte es sehen können',
        type: 'cocoon',
      },
      {
        en: 'I enjoy the feeling of being genuinely stumped — and then suddenly solving something I thought was impossible',
        zh: '我享受真正被难住的感觉——然后突然解决了一些我认为不可能的事情',
        zhTW: '我享受真正被難住的感覺——然後突然解決了一些我認為不可能的事情',
        ja: '本当に行き詰まる感覚が好き——そして不可能だと思っていたことが突然解けた時の快感',
        ko: '진짜로 막히는 느낌을 즐긴다——그리고 불가능하다고 생각했던 것을 갑자기 해결했을 때의 쾌감',
        de: 'Ich genieße das Gefühl, wirklich feststecken — und dann plötzlich etwas zu lösen, das ich für unmöglich hielt',
        type: 'viewfinder',
      },
    ],
  },
  {
    q_en: 'Which of these screenshots would stop your scroll?',
    q_zh: '以下哪张截图会让你停止滑动？',
    q_zhTW: '以下哪張截圖會讓你停止滑動？',
    q_ja: 'これらのスクリーンショットの中で、スクロールを止めるものはどれですか？',
    q_ko: '다음 스크린샷 중 스크롤을 멈추게 할 것은 무엇인가요?',
    q_de: 'Welcher dieser Screenshots würde dich beim Scrollen stoppen?',
    options: [
      {
        en: 'A tiny golden castle nestled in autumn leaves, with soft fog, a winding path, and a warm evening glow over perfect stone',
        zh: '一座嵌在秋叶中的微型金色城堡，有柔和的雾气、蜿蜒的小路和完美石材上温暖的傍晚光芒',
        zhTW: '一座嵌在秋葉中的微型金色城堡，有柔和的霧氣、蜿蜒的小路和完美石材上溫暖的傍晚光芒',
        ja: '秋の葉に囲まれた小さな黄金の城、柔らかな霧、曲がりくねった小道、完璧な石畳を染める夕暮れの温かな光',
        ko: '가을 낙엽 속에 자리 잡은 작은 황금 성, 부드러운 안개, 구불구불한 길, 완벽한 돌 위에 내리쬐는 따뜻한 저녁 빛',
        de: 'Ein winziges goldenes Schloss in Herbstblättern, mit sanftem Nebel, einem gewundenen Pfad und warmem Abendlicht über perfekten Steinen',
        type: 'tiny-glade',
      },
      {
        en: 'A flat-lay of dozens of handcrafted sticker sheets, each with a different pastel theme, laid out perfectly on a wooden surface',
        zh: '数十张手工贴纸表格的俯拍，每张都有不同的粉彩主题，完美地摆放在木制表面上',
        zhTW: '數十張手工貼紙表格的俯拍，每張都有不同的粉彩主題，完美地擺放在木製表面上',
        ja: '木の板に美しく並べられた、それぞれ異なるパステルテーマのハンドメイドシールシートを何十枚も並べた俯瞰写真',
        ko: '각기 다른 파스텔 테마를 가진 수십 장의 수제 스티커 시트를 나무 표면 위에 완벽하게 배열한 플랫레이 사진',
        de: 'Eine Flat-Lay mit Dutzenden handgefertigter Stickerbögen, jeder in einem anderen Pastellthema, perfekt auf einer Holzoberfläche arrangiert',
        type: 'sticky-business',
      },
      {
        en: 'A glowing beetle carrying a small world inside its shell, standing at the entrance of a strange organic tunnel',
        zh: '一只发光的甲虫，在其外壳内携带一个小世界，站在一条奇怪有机隧道的入口',
        zhTW: '一隻發光的甲蟲，在其外殼內攜帶一個小世界，站在一條奇怪有機隧道的入口',
        ja: 'その甲羅の中に小さな世界を宿した光り輝くカブトムシが、奇妙な有機的なトンネルの入口に立っている',
        ko: '껍데기 안에 작은 세계를 품은 발광하는 딱정벌레가 이상한 유기적 터널의 입구에 서 있는 모습',
        de: 'Ein leuchtender Käfer, der eine kleine Welt in seinem Panzer trägt, am Eingang eines seltsamen organischen Tunnels',
        type: 'cocoon',
      },
      {
        en: 'A polaroid photo placed in front of a cliff, and through the photo, a bridge that should not exist appears where the cliff was',
        zh: '一张宝丽来照片放在悬崖前，通过照片，一座本不应存在的桥梁出现在悬崖曾经所在的地方',
        zhTW: '一張拍立得照片放在懸崖前，通過照片，一座本不應存在的橋梁出現在懸崖曾經所在的地方',
        ja: '崖の前に置かれたポラロイド写真——その写真を通して、崖があった場所にあるはずのない橋が現れている',
        ko: '절벽 앞에 놓인 폴라로이드 사진——그 사진을 통해 절벽이 있던 자리에 존재하면 안 될 다리가 나타나 있다',
        de: 'Ein Polaroidfoto, das vor einer Klippe platziert wird — und durch das Foto erscheint eine Brücke, die dort nicht sein sollte',
        type: 'viewfinder',
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
  'tiny-glade': {
    title_en: 'Tiny Glade',
    title_zh: 'Tiny Glade',
    title_zhTW: 'Tiny Glade',
    title_ja: 'Tiny Glade',
    title_ko: 'Tiny Glade',
    title_de: 'Tiny Glade',
    emoji: '🏰',
    tag_en: 'A tiny castle diorama builder with no objectives, no fail states, and procedural details that make every stone wall unique',
    tag_zh: '一款微型城堡立体场景构建器——没有目标、没有失败状态，程序生成细节让每面石墙都独一无二',
    tag_zhTW: '一款微型城堡立體場景構建器——沒有目標、沒有失敗狀態，程序生成細節讓每面石牆都獨一無二',
    tag_ja: '目標もクリア条件もない、手続き型で生成される細部が美しいミニチュア城ジオラマビルダー',
    tag_ko: '목표도 실패 조건도 없는, 절차적으로 생성되는 디테일이 아름다운 미니어처 성 디오라마 빌더',
    tag_de: 'Ein Miniatur-Schloss-Diorama-Baukasten ohne Ziele, ohne Scheitern, mit prozeduralen Details, die jede Steinmauer einzigartig machen',
    platform_en: 'Available on: PC (Steam) — about $15',
    platform_zh: '可在以下平台获取：PC（Steam）——约 15 美元',
    platform_zhTW: '可在以下平台取得：PC（Steam）——約 15 美元',
    platform_ja: '対応プラットフォーム：PC（Steam）— 約 2,000 円',
    platform_ko: '출시 플랫폼: PC（Steam）— 약 15달러',
    platform_de: 'Erhältlich auf: PC (Steam) — ca. 15 €',
    why_en:
      "Tiny Glade (2024) became an overnight viral sensation in early 2024 because its demo footage showed something the cozy gaming community had never quite seen: a builder where every element procedurally adapts in real time as you place it. Stone walls grow moss where shaded. Roofs tile differently depending on pitch and material. Ivy climbs whatever you position it near. Flowers find their own configuration in the space you give them. There are no objectives, no resources to manage, no fail states of any kind — Tiny Glade is a pure creative sandbox that generates screenshots that look like fantasy concept art. The emotional loop is complete serenity: you shape a small corner of a golden or misty or autumnal world, take a screenshot, and feel satisfied by the act of making something beautiful. At $15, it is one of the most accessible and beloved creative games of 2024. Released in September 2024 by Pounce Light, a two-person studio. Extremely suitable for short sessions of any length.",
    why_zh:
      'Tiny Glade（2024 年）在 2024 年初凭借 demo 视频片段一夜走红，因为它展示了 cozy 游戏社区从未完全见过的东西：一款每个元素都在你放置时实时程序性适应的构建游戏。石墙在阴影处长苔藓。屋顶根据坡度和材料不同方式铺设。常青藤攀爬你放置在附近的任何东西。花卉在你给予的空间内找到自己的配置。没有目标、没有资源管理、没有任何形式的失败状态——Tiny Glade 是一个纯创意沙盒，生成的截图看起来像奇幻概念艺术。情感循环是完全的宁静：你塑造一个金色或朦胧或秋日世界的小角落，截图，对制作美丽事物的行为感到满足。15 美元，是 2024 年最易得且最受喜爱的创意游戏之一。2024 年 9 月由两人工作室 Pounce Light 发布。非常适合任何长度的短游戏。',
    why_zhTW:
      'Tiny Glade（2024 年）在 2024 年初憑藉 demo 影片片段一夜爆紅，因為它展示了 cozy 遊戲社群從未完全見過的東西：一款每個元素都在你放置時即時程序生成適應的建造遊戲。石牆在陰影處長青苔。屋頂根據坡度和材質以不同方式鋪設。常春藤攀爬你放置在附近的任何東西。花卉在你給予的空間內找到自己的配置。沒有目標、沒有資源管理、沒有任何形式的失敗狀態——Tiny Glade 是一個純創意沙盒，生成的截圖看起來像奇幻概念藝術。情感循環是完全的寧靜：你塑造一個金色或朦朧或秋日世界的小角落，截圖，對製作美麗事物的行為感到滿足。15 美元，是 2024 年最易取得且最受喜愛的創意遊戲之一。2024 年 9 月由兩人工作室 Pounce Light 發布。非常適合任何長度的短遊戲。',
    why_ja:
      'Tiny Glade（2024年）は2024年初頭、デモ映像がSNSで一気に拡散して話題になりました。cozyゲームコミュニティがそれまで見たことのないもの——配置するたびに各要素がリアルタイムで手続き的に変化するビルダーゲームを見せてくれたからです。石壁は日陰になるとコケが生えます。屋根は勾配と素材に応じて異なるタイル配置になります。ツタは近くに置いたものを自然に伝い登ります。花は与えた空間の中で自分なりの形を見つけます。目標もリソース管理も、失敗する要素も一切ありません——Tiny Gladeはファンタジーのコンセプトアートのようなスクリーンショットが撮れる、純粋なクリエイティブサンドボックスです。感情のループは完全な安らぎ：黄金色や霧がかった秋の世界の小さな一角を形作り、スクショを撮り、美しいものを作るという行為に満足感を得る。約2,000円で、2024年で最もアクセスしやすく愛されたクリエイティブゲームの一つです。2024年9月、2人組スタジオPounce Lightがリリース。どんな長さのプレイセッションにも最適です。',
    why_ko:
      'Tiny Glade（2024）는 2024년 초 데모 영상이 SNS에서 급속도로 퍼지며 하룻밤 사이에 화제가 됐습니다. cozy 게임 커뮤니티가 그전까지 본 적 없는 것——배치할 때마다 각 요소가 실시간으로 절차적으로 적응하는 빌더 게임을 보여줬기 때문입니다. 석벽은 그늘진 곳에 이끼가 낍니다. 지붕은 경사도와 재질에 따라 다르게 타일링됩니다. 담쟁이덩굴은 근처에 놓은 것을 자연스럽게 타고 오릅니다. 꽃은 주어진 공간 안에서 스스로 배치를 찾습니다. 목표도, 자원 관리도, 어떤 형태의 실패 조건도 없습니다——Tiny Glade는 판타지 컨셉 아트 같은 스크린샷이 나오는 순수 창의 샌드박스입니다. 감정적 루프는 완전한 평온: 황금빛이나 안개 낀 가을 세계의 작은 한 구석을 다듬고, 스크린샷을 찍고, 아름다운 것을 만든다는 행위에 만족감을 느낍니다. 15달러로 2024년 가장 접근하기 쉽고 사랑받은 창의 게임 중 하나입니다. 2024년 9월 2인 스튜디오 Pounce Light가 출시. 어떤 길이의 짧은 세션에도 완벽하게 어울립니다.',
    why_de:
      'Tiny Glade (2024) wurde Anfang 2024 über Nacht viral — das Demo-Video zeigte etwas, das die cozy Gaming-Community noch nie so gesehen hatte: ein Aufbauspiel, bei dem sich jedes Element in Echtzeit prozedural anpasst, wenn du es platzierst. Steinmauern bekommen Moos, wo sie im Schatten liegen. Dächer verlegen sich unterschiedlich je nach Neigung und Material. Efeu klettert an allem hoch, was du in der Nähe positionierst. Blumen finden ihre eigene Konfiguration in dem Raum, den du ihnen gibst. Keine Ziele, kein Ressourcenmanagement, keine Misserfolgs-Zustände irgendeiner Art — Tiny Glade ist eine reine kreative Sandbox, die Screenshots erzeugt, die wie Fantasy-Konzeptkunst aussehen. Der emotionale Loop ist vollständige Stille: Du gestaltest eine kleine Ecke einer goldenen, nebligen oder herbstlichen Welt, machst einen Screenshot und bist zufrieden damit, etwas Schönes gemacht zu haben. Für ca. 15 € ist es eines der zugänglichsten und beliebtesten kreativen Spiele von 2024. Erschienen im September 2024 von Pounce Light, einem Zwei-Personen-Studio. Ideal für kurze Sessions jeder Länge.',
    tip_en: "Use the fog slider — the atmospheric fog transforms even a simple arch into something ethereal. And don't overlook the path tool: letting Tiny Glade auto-generate cobblestone paths between your structures produces organic results that look far more intentional than anything you could draw by hand.",
    tip_zh: '使用雾气滑块——大气雾气将即使是简单的拱门也变成虚幻的东西。不要忽视路径工具：让 Tiny Glade 在你的建筑之间自动生成鹅卵石路径，产生的有机结果看起来比你用手绘制的任何东西都更有意图。',
    tip_zhTW: '使用霧氣滑桿——大氣霧氣能將即使是簡單的拱門也變成虛幻之物。不要忽視路徑工具：讓 Tiny Glade 在你的建築之間自動生成鵝卵石小路，產生的有機結果看起來比你用手繪製的任何東西都更有意圖。',
    tip_ja: '霧のスライダーを使いましょう——大気の霧があるだけで、シンプルなアーチでも幻想的な雰囲気になります。パスツールも見逃さないで：建物の間にTiny Gladeが自動生成する石畳の小道は、手で描くどんな道よりも有機的で自然な仕上がりになります。',
    tip_ko: '안개 슬라이더를 사용해 보세요——대기 안개가 있으면 단순한 아치도 신비로운 느낌으로 바뀝니다. 경로 도구도 놓치지 마세요: Tiny Glade가 건물 사이에 자동 생성하는 자갈길은 손으로 그린 어떤 것보다 훨씬 자연스럽고 의도적으로 보이는 유기적인 결과물을 만들어 냅니다.',
    tip_de: 'Benutze den Nebel-Slider — der atmosphärische Nebel verwandelt selbst einen einfachen Bogen in etwas Ätherisches. Und vernachlässige nicht das Pfad-Tool: die automatisch generierten Kopfsteinpflasterwege, die Tiny Glade zwischen deinen Gebäuden erzeugt, wirken organischer und intentionaler als alles, was du von Hand zeichnen könntest.',
  },
  'sticky-business': {
    title_en: 'Sticky Business',
    title_zh: 'Sticky Business',
    title_zhTW: 'Sticky Business',
    title_ja: 'Sticky Business',
    title_ko: 'Sticky Business',
    title_de: 'Sticky Business',
    emoji: '🌸',
    tag_en: 'A cozy sticker design and shop sim — create original sticker sheets, package orders with care, and build a small online community',
    tag_zh: '一款 cozy 贴纸设计和小店模拟——创作原创贴纸表格、用心包装订单并建立一个小型网络社区',
    tag_zhTW: '一款 cozy 貼紙設計和小店模擬——創作原創貼紙表格、用心包裝訂單並建立一個小型網絡社群',
    tag_ja: 'cozyなステッカーデザイン＆ショップシム——オリジナルステッカーシートを作り、心を込めて注文を梱包し、小さなオンラインコミュニティを育てよう',
    tag_ko: 'cozy 스티커 디자인 & 샵 시뮬레이션——오리지널 스티커 시트를 만들고, 정성껏 주문을 포장하고, 작은 온라인 커뮤니티를 만들어 보자',
    tag_de: 'Ein gemütlicher Sticker-Design-und-Shop-Sim — erstelle originale Stickerbögen, verpacke Bestellungen mit Sorgfalt und baue eine kleine Online-Community auf',
    platform_en: 'Available on: PC (Steam), Nintendo Switch — about $15',
    platform_zh: '可在以下平台获取：PC（Steam）、Nintendo Switch——约 15 美元',
    platform_zhTW: '可在以下平台取得：PC（Steam）、Nintendo Switch——約 15 美元',
    platform_ja: '対応プラットフォーム：PC（Steam）、Nintendo Switch — 約 2,000 円',
    platform_ko: '출시 플랫폼: PC（Steam）、Nintendo Switch — 약 15달러',
    platform_de: 'Erhältlich auf: PC (Steam), Nintendo Switch — ca. 15 €',
    why_en:
      "Sticky Business (2023) occupies a niche that was previously underserved: a cozy game specifically for people who love the craft and aesthetic of designing small goods and the community that forms around them. You design sticker sheets (using provided elements and color palettes), receive online orders from customers who have specific preferences and personalities, package each order carefully (selecting wrapping paper, stickers, and packing tape that match the customer's vibe), and gradually build a following. The packaging mechanic is deeply satisfying in a tactile way — matching the customer's preferences for each package creates a small moment of empathy and care. The customer characters have personalities that emerge over multiple orders: you learn what they love, what occasion they are preparing for, and what kind of shop owner they want you to be. At $15 on PC and Switch, it is one of the most specifically targeted cozy games in recent years — if the premise sounds appealing, the execution delivers exactly what it promises.",
    why_zh:
      'Sticky Business（2023 年）占据了一个之前服务不足的细分市场：一款专门为喜欢设计小商品的工艺和美学以及围绕它们形成的社区的人设计的 cozy 游戏。你设计贴纸表格（使用提供的元素和色彩调色板），从有特定偏好和个性的客户那里收到在线订单，仔细包装每个订单（选择与客户氛围匹配的包装纸、贴纸和打包胶带），并逐渐建立追随者群体。包装机制在触觉上非常令人满足——为每个包裹匹配客户的偏好创造了一个小小的同理心和关怀时刻。客户角色的个性在多个订单中逐渐显现：你了解他们喜欢什么、他们正在为什么场合准备，以及他们希望你成为什么样的店主。PC 和 Switch 上 15 美元，是近年来最具针对性的 cozy 游戏之一——如果前提听起来吸引人，执行恰好兑现了它的承诺。',
    why_zhTW:
      'Sticky Business（2023 年）填補了一個之前服務不足的細分市場：一款專門為喜歡設計小商品的工藝和美學以及圍繞它們形成的社群的人設計的 cozy 遊戲。你設計貼紙表格（使用提供的元素和色彩調色板），從有特定偏好和個性的顧客那裡收到線上訂單，仔細包裝每個訂單（選擇與顧客氛圍匹配的包裝紙、貼紙和打包膠帶），並逐漸建立追隨者群體。包裝機制在觸感上非常令人滿足——為每個包裹匹配顧客的偏好創造了一個小小的同理心和關懷時刻。顧客角色的個性在多個訂單中逐漸顯現：你了解他們喜歡什麼、他們正在為什麼場合準備，以及他們希望你成為什麼樣的店主。PC 和 Switch 上 15 美元，是近年來最具針對性的 cozy 遊戲之一——如果前提聽起來吸引人，執行恰好兌現了它的承諾。',
    why_ja:
      'Sticky Business（2023年）は、これまで十分に対応されていなかったニッチを占める作品です：小さなグッズのデザインやクラフト、その美学、そしてそれを通じて生まれるコミュニティが好きな人のためのcozyゲームです。ステッカーシートをデザインし（用意された素材やカラーパレットを使って）、特定の好みや個性を持つお客さんからオンライン注文を受け取り、各注文を丁寧に梱包し（お客さんの雰囲気に合った包装紙、ステッカー、梱包テープを選んで）、徐々にファンを増やしていきます。梱包のメカニクスはとても触覚的な満足感があります——お客さんの好みに合わせて各パッケージを選ぶことで、小さな共感と気遣いの瞬間が生まれます。お客さんキャラクターの個性は複数の注文を通じて徐々に見えてきます：何が好きで、どんな場面のために準備しているのか、どんなショップオーナーになってほしいのかが分かってきます。PCとSwitchで約2,000円、近年でも最もターゲットを絞ったcozyゲームの一つです——前提が魅力的に感じられるなら、実行も期待通りです。',
    why_ko:
      'Sticky Business（2023）는 이전까지 충분히 다뤄지지 않았던 틈새를 채우는 작품입니다: 작은 소품의 디자인과 공예, 그 미학, 그리고 그것을 중심으로 형성되는 커뮤니티를 좋아하는 사람을 위한 cozy 게임입니다. 스티커 시트를 디자인하고（제공된 요소와 컬러 팔레트 사용）, 특정 취향과 개성을 가진 고객들로부터 온라인 주문을 받고, 각 주문을 정성껏 포장하고（고객의 분위기에 맞는 포장지, 스티커, 포장 테이프 선택）, 서서히 팔로워를 쌓아갑니다. 포장 메카닉은 촉각적으로 매우 만족스럽습니다——각 패키지에 고객의 취향을 맞추는 것이 작은 공감과 배려의 순간을 만들어 냅니다. 고객 캐릭터들의 개성은 여러 주문을 통해 서서히 드러납니다: 무엇을 좋아하는지, 어떤 장소를 위해 준비하는지, 어떤 가게 주인이 되기를 바라는지를 알게 됩니다. PC와 Switch에서 15달러로 최근 몇 년간 가장 타깃이 명확한 cozy 게임 중 하나입니다——전제가 마음에 든다면 실행도 기대를 정확히 충족합니다.',
    why_de:
      'Sticky Business (2023) besetzt eine Nische, die bisher kaum bedient wurde: ein cozy Spiel speziell für Menschen, die das Handwerk und die Ästhetik des Designens kleiner Waren lieben und die Gemeinschaft, die sich darum bildet. Du entwirfst Stickerbögen (mit bereitgestellten Elementen und Farbpaletten), bekommst Online-Bestellungen von Kunden mit bestimmten Vorlieben und Persönlichkeiten, verpackst jede Bestellung sorgfältig (wählst Packpapier, Sticker und Klebeband, die zur Stimmung des Kunden passen) und baust langsam eine Fangemeinde auf. Die Verpackungsmechanik ist auf eine taktile Weise sehr befriedigend — jedes Paket auf die Vorlieben des Kunden abzustimmen, schafft kleine Momente von Empathie und Fürsorge. Die Kundenfiguren entwickeln über mehrere Bestellungen hinweg Persönlichkeiten: Du lernst, was sie lieben, für welchen Anlass sie sich vorbereiten und was für eine Ladenbesitzerin sie in dir sehen wollen. Für ca. 15 € auf PC und Switch ist es eines der zielgerichtetsten cozy Spiele der letzten Jahre — wenn die Prämisse ansprechend klingt, hält das Spiel genau was es verspricht.',
    tip_en: "Pay attention to customer notes and repeat orders — some customers leave hints about their next purchase or reveal backstory details that change how their packages feel to pack. The game rewards careful reading.",
    tip_zh: '注意客户留言和重复订单——一些客户留下关于下次购买的暗示，或透露改变包装感觉的背景故事细节。游戏奖励仔细阅读。',
    tip_zhTW: '注意顧客留言和重複訂單——一些顧客留下關於下次購買的暗示，或透露改變包裝感覺的背景故事細節。遊戲獎勵仔細閱讀。',
    tip_ja: 'お客さんのメモとリピート注文に注目してください——次回の購入についてのヒントを残したり、梱包の感覚を変える背景ストーリーの詳細を明かしてくれることがあります。ゲームは丁寧に読む人を報います。',
    tip_ko: '고객 메모와 재주문에 주의를 기울이세요——일부 고객은 다음 구매에 대한 힌트를 남기거나 포장의 느낌을 바꾸는 뒷이야기 세부 사항을 공개합니다. 게임은 꼼꼼히 읽는 사람에게 보상을 줍니다.',
    tip_de: 'Achte auf Kundennotizen und Wiederbestellungen — einige Kunden hinterlassen Hinweise zu ihrem nächsten Kauf oder enthüllen Hintergrunddetails, die das Packen des Pakets anders anfühlen lassen. Das Spiel belohnt aufmerksames Lesen.',
  },
  cocoon: {
    title_en: 'Cocoon',
    title_zh: 'Cocoon',
    title_zhTW: 'Cocoon',
    title_ja: 'Cocoon',
    title_ko: 'Cocoon',
    title_de: 'Cocoon',
    emoji: '🌀',
    tag_en: 'A wordless puzzle adventure about carrying entire worlds inside orbs — from the creator of Limbo and Inside',
    tag_zh: '一款关于在球体内携带整个世界的无言解谜冒险——来自《地狱边境》和《内部》的创作者',
    tag_zhTW: '一款關於在球體內攜帶整個世界的無言解謎冒險——來自《地獄邊境》和《內部》的創作者',
    tag_ja: '球体の中に世界を丸ごと運ぶ、セリフのない謎解きアドベンチャー——LimboとInsideのクリエイターによる作品',
    tag_ko: '구체 안에 세계 전체를 담아 운반하는 대사 없는 퍼즐 어드벤처——Limbo와 Inside의 크리에이터 작품',
    tag_de: 'Ein wortloses Puzzle-Abenteuer, bei dem du ganze Welten in Orbs trägst — vom Schöpfer von Limbo und Inside',
    platform_en: 'Available on: PC (Steam, Xbox Game Pass), Nintendo Switch, PlayStation 4/5, Xbox — about $25',
    platform_zh: '可在以下平台获取：PC（Steam、Xbox Game Pass）、Nintendo Switch、PlayStation 4/5、Xbox——约 25 美元',
    platform_zhTW: '可在以下平台取得：PC（Steam、Xbox Game Pass）、Nintendo Switch、PlayStation 4/5、Xbox——約 25 美元',
    platform_ja: '対応プラットフォーム：PC（Steam、Xbox Game Pass）、Nintendo Switch、PlayStation 4/5、Xbox — 約 3,000 円',
    platform_ko: '출시 플랫폼: PC（Steam、Xbox Game Pass）、Nintendo Switch、PlayStation 4/5、Xbox — 약 25달러',
    platform_de: 'Erhältlich auf: PC (Steam, Xbox Game Pass), Nintendo Switch, PlayStation 4/5, Xbox — ca. 25 €',
    why_en:
      "Cocoon (2023) is one of the most inventive puzzle games ever made. Created by Jeppe Carlsen, the lead gameplay designer of Limbo and Inside, it follows a small insect creature who discovers orbs that each contain an entire world inside. The central mechanic is that you can pick up these orbs and carry them — and then enter them. The puzzle loop involves placing orbs within orbs within orbs and using the properties of each nested world to affect the outer worlds. The elegance of Cocoon's design is that it introduces this system gradually and never explains it — you figure out the logic through play, and each discovery is deeply satisfying. There are no words, no dialogue, no text. The visual design is bioluminescent and alien: a world of glowing beetles, geometric architecture, and strange organic technology. The game takes 5-7 hours to complete and is paced beautifully — never too fast, never repetitive. It won multiple Game of the Year nominations in 2023 including BAFTA Best Game. On Xbox Game Pass. An exceptional experience for anyone who valued the precision and silence of Inside or Limbo.",
    why_zh:
      'Cocoon（2023 年）是有史以来最具创意的解谜游戏之一。由 Limbo 和 Inside 的首席游戏设计师 Jeppe Carlsen 创作，它讲述了一个小昆虫生物发现每个内部都有整个世界的球体的故事。核心机制是你可以拾取这些球体并携带它们——然后进入它们。谜题循环涉及将球体放置在球体内的球体内，并使用每个嵌套世界的属性来影响外部世界。Cocoon 设计的优雅之处在于它逐渐引入这个系统，从不解释它——你通过游戏弄清楚逻辑，每个发现都非常令人满足。没有文字、没有对话、没有文本。视觉设计是生物发光的和异域的：一个发光甲虫、几何建筑和奇异有机技术的世界。游戏完成需要 5-7 小时，节奏优美——从不太快，从不重复。它赢得了 2023 年包括 BAFTA 最佳游戏在内的多个年度游戏提名。可在 Xbox Game Pass 上获取。对于重视 Inside 或 Limbo 的精确和沉默的任何人来说，这是一次卓越的体验。',
    why_zhTW:
      'Cocoon（2023 年）是有史以來最具創意的解謎遊戲之一。由 Limbo 和 Inside 的首席遊戲設計師 Jeppe Carlsen 創作，它講述了一個小昆蟲生物發現每個內部都有整個世界的球體的故事。核心機制是你可以拾取這些球體並攜帶它們——然後進入它們。謎題循環涉及將球體放置在球體內的球體內，並使用每個巢套世界的屬性來影響外部世界。Cocoon 設計的優雅之處在於它逐漸引入這個系統，從不解釋它——你通過遊戲弄清楚邏輯，每個發現都非常令人滿足。沒有文字、沒有對話、沒有文本。視覺設計是生物發光的和異域的：一個發光甲蟲、幾何建築和奇異有機技術的世界。遊戲完成需要 5-7 小時，節奏優美——從不太快，從不重複。它贏得了 2023 年包括 BAFTA 最佳遊戲在內的多個年度遊戲提名。可在 Xbox Game Pass 上取得。對於重視 Inside 或 Limbo 的精確和沉默的任何人來說，這是一次卓越的體驗。',
    why_ja:
      'Cocoon（2023年）は、これまでに作られた中で最も独創的なパズルゲームのひとつです。LimboとInsideの主任ゲームデザイナーであるJeppe Carlsenが手がけた本作は、それぞれの内部に世界全体が広がる球体を発見した小さな昆虫の生き物を追います。中心的なメカニクスは、その球体を拾って運べること——そして、中に入れること。パズルのループは、球体の中に球体を入れ、さらにその中に球体を入れ、それぞれの入れ子の世界の性質を外側の世界に作用させるというものです。Cocoonの設計の優雅さは、このシステムを徐々に導入し、一切説明しない点にあります——プレイを通してロジックを解読していくのですが、それぞれの発見がとても深い満足感をもたらします。セリフなし、会話なし、テキストなし。ビジュアルデザインは生物発光的でエイリアン的：光るカブトムシ、幾何学的な建築、不思議な有機的テクノロジーの世界です。プレイ時間は5〜7時間で、テンポが絶妙——速くなりすぎず、繰り返しにもなりません。2023年のBAFTA最優秀ゲームを含む複数のGame of the Year候補に選ばれました。Xbox Game Passでプレイ可能。InsideやLimboの精度と静けさを評価する方に、まさにぴったりの体験です。',
    why_ko:
      'Cocoon（2023）은 지금까지 만들어진 가장 독창적인 퍼즐 게임 중 하나입니다. Limbo와 Inside의 수석 게임 디자이너 Jeppe Carlsen이 만든 이 작품은 내부에 각각 하나의 세계 전체가 펼쳐지는 구체를 발견한 작은 곤충 생물을 따라갑니다. 핵심 메카닉은 그 구체를 집어 들고 운반할 수 있다는 것——그리고 안으로 들어갈 수 있다는 것입니다. 퍼즐 루프는 구체 안에 구체를, 그 안에 또 구체를 배치하고, 각각의 중첩된 세계의 속성을 바깥 세계에 영향을 주는 방식으로 사용하는 것입니다. Cocoon 설계의 우아함은 이 시스템을 서서히 도입하면서 절대 설명하지 않는다는 데 있습니다——플레이를 통해 논리를 파악해 나가고, 각각의 발견이 깊은 만족감을 줍니다. 대사도, 대화도, 텍스트도 없습니다. 비주얼 디자인은 생물 발광적이고 이질적인: 발광하는 딱정벌레, 기하학적 건축, 기묘한 유기적 기술의 세계입니다. 완료까지 5~7시간으로 템포가 아름답습니다——너무 빠르지도, 반복적이지도 않습니다. 2023년 BAFTA 최우수 게임을 포함한 여러 올해의 게임 후보에 선정되었습니다. Xbox Game Pass에서 플레이 가능합니다. Inside나 Limbo의 정밀함과 침묵을 높이 평가했던 분에게 탁월한 경험입니다.',
    why_de:
      'Cocoon (2023) ist eines der einfallsreichsten Puzzle-Spiele, die je gemacht wurden. Entwickelt von Jeppe Carlsen, dem Lead Gameplay Designer von Limbo und Inside, folgt es einer kleinen Insektenkreatur, die Orbs entdeckt, die jeweils eine ganze Welt in sich tragen. Die zentrale Mechanik: Du kannst diese Orbs aufheben und mit dir tragen — und dann in sie eintreten. Der Puzzle-Loop besteht darin, Orbs in Orbs in Orbs zu platzieren und die Eigenschaften jeder verschachtelten Welt zu nutzen, um die äußeren Welten zu beeinflussen. Die Eleganz von Cocoons Design liegt darin, dieses System schrittweise einzuführen und es nie zu erklären — du erarbeitest dir die Logik durch das Spielen selbst, und jede Entdeckung ist tief befriedigend. Keine Worte, keine Dialoge, kein Text. Das visuelle Design ist biolumineszent und alien: eine Welt aus leuchtenden Käfern, geometrischer Architektur und seltsamer organischer Technologie. Das Spiel dauert 5-7 Stunden und ist wunderschön getaktet — nie zu schnell, nie repetitiv. Es gewann 2023 mehrere Game of the Year-Nominierungen, darunter den BAFTA Best Game. Auf Xbox Game Pass verfügbar. Ein außergewöhnliches Erlebnis für jeden, der die Präzision und Stille von Inside oder Limbo geschätzt hat.',
    tip_en: "If a room seems to have no solution, check whether you should be carrying a different orb into it. Many Cocoon puzzles only click when you realize you have been thinking about the nesting order incorrectly — the solution often requires stepping out of a world entirely before re-entering.",
    tip_zh: '如果一个房间似乎没有解决方案，检查你是否应该将不同的球体带入其中。许多 Cocoon 谜题只有当你意识到你对嵌套顺序的思考是错误的才能解开——解决方案通常需要完全走出一个世界然后重新进入。',
    tip_zhTW: '如果一個房間似乎沒有解決方案，請確認你是否應該將不同的球體帶入其中。許多 Cocoon 謎題只有當你意識到你對巢套順序的思考是錯誤的才能解開——解決方案通常需要完全走出一個世界然後重新進入。',
    tip_ja: '部屋に解決策がないように思えたら、別の球体を持ち込むべきかどうか確認してみてください。Cocoonのパズルの多くは、入れ子の順序の考え方が間違っていることに気づいて初めて解けます——解決策はたいてい、一度世界を完全に出てから入り直すことを必要とします。',
    tip_ko: '방에 해결책이 없는 것 같으면 다른 구체를 가지고 들어가야 하는지 확인해 보세요. 많은 Cocoon 퍼즐은 중첩 순서에 대한 생각이 틀렸다는 것을 깨달았을 때 비로소 풀립니다——해결책은 대개 세계를 완전히 빠져나왔다가 다시 들어가는 것을 필요로 합니다.',
    tip_de: 'Wenn ein Raum keine Lösung zu haben scheint, überprüfe, ob du einen anderen Orb mitbringen solltest. Viele Cocoon-Rätsel klicken erst, wenn du merkst, dass du die Verschachtelungsreihenfolge falsch gedacht hast — die Lösung erfordert oft, eine Welt komplett zu verlassen, bevor du wieder eintrittst.',
  },
  viewfinder: {
    title_en: 'Viewfinder',
    title_zh: 'Viewfinder',
    title_zhTW: 'Viewfinder',
    title_ja: 'Viewfinder',
    title_ko: 'Viewfinder',
    title_de: 'Viewfinder',
    emoji: '📷',
    tag_en: 'A puzzle game where you take photos and place them in 3D space to reshape the world — one of the most original mechanics in years',
    tag_zh: '一款你拍摄照片并将其放置在三维空间中以重塑世界的解谜游戏——近年来最具原创性的机制之一',
    tag_zhTW: '一款你拍攝照片並將其放置在三維空間中以重塑世界的解謎遊戲——近年來最具原創性的機制之一',
    tag_ja: '写真を撮って3D空間に配置することで世界を作り変えるパズルゲーム——近年最もオリジナリティの高いメカニクスのひとつ',
    tag_ko: '사진을 찍어 3D 공간에 배치해 세계를 재구성하는 퍼즐 게임——최근 몇 년간 가장 독창적인 메카닉 중 하나',
    tag_de: 'Ein Puzzle-Spiel, bei dem du Fotos aufnimmst und in 3D-Raum platzierst, um die Welt umzugestalten — einer der originellsten Mechaniken seit Jahren',
    platform_en: 'Available on: PC (Steam), PlayStation 4/5 — about $25',
    platform_zh: '可在以下平台获取：PC（Steam）、PlayStation 4/5——约 25 美元',
    platform_zhTW: '可在以下平台取得：PC（Steam）、PlayStation 4/5——約 25 美元',
    platform_ja: '対応プラットフォーム：PC（Steam）、PlayStation 4/5 — 約 3,000 円',
    platform_ko: '출시 플랫폼: PC（Steam）、PlayStation 4/5 — 약 25달러',
    platform_de: 'Erhältlich auf: PC (Steam), PlayStation 4/5 — ca. 25 €',
    why_en:
      "Viewfinder (2023) introduces a mechanic so original that most players need to see it in action before they can believe it works: you take a photo of the environment (or use a provided polaroid) and then place that photo as a flat surface in 3D space. When the photo touches the ground, everything in the photo becomes real geometry — a bridge in a photo becomes a bridge you can walk on, a building in a photo becomes a building you can enter. This means you can place a photo taken from a higher angle to create geometry that bridges impossible gaps, or layer photos on top of each other to combine architectural elements from different images. The puzzles ask you to use this mechanic to reach a power core in each level. The game is about 5-7 hours long and is paced generously — levels are individual and self-contained, so you never feel stuck in a multi-room slog. The visual design is clean retrofuturist: a teleportation research facility populated by cassette-tape recordings and concept art. Multiple awards in 2023 for innovation. Developed by Sad Owl Studios.",
    why_zh:
      'Viewfinder（2023 年）引入了一种如此原创的机制，以至于大多数玩家需要在相信它有效之前看到它实际操作：你拍摄环境的照片（或使用提供的宝丽来），然后将该照片作为平面表面放置在三维空间中。当照片接触地面时，照片中的一切都变成真实几何——照片中的桥梁变成你可以走过的桥梁，照片中的建筑变成你可以进入的建筑。这意味着你可以放置从更高角度拍摄的照片来创建弥合不可能间隙的几何形状，或者将照片叠加在一起以组合来自不同图像的建筑元素。谜题要求你使用这个机制到达每个关卡中的电源核心。游戏大约 5-7 小时，节奏宽裕——关卡是独立的和自成一体的，所以你永远不会感觉陷入多房间的苦战。视觉设计是干净的复古未来主义：一个由磁带录音和概念艺术填充的传送研究设施。2023 年多个创新奖项。由 Sad Owl Studios 开发。',
    why_zhTW:
      'Viewfinder（2023 年）引入了一種如此原創的機制，以至於大多數玩家需要在相信它有效之前看到它實際操作：你拍攝環境的照片（或使用提供的拍立得），然後將該照片作為平面表面放置在三維空間中。當照片接觸地面時，照片中的一切都變成真實幾何——照片中的橋梁變成你可以走過的橋梁，照片中的建築變成你可以進入的建築。這意味著你可以放置從更高角度拍攝的照片來創建彌合不可能間隙的幾何形狀，或者將照片疊加在一起以組合來自不同圖像的建築元素。謎題要求你使用這個機制到達每個關卡中的電源核心。遊戲大約 5-7 小時，節奏寬裕——關卡是獨立的和自成一體的，所以你永遠不會感覺陷入多房間的苦戰。視覺設計是乾淨的復古未來主義：一個由磁帶錄音和概念藝術填充的傳送研究設施。2023 年多個創新獎項。由 Sad Owl Studios 開發。',
    why_ja:
      'Viewfinder（2023年）は、ほとんどのプレイヤーが実際に動いているのを見るまでは信じられないほど独創的なメカニクスを持っています：環境の写真を撮って（またはポラロイドを使って）、それを3D空間に平面として配置します。写真が地面に触れると、写真の中のあらゆるものが現実のジオメトリになります——写真の橋は実際に歩ける橋になり、写真の建物は入れる建物になります。つまり、高い角度から撮った写真を置くことで、不可能なギャップを埋めるジオメトリを作れるし、写真を重ねることで異なる画像の建築要素を組み合わせることもできます。パズルはこのメカニクスを使って各レベルのパワーコアに到達することを求めます。ゲームは約5〜7時間で、テンポが良い——レベルは独立して完結しているので、複数部屋の攻略に詰まって苦しむ感覚がありません。ビジュアルデザインはクリーンなレトロフューチャー：カセットテープの録音とコンセプトアートが散りばめられたテレポーテーション研究施設です。2023年に複数のイノベーション賞を受賞。Sad Owl Studiosが開発。',
    why_ko:
      'Viewfinder（2023）는 대부분의 플레이어가 실제로 작동하는 것을 보기 전까지 믿기 어려운 메카닉을 가지고 있습니다: 환경 사진을 찍어서（또는 제공된 폴라로이드를 사용해서）3D 공간에 평면 표면으로 배치합니다. 사진이 지면에 닿으면 사진 안의 모든 것이 실제 기하학이 됩니다——사진 속 다리는 실제로 건널 수 있는 다리가 되고, 사진 속 건물은 들어갈 수 있는 건물이 됩니다. 즉, 높은 각도에서 찍은 사진을 배치해 불가능한 간격을 이어주는 기하학을 만들거나, 사진을 겹쳐 다른 이미지의 건축 요소를 결합할 수 있습니다. 퍼즐은 이 메카닉을 사용해 각 레벨의 파워 코어에 도달하는 것을 요구합니다. 게임은 약 5~7시간으로 템포가 여유롭습니다——레벨은 독립적이고 자기 완결적이어서 여러 방에서 막혀 고생하는 느낌이 없습니다. 비주얼 디자인은 깔끔한 레트로 미래주의: 카세트 테이프 녹음과 컨셉 아트로 가득 찬 순간이동 연구 시설입니다. 2023년 여러 혁신상을 수상했습니다. Sad Owl Studios 개발.',
    why_de:
      'Viewfinder (2023) führt eine Mechanik ein, die so originell ist, dass die meisten Spieler sie in Aktion sehen müssen, bevor sie glauben, dass sie funktioniert: Du fotografierst die Umgebung (oder verwendest ein bereitgestelltes Polaroid) und platzierst dieses Foto dann als flache Oberfläche im 3D-Raum. Wenn das Foto den Boden berührt, wird alles im Foto zu echter Geometrie — eine Brücke auf dem Foto wird zu einer Brücke, über die du laufen kannst, ein Gebäude auf dem Foto wird zu einem Gebäude, das du betreten kannst. Das bedeutet, du kannst ein Foto aus einer höheren Perspektive platzieren, um Geometrie zu erzeugen, die unmögliche Lücken überbrückt, oder Fotos übereinander legen, um architektonische Elemente aus verschiedenen Bildern zu kombinieren. Die Rätsel verlangen, diese Mechanik zu nutzen, um in jedem Level einen Energiekern zu erreichen. Das Spiel ist ca. 5-7 Stunden lang und großzügig getaktet — Level sind eigenständig und in sich abgeschlossen, sodass du dich nie in einem mehrstufigen Slog feststeckst. Das visuelle Design ist clean retrofuturistisch: eine Teleportationsforschungsanlage mit Kassettenaufnahmen und Konzeptkunst. Mehrere Innovationspreise 2023. Entwickelt von Sad Owl Studios.',
    tip_en: "Remember that you can reset any level instantly — there is no penalty. This makes Viewfinder a great game for experimental thinking: just try placing the photo somewhere unexpected and see what geometry appears. The solution is almost always simpler than it first looks.",
    tip_zh: '记住你可以立即重置任何关卡——没有惩罚。这使 Viewfinder 成为实验性思维的好游戏：只需尝试在意想不到的地方放置照片，看看出现什么几何形状。解决方案几乎总是比最初看起来更简单。',
    tip_zhTW: '記住你可以立即重置任何關卡——沒有懲罰。這使 Viewfinder 成為實驗性思維的好遊戲：只需嘗試在意想不到的地方放置照片，看看出現什麼幾何形狀。解決方案幾乎總是比最初看起來更簡單。',
    tip_ja: 'どのレベルもすぐにリセットできることを忘れずに——ペナルティはありません。だからViewfinderは実験的な思考をするのに最適なゲームです：とにかく意外な場所に写真を置いてみて、どんなジオメトリが現れるかを見てください。解決策はたいてい、最初に見えるよりずっとシンプルです。',
    tip_ko: '어떤 레벨이든 즉시 리셋할 수 있다는 것을 기억하세요——패널티가 없습니다. 그래서 Viewfinder는 실험적인 사고를 위한 좋은 게임입니다: 예상치 못한 곳에 사진을 놓아 보고 어떤 기하학이 나타나는지 확인해 보세요. 해결책은 거의 항상 처음에 보이는 것보다 훨씬 단순합니다.',
    tip_de: 'Denk daran, dass du jedes Level sofort zurücksetzen kannst — es gibt keine Strafe. Das macht Viewfinder zu einem großartigen Spiel für experimentelles Denken: Platziere das Foto einfach irgendwo Unerwartetes und schau, welche Geometrie erscheint. Die Lösung ist fast immer einfacher, als sie zunächst aussieht.',
  },
}

function calcResult(answers: Pick[]): Pick {
  const counts: Record<Pick, number> = {
    'tiny-glade': 0,
    'sticky-business': 0,
    cocoon: 0,
    viewfinder: 0,
  }
  for (const a of answers) counts[a]++
  return Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0] as Pick
}

export function CozyCreative2024Quiz({ locale }: { locale: string }) {
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
    const url = `${BASE_URL}/${locale}/quizzes/cozy-creative-2024`
    const shareText =
      locale === 'zh'
        ? `根据我的创意风格，最适合我的 2024 新 Cozy 游戏是「${result.title_zh}」！${result.tag_zh}。找到你的：${url}`
        : locale === 'zh-TW'
        ? `根據我的創意風格，最適合我的 2024 新 Cozy 遊戲是「${result.title_zhTW}」！${result.tag_zhTW}。找到你的：${url}`
        : locale === 'ja'
        ? `私のクリエイティブスタイルに合った2024 cozyゲームは「${result.title_ja}」です！${result.tag_ja}。あなたに合うゲームを見つけよう：${url}`
        : locale === 'ko'
        ? `제 창의 스타일에 맞는 2024 cozy 게임은 「${result.title_ko}」입니다！${result.tag_ko}。나에게 맞는 게임을 찾아보세요：${url}`
        : locale === 'de'
        ? `Mein 2024-Cozy-Spiel passend zu meinem kreativen Stil ist ${result.title_de} — ${result.tag_de}. Finde deins: ${url}`
        : `Based on my creative style, my 2024 cozy game match is ${result.title_en} — ${result.tag_en}. Find yours: ${url}`

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
              {getLoc('上手小贴士：', 'Getting started: ', '上手小技巧：', 'はじめ方のコツ：', '시작 팁: ', 'Einstiegstipp: ')}
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
            {getLoc('重新测试', 'Retake Quiz', '重新測試', 'もう一度やり直す', '다시 테스트하기', 'Quiz wiederholen')}
          </button>
        </div>
      </div>
    )
  }

  void isZh

  return (
    <div>
      <div className="mb-8 text-center">
        <h1 className="mb-2 text-xl font-bold text-[#e8dcc8]">
          {getLoc(
            '根据你的创意风格，2023-2024 哪款 Cozy 新游最适合你？',
            'Which 2023-2024 Creative Cozy Game Matches Your Style?',
            '根據你的創意風格，2023-2024 哪款 Cozy 新遊最適合你？',
            'あなたのクリエイティブスタイルに合う 2023-2024 年の Cozy ゲームはどれ？',
            '당신의 창의적 스타일에 맞는 2023-2024 Cozy 신작 게임은 무엇인가요?',
            'Welches 2023-2024 kreative Cozy-Spiel passt zu deinem Stil?',
          )}
        </h1>
        <p className="text-sm text-[#8a9a7a]">
          {getLoc(
            '6 个关于创意偏好的问题——在 Tiny Glade、Sticky Business、Cocoon 和 Viewfinder 中找到你的最佳匹配',
            '6 questions about how you love to create — find your match among Tiny Glade, Sticky Business, Cocoon, and Viewfinder. All released 2023-2024, all genuinely original.',
            '6 個關於創意偏好的問題——在 Tiny Glade、Sticky Business、Cocoon 和 Viewfinder 中找到你的最佳匹配',
            '創り方の好みに関する 6 つの質問——Tiny Glade、Sticky Business、Cocoon、Viewfinder の中から最適な 1 本を見つけよう。いずれも 2023-2024 年リリースの真にオリジナルな作品。',
            '창의적 성향에 관한 6가지 질문——Tiny Glade, Sticky Business, Cocoon, Viewfinder 중 나에게 맞는 게임을 찾아보자. 모두 2023-2024년 출시된 진정한 독창작.',
            '6 Fragen darüber, wie du am liebsten kreativ bist — finde deinen Match unter Tiny Glade, Sticky Business, Cocoon und Viewfinder. Alle 2023-2024 erschienen, alle wirklich originell.',
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
        {getLoc('找到我的 2024 创意游戏', 'Find My 2024 Creative Match', '找到我的 2024 創意遊戲', '私の 2024 創作ゲームを見つける', '나의 2024 창의 게임 찾기', 'Meinen 2024 Kreativ-Match finden')}
      </button>
    </div>
  )
}
