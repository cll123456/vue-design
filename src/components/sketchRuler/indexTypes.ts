import { ExtractPropTypes, PropType } from "vue"
import { IPaletteObj } from "../canvasRules/canvasRulesType"

/**
 * 正文区域
 */
export interface ShadowType {
  x: number
  y: number
  width: number
  height: number
}
/**
 * 指示线的类型
 */
export interface lineType {
  h: Array<number>
  v: Array<number>
}
