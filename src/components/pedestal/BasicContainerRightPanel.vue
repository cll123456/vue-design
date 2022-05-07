<script lang="ts" setup>
import { usePedestalStore } from '@/store/pedestal'
import { useRightPanelStore } from '@/store/rightPanel'
import ZN from 'element-plus/lib/locale/lang/zh-CN'
const rightPanelStore = useRightPanelStore()
const pedestalStore = usePedestalStore()
// 关闭
const closeRightPanel = () => {
  rightPanelStore.$patch({
    isShowRightPanel: false,
  })
}

const predefineColors = ref([
  '#ff4500',
  '#ff8c00',
  '#ffd700',
  '#90ee90',
  '#00ced1',
  '#1e90ff',
  '#c71585',
  'rgba(255, 69, 0, 0.68)',
  'rgb(255, 120, 0)',
  'hsv(51, 100, 98)',
  'hsva(120, 40, 94, 0.5)',
  'hsl(181, 100%, 37%)',
  'hsla(209, 100%, 56%, 0.73)',
  '#c7158577',
])

const editorWidth = computed(() => pedestalStore.editorWidth)
const editorHeight = computed(() => pedestalStore.editorHeight)
/**
 * 改变宽高
 */
const change = (
  e: Event,
  props: string,
  isEditorSetting = false,
  type: 'input' | 'checkbox' = 'input',
) => {
  if (isEditorSetting) {
    if (type === 'input') {
      pedestalStore.$patch({
        editorBgSetting: {
          ...pedestalStore.editorBgSetting,
          [props]: (<HTMLInputElement>e.target)!.value,
        },
      })
    } else {
      pedestalStore.$patch({
        editorBgSetting: {
          ...pedestalStore.editorBgSetting,
          [props]: (<HTMLInputElement>e.target)!.checked,
        },
      })
    }
  } else {
    pedestalStore.$patch({
      [props]: (<HTMLInputElement>e.target)!.value,
    })
  }
}

/**
 * 恢复颜色
 */
const refreshColor = (
  props: string,
  initProp: 'pedestalBgInitColor' | 'editorBgInitColor',
) => {
  pedestalStore.$patch({
    [props]: pedestalStore[initProp],
  })
}
</script>
<template>
  <div class="select-none">
    <div class="px-10px py-14px text-base color-dark flex justify-between">
      <span class="align-middle">容器设置</span>
      <el-tooltip effect="dark" content="关闭" placement="left-start">
        <span
          class="i-mdi-window-close icon-style"
          @click="closeRightPanel"
        ></span>
      </el-tooltip>
    </div>
    <div class="line-style"></div>
    <div class="px-10px py-14px text-sm font-600 color-dark">容器大小</div>
    <div class="px-10px w-full">
      <div class="w-full">
        <span text-sm>水平长度：</span>
        <input
          class="w-[calc(100%-8em)] box-border py-1 px-1"
          b="transparent 1px"
          hover="border-1px border-lineColor rounded-sm"
          focus-visible="outline-1px outline-primary"
          type="number"
          :value="editorWidth"
          min="0"
          @change="change($event, 'editorWidth')"
        />
      </div>
      <div class="w-full">
        <span text-sm>垂直高宽：</span>
        <input
          class="w-[calc(100%-7em)] box-border py-1 px-1"
          b="transparent 1px"
          hover="border-1px border-lineColor rounded-sm"
          focus-visible="outline-1px outline-primary"
          type="number"
          :value="editorHeight"
          min="0"
          @change="change($event, 'editorHeight')"
        />
      </div>
    </div>
    <div class="line-style"></div>
    <div class="px-10px py-14px text-sm font-600 color-dark">布 局</div>
    <div class="px-10px flex items-center justify-between">
      <input
        :checked="pedestalStore.basicPedestalSettings.isUserFlexColumn"
        type="checkbox"
        class="cursor-pointer"
        @change="change($event, 'isUserFlexColumn', true, 'checkbox')"
      />
      <span class="i-mdi:tally-mark-3"></span>
      <span class="w-11">
        <input
          class="w-full box-border py-1 px-1"
          b="transparent 1px"
          hover="border-1px border-lineColor rounded-sm"
          focus-visible="outline-1px outline-success"
          type="number"
          :value="pedestalStore.basicPedestalSettings.flexColumnSize"
          min="0"
          max="50"
          @change="change($event, 'flexColumnSize', true)"
      /></span>
      <span class="w-11">
        <input
          class="w-full box-border py-1 px-1"
          b="transparent 1px"
          hover="border-1px border-lineColor rounded-sm"
          focus-visible="outline-1px outline-success"
          type="number"
          :value="pedestalStore.basicPedestalSettings.flexColumnGutter"
          min="0"
          max="50"
          @change="change($event, 'flexColumnGutter', true)"
      /></span>
      <span class="w-11 disabled">
        <input
          class="w-full box-border py-1 px-1 cursor-not-allowed appearance-none"
          b="transparent 1px"
          focus-visible="outline-0"
          readonly
          type="number"
          :value="pedestalStore.basicPedestalSettings.flexColumnPerVal"
      /></span>
    </div>
    <div class="px-10px flex items-center justify-between">
      <input
        type="checkbox"
        class="cursor-pointer"
        :checked="pedestalStore.basicPedestalSettings.isUserFlexRow"
        @change="change($event, 'isUserFlexRow', true, 'checkbox')"
      />
      <span class="i-mdi:tally-mark-3 rotate-90"></span>
      <span class="w-11">
        <input
          class="w-full box-border py-1 px-1"
          b="transparent 1px"
          hover="border-1px border-lineColor rounded-sm"
          focus-visible="outline-1px outline-success"
          type="number"
          :value="pedestalStore.basicPedestalSettings.flexRowSize"
          min="0"
          max="50"
          @change="change($event, 'flexRowSize', true)"
      /></span>
      <span class="w-11">
        <input
          class="w-full box-border py-1 px-1"
          b="transparent 1px"
          hover="border-1px border-lineColor rounded-sm"
          focus-visible="outline-1px outline-success"
          type="number"
          :value="pedestalStore.basicPedestalSettings.flexRowGutter"
          min="0"
          max="50"
          @change="change($event, 'flexRowGutter', true)"
      /></span>
      <span class="w-11 disabled">
        <input
          class="w-full box-border py-1 px-1 cursor-not-allowed appearance-none"
          b="transparent 1px"
          focus-visible="outline-0"
          readonly
          type="number"
          :value="pedestalStore.basicPedestalSettings.flexRowPerVal"
      /></span>
    </div>
    <div class="line-style"></div>
    <div class="px-10px py-14px text-sm font-600 color-dark">网 格</div>
    <div class="px-10px flex items-center justify-between">
      <input
        type="checkbox"
        class="cursor-pointer"
        :checked="pedestalStore.basicPedestalSettings.isUserGrid"
        @change="change($event, 'isUserGrid', true, 'checkbox')"
      />
      <span class="i-mdi:dots-grid"></span>
      <span class="w-11">
        <input
          class="w-full box-border py-1 px-1"
          b="transparent 1px"
          hover="border-1px border-lineColor rounded-sm"
          focus-visible="outline-1px outline-success"
          type="number"
          :value="pedestalStore.basicPedestalSettings.gridSize"
          min="0"
          max="50"
          @change="change($event, 'gridSize', true)"
      /></span>
      <span class="w-11"></span>
      <span class="w-11"></span>
    </div>
    <div class="px-10px py-14px text-sm font-600 color-dark">外部背景颜色</div>
    <div class="px-10px">
      <el-config-provider :locale="ZN">
        <el-color-picker
          v-model="pedestalStore.editorBgColor"
          show-alpha
          :predefine="predefineColors"
        />
      </el-config-provider>
      <el-tooltip effect="dark" content="恢复默认" placement="top-start">
        <span
          class="i-mdi:refresh icon-style p-l-10"
          @click="refreshColor('editorBgColor', 'editorBgInitColor')"
        ></span>
      </el-tooltip>
    </div>
    <div class="px-10px py-14px text-sm font-600 color-dark">
      编辑区背景颜色
    </div>
    <div class="px-10px">
      <el-color-picker
        v-model="pedestalStore.pedestalBgColor"
        show-alpha
        :predefine="predefineColors"
      />
      <el-tooltip effect="dark" content="恢复默认" placement="top-start">
        <i
          class="i-mdi:refresh p-l-10 icon-style"
          @click="refreshColor('pedestalBgColor', 'pedestalBgInitColor')"
        ></i>
      </el-tooltip>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.disabled > input::-webkit-outer-spin-button,
.disabled > input::-webkit-inner-spin-button {
  -webkit-appearance: none;
}
</style>
