export default {
  path: ':alias/suppliers',
  component: resolve => require(['@/views/suppliers'], resolve),
  children: [
    {
      path: 'index',
      component: resolve => require(['@/views/suppliers/list'], resolve)
    },
    {
      path: 'index/form/:id?',
      component: resolve => require(['@/views/suppliers/form'], resolve)
    }
  ]
}
