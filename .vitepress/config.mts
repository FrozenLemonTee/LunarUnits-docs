import { defineConfig } from "vitepress"

export default defineConfig({
  lang: "zh-CN",
  title: "LunarUnits",
  description: "面向 MoonBit 的运行时量纲检查与单位计算基础库。",
  base: "/LunarUnits-docs/",
  cleanUrls: true,
  themeConfig: {
    nav: [
      { text: "指南", link: "/guide/getting-started" },
      { text: "案例", link: "/cookbook/" },
      { text: "设计", link: "/design/runtime-dimensional-checking" },
      { text: "生态", link: "/ecosystem/" },
      { text: "评审", link: "/review/" },
      { text: "API", link: "https://mooncakes.io/docs/FrozenLemonTee/LunarUnits@0.1.7" },
      { text: "演示", link: "/demos/" }
    ],
    sidebar: [
      {
        text: "指南",
        items: [
          { text: "快速开始", link: "/guide/getting-started" },
          { text: "API 文档", link: "https://mooncakes.io/docs/FrozenLemonTee/LunarUnits@0.1.7" },
          { text: "数量与单位", link: "/guide/quantities-and-units" },
          { text: "换算与格式化", link: "/guide/conversion-and-formatting" },
          { text: "Parser 与 Catalog", link: "/guide/parser-and-catalog" },
          { text: "仿射与对数单位", link: "/guide/affine-and-logarithmic" }
        ]
      },
      {
        text: "案例",
        items: [
          { text: "概览", link: "/cookbook/" },
          { text: "基础力学与换算", link: "/cookbook/mechanics-and-conversion" },
          { text: "扩展维度", link: "/cookbook/extension-dimensions" },
          { text: "货币、计数与费率", link: "/cookbook/money-count-rate" },
          { text: "Parser 与 Formatter", link: "/cookbook/parser-and-formatting" },
          { text: "仿射与对数尺度", link: "/cookbook/affine-and-logarithmic" },
          { text: "力矩与能量", link: "/cookbook/torque-vs-energy" },
          { text: "显热计算", link: "/cookbook/sensible-heat" }
        ]
      },
      {
        text: "设计",
        items: [
          { text: "运行时量纲检查", link: "/design/runtime-dimensional-checking" },
          { text: "角度", link: "/design/angle" },
          { text: "仿射温度", link: "/design/affine-temperature" },
          { text: "对数单位", link: "/design/logarithmic-units" },
          { text: "Catalog 边界", link: "/design/catalog-boundary" }
        ]
      },
      {
        text: "生态",
        items: [
          { text: "概览", link: "/ecosystem/" },
          { text: "领域公式库", link: "/ecosystem/formulas-library" },
          { text: "单位转换 CLI/WebUI", link: "/ecosystem/units-converter" },
          { text: "公式计算 CLI/WebUI", link: "/ecosystem/formulas-calculator" }
        ]
      },
      {
        text: "评审",
        items: [
          { text: "入口", link: "/review/" },
          { text: "进度", link: "/review/progress" },
          { text: "测试", link: "/review/testing" }
        ]
      }
    ],
    socialLinks: [
      { icon: "github", link: "https://github.com/FrozenLemonTee/LunarUnits" }
    ],
    search: {
      provider: "local"
    }
  }
})