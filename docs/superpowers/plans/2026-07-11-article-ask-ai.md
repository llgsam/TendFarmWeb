# 文章页 Ask-AI 交接 + 相关工具入口 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 在 best-games 分类文章页正文后注入一个「继续探索」区块——动态生成的 Ask-AI 交接 prompt（deep-link 到 ChatGPT/Claude + 复制）和按检测游戏自动匹配的相关工具入口。

**Architecture:** 服务端纯函数（`src/lib/article-ai.ts`）根据文章内容检测游戏、生成本地化 prompt 与工具列表；客户端岛组件（`src/components/tools/ArticleAskAI.tsx`）渲染出口并处理复制/deep-link；服务端文章页把生成结果作为 props 传入。

**Tech Stack:** Next.js App Router（server + client components）、TypeScript、Vitest + @testing-library/react（jsdom）、Tailwind（深绿农场主题）。

## Global Constraints

- 6 语言 locale：`zh`、`zh-TW`、`ja`、`ko`、`de`、`en`；locale 缺失/未知一律回退 `en`。
- 不修改任何文章 frontmatter 或 `src/content/**` 内容文件。
- 不改动现有 per-game calculator cross-link（`guides/[game]/[slug]/page.tsx` 中 `game === 'hay-day' || 'stardew-valley'` 分支保持原样）。
- 新区块仅对 `game === 'best-games'` 文章渲染。
- prompt 全文长度上限 **1000 字符**；超长时截断 `description`。
- prompt 中点名游戏最多 **3** 个，多余省略。
- deep-link：ChatGPT = `https://chatgpt.com/?q=<encodeURIComponent(prompt)>`；Claude = `https://claude.ai/new?q=<encodeURIComponent(prompt)>`；Gemini 由「复制」覆盖，不做 deep-link。
- 配色沿用：`#0f1a0f` / `#1a2e1a` / `#2d3d2d` 边框 / `#f0a832` 强调 / `#e8dcc8` 文字 / `#8a9a7a` 弱化。
- 测试置于 `src/__tests__/`（禁止与源码同目录）。
- 不留 `console.log`；不可变写法。
- 每个任务结束提交一次。

---

### Task 1: 游戏名录 + `detectGames`

**Files:**
- Create: `src/lib/article-ai.ts`
- Test: `src/__tests__/lib/article-ai.test.ts`

**Interfaces:**
- Consumes: `GuidePost` 的字段子集（`title`、`description`、`tags`、`contentHtml`）来自 `src/lib/guides.ts`。
- Produces:
  - `type LocMap = { zh: string; 'zh-TW': string; ja: string; ko: string; de: string; en: string }`
  - `interface ToolLink { label: LocMap; href: string }`
  - `interface GameEntry { id: string; display: LocMap; names: string[]; tools: ToolLink[] }`
  - `const GAMES: GameEntry[]`
  - `type DetectInput = Pick<GuidePost, 'title' | 'description' | 'tags' | 'contentHtml'>`
  - `function detectGames(post: DetectInput): string[]` — 返回命中的 `GameEntry.id`，按 `GAMES` 顺序去重。

- [ ] **Step 1: Write the failing test**

`src/__tests__/lib/article-ai.test.ts`:

```ts
import { describe, it, expect } from 'vitest'
import { detectGames, GAMES } from '@/lib/article-ai'

const base = { title: '', description: '', tags: [] as string[], contentHtml: '' }

describe('detectGames', () => {
  it('detects a game named in the title', () => {
    expect(detectGames({ ...base, title: 'Hay Day vs Stardew Valley' }))
      .toEqual(['stardew', 'hay-day'].filter((id) => ['stardew', 'hay-day'].includes(id)))
  })

  it('is case-insensitive and scans body html', () => {
    expect(detectGames({ ...base, contentHtml: '<p>we love stardew valley here</p>' }))
      .toContain('stardew')
  })

  it('detects localized aliases', () => {
    expect(detectGames({ ...base, title: '星露谷物语最佳作物' })).toContain('stardew')
  })

  it('detects games from tags', () => {
    expect(detectGames({ ...base, tags: ['animal-crossing', 'comparison'] })).toContain('animal-crossing')
  })

  it('returns [] when no known game appears', () => {
    expect(detectGames({ ...base, title: 'Best cozy games for autumn' })).toEqual([])
  })

  it('dedupes and preserves GAMES order', () => {
    const ids = detectGames({ ...base, title: 'Palia', contentHtml: 'Stardew Valley and Palia and stardew valley' })
    expect(ids).toEqual([...new Set(ids)])
    expect(ids.indexOf('stardew')).toBeLessThan(ids.indexOf('palia'))
  })

  it('every GAMES entry has a stable id and en display', () => {
    for (const g of GAMES) {
      expect(g.id).toMatch(/^[a-z-]+$/)
      expect(g.display.en.length).toBeGreaterThan(0)
    }
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/__tests__/lib/article-ai.test.ts`
Expected: FAIL —「Cannot find module '@/lib/article-ai'」。

- [ ] **Step 3: Write minimal implementation**

`src/lib/article-ai.ts`:

```ts
import type { GuidePost } from './guides'

export type LocMap = { zh: string; 'zh-TW': string; ja: string; ko: string; de: string; en: string }

export interface ToolLink {
  label: LocMap
  href: string
}

export interface GameEntry {
  id: string
  display: LocMap
  names: string[] // detection aliases (any language / slug form), matched case-insensitively
  tools: ToolLink[]
}

const T = (zh: string, zhTW: string, ja: string, ko: string, de: string, en: string): LocMap => ({
  zh,
  'zh-TW': zhTW,
  ja,
  ko,
  de,
  en,
})

export const GAMES: GameEntry[] = [
  {
    id: 'stardew',
    display: T('星露谷物语', '星露谷物語', 'スターデューバレー', '스타듀 밸리', 'Stardew Valley', 'Stardew Valley'),
    names: ['stardew valley', 'stardew', '星露谷物语', '星露谷物語', 'スターデューバレー', '스타듀 밸리', 'stardew-valley'],
    tools: [
      { href: 'tools/stardew', label: T('作物利润计算器', '作物利潤計算器', '作物利益計算機', '작물 수익 계산기', 'Ernte-Gewinnrechner', 'Crop Profit Calculator') },
      { href: 'tools/stardew-gifts', label: T('送礼查询', '送禮查詢', '贈り物ガイド', '선물 가이드', 'Geschenke-Finder', 'Gift Finder') },
      { href: 'tools/stardew-fish', label: T('鱼类查询', '魚類查詢', '釣り図鑑', '물고기 도감', 'Fisch-Finder', 'Fish Finder') },
      { href: 'tools/stardew-calendar', label: T('日历', '日曆', 'カレンダー', '달력', 'Kalender', 'Calendar') },
    ],
  },
  {
    id: 'hay-day',
    display: T('Hay Day', 'Hay Day', 'Hay Day', 'Hay Day', 'Hay Day', 'Hay Day'),
    names: ['hay day', 'hay-day', 'hayday'],
    tools: [
      { href: 'tools/hay-day', label: T('作物利润计算器', '作物利潤計算器', '作物利益計算機', '작물 수익 계산기', 'Ernte-Gewinnrechner', 'Crop Profit Calculator') },
    ],
  },
  {
    id: 'palia',
    display: T('Palia', 'Palia', 'Palia', 'Palia', 'Palia', 'Palia'),
    names: ['palia'],
    tools: [],
  },
  {
    id: 'coral-island',
    display: T('珊瑚岛', '珊瑚島', 'コーラルアイランド', '코럴 아일랜드', 'Coral Island', 'Coral Island'),
    names: ['coral island', 'coral-island'],
    tools: [],
  },
  {
    id: 'animal-crossing',
    display: T('动物森友会', '動物森友會', 'あつまれ どうぶつの森', '모여봐요 동물의 숲', 'Animal Crossing', 'Animal Crossing'),
    names: ['animal crossing', 'animal-crossing', 'どうぶつの森', '动物森友会', '動物森友會', '동물의 숲', 'acnh'],
    tools: [],
  },
  {
    id: 'dreamlight-valley',
    display: T('梦幻星谷', '夢幻星谷', 'ドリームライトバレー', '드림라이트 밸리', 'Dreamlight Valley', 'Disney Dreamlight Valley'),
    names: ['dreamlight valley', 'dreamlight-valley', 'disney dreamlight'],
    tools: [],
  },
]

export type DetectInput = Pick<GuidePost, 'title' | 'description' | 'tags' | 'contentHtml'>

export function detectGames(post: DetectInput): string[] {
  const haystack = [post.title, post.description, ...(post.tags ?? []), post.contentHtml]
    .join(' \n ')
    .toLowerCase()
  return GAMES.filter((g) => g.names.some((n) => haystack.includes(n.toLowerCase()))).map((g) => g.id)
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run src/__tests__/lib/article-ai.test.ts`
Expected: PASS（全部 detectGames 用例通过）。

- [ ] **Step 5: Commit**

```bash
git add src/lib/article-ai.ts src/__tests__/lib/article-ai.test.ts
git commit -m "feat(article-ai): game roster + detectGames"
```

---

### Task 2: `buildArticleHandoff`（prompt 模板 + 工具列表）

**Files:**
- Modify: `src/lib/article-ai.ts`
- Test: `src/__tests__/lib/article-ai.test.ts`（追加）

**Interfaces:**
- Consumes: Task 1 的 `GAMES`、`detectGames`、`LocMap`、`GameEntry`；`GuidePost`。
- Produces:
  - `const MAX_PROMPT_LEN = 1000`
  - `const MAX_GAMES_NAMED = 3`
  - `interface Handoff { prompt: string; tools: { label: string; href: string }[] }`
  - `function pickLoc(map: LocMap, locale: string): string`
  - `function buildArticleHandoff(post: Pick<GuidePost,'title'|'description'|'tags'|'contentHtml'>, locale: string): Handoff`

- [ ] **Step 1: Write the failing test**

追加到 `src/__tests__/lib/article-ai.test.ts`:

```ts
import { buildArticleHandoff } from '@/lib/article-ai'

describe('buildArticleHandoff', () => {
  const post = {
    title: 'Hay Day vs Stardew Valley',
    description: 'A comparison of two farming games.',
    tags: ['comparison'],
    contentHtml: '<p>Stardew Valley and Hay Day</p>',
  }

  it('names detected games (max 3) and includes their tools', () => {
    const { prompt, tools } = buildArticleHandoff(post, 'en')
    expect(prompt).toContain('Stardew Valley')
    expect(prompt).toContain('Hay Day')
    expect(tools.map((t) => t.href)).toContain('tools/stardew')
    expect(tools.map((t) => t.href)).toContain('tools/hay-day')
  })

  it('names at most 3 detected games in the prompt clause', () => {
    const many = {
      title: 'The best farming games ranked',
      description: '', tags: [] as string[],
      contentHtml: 'Stardew Valley, Hay Day, Palia, Coral Island and Animal Crossing are all here.',
    }
    const { prompt } = buildArticleHandoff(many, 'en')
    // Detection order (GAMES order) → first 3 named: Stardew, Hay Day, Palia.
    // Games go in the body (where detection happens); title stays neutral so the
    // prompt names games only via the clause, never by leaking through the title.
    expect(prompt).toContain('Palia')
    expect(prompt).not.toContain('Coral Island')
    expect(prompt).not.toContain('Animal Crossing')
  })

  it('localizes the prompt to zh', () => {
    const { prompt } = buildArticleHandoff(post, 'zh')
    expect(prompt).toContain('帮我决定哪款最适合我')
    expect(prompt).toContain('《Hay Day vs Stardew Valley》')
  })

  it('falls back to en for unknown locale', () => {
    const { prompt } = buildArticleHandoff(post, 'xx')
    expect(prompt).toContain('Help me decide')
  })

  it('omits the games clause and tools when no game detected', () => {
    const none = { title: 'Best cozy games', description: 'Nice list.', tags: [], contentHtml: '' }
    const { prompt, tools } = buildArticleHandoff(none, 'en')
    expect(tools).toEqual([])
    expect(prompt).toContain('Help me decide')
    expect(prompt).not.toContain('It compares')
  })

  it('keeps prompt under the length cap by truncating description', () => {
    const long = { title: 'T', description: 'x'.repeat(5000), tags: [], contentHtml: '' }
    const { prompt } = buildArticleHandoff(long, 'en')
    expect(prompt.length).toBeLessThanOrEqual(1000)
  })

  it('dedupes tool hrefs', () => {
    const { tools } = buildArticleHandoff(post, 'en')
    const hrefs = tools.map((t) => t.href)
    expect(hrefs).toEqual([...new Set(hrefs)])
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/__tests__/lib/article-ai.test.ts`
Expected: FAIL —「buildArticleHandoff is not a function」。

- [ ] **Step 3: Write minimal implementation**

在 `src/lib/article-ai.ts` 末尾追加：

```ts
export const MAX_PROMPT_LEN = 1000
export const MAX_GAMES_NAMED = 3

export interface Handoff {
  prompt: string
  tools: { label: string; href: string }[]
}

export function pickLoc(map: LocMap, locale: string): string {
  return (map as Record<string, string>)[locale] ?? map.en
}

// Localized templates. `{title}` / `{desc}` / `{games}` are filled in.
// `{games}` is a full sentence (with leading space) or '' when no game detected.
const TEMPLATES: Record<string, (title: string, desc: string, games: string) => string> = {
  en: (title, desc, games) =>
    `I just read '${title}' on Farm Game Hub — ${desc}${games} Help me decide which one fits me: ask me a few quick questions about how I play (solo vs co-op, platform, session length, what I enjoy most), then give a personalized pick with your reasoning.`,
  zh: (title, desc, games) =>
    `我刚在 Farm Game Hub 读了《${title}》——${desc}${games}帮我决定哪款最适合我：先问我几个游戏习惯的问题（单机/联机、平台、时长、最看重什么），再给一份带理由的个性化推荐。`,
  'zh-TW': (title, desc, games) =>
    `我剛在 Farm Game Hub 讀了《${title}》——${desc}${games}幫我決定哪款最適合我：先問我幾個遊戲習慣的問題（單機/連線、平台、時長、最看重什麼），再給一份帶理由的個人化推薦。`,
  ja: (title, desc, games) =>
    `Farm Game Hub で「${title}」を読みました——${desc}${games}私に合うのはどれか決めるのを手伝ってください：まず私の遊び方（ソロ/協力、機種、1回のプレイ時間、重視する点）について簡単に質問し、その上で理由つきのおすすめを教えてください。`,
  ko: (title, desc, games) =>
    `Farm Game Hub에서 '${title}'을(를) 읽었어요——${desc}${games}저에게 맞는 게임을 고르도록 도와주세요: 먼저 제 플레이 방식(솔로/협동, 플랫폼, 플레이 시간, 가장 중시하는 것)을 몇 가지 물어본 뒤 이유와 함께 개인 맞춤 추천을 해주세요.`,
  de: (title, desc, games) =>
    `Ich habe gerade '${title}' auf Farm Game Hub gelesen — ${desc}${games} Hilf mir zu entscheiden, welches zu mir passt: Stell mir ein paar kurze Fragen zu meinem Spielstil (allein vs. Koop, Plattform, Sitzungsdauer, was mir am wichtigsten ist) und gib mir dann eine persönliche Empfehlung mit Begründung.`,
}

const GAMES_CLAUSE: Record<string, (names: string) => string> = {
  en: (n) => ` It compares ${n}.`,
  zh: (n) => `它对比了${n}。`,
  'zh-TW': (n) => `它對比了${n}。`,
  ja: (n) => `${n}を比較しています。`,
  ko: (n) => `${n}을(를) 비교합니다.`,
  de: (n) => ` Es vergleicht ${n}.`,
}

function joinNames(names: string[], locale: string): string {
  if (locale === 'zh' || locale === 'zh-TW' || locale === 'ja' || locale === 'ko') return names.join('、')
  if (names.length <= 1) return names.join('')
  return `${names.slice(0, -1).join(', ')} and ${names[names.length - 1]}`
}

export function buildArticleHandoff(
  post: Pick<GuidePost, 'title' | 'description' | 'tags' | 'contentHtml'>,
  locale: string,
): Handoff {
  const key = TEMPLATES[locale] ? locale : 'en'
  const ids = detectGames(post)
  const entries = ids.map((id) => GAMES.find((g) => g.id === id)!).filter(Boolean)

  const named = entries.slice(0, MAX_GAMES_NAMED).map((g) => pickLoc(g.display, key))
  const clause = named.length ? (GAMES_CLAUSE[key] ?? GAMES_CLAUSE.en)(joinNames(named, key)) : ''

  // Truncate description so the whole prompt stays under the cap.
  const buildWith = (desc: string) => TEMPLATES[key](post.title, desc, clause)
  let desc = post.description ?? ''
  let prompt = buildWith(desc)
  if (prompt.length > MAX_PROMPT_LEN) {
    const overflow = prompt.length - MAX_PROMPT_LEN
    desc = desc.slice(0, Math.max(0, desc.length - overflow - 1)).trimEnd() + '…'
    prompt = buildWith(desc)
    if (prompt.length > MAX_PROMPT_LEN) prompt = prompt.slice(0, MAX_PROMPT_LEN)
  }

  const seen = new Set<string>()
  const tools: { label: string; href: string }[] = []
  for (const g of entries) {
    for (const tool of g.tools) {
      if (seen.has(tool.href)) continue
      seen.add(tool.href)
      tools.push({ label: pickLoc(tool.label, key), href: tool.href })
    }
  }

  return { prompt, tools }
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run src/__tests__/lib/article-ai.test.ts`
Expected: PASS（Task 1 + Task 2 全部用例通过）。

注：`caps named games at 3` 用例断言第 4/5 个游戏名不出现在 prompt。因 `named` 只取前 3，`Coral Island`/`Animal Crossing` 不会出现——通过。

- [ ] **Step 5: Commit**

```bash
git add src/lib/article-ai.ts src/__tests__/lib/article-ai.test.ts
git commit -m "feat(article-ai): buildArticleHandoff prompt + tool list"
```

---

### Task 3: `<ArticleAskAI>` 客户端组件

**Files:**
- Create: `src/components/tools/ArticleAskAI.tsx`
- Test: `src/__tests__/tools/ArticleAskAI.test.tsx`

**Interfaces:**
- Consumes: 无（纯展示 + 浏览器 API）。props 由 Task 4 传入。
- Produces:
  - `interface ArticleAskAIProps { prompt: string; tools: { label: string; href: string }[]; locale: string }`
  - `export function ArticleAskAI(props: ArticleAskAIProps): JSX.Element`
  - 行为：ChatGPT/Claude 按钮 `window.open(url, '_blank', 'noopener')`；复制按钮写剪贴板并显示反馈；`tools` 为空不渲染工具区。

- [ ] **Step 1: Write the failing test**

`src/__tests__/tools/ArticleAskAI.test.tsx`:

```tsx
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { ArticleAskAI } from '@/components/tools/ArticleAskAI'

const prompt = 'Help me decide which farming game fits me.'

describe('ArticleAskAI', () => {
  beforeEach(() => {
    vi.restoreAllMocks()
  })

  it('opens ChatGPT with the encoded prompt', () => {
    const open = vi.spyOn(window, 'open').mockImplementation(() => null)
    render(<ArticleAskAI prompt={prompt} tools={[]} locale="en" />)
    fireEvent.click(screen.getByRole('button', { name: /chatgpt/i }))
    expect(open).toHaveBeenCalledWith(
      `https://chatgpt.com/?q=${encodeURIComponent(prompt)}`,
      '_blank',
      'noopener',
    )
  })

  it('opens Claude with the encoded prompt', () => {
    const open = vi.spyOn(window, 'open').mockImplementation(() => null)
    render(<ArticleAskAI prompt={prompt} tools={[]} locale="en" />)
    fireEvent.click(screen.getByRole('button', { name: /claude/i }))
    expect(open).toHaveBeenCalledWith(
      `https://claude.ai/new?q=${encodeURIComponent(prompt)}`,
      '_blank',
      'noopener',
    )
  })

  it('copies the prompt to clipboard', async () => {
    const writeText = vi.fn().mockResolvedValue(undefined)
    Object.assign(navigator, { clipboard: { writeText } })
    render(<ArticleAskAI prompt={prompt} tools={[]} locale="en" />)
    fireEvent.click(screen.getByRole('button', { name: /copy|复制/i }))
    expect(writeText).toHaveBeenCalledWith(prompt)
  })

  it('renders related-tool links when tools provided', () => {
    render(
      <ArticleAskAI
        prompt={prompt}
        tools={[{ label: 'Gift Finder', href: 'tools/stardew-gifts' }]}
        locale="en"
      />,
    )
    const link = screen.getByRole('link', { name: /gift finder/i })
    expect(link).toHaveAttribute('href', '/en/tools/stardew-gifts')
  })

  it('renders no tools section when tools is empty', () => {
    render(<ArticleAskAI prompt={prompt} tools={[]} locale="en" />)
    expect(screen.queryByRole('link')).toBeNull()
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/__tests__/tools/ArticleAskAI.test.tsx`
Expected: FAIL —「Cannot find module '@/components/tools/ArticleAskAI'」。

- [ ] **Step 3: Write minimal implementation**

`src/components/tools/ArticleAskAI.tsx`:

```tsx
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
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run src/__tests__/tools/ArticleAskAI.test.tsx`
Expected: PASS（5 个用例全部通过）。

- [ ] **Step 5: Commit**

```bash
git add src/components/tools/ArticleAskAI.tsx src/__tests__/tools/ArticleAskAI.test.tsx
git commit -m "feat(article-ai): ArticleAskAI client island"
```

---

### Task 4: 注入文章页（best-games 文章）

**Files:**
- Modify: `src/app/[locale]/guides/[game]/[slug]/page.tsx`

**Interfaces:**
- Consumes: Task 2 `buildArticleHandoff`；Task 3 `ArticleAskAI`。
- Produces: 无对外接口——在 best-games 文章正文后、FAQ 之前渲染 `<ArticleAskAI />`。

- [ ] **Step 1: 加 import**

在文件顶部 import 区加入：

```tsx
import { buildArticleHandoff } from '@/lib/article-ai'
import { ArticleAskAI } from '@/components/tools/ArticleAskAI'
```

- [ ] **Step 2: 在正文后注入区块**

在 `{/* Article content */}` 的 `</article>`（`dangerouslySetInnerHTML` 那个 `<article>`）之后、`{/* Calculator cross-link */}` 之前插入：

```tsx
{/* Ask-AI handoff + related tools (best-games articles only) */}
{game === 'best-games' && (() => {
  const { prompt, tools } = buildArticleHandoff(post, locale)
  return <ArticleAskAI prompt={prompt} tools={tools} locale={locale} />
})()}
```

- [ ] **Step 3: 类型检查 + 全量测试**

Run: `npx tsc --noEmit && npx vitest run`
Expected: tsc 无错误；全部测试 PASS。

- [ ] **Step 4: 构建冒烟**

Run: `npm run build`
Expected: 构建成功，无与本次改动相关的报错。

- [ ] **Step 5: Commit**

```bash
git add "src/app/[locale]/guides/[game]/[slug]/page.tsx"
git commit -m "feat(guides): render ArticleAskAI on best-games articles"
```

---

## Self-Review

**Spec coverage：**
- 服务端检测 + 客户端岛 → Task 1/2（逻辑层）、Task 3（组件）、Task 4（注入）。✓
- 动态 prompt 跟随文章语言 + 点名游戏（≤3）→ Task 2。✓
- 3 出口（ChatGPT / Claude deep-link + 复制）→ Task 3。✓
- 相关工具按检测游戏自动匹配、无命中不渲染 → Task 2（tools 列表）+ Task 3（条件渲染）。✓
- 仅 best-games、不改 frontmatter、不动旧 cross-link → Task 4 + Global Constraints。✓
- 长度上限、locale 回退、剪贴板降级 → Task 2 / Task 3。✓
- 测试置于 `src/__tests__/`、Vitest → 各任务测试路径。✓

**Placeholder scan：** 无 TBD/TODO；每个代码步骤含完整代码。✓

**Type consistency：** `LocMap`/`GameEntry`/`ToolLink`/`Handoff`/`DetectInput` 跨任务一致；`buildArticleHandoff`、`detectGames`、`pickLoc`、`ArticleAskAIProps` 命名前后一致。✓
