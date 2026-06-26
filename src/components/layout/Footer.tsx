import Link from 'next/link'
import { useTranslations, useLocale } from 'next-intl'

export function Footer() {
  const t = useTranslations('footer')
  const locale = useLocale()

  return (
    <footer className="border-t border-[#2d3d2d] bg-[#0f1a0f] px-4 py-10">
      <div className="mx-auto max-w-6xl">
        <p className="text-[#f0a832] text-lg font-semibold mb-1">Farm Game Hub</p>
        <p className="text-[#8a9a7a] text-sm mb-6">{t('tagline')}</p>
        <div className="flex gap-6 text-sm text-[#8a9a7a]">
          <Link href={`/${locale}/privacy`} className="hover:text-[#e8dcc8]">{t('privacy')}</Link>
          <a href="mailto:jsamgogo@gmail.com" className="hover:text-[#e8dcc8]">{t('contact')}</a>
        </div>
        <p className="mt-6 text-xs text-[#4a5a4a]">© 2026 Farm Game Hub. All rights reserved.</p>
      </div>
    </footer>
  )
}
