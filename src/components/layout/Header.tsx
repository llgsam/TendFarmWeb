import Link from 'next/link'
import Image from 'next/image'
import { useTranslations, useLocale } from 'next-intl'
import { LanguageSwitcher } from './LanguageSwitcher'

export function Header() {
  const t = useTranslations('nav')
  const locale = useLocale()
  const base = `/${locale}`
  const isZh = locale === 'zh'

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
            <span className="text-base font-bold text-[#f0a832]">Farm Game Hub</span>
            <span className="text-[10px] text-[#8a9a7a] tracking-wide">
              {isZh ? '农场游戏集结地' : 'Farming Game Hub'}
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
          <Link href={`${base}/guides`} className="text-[#8a9a7a] hover:text-[#e8dcc8] transition-colors">
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
            {isZh ? '🎮 游戏大全' : '🎮 All Games'}
          </Link>
          <LanguageSwitcher />
        </div>

      </div>
    </header>
  )
}
