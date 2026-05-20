# 2026-05-20 中文语音输入 → CapsWriter-Offline

> 源：memory `reference_voice_input_capswriter.md`

Windows 上给 Claude Code 桌面端做中文语音输入，**正解是 CapsWriter-Offline**。Whispering 会翻车，不要再走那条路。

## 项目

CapsWriter-Offline — github.com/HaujetZhao/CapsWriter-Offline

## 装在哪

`C:\Users\david\CapsWriter\CapsWriter-Offline\`

- `start_server.exe` —— 服务端（加载模型）
- `start_client.exe` —— 客户端（监听 CapsLock + 输出到焦点窗口）
- `hot.txt` —— 热词表（自定义术语）
- `config_server.py` —— 服务端配置（`model_type` 字段切引擎）

## 用法

按住 **CapsLock** 说话，松开自动落字到当前焦点窗口。

## 当前引擎

Paraformer（CPU，~240MB ASR + ~280MB 标点）。

Intel Arc 集显可以升级到 Qwen3-ASR 拿更高准度。

## 前提

- VC++ 2022 Runtime ✓ 已装
- **Defender 必须排除** `C:\Users\david\CapsWriter` —— PyInstaller EXE 否则会被吃

## 为啥不用 Whispering（已踩坑）

- Whisper 模型对短句中文识别翻车（容易输出 "Thank you" 之类幻觉）
- Whispering 在 Windows + 中文场景自动粘贴有 bug
- 通知刷屏 UX 极差

## 备选

**讯飞输入法 PC 版** 是次选 —— 输入法形态，云端识别强，但要警惕全家桶捆绑和数据上云。

---

> 来自 2026-05-20 memory 整理同步会话（claude）
