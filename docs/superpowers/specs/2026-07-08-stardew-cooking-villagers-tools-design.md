# 设计：新增 stardew-cooking + stardew-villagers 两个数据工具

日期：2026-07-08
状态：待实现

## 目标

在 `/tools` 的「游戏数据查询 / Game Database」板块新增两个星露谷数据工具，沿用现有 4 件套范式，各自解决一个**官方 wiki 体验做不好**的真实痛点：

1. **stardew-cooking** — 料理食谱查询（簇搜索量 6480/月）。差异化 = 能力级：食材反查 + buff 筛选（wiki 只有一张巨大静态正查表，做不到）。
2. **stardew-villagers** — 定位为**结婚对象对比决策器**（主打 `stardew valley marriage`，3600/月）。差异化 = 决策支持：把 12 个结婚对象并排对比一屏看完（wiki 需挨个点开 12 个个人页）。非结婚村民作为次级档案补全。

> 设计约束：villagers **不做**成"生日+最爱礼物"的档案聚合页——那会和自家 `stardew-calendar` / `stardew-gifts` 撞车，也打不过 wiki 的单人页。主轴必须是对比决策。

## 现有范式（照抄，不引入新架构）

参照最近上线的 `stardew-museum` / `stardew-gifts`：

- **路由**：`src/app/[locale]/tools/<slug>/page.tsx`
  - `generateMetadata` 6 语言 title/description（内联 `getLoc()`）+ `alternates.canonical` + `buildLanguageAlternates('/tools/<slug>')`
  - 页面：面包屑 → h1 → 简介段 → `<Finder locale={locale} />` → "相关工具"互链区
- **客户端组件**：`src/components/tools/Stardew<X>Finder.tsx`（`'use client'`），内联 `pick()`/`getLoc()`，筛选 + 搜索状态用 `useState`，不可变更新
- **数据文件**：`src/components/tools/stardew<X>Data.ts`，头部 `// AUTO-GENERATED ...` 注释，导出类型 + 常量数组；6 语言 `{ en, zh, zhTW, ja, ko, de }`
- **注册**：加进 `src/app/[locale]/tools/page.tsx` 的 `DATA_TOOLS` 数组（key/href/titles/descs/tags，6 语言）
- **sitemap**：把 `/tools/<slug>` 加进 `src/app/sitemap.ts` 的路径数组
- **路线图**：`docs/seo/tools-roadmap.json` 里对应 queue 条目 `status→done`、移入 `shipped[]`、更新 `covers[]` 与 `updated`
- 6 语言：en / zh / zh-TW / ja / ko / de

## 工具一：stardew-cooking

### 数据模型（`stardewCookingData.ts`）

```ts
export type CookLoc = { en: string; zh: string; zhTW: string; ja: string; ko: string; de: string }
export interface CookIngredient { key: string; name: CookLoc; qty: number }   // qty 数量
export type BuffType = 'farming'|'fishing'|'foraging'|'mining'|'combat'|'luck'|'attack'|'defense'|'speed'|'maxEnergy'|'magnetism'|'none'
export interface CookRecipe {
  key: string
  icon: string                 // 图标文件名，跨语言对齐 key
  name: CookLoc
  ingredients: CookIngredient[]
  source: CookLoc              // 解锁来源（技能等级 / 烹饪女王 TV / 好感度 / 商店 / 掉落）
  energy: number               // 回能量
  health: number               // 回血
  buffs: { type: BuffType; amount: number }[]
  buffDuration: string | null  // buff 时长（如 "5m 35s"），无 buff 为 null
  sellPrice: number
}
export const COOK_RECIPES: CookRecipe[] = [ /* ~80 道 */ ]
```

### 组件（`StardewCookingFinder.tsx`）UI

- 顶部三组筛选 + 搜索框：
  1. **按食材反查**（下拉/可搜索）：选一个食材 → 只显示用到它的菜（核心差异化）
  2. **按 buff 类型**：选 farming/fishing/mining/combat/… → 只显示提供该 buff 的菜
  3. **按来源类别**：技能 / 好感度 / 商店 / 电视 / 其他
  4. 名称搜索框（本地化匹配）
- 结果：卡片列表，每张列图标、菜名、食材（名×数量）、来源、回血/回能量、buff（带时长）、售价
- 全客户端过滤，不可变 state 更新

### 数据抓取

- `browser-harness` 抓官方 wiki `Cooking` 页（含全部食谱表：食材/来源/回复/buff/售价）；6 语言各抓一份，按图标文件名对齐 en/zh/ja/ko/de，zh-TW 走 `?variant=zh-hant`
- 抓取存 JSON → `gen_cooking.py` 生成 `stardewCookingData.ts`（不手工转录）

### 相关工具互链

→ stardew-gifts（很多料理是最爱礼物）、stardew-fish（鱼是料理食材）、stardew-crop calculator

## 工具二：stardew-villagers（结婚对象对比器）

### 数据模型（`stardewVillagerData.ts`）

```ts
export type VilLoc = { en: string; zh: string; zhTW: string; ja: string; ko: string; de: string }
export type Season = 'spring'|'summer'|'fall'|'winter'
export interface Villager {
  key: string
  icon: string
  name: VilLoc
  marriageable: boolean         // 是否可结婚
  gender: 'male'|'female'
  birthday: { season: Season; day: number }
  region: VilLoc                // 居住区域（如 镇上/海滩/牧场）
  lovedGifts: VilLoc[]          // 最爱礼物摘要（取前 4–6 项；完整跳 gift guide）
  // —— 仅结婚对象填以下"决策"字段 ——
  personality: VilLoc | null    // 一句话性格/人设
  spousePerk: VilLoc | null     // 婚后配偶行为/给的东西（如清晨给礼物、帮忙浇水/喂动物）
  heartEventHint: VilLoc | null // 爱心事件亮点（一句话，不搬全文）
}
export const VILLAGERS: Villager[] = [ /* ~34 名，其中 12 可结婚 */ ]
```

> **轻量约定**：关系深度只到"求婚门槛（8 心花束 / 10 心美人鱼吊坠为全局通用规则，写进页面说明而非逐人字段）+ 配偶婚后行为 + 爱心事件一句话亮点"。**不**搬完整爱心事件剧情（数据爆炸、SEO 价值低）。

### 组件（`StardewVillagerFinder.tsx`）UI

- **默认视图 = 12 个结婚对象对比**（主轴）：卡片/紧凑表，一屏对比生日、性格、最爱礼物、婚后配偶行为、爱心事件亮点
- 筛选：`仅可结婚`（默认开）/ 按生日季节 / 按性别；名称搜索
- 关掉"仅可结婚"→ 展开全部 ~34 村民的基础档案（生日/区域/最爱礼物）
- 页面说明区写通用求婚规则（花束/吊坠门槛）
- **强互链**：每张卡 → `stardew-gifts`（完整送礼喜好）+ `stardew-calendar`（生日在日历定位）

### 数据抓取

- `browser-harness` 抓官方 wiki `Villagers` 列表页 + 各人物页（生日/区域/婚后/性格）；6 语言按图标对齐，zh-TW 走 `?variant=zh-hant`
- **最爱礼物复用**：`stardewGiftData.ts` 已有各村民 `loves` 字段，`gen_villagers.py` 优先对齐复用，减少重复抓取
- `gen_villagers.py` 生成 `stardewVillagerData.ts`

### 相关工具互链

→ stardew-gifts、stardew-calendar、stardew-fish

## 实现顺序

1. **villagers 先做**（工作量 M，且最爱礼物可复用已有数据，跑通范式快）
2. **cooking 后做**（工作量 L，数据量最大）

每个工具完成后：
- `npm run build` 通过
- 本地 `/tools` 列表出现新卡片、两个新路由 6 语言可访问、筛选/搜索/互链正常
- 更新 `tools-roadmap.json`（对应条目 done + 移入 shipped）

## 验收标准

- [ ] 两个新路由 `/tools/stardew-cooking`、`/tools/stardew-villagers` 6 语言可访问，SEO metadata + language alternates 齐全
- [ ] cooking：食材反查 + buff 筛选 + 来源筛选 + 搜索均生效，~80 道菜数据准确（来自官方 wiki）
- [ ] villagers：默认结婚对象对比视图，可切换全部村民，筛选/搜索生效，12 结婚对象决策字段齐全
- [ ] 两工具在 `DATA_TOOLS` 注册、加入 `sitemap.ts`
- [ ] `tools-roadmap.json` 更新（cooking + villagers → done/shipped）
- [ ] 数据由 `gen_cooking.py` / `gen_villagers.py` 生成（可重跑），非手工转录
- [ ] `npm run build` 通过，无 console.log，不可变更新
```