# 公式计算 CLI/WebUI

公式计算工具围绕 `formulas-calculator` 和 `formulas-calculator-web` 展开，面向“选择公式、填写输入、得到带单位结果”的工作流。

## CLI

`formulas-calculator` 提供命令行入口，适合快速计算、脚本调用和公式库回归验证。

它主要覆盖：

- 列出可用公式。
- 查看公式输入和默认单位。
- 解析带单位输入。
- 调用 LunarFormulas 完成单位归一化和求值。
- 输出带单位的结果。

## Web UI

`formulas-calculator-web` 提供浏览器界面，适合展示公式输入、默认值、单位选择和结果反馈。它不重新实现公式逻辑，而是复用 CLI 与公式库背后的同一套领域语义。

## 项目入口

- CLI 仓库：<https://github.com/FrozenLemonTee/formulas-calculator>
- Web UI 仓库：<https://github.com/FrozenLemonTee/formulas-calculator-web>
- 在线演示：[演示页面](../demos/)