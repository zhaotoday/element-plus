export default {
  path: ":alias/coupons",
  component: resolve => require(["@/views/coupons"], resolve),
  children: [
    {
      path: "list",
      component: resolve => require(["@/views/coupons/list"], resolve)
    }
  ]
};
