# 测试

LunarUnits 使用 MoonBit 测试和可运行文档示例来稳定公开行为。核心库、公式库和应用层工具都可以用本地命令验证。

## 核心库

```bash
cd LunarUnits
moon check --deny-warn --target all
moon info
git diff --exit-code
moon fmt
git diff --exit-code
moon test --deny-warn --target all
```

接口生成和格式化都必须保持工作树无差异。CI 在 Ubuntu 与 Windows 上执行这些门禁；测试覆盖 wasm、wasm-gc、JavaScript 和 native target。覆盖范围包括基础符号代数、量纲比较、单位组合、换算、格式化、`Quantity` 运算、扩展维度、parser、catalog、affine、logarithmic 和 examples。

## 公式库与应用层

```bash
cd LunarFormulas
moon test

cd ../units-converter
moon test

cd ../formulas-calculator
moon test
```

这些测试验证公式输入单位归一化、输出单位正确性，以及应用层不会绕过领域库的单位语义。

## 文档站

```bash
cd LunarUnits-docs
npm install
npm run docs:build
npm audit --audit-level=high
```
