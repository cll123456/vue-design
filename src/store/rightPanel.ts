import { defineStore } from 'pinia'
export const useRightPanelStore = defineStore('rightPanel', {
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
       * 是否展示右侧的面板
       */
      isShowRightPanel: true,
    }
  },
})
