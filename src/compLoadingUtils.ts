import { defineAsyncComponent, h } from 'vue'
import Loading from '@/components/compLoading/index.vue'
import Error from '@/components/comLoadingError/index.vue'
// import NProgress from 'nprogress'
// import 'nprogress/nprogress.css'
// NProgress.configure({
//   trickleSpeed: 50,
//   showSpinner: false,
// });
/**
 * 获取范围的随机数
 * @param {Number}} min
 * @param {Number} max
 */
export function random(min: number, max: number) {
  return Math.floor(Math.random() * (max - min) + min)
}

/**
 * 延迟加载
 * @param {Number} time
 */
export function delay(time: number) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(0)
    }, time)
  })
}

/**
 * 获取异步页面
 * @param {*} path
 */
export function getAsyncPage(path: string) {
  return defineAsyncComponent({
    loader: async () => {
      // NProgress.start();
      await delay(random(1000, 5000))
      const page = await import(/* @vite-ignore */ path)
      // NProgress.done();
      return page
    },
    loadingComponent: Loading,
    errorComponent: {
      render() {
        return h(Error, '加载页面失败！~~~')
      },
    },
  })
}

/**
 * 获取异步组件
 * @param {*} path
 */
export function getAsyncComponent(path: string) {
  return defineAsyncComponent({
    loader: () => import(/* @vite-ignore */ path),
    loadingComponent: Loading,
    errorComponent: {
      render() {
        return h(Error, '组件加载失败！~~~')
      },
    },
  })
}
