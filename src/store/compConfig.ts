import { IBaseType } from '@/components/logicComps/commons/baseType'
import { defineStore } from 'pinia'

interface ICompConfig {
  /**
   * 组件数据列表
   */
  compList: IBaseType[]
  /**
   * 当前组件
   */
  curComp?: IBaseType
}

type keys = 'styles' | 'compProps' | 'config'

export const useCompConfigStore = defineStore<
  'compConfig',
  ICompConfig,
  {
    /**
     * 获取组件列表
     * @param state
     * @returns
     */
    getCompList: (state: ICompConfig) => IBaseType[]
    /**
     * 获取当前组件
     * @param state
     * @returns
     */
    getCurComp: (state: ICompConfig) => IBaseType | undefined
  },
  {
    /**
     * 改变当前组件数据
     * @param curComp
     */
    changeCurComp: (comp: IBaseType | undefined) => void
    /**
     * 改变当前组件的数据
     */
    changeData: <T extends keys>(key: T, value: Partial<IBaseType[T]>) => void
  }
>('compConfig', {
  state: () => {
    return {
      compList: [],
      curComp: undefined,
    }
  },
  undo: {
    omit: ['curComp'],
  },
  getters: {
    /**
     * 获取组件列表
     * @param state
     * @returns
     */
    getCompList: (state) => state.compList,
    /**
     * 获取当前组件
     * @param state
     * @returns
     */
    getCurComp: (state) => state.curComp,
  },
  actions: {
    /**
     * 改变当前组件
     * @param curComp
     */
    changeCurComp(curComp: IBaseType | undefined) {
      this.curComp = curComp
    },
    changeData(key, value) {
      if (Object.prototype.toString.call(value) === '[object Object]') {
        this.curComp![key] = {
          ...this.curComp![key],
          ...value,
        }
      }
      // 去更新对应数组的样式
      this.compList.forEach((f) => {
        if (f.id === this.curComp!.id) {
          f[key] = this.curComp![key]
        }
      })
    },
  },
})
