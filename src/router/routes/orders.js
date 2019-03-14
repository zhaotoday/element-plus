export default {
  path: ':alias/orders',
  component: resolve => require(['@/views/orders'], resolve),
  children: [
    {
      path: 'index',
      component: resolve => require(['@/views/orders/list'], resolve)
    }
  ]
}
