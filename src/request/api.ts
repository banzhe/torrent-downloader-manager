import axios, {AxiosInstance, AxiosResponse, InternalAxiosRequestConfig} from 'axios'
import {useContainerMapStore} from '@/store/container/container'
import {ContainerTypeEnum} from '@/enums/containerTypeEnum'

declare module 'axios' {
  interface AxiosRequestConfig {
    __containerName?: string;
  }
}
const config = {
  timeout: 5000, // 设置请求超时时间
  headers: {
    'Content-Type': 'application/json',
  },
  __retryCount: 0,
}

const api: AxiosInstance = axios.create(config)

// 请求拦截器
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // 在发送请求之前做些什么
    // 可以在此处添加请求头、修改请求参数等
    console.log('请求拦截器:', config)
    const store = useContainerMapStore()
    const container = store.containerMap[config.__containerName || '']
    console.log(container)
    config.baseURL = container.url
    if (container?.type === ContainerTypeEnum.transmission) {
      config.headers['X-Transmission-Session-Id'] = container.transmissionSessionId
      if (container.username) {
        config.headers['Authorization'] = 'Basic '+btoa(`${container.username}:${container.password}`)
      }
    }
    return config
  },
  (error: any) => {
    // 处理请求错误
    console.error('请求错误:', error)
    return Promise.reject(error)
  }
)

// 响应拦截器
api.interceptors.response.use(
  (response: AxiosResponse) => {
    // 对响应数据做些什么
    console.log('响应拦截器:', response)
    return response
  },
  (error: any) => {
    // 处理响应错误
    console.error('响应错误:', error)
    if (error?.response?.status === 409) {
      const store = useContainerMapStore()
      const container = store.containerMap[error.config.__containerName]
      const newTransmissionSessionId = error.response.headers['x-transmission-session-id']
      if (newTransmissionSessionId) {
        container.transmissionSessionId = newTransmissionSessionId
      }
      if (!error.config.__retryCount) {
        error.config.__retryCount++
        error.headers['x-transmission-session-id'] = newTransmissionSessionId
        return api(error.config)
      }
    }
    return Promise.reject(error)
  }
)

export default api
