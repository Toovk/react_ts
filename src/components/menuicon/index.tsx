/*
 * @Description: menuIcon
 * @Author: Sheep
 * @Date: 2022-01-24 17:35:56
 * @LastEditTime: 2022-01-28 15:11:48
 * @LastEditors: Sheep
 */
import React from 'react'
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons'

const MenuIcon = (props: any) => {
  return props.state ? (
    <>
      <MenuUnfoldOutlined
        className="header-menu-icon"
        style={{
          fontSize: '22px',
          marginLeft: '15px',
        }}
      />
    </>
  ) : !props._open || props._show ? (
    <>
      <MenuFoldOutlined
        className="action-fold-icon"
        style={{
          color: props.theme === 'dark' ? '#fff' : '#000',
          fontSize: '16px',
        }}
      />
    </>
  ) : (
    <>
      <MenuUnfoldOutlined
        className="action-fold-icon"
        style={{
          color: props.theme === 'dark' ? '#fff' : '#000',
          fontSize: '16px',
        }}
      />
    </>
  )
}

export default MenuIcon
