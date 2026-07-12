---
layout: home

hero:
  name: LunarUnits
  text: MoonBit 运行时量纲检查与单位计算
  tagline: 显式建模物理数量与单位，换算兼容量纲，并在运行时拒绝错误的量纲组合。
  actions:
    - theme: brand
      text: 快速开始
      link: /guide/getting-started
    - theme: alt
      text: 案例
      link: /cookbook/
    - theme: alt
      text: API 文档
      link: https://mooncakes.io/docs/FrozenLemonTee/LunarUnits@0.1.9
    - theme: alt
      text: 评审入口
      link: /review/

features:
  - title: 量纲错误不再静默通过
    details: 数值始终携带单位；长度加时间、质量直接换成温度这类错误会被运行时检查拒绝。
  - title: 单位换算和复合单位自动推导
    details: 同量纲换算保持物理量不变，乘法、除法和整数幂会自动组合单位，例如 m/s²、N、J。
  - title: 面向真实输入的 Parser 与 Catalog
    details: 通过不可变 Catalog 解析 m/s^2、9.8 m/s^2、N、Hz 等文本输入，并返回可分类处理的错误。
  - title: 非线性尺度分层处理
    details: 仿射温度点、温度差、对数 level 与 gain 不混进普通乘法单位核心。
  - title: 从库到工具的生态闭环
    details: 公式库、CLI 和 Web UI demo 都复用同一套单位语义。
  - title: 可验证的工程质量
    details: 核心库、公式库和工具项目都提供本地测试入口。
---

## 适用场景

LunarUnits 适合工程计算、科学计算、教学示例和数据处理代码中那些“数值本身不够表达语义”的位置。项目采用运行时量纲检查，在 MoonBit 生态中提供可用、可测试、可扩展的单位安全基础库。

## 继续阅读

- [快速开始](./guide/getting-started.md)：安装、构造数量、换算和错误处理。
- [案例](./cookbook/)：按场景组织的可运行示例。
- [设计说明](./design/runtime-dimensional-checking.md)：运行时量纲检查的核心取舍。
- [生态](./ecosystem/)：公式库、CLI 和 Web UI 项目入口。
