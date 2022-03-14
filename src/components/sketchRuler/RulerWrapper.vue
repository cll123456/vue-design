<script lang='ts' setup>
import { computed, ref } from 'vue'
import { IPaletteObj } from '../canvasRules/canvasRulesType';
import CanvasRuler from '../canvasRules/index.vue';
import RulesLine from './RulesLine.vue';
import { vShow } from 'vue';


const props = defineProps<{
  /**
   * 放大或者缩小的倍数
   */
  scale: number,
  /**
   * 比列
   */
  ratio: number,
  /**
   * 线距离顶部或者左侧的距离
   */
  thick: number,
  /**
   * 尺子的样式
   */
  palette: IPaletteObj,
  /**
   * 是否垂直
   */
  vertical: boolean,
  /**
   * 长度
   */
  width: number,
  /**
   * 高度
   */
  height: number,
  /**
   * 距离实际屏幕开始位置的距离
   */
  start: number,
  /**
   * 尺子的线（红色的标记线）
   */
  lines: number[],
  /**
   * 选中区域的开始位置
   */
  selectStart: number,
  /**
   * 选中区域的长度
   */
  selectLength: number,
  /**
   * 是否显示所有的线
   */
  isShowReferLine: boolean
}>()

const showIndicator = ref(false);

const valueNum = ref(0);

/**
 * 动态生成类名
 */
const rwClassName = computed(() => {
  const className = props.vertical ? 'v-container' : 'h-container'
  return className
})

/**
 * 生成横向和纵向对应的样式
 */
const rwStyle = computed(() => {
  const hContainer = {
    width: `calc(100% - ${props.thick}px)`,
    height: `${props.thick! + 1}px`,
    left: `${props.thick}` + 'px'
  }
  const vContainer = {
    width: `${props.thick && props.thick + 1}px`,
    height: `calc(100% - ${props.thick}px)`,
    top: `${props.thick}` + 'px'
  }
  return props.vertical ? vContainer : hContainer
})

/**
 * 指示线的样式
 */
const indicatorStyle = computed(() => {
  const indicatorOffset = (valueNum.value - props.start) * props.scale!
  let positionKey = 'top'
  let borderKey = 'borderLeft'
  positionKey = props.vertical ? 'top' : 'left'
  borderKey = props.vertical ? 'borderBottom' : 'borderLeft';
  return {
    [positionKey]: indicatorOffset + 'px',
    [borderKey]: `1px solid ${props.palette?.lineColor}`,
  }
})

/**
 * 添加指示线
 */
const handleNewLine = (value: number) => {
  props.lines.push(value)
}

/**
 * 鼠标点击后松开，需要添加线
 */
const handleLineRelease = (value: number, index: number) => {
  // 左右或上下超出时, 删除该条对齐线
  const offset = value - props.start
  const maxOffset =
    (props.vertical ? props.height : props.width) / props.scale!
  if (offset < 0 || offset > maxOffset) {
    handleLineRemove(index)
  } else {
    props.lines[index] = value;
  }
}

/**
 * 删除线指示线
 */
const handleLineRemove = (index: any) => {
  props.lines.splice(index, 1)
}

</script>

<template>
  <div :class="rwClassName" :style="rwStyle">
    <div class="rule-styles">
      <canvas-ruler
        :vertical="vertical"
        :scale="scale"
        :width="width"
        :height="height"
        :start="start"
        :ratio="ratio"
        :select-start="selectStart"
        :select-length="selectLength"
        :palette="palette"
        v-model:valueNum="valueNum"
        v-model:showIndicator="showIndicator"
        @onAddLine="handleNewLine"
      ></canvas-ruler>
    </div>
    <div v-show="isShowReferLine" class="lines">
      <rules-line
        v-for="(v, i) in lines"
        :key="v + i"
        :index="i"
        :value="v >> 0"
        :scale="scale"
        :start="start"
        :thick="thick"
        :palette="palette"
        :vertical="vertical"
        :is-show-refer-line="isShowReferLine"
        @onRemove="handleLineRemove"
        @onRelease="handleLineRelease"
      ></rules-line>
    </div>
    <div v-show="showIndicator" class="indicator" :style="indicatorStyle">
      <div class="value">{{ valueNum }}</div>
    </div>
  </div>
</template>

<style lang='scss' scoped >
.line {
  position: absolute;
}

.rule-styles {
  pointer-events: auto;
}
.h-container,
.v-container {
  position: absolute;
}
.h-container .lines,
.v-container .lines {
  pointer-events: none;
}

.h-container:hover .lines,
.v-container:hover .lines {
  pointer-events: auto;
}

.h-container {
  top: 0;
  position: absolute;
}

.h-container .indicator {
  top: 10px;
  height: 100vh;
  position: absolute;
}

.h-container .indicator .value {
  width: auto;
  padding: 0 2px;
  margin-top: 4px;
  margin-left: 4px;
}

.h-container {
  top: 0;
  position: absolute;
  .line {
    top: 0;
    height: 100vh;
    padding-left: 5px;
    user-select: none;

    :deep(.action) {
      transform: translateX(-24px);
      .value {
        margin-left: 4px !important;
      }
    }
  }
}

.v-container {
  left: 0;
}
.v-container .indicator {
  width: 100vw;
  position: absolute;
  left: 10px;
}

.v-container .indicator .value {
  left: 0;
  width: auto;
  padding: 0 2px;
  margin-top: -5px;
  margin-left: 2px;
  transform: rotate(-90deg);
  transform-origin: 0 0;
}
.v-container {
  left: 0;
  .line {
    left: 0;
    width: 100vw;
    padding-top: 5px;
    user-select: none;

    :deep(.action) {
      transform: translateY(-24px);
      flex-direction: column;
      .value {
        margin-top: 4px;
      }
    }
  }
}
</style>
