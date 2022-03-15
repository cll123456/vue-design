<script lang='ts' setup>
import { computed, nextTick, onMounted, reactive, Ref, ref } from 'vue';
import SketchRuler from './../sketchRuler/index.vue';
import { useSketchRulerStore } from './../../store/sketchRuler';

// const props = defineProps<{
//   /**
//    * 编辑器的宽度
//    */
//   editorWidth: number,
//   /**
//    * 编辑器的高度
//    */
//   editorHeight: number,
//   /**
//    * 编辑器区域的背景颜色
//    */
//   editorBgColor?: string,
//   /**
//    * 基座的背景颜色
//    */
//   pedestalBgColor?: string,
//   /**
//    * 编辑器区域背景设置
//    */
//   editorBgSetting?: {
//     /**
//      * 是否使用网格作为背景，默认false
//      */
//     isUserGrid?: boolean,
//     /**
//      * 网格的大小，默认是10
//      */
//     gridSize?: number,
//     /**
//      * 是否显示栅格的列 默认false
//      */
//     isUserFlexColumn?: boolean,
//     /**
//      * 默认栅格列的数量
//      */
//     flexColumnSize?: number,
//     /**
//      * 默认栅格列的间隔 默认20 
//      */
//     flexColumnGutter?: number,
//     /**
//    * 是否显示栅格的行 默认false
//    */
//     isUserFlexRow?: boolean,
//     /**
//      * 栅格行的数量
//      */
//     flexRowSize?: number,
//     /**
//      * 栅格行的间隔 默认20
//      */
//     flexRowGutter?: number,
//   },

// }>()

// 使用仓库的参数来作为公共参数，后面需要改直接改仓库来进行同步
const sketchRulerStore = useSketchRulerStore();

const pageSketchRulerStore = computed(() => sketchRulerStore);
//  屏幕ref
const screensRef: Ref<HTMLDivElement | null> = ref(null);
// 容器ref
const containerRef: Ref<HTMLDivElement | null> = ref(null)


/**
 * 根据scale来缩放整个dom
 */
const canvasStyle = computed(() => {
  return {
    width: sketchRulerStore.width,
    height: sketchRulerStore.height,
    transform: `scale(${sketchRulerStore.scale})`
  }
})



const handleScroll = () => {
  const screensRect = document.querySelector('#screens')!.getBoundingClientRect()
  const canvasRect = document
    .querySelector('#canvas')!
    .getBoundingClientRect();

  // 标尺开始的刻度
  const startX =
    (screensRect.left + sketchRulerStore.thick - canvasRect.left) / sketchRulerStore.scale
  const startY =
    (screensRect.top + sketchRulerStore.thick - canvasRect.top) / sketchRulerStore.scale;
  sketchRulerStore.$patch({
    ...sketchRulerStore,
    startX: startX,
    startY: startY,
  })
}
// 控制缩放值
const handleWheel = (e: WheelEvent) => {
  // 是否按住CTRL键盘， 缩放浏览器大小
  if (e.ctrlKey || e.metaKey) {
    e.preventDefault();
    e.stopPropagation();
    const nextScale = parseFloat(
      Math.max(0.2, sketchRulerStore.scale - e.deltaY / 500).toFixed(2)
    )
    sketchRulerStore.$patch({
      scale: nextScale,
    })
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
      sketchRulerStore.$patch({
        scale: 1,
      })
      nextTick(() => {
        handleScroll()
      })
    }
  }, { passive: false });

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
      :thick="pageSketchRulerStore.thick"
      :scale="pageSketchRulerStore.scale"
      :width="pageSketchRulerStore.width"
      :height="pageSketchRulerStore.height"
      :start-x="pageSketchRulerStore.startX"
      :start-y="pageSketchRulerStore.startY"
      :shadow="pageSketchRulerStore.shadow"
      :corner-active="pageSketchRulerStore.cornerActive"
      :is-show-refer-line="pageSketchRulerStore.isShowReferLine"
      :lines="pageSketchRulerStore.lines"
      :ratio="pageSketchRulerStore.ratio"
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