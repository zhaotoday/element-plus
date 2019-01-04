export default [
  {
    icon: 'android-desktop',
    name: 'news',
    title: '公司新闻',
    children: [
      {
        title: '文章列表',
        route: '/news/articles/index'
      },
      {
        title: '分类列表',
        route: '/news/articles/categories'
      }
    ]
  }
]
