# Farming Game Hub — 网站定位、内容策略与信息架构

**日期**：2026-06-27
**状态**：已审核，待实现

---

## 1. 定位声明

**Farming Game Hub 是农场游戏爱好者的集结地**——帮玩家发现游戏、玩得更好、和社区互动。

| 支柱 | 用户场景 | 核心问题 |
|------|---------|---------|
| 游戏大全 | 想找一款适合自己的农场游戏 | "有哪些农场游戏？哪款适合我？" |
| 工具集 | 正在玩某款游戏，想玩得更高效 | "这作物值不值得种？这季应该种什么？" |
| 测评 | 想了解自己，或找到共鸣分享给朋友 | "我是什么类型的农场玩家？" |
| 游戏攻略 | 遇到具体问题需要答案 | "第一年怎么过？怎么快速赚铃钱？" |

### 品牌关系

```
Farming Game Hub（网站品牌）= 农场游戏爱好者集结地（双语，zh/en 并重）
  └── TendFarm App（站内小版块）= iOS 健康农场应用，开发中
```

TendFarm App 是站内一个独立落地页（`/tendfarm`），Nav 有唯一入口，其他页面不主动出现。

---

## 2. 目标受众

- **主要**：正在玩农场游戏的玩家（Hay Day、星露谷、动物森友会等）
- **次要**：想找农场游戏但不知道从哪入手的潜在玩家
- **语言**：中文（简体/繁体）与英文并重，各自独立 SEO 策略

---

## 3. 信息架构（路由结构）

```
/                              → 语言检测 → /zh 或 /en

/[locale]/                     → 首页

/[locale]/games/               → 游戏大全首页（全球农场游戏列表）
/[locale]/games/[slug]         → 单款游戏详情页（如 /games/hay-day）

/[locale]/tools/               → 工具集首页
/[locale]/tools/hay-day        → Hay Day 作物利润计算器（已有）
/[locale]/tools/stardew        → 星露谷作物利润计算器（已有）

/[locale]/quizzes/             → 测评首页（独立 section）
/[locale]/quizzes/[slug]       → 单个测评页（如 /quizzes/farm-personality）
/[locale]/quizzes/[slug]/result → 测评结果页（含分享卡片）

/[locale]/guides/              → 攻略首页（已有）
/[locale]/guides/[game]/[slug] → 具体攻略文章（已有）

/[locale]/tendfarm             → TendFarm App 落地页（独立，Nav 唯一入口）
```

### 现有路由变动

| 旧路由 | 新路由 | 说明 |
|--------|--------|------|
| `/tools/quiz` | `/quizzes/farm-personality` | 测评独立成 section |
| `/philosophy` | `/tendfarm`（合并） | 三页合并为一页 |
| `/lifestyle` | `/tendfarm`（合并） | 同上 |
| `/gameplay` | `/tendfarm`（合并） | 同上 |

旧路由保留 301 重定向，不影响已有 SEO 权重。

---

## 4. 导航结构

```
Header:
🌿 Farming Game Hub     游戏大全  工具集  测评  游戏攻略  [TendFarm App]     语言切换
   农场游戏集结地
```

- 前四项：社区内容，等权重，普通文字链接
- `[TendFarm App]`：琥珀色小边框标签，视觉上区分为"特殊版块"
- Header CTA（右侧）：`🌾 游戏工具` → 指向 `/tools`

---

## 5. 各支柱详细设计

### 5.1 游戏大全 `/games`

**目标**：成为"找农场游戏"的权威入口，拦截发现类搜索流量。

**首页**：
- 全球农场游戏列表（20+ 款），支持按平台（iOS / Android / PC / Switch）和风格（休闲 / 策略 / 模拟经营）筛选
- 每款游戏：封面图 + 一句话简介 + 平台标签 + 难度标签

**深度覆盖游戏（有工具 + 攻略入口）**：
- Hay Day
- 星露谷物语（Stardew Valley）
- 动物森友会（Animal Crossing: New Horizons）
- Farming Simulator（候补）

**游戏详情页 `/games/[slug]`**：
- 游戏介绍（200-400 字）
- 平台 / 开发商 / 上线时间
- 该游戏的工具入口（如有）
- 该游戏的攻略入口
- 相关测评

**SEO 目标词**：
- 中：`农场游戏推荐`、`2025最好玩的农场游戏`、`Hay Day攻略`
- 英：`best farming games 2025`、`hay day game guide`、`farming simulator tips`

---

### 5.2 工具集 `/tools`

**目标**：高意图、高复访——玩家每次规划种植前都会来。

**现有工具**：
- Hay Day 作物利润计算器（`/tools/hay-day`）
- 星露谷物语作物利润计算器（`/tools/stardew`）

**后续扩展方向**：
- 动森铃钱效率计算器
- Hay Day 订单优化器
- 星露谷种植日历（按剩余天数推荐）

**页面设计原则**：工具直接可用，不需要注册，结果实时计算。

**SEO 目标词**：
- 中：`hay day 作物计算器`、`星露谷 最赚钱作物`
- 英：`hay day crop profit calculator`、`stardew valley best crops`

---

### 5.3 测评 `/quizzes`

**目标**：互动 + 传播——结果适合截图分享到小红书、微博、X、Discord。

**现有测评**（迁移自 `/tools/quiz`）：
- 农场人格测试：你是哪种农场玩家？（效率型 / 美学型 / 探索型 / 禅意型）

**后续测评方向**：
- 哪款农场游戏最适合你？（按玩法偏好匹配游戏）
- 你的农场风格是？（按装饰/效率/社交偏好）

**结果页设计**：
- 独立 URL：`/quizzes/farm-personality/result?type=zen`（可分享链接）
- 视觉结果卡片：适合截图，含结果标题 + 简短描述 + Farming Game Hub 水印 + 二维码/链接
- 行动按钮：「分享给朋友」「再测一次」「看看适合你的游戏 →」

**SEO + 社交传播**：
- 中：`农场游戏测试`、`农场人格测试`
- 英：`what kind of farmer are you`、`farming game personality quiz`

---

### 5.4 游戏攻略 `/guides`

**目标**：长尾 SEO 核心战场，持续输出有深度的游戏内容。

**现有内容**（保留，不动）：
- Hay Day：新手入门、作物效率
- 星露谷：第一年攻略、最佳作物
- 动物森友会：新手指南、铃钱赚取

**扩展方向**：
- 每款深度游戏月更 1-2 篇
- 覆盖搜索量高的具体问题（"星露谷冬季种什么"、"Hay Day 钻石怎么用"）

---

### 5.5 TendFarm App `/tendfarm`

**目标**：独立落地页，收集候补名单，不干扰主站内容定位。

**内容**（现有 philosophy + lifestyle + gameplay 合并为一页）：
- 产品一句话介绍
- 核心机制（FarmData：活动→阳光、睡眠→晨露、HRV→空气）
- 开发状态 + 候补名单表单

**在主站的曝光**：
- Nav 右侧琥珀色小标签入口（唯一）
- 首页最底部小区块彩蛋（非主角）

---

## 6. 首页结构

```
Hero
  标题：发现你的下一款农场游戏
  副标题：攻略 · 工具 · 测评，农场游戏爱好者一站搞定
  CTA：[浏览游戏大全 →]  [查看工具集 →]

游戏大全入口
  4-6 款主流游戏横向卡片，点击进入 /games/[slug]

热门工具
  2-3 个工具直接展示，Hay Day / 星露谷 / 测评入口

最新测评（主推）
  单个测评大卡片，突出可分享结果卡片效果预览

最新攻略
  3 篇攻略文章卡片

TendFarm App 彩蛋
  小块低调区域："我们也在做一款健康农场 App →"
```

---

## 7. SEO 策略摘要

| 页面类型 | SEO 打法 | 预期见效周期 |
|---------|---------|------------|
| 游戏大全列表 | 覆盖"农场游戏推荐"类搜索 | 3-6 个月 |
| 游戏工具页 | 精准高意图词（计算器类） | 1-3 个月 |
| 测评结果页 | 社交传播带外链，间接 SEO | 持续 |
| 攻略文章 | 长尾问题词，数量累积 | 6-12 个月 |

---

## 8. 技术架构（不变）

- Next.js 14 App Router + TypeScript
- Tailwind CSS（深农场色调：`#0f1a0f`、`#f0a832`、`#e8dcc8`）
- next-intl 双语路由（`/zh`、`/en`）
- Supabase（候补名单存储）+ Resend（确认邮件）
- Vercel 部署（CLI 直推）

---

## 9. 实现优先级

| 优先级 | 内容 | 说明 |
|--------|------|------|
| P0 | 品牌改名（TendFarm → Farming Game Hub） | Header、Footer、metadata |
| P0 | 测评迁移（/tools/quiz → /quizzes/） | 独立 section + 结果分享页 |
| P1 | 游戏大全页（/games） | 新建，20+ 游戏列表 + 4 款深度页 |
| P1 | TendFarm 合并落地页（/tendfarm） | 三页合一 |
| P2 | 测评结果分享卡片 | 可截图 + 独立 URL |
| P3 | 首页重构（基于新定位） | 替换现有 Hero + SiteIntro |
