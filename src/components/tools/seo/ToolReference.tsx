import type { ReactNode } from 'react'
import { faqSchema } from '@/lib/structured-data'

export interface ToolReferenceProps {
  locale: string
  tableTitle: string
  summary: string
  faqs: { q: string; a: string }[]
  children: ReactNode
}

function faqHeading(locale: string): string {
  if (locale === 'zh') return '常见问题'
  if (locale === 'zh-TW') return '常見問題'
  if (locale === 'ja') return 'よくある質問'
  if (locale === 'ko') return '자주 묻는 질문'
  if (locale === 'de') return 'Häufig gestellte Fragen'
  return 'Frequently Asked Questions'
}

export function ToolReference({ locale, tableTitle, summary, faqs, children }: ToolReferenceProps) {
  const schema = faqs.length ? faqSchema(faqs.map((f) => ({ question: f.q, answer: f.a }))) : null

  return (
    <section className="mt-12 border-t border-[#2d3d2d] pt-8">
      <h2 className="mb-3 text-xl font-bold text-[#e8dcc8]">{tableTitle}</h2>
      <p className="mb-6 text-sm text-[#8a9a7a]">{summary}</p>
      <div className="overflow-x-auto">{children}</div>

      {faqs.length > 0 && (
        <div className="mt-12">
          <h2 className="mb-6 text-xl font-bold text-[#e8dcc8]">{faqHeading(locale)}</h2>
          <div className="space-y-4">
            {faqs.map((f, i) => (
              <div key={i} className="rounded-xl border border-[#2d3d2d] bg-[#1a2e1a] px-5 py-4">
                <p className="mb-2 font-semibold text-[#e8dcc8]">{f.q}</p>
                <p className="text-sm text-[#8a9a7a]">{f.a}</p>
              </div>
            ))}
          </div>
          {schema && (
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
            />
          )}
        </div>
      )}
    </section>
  )
}
