# 评审入口

此页面是 OSC2026 开源大赛评审专用入口，用于快速查看 LunarUnits 的项目价值、完成度、工程质量和可展示生态。

大赛宣传网站：[OSC2026 官方赛事宣传页](https://moonbitlang.github.io/OSC2026/)。

## 建议阅读顺序

1. [快速开始](../guide/getting-started.md)：确认库的安装、构造、换算和错误处理路径。
2. [运行时量纲检查](../design/runtime-dimensional-checking.md)：理解项目的核心设计取舍。
3. [案例](../cookbook/)：查看与工程计算相关的展示样例。
4. [项目进度](./progress.md)：查看核心库与生态项目的状态。
5. [测试](./testing.md)：查看如何本地验证核心行为。
6. [演示](../demos/)：查看 Web UI demo 入口。

## 评审关注点

| 方向 | 对应内容 |
| --- | --- |
| 项目价值 | 显式建模单位与量纲，减少工程和科学计算中的单位错误。 |
| 工程质量 | 核心模型、单位集合、parser、formatter、affine、logarithmic 分层清晰。 |
| 可用性 | 支持 mooncakes 安装、领域构造函数、文本解析、格式化输出和错误分类。 |
| 生态完整度 | 已扩展到 LunarFormulas、两个 CLI、两个 Web UI 项目。 |
| 可验证性 | 核心库、公式库和应用层均通过 MoonBit 测试验证，文档站可本地构建。 |

## 快速验证命令

核心库：

```bash
git clone https://github.com/FrozenLemonTee/LunarUnits.git
cd LunarUnits
moon test
```

文档站：

```bash
git clone https://github.com/FrozenLemonTee/LunarUnits-docs.git
cd LunarUnits-docs
npm install
npm run docs:build
```

## 公开入口

- GitHub 主仓：<https://github.com/FrozenLemonTee/LunarUnits>
- mooncakes 包：`FrozenLemonTee/LunarUnits`
- 赛事页面：<https://moonbitlang.github.io/OSC2026/>