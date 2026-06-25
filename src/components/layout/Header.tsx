import Link from 'next/link'
import { useTranslations, useLocale } from 'next-intl'
import { LanguageSwitcher } from './LanguageSwitcher'

export function Header() {
  const t = useTranslations('nav')
  const locale = useLocale()
  const base = `/${locale}`

  return (
    <header className="sticky top-0 z-50 border-b border-[#2d3d2d] bg-[#0f1a0f]/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href={base} className="text-lg font-semibold text-[#f0a832]">
          TendFarm
        </Link>
        <nav className="hidden gap-6 text-sm md:flex">
          <Link href={`${base}/philosophy`} className="text-[#8a9a7a] hover:text-[#e8dcc8] transition-colors">
            {t('philosophy')}
          </Link>
          <Link href={`${base}/lifestyle`} className="text-[#8a9a7a] hover:text-[#e8dcc8] transition-colors">
            {t('lifestyle')}
          </Link>
          <Link href={`${base}/gameplay`} className="text-[#8a9a7a] hover:text-[#e8dcc8] transition-colors">
            {t('gameplay')}
          </Link>
          <Link href={`${base}/guides`} className="text-[#8a9a7a] hover:text-[#e8dcc8] transition-colors">
            {t('guides')}
          </Link>
        </nav>
        <LanguageSwitcher />
      </div>
    </header>
  )
}
