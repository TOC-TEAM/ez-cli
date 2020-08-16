import { useState } from 'react'
import { Layout, Menu, ConfigProvider, Breadcrumb } from 'antd'
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
} from '@ant-design/icons'
import 'dayjs/locale/zh-cn'
import zhCN from 'antd/es/locale/zh_CN'
import Link from 'umi/link'
import AppMenus from './menus'
import AppBreadcrumb from './breadcrumb'

const { Header, Sider, Content } = Layout
const AppLayout = props => {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <ConfigProvider locale={zhCN}>
      <Layout style={{ height: '100%' }}>
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <div className="logo" />
          <AppMenus />
        </Sider>
        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 0 }}>
            {React.createElement(
              collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
              {
                className: 'trigger',
                onClick: () => setCollapsed(prev => !prev),
              }
            )}
          </Header>
          <AppBreadcrumb />
          <Content
            className="site-layout-background"
            style={{
              margin: '24px 16px',
              padding: 24,
              minHeight: 280,
            }}
          >
            {props.children}
          </Content>
        </Layout>
      </Layout>
    </ConfigProvider>
  )
}

export default AppLayout
