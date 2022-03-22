<script lang='ts' setup>
import { computed, nextTick, onMounted, reactive, Ref, ref } from 'vue';
import SketchRuler from './../sketchRuler/index.vue';
import { useSketchRulerStore } from './../../store/sketchRuler';
import BgArea from './BgArea.vue';
import { usePedestalStore } from './../../store/pedestal'
import GridBg from './GridBg.vue';

const pedestalStore = usePedestalStore();

const pagePedestalStore = computed(() => pedestalStore)

const props = defineProps({
  /**
  * 编辑器的宽度
  */
  editorWidth: {
    type: Number,
    default: 1440
  },
  /**
   * 编辑器的高度
   */
  editorHeight: {
    type: Number,
    default: 1044,
  },
  /**
   * 编辑器区域的背景颜色
   */
  editorBgColor: {
    type: String,
    default: '#abcdef'
  },
  /**
   * 基座的背景颜色
   */
  pedestalBgColor: {
    type: String,
    default: ''
  },
  /**
   * 编辑器区域背景设置
   */
  editorBgSetting: {
    type: Object,
    default: {
      /**
       * 是否使用网格作为背景，默认false
       */
      isUserGrid: Boolean,
      /**
       * 网格的大小，默认是10
       */
      gridSize: {
        type: Number,
        default: 10
      },
      /**
       * 是否显示栅格的列 默认false
       */
      isUserFlexColumn: Boolean,
      /**
       * 默认栅格列的数量
       */
      flexColumnSize: {
        type: Number,
        default: 3
      },
      /**
       * 默认栅格列的间隔 默认20 
       */
      flexColumnGutter: {
        type: Number,
        default: 20
      },
      /**
     * 是否显示栅格的行 默认false
     */
      isUserFlexRow: Boolean,
      /**
       * 栅格行的数量
       */
      flexRowSize: {
        type: Number,
        default: 5
      },
      /**
       * 栅格行的间隔 默认20
       */
      flexRowGutter: {
        type: Number,
        default: 20
      },
    }
  },
})

pedestalStore.$patch({
  editorHeight: props.editorHeight,
  editorWidth: props.editorWidth,
})


// 使用仓库的参数来作为公共参数，后面需要改直接改仓库来进行同步
const sketchRulerStore = useSketchRulerStore();

const pageSketchRulerStore = computed(() => sketchRulerStore);
//  屏幕ref
const screensRef: Ref<HTMLDivElement | null> = ref(null);
// 容器ref
const containerRef: Ref<HTMLDivElement | null> = ref(null)

sketchRulerStore.$patch({
  lines: {
    h: [...pageSketchRulerStore.value.lines.h, pagePedestalStore.value.editorWidth],
    v: [...pageSketchRulerStore.value.lines.v, pagePedestalStore.value.editorHeight]
  }
})

/**
 * 根据scale来缩放整个dom
 */
const canvasStyle = computed(() => {
  return {
    width: pagePedestalStore.value.editorWidth * sketchRulerStore.scale + 'px',
    height: pagePedestalStore.value.editorHeight * sketchRulerStore.scale + 'px',
    background: pagePedestalStore.value.pedestalBgColor,
  }
})

/**
 * 整个屏幕的样式
 */
const screensStyle = computed(() => ({
  background: pagePedestalStore.value.editorBgColor,
}))


/***
 * 开始滚动
 */
const handleScroll = () => {
  const screensRect = document.querySelector('#screens')!.getBoundingClientRect()
  const canvasRect = document
    .querySelector('#myCanvas')!
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

/**
 * 初始化编辑器显示的比例
 */
const initEditorRadio = () => {
  // 计算传入的编辑区的宽高和实际物理设备的宽高，形成比例,适配当前屏幕。
  if (pagePedestalStore.value.editorWidth > window.screen.width - 250) {
    const widthRadio = Math.floor(((window.screen.width - 250) / pagePedestalStore.value.editorWidth) * 100) / 100
    sketchRulerStore.$patch({
      initScale: widthRadio
    })
    sketchRulerStore.$patch({
      scale: widthRadio,
    })
    nextTick(() => {
      handleScroll()
    })
  }
}

onMounted(() => {
  // 滚动到距离左边200的位置，方便放其他的菜单
  screensRef.value!.scrollLeft =
    containerRef.value!.getBoundingClientRect().width / 2 - 200;
  // 适配当前最合适的显示区域
  initEditorRadio();

  //  当按下ctrl + 0的时候，视图需要恢复原状
  window.addEventListener('keydown', (e: KeyboardEvent) => {
    if (e.ctrlKey && e.key === '0') {
      sketchRulerStore.$patch({
        scale: sketchRulerStore.initScale,
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
    <div
      id="screens"
      class="screens"
      ref="screensRef"
      @wheel="handleWheel"
      :style="screensStyle"
      @scroll="handleScroll"
    >
      <div ref="containerRef" class="screen-container">
        <div id="myCanvas" class="myCanvas" :style="canvasStyle">
          <div
            :style="{
              width: pagePedestalStore.editorWidth + 'px',
              height: pagePedestalStore.editorHeight + 'px',
              position: 'absolute'
            }"
          >
            <div
              class="myCanvas--container"
              :style="{ transform: `scale(${sketchRulerStore.scale})` }"
            >
              <grid-bg></grid-bg>
              <div>
                23424324324324
                <div>sd 大多数地方</div>
              </div>ewewe
              <p>234324dfs得瑟得瑟</p>
            </div>
          </div>
        </div>
        <!-- 下拉增加编辑器的高度 -->
        <bg-area></bg-area>
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
  .myCanvas {
    position: absolute;
    top: 80px;
    left: 50%;
    background: lightblue;
    transform-origin: 50% 0;
    z-index: 1;

    .myCanvas--container {
      width: 100%;
      height: 100%;
      position: absolute;
      transform-origin: left top;
    }
  }
}
</style>