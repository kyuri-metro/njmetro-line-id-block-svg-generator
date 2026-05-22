# 南京地铁线路号方块 SVG Generator

[![TypeScript](https://img.shields.io/badge/TypeScript-Source%20Package-3178c6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-0f766e.svg)](LICENSE)

> 以下内容为 GPT 5.4 生成，但经过人工正确性检查，你可以作为参考

这是 kyuri-metro 组织下的南京地铁线路号方块 SVG 生成仓库，负责提供单一的纯函数导出接口。

## 示例图

![南京地铁线路号方块示例图](https://umamichi.moe/tools/njmetro-idblock/output-example.webp)

统一参数规格：

- foreground
- background
- lineNumber，范围 0 至 99，及 S0~9
- height

导出接口位于 [src/index.ts](src/index.ts)。

## 使用例

安装：

```bash
npm install @kyuri-metro/njmetro-line-id-block-svg-generator
```

调用：

```ts
import { generateLineIdBlockSvg } from '@kyuri-metro/njmetro-line-id-block-svg-generator'

const svg = generateLineIdBlockSvg({
	lineNumber: 3,
	height: 160,
})

document.body.innerHTML = svg
```

自定义颜色：

```ts
import { generateLineIdBlockSvg } from '@kyuri-metro/njmetro-line-id-block-svg-generator'

const svg = generateLineIdBlockSvg({
	lineNumber: 'S5' as `S${number}`,
	height: 120,
	background: '#F2DF67',
	foreground: '#373C57',
})
```

## 参考资料

见 https://github.com/kyuri-metro/njmetro-railmap-creator/tree/main/docs。

**mn**（`20`–`99`）模板无实物依据，仅由 **1n** 坐标水平平移（+43）得到的占位排版；伪稿与说明见 [njmetro-railmap-creator `docs/badges/20260520`](https://github.com/kyuri-metro/njmetro-railmap-creator/tree/main/docs/badges/20260520)。