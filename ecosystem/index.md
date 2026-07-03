# 生态

LunarUnits 生态围绕同一套单位语义展开：核心库负责数量与单位，公式库负责公式求值，CLI 和 Web UI 负责不同使用入口。

## 分层关系

```text
LunarUnits
  └─ LunarFormulas
      ├─ units-converter / formulas-calculator
      └─ units-converter-web / formulas-calculator-web
```

## 入口

- [CLI](./cli.md)：终端中的单位换算和公式计算。
- [Web UI](./webui.md)：浏览器中的交互式界面。
- [公式计算](./formulas.md)：公式库与应用层之间的边界。
- [演示](../demos/)：在线 demo 入口。