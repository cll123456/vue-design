/**
 * 对齐方式
 * text-align: left;
 * text-align: center;
 * text-align: right;
 */
export type TAlignType = 'left' | 'center' | 'right'
/**
 * 边框的类型
 * border-style: none
 * border-style: solid
 * border-style: dashed
 * border-style: dotted
 */
export type TBorderStyle = 'none' | 'solid' | 'dashed' | 'dotted'

/**
 * 样式的鼠标方向值
 */
export type directionType =
  | 'top'
  | 'bottom'
  | 'left'
  | 'right'
  | 'left-top'
  | 'right-top'
  | 'left-bottom'
  | 'right-bottom'
