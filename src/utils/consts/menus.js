export default [
  {
    name: 'articles',
    title: '文章管理',
    icon: 'compose',
    children: [
      {
        title: '文章列表',
        route: '/articles'
      }, {
        title: '文章栏目',
        route: '/articles/categories'
      }
    ]
  }
]
