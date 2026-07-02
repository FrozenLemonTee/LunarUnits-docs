# 基础力学与换算

基础力学示例展示 LunarUnits 的核心路径：构造数量、组合单位、换算同量纲数量，并拒绝不兼容量纲。

## 速度

距离除以时间会得到速度，单位自动组合为长度/时间。

```text
let distance = @qgeometry.meters(100.0)
let time = @quantity.Quantity::new(10.0, @si.second)
let speed = distance / time

assert_eq(speed.value(), 10.0)
assert_true(speed.unit().is_compatible(@mechanics.meter_per_second))
```

## 牛顿第二定律

质量乘以加速度得到力。关键点不是数值乘法，而是单位组合后的结果可以和牛顿兼容。

```text
let mass = @quantity.Quantity::new(2.0, @si.kilogram)
let acceleration = @quantity.Quantity::new(
  3.0,
  @si.meter / @si.second.pow(2),
)
let force = mass * acceleration

assert_eq(force.value(), 6.0)
assert_true(force.unit().is_compatible(@mechanics.newton))
```

## 做功

力乘以距离得到功或能量，单位与焦耳兼容。

```text
let force = @qmechanics.newtons(10.0)
let distance = @qgeometry.meters(5.0)
let work = force * distance

assert_eq(work.value(), 50.0)
assert_true(work.unit().is_compatible(@mechanics.joule))
```

## 同量纲换算

换算只允许发生在兼容量纲之间，物理量保持不变。

```text
let distance = @qgeometry.kilometers(2.0)
let in_meters = distance.to(@si.meter)

assert_eq(in_meters.value(), 2000.0)
```

## 拒绝非法相加

长度和时间没有相同量纲。非抛错路径会返回 `None`，适合 CLI、Web UI 和批处理程序生成友好错误。

```text
let length = @quantity.Quantity::new(1.0, @si.meter)
let time = @quantity.Quantity::new(1.0, @si.second)

assert_true(length.checked_add(time) is None)
```