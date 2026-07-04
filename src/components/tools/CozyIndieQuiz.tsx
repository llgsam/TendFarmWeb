'use client'

import { useState } from 'react'
import { BASE_URL } from '@/lib/config'

type Pick = 'grove' | 'unpacking' | 'little-left' | 'wylde'

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
    q_en: 'How do you prefer to play cozy games?',
    q_zh: '你更喜欢怎样玩 cozy 游戏？',
    q_zhTW: '你更喜歡怎樣玩 cozy 遊戲？',
    q_ja: 'コージーゲームはどんなふうに楽しみたいですか？',
    q_ko: '코지 게임은 어떻게 즐기는 걸 좋아하세요?',
    q_de: 'Wie spielst du am liebsten Cozy Games?',
    options: [
      {
        en: 'A little each day — I like having a reason to return daily',
        zh: '每天玩一点——我喜欢每天都有理由回来',
        zhTW: '每天玩一點——我喜歡每天都有理由回來',
        ja: '毎日少しずつ——毎日戻る理由があるのが好き',
        ko: '매일 조금씩——매일 돌아올 이유가 있는 게 좋아요',
        de: 'Täglich ein bisschen — ich mag es, jeden Tag einen Grund zurückzukehren zu haben',
        type: 'grove',
      },
      {
        en: 'Quiet binge — I want to sink in for 3-4 hours and finish something',
        zh: '安静的通宵——我想沉浸 3-4 小时完成一件事',
        zhTW: '安靜的長時間沉浸——我想沉浸 3-4 小時完成一件事',
        ja: 'じっくり集中して——3〜4時間かけて何かを完結させたい',
        ko: '집중해서 깊게——3-4시간 몰입해서 뭔가를 완성하고 싶어요',
        de: 'In Ruhe abtauchen — ich möchte 3-4 Stunden versinken und etwas abschließen',
        type: 'unpacking',
      },
      {
        en: 'Short bursts — 15-30 minutes of satisfying gameplay anytime',
        zh: '短暂爆发——随时 15-30 分钟令人满足的游戏',
        zhTW: '短暫爆發——隨時 15-30 分鐘令人滿足的遊戲',
        ja: '短い隙間に——15〜30分でサクッと満足できる遊び方',
        ko: '짧게 짬짬이——15-30분만으로도 만족스러운 플레이',
        de: 'In kurzen Schüben — 15-30 Minuten befriedigend spielen, wann immer ich möchte',
        type: 'little-left',
      },
      {
        en: 'A full weekend journey — I want a complete story over a few sessions',
        zh: '完整的周末旅程——我想在几次游戏中完成一个完整的故事',
        zhTW: '完整的週末旅程——我想在幾次遊戲中完成一個完整的故事',
        ja: '週末まるごと——数回のセッションで完全なストーリーを体験したい',
        ko: '주말 내내 통으로——몇 번의 세션에 걸쳐 완전한 이야기를 경험하고 싶어요',
        de: 'Als ganzes Wochenendabenteuer — ich möchte eine vollständige Geschichte über mehrere Sitzungen erleben',
        type: 'wylde',
      },
    ],
  },
  {
    q_en: 'Which of these sounds most like what you want from a cozy game right now?',
    q_zh: '以下哪个最像你现在想从 cozy 游戏中得到的？',
    q_zhTW: '以下哪個最像你現在想從 cozy 遊戲中得到的？',
    q_ja: 'いまコージーゲームに求めているものは次のうちどれ？',
    q_ko: '지금 코지 게임에서 원하는 게 뭔가요?',
    q_de: 'Was willst du gerade von einem Cozy Game?',
    options: [
      {
        en: 'Gentle narrative unfolding over time — characters I grow to love slowly',
        zh: '随时间缓缓展开的温和叙事——我慢慢喜爱的角色',
        zhTW: '隨時間緩緩展開的溫和敘事——我慢慢喜愛的角色',
        ja: 'じっくり時間をかけて展開するやさしい物語——だんだん好きになっていくキャラクターたち',
        ko: '시간이 지나며 천천히 펼쳐지는 이야기——조금씩 정들어가는 캐릭터들',
        de: 'Eine sanfte Geschichte, die sich über Zeit entfaltet — Charaktere, die ich langsam ins Herz schließe',
        type: 'grove',
      },
      {
        en: 'Wordless storytelling — a life told entirely through objects with zero dialogue',
        zh: '无言的叙事——通过物品讲述的生活，零对话',
        zhTW: '無言的敘事——透過物品講述的生活，零對話',
        ja: '言葉いらずのストーリーテリング——モノだけで語られる人生、台詞ゼロ',
        ko: '대사 없는 스토리텔링——물건들로만 풀어가는 삶의 이야기',
        de: 'Wortloses Erzählen — ein Leben, das nur durch Gegenstände erzählt wird, ohne Dialog',
        type: 'unpacking',
      },
      {
        en: 'Pure satisfying order — organizing things into exactly the right place',
        zh: '纯粹令人满足的秩序——把东西整理到完全正确的位置',
        zhTW: '純粹令人滿足的秩序——把東西整理到完全正確的位置',
        ja: '整理整頓の快感——ぴったりの場所に収まる純粋な達成感',
        ko: '정리 정돈의 쾌감——딱 맞는 자리에 물건이 들어갈 때의 만족감',
        de: 'Ordnung und Sauberkeit — die Befriedigung, Dinge an den perfekten Platz zu legen',
        type: 'little-left',
      },
      {
        en: 'Wholesome adventure — farming, magic, romance, and a community that feels real',
        zh: '温馨的冒险——农业、魔法、恋爱，以及感觉真实的社区',
        zhTW: '溫馨的冒險——農業、魔法、戀愛，以及感覺真實的社群',
        ja: 'ほっこりアドベンチャー——農業、魔法、恋愛、リアルに感じられるコミュニティ',
        ko: '따뜻한 어드벤처——농사, 마법, 로맨스, 진짜 같은 커뮤니티',
        de: 'Ein herzliches Abenteuer — Farming, Magie, Romantik und eine Gemeinschaft, die sich echt anfühlt',
        type: 'wylde',
      },
    ],
  },
  {
    q_en: 'How do you feel about games with a clear ending?',
    q_zh: '你对有明确结局的游戏感觉如何？',
    q_zhTW: '你對有明確結局的遊戲感覺如何？',
    q_ja: '明確なエンディングがあるゲームはどう感じる？',
    q_ko: '명확한 엔딩이 있는 게임에 대해 어떻게 생각하세요?',
    q_de: 'Was denkst du über Spiele mit einem klaren Ende?',
    options: [
      {
        en: 'I prefer ongoing — I want a game I can check in with for weeks or months',
        zh: '我更喜欢持续进行——我想要一款可以持续几周或几个月的游戏',
        zhTW: '我更喜歡持續進行——我想要一款可以持續幾週或幾個月的遊戲',
        ja: '続いていくほうが好き——何週間も何ヶ月も通えるゲームがいい',
        ko: '계속 이어지는 게 좋아요——몇 주, 몇 달씩 즐길 수 있는 게임이 좋아요',
        de: 'Ich bevorzuge endlose Spiele — ich möchte etwas haben, zu dem ich wochenlang oder monatelang zurückkehren kann',
        type: 'grove',
      },
      {
        en: 'I love a clear ending — I want the complete arc and then I\'m done',
        zh: '我喜欢明确的结局——我想要完整的弧线，然后结束',
        zhTW: '我喜歡明確的結局——我想要完整的弧線，然後結束',
        ja: 'はっきり終わるのが好き——ストーリーの弧を完結させたい',
        ko: '확실한 엔딩이 좋아요——이야기의 마무리를 경험하고 싶어요',
        de: 'Ich liebe ein klares Ende — ich will den vollständigen Bogen erleben und dann fertig sein',
        type: 'unpacking',
      },
      {
        en: 'I like puzzle completion — finish this puzzle, move to the next',
        zh: '我喜欢解谜完成——完成这个谜题，进入下一个',
        zhTW: '我喜歡解謎完成——完成這個謎題，進入下一個',
        ja: 'パズルを解き終える感覚が好き——一つ終わったら次へ',
        ko: '퍼즐 완성이 좋아요——하나 끝내고 다음으로 넘어가는 방식',
        de: 'Ich mag das Abschließen von Rätseln — eins lösen, zum nächsten übergehen',
        type: 'little-left',
      },
      {
        en: 'I want a story ending but with farming I can keep doing after',
        zh: '我想要故事结局，但之后可以继续进行农业',
        zhTW: '我想要故事結局，但之後可以繼續進行農業',
        ja: 'ストーリーは終わってほしいけど、農業は続けていたい',
        ko: '스토리 엔딩은 있으면 좋은데, 그 후에도 농사는 계속하고 싶어요',
        de: 'Ich will ein Story-Ende, aber danach das Farming weitermachen können',
        type: 'wylde',
      },
    ],
  },
  {
    q_en: 'Which visual style appeals to you most?',
    q_zh: '哪种视觉风格最吸引你？',
    q_zhTW: '哪種視覺風格最吸引你？',
    q_ja: 'どのビジュアルスタイルが一番好き？',
    q_ko: '어떤 비주얼 스타일이 가장 끌리세요?',
    q_de: 'Welcher Kunststil spricht dich am meisten an?',
    options: [
      {
        en: 'Painterly and whimsical — every scene looks like hand-painted illustration art',
        zh: '绘画感和异想天开——每个场景看起来像手绘插图艺术',
        zhTW: '繪畫感和奇幻感——每個場景看起來像手繪插圖藝術',
        ja: '絵本みたいで幻想的——どのシーンも手描きのイラストみたい',
        ko: '그림책 같은 환상적인 스타일——모든 장면이 손으로 그린 일러스트 같은 것',
        de: 'Malerisch und verspielt — jede Szene sieht aus wie handgemalte Illustrationskunst',
        type: 'grove',
      },
      {
        en: 'Pixel art with detail — objects that carry real emotional weight through design',
        zh: '有细节的像素艺术——通过设计承载真实情感重量的物品',
        zhTW: '有細節的像素藝術——透過設計承載真實情感重量的物品',
        ja: '細部にこだわったドット絵——デザインで感情の重みを伝えるアイテムたち',
        ko: '디테일 살아있는 픽셀 아트——디자인 하나하나에 감정의 무게가 담긴 물건들',
        de: 'Pixel-Art mit Liebe zum Detail — Gegenstände, die echtes emotionales Gewicht durch ihr Design tragen',
        type: 'unpacking',
      },
      {
        en: 'Clean and tactile — the satisfaction is in seeing the perfect arrangement',
        zh: '干净而触感强——满足感在于看到完美的排列',
        zhTW: '乾淨而觸感強——滿足感在於看到完美的排列',
        ja: 'すっきりして触り心地のよさそうな——完璧な配置を見たときの満足感',
        ko: '깔끔하고 정갈한——완벽하게 정렬된 걸 봤을 때의 그 만족감',
        de: 'Klar und taktil — die Befriedigung liegt darin, die perfekte Anordnung zu sehen',
        type: 'little-left',
      },
      {
        en: 'Warm and colorful — a cozy town that looks lived-in and inviting',
        zh: '温暖而多彩——一个看起来有人居住和热情好客的温馨小镇',
        zhTW: '溫暖而多彩——一個看起來有人居住和熱情好客的溫馨小鎮',
        ja: '温かくてカラフル——生活感があってほっとする小さな町',
        ko: '따뜻하고 화사한——실제로 사람들이 사는 것 같은 포근한 마을',
        de: 'Warm und farbenfroh — ein gemütliches Städtchen, das bewohnt und einladend aussieht',
        type: 'wylde',
      },
    ],
  },
  {
    q_en: 'Which word best describes what you want to feel while playing?',
    q_zh: '哪个词最能描述你在游戏时想要感受的？',
    q_zhTW: '哪個詞最能描述你在遊戲時想要感受的？',
    q_ja: 'プレイ中に感じたい気持ちを一言で表すなら？',
    q_ko: '게임할 때 어떤 감정을 느끼고 싶으세요?',
    q_de: 'Welches Wort beschreibt am besten, was du beim Spielen fühlen möchtest?',
    options: [
      {
        en: 'Gently moved',
        zh: '温柔地被感动',
        zhTW: '溫柔地被感動',
        ja: 'そっと心を動かされる',
        ko: '살며시 마음이 움직이는 느낌',
        de: 'Sanft bewegt',
        type: 'grove',
      },
      {
        en: 'Quietly understood',
        zh: '静静地被理解',
        zhTW: '靜靜地被理解',
        ja: '静かに分かってもらえる',
        ko: '조용히 공감받는 느낌',
        de: 'Still verstanden',
        type: 'unpacking',
      },
      {
        en: 'Deeply satisfied',
        zh: '深深地感到满足',
        zhTW: '深深地感到滿足',
        ja: 'ふかく満たされる',
        ko: '깊이 충족되는 느낌',
        de: 'Tief befriedigt',
        type: 'little-left',
      },
      {
        en: 'Warmly at home',
        zh: '温暖地有归属感',
        zhTW: '溫暖地有歸屬感',
        ja: '温かく家に帰ってきた感じ',
        ko: '따뜻하게 집에 돌아온 느낌',
        de: 'Warm zuhause',
        type: 'wylde',
      },
    ],
  },
  {
    q_en: 'How important is story and character to you in a cozy game?',
    q_zh: '故事和角色对你在 cozy 游戏中有多重要？',
    q_zhTW: '故事和角色對你在 cozy 遊戲中有多重要？',
    q_ja: 'コージーゲームにおいて、ストーリーとキャラクターはどのくらい大切？',
    q_ko: '코지 게임에서 스토리와 캐릭터는 얼마나 중요한가요?',
    q_de: 'Wie wichtig sind Story und Charaktere in einem Cozy Game für dich?',
    options: [
      {
        en: 'Essential — I want characters whose stories unfold over many sessions',
        zh: '必不可少——我想要在多次游戏中展开故事的角色',
        zhTW: '必不可少——我想要在多次遊戲中展開故事的角色',
        ja: '絶対に必要——何回もプレイするうちにキャラクターの物語が展開していくのがいい',
        ko: '꼭 필요해요——여러 번 플레이하면서 서서히 펼쳐지는 캐릭터 이야기가 좋아요',
        de: 'Unverzichtbar — ich möchte Charaktere, deren Geschichten sich über viele Sitzungen entfalten',
        type: 'grove',
      },
      {
        en: 'I want story told entirely through environment — no dialogue needed',
        zh: '我想要完全通过环境讲述的故事——不需要对话',
        zhTW: '我想要完全透過環境講述的故事——不需要對話',
        ja: '環境だけで語られるストーリーがほしい——台詞はなくていい',
        ko: '환경만으로 이야기를 풀어줬으면 해요——대사는 없어도 돼요',
        de: 'Ich möchte eine Geschichte, die komplett durch die Umgebung erzählt wird — kein Dialog nötig',
        type: 'unpacking',
      },
      {
        en: 'Not needed — the gameplay satisfaction is enough for me',
        zh: '不需要——游戏满足感对我来说已经足够',
        zhTW: '不需要——遊戲滿足感對我來說已經足夠',
        ja: '特に必要ない——ゲームプレイの達成感だけで十分',
        ko: '별로 필요 없어요——게임플레이 자체의 만족감으로 충분해요',
        de: 'Nicht nötig — die Spielbefriedigung reicht mir vollkommen aus',
        type: 'little-left',
      },
      {
        en: 'Very important — I want deep characters, romance options, and a rich world',
        zh: '非常重要——我想要深度角色、恋爱选项和丰富的世界',
        zhTW: '非常重要——我想要深度角色、戀愛選項和豐富的世界',
        ja: 'すごく大切——深みのあるキャラクター、恋愛要素、豊かな世界観がほしい',
        ko: '굉장히 중요해요——깊이 있는 캐릭터, 로맨스, 풍부한 세계관이 있으면 해요',
        de: 'Sehr wichtig — ich möchte tiefe Charaktere, Romantikoptionen und eine reiche Welt',
        type: 'wylde',
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
  grove: {
    title_en: 'Cozy Grove',
    title_zh: 'Cozy Grove',
    title_zhTW: 'Cozy Grove',
    title_ja: 'Cozy Grove',
    title_ko: 'Cozy Grove',
    title_de: 'Cozy Grove',
    emoji: '🏕️',
    tag_en: 'The most beautiful daily cozy game ever made',
    tag_zh: '有史以来最美丽的每日 cozy 游戏',
    tag_zhTW: '有史以來最美麗的每日 cozy 遊戲',
    tag_ja: 'これまで作られた中で最も美しい、毎日通えるコージーゲーム',
    tag_ko: '역대 가장 아름다운 매일 접속형 코지 게임',
    tag_de: 'Das schönste tägliche Cozy Game, das je gemacht wurde',
    platform_en: 'Available on: iOS/Android (Apple Arcade), Nintendo Switch, PC (Steam), PS4/5, Xbox',
    platform_zh: '可在以下平台获取：iOS/Android（Apple Arcade）、Nintendo Switch、PC（Steam）、PS4/5、Xbox',
    platform_zhTW: '可在以下平台取得：iOS/Android（Apple Arcade）、Nintendo Switch、PC（Steam）、PS4/5、Xbox',
    platform_ja: '対応プラットフォーム：iOS/Android（Apple Arcade）、Nintendo Switch、PC（Steam）、PS4/5、Xbox',
    platform_ko: '플랫폼: iOS/Android(Apple Arcade), Nintendo Switch, PC(Steam), PS4/5, Xbox',
    platform_de: 'Erhältlich auf: iOS/Android (Apple Arcade), Nintendo Switch, PC (Steam), PS4/5, Xbox',
    why_en:
      "Cozy Grove is the indie cozy game for you — a daily check-in experience set on a haunted island inhabited by colorful bear spirits. The game is designed around the real-world clock: a small amount of content unlocks each day, and rushing isn't possible. Each spirit is a fully realized character with a rich backstory and emotional arc that unfolds over weeks. The art style is unlike anything else in gaming — hand-painted and layered, with the island literally growing more colorful and alive as you help the spirits heal their unfinished business. It rewards patience with some of the most beautifully written characters in the cozy genre. Session length is naturally capped at about 20-30 minutes per day, making it perfect for a daily ritual.",
    why_zh:
      'Cozy Grove 是最适合你的独立 cozy 游戏——一款设定在鬼魂出没的岛屿上的每日签到体验，岛上居住着多彩的熊灵魂。游戏围绕现实世界时钟设计：每天解锁少量内容，无法加速。每位灵魂都是一个完全实现的角色，拥有丰富的背景故事和情感弧线，在几周内展开。艺术风格与游戏中的任何其他东西都不同——手绘和分层，随着你帮助灵魂治愈未竟的心愿，岛屿字面意义上变得更加丰富多彩和充满生机。它用耐心奖励玩家，拥有 cozy 类型中一些写得最美的角色。每天的游戏时长自然限制在约 20-30 分钟，使其非常适合作为日常仪式。',
    why_zhTW:
      'Cozy Grove 是最適合你的獨立 cozy 遊戲——一款設定在鬼魂出沒的島嶼上的每日簽到體驗，島上居住著多彩的熊靈魂。遊戲圍繞現實世界時鐘設計：每天解鎖少量內容，無法加速。每位靈魂都是一個完全實現的角色，擁有豐富的背景故事和情感弧線，在幾週內展開。藝術風格與遊戲中的任何其他東西都不同——手繪和分層，隨著你幫助靈魂治癒未竟的心願，島嶼字面意義上變得更加豐富多彩和充滿生機。它用耐心獎勵玩家，擁有 cozy 類型中一些寫得最美的角色。每天的遊戲時長自然限制在約 20-30 分鐘，非常適合作為日常儀式。',
    why_ja:
      'Cozy Groveはあなたにぴったりのインディーコージーゲームです。幽霊が住む島を舞台にした毎日のチェックインゲームで、カラフルなクマの精霊たちと交流します。現実の時計に基づいて設計されており、毎日少しずつコンテンツが解放されます。急ぐことはできません。それぞれの精霊には、何週間もかけて展開される豊かな背景とエモーショナルな物語があります。アートスタイルは他のどんなゲームとも違います——手描きで重ね塗りされた絵で、精霊たちの悩みを解消するにつれて、島が文字通り色づいて生き生きとしていきます。毎日のプレイ時間は自然と20〜30分に収まるので、日課にするのに最適です。',
    why_ko:
      'Cozy Grove는 당신에게 딱 맞는 인디 코지 게임입니다. 유령이 사는 섬에서 매일 체크인하는 방식으로 진행되며, 다채로운 곰 정령들과 교류합니다. 게임은 현실 시계에 맞춰 설계되어 있어서 매일 소량의 콘텐츠만 해제되고, 억지로 빨리 진행할 수 없습니다. 각 정령은 깊은 배경 이야기와 감정적인 여정을 가진 완성도 높은 캐릭터로, 몇 주에 걸쳐 이야기가 펼쳐집니다. 아트 스타일은 게임계에서 독보적입니다——손으로 그린 레이어드 수채화 스타일로, 정령들의 미완성 사연을 해결할수록 섬이 실제로 색깔을 되찾고 생동감이 넘쳐납니다. 하루 플레이 시간이 자연스럽게 20-30분으로 제한되어 매일의 루틴으로 삼기에 완벽합니다.',
    why_de:
      'Cozy Grove ist das Indie-Cozy-Game für dich — ein tägliches Check-in-Erlebnis auf einer Insel voller Geister, die von bunten Bärgeistern bewohnt wird. Das Spiel ist um die echte Uhr herum aufgebaut: Jeden Tag wird nur eine kleine Menge an Inhalten freigeschaltet, und Hetzen ist nicht möglich. Jeder Geist ist ein vollständig ausgearbeiteter Charakter mit einer reichen Vorgeschichte und einem emotionalen Bogen, der sich über Wochen entfaltet. Der Kunststil ist einzigartig — handgemalt und vielschichtig, und die Insel wird buchstäblich farbenfroher und lebendiger, während du den Geistern hilfst, ihre unvollendeten Aufgaben zu lösen. Die tägliche Spielzeit ist natürlich auf etwa 20-30 Minuten begrenzt, was es perfekt für ein tägliches Ritual macht.',
    tip_en: 'Each day: complete Flamey\'s tasks first, then talk to every spirit — the dialogue resets daily and is worth reading every time.',
    tip_zh: '每天：先完成 Flamey 的任务，然后和每位灵魂说话——对话每天重置，每次都值得阅读。',
    tip_zhTW: '每天：先完成 Flamey 的任務，然後和每位靈魂說話——對話每天重置，每次都值得閱讀。',
    tip_ja: '毎日：まずFlameyのタスクをこなしてから、全ての精霊に話しかけましょう。会話は毎日リセットされ、毎回読む価値があります。',
    tip_ko: '매일: 먼저 Flamey의 퀘스트를 완료하고, 그 다음 모든 정령에게 말을 걸어보세요——대화는 매일 초기화되므로 항상 읽을 가치가 있어요.',
    tip_de: 'Täglich: Erledige zuerst Flameys Aufgaben, dann sprich mit jedem Geist — die Dialoge werden täglich zurückgesetzt und sind jedes Mal lesenswert.',
  },
  unpacking: {
    title_en: 'Unpacking',
    title_zh: 'Unpacking',
    title_zhTW: 'Unpacking',
    title_ja: 'Unpacking',
    title_ko: 'Unpacking',
    title_de: 'Unpacking',
    emoji: '📦',
    tag_en: 'A life story told entirely through objects — zero dialogue',
    tag_zh: '完全通过物品讲述的人生故事——零对话',
    tag_zhTW: '完全透過物品講述的人生故事——零對話',
    tag_ja: '台詞ゼロ——モノだけで語られるある女性の人生',
    tag_ko: '대사 한 마디 없이 물건만으로 풀어낸 한 여성의 인생',
    tag_de: 'Ein Leben, das vollständig durch Gegenstände erzählt wird — ohne einen einzigen Dialog',
    platform_en: 'Available on: Nintendo Switch, PC (Steam), Xbox Game Pass, PS4/5, iOS/Android (Netflix Games)',
    platform_zh: '可在以下平台获取：Nintendo Switch、PC（Steam）、Xbox Game Pass、PS4/5、iOS/Android（Netflix 游戏）',
    platform_zhTW: '可在以下平台取得：Nintendo Switch、PC（Steam）、Xbox Game Pass、PS4/5、iOS/Android（Netflix 遊戲）',
    platform_ja: '対応プラットフォーム：Nintendo Switch、PC（Steam）、Xbox Game Pass、PS4/5、iOS/Android（Netflix Games）',
    platform_ko: '플랫폼: Nintendo Switch, PC(Steam), Xbox Game Pass, PS4/5, iOS/Android(Netflix 게임)',
    platform_de: 'Erhältlich auf: Nintendo Switch, PC (Steam), Xbox Game Pass, PS4/5, iOS/Android (Netflix Games)',
    why_en:
      "Unpacking is one of the most remarkable games ever made in any genre — and it's perfect for you. You unpack boxes across eight different moves in a woman's life, from her first college dorm room to her eventual home, placing objects in each space. There is no dialogue, no text beyond the occasional box label, no score, and no fail state. The entire story is told through what she owns and what she keeps: the childhood stuffed animal that travels through every move, the ex-boyfriend's house where her objects don't quite fit, the space she eventually makes entirely her own. Most players cry at least once. It takes about 3-4 hours to complete and is available on Xbox Game Pass, Nintendo Switch, and more. One of the most acclaimed indie games of the past decade.",
    why_zh:
      'Unpacking 是任何类型中最杰出的游戏之一——它非常适合你。你跨越一位女性生命中八次不同搬家来拆箱，从她的第一个大学宿舍到最终的家，将物品放置在每个空间里。没有对话、没有除偶尔的箱子标签外的文字、没有分数、没有失败状态。整个故事通过她拥有的东西和她保留的东西来讲述：穿越每次搬家的童年毛绒玩具、她的物品有些格格不入的前男友的房子、她最终完全属于自己的空间。大多数玩家至少哭一次。完成需要大约 3-4 小时，可在 Xbox Game Pass、Nintendo Switch 等平台获取。过去十年最受好评的独立游戏之一。',
    why_zhTW:
      'Unpacking 是任何類型中最傑出的遊戲之一——它非常適合你。你跨越一位女性生命中八次不同搬家來拆箱，從她的第一個大學宿舍到最終的家，將物品放置在每個空間裡。沒有對話、沒有除偶爾的箱子標籤外的文字、沒有分數、沒有失敗狀態。整個故事透過她擁有的東西和她保留的東西來講述：穿越每次搬家的童年毛絨玩具、她的物品有些格格不入的前男友的房子、她最終完全屬於自己的空間。大多數玩家至少哭一次。完成需要大約 3-4 小時，可在 Xbox Game Pass、Nintendo Switch 等平台取得。過去十年最受好評的獨立遊戲之一。',
    why_ja:
      'Unpackingはあらゆるジャンルを通じて最も印象深いゲームのひとつです。ある女性の人生における8回の引越しを通じて荷物を解き、大学の寮から最終的な自分の家まで、それぞれの空間にモノを置いていきます。台詞なし、説明テキストなし、スコアなし、失敗なし。物語は彼女が持ち続けるモノたちによって語られます——どの引越しにも一緒についてくる幼い頃のぬいぐるみ、元彼の家で微妙にフィットしない彼女のモノたち、そして最終的に完全に自分のものにした空間。ほとんどのプレイヤーは最低一度泣きます。プレイ時間は約3〜4時間。Nintendo Switch、Xbox Game Pass、PS4/5など幅広いプラットフォームで遊べます。',
    why_ko:
      'Unpacking은 장르를 불문하고 가장 인상적인 게임 중 하나로, 당신에게 완벽한 게임입니다. 한 여성의 삶에서 여덟 번의 이사를 따라가며 짐을 풀고, 대학 기숙사부터 마지막 보금자리까지 각 공간에 물건을 배치합니다. 대사 없음, 설명 텍스트 없음, 점수 없음, 실패 없음. 이야기는 그녀가 소유한 것과 간직한 것들로만 전달됩니다. 모든 이사에 함께하는 어린 시절 인형, 전 남자친구 집에서 어딘가 어색하게 느껴지는 그녀의 물건들, 결국 완전히 자신만의 것으로 만든 공간. 대부분의 플레이어는 최소 한 번 눈물을 흘립니다. 완료까지 약 3-4시간이 걸리며 Nintendo Switch, Xbox Game Pass 등에서 즐길 수 있습니다.',
    why_de:
      'Unpacking ist eines der bemerkenswertesten Spiele, das je gemacht wurde — und es ist perfekt für dich. Du packst in acht verschiedenen Umzügen im Leben einer Frau Kisten aus, von ihrem ersten Uni-Wohnheimzimmer bis zu ihrem endgültigen Zuhause, und platzierst Gegenstände in jedem Raum. Kein Dialog, kein Text außer gelegentlichen Kistenbeschriftungen, kein Punktestand, kein Scheitern. Die gesamte Geschichte wird dadurch erzählt, was sie besitzt und was sie aufbewahrt: das Kuscheltier aus der Kindheit, das durch jeden Umzug reist; das Haus des Ex-Freundes, wo ihre Sachen nicht ganz passen; der Raum, den sie schließlich ganz zu ihrem eigenen macht. Die meisten Spieler weinen mindestens einmal. Es dauert etwa 3-4 Stunden und ist auf Xbox Game Pass, Nintendo Switch und mehr verfügbar.',
    tip_en: "Don't rush placing objects — take your time reading the room and putting things where they feel right, not just where they technically fit.",
    tip_zh: '不要急于放置物品——花时间阅读房间，把东西放在感觉对的地方，而不仅仅是技术上合适的地方。',
    tip_zhTW: '不要急於放置物品——花時間閱讀房間，把東西放在感覺對的地方，而不僅僅是技術上合適的地方。',
    tip_ja: 'モノを置く場所を急がないで——部屋の雰囲気を読みながら、「技術的に収まる場所」ではなく「ここが正しいと感じる場所」に置いてみてください。',
    tip_ko: '물건 배치를 서두르지 마세요——방의 분위기를 천천히 읽으며 그냥 맞는 자리가 아니라 "여기가 맞다"고 느껴지는 자리에 놓아보세요.',
    tip_de: 'Beeile dich nicht, Gegenstände zu platzieren — nimm dir Zeit, den Raum zu lesen, und lege Dinge dorthin, wo sie sich richtig anfühlen, nicht nur wo sie technisch hinpassen.',
  },
  'little-left': {
    title_en: 'A Little to the Left',
    title_zh: 'A Little to the Left',
    title_zhTW: 'A Little to the Left',
    title_ja: 'A Little to the Left',
    title_ko: 'A Little to the Left',
    title_de: 'A Little to the Left',
    emoji: '🗂️',
    tag_en: 'Satisfying organization puzzles with no wrong answers',
    tag_zh: '令人满足的整理谜题，没有错误答案',
    tag_zhTW: '令人滿足的整理謎題，沒有錯誤答案',
    tag_ja: '正解はひとつじゃない——脳に効く整理整頓パズル',
    tag_ko: '정답이 하나가 아닌 — 뇌가 즐거워지는 정리 정돈 퍼즐',
    tag_de: 'Befriedigende Ordnungsrätsel ohne falsche Antworten',
    platform_en: 'Available on: Nintendo Switch, PC (Steam), iOS/Android (Apple Arcade), Xbox Game Pass',
    platform_zh: '可在以下平台获取：Nintendo Switch、PC（Steam）、iOS/Android（Apple Arcade）、Xbox Game Pass',
    platform_zhTW: '可在以下平台取得：Nintendo Switch、PC（Steam）、iOS/Android（Apple Arcade）、Xbox Game Pass',
    platform_ja: '対応プラットフォーム：Nintendo Switch、PC（Steam）、iOS/Android（Apple Arcade）、Xbox Game Pass',
    platform_ko: '플랫폼: Nintendo Switch, PC(Steam), iOS/Android(Apple Arcade), Xbox Game Pass',
    platform_de: 'Erhältlich auf: Nintendo Switch, PC (Steam), iOS/Android (Apple Arcade), Xbox Game Pass',
    why_en:
      "A Little to the Left is exactly the game your brain is asking for — organization puzzles that trigger the same satisfying instinct as aligning books by color, arranging items by size, or creating perfect patterns. Each puzzle presents a collection of everyday objects (pencils, stamps, kitchen utensils, plants) and asks you to arrange them. There is often more than one valid solution, and the game rewards creative thinking about how things could be grouped or sorted. There's a delightful mischievous cat that occasionally undoes your work. Puzzles range from 2-10 minutes each, making it ideal for short sessions. The Cupboards & Drawers DLC adds substantial extra content. Available on Apple Arcade (included with subscription), Xbox Game Pass, and Steam.",
    why_zh:
      'A Little to the Left 正是你的大脑所需的游戏——触发与按颜色对齐书籍、按大小排列物品或创造完美图案相同满足感的整理谜题。每个谜题呈现一系列日常物品（铅笔、邮票、厨房用具、植物），要求你排列它们。通常不止一个有效解决方案，游戏奖励对物品如何分组或排序的创造性思考。有一只迷人的淘气猫偶尔会破坏你的工作。谜题从 2-10 分钟不等，非常适合短暂的游戏时段。Cupboards & Drawers DLC 增加了大量额外内容。可在 Apple Arcade（包含在订阅中）、Xbox Game Pass 和 Steam 上获取。',
    why_zhTW:
      'A Little to the Left 正是你的大腦所需的遊戲——觸發與按顏色對齊書籍、按大小排列物品或創造完美圖案相同滿足感的整理謎題。每個謎題呈現一系列日常物品（鉛筆、郵票、廚房用具、植物），要求你排列它們。通常不止一個有效解決方案，遊戲獎勵對物品如何分組或排序的創造性思考。有一隻迷人的淘氣貓偶爾會破壞你的工作。謎題從 2-10 分鐘不等，非常適合短暫的遊戲時段。Cupboards & Drawers DLC 增加了大量額外內容。可在 Apple Arcade（包含在訂閱中）、Xbox Game Pass 和 Steam 上取得。',
    why_ja:
      'A Little to the Leftはあなたの脳が求めているゲームです。本を色別に並べたり、大きさ順に物を揃えたりするときの、あの独特の達成感を刺激する整理パズルです。各パズルには日用品（鉛筆、切手、キッチン用品、植物など）が登場し、それらを整理します。正解はひとつではなく、グループの作り方やソートの仕方に創造性が発揮できます。チャーミングないたずら猫が時々あなたの仕事を台無しにすることも。各パズルは2〜10分程度なので、短い時間にぴったり。「Cupboards & Drawers」DLCでコンテンツが大幅に増えます。Apple Arcade（サブスク込み）、Xbox Game Pass、Steamでプレイ可能です。',
    why_ko:
      'A Little to the Left는 당신의 뇌가 딱 원하는 게임입니다. 책을 색깔별로 정렬하거나, 크기 순서대로 물건을 늘어놓거나, 완벽한 패턴을 만들 때의 그 특유한 만족감을 자극하는 정리 퍼즐입니다. 각 퍼즐마다 일상 용품들(연필, 우표, 주방 도구, 식물 등)이 등장하고, 이를 배열해야 합니다. 정답이 여럿인 경우가 많아서 그룹핑이나 정렬 방식에 창의성을 발휘할 수 있어요. 가끔 당신의 작업을 망쳐놓는 귀여운 고양이도 등장합니다. 퍼즐 하나에 2-10분 정도라 짧은 세션에 안성맞춤. Cupboards & Drawers DLC로 콘텐츠가 크게 늘어납니다. Apple Arcade, Xbox Game Pass, Steam에서 즐길 수 있어요.',
    why_de:
      'A Little to the Left ist genau das Spiel, nach dem dein Gehirn sucht — Ordnungsrätsel, die denselben befriedigenden Instinkt auslösen wie Bücher nach Farbe ordnen, Dinge nach Größe arrangieren oder perfekte Muster erstellen. Jedes Rätsel präsentiert eine Sammlung von Alltagsgegenständen (Stifte, Briefmarken, Küchenutensilien, Pflanzen) und fordert dich auf, sie anzuordnen. Oft gibt es mehr als eine gültige Lösung, und das Spiel belohnt kreatives Denken darüber, wie Dinge gruppiert oder sortiert werden könnten. Eine entzückende freche Katze macht manchmal deine Arbeit zunichte. Rätsel dauern zwischen 2-10 Minuten, was es ideal für kurze Spielsitzungen macht. Das DLC "Cupboards & Drawers" fügt zusätzliche Inhalte hinzu. Verfügbar auf Apple Arcade, Xbox Game Pass und Steam.',
    tip_en: 'When a puzzle stumps you, try thinking about category instead of appearance — groupings by function sometimes reveal the hidden pattern.',
    tip_zh: '当谜题难住你时，尝试从类别而非外观来思考——按功能分组有时会揭示隐藏的规律。',
    tip_zhTW: '當謎題難住你時，嘗試從類別而非外觀來思考——按功能分組有時會揭示隱藏的規律。',
    tip_ja: 'パズルに詰まったら、見た目ではなくカテゴリで考えてみましょう——機能でグループ分けすると、隠れたパターンが見えてくることがあります。',
    tip_ko: '퍼즐에서 막히면 겉모양이 아니라 카테고리로 생각해보세요——기능별로 묶으면 숨겨진 패턴이 보일 때가 있어요.',
    tip_de: 'Wenn ein Rätsel dich herausfordert, denke über Kategorien statt über das Aussehen nach — Gruppierungen nach Funktion enthüllen manchmal das versteckte Muster.',
  },
  wylde: {
    title_en: 'Wylde Flowers',
    title_zh: 'Wylde Flowers',
    title_zhTW: 'Wylde Flowers',
    title_ja: 'Wylde Flowers',
    title_ko: 'Wylde Flowers',
    title_de: 'Wylde Flowers',
    emoji: '🌸',
    tag_en: 'Farming + magic + wholesome story with real heart',
    tag_zh: '农业 + 魔法 + 真诚温馨的故事',
    tag_zhTW: '農業 + 魔法 + 真誠溫馨的故事',
    tag_ja: '農業＋魔法＋心のこもったほっこりストーリー',
    tag_ko: '농사 + 마법 + 진심이 담긴 따뜻한 스토리',
    tag_de: 'Farming + Magie + herzliche Geschichte mit echtem Gefühl',
    platform_en: 'Available on: iOS/Android (Apple Arcade), PC (Steam), Nintendo Switch',
    platform_zh: '可在以下平台获取：iOS/Android（Apple Arcade）、PC（Steam）、Nintendo Switch',
    platform_zhTW: '可在以下平台取得：iOS/Android（Apple Arcade）、PC（Steam）、Nintendo Switch',
    platform_ja: '対応プラットフォーム：iOS/Android（Apple Arcade）、PC（Steam）、Nintendo Switch',
    platform_ko: '플랫폼: iOS/Android(Apple Arcade), PC(Steam), Nintendo Switch',
    platform_de: 'Erhältlich auf: iOS/Android (Apple Arcade), PC (Steam), Nintendo Switch',
    why_en:
      "Wylde Flowers is an indie farming game with a generous heart — and it's exactly what you are looking for. You play as Tara, a city woman who inherits her grandmother's farm in a small coastal town and discovers she is a witch. The game combines traditional farming (crops, animals, seasons) with a witches' coven, potion crafting, and a full story with voiced characters and romance options. The writing is warm, the characters are diverse and well-written, and the story handles themes of belonging and self-discovery with genuine care. It started as an Apple Arcade exclusive and is now also available on Steam and Switch. Most players complete the main story in 20-30 hours while leaving plenty of farming to continue afterward.",
    why_zh:
      'Wylde Flowers 是一款有着慷慨内心的独立农场游戏——它正是你在寻找的。你扮演 Tara，一位在一个小海滨小镇继承外祖母农场并发现自己是女巫的城市女性。游戏将传统农业（作物、动物、季节）与女巫集会、药水制作以及有声角色和恋爱选项的完整故事相结合。写作温暖，角色多样且有深度，故事以真诚的关怀处理归属感和自我发现的主题。它最初是 Apple Arcade 独占，现在也可在 Steam 和 Switch 上获取。大多数玩家在 20-30 小时内完成主故事，同时之后仍有大量农业内容可以继续。',
    why_zhTW:
      'Wylde Flowers 是一款有著溫暖內心的獨立農場遊戲——它正是你在尋找的。你扮演 Tara，一位在一個小海濱小鎮繼承外祖母農場並發現自己是女巫的城市女性。遊戲將傳統農業（作物、動物、季節）與女巫集會、藥水製作以及有聲角色和戀愛選項的完整故事相結合。寫作溫暖，角色多樣且有深度，故事以真誠的關懷處理歸屬感和自我發現的主題。它最初是 Apple Arcade 獨占，現在也可在 Steam 和 Switch 上取得。大多數玩家在 20-30 小時內完成主故事，同時之後仍有大量農業內容可以繼續。',
    why_ja:
      'Wylde Flowersは、温かみのあるインディー農場ゲームです。あなたが探していたものはまさにこれ。主人公のTaraは、小さな海辺の町で祖母の農場を継いだ都会の女性。そして、自分が魔女だと気づきます。農業（作物、動物、季節）に加えて、魔女の集会、ポーション作り、声付きキャラクターと恋愛要素のある完全なストーリーが楽しめます。ライティングが温かく、キャラクターは多様でよく描かれており、「居場所を見つけること」と「自己発見」というテーマが誠実に扱われています。もともとApple Arcade独占でしたが、現在はSteamとSwitchでもプレイ可能。メインストーリーのクリアには20〜30時間ほどかかります。',
    why_ko:
      'Wylde Flowers는 따뜻한 마음이 가득한 인디 농장 게임으로, 당신이 찾던 바로 그 게임입니다. 주인공 Tara는 작은 해변 마을에서 할머니의 농장을 물려받은 도시 여성으로, 자신이 마녀라는 사실을 알게 됩니다. 전통 농업(작물, 동물, 계절)에 마녀 집회, 포션 제작, 성우가 붙은 캐릭터들과 로맨스 옵션이 있는 완전한 스토리가 어우러집니다. 글이 따뜻하고, 캐릭터들은 다양하고 입체적으로 그려져 있으며, 소속감과 자기발견이라는 주제를 진정성 있게 다룹니다. Apple Arcade 독점으로 시작했지만 지금은 Steam과 Switch에서도 즐길 수 있어요. 대부분 20-30시간 안에 메인 스토리를 완료하면서도 그 후에도 농장 생활을 계속할 수 있습니다.',
    why_de:
      'Wylde Flowers ist ein Indie-Farming-Spiel mit einem großherzigen Charakter — und es ist genau das, was du suchst. Du spielst als Tara, eine Stadtfrau, die den Bauernhof ihrer Großmutter in einem kleinen Küstenstädtchen erbt und entdeckt, dass sie eine Hexe ist. Das Spiel kombiniert traditionelles Farming (Ernten, Tiere, Jahreszeiten) mit einem Hexenzirkel, Trankebrauerei und einer vollständigen Geschichte mit vertonten Charakteren und Romantikoptionen. Das Schreiben ist herzlich, die Charaktere sind vielfältig und gut ausgearbeitet, und die Geschichte behandelt Themen wie Zugehörigkeit und Selbstentdeckung mit echter Sorgfalt. Es startete als Apple-Arcade-Exklusivtitel und ist nun auch auf Steam und Switch verfügbar. Die meisten Spieler schließen die Hauptgeschichte in 20-30 Stunden ab.',
    tip_en: 'Join the coven early — the potion recipes you learn unlock some of the best farm upgrades and reveal the most interesting story beats.',
    tip_zh: '尽早加入女巫集会——你学到的药水配方解锁了一些最好的农场升级，并揭示了最有趣的故事情节。',
    tip_zhTW: '儘早加入女巫集會——你學到的藥水配方解鎖了一些最好的農場升級，並揭示了最有趣的故事情節。',
    tip_ja: '早めに魔女の集会に参加しましょう——覚えたポーションレシピで農場の重要なアップグレードが解放され、物語の核心的なシーンも明らかになります。',
    tip_ko: '마녀 집회에 일찍 가입하세요——배우는 포션 레시피로 최고의 농장 업그레이드가 해금되고, 가장 흥미로운 스토리 장면들이 펼쳐집니다.',
    tip_de: 'Tritt dem Hexenzirkel früh bei — die Trankerezepte, die du lernst, schalten einige der besten Farmverbesserungen frei und enthüllen die interessantesten Handlungsmomente.',
  },
}

function calcResult(answers: Pick[]): Pick {
  const counts: Record<Pick, number> = { grove: 0, unpacking: 0, 'little-left': 0, wylde: 0 }
  for (const a of answers) counts[a]++
  return Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0] as Pick
}

export function CozyIndieQuiz({ locale }: { locale: string }) {
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
    const url = `${BASE_URL}/${locale}/quizzes/cozy-indie-games`
    const shareText = getLoc(
      `测出我最应该玩的独立 cozy 游戏是「${result.title_zh}」！${result.tag_zh}。找到你的：${url}`,
      `My indie cozy game match is ${result.title_en} — ${result.tag_en}. Find yours: ${url}`,
      `測出我最應該玩的獨立 cozy 遊戲是「${result.title_zhTW}」！${result.tag_zhTW}。找到你的：${url}`,
      `私のインディーコージーゲームは「${result.title_ja}」でした！${result.tag_ja}。あなたも試してみて：${url}`,
      `내 인디 코지 게임 결과는 「${result.title_ko}」！${result.tag_ko}。당신도 테스트해보세요: ${url}`,
      `Mein Indie-Cozy-Game-Match ist ${result.title_de} — ${result.tag_de}. Finde deins: ${url}`,
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
              {getLoc('开始小贴士：', 'Getting started: ', '開始小貼士：', 'はじめる前に：', '시작 팁: ', 'Einstiegstipp: ')}
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
            '你应该玩哪款独立 Cozy 游戏？',
            'Which Indie Cozy Game Should You Play?',
            '你應該玩哪款獨立 Cozy 遊戲？',
            'どのインディーコージーゲームをプレイすべき？',
            '어떤 인디 코지 게임을 플레이해야 할까요?',
            'Welches Indie Cozy Game solltest du spielen?',
          )}
        </h1>
        <p className="text-sm text-[#8a9a7a]">
          {getLoc(
            '6 个问题，在 Cozy Grove、Unpacking、A Little to the Left 和 Wylde Flowers 之间找到最适合你的',
            '6 questions to find your match across Cozy Grove, Unpacking, A Little to the Left, and Wylde Flowers',
            '6 個問題，在 Cozy Grove、Unpacking、A Little to the Left 和 Wylde Flowers 之間找到最適合你的',
            '6つの質問で、Cozy Grove・Unpacking・A Little to the Left・Wylde Flowersの中からあなたにぴったりの1本を見つけよう',
            '6가지 질문으로 Cozy Grove, Unpacking, A Little to the Left, Wylde Flowers 중 내게 딱 맞는 게임 찾기',
            '6 Fragen, um dein perfektes Match unter Cozy Grove, Unpacking, A Little to the Left und Wylde Flowers zu finden',
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
          '找到我的独立游戏',
          'Find My Indie Cozy Game',
          '找到我的獨立遊戲',
          '私のコージーゲームを見つける',
          '나의 코지 게임 찾기',
          'Mein Indie Cozy Game finden',
        )}
      </button>
    </div>
  )
}
