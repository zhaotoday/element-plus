export default {
  path: ":alias/brands",
  component: resolve => require(["@/views/brands"], resolve),
  children: [
    {
      path: "list",
      component: resolve => require(["@/views/brands/list"], resolve)
    }
  ]
};
