export default {
  path: ':alias/rbac',
  component: resolve => require(['@/views/root'], resolve),
  children: [
    {
      path: 'roles',
      component: resolve => require(['@/views/rbac-roles/list'], resolve)
    },
    {
      path: 'resources',
      component: resolve => require(['@/views/rbac-resources/list'], resolve)
    }
  ]
}
