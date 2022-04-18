<script setup lang="ts">
import Pedestal from './components/pedestal/index.vue'
import { useRightPanelStore } from './store/rightPanel'
import CompLoading from '@/components/compLoading/index.vue'
import ComLoadingError from '@/components/ComLoadingError/index.vue'
const Comp = defineAsyncComponent({
  loader: () => import('@/components/comLoadingError/index.vue'),
  loadingComponent: CompLoading,
  errorComponent: ComLoadingError,
})

const rightPanelStore = useRightPanelStore()
const clickDiv = () => {
  rightPanelStore.$patch({
    isShowRightPanel: true,
  })
  rightPanelStore.changeRightPanelComps(Comp)
}
</script>

<template>
  <div class="wrapper">
    <pedestal>
      <p>1232</p>
      <span>sdfdfsf</span>
      <div class="w-50 h-50 bg-success500" @click="clickDiv">
        232
        <p>p3323</p>
      </div>
    </pedestal>
  </div>
</template>

<style scoped lang="scss">
.wrapper {
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: #f5f5f5;
  border: 1px solid #dadadc;
}
</style>
