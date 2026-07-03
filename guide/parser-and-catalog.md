# Parser 与 Catalog

Parser 与 Catalog 位于应用边界：命令行参数、Web 表单、配置文件和用户脚本通常只能提供字符串，而 LunarUnits 的核心计算需要 `Unit` 和 `Quantity`。Catalog 负责把符号映射到单位，Parser 负责把字符串语法转成单位表达式或数量。

## Catalog 是符号表，不是单位注册中心

Catalog 只回答“这个符号代表哪个单位”。单位是否兼容、如何换算，仍然由 `Un` 自身的量纲和比例决定。

```text
let catalog = @preset.all()

assert_true(catalog.lookup("m") is Some(_))
assert_true(catalog.lookup("N") is Some(_))
assert_true(catalog.lookup("Hz") is Some(_))
assert_true(catalog.lookup("zzz") is None)
```

Catalog 是不可变值。扩展 Catalog 会返回新值，原 Catalog 不会被修改。

```text
let base = @preset.all()
let extended = base.with_unit("force", @mechanics.newton)

assert_true(extended.contains("force"))
assert_false(base.contains("force"))
```

如果重复绑定同一个符号，后写入的绑定生效。这个规则适合在应用层做局部别名或覆盖，但公共文档和通用 CLI 应尽量避免让常见符号产生歧义。

## Parser 支持的单位表达式

`parse_unit` 支持原子符号、`*`、`/`、整数幂和括号。空白可以出现在表达式之间。

```text
let catalog = @preset.all()

let accel = @parser.parse_unit(catalog, "m/s^2")
let force = @parser.parse_unit(catalog, "kg * m / s^2")
let pressure = @parser.parse_unit(catalog, "N/(m^2)")

assert_true(accel.is_compatible(@si.meter / @si.second.pow(2)))
assert_true(force.is_compatible(@mechanics.newton))
assert_true(pressure.is_compatible(@mechanics.pascal))
```

字面量 `1` 表示无量纲单位。指数必须是整数，因此 `m^2`、`s^-1` 合法，`m^x` 会被识别为指数错误。

## 解析数量

`parse_quantity` 先读取数字，再读取可选单位表达式。裸数字会得到无量纲数量。

```text
let catalog = @preset.all()

let g = @parser.parse_quantity(catalog, "9.8 m/s^2")
let count = @parser.parse_quantity(catalog, "42")
let force = @parser.parse_quantity(catalog, "-3.2e3 N")

assert_eq(g.value(), 9.8)
assert_true(count.dimension().is_same(@dimension.Dimension::dimensionless()))
assert_true(force.unit().is_compatible(@mechanics.newton))
```

当数值已经由其他输入控件解析成 `Double`，只需要给它附加单位字符串时，可以使用 `quantity`：

```text
let acceleration = @parser.quantity(@preset.all(), 9.8, "m/s^2")

assert_true(acceleration.unit().is_compatible(@si.meter / @si.second.pow(2)))
```

## 错误处理

Parser 的抛错版本会区分未知单位、空输入、非法数字、非法指数、意外字符和尾部多余输入。应用层如果只关心“是否成功”，可以使用 `*_opt` 版本。

```text
let catalog = @preset.all()

assert_true(@parser.parse_unit_opt(catalog, "m/s^2") is Some(_))
assert_true(@parser.parse_unit_opt(catalog, "m/zz") is None)
assert_true(@parser.parse_quantity_opt(catalog, "m/s^2") is None)
```

CLI 和 Web UI 通常会使用抛错版本，把 `ParseError` 转成更具体的用户提示；批处理导入或表单校验则可以先用 `*_opt` 做快速过滤。

## Catalog 的组织建议

通用应用推荐使用 `@preset.all()` ，因为它覆盖内置单位包。领域应用可以基于它添加局部别名，例如 `force`、`flow` 或业务系统中的标准缩写。不要把用户输入直接变成全局可变状态；Catalog 是值，按请求、按配置或按工作区传递会更容易测试，也能避免不同模块之间的符号污染。当然，用户也可以根据自己的需要只选择使用某些部分领域的Catalog。
