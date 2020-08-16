import { Table, DatePicker, Input, Button } from 'antd'
import { connect } from 'dva'
import classNames from 'classnames/bind'
import styles from './index.module.less'

const cx = classNames.bind(styles)
const Column = Table.Column
const { RangePicker } = DatePicker

const Validation = props => {
  const handlePickerChange = (date, dateStrs) => {
    console.log(date)
  }
  return (
    <div className={cx('page-validation')}>
      <div className={cx('action-block')}>
        <RangePicker onChange={handlePickerChange} />
        <Input placeholder="搜索批次编号、用户ID" />
      </div>
      <Table>
        <Column dataIndex="batchId" title="批次编号" />
        <Column dataIndex="identityTypes" title="验证类型" />
        <Column dataIndex="createTime" title="提交时间" />
        <Column dataIndex="id" title="用户id" />
        <Column dataIndex="batchNum" title="验证条目数" />
        <Column dataIndex="identityStatus" title="状态" />
        <Column
          dataIndex="operate"
          title="操作"
          render={() => {
            return (
              <>
                <Button>查看</Button>
                <Button>下载原始数据</Button>
                <Button>上传验证数据</Button>
              </>
            )
          }}
        />
      </Table>
    </div>
  )
}

export default connect(({ CommonPagination }) => {
  return {
    ...CommonPagination,
  }
})(Validation)
