/*
 * @Author: Sheep
 * @Date: 2022-01-19 14:50:08
 * @Last Modified by: Sheep
 * @Last Modified time: 2022-01-19 15:02:59
 */
import React, { Component } from 'react'
import './Login.less'
import { Form, Input, Button } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import { RuleObject } from 'antd/lib/form'
import { StoreValue } from 'antd/lib/form/interface'
import { Redirect, RouteComponentProps, withRouter } from 'react-router'
import { RootState } from 'typesafe-actions'
import { login } from '../../redux/actions'
import { bindActionCreators } from 'redux'
import { LoginUser } from '../../utils/_storage'
import { connect } from 'react-redux'
import { getToken } from '../../utils/_storage'
import CardFooter from '../../layout/components/CardFooter'

type LoginProps = RouteComponentProps &
  ReturnType<typeof mapDispatchToProps> &
  ReturnType<typeof mapStateToProps>

class Login extends Component<LoginProps, {}> {
  state = {
    loading: false,
  }
  validatePwd = (rule: RuleObject, value: StoreValue) => {
    if (!value) {
      return Promise.reject('密码必须输入')
    } else if (value.length < 3 || value.length > 12) {
      return Promise.reject('密码长度不能小于4位或大于12位')
    } else if (!/^[a-zA-Z0-9_]+$/.test(value)) {
      return Promise.reject('密码必须是英文，数字和下划线组成')
    } else {
      return Promise.resolve()
    }
  }

  onFinishFailed = (errorInfo: any) => {
    console.log('错了', errorInfo)
  }

  onFinish = (values: { name: string; password: string }) => {
    this.setState({ loading: true })
    this.props.login(values.name, values.password)
  }

  private loginFromCom() {
    return (
      <Form
        onFinish={this.onFinish}
        onFinishFailed={this.onFinishFailed}
        name="normal_login"
        initialValues={{ remember: true }}
      >
        <Form.Item
          name="name"
          rules={[
            { required: true, whitespace: true, message: '请输入您的用户名' },
            { max: 12, message: '用户名最多十二位' },
            { min: 3, message: '用户名至少三位' },
            {
              pattern: /^[a-zA-Z0-9_]+$/,
              message: '用户名必须是英文,数字和下划线组成',
            },
          ]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="用户名：admin or guest"
          />
        </Form.Item>
        <Form.Item name="password" rules={[{ validator: this.validatePwd }]}>
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="密码：123456"
          />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
            loading={this.state.loading}
          >
            登录
          </Button>
        </Form.Item>
      </Form>
    )
  }

  render() {
    const user: LoginUser = this.props.user
    const _token: any = getToken()
    if (user && user.id && _token) {
      return <Redirect to="/home"></Redirect>
    }
    return (
      <>
        <div className="login">
          <section className="login-content">
            <h2>Ant Design</h2>
            <div>{this.loginFromCom()}</div>
          </section>
          <section className="login-footer">
            <CardFooter />
          </section>
        </div>
      </>
    )
  }
}
const mapStateToProps = (state: RootState) => ({
  user: state.user,
})
const mapDispatchToProps = (dispatch: any) =>
  bindActionCreators(
    {
      login: login,
    },
    dispatch
  )
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Login))
