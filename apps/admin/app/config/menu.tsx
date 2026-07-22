import { type AdminMenuItem } from '@vuejs-repo/element-plus'

export const menu: AdminMenuItem[] = [
  {
    title: '首页',
    path: '/',
    icon: <i class="i-carbon:home"></i>,
    children: [
      {
        title: '轮播图管理',
        path: '/home/ads',
      },
    ],
  },
  {
    title: '新闻动态',
    path: '',
    icon: <i class="i-carbon:document"></i>,
    children: [
      {
        title: '新闻管理',
        path: '/news/contents',
      },
      {
        title: '分类管理',
        path: '/news/categories',
      },
    ],
  },
]
