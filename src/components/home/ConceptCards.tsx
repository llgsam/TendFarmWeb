import { useTranslations } from 'next-intl'

const concepts = [
  { key: 'activity', emoji: '☀️' },
  { key: 'vitals', emoji: '💧' },
  { key: 'rhythm', emoji: '🌿' },
] as const

export function ConceptCards() {
  const t = useTranslations('home.concepts')

  return (
    <section className="px-4 py-16">
      <div className="mx-auto max-w-6xl">
        <h2 className="mb-10 text-center text-2xl font-semibold text-[#e8dcc8]">{t('title')}</h2>
        <div className="grid gap-6 md:grid-cols-3">
          {concepts.map(({ key, emoji }) => (
            <div key={key} className="rounded-xl border border-[#2d3d2d] bg-[#1a2e1a] p-6">
              <p className="mb-3 text-3xl">{emoji}</p>
              <h3 className="mb-2 font-semibold text-[#f0a832]">{t(`${key}.title`)}</h3>
              <p className="text-sm text-[#8a9a7a] leading-relaxed">{t(`${key}.desc`)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
