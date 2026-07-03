# 领域公式库

领域公式库指 `LunarFormulas`。它建立在 LunarUnits 之上，负责把工程公式建模为可复用对象。

## 职责

- 描述公式名称、说明、输入项和输出项。
- 为每个输入声明期望单位或量纲。
- 在求值前把输入归一化到公式需要的单位。
- 返回带单位的结果，而不是裸数值。

## 与核心库的关系

LunarUnits 只关心数量、单位和换算；LunarFormulas 关心“这些数量如何进入某个公式”。这个边界让核心库保持通用，同时让公式计算可以表达更强的领域语义。

## 示例场景

- 显热计算：质量、比热容、温度差到热量。
- 欧姆定律：电压、电流、电阻之间的关系。
- 密度、流量、功率等常见工程公式。

## 项目入口

- GitHub：<https://github.com/FrozenLemonTee/LunarFormulas>
- API 文档：<https://mooncakes.io/docs/FrozenLemonTee/LunarFormulas@0.3.1>