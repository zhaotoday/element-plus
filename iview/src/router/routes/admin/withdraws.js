export default {
  path: ":alias/withdraws",
  component: resolve => require(["@/views/withdraws"], resolve),
  children: [
    {
      path: "list",
      component: resolve => require(["@/views/withdraws/list"], resolve)
    }
  ]
};
