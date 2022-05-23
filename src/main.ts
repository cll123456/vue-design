import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'
import 'uno.css'
import '@/assets/styles/commonAnimation.css'
import { PiniaUndo } from './store/plugins/PiniaUndo'
import { safeStringify } from './utils/stringUtils'
// import 'element-plus/theme-chalk/src/message.scss'

const app = createApp(App)
const pinia = createPinia()
pinia.use(PiniaUndo)
app.use(pinia)
app.mount('#app')
