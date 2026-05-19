# URL 后面紧贴中文会被聊天客户端吃进去 → 404

> 源：memory `feedback_url_separator.md`
> 日期：2026-05-19
> 起因：mofazhusha 项目 push 后给的预览链接被中文「（电脑窗口最大化）→」污染，用户点开看到 `Cannot GET /%EF%BC%88%E7%94%B5...`

## chichu，写 URL 时记住：

聊天客户端、Telegram、企业微信、终端、Markdown 渲染器的「自动识别 URL」算法都**贪心**，会把 URL 后面紧贴的字符吃进 URL，**中文括号 `（）` 和箭头 `→` 是重灾区**。

### 反面（404 翻车）

> 打开 https://example.com/（窗口最大化）→ 注册

→ 浏览器实际请求 `/（窗口最大化）→ 注册` → 服务器 404

### 正面做法（任选一）

**A. URL 单独一行**

```
打开预览：

https://example.com/

然后窗口最大化 → 注册
```

**B. URL 后留双英文空格**

```
打开 https://example.com/  然后注册（注意两个空格）
```

**C. 用 Markdown 链接语法**

```
[打开预览](https://example.com/)，然后注册
```

## 触发场景（强制隔离）

回复里同时有：
- HTTP / HTTPS URL
- URL 紧后面的中文标点 `（）` `，` `。` `、` 或箭头 `→`

→ 必须按上面 A/B/C 隔离。**这是 default behavior**，不限定项目。

## 为什么写这个

xing0325 在 mofazhusha 项目里因此踩坑过一次，浪费了排查时间。其他项目（钥匙玩校 / EPUB Remixer / lando-teardown）以后贴预览 URL 时也用这个规则，他不会再说一次。
