import { StardewFarmTypeQuiz } from '@/components/tools/StardewFarmTypeQuiz'
import { RelatedQuizzes } from '@/components/RelatedQuizzes'
import type { Metadata } from 'next'
import { BASE_URL, buildLanguageAlternates } from '@/lib/config'
import Link from 'next/link'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const isZh = locale === 'zh' || locale === 'zh-TW'
  return {
    title: isZh
      ? '星露谷农场类型测试：标准/森林/河地/山顶/海滩哪个适合你？'
      : 'Which Stardew Valley Farm Type Is Right for You? — Standard, Forest, Beach Quiz',
    description: isZh
      ? '6 个关于游戏风格的问题，帮你在标准、森林、河地、山顶、海滩五种官方农场类型中找到最适合你的那一个。附老手攻略和优劣势对比。'
      : '6 questions to find your perfect Stardew Valley farm type — Standard, Forest, Riverland, Hill-top, or Beach? Includes pro tips and playstyle breakdown.',
    keywords: isZh
      ? ['星露谷农场类型', '星露谷选哪种农场', '星露谷海滩农场', '星露谷森林农场', '星露谷农场测试', '星露谷地图选择']
      : [
          'which stardew valley farm type',
          'stardew valley farm type quiz',
          'best stardew valley farm',
          'stardew valley beach farm vs standard',
          'stardew valley forest farm',
          'stardew valley riverland farm',
          'stardew valley farm choice',
          'stardew valley which farm to choose',
        ],
    alternates: {
      canonical: `${BASE_URL}/${locale}/quizzes/stardew-farm-type`,
      languages: buildLanguageAlternates('/quizzes/stardew-farm-type'),
    },
  }
}

const FAQ_EN = [
  {
    q: 'Which Stardew Valley farm type is the best?',
    a: "There is no single best farm type — it depends on your playstyle. The Standard Farm is best for beginners and crop-focused players (largest farmable area). The Forest Farm is best for self-sufficient crafters (renewable hardwood). The Riverland Farm is best for fishing and artisan goods. The Hill-top Farm is best for miners and gem collectors (on-farm quarry). The Beach Farm is best for challenge-seekers and aesthetic builders. Take this quiz to find which matches your actual playstyle.",
  },
  {
    q: 'Is the Stardew Valley Beach Farm worth it?',
    a: "Yes, but it is the hardest farm type. Sandy soil cannot use fertilizer, which reduces crop quality and income early. However, the Beach Farm compensates with free forage from tidal waves (shells, coral, seasonal items), the ability to fish in the bay on your own farm, and the most visually unique aesthetic. Experienced players who want a challenge or love the coastal look often prefer it for high-skill runs.",
  },
  {
    q: 'What is special about the Stardew Valley Forest Farm?',
    a: "The Forest Farm has renewable large stumps along its edges that regrow daily, providing unlimited hardwood — a key material for farm buildings and crafted items. The farm also spawns seasonal forage items (spring onions, blueberries, fall mushrooms) regularly. It has a large open clearing in the center for farming. It is the best farm for players who prioritize crafting, sustainability, and foraging over raw crop income.",
  },
  {
    q: 'What is the Stardew Valley Hill-top Farm quarry?',
    a: 'The Hill-top Farm has a unique feature: a small quarry area in the upper-right corner of the farm that spawns mineable rocks, ores, and gems every few days — just like the quarry unlocked by the Community Center. This means Hill-top players have access to a permanent renewable source of copper, iron, gold, and gem nodes without descending to the mine. It pairs extremely well with the crystalarium for passive gem income.',
  },
  {
    q: 'Can you make the same money on any Stardew Valley farm type?',
    a: 'Yes — all five farm types can reach maximum income in late game, though the routes differ. Standard and Riverland farms reach high income fastest (through crops and fish/caviar). Forest and Hill-top farms are slower to ramp up but gain powerful passive income streams. The Beach Farm is the slowest to monetize due to fertilizer constraints but can still reach millions of gold via ancient fruit wine and caviar in a greenhouse.',
  },
]

const FAQ_ZH = [
  {
    q: '星露谷物语哪种农场类型最好？',
    a: '没有唯一最好的农场类型——取决于你的游戏风格。标准农场适合新手和作物型玩家（最大可耕地面积）；森林农场适合自给自足的手工玩家（可再生硬木）；河地农场适合钓鱼和手工艺品爱好者；山顶农场适合矿工和宝石收藏家（农场内含采石场）；海滩农场适合挑战型和美学型玩家。做上面的测验，找到最适合你游戏风格的农场。',
  },
  {
    q: '星露谷物语海滩农场值得选吗？',
    a: '值得，但它是最难的农场类型。沙地不能使用化肥，会降低早期作物品质和收入。不过海滩农场有独特补偿：潮汐每天随机冲来贝壳、珊瑚等免费采集物，农场内的海湾可以直接钓鱼，视觉风格也是五种农场中最独特的。有经验的玩家如果想要挑战性或喜欢沿海美学，往往会在高难度档次选择它。',
  },
  {
    q: '星露谷物语森林农场有什么特别之处？',
    a: '森林农场边缘每天会重新生长大型树桩，提供无限硬木——这是建造农场建筑和制作物品的关键材料。农场还会定期刷新季节性采集物（春葱、蓝莓、秋蘑菇等）。中央有一块较大的开放耕地。对于以工艺、自给和采集为核心玩法的玩家来说，森林农场是最佳选择。',
  },
  {
    q: '星露谷物语山顶农场的采石场是什么？',
    a: '山顶农场右上角有一个独特的小型采石场，每隔几天就会刷新可开采的岩石、矿石和宝石——与社区中心解锁的采石场类似。这意味着山顶农场玩家拥有永久可再生的铜矿、铁矿、金矿和宝石来源，无需频繁下到矿洞。配合水晶培育机复制宝石，是非常高效的被动收入来源。',
  },
  {
    q: '五种星露谷农场类型都能赚到一样多的钱吗？',
    a: '是的——所有五种农场类型在游戏后期都能达到最高收入，只是路线不同。标准农场和河地农场通过作物和鱼/鱼子酱最快达到高收入；森林农场和山顶农场前期较慢，但建立起被动收入体系后非常稳定；海滩农场因化肥限制而货币化最慢，但通过温室古代水果酒和鱼子酱，同样能达到数百万金币年收入。',
  },
]

export default async function StardewFarmTypePage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const isZh = locale === 'zh' || locale === 'zh-TW'
  const faq = isZh ? FAQ_ZH : FAQ_EN

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faq.map(({ q, a }) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: a },
    })),
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="mx-auto max-w-2xl px-4 py-12">
        <nav className="mb-6 text-sm text-[#8a9a7a]">
          <Link href={`/${locale}/quizzes`} className="hover:text-[#e8dcc8]">
            {locale === 'zh' ? '测评' : locale === 'zh-TW' ? '測評' : locale === 'ja' ? 'クイズ' : locale === 'ko' ? '퀴즈' : locale === 'de' ? 'Quiz' : 'Quizzes'}
          </Link>
          <span className="mx-2">›</span>
          <span className="text-[#e8dcc8]">
            {isZh ? '星露谷农场类型测试' : 'Stardew Farm Type Quiz'}
          </span>
        </nav>

        <div className="rounded-2xl border border-[#2d3d2d] bg-[#1a2e1a]/30 p-8">
          <StardewFarmTypeQuiz locale={locale} />
        </div>

        <p className="mt-6 text-center text-xs text-[#8a9a7a]">
          {isZh
            ? '没有最好的农场，只有最适合你的农场——每种类型都有通往百万金币的路。'
            : "There is no best farm — only the one that fits your playstyle. Every type can reach millions of gold."}
        </p>

        <RelatedQuizzes currentSlug="stardew-farm-type" locale={locale} />

        {/* FAQ Section for SEO/GEO */}
        <div className="mt-16">
          <h2 className="mb-6 text-xl font-bold text-[#e8dcc8]">
            {isZh ? '关于星露谷农场类型的常见问题' : 'Stardew Valley Farm Type FAQ'}
          </h2>
          <div className="space-y-4">
            {faq.map(({ q, a }) => (
              <div key={q} className="rounded-xl border border-[#2d3d2d] bg-[#1a2e1a]/30 p-5">
                <h3 className="mb-2 font-semibold text-[#e8dcc8]">{q}</h3>
                <p className="text-sm leading-relaxed text-[#8a9a7a]">{a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
