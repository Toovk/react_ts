import { reqLogin } from '../api'
import {
  RECEIVE_USER,
  RESET_USER,
  SET_HEAD_TITLE,
  SHOW_ERROR_MSG,
} from './action-types'
import { saveUser, LoginUser } from '../utils/_storage'
import { createAction } from 'typesafe-actions'

/*
 * @Descripttion: 包含多个action creator的函数模块
 * @version:
 * @Author: MFine
 * @Date: 2021-01-27 23:38:20
 * @LastEditors: Sheep
 * @LastEditTime: 2021-02-02 23:48:19
 */
export const setHeadTitle = createAction(SET_HEAD_TITLE)<any>()

export const receiveUser = createAction(RECEIVE_USER)<LoginUser>()

export const showErrorMsg = createAction(SHOW_ERROR_MSG)<LoginUser>()

export const logout = createAction(RESET_USER)<void>()

export const login =
  (username: string, password: string) => async (dispatch: any) => {
    const result = await reqLogin(username, password)
    if (result.code === 0) {
      const user: any = result.data
      let _user = {
        id: user.id ?? -1,
        name: user.name ?? '',
        roleId: user.roleId ?? '',
        nickName: user.nickName ?? '',
        avatar: user.avatar ?? '',
        token: user.token ?? '',
      }
      if (user) {
        saveUser(_user)
        dispatch(receiveUser(_user))
      }
    } else {
      dispatch(showErrorMsg({ errorMsg: `${result.message}` }))
    }
  }
