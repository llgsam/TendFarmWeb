import { useTranslations, useLocale } from 'next-intl'
import { getTranslations } from 'next-intl/server'
import type { Metadata } from 'next'
import { BASE_URL, buildLanguageAlternates } from '@/lib/config'
import Link from 'next/link'
import { ToolsBrowser } from '@/components/tools/ToolsBrowser'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'tools' })
  return {
    title: t('meta.title'),
    description: t('meta.description'),
    alternates: {
      canonical: `${BASE_URL}/${locale}/tools`,
      languages: buildLanguageAlternates('/tools'),
    },
  }
}

const LIVE_TOOLS = [
  {
    key: 'hay-day',
    href: 'tools/hay-day',
    titles: {
      zh: 'Hay Day 作物利润计算器', 'zh-TW': 'Hay Day 作物利潤計算器',
      ja: 'Hay Day 作物利益計算機', ko: 'Hay Day 작물 수익 계산기',
      de: 'Hay Day Ernte-Gewinnrechner', en: 'Hay Day Crop Profit Calculator',
    },
    descs: {
      zh: '按游戏风格筛选最优作物，实时显示利润/分钟和利润/小时。',
      'zh-TW': '按遊戲風格篩選最優作物，即時顯示利潤/分鐘和利潤/小時。',
      ja: 'プレイスタイルで作物を絞り込み。金/分・金/時間をリアルタイム表示。',
      ko: '플레이 스타일로 작물 필터링. 모든 작물의 골드/분·골드/시간 확인.',
      de: 'Nach Spielstil filtern. Gold/min und Gold/h für jede Feldpflanze anzeigen.',
      en: 'Filter by play style. See gold/min and gold/hour for every field crop.',
    },
    tags: { zh: 'Hay Day', 'zh-TW': 'Hay Day', ja: 'Hay Day', ko: 'Hay Day', de: 'Hay Day', en: 'Hay Day' },
  },
  {
    key: 'stardew',
    href: 'tools/stardew',
    titles: {
      zh: '星露谷物语作物利润计算器', 'zh-TW': '星露谷物語作物利潤計算器',
      ja: 'スターデューバレー作物利益計算機', ko: '스타듀 밸리 작물 수익 계산기',
      de: 'Stardew Valley Ernte-Gewinnrechner', en: 'Stardew Valley Crop Profit Calculator',
    },
    descs: {
      zh: '按季节和剩余天数计算最优种植策略，支持工匠技能和再生作物。',
      'zh-TW': '按季節和剩餘天數計算最優種植策略，支援工匠技能和再生作物。',
      ja: '季節と残り日数で最適な作物を計算。再生作物と職人加工にも対応。',
      ko: '계절과 남은 날수로 최적 작물 계산. 재생 작물과 장인 가공 지원.',
      de: 'Beste Ernten nach Jahreszeit und verbleibenden Tagen. Inkl. nachwachsende Pflanzen und Handwerk.',
      en: 'Best crops by season and days left. Includes regrow crops and artisan processing.',
    },
    tags: { zh: 'Stardew Valley', 'zh-TW': 'Stardew Valley', ja: 'Stardew Valley', ko: 'Stardew Valley', de: 'Stardew Valley', en: 'Stardew Valley' },
  },
]

const DATA_TOOLS = [
  {
    key: 'stardew-calendar',
    href: 'tools/stardew-calendar',
    titles: {
      zh: '星露谷物语日历（生日+节日）', 'zh-TW': '星露谷物語日曆（生日+節日）',
      ja: 'スターデューバレー カレンダー', ko: '스타듀밸리 달력',
      de: 'Stardew Valley Kalender', en: 'Stardew Valley Calendar',
    },
    descs: {
      zh: '四季全部村民生日和节日速查，附村民生日查询工具。',
      'zh-TW': '四季全部村民生日和節日速查，附村民生日查詢工具。',
      ja: '全季節の村人の誕生日とフェスティバル一覧。誕生日検索付き。',
      ko: '사계절 모든 주민 생일과 축제 일람. 생일 검색 포함.',
      de: 'Alle Geburtstage und Festivals pro Jahreszeit, mit Geburtstags-Suche.',
      en: 'All villager birthdays and festivals per season, with a birthday lookup.',
    },
    tags: { zh: 'Stardew Valley', 'zh-TW': 'Stardew Valley', ja: 'Stardew Valley', ko: 'Stardew Valley', de: 'Stardew Valley', en: 'Stardew Valley' },
  },
  {
    key: 'stardew-gifts',
    href: 'tools/stardew-gifts',
    titles: {
      zh: '星露谷物语送礼喜好查询', 'zh-TW': '星露谷物語送禮喜好查詢',
      ja: 'スターデューバレー 贈り物ガイド', ko: '스타듀밸리 선물 가이드',
      de: 'Stardew Valley Geschenk-Guide', en: 'Stardew Valley Gift Guide',
    },
    descs: {
      zh: '选村民，立刻查看 TA 最爱的礼物和通用最爱礼物。',
      'zh-TW': '選村民，立刻查看 TA 最愛的禮物和通用最愛禮物。',
      ja: '村人を選ぶと大好きな贈り物と一般的な大好き物を即表示。',
      ko: '주민을 선택하면 좋아하는 선물과 보편적 선물을 즉시 표시.',
      de: 'Wähle einen Bewohner für seine Lieblingsgeschenke und Favoriten.',
      en: 'Pick a villager to see their loved gifts and universal loves.',
    },
    tags: { zh: 'Stardew Valley', 'zh-TW': 'Stardew Valley', ja: 'Stardew Valley', ko: 'Stardew Valley', de: 'Stardew Valley', en: 'Stardew Valley' },
  },
  {
    key: 'stardew-fish',
    href: 'tools/stardew-fish',
    titles: {
      zh: '星露谷物语鱼类查询', 'zh-TW': '星露谷物語魚類查詢',
      ja: 'スターデューバレー 魚検索', ko: '스타듀밸리 물고기 찾기',
      de: 'Stardew Valley Fisch-Finder', en: 'Stardew Valley Fish Finder',
    },
    descs: {
      zh: '按季节、地点、天气筛选，立刻看到能钓的鱼、时间和售价。',
      'zh-TW': '按季節、地點、天氣篩選，立刻看到能釣的魚、時間和售價。',
      ja: '季節・場所・天気で絞り込み、釣れる魚・時間・売値を即表示。',
      ko: '계절·장소·날씨로 필터링해 잡을 물고기, 시간, 판매가를 표시.',
      de: 'Filtere nach Jahreszeit, Ort und Wetter für fangbare Fische.',
      en: 'Filter by season, location, and weather to see catchable fish.',
    },
    tags: { zh: 'Stardew Valley', 'zh-TW': 'Stardew Valley', ja: 'Stardew Valley', ko: 'Stardew Valley', de: 'Stardew Valley', en: 'Stardew Valley' },
  },
  {
    key: 'stardew-bundles',
    href: 'tools/stardew-bundles',
    titles: {
      zh: '星露谷物语收集包速查', 'zh-TW': '星露谷物語收集包速查',
      ja: 'スターデューバレー バンドル一覧', ko: '스타듀밸리 꾸러미 목록',
      de: 'Stardew Valley Bündel', en: 'Stardew Valley Bundles',
    },
    descs: {
      zh: '按房间查社区中心每个收集包的物品、数量、品质和奖励，支持物品反查。',
      'zh-TW': '按房間查社區中心每個收集包的物品、數量、品質和獎勵，支援物品反查。',
      ja: 'コミュニティセンターのバンドル別に必要アイテム・数量・品質・報酬を確認、逆引きも。',
      ko: '커뮤니티 센터 꾸러미별 필요 아이템·수량·품질·보상 확인, 역검색 지원.',
      de: 'Alle Gemeindezentrum-Bündel: Gegenstände, Mengen, Qualität, Belohnungen.',
      en: 'Community Center bundles by room: items, quantities, quality, rewards, and reverse item lookup.',
    },
    tags: { zh: 'Stardew Valley', 'zh-TW': 'Stardew Valley', ja: 'Stardew Valley', ko: 'Stardew Valley', de: 'Stardew Valley', en: 'Stardew Valley' },
  },
  {
    key: 'stardew-museum',
    href: 'tools/stardew-museum',
    titles: {
      zh: '星露谷物语博物馆收藏', 'zh-TW': '星露谷物語博物館收藏',
      ja: 'スターデューバレー 博物館コレクション', ko: '스타듀밸리 박물관 컬렉션',
      de: 'Stardew Valley Museum', en: 'Stardew Valley Museum',
    },
    descs: {
      zh: '全部 95 项矿物、宝石和化石的来源，按类别筛选，附全部捐赠里程碑奖励。',
      'zh-TW': '全部 95 項礦物、寶石和化石的來源，按類別篩選，附全部捐贈里程碑獎勵。',
      ja: '全95件の鉱物・宝石・発掘品の入手先。カテゴリ別、寄贈報酬付き。',
      ko: '광물·보석·유물 95종의 입수처, 카테고리별, 기증 보상 포함.',
      de: 'Alle 95 Mineralien, Edelsteine und Artefakte mit Fundort und Spendenbelohnungen.',
      en: 'All 95 minerals, gems, and artifacts with sources, by category, plus every donation reward.',
    },
    tags: { zh: 'Stardew Valley', 'zh-TW': 'Stardew Valley', ja: 'Stardew Valley', ko: 'Stardew Valley', de: 'Stardew Valley', en: 'Stardew Valley' },
  },
  {
    key: 'stardew-villagers',
    href: 'tools/stardew-villagers',
    titles: {
      zh: '星露谷物语结婚对象对比', 'zh-TW': '星露谷物語結婚對象對比',
      ja: 'スターデューバレー 結婚候補比較', ko: '스타듀밸리 결혼 후보 비교',
      de: 'Stardew Valley Heiratskandidaten', en: 'Stardew Valley Marriage Candidates',
    },
    descs: {
      zh: '12 位可结婚村民并排对比：生日、最爱礼物、性格、婚后与爱心事件，帮你决定娶谁/嫁谁。',
      'zh-TW': '12 位可結婚村民並排對比：生日、最愛禮物、性格、婚後與愛心事件，幫你決定娶誰/嫁誰。',
      ja: '結婚候補12人を誕生日・贈り物・性格・結婚後で並べて比較。',
      ko: '결혼 후보 12명을 생일·선물·성격·결혼 후로 나란히 비교.',
      de: 'Vergleiche alle 12 Heiratskandidaten: Geburtstage, Geschenke, Charakter, Ehe.',
      en: 'Compare all 12 marriage candidates — birthdays, gifts, personality, marriage perks.',
    },
    tags: { zh: 'Stardew Valley', 'zh-TW': 'Stardew Valley', ja: 'Stardew Valley', ko: 'Stardew Valley', de: 'Stardew Valley', en: 'Stardew Valley' },
  },
  {
    key: 'stardew-cooking',
    href: 'tools/stardew-cooking',
    titles: {
      zh: '星露谷物语料理食谱查询', 'zh-TW': '星露谷物語料理食譜查詢',
      ja: 'スターデューバレー 料理レシピ検索', ko: '스타듀밸리 요리 레시피',
      de: 'Stardew Valley Kochrezepte', en: 'Stardew Valley Cooking Recipes',
    },
    descs: {
      zh: '按食材反查、按增益和来源筛选料理，含食材数量、解锁方式、回复量、buff 时长和售价。',
      'zh-TW': '按食材反查、按增益和來源篩選料理，含食材數量、解鎖方式、回復量、buff 時長和售價。',
      ja: '食材で逆引き、バフ・入手方法で料理を絞り込み。材料数・回復量・売値付き。',
      ko: '재료로 역검색, 버프·출처로 요리 필터. 재료 수량·회복량·판매가 포함.',
      de: 'Rezepte per Rückwärtssuche nach Zutat, Buff und Quelle — mit Mengen, Erholung und Preis.',
      en: 'Reverse-lookup recipes by ingredient, filter by buff and source — with quantities, restore, buffs, and price.',
    },
    tags: { zh: 'Stardew Valley', 'zh-TW': 'Stardew Valley', ja: 'Stardew Valley', ko: 'Stardew Valley', de: 'Stardew Valley', en: 'Stardew Valley' },
  },
  {
    key: 'stardew-sprinklers',
    href: 'tools/stardew-sprinklers',
    titles: {
      zh: '星露谷物语洒水器规划器', 'zh-TW': '星露谷物語灑水器規劃器',
      ja: 'スターデューバレー スプリンクラープランナー', ko: '스타듀밸리 스프링클러 플래너',
      de: 'Stardew Valley Sprinkler-Planer', en: 'Stardew Valley Sprinkler Planner',
    },
    descs: {
      zh: '在网格上放洒水器和稻草人，实时看浇水/保护范围，一键铺最优图案，可分享链接。',
      'zh-TW': '在網格上放灑水器和稻草人，即時看澆水/保護範圍，一鍵鋪最優圖案，可分享連結。',
      ja: 'グリッドにスプリンクラー・カカシを配置、給水/保護範囲を即時表示、最適配置ワンクリック。',
      ko: '그리드에 스프링클러·허수아비 배치, 급수/보호 범위 실시간, 최적 배치 원클릭.',
      de: 'Sprinkler und Vogelscheuchen im Raster platzieren, Reichweite live, optimale Muster per Klick.',
      en: 'Place sprinklers and scarecrows on a grid, see coverage live, fill optimal patterns, share a link.',
    },
    tags: { zh: 'Stardew Valley', 'zh-TW': 'Stardew Valley', ja: 'Stardew Valley', ko: 'Stardew Valley', de: 'Stardew Valley', en: 'Stardew Valley' },
  },
  {
    key: 'stardew-greenhouse',
    href: 'tools/stardew-greenhouse',
    titles: {
      zh: '星露谷物语温室布局规划器', 'zh-TW': '星露谷物語溫室佈局規劃器',
      ja: 'スターデューバレー 温室プランナー', ko: '스타듀밸리 온실 플래너',
      de: 'Stardew Valley Gewächshaus-Planer', en: 'Stardew Valley Greenhouse Planner',
    },
    descs: {
      zh: '在固定 10×12（120 格）温室耕地上放作物和洒水器，一键铺最优铱金阵，看全覆盖，附解锁与最赚作物。',
      'zh-TW': '在固定 10×12（120 格）溫室耕地上放作物和灑水器，一鍵鋪最優銥金陣，看全覆蓋，附解鎖與最賺作物。',
      ja: '10×12（120マス）固定の温室区画に作物とスプリンクラーを配置、最適イリジウム配置をワンクリック。解放条件と儲かる作物付き。',
      ko: '10×12(120칸) 고정 온실 경작지에 작물·스프링클러 배치, 최적 이리듐 배치 원클릭. 잠금 해제와 수익 작물 포함.',
      de: 'Feldfrüchte und Sprinkler auf dem festen 10×12-Beet (120 Felder) platzieren, optimales Iridium-Raster per Klick, mit Freischaltung und Gewinn-Feldfrüchten.',
      en: 'Place crops and sprinklers on the fixed 10×12 (120-tile) greenhouse plot, fill the optimal Iridium grid in one click, with unlock steps and best-profit crops.',
    },
    tags: { zh: 'Stardew Valley', 'zh-TW': 'Stardew Valley', ja: 'Stardew Valley', ko: 'Stardew Valley', de: 'Stardew Valley', en: 'Stardew Valley' },
  },
]

export default function ToolsPage() {
  const t = useTranslations('tools')
  const locale = useLocale()

  const getLoc = (zh: string, en: string, zhTW?: string, ja?: string, ko?: string, de?: string): string => {
    if (locale === 'zh') return zh
    if (locale === 'zh-TW') return zhTW ?? zh
    if (locale === 'ja') return ja ?? en
    if (locale === 'ko') return ko ?? en
    if (locale === 'de') return de ?? en
    return en
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-16">
      <h1 className="mb-3 text-4xl font-bold text-[#e8dcc8]">{t('hero.title')}</h1>
      <p className="mb-12 text-lg text-[#8a9a7a]">{t('hero.subtitle')}</p>

      <ToolsBrowser
        locale={locale}
        liveTools={LIVE_TOOLS}
        dataTools={DATA_TOOLS}
        allLabel={getLoc('全部游戏', 'All Games', '全部遊戲', '全ゲーム', '전체 게임', 'Alle Spiele')}
        liveLabel={getLoc('可用', 'Live', '可用', 'ライブ', '라이브', 'Live')}
        calcLabel={getLoc('游戏数值计算器', 'Game Calculators', '遊戲數值計算器', 'ゲーム計算ツール', '게임 계산기', 'Spiel-Rechner')}
        dataLabel={getLoc('游戏数据查询', 'Game Database', '遊戲數據查詢', 'ゲームデータ検索', '게임 데이터 조회', 'Spiel-Datenbank')}
        dataSubtitle={getLoc(
          '即时查询游戏内数据：生日、节日、礼物、鱼类……',
          'Look up in-game data instantly: birthdays, festivals, gifts, fish…',
          '即時查詢遊戲內數據：生日、節日、禮物、魚類……',
          'ゲーム内データを即座に検索：誕生日、フェスティバル、贈り物、魚…',
          '게임 내 데이터를 즉시 조회: 생일, 축제, 선물, 물고기…',
          'Spielinterne Daten sofort nachschlagen: Geburtstage, Festivals, Geschenke, Fische…',
        )}
      />

      {/* Cross-link to Quizzes (quizzes live in their own section, not as a "tool") */}
      <Link
        href={`/${locale}/quizzes`}
        className="mb-6 flex items-center justify-between rounded-xl border border-[#f0a832]/25 bg-[#f0a832]/5 p-5 transition-colors hover:border-[#f0a832]/50"
      >
        <div>
          <p className="font-semibold text-[#e8dcc8]">
            {getLoc('🌾 想测测你是哪种农场玩家？', '🌾 Curious what kind of farmer you are?', '🌾 想測測你是哪種農場玩家？', '🌾 あなたの農場プレイヤータイプは？', '🌾 당신은 어떤 농장 플레이어일까요?', '🌾 Welcher Farmer-Typ bist du?')}
          </p>
          <p className="mt-0.5 text-sm text-[#8a9a7a]">
            {getLoc('60+ 个农场游戏互动测验，找到最适合你的游戏。', '60+ interactive farming-game quizzes to find your perfect game.', '60+ 個農場遊戲互動測驗，找到最適合你的遊戲。', '60以上の農場ゲーム診断であなたにぴったりの一本を。', '60개 이상의 농장 게임 퀴즈로 딱 맞는 게임을 찾으세요.', 'Über 60 Farmspiel-Quizze, um dein perfektes Spiel zu finden.')}
          </p>
        </div>
        <span className="ml-4 shrink-0 text-sm font-semibold text-[#f0a832]">
          {getLoc('去测验 →', 'Browse quizzes →', '去測驗 →', '診断を見る →', '퀴즈 보기 →', 'Quizze ansehen →')}
        </span>
      </Link>

      {/* More tools note */}
      <div className="mb-16 rounded-xl border border-dashed border-[#2d3d2d] bg-[#1a2e1a]/30 p-6 text-center">
        <p className="text-sm text-[#8a9a7a]">
          {getLoc(
            '更多农场游戏工具持续更新中 · 有想要的计算器？',
            'More farming game tools on the way · Have a calculator request?',
            '更多農場遊戲工具持續更新中 · 有想要的計算器？',
            '農場ゲームツールを続々追加中 · リクエストはありますか？',
            '더 많은 농장 게임 도구가 출시 예정 · 계산기 요청이 있으신가요?',
            'Mehr Farming-Tools kommen · Hast du einen Rechner-Wunsch?'
          )}
          {' '}
          <a href="mailto:jsamgogo@gmail.com" className="text-[#f0a832] hover:underline">
            {getLoc('告诉我们 →', 'Let us know →', '告訴我們 →', '教えてください →', '알려주세요 →', 'Lass es uns wissen →')}
          </a>
        </p>
      </div>
    </div>
  )
}
