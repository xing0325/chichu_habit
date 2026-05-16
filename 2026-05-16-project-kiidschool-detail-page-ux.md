# 2026-05-16 钥匙玩校 · 详情页长文阅读 UX 清单

> 源：memory `project_kiidschool_detail_page_ux.md`（originSessionId `f9cef96c...`）

## 背景

钥匙玩校 H5（`C:/Users/david/kiidschool/`）当前 13 张营期卡片只展示简介。

**下一阶段需求**：每张卡片可以点开看微信原文级别的完整介绍。

爬虫工具 `C:/Users/david/bin/wechat_fetch.py` 已经支持批量抓 URL 清单。详情页设计要走"长文阅读体验"路线，参考 Medium / Substack / The Pudding / Instapaper。

## chichu 钦定的 9 条要点（必须全部考虑）

### 1. 阅读进度条
- 顶部一根**细线**随滚动推进
- 最低成本的"我还要读多久"信号
- 类似 Medium / Substack / 新闻网站
- ✅ 比百分比数字更不打扰

### 2. 侧边浮动 TOC（目录）
- 桌面端：右侧固定目录，**当前章节高亮**
- 手机端：折叠成悬浮按钮，点开抽屉
- 读者随时知道"我在哪、还有什么"
- ⚠ 对长文体验提升巨大

### 3. 预估阅读时间
- 文章开头标"约 X 分钟"
- 比"X 字"更人性化
- 心理预期管理

### 4. 章节折叠 / 渐进展开
- 后半章节默认折叠 + "展开继续阅读"按钮
- 或者 The Pudding 风格：**滚动到此处自动展开**
- 对特别长的文章用

### 5. 段落级锚点和分享
- 鼠标悬停在段落旁出现小链接图标
- 直接分享到该段
- Medium 还能**高亮一句话分享**（可选高阶）

### 6. 图片懒加载 + 点击放大
- 公号图片多，**懒加载是必须**的（`loading="lazy"`）
- 点击放大用 lightbox（PhotoSwipe 是首选库）
- ⚠ 主页面 `index.html` 营地环境部分已经实现了简版 lightbox，可参考扩展

### 7. 深色模式
- 长文阅读用户敏感
- CSS `prefers-color-scheme: dark` 媒体查询 + 切换按钮

### 8. 字号 / 字体切换
- 1-2 档字号调节
- 宋体 / 黑体切换
- Instapaper / Pocket 阅读器的标配
- chichu 偏好存 localStorage

### 9. "返回顶部" + "继续上次阅读"
- 返回顶部：滚动一段距离后浮现的 ⬆ 按钮
- 继续上次阅读：localStorage 记滚动位置，下次打开**自动定位**
- 后者非常体贴

## 实现优先级建议（首版）

**P0（必做）**：
- 1 阅读进度条 — 10 行 CSS+JS 搞定
- 3 预估阅读时间 — 数字计算简单
- 6 图片懒加载 + 点击放大 — 复用现有 lightbox
- 9 返回顶部 + 继续上次阅读 — 1 个 localStorage key

**P1（应做）**：
- 2 侧边 TOC（移动端折叠版） — 锚点自动生成
- 7 深色模式 — 一套备用 CSS 变量
- 8 字号切换 — 2-3 档

**P2（可选 / 锦上添花）**：
- 4 章节渐进展开 — 营期文章可能不需要那么长
- 5 段落锚点分享 — 移动端家长可能用不上

## 技术栈建议

- 走纯 HTML/CSS/JS 单文件，跟主页 `index.html` 一致
- 一个营期 = 一个 `camps/<slug>.html`
- 从 `wechat_fetch.py` 的 `_index.json` 生成静态详情页
- 或者保持单页应用：详情页用 hash 路由 `#/camp/xxx`，从 JSON 动态渲染

## 关联资源

- 主页：`C:/Users/david/kiidschool/index.html`
- 仓库：https://github.com/xing0325/kiidschool（branch `feat/2026-revision-r1`）
- 部署：https://xing0325.github.io/kiidschool/
- 爬虫：`C:/Users/david/bin/wechat_fetch.py`
- 物料目录：`C:/工作资料/钥匙玩校*` 系列

## 重要约束

- chichu 先要做主页架构调整（🅰️ + 🅳️ 方案：板块 Tab + 浮动 TOC）
- 详情页是**之后**的事，按 chichu 原话"先记住这些建议，后面加到详情页里面"
- **等 chichu 主动说"开始做详情页"再启动**

---

> 来自 2026-05-16 chichu_habit 批量同步会话（claude）
