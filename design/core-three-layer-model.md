# 核心三层模型

LunarUnits 的核心模型分为 `Dimension`、`Un` 和 `Quantity`。这不是为了增加概念数量，而是为了把三个不同问题拆开：物理意义、单位表达和数值计算。

## 数学视角

量纲可以看作一个自由线性系统中的向量。每个基础量纲是一组正交基，例如长度、质量、时间、电流、温度等；一个具体量纲就是这些基的整数线性组合。

```text
velocity     = length - time
acceleration = length - 2 * time
force        = mass + length - 2 * time
energy       = mass + 2 * length - 2 * time
```

在实现上，这类向量不是用浮点数表示，而是用符号和整数幂组成的规范化单项式表示。这样 `length / time / time` 和 `length * time^-2` 会落到同一个规范形式，比较和消元才稳定。

## Dimension：物理意义的向量

`Dimension` 对应的是上述量纲向量。它只回答“这两个量的物理意义是否相同”。

因此，`Dimension` 不包含：

- 单位符号。
- 换算比例。
- 当前数值。
- 文本解析规则。

`meter`、`kilometer`、`foot` 的量纲都是 length；`newton` 和 `kg*m/s^2` 的量纲相同；长度和时间的量纲不同。加法、减法和换算检查的就是这一层。

## Un：同一量纲上的比例尺

单位 `Un` 是某个量纲上的表达方式。它在 `Dimension` 之外增加了两个信息：

- 符号：例如 `m`、`km`、`ft`、`N`。
- 比例：相对于该量纲基准表达的线性缩放。

因此，单位可以看成“量纲向量 + 线性比例尺”。同一个 `Dimension` 可以有许多 `Un`：

```text
meter      : length, scale = 1
kilometer  : length, scale = 1000
foot       : length, scale = 0.3048
second     : time,   scale = 1
```

换算只在同量纲单位之间成立。`kilometer -> meter` 可以通过比例换算；`meter -> second` 没有换算因子，因为它们不在同一个量纲向量上。

## Quantity：用单位封装的标量

`Quantity` 是一个数值和一个单位的组合。它可以理解为“用某个单位坐标系表达出来的标量”。

```text
2 km  = value 2    with unit kilometer
2000 m = value 2000 with unit meter
```

这两个 `Quantity` 的数值不同、单位不同，但表示同一个物理量。换算时，变的是坐标表达；不变的是背后的物理量和量纲。

这也是为什么 `value()` 不能脱离 `unit()` 单独解释。裸 `Double` 只剩一个标量，没有携带它所在的单位坐标系。

## 运算如何落到三层

加法和减法要求两个数量位于同一个量纲空间。实现上，右侧先换算到左侧单位，再做数值加减，结果保留左侧单位。

乘法、除法和整数幂则对应量纲向量的加减和倍乘，同时组合单位比例和数值：

```text
(mass) * (length / time^2) = mass * length / time^2
kg * (m/s^2) = kg*m/s^2
2 * 3 = 6
```

因此乘除不需要“兼容性检查”：它们本来就是生成新量纲的操作。

## 为什么 Catalog 不进入核心

Catalog 只负责把文本符号映射到 `Un`。例如字符串 `"m"` 可以查到 `meter`，字符串 `"N"` 可以查到 `newton`。

但单位身份不是由字符串决定的。同一个单位可以有别名，不同上下文也可能给同一个符号不同含义。核心模型只关心解析后得到的 `Un`，而不依赖全局字符串表。

这个边界让 LunarUnits 可以同时支持：

- 内置单位目录。
- 应用自定义符号。
- CLI/Web 表单输入。
- 不同领域的局部 Catalog。

## 为什么 affine 和 logarithmic 不放进 Un

`Un` 表示线性比例缩放：同一量纲上的单位换算可以写成 `value * scale`。这适合米和千米、焦耳和千瓦时、美元和美分。

摄氏度、华氏度这类绝对温度带 offset，换算不是纯比例；dB 和 Np 是对数关系，也不是线性比例。因此它们不能安全地塞进 `Un`。

LunarUnits 把这两类非线性标度放到独立模型中：

- `affine` 用 `Point` 表示绝对点，用普通 `Quantity` 表示差值。
- `logarithmic` 用 `Level` 表示带参考的电平，用 `Gain` 表示纯比值。

这样核心三层保持线性、可组合、可预测，非线性语义则在专门的边界中处理。

## 设计收益

三层模型带来的直接收益是：

- 量纲兼容性可以独立判断。
- 单位换算可以只依赖比例和量纲。
- 数值计算可以保留单位上下文。
- 文本解析、格式化、非线性标度不会污染核心身份规则。

这也是 LunarUnits 能同时支撑核心库、CLI、WebUI 和公式库的基础：不同应用可以共享同一套三层模型，而只在输入输出边界做自己的包装。