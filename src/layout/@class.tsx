/*
 * @Description:
 * @Author: Sheep
 * @Date: 2022-01-19 12:09:53
 * @LastEditTime: 2022-01-28 13:04:40
 * @LastEditors: Sheep
 */
import React from 'react'
import { connect } from 'react-redux'
import { RootState } from 'typesafe-actions'
import { Layout, message } from 'antd'
import LeftNav from '../components/leftnav/@class'
import Header from '../components/header'
import { Redirect, RouteComponentProps } from 'react-router-dom'
import SwitchHeader from './components/SwitchHeader'
import CardContent from './components/CardContent'
import { getToken } from '../utils/_storage'
import CardFooter from './components/CardFooter'
import './Admin.less'

const { Sider, Content } = Layout
type IProps = ReturnType<typeof mapStateToProps> & RouteComponentProps

class Admin extends React.Component<IProps, {}> {
  childEl1: any
  childEl2: any
  constructor(props: IProps) {
    super(props)
    ;[this.childEl1, this.childEl2] = [React.createRef(), React.createRef()]
  }
  state = {
    showMenu: false,
  }
  onContractMenu = () => {
    if (document.documentElement.clientWidth <= 720)
      this.setState({ showMenu: true })
  }
  closeContractMenu = () => {
    if (document.documentElement.clientWidth <= 720)
      this.setState({ showMenu: false })
  }
  componentDidUpdate() {
    let _path: string = this.props.history.location.pathname
    if (_path.indexOf('/login') === -1) {
      if (this.state.showMenu) {
        ;[this.childEl1, this.childEl2].map((ele) =>
          ele.current.classList.add('show')
        )
      } else {
        ;[this.childEl1, this.childEl2].map((ele) =>
          ele.current.classList.remove('show')
        )
      }
    }
  }
  render() {
    const user = this.props.user
    const _token = getToken()
    if (user === undefined || user.id === undefined || _token === undefined) {
      message.info('token认证过期，请重新登录')
      return <Redirect to="/login"></Redirect>
    }
    return (
      <Layout style={{ minHeight: '100%' }}>
        <Header onContractMenu={this.onContractMenu}></Header>
        <Layout style={{ marginTop: '48px' }}>
          <Sider
            ref={this.childEl1}
            className="layoutside"
            style={{ background: 'none' }}
          >
            <LeftNav closeContractMenu={this.closeContractMenu} />
          </Sider>
          <Layout>
            <Content>
              <SwitchHeader />
              <CardContent />
            </Content>
            <CardFooter />
          </Layout>
        </Layout>
        <div
          onClick={this.closeContractMenu}
          ref={this.childEl2}
          className="mask"
        ></div>
      </Layout>
    )
  }
}

const mapStateToProps = (state: RootState) => ({
  user: state.user,
})

export default connect(mapStateToProps, {})(Admin)
