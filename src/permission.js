// 全局路由前置守卫
// 可以写到router的index.js上，也可以另起一个文件，然后main.js中导入即可
import router from '@/router'
import store from '@/store'

// 白名单（用户未登录时可进入的页面）
const whiteList = ['/login']

router.beforeEach((to, from, next) => {
  // 判断：存在token，不允许访问login页
  // 不存在token，可跳转到白名单
  if (store.getters.token) {
    if (to.path === '/login') {
      next('/')
    } else {
      // 存在token且不是去登录页，那判断用户信息是否存在
      // 不存在则获取用户信息
      next()
    }
  } else {
    // 可进入白名单
    if (whiteList.includes(to.path)) {
      next()
    } else {
      next('/login')
    }
  }
})
