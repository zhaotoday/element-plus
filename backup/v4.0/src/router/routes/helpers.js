export default {
  path: ':alias/helpers',
  component: resolve => require(['@/views/helpers'], resolve),
  children: [
    {
      path: 'index',
      component: resolve => require(['@/views/helpers/list'], resolve)
    },
    {
      path: 'index/form/:id?',
      component: resolve => require(['@/views/helpers/form'], resolve)
    },
    {
      path: 'categories',
      component: resolve => require(['@/views/categories/list'], resolve)
    }
  ]
}
