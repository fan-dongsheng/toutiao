import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUi from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css' // 引入样式
import './styles/index.less' // 引入less
import axios from 'axios' // 引入axios到main里

// 给axios配置一个baseurl
axios.defaults.baseURL = 'http">http://ttapi.research.itcast.cn/mp/v1_0'

// 引入axios后就要 赋值给vue的原型对象,供全局使用;$axios是发送接口请求的
Vue.prototype.$axios = axios

Vue.config.productionTip = false
Vue.use(ElementUi)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
