import { defineStore } from 'pinia'
export const usePedestalStore = defineStore('pedestal', {
  // other options...
  state: () => {
    return {
      /**
       * 编辑器的宽度
       */
      editorWidth: 1440,
      /**
       * 编辑器的高度
       */
      editorHeight: 1044,
      /**
       * 编辑器区域的背景颜色
       */
      editorBgColor: '#F5F5F5',
      /**
       * 编辑器区域初始值的背景颜色
       */
      editorBgInitColor: '#F5F5F5',
      /**
       * 基座的背景初始值颜色
       */
      pedestalBgInitColor: '#ffffff',
      /**
       * 基座的背景颜色
       */
      pedestalBgColor: '#ffffff',
      /**
       * 编辑器区域背景设置
       */
      editorBgSetting: {
        /**
         * 是否使用网格作为背景，默认false
         */
        isUserGrid: true,
        /**
         * 网格的大小，默认是10
         */
        gridSize: 10,
        /**
         * 是否显示栅格的列 默认false
         */
        isUserFlexColumn: false,
        /**
         * 默认栅格列的数量 默认3
         */
        flexColumnSize: 3,
        /**
         * 默认栅格列的间隔 默认20
         */
        flexColumnGutter: 20,
        /**
         * 每一列的长度 默认0
         */
        flexColumnPerVal: 0,
        /**
         * 是否显示栅格的行 默认false
         */
        isUserFlexRow: false,
        /**
         * 栅格行的数量
         */
        flexRowSize: 5,
        /**
         * 每一行的长度 默认0
         */
        flexRowPerVal: 0,
        /**
         * 栅格行的间隔 默认20
         */
        flexRowGutter: 20,
      },
    }
  },
  getters: {
    /**
     * 获取右侧容器内容设置
     */
    basicPedestalSettings: (state) => state.editorBgSetting,
  },
})
