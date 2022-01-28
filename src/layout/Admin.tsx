/*
 * @Description:
 * @Author: Sheep
 * @Date: 2022-01-19 12:09:53
 * @LastEditTime: 2022-01-28 16:20:03
 * @LastEditors: Sheep
 */
import React, { useEffect, useState } from 'react'
import { Layout, message } from 'antd'
import LeftNav from '../components/leftnav'
import Header from '../components/header'
import { RootState } from 'typesafe-actions'
import { Redirect, RouteComponentProps } from 'react-router-dom'
import { getToken } from '../utils/_storage'
import SwitchHeader from './components/SwitchHeader'
import CardContent from './components/CardContent'
import CardFooter from './components/CardFooter'
import { connect } from 'react-redux'
import './Admin.less'

const { Sider, Content } = Layout
type IProps = ReturnType<typeof mapStateToProps> & RouteComponentProps

const Admin = (props: IProps) => {
  const [showMenu, setshowMenu] = useState<boolean>(false)
  let childEl1: any, childEl2: any
  ;[childEl1, childEl2] = [React.createRef(), React.createRef()]

  const onContractMenu = () => {
    if (document.documentElement.clientWidth <= 720) {
      setshowMenu(true)
    }
  }
  const closeContractMenu = () => {
    if (document.documentElement.clientWidth <= 720) {
      setshowMenu(false)
    }
  }

  useEffect(() => {
    let _path: string = props.history.location.pathname
    if (_path.indexOf('/login') === -1) {
      if (showMenu) {
        ;[childEl1, childEl2].map((ele) => ele.current.classList.add('show'))
      } else {
        ;[childEl1, childEl2].map((ele) => ele.current.classList.remove('show'))
      }
    }
    return () => {
      _path = ''
    }
  }, [showMenu])
  return props.user === undefined || getToken() === undefined ? (
    <Redirect to="/login"></Redirect>
  ) : (
    <Layout style={{ minHeight: '100%' }}>
      <Header onContractMenu={onContractMenu}></Header>
      <Layout style={{ marginTop: '48px' }}>
        <Sider
          ref={childEl1}
          className="layoutside"
          style={{ background: 'none' }}
        >
          <LeftNav closeContractMenu={closeContractMenu} />
        </Sider>
        <Layout>
          <Content>
            <SwitchHeader />
            <CardContent />
          </Content>
          <CardFooter />
        </Layout>
      </Layout>
      <div onClick={closeContractMenu} ref={childEl2} className="mask"></div>
    </Layout>
  )
}
const mapStateToProps = (state: RootState) => ({
  user: state.user,
})
export default connect(mapStateToProps, {})(Admin)
