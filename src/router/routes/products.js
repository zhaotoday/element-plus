export default {
  path: ':alias/products',
  component: resolve => require(['@/views/products'], resolve),
  children: [
    {
      path: 'index',
      component: resolve => require(['@/views/products/list'], resolve)
    },
    {
      path: 'index/form/:id?',
      component: resolve => require(['@/views/products/form'], resolve)
    },
    {
      path: 'categories',
      component: resolve => require(['@/views/categories/list'], resolve)
    }
  ]
}
