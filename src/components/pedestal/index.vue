<script lang="ts" setup>
import SketchRuler from './../sketchRuler/index.vue'
import { useSketchRulerStore } from './../../store/sketchRuler'
import RightPanel from '../rightPanel/index.vue'
import BasicContainer from './BasicContainer.vue'
import { useRightPanelStore } from '@/store/rightPanel'
import { Ref } from 'vue'

// 使用仓库的参数来作为公共参数，后面需要改直接改仓库来进行同步
const sketchRulerStore = useSketchRulerStore()
const pageSketchRulerStore = computed(() => sketchRulerStore)
const rightPanel = useRightPanelStore()
</script>
<template>
  <div
    class="absolute w-full h-full bg-#f5f5f5 overflow-hidden"
    border="1px solid #dadadc"
  >
    <!-- 尺子 -->
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
    <!-- 容器 -->
    <BasicContainer :editor-height="1024" :editor-width="1440">
      <template #default>
        <slot name="default"></slot>
      </template>
    </BasicContainer>
    <!-- 右侧面板 -->
    <RightPanel>
      <template #default>
        <component :is="rightPanel.rightPanelComps"></component>
      </template>
    </RightPanel>
  </div>
</template>

<style lang="scss" scoped></style>
