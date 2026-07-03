# 仿射与对数单位

并不是所有带单位的数都适用于普通乘法单位系统。长度、时间、质量、力、能量这类线性数量可以直接相乘、相除和换算；温度点、绝对时间点、dB level 这类概念还带有偏移、参考值或对数尺度，需要单独建模。

## 线性数量和仿射点

普通 `Quantity` 表示线性数量：`2 m` 加 `3 m` 得到 `5 m`，`1 h` 可以换算成 `3600 s`。仿射点表示某个尺度上的绝对位置，例如 `20 °C` 或“从 epoch 起第 7200 秒”。点之间不能直接相加；两个点的差才是线性数量。

```text
let room = @affine.Point::new(20.0, @affine.celsius)
let warm = room.shift(@quantity.Quantity::new(5.0, @si.kelvin))

assert_eq(warm.value(), 25.0)
assert_eq(warm.difference(room).value(), 5.0)
```

这种分层避免了一个常见错误：把 `20 °C` 当作普通比例单位参与乘法。温度差是 kelvin 数量，绝对温度点是 affine point，两者不是同一个类型。

## 温度换算为什么需要 offset

摄氏度和华氏度不适用于一般线性系统，因为绝对温度换算需要同时处理比例和偏移，只有温度差换算时偏移会抵消。

```text
let boiling = @affine.Point::new(100.0, @affine.celsius)
let fahrenheit = boiling.to(@affine.fahrenheit)
let interval = boiling.difference(@affine.Point::new(20.0, @affine.celsius))

assert_eq(boiling.to_base().value(), 373.15)
assert_eq(fahrenheit.value(), 212.0)
assert_eq(interval.value(), 80.0)
```

如果把摄氏度视为普通 scaled unit，`0 °C` 会被误当作 `0 K`，这会污染所有热力学计算。LunarUnits 把温度点放在 `affine` 层，就是为了阻止这类错误进入核心单位代数。

## 时间点和时长

时长是普通线性数量，适用于核心单位系统；时间点则依赖参考原点。可以用自定义仿射单位表达“某个 epoch 上的秒数”，再用两点差得到时长。

```text
let epoch = @affine.AffineUn::new("s", @si.second, 1.0, 0.0)
let start = @affine.Point::new(0.0, epoch)
let finish = @affine.Point::new(7200.0, epoch)
let duration = finish.difference(start)

assert_eq(duration.to(@time.hour).value(), 2.0)
```

这让“2026-07-03 10:00”和“2 小时”保持不同语义：前者是仿射系统中的时间点，后者是线性系统中的时间差。

## dB level 和 gain

对数单位也需要额外处理。`Level` 是带参考值的绝对量，例如 `30 dBm` 表示相对于 `1 mW` 的功率水平；`Gain` 是纯比例，例如 `3 dB` 表示功率约翻倍。二者不能都当成普通线性单位。

```text
let level = @logarithmic.Level::new(30.0, @logarithmic.dbm())
let power = level.to_linear()
let louder = level.shift(
  @logarithmic.Gain::new(3.0, @logarithmic.decibel_power),
)

assert_true(power.unit().is_compatible(@mechanics.watt))
assert_eq(louder.value(), 33.0)
```

多个功率 level 合并时，需要先回到线性域相加，再转回对数域。两个 `20 dBm` 源合并不是 `40 dBm`，而是约 `23 dBm`。

```text
let combined = @logarithmic.Level::new(20.0, @logarithmic.dbm()).combine(
  @logarithmic.Level::new(20.0, @logarithmic.dbm()),
)

assert_true(combined.value() > 23.0 && combined.value() < 23.1)
```

## 何时使用这些层

如果一个量满足“零点自然、比例固定、可以参与乘除组合”，使用普通 `Quantity`。如果它有偏移零点，用 `affine.Point`；如果它是相对于参考值的对数读数，用 `logarithmic.Level`；如果它只是比例变化，用 `logarithmic.Gain`。这样的边界让核心单位代数保持简单，也让非线性尺度的错误更容易被定位。
