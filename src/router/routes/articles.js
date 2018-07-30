export default {
  path: ':alias/articles',
  component: resolve => require(['@/modules/Articles'], resolve),
  children: [
    {
      path: 'index',
      component: resolve => require(['@/modules/Articles/List'], resolve)
    },
    {
      path: 'index/form/:id?',
      component: resolve => require(['@/modules/Articles/Form'], resolve)
    },
    {
      path: 'categories',
      component: resolve => require(['@/modules/Categories/List'], resolve)
    }
  ]
}
