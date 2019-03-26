export default [
  {
    icon: 'ios-albums',
    name: 'news',
    title: '公司新闻',
    children: [
      {
        title: '文章',
        route: '/news/articles/index'
      },
      {
        title: '文章分类',
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
        title: '商品',
        route: '/products/products/index'
      },
      {
        title: '商品分类',
        route: '/products/products/categories'
      },
      {
        title: '商品评价',
        route: '/products/comments/index'
      }
    ]
  },
  {
    icon: 'md-pricetag',
    name: 'orders',
    title: '订单',
    children: [
      {
        title: '订单',
        route: '/orders/orders/index'
      }
    ]
  },
  {
    icon: 'ios-map',
    name: 'ads',
    title: '广告',
    children: [
      {
        title: '广告',
        route: '/ads/ads/index'
      }
    ]
  },
  {
    icon: 'md-help',
    name: 'helpers',
    title: '帮助',
    children: [
      {
        title: '帮助',
        route: '/helpers/helpers/index'
      },
      {
        title: '帮助分类',
        route: '/helpers/helpers/categories'
      }
    ]
  },
  {
    icon: 'md-person',
    name: 'wxUsers',
    title: '微信用户',
    children: [
      {
        title: '微信用户',
        route: '/wxUsers/wxUsers/index'
      }
    ]
  },
  {
    icon: 'md-key',
    name: 'rbac',
    title: '角色权限',
    children: [
      {
        title: '用户',
        route: '/rbac/rbacRoles/index'
      },
      {
        title: '角色',
        route: '/rbac/rbac/roles'
      },
      {
        title: '资源',
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
  },
  {
    icon: 'md-pricetag',
    name: 'logs',
    title: '日志',
    children: [
      {
        title: '日志',
        route: '/logs/logs/index'
      }
    ]
  }
]
