/*
 * @Description:
 * @Author: Sheep
 * @Date: 2022-01-28 12:46:34
 * @LastEditTime: 2022-01-28 17:08:24
 * @LastEditors: Sheep
 */
import React, { useEffect, useState } from 'react'
import { Divider, Menu, Switch } from 'antd'
import { Link, RouteComponentProps, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { RootState } from 'typesafe-actions'
import { setHeadTitle } from '../../redux/actions'
import { menuList, MenuConfig } from '../../config/route'
import * as Icon from '@ant-design/icons'
import { LoginUser } from '../../utils/_storage'
import './index.less'
import MenuIcon from '../menuicon'
const { SubMenu } = Menu
interface AdminProps {
  closeContractMenu: Function
}
type LeftNavProps = RouteComponentProps &
  typeof dispatchProps &
  ReturnType<typeof mapStateToProps> &
  AdminProps
const LeftNav = (props: LeftNavProps) => {
  // let path = props.location.pathname
  let openKey: string = ''
  const [theme, setTheme] = useState<string>('light')
  const [_open, set_open] = useState<boolean>(
    document.documentElement.clientWidth > 993 ||
      document.documentElement.clientWidth < 720
      ? false
      : true
  )
  const [menuNodes, setmenuNodes] = useState<JSX.Element[]>()
  const [_show, set_show] = useState<boolean>(false)
  const [_windowOpen, set_windowOpen] = useState<boolean>(false)

  /**
   * @name: 遍历查找 > 相等的路径则显示
   * @test: test font
   * @param {MenuConfig} menuList
   * @return {*}
   */
  // const getOpenKey = (menuList: MenuConfig[]) => {
  //   const path: string = props.location.pathname
  //   return menuList.forEach((item) => {
  //     if (item.children) {
  //       const cItem = item.children.find(
  //         (cItem) => path.indexOf(cItem.key) === 0
  //       )
  //       if (cItem) {
  //         openKey = item.key
  //       }
  //     }
  //   })
  // }
  // getOpenKey(menuList)

  /**
   * @name: 遍历routes生成jsx
   * @test: test font
   * @param {MenuConfig} menuList
   * @return {*}
   */
  const getMenuNodes2 = (menuList: MenuConfig[]): JSX.Element[] => {
    const path = props.location.pathname
    return menuList.reduce((pre: JSX.Element[], item: any): JSX.Element[] => {
      if (hasAuth(item)) {
        if (!item.children) {
          if (item.key === path || path.indexOf(item.key) === 0) {
            props.setHeadTitle(item)
          }
          pre.push(
            <Menu.Item
              style={{ marginTop: '0' }}
              key={item.key}
              icon={item.icon ? React.createElement(Icon[item.icon]) : ''}
            >
              <Link to={item.key} onClick={() => props.setHeadTitle(item)}>
                {item.title}
              </Link>
            </Menu.Item>
          )
        } else {
          pre.push(
            <SubMenu
              key={item.key}
              title={item.title}
              icon={React.createElement(Icon[item.icon])}
            >
              {getMenuNodes2(item.children)}
            </SubMenu>
          )
        }
      }
      return pre
    }, [])
  }

  /**
   * @name: 判断权限
   * @test: test font
   * @param {MenuConfig} node
   * @return {*}
   */
  const hasAuth = (node: MenuConfig): boolean => {
    const user: LoginUser = props.user
    if (
      user.name === 'admin' ||
      node.isPublic ||
      (user.menus ?? []).indexOf(node.key) !== -1
    ) {
      return true
    } else if (node.children) {
      return !!node.children.find((child) => {
        return (user.menus ?? []).indexOf(child.key) !== -1
      })
    }
    return false
  }

  const changeTheme = (value: any) => {
    setTheme(value ? 'dark' : 'light')
    let $header = document.querySelector('.header')
    $header.className = `${
      $header.getAttribute('class').indexOf('dark') > -1
        ? 'header'
        : 'header dark'
    }`
  }
  const handleClick = (e: { key: any }) => {
    if (
      document.documentElement.clientWidth < 993 &&
      document.documentElement.clientWidth > 720 &&
      _show
    )
      handleClose()
  }
  const handleClose = () => {
    if (
      document.documentElement.clientWidth < 993 &&
      document.documentElement.clientWidth > 720
    ) {
      let $layoutside = document.querySelector('.layoutside')
      if (_show) {
        $layoutside.classList.remove('show')
        set_show(false)
      } else {
        $layoutside.classList.add('show')
        set_show(true)
      }
    } else if (document.documentElement.clientWidth > 993) {
      if (_windowOpen) {
        set_windowOpen(false)
      } else {
        set_windowOpen(true)
      }
    } else props.closeContractMenu()
  }
  useEffect(() => {
    setmenuNodes(getMenuNodes2(menuList))
    const handleResize = (e: any) => {
      let e_width = e.target.innerWidth
      if (e_width > 993 || e_width < 720) {
        set_open(false)
      } else {
        set_open(true)
      }
    }
    window.addEventListener('resize', handleResize)
    return () => {
      console.log('销毁')
      window.removeEventListener('resize', handleResize)
    }
  }, [])
  return (
    <div className="leftnav">
      <div style={{ flex: '1 0 0%', overflow: 'hidden' }}>
        <Menu
          style={{ width: '100%', minHeight: '100%' }}
          selectedKeys={[props.location.pathname]}
          defaultOpenKeys={[openKey]}
          mode={(_open && !_show) || _windowOpen ? 'vertical' : 'inline'}
          theme={theme === 'light' ? 'light' : 'dark'}
          onClick={handleClick}
        >
          {menuNodes}
        </Menu>
        <Divider className="nav-divider" />
        <div className="switchTheme">
          <Switch
            style={{
              width: '60px',
              fontWeight: '500',
              position: 'absolute',
              right: '10px',
            }}
            checked={theme === 'dark'}
            onChange={changeTheme}
            checkedChildren="Dark"
            unCheckedChildren="Light"
            className="left-nav-switch"
          />
          <div className="action-fold">
            <a className="action-fold-a" onClick={handleClose}>
              <MenuIcon
                theme={theme}
                state={false}
                _open={_open}
                _show={_show}
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

const dispatchProps = { setHeadTitle }
const mapStateToProps = (state: RootState) => ({
  user: state.user,
  routes: state.routes,
})
export default connect(mapStateToProps, dispatchProps)(withRouter(LeftNav))
