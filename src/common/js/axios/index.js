import Axios from 'axios'
import {message} from 'antd'

const axiosInstance = Axios.create()

axiosInstance.interceptors.response.use(res => {
  if (res.data.r) {
    return res.data.data
  } else {
    if (res.data.msg) {
      let errorHandler
      if (res.data.code === 4) errorHandler = () => {window.location.href = '/h5/account/index'}
      message.error(res.data.msg, 2, errorHandler)
    } else {
      return Promise.reject(res)
    }
  }
})

export default axiosInstance
