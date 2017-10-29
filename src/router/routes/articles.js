export default {
  path: 'articles',
  component: resolve => require(['@/modules/Articles'], resolve),
  children: [
    {
      path: '/',
      component: resolve => require(['@/modules/Articles/List'], resolve)
    },
    {
      path: 'form/:id?',
      component: resolve => require(['@/modules/Articles/Form'], resolve)
    }
  ]
}
