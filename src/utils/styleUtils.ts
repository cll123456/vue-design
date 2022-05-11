import { Styles } from '@/components/logicComps/commons/baseType'
import { typeObj } from '@/types/common'
import { directionType } from '@/types/styleType'

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

  const result: typeObj = {}
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

export function calcMoveStyle(
  direction: directionType,
  curPos: {
    x: number
    y: number
    width: number
    height: number
    top: number
    left: number
  },
  destPos: { x: number; y: number },
) {
  let resHeight = curPos.height,
    resTop = curPos.top,
    resLeft = curPos.left,
    resWidth = curPos.width
  // 组件宽高比
  switch (direction) {
    case 'top':
      const moveY = destPos.y - curPos.y

      if (moveY > 0) {
        // 向下移动  // 如果高度小于20，则不移动
        resHeight = curPos.height - moveY <= 20 ? 20 : curPos.height - moveY
        resTop =
          moveY < curPos.height - 20
            ? curPos.top + moveY
            : curPos.top + moveY - (curPos.height - 20)
      } else {
        // 向上移动
        resHeight = curPos.height - moveY
        resTop = curPos.top + moveY
      }
      break
    case 'bottom':
      const moveY2 = destPos.y - curPos.y
      resHeight = curPos.height + moveY2
      break
    case 'left':
      const moveX = destPos.x - curPos.x
      if (moveX > 0) {
        // 向右移动
        resWidth = curPos.width - moveX <= 20 ? 20 : curPos.width - moveX
        resLeft =
          moveX < curPos.width - 20
            ? curPos.left + moveX
            : curPos.left + moveX - (curPos.width - 20)
      } else {
        // 向左移动
        resWidth = curPos.width - moveX
        resLeft = curPos.left + moveX
      }
      break
    case 'right':
      const moveX2 = destPos.x - curPos.x
      resWidth = curPos.width + moveX2
      break
    case 'left-top':
      const moveX3 = destPos.x - curPos.x
      const moveY3 = destPos.y - curPos.y
      if (moveX3 > 0 || moveY3 > 0) {
        // 斜向下移动

        resWidth = curPos.width - moveX3 <= 20 ? 20 : curPos.width - moveX3
        resLeft = curPos.left + moveX3
        resHeight = curPos.height - moveY3 <= 20 ? 20 : curPos.height - moveY3
        resTop = curPos.top + moveY3
      } else {
        // 斜向上移动
        resWidth = curPos.width - moveX3
        resHeight = curPos.height - moveY3
        resLeft = curPos.left + moveX3
        resTop = curPos.top + moveY3
      }
      break
    case 'right-top':
      const moveX4 = destPos.x - curPos.x
      const moveY4 = destPos.y - curPos.y
      if (moveX4 < 0 || moveY4 > 0) {
        // 斜向下移动
        resWidth = curPos.width + moveX4 <= 20 ? 20 : curPos.width + moveX4
        resHeight = curPos.height - moveY4 <= 20 ? 20 : curPos.height - moveY4
        resTop = curPos.top + moveY4
      } else {
        // 斜向上移动
        resWidth = curPos.width + moveX4
        resHeight = curPos.height - moveY4
        resTop = curPos.top + moveY4
      }
      break
    case 'left-bottom':
      const moveX5 = destPos.x - curPos.x
      const moveY5 = destPos.y - curPos.y
      if (moveX5 < 0 || moveY5 > 0) {
        // 斜向下移动, 放大组件
        resWidth = curPos.width - moveX5
        resLeft = curPos.left + moveX5
        resHeight = curPos.height + moveY5
      } else {
        // 斜向上移动, 缩小组件
        resWidth = curPos.width - moveX5 <= 20 ? 20 : curPos.width - moveX5
        resLeft = curPos.left + moveX5
        resHeight = curPos.height + moveY5
      }
      break
    case 'right-bottom':
      const moveX6 = destPos.x - curPos.x
      const moveY6 = destPos.y - curPos.y
      if (moveX6 > 0 || moveY6 > 0) {
        // 斜向下移动, 放大组件
        resWidth = curPos.width + moveX6
        resHeight = curPos.height + moveY6
      } else {
        // 斜向上移动, 缩小组件
        resHeight = curPos.height + moveY6 <= 20 ? 20 : curPos.height + moveY6
        resWidth = curPos.width + moveX6 <= 20 ? 20 : curPos.width + moveX6
      }
  }
  return {
    width: Math.round(resWidth),
    left: Math.round(resLeft),
    height: Math.round(resHeight),
    top: Math.round(resTop),
  }
}
