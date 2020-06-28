export default {
  path: ":alias/outer-products",
  component: resolve => require(["@/views/outer-products"], resolve),
  children: [
    {
      path: "list",
      component: resolve => require(["@/views/outer-products/list"], resolve)
    }
  ]
};
