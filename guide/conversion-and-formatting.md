# 换算与格式化

同量纲换算会保持物理量不变，只改变目标单位下的数值表达：

```text
let distance = @qgeometry.kilometers(2.0)
let in_meters = distance.to(@si.meter)
```

数量可以格式化为 ASCII、SI/Unicode 或 LaTeX：

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
```