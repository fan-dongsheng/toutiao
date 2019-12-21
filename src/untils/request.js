// axios请求统一处理请求令牌,请求拦截;
import axios from 'axios'
// interceptors 拦截 ,这里有两个回调函数,正确执行,错误执行
axios.interceptors.request.use(function (config) {
  // config是axios的配置信息;发送请求时使用;
  let token = window.localStorage.getItem('user_token')
  // 获取token,注入到cofig中;
  config.headers.Authorization = `Bearer ${token}`
  // 需要返回config
  return config
}, function () {
  // 这里执行失败请求
})
// 直接将axios导出去,再引入到main.js中,供全局使用
export default axios
