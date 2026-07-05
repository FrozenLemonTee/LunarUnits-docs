# 生态

LunarUnits 生态按内容分为四条线：测量不确定度库、领域公式库、单位转换工具、公式计算工具。它们共享同一套单位语义，但面向不同使用场景。

## 分层关系

```text
LunarUnits
  ├─ LunarUncertainty
  ├─ LunarFormulas
  ├─ units-converter
  │   └─ units-converter-web
  └─ formulas-calculator
      └─ formulas-calculator-web
```

## 内容分块

| 分块 | 作用 | 页面 |
| --- | --- | --- |
| 测量不确定度库 | 在带单位数量之上表达标准不确定度，并支持一阶不确定度传播。 | [测量不确定度库](./uncertainty.md) |
| 领域公式库 | 管理公式元数据、输入单位和输出单位，是公式计算工具的领域层。 | [领域公式库](./formulas-library.md) |
| 单位转换 CLI/WebUI | 面向单位表达式换算，验证 parser、catalog、formatter 和单位换算能力。 | [单位转换 CLI/WebUI](./units-converter.md) |
| 公式计算 CLI/WebUI | 面向工程公式输入，验证公式层的单位归一化和输出单位正确性。 | [公式计算 CLI/WebUI](./formulas-calculator.md) |

## 设计边界

- 核心库负责单位和数量语义。
- 测量不确定度库负责标准不确定度表达与传播，不改变 LunarUnits 的核心 `Quantity` 语义。
- 领域公式库负责公式定义和单位归一化。
- CLI/WebUI 负责交互、输入解析、错误展示和结果呈现。
