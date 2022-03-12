// 处理用户相关的内容
import { login } from '@/api/sys'
import { setItem, getItem } from '@/utils/storage'
import { TOKEN } from '@/constant'
import { ElMessage } from 'element-plus'
import router from '@/router'
import md5 from 'md5'

export default {
  namespaced: true,
  state: () => ({
    token: getItem(TOKEN) || '',
    userInfo: {}
  }),
  mutations: {
    setToken(state, token) {
      state.token = token
      // 保存到本地缓存
      setItem(TOKEN, token)
    }
  },
  actions: {
    // 登录请求动作
    login({ commit }, userInfo) {
      const { username, password } = userInfo
      return new Promise((resolve, reject) => {
        login({
          username,
          password: md5(password)
        })
          .then((res) => {
            commit('setToken', res.token)
            // 跳转
            router.push('/')
            ElMessage.success('登录成功')
            resolve()
          })
          .catch((err) => {
            reject(err)
          })
      })
    }
  }
}
