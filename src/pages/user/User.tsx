/*
 * @Description:
 * @Author: Sheep
 * @Date: 2022-01-21 15:29:55
 * @LastEditTime: 2022-01-27 15:25:23
 * @LastEditors: Sheep
 */
import './index.less'
import ProForm, {
  ModalForm,
  ProFormSelect,
  ProFormText,
} from '@ant-design/pro-form'
import { Button, Card, message, Space, Table } from 'antd'
import React, { useEffect, useState } from 'react'
import { reqUsers, reqRoles } from '../../api'
import { UserModel } from './model'
import {
  EyeInvisibleOutlined,
  EyeTwoTone,
  SearchOutlined,
  UserAddOutlined,
} from '@ant-design/icons'
import { RoleModel } from '../role/Model'
import { logout } from '../../redux/actions'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from 'typesafe-actions'
import WrappedProFormText from '@ant-design/pro-form/lib/components/Text'
import { ColumnsType } from 'antd/es/table'

const User = () => {
  const [users, setUsers] = useState<UserModel[]>([])
  const [roles, setRoles] = useState<RoleModel[]>([])
  const [user, setUser] = useState<UserModel>()
  const [isUpdate, setIsUpdate] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  const dispath = useDispatch()
  const loginUser = useSelector((state: RootState) => state.user)
  const columns: ColumnsType<UserModel> = [
    {
      title: '用户名',
      dataIndex: 'nickName',
      render: (text) => <a>{text}</a>,
      width: 60,
      fixed: 'left',
    },
    {
      title: '邮箱',
      dataIndex: 'email',
      fixed: false,
      width: 200,
    },
    {
      title: '年龄',
      dataIndex: 'age',
      width: 60,
    },
    {
      title: '性别',
      dataIndex: 'isMale',
      render: (text) => <>{text ? '男' : '女'}</>,
      width: 60,
    },
    {
      title: '电话',
      dataIndex: 'phone',
      width: 200,
    },
    {
      title: '注册时间',
      dataIndex: 'createTime',
      width: 200,
    },
    {
      title: '所属角色',
      dataIndex: 'roleId',
      render: (roleId: string) =>
        roles.find((r) => r.id?.toString() === roleId)?.authName,
      width: 100,
    },
    {
      title: '操作',
      dataIndex: 'action',
      render: (text: any, record: UserModel) => (
        <Space size="middle">
          <ModalForm
            layout="horizontal"
            title="修改用户"
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 14 }}
            trigger={<a>配置信息</a>}
            modalProps={{
              onCancel: () => console.log(text, record),
              afterClose: () => {
                if (user?.name === loginUser.name) {
                  dispath(logout())
                }
              },
            }}
            onFinish={async (
              values: Record<string, UserModel>
            ): Promise<boolean> => {
              Object.assign(record, values)
              const result: string = ''
              if (result === 'success') {
                message.success('修改成功')
                setUser(record)
              } else {
                message.error('修改失败')
              }
              return true
            }}
          >
            {proForm(record)}
          </ModalForm>
          <ModalForm
            layout="horizontal"
            title="删除用户"
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 14 }}
            trigger={<a>删除</a>}
            modalProps={
              {
                // onCancel: () => console.log(text, record),
              }
            }
            onFinish={async (
              values: Record<string, UserModel>
            ): Promise<boolean> => {
              return true
            }}
          >
            <span style={{ color: 'red', textAlign: 'center' }}>
              确定要删除此用户吗
            </span>
          </ModalForm>
        </Space>
      ),
      width: 80,
      fixed: 'right',
    },
  ]

  useEffect(() => {
    let ignore: boolean = false
    const fetchData = async () => {
      setLoading(true)
      const users = (await reqUsers()).data
      const roles = (await reqRoles()).data
      if (!ignore) {
        setRoles(roles ?? [])
        setUsers(users)
        setLoading(false)
      }
    }
    fetchData()
    return () => {
      ignore = true
      setIsUpdate(false)
    }
  }, [isUpdate, user])

  const proForm = (user?: UserModel): React.ReactElement => {
    return (
      <ProForm.Group>
        <ProFormText
          rules={[{ required: true, message: '请输入用户名!' }]}
          name="name"
          label="用户名"
          width="lg"
          placeholder="用户名"
          initialValue={user?.nickName ?? ''}
        ></ProFormText>
        <WrappedProFormText.Password
          rules={[{ required: true, message: '请输入密码!' }]}
          name="password"
          label="密码"
          width="lg"
          placeholder="密码"
          initialValue={user?.password}
          fieldProps={{
            type: 'password',
            iconRender: (visible = false) =>
              visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />,
          }}
        ></WrappedProFormText.Password>
        <ProFormText
          rules={[{ required: true, message: '请输入手机号!' }]}
          name="phone"
          label="手机号"
          width="lg"
          placeholder="手机号"
          initialValue={user?.phone ?? ''}
        ></ProFormText>
        <ProFormText
          rules={[{ required: true, message: '请输入邮箱!' }]}
          name="email"
          label="邮箱"
          width="lg"
          placeholder="邮箱"
          initialValue={user?.email ?? ''}
        ></ProFormText>
        <ProForm.Group>
          <ProFormSelect
            width="lg"
            request={async () => {
              return roles.reduce(
                (
                  acc: { label?: string; value?: string }[],
                  curValue: RoleModel
                ): {
                  label?: string
                  value?: string
                }[] => {
                  acc.push({
                    label: curValue.authName.toString(),
                    value: curValue.id?.toString(),
                  })
                  return acc
                },
                []
              )
            }}
            initialValue={
              user === undefined
                ? null
                : roles.find((r) => r.id?.toString() === user.roleId)?.authName
            }
            label="角色"
            name="roleId"
          />
        </ProForm.Group>
      </ProForm.Group>
    )
  }

  const title = (
    <span className="user">
      <ModalForm
        layout="horizontal"
        title="添加用户"
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        trigger={
          <Button
            type="primary"
            icon={<UserAddOutlined />}
            disabled={loading}
            style={{ marginRight: '10px' }}
          >
            创建角色
          </Button>
        }
        modalProps={{}}
        onFinish={async (
          values: Record<string, UserModel>
        ): Promise<boolean> => {
          const result = 'success'
          if (result === 'success') {
            message.success('添加用户成功')
            users.push(values)
            setIsUpdate(true)
          } else {
            message.error('添加用户失败')
          }
          return true
        }}
      >
        {proForm()}
      </ModalForm>
    </span>
  )
  return (
    <>
      <Card
        type="inner"
        title={title}
        extra={
          <>
            <Button
              type="primary"
              shape="circle"
              icon={<SearchOutlined />}
              size="middle"
            />
          </>
        }
        bordered={false}
        headStyle={{ backgroundColor: 'inherit' }}
      >
        <Table
          loading={loading}
          rowKey="id"
          columns={columns}
          dataSource={users}
          scroll={{ x: 1300 }}
          size="middle"
          pagination={{
            pageSize: 15,
            total: users.length,
            responsive: true,
            size: 'small',
            showQuickJumper: true,
          }}
        ></Table>
      </Card>
    </>
  )
}

export default User
