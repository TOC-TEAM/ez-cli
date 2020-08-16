import { Menu } from 'antd'
import NavLink from 'umi/navlink'
import React from 'react'
import { useLocation } from 'react-router-dom'
import menuConfig from './menuConfig'

const { SubMenu } = Menu

const getChildren = menus => {
  return menus.map(item => {
    const { children, path, key, title } = item
    let icon = item.icon || null
    if (icon) {
      icon = React.createElement(icon)
    }
    if (Array.isArray(children)) {
      return React.createElement(SubMenu, {
        key: key || path || title,
        icon,
        children: getChildren(children),
        title,
      })
    }

    return React.createElement(Menu.Item, {
      children: React.createElement(NavLink, {
        to: path,
        children: [title],
      }),
      key: key || path || title,
      title,
      icon,
    })
  })
}

const AppMenus = () => {
  const { pathname } = useLocation()
  return React.createElement(Menu, {
    children: getChildren(menuConfig),
    mode: 'inline',
    theme: 'dark',
    defaultSelectedKeys: [pathname],
    defaultOpenKeys: [pathname],
  })
}

export default AppMenus
