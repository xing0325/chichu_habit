# 奖学金报告写作工作台（找回 + 整理成工程）

**类型**：project / reference（找回"丢失"项目的方法论）
**日期**：2026-06-26

## 项目

「奖学金报告写作工作台」=一个**自包含单文件 HTML** 的结构化写作工具,用来写奖学金成长报告。

- 7 个季度(2024 秋 → 2026 春),每季度三段:**总览(心境状态) / 项目与成果(名称+收获+配图) / 核心收获**
- localStorage 自动保存(key `scholarship_report_local_v1`)、图片上传自动压缩(最长边 1400px / JPEG 0.85)、可加标题/放大预览
- **下载备份 / 导入备份**(JSON,含图片)、**导出报告**(页内预览 → 下载 HTML / PDF)
- 纯前端零依赖;PDF 库 html2canvas+jsPDF 走 CDN

现整理到 `C:\Users\david\scholarship-workbench`:
- `index.html` = 最新版;`archive/` v1–v6(v5 是 `window.print()` 矢量 PDF 版,v6=当前 jsPDF 版)
- `data/奖学金报告备份_2026-05-11(1).json` = 真实内容(~18MB,含图)。开 app 点「导入备份」选它即恢复
- `tools/render_pdf.py` = 最终采用的高质量 PDF 管线(reportlab 矢量中文,`py -3.12`,自动读 data/ 最新备份 → outputs/)
- `.claude/launch.json` 加了 `scholarship` 条目(http.server 8210)预览

## 为什么会"找不到"

它**从没存成工程**,只作为浏览器下载文件躺在 `Downloads\scholarship-report.html`——文件名是英文的,所以用户按"奖学金 / 工作台"怎么搜都搜不到,也不在任何项目目录里。下载文件夹里还有 `_1`～`_5` 五个重名自动改名的版本(=每次迭代后重新下载留下的痕迹)。

## 找回方法论(可复用)

1. **先翻 memory / 项目清单**确认没记录 → 确定要去硬盘捞。
2. **全盘 glob 文件名会超时**(home 目录太大)。改两步:先 `Get-ChildItem -Directory` 摸顶层结构,再**按内容 grep**(`ripgrep` 比文件名遍历快,且默认跳隐藏目录/遵守 .gitignore 自动避开 node_modules),限定 `*.{html,md,js,json,...}` 文本类型。
3. 关键词从直白("奖学金")扩到**英文/拼音**(scholarship/apply/essay/writing)和**界面独特标签**("核心收获""整体感受")。
4. **顺着导出物反查源头**:产物文件名(`scholarship-report.html`、`奖学金报告备份_*.json`)一定写死在源码 `a.download=...` 里 → grep 这个字面量,命中了 **Claude/Codex 的会话 .jsonl 记录**(`.claude\projects\...\*.jsonl`)——即使工程被删,**会话转写里有完整源码和构建过程**,这是终极兜底。
5. **按文件大小区分"程序本体"和"数据导出"**:app 壳 ~30KB,带数据+base64 图片的导出 ~18MB。要抠的是那个 30KB 的最新版,数据另存。
6. 整理成正经工程(index.html + data/ + tools/ + README + archive/)+ 记一条 memory,**根治"下次又找不到"**。

## 验证小坑

preview_screenshot 对**头部带 CDN `<script>` 的页面会卡 30s 超时**(network-idle 永远达不到),但 `preview_snapshot`(无障碍树)能正常拿到完整内容、console 无报错——用 snapshot 验功能,别死磕截图。
