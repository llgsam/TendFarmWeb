'use client'

import { useState } from 'react'
import { BASE_URL } from '@/lib/config'

type Spirit = 'gwen' | 'atul' | 'summer' | 'gustav'

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
  options: Array<{ en: string; zh: string; zhTW: string; ja: string; ko: string; de: string; type: Spirit }>
}> = [
  {
    q_en: 'How do you typically process difficult emotions?',
    q_zh: '你通常如何处理困难的情绪？',
    q_zhTW: '你通常如何處理困難的情緒？',
    q_ja: '感情的に辛いとき、どう対処しますか？',
    q_ko: '힘든 감정이 생길 때 보통 어떻게 처리하나요?',
    q_de: 'Wie gehst du normalerweise mit schwierigen Gefühlen um?',
    options: [
      {
        en: 'Alone, with a book and tea — I need time and quiet to work things through',
        zh: '独处、看书、喝茶——我需要时间和安静来消化一切',
        zhTW: '獨處、看書、喝茶——我需要時間和安靜來消化一切',
        ja: '一人で本を読んでお茶を飲む——じっくり時間をかけて気持ちを整理したい',
        ko: '혼자서 책 읽고 차 마시며 — 조용히 시간을 두고 정리해요',
        de: 'Allein mit einem Buch und Tee — ich brauche Zeit und Ruhe, um alles zu verarbeiten',
        type: 'gwen',
      },
      {
        en: 'By cooking or feeding people — nurturing others helps me feel grounded',
        zh: '通过烹饪或给人吃东西——照顾他人让我感到踏实',
        zhTW: '透過烹飪或給人吃東西——照顧他人讓我感到踏實',
        ja: '料理をして誰かに食べさせる——人を気にかけることで安定する',
        ko: '요리하고 사람들 챙겨주기 — 누군가를 돌보면 마음이 안정돼요',
        de: 'Indem ich koche oder anderen Essen mache — andere zu umsorgen gibt mir Halt',
        type: 'atul',
      },
      {
        en: 'Through stillness — I sit with the feeling until it passes naturally',
        zh: '通过静止——我与情绪同坐，直到它自然消散',
        zhTW: '透過靜止——我與情緒同坐，直到它自然消散',
        ja: '静かに感情と向き合う——自然に過ぎ去るまでただ座っている',
        ko: '그냥 가만히 있어요 — 감정이 자연스럽게 지나갈 때까지 함께 앉아있어요',
        de: 'In der Stille — ich sitze mit dem Gefühl, bis es von selbst vergeht',
        type: 'summer',
      },
      {
        en: 'By expressing it dramatically — I write, paint, or perform until it leaves my system',
        zh: '通过戏剧化的表达——我写作、绘画或表演，直到情绪从体内释放',
        zhTW: '透過戲劇化的表達——我寫作、繪畫或表演，直到情緒從體內釋放',
        ja: '大胆に表現する——書いたり描いたり演じたりして感情を外に出す',
        ko: '극적으로 표현해요 — 글 쓰고, 그림 그리고, 연기하면서 감정을 내보내요',
        de: 'Durch dramatischen Ausdruck — ich schreibe, male oder performe, bis es aus mir raus ist',
        type: 'gustav',
      },
    ],
  },
  {
    q_en: 'What do people who know you well say about you?',
    q_zh: '了解你的人会怎么描述你？',
    q_zhTW: '了解你的人會怎麼描述你？',
    q_ja: 'あなたをよく知る人はあなたをどう表現しますか？',
    q_ko: '당신을 잘 아는 사람들은 당신을 어떻게 표현하나요?',
    q_de: 'Was sagen Menschen, die dich gut kennen, über dich?',
    options: [
      {
        en: "That you're hard to read at first, but incredibly loyal once you open up",
        zh: '刚开始很难读懂，但一旦敞开心扉就无比忠诚',
        zhTW: '剛開始很難讀懂，但一旦敞開心扉就無比忠誠',
        ja: '最初は掴みにくいけど、心を開いたら驚くほど誠実だと言われる',
        ko: '처음엔 파악하기 어렵지만, 마음을 열면 엄청나게 충실하다고 해요',
        de: 'Dass du zuerst schwer zu durchschauen bist, aber unglaublich loyal, wenn du dich öffnest',
        type: 'gwen',
      },
      {
        en: "That you're the warmest person they know — always ready with food and a hug",
        zh: '你是他们认识的最温暖的人——总是随时准备好食物和拥抱',
        zhTW: '你是他們認識的最溫暖的人——總是隨時準備好食物和擁抱',
        ja: '知り合いの中で一番温かい人——いつも食べ物とハグを用意してると言われる',
        ko: '아는 사람 중 가장 따뜻한 사람 — 언제나 음식과 포옹을 준비하고 있다고 해요',
        de: 'Dass du die wärmste Person bist, die sie kennen — immer bereit mit Essen und einer Umarmung',
        type: 'atul',
      },
      {
        en: "That you have a calm that other people find grounding just to be around",
        zh: '你的平静让身边的人也感到踏实',
        zhTW: '你的平靜讓身邊的人也感到踏實',
        ja: 'あなたの落ち着きは周りの人を安心させると言われる',
        ko: '당신의 차분함이 곁에 있는 사람들을 안정시킨다고 해요',
        de: 'Dass deine Ruhe andere erdet — einfach in deiner Nähe zu sein beruhigt sie',
        type: 'summer',
      },
      {
        en: "That you're a lot — but in the best possible way, always memorable",
        zh: '你存在感很强——但是以最好的方式，总是令人难忘',
        zhTW: '你存在感很強——但是以最好的方式，總是令人難忘',
        ja: '「存在感が強い」と言われる——でも最高の意味で、いつも印象に残ると',
        ko: '존재감이 엄청나다고 해요 — 하지만 최고의 의미로, 언제나 인상적이라고',
        de: 'Dass du "viel" bist — aber im besten Sinne, immer unvergesslich',
        type: 'gustav',
      },
    ],
  },
  {
    q_en: 'Your ideal way to spend a free afternoon is:',
    q_zh: '你理想中的自由下午是怎么度过的？',
    q_zhTW: '你理想中的自由下午是怎麼度過的？',
    q_ja: '自由な午後の理想的な過ごし方は？',
    q_ko: '자유로운 오후를 보내는 이상적인 방법은?',
    q_de: 'Wie verbringst du am liebsten einen freien Nachmittag?',
    options: [
      {
        en: 'Reading somewhere with good light, with coffee and absolutely no interruptions',
        zh: '在光线好的地方看书，喝着咖啡，绝对不被打扰',
        zhTW: '在光線好的地方看書，喝著咖啡，絕對不被打擾',
        ja: '光のいい場所で本を読む——コーヒーを飲みながら、絶対邪魔されずに',
        ko: '햇살 좋은 곳에서 책 읽기 — 커피 마시며 절대 방해받지 않고',
        de: 'An einem Ort mit gutem Licht lesen, mit Kaffee und ohne jede Unterbrechung',
        type: 'gwen',
      },
      {
        en: 'Making a big meal for everyone — cooking is love, full stop',
        zh: '为大家做一顿丰盛的饭——烹饪就是爱，就这么简单',
        zhTW: '為大家做一頓豐盛的飯——烹飪就是愛，就這麼簡單',
        ja: '皆のためにたっぷり料理する——料理は愛、それだけでいい',
        ko: '모두를 위해 풍성한 식사 만들기 — 요리는 곧 사랑이에요, 그게 전부예요',
        de: 'Für alle eine große Mahlzeit kochen — Kochen ist Liebe, Punkt',
        type: 'atul',
      },
      {
        en: 'A long walk somewhere quiet, watching light change, no destination in mind',
        zh: '在安静的地方长途漫步，看光线变化，没有目的地',
        zhTW: '在安靜的地方長途漫步，看光線變化，沒有目的地',
        ja: '静かな場所でゆっくり散歩——光の変化を眺めながら、目的地はどこにもない',
        ko: '조용한 곳에서 긴 산책 — 빛이 변화하는 걸 바라보며, 목적지 없이',
        de: 'Ein langer Spaziergang irgendwo in der Stille, dem Licht beim Wandern zusehen, ohne Ziel',
        type: 'summer',
      },
      {
        en: 'Working on a creative project — a painting, a performance, something with an audience in mind',
        zh: '做一个创意项目——一幅画、一场表演、想象中有观众的某件事',
        zhTW: '做一個創意項目——一幅畫、一場表演、想像中有觀眾的某件事',
        ja: 'クリエイティブなプロジェクトに取り組む——絵、パフォーマンス、観客を想定した何か',
        ko: '창의적인 프로젝트 작업 — 그림, 공연, 관객을 상상하며 만드는 무언가',
        de: 'An einem kreativen Projekt arbeiten — ein Gemälde, eine Aufführung, etwas mit Publikum vor Augen',
        type: 'gustav',
      },
    ],
  },
  {
    q_en: 'When someone you love is struggling, your instinct is to:',
    q_zh: '当你爱的人在挣扎时，你的本能反应是：',
    q_zhTW: '當你愛的人在掙扎時，你的本能反應是：',
    q_ja: '大切な人が辛そうなとき、あなたの本能的な反応は？',
    q_ko: '사랑하는 사람이 힘들어할 때, 당신의 본능적인 반응은?',
    q_de: 'Wenn jemand, den du liebst, kämpft, ist dein Instinkt:',
    options: [
      {
        en: "Stay close and present without saying much — your presence says it all",
        zh: '默默守在旁边——你的存在本身就说明了一切',
        zhTW: '默默守在旁邊——你的存在本身就說明了一切',
        ja: 'そっとそばにいる——言葉は少なくていい、そこにいることが全てを語る',
        ko: '조용히 곁에 있기 — 많은 말 없이도 존재 자체가 모든 걸 말해줘요',
        de: 'Nah und präsent bleiben ohne viel zu sagen — deine Anwesenheit sagt alles',
        type: 'gwen',
      },
      {
        en: "Show up with food and offer to help with whatever practical thing needs doing",
        zh: '带着食物出现，主动帮忙处理任何实际需要的事',
        zhTW: '帶著食物出現，主動幫忙處理任何實際需要的事',
        ja: '食べ物を持って駆けつける——何か実用的なことがあれば何でも手伝う',
        ko: '음식 들고 나타나기 — 실질적으로 필요한 것이라면 뭐든 도와줘요',
        de: 'Mit Essen auftauchen und bei allem Praktischen helfen, was zu tun ist',
        type: 'atul',
      },
      {
        en: "Listen deeply and help them find the stillness to see their situation clearly",
        zh: '深度倾听，帮他们找到平静，看清自己的处境',
        zhTW: '深度傾聽，幫他們找到平靜，看清自己的處境',
        ja: '深く聞いて、静けさを見つける助けをする——状況を冷静に見られるように',
        ko: '깊이 들어주고, 고요함을 찾도록 도와줘요 — 상황을 명확하게 볼 수 있도록',
        de: 'Tief zuhören und ihnen helfen, die Ruhe zu finden, um ihre Situation klar zu sehen',
        type: 'summer',
      },
      {
        en: "Offer a dramatic pep talk and remind them of their own greatness",
        zh: '给他们一场慷慨激昂的鼓励，提醒他们自己有多了不起',
        zhTW: '給他們一場慷慨激昂的鼓勵，提醒他們自己有多了不起',
        ja: '熱烈な激励演説をして、その人の素晴らしさを思い出させる',
        ko: '열정적으로 격려하며, 그들이 얼마나 대단한 사람인지 상기시켜줘요',
        de: 'Einen dramatischen Motivationsmonolog halten und ihnen ihre eigene Größe in Erinnerung rufen',
        type: 'gustav',
      },
    ],
  },
  {
    q_en: 'Which phrase resonates with you most?',
    q_zh: '哪句话最能引起你的共鸣？',
    q_zhTW: '哪句話最能引起你的共鳴？',
    q_ja: '最も響く言葉はどれですか？',
    q_ko: '가장 공감되는 말은 무엇인가요?',
    q_de: 'Welcher Satz resoniert am meisten mit dir?',
    options: [
      {
        en: '"A good book and solitude is the best medicine for most things"',
        zh: '"一本好书和独处是大多数事情的最佳良药"',
        zhTW: '"一本好書和獨處是大多數事情的最佳良藥"',
        ja: '「良い本と孤独は、たいていのことに効く最高の薬だ」',
        ko: '"좋은 책과 혼자만의 시간은 대부분의 것에 대한 최고의 약이다"',
        de: '"Ein gutes Buch und Einsamkeit ist für die meisten Dinge das beste Heilmittel"',
        type: 'gwen',
      },
      {
        en: '"The way to someone\'s heart is through their stomach"',
        zh: '"走进一个人心里的方式是通过他的胃"',
        zhTW: '"走進一個人心裡的方式是通過他的胃"',
        ja: '「人の心への道は胃袋を通る」',
        ko: '"사람의 마음으로 가는 길은 위장을 통한다"',
        de: '"Der Weg zu jemandes Herz führt durch den Magen"',
        type: 'atul',
      },
      {
        en: '"Be still. Everything you need is already here"',
        zh: '"静下来。你需要的一切已经在这里了"',
        zhTW: '"靜下來。你需要的一切已經在這裡了"',
        ja: '「静かにしなさい。あなたが必要なものはすでにここにある」',
        ko: '"고요하게 있어라. 네가 필요한 모든 것이 이미 여기 있다"',
        de: '"Sei still. Alles, was du brauchst, ist bereits hier"',
        type: 'summer',
      },
      {
        en: '"Life is a performance — you might as well make it a good one"',
        zh: '"生命是一场表演——既然如此，不如把它演好"',
        zhTW: '"生命是一場表演——既然如此，不如把它演好"',
        ja: '「人生は舞台だ——どうせやるなら素晴らしい舞台にしよう」',
        ko: '"인생은 공연이다 — 어차피 할 거라면 멋지게 하자"',
        de: '"Das Leben ist eine Aufführung — dann mach sie auch zu einer guten"',
        type: 'gustav',
      },
    ],
  },
  {
    q_en: 'What is your relationship with change and endings?',
    q_zh: '你如何看待变化和结束？',
    q_zhTW: '你如何看待變化和結束？',
    q_ja: '変化や別れについてどう感じますか？',
    q_ko: '변화와 끝에 대해 어떤 관계를 맺고 있나요?',
    q_de: 'Wie ist dein Verhältnis zu Veränderungen und Abschieden?',
    options: [
      {
        en: "Hard to accept — you hold on before eventually letting go with grace",
        zh: '难以接受——你会紧握住，最终优雅地放手',
        zhTW: '難以接受——你會緊握住，最終優雅地放手',
        ja: '受け入れがたい——しっかり掴んでから、最終的には優雅に手放す',
        ko: '받아들이기 어려워요 — 꽉 잡고 있다가 결국 우아하게 놓아줘요',
        de: 'Schwer zu akzeptieren — du hältst fest, bevor du am Ende mit Würde loslässt',
        type: 'gwen',
      },
      {
        en: "Bittersweet — every ending means the memories and love still remain",
        zh: '苦乐参半——每个结束意味着记忆和爱依然留存',
        zhTW: '苦樂參半——每個結束意味著記憶和愛依然留存',
        ja: '甘くて苦い——どんな終わりも、記憶と愛は残ると思っている',
        ko: '씁쓸하면서도 달콤해요 — 모든 끝은 기억과 사랑이 남아있다는 의미니까요',
        de: 'Bittersüß — jedes Ende bedeutet, dass die Erinnerungen und die Liebe bleiben',
        type: 'atul',
      },
      {
        en: "Natural — change is the only constant and you make peace with it early",
        zh: '自然的——变化是唯一的常数，你很早就与之和解',
        zhTW: '自然的——變化是唯一的常數，你很早就與之和解',
        ja: '自然なこと——変化は唯一の定数で、早い段階で折り合いをつけている',
        ko: '자연스러운 일이에요 — 변화는 유일한 상수이고, 일찍부터 그것과 화해했어요',
        de: 'Natürlich — Veränderung ist die einzige Konstante, du hast früh Frieden damit gemacht',
        type: 'summer',
      },
      {
        en: "Dramatic but ultimately beautiful — a good ending deserves a grand exit",
        zh: '戏剧化但终究美丽——好的结局值得一个盛大的谢幕',
        zhTW: '戲劇化但終究美麗——好的結局值得一個盛大的謝幕',
        ja: 'ドラマチックだけど最後は美しい——良い終わりには盛大な幕切れが必要だ',
        ko: '극적이지만 결국 아름다워요 — 좋은 결말에는 화려한 마무리가 어울려요',
        de: 'Dramatisch, aber letztlich schön — ein gutes Ende verdient einen großen Abgang',
        type: 'gustav',
      },
    ],
  },
]

const RESULTS: Record<
  Spirit,
  {
    name_en: string
    name_zh: string
    name_zhTW: string
    name_ja: string
    name_ko: string
    name_de: string
    emoji: string
    trait_en: string
    trait_zh: string
    trait_zhTW: string
    trait_ja: string
    trait_ko: string
    trait_de: string
    desc_en: string
    desc_zh: string
    desc_zhTW: string
    desc_ja: string
    desc_ko: string
    desc_de: string
    quote_en: string
    quote_zh: string
    quote_zhTW: string
    quote_ja: string
    quote_ko: string
    quote_de: string
  }
> = {
  gwen: {
    name_en: 'Gwen',
    name_zh: '关恩',
    name_zhTW: '關恩',
    name_ja: 'グウェン',
    name_ko: '그웬',
    name_de: 'Gwen',
    emoji: '🦊',
    trait_en: 'The Quiet Intellectual',
    trait_zh: '沉静的智识者',
    trait_zhTW: '沉靜的智識者',
    trait_ja: '静かな知識人',
    trait_ko: '조용한 지식인',
    trait_de: 'Die stille Intellektuelle',
    desc_en:
      "You are Gwen — reserved on the surface but rich with feeling underneath. You take time to open up, but once you do, your loyalty and depth are extraordinary. You find comfort in books, solitude, and a perfectly made cup of tea. You carry more than you show. You have high standards for yourself that sometimes come from old wounds, and you are slowly learning that being loved does not require you to be perfect. Your inner world is vast and beautiful — the people who earn your trust get to see it.",
    desc_zh:
      '你是关恩——表面内敛，内心却充盈着丰富的情感。你需要时间才能敞开心扉，但一旦敞开，你的忠诚和深度便令人叹服。你在书本、独处和一杯泡得恰到好处的茶中找到慰藉。你承担的比你展示的要多。你对自己要求很高，这往往来自旧日的伤痕，而你正在慢慢学会：被爱不需要你做到完美。你的内心世界辽阔而美丽——赢得你信任的人才有幸看见它。',
    desc_zhTW:
      '你是關恩——表面內斂，內心卻充盈著豐富的情感。你需要時間才能敞開心扉，但一旦敞開，你的忠誠和深度便令人歎服。你在書本、獨處和一杯泡得恰到好處的茶中找到慰藉。你承擔的比你展示的要多。你對自己要求很高，這往往來自舊日的傷痕，而你正在慢慢學會：被愛不需要你做到完美。你的內心世界遼闊而美麗——贏得你信任的人才有幸看見它。',
    desc_ja:
      'あなたはグウェンです——表面は内向的でも、内側には豊かな感情があふれています。心を開くまでには時間がかかりますが、一度開いたら、その誠実さと深さは驚くほど。本と独りでいる時間と、丁寧に淹れたお茶の中に安らぎを見つけます。見せる以上のものを抱えている。自分への高い期待は、古い傷から来ることが多い。でも少しずつ学んでいます——愛されるために完璧である必要はないと。あなたの内なる世界は広くて美しい——信頼を勝ち取った人だけがそれを見ることができます。',
    desc_ko:
      '당신은 그웬입니다——겉으로는 조용하지만 내면에는 풍부한 감정이 흐르고 있어요. 마음을 여는 데 시간이 걸리지만, 한번 열면 그 충성심과 깊이는 놀랍습니다. 책과 혼자만의 시간, 제대로 우려낸 차 한 잔에서 위안을 찾아요. 드러내는 것보다 더 많은 것을 짊어지고 있어요. 자신에 대한 높은 기준은 옛 상처에서 오는 경우가 많고, 서서히 배워가고 있어요——사랑받기 위해 완벽할 필요는 없다는 걸. 당신의 내면 세계는 광활하고 아름다워요——당신의 신뢰를 얻은 사람만이 그것을 볼 수 있어요.',
    desc_de:
      'Du bist Gwen — nach außen hin zurückhaltend, aber innerlich voller Gefühl. Du brauchst Zeit, dich zu öffnen, aber wenn du es tust, sind deine Loyalität und Tiefe außergewöhnlich. Du findest Trost in Büchern, Einsamkeit und einer perfekt gebrühten Tasse Tee. Du trägst mehr, als du zeigst. Deine hohen Ansprüche an dich selbst kommen oft aus alten Wunden, und du lernst langsam: Geliebt zu werden erfordert nicht, dass du perfekt bist. Deine innere Welt ist weit und schön — die Menschen, die dein Vertrauen verdienen, dürfen sie sehen.',
    quote_en: '"I just need some time alone. That\'s not rejection — it\'s how I come back to myself."',
    quote_zh: '"我只是需要一点独处的时间。这不是拒绝——这是我找回自己的方式。"',
    quote_zhTW: '"我只是需要一點獨處的時間。這不是拒絕——這是我找回自己的方式。"',
    quote_ja: '「ちょっと一人の時間が必要なだけ。拒絶じゃない——自分に戻る方法なんだ。」',
    quote_ko: '"그냥 혼자만의 시간이 필요해요. 거절이 아니에요 — 나 자신으로 돌아오는 방법이에요."',
    quote_de: '"Ich brauche nur ein wenig Zeit für mich allein. Das ist keine Ablehnung — das ist, wie ich zu mir zurückfinde."',
  },
  atul: {
    name_en: 'Atul',
    name_zh: '阿图尔',
    name_zhTW: '阿圖爾',
    name_ja: 'アトゥル',
    name_ko: '아툴',
    name_de: 'Atul',
    emoji: '🍲',
    trait_en: 'The Warm-Hearted Nurturer',
    trait_zh: '热心的养育者',
    trait_zhTW: '熱心的養育者',
    trait_ja: '温かいナーチャラー',
    trait_ko: '따뜻한 돌봄이',
    trait_de: 'Der warmherzige Fürsorger',
    desc_en:
      "You are Atul — joyful, generous, and the emotional center of every room you enter. You show love through food, through showing up, through remembering what everyone likes and making sure they have it. You are not complicated — your warmth is genuine and unconditional. People feel safe around you immediately. You sometimes put others before yourself to a fault, but the truth is: your greatest happiness comes from seeing the people you love thrive. That is not a weakness. That is who you are.",
    desc_zh:
      '你是阿图尔——快乐、慷慨，是你所在每个房间的情感中心。你通过食物、通过出现、通过记住每个人的喜好并确保他们拥有来表达爱。你不复杂——你的温暖是真诚而无条件的。人们在你身边立刻感到安全。你有时会过度把他人放在自己之前，但事实是：看到你爱的人蓬勃成长，是你最大的幸福。这不是弱点。这就是你。',
    desc_zhTW:
      '你是阿圖爾——快樂、慷慨，是你所在每個房間的情感中心。你透過食物、透過出現、透過記住每個人的喜好並確保他們擁有來表達愛。你不複雜——你的溫暖是真誠而無條件的。人們在你身邊立刻感到安全。你有時會過度把他人放在自己之前，但事實是：看到你愛的人蓬勃成長，是你最大的幸福。這不是弱點。這就是你。',
    desc_ja:
      'あなたはアトゥルです——陽気で気前よく、どの部屋でも感情的な中心になります。食べ物を通して、そこにいることを通して、みんなの好みを覚えてそれを用意することで愛を伝えます。複雑なところはない——あなたの温かさは本物で、無条件です。人々はあなたのそばにいると即座に安心感を覚えます。時に他人を自分より優先しすぎることもありますが、本当のことを言えば：愛する人が輝いているのを見ることが、あなたの最大の幸福。それは弱さじゃない。それがあなた。',
    desc_ko:
      '당신은 아툴입니다——즐겁고 너그러우며, 어느 공간에서도 감정적인 중심이 돼요. 음식을 통해, 곁에 있어줌으로써, 모든 사람의 취향을 기억하고 그것을 챙겨줌으로써 사랑을 표현해요. 복잡하지 않아요——당신의 따뜻함은 진심 어리고 조건 없어요. 사람들은 당신 곁에서 즉시 안정감을 느껴요. 가끔 자신보다 타인을 너무 앞세우기도 하지만, 사실은 이래요: 사랑하는 사람이 잘 되는 걸 보는 게 당신의 가장 큰 행복이에요. 그건 약점이 아니에요. 그게 바로 당신이에요.',
    desc_de:
      'Du bist Atul — fröhlich, großzügig und der emotionale Mittelpunkt jedes Raums, den du betrittst. Du zeigst Liebe durch Essen, durch Dasein, durch das Erinnern daran, was alle mögen und dafür sorgen, dass sie es haben. Du bist unkompliziert — deine Wärme ist echt und bedingungslos. Menschen fühlen sich sofort sicher in deiner Nähe. Manchmal stellst du andere zu sehr vor dich selbst, aber die Wahrheit ist: Dein größtes Glück kommt davon, die Menschen, die du liebst, aufblühen zu sehen. Das ist keine Schwäche. Das bist du.',
    quote_en: '"Food is just love you can eat. That\'s the whole philosophy."',
    quote_zh: '"食物只是可以吃的爱。这就是全部的哲学。"',
    quote_zhTW: '"食物只是可以吃的愛。這就是全部的哲學。"',
    quote_ja: '「食べ物は食べられる愛だ。それが全ての哲学。」',
    quote_ko: '"음식은 먹을 수 있는 사랑이에요. 그게 전부예요."',
    quote_de: '"Essen ist einfach Liebe, die man essen kann. Das ist die ganze Philosophie."',
  },
  summer: {
    name_en: 'Summer',
    name_zh: '夏梦',
    name_zhTW: '夏夢',
    name_ja: 'サマー',
    name_ko: '서머',
    name_de: 'Summer',
    emoji: '🌸',
    trait_en: 'The Peaceful Philosopher',
    trait_zh: '平和的哲思者',
    trait_zhTW: '平和的哲思者',
    trait_ja: '穏やかな哲学者',
    trait_ko: '평화로운 철학자',
    trait_de: 'Die friedliche Philosophin',
    desc_en:
      "You are Summer — serene, wise, and deeply at peace with the rhythm of things. You do not fight against what is. You do not dread what comes. You move through life with a grace that other people find both inspiring and slightly mysterious. You have thought deeply about impermanence, about letting go, about the beauty in endings. This does not make you sad — it makes you more fully present in the moments you have. You are the kind of person whose calm is a gift to everyone around you.",
    desc_zh:
      '你是夏梦——宁静、睿智，与万物的节律深深和解。你不抗拒既成之事，不恐惧将临之物。你以一种令他人既感到鼓舞又略感神秘的优雅穿行于生命之中。你对无常、对放手、对结束中的美丽有过深刻的思考。这不会让你悲伤——它让你更完整地活在当下的每一刻。你的平静是给身边所有人的礼物。',
    desc_zhTW:
      '你是夏夢——寧靜、睿智，與萬物的節律深深和解。你不抗拒既成之事，不恐懼將臨之物。你以一種令他人既感到鼓舞又略感神秘的優雅穿行於生命之中。你對無常、對放手、對結束中的美麗有過深刻的思考。這不會讓你悲傷——它讓你更完整地活在當下的每一刻。你的平靜是給身邊所有人的禮物。',
    desc_ja:
      'あなたはサマーです——穏やかで、賢く、あらゆるものの流れと深く和解しています。あるがままに抗わず、来るものを恐れない。人を鼓舞しつつも少し神秘的に映る優雅さで、人生の中を歩みます。無常について、手放すことについて、終わりの中の美しさについて、深く考えてきました。それはあなたを悲しくさせない——それはあなたを今この瞬間により完全に生かせてくれる。あなたの穏やかさは、周りにいる全ての人への贈り物です。',
    desc_ko:
      '당신은 서머입니다——고요하고, 지혜롭고, 모든 것의 흐름과 깊이 화해해 있어요. 이미 된 일에 저항하지 않고, 다가올 것을 두려워하지 않아요. 사람들에게 영감을 주면서도 약간 신비롭게 느껴지는 우아함으로 삶을 걸어가요. 무상함에 대해, 놓아줌에 대해, 끝맺음 속의 아름다움에 대해 깊이 생각해왔어요. 그게 당신을 슬프게 만들지 않아요——그건 당신이 지금 이 순간에 더 완전히 존재하게 해줘요. 당신의 고요함은 주변 모든 사람에게 선물이에요.',
    desc_de:
      'Du bist Summer — ruhig, weise und tief im Frieden mit dem Rhythmus der Dinge. Du kämpfst nicht gegen das, was ist. Du fürchtest nicht das, was kommt. Du bewegst dich durchs Leben mit einer Anmut, die andere gleichzeitig inspirierend und leicht geheimnisvoll finden. Du hast tief über Vergänglichkeit nachgedacht, über das Loslassen, über die Schönheit im Abschied. Das macht dich nicht traurig — es lässt dich vollständiger im Moment anwesend sein. Deine Ruhe ist ein Geschenk für alle um dich herum.',
    quote_en: '"Nothing is lost. Everything changes shape."',
    quote_zh: '"什么都没有失去。一切只是换了形状。"',
    quote_zhTW: '"什麼都沒有失去。一切只是換了形狀。"',
    quote_ja: '「何も失われていない。すべては形を変えるだけ。」',
    quote_ko: '"아무것도 잃지 않았어요. 모든 것은 그저 형태를 바꿀 뿐이에요."',
    quote_de: '"Nichts geht verloren. Alles verändert nur seine Form."',
  },
  gustav: {
    name_en: 'Gustav',
    name_zh: '古斯塔夫',
    name_zhTW: '古斯塔夫',
    name_ja: 'グスタフ',
    name_ko: '구스타프',
    name_de: 'Gustav',
    emoji: '🎭',
    trait_en: 'The Passionate Artist',
    trait_zh: '热情的艺术家',
    trait_zhTW: '熱情的藝術家',
    trait_ja: '情熱的なアーティスト',
    trait_ko: '열정적인 예술가',
    trait_de: 'Der leidenschaftliche Künstler',
    desc_en:
      "You are Gustav — dramatic, expressive, and utterly magnetic. You feel everything at full volume and you are not ashamed of it. You have a flair for the theatrical that sometimes makes people roll their eyes, but more often makes them lean in. Underneath the performance is something genuine: a person who cares deeply about beauty, craft, and leaving a mark on the world. You want to be remembered. You want your work to matter. And if you are honest with yourself, you also just want to be loved — you are working on accepting that you already are.",
    desc_zh:
      '你是古斯塔夫——戏剧化、表达欲强、极具感召力。你以全音量感受一切，对此毫不羞愧。你对戏剧性的事物有一种天赋，有时让人忍不住翻白眼，但更多时候让人不由自主地凑近。表演之下是某种真实的东西：一个深深关心美、技艺和在世界上留下印记的人。你想被记住。你想让你的作品有意义。而如果你对自己诚实，你其实也只是想被爱——你正在学着接受自己已经是被爱的。',
    desc_zhTW:
      '你是古斯塔夫——戲劇化、表達欲強、極具感召力。你以全音量感受一切，對此毫不羞愧。你對戲劇性的事物有一種天賦，有時讓人忍不住翻白眼，但更多時候讓人不由自主地湊近。表演之下是某種真實的東西：一個深深關心美、技藝和在世界上留下印記的人。你想被記住。你想讓你的作品有意義。而如果你對自己誠實，你其實也只是想被愛——你正在學著接受自己已經是被愛的。',
    desc_ja:
      'あなたはグスタフです——ドラマチックで、表現力豊かで、圧倒的な存在感を放ちます。全力で感情を感じ、それを恥ずかしいとは思わない。演劇的なものへの才能があり、時に目を白黒させることもあるけれど、たいてい人を引き寄せてしまう。パフォーマンスの裏には本物があります：美と技術と、世界に何かを残すことを深く大切にしている人。あなたは覚えてほしい。自分の作品に意味を持たせたい。そして正直に言えば——ただ愛されたいだけかもしれない。あなたはすでに愛されているんだと、受け入れようとしている途中です。',
    desc_ko:
      '당신은 구스타프입니다——극적이고, 표현력이 강하고, 압도적인 존재감을 가지고 있어요. 모든 것을 최대 음량으로 느끼며, 그것을 전혀 부끄러워하지 않아요. 연극적인 것에 재능이 있어 가끔 눈을 굴리게 만들기도 하지만, 더 자주는 사람들을 끌어당겨요. 공연 아래에는 진짜가 있어요: 아름다움과 기예, 그리고 세상에 흔적을 남기는 것을 깊이 소중히 여기는 사람. 당신은 기억되고 싶어요. 당신의 작품이 의미 있기를 바라요. 솔직히 말하면, 그냥 사랑받고 싶은 것일 수도 있어요——이미 사랑받고 있다는 걸 받아들이는 중이에요.',
    desc_de:
      'Du bist Gustav — dramatisch, ausdrucksstark und unwiderstehlich magnetisch. Du fühlst alles in voller Lautstärke und schämst dich nicht dafür. Du hast ein Talent für das Theatralische, das manchmal die Augen der Leute rollen lässt, sie aber öfter dazu bringt, sich zu nähern. Unter der Aufführung steckt etwas Echtes: eine Person, die sich tief um Schönheit, Handwerk und darum sorgt, eine Spur in der Welt zu hinterlassen. Du willst erinnert werden. Du willst, dass deine Arbeit bedeutsam ist. Und wenn du ehrlich mit dir bist, willst du auch einfach geliebt werden — du arbeitest daran, zu akzeptieren, dass du es bereits bist.',
    quote_en: '"If you are going to feel something, feel it magnificently."',
    quote_zh: '"如果你要去感受什么，就要壮丽地感受它。"',
    quote_zhTW: '"如果你要去感受什麼，就要壯麗地感受它。"',
    quote_ja: '「どうせ感じるなら、壮大に感じよう。」',
    quote_ko: '"무언가를 느낀다면, 장대하게 느껴요."',
    quote_de: '"Wenn du schon etwas fühlen willst, dann fühle es großartig."',
  },
}

function calcResult(answers: Spirit[]): Spirit {
  const counts: Record<Spirit, number> = { gwen: 0, atul: 0, summer: 0, gustav: 0 }
  for (const a of answers) counts[a]++
  return Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0] as Spirit
}

export function SpiritfarerQuiz({ locale }: { locale: string }) {
  const getLoc = (zh: string, en: string, zhTW?: string, ja?: string, ko?: string, de?: string): string => {
    if (locale === 'zh') return zh
    if (locale === 'zh-TW') return zhTW ?? zh
    if (locale === 'ja') return ja ?? en
    if (locale === 'ko') return ko ?? en
    if (locale === 'de') return de ?? en
    return en
  }

  const isZh = locale === 'zh' || locale === 'zh-TW'
  const [answers, setAnswers] = useState<(Spirit | null)[]>(Array(QUESTIONS.length).fill(null))
  const [submitted, setSubmitted] = useState(false)

  const allAnswered = answers.every((a) => a !== null)

  if (submitted) {
    const result = RESULTS[calcResult(answers as Spirit[])]
    const url = `${BASE_URL}/${locale}/quizzes/spiritfarer-quiz`
    const shareText = getLoc(
      `在 Spiritfarer 里我最像「${result.name_zh}」。这个游戏让我哭了，测测你是哪位灵魂：${url}`,
      `I got ${result.name_en} in the Spiritfarer character quiz. This game wrecked me in the best way. Find your spirit: ${url}`,
      `在 Spiritfarer 裡我最像「${result.name_zhTW}」。這個遊戲讓我哭了，測測你是哪位靈魂：${url}`,
      `Spiritfarerキャラクタークイズで${result.name_ja}になりました。このゲームは最高の意味で心に刺さります。あなたは？：${url}`,
      `Spiritfarer 캐릭터 퀴즈에서 ${result.name_ko}가 나왔어요. 이 게임은 정말 감동적이에요. 당신은요?：${url}`,
      `Ich bin ${result.name_de} im Spiritfarer-Quiz. Dieses Spiel hat mich auf die schönste Art und Weise getroffen. Finde deinen Geist: ${url}`,
    )

    return (
      <div>
        <div className="mb-6 text-center">
          <div className="mb-3 text-6xl">{result.emoji}</div>
          <p className="mb-1 text-xs text-[#4a5a4a]">
            {getLoc(result.trait_zh, result.trait_en, result.trait_zhTW, result.trait_ja, result.trait_ko, result.trait_de)}
          </p>
          <h2 className="mb-3 text-2xl font-bold text-[#f0a832]">
            {getLoc(result.name_zh, result.name_en, result.name_zhTW, result.name_ja, result.name_ko, result.name_de)}
          </h2>
        </div>

        <p className="mb-5 text-sm leading-relaxed text-[#8a9a7a]">
          {getLoc(result.desc_zh, result.desc_en, result.desc_zhTW, result.desc_ja, result.desc_ko, result.desc_de)}
        </p>

        <div className="mb-6 rounded-xl border border-[#2d3d2d] bg-[#0f1a0f] p-4">
          <p className="text-center text-sm italic leading-relaxed text-[#e8dcc8]">
            {getLoc(result.quote_zh, result.quote_en, result.quote_zhTW, result.quote_ja, result.quote_ko, result.quote_de)}
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
            '你是哪位 Spiritfarer 灵魂？',
            'Which Spiritfarer Spirit Are You?',
            '你是哪位 Spiritfarer 靈魂？',
            'あなたはどの Spiritfarer の魂？',
            '당신은 어떤 Spiritfarer 영혼인가요?',
            'Welcher Spiritfarer-Geist bist du?',
          )}
        </h1>
        <p className="text-sm text-[#8a9a7a]">
          {getLoc(
            '6 个关于情感和处世方式的问题，测出你最像关恩、阿图尔、夏梦还是古斯塔夫',
            '6 questions about how you feel and move through life — find your Spiritfarer spirit match',
            '6 個關於情感和處世方式的問題，測出你最像關恩、阿圖爾、夏夢還是古斯塔夫',
            '感情や生き方に関する6つの質問——あなたにぴったりの Spiritfarer の魂を見つけよう',
            '감정과 삶의 방식에 관한 6가지 질문 — 나에게 맞는 Spiritfarer 영혼을 찾아보세요',
            '6 Fragen darüber, wie du fühlst und durchs Leben gehst — finde deinen Spiritfarer-Geist',
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
        {getLoc('找到我的灵魂', 'Find My Spirit', '找到我的靈魂', '私の魂を見つける', '내 영혼 찾기', 'Meinen Geist finden')}
      </button>
    </div>
  )
}
