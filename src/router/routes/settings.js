export default {
  path: ':alias/settings',
  component: resolve => require(['@/views/settings'], resolve),
  children: [
    {
      path: 'index',
      component: resolve => require(['@/views/settings/list'], resolve)
    }
  ]
}
