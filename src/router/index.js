import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/home'
import Login from '../views/login' // 引入组件
import Home2 from '../views/home/home' // 引入二级路由

Vue.use(VueRouter)

const routes = [
  {
    path: '*',
    component: () => import('../views/404.vue')

  },
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/home',
    component: Home,
    children: [
      {
        // 二级路由 如果地址什么都不写,默认显示内容作为一级组件
        path: '',
        component: Home2
      },
      // 评论列表
      {
        path: 'comment', // 两种写法 完整地址 /home/comment  或者相对地址 comment
        component: () => import('../views/comment')
      },
      // 素材管理
      {
        path: 'material',
        component: () => import('../views/material')
      },
      // 内容列表
      {
        path: 'articles',
        component: () => import('../views/article')
      },
      // 发表文章
      {
        path: 'publish',
        component: () => import('../views/publish')
      },
      // 修改文章,动态路由
      {
        path: 'publish/:articleId',
        component: () => import('../views/publish')
      },
      // 账户信息;
      {
        path: 'account',
        component: () => import('../views/account')
      }

    ]
  }

]

const router = new VueRouter({
  routes
})

export default router
