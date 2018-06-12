import Axios from 'axios'
import API from './resources'
import store from '../vuex/store'
// axios 配置
Axios.defaults.timeout = 5000
// Axios.defaults.withCredentials = true
Axios.defaults.headers = {
  // 'Access-Control-Allow-Credentials':'true',
  // 'Content-Type': 'application/json',
  // 'Access-Control-Allow-Origin':'*',
  // 'Access-Control-Allow-Methods':'POST,GET,OPTIONS,PUT,DELETE',
  // 'Access-Control-Allow-Headers':'cache-control,content-type,hash-referer,x-requested-with'
}
// 请求拦截（配置发送请求的信息）
Axios.interceptors.request.use(function (config) {
  // 处理请求之前的配置
  return config
}, function (error) {
  // 请求失败的处理
  return Promise.reject(error)
})

export default {
  handleData (data, headers) {
    var newData = data
    if (data && store.state.user) {
      let user = store.state.user
      newData.user_id = user.id
      newData.user_shopid = user.shopid
      newData.user_position = user.position
      newData.token = user.token
      if (headers) {
        newData.enstr = headers.enstr
        newData.time = headers.time
      }
    }
    return newData
  },
  login (data) {
    return Axios.post(API.login, this.handleData(data))
  }
}
