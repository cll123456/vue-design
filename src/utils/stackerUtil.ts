import { safeStringify } from './stringUtils'
/**
 * 创建一个栈
 * @param current
 * @param length {number} 栈的长度 默认是10
 * @returns
 */
export default function createStack<T>(current: T, length = 10) {
  const stack = [current]

  let index = stack.length

  function update() {
    if (stack.length > length) {
      // 最前面的数据出栈
      stack.shift()
      index = stack.length
    }
    current = JSON.parse(safeStringify(stack[index - 1]))
    return current
  }

  return {
    /**
     * 插入数据
     */
    push: (value: T | ((payload: T) => T)) => {
      stack.length = index
      // @ts-expect-error: Value can be a function
      stack[index++] = typeof value === 'function' ? value(current) : value

      return update()
    },
    /**
     * 返回上一层
     */
    undo: () => {
      if (index > 1) index -= 1
      return update()
    },
    /**
     * 进入下一层
     * @returns
     */
    redo: () => {
      if (index < stack.length) index += 1
      return update()
    },
    /**
     * 获取数据
     * @returns
     */
    getData: () => stack,
    /**
     * 获取游标
     * @returns {number}
     */
    getIndex: () => index,
  }
}
