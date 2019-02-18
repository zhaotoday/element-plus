export default [
  {
    icon: 'ios-albums',
    name: 'news',
    title: '公司新闻',
    children: [
      {
        title: '文章列表',
        route: '/news/articles/index'
      },
      {
        title: '分类列表',
        route: '/news/articles/categories'
      }
    ]
  },
  {
    icon: 'ios-albums',
    name: 'wxUsers',
    title: '微信用户管理',
    children: [
      {
        title: '微信用户列表',
        route: '/wxUsers/wxUsers/index'
      }
    ]
  },
  {
    icon: 'md-settings',
    name: 'rbac',
    title: '角色权限',
    children: [
      {
        title: '设置用户角色',
        route: '/rbac/rbacRoles/index'
      },
      {
        title: '角色管理',
        route: '/rbac/rbacRoles/index'
      },
      {
        title: '资源管理',
        route: '/rbac/rbac/resources'
      }
    ]
  },
  {
    icon: 'md-settings',
    name: 'settings',
    title: '系统设置',
    children: [
      {
        title: '网站设置',
        route: '/settings/settings/index'
      }
    ]
  }
]
