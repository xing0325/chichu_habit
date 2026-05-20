# 2026-05-20 kindle-station 项目（EPUB Remixer + 高亮同步合体）

> 源：memory `project_kindle_station.md`

多用户 web 服务：**upload-relay EPUB 到 Kindle（可选 Claude 魔改）+ bookmarklet 抓高亮回流**。chichu 和朋友用。

## 当前形态

把原计划的 `epub-adhd-remixer`（本地单用户）和 `kindle-highlight-sync`（多用户高亮同步）**合体**成一个服务。

2026-05-20 pivot：chichu 提出"新书都上传到我们 → 我们转发到 @kindle.com"，这天然就是 Remixer 的中转管线，所以两边合并。

## 目录

`C:\Users\david\kindle-highlight-sync\`（文件夹暂沿用老名字，未来可改名为 `kindle-station`）

## 完整数据流

```
用户上传 EPUB
  → 我们解析 + 可选 LLM 魔改（钩子章节 / 回忆卡 / 减速带）
    → SMTP 转到他的 @kindle.com
      → 用户在 Kindle 双端读 + 划线
        → bookmarklet 抓 read.amazon.com/notebook
          → 高亮回流到我们后台关联到对应书
```

## 已就绪文档

- **统一 spec**：`docs/superpowers/specs/2026-05-20-kindle-station-unified-design.md`（**当前正解**）
- **老 spec**：同目录的 2026-05-19 两份已标 SUPERSEDED
- **POC**：`poc/bookmarklet-test.html`（独立可跑，未在真 Amazon 验证过 DOM）
- **plan**：**还没写** —— 下一步要重做统一 plan（合并原 17+13 任务，去重，~9 天工程量）

## 关键架构决策

- 多用户 web on **Railway + Postgres + Volume**
- **magic-link 登录**，邀请制
- 每用户配置自己的：@kindle.com、SMTP（Gmail app password 最常见）、Anthropic API key
  - **API key 未填则 remix 按钮 disabled** —— 避免 chichu 给朋友 LLM 费用兜底
- 用户 SMTP 密码 + Anthropic key 用 **Fernet 对称加密**存 Postgres
- bookmarklet 在用户浏览器跑、**零 Amazon 凭据上传**
- 注入 EPUB 的 HTML 极简（h1/p/em，零 CSS）扛 KFX 转换

## 两大风险

1. **Amazon EPUB→KFX 转换可能破坏注入页排版** → M3 完成立即真机验证，不通过回头降复杂度
2. **read.amazon.com/notebook DOM 改版** → bookmarklet selector 抽 config，fixture 测试守护

## 老文件夹处理

`C:\Users\david\epub-adhd-remixer\` 留盘，加了 `SUPERSEDED.md` 指过来；Task 4-9 的代码块（ingest / plan-schema / remixer / writer / dispatcher / pipeline）开工时直接复制过来用，不要重新发明。

## How to apply

- chichu 问"读书项目怎么样" → 拉这份，引 unified spec
- chichu 问"先做哪个项目" → **已经不分两个了，是一个项目**
- POC 跑通后再启动 implementation plan 重写
- 还没推 GitHub，等 chichu 授权

---

> 来自 2026-05-20 memory 整理同步会话（claude）
