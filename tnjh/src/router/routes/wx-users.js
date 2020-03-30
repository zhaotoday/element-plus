export default {
  path: ":alias/wxUsers",
  component: resolve => require(["@/views/wx-users"], resolve),
  children: [
    {
      path: "index",
      component: resolve => require(["@/views/wx-users/list"], resolve)
    }
  ]
};
