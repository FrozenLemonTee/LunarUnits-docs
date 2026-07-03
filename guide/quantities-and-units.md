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

需要检查数量时，可以分别读取 `value()`、`unit()` 和 `dimension()`。

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

计算结果仍然是 `Quantity`，可以继续读取数值、单位和量纲，也可以继续参与后续运算。

## 失败路径

当调用方希望自己控制错误展示时，使用 `checked_to`、`checked_add`、`checked_sub`。它们把不兼容量纲表示为 `None`，适合 CLI、Web UI、批处理导入等场景。

```text
let length = @qgeometry.meters(1.0)
let duration = @quantity.Quantity::new(1.0, @si.second)

assert_true(length.checked_add(duration) is None)
assert_true(length.checked_to(@si.second) is None)
```

对应的 `to`、`add`、`sub` 会在失败时抛出 `DimensionMismatch`，适合把量纲错误视为程序逻辑错误的内部计算路径。

## 延伸阅读

本节只介绍 `Quantity`、单位和量纲的基本用法。更多背景可继续阅读 [运行时量纲检查](../design/runtime-dimensional-checking.md) 与 [角度](../design/angle.md)。
