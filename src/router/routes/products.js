export default {
  path: ":alias/products",
  component: resolve => require(["@/views/categories"], resolve),
  children: [
    {
      path: "categories",
      component: resolve => require(["@/views/categories/list"], resolve)
    }
  ]
};
