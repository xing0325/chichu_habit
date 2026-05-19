---
name: 第三方账号同步首选 bookmarklet 而非账号密码
description: 用户/朋友共用的"抓取第三方平台数据"场景，默认 bookmarklet / 插件，不存账号密码或 cookies
type: feedback
---

需要从用户的第三方账号（Amazon Kindle、Goodreads、微信读书 web、Notion 等没有官方 OAuth 的）抓数据时，**默认提议 bookmarklet 或浏览器插件**方案，**不存账号密码、不存 cookies**。

**Why**：
- 第三方风控 / 2FA / captcha 会让 headless 自动登录跑不通或被掐号
- 存账号密码 = 朋友账号被牵连的法律责任（PIPL 敏感信息），用户明确不愿意承担
- bookmarklet 在用户自己浏览器跑，第三方眼里就是真人正常操作，**根本不被识别为自动化**——这是天花板
- Readwise / Bookcision / Klib 等同类工具全都用 bookmarklet/插件，密码方案没有先例不是没人想到，是行不通

**How to apply**：
- 用户说"我想做一个抓 X 网站数据的网站，朋友也用"——直接给 bookmarklet 方案，**不要**先问"要不要存密码"
- 把方案降级路径排好：bookmarklet（推） > 浏览器插件（体验顺，要发版） > cookie 粘贴（次选） > 账号密码（**几乎永远不选**）
- 解释时点名 2FA + captcha + 风控 + 法律责任四件套，让用户理解不是技术做不出
- 工程上：bookmarklet 是 JS 文件，服务器端用 per-user 长期 token 接收 POST，CORS 白名单第三方域
- 例外：用户自己的账号、自己机器跑、能接受 2FA 输码——这种本地工具可以例外（但还是建议不存密码，用一次性 session）
