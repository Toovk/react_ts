/*
 * @Description:
 * @Author: Sheep
 * @Date: 2022-01-19 17:20:28
 * @LastEditTime: 2022-01-26 14:22:37
 * @LastEditors: Sheep
 */

import { randomAvatar } from './_utils'
import Mock from 'mockjs'

const adminUsers = [
  {
    id: 1,
    name: 'admin',
    password: '123456',
    roleId: 1,
    nickName: '超级管理员',
  },
  {
    id: 2,
    name: 'guest',
    password: '123456',
    roleId: 2,
    nickName: '游客',
  },
]

let usersListData = Mock.mock({
  'data|80-100': [
    {
      id: '@id',
      name: /^100\d{1}$/,
      phone: /^1[34578]\d{9}$/,
      password: '123456',
      'age|11-30': 1,
      roleId: /^[12]$/,
      v: 1,
      address: '@county(true)',
      isMale: '@boolean',
      email: '@email',
      createTime: '@datetime()',
      nickName: '@cname',
      avatar() {
        return randomAvatar()
      },
    },
  ],
})

/**
 * @name: 随机token
 * @test: test font
 * @param {any} payload
 * @return {*}
 */
const token =
  '20eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NTQzLCJpYXQiOjE2NDI4MzgwODh9.-AZ1lZun7ESyJt3pbC-nQ8XwK2HYQKTNErIKlXS-flc'
/**
 * @name: 登录验证
 * @test: test font
 * @param {any} req
 * @return {*}
 */
export const checkLogin = (req: any) => {
  const { name, password } = JSON.parse(req.body)
  const user = adminUsers.filter((item: any) => item.name === name)
  if (user.length > 0 && user[0].password === password) {
    return {
      data: {
        createTime: '2022-01-19T10:19:39.528Z',
        email: 'sheepggly9911@163.com',
        id: 1,
        name: user[0].name,
        nickName: user[0].nickName,
        password: user[0].password,
        phone: '133********',
        roleId: user[0].roleId,
        v: 1,
        avatar: randomAvatar(),
        token: token,
      },
      flag: true,
      message: 'string',
      code: 0,
    }
  } else {
    return {
      flag: true,
      message: '请检查用户是否不存在，或者密码输入错误',
      code: -1,
    }
  }
}
export const getUser = () => {
  return {
    data: usersListData.data,
    message: 'string',
    flag: true,
    code: 0,
  }
}
