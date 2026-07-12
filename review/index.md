# 评审入口

此页面是 OSC2026 开源大赛评审专用入口，用于快速查看 LunarUnits 的项目价值、完成度、工程质量和可展示生态。

大赛宣传网站：[OSC2026 官方赛事宣传页](https://moonbitlang.github.io/OSC2026/)。

## 建议阅读顺序

1. [快速开始](../guide/getting-started.md)：安装、构造数量、换算和错误处理。
2. [运行时量纲检查](../design/runtime-dimensional-checking.md)：核心设计取舍。
3. [案例](../cookbook/)：工程计算相关样例。
4. [生态](../ecosystem/)：核心库、公式库、CLI 和 Web UI 项目。
5. [测试](./testing.md)：本地验证命令。

## 评审关注点

| 方向 | 对应内容 |
| --- | --- |
| 项目价值 | 显式建模单位与量纲，减少工程和科学计算中的单位错误。 |
| 工程质量 | 核心模型、单位集合、parser、formatter、affine、logarithmic 分层清晰。 |
| 可用性 | 支持 mooncakes 安装，API 文档覆盖公开包接口，并提供领域构造函数、文本解析、格式化输出和错误分类。 |
| 生态完整度 | 已扩展到 LunarFormulas、两个 CLI、两个 Web UI 项目。 |
| 可验证性 | 核心库、公式库和应用层均通过 MoonBit 测试验证。 |

## 公开入口

- GitHub 主仓：<https://github.com/FrozenLemonTee/LunarUnits>
- GitLink 镜像：<https://gitlink.org.cn/FrozenLemonTee/LunarUnits>
- API 文档：<https://mooncakes.io/docs/FrozenLemonTee/LunarUnits@0.1.9>
- GitHub Actions：<https://github.com/FrozenLemonTee/LunarUnits/actions/workflows/ci.yml>
- 赛事页面：<https://moonbitlang.github.io/OSC2026/>
