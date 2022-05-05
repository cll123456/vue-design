import { Styles } from '@/components/logicComps/commons/baseType'

/**
 * 获取样式
 * @param style {Styles}
 * @param filter {Array<string>}
 * @returns
 */
export function getStyle(style: Styles, filter: Array<string>) {
  const needUnit = [
    'fontSize',
    'width',
    'height',
    'top',
    'left',
    'borderWidth',
    'letterSpacing',
    'borderRadius',
  ]

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const result: { [key: string]: any } = {}
  Object.keys(style).forEach((key) => {
    if (filter.includes(key)) {
      if (key != 'rotate') {
        result[key] = style[key]

        if (needUnit.includes(key)) {
          result[key] += 'px'
        }
      } else {
        result.transform = key + '(' + style[key] + 'deg)'
      }
    } else {
      result[key] = style[key]
    }
  })

  return result
}
