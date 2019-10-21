export default {
  path: ':alias/referrers',
  component: resolve => require(['@/views/referrers'], resolve),
  children: [
    {
      path: 'index',
      component: resolve => require(['@/views/referrers/list'], resolve)
    }
  ]
}
