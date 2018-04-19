export default [
  {
    name: 'articles',
    title: '文章管理',
    icon: 'compose',
    children: [
      {
        title: '文章列表',
        route: '/articles'
      }, {
        title: '文章分类',
        route: '/articles/categories'
      }
    ]
  }, {
    name: 'shops',
    title: '商城管理',
    icon: 'android-cart',
    children: [
      {
        title: '店铺管理',
        route: '/mall/shops'
      }, {
        title: '商品管理',
        route: '/mall/products'
      }, {
        title: '订单管理',
        route: '/mall/orders'
      }
    ]
  }, {
    name: 'files',
    title: '文件管理',
    icon: 'document',
    children: [
      {
        title: '文件管理',
        route: '/files'
      }
    ]
  }, {
    name: 'users',
    title: '会员管理',
    icon: 'person',
    children: [
      {
        title: '会员管理',
        route: '/users'
      }
    ]
  }, {
    name: 'settings',
    title: '网站设置',
    icon: 'android-settings',
    children: [
      {
        title: '网站设置',
        route: '/settings'
      }
    ]
  }
]
