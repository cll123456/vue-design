import { IBaseType } from '@/components/logicComps/commons/baseType'
import { defineStore } from 'pinia'

export const useCompConfigStore = defineStore<
  'compConfig',
  {
    compList: IBaseType[]
  }
>('compConfig', {
  state: () => {
    return {
      compList: [],
    }
  },
})
