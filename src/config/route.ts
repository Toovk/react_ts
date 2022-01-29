/*
 * @Description:
 * @Author: Sheep
 * @Date: 2022-01-21 15:36:18
 * @LastEditTime: 2022-01-29 12:23:11
 * @LastEditors: Sheep
 */
export interface MenuConfig {
  title: string
  key: string
  icon: string
  isPublic?: boolean
  children?: MenuConfig[]
  describe?: string
}

export const menuList: MenuConfig[] = [
  {
    title: '欢迎',
    key: '/home',
    icon: 'SmileOutlined',
    isPublic: true,
    describe: '这个页面所有人可见',
  },
  {
    title: '商品',
    key: '/categorys',
    icon: 'CrownOutlined',
    children: [
      {
        title: '商品分类',
        key: '/category',
        icon: '',
        describe: '这个页面只有 admin 权限能查看',
      },
    ],
  },
  {
    title: '用户管理',
    key: '/user',
    icon: 'TableOutlined',
  },
]
