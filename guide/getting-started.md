# 快速开始

使用 MoonBit 安装 LunarUnits：

```bash
moon add FrozenLemonTee/LunarUnits
```

在 `moon.pkg` 中导入需要的包：

```text
import {
  "FrozenLemonTee/LunarUnits/core/quantity",
  "FrozenLemonTee/LunarUnits/units/si",
  "FrozenLemonTee/LunarUnits/quantities/qgeometry",
  "FrozenLemonTee/LunarUnits/quantities/qmechanics",
}
```

创建带单位的数量，并让运算自动组合单位：

```text
let distance = @qgeometry.meters(100.0)
let time = @quantity.Quantity::new(10.0, @si.second)
let speed = distance / time
let speed_text = @quantity.format_quantity(speed) // "10 m/s"
```

换算同量纲数量：

```text
let distance = @qgeometry.kilometers(2.0)
let in_meters = distance.to(@si.meter)
```

如果调用方希望自行处理量纲不匹配，可以使用 `checked_*` API：

```text
let length = @qgeometry.meters(1.0)
let duration = @quantity.Quantity::new(1.0, @si.second)
let maybe_total = length.checked_add(duration) // None
```