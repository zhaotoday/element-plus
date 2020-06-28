export default {
  path: ":alias/notices",
  component: resolve => require(["@/views/articles"], resolve),
  children: [
    {
      path: "list",
      component: resolve => require(["@/views/notices/list"], resolve)
    },
    {
      path: "list/form/:id?",
      component: resolve => require(["@/views/notices/form"], resolve)
    }
  ]
};
