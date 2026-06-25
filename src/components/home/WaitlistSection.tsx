import { useTranslations, useLocale } from 'next-intl'
import { WaitlistForm } from '@/components/ui/WaitlistForm'

export function WaitlistSection() {
  const t = useTranslations()
  const locale = useLocale()

  return (
    <section className="px-4 py-20 text-center">
      <div className="mx-auto max-w-xl">
        <h2 className="mb-2 text-2xl font-bold text-[#e8dcc8]">{t('waitlist.title')}</h2>
        <p className="mb-8 text-[#8a9a7a]">{t('waitlist.subtitle')}</p>
        <WaitlistForm
          locale={locale}
          sourcePage="home-bottom"
          successMessage={t('waitlist.success')}
          duplicateMessage={t('waitlist.duplicate')}
          errorMessage={t('waitlist.error')}
          buttonText={t('waitlist.button')}
          placeholder={t('waitlist.placeholder')}
        />
      </div>
    </section>
  )
}
