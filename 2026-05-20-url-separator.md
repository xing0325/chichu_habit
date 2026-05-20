# 2026-05-20 URL 和中文之间必须有分隔（不要让链接被中文括号污染）

> 源：memory `feedback_url_separator.md`

聊天客户端 / 终端 / 部分 Markdown 渲染器的**自动识别 URL 算法**会贪心地把 URL 后面紧贴的字符（尤其中文括号 `（）`、箭头 `→`）当成 URL 的一部分。

## 反面示例（会导致 404）

```
打开 https://mofazhusha-production.up.railway.app/（电脑窗口最大化）→ 注册新号
```

chichu 点击或复制后浏览器实际请求：

```
https://mofazhusha-production.up.railway.app/（电脑窗口最大化）→ 注册新号
```

server 收到 `GET /（电脑窗口最大化）→ 注册新号` → 没匹配路由 → `Cannot GET /xxx`

## 正确做法

### 1. URL 单独占一行

```
打开下面链接：
https://mofazhusha-production.up.railway.app/

电脑窗口最大化 → 注册新号
```

### 2. URL 后留**英文空格**或换行

```
打开 https://mofazhusha-production.up.railway.app/  电脑窗口最大化 → 注册新号
                                                  ↑ 两个英文空格做隔离
```

### 3. 用 Markdown 链接语法包起来

```
[打开预览](https://mofazhusha-production.up.railway.app/)
```

## 触发场景

只要回复里同时有：

- HTTP / HTTPS URL
- URL 之后紧贴的中文括号 `（）`、中文逗号 `，`、中文句号 `。`、箭头 `→`、`、`

→ **必须**按上面做隔离。

## 不只是 mofazhusha 项目

任何项目里贴预览 URL / dev server URL 都要这样做，**默认行为**。

---

> 来自 2026-05-20 memory 整理同步会话（claude）
