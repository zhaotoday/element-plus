export default {
  path: ':alias/freights',
  component: resolve => require(['@/views/freights'], resolve),
  children: [
    {
      path: 'index',
      component: resolve => require(['@/views/freights/list'], resolve)
    }
  ]
}
