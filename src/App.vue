<script setup lang="ts">
import Pedestal from './components/pedestal/index.vue'
const clickDiv = () => {
  console.log(1)
}
</script>

<template>
  <div class="wrapper">
    <pedestal :editor-height="1024" :editor-width="1440">
      <p>1232</p>
      <span>sdfdfsf</span>
      <div class="w-50 h-50 bg-success500" @click="clickDiv">
        232
        <p>p3323</p>
      </div>
    </pedestal>
  </div>
</template>

<style scoped lang="scss">
.wrapper {
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: #f5f5f5;
  border: 1px solid #dadadc;
}
</style>
