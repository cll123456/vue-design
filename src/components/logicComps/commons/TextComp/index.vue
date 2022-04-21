<script lang="ts" setup>
import { PropType, Ref } from 'vue'
import { IBaseType } from '../baseType'
import textCompConfig from './config'

const props = defineProps({
  cusProps: {
    type: Object as PropType<IBaseType>,
    default: () => textCompConfig,
  },
})

const copyProps = ref(props)

const isEditor = ref(false)
const textRef: Ref<HTMLDivElement | null> = ref(null)
/**
 * 修改文字
 */
const changeText = () => {
  if (props.cusProps.config.isLock) return
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
  copyProps.value.cusProps.compProps.vModel = (
    e.target as HTMLDivElement
  )?.innerHTML
}
/**
 * 失焦 不能编辑
 */
const handleBlur = (e: Event) => {
  copyProps.value.cusProps.compProps.vModel = (
    e.target as HTMLDivElement
  )?.innerHTML
  isEditor.value = false
}
</script>
<template>
  <div
    ref="textRef"
    :contenteditable="isEditor"
    class="w-100 h-15 select-none outline-none overflow-ellipsis overflow-y-auto"
    border="1px solid primary"
    :tabindex="0"
    @dblclick="changeText"
    @blur="handleBlur"
    @input="handleInput"
  >
    {{ copyProps.cusProps.compProps.vModel }}
  </div>
</template>

<style lang="scss" scoped></style>
