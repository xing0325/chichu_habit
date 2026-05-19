# 第三方账号同步首选 bookmarklet 而非账号密码

> 源：memory `feedback_bookmarklet_over_password.md`
> 日期：2026-05-19
> 起因：用户说"做一个 kindle 划线同步网站，朋友也用，上传账号密码同步"——我必须 push back

## chichu，将来 xing0325 又提"做个抓 X 网站数据的工具，朋友也用"时，记住

### 默认方案排序
| 优先级 | 方案 | 体验 | 安全 | 反爬扛性 | 工程量 |
|---|---|---|---|---|---|
| **首推** | bookmarklet | 收藏栏点一下 | ⭐⭐⭐⭐⭐（零密码零 cookie） | ⭐⭐⭐⭐⭐（真人会话） | 小 |
| 次推 | 浏览器插件 | 自动定时 | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | 中（要发 Chrome Web Store） |
| 折中 | cookie 粘贴 | 中等麻烦 | ⭐⭐⭐（cookie 短期暴露） | ⭐⭐⭐ | 小 |
| **几乎永远不选** | 账号密码 | 看似最简 | ❌ | ❌ | 死路 |

### 用户提"密码方案"时，**不要妥协**。把这 4 件套甩出来：

1. **2FA 障碍**：现代账号大多开 2FA（SMS / TOTP），密码 + 2FA 自动登录意味着每次都让用户输 OTP，体验稀烂；绕过 2FA 是违法。
2. **Captcha**：到一定频率（每天 N 次）必触发图形/SMS 挑战，自动化等于死循环。
3. **风控锁号**：从机房 IP 反复登录会**锁朋友的整个账号**——Amazon 锁会带走 Prime/支付/订单史，朋友会真的恨他。
4. **法律责任**：存别人账号密码 = 《个人信息保护法》敏感信息超范围收集，民事 + 刑事都沾。"非商用"不是免责。

### 业内事实（说服用户用）
Readwise / Bookcision / Klib / kindle-notes-py / Goodreads importers —— **没有任何一个用密码方案**，全是 bookmarklet 或浏览器插件。这不是没人想到，是十年来无数人撞过墙之后的共识。

### 工程实现要点
- bookmarklet 本体是 `javascript:(async()=>{...})()` 单行
- 真正的脚本服务器存（如 `static/bookmarklet.js`），bookmarklet 里 fetch + eval
- 这样脚本升级**用户不用换书签**
- 服务器端 per-user 颁发长期 `Bearer` token，可撤销重发
- CORS 白名单第三方域名（如 `https://read.amazon.com`）
- 限流：每 token 10 次/分钟够了

### 例外（可考虑账号密码）
- 用户**自己**机器跑、**自己**账号、用户能接受**每次输 OTP** —— 这种本地工具可以例外
- 但即使例外，也建议存 session cookie 不存密码，cookie 一过期重新走完整登录

### 写进 spec 的话术
在 spec 里有"鉴权"章节时直接开篇加："**绝不接受 Amazon 账号密码或 cookie 上传。**"加粗。后面再讲 bookmarklet。
