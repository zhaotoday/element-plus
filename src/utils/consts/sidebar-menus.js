export default [
  {
    icon: "ios-cart",
    name: "products",
    title: "商品",
    children: [
      {
        title: "商品分类",
        route: "/products/products/categories"
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
    title: "用户",
    children: [
      {
        title: "用户",
        route: "/wxUsers/wxUsers/index"
      }
    ]
  }
];
