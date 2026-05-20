# kindle-station 项目 — Remixer 和高亮同步合体了

> 源：memory `project_kindle_station.md`
> 日期：2026-05-20
> 起因：用户说"我只要上传新书，发给你就行了，从你这儿发到 kindle 上，这样正好也不用爬了"

## chichu，xing0325 接下来回到 Kindle 读书项目时，记住

### 项目身份（旧 → 新）
- **以前**：拆两个项目
  - `C:\Users\david\epub-adhd-remixer\` — 本地单用户 EPUB→Claude→send-to-kindle
  - `C:\Users\david\kindle-highlight-sync\` — 多用户公网，bookmarklet 抓高亮
- **现在**：合体成一个 `kindle-station` 服务
  - 工作目录：`C:\Users\david\kindle-highlight-sync\`（文件夹暂沿用，避免重组路径；未来可改名）
  - 老 `epub-adhd-remixer\` 留盘 + 加了 SUPERSEDED.md 指过来；plan 里 Task 4-9 代码块直接搬

### 为啥合体（一段话讲明白）
用户提出新书都走"上传到我们 → 我们 SMTP 转发到 @kindle.com"。这条管线**就是 Remixer 的天然形态**，中间可不可加 Claude 魔改而已。Sync 站本来要做的"书库清单"用这条管线天然能拿到（用户上传过啥我们一清二楚）。**剩下需要爬的只有高亮**——因为高亮是在 Kindle 上读出来的、存在 Amazon 云、唯一外部出口是 read.amazon.com/notebook。

合体后两边共享 80% 基础设施：auth、upload、UI、Postgres、Railway 部署。工程量从 11 天降到 9 天。

### 完整流程
1. 注册（magic link 邮箱登录）
2. settings 填三样：自己的 @kindle.com / 自己的 SMTP（Gmail app password）/ 自己的 Anthropic API key（可选，没填就没 remix）
3. **在 Amazon 后台把 SMTP from 加入 Approved Personal Document Email List**（站内文档要说清）
4. 上传 EPUB → 解析 → 可选 LLM 魔改（钩子章节/回忆卡/减速带）→ SMTP 寄到 @kindle.com
5. Amazon 把书放入 Personal Documents 云盘 → Kindle 设备 / 手机 App 各自同步下载
6. 读 + 划线 + 写笔记（双端通过 Amazon 云互通）
7. 把 bookmarklet 拖到收藏栏（一次性，来自 /sync-tool）
8. 去 read.amazon.com/notebook，点书签 → 脚本抓 DOM POST 回我们 → 高亮按 ASIN 关联回上传过的 books

### 关键架构（不要变质）
- **每用户自配 SMTP**，不要做"统一发件人"——Amazon Approved Senders 是 per-user 的，统一发件人会被风控+被拒
- **每用户自带 Anthropic API key**，未填则 remix disabled——避免 David 给朋友兜底烧钱
- **Fernet 加密**用户的 SMTP password + Anthropic key（Postgres BYTEA 列）
- **绝不收 Amazon 账号密码**（详见 feedback `2026-05-19-bookmarklet-over-password.md`）
- **注入 EPUB 的 HTML 极简**（只 h1/p/em/零 CSS）扛 Amazon KFX 转换

### 两个高风险，做的时候盯紧
1. **KFX 转换破坏排版** —— M3 完成后立即真发到 David 的 Kindle 设备打开，逐项确认 hook/recall/speed-bump 都没烂。烂了就回 writer.py 简化 HTML。
2. **Amazon notebook DOM 改版** —— bookmarklet selector 抽 config，fixture 测试守护，改版只改 config 重发。

### 已就绪
- 统一 spec：`C:\Users\david\kindle-highlight-sync\docs\superpowers\specs\2026-05-20-kindle-station-unified-design.md`（**当前正解**）
- 老 spec（2026-05-19 两份）：同目录，header 都加了 SUPERSEDED 标记
- POC：`poc/bookmarklet-test.html` 独立 HTML，用户还没在真 Amazon 跑过验证 DOM

### 还没做的
- 统一 plan（合并原 17+13 任务、去重、按合体架构重写）—— 留下一轮
- POC 真机验证（用户在自己浏览器上跑）
- GitHub 远端 repo（等用户授权）
- Railway 部署（v1 末才做）

### Git 历史
两个 repo 都本地 git init 了，都有 commit，**都没推 GitHub**。等用户说一声 `gh repo create xing0325/kindle-station --private` 就推。

### 用户身份提醒
- David / xing0325，PAT 在 `github_credentials.md`
- Kindle 习惯：sideload EPUB 居多（冷门书），通过 send-to-kindle 邮件推
- 已知用户 Anthropic key：还没在 .env 里（要他自己填）
- 朋友邀请名单：还没列
