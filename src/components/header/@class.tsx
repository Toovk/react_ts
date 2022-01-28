/*
 * @Description:
 * @Author: Sheep
 * @Date: 2022-01-21 12:07:01
 * @LastEditTime: 2022-01-27 16:34:27
 * @LastEditors: Sheep
 */
import { Avatar } from 'antd'
import React, { Component } from 'react'
import { RootState } from 'typesafe-actions'
import { connect } from 'react-redux'
import { Link, RouteComponentProps, withRouter } from 'react-router-dom'
import './index.less'
import { bindActionCreators } from 'redux'
import { setHeadTitle, logout } from '../../redux/actions'
import { LogoutOutlined } from '@ant-design/icons'
import { defaultSetting } from '../../config/setting'
import MenuIcon from '../menuicon'

interface AdminProps {
  onContractMenu: Function
}

type HeaderProps = RouteComponentProps &
  ReturnType<typeof mapDispatchToProps> &
  ReturnType<typeof mapStateToProps> &
  AdminProps

const mapStateToProps = (state: RootState) => ({ user: state.user })
const mapDispatchToProps = (dispatch: any) =>
  bindActionCreators(
    {
      setHeadTitle: setHeadTitle,
      logout: logout,
    },
    dispatch
  )
class Header extends Component<HeaderProps, {}> {
  logout = () => {
    this.props.logout()
  }
  open = (e: any) => {
    this.props.onContractMenu()
  }
  state = {
    whereShow: true,
  }
  render() {
    return (
      <div className="header">
        <header className="global-header">
          <div className="header-left">
            <div className="header-left-href">
              <Link
                to="/home"
                onClick={() =>
                  this.props.setHeadTitle({
                    title: '欢迎',
                    key: '/home',
                    icon: 'SmileOutlined',
                    isPublic: true,
                    describe: '这个页面所有人可见',
                  })
                }
              >
                <img
                  src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg"
                  alt="logo"
                />
                <h1 className="header-title">{defaultSetting.systemName}</h1>
              </Link>
              <div className="nav-icon" onClick={this.open}>
                <MenuIcon onClick={this.open} state={this.state} />
              </div>
            </div>
          </div>
          <div style={{ flex: '1 1 0%' }}></div>
          <div className="header-right" style={{ gap: '8px' }}>
            <a>
              <Avatar src={this.props.user.avatar} />
              <h2 style={{ fontSize: '13px' }}>{this.props.user.nickName}</h2>
              <div className="header-drop-down">
                <span onClick={this.logout}>
                  <LogoutOutlined style={{ paddingRight: '10px' }} />
                  退出登录
                </span>
              </div>
            </a>
          </div>
        </header>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Header))
