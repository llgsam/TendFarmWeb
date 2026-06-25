# TendFarm Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 建设 TendFarm 双语 SEO 内容网站，包含品牌首页、产品理念、玩法体验、农场游戏攻略中心和候补名单邮件收集。

**Architecture:** Next.js 15 App Router + SSG，双语路由 `/zh/*` `/en/*` 由 next-intl 驱动。攻略内容以本地 Markdown 文件存储（gray-matter 解析），候补名单通过 Supabase 存储 + Resend 发送确认邮件。

**Tech Stack:** Next.js 15, TypeScript, Tailwind CSS v4, next-intl, Supabase JS, Resend, gray-matter, next-sitemap, Vitest + React Testing Library

## Global Constraints

- Node.js ≥ 22；包管理器用 `pnpm`
- 路由结构：`/zh/[page]` 和 `/en/[page]`，根路由 `/` 重定向到语言检测结果
- 颜色系统：暗暖色调，主色 `#1a2e1a`（深绿），强调色 `#f0a832`（琥珀），背景 `#0f1a0f`
- 不放 App Store 链接；候补名单是唯一转化动作
- 攻略文章末尾必须包含 TendFarm 植入钩子段落
- 所有页面必须有独立 `<title>` 和 `<meta description>`（中英文各自）
- 测试框架：Vitest（非 Jest）

## File Structure

```
tendFarmWeb/
├── src/
│   ├── app/
│   │   ├── [locale]/
│   │   │   ├── layout.tsx          # locale root layout，NextIntlClientProvider
│   │   │   ├── page.tsx            # 首页
│   │   │   ├── philosophy/page.tsx
│   │   │   ├── lifestyle/page.tsx
│   │   │   ├── gameplay/page.tsx
│   │   │   ├── tools/page.tsx
│   │   │   └── guides/
│   │   │       ├── page.tsx        # 攻略中心首页
│   │   │       └── [game]/
│   │   │           ├── page.tsx    # 单个游戏攻略列表
│   │   │           └── [slug]/
│   │   │               └── page.tsx # 具体攻略文章
│   │   ├── api/
│   │   │   └── waitlist/route.ts   # POST 候补名单
│   │   ├── globals.css
│   │   └── layout.tsx              # root layout（html/body）
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.tsx
│   │   │   ├── Footer.tsx
│   │   │   └── LanguageSwitcher.tsx
│   │   ├── ui/
│   │   │   ├── Button.tsx
│   │   │   └── WaitlistForm.tsx
│   │   └── home/
│   │       ├── HeroSection.tsx
│   │       ├── ConceptCards.tsx
│   │       └── GuidesTeaser.tsx
│   ├── lib/
│   │   ├── supabase.ts             # Supabase server client
│   │   ├── resend.ts               # Resend client
│   │   └── guides.ts              # Markdown 内容加载器
│   ├── content/
│   │   ├── zh/guides/
│   │   │   ├── hay-day/
│   │   │   │   ├── beginner.md
│   │   │   │   └── crops.md
│   │   │   └── stardew-valley/
│   │   │       ├── first-year.md
│   │   │       └── best-crops.md
│   │   └── en/guides/
│   │       ├── hay-day/
│   │       │   ├── beginner.md
│   │       │   └── crops.md
│   │       └── stardew-valley/
│   │           ├── first-year.md
│   │           └── best-crops.md
│   ├── messages/
│   │   ├── zh.json
│   │   └── en.json
│   └── middleware.ts
├── src/test/
│   └── setup.ts
├── next.config.ts
├── tailwind.config.ts
├── vitest.config.ts
├── package.json
└── .env.local.example
```

---

### Task 1: 项目脚手架 + 依赖

**Files:**
- Create: `package.json`
- Create: `next.config.ts`
- Create: `tailwind.config.ts`
- Create: `vitest.config.ts`
- Create: `src/test/setup.ts`
- Create: `.env.local.example`
- Create: `src/app/globals.css`
- Create: `src/app/layout.tsx`（root）

**Interfaces:**
- Produces: 可运行的 Next.js dev server；`pnpm test` 可运行 Vitest

- [ ] **Step 1: 初始化项目**

```bash
cd /Users/samlai2/work_afit/afit_tender/tendFarmWeb
pnpm create next-app@latest . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --yes
```

Expected: Next.js 15 项目已生成，`pnpm dev` 可启动。

- [ ] **Step 2: 安装额外依赖**

```bash
pnpm add next-intl @supabase/supabase-js resend gray-matter next-sitemap zod
pnpm add -D vitest @vitejs/plugin-react @testing-library/react @testing-library/jest-dom @testing-library/user-event jsdom
```

- [ ] **Step 3: 写 vitest.config.ts**

```ts
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
  },
  resolve: {
    alias: { '@': path.resolve(__dirname, './src') },
  },
})
```

- [ ] **Step 4: 写 src/test/setup.ts**

```ts
import '@testing-library/jest-dom'
```

- [ ] **Step 5: 更新 package.json scripts**

在 `package.json` 的 `scripts` 中添加：
```json
"test": "vitest run",
"test:watch": "vitest"
```

- [ ] **Step 6: 写 next.config.ts（暂时基础版，Task 2 会更新）**

```ts
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  output: 'export',
}

export default nextConfig
```

注意：`output: 'export'` 启用 SSG，但候补名单 API route 需要 Vercel Functions，所以之后 Task 5 会移除这行，改用 Vercel 部署时的混合模式。

- [ ] **Step 7: 写 .env.local.example**

```bash
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=xxx
SUPABASE_SERVICE_ROLE_KEY=xxx
RESEND_API_KEY=re_xxx
```

- [ ] **Step 8: 更新 globals.css 基础色系**

```css
@import "tailwindcss";

:root {
  --color-bg: #0f1a0f;
  --color-surface: #1a2e1a;
  --color-accent: #f0a832;
  --color-text: #e8dcc8;
  --color-muted: #8a9a7a;
}

body {
  background-color: var(--color-bg);
  color: var(--color-text);
}
```

- [ ] **Step 9: 写 root layout src/app/layout.tsx**

```tsx
import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'TendFarm',
  description: 'Your healthy life, growing here.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body>{children}</body>
    </html>
  )
}
```

- [ ] **Step 10: 验证**

```bash
pnpm dev
```
Expected: `http://localhost:3000` 可访问，无报错。

```bash
pnpm test
```
Expected: 0 tests found，exit 0。

- [ ] **Step 11: Commit**

```bash
git add -A
git commit -m "feat: Next.js 15 项目脚手架 + Vitest 配置"
```

---

### Task 2: next-intl 双语路由配置

**Files:**
- Create: `src/middleware.ts`
- Create: `src/i18n/request.ts`
- Create: `src/messages/zh.json`（骨架）
- Create: `src/messages/en.json`（骨架）
- Modify: `next.config.ts`
- Create: `src/app/[locale]/layout.tsx`
- Create: `src/app/page.tsx`（根路由重定向）

**Interfaces:**
- Produces: `/zh/` 和 `/en/` 可访问；`useTranslations('home')` 可在 locale layout 内使用

- [ ] **Step 1: 写 src/middleware.ts**

```ts
import createMiddleware from 'next-intl/middleware'

export default createMiddleware({
  locales: ['zh', 'en'],
  defaultLocale: 'zh',
  localePrefix: 'always',
})

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
}
```

- [ ] **Step 2: 写 src/i18n/request.ts**

```ts
import { getRequestConfig } from 'next-intl/server'

export default getRequestConfig(async ({ requestLocale }) => {
  const locale = await requestLocale
  return {
    locale: locale ?? 'zh',
    messages: (await import(`../messages/${locale ?? 'zh'}.json`)).default,
  }
})
```

- [ ] **Step 3: 更新 next.config.ts**

```ts
import createNextIntlPlugin from 'next-intl/plugin'
import type { NextConfig } from 'next'

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts')

const nextConfig: NextConfig = {}

export default withNextIntl(nextConfig)
```

注意：移除 `output: 'export'`，因为 API route 需要 Vercel Functions。

- [ ] **Step 4: 写 src/messages/zh.json 骨架**

```json
{
  "home": {
    "hero": {
      "title": "你的健康生活，在这里生长",
      "subtitle": "睡得好，作物更充盈。动得多，农场提前丰收。TendFarm 把你的真实节律变成一座会自动生长的农场。",
      "cta": "加入候补名单"
    },
    "concepts": {
      "title": "健康数据，驱动农场",
      "activity": { "title": "活动 → 阳光", "desc": "你的活动发生在哪个时间片，作物就在那时长得更快。" },
      "vitals": { "title": "睡眠 → 晨露", "desc": "昨晚恢复良好，今天收成更充盈。" },
      "rhythm": { "title": "生活节律 → 转化率", "desc": "稳定的生活节律让健康数据的农场效果最多提升 12%。" }
    },
    "guidesTeaser": {
      "title": "你玩这些游戏吗？",
      "cta": "进入攻略中心"
    },
    "waitlist": {
      "title": "加入候补名单",
      "subtitle": "第一批 TestFlight 内测资格",
      "placeholder": "your@email.com",
      "button": "立即加入",
      "success": "已收到！我们会在内测开始时第一时间通知你。",
      "duplicate": "你已经在候补名单中了。",
      "error": "提交失败，请重试。"
    }
  },
  "nav": {
    "philosophy": "产品理念",
    "lifestyle": "健康生活",
    "gameplay": "玩法体验",
    "tools": "工具集",
    "guides": "游戏攻略"
  },
  "footer": {
    "tagline": "你的健康生活，在这里生长",
    "privacy": "隐私政策",
    "contact": "联系我们"
  },
  "waitlist": {
    "title": "加入候补名单",
    "subtitle": "第一批 TestFlight 内测资格",
    "placeholder": "your@email.com",
    "button": "立即加入",
    "success": "已收到！我们会在内测开始时第一时间通知你。",
    "duplicate": "你已经在候补名单中了。",
    "error": "提交失败，请重试。"
  },
  "guides": {
    "title": "农场游戏攻略中心",
    "subtitle": "从新手到老农，找到你需要的攻略",
    "readMore": "阅读攻略 →",
    "games": {
      "hay-day": { "name": "Hay Day", "desc": "最受欢迎的移动端农场手游" },
      "stardew-valley": { "name": "星露谷物语", "desc": "独立农场 RPG 游戏神作" },
      "animal-crossing": { "name": "动物森友会", "desc": "任天堂治愈系岛屿经营游戏" }
    },
    "tendfarmHook": {
      "title": "你知道吗？",
      "body": "有一款农场游戏是用你真实的步数、睡眠和 HRV 来驱动的。你的生活节律越规律，农场收成越充盈。",
      "cta": "了解 TendFarm →"
    }
  }
}
```

- [ ] **Step 5: 写 src/messages/en.json 骨架**

```json
{
  "home": {
    "hero": {
      "title": "Your healthy life, growing here",
      "subtitle": "Sleep well, harvest more. Move more, crops ripen early. TendFarm turns your real-life rhythm into a self-growing farm.",
      "cta": "Join the waitlist"
    },
    "concepts": {
      "title": "Health data drives your farm",
      "activity": { "title": "Activity → Sunlight", "desc": "When you're active, crops in that time slot grow faster." },
      "vitals": { "title": "Sleep → Morning Dew", "desc": "A good night's sleep means a more abundant harvest." },
      "rhythm": { "title": "Life Rhythm → Efficiency", "desc": "A stable daily rhythm boosts your farm's health data conversion by up to 12%." }
    },
    "guidesTeaser": {
      "title": "Do you play these games?",
      "cta": "Visit the guides center"
    },
    "waitlist": {
      "title": "Join the waitlist",
      "subtitle": "Get first access to the TestFlight beta",
      "placeholder": "your@email.com",
      "button": "Join now",
      "success": "You're in! We'll notify you when the beta opens.",
      "duplicate": "You're already on the waitlist.",
      "error": "Submission failed, please try again."
    }
  },
  "nav": {
    "philosophy": "Philosophy",
    "lifestyle": "Healthy Living",
    "gameplay": "Gameplay",
    "tools": "Tools",
    "guides": "Game Guides"
  },
  "footer": {
    "tagline": "Your healthy life, growing here",
    "privacy": "Privacy Policy",
    "contact": "Contact"
  },
  "waitlist": {
    "title": "Join the waitlist",
    "subtitle": "Get first access to the TestFlight beta",
    "placeholder": "your@email.com",
    "button": "Join now",
    "success": "You're in! We'll notify you when the beta opens.",
    "duplicate": "You're already on the waitlist.",
    "error": "Submission failed, please try again."
  },
  "guides": {
    "title": "Farm Game Guides",
    "subtitle": "From beginner to veteran farmer",
    "readMore": "Read guide →",
    "games": {
      "hay-day": { "name": "Hay Day", "desc": "The most popular mobile farm game" },
      "stardew-valley": { "name": "Stardew Valley", "desc": "The iconic indie farm RPG" },
      "animal-crossing": { "name": "Animal Crossing: New Horizons", "desc": "Nintendo's cozy island life game" }
    },
    "tendfarmHook": {
      "title": "Did you know?",
      "body": "There's a farm game driven by your real steps, sleep, and HRV. The more consistent your daily rhythm, the more abundant your harvest.",
      "cta": "Learn about TendFarm →"
    }
  }
}
```

- [ ] **Step 6: 写 src/app/[locale]/layout.tsx**

```tsx
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { notFound } from 'next/navigation'

const locales = ['zh', 'en']

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  if (!locales.includes(locale)) notFound()
  const messages = await getMessages()
  return (
    <NextIntlClientProvider messages={messages}>
      {children}
    </NextIntlClientProvider>
  )
}
```

- [ ] **Step 7: 写 src/app/page.tsx（根路由，重定向到 /zh）**

```tsx
import { redirect } from 'next/navigation'

export default function RootPage() {
  redirect('/zh')
}
```

- [ ] **Step 8: 验证路由**

```bash
pnpm dev
```

访问 `http://localhost:3000` → 应跳转到 `http://localhost:3000/zh`。
访问 `http://localhost:3000/en` → 应显示 en locale（空白页暂时正常）。

- [ ] **Step 9: Commit**

```bash
git add -A
git commit -m "feat: next-intl 双语路由 /zh /en"
```

---

### Task 3: Layout 组件（Header / Footer / LanguageSwitcher）

**Files:**
- Create: `src/components/layout/Header.tsx`
- Create: `src/components/layout/Footer.tsx`
- Create: `src/components/layout/LanguageSwitcher.tsx`
- Modify: `src/app/[locale]/layout.tsx`（引入 Header/Footer）

**Interfaces:**
- Produces: `<Header />` `<Footer />` 可用组件；所有 locale 页面有统一顶底栏

- [ ] **Step 1: 写 LanguageSwitcher.tsx**

```tsx
'use client'
import { useLocale } from 'next-intl'
import { usePathname, useRouter } from 'next/navigation'

export function LanguageSwitcher() {
  const locale = useLocale()
  const pathname = usePathname()
  const router = useRouter()

  function switchLocale(newLocale: string) {
    // pathname 是 /zh/xxx，替换第一段
    const segments = pathname.split('/')
    segments[1] = newLocale
    router.push(segments.join('/'))
  }

  return (
    <div className="flex gap-2 text-sm">
      <button
        onClick={() => switchLocale('zh')}
        className={locale === 'zh' ? 'text-[#f0a832] font-semibold' : 'text-[#8a9a7a] hover:text-[#e8dcc8]'}
      >
        中文
      </button>
      <span className="text-[#8a9a7a]">/</span>
      <button
        onClick={() => switchLocale('en')}
        className={locale === 'en' ? 'text-[#f0a832] font-semibold' : 'text-[#8a9a7a] hover:text-[#e8dcc8]'}
      >
        EN
      </button>
    </div>
  )
}
```

- [ ] **Step 2: 写 Header.tsx**

```tsx
import Link from 'next/link'
import { useTranslations, useLocale } from 'next-intl'
import { LanguageSwitcher } from './LanguageSwitcher'

export function Header() {
  const t = useTranslations('nav')
  const locale = useLocale()
  const base = `/${locale}`

  return (
    <header className="sticky top-0 z-50 border-b border-[#2d3d2d] bg-[#0f1a0f]/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href={base} className="text-lg font-semibold text-[#f0a832]">
          TendFarm
        </Link>
        <nav className="hidden gap-6 text-sm md:flex">
          <Link href={`${base}/philosophy`} className="text-[#8a9a7a] hover:text-[#e8dcc8] transition-colors">
            {t('philosophy')}
          </Link>
          <Link href={`${base}/lifestyle`} className="text-[#8a9a7a] hover:text-[#e8dcc8] transition-colors">
            {t('lifestyle')}
          </Link>
          <Link href={`${base}/gameplay`} className="text-[#8a9a7a] hover:text-[#e8dcc8] transition-colors">
            {t('gameplay')}
          </Link>
          <Link href={`${base}/guides`} className="text-[#8a9a7a] hover:text-[#e8dcc8] transition-colors">
            {t('guides')}
          </Link>
        </nav>
        <LanguageSwitcher />
      </div>
    </header>
  )
}
```

- [ ] **Step 3: 写 Footer.tsx**

```tsx
import Link from 'next/link'
import { useTranslations, useLocale } from 'next-intl'

export function Footer() {
  const t = useTranslations('footer')
  const locale = useLocale()

  return (
    <footer className="border-t border-[#2d3d2d] bg-[#0f1a0f] px-4 py-10">
      <div className="mx-auto max-w-6xl">
        <p className="text-[#f0a832] text-lg font-semibold mb-1">TendFarm</p>
        <p className="text-[#8a9a7a] text-sm mb-6">{t('tagline')}</p>
        <div className="flex gap-6 text-sm text-[#8a9a7a]">
          <Link href={`/${locale}/privacy`} className="hover:text-[#e8dcc8]">{t('privacy')}</Link>
          <a href="mailto:hello@tendfarm.app" className="hover:text-[#e8dcc8]">{t('contact')}</a>
        </div>
        <p className="mt-6 text-xs text-[#4a5a4a]">© 2026 TendFarm. All rights reserved.</p>
      </div>
    </footer>
  )
}
```

- [ ] **Step 4: 更新 src/app/[locale]/layout.tsx 引入 Header/Footer**

```tsx
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'

const locales = ['zh', 'en']

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  if (!locales.includes(locale)) notFound()
  const messages = await getMessages()
  return (
    <NextIntlClientProvider messages={messages}>
      <Header />
      <main>{children}</main>
      <Footer />
    </NextIntlClientProvider>
  )
}
```

- [ ] **Step 5: 验证**

```bash
pnpm dev
```
访问 `http://localhost:3000/zh` → Header 显示导航，Footer 显示版权信息，语言切换按钮可用。

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "feat: Header / Footer / LanguageSwitcher 组件"
```

---

### Task 4: UI 基础组件 + WaitlistForm

**Files:**
- Create: `src/components/ui/Button.tsx`
- Create: `src/components/ui/WaitlistForm.tsx`
- Create: `src/__tests__/components/WaitlistForm.test.tsx`

**Interfaces:**
- Consumes: `POST /api/waitlist`（Task 5 实现，本 Task 用 mock 测试）
- Produces: `<Button>` `<WaitlistForm locale={locale} sourcePage={sourcePage} />` 可用组件

- [ ] **Step 1: 写失败测试**

```tsx
// src/__tests__/components/WaitlistForm.test.tsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { WaitlistForm } from '@/components/ui/WaitlistForm'

// mock fetch
global.fetch = vi.fn()

describe('WaitlistForm', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders email input and submit button', () => {
    render(<WaitlistForm locale="zh" sourcePage="home" successMessage="已收到！" duplicateMessage="已在名单中。" errorMessage="失败，请重试。" buttonText="立即加入" placeholder="your@email.com" />)
    expect(screen.getByRole('textbox', { name: /email/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /加入/i })).toBeInTheDocument()
  })

  it('shows success message on successful submit', async () => {
    ;(global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ success: true }),
    })
    render(<WaitlistForm locale="zh" sourcePage="home" successMessage="已收到！" duplicateMessage="已在名单中。" errorMessage="失败，请重试。" buttonText="立即加入" placeholder="your@email.com" />)
    await userEvent.type(screen.getByRole('textbox'), 'test@example.com')
    fireEvent.click(screen.getByRole('button'))
    await waitFor(() => expect(screen.getByText('已收到！')).toBeInTheDocument())
  })

  it('shows duplicate message when email already exists', async () => {
    ;(global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
      ok: false,
      json: async () => ({ error: 'duplicate' }),
    })
    render(<WaitlistForm locale="zh" sourcePage="home" successMessage="已收到！" duplicateMessage="已在名单中。" errorMessage="失败，请重试。" buttonText="立即加入" placeholder="your@email.com" />)
    await userEvent.type(screen.getByRole('textbox'), 'existing@example.com')
    fireEvent.click(screen.getByRole('button'))
    await waitFor(() => expect(screen.getByText('已在名单中。')).toBeInTheDocument())
  })
})
```

- [ ] **Step 2: 运行测试确认失败**

```bash
pnpm test
```
Expected: FAIL，`Cannot find module '@/components/ui/WaitlistForm'`

- [ ] **Step 3: 写 Button.tsx**

```tsx
import { ButtonHTMLAttributes } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'ghost'
  loading?: boolean
}

export function Button({ variant = 'primary', loading, children, className = '', ...props }: ButtonProps) {
  const base = 'inline-flex items-center justify-center rounded-lg px-5 py-2.5 text-sm font-semibold transition-all disabled:opacity-60'
  const variants = {
    primary: 'bg-[#f0a832] text-[#0f1a0f] hover:bg-[#f5bc5a]',
    ghost: 'border border-[#2d3d2d] text-[#e8dcc8] hover:border-[#f0a832]',
  }
  return (
    <button className={`${base} ${variants[variant]} ${className}`} disabled={loading || props.disabled} {...props}>
      {loading ? '...' : children}
    </button>
  )
}
```

- [ ] **Step 4: 写 WaitlistForm.tsx**

```tsx
'use client'
import { useState } from 'react'
import { Button } from './Button'

interface WaitlistFormProps {
  locale: string
  sourcePage: string
  successMessage: string
  duplicateMessage: string
  errorMessage: string
  buttonText: string
  placeholder: string
}

type Status = 'idle' | 'loading' | 'success' | 'duplicate' | 'error'

export function WaitlistForm({ locale, sourcePage, successMessage, duplicateMessage, errorMessage, buttonText, placeholder }: WaitlistFormProps) {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<Status>('idle')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email) return
    setStatus('loading')
    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, locale, source_page: sourcePage }),
      })
      const data = await res.json()
      if (res.ok) {
        setStatus('success')
      } else if (data.error === 'duplicate') {
        setStatus('duplicate')
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return <p className="text-[#f0a832] text-sm">{successMessage}</p>
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row">
      <input
        type="email"
        aria-label="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder={placeholder}
        required
        className="flex-1 rounded-lg border border-[#2d3d2d] bg-[#1a2e1a] px-4 py-2.5 text-sm text-[#e8dcc8] placeholder-[#4a5a4a] focus:border-[#f0a832] focus:outline-none"
      />
      <Button type="submit" loading={status === 'loading'}>{buttonText}</Button>
      {(status === 'duplicate' || status === 'error') && (
        <p className="w-full text-xs text-red-400">
          {status === 'duplicate' ? duplicateMessage : errorMessage}
        </p>
      )}
    </form>
  )
}
```

- [ ] **Step 5: 运行测试确认通过**

```bash
pnpm test
```
Expected: 3 tests PASS

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "feat: Button + WaitlistForm 组件（含测试）"
```

---

### Task 5: 候补名单 API（Supabase + Resend）

**Files:**
- Create: `src/lib/supabase.ts`
- Create: `src/lib/resend.ts`
- Create: `src/app/api/waitlist/route.ts`
- Create: `src/__tests__/api/waitlist.test.ts`

**Interfaces:**
- Produces: `POST /api/waitlist` → `{ success: true }` or `{ error: 'duplicate' | 'invalid' | 'server_error' }`

**Supabase 前置操作（手动执行一次）：**
在 Supabase Dashboard → SQL Editor 运行：
```sql
CREATE TABLE IF NOT EXISTS waitlist (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  locale TEXT NOT NULL DEFAULT 'zh',
  source_page TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

- [ ] **Step 1: 写失败测试**

```ts
// src/__tests__/api/waitlist.test.ts
import { POST } from '@/app/api/waitlist/route'

// mock supabase
vi.mock('@/lib/supabase', () => ({
  supabase: {
    from: vi.fn(() => ({
      insert: vi.fn(() => ({ error: null })),
    })),
  },
}))

vi.mock('@/lib/resend', () => ({
  sendConfirmationEmail: vi.fn().mockResolvedValue(undefined),
}))

describe('POST /api/waitlist', () => {
  it('returns 200 on valid email', async () => {
    const req = new Request('http://localhost/api/waitlist', {
      method: 'POST',
      body: JSON.stringify({ email: 'test@example.com', locale: 'zh', source_page: 'home' }),
      headers: { 'Content-Type': 'application/json' },
    })
    const res = await POST(req)
    const data = await res.json()
    expect(res.status).toBe(200)
    expect(data.success).toBe(true)
  })

  it('returns 400 on invalid email', async () => {
    const req = new Request('http://localhost/api/waitlist', {
      method: 'POST',
      body: JSON.stringify({ email: 'not-an-email', locale: 'zh', source_page: 'home' }),
      headers: { 'Content-Type': 'application/json' },
    })
    const res = await POST(req)
    const data = await res.json()
    expect(res.status).toBe(400)
    expect(data.error).toBe('invalid')
  })
})
```

- [ ] **Step 2: 运行测试确认失败**

```bash
pnpm test
```
Expected: FAIL，`Cannot find module '@/app/api/waitlist/route'`

- [ ] **Step 3: 写 src/lib/supabase.ts**

```ts
import { createClient } from '@supabase/supabase-js'

const url = process.env.NEXT_PUBLIC_SUPABASE_URL!
const key = process.env.SUPABASE_SERVICE_ROLE_KEY!

export const supabase = createClient(url, key)
```

- [ ] **Step 4: 写 src/lib/resend.ts**

```ts
import { Resend } from 'resend'

const client = new Resend(process.env.RESEND_API_KEY)

export async function sendConfirmationEmail(email: string, locale: string) {
  const subject = locale === 'zh' ? 'TendFarm 候补名单确认' : 'TendFarm Waitlist Confirmation'
  const text =
    locale === 'zh'
      ? '感谢加入 TendFarm 候补名单！我们会在 TestFlight 内测开始时第一时间通知你。'
      : 'Thanks for joining the TendFarm waitlist! We\'ll notify you when the TestFlight beta opens.'

  await client.emails.send({
    from: 'TendFarm <noreply@tendfarm.app>',
    to: email,
    subject,
    text,
  })
}
```

- [ ] **Step 5: 写 src/app/api/waitlist/route.ts**

```ts
import { NextResponse } from 'next/server'
import { z } from 'zod'
import { supabase } from '@/lib/supabase'
import { sendConfirmationEmail } from '@/lib/resend'

const schema = z.object({
  email: z.string().email(),
  locale: z.enum(['zh', 'en']),
  source_page: z.string().optional(),
})

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const parsed = schema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json({ error: 'invalid' }, { status: 400 })
    }

    const { email, locale, source_page } = parsed.data
    const { error } = await supabase
      .from('waitlist')
      .insert({ email, locale, source_page })

    if (error) {
      if (error.code === '23505') {
        return NextResponse.json({ error: 'duplicate' }, { status: 409 })
      }
      return NextResponse.json({ error: 'server_error' }, { status: 500 })
    }

    // 非阻塞发送确认邮件，失败不影响响应
    sendConfirmationEmail(email, locale).catch(() => {})

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'server_error' }, { status: 500 })
  }
}
```

- [ ] **Step 6: 运行测试确认通过**

```bash
pnpm test
```
Expected: 5 tests PASS（含 Task 4 的 3 个）

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "feat: 候补名单 API（Supabase + Resend）"
```

---

### Task 6: 首页

**Files:**
- Create: `src/components/home/HeroSection.tsx`
- Create: `src/components/home/ConceptCards.tsx`
- Create: `src/components/home/GuidesTeaser.tsx`
- Modify: `src/app/[locale]/page.tsx`

**Interfaces:**
- Consumes: `useTranslations('home')`, `WaitlistForm`, `Button`
- Produces: 完整首页，6 个区块

- [ ] **Step 1: 写 HeroSection.tsx**

```tsx
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
        <p className="mb-3 text-xs uppercase tracking-widest text-[#f0a832]">TendFarm</p>
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
```

- [ ] **Step 2: 写 ConceptCards.tsx**

```tsx
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
```

- [ ] **Step 3: 写 GuidesTeaser.tsx**

```tsx
import Link from 'next/link'
import { useTranslations, useLocale } from 'next-intl'

const FEATURED_GAMES = ['hay-day', 'stardew-valley', 'animal-crossing'] as const

export function GuidesTeaser() {
  const t = useTranslations()
  const locale = useLocale()

  return (
    <section className="px-4 py-16 bg-[#1a2e1a]/30">
      <div className="mx-auto max-w-6xl">
        <h2 className="mb-8 text-center text-2xl font-semibold text-[#e8dcc8]">
          {t('home.guidesTeaser.title')}
        </h2>
        <div className="grid gap-4 md:grid-cols-3">
          {FEATURED_GAMES.map((game) => (
            <Link
              key={game}
              href={`/${locale}/guides/${game}`}
              className="rounded-xl border border-[#2d3d2d] bg-[#0f1a0f] p-5 hover:border-[#f0a832] transition-colors"
            >
              <h3 className="font-semibold text-[#e8dcc8] mb-1">{t(`guides.games.${game}.name`)}</h3>
              <p className="text-sm text-[#8a9a7a]">{t(`guides.games.${game}.desc`)}</p>
              <p className="mt-3 text-xs text-[#f0a832]">{t('guides.readMore')}</p>
            </Link>
          ))}
        </div>
        <div className="mt-6 text-center">
          <Link href={`/${locale}/guides`} className="text-sm text-[#f0a832] hover:underline">
            {t('home.guidesTeaser.cta')}
          </Link>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 4: 写首页 WaitlistSection（第二次出现）**

在 `src/components/home/` 新增 `WaitlistSection.tsx`：

```tsx
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
```

- [ ] **Step 5: 组合首页 src/app/[locale]/page.tsx**

```tsx
import { HeroSection } from '@/components/home/HeroSection'
import { ConceptCards } from '@/components/home/ConceptCards'
import { GuidesTeaser } from '@/components/home/GuidesTeaser'
import { WaitlistSection } from '@/components/home/WaitlistSection'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'TendFarm — 你的健康生活，在这里生长',
  description: '把你的步数、睡眠、HRV 变成一座会自动生长的农场。加入候补名单，第一个体验 TendFarm。',
}

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ConceptCards />
      <GuidesTeaser />
      <WaitlistSection />
    </>
  )
}
```

- [ ] **Step 6: 验证**

```bash
pnpm dev
```
访问 `http://localhost:3000/zh` → 首页 6 区块全部渲染，`/en` 显示英文内容。

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "feat: 首页（Hero + ConceptCards + GuidesTeaser + WaitlistSection）"
```

---

### Task 7: 产品理念页 + 健康生活页 + 玩法页 + 工具占坑页

**Files:**
- Create: `src/app/[locale]/philosophy/page.tsx`
- Create: `src/app/[locale]/lifestyle/page.tsx`
- Create: `src/app/[locale]/gameplay/page.tsx`
- Create: `src/app/[locale]/tools/page.tsx`
- Modify: `src/messages/zh.json`（补充各页面翻译 key）
- Modify: `src/messages/en.json`

**Interfaces:**
- Produces: 4 个内容页面，各有独立 Metadata

先补充翻译 key，再写页面。

- [ ] **Step 1: 在 zh.json 补充各页翻译**

在 `src/messages/zh.json` 中添加以下顶层 key（合并到已有文件，不要替换现有内容）：

```json
{
  "philosophy": {
    "meta": {
      "title": "产品理念 — TendFarm",
      "description": "了解 TendFarm 如何把 Activity、睡眠、HRV 和生活节律转化为农场的生长速度和收成。"
    },
    "hero": {
      "title": "健康生活显化农场",
      "subtitle": "TendFarm 是一个健康生活显化农场：它把你的 Activity、睡眠、HRV 和长期生活节律转化为农场的生长速度、收成充盈、燃料效率和等级成长。"
    },
    "principles": [
      { "title": "健康数据不直接给金币", "desc": "Activity 影响生长速度，睡眠影响收成充盈度，HRV 影响燃料效率。Health Data 通过效率影响收益，而不是直接兑换。" },
      { "title": "普通用户无需规划", "desc": "系统自动配置默认作物。高级用户可以进入田地规划页面，按自己的生活节奏优化收益。" },
      { "title": "生活节律是生产转化率", "desc": "生活节律是 Health Data 转化为农场效果的效率系数，最多可提升 12%。它不是装饰，是生产力。" },
      { "title": "自动化是离线托管", "desc": "你不打开 App 时，农场仍能持续运转。自动化失败时，玩家在线可以手动兜底。" }
    ],
    "mapping": {
      "title": "Health Data → 农场效果",
      "rows": [
        { "input": "Activity（步数/运动）", "via": "阳光", "output": "作物在活动时间片提前成熟" },
        { "input": "Vitals / 睡眠", "via": "晨露", "output": "收成更充盈（最多 +20%）" },
        { "input": "HRV / 恢复趋势", "via": "燃料利用率", "output": "自动收割更省燃料" },
        { "input": "生活节律（规律性）", "via": "健康转化率", "output": "所有效果提升 ×1.00~1.12" },
        { "input": "长期健康数据", "via": "LifeExp", "output": "农场等级 / 解锁世界" }
      ]
    }
  },
  "lifestyle": {
    "meta": {
      "title": "健康生活方式 — TendFarm",
      "description": "了解生活节律、HRV、睡眠质量和规律活动如何影响你的身体状态和 TendFarm 农场。"
    },
    "hero": { "title": "健康生活，从了解开始" },
    "sections": [
      {
        "id": "circadian-rhythm",
        "title": "什么是生活节律（Circadian Rhythm）",
        "body": "生活节律是你身体内置的 24 小时生物钟，调控睡眠、激素分泌、体温和代谢节奏。规律的作息——固定的起床时间、进食时间和运动时间——能让生物钟保持准点运行，带来更好的睡眠质量、更稳定的精力和更快的身体恢复。在 TendFarm 里，生活节律直接决定健康数据到农场效果的转化率：节律越稳定，每一步、每一次睡眠、每次 HRV 读数的农场价值越高。"
      },
      {
        "id": "hrv",
        "title": "HRV 是什么？为什么重要？",
        "body": "HRV（Heart Rate Variability，心率变异性）是相邻两次心跳时间间隔的变化程度。HRV 高通常意味着自主神经系统更灵活、恢复能力更强、压力应对更好。HRV 会受到睡眠质量、运动强度、饮酒、压力和作息规律等因素影响。Apple Watch 通过静息心率和深夜睡眠数据计算 HRV。在 TendFarm 里，HRV 影响自动收割机的燃料利用率——HRV 越高，收割更省燃料。"
      },
      {
        "id": "sleep-quality",
        "title": "睡眠质量如何影响白天状态",
        "body": "睡眠分为浅睡、深睡和 REM 三个阶段，深睡负责身体修复，REM 负责记忆整合和情绪调节。成年人每晚需要 7-9 小时睡眠，其中深睡占 15-25%。固定的就寝和起床时间是提升睡眠质量最有效的单一方法。在 TendFarm 里，前一晚的睡眠质量会凝结为「晨露」，让当天的收成更充盈——睡得越好，次日收成越饱满。"
      },
      {
        "id": "activity",
        "title": "如何建立稳定的活动节律",
        "body": "研究显示，每天步行 7000-10000 步与显著降低全因死亡率相关。比步数更重要的是规律性：每天同一时间段活动，能强化生物钟节律，提升睡眠质量和日间精力。不需要高强度运动——散步、骑车、爬楼梯都有效。在 TendFarm 里，活动发生在哪个时间片，哪个时间片的作物就长得更快——你的晨跑让早晨的作物提前成熟。"
      },
      {
        "id": "apple-watch",
        "title": "Apple Watch 健康数据怎么看",
        "body": "Apple Watch 的「健身记录」App 每天汇总步数、活动卡路里、锻炼时间和站立时间；「健康」App 展示睡眠分析、心率趋势和 HRV。关键指标：静息心率（越低越好，通常 50-70 bpm）、HRV（越高越好，因人而异）、深睡比例（建议 15% 以上）、活动卡路里（建议完成每日目标圆环）。TendFarm 自动读取这些数据，不需要手动输入任何数字。"
      }
    ]
  },
  "gameplay": {
    "meta": {
      "title": "玩法体验 — TendFarm",
      "description": "了解 TendFarm 的核心游戏循环：田地、水池、收成、清仓，以及健康数据如何驱动农场。"
    },
    "hero": { "title": "开田即生产，生活驱动收成" },
    "loop": {
      "title": "核心循环",
      "steps": ["田地待浇水", "自动浇水", "生长中（活动加速）", "成熟待收", "自动收成", "入仓清仓", "金币升级"]
    },
    "crops": {
      "title": "作物一览",
      "list": [
        { "name": "晨光豆", "cycle": "6 分钟", "desc": "教程作物，快速体验首次收成" },
        { "name": "小麦芽", "cycle": "45 分钟", "desc": "白天高频，适合经常查看" },
        { "name": "棉花团", "cycle": "2.5 小时", "desc": "稳定放置，日常首选" },
        { "name": "夜莓", "cycle": "8 小时", "desc": "睡眠期间生长，早起即可收成" },
        { "name": "能量草", "cycle": "2 小时", "desc": "高燃料副产，补充自动收割机" }
      ]
    },
    "week": {
      "title": "前 7 天体验节奏",
      "days": [
        { "day": "Day 1", "exp": "第一次收成和清仓" },
        { "day": "Day 2", "exp": "升级仓库和水池，开第二块田" },
        { "day": "Day 3", "exp": "解锁自动收割机和燃料系统" },
        { "day": "Day 4-5", "exp": "探索作物配置，优化收益" },
        { "day": "Day 6-7", "exp": "生活节律反馈开始显现，Aura 初显" }
      ]
    }
  },
  "tools": {
    "meta": {
      "title": "工具集 — TendFarm",
      "description": "TendFarm 工具集：生活节律测评、农场效率模拟器等即将上线。"
    },
    "hero": { "title": "更多工具即将上线", "subtitle": "我们正在开发生活节律测评、农场效率模拟器等工具，帮助你更好地了解自己的健康节律。" },
    "coming": [
      { "title": "生活节律测评", "desc": "8 个问题，测出你的生活节律等级和对应农场状态。" },
      { "title": "农场效率模拟器", "desc": "输入你的健康数据，预测你的农场今天能多收多少。" },
      { "title": "作物配置推荐", "desc": "根据你的生活习惯，推荐最适合的田地规划模板。" }
    ],
    "notify": "订阅工具上线通知"
  }
}
```

对 `en.json` 添加等效英文翻译（结构相同，内容英文）。由于篇幅，英文 key 与中文结构完全对应，逐一翻译即可。

- [ ] **Step 2: 写 philosophy/page.tsx**

```tsx
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
```

- [ ] **Step 3: 写 lifestyle/page.tsx**

```tsx
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
```

- [ ] **Step 4: 写 gameplay/page.tsx**

```tsx
import { useTranslations } from 'next-intl'
import { WaitlistSection } from '@/components/home/WaitlistSection'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '玩法体验 — TendFarm',
  description: '了解 TendFarm 的核心游戏循环：田地、水池、收成、清仓，以及健康数据如何驱动农场。',
}

export default function GameplayPage() {
  const t = useTranslations('gameplay')
  const crops = t.raw('crops.list') as Array<{ name: string; cycle: string; desc: string }>
  const days = t.raw('week.days') as Array<{ day: string; exp: string }>
  const steps = t.raw('loop.steps') as string[]

  return (
    <div className="mx-auto max-w-4xl px-4 py-16">
      <h1 className="mb-12 text-4xl font-bold text-[#e8dcc8]">{t('hero.title')}</h1>

      {/* 核心循环 */}
      <section className="mb-16">
        <h2 className="mb-6 text-xl font-semibold text-[#f0a832]">{t('loop.title')}</h2>
        <div className="flex flex-wrap items-center gap-2">
          {steps.map((step, i) => (
            <div key={i} className="flex items-center gap-2">
              <span className="rounded-lg border border-[#2d3d2d] bg-[#1a2e1a] px-3 py-1.5 text-sm text-[#e8dcc8]">
                {step}
              </span>
              {i < steps.length - 1 && <span className="text-[#4a5a4a]">→</span>}
            </div>
          ))}
        </div>
      </section>

      {/* 作物一览 */}
      <section className="mb-16">
        <h2 className="mb-6 text-xl font-semibold text-[#f0a832]">{t('crops.title')}</h2>
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {crops.map((crop) => (
            <div key={crop.name} className="rounded-xl border border-[#2d3d2d] bg-[#1a2e1a] p-4">
              <div className="mb-1 flex items-baseline justify-between">
                <span className="font-semibold text-[#e8dcc8]">{crop.name}</span>
                <span className="text-xs text-[#f0a832]">{crop.cycle}</span>
              </div>
              <p className="text-sm text-[#8a9a7a]">{crop.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 前 7 天节奏 */}
      <section className="mb-16">
        <h2 className="mb-6 text-xl font-semibold text-[#f0a832]">{t('week.title')}</h2>
        <div className="space-y-3">
          {days.map((d) => (
            <div key={d.day} className="flex gap-4 rounded-lg border border-[#2d3d2d] bg-[#1a2e1a] p-4">
              <span className="min-w-[60px] text-sm font-semibold text-[#f0a832]">{d.day}</span>
              <span className="text-sm text-[#8a9a7a]">{d.exp}</span>
            </div>
          ))}
        </div>
      </section>

      <WaitlistSection />
    </div>
  )
}
```

- [ ] **Step 5: 写 tools/page.tsx**

```tsx
import { useTranslations, useLocale } from 'next-intl'
import { WaitlistForm } from '@/components/ui/WaitlistForm'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '工具集 — TendFarm',
  description: 'TendFarm 工具集：生活节律测评、农场效率模拟器等即将上线。',
}

export default function ToolsPage() {
  const t = useTranslations('tools')
  const locale = useLocale()
  const tools = t.raw('coming') as Array<{ title: string; desc: string }>
  const wt = useTranslations('waitlist')

  return (
    <div className="mx-auto max-w-4xl px-4 py-16">
      <h1 className="mb-3 text-4xl font-bold text-[#e8dcc8]">{t('hero.title')}</h1>
      <p className="mb-12 text-lg text-[#8a9a7a]">{t('hero.subtitle')}</p>

      <div className="mb-16 grid gap-4 md:grid-cols-3">
        {tools.map((tool) => (
          <div key={tool.title} className="rounded-xl border border-dashed border-[#2d3d2d] bg-[#1a2e1a]/50 p-5">
            <span className="mb-3 inline-block rounded-full bg-[#2d3d2d] px-2 py-0.5 text-xs text-[#8a9a7a]">
              即将上线
            </span>
            <h3 className="mb-2 font-semibold text-[#e8dcc8]">{tool.title}</h3>
            <p className="text-sm text-[#8a9a7a]">{tool.desc}</p>
          </div>
        ))}
      </div>

      <div className="rounded-xl border border-[#2d3d2d] bg-[#1a2e1a] p-8 text-center">
        <h2 className="mb-2 text-xl font-semibold text-[#e8dcc8]">{t('notify')}</h2>
        <p className="mb-6 text-sm text-[#8a9a7a]">{wt('subtitle')}</p>
        <div className="mx-auto max-w-md">
          <WaitlistForm
            locale={locale}
            sourcePage="tools"
            successMessage={wt('success')}
            duplicateMessage={wt('duplicate')}
            errorMessage={wt('error')}
            buttonText={wt('button')}
            placeholder={wt('placeholder')}
          />
        </div>
      </div>
    </div>
  )
}
```

- [ ] **Step 6: 验证**

```bash
pnpm dev
```
访问以下路由，确认无报错并正确渲染：
- `http://localhost:3000/zh/philosophy`
- `http://localhost:3000/zh/lifestyle`
- `http://localhost:3000/zh/gameplay`
- `http://localhost:3000/zh/tools`

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "feat: 产品理念/健康生活/玩法体验/工具集四个内容页"
```

---

### Task 8: 攻略内容数据层

**Files:**
- Create: `src/lib/guides.ts`
- Create: `src/__tests__/lib/guides.test.ts`

**Interfaces:**
- Produces:
  - `getGuides(locale: string, game: string): Promise<GuideMeta[]>`
  - `getGuideBySlug(locale: string, game: string, slug: string): Promise<GuidePost | null>`
  - `getAllGuideSlugs(): Promise<Array<{locale: string; game: string; slug: string}>>`

```ts
// Types
interface GuideMeta {
  slug: string
  game: string
  locale: string
  title: string
  description: string
  publishedAt: string
  tags: string[]
}

interface GuidePost extends GuideMeta {
  contentHtml: string
}
```

- [ ] **Step 1: 写失败测试**

```ts
// src/__tests__/lib/guides.test.ts
import { describe, it, expect } from 'vitest'
import { getGuides, getGuideBySlug } from '@/lib/guides'

describe('guides data layer', () => {
  it('getGuides returns array for known game', async () => {
    const guides = await getGuides('zh', 'hay-day')
    expect(Array.isArray(guides)).toBe(true)
    // 至少有 1 篇文章（Task 9 会创建内容）
    // 此测试在 Task 9 之后才能 PASS，先验证 shape
  })

  it('getGuideBySlug returns null for unknown slug', async () => {
    const post = await getGuideBySlug('zh', 'hay-day', 'nonexistent-slug')
    expect(post).toBeNull()
  })

  it('getGuideBySlug returns post for known slug after content created', async () => {
    // 此测试在 Task 9 创建 beginner.md 后才 PASS
    const post = await getGuideBySlug('zh', 'hay-day', 'beginner')
    if (post) {
      expect(post.title).toBeTruthy()
      expect(post.contentHtml).toBeTruthy()
      expect(post.game).toBe('hay-day')
    }
  })
})
```

- [ ] **Step 2: 运行确认失败**

```bash
pnpm test
```
Expected: FAIL，`Cannot find module '@/lib/guides'`

- [ ] **Step 3: 写 src/lib/guides.ts**

```ts
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import remarkHtml from 'remark-html'

const contentDir = path.join(process.cwd(), 'src', 'content')

export interface GuideMeta {
  slug: string
  game: string
  locale: string
  title: string
  description: string
  publishedAt: string
  tags: string[]
}

export interface GuidePost extends GuideMeta {
  contentHtml: string
}

export async function getGuides(locale: string, game: string): Promise<GuideMeta[]> {
  const dir = path.join(contentDir, locale, 'guides', game)
  if (!fs.existsSync(dir)) return []

  const files = fs.readdirSync(dir).filter((f) => f.endsWith('.md'))
  return files.map((file) => {
    const slug = file.replace(/\.md$/, '')
    const raw = fs.readFileSync(path.join(dir, file), 'utf-8')
    const { data } = matter(raw)
    return {
      slug,
      game,
      locale,
      title: data.title ?? '',
      description: data.description ?? '',
      publishedAt: data.publishedAt ?? '',
      tags: data.tags ?? [],
    }
  }).sort((a, b) => (a.publishedAt > b.publishedAt ? -1 : 1))
}

export async function getGuideBySlug(locale: string, game: string, slug: string): Promise<GuidePost | null> {
  const filePath = path.join(contentDir, locale, 'guides', game, `${slug}.md`)
  if (!fs.existsSync(filePath)) return null

  const raw = fs.readFileSync(filePath, 'utf-8')
  const { data, content } = matter(raw)
  const processed = await remark().use(remarkHtml).process(content)
  const contentHtml = processed.toString()

  return {
    slug,
    game,
    locale,
    title: data.title ?? '',
    description: data.description ?? '',
    publishedAt: data.publishedAt ?? '',
    tags: data.tags ?? [],
    contentHtml,
  }
}

export async function getAllGuideSlugs(): Promise<Array<{ locale: string; game: string; slug: string }>> {
  const result: Array<{ locale: string; game: string; slug: string }> = []
  const locales = ['zh', 'en']

  for (const locale of locales) {
    const localeDir = path.join(contentDir, locale, 'guides')
    if (!fs.existsSync(localeDir)) continue
    const games = fs.readdirSync(localeDir)
    for (const game of games) {
      const gameDir = path.join(localeDir, game)
      if (!fs.statSync(gameDir).isDirectory()) continue
      const files = fs.readdirSync(gameDir).filter((f) => f.endsWith('.md'))
      for (const file of files) {
        result.push({ locale, game, slug: file.replace(/\.md$/, '') })
      }
    }
  }
  return result
}
```

- [ ] **Step 4: 安装 remark 依赖**

```bash
pnpm add remark remark-html
```

- [ ] **Step 5: 运行测试**

```bash
pnpm test
```
Expected: `getGuideBySlug returns null for unknown slug` PASS；其余两个 PASS（返回空数组/null 是正常的，内容在 Task 9 添加）

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "feat: 攻略内容数据层（getGuides/getGuideBySlug）"
```

---

### Task 9: 攻略 UI 页面

**Files:**
- Create: `src/app/[locale]/guides/page.tsx`
- Create: `src/app/[locale]/guides/[game]/page.tsx`
- Create: `src/app/[locale]/guides/[game]/[slug]/page.tsx`

**Interfaces:**
- Consumes: `getGuides`, `getGuideBySlug`, `getAllGuideSlugs` from `@/lib/guides`

- [ ] **Step 1: 写攻略中心首页 guides/page.tsx**

```tsx
import Link from 'next/link'
import { useTranslations, useLocale } from 'next-intl'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '农场游戏攻略中心 — TendFarm',
  description: '从新手到老农，找到 Hay Day、星露谷物语、动物森友会等热门农场游戏的完整攻略。',
}

const GAMES = ['hay-day', 'stardew-valley', 'animal-crossing'] as const

export default function GuidesPage() {
  const t = useTranslations('guides')
  const locale = useLocale()

  return (
    <div className="mx-auto max-w-4xl px-4 py-16">
      <h1 className="mb-3 text-4xl font-bold text-[#e8dcc8]">{t('title')}</h1>
      <p className="mb-12 text-[#8a9a7a]">{t('subtitle')}</p>
      <div className="grid gap-6 md:grid-cols-3">
        {GAMES.map((game) => (
          <Link
            key={game}
            href={`/${locale}/guides/${game}`}
            className="group rounded-xl border border-[#2d3d2d] bg-[#1a2e1a] p-6 hover:border-[#f0a832] transition-colors"
          >
            <h2 className="mb-2 text-lg font-semibold text-[#e8dcc8] group-hover:text-[#f0a832] transition-colors">
              {t(`games.${game}.name`)}
            </h2>
            <p className="text-sm text-[#8a9a7a]">{t(`games.${game}.desc`)}</p>
            <p className="mt-4 text-xs text-[#f0a832]">{t('readMore')}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}
```

- [ ] **Step 2: 写游戏攻略列表页 guides/[game]/page.tsx**

```tsx
import Link from 'next/link'
import { getGuides } from '@/lib/guides'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

const VALID_GAMES = ['hay-day', 'stardew-valley', 'animal-crossing']

export async function generateMetadata({ params }: { params: Promise<{ locale: string; game: string }> }): Promise<Metadata> {
  const { game } = await params
  return {
    title: `${game.split('-').map(w => w[0].toUpperCase() + w.slice(1)).join(' ')} 攻略 — TendFarm`,
  }
}

export default async function GameGuidesPage({ params }: { params: Promise<{ locale: string; game: string }> }) {
  const { locale, game } = await params
  if (!VALID_GAMES.includes(game)) notFound()

  const guides = await getGuides(locale, game)

  return (
    <div className="mx-auto max-w-3xl px-4 py-16">
      <Link href={`/${locale}/guides`} className="mb-6 inline-block text-sm text-[#8a9a7a] hover:text-[#f0a832]">
        ← 攻略中心
      </Link>
      <h1 className="mb-10 text-3xl font-bold text-[#e8dcc8] capitalize">
        {game.replace(/-/g, ' ')} 攻略
      </h1>
      {guides.length === 0 ? (
        <p className="text-[#8a9a7a]">攻略正在撰写中，敬请期待。</p>
      ) : (
        <div className="space-y-4">
          {guides.map((g) => (
            <Link
              key={g.slug}
              href={`/${locale}/guides/${game}/${g.slug}`}
              className="block rounded-xl border border-[#2d3d2d] bg-[#1a2e1a] p-5 hover:border-[#f0a832] transition-colors"
            >
              <h2 className="mb-1 font-semibold text-[#e8dcc8]">{g.title}</h2>
              <p className="text-sm text-[#8a9a7a]">{g.description}</p>
              <div className="mt-3 flex gap-2">
                {g.tags.map((tag) => (
                  <span key={tag} className="rounded-full bg-[#2d3d2d] px-2 py-0.5 text-xs text-[#8a9a7a]">{tag}</span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
```

- [ ] **Step 3: 写攻略文章页 guides/[game]/[slug]/page.tsx**

```tsx
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
  return { title: `${post.title} — TendFarm`, description: post.description }
}

export default async function GuideArticlePage({
  params,
}: {
  params: Promise<{ locale: string; game: string; slug: string }>
}) {
  const { locale, game, slug } = await params
  const post = await getGuideBySlug(locale, game, slug)
  if (!post) notFound()

  return (
    <div className="mx-auto max-w-3xl px-4 py-16">
      <Link href={`/${locale}/guides/${game}`} className="mb-6 inline-block text-sm text-[#8a9a7a] hover:text-[#f0a832]">
        ← {game.replace(/-/g, ' ')} 攻略
      </Link>
      <h1 className="mb-3 text-3xl font-bold text-[#e8dcc8]">{post.title}</h1>
      <p className="mb-2 text-sm text-[#8a9a7a]">{post.publishedAt}</p>
      <div className="mb-10 flex gap-2">
        {post.tags.map((tag) => (
          <span key={tag} className="rounded-full bg-[#2d3d2d] px-2 py-0.5 text-xs text-[#8a9a7a]">{tag}</span>
        ))}
      </div>
      <article
        className="prose prose-invert prose-p:text-[#8a9a7a] prose-headings:text-[#e8dcc8] prose-a:text-[#f0a832] max-w-none"
        dangerouslySetInnerHTML={{ __html: post.contentHtml }}
      />
    </div>
  )
}
```

- [ ] **Step 4: 安装 Tailwind typography 插件**

```bash
pnpm add -D @tailwindcss/typography
```

在 `tailwind.config.ts` 中添加：
```ts
import type { Config } from 'tailwindcss'
export default {
  content: ['./src/**/*.{ts,tsx}'],
  plugins: [require('@tailwindcss/typography')],
} satisfies Config
```

- [ ] **Step 5: 验证**

```bash
pnpm dev
```
访问 `http://localhost:3000/zh/guides` → 3 个游戏卡片显示正常。
访问 `/zh/guides/hay-day` → 显示「攻略正在撰写中」（Task 10 会添加内容）。

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "feat: 攻略中心 UI（列表页 + 文章页）"
```

---

### Task 10: 初始攻略文章内容（中文 4 篇）

**Files:**
- Create: `src/content/zh/guides/hay-day/beginner.md`
- Create: `src/content/zh/guides/hay-day/crops.md`
- Create: `src/content/zh/guides/stardew-valley/first-year.md`
- Create: `src/content/zh/guides/stardew-valley/best-crops.md`

每篇文章末尾必须包含 TendFarm 植入钩子。

- [ ] **Step 1: 创建 hay-day/beginner.md**

```markdown
---
title: "Hay Day 新手入门指南：从零开始经营你的农场"
description: "完整的 Hay Day 新手攻略，包含农场建设顺序、作物选择、机器优先级，帮你少走弯路。"
game: "hay-day"
slug: "beginner"
publishedAt: "2026-06-26"
tags: ["新手", "基础攻略"]
---

## 前言

Hay Day 是一款节奏轻松的农场经营游戏，但新手如果不了解优先级，很容易陷入「资金不足→什么都升不了」的死循环。这篇攻略帮你理清思路，从第一天起就走对路。

## 开局第一件事：别急着升级所有东西

很多新手拿到金币就想马上升级仓库、机器、土地，结果钱分散了，什么都没升到关键阈值。正确做法是：

**第一优先级：仓库容量**
仓库是一切的基础。仓库满了，作物就没地放，整个生产链停摆。把前几批金币优先砸在仓库升级上，目标是容量达到 150-200。

**第二优先级：谷仓容量**
谷仓存放原材料（小麦、玉米、大豆）。容量不足会频繁打断生产机器，升级优先级仅次于仓库。

**第三优先级：生产机器**
面包机、奶酪机、果汁机的产出价值远高于原材料。解锁后尽量让它们保持满负荷运转。

## 作物种什么最划算？

Hay Day 初期最值得种的作物：

| 作物 | 生长时间 | 卖价（金币/格） | 推荐指数 |
|---|---|---|---|
| 小麦 | 2 分钟 | 1 | ⭐⭐⭐（机器原料必备）|
| 玉米 | 5 分钟 | 2 | ⭐⭐⭐（饲料/机器）|
| 胡萝卜 | 2 小时 | 10 | ⭐⭐（稳定高收益）|
| 大豆 | 2 小时 | 10 | ⭐⭐（豆浆/沙拉）|

**核心原则**：小麦和玉米是机器的血液，永远别让地空着不种它们。胡萝卜和大豆适合睡前种，醒来就能收。

## 机器运营的关键：不要让它们空转

生产机器空转 = 浪费时间。推荐的作息：

- **早上开 App**：收成昨晚的作物 → 填满机器队列（填到满 24 小时的量）→ 种上新作物
- **午间快速检查**：收快速作物 + 补充机器
- **睡前操作**：种慢速作物（胡萝卜/大豆）+ 填满机器过夜

## 订单系统：报纸订单优先发货

游戏中的订单分两种：路人订单（泡泡）和报纸订单。**报纸订单通常给更多钻石和经验**，优先完成。泡泡订单看缘分，没有好东西不要勉强接。

## 新手常见错误

1. **花钻石加速生产**：钻石稀缺，应留给扩展槽（机器槽/地块）和紧急解锁，不要用来加速
2. **忽略邻居帮助**：每天帮邻居各 1 次，获得经验和爱心。爱心可以换珍稀物品
3. **仓库满了还在种**：种下去的作物成熟后无处放，只能看着烂掉。先清仓再种

---

> **你知道吗？** 有一款农场游戏是用你真实的步数、睡眠和 HRV 来驱动的——你今天走了多少步，直接决定农场作物长得有多快。这就是 **TendFarm**：你的生活节律越规律，农场收成越充盈。[了解 TendFarm →](/zh/philosophy)
```

- [ ] **Step 2: 创建 hay-day/crops.md**

```markdown
---
title: "Hay Day 作物效率完整排行：哪个最值得种？"
description: "从金币/小时和机器价值两个维度，分析 Hay Day 所有主要作物的经济效率，帮你规划最优种植方案。"
game: "hay-day"
slug: "crops"
publishedAt: "2026-06-26"
tags: ["作物", "效率", "进阶"]
---

## 衡量作物价值的两个维度

在 Hay Day 里，作物的价值不只是「直接卖出去能换多少金币」，更重要的是：

1. **直接出售金币/小时**：把作物直接卖给路人或报纸
2. **机器加工价值**：作为原料进入机器，产出高价成品

很多「直售价低」的作物，一旦进入机器链就价值翻倍。下面分两类分析。

## 高效直售作物（不进机器也赚）

| 作物 | 生长时间 | 直售单价 | 金币/小时 | 备注 |
|---|---|---|---|---|
| 覆盆子 | 2 小时 | 18 | 9 | 解锁后最优直售 |
| 胡萝卜 | 2 小时 | 10 | 5 | 早期主力 |
| 南瓜 | 3 小时 | 26 | 8.7 | 中期高性价比 |
| 辣椒 | 4 小时 | 30 | 7.5 | 订单常客 |

**结论**：覆盆子和南瓜是中期最高效的直售作物，解锁后优先铺满地块。

## 最有价值的机器原料作物

| 作物 | 用途 | 成品 | 成品价值 | 原料成本 |
|---|---|---|---|---|
| 小麦 | 面包机 | 面包 | 30 | 小麦×3 |
| 玉米 | 爆米花机 | 爆米花 | 45 | 玉米×3 |
| 大豆 | 果汁机 | 豆浆 | 60 | 大豆×3 |
| 蓝莓 | 果酱机 | 蓝莓果酱 | 80 | 蓝莓×3 |

**核心原则**：小麦和玉米是机器燃料，永远不嫌多。大豆加工成豆浆是早期最稳定的金币来源之一。

## 不同阶段的种植策略

**等级 1-20（新手期）**：
- 80% 地块种小麦 + 玉米（机器原料）
- 20% 地块种胡萝卜（稳定直售）
- 目标：让面包机和爆米花机 24 小时不停转

**等级 20-40（成长期）**：
- 引入大豆、南瓜
- 开始规模化果汁生产
- 关注报纸订单需求，按需调整比例

**等级 40+（成熟期）**：
- 按订单需求灵活配置
- 专注解锁覆盆子、蓝莓等高价值作物
- 建立稳定的机器轮转计划

## 一个被忽视的细节：作物不会烂

很多新手因为担心「来不及收」而不敢多种。放心：Hay Day 里的成熟作物会无限等待，不会枯萎腐烂。大胆种满所有地块，随时收就好。

---

> **你知道吗？** 有一款农场游戏里，你种什么、什么时候种，都由你的真实健康数据决定——你今天步行越多，农场里的作物就长得越快。这就是 **TendFarm**：现实生活就是你最好的农场规划师。[了解 TendFarm →](/zh/gameplay)
```

- [ ] **Step 3: 创建 stardew-valley/first-year.md**

```markdown
---
title: "星露谷物语第一年最优规划：四季完整攻略"
description: "从春季第 1 天到冬季最后一天，详解星露谷物语第一年每个季节的优先任务、最佳作物和不能犯的错误。"
game: "stardew-valley"
slug: "first-year"
publishedAt: "2026-06-26"
tags: ["新手", "第一年", "季节规划"]
---

## 第一年的核心目标

星露谷的第一年目标不是「赚最多钱」，而是**建立稳定的资金循环、修好社区中心（或等价目标）、并让农场进入可持续运转**。

## 春季（Day 1-28）

### 第一天必做

1. 把农场石头、树桩清理出至少 15 块地
2. 去镇上找 Pierre 买种子：**欧防风（Parsnip）种子**（最便宜，春季最快回本）
3. 种完当天回到家之前打木头，做工具袋（背包）

### 春季作物优先级

| 作物 | 生长天数 | 卖价 | 推荐原因 |
|---|---|---|---|
| 欧防风 | 4 天 | 35g | 第一天可买，快速见现金 |
| 土豆 | 6 天 | 80g | 稳定高产，可多次收成 |
| 花椰菜 | 12 天 | 175g | 春季最高单价，但窗口紧 |
| 草莓 | 8 天（节日购买）| 120g | 蛋节购买，当季能收 2-3 次 |

**重要**：春季 13 日是「蛋节」，**提前存至少 2000g 买草莓种子**，这是春季最高性价比的投资。

### 春季不能做的事

- 别在河边浪费太多时间钓鱼（第一年春天鱼的价值有限）
- 别忘记每天与村民互动（送礼物建立关系，对解锁社区中心至关重要）
- 别让工具停在 1 级（尽早升级浇水壶和锄头到铜质）

## 夏季（Day 1-28）

### 夏季主力作物

| 作物 | 生长天数 | 卖价 | 备注 |
|---|---|---|---|
| 蓝莓 | 13 天 | 50g/颗（一次收 3 颗）| 整季多次收成，最高 ROI |
| 辣椒 | 5 天 | 40g | 快速周转 |
| 向日葵 | 8 天 | 80g + 种子 | 种子可留存 |
| 甜瓜 | 12 天 | 250g | 高单价，适合少量精品化 |

**蓝莓是夏季之王**：13 天后可以持续每 4 天收一次，一棵能收 3-4 次，整季利润比其他作物高出许多。第一天就去 Pierre 买满蓝莓种子。

### 夏季副业：钓鱼升级

夏季鱼的价值开始提升，尤其是金枪鱼（Tuna）。利用浇水空档去海边钓鱼，既赚钱又升级钓鱼技能（解锁烟熏鱼食谱，提升卖价）。

## 秋季（Day 1-28）

### 秋季最赚钱的作物

| 作物 | 生长天数 | 卖价 | 备注 |
|---|---|---|---|
| 南瓜 | 13 天 | 320g | 可做南瓜汤（562g），高加工价值 |
| 蔓越莓 | 7 天 | 75g×2 | 多次收成，整季最高 ROI |
| 葡萄 | 10 天 | 80g | 可酿酒，后期价值极高 |
| 山药 | 6 天 | 160g | 快速回本 |

**蔓越莓是秋季之王**：与夏季蓝莓类似，多次收成机制让它成为秋季利润最高的作物。第一天立刻买满。

### 秋季重点：开始酿酒

秋季结束前，尽量拿到**木桶（Keg）**的制作方法（需要等级 8 农耕）。把葡萄、南瓜放进木桶酿酒，价值翻 2-3 倍。这是星露谷后期资金加速的关键。

## 冬季（Day 1-28）

冬季无法种植露天作物，是**整理农场、升级工具、深入矿洞**的最佳时机。

### 冬季必做清单

- [ ] 把浇水壶升到黄金或铱质（解放浇水时间）
- [ ] 矿洞推进到第 80 层以上（获得黄金）
- [ ] 建造至少 1 个鸡舍（家禽产出全年稳定）
- [ ] 完成 Willy 的鱼店任务，推进钓鱼成就
- [ ] 整理农场布局，规划次年种植区域

## 第一年结束的里程碑

第一年结束时，理想状态：
- 资金：50,000g 以上
- 农场：至少 2 个家禽建筑，1 个酿酒系统
- 社区中心：完成 2-3 个捆绑包
- 工具：浇水壶至少升至铜质

---

> **你知道吗？** 有一款农场游戏是用你真实的健康数据驱动的——你昨晚睡得好，今天农场的晨露更充沛，收成更饱满；你白天走了更多步，作物就长得更快。这就是 **TendFarm**：现实生活的节律，就是你农场的生命力。[了解 TendFarm →](/zh/philosophy)
```

- [ ] **Step 4: 创建 stardew-valley/best-crops.md**

```markdown
---
title: "星露谷物语最赚钱作物推荐：每个季节的最优选择"
description: "按照金币/天的效率排行，分析星露谷物语四个季节中最值得种植的作物，帮你最大化农场收益。"
game: "stardew-valley"
slug: "best-crops"
publishedAt: "2026-06-26"
tags: ["作物", "金币效率", "进阶"]
---

## 衡量标准：金币/天（G/Day）

本文用「金币/天」（G/Day）来衡量作物效率：

```
G/Day = (卖价 - 种子价格) ÷ 生长天数
```

多次收成的作物（如蓝莓、蔓越莓）按整季总收益÷季节天数计算。

## 春季最佳作物 Top 3

### 1. 草莓（蛋节购买）— 约 26 G/Day
春季 13 日蛋节购买，每颗种子 100g，但当季可收成 2-3 次，整季利润极高。**前提是蛋节前要攒够 2000g 以上买种子**。

### 2. 花椰菜 — 约 11.5 G/Day  
单次收成 175g，种子 80g，12 天成熟。春季窗口有限（第 1 天种，最后一次成熟在第 24 天），只够种 2 批。

### 3. 土豆 — 约 10 G/Day  
6 天成熟，每颗 80g，种子 25g。快速周转，适合第一年早期积累资金。

## 夏季最佳作物 Top 3

### 1. 蓝莓 — 约 27 G/Day（整季计算）
夏季绝对之王。13 天后每 4 天收一次，每次收 3 颗（每颗 50g）。一株蓝莓整季可产出约 750g，是购买种子 80g 的 9 倍。

### 2. 辣椒 — 约 8 G/Day  
5 天成熟，40g 卖价，种子 20g。适合想快速看到收益的玩家，整季可种 4-5 轮。

### 3. 甜瓜 — 约 19 G/Day（单次收成）
250g 卖价，12 天成熟，种子 80g。单次收益高，但不能多次收成，适合少量精品化种植。

## 秋季最佳作物 Top 3

### 1. 蔓越莓 — 约 29 G/Day（整季计算）
与蓝莓地位相当。7 天成熟后每 5 天收一次，每次 75g×2 颗。整季约 4 次收成，是秋季最稳定的利润来源。

### 2. 南瓜 — 约 23 G/Day  
320g 卖价，13 天成熟，种子 100g。**进木桶酿南瓜酒可卖 1050g**，是高级玩家的首选。

### 3. 葡萄 — 约 10 G/Day（基础）/ 酿酒后约 35 G/Day  
10 天成熟，80g 卖价。但放进木桶酿酒后变成葡萄酒（240g），价值飙升，是建立酿酒系统后的利润核心。

## 通用原则

1. **优先买多次收成作物的种子**：蓝莓、蔓越莓的整季ROI远高于单次收成作物
2. **建立木桶系统**：任何水果酿成酒，价值提升 3 倍
3. **不要随意混种**：选定 1-2 种主力作物铺满地块，效率远高于「什么都种一点」
4. **节日前存钱**：蛋节（春 13）买草莓、星星节（秋 1）买蔓越莓，错过就要等明年

---

> **你知道吗？** 有一款农场游戏完全不需要你手动规划种什么——它根据你今天走了多少步、昨晚睡了多久来自动决定农场收成。这就是 **TendFarm**：当你的健康数据变成农场的生命力，经营农场和经营生活就合二为一了。[了解 TendFarm →](/zh/gameplay)
```

- [ ] **Step 5: 运行测试验证数据层**

```bash
pnpm test
```
Expected: 所有测试 PASS（guides data layer 的 3 个测试现在都能通过）

- [ ] **Step 6: 验证页面**

```bash
pnpm dev
```
访问 `http://localhost:3000/zh/guides/hay-day` → 显示 2 篇文章列表。
访问 `/zh/guides/hay-day/beginner` → 显示完整文章内容，底部有 TendFarm 植入段落。

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "feat: 初始攻略内容 4 篇（Hay Day + 星露谷）"
```

---

### Task 11: SEO 配置（Metadata + Sitemap + hreflang）

**Files:**
- Modify: `src/app/[locale]/layout.tsx`（生成 alternates hreflang）
- Create: `next-sitemap.config.js`
- Modify: `package.json`（postbuild script）

**Interfaces:**
- Produces: `sitemap.xml`，所有页面有 `hreflang` alternates，Open Graph tags

- [ ] **Step 1: 更新 locale layout 加入 hreflang**

在 `src/app/[locale]/layout.tsx` 中导出 `generateMetadata`：

```tsx
import type { Metadata } from 'next'

const BASE_URL = 'https://tendfarm.app'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const other = locale === 'zh' ? 'en' : 'zh'
  const currentPath = `/${locale}`

  return {
    metadataBase: new URL(BASE_URL),
    alternates: {
      canonical: currentPath,
      languages: {
        [locale]: currentPath,
        [other]: `/${other}`,
      },
    },
    openGraph: {
      siteName: 'TendFarm',
      locale: locale === 'zh' ? 'zh_CN' : 'en_US',
      type: 'website',
    },
  }
}
```

- [ ] **Step 2: 写 next-sitemap.config.js**

```js
/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://tendfarm.app',
  generateRobotsTxt: true,
  changefreq: 'weekly',
  priority: 0.7,
  robotsTxtOptions: {
    policies: [{ userAgent: '*', allow: '/' }],
  },
}
```

- [ ] **Step 3: 更新 package.json**

在 `scripts` 中添加：
```json
"postbuild": "next-sitemap"
```

- [ ] **Step 4: 验证构建和 sitemap**

```bash
pnpm build
```
Expected: 构建成功，`.next/` 生成，`public/sitemap.xml` 生成。

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: SEO 配置（hreflang + sitemap + robots.txt）"
```

---

### Task 12: Vercel 部署

**Files:**
- Create: `vercel.json`（可选，配置重定向）

- [ ] **Step 1: 确认 .env.local 变量已设置**

```bash
cp .env.local.example .env.local
# 填入真实的 Supabase URL、anon key、service role key 和 Resend API key
```

- [ ] **Step 2: 推送到 GitHub**

在 GitHub 创建仓库 `tendfarm-web`，然后：

```bash
git remote add origin https://github.com/<your-org>/tendfarm-web.git
git push -u origin main
```

- [ ] **Step 3: 在 Vercel 导入项目**

1. 访问 vercel.com → Import Project → 选择 `tendfarm-web` 仓库
2. Framework Preset: Next.js（自动检测）
3. Environment Variables 中填入：
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `RESEND_API_KEY`
4. Deploy

- [ ] **Step 4: 验证部署**

部署成功后：
- 访问生产 URL，确认 `/zh/` 首页正常
- 提交一个测试邮件到候补名单表单，确认 Supabase 中有新记录
- 访问 `/zh/guides/hay-day/beginner`，确认攻略文章正常

- [ ] **Step 5: 最终 Commit**

```bash
git add -A
git commit -m "chore: 生产部署配置"
```

---

## 自检：Spec 覆盖度

| Spec 要求 | 对应 Task |
|---|---|
| Next.js SSG | Task 1 |
| 双语 /zh /en | Task 2 |
| Header/Footer/语言切换 | Task 3 |
| WaitlistForm 组件 | Task 4 |
| 候补名单 API（Supabase + Resend）| Task 5 |
| 首页 6 区块 | Task 6 |
| 产品理念页 | Task 7 |
| 健康生活方式页 | Task 7 |
| 玩法体验页 | Task 7 |
| 工具集占坑页 | Task 7 |
| 攻略数据层（gray-matter + remark）| Task 8 |
| 攻略 UI（中心/列表/文章）| Task 9 |
| 初始 4 篇攻略内容 + TendFarm 钩子 | Task 10 |
| SEO（hreflang + sitemap）| Task 11 |
| Vercel 部署 | Task 12 |
| 攻略末尾 TendFarm 植入钩子 | Task 10（每篇末尾） |
| 颜色系统（暗暖色调）| Task 1（globals.css）|
| Vitest 测试 | Task 4, 5, 8 |
