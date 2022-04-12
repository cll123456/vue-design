import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'
import 'uno.css'
import '@/assets/styles/commonAnimation.css'
// import 'element-plus/theme-chalk/src/message.scss'

const app = createApp(App)
app.use(createPinia())
app.mount('#app')
