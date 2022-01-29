/*
 * @Description:
 * @Author: Sheep
 * @Date: 2022-01-21 12:07:01
 * @LastEditTime: 2022-01-29 12:22:54
 * @LastEditors: Sheep
 */
import { Avatar } from 'antd'
import React from 'react'
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

const Header = (props: HeaderProps) => {
  const open = (e: any) => {
    props.onContractMenu()
  }
  const logout = () => {
    props.logout()
  }
  return (
    <div className="header">
      <header className="global-header">
        <div className="header-left">
          <div className="header-left-href">
            <Link
              to="/home"
              onClick={() =>
                props.setHeadTitle({
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
            <div className="nav-icon" onClick={open}>
              <MenuIcon onClick={open} state={true} />
            </div>
          </div>
        </div>
        <div style={{ flex: '1 1 0%' }}></div>
        <div className="header-right" style={{ gap: '8px' }}>
          <a>
            <Avatar src={props.user.avatar} />
            <h2 style={{ fontSize: '13px' }}>{props.user.nickName}</h2>
            <div className="header-drop-down">
              <span onClick={logout}>
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

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Header))
