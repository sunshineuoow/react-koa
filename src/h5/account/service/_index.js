import Axios from 'axios'
import {message} from 'antd'

const axiosInstance = Axios.create()

axiosInstance.interceptors.response.use(res => {
  if (res.data.r) {
    return res.data.data
  } else {
    if (res.data.msg) {
      message.error(res.data.msg)
    } else {
      return Promise.reject(res)
    }
  }
})

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
