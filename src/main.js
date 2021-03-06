import Vue from 'vue'
import App from './App.vue'
// 引入路由守卫
import './premission'
import router from './router'
import ElementUi from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css' // 引入样式
import './styles/index.less' // 引入less
// 这里的axios请求,直接引入拦截的工具中的axios,带令牌的axios;
import axios from './untils/request' // 引入axios到main里

import component from './components' // 这是引入component 进行全局注册,方便组件使用;

// 给axios配置一个baseurl
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0'

// 引入axios后就要 赋值给vue的原型对象,供全局使用;$axios是发送接口请求的
Vue.prototype.$axios = axios

Vue.config.productionTip = false
Vue.use(ElementUi)

Vue.use(component) // 全局注册一下,组件.

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
