'use client'

import { useState } from 'react'
import { BASE_URL } from '@/lib/config'

type Pick = 'powerwash-simulator' | 'outer-wilds' | 'tunic' | 'obra-dinn'

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
  const isZh = locale === 'zh' || locale === 'zh-TW'
  const getLoc = (zh: string, en: string, zhTW?: string, ja?: string, ko?: string, de?: string): string => {
    if (locale === 'zh') return zh
    if (locale === 'zh-TW') return zhTW ?? zh
    if (locale === 'ja') return ja ?? en
    if (locale === 'ko') return ko ?? en
    if (locale === 'de') return de ?? en
    return en
  }
  return (
    <div className="flex flex-1 gap-3">
      <button
        onClick={handleCopy}
        className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-[#2d3d2d] bg-[#1a2e1a]/50 px-4 py-3 text-sm text-[#e8dcc8] transition-colors hover:border-[#f0a832]/40 hover:text-[#f0a832]"
      >
        {copied
          ? getLoc('✓ 已复制！', '✓ Copied!', '✓ 已複製！', '✓ コピーしました！', '✓ 복사되었습니다!', '✓ Kopiert!')
          : getLoc('📋 复制结果', '📋 Copy result', '📋 複製結果', '📋 結果をコピー', '📋 결과 복사', '📋 Ergebnis kopieren')}
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
    q_en: 'What do you want your brain to do while you play?',
    q_zh: '你希望玩游戏时大脑在做什么？',
    q_zhTW: '你希望玩遊戲時大腦在做什麼？',
    q_ja: 'プレイ中、頭をどんな状態にしたいですか？',
    q_ko: '게임하는 동안 뇌가 무엇을 하길 원하나요?',
    q_de: 'Was soll dein Kopf beim Spielen machen?',
    options: [
      {
        en: 'Absolutely nothing — I want a game that requires zero thinking, zero decisions, pure mindless satisfaction',
        zh: '什么都不做——我想要一款需要零思考、零决策、纯粹无脑满足感的游戏',
        zhTW: '什麼都不做——我想要一款需要零思考、零決策、純粹無腦滿足感的遊戲',
        ja: '何もしない——考えもせず、決断もせず、ただ無心で気持ちよくなれるゲームがいい',
        ko: '아무것도 안 하기 — 생각도 결정도 필요 없이 순수하게 뇌를 비울 수 있는 게임',
        de: 'Absolut nichts — ich will ein Spiel, das null Nachdenken, null Entscheidungen erfordert, pure gedankenlose Befriedigung',
        type: 'powerwash-simulator',
      },
      {
        en: 'Quietly wonder — notice things, form questions, let curiosity guide me through a world with no map',
        zh: '静静地好奇——注意事物、形成问题、让好奇心在没有地图的世界里引导我',
        zhTW: '靜靜地好奇——注意事物、形成問題、讓好奇心在沒有地圖的世界裡引導我',
        ja: 'ひっそりと不思議に思う——気づき、疑問を持ち、地図のない世界を好奇心だけで探索したい',
        ko: '조용히 궁금해하기 — 사물을 알아채고 질문을 만들며 지도 없는 세계를 호기심으로 헤쳐나가기',
        de: 'Leise staunen — Dinge bemerken, Fragen stellen, mich von Neugier durch eine Welt ohne Karte führen lassen',
        type: 'outer-wilds',
      },
      {
        en: 'Slowly piece together — gather fragments and symbols, let understanding build over hours without explanation',
        zh: '慢慢拼凑——收集碎片和符号，让理解在没有解释的情况下在数小时内积累',
        zhTW: '慢慢拼湊——收集碎片和符號，讓理解在沒有解釋的情況下在數小時內累積',
        ja: 'ゆっくりと組み立てる——断片や記号を集め、説明なしに何時間もかけて理解を積み重ねたい',
        ko: '천천히 맞춰가기 — 조각과 기호를 모아 설명 없이 수십 시간에 걸쳐 이해를 쌓아가기',
        de: 'Langsam zusammensetzen — Fragmente und Symbole sammeln, Verständnis über Stunden ohne Erklärung aufbauen lassen',
        type: 'tunic',
      },
      {
        en: 'Deduce systematically — observe, record, eliminate possibilities, build toward a definitive answer',
        zh: '系统性推理——观察、记录、排除可能性、向确定答案努力',
        zhTW: '系統性推理——觀察、記錄、排除可能性、向確定答案努力',
        ja: '論理的に推理する——観察し、記録し、可能性を消去して確実な答えへと近づいていきたい',
        ko: '체계적으로 추론하기 — 관찰하고 기록하며 가능성을 제거해 결정적인 답을 향해 나아가기',
        de: 'Systematisch deduzieren — beobachten, aufzeichnen, Möglichkeiten ausschließen, auf eine definitive Antwort hinarbeiten',
        type: 'obra-dinn',
      },
    ],
  },
  {
    q_en: 'How do you feel about games that give you no instructions or tutorials?',
    q_zh: '你如何看待没有说明或教程的游戏？',
    q_zhTW: '你如何看待沒有說明或教學的遊戲？',
    q_ja: '説明書もチュートリアルもないゲームについてどう思いますか？',
    q_ko: '설명서나 튜토리얼이 없는 게임에 대해 어떻게 생각하나요?',
    q_de: 'Wie stehst du zu Spielen ohne Anleitung oder Tutorial?',
    options: [
      {
        en: 'Fine for this game — what you do is obvious, instructions would only get in the way',
        zh: '对这款游戏没问题——要做什么很明显，说明只会碍事',
        zhTW: '對這款遊戲沒問題——要做什麼很明顯，說明只會礙事',
        ja: 'このゲームなら問題なし——やることは明らかで、説明書はむしろ邪魔になるだけ',
        ko: '이 게임은 괜찮아요 — 할 일이 명확해서 설명서가 오히려 방해가 될 것',
        de: 'Für dieses Spiel okay — was zu tun ist, liegt auf der Hand, Anleitungen würden nur stören',
        type: 'powerwash-simulator',
      },
      {
        en: 'Excited — I want to discover everything through exploration with no hand-holding',
        zh: '兴奋——我想在没有引导的情况下通过探索发现一切',
        zhTW: '興奮——我想在沒有引導的情況下透過探索發現一切',
        ja: 'ワクワクする——手取り足取り教えてもらわず、探索だけで全部発見したい',
        ko: '설레요 — 아무 안내 없이 탐험만으로 모든 것을 발견하고 싶어요',
        de: 'Aufgeregt — ich will alles durch Erkundung entdecken, ohne an die Hand genommen zu werden',
        type: 'outer-wilds',
      },
      {
        en: 'Fine — I like finding my own hints in the world and figuring out what they mean',
        zh: '没问题——我喜欢在世界中找到自己的线索并弄清楚它们的含义',
        zhTW: '沒問題——我喜歡在世界中找到自己的線索並弄清楚它們的含義',
        ja: '問題なし——世界の中でヒントを自力で見つけて、その意味を読み解くのが好き',
        ko: '괜찮아요 — 세계 속에서 직접 단서를 찾고 그 의미를 파악하는 걸 좋아해요',
        de: 'Okay — ich mag es, meine eigenen Hinweise in der Welt zu finden und herauszufinden, was sie bedeuten',
        type: 'tunic',
      },
      {
        en: 'Preferred — the game IS the tutorial; figuring out the system is the puzzle',
        zh: '偏好——游戏本身就是教程；弄清楚系统才是谜题',
        zhTW: '偏好——遊戲本身就是教學；弄清楚系統才是謎題',
        ja: 'むしろ好き——ゲーム自体がチュートリアル。システムを解読することがパズルなんだ',
        ko: '선호해요 — 게임 자체가 튜토리얼이에요. 시스템을 파악하는 것이 곧 퍼즐이니까요',
        de: 'Bevorzugt — das Spiel IST das Tutorial; das System zu durchschauen ist das Rätsel',
        type: 'obra-dinn',
      },
    ],
  },
  {
    q_en: 'What kind of ending do you want from a game?',
    q_zh: '你希望从游戏中得到什么样的结局？',
    q_zhTW: '你希望從遊戲中得到什麼樣的結局？',
    q_ja: 'ゲームのエンディングに何を求めますか？',
    q_ko: '게임에서 어떤 결말을 원하나요?',
    q_de: 'Was für ein Ende willst du von einem Spiel?',
    options: [
      {
        en: 'Completion — everything clean, organized, the job done, that satisfying "before and after" comparison',
        zh: '完成——一切干净、整洁、工作完成，令人满足的"前后"对比',
        zhTW: '完成——一切乾淨、整潔、工作完成，令人滿足的「前後」對比',
        ja: 'クリア感——すべてがきれいに片付いて、仕事が終わった、あの満足の「ビフォーアフター」',
        ko: '완료감 — 모든 게 깔끔하게 정리되고 일이 다 끝난, 그 만족스러운 "전후" 비교',
        de: 'Abschluss — alles sauber, ordentlich, die Arbeit erledigt, dieser befriedigende "Vorher-Nachher"-Vergleich',
        type: 'powerwash-simulator',
      },
      {
        en: 'A revelation that changes how I see everything that came before — I want the ending to reframe the whole game',
        zh: '一个改变我看待之前一切事物的启示——我希望结局重新定义整个游戏',
        zhTW: '一個改變我看待之前一切事物的啟示——我希望結局重新定義整個遊戲',
        ja: 'これまでの全てが変わる啓示——エンディングがゲーム全体の意味を塗り替えてほしい',
        ko: '모든 것을 다시 보게 만드는 계시 — 엔딩이 게임 전체를 새롭게 재정의해주길 원해요',
        de: 'Eine Offenbarung, die alles vorher Gesehene neu bewertet — ich will, dass das Ende das ganze Spiel neu rahmt',
        type: 'outer-wilds',
      },
      {
        en: 'Understanding — I want to feel I finally saw what the world was trying to show me from the beginning',
        zh: '理解——我希望感觉我终于看到了世界从一开始就试图向我展示的东西',
        zhTW: '理解——我希望感覺我終於看到了世界從一開始就試圖向我展示的東西',
        ja: '理解——世界が最初からずっと見せようとしていたものが、ついにわかった、という感覚がほしい',
        ko: '이해 — 세계가 처음부터 보여주려 했던 것을 마침내 알게 된 느낌을 원해요',
        de: 'Verstehen — ich will das Gefühl, endlich zu sehen, was die Welt mir von Anfang an zeigen wollte',
        type: 'tunic',
      },
      {
        en: 'Correctness — I want all the blanks filled in, every face identified, every cause of death confirmed',
        zh: '正确性——我希望所有空白都被填满、每张面孔都被识别、每个死因都被确认',
        zhTW: '正確性——我希望所有空白都被填滿、每張面孔都被識別、每個死因都被確認',
        ja: '正解——全ての空欄が埋まり、全ての顔が特定され、全ての死因が確定される、それがほしい',
        ko: '정확성 — 모든 빈칸이 채워지고 모든 얼굴이 특정되며 모든 사인이 확인되길 원해요',
        de: 'Richtigkeit — ich will alle Lücken gefüllt, jedes Gesicht identifiziert, jede Todesursache bestätigt',
        type: 'obra-dinn',
      },
    ],
  },
  {
    q_en: 'Which setting sounds most interesting?',
    q_zh: '哪种设定听起来最有趣？',
    q_zhTW: '哪種設定聽起來最有趣？',
    q_ja: 'どの舞台設定が一番気になりますか？',
    q_ko: '어떤 배경이 가장 흥미롭게 들리나요?',
    q_de: 'Welches Setting klingt am interessantesten?',
    options: [
      {
        en: 'Anywhere that is dirty and needs cleaning — a celebrity mansion, a fantasy treehouse, a garden gnome village',
        zh: '任何脏乱需要清洁的地方——名人豪宅、奇幻树屋、花园地精村庄',
        zhTW: '任何髒亂需要清潔的地方——名人豪宅、奇幻樹屋、花園地精村莊',
        ja: '汚れていれば何でも——有名人の豪邸、ファンタジーのツリーハウス、庭の小人村',
        ko: '더럽고 청소가 필요한 곳이면 어디든 — 셀럽 저택, 판타지 나무집, 정원 난쟁이 마을',
        de: 'Überall wo es schmutzig ist und gereinigt werden muss — eine Promi-Villa, ein Fantasy-Baumhaus, ein Gartenzwerg-Dorf',
        type: 'powerwash-simulator',
      },
      {
        en: 'A dying solar system full of alien ruins, strange physics anomalies, and a mystery millions of years old',
        zh: '一个充满外星废墟、奇异物理异常和百万年古老谜题的垂死太阳系',
        zhTW: '一個充滿外星廢墟、奇異物理異常和百萬年古老謎題的垂死太陽系',
        ja: '異星の廃墟、奇妙な物理現象、そして何百万年も前の謎が眠る、滅びゆく太陽系',
        ko: '외계 폐허와 기묘한 물리 현상, 수백만 년 된 미스터리로 가득한 소멸 직전의 태양계',
        de: 'Ein sterbendes Sonnensystem voller Alienruinen, seltsamer Physik-Anomalien und einem Millionen Jahre alten Geheimnis',
        type: 'outer-wilds',
      },
      {
        en: 'An isometric world of ruins and mystery where a small fox tries to understand a forgotten civilization',
        zh: '一个等距视角的废墟和谜题世界，一只小狐狸试图理解一个被遗忘的文明',
        zhTW: '一個等距視角的廢墟和謎題世界，一隻小狐狸試圖理解一個被遺忘的文明',
        ja: '忘れられた文明を理解しようとする小さなキツネが主人公の、廃墟と謎のアイソメトリックワールド',
        ko: '잊힌 문명을 이해하려는 작은 여우가 주인공인 아이소메트릭 폐허와 수수께끼의 세계',
        de: 'Eine isometrische Welt aus Ruinen und Mysterien, in der ein kleiner Fuchs versucht, eine vergessene Zivilisation zu verstehen',
        type: 'tunic',
      },
      {
        en: 'An 1800s sailing ship wrecked with sixty crew aboard, and only your memory and a ledger to reconstruct what happened',
        zh: '一艘 19 世纪帆船失事，60 名船员遇难，只有你的记忆和账本来重建发生了什么',
        zhTW: '一艘 19 世紀帆船失事，60 名船員遇難，只有你的記憶和帳本來重建發生了什麼',
        ja: '60人の乗組員を乗せて難破した19世紀の帆船。記憶と帳簿だけで何が起きたかを再構築する',
        ko: '60명의 선원을 태우고 난파된 19세기 범선. 기억과 장부만으로 무슨 일이 있었는지 재구성하기',
        de: 'Ein Segelschiff aus dem 19. Jahrhundert, das mit sechzig Besatzungsmitgliedern gesunken ist — nur dein Gedächtnis und ein Kontobuch zum Rekonstruieren',
        type: 'obra-dinn',
      },
    ],
  },
  {
    q_en: 'How much challenge or frustration are you comfortable with?',
    q_zh: '你对多少挑战或挫折感到舒适？',
    q_zhTW: '你對多少挑戰或挫折感到舒適？',
    q_ja: 'どのくらいの難しさや挫折なら許容できますか？',
    q_ko: '얼마나 많은 도전이나 좌절을 감당할 수 있나요?',
    q_de: 'Wie viel Herausforderung oder Frustration verträgst du?',
    options: [
      {
        en: 'Zero — I specifically want no challenge, no way to fail, just the act of doing something with my hands',
        zh: '零——我特别想要没有挑战、没有失败的方式，只是用手做某事的行为',
        zhTW: '零——我特別想要沒有挑戰、沒有失敗的方式，只是用手做某事的行為',
        ja: 'ゼロ——挑戦も失敗もいらない。ただ手を動かすことだけがしたい',
        ko: '전혀 없어야 해요 — 도전도 실패도 없이 그냥 손으로 무언가를 하는 행위만을 원해요',
        de: 'Null — ich will ausdrücklich keine Herausforderung, keine Möglichkeit zu scheitern, nur die Handlung selbst',
        type: 'powerwash-simulator',
      },
      {
        en: 'Moderate — I am okay with searching, going in circles, and sudden death as long as I keep learning',
        zh: '适中——我可以接受搜索、兜圈子和猝死，只要我不断学习',
        zhTW: '適中——我可以接受搜索、兜圈子和猝死，只要我不斷學習',
        ja: '普通——学び続けられるなら、迷子になったり、堂々巡りしたり、突然死んでも大丈夫',
        ko: '적당히 — 계속 배울 수 있다면 헤매거나 같은 곳을 빙빙 돌거나 갑작스러운 죽음도 괜찮아요',
        de: 'Moderat — Suchen, Im-Kreis-Laufen und plötzlicher Tod sind okay, solange ich lernend vorankomme',
        type: 'outer-wilds',
      },
      {
        en: 'Moderate — I enjoy difficult bosses and cryptic puzzles when I know fair solutions exist',
        zh: '适中——当我知道公平解决方案存在时，我喜欢困难的 Boss 和神秘谜题',
        zhTW: '適中——當我知道公平解決方案存在時，我喜歡困難的 Boss 和神秘謎題',
        ja: '普通——フェアな解答があるとわかっていれば、難しいボスや難解なパズルも楽しめる',
        ko: '적당히 — 공정한 해결책이 있다는 걸 알면 어려운 보스와 수수께끼 같은 퍼즐도 즐길 수 있어요',
        de: 'Moderat — schwere Bosse und kryptische Rätsel machen mir Spaß, wenn ich weiß, dass faire Lösungen existieren',
        type: 'tunic',
      },
      {
        en: 'High — I do not mind being stuck for hours if the eventual solution is genuinely clever',
        zh: '高——如果最终解决方案真正聪明，我不介意卡关数小时',
        zhTW: '高——如果最終解決方案真正聰明，我不介意卡關數小時',
        ja: '高め——最終的な解答が本当に巧妙なら、何時間詰まっても構わない',
        ko: '높아요 — 결국 해답이 진짜 영리하다면 몇 시간이고 막혀도 괜찮아요',
        de: 'Hoch — ich störe mich nicht daran, stundenlang festzusitzen, wenn die Lösung wirklich clever ist',
        type: 'obra-dinn',
      },
    ],
  },
  {
    q_en: 'Which of these feelings most describes why you play games?',
    q_zh: '以下哪种感受最能描述你玩游戏的原因？',
    q_zhTW: '以下哪種感受最能描述你玩遊戲的原因？',
    q_ja: 'ゲームをプレイする理由を最もよく表すのはどの感覚ですか？',
    q_ko: '게임을 하는 이유를 가장 잘 설명하는 감정은 무엇인가요?',
    q_de: 'Welches dieser Gefühle beschreibt am besten, warum du Spiele spielst?',
    options: [
      {
        en: 'The satisfaction of making order from chaos — I love seeing progress in a before-and-after way',
        zh: '从混乱中创造秩序的满足感——我喜欢以前后对比的方式看到进展',
        zhTW: '從混亂中創造秩序的滿足感——我喜歡以前後對比的方式看到進展',
        ja: 'カオスから秩序を生み出す達成感——ビフォーアフターで進捗が見えるのが好き',
        ko: '혼란에서 질서를 만드는 만족감 — 전후 비교로 진행 상황을 확인하는 게 좋아요',
        de: 'Die Befriedigung, Ordnung aus dem Chaos zu machen — ich liebe es, Fortschritt im Vorher-Nachher-Vergleich zu sehen',
        type: 'powerwash-simulator',
      },
      {
        en: 'The feeling of being small in a big universe — discovery, wonder, and understanding something vast',
        zh: '在大宇宙中渺小的感觉——发现、惊奇和理解某种广阔的东西',
        zhTW: '在大宇宙中渺小的感覺——發現、驚奇和理解某種廣闊的東西',
        ja: '広大な宇宙の中での小ささ——発見と驚き、そして大きな何かを理解する感覚',
        ko: '넓은 우주 속의 작은 나 — 발견하고 경이로워하며 거대한 무언가를 이해하는 느낌',
        de: 'Das Gefühl, klein in einem großen Universum zu sein — Entdeckung, Staunen und etwas Riesiges zu verstehen',
        type: 'outer-wilds',
      },
      {
        en: 'The warmth of understanding — gradually figuring out a world that at first seemed completely opaque',
        zh: '理解的温暖——逐渐弄清楚一个起初看似完全不透明的世界',
        zhTW: '理解的溫暖——逐漸弄清楚一個起初看似完全不透明的世界',
        ja: '理解の温もり——最初は全く不透明に見えた世界を少しずつ解き明かしていく感覚',
        ko: '이해의 따뜻함 — 처음에는 완전히 불투명해 보였던 세계를 조금씩 알아가는 것',
        de: 'Die Wärme des Verstehens — nach und nach eine Welt begreifen, die zunächst völlig undurchsichtig schien',
        type: 'tunic',
      },
      {
        en: 'The pride of deduction — earning the solution through careful logic, not luck or hint systems',
        zh: '推理的自豪感——通过仔细的逻辑而非运气或提示系统赢得解决方案',
        zhTW: '推理的自豪感——透過仔細的邏輯而非運氣或提示系統贏得解決方案',
        ja: '推理の誇り——運やヒントに頼らず、丁寧な論理で答えを勝ち取る感覚',
        ko: '추론의 자부심 — 운이나 힌트 시스템이 아닌 꼼꼼한 논리로 답을 얻어내는 것',
        de: 'Der Stolz der Deduktion — die Lösung durch sorgfältige Logik verdienen, nicht durch Glück oder Hinweissysteme',
        type: 'obra-dinn',
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
  'powerwash-simulator': {
    title_en: 'PowerWash Simulator',
    title_zh: '高压清洗模拟器',
    title_zhTW: '高壓清洗模擬器',
    title_ja: 'PowerWash Simulator',
    title_ko: '파워워시 시뮬레이터',
    title_de: 'PowerWash Simulator',
    emoji: '🚿',
    tag_en: 'Clean everything with a pressure washer — no fail states, no time limits, pure satisfying before-and-after progress',
    tag_zh: '用高压清洗机清洗一切——没有失败状态、没有时间限制、纯粹令人满足的前后进展',
    tag_zhTW: '用高壓清洗機清洗一切——沒有失敗狀態、沒有時間限制、純粹令人滿足的前後進展',
    tag_ja: '高圧洗浄機で何でも洗う——失敗なし、制限時間なし、ビフォーアフターの純粋な達成感',
    tag_ko: '고압 세척기로 모든 것을 청소 — 실패 없음, 시간 제한 없음, 순수한 전후 비교의 만족감',
    tag_de: 'Mit dem Hochdruckreiniger alles sauber machen — kein Scheitern, keine Zeitlimits, pure Befriedigung im Vorher-Nachher',
    platform_en: 'Available on: PC (Steam), Nintendo Switch, PlayStation 4/5, Xbox (Game Pass) — about $25',
    platform_zh: '可在以下平台获取：PC（Steam）、Nintendo Switch、PlayStation 4/5、Xbox（Game Pass）——约 25 美元',
    platform_zhTW: '可在以下平台取得：PC（Steam）、Nintendo Switch、PlayStation 4/5、Xbox（Game Pass）——約 25 美元',
    platform_ja: '対応プラットフォーム：PC（Steam）、Nintendo Switch、PlayStation 4/5、Xbox（Game Pass）——約2,500円',
    platform_ko: '이용 가능 플랫폼: PC(Steam), 닌텐도 스위치, 플레이스테이션 4/5, Xbox(Game Pass) — 약 25달러',
    platform_de: 'Erhältlich auf: PC (Steam), Nintendo Switch, PlayStation 4/5, Xbox (Game Pass) — ca. 25 €',
    why_en:
      "PowerWash Simulator (2022) is not a joke — it is one of the most genuinely relaxing games ever made and one of the most beloved stress-relief games among cozy game players. You are given a pressure washer and a job: clean a dirty object or environment. The satisfaction is entirely in the completion: watching a filthy garden shed become spotless, seeing a grimy playground returned to bright colors, cleaning a fantasy treehouse or a celebrity's mansion or a gnome village as part of the main campaign. There are no enemies, no fail states, no time pressure of any kind. The dirt yields to water in a tactile, satisfying way that feels almost meditative. Played at full volume with good speakers, the hiss and spray becomes genuinely calming. With a free DLC expansion that includes cleaning an alien landscape from a well-known space game, and additional themed content packs, there is a surprising amount of variety. Available on Xbox Game Pass. Won multiple awards for Most Relaxing Game in 2022-2023. Has a multiplayer mode for cleaning together.",
    why_zh:
      '高压清洗模拟器（2022 年）不是开玩笑——它是有史以来最真正令人放松的游戏之一，也是 cozy 游戏玩家中最受喜爱的减压游戏之一。你被给予一个高压清洗机和一项工作：清洁脏乱的物品或环境。满足感完全在于完成：看着一个肮脏的花园棚变得一尘不染，看着一个污秽的游乐场恢复明亮的颜色，在主要活动中清洁奇幻树屋、名人豪宅或地精村庄。没有敌人、没有失败状态、没有任何形式的时间压力。污垢以触觉上令人满足的方式屈服于水，几乎感觉像冥想。在好音箱全音量播放时，嘶嘶声和喷水声变得真正令人平静。有一个免费 DLC 扩展，包括清洁一个知名太空游戏中的外星景观，以及额外的主题内容包，有令人惊讶的多样性。可在 Xbox Game Pass 上获取。2022-2023 年赢得多个最放松游戏奖项。有多人游戏模式可以一起清洁。',
    why_zhTW:
      '高壓清洗模擬器（2022 年）不是開玩笑——它是有史以來最真正令人放鬆的遊戲之一，也是 cozy 遊戲玩家中最受喜愛的減壓遊戲之一。你被給予一個高壓清洗機和一項工作：清潔髒亂的物品或環境。滿足感完全在於完成：看著一個骯髒的花園棚變得一塵不染，看著一個污穢的遊樂場恢復明亮的顏色，在主要劇情中清潔奇幻樹屋、名人豪宅或地精村莊。沒有敵人、沒有失敗狀態、沒有任何形式的時間壓力。污垢以觸感上令人滿足的方式屈服於水，幾乎感覺像冥想。搭配好音響全音量播放時，嘶嘶聲和噴水聲變得真正令人平靜。有一個免費 DLC 擴充，包含清潔知名太空遊戲中的外星景觀，以及額外的主題內容包，多樣性令人驚喜。可在 Xbox Game Pass 上取得。2022-2023 年贏得多個最放鬆遊戲獎項。有多人遊戲模式可以一起清潔。',
    why_ja:
      'PowerWash Simulator（2022年）はジョークじゃない——今まで作られたゲームの中で最も本当に癒しになる作品の一つで、cozyゲームプレイヤーの間で最も愛されるストレス解消ゲームでもある。高圧洗浄機を渡され、汚れた場所を洗うだけ。達成感は完成にある。汚れた物置が真っ白になる瞬間、泥だらけの遊具が鮮やかな色を取り戻す瞬間、ファンタジーのツリーハウスや有名人の豪邸、小人の村をメインキャンペーンで洗い流す瞬間。敵もなく、失敗もなく、時間制限もない。汚れが水に屈する感触は瞑想的なほど気持ちよく、良いスピーカーで全音量で遊べば、水の音が本当に落ち着かせてくれる。有名な宇宙ゲームの惑星を洗う無料DLCや追加テーマパックもあり、ボリュームも意外と豊富。Xbox Game Passでも遊べる。2022〜2023年に最もリラックスできるゲーム賞を複数受賞。一緒に掃除できるマルチプレイモードあり。',
    why_ko:
      '파워워시 시뮬레이터(2022)는 농담이 아니에요 — 지금까지 만들어진 게임 중 진정으로 가장 편안한 게임 중 하나이며, cozy 게임 플레이어들 사이에서 가장 사랑받는 스트레스 해소 게임이기도 합니다. 고압 세척기를 들고 더러운 곳을 청소하는 게 전부예요. 만족감은 완료에 있습니다. 더러운 정원 창고가 티 없이 깨끗해지는 것, 지저분한 놀이터가 밝은 색을 되찾는 것, 메인 캠페인에서 판타지 나무집이나 셀럽 저택, 난쟁이 마을을 청소하는 것. 적도 없고, 실패도 없고, 어떠한 시간 압박도 없습니다. 오염이 물에 굴복하는 촉각적 만족감은 거의 명상적입니다. 좋은 스피커로 최대 볼륨으로 플레이하면 물소리가 진정으로 마음을 안정시켜줍니다. 유명 우주 게임의 외계 풍경을 청소하는 무료 DLC와 추가 테마 팩까지 있어 놀라울 정도로 다양합니다. Xbox Game Pass에서도 이용 가능. 2022-2023년에 최고 힐링 게임 부문에서 여러 상을 수상했습니다. 함께 청소할 수 있는 멀티플레이 모드도 있어요.',
    why_de:
      'PowerWash Simulator (2022) ist kein Witz — es ist eines der entspannendsten Spiele, die je gemacht wurden, und eines der beliebtesten Stressabbau-Spiele unter Cozy-Game-Fans. Du bekommst einen Hochdruckreiniger und einen Auftrag: reinige einen schmutzigen Gegenstand oder eine Umgebung. Die Befriedigung liegt vollständig im Abschluss: ein dreckiger Geräteschuppen wird makellos, ein verdreckter Spielplatz erstrahlt wieder in Farben, du reinigst ein Fantasy-Baumhaus, die Villa eines Prominenten oder ein Gartenzwerg-Dorf im Hauptspiel. Keine Gegner, kein Scheitern, keinerlei Zeitdruck. Der Schmutz gibt dem Wasser auf taktil befriedigende Weise nach, fast meditativ. Mit guten Lautsprechern auf voller Lautstärke ist das Zischen und Spritzen wirklich beruhigend. Mit einem kostenlosen DLC zum Reinigen einer Alien-Landschaft aus einem bekannten Weltraum-Spiel und zusätzlichen Themen-Packs gibt es überraschend viel Abwechslung. Auf Xbox Game Pass verfügbar. Gewann 2022–2023 mehrere Auszeichnungen als entspannenstes Spiel. Hat einen Multiplayer-Modus zum gemeinsamen Reinigen.',
    tip_en: "Change your nozzle early — the wider fan nozzle covers large flat surfaces much faster, while the narrow jet is best for stubborn grime in corners. Most players default to one nozzle for too long and then realize switching is the key to efficient cleaning.",
    tip_zh: '早点更换喷嘴——更宽的扇形喷嘴覆盖大平面快得多，而窄喷射最适合角落里顽固的污垢。大多数玩家使用一个喷嘴太久，然后意识到切换是高效清洁的关键。',
    tip_zhTW: '早點更換噴嘴——更寬的扇形噴嘴覆蓋大平面快得多，而窄噴射最適合角落裡頑固的污垢。大多數玩家使用一個噴嘴太久，然後才意識到切換才是高效清潔的關鍵。',
    tip_ja: '早めにノズルを切り替えよう——広いファンノズルは広い平面を素早くカバーでき、細いジェットノズルは隅の頑固な汚れに最適。ほとんどのプレイヤーは一つのノズルを使いすぎて、あとから切り替えが効率化の鍵だと気づく。',
    tip_ko: '일찍 노즐을 바꾸세요 — 넓은 부채꼴 노즐은 넓은 평면을 훨씬 빠르게 커버하고, 좁은 제트 노즐은 구석의 완고한 오염에 최적입니다. 대부분의 플레이어가 노즐 하나를 너무 오래 쓰다가 전환이 효율적인 청소의 핵심임을 깨닫습니다.',
    tip_de: 'Wechsle früh die Düse — die breitere Fächerdüse deckt große flache Flächen viel schneller ab, während der schmale Strahl am besten für hartnäckigen Schmutz in Ecken geeignet ist. Die meisten Spieler benutzen eine Düse zu lange und merken dann, dass Wechseln der Schlüssel zum effizienten Reinigen ist.',
  },
  'outer-wilds': {
    title_en: 'Outer Wilds',
    title_zh: '星外拓荒',
    title_zhTW: '星際拓荒',
    title_ja: 'アウター・ワイルズ',
    title_ko: '아우터 와일즈',
    title_de: 'Outer Wilds',
    emoji: '🪐',
    tag_en: 'A mystery set in a handcrafted solar system — explore, discover, and unravel why everything ends every 22 minutes',
    tag_zh: '一个设置在手工制作太阳系中的谜题——探索、发现，并解开为什么一切每 22 分钟结束的原因',
    tag_zhTW: '一個設置在手工製作太陽系中的謎題——探索、發現，並解開為什麼一切每 22 分鐘結束的原因',
    tag_ja: '手作りの太陽系を舞台にした謎——探索し、発見し、なぜ22分ごとに全てが終わるのかを解き明かそう',
    tag_ko: '손으로 만든 태양계를 배경으로 한 미스터리 — 탐험하고, 발견하고, 22분마다 모든 것이 끝나는 이유를 밝혀내세요',
    tag_de: 'Ein Mysterium in einem handgefertigten Sonnensystem — erkunde, entdecke und enthülle, warum alle 22 Minuten alles endet',
    platform_en: 'Available on: PC (Steam, Epic), Nintendo Switch, PlayStation 4/5, Xbox (Game Pass) — about $25',
    platform_zh: '可在以下平台获取：PC（Steam、Epic）、Nintendo Switch、PlayStation 4/5、Xbox（Game Pass）——约 25 美元',
    platform_zhTW: '可在以下平台取得：PC（Steam、Epic）、Nintendo Switch、PlayStation 4/5、Xbox（Game Pass）——約 25 美元',
    platform_ja: '対応プラットフォーム：PC（Steam、Epic）、Nintendo Switch、PlayStation 4/5、Xbox（Game Pass）——約2,500円',
    platform_ko: '이용 가능 플랫폼: PC(Steam, Epic), 닌텐도 스위치, 플레이스테이션 4/5, Xbox(Game Pass) — 약 25달러',
    platform_de: 'Erhältlich auf: PC (Steam, Epic), Nintendo Switch, PlayStation 4/5, Xbox (Game Pass) — ca. 25 €',
    why_en:
      "Outer Wilds (2019) is one of the most acclaimed games ever made — it regularly appears at the top of 'best games of all time' lists and is widely considered one of the few games that is genuinely irreplaceable. You play as a young alien explorer in a small solar system where every planet has secrets, physics simulations running in real time (sand falls from one planet's surface into the core of another), and a central mystery tying everything together. The twist: every 22 minutes, the solar system ends and you wake up at the start of the loop with only your knowledge retained. You are not trying to prevent the loop — you are trying to understand it. The game does not have a map or a quest log. Everything you need to know is written on wooden boards scattered across alien ruins. It is entirely discovery-driven: no combat required, no reflex-based challenge, just pure exploration and curiosity. Available on Xbox Game Pass. WARNING: Outer Wilds is specifically a game that must be experienced without spoilers. The discoveries are its content; knowing what you will find removes the experience entirely.",
    why_zh:
      '星外拓荒（2019 年）是有史以来最受好评的游戏之一——它定期出现在"有史以来最佳游戏"榜单的顶部，被广泛认为是少数真正不可替代的游戏之一。你扮演一个小太阳系中的年轻外星探险家，每个星球都有秘密、实时运行的物理模拟（沙子从一个星球的表面落入另一个星球的核心），以及将一切联系在一起的核心谜题。转折点：每 22 分钟，太阳系结束，你醒来时循环重新开始，只保留你的知识。你不是在试图阻止循环——你是在试图理解它。游戏没有地图或任务日志。你需要知道的一切都写在散布在外星废墟中的木板上。它完全由发现驱动：不需要战斗，没有基于反应的挑战，只有纯粹的探索和好奇心。可在 Xbox Game Pass 上获取。警告：星外拓荒是一款必须在没有剧透的情况下体验的游戏。发现就是它的内容；知道你将发现什么会完全消除体验。',
    why_zhTW:
      '星際拓荒（2019 年）是有史以來最受好評的遊戲之一——它定期出現在「有史以來最佳遊戲」榜單的頂部，被廣泛認為是少數真正不可替代的遊戲之一。你扮演一個小太陽系中的年輕外星探險家，每個星球都有秘密、實時運行的物理模擬（沙子從一個星球的表面落入另一個星球的核心），以及將一切聯繫在一起的核心謎題。轉折點：每 22 分鐘，太陽系結束，你醒來時循環重新開始，只保留你的知識。你不是在試圖阻止循環——你是在試圖理解它。遊戲沒有地圖或任務日誌。你需要知道的一切都寫在散布在外星廢墟中的木板上。它完全由發現驅動：不需要戰鬥，沒有基於反應的挑戰，只有純粹的探索和好奇心。可在 Xbox Game Pass 上取得。警告：星際拓荒是一款必須在沒有劇透的情況下體驗的遊戲。發現就是它的內容；知道你將發現什麼會完全消除體驗。',
    why_ja:
      'アウター・ワイルズ（2019年）は史上最も絶賛されたゲームの一つ——「史上最高のゲーム」リストに常にランクインし、本当に唯一無二なゲームの一つとして広く認められている。小さな太陽系に生きる若い宇宙人の探索家として、秘密を持つ惑星、リアルタイムの物理シミュレーション（ある惑星の砂が別の惑星の核に落ちていく）、そして全てをつなぐ中心的な謎を探っていく。仕掛け：22分ごとに太陽系が終わり、自分の知識だけを持ってループの最初に戻る。ループを止めるのが目的じゃない——理解することが目的だ。マップもクエストログもない。知るべき全てのことは、外星の廃墟に散らばった木の板に書かれている。戦闘不要、反射神経不要——純粋な探索と好奇心だけのゲーム。Xbox Game Passでも遊べる。警告：アウター・ワイルズはネタバレなしで体験しなければならないゲーム。発見こそがコンテンツ。知ってしまったら体験は消える。',
    why_ko:
      '아우터 와일즈(2019)는 역대 가장 호평받은 게임 중 하나입니다 — "역대 최고의 게임" 목록에 항상 등장하며, 진정으로 대체 불가능한 몇 안 되는 게임 중 하나로 널리 인정받고 있습니다. 작은 태양계에서 젊은 외계인 탐험가로 플레이하며, 비밀을 품은 행성들, 실시간 물리 시뮬레이션(한 행성의 표면에서 모래가 다른 행성의 핵으로 떨어지는), 그리고 모든 것을 연결하는 중심 미스터리를 탐험합니다. 반전: 22분마다 태양계가 끝나고 자신의 지식만 가진 채 루프의 시작으로 돌아갑니다. 루프를 막으려는 게 아니라 — 이해하려는 것입니다. 지도도 퀘스트 로그도 없습니다. 알아야 할 모든 것은 외계 폐허에 흩어진 나무 판자에 적혀 있습니다. 완전히 발견 중심: 전투도 반사 신경 도전도 없이 순수한 탐험과 호기심만. Xbox Game Pass에서도 이용 가능. 경고: 아우터 와일즈는 스포일러 없이 경험해야 하는 게임입니다. 발견이 곧 콘텐츠이며, 무엇을 발견할지 알면 체험 자체가 사라집니다.',
    why_de:
      'Outer Wilds (2019) ist eines der gefeiertsten Spiele aller Zeiten — es taucht regelmäßig an der Spitze von "Beste Spiele aller Zeiten"-Listen auf und gilt weithin als eines der wenigen wirklich unersetzlichen Spiele. Du spielst einen jungen außerirdischen Forscher in einem kleinen Sonnensystem, wo jeder Planet Geheimnisse hat, Physiksimulationen in Echtzeit laufen (Sand fällt von der Oberfläche eines Planeten in den Kern eines anderen) und ein zentrales Geheimnis alles verbindet. Der Twist: Alle 22 Minuten endet das Sonnensystem und du wachst am Anfang der Schleife auf — nur dein Wissen bleibt erhalten. Du versuchst nicht, die Schleife zu stoppen — du versuchst, sie zu verstehen. Das Spiel hat keine Karte oder ein Quest-Tagebuch. Alles, was du wissen musst, steht auf Holztafeln in Alienruinen. Rein entdeckungsgetrieben: kein Kampf, keine Reflexe — nur pure Erkundung und Neugier. Auf Xbox Game Pass verfügbar. WARNUNG: Outer Wilds muss ohne Spoiler erlebt werden. Die Entdeckungen sind der Inhalt; zu wissen, was du finden wirst, nimmt dem Erlebnis alles.',
    tip_en: "Never look up a guide, a hint, or even ask someone what to do next. If you are stuck, put the game down for a day and come back — your brain will keep working on it. The breakthrough moments in Outer Wilds are among the most satisfying in any medium. Spoilers are permanent damage.",
    tip_zh: '永远不要查攻略、提示，甚至不要问别人下一步该做什么。如果你卡住了，把游戏放下一天然后回来——你的大脑会继续思考它。星外拓荒中的突破时刻是任何媒介中最令人满足的体验之一。剧透是永久性损害。',
    tip_zhTW: '永遠不要查攻略、提示，甚至不要問別人下一步該做什麼。如果你卡住了，把遊戲放下一天然後回來——你的大腦會繼續思考它。星際拓荒中的突破時刻是任何媒介中最令人滿足的體驗之一。劇透是永久性損害。',
    tip_ja: 'ガイドを見たり、ヒントを調べたり、次に何をすればいいか人に聞いたりしないで。詰まったら一日ゲームを置いて戻ってくる——頭は無意識に考え続けてくれる。アウター・ワイルズのブレイクスルーの瞬間は、あらゆるメディアの中で最も満足のいく体験の一つ。ネタバレは永久的なダメージだ。',
    tip_ko: '공략이나 힌트를 찾거나 다음에 무엇을 해야 하는지 물어보지 마세요. 막히면 하루 게임을 내려놓고 돌아오세요 — 뇌는 계속 생각하고 있을 거예요. 아우터 와일즈의 돌파 순간은 어떤 매체에서든 가장 만족스러운 경험 중 하나입니다. 스포일러는 영구적인 피해입니다.',
    tip_de: 'Schau niemals in ein Lösungsbuch, suche keine Hinweise und frage niemanden, was als nächstes zu tun ist. Wenn du feststeckst, leg das Spiel für einen Tag weg und komm wieder — dein Gehirn arbeitet weiter daran. Die Durchbruch-Momente in Outer Wilds gehören zu den befriedigendsten in jedem Medium. Spoiler sind permanenter Schaden.',
  },
  tunic: {
    title_en: 'Tunic',
    title_zh: 'Tunic',
    title_zhTW: 'Tunic',
    title_ja: 'Tunic',
    title_ko: '튜닉',
    title_de: 'Tunic',
    emoji: '🦊',
    tag_en: "A Zelda-like adventure about a small fox in a mysterious ruined world — you find pages of the game's own instruction manual as you explore",
    tag_zh: '一款关于神秘废墟世界中一只小狐狸的类塞尔达冒险——你在探索时找到游戏自己的说明手册页面',
    tag_zhTW: '一款關於神秘廢墟世界中一隻小狐狸的類薩爾達冒險——你在探索時找到遊戲自己的說明手冊頁面',
    tag_ja: '謎に満ちた廃墟の世界を旅する小さなキツネのゼルダ風アドベンチャー——探索中にゲーム自身の説明書のページを見つけていく',
    tag_ko: '신비로운 폐허 세계의 작은 여우에 관한 젤다풍 어드벤처 — 탐험하면서 게임 자체의 설명서 페이지를 발견합니다',
    tag_de: "Ein Zelda-artiges Abenteuer über einen kleinen Fuchs in einer geheimnisvollen Ruinenwelt — du findest beim Erkunden Seiten aus dem eigenen Spielhandbuch",
    platform_en: 'Available on: PC (Steam, Epic), Nintendo Switch, PlayStation 4/5, Xbox (Game Pass) — about $30',
    platform_zh: '可在以下平台获取：PC（Steam、Epic）、Nintendo Switch、PlayStation 4/5、Xbox（Game Pass）——约 30 美元',
    platform_zhTW: '可在以下平台取得：PC（Steam、Epic）、Nintendo Switch、PlayStation 4/5、Xbox（Game Pass）——約 30 美元',
    platform_ja: '対応プラットフォーム：PC（Steam、Epic）、Nintendo Switch、PlayStation 4/5、Xbox（Game Pass）——約3,000円',
    platform_ko: '이용 가능 플랫폼: PC(Steam, Epic), 닌텐도 스위치, 플레이스테이션 4/5, Xbox(Game Pass) — 약 30달러',
    platform_de: 'Erhältlich auf: PC (Steam, Epic), Nintendo Switch, PlayStation 4/5, Xbox (Game Pass) — ca. 30 €',
    why_en:
      "Tunic (2022) is one of the most clever and heartwarming games made in the past decade. You play as a small fox in a ruined world, armed at first with only a stick, and you gradually discover that the game's instruction manual — the kind that used to come in the box with 1990s games — is scattered throughout the world as collectible pages. The manual is written in a fictional language you cannot read, with diagrams you can interpret. Over the course of 15-20 hours, the manual and the world itself teach you the game's mechanics, its secrets, and eventually its hidden system that reveals a deeper layer beneath the surface game. It feels like being a child discovering a secret in a cartridge that no one else had found. The music is gorgeous (Brian Eno-influenced generative ambient), the combat is difficult but fair (think Dark Souls for a tiny fox), and the accessibility options are excellent — you can turn off death penalty or even make combat trivially easy without affecting the puzzle content. Developed by Andrew Shouldice over six years. Won multiple awards including IGF Nuovo Award and BAFTA nomination.",
    why_zh:
      'Tunic（2022 年）是过去十年制作的最聪明、最温馨的游戏之一。你扮演废墟世界中的一只小狐狸，起初只有一根棍子，你逐渐发现游戏的说明手册——那种过去 1990 年代游戏盒子里附带的那种——作为可收集页面散布在世界各地。手册是用你无法阅读的虚构语言写成的，附有你可以解读的图表。在 15-20 小时的过程中，手册和世界本身教你游戏的机制、秘密，最终是其隐藏系统，揭示了表面游戏下面更深的层次。感觉就像一个孩子在卡带中发现了别人从未找到的秘密。音乐非常优美（受 Brian Eno 影响的生成性环境音乐），战斗困难但公平（想象一下针对小狐狸的黑暗之魂），无障碍选项很好——你可以关闭死亡惩罚，甚至让战斗微不足道，而不影响谜题内容。由 Andrew Shouldice 历时六年开发。赢得多个奖项，包括 IGF Nuovo 奖和 BAFTA 提名。',
    why_zhTW:
      'Tunic（2022 年）是過去十年製作的最聰明、最溫馨的遊戲之一。你扮演廢墟世界中的一隻小狐狸，起初只有一根棍子，你逐漸發現遊戲的說明手冊——那種過去 1990 年代遊戲盒子裡附帶的那種——作為可收集頁面散布在世界各地。手冊是用你無法閱讀的虛構語言寫成的，附有你可以解讀的圖表。在 15-20 小時的過程中，手冊和世界本身教你遊戲的機制、秘密，最終是其隱藏系統，揭示了表面遊戲下面更深的層次。感覺就像一個孩子在卡帶中發現了別人從未找到的秘密。音樂非常優美（受 Brian Eno 影響的生成性環境音樂），戰鬥困難但公平（想像一下針對小狐狸的黑魂），無障礙選項很好——你可以關閉死亡懲罰，甚至讓戰鬥微不足道，而不影響謎題內容。由 Andrew Shouldice 歷時六年開發。贏得多個獎項，包括 IGF Nuovo 獎和 BAFTA 提名。',
    why_ja:
      'Tunic（2022年）は過去10年で作られた最も巧みで心温まるゲームの一つだ。廃墟の世界に生きる小さなキツネとして、最初は棒一本だけで始まり、ゲームの説明書——1990年代のゲームの箱に入っていたあの種の——が世界中に収集可能なページとして散らばっていることを徐々に発見していく。説明書は読めない架空の言語で書かれていて、解読できる図解付き。15〜20時間かけて、説明書と世界そのものがゲームの仕組みや秘密、そして表層のゲームの下に隠されたより深いレイヤーを明かすシステムを教えてくれる。誰も見つけていないカートリッジの秘密を発見した子供のような感覚。音楽は素晴らしく（Brian Eno影響下の生成的アンビエント）、戦闘は難しいがフェア（小さなキツネのダークソウルと思えば）、アクセシビリティも充実——死亡ペナルティをオフにしたり、パズルに影響なく戦闘を簡単にもできる。Andrew Shouldiceが6年かけて開発。IGF Nuovo賞受賞、BAFTA候補など複数の賞を受賞。',
    why_ko:
      'Tunic(2022)는 지난 10년간 만들어진 가장 영리하고 따뜻한 게임 중 하나입니다. 폐허 세계의 작은 여우로 플레이하며 처음에는 막대기 하나만 들고 시작해, 게임의 설명서 — 1990년대 게임 박스에 들어있던 그런 종류 — 가 수집 가능한 페이지로 세계 곳곳에 흩어져 있음을 점차 발견하게 됩니다. 설명서는 읽을 수 없는 가상의 언어로 쓰여 있지만 해석 가능한 도표가 포함되어 있어요. 15~20시간에 걸쳐 설명서와 세계 자체가 게임의 메카닉과 비밀, 그리고 표면 게임 아래 더 깊은 레이어를 드러내는 숨겨진 시스템을 가르쳐 줍니다. 아무도 찾지 못한 카트리지 속 비밀을 발견한 어린 시절 같은 느낌이에요. 음악은 아름답고(Brian Eno 영향의 생성적 앰비언트), 전투는 어렵지만 공정하며(작은 여우의 다크 소울이라 생각하면), 접근성 옵션도 훌륭합니다 — 퍼즐 내용에 영향 없이 사망 페널티를 끄거나 전투를 쉽게 만들 수 있어요. Andrew Shouldice가 6년에 걸쳐 개발. IGF Nuovo 상 및 BAFTA 후보 포함 여러 상을 수상했습니다.',
    why_de:
      'Tunic (2022) ist eines der klügsten und herzerwärmendsten Spiele des letzten Jahrzehnts. Du spielst einen kleinen Fuchs in einer Ruinenwelt, zunächst nur mit einem Stock bewaffnet, und entdeckst nach und nach, dass das Spielhandbuch — das, das früher in den 1990er-Jahren Spielen beilag — als sammelbare Seiten in der Welt verteilt ist. Das Handbuch ist in einer fiktiven Sprache geschrieben, die du nicht lesen kannst, mit Diagrammen, die du interpretieren kannst. Im Verlauf von 15-20 Stunden lehren dich das Handbuch und die Welt selbst die Spielmechaniken, die Geheimnisse und schließlich das versteckte System, das eine tiefere Ebene unter dem Oberflächenspiel enthüllt. Es fühlt sich an wie ein Kind, das ein Geheimnis in einer Spielkassette entdeckt, das niemand sonst gefunden hatte. Die Musik ist wunderschön (Brian-Eno-beeinflusste generative Ambient-Musik), der Kampf ist schwer aber fair (stell dir Dark Souls für einen winzigen Fuchs vor), und die Barrierefreiheitsoptionen sind ausgezeichnet — du kannst den Tod-Malus ausschalten oder sogar den Kampf trivial einfach machen, ohne die Rätselinhalte zu beeinflussen. Von Andrew Shouldice über sechs Jahre entwickelt. Mehrfach ausgezeichnet, darunter IGF Nuovo Award und BAFTA-Nominierung.',
    tip_en: "Collect every manual page you find — even when you cannot read them, the diagrams contain crucial information about mechanics the game will never explain otherwise. And turn on No Fail Mode if the combat frustrates you; the puzzle content of Tunic is entirely separate from the combat difficulty.",
    tip_zh: '收集你找到的每一张手册页面——即使你无法阅读它们，图表也包含关于机制的重要信息，否则游戏永远不会解释。如果战斗让你沮丧，开启无失败模式；Tunic 的谜题内容与战斗难度完全分离。',
    tip_zhTW: '收集你找到的每一張手冊頁面——即使你無法閱讀它們，圖表也包含關於機制的重要信息，否則遊戲永遠不會解釋。如果戰鬥讓你沮喪，開啟無失敗模式；Tunic 的謎題內容與戰鬥難度完全分離。',
    tip_ja: '見つけた説明書のページは全部集めよう——読めなくても、図解にはゲームが他では絶対に説明しない仕組みの重要な情報が含まれている。戦闘でイライラするならノーフェイルモードをオンに。Tunicのパズル内容は戦闘難易度と完全に切り離されている。',
    tip_ko: '찾은 설명서 페이지는 모두 수집하세요 — 읽을 수 없더라도 도표에는 게임이 달리는 절대 설명하지 않을 메카닉에 대한 중요한 정보가 담겨 있습니다. 전투가 짜증스럽다면 노 페일 모드를 켜세요. Tunic의 퍼즐 내용은 전투 난이도와 완전히 분리되어 있습니다.',
    tip_de: 'Sammle jede Handbuchseite, die du findest — auch wenn du sie nicht lesen kannst, enthalten die Diagramme entscheidende Informationen über Mechaniken, die das Spiel sonst nie erklären würde. Schalte den Kein-Scheitern-Modus ein, wenn dich der Kampf frustriert; der Rätselinhalt von Tunic ist vollständig von der Kampfschwierigkeit getrennt.',
  },
  'obra-dinn': {
    title_en: 'Return of the Obra Dinn',
    title_zh: '奥伯拉丁号的回归',
    title_zhTW: '奧伯拉丁號的回歸',
    title_ja: 'Return of the Obra Dinn',
    title_ko: '오브라 딘 호의 귀환',
    title_de: 'Return of the Obra Dinn',
    emoji: '⚓',
    tag_en: 'A 1-bit deduction mystery — a ship returns to port with no crew and only your memory-vision device to reconstruct what happened to 60 people',
    tag_zh: '一款 1-bit 演绎谜题——一艘船只空船返港，只有你的记忆幻视装置来重建 60 个人身上发生的事情',
    tag_zhTW: '一款 1-bit 演繹謎題——一艘船隻空船返港，只有你的記憶幻視裝置來重建 60 個人身上發生的事情',
    tag_ja: '1bitの推理ミステリー——乗組員ゼロで港に戻った船。記憶を見るアイテムだけで60人に何が起きたか再構築しろ',
    tag_ko: '1비트 추리 미스터리 — 선원 없이 항구로 돌아온 배. 기억 환상 장치 하나로 60명에게 무슨 일이 있었는지 재구성하세요',
    tag_de: 'Ein 1-Bit-Deduktionsthriller — ein Schiff kehrt ohne Besatzung in den Hafen zurück, nur dein Gedächtnis-Gerät hilft dir, das Schicksal von 60 Menschen zu rekonstruieren',
    platform_en: 'Available on: PC (Steam, GOG), Nintendo Switch, PlayStation 4/5, Xbox — about $20',
    platform_zh: '可在以下平台获取：PC（Steam、GOG）、Nintendo Switch、PlayStation 4/5、Xbox——约 20 美元',
    platform_zhTW: '可在以下平台取得：PC（Steam、GOG）、Nintendo Switch、PlayStation 4/5、Xbox——約 20 美元',
    platform_ja: '対応プラットフォーム：PC（Steam、GOG）、Nintendo Switch、PlayStation 4/5、Xbox——約2,000円',
    platform_ko: '이용 가능 플랫폼: PC(Steam, GOG), 닌텐도 스위치, 플레이스테이션 4/5, Xbox — 약 20달러',
    platform_de: 'Erhältlich auf: PC (Steam, GOG), Nintendo Switch, PlayStation 4/5, Xbox — ca. 20 €',
    why_en:
      "Return of the Obra Dinn (2018) is one of the most beloved and unique puzzle games ever created. Created entirely by one person (Lucas Pope, developer of Papers Please) over four years, it puts you aboard a ghost ship that returned to port in 1807 with no crew alive and no explanation. You have a magic pocket watch that, when placed near human remains, shows you a frozen tableau of the moment of that person's death, plus the audio leading up to it. Your task: identify every one of the sixty crew members and determine each person's fate — did they die, did they abandon ship, and if they died, who or what caused it? The 1-bit dithered art style (black, white, and grey only) is striking and iconic. The deductive satisfaction is unlike anything else: the game gives you enough information to solve every case through logic and observation alone, with no guessing required. It takes 8-15 hours for a first playthrough. Won BAFTA Best Game and dozens of other awards in 2018. Available on Nintendo Switch, PC, and consoles. One of the most original games of the past decade, period.",
    why_zh:
      '奥伯拉丁号的回归（2018 年）是有史以来最受喜爱和最独特的解谜游戏之一。由一个人（Papers Please 开发者 Lucas Pope）历时四年独自完成，它将你带上了一艘幽灵船，该船于 1807 年无生还船员地返港，毫无解释。你有一个魔法怀表，当放置在人类遗骸附近时，会向你显示该人死亡时刻的冻结场景，以及之前的音频。你的任务：识别六十名船员中的每一个，并确定每个人的命运——他们是死了、弃船逃跑了，如果他们死了，是谁或什么造成的？1-bit 抖动艺术风格（仅黑白灰）引人注目且标志性。演绎满足感与其他任何东西都不同：游戏给你足够的信息，仅通过逻辑和观察就能解决每个案例，不需要猜测。第一次通关需要 8-15 小时。2018 年赢得 BAFTA 最佳游戏和数十个其他奖项。Nintendo Switch、PC 和主机均可。无疑是过去十年最具原创性的游戏之一。',
    why_zhTW:
      '奧伯拉丁號的回歸（2018 年）是有史以來最受喜愛和最獨特的解謎遊戲之一。由一個人（Papers Please 開發者 Lucas Pope）歷時四年獨自完成，它將你帶上了一艘幽靈船，該船於 1807 年無生還船員地返港，毫無解釋。你有一個魔法懷錶，當放置在人類遺骸附近時，會向你顯示該人死亡時刻的凍結場景，以及之前的音頻。你的任務：識別六十名船員中的每一個，並確定每個人的命運——他們是死了、棄船逃跑了，如果他們死了，是誰或什麼造成的？1-bit 抖動藝術風格（僅黑白灰）引人注目且標誌性。演繹滿足感與其他任何東西都不同：遊戲給你足夠的信息，僅通過邏輯和觀察就能解決每個案例，不需要猜測。第一次通關需要 8-15 小時。2018 年贏得 BAFTA 最佳遊戲和數十個其他獎項。Nintendo Switch、PC 和主機均可。無疑是過去十年最具原創性的遊戲之一。',
    why_ja:
      'Return of the Obra Dinn（2018年）は史上最も愛されたユニークなパズルゲームの一つだ。Papers Pleaseの開発者・Lucas Popeが4年かけて一人で作り上げたこの作品は、1807年に乗組員全員が死んだ状態で港に戻ってきた幽霊船に乗り込ませてくれる。魔法の懐中時計を持っていて、人間の遺骸の近くに置くと、その人の死の瞬間の凍りついた情景と、その直前の音声が見える。使命は60人の乗組員全員を特定し、各人の運命を解明すること——死んだのか、脱走したのか、死んだなら誰または何が原因か？1bitのディザリングアートスタイル（白黒グレーのみ）は印象的でアイコニック。推理の満足感はほかに類を見ない。論理と観察だけで全ての謎が解ける情報が揃っていて、当てずっぽうは不要。初回クリアは8〜15時間。2018年にBAFTA最優秀ゲーム賞と数十の賞を受賞。Nintendo Switch、PC、コンソールで遊べる。過去10年で最もオリジナルなゲームの一つ、断言できる。',
    why_ko:
      '오브라 딘 호의 귀환(2018)은 지금까지 만들어진 가장 사랑받고 독특한 퍼즐 게임 중 하나입니다. Papers Please 개발자 Lucas Pope가 혼자 4년에 걸쳐 만든 이 작품은 1807년 선원 전원이 사망한 채 항구로 돌아온 유령선에 탑승시켜줍니다. 마법의 회중시계를 가지고 있어 인간의 유해 근처에 놓으면 그 사람의 죽음의 순간 정지된 장면과 직전의 음성이 보입니다. 임무: 60명의 선원 전원을 특정하고 각자의 운명을 밝혀내세요 — 죽었는지, 탈선했는지, 죽었다면 누가 또는 무엇이 원인인지. 1비트 디더링 아트 스타일(흑백회색만)은 강렬하고 아이코닉합니다. 추론의 만족감은 다른 무엇과도 다릅니다. 논리와 관찰만으로 모든 사건을 해결할 충분한 정보가 주어지며 추측이 필요 없습니다. 첫 플레이는 8~15시간. 2018년 BAFTA 최고의 게임 및 수십 개의 다른 상을 수상했습니다. 닌텐도 스위치, PC, 콘솔 모두 이용 가능. 지난 10년간 가장 독창적인 게임 중 하나임은 틀림없습니다.',
    why_de:
      'Return of the Obra Dinn (2018) ist eines der beliebtesten und einzigartigsten Rätselspiele, die je erschaffen wurden. Von einer einzigen Person (Lucas Pope, Entwickler von Papers Please) in vier Jahren erschaffen, bringt es dich auf ein Geisterschiff, das 1807 ohne lebende Besatzung und ohne Erklärung in den Hafen zurückkehrte. Du hast eine magische Taschenuhr, die dir, wenn sie in der Nähe menschlicher Überreste platziert wird, ein eingefrorenes Tableau des Todesmomentes dieser Person zeigt, plus das Audio davor. Deine Aufgabe: Identifiziere jeden der sechzig Besatzungsmitglieder und bestimme das Schicksal jeder Person — starb sie, verließ sie das Schiff, und wenn sie starb, wer oder was verursachte es? Der 1-Bit-Dithering-Kunststil (nur Schwarz, Weiß und Grau) ist markant und ikonisch. Die deduktive Befriedigung ist unvergleichlich: Das Spiel gibt dir genug Informationen, um jeden Fall allein durch Logik und Beobachtung zu lösen, ohne Raten. Ein erster Durchlauf dauert 8-15 Stunden. Gewann 2018 BAFTA Best Game und Dutzende weitere Auszeichnungen. Eines der originellsten Spiele des letzten Jahrzehnts, ohne Zweifel.',
    tip_en: "You can guess three fates at a time and the game confirms which, if any, are correct — use this liberally. When you find two crew members whose deaths you have witnessed together, deduce a third from context clues: what were they wearing, what language did they speak, what did they look like? Nationality and role narrow identities down fast.",
    tip_zh: '你可以一次猜测三个命运，游戏会确认哪些（如果有的话）是正确的——大量使用这个。当你找到两个你一起目击其死亡的船员时，从上下文线索推断第三个：他们穿什么衣服、说什么语言、看起来什么样？国籍和角色能快速缩小身份范围。',
    tip_zhTW: '你可以一次猜測三個命運，遊戲會確認哪些（如果有的話）是正確的——大量使用這個功能。當你找到兩個你一起目擊其死亡的船員時，從上下文線索推斷第三個：他們穿什麼衣服、說什麼語言、看起來什麼樣？國籍和角色能快速縮小身份範圍。',
    tip_ja: '一度に3つの運命を推測でき、ゲームがどれが（もし正解があれば）正しいか教えてくれる——これは積極的に使おう。一緒に死亡を目撃した2人の乗組員が見つかったら、状況証拠から3人目を推理しよう。何を着ていたか、何語を話していたか、どんな見た目だったか？国籍と役職で身元はすぐに絞り込める。',
    tip_ko: '한 번에 세 가지 운명을 추측할 수 있고 게임이 어느 것이 맞는지 알려줍니다 — 적극적으로 활용하세요. 함께 죽음을 목격한 두 선원을 찾으면 문맥 단서로 세 번째를 추론하세요: 무엇을 입고 있었나요, 어떤 언어를 했나요, 어떻게 생겼나요? 국적과 직책으로 신원을 빠르게 좁힐 수 있습니다.',
    tip_de: 'Du kannst drei Schicksale auf einmal raten und das Spiel bestätigt, welche, falls welche, korrekt sind — nutze das großzügig. Wenn du zwei Besatzungsmitglieder findest, deren Tod du zusammen bezeugt hast, deduziere ein drittes aus Kontexthinweisen: Was trugen sie, welche Sprache sprachen sie, wie sahen sie aus? Nationalität und Rolle grenzen Identitäten schnell ein.',
  },
}

function calcResult(answers: Pick[]): Pick {
  const counts: Record<Pick, number> = {
    'powerwash-simulator': 0,
    'outer-wilds': 0,
    tunic: 0,
    'obra-dinn': 0,
  }
  for (const a of answers) counts[a]++
  return Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0] as Pick
}

export function CozyBeyondCozyQuiz({ locale }: { locale: string }) {
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
    const url = `${BASE_URL}/${locale}/quizzes/cozy-beyond-cozy`
    const shareText = isZh
      ? `作为 Cozy 玩家，我的下一步独立游戏是「${result.title_zh}」！${result.tag_zh}。找到你的：${url}`
      : `As a cozy gamer, my next indie game is ${result.title_en} — ${result.tag_en}. Find yours: ${url}`

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
              {getLoc('上手小贴士：', 'Getting started: ', '上手小訣竅：', 'はじめる前に：', '시작 팁: ', 'Erste Schritte: ')}
            </span>
            {getLoc(result.tip_zh, result.tip_en, result.tip_zhTW, result.tip_ja, result.tip_ko, result.tip_de)}
          </p>
        </div>

        <div className="mb-4 rounded-xl border border-[#2d3d2d] bg-[#0f1a0f] p-4">
          <p className="text-center text-sm text-[#8a9a7a]">
            {getLoc(
              'TendFarm 正在研发农场节律追踪功能——把游戏里的那种沉浸心流带入真实日常。',
              'TendFarm is building a farm rhythm tracker — bringing the focused flow state of games into real daily life.',
              'TendFarm 正在研發農場節律追蹤功能——把遊戲裡的那種沉浸心流帶入真實日常。',
              'TendFarmはファームリズムトラッカーを開発中——ゲームの没入フロー状態をリアルな日常へ。',
              'TendFarm은 농장 리듬 트래커를 개발 중입니다 — 게임의 몰입 플로우 상태를 실제 일상으로.',
              'TendFarm entwickelt einen Farm-Rhythmus-Tracker — der konzentrierte Flow-Zustand aus Spielen in den echten Alltag bringen.',
            )}
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <ShareButton text={shareText} locale={locale} />
          <button
            onClick={() => { setAnswers(Array(QUESTIONS.length).fill(null)); setSubmitted(false) }}
            className="flex-1 rounded-xl border border-[#2d3d2d] py-3 text-sm text-[#8a9a7a] hover:border-[#4a5a4a] hover:text-[#e8dcc8]"
          >
            {getLoc('重新测试', 'Retake Quiz', '重新測驗', 'もう一度やる', '다시 테스트', 'Quiz wiederholen')}
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
            'Cozy 玩家的下一步：哪款深度独立游戏最适合你？',
            'Beyond Cozy: Which Beloved Indie Game Should You Try Next?',
            'Cozy 玩家的下一步：哪款深度獨立遊戲最適合你？',
            'Cozyゲーマーの次の一手：あなたに合う深みのあるインディーゲームは？',
            'Cozy 게이머의 다음 단계: 어떤 인디 게임이 당신에게 맞을까요?',
            'Der nächste Schritt für Cozy-Gamer: Welches Indie-Spiel passt zu dir?',
          )}
        </h1>
        <p className="text-sm text-[#8a9a7a]">
          {getLoc(
            '6 个问题，为 Cozy 游戏玩家找到完美的下一步——高压清洗模拟器、星外拓荒、Tunic 还是奥伯拉丁号的回归',
            '6 questions to find your next game as a cozy gamer who wants to branch out — PowerWash Simulator, Outer Wilds, Tunic, or Return of the Obra Dinn.',
            '6 個問題，為 Cozy 遊戲玩家找到完美的下一步——高壓清洗模擬器、星際拓荒、Tunic 還是奧伯拉丁號的回歸',
            '6つの質問で、Cozyゲーマーの次の一本を見つけよう——PowerWash Simulator、アウター・ワイルズ、Tunic、それともReturn of the Obra Dinn？',
            '6가지 질문으로 새로운 장르에 도전하고 싶은 cozy 게이머의 다음 게임을 찾아보세요 — 파워워시 시뮬레이터, 아우터 와일즈, 튜닉, 아니면 오브라 딘 호의 귀환',
            '6 Fragen, um dein nächstes Spiel als Cozy-Gamer zu finden — PowerWash Simulator, Outer Wilds, Tunic oder Return of the Obra Dinn.',
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
        {getLoc('找到我的下一步', 'Find My Next Game', '找到我的下一步', '次のゲームを見つける', '다음 게임 찾기', 'Mein nächstes Spiel finden')}
      </button>
    </div>
  )
}
