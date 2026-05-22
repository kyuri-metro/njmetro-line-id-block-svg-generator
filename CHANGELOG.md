# Changelog

本项目的 notable 变更按 [Keep a Changelog](https://keepachangelog.com/zh-CN/1.1.0/) 记录，版本号遵循 [语义化版本](https://semver.org/lang/zh-CN/)。

> 以下内容可能部分为 LLM 生成，但都经过人工检查，你可以信任它们

## [0.2.3] - 2026-05-23

### Changed

- 调整 **Sn** 模板（`lineNumber: S0`–`S9`）的文字位置，使输出与 [njmetro-railmap-creator `docs/badges/20260523`](https://github.com/kyuri-metro/njmetro-railmap-creator/tree/main/docs/badges/20260523) 参考稿一致。
  - 「S」：`x` 由 58 改为 43（`y=840`、`scale(0.81,1)`、`font-size:950px` 未变）。
  - 个位数字：`x` 由 724 改为 700（`y=850`、`scale(0.77,1)` 未变）。

### 说明

- 公共 API（`generateLineIdBlockSvg`、`getLineIdBlockWidth` 及 `LineIdBlockProps`）未变。
- 其余模板（`n`、`11`、`1n`、`mn`）未在本版本中修改。
- 若下游依赖固定 SVG 字符串或视觉快照，升级后请重新生成或更新基准。

## [0.2.2] - 2026-05-20

### Added

- 新增 **mn** 模板（`lineNumber: 20`–`99`）：十位数字 `m >= 2`、个位 `n`，宽高与 `1n`/`Sn` 同为 1000×1000。
  - **说明**：mn 模板仅由 **1n** 模板整体水平平移得出（左位 `57→100`、右位 `610→653`，各 +43），**没有现实依据**，仅为占位用伪稿；参考见 [njmetro-railmap-creator `docs/badges/20260520`](https://github.com/kyuri-metro/njmetro-railmap-creator/tree/main/docs/badges/20260520)。
  - 十位：`x=100`，`y=850`，`scale(0.77,1)`
  - 个位：`x=653`，`y=850`，`scale(0.77,1)`

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

[0.2.3]: https://github.com/kyuri-metro/njmetro-line-id-block-svg-generator/compare/v0.2.2...v0.2.3
[0.2.0]: https://github.com/kyuri-metro/njmetro-line-id-block-svg-generator/compare/v0.1.1...v0.2.0
[0.1.1]: https://github.com/kyuri-metro/njmetro-line-id-block-svg-generator/compare/v0.1.0...v0.1.1
[0.1.0]: https://github.com/kyuri-metro/njmetro-line-id-block-svg-generator/releases/tag/v0.1.0
