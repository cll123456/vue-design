<script setup lang="ts">
import { useCompConfigStore } from '@/store/compConfig'
import { useRightPanelStore } from '@/store/rightPanel'
import CompLoading from '@/components/compLoading/index.vue'
import ComLoadingError from '@/components/ComLoadingError/index.vue'
import ZN from 'element-plus/lib/locale/lang/zh-CN'

const rightPanelStore = useRightPanelStore()
const RPAttr = defineAsyncComponent({
  loader: () => import('../settings/RPAttr.vue'),
  loadingComponent: CompLoading,
  errorComponent: ComLoadingError,
})

const compConfigStore = useCompConfigStore()
// 关闭
const closeRightPanel = () => {
  rightPanelStore.$patch({
    isShowRightPanel: false,
  })
}

const activeName = ref('first')

const predefineColors = ref([
  '#ff4500',
  '#ff8c00',
  '#ffd700',
  '#90ee90',
  '#00ced1',
  '#1e90ff',
  '#c71585',
])

const color = ref('#f40')

/**
 * 改变样式
 */
const change = (
  e: Event | string,
  props: string,
  type: 'normal' | 'string' = 'normal',
) => {
  if (type === 'normal' && e instanceof Event) {
    compConfigStore.changeData('styles', {
      [props]: (e.target as HTMLInputElement).value,
    })
  } else {
    compConfigStore.changeData('styles', {
      [props]: e,
    })
  }
}
/**
 * 改变属性的内容
 */
const changeCompProps = (e: Event, props: string) => {
  compConfigStore.changeData('compProps', {
    [props]: (e.target as HTMLInputElement).value,
  })
}
</script>
<template>
  <div class="select-none">
    <div class="px-10px py-14px text-base color-dark flex justify-between">
      <span class="align-middle">文本框设置</span>
      <el-tooltip effect="dark" content="关闭" placement="left-start">
        <span
          class="i-mdi-window-close icon-style"
          @click="closeRightPanel"
        ></span>
      </el-tooltip>
    </div>
    <div class="line-style"></div>
    <div class="right-panel--container">
      <el-tabs v-model="activeName">
        <el-tab-pane label="属 性" name="first">
          <div class="h-[calc(100vh-90px)] w-full overflow-y-auto">
            <div class="p-t-5px p-b-14px px-10px text-sm font-600 color-dark">
              基本属性
            </div>
            <div class="w-full px-10px p-b-14px">
              <RPAttr></RPAttr>
            </div>
            <div class="p-t-5px p-b-14px px-10px text-sm font-600 color-dark">
              其他属性
            </div>
            <div class="w-full px-10px p-b-14px">
              <div class="w-full">
                <span text-sm>文本颜色：</span>
                <el-config-provider :locale="ZN">
                  <el-color-picker
                    :model-value="compConfigStore.curComp?.styles.color"
                    color-format="hex"
                    show-alpha
                    :predefine="predefineColors"
                    @change="change($event, 'color', 'string')"
                  />
                </el-config-provider>
              </div>
              <div class="w-full flex items-center h-32px">
                <span text-sm>字体大小：</span>
                <input
                  class="rp-input-number"
                  type="number"
                  :value="compConfigStore.curComp?.styles.fontSize"
                  min="0"
                  @change="change($event, 'fontSize')"
                />
              </div>
              <div class="w-full flex items-center h-32px">
                <span text-sm>字体粗细：</span>
                <input
                  class="rp-input-number"
                  type="number"
                  :value="compConfigStore.curComp?.styles.fontWeight"
                  min="0"
                  @change="change($event, 'fontWeight')"
                />
              </div>
              <div class="w-full flex items-center h-32px">
                <span text-sm>字体间距：</span>
                <input
                  class="rp-input-number"
                  type="number"
                  :value="compConfigStore.curComp?.styles.letterSpacing"
                  min="0"
                  @change="change($event, 'letterSpacing')"
                />
              </div>
              <div class="w-full flex items-center h-32px">
                <span text-sm>字体行高：</span>
                <input
                  class="rp-input-number"
                  type="number"
                  :value="compConfigStore.curComp?.styles.lineHeight"
                  min="0"
                  @change="change($event, 'lineHeight')"
                />
              </div>
              <div class="w-full flex items-center h-32px">
                <span text-sm>字透明度：</span>
                <input
                  class="rp-input-number"
                  type="number"
                  :value="compConfigStore.curComp?.styles.opacity"
                  min="0"
                  @change="change($event, 'opacity')"
                />
              </div>
              <div class="w-full flex items-center h-32px">
                <span text-sm>对齐方式：</span>
                <div class="display-inline m-l-5px">
                  <i
                    :class="`i-mdi:align-horizontal-left icon-style ${
                      compConfigStore.curComp?.styles.textAlign === 'left'
                        ? 'color-primary'
                        : ''
                    }`"
                    @click="change('left', 'textAlign', 'string')"
                  ></i>
                  <i
                    :class="`i-mdi:align-horizontal-center icon-style m-x-5px ${
                      compConfigStore.curComp?.styles.textAlign === 'center'
                        ? 'color-primary'
                        : ''
                    }`"
                    @click="change('center', 'textAlign', 'string')"
                  ></i>
                  <i
                    :class="`i-mdi:align-horizontal-right icon-style ${
                      compConfigStore.curComp?.styles.textAlign === 'right'
                        ? 'color-primary'
                        : ''
                    }`"
                    @click="change('right', 'textAlign', 'string')"
                  ></i>
                </div>
              </div>
              <div class="w-full flex items-center h-32px">
                <span text-sm>边框大小：</span>
                <input
                  class="rp-input-number"
                  type="number"
                  :value="compConfigStore.curComp?.styles.borderWidth"
                  min="0"
                  @change="change($event, 'borderWidth')"
                />
              </div>
              <div class="w-full flex items-center h-32px">
                <span text-sm>边框颜色：</span>
                <el-config-provider :locale="ZN">
                  <el-color-picker
                    :model-value="compConfigStore.curComp?.styles.borderColor"
                    color-format="hex"
                    show-alpha
                    :predefine="predefineColors"
                    @change="change($event, 'borderColor', 'string')"
                  />
                </el-config-provider>
              </div>
              <div class="w-full flex items-center h-32px">
                <span text-sm>边框类型：</span>
                <div class="flex m-l-5px cursor-pointer items-center">
                  <div
                    :class="`w-16px h-16px border-1px border-solid border-#ccc box-border ${
                      compConfigStore.curComp?.styles.borderStyle === 'solid'
                        ? 'border-primary'
                        : ''
                    }`"
                    @click="change('solid', 'borderStyle', 'string')"
                  ></div>
                  <div
                    :class="`w-16px h-16px border-1px m-l-5px border-dashed border-#ccc box-border ${
                      compConfigStore.curComp?.styles.borderStyle === 'dashed'
                        ? 'border-primary'
                        : ''
                    }`"
                    @click="change('dashed', 'borderStyle', 'string')"
                  ></div>
                  <div
                    :class="`w-16px h-16px border-1px m-l-5px border-dotted border-#ccc box-border ${
                      compConfigStore.curComp?.styles.borderStyle === 'dotted'
                        ? 'border-primary'
                        : ''
                    }`"
                    @click="change('dotted', 'borderStyle', 'string')"
                  ></div>
                  <div
                    :class="`w-16px h-16px  m-l-5px color-#ccc leading-16px ${
                      compConfigStore.curComp?.styles.borderStyle === 'none'
                        ? 'color-primary'
                        : ''
                    }`"
                    @click="change('none', 'borderStyle', 'string')"
                  >
                    无
                  </div>
                </div>
              </div>
              <div class="w-full p-b-50px">
                <span text-sm>文本内容：</span>
                <textarea
                  class="rp-input-number w-full border-#ccc"
                  autosize="true"
                  type="textarea"
                  :value="compConfigStore.curComp?.compProps.vModel"
                  @input="changeCompProps($event, 'vModel')"
                />
              </div>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="动 画" name="second">Config</el-tab-pane>
        <el-tab-pane label="事 件" name="third">Role</el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.right-panel--container {
  width: 100%;
  height: 100%;

  :deep(.el-tabs__nav-scroll) {
    margin-left: 20px;
  }
}
</style>
