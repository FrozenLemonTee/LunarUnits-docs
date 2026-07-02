# 力矩与能量

力矩和能量可以落到相同的基础量纲表达，但它们代表不同的物理语义。LunarUnits 保持量纲运算显式，同时让调用代码中的语义命名继续可见。

基础 examples 中覆盖了“力乘以距离得到能量”的单位组合：

```text
let force = @qmechanics.newtons(10.0)
let distance = @qgeometry.meters(5.0)
let work = force * distance

assert_eq(work.value(), 50.0)
assert_true(work.unit().is_compatible(@mechanics.joule))
```

这个案例说明：量纲检查能保证单位组合正确，但物理语义仍应通过变量名、函数名和领域模型表达。`work`、`torque` 即使共享基础量纲，也不应在业务代码中互相替代。