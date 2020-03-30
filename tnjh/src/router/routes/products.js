export default {
  path: ":alias/products",
  component: resolve => require(["@/views/categories"], resolve),
  children: [
    {
      path: "categories",
      component: resolve => require(["@/views/categories/list"], resolve)
    },
    {
      path: "list",
      component: resolve => require(["@/views/products/list"], resolve)
    },
    {
      path: "list/form/:id?",
      component: resolve => require(["@/views/products/form"], resolve)
    }
  ]
};
