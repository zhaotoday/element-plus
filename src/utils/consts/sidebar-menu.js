export default [
  {
    icon: "ios-cart",
    name: "products",
    title: "商品",
    children: [
      {
        title: "商品",
        route: "/products/products/list"
      },
      {
        title: "商品分类",
        route: "/products/products/categories"
      }
    ]
  },
  {
    icon: "md-person",
    name: "orders",
    title: "订单",
    children: [
      {
        title: "订单",
        route: "/orders/orders/index"
      }
    ]
  },
  {
    icon: "md-person",
    name: "ads",
    title: "广告",
    children: [
      {
        title: "广告",
        route: "/ads/ads/index"
      }
    ]
  },
  {
    icon: "md-person",
    name: "wxUsers",
    title: "微信用户",
    children: [
      {
        title: "微信用户",
        route: "/wxUsers/wxUsers/index"
      }
    ]
  }
];
