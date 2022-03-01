import request from '@/utils/request'

/**
 * 登录
 * return Promise
 * */
export const login = data => {
  return request({
    url: '/sys/login',
    method: 'POST',
    data
  })
}
