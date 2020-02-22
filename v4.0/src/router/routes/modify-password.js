export default {
  path: ':alias/modify-password',
  component: resolve => require(['@/views/modify-password'], resolve),
  children: [
    {
      path: 'index',
      component: resolve => require(['@/views/modify-password/form'], resolve)
    }
  ]
}
