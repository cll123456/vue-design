import { myComponents } from '@/types/common'
import { defineStore } from 'pinia'

interface ILeftMenuPanel {
  /**
   * 是否展示面板
   */
  hasShowPanel: boolean
  /**
   * 是否锁住面板
   */
  isLock: boolean
  /**
   * 面板的标题
   */
  panelTitle: string
  /**
   * 面板的宽度
   */
  panelWidth: number
  /**
   * 当前显示的组件
   */
  curComp?: myComponents
}

export const useLeftMenuPanelStore = defineStore<
  'leftMenuPanel',
  ILeftMenuPanel,
  {
    getCurComp: (state: ILeftMenuPanel) => myComponents | undefined
    getStateProps: (state: ILeftMenuPanel) => ILeftMenuPanel
  },
  {
    changeCurComp: (comp: myComponents) => void
  }
>('leftMenuPanel', {
  state: () => {
    return {
      /**
       * 是否展示面板
       */
      hasShowPanel: false,
      /**
       * 是否锁住面板
       */
      isLock: true,
      /**
       * 面板的标题
       */
      panelTitle: '',
      /**
       * 面板的宽度
       */
      panelWidth: 300,
      /**
       * 当前显示的组件
       */
      curComp: undefined,
    }
  },
  getters: {
    /**
     * 获取state属性
     * @param state
     * @returns
     */
    getStateProps: (state) => state,
    /**
     * 获取当前面板的组件
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
    changeCurComp(curComp: myComponents) {
      this.curComp = markRaw(curComp)
    },
  },
})
