# 扩展维度

LunarUnits 的 SI 核心保持克制，信息量、角度、货币、计数等领域概念通过扩展维度进入系统。它们不属于七个 SI 基本量纲，但仍然可以复用同一套 `Dimension`、`Unit` 和 `Quantity` 运算模型。

扩展维度适合处理两类问题：一类是工程中常见但不宜压成普通无量纲的量，例如角度和信息量；另一类是业务计算中需要保留语义边界的量，例如货币、计数和费率。

## 信息量

`KiB` 到 `byte` 的换算发生在 information 扩展维度内。它和长度、质量一样进入单位系统，因此可以参与复合单位运算，也不会被误认为普通标量。

```text
let memory = @qinformation.kibibytes(1.0)
let as_bytes = memory.to(@information.byte)

assert_eq(as_bytes.value(), 1024.0)
```

## 角度不是普通无量纲

角度被建模为扩展维度，所以度和弧度可以换算，但不会被当成普通 dimensionless ratio。这样可以区分平面角、纯比例和后续由角度构造出的角速度、频率等概念。

```text
let half_turn = @qangle.degrees(180.0)
let radians = half_turn.to(@angle.radian)

assert_eq(radians.value(), 3.141592653589793)
assert_false(
  radians.dimension().is_same(@dimension.Dimension::dimensionless()),
)
```

## 频率到角频率

在 LunarUnits 中，赫兹和弧度每秒共享 angle/time 维度。这样 `1 Hz = 2*pi rad/s` 这样的关系可以作为单位换算表达，同时保留“这是周期或角度相关量”的语义。

```text
let mains = @qangle.hertz(50.0)
let rad_per_second = @angle.radian / @si.second
let omega = mains.to(rad_per_second)

assert_eq(omega.value(), 314.1592653589793)
```

## 货币换算

跨货币换算依赖实时汇率，LunarUnits 不内置汇率表。调用方在系统边界处注入当前汇率，库只负责保持单位换算语义一致。

```text
let euro = @currency.at_rate("EUR", 1.25)
let price = @qcurrency.dollars(250.0)
let in_euros = price.to(euro)

assert_eq(in_euros.value(), 200.0)
```

## 成本率

金额除以时间会得到 money/time 维度，它和单纯金额不同。费率仍然是普通复合单位，因此可以继续和时间相乘恢复为金额。

```text
let cost = @qcurrency.dollars(45.0)
let time = @quantity.Quantity::new(3.0, @si.second)
let rate = cost / time

assert_eq(rate.value(), 15.0)
assert_false(rate.dimension().is_same(cost.dimension()))
```

## 单价与计数消去

计数也是显式扩展维度。金额除以数量得到单价；再乘回数量时，count 维度被消去并恢复为金额。

```text
let total = @qcurrency.dollars(120.0)
let items = @qcount.counts(40.0)
let unit_price = total / items
let bill = unit_price * @qcount.dozens(1.0)

assert_eq(unit_price.value(), 3.0)
assert_true(bill.unit().is_compatible(@currency.dollar))
assert_eq(bill.to(@currency.dollar).value(), 36.0)
```
