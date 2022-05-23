import createStack from '@/utils/stackerUtil'
import { safeStringify } from '@/utils/stringUtils'
import type { PiniaPluginContext } from 'pinia'

type Store = PiniaPluginContext['store']
type Options = PiniaPluginContext['options']

/**
 * 删除不需要进行数据快照的属性
 * @param options The options object defining the store passed to `defineStore()`.
 * @param store The store the plugin is augmenting.
 * @returns {Object} State of the store without omitted keys.
 */
function removeOmittedKeys(options: Options, store: Store): Store['$state'] {
  const clone = JSON.parse(safeStringify(store.$state))
  if (options.undo && options.undo.omit) {
    options.undo.omit.forEach((key) => {
      delete clone[key]
    })
    delete clone['snapshot']
    // delete clone['snapshotIndex']
    return clone
  }
  return clone
}

/**
 * Adds Undo/Redo properties to your store.
 * 添加 Undo/Redo 数据对于仓库
 * @example
 *
 * ```ts
 * import { PiniaUndo } from 'pinia-undo'
 *
 * // Pass the plugin to your application's pinia plugin
 * pinia.use(PiniaUndo)
 * ```
 */
export function PiniaUndo({ store, options }: PiniaPluginContext) {
  //  不存在undo属性直接返回
  if (!options.undo || options.undo.disable) return
  // 创建一个栈来保存数据
  const stack = createStack(removeOmittedKeys(options, store)['compList'])
  let preventUpdateOnSubscribe = false
  store.undo = () => {
    preventUpdateOnSubscribe = true
    store.$patch(stack.undo())
  }
  store.redo = () => {
    preventUpdateOnSubscribe = true
    store.$patch(stack.redo())
  }
  // 添加快照
  store.$state.snapshot = stack.getData()
  /**
   * 获取快照游标
   */
  store.getIndex = () => {
    preventUpdateOnSubscribe = true
    return stack.getIndex()
  }

  // 监听本仓库的数据变化，变化了就往栈里面添加数据
  store.$subscribe(
    () => {
      if (preventUpdateOnSubscribe) {
        preventUpdateOnSubscribe = false
        return
      }

      stack.push(removeOmittedKeys(options, store))
    },
    {
      flush: 'sync',
    },
  )
}

declare module 'pinia' {
  export interface PiniaCustomProperties {
    /**
     * Undo/Redo a state.
     *
     * @example
     *
     * ```ts
     * const counterStore = useCounterStore()
     *
     * counterStore.increment();
     * counterStore.undo();
     * counterStore.redo();
     * ```
     */
    undo: () => void
    redo: () => void
    getData: () => unknown[]
    /**
     * 获取快照游标
     */
    getIndex: () => number
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  export interface DefineStoreOptionsBase<S, Store> {
    /**
     * Disable or ignore specific fields.
     *
     * @example
     *
     * ```js
     * defineStore({
     *   id: 'counter',
     *   state: () => ({ count: 0, foo: 'bar' })
     *   undo: {
     *     // An array of fields that the plugin will ignore.
     *     omit: ['name'],
     *     // Disable history tracking of this store.
     *     disable: true
     *   }
     * })
     * ```
     */
    undo?: {
      disable?: boolean
      omit?: Array<keyof S>
    }
  }
}
