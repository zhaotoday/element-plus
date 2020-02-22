export default {
  path: ':alias/comments',
  component: resolve => require(['@/views/comments'], resolve),
  children: [
    {
      path: 'index',
      component: resolve => require(['@/views/comments/list'], resolve)
    }
  ]
}
