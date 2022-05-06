<script lang="ts" setup>
import { useCompConfigStore } from '@/store/compConfig'
const compConfigStore = useCompConfigStore()

/**
 * 改变样式的属性，同步到仓库
 */
const change = (e: Event, props: string) => {
  compConfigStore.changeStyle({
    [props]: (e.target as HTMLInputElement).value,
  })
}
</script>
<template>
  <div class="w-full">
    <span text-sm>X-坐标：</span>
    <input
      class="w-[calc(100%-8em)] box-border py-1 px-1"
      b="transparent 1px"
      hover="border-1px border-lineColor rounded-sm"
      focus-visible="outline-1px outline-success"
      type="number"
      :value="compConfigStore.curComp?.styles.left"
      min="0"
      @change="change($event, 'left')"
    />
  </div>
  <div class="w-full">
    <span text-sm>Y-坐标：</span>
    <input
      class="w-[calc(100%-8em)] box-border py-1 px-1"
      b="transparent 1px"
      hover="border-1px border-lineColor rounded-sm"
      focus-visible="outline-1px outline-success"
      type="number"
      :value="compConfigStore.curComp?.styles.top"
      min="0"
      @change="change($event, 'top')"
    />
  </div>
  <div class="w-full">
    <span text-sm>宽 度：</span>
    <input
      class="w-[calc(100%-8em)] box-border py-1 px-1"
      b="transparent 1px"
      hover="border-1px border-lineColor rounded-sm"
      focus-visible="outline-1px outline-success"
      type="number"
      :value="compConfigStore.curComp?.styles.width"
      min="0"
      @change="change($event, 'width')"
    />
  </div>
  <div class="w-full">
    <span text-sm>高 度：</span>
    <input
      class="w-[calc(100%-8em)] box-border py-1 px-1"
      b="transparent 1px"
      hover="border-1px border-lineColor rounded-sm"
      focus-visible="outline-1px outline-success"
      type="number"
      :value="compConfigStore.curComp?.styles.height"
      min="0"
      @change="change($event, 'height')"
    />
  </div>
</template>

<style lang="scss" scoped></style>
