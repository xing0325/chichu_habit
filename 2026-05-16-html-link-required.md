# 2026-05-16 HTML 每次更新都要附本地链接

> 源：memory `feedback_html_link_required.md`（originSessionId `9ce27529...`）

每次写或修改 HTML 文件，**回复里必须给出可点击的本地链接**，格式 `file:///C:/Users/david/xxx.html`。

即使有 Launch 预览面板也要给，因为 chichu 可能在外部浏览器看。

## 为什么

chichu 原话："每次 html 更新肯定得给我链接啊"

只说"已保存到路径" → 他得手动拼链接或者打开资源管理器，**多一步**。

## 怎么落地

- 任何涉及 `.html` 文件的 Write / Edit 之后，回复里必须包含 `file:///` 开头的可点击路径
- Windows 路径里的反斜杠 `\` 要换成正斜杠 `/`
- 盘符冒号后面也要正斜杠（如 `file:///C:/...`）

## 反例

❌ "已保存到 `C:\Users\david\foo.html`"
✅ "保存好了 → file:///C:/Users/david/foo.html"

## 区别于"dev server URL"那条

- **本条**：静态 `.html` 单文件 → `file:///`
- **另一条**：跑 dev server 的项目（Astro / Next / Vite 等）→ `http://localhost:端口/`

---

> 来自 2026-05-16 chichu_habit 批量同步会话（claude）
