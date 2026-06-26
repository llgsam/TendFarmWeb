import { useTranslations, useLocale } from 'next-intl'
import { WaitlistForm } from '@/components/ui/WaitlistForm'

export function HeroSection() {
  const t = useTranslations('home')
  const locale = useLocale()

  return (
    <section className="relative overflow-hidden px-4 py-24 text-center">
      {/* 背景渐变 */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#1a2e1a]/40 to-transparent" />
      <div className="relative mx-auto max-w-3xl">
        <p className="mb-3 text-xs uppercase tracking-widest text-[#f0a832]">Tend Farm</p>
        <h1 className="mb-6 text-4xl font-bold leading-tight text-[#e8dcc8] md:text-5xl">
          {t('hero.title')}
        </h1>
        <p className="mb-10 text-lg text-[#8a9a7a] leading-relaxed max-w-xl mx-auto">
          {t('hero.subtitle')}
        </p>
        <div className="mx-auto max-w-md">
          <WaitlistForm
            locale={locale}
            sourcePage="home-hero"
            successMessage={t('waitlist.success')}
            duplicateMessage={t('waitlist.duplicate')}
            errorMessage={t('waitlist.error')}
            buttonText={t('hero.cta')}
            placeholder={t('waitlist.placeholder')}
          />
        </div>
      </div>
    </section>
  )
}
