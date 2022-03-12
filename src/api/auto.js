import Axios from '@/utils/http'
const baseUrl = ''
// headers: {
//   'Content-Type':
//   'application/x-www-form-urlencoded;'
// }
export const Login = (obj) => Axios.post(`${baseUrl}/auth/login`, obj) // 登录
export const Logout = () => Axios.post(`${baseUrl}/auth/logout`) // 登出
export const Register = (obj) => Axios.post(`${baseUrl}/auth/register`, obj) // 注册
export const addTempCookie = (obj) => Axios.post(`${baseUrl}/temp`, obj) // 上传cookie
export const addCookie = (obj) => Axios.post(`${baseUrl}/api/cookie`, obj) // 上传cookie
export const getNodeList = () => Axios.get(`${baseUrl}/api/node`)
export const userInfo = () => Axios.get(`${baseUrl}/api/user`) // y用户信息
export const updateUser = (obj) => Axios.put(`${baseUrl}/api/user`, obj) // 修改用户信息
export const getCookieList = () => Axios.get(`${baseUrl}/api/getCookie`) // 获取已上传数据
export const addWsCookie = (obj) => Axios.post(`${baseUrl}/api/manual`, obj) // 手动输入wskey
