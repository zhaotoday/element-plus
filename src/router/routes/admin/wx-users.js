export default {
  path: ":alias/wxUsers",
  component: resolve => require(["@/views/wx-users"], resolve),
  children: [
    {
      path: "list",
      component: resolve => require(["@/views/wx-users/list"], resolve)
    }
  ]
};
