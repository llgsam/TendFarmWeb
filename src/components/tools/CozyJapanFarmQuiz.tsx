'use client'

import { useState } from 'react'
import { BASE_URL } from '@/lib/config'

type Pick = 'fomtremake' | 'doraemon' | 'sunnyside' | 'littledragon'

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
    q_en: 'What draws you most to cozy Japanese farming sims?',
    q_zh: '你最被日式温馨农场游戏的哪个方面吸引？',
    q_zhTW: '你最被日式溫馨農場遊戲的哪個方面吸引？',
    q_ja: '日本風のほのぼの農場ゲームで、何に一番惹かれますか？',
    q_ko: '일본 감성 코지 농장 게임에서 어떤 점이 가장 끌리나요?',
    q_de: 'Was zieht dich bei gemütlichen japanischen Farming-Sims am meisten an?',
    options: [
      {
        en: 'Recapturing childhood nostalgia — I want a faithful return to the classic Harvest Moon formula that defined the genre',
        zh: '重拾童年回忆——我想要回到那个定义了整个类型的经典牧场物语公式，纯正而忠实',
        zhTW: '重拾童年回憶——我想要回到那個定義了整個類型的經典牧場物語公式，純正而忠實',
        ja: '子どもの頃の懐かしさを取り戻したい——このジャンルを定義したクラシックな牧場物語の公式に忠実に戻りたい',
        ko: '어린 시절 추억을 되찾고 싶어 — 장르를 정의한 클래식 목장이야기 공식으로 순수하게 돌아가고 싶어요',
        de: 'Kindheitserinnerungen auffrischen — ich möchte zur klassischen Harvest Moon-Formel zurück, die das Genre definiert hat',
        type: 'fomtremake',
      },
      {
        en: 'A beloved IP as a gentle entry — familiar characters make the farming sim mechanics feel instantly welcoming and safe',
        zh: '用喜爱的IP作为温柔入口——熟悉的角色让农场游戏机制瞬间变得亲切，零负担上手',
        zhTW: '用喜愛的IP作為溫柔入口——熟悉的角色讓農場遊戲機制瞬間變得親切，零負擔上手',
        ja: '大好きなIPで気軽に始めたい——馴染みのキャラクターがいると農場ゲームのシステムも親しみやすくて安心できる',
        ko: '좋아하는 IP로 가볍게 입문 — 익숙한 캐릭터가 있으면 농장 게임 시스템도 부담 없이 다가와요',
        de: 'Mein Lieblings-IP als sanfter Einstieg — vertraute Charaktere machen die Farming-Mechaniken sofort einladend',
        type: 'doraemon',
      },
      {
        en: 'Fresh modern anime style — I want vivid art, new ideas, and a contemporary take on the genre, not a nostalgia trip',
        zh: '焕新的现代动漫风格——我想要色彩鲜艳的画风、全新创意和当代视角，而不是怀旧之旅',
        zhTW: '煥新的現代動漫風格——我想要色彩鮮艷的畫風、全新創意和當代視角，而不是懷舊之旅',
        ja: '新しいモダンなアニメスタイルが欲しい——ノスタルジーじゃなく、鮮やかなビジュアルと新しいアイデアで今の感覚を楽しみたい',
        ko: '세련된 현대 애니메이션 스타일 — 추억 소환보다는 화려한 비주얼과 새로운 아이디어로 장르를 새롭게 즐기고 싶어요',
        de: 'Frischer moderner Anime-Stil — ich will lebendige Grafik und neue Ideen statt eines Nostalgie-Trips',
        type: 'sunnyside',
      },
      {
        en: 'Cooking, community, and a dragon — I want to nurture something unique: a café, regulars, and a creature that grows alongside me',
        zh: '料理、社区和一条龙——我想要守护一些独特的东西：一间咖啡馆、常客们，还有一起成长的小龙',
        zhTW: '料理、社區和一條龍——我想要守護一些獨特的東西：一間咖啡館、常客們，還有一起成長的小龍',
        ja: '料理とコミュニティと龍——カフェと常連客と、一緒に育っていくドラゴン。そんな唯一無二の体験を大切にしたい',
        ko: '요리와 마을 사람들, 그리고 용 — 카페와 단골손님들, 함께 성장하는 작은 용을 키워가고 싶어요',
        de: 'Kochen, Gemeinschaft und ein Drache — ich möchte ein Café führen, Stammgäste haben und einen Drachen aufwachsen sehen',
        type: 'littledragon',
      },
    ],
  },
  {
    q_en: 'How do you feel about game length and overall scope?',
    q_zh: '你对游戏时长和整体规模有什么感受？',
    q_zhTW: '你對遊戲時長和整體規模有什麼感受？',
    q_ja: 'ゲームのボリュームや全体的な規模について、どう思いますか？',
    q_ko: '게임 플레이 시간과 전체적인 규모에 대해 어떻게 생각하나요?',
    q_de: 'Wie stehst du zur Spiellänge und zum Gesamtumfang?',
    options: [
      {
        en: 'Long and patient — I am happy to spend 50+ hours building relationships across multiple in-game years and seeing all seasonal events',
        zh: '漫长而专注——我很乐意花50小时以上，跨越多个游戏内年份建立关系、体验所有季节活动',
        zhTW: '漫長而專注——我很樂意花50小時以上，跨越多個遊戲內年份建立關係、體驗所有季節活動',
        ja: 'じっくり長く——複数のゲーム内年数をかけて関係を築き、すべての季節イベントを楽しむために50時間以上費やしても全然構わない',
        ko: '길고 여유롭게 — 여러 게임 내 연도에 걸쳐 관계를 쌓고 모든 계절 이벤트를 즐기는 데 50시간 이상 써도 좋아요',
        de: 'Lang und geduldig — ich bin gerne bereit, 50+ Stunden zu verbringen und Beziehungen über mehrere In-Game-Jahre aufzubauen',
        type: 'fomtremake',
      },
      {
        en: 'Comfortable and completable — I want a 25-35 hour experience that tells a full story and lets me see the ending credits',
        zh: '舒适而完整——我想要一个25-35小时的体验，讲完一个完整故事，让我看到结局字幕',
        zhTW: '舒適而完整——我想要一個25-35小時的體驗，講完一個完整故事，讓我看到結局字幕',
        ja: 'まとまりよく終わりたい——25〜35時間でしっかり物語が完結して、エンドロールを見られる体験が理想',
        ko: '완결감 있게 — 25~35시간 안에 완전한 이야기를 마무리하고 엔딩 크레딧을 볼 수 있는 경험이 좋아요',
        de: 'Überschaubar und komplett — ich will ein 25-35 Stunden Erlebnis mit einer vollständigen Geschichte und Abspann',
        type: 'doraemon',
      },
      {
        en: 'Expansive and layered — I want lots of systems, quests, and content to explore across many sessions over months',
        zh: '宏大而层次丰富——我想要大量系统、任务和内容，可以在数月内多次游玩慢慢探索',
        zhTW: '宏大而層次豐富——我想要大量系統、任務和內容，可以在數月內多次遊玩慢慢探索',
        ja: '広くて奥深い——システムやクエストやコンテンツが山盛りで、何ヶ月もかけてじっくり探索できるゲームが好き',
        ko: '방대하고 다층적으로 — 수개월에 걸쳐 탐험할 수 있는 많은 시스템, 퀘스트, 콘텐츠가 가득한 게임을 원해요',
        de: 'Weitläufig und vielschichtig — ich will viele Systeme, Quests und Inhalte, die ich über Monate erkunden kann',
        type: 'sunnyside',
      },
      {
        en: 'Focused and intimate — I prefer a shorter story (20-25 hours) that knows its scope and ends with its narrative resolved',
        zh: '精炼而亲密——我更喜欢知道自己边界的短篇故事（20-25小时），在叙事完结时画上句点',
        zhTW: '精煉而親密——我更喜歡知道自己邊界的短篇故事（20-25小時），在敘事完結時畫上句點',
        ja: 'コンパクトで深い——物語の幅をわきまえた短めの作品（20〜25時間）で、ナラティブがきれいに完結するのが好き',
        ko: '짧고 알차게 — 20~25시간의 아담한 분량으로 이야기가 깔끔하게 마무리되는 게임이 좋아요',
        de: 'Kompakt und intim — ich bevorzuge eine kürzere Geschichte (20-25 Stunden), die ihren Rahmen kennt und klar abschließt',
        type: 'littledragon',
      },
    ],
  },
  {
    q_en: 'How important is romance and marriage to your farming sim experience?',
    q_zh: '恋爱和结婚对你的农场游戏体验有多重要？',
    q_zhTW: '戀愛和結婚對你的農場遊戲體驗有多重要？',
    q_ja: '恋愛や結婚は、農場ゲームの体験においてどれくらい大切ですか？',
    q_ko: '연애와 결혼이 농장 게임 경험에서 얼마나 중요한가요?',
    q_de: 'Wie wichtig sind Romanze und Heirat für dein Farming-Sim-Erlebnis?',
    options: [
      {
        en: 'Central — building a relationship over years, choosing a spouse carefully, and raising a family is part of the core fantasy',
        zh: '非常核心——花数年时间建立感情、慎重选择伴侣、养育家庭，是整个游戏幻想的重要组成',
        zhTW: '非常核心——花數年時間建立感情、慎重選擇伴侶、養育家庭，是整個遊戲幻想的重要組成',
        ja: '核心要素——何年もかけて関係を育て、慎重にパートナーを選び、家族を作る。それがゲームの醍醐味の一部',
        ko: '핵심 요소 — 수년에 걸쳐 감정을 쌓고, 신중하게 배우자를 선택하고, 가정을 꾸리는 것이 게임 판타지의 중요한 부분이에요',
        de: 'Zentral — über Jahre eine Beziehung aufzubauen, einen Partner sorgfältig zu wählen und eine Familie zu gründen ist Teil des Kernfantasys',
        type: 'fomtremake',
      },
      {
        en: 'Present but light — I enjoy the friendship and relationship mechanics but do not need marriage to be the emotional centerpiece',
        zh: '有就好——我享受友谊和关系机制，但不需要婚姻成为情感核心',
        zhTW: '有就好——我享受友誼和關係機制，但不需要婚姻成為情感核心',
        ja: 'あるといい感じ——友好関係のシステムは楽しいけど、結婚が感情の中心じゃなくてもいい',
        ko: '있으면 좋지만 — 우정과 관계 시스템은 즐기지만, 결혼이 감정의 핵심이 될 필요는 없어요',
        de: 'Vorhanden aber leicht — ich mag Freundschafts- und Beziehungsmechaniken, aber Heirat muss nicht der emotionale Mittelpunkt sein',
        type: 'doraemon',
      },
      {
        en: 'Important and expanded — I want expressive modern romance with meaningful dialogue, distinct backstories, and emotional scenes',
        zh: '重要且更丰富——我想要有表现力的现代恋爱系统，包含有意义的对话、独特的角色背景和情感场景',
        zhTW: '重要且更豐富——我想要有表現力的現代戀愛系統，包含有意義的對話、獨特的角色背景和情感場景',
        ja: '充実した恋愛が欲しい——意味のある台詞、独自のバックストーリー、感情的なシーンがある現代的ロマンスを楽しみたい',
        ko: '풍부하고 중요하게 — 의미 있는 대화, 독특한 배경 스토리, 감정적인 장면이 있는 세련된 현대 연애 시스템을 원해요',
        de: 'Wichtig und ausgebaut — ich will ausdrucksstarke moderne Romanzen mit bedeutungsvollem Dialog und emotionalen Szenen',
        type: 'sunnyside',
      },
      {
        en: 'Not the focus — my emotional investment goes to the dragon and the café regulars rather than a romantic relationship',
        zh: '不是重点——我的情感投入在于小龙和咖啡馆常客，而不是浪漫关系',
        zhTW: '不是重點——我的情感投入在於小龍和咖啡館常客，而不是浪漫關係',
        ja: 'そこじゃない——感情移入の対象はドラゴンとカフェの常連客であって、恋愛関係じゃない',
        ko: '중요하지 않아요 — 저의 감정 투자는 드래곤과 카페 단골손님들에게 있지, 연애 관계에 있지 않아요',
        de: 'Nicht der Fokus — mein emotionales Investment gilt dem Drachen und den Café-Stammgästen, nicht einer romantischen Beziehung',
        type: 'littledragon',
      },
    ],
  },
  {
    q_en: 'Which art and music aesthetic appeals to you most?',
    q_zh: '哪种画风和音乐美学最能打动你？',
    q_zhTW: '哪種畫風和音樂美學最能打動你？',
    q_ja: 'アートと音楽のどんな雰囲気に一番惹かれますか？',
    q_ko: '어떤 아트 스타일과 음악 감성이 가장 마음에 드나요?',
    q_de: 'Welche Kunst- und Musikästhetik spricht dich am meisten an?',
    options: [
      {
        en: 'Warm pixel-adjacent 3D with that classic Marvelous pastoral score — nostalgic, gentle, and exactly what you remember',
        zh: '温暖的类像素3D风格，搭配经典Marvelous田园配乐——怀旧、温柔，和你记忆中的一模一样',
        zhTW: '溫暖的類像素3D風格，搭配經典Marvelous田園配樂——懷舊、溫柔，和你記憶中的一模一樣',
        ja: '温かみのある3Dで、あのMarvelousの牧歌的なBGM——懐かしくて優しくて、記憶の中とそのまま',
        ko: '따뜻한 3D 스타일에 클래식 Marvelous 전원 음악 — 향수 어리고 포근하며 기억 속 그대로예요',
        de: 'Warmes pixelähnliches 3D mit dem klassischen Marvelous Pastoralsoundtrack — nostalgisch, sanft, genau wie in Erinnerung',
        type: 'fomtremake',
      },
      {
        en: "Cheerful and colorful 3D faithful to Doraemon's iconic visual language — reassuring, familiar, and full of that Fujiko F. Fujio warmth",
        zh: '活泼缤纷的3D风格，忠实还原哆啦A梦的标志性视觉语言——令人安心，充满藤子·F·不二雄的温情',
        zhTW: '活潑繽紛的3D風格，忠實還原哆啦A夢的標誌性視覺語言——令人安心，充滿藤子·F·不二雄的溫情',
        ja: 'ドラえもんらしい明るくカラフルな3D——安心感があって、藤子・F・不二雄ワールドの温かさそのもの',
        ko: '도라에몽 특유의 밝고 화사한 3D 스타일 — 편안하고 친숙하며 후지코 F. 후지오 특유의 따뜻함이 가득해요',
        de: "Fröhliches und farbenfrohes 3D, das Doraemon's ikonische Bildsprache treu nachbildet — beruhigend und voller Fujiko F. Fujio-Wärme",
        type: 'doraemon',
      },
      {
        en: 'Gorgeous anime-influenced 3D — bright, expressive character designs and environments that feel adjacent to modern JRPG aesthetics',
        zh: '华丽的动漫影响3D风格——明亮而富有表现力的角色设计和场景，接近现代JRPG美学',
        zhTW: '華麗的動漫影響3D風格——明亮而富有表現力的角色設計和場景，接近現代JRPG美學',
        ja: 'アニメ系の華やかな3D——明るくて表情豊かなキャラデザと世界観、現代JRPGに近い感じ',
        ko: '화려한 애니메이션 영향의 3D — 밝고 표현력 풍부한 캐릭터 디자인과 배경이 현대 JRPG 미학에 가까워요',
        de: 'Wunderschönes anime-inspiriertes 3D — helle, ausdrucksstarke Charakterdesigns, die an moderne JRPG-Ästhetik erinnern',
        type: 'sunnyside',
      },
      {
        en: 'Gentle storybook 3D with a watercolor-adjacent softness — cozy and understated, more like a fairy tale than an anime',
        zh: '温柔的绘本感3D风格，带有水彩画般的柔和感——温馨而内敛，更像童话而非动漫',
        zhTW: '溫柔的繪本感3D風格，帶有水彩畫般的柔和感——溫馨而內斂，更像童話而非動漫',
        ja: 'やさしい絵本みたいな3D、水彩っぽいふんわり感——アニメよりも童話の世界みたいで落ち着く',
        ko: '따뜻한 그림책 같은 3D, 수채화 같은 부드러운 느낌 — 애니메이션보다 동화에 가깝고 아늑해요',
        de: 'Sanftes Bilderbuch-3D mit aquarellartiger Weichheit — gemütlich und dezent, eher wie ein Märchen als ein Anime',
        type: 'littledragon',
      },
    ],
  },
  {
    q_en: 'How do you relate to the history of the Harvest Moon / Story of Seasons franchise?',
    q_zh: '你和牧场物语/Story of Seasons系列有什么渊源？',
    q_zhTW: '你和牧場物語/Story of Seasons系列有什麼淵源？',
    q_ja: '牧場物語/Story of Seasonsシリーズとの思い出やつながりは？',
    q_ko: '목장이야기 / Story of Seasons 시리즈와 어떤 인연이 있나요?',
    q_de: 'Welche Beziehung hast du zur Geschichte der Harvest Moon / Story of Seasons-Franchise?',
    options: [
      {
        en: 'Deep fan — I played Friends of Mineral Town on GBA and the feeling of returning to Mineral Town in HD has real emotional weight for me',
        zh: '深度粉丝——我在GBA上玩过矿石镇的伙伴们，以高清画质回归矿石镇对我来说有真实的情感重量',
        zhTW: '深度粉絲——我在GBA上玩過礦石鎮的夥伴們，以高清畫質回歸礦石鎮對我來說有真實的情感重量',
        ja: '深いファン——GBAで牧場物語をプレイしてきたし、HDで鉱石の里に戻ることには本当に感慨深いものがある',
        ko: '깊은 팬 — GBA로 광석마을의 친구들을 플레이했고, HD로 광석마을로 돌아가는 건 진짜 감동이에요',
        de: 'Tiefgläubiger Fan — ich habe Friends of Mineral Town auf dem GBA gespielt und die Rückkehr nach Mineral Town in HD hat echtes emotionales Gewicht',
        type: 'fomtremake',
      },
      {
        en: 'Newcomer via crossover — Doraemon brought me into the genre and I now want to explore more, but started with this soft landing',
        zh: '通过联动入坑——哆啦A梦带我进入这个类型，我现在想探索更多，但从这个温柔的起点开始的',
        zhTW: '透過聯動入坑——哆啦A夢帶我進入這個類型，我現在想探索更多，但從這個溫柔的起點開始的',
        ja: 'コラボで知った新参者——ドラえもんがきっかけでこのジャンルに入って、もっと探求したくなった',
        ko: '콜라보로 입문 — 도라에몽이 이 장르로 데려다줬고, 이제 더 탐험하고 싶어졌어요',
        de: 'Neueinsteiger über das Crossover — Doraemon hat mich in das Genre eingeführt und ich möchte jetzt mehr erkunden',
        type: 'doraemon',
      },
      {
        en: 'Forward-looking player — I appreciate the history but I am more excited about where the genre is heading than where it has been',
        zh: '前瞻型玩家——我欣赏历史，但对类型的未来发展比对过去更感兴奋',
        zhTW: '前瞻型玩家——我欣賞歷史，但對類型的未來發展比對過去更感興奮',
        ja: '前向きなプレイヤー——歴史は大切にするけど、このジャンルがこれからどこへ向かうかの方がずっとワクワクする',
        ko: '미래지향적 플레이어 — 역사는 인정하지만, 이 장르가 앞으로 어디로 향할지가 훨씬 더 기대돼요',
        de: 'Zukunftsorientierter Spieler — ich schätze die Geschichte, aber mich begeistert mehr, wohin das Genre geht, als wo es war',
        type: 'sunnyside',
      },
      {
        en: 'Creator-follower — I am specifically interested in what Yasuhiro Wada (Harvest Moon creator) makes, regardless of which company holds the license',
        zh: '跟随创作者——我特别关注和田康弘（牧场物语创始人）的新作，无论版权归属哪家公司',
        zhTW: '跟隨創作者——我特別關注和田康弘（牧場物語創始人）的新作，無論版權歸屬哪家公司',
        ja: 'クリエイターを追うファン——和田康弘さん（牧場物語の生みの親）の新作を追いかけている。版権がどこにあろうと関係ない',
        ko: '크리에이터 추종자 — 어느 회사가 판권을 가지든 상관없이 목장이야기 창시자 와다 야스히로의 새 작품에 관심이 있어요',
        de: 'Creator-Follower — ich interessiere mich speziell für das, was Yasuhiro Wada (Harvest Moon-Erfinder) macht, egal welche Firma die Lizenz hält',
        type: 'littledragon',
      },
    ],
  },
  {
    q_en: 'What does your ideal cozy farming session look like?',
    q_zh: '你理想中的温馨农场游戏时光是什么样的？',
    q_zhTW: '你理想中的溫馨農場遊戲時光是什麼樣的？',
    q_ja: '理想のほのぼの農場ゲームタイムって、どんな感じ？',
    q_ko: '이상적인 코지 농장 게임 플레이 시간은 어떤 모습인가요?',
    q_de: 'Wie sieht deine ideale gemütliche Farming-Session aus?',
    options: [
      {
        en: 'Morning chores, then gifts for the villager I like, then a festival — and slowly, across many seasons, I see them open up to me',
        zh: '早晨干农活，然后给喜欢的村民送礼物，再参加节日——就这样，跨越许多季节，慢慢看着他们对我敞开心扉',
        zhTW: '早晨幹農活，然後給喜歡的村民送禮物，再參加節日——就這樣，跨越許多季節，慢慢看著他們對我敞開心扉',
        ja: '朝に農作業して、好きな村人にプレゼントして、お祭りに参加して——そうして何シーズンもかけて、少しずつ心を開いてくれるのを見守る',
        ko: '아침에 농사일 하고, 좋아하는 마을 사람에게 선물 주고, 축제 참가하고 — 그렇게 많은 계절을 지나며 천천히 마음을 열어가는 걸 지켜봐요',
        de: 'Morgens Pflichten erledigen, dann Geschenke bringen, dann ein Festival besuchen — und langsam, über viele Jahreszeiten, sehen, wie sie sich mir öffnen',
        type: 'fomtremake',
      },
      {
        en: 'A peaceful afternoon with Doraemon and friends, planting crops, seeing what gadgets help today, and enjoying the gentle humor',
        zh: '和哆啦A梦及伙伴们一起的宁静下午，种种植物，看看今天哪个道具能帮上忙，享受温柔的幽默感',
        zhTW: '和哆啦A夢及夥伴們一起的寧靜下午，種種植物，看看今天哪個道具能幫上忙，享受溫柔的幽默感',
        ja: 'ドラえもんとみんなと過ごすのんびりした午後。作物を植えて、今日は何の道具が役に立つかな、とやさしいユーモアを楽しむ',
        ko: '도라에몽과 친구들과 함께하는 평화로운 오후, 작물 심고, 오늘은 어떤 도구가 도움이 될지 보면서 따뜻한 유머를 즐기는 것',
        de: 'Ein ruhiger Nachmittag mit Doraemon und Freunden, Pflanzen setzen, schauen welche Gadgets heute helfen, und den sanften Humor genießen',
        type: 'doraemon',
      },
      {
        en: 'A session where I complete a quest, discover a new area, deepen a relationship, and upgrade my farm — busy in the best way',
        zh: '完成一个任务、发现新区域、深化一段关系、升级农场的游戏时光——以最好的方式充实',
        zhTW: '完成一個任務、發現新區域、深化一段關係、升級農場的遊戲時光——以最好的方式充實',
        ja: 'クエストをこなして、新エリアを発見して、誰かとの関係を深めて、農場をアップグレードする——忙しいけど、最高に充実した時間',
        ko: '퀘스트 완료하고, 새 지역 발견하고, 관계 깊어지고, 농장 업그레이드 — 최고로 알찬 방식으로 바쁜 시간',
        de: 'Eine Session, in der ich einen Quest abschließe, ein neues Gebiet entdecke, eine Beziehung vertiefe und meine Farm aufrüste — produktiv im besten Sinne',
        type: 'sunnyside',
      },
      {
        en: 'Cooking for the café, watching my dragon grow a little bigger, and seeing a lonely customer slowly become a regular — quiet but meaningful',
        zh: '为咖啡馆备菜，看着小龙又长大了一点点，看一位孤独的顾客慢慢成为常客——安静却有意义',
        zhTW: '為咖啡館備菜，看著小龍又長大了一點點，看一位孤獨的顧客慢慢成為常客——安靜卻有意義',
        ja: 'カフェの仕込みをして、ドラゴンがまた少し大きくなったのを確認して、ひとりぼっちのお客さんが少しずつ常連になっていくのを見守る——静かだけど、じんとくる',
        ko: '카페 음식 준비하고, 작은 드래곤이 조금 더 자란 걸 보고, 외로운 손님이 서서히 단골이 되어가는 걸 지켜보는 것 — 조용하지만 의미 있어요',
        de: 'Für das Café kochen, meinen Drachen ein bisschen größer werden sehen, und einem einsamen Kunden beim Werden zum Stammgast zusehen — still aber bedeutsam',
        type: 'littledragon',
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
  fomtremake: {
    title_en: 'Story of Seasons: Friends of Mineral Town',
    title_zh: '牧场物语：矿石镇的伙伴们（重制版）',
    title_zhTW: '牧場物語：礦石鎮的夥伴們（重製版）',
    title_ja: '牧場物語 再会のミネラルタウン',
    title_ko: 'Story of Seasons: 광석마을의 친구들',
    title_de: 'Story of Seasons: Friends of Mineral Town',
    emoji: '🏔️',
    tag_en: 'The Nostalgic Homecoming Farmer',
    tag_zh: '怀旧归乡的农场人',
    tag_zhTW: '懷舊歸鄉的農場人',
    tag_ja: 'ノスタルジックな帰郷ファーマー',
    tag_ko: '추억을 찾아 돌아온 농부',
    tag_de: 'Der nostalgische Heimkehrer-Farmer',
    platform_en: 'Nintendo Switch · PC (Steam)',
    platform_zh: 'Nintendo Switch · PC (Steam)',
    platform_zhTW: 'Nintendo Switch · PC (Steam)',
    platform_ja: 'Nintendo Switch · PC (Steam)',
    platform_ko: 'Nintendo Switch · PC (Steam)',
    platform_de: 'Nintendo Switch · PC (Steam)',
    why_en: `Story of Seasons: Friends of Mineral Town (2020) is the definitive modern version of one of the most beloved farming sims ever made. The original Harvest Moon: Friends of Mineral Town launched on Game Boy Advance in 2003 and became a touchstone for an entire generation of players who grew up tending crops before school, in the car, and under the covers at night with the backlight dimmed so no one would know they were still awake. The 2020 remake by Marvelous preserves everything that made the original special — Mineral Town's iconic cast, the four-season cycle, the festivals, the mines, and the slow accumulation of relationship hearts — while upgrading the visuals to a warm, clean 3D style and adding modern quality-of-life improvements including same-sex marriage options that let players experience the story in ways the original never allowed. The remake is not trying to reinvent the genre or compete with Stardew Valley on scope — it is an honest, loving reconstruction of something that meant a lot to people and still means something today. The heart of the game is the relationships: learning that Cliff feels isolated because he never found his place, that Gray hides his passion for blacksmithing behind gruffness, that Ann just wants someone to take her seriously. These are small-town stories told in short daily conversations over multiple in-game years, and if you have the patience to let them develop, they land with unexpected emotional force. Friends of Mineral Town is the game that taught a generation what farming sims could be, and the remake makes that lesson available again without compromising it.`,
    why_zh: `《牧场物语：矿石镇的伙伴们》(2020)是史上最受喜爱的农场模拟游戏之一的权威现代版本。原版《牧场物语：矿石镇的伙伴们》2003年登陆GameBoy Advance，成为整整一代玩家的童年情结——他们在上学前、坐车时、被子里偷偷开着背光玩到深夜。2020年重制版由Marvelous制作，保留了让原版如此特别的一切：矿石镇标志性的角色群、四季轮回、节日、矿山，以及缓慢积累的好感度——同时升级了视觉效果，加入了同性婚姻选项，让原版从未允许的故事成为可能。游戏的核心是人际关系：发现克利夫因为始终找不到归属感而感到孤独，格雷把对铁匠手艺的热情隐藏在粗鲁外表之下，安只是希望有人认真对待她。这些是小镇故事，通过跨越多个游戏年份的每日短暂对话缓慢展开，如果你有耐心等待它们发展，会带来出人意料的情感冲击。`,
    why_zhTW: `《牧場物語：礦石鎮的夥伴們》（2020）是史上最受喜愛的農場模擬遊戲之一的權威現代版本。原版2003年登陸GameBoy Advance，成為整整一代玩家的童年情結——他們在上學前、坐車時、被子裡偷偷開著背光玩到深夜。2020年重製版由Marvelous製作，保留了讓原版如此特別的一切：礦石鎮標誌性的角色群、四季輪迴、節日、礦山，以及緩慢積累的好感度——同時升級了視覺效果，加入了同性婚姻選項，讓原版從未允許的故事成為可能。遊戲的核心是人際關係：發現克利夫因為始終找不到歸屬感而感到孤獨，格雷把對鐵匠手藝的熱情隱藏在粗魯外表之下，安只是希望有人認真對待她。這些是小鎮故事，透過跨越多個遊戲年份的每日短暫對話緩慢展開，如果你有耐心等待它們發展，會帶來出人意料的情感衝擊。`,
    why_ja: `『牧場物語 再会のミネラルタウン』（2020）は、史上最も愛された農場シムのひとつの決定版リメイクです。原作がGBAで発売された2003年当時、このゲームは一世代全体の子ども時代を彩りました——授業前に、電車の中に、布団の中でバックライトを暗くして眠れずに遊んだ記憶を持つプレイヤーたちの宝物です。Marvelousが手がけた2020年リメイクは、原作の素晴らしさをすべて守りながら——ミネラルタウンの個性的なキャスト、四季のサイクル、お祭り、鉱山、少しずつ積み重なる好感度——ビジュアルを温かみのある清潔感ある3Dにアップグレードし、同性婚オプションも追加されました。ゲームの本質は人間関係にあります：クリフが居場所を見つけられずにいる孤独感、グレイが鍛冶への情熱を無愛想さで隠していること、アンがただ誰かに真剣に向き合ってほしいと思っていること。これらは複数のゲーム内年数にわたる短い日常会話で少しずつ語られる小さな町の物語で、辛抱強く付き合っていると、思いがけない感動が待っています。`,
    why_ko: `《스토리 오브 시즌즈: 광석마을의 친구들》(2020)은 역대 가장 사랑받는 농장 시뮬레이션 게임 중 하나의 결정판 현대 리메이크입니다. 원작은 2003년 GBA로 출시되어 한 세대 전체의 어린 시절을 함께한 게임이 되었습니다——등교 전, 차 안에서, 이불 속에서 화면 밝기를 낮추고 몰래 플레이했던 기억들이죠. Marvelous가 제작한 2020년 리메이크는 원작을 특별하게 만든 모든 것을 보존했습니다. 광석마을의 개성 있는 캐릭터들, 사계절 사이클, 축제, 광산, 천천히 쌓이는 호감도——여기에 따뜻한 3D 비주얼과 동성 결혼 옵션까지 추가되었습니다. 게임의 핵심은 인간관계입니다. 클리프가 왜 항상 소외감을 느끼는지, 그레이가 대장장이에 대한 열정을 퉁명스러움으로 숨기는 이유, 앤이 그저 누군가가 진지하게 대해주기를 바란다는 사실을 알아가는 것이죠. 여러 게임 내 연도에 걸쳐 짧은 일상 대화로 천천히 풀려나가는 소도시 이야기들로, 인내심을 갖고 지켜보면 예상치 못한 감동이 찾아옵니다.`,
    why_de: `Story of Seasons: Friends of Mineral Town (2020) ist die definitive moderne Version eines der beliebtesten Farming-Sims aller Zeiten. Das Original erschien 2003 auf dem Game Boy Advance und wurde zum Fixpunkt für eine ganze Generation von Spielern, die aufgewachsen sind, indem sie vor der Schule, im Auto und nachts unter der Bettdecke mit gedimmtem Hintergrundlicht gespielt haben. Das 2020er Remake von Marvelous bewahrt alles, was das Original besonders gemacht hat — Mineral Towns ikonische Besetzung, den Vier-Jahreszeiten-Zyklus, die Feste, die Minen und die langsame Ansammlung von Herzpunkten — während es die Grafik auf einen warmen, sauberen 3D-Stil aufwertet und gleichgeschlechtliche Heiratsoptionen einführt. Das Herzstück des Spiels sind die Beziehungen: zu lernen, dass Cliff sich isoliert fühlt, dass Gray seine Leidenschaft fürs Schmieden hinter Schroffheit versteckt, dass Ann einfach möchte, dass jemand sie ernst nimmt. Das sind Kleinstadt-Geschichten, erzählt in kurzen täglichen Gesprächen über mehrere In-Game-Jahre hinweg, die mit unerwarteter emotionaler Kraft landen, wenn man die Geduld hat, sie sich entwickeln zu lassen.`,
    tip_en: `The most important early investment in Friends of Mineral Town is not upgrading your tools or expanding your farm — it is entering the mines and descending as deep as possible to unlock the Lake Mine before winter. The Lake Mine contains ore for the Cursed/Blessed tool upgrades that eventually eliminate tool stamina costs entirely, dramatically changing late-game efficiency. Time your mine descent pushes: go in the morning with full stamina, bring a Teleport Stone if you have one (or a Bodigizer XL), and always carry enough fodder to return safely. For relationship building, give the bachelors and bachelorettes gifts every day rather than every week — the heart points accumulate much faster with daily contact, and seeing their unique dialogue that unlocks at each heart level is among the game's richest content.`,
    tip_zh: `在《矿石镇的伙伴们》中，最重要的早期投资不是升级工具或扩大农场——而是进入矿山尽可能深入，在冬季之前解锁湖面矿山。湖面矿山包含诅咒/祝福工具升级所需的矿石，最终完全消除工具耐力消耗，彻底改变后期游戏效率。把握好进矿时机：早晨满耐力入矿，如果有传送石（或特效药）就带上，始终携带足够物品安全返回。建立关系方面，每天而不是每周给追求对象送礼物——每日接触能大幅加快好感度积累，解锁每个心形等级的专属对话是游戏最丰富的内容之一。`,
    tip_zhTW: `在《礦石鎮的夥伴們》中，最重要的早期投資不是升級工具或擴大農場——而是進入礦山盡可能深入，在冬季之前解鎖湖面礦山。湖面礦山包含詛咒/祝福工具升級所需的礦石，最終完全消除工具耐力消耗，徹底改變後期遊戲效率。把握好進礦時機：早晨滿耐力入礦，如果有傳送石就帶上，始終攜帶足夠物品安全返回。建立關係方面，每天而不是每週給追求對象送禮物——每日接觸能大幅加快好感度積累，解鎖每個心形等級的專屬對話是遊戲最豐富的內容之一。`,
    tip_ja: `序盤で一番大事な投資は、ツールのアップグレードでも農場拡張でもなく——冬が来る前に鉱山を深く掘り進んで「湖の鉱山」を解放することです。ここには呪いのツール/祝福のツールアップグレードに必要な鉱石があり、最終的にはツールのスタミナ消費をゼロにできるので、後半の効率が劇的に変わります。鉱山攻略のコツ：朝にスタミナ満タンで入り、テレポートストーンがあれば持参し、帰還できる体力を常に残しておくこと。好感度を上げるなら、週一ではなく毎日プレゼントを贈る方が圧倒的に早い。各ハートレベルで解放される専用会話は、このゲームの中でも特に豊かなコンテンツです。`,
    tip_ko: `《광석마을의 친구들》에서 초반에 가장 중요한 투자는 도구 업그레이드나 농장 확장이 아닙니다——겨울이 오기 전에 광산을 최대한 깊이 파고 내려가 호수 광산을 해방시키는 것입니다. 호수 광산에는 저주받은/축복받은 도구 업그레이드에 필요한 광석이 있으며, 결국 도구 스태미나 소모를 완전히 없애 후반 효율이 극적으로 바뀝니다. 광산 진입 팁: 아침에 스태미나가 가득 찬 상태로 들어가고, 순간이동석이 있다면 챙기고, 항상 안전하게 돌아올 여유를 남겨두세요. 관계 구축은 주 1회가 아닌 매일 선물을 주는 것이 훨씬 빠릅니다. 각 하트 레벨에서 해금되는 전용 대화는 게임에서 가장 풍부한 콘텐츠 중 하나입니다.`,
    tip_de: `Die wichtigste Frühinvestition in Friends of Mineral Town ist nicht das Upgraden deiner Werkzeuge oder das Erweitern deiner Farm — es ist das Einsteigen in die Minen und das Hinabsteigen so tief wie möglich, um die Seemine vor dem Winter freizuschalten. Die Seemine enthält Erz für die Verfluchten/Gesegneten Werkzeug-Upgrades, die schließlich den Werkzeug-Staminaverbrauch vollständig eliminieren. Plane deine Minenabstiege: Gehe morgens mit voller Stamina rein, bring einen Teleportstein wenn du einen hast, und hab immer genug übrig um sicher zurückzukehren. Für den Beziehungsaufbau: Gib dem Auserwählten täglich Geschenke statt wöchentlich — die Herzpunkte häufen sich mit täglichem Kontakt viel schneller an, und die einzigartigen Dialoge auf jedem Herzlevel gehören zu den reichhaltigsten Inhalten des Spiels.`,
  },
  doraemon: {
    title_en: 'Doraemon: Story of Seasons',
    title_zh: '哆啦A梦：牧场物语',
    title_zhTW: '哆啦A夢：牧場物語',
    title_ja: 'ドラえもん のび太の牧場物語',
    title_ko: '도라에몽: 목장이야기',
    title_de: 'Doraemon: Story of Seasons',
    emoji: '🔵',
    tag_en: 'The Welcoming Crossover Farmer',
    tag_zh: '温柔联动的农场新人',
    tag_zhTW: '溫柔聯動的農場新人',
    tag_ja: 'なつかしのIPで始めた新顔ファーマー',
    tag_ko: '따뜻한 콜라보로 입문한 농장 초보자',
    tag_de: 'Der einladende Crossover-Farmer',
    platform_en: 'Nintendo Switch · PC (Steam)',
    platform_zh: 'Nintendo Switch · PC (Steam)',
    platform_zhTW: 'Nintendo Switch · PC (Steam)',
    platform_ja: 'Nintendo Switch · PC (Steam)',
    platform_ko: 'Nintendo Switch · PC (Steam)',
    platform_de: 'Nintendo Switch · PC (Steam)',
    why_en: `Doraemon: Story of Seasons occupies a genuinely clever position in the genre: it uses one of the most beloved anime/manga franchises in history as a comfort blanket to introduce players to the farming sim loop who might otherwise find Stardew Valley's depth overwhelming or Friends of Mineral Town's dated mechanics off-putting. The game drops Nobita, Doraemon, Shizuka, Gian, and Suneo into a rural farming village and tasks them with helping the community thrive while raising crops and forming friendships. Crucially, the Doraemon gadgets are incorporated directly into gameplay — the Anywhere Door, the Take-copter, the Small Light — and seeing these beloved objects woven into farming sim mechanics creates a particular kind of delight that fans of either the franchise or the genre will appreciate. The farming systems are full-featured without being overwhelming: seasons matter, crop quality varies, animal husbandry is present, and the social calendar includes festivals and character-specific events. Doraemon: Story of Seasons was developed by Brownies and published by Bandai Namco in partnership with Marvelous, and it manages the franchise crossover gracefully — this is not a shallow licensed cash-in but a sincere attempt to make a gentle, well-crafted farming sim using beloved characters. The sequel, Friends of the Great Kingdom (2022), expands the concept significantly. For players who love Doraemon and want to try the genre, or who want a stress-free introduction with lower difficulty and a known IP providing emotional scaffolding, this is precisely the right game.`,
    why_zh: `《哆啦A梦：牧场物语》在类型中占据了一个真正聪明的位置：它用史上最受喜爱的动漫/漫画IP之一作为舒适的引导，将可能觉得星露谷太深或矿石镇重制版机制过时的玩家引入农场游戏循环。游戏将大雄、哆啦A梦、静香、胖虎和小夫送到一个农村小镇，任务是在种植作物、建立友谊的同时帮助社区繁荣。最妙的是，哆啦A梦的道具直接融入了游戏玩法——任意门、竹蜻蜓、缩小灯——看到这些深爱的道具编织进农场游戏机制，会给系列粉丝或类型爱好者带来独特的惊喜感。农耕系统功能完整但不过分复杂，这是一款真诚的、精心制作的农场游戏，而不是肤浅的授权圈钱之作。`,
    why_zhTW: `《哆啦A夢：牧場物語》在類型中占據了一個真正聰明的位置：它用史上最受喜愛的動漫/漫畫IP之一作為舒適的引導，將可能覺得星露谷太深或礦石鎮重製版機制過時的玩家引入農場遊戲循環。遊戲將大雄、哆啦A夢、靜香、胖虎和小夫送到一個農村小鎮，任務是在種植作物、建立友誼的同時幫助社區繁榮。最妙的是，哆啦A夢的道具直接融入了遊戲玩法——任意門、竹蜻蜓、縮小燈——看到這些深愛的道具編織進農場遊戲機制，會給系列粉絲或類型愛好者帶來獨特的驚喜感。農耕系統功能完整但不過分複雜，這是一款真誠的、精心製作的農場遊戲，而不是膚淺的授權圈錢之作。`,
    why_ja: `『ドラえもん のび太の牧場物語』は、このジャンルの中で本当にうまい立ち位置を占めています。歴史上もっとも愛されてきたアニメ/漫画IPのひとつをクッションとして使い、スターデューバレーの深さに圧倒されそうな人を農場ゲームの世界へ引き込んでくれます。のび太とドラえもん、しずか、ジャイアン、スネ夫が農村の町に送り込まれ、作物を育てながら友情を育んで、地域コミュニティを盛り上げる物語です。とくに嬉しいのは、ひみつ道具がゲームプレイに直接組み込まれていること——どこでもドア、タケコプター、スモールライト。あの懐かしい道具たちが農場ゲームのシステムと絡み合う瞬間は、ファンにも初心者にも格別の喜びをもたらします。農業システムは充実していながら複雑すぎず、誠実に丁寧に作られた一本です。`,
    why_ko: `《도라에몽: 목장이야기》는 장르 안에서 정말 영리한 위치를 차지합니다. 역사상 가장 사랑받는 애니메이션/만화 IP 중 하나를 안전망으로 삼아, 스타듀 밸리가 너무 깊게 느껴지거나 클래식 목장이야기 시스템이 낯선 플레이어들을 농장 게임의 세계로 안내합니다. 노비타, 도라에몽, 시즈카, 자이안, 스네오가 농촌 마을에 들어가 작물을 키우고 우정을 쌓으며 지역 공동체를 번영시키는 이야기입니다. 가장 매력적인 점은 도라에몽의 비밀도구들이 게임플레이에 직접 통합된다는 것입니다——어디서든 문, 대나무헬기, 소형화 전구. 소중한 도구들이 농장 게임 메커니즘과 엮이는 순간은 시리즈 팬과 장르 팬 모두에게 특별한 기쁨을 줍니다. 농업 시스템은 완성도 있으면서도 부담스럽지 않아, 진심으로 정성스럽게 만들어진 작품입니다.`,
    why_de: `Doraemon: Story of Seasons nimmt eine wirklich clevere Position im Genre ein: Es nutzt eines der beliebtesten Anime/Manga-Franchises der Geschichte als Einstiegshilfe, um Spieler in den Farming-Sim-Loop einzuführen, die Stardew Valleys Tiefe überwältigend finden könnten. Das Spiel schickt Nobita, Doraemon, Shizuka, Gian und Suneo in ein ländliches Dorf und beauftragt sie, der Gemeinschaft beim Gedeihen zu helfen. Besonders schön: Die Doraemon-Gadgets sind direkt in das Gameplay eingebaut — die Anywhere Door, der Take-copter, das Small Light. Das Einweben dieser geliebten Gegenstände in Farming-Sim-Mechaniken schafft eine besondere Freude. Das Spiel ist kein oberflächlicher Lizenz-Cash-In, sondern ein aufrichtiges, gut gemachtes Farming-Sim mit System und Substanz. Die Fortsetzung Friends of the Great Kingdom (2022) baut das Konzept erheblich aus.`,
    tip_en: `Doraemon: Story of Seasons is more forgiving than classic Harvest Moon games, but you can still accelerate your progress significantly by engaging with Doraemon's gadget events early. The gadgets are not just cosmetic — several unlock farming shortcuts that dramatically reduce daily workload. Prioritize completing the early story events that introduce each gadget rather than ignoring them to focus on pure farming efficiency. For social progression, Doraemon characters have hidden event triggers based on season and weather — on rainy days when you cannot farm, visit the characters you have been neglecting rather than staying home. The sequel (Friends of the Great Kingdom) is a significantly more ambitious game if you finish this one and want more, featuring improved graphics, deeper systems, and new characters while maintaining the same gentle tone.`,
    tip_zh: `《哆啦A梦：牧场物语》比经典牧场物语游戏更宽容，但你仍然可以通过早期参与哆啦A梦的道具事件来显著加速进度。这些道具不只是装饰性的——好几个能解锁大幅减轻日常工作量的农耕捷径。优先完成介绍每个道具的早期剧情事件，而不是忽略它们只专注纯农耕效率。关于社交进度，哆啦A梦角色有基于季节和天气的隐藏触发事件——在无法耕种的雨天，去拜访你一直忽视的角色，而不是待在家里。如果你玩完了这款游戏还想要更多，续作《哆啦A梦：大王国的伙伴们》是一款更有野心的作品，拥有改进的图形、更深入的系统和新角色，同时保持了相同的温柔基调。`,
    tip_zhTW: `《哆啦A夢：牧場物語》比經典牧場物語遊戲更寬容，但你仍然可以通過早期參與哆啦A夢的道具事件來顯著加速進度。這些道具不只是裝飾性的——好幾個能解鎖大幅減輕日常工作量的農耕捷徑。優先完成介紹每個道具的早期劇情事件，而不是忽略它們只專注純農耕效率。關於社交進度，哆啦A夢角色有基於季節和天氣的隱藏觸發事件——在無法耕種的雨天，去拜訪你一直忽視的角色，而不是待在家裡。如果你玩完了還想要更多，續作《哆啦A夢：大王國的夥伴們》是一款更有野心的作品。`,
    tip_ja: `『ドラえもん のび太の牧場物語』は従来の牧場物語よりおおらかですが、序盤からひみつ道具イベントに積極的に参加することで進行を大きく加速できます。道具はただの見た目じゃなく、複数が農作業の手間を大幅に省くショートカットを解放してくれます。各道具を紹介する序盤のストーリーイベントを優先してこなしてから農業効率を磨くのがおすすめ。社交面では、キャラクターには季節や天気に応じた隠しイベントがあります——農業できない雨の日は、今まで放置していたキャラクターを訪ねてみましょう。このゲームをクリアしてもっとやりたくなったら、続編の『ドラえもん のび太の大王国のなかまたち』はより大規模で意欲的な作品です。`,
    tip_ko: `《도라에몽: 목장이야기》는 클래식 목장이야기보다 관대하지만, 초반부터 도라에몽 도구 이벤트에 적극적으로 참여하면 진행을 크게 앞당길 수 있습니다. 도구들은 단순 장식이 아닙니다——여러 도구가 일상 작업량을 획기적으로 줄여주는 농사 단축키를 열어줍니다. 순수한 농사 효율보다는 각 도구를 소개하는 초반 스토리 이벤트를 우선 완료하는 것을 추천합니다. 소셜 진행도에서는, 캐릭터들이 계절과 날씨에 따른 숨겨진 이벤트를 갖고 있습니다——농사를 못 짓는 비 오는 날에는 집에 있기보다 그동안 소홀했던 캐릭터를 찾아가보세요. 이 게임을 마치고 더 원한다면, 속편은 훨씬 야심 찬 작품입니다.`,
    tip_de: `Doraemon: Story of Seasons ist vergebender als klassische Harvest Moon-Spiele, aber du kannst deinen Fortschritt erheblich beschleunigen, indem du dich früh mit Doraemon's Gadget-Events beschäftigst. Die Gadgets sind nicht nur dekorativ — mehrere schalten Farming-Abkürzungen frei, die den täglichen Arbeitsaufwand deutlich reduzieren. Priorisiere die frühen Story-Events, die jedes Gadget einführen. Für den sozialen Fortschritt: Charaktere haben versteckte Event-Trigger basierend auf Jahreszeit und Wetter — an Regentagen besuche die Charaktere, die du vernachlässigt hast, anstatt zu Hause zu bleiben. Die Fortsetzung Friends of the Great Kingdom (2022) ist ein deutlich ambitionierteres Spiel mit verbesserter Grafik und tieferen Systemen.`,
  },
  sunnyside: {
    title_en: 'SunnySide',
    title_zh: 'SunnySide（阳光小镇）',
    title_zhTW: 'SunnySide（陽光小鎮）',
    title_ja: 'SunnySide（サニーサイド）',
    title_ko: 'SunnySide (써니사이드)',
    title_de: 'SunnySide',
    emoji: '☀️',
    tag_en: 'The Modern Anime Farm Adventurer',
    tag_zh: '现代动漫农场冒险家',
    tag_zhTW: '現代動漫農場冒險家',
    tag_ja: '現代アニメ農場アドベンチャラー',
    tag_ko: '현대 애니메이션 농장 모험가',
    tag_de: 'Der moderne Anime-Farm-Abenteurer',
    platform_en: 'PC (Steam)',
    platform_zh: 'PC (Steam)',
    platform_zhTW: 'PC (Steam)',
    platform_ja: 'PC (Steam)',
    platform_ko: 'PC (Steam)',
    platform_de: 'PC (Steam)',
    why_en: `SunnySide, released in June 2024, represents one of the most ambitious attempts to push the farming sim formula forward while staying true to its Japanese design DNA. Developed by Pixelrager, SunnySide wears its anime influences openly — the character art is rich, expressive, and clearly inspired by modern JRPG aesthetics rather than the simpler art of early Harvest Moon titles. The game's premise involves rebuilding Himawari, a countryside town in Japan, from a state of neglect and decline — you are not just farming but working to restore a community that has been slowly dying, which gives the agricultural work a moral and emotional weight that more traditional farming sims do not always have. The content is genuinely dense: many marriage candidates with full story arcs, a deep friendship network, seasonal content, Japanese cultural festivals, cooking, crafting, and a robust farming system with both traditional crops and more exotic options. SunnySide is notable for representing Japanese rural culture authentically — the festivals, the food, the architecture, and the community dynamics feel grounded in real Japanese countryside life rather than a generic pastoral fantasy. The game targets players who want the emotional depth of Stardew Valley, the anime aesthetic of modern JRPGs, and a setting that is specifically Japanese rather than the vague European pastoralism of most Western-developed entries in the genre. For players who have always wanted a farming sim set in Japan that felt authentic rather than imported, SunnySide is the answer they have been waiting for.`,
    why_zh: `《SunnySide》（2024年6月发售）是将农场游戏公式向前推进同时保持日式设计DNA的最雄心勃勃的尝试之一。游戏的前提是重建日本一个名为向阳的乡村小镇——你不只是在种地，而是努力复兴一个缓慢衰落的社区，这让农业劳作有了更多道德和情感重量。内容密度真实存在：众多婚姻候选人拥有完整故事弧线、深度的友谊网络、季节性内容、日本文化节庆、烹饪、制作，以及包含传统作物和更具异域风情选项的农耕系统。SunnySide对日本农村文化的呈现是真实的——节日、食物、建筑和社区动态都植根于真实的日本乡间生活，而非泛泛的田园幻想。对于一直渴望一款设定在日本、感觉真实而非移植的农场游戏的玩家来说，SunnySide是他们等待已久的答案。`,
    why_zhTW: `《SunnySide》（2024年6月發售）是將農場遊戲公式向前推進同時保持日式設計DNA的最雄心勃勃的嘗試之一。遊戲的前提是重建日本一個名為向陽的鄉村小鎮——你不只是在種地，而是努力復興一個緩慢衰落的社區，這讓農業勞作有了更多道德和情感重量。內容密度真實存在：眾多婚姻候選人擁有完整故事弧線、深度的友誼網絡、季節性內容、日本文化節慶、烹飪、製作，以及包含傳統作物和更具異域風情選項的農耕系統。SunnySide對日本農村文化的呈現是真實的——節日、食物、建築和社區動態都植根於真實的日本鄉間生活，而非泛泛的田園幻想。對於一直渴望一款設定在日本、感覺真實而非移植的農場遊戲的玩家來說，SunnySide是他們等待已久的答案。`,
    why_ja: `2024年6月発売の『SunnySide』は、日本のデザインDNAを守りながら農場シムの公式を前進させようとする、最も意欲的な挑戦のひとつです。舞台は日本の田舎町・ひまわりの再建——ただ農業をするだけじゃなく、緩やかに衰退してきたコミュニティを復興させるという使命感があって、農作業に道徳的・情緒的な重みが生まれます。コンテンツは充実しています：多くの結婚候補者とその完全なストーリー、深い友好関係ネットワーク、季節のイベント、日本の文化的なお祭り、料理、クラフト、そして伝統的な作物から珍しい選択肢まで揃った農業システム。SunnySideが特別なのは、日本の農村文化をリアルに描いているところ。お祭りも食事も建築も、コミュニティの空気感も、本物の日本の田舎から生まれた雰囲気です。ずっと日本を舞台にした農場ゲームを探していた人には、ぴったりの答えです。`,
    why_ko: `2024년 6월 출시된 《SunnySide》는 일본 디자인 DNA를 유지하면서 농장 시뮬레이션 공식을 앞으로 밀어붙이는 가장 야심 찬 시도 중 하나입니다. 배경은 일본의 시골 마을 히마와리를 재건하는 것——단순히 농사를 짓는 것이 아니라 천천히 쇠퇴해온 공동체를 되살리는 사명감이 있어 농업 활동에 도덕적·감정적 무게감이 생깁니다. 콘텐츠는 실질적으로 풍부합니다. 완전한 스토리 아크를 가진 다수의 결혼 후보, 깊은 우정 네트워크, 계절별 콘텐츠, 일본 문화 축제, 요리, 제작, 전통 작물부터 이색적인 선택지까지 갖춘 농업 시스템. SunnySide가 특별한 점은 일본 농촌 문화를 진정성 있게 담아냈다는 것입니다. 축제, 음식, 건축, 공동체 역학 모두 실제 일본 시골 생활에 뿌리를 두고 있어, 일본을 배경으로 한 진정성 있는 농장 게임을 기다려온 플레이어에게 SunnySide는 바로 그 답입니다.`,
    why_de: `SunnySide, veröffentlicht im Juni 2024, ist einer der ambitioniertesten Versuche, die Farming-Sim-Formel voranzutreiben und dabei treu zur japanischen Design-DNA zu bleiben. Die Prämisse: Himawari, ein ländliches Städtchen in Japan, aus Vernachlässigung und Niedergang wieder aufzubauen — du farmst nicht nur, sondern arbeitest daran, eine sterbende Gemeinschaft zu retten. Die Inhalte sind wirklich dicht: viele Heiratskandidaten mit vollständigen Story-Arcs, tiefes Freundschaftsnetzwerk, saisonale Inhalte, japanische Kulturfeste, Kochen, Crafting und ein robustes Farming-System. SunnySide fühlt sich authentisch japanisch an — Feste, Essen, Architektur und Gemeinschaftsdynamiken sind verwurzelt im echten japanischen Landleben. Für Spieler, die schon immer ein Farming-Sim in Japan wollten, das sich echt anfühlt, ist SunnySide die lange ersehnte Antwort.`,
    tip_en: `SunnySide's community restoration mechanic is the engine that unlocks most of the game's content — improving Himawari's community score opens new shops, events, and areas. Invest early in the social systems rather than pure farming efficiency: attending every festival, completing town requests, and leveling friendships quickly pays off in unlocked content that then accelerates your farming. The Japanese cultural festival calendar is dense and rewarding — missing a festival is a full year's wait, so check the in-game calendar daily and prepare for upcoming events in advance. SunnySide's cooking system is deeper than in most farming sims and feeds directly into the relationship system, so learning which characters like which dishes and mastering recipe unlocks is one of the most efficient paths to advancing the story arcs you care about.`,
    tip_zh: `SunnySide的社区复兴机制是解锁游戏大部分内容的引擎——提高向阳镇的社区分数会开放新商店、活动和区域。早期投入社交系统而非纯农耕效率：参加每个节日、完成镇民委托、快速提升友谊值，这些都会很快得到回报，解锁能加速农耕的新内容。日本文化节日日历密集而丰厚——错过一个节日就要等整整一年，所以每天查看游戏内日历并提前为即将到来的活动做准备。SunnySide的烹饪系统比大多数农场游戏更深入，并直接与关系系统挂钩——了解哪些角色喜欢哪些菜肴、掌握食谱解锁，是推进你关心的故事弧线最有效的途径之一。`,
    tip_zhTW: `SunnySide的社區復興機制是解鎖遊戲大部分內容的引擎——提高向陽鎮的社區分數會開放新商店、活動和區域。早期投入社交系統而非純農耕效率：參加每個節日、完成鎮民委託、快速提升友誼值，這些都會很快得到回報，解鎖能加速農耕的新內容。日本文化節日日曆密集而豐厚——錯過一個節日就要等整整一年，所以每天查看遊戲內日曆並提前為即將到來的活動做準備。SunnySide的烹飪系統比大多數農場遊戲更深入，並直接與關係系統掛鉤，了解哪些角色喜歡哪些菜餚是推進故事弧線最有效的途徑之一。`,
    tip_ja: `SunnySideのコミュニティ復興メカニズムこそ、ほとんどのコンテンツを解放するエンジンです——ひまわり町のコミュニティスコアを上げると新しいショップ・イベント・エリアが開きます。序盤は純粋な農業効率よりも社交システムに注力しましょう：お祭りに全参加、町民の依頼をこなし、友好度を早めに上げると、農業を加速する新コンテンツがどんどん解放されます。日本の文化的なお祭りカレンダーは密度が高い——一度逃すと一年待ちなので、毎日ゲーム内カレンダーをチェックして来たるイベントに備えておきましょう。SunnySideの料理システムは多くの農場ゲームより深く、関係システムとも直結しているので、キャラクターごとの好みを把握してレシピを解放していくのが物語を進める最も効率的な方法のひとつです。`,
    tip_ko: `SunnySide의 커뮤니티 복원 메카니즘이 대부분의 게임 콘텐츠를 여는 엔진입니다——히마와리 마을의 커뮤니티 점수를 높이면 새로운 상점, 이벤트, 구역이 열립니다. 초반에는 순수 농사 효율보다 소셜 시스템에 투자하세요. 모든 축제 참가, 마을 의뢰 완료, 우정 레벨 빠르게 올리기가 모두 농사를 가속할 새 콘텐츠 해금으로 빠르게 보상됩니다. 일본 문화 축제 달력은 촘촘하고 풍성합니다——하나를 놓치면 일 년을 기다려야 하니 매일 게임 내 달력을 확인하고 다가오는 이벤트를 미리 준비하세요. SunnySide의 요리 시스템은 대부분의 농장 게임보다 깊고 관계 시스템과 직결되어 있어, 각 캐릭터가 좋아하는 요리를 파악하고 레시피를 해금하는 것이 스토리를 진행하는 가장 효율적인 방법 중 하나입니다.`,
    tip_de: `SunnySides Gemeinschaftsrestaurations-Mechanik ist der Motor, der die meisten Spielinhalte freischaltet — Himawaras Community-Score zu verbessern öffnet neue Läden, Events und Gebiete. Investiere früh in die Sozialsysteme statt in pure Farming-Effizienz: Jeden Festival besuchen, Stadtaufgaben erfüllen und Freundschaften schnell leveln zahlt sich aus. Das japanische Kulturfestival-Kalender ist dicht und lohnend — ein verpasstes Festival bedeutet ein Jahr Wartezeit, also täglich den In-Game-Kalender prüfen. SunnySides Kochsystem ist tiefer als in den meisten Farming-Sims und direkt mit dem Beziehungssystem verbunden — herauszufinden, welche Charaktere welche Gerichte mögen, ist einer der effizientesten Wege, die Story-Arcs voranzutreiben.`,
  },
  littledragon: {
    title_en: 'Little Dragon Café',
    title_zh: '小龙咖啡馆',
    title_zhTW: '小龍咖啡館',
    title_ja: 'リトルドラゴンカフェ',
    title_ko: '리틀 드래곤 카페',
    title_de: 'Little Dragon Café',
    emoji: '🐉',
    tag_en: 'The Dragon-Nurturing Café Keeper',
    tag_zh: '守护小龙的咖啡馆主人',
    tag_zhTW: '守護小龍的咖啡館主人',
    tag_ja: 'ドラゴンを育てるカフェの主人',
    tag_ko: '작은 용을 키우는 카페 주인',
    tag_de: 'Der drachenaufziehende Café-Betreiber',
    platform_en: 'Nintendo Switch · PS4 · PC (Steam)',
    platform_zh: 'Nintendo Switch · PS4 · PC (Steam)',
    platform_zhTW: 'Nintendo Switch · PS4 · PC (Steam)',
    platform_ja: 'Nintendo Switch · PS4 · PC (Steam)',
    platform_ko: 'Nintendo Switch · PS4 · PC (Steam)',
    platform_de: 'Nintendo Switch · PS4 · PC (Steam)',
    why_en: `Little Dragon Café is a game with a fascinating origin: it was created by Yasuhiro Wada, the man who invented the Harvest Moon series and pioneered the farming sim genre, after the IP dispute that separated him from the franchise he created. Wada's new game is not a farming sim in the traditional sense — it is a café management and dragon-raising adventure — but it carries all the DNA of his Harvest Moon work: the focus on community relationships, the seasonal rhythm, the theme of nurturing something from helplessness to thriving, and the belief that care and patience are their own rewards. The premise is fairy-tale simple: you run a café in an idyllic village. A small dragon hatches under your care. You raise it while managing the café and discovering the personal stories of the lonely, struggling, or broken villagers who come in as customers. What makes Little Dragon Café moving is how precisely its gameplay mechanics serve its emotional themes — the dragon's growth is literal and metaphorical, the café provides the physical space where people allow themselves to be helped, and Wada understands from decades of experience that the most powerful thing a cozy game can do is make you feel responsible for something fragile. The dragon mechanics are genuinely innovative: you name it, teach it recipes, take it on adventure runs, and watch its personality develop based on how you raise it. It is a smaller, shorter game than Stardew Valley or Friends of Mineral Town, but its 20-25 hour runtime contains more emotional precision per hour than almost anything else in the genre.`,
    why_zh: `《小龙咖啡馆》有一个迷人的起源：它由牧场物语系列创始人、整个农场游戏类型的先驱和田康弘创作——在一场将他与自己创造的系列分离的版权纠纷之后。和田的新游戏在传统意义上不是农场游戏——它是一个咖啡馆经营和养龙冒险游戏——但携带了他所有牧场物语作品的DNA：对社区关系的关注、季节节奏、从脆弱到繁荣的培育主题，以及相信关怀与耐心本身就是回报的信念。前提童话般简单：你在一个美好村庄经营一家咖啡馆。一条小龙在你的照料下破壳而出。你一边经营咖啡馆一边养育它，同时发现作为顾客前来的孤独、挣扎或受伤的村民的个人故事。让《小龙咖啡馆》动人的地方在于，它的游戏机制如何精确地服务于情感主题——龙的成长既是字面的也是隐喻的，咖啡馆提供了人们允许自己被帮助的物理空间。`,
    why_zhTW: `《小龍咖啡館》有一個迷人的起源：它由牧場物語系列創始人、整個農場遊戲類型的先驅和田康弘創作——在一場將他與自己創造的系列分離的版權糾紛之後。和田的新遊戲在傳統意義上不是農場遊戲——它是一個咖啡館經營和養龍冒險遊戲——但攜帶了他所有牧場物語作品的DNA：對社區關係的關注、季節節奏、從脆弱到繁榮的培育主題，以及相信關懷與耐心本身就是回報的信念。前提童話般簡單：你在一個美好村莊經營一家咖啡館。一條小龍在你的照料下破殼而出。你一邊經營咖啡館一邊養育它，同時發現作為顧客前來的孤獨、掙扎或受傷的村民的個人故事。讓《小龍咖啡館》動人的地方在於，它的遊戲機制如何精確地服務於情感主題——龍的成長既是字面的也是隱喻的，咖啡館提供了人們允許自己被幫助的物理空間。`,
    why_ja: `『リトルドラゴンカフェ』は、感慨深い成り立ちを持つ作品です。これを作ったのは、牧場物語シリーズを生み出し農場ゲームというジャンルを切り拓いた和田康弘さん——自分が作ったシリーズからIPが切り離されるという経緯を経て誕生した新作です。牧場物語ではなくカフェ経営とドラゴン育成のアドベンチャーですが、和田さんの牧場物語作品のすべてのDNAを持っています：コミュニティの繋がりへのフォーカス、季節のリズム、弱さから繁栄へと何かを育てるテーマ、そしてケアと忍耐そのものが報いだという信念。舞台はのどかな村のカフェ。小さなドラゴンがあなたの元でかえります。カフェを経営しながらドラゴンを育て、訪れる孤独な村人たちの個人的な物語を少しずつ知っていく。ゲームが心に刺さるのは、仕組みが感情のテーマに精密に奉仕しているからです——ドラゴンの成長は文字通りであり、比喩でもある。カフェは、人が助けてもらうことを自分に許す場所です。`,
    why_ko: `《리틀 드래곤 카페》는 매혹적인 탄생 배경을 가진 게임입니다. 목장이야기 시리즈를 창시하고 농장 게임 장르를 개척한 와다 야스히로가——자신이 만든 시리즈와 IP가 분리되는 분쟁 이후——새롭게 만든 작품입니다. 전통적인 의미의 농장 게임은 아닙니다——카페 운영과 드래곤 육성 어드벤처입니다——하지만 그의 목장이야기 작품들의 모든 DNA를 담고 있습니다. 공동체 관계에 대한 집중, 계절의 리듬, 나약함에서 번영으로의 양육 테마, 그리고 배려와 인내 자체가 보상이라는 믿음. 배경은 아름다운 마을의 카페. 작은 드래곤이 당신의 돌봄 속에 알에서 깨어납니다. 카페를 운영하며 드래곤을 키우고, 손님으로 찾아오는 외롭고 힘들고 상처받은 마을 사람들의 이야기를 천천히 알아가게 됩니다. 이 게임이 감동적인 이유는 게임 메커니즘이 감정적 주제에 정확하게 봉사하기 때문입니다——드래곤의 성장은 문자적인 동시에 은유적이며, 카페는 사람들이 도움받는 것을 스스로에게 허락하는 공간입니다.`,
    why_de: `Little Dragon Café hat einen faszinierenden Ursprung: Es wurde von Yasuhiro Wada erschaffen, dem Mann, der die Harvest Moon-Reihe erfunden hat, nach dem IP-Streit, der ihn von seiner eigenen Schöpfung trennte. Wadas neues Spiel ist kein Farming-Sim im traditionellen Sinne — es ist ein Café-Management- und Drachen-Aufzucht-Abenteuer — aber es trägt die gesamte DNA seiner Harvest Moon-Arbeit: der Fokus auf Gemeinschaftsbeziehungen, der saisonale Rhythmus, das Thema des Aufziehens von Hilflosigkeit zu Gedeihen, und der Glaube, dass Fürsorge und Geduld ihre eigenen Belohnungen sind. Die Prämisse ist märchenhaft einfach: Du führst ein Café in einem idyllischen Dorf. Ein kleiner Drache schlüpft unter deiner Obhut. Du ziehst ihn auf, während du das Café verwaltest und die persönlichen Geschichten der einsamen Dorfbewohner entdeckst. Was Little Dragon Café berührt, ist wie präzise seine Spielmechaniken seinen emotionalen Themen dienen — das Drachenwachstum ist wörtlich und metaphorisch zugleich, das Café ist der Raum, in dem Menschen sich erlauben, geholfen zu werden.`,
    tip_en: `Little Dragon Café's most important mechanic to understand early is the Recipe system, which drives both café progression and the social storylines. Every customer has a favorite dish type, and discovering these through conversation then cooking the right meals during their arc is how you unlock each villager's story chapter. Keep the dragon fed and take it on regular ingredient-gathering runs — the dragon grows faster and develops better stats when it accompanies you consistently, and certain areas only open when the dragon reaches specific growth stages. The game is shorter than most farming sims, so do not rush past the dialogue or skip the café customers' personal stories — these conversations, delivered in slow fairy-tale pacing, are where Little Dragon Café earns its emotional core and where Wada's decades of experience in the genre reveal themselves most clearly.`,
    tip_zh: `《小龙咖啡馆》早期最重要的机制是菜谱系统，它驱动着咖啡馆进度和社交故事线。每位顾客都有偏爱的菜肴类型，通过对话发现这些偏好，然后在他们的故事弧线中做出正确的菜肴，是解锁每位村民故事章节的方式。保持小龙喂食并定期带它去采集食材——当你持续带着小龙时，它成长更快、数值发展更好，而且某些区域只有当小龙达到特定成长阶段才会开放。这款游戏比大多数农场游戏更短，所以不要急着跳过对话或略过咖啡馆顾客的个人故事——这些以童话节奏缓缓讲述的对话，正是《小龙咖啡馆》赢得情感核心的地方，也是和田数十年类型经验最清晰呈现的地方。`,
    tip_zhTW: `《小龍咖啡館》早期最重要的機制是菜譜系統，它驅動著咖啡館進度和社交故事線。每位顧客都有偏愛的菜餚類型，通過對話發現這些偏好，然後在他們的故事弧線中做出正確的菜餚，是解鎖每位村民故事章節的方式。保持小龍喂食並定期帶它去採集食材——當你持續帶著小龍時，它成長更快、數值發展更好，而且某些區域只有當小龍達到特定成長階段才會開放。這款遊戲比大多數農場遊戲更短，所以不要急著跳過對話或略過咖啡館顧客的個人故事——這些以童話節奏緩緩講述的對話，正是《小龍咖啡館》贏得情感核心的地方。`,
    tip_ja: `『リトルドラゴンカフェ』で序盤に押さえるべき最重要システムはレシピです。これがカフェの進行と社交ストーリーを動かす原動力です。お客さんにはそれぞれ好きな料理のタイプがあって、会話で好みを見つけてから、そのキャラクターのストーリーが進む場面で適切な料理を出すことで、各村人のストーリーチャプターを解放できます。ドラゴンにはこまめに食事させて、食材集めに連れていきましょう——一緒にいる時間が長いほど成長が早く、ステータスも良く育ちます。また、特定のエリアはドラゴンが一定の成長段階に達しないと開放されません。このゲームは農場ゲームよりも短いので、会話を飛ばさず、カフェの常連の個人的な物語を丁寧に見届けてください——童話のようなゆったりしたペースで語られるそれらの会話こそ、このゲームの感情的な核心です。`,
    tip_ko: `《리틀 드래곤 카페》에서 초반에 이해해야 할 가장 중요한 메커니즘은 레시피 시스템으로, 카페 진행도와 소셜 스토리를 모두 이끕니다. 모든 손님에는 좋아하는 요리 유형이 있고, 대화를 통해 취향을 발견한 후 그들의 스토리 아크가 진행될 때 적절한 음식을 만들어주면 각 마을 사람의 이야기 챕터를 해금할 수 있습니다. 드래곤에게 규칙적으로 먹이를 주고 재료 채집에 자주 데려가세요——함께 다닐수록 성장이 빠르고 스탯도 잘 발달하며, 특정 지역은 드래곤이 특정 성장 단계에 도달해야만 열립니다. 이 게임은 대부분의 농장 게임보다 짧으니, 대화를 서둘러 넘기거나 카페 손님들의 개인적인 이야기를 건너뛰지 마세요——동화 같은 리듬으로 천천히 전해지는 그 대화들이야말로 《리틀 드래곤 카페》가 감정적 핵심을 얻는 곳입니다.`,
    tip_de: `Little Dragon Cafés wichtigste Mechanik, die man früh verstehen sollte, ist das Rezept-System, das sowohl die Café-Progression als auch die sozialen Storylines antreibt. Jeder Kunde hat einen Lieblingsgerichtstyp — entdecke diese durch Gespräche und koche dann die richtigen Gerichte während ihrer Storyline, um jedes Kapitel freizuschalten. Füttere den Drachen regelmäßig und nimm ihn auf Zutatenjagd — der Drache wächst schneller und entwickelt bessere Werte, wenn er dich regelmäßig begleitet, und bestimmte Gebiete öffnen sich nur bei bestimmten Wachstumsstufen. Das Spiel ist kürzer als die meisten Farming-Sims — überstürze nicht die Dialoge und überspringe nicht die persönlichen Geschichten der Café-Kunden. Diese Gespräche im langsamen Märchen-Tempo sind das emotionale Herz des Spiels und zeigen am deutlichsten Wadas Jahrzehnte Erfahrung im Genre.`,
  },
}

function calcResult(answers: Pick[]): Pick {
  const counts: Record<Pick, number> = { fomtremake: 0, doraemon: 0, sunnyside: 0, littledragon: 0 }
  for (const a of answers) counts[a]++
  return Object.entries(counts).sort((x, y) => y[1] - x[1])[0][0] as Pick
}

export function CozyJapanFarmQuiz({ locale }: { locale: string }) {
  const getLoc = (zh: string, en: string, zhTW?: string, ja?: string, ko?: string, de?: string): string => {
    if (locale === 'zh') return zh
    if (locale === 'zh-TW') return zhTW ?? zh
    if (locale === 'ja') return ja ?? en
    if (locale === 'ko') return ko ?? en
    if (locale === 'de') return de ?? en
    return en
  }

  const isZh = locale === 'zh' || locale === 'zh-TW'
  const [current, setCurrent] = useState(0)
  const [answers, setAnswers] = useState<Pick[]>([])
  const [result, setResult] = useState<Pick | null>(null)

  const handleAnswer = (type: Pick) => {
    const next = [...answers, type]
    if (current + 1 < QUESTIONS.length) {
      setAnswers(next)
      setCurrent(current + 1)
    } else {
      setResult(calcResult(next))
    }
  }

  const reset = () => {
    setCurrent(0)
    setAnswers([])
    setResult(null)
  }

  const q = QUESTIONS[current]

  if (result) {
    const r = RESULTS[result]
    const shareText = getLoc(
      `我的日式温馨农场游戏推荐是《${r.title_zh}》！${r.emoji} 来测测你的结果？${BASE_URL}/zh/quizzes/cozy-japan-farm-quiz`,
      `My Japanese cozy farm game match is ${r.title_en}! ${r.emoji} Which one are you? ${BASE_URL}/en/quizzes/cozy-japan-farm-quiz`,
      `我的日式溫馨農場遊戲推薦是《${r.title_zhTW}》！${r.emoji} 來測測你的結果？${BASE_URL}/zh-TW/quizzes/cozy-japan-farm-quiz`,
      `私の日本風ほのぼの農場ゲームは『${r.title_ja}』です！${r.emoji} あなたは？ ${BASE_URL}/ja/quizzes/cozy-japan-farm-quiz`,
      `내 일본 감성 코지 농장 게임은 《${r.title_ko}》예요！${r.emoji} 당신은？ ${BASE_URL}/ko/quizzes/cozy-japan-farm-quiz`,
      `Mein japanisches Cozy-Farming-Match ist ${r.title_de}! ${r.emoji} Was bist du? ${BASE_URL}/de/quizzes/cozy-japan-farm-quiz`
    )

    return (
      <div className="mx-auto max-w-2xl rounded-2xl border border-[#2d3d2d] bg-[#0f1a0f] p-6 md:p-8">
        <div className="mb-6 text-center">
          <div className="mb-3 text-6xl">{r.emoji}</div>
          <p className="mb-1 text-sm text-[#8a9a7a]">
            {getLoc(r.tag_zh, r.tag_en, r.tag_zhTW, r.tag_ja, r.tag_ko, r.tag_de)}
          </p>
          <h2 className="mb-2 text-2xl font-bold text-[#f0a832]">
            {getLoc(r.title_zh, r.title_en, r.title_zhTW, r.title_ja, r.title_ko, r.title_de)}
          </h2>
          <p className="text-sm text-[#8a9a7a]">
            {getLoc(r.platform_zh, r.platform_en, r.platform_zhTW, r.platform_ja, r.platform_ko, r.platform_de)}
          </p>
        </div>

        <div className="mb-6 rounded-xl bg-[#1a2e1a]/60 p-5 text-[#e8dcc8]">
          <p className="mb-4 leading-relaxed">
            {getLoc(r.why_zh, r.why_en, r.why_zhTW, r.why_ja, r.why_ko, r.why_de)}
          </p>
          <div className="border-t border-[#2d3d2d] pt-4">
            <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-[#f0a832]">
              {getLoc('游玩建议', 'Pro Tip', '遊玩建議', '攻略のヒント', '플레이 팁', 'Profi-Tipp')}
            </p>
            <p className="text-sm leading-relaxed text-[#c8bca8]">
              {getLoc(r.tip_zh, r.tip_en, r.tip_zhTW, r.tip_ja, r.tip_ko, r.tip_de)}
            </p>
          </div>
        </div>

        <div className="mb-6">
          <ShareButton text={shareText} locale={locale} />
        </div>

        <div className="mb-6 rounded-xl border border-[#f0a832]/20 bg-[#1a2e1a]/40 p-4 text-center">
          <p className="mb-1 text-xs text-[#8a9a7a]">
            {getLoc(
              '想每天发现最适合你的农场游戏？',
              'Want daily farming game picks matched to your mood?',
              '想每天發現最適合你的農場遊戲？',
              '毎日あなたにぴったりの農場ゲームを見つけませんか？',
              '매일 딱 맞는 농장 게임을 찾고 싶으신가요?',
              'Willst du täglich passende Farming-Game-Empfehlungen?'
            )}
          </p>
          <p className="text-sm text-[#e8dcc8]">
            {getLoc(
              'TendFarm 正在研发农场节律追踪功能——把 Cozy 游戏的季节感带入你的真实生活节奏。',
              'TendFarm is building a farm rhythm tracker — bringing the seasonal feeling of cozy games into real life.',
              'TendFarm 正在研發農場節律追蹤功能——把 Cozy 遊戲的季節感帶入你的真實生活節奏。',
              'TendFarm はファームリズムトラッカーを開発中です——コージーゲームの季節感をリアルな生活リズムに。',
              'TendFarm은 농장 리듬 트래커를 개발 중입니다 — 코지 게임의 계절감을 실제 생활 리듬으로.',
              'TendFarm entwickelt einen Farm-Rhythmus-Tracker — das saisonale Gefühl von Cozy Games ins echte Leben bringen.'
            )}
          </p>
        </div>

        <button
          onClick={reset}
          className="w-full rounded-xl border border-[#2d3d2d] py-2.5 text-sm text-[#8a9a7a] transition-colors hover:border-[#4d5d4d] hover:text-[#e8dcc8]"
        >
          {getLoc('重新测试', 'Retake Quiz', '重新測試', 'もう一度やる', '다시 테스트하기', 'Nochmal machen')}
        </button>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-2xl rounded-2xl border border-[#2d3d2d] bg-[#0f1a0f] p-6 md:p-8">
      <div className="mb-6">
        <div className="mb-3 flex items-center justify-between text-xs text-[#8a9a7a]">
          <span>
            {isZh
              ? `第 ${current + 1} / ${QUESTIONS.length} 题`
              : locale === 'zh-TW'
                ? `第 ${current + 1} / ${QUESTIONS.length} 題`
                : locale === 'ja'
                  ? `質問 ${current + 1} / ${QUESTIONS.length}`
                  : locale === 'ko'
                    ? `질문 ${current + 1} / ${QUESTIONS.length}`
                    : locale === 'de'
                      ? `Frage ${current + 1} von ${QUESTIONS.length}`
                      : `Question ${current + 1} of ${QUESTIONS.length}`}
          </span>
          <div className="flex gap-1">
            {QUESTIONS.map((_, i) => (
              <div
                key={i}
                className={`h-1.5 w-6 rounded-full transition-colors ${
                  i < current ? 'bg-[#f0a832]' : i === current ? 'bg-[#f0a832]/60' : 'bg-[#2d3d2d]'
                }`}
              />
            ))}
          </div>
        </div>
        <h3 className="text-lg font-semibold leading-snug text-[#e8dcc8]">
          {getLoc(q.q_zh, q.q_en, q.q_zhTW, q.q_ja, q.q_ko, q.q_de)}
        </h3>
      </div>

      <div className="flex flex-col gap-3">
        {q.options.map((opt, i) => (
          <button
            key={i}
            onClick={() => handleAnswer(opt.type)}
            className="rounded-xl border border-[#2d3d2d] bg-[#1a2e1a]/40 px-4 py-3 text-left text-sm text-[#e8dcc8] transition-all hover:border-[#f0a832]/40 hover:bg-[#1a2e1a] hover:text-[#f0a832]"
          >
            {getLoc(opt.zh, opt.en, opt.zhTW, opt.ja, opt.ko, opt.de)}
          </button>
        ))}
      </div>
    </div>
  )
}
