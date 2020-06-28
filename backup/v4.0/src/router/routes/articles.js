export default {
  path: ':alias/articles',
  component: resolve => require(['@/views/articles'], resolve),
  children: [
    {
      path: 'index',
      component: resolve => require(['@/views/articles/list'], resolve)
    },
    {
      path: 'index/form/:id?',
      component: resolve => require(['@/views/articles/form'], resolve)
    },
    {
      path: 'categories',
      component: resolve => require(['@/views/categories/list'], resolve)
    }
  ]
}
