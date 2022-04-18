<script lang="ts" setup>
import { computed } from 'vue'
import { usePedestalStore } from './../../store/pedestal'
import { useSketchRulerStore } from './../../store/sketchRuler'
const pedestalStore = usePedestalStore()
const pagePedestalStore = computed(() => pedestalStore)
const sketchRulerStore = useSketchRulerStore()
/**
 * 容器的样式
 */
const getContainerStyle = computed(() => {
  return {
    width: pagePedestalStore.value.editorWidth * sketchRulerStore.scale + 'px',
    height:
      pagePedestalStore.value.editorHeight * sketchRulerStore.scale + 'px',
  }
})
</script>
<template>
  <div
    v-if="pagePedestalStore.editorBgSetting.isUserGrid"
    class="abs-full z--1"
    :style="getContainerStyle"
  >
    <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern
          id="smallGrid"
          :width="pagePedestalStore.editorBgSetting.gridSize"
          :height="pagePedestalStore.editorBgSetting.gridSize"
          patternUnits="userSpaceOnUse"
        >
          <path
            :d="`M ${pagePedestalStore.editorBgSetting.gridSize} 0 L 0 0 0 ${pagePedestalStore.editorBgSetting.gridSize}`"
            fill="none"
            stroke="rgba(207, 207, 207, 0.3)"
            stroke-width="1"
          />
        </pattern>
        <pattern
          id="grid"
          :width="pagePedestalStore.editorBgSetting.gridSize * 5"
          :height="pagePedestalStore.editorBgSetting.gridSize * 5"
          patternUnits="userSpaceOnUse"
        >
          <rect
            :width="pagePedestalStore.editorBgSetting.gridSize * 5"
            :height="pagePedestalStore.editorBgSetting.gridSize * 5"
            fill="url(#smallGrid)"
          />
          <path
            :d="`M ${
              pagePedestalStore.editorBgSetting.gridSize * 5
            } 0 L 0 0 0 ${pagePedestalStore.editorBgSetting.gridSize * 5}`"
            fill="none"
            stroke="rgba(186, 186, 186, 0.5)"
            stroke-width="1"
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#grid)" />
    </svg>
  </div>
</template>

<style lang="scss" scoped></style>
