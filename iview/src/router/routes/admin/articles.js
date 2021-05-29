export default {
  path: ":alias/articles",
  component: resolve => require(["@/views/articles"], resolve),
  children: [
    {
      path: "categories",
      component: resolve => require(["@/views/categories/list"], resolve)
    },
    {
      path: "list",
      component: resolve => require(["@/views/articles/list"], resolve)
    },
    {
      path: "list/form/:id?",
      component: resolve => require(["@/views/articles/form"], resolve)
    }
  ]
};
