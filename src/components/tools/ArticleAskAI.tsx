'use client'

import { useState } from 'react'
import Link from 'next/link'

export interface ArticleAskAIProps {
  prompt: string
  tools: { label: string; href: string }[]
  locale: string
}

const UI = {
  heading: (l: string) =>
    l.startsWith('zh') ? '读完了？继续深入' : l === 'ja' ? '読み終えたら、さらに深く' : l === 'ko' ? '다 읽었다면, 더 깊이' : l === 'de' ? 'Fertig gelesen? Geh tiefer' : 'Done reading? Go deeper',
  lead: (l: string) =>
    l.startsWith('zh') ? '带着这篇的对比去问 AI，让它按你的情况帮你挑。' : l === 'ja' ? 'この比較を AI に渡して、あなたに合う一本を選んでもらいましょう。' : l === 'ko' ? '이 비교를 AI에게 건네 당신에게 맞는 게임을 골라 보세요.' : l === 'de' ? 'Nimm diesen Vergleich mit zur KI und lass dir das passende Spiel empfehlen.' : 'Take this comparison to an AI and let it pick the right one for you.',
  copy: (l: string) => (l.startsWith('zh') ? '复制 prompt' : l === 'ja' ? 'プロンプトをコピー' : l === 'ko' ? '프롬프트 복사' : l === 'de' ? 'Prompt kopieren' : 'Copy prompt'),
  copied: (l: string) => (l.startsWith('zh') ? '已复制' : l === 'ja' ? 'コピーしました' : l === 'ko' ? '복사됨' : l === 'de' ? 'Kopiert' : 'Copied'),
  toolsLabel: (l: string) => (l.startsWith('zh') ? '相关工具' : l === 'ja' ? '関連ツール' : l === 'ko' ? '관련 도구' : l === 'de' ? 'Passende Tools' : 'Related tools'),
}

export function ArticleAskAI({ prompt, tools, locale }: ArticleAskAIProps) {
  const [copied, setCopied] = useState(false)

  const openWith = (base: string) => {
    window.open(`${base}${encodeURIComponent(prompt)}`, '_blank', 'noopener')
  }

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(prompt)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1600)
    } catch {
      setCopied(false)
    }
  }

  const btn =
    'rounded-lg px-4 py-2 text-sm font-semibold transition-colors focus:outline-none'

  return (
    <section className="mt-12 rounded-xl border border-[#f0a832]/20 bg-[#1a2e1a] px-5 py-5">
      <h2 className="mb-1 text-lg font-bold text-[#e8dcc8]">{UI.heading(locale)}</h2>
      <p className="mb-4 text-sm text-[#8a9a7a]">{UI.lead(locale)}</p>

      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => openWith('https://chatgpt.com/?q=')}
          className={`${btn} bg-[#f0a832] text-[#0f1a0f] hover:bg-[#f0a832]/90`}
        >
          🤖 ChatGPT
        </button>
        <button
          type="button"
          onClick={() => openWith('https://claude.ai/new?q=')}
          className={`${btn} bg-[#f0a832] text-[#0f1a0f] hover:bg-[#f0a832]/90`}
        >
          🤖 Claude
        </button>
        <button
          type="button"
          onClick={copy}
          className={`${btn} border border-[#2d3d2d] text-[#e8dcc8] hover:border-[#f0a832]/40`}
        >
          {copied ? `✓ ${UI.copied(locale)}` : UI.copy(locale)}
        </button>
      </div>

      {tools.length > 0 && (
        <div className="mt-5 border-t border-[#2d3d2d] pt-4">
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-[#8a9a7a]">
            {UI.toolsLabel(locale)}
          </p>
          <div className="flex flex-wrap gap-2">
            {tools.map((t) => (
              <Link
                key={t.href}
                href={`/${locale}/${t.href}`}
                className="rounded-lg bg-[#f0a832]/10 px-3 py-1.5 text-sm font-semibold text-[#f0a832] transition-colors hover:bg-[#f0a832]/20"
              >
                {t.label} →
              </Link>
            ))}
          </div>
        </div>
      )}
    </section>
  )
}
