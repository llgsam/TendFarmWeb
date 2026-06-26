import { StardewRomanceQuiz } from '@/components/tools/StardewRomanceQuiz'
import { RelatedQuizzes } from '@/components/RelatedQuizzes'
import type { Metadata } from 'next'
import { BASE_URL, otherLocale } from '@/lib/config'
import Link from 'next/link'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const other = otherLocale(locale)
  const isZh = locale === 'zh'
  return {
    title: isZh
      ? '星露谷配对测验：你应该和哪位村民在一起？'
      : 'Stardew Valley Romance Quiz — Which Character Should You Marry?',
    description: isZh
      ? '6 个关于感情的问题，测出你最适合和哪位星露谷村民在一起——艾比盖尔、莉亚、潘妮、艾米莉、塞巴斯蒂安还是哈维？'
      : '6 questions to find your perfect Stardew Valley romance match — Abigail, Leah, Penny, Emily, Sebastian, or Harvey? Based on your relationship values.',
    keywords: isZh
      ? ['星露谷配对测验', '星露谷谁适合我', '星露谷结婚对象测试', '星露谷村民配对']
      : [
          'stardew valley romance quiz',
          'which stardew valley character should i marry',
          'stardew valley who should i romance',
          'stardew valley best marriage candidate quiz',
          'stardew valley romance match',
        ],
    alternates: {
      canonical: `${BASE_URL}/${locale}/quizzes/stardew-romance`,
      languages: {
        [locale]: `${BASE_URL}/${locale}/quizzes/stardew-romance`,
        [other]: `${BASE_URL}/${other}/quizzes/stardew-romance`,
      },
    },
  }
}

const FAQ_EN = [
  {
    q: 'Who is the best character to marry in Stardew Valley?',
    a: 'The "best" marriage candidate depends on your playstyle and personality. Most players recommend Abigail or Leah for their engaging storylines and genuine character depth. Harvey is beloved for his thoughtfulness, Sebastian for his authenticity, and Penny for her warmth. There is no objectively best choice — each marriage candidate offers unique dialogue, gifts, and story events.',
  },
  {
    q: 'How do you romance someone in Stardew Valley?',
    a: "To romance a character in Stardew Valley: (1) Give them gifts on their birthday and twice per week — each character has preferred gifts. (2) Talk to them daily to build friendship hearts. (3) Reach 8 hearts, then obtain a Bouquet from Pierre's shop to begin dating. (4) Reach 10 hearts with a Mermaid Pendant (crafted or purchased) to propose marriage. (5) After marriage, keep giving gifts and talking to maintain a healthy relationship.",
  },
  {
    q: 'What are the best gifts for Abigail in Stardew Valley?',
    a: 'Abigail loves Amethyst, Chocolate Cake, Pufferfish, Pumpkin, and Spicy Eel. She particularly loves Amethyst, which is easy to obtain from the mines. Avoid giving her eggs (unless they are void eggs), which she dislikes.',
  },
  {
    q: 'What are the best gifts for Sebastian in Stardew Valley?',
    a: 'Sebastian loves Frozen Tear, Obsidian, Pumpkin Soup, Sashimi, and Void Egg. Frozen Tears from the mines (levels 40-79) are an accessible early gift. He dislikes most vegetables and foraged items, so focus on mined gems and cooked foods he specifically loves.',
  },
  {
    q: 'Can you divorce and remarry in Stardew Valley?',
    a: "Yes — in Stardew Valley you can divorce your spouse at Mayor Lewis' house (the book on the left of his desk). Divorce costs 50,000 gold and wipes relationship progress with that character. After divorce, you can pursue and marry a different character. Note: divorced spouses will remember and may mention the divorce in dialogue.",
  },
]

const FAQ_ZH = [
  {
    q: '星露谷物语里最值得结婚的角色是谁？',
    a: '最值得结婚的角色因人而异。大多数玩家推荐艾比盖尔或莉亚，因为她们的故事线有深度且个性鲜明。哈维以体贴著称，塞巴斯蒂安因真实感而备受喜爱，潘妮则凭温暖性格拥有忠实粉丝。没有客观上最好的选择——每位结婚对象都有独特的对话、礼物和剧情事件。',
  },
  {
    q: '星露谷物语里怎么和村民谈恋爱？',
    a: '与村民发展感情的步骤：(1) 每周送礼物两次（生日送礼效果翻倍）——每位角色有偏好礼物。(2) 每天和他们交谈，积累友好度。(3) 达到 8 颗心后，在皮埃尔商店购买花束，正式开始约会。(4) 达到 10 颗心后，用美人鱼坠饰求婚。(5) 婚后继续送礼和交谈，维持良好关系。',
  },
  {
    q: '艾比盖尔最喜欢什么礼物？',
    a: '艾比盖尔最喜欢：紫水晶、巧克力蛋糕、河豚、南瓜、辛辣鳗鱼。其中紫水晶是矿洞早期最容易获得的，性价比极高。避免送鸡蛋（虚空蛋除外），她不喜欢。',
  },
  {
    q: '塞巴斯蒂安最喜欢什么礼物？',
    a: '塞巴斯蒂安最喜欢：冻滴石、黑曜石、南瓜汤、生鱼片、虚空蛋。冻滴石可在矿洞 40-79 层获得，是前期最好的礼物选择。他不喜欢大多数蔬菜和采集物，专注于矿石和他特别喜欢的熟食。',
  },
  {
    q: '星露谷物语可以离婚再结婚吗？',
    a: '可以。在市长路易斯的家里（左边书架的书）可以提出离婚，费用 50000 金币，同时清除该角色的好感度。离婚后可以继续追求并结婚其他角色。注意：离婚后前任配偶会记得这件事，并在对话中提及。',
  },
]

export default async function StardewRomancePage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const isZh = locale === 'zh'
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
            {isZh ? '测评' : 'Quizzes'}
          </Link>
          <span className="mx-2">›</span>
          <span className="text-[#e8dcc8]">
            {isZh ? '星露谷配对测验' : 'Stardew Romance Quiz'}
          </span>
        </nav>

        <div className="rounded-2xl border border-[#2d3d2d] bg-[#1a2e1a]/30 p-8">
          <StardewRomanceQuiz locale={locale} />
        </div>

        <p className="mt-6 text-center text-xs text-[#8a9a7a]">
          {isZh
            ? '每位村民都有独特的魅力——没有对错，只有适不适合。'
            : "Every villager has their own magic — there's no right or wrong, only what fits."}
        </p>

        <RelatedQuizzes currentSlug="stardew-romance" locale={locale} />

        {/* FAQ Section for SEO/GEO */}
        <div className="mt-16">
          <h2 className="mb-6 text-xl font-bold text-[#e8dcc8]">
            {isZh ? '关于星露谷感情系统的常见问题' : 'Stardew Valley Romance FAQ'}
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
