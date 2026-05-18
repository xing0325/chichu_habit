# 项目名 + 昵称自动进 CapsWriter 热词

> 源：memory `feedback_project_names_to_capswriter_hotwords.md`
> 日期：2026-05-18
> 用户原话："我的每一个项目都变成热词，然后还可以在我的 session 里面识别'我称呼这个项目的常用名'也加入热词"

## chichu，下次帮 David 工作时，记住：

### 核心规则

**每次接触一个项目，确保它的名字、音近别名、David 在对话中用的昵称，都在 CapsWriter 的 `hot.txt` 里。** 不用问，直接加。

### 为什么

David 用 CapsWriter 语音输入跟我说话和发指令。项目名是他每次会议/对话/提示词里都会说的高频词。如果没在 hot.txt 里，"mofazhusha" 会被听成"摸法主沙"，"chichu_habit" 会被听成"吃醋哈比特"。他每次都得手动改 = 体验崩。

### 怎么干

1. **触发时机**：
   - Session 开始接触某项目（首次提及、`cd` 进它的目录、做任何 git/写代码动作）
   - 检查 `C:\Users\david\CapsWriter\CapsWriter-Offline\hot.txt`
2. **不在就加，结构是**：
   ```
   英文名 | 中文名 | 音近别名1 | 音近别名2
   ```
   例如：
   ```
   嬤法大逃杀 | mofazhusha | 嬷法大逃杀 | 摸法主沙 | 魔法逐杀
   ```
3. **抓 session 内的昵称**：
   - David 常用简称（"嬷法"、"钥匙站"、"管家本"）→ 加进去
   - 他对项目某部分的特征叫法（"那个 Railway 上的"）→ 加进去
4. **位置**：放在 `# ====== David 常用术语（CapsWriter 自动维护） ======` 块下，可分子标题如 `# 项目`
5. **保存即生效**，不用重启 CapsWriter server

### 已知项目（截止 2026-05-18，hot.txt 里已有）

| 项目 | 别名 |
|---|---|
| 嬤法大逃杀 | mofazhusha / 嬷法大逃杀 |
| 钥匙玩校 | kiidschool / 钥匙玩学 |
| chichu_habit | 吃醋哈比特 / chichu habit |
| 振贝笔 | Vibe pen / 维布笔 |

下次有新项目，加完同步更新这张表。

### 别加进 hot.txt 的东西

- **一次性词汇**：某次讨论里出现的特定函数名/变量名（用完就过期）
- **天然识别准的普通词**："代码"、"项目"、"功能"
- **极短词**（≤2 字）：容易跟其他发音冲突，慎加
- **凭据**：账号名 OK，token/密码**绝对不**写进 hot.txt（这文件会跟着备份走，泄露风险）

### 关联记忆

- `project_*.md` 类型的 memory 里出现的项目名 ↔ hot.txt 应该保持一致
- 装新项目时，更新 `project_xxx.md` 的同时也更新 hot.txt
