import { IBaseType } from '@/components/logicComps/commons/baseType'
import { defineStore } from 'pinia'

interface ICompConfig {
  compList: IBaseType[]
}

export const useCompConfigStore = defineStore<
  'compConfig',
  ICompConfig,
  {
    getCompList: (state: ICompConfig) => IBaseType[]
  }
>('compConfig', {
  state: () => {
    return {
      compList: [],
    }
  },
  getters: {
    /**
     * 获取组件列表
     * @param state
     * @returns
     */
    getCompList: (state) => state.compList,
  },
})
