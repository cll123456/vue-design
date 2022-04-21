/// <reference types="vitest" />
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import Unocss from 'unocss/vite'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    Unocss(),
    // 自动引入组件
    components({
      dirs: ['src/components'],
      extensions: ['vue'],
      resolvers: [ElementPlusResolver()],
      dts: './src/components.d.ts',
    }),
    // 自动引入库的api
    AutoImport({
      imports: ['vue', 'pinia'],
      resolvers: [ElementPlusResolver()],
      dts: './src/auto-imports.d.ts',
    }),
  ],

  resolve: {
    alias: {
      '@': resolve(__dirname, './src'), //设置别名
    },
    dedupe: ['vue'],
  },
  optimizeDeps: {
    include: [
      'element-plus/es',
      'element-plus/es/components/tooltip/style/css',
      'element-plus/es/components/empty/style/css',
      'element-plus/es/components/tabs/style/css',
      'element-plus/es/components/tab-pane/style/css',
      'element-plus/es/components/input/style/css',
      'element-plus/es/components/config-provider/style/css',
      'element-plus/es/components/color-picker/style/css',
    ],
  },
  test: {
    environment: 'jsdom',
    include: ['src/components/**/*.test.ts'],
    globals: true,
  },
  // build: {
  //   sourcemap: true,
  //   minify: 'terser',
  //   terserOptions: {
  //     ecma: 2020,
  //     compress: false,
  //   },
  // },
})
