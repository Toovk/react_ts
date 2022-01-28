/*
 * @Description:
 * @Author: Sheep
 * @Date: 2022-01-19 15:19:33
 * @LastEditTime: 2022-01-25 18:04:51
 * @LastEditors: Sheep
 */

//自定义返回类型
export interface ResponseValue<T> {
  flag?: boolean
  code?: number
  message?: string
  data?: T
}
