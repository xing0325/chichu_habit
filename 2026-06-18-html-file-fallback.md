# 习惯:web 项目同时给 localhost + file:// 的 HTML 兜底地址

记录日期:2026-06-18

每次改 web 项目、贴 localhost dev server URL 时,**同时再给一个 `file:///` 的本地 HTML 地址兜底**。

## Why
dev server 空闲一段会被自动关。挂了之后,用户想直接在文件资源管理器/浏览器地址栏**粘贴地址打开**,不用等 AI 重启服务器。

## How
- 一般静态单文件项目:直接给 `file:///.../xxx.html`。
- **ES 模块/多文件项目(import/export):浏览器禁止 file:// 加载本地模块(CORS),直接给会白屏。** 需先把项目**内联打包成自包含单文件**(模块全内联、Three.js 等第三方走 CDN),例如写个零依赖 `build.mjs` 输出 `play.html`,再给该文件的 `file:///` 地址。**每次更新记得重新打包。**
- localhost 和 file:// 两个地址**各占一行**(避免中文紧贴 URL 被识别成路径)。
