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
      text: 评审入口
      link: /review/

features:
  - title: 带量纲的数量计算
    details: 数值始终携带单位，长度加时间这类错误会被显式拒绝，而不是悄悄产生错误结果。
  - title: 实用单位换算
    details: 覆盖 SI、常见领域单位、扩展维度、仿射温度和对数单位，兼容量纲之间可以保持物理量不变地换算。
  - title: Parser、Formatter 与 Catalog
    details: 支持符号解析、单位表达式解析，以及面向日志、界面和文档的数量格式化输出。
  - title: 可展示的生态工具
    details: 单位换算 CLI、公式计算 CLI 与浏览器演示都建立在同一套领域库之上。
---