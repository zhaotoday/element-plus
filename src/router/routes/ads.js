export default {
  path: ":alias/ads",
  component: resolve => require(["@/views/wx-users"], resolve),
  children: [
    {
      path: "index",
      component: resolve => require(["@/views/wx-users/list"], resolve)
    }
  ]
};
