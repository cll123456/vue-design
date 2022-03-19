<script setup lang="ts">
import Pedestal from './components/pedestal/index.vue'



</script>

<template>
  <div class="wrapper">
    <pedestal :editor-height="1024" :editor-width="1440"></pedestal>
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

.screens {
  position: absolute;
  width: 100%;
  height: 100%;
  overflow: auto;
}

.screen-container {
  position: absolute;
  width: 5000px;
  height: 3000px;
}

#canvas {
  position: absolute;
  top: 80px;
  left: 50%;
  width: 1440px;
  height: 1024px;
  margin-left: -80px;
  background: lightblue;
  transform-origin: 50% 0;
}
</style>
