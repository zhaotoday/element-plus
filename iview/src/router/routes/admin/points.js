export default {
  path: ":alias/points",
  component: resolve => require(["@/views/points"], resolve),
  children: [
    {
      path: "list",
      component: resolve => require(["@/views/points/list"], resolve)
    }
  ]
};
