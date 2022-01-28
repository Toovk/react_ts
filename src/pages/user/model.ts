/*
 * @Description:
 * @Author: Sheep
 * @Date: 2022-01-19 15:20:36
 * @LastEditTime: 2022-01-25 17:54:50
 * @LastEditors: Sheep
 */
export interface UserModel {
  id?: number
  password?: string
  name?: string
  nickName?: string
  phone?: string
  email?: string
  roleId?: string
  createTime?: string
  __v?: number
  avatar?: any
  token?: string
}
