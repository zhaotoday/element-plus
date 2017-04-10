export default {
  path: 'articles',
  component: resolve => require(['@/app/Articles'], resolve),
  children: [
    {
      path: '/',
      component: resolve => require(['@/app/Articles/List'], resolve)
    },
    {
      path: 'form',
      component: resolve => require(['@/app/Articles/Form'], resolve),
      meta: {
        requiresAuth: true
      }
    }
  ]
}
