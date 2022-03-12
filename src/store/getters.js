// 使用计算属性快捷访问store的state值

const getters = {
  token(state) {
    return state.user.token
  }
}
export default getters
