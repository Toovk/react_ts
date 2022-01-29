/*
 * @Description:
 * @Author: Sheep
 * @Date: 2022-01-18 18:55:06
 * @LastEditTime: 2022-01-29 14:31:39
 * @LastEditors: Sheep
 */
import React from 'react'
import 'antd/dist/antd.less'
import './mock/index'
import Login from './pages/login/Login'
import Admin from './layout/Admin'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

const App: React.FC<{}> = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/login" component={Login}></Route>
        <Route path="/" component={Admin}></Route>
      </Switch>
    </BrowserRouter>
  )
}

export default App
