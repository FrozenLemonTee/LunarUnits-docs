# 仿射与对数尺度

温度、绝对时间点和分贝不适合混入普通乘法单位核心。LunarUnits 把这些非线性或带参考的概念放在专门层处理。

## 绝对温度和温度差

绝对温度点换算需要 offset；温度差则是普通 kelvin 数量。两者类型不同，可以避免把 `20 degC` 当成普通比例单位。

```text
let boiling = @affine.Point::new(100.0, @affine.celsius)

assert_eq(boiling.to_base().value(), 373.15)
assert_eq(
  @affine.Point::new(212.0, @affine.fahrenheit).to(@affine.celsius).value(),
  100.0,
)
assert_eq(
  boiling.difference(@affine.Point::new(20.0, @affine.celsius)).value(),
  80.0,
)
```

## 时长和时间点

时长是线性数量，可以在 hour、minute、second 之间换算。绝对时间点则可建模为仿射点，两点之差得到时长。

```text
assert_eq(@qtime.hours(2.0).to(@time.minute).value(), 120.0)

let epoch = @affine.AffineUn::new("s", @si.second, 1.0, 0.0)
let start = @affine.Point::new(0.0, epoch)
let finish = @affine.Point::new(7200.0, epoch)

assert_eq(finish.difference(start).to(@time.hour).value(), 2.0)
```

## dB level 和 gain

`Level` 是带参考的绝对量，`Gain` 是纯比例。两个相等功率电平合成时是功率相加，结果约为 +3 dB，而不是简单数值相加。

```text
let power = @logarithmic.Level::new(30.0, @logarithmic.dbm()).to_linear()
assert_true(power.unit().is_compatible(@mechanics.watt))

let amplified = @logarithmic.Level::new(30.0, @logarithmic.dbm()).shift(
  @logarithmic.Gain::new(3.0, @logarithmic.decibel_power),
)
assert_eq(amplified.value(), 33.0)

let combined = @logarithmic.Level::new(20.0, @logarithmic.dbm()).combine(
  @logarithmic.Level::new(20.0, @logarithmic.dbm()),
)
assert_true(combined.value() > 23.0 && combined.value() < 23.1)
```