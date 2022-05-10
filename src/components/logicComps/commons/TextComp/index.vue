<script lang="ts" setup>
import { useRightPanelStore } from '@/store/rightPanel'
import { PropType, Ref } from 'vue'
import { IBaseType } from '../baseType'
import textCompConfig from './config'
import CompLoading from '@/components/compLoading/index.vue'
import ComLoadingError from '@/components/ComLoadingError/index.vue'
import { useCompConfigStore } from '@/store/compConfig'
const TextCompRightPanel = defineAsyncComponent({
  loader: () => import('./TextCompRightPanel.vue'),
  loadingComponent: CompLoading,
  errorComponent: ComLoadingError,
})

const props = defineProps({
  curProps: {
    type: Object as PropType<IBaseType>,
    default: () => textCompConfig,
  },
})
const compConfigStore = useCompConfigStore()

const rightPanelStore = useRightPanelStore()

const copyProps = ref(props)

const isEditor = ref(false)
const textRef: Ref<HTMLDivElement | null> = ref(null)
/**
 * 修改文字
 */
const changeText = () => {
  if (props.curProps.config.isLock) return
  if (textRef.value) {
    selectText(textRef.value)
  }
  isEditor.value = true
}
/**
 * 全选内容
 */
const selectText = (element: HTMLDivElement) => {
  const selection = document.getSelection()
  const range = document.createRange()
  range.selectNodeContents(element)
  selection?.removeAllRanges()
  selection?.addRange(range)
}
/**
 * 输入值
 */
const handleInput = (e: Event) => {
  copyProps.value.curProps.compProps.vModel = (
    e.target as HTMLDivElement
  )?.innerHTML
}
/**
 * 失焦 不能编辑
 */
const handleBlur = (e: Event) => {
  copyProps.value.curProps.compProps.vModel = (
    e.target as HTMLDivElement
  )?.innerHTML
  isEditor.value = false
}

const openRightPanel = () => {
  rightPanelStore.$patch({
    isShowRightPanel: true,
  })
  rightPanelStore.changeRightPanelComps(TextCompRightPanel)
  compConfigStore.changeCurComp(props.curProps)
}
</script>
<template>
  <div
    ref="textRef"
    :contenteditable="isEditor"
    class="w-100 h-15 select-none p-x-5px p-y-10px outline-none overflow-x-hidden break-words overflow-y-auto"
    border="1px solid primary"
    :tabindex="1"
    @click="openRightPanel"
    @dblclick="changeText"
    @blur="handleBlur"
    @input="handleInput"
  >
    {{ copyProps.curProps.compProps.vModel }}
  </div>
</template>

<style lang="scss" scoped></style>
