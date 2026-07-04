'use client'

import { useState } from 'react'
import { BASE_URL } from '@/lib/config'

type Game = 'sunhaven' | 'coral' | 'mistria' | 'sandrock'

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
  options: Array<{ en: string; zh: string; zhTW: string; ja: string; ko: string; de: string; type: Game }>
}> = [
  {
    q_en: 'You loved Stardew Valley. What made you want something new?',
    q_zh: '你喜欢星露谷物语。是什么让你想要寻找新游戏？',
    q_zhTW: '你喜歡星露谷物語。是什麼讓你想要尋找新遊戲？',
    q_ja: 'スターデューバレーが好きでしたよね。新しいゲームを探したくなった理由は？',
    q_ko: '스타듀 밸리를 좋아하셨죠. 새로운 게임을 찾게 된 이유가 뭔가요?',
    q_de: 'Du liebst Stardew Valley. Was hat dich dazu gebracht, etwas Neues zu suchen?',
    options: [
      {
        en: 'I want more magic — spells, different races, a bigger fantasy world',
        zh: '我想要更多魔法——咒语、不同种族、更大的奇幻世界',
        zhTW: '我想要更多魔法——咒語、不同種族、更大的奇幻世界',
        ja: 'もっと魔法が欲しい——呪文、種族の多様性、広大なファンタジーの世界',
        ko: '마법이 더 많았으면 해요 — 주문, 다양한 종족, 더 넓은 판타지 세계',
        de: 'Ich will mehr Magie — Zauber, verschiedene Rassen, eine größere Fantasiewelt',
        type: 'sunhaven',
      },
      {
        en: 'I want a more beautiful world — tropical, vibrant, and environmentally themed',
        zh: '我想要更美丽的世界——热带、生机勃勃、有环保主题',
        zhTW: '我想要更美麗的世界——熱帶、生機勃勃、有環保主題',
        ja: 'もっと美しい世界が欲しい——トロピカルで鮮やかで、環境テーマのある世界',
        ko: '더 아름다운 세계를 원해요 — 열대, 생동감 넘치고 환경 테마가 있는',
        de: 'Ich will eine schönere Welt — tropisch, lebendig und mit Umweltthema',
        type: 'coral',
      },
      {
        en: 'I just want more of the same cozy charm — same feel, fresh experience',
        zh: '我只是想要更多同款治愈魅力——同样的感觉，全新的体验',
        zhTW: '我只是想要更多同款治癒魅力——同樣的感覺，全新的體驗',
        ja: 'あの癒し感をもっと味わいたい——同じ雰囲気で、新鮮な体験を',
        ko: '같은 포근한 매력이 더 있으면 좋겠어요 — 같은 느낌, 새로운 경험',
        de: 'Ich will einfach mehr vom gleichen Cozy-Feeling — gleiches Gefühl, frische Erfahrung',
        type: 'mistria',
      },
      {
        en: 'I want to build and craft more — less crop focus, more construction and community',
        zh: '我想要更多建造和制作——减少种植，更多建设和社区',
        zhTW: '我想要更多建造和製作——減少種植，更多建設和社區',
        ja: '建築や制作にもっと集中したい——農作より建設やコミュニティを',
        ko: '건축과 제작에 더 집중하고 싶어요 — 농사보다 건설과 커뮤니티',
        de: 'Ich will mehr bauen und craften — weniger Ackerbau, mehr Konstruktion und Gemeinschaft',
        type: 'sandrock',
      },
    ],
  },
  {
    q_en: 'How important is combat and adventure to you in a farming game?',
    q_zh: '在农场游戏里，战斗和冒险对你有多重要？',
    q_zhTW: '在農場遊戲裡，戰鬥和冒險對你有多重要？',
    q_ja: '農場ゲームにおいて、戦闘や冒険はどれくらい重要ですか？',
    q_ko: '농장 게임에서 전투와 모험은 얼마나 중요한가요?',
    q_de: 'Wie wichtig sind dir Kämpfe und Abenteuer in einem Farmspiel?',
    options: [
      {
        en: 'Very — I want real combat skills, a skill tree, and challenging dungeons',
        zh: '非常重要——我想要真实的战斗技能、技能树和有挑战性的地下城',
        zhTW: '非常重要——我想要真實的戰鬥技能、技能樹和有挑戰性的地下城',
        ja: 'とても重要——本格的な戦闘スキル、スキルツリー、歯ごたえのあるダンジョンが欲しい',
        ko: '매우 중요해요 — 실제 전투 스킬, 스킬 트리, 도전적인 던전이 있었으면 해요',
        de: 'Sehr — ich will echte Kampffähigkeiten, einen Skill-Tree und herausfordernde Dungeons',
        type: 'sunhaven',
      },
      {
        en: 'Light — diving for resources in the ocean sounds fun, but nothing intense',
        zh: '轻度——在海洋里潜水采集资源听起来很有趣，但不要太激烈',
        zhTW: '輕度——在海洋裡潛水採集資源聽起來很有趣，但不要太激烈',
        ja: '軽め——海に潜って資源を集めるのは楽しそうだけど、激しすぎるのはいらない',
        ko: '가볍게 — 바다에서 다이빙해 자원을 모으는 건 재미있을 것 같지만 너무 격렬하진 않게',
        de: 'Leicht — im Ozean nach Ressourcen tauchen klingt spaßig, aber nichts zu Intensives',
        type: 'coral',
      },
      {
        en: 'Minimal — I mainly farm and befriend villagers, mines are secondary',
        zh: '最少化——我主要种地和交朋友，矿洞是次要的',
        zhTW: '最少化——我主要種地和交朋友，礦洞是次要的',
        ja: '最小限でいい——農業と村人との交流がメインで、鉱山はおまけ',
        ko: '최소한으로 — 주로 농사 짓고 마을 사람들과 친해지는 게 좋고, 광산은 부가적인 것',
        de: 'Minimal — ich baue hauptsächlich an und freunde mich mit Dorfbewohnern an, Minen sind zweitrangig',
        type: 'mistria',
      },
      {
        en: 'Moderate — I want to explore ruins and fight, but farming is still the core',
        zh: '适中——我想探索废墟和战斗，但农业仍然是核心',
        zhTW: '適中——我想探索廢墟和戰鬥，但農業仍然是核心',
        ja: '程よく——廃墟を探索して戦いたいけど、農業が主役',
        ko: '적당히 — 폐허를 탐험하고 싸우고 싶지만 농업이 여전히 핵심',
        de: 'Gemäßigt — ich will Ruinen erkunden und kämpfen, aber Ackerbau bleibt der Kern',
        type: 'sandrock',
      },
    ],
  },
  {
    q_en: 'What setting appeals to you most?',
    q_zh: '哪种游戏背景最吸引你？',
    q_zhTW: '哪種遊戲背景最吸引你？',
    q_ja: 'どんな舞台設定に最も惹かれますか？',
    q_ko: '어떤 배경이 가장 마음에 드세요?',
    q_de: 'Welches Setting spricht dich am meisten an?',
    options: [
      {
        en: 'A magical fantasy world with multiple fantasy races and towns to explore',
        zh: '一个有多个奇幻种族和城镇可以探索的魔法奇幻世界',
        zhTW: '一個有多個奇幻種族和城鎮可以探索的魔法奇幻世界',
        ja: '複数の種族と街が存在する、魔法のファンタジー世界',
        ko: '여러 판타지 종족과 마을을 탐험할 수 있는 마법 판타지 세계',
        de: 'Eine magische Fantasiewelt mit mehreren Völkern und Städten zu erkunden',
        type: 'sunhaven',
      },
      {
        en: 'A tropical island paradise with ocean, coral reefs, and a sustainability mission',
        zh: '一个有海洋、珊瑚礁和可持续发展使命的热带岛屿天堂',
        zhTW: '一個有海洋、珊瑚礁和永續發展使命的熱帶島嶼天堂',
        ja: '海とサンゴ礁、持続可能性をテーマにした熱帯の楽園',
        ko: '바다, 산호초, 지속 가능성 미션이 있는 열대 낙원 섬',
        de: 'Ein tropisches Inselparadies mit Ozean, Korallenriffen und einem Nachhaltigkeitsauftrag',
        type: 'coral',
      },
      {
        en: 'A charming medieval European village with festivals and cozy pixel art',
        zh: '一个有节日和治愈像素画风的迷人中世纪欧式村庄',
        zhTW: '一個有節日和治癒像素畫風的迷人中世紀歐式村莊',
        ja: '祭りと癒しのピクセルアートが魅力的な、中世ヨーロッパ風の村',
        ko: '축제와 아기자기한 픽셀 아트가 있는 매력적인 중세 유럽 마을',
        de: 'Ein charmantes mittelalterliches Dorf mit Festen und gemütlicher Pixel-Art',
        type: 'mistria',
      },
      {
        en: 'A desert frontier town that needs rebuilding after a catastrophe',
        zh: '一座灾难后需要重建的沙漠边境小镇',
        zhTW: '一座災難後需要重建的沙漠邊境小鎮',
        ja: '大惨事のあとに再建が必要な、砂漠のフロンティアの町',
        ko: '재앙 이후 재건이 필요한 사막 변경 마을',
        de: 'Eine Wüsten-Grenzstadt, die nach einer Katastrophe wieder aufgebaut werden muss',
        type: 'sandrock',
      },
    ],
  },
  {
    q_en: 'Romance and relationships in your next game should be:',
    q_zh: '在你的下一款游戏里，恋爱和人际关系应该是：',
    q_zhTW: '在你的下一款遊戲裡，戀愛和人際關係應該是：',
    q_ja: '次のゲームでの恋愛や人間関係はどんな感じがいいですか？',
    q_ko: '다음 게임에서의 연애와 인간관계는 어떠면 좋겠나요?',
    q_de: 'Romantik und Beziehungen in deinem nächsten Spiel sollten sein:',
    options: [
      {
        en: 'Deep and varied — lots of characters from different races with unique storylines',
        zh: '深入而多样——来自不同种族的大量角色，各有独特故事线',
        zhTW: '深入而多樣——來自不同種族的大量角色，各有獨特故事線',
        ja: '深くて多様——異なる種族の多くのキャラクター、それぞれ独自のストーリー',
        ko: '깊고 다양하게 — 다양한 종족의 많은 캐릭터, 각자의 독특한 스토리',
        de: 'Tiefgründig und vielfältig — viele Charaktere verschiedener Rassen mit einzigartigen Storylines',
        type: 'sunhaven',
      },
      {
        en: 'Wholesome and community-focused — I want to care about the whole island',
        zh: '温馨而以社区为中心——我想关心整个岛屿',
        zhTW: '溫馨而以社區為中心——我想關心整個島嶼',
        ja: '心温まるコミュニティ重視——島全体を大切にしたい',
        ko: '따뜻하고 커뮤니티 중심으로 — 섬 전체를 소중히 여기고 싶어요',
        de: 'Herzlich und gemeinschaftsorientiert — ich will mich um die ganze Insel kümmern',
        type: 'coral',
      },
      {
        en: 'Classic cozy — a small cast of memorable characters I can fall in love with slowly',
        zh: '经典治愈风——一小群令人难忘的角色，让我慢慢爱上',
        zhTW: '經典治癒風——一小群令人難忘的角色，讓我慢慢愛上',
        ja: 'クラシックな癒し系——少数だけど印象的なキャラクターにゆっくり惹かれていく',
        ko: '클래식하고 포근하게 — 소수의 기억에 남는 캐릭터들과 천천히 정들어가는',
        de: 'Klassisch gemütlich — eine kleine Gruppe unvergesslicher Charaktere, in die ich mich langsam verliebe',
        type: 'mistria',
      },
      {
        en: 'Story-driven — I want characters with complex backstories and real growth arcs',
        zh: '故事驱动——我想要有复杂背景故事和真实成长弧的角色',
        zhTW: '故事驅動——我想要有複雜背景故事和真實成長弧的角色',
        ja: 'ストーリー重視——複雑な過去と成長を持つキャラクターが欲しい',
        ko: '스토리 중심으로 — 복잡한 배경과 진짜 성장 스토리를 가진 캐릭터',
        de: 'Story-getrieben — ich will Charaktere mit komplexen Hintergrundgeschichten und echter Entwicklung',
        type: 'sandrock',
      },
    ],
  },
  {
    q_en: 'Which of these describes your preferred game length?',
    q_zh: '哪个描述符合你偏好的游戏时长？',
    q_zhTW: '哪個描述符合你偏好的遊戲時長？',
    q_ja: '好みのゲームのプレイ時間はどのくらいですか？',
    q_ko: '선호하는 게임 플레이 시간은 어느 정도인가요?',
    q_de: 'Welches beschreibt deine bevorzugte Spiellänge am besten?',
    options: [
      {
        en: '80–120+ hours — I want a huge world with lots of content and secrets to find',
        zh: '80-120 小时以上——我想要一个有大量内容和秘密的庞大世界',
        zhTW: '80-120 小時以上——我想要一個有大量內容和秘密的龐大世界',
        ja: '80〜120時間以上——コンテンツと隠し要素たっぷりの広大な世界がいい',
        ko: '80~120시간 이상 — 많은 콘텐츠와 비밀이 있는 방대한 세계를 원해요',
        de: '80–120+ Stunden — ich will eine riesige Welt mit viel Inhalt und Geheimnissen',
        type: 'sunhaven',
      },
      {
        en: '40–60 hours for the main arc, open-ended after for continued farming',
        zh: '主线 40-60 小时，之后可以继续开放式农业',
        zhTW: '主線 40-60 小時，之後可以繼續開放式農業',
        ja: 'メインストーリー40〜60時間で、その後はのんびり農業を続けられる',
        ko: '메인 스토리 40~60시간, 이후 오픈엔드로 농업 계속',
        de: '40–60 Stunden für den Hauptbogen, danach offen für weiteres Farmen',
        type: 'coral',
      },
      {
        en: '30–50 hours — cozy and focused, without overwhelming content',
        zh: '30-50 小时——治愈而专注，内容不会让人应接不暇',
        zhTW: '30-50 小時——治癒而專注，內容不會讓人應接不暇',
        ja: '30〜50時間——癒し系でコンパクト、コンテンツ過多にならないやつ',
        ko: '30~50시간 — 포근하고 집중되어 있어서 내용이 너무 많지 않은',
        de: '30–50 Stunden — gemütlich und fokussiert, ohne überwältigenden Inhalt',
        type: 'mistria',
      },
      {
        en: '60–100 hours — there should be a town to rebuild and a story to finish',
        zh: '60-100 小时——应该有一座城镇可以重建和一个故事可以完成',
        zhTW: '60-100 小時——應該有一座城鎮可以重建和一個故事可以完成',
        ja: '60〜100時間——再建すべき町とフィニッシュすべきストーリーがあるやつ',
        ko: '60~100시간 — 재건할 마을과 완성할 스토리가 있는',
        de: '60–100 Stunden — es sollte eine Stadt zum Wiederaufbauen und eine Geschichte zum Beenden geben',
        type: 'sandrock',
      },
    ],
  },
  {
    q_en: 'What matters most to you in a Stardew Valley alternative?',
    q_zh: '在星露谷替代品里，什么对你最重要？',
    q_zhTW: '在星露谷替代品裡，什麼對你最重要？',
    q_ja: 'スターデューバレーの代わりとなるゲームで、最も大切にしたいのは？',
    q_ko: '스타듀 밸리 대안 게임에서 가장 중요하게 생각하는 것은?',
    q_de: 'Was ist dir in einer Stardew Valley Alternative am wichtigsten?',
    options: [
      {
        en: 'More content and variety — multiple towns, races, and skill paths',
        zh: '更多内容和多样性——多个城镇、种族和技能路线',
        zhTW: '更多內容和多樣性——多個城鎮、種族和技能路線',
        ja: 'より多くのコンテンツとバリエーション——複数の町、種族、スキルルート',
        ko: '더 많은 콘텐츠와 다양성 — 여러 마을, 종족, 스킬 경로',
        de: 'Mehr Inhalt und Abwechslung — mehrere Städte, Rassen und Skill-Pfade',
        type: 'sunhaven',
      },
      {
        en: 'A unique premise — I want it to feel fresh and have its own identity',
        zh: '独特的前提——我希望它感觉清新、有自己的身份',
        zhTW: '獨特的前提——我希望它感覺清新、有自己的身份',
        ja: '独自のコンセプト——新鮮で、そのゲームならではの個性を感じたい',
        ko: '독특한 설정 — 신선하고 자기만의 정체성이 있었으면 해요',
        de: 'Eine einzigartige Prämisse — es soll frisch wirken und eine eigene Identität haben',
        type: 'coral',
      },
      {
        en: 'Faithful cozy charm — I want it to feel like Stardew but lovingly made by someone else',
        zh: '忠实的治愈魅力——我希望它感觉像星露谷，但由别人充满爱意地制作',
        zhTW: '忠實的治癒魅力——我希望它感覺像星露谷，但由別人充滿愛意地製作',
        ja: 'Stardewっぽい癒し感——でも別のクリエイターが愛情込めて作ったもの',
        ko: '충실한 포근한 매력 — 스타듀 같은 느낌이지만 다른 누군가가 애정 담아 만든',
        de: 'Treuer Cozy-Charme — es soll sich wie Stardew anfühlen, aber liebevoll von jemand anderem gemacht',
        type: 'mistria',
      },
      {
        en: 'Crafting depth — I want more complex building systems than Stardew offers',
        zh: '制作深度——我想要比星露谷更复杂的建造系统',
        zhTW: '製作深度——我想要比星露谷更複雜的建造系統',
        ja: 'クラフトの深み——スターデューより複雑な建造システムが欲しい',
        ko: '제작의 깊이 — 스타듀보다 더 복잡한 건축 시스템을 원해요',
        de: 'Handwerk-Tiefe — ich will komplexere Bausysteme als Stardew bietet',
        type: 'sandrock',
      },
    ],
  },
]

const RESULTS: Record<
  Game,
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
    desc_en: string
    desc_zh: string
    desc_zhTW: string
    desc_ja: string
    desc_ko: string
    desc_de: string
    why_en: string[]
    why_zh: string[]
    why_zhTW: string[]
    why_ja: string[]
    why_ko: string[]
    why_de: string[]
    watch_en: string
    watch_zh: string
    watch_zhTW: string
    watch_ja: string
    watch_ko: string
    watch_de: string
  }
> = {
  sunhaven: {
    title_en: 'Sun Haven',
    title_zh: 'Sun Haven（太阳港）',
    title_zhTW: 'Sun Haven（太陽港）',
    title_ja: 'Sun Haven',
    title_ko: 'Sun Haven',
    title_de: 'Sun Haven',
    emoji: '☀️',
    tag_en: 'Fantasy RPG · Multiple Towns · Deep Combat',
    tag_zh: '奇幻 RPG · 多个城镇 · 深度战斗',
    tag_zhTW: '奇幻 RPG · 多個城鎮 · 深度戰鬥',
    tag_ja: 'ファンタジー RPG · 複数の町 · 本格戦闘',
    tag_ko: '판타지 RPG · 여러 마을 · 깊은 전투',
    tag_de: 'Fantasy-RPG · Mehrere Städte · Tiefes Kampfsystem',
    platform_en: 'PC (Steam) · Nintendo Switch',
    platform_zh: 'PC（Steam）· Nintendo Switch',
    platform_zhTW: 'PC（Steam）· Nintendo Switch',
    platform_ja: 'PC（Steam）· Nintendo Switch',
    platform_ko: 'PC（Steam）· Nintendo Switch',
    platform_de: 'PC (Steam) · Nintendo Switch',
    desc_en:
      "Sun Haven is what Stardew Valley would look like if it were reimagined as a full fantasy RPG. You can play as multiple races — human, elf, demon, neko, and more — each with unique perks. There are three separate towns to develop relationships in, a deep skill tree with combat specializations, and an overarching narrative with a main quest. If you wanted more of everything Stardew offered — more characters, more magic, more world — Sun Haven is built for you.",
    desc_zh:
      'Sun Haven 是如果星露谷被重新构想为完整奇幻 RPG 会是什么样子。你可以扮演多种族角色——人类、精灵、恶魔、猫耳人等——每种都有独特的特权。有三个独立的城镇可以发展关系，有深度的技能树和战斗专精，以及有主线任务的总体叙事。如果你想要星露谷所提供的一切的加强版——更多角色、更多魔法、更大世界——Sun Haven 就是为你而生的。',
    desc_zhTW:
      'Sun Haven 是如果星露谷物語被重新構想為完整奇幻 RPG 會是什麼樣子。你可以扮演多種族角色——人類、精靈、惡魔、貓耳人等——每種都有獨特的特權。有三個獨立的城鎮可以發展關係，有深度的技能樹和戰鬥專精，以及有主線任務的總體敘事。如果你想要星露谷所提供的一切的加強版——更多角色、更多魔法、更大世界——Sun Haven 就是為你而生的。',
    desc_ja:
      'Sun Haven は、スターデューバレーを本格的なファンタジー RPG として再解釈したようなゲームです。人間・エルフ・デーモン・猫耳族など複数の種族でプレイでき、それぞれ固有の能力を持ちます。3つの独立した町で関係を築き、戦闘特化のスキルツリーを育て、メインクエストのある大きな物語を体験できます。スターデューのすべてをさらに大きくしたもの——より多くのキャラクター、魔法、世界——そんなゲームを求めるなら Sun Haven が答えです。',
    desc_ko:
      'Sun Haven은 스타듀 밸리를 본격적인 판타지 RPG로 재해석한 게임입니다. 인간, 엘프, 악마, 고양이족 등 여러 종족으로 플레이할 수 있으며 각각 고유한 능력이 있습니다. 세 개의 마을에서 관계를 쌓고, 전투 특화 스킬 트리를 키우며, 메인 퀘스트가 있는 큰 서사를 경험할 수 있습니다. 스타듀가 제공하는 모든 것을 더 크게 만든 것——더 많은 캐릭터, 마법, 세계——을 원한다면 Sun Haven이 답입니다.',
    desc_de:
      'Sun Haven ist das, was Stardew Valley aussehen würde, wenn es als vollständiges Fantasy-RPG neu gedacht würde. Du kannst als verschiedene Rassen spielen — Menschen, Elfen, Dämonen, Neko und mehr — jede mit einzigartigen Fähigkeiten. Es gibt drei separate Städte, in denen du Beziehungen aufbauen kannst, einen tiefen Skill-Tree mit Kampfspezialisierungen und eine übergreifende Hauptquest-Geschichte. Wenn du von allem, was Stardew bietet, mehr willst — mehr Charaktere, mehr Magie, mehr Welt — ist Sun Haven genau das Richtige.',
    why_en: [
      'Most content-rich Stardew alternative — three towns, 50+ romance candidates, real combat',
      'Playable as multiple fantasy races with distinct starting bonuses',
      'Active development with regular content updates since 2023 full release',
    ],
    why_zh: [
      '内容最丰富的星露谷替代品——三个城镇、50 多位恋爱候选人、真实战斗',
      '可扮演多种奇幻种族，各有独特起始加成',
      '自 2023 年正式发布以来持续积极开发，定期内容更新',
    ],
    why_zhTW: [
      '內容最豐富的星露谷替代品——三個城鎮、50 多位戀愛候選人、真實戰鬥',
      '可扮演多種奇幻種族，各有獨特起始加成',
      '自 2023 年正式發布以來持續積極開發，定期內容更新',
    ],
    why_ja: [
      '最もコンテンツ豊富なスターデュー代替作——3つの町、50人以上の恋愛候補、本格的な戦闘',
      '複数のファンタジー種族でプレイ可能で、それぞれ固有のスタートボーナスがある',
      '2023年の正式リリース以降、定期的なアップデートで積極的に開発継続中',
    ],
    why_ko: [
      '콘텐츠 가장 풍부한 스타듀 대안 — 세 마을, 50명 이상의 연애 후보, 실제 전투',
      '여러 판타지 종족으로 플레이 가능하며 각각 고유한 시작 보너스 보유',
      '2023년 정식 출시 이후 꾸준한 개발과 정기적인 업데이트 진행 중',
    ],
    why_de: [
      'Stardew-Alternative mit dem meisten Inhalt — drei Städte, 50+ Romantikoptionen, echte Kämpfe',
      'Spielbar als verschiedene Fantasievölker mit einzigartigen Startboni',
      'Aktive Entwicklung mit regelmäßigen Inhaltsupdates seit der Vollversion 2023',
    ],
    watch_en: "The sheer scope can feel overwhelming early. Pick one town and one skill path first, then expand — trying to do everything at once leads to burnout.",
    watch_zh: '庞大的规模在早期可能感觉不知所措。先专注一个城镇和一条技能路线，然后再扩展——同时尝试做所有事情会导致倦怠。',
    watch_zhTW: '龐大的規模在早期可能感覺不知所措。先專注一個城鎮和一條技能路線，然後再擴展——同時嘗試做所有事情會導致倦怠。',
    watch_ja: '序盤はその規模の大きさに圧倒されることがあります。まず一つの町と一つのスキルルートに集中して、それから広げていきましょう——全部同時にやろうとすると燃え尽きます。',
    watch_ko: '방대한 규모가 초반에 압도감을 줄 수 있습니다. 먼저 한 마을과 한 스킬 경로에 집중한 다음 확장하세요 — 모든 것을 동시에 하려 하면 번아웃이 올 수 있어요.',
    watch_de: 'Der schiere Umfang kann früh überwältigend wirken. Konzentriere dich zuerst auf eine Stadt und einen Skill-Pfad, dann erweitere — alles gleichzeitig zu versuchen führt zu Burnout.',
  },
  coral: {
    title_en: 'Coral Island',
    title_zh: '珊瑚岛',
    title_zhTW: '珊瑚島',
    title_ja: 'Coral Island',
    title_ko: '코랄 아일랜드',
    title_de: 'Coral Island',
    emoji: '🪸',
    tag_en: 'Tropical · Ocean Diving · Sustainability Theme',
    tag_zh: '热带 · 海底潜水 · 可持续发展主题',
    tag_zhTW: '熱帶 · 海底潛水 · 永續發展主題',
    tag_ja: 'トロピカル · 海底ダイビング · 環境テーマ',
    tag_ko: '열대 · 바다 다이빙 · 지속 가능성 테마',
    tag_de: 'Tropisch · Tauchen · Nachhaltigkeitsthema',
    platform_en: 'PC (Steam) · PlayStation · Xbox · Nintendo Switch',
    platform_zh: 'PC（Steam）· PlayStation · Xbox · Nintendo Switch',
    platform_zhTW: 'PC（Steam）· PlayStation · Xbox · Nintendo Switch',
    platform_ja: 'PC（Steam）· PlayStation · Xbox · Nintendo Switch',
    platform_ko: 'PC（Steam）· PlayStation · Xbox · Nintendo Switch',
    platform_de: 'PC (Steam) · PlayStation · Xbox · Nintendo Switch',
    desc_en:
      "Coral Island is the most visually distinct Stardew alternative — a gorgeous tropical island farming game developed by an Indonesian team (Stairway Games) that centers environmental restoration. You farm, befriend 70+ villagers, and dive into the ocean to clean coral reefs as part of your mission. The art is vibrant and colorful in a way that feels fresh next to Stardew's more muted palette. It supports 50+ romance candidates and has a strong representation of diverse characters.",
    desc_zh:
      '珊瑚岛是视觉上最与众不同的星露谷替代品——一款由印度尼西亚团队（Stairway Games）开发的华美热带岛屿农场游戏，以环境修复为核心。你耕种、与 70 多位村民建立友谊，并潜入海洋清理珊瑚礁作为你使命的一部分。美术风格生机勃勃、色彩丰富，与星露谷更为柔和的色调相比别具一格。它支持 50 多位恋爱候选人，并有大量多元化角色。',
    desc_zhTW:
      '珊瑚島是視覺上最與眾不同的星露谷替代品——一款由印度尼西亞團隊（Stairway Games）開發的華美熱帶島嶼農場遊戲，以環境修復為核心。你耕種、與 70 多位村民建立友誼，並潛入海洋清理珊瑚礁作為你使命的一部分。美術風格生機勃勃、色彩豐富，與星露谷更為柔和的色調相比別具一格。它支持 50 多位戀愛候選人，並有大量多元化角色。',
    desc_ja:
      'Coral Island は、スターデューバレーの代替作の中で最も視覚的に個性的なゲームです——インドネシアのチーム（Stairway Games）が開発した美しいトロピカル農場ゲームで、環境修復がテーマの中心にあります。農業をしながら70人以上の村人と仲を深め、ミッションの一環としてサンゴ礁の海に潜って清掃します。アートスタイルは鮮やかで色彩豊か。スターデューの落ち着いたパレットとは一線を画す雰囲気があります。50人以上の恋愛候補と多様なキャラクター表現も魅力です。',
    desc_ko:
      'Coral Island은 스타듀 밸리 대안 게임 중 시각적으로 가장 독특한 게임입니다 — 인도네시아 팀(Stairway Games)이 개발한 아름다운 열대 농장 게임으로, 환경 복원이 핵심 테마입니다. 농사를 지으며 70명 이상의 마을 사람과 우정을 쌓고, 미션의 일환으로 바다에 뛰어들어 산호초를 청소합니다. 아트 스타일은 생동감 넘치고 화려해서 스타듀의 차분한 팔레트와는 확연히 다른 느낌입니다. 50명 이상의 연애 후보와 다양한 캐릭터 표현도 매력입니다.',
    desc_de:
      'Coral Island ist die visuell markanteste Stardew-Alternative — ein wunderschönes tropisches Insel-Farmspiel, das von einem indonesischen Team (Stairway Games) entwickelt wurde und Umweltwiederherstellung in den Mittelpunkt stellt. Du baust an, befreundest dich mit 70+ Dorfbewohnern und tauchst ins Meer, um Korallenriffe zu reinigen. Der Kunststil ist lebendig und farbenfroh — ein erfrischender Kontrast zu Stardews gedämpfter Palette. Es bietet 50+ Romantikoptionen und eine starke Darstellung vielfältiger Charaktere.',
    why_en: [
      'Unique ocean-diving mechanic for resource gathering — nothing else in the genre offers this',
      'Most vibrant and colorful art style of any major Stardew alternative',
      'Environmental restoration storyline gives the farm work meaningful narrative purpose',
    ],
    why_zh: [
      '独特的海底潜水资源采集机制——该类型中没有其他游戏提供这种体验',
      '所有主要星露谷替代品中最生机勃勃、色彩最丰富的美术风格',
      '环境修复故事线为农场工作赋予了有意义的叙事目的',
    ],
    why_zhTW: [
      '獨特的海底潛水資源採集機制——該類型中沒有其他遊戲提供這種體驗',
      '所有主要星露谷替代品中最生機勃勃、色彩最豐富的美術風格',
      '環境修復故事線為農場工作賦予了有意義的敘事目的',
    ],
    why_ja: [
      '海に潜って資源を集める独自メカニック——このジャンルで他にないシステム',
      '主要なスターデュー代替作の中で最も鮮やかで色彩豊かなアートスタイル',
      '環境修復のストーリーラインが農場作業に意義ある物語の目的を与えてくれる',
    ],
    why_ko: [
      '자원 채집을 위한 독특한 바다 다이빙 메카닉 — 이 장르에서 다른 게임엔 없는 시스템',
      '주요 스타듀 대안 게임 중 가장 생동감 있고 화려한 아트 스타일',
      '환경 복원 스토리라인이 농장 작업에 의미 있는 서사적 목적을 부여',
    ],
    why_de: [
      'Einzigartiger Tauch-Mechanismus zum Ressourcensammeln — sonst nirgendwo in diesem Genre',
      'Lebendigster und farbenfrohster Kunststil aller wichtigen Stardew-Alternativen',
      'Umweltwiederherstellungsgeschichte gibt der Farmarbeit einen bedeutungsvollen narrativen Zweck',
    ],
    watch_en: "Performance on Switch can be inconsistent — PC or PlayStation/Xbox is recommended for the smoothest experience.",
    watch_zh: 'Switch 上的性能可能不稳定——推荐 PC 或 PlayStation/Xbox 以获得最流畅的体验。',
    watch_zhTW: 'Switch 上的效能可能不穩定——推薦 PC 或 PlayStation/Xbox 以獲得最流暢的體驗。',
    watch_ja: 'Switch版の動作が不安定なことがある——最もスムーズな体験を求めるなら PC か PlayStation/Xbox がおすすめです。',
    watch_ko: 'Switch에서 성능이 불안정할 수 있습니다 — 가장 원활한 경험을 위해 PC나 PlayStation/Xbox를 추천합니다.',
    watch_de: 'Die Performance auf der Switch kann inkonsistent sein — PC oder PlayStation/Xbox wird für das flüssigste Erlebnis empfohlen.',
  },
  mistria: {
    title_en: 'Fields of Mistria',
    title_zh: 'Fields of Mistria（米斯特里亚农场）',
    title_zhTW: 'Fields of Mistria（米斯特里亞農場）',
    title_ja: 'Fields of Mistria',
    title_ko: 'Fields of Mistria',
    title_de: 'Fields of Mistria',
    emoji: '🌸',
    tag_en: 'Cozy · Classic Feel · Charming Pixel Art',
    tag_zh: '治愈 · 经典感 · 迷人像素画风',
    tag_zhTW: '治癒 · 經典感 · 迷人像素畫風',
    tag_ja: '癒し系 · クラシックな雰囲気 · 魅力的なピクセルアート',
    tag_ko: '힐링 · 클래식한 느낌 · 매력적인 픽셀 아트',
    tag_de: 'Gemütlich · Klassisches Feeling · Charmante Pixel-Art',
    platform_en: 'PC (Steam) · Early Access 2024',
    platform_zh: 'PC（Steam）· 2024 年抢先体验',
    platform_zhTW: 'PC（Steam）· 2024 年搶先體驗',
    platform_ja: 'PC（Steam）· 2024年 早期アクセス',
    platform_ko: 'PC（Steam）· 2024 얼리 액세스',
    platform_de: 'PC (Steam) · Early Access 2024',
    desc_en:
      "Fields of Mistria is the most 'Stardew-like' Stardew alternative — deliberately made to recreate that cozy charm while adding its own personality. Developed solo by NPC Studio, it features beautiful pixel art, a lovely medieval European town called Mistria, a small but well-written cast of romance candidates, and a focus on warmth over complexity. If you finished Stardew Valley and simply want more of that feeling without wanting a massively different experience, Fields of Mistria is the closest match.",
    desc_zh:
      'Fields of Mistria 是最"像星露谷"的星露谷替代品——有意重现那种治愈魅力，同时加入自己的个性。由 NPC Studio 独立开发，拥有精美的像素艺术、一个迷人的中世纪欧式小镇（米斯特里亚）、一小批但写得很好的恋爱候选人，以及注重温情而非复杂度的设计。如果你完成了星露谷物语，只是想要更多那种感觉而不想要截然不同的体验，Fields of Mistria 是最接近的选择。',
    desc_zhTW:
      'Fields of Mistria 是最「像星露谷」的星露谷替代品——有意重現那種治癒魅力，同時加入自己的個性。由 NPC Studio 獨立開發，擁有精美的像素藝術、一個迷人的中世紀歐式小鎮（米斯特里亞）、一小批但寫得很好的戀愛候選人，以及注重溫情而非複雜度的設計。如果你完成了星露谷物語，只是想要更多那種感覺而不想要截然不同的體驗，Fields of Mistria 是最接近的選擇。',
    desc_ja:
      'Fields of Mistria は最も「スターデューらしい」スターデューの代替作です——あの癒しの魅力を意図的に再現しながら、自分だけの個性も加えています。NPC Studio がひとりで開発し、美しいピクセルアート、魅力的な中世ヨーロッパ風の町 Mistria、少数だけど丁寧に書かれた恋愛候補、そして複雑さより温かさを重視したデザインが特徴です。スターデューを終えて、あの感覚をもう少し味わいたい——でも全く別のゲームは要らない——そんな人に最もぴったりなのが Fields of Mistria です。',
    desc_ko:
      'Fields of Mistria는 가장 "스타듀 같은" 스타듀 대안 게임입니다 — 그 포근한 매력을 의도적으로 재현하면서도 자기만의 개성을 더했습니다. NPC Studio가 혼자 개발했으며, 아름다운 픽셀 아트, 매력적인 중세 유럽풍 마을 미스트리아, 소수이지만 잘 쓰여진 연애 후보들, 그리고 복잡함보다 따뜻함을 중시하는 디자인이 특징입니다. 스타듀를 끝냈고 그 감성을 더 원하지만 완전히 다른 경험을 원하지 않는다면, Fields of Mistria가 가장 가까운 선택입니다.',
    desc_de:
      "Fields of Mistria ist die 'Stardew-ähnlichste' Stardew-Alternative — bewusst darauf ausgerichtet, diesen gemütlichen Charme neu zu erschaffen und dabei eine eigene Persönlichkeit zu entwickeln. Solo von NPC Studio entwickelt, mit schöner Pixel-Art, einem reizenden mittelalterlichen Dorf namens Mistria, einer kleinen aber liebevoll geschriebenen Besetzung von Romanzepartnern und einem Fokus auf Wärme statt Komplexität. Wenn du Stardew durchgespielt hast und einfach mehr von diesem Gefühl willst, ist Fields of Mistria die treffendste Wahl.",
    why_en: [
      'Closest spiritual successor to Stardew Valley in tone, pacing, and cozy atmosphere',
      'Beautiful pixel art that feels both nostalgic and fresh at the same time',
      'Solo developer with a passionate community — rapid updates during early access',
    ],
    why_zh: [
      '在基调、节奏和治愈氛围上最接近星露谷物语的精神续作',
      '精美的像素艺术，同时给人以怀旧感和清新感',
      '独立开发者，拥有热情的社区——抢先体验期间快速更新',
    ],
    why_zhTW: [
      '在基調、節奏和治癒氛圍上最接近星露谷物語的精神續作',
      '精美的像素藝術，同時給人以懷舊感和清新感',
      '獨立開發者，擁有熱情的社區——搶先體驗期間快速更新',
    ],
    why_ja: [
      'トーン・テンポ・癒しの雰囲気においてスターデューバレーに最も近い精神的後継作',
      '懐かしさと新鮮さを同時に感じさせる美しいピクセルアート',
      '個人開発者で熱心なコミュニティを持つ——早期アクセス中の高速アップデートが続く',
    ],
    why_ko: [
      '톤, 페이스, 힐링 분위기에서 스타듀 밸리에 가장 가까운 정신적 후계작',
      '향수와 신선함을 동시에 느끼게 하는 아름다운 픽셀 아트',
      '열정적인 커뮤니티를 가진 솔로 개발자 — 얼리 액세스 중 빠른 업데이트',
    ],
    why_de: [
      'Nächster spiritueller Nachfolger von Stardew Valley in Ton, Tempo und gemütlicher Atmosphäre',
      'Schöne Pixel-Art, die sich gleichzeitig nostalgisch und frisch anfühlt',
      'Solo-Entwickler mit leidenschaftlicher Community — schnelle Updates während des Early Access',
    ],
    watch_en: "Still in early access (as of 2024/2025) — some content is not yet complete. The experience is already polished but the full game is not finished.",
    watch_zh: '仍处于抢先体验阶段（截至 2024/2025 年）——部分内容尚未完成。体验已经相当精良，但完整游戏尚未完成。',
    watch_zhTW: '仍處於搶先體驗階段（截至 2024/2025 年）——部分內容尚未完成。體驗已經相當精良，但完整遊戲尚未完成。',
    watch_ja: 'まだ早期アクセス中（2024〜2025年時点）——一部のコンテンツは未完成です。体験はすでに完成度が高いですが、フルゲームはまだ終わっていません。',
    watch_ko: '아직 얼리 액세스 중 (2024/2025년 기준) — 일부 콘텐츠가 아직 완성되지 않았습니다. 경험은 이미 완성도가 높지만 전체 게임은 아직 완성되지 않았어요.',
    watch_de: 'Noch im Early Access (Stand 2024/2025) — einige Inhalte sind noch nicht abgeschlossen. Die Erfahrung ist bereits poliert, aber das vollständige Spiel ist noch nicht fertig.',
  },
  sandrock: {
    title_en: 'My Time at Sandrock',
    title_zh: '沙石镇时光',
    title_zhTW: '沙石鎮時光',
    title_ja: 'My Time at Sandrock',
    title_ko: 'My Time at Sandrock',
    title_de: 'My Time at Sandrock',
    emoji: '🏜️',
    tag_en: 'Crafting · Town Rebuilding · Story-Driven',
    tag_zh: '制作 · 城镇重建 · 故事驱动',
    tag_zhTW: '製作 · 城鎮重建 · 故事驅動',
    tag_ja: 'クラフト · 街の再建 · ストーリー重視',
    tag_ko: '제작 · 마을 재건 · 스토리 중심',
    tag_de: 'Craften · Stadtwiederaufbau · Story-Driven',
    platform_en: 'PC (Steam) · PlayStation · Xbox · Nintendo Switch',
    platform_zh: 'PC（Steam）· PlayStation · Xbox · Nintendo Switch',
    platform_zhTW: 'PC（Steam）· PlayStation · Xbox · Nintendo Switch',
    platform_ja: 'PC（Steam）· PlayStation · Xbox · Nintendo Switch',
    platform_ko: 'PC（Steam）· PlayStation · Xbox · Nintendo Switch',
    platform_de: 'PC (Steam) · PlayStation · Xbox · Nintendo Switch',
    desc_en:
      "My Time at Sandrock is a crafting and town-rebuilding RPG set in a post-apocalyptic desert frontier. You play as a Builder whose job is to restore the town of Sandrock using materials you gather and workshops you upgrade. The crafting system is significantly deeper than Stardew Valley's — there are complex production chains and commission orders. The story and characters are a major focus, with fully voiced cutscenes and detailed relationship storylines. If you want farming elements alongside crafting depth and narrative weight, Sandrock delivers.",
    desc_zh:
      '沙石镇时光是一款发生在后末日沙漠边境的制作和城镇重建 RPG。你扮演一位建造师，工作是使用你收集的材料和升级的工坊来修复沙石镇。制作系统比星露谷深得多——有复杂的生产链和委托订单。故事和角色是主要关注点，有完全配音的过场动画和详细的关系故事线。如果你想要农场元素同时兼具制作深度和叙事分量，沙石镇时光能满足你。',
    desc_zhTW:
      '沙石鎮時光是一款發生在後末日沙漠邊境的製作和城鎮重建 RPG。你扮演一位建造師，工作是使用你收集的材料和升級的工坊來修復沙石鎮。製作系統比星露谷深得多——有複雜的生產鏈和委託訂單。故事和角色是主要關注點，有完全配音的過場動畫和詳細的關係故事線。如果你想要農場元素同時兼具製作深度和敘事分量，沙石鎮時光能滿足你。',
    desc_ja:
      'My Time at Sandrock は、ポストアポカリプスな砂漠の辺境を舞台にしたクラフトと街の再建 RPG です。プレイヤーはビルダーとして、集めた素材と改良したワークショップを使って砂漠の町サンドロックを復興させる役割を担います。クラフトシステムはスターデューよりかなり深く、複雑な生産チェーンと依頼注文があります。ストーリーとキャラクターも重要で、フルボイスのカットシーンと詳細な関係ストーリーラインが用意されています。農場要素にクラフトの深みと物語の重みを求めるなら、Sandrock が答えです。',
    desc_ko:
      'My Time at Sandrock은 포스트 아포칼립스 사막 변경을 배경으로 한 제작 및 마을 재건 RPG입니다. 플레이어는 건설자로서 수집한 재료와 업그레이드한 공방을 사용해 사막 마을 샌드록을 복원하는 역할을 맡습니다. 제작 시스템은 스타듀보다 훨씬 깊어서 복잡한 생산 사슬과 의뢰 주문이 있습니다. 스토리와 캐릭터도 중심 요소로, 완전 더빙된 컷씬과 상세한 관계 스토리라인이 준비되어 있습니다. 농장 요소와 함께 제작의 깊이와 서사의 무게감을 원한다면 Sandrock이 답입니다.',
    desc_de:
      'My Time at Sandrock ist ein Handwerk- und Stadtwiederaufbau-RPG, das in einer post-apokalyptischen Wüstengrenze spielt. Du spielst als Baumeister, dessen Aufgabe es ist, die Stadt Sandrock mit gesammelten Materialien und aufgewerteten Werkstätten zu restaurieren. Das Crafting-System ist deutlich tiefer als das von Stardew Valley — es gibt komplexe Produktionsketten und Auftragsbestellungen. Geschichte und Charaktere stehen im Vordergrund, mit vollvertonten Cutscenes und detaillierten Beziehungsgeschichten. Wer Farmelemente neben Handwerkstiefe und Erzählgewicht sucht, wird bei Sandrock fündig.',
    why_en: [
      'Deepest crafting system of any Stardew alternative — complex workshop chains and upgrades',
      'Fully voiced story with strong main narrative and detailed character arcs',
      'Sequel to My Time at Portia — an expanded, polished experience with an established fanbase',
    ],
    why_zh: [
      '所有星露谷替代品中最深度的制作系统——复杂的工坊链和升级',
      '完全配音的故事，有强大的主线叙事和详细的角色弧',
      '波托镇时光的续作——扩展、精良的体验，拥有成熟的粉丝群',
    ],
    why_zhTW: [
      '所有星露谷替代品中最深度的製作系統——複雜的工坊鏈和升級',
      '完全配音的故事，有強大的主線敘事和詳細的角色弧',
      '波托鎮時光的續作——擴展、精良的體驗，擁有成熟的粉絲群',
    ],
    why_ja: [
      'スターデュー代替作の中で最も深いクラフトシステム——複雑なワークショップチェーンとアップグレード',
      'フルボイスのストーリーで、強力なメイン物語と詳細なキャラクターアーク',
      'My Time at Portia の続編——ファンを持つ成熟した作品をさらに拡張・洗練',
    ],
    why_ko: [
      '스타듀 대안 게임 중 가장 깊은 제작 시스템 — 복잡한 공방 사슬과 업그레이드',
      '완전 더빙된 스토리, 강력한 메인 서사와 상세한 캐릭터 아크',
      'My Time at Portia의 후속작 — 팬층이 있는 성숙한 시리즈의 확장되고 완성도 높은 경험',
    ],
    why_de: [
      'Tiefstes Crafting-System aller Stardew-Alternativen — komplexe Werkstattketten und Upgrades',
      'Vollvertonte Geschichte mit starker Haupthandlung und detaillierten Charakterbögen',
      'Nachfolger von My Time at Portia — eine erweiterte, polierte Erfahrung mit einer etablierten Fanbasis',
    ],
    watch_en: "The focus is more on crafting commissions than passive farming — if you want crops and seasons to be central, Sandrock might feel slightly different from what you expect.",
    watch_zh: '游戏更注重制作委托而非被动农业——如果你想要作物和季节成为核心，沙石镇时光可能感觉与你期望的略有不同。',
    watch_zhTW: '遊戲更注重製作委託而非被動農業——如果你想要作物和季節成為核心，沙石鎮時光可能感覺與你期望的略有不同。',
    watch_ja: 'メインは農業の放置より製作依頼——作物や季節をゲームの中心に据えたいなら、Sandrock は少し期待と違うかもしれません。',
    watch_ko: '수동적인 농업보다 제작 의뢰에 더 중점을 두고 있습니다 — 작물과 계절이 중심이 되길 원한다면 Sandrock은 기대와 조금 다를 수 있어요.',
    watch_de: 'Der Fokus liegt mehr auf Crafting-Aufträgen als auf passivem Ackerbau — wenn du Ernten und Jahreszeiten im Mittelpunkt haben möchtest, könnte Sandrock sich leicht anders anfühlen als erwartet.',
  },
}

function calcResult(answers: Game[]): Game {
  const counts: Record<Game, number> = { sunhaven: 0, coral: 0, mistria: 0, sandrock: 0 }
  for (const a of answers) counts[a]++
  return Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0] as Game
}

export function StardewAltsQuiz({ locale }: { locale: string }) {
  const getLoc = (zh: string, en: string, zhTW?: string, ja?: string, ko?: string, de?: string): string => {
    if (locale === 'zh') return zh
    if (locale === 'zh-TW') return zhTW ?? zh
    if (locale === 'ja') return ja ?? en
    if (locale === 'ko') return ko ?? en
    if (locale === 'de') return de ?? en
    return en
  }
  const isZh = locale === 'zh' || locale === 'zh-TW'
  const [answers, setAnswers] = useState<(Game | null)[]>(Array(QUESTIONS.length).fill(null))
  const [submitted, setSubmitted] = useState(false)

  const allAnswered = answers.every((a) => a !== null)

  if (submitted) {
    const result = RESULTS[calcResult(answers as Game[])]
    const url = `${BASE_URL}/${locale}/quizzes/stardew-alternatives`
    const shareText = getLoc(
      `星露谷之后最适合我的游戏是「${result.title_zh}」！找到你的下一款农场游戏：${url}`,
      `My next farming game after Stardew is ${result.title_en}! Find yours: ${url}`,
      `星露谷之後最適合我的遊戲是「${result.title_zhTW}」！找到你的下一款農場遊戲：${url}`,
      `スターデューの後に自分にぴったりなゲームは「${result.title_ja}」でした！あなたのゲームも探してみて：${url}`,
      `스타듀 이후 내게 딱 맞는 게임은 「${result.title_ko}」입니다! 당신의 게임도 찾아보세요：${url}`,
      `Mein nächstes Farmspiel nach Stardew ist ${result.title_de}! Finde deins: ${url}`
    )

    const whyList = locale === 'zh' ? result.why_zh
      : locale === 'zh-TW' ? result.why_zhTW
      : locale === 'ja' ? result.why_ja
      : locale === 'ko' ? result.why_ko
      : locale === 'de' ? result.why_de
      : result.why_en

    return (
      <div>
        <div className="mb-6 text-center">
          <div className="mb-3 text-6xl">{result.emoji}</div>
          <p className="mb-1 text-xs text-[#4a5a4a]">{getLoc(result.tag_zh, result.tag_en, result.tag_zhTW, result.tag_ja, result.tag_ko, result.tag_de)}</p>
          <h2 className="mb-2 text-xl font-bold text-[#f0a832]">
            {getLoc(result.title_zh, result.title_en, result.title_zhTW, result.title_ja, result.title_ko, result.title_de)}
          </h2>
          <p className="text-xs text-[#4a5a4a]">
            {getLoc(result.platform_zh, result.platform_en, result.platform_zhTW, result.platform_ja, result.platform_ko, result.platform_de)}
          </p>
        </div>

        <p className="mb-5 text-sm leading-relaxed text-[#8a9a7a]">
          {getLoc(result.desc_zh, result.desc_en, result.desc_zhTW, result.desc_ja, result.desc_ko, result.desc_de)}
        </p>

        <div className="mb-5 rounded-xl border border-[#2d3d2d] bg-[#0f1a0f] p-4">
          <h3 className="mb-3 text-sm font-semibold text-[#e8dcc8]">
            {getLoc('为什么适合你', 'Why it fits you', '為什麼適合你', 'なぜあなたに合うのか', '왜 나에게 맞는가', 'Warum es zu dir passt')}
          </h3>
          <ul className="mb-3 space-y-2">
            {whyList.map((w, i) => (
              <li key={i} className="flex gap-2 text-sm text-[#8a9a7a]">
                <span className="shrink-0 text-[#f0a832]">✓</span>
                <span>{w}</span>
              </li>
            ))}
          </ul>
          <div className="border-t border-[#2d3d2d] pt-3">
            <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-[#f0a832]">
              {getLoc('需要注意', 'Worth knowing', '需要注意', '覚えておくべきこと', '알아두면 좋은 점', 'Wissenswert')}
            </p>
            <p className="text-sm text-[#8a9a7a]">{getLoc(result.watch_zh, result.watch_en, result.watch_zhTW, result.watch_ja, result.watch_ko, result.watch_de)}</p>
          </div>
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
            '星露谷之后，你该玩哪款游戏？',
            'What to Play After Stardew Valley?',
            '星露谷之後，你該玩哪款遊戲？',
            'スターデューバレーの次に何を遊ぶ？',
            '스타듀 밸리 다음엔 뭘 플레이할까?',
            'Was nach Stardew Valley spielen?'
          )}
        </h1>
        <p className="text-sm text-[#8a9a7a]">
          {getLoc(
            '6 个问题，从 Sun Haven、珊瑚岛、Fields of Mistria、沙石镇时光中找到最适合你的下一款农场游戏',
            '6 questions to find your perfect Stardew Valley alternative — Sun Haven, Coral Island, Fields of Mistria, or My Time at Sandrock',
            '6 個問題，從 Sun Haven、珊瑚島、Fields of Mistria、沙石鎮時光中找到最適合你的下一款農場遊戲',
            '6つの質問で、Sun Haven・Coral Island・Fields of Mistria・My Time at Sandrock から最高のスターデュー代替作を見つけよう',
            '6가지 질문으로 Sun Haven, Coral Island, Fields of Mistria, My Time at Sandrock 중 당신에게 딱 맞는 스타듀 대안 게임 찾기',
            '6 Fragen, um dein perfektes Stardew Valley-Alternativspiel zu finden — Sun Haven, Coral Island, Fields of Mistria oder My Time at Sandrock'
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
          '找到我的下一款游戏',
          'Find My Next Game',
          '找到我的下一款遊戲',
          '次のゲームを見つける',
          '내 다음 게임 찾기',
          'Mein nächstes Spiel finden'
        )}
      </button>
    </div>
  )
}
