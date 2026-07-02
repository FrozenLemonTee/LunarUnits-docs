# 货币、计数与费率

货币和计数都是扩展维度。它们适合展示“单位不仅是物理单位，也可以表达业务计算中的数量语义”。

## 注入汇率

跨货币换算依赖实时汇率，LunarUnits 不内置汇率表。调用方在边界处注入当前汇率，库只负责保持单位换算语义一致。

```text
let euro = @currency.at_rate("EUR", 1.25)
let price = @qcurrency.dollars(250.0)
let in_euros = price.to(euro)

assert_eq(in_euros.value(), 200.0)
```

## 成本率

金额除以时间会得到 money/time 维度，它和单纯金额不同。

```text
let cost = @qcurrency.dollars(45.0)
let time = @quantity.Quantity::new(3.0, @si.second)
let rate = cost / time

assert_eq(rate.value(), 15.0)
assert_false(rate.dimension().is_same(cost.dimension()))
```

## 单价与计数消去

金额除以数量得到单价；再乘回数量时，count 维度被消去并恢复为金额。

```text
let total = @qcurrency.dollars(120.0)
let items = @qcount.counts(40.0)
let unit_price = total / items
let bill = unit_price * @qcount.dozens(1.0)

assert_eq(unit_price.value(), 3.0)
assert_true(bill.unit().is_compatible(@currency.dollar))
assert_eq(bill.to(@currency.dollar).value(), 36.0)
```