import Link from 'next/link'
import Image from 'next/image'
import { useTranslations, useLocale } from 'next-intl'
import { LanguageSwitcher } from './LanguageSwitcher'

function getLoc(locale: string, zh: string, en: string, zhTW?: string, ja?: string, ko?: string, de?: string): string {
  if (locale === 'zh') return zh
  if (locale === 'zh-TW') return zhTW ?? zh
  if (locale === 'ja') return ja ?? en
  if (locale === 'ko') return ko ?? en
  if (locale === 'de') return de ?? en
  return en
}

export function Header() {
  const t = useTranslations('nav')
  const locale = useLocale()
  const base = `/${locale}`

  return (
    <header className="sticky top-0 z-50 border-b border-[#2d3d2d] bg-[#0f1a0f]/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">

        {/* Logo + brand */}
        <Link href={base} className="flex items-center gap-2.5">
          <Image
            src="/logo.png"
            alt="TendFarm"
            width={30}
            height={30}
            className=""
          />
          <div className="flex flex-col leading-none">
            <span className="text-base font-bold text-[#f0a832]">Farming Game Hub</span>
            <span className="text-[10px] text-[#8a9a7a] tracking-wide">
              {getLoc(locale, '农场游戏集结地', 'Farming Game Hub', '農場遊戲集結地', '農場ゲームの集いの場', '농장 게임 모임의 장', 'Treffpunkt für Farmspiele')}
            </span>
          </div>
        </Link>

        {/* Nav links */}
        <nav className="hidden gap-5 text-sm md:flex">
          <Link href={`${base}/games`} className="text-[#8a9a7a] hover:text-[#e8dcc8] transition-colors">
            {t('games')}
          </Link>
          <Link href={`${base}/tools`} className="text-[#8a9a7a] hover:text-[#e8dcc8] transition-colors">
            {t('tools')}
          </Link>
          <Link href={`${base}/quizzes`} className="text-[#8a9a7a] hover:text-[#e8dcc8] transition-colors">
            {t('quizzes')}
          </Link>
          <Link href={`${base}/guides/best-games`} className="text-[#8a9a7a] hover:text-[#e8dcc8] transition-colors">
            {t('guides')}
          </Link>
          <Link href={`${base}/tendfarm`} className="rounded border border-[#f0a832]/30 px-2 py-0.5 text-[#f0a832]/70 hover:text-[#f0a832] hover:border-[#f0a832]/60 transition-colors">
            {t('tendfarm')}
          </Link>
        </nav>

        {/* Right side: CTA + language */}
        <div className="flex items-center gap-3">
          <Link
            href={`${base}/games`}
            className="hidden rounded-lg bg-[#2d3d2d] px-3.5 py-1.5 text-xs font-semibold text-[#e8dcc8] transition-colors hover:bg-[#3d4d3d] sm:block"
          >
            {getLoc(locale, '🎮 游戏大全', '🎮 All Games', '🎮 遊戲大全', '🎮 ゲーム一覧', '🎮 모든 게임', '🎮 Alle Spiele')}
          </Link>
          <LanguageSwitcher />
        </div>

      </div>
    </header>
  )
}
