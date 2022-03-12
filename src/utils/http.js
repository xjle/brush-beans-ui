import axios from 'axios'
// import store from '../store'

// 创建 axios 实例
const Axios = axios.create({
  baseURL: 'https://jd.negev.cn:5551/',
  timeout: 3000,
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json'
  }
})
//
// 携带cookie
Axios.defaults.withCredentials = true

// store && store.state
const flag = true
if (flag) {
  // 请求拦截器
  Axios.interceptors.request.use(
    (config) => {
      // const brushToken = localStorage.getItem('brushToken')
      // if (brushToken) {
      //   config.headers.Token = brushToken
      // }
      return config
    },
    (error) => {
      return Promise.reject(error)
    }
  )

  // 响应拦截器
  Axios.interceptors.response.use(
    (response) => {
      // const brushToken = localStorage.getItem('brushToken')
      // if (response.data.code === 401) {
      //   if (brushToken) {
      //     localStorage.removeItem('brushToken')
      //     store.commit('SET_LOGIN', false)
      //   }
      // } else {
      //   store.commit('SET_LOGIN', true)
      //   // localStorage.setItem('brushToken', '') // 设置登录状态
      // }
      return response
    },
    (error) => {
      // 响应错误
      // if (error.response.status) {
      //   // 根据自定义状态码添加判断
      //   return Promise.reject(error.response);
      // }
      return Promise.reject(error)
    }
  )
}

export default Axios
