/*
 * @Description:
 * @Author: Sheep
 * @Date: 2022-01-21 22:29:00
 * @LastEditTime: 2022-01-26 15:53:16
 * @LastEditors: Sheep
 */
import React from 'react'
import { PageHeader, Typography } from 'antd'
import { RootState } from 'typesafe-actions'
import { connect } from 'react-redux'

const { Paragraph } = Typography

const SwitchHeader = (props: any) => {
  return (
    <>
      <PageHeader
        style={{ backgroundColor: '#fff' }}
        className="site-page-header"
        title={`${props.routes.title ?? '欢迎'}页`}
      >
        {props.routes.describe ? (
          <Paragraph>{props.routes.describe}</Paragraph>
        ) : (
          ''
        )}
      </PageHeader>
    </>
  )
}

const mapStateToProps = (state: RootState) => ({
  routes: state.routes,
})

export default connect(mapStateToProps)(SwitchHeader)
