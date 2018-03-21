import axiosInstance from '../../../common/js/axios'

let URLS = {
  user_info: '/api/user'
}

export const getUserInfo = () => {
  return axiosInstance.get(URLS.user_info)
}
