/*
 * @Description:
 * @Author: Sheep
 * @Date: 2022-01-21 11:59:41
 * @LastEditTime: 2022-01-28 14:55:45
 * @LastEditors: Sheep
 */
import { Divider, Menu, Switch } from 'antd'
import { Link, RouteComponentProps, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { RootState } from 'typesafe-actions'
import { setHeadTitle } from '../../redux/actions'
import { menuList, MenuConfig } from '../../config/route'
import * as Icon from '@ant-design/icons'
import { LoginUser } from '../../utils/_storage'
import React, { Component } from 'react'
import './index.less'
import MenuIcon from '../menuicon'

const { SubMenu } = Menu
const dispatchProps = { setHeadTitle }
const mapStateToProps = (state: RootState) => ({
  user: state.user,
  routes: state.routes,
})
interface AdminProps {
  closeContractMenu: Function
}
type LeftNavProps = RouteComponentProps &
  typeof dispatchProps &
  ReturnType<typeof mapStateToProps> &
  AdminProps
let count = 0
class LeftNav extends Component<LeftNavProps, {}> {
  menuNodes: JSX.Element[] = []
  openKey: string = ''
  constructor(props: LeftNavProps) {
    super(props)
    this.menuNodes = this.getMenuNodes2(menuList)
    this.getOpenKey(menuList)
    console.log(`constructor 第${count}次`)
    count++
  }
  /**
   * @name: 遍历查找 > 相等的路径则显示
   * @test: test font
   * @param {MenuConfig} menuList
   * @return {*}
   */
  getOpenKey = (menuList: MenuConfig[]) => {
    const path: string = this.props.location.pathname
    return menuList.forEach((item) => {
      if (item.children) {
        const cItem = item.children.find(
          (cItem) => path.indexOf(cItem.key) === 0
        )
        if (cItem) {
          this.openKey = item.key
        }
      }
    })
  }

  /**
   * @name: 遍历routes生成jsx
   * @test: test font
   * @param {MenuConfig} menuList
   * @return {*}
   */
  getMenuNodes2 = (menuList: MenuConfig[]): JSX.Element[] => {
    const path = this.props.location.pathname
    return menuList.reduce((pre: JSX.Element[], item: any): JSX.Element[] => {
      if (this.hasAuth(item)) {
        if (!item.children) {
          if (item.key === path || path.indexOf(item.key) === 0) {
            this.props.setHeadTitle(item)
          }
          pre.push(
            <Menu.Item
              style={{ marginTop: '0' }}
              key={item.key}
              icon={item.icon ? React.createElement(Icon[item.icon]) : ''}
            >
              <Link to={item.key} onClick={() => this.props.setHeadTitle(item)}>
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
              {this.getMenuNodes2(item.children)}
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
  private hasAuth = (node: MenuConfig): boolean => {
    const user: LoginUser = this.props.user
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
  state = {
    theme: 'light',
    current: '1',
    whereShow: false,
    _open:
      document.documentElement.clientWidth > 993 ||
      document.documentElement.clientWidth < 720
        ? false
        : true,
    _show: false,
    _windowOpen: false,
  }

  changeTheme = (value: any) => {
    this.setState({
      theme: value ? 'dark' : 'light',
    })
    let $header = document.querySelector('.header')
    $header.className = `${
      $header.getAttribute('class').indexOf('dark') > -1
        ? 'header'
        : 'header dark'
    }`
  }
  handleClick = (e: { key: any }) => {
    this.setState({
      current: e.key,
    })
    if (
      document.documentElement.clientWidth < 993 &&
      document.documentElement.clientWidth > 720 &&
      this.state._show
    )
      this.handleClose()
  }
  handleClose = () => {
    if (
      document.documentElement.clientWidth < 993 &&
      document.documentElement.clientWidth > 720
    ) {
      let $layoutside = document.querySelector('.layoutside')
      if (this.state._show) {
        $layoutside.classList.remove('show')
        this.setState({ _show: false })
      } else {
        $layoutside.classList.add('show')
        this.setState({ _show: true })
      }
    } else if (document.documentElement.clientWidth > 993) {
      if (this.state._windowOpen) {
        this.setState({ _windowOpen: false })
      } else {
        this.setState({ _windowOpen: true })
      }
    } else this.props.closeContractMenu()
  }
  handleResize = (e: any) => {
    let e_width = e.target.innerWidth
    if (e_width > 993 || e_width < 720) {
      this.setState({
        _open: false,
      })
    } else {
      this.setState({
        _open: true,
      })
    }
  }
  componentDidMount() {
    console.log(`componentDidMount 第${count}次`)
    count++
    window.addEventListener('resize', this.handleResize.bind(this)) //监听窗口大小改变
  }
  componentWillUnmount() {
    this.setState = () => false
    window.removeEventListener('resize', this.handleResize.bind(this))
  }
  render() {
    let path = this.props.location.pathname
    console.log(`render 第${count}次`)
    count++
    return (
      <div className="leftnav">
        <div style={{ flex: '1 0 0%', overflow: 'hidden' }}>
          <Menu
            style={{ width: '100%', minHeight: '100%' }}
            selectedKeys={[path]}
            defaultOpenKeys={[this.openKey]}
            mode={
              (this.state._open && !this.state._show) || this.state._windowOpen
                ? 'vertical'
                : 'inline'
            }
            theme={this.state.theme === 'light' ? 'light' : 'dark'}
            onClick={this.handleClick}
          >
            {this.menuNodes}
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
              checked={this.state.theme === 'dark'}
              onChange={this.changeTheme}
              checkedChildren="Dark"
              unCheckedChildren="Light"
              className="left-nav-switch"
            />
            <div className="action-fold" onClick={this.handleClose}>
              <a className="action-fold-a">
                <MenuIcon state={this.state} />
              </a>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, dispatchProps)(withRouter(LeftNav))
