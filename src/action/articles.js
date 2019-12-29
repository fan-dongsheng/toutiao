// 全局请求模块;代替 $axios;
import request from '../untils/request'
import { API_ARTICLES, API_CHANNELS } from '../constant/api' // 用{} 是因为,组件没有导出一个变量,所有用{}

export function getArtical (params) {
  return request({
    url: API_ARTICLES, // 封装api,不会固定;
    params
  })
}

export function getChannel () {
  return request({
    url: API_CHANNELS

  })
}
