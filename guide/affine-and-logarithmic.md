# 仿射与对数单位

仿射尺度用于表示温度这样的绝对点。绝对点换算时同时包含比例和偏移，而温度差仍然是普通线性数量。

```text
let boiling = @affine.Point::new(100.0, @affine.celsius)
let boiling_k = boiling.to_base()
```

对数尺度用于表示 level 和 gain。level 携带参考值，gain 则表示纯比例。