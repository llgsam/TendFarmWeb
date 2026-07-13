# afit-ops-website config — farmgamehub.com

- **GSC resource_id**: sc-domain:farmgamehub.com   (URL-encoded: sc-domain%3Afarmgamehub.com)
- **GSC performance URL**: https://search.google.com/search-console/performance/search-analytics?resource_id=sc-domain%3Afarmgamehub.com
- **Sitemap**: https://www.farmgamehub.com/sitemap.xml
- **Vercel**: team `jsamgogos-projects` / project `tend-farm-web`(repo llgsam/TendFarmWeb,push main 自动部署)
  - Web Analytics:未启用(2026-07-12);Speed Insights:后台开、代码未埋
- **Locales**: zh(默认/无前缀重定向到 /zh)、en、zh-TW(opencc 自 zh 转)、ja、ko、de;内容量 EN/ZH 57 篇,ja/ko/de 各 11 篇
- **Market priority**(GSC 数据):US ≫ 其他英语区(CA)> DE(romance 意外信号)> JP/KR/TW
- **Keyword library**: `docs/seo/keyword-candidates-2026-06.csv`、`docs/seo/article-queue.json`(文章队列)、`docs/seo/tools-roadmap.json`(工具队列,自带 KE vol)
- **自主程度**: 改动默认待批(propose-only);报告/日志文件可直接写
- **已知坑**: `buildLanguageAlternates()`(src/lib/config.ts)曾对全 locale 无条件广播 hreflang → 幻影 404 URL(2026-07-12 发现并修复:guide 页现在传入 `getGuideLocales()` 过滤;新增内容类型时注意同样处理)
- **GSC 请求收录操作方法**(browser-harness):inspect 深链会 404,要用顶部检查框——`focus()` 输入框 → `type_text(url)` → `press_key("Enter")` → 等"网址已/未收录" → 点"请求编入索引"文本节点向上找 button 祖先;页面过渡时 `document.body` 会短暂为 null,js 调用要 try/except

## Target clusters (what to track)
| Cluster | Pages/slugs | Target keywords | Notes |
|---|---|---|---|
| co-op/multiplayer | /en/guides/best-games/farming-games-with-best-multiplayer | co op farming games (720), coop farming games (720), best coop farming games (90) | 7/12 已做 page-1 push 增强,基线 pos 18.9/12.3 |
| romance | /en + /de …/farming-games-romance-relationships | farming games with romance (110) | EN pos 14;DE 幻影页曾排 11.8/169impr(404) |
| vs 对比文 | animal-crossing-vs-stardew-valley 等 | animal crossing vs stardew valley (880) | pos 9.3,已第 1 页 |
| Stardew 工具簇 | /en/tools/stardew-*(10 个) | stardew valley fish (22.2k) / gifts (12.1k) / sprinklers (12.1k) / bundles (8.1k) / calendar (8.1k) / museum (8.1k) | 7/8–7/11 上线,等收录 |

## Tracking log (append each run, newest first)

### 2026-07-13 — T+1(GSC 延迟 → A–E 效果尚不可见;升级到簇级模型)
- Totals: impr **3050**(↑from 1.6k,近翻倍)/ clicks **60**(↑from 40)/ CTR 2.0% / pos 13 / 收录 **82(未变,索引报告停 6/30)**
- **CTR 诊断(量化,修正)**:对照位置-CTR 基准,hay-day-vs(pos4.7/14.3%)、AC-vs-SDV(pos9.3/5.3%)均**优于基准 → 无标题问题**;0 点击词全是第 2 页位置问题。CTR 2.5%→2.0% 是新词涌入撑大分母的**健康摊薄**,非退化。主杠杆=位置前推,非改标题。
- **簇天花板(KE 全球量)重排下注顺序**:泛词簇 ~28k(games-like-stardew **18,100** + farming-rpg **6,600** + free-farming 3,600)碾压 co-op(~1,500)/ **romance(仅 ~150,即便吃满也 10–20 clicks/mo,ROI 边际,不再加码)**。vs 簇(~1,400)是唯一在赚的簇(已第 1 页)。
- **最高 ROI 单点**:`farming-rpg-games` 文章已 done 但 pos30.4、天花板 6,600、comp 0.01 → 7/19 后首选=位置前推(内链+加深),而非写新文。
- **Vercel Analytics 首日 ✅**:27 访客 / 43 PV;来源 **google 67%** 绝对主力;地区 US48%/UK7%/DE4%;referrer **无 Naver/Yandex/Baidu → 暂无需注册其他引擎**;⚠️ OS Linux 33% 疑似 bot、85% 跳出不可信(样本 27)
- 数据缺口:CWV 无(Speed Insights 付费未买 + PageSpeed 配额用尽);games-like-stardew 排名未知(未进 GSC top40);KE 冷词返 0 用 GSC 反推
- 部署健康 ✅;JP `牧場物語` 30impr/pos35 列观察项
- Actions taken:**无代码/内容改动**(克制,昨天已密集执行 A–E);取数+KE 簇量+复验+报告
- 4 条可证伪预测已写死(见报告 C 表),7/19 验收:收录≥95 / co-op pos≤12 / romance EN 首个 click / DE romance ≥1 click

### 2026-07-12 — 90d(≈建站以来,6/26 上线)
- Totals: impr ~1.6k / clicks ~40 / 收录 82 / 已知 875(695 已发现未抓取)
- 市场:US 15 clicks/855 impr 绝对主力;DE romance 幻影页 3 clicks
- Movers: multiplayer 文 7c/340i/pos12.3(当天已增强);`co op farming games` pos 18.9 基线
- New pages status: 10 个工具页 sitemap ✅,收录仅个别(bundles ✅);GSC sitemap 上次读取 6/30(旧)
- Actions taken(A–E 全部批准并当日执行完毕,commits 7c91baa/4f3d3ad/d911d1e/175eabe,部署 Ready):
  - A ✅ hreflang 修复,线上验证:EN romance 页只输出 zh-Hans/zh-Hant/en/de
  - B ✅ sitemap 重提(提交日期 2026-07-12);6 个工具页全部请求收录。意外发现 fish/gifts/museum/villagers 其实已收录(比 site: 查询显示的多)
  - C ✅ @vercel/analytics + @vercel/speed-insights 上线,`window.va`/`window.si` 已挂载;dashboard Web Analytics 已 Enable
  - D ✅ DE romance 文章上线(200,德语标题验证),幻影 404 → 真内容
  - E ✅ EN romance +婚姻 FAQ +修复文末 404 内链(romance→relationships)+villagers 工具内链;multiplayer 文 2 处内链指向 romance
- 验收预期:DE romance 承接原幻影排名(基线 11.8/169impr);EN romance 冲第 1 页(基线 14.0);工具页收录加速;7/13 起 Vercel Analytics 有真实数据
- 下次复查:2026-07-19,核对 P4 清单(见报告)
