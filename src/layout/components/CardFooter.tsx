/*
 * @Description:
 * @Author: Sheep
 * @Date: 2022-01-22 17:18:16
 * @LastEditTime: 2022-01-22 17:21:24
 * @LastEditors: Sheep
 */
import React from 'react'
import { defaultSetting } from '../../config/setting'
import { CopyrightOutlined } from '@ant-design/icons'
import { Layout } from 'antd'

const { Footer } = Layout
const CardFooter = () => {
  return (
    <Footer style={{ textAlign: 'center', color: 'rgba(0,0,0,.45)' }}>
      <CopyrightOutlined />
      <span style={{ marginLeft: '10px' }}>{defaultSetting.footer}</span>
    </Footer>
  )
}

export default CardFooter
