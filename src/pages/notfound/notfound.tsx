/*
 * @Descripttion:
 * @version:
 * @Author: MFine
 * @Date: 2021-02-11 01:17:41
 * @LastEditors: Sheep
 * @LastEditTime: 2022-01-22 00:02:43
 */
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router'
import { setHeadTitle } from '../../redux/actions'
import { Result, Button } from 'antd'

const NotFound = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const _title1 = { title: '欢迎' }
  const _title2 = { title: '404' }
  const goHome = () => {
    dispatch(setHeadTitle(_title1))
    history.push('/home')
  }
  useEffect(() => {
    dispatch(setHeadTitle(_title2))
  })
  return (
    <Result
      status="404"
      title="404"
      subTitle="Sorry, the page you visited does not exist."
      extra={
        <Button type="primary" onClick={goHome}>
          Back Home
        </Button>
      }
    />
  )
}

export default NotFound
