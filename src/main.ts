import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import { createPinia } from 'pinia'
import 'element-plus/theme-chalk/src/message.scss'

const app = createApp(App)
app.use(createPinia())
app.use(ElementPlus)
app.mount('#app')
