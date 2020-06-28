export default {
  path: ':alias/coupons',
  component: resolve => require(['@/views/coupons'], resolve),
  children: [
    {
      path: 'index',
      component: resolve => require(['@/views/coupons/list'], resolve)
    }
  ]
}
