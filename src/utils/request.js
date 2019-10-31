import Vue from 'vue'
import axios from 'axios'
import store from '@/store'
import {
  VueAxios
} from './axios'
import notification from 'ant-design-vue/es/notification'
import {
  ACCESS_TOKEN
} from '@/store/mutation-types'

// 创建 axios 实例
const service = axios.create({
  baseURL: '/api', // api base_url
  timeout: 6000 // 请求超时时间
})

if (process.env.NODE_ENV === 'development') { // 开发环境
  service.defaults.baseURL = '/api'
} else if (process.env.NODE_ENV === 'production') { // 生产环境
  service.defaults.baseURL = window.location.port ? `${window.location.protocol}//${window.location.hostname}:
        ${window.location.port}` : `${window.location.protocol}//${window.location.hostname}`;
}

const err = (error) => {
  if (error && error.response) {
    const data = error.response.data
    const token = Vue.ls.get(ACCESS_TOKEN)
    if (error.response.status === 403) {
      notification.error({
        message: 'Forbidden',
        description: data.message
      })
    }
    if (error.response.status === 401 && !(data.result && data.result.isLogin)) {
      notification.error({
        message: 'Unauthorized',
        description: 'Authorization verification failed'
      })
      if (token) {
        store.dispatch('Logout').then(() => {
          setTimeout(() => {
            window.location.reload()
          }, 1500)
        })
      }
    }
  }
  return Promise.reject(error)
}

// request interceptor
service.interceptors.request.use(config => {
  const token = Vue.ls.get(ACCESS_TOKEN)
  const timestamp = (new Date()).valueOf()
  if (token) {
    config.headers['x-xsrf-token'] = token // 让每个请求携带自定义 token 请根据实际情况自行修改
  }
  config.url = `${config.url}?_=${timestamp}`
  return config
}, err)

// response interceptor
service.interceptors.response.use((response) => {
  if (response.status === 200 && response.data.code === 0) {
    return response
  } else {
    return Promise.reject(response)
    // err()
  }
}, err)

const installer = {
  vm: {},
  install (Vue) {
    Vue.use(VueAxios, service)
  }
}

export {
  installer as VueAxios,
  service as axios
}
