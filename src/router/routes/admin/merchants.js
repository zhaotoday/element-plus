export default {
  path: ":alias/merchants",
  component: resolve => require(["@/views/merchants"], resolve),
  children: [
    {
      path: "list",
      component: resolve => require(["@/views/merchants/list"], resolve)
    }
  ]
};
