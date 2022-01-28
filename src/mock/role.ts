/*
 * @Description:
 * @Author: Sheep
 * @Date: 2022-01-26 11:24:26
 * @LastEditTime: 2022-01-26 11:47:49
 * @LastEditors: Sheep
 */
let roleListData = [
  {
    id: 1,
    name: 'toovk',
    roleId: 1,
    v: 1,
    createTime: new Date(),
    authTime: new Date(),
    menus: '/home,/user',
    authName: '超级管理员',
  },
  {
    id: 2,
    name: 'toovk',
    roleId: 2,
    v: 1,
    createTime: new Date(),
    authTime: new Date(),
    menus: '/home',
    authName: '游客',
  },
]
export const getRole = () => {
  return {
    data: roleListData,
    message: 'string',
    flag: true,
    code: 0,
  }
}
