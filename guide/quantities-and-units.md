---
prev:
  text: 快速开始
  link: /guide/getting-started
---

# 数量与单位

`Quantity` 是数值和单位的组合。加法、减法和换算要求量纲兼容；乘法、除法和整数幂会自动组合单位。

```text
let mass = @quantity.Quantity::new(2.0, @si.kilogram)
let acceleration = @quantity.Quantity::new(
  3.0,
  @si.meter / @si.second.pow(2),
)
let force = mass * acceleration
```

领域构造函数提供更易读的常用数量写法：

```text
let load = @qmechanics.newtons(6.0)
```