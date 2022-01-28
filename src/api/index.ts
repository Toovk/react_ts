/*
 * @Description:
 * @Author: Sheep
 * @Date: 2022-01-19 15:17:43
 * @LastEditTime: 2022-01-26 16:49:11
 * @LastEditors: Sheep
 */
import ajax from './ajax'
import { ResponseValue } from './Model'
import { ReqMethodEnum } from './ReqMethodEnum'
import { UserModel } from '../pages/user/model'
import { RoleModel } from '../pages/role/Model'

/**
 * @name: 登录接口
 * @test: test font
 * @param {string} name
 * @param {string} password
 * @return {*}
 */
export const reqLogin = (
  name: string,
  password: string
): Promise<ResponseValue<UserModel>> =>
  ajax<ResponseValue<UserModel>>(
    '/user/login',
    { name, password },
    ReqMethodEnum.POST
  )

/**
 * @name: reqUsers
 * @test: test font
 * @msg: 查询所有用户
 * @param {}
 * @return {Promise<ResponseValue<UserModel[]>>}
 */
export const reqUsers = (): Promise<ResponseValue<UserModel[]>> =>
  ajax<ResponseValue<UserModel[]>>('/user/getUsers', {}, ReqMethodEnum.GET)

/**
 * @name: reqRoles
 * @test: test font
 * @msg: 增加角色
 * @param {}
 * @return {Promise<ResponseValue<RoleModel[]>}
 */
export const reqRoles = (): Promise<ResponseValue<RoleModel[]>> =>
  ajax<ResponseValue<RoleModel[]>>('/role/getRoles', {}, ReqMethodEnum.GET)
