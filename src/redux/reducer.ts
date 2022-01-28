/*
 * @Description: 存数据和改变数据方法的reducer
 * @Author: Sheep
 * @Date: 2022-01-20 11:29:27
 * @LastEditTime: 2022-01-25 17:54:20
 * @LastEditors: Sheep
 */
import { combineReducers } from 'redux'
import { defaultSetting } from '../config/setting'
import { message } from 'antd'
import { getUser, logout, LoginUser } from '../utils/_storage'
import {
  SET_HEAD_TITLE,
  RECEIVE_USER,
  SHOW_ERROR_MSG,
  RESET_USER,
} from './action-types'

//管理头部标题
const initHeadTitle = '首页'

function routes(
  state: string = initHeadTitle,
  action: { type: any; payload: any }
) {
  switch (action.type) {
    case SET_HEAD_TITLE:
      document.title = `${action.payload.title} - @${defaultSetting.title}`
      return action.payload
    default:
      return state
  }
}

const initUser = getUser()
/**
 * @name: 管理登录用户
 * @test: test font
 * @param {*}
 * @return {*}
 */
function user(
  state: LoginUser = initUser,
  action: { type: any; payload: LoginUser }
) {
  switch (action.type) {
    case RECEIVE_USER:
      message.info(`${action.payload.nickName} welcome`)
      return action.payload
    case SHOW_ERROR_MSG:
      const errorMsg = action.payload.errorMsg
      message.error(`${errorMsg}`)
      return { ...state, errorMsg }
    case RESET_USER:
      logout()
      message.info(`退出成功`)
      return {}

    default:
      return state
  }
}

const rootReducer = combineReducers({
  routes,
  user,
})

export default rootReducer
