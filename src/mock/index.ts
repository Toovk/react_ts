/*
 * @Description:
 * @Author: Sheep
 * @Date: 2022-01-19 17:16:39
 * @LastEditTime: 2022-01-26 11:29:05
 * @LastEditors: Sheep
 */

import Mock from 'mockjs'
import { Constant } from './_utils'
import { checkLogin, getUser } from './user'
import { getRole } from './role'

const { ApiPrefix } = Constant

Mock.setup({
  timeout: 1000, // 设置延迟响应，模拟向后端请求数据
})

Mock.mock(`${ApiPrefix}/user/login`, 'post', checkLogin)
Mock.mock(`${ApiPrefix}/user/getUsers`, 'get', getUser)
Mock.mock(`${ApiPrefix}/role/getRoles`, 'get', getRole)
