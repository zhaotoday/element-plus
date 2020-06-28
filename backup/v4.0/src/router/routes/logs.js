export default {
  path: ':alias/logs',
  component: resolve => require(['@/views/logs'], resolve),
  children: [
    {
      path: 'index',
      component: resolve => require(['@/views/logs/list'], resolve)
    }
  ]
}
