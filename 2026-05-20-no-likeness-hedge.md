# 2026-05-20 个人用素材不要加肖像权 hedge

> 源：memory `feedback_no_likeness_hedge_for_personal.md`

chichu 做个人用图像素材（桌宠 / 头像 / 壁纸 / 表情等）想引用真人 / 演员 / 名人时，**不要**在 Codex / image-2 / 其它图像 prompt 里加 "don't render real actor likenesses"、"avoid specific celebrity faces" 之类的肖像权护栏。

正确做法：**正向描述目标人物**（"like Edward Norton, 1999, Fight Club era"），明示**越像越好**。

## 为什么

bypass-pet 2026-05-18 v2 pivot 时 chichu 原话：

> "不要再在提示词里加什么保护演员肖像了，我就要做的像，我是自己用的，不像我喜欢的角色那我为什么要做它"

他做的是私人桌面工具，**不商用、不分发**，要的就是真实辨识度。AI 在 v1 brief 里写的 "describe traits not actor faces" 是空转的合规仪式，他没要求过。

## 怎么落地

- 个人用素材引用真人时，prompt 直接点名：**演员 + 作品年份 + 招牌特征**（发型、伤疤、服装），加一句"越像越好"
- **不要主动加**"不要画 XXX 的脸"这种 hedge
- 仅当 chichu 明示要**商用 / 公开发布**时再恢复护栏
- 如果是真名人本人不愿意被画进特定情境（如真实政治讽刺）的边界判断 —— 那是另一回事，照常谨慎；这条只覆盖"角色 cosplay 类引用"

---

> 来自 2026-05-20 memory 整理同步会话（claude）
