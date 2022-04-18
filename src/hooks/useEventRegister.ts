/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * 事件注册器，用于在页面挂载的时候注册事件，卸载的时候解除事件绑定
 * @param window {Window} 窗口对象
 * @param fn {function} 回调函数
 * @param eventType {string} 事件类型
 */
export function useEventRegister(
  window: Window,
  fn: (...args: any) => void,
  eventType: string,
): void
/**
 * 事件注册器，用于在页面挂载的时候注册事件，卸载的时候解除事件绑定
 * @param selector {string} 选择器
 * @param fn {function} 回调函数
 * @param eventType {string} 事件类型
 */
export function useEventRegister(
  selector: string,
  fn: (...args: any) => void,
  eventType: string,
): void
/**
 * 事件注册器，用于在页面挂载的时候注册事件，卸载的时候解除事件绑定
 * @param dom {string | Window} 选择器|窗口对象
 * @param fn {function} 回调函数
 * @param eventType {string} 事件类型
 */
export function useEventRegister(
  dom: string | Window,
  fn: (...args: any) => void,
  eventType: string,
): void {
  let curDom: Window | HTMLElement
  onMounted(() => {
    if (typeof dom === 'string') {
      curDom = document.querySelector(dom) as HTMLElement
    } else {
      curDom = dom
    }
    curDom.addEventListener(eventType, fn, { passive: true })
  })

  onBeforeUnmount(() => {
    curDom.removeEventListener(eventType, fn)
  })
}
