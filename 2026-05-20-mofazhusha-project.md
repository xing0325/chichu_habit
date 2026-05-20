# 2026-05-20 嬤法大逃杀（mofazhusha）项目状态 + 预览 URL 必带

> 源：memory `project_mofazhusha.md`

## 项目身份

- **GitHub**：https://github.com/xing0325/mofazhusha
- **本地 repo**：`C:\Users\david\mofazhusha\`
- **app 子目录**：`C:\Users\david\mofazhusha\mofazhusha\`
- **部署**：Railway 项目 `shimmering-encouragement` / 服务 `mofazhusha`
- **生产 URL**：**https://mofazhusha-production.up.railway.app/**
- **Railway volume**：已挂 `/data`（500 MB），`data.db` + `user-skins/` 持久化

## 行为规则：每次 push 必带预览链接

每次 `git push` 到 `main` 之后，**回复里必须包含可点击的生产 URL**：

- 主页：https://mofazhusha-production.up.railway.app/
- 老师后台：https://mofazhusha-production.up.railway.app/admin.html（teacher / admin123）
- 学生端：https://mofazhusha-production.up.railway.app/login.html

Railway 自动从 main 拉新代码部署，chichu 不用手动操作；但他要 URL 来刷新自己的 Chrome 看效果。**chichu 已明确说"下次不要让我提醒"**。

这条比一般的 dev server URL 规则更严格 —— 那条是 localhost dev server，这条是 production URL。

## 怎么贴

- 单独 1-2 行，例如：
  > 🌐 1-2 分钟 Railway 部署完，刷新 https://mofazhusha-production.up.railway.app/
- 涉及老师后台改动也贴 `/admin.html`
- 涉及学生端改动贴 `/`（自动跳 `/login.html`）
- **URL 后留空格 / 换行**，别让中文紧贴（看 url_separator 那条）

## 触发的强制场景

- 任何 `public/*.html` / `public/*.js` 改动
- 任何 backend 接口行为改动（chichu 要去 UI 验证）
- 任何样式 / 动画 / UI 流程改动
- 部署 / 配置改动让线上行为变化

## 不触发的例外

- 改纯文档（DESIGN_QA / README / memory）→ 不强制
- 改测试 / 配置 / 后端纯逻辑不影响 UI → 不强制

## 项目技术细节

- **后端**：Node.js + Express + Socket.io + `node:sqlite`（带 polyfill `db.transaction()`）+ bcryptjs + express-session
- **前端**：纯 HTML/CSS/JS，VT323 像素风（MC 主题），skinview3d 3D 角色
- **数据库迁移**：`db.js` 用 `ensureColumn()` 幂等加字段
- **皮肤系统**：HD 256×256 + 标准 64×64 都支持；自定义皮肤存 `/data/user-skins/{userId}.png`
- **新手教程**：第一次登录自动弹 5 步，**不能跳过**，走完送「西瓜杀手」皮肤
- **规则源**：`C:\obsidian\obsidian本机存储\2026年 \游戏\嬷法师\游戏规则1.0.pdf`
- **测试**：`npm test` 跑 node:test，43 个测试

## chichu 身份

- GitHub: `xing0325` (PAT 在 `github_credentials.md`)
- 老师角色，学生群体面向真实课堂

---

> 来自 2026-05-20 memory 整理同步会话（claude）
