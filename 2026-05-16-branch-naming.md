# 2026-05-16 不要按 GitHub 用户名筛分支

> 源：memory `feedback_branch_naming.md`（originSessionId `0ec6d790...`）

**不要假设分支名会包含作者的 GitHub 用户名。**

## 为什么

chichu 团队（`bibabo-app` 仓库）的分支命名是按**功能 / 日期 / 任务**，例如：
- `ivy-0430-答题界面字体格式pilled`
- `feat/mini-card-renderer`
- `fix/32-srs-hlr-unification`

不会出现 `xing0325` 这类作者名前缀。前任 AI 用 `git branch -r | grep xing` 筛分支，被 chichu 指出"当然没有"。

## 怎么落地

当 chichu 说"我的分支"时，**不要**用用户名 grep。改用以下方式定位：

1. 直接问 chichu 分支名
2. 用 `git log --author=` 或遍历分支查 `%an` 作者名（chichu 的 git author 名可能是中文/英文实名，不是 GitHub username）
3. 让 chichu 从最近活跃分支列表里挑

---

> 来自 2026-05-16 chichu_habit 批量同步会话（claude）
