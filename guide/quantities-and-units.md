---
prev:
  text: 快速开始
  link: /guide/getting-started
---

# 数量与单位

本节将详细介绍 LunarUnits 的核心模型：数量 `Quantity`——数值、单位和量纲三层信息的组合。数值用于计算，单位决定当前表达方式，量纲决定能否换算、相加或相减。

## 三层模型

`Quantity` 保存的是“当前单位下的数值”。同一个物理量可以用不同单位表示，数值会随单位变化，但量纲不变。

```text
let distance = @qgeometry.kilometers(2.0)

assert_eq(distance.value(), 2.0)
assert_true(distance.unit().is_compatible(@geometry.kilometer))
assert_true(distance.dimension().is_same(@si.meter.dimension()))

let in_meters = distance.to(@si.meter)
assert_eq(in_meters.value(), 2000.0)
assert_true(in_meters.dimension().is_same(distance.dimension()))
```

这也是 `Quantity` 与“只在变量名里写单位”的区别：单位不是注释，而是参与运行时检查的重要类型信息。

## 直接构造和领域构造函数

底层可以始终使用 `Quantity::new(value, unit)`。当编写具体领域的代码时，可以优先使用领域构造函数，让变量含义更直接。

```text
let raw = @quantity.Quantity::new(1000.0, @si.meter)
let distance = @qgeometry.kilometers(1.0)
let load = @qmechanics.kilonewtons(2.0)
let memory = @qinformation.kibibytes(4.0)
```

领域构造函数把常见单位和业务语义放在一起，便于用户阅读和使用。需要处理自定义单位或用户输入时，仍然可以使用底层构造函数。

## 运算规则

加法和减法要求量纲兼容，并且结果保留左侧数量的单位。右侧数量会先换算到左侧单位，再参与数值运算。

```text
let total = @qgeometry.meters(1.0).add(@qgeometry.kilometers(1.0))

assert_eq(total.value(), 1001.0)
assert_true(total.unit().is_compatible(@si.meter))
```

乘法、除法和整数幂操作可以自动组合、构造出新的量纲。

```text
let area = @qgeometry.meters(3.0) * @qgeometry.meters(4.0)
let unit_price = @qcurrency.dollars(120.0) / @qcount.counts(40.0)
let bill = unit_price * @qcount.dozens(1.0)

assert_eq(area.value(), 12.0)
assert_true(bill.unit().is_compatible(@currency.dollar))
assert_eq(bill.to(@currency.dollar).value(), 36.0)
```

这些规则让本库自动实现了量纲、单位的组合，避免了用户自行处理这些逻辑。

## 失败路径

当调用方希望自己控制错误展示时，使用 `checked_to`、`checked_add`、`checked_sub`。它们把不兼容量纲表示为 `None`，适合 CLI、Web UI、批处理导入等场景。

```text
let length = @qgeometry.meters(1.0)
let duration = @quantity.Quantity::new(1.0, @si.second)

assert_true(length.checked_add(duration) is None)
assert_true(length.checked_to(@si.second) is None)
```

对应的 `to`、`add`、`sub` 会在失败时抛出 `DimensionMismatch`，适合把量纲错误视为程序逻辑错误的内部计算路径。

## 量纲不是全部语义

量纲检查能阻止“长度加时间”这类错误，但不会替代领域模型。两个值即使量纲相同，也可能承担不同业务角色：管道长度、海拔高度和加工余量都可以是长度；预算金额、单次报价和累计成本都可以是货币。需要表达这类差异时，应通过变量名、函数名、领域对象或更上层 API 说明上下文。

LunarUnits 把角度建模为扩展维度，所以力矩和能量不会在库里被混成同一量纲：力矩可以表达为 `energy / angle`，乘以转角后才得到能量。这个选择也让 Hz 和 rad/s 这类场景可以被明确处理，而不是全部退化成普通无量纲数。更多讨论见 [力矩与能量](../cookbook/torque-vs-energy.md) 和 [角度设计](../design/angle.md)。
