# 单位转换 CLI/WebUI

单位转换工具围绕 `units-converter` 和 `units-converter-web` 展开，面向“把一个带单位的数量转换到另一个单位”的直接需求。

## CLI

`units-converter` 提供命令行入口，适合快速验证单位表达式、脚本调用和终端工作流。

它主要覆盖：

- 文本单位解析。
- Catalog 符号解析。
- 同量纲单位换算。
- 输出格式化。
- 非法输入和不兼容量纲错误提示。

## Web UI

`units-converter-web` 提供浏览器界面，复用 CLI 背后的领域逻辑。前端层只处理交互、默认输入、错误展示和结果呈现。

## 项目入口

- CLI 仓库：<https://github.com/FrozenLemonTee/units-converter>
- Web UI 仓库：<https://github.com/FrozenLemonTee/units-converter-web>
- 在线演示：[单位换算 WebUI](https://frozenlemontee.github.io/units-converter-web/)
