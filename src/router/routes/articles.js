export default {
  path: ":alias/articles",
  component: resolve => require(["@/views/articles"], resolve),
  children: [
    {
      path: "index",
      component: resolve => require(["@/views/articles/list"], resolve)
    }
  ]
};
