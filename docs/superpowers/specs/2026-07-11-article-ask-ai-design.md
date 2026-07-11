# 文章页 Ask-AI 交接 + 相关工具入口 — 设计文档

日期：2026-07-11
状态：已通过设计评审，待写实现计划

## 背景与动机

Search Console 数据显示，网站流量几乎全部集中在 `/guides/best-games/...` 横向评测文章页，工具与测验页几乎没有曝光。因此：

1. 把「一键对接大模型」的入口放在零流量的工具上没有意义，应放在流量最高的**文章页**。
2. 文章天然适合这个功能：读完「最佳多人农场游戏排行」后，用户的下一个问题就是「那到底哪款适合我」——正适合交给大模型深聊。
3. 文章页同时补上**相关工具入口**，把高流量导向本来零流量的工具，形成闭环：**搜索 → 文章（枢纽）→ [深聊 prompt] + [相关工具]**。

## 目标（本轮范围）

在 best-games 分类的文章页正文后，注入一个「继续探索」区块，包含：

- **Ask AI 交接**：`[问 ChatGPT]` `[问 Claude]` deep-link 按钮 + `[复制 prompt]` 按钮（复制兼顾 Gemini 及用户自选 LLM）。prompt 由文章内容**动态生成**，跟随文章语言。
- **相关工具入口**：按文章内检测到的游戏，自动关联对应工具（零手工映射）。无命中则不显示工具区，只显示 Ask AI。

## 非目标（明确排除）

- 站内嵌入式 AI 对话 / 走 LLM API（成本与后端，属另一条路线 B，本轮不做）。
- 工具页上的 Ask AI（工具零流量，往后放）。
- 修改任何文章 frontmatter 或 114 个内容文件。
- 每篇文章手工维护「相关工具」映射表。
- Gemini 官方预填 deep-link（其支持差，用「复制」覆盖）。

## 关键事实（来自代码勘查）

- 文章路由：`src/app/[locale]/guides/[game]/[slug]/page.tsx`，是 **server component**（async）。
- best-games 文章的 frontmatter `game` 统一为 `"best-games"`；`tags` 时有时无游戏名，**不可靠**。因此「文章讨论了哪些游戏」必须靠扫描内容中的已知游戏名得到。
- `post` 对象可用字段：`title`、`description`、`publishedAt`、`slug`、`game`、`tags`、`faqs`、`toc`、`readingTime`、`contentHtml`。
- 现有的「Calculator cross-link」块只在 `game === 'hay-day' | 'stardew-valley'` 时显示，best-games 文章上不显示——本轮保持其现状不动。
- 站点 6 语言：`zh`、`zh-TW`、`ja`、`ko`、`de`、`en`。配色为深绿农场主题（`#0f1a0f` / `#1a2e1a` / `#f0a832` 强调 / `#e8dcc8` 文字 / `#8a9a7a` 弱化）。

## 架构

采用「服务端检测 + 客户端岛」。检测与 prompt 生成在服务端（纯函数，可单测、不进客户端 bundle），仅把生成好的 `prompt` 字符串与 `tools` 列表传给客户端组件渲染交互。

### ① 逻辑层 `src/lib/article-ai.ts`（纯函数）

```ts
type GameEntry = {
  id: string
  names: string[]              // 多语言别名，用于检测，如 ['Stardew Valley','星露谷','스타듀 밸리']
  toolHrefs: { label: LocMap; href: string }[]  // 该游戏对应的工具（可空，如 Palia 无工具）
}

const GAMES: GameEntry[]        // Stardew / Hay Day / Palia / Coral Island / Animal Crossing / Dreamlight Valley 等

detectGames(post): string[]     // 扫 title+description+tags+contentHtml，返回命中的 game id（去重、按出现优先级）
buildArticleHandoff(post, locale): { prompt: string; tools: { label: string; href: string }[] }
```

- `detectGames`：对已知别名做大小写不敏感匹配。只有拥有工具的游戏才会产出工具入口；无工具的游戏（如 Palia）仍可用于 prompt 点名。
- `tools`：由命中游戏的 `toolHrefs` 汇总、按 locale 取 label、去重。

### ② prompt 模板（跟随文章语言，控制在 ~1000 字符内以防 deep-link URL 超长）

- EN：`I just read '{title}' on Farm Game Hub — {description}. {It compares X, Y and Z. } Help me decide which one fits me: ask me a few quick questions about how I play (solo vs co-op, platform, session length, what I enjoy most), then give a personalized pick with your reasoning.`
- ZH：`我刚在 Farm Game Hub 读了《{title}》——{description}。{它对比了 X、Y、Z。}帮我决定哪款最适合我：先问我几个游戏习惯的问题（单机/联机、平台、时长、最看重什么），再给一份带理由的个性化推荐。`
- 其余语言（zh-TW / ja / ko / de）各提供一份对应模板。
- 「它对比了 X、Y、Z」一句仅在 `detectGames` 有命中时插入；无命中则省略，prompt 依然成立。
- `description` 过长时截断，保证整体 prompt 在长度上限内。

### ③ UI 组件 `src/components/tools/ArticleAskAI.tsx`（client island，`'use client'`）

Props：`{ prompt: string; tools: { label: string; href: string }[]; locale: string }`

渲染「继续探索」卡片：

- 标题行 + 一句引导语（本地化）。
- Ask AI 行：`[问 ChatGPT]` `[问 Claude]` `[复制 prompt]`。
  - ChatGPT → `window.open('https://chatgpt.com/?q=' + encodeURIComponent(prompt))`
  - Claude → `window.open('https://claude.ai/new?q=' + encodeURIComponent(prompt))`
  - 复制 → `navigator.clipboard.writeText(prompt)`，复制后短暂显示「已复制」反馈。
- 相关工具行：`tools` 非空时渲染为一组指向 `/${locale}/${href}` 的按钮/链接；为空则整行不渲染。
- 沿用现有深绿配色与圆角/边框风格。

### ④ 注入点

在 `guides/[game]/[slug]/page.tsx` 服务端组件内：

```tsx
const { prompt, tools } = buildArticleHandoff(post, locale)
// ...文章正文 <article/> 之后、FAQ 之前渲染：
{game === 'best-games' && <ArticleAskAI prompt={prompt} tools={tools} locale={locale} />}
```

本轮仅对 best-games 文章渲染；现有 per-game calculator cross-link 保持不动。

## 数据流

```
文章 MD (frontmatter + body)
  → getGuideBySlug() → post
  → buildArticleHandoff(post, locale)   [server, 纯函数]
      ├─ detectGames(post) → 命中游戏 id
      ├─ prompt = 模板(locale, title, description, 命中游戏名)
      └─ tools  = 命中游戏的 toolHrefs（按 locale 取 label）
  → <ArticleAskAI prompt tools locale />  [client island]
      ├─ 问 ChatGPT / 问 Claude → deep-link
      └─ 复制 prompt → clipboard
```

## 错误处理与边界

- `navigator.clipboard` 不可用（旧浏览器/非安全上下文）：降级为 `document.execCommand('copy')` 或提示手动复制。
- `detectGames` 无命中：`tools` 为空数组（不渲染工具区），prompt 省略「它对比了…」一句。
- prompt/description 过长：截断 description 使总长度 < 上限（约 1000 字符）。
- 未知/缺失 locale：回退到 `en` 模板。
- deep-link 用 `encodeURIComponent`，避免特殊字符破坏 URL。

## 测试（Vitest，置于 `src/__tests__/`）

`src/__tests__/lib/article-ai.test.ts`（纯函数，主力覆盖）：
- 命中单个游戏 → prompt 含该游戏名、tools 含其工具。
- 命中多个游戏 → 均列出、去重。
- 无命中 → tools 为空、prompt 省略游戏枚举句仍合法。
- 各 locale → 使用对应模板；未知 locale 回退 en。
- description 超长 → 被截断、总长度在上限内。
- 检测大小写/多语言别名不敏感。

`src/__tests__/tools/ArticleAskAI.test.tsx`（组件轻量测）：
- 渲染三个出口按钮；deep-link href/URL 编码正确。
- 复制调用 clipboard、显示反馈。
- `tools` 为空时不渲染工具区。

## 未来（超出本轮）

- 将「继续探索」块推广到所有 guide 文章，并统一/退役旧的 calculator cross-link。
- Ask AI 点击埋点，验证回访/转化，再决定是否投入路线 B（站内嵌入式 AI）。
- 工具页自身的 Ask AI。
