<script lang="ts" setup>
import { useCompConfigStore } from '@/store/compConfig'
import { useSketchRulerStore } from '@/store/sketchRuler'
import { directionType } from '@/types/styleType'
import { calcMoveStyle } from '@/utils/styleUtils'
import { PropType, ref } from 'vue'
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

const sketchRulerStore = useSketchRulerStore()

const copyStyle = ref({
  width: props.style.width,
  height: props.style.height,
  left: props.style.left,
  top: props.style.top,
})
/**
 * 监听属性变化，改变当前的数据
 */
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
 * 是否被锁住
 */
const isLock = computed(() => props.curProps.config.lock)

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
  e.stopPropagation()
  e.preventDefault()
  compConfigStore.changeCurComp(props.curProps)
  if (isLock.value) {
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
    // 判断是否出界 上 左 下 右
    if (tRes <= 0) {
      tRes = 0
    }
    if (lRes <= 0) {
      lRes = 0
    }

    if (tRes + parseFloat(copyStyle.value.height) >= sketchRulerStore.height) {
      tRes = sketchRulerStore.height - parseFloat(copyStyle.value.height)
    }
    if (lRes + parseFloat(copyStyle.value.width) >= sketchRulerStore.width) {
      lRes = sketchRulerStore.width - parseFloat(copyStyle.value.width)
    }
    copyStyle.value.top = tRes + 'px'
    copyStyle.value.left = lRes + 'px'
  }
  const up = () => {
    if (isMove) {
      compConfigStore.changeData('styles', {
        top: tRes.toString(),
        left: lRes.toString(),
      })
    }
    document.removeEventListener('mousemove', move)
    document.removeEventListener('mouseup', up)
    isMove = false
  }

  document.addEventListener('mousemove', move, { passive: true })
  document.addEventListener('mouseup', up, { passive: true })
}

/**
 * 锁定组件
 */
const lockComp = (isLock: boolean) => {
  compConfigStore.changeData('config', {
    lock: isLock,
  })
}

/**
 * 方向
 */
const pointList: directionType[] = [
  'top',
  'bottom',
  'left',
  'right',
  'left-top',
  'right-top',
  'left-bottom',
  'right-bottom',
]
/**
 * 方向对应的手势
 */
const directionKey = {
  top: 'row-resize',
  bottom: 'row-resize',
  left: 'col-resize',
  right: 'col-resize',
  'left-top': 'nw-resize',
  'right-top': 'ne-resize',
  'left-bottom': 'sw-resize',
  'right-bottom': 'se-resize',
}
/**
 * 获取8个方向点的位置
 */
const getPointStyle = (point: directionType) => {
  const width = parseFloat(copyStyle.value.width)
  const height = parseFloat(copyStyle.value.height)
  const hasT = /top/.test(point)
  const hasB = /bottom/.test(point)
  const hasL = /left/.test(point)
  const hasR = /right/.test(point)
  let newLeft = 0
  let newTop = 0

  // 四个角的点
  if (point.indexOf('-') > 0) {
    newLeft = hasL ? 0 : width
    newTop = hasT ? 0 : height
  } else {
    // 上下两点的点，宽度居中
    if (hasT || hasB) {
      newLeft = width / 2
      newTop = hasT ? 0 : height
    }

    // 左右两边的点，高度居中
    if (hasL || hasR) {
      newLeft = hasL ? 0 : width
      newTop = Math.floor(height / 2)
    }
  }

  const style = {
    marginLeft: '-4px',
    marginTop: '-4px',
    left: `${newLeft}px`,
    top: `${newTop}px`,
    cursor: directionKey[point],
  }
  return style
}
/**
 * 点击点来放大缩小组件
 */
const handleMouseDownOnPoint = (e: MouseEvent, item: directionType) => {
  e.stopPropagation()
  e.preventDefault()
  const width = parseFloat(copyStyle.value.width)
  const height = parseFloat(copyStyle.value.height)
  const left = parseFloat(copyStyle.value.left)
  const top = parseFloat(copyStyle.value.top)
  let isMove = false
  // 获取 point 与实际拖动基准点的差值
  const pointRect = (e.target as HTMLDivElement)?.getBoundingClientRect()
  let resStyle = {
    width: width,
    height: height,
    left: left,
    top: top,
  }
  const move = (moveEvent: MouseEvent) => {
    const desX = moveEvent.clientX
    const desY = moveEvent.clientY
    isMove = true

    resStyle = calcMoveStyle(
      item,
      {
        x: pointRect.x,
        y: pointRect.y,
        width: width,
        height: height,
        left: left,
        top: top,
      },
      { x: desX, y: desY },
      { width: sketchRulerStore.width, height: sketchRulerStore.height },
    )
    copyStyle.value.width = resStyle.width + 'px'
    copyStyle.value.height = resStyle.height + 'px'
    copyStyle.value.left = resStyle.left + 'px'
    copyStyle.value.top = resStyle.top + 'px'
  }

  const up = () => {
    if (isMove) {
      compConfigStore.changeData('styles', {
        top: resStyle.top.toString(),
        left: resStyle.left.toString(),
        height: resStyle.height.toString(),
        width: resStyle.width.toString(),
      })
    }
    document.removeEventListener('mousemove', move)
    document.removeEventListener('mouseup', up)
    isMove = false

    // 选中当前组件
  }

  document.addEventListener('mousemove', move)
  document.addEventListener('mouseup', up)
}
</script>
<template>
  <div
    :class="`absolute hover:cursor-move ${
      isActive ? 'select-none outline-solid outline-1px outline-primary' : ''
    } ${isLock ? 'hover:cursor-not-allowed' : ''}`"
    :style="copyStyle"
    @mousedown="moveComp"
  >
    <!-- <div
      v-show="isActive && !isLock"
      class="i-mdi:restore absolute left-50% top--40px transition color-primary -translate-x-50% text-xl"
      active="cursor-grabbing"
      hover="cursor-grabbing"
    ></div> -->
    <!-- 锁定组件 -->
    <div
      v-show="isActive"
      class="absolute right-10px top-0px transition text-xl z-1"
    >
      <span
        v-show="isLock"
        class="i-mdi-lock-outline icon-style"
        hover="i-mdi-lock-open-variant-outline"
        @click="lockComp(false)"
      ></span>
      <span
        v-show="!isLock"
        class="i-mdi-lock-open-variant-outline icon-style"
        hover="i-mdi-lock-outline"
        @click="lockComp(true)"
      ></span>
    </div>
    <!-- 生成八个点 -->
    <div
      v-for="item in isActive && !isLock ? pointList : []"
      :key="item"
      class="absolute bg-#fff h-8px w-8px z-1 rounded-1\/2"
      border="1px solid #59c7f9"
      :style="getPointStyle(item)"
      @mousedown="handleMouseDownOnPoint($event, item)"
    ></div>
    <slot></slot>
  </div>
</template>

<style lang="scss" scoped></style>
