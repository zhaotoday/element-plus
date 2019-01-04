export default {
  path: ':alias/articles',
  component: resolve => require(['@/pages/articles'], resolve),
  children: [
    {
      path: 'index',
      component: resolve => require(['@/pages/articles/list'], resolve)
    },
    {
      path: 'index/form/:id?',
      component: resolve => require(['@/pages/articles/form'], resolve)
    },
    {
      path: 'categories',
      component: resolve => require(['@/pages/categories/list'], resolve)
    }
  ]
}
