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
            className="rounded-lg"
          />
          <div className="flex flex-col leading-none">
            <span className="text-base font-bold text-[#f0a832]">TendFarm</span>
            <span className="text-[10px] text-[#8a9a7a] tracking-wide">
              {isZh ? '健康农场 App' : 'Health Farming App'}
            </span>
          </div>
        </Link>

        {/* Nav links */}
        <nav className="hidden gap-5 text-sm md:flex">
          <Link href={`${base}/philosophy`} className="text-[#8a9a7a] hover:text-[#e8dcc8] transition-colors">
            {t('philosophy')}
          </Link>
          <Link href={`${base}/lifestyle`} className="text-[#8a9a7a] hover:text-[#e8dcc8] transition-colors">
            {t('lifestyle')}
          </Link>
          <Link href={`${base}/gameplay`} className="text-[#8a9a7a] hover:text-[#e8dcc8] transition-colors">
            {t('gameplay')}
          </Link>
          <Link href={`${base}/tools`} className="text-[#8a9a7a] hover:text-[#e8dcc8] transition-colors">
            {t('tools')}
          </Link>
          <Link href={`${base}/guides`} className="text-[#8a9a7a] hover:text-[#e8dcc8] transition-colors">
            {t('guides')}
          </Link>
        </nav>

        {/* Right side: CTA + language */}
        <div className="flex items-center gap-3">
          <Link
            href={`${base}/#waitlist`}
            className="hidden rounded-lg bg-[#f0a832] px-3.5 py-1.5 text-xs font-semibold text-[#0f1a0f] transition-opacity hover:opacity-90 sm:block"
          >
            {isZh ? '加入候补' : 'Join Waitlist'}
          </Link>
          <LanguageSwitcher />
        </div>

      </div>
    </header>
  )
}
