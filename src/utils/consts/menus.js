export default [
  {
    name: 'news',
    title: '企业信息',
    icon: 'compose',
    children: [
      {
        title: '分类列表',
        route: '/news/articles/categories'
      },
      {
        title: '文章列表',
        route: '/news/articles/index'
      }
    ]
  },
  {
    name: 'contact',
    title: '联系我们',
    icon: 'compose',
    children: [
      {
        title: '分类列表',
        route: '/contact/articles/categories'
      },
      {
        title: '文章列表',
        route: '/contact/articles/index'
      }
    ]
  },
  {
    name: 'settings',
    title: '系统设置',
    icon: 'compose',
    children: [
      {
        title: '网站设置',
        route: '/settings/index'
      }
    ]
  }
]
