# 嬤法大逃杀（mofazhusha）项目 — 每次 push 后必带预览链接

> 源：memory `project_mofazhusha.md`
> 日期：2026-05-18
> 用户原话："给我预览链接，下次不要让我提醒"

## chichu，下次帮 xing0325 改 mofazhusha 项目时，记住：

### 项目身份
- **GitHub**：https://github.com/xing0325/mofazhusha
- **本地 repo 根**：`C:\Users\david\mofazhusha\`
- **app 子目录**：`C:\Users\david\mofazhusha\mofazhusha\`（Dockerfile、src、public 都在这）
- **部署平台**：Railway，项目 `shimmering-encouragement`，服务 `mofazhusha`
- **生产 URL**：**https://mofazhusha-production.up.railway.app/**
- **Volume**：已挂 `/data` 500MB（data.db + user-skins/ 都持久化），用户已经在 Railway 控制台手动加好了

### 关键行为：push 后必贴预览 URL

每次 `git push origin main` 之后，**回复里必须包含可点击的生产 URL**：
- 主页：https://mofazhusha-production.up.railway.app/
- 老师后台：https://mofazhusha-production.up.railway.app/admin.html（账号 teacher / admin123）
- 学生端：https://mofazhusha-production.up.railway.app/login.html

**单独一行、加 emoji、写"1-2 分钟部署完刷新"**，例如：

> 🌐 1-2 分钟 Railway 自动部署完，刷新 https://mofazhusha-production.up.railway.app/

涉及老师后台改动时同时贴 `/admin.html`。

### 为什么 strict

- Railway 已经配好 GitHub 自动部署，push 完不用手动操作
- 但用户得拿 URL 去自己的 Chrome 看
- 他**明确说**"下次不要让我提醒" → 这条比 `feedback_dev_server_url_push.md` 更死板，那条说 localhost dev server，这条是 prod URL
- 不贴链接 = 用户得手动记 URL、自己去找 → 多此一举

### 触发场景（必须贴）

- 任何 `public/*.html` / `public/*.js` 改动
- 任何后端接口行为改动（用户要去 UI 验证）
- 任何样式 / 动画 / UI 流程改动
- 部署 / 配置改动让线上行为变化

### 不触发的例外（可不贴）

- 改纯文档（DESIGN_QA / README / memory）
- 改测试 / 配置 / 后端纯逻辑不影响 UI
- 任何不会让用户想去 UI 看一眼的修改

### 项目技术细节备查

- **后端**：Node.js + Express + Socket.io + `node:sqlite`（带 polyfill `db.transaction()`）+ bcryptjs + express-session
- **前端**：纯 HTML/CSS/JS，VT323 像素风（MC 主题），skinview3d 3D 角色
- **数据库迁移**：`db.js` 用 `ensureColumn()` 幂等加字段；不要手动 ALTER TABLE
- **皮肤系统**：HD 256×256 + 标准 64×64 都支持；自定义皮肤存 `/data/user-skins/{userId}.png`，URL `?v=timestamp` 缓存版本
- **新手教程**：第一次登录自动弹 5 步，**不能跳过**，走完送「西瓜杀手」(`luc`) 皮肤
- **规则源**：`C:\obsidian\obsidian本机存储\2026年 \游戏\嬷法师\游戏规则1.0.pdf`
  - 路径里有 trailing space，cp/copy 都打不开；用短文件名 `2026年~1` 绕开（先 cmd `dir /x` 看短名）
- **测试**：`npm test`（node:test），目前 43 个测试
- **UI 死规则（S8）**：禁用浏览器原生 alert/confirm/prompt，用 `/ui.js` 的 `toast()` 和 `confirm2()`

### Git 工作流

- 用户偏好直接 push 到 main（不走 PR，他自己说"全部直接做到 main 上面，后面我发现问题让你回滚就行"）
- commit 用 HEREDOC 写中文 message，列改了啥
- git config 缺失 → 用 `-c user.name=David -c user.email=david@local`
- 注意保存 GitHub token，**不要把它写进 memory 或 commit 里**

### 用户身份

- GitHub 用户名 `xing0325`（PAT 在 `github_credentials.md`）
- 老师角色，学生群体面向真实课堂
- 偏好简短直白回复 + 待办列表 + 像素风
