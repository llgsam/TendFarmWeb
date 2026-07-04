'use client'

import { useState } from 'react'
import { BASE_URL } from '@/lib/config'

type Pick = 'ooblets' | 'fae-farm' | 'roots-of-pacha' | 'potion-permit'

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
    q_en: 'What did you love most about Stardew Valley or Animal Crossing?',
    q_zh: '你最喜欢星露谷物语或动物之森的哪个方面？',
    q_zhTW: '你最喜歡星露谷物語或動物之森的哪個方面？',
    q_ja: 'スターデューバレーやどうぶつの森で一番好きだったのはどこ？',
    q_ko: '스타듀 밸리나 모동숲에서 가장 좋아했던 부분은 뭐예요?',
    q_de: 'Was hat dir an Stardew Valley oder Animal Crossing am besten gefallen?',
    options: [
      {
        en: 'The creature-collecting and the way NPCs had their own distinct personalities and quirks',
        zh: '生物收集，以及 NPC 拥有各自独特个性和怪癖的方式',
        zhTW: '生物收集，以及 NPC 擁有各自獨特個性和怪癖的方式',
        ja: 'キャラクター収集と、それぞれ個性豊かなNPCたちのユニークさ',
        ko: '생물 수집과 각자 개성 있는 NPC들의 독특한 매력',
        de: 'Das Creature-Collecting und die einzigartigen Persönlichkeiten der NPCs',
        type: 'ooblets',
      },
      {
        en: 'The crafting loop and the way a new area slowly became a home I could decorate',
        zh: '制作循环，以及一个新区域慢慢变成我可以装饰的家的过程',
        zhTW: '製作循環，以及一個新區域慢慢變成我可以裝飾的家的過程',
        ja: 'クラフトループと、新しいエリアが少しずつ自分の家になっていく感じ',
        ko: '크래프팅 루프와 새로운 공간이 천천히 내 집이 되어가는 과정',
        de: 'Die Crafting-Schleife und wie ein neues Gebiet langsam zur heimelig dekorierten Heimat wurde',
        type: 'fae-farm',
      },
      {
        en: 'The community building — growing relationships with villagers and watching the town come alive',
        zh: '社区建设——与村民发展关系，看着小镇焕发生机',
        zhTW: '社區建設——與村民發展關係，看著小鎮煥發生機',
        ja: 'コミュニティ作り——村人との絆を深めて、町が賑わっていく様子',
        ko: '마을 공동체 만들기 — 주민들과 관계를 쌓고 마을이 살아나는 모습',
        de: 'Der Gemeinschaftsaufbau — Beziehungen zu Dorfbewohnern entwickeln und das Dorf zum Leben erwecken',
        type: 'roots-of-pacha',
      },
      {
        en: 'The daily routine — checking in with everyone, doing small helpful tasks, feeling known and needed',
        zh: '日常惯例——与大家签到，做些小小的帮助性任务，感觉被了解和被需要',
        zhTW: '日常慣例——與大家打招呼，做些小小的幫助性任務，感覺被了解和被需要',
        ja: '毎日のルーティン——みんなに挨拶して、小さなお手伝いをして、必要とされている感じ',
        ko: '매일 루틴 — 모두에게 인사하고 작은 도움을 주면서 필요한 존재가 되는 느낌',
        de: 'Die tägliche Routine — bei allen vorbeischauen, kleine Aufgaben erledigen, sich gebraucht und bekannt fühlen',
        type: 'potion-permit',
      },
    ],
  },
  {
    q_en: 'What element do you most want to try that Stardew and Animal Crossing did not have?',
    q_zh: '你最想尝试星露谷和动物之森没有的哪个元素？',
    q_zhTW: '你最想嘗試星露谷和動物之森沒有的哪個元素？',
    q_ja: 'スターデューやどうぶつの森にはない、次に試してみたい要素は？',
    q_ko: '스타듀 밸리와 모동숲에 없었던 요소 중 가장 시도해보고 싶은 건 뭐예요?',
    q_de: 'Welches Element möchtest du am liebsten ausprobieren, das Stardew Valley und Animal Crossing nicht hatten?',
    options: [
      {
        en: 'Creature-collecting and battling with a completely unique twist — like Pokémon but cozy and weird',
        zh: '生物收集和对战，有完全独特的转折——像宝可梦但是 cozy 又奇异',
        zhTW: '生物收集和對戰，有完全獨特的轉折——像寶可夢但是 cozy 又奇異',
        ja: 'モンスター収集＆バトル、でも独特のひねりがある——ポケモンみたいだけどのんびりシュール',
        ko: '생물 수집과 배틀, 완전히 독특한 방식으로 — 포켓몬 같지만 아늑하고 독특한',
        de: 'Creature-Collecting und Kämpfen mit einem völlig eigenwilligen Twist — wie Pokémon, aber gemütlich und skurril',
        type: 'ooblets',
      },
      {
        en: 'More magic — spells, enchanted tools, actual fantasy elements in the farming world',
        zh: '更多魔法——咒语、魔法工具、农耕世界中的真正奇幻元素',
        zhTW: '更多魔法——咒語、魔法工具、農耕世界中的真正奇幻元素',
        ja: 'もっとマジック——呪文、魔法のアイテム、農場ファンタジーの世界',
        ko: '더 많은 마법 — 주문, 마법 도구, 농장 세계의 진짜 판타지 요소',
        de: 'Mehr Magie — Zaubersprüche, magische Werkzeuge, echte Fantasieelemente in der Farmingwelt',
        type: 'fae-farm',
      },
      {
        en: 'A completely different historical setting — not modern or contemporary, but something ancient',
        zh: '完全不同的历史设定——不是现代或当代，而是某种古老的东西',
        zhTW: '完全不同的歷史設定——不是現代或當代，而是某種古老的東西',
        ja: 'まったく違う時代背景——現代じゃなくて、もっと太古の、原始的な世界',
        ko: '완전히 다른 역사적 배경 — 현대가 아닌, 고대의 무언가',
        de: 'Ein komplett anderes historisches Setting — nicht modern, sondern uralt und ursprünglich',
        type: 'roots-of-pacha',
      },
      {
        en: 'A different role — not a farmer but still part of a small community, with a different daily purpose',
        zh: '不同的角色——不是农夫，但仍然是小社区的一部分，有着不同的日常目的',
        zhTW: '不同的角色——不是農夫，但仍然是小社區的一部分，有著不同的日常目的',
        ja: '違う役割——農家じゃなくてもいい、小さなコミュニティの一員として別の目的で生きる',
        ko: '다른 역할 — 농부가 아니더라도 작은 마을의 일원으로서 다른 목적을 가진',
        de: 'Eine andere Rolle — kein Bauer, aber trotzdem Teil einer kleinen Gemeinschaft mit einem anderen Alltag',
        type: 'potion-permit',
      },
    ],
  },
  {
    q_en: 'How important is multiplayer or co-op to your next game?',
    q_zh: '多人游戏或合作对你的下一款游戏有多重要？',
    q_zhTW: '多人遊戲或合作對你的下一款遊戲有多重要？',
    q_ja: '次にプレイするゲームに、マルチプレイや協力プレイはどのくらい重要？',
    q_ko: '다음 게임에서 멀티플레이어나 협동이 얼마나 중요한가요?',
    q_de: 'Wie wichtig ist dir Multiplayer oder Co-op bei deinem nächsten Spiel?',
    options: [
      {
        en: 'Not very — I love single-player cozy experiences and want to explore a weird world solo',
        zh: '不太重要——我喜欢单人 cozy 体验，想独自探索一个奇异的世界',
        zhTW: '不太重要——我喜歡單人 cozy 體驗，想獨自探索一個奇異的世界',
        ja: 'あまり重要じゃない——シングルプレイのほのぼの体験が好き、不思議な世界をひとりで冒険したい',
        ko: '별로 중요하지 않아요 — 싱글 코지 게임이 좋고, 혼자서 이상한 세계를 탐험하고 싶어요',
        de: 'Nicht so wichtig — ich liebe Singleplayer-Cozy-Spiele und will eine seltsame Welt solo erkunden',
        type: 'ooblets',
      },
      {
        en: 'Very important — I want co-op that works smoothly for playing with a partner or friend',
        zh: '非常重要——我想要能顺畅地与伴侣或朋友一起玩的合作模式',
        zhTW: '非常重要——我想要能順暢地與伴侶或朋友一起玩的合作模式',
        ja: 'すごく大事！パートナーや友達とスムーズに一緒に遊べるco-opがほしい',
        ko: '매우 중요해요 — 파트너나 친구와 원활하게 함께 즐길 수 있는 협동 모드를 원해요',
        de: 'Sehr wichtig — ich möchte Co-op, der reibungslos mit einem Partner oder Freund funktioniert',
        type: 'fae-farm',
      },
      {
        en: 'Somewhat — multiplayer is a nice bonus but not required; the community feel within the game is enough',
        zh: '有些重要——多人游戏是个不错的加分项，但不是必须的；游戏内的社区感已经足够',
        zhTW: '有些重要——多人遊戲是個不錯的加分項，但不是必須的；遊戲內的社區感已經足夠',
        ja: 'ちょっとだけ——マルチがあるとうれしいけど必須じゃない、ゲーム内のコミュニティ感で十分',
        ko: '조금요 — 멀티가 있으면 좋지만 필수는 아니에요. 게임 내 공동체 감으로도 충분해요',
        de: 'Ein bisschen — Multiplayer ist nett, aber nicht nötig; das Gemeinschaftsgefühl im Spiel reicht mir',
        type: 'roots-of-pacha',
      },
      {
        en: 'Not at all — I want a slow, solo, story-rich experience where I am the center of the town',
        zh: '完全不重要——我想要一个缓慢的、单人的、故事丰富的体验，我是小镇的中心',
        zhTW: '完全不重要——我想要一個緩慢的、單人的、故事豐富的體驗，我是小鎮的中心',
        ja: '全然要らない——ゆっくりソロで、ストーリーたっぷりで、自分が町の主役な体験がしたい',
        ko: '전혀 중요하지 않아요 — 느긋하게 혼자서 스토리가 풍부한 경험을 즐기고 싶어요. 내가 마을의 중심이 되는',
        de: 'Überhaupt nicht — ich will ein ruhiges, Solo-Erlebnis mit viel Story, wo ich der Mittelpunkt des Dorfes bin',
        type: 'potion-permit',
      },
    ],
  },
  {
    q_en: 'Which of these sounds most fun to you?',
    q_zh: '以下哪个对你来说最有趣？',
    q_zhTW: '以下哪個對你來說最有趣？',
    q_ja: '次のうち、一番楽しそうなのは？',
    q_ko: '다음 중 가장 재미있을 것 같은 건 뭔가요?',
    q_de: 'Was klingt für dich am spaßigsten?',
    options: [
      {
        en: "Dancing off against a neighbor to win a crop dispute — losing is fine, it's still adorable",
        zh: '与邻居跳舞对决来赢得一场作物纠纷——输了也没关系，这仍然很可爱',
        zhTW: '與鄰居跳舞對決來贏得一場作物糾紛——輸了也沒關係，這仍然很可愛',
        ja: '隣人とダンスバトルして農作物の争いを解決——負けても可愛いから全然OK',
        ko: '이웃과 댄스 배틀로 작물 분쟁을 해결하기 — 져도 귀엽기만 해요',
        de: 'Gegen einen Nachbarn in einem Tanzkampf um eine Ernte antreten — Verlieren ist okay, es bleibt zuckersüß',
        type: 'ooblets',
      },
      {
        en: 'Learning new magic spells to water crops instantly, fight cave monsters, and enchant furniture',
        zh: '学习新魔法咒语来立即浇水、对抗洞穴怪物和附魔家具',
        zhTW: '學習新魔法咒語來立即澆水、對抗洞穴怪物和附魔家具',
        ja: '新しい魔法を覚えて、作物に一気に水をやったり、洞窟のモンスターと戦ったり、家具に魔法をかけたり',
        ko: '새로운 마법 주문을 배워서 작물에 물주기, 동굴 몬스터 싸우기, 가구 마법 부여하기',
        de: 'Neue Zaubersprüche lernen, um Felder sofort zu gießen, Höhlenmonster zu bekämpfen und Möbel zu verzaubern',
        type: 'fae-farm',
      },
      {
        en: 'Painting my discoveries on the community cave wall using Stone Age pigments and symbols',
        zh: '用石器时代的颜料和符号把我的发现画在社区洞穴壁上',
        zhTW: '用石器時代的顏料和符號把我的發現畫在社區洞穴壁上',
        ja: '石器時代の顔料と記号で、自分の発見をコミュニティの洞窟壁画に描いていく',
        ko: '석기시대 물감과 기호로 내 발견들을 마을 동굴 벽화에 그리기',
        de: 'Meine Entdeckungen mit steinzeitlichen Pigmenten und Symbolen an die Gemeinschaftshöhlenwand malen',
        type: 'roots-of-pacha',
      },
      {
        en: "Diagnosing a villager's illness, gathering herbs from the forest, and brewing a remedy at night",
        zh: '诊断村民的疾病，从森林中采集草药，在夜晚酿制药方',
        zhTW: '診斷村民的疾病，從森林中採集草藥，在夜晚釀製藥方',
        ja: '村人の病気を診断して、森でハーブを採取して、夜に薬を調合する',
        ko: '마을 주민의 병을 진단하고, 숲에서 약초를 채집해서, 밤에 치료제 만들기',
        de: "Die Krankheit eines Dorfbewohners diagnostizieren, Kräuter aus dem Wald sammeln und nachts ein Heilmittel brauen",
        type: 'potion-permit',
      },
    ],
  },
  {
    q_en: 'What kind of aesthetic do you want your next cozy game to have?',
    q_zh: '你希望你的下一款 cozy 游戏有什么样的美学风格？',
    q_zhTW: '你希望你的下一款 cozy 遊戲有什麼樣的美學風格？',
    q_ja: '次にプレイしたいコージーゲームのビジュアル雰囲気は？',
    q_ko: '다음 코지 게임에서 원하는 미적 스타일은 무엇인가요?',
    q_de: 'Welche Ästhetik soll dein nächstes Cozy Game haben?',
    options: [
      {
        en: 'Bright and deliberately weird — pastel colors, dancing vegetables, a world that does not take itself seriously',
        zh: '明亮且刻意奇异——粉彩色调、跳舞的蔬菜、一个不把自己当回事的世界',
        zhTW: '明亮且刻意奇異——粉彩色調、跳舞的蔬菜、一個不把自己當回事的世界',
        ja: 'ポップでわざとシュール——パステルカラー、踊る野菜、自分をあまり真剣に考えない世界',
        ko: '밝고 의도적으로 이상한 — 파스텔 색상, 춤추는 채소, 스스로를 너무 진지하게 생각하지 않는 세계',
        de: 'Hell und bewusst schräg — Pastellfarben, tanzende Gemüse, eine Welt, die sich selbst nicht zu ernst nimmt',
        type: 'ooblets',
      },
      {
        en: 'Fantasy-soft — glowing mushrooms, fairy lights, magical forest paths, warm purple and teal',
        zh: '柔和奇幻——发光的蘑菇、仙女灯、魔法森林小径、温暖的紫色和青色',
        zhTW: '柔和奇幻——發光的蘑菇、仙女燈、魔法森林小徑、溫暖的紫色和青色',
        ja: 'ファンタジーソフト——光る茸、フェアリーライト、魔法の森の小道、温かみのある紫とティール',
        ko: '소프트 판타지 — 빛나는 버섯, 요정 조명, 마법의 숲길, 따뜻한 보라색과 청록색',
        de: 'Fantasy-weich — leuchtende Pilze, Lichterketten, magische Waldpfade, warmes Violett und Blaugrün',
        type: 'fae-farm',
      },
      {
        en: 'Earthy and ancient — cave paintings, bone tools, natural dyes, the warmth of a fire in a primitive setting',
        zh: '质朴而古老——洞穴壁画、骨制工具、天然染料、原始环境中篝火的温暖',
        zhTW: '質樸而古老——洞穴壁畫、骨製工具、天然染料、原始環境中篝火的溫暖',
        ja: 'アーシーで古代的——洞窟壁画、骨の道具、天然染料、原始的な焚き火の温もり',
        ko: '흙냄새 나는 고대 — 동굴 벽화, 뼈로 만든 도구, 천연 염료, 원시 환경의 모닥불 온기',
        de: 'Erdig und uralt — Höhlenmalereien, Knochenwerkzeuge, Naturfarben, die Wärme eines Lagerfeuers in einer primitiven Welt',
        type: 'roots-of-pacha',
      },
      {
        en: 'Pixel-art small-town — a charming coastal village with a lighthouse, warm color palette, every resident memorable',
        zh: '像素艺术小镇——有灯塔的迷人沿海村庄，温暖色调，每个居民都令人难忘',
        zhTW: '像素藝術小鎮——有燈塔的迷人沿海村莊，溫暖色調，每個居民都令人難忘',
        ja: 'ドット絵の小さな町——灯台のある海辺の村、温かい色合い、全員のキャラが印象的',
        ko: '픽셀 아트 소도시 — 등대가 있는 매력적인 해안 마을, 따뜻한 색감, 모든 주민이 인상적인',
        de: 'Pixel-Art-Kleinstadt — ein charmantes Küstendorf mit Leuchtturm, warme Farbpalette, jeder Bewohner unvergesslich',
        type: 'potion-permit',
      },
    ],
  },
  {
    q_en: 'What would make you excited to log back in the next day?',
    q_zh: '什么会让你兴奋地第二天再次登录？',
    q_zhTW: '什麼會讓你興奮地第二天再次登錄？',
    q_ja: '翌日また起動したくなる理由は何？',
    q_ko: '다음날 다시 게임을 켜고 싶게 만드는 건 뭐예요?',
    q_de: 'Was würde dich begeistern, am nächsten Tag wieder einzuloggen?',
    options: [
      {
        en: 'My Ooblets evolved overnight — I want to see their new forms and plan which to use in the next dance-off',
        zh: '我的 Ooblets 一夜之间进化了——我想看到它们的新形态，并计划下次舞蹈对决用哪个',
        zhTW: '我的 Ooblets 一夜之間進化了——我想看到它們的新形態，並計劃下次舞蹈對決用哪個',
        ja: '昨夜のうちにOobletsが進化してた——新しい姿を見て、次のダンスバトルで誰を使うか考えたい',
        ko: '내 Ooblets가 밤새 진화했어요 — 새로운 모습 보고 다음 댄스 배틀에 누굴 쓸지 계획하고 싶어요',
        de: 'Meine Ooblets haben sich über Nacht entwickelt — ich will ihre neuen Formen sehen und planen, wen ich beim nächsten Tanzkampf einsetze',
        type: 'ooblets',
      },
      {
        en: 'My friend and I left a chest half-organized — I want to finish decorating our farmhouse together',
        zh: '我和朋友把宝箱整理到一半——我想和他们一起完成农舍的装饰',
        zhTW: '我和朋友把寶箱整理到一半——我想和他們一起完成農舍的裝飾',
        ja: '友達と一緒に箱の整理を途中で終えた——一緒に農家の装飾を仕上げたい',
        ko: '친구랑 상자 정리를 절반밖에 못 했어요 — 같이 농가 꾸미기를 완성하고 싶어요',
        de: 'Mein Freund und ich haben die Truhe halb aufgeräumt — wir wollen das Farmhaus zusammen fertig dekorieren',
        type: 'fae-farm',
      },
      {
        en: 'There was a festival announced yesterday — I want to see how the whole village comes together for it',
        zh: '昨天有个节日宣布了——我想看看整个村庄怎么为此聚在一起',
        zhTW: '昨天有個節日宣布了——我想看看整個村莊怎麼為此聚在一起',
        ja: '昨日、祭りの告知があった——村全体がどんな風に集まるのか見たい',
        ko: '어제 축제가 발표됐어요 — 마을 전체가 어떻게 함께 모이는지 보고 싶어요',
        de: 'Gestern wurde ein Fest angekündigt — ich will sehen, wie das ganze Dorf dafür zusammenkommt',
        type: 'roots-of-pacha',
      },
      {
        en: 'A new patient was mentioned at the clinic door — I want to discover what is wrong and how to help',
        zh: '诊所门口提到了一位新病人——我想弄清楚出了什么问题，以及如何提供帮助',
        zhTW: '診所門口提到了一位新病人——我想弄清楚出了什麼問題，以及如何提供幫助',
        ja: 'クリニックの前で新しい患者さんのことが話されていた——何が問題でどう助けられるか知りたい',
        ko: '진료소 문 앞에서 새 환자 얘기가 나왔어요 — 무슨 문제인지, 어떻게 도울 수 있는지 알고 싶어요',
        de: 'An der Klinik wurde ein neuer Patient erwähnt — ich will herausfinden, was los ist und wie ich helfen kann',
        type: 'potion-permit',
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
  ooblets: {
    title_en: 'Ooblets',
    title_zh: 'Ooblets',
    title_zhTW: 'Ooblets',
    title_ja: 'Ooblets',
    title_ko: 'Ooblets',
    title_de: 'Ooblets',
    emoji: '🌻',
    tag_en: 'A farming + creature-collecting game where battles are settled by increasingly chaotic dance-offs',
    tag_zh: '农耕 + 生物收集游戏，用越来越混乱的舞蹈对决来解决争端',
    tag_zhTW: '農耕 + 生物收集遊戲，用越來越混亂的舞蹈對決來解決爭端',
    tag_ja: '農業＋生き物収集ゲーム——もめごとはカオスなダンスバトルで決着をつけよう',
    tag_ko: '농업 + 생물 수집 게임, 점점 더 혼돈스러운 댄스 배틀로 분쟁을 해결하는',
    tag_de: 'Ein Farming- und Creature-Collecting-Spiel, in dem Streitigkeiten durch immer chaotischere Tanzkämpfe gelöst werden',
    platform_en: 'Available on: PC (Steam), Nintendo Switch, Xbox (Game Pass) — about $25',
    platform_zh: '可在以下平台获取：PC（Steam）、Nintendo Switch、Xbox（Game Pass）——约 25 美元',
    platform_zhTW: '可在以下平台獲取：PC（Steam）、Nintendo Switch、Xbox（Game Pass）——約 25 美元',
    platform_ja: 'PC（Steam）、Nintendo Switch、Xbox（Game Pass）で遊べます——定価約3,400円',
    platform_ko: '출시 플랫폼: PC(Steam), Nintendo Switch, Xbox(Game Pass) — 약 ₩33,000',
    platform_de: 'Erhältlich auf: PC (Steam), Nintendo Switch, Xbox (Game Pass) — ca. 25 €',
    why_en:
      "Ooblets (released in full in 2022 after Epic Early Access) is one of the most unique cozy games ever made — and also one of the most deliberately strange. You move to a small town called Badgetown, grow crops and cook food, and collect small creatures called Ooblets by challenging them to dance battles. The Ooblets you win follow you around, help on your farm, and can be entered into dance competitions. The humor is dry and self-aware — NPCs make meta jokes, quests have absurdist logic, and the game never plays it straight. The visual style is bright pastel-colored and deliberately toy-like. If you loved Animal Crossing's creature-collecting aspect and want something that extends that into farming and competition, Ooblets is the most inventive answer. Available on Xbox Game Pass. The developers are the same duo who create the Griftlands card game, and the wit carries over.",
    why_zh:
      'Ooblets（2022 年完整发布，此前在 Epic 抢先体验）是有史以来最独特的 cozy 游戏之一——也是最刻意奇异的之一。你搬到一个叫做 Badgetown 的小镇，种植作物和烹饪食物，通过挑战小生物（Ooblets）进行舞蹈对决来收集它们。你赢得的 Ooblets 会跟着你四处走，帮助农场工作，并可以参加舞蹈比赛。幽默是干燥且自我意识的——NPC 发表元笑话，任务有荒诞逻辑，游戏从不正经对待自己。视觉风格是明亮的粉彩色调，刻意像玩具一样。如果你喜欢动物之森的生物收集方面，并想要将其延伸到农耕和竞争中的东西，Ooblets 是最具创意的答案。可在 Xbox Game Pass 上获取。开发者是创作 Griftlands 卡牌游戏的同一个二人组，机智感贯穿其中。',
    why_zhTW:
      'Ooblets（2022 年完整發布，此前在 Epic 搶先體驗）是有史以來最獨特的 cozy 遊戲之一——也是最刻意奇異的之一。你搬到一個叫做 Badgetown 的小鎮，種植作物和烹飪食物，通過挑戰小生物（Ooblets）進行舞蹈對決來收集它們。你贏得的 Ooblets 會跟著你四處走，幫助農場工作，並可以參加舞蹈比賽。幽默是乾燥且自我意識的——NPC 發表元笑話，任務有荒誕邏輯，遊戲從不正經對待自己。視覺風格是明亮的粉彩色調，刻意像玩具一樣。如果你喜歡動物之森的生物收集方面，並想要將其延伸到農耕和競爭中的東西，Ooblets 是最具創意的答案。可在 Xbox Game Pass 上獲取。開發者是創作 Griftlands 卡牌遊戲的同一個二人組，機智感貫穿其中。',
    why_ja:
      'Ooblets（2022年に正式リリース、EpicのEarly Accessを経て）は、これまでにないほどユニークなコージーゲームのひとつ——そして意図的にシュールな世界観が最大の特徴です。Badgetownという小さな町に引っ越して、作物を育てたり料理したり、ダンスバトルで小さな生き物「Ooblets」を集めていきます。集めたOobletsは後ろをついてきて、農作業を手伝い、ダンス大会に出場することもできます。ユーモアはドライで自己言及的——NPCはメタな冗談を飛ばし、クエストは不条理な論理で動いていて、ゲーム自体が自分を真剣に捉えていません。ビジュアルはパステルカラーでおもちゃのような世界観。どうぶつの森の生き物要素が大好きで、それを農業や競争の要素と組み合わせたい人にとって、Oobletsは最もクリエイティブな答えです。Xbox Game Passでも遊べます。開発者はGriftlandsカードゲームと同じデュオで、そのウィットがそのまま活きています。',
    why_ko:
      'Ooblets(2022년 정식 출시, Epic Early Access 이후)는 역대 가장 독특한 코지 게임 중 하나이자 가장 의도적으로 이상한 게임입니다. Badgetown이라는 작은 마을로 이사해서 작물을 키우고 요리하며, 작은 생물 Ooblets에게 댄스 배틀을 걸어 수집해요. 이긴 Ooblets는 따라다니며 농장 일을 돕고 댄스 대회에 출전할 수 있어요. 유머는 건조하고 메타적이에요 — NPC들은 메타 농담을 하고, 퀘스트는 부조리한 논리로 움직이며, 게임 자체가 진지해지지 않아요. 비주얼은 밝은 파스텔 컬러에 장난감 같은 느낌. 모동숲의 생물 수집 요소가 좋았고 그걸 농업과 경쟁 요소와 합치고 싶다면, Ooblets가 가장 창의적인 답입니다. Xbox Game Pass에서도 즐길 수 있어요. 개발자는 Griftlands 카드 게임을 만든 동일한 2인조로, 그 위트가 그대로 담겨 있습니다.',
    why_de:
      'Ooblets (2022 im vollständigen Release nach Epic Early Access) ist eines der originellsten Cozy Games überhaupt — und auch das absichtlich seltsamste. Du ziehst in ein Städtchen namens Badgetown, baust Gemüse an, kochst Gerichte und sammelst kleine Kreaturen namens Ooblets, indem du sie zu Tanzkämpfen herausforderst. Gewonnene Ooblets folgen dir überall, helfen auf der Farm und nehmen an Tanzwettbewerben teil. Der Humor ist trocken und selbstreferenziell — NPCs machen Meta-Witze, Quests folgen absurder Logik, und das Spiel nimmt sich selbst nie ernst. Der Stil ist knallbunt-pastellig und bewusst verspielt. Wenn du Animal Crossings Creature-Collecting gemocht hast und das in Farming und Wettbewerb verlängern willst, ist Ooblets die kreativste Antwort. Auch auf Xbox Game Pass erhältlich. Die Entwickler sind dasselbe Duo hinter dem Kartenspiel Griftlands — der Witz ist unverkennbar.',
    tip_en: "Prioritize collecting Ooblets with farming-related abilities early — some can water crops, harvest automatically, or discover seeds, which dramatically speeds up the early game.",
    tip_zh: '优先早期收集具有农耕相关能力的 Ooblets——一些能浇水、自动收割或发现种子，这会大幅加速早期游戏进程。',
    tip_zhTW: '優先早期收集具有農耕相關能力的 Ooblets——一些能澆水、自動收割或發現種子，這會大幅加速早期遊戲進程。',
    tip_ja: '農作業に関係した能力を持つOobletsを序盤に優先して集めよう——水やり・自動収穫・種の発見ができるOobletsがいると、序盤のペースが格段に上がります。',
    tip_ko: '농업 관련 능력을 가진 Ooblets를 초반에 우선적으로 수집하세요 — 물주기, 자동 수확, 씨앗 발견이 가능한 Ooblets가 있으면 초반 진행이 훨씬 빨라집니다.',
    tip_de: 'Sammel früh Ooblets mit farmspezifischen Fähigkeiten — manche können bewässern, automatisch ernten oder Samen aufspüren, was den Spieleinstieg enorm beschleunigt.',
  },
  'fae-farm': {
    title_en: 'Fae Farm',
    title_zh: '精灵农场',
    title_zhTW: '精靈農場',
    title_ja: 'Fae Farm',
    title_ko: 'Fae Farm',
    title_de: 'Fae Farm',
    emoji: '🧚',
    tag_en: 'A magical co-op farming sim with spells, fairies, and the smoothest multiplayer in the genre',
    tag_zh: '拥有魔法、精灵和该类型最流畅多人游戏的魔法合作农场模拟',
    tag_zhTW: '擁有魔法、精靈和該類型最流暢多人遊戲的魔法合作農場模擬',
    tag_ja: '魔法と妖精たちが登場する農業シム——このジャンルで最もスムーズなco-opを備えた作品',
    tag_ko: '마법, 요정, 이 장르에서 가장 매끄러운 멀티플레이어를 갖춘 마법 협동 농장 시뮬레이터',
    tag_de: 'Ein magischer Co-op-Farming-Sim mit Zaubersprüchen, Feen und dem fließendsten Multiplayer im Genre',
    platform_en: 'Available on: Nintendo Switch, PC (Steam, Epic) — about $40 (often on sale for ~$20-25)',
    platform_zh: '可在以下平台获取：Nintendo Switch、PC（Steam、Epic）——约 40 美元（常特价约 20-25 美元）',
    platform_zhTW: '可在以下平台獲取：Nintendo Switch、PC（Steam、Epic）——約 40 美元（常特價約 20-25 美元）',
    platform_ja: 'Nintendo Switch、PC（Steam、Epic）で遊べます——定価約5,500円（セール時は2,700〜3,400円ほど）',
    platform_ko: '출시 플랫폼: Nintendo Switch, PC(Steam, Epic) — 약 ₩53,000 (세일 시 약 ₩26,000~33,000)',
    platform_de: 'Erhältlich auf: Nintendo Switch, PC (Steam, Epic) — ca. 40 € (im Sale oft 20–25 €)',
    why_en:
      "Fae Farm (2023) positions itself directly as a co-op Stardew alternative and succeeds on that front: up to 4 players can farm, mine, fish, and explore together in shared progress, which is notably rare in the genre. The twist over Stardew is the magic system — you unlock spells that allow you to instantly water large areas, create floating platforms for puzzle-solving, and enchant your equipment. The world is divided into several distinct biomes with different magical creatures and design styles. The visual aesthetic is soft fantasy with glowing elements and warm lighting. Reviewers consistently note that the co-op implementation is seamless in a way that many other games in the genre fail to deliver. For couples or friends who played Stardew together but wanted more magic and smoother multiplayer, Fae Farm is the best recommendation. Check for sales — it frequently drops to $20-25.",
    why_zh:
      '精灵农场（2023 年）将自己定位为合作版星露谷替代品，并在这方面取得了成功：最多 4 名玩家可以在共享进度中一起农耕、挖矿、钓鱼和探索，这在该类型中尤为罕见。相比星露谷的创新点是魔法系统——你解锁咒语，让你可以立即浇灌大片区域、为解谜创建漂浮平台，以及附魔你的装备。世界分为几个不同的生物群落，有不同的魔法生物和设计风格。视觉美学是柔和奇幻风格，有发光元素和温暖照明。评论者一致指出，合作实现的无缝程度是许多该类型其他游戏未能做到的。对于想要更多魔法和更流畅多人游戏的情侣或朋友，精灵农场是最好的推荐。留意特卖——它经常降至 20-25 美元。',
    why_zhTW:
      '精靈農場（2023 年）將自己定位為合作版星露谷替代品，並在這方面取得了成功：最多 4 名玩家可以在共享進度中一起農耕、挖礦、釣魚和探索，這在該類型中尤為罕見。相比星露谷的創新點是魔法系統——你解鎖咒語，讓你可以立即澆灌大片區域、為解謎創建漂浮平台，以及附魔你的裝備。世界分為幾個不同的生物群落，有不同的魔法生物和設計風格。視覺美學是柔和奇幻風格，有發光元素和溫暖照明。評論者一致指出，合作實現的無縫程度是許多該類型其他遊戲未能做到的。對於想要更多魔法和更流暢多人遊戲的情侶或朋友，精靈農場是最好的推薦。留意特賣——它經常降至 20-25 美元。',
    why_ja:
      'Fae Farm（2023年）は、co-op版スターデューバレーとして真正面から挑んだ作品で、その点では見事に成功しています。最大4人が共有の進行状況で一緒に農業・採掘・釣り・探索を楽しめるのは、このジャンルではまだ珍しいこと。スターデューとの最大の違いは魔法システム——広い範囲に一度に水をやる呪文、パズルを解くための空中プラットフォームの生成、装備への魔法付与などが解放されていきます。世界は複数の異なるバイオームに分かれており、それぞれ独自の魔法生物とビジュアルスタイルがあります。ビジュアルは柔らかなファンタジー調で、発光エフェクトと温かな照明が印象的。co-opの実装がシームレスだという点は多くのレビュアーが口を揃えて指摘しており、同ジャンル内でも際立っています。スターデューを一緒にプレイしていたカップルや友達で、もっと魔法と快適なマルチプレイを求めているなら、Fae Farmはベストの選択肢です。セール時は2,700〜3,400円ほどになることも多いのでチェックしてみて。',
    why_ko:
      'Fae Farm(2023)은 협동 버전 스타듀 밸리를 표방하며 그 목표를 성공적으로 달성한 게임입니다. 최대 4명이 공유 진행 상황에서 함께 농사, 광산, 낚시, 탐험을 즐길 수 있는데, 이는 이 장르에서 여전히 드문 일이에요. 스타듀 밸리와의 가장 큰 차이점은 마법 시스템 — 넓은 범위에 한 번에 물을 주는 주문, 퍼즐 해결을 위한 공중 발판 생성, 장비 마법 부여 등을 해금해 나갑니다. 세계는 여러 개의 서로 다른 바이옴으로 나뉘어 있고 각각 고유한 마법 생물과 디자인 스타일을 가지고 있어요. 비주얼은 발광 요소와 따뜻한 조명이 인상적인 소프트 판타지 스타일. 협동 구현이 매끄럽다는 점은 많은 리뷰어들이 공통으로 언급하는 부분으로, 이 장르에서도 돋보입니다. 함께 스타듀를 플레이했던 커플이나 친구들이 더 많은 마법과 원활한 멀티플레이를 원한다면, Fae Farm이 최고의 선택입니다. 세일도 자주 하니 확인해 보세요.',
    why_de:
      'Fae Farm (2023) positioniert sich direkt als Co-op-Alternative zu Stardew Valley — und liefert: Bis zu 4 Spieler können gemeinsam farmen, minen, angeln und erkunden, mit geteiltem Fortschritt, was im Genre nach wie vor selten ist. Der Unterschied zu Stardew liegt im Zaubersystem — du lernst Sprüche, mit denen du große Flächen sofort bewässern, für Rätsel schwebende Plattformen erstellen und deine Ausrüstung verzaubern kannst. Die Welt ist in mehrere unterschiedliche Biome aufgeteilt, jedes mit eigenen Zauberwesen und Designstil. Die Ästhetik ist sanft-fantastisch, mit glühenden Elementen und warmer Beleuchtung. Rezensenten heben einheitlich hervor, dass die Co-op-Implementierung nahtloser ist als bei vielen anderen Spielen im Genre. Für Paare oder Freunde, die Stardew zusammen gespielt haben und mehr Magie und reibungslosen Multiplayer wollten, ist Fae Farm die beste Empfehlung. Halte nach Sales Ausschau — es fällt regelmäßig auf 20–25 €.',
    tip_en: "Invest your early Florins in upgrading your watering can and unlocking the area-effect water spell as soon as possible — it transforms the farming loop from time-consuming to effortless.",
    tip_zh: '尽早将你早期的 Florin 投入升级你的浇水壶并解锁范围效果浇水咒语——它将农耕循环从耗时变为轻松。',
    tip_zhTW: '儘早將你早期的 Florin 投入升級你的澆水壺並解鎖範圍效果澆水咒語——它將農耕循環從耗時變為輕鬆。',
    tip_ja: '序盤のFlorinはじょうろのアップグレードと範囲水やり呪文の解放に優先投資しよう——農業ループが一気にラクになります。',
    tip_ko: '초반 Florin을 물조리개 업그레이드와 광역 물주기 주문 해금에 우선 투자하세요 — 농사 루프가 훨씬 편해집니다.',
    tip_de: 'Investiere frühe Florins in das Upgrade der Gießkanne und schalte so früh wie möglich den Flächen-Wasserzauber frei — er verwandelt die Farming-Schleife von zeitaufwendig zu mühelos.',
  },
  'roots-of-pacha': {
    title_en: 'Roots of Pacha',
    title_zh: '帕恰之根',
    title_zhTW: '帕恰之根',
    title_ja: 'Roots of Pacha',
    title_ko: 'Roots of Pacha',
    title_de: 'Roots of Pacha',
    emoji: '🦴',
    tag_en: 'A Stone Age cozy farming sim — the only one of its kind, and surprisingly heartwarming',
    tag_zh: '石器时代 cozy 农场模拟——同类中唯一一款，出人意料地温馨感人',
    tag_zhTW: '石器時代 cozy 農場模擬——同類中唯一一款，出人意料地溫馨感人',
    tag_ja: '石器時代のほのぼの農業シム——このジャンルで唯一無二、想像以上に心温まる作品',
    tag_ko: '석기시대 코지 농장 시뮬레이터 — 이 장르에서 유일한 작품, 의외로 따뜻하고 감동적인',
    tag_de: 'Eine steinzeitliche Cozy-Farming-Sim — die einzige ihrer Art, und überraschend herzerwärmend',
    platform_en: 'Available on: PC (Steam, GOG, Epic), Nintendo Switch, PlayStation 4/5, Xbox — about $30',
    platform_zh: '可在以下平台获取：PC（Steam、GOG、Epic）、Nintendo Switch、PlayStation 4/5、Xbox——约 30 美元',
    platform_zhTW: '可在以下平台獲取：PC（Steam、GOG、Epic）、Nintendo Switch、PlayStation 4/5、Xbox——約 30 美元',
    platform_ja: 'PC（Steam、GOG、Epic）、Nintendo Switch、PlayStation 4/5、Xboxで遊べます——定価約4,100円',
    platform_ko: '출시 플랫폼: PC(Steam, GOG, Epic), Nintendo Switch, PlayStation 4/5, Xbox — 약 ₩40,000',
    platform_de: 'Erhältlich auf: PC (Steam, GOG, Epic), Nintendo Switch, PlayStation 4/5, Xbox — ca. 30 €',
    why_en:
      "Roots of Pacha (2023) is the most original setting in the cozy farming genre: you are a member of a prehistoric clan learning to farm, fish, and forge relationships at the dawn of civilization. The core mechanics are familiar (farm plots, relationship hearts, seasonal crops, a shared community center equivalent), but everything is filtered through a Stone Age lens: tools are made of bone and stone, crops are being domesticated for the first time, discoveries feel genuinely significant, and the visual style uses cave-painting aesthetics for maps and records. The community-building aspect is exceptionally strong — as you befriend clanmates, they teach new skills or unlock new abilities in a way that feels like collective discovery rather than individual progression. Multiplayer is available. One of the most distinctive takes on the farming sim genre in recent years, often overlooked in favor of more obviously marketed games.",
    why_zh:
      '帕恰之根（2023 年）是 cozy 农场类型中最具原创性的设定：你是一个史前部落的成员，在文明曙光时学习农耕、钓鱼和建立关系。核心机制很熟悉（农场地块、关系之心、季节性作物、共享社区中心等价物），但一切都通过石器时代的视角过滤：工具由骨头和石头制成，作物第一次被驯化，发现感觉真正重要，视觉风格使用洞穴画美学作为地图和记录。社区建设方面异常强大——当你与部落成员交朋友时，他们会以集体发现而非个人进步的感觉教授新技能或解锁新能力。多人游戏可用。近年来农场模拟类型中最具特色的演绎之一，经常被更明显营销的游戏所掩盖。',
    why_zhTW:
      '帕恰之根（2023 年）是 cozy 農場類型中最具原創性的設定：你是一個史前部落的成員，在文明曙光時學習農耕、釣魚和建立關係。核心機制很熟悉（農場地塊、關係之心、季節性作物、共享社區中心等價物），但一切都通過石器時代的視角過濾：工具由骨頭和石頭製成，作物第一次被馴化，發現感覺真正重要，視覺風格使用洞穴畫美學作為地圖和記錄。社區建設方面異常強大——當你與部落成員交朋友時，他們會以集體發現而非個人進步的感覺教授新技能或解鎖新能力。多人遊戲可用。近年來農場模擬類型中最具特色的演繹之一，經常被更明顯營銷的遊戲所掩蓋。',
    why_ja:
      'Roots of Pacha（2023年）は、ほのぼの農業ジャンルで最もオリジナリティの高い舞台設定を持つ作品です。あなたは文明の夜明け、農耕・漁・人間関係の築き方を学びながら生きる先史時代の部族の一員。基本的なシステムは馴染みやすい（農場区画、好感度ハート、季節の作物、共有コミュニティセンター的なもの）ですが、すべてが石器時代のフィルターを通して描かれます。道具は骨や石でできており、作物は初めて栽培されるもので、発見の一つひとつが本当に意義深く感じられ、洞窟絵画の美学がマップや記録に使われています。コミュニティ構築の要素が特に充実していて、部族員と仲良くなるにつれて新しいスキルを教えてもらったり、新しい能力が解放されたりする流れが、個人の成長ではなく集団としての発見のように感じられます。マルチプレイにも対応。近年の農業シムの中でも最も独創的な作品のひとつで、派手なマーケティングのゲームに隠れがちですが要チェックです。',
    why_ko:
      'Roots of Pacha(2023)는 코지 농장 장르에서 가장 독창적인 배경을 가진 게임입니다. 문명의 여명기, 농업과 낚시와 인간관계를 배워가는 선사시대 부족의 일원이 됩니다. 핵심 메커니즘은 익숙해요(농장 구획, 관계 하트, 계절 작물, 공유 커뮤니티 센터 역할). 하지만 모든 것이 석기시대의 렌즈로 표현됩니다. 도구는 뼈와 돌로 만들어지고, 작물은 처음 재배되는 것이며, 발견 하나하나가 진짜 의미 있게 느껴지고, 지도와 기록에는 동굴 벽화 미학이 쓰입니다. 커뮤니티 구축 측면이 특히 강력한데, 부족원들과 친해지면 새로운 기술을 가르쳐주거나 새 능력이 해금되는 과정이 개인적 성장이 아닌 집단적 발견처럼 느껴집니다. 멀티플레이도 지원합니다. 최근 농장 시뮬레이션 장르에서 가장 독창적인 작품 중 하나인데, 더 화려하게 마케팅되는 게임들에 가려져 있어 아쉬운 숨겨진 명작이에요.',
    why_de:
      'Roots of Pacha (2023) bietet das originellste Setting im Cozy-Farming-Genre: Du bist Mitglied eines prähistorischen Clans, der im Morgengrauen der Zivilisation lernt zu farmen, zu fischen und Beziehungen aufzubauen. Die Kernmechaniken sind vertraut (Farmfelder, Herzen für Beziehungen, saisonale Pflanzen, ein gemeinsames Gemeinschaftsprojekt), aber alles wird durch eine steinzeitliche Linse dargestellt: Werkzeuge aus Knochen und Stein, Pflanzen werden zum ersten Mal domestiziert, Entdeckungen fühlen sich wirklich bedeutsam an, und die Karten nutzen Höhlenmalerei-Ästhetik. Der Gemeinschaftsaufbau ist besonders stark — wenn du Clanmitglieder anfreundest, lehren sie neue Fähigkeiten oder schalten Fähigkeiten frei, was sich wie kollektive Entdeckung anfühlt, nicht individueller Fortschritt. Multiplayer ist verfügbar. Eines der unverwechselbarsten Farming-Sims der letzten Jahre, das oft von marketingstärkeren Spielen überschattet wird.',
    tip_en: "Talk to every clanmate every day even if their dialogue seems repetitive — the discovery triggers that unlock new technologies are tied to friendship levels, not story events.",
    tip_zh: '即使他们的对话似乎重复，也要每天与每个部落成员交谈——解锁新技术的发现触发器与友谊等级相关，而不是故事事件。',
    tip_zhTW: '即使他們的對話似乎重複，也要每天與每個部落成員交談——解鎖新技術的發現觸發器與友誼等級相關，而不是故事事件。',
    tip_ja: 'セリフが繰り返しに感じても、毎日全員に話しかけよう——新技術を解放する発見トリガーは、ストーリーイベントではなく友好度に紐付いています。',
    tip_ko: '대화가 반복되는 것처럼 느껴져도 매일 모든 부족원에게 말을 걸어보세요 — 새 기술을 해금하는 발견 트리거는 스토리 이벤트가 아닌 우정 레벨과 연결되어 있습니다.',
    tip_de: 'Sprich täglich mit jedem Clanmitglied, auch wenn ihre Dialoge sich wiederholen — die Entdeckungsauslöser, die neue Technologien freischalten, hängen von Freundschaftsstufen ab, nicht von Story-Events.',
  },
  'potion-permit': {
    title_en: 'Potion Permit',
    title_zh: '药水许可证',
    title_zhTW: '藥水許可證',
    title_ja: 'Potion Permit',
    title_ko: 'Potion Permit',
    title_de: 'Potion Permit',
    emoji: '⚗️',
    tag_en: 'A cozy life sim where you play as a doctor in a small coastal town — healing villagers, earning trust',
    tag_zh: '一款 cozy 生活模拟游戏，你扮演小沿海小镇的医生——治愈村民，赢得信任',
    tag_zhTW: '一款 cozy 生活模擬遊戲，你扮演小沿海小鎮的醫生——治癒村民，贏得信任',
    tag_ja: '小さな海沿いの町の医師として村人の病気を治し、信頼を勝ち取るほのぼの生活シム',
    tag_ko: '소박한 해안 마을의 의사로서 주민들을 치료하고 신뢰를 쌓아가는 코지 생활 시뮬레이터',
    tag_de: 'Ein Cozy-Life-Sim, in dem du als Arzt einer kleinen Küstenstadt spielst — Bewohner heilen, Vertrauen gewinnen',
    platform_en: 'Available on: PC (Steam), Nintendo Switch, PlayStation 4/5, Xbox — about $20',
    platform_zh: '可在以下平台获取：PC（Steam）、Nintendo Switch、PlayStation 4/5、Xbox——约 20 美元',
    platform_zhTW: '可在以下平台獲取：PC（Steam）、Nintendo Switch、PlayStation 4/5、Xbox——約 20 美元',
    platform_ja: 'PC（Steam）、Nintendo Switch、PlayStation 4/5、Xboxで遊べます——定価約2,700円',
    platform_ko: '출시 플랫폼: PC(Steam), Nintendo Switch, PlayStation 4/5, Xbox — 약 ₩26,000',
    platform_de: 'Erhältlich auf: PC (Steam), Nintendo Switch, PlayStation 4/5, Xbox — ca. 20 €',
    why_en:
      "Potion Permit (2022) occupies a unique niche in the cozy genre: you are a chemist-doctor sent from the capital city to a conservative small coastal town called Moonbury that distrusts outsiders. Your job is to earn the town's trust by treating their illnesses — gathering ingredients from the surrounding wilderness, diagnosing patients through a simple symptom-matching minigame, and brewing the right potions. As you gain trust, the town opens up: new areas unlock, NPCs share their backstories, and the community gradually warms to you. The relationship-building has real depth, and the plot has more drama than most cozy games (there is an actual mystery about why Moonbury rejected modern medicine). At about 15-25 hours, it is one of the most content-rich cozy games in its price range. The pixel art is charming, the coastal setting is beautiful, and the daily loop is satisfying without being demanding.",
    why_zh:
      '药水许可证（2022 年）在 cozy 类型中占据独特的细分市场：你是一位从首都城市被派往一个不信任外来者的保守小沿海小镇 Moonbury 的化学家-医生。你的工作是通过治疗他们的疾病来赢得小镇的信任——从周围的荒野采集食材，通过简单的症状匹配小游戏诊断患者，并调制正确的药水。随着你获得信任，小镇逐渐开放：新区域解锁，NPC 分享他们的背景故事，社区逐渐对你热情起来。关系建设有真正的深度，情节比大多数 cozy 游戏有更多戏剧性（有一个关于为什么 Moonbury 拒绝现代医学的真实谜题）。大约 15-25 小时，是其价位中内容最丰富的 cozy 游戏之一。像素艺术迷人，海岸设定美丽，日常循环令人满足而不要求苛刻。',
    why_zhTW:
      '藥水許可證（2022 年）在 cozy 類型中占據獨特的細分市場：你是一位從首都城市被派往一個不信任外來者的保守小沿海小鎮 Moonbury 的化學家-醫生。你的工作是通過治療他們的疾病來贏得小鎮的信任——從周圍的荒野採集食材，通過簡單的症狀匹配小遊戲診斷患者，並調製正確的藥水。隨著你獲得信任，小鎮逐漸開放：新區域解鎖，NPC 分享他們的背景故事，社區逐漸對你熱情起來。關係建設有真正的深度，情節比大多數 cozy 遊戲有更多戲劇性（有一個關於為什麼 Moonbury 拒絕現代醫學的真實謎題）。大約 15-25 小時，是其價位中內容最豐富的 cozy 遊戲之一。像素藝術迷人，海岸設定美麗，日常循環令人滿足而不要求苛刻。',
    why_ja:
      'Potion Permit（2022年）はコージーゲームの中でも独自の立ち位置を持っています。あなたは首都から、外来者を信用しない保守的な小さな海辺の町「ムーンベリー」に派遣された薬剤師兼医師。仕事は町の信頼を勝ち取ること——近くの自然からアイテムを採取し、症状マッチングのミニゲームで患者を診断し、適切な薬を調合します。信頼が高まるにつれて町は少しずつ開いていきます。新エリアが解放され、NPCが自分の過去を語り始め、コミュニティが徐々に心を開いていきます。人間関係の構築には深みがあり、ストーリーも多くのコージーゲームよりドラマチック——なぜムーンベリーが現代医学を拒んだのかという謎が存在します。プレイ時間は約15〜25時間で、価格帯の中でもコスパの高い一本です。ドットグラフィックが可愛く、海辺の風景も美しく、毎日のルーティンが無理なく楽しめます。',
    why_ko:
      'Potion Permit(2022)는 코지 장르 내에서 독특한 위치를 차지합니다. 외부인을 불신하는 보수적인 작은 해안 마을 Moonbury로 파견된 화학자-의사로 플레이합니다. 임무는 주민들의 병을 치료해 마을의 신뢰를 얻는 것 — 주변 자연에서 재료를 채집하고, 간단한 증상 매칭 미니게임으로 환자를 진단하고, 올바른 약을 조제합니다. 신뢰가 쌓이면 마을이 조금씩 열려요. 새 구역이 해금되고, NPC들이 자신의 과거를 털어놓고, 커뮤니티가 점차 마음을 열어갑니다. 인간관계 구축에 깊이가 있고, 스토리도 대부분의 코지 게임보다 드라마틱해요(Moonbury가 현대 의학을 거부한 이유에 관한 진짜 미스터리가 존재합니다). 약 15~25시간 분량으로, 이 가격대에서 가장 콘텐츠가 풍부한 코지 게임 중 하나입니다. 픽셀 아트가 매력적이고, 해안 배경도 아름다우며, 일상 루틴이 부담 없이 즐겁습니다.',
    why_de:
      'Potion Permit (2022) besetzt eine einzigartige Nische im Cozy-Genre: Du bist ein Chemiker-Arzt, der aus der Hauptstadt in die konservative Küstenstadt Moonbury geschickt wird, die Außenseiter misstraut. Deine Aufgabe ist es, das Vertrauen der Stadt zu gewinnen — indem du Zutaten aus der Wildnis sammelst, Patienten durch ein einfaches Symptom-Matching-Minispiel diagnostizierst und die richtigen Tränke braust. Mit steigendem Vertrauen öffnet sich die Stadt: Neue Bereiche schalten frei, NPCs erzählen ihre Hintergrundgeschichten, und die Gemeinschaft wärmt sich langsam auf. Der Beziehungsaufbau hat echte Tiefe, und die Handlung ist dramatischer als in den meisten Cozy Games (es gibt ein echtes Rätsel darum, warum Moonbury die moderne Medizin ablehnte). Mit etwa 15–25 Stunden gehört es zu den inhaltlich reichsten Cozy Games in seiner Preisklasse. Die Pixelgrafik ist charmant, die Küstenkulisse schön, und der Tagesablauf ist befriedigend, ohne zu fordern.',
    tip_en: "Upgrade your gathering tools as soon as materials allow — the movement speed and tool efficiency upgrades have a bigger quality-of-life impact here than in most farming games because you gather from the wilderness, not a static farm plot.",
    tip_zh: '一旦材料允许就升级你的采集工具——移动速度和工具效率升级对生活质量的影响比大多数农场游戏更大，因为你从荒野而不是静态农场地块采集。',
    tip_zhTW: '一旦材料允許就升級你的採集工具——移動速度和工具效率升級對生活質量的影響比大多數農場遊戲更大，因為你從荒野而不是靜態農場地塊採集。',
    tip_ja: '素材が揃ったらすぐに採集ツールをアップグレードしよう——静的な農場ではなく自然の中から採集するこのゲームでは、移動速度とツール効率の向上が他の農業ゲームより大きなQOL向上をもたらします。',
    tip_ko: '재료가 허락하는 즉시 채집 도구를 업그레이드하세요 — 정적인 농장이 아닌 자연에서 채집하는 이 게임에서 이동 속도와 도구 효율 업그레이드는 다른 농장 게임보다 훨씬 큰 삶의 질 향상을 가져옵니다.',
    tip_de: 'Upgrade deine Sammelwerkzeuge, sobald das Material vorhanden ist — Bewegungsgeschwindigkeit und Werkzeugeffizienz haben hier einen größeren Quality-of-Life-Effekt als in den meisten Farming-Spielen, weil du aus der freien Natur sammelst und nicht von einem festen Farmfeld.',
  },
}

function calcResult(answers: Pick[]): Pick {
  const counts: Record<Pick, number> = {
    ooblets: 0,
    'fae-farm': 0,
    'roots-of-pacha': 0,
    'potion-permit': 0,
  }
  for (const a of answers) counts[a]++
  return Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0] as Pick
}

export function CozyNextStepQuiz({ locale }: { locale: string }) {
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
    const url = `${BASE_URL}/${locale}/quizzes/cozy-next-step`
    const shareText =
      locale === 'zh'
        ? `玩完星露谷，我的下一步是「${result.title_zh}」！${result.tag_zh}。找到你的：${url}`
        : locale === 'zh-TW'
        ? `玩完星露谷，我的下一步是「${result.title_zhTW}」！${result.tag_zhTW}。找到你的：${url}`
        : locale === 'ja'
        ? `スターデューバレーの後、私の次のゲームは「${result.title_ja}」！${result.tag_ja}。あなたも探してみよう：${url}`
        : locale === 'ko'
        ? `스타듀 밸리 이후 내 다음 코지 게임은 「${result.title_ko}」！${result.tag_ko}. 나만의 게임 찾기：${url}`
        : locale === 'de'
        ? `Nach Stardew Valley ist mein nächstes Cozy Game ${result.title_de} — ${result.tag_de}. Finde deins: ${url}`
        : `After Stardew Valley, my next cozy game is ${result.title_en} — ${result.tag_en}. Find yours: ${url}`

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
              {getLoc('上手小贴士：', 'Getting started: ', '上手小貼士：', '序盤のコツ：', '시작 팁：', 'Einstiegstipp: ')}
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
            '玩完星露谷和动物之森，你该玩什么？',
            'What to Play After Stardew Valley and Animal Crossing?',
            '玩完星露谷和動物之森，你該玩什麼？',
            'スターデューバレーとどうぶつの森をやり尽くした後、次は何を遊ぶ？',
            '스타듀 밸리와 모동숲을 다 해봤다면, 다음엔 어떤 게임을?',
            'Was spielst du nach Stardew Valley und Animal Crossing?',
          )}
        </h1>
        <p className="text-sm text-[#8a9a7a]">
          {getLoc(
            '6 个问题，在 Ooblets、精灵农场、帕恰之根和药水许可证中找到你的下一款 Cozy 游戏——每款都有星露谷没有的独特特色',
            '6 questions to find your next cozy game — Ooblets, Fae Farm, Roots of Pacha, or Potion Permit. Each brings something Stardew and ACNH never had.',
            '6 個問題，在 Ooblets、精靈農場、帕恰之根和藥水許可證中找到你的下一款 Cozy 遊戲——每款都有星露谷沒有的獨特特色',
            '6つの質問で次のコージーゲームを見つけよう——Ooblets、Fae Farm、Roots of Pacha、Potion Permitの中から、スターデューにはない魅力を持つゲームがあなたを待っています',
            '6가지 질문으로 나의 다음 코지 게임을 찾아보세요 — Ooblets, Fae Farm, Roots of Pacha, Potion Permit 중에서, 스타듀 밸리에 없었던 매력을 가진 게임이 기다리고 있어요',
            '6 Fragen, um dein nächstes Cozy Game zu finden — Ooblets, Fae Farm, Roots of Pacha oder Potion Permit. Jedes bringt etwas, das Stardew Valley und ACNH nie hatten.',
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
        {getLoc('找到我的下一步', 'Find My Next Game', '找到我的下一步', '次のゲームを見つける', '내 다음 게임 찾기', 'Mein nächstes Spiel finden')}
      </button>
    </div>
  )
}
