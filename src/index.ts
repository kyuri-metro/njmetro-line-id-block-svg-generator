import { NJMETRO_LINE_COLORS } from '@kyuri-metro/njmetro-palette'

export type NjMetroLineId = number | `S${number}`

export type LineIdBlockProps = {
  background?: string
  fontFamily?: string
  foreground?: string
  height?: number
  lineNumber: NjMetroLineId
}

type SupportedBadgeTemplate =
  | {
      kind: 'n'
      width: number
      digit: string
      paletteKey: NjMetroLineId
    }
  | {
      kind: '11'
      width: number
      paletteKey: NjMetroLineId
    }
  | {
      kind: '1n'
      width: number
      digit: string
      paletteKey: NjMetroLineId
    }
  | {
      kind: 'Sn'
      width: number
      digit: string
      paletteKey: NjMetroLineId
    }

const BASE_HEIGHT = 1000
const FALLBACK_BACKGROUND = '#666666'
const FALLBACK_FOREGROUND = '#000000'
const DEFAULT_FONT_FAMILY = 'Helvetica, "Helvetica Neue", Arial, "Segoe UI", sans-serif'

function escapeXml(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;')
}

function resolveBadgeTemplate(lineNumber: NjMetroLineId): SupportedBadgeTemplate | null {
  const lineString = String(lineNumber).trim()

  if (/^[0-9]$/.test(lineString)) {
    return { kind: 'n', width: 500, digit: lineString, paletteKey: Number(lineString) }
  }

  if (lineString === '11') {
    return { kind: '11', width: 1000, paletteKey: 11 }
  }

  if (/^1\d$/.test(lineString)) {
    return { kind: '1n', width: 1000, digit: lineString[1], paletteKey: Number(lineString) }
  }

  if (/^S[0-9]$/.test(lineString)) {
    return { kind: 'Sn', width: 1000, digit: lineString[1], paletteKey: lineString as `S${number}` }
  }

  return null
}

function getBadgePalette(template: SupportedBadgeTemplate, foreground?: string, background?: string) {
  const metroPalette = NJMETRO_LINE_COLORS[template.paletteKey]

  return {
    background: background ?? metroPalette?.background.trim() ?? FALLBACK_BACKGROUND,
    foreground: foreground ?? metroPalette?.foreground.trim() ?? FALLBACK_FOREGROUND,
  }
}

function getLineIdBlockWidth(lineNumber: NjMetroLineId, height = 100) {
  const template = resolveBadgeTemplate(lineNumber)

  if (!template) {
    return null
  }

  return (template.width / BASE_HEIGHT) * height
}

export function generateLineIdBlockSvg({
  background,
  fontFamily = DEFAULT_FONT_FAMILY,
  foreground,
  height = 100,
  lineNumber,
}: LineIdBlockProps) {
  const template = resolveBadgeTemplate(lineNumber)

  if (!template) {
    return ''
  }

  const width = getLineIdBlockWidth(lineNumber, height) ?? 0
  const palette = getBadgePalette(template, foreground, background)
  const textStyle1000 = `font-size:1000px;font-family:${escapeXml(fontFamily)};fill:${escapeXml(palette.foreground)}`
  const textStyle950 = `font-size:950px;font-family:${escapeXml(fontFamily)};fill:${escapeXml(palette.foreground)}`
  const rect = `<rect width="${template.width}" height="${BASE_HEIGHT}" fill="${escapeXml(palette.background)}" />`

  switch (template.kind) {
    case 'n':
      return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${template.width} ${BASE_HEIGHT}">${rect}<text style="${textStyle1000}" x="75" y="850" transform="scale(0.73,1)">${escapeXml(template.digit)}</text></svg>`
    case '11':
      return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${template.width} ${BASE_HEIGHT}">${rect}<text style="${textStyle1000}" x="535" y="850" transform="scale(0.95,1)">1</text><text style="${textStyle1000}" x="85" y="850" transform="scale(0.95,1)">1</text></svg>`
    case '1n':
      return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${template.width} ${BASE_HEIGHT}">${rect}<text style="${textStyle1000}" x="75" y="850" transform="scale(0.73,1)">1</text><text style="${textStyle1000}" x="650" y="850" transform="scale(0.73,1)">${escapeXml(template.digit)}</text></svg>`
    case 'Sn':
      return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${template.width} ${BASE_HEIGHT}">${rect}<text style="${textStyle950}" x="58" y="840" transform="scale(0.81,1)">S</text><text style="${textStyle1000}" x="760" y="850" transform="scale(0.73,1)">${escapeXml(template.digit)}</text></svg>`
  }
}