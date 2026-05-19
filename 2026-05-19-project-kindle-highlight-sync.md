# Kindle Highlight Sync 项目 — 状态档案

> 源：memory `project_kindle_highlight_sync.md`
> 日期：2026-05-19
> 起因：用户说"做成一个只要上传自己的 kindle 账户密码就能同步划线的网站吗，我和我朋友都要用"

## chichu，xing0325 接下来回到 kindle-highlight-sync 项目时，记住

### 项目身份
- **本地路径**：`C:\Users\david\kindle-highlight-sync\`
- **状态**：spec + plan 写完，本地 git 已提交，**未推 GitHub**（等用户授权）
- **GitHub repo**：还没建
- **预计工程量**：~6.5 天
- **目标用户**：David + 几个朋友（小范围邀请制，非商用）
- **部署**：Railway（参考 mofazhusha 项目的部署经验）

### 用户提的需求 vs 实际方案（重要分歧）
用户原话："上传自己的 kindle 账户密码就能同步"

→ 这条**完全不可行**，我已经在对话里说服用户改方案了：
- Amazon 2FA：自动登录需要 OTP，必断
- Captcha：到一定频率必弹，断
- 风控：从机房 IP 登录会**锁号**，朋友的整个 Amazon 都掉（连带 Prime / 支付）
- 法律：存别人 Amazon 密码 = PIPL 敏感信息超范围收集，**民事+刑事都可能**
- 业内：Readwise / Bookcision / Klib 全用 bookmarklet/插件，没有密码方案，不是没想到

**已落地方案**：**bookmarklet**。用户在自己浏览器登录 Amazon → 点收藏栏脚本 → 脚本在用户上下文跑、抓 DOM、带 per-user token POST 回我们服务器。**服务器从未见过 Amazon 凭据**。

如果用户后来又问"能不能直接用密码"—— 把上面 5 条再说一遍，**不要妥协**。

### 核心架构（已锁定）
- FastAPI + HTMX + magic-link 邮箱登录（Resend 发链接）
- Postgres（Railway plugin），dev 用 SQLite
- 每用户一个长期 `bookmarklet_token`（Bearer），可撤销重发
- bookmarklet：`javascript:` URL → fetch `/api/bookmarklet.js?t=<token>` → eval
- 真正的 scraper 脚本在 `static/bookmarklet.js`，服务器把 token 和 BASE 替换进去再返回
- 导入接收 JSON：`{books:[{amazon_asin, title, author, highlights:[{location, text, note, color}]}]}`
- 去重键：`(user_id, book_id, location, md5(highlight_text))`
- CORS 白名单：`https://read.amazon.com`、`.cn`、`.co.jp`
- 限流：每 token 10 次/分钟

### 邀请制（不要忘）
`INVITE_CODES_REQUIRED=true` + `INVITE_CODES=<逗号分隔>`。理由：不公开开放降低被 Amazon 注意概率。**不要上 ProductHunt、不要发推**。

### 文档位置
- spec：`docs/superpowers/specs/2026-05-19-kindle-highlight-sync-design.md`
- plan：`docs/superpowers/plans/2026-05-19-kindle-highlight-sync-plan.md`（17 任务，TDD，含全部代码）
- 脚手架：pyproject、.gitignore、.env.example、`src/khs/`、`tests/`、`static/`

### 实施流程
- 走 `superpowers:subagent-driven-development` 或 `executing-plans`
- plan 已经把全部代码、测试、命令、commit 消息都列好了
- Task 14 是 Amazon notebook DOM fixture 测试 —— 每次 Amazon 改版只改 selector + fixture 就能修

### 用户的 Kindle 实情（写代码时记住）
- 用户从 Kindle Store **买的少**，大量 sideload EPUB（冷门书）
- 但用户用 send-to-kindle **邮件**推书，所以 sideload 也会被 Amazon 当 Personal Documents 上云
- Personal Documents 的高亮**会**出现在 read.amazon.com/notebook（这是 2020-2022 之后 Amazon 放开的，不要按 2018 旧规则判断说"sideload 看不到"）
- 双端（Kindle 设备 + 手机 Kindle App）自动通过 Amazon 云同步，bookmarklet 抓一次 = 两端的高亮都拿到了

### 不要做的（v1 范围外）
- 浏览器插件（先 bookmarklet，火了再升级到插件）
- 服务器端定时抓（要 cookies / headless，会触风控）
- 自己的 PWA 阅读器（用户继续用 Kindle App / Kindle 设备）
- 跨用户社交（看朋友高亮、评论）
- 自动同步进 Obsidian / Notion / Anki（v1 给导出文件，让用户自接）

### 域名 + 凭据待补
- 域名：等用户决定（Railway 子域过渡也行）
- Resend：需要 verified sender；dev 阶段用 `RecordedSend` mock 测试，看日志里链接
- Amazon 邀请名单：用户自己列朋友邮箱
