# afit-ops-website config — farmgamehub.com

- **GSC resource_id**: sc-domain:farmgamehub.com   (URL-encoded: sc-domain%3Afarmgamehub.com)
- **GSC performance URL**: https://search.google.com/search-console/performance/search-analytics?resource_id=sc-domain%3Afarmgamehub.com
- **Sitemap**: https://www.farmgamehub.com/sitemap.xml
- **Vercel**: team `jsamgogos-projects` / project `tend-farm-web`(repo llgsam/TendFarmWeb,push main 自动部署)
  - Web Analytics:未启用(2026-07-12);Speed Insights:后台开、代码未埋
- **Locales**: zh(默认/无前缀重定向到 /zh)、en、zh-TW(opencc 自 zh 转)、ja、ko、de;内容量 EN/ZH 57 篇,ja/ko/de 各 11 篇
- **Market priority**(2026-07-17 按国家维度重写,旧版"US ≫ 其他"已被推翻):**按每曝光价值**排 —— 🇯🇵JP(pos10.1/CTR4.0%)≈ 🇫🇷FR(9.7/5.8%,**尚无 fr locale**)> 🇰🇷KR(9.7/2.1%)> 小市场 SE/FI/BE/NZ(7.3–10.6 / 4–7%)≫ 🇺🇸US(**1737 曝光但 pos17.0/1.2%**)≈ 🇩🇪DE(636 曝光 / pos18.2 / **0.3%**)。**US/DE 是最大曝光池,也是维基/Reddit 墙最厚处**;小语种在第 1 页且高 CTR。US 仍占 21/99 点击(最大单一来源),但增量在非英语侧
- **🔴 内容下注铁律(2026-07-17 SERP 实证)**:**站点赢在维基不在的地方,输在维基在的地方。** 发现/推荐簇(天花板 ~154k,SERP 无维基,对手=reddit+中腰博客)= 加码方向,已吃 2/3 点击;Stardew 工具/参考簇英文头部词(名义 60k,SERP = wiki×3+fandom+reddit+steam+论坛)= **短期不可赢**,1,682 曝光仅 3 点击。**工具不是没价值**(非英语/长尾工具词 pos 6–9 能排上,且有留存/分享/GEO 价值),但**别指望它赢英文头部词**
- **Keyword library**: `docs/seo/keyword-candidates-2026-06.csv`、`docs/seo/article-queue.json`(文章队列)、`docs/seo/tools-roadmap.json`(工具队列,自带 KE vol)
- **自主程度**: 改动默认待批(propose-only);报告/日志文件可直接写
- **已知坑**: `buildLanguageAlternates()`(src/lib/config.ts)曾对全 locale 无条件广播 hreflang → 幻影 404 URL(2026-07-12 发现并修复:guide 页现在传入 `getGuideLocales()` 过滤;新增内容类型时注意同样处理)
- **取数坑(2026-07-17 实测)**:
  - **GSC 国家/网页维度**:用 URL 参数 `&breakdown=country|page|query&metrics=CLICKS%2CIMPRESSIONS%2CCTR%2CPOSITION` 直接开(7/15 点 tab 失败的问题就此解决);表格**默认每页 10 行**且"每页行数"下拉点不动 → **翻页用 DOM 点「下一页」**(`aria-label` 含"下一页")最稳,每次 sleep 3.5s 再抽 `document.body.innerText`
  - **`document.querySelector('table').innerText` 只返回前 10 行** → 改抽 `document.body.innerText`,截 `热门查询`/`排名靠前的网页` 到 `每页行数` 之间
  - **⚠️ daemon 当前标签会漂到别的 GSC 属性**(实测抓到了 moodji 数据)→ **`new_tab` + 抽取必须在同一次 browser-harness 调用里完成**,并校验属性
  - **`http_get` 现被 Vercel 机器人墙 403**(以前能过 sitemap.xml)→ 改用 `new_tab` 读;**XML 文档下 `document.body` 为 null**,用 `new XMLSerializer().serializeToString(document)`
  - **Google SERP 实搜可用**(`/search?q=…&gl=us&hl=en&num=20`,无验证码)→ **判断"能不能赢"的决定性工具,别只靠位置-CTR 基准推断**
- **GSC 请求收录操作方法**(browser-harness):inspect 深链会 404,要用顶部检查框——`focus()` 输入框 → `type_text(url)` → `press_key("Enter")` → 等"网址已/未收录" → 点"请求编入索引"文本节点向上找 button 祖先;页面过渡时 `document.body` 会短暂为 null,js 调用要 try/except

## Target clusters (what to track)
| Cluster | Pages/slugs | Target keywords | Notes |
|---|---|---|---|
| co-op/multiplayer | /en/guides/best-games/farming-games-with-best-multiplayer | co op farming games (720), coop farming games (720), best coop farming games (90) | 7/12 已做 page-1 push 增强,基线 pos 18.9/12.3 |
| romance | /en + /de …/farming-games-romance-relationships | farming games with romance (110) | EN pos 14;DE 幻影页曾排 11.8/169impr(404) |
| vs 对比文 | animal-crossing-vs-stardew-valley 等 | animal crossing vs stardew valley (880) | pos 9.3,已第 1 页 |
| **🥇 发现/推荐簇**(2026-07-17 新增,主战场) | /en/guides/best-games/*(40+)、/en/games/*、games-like-stardew-valley、farming-rpg-games | **天花板 ~154k**:farming games (49.5k) / farm games (49.5k) / games like stardew valley (18.1k) / farming simulator games (12.1k) / farming rpg games (6.6k) / games similar to stardew (4.4k) / best cozy games (4.4k) / free farming games (3.6k) | **SERP 无维基,对手=reddit+中腰博客 → 可赢**;已吃 ~65/99 点击。基线 7/17:`farming games` pos 27.1 / `farm games` 21.8 / `best farming games` 34.2 / games-like-stardew **10.9** / farming-rpg **18.4** / `/en/games/farming-simulator` **8.1 @ CTR 20.8%** |
| ~~Stardew 工具簇~~ ❌ **降级**(维基墙) | /en/tools/stardew-*(12 个,含 7/16 新增 companion + greenhouse) | stardew valley fish (22.2k) / gifts (12.1k) / sprinklers (12.1k) / bundles (8.1k) / calendar (8.1k) / museum (8.1k) —— **名义 60k,实际拿不到** | **2026-07-17 SERP 实证:英文头部词前 20 = wiki×3+fandom+reddit+steam+论坛,我们不在榜**。1,682 曝光 → **3 点击(0.18%)**,基线 pos 27–46。**不再加码英文头部词**;非英语/长尾工具词可排上(`스타듀밸리 주민 선물` 6.6、`고급 스프링클러 배치` 7.0、`farm rpg quizzes` 8.8)→ 保留但改走非英语/长尾。⚠️ **greenhouse 不在 sitemap(P0 待批)** |

## Tracking log (append each run, newest first)

### 2026-07-17(晚场·取数)— CTR 结案:是曝光池构成问题,不是标题;助手决策=不做
- Totals: impr **7850**(↑890)/ clicks **110**(↑11)/ CTR 1.4% / pos 16.7 / **收录 401 连续冻结**;**边际 CTR 仅 1.2%**(新曝光和存量一样差)
- **Vercel(7d,补上早场缺口)**:访客 **239≈34/天** / PV 321 / **PV·访客=1.34(来了就走)** / 跳出 92% / referrer google 160
- **🔴 分段模型(核心)**:**Stardew 参考(工具+攻略)~2,800 曝光 → 2 点击 = 0.07%**(结构性死区)‖ 发现/推荐 ~2,400 → ~63 = **2.6%** ‖ HayDay ~430→7 ‖ 非英语 ~600→~11。**~40% 曝光来自死区,把 2.6% 拖成 1.4% → 站点均值 CTR 无意义,只能看分段**
- **比排得低更糟**:`stardew valley bundles`(22.2k)只给 **12 曝光**/pos47.6;`stardew valley calendar`(22.2k)**11 曝光**/pos23。**维基墙=在钱词上不存在**;工具页 1,739 曝光全是长尾碎词 → **0 点击**
- **标题问题第 4 次证伪(用统计)**:`stardew valley vs hay day` pos3.7/18曝光/0点击,**P(观测到0)≈22% = 正常噪声**。**CTR 永久结案,不再复查**;CTR 是位置与赛道的滞后指标
- **🔴 SERP 实搜决定性证据**:`farming games`(**49.5k**,我们 pos27.1)前8 = eneba/reddit/play.google/crazygames/steam/**cozygamereviews**/**ladiesgamers**/nintendo → **无维基 + 中腰博客在 6/7 位 = 头部词可赢**。全站最大单点缺口
- **反证**:`/en/games/farming-simulator` pos7.7 → **CTR 22.8%**(全站冠军);ja switch pos9 → 10.8% → **排得上时 CTR 极好,CTR 从不是问题**
- **❌ 助手决策:不是现在(时序错)**。34 访客/天做留存=过早优化;获客缺口差 1–2 个数量级(farming games 单词 49.5k 捕获≈0)。**正确时序:获客→激活→留存**。漏斗已建好,流量来了留存层就位。**读存档方向冻结,不投产能**
- ⚠️ **待验证假设(别想当然)**:助手服务 **Stardew 参考人群**,发现簇带来 **"还在挑游戏"人群** —— **不是同一批人**,"发现簇引流→助手留存"存在**人群错配**
- Actions taken:**零代码改动**(取数+分段+SERP+报告)。待批:**P3 发现簇枢纽内链**(唯一建议动作,复用 7/15 已验证最高 ROI 打法)
- 新预测(7/24):**Q1** `farming games` pos≤20(若执行内链)/ **Q2** 收录≥450 / **Q3 反向** 工具簇 EN 点击仍≤6 / **Q4** 发现簇点击占比≥70%

### 2026-07-17(晚)— 执行记录(非取数运行):P0 sitemap 已修 + companion 入口漏斗
- **✅ P0 已修(7/17 日志里的待批①)**:`sitemap.ts` 硬编码工具数组 → **改读目录**(`toolSlugs()`,仿 `quizSlugs()` 先例)。**线上复验:`/tools/stardew-greenhouse` 从 0 → 48 条 sitemap 条目**(与 companion 持平)。⚠️**注意坑**:直接"读目录"会把 `tools/quiz`(它只是 redirect 到 `/quizzes/farm-personality`)扫进 sitemap → 制造"网页会自动重定向"未收录项;故实现里**跳过含 `redirect(` 的 page**,已复验 quiz 条目=0。4 个测试锁住两条行为
- **companion 入口漏斗(承认它搜不来流量 → 站内是唯一渠道)**:入口此前几乎关闭(工具中心排第10、8/10 工具页无入口、10/10 Stardew 攻略页 0 入口)。已做:①工具中心**置顶+特色卡**(强调边框/「📌 边玩边钉」徽章/跨列)②**8 个 Stardew 工具页**加入口 ③**8 篇 Stardew 攻略页**加**按主题定制**的 callout(钓鱼→当季鱼、best-crops→还来得及种、社区中心/mining→物品速查、relationships→今日生日);**farm-layout / games-like 故意跳过**(意图不符,games-like 的读者是要离开 Stardew)
- **定位说明(守 7/17 铁律)**:以上是**把已投产能的留存价值榨出来**,**不是**新获客下注;获客加码方向仍是发现簇
- 另:companion 新增**万能物品速查**(输物品→谁爱送/哪个 bundle/博物馆/料理/售价),复用四库现有数据零新抓;跨库 join = 归一化英文名
- commits: `4389c9a`(sitemap+hub置顶) `9f66ffc`(工具页入口) `6539a18`(攻略页入口) `33325c9`(物品速查+修复);测试 198 绿

### 2026-07-17 — T+5(SERP 实搜复核 → 确诊"维基墙";孤儿页内链假设被证实)
- Totals: impr **6960**(↑from 4790)/ clicks **99**(↑from 82)/ CTR 1.4% / pos 16.7 / **收录 401 → 401(纹丝不动,索引波已停)**;未收录 608 持平
- **🔴 头号发现:维基墙(SERP 实证)** —— 实搜 US SERP:`stardew valley gifts`(12.1k)/`sprinklers`(12.1k)前 20 = **wiki×3 + fandom + reddit + steam + 官方论坛**,我们不在榜。→ **Stardew 工具英文头部词短期不可赢**;工具簇 1,682 曝光换来 **3 点击(0.18%)**,名义天花板 60k 是假的
- **对照组**:`games like stardew valley`(18.1k)/`co op farming games` 的 SERP **无维基**,对手是 reddit + 中腰博客(gamespew/pcgamer/dualshockers/popgeeks)→ **可打**
- **簇分水岭**:发现簇天花板 **~154k**(farming games 49.5k + farm games 49.5k + games like stardew 18.1k + farming simulator games 12.1k + farming rpg 6.6k …),已吃到 **~65/99 点击(2/3)**,`/en/games/farming-simulator` **pos 8.1 / CTR 20.8%** 证明打得赢 → **加码方向**。最近一周产能(companion+greenhouse)全投在输的那侧
- **"第1页0点击"结案(第三次确认无标题问题,本次是实证)**:first-year 269impr/pos10.0/0click —— SERP 被 reddit+steam+YouTube 轮播吃满,pos10 已在视野外。标题本身很好,**无 title 改动可做**
- **🆕 国家维度首次取到**(用 `breakdown=country` 参数,别点 tab):US 21c/**1737impr**/1.2%/**pos17.0**(最大池=最厚的墙);DE 2c/636impr/**0.3%**/18.2;**JP 5c/125/4.0%/pos10.1**(JA switch 页 CTR 12.9%);KR 4c/188/2.1%/9.7;**FR 3c/52/5.8%/9.7(站上还没 fr locale)**;SE/FI/BE/NZ 各 2c、CTR 4–7%、pos 7–10 → **"US ≫ 其他"已被推翻**(见下方 Market priority)
- **✅ 孤儿页内链假设证实(7/15 打法,2 天见效)**:`games-like-stardew-valley` 无排名 → **pos 10.9**(N1 提前 5 天远超);`farming-rpg-games` 30.1 → **18.4**、曝光 24 → **156(6.5×)**(N2 页面级达成,但查询级头部词仍 29.7)。**6 条内链、零新内容 = 迄今 ROI 最高动作,可复用到发现簇枢纽词**
- **7/13 预测终局**:P1 收录 ✅ / **P2 `co op farming games` 17.4 ❌**(5天挪0.5位;无空格变体已 pos9.8 在赚 → 增强只喂到了一侧)/ **P3 EN romance 14.0 零位移 ❌**(7天小数点没动,确认放弃)/ **P4 DE romance ✅ 3clicks/230impr/pos11.6**(幻影排名完整承接,romance 簇唯一收入)
- **🔴 P0 新 bug**:`/tools/stardew-greenhouse` **不在 sitemap**(0 次;companion 48 次)。根因 `src/app/sitemap.ts:61` **硬编码工具数组**漏加 → 新工具页对 Google 隐形。**根治建议:改成读目录,文件里已有 `quizSlugs()` 先例**
- 排查结论(非 bug):`/tools/stardew-bundles` 无前缀 URL 280impr/pos44.8 → 实测 301+canonical 正确,GSC 报重定向前 URL,自然衰减
- Actions taken:**零代码改动**(纯取数+分析+SERP 复核+报告)
- 待批:①修 sitemap 漏页(建议读目录根治)②发现簇枢纽内链(复用已验证打法)③评估加 fr locale
- **数据缺口:Vercel Analytics 未取到(掉登录)** → referrer/GEO/跳出断档一次;CWV 仍无(付费墙);`http_get` 现被 Vercel 403,改用浏览器+XMLSerializer 读 XML
- 新预测(7/24 验收):M1 greenhouse 收录 / **M2 收录≥450(索引波是否复活)** / M3 `farming games`|`farm games` 任一 pos≤18 / **M4 反向预测:工具簇 EN 点击仍≤6(用来证伪"维基墙")** / M5 JP ≥8 clicks

### 2026-07-15 — T+3 / A–E 后 T+4(首次看到 A–E 效果;发现孤儿页根因)
- Totals: impr **4790**(↑from 3050)/ clicks **82**(↑from 60)/ CTR 1.7%(健康摊薄延续)/ pos 15.4 / **收录 82 → 401 🚀(+319)**;未收录 793→608
- **头号信号:索引大跳 82→401** —— 7/12 重提 sitemap + hreflang 修复触发索引波,预测 P1(≥95)远超达成、提前 4 天
- **簇动向**:vs 簇改善(AC×SDV pos8.9↑、coral×SDV pos11.9 临界)仍是唯一在赚;co-op 裂脑(`coop`无空格 pos9.8 第1页在赚 / `co op`带空格 pos17.9 仍第2页);romance pos14 **3天零位移**(印证不加码);farming-rpg pos30 未动
- **核心发现:孤儿页根因** —— `farming-rpg-games`(6,600)+ `games-like-stardew-valley`(9,900)**各自 0 内链**,内容已 done 却卡死深位 → 待批动作=从已第1页的 vs 簇页加内链
- **Vercel Analytics(7d)**:Visitors **80**(from 27)/ PV 98 / 跳出 93%;referrer **google 40 / cn.bing 7 / bing 2 / chatgpt 1 → 无 Naver/Yandex/Baidu**;Top Pages = vs 簇
- **🆕 KR 定案**:韩语工具词进第1页但 referrer 无 Naver → 走 Google-Korea,**不注册 Naver**;referrer 出现 **chatgpt.com=首个 GEO/LLM 引用信号**(观察)
- 线上渲染复验 broken:0;404×18 疑幻影残留列监控
- Actions taken:✅ **孤儿页内链已执行**(用户批准,commit `0cb2675` push→部署;6/6 内链线上复验上线)——games-like-stardew ← 3 第1页vs页,farming-rpg ← combat/skill/Portia;未碰 co-op/romance 预测页
- 数据缺口:CWV 无(付费墙);GSC 国家 tab 切不动(下次用顶部筛选)
- 新预测(7/22 验收):N1 games-like-stardew 进 top40 pos≤25 / N2 farming-rpg pos≤22 / N3 收录≥480 / N4 coral×SDV pos≤10 且首 click

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
