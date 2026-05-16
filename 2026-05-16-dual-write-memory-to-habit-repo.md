# 2026-05-16 新 memory 条目要双写到 chichu_habit 仓库

> 源：memory `feedback_dual_write_memory_to_habit_repo.md`

这是一条**元规则**：管"以后怎么往 memory 加东西"。

## 规则

新增 memory 条目时（在 `~/.claude/projects/C--Users-david/memory/` 创建新 `.md` 并更新 `MEMORY.md` 索引），**同时**在 chichu_habit 仓库 (`C:\Users\david\chichu_habit\`) 创建一份对应的独立文档并推到 `origin/main`。

## 标准流程

1. 写 memory 文件（带 frontmatter）
2. 更新 `MEMORY.md` 末尾索引行
3. 写 chichu_habit 仓库的对应文档（无 frontmatter、更口语、写给未来 AI session 看）
4. 命名：`YYYY-MM-DD-<topic>.md`，同日多份用不同 topic 后缀（按 README 规则）
5. `git add` + commit + push

## 排除项（不要双写）

- **凭据 / 密钥 / token**（如 `github_credentials.md`）—— 仓库是 public，推上去 GitHub 几分钟内会自动扫到并吊销 token
- 任何含真实密码、私钥、个人识别信息的条目
- chichu 明确说"只存本地"的条目

## 触发场景

- chichu 说"记下这个习惯"、"写进 memory"、"以后这样做"
- AI 主动识别出值得记的偏好 / 事实，准备写 memory 时
- 跨 session 持续有效的规则、流程、技术事实、项目状态

## 不触发的场景

- 单次会话的临时上下文（不写 memory 就不双写）
- 凭据 / 敏感信息（按上面排除项处理）
- chichu 口头吩咐但没说要 memory 化的（按"自主决策"那条判断）

## 为什么

- **memory** 是给 Claude Code 这一个 AI 看的（带 frontmatter，机器可解析，跨 session 持久）
- **chichu_habit 仓库** 是给**所有未来 AI session 和工具**看的（包括 ChatGPT / Codex / Cursor 等能读到 GitHub 的）
- 两边内容一致 ≠ 冗余，是**不同消费场景**

## 怎么落地

每次准备 Write memory 文件时，多加一步"写一份 habit 仓库版"。可以用相同主体内容，但：

- 去掉 frontmatter
- 用 "chichu" 第三人称，写给未来 AI 看
- 加 `> 源：memory \`xxx.md\`` 引用行
- 加日期 / 来源 session 备注尾巴
- 写完一起 commit + push，**不要拆成两个步骤**

## 反模式

- 加了 memory，但忘了推仓库
- 把凭据 / token 类条目也推了上去（**会让账号被标记**）
- 仓库里改旧文件而不是开新文件（违反 README 的"每次一份新文档"规则）
- 推之前不 pull —— 偶尔别的 session 可能也在推，先 `git pull --rebase`

---

> 来自 2026-05-16 chichu_habit 元规则会话（claude）
