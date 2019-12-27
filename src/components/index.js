// 引入侧边栏
import layoutAside from './home/layout-side'
// 引入main内容的header
import layoutHeader from './home/layout-header'
// 引入面包屑组件
import breadCrumb from './common/breadcrumb.vue'
// 引入富文本
import { quillEditor } from 'vue-quill-editor'
import 'quill/dist/quill.snow.css' // 富文本编辑器外部引用样式  三种样式三选一引入即可
import coverImges from './publish' // 引入发布文章的 发布图片组件

export default {
  // 这是全局注册组件的方法,调用element中的一个install方法
  // 调用install对象的时候会传入Vue对象
  install (Vue) {
    // 拿到的vue对象可以注册全局组件
    Vue.component('layout-side', layoutAside)
    Vue.component('layout-header', layoutHeader)
    Vue.component('bread-crumb', breadCrumb)
    Vue.component('quill-editor', quillEditor)
    Vue.component('cover-img', coverImges)
  }
}
