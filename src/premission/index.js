// 这里是导航守卫,
import router from '../router' // 引入路由;

// 导航守卫格式
router.beforeEach(function (to, from, next) {
  // 这里就要判断,如果to即将进入的是主页,就要再判断是否有token,没有就跳转到login
  // to对象中有path属性,是地址;

  if (to.path !== '/login') {
    // 这里判断是否有token令牌;先获取令牌
    let token = window.localStorage.getItem('user_token')

    if (token) {
      next()
    } else {
      // 没有令牌就跳转到登录
      router.push('/login')
    }
  } else {
    next()
  }
})
