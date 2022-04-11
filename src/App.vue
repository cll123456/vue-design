<script setup lang="ts">
import Pedestal from './components/pedestal/index.vue'
</script>

<template>
  <div class="wrapper">
    <pedestal :editor-height="1024" :editor-width="1440">2133</pedestal>
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
