'use client'

import { useState } from 'react'
import { BASE_URL } from '@/lib/config'

type Pick = 'bear-and-breakfast' | 'minekos-night-market' | 'eastward' | 'potionomics'

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
  const copyLabel = (() => {
    if (locale === 'zh') return copied ? '✓ 已复制！' : '📋 复制结果'
    if (locale === 'zh-TW') return copied ? '✓ 已複製！' : '📋 複製結果'
    if (locale === 'ja') return copied ? '✓ コピーしました！' : '📋 コピーする'
    if (locale === 'ko') return copied ? '✓ 복사되었습니다!' : '📋 결과 복사'
    if (locale === 'de') return copied ? '✓ Kopiert!' : '📋 Ergebnis kopieren'
    return copied ? '✓ Copied!' : '📋 Copy result'
  })()
  const shareLabel = (() => {
    if (locale === 'zh' || locale === 'zh-TW') return '分享'
    if (locale === 'ja') return 'シェア'
    if (locale === 'ko') return '공유'
    if (locale === 'de') return 'Teilen'
    return 'Share'
  })()
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
    q_en: 'Which core loop sounds most satisfying to you?',
    q_zh: '哪种核心循环对你来说最令人满足？',
    q_zhTW: '哪種核心循環對你來說最令人滿足？',
    q_ja: 'どのコアループが一番楽しそうですか？',
    q_ko: '어떤 핵심 루프가 가장 만족스럽게 느껴지나요?',
    q_de: 'Welcher Kernloop klingt für dich am befriedigendsten?',
    options: [
      {
        en: 'Decorating and improving a place so guests are happier each time they visit',
        zh: '装饰和改善一个地方，让客人每次拜访都更开心',
        zhTW: '裝飾和改善一個地方，讓客人每次拜訪都更開心',
        ja: '場所を飾り付けて改善して、ゲストが来るたびに喜んでもらえるようにする',
        ko: '장소를 꾸미고 개선해서 손님이 방문할 때마다 더 행복하게 만들기',
        de: 'Einen Ort dekorieren und verbessern, damit sich Gäste bei jedem Besuch wohler fühlen',
        type: 'bear-and-breakfast',
      },
      {
        en: 'Making things with my hands and bringing them to a market to see what people want',
        zh: '用双手制作东西，带到市场看看人们想要什么',
        zhTW: '用雙手製作東西，帶到市場看看人們想要什麼',
        ja: '手でものを作って、市場に持っていって人々が何を求めているか見る',
        ko: '손으로 물건을 만들어 시장에 가져가서 사람들이 원하는 게 뭔지 보기',
        de: 'Dinge mit den Händen herstellen und sie zum Markt bringen, um zu sehen, was die Leute wollen',
        type: 'minekos-night-market',
      },
      {
        en: 'Moving through a world and experiencing a story that unfolds as I explore',
        zh: '在世界中移动，体验随着我探索而展开的故事',
        zhTW: '在世界中移動，體驗隨著我探索而展開的故事',
        ja: '世界を旅しながら、探索するにつれて展開するストーリーを体験する',
        ko: '세계를 이동하면서 탐험할수록 펼쳐지는 이야기 경험하기',
        de: 'Durch eine Welt reisen und eine Geschichte erleben, die sich beim Erkunden entfaltet',
        type: 'eastward',
      },
      {
        en: 'Getting strategically better at social negotiations until I can beat anyone in a deal',
        zh: '在社交谈判上变得更加战略性，直到我能在任何交易中胜出',
        zhTW: '在社交談判上變得更加戰略性，直到我能在任何交易中勝出',
        ja: '社交交渉で戦略的に上達して、どんな取引でも勝てるようになる',
        ko: '사교적 협상에서 전략적으로 발전해서 어떤 거래에서도 이길 수 있을 때까지',
        de: 'Strategisch besser in sozialen Verhandlungen werden, bis ich jeden Deal gewinnen kann',
        type: 'potionomics',
      },
    ],
  },
  {
    q_en: 'Which setting sounds most appealing?',
    q_zh: '哪种设定听起来最吸引你？',
    q_zhTW: '哪種設定聽起來最吸引你？',
    q_ja: 'どの舞台設定が一番魅力的ですか？',
    q_ko: '어떤 배경이 가장 매력적으로 느껴지나요?',
    q_de: 'Welches Setting klingt für dich am ansprechendsten?',
    options: [
      {
        en: 'A growing woodland B&B run by a bear who gives every room a different theme and personally greets each animal guest',
        zh: '一家不断扩大的林地民宿，由一只熊经营，每个房间都有不同的主题，并亲自迎接每位动物客人',
        zhTW: '一家不斷擴大的林地民宿，由一隻熊經營，每個房間都有不同的主題，並親自迎接每位動物客人',
        ja: '熊が経営する森の中のB&Bで、部屋ごとに異なるテーマがあり、動物のゲストを一人ひとり出迎える',
        ko: '곰이 운영하는 숲속 B&B로, 방마다 다른 테마가 있고 동물 손님을 직접 맞이하는 곳',
        de: 'Eine wachsende Waldpension, betrieben von einem Bären, der jedem Zimmer ein eigenes Thema gibt und jeden tierischen Gast persönlich begrüßt',
        type: 'bear-and-breakfast',
      },
      {
        en: 'A small Japanese coastal town full of cats where a girl prepares handmade goods for seasonal night markets',
        zh: '一个充满猫咪的日本海滨小镇，一个女孩在这里为季节性夜市准备手工商品',
        zhTW: '一個充滿貓咪的日本海濱小鎮，一個女孩在這裡為季節性夜市準備手工商品',
        ja: '猫がたくさんいる日本の海沿いの小さな町で、女の子が季節ごとの夜市のために手作り品を準備する',
        ko: '고양이로 가득한 일본 해안 마을에서 한 소녀가 계절 야시장을 위해 수제 상품을 준비하는 곳',
        de: 'Eine kleine japanische Küstenstadt voller Katzen, in der ein Mädchen handgefertigte Waren für saisonale Nachtmärkte vorbereitet',
        type: 'minekos-night-market',
      },
      {
        en: 'A post-apocalyptic world where something ended long ago but people kept living, and you are traveling through it cooking noodles along the way',
        zh: '一个末日后的世界，很久以前某事终结但人们继续生活，你穿越其中，沿途烹饪面条',
        zhTW: '一個末日後的世界，很久以前某事終結但人們繼續生活，你穿越其中，沿途烹飪麵條',
        ja: '何かが終わって久しい世界だけど、人々は生き続けていて、旅しながら麺料理を作る',
        ko: '오래전 무언가가 끝났지만 사람들이 계속 살아가는 포스트 아포칼립스 세계를 여행하며 국수를 요리하는 곳',
        de: 'Eine postapokalyptische Welt, in der irgendetwas schon lange vorbei ist, die Menschen aber weitergemacht haben — und du reist durch sie hindurch und kochst dabei Nudelgerichte',
        type: 'eastward',
      },
      {
        en: 'A bustling magical city where you own a potion shop, and your reputation among adventurers and wizards determines who walks through your door',
        zh: '一个熙熙攘攘的魔法城市，你拥有一家药水店，你在冒险者和巫师中的声誉决定谁走进你的门',
        zhTW: '一個熙熙攘攘的魔法城市，你擁有一家藥水店，你在冒險者和巫師中的聲譽決定誰走進你的門',
        ja: '賑やかな魔法の都市でポーション屋を経営していて、冒険者や魔法使いの間での評判がどんな客が来るかを決める',
        ko: '번화한 마법 도시에서 물약 가게를 운영하며, 모험가와 마법사 사이의 명성에 따라 누가 찾아오는지 결정되는 곳',
        de: 'Eine belebte Magikerstadt, in der du einen Tranksladen besitzt und dein Ruf unter Abenteurern und Magiern entscheidet, wer zur Tür hereinkommt',
        type: 'potionomics',
      },
    ],
  },
  {
    q_en: 'What do you want to come back to each play session?',
    q_zh: '你希望每次游戏时回来做什么？',
    q_zhTW: '你希望每次遊戲時回來做什麼？',
    q_ja: 'プレイするたびに何をしたいと思いますか？',
    q_ko: '매번 게임 세션에서 무엇을 하고 싶으신가요?',
    q_de: 'Was willst du bei jeder Spielsession tun?',
    options: [
      {
        en: 'Check on the B&B — see new guest reviews, decide what to renovate, unlock a new room theme',
        zh: '检查民宿——查看新客人评价、决定翻修什么、解锁新房间主题',
        zhTW: '查看民宿——查看新客人評價、決定翻修什麼、解鎖新房間主題',
        ja: 'B&Bの様子を確認する——新しいゲストのレビューを見て、何をリノベートするか決めて、新しい部屋テーマを解放する',
        ko: 'B&B 확인하기 — 새 손님 리뷰 보기, 무엇을 리노베이션할지 결정하기, 새 방 테마 열기',
        de: 'Nach der Pension sehen — neue Gastbewertungen checken, entscheiden, was renoviert wird, und ein neues Zimmerthema freischalten',
        type: 'bear-and-breakfast',
      },
      {
        en: 'See what new crafting recipes unlocked and which festival items are trending this week',
        zh: '查看解锁了哪些新制作配方，以及本周哪些节日物品正在流行',
        zhTW: '查看解鎖了哪些新製作配方，以及本週哪些節日物品正在流行',
        ja: '新しいクラフトレシピが解放されたか確認して、今週のフェスティバルアイテムのトレンドをチェックする',
        ko: '어떤 새 제작 레시피가 열렸는지 확인하고 이번 주 축제 아이템 트렌드 보기',
        de: 'Sehen, welche neuen Craft-Rezepte freigeschaltet wurden, und welche Festival-Items diese Woche im Trend liegen',
        type: 'minekos-night-market',
      },
      {
        en: 'Continue the story — I want to know what happens to the characters I left mid-journey',
        zh: '继续故事——我想知道我中途离开的角色发生了什么',
        zhTW: '繼續故事——我想知道我中途離開的角色發生了什麼',
        ja: 'ストーリーの続きを見る——途中で離れたキャラクターたちに何が起きたか知りたい',
        ko: '이야기 계속하기 — 중간에 떠난 캐릭터들에게 어떤 일이 일어났는지 알고 싶어요',
        de: 'Die Geschichte weiterspielen — ich will wissen, was mit den Charakteren passiert, bei denen ich mittendrin aufgehört habe',
        type: 'eastward',
      },
      {
        en: 'Level up my negotiation deck and try the new customers who arrived in the city',
        zh: '升级我的谈判牌组，尝试新到城市的客户',
        zhTW: '升級我的談判牌組，嘗試新到城市的客戶',
        ja: 'ネゴシエーションデッキをレベルアップして、街に新しく来た客を試す',
        ko: '협상 덱을 강화하고 도시에 새로 온 고객들에게 도전하기',
        de: 'Mein Verhandlungsdeck verbessern und die neuen Kunden ausprobieren, die in der Stadt angekommen sind',
        type: 'potionomics',
      },
    ],
  },
  {
    q_en: 'How do you feel about management complexity in games?',
    q_zh: '你如何看待游戏中的管理复杂性？',
    q_zhTW: '你如何看待遊戲中的管理複雜性？',
    q_ja: 'ゲームの管理要素の複雑さについてどう思いますか？',
    q_ko: '게임에서 관리 복잡성에 대해 어떻게 생각하시나요?',
    q_de: 'Wie stehst du zur Management-Komplexität in Spielen?',
    options: [
      {
        en: 'Love it — I want to juggle rooms, furniture, guest satisfaction ratings, and seasonal bookings',
        zh: '喜欢——我想要同时处理房间、家具、客人满意度评分和季节性预订',
        zhTW: '喜歡——我想要同時處理房間、家具、客人滿意度評分和季節性預訂',
        ja: '大好き——部屋や家具、ゲストの満足度評価、季節の予約を全部こなしたい',
        ko: '좋아요 — 방, 가구, 손님 만족도 평점, 계절별 예약을 전부 관리하고 싶어요',
        de: 'Liebe ich — ich will Zimmer, Möbel, Gästezufriedenheit und saisonale Buchungen gleichzeitig jonglieren',
        type: 'bear-and-breakfast',
      },
      {
        en: 'A little is fine — crafting resource management is satisfying, but I do not want spreadsheet-level complexity',
        zh: '一点点没问题——制作资源管理令人满足，但我不想要电子表格级别的复杂性',
        zhTW: '一點點沒問題——製作資源管理令人滿足，但我不想要電子表格級別的複雜性',
        ja: '少しならいい——クラフトのリソース管理は楽しいけど、スプレッドシートみたいな複雑さはいらない',
        ko: '조금은 괜찮아요 — 제작 자원 관리는 만족스럽지만 스프레드시트 수준의 복잡성은 원하지 않아요',
        de: 'Ein bisschen ist okay — Ressourcenmanagement beim Crafting macht Spaß, aber ich will keine Tabellenkalkulations-Komplexität',
        type: 'minekos-night-market',
      },
      {
        en: 'Minimal — I want light puzzle-solving and some combat, not management',
        zh: '最小化——我想要轻度谜题解决和一些战斗，而不是管理',
        zhTW: '最小化——我想要輕度謎題解決和一些戰鬥，而不是管理',
        ja: 'できるだけシンプルがいい——軽めのパズルとちょっとした戦闘が欲しいだけで、管理は要らない',
        ko: '최소화 — 가벼운 퍼즐과 약간의 전투를 원하지, 관리는 원하지 않아요',
        de: 'So wenig wie möglich — ich will leichte Rätsel und etwas Kampf, kein Management',
        type: 'eastward',
      },
      {
        en: 'Enjoy it — I specifically want the complexity of building a deck, balancing potion recipes, and learning customer preference patterns',
        zh: '享受它——我特别想要构建牌组、平衡药水配方和学习客户偏好模式的复杂性',
        zhTW: '享受它——我特別想要構建牌組、平衡藥水配方和學習客戶偏好模式的複雜性',
        ja: '楽しめる——デッキ構築、ポーションレシピのバランス調整、顧客の好みを学ぶ複雑さがまさに欲しいもの',
        ko: '즐겨요 — 덱 구성, 물약 레시피 균형 맞추기, 고객 선호 패턴 배우기의 복잡성이 딱 원하는 것이에요',
        de: 'Ich genieße es — genau die Komplexität des Deckbaus, des Ausbalancierens von Tränkrezepten und des Erlernens von Kundenpräferenzen will ich haben',
        type: 'potionomics',
      },
    ],
  },
  {
    q_en: 'Which of these games does your perfect game feel closest to?',
    q_zh: '你的理想游戏感觉最接近以下哪款游戏？',
    q_zhTW: '你的理想遊戲感覺最接近以下哪款遊戲？',
    q_ja: '理想のゲームに一番近いのはどれですか？',
    q_ko: '당신의 이상적인 게임은 다음 중 어느 것에 가장 가깝나요?',
    q_de: 'Welchem dieser Spiele kommt dein perfektes Spiel am nächsten?',
    options: [
      {
        en: 'Animal Crossing meets a hotel management sim — the social warmth of ACNH but with more goal-driven decoration decisions',
        zh: '动物之森遇上酒店管理模拟——ACNH 的社交温暖，但有更多目标驱动的装饰决策',
        zhTW: '動物之森遇上酒店管理模擬——ACNH 的社交溫暖，但有更多目標驅動的裝飾決策',
        ja: 'あつ森×ホテル経営シム——ACNHの温かい交流があって、さらに目標に向かった装飾の判断が増えた感じ',
        ko: '동물의 숲 × 호텔 경영 시뮬레이션 — ACNH의 따뜻한 사회성에 목표 지향적인 인테리어 결정이 더해진 게임',
        de: 'Animal Crossing trifft Hotel-Management-Sim — die soziale Wärme von ACNH, aber mit mehr zielorientierten Einrichtungsentscheidungen',
        type: 'bear-and-breakfast',
      },
      {
        en: 'Stardew Valley set in a Japanese festival town — seasonal crafting cycles, NPC relationships, a cat in every corner',
        zh: '设置在日本节日小镇的星露谷物语——季节性制作循环、NPC 关系、每个角落都有猫',
        zhTW: '設置在日本節日小鎮的星露谷物語——季節性製作循環、NPC 關係、每個角落都有貓',
        ja: '日本のお祭りの町が舞台のスターデューバレー——季節ごとのクラフト、NPCとの関係、どこにでも猫がいる',
        ko: '일본 축제 마을을 배경으로 한 스타듀 밸리 — 계절 제작 사이클, NPC 관계, 구석구석 고양이',
        de: 'Stardew Valley in einer japanischen Festivalstadt — saisonale Crafting-Zyklen, NPC-Beziehungen und eine Katze in jeder Ecke',
        type: 'minekos-night-market',
      },
      {
        en: 'Mother/EarthBound with Ghibli aesthetics — weird, warm, post-apocalyptic but deeply humane pixel storytelling',
        zh: '带有吉卜力美学的母亲/地球边界——奇异、温暖、末日后但深度人道主义的像素叙事',
        zhTW: '帶有吉卜力美學的母親/地球邊界——奇異、溫暖、末日後但深度人道主義的像素敘事',
        ja: 'ジブリ風のMOTHER/EarthBound——不思議で温かくて、ポストアポカリプスなのに深く人間的なドット絵ストーリー',
        ko: '지브리 감성의 Mother/EarthBound — 기묘하고 따뜻하며 포스트 아포칼립스적이지만 깊이 인간적인 픽셀 스토리텔링',
        de: 'Mother/EarthBound mit Ghibli-Ästhetik — seltsam, warm, postapokalyptisch, aber durch und durch menschliches Pixel-Storytelling',
        type: 'eastward',
      },
      {
        en: 'Spiritfarer meets Slay the Spire — emotional connections with NPCs who have unique personalities, resolved through deckbuilding negotiations',
        zh: 'Spiritfarer 遇上杀戮尖塔——与拥有独特个性的 NPC 建立情感联系，通过牌组构建谈判解决',
        zhTW: 'Spiritfarer 遇上殺戮尖塔——與擁有獨特個性的 NPC 建立情感聯繫，通過牌組構建談判解決',
        ja: 'SpiritfarerとSlay the Spireの融合——個性的なNPCと感情的な絆を結びながら、デッキ構築の交渉で関係を深める',
        ko: 'Spiritfarer × Slay the Spire — 독특한 개성을 가진 NPC들과 감정적 유대를 쌓고 덱빌딩 협상으로 해결하는 게임',
        de: 'Spiritfarer trifft Slay the Spire — emotionale Bindungen zu NPCs mit einzigartigen Persönlichkeiten, gelöst durch Deckbau-Verhandlungen',
        type: 'potionomics',
      },
    ],
  },
  {
    q_en: 'What role do you most enjoy playing in a game world?',
    q_zh: '你最喜欢在游戏世界中扮演什么角色？',
    q_zhTW: '你最喜歡在遊戲世界中扮演什麼角色？',
    q_ja: 'ゲームの世界でどんな役割を楽しみたいですか？',
    q_ko: '게임 세계에서 어떤 역할을 가장 즐기시나요?',
    q_de: 'Welche Rolle magst du in einer Spielwelt am liebsten spielen?',
    options: [
      {
        en: 'The host — someone whose job is to make others comfortable and whose success is measured in guest satisfaction',
        zh: '主人——一个工作是让他人感到舒适、成功以客人满意度衡量的人',
        zhTW: '主人——一個工作是讓他人感到舒適、成功以客人滿意度衡量的人',
        ja: 'ホスト——他の人を快適にするのが仕事で、ゲストの満足度で成功が測られる人',
        ko: '주인 — 다른 사람을 편안하게 만드는 것이 일이고, 성공이 손님 만족도로 측정되는 사람',
        de: 'Der Gastgeber — jemand, dessen Aufgabe es ist, andere wohlfühlen zu lassen, und dessen Erfolg an der Gästezufriedenheit gemessen wird',
        type: 'bear-and-breakfast',
      },
      {
        en: 'The artisan — someone who makes things, sells them, and earns a place in a community through creative work',
        zh: '工匠——一个制作东西、出售它们、通过创意工作在社区中赢得一席之地的人',
        zhTW: '工匠——一個製作東西、出售它們、通過創意工作在社區中贏得一席之地的人',
        ja: '職人——ものを作って売って、クリエイティブな仕事で地域の中で居場所を得る人',
        ko: '장인 — 물건을 만들어 팔고, 창의적인 작업을 통해 커뮤니티에서 자리를 얻는 사람',
        de: 'Der Handwerker — jemand, der Dinge herstellt, sie verkauft und sich durch kreative Arbeit einen Platz in der Gemeinschaft erarbeitet',
        type: 'minekos-night-market',
      },
      {
        en: 'The traveler — someone passing through a world and becoming part of it through the connections made along the way',
        zh: '旅行者——一个穿越世界、通过沿途建立的联系成为其一部分的人',
        zhTW: '旅行者——一個穿越世界、通過沿途建立的聯繫成為其一部分的人',
        ja: '旅人——世界を旅しながら、出会いを通じてその世界の一部になっていく人',
        ko: '여행자 — 세계를 여행하면서 그 과정에서 맺은 인연을 통해 세계의 일부가 되는 사람',
        de: 'Der Reisende — jemand, der durch eine Welt zieht und durch die unterwegs geknüpften Verbindungen Teil von ihr wird',
        type: 'eastward',
      },
      {
        en: 'The entrepreneur — someone building a reputation through clever deals and quality products in a competitive magical market',
        zh: '创业者——一个在竞争激烈的魔法市场中通过巧妙交易和优质产品建立声誉的人',
        zhTW: '創業者——一個在競爭激烈的魔法市場中通過巧妙交易和優質產品建立聲譽的人',
        ja: '起業家——競争の激しい魔法の市場で、巧みな取引と質の高い商品で評判を築く人',
        ko: '기업가 — 경쟁이 치열한 마법 시장에서 영리한 거래와 품질 좋은 제품으로 명성을 쌓는 사람',
        de: 'Der Unternehmer — jemand, der in einem wettbewerbsintensiven magischen Markt durch clevere Deals und Qualitätsprodukte seinen Ruf aufbaut',
        type: 'potionomics',
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
  'bear-and-breakfast': {
    title_en: 'Bear and Breakfast',
    title_zh: '熊与早餐',
    title_zhTW: '熊與早餐',
    title_ja: 'ベア・アンド・ブレックファスト',
    title_ko: '베어 앤 브렉퍼스트',
    title_de: 'Bear and Breakfast',
    emoji: '🐻',
    tag_en: 'Run a woodland B&B as a bear — design themed rooms, manage guest satisfaction, and expand through the forest',
    tag_zh: '作为一只熊经营林地民宿——设计主题房间、管理客人满意度、在森林中扩张',
    tag_zhTW: '一隻熊經營的林地民宿——設計主題房間、管理客人滿意度、在森林中擴張',
    tag_ja: '熊が経営する森のB&B——テーマ別の部屋をデザインし、ゲスト満足度を管理しながら森の中で拡張していく',
    tag_ko: '곰이 운영하는 숲속 B&B — 테마 방 디자인, 손님 만족도 관리, 숲 속에서 확장하기',
    tag_de: 'Als Bär eine Waldpension führen — thematische Zimmer gestalten, Gästezufriedenheit managen und durch den Wald expandieren',
    platform_en: 'Available on: PC (Steam, GOG), Nintendo Switch — about $20',
    platform_zh: '可在以下平台获取：PC（Steam、GOG）、Nintendo Switch——约 20 美元',
    platform_zhTW: '可在以下平台取得：PC（Steam、GOG）、Nintendo Switch——約 20 美元',
    platform_ja: '対応プラットフォーム：PC（Steam、GOG）、Nintendo Switch——約2,600円',
    platform_ko: '플랫폼: PC(Steam, GOG), Nintendo Switch — 약 $20',
    platform_de: 'Erhältlich auf: PC (Steam, GOG), Nintendo Switch — ca. 20 €',
    why_en:
      "Bear and Breakfast (2022) is one of the most charming cozy games released in the past few years and one of the most underrated. You play as Hank, a cheerful bear who discovers an abandoned cabin and decides to renovate it into a bed and breakfast for human tourists. The game expands through the surrounding forest: you will eventually be managing multiple properties across different biomes, each with unique decor themes, different types of rooms (bedroom, bathroom, entertainment room, dining room), and guest ratings that accumulate into an overall reputation. The management loop is satisfying without being overwhelming: each day you gather resources, craft furniture from those resources, install it in the right rooms, and then watch guests arrive, stay, and leave reviews. Your bear friends have personalities and backstories that develop over time. The humor is warm and self-aware, the visual style is charming cartoon illustration, and the seasonal content gives each part of the year a different feel. At $20 on PC and Switch, it is a remarkably full-featured game for its price.",
    why_zh:
      '熊与早餐（2022 年）是近年来发布的最迷人的 cozy 游戏之一，也是最被低估的游戏之一。你扮演 Hank，一只发现废弃小屋并决定将其翻新成人类游客的民宿的快乐熊。游戏通过周围的森林扩展：你最终将在不同生物群落中管理多个房产，每个房产都有独特的装饰主题、不同类型的房间（卧室、浴室、娱乐室、餐厅）以及累积成整体声誉的客人评分。管理循环令人满足但不过于繁重：每天你收集资源，用这些资源制作家具，将其安装在正确的房间，然后看着客人到来、留宿和留下评价。你的熊朋友们有个性和背景故事，随时间发展。幽默温暖而自知，视觉风格是迷人的卡通插画，季节性内容给每年的不同部分带来不同的感觉。PC 和 Switch 上 20 美元，以其价格而言是功能非常完整的游戏。',
    why_zhTW:
      '熊與早餐（2022 年）是近年來發布的最迷人的 cozy 遊戲之一，也是最被低估的遊戲之一。你扮演 Hank，一隻發現廢棄小屋並決定將其翻新成人類遊客民宿的快樂熊。遊戲通過周圍的森林擴展：你最終將在不同生態群落中管理多個房產，每個房產都有獨特的裝飾主題、不同類型的房間（臥室、浴室、娛樂室、餐廳）以及累積成整體聲譽的客人評分。管理循環令人滿足但不過於繁重：每天你收集資源，用這些資源製作家具，將其安裝在正確的房間，然後看著客人到來、留宿和留下評價。你的熊朋友們有個性和背景故事，隨時間發展。幽默溫暖而自知，視覺風格是迷人的卡通插畫，季節性內容給每年的不同部分帶來不同的感覺。PC 和 Switch 上 20 美元，以其價格而言是功能非常完整的遊戲。',
    why_ja:
      'ベア・アンド・ブレックファスト（2022年）は近年発売されたコージーゲームの中でもっとも魅力的で、もっとも過小評価されている一本です。明るい熊のハンクとして廃屋を発見し、人間の観光客向けのB&Bにリノベートしていきます。ゲームは周囲の森に向かって広がっていき、最終的には異なるバイオームにまたがる複数の物件を管理することになります。各物件には独自のデコレーションテーマ、異なる種類の部屋（寝室・浴室・娯楽室・食堂）があり、ゲストの評価が積み重なって総合的な評判を形成します。管理ループは楽しいけれど圧迫感はなく、毎日資源を集めて家具をクラフトし、部屋にセットして、ゲストが来て泊まってレビューを残すのを見守ります。熊の仲間たちにはそれぞれ個性とバックストーリーがあり、時間とともに成長します。ユーモアは温かくてさりげなく、ビジュアルはチャーミングなカートゥーン風イラスト。PCとSwitchで約2,600円という価格としては驚くほど充実した内容です。',
    why_ko:
      '베어 앤 브렉퍼스트(2022)는 최근 몇 년간 출시된 코지 게임 중 가장 매력적이면서도 가장 저평가된 게임 중 하나입니다. 명랑한 곰 행크를 조종해 버려진 오두막을 발견하고 인간 관광객을 위한 B&B로 리노베이션합니다. 게임은 주변 숲으로 뻗어나가며, 결국 다양한 바이옴에 걸쳐 여러 숙소를 관리하게 됩니다. 각 숙소에는 고유한 데코 테마와 다양한 방 유형(침실, 욕실, 오락실, 식당)이 있고, 손님 평점이 쌓여 전체 평판을 형성합니다. 관리 루프는 만족스럽지만 부담스럽지 않습니다. 매일 자원을 모으고, 그 자원으로 가구를 제작하고, 적절한 방에 설치한 후 손님이 도착해 머물다 리뷰를 남기는 것을 지켜봅니다. 곰 친구들은 시간이 지나면서 발전하는 개성과 배경 스토리를 가지고 있습니다. 유머는 따뜻하고 자기 인식적이며, 비주얼 스타일은 매력적인 카툰 일러스트입니다. PC와 스위치에서 약 $20로, 가격 대비 매우 풍부한 콘텐츠를 제공합니다.',
    why_de:
      'Bear and Breakfast (2022) ist eines der charmantesten Cozy Games der letzten Jahre und gleichzeitig eines der unterschätztesten. Du spielst als Hank, ein fröhlicher Bär, der eine verlassene Hütte entdeckt und beschließt, sie in eine Pension für menschliche Touristen umzubauen. Das Spiel expandiert durch den umgebenden Wald: Irgendwann verwaltest du mehrere Immobilien in verschiedenen Biomen, jede mit einzigartigen Deko-Themen, unterschiedlichen Zimmertypen (Schlafzimmer, Bad, Unterhaltungsraum, Speisesaal) und Gästebewertungen, die sich zu einem Gesamtruf summieren. Der Management-Loop ist befriedigend ohne überwältigend zu sein: Jeden Tag sammelst du Ressourcen, bastelst daraus Möbel, richtest sie in den richtigen Zimmern ein und beobachtest, wie Gäste ankommen, bleiben und Bewertungen hinterlassen. Deine Bären-Freunde haben Persönlichkeiten und Hintergrundgeschichten, die sich über die Zeit entwickeln. Der Humor ist warm und selbstbewusst, der Kunststil charming-cartoonhaft, und der saisonale Inhalt gibt jedem Teil des Jahres ein eigenes Feeling. Für ca. 20 € auf PC und Switch ist es ein erstaunlich vollständiges Spiel für seinen Preis.',
    tip_en: "Prioritize comfort rating above everything else — guests weight it most heavily in their reviews. A small room with high-comfort furniture earns better ratings than a large room with cheap furniture. Invest in the bedroom furniture early.",
    tip_zh: '将舒适度评级置于一切之上——客人在评价中对其权重最高。一个拥有高舒适度家具的小房间比拥有廉价家具的大房间获得更好的评分。早期投资卧室家具。',
    tip_zhTW: '優先把舒適度評級放在一切之上——客人在評價中對其權重最高。一個擁有高舒適度家具的小房間比擁有廉價家具的大房間獲得更好的評分。早期投資臥室家具。',
    tip_ja: '何よりもコンビニエンス評価を優先しましょう——ゲストのレビューで一番重視されるのはここです。高いコンビニエンス家具を置いた小さな部屋のほうが、安い家具を並べた広い部屋よりも高評価を得られます。序盤は寝室の家具に投資しましょう。',
    tip_ko: '무엇보다 편안함 평점을 우선시하세요 — 손님들이 리뷰에서 가장 중요하게 여기는 항목입니다. 고급 가구가 있는 작은 방이 저렴한 가구가 있는 큰 방보다 더 좋은 평점을 받습니다. 초반에 침실 가구에 투자하세요.',
    tip_de: 'Priorisiere den Komfort-Wert über alles andere — Gäste gewichten ihn in ihren Bewertungen am stärksten. Ein kleines Zimmer mit hochwertigen Möbeln erzielt bessere Bewertungen als ein großes Zimmer mit billigen Möbeln. Investiere früh in Schlafzimmermöbel.',
  },
  'minekos-night-market': {
    title_en: "Mineko's Night Market",
    title_zh: '美子的夜市',
    title_zhTW: '美子的夜市',
    title_ja: '美子のナイトマーケット',
    title_ko: '미네코의 야시장',
    title_de: "Mineko's Night Market",
    emoji: '🏮',
    tag_en: 'Craft goods and sell at seasonal night markets in a Japanese cat-filled town — explore during the day, sell by lantern-light at night',
    tag_zh: '在一个充满猫咪的日本小镇制作商品并在季节性夜市出售——白天探索，在灯笼光下的夜晚售卖',
    tag_zhTW: '在一個充滿貓咪的日本小鎮製作商品並在季節性夜市出售——白天探索，在燈籠光下的夜晚售賣',
    tag_ja: '猫だらけの日本の町で手作り品を作って季節の夜市で売る——昼は探索して、夜は提灯の明かりの下で販売',
    tag_ko: '고양이로 가득한 일본 마을에서 상품을 만들어 계절 야시장에서 팔기 — 낮에는 탐험하고, 밤에는 등불 아래서 판매',
    tag_de: 'In einer japanischen Katzenstadt Waren herstellen und auf saisonalen Nachtmärkten verkaufen — tagsüber erkunden, nachts im Laternenlicht verkaufen',
    platform_en: 'Available on: PC (Steam), Nintendo Switch — about $25',
    platform_zh: '可在以下平台获取：PC（Steam）、Nintendo Switch——约 25 美元',
    platform_zhTW: '可在以下平台取得：PC（Steam）、Nintendo Switch——約 25 美元',
    platform_ja: '対応プラットフォーム：PC（Steam）、Nintendo Switch——約3,200円',
    platform_ko: '플랫폼: PC(Steam), Nintendo Switch — 약 $25',
    platform_de: 'Erhältlich auf: PC (Steam), Nintendo Switch — ca. 25 €',
    why_en:
      "Mineko's Night Market (2023) is the most visually distinctive cozy game of recent years — a love letter to Japanese folk culture, seasonal festivals, and the specific aesthetic of old coastal towns with paper lanterns, wooden shop signs, and a cat population that outnumbers the humans. You play as Mineko, a girl who moves to the island of Omori and discovers that a legendary sun cat may be in danger. During the day you explore the town, gather resources, build friendships with the eccentric residents, and participate in quirky quests. At night, you set up your market stall, price your handcrafted goods, and sell to a crowd of buyers who each have specific preferences. The crafting system has significant depth: you combine gathered materials into furniture, decorations, food, and novelty items, each with different demand curves at the market. The game is dripping in Japanese festival atmosphere — lanterns, yukata-wearing residents, taiko drums, seasonal matsuri events — and the cat character designs are iconic. At $25 on PC and Switch, it is one of the most lovingly made cozy games of 2023.",
    why_zh:
      '美子的夜市（2023 年）是近年来视觉上最具特色的 cozy 游戏——对日本民俗文化、季节性节日以及带有纸灯笼、木制店牌和猫口超过人口的旧海滨小镇特定美学的情书。你扮演 Mineko，一个搬到大盛岛并发现传说中的太阳猫可能处于危险中的女孩。白天你探索小镇、收集资源、与古怪居民建立友谊，并参与奇特的任务。夜晚，你设置你的市场摊位，为你的手工商品定价，并向一群各有特定偏好的买家出售。制作系统有相当大的深度：你将收集的材料组合成家具、装饰品、食物和新奇物品，每种在市场上都有不同的需求曲线。游戏充满日本节日氛围——灯笼、穿着浴衣的居民、太鼓、季节性祭典活动——猫咪角色设计是标志性的。PC 和 Switch 上 25 美元，是 2023 年最精心制作的 cozy 游戏之一。',
    why_zhTW:
      '美子的夜市（2023 年）是近年來視覺上最具特色的 cozy 遊戲——對日本民俗文化、季節性節日以及帶有紙燈籠、木製店牌和貓口超過人口的舊海濱小鎮特定美學的情書。你扮演 Mineko，一個搬到大盛島並發現傳說中的太陽貓可能處於危險中的女孩。白天你探索小鎮、收集資源、與古怪居民建立友誼，並參與奇特的任務。夜晚，你設置你的市場攤位，為你的手工商品定價，並向一群各有特定偏好的買家出售。製作系統有相當大的深度：你將收集的材料組合成家具、裝飾品、食物和新奇物品，每種在市場上都有不同的需求曲線。遊戲充滿日本節日氛圍——燈籠、穿著浴衣的居民、太鼓、季節性祭典活動——貓咪角色設計是標誌性的。PC 和 Switch 上 25 美元，是 2023 年最精心製作的 cozy 遊戲之一。',
    why_ja:
      '美子のナイトマーケット（2023年）は近年のコージーゲームの中でもっとも視覚的に個性的な一作です——日本の民俗文化、季節のお祭り、紙提灯・木の看板・人間よりも多い猫がいる古い海沿いの町の雰囲気へのラブレター。大盛島に引っ越した女の子・美子として、伝説の太陽猫が危機に瀕しているかもしれないと知ります。昼間は町を探索して資源を集め、個性豊かな住人と仲良くなり、風変わりなクエストをこなします。夜になると市場のブースを設置し、手作り品に値段をつけて、それぞれ好みの違う買い手に販売します。クラフトシステムには深みがあり、集めた材料を家具・飾り・食べ物・ユニークなアイテムに加工します。ゲームには日本のお祭りの雰囲気が溢れています——提灯、浴衣姿の住人、太鼓、季節の祭りイベント、そして印象的な猫キャラたち。PCとSwitchで約3,200円という価格で、2023年もっとも心を込めて作られたコージーゲームの一つです。',
    why_ko:
      '미네코의 야시장(2023)은 최근 몇 년간 시각적으로 가장 독특한 코지 게임입니다 — 일본 민속 문화, 계절 축제, 그리고 종이 등불, 나무 간판, 사람보다 고양이가 더 많은 옛 해안 마을의 특유한 미학에 바치는 러브레터입니다. 오모리 섬으로 이사한 소녀 미네코를 조종하며, 전설의 태양 고양이가 위험에 처할 수 있다는 것을 발견합니다. 낮에는 마을을 탐험하고, 자원을 모으고, 개성 넘치는 주민들과 우정을 쌓으며, 독특한 퀘스트에 참여합니다. 밤이 되면 시장 가판대를 세우고, 수제 상품에 가격을 매기고, 각자 특정 선호도를 가진 구매자들에게 판매합니다. 제작 시스템은 꽤 깊이가 있습니다. 수집한 재료를 가구, 장식품, 음식, 기념품으로 조합하며, 각각 시장에서 다른 수요 곡선을 가집니다. 등불, 유카타 입은 주민, 타이코, 계절 마쓰리 이벤트 등 일본 축제 분위기가 넘치며, 고양이 캐릭터 디자인은 상징적입니다. PC와 스위치에서 약 $25로, 2023년 가장 정성껏 만들어진 코지 게임 중 하나입니다.',
    why_de:
      "Mineko's Night Market (2023) ist das visuell einzigartigste Cozy Game der letzten Jahre — ein Liebesbrief an die japanische Volkskultur, saisonale Festivals und die spezifische Ästhetik alter Küstenstädte mit Papierlaternen, Holzschildern und einer Katzenpopulation, die die Menschen zahlenmäßig übertrifft. Du spielst als Mineko, ein Mädchen, das auf die Insel Omori zieht und herausfindet, dass eine legendäre Sonnenkatze in Gefahr sein könnte. Tagsüber erkundest du die Stadt, sammelst Ressourcen, schließt Freundschaften mit den exzentrischen Bewohnern und nimmst an skurrilen Quests teil. Nachts baust du deinen Marktstand auf, bepreist deine handgefertigten Waren und verkaufst an Käufer mit spezifischen Vorlieben. Das Crafting-System hat erhebliche Tiefe: Du kombinierst gesammelte Materialien zu Möbeln, Dekorationen, Lebensmitteln und Kuriositäten, jedes mit verschiedenen Nachfragekurven auf dem Markt. Das Spiel strotzt vor japanischer Festivalatmosphäre — Laternen, Yukata-tragende Bewohner, Taiko-Trommeln, saisonale Matsuri-Events — und die Katzencharakter-Designs sind ikonisch. Für ca. 25 € auf PC und Switch ist es eines der liebevollsten gemachten Cozy Games von 2023.",
    tip_en: "Scout the market before setting prices — walk around the pre-opening stalls to see what other vendors are selling and at what prices. Pricing your goods slightly lower than the competition for the same item gives you a reliable sales advantage, especially early game.",
    tip_zh: '在定价前侦察市场——在开市前四处走动，查看其他摊主在卖什么以及价格如何。对相同物品的定价略低于竞争对手，给你带来可靠的销售优势，特别是在游戏早期。',
    tip_zhTW: '在定價前偵察市場——在開市前四處走動，查看其他攤主在賣什麼以及價格如何。對相同物品的定價略低於競爭對手，給你帶來可靠的銷售優勢，特別是在遊戲早期。',
    tip_ja: '値段をつける前に市場を偵察しましょう——開市前に歩き回って、他の出店者が何をいくらで売っているか確認します。同じ商品を競合より少し安く設定すると、序盤は特に安定した販売優位に立てます。',
    tip_ko: '가격을 설정하기 전에 시장을 정찰하세요 — 개장 전에 돌아다니며 다른 상인들이 무엇을 얼마에 파는지 확인하세요. 같은 물건을 경쟁자보다 약간 낮게 책정하면, 특히 게임 초반에 안정적인 판매 우위를 얻을 수 있습니다.',
    tip_de: 'Scoutet den Markt, bevor du Preise festlegst — geh vor der Eröffnung durch die Stände, um zu sehen, was andere Händler zu welchem Preis anbieten. Deine Waren für dasselbe Item etwas günstiger zu bepreisen als die Konkurrenz gibt dir einen verlässlichen Verkaufsvorteil, besonders zu Beginn des Spiels.',
  },
  eastward: {
    title_en: 'Eastward',
    title_zh: '向东方',
    title_zhTW: '向東方',
    title_ja: 'イーストワード',
    title_ko: '이스트워드',
    title_de: 'Eastward',
    emoji: '🍜',
    tag_en: 'A gorgeous pixel-art road trip through a post-apocalyptic world that kept going — cook noodles, meet strange communities, protect a child with strange powers',
    tag_zh: '一段穿越末日后继续运转的世界的华丽像素艺术公路旅行——烹饪面条、遇见奇异社区、保护一个拥有奇异力量的孩子',
    tag_zhTW: '一段穿越末日後繼續運轉的世界的華麗像素藝術公路旅行——烹飪麵條、遇見奇異社區、保護一個擁有奇異力量的孩子',
    tag_ja: '終末後も生き続ける世界を旅する美麗なドット絵ロードトリップ——麺料理を作り、不思議なコミュニティに出会い、不思議な力を持つ子どもを守る',
    tag_ko: '멸망 후에도 계속 살아가는 세계를 가로지르는 아름다운 픽셀 아트 로드 트립 — 국수 요리하기, 기묘한 공동체 만나기, 특별한 능력을 가진 아이 보호하기',
    tag_de: 'Ein wunderschöner Pixel-Art-Roadtrip durch eine postapokalyptische Welt, die einfach weitergemacht hat — Nudelgerichte kochen, seltsamen Communities begegnen, ein Kind mit besonderen Kräften beschützen',
    platform_en: 'Available on: PC (Steam, GOG), Nintendo Switch — about $25',
    platform_zh: '可在以下平台获取：PC（Steam、GOG）、Nintendo Switch——约 25 美元',
    platform_zhTW: '可在以下平台取得：PC（Steam、GOG）、Nintendo Switch——約 25 美元',
    platform_ja: '対応プラットフォーム：PC（Steam、GOG）、Nintendo Switch——約3,200円',
    platform_ko: '플랫폼: PC(Steam, GOG), Nintendo Switch — 약 $25',
    platform_de: 'Erhältlich auf: PC (Steam, GOG), Nintendo Switch — ca. 25 €',
    why_en:
      "Eastward (2021) is one of the most visually stunning cozy-adjacent games ever made — its pixel art was created by a single artist (PixPil) over seven years and has a density and warmth of detail that rivals classic Super Nintendo games. You play as John, a strong and quiet digger, and Sam, a girl with mysterious powers he discovered underground, as they travel east through a series of communities in a world where something went wrong long ago but people kept building, kept living, and kept cooking. Food is central to Eastward — there is a full cooking system, recipes to discover, and John's ability to cook meals gives the game a specific domestic warmth. Each community the pair visits has its own culture, problems, and eccentric residents; the game is structured as a series of chapter-length visits. The tone is warmly melancholy in the tradition of Studio Ghibli — hopeful and strange and specific in the way only stories set in post-disaster worlds can be. The combat is simple action-RPG (frying pan as primary weapon). One of the most underrated games of 2021, with a magnificent original soundtrack by Joel Corelitz.",
    why_zh:
      '向东方（2021 年）是有史以来视觉上最令人惊叹的 cozy 相邻游戏之一——其像素艺术由一位艺术家（PixPil）历时七年创作，细节密度和温暖感可与经典超级任天堂游戏媲美。你扮演 John，一个强壮而沉默的挖掘工，以及 Sam，一个他在地下发现的拥有神秘力量的女孩，他们向东旅行，穿越一系列社区，在一个很久以前出了什么问题但人们继续建造、继续生活、继续烹饪的世界。食物是向东方的核心——有一个完整的烹饪系统、要发现的食谱，以及 John 烹饪食物的能力给游戏带来特定的家庭温暖。这对组合访问的每个社区都有自己的文化、问题和古怪居民；游戏以一系列章节长度的访问为结构。基调是温暖忧郁的，延续了宫崎骏吉卜力的传统——充满希望、奇异而具体，只有发生在灾后世界中的故事才能有这种感觉。战斗是简单的动作 RPG（平底锅作为主要武器）。2021 年最被低估的游戏之一，配以 Joel Corelitz 创作的宏大原创配乐。',
    why_zhTW:
      '向東方（2021 年）是有史以來視覺上最令人驚嘆的 cozy 相鄰遊戲之一——其像素藝術由一位藝術家（PixPil）歷時七年創作，細節密度和溫暖感可與經典超級任天堂遊戲媲美。你扮演 John，一個強壯而沉默的挖掘工，以及 Sam，一個他在地下發現的擁有神秘力量的女孩，他們向東旅行，穿越一系列社區，在一個很久以前出了什麼問題但人們繼續建造、繼續生活、繼續烹飪的世界。食物是向東方的核心——有一個完整的烹飪系統、要發現的食譜，以及 John 烹飪食物的能力給遊戲帶來特定的家庭溫暖。這對組合訪問的每個社區都有自己的文化、問題和古怪居民；遊戲以一系列章節長度的訪問為結構。基調是溫暖憂鬱的，延續了宮崎駿吉卜力的傳統——充滿希望、奇異而具體，只有發生在災後世界中的故事才能有這種感覺。戰鬥是簡單的動作 RPG（平底鍋作為主要武器）。2021 年最被低估的遊戲之一，配以 Joel Corelitz 創作的宏大原創配樂。',
    why_ja:
      'イーストワード（2021年）はコージー隣接ジャンルの中でもっとも視覚的に美しいゲームの一つです——ピクセルアートはPixPilの一人のアーティストが7年かけて制作し、クラシックなスーパーファミコンのゲームに匹敵する細密さと温かみを持っています。無口で力持ちの掘削工ジョンと、地下で彼が発見した不思議な力を持つ少女サムとして、何かが終わって久しい世界を東へ旅します。人々はそれでも建て続け、生き続け、料理し続けています。食べ物はイーストワードの中心です——完全な料理システム、発見できるレシピ、そしてジョンが食事を作る能力がゲームに温かい家庭的な雰囲気を与えます。二人が訪れるそれぞれのコミュニティは独自の文化・問題・個性的な住人を持ち、章立てで訪問するような構成です。トーンはジブリ風のほろ苦い温かさ——希望があって不思議で、災後の世界ならではの具体的な物語感があります。戦闘はシンプルなアクションRPG（主武器はフライパン）。Joel Corelitz による素晴らしいオリジナルサウンドトラックとともに、2021年もっとも過小評価された作品の一つです。',
    why_ko:
      '이스트워드(2021)는 코지 인접 장르에서 시각적으로 가장 놀라운 게임 중 하나입니다 — 픽셀 아트는 단 한 명의 아티스트(PixPil)가 7년에 걸쳐 제작했으며, 클래식 슈퍼 닌텐도 게임에 필적하는 디테일 밀도와 따뜻함을 지니고 있습니다. 강하고 말수 적은 채굴공 존과, 그가 지하에서 발견한 신비로운 힘을 가진 소녀 샘을 조종하며 동쪽으로 여행합니다. 오래전 무언가가 끝났지만 사람들이 계속 건물을 짓고, 계속 살아가며, 계속 요리하는 세계를 가로질러서요. 음식은 이스트워드의 핵심입니다 — 완전한 요리 시스템, 발견할 레시피들, 그리고 존이 식사를 만드는 능력이 게임에 특유의 가정적인 따뜻함을 줍니다. 두 사람이 방문하는 각 공동체는 고유한 문화, 문제, 개성 넘치는 주민들을 가지고 있으며, 게임은 여러 챕터 길이의 방문으로 구성됩니다. 분위기는 지브리 전통의 따뜻한 우수 — 희망적이고 기묘하며, 재해 이후의 세계를 배경으로 한 이야기에서만 가능한 구체성이 있습니다. 전투는 단순한 액션 RPG입니다(주무기는 프라이팬). Joel Corelitz의 웅장한 오리지널 사운드트랙과 함께, 2021년 가장 저평가된 게임 중 하나입니다.',
    why_de:
      'Eastward (2021) ist eines der visuell beeindruckendsten Cozy-nahen Spiele aller Zeiten — seine Pixel-Art wurde von einem einzigen Künstler (PixPil) über sieben Jahre erschaffen und hat eine Detaildichte und Wärme, die klassische Super-Nintendo-Spiele rivalisiert. Du spielst als John, einen kräftigen und stillen Schürfer, und Sam, ein Mädchen mit mysteriösen Kräften, das er unterirdisch entdeckt hat, und reist ostwärts durch eine Reihe von Communities in einer Welt, in der irgendetwas vor langer Zeit schiefgelaufen ist, die Menschen aber weitergebaut, weitergelebt und weiter gekocht haben. Essen ist zentral für Eastward — es gibt ein vollständiges Kochsystem, zu entdeckende Rezepte, und Johns Fähigkeit zu kochen gibt dem Spiel eine spezifische häusliche Wärme. Jede Community, die das Pärchen besucht, hat ihre eigene Kultur, Probleme und exzentrischen Bewohner; das Spiel ist als Folge kapitel-langer Besuche strukturiert. Die Stimmung ist warm-melancholisch im Ghibli-Tradition — hoffnungsvoll und seltsam und spezifisch auf eine Art, die nur Geschichten in Post-Katastrophen-Welten haben können. Der Kampf ist einfaches Action-RPG (Bratpfanne als Hauptwaffe). Eines der unterschätztesten Spiele von 2021, mit einem großartigen Originalsoundtrack von Joel Corelitz.',
    tip_en: "Cook meals regularly using John's cooking pot — they provide significant stat boosts and the cooking animations are warm and satisfying in their own right. Recipes often combine things you find in the current chapter, so hoard ingredients and experiment freely.",
    tip_zh: '使用 John 的烹饪锅定期烹饪食物——它们提供显著的属性加成，烹饪动画本身就温暖而令人满足。食谱通常结合你在当前章节中找到的东西，所以囤积食材并自由实验。',
    tip_zhTW: '使用 John 的烹飪鍋定期烹飪食物——它們提供顯著的屬性加成，烹飪動畫本身就溫暖而令人滿足。食譜通常結合你在當前章節中找到的東西，所以囤積食材並自由實驗。',
    tip_ja: 'ジョンの鍋を使って定期的に料理しましょう——大きなステータスボーナスがあり、料理のアニメーション自体も温かくて見ていて楽しいです。レシピは今いる章で見つかるものを組み合わせることが多いので、食材をため込んでどんどん試してみましょう。',
    tip_ko: '존의 냄비를 이용해 정기적으로 요리하세요 — 상당한 스탯 보너스를 제공하며, 요리 애니메이션 자체도 따뜻하고 만족스럽습니다. 레시피는 현재 챕터에서 찾은 것들을 조합하는 경우가 많으니, 재료를 모아두고 자유롭게 실험해 보세요.',
    tip_de: "Koche regelmäßig mit Johns Kochtopf — die Gerichte geben erhebliche Stat-Boni, und die Kochanimationen sind für sich schon warm und befriedigend. Rezepte kombinieren oft Dinge, die du im aktuellen Kapitel findest, also hamstre Zutaten und experimentiere frei.",
  },
  potionomics: {
    title_en: 'Potionomics',
    title_zh: 'Potionomics',
    title_zhTW: 'Potionomics',
    title_ja: 'ポーショノミクス',
    title_ko: '포셔노믹스',
    title_de: 'Potionomics',
    emoji: '⚗️',
    tag_en: 'Run a potion shop through deck-building negotiations — brew potions, charm adventurers, and build a business empire in a magical city',
    tag_zh: '通过牌组构建谈判经营药水店——酿造药水、魅惑冒险者、在魔法城市建立商业帝国',
    tag_zhTW: '通過牌組構建談判經營藥水店——釀造藥水、魅惑冒險者、在魔法城市建立商業帝國',
    tag_ja: 'デッキ構築の交渉でポーション屋を経営——ポーションを醸造して、冒険者を魅了し、魔法都市でビジネス帝国を築く',
    tag_ko: '덱빌딩 협상으로 물약 가게 운영 — 물약을 제조하고, 모험가들을 매료시키고, 마법 도시에서 비즈니스 제국 건설하기',
    tag_de: 'Einen Tranksladen durch Deckbau-Verhandlungen führen — Tränke brauen, Abenteurer bezirzen und ein Wirtschaftsimperium in einer Magikerstadt aufbauen',
    platform_en: 'Available on: PC (Steam) — about $25',
    platform_zh: '可在以下平台获取：PC（Steam）——约 25 美元',
    platform_zhTW: '可在以下平台取得：PC（Steam）——約 25 美元',
    platform_ja: '対応プラットフォーム：PC（Steam）——約3,200円',
    platform_ko: '플랫폼: PC(Steam) — 약 $25',
    platform_de: 'Erhältlich auf: PC (Steam) — ca. 25 €',
    why_en:
      "Potionomics (2022) is one of the most original cozy-adjacent games of the past five years: a potion shop management game where selling your potions is handled through a deckbuilding negotiation minigame. You are Sylvia, a witch who inherits a failing potion shop with significant debt. You brew potions (an ingredient combination system with visual color-mixing feedback), display them in your shop, and then when customers arrive you enter a card-based negotiation where you play charm and persuasion cards to influence the sale price. Your deck improves as you befriend the adventurers and merchants who visit your shop — each NPC has a personality and specific deck-building synergies that make friendship meaningful beyond just story content. There is also an overarching story with multiple ending paths depending on who you invest in as business partners. On PC only (no console release as of 2024), but one of the most mechanically inventive cozy games in the genre. Frequently recommended for players who enjoyed Spiritfarer's emotional NPC depth and want something with strategic depth added on top.",
    why_zh:
      'Potionomics（2022 年）是过去五年最具原创性的 cozy 相邻游戏之一：一款药水店管理游戏，其中出售药水通过牌组构建谈判小游戏处理。你是 Sylvia，一个继承了一家有大量债务的失败药水店的女巫。你酿造药水（具有视觉颜色混合反馈的配料组合系统），在你的店里展示它们，然后当客人到来时，你进入一个基于卡牌的谈判，在那里你打出魅力和说服卡牌来影响销售价格。当你与访问你店铺的冒险者和商人交朋友时，你的牌组会改善——每个 NPC 都有个性和特定的牌组构建协同效应，使友谊在故事内容之外变得有意义。还有一个总体故事，根据你投资哪些商业伙伴而有多个结局路径。仅限 PC（截至 2024 年没有主机发布），但是该类型中机制最具创意的 cozy 游戏之一。经常推荐给喜欢 Spiritfarer 情感 NPC 深度并想要在其上添加战略深度的玩家。',
    why_zhTW:
      'Potionomics（2022 年）是過去五年最具原創性的 cozy 相鄰遊戲之一：一款藥水店管理遊戲，其中出售藥水通過牌組構建談判小遊戲處理。你是 Sylvia，一個繼承了一家有大量債務的失敗藥水店的女巫。你釀造藥水（具有視覺顏色混合反饋的配料組合系統），在你的店裡展示它們，然後當客人到來時，你進入一個基於卡牌的談判，在那裡你打出魅力和說服卡牌來影響銷售價格。當你與訪問你店鋪的冒險者和商人交朋友時，你的牌組會改善——每個 NPC 都有個性和特定的牌組構建協同效應，使友誼在故事內容之外變得有意義。還有一個總體故事，根據你投資哪些商業夥伴而有多個結局路徑。僅限 PC（截至 2024 年沒有主機發布），但是該類型中機制最具創意的 cozy 遊戲之一。經常推薦給喜歡 Spiritfarer 情感 NPC 深度並想要在其上添加戰略深度的玩家。',
    why_ja:
      'ポーショノミクス（2022年）は過去5年で最も独創的なコージー隣接ゲームの一つです——ポーション屋経営ゲームで、販売はデッキ構築の交渉ミニゲームで行います。あなたはシルビア、多額の借金を抱えた失敗したポーション屋を引き継いだ魔女。ポーションを醸造し（色の混合フィードバックがある視覚的な材料組み合わせシステム）、店に並べ、客が来たらカードベースの交渉に入ります。魅力カードと説得カードを使って販売価格を動かしましょう。店に訪れる冒険者や商人と仲良くなるほどデッキが強化されます——各NPCには個性と固有のデッキシナジーがあり、友情がストーリー以上の意味を持ちます。誰をビジネスパートナーとして選ぶかによって複数のエンディングがある全体ストーリーもあります。PC専用（2024年時点でコンソール未発売）ですが、ジャンル内で最も機械的に斬新なコージーゲームの一つ。SpiritfarerのNPCの深さが好きで、そこに戦略的な要素を加えたいプレイヤーによく勧められます。',
    why_ko:
      '포셔노믹스(2022)는 지난 5년간 가장 독창적인 코지 인접 게임 중 하나입니다. 물약을 파는 것이 덱빌딩 협상 미니게임으로 처리되는 물약 가게 경영 게임입니다. 당신은 막대한 빚이 있는 실패한 물약 가게를 물려받은 마녀 실비아입니다. 물약을 제조하고(시각적 색상 혼합 피드백이 있는 재료 조합 시스템), 가게에 진열하고, 손님이 오면 카드 기반의 협상에 들어갑니다. 매력과 설득 카드를 플레이해 판매 가격에 영향을 줍니다. 가게를 방문하는 모험가와 상인과 친해질수록 덱이 향상됩니다 — 각 NPC는 개성과 특정 덱빌딩 시너지를 가지고 있어 우정이 스토리 콘텐츠 이상의 의미를 갖습니다. 어떤 사업 파트너에게 투자하느냐에 따라 여러 결말 경로가 있는 전체적인 이야기도 있습니다. PC 전용(2024년 기준 콘솔 출시 없음)이지만 장르에서 가장 기계적으로 독창적인 코지 게임 중 하나입니다. Spiritfarer의 감정적인 NPC 깊이를 좋아하고 전략적인 깊이를 더하고 싶은 플레이어에게 자주 추천됩니다.',
    why_de:
      'Potionomics (2022) ist eines der originellsten Cozy-nahen Spiele der letzten fünf Jahre: ein Trankladenmanagement-Spiel, bei dem das Verkaufen deiner Tränke durch ein Deckbau-Verhandlungs-Minispiel abgewickelt wird. Du bist Sylvia, eine Hexe, die einen gescheiterten Tranksladen mit erheblichen Schulden erbt. Du braust Tränke (ein Zutaten-Kombinationssystem mit visuellem Farbmisch-Feedback), stellst sie in deinem Laden aus, und wenn Kunden kommen, trittst du in eine kartenbasierte Verhandlung ein, bei der du Charme- und Überzeugungskarten spielst, um den Verkaufspreis zu beeinflussen. Dein Deck verbessert sich, wenn du die Abenteurer und Händler befreundest, die deinen Laden besuchen — jeder NPC hat eine Persönlichkeit und spezifische Deckbau-Synergien, die Freundschaft über Storyline-Inhalte hinaus bedeutungsvoll machen. Es gibt auch eine übergreifende Geschichte mit mehreren Endingpfaden je nachdem, in wen du als Geschäftspartner investierst. Nur auf PC (Stand 2024 keine Konsolversion), aber eines der mechanisch innovativsten Cozy Games im Genre. Wird häufig Spielern empfohlen, die die emotionale NPC-Tiefe von Spiritfarer genossen haben und etwas mit zusätzlicher strategischer Tiefe wollen.',
    tip_en: "Focus on befriending one or two NPCs deeply in the first act rather than spreading friendship across all of them — the deck synergies from maxing out a relationship are much stronger than having mid-level friendship with everyone. Quinn and Remy are particularly strong early partners.",
    tip_zh: '在第一幕深入结交一两个 NPC 的友谊，而不是把友谊分散给所有人——最大化一段关系带来的牌组协同效应比与所有人保持中等友谊强得多。Quinn 和 Remy 是特别强力的早期合作伙伴。',
    tip_zhTW: '在第一幕深入結交一兩個 NPC 的友誼，而不是把友誼分散給所有人——最大化一段關係帶來的牌組協同效應比與所有人保持中等友誼強得多。Quinn 和 Remy 是特別強力的早期合作夥伴。',
    tip_ja: '第一幕では全員に友好度を分散させるより、一人か二人のNPCと深い友情を築きましょう——関係を最大化したときのデッキシナジーは、全員と中程度の友情を保つよりはるかに強力です。QuinnとRemyは序盤の特に強いパートナーです。',
    tip_ko: '1막에서 모든 NPC에게 우정을 분산시키기보다 한두 명의 NPC와 깊은 친분을 쌓으세요 — 관계를 최대화했을 때의 덱 시너지가 모두와 중간 우정을 유지하는 것보다 훨씬 강력합니다. Quinn과 Remy는 특히 강력한 초반 파트너입니다.',
    tip_de: 'Fokussiere dich im ersten Akt darauf, ein oder zwei NPCs tiefgehend zu befreunden, anstatt Freundschaft über alle zu verteilen — die Decksynergien aus einer maximierten Beziehung sind viel stärker als mittlere Freundschaft mit jedem. Quinn und Remy sind besonders starke frühe Partner.',
  },
}

function calcResult(answers: Pick[]): Pick {
  const counts: Record<Pick, number> = {
    'bear-and-breakfast': 0,
    'minekos-night-market': 0,
    eastward: 0,
    potionomics: 0,
  }
  for (const a of answers) counts[a]++
  return Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0] as Pick
}

export function CozyHiddenGemsQuiz({ locale }: { locale: string }) {
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
    const url = `${BASE_URL}/${locale}/quizzes/cozy-hidden-gems`
    const shareText = getLoc(
      `Cozy 游戏隐藏宝石测验结果：「${result.title_zh}」！${result.tag_zh}。找到你的：${url}`,
      `My cozy hidden gem is ${result.title_en} — ${result.tag_en}. Find yours: ${url}`,
      `Cozy 遊戲隱藏寶石測驗結果：「${result.title_zhTW}」！${result.tag_zhTW}。找到你的：${url}`,
      `コージーゲーム隠れた名作診断：「${result.title_ja}」！${result.tag_ja}。あなたも試してみよう：${url}`,
      `코지 게임 숨은 보석 퀴즈: 「${result.title_ko}」! ${result.tag_ko}. 찾아보세요: ${url}`,
      `Mein Cozy-Geheimtipp ist ${result.title_de} — ${result.tag_de}. Finde deins: ${url}`
    )

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
              {getLoc('上手小贴士：', 'Getting started: ', '上手小貼士：', 'ヒント：', '시작 팁: ', 'Tipp: ')}
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
              'TendFarmはファームリズムトラッカーを開発中です——ゲームの生活リズムをリアルな日常に取り入れよう。',
              'TendFarm은 농장 리듬 트래커를 개발 중입니다——게임 속 생활 리듬을 실제 일상으로 가져와요.',
              'TendFarm baut einen Farm-Rhythmus-Tracker — der Rhythmus des Spiellebens in den echten Alltag gebracht.'
            )}
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <ShareButton text={shareText} locale={locale} />
          <button
            onClick={() => { setAnswers(Array(QUESTIONS.length).fill(null)); setSubmitted(false) }}
            className="flex-1 rounded-xl border border-[#2d3d2d] py-3 text-sm text-[#8a9a7a] hover:border-[#4a5a4a] hover:text-[#e8dcc8]"
          >
            {getLoc('重新测试', 'Retake Quiz', '重新測試', 'もう一度', '다시 테스트', 'Quiz wiederholen')}
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
            '哪款被低估的 Cozy 游戏隐藏宝石最适合你？',
            'Which Underrated Cozy Hidden Gem Should You Play?',
            '哪款被低估的 Cozy 遊戲隱藏寶石最適合你？',
            '過小評価されたコージーゲームの隠れた名作はどれ？',
            '가장 저평가된 코지 숨은 보석 게임은?',
            'Welches unterschätzte Cozy-Geheimtipp-Spiel solltest du spielen?'
          )}
        </h1>
        <p className="text-sm text-[#8a9a7a]">
          {getLoc(
            '6 个问题，在四款被严重低估的 Cozy 精品中找到你的隐藏宝石——熊与早餐、美子的夜市、向东方，还是 Potionomics',
            "6 questions to find your cozy hidden gem — Bear and Breakfast, Mineko's Night Market, Eastward, or Potionomics. All underplayed, all excellent.",
            '6 個問題，在四款被嚴重低估的 Cozy 精品中找到你的隱藏寶石——熊與早餐、美子的夜市、向東方，還是 Potionomics',
            '6つの質問で、過小評価された4つのコージーゲームの隠れた名作を見つけよう——ベア・アンド・ブレックファスト、美子のナイトマーケット、イーストワード、ポーショノミクス',
            '6개의 질문으로 저평가된 코지 숨은 보석 4개 중 당신의 게임을 찾아보세요 — 베어 앤 브렉퍼스트, 미네코의 야시장, 이스트워드, 포셔노믹스',
            '6 Fragen, um dein Cozy-Geheimtipp-Spiel zu finden — Bear and Breakfast, Mineko\'s Night Market, Eastward oder Potionomics. Alle unterschätzt, alle hervorragend.'
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
        {getLoc('找到我的隐藏宝石', 'Find My Hidden Gem', '找到我的隱藏寶石', '私の隠れた名作を見つける', '나의 숨은 보석 찾기', 'Mein Geheimtipp finden')}
      </button>
    </div>
  )
}
