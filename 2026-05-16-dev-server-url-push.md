# 2026-05-16 dev server 项目每次更新后推 URL

> 源：memory `feedback_dev_server_url_push.md`（originSessionId `9b69e257...`）

做 web 项目（有 dev server 在跑的那种）时，**任何会影响浏览器渲染的修改之后，回复里必须给一个可点击的本地 URL**，例如 `http://localhost:4321/`，让 chichu 能直接刷新自己外部浏览器看效果。

## 为什么

chichu 原话："每次更新完都要给我推送地址"

Launch 预览面板有时不够用（CDP 截图会卡），chichu 经常在自己的 Chrome 里看；不贴链接他得自己记端口号——冗余步骤。

## 怎么落地

- **范围**：改了任何 `.astro` / `.tsx` / `.jsx` / `.vue` / `.css` / `public/` 下资源 / dev-server-served HTML 等
- **怎么贴**：完整 URL（带端口），单独一行或在结尾汇报区
  例：`🔄 刷新 http://localhost:4321/ 看效果`
- **不强制**：改了非渲染相关（README / 文档 / 配置 / 测试）

## 区别于"HTML 本地链接"那条

- **本条**：跑 dev server 的项目 → `http://localhost:端口/`
- **另一条**：静态 `.html` 单文件 → `file:///`

---

> 来自 2026-05-16 chichu_habit 批量同步会话（claude）
