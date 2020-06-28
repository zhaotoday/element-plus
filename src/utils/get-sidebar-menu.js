const dressesMenu = {
  icon: "md-bowtie",
  name: "dresses",
  title: "首页管理",
  children: [
    {
      title: "首页装修",
      route: "/dresses/dresses/home"
    },
    {
      title: "轮播广告",
      route: "/dresses/ads/list"
    },
    {
      title: "校区公告",
      route: "/dresses/notices/list"
    },
    {
      title: "功能入口",
      route: "/dresses/entries/list"
    },
    {
      title: "快捷入口",
      route: "/dresses/shortcuts/list"
    },
    {
      title: "品牌推荐",
      route: "/dresses/brands/list"
    },
    {
      title: "外链商品",
      route: "/dresses/outer-products/list"
    }
  ]
};

const productsMenu = {
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
};

const platformReportsMenu = {
  icon: "logo-bitcoin",
  name: "reports",
  title: "财务管理",
  children: [
    {
      title: "订单列表",
      route: "/reports/orders/list"
    },
    {
      title: "分销员佣金",
      route: "/reports/commissions/list"
    },
    {
      title: "分销员提现",
      route: "/reports/withdraws/list/userType/Distributor"
    },
    {
      title: "校区收入",
      route: "/reports/incomes/list"
    },
    {
      title: "校区提现",
      route: "/reports/withdraws/list/userType/School"
    },
    {
      title: "平台收入",
      route: "/reports/all-incomes/list"
    },
    {
      title: "积分",
      route: "/reports/points/list"
    }
  ]
};

const schoolReportsMenu = {
  icon: "logo-bitcoin",
  name: "reports",
  title: "财务管理",
  children: [
    {
      title: "订单列表",
      route: "/reports/orders/list"
    },
    {
      title: "校区收入",
      route: "/reports/incomes/list"
    },
    {
      title: "校区提现",
      route: "/reports/withdraws/list/userType/School"
    },
    {
      title: "积分",
      route: "/reports/points/list"
    }
  ]
};

const marketingMenu = {
  icon: "ios-browsers",
  name: "marketing",
  title: "营销管理",
  children: [
    {
      title: "优惠券",
      route: "/marketing/coupons/list"
    }
  ]
};

const articlesMenu = {
  icon: "md-document",
  name: "articles",
  title: "图文管理",
  children: [
    {
      title: "图文列表",
      route: "/articles/articles/list"
    },
    {
      title: "图文分类",
      route: "/articles/articles/categories"
    }
  ]
};

const usersMenu = {
  icon: "md-person",
  name: "users",
  title: "用户管理",
  children: [
    {
      title: "分销员申请",
      route: "/users/distributor-applications/list"
    },
    {
      title: "微信用户",
      route: "/users/schoolWxUsers/list"
    }
  ]
};

export default schoolId => {
  const platformMenu = {
    icon: "md-school",
    name: "schools",
    title: "校区管理",
    children: [
      {
        title: "校区列表",
        route: "/schools/schools/list"
      },
      {
        title: "全局设置",
        route: "/schools/settings/list/form/1"
      }
    ]
  };

  const schoolsMenu = {
    icon: "md-school",
    name: "schools",
    title: "校区设置",
    children: [
      {
        title: "校区设置",
        route: `/schools/schools/list/form/${schoolId}`
      }
    ]
  };

  return schoolId === 1
    ? [
        platformMenu,
        dressesMenu,
        productsMenu,
        platformReportsMenu,
        marketingMenu,
        articlesMenu,
        usersMenu
      ]
    : [
        schoolsMenu,
        dressesMenu,
        productsMenu,
        schoolReportsMenu,
        marketingMenu,
        articlesMenu,
        usersMenu
      ];
};
