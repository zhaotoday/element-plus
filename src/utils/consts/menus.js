export default [
  {
    name: 'news',
    title: '企业信息',
    icon: 'compose',
    children: [
      {
        title: '文章列表',
        route: '/news/articles/index'
      }, {
        title: '分类列表',
        route: '/news/articles/categories'
      }
    ]
  },
  {
    name: 'contact',
    title: '联系我们',
    icon: 'compose',
    children: [
      {
        title: '文章列表',
        route: '/contact/articles/index'
      }, {
        title: '分类列表',
        route: '/contact/articles/categories'
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
