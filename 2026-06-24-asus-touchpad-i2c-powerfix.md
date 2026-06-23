# 华硕 Vivobook 触控板时不时失灵的病根 + 解法

> 源：memory `reference_asus_touchpad_powerfix.md`（2026-06-24）

chichu 的主力机是 **ASUS Vivobook S 15 S5506MA**（Intel Core Ultra 7 155H，Win11）。2026-06-24 反馈触控板老抽风：经常失灵、没法移动光标，但外接鼠标（USB/蓝牙）一直好用。

## 排查结论：触控板没坏，是被省电睡死了

- 设备管理器里触控板（`ASUS Precision Touchpad` / `I2C HID 设备 ACPI\ASCF1201\1`）状态 OK、无错误码、无驱动报错；事件日志也没有 I2C/触控板相关错误。所以不是硬件坏、不是驱动崩。
- 真凶：触控板是 **I2C HID 设备**，挂在两个 **Intel Serial IO I2C 控制器**（PCI `DEV_7E78` / `DEV_7E79`）上。这三个设备默认都勾着「允许计算机为省电关闭此设备」。系统一空闲就把触控板连同 I2C 总线一起 selective suspend（进 D3 低功耗），唤醒时偶发握手失败 → 触控板醒不过来，但系统以为它还在线，所以查不出毛病。
- 鼠标走的是 USB/蓝牙，另一条总线，跟 I2C 无关 → 永远好用。这就是"鼠标没事、触控板时灵时不灵"的根因。

## 解法（断根，已验证）

开**管理员** PowerShell，把那三个设备的省电开关关掉（`root\wmi` 的 `MSPower_DeviceEnable` 设成 `$false`）：

```powershell
& {
  $admin=([Security.Principal.WindowsPrincipal][Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltinRole]::Administrator)
  if(-not $admin){ Write-Host '要管理员权限，右键终端→以管理员身份运行' -ForegroundColor Red; return }
  Get-CimInstance -Namespace root\wmi -ClassName MSPower_DeviceEnable |
    Where-Object { $_.InstanceName -match 'ASCF1201|7E78&SUBSYS_1DE31043|7E79&SUBSYS_1DE31043' } |
    ForEach-Object { Set-CimInstance -InputObject $_ -Property @{Enable=$false} }
  Get-CimInstance -Namespace root\wmi -ClassName MSPower_DeviceEnable |
    Where-Object { $_.InstanceName -match 'ASCF1201|7E78&SUBSYS_1DE31043|7E79&SUBSYS_1DE31043' } |
    Select-Object Enable, InstanceName | Format-Table -AutoSize
}
```

成功 = 三个 `Enable` 全 `False`。**没用管理员会报 `0x80041001` 常规故障**（chichu 第一次就栽在没提权上）。回滚把 `$false` 改 `$true` 再跑一遍。也可以走 GUI：设备管理器 → 设备 → 属性 → 电源管理 → 取消那个勾（I2C HID 在「人体学输入设备」，两个控制器在「系统设备」）。

## 临时救活（不断根，哪天又卡死时用）

管理员跑：`pnputil /restart-device "ACPI\ASCF1201\1"`。比 `Disable-PnpDevice` 稳——后者对这个设备会报"常规故障"。

## 其它要知道的

- **华硕 F10 软开关 / NumberPad**（触控板右上角长按那个数字键盘）误触，也会让触控板"看似失灵"，按一下就回，别误判成大问题。由 `AsusHotkey` / `AsusOSD` 进程处理。
- 兜底：Intel Serial IO I2C 驱动现在是 `30.100.2318.58`（2023-05）旧版，真还复发就更新它，或在 MyASUS 重装触控板驱动（ASUS PTP `16.0.0.41`）。
- 这是 **Intel I2C(iaLPSS) + 精确式触控板**平台的常见通病，不限华硕；联想/戴尔/惠普同款都有人中招。判定要点：**鼠标好、触控板间歇失灵、设备管理器却显示 OK**。

来源 session：2026-06-24 触控板排查。
