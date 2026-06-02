# 西门子 SITRAIN 培训站 demo（商单）

> 类型：project ｜ 记于 2026-06-02

**背景**：西门子（Siemens）商单——做一个工业培训查看网站，要求「模仿 https://sc.yaowee.cn 的结构」+「做好看」+「先给一个部署好的 demo」。用户指示：尽量多 sub agent、尽快出 demo、不计 token。

**关键事实**
- 参考站 `sc.yaowee.cn` 实为「曜文·小红书运营知识库」——只借**结构骨架**（Hero + 数据条 + 6 学习路径 + 工具合集 + 评价 + 页脚），内容全换成西门子。
- 工程：`C:\Users\david\siemens-training`，**纯静态、无构建**，3 页：
  - `index.html` 首页（含会动的「工业控制台」诊断面板）
  - `catalog.html` 课程目录（路径/等级筛选 + 搜索，`?track=` 预筛选）
  - `course.html` 培训查看页（视频播放器 + 章节目录 + 你将学到 + 讲师 + 侧栏报名/进度，`?id=` 指定课程）
- 内容 = 西门子 SITRAIN 题材（SIMATIC S7/TIA Portal、SINAMICS 驱动、PROFINET、工业边缘/Insights Hub、功能安全），17 门示例课程，**全为 demo 示例数据**；`SIEMENS` 字标为占位，未用受商标保护的官方 logo（正式交付要确认授权）。
- 美学 = 「Engineered Editorial」：editorial design skill 打底融合 **Siemens iX** 令牌——Petrol `#009999`、交互主色 `#006e93`、电光青 `#00eaff`、4px 直角；字体 Archivo + IBM Plex Mono；**亮/暗双主题**（暗色 = 西门子「工业驾驶舱」观感）。
- 本地预览：`.claude/launch.json` 配置名 `siemens-training`，python http.server 端口 **8140**。
- 仓库 https://github.com/xing0325/siemens-training ；线上 **https://xing0325.github.io/siemens-training/**（GitHub Pages，main 分支根目录；全页已验证 HTTP 200，零控制台报错）。

**状态**：v1 demo 已部署上线，等用户/客户反馈再迭代美化。
**下一步候选**：真实工业配图（走 Codex + image-2，别用占位/emoji）、加登录/学员仪表盘/证书页/询盘表单、确认客户主推产品线（TIA Portal / 驱动 / 数字化）。
