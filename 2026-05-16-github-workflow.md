# 2026-05-16 GitHub 团队协作流程

> 源：memory `github_workflow.md`（originSessionId `0ec6d790...`）

chichu 团队的 GitHub 工作流，由他本人执行，AI 不要替他做不可逆操作。

## 完整流程

1. **拉取最新代码** — 开始任何任务前先 pull
2. **提交 issue** — 发现问题/任务时建 issue，负责人指给自己，正文可 @ 关注人
3. **建分支** — 让 Claude 建分支，分支名与 issue 标题一致
4. **Coding** — 完成任务
5. **写 PR** — 左边选自己分支，右边默认 main；PR 描述写清楚改善点和待改进局限；**必须包含 `Closes #编号`** 关联 issue
6. **等待审批**

## 为什么

团队协作规范，关联 issue 和 PR 便于追踪。

## 怎么落地

- 用户讨论 GitHub 任务时遵循这套流程
- 建分支时分支名取自 issue 标题
- 写 PR 时务必提醒加 `Closes #编号` —— 这是易忘点

---

> 来自 2026-05-16 chichu_habit 批量同步会话（claude）
