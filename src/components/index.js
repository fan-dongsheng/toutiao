// 引入侧边栏
import layoutAside from './home/layout-side'
// 引入main内容的header
import layoutHeader from './home/layout-header'

export default {
  // 这是全局注册组件的方法,调用element中的一个install方法
  // 调用install对象的时候会传入Vue对象
  install (Vue) {
    // 拿到的vue对象可以注册全局组件
    Vue.component('layout-side', layoutAside)
    Vue.component('layout-header', layoutHeader)
  }
}
