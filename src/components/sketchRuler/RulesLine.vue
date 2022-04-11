<script lang="ts" setup>
import { computed, onMounted, ref } from 'vue'
import { IPaletteObj } from '../canvasRules/canvasRulesType'

const props = defineProps<{
  /**
   * 放大或者缩小的倍数
   */
  scale: number
  /**
   * 距离线的距离
   */
  thick: number
  /**
   * 线的样式
   */
  palette: IPaletteObj
  /**
   * 线的下标，第几条线
   */
  index: number
  /**
   * 距离屏幕的开始位置，x轴或者y轴
   */
  start: number
  /**
   * 是否垂直
   */
  vertical: boolean
  /**
   * 线需要显示的位置
   */
  value: number
  /**
   * 是否显示所有的参考线
   */
  isShowReferLine: boolean
}>()

const emits = defineEmits<{
  /**
   * 鼠标点击下去，需要画线
   */
  (event: 'onMouseDown'): void
  /**
   * 鼠标释放
   */
  (event: 'onRelease', startValue: number, index: number): void
  /**
   * 移动线
   */
  (event: 'onRemove', index: number): void
}>()

// 开始画线的位置
const startValue = ref(0)
// 默认显示线
const showLine = ref(true)

onMounted(() => {
  startValue.value = props.value!
})
/**
 * 是否单条显示线
 * @param offset
 */
const setShowLine = (offset: number) => {
  showLine.value = offset >= 0
}
/**
 * offset的样式
 */
const offset = computed(() => {
  const offset = (startValue.value - props.start!) * props.scale!
  setShowLine(offset)
  const positionValue = offset + 'px'
  const position = props.vertical
    ? { top: positionValue }
    : { left: positionValue }
  return position
})

/**
 * 设置鼠标的样式
 */
const borderCursor = computed(() => {
  // 设置线
  const borderValue = `1px solid ${props.palette?.lineColor}`
  const border = props.vertical
    ? { borderTop: borderValue }
    : { borderLeft: borderValue }
  // 鼠标样式
  const cursorValue = props.isShowReferLine
    ? props.vertical
      ? 'ns-resize'
      : 'ew-resize'
    : 'none'
  return {
    cursor: cursorValue,
    ...border,
  }
})

/**
 * 操作按钮距离线的距离
 */
const actionStyle = computed(() => {
  const actionStyle = props.vertical
    ? { left: props.thick + 'px' }
    : { top: props.thick + 'px' }
  return actionStyle
})

/**
 * 鼠标按下，需要画线
 */
const handleDown = (e: MouseEvent) => {
  const startD = props.vertical ? e.clientY : e.clientX
  const initValue = startValue.value

  emits('onMouseDown')
  const onMove = (e: MouseEvent) => {
    const currentD = props.vertical ? e.clientY : e.clientX
    const newValue = Math.round(initValue + (currentD - startD) / props.scale!)
    startValue.value = newValue
  }
  const onEnd = () => {
    emits('onRelease', startValue.value, props.index)
    document.removeEventListener('mousemove', onMove)
    document.removeEventListener('mouseup', onEnd)
  }
  document.addEventListener('mousemove', onMove)
  document.addEventListener('mouseup', onEnd)
}

/**
 * 移动线
 */
const handleRemove = () => {
  emits('onRemove', props.index)
}
</script>
<template>
  <!-- 线的显示 -->
  <div
    v-show="showLine"
    class="line"
    :style="[offset, borderCursor]"
    @mousedown="handleDown"
  >
    <div class="action" :style="actionStyle">
      <span class="del" @click="handleRemove">&times;</span>
      <span class="value cusValue">{{ startValue }}</span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.line {
  pointer-events: auto;
  position: absolute;

  .action {
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .value {
    pointer-events: none;
    transform: scale(0.83);
  }
  .del {
    padding: 3px 5px;
    cursor: pointer;
    visibility: hidden;
  }
  &:hover .del {
    visibility: visible;
  }
}
</style>
