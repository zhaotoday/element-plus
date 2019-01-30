export default {
  path: ':alias/wxUsers',
  component: resolve => require(['@/views/wxUsers'], resolve),
  children: [
    {
      path: 'index',
      component: resolve => require(['@/views/wxUsers/list'], resolve)
    }
  ]
}
