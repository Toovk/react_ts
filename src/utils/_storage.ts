/*
 * @Description:
 * @Author: Sheep
 * @Date: 2022-01-20 11:06:06
 * @LastEditTime: 2022-01-25 16:41:28
 * @LastEditors: Sheep
 */

import { UserModel } from '../pages/user/model'
import store from 'store'
import Cookie from 'js-cookie'

const USER_KEY = 'user_key'
export const xsrfHeaderName: string = 'Authorization'
const expireAt = new Date(new Date().getTime() + 60 * 60 * 1000 * 12)

export type LoginUser = Partial<
  UserModel & { menus: string[]; errorMsg: string }
>

/**
 * @name: 保存用户到本地储存
 * @test: test font
 * @param {LoginUser} user
 * @return {*}
 */
export const saveUser = (user: LoginUser) => {
  // localStorage.setItem(USER_KEY, JSON.stringify(user));
  store.set(USER_KEY, user)
  Cookie.set(xsrfHeaderName, 'Bearer ' + user.token, {
    expires: new Date(expireAt),
  })
}

/**
 * @name: 获取用户
 * @test: test font
 * @param {*} LoginUser
 * @return {*}
 */
export const getUser = (): LoginUser => {
  // return JSON.parse(localStorage.getItem(USER_KEY) ?? '{}');
  return store.get(USER_KEY) || {}
}

/**
 * @name: 获取token
 * @test: test font
 * @param {*}
 * @return {*}
 */
export const getToken = () => {
  return Cookie.get(xsrfHeaderName)
}
/**
 * @name: 移除用户
 * @test: test font
 * @param {*}
 * @return {*}
 */
export const logout = () => {
  // localStorage.removeItem(USER_KEY);
  store.clearAll()
  Cookie.remove(xsrfHeaderName)
}
