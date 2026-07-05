# 测量不确定度库

测量不确定度库指 `LunarUncertainty`。它建立在 LunarUnits 的 `Quantity`、单位换算和量纲检查之上，负责表达“带单位测量值 + 标准不确定度”，并提供常见的一阶不确定度传播规则。

## 职责

- 表示 `value ± standard_uncertainty` 形式的测量值。
- 构造时复用 LunarUnits 的量纲检查和单位换算。
- 换算时同时转换名义值和不确定度。
- 加法、减法使用平方和开根传播绝对不确定度。
- 乘法、除法和整数幂使用相对不确定度传播。
- 提供 `checked_*` API 处理量纲不兼容或零名义值等可恢复路径。

## 与核心库的关系

LunarUnits 只负责单位、数量、换算、解析和格式化等通用语义；LunarUncertainty 在这些能力之上增加测量语义。这个边界让核心库继续保持通用，同时让工程和科学计算可以保留测量误差，而不是把不确定度退化成裸 `Double`。

## 示例场景

- 速度测量：`distance / time` 得到 `m/s`，并传播距离和时间的不确定度。
- 密度测量：`mass / volume` 可从升换算到 `kg/m^3`。
- 电功率测量：`voltage * current` 自动组合为瓦特，并传播电压和电流的不确定度。

## 统计边界

`LunarUncertainty` 当前面向对称标准不确定度和独立变量的一阶传播。它不把不对称区间、协方差、概率分布、Monte Carlo 或置信区间塞进 LunarUnits 核心层；需要这些语义时，可以在测量不确定度库之上继续扩展。

## 项目入口

- GitHub：<https://github.com/FrozenLemonTee/LunarUncertainty>
- API 文档：<https://mooncakes.io/docs/FrozenLemonTee/LunarUncertainty@0.1.1>
