import mitt from 'mitt'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import lazyPlugin from 'vue3-lazy'


const app = createApp(App)

// 挂载事件总线
app.config.globalProperties.$bus = new mitt();

app.use(store).use(router).use(lazyPlugin, {
  loading: require('assets/images/replace.png'), // 图片加载时默认图片
  // error: require('@/assets/images/error.png')// 图片加载失败时默认图片
}).mount('#app')
