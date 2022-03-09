export const SidebarMenu = [
  {
    name: "product",
    title: "商品管理",
    icon: "product-filled",
    children: [
      {
        title: "商品管理",
        path: "/product/products",
      },
      {
        title: "商品分类",
        path: "/product/categories",
      },
    ],
  },
  {
    name: "ad",
    title: "广告管理",
    icon: "ad-filled",
    children: [
      {
        title: "广告管理",
        path: "/ad/ads",
      },
    ],
  },
  {
    name: "order",
    title: "订单管理",
    icon: "order-filled",
    children: [
      {
        title: "订单列表",
        path: "/order/orders",
      },
    ],
  },
  {
    name: "user",
    title: "用户管理",
    icon: "user-filled",
    children: [
      {
        title: "用户列表",
        path: "/user/users",
      },
    ],
  },
];
