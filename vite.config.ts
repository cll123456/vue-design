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
      dts: './src/auto-imports.d.ts',
    }),
  ],

  resolve: {
    alias: {
      '@': resolve(__dirname, './src'), //设置别名
    },
    dedupe: ['vue'],
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
