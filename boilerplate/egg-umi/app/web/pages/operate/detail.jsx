import { Table, Input, Button } from 'antd'
import classNames from 'classnames/bind'
import styles from './detail.module.less'
import { connect } from 'dva'

const cx = classNames.bind(styles)
const { Column } = Table

const Detail = props => {
  return (
    <div className={cx('page-detail')}>
      <div className={cx('action-block')}>
        <Input placeholder="搜索UID、Name、PID、备注" />
        <Button>下载原始信息</Button>
      </div>
      <Table>
        <Column dataIndex="uid" title="UID" />
        <Column dataIndex="name" title="Name" />
        <Column dataIndex="pid" title="PID" />
        <Column dataIndex="updateTime" title="更新时间" />
        <Column dataIndex="description" title="备注信息" />
        <Column
          dataIndex="operate"
          title="操作"
          render={() => {
            return <Button>更新评分</Button>
          }}
        />
      </Table>
    </div>
  )
}

export default connect(({ CommonPagination }) => {
  return { ...CommonPagination }
})(Detail)
