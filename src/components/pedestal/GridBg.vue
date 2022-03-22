<script lang='ts' setup>
import { computed, ref } from 'vue'
import { usePedestalStore } from './../../store/pedestal';
const pedestalStore = usePedestalStore();
const pagePedestalStore = computed(() => pedestalStore);

</script>
<template>
  <div class="gridBg--container" v-if="pagePedestalStore.editorBgSetting.isUserGrid">
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
            :d="`M ${pagePedestalStore.editorBgSetting.gridSize * 5} 0 L 0 0 0 ${pagePedestalStore.editorBgSetting.gridSize * 5}`"
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

<style lang='scss' scoped>
.gridBg--container {
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: -1;
}
</style>