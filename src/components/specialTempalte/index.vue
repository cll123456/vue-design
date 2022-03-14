<script lang='ts' setup>
import { computed, nextTick, onMounted, reactive, Ref, ref } from 'vue';
import SketchRuler from './../sketchRuler/index.vue'

const props = defineProps<{
  /**
   * 编辑器的宽度
   */
  editorWidth: number,
  /**
   * 编辑器的高度
   */
  editorHeight: number,
}>()

//  屏幕ref
const screensRef: Ref<HTMLDivElement | null> = ref(null);
// 容器ref
const containerRef: Ref<HTMLDivElement | null> = ref(null)

const rectWidth = 600
const rectHeight = 320

const state = reactive({
  scale: 1,
  startX: 0,
  startY: 0,
  lines: {
    h: [433, 588],
    v: [33, 143]
  },
  thick: 20,
  isShowRuler: true, // 显示标尺
  isShowReferLine: true // 显示参考线
})
const shadow = computed(() => {
  return {
    x: 0,
    y: 0,
    width: rectWidth,
    height: rectHeight
  }
})

/**
 * 根据scale来缩放整个dom
 */
const canvasStyle = computed(() => {
  return {
    width: rectWidth,
    height: rectHeight,
    transform: `scale(${state.scale})`
  }
})



const handleScroll = () => {
  const screensRect = document.querySelector('#screens')!.getBoundingClientRect()
  const canvasRect = document
    .querySelector('#canvas')!
    .getBoundingClientRect();

  // 标尺开始的刻度
  const startX =
    (screensRect.left + state.thick - canvasRect.left) / state.scale
  const startY =
    (screensRect.top + state.thick - canvasRect.top) / state.scale
  state.startX = startX
  state.startY = startY
}
// 控制缩放值
const handleWheel = (e: WheelEvent) => {
  // 是否按住CTRL键盘， 缩放浏览器大小
  if (e.ctrlKey || e.metaKey) {
    e.preventDefault();
    e.stopPropagation();
    const nextScale = parseFloat(
      Math.max(0.2, state.scale - e.deltaY / 500).toFixed(2)
    )
    state.scale = nextScale
  }
  nextTick(() => {
    handleScroll()
  })
}


onMounted(() => {
  // 滚动居中
  screensRef.value!.scrollLeft =
    containerRef.value!.getBoundingClientRect().width / 2 - 400;
  //  当按下ctrl + 0的时候，视图需要恢复原状
  window.addEventListener('keydown', (e: KeyboardEvent) => {
    if (e.ctrlKey && e.key === '0') {
      state.scale = 1;
      nextTick(() => {
        handleScroll()
      })
    }
  }, { passive: true });

  //  禁用浏览器的默认放大缩小事件
  window.addEventListener('wheel', (e) => {
    if (e.ctrlKey) {
      // 取消浏览器默认的放大缩小网页行为
      e.preventDefault()
    }
  }, { passive: false })

})
</script>
<template>
  <div class="wrapper">
    <sketch-ruler
      :thick="state.thick"
      :scale="state.scale"
      :width="1380"
      :height="780"
      :start-x="state.startX"
      :start-y="state.startY"
      :shadow="shadow"
      :corner-active="true"
      :is-show-refer-line="true"
      :lines="state.lines"
      :ratio="1"
    ></sketch-ruler>
    <div id="screens" class="screens" ref="screensRef" @wheel="handleWheel" @scroll="handleScroll">
      <div ref="containerRef" class="screen-container">
        <div id="canvas" :style="canvasStyle" />
      </div>
    </div>
  </div>
</template>

<style lang='scss' scoped>
.wrapper {
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: #f5f5f5;
  border: 1px solid #dadadc;
}

.screens {
  position: absolute;
  width: 100%;
  height: 100%;
  overflow: auto;
}

.screen-container {
  position: absolute;
  width: 5000px;
  height: 3000px;
}

#canvas {
  position: absolute;
  top: 80px;
  left: 50%;
  width: 1440px;
  height: 1024px;
  margin-left: -80px;
  background: lightblue;
  transform-origin: 50% 0;
}
</style>