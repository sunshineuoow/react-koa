import Axios from 'axios'
import { message } from 'antd'

const axiosInstance = Axios.create()

axiosInstance.interceptors.response.use(res => {
  if (res.data.r) {
    return res.data.data
  } else {
    if (res.data.msg) {
      message.error(res.data.msg, 2)
    } else {
      return Promise.reject(res)
    }
  }
})

export default axiosInstance
