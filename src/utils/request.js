import axios from 'axios'
import { ElMessage } from 'element-plus'

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000
})

// 请求拦截器
service.interceptors.request.use(
  function (config) {
    config.headers.icode = 'C15FB7175BFDE08E'
    return config
  },
  function (err) {
    ElMessage.error(err.message)
    return Promise.reject(err)
  }
)

// 响应拦截器
service.interceptors.response.use(
  function (response) {
    const { success, message, data } = response.data
    if (success) {
      return data
    } else {
      ElMessage.error(message)
      return Promise.reject(new Error(message))
    }
  },
  function (error) {
    // 服务器在返回数据时，会通过特定的状态码通知前端
    // 当前端收到特定的状态码，表示遇到了特定的状态，这里特指为 token 过期
    // 此时前端做登出处理（401状态码）
    ElMessage.error(error.message)
    return Promise.reject(error)
  }
)

export default service
