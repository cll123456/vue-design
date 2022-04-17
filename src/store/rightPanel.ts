import { myComponents } from '@/types/common'
import { defineStore } from 'pinia'

interface rightPanelState {
  /**
   * 右侧面板的宽度 默认是230
   */
  width?: number
  /**
   * 背景颜色 默认是fff
   */
  bgColor?: string
  /**
   * 是否展示右侧的面板 默认 false
   */
  isShowRightPanel?: boolean
  /**
   * 默认展示的组件
   */
  rightPanelComp?: myComponents
}

export const useRightPanelStore = defineStore<
  'rightPanel',
  rightPanelState,
  {
    rightPanelComps: (state: rightPanelState) => myComponents | undefined
  },
  {
    changeRightPanelComps: (comp: myComponents) => void
  }
>('rightPanel', {
  state: () => {
    return {
      /**
       * 右侧面板的宽度 默认是230
       */
      width: 230,
      /**
       * 背景颜色 默认是fff
       */
      bgColor: '#fff',
      /**
       * 是否展示右侧的面板 默认 false
       */
      isShowRightPanel: false,
      /**
       * 默认展示的组件
       */
      rightPanelComp: undefined,
    }
  },
  getters: {
    /**
     * 获取右侧内容组件
     * @param state {rightPanelState}
     * @returns
     */
    rightPanelComps: (state: rightPanelState) => state.rightPanelComp,
  },
  actions: {
    changeRightPanelComps(comp: myComponents) {
      this.rightPanelComp = markRaw(comp)
    },
  },
})
