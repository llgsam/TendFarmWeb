import { useTranslations } from 'next-intl'
import { WaitlistSection } from '@/components/home/WaitlistSection'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '健康生活方式 — TendFarm',
  description: '了解生活节律、HRV、睡眠质量和规律活动如何影响你的身体状态和 TendFarm 农场。',
}

export default function LifestylePage() {
  const t = useTranslations('lifestyle')
  const sections = t.raw('sections') as Array<{ id: string; title: string; body: string }>

  return (
    <div className="mx-auto max-w-3xl px-4 py-16">
      <h1 className="mb-12 text-4xl font-bold text-[#e8dcc8]">{t('hero.title')}</h1>
      <div className="space-y-16">
        {sections.map((s) => (
          <section key={s.id} id={s.id}>
            <h2 className="mb-4 text-xl font-semibold text-[#f0a832]">{s.title}</h2>
            <p className="text-[#8a9a7a] leading-relaxed">{s.body}</p>
          </section>
        ))}
      </div>
      <div className="mt-20">
        <WaitlistSection />
      </div>
    </div>
  )
}
