import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
} from '@ant-design/icons'

export default [
  {
    title: '用户管理',
    icon: UploadOutlined,
    key: 'user',
    children: [
      {
        title: '用户列表',
        path: '/user',
        icon: MenuFoldOutlined,
        children: [
          {
            title: 'A1级用户',
            path: '/user/A1',
          },
        ],
      },
      {
        title: '用户中心',
        path: '/user/center',
        icon: UserOutlined,
      },
    ],
  },
  {
    title: '运营中心',
    key: 'operate',
    icon: VideoCameraOutlined,
    path: '/operate',
  },
]
