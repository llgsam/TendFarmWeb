import { StardewDailyCompanion } from '@/components/tools/StardewDailyCompanion'
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

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  return {
    title: getLoc(
      locale,
      '星露谷物语每日助手 — 生日、鱼类与作物一屏钉住',
      "Stardew Valley Daily Companion — Pin Today's Birthdays, Fish & Crops",
      '星露谷物語每日助手 — 生日、魚類與作物一屏釘住',
      'スターデューバレー デイリーコンパニオン — 誕生日・魚・作物を固定表示',
      '스타듀밸리 데일리 도우미 — 생일·물고기·작물을 화면에 고정',
      'Stardew Valley Tagesbegleiter — Geburtstage, Fische & Feldfrüchte anheften',
    ),
    description: getLoc(
      locale,
      '免费星露谷物语每日助手：边玩边钉一个浮窗，选好当前季节和天数，立刻看到今日生日+爱的礼物、节日，以及本季能钓的鱼和还来得及种的作物。',
      "Free Stardew Valley daily companion. Pin a floating overlay while you play — set today's season and day to see birthdays and loved gifts, festivals, and this season's fish and still-plantable crops.",
      '免費星露谷物語每日助手：邊玩邊釘一個浮窗，選好目前季節和天數，立刻看到今日生日+愛的禮物、節日，以及本季能釣的魚和還來得及種的作物。',
      '無料のスターデューバレー デイリーコンパニオン。プレイ中に固定できるオーバーレイで、季節と日付を選ぶと今日の誕生日＋好きな贈り物、フェス、今季の魚と間に合う作物がすぐわかります。',
      '무료 스타듀밸리 데일리 도우미. 플레이 중 오버레이를 고정하고 현재 계절과 날짜를 설정하면 오늘의 생일+좋아하는 선물, 축제, 이번 계절 물고기와 아직 심을 수 있는 작물을 바로 확인할 수 있습니다.',
      'Kostenloser Stardew-Valley-Tagesbegleiter. Hefte beim Spielen ein schwebendes Overlay an — wähle Saison und Tag und sieh sofort heutige Geburtstage + Lieblingsgeschenke, Feste sowie Fische und noch pflanzbare Feldfrüchte der Saison.',
    ),
    alternates: {
      canonical: `${BASE_URL}/${locale}/tools/stardew-companion`,
      languages: buildLanguageAlternates('/tools/stardew-companion'),
    },
  }
}

export default async function StardewCompanionPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      {/* Breadcrumb */}
      <nav className="mb-6 text-sm text-[#8a9a7a]">
        <Link href={`/${locale}/tools`} className="hover:text-[#e8dcc8]">
          {getLoc(locale, '工具集', 'Tools', '工具集', 'ツール', '도구', 'Tools')}
        </Link>
        <span className="mx-2">›</span>
        <span className="text-[#e8dcc8]">
          {getLoc(locale, '每日助手', 'Daily Companion', '每日助手', 'デイリーコンパニオン', '데일리 도우미', 'Tagesbegleiter')}
        </span>
      </nav>

      <h1 className="mb-2 text-3xl font-bold text-[#e8dcc8]">
        {getLoc(locale, '星露谷物语每日助手', 'Stardew Valley Daily Companion', '星露谷物語每日助手', 'スターデューバレー デイリーコンパニオン', '스타듀밸리 데일리 도우미', 'Stardew Valley Tagesbegleiter')}
      </h1>
      <p className="mb-8 text-[#8a9a7a]">
        {getLoc(
          locale,
          '选好当前季节和天数，把浮窗钉在游戏旁边：今日生日和 TA 爱的礼物、正在进行的节日，以及本季能钓的鱼和还来得及种的作物，一屏看完不用来回切换。',
          "Set today's season and day, then pin the overlay next to your game: today's birthdays and their loved gifts, any festival happening now, and this season's fish and still-plantable crops — all in one glance, no alt-tabbing.",
          '選好目前季節和天數，把浮窗釘在遊戲旁邊：今日生日和 TA 愛的禮物、正在進行的節日，以及本季能釣的魚和還來得及種的作物，一屏看完不用來回切換。',
          '今日の季節と日付を選び、オーバーレイをゲーム横に固定：今日の誕生日と好きな贈り物、進行中のフェス、今季の魚と間に合う作物を一目で確認、切り替え不要。',
          '오늘의 계절과 날짜를 설정하고 오버레이를 게임 옆에 고정하세요: 오늘의 생일과 좋아하는 선물, 진행 중인 축제, 이번 계절 물고기와 아직 심을 수 있는 작물을 한눈에, 화면 전환 없이 확인.',
          'Wähle Saison und Tag und hefte das Overlay neben dein Spiel: heutige Geburtstage und Lieblingsgeschenke, laufende Feste sowie Fische und noch pflanzbare Feldfrüchte der Saison — alles auf einen Blick, ohne Alt-Tab.',
        )}
      </p>

      <StardewDailyCompanion locale={locale} />

      {/* Crawlable explainer — what the companion checks each day, for SEO/GEO */}
      <div className="mt-12 space-y-6 border-t border-[#2d3d2d] pt-8 text-[#c8bca8]">
        <section>
          <h2 className="mb-2 text-lg font-semibold text-[#e8dcc8]">
            {getLoc(locale, '每天该查什么', 'What to check each in-game day', '每天該查什麼', '毎日チェックすべきこと', '매일 확인할 것', 'Was du jeden Tag prüfen solltest')}
          </h2>
          <p className="text-sm leading-relaxed">
            {getLoc(
              locale,
              '每日助手把当天最值得关心的四件事拼在一屏：谁过生日、TA 最爱的礼物是什么、今天有没有节日、以及本季还能钓的鱼和还来得及种的作物。数据直接复用送礼、鱼类、日历与作物工具，不需要重新查。',
              "The companion pulls together the four things worth checking each day: who's having a birthday and their loved gift, whether a festival is on today, and this season's remaining fish and still-plantable crops. It reuses the gift, fish, calendar, and crop tools directly — no need to look them up separately.",
              '每日助手把當天最值得關心的四件事拼在一屏：誰過生日、TA 最愛的禮物是什麼、今天有沒有節日、以及本季還能釣的魚和還來得及種的作物。資料直接複用送禮、魚類、日曆與作物工具，不需要重新查。',
              'デイリーコンパニオンは毎日確認すべき4つの情報をまとめます：誕生日の村人と好きな贈り物、今日のフェスの有無、今季まだ釣れる魚とまだ間に合う作物。データは贈り物・魚・カレンダー・作物ツールをそのまま再利用し、個別に調べる必要はありません。',
              '데일리 도우미는 매일 확인할 가치가 있는 네 가지를 한 화면에 모읍니다: 오늘 생일인 주민과 좋아하는 선물, 오늘 축제 여부, 이번 계절에 아직 잡을 수 있는 물고기와 아직 심을 수 있는 작물. 데이터는 선물·물고기·달력·작물 도구를 그대로 재사용해 따로 찾아볼 필요가 없습니다.',
              'Der Tagesbegleiter fasst die vier Dinge zusammen, die jeden Tag zählen: wer Geburtstag hat und sein Lieblingsgeschenk, ob heute ein Fest stattfindet, sowie die noch fangbaren Fische und pflanzbaren Feldfrüchte der Saison. Die Daten stammen direkt aus den Geschenk-, Fisch-, Kalender- und Feldfrucht-Tools — kein separates Nachschlagen nötig.',
            )}
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-[#e8dcc8]">
            {getLoc(locale, '边玩边钉住', 'Pin it while you play', '邊玩邊釘住', 'プレイ中に固定', '플레이 중 고정하기', 'Beim Spielen anheften')}
          </h2>
          <p className="text-sm leading-relaxed">
            {getLoc(
              locale,
              '浏览器支持画中画时，可以把这块浮窗弹到独立小窗，放在游戏窗口旁边，翻页/切季节都不用离开游戏画面。设置会自动保存，下次打开还是上次看的那一天。',
              "When your browser supports document Picture-in-Picture, the panel can pop out into its own always-on-top window next to your game — advance the day or change season without ever tabbing away. Your last-viewed day is saved automatically.",
              '瀏覽器支援畫中畫時，可以把這塊浮窗彈到獨立小窗，放在遊戲視窗旁邊，翻頁/切季節都不用離開遊戲畫面。設定會自動儲存，下次打開還是上次看的那一天。',
              'ブラウザがドキュメントピクチャーインピクチャーに対応していれば、このパネルを常に最前面の別ウィンドウとして切り離し、ゲーム画面の横に置けます。日付や季節を進めてもゲームから離れる必要はありません。最後に見た日は自動保存されます。',
              '브라우저가 document Picture-in-Picture를 지원하면 이 패널을 항상 위에 뜨는 별도 창으로 분리해 게임 창 옆에 둘 수 있습니다. 날짜나 계절을 바꿔도 게임 화면을 벗어날 필요가 없습니다. 마지막으로 본 날짜는 자동 저장됩니다.',
              'Wenn dein Browser Document Picture-in-Picture unterstützt, kannst du dieses Panel als eigenes, immer sichtbares Fenster neben dein Spiel legen — Tag oder Saison wechseln, ohne das Spiel zu verlassen. Der zuletzt angezeigte Tag wird automatisch gespeichert.',
            )}
          </p>
        </section>
      </div>

      {/* Related links */}
      <div className="mt-12 border-t border-[#2d3d2d] pt-8">
        <h2 className="mb-4 text-lg font-semibold text-[#e8dcc8]">
          {getLoc(locale, '相关工具', 'Related Tools', '相關工具', '関連ツール', '관련 도구', 'Verwandte Tools')}
        </h2>
        <div className="flex flex-wrap gap-3">
          <Link
            href={`/${locale}/tools/stardew-calendar`}
            className="rounded-lg border border-[#2d3d2d] px-4 py-2 text-sm text-[#8a9a7a] hover:text-[#e8dcc8] transition-colors"
          >
            {getLoc(locale, '星露谷日历（生日）→', 'Stardew Calendar (Birthdays) →', '星露谷日曆（生日）→', 'カレンダー（誕生日）→', '달력(생일) →', 'Kalender (Geburtstage) →')}
          </Link>
          <Link
            href={`/${locale}/tools/stardew-gifts`}
            className="rounded-lg border border-[#2d3d2d] px-4 py-2 text-sm text-[#8a9a7a] hover:text-[#e8dcc8] transition-colors"
          >
            {getLoc(locale, '送礼查询 →', 'Gift Guide →', '送禮查詢 →', '贈り物ガイド →', '선물 가이드 →', 'Geschenk-Guide →')}
          </Link>
          <Link
            href={`/${locale}/tools/stardew-fish`}
            className="rounded-lg border border-[#2d3d2d] px-4 py-2 text-sm text-[#8a9a7a] hover:text-[#e8dcc8] transition-colors"
          >
            {getLoc(locale, '鱼类速查 →', 'Fish Finder →', '魚類速查 →', '魚図鑑 →', '물고기 도감 →', 'Fisch-Finder →')}
          </Link>
          <Link
            href={`/${locale}/tools/stardew`}
            className="rounded-lg border border-[#2d3d2d] px-4 py-2 text-sm text-[#8a9a7a] hover:text-[#e8dcc8] transition-colors"
          >
            {getLoc(locale, '作物利润计算器 →', 'Crop Profit Calculator →', '作物利潤計算器 →', '作物計算機 →', '작물 계산기 →', 'Feldfrucht-Rechner →')}
          </Link>
          <Link
            href={`/${locale}/tools/stardew-greenhouse`}
            className="rounded-lg border border-[#2d3d2d] px-4 py-2 text-sm text-[#8a9a7a] hover:text-[#e8dcc8] transition-colors"
          >
            {getLoc(locale, '温室规划器 →', 'Greenhouse Planner →', '溫室規劃器 →', '温室プランナー →', '온실 플래너 →', 'Gewächshaus-Planer →')}
          </Link>
        </div>
      </div>
    </div>
  )
}
