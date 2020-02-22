export default {
  path: ':alias/ads',
  component: resolve => require(['@/views/ads'], resolve),
  children: [
    {
      path: 'index',
      component: resolve => require(['@/views/ads/list'], resolve)
    }
  ]
}
