# 换算与格式化

换算和格式化分别解决两个问题：换算解决“同一个量用哪个单位表达”，格式化解决“这个量如何显示给人或外部系统”。前者会改变数值和单位，后者只改变文本。

## 换算保持量纲不变

`to` 会把数量换算到目标单位。换算成功的前提是源单位和目标单位量纲兼容，换算后物理量不变。

```text
let distance = @qgeometry.kilometers(2.0)
let in_meters = distance.to(@si.meter)

assert_eq(in_meters.value(), 2000.0)
assert_true(in_meters.dimension().is_same(distance.dimension()))
```

不确定目标单位是否兼容时，先用 `can_to` 或 `checked_to`，避免在用户输入路径里直接抛错。

```text
let distance = @qgeometry.kilometers(2.0)

assert_true(distance.can_to(@si.meter))
assert_false(distance.can_to(@si.second))
assert_true(distance.checked_to(@si.second) is None)
```

## 目标单位也是 API 选择

换算结果的单位由调用方指定。对于内部计算，通常保留自然产生的单位即可；对于用户输出、日志或报表，则应该在边界处换算到更熟悉的单位。

```text
let speed = @qmechanics.meters_per_second(30.0)
let road_speed = speed.to(@mechanics.kilometer_per_hour)

assert_eq(road_speed.value(), 108.0)
```

加法和减法也遵循类似规则：结果保留左侧数量的单位。因此，当输出单位需要刻意选择时，可以将期望单位放在左侧，或在最终结果上显式调用 `to`。

```text
let total = @qtime.hours(1.0).add(@qtime.minutes(30.0))

assert_eq(total.value(), 1.5)
assert_true(total.unit().is_compatible(@time.hour))
```

## 复合单位的显示

乘法、除法和幂会生成复合单位。格式化器会按稳定规则渲染分子、分母和指数，让日志、终端输出和文档中的单位表达保持一致。

```text
let acceleration = @quantity.Quantity::new(
  9.8,
  @si.meter / @si.second.pow(2),
)

assert_eq(@quantity.format_quantity(acceleration), "9.8 m/s^2")
```

默认 `format_quantity` 使用 ASCII，适合终端、日志、快照测试和不确定编码环境。

## 输出风格

需要面向读者展示时，可以显式选择 `FormatStyle`：

```text
let acceleration = @quantity.Quantity::new(
  9.8,
  @si.meter / @si.second.pow(2),
)

let ascii = @quantity.format_quantity(acceleration)
let si = @quantity.format_quantity_with(acceleration, @unit.FormatStyle::Si)
let latex = @quantity.format_quantity_with(
  acceleration,
  @unit.FormatStyle::Latex,
)

assert_eq(ascii, "9.8 m/s^2")
assert_eq(si, "9.8 m/s²")
assert_eq(latex, "9.8 \\mathrm{m}/\\mathrm{s}^{2}")
```

三种格式只影响文本，不会改变数量本身。实践中可以把计算结果一直保持为 `Quantity`，直到 CLI 输出、Web UI 渲染或文档生成时再格式化。

## 与 Parser 的边界

Formatter 负责写出已知数量，Parser 负责读入用户输入。不要把格式化文本当作长期存储协议；如果系统需要稳定交换数据，更好的做法是分别存储数值和单位字符串，并在读入时通过 Catalog 和 Parser 重建数量。
