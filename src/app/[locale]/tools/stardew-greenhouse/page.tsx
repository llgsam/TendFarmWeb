import { StardewGreenhousePlanner } from '@/components/tools/StardewGreenhousePlanner'
import type { Metadata } from 'next'
import { BASE_URL, buildLanguageAlternates } from '@/lib/config'
import Link from 'next/link'

function getLoc(locale: string, zh: string, en: string, zhTW?: string, ja?: string, ko?: string, de?: string): string {
  if (locale === 'zh') return zh
  if (locale === 'zh-TW') return zhTW ?? zh
  if (locale === 'ja') return ja ?? en
  if (locale === 'ko') return ko ?? en
  if (locale === 'de') return de ?? en
  return en
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  return {
    title: getLoc(locale,
      '星露谷物语温室布局规划器 — 10×12 洒水器覆盖',
      'Stardew Valley Greenhouse Planner — 10×12 Layout & Sprinklers',
      '星露谷物語溫室佈局規劃器 — 10×12 灑水器覆蓋',
      'スターデューバレー 温室レイアウトプランナー',
      '스타듀밸리 온실 배치 플래너',
      'Stardew Valley Gewächshaus-Planer — 10×12-Layout',
    ),
    description: getLoc(locale,
      '免费星露谷物语温室布局规划器：在固定 10×12（120 格）的温室耕地上放置作物和普通/优质/铱金洒水器，实时显示浇水覆盖，一键铺最优铱金阵。温室作物全年生长、无需稻草人。自动保存并可分享链接。',
      'Free Stardew Valley greenhouse layout planner. Place crops and Basic/Quality/Iridium sprinklers on the fixed 10×12 (120-tile) greenhouse plot, see watering coverage live, and fill the optimal Iridium grid in one click. Greenhouse crops grow year-round and need no scarecrows. Autosaves and shares via link.',
      '免費星露谷物語溫室佈局規劃器：在固定 10×12（120 格）的溫室耕地上放置作物和普通/優質/銥金灑水器，即時顯示澆水覆蓋，一鍵鋪最優銥金陣。溫室作物全年生長、無需稻草人。自動儲存並可分享連結。',
      '無料のスターデューバレー温室レイアウトプランナー。10×12（120マス）固定の温室区画に作物とスプリンクラーを配置、給水範囲を即時表示、最適なイリジウム配置をワンクリック。温室の作物は通年育ち、カカシ不要。自動保存・リンク共有。',
      '무료 스타듀밸리 온실 배치 플래너. 10×12(120칸) 고정 온실 경작지에 작물과 스프링클러를 배치하고 급수 범위를 실시간 확인, 최적 이리듐 배치를 원클릭. 온실 작물은 사계절 자라고 허수아비가 필요 없음. 자동 저장·링크 공유.',
      'Kostenloser Stardew-Valley-Gewächshausplaner. Platziere Feldfrüchte und Sprinkler auf dem festen 10×12-Beet (120 Felder), sieh die Bewässerung live und fülle das optimale Iridium-Raster per Klick. Gewächshaus-Feldfrüchte wachsen ganzjährig und brauchen keine Vogelscheuchen. Autospeicherung und Teilen-Link.',
    ),
    alternates: {
      canonical: `${BASE_URL}/${locale}/tools/stardew-greenhouse`,
      languages: buildLanguageAlternates('/tools/stardew-greenhouse'),
    },
  }
}

export default async function StardewGreenhousePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <nav className="mb-6 text-sm text-[#8a9a7a]">
        <Link href={`/${locale}/tools`} className="hover:text-[#e8dcc8]">
          {getLoc(locale, '工具集', 'Tools', '工具集', 'ツール', '도구', 'Tools')}
        </Link>
        <span className="mx-2">›</span>
        <span className="text-[#e8dcc8]">
          {getLoc(locale, '温室规划器', 'Greenhouse Planner', '溫室規劃器', '温室プランナー', '온실 플래너', 'Gewächshaus-Planer')}
        </span>
      </nav>
      <h1 className="mb-2 text-3xl font-bold text-[#e8dcc8]">
        {getLoc(locale, '星露谷物语温室布局规划器', 'Stardew Valley Greenhouse Planner', '星露谷物語溫室佈局規劃器', 'スターデューバレー 温室プランナー', '스타듀밸리 온실 플래너', 'Stardew Valley Gewächshaus-Planer')}
      </h1>
      <p className="mb-8 text-[#8a9a7a]">
        {getLoc(locale,
          '在固定 10×12（120 格）的温室耕地上放置作物和洒水器，实时查看浇水覆盖，一键铺最优铱金阵。布局自动保存，可复制链接分享。',
          'Place crops and sprinklers on the fixed 10×12 (120-tile) greenhouse plot, see watering coverage live, and fill the optimal Iridium grid in one click. Your layout autosaves and can be shared via link.',
          '在固定 10×12（120 格）的溫室耕地上放置作物和灑水器，即時查看澆水覆蓋，一鍵鋪最優銥金陣。佈局自動儲存，可複製連結分享。',
          '10×12（120マス）固定の温室区画に作物とスプリンクラーを配置し、給水範囲を即時に確認、最適なイリジウム配置をワンクリック。配置は自動保存、リンク共有可能。',
          '10×12(120칸) 고정 온실 경작지에 작물과 스프링클러를 배치하고 급수 범위를 실시간 확인, 최적 이리듐 배치를 원클릭. 배치는 자동 저장되고 링크로 공유 가능.',
          'Platziere Feldfrüchte und Sprinkler auf dem festen 10×12-Beet (120 Felder), sieh die Bewässerung live und fülle das optimale Iridium-Raster per Klick. Dein Layout wird gespeichert und ist per Link teilbar.',
        )}
      </p>

      <StardewGreenhousePlanner locale={locale} />

      {/* Crawlable info — high-confidence greenhouse facts for SEO/GEO */}
      <div className="mt-12 space-y-6 border-t border-[#2d3d2d] pt-8 text-[#c8bca8]">
        <section>
          <h2 className="mb-2 text-lg font-semibold text-[#e8dcc8]">
            {getLoc(locale, '如何解锁温室', 'How to unlock the greenhouse', '如何解鎖溫室', '温室の解放方法', '온실 잠금 해제', 'Gewächshaus freischalten')}
          </h2>
          <p className="text-sm leading-relaxed">
            {getLoc(locale,
              '温室位于农舍左侧，初始为废墟。完成社区中心「储藏室（Pantry）」的全部收集包即可修复它；若走 Joja 路线，则通过 Joja 社区开发表花 35,000g 购买。',
              'The greenhouse sits to the left of your farmhouse, starting as a ruin. Repair it by completing every bundle in the Community Center Pantry, or on the Joja route buy it for 35,000g via the Joja Community Development Form.',
              '溫室位於農舍左側，初始為廢墟。完成社區中心「儲藏室（Pantry）」的全部收集包即可修復；若走 Joja 路線，則透過 Joja 社區開發表花 35,000g 購買。',
              '温室は農家の左側にあり、最初は廃墟です。コミュニティセンターの「食料庫（Pantry）」のバンドルを全て完成させると修復されます。Jojaルートなら開発フォームで35,000gで購入できます。',
              '온실은 농가 왼쪽에 있으며 처음에는 폐허입니다. 커뮤니티 센터 「식료품 저장실(Pantry)」의 모든 꾸러미를 완성하면 복구되고, 조자 루트라면 개발 양식으로 35,000g에 구입할 수 있습니다.',
              'Das Gewächshaus liegt links vom Bauernhaus und ist anfangs eine Ruine. Repariere es, indem du alle Bündel der Speisekammer (Pantry) im Gemeindezentrum abschließt, oder kaufe es auf dem Joja-Weg für 35.000 G über das Joja-Entwicklungsformular.',
            )}
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-[#e8dcc8]">
            {getLoc(locale, '温室的规则', 'How the greenhouse works', '溫室的規則', '温室の仕組み', '온실 규칙', 'So funktioniert das Gewächshaus')}
          </h2>
          <ul className="ml-4 list-disc space-y-1 text-sm leading-relaxed">
            <li>{getLoc(locale,
              '中央耕地固定为 10×12＝120 格，任何季节都可耕种。',
              'The central plot is a fixed 10×12 = 120 tiles, tillable in any season.',
              '中央耕地固定為 10×12＝120 格，任何季節都可耕種。',
              '中央の区画は10×12＝120マス固定で、どの季節でも耕せます。',
              '중앙 경작지는 10×12＝120칸 고정이며 어느 계절이든 경작할 수 있습니다.',
              'Das zentrale Beet ist fest 10×12 = 120 Felder und in jeder Jahreszeit bepflanzbar.')}</li>
            <li>{getLoc(locale,
              '作物全年生长，不受季节影响——多年生作物（如远古果、蔓越莓）种一次可持续收获。',
              'Crops grow year-round regardless of season — perennials (Ancient Fruit, Cranberries) keep producing after a single planting.',
              '作物全年生長，不受季節影響——多年生作物（如遠古果、蔓越莓）種一次可持續收穫。',
              '作物は季節に関係なく通年育ち、多年生（古代果実・クランベリー等）は一度植えれば収穫し続けます。',
              '작물은 계절과 무관하게 사계절 자라며, 다년생(고대 과일·크랜베리 등)은 한 번 심으면 계속 수확됩니다.',
              'Feldfrüchte wachsen ganzjährig — mehrjährige (Uralte Frucht, Cranberrys) tragen nach einmaligem Pflanzen weiter.')}</li>
            <li>{getLoc(locale,
              '洒水器照常工作——仅 6 个铱金洒水器（列 2/7 × 行 2/7/11）即可覆盖其余 114 个作物格；室内无需稻草人，乌鸦从不袭击，闪电也不会劈坏作物。',
              'Sprinklers work as usual — just 6 Iridium Sprinklers (columns 2/7 × rows 2/7/11) cover all 114 remaining crop tiles; no scarecrows are needed indoors, crows never attack, and lightning never destroys crops.',
              '灑水器照常工作——僅 6 個銥金灑水器（列 2/7 × 行 2/7/11）即可覆蓋其餘 114 個作物格；室內無需稻草人，烏鴉從不襲擊，閃電也不會劈壞作物。',
              'スプリンクラーは通常通り機能し、イリジウム6個（列2/7×行2/7/11）で残り114マスの作物を全て給水できます。室内はカカシ不要、カラスは襲わず、雷も作物を壊しません。',
              '스프링클러는 평소처럼 작동하며 이리듐 6개(열 2/7 × 행 2/7/11)로 나머지 114개 작물 칸을 모두 급수할 수 있습니다. 실내에는 허수아비가 필요 없고, 까마귀도 습격하지 않으며, 번개도 작물을 파괴하지 않습니다.',
              'Sprinkler funktionieren normal — nur 6 Iridium-Sprinkler (Spalten 2/7 × Reihen 2/7/11) bewässern alle 114 verbleibenden Feldfrucht-Felder; drinnen sind keine Vogelscheuchen nötig, Krähen greifen nie an und Blitze zerstören keine Feldfrüchte.')}</li>
            <li>{getLoc(locale,
              '耕地四周的边框地砖可以种果树，让温室全年产出水果。',
              'The border tiles around the plot can hold fruit trees, giving the greenhouse year-round fruit.',
              '耕地四周的邊框地磚可以種果樹，讓溫室全年產出水果。',
              '区画の周囲の縁マスには果樹を植えられ、温室で通年フルーツが採れます。',
              '경작지 주변 테두리 칸에는 과일나무를 심을 수 있어 온실에서 사계절 과일을 얻습니다.',
              'Die Randfelder um das Beet können Obstbäume aufnehmen und liefern ganzjährig Früchte.')}</li>
          </ul>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-[#e8dcc8]">
            {getLoc(locale, '温室最赚钱的作物', 'Best crops for the greenhouse', '溫室最賺錢的作物', '温室で最も儲かる作物', '온실 최고 수익 작물', 'Beste Feldfrüchte fürs Gewächshaus')}
          </h2>
          <p className="text-sm leading-relaxed">
            {getLoc(locale,
              '因为温室不受季节限制，最佳选择是高价多年生作物：远古果（做成酒后单价极高）和星之果是公认的收益之王，种满 120 格配合发酵桶做果酒，能提供稳定的高额年收入。用作物利润计算器可以对比每种作物的日均收益。',
              'Because the greenhouse ignores seasons, the best picks are high-value perennials: Ancient Fruit (extremely valuable as wine) and Starfruit are the classic profit kings. Fill the 120 tiles and pair them with kegs for wine to earn a steady, high year-round income. Use the crop profit calculator to compare gold-per-day for each crop.',
              '因為溫室不受季節限制，最佳選擇是高價多年生作物：遠古果（做成酒後單價極高）和星之果是公認的收益之王，種滿 120 格配合發酵桶做果酒，能提供穩定的高額年收入。用作物利潤計算器可以對比每種作物的日均收益。',
              '温室は季節を無視するため、最適なのは高価な多年生作物です。古代果実（ワインにすると非常に高価）とスターフルーツが定番の利益王。120マスを埋めて樽でワインにすれば、通年で安定した高収入になります。作物計算機で作物ごとの日当たり利益を比較しましょう。',
              '온실은 계절을 무시하므로 최적은 고가 다년생 작물입니다. 고대 과일(와인으로 만들면 매우 비쌈)과 스타프루트가 대표적인 수익 왕이며, 120칸을 채우고 통으로 와인을 만들면 사계절 안정적인 고수익을 얻습니다. 작물 수익 계산기로 작물별 일일 수익을 비교하세요.',
              'Da das Gewächshaus Jahreszeiten ignoriert, sind hochwertige Mehrjährige am besten: Uralte Frucht (als Wein extrem wertvoll) und Sternfrucht sind die klassischen Gewinnkönige. Fülle die 120 Felder und mache mit Fässern Wein für ein stetiges, hohes Ganzjahreseinkommen. Nutze den Feldfrucht-Rechner, um den Gold-pro-Tag-Wert zu vergleichen.',
            )}
          </p>
        </section>
      </div>

      <div className="mt-12 border-t border-[#2d3d2d] pt-8">
        <h2 className="mb-4 text-lg font-semibold text-[#e8dcc8]">
          {getLoc(locale, '相关工具', 'Related Tools', '相關工具', '関連ツール', '관련 도구', 'Verwandte Tools')}
        </h2>
        <div className="flex flex-wrap gap-3">
          <Link href={`/${locale}/tools/stardew-companion`} className="rounded-lg border border-[#2d3d2d] px-4 py-2 text-sm text-[#8a9a7a] hover:text-[#e8dcc8] transition-colors">
            {getLoc(locale, '每日助手（边玩边钉住）→', 'Daily Companion (pin while playing) →', '每日助手（邊玩邊釘住）→', 'デイリーコンパニオン（プレイ中に固定）→', '데일리 도우미(플레이 중 고정) →', 'Tagesbegleiter (beim Spielen anheften) →')}
          </Link>
          <Link href={`/${locale}/tools/stardew-sprinklers`} className="rounded-lg border border-[#2d3d2d] px-4 py-2 text-sm text-[#8a9a7a] hover:text-[#e8dcc8] transition-colors">
            {getLoc(locale, '洒水器规划器（自由农田）→', 'Sprinkler Planner (open fields) →', '灑水器規劃器（自由農田）→', 'スプリンクラープランナー →', '스프링클러 플래너 →', 'Sprinkler-Planer →')}
          </Link>
          <Link href={`/${locale}/tools/stardew`} className="rounded-lg border border-[#2d3d2d] px-4 py-2 text-sm text-[#8a9a7a] hover:text-[#e8dcc8] transition-colors">
            {getLoc(locale, '作物利润计算器 →', 'Crop Profit Calculator →', '作物利潤計算器 →', '作物計算機 →', '작물 계산기 →', 'Feldfrucht-Rechner →')}
          </Link>
          <Link href={`/${locale}/tools/stardew-bundles`} className="rounded-lg border border-[#2d3d2d] px-4 py-2 text-sm text-[#8a9a7a] hover:text-[#e8dcc8] transition-colors">
            {getLoc(locale, '收集包速查（储藏室解锁温室）→', 'Bundles (Pantry unlocks it) →', '收集包速查（儲藏室解鎖溫室）→', 'バンドル一覧 →', '꾸러미 목록 →', 'Bündel →')}
          </Link>
        </div>
      </div>
    </div>
  )
}
