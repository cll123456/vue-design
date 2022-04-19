<script lang="ts" setup>
import { ref } from 'vue'
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
        <el-tab-pane label="通用组件">通用组件</el-tab-pane>
        <el-tab-pane label="Element-plus">Element-plus</el-tab-pane>
        <el-tab-pane label="ant-design">ant-design</el-tab-pane>
        <el-tab-pane label="期待更多">期待更多……</el-tab-pane>
      </el-tabs>
    </div>
    <!-- 不存在的时候 -->
    <el-empty
      class="select-none text-sm"
      description="暂无组件，程序猿正在快马加鞭的开发"
    />
  </div>
</template>

<style lang="scss" scoped></style>
