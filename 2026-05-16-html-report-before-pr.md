# 2026-05-16 推送 PR 前提醒做 HTML 版报告

> 源：memory `feedback_html_report_before_pr.md`（originSessionId `0ec6d790...`）

在 chichu 准备好要**推送 PR / 提交 PR / 把 PR body 写完**时，主动提醒：

> 要不要顺手再做一个 HTML 版的汇报页面（一屏可视化）？放进 `public/` 让 Cloudflare Pages 部署，丢群里给同事看比 Markdown 直观。

## 为什么

chichu 认同 HTML 版报告比 Markdown 更适合"让团队 5 秒看完关键数据"。Markdown 版进 PR body（GitHub 友好），HTML 版作为"汇报版"丢群通知。**两份并行不冲突**。

## 先例：PR #83

这次做了双版本，参考 `public/pr-report.html` 模板：
- Hero + 大数字卡片
- 类别用真实组件 chip 渲染
- 流程用编号步骤 + 卡片
- 多轮数据用时间线卡片
- 链接用大按钮卡片
- Followup 用左色条小卡片
- 全部锁项目色板（ink + 马卡龙）

## 何时触发提醒

- chichu 说"提 PR" / "推 PR" / "起草 PR"
- chichu 说"差不多了，写 PR 吧"
- 已经在写 PR description / body
- 已经跑了 `gh pr create` 但 PR 还在 draft 状态可改

## 怎么提

在 PR 草稿 / 提交流程里夹一句，比如：
> 顺便问一下：要不要顺手做一个 HTML 版的汇报页面？放 `public/pr-report.html` 让 Cloudflare 部署，给同事看比 PR body 直观一档。

**如果 chichu 拒绝就 skip；不要每次重复问同一件事。**

---

> 来自 2026-05-16 chichu_habit 批量同步会话（claude）
