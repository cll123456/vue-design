<script lang="ts" setup>
import { computed, ref } from 'vue'
import RulerWrapper from './RulerWrapper.vue'
import { eye64, closeEye64 } from './cornerImg64'
import { lineType, ShadowType } from './indexTypes'
import { IPaletteObj } from '../canvasRules/canvasRulesType'
const props = defineProps<{
  /**
   * 显示指示线的图标
   */
  eyeIcon?: string
  /**
   * 关闭指示线的图标
   */
  closeEyeIcon?: string
  /**
   * 放大的倍数
   */
  scale: number
  /**
   * 比列
   */
  ratio: number
  /**
   * 每条指示线距离对应边的距离
   */
  thick: number
  /**
   * 样式
   */
  palette?: IPaletteObj
  /**
   * 距离屏幕左侧的实际距离
   */
  startX: number
  /**
   * 距离屏幕顶部的实际距离
   */
  startY: number
  /**
   * 尺子的宽度
   */
  width: number
  /**
   * 尺子的高度
   */
  height: number
  /**
   * 尺子阴影的配置
   *  x: 0, x轴起始位置
   *  y: 0, y轴起始位置
   *  width: 0, x轴的长度
   *  height: 0 y轴的长度
   */
  shadow: ShadowType
  /**
   * 指示性的配置
   * h: [], y轴的线
   * v: []  x轴的线
   */
  lines: lineType
  /**
   * 自定义显示图片的样式
   */
  cornerActive?: boolean
  /**
   * 是否显示所有的线
   */
  isShowReferLine?: boolean
}>()
const emits = defineEmits(['onCornerClick'])

// 是否显示指示线
let isShowReferLine = ref(true)
isShowReferLine.value = props.isShowReferLine!
// 这里处理默认值,因为直接写在props的default里面时,可能某些属性用户未必会传,那么这里要做属性合并,防止属性丢失
const paletteCpu = computed(() => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function merge(obj: { [key: string]: any }, o: { [key: string]: any }) {
    Object.keys(obj).forEach((key) => {
      if (key && obj.hasOwnProperty(key)) {
        if (typeof o['key'] === 'object') {
          obj[key] = merge(obj[key], o[key])
        } else if (o.hasOwnProperty(key)) {
          obj[key] = o[key]
        }
      }
    })
    return obj
  }
  const finalObj = merge(
    {
      bgColor: 'rgba(225,225,225, 0)', // ruler bg color
      longfgColor: '#BABBBC', // ruler longer mark color
      shortfgColor: '#C8CDD0', // ruler shorter mark color
      fontColor: '#7D8694', // ruler font color
      shadowColor: '#E8E8E8', // ruler shadow color
      lineColor: '#EB5648',
      borderColor: '#DADADC',
      cornerActiveColor: 'rgb(235, 86, 72, 0.6)',
    },
    props.palette || {},
  )
  return finalObj as IPaletteObj
})
/**
 * 是否显示指示线的图标的类名
 */
const cornerActiveClass = computed(() => {
  return props.cornerActive ? ' active' : ''
})

/**
 * 是否显示指示线的图标的样式
 */
const cornerStyle = computed(() => {
  return {
    backgroundImage: isShowReferLine.value
      ? `url(${props.eyeIcon || eye64})`
      : `url(${props.closeEyeIcon || closeEye64})`,
    width: props.thick + 'px',
    height: props.thick + 'px',
    borderRight: `1px solid ${paletteCpu.value.borderColor}`,
    borderBottom: `1px solid ${paletteCpu.value.borderColor}`,
  }
})
/**
 * 点击图标
 */
const onCornerClick = (e: MouseEvent) => {
  isShowReferLine.value = !isShowReferLine.value
  emits('onCornerClick', e)
}
</script>
<template>
  <div id="mb-ruler" class="style-ruler mb-ruler">
    <!-- 水平方向 -->
    <ruler-wrapper
      :vertical="false"
      :width="width"
      :height="thick"
      :is-show-refer-line="isShowReferLine"
      :thick="thick"
      :ratio="ratio"
      :start="startX"
      :lines="lines.h"
      :select-start="shadow.x"
      :select-length="shadow.width"
      :scale="scale"
      :palette="paletteCpu"
    />
    <!-- 竖直方向 -->
    <ruler-wrapper
      :vertical="true"
      :width="thick"
      :height="height"
      :is-show-refer-line="isShowReferLine"
      :thick="thick"
      :ratio="ratio"
      :start="startY"
      :lines="lines.v"
      :select-start="shadow.y"
      :select-length="shadow.height"
      :scale="scale"
      :palette="paletteCpu"
    />
    <a
      class="corner"
      :class="cornerActiveClass"
      :style="cornerStyle"
      @click="onCornerClick"
    ></a>
  </div>
</template>

<style lang="scss" scoped>
.style-ruler {
  position: absolute;
  z-index: 2022; /* 需要比resizer高 */
  width: 100%; /* scrollbar width */
  height: 100%;
  overflow: hidden;
  pointer-events: none;
  font-size: 12px;
  span {
    line-height: 1;
  }
}
.corner {
  position: absolute;
  top: 0;
  left: 0;
  pointer-events: auto;
  cursor: pointer;
  box-sizing: content-box;
  transition: all 0.2s ease-in-out;
}

.indicator {
  position: absolute;
  pointer-events: none;
  .value {
    position: absolute;
    background: white;
  }
}

.ruler {
  width: 100%;
  height: 100%;
  pointer-events: auto;
}
</style>
