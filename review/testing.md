# 测试

LunarUnits 使用 MoonBit 测试和可运行文档示例来稳定公开行为。核心库、公式库和应用层工具都可以用本地命令验证。

## 核心库

```bash
cd LunarUnits
moon test
```

核心库测试覆盖：

- 基础符号代数和量纲比较。
- 单位组合、换算和格式化。
- `Quantity` 运算、同量纲换算和不兼容量纲拒绝。
- 扩展维度：angle、solid angle、information、currency、count。
- 领域单位与便捷构造函数。
- parser、catalog、preset。
- affine 温度和 logarithmic dB/Np。
- examples 中的可运行示例。

## 公式库与应用层

```bash
cd LunarFormulas
moon test

cd ../units-converter
moon test

cd ../formulas-calculator
moon test
```

公式计算相关测试重点验证输入单位归一化、输出单位正确性，以及应用层不会绕过领域库的单位语义。

## 文档站

```bash
cd LunarUnits-docs
npm install
npm run docs:build
npm audit --audit-level=high
```

文档站使用 VitePress。构建和依赖审计命令用于确认站点内容可以发布，并且没有高危 npm audit 告警。