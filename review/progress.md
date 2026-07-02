# 进度

LunarUnits 已完成核心库发布，并围绕单位换算和公式计算形成了小型生态。本页汇总面向评审的公开状态。

## 已完成

| 项目 | 版本 | 状态 |
| --- | --- | --- |
| LunarUnits | 0.1.6 | 核心库已发布，覆盖单位、数量、parser、formatter、affine、logarithmic、常数和 examples。 |
| LunarFormulas | 0.3.1 | 公式库已发布，负责公式元数据与单位归一化求值。 |
| units-converter | 0.1.0 | 命令行单位换算工具已发布。 |
| formulas-calculator | 0.1.2 | 命令行公式计算工具已发布。 |
| units-converter-web | 0.1.0 | 单位换算 Web UI 已完成本地版本。 |
| formulas-calculator-web | 0.1.2 | 公式计算 Web UI 已完成本地版本。 |
| LunarUnits-docs | 文档站 | 中文 VitePress 文档站，提供指南、案例、设计说明、评审入口和 demo 入口。 |

## 文档覆盖

- 首页：项目定位、核心能力和生态入口。
- 快速开始：安装、导入、构造数量、换算、错误处理、文本解析。
- Cookbook：基于 `examples/examples.mbt` 整理的可运行案例。
- 设计说明：运行时量纲检查、角度、仿射温度、对数单位、Catalog 边界。
- 评审入口：OSC2026 评审阅读顺序、验证命令和公开入口。

## 包内容

LunarUnits 的 mooncakes 发布包聚焦核心库、示例和随包文档。在线文档站独立维护，避免影响核心库用户通过 mooncakes 安装和使用。