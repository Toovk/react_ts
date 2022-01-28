/*
 * @Description: 统一暴露数据的store
 * @Author: Sheep
 * @Date: 2022-01-20 11:27:40
 * @LastEditTime: 2022-01-20 11:34:16
 * @LastEditors: Sheep
 */

import { createStore, applyMiddleware, compose } from 'redux'

import thunk from 'redux-thunk'
import reducer from './reducer'

const composeEnhancers =
  (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export default createStore(reducer, composeEnhancers(applyMiddleware(thunk)))
