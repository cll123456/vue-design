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
  <div
    class="absolute top-80px left-50% bg-transparent z-1 pointer-events-none origin-top-left"
    :style="containerStyle"
  >
    <div
      class="absolute w-full h-20px leading-20px bottom--20px bg-#abcdef select-none cursor-row-resize opacity-0 pointer-events-auto transition-all duration-500 ease-linear"
      hover="opacity-100"
      text="#ef0b7f 12px center"
      :style="{ width: containerStyle.width }"
      @mousedown="handleDown"
    >
      下拉可以增加高度哦！，现在高度是：{{ pagePedestalStore.editorHeight }}
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
