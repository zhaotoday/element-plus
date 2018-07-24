export default {
  path: 'settings',
  component: resolve => require(['@/modules/Settings'], resolve),
  children: [
    {
      path: 'index/form/:id?',
      component: resolve => require(['@/modules/Settings/Form'], resolve)
    }
  ]
}
