export default [
  {
    icon: "md-cube",
    name: "products",
    title: "商品管理",
    children: [
      {
        title: "商品列表",
        route: "/products/products/list"
      },
      {
        title: "商品分类",
        route: "/products/products/categories"
      }
    ]
  },
  {
    icon: "logo-bitcoin",
    name: "finances",
    title: "财务管理",
    children: [
      {
        title: "订单列表",
        route: "/finances/orders/list"
      },
      {
        title: "分销员佣金",
        route: "/finances/commissions/list"
      },
      {
        title: "分销员提现",
        route: "/finances/withdraws/list"
      }
    ]
  },
  {
    icon: "ios-browsers",
    name: "marketing",
    title: "营销管理",
    children: [
      {
        title: "轮播广告列表",
        route: "/marketing/ads/list"
      },
      {
        title: "优惠券列表",
        route: "/marketing/coupons/list"
      }
    ]
  },
  {
    icon: "md-document",
    name: "articles",
    title: "文章管理",
    children: [
      {
        title: "文章列表",
        route: "/articles/articles/list"
      },
      {
        title: "文章分类",
        route: "/articles/articles/categories"
      }
    ]
  },
  {
    icon: "md-document",
    name: "merchants",
    title: "商家管理",
    children: [
      {
        title: "商家列表",
        route: "/merchants/merchants/list"
      }
    ]
  },
  {
    icon: "md-document",
    name: "brands",
    title: "商标管理",
    children: [
      {
        title: "商标列表",
        route: "/brands/brands/list"
      }
    ]
  },
  {
    icon: "md-person",
    name: "wxUsers",
    title: "微信用户管理",
    children: [
      {
        title: "微信用户列表",
        route: "/wxUsers/wxUsers/list"
      }
    ]
  }
];
