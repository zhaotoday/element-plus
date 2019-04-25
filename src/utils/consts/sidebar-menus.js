export default [
  {
    icon: 'logo-buffer',
    name: 'surveys',
    title: '问卷调查',
    children: [
      {
        title: '主题',
        route: '/surveys/surveys/subjects'
      },
      {
        title: '评价',
        route: '/surveys/surveys/results'
      }
    ]
  },
  {
    icon: 'md-person',
    name: 'wxUsers',
    title: '用户',
    children: [
      {
        title: '用户',
        route: '/wxUsers/wxUsers/index'
      }
    ]
  }
]
