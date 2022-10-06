
  import axios, { AxiosRequestConfig, AxiosError, AxiosResponse } from 'axios'
  import nProgress from 'nprogress'
  import 'nprogress/nprogress.css'
  import {ElMessage} from 'element-plus'

  const isPro = process.env.NODE_ENV === 'production'

  const http = axios.create({
    baseURL: isPro ? '' : '/api',
    timeout: 10000
  })


  http.interceptors.request.use((config: AxiosRequestConfig) => {
    nProgress.start()
    const token = localStorage.getItem('token')
    if (token) {
      config.headers!['Authorization'] = token
    }
    return config
  }, (err: AxiosError) => {
    nProgress.done()
    return Promise.reject(err)
  })


  http.interceptors.response.use((res: AxiosResponse) => {
    nProgress.done()
    return res.data
  }, (err: AxiosError) => {
    nProgress.done()
    const status = err.response && res.response.status
    if (status === 400) {
      ElMessage.error('参数错误')
    }
    if (status === 401) {
      ElMessage.error('登录过期')
    }
    if (status === 403) {
      ElMessage.error('没有权限')
    }
    if (status === 404) {
      ElMessage.error('路径错误')
    }
    if (status === 500) {
      ElMessage.error('服务器错误')
    }
    if (status === 503) {
      ElMessage.error('服务器在维护')
    }
    return Promise.reject(err)
  })

  export default http
  