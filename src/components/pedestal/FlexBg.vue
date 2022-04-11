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

/**
 * 计算中间的宽度，栅格的宽度
 */
const colWidth = computed(() => {
  const width = pagePedestalStore.value.editorWidth * sketchRulerStore.scale
  const midBlankWidth =
    pagePedestalStore.value.editorBgSetting.flexColumnGutter *
    sketchRulerStore.scale
  // 左右两边距离40px,
  return (
    (width -
      20 -
      20 -
      (pagePedestalStore.value.editorBgSetting.flexColumnSize - 1) *
        midBlankWidth) /
    pagePedestalStore.value.editorBgSetting.flexColumnSize
  )
})
/**
 * 列的样式
 */
const colStyle = computed(() => {
  let styleRes = `repeating-linear-gradient(to right, rgba(41, 141, 248, 0.24), rgba(41, 141, 248, 0.24) ${
    colWidth.value
  }px, transparent ${colWidth.value}px, transparent ${
    colWidth.value +
    pagePedestalStore.value.editorBgSetting.flexColumnGutter *
      sketchRulerStore.scale
  }px)`
  return {
    left: '20px',
    right: '20px',
    backgroundImage: styleRes,
    width: `calc(100% - 40px)`,
  }
})

/**
 * 每一行的高度
 */
const rowHeight = computed(() => {
  const height = pagePedestalStore.value.editorHeight * sketchRulerStore.scale
  const midBlankHight =
    pagePedestalStore.value.editorBgSetting.flexRowGutter *
    sketchRulerStore.scale
  // 左右两边距离40px,
  return (
    (height -
      20 -
      20 -
      (pagePedestalStore.value.editorBgSetting.flexRowSize - 1) *
        midBlankHight) /
    pagePedestalStore.value.editorBgSetting.flexRowSize
  )
})

/**
 * 行的样式
 */
const rowStyle = computed(() => {
  let styleRes = `repeating-linear-gradient(to bottom, rgba(41, 141, 248, 0.24), rgba(41, 141, 248, 0.24) ${
    rowHeight.value
  }px, transparent ${rowHeight.value}px, transparent ${
    rowHeight.value +
    pagePedestalStore.value.editorBgSetting.flexRowGutter *
      sketchRulerStore.scale
  }px)`
  return {
    top: '20px',
    bottom: '20px',
    backgroundImage: styleRes,
    height: `calc(100% - 40px)`,
  }
})
</script>
<template>
  <div class="flexBg--container" :style="getContainerStyle">
    <div
      v-if="pagePedestalStore.editorBgSetting.isUserFlexColumn"
      class="column--container"
      :style="colStyle"
    ></div>
    <div
      v-if="pagePedestalStore.editorBgSetting.isUserFlexRow"
      class="row--container"
      :style="rowStyle"
    ></div>
  </div>
</template>

<style lang="scss" scoped>
.flexBg--container {
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: 0;
  pointer-events: none;

  .row--container,
  .column--container {
    position: absolute;
    width: 100%;
    height: 100%;
  }
}
</style>
