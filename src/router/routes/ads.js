export default {
  path: ":alias/ads",
  component: resolve => require(["@/views/ads"], resolve),
  children: [
    {
      path: "list",
      component: resolve => require(["@/views/ads/list"], resolve)
    }
  ]
};
