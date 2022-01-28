/*
 * @Description:
 * @Author: Sheep
 * @Date: 2022-01-21 17:39:28
 * @LastEditTime: 2022-01-22 00:19:27
 * @LastEditors: Sheep
 */
import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import Home from '../../pages/home/Home'
import Category from '../../pages/category/Category'
import User from '../../pages/user/User'
import NotFound from '../../pages/notfound/notfound'
import { Card } from 'antd'
import './CardContent.less'

const CardContent = () => {
  return (
    <>
      <Card className="content-card">
        <Switch>
          <Redirect exact={true} from="/" to="/home"></Redirect>
          <Route path="/home" component={Home}></Route>
          <Route path="/category" component={Category}></Route>
          <Route path="/user" component={User}></Route>
          <Route component={NotFound}></Route>
        </Switch>
      </Card>
    </>
  )
}

export default CardContent
