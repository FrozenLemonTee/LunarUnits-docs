# Parser 与 Catalog

Catalog 将 `m`、`s`、`N`、`Hz` 这样的符号映射到单位。Parser 使用 Catalog 解析原子符号，再处理 `*`、`/`、`^` 和括号组合。

```text
let catalog = @preset.all()
let newton = catalog.lookup("N").unwrap()
let acceleration = @parser.parse_unit(catalog, "m/s^2")
let g = @parser.parse_quantity(catalog, "9.8 m/s^2")
```

Catalog 是不可变值。扩展 Catalog 会返回一个新值：

```text
let extended = catalog.with_unit("force", @mechanics.newton)
```