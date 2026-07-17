// Guide categories shown on /guides and validated by /guides/[game].
// `best-games` is a comparison/roundup hub (the largest set); the rest are
// game-specific guide collections.

export function guideLoc(
  locale: string,
  zh: string,
  en: string,
  zhTW?: string,
  ja?: string,
  ko?: string,
  de?: string
): string {
  if (locale === 'zh') return zh
  if (locale === 'zh-TW') return zhTW ?? zh
  if (locale === 'ja') return ja ?? en
  if (locale === 'ko') return ko ?? en
  if (locale === 'de') return de ?? en
  return en
}

export interface GuideCategory {
  key: string
  emoji: string
  featured?: boolean
  /** Short label — breadcrumbs, cards, nav. Keep it terse. */
  name: (locale: string) => string
  /**
   * Page <title>/<h1>. Falls back to `name`. Exists because the short label a
   * breadcrumb needs ("Best Games & Comparisons") is an internal taxonomy name
   * that names no search term — the heading has to carry the actual subject.
   */
  headline?: (locale: string) => string
  desc: (locale: string) => string
}

export const GUIDE_CATEGORIES: GuideCategory[] = [
  {
    key: 'best-games',
    emoji: '🏆',
    featured: true,
    name: (l) => guideLoc(l, '最佳农场游戏与横向评测', 'Best Games & Comparisons', '最佳農場遊戲與橫向評測', 'おすすめ＆比較ガイド', '베스트 게임 & 비교', 'Beste Spiele & Vergleiche'),
    // The hub indexes the comparison/ranking articles; the flagship ranked
    // listicle owns the plain "farming games" intent, so this heading leans
    // comparison-side to keep the two from splitting the same query.
    headline: (l) => guideLoc(l, '农场游戏横向对比与榜单', 'Farming Game Comparisons & Rankings', '農場遊戲橫向對比與榜單', '農場ゲームの比較＆ランキング', '농장 게임 비교 & 랭킹', 'Farmspiele im Vergleich & Rankings'),
    desc: (l) => guideLoc(l, '横向对比、年度榜单、按平台/预算/心情选游戏——帮你找到下一款农场游戏。', 'Head-to-head comparisons, yearly rankings, and picks by platform, budget, and mood — find your next farming game.', '橫向對比、年度榜單、按平台/預算/心情選遊戲——幫你找到下一款農場遊戲。', '徹底比較、年間ランキング、プラットフォーム・予算・気分別のおすすめで、次の農場ゲームを見つけよう。', '정면 비교, 연간 순위, 플랫폼·예산·기분별 추천으로 다음 농장 게임을 찾아보세요.', 'Direkte Vergleiche, Jahres-Rankings und Empfehlungen nach Plattform, Budget und Stimmung – finde dein nächstes Farmspiel.'),
  },
  {
    key: 'stardew-valley',
    emoji: '🌱',
    name: (l) => guideLoc(l, '星露谷物语攻略', 'Stardew Valley Guides', '星露谷物語攻略', 'スターデューバレー攻略', '스타듀밸리 공략', 'Stardew Valley Guides'),
    desc: (l) => guideLoc(l, '新手入门、农场规划、村民攻略与赚钱策略。', 'Beginner tips, farm planning, villagers, and money strategies.', '新手入門、農場規劃、村民攻略與賺錢策略。', '初心者向けのコツ、農場計画、住民攻略、稼ぎ方。', '초보 팁, 농장 설계, 주민 공략, 돈 버는 전략.', 'Einsteiger-Tipps, Hofplanung, Bewohner und Geldstrategien.'),
  },
  {
    key: 'animal-crossing',
    emoji: '🏝️',
    name: (l) => guideLoc(l, '动物森友会攻略', 'Animal Crossing Guides', '動物森友會攻略', 'あつまれ どうぶつの森 攻略', '모여봐요 동물의 숲 공략', 'Animal Crossing Guides'),
    desc: (l) => guideLoc(l, '岛屿建设、村民邀请、活动与设计灵感。', 'Island building, villagers, events, and design inspiration.', '島嶼建設、村民邀請、活動與設計靈感。', '島づくり、住民、イベント、デザインのヒント。', '섬 꾸미기, 주민, 이벤트, 디자인 영감.', 'Inselbau, Bewohner, Events und Design-Inspiration.'),
  },
  {
    key: 'hay-day',
    emoji: '🌻',
    name: (l) => guideLoc(l, 'Hay Day 攻略', 'Hay Day Guides', 'Hay Day 攻略', 'Hay Day 攻略', 'Hay Day 공략', 'Hay Day Guides'),
    desc: (l) => guideLoc(l, '作物利润、订单技巧与升级策略。', 'Crop profits, order tips, and upgrade strategies.', '作物利潤、訂單技巧與升級策略。', '作物の利益、注文のコツ、アップグレード戦略。', '작물 수익, 주문 팁, 업그레이드 전략.', 'Ernte-Gewinne, Bestell-Tipps und Upgrade-Strategien.'),
  },
  {
    key: 'coral-island',
    emoji: '🪸',
    name: (l) => guideLoc(l, 'Coral Island 攻略', 'Coral Island Guides', 'Coral Island 攻略', 'Coral Island 攻略', 'Coral Island 공략', 'Coral Island Guides'),
    desc: (l) => guideLoc(l, '热带海岛农场、潜水与生态恢复。', 'Tropical island farming, diving, and ecosystem restoration.', '熱帶海島農場、潛水與生態恢復。', '熱帯の島の農業、ダイビング、生態系の回復。', '열대 섬 농사, 다이빙, 생태계 복원.', 'Tropische Inselfarm, Tauchen und Ökosystem.'),
  },
  {
    key: 'my-time-at-portia',
    emoji: '⚙️',
    name: (l) => guideLoc(l, '波西亚时光攻略', 'My Time at Portia Guides', '波西亞時光攻略', 'マイタイム・アット・ポルティア 攻略', '마이 타임 앳 포르티아 공략', 'My Time at Portia Guides'),
    desc: (l) => guideLoc(l, '工坊制造、任务与镇民关系。', 'Workshop crafting, commissions, and townsfolk.', '工坊製造、任務與鎮民關係。', '工房クラフト、依頼、住民との関係。', '공방 제작, 의뢰, 주민 관계.', 'Werkstatt-Crafting, Aufträge und Bewohner.'),
  },
  {
    key: 'palia',
    emoji: '🌸',
    name: (l) => guideLoc(l, 'Palia 攻略', 'Palia Guides', 'Palia 攻略', 'Palia 攻略', 'Palia 공략', 'Palia Guides'),
    desc: (l) => guideLoc(l, '免费 MMO 农场生活的新手指引。', 'Getting started in the free farming-life MMO.', '免費 MMO 農場生活的新手指引。', '無料の農場ライフMMOの始め方。', '무료 농장 생활 MMO 시작 가이드.', 'Einstieg ins kostenlose Farm-Leben-MMO.'),
  },
]

export const GUIDE_CATEGORY_KEYS = GUIDE_CATEGORIES.map((c) => c.key)

export function getGuideCategory(key: string): GuideCategory | undefined {
  return GUIDE_CATEGORIES.find((c) => c.key === key)
}
