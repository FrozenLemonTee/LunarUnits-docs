# 案例

本页整理来自 `LunarUnits/examples/examples.mbt` 的可运行示例。每个主题都对应已经纳入 `moon test` 的行为，用于展示 LunarUnits 在真实工程计算边界上的作用。

## 主题索引

| 主题 | 覆盖能力 | 页面 |
| --- | --- | --- |
| 基础力学与换算 | 数量构造、单位组合、同量纲换算、量纲错误拒绝 | [基础力学与换算](./mechanics-and-conversion.md) |
| 扩展维度 | information、angle、frequency 与 angular frequency | [扩展维度](./extension-dimensions.md) |
| 货币、计数与费率 | 注入汇率、money/time、money/count、count 消去 | [货币、计数与费率](./money-count-rate.md) |
| Parser 与 Formatter | Catalog、文本解析、ASCII/SI/LaTeX 输出 | [Parser 与 Formatter](./parser-and-formatting.md) |
| 仿射与对数尺度 | 温度点/差值、时间点、dB level/gain | [仿射与对数尺度](./affine-and-logarithmic.md) |
| 力矩与能量 | 相同基础量纲下的不同物理语义 | [力矩与能量](./torque-vs-energy.md) |
| 显热计算 | 公式计算生态中的单位归一化输出 | [显热计算](./sensible-heat.md) |

## 示例来源

Cookbook 按使用场景组织已经测试过的 examples。这样可以降低文档漂移风险，也让读者从“要解决什么问题”进入，而不是从包目录结构进入。

核心示例源文件：[`examples/examples.mbt`](https://github.com/FrozenLemonTee/LunarUnits/blob/master/examples/examples.mbt)。