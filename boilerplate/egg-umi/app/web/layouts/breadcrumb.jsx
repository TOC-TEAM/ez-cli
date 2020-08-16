import { Breadcrumb } from 'antd'
import NavLink from 'umi/navlink'
import { useLocation } from 'react-router-dom'
import menuConfig from './menuConfig'

const getBreadcrumbName = key => {
  const target =
    menuConfig.find(item => new RegExp(`^${item.key}`, 'i').test(key)) || {}
  const names = []
  const getNames = menuObj => {
    Object.keys(menuObj).forEach(() => {
      names.push(menuObj.title)
      if (Array.isArray(menuObj.children)) {
        menuObj.children.forEach(child => getNames(child))
      }
    })
  }
  getNames(target)
  return names
}

const AppBreadcrumb = () => {
  const location = useLocation()
  const segments = location.pathname.split('/').filter(Boolean)
  const names = getBreadcrumbName(segments[0])

  const paths = []
  let current = '/'
  let i = 0
  for (; i < segments.length - 1; ++i) {
    current += segments[i]
    paths.push({
      path: current,
      name: names[i],
    })
  }
  current += segments[i]

  return (
    <Breadcrumb>
      {paths.map(info => {
        return (
          <Breadcrumb.Item key={info.path}>
            <NavLink to={info.path}>{info.name}</NavLink>
          </Breadcrumb.Item>
        )
      })}
      <Breadcrumb.Item key={current}>{names[names.length - 1]}</Breadcrumb.Item>
    </Breadcrumb>
  )
}

export default AppBreadcrumb
