import mitt from 'mitt'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

const app = createApp(App)

// 挂载事件总线
app.config.globalProperties.$bus = new mitt();

app.use(store).use(router).mount('#app')
