export default {
  path: ":alias/withdraws",
  component: resolve => require(["@/views/withdraws"], resolve),
  children: [
    {
      path: "list/userType/:userType",
      component: resolve => require(["@/views/withdraws/list"], resolve)
    }
  ]
};
