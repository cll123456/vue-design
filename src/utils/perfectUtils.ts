/**
 * 防抖函数
 * @param f {Function} 需要防抖的函数
 * @param t {number} 防抖时间
 * @param im  是否立即执行
 * @returns
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function debounce<T extends (...args: any) => any>(
  f: T,
  t: number,
  im = false,
) {
  let timer: number,
    flag = true
  return (...args: unknown[]) => {
    // 需要立即执行的情况
    if (im) {
      if (flag) {
        f(...args)
        flag = false
      } else {
        clearTimeout(timer)
        timer = window.setTimeout(() => {
          f(...args)
          flag = true
        }, t)
      }
    } else {
      // 非立即执行的情况
      clearTimeout(timer)
      timer = window.setTimeout(() => {
        f(...args)
      }, t)
    }
  }
}
