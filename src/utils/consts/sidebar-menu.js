export const SidebarMenu = [
  {
    name: "product",
    title: "商品管理",
    icon: "ad",
    children: [
      {
        title: "商品管理",
        path: "/product/products/list",
      },
      {
        title: "商品分类",
        path: "/product/categories/list",
      },
    ],
  },
  {
    name: "ad",
    title: "广告管理",
    icon: "ad",
    children: [
      {
        title: "广告管理",
        path: "/ad/ads/list",
      },
    ],
  },
  {
    icon: "xxx",
    title: "xxx",
    children: [
      {
        title: "xxx",
        path: "/xxx/list",
      },
    ],
  },
];
