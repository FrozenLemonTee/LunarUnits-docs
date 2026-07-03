# 仿射与对数单位

本节介绍 `affine` 和 `logarithmic` 两组 API 的基本用法。它们处理普通线性 `Quantity` 之外的输入：温度点、时间点、dB level 和 gain。

## 仿射点和差值

`affine.Point` 表示某个仿射尺度上的点，例如摄氏温度点。点可以换算到同一物理尺度的其他仿射单位，也可以和线性差值相互操作。

```text
let room = @affine.Point::new(20.0, @affine.celsius)
let warm = room.shift(@quantity.Quantity::new(5.0, @si.kelvin))

assert_eq(warm.value(), 25.0)
assert_eq(warm.difference(room).value(), 5.0)
```

两个点相减得到普通 `Quantity`。点加上差值得到新的点。

## 温度点换算

摄氏度、华氏度和开尔文温度点可以互相换算。`to_base()` 会把点换算到该仿射单位的基础线性单位。

```text
let boiling = @affine.Point::new(100.0, @affine.celsius)
let fahrenheit = boiling.to(@affine.fahrenheit)
let interval = boiling.difference(@affine.Point::new(20.0, @affine.celsius))

assert_eq(boiling.to_base().value(), 373.15)
assert_eq(fahrenheit.value(), 212.0)
assert_eq(interval.value(), 80.0)
```

温度点和温度差的背景可继续阅读 [仿射温度](../design/affine-temperature.md)。

## 时间点和时长

时长使用普通线性数量；时间点可以用自定义仿射单位表达。两个时间点相减后得到时长。

```text
let epoch = @affine.AffineUn::new("s", @si.second, 1.0, 0.0)
let start = @affine.Point::new(0.0, epoch)
let finish = @affine.Point::new(7200.0, epoch)
let duration = finish.difference(start)

assert_eq(duration.to(@time.hour).value(), 2.0)
```

## dB level 和 gain

`Level` 表示带参考值的对数读数，`Gain` 表示比例变化。level 可以转回线性数量，也可以通过 gain 平移。

```text
let level = @logarithmic.Level::new(30.0, @logarithmic.dbm())
let power = level.to_linear()
let louder = level.shift(
  @logarithmic.Gain::new(3.0, @logarithmic.decibel_power),
)

assert_true(power.unit().is_compatible(@mechanics.watt))
assert_eq(louder.value(), 33.0)
```

两个功率 level 可以用 `combine` 合并：

```text
let combined = @logarithmic.Level::new(20.0, @logarithmic.dbm()).combine(
  @logarithmic.Level::new(20.0, @logarithmic.dbm()),
)

assert_true(combined.value() > 23.0 && combined.value() < 23.1)
```

对数尺度的背景可继续阅读 [对数单位](../design/logarithmic-units.md)。
