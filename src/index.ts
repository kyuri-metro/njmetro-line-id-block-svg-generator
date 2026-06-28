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
  /** Pseudo layout: horizontal shift of 1n only (+52 on both digit x); no field reference. */
  | {
      kind: 'mn'
      width: number
      tens: string
      ones: string
      paletteKey: NjMetroLineId
    }

const BASE_HEIGHT = 1000
const FALLBACK_BACKGROUND = '#666666'
const FALLBACK_FOREGROUND = '#000000'
export const DEFAULT_LINE_ID_BLOCK_FONT_FAMILY = 'FZHei-B01, Helvetica, sans-serif'

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

  if (/^[2-9]\d$/.test(lineString)) {
    return {
      kind: 'mn',
      width: 1000,
      tens: lineString[0],
      ones: lineString[1],
      paletteKey: Number(lineString),
    }
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

export function getLineIdBlockWidth(lineNumber: NjMetroLineId, height = 100) {
  const template = resolveBadgeTemplate(lineNumber)

  if (!template) {
    return null
  }

  return (template.width / BASE_HEIGHT) * height
}

export function generateLineIdBlockSvg({
  background,
  fontFamily = DEFAULT_LINE_ID_BLOCK_FONT_FAMILY,
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
  const textStyle960 = `font-size:960px;font-family:${escapeXml(fontFamily)};fill:${escapeXml(palette.foreground)}`
  const rect = `<rect width="${template.width}" height="${BASE_HEIGHT}" fill="${escapeXml(palette.background)}" />`

  switch (template.kind) {
    case 'n':
      return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${template.width} ${BASE_HEIGHT}">${rect}<text style="${textStyle1000}" x="80.5" y="850" transform="scale(0.73,1)">${escapeXml(template.digit)}</text></svg>`
    case '11':
      return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${template.width} ${BASE_HEIGHT}">${rect}<text style="${textStyle1000}" x="519" y="850" transform="scale(0.95,1)">1</text><text style="${textStyle1000}" x="72.5" y="850" transform="scale(0.95,1)">1</text></svg>`
    case '1n':
      return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${template.width} ${BASE_HEIGHT}">${rect}<text style="${textStyle1000}" x="54.5" y="850" transform="scale(0.77,1)">1</text><text style="${textStyle1000}" x="605" y="850" transform="scale(0.77,1)">${escapeXml(template.digit)}</text></svg>`
    case 'Sn':
      return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${template.width} ${BASE_HEIGHT}">${rect}<text style="${textStyle960}" x="57" y="846" transform="scale(0.81,1)">S</text><text style="${textStyle1000}" x="708" y="850" transform="scale(0.77,1)">${escapeXml(template.digit)}</text></svg>`
    case 'mn':
      return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${template.width} ${BASE_HEIGHT}">${rect}<text style="${textStyle1000}" x="106.5" y="850" transform="scale(0.77,1)">${escapeXml(template.tens)}</text><text style="${textStyle1000}" x="657" y="850" transform="scale(0.77,1)">${escapeXml(template.ones)}</text></svg>`
  }
}
