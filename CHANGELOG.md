# Changelog

本项目的 notable 变更按 [Keep a Changelog](https://keepachangelog.com/zh-CN/1.1.0/) 记录，版本号遵循 [语义化版本](https://semver.org/lang/zh-CN/)。

> 以下内容可能部分为 LLM 生成，但都经过人工检查，你可以信任它们

## [0.2.1] - 2026-05-16

修正发布包前未先 npm run build 的发包错误

## [0.2.0] - 2026-05-16

### Changed

- 调整 `11`、`1n`、`Sn` 三类模板的文字位置与水平缩放，使输出更接近实物线路号方块；排版依据 [njmetro-railmap-creator `docs/badges/20260516`](https://github.com/kyuri-metro/njmetro-railmap-creator/tree/main/docs/badges/20260516)。
  - **11**（`lineNumber: 11`）：右侧「1」的 `x` 由 535 改为 519。
  - **1n**（`lineNumber: 12`–`19`）：「1」与个位数字的 `x` 分别为 57 / 610，水平缩放由 0.73 改为 0.77。
  - **Sn**（`lineNumber: S0`–`S9`）：个位数字的 `x` 由 760 改为 724，水平缩放由 0.73 改为 0.77；「S」字形参数未变。

### 说明

- 公共 API（`generateLineIdBlockSvg`、`getLineIdBlockWidth` 及 `LineIdBlockProps`）未变。
- 单数字 `n`（`0`–`9`）模板的 SVG 几何未在本版本中修改。
- 若下游依赖固定 SVG 字符串或视觉快照，升级后请重新生成或更新基准。

## [0.1.1] - 2026-05-04

### Added

- `LineIdBlockProps` 新增可选 `fontFamily`；导出 `DEFAULT_LINE_ID_BLOCK_FONT_FAMILY`。

## [0.1.0] - 2026-05-04

### Added

- 初始发布：`generateLineIdBlockSvg`、`getLineIdBlockWidth`；支持 `0`–`9`、`11`、`12`–`19`、`S0`–`S9` 线路号方块 SVG 生成。

[0.2.0]: https://github.com/kyuri-metro/njmetro-line-id-block-svg-generator/compare/v0.1.1...v0.2.0
[0.1.1]: https://github.com/kyuri-metro/njmetro-line-id-block-svg-generator/compare/v0.1.0...v0.1.1
[0.1.0]: https://github.com/kyuri-metro/njmetro-line-id-block-svg-generator/releases/tag/v0.1.0
