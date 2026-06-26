import { getGuideBySlug, getAllGuideSlugs } from '@/lib/guides'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'

export async function generateStaticParams() {
  const slugs = await getAllGuideSlugs()
  return slugs.map(({ locale, game, slug }) => ({ locale, game, slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; game: string; slug: string }>
}): Promise<Metadata> {
  const { locale, game, slug } = await params
  const post = await getGuideBySlug(locale, game, slug)
  if (!post) return {}
  return {
    title: `${post.title} — TendFarm`,
    description: post.description,
  }
}

export default async function GuideArticlePage({
  params,
}: {
  params: Promise<{ locale: string; game: string; slug: string }>
}) {
  const { locale, game, slug } = await params
  const post = await getGuideBySlug(locale, game, slug)
  if (!post) notFound()

  const gameLabel = game.replace(/-/g, ' ')

  return (
    <div className="mx-auto max-w-3xl px-4 py-16">
      <Link
        href={`/${locale}/guides/${game}`}
        className="mb-6 inline-block text-sm text-[#8a9a7a] transition-colors hover:text-[#f0a832]"
      >
        ← {gameLabel}
      </Link>
      <h1 className="mb-3 text-3xl font-bold text-[#e8dcc8]">{post.title}</h1>
      {post.publishedAt && (
        <p className="mb-4 text-sm text-[#4a5a4a]">{post.publishedAt}</p>
      )}
      {post.tags.length > 0 && (
        <div className="mb-10 flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-[#2d3d2d] px-2 py-0.5 text-xs text-[#8a9a7a]"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
      <article
        className="prose prose-invert prose-p:text-[#8a9a7a] prose-headings:text-[#e8dcc8] prose-a:text-[#f0a832] prose-strong:text-[#e8dcc8] prose-li:text-[#8a9a7a] max-w-none"
        dangerouslySetInnerHTML={{ __html: post.contentHtml }}
      />
    </div>
  )
}
