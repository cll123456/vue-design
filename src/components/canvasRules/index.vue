<script lang='ts' setup>
import { onMounted, ref, watch, } from 'vue'
import { IPaletteObj } from './canvasRulesType';
import { drawCavaseRuler } from './utils'
const props = defineProps<{
  /**
   * 是否显示线
   */
  showIndicator: boolean,
  /**
   * 当前鼠标的位置
   */
  valueNum: number,
  /**
   * 放大
   */
  scale: number,
  /**
   * 比例
   */
  ratio: number,
  /**
   * 尺子的样式
   */
  palette: IPaletteObj,
  /**
   * 是否垂直
   */
  vertical: boolean,
  /**
   * 尺子的开始刻度值（默认0）
   */
  start: number,
  /**
   * 尺子的宽度
   */
  width: number,
  /**
   * 尺子的高度
   */
  height: number,
  /**
   * 从刻度尺的多少开始取
   */
  selectStart: number,
  /**
   * 选中刻度值的长度
   */
  selectLength: number
}>()

const emits = defineEmits<{
  /**
   * 添加线
   */
  (event: 'onAddLine', lineNum: number): void,
  /**
   * 是否显示线
   */
  (event: 'update:showIndicator', showIndicator: boolean): void,
  /**
   * 更新鼠标位置
   */
  (event: 'update:valueNum', valueNum: number): void,
}>()
// 当前的状态
const state = ref({
  canvasContext: null as CanvasRenderingContext2D | null
})
// 比列,默认是1
let ratio = 1
// canvasRef
const canvasRef = ref<HTMLCanvasElement | null>(null);

onMounted(() => {
  ratio = props.ratio || window.devicePixelRatio || 1
  initCanvasRef()
  updateCanvasContext(ratio)
  drawRuler(ratio)
})
/**
 * 初始化canvas
 */
const initCanvasRef = () => {
  state.value.canvasContext = canvasRef.value && canvasRef.value.getContext('2d')
}
/**
 * 
 * @param ratio 
 */
const updateCanvasContext = (ratio: number) => {
  if (canvasRef.value) {
    // 比例宽高
    canvasRef.value.width = props.width! * ratio!
    canvasRef.value.height = props.height! * ratio!
    const ctx = state.value.canvasContext
    if (ctx) {
      ctx.font = `${12 * ratio!}px -apple-system,
                "Helvetica Neue", ".SFNSText-Regular",
                "SF UI Text", Arial, "PingFang SC", "Hiragino Sans GB",
                "Microsoft YaHei", "WenQuanYi Zen Hei", sans-serif`
      ctx.lineWidth = 1
      ctx.textBaseline = 'middle'
    }
  }
}

/**
 * 在canvas中绘画刻度尺
 */
const drawRuler = (ratio: number) => {
  const options = {
    scale: props.scale!,
    width: props.width!,
    height: props.height!,
    palette: props.palette!,
    ratio: ratio
  }

  if (state.value.canvasContext) {
    drawCavaseRuler(
      state.value.canvasContext,
      props.start!,
      props.selectStart!,
      props.selectLength!,
      options,
      !props.vertical
    )
  }
}
// 监听开始位置的变化，需要重写绘画尺子
watch(
  () => props.start,
  () => drawRuler(ratio)
)

// 监听高度和宽度变化，从新绘画
watch([() => props.width, () => props.height], () => {
  updateCanvasContext(ratio)
  drawRuler(ratio)
})

/**
 * 处理函数
 */
const handle = (e: MouseEvent, key: string) => {
  const getValueByOffset = (offset: number, start: number, scale: number) =>
    Math.round(start + offset / scale)
  const offset = props.vertical ? e.offsetY : e.offsetX
  const value = getValueByOffset(offset, props.start!, props.scale!)
  switch (key) {
    case 'click':
      emits('onAddLine', value)
      break
    case 'enter':
      emits('update:showIndicator', true)
      emits('update:valueNum', value)
      break
    default:
      emits('update:valueNum', value)
      break
  }
}
</script>
<template>
  <canvas
    ref="canvasRef"
    class="ruler"
    @click="handle($event, 'click')"
    @mouseenter="handle($event, 'enter')"
    @mousemove="handle($event, 'move')"
    @mouseleave="$emit('update:showIndicator', false)"
  />
</template>

<style lang='scss' scoped>
</style>