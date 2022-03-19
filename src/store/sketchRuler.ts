import { defineStore } from 'pinia'
import { eye64, closeEye64 } from './../components/sketchRuler/cornerImg64'
// the first argument is a unique id of the store across your application
export const useSketchRulerStore = defineStore('sketchRuler', {
  // other options...
  state: () => {
    return {
      /**
        * 显示指示线的图标
        */
      eyeIcon: eye64,
      /**
       * 关闭指示线的图标
       */
      closeEyeIcon: closeEye64,
      /**
       * 放大的倍数
       */
      scale: 1,
      /**
       * 初始的放大倍数，用于ctrl + 0 回归到初始化的页面
       */
      initScale: 1,
      /**
       * 比列
       */
      ratio: 1,
      /**
       * 每条指示线距离对应边的距离
       */
      thick: 20,
      /**
       * 样式
       */
      palette: {
        bgColor: 'rgba(225,225,225, 0)', // ruler bg color
        longfgColor: '#BABBBC', // ruler longer mark color
        shortfgColor: '#C8CDD0', // ruler shorter mark color
        fontColor: '#7D8694', // ruler font color
        shadowColor: '#E8E8E8', // ruler shadow color
        lineColor: '#EB5648',
        borderColor: '#DADADC',
        cornerActiveColor: 'rgb(235, 86, 72, 0.6)'
      },
      /**
       * 距离屏幕左侧的实际距离
       */
      startX: 0,
      /**
       * 距离屏幕顶部的实际距离
       */
      startY: 0,
      /**
       * 尺子的宽度
       */
      width: 1440,
      /**
       * 尺子的高度
       */
      height: 1024,
      /**
       * 尺子阴影的配置
       *  x: 0, x轴起始位置
       *  y: 0, y轴起始位置
       *  width: 0, x轴的长度
       *  height: 0 y轴的长度
       */
      shadow: {
        x: 0,
        y: 0,
        width: 0,
        height: 0
      },
      /**
       * 指示性的配置
       * h: [], y轴的线
       * v: []  x轴的线
       */
      lines: {
        h: [0],
        v: [0]
      },
      /**
       * 自定义显示图片的样式
       */
      cornerActive: true,
      /**
       * 是否显示所有的线
       */
      isShowReferLine: true
    }
  }
})