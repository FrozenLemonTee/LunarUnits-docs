# 力矩与能量

在很多教材约定里，弧度会被当作无量纲数，因此力矩和能量都可能落到 `N*m` 这样的基础单位表达上。LunarUnits 选择把 angle 建模为扩展维度，所以二者在本库中不会混成同一量纲：能量是 `N*m`，力矩可以表达为 `N*m/rad`，乘以转角后才得到能量。

基础 examples 中覆盖了“力乘以距离得到能量”的单位组合：

```text
let force = @qmechanics.newtons(10.0)
let distance = @qgeometry.meters(5.0)
let work = force * distance

assert_eq(work.value(), 50.0)
assert_true(work.unit().is_compatible(@mechanics.joule))
```

如果需要表达转动做功，可以把力矩建成 `energy / angle` 维度，再乘以角位移得到能量：

```text
let torque = @quantity.Quantity::new(
  10.0,
  @mechanics.joule / @angle.radian,
)
let rotation = @qangle.radians(0.5)
let work = torque * rotation

assert_eq(work.value(), 5.0)
assert_true(work.unit().is_compatible(@mechanics.joule))
```

这个案例说明：LunarUnits 的 angle 扩展维度可以把力矩和能量在量纲层面区分开；同时，业务代码仍应通过变量名、函数名和领域模型表达“这是力矩”“这是做功”这样的工程语义。