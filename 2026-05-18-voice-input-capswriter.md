# 中文语音输入给 Claude Code 桌面端 → CapsWriter-Offline

> 源：memory `reference_voice_input_capswriter.md`
> 日期：2026-05-18
> 触发：用户问"找个适用于 Claude Code 桌面端的好用的语音输入项目，现在的 Claude Code 不识别中文普通话"

## chichu，下次用户在 Windows 上要语音输入中文给 Claude Code 桌面端时，记住：

### 直接走的方案：CapsWriter-Offline

- **GitHub**：https://github.com/HaujetZhao/CapsWriter-Offline
- **本地装在**：`C:\Users\david\CapsWriter\CapsWriter-Offline\`
- **触发键**：按住 **CapsLock** 说话，松开自动落字到当前焦点窗口
- **架构**：C/S 分离
  - `start_server.exe`（加载模型，监听 6016）
  - `start_client.exe`（监听 CapsLock，连服务端，输出到焦点）
- **当前引擎**：Paraformer（CPU，~240MB ASR + ~280MB 标点）
- **配置文件**：
  - `config_server.py` 里 `model_type` 字段切引擎（`'qwen_asr'` / `'fun_asr_nano'` / `'sensevoice'` / `'paraformer'`）
  - `hot.txt` 自定义热词（音素模糊匹配）
  - `hot-rule.txt` 正则规则替换

### 装的时候踩过的坑

1. **默认 `model_type = 'qwen_asr'`** —— 但官方 models release 里只有 Paraformer/Punct/SenseVoice 三个 zip，**没有 qwen_asr**（要从其他渠道下）。最快上手是改成 `'paraformer'`。
2. **模型路径要保留 zip 里的子文件夹**：
   - `models/Paraformer/speech_paraformer-large-vad-punc_asr_nat-zh-cn-16k-common-vocab8404-onnx/model.onnx`
   - `models/Punct-CT-Transformer/sherpa-onnx-punct-ct-transformer-zh-en-vocab272727-2024-04-12/model.onnx`
   - 用 `Expand-Archive -Path xxx.zip -DestinationPath models/Paraformer/` 就对
3. **VC++ 2022 Runtime 必装**（David 这台 ✓ 已装）
4. **Windows Defender 排除项必须加** `C:\Users\david\CapsWriter\` —— PyInstaller 打的 EXE 不加白名单迟早被吃。需要管理员权限，用户必须手动操作（Win → "Windows 安全中心" → 病毒和威胁防护 → 管理设置 → 排除项 → 添加文件夹）

### 升级路径

GPU 是 Intel Arc 集显，未来想要更准可以：
- **Qwen3-ASR**（★★★★★，~1.5GB）—— 中文 SOTA，DirectML 加速
- **Fun-ASR-Nano**（★★★★，~1GB）—— 准度和速度平衡
- **SenseVoice-Small**（★★★，但有 GPU 加速）

Intel 集显走 DirectML 时，`config_server.py` 里对应引擎的 `vulkan_force_fp32 = True` 防精度溢出。

### 已踩坑、不要再走的路：Whispering

- **GitHub**：braden-w/whispering（Tauri 桌面端）
- **失败原因**：
  - Whisper 模型（ggml-medium / large-v3）对**短句中文**容易输出 "Thank you" 之类幻觉
  - Windows 上自动粘贴到焦点窗口有 bug（识别成功但文字进不去 Claude Code）
  - 状态通知刷屏（每次按热键弹一条），用户体验崩溃
- **卸载干净要删**：
  - `%APPDATA%\com.bradenwong.whispering`
  - `%LOCALAPPDATA%\com.bradenwong.whispering`
  - `%LOCALAPPDATA%\Whispering`（uninstall.exe 通常处理）
  - 注册表 `HKCU:\SOFTWARE\Microsoft\Windows\CurrentVersion\Uninstall\Whispering`

### 次选方案（如果用户拒绝开源工具）

**讯飞输入法 PC 版**：
- IME 形态，按 `Ctrl+.` 触发语音
- 中文识别强（讯飞云端模型）
- 装的时候警惕全家桶捆绑（每一步取消勾选附加组件）
- 缺点：语音过讯飞云、有功能推荐弹窗、需要登录账号

**别推荐**：
- 搜狗输入法（广告太烦）
- 百度输入法（捆绑严重）
- 飞书妙记 / 通义听悟（专业转写，不是实时输入）
- 豆包 PC 客户端（语音只能输入到豆包自己窗口）

### 推荐流程（下次直接走）

1. 询问环境（Windows / Mac，桌面 App / 终端）
2. 确认是中文为主 → 直接推 CapsWriter
3. 用 `Invoke-RestMethod` 拿 latest release
4. `curl.exe -L -o` 下软件本体 + Paraformer + Punct 模型
5. `Expand-Archive` 解压模型到对应子文件夹
6. 改 `config_server.py` 的 `model_type = 'paraformer'`
7. **提醒用户加 Defender 白名单**（必须手动）
8. `Start-Process start_server.exe` 后等 6016 端口监听
9. `Start-Process start_client.exe`
10. 让用户按 CapsLock 测一句

### 善后

- 提醒用户做开机自启：`shell:startup` 文件夹放快捷方式
- 提醒预填热词：Claude Code / MCP / Anthropic / 用户常用术语
- 不要主动启用 GPU 引擎，等用户用 Paraformer 一段时间觉得不够再升级
