// 校验函数

export const validatePassword = () => {
  return (rule, value, callback) => {
    value.length >= 6 ? callback() : callback(new Error('密码长度不能少于6位'))
  }
}
