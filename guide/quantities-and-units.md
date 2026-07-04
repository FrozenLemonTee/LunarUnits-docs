---
prev:
  text: 快速开始
  link: /guide/getting-started
---

# 三层模型

LunarUnits 的核心使用模型由三层组成：`Dimension`、`Un` 和 `Quantity`。理解这三层之后，单位换算、量纲检查、领域构造函数和文本解析都会更容易定位到各自的职责。

```text
Quantity = value + Un
Un       = symbol + scale + Dimension
Dimension 描述物理意义
```

以 `9.8 m/s^2` 为例：

- `Dimension` 是 `length / time^2`，决定它能不能和另一个量相加或换算。
- `Un` 是 `m/s^2`，决定当前用什么单位表达，以及和其他同量纲单位的比例关系。
- `Quantity` 是 `9.8 m/s^2`，也就是“数值 9.8 绑定到单位 `m/s^2`”。

## 三层分别负责什么

| 层 | 主要问题 | 示例 | 日常使用频率 |
| --- | --- | --- | --- |
| `Dimension` | 物理意义是否兼容 | `length / time^2` | 偶尔直接使用，多见于扩展维度 |
| `Un` | 用什么单位表达，以及如何换算 | `meter / second.pow(2)` | 常用，尤其是构造和换算目标 |
| `Quantity` | 某个数值带着哪个单位参与计算 | `Quantity::new(9.8, meter / second.pow(2))` | 最常用 |

用户代码通常从 `Quantity` 开始。只有在定义单位、判断兼容性、扩展维度或解释错误时，才需要直接看 `Un` 和 `Dimension`。

## 从单位构造数量

底层构造方式始终是 `Quantity::new(value, unit)`。领域构造函数只是把常用单位包装成更可读的入口。

```text
let raw = @quantity.Quantity::new(1000.0, @si.meter)
let distance = @qgeometry.kilometers(1.0)
let load = @qmechanics.kilonewtons(2.0)

assert_eq(raw.value(), 1000.0)
assert_true(distance.unit().is_compatible(@geometry.kilometer))
assert_true(load.dimension().is_same(@mechanics.newton.dimension()))
```

这三种数量最终都是 `Quantity`。领域构造函数不会引入新的数量类型，也不会绕过运行时量纲检查。

## 量纲决定能否加减和换算

加法、减法和单位换算要求量纲兼容。单位可以不同，但必须描述同一种物理意义。

```text
let total = @qgeometry.meters(1.0).add(@qgeometry.kilometers(1.0))

assert_eq(total.value(), 1001.0)
assert_true(total.unit().is_compatible(@si.meter))

let length = @qgeometry.meters(1.0)
let duration = @qsi.seconds(1.0)

assert_true(length.checked_add(duration) is None)
assert_true(length.checked_to(@si.second) is None)
```

这里的检查发生在 `Dimension` 层：长度和长度可以相加，长度和时间不能相加；长度可以换算成英尺或千米，不能换算成秒。

## 单位决定当前表达方式

同一个物理量可以用不同单位表达。换算会改变数值和单位，但不会改变量纲。

```text
let distance = @qgeometry.kilometers(2.0)
let in_meters = distance.to(@si.meter)

assert_eq(distance.value(), 2.0)
assert_eq(in_meters.value(), 2000.0)
assert_true(in_meters.dimension().is_same(distance.dimension()))
```

因此，`value()` 只在当前 `unit()` 下有意义。跨单位比较、输出或传给外部系统前，应先明确目标单位。

## 乘除会组合单位和量纲

乘法、除法和整数幂不需要预先判断“是否兼容”。它们会把数量、单位和量纲一起组合，得到新的 `Quantity`。

```text
let area = @qgeometry.meters(3.0) * @qgeometry.meters(4.0)
let speed = @qgeometry.meters(100.0) / @qsi.seconds(10.0)
let acceleration = speed / @qsi.seconds(2.0)

assert_eq(area.value(), 12.0)
assert_true(speed.unit().is_compatible(@si.meter / @si.second))
assert_true(acceleration.unit().is_compatible(@si.meter / @si.second.pow(2)))
```

这也是 LunarUnits 和“只在变量名中写单位”的区别：计算过程中单位不是注释，而是跟随结果继续参与后续检查。

## 什么时候直接使用 Dimension 和 Un

大多数业务代码只需要 `Quantity` 和领域构造函数。下面几类场景会直接接触更底层的对象：

- 定义新单位时，需要用 `Un::base` 或 `Un::scaled` 绑定符号、量纲和比例。
- 设定换算目标时，需要传入目标 `Un`。
- 编写扩展维度时，需要用 `Dimension::custom` 建立新的正交维度。
- 编写错误提示或调试输出时，可以读取 `quantity.dimension()` 和 `quantity.unit()`。

```text
let survey_foot = @unit.Un::scaled(
  "survey_ft",
  @dimension.Dimension::length(),
  1200.0 / 3937.0,
)
let length = @quantity.Quantity::new(10.0, survey_foot)
let meters = length.to(@si.meter)
```

## 与 Parser 和 Catalog 的关系

Parser 和 Catalog 不属于核心三层。它们位于文本边界：把用户写下的字符串变成 `Un` 或 `Quantity`。

```text
let catalog = @preset.all()
let unit = @parser.parse_unit(catalog, "m/s^2")
let quantity = @parser.parse_quantity(catalog, "9.8 m/s^2")
```

解析完成之后，后续计算仍然回到三层模型：量纲负责兼容性，单位负责比例和表达，数量负责把数值带入计算。

## 延伸阅读

本节介绍三层模型的使用方式。更深入的设计动机和数学解释可继续阅读 [核心三层模型](../design/core-three-layer-model.md)；字符串边界可阅读 [Parser 与 Catalog](./parser-and-catalog.md)。
