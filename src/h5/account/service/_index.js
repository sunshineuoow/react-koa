import axiosInstance from '../../../common/js/axios'

let URLS = {
  login: '/api/account/login', // 登录
  register: '/api/account/register' // 注册
}


export const login = (values) => {
  return axiosInstance.post(URLS.login, values)
}

export const register = (values) => {
  return axiosInstance.post(URLS.register, values)
}
