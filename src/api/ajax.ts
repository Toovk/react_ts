/*
 * @Description:
 * @Author: Sheep
 * @Date: 2022-01-19 15:08:33
 * @LastEditTime: 2022-01-26 16:48:55
 * @LastEditors: Sheep
 */
import axios from 'axios'
import { ReqMethodEnum } from './ReqMethodEnum'
import { xsrfHeaderName, getToken } from '../utils/_storage'
import { message } from 'antd'

const instance = axios.create({
  baseURL: '/api',
  timeout: 10000,
})

/**
 * @name: 请求拦截
 * @test: test font
 * @param {*}
 * @return {*}
 */
instance.interceptors.request.use(
  (config) => {
    const { url } = config
    config.headers['content-Type'] = 'application/json;charset=UTF-8'
    if (getToken()) config.headers[xsrfHeaderName] = getToken()
    if (url.indexOf('login') === -1 && !getToken()) {
      return message.info('token认证过期，请重新登录')
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)
/**
 * @name: 返回拦截
 * @test: test font
 * @param {*}
 * @return {*}
 */
// instance.interceptors.response.use(
//   (response) => {
//     const res = response.data
//     if (!response.status.toString().startsWith('2') || res.code === -1) {
//       throw new Error(
//         `请求错误，错误码为 ${response.status}，msg： ${res.message}`
//       )
//     }
//     return response
//   },
//   (error) => {
//     const err = { errCode: -110, errMsg: error.message || 'Error' }
//     return Promise.resolve(err)
//   }
// )

/**
 * @name: ajax
 * @test: test font
 * @param {url: string, data: {}, method: ReqMethodEnum}
 * @return {*}
 */
export default function ajax<T>(
  url: string,
  data: {} = {},
  method: ReqMethodEnum = ReqMethodEnum.GET
): Promise<T> {
  return new Promise((resolve, rejects) => {
    let promise: Promise<T>
    switch (method) {
      case ReqMethodEnum.GET:
        promise = instance.get(url, { params: data })
        break
      case ReqMethodEnum.POST:
        promise = instance.post(url, data)
        break
      case ReqMethodEnum.PUT:
        promise = instance.put(url, data)
        break
      case ReqMethodEnum.DELETE:
        promise = instance.delete(url, { data })
        break
      default:
        promise = instance.get(url, { params: data })
        break
    }
    promise
      .then((response: any) => {
        resolve(response.data)
      })
      .catch((error) => {
        console.error('请求出错：' + error.message)
      })
  })
}
