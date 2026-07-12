---
next:
  text: 三层模型
  link: /guide/quantities-and-units
---

# 快速开始

本节展示 LunarUnits 的快速开始流程：安装、导入、构造数量、单位换算、量纲错误处理，以及文本解析。

## 安装

使用 MoonBit 安装 LunarUnits：

```bash
moon add FrozenLemonTee/LunarUnits
```

在通过 `moon new` 创建的标准项目中，将以下包加入 `cmd/main/moon.pkg`，并保留其中现有的 `options("is-main": true)` 配置：

```text
import {
  "FrozenLemonTee/LunarUnits/core/quantity",
  "FrozenLemonTee/LunarUnits/units/si",
  "FrozenLemonTee/LunarUnits/units/mechanics",
  "FrozenLemonTee/LunarUnits/notation/preset",
  "FrozenLemonTee/LunarUnits/notation/parser",
  "FrozenLemonTee/LunarUnits/quantities/qgeometry",
  "FrozenLemonTee/LunarUnits/quantities/qmechanics",
}
```

将 `cmd/main/main.mbt` 替换为以下完整示例：

```moonbit
fn main {
  let distance = @qgeometry.meters(100.0)
  let time = @quantity.Quantity::new(10.0, @si.second)

  let speed = distance / time
  println(@quantity.format_quantity(speed))

  let in_meters = @qgeometry
    .kilometers(2.0)
    .checked_to(@si.meter)
    .unwrap()
  println(@quantity.format_quantity(in_meters))

  let catalog = @preset.all()
  let gravity = @parser
    .parse_quantity_opt(catalog, "9.8 m/s^2")
    .unwrap()
  println(@quantity.format_quantity(gravity))

  println(distance.checked_add(time) is None)
}
```

运行 `moon run cmd/main` 会得到：

```text
10 m/s
2000 m
9.8 m/s^2
true
```

## 构造数量

`Quantity` 是数值与单位的组合。可以直接用 `Quantity::new` 构造，也可以用领域构造函数提升可读性。

```text
let distance = @qgeometry.meters(100.0)
let time = @quantity.Quantity::new(10.0, @si.second)
let speed = distance / time
let speed_text = @quantity.format_quantity(speed) // "10 m/s"
```

新的数量可以由不同量纲的已有数量通过乘法、除法操作组合自动得出。下面的例子展示了牛顿第二定律：

```text
let mass = @quantity.Quantity::new(2.0, @si.kilogram)
let acceleration = @quantity.Quantity::new(
  3.0,
  @si.meter / @si.second.pow(2),
)
let force = mass * acceleration
let force_text = @quantity.format_quantity(force) // "6 kg*m/s^2"
```

## 单位换算

同量纲、但单位不同的数量之间换算，其量纲保持不变，只改变目标单位对应数量的数值：

```text
let distance = @qgeometry.kilometers(2.0)
let in_meters = distance.checked_to(@si.meter).unwrap()
// in_meters.value() == 2000.0
```

领域单位之间也可以换算，只要量纲兼容：

```text
let load = @qmechanics.newtons(6.0)
let coherent = load
  .checked_to(@si.kilogram * @si.meter / @si.second.pow(2))
  .unwrap()
```

## 处理量纲错误

当量纲不兼容时，`add`、`sub`、`to` 会抛出 `DimensionMismatch`。如果调用方希望自己处理失败路径，可以使用 `checked_*` API。

```text
let length = @qgeometry.meters(1.0)
let duration = @quantity.Quantity::new(1.0, @si.second)
let maybe_total = length.checked_add(duration) // None
```

严格版本的 `add`、`sub`、`to` 会直接暴露量纲错误；请在能够处理或继续传播错误的函数中使用它们。`main`、CLI、Web UI 和批处理程序可以改用 `checked_*` API 自己处理失败路径。

## 解析文本输入

`notation/catalog` 和 `notation/parser` 面向命令行、表单和配置文件里的文本单位输入。

```text
let catalog = @preset.all()
let accel_unit = @parser.parse_unit_opt(catalog, "m/s^2").unwrap()
let g = @parser.parse_quantity_opt(catalog, "9.8 m/s^2").unwrap()
```

严格版本的 `parse_unit`、`parse_quantity` 会抛出分类明确的 `ParseError`。在非抛错入口中，可以使用 `parse_unit_opt`、`parse_quantity_opt` 让上层应用返回更友好的错误提示。

## 下一步

- 阅读 [三层模型](./quantities-and-units.md) 了解核心模型。
- 阅读 [Parser 与 Catalog](./parser-and-catalog.md) 了解文本输入边界。
- 阅读 [案例](../cookbook/) 查看更完整的工程计算场景。
- 阅读 [评审入口](../review/) 快速查看 OSC2026 评审材料。
