import dayjs from 'dayjs'

const getOrderRoute = ({ status, wxUserId }) => {
  const listSearchWhere = encodeURIComponent(JSON.stringify({
    no: { $like: '' },
    payWay: { $eq: '' },
    status: status ? { $eq: status } : '',
    wxUserId: { $eq: wxUserId || '' },
    startTime: { $eq: dayjs().add(-1, 'day').startOf('day').format('YYYY-MM-DD HH:mm:ss') },
    endTime: { $eq: dayjs().endOf('day').format('YYYY-MM-DD HH:mm:ss') }
  }))

  return `/orders/orders/index?listSearchWhere=${listSearchWhere}`
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
        route: getOrderRoute({ status: 'TO_PAY' })
      },
      {
        title: '待发货',
        route: getOrderRoute({ status: 'TO_DELIVER' })
      },
      {
        title: '待收货',
        route: getOrderRoute({ status: 'IN_DELIVER' })
      },
      {
        title: '已完成',
        route: getOrderRoute({ status: 'FINISH' })
      },
      {
        title: '已取消',
        route: getOrderRoute({ status: 'CANCELLED' })
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
      },
      {
        title: '商家',
        route: '/wxUsers/merchants/index'
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
