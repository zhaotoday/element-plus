export default {
  path: ':alias/activities',
  component: resolve => require(['@/views/activities'], resolve),
  children: [
    {
      path: 'index',
      component: resolve => require(['@/views/activities/list'], resolve)
    },
    {
      path: 'index/form/:id?',
      component: resolve => require(['@/views/activities/form'], resolve)
    },
    {
      path: 'categories',
      component: resolve => require(['@/views/categories/list'], resolve)
    }
  ]
}
