# Parser 与 Formatter

Parser 和 Formatter 面向应用边界：命令行参数、Web 表单、配置文件、日志和文档输出。

## 多种输出格式

同一个数量可以渲染为 ASCII、SI/Unicode 或 LaTeX。单位模型不变，只有展示层不同。

```text
let acceleration = @quantity.Quantity::new(
  9.8,
  @si.meter / @si.second.pow(2),
)

assert_eq(@quantity.format_quantity(acceleration), "9.8 m/s^2")
assert_eq(
  @quantity.format_quantity_with(acceleration, @unit.FormatStyle::Si),
  "9.8 m/s²",
)
assert_eq(
  @quantity.format_quantity_with(acceleration, @unit.FormatStyle::Latex),
  "9.8 \\mathrm{m}/\\mathrm{s}^{2}",
)
```

## Catalog 解析符号

`Catalog` 是不可变的符号表。预置 `all()` 覆盖内置单位包，也可以在调用方扩展自定义符号。

```text
let catalog = @preset.all()

assert_true(catalog.lookup("N") is Some(_))
assert_true(catalog.lookup("Hz") is Some(_))
assert_true(catalog.lookup("zzz") is None)

let extended = catalog.with_unit("force", @mechanics.newton)
assert_true(extended.contains("force"))
assert_false(catalog.contains("force"))
```

## 解析单位和数量字符串

Parser 负责处理 `*`、`/`、`^`、括号和数值前缀。失败路径可用 `*_opt` 变体处理。

```text
let catalog = @preset.all()
let accel = @parser.parse_unit(catalog, "m/s^2")
let q = @parser.parse_quantity(catalog, "9.8 m/s^2")

assert_true(accel.is_compatible(@si.meter / @si.second.pow(2)))
assert_eq(q.value(), 9.8)
assert_true(@parser.parse_unit_opt(catalog, "m/zz") is None)
```