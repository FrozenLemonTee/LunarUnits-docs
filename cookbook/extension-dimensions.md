# 扩展维度

LunarUnits 的 SI 核心保持克制，信息量、角度、货币、计数等领域概念通过扩展维度进入系统。这样既能复用统一的单位运算，也不会把所有语义都挤进七个 SI 基本量纲。

## 信息量

`KiB` 到 `byte` 的换算发生在 information 扩展维度内。

```text
let memory = @qinformation.kibibytes(1.0)
let as_bytes = memory.to(@information.byte)

assert_eq(as_bytes.value(), 1024.0)
```

## 角度不是普通无量纲

角度被建模为扩展维度，所以度和弧度可以换算，但不会被当成普通 dimensionless ratio。

```text
let half_turn = @qangle.degrees(180.0)
let radians = half_turn.to(@angle.radian)

assert_eq(radians.value(), 3.141592653589793)
assert_false(
  radians.dimension().is_same(@dimension.Dimension::dimensionless()),
)
```

## 频率到角频率

在 LunarUnits 中，赫兹和弧度每秒共享 angle/time 维度。这样 `1 Hz = 2*pi rad/s` 这样的关系可以作为单位换算表达。

```text
let mains = @qangle.hertz(50.0)
let rad_per_second = @angle.radian / @si.second
let omega = mains.to(rad_per_second)

assert_eq(omega.value(), 314.1592653589793)
```