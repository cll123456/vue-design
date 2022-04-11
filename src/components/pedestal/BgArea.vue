<script lang="ts" setup>
import { computed } from 'vue'
import { useSketchRulerStore } from '../../store/sketchRuler'
import { usePedestalStore } from '../../store/pedestal'

// 使用仓库的参数来作为公共参数，后面需要改直接改仓库来进行同步
const sketchRulerStore = useSketchRulerStore()
const pedestalStore = usePedestalStore()

const pagePedestalStore = computed(() => pedestalStore)

// 下拉container的动态样式
const containerStyle = computed(() => {
  return {
    width: pedestalStore.editorWidth * sketchRulerStore.scale + 'px',
    height: pedestalStore.editorHeight * sketchRulerStore.scale + 'px',
  }
})
/**
 * 下拉操作
 */
const handleDown = (e: MouseEvent) => {
  const startY = e.clientY
  // 鼠标移动
  const onMove = (e: MouseEvent) => {
    const currentY = e.clientY
    const initValue = pagePedestalStore.value.editorHeight
    // const newValue = Math.floor(
    //   initValue + ((currentY - startY) / 40) * pageSketchRulerStore.value.scale
    // );
    const newValue = Math.floor(initValue + (currentY - startY) / 40)
    pedestalStore.$patch({
      editorHeight: newValue,
    })
  }
  // 鼠标放开
  const onEnd = () => {
    document.removeEventListener('mousemove', onMove)
    document.removeEventListener('mouseup', onEnd)
  }
  document.addEventListener('mousemove', onMove, { passive: false })
  document.addEventListener('mouseup', onEnd, { passive: false })
}
</script>
<template>
  <div class="canvas-bg-area" :style="containerStyle">
    <div
      class="pull-down--container"
      :style="{ width: containerStyle.width }"
      @mousedown="handleDown"
    >
      下拉可以增加高度哦！，现在高度是：{{ pagePedestalStore.editorHeight }}
    </div>
  </div>
</template>

<style lang="scss" scoped>
.canvas-bg-area {
  position: absolute;
  top: 80px;
  left: 50%;
  width: 1440px;
  height: 1024px;
  background: rgba(204, 204, 204, 0.459);
  transform-origin: 50% 0;
  z-index: 0;

  .pull-down--container {
    position: absolute;
    width: 100%;
    bottom: -20px;
    background-color: #abcdef;
    height: 20px;
    text-align: center;
    line-height: 20px;
    font-size: 12px;
    color: #ef0b7f;
    user-select: none;
    cursor: row-resize;
    opacity: 0;
    transition: all 0.5s linear;

    &:hover {
      opacity: 1;
    }
  }
}
</style>
