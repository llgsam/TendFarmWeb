import { useTranslations } from 'next-intl'
import { WaitlistSection } from '@/components/home/WaitlistSection'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '产品理念 — TendFarm',
  description: '了解 TendFarm 如何把 Activity、睡眠、HRV 和生活节律转化为农场的生长速度和收成。',
}

export default function PhilosophyPage() {
  const t = useTranslations('philosophy')
  const principles = t.raw('principles') as Array<{ title: string; desc: string }>
  const mappingRows = t.raw('mapping.rows') as Array<{ input: string; via: string; output: string }>

  return (
    <div className="mx-auto max-w-4xl px-4 py-16">
      <h1 className="mb-4 text-4xl font-bold text-[#e8dcc8]">{t('hero.title')}</h1>
      <p className="mb-16 text-lg text-[#8a9a7a] leading-relaxed">{t('hero.subtitle')}</p>

      <h2 className="mb-6 text-xl font-semibold text-[#f0a832]">设计原则</h2>
      <div className="mb-16 grid gap-4 md:grid-cols-2">
        {principles.map((p, i) => (
          <div key={i} className="rounded-xl border border-[#2d3d2d] bg-[#1a2e1a] p-5">
            <h3 className="mb-2 font-semibold text-[#e8dcc8]">{p.title}</h3>
            <p className="text-sm text-[#8a9a7a] leading-relaxed">{p.desc}</p>
          </div>
        ))}
      </div>

      <h2 className="mb-6 text-xl font-semibold text-[#f0a832]">{t('mapping.title')}</h2>
      <div className="mb-16 overflow-x-auto rounded-xl border border-[#2d3d2d]">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[#2d3d2d] bg-[#1a2e1a]">
              <th className="px-4 py-3 text-left text-[#8a9a7a]">健康输入</th>
              <th className="px-4 py-3 text-left text-[#8a9a7a]">媒介</th>
              <th className="px-4 py-3 text-left text-[#8a9a7a]">农场效果</th>
            </tr>
          </thead>
          <tbody>
            {mappingRows.map((row, i) => (
              <tr key={i} className="border-b border-[#2d3d2d] last:border-0">
                <td className="px-4 py-3 text-[#e8dcc8]">{row.input}</td>
                <td className="px-4 py-3 text-[#f0a832]">{row.via}</td>
                <td className="px-4 py-3 text-[#8a9a7a]">{row.output}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <WaitlistSection />
    </div>
  )
}
