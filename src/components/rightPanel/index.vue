<script lang="ts" setup>
import { useRightPanelStore } from './../../store/rightPanel'
const rightPanelStore = useRightPanelStore()

const rightStyle = computed(() => {
  return {
    width: rightPanelStore.width + 'px',
    backgroundColor: rightPanelStore.bgColor,
  }
})
/**
 * 是否展示面板
 */
const isShowRightPanel = computed(() => rightPanelStore.isShowRightPanel)
</script>
<template>
  <transition name="slide-fade">
    <div
      v-if="isShowRightPanel"
      class="absolute h-full right-0 z-10000"
      :style="rightStyle"
    >
      <slot name="default"></slot>
    </div>
  </transition>
</template>

<style lang="scss" scoped></style>
