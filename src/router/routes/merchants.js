export default {
  path: ":alias/merchants",
  component: resolve => require(["@/views/merchants"], resolve),
  children: [
    {
      path: "index",
      component: resolve => require(["@/views/merchants/list"], resolve)
    }
  ]
};
