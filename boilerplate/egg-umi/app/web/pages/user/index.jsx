import { useState } from 'react'
import classNames from 'classnames/bind'
import styles from './index.module.less'
import { Table, Button, Modal, Form, Input } from 'antd'
import { connect } from 'dva'
import { createUser } from './service'

const Column = Table.Column
const cx = classNames.bind(styles)

const User = props => {
  const [form] = Form.useForm()
  const [addModalVisible, setAddModalVisible] = useState(false)

  const handleCreateUser = () => {
    form.validateFields().then(values => {
      form.resetFields()
      createUser(values)
    })
  }
  return (
    <div className={cx('page-user')}>
      <Button onClick={() => setAddModalVisible(true)}>新增用户</Button>
      <Table>
        <Column dataIndex="id" title="用户ID" />
        <Column dataIndex="createTime" title="注册时间" />
        <Column dataIndex="subjectType" title="主体类型" />
        <Column dataIndex="subjectName" title="主体名称" />
        <Column dataIndex="mobile" title="注册手机号" />
        <Column dataIndex="active" title="用户状态" />
        <Column
          dataIndex="operate"
          title="操作"
          render={() => {
            return (
              <>
                <Button>编辑IP白名单</Button>
                <Button>冻结账号</Button>
              </>
            )
          }}
        />
      </Table>
      <Modal
        title="新增用户"
        visible={addModalVisible}
        okText="提交"
        cancelText="取消"
        onOk={handleCreateUser}
        onCancel={() => setAddModalVisible(false)}
      >
        <Form form={form}>
          <Form.Item label="注册手机号" name="mobile">
            <Input />
          </Form.Item>
          <Form.Item label="IP白名单" name="ipList">
            <Input.TextArea />
          </Form.Item>
          <Form.Item label="主体类型" name="subjectType">
            <Input />
          </Form.Item>
          <Form.Item label="主体名称" name="subjectName">
            <Input />
          </Form.Item>
          <Form.Item label="主体证件号" name="subjectNum">
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default connect(({ CommonPagination }) => {
  return { ...CommonPagination }
})(User)
