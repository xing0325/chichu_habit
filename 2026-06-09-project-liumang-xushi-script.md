# 《流氓叙事》大型剧本杀 OCR + 故事圣经(project_liumang_xushi)

**类型:** project(项目档案)
**记录日期:** 2026-06-09

大型多人沉浸式剧本(剧本杀)**《听完千禧年最后一首郁穆婉转的歌,带我们走向赤道》**(主题词「流氓叙事」;英文 *WE HEAD TO THE EQUATOR AFTER LISTENING THE LAST AND STATELY CANTONESE SONG OF THE MILLENNIUM*)。用户目标:**在原剧本基础上做改写 / 续写 / 创作**(2026-06-09 确认)。

## 体量与结构

- 6 名可玩角色(其中「程聿怀」有男 / 女两版本)× A/B/C 三轮本 = **21 本 / 1845 页 / ~59 万字**。
- A 本 = 幕 1–4 背景(1972–2000 千禧年大屠杀);B 本 = 幕 5–6(2001–2005「怒河」复仇);C 本 = 终幕真相 + 各角色结局。
- 诗化第二人称;政治史诗 + 群像悲剧 + 三对虐恋;**六死二生**(仅缪宏谟、黛利拉幸存)。

## 文件位置(均在 `C:\高清电影中转站\流氓叙事剧本\`)

- 原始 PDF(图片版,**无文字层**):`A\` `B\` `C\`
- OCR 纯文本:`_OCR_TEXT\A|B|C\*.txt`;规范名副本 `_OCR_TEXT\bible_src\<A|B|C>-<角色>.txt`
- **总纲(先读):** `_OCR_TEXT\故事圣经_总纲.md`
- 21 份逐本细档:`_OCR_TEXT\bible_parts\<A|B|C>-<角色>.md`(每本含逐场景 beat + 原文金句 + 页码)
- OCR 脚本:`_OCR_TEXT\..\_ocr_runner.py`

## 核心真相网(剧透,创作须守)

- **程聿怀 = 布雷族军师「延迟」**(全场最大身份反转;2003 被刺杀的是替身)。
- **羌青瓷 = 瑞法·莱诺**——敌人外壳下,是为程聿怀火柴催眠抹忆十年、最后献心脏芯片而死的初恋(每本结尾「心理治疗主持人」即 ta)。
- **伯纳德·莱诺** = 操盘种族屠杀的大反派,用「失明圣女」骗局(弄瞎以撒之妹撒该→塑成布雷圣女→死于同族)点燃屠杀。
- **缪宏谟**在枪口下亲手摘了撒该的眼角膜(以撒至死不知);**将伯驾**「受控燃烧」救五万人、被迫勒死肖须言。
- 三对虐恋:以撒×缪宏谟、将伯驾×程走柳、程聿怀×羌青瓷。
- 主题句:**「战争只是工具,利益才是目的。」**

## OCR 工具链经验(可复用)

- 中文图片版 PDF → 用 **`py -3.12`**(系统 Python 在 `C:\Users\david\AppData\Local\Programs\Python\Python312`;注意 agent 自带的 hermes venv **无 pip**,别用)。
- **PyMuPDF**(渲染页面 180dpi + 检测有无文字层)+ **`rapidocr-onnxruntime`**(CPU/ONNX,中文识别强、纯 pip、适配本机无 CUDA;优于 Tesseract 中文,装起来比 PaddleOCR/EasyOCR 省事)。
- 1845 页用 **4 进程并行 + 断点续传**(逐页 flush),约 30–40 分钟跑完。
- 通读:派 **21 个 sonnet reader-agent** 逐本读全文(必须分页 Read 到 `page N/N`)+ 蒸馏成结构化 md,再汇编总纲——避免把 59 万字硬塞单一上下文。

## 关联习惯

- 评估 / 创作中文稿件:调性 ≠ 质量,要能交稿(chinese-writing-quality)。
- 锁定的设定别在后续模糊描述里被擅自改掉(dont-reinterpret-decisions)。
- 判断「能不能跑某 OCR/模型」先对照主力机配置:无 CUDA(user-hardware-profile)。
- 视觉 / 配图(角色立绘、海报)需求转 Codex 用 image-2(handoff-visual-to-codex)。
