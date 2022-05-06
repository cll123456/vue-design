import { typeObj } from '@/types/common'

/**
 * 深度克隆
 * @param target {typeObj}
 * @returns
 */
export function deepCopy(target: typeObj) {
  if (typeof target == 'object') {
    const result: typeObj = Array.isArray(target) ? [] : {}
    for (const key in target) {
      if (typeof target[key] == 'object') {
        result[key] = deepCopy(target[key])
      } else {
        result[key] = target[key]
      }
    }

    return result
  }

  return target
}
