<script lang="ts" setup>
import { ref } from 'vue'
import CompLoading from '@/components/compLoading/index.vue'
import ComLoadingError from '@/components/ComLoadingError/index.vue'
const CommonIndex = defineAsyncComponent({
  loader: () => import('@/components/logicComps/commons/index.vue'),
  loadingComponent: CompLoading,
  errorComponent: ComLoadingError,
})

const t = ref(1)
</script>
<template>
  <div>
    <!-- 输入框 -->
    <el-input
      v-model="t"
      type="text"
      size="default"
      clearable
      placeholder="搜索组件"
    >
      <template #suffix>
        <span
          class="i-mdi-magnify text-1.2em icon-style cursor-pointer h-full"
        ></span>
      </template>
    </el-input>
    <!-- 选择组件库 -->
    <div>
      <el-tabs :tab-position="'top'">
        <el-tab-pane label="通用组件">
          <CommonIndex />
        </el-tab-pane>
        <el-tab-pane label="Element-plus">Element-plus</el-tab-pane>
        <el-tab-pane label="ant-design">ant-design</el-tab-pane>
        <el-tab-pane label="期待更多">期待更多……</el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
