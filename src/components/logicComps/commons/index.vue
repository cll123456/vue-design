<script lang="ts" setup>
import { Ref } from 'vue'
import { ICompBase } from './baseType'
const props = defineProps({
  /**
   * 过滤字符串
   */
  filterStr: {
    type: String,
    default: '',
  },
})

const compList: Ref<ICompBase[]> = ref([])

/**
 * 导入下面所有的config
 */
const modules = import.meta.glob('./**/config.ts')
for (const path in modules) {
  modules[path]().then((mod) => {
    compList.value.push(mod.default.base)
  })
}

const filterCompList = computed(() => {
  const filterStr = props.filterStr
  if (!filterStr && filterStr.length === 0) {
    return compList.value
  }
  return compList.value.filter((item) => {
    return item.name.includes(filterStr)
  })
})
</script>
<template>
  <div class="w-full h-full">
    <template v-if="filterCompList.length">
      <div
        v-for="item in filterCompList"
        :key="item.id"
        class="w-30% flex-c p-2 cursor-move flex-col select-none transition-all duration-300"
        border="1px solid lineColor"
        text="1.3em"
        hover="border-primary border-dashed"
      >
        <div :class="item.iconName"></div>
        <div>{{ item.name }}</div>
      </div>
    </template>
    <template v-else>
      <!-- 不存在的时候 -->
      <el-empty
        class="select-none text-sm"
        description="暂无组件，程序猿正在快马加鞭的开发"
      />
    </template>
  </div>
</template>

<style lang="scss" scoped></style>
