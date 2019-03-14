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
        title: '文章分类列表',
        route: '/news/articles/categories'
      }
    ]
  },
  {
    icon: 'ios-cart',
    name: 'products',
    title: '商品',
    children: [
      {
        title: '商品列表',
        route: '/products/products/index'
      },
      {
        title: '商品分类列表',
        route: '/products/products/categories'
      }
    ]
  },
  {
    icon: 'ios-albums',
    name: 'wxUsers',
    title: '微信用户',
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
        title: '用户列表',
        route: '/rbac/rbacRoles/index'
      },
      {
        title: '角色列表',
        route: '/rbac/rbac/roles'
      },
      {
        title: '资源列表',
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
