<script setup lang="ts">
import Pedestal from './components/pedestal/index.vue'
import LeftMenu from './components/leftMenu/index.vue'
</script>

<template>
  <div class="abs-full flex">
    <div class="w-46px">
      <LeftMenu></LeftMenu>
    </div>
    <div class="w-[calc(100%-46px)] h-full relative">
      <pedestal>
        <!-- <p>1232</p>
        <span>sdfdfsf</span>
        <div contenteditable class="w-50 h-50 bg-success500" @click="clickDiv">
          232
          <p>p3323</p>
        </div>
        <TextComp></TextComp> -->
      </pedestal>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
