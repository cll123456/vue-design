<script lang="ts" setup>
import { useEventRegister } from '@/hooks/useEventRegister'
import { useCompConfigStore } from '@/store/compConfig'
import { useRightPanelStore } from '@/store/rightPanel'
import { PropType, Ref, ref } from 'vue'
import { IBaseType } from '../logicComps/commons/baseType'

const props = defineProps({
  style: {
    type: Object,
    default: () => ({}),
  },
  /**
   * 当前组件属性
   */
  curProps: {
    type: Object as PropType<IBaseType>,
    default: () => ({}),
  },
})

const compConfigStore = useCompConfigStore()

const copyStyle = ref({
  width: props.style.width,
  height: props.style.height,
  left: props.style.left,
  top: props.style.top,
})

watchEffect(() => {
  if (props.curProps.id === compConfigStore.curComp?.id) {
    copyStyle.value = {
      ...copyStyle.value,
      width: props.style.width,
      height: props.style.height,
      left: props.style.left,
      top: props.style.top,
    }
  }
})

/**
 * 是否被选中
 */
const isActive = computed(
  () => compConfigStore.curComp?.id === props.curProps.id,
)
/**
 * 移动组件
 */
const moveComp = (e: MouseEvent) => {
  compConfigStore.changeCurComp(props.curProps)
  if (props.curProps.config.isLock) {
    return
  }

  const startY = e.clientY
  const startX = e.clientX
  const startTop = Number(compConfigStore.curComp?.styles.top)
  const startLeft = Number(compConfigStore.curComp?.styles.left)
  let isMove = false
  let tRes = 0,
    lRes = 0
  const move = (mouseEvent: MouseEvent) => {
    isMove = true
    const curX = mouseEvent.clientX
    const curY = mouseEvent.clientY
    tRes = curY - startY + startTop
    lRes = curX - startX + startLeft
    copyStyle.value.top = tRes + 'px'
    copyStyle.value.left = lRes + 'px'
  }
  const up = (mouseEvent: MouseEvent) => {
    if (isMove) {
      compConfigStore.changeData('styles', {
        top: tRes.toString(),
        left: lRes.toString(),
      })
    }
    document.removeEventListener('mousemove', move)
    document.removeEventListener('mouseup', up)
  }

  document.addEventListener('mousemove', move, { passive: true })
  document.addEventListener('mouseup', up, { passive: true })
}
</script>
<template>
  <div
    :class="`absolute hover:cursor-move ${
      isActive ? 'select-none outline-solid outline-1px outline-primary' : ''
    }`"
    :style="copyStyle"
    @mousedown="moveComp"
  >
    <div
      v-show="isActive"
      class="i-mdi:restore absolute left-50% top--40px transition color-primary -translate-x-50% text-xl"
      active="cursor-grabbing"
      hover="cursor-grabbing"
    ></div>
    <!-- 生成八个点 -->
    <slot></slot>
  </div>
</template>

<style lang="scss" scoped></style>
