import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from '@/router'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import { createPinia } from "pinia"


const app = createApp(App)
// 2. 创建pinia
const pinia = createPinia()
// 3. 使用pinia
app.use(pinia)
app.use(router)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
app.mount('#app')