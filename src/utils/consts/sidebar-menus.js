const getOrderURL = status => {
  return encodeURIComponent(JSON.stringify({
    no: { $like: '' },
    payWay: { $eq: '' },
    status: { $eq: status },
    startTime: { $eq: '' },
    endTime: { $eq: '' }
  }))
}

export default [
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
      }
    ]
  },
  {
    icon: 'md-pricetag',
    name: 'orders',
    title: '订单',
    children: [
      {
        title: '待付款',
        route: `/orders/orders/index?listSearchWhere=${getOrderURL('TO_PAY')}`
      },
      {
        title: '待发货',
        route: `/orders/orders/index?listSearchWhere=${getOrderURL('TO_DELIVER')}`
      },
      {
        title: '待收货',
        route: `/orders/orders/index?listSearchWhere=${getOrderURL('IN_DELIVER')}`
      },
      {
        title: '已完成',
        route: `/orders/orders/index?listSearchWhere=${getOrderURL('FINISH')}`
      },
      {
        title: '已取消',
        route: `/orders/orders/index?listSearchWhere=${getOrderURL('CANCELLED')}`
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
    icon: 'ios-map',
    name: 'marketing',
    title: '营销',
    children: [
      {
        title: '广告',
        route: '/marketing/ads/index'
      },
      {
        title: '优惠券',
        route: '/marketing/coupons/index'
      },
      {
        title: '优惠券活动',
        route: '/marketing/couponActivities/index'
      }
    ]
  },
  {
    icon: 'md-person',
    name: 'wxUsers',
    title: '用户',
    children: [
      {
        title: '用户',
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
    icon: 'ios-print',
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
