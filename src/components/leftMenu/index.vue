<script lang="ts" setup>
import { useEventRegister } from '@/hooks/useEventRegister'
import { useLeftMenuPanelStore } from '@/store/leftMenuPanel'
import { myComponents } from '@/types/common'
const leftMenuStore = useLeftMenuPanelStore()
const Test = defineAsyncComponent(
  () => import('@/components/leftMenu/Test.vue'),
)

useEventRegister(
  window,
  (e: Event) => {
    const targetParentCls = (e.target as HTMLDivElement).parentElement!
      .classList
    if (
      !targetParentCls.contains('sys-left-menu--containers') &&
      !leftMenuStore.getStateProps.isLock
    ) {
      leftMenuStore.$patch({
        hasShowPanel: false,
      })
    }
  },
  'click',
)
/**
 * 显示面板
 */
const showPanel = (title: string, compName: myComponents) => {
  leftMenuStore.$patch({
    hasShowPanel: true,
    panelTitle: title,
  })
  leftMenuStore.changeCurComp(compName)
}
/**
 * 锁定左侧菜单
 */
const lockPanel = (isLock: boolean) => {
  leftMenuStore.$patch({
    isLock,
  })
}
/**
 * 关闭面板
 */
const closePanel = () => {
  leftMenuStore.$patch({
    hasShowPanel: false,
  })
}
</script>
<template>
  <div class="relative w-full h-full">
    <div
      class="sys-left-menu--containers list-none m-0 p-0 flex-c justify-start flex-col h-full"
      border="solid #dadadc r-1 l-0 t-0 b-0"
    >
      <el-tooltip effect="dark" content="组 件" placement="right-start">
        <span
          class="i-mdi:puzzle-outline icon-style m-t-3"
          text="#8e99ab lg"
          @click="showPanel('组件', Test)"
        ></span>
      </el-tooltip>
      <el-tooltip effect="dark" content="图 片" placement="right-start">
        <span
          class="i-mdi:panorama-variant-outline icon-style my-5"
          text="#8e99ab lg"
        ></span>
      </el-tooltip>
      <el-tooltip effect="dark" content="模 板" placement="right-start">
        <span class="i-mdi:view-compact icon-style" text="#8e99ab lg"></span
      ></el-tooltip>
    </div>
    <transition name="linear-opacity">
      <div
        v-if="leftMenuStore.getStateProps.hasShowPanel"
        :style="{ width: leftMenuStore.getStateProps.panelWidth + 'px' }"
        class="absolute h-full w-300px p-2 top-0 left-46px bg-white z-3"
        style="box-shadow: 4px 6px 6px 0 rgb(31 50 88 / 8%)"
      >
        <div class="p-2 flex justify-between">
          <div text="base" class="font-700 vertical-middle">
            {{ leftMenuStore.getStateProps.panelTitle }}
          </div>
          <div>
            <el-tooltip
              effect="dark"
              :content="`${
                leftMenuStore.getStateProps.isLock ? '解锁' : '锁定'
              }`"
              placement="bottom"
            >
              <span
                v-if="leftMenuStore.getStateProps.isLock"
                class="i-mdi-lock-outline icon-style"
                hover="i-mdi-lock-open-variant-outline"
                @click="lockPanel(false)"
              ></span>
              <span
                v-else
                class="i-mdi-lock-open-variant-outline icon-style"
                hover="i-mdi-lock-outline"
                @click="lockPanel(true)"
              ></span>
            </el-tooltip>
            <el-tooltip effect="dark" content="关闭" placement="bottom">
              <span
                class="i-mdi-window-close icon-style m-l-2"
                @click="closePanel"
              ></span>
            </el-tooltip>
          </div>
        </div>
        <keep-alive>
          <component :is="leftMenuStore.getCurComp"></component>
        </keep-alive>
      </div>
    </transition>
  </div>
</template>

<style lang="scss" scoped></style>
